// Level progress toward the next level, plus a running count of solved challenges.
export default function XpBar({ xp, xpToNext, solved }) {
  const pct = Math.min(100, (xp / xpToNext) * 100);
  return (
    <div className="xp-row">
      <div className="xp-track">
        <div className="xp-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="xp-meta">
        <span>
          {xp} / {xpToNext} XP
        </span>
        <span>◇ {solved} solved</span>
      </div>
    </div>
  );
}
