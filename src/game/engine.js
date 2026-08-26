// Pure, framework-free game logic. No React in here, which keeps it easy to
// reason about and unit-test on its own.

import { STAGES, XP_PER_LEVEL } from "./config.js";
import { CHALLENGES } from "../data/challenges.js";

/** Name of the evolution stage for a given level. */
export function stageFor(level) {
  const s = STAGES.find((x) => level >= x.min && level <= x.max);
  return s ? s.name : "Dragon";
}

/** XP required to advance from `level` to the next one. */
export function xpNeeded(level) {
  return level * XP_PER_LEVEL;
}

/** Pick a random challenge of a difficulty, avoiding an immediate repeat. */
export function pickChallenge(diff, avoidId) {
  const pool = CHALLENGES.filter((c) => c.diff === diff && c.id !== avoidId);
  const list = pool.length ? pool : CHALLENGES.filter((c) => c.diff === diff);
  return list[Math.floor(Math.random() * list.length)];
}

/** Stable string form used to compare a result against an expected value. */
export function fmt(v) {
  return JSON.stringify(v);
}

/**
 * Run the learner's code against a challenge's test cases.
 *
 * The code is the user's own JavaScript, executed in a contained function
 * scope via the Function constructor — the same idea as an in-browser REPL.
 * It only has access to whatever it declares; it can't reach the app's state.
 *
 * @returns {{ kind: "pass"|"fail"|"error", message?: string, results: Array }}
 */
export function runTests(code, challenge) {
  let fn;
  try {
    // eslint-disable-next-line no-new-func
    fn = new Function(
      `${code}\n; return typeof ${challenge.fn} === "function" ? ${challenge.fn} : undefined;`
    )();
  } catch (e) {
    return { kind: "error", message: "Syntax error: " + e.message, results: [] };
  }

  if (typeof fn !== "function") {
    return { kind: "error", message: `Couldn't find a function named "${challenge.fn}".`, results: [] };
  }

  const results = challenge.tests.map((t) => {
    try {
      const got = fn(...t.args);
      return { ...t, got, pass: fmt(got) === fmt(t.expected), threw: false };
    } catch (e) {
      return { ...t, got: undefined, pass: false, threw: true, error: e.message };
    }
  });

  return { kind: results.every((r) => r.pass) ? "pass" : "fail", results };
}
