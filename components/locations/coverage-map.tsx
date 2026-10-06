import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SA_PATH, SA_VIEW, HUB_MAP_POS } from "@/config/sa-geo";
import { allHubs, type Hub } from "@/config/coverage";

/**
 * CoverageMap — the /locations national map. It reuses the shared SA geometry
 * (config/sa-geo) and the homepage's gold-linework language, but is a calmer,
 * MORE INFORMATIVE still composition (no scroll theatre): the country in gold,
 * every hub placed geographically with its real status. Open hubs link to their
 * province page; the coming-soon hub is shown honestly and not linked. Static +
 * Reveal only, so it is complete under reduced motion.
 */

const SIDE: Record<Hub["id"], "right" | "left"> = { gauteng: "right", "kwazulu-natal": "left", "western-cape": "right" };

function statusLabel(h: Hub): string {
  if (h.status === "open") return h.address?.city ?? "Operating";
  if (h.status === "coming-soon") return "Opening soon";
  return "Planned";
}

export function CoverageMap() {
  const hubs = allHubs();
  return (
    <section className="relative overflow-hidden bg-ink text-paper" aria-label="Cuisine Foods coverage map">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold-500/40" />
      <Container className="relative py-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow !text-gold-400">The network</p>
          <h2 className="mt-3 text-h2 font-bold text-paper">Regional hubs, one national service</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-100">
            We run from regional hubs and supply and collect well beyond their home cities. Here is where the network
            stands today – and where it is growing next.
          </p>
        </div>

        <Reveal className="relative mx-auto mt-12 w-full max-w-[640px]">
          <div className="relative" style={{ aspectRatio: "1000 / 878.2" }}>
            <svg viewBox={SA_VIEW} fill="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              <defs>
                <radialGradient id="cov-coverage" gradientUnits="userSpaceOnUse" cx="620" cy="300" r="620">
                  <stop offset="0" stopColor="rgb(var(--gold-400))" stopOpacity="0.9" />
                  <stop offset="0.55" stopColor="rgb(var(--gold-600))" stopOpacity="0.35" />
                  <stop offset="1" stopColor="rgb(var(--gold-700))" stopOpacity="0" />
                </radialGradient>
                <clipPath id="cov-clip"><path d={SA_PATH} clipRule="evenodd" /></clipPath>
              </defs>
              <path d={SA_PATH} fillRule="evenodd" fill="rgb(var(--gold-500))" opacity={0.12} />
              <g clipPath="url(#cov-clip)">
                <circle cx="620" cy="300" r="560" fill="url(#cov-coverage)" opacity={0.5} />
              </g>
              <path
                d={SA_PATH}
                fillRule="evenodd"
                stroke="rgb(var(--gold-400))"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {hubs.map((h) => {
              const pos = HUB_MAP_POS[h.id];
              const open = h.status === "open";
              const side = SIDE[h.id];
              return (
                <div key={h.id} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {open ? (
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-gold-500" />
                        <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-gold-400/30" />
                      </span>
                    ) : (
                      <span className="block h-3.5 w-3.5 rounded-full border border-dashed border-gold-300/80" />
                    )}
                  </span>
                  <span
                    className={`absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap lg:block ${
                      side === "right" ? "left-5 text-left" : "right-5 text-right"
                    }`}
                  >
                    <span className="block font-display text-sm font-bold text-paper">{h.name}</span>
                    <span className={`block text-xs ${open ? "text-brand-100/80" : "text-gold-300/90"}`}>{statusLabel(h)}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Status legend — always present, so the map's meaning never depends on labels */}
        <ul className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">
          {hubs.map((h) => {
            const open = h.status === "open";
            const row = (
              <span className="flex items-center gap-2.5">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${open ? "bg-gold-500" : "border border-dashed border-gold-400/70"}`} aria-hidden />
                <span className="font-display text-sm font-bold text-paper">{h.name}</span>
                <span className={`text-sm ${open ? "text-brand-100/80" : "text-gold-300/90"}`}>· {statusLabel(h)}</span>
              </span>
            );
            return (
              <li key={h.id}>
                {open ? (
                  <Link href={`/${h.provinceSlug}`} className="transition-opacity hover:opacity-80">{row}</Link>
                ) : (
                  row
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
