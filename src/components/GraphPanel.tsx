import React, { useEffect, useState } from "react";
import { Graphviz } from "graphviz-react";
import GraphTopBar from "./GraphTopBar";
import { Card } from "@shopify/polaris";
import { GraphLoading } from "./GraphLoading";
import { GraphvizOptions } from "d3-graphviz";
import { fetchDotData, IPCEvents, LoadedDotDataPayload } from "../events";
import { ChoosePhaseCTA } from "./ChoosePhaseCTA";

interface Props {
  dumpFile: DumpFile;
  compilerPhases: CompilerPhase[];
}

export function GraphPanel(props: Props) {
  const { dumpFile, compilerPhases } = props;
  const [dotData, setDotData] = useState<Nullable<Dot>>(null);
  const [phase, setPhase] = useState<Nullable<CompilerPhase>>(null);

  useEffect(() => {
    setDotData(null);
    setPhase(null);
  }, [compilerPhases, dumpFile]);

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
      <GraphTopBar
        phases={compilerPhases}
        onPhaseChange={(phase) => {
          setDotData(null);
          setPhase(phase);

          fetchDotData(dumpFile, phase);
        }}
      />
      <div style={cardContainer}>
        <Card sectioned>
          <div style={box}>
            {!phase ? (
              <ChoosePhaseCTA />
            ) : !dotData ? (
              <GraphLoading dumpFile={dumpFile} />
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
