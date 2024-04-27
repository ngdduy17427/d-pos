import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

interface IElectronAPI {
  send: (channel: string, ...args: any[]) => Promise<void>;
  receive: (
    channel: string,
    callback: (event: IpcRendererEvent, ...args: any[]) => void
  ) => Promise<void>;
  removeAllListeners: (channel: string) => Promise<void>;
}

const validChannels = ["CloseApp"];

contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel: string, ...args: any[]): void => {
    if (validChannels.includes(channel)) ipcRenderer.send(channel, args);
  },
  receive: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void): void => {
    if (validChannels.includes(channel))
      ipcRenderer.on(channel, (event, ...args): void => callback(event, ...args));
  },
  removeAllListeners: (channel: string): void => {
    if (validChannels.includes(channel)) ipcRenderer.removeAllListeners(channel);
  },
});
