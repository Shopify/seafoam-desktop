import * as React from "react";

import { Page, TopBar } from "@shopify/polaris";

const RightPanel: React.FunctionComponent = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const onSearchValueChange = React.useCallback(
    (value) => setSearchValue(value),
    []
  );

  return (
    <Page title="Graph Panel">
      <TopBar.SearchField value={searchValue} onChange={onSearchValueChange} />
    </Page>
  );
};

export default RightPanel;
