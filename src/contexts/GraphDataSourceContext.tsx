import React, { createContext, PropsWithChildren, useState } from "react";

interface GraphDataSource {
  dumpFile: DumpFile;
  compilerPhase: CompilerPhase;
}

export interface ContextObject {
  graphDataSource: Nullable<GraphDataSource>;
  setGraphDataSource: (dataSource: GraphDataSource) => void;
}

export const GraphDataSourceContext = createContext<ContextObject>({
  graphDataSource: null,
  setGraphDataSource: () => null,
});

export function GraphDataSourceProvider(props: PropsWithChildren<unknown>) {
  const [graphDataSource, setGraphDataSource] =
    useState<Nullable<GraphDataSource>>(null);

  return (
    <GraphDataSourceContext.Provider
      value={{ graphDataSource, setGraphDataSource }}
    >
      {props.children}
    </GraphDataSourceContext.Provider>
  );
}
