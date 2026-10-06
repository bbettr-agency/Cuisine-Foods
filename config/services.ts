/** UCO SERVICE MONEY PAGES – each isolates one UCO intent + objection. */
import type { MoneyPage } from "@/config/types";
import { cta } from "@/config/conversion";

const supplyCrossSell = {
  label: "Need fresh oil too? We deliver that.",
  href: "/bulk-cooking-oil-supply",
  blurb:
    "We supply your fresh cooking oil and collect the used oil – one account for the oil going in and the oil coming out.",
};

export const ucoServices: MoneyPage[] = [
  {
    slug: "get-paid",
    kind: "uco-service",
    intent: "uco",
    imageId: "uco-get-paid",
    eyebrow: "Used Cooking Oil",
    h1: "Get Paid for Your Used Cooking Oil",
    subhead: "Your used oil has value – we collect it and pay you for it.",
    metaTitle: "Sell Used Cooking Oil | Get Paid for Your Oil | Cuisine Foods",
    metaDescription:
      "Sell your used cooking oil to Cuisine Foods. Free sealed drums, collection on your schedule and a rebate for eligible oil from commercial kitchens. Arrange collection.",
    intro:
      "Used cooking oil isn't waste – it's a feedstock for renewable biodiesel, and it has real value. We collect yours on a schedule that suits you and pay you for it. No cost to remove it, and a rebate on eligible oil.",
    national: true,
    keyPoints: [
      { icon: "banknote", title: "You get paid", body: "We pay you for the oil we collect – the rate depends on volume and quality. Ask for today's rate." },
      { icon: "droplet", title: "Free sealed drums", body: "We supply clean, sealed storage drums so your oil stays contained and safe." },
      { icon: "truck", title: "On your schedule", body: "Weekly, monthly or a schedule you choose – collection that fits your kitchen." },
    ],
    sections: [
      {
        heading: "How your rebate works",
        body:
          "Your rate depends on the volume you produce and the quality of the oil. Tell us roughly how many litres you generate a week and we'll confirm a rate and a collection schedule. Larger and cleaner volumes earn more.",
        answers: "objection: how much will you pay",
      },
      {
        heading: "Lower your real cost per litre",
        body:
          "When we supply your fresh oil and buy back your used oil, your true cost per litre drops. It's the advantage of using one partner for both.",
        answers: "closed-loop economics",
      },
    ],
    faqIds: ["uco-worth", "uco-pay-rate", "uco-free-drums", "uco-schedule", "uco-min-volume", "uco-how-much-restaurant"],
    relatedSlugs: ["compliance", "cooking-oil-recycling"],
    resourceLinks: [
      { label: "What is used cooking oil worth per litre in SA?", href: "/resources/used-cooking-oil-price-per-litre" },
    ],
    crossSell: supplyCrossSell,
    primaryCtaLabel: cta.ucoGetPaid,
    ppcReady: true,
    calculator: true,
  },
  {
    slug: "compliance",
    kind: "uco-service",
    intent: "uco",
    imageId: "uco-compliance",
    eyebrow: "Used Cooking Oil",
    h1: "Used Cooking Oil Disposal & Compliance",
    subhead: "Responsible collection with documentation for inspections.",
    metaTitle: "Used Cooking Oil Disposal & Compliance | Cuisine Foods",
    metaDescription:
      "Responsible used cooking oil disposal with collection documentation to keep on file. Understand your kitchen's duty of care under SA waste law. Arrange collection.",
    intro:
      "Pouring used cooking oil down the drain is against municipal by-laws, and your kitchen carries a legal duty of care for that oil until it's handled responsibly. We collect yours and give you documentation of each collection to keep on file for a health inspector.",
    keyPoints: [
      { icon: "file-check", title: "Collection documentation", body: "A record of each collection to keep on file for inspections and audits." },
      { icon: "shield-check", title: "Responsibly handled", body: "Collected and sent for recovery the right way – never routed back into the food chain." },
      { icon: "scale", title: "Supports FOG by-laws", body: "Fats, oils and grease can't go down the drain. Scheduled collection helps keep you on the right side of the by-law." },
    ],
    sections: [
      {
        heading: "Used cooking oil is regulated waste in South Africa",
        body:
          "Used cooking oil is regulated under the National Environmental Management: Waste Act (Act 59 of 2008). Your kitchen carries a legal duty of care for that waste until it is handled responsibly – which generally means using a collector and keeping records of each collection. We collect it and give you that record. Your duty of care stays with you, so keeping the paperwork matters.",
        answers: "question: is UCO regulated waste",
      },
      {
        heading: "SAWIS registration for larger kitchens",
        body:
          "Generators above the thresholds in the Waste Act may need to register on the South African Waste Information System (SAWIS) and report periodically. Whether it applies to you depends on your volumes – our collection records give you a paper trail either way. If you're unsure, check your obligations with your local authority.",
        answers: "question: SAWIS registration",
      },
      {
        heading: "The drain is not an option – municipal FOG by-laws",
        body:
          "Municipalities including Johannesburg, Tshwane and Cape Town prohibit fats, oils and grease from entering the sewer and require grease-trap management, and the exact requirements vary by municipality and by business. Illegal disposal can bring penalties. Scheduled collection keeps your used oil out of the drain entirely.",
        answers: "objection: can I pour it away",
      },
      {
        heading: "Your collection documentation",
        body:
          "After each collection we provide documentation of how your oil was handled – the kind of record a health inspector or auditor asks for. For multi-site operators we can consolidate this per store; see UCO compliance reporting for how that works across a group.",
        answers: "objection: do I get a record",
      },
    ],
    national: true,
    faqIds: ["uco-certificate", "uco-legal", "uco-hazardous", "sawis-register", "uco-schedule"],
    relatedSlugs: ["get-paid", "uco-compliance-reporting"],
    resourceLinks: [
      { label: "Used cooking oil regulations in South Africa", href: "/resources/used-cooking-oil-regulations-south-africa" },
      { label: "Is it legal to reuse cooking oil in a restaurant?", href: "/resources/is-it-legal-to-reuse-cooking-oil-in-restaurants" },
    ],
    crossSell: supplyCrossSell,
    primaryCtaLabel: cta.ucoFreeCollection,
    ppcReady: true,
  },
  {
    slug: "grease-trap-cleaning",
    kind: "uco-service",
    intent: "uco",
    imageId: "uco-grease-trap",
    eyebrow: "Kitchen Services",
    h1: "Grease-Trap Cleaning",
    subhead: "Keep your kitchen hygienic, flowing and compliant.",
    metaTitle: "Grease-Trap Cleaning for Commercial Kitchens | Cuisine Foods",
    metaDescription:
      "Professional grease-trap cleaning for restaurants and commercial kitchens across Gauteng & the Western Cape. Prevent blockages and stay compliant. Book a service.",
    intro:
      "Blocked grease traps mean bad smells, slow drains and failed inspections. Our scheduled grease-trap cleaning keeps your kitchen hygienic, your drains flowing and your operation compliant with municipal requirements.",
    keyPoints: [
      { icon: "sparkles", title: "Hygienic & odour-free", body: "Regular servicing prevents build-up, smells and pests." },
      { icon: "shield-check", title: "Stay compliant", body: "Meet the grease-trap maintenance expectations of your municipality." },
      { icon: "clock", title: "On a schedule", body: "Regular intervals matched to how hard your kitchen works." },
    ],
    sections: [
      {
        heading: "Why the grease trap matters",
        body:
          "Fats, oils and grease (FOG) cool and harden inside drains and the municipal sewer. South African municipal by-laws require food premises to fit and maintain a grease trap to keep FOG out of the system, and a neglected trap quickly means bad odours, slow drains, pests and a failed health inspection. Scheduled servicing keeps the trap working and your kitchen compliant.",
        answers: "why grease traps are required",
      },
      {
        heading: "Serviced on a schedule that fits your kitchen",
        body:
          "How often a trap needs cleaning depends on how hard the kitchen fries – most commercial kitchens need it roughly monthly, busy multi-fryer sites more often. We match the interval to your volume so build-up never gets ahead of you.",
        answers: "how the service is scheduled",
      },
      {
        heading: "One partner for oil and grease",
        body:
          "Combine grease-trap cleaning with your used-oil collection and fresh-oil supply – fewer suppliers, one point of contact, one compliant kitchen.",
        answers: "cross-service convenience",
      },
    ],
    faqIds: ["grease-why", "grease-frequency", "grease-included", "uco-legal", "uco-schedule"],
    relatedSlugs: ["compliance", "get-paid"],
    crossSell: supplyCrossSell,
    primaryCtaLabel: cta.greaseTrap,
    quoteTopic: "grease-trap-cleaning",
    ppcReady: false,
    // Regional service — areaServed derives from the hubs that actually offer it.
    serviceAreaKey: "greaseTrap",
  },
  {
    slug: "uco-compliance-reporting",
    kind: "uco-service",
    intent: "uco",
    imageId: "uco-reporting",
    eyebrow: "For Franchises & Groups",
    h1: "UCO Compliance Reporting",
    subhead: "Store-level reporting for franchises, groups and multi-site operators.",
    metaTitle: "UCO Reporting for Franchises & Multi-Site Groups | Cuisine Foods",
    metaDescription:
      "One used-oil collection relationship across every site, with collection documentation consolidated per store for head office. Built for franchise and hotel groups.",
    intro:
      "For franchise groups and multi-site operators, one collection relationship across every site – with the documentation from each store brought together for head office – turns used cooking oil from a per-site loose end into something you can see and account for in one place.",
    keyPoints: [
      { icon: "file-check", title: "Documentation per store", body: "A collection record for each location, consolidated for head office." },
      { icon: "scale", title: "One relationship, every site", body: "The same collection arrangement across the group, not a different handler per store." },
      { icon: "recycle", title: "Records of what you divert", body: "A record of the litres collected from each site for your own reporting." },
    ],
    sections: [
      {
        heading: "Built for multi-site operators",
        body:
          "Franchise groups, fast-food chains, hotels, corporate canteens and other groups: one collection relationship across every site, with the documentation each location needs for inspection brought together in one place.",
        answers: "segment: franchise / group",
      },
      {
        heading: "What you get, store by store",
        body:
          "For each location we collect on a schedule and provide documentation of the collection. Brought together for head office, those per-store records give you one view of how used oil is handled across the group, rather than a loose end at every site. (The exact format we can consolidate records in is confirmed with you when we set the account up.)",
        answers: "what the reporting contains",
      },
      {
        heading: "The oil out — alongside the oil in",
        body:
          "This covers the used oil leaving your kitchens. Pair it with our bulk cooking oil supply and every site runs one account for the oil in and the oil out, with consistent quality on delivery and consistent documentation on collection.",
        answers: "differentiate from bulk supply / cross-link",
      },
    ],
    faqIds: ["reporting-includes", "uco-certificate", "sawis-register", "uco-hazardous", "uco-schedule"],
    relatedSlugs: ["compliance", "get-paid"],
    crossSell: supplyCrossSell,
    primaryCtaLabel: cta.ucoArrange,
    ppcReady: true,
    // Regional — reporting footprint follows the hubs that offer it (not KZN yet).
    serviceAreaKey: "complianceReporting",
  },
  {
    slug: "cooking-oil-recycling",
    kind: "uco-service",
    intent: "uco",
    imageId: "uco-recycling",
    eyebrow: "Sustainability",
    h1: "Cooking Oil Recycling",
    subhead: "Your used oil, recycled into renewable biodiesel.",
    metaTitle: "What Happens to Used Cooking Oil | Recycling | Cuisine Foods",
    metaDescription:
      "What happens to your used cooking oil after collection: aggregated, cleaned and sent for recovery into renewable biodiesel – never back into the food chain.",
    intro:
      "Once we collect your used cooking oil it doesn't go to waste. It's aggregated, cleaned and sent on as a feedstock for renewable biodiesel – never routed back into the food chain. A straightforward, circular route that turns a kitchen by-product into clean energy.",
    keyPoints: [
      { icon: "truck", title: "Collected & aggregated", body: "Your oil is collected and combined with other kitchens' used oil into a usable volume." },
      { icon: "recycle", title: "Cleaned for recovery", body: "It's filtered and cleaned so it can be used as a biodiesel feedstock." },
      { icon: "shield-check", title: "Never back into food", body: "Used oil we collect is sent for recovery – never re-sold into the food chain." },
    ],
    sections: [
      {
        heading: "What happens to your used cooking oil",
        body:
          "After collection, your used oil is aggregated with oil from other kitchens, then filtered and cleaned to remove food solids and water. From there it's supplied as a feedstock for renewable biodiesel – a cleaner-burning fuel made from waste oil rather than crude. The point most kitchens care about: it never goes back into the food chain.",
        answers: "question: what happens to used cooking oil after collection",
      },
      {
        heading: "Why it's worth diverting",
        body:
          "Sending used oil for recovery keeps it out of drains and landfill and turns it into something useful. It's good for compliance and it's a genuine part of your kitchen's sustainability story – backed by the collection records we give you, rather than a vague claim.",
        answers: "motivation: sustainability (honest)",
      },
    ],
    faqIds: ["uco-recycle", "uco-hazardous", "uco-legal"],
    relatedSlugs: ["get-paid", "compliance"],
    resourceLinks: [
      { label: "How used cooking oil becomes biodiesel", href: "/resources/how-used-cooking-oil-becomes-biodiesel" },
    ],
    crossSell: supplyCrossSell,
    primaryCtaLabel: cta.ucoArrange,
    ppcReady: false,
    national: true,
  },
];

export const getUcoService = (slug: string) => ucoServices.find((s) => s.slug === slug);
