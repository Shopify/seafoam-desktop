import React from "react";
import { Input, Typography } from "antd";

const { Search } = Input;
const { Title } = Typography;

interface Props {
  compilerPhase?: CompilerPhase;
}

export default function GraphTopBar(props: Props) {
  const { compilerPhase } = props;

  return (
    <div style={row}>
      {compilerPhase && (
        <Title
          level={5}
        >{`${compilerPhase.method}: ${compilerPhase.name} (${compilerPhase.number})`}</Title>
      )}
      <div style={search}>
        <Search onSearch={() => alert("Not yet implemented")} />
      </div>
    </div>
  );
}

const row: React.CSSProperties = {
  width: "60vw",
};

const search = {
  marginBottom: "16px",
  marginTop: "16px",
};
