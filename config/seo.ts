/** SEO defaults — title template, description, OG. Per-page overrides via lib/metadata. */
import { site } from "@/config/site";

export const seo = {
  titleTemplate: `%s`,
  defaultTitle: "Cuisine Foods | Bulk Cooking Oil Supply & Used Oil Collection",
  defaultDescription:
    "Bulk sunflower, palm olein & soya delivered across Gauteng & the Western Cape — plus free, compliant used cooking oil collection. One trusted South African partner.",
  ogImage: "/images/og/cuisine-foods-og.jpg", // 1200×630 — provided with photography
  ogImageAlt: "Cuisine Foods — premium cooking oil supply and used cooking oil collection",
  twitterCard: "summary_large_image" as const,
  keywords: [
    "bulk cooking oil supplier",
    "used cooking oil collection",
    "palm olein supplier",
    "sunflower oil bulk",
    "soya oil supplier",
    "cooking oil supplier Gauteng",
    "cooking oil supplier Cape Town",
    "sell used cooking oil",
  ],
  siteName: site.name,
};
