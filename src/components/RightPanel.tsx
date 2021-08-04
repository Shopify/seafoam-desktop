import * as React from "react";
import { useContext, useEffect, useState } from "react";

import { Card, Page } from "@shopify/polaris";
import { Graphviz } from "graphviz-react";
import { GraphvizOptions } from "d3-graphviz";
import GraphTopBar from "./GraphTopBar";
import EmptyGraphPlaceholder from "./EmptyGraphPlaceholder";
import { IPCEvents, LoadedDotDataPayload } from "../events";
import { SelectedDumpFileContext } from "../contexts/SelectedDumpFileContext";
import { GraphLoading } from "./GraphLoading";

const EMPTY_GRAPH = "digraph {}";

const RightPanel: React.FunctionComponent = () => {
  const { selectedDumpFile } = useContext(SelectedDumpFileContext);
  const [dotData, setDotData] = useState<Dot>(EMPTY_GRAPH);
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState<Nullable<CompilerPhase>>(null);

  const doesGraphExist: boolean = dotData == EMPTY_GRAPH ? false : true;
  let cachedPhase = phase;

  useEffect(() => {
    setPhase(null);
    cachedPhase = null;
  }, [selectedDumpFile]);

  useEffect(() => {
    window.ipc_events.subscribe(
      IPCEvents.LoadedDotData,
      (payload: LoadedDotDataPayload) => {
        setDotData(payload.dotData);
        setIsLoading(false);
      }
    );

    return () => window.ipc_events.unsubscribe(IPCEvents.LoadedDotData);
  });

  useEffect(() => {
    if (selectedDumpFile && cachedPhase) {
      setIsLoading(true);

      window.ipc_events.send(IPCEvents.LoadDotData, {
        filename: `${selectedDumpFile.directory}/${selectedDumpFile.filename}`,
        phase: phase.number,
      });

      return () => window.ipc_events.unsubscribe(IPCEvents.LoadDotData);
    }
  }, [selectedDumpFile, phase]);

  return (
    <div className="right-hand-panel">
      <Page title="Graph Panel">
        <div style={column}>
          <GraphTopBar
            selectedDumpFile={selectedDumpFile}
            onPhaseChange={setPhase}
          />
          <div style={cardContainer}>
            <Card sectioned>
              <div style={box}>
                {isLoading ? (
                  <GraphLoading dumpFile={selectedDumpFile} />
                ) : doesGraphExist ? (
                  <Graphviz dot={dotData} options={graphOptions} />
                ) : (
                  <EmptyGraphPlaceholder />
                )}
              </div>
            </Card>
          </div>
        </div>
      </Page>
    </div>
  );
};

const graphOptions: GraphvizOptions = {
  fit: true,
  zoom: true,
  totalMemory: 1024 * 1024 * 1024 * 1,
  width: undefined,
  height: undefined,
};

const box: React.CSSProperties = {
  display: "flex",
  flexFlow: "column",
  height: "100%",
  justifyContent: "center",
};

const cardContainer: React.CSSProperties = {
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: "auto",
};

const column: React.CSSProperties = {
  display: "flex",
  flexFlow: "column",
  height: "100%",
};

export default RightPanel;
