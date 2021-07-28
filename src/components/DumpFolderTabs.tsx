import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { Card, Tabs } from "@shopify/polaris";
import RootFolder, { SeafoamMethod, SeafoamNode } from "../types/RootFolder";
import BgvFileList from "./BgvFileList";
import { DirectoryLoadedPayload, IPCEvents } from "../events";

interface Props {
  methodFilter: string;
}

export default function DumpFolderTabs(props: Props) {
  const methodFilter: string = props.methodFilter;
  const [selected, setSelected] = useState(0);
  const [_selectedSeafoamMethod, setSelectedSeafoamMethod] =
    useState<SeafoamMethod | null>(null);
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

  function finalListOfBgvFiles(): SeafoamMethod[] {
    const filteredList = unfilteredList.filter((query) =>
      query.name.includes(methodFilter)
    );
    const filteredListWithNoResults =
      filteredList.length == 0
        ? [
            {
              name: "No results found.",
              directory: "",
              filename: "",
              id: "",
              seafoamNodes: [new SeafoamNode("")],
            },
          ]
        : filteredList;

    return methodFilter == "" ? unfilteredList : filteredListWithNoResults;
  }

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section title={tabs[selected].content}>
          <BgvFileList
            listOfBgvFiles={finalListOfBgvFiles()}
            setSelectedFile={(method) => {
              // TODO (kmenard 22-Jul-21): The phase value should come from the phase chooser widget.
              window.ipc_events.send(IPCEvents.LoadDotData, {
                filename: `${method.directory}/${method.filename}`,
                phase: method.name.endsWith("(AST)") ? 0 : 8,
              });

              setSelectedSeafoamMethod(method);
            }}
          />
        </Card.Section>
      </Tabs>
    </Card>
  );
}
