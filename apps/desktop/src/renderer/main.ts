import { mount } from "@hina/core";

mount(document.querySelector("#root"), {
  openFile: window.electronApi.openFile,
  saveFile: window.electronApi.saveFile,
});
