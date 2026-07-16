import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { site } from "@/config/site";
import type { Article } from "@/config/resources";
import { articlesInCluster, clusters } from "@/config/resources";
import { getFaqs } from "@/config/faqs";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";

import { JsonLd } from "@/components/seo/json-ld";
import { Container, Section } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/sections/faq-section";
import { RelatedLinks } from "@/components/sections/related-links";
import { CtaBand } from "@/components/funnel/cta-band";

export function ArticleView({ article }: { article: Article }) {
  const cluster = clusters[article.cluster];
  const path = `/resources/${article.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: cluster.title, path: `/resources/${cluster.slug}` },
    { name: article.title, path },
  ];
  const related = articlesInCluster(article.cluster)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)
    .map((a) => ({ label: a.title, href: `/resources/${a.slug}`, blurb: a.excerpt }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          articleSchema({ title: article.title, description: article.metaDescription, path, datePublished: article.updated }),
          faqPageSchema(getFaqs(article.faqIds)),
        ]}
      />

      <Container className="pt-8 lg:pt-12">
        <Breadcrumbs items={crumbs} />
      </Container>

      <article>
        <Container className="max-w-prose">
          <Reveal>
            <p className="eyebrow mb-3">{cluster.title}</p>
            <h1 className="text-display text-ink">{article.title}</h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-faint">
              <Clock className="h-4 w-4" /> {article.readMinutes} min read · Updated {article.updated}
            </p>
            <p className="mt-1 text-sm text-ink-faint">
              By {site.editorial.authorName}
              {site.editorial.reviewer.name
                ? ` · Reviewed by ${site.editorial.reviewer.name}${site.editorial.reviewer.title ? `, ${site.editorial.reviewer.title}` : ""}`
                : ""}
            </p>
            <p className="mt-6 text-xl leading-relaxed text-ink-soft">{article.intro}</p>
          </Reveal>
        </Container>

        <Container className="mt-10 max-w-prose">
          <div className="space-y-10">
            {article.sections.map((s) => (
              <Reveal key={s.heading}>
                <h2 className="text-h2 text-ink">{s.heading}</h2>
                <p className="mt-3 text-lg leading-relaxed text-ink-soft">{s.body}</p>
              </Reveal>
            ))}
          </div>

          {/* Inline money CTA */}
          <Reveal className="mt-12">
            <div className="flex flex-col items-start gap-4 rounded-[var(--radius)] border border-brand-700/20 bg-brand-50/60 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-lg font-semibold text-ink">{article.moneyLabel}</p>
              <Button href={article.moneyHref}>
                {article.moneyLabel} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </article>

      <FaqSection ids={article.faqIds} alt />
      {related.length > 0 && <RelatedLinks title={`More on ${cluster.title.toLowerCase()}`} items={related} />}
      <CtaBand />
    </>
  );
}
