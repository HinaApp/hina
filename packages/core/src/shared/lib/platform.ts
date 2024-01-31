import { createContext, useContext } from "solid-js";

export interface TextFile {
  name: string;
  content: string;
}

export type PlatformConfigs = Partial<{
  openFile: () => Promise<TextFile | null>;
  saveFile: (name: string | null, content: string) => Promise<string | null>;
}>;

export function createPlatformConfigs(configs: PlatformConfigs): Readonly<Required<PlatformConfigs>> {
  return {
    openFile: configs.openFile ?? stub,
    saveFile: configs.saveFile ?? stub,
  };
}

export const PlatformConfigsCtx = createContext<ReturnType<typeof createPlatformConfigs>>();

export function usePlatformConfigs(): ReturnType<typeof createPlatformConfigs> {
  const ctx = useContext(PlatformConfigsCtx);
  if (!ctx) throw new Error("usePlatformConfigs must be used within PlatformConfigsProvider");
  return ctx;
}

function stub(): never {
  throw new Error("Not implemented");
}
