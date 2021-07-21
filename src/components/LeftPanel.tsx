import * as React from "react";

import { Page } from "@shopify/polaris";
import DumpFolderTabs from "./DumpFolderTabs";

const LeftPanel: React.FunctionComponent = () => {
  return (
    <Page title="Graal Dump Folders">
      <DumpFolderTabs />
    </Page>
  );
};

export default LeftPanel;
