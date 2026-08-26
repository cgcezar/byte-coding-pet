import { useState, useRef } from "react";
import { usePet } from "./hooks/usePet.js";
import { pickChallenge, runTests } from "./game/engine.js";
import { ACTIONS } from "./game/config.js";

import PetScreen from "./components/PetScreen.jsx";
import XpBar from "./components/XpBar.jsx";
import StatBars from "./components/StatBars.jsx";
import ActionBar from "./components/ActionBar.jsx";
import ChallengeModal from "./components/ChallengeModal.jsx";
import Toast from "./components/Toast.jsx";

export default function App() {
  // UI-flow state (which challenge is open, editor contents, run result, etc.).
  const [challenge, setChallenge] = useState(null); // { data, action }
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState(null);
  const [xpFloat, setXpFloat] = useState(null);
  const lastId = useRef(null);

  // Game state lives in the hook. Decay pauses while a challenge is open.
  const pet = usePet({ paused: !!challenge });

  function showToast(msg, kind = "info") {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 2600);
  }

  function openAction(actionKey) {
    const meta = ACTIONS[actionKey];
    const data = pickChallenge(meta.diff, lastId.current);
    lastId.current = data.id;
    setChallenge({ data, action: actionKey });
    setCode(data.starter);
    setResult(null);
  }

  function newChallenge() {
    if (!challenge) return;
    const meta = ACTIONS[challenge.action];
    const data = pickChallenge(meta.diff, challenge.data.id);
    lastId.current = data.id;
    setChallenge({ data, action: challenge.action });
    setCode(data.starter);
    setResult(null);
  }

  function runCode() {
    setResult(runTests(code, challenge.data));
  }

  function collectReward() {
    const meta = ACTIONS[challenge.action];
    const info = pet.reward({ need: meta.need, xp: challenge.data.xp });

    setXpFloat({ amount: challenge.data.xp, key: Date.now() });
    setTimeout(() => setXpFloat(null), 1100);

    if (info.evolvedTo) showToast(`Byte evolved into a ${info.evolvedTo}! 🐉`, "level");
    else if (info.leveledUp) showToast(`Level up! Byte is now level ${info.newLevel}.`, "level");

    setChallenge(null);
    setResult(null);
  }

  function closeChallenge() {
    setChallenge(null);
    setResult(null);
  }

  return (
    <div className="wrap">
      <div className="device">
        <div className="topbar">
          <div className="brand">
            <span className="brand-name">Byte</span>
            <span className="brand-sub">coding pet</span>
          </div>
          <div className="badges">
            <span className="chip">{pet.stage}</span>
            <span className="chip chip-lvl">Lv {pet.level}</span>
          </div>
        </div>

        <PetScreen
          stage={pet.stage}
          level={pet.level}
          mood={pet.mood}
          reaction={pet.reaction}
          xpFloat={xpFloat}
        />

        <XpBar xp={pet.xp} xpToNext={pet.xpToNext} solved={pet.solved} />
        <StatBars needs={pet.needs} />
        <ActionBar disabled={!!challenge} onAction={openAction} />

        <p className="hint">
          Solve a coding challenge to feed, play with, or train Byte. Keep all three needs up as it
          grows from Hatchling to Dragon.
        </p>
      </div>

      {challenge && (
        <ChallengeModal
          challenge={challenge}
          code={code}
          onCodeChange={setCode}
          result={result}
          onRun={runCode}
          onCollect={collectReward}
          onNewChallenge={newChallenge}
          onClose={closeChallenge}
        />
      )}

      {toast && <Toast msg={toast.msg} kind={toast.kind} />}
    </div>
  );
}
