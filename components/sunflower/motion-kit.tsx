"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * A small Cuisine motion vocabulary for the Sunflower page — used sparingly so
 * sections don't all share one generic fade. Everything honours reduced-motion
 * (renders static). GPU-friendly: transform + opacity only.
 */

/**
 * Masked upward reveal — the phrase rises from behind a clip edge.
 * `mode="mount"` plays on load (use above the fold, where whileInView can race);
 * `mode="inview"` (default) plays when scrolled into view.
 */
export function MaskUp({
  children,
  as = "div",
  className,
  delay = 0,
  mode = "inview",
}: {
  children: React.ReactNode;
  as?: "div" | "h2" | "h3" | "span" | "p";
  className?: string;
  delay?: number;
  mode?: "mount" | "inview";
}) {
  const reduce = useReducedMotion();
  const Motion = motion[as];
  // Keep the SAME DOM structure whether or not motion is allowed (SSR renders
  // reduce=false); only the animation props differ, so reduced-motion clients
  // don't hit a structural hydration mismatch — they just render static.
  const anim = reduce
    ? {}
    : mode === "mount"
      ? { initial: { y: "110%" }, animate: { y: "0%" } }
      : { initial: { y: "110%" }, whileInView: { y: "0%" }, viewport: { once: true, amount: 0.25 } as const };
  return (
    <span className={cn("sf-mask", as === "span" ? "inline-block align-bottom" : "block")}>
      <Motion className={className} {...anim} transition={reduce ? undefined : { duration: 0.7, ease: easeOutExpo, delay }}>
        {children}
      </Motion>
    </span>
  );
}

const up: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOutExpo, delay: i * 0.07 } }),
};

/** Staggered upward reveal for a small group of children. */
export function RevealStagger({ children, className }: { children: React.ReactNode[]; className?: string }) {
  const reduce = useReducedMotion();
  // Same structure regardless of motion (avoids reduced-motion hydration
  // mismatch); reduced clients simply render the children statically.
  return (
    <div className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={reduce ? undefined : up}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

/** A thin gold rule that draws itself horizontally on view. */
export function DrawLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={cn("block h-px w-full origin-left bg-gradient-to-r from-gold-500 to-gold-500/0", className)}
      initial={reduce ? undefined : { scaleX: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: easeOutExpo }}
    />
  );
}
