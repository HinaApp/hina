import { Plugin } from "vite";
import jsxCss from "vite-plugin-jsx-css";
import solid from "vite-plugin-solid";

const path = "../src/";

// Support HMR by rewriting alias to direct source
function hmrAliasPlugin(): Plugin {
  return {
    name: "core-hmr-alias",
    config() {
      return {
        resolve: {
          alias: {
            "@hina/core": "@hina/core/src/index.tsx",
            "~/": new URL(path, import.meta.url).pathname,
          },
        },
      };
    },
  };
}

export default function plugins({ mode }: { mode: string }): (Plugin | Plugin[])[] {
  if (mode === "development") return [hmrAliasPlugin(), solid(), jsxCss()];
  return [];
}
