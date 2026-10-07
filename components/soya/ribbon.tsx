/**
 * SoyaRibbon — a static gold "liquid ribbon" drawn as SVG linework in the Cuisine
 * gold language: a single falling pour that widens into a soft pool, with a couple
 * of trailing droplets. It is the hero-scale, standalone counterpart to the
 * scroll-driven SoyaLiquid theatre (which needs a progress MotionValue) — the
 * first, calm hint of the page's liquid identity. Purely presentational.
 */
export function SoyaRibbon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 560" className={className} fill="none" aria-hidden role="presentation">
      <defs>
        <linearGradient id="soya-ribbon-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--gold-400))" stopOpacity="0.22" />
          <stop offset="55%" stopColor="rgb(var(--gold-500))" stopOpacity="0.14" />
          <stop offset="100%" stopColor="rgb(var(--gold-600))" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* the pour — a closed ribbon narrowing at the top, pooling at the base */}
      <path
        d="M 232 24
           C 240 120 214 196 206 286
           C 200 356 214 430 262 500
           C 300 452 322 388 320 320
           C 318 236 286 150 268 24 Z"
        fill="url(#soya-ribbon-fill)"
        stroke="rgb(var(--gold-500))"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* inner flow line — gives the ribbon a sense of movement */}
      <path
        d="M 250 40 C 244 150 230 240 234 330 C 237 404 256 456 272 492"
        stroke="rgb(var(--gold-600))"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* soft pool highlight */}
      <ellipse cx="262" cy="500" rx="78" ry="20" stroke="rgb(var(--gold-500))" strokeWidth="1.1" opacity="0.4" />

      {/* trailing droplets */}
      <path d="M 348 168 C 356 182 356 196 348 206 C 340 196 340 182 348 168 Z" fill="rgb(var(--gold-500))" opacity="0.5" />
      <path d="M 150 250 C 157 262 157 274 150 283 C 143 274 143 262 150 250 Z" fill="rgb(var(--gold-600))" opacity="0.38" />
      <circle cx="372" cy="250" r="3.4" fill="rgb(var(--gold-600))" opacity="0.4" />
    </svg>
  );
}
