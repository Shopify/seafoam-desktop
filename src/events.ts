export const enum IPCEvents {
  DirectoryLoaded = "directory-loaded",
}

export interface IPCPayload {
  [IPCEvents.DirectoryLoaded]: DirectoryLoadedPayload;
}

export interface DirectoryLoadedPayload {
  directoryName: string;
  files: string[];
}
