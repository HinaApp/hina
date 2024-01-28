import { Component, JSXElement } from "solid-js";
import { styled } from "solid-jsx-css";

export const MainLayout: Component<{ children: JSXElement }> = (props) => {
  return styled(<div class="MainLayout">{props.children}</div>)`
    .MainLayout {
      height: 100%;
    }
  `;
};
