// The preload script is needed to expose Node functionality in the renderer
// process. Letting the browser execute arbitrary Node functions, which have
// access to the underlying system, would be a security nightmare. However, we
// do need some form of communication between the main and renderer process and
// that communication API only lives in the main process, accessible by Node.
// The preload script allows us to selectively expose some functionality to the
// renderer process.

import { contextBridge, ipcRenderer } from "electron";
import { IPCEvents, IPCPayload } from "../events";
import ElectronLog from "electron-log";

// Enable IPC logging (must be configured here to work in the renderer process).
ElectronLog.transports!.ipc!.level! = "silly";

function subscribe<Event extends keyof IPCPayload>(
  event: Event,
  callback: (payload: IPCPayload[Event]) => void
) {
  ElectronLog.debug("IPC subscribe:", event);

  ipcRenderer.on(event, (event, args) => callback(args));
}

function unsubscribe<Event extends keyof IPCPayload>(event: Event) {
  ElectronLog.debug("IPC unsubscribe:", event);

  ipcRenderer.removeAllListeners(event);
}

function send<Event extends keyof IPCPayload>(
  event: IPCEvents,
  payload: IPCPayload[Event]
) {
  ElectronLog.debug("IPC send:", event, payload);

  ipcRenderer.send(event, payload);
}

export interface IPC<Event extends keyof IPCPayload> {
  subscribe: (
    event: Event,
    callback: (payload: IPCPayload[Event]) => void
  ) => void;
  unsubscribe: (event: Event) => void;
  send: (event: Event, payload: IPCPayload[Event]) => void;
}

contextBridge.exposeInMainWorld("ipc_events", {
  subscribe: subscribe,
  unsubscribe: unsubscribe,
  send: send,
});
