import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Card, Tabs, TabsProps } from "@shopify/polaris";
import DumpDirectoryManager, {
  DumpFile,
  SeafoamGraph,
} from "../types/DumpDirectoryManager";
import BgvFileList from "./BgvFileList";
import { DirectoryLoadedPayload, IPCEvents } from "../events";

type TabDescriptor = TabsProps["tabs"][0];

interface Props {
  methodFilter: string;
}

function buildTabs(
  loadedDumps: Map<DumpDirectoryName, DumpFile[]>
): TabDescriptor[] {
  return Array.from(loadedDumps.keys()).map((directoryName): TabDescriptor => {
    return {
      id: directoryName,
      content: directoryName.split("/").pop(),
    };
  });
}

export default function DumpFolderTabs(props: Props) {
  const methodFilter: string = props.methodFilter;
  const [selected, setSelected] = useState(0);
  const [_selectedSeafoamMethod, setSelectedSeafoamMethod] =
    useState<DumpFile | null>(null);
  const [dumpDirectoryManager, setDumpDirectoryManager] =
    useState<DumpDirectoryManager>(new DumpDirectoryManager("empty", []));

  useEffect(() => {
    window.ipc_events.subscribe(
      IPCEvents.DirectoryLoaded,
      (payload: DirectoryLoadedPayload) => {
        setDumpDirectoryManager(
          new DumpDirectoryManager(payload.directoryName, payload.files)
        );
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

  const tabs = buildTabs(dumpDirectoryManager.dump_directories);
  const unfilteredList = dumpDirectoryManager.dump_directories.get(
    tabs[selected].id
  );

  function finalListOfBgvFiles(): DumpFile[] {
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
              seafoamNodes: [new SeafoamGraph("")],
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
