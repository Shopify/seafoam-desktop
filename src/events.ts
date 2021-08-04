export const enum IPCEvents {
  DirectoryLoaded = "directory-loaded",
  LoadDotData = "load-dot-data",
  LoadedDotData = "loaded-dot-data",
  LoadPhaseData = "load-phase-data",
  LoadedPhaseData = "loaded-phase-data",
}

export interface IPCPayload {
  [IPCEvents.DirectoryLoaded]: DirectoryLoadedPayload;
  [IPCEvents.LoadDotData]: LoadDotDataPayload;
  [IPCEvents.LoadedDotData]: LoadedDotDataPayload;
  [IPCEvents.LoadPhaseData]: LoadPhaseDataPayload;
  [IPCEvents.LoadedPhaseData]: LoadedPhaseDataPayload;
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

export interface LoadPhaseDataPayload {
  filename: DumpFilePath;
}

export interface LoadedPhaseDataPayload {
  phases: CompilerPhase[];
}
