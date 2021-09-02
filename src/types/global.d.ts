import { IPCEvents } from "../events";
import { IPC } from "../electron/preload";

declare global {
  interface Window<Event extends IPCEvents> {
    // Electron's `contextBridge.exposeInMainWorld` adds properties to the
    // `window` object so they're accessible to the renderer. Here we augment
    // the `Window` type in order to expose those properties safely in TypeScript.
    ipc_events: IPC<Event>;
  }
}
