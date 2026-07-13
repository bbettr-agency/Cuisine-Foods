/**
 * MOTION PRESETS — premium, restrained (Apple/Stripe/Linear).
 * Subtle fades and rises that guide attention; never flashy. All motion is
 * gated by prefers-reduced-motion at the component level (see Reveal).
 */
import type { Variants } from "framer-motion";

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOutExpo } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: easeOutExpo } },
};

/** Parent that staggers children into view. */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
