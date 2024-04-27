import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import * as path from "node:path";
import * as url from "node:url";

const isEnvSet = "ELECTRON_IS_DEV" in process.env;
const getFromEnv = Number.parseInt(String(process.env.ELECTRON_IS_DEV), 10) === 1;
const isDev = isEnvSet ? getFromEnv : !app.isPackaged;

let mainWindow: BrowserWindow | null;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    show: false,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on("CloseApp", (_: IpcMainEvent, __: any[]): void => app.quit());

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000/"
      : url.format({
          pathname: path.join(__dirname, "./index.html"),
          protocol: "file:",
          slashes: true,
        })
  );

  isDev && mainWindow.webContents.openDevTools();
  !isDev && mainWindow.removeMenu();

  mainWindow.on("closed", (): void => {
    mainWindow = null;
  });

  mainWindow.maximize();
  mainWindow.show();
};

app.on("ready", (): void => {
  createWindow();
});

app.on("window-all-closed", (): void => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", (): void => {
  if (mainWindow === null) createWindow();
});
