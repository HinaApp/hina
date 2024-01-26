import { contextBridge } from "electron";

// Custom APIs for renderer
const electronApi = {};

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
