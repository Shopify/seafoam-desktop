import React from "react";
import { Input, Select } from "antd";

const { Search } = Input;

export interface Props {
  phases: CompilerPhase[];
  onPhaseChange: (phase: CompilerPhase) => void;
}

export default function GraphTopBar(props: Props) {
  const { onPhaseChange, phases } = props;

  const handleSelectPhaseChange = React.useCallback(
    (value) => {
      const phaseNumber = parseInt(value);

      onPhaseChange(phases[phaseNumber]);
    },
    [phases]
  );

  return (
    <div style={row}>
      <div style={picker}>
        <Select
          placeholder="<Select Compiler Phase>"
          onChange={handleSelectPhaseChange}
          options={phases.map((phase, index) => {
            return {
              label: phase.name,
              value: index.toString(),
            };
          })}
        />
      </div>
      <div style={search}>
        <Search onSearch={() => alert("Not yet implemented")} />
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
