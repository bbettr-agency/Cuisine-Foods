/**
 * PalmBotanical — a bespoke, architectural gold palm canopy drawn as SVG
 * linework in the Cuisine Foods gold language (no clipart / tropical stock /
 * bright green / emoji). It reads as structured and strong rather than delicate:
 * a crown of fronds whose central spines draw and whose leaflets progressively
 * UNFURL outward from a single inherited `--unfurl` variable (0 → 1). Each frond
 * carries a `--u0` start offset so they open in sequence; a tiny pointer
 * parallax rides `--px` / `--py`. Purely presentational — one variable animates
 * the whole canopy with zero per-frame React work.
 */

function blade(L: number) {
  // A gently curved, tapered leaflet (a soft droop toward the tip) so the canopy
  // reads as elegant palm fronds rather than a spiky wireframe.
  const hw = Math.max(2.5, L * 0.06);
  const droop = L * 0.13;
  return `M 0 0 C ${L * 0.3} ${-hw} ${L * 0.64} ${-hw * 0.35} ${L} ${droop} C ${L * 0.62} ${droop + hw * 0.55} ${L * 0.3} ${hw} 0 0 Z`;
}

type Leaflet = { y: number; L: number; angR: number; angL: number; s: number };

function leaflets(len: number, count: number): Leaflet[] {
  return Array.from({ length: count }, (_, i) => {
    const t = 0.1 + (i / (count - 1)) * 0.86; // position along the spine
    const y = -t * len;
    const L = len * 0.34 * (0.5 + 0.55 * Math.sin(t * Math.PI)); // taper: fuller mid-frond
    const beta = 33 + 34 * (1 - t); // angle from the spine — wider at the base
    return {
      y: +y.toFixed(2),
      L: +L.toFixed(2),
      angR: +(-90 + beta).toFixed(2),
      angL: +(-90 - beta).toFixed(2),
      s: +Math.min(0.02 + t * 0.5, 0.58).toFixed(3), // unfurl base → tip
    };
  });
}

function Frond({ len, count, u0, w }: { len: number; count: number; u0: number; w: number }) {
  const lf = leaflets(len, count);
  return (
    <g className="palm-frond" style={{ ["--u0" as string]: u0 }}>
      <path
        className="palm-spine"
        d={`M 0 0 Q ${len * 0.05} ${-len * 0.5} 0 ${-len}`}
        stroke="rgb(var(--gold-600))"
        strokeWidth={w + 0.3}
        strokeLinecap="round"
        pathLength={1}
      />
      {lf.map((l, i) => (
        <g key={i}>
          <g transform={`translate(0 ${l.y}) rotate(${l.angR})`}>
            <path className="palm-leaflet" style={{ ["--s" as string]: l.s }} d={blade(l.L)} stroke="rgb(var(--gold-500))" strokeWidth={w} />
          </g>
          <g transform={`translate(0 ${l.y}) rotate(${l.angL})`}>
            <path className="palm-leaflet" style={{ ["--s" as string]: l.s }} d={blade(l.L)} stroke="rgb(var(--gold-500))" strokeWidth={w} />
          </g>
        </g>
      ))}
    </g>
  );
}

// A crown of fronds fanning up-and-out; centre opens first, outer fronds follow.
const FRONDS = [
  { angle: 0, len: 372, count: 13, u0: 0.0, depth: 2, w: 1.2 },
  { angle: -34, len: 342, count: 12, u0: 0.16, depth: 3, w: 1.15 },
  { angle: 34, len: 342, count: 12, u0: 0.22, depth: 1, w: 1.15 },
  { angle: -66, len: 300, count: 11, u0: 0.36, depth: 3, w: 1.05 },
  { angle: 66, len: 300, count: 11, u0: 0.44, depth: 1, w: 1.05 },
  { angle: -94, len: 244, count: 9, u0: 0.58, depth: 4, w: 0.95 },
  { angle: 94, len: 244, count: 9, u0: 0.64, depth: 0, w: 0.95 },
];

export function PalmBotanical({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 480" className={className} fill="none" aria-hidden role="presentation">
      <g transform="translate(280 432)">
        {FRONDS.map((f, i) => (
          <g key={i} className="palm-layer" style={{ ["--d" as string]: f.depth }}>
            <g transform={`rotate(${f.angle})`}>
              <Frond len={f.len} count={f.count} u0={f.u0} w={f.w} />
            </g>
          </g>
        ))}
        {/* crown knot */}
        <circle className="palm-crown" cx={0} cy={0} r={5} fill="rgb(var(--gold-700))" opacity={0.5} />
      </g>
    </svg>
  );
}
