import { Component, createEffect, onCleanup, onMount } from "solid-js";
import { styled } from "solid-jsx-css";
import { Editor } from "@tiptap/core";
import { usePlatformConfigs } from "~/shared/lib";
import { useEditorExtensions } from "../model/extensionStore";

interface EditorAreaProps {
  editor: Editor | null;
  onEditorChange: (e: Editor | null) => void;
}

export const EditorArea: Component<EditorAreaProps> = (props) => {
  let ref: HTMLDivElement | undefined;
  let fileName: string | null = null;

  const { extensions } = useEditorExtensions();
  const { openFile, saveFile } = usePlatformConfigs();

  async function handleKeydown(e: KeyboardEvent): Promise<void> {
    if (!e.ctrlKey || !props.editor) return;

    if (e.key === "o") {
      const file = await openFile();
      if (file) {
        fileName = file.name;
        props.editor.commands.setContent(file.content);
      }
    } else if (e.key === "s") {
      fileName = await saveFile(fileName, props.editor.getHTML().trim());
    }
  }

  onMount(() => {
    ref?.addEventListener("keydown", handleKeydown);
    onCleanup(() => {
      ref?.removeEventListener("keydown", handleKeydown);
    });
  });

  createEffect(() => {
    const editor = new Editor({
      element: ref,
      extensions: extensions(),
      content: "Hello world",
    });
    props.onEditorChange(editor);

    onCleanup(() => {
      props.onEditorChange(null);
      editor.destroy();
    });
  });

  return styled(<div class="RichTextEditor" ref={ref} />)`
    .RichTextEditor {
      height: 100%;
      line-height: 1.2;
    }

    :deep(.ProseMirror) {
      outline: none;
      padding: 20px;
      height: 100%;
      overflow: auto;

      > * {
        margin: 5px 0;
      }
    }
  `;
};
