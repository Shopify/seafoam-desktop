import * as React from "react";
import { useCallback, useState } from "react";
import { Card, Tabs } from '@shopify/polaris';
import RootFolder from "../RootFolder";

export default DumpFolderTabs;

function DumpFolderTabs() {
  const [selected, setSelected] = useState(0);
  const rootFolder = new RootFolder("file/path/to/dumps");

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = rootFolder.dumps;

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section title={tabs[selected].content}>
          <p>Tab {tabs[selected].id} selected</p>
        </Card.Section>
      </Tabs>
    </Card>
  );
}
