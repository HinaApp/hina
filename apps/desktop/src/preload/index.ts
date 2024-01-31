import { contextBridge, ipcRenderer } from "electron";
import { API_DIALOG_OPEN_FILE, API_DIALOG_SAVE_FILE } from "../shared/consts";
import { ElectronApi } from "../shared/types";

// Custom APIs for renderer
const electronApi: ElectronApi = {
  openFile() {
    return ipcRenderer.invoke(API_DIALOG_OPEN_FILE);
  },
  saveFile(name, content) {
    return ipcRenderer.invoke(API_DIALOG_SAVE_FILE, name, content);
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electronApi", electronApi);
  } catch (error) {
    console.error(error);
  }
}
