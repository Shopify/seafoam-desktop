import * as React from "react";
import { useCallback, useState } from "react";

import { Card, Tabs } from "@shopify/polaris";
import RootFolder from "../types/RootFolder";
import BgvFileList from "./BgvFileList";

export default function DumpFolderTabs() {
  const [selected, setSelected] = useState(0);
  const rootFolder = new RootFolder("file/path/to/dumps");

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
