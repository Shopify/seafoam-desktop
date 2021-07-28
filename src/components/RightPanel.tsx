import * as React from "react";
import { useContext, useEffect, useState } from "react";

import { Card, Page } from "@shopify/polaris";
import { Graphviz } from "graphviz-react";
import { GraphvizOptions } from "d3-graphviz";
import GraphTopBar from "./GraphTopBar";
import EmptyGraphPlaceholder from "./EmptyGraphPlaceholder";
import { IPCEvents, LoadedDotDataPayload } from "../events";
import { SelectedDumpFileContext } from "../contexts/SelectedDumpFileContext";

const EMPTY_GRAPH = "digraph {}";

const RightPanel: React.FunctionComponent = () => {
  const { selectedDumpFile } = useContext(SelectedDumpFileContext);
  const [dotData, setDotData] = useState<Dot>(EMPTY_GRAPH);

  const doesGraphExist: boolean = dotData == EMPTY_GRAPH ? false : true;

  useEffect(() => {
    window.ipc_events.subscribe(
      IPCEvents.LoadedDotData,
      (payload: LoadedDotDataPayload) => {
        setDotData(payload.dotData);
      }
    );

    return () => window.ipc_events.unsubscribe(IPCEvents.LoadedDotData);
  });

  useEffect(() => {
    if (selectedDumpFile) {
      // TODO (kmenard 22-Jul-21): The phase value should come from the phase chooser widget.
      window.ipc_events.send(IPCEvents.LoadDotData, {
        filename: `${selectedDumpFile.directory}/${selectedDumpFile.filename}`,
        phase: 0,
      });

      return () => window.ipc_events.unsubscribe(IPCEvents.LoadDotData);
    }
  }, [selectedDumpFile]);

  return (
    <Page title="Graph Panel">
      <div style={column}>
        <GraphTopBar />
        <br />
        <Card sectioned>
          <div style={box}>
            {doesGraphExist ? (
              <Graphviz dot={dotData} options={graphOptions} />
            ) : (
              <EmptyGraphPlaceholder />
            )}
          </div>
        </Card>
      </div>
    </Page>
  );
};

const graphOptions: GraphvizOptions = {
  width: null,
  height: 1000,
  fit: true,
};

const box = {
  flex: 1,
};

const column: React.CSSProperties = {
  display: "flex",
  height: "100%",
  alignItems: "right",
  justifyContent: "center",
  flexDirection: "column",
  padding: 16,
  alignContent: "space-between",
};

export default RightPanel;
