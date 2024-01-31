import { Component } from "solid-js";
import { createPlatformConfigs, PlatformConfigs, PlatformConfigsCtx } from "~/shared/lib";
import { createEditorExtensions, EditorExtensionsCtx } from "~/entities/editor-area";
import { MainLayout } from "~/widgets/layout";
import { RichTextEditor } from "~/widgets/rich-text-editor";

interface AppProps {
  defaultPlatformConfigs: PlatformConfigs;
}

export const App: Component<AppProps> = (props) => {
  const extensions = createEditorExtensions();
  const platformConfigs = createPlatformConfigs(props.defaultPlatformConfigs);

  return (
    <PlatformConfigsCtx.Provider value={platformConfigs}>
      <MainLayout>
        <EditorExtensionsCtx.Provider value={extensions}>
          <RichTextEditor />
        </EditorExtensionsCtx.Provider>
      </MainLayout>
    </PlatformConfigsCtx.Provider>
  );
};
