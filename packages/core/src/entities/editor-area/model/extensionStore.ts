import { Accessor, createContext, createSignal, useContext } from "solid-js";
import { Extensions } from "@tiptap/core";
import { Document } from "@tiptap/extension-document";
import { History } from "@tiptap/extension-history";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";

interface EditorExtensions {
  extensions: Accessor<Extensions>;
  add: (exts: Extensions) => void;
  remove: (exts: Extensions) => void;
}

export function createEditorExtensions(): EditorExtensions {
  const [extensions, setExtensions] = createSignal<Extensions>([Document, History, Text, Paragraph]);

  function add(exts: Extensions): void {
    setExtensions([...extensions(), ...exts]);
  }

  function remove(exts: Extensions): void {
    setExtensions(extensions().filter((ext) => !exts.includes(ext)));
  }

  return { extensions, add, remove };
}

export const EditorExtensionsCtx = createContext<EditorExtensions>();

export function useEditorExtensions(): EditorExtensions {
  const ctx = useContext(EditorExtensionsCtx);
  if (!ctx) throw new Error("useEditorExtensions must be used within EditorExtensionsProvider");
  return ctx;
}
