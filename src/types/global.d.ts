import { IPCEvents } from "../events";
import { IPC } from "../electron/preload";
import { LogFunctions } from "electron-log";

declare global {
  // Electron's `contextBridge.exposeInMainWorld` adds properties to the
  // `window` object so they're accessible to the renderer. Here we augment
  // the `Window` type in order to expose those properties safely in TypeScript.
  interface Window<Event extends IPCEvents> {
    ipc_events: IPC<Event>;
    logger: LogFunctions;
  }
}
