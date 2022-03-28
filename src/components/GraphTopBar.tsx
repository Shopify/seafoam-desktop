import React from "react";
import { Input } from "antd";

const { Search } = Input;

export default function GraphTopBar() {
  return (
    <div style={row}>
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

const search = {
  flex: 2,
  padding: 16,
};
