import Image from "next/image";
import { drums } from "@/config/drums";
import { cn } from "@/lib/utils";

/**
 * A bare transparent drum render with a soft grounding drop-shadow so it reads
 * as a physical object sitting in the page, not a flat PNG. No card chrome.
 */
export function DrumImage({
  id,
  priority,
  isStatic,
  className,
  sizes = "(max-width: 768px) 60vw, 360px",
}: {
  id: string;
  priority?: boolean;
  isStatic?: boolean; // marked so the journey can hide it once the live drum is active
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
      data-drum-static={isStatic ? "" : undefined}
      className={cn(
        "h-auto w-full select-none [filter:drop-shadow(0_26px_30px_rgb(16_22_24/0.26))]",
        className,
      )}
    />
  );
}
