import { useRef } from "react";

// A minimal code editor: a styled <textarea> where Tab inserts two spaces
// instead of moving focus, which makes writing code far less annoying.
export default function CodeEditor({ value, onChange }) {
  const ref = useRef(null);

  function handleKeyDown(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = ref.current;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = value.slice(0, start) + "  " + value.slice(end);
      onChange(next);
      // Restore the caret just after the inserted spaces on the next frame.
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2;
      });
    }
  }

  return (
    <textarea
      ref={ref}
      className="editor"
      spellCheck={false}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
