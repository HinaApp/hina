import { Component, createSignal } from "solid-js";
import { Editor } from "@tiptap/core";
import { EditorArea } from "~/entities/editor-area";

export const RichTextEditor: Component = () => {
  const [editor, setEditor] = createSignal<Editor | null>(null);

  return <EditorArea editor={editor()} onEditorChange={(editor) => setEditor(editor)} />;
};
