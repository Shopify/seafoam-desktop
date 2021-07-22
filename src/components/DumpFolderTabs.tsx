import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { Card, Tabs } from "@shopify/polaris";
import RootFolder from "../types/RootFolder";
import BgvFileList from "./BgvFileList";
import { DirectoryLoadedPayload, IPCEvents } from "../events";

export default function DumpFolderTabs() {
  const [selected, setSelected] = useState(0);
  const [rootFolder, setRootFolder] = useState<RootFolder>(
    new RootFolder("empty", [])
  );

  useEffect(() => {
    window.ipc_events.subscribe(
      IPCEvents.DirectoryLoaded,
      (payload: DirectoryLoadedPayload) => {
        setRootFolder(new RootFolder(payload.directoryName, payload.files));
      }
    );

    return () => {
      window.ipc_events.unsubscribe(IPCEvents.DirectoryLoaded);
    };
  });

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = rootFolder.dumps;
  const listOfBgvFiles = tabs[selected].methods;

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section title={tabs[selected].content}>
          <BgvFileList listOfBgvFiles={listOfBgvFiles} />
        </Card.Section>
      </Tabs>
    </Card>
  );
}
