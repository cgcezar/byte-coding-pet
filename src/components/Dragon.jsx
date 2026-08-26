// The pet itself, drawn as an inline SVG so it scales crisply and needs no
// image assets. Its colors change per evolution stage, it grows slightly with
// level, and its face reflects the current mood.

const STAGE_COLORS = {
  Hatchling: { body: "#AFA9EC", belly: "#EEEDFE", eye: "#3C3489", wing: "#7F77DD", flame: "#EF9F27" },
  Whelpling: { body: "#7F77DD", belly: "#CECBF6", eye: "#26215C", wing: "#534AB7", flame: "#EF9F27" },
  Drake: { body: "#534AB7", belly: "#AFA9EC", eye: "#26215C", wing: "#3C3489", flame: "#D85A30" },
  Dragon: { body: "#3C3489", belly: "#7F77DD", eye: "#EEEDFE", wing: "#26215C", flame: "#E24B4A" },
};

export default function Dragon({ stage, level, mood }) {
  const c = STAGE_COLORS[stage] || STAGE_COLORS.Hatchling;
  const scale = Math.min(1 + (level - 1) * 0.04, 1.3);
  const cx = 95;
  const cy = 92;

  const happy = mood === "happy" || mood === "thriving";
  const sad = mood === "sad" || mood === "sick" || mood === "worried";

  const mouth = happy
    ? `M${cx + 26} ${cy + 10} Q${cx + 35} ${cy + 17} ${cx + 44} ${cy + 10}`
    : sad
    ? `M${cx + 26} ${cy + 15} Q${cx + 35} ${cy + 9} ${cx + 44} ${cy + 15}`
    : `M${cx + 27} ${cy + 12} L${cx + 43} ${cy + 12}`;

  return (
    <svg
      viewBox="0 0 190 195"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: 190, maxHeight: 190 }}
    >
      <g transform={`translate(${(cx - 50 * (scale - 1)).toFixed(1)},${(cy - 50 * (scale - 1)).toFixed(1)}) scale(${scale.toFixed(3)})`}>
        <path d={`M${cx - 20} ${cy - 10} Q${cx - 56} ${cy - 50} ${cx - 40} ${cy + 22} Z`} fill={c.wing} opacity="0.7" />
        <ellipse cx={cx} cy={cy + 10} rx="40" ry="46" fill={c.body} />
        <ellipse cx={cx} cy={cy + 20} rx="23" ry="31" fill={c.belly} opacity="0.8" />
        <ellipse cx={cx + 10} cy={cy - 28} rx="29" ry="25" fill={c.body} />
        <ellipse cx={cx + 40} cy={cy - 20} rx="14" ry="10" fill={c.body} />
        <circle cx={cx + 46} cy={cy - 22} r="2.5" fill={c.eye} opacity="0.5" />

        {mood === "sick" ? (
          <path d={`M${cx + 12} ${cy - 34} L${cx + 24} ${cy - 34}`} stroke={c.eye} strokeWidth="2.5" strokeLinecap="round" />
        ) : (
          <>
            <circle cx={cx + 18} cy={cy - 34} r="8" fill="#fff" />
            <circle cx={cx + 20} cy={cy - 34} r="5" fill={c.eye} />
            <circle cx={cx + 22} cy={cy - 36} r="1.5" fill="#fff" />
          </>
        )}

        <path d={`M${cx + 5} ${cy - 48} Q${cx} ${cy - 66} ${cx + 8} ${cy - 60}`} stroke={c.wing} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d={`M${cx + 17} ${cy - 50} Q${cx + 19} ${cy - 68} ${cx + 23} ${cy - 60}`} stroke={c.wing} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d={mouth} stroke={c.eye} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d={`M${cx - 30} ${cy + 46} Q${cx - 62} ${cy + 72} ${cx - 46} ${cy + 82} Q${cx - 30} ${cy + 92} ${cx - 20} ${cy + 76}`} stroke={c.body} strokeWidth="10" fill="none" strokeLinecap="round" />
        <ellipse cx={cx - 18} cy={cy + 54} rx="10" ry="7" fill={c.wing} />
        <ellipse cx={cx + 18} cy={cy + 54} rx="10" ry="7" fill={c.wing} />

        {happy && (
          <g>
            <ellipse cx={cx + 46} cy={cy - 18} rx="7" ry="11" fill={c.flame} opacity="0.9" />
            <ellipse cx={cx + 52} cy={cy - 22} rx="5" ry="8" fill="#FAC775" opacity="0.85" />
            <ellipse cx={cx + 46} cy={cy - 26} rx="3" ry="5" fill="#fff" opacity="0.55" />
          </g>
        )}
      </g>
    </svg>
  );
}
