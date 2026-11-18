import type { Metadata } from "next";
import { site } from "@/config/site";
import { funnels } from "@/config/funnels";
import { FunnelPage } from "@/components/funnel/funnel-page";

/**
 * /quote/collect — PAID-ADS used cooking oil collection funnel.
 * Unlisted: noindex/nofollow, excluded from the sitemap and site navigation.
 * Layout is shared with the other funnel (FunnelPage); content is config/funnels.ts.
 */
const content = funnels.collect;

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: `${site.url}${content.path}` },
};

export default function QuoteCollectPage() {
  return <FunnelPage content={content} />;
}
