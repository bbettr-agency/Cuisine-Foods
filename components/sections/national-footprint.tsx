"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { allHubs, type Hub } from "@/config/coverage";

/**
 * NationalFootprint — the V2 homepage's SECONDARY signature experience (the
 * three-drum journey remains #1). An ink, editorial "one network across South
 * Africa" moment: the three regional hubs establish in sequence as the section
 * scrolls through, gold lines draw the network between them, and it resolves to
 * "Nationwide". Gold is the connective language. NOT a map/pins/SaaS graphic.
 *
 * Engineering: a single in-view section (no heavy pinned theatre) driven by LOCAL
 * scroll progress; inline SVG for the connective lines (non-scaling stroke);
 * hub labels are crisp HTML. A mounted-gate renders the full static composition
 * on SSR / reduced-motion (all hubs + lines shown), so content never depends on
 * motion and there is no hydration mismatch. Hub facts + status come from the
 * canonical coverage config — open hubs link to their province page, a
 * coming-soon hub is shown honestly ("Opening soon") and not linked.
 */

// Geographic-feel positions (percent of the composition box) — layout only.
const POS: Record<Hub["id"], { top: number; left: number }> = {
  gauteng: { top: 26, left: 58 },
  "kwazulu-natal": { top: 52, left: 79 },
  "western-cape": { top: 75, left: 23 },
};

export function NationalFootprint() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live = mounted && !reduce;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Per-hub activation windows (Gauteng → Western Cape → KwaZulu-Natal).
  const o0 = useTransform(scrollYProgress, [0.08, 0.22], [0.15, 1]);
  const o1 = useTransform(scrollYProgress, [0.18, 0.32], [0.15, 1]);
  const o2 = useTransform(scrollYProgress, [0.28, 0.42], [0.15, 1]);
  const y0 = useTransform(scrollYProgress, [0.08, 0.22], [16, 0]);
  const y1 = useTransform(scrollYProgress, [0.18, 0.32], [16, 0]);
  const y2 = useTransform(scrollYProgress, [0.28, 0.42], [16, 0]);
  const hubAnim = [{ o: o0, y: y0 }, { o: o1, y: y1 }, { o: o2, y: y2 }];

  const lineDraw = useTransform(scrollYProgress, [0.32, 0.6], [0, 1]);
  const fieldOpacity = useTransform(scrollYProgress, [0.5, 0.85], [0, 0.45]);
  const fieldScale = useTransform(scrollYProgress, [0.5, 0.85], [0.6, 1]);
  const resolveO = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const resolveY = useTransform(scrollYProgress, [0.55, 0.75], [18, 0]);

  const hubs = allHubs();
  const nodes = hubs.map((h) => ({ hub: h, pos: POS[h.id] }));
  // Triangle: connect each node to the next (and close the loop).
  const lines = nodes.map((n, i) => {
    const a = n.pos;
    const b = nodes[(i + 1) % nodes.length].pos;
    return { d: `M ${a.left} ${a.top} L ${b.left} ${b.top}` };
  });

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink text-paper" aria-label="Cuisine Foods national network">
      {/* subtle gold field that expands into "national coverage" */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vw] w-[80vw] max-h-[680px] max-w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgb(var(--gold-500) / 0.18) 0%, transparent 62%)",
          ...(live ? { opacity: fieldOpacity, scale: fieldScale } : { opacity: 0.4 }),
        }}
      />

      <Container className="relative py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">Our national network</p>
          <h2 className="mt-3 text-h2 font-bold text-paper">One supply network. Across South Africa.</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-100">
            Regional hubs keep commercial kitchens supplied and collected from – reliably, close to the ground, coast to coast.
          </p>
        </div>

        {/* ---- Desktop composition: geographic-feel node network ---- */}
        <div className="relative mx-auto mt-10 hidden h-[460px] w-full max-w-[720px] lg:block">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden>
            {lines.map((l, i) => (
              <motion.path
                key={i}
                d={l.d}
                stroke="rgb(var(--gold-500))"
                strokeWidth={1.25}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={live ? { pathLength: lineDraw, opacity: 0.6 } : { opacity: 0.6 }}
              />
            ))}
          </svg>
          {nodes.map((n, i) => {
            const isOpen = n.hub.status === "open";
            const inner = (
              <>
                <span className="relative mx-auto flex h-3.5 w-3.5 items-center justify-center">
                  <span className={`absolute inline-flex h-full w-full rounded-full ${isOpen ? "bg-gold-500" : "border border-gold-500/60"}`} />
                  <span className="absolute inline-flex h-7 w-7 rounded-full ring-1 ring-gold-500/30" />
                </span>
                <span className="mt-3 block font-display text-xl font-bold tracking-tight text-paper">{n.hub.name}</span>
                <span className="mt-0.5 block text-xs text-brand-100/80">
                  {isOpen ? n.hub.address?.city ?? "Regional hub" : "Opening soon"}
                </span>
              </>
            );
            return (
              <motion.div
                key={n.hub.id}
                className="absolute w-[150px] -translate-x-1/2 -translate-y-1/2 text-center"
                style={{ top: `${n.pos.top}%`, left: `${n.pos.left}%`, ...(live ? { opacity: hubAnim[i].o, y: hubAnim[i].y } : undefined) }}
              >
                {isOpen ? (
                  <Link href={`/${n.hub.provinceSlug}`} className="group inline-block">
                    {inner}
                  </Link>
                ) : (
                  <div>{inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ---- Mobile composition: a vertical gold network list ---- */}
        <ol className="relative mt-10 space-y-6 border-l border-gold-500/30 pl-6 lg:hidden">
          {nodes.map((n, i) => {
            const isOpen = n.hub.status === "open";
            const row = (
              <>
                <span className={`absolute -left-[31px] top-1 h-3 w-3 rounded-full ${isOpen ? "bg-gold-500" : "border border-gold-500/60 bg-ink"}`} aria-hidden />
                <span className="block font-display text-xl font-bold text-paper">{n.hub.name}</span>
                <span className="mt-0.5 block text-sm text-brand-100/80">{isOpen ? n.hub.address?.city ?? "Regional hub" : "Opening soon"}</span>
              </>
            );
            return (
              <motion.li key={n.hub.id} className="relative" style={live ? { opacity: hubAnim[i].o } : undefined}>
                {isOpen ? <Link href={`/${n.hub.provinceSlug}`} className="block">{row}</Link> : <div>{row}</div>}
              </motion.li>
            );
          })}
        </ol>

        {/* ---- Resolve ---- */}
        <motion.div className="mt-12 lg:mt-14" style={live ? { opacity: resolveO, y: resolveY } : undefined}>
          <p className="font-display text-4xl font-bold tracking-tight text-gold-400 sm:text-5xl">Nationwide.</p>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-brand-100">
            One commercial oil partner – supply and collection – across South Africa.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
