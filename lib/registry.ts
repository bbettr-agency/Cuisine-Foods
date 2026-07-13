/** Resolves internal links/labels for any money page — powers related-link blocks. */
import { products } from "@/config/products";
import { ucoServices } from "@/config/services";
import { buyers } from "@/config/buyers";
import type { MoneyPage } from "@/config/types";

/** UCO services that live at the root (not nested under the pillar). */
const ROOT_UCO = new Set(["grease-trap-cleaning", "uco-compliance-reporting", "cooking-oil-recycling"]);

export function hrefFor(page: Pick<MoneyPage, "kind" | "slug">): string {
  if (page.kind === "uco-service") {
    return ROOT_UCO.has(page.slug) ? `/${page.slug}` : `/used-cooking-oil-collection/${page.slug}`;
  }
  return `/${page.slug}`; // product, buyer, pillar
}

const all: MoneyPage[] = [...products, ...ucoServices, ...buyers];
const bySlug = new Map(all.map((p) => [p.slug, p]));

export function resolveRelated(slugs: string[] = []) {
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((p): p is MoneyPage => Boolean(p))
    .map((p) => ({ label: p.h1, href: hrefFor(p), blurb: p.subhead }));
}
