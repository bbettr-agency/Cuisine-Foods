import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles, clusters, articlesInCluster } from "@/config/resources";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBand } from "@/components/funnel/cta-band";

export const metadata: Metadata = buildMetadata({
  title: "Resources for Professional Kitchens | Cuisine Foods",
  description: "Practical guides on cooking oil, frying and used cooking oil — collection, pricing, compliance and recycling for South African kitchens.",
  path: "/resources",
});

export default function ResourcesPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Resources"
        h1="Guides for professional kitchens"
        subhead="Practical, South-Africa-specific guidance on cooking oil, commercial frying, and everything to do with used cooking oil — pricing, compliance and recycling."
        crumbs={crumbs}
        primaryLabel="Get a Quote"
      />
      {Object.values(clusters).map((cluster, idx) => (
        <Section key={cluster.slug} alt={idx % 2 === 1}>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Cluster" title={cluster.title} intro={cluster.intro} />
            <Link href={`/resources/${cluster.slug}`} className="hidden shrink-0 items-center gap-1 font-semibold text-brand-700 hover:gap-2 sm:inline-flex">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articlesInCluster(cluster.slug as "uco" | "frying").map((a) => (
              <Reveal as="div" key={a.slug}>
                <Link href={`/resources/${a.slug}`} className="group flex h-full flex-col rounded-[var(--radius)] border border-line bg-surface p-6 transition-all hover:border-brand-300 hover:shadow-soft">
                  <h3 className="font-display text-lg font-semibold text-ink">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">{a.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:gap-2">
                    Read <ArrowRight className="h-4 w-4 transition-all" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </RevealGroup>
        </Section>
      ))}
      <CtaBand />
    </>
  );
}
