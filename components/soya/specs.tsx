"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { MaskUp } from "@/components/sunflower/motion-kit";
import { cn } from "@/lib/utils";

type Spec = { label: string; value: string };

/**
 * SoyaSpecs — the datasheet as a "liquid data line": a thin gold line runs
 * through the specifications with a droplet node at each. Hovering/focusing an
 * item swells its droplet, brightens the line under it and lifts the value.
 * Desktop = horizontal flow; mobile = vertical stack with a left gold accent.
 */
export function SoyaSpecs({ specs, title }: { specs: Spec[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <section className="section bg-surface-2">
      <Container>
        <p className="eyebrow mb-3">Specifications</p>
        <h2 className="text-h2 text-ink"><MaskUp as="span">{title}</MaskUp></h2>

        {/* Desktop: horizontal liquid data line */}
        <div className="mt-14 hidden lg:block">
          <div className="relative">
            <div aria-hidden className="absolute left-0 right-0 top-[9px] h-px bg-gradient-to-r from-gold-500/0 via-gold-500/60 to-gold-500/0" />
            <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${specs.length}, minmax(0,1fr))` }}>
              {specs.map((s, i) => {
                const on = active === i;
                return (
                  <li key={s.label} className="px-3">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-current={on}
                      className="group flex w-full flex-col items-start text-left"
                    >
                      <span aria-hidden className={cn("rounded-full bg-gold-500 transition-all duration-300 ease-out-expo", on ? "h-[18px] w-[18px] -translate-x-[3px] shadow-[0_0_0_4px_rgb(var(--gold-500)/0.14)]" : "mt-[3px] h-3 w-3")} />
                      <span className={cn("mt-5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300", on ? "text-gold-700" : "text-ink-faint")}>{s.label}</span>
                      <span className={cn("mt-1.5 text-lg leading-snug transition-colors duration-300", on ? "text-ink" : "text-ink-soft")}>{s.value}</span>
                      <span aria-hidden className={cn("mt-3 h-[2px] origin-left rounded-full bg-gold-500 transition-all duration-300 ease-out-expo", on ? "w-12 opacity-100" : "w-5 opacity-30")} />
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Mobile: vertical stack with a left gold accent */}
        <ol className="mt-10 lg:hidden">
          {specs.map((s) => (
            <li key={s.label} className="relative border-l-2 border-gold-500/30 py-4 pl-5">
              <span aria-hidden className="absolute -left-[7px] top-6 h-3 w-3 rounded-full bg-gold-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-gold-700">{s.label}</span>
              <p className="mt-1 text-lg text-ink">{s.value}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
