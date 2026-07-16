/** JSON-LD builders. Emitted per page via <JsonLd>. No fabricated ratings/reviews. */
import { site } from "@/config/site";
import type { Faq } from "@/config/faqs";

const origin = site.url.replace(/\/$/, "");
const abs = (p: string) => `${origin}${p.startsWith("/") ? p : `/${p}`}`;
const ORG_ID = `${origin}/#organization`;

/** Organization sameAs: social + any entity links that are actually set (progressive). */
function orgSameAs(): string[] {
  const social = Object.values(site.social).filter(Boolean) as string[];
  const links = Object.values(site.entity.links).filter(Boolean) as string[];
  return [...social, ...links];
}

const branchId = (id: string) => `${origin}/#branch-${id}`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: origin,
    logo: abs(site.brand.logoPrimary),
    image: abs(site.brand.ogImage),
    description: site.shortDescription,
    foundingDate: String(site.foundedYear),
    knowsAbout: [...site.entity.knowsAbout],
    areaServed: site.provincesServed.map((n) => ({ "@type": "AdministrativeArea", name: n })),
    location: site.branches.map((b) => ({ "@id": branchId(b.id) })),
    sameAs: orgSameAs(),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.contact.phone.dial,
      contactType: "sales",
      areaServed: "ZA",
      availableLanguage: ["en"],
    },
  };
}

export function localBusinessSchema(branch: (typeof site.branches)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": branchId(branch.id),
    name: `${site.name} — ${branch.label}`,
    url: abs(`/${branch.id}`),
    image: abs(site.brand.ogImage),
    telephone: site.contact.phone.dial,
    email: site.contact.email,
    priceRange: "R (quote-based / bulk)",
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.street,
      addressLocality: branch.city,
      addressRegion: branch.region,
      postalCode: branch.postalCode,
      addressCountry: "ZA",
    },
    geo: { "@type": "GeoCoordinates", latitude: branch.lat, longitude: branch.lng },
    areaServed: { "@type": "AdministrativeArea", name: branch.province },
    ...(branch.gbpUrl ? { sameAs: [branch.gbpUrl] } : {}),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  };
}

/** Site-wide graph for the root layout: Organization + both branch LocalBusiness nodes. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), ...site.branches.map((b) => localBusinessSchema(b))],
  };
}

export function serviceSchema(args: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
  /** "AdministrativeArea" (province) or "City" (metro, nested in SA). */
  placeType?: "AdministrativeArea" | "City";
}) {
  const placeType = args.placeType ?? "AdministrativeArea";
  const names = args.areaServed ?? site.provincesServed;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    url: abs(args.path),
    provider: { "@id": ORG_ID },
    areaServed: names.map((n) =>
      placeType === "City"
        ? { "@type": "City", name: n, containedInPlace: { "@type": "Country", name: "South Africa" } }
        : { "@type": "AdministrativeArea", name: n },
    ),
  };
}

export function productSchema(args: { name: string; description: string; path: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: args.name,
    description: args.description,
    url: abs(args.path),
    ...(args.image ? { image: abs(args.image) } : {}),
    brand: { "@type": "Brand", name: site.name },
    // Quote-based B2B: no price/rating fabricated.
    offers: {
      "@type": "Offer",
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
      url: abs("/request-a-quote"),
      seller: { "@id": ORG_ID },
    },
  };
}

export function faqPageSchema(faqList: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function articleSchema(args: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}) {
  const reviewer = site.editorial.reviewer;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title,
    description: args.description,
    url: abs(args.path),
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: { "@type": "Organization", "@id": ORG_ID, name: site.editorial.authorName },
    publisher: { "@id": ORG_ID },
    // reviewedBy renders only when a real named reviewer is configured (no fabrication).
    ...(reviewer.name
      ? { reviewedBy: { "@type": "Person", name: reviewer.name, ...(reviewer.title ? { jobTitle: reviewer.title } : {}) } }
      : {}),
  };
}
