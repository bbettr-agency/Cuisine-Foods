import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { provinces } from "@/config/locations";
import { site } from "@/config/site";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

/** Coverage — the two province pillars + branches. Local proof + internal links. */
export function Coverage() {
  return (
    <Section alt>
      <SectionHeading
        eyebrow="Where we operate"
        title="Local to Gauteng &amp; the Western Cape"
        intro="Two branches, two provinces, one closed-loop service — supply and collection, close to your kitchen."
        align="center"
      />
      <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-2">
        {provinces.map((p) => {
          const branch = site.branches.find((b) => b.id === p.branchId)!;
          return (
            <Reveal as="div" key={p.slug}>
              <Link
                href={`/${p.slug}`}
                className="group flex h-full flex-col justify-between gap-6 rounded-[var(--radius)] border border-line bg-surface p-7 transition-all duration-200 hover:border-brand-300 hover:shadow-soft sm:p-8"
              >
                <div>
                  <div className="flex items-center gap-2 text-brand-700">
                    <MapPin className="h-5 w-5" />
                    <h3 className="font-display text-xl font-bold text-ink">{p.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.intro}</p>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <p className="text-xs text-ink-faint">
                    Branch: {branch.city}, {branch.postalCode}
                  </p>
                  <span className="inline-flex items-center gap-1 font-semibold text-brand-700 group-hover:gap-2">
                    Explore {p.name} <ArrowRight className="h-4 w-4 transition-all" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
