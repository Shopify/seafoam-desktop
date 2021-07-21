import * as React from "react";

import { Page, TopBar, Card } from "@shopify/polaris";
import { Graphviz } from "graphviz-react";
import { GraphvizOptions } from "d3-graphviz";

import dot from "../data/sample_encoding_name.js";

const RightPanel: React.FunctionComponent = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const onSearchValueChange = React.useCallback(
    (value) => setSearchValue(value),
    []
  );

  const graphOptions: GraphvizOptions = {
    width: null,
    height: 1000,
    fit: true,
  };

  return (
    <Page title="Graph Panel">
      <TopBar.SearchField value={searchValue} onChange={onSearchValueChange} />
      <Card>
        <div style={box}>
          <Graphviz dot={dot} options={graphOptions} />
        </div>
      </Card>
    </Page>
  );
};

const box = {
  flex: 1,
  height: "100%",
};

export default RightPanel;
