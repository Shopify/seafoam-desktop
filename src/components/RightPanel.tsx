import * as React from "react";

import { Page, TopBar, Card, Select } from "@shopify/polaris";
import { Graphviz } from "graphviz-react";
import { GraphvizOptions } from "d3-graphviz";

import dot from "../data/sample_encoding_name.js";

const RightPanel: React.FunctionComponent = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedPhase, setSelectedPhase] = React.useState("Phase 1");

  // Fake data
  const options = [
    { label: "Phase 1", value: "1" },
    { label: "Phase 2", value: "2" },
    { label: "Phase 3", value: "3" },
  ];

  const handleSearchValueChange = React.useCallback(
    (value) => setSearchValue(value),
    []
  );

  const handleSelectPhaseChange = React.useCallback(
    (value) => setSelectedPhase(value),
    []
  );

  const graphOptions: GraphvizOptions = {
    width: null,
    height: 1000,
    fit: true,
  };

  return (
    <Page title="Graph Panel">
      <div style={column}>
        <div style={row}>
          <div style={picker}>
            <Select
              label="Phase"
              onChange={handleSelectPhaseChange}
              value={selectedPhase}
              options={options}
            />
          </div>
          <div style={search}>
            <TopBar.SearchField
              value={searchValue}
              onChange={handleSearchValueChange}
            />
          </div>
        </div>
        <Card>
          <div style={box}>
            <Graphviz dot={dot} options={graphOptions} />
          </div>
        </Card>
      </div>
    </Page>
  );
};

const box = {
  flex: 1,
};

const row: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "flex-end",
  justifyContent: "space-around",
};

const column: React.CSSProperties = {
  display: "flex",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: 16,
  alignContent: "space-between",
};

const picker = {
  flex: 1,
  padding: 16,
};
const search = {
  flex: 2,
  padding: 16,
};

export default RightPanel;
