import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { products } from "@/config/products";
import { ucoServices } from "@/config/services";
import { buyers } from "@/config/buyers";
import { provinces, metros } from "@/config/locations";
import { articles, clusters } from "@/config/resources";
import { hrefFor } from "@/lib/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const url = (p: string) => `${base}${p === "/" ? "" : p}`;
  const now = "2026-07-13";

  const staticPaths: [string, number][] = [
    ["/", 1.0],
    ["/bulk-cooking-oil-supply", 0.9],
    ["/used-cooking-oil-collection", 0.9],
    ["/about", 0.6],
    ["/contact", 0.6],
    ["/request-a-quote", 0.7],
    ["/resources", 0.5],
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const [p, priority] of staticPaths) {
    entries.push({ url: url(p), lastModified: now, changeFrequency: "monthly", priority });
  }
  for (const p of [...products, ...ucoServices, ...buyers]) {
    entries.push({ url: url(hrefFor(p)), lastModified: now, changeFrequency: "monthly", priority: 0.8 });
  }
  for (const pr of provinces) {
    entries.push({ url: url(`/${pr.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.8 });
  }
  for (const m of metros) {
    entries.push({ url: url(`/${m.provinceSlug}/${m.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }
  for (const c of Object.values(clusters)) {
    entries.push({ url: url(`/resources/${c.slug}`), lastModified: now, changeFrequency: "monthly", priority: 0.5 });
  }
  for (const a of articles) {
    entries.push({ url: url(`/resources/${a.slug}`), lastModified: a.updated, changeFrequency: "monthly", priority: 0.5 });
  }

  return entries;
}
