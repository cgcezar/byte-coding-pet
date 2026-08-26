// A small transient banner used for level-ups and evolutions.
export default function Toast({ msg, kind }) {
  return <div className={"toast " + (kind === "level" ? "toast-level" : "")}>{msg}</div>;
}
