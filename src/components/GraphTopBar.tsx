import { Select, TopBar } from "@shopify/polaris";
import React from "react";

export default function GraphTopBar() {
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedPhase, setSelectedPhase] = React.useState("Phase 1");

  const handleSearchValueChange = React.useCallback(
    (value) => setSearchValue(value),
    []
  );

  const handleSelectPhaseChange = React.useCallback(
    (value) => setSelectedPhase(value),
    []
  );

  // Fake data
  const options = [
    { label: "Phase 1", value: "1" },
    { label: "Phase 2", value: "2" },
    { label: "Phase 3", value: "3" },
  ];

  return (
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
  );
}

const row: React.CSSProperties = {
  flexGrow: 0,
  flexShrink: 1,
  flexBasis: "auto",
  display: "flex",
  flexDirection: "row",
  width: "60vw",
  alignItems: "flex-end",
  justifyContent: "space-around",
};

const picker = {
  flex: 1,
  padding: 16,
};

const search = {
  flex: 2,
  padding: 16,
};
