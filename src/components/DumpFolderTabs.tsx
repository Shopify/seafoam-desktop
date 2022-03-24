import * as React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import BgvFileList from "./BgvFileList";
import { DirectoryLoadedPayload, IPCEvents } from "../events";
import { SelectedDumpFileContext } from "../contexts/SelectedDumpFileContext";
import { Map } from "immutable";
import { createDumpFile } from "../lib/DumpFileUtils";
import { Card, Tabs } from "antd";

const { TabPane } = Tabs;

const EMPTY_TAB_NAME = "empty";

interface Props {
  methodFilter: string;
}

function buildTabs(loadedDumps: DumpDirectoryMap) {
  return Array.from(loadedDumps.keys()).map((directoryName) => {
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
  }, []);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelectedTabIndex(selectedTabIndex),
    []
  );

  const tabs = buildTabs(dumpDirectoryMap);
  const tabId = tabs[selectedTabIndex]?.id;
  const unfilteredList = dumpDirectoryMap.get(tabId) || [];

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
      <Tabs onSelect={handleTabChange}>
        {tabs.map((tab) => (
          <TabPane tab={tab.content}>
            <BgvFileList
              listOfBgvFiles={finalListOfBgvFiles()}
              setSelectedFile={setSelectedDumpFile}
            />
          </TabPane>
        ))}
      </Tabs>
    </Card>
  );
}
