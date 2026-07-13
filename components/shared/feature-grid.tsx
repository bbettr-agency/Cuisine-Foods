import type { FeaturePoint } from "@/config/types";
import { Icon } from "@/components/ui/icon";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/** Feature/benefit grid — the reusable proof block used across every template. */
export function FeatureGrid({ points, columns = 3 }: { points: FeaturePoint[]; columns?: 2 | 3 }) {
  return (
    <RevealGroup
      className={cn(
        "grid gap-5 sm:gap-6",
        columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
      )}
    >
      {points.map((p) => (
        <Reveal as="div" key={p.title} className="card h-full p-6 transition-shadow duration-200 hover:shadow-soft">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Icon name={p.icon} className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-display text-lg font-semibold text-ink">{p.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
        </Reveal>
      ))}
    </RevealGroup>
  );
}
