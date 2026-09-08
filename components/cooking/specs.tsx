"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { MaskUp } from "@/components/sunflower/motion-kit";
import { cn } from "@/lib/utils";

type Spec = { label: string; value: string };

/** A tiny engraved leaf node that sits where a branch meets the main stem. */
function LeafNode({ on }: { on?: boolean }) {
  return (
    <svg viewBox="-14 -20 28 28" className={cn("h-4 w-4 transition-transform duration-300 ease-out-expo", on && "scale-125")} aria-hidden>
      <path d="M0 6 C 9 -4, 6 -16, 0 -20 C -6 -16, -9 -4, 0 6 Z" fill="none" stroke="rgb(var(--gold-600))" strokeWidth={1.4} strokeLinejoin="round" />
      <path d="M0 6 L0 -18" stroke="rgb(var(--gold-600))" strokeWidth={1} strokeLinecap="round" />
    </svg>
  );
}

/**
 * CookingSpecs — the escaped botanical becomes information architecture. A
 * central gold stem runs through the datasheet; a branch reaches out to each
 * specification with a small leaf node. Hover/focus draws the branch the final
 * few pixels and brings its fact forward. Editorial, not a corporate timeline.
 * Desktop = horizontal stem, items alternating above/below; mobile = a vertical
 * stem with items down one side. All facts are real page content.
 */
export function CookingSpecs({ specs, title }: { specs: Spec[]; title: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section className="section bg-surface-2">
      <Container>
        <p className="eyebrow mb-3">At a glance</p>
        <h2 className="text-h2 text-ink"><MaskUp as="span">{title}</MaskUp></h2>

        {/* Desktop: central stem with alternating branches */}
        <div className="mt-16 hidden lg:block">
          <div className="relative">
            {/* the main gold stem draws across on view */}
            <motion.div
              aria-hidden
              className="absolute left-0 right-0 top-1/2 h-[2px] origin-left -translate-y-1/2 rounded-full bg-gradient-to-r from-gold-500/10 via-gold-500/70 to-gold-500/10"
              initial={reduce ? undefined : { scaleX: 0 }}
              whileInView={reduce ? undefined : { scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: easeOutExpo }}
            />
            <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${specs.length}, minmax(0,1fr))` }}>
              {specs.map((s, i) => {
                const on = active === i;
                const up = i % 2 === 0;
                return (
                  <li key={s.label} className="flex flex-col items-center px-3">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-current={on}
                      className={cn("group flex flex-col items-center gap-0 text-center", up ? "flex-col" : "flex-col-reverse")}
                    >
                      {/* the fact card */}
                      <span className={cn("block max-w-[15ch] transition-all duration-300 ease-out-expo", up ? "pb-3" : "pt-3", on ? "opacity-100" : "opacity-70")}>
                        <span className={cn("block text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors", on ? "text-gold-700" : "text-ink-faint")}>{s.label}</span>
                        <span className={cn("mt-1 block text-[15px] leading-snug transition-colors", on ? "text-ink" : "text-ink-soft")}>{s.value}</span>
                      </span>
                      {/* the branch: a short vertical line that draws the last pixels on hover */}
                      <span aria-hidden className={cn("block w-[2px] origin-bottom rounded-full bg-gradient-to-b from-gold-500/0 to-gold-500 transition-all duration-300 ease-out-expo", up ? "origin-bottom" : "origin-top rotate-180", on ? "h-6 opacity-100" : "h-4 opacity-50")} />
                      {/* the leaf node on the stem */}
                      <span className="relative z-[1] -my-1 flex h-6 w-6 items-center justify-center rounded-full bg-surface-2"><LeafNode on={on} /></span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Mobile: vertical stem with items down one side */}
        <ol className="relative mt-10 lg:hidden">
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-[2px] rounded-full bg-gradient-to-b from-gold-500/20 via-gold-500/60 to-gold-500/10" />
          {specs.map((s) => (
            <li key={s.label} className="relative py-4 pl-8">
              <span aria-hidden className="absolute -left-[1px] top-5 flex h-4 w-4 items-center justify-center"><LeafNode /></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-700">{s.label}</span>
              <p className="mt-1 text-lg text-ink">{s.value}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
