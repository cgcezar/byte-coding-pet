import Dragon from "./Dragon.jsx";
import { MOOD_TEXT } from "../game/config.js";

// The little "screen" the pet lives in: a soft glow, subtle scanlines, the
// dragon, a floating +XP on reward, and a mood caption.
export default function PetScreen({ stage, level, mood, reaction, xpFloat }) {
  const petClass =
    "pet " + (reaction === "happy" ? "pet-happy" : reaction === "sad" ? "pet-sad" : "");

  return (
    <div className="screen">
      <div className="screen-glow" />
      <div className="scanlines" />
      <div className={petClass}>
        <Dragon stage={stage} level={level} mood={mood} />
      </div>
      {xpFloat && (
        <div key={xpFloat.key} className="xp-float">
          +{xpFloat.amount} XP
        </div>
      )}
      <div className="mood">{MOOD_TEXT[mood]}</div>
    </div>
  );
}
