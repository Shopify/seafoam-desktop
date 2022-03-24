import * as React from "react";
import { useContext, useEffect, useState } from "react";

import EmptyGraphPlaceholder from "./EmptyGraphPlaceholder";
import { fetchPhaseList, IPCEvents, LoadedPhaseDataPayload } from "../events";
import { SelectedDumpFileContext } from "../contexts/SelectedDumpFileContext";
import { GraphPanel } from "./GraphPanel";
import { Card } from "antd";

const RightPanel: React.FunctionComponent = () => {
  const { selectedDumpFile } = useContext(SelectedDumpFileContext);
  const [phases, setPhases] = useState<Nullable<CompilerPhase[]>>(null);

  useEffect(() => {
    setPhases(null);
  }, [selectedDumpFile]);

  useEffect(() => {
    window.ipc_events.subscribe(
      IPCEvents.LoadedPhaseData,
      (payload: LoadedPhaseDataPayload) => {
        setPhases(payload.phases);
      }
    );

    return () => window.ipc_events.unsubscribe(IPCEvents.LoadedPhaseData);
  }, []);

  useEffect(() => {
    if (selectedDumpFile) {
      fetchPhaseList(selectedDumpFile);
    }
  }, [selectedDumpFile]);

  return (
    <div className="right-hand-panel">
      <Card title="Graph Panel">
        {selectedDumpFile ? (
          <GraphPanel
            dumpFile={selectedDumpFile}
            compilerPhases={phases ?? []}
          />
        ) : (
          <EmptyGraphPlaceholder />
        )}
      </Card>
    </div>
  );
};

export default RightPanel;
