import { EditorView } from "@codemirror/view";

export const customTheme = EditorView.theme({
  "&": {
    outline: "none !important",
    height: "100%",
  },
  ".cm-content": {
    fontFamily: "var(--font-plex-mone), monospace",
    fontSize: "14px",
  },
  ".cm-scroller": {
    scrollbarWith: "thin",
    scrollbarCollor: "#3f3f46 transparent"
  }

})