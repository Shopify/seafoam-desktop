import * as React from "react";
import { useContext, useEffect, useState } from "react";

import { Page } from "@shopify/polaris";
import EmptyGraphPlaceholder from "./EmptyGraphPlaceholder";
import { fetchPhaseList, IPCEvents, LoadedPhaseDataPayload } from "../events";
import { SelectedDumpFileContext } from "../contexts/SelectedDumpFileContext";
import { GraphPanel } from "./GraphPanel";

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
      <Page title="Graph Panel">
        {selectedDumpFile ? (
          <GraphPanel
            dumpFile={selectedDumpFile}
            compilerPhases={phases ?? []}
          />
        ) : (
          <EmptyGraphPlaceholder />
        )}
      </Page>
    </div>
  );
};

export default RightPanel;
