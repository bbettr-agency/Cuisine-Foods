"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

/**
 * KineticStrip — the site-wide Cuisine Foods signature motion motif.
 *
 * Two rows of large display words drift horizontally in OPPOSITE directions,
 * driven by the section's LOCAL scroll progress (offset start-end → end-start):
 * scroll down progresses it, scroll up reverses it, stopping stops it. No ticker,
 * no autoplay, no wheel-direction detection, no document-wide scroll state.
 * Full-bleed with overflow-hidden so the drift never widens the document.
 *
 * A mounted-gate keeps SSR / first client render / reduced-motion in a legible
 * static state (rows at x:0, all words readable) and only binds the scroll drift
 * once mounted with motion allowed — so there's no hydration mismatch and the
 * static composition is always accessible.
 *
 * USE: adapt `items` to each page's real, supported content. At most one per page,
 * and on the bespoke product pages keep it SECONDARY to the signature theatre
 * (Bloom / Unfurl / Pour / Living Label). It carries NO product artwork.
 */
export function KineticStrip({
  eyebrow,
  title,
  intro,
  items,
  align = "center",
  tone = "paper",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: string[];
  align?: "left" | "center";
  tone?: "paper" | "surface-2";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live = mounted && !reduce;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["2%", "-16%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-16%", "2%"]);

  return (
    <section
      ref={ref}
      className={cn("section overflow-hidden", tone === "surface-2" && "bg-surface-2", className)}
      aria-label={eyebrow ?? title}
    >
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} align={align} />
      </Container>

      {/* Kinetic rows — full-bleed, scroll-linked, opposite directions */}
      <div className="mt-10 flex flex-col gap-2 lg:mt-12 lg:gap-3" aria-hidden>
        <Row items={items} x={x1} filled live={live} />
        <Row items={items} x={x2} filled={false} live={live} />
      </div>
      {/* Static, accessible parity for AT / no-motion */}
      <p className="sr-only">{title}: {items.join(", ")}.</p>
    </section>
  );
}

function Row({ items, x, filled, live }: { items: string[]; x: MotionValue<string>; filled: boolean; live: boolean }) {
  return (
    <motion.div style={live ? { x } : undefined} className="flex w-max flex-nowrap items-center gap-6 whitespace-nowrap lg:gap-8">
      {[...items, ...items, ...items].map((label, i) => (
        <span key={i} className="flex items-center gap-6 lg:gap-8">
          <span
            className={
              filled
                ? "font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
                : "font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl sf-outline"
            }
          >
            {label}
          </span>
          <span className="text-2xl text-gold-500 lg:text-3xl" aria-hidden>✦</span>
        </span>
      ))}
    </motion.div>
  );
}
