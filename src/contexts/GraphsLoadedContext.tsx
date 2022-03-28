import React, { PropsWithChildren } from "react";

export interface ContextObject {
  graphsLoaded: boolean;
  setGraphsLoaded: (filesLoaded: boolean) => void;
}

export const GraphsLoadedContext = React.createContext<ContextObject>({
  graphsLoaded: false,
  setGraphsLoaded: () => void 0,
});

export function GraphsLoadedProvider(props: PropsWithChildren<unknown>) {
  const [graphsLoaded, setGraphsLoaded] = React.useState(false);

  return (
    <GraphsLoadedContext.Provider value={{ graphsLoaded, setGraphsLoaded }}>
      {props.children}
    </GraphsLoadedContext.Provider>
  );
}
