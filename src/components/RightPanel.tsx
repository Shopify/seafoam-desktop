import * as React from "react";
import { useContext } from "react";

import EmptyGraphPlaceholder from "./EmptyGraphPlaceholder";
import { GraphPanel } from "./GraphPanel";
import { Card } from "antd";
import { GraphsLoadedContext } from "../contexts/GraphsLoadedContext";

const RightPanel: React.FunctionComponent = () => {
  const { graphsLoaded } = useContext(GraphsLoadedContext);

  return (
    <div className="right-hand-panel">
      <Card title="Graph Panel">
        {graphsLoaded ? <GraphPanel /> : <EmptyGraphPlaceholder />}
      </Card>
    </div>
  );
};

export default RightPanel;
