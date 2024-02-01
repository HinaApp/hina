import { ChainedCommands, Editor, Range } from "@tiptap/core";

interface MenuItemProps {
  editor: Editor;
  range: Range;
}

export interface MenuItem {
  title: string;
  onCommand: (props: MenuItemProps) => boolean;
}

function runCommand({ editor, range }: MenuItemProps, command: (cmd: ChainedCommands) => ChainedCommands): boolean {
  return command(editor.chain().focus().deleteRange(range)).run();
}

export const menuItems: MenuItem[] = [
  {
    title: "Heading 1",
    onCommand: (props) => runCommand(props, (cmd) => cmd.toggleHeading({ level: 1 })),
  },
  {
    title: "Heading 2",
    onCommand: (props) => runCommand(props, (cmd) => cmd.toggleHeading({ level: 2 })),
  },
  {
    title: "Heading 3",
    onCommand: (props) => runCommand(props, (cmd) => cmd.toggleHeading({ level: 3 })),
  },
];
