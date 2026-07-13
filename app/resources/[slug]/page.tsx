import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { articles, clusters, getArticle, articlesInCluster } from "@/config/resources";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/container";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { CtaBand } from "@/components/funnel/cta-band";
import { ArticleView } from "@/views/article";

type ClusterKey = keyof typeof clusters;

const isCluster = (slug: string): ClusterKey | null =>
  (Object.keys(clusters) as ClusterKey[]).find((k) => clusters[k].slug === slug) ?? null;

export function generateStaticParams() {
  const clusterSlugs = Object.values(clusters).map((c) => ({ slug: c.slug }));
  const articleSlugs = articles.map((a) => ({ slug: a.slug }));
  return [...clusterSlugs, ...articleSlugs];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const ck = isCluster(params.slug);
  if (ck) {
    const c = clusters[ck];
    return buildMetadata({ title: c.metaTitle, description: c.metaDescription, path: `/resources/${c.slug}` });
  }
  const a = getArticle(params.slug);
  if (!a) return {};
  return buildMetadata({ title: a.metaTitle, description: a.metaDescription, path: `/resources/${a.slug}` });
}

export default function Page({ params }: { params: { slug: string } }) {
  const ck = isCluster(params.slug);
  if (ck) {
    const cluster = clusters[ck];
    const list = articlesInCluster(ck);
    const crumbs = [{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: cluster.title, path: `/resources/${cluster.slug}` }];
    return (
      <>
        <JsonLd data={breadcrumbSchema(crumbs)} />
        <PageHero eyebrow="Resource hub" h1={cluster.title} subhead={cluster.intro} crumbs={crumbs} primaryLabel="Get a Quote" />
        <Section>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <Reveal as="div" key={a.slug}>
                <Link href={`/resources/${a.slug}`} className="group flex h-full flex-col rounded-[var(--radius)] border border-line bg-surface p-6 transition-all hover:border-brand-300 hover:shadow-soft">
                  <h2 className="font-display text-lg font-semibold text-ink">{a.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">{a.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:gap-2">Read <ArrowRight className="h-4 w-4 transition-all" /></span>
                </Link>
              </Reveal>
            ))}
          </RevealGroup>
        </Section>
        <CtaBand />
      </>
    );
  }

  const article = getArticle(params.slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
