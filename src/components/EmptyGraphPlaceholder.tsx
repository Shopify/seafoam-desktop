import React from "react";
import { EmptyState } from "@shopify/polaris";
import { openDirectoryChooser } from "../events";

export default function EmptyGraphPlaceholder() {
  return (
    <EmptyState
      fullWidth
      heading="Visualize a graph"
      action={{
        content: "Open a folder",
        onAction() {
          openDirectoryChooser();
        },
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    ></EmptyState>
  );
}
