// Central place for the game's tunable values and static config.
// Tweak these to rebalance how Byte grows and how quickly needs decay.

// Evolution stages, mapped by level range.
export const STAGES = [
  { name: "Hatchling", min: 1, max: 3 },
  { name: "Whelpling", min: 4, max: 7 },
  { name: "Drake", min: 8, max: 12 },
  { name: "Dragon", min: 13, max: Infinity },
];

// The three needs the pet has. Each decays over time.
export const NEEDS = {
  hunger: { label: "Hunger", emoji: "🍖" },
  fun: { label: "Fun", emoji: "🎮" },
  focus: { label: "Focus", emoji: "🧠" },
};

// Each action restores one need and draws a challenge of a set difficulty.
export const ACTIONS = {
  feed: { label: "Feed", emoji: "🍖", need: "hunger", diff: "easy", accent: "#f5b53a" },
  play: { label: "Play", emoji: "🎮", need: "fun", diff: "medium", accent: "#6ee7a5" },
  train: { label: "Train", emoji: "🧠", need: "focus", diff: "hard", accent: "#9d95ec" },
};

// What Byte "says" for each mood.
export const MOOD_TEXT = {
  happy: "Yes! Nailed it 🎉",
  thriving: "Thriving and happy!",
  content: "Feeling good.",
  worried: "Getting a little needy…",
  sick: "Not feeling great — help me out!",
  sad: "Aw, that one didn't pass.",
};

// ── Tunable balance constants ──────────────────────────────────────────────
export const RESTORE = 42;        // how much a solved challenge restores its need
export const DECAY_MS = 4500;     // how often needs tick down (ms), paused during a challenge
export const DECAY_AMOUNT = 2;    // how much each need drops per tick
export const XP_PER_LEVEL = 15;   // xp needed to reach the next level = level * this
export const REACTION_MS = 1400;  // how long a happy/sad reaction animation lasts
export const START_NEEDS = { hunger: 78, fun: 78, focus: 78 };
