import { Component } from "solid-js";
import { createEditorExtensions, EditorExtensionsCtx } from "~/entities/editor-area";
import { MainLayout } from "~/widgets/layout";
import { RichTextEditor } from "~/widgets/rich-text-editor";

export const App: Component = () => {
  const extensions = createEditorExtensions();

  return (
    <MainLayout>
      <EditorExtensionsCtx.Provider value={extensions}>
        <RichTextEditor />
      </EditorExtensionsCtx.Provider>
    </MainLayout>
  );
};
