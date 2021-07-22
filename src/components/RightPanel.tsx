import * as React from "react";

import { Page, Card } from "@shopify/polaris";
import { Graphviz } from "graphviz-react";
import { GraphvizOptions } from "d3-graphviz";
import RootFolder from "../types/RootFolder";
import GraphTopBar from "./GraphTopBar";

const EMPTY_GRAPH = "digraph {}";

const RightPanel: React.FunctionComponent = () => {
  const mockRootFolder = new RootFolder("mock/filepath/src/dumps", []);
  const dot =
    mockRootFolder?.dumps[0]?.methods[0]?.seafoamNodes[0]?.dot() || EMPTY_GRAPH;

  const graphOptions: GraphvizOptions = {
    width: null,
    height: 1000,
    fit: true,
  };

  return (
    <Page title="Graph Panel">
      <div style={column}>
        <GraphTopBar />
        <Card>
          <div style={box}>
            <Graphviz dot={dot} options={graphOptions} />
          </div>
        </Card>
      </div>
    </Page>
  );
};

const graphOptions: GraphvizOptions = {
  width: null,
  height: 1000,
  fit: true,
};

const box = {
  flex: 1,
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

export default RightPanel;
