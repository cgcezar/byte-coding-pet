import CodeEditor from "./CodeEditor.jsx";
import { ACTIONS, NEEDS, RESTORE } from "../game/config.js";
import { fmt } from "../game/engine.js";

// The overlay where the learner actually solves a challenge. It shows the
// prompt, an editor, a live list of test cases, and — once everything passes —
// a button to collect the reward.
export default function ChallengeModal({
  challenge,     // { data, action }
  code,
  onCodeChange,
  result,        // null | { kind, message?, results }
  onRun,
  onCollect,
  onNewChallenge,
  onClose,
}) {
  const meta = ACTIONS[challenge.action];
  const data = challenge.data;
  const passed = result && result.kind === "pass";

  return (
    <div className="overlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <div className="modal-title">
            <span className="modal-emoji">{meta.emoji}</span>
            <span>{meta.label} Byte</span>
            <span className={"diff-badge diff-" + data.diff}>{data.diff}</span>
          </div>
          <button className="x" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <p className="prompt">{data.prompt}</p>

        <CodeEditor value={code} onChange={onCodeChange} />

        <div className="tests">
          {data.tests.map((t, i) => {
            const r = result && result.results[i];
            const cls = "test " + (r ? (r.pass ? "test-pass" : "test-fail") : "");
            return (
              <div className={cls} key={i}>
                <span className="test-mark">{r ? (r.pass ? "✓" : "✗") : "•"}</span>
                <code className="test-call">
                  {data.fn}({t.args.map(fmt).join(", ")}) → {fmt(t.expected)}
                </code>
                {r && !r.pass && (
                  <span className="test-got">
                    {r.threw ? "error: " + r.error : "got " + fmt(r.got)}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {result && result.kind === "error" && (
          <div className="err-msg">{result.message}</div>
        )}
        {passed && (
          <div className="ok-msg">
            All tests passed — reward is {meta.emoji} +{RESTORE} {NEEDS[meta.need].label}, +{data.xp} XP
          </div>
        )}

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onNewChallenge}>
            ↻ New challenge
          </button>
          {passed ? (
            <button className="btn btn-collect" onClick={onCollect}>
              Collect reward →
            </button>
          ) : (
            <button className="btn btn-run" onClick={onRun}>
              ▶ Run tests
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
