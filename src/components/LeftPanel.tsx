import * as React from "react";

import { Page } from "@shopify/polaris";
import DumpFolderTabs from "./DumpFolderTabs";

const LeftPanel: React.FunctionComponent = () => {
  return <Page title="Dump Panel"><DumpFolderTabs /></Page>;
};

export default LeftPanel;
