import React from "react";
import { EmptyState } from "@shopify/polaris";

export function ChoosePhaseCTA() {
  return (
    <EmptyState
      fullWidth
      heading="Please choose a compiler phase you would like to see graphed."
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    ></EmptyState>
  );
}
