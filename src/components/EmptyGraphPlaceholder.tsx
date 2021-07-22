import React from "react";
import { EmptyState } from "@shopify/polaris";

export default function EmptyGraphPlaceholder() {
  return (
    <EmptyState
      fullWidth
      heading="Visualize a graph"
      action={{ content: "Open a folder" }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    ></EmptyState>
  );
}
