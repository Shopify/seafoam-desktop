import * as React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Card, Tabs, TabsProps } from "@shopify/polaris";
import BgvFileList from "./BgvFileList";
import { DirectoryLoadedPayload, IPCEvents } from "../events";
import { SelectedDumpFileContext } from "../contexts/SelectedDumpFileContext";
import { Map } from "immutable";
import { createDumpFile } from "../lib/DumpFileUtils";

type TabDescriptor = TabsProps["tabs"][0];

const EMPTY_TAB_NAME = "empty";

interface Props {
  methodFilter: string;
}

function buildTabs(loadedDumps: DumpDirectoryMap): TabDescriptor[] {
  return Array.from(loadedDumps.keys()).map((directoryName): TabDescriptor => {
    return {
      id: directoryName,
      content: directoryName.split("/").pop(),
    };
  });
}

export default function DumpFolderTabs(props: Props) {
  const methodFilter: string = props.methodFilter;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [dumpDirectoryMap, setDumpDirectoryMap] = useState<DumpDirectoryMap>(
    Map({ [EMPTY_TAB_NAME]: [] })
  );
  const { setSelectedDumpFile } = useContext(SelectedDumpFileContext);

  useEffect(() => {
    window.ipc_events.subscribe(
      IPCEvents.DirectoryLoaded,
      (payload: DirectoryLoadedPayload) => {
        const files = payload.files.map((filename) =>
          createDumpFile(payload.directoryName, filename)
        );

        if (dumpDirectoryMap.has(EMPTY_TAB_NAME)) {
          setDumpDirectoryMap(Map({ [payload.directoryName]: files }));
        } else {
          setDumpDirectoryMap(
            dumpDirectoryMap.set(payload.directoryName, files)
          );
        }
      }
    );

    return () => {
      window.ipc_events.unsubscribe(IPCEvents.DirectoryLoaded);
    };
  });

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelectedTabIndex(selectedTabIndex),
    []
  );

  const tabs = buildTabs(dumpDirectoryMap);
  const unfilteredList = dumpDirectoryMap.get(tabs[selectedTabIndex].id);

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
            },
          ]
        : filteredList;

    return methodFilter == "" ? unfilteredList : filteredListWithNoResults;
  }

  return (
    <Card>
      <Tabs tabs={tabs} selected={selectedTabIndex} onSelect={handleTabChange}>
        <Card.Section title={tabs[selectedTabIndex].content}>
          <BgvFileList
            listOfBgvFiles={finalListOfBgvFiles()}
            setSelectedFile={setSelectedDumpFile}
          />
        </Card.Section>
      </Tabs>
    </Card>
  );
}
