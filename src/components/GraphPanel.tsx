import React, { useContext, useEffect, useState } from "react";
import { Graphviz } from "graphviz-react";
import GraphTopBar from "./GraphTopBar";
import { GraphLoading } from "./GraphLoading";
import { GraphvizOptions } from "d3-graphviz";
import { fetchDotData, IPCEvents, LoadedDotDataPayload } from "../events";
import { ChoosePhaseCTA } from "./ChoosePhaseCTA";
import { Card } from "antd";
import { GraphDataSourceContext } from "../contexts/GraphDataSourceContext";

export function GraphPanel() {
  const [dotData, setDotData] = useState<Nullable<Dot>>(null);
  const { graphDataSource } = useContext(GraphDataSourceContext);

  useEffect(() => {
    setDotData(null);

    if (graphDataSource) {
      fetchDotData(graphDataSource.dumpFile, graphDataSource.compilerPhase);
    }
  }, [graphDataSource]);

  useEffect(() => {
    window.ipc_events.subscribe(
      IPCEvents.LoadedDotData,
      (payload: LoadedDotDataPayload) => {
        setDotData(payload.dotData);
      }
    );

    return () => window.ipc_events.unsubscribe(IPCEvents.LoadedDotData);
  }, []);

  return (
    <div style={column}>
      <GraphTopBar />
      <div style={cardContainer}>
        <Card>
          <div style={box}>
            {!graphDataSource ? (
              <ChoosePhaseCTA />
            ) : !dotData ? (
              <GraphLoading dumpFile={graphDataSource.dumpFile} />
            ) : (
              <Graphviz dot={dotData} options={graphOptions} />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

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
