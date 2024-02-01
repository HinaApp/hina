import { Extension } from "@tiptap/core";
import { Heading } from "@tiptap/extension-heading";
import { Suggestion, SuggestionOptions } from "@tiptap/suggestion";
import { MenuItem, menuItems } from "../model/menuItems";
import { renderMenu } from "./renderMenu";
import "../ui/tiptapBlocks.css";

type SlashMenuOptions = Omit<SuggestionOptions<MenuItem>, "editor">;

export const SlashMenuExt = Extension.create<SlashMenuOptions>({
  name: "slashMenu",
  addOptions() {
    return {
      char: "/",
      command: ({ editor, range, props }) => {
        props.onCommand({ editor, range });
      },
    };
  },
  addExtensions() {
    return [
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ];
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        ...this.options,
        editor: this.editor,
        items: ({ query }) => menuItems.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())),
        render: renderMenu,
      }),
    ];
  },
});
