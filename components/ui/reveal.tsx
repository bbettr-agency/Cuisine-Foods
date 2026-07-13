"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Reveal — subtle in-view motion. Honours prefers-reduced-motion (renders static).
 * Premium, restrained; guides attention without distracting.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  as = "div",
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "section";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

/** RevealGroup — staggers Reveal children into view. */
export function RevealGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={cn(className)}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}
