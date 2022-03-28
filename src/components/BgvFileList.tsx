import * as React from "react";

import { Tree } from "antd";
import { LoadedPhaseDataPayload } from "../events";
import { PartitionOutlined } from "@ant-design/icons";
import { TreeProps } from "rc-tree";
import { DataNode, EventDataNode } from "rc-tree/lib/interface";
import { GraphDataSourceContext } from "../contexts/GraphDataSourceContext";
import { useContext } from "react";

type OnSelectCallback = TreeProps<CompilerPhaseTreeDataNode>["onSelect"];

interface CompilerPhaseTreeDataNode extends DataNode {
  children?: CompilerPhaseTreeDataNode[];
  dumpFile: DumpFile;
  phase?: CompilerPhase;
}

interface Props {
  listOfBgvFiles: DumpFile[];
}

export default function BgvFileList(props: Props) {
  const { listOfBgvFiles } = props;
  const { setGraphDataSource } = useContext(GraphDataSourceContext);

  const initialTreeData = listOfBgvFiles.map((bgvFile) => ({
    title: bgvFile.name,
    key: bgvFile.id,
    selectable: false,
    dumpFile: bgvFile,
  }));

  const [treeData, setTreeData] =
    React.useState<CompilerPhaseTreeDataNode[]>(initialTreeData);

  const updateTreeData = (
    list: CompilerPhaseTreeDataNode[],
    key: React.Key,
    children: CompilerPhaseTreeDataNode[]
  ): CompilerPhaseTreeDataNode[] => {
    return list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
        };
      }

      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }

      return node;
    });
  };

  const onLoadData = (node: EventDataNode): Promise<void> =>
    new Promise<void>((resolve) => {
      const { key, children } = node;

      if (children) {
        resolve();
        return;
      }

      if ("dumpFile" in node) {
        const { dumpFile } = node as EventDataNode & CompilerPhaseTreeDataNode;

        // Fetch list of phases here.
        return window.ipc_events
          .fetchPhases({ filename: key })
          .then(({ phases }: LoadedPhaseDataPayload) => {
            setTreeData(
              updateTreeData(
                treeData,
                key,
                phases.map((phase) => ({
                  title: phase.name,
                  key: `${dumpFile.id}:${phase.number}`,
                  isLeaf: true,
                  icon: <PartitionOutlined />,
                  selectable: true,
                  dumpFile: dumpFile,
                  phase: phase,
                }))
              )
            );

            resolve();
          });
      } else {
        throw "Tree node is missing 'dumpFile'.";
      }
    });

  const onSelect: OnSelectCallback = (selectedKeys, info) => {
    if (selectedKeys.length === 1) {
      const node = info.selectedNodes[0];
      const { dumpFile, phase } = node;

      setGraphDataSource({ dumpFile, compilerPhase: phase! });
    } else if (selectedKeys.length > 1) {
      throw "Too many selected files";
    }
  };

  return (
    <Tree<CompilerPhaseTreeDataNode>
      treeData={treeData}
      loadData={onLoadData}
      onSelect={onSelect}
      showIcon={true}
    />
  );
}
