import * as React from "react";

import { Page } from "@shopify/polaris";
import DumpFolderTabs from "./DumpFolderTabs";
import SearchMethodTextField from "./SearchMethodTextField";

const LeftPanel: React.FunctionComponent = () => {
  return (
    <Page title="Graal Dump Folders">
      <SearchMethodTextField />
      <br />
      <DumpFolderTabs />
    </Page>
  );
};

export default LeftPanel;
