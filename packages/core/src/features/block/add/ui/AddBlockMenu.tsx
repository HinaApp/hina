import { Component, createSignal, For, onMount } from "solid-js";
import { styled } from "solid-jsx-css";
import { MenuItem } from "../model/menuItems";

interface AddBlockMenuProps {
  command: (props: MenuItem) => void;
  items: MenuItem[];
  exposeOnKeyDownHandler: (fn: (e: KeyboardEvent) => boolean) => void;
}

export const AddBlockMenu: Component<AddBlockMenuProps> = (props) => {
  const [selectedIndex, setSelectedIndex] = createSignal(0);

  // Expose onKeyDown function
  onMount(() => {
    props.exposeOnKeyDownHandler(onKeyDown);
  });

  function onKeyDown(e: KeyboardEvent): boolean {
    switch (e.key) {
      case "ArrowUp": {
        setSelectedIndex((selectedIndex() + props.items.length - 1) % props.items.length);
        break;
      }
      case "ArrowDown": {
        setSelectedIndex((selectedIndex() + 1) % props.items.length);
        break;
      }
      case "Enter": {
        const item = props.items[selectedIndex()];
        if (item) props.command(item);
        break;
      }
      default: {
        return false;
      }
    }
    return true;
  }

  return styled(
    <div class="AddBlockMenu">
      <For each={props.items}>
        {(item, index) => (
          <div
            class="MenuItem"
            classList={{ selected: index() === selectedIndex() }}
            onClick={() => props.command(item)}
          >
            {item.title}
          </div>
        )}
      </For>
    </div>
  )`
    .AddBlockMenu {
      position: absolute;
      background: gray;
      padding: 4px;
    }

    .MenuItem {
      cursor: pointer;
    }

    .selected {
      color: white;
    }
  `;
};
