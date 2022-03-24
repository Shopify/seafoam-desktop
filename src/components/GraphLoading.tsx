import React from "react";
import { Spin } from "antd";

const ELLIPSIS = String.fromCharCode(0x2026);

interface Props {
  dumpFile: DumpFile;
}

const center: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  height: "200px",
  flexDirection: "column",
};

export function GraphLoading(props: Props) {
  return (
    <div style={center}>
      <div>
        <Spin tip={`Loading ${props.dumpFile.name}${ELLIPSIS}`} />
      </div>
    </div>
  );
}
