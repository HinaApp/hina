import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import { Plugin } from "vite";
import path from "node:path";
import jsxCss from "vite-plugin-jsx-css";

const inlineCss = (): Plugin => ({
  name: "vite-inline-css",
  config() {
    return {
      build: {
        cssCodeSplit: true,
      },
    };
  },
  renderChunk(code, chunk) {
    if (chunk.viteMetadata?.importedCss.size) {
      let result = code;
      // Inject the referenced style files at the top of the chunk.
      for (const cssName of chunk.viteMetadata!.importedCss) {
        let cssFilePath = path.relative(path.dirname(chunk.fileName), cssName);
        cssFilePath = cssFilePath.startsWith(".") ? cssFilePath : `./${cssFilePath}`;
        result = `import '${cssFilePath}';\n${result}`; // style inject
      }
      return result;
    }
  },
});

export default defineConfig({
  plugins: [solid(), jsxCss(), tsconfigPaths(), dts({ rollupTypes: true }), inlineCss()],
  build: {
    sourcemap: "inline",
    lib: {
      formats: ["es"],
      entry: {
        index: "src/index.tsx",
        vite: "vite-plugin/index.ts",
      },
    },
    emptyOutDir: true,
    rollupOptions: {
      external: ["vite-plugin-solid", "vite", "vite-plugin-jsx-css", "vite-plugin-dts"],
    },
  },
});
