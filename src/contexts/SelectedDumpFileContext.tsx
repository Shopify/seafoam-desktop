import React, { createContext, PropsWithChildren, useState } from "react";

export interface ContextObject {
  selectedDumpFile: Nullable<DumpFile>;
  setSelectedDumpFile: (dumpFile: DumpFile) => void;
}

export const SelectedDumpFileContext = createContext<ContextObject>({
  selectedDumpFile: null,
  setSelectedDumpFile: () => null,
});

export function SelectedDumpFileProvider(props: PropsWithChildren<unknown>) {
  const [selectedDumpFile, setSelectedDumpFile] =
    useState<Nullable<DumpFile>>(null);

  return (
    <SelectedDumpFileContext.Provider
      value={{ selectedDumpFile, setSelectedDumpFile }}
    >
      {props.children}
    </SelectedDumpFileContext.Provider>
  );
}
