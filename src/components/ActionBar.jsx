import { ACTIONS } from "../game/config.js";

// The three interaction buttons. Each opens a coding challenge of its difficulty.
export default function ActionBar({ disabled, onAction }) {
  return (
    <div className="actions">
      {Object.entries(ACTIONS).map(([key, a]) => (
        <button
          key={key}
          className="action"
          style={{ "--accent": a.accent }}
          onClick={() => onAction(key)}
          disabled={disabled}
        >
          <span className="action-emoji">{a.emoji}</span>
          <span className="action-label">{a.label}</span>
          <span className="action-diff">{a.diff}</span>
        </button>
      ))}
    </div>
  );
}
