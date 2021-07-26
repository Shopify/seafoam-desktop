import * as React from "react";

import { Page } from "@shopify/polaris";
import DumpFolderTabs from "./DumpFolderTabs";
import SearchMethodTextField from "./SearchMethodTextField";
import { useState } from "react";

const LeftPanel: React.FunctionComponent = () => {
  const [query, setQuery] = useState("");
  const methodFilter = (query: string) => {
    setQuery(query);
  };

  return (
    <Page title="Graal Dump Folders">
      <SearchMethodTextField methodFilter={methodFilter} />
      <br />
      <DumpFolderTabs methodFilter={query} />
    </Page>
  );
};

export default LeftPanel;
