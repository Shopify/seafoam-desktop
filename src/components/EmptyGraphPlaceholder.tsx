import React from "react";
import { openDirectoryChooser } from "../events";
import { Button, Empty } from "antd";

export default function EmptyGraphPlaceholder() {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="No Compiler Graphs Loaded"
    >
      <Button type="primary" onClick={() => openDirectoryChooser()}>
        Load Graphs
      </Button>
    </Empty>
  );
}
