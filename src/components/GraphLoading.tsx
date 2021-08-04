import React from "react";
import { Spinner } from "@shopify/polaris";

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
        <Spinner accessibilityLabel="Loading compiler graph" size="large" />
        <br />
        <span>{`Loading ${props.dumpFile.name}${ELLIPSIS}`}</span>
      </div>
    </div>
  );
}
