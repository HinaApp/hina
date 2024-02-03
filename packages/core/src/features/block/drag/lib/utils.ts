export function nodeAtCoords(coords: { x: number; y: number }, selectors: string): Element | null {
  return (
    document
      .elementsFromPoint(coords.x, coords.y)
      .find(
        (el) =>
          (el.parentElement?.matches(selectors) ?? false) ||
          el.matches(["div[draggable]:not([class=BlockDragHandle])"].join(", "))
      ) ?? null
  );
}
