import { Component } from "solid-js";
import { styled } from "solid-jsx-css";

export const App: Component = () => {
  return styled(<div>Hello world</div>)`
    div {
      color: red;
    }
  `;
};
