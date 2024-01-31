import { dialog, ipcMain } from "electron";
import { readFile, writeFile } from "node:fs/promises";
import { API_DIALOG_OPEN_FILE, API_DIALOG_SAVE_FILE } from "../shared/consts";
import { ElectronApi } from "../shared/types";

export function registerIpcHandles(): void {
  ipcMain.handle(API_DIALOG_OPEN_FILE, handleOpenFile);
  ipcMain.handle(API_DIALOG_SAVE_FILE, (_, name: string | null, content: string) => handleSaveFile(name, content));
}

async function handleOpenFile(): ReturnType<ElectronApi["openFile"]> {
  const { filePaths } = await dialog.showOpenDialog({ properties: ["openFile"] });
  const [filePath] = filePaths;

  if (!filePath) return null;

  const content = await readFile(filePath, { encoding: "utf8" });
  return { name: filePath, content };
}

async function handleSaveFile(name: string | null, content: string): ReturnType<ElectronApi["saveFile"]> {
  let fileName: string | null = name;
  if (!fileName) {
    const { filePath } = await dialog.showSaveDialog({
      defaultPath: "Untitled.html",
      filters: [
        {
          name: "HTML",
          extensions: ["html"],
        },
      ],
    });
    if (!filePath) return null;
    fileName = filePath;
  }
  await writeFile(fileName, content);
  return fileName;
}
