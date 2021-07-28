export const enum IPCEvents {
  DirectoryLoaded = "directory-loaded",
  LoadDotData = "load-dot-data",
  LoadedDotData = "loaded-dot-data",
}

export interface IPCPayload {
  [IPCEvents.DirectoryLoaded]: DirectoryLoadedPayload;
  [IPCEvents.LoadDotData]: LoadDotDataPayload;
  [IPCEvents.LoadedDotData]: LoadedDotDataPayload;
}

export interface DirectoryLoadedPayload {
  directoryName: DumpDirectoryName;
  files: DumpFileName[];
}

export interface LoadDotDataPayload {
  filename: DumpFilePath;
  phase: number;
}

export interface LoadedDotDataPayload {
  dotData: Dot;
}
