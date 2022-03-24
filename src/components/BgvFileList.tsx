import * as React from "react";

import { Card, Tree } from "antd";

interface Props {
  listOfBgvFiles: DumpFile[];
  setSelectedFile: (method: DumpFile) => void;
}

export default function BgvFileList(props: Props) {
  const { listOfBgvFiles, setSelectedFile } = props;

  const seafoamMethodMap = new Map(
    listOfBgvFiles.map((file) => [file.id, file])
  );

  const treeData = listOfBgvFiles.map((bgvFile) => ({
    title: bgvFile.name,
    key: bgvFile.id,
  }));

  const onSelect = (selectedIds: React.Key[]) => {
    if (selectedIds.length === 1) {
      const selectedId = selectedIds[0];
      const selectedMethod = seafoamMethodMap.get(selectedId.toString());

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
  };

  return (
    <Card style={{ padding: 0 }}>
      <Tree treeData={treeData} onSelect={onSelect} />
    </Card>
  );
}
