import type { Metadata } from "next";
import { site } from "@/config/site";
import { funnelSelect } from "@/config/funnels";
import { FunnelSelect } from "@/components/funnel/funnel-select";

/**
 * /quote — entry point of the unified PAID-ADS funnel: the visitor chooses a
 * service, then continues to /quote/buy or /quote/collect. Unlisted: noindex,
 * nofollow, excluded from the sitemap and site navigation (middleware also sends
 * X-Robots-Tag on every /quote route), but publicly reachable for ad traffic.
 */
export const metadata: Metadata = {
  title: funnelSelect.meta.title,
  description: funnelSelect.meta.description,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: `${site.url}${funnelSelect.path}` },
};

export default function QuoteSelectPage() {
  return <FunnelSelect />;
}
