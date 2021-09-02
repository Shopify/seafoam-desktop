import * as React from "react";
import { useState } from "react";

import { Card, OptionList } from "@shopify/polaris";

interface Props {
  listOfBgvFiles: DumpFile[];
  setSelectedFile: (method: DumpFile) => void;
}

export default function BgvFileList(props: Props) {
  const { listOfBgvFiles, setSelectedFile } = props;
  const [selected, setSelected] = useState<string[]>([]);

  const seafoamMethodMap = new Map(
    listOfBgvFiles.map((file) => [file.id, file])
  );

  const listOptions = listOfBgvFiles.map((bgvFile) => ({
    value: bgvFile.id,
    label: bgvFile.name,
  }));

  return (
    <Card>
      <OptionList
        title="List of Bgv Files"
        onChange={(selectedIds) => {
          if (selectedIds.length === 1) {
            setSelected(selectedIds);

            const selectedId = selectedIds[0];
            const selectedMethod = seafoamMethodMap.get(selectedId);

            if (selectedMethod) {
              setSelectedFile(selectedMethod);
            } else {
              window.logger.error(
                `Selected ID '${selectedId}' not found in list of dump files`,
                seafoamMethodMap
              );
            }
          } else {
            throw "Too many selected files";
          }
        }}
        options={listOptions}
        selected={selected}
      />
    </Card>
  );
}
