/** Shared content types consumed by page templates. Keeps every money page uniform. */
import type { CtaIntent } from "@/config/conversion";

export type IconName =
  | "truck" | "shield-check" | "recycle" | "droplet" | "flame" | "clock"
  | "map-pin" | "badge-check" | "banknote" | "leaf" | "scale" | "phone"
  | "message-circle" | "check" | "building-2" | "utensils" | "factory"
  | "hotel" | "store" | "sparkles" | "file-check" | "thermometer";

export type FeaturePoint = { icon: IconName; title: string; body: string };

/** A page section that answers one objection/question (the OS section contract). */
export type ContentSection = {
  heading: string;
  body?: string;
  points?: FeaturePoint[];
  answers?: string; // which objection/question this section resolves (internal note)
};

export type CrossSell = { label: string; href: string; blurb: string };

/** A contextual link to a supporting resource article (content ↔ money interlinking). */
export type ResourceLink = { label: string; href: string; blurb?: string };

/** Product spec / datasheet row (smoke point, pack sizes, etc.). */
export type ProductSpec = { label: string; value: string };

/** Comparison table (e.g. Sunflower vs Palm Olein vs Soya) – tables win AI-search citations. */
export type ComparisonTable = {
  caption: string;
  columns: string[]; // first column is the feature label
  rows: string[][]; // each row: [feature, ...values aligned to columns[1..]]
};

/** The canonical money-page shape (products, buyer segments, UCO services, pillars). */
export type MoneyPage = {
  slug: string;
  kind: "product" | "buyer" | "uco-service" | "pillar";
  intent: CtaIntent;
  imageId: string;
  eyebrow: string;
  h1: string;
  subhead: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  keyPoints: FeaturePoint[];
  sections: ContentSection[];
  faqIds: string[];
  relatedSlugs?: string[]; // sibling pages to interlink
  crossSell: CrossSell; // the closed-loop link to the other pillar
  primaryCtaLabel: string;
  ppcReady?: boolean;
  specs?: ProductSpec[]; // product datasheet (rendered as a spec table)
  comparison?: ComparisonTable; // optional decision table (e.g. on the frying-oil page)
  calculator?: boolean; // render the UCO value calculator (e.g. on the get-paid page)
  /** Service-area scope for schema + copy. `national: true` → areaServed = South
   *  Africa (confirmed national capabilities: supply, UCO collection). Omit for a
   *  regionally-offered service and set `serviceAreaKey` so areaServed is derived
   *  from the hubs that actually provide it (e.g. grease-trap, reporting). */
  national?: boolean;
  serviceAreaKey?: "greaseTrap" | "complianceReporting";
  /** Extra lead context passed to the quote form (e.g. "grease-trap-cleaning"),
   *  so an enquiry arrives tagged with the specific service. */
  quoteTopic?: string;
  /** Overrides the JSON-LD type. Defaults to Product for `kind: "product"`,
   *  Service otherwise. Set "service" for a category page with no single SKU
   *  (e.g. frying-oil) so we don't fabricate a Product. */
  schemaKind?: "product" | "service";
  resourceLinks?: ResourceLink[]; // supporting guides (content ↔ money interlinking)
  /** Page-specific closing CTA copy. Each commercial page closes in its own voice
   *  rather than repeating one generic band across the site. */
  closing?: { title: string; body: string };
};
