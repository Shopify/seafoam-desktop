import * as React from "react";

import { Page, Card } from "@shopify/polaris";
import { Graphviz } from "graphviz-react";
import { GraphvizOptions } from "d3-graphviz";
import RootFolder from "../types/RootFolder";
import GraphTopBar from "./GraphTopBar";
import EmptyGraphPlaceholder from "./EmptyGraphPlaceholder";

const EMPTY_GRAPH = "digraph {}";

const RightPanel: React.FunctionComponent = () => {
  const mockRootFolder = new RootFolder("mock/filepath/src/dumps", []);
  const selectedPhase = mockRootFolder?.dumps[0]?.methods[0]?.seafoamNodes[0];
  const dot = selectedPhase?.dot() || EMPTY_GRAPH;
  const dotGraph = <Graphviz dot={dot} options={graphOptions} />;
  const emptyState = <EmptyGraphPlaceholder />;
  const doesGraphExist: boolean = dot == EMPTY_GRAPH ? false : true;

  return (
    <Page title="Graph Panel">
      <div style={column}>
        <GraphTopBar />
        <br />
        <Card sectioned>
          <div style={box}>{doesGraphExist ? dotGraph : emptyState}</div>
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
  alignItems: "right",
  justifyContent: "center",
  flexDirection: "column",
  padding: 16,
  alignContent: "space-between",
};

export default RightPanel;
