import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { Card, Tabs } from "@shopify/polaris";
import RootFolder, { SeafoamNode } from "../types/RootFolder";
import BgvFileList from "./BgvFileList";
import { DirectoryLoadedPayload, IPCEvents } from "../events";

interface Props {
  methodFilter: string;
}

export default function DumpFolderTabs(props: Props) {
  const methodFilter: string = props.methodFilter;
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
  const unfilteredList = tabs[selected].methods;

  function finalListOfBgvFiles() {
    const filteredList = unfilteredList.filter((query) =>
      query.name.includes(methodFilter)
    );
    const filteredListWithNoResults =
      filteredList.length == 0
        ? [{ name: "No results found.", seafoamNodes: [new SeafoamNode("")] }]
        : filteredList;

    return methodFilter == "" ? unfilteredList : filteredListWithNoResults;
  }

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section title={tabs[selected].content}>
          <BgvFileList listOfBgvFiles={finalListOfBgvFiles()} />
        </Card.Section>
      </Tabs>
    </Card>
  );
}
