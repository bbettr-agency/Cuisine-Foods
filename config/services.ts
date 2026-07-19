/** UCO SERVICE MONEY PAGES — each isolates one UCO intent + objection. */
import type { MoneyPage } from "@/config/types";
import { cta } from "@/config/conversion";

const supplyCrossSell = {
  label: "Need fresh oil too? We deliver that.",
  href: "/bulk-cooking-oil-supply",
  blurb:
    "We're one of the few partners who both supply your fresh cooking oil and collect the used oil — one account for the oil in and the oil out.",
};

export const ucoServices: MoneyPage[] = [
  {
    slug: "get-paid",
    kind: "uco-service",
    intent: "uco",
    imageId: "uco-get-paid",
    eyebrow: "Used Cooking Oil",
    h1: "Get Paid for Your Used Cooking Oil",
    subhead: "Your used oil has value — we collect it free and pay you per litre.",
    metaTitle: "Sell Used Cooking Oil | We Pay Per Litre | Cuisine Foods",
    metaDescription:
      "Turn your used cooking oil into cash. Free sealed drums, free collection on your schedule, paid per litre. Serving Gauteng & the Western Cape. Arrange collection.",
    intro:
      "Used cooking oil isn't waste — it's a feedstock for renewable biodiesel, and it has real value. We collect yours for free, on a schedule that suits you, and pay you per litre. No cost to remove it, and a rebate on every collection.",
    keyPoints: [
      { icon: "banknote", title: "Paid per litre", body: "We pay you for every litre collected — rates depend on volume and quality. Ask for today's rate." },
      { icon: "droplet", title: "Free sealed drums", body: "We supply clean, sealed storage drums so your oil stays contained and safe." },
      { icon: "truck", title: "Free collection", body: "No collection fee — weekly, monthly or a schedule you choose." },
    ],
    sections: [
      {
        heading: "How your rebate works",
        body:
          "Your rate per litre depends on the volume you produce and the quality of the oil. Tell us roughly how many litres you generate a week and we'll confirm a rate and a collection schedule. Larger and cleaner volumes earn more.",
        answers: "objection: how much will you pay / is it really free",
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
    h1: "UCO Compliance & Safe-Disposal Certificates",
    subhead: "Compliant collection that protects you at inspection.",
    metaTitle: "Used Cooking Oil Disposal & Compliance | Cuisine Foods",
    metaDescription:
      "Compliant used cooking oil disposal with safe-disposal documentation. Meet municipal FOG by-laws and protect your kitchen at inspection. Gauteng & Western Cape.",
    intro:
      "Pouring used cooking oil down the drain is illegal, and your kitchen stays legally responsible for its waste until it's disposed of properly. We collect yours as a licensed handler and provide the documentation you need to show a health inspector.",
    keyPoints: [
      { icon: "file-check", title: "Safe-disposal documentation", body: "Proof of compliant collection to keep on file for inspections." },
      { icon: "shield-check", title: "Licensed, compliant handling", body: "Collected and recycled the right way — never routed back into the food chain." },
      { icon: "scale", title: "Meet municipal FOG by-laws", body: "Fats, oils & grease can't go down the drain. We help you stay on the right side of the by-law." },
    ],
    sections: [
      {
        heading: "Used cooking oil is regulated waste in South Africa",
        body:
          "Used cooking oil is regulated under the National Environmental Management: Waste Act (Act 59 of 2008). Your kitchen carries a legal duty of care for that waste until it is disposed of properly — which means using a licensed collector and keeping records of every collection. We handle both.",
        answers: "question: is UCO regulated waste",
      },
      {
        heading: "SAWIS registration for larger kitchens",
        body:
          "Generators that produce used oil from roughly 20 kg per day must register on the South African Waste Information System (SAWIS) and report periodically. Our documented collections give you the paper trail that registration requires, so compliance is one less thing to manage.",
        answers: "question: SAWIS registration",
      },
      {
        heading: "The drain is not an option — municipal FOG by-laws",
        body:
          "Cities including Johannesburg, Tshwane and Cape Town prohibit fats, oils and grease from entering the sewer and require grease-trap management. Illegal disposal can bring fines or, for repeat offences, closure. Compliant collection removes that risk entirely.",
        answers: "objection: can I pour it away",
      },
      {
        heading: "Your safe-disposal certificate",
        body:
          "After each collection we provide documentation of compliant disposal — the record a health inspector or auditor asks for. For franchise groups, we can consolidate this into store-level reporting across every site.",
        answers: "objection: do I get a certificate",
      },
    ],
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
        heading: "One partner for oil and grease",
        body:
          "Combine grease-trap cleaning with your used-oil collection and fresh-oil supply — fewer suppliers, one point of contact, one compliant kitchen.",
        answers: "cross-service convenience",
      },
    ],
    faqIds: ["grease-frequency", "uco-schedule"],
    relatedSlugs: ["compliance", "get-paid"],
    crossSell: supplyCrossSell,
    primaryCtaLabel: cta.ucoArrange,
    ppcReady: false,
  },
  {
    slug: "uco-compliance-reporting",
    kind: "uco-service",
    intent: "uco",
    imageId: "uco-reporting",
    eyebrow: "For Franchises & Groups",
    h1: "UCO Compliance Reporting",
    subhead: "Store-level reporting for franchises, groups and multi-site operators.",
    metaTitle: "UCO Compliance Reporting for Franchises | Cuisine Foods",
    metaDescription:
      "Transparent, store-level used cooking oil reporting for franchise groups, fast-food chains, hotels and corporate canteens. Track cost, compliance & sustainability.",
    intro:
      "For franchise groups and multi-site operators, transparent store-level reporting turns used cooking oil from a blind spot into a managed line item — cost, compliance and sustainability, visible across every site.",
    keyPoints: [
      { icon: "scale", title: "Reduce oil costs", body: "See usage and rebates by store to find savings across the group." },
      { icon: "file-check", title: "Group-wide compliance", body: "Audit-ready disposal documentation for every location." },
      { icon: "leaf", title: "Report sustainability", body: "Track litres recycled into biodiesel for your ESG reporting." },
    ],
    sections: [
      {
        heading: "Built for multi-site operators",
        body:
          "Franchise groups, fast-food chains, hotels, corporate canteens, schools and hospitals: one consolidated view of used-oil across every site, with the documentation each location needs.",
        answers: "segment: franchise / group",
      },
    ],
    faqIds: ["uco-certificate", "uco-schedule"],
    relatedSlugs: ["compliance", "get-paid"],
    crossSell: supplyCrossSell,
    primaryCtaLabel: cta.ucoArrange,
    ppcReady: true,
  },
  {
    slug: "cooking-oil-recycling",
    kind: "uco-service",
    intent: "uco",
    imageId: "uco-recycling",
    eyebrow: "Sustainability",
    h1: "Cooking Oil Recycling",
    subhead: "Your used oil, recycled into renewable biodiesel.",
    metaTitle: "Cooking Oil Recycling in South Africa | Cuisine Foods",
    metaDescription:
      "We recycle collected used cooking oil into renewable biodiesel and oleochemicals — a compliant, circular solution for South African kitchens. Learn how it works.",
    intro:
      "Every litre of used cooking oil we collect is filtered, cleaned and converted into renewable biodiesel and oleochemicals — never routed back into the food chain. It's a compliant, circular solution that turns a waste problem into clean energy.",
    keyPoints: [
      { icon: "recycle", title: "Filtered & cleaned", body: "Collected oil is processed before it becomes feedstock." },
      { icon: "leaf", title: "Into renewable biodiesel", body: "Converted into clean, renewable fuel and oleochemicals." },
      { icon: "shield-check", title: "Never back into food", body: "Responsibly recycled — a point we take seriously." },
    ],
    sections: [
      {
        heading: "A fast-growing circular industry",
        body:
          "South Africa's used cooking oil market is growing quickly — valued at roughly US$295 million in 2025 and projected to reach around US$550 million by 2035 — driven by demand for renewable biodiesel. Every litre you divert to us becomes feedstock for that clean-energy value chain.",
        answers: "context: market size / statistic",
      },
      {
        heading: "The circular story your customers value",
        body:
          "Recycling your used oil is good compliance and good for your brand's sustainability story. We can report the litres you divert into biodiesel for your ESG reporting.",
        answers: "motivation: ESG / sustainability",
      },
    ],
    faqIds: ["uco-recycle", "uco-legal"],
    relatedSlugs: ["get-paid", "compliance"],
    crossSell: supplyCrossSell,
    primaryCtaLabel: cta.ucoArrange,
    ppcReady: false,
  },
];

export const getUcoService = (slug: string) => ucoServices.find((s) => s.slug === slug);
