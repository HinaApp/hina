import { Component, createSignal, onCleanup, onMount } from "solid-js";
import { Editor } from "@tiptap/core";
import { EditorArea, useEditorExtensions } from "~/entities/editor-area";
import { SlashMenuExt } from "~/features/block/add";

export const RichTextEditor: Component = () => {
  const [editor, setEditor] = createSignal<Editor | null>(null);

  onMount(() => {
    const extStore = useEditorExtensions();
    const exts = [SlashMenuExt];
    extStore.add(exts);

    onCleanup(() => {
      extStore.remove(exts);
    });
  });

  return <EditorArea editor={editor()} onEditorChange={(editor) => setEditor(editor)} />;
};
