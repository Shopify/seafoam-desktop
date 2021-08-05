import { Select, SelectOption, TopBar } from "@shopify/polaris";
import React, { useEffect, useState } from "react";

export interface Props {
  phases: CompilerPhase[];
  onPhaseChange: (phase: CompilerPhase) => void;
}

function buildSelectOptions(phases: CompilerPhase[]): SelectOption[] {
  return phases.map((phase, index) => {
    return {
      label: phase.name,
      value: index.toString(),
    };
  });
}

export default function GraphTopBar(props: Props) {
  const { onPhaseChange, phases } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedPhase, setSelectedPhase] = useState<string>("");

  useEffect(() => {
    setSelectedPhase("");
  }, [phases]);

  const handleSearchValueChange = React.useCallback(
    (value) => setSearchValue(value),
    []
  );

  const handleSelectPhaseChange = React.useCallback(
    (value) => {
      const phaseNumber = parseInt(value);

      onPhaseChange(phases[phaseNumber]);

      setSelectedPhase(value);
    },
    [phases]
  );

  return (
    <div style={row}>
      <div style={picker}>
        <Select
          label="Phase"
          placeholder="<Select Compiler Phase>"
          onChange={handleSelectPhaseChange}
          value={selectedPhase}
          options={buildSelectOptions(phases)}
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
