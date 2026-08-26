import { useState, useEffect } from "react";
import { stageFor, xpNeeded } from "../game/engine.js";
import {
  START_NEEDS,
  DECAY_MS,
  DECAY_AMOUNT,
  RESTORE,
  REACTION_MS,
} from "../game/config.js";

/**
 * All of Byte's game state in one place: level, xp, needs, and derived
 * stage/mood. Keeping this in a hook separates game logic from presentation.
 *
 * @param {{ paused: boolean }} opts - when paused (e.g. a challenge is open),
 *   needs stop decaying so the learner isn't punished for taking time to solve.
 */
export function usePet({ paused }) {
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [solved, setSolved] = useState(0);
  const [needs, setNeeds] = useState(START_NEEDS);
  const [reaction, setReaction] = useState("idle"); // transient: "happy" | "sad" | "idle"

  // Needs tick down over time, unless paused.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setNeeds((n) => ({
        hunger: Math.max(0, n.hunger - DECAY_AMOUNT),
        fun: Math.max(0, n.fun - DECAY_AMOUNT),
        focus: Math.max(0, n.focus - DECAY_AMOUNT),
      }));
    }, DECAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  // Derived values.
  const stage = stageFor(level);
  const avg = (needs.hunger + needs.fun + needs.focus) / 3;
  const anyZero = needs.hunger === 0 || needs.fun === 0 || needs.focus === 0;

  let mood = "content";
  if (reaction === "happy") mood = "happy";
  else if (reaction === "sad") mood = "sad";
  else if (anyZero) mood = "sick";
  else if (avg < 35) mood = "worried";
  else if (avg > 72) mood = "thriving";

  /** Briefly show a reaction animation, then return to idle. */
  function flash(kind) {
    setReaction(kind);
    setTimeout(() => setReaction("idle"), REACTION_MS);
  }

  /**
   * Apply the reward for a solved challenge: restore its need, bank XP, and
   * level up (possibly more than once early on).
   * @returns {{ leveledUp: boolean, evolvedTo: string|null, newLevel: number }}
   */
  function reward({ need, xp: gain }) {
    setNeeds((n) => ({ ...n, [need]: Math.min(100, n[need] + RESTORE) }));
    setSolved((s) => s + 1);

    let total = xp + gain;
    let lvl = level;
    while (total >= xpNeeded(lvl)) {
      total -= xpNeeded(lvl);
      lvl += 1;
    }
    setXp(total);

    let leveledUp = false;
    let evolvedTo = null;
    if (lvl > level) {
      leveledUp = true;
      const before = stageFor(level);
      const after = stageFor(lvl);
      if (after !== before) evolvedTo = after;
      setLevel(lvl);
    }

    flash("happy");
    return { leveledUp, evolvedTo, newLevel: lvl };
  }

  /** Reset Byte back to a fresh hatchling. */
  function reset() {
    setLevel(1);
    setXp(0);
    setSolved(0);
    setNeeds(START_NEEDS);
    setReaction("idle");
  }

  return {
    level,
    xp,
    solved,
    needs,
    stage,
    mood,
    reaction,
    xpToNext: xpNeeded(level),
    reward,
    flash,
    reset,
  };
}
