import { NEEDS } from "../game/config.js";

// The three need meters. Each bar changes color as it gets low or hits zero.
export default function StatBars({ needs }) {
  return (
    <div className="needs">
      {Object.entries(NEEDS).map(([key, n]) => {
        const val = needs[key];
        const tone = val === 0 ? "crit" : val < 30 ? "low" : "ok";
        return (
          <div className="need" key={key}>
            <div className="need-head">
              <span>
                {n.emoji} {n.label}
              </span>
              <span className="need-val">{val}</span>
            </div>
            <div className="need-track">
              <div className={"need-fill need-" + tone} style={{ width: val + "%" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
