import { Component, createEffect, onCleanup } from "solid-js";
import { styled } from "solid-jsx-css";
import { Editor } from "@tiptap/core";
import { useEditorExtensions } from "../model/extensionStore";

interface EditorAreaProps {
  editor: Editor | null;
  onEditorChange: (e: Editor | null) => void;
}

export const EditorArea: Component<EditorAreaProps> = (props) => {
  let ref: HTMLDivElement | undefined;

  const { extensions } = useEditorExtensions();

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
    }

    :deep(.ProseMirror) {
      outline: none;
      padding: 10px;
      height: 100%;
      overflow: auto;

      > * {
        margin: 5px 0;
      }
    }
  `;
};
