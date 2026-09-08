/**
 * SunflowerBotanical — a bespoke, fine gold botanical sunflower drawn as SVG
 * linework in the Cuisine Foods gold language (no clipart / emoji / bright
 * yellow). It is purely presentational: every part reveals from a single
 * inherited `--bloom` CSS variable (0 → 1) and a tiny pointer parallax from
 * `--px` / `--py`, so a parent can animate the whole illustration by writing
 * three CSS vars (one motion value each) with zero per-frame React work.
 *
 * Layers (back → front): stem + leaves, outer petals, inner petals, seed head.
 * Each petal carries a `--s` bloom threshold so the flower opens outward.
 */

function petals(count: number, len: number, width: number, ring: number) {
  return Array.from({ length: count }, (_, i) => {
    const a = (360 / count) * i + (ring === 1 ? 360 / count / 2 : 0);
    // staggered opening — petals open progressively as the flower blooms
    const s = 0.18 + (ring === 1 ? 0.12 : 0) + (i % count) / count * 0.22;
    // rooted at the flower centre (0,0) so it scales/rotates from the origin
    const d = `M 0 0 C ${width} -${len * 0.4} ${width} -${len * 0.82} 0 -${len} C -${width} -${len * 0.82} -${width} -${len * 0.4} 0 0 Z`;
    return { a, s: Math.min(s, 0.62), d, key: `${ring}-${i}` };
  });
}

export function SunflowerBotanical({ className }: { className?: string }) {
  const outer = petals(22, 168, 26, 0);
  const inner = petals(22, 118, 20, 1);
  // seed head — concentric guide rings + a phyllotaxis dot field
  const rings = [30, 24, 18, 12];
  const seeds = Array.from({ length: 130 }, (_, i) => {
    const t = i / 130;
    const r = 6 + t * 22;
    const ang = i * 2.399963; // golden angle
    // Round to fixed precision so SSR and client render identical attributes.
    return { x: +(Math.cos(ang) * r).toFixed(2), y: +(Math.sin(ang) * r).toFixed(2), s: +(0.02 + t * 0.12).toFixed(4), k: i };
  });

  return (
    <svg
      viewBox="0 0 400 440"
      className={className}
      fill="none"
      aria-hidden
      role="presentation"
    >
      {/* STEM + LEAVES (deepest layer, slowest parallax) */}
      <g className="sf-layer" style={{ ["--d" as string]: 1 }}>
        <path
          className="sf-stem"
          d="M 200 214 C 202 280 199 340 200 424"
          stroke="rgb(var(--gold-600))"
          strokeWidth={1.4}
          strokeLinecap="round"
          pathLength={1}
        />
        <path
          className="sf-leaf"
          style={{ ["--s" as string]: 0.34 }}
          d="M 200 300 C 150 296 120 320 104 360 C 156 360 190 344 200 300 Z"
          stroke="rgb(var(--gold-600))"
          strokeWidth={1.3}
        />
        <path
          className="sf-leaf sf-leaf--r"
          style={{ ["--s" as string]: 0.42 }}
          d="M 200 336 C 250 332 280 356 296 396 C 244 396 210 380 200 336 Z"
          stroke="rgb(var(--gold-600))"
          strokeWidth={1.3}
        />
      </g>

      {/* PETALS — outer then inner ring */}
      <g className="sf-layer sf-head" style={{ ["--d" as string]: 2, transform: "translate(200px, 150px)" }}>
        <g className="sf-petals">
          {outer.map((p) => (
            <path
              key={p.key}
              className="sf-petal"
              style={{ rotate: `${p.a}deg`, ["--s" as string]: p.s }}
              d={p.d}
              stroke="rgb(var(--gold-500))"
              strokeWidth={1.25}
              strokeLinejoin="round"
            />
          ))}
        </g>
        <g className="sf-petals sf-petals--inner">
          {inner.map((p) => (
            <path
              key={p.key}
              className="sf-petal"
              style={{ rotate: `${p.a}deg`, ["--s" as string]: p.s }}
              d={p.d}
              stroke="rgb(var(--gold-600))"
              strokeWidth={1.1}
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* SEED HEAD (front layer, most parallax) */}
        <g className="sf-seedhead" style={{ ["--d" as string]: 3 }}>
          {rings.map((r, i) => (
            <circle
              key={`ring-${r}`}
              className="sf-ring"
              style={{ ["--s" as string]: 0.02 + i * 0.015 }}
              r={r}
              stroke="rgb(var(--gold-600))"
              strokeWidth={1}
            />
          ))}
          {seeds.map((sd) => (
            <circle
              key={`seed-${sd.k}`}
              className="sf-seed"
              style={{ ["--s" as string]: sd.s }}
              cx={sd.x}
              cy={sd.y}
              r={0.9}
              fill="rgb(var(--gold-700))"
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
