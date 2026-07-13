import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

/** The closed-loop cross-sell block (OS P2/P12) — binds the two pillars + sells. */
export function CrossSell({ label, href, blurb }: { label: string; href: string; blurb: string }) {
  return (
    <Reveal>
      <Link
        href={href}
        className="group flex flex-col gap-3 rounded-[var(--radius)] border border-brand-700/20 bg-brand-50/60 p-6 transition-all duration-200 hover:border-brand-700/40 hover:bg-brand-50 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="eyebrow mb-1.5">The closed loop</p>
          <p className="font-display text-lg font-semibold text-ink">{label}</p>
          <p className="mt-1 max-w-2xl text-sm text-ink-soft">{blurb}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-700">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}
