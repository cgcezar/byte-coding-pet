# 🐉 Byte — a coding pet

A tamagotchi-style game where you care for a dragon by **solving code challenges**. Instead of clicking a button to feed or play, you write a real JavaScript function that gets run against test cases, and only a passing solution keeps Byte fed, entertained, and evolving from a hatchling into a full dragon.

---

## ✨ What makes it different

- **You earn every interaction.** Feed, Play, and Train each open a coding challenge. Pass the tests and Byte gets the reward; fail and it stays hungry.
- **Three difficulty tiers.** Feed pulls an easy challenge, Play a medium one, Train a hard one — harder problems grant more XP, so Training is the risk/reward move.
- **A real test runner.** Your code runs against each test case in a contained scope, with pass/fail shown per test and expected-vs-got on failures. Syntax and runtime errors are handled gracefully.
- **Living needs.** Hunger, Fun, and Focus decay over time (paused while you're solving), and Byte's mood and expression shift from thriving to worried to sick.
- **Evolution.** XP levels Byte up through four stages: Hatchling → Whelpling → Drake → Dragon.

---

## 🚀 Getting started

You'll need [Node.js](https://nodejs.org) 18 or newer.

```bash
# 1. install dependencies
npm install

# 2. start the dev server (skip if not built yet)
npm run dev

# 3. build for production
npm run build

# 4. preview the production build locally
npm run preview
```

`npm run dev` prints a local URL (usually http://localhost:5173) — open it and start solving.

---

## 🧩 How it works

The core loop is:

```
pick an action → solve its coding challenge → Byte's need is restored + XP earned → level up → evolve
```

**XP & leveling.** Each solve grants XP by difficulty (easy 10, medium 20, hard 35). The XP to reach the next level is `level × 15`, so it gets gradually harder. A big early solve can grant more than one level at once.

**Stages.**

| Stage | Levels |
| --- | --- |
| Hatchling | 1–3 |
| Whelpling | 4–7 |
| Drake | 8–12 |
| Dragon | 13+ |

**Needs.** Hunger, Fun, and Focus each tick down over time. Let one hit zero and Byte gets "sick" (and looks it) until you nurse it back up by solving challenges. All the balance numbers live in one place: [`src/game/config.js`](src/game/config.js).

---

## 📁 Project structure

The code is split by responsibility so game logic, data, and UI stay separate:

```
byte-coding-pet/
├── index.html                # Vite entry
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx              # React entry — mounts <App>
│   ├── App.jsx               # composes the UI, owns challenge-flow state
│   ├── styles.css            # the whole theme (self-contained)
│   ├── data/
│   │   └── challenges.js     # the challenge bank (add your own here)
│   ├── game/
│   │   ├── config.js         # stages, actions, needs, tunable constants
│   │   └── engine.js         # pure logic: xp math, challenge picking, test runner
│   ├── hooks/
│   │   └── usePet.js         # custom hook: pet state, decay, mood, rewards
│   └── components/
│       ├── Dragon.jsx        # the SVG pet
│       ├── PetScreen.jsx     # the habitat screen
│       ├── XpBar.jsx         # level progress
│       ├── StatBars.jsx      # the three need meters
│       ├── ActionBar.jsx     # Feed / Play / Train buttons
│       ├── ChallengeModal.jsx# the challenge overlay
│       ├── CodeEditor.jsx    # textarea with Tab-to-indent
│       └── Toast.jsx         # level-up / evolution banner
├── LICENSE
└── README.md
```

The key idea: **`src/game/`** is plain, framework-free JavaScript (easy to reason about and test), **`src/hooks/usePet.js`** wraps the game state in React, and **`src/components/`** is pure presentation.

---

## 🌐 Deploy it for free

This builds to static files (`npm run build` → `dist/`), so any static host works at no cost:

| Host | How |
| --- | --- |
| **GitHub Pages** | Push `dist/` (or use an action). `base: "./"` in `vite.config.js` already makes paths relative for project sites. |
| **Netlify** | Build command `npm run build`, publish directory `dist`. |
| **Cloudflare Pages** | Same: build `npm run build`, output `dist`. |
| **Vercel** | Import the repo, framework "Vite". |

---

## 🧠 Extending it

Two natural next steps, with enough detail to actually do them.

### 1. Add save-persistence

Right now Byte's progress lives in memory and resets on refresh. To make it stick, save the pet state to `localStorage` and load it on startup. All the state lives in `usePet`, so that's the only file you touch.

Add a storage key and lazy initial state:

```js
// src/hooks/usePet.js
const STORAGE_KEY = "byte-pet-v1";

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null; // corrupt or unavailable storage — start fresh
  }
}

export function usePet({ paused }) {
  const saved = loadSaved();
  const [level, setLevel] = useState(saved?.level ?? 1);
  const [xp, setXp] = useState(saved?.xp ?? 0);
  const [solved, setSolved] = useState(saved?.solved ?? 0);
  const [needs, setNeeds] = useState(saved?.needs ?? START_NEEDS);
  // ...rest unchanged
```

Then persist whenever the saved fields change:

```js
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ level, xp, solved, needs })
      );
    } catch {
      /* storage full or blocked (e.g. private mode) — ignore */
    }
  }, [level, xp, solved, needs]);
```

Two things worth handling well:

- **Offline decay.** If you also save a `lastSeen` timestamp, you can decay needs based on real elapsed time on load (e.g. `Math.floor((Date.now() - lastSeen) / DECAY_MS) * DECAY_AMOUNT`) so Byte gets appropriately hungry while the tab is closed. Skip this and it simply pauses while away.
- **Versioning.** Keep the `-v1` suffix on the key. If you later change the saved shape, bump to `-v2` so old saves don't crash the new code.

> **Security note:** `localStorage` is per-browser and per-device, and it's the right tool here because there's no backend and no secrets involved. If you ever want cross-device saves, that means a small backend + accounts — and that's the point where hosting could start to cost money. Never put API keys or tokens in client-side code.

### 2. Grow the challenge bank

Every challenge is just a data object in [`src/data/challenges.js`](src/data/challenges.js). To add one, append an entry:

```js
{
  id: "clamp",            // unique
  diff: "medium",         // "easy" | "medium" | "hard"  → Feed / Play / Train
  fn: "clamp",            // the exact function name the solver must define
  xp: 20,                 // reward
  prompt: "Write `clamp(n, lo, hi)` that returns n limited to the range [lo, hi].",
  starter: "function clamp(n, lo, hi) {\n  \n}",
  tests: [
    { args: [5, 0, 10], expected: 5 },
    { args: [-3, 0, 10], expected: 0 },
    { args: [99, 0, 10], expected: 10 },
  ],
}
```

That's it — the game picks it up automatically. Guidelines:

- **Match `fn` exactly** to the name in the prompt and starter; the runner looks that name up.
- **Keep results JSON-comparable.** Results are checked with `JSON.stringify`, which is perfect for numbers, strings, booleans, arrays, and plain objects. It does *not* handle `undefined`, `NaN`, functions, `Map`/`Set`, or floating-point rounding — for math with decimals, have the solver round, or switch the comparison in `runTests` (`src/game/engine.js`) to a tolerance check.
- **Add a few tests per challenge,** including an edge case (empty input, zero, negatives) so a lucky guess doesn't pass.
- **Difficulty drives the reward** and which action can draw it. Want a fourth tier or a "boss" challenge? Add a difficulty here, then map it to a new action in `src/game/config.js`.

Bigger ideas once the bank grows: group challenges by topic (strings, arrays, math) and let the player choose a theme; load challenges from a separate JSON file or a public API so the bank isn't baked into the bundle; or track which challenges have been solved and prefer unseen ones.

---

## 📄 License

MIT © [Cliff Cezar] — see [`LICENSE`](LICENSE).
