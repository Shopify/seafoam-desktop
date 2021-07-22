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
  directoryName: string;
  files: string[];
}

export interface LoadDotDataPayload {
  filename: string;
  phase: number;
}

export interface LoadedDotDataPayload {
  dotData: string;
}
