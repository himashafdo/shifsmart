// Tiny dependency-free SVG charts

export function Donut({ data, centerValue, centerLabel, size = 170 }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = size / 2 - 16;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={c} cy={c} r={r} fill="none" stroke="#eef1f5" strokeWidth="22" />
      {data.map((d, i) => {
        const len = (d.value / total) * circ;
        const seg = (
          <circle key={i} cx={c} cy={c} r={r} fill="none"
            stroke={d.color} strokeWidth="22"
            strokeDasharray={`${len} ${circ - len}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${c} ${c})`} />
        );
        offset += len;
        return seg;
      })}
      <text x={c} y={c - 4} textAnchor="middle" fontSize="26" fontWeight="700" fill="#1a2332">{centerValue}</text>
      <text x={c} y={c + 16} textAnchor="middle" fontSize="11" fill="#6b7a90">{centerLabel}</text>
    </svg>
  );
}

export function LineChart({ data, height = 180, color = "#3b6ca8" }) {
  const w = 100, h = 100, pad = 8;
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const pts = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((d.value - min) / (max - min || 1)) * (h - pad * 2);
    return [x, y];
  });
  const path = pts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
  const area = path + ` L${pts[pts.length - 1][0]} ${h} L${pts[0][0]} ${h} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={height} preserveAspectRatio="none">
        <path d={area} fill={color} opacity="0.08" />
        <path d={path} fill="none" stroke={color} strokeWidth="1.5" />
        {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="1.4" fill={color} />)}
      </svg>
      <div className="x-labels">{data.map((d) => <span key={d.day}>{d.day}</span>)}</div>
    </div>
  );
}

export function BarPairs({ data }) {
  const max = Math.max(...data.flatMap((d) => [d.needed, d.present]));
  return (
    <div className="bar-pairs">
      {data.map((d) => (
        <div className="bar-group" key={d.shift}>
          <div className="bars">
            <div className="bar needed" style={{ height: `${(d.needed / max) * 100}%` }}><span>{d.needed}</span></div>
            <div className="bar present" style={{ height: `${(d.present / max) * 100}%` }}><span>{d.present}</span></div>
          </div>
          <div className="bar-label">{d.shift}</div>
        </div>
      ))}
    </div>
  );
}
