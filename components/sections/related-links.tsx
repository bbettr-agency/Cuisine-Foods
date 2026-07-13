import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

export type RelatedItem = { label: string; href: string; blurb?: string };

/** Sibling/related internal links — semantic interlinking within a cluster. */
export function RelatedLinks({ title, items }: { title: string; items: RelatedItem[] }) {
  if (items.length === 0) return null;
  return (
    <Section>
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
