"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { home } from "@/config/home";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { DrumImage } from "@/components/motion/drum-image";
import { cn } from "@/lib/utils";

/**
 * Section 2 — the three-product lineup. Each card holds a landing slot
 * (#slot-<id>) for the matching hero product that travels in; the static render
 * is hidden while the journey is live (the overlay lands there instead — on
 * desktop all three, on mobile only sunflower, matching the hero journey).
 * Hover (desktop) / tap (mobile) lifts a product forward, deepens its shadow
 * and reveals its supporting copy while the others recede.
 */
export function ProductsLineup() {
  const { productLineup } = home;
  const [active, setActive] = useState<string | null>(null);

  return (
    <Section id="products">
      <SectionHeading
        eyebrow={productLineup.eyebrow}
        title={productLineup.title}
        intro={productLineup.body}
        align="center"
      />
      <div
        className="mt-14 grid gap-5 sm:grid-cols-3 sm:gap-6 [perspective:1400px]"
        onMouseLeave={() => setActive(null)}
      >
        {productLineup.products.map((p) => {
          const isActive = active === p.slug;
          const dimmed = active !== null && !isActive;
          return (
            <button
              type="button"
              key={p.slug}
              onMouseEnter={() => setActive(p.slug)}
              onFocus={() => setActive(p.slug)}
              onClick={() => setActive((a) => (a === p.slug ? null : p.slug))}
              aria-expanded={isActive}
              className={cn(
                "group relative flex flex-col items-center rounded-[var(--radius)] border bg-surface px-6 pb-7 pt-9 text-center transition-all duration-500 ease-out-expo",
                isActive ? "-translate-y-2 border-brand-300 shadow-lift" : "border-line shadow-soft",
                dimmed && "opacity-55",
              )}
            >
              {/* Drum stage */}
              <div
                className={cn(
                  "flex h-52 w-full items-end justify-center transition-transform duration-500 ease-out-expo sm:h-56",
                  isActive && "-translate-y-1 scale-[1.06]",
                )}
              >
                <span id={`slot-${p.slug}`} className="inline-flex h-full items-end justify-center">
                  <DrumImage id={p.imageId} staticFor="slot" slotId={p.slug} className="max-h-full w-auto" sizes="(max-width:640px) 40vw, 200px" />
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl font-bold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm font-medium text-gold-700">{p.tagline}</p>

              {/* Supporting copy — revealed on hover/tap without shifting layout */}
              <div
                className={cn(
                  "grid transition-all duration-500 ease-out-expo",
                  isActive ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="mx-auto max-w-[26ch] text-sm leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              </div>

              <Link
                href={p.href}
                onClick={(e) => e.stopPropagation()}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition-all hover:gap-2"
              >
                View {p.name} <ArrowRight className="h-4 w-4" />
              </Link>
            </button>
          );
        })}
      </div>
    </Section>
  );
}
