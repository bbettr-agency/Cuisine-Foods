import Image from "next/image";
import { drums } from "@/config/drums";
import { cn } from "@/lib/utils";

/**
 * A bare transparent product render with a soft grounding drop-shadow so it
 * reads as a physical object sitting in the page, not a flat PNG. No card chrome.
 *
 * The `staticFor` marks a rest render that the live journey overlay replaces:
 *   - "hero"        the desktop hero composition (hidden when live on lg+)
 *   - "hero-mobile" the single mobile hero product (hidden when live on mobile)
 *   - "slot"        a lineup landing slot; `slotId` says which product lands there
 * The hiding itself is breakpoint-aware CSS (see globals.css `.journey-live`).
 */
export function DrumImage({
  id,
  priority,
  staticFor,
  slotId,
  className,
  sizes = "(max-width: 1024px) 55vw, 340px",
}: {
  id: string;
  priority?: boolean;
  staticFor?: "hero" | "hero-mobile" | "slot";
  slotId?: string;
  className?: string;
  sizes?: string;
}) {
  const d = drums[id];
  if (!d) return null;
  return (
    <Image
      src={d.src}
      alt={d.alt}
      width={d.width}
      height={d.height}
      priority={priority}
      sizes={sizes}
      draggable={false}
      data-hero-static={staticFor === "hero" ? "" : undefined}
      data-hero-static-mobile={staticFor === "hero-mobile" ? "" : undefined}
      data-slot-static={staticFor === "slot" ? slotId ?? "" : undefined}
      className={cn(
        "h-auto w-full select-none [filter:drop-shadow(0_24px_28px_rgb(16_22_24/0.24))]",
        className,
      )}
    />
  );
}
