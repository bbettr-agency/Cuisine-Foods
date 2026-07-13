/** JSON-LD builders. Emitted per page via <JsonLd>. No fabricated ratings/reviews. */
import { site } from "@/config/site";
import type { Faq } from "@/config/faqs";

const origin = site.url.replace(/\/$/, "");
const abs = (p: string) => `${origin}${p.startsWith("/") ? p : `/${p}`}`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: site.name,
    url: origin,
    logo: abs(site.brand.logoPrimary),
    description: site.shortDescription,
    foundingDate: String(site.foundedYear),
    sameAs: Object.values(site.social).filter(Boolean),
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
    "@id": `${origin}/${branch.id}/#localbusiness`,
    name: `${site.name} — ${branch.label}`,
    url: abs(`/${branch.id}`),
    telephone: site.contact.phone.dial,
    email: site.contact.email,
    parentOrganization: { "@id": `${origin}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.street,
      addressLocality: branch.city,
      addressRegion: branch.region,
      postalCode: branch.postalCode,
      addressCountry: "ZA",
    },
    areaServed: { "@type": "AdministrativeArea", name: branch.province },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  };
}

export function serviceSchema(args: { name: string; description: string; path: string; areaServed?: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    url: abs(args.path),
    provider: { "@id": `${origin}/#organization` },
    areaServed: (args.areaServed ?? site.provincesServed).map((n) => ({ "@type": "AdministrativeArea", name: n })),
  };
}

export function productSchema(args: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: args.name,
    description: args.description,
    url: abs(args.path),
    brand: { "@type": "Brand", name: site.name },
    // Quote-based B2B: no price/rating fabricated.
    offers: {
      "@type": "Offer",
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
      url: abs("/request-a-quote"),
      seller: { "@id": `${origin}/#organization` },
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

export function articleSchema(args: { title: string; description: string; path: string; datePublished: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title,
    description: args.description,
    url: abs(args.path),
    datePublished: args.datePublished,
    dateModified: args.datePublished,
    author: { "@id": `${origin}/#organization` },
    publisher: { "@id": `${origin}/#organization` },
  };
}
