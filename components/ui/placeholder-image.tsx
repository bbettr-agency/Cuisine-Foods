import Image from "next/image";
import { getImage } from "@/config/images";
import { cn } from "@/lib/utils";

const ratioClass: Record<string, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
  "3/4": "aspect-[3/4]",
};

/**
 * PlaceholderImage — the config-driven image system (OS P10).
 * If the manifest slot has a real `src`, render an optimised next/image.
 * Otherwise render a clean, branded placeholder container — so when the client
 * uploads photography and we set `src`, the image simply appears (no re-layout).
 */
export function PlaceholderImage({
  id,
  className,
  rounded = true,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  id: string;
  className?: string;
  rounded?: boolean;
  sizes?: string;
}) {
  const slot = getImage(id);
  const shell = cn(
    "relative w-full overflow-hidden bg-surface-2",
    ratioClass[slot.ratio] ?? "aspect-[3/2]",
    rounded && "rounded-[var(--radius)]",
    "border border-line",
    className,
  );

  if (slot.src) {
    return (
      <div className={shell}>
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          priority={slot.priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  // Branded placeholder — premium, on-brand, clearly intentional.
  return (
    <div className={shell} role="img" aria-label={slot.alt}>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-surface-2 to-gold-100/50" />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(var(--brand-700) / 0.08) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-brand-700/50">
          <path
            d="M12 3c-2.5 3-5 5.5-5 9a5 5 0 0 0 10 0c0-3.5-2.5-6-5-9Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-700/45">
          Cuisine Foods
        </span>
      </div>
    </div>
  );
}
