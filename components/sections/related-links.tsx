import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export type RelatedItem = { label: string; href: string; blurb?: string };

/**
 * Sibling/related internal links – semantic interlinking within a cluster.
 *
 * `variant="grid"` (default) keeps the original card grid used across the site.
 * `variant="rail"` is a compact, restrained editorial list for pages that only
 * need discovery, not a visually dominant card section (the product pages).
 */
export function RelatedLinks({
  title,
  items,
  variant = "grid",
  className,
}: {
  title: string;
  items: RelatedItem[];
  variant?: "grid" | "rail";
  className?: string;
}) {
  if (items.length === 0) return null;

  if (variant === "rail") {
    return (
      <Section className={cn("py-14 lg:py-20", className)}>
        <SectionHeading eyebrow="Explore more" title={title} />
        <RevealGroup className="mt-7 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
          {items.map((item) => (
            <Reveal as="div" key={item.href}>
              <Link
                href={item.href}
                className="group flex items-center justify-between gap-4 border-b border-line py-4 transition-colors hover:border-gold-500/50"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-ink group-hover:text-gold-700">{item.label}</span>
                  {item.blurb && <span className="mt-0.5 block truncate text-sm text-ink-soft">{item.blurb}</span>}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-gold-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>
    );
  }

  return (
    <Section className={className}>
      <SectionHeading eyebrow="Explore more" title={title} />
      <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Reveal as="div" key={item.href}>
            <Link
              href={item.href}
              className="group flex h-full items-start justify-between gap-3 rounded-[var(--radius)] border border-line bg-surface p-5 transition-all duration-200 hover:border-brand-300 hover:shadow-soft"
            >
              <div>
                <p className="font-semibold text-ink">{item.label}</p>
                {item.blurb && <p className="mt-1 text-sm text-ink-soft">{item.blurb}</p>}
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-brand-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
