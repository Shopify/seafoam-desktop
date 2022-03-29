import React from "react";
import { Empty } from "antd";

export function ChoosePhaseCTA() {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="Please choose a compiler phase you would like to see graphed."
    />
  );
}
