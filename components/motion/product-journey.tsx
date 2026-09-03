"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ScrollDrum } from "@/components/motion/scroll-drum";

/**
 * ProductJourney — wraps the hero + product lineup and, when motion is allowed,
 * mounts the single travelling ScrollDrum overlay and hides the two static
 * drums (hero rest + sunflower slot) via the `journey-live` class so only the
 * live drum shows. On the server / before hydration / with reduced-motion it
 * renders nothing extra: the static drums simply sit in the hero and the slot,
 * fully understandable with no animation. No layout shift either way.
 */
export function ProductJourney({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live = mounted && !reduce;

  return (
    <div className={live ? "journey-live" : undefined}>
      {children}
      {live && <ScrollDrum />}
    </div>
  );
}
