import { render } from "solid-js/web";
import { PlatformConfigs } from "~/shared/lib";
import { App } from "./app";
import "~/assets/index.css";

export type { PlatformConfigs, TextFile } from "~/shared/lib";

export function mount(el: HTMLElement | null, configs: PlatformConfigs): void {
  if (el) render(() => <App defaultPlatformConfigs={configs} />, el);
}
