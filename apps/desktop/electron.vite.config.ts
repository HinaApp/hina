import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import corePlugins from "@hina/core/dist/vite.js";

export default defineConfig(({ mode }) => ({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    plugins: [corePlugins({ mode })],
  },
}));
