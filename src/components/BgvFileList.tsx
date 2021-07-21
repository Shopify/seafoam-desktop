import * as React from "react";
import { useState } from "react";

import { Card, OptionList } from "@shopify/polaris";
import { SeafoamNode } from "../types/RootFolder";

interface Props {
  listOfBgvFiles: {
    name: string;
    seafoamNodes: SeafoamNode[];
  }[];
}

export default function BgvFileList(props: Props) {
  const { listOfBgvFiles } = props;
  const [selected, setSelected] = useState([]);
  const mappedBgvFiles = listOfBgvFiles.map((bgvFile) => ({
    value: bgvFile.name,
    label: bgvFile.name,
  }));

  return (
    <Card>
      <OptionList
        title="List of Bgv Files"
        onChange={setSelected}
        options={mappedBgvFiles}
        selected={selected}
      />
    </Card>
  );
}
