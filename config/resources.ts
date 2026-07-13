/** RESOURCES — content clusters that build topical authority and feed money pages. */

export type Article = {
  slug: string;
  cluster: "uco" | "frying";
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  updated: string; // ISO date
  readMinutes: number;
  intro: string;
  sections: { heading: string; body: string }[];
  faqIds: string[];
  moneyHref: string; // the money page this article supports
  moneyLabel: string;
};

export const articles: Article[] = [
  {
    slug: "how-to-dispose-of-used-cooking-oil",
    cluster: "uco",
    title: "How to dispose of used cooking oil in South Africa (legally)",
    metaTitle: "How to Dispose of Used Cooking Oil in South Africa | Cuisine Foods",
    metaDescription:
      "The legal, compliant way to dispose of used cooking oil in South Africa — why the drain is illegal, what the by-laws require, and how licensed collection works.",
    excerpt: "Pouring it down the drain is illegal. Here's the compliant way to get rid of used cooking oil — and get paid for it.",
    updated: "2026-07-13",
    readMinutes: 5,
    intro:
      "Used cooking oil can't go down the drain, into the bin, or back into the fryer indefinitely. South African municipalities treat fats, oils and grease as a serious pollutant, and getting disposal wrong can cost your kitchen fines — or its licence. The good news: the compliant route is also the one that pays you.",
    sections: [
      { heading: "Never pour it down the drain", body: "Fats, oils and grease solidify in the sewer, cause blockages, and are prohibited by municipal wastewater by-laws in cities including Johannesburg, Tshwane and Cape Town. Illegal disposal can bring penalties and, for repeat offences, closure." },
      { heading: "Store it safely between collections", body: "Decant cooled used oil into sealed containers kept away from prep areas. A licensed collector will usually supply free sealed drums so your oil stays contained and clean." },
      { heading: "Use a licensed collector who documents it", body: "Your kitchen carries a duty of care for its waste until it's disposed of properly. A licensed used-oil collector removes it, recycles it into biodiesel, and provides safe-disposal documentation you can show an inspector." },
      { heading: "Get paid for it", body: "Because used cooking oil is a biodiesel feedstock, reputable collectors pay you per litre rather than charging to remove it — so compliant disposal becomes a small revenue line, not a cost." },
    ],
    faqIds: ["uco-legal", "uco-certificate", "uco-free-drums", "uco-pay-rate"],
    moneyHref: "/used-cooking-oil-collection",
    moneyLabel: "Arrange a compliant collection",
  },
  {
    slug: "is-it-legal-to-reuse-cooking-oil-in-restaurants",
    cluster: "uco",
    title: "Is it legal to reuse cooking oil in a restaurant?",
    metaTitle: "Is It Legal to Reuse Cooking Oil in a Restaurant? (South Africa) | Cuisine Foods",
    metaDescription:
      "How long you can reuse frying oil in a South African commercial kitchen, when it becomes a food-safety risk, and the rules that apply. A practical guide.",
    excerpt: "You can reuse frying oil — up to a point. Here's when it becomes a food-safety and compliance problem.",
    updated: "2026-07-13",
    readMinutes: 4,
    intro:
      "Reusing frying oil is normal practice and legal within limits — but degraded oil becomes both a food-quality and a food-safety issue. Knowing when to change it protects your customers and your compliance.",
    sections: [
      { heading: "Degraded oil is the real risk", body: "Repeatedly heated oil breaks down, forming compounds that affect food quality and safety. Food-safety guidance treats heavily degraded frying oil as unfit for use — so 'reuse forever' isn't an option." },
      { heading: "Know when to change it", body: "Change your oil when it darkens, foams excessively or smells burnt. Filtering daily, keeping the fryer clean and frying at 160–190°C all extend usable life without compromising safety." },
      { heading: "What you can't do", body: "You can't route spent oil back into the food chain or sell it for human or animal consumption — that's where reuse crosses into illegality. Spent oil should go to a licensed collector for recycling into biodiesel." },
    ],
    faqIds: ["when-change-oil", "uco-legal", "uco-recycle"],
    moneyHref: "/used-cooking-oil-collection/compliance",
    moneyLabel: "See compliant collection",
  },
  {
    slug: "used-cooking-oil-price-per-litre",
    cluster: "uco",
    title: "What is used cooking oil worth per litre in South Africa?",
    metaTitle: "Used Cooking Oil Price Per Litre in South Africa (2026) | Cuisine Foods",
    metaDescription:
      "What South African collectors pay for used cooking oil per litre, what moves the rate, and how to get the best price for your kitchen's waste oil.",
    excerpt: "Used cooking oil has real value as biodiesel feedstock. Here's what drives the rate you're paid.",
    updated: "2026-07-13",
    readMinutes: 4,
    intro:
      "Used cooking oil is bought, not just removed — because it's a feedstock for renewable biodiesel. What you're paid per litre depends on a few things you can influence.",
    sections: [
      { heading: "Why it has value", body: "Collected used oil is filtered and converted into biodiesel and oleochemicals. That end-market is why collectors pay you per litre rather than charging for removal." },
      { heading: "What moves the rate", body: "Volume and quality are the big levers: larger, cleaner, well-stored oil earns more per litre than small or contaminated quantities. Consistency of supply also helps." },
      { heading: "How to get the best price", body: "Keep water and food debris out of your storage drums, let oil cool before decanting, and produce a steady volume. Ask your collector for today's rate for your specific kitchen." },
    ],
    faqIds: ["uco-pay-rate", "uco-min-volume", "uco-free-drums"],
    moneyHref: "/used-cooking-oil-collection/get-paid",
    moneyLabel: "Get paid for your used oil",
  },
  {
    slug: "how-used-cooking-oil-becomes-biodiesel",
    cluster: "uco",
    title: "How used cooking oil becomes biodiesel",
    metaTitle: "How Used Cooking Oil Is Recycled Into Biodiesel | Cuisine Foods",
    metaDescription:
      "The journey from a restaurant fryer to renewable biodiesel — collection, filtering, processing and the circular-economy story behind used cooking oil recycling.",
    excerpt: "From your fryer to renewable fuel — the recycling journey your used oil takes.",
    updated: "2026-07-13",
    readMinutes: 4,
    intro:
      "Every litre of used cooking oil we collect has a second life. Here's the journey from a commercial fryer to renewable biodiesel — a genuine circular-economy story your customers value.",
    sections: [
      { heading: "Collection & transport", body: "Spent oil is collected from your sealed drums on a schedule and transported to a processing facility — never back into the food chain." },
      { heading: "Filtering & cleaning", body: "The oil is filtered to remove food debris and water and prepared as a clean feedstock." },
      { heading: "Conversion into biodiesel", body: "Processed used oil becomes renewable biodiesel and oleochemicals — cleaner fuel that displaces fossil diesel and supports your sustainability reporting." },
    ],
    faqIds: ["uco-recycle", "uco-legal"],
    moneyHref: "/cooking-oil-recycling",
    moneyLabel: "See cooking oil recycling",
  },
  {
    slug: "best-oil-for-commercial-deep-frying",
    cluster: "frying",
    title: "The best oil for commercial deep frying in South Africa",
    metaTitle: "Best Oil for Commercial Deep Frying (South Africa) | Cuisine Foods",
    metaDescription:
      "Palm olein, sunflower or soya — which oil is best for your commercial fryer? A practical comparison of heat stability, fry-life, flavour and cost.",
    excerpt: "Palm olein, sunflower or soya? How to choose the right frying oil for a commercial kitchen.",
    updated: "2026-07-13",
    readMinutes: 5,
    intro:
      "The 'best' frying oil depends on how you fry. Here's how palm olein, sunflower and soya compare on the things that matter in a commercial kitchen — heat stability, fry-life, flavour and cost.",
    sections: [
      { heading: "Palm olein — the high-volume workhorse", body: "The most heat-stable of the three, with the longest fry-life. For QSR and busy fryers that run all day, palm olein means fewer oil changes and a lower total cost." },
      { heading: "Sunflower — the versatile all-rounder", body: "Clean flavour and a high smoke point make sunflower ideal when one oil has to fry, bake and cook. A great default for restaurants with a varied menu." },
      { heading: "Soya — cost-effective at volume", body: "Neutral flavour and dependable performance make soya a cost-effective choice for high-volume kitchens and food manufacturers." },
      { heading: "Make whichever you choose last longer", body: "Keep the fryer clean, filter daily, fry at 160–190°C and skim often. And when the oil is spent, we collect and pay for it — lowering your real cost per litre." },
    ],
    faqIds: ["palm-vs-sunflower", "when-change-oil"],
    moneyHref: "/frying-oil",
    moneyLabel: "See our frying oils",
  },
  {
    slug: "commercial-frying-guide",
    cluster: "frying",
    title: "Fry smarter: the commercial frying best-practice guide",
    metaTitle: "Commercial Frying Guide: Fry Smarter, Cleaner, Longer | Cuisine Foods",
    metaDescription:
      "Practical frying best-practice for commercial kitchens — temperature, filtering, batch size and oil care that extend fry-life and cut cost per litre.",
    excerpt: "Fry smarter, cleaner and longer — the fryer routine that saves oil and money.",
    updated: "2026-07-13",
    readMinutes: 5,
    intro:
      "Good frying is a routine, not a guess. These habits keep your oil cleaner for longer, protect food quality, and cut your cost per litre.",
    sections: [
      { heading: "Hold the right temperature", body: "Fry between 160°C and 190°C. Too hot and the oil degrades fast; too cool and food absorbs oil. A reliable thermostat pays for itself." },
      { heading: "Keep it clean", body: "Skim debris frequently, filter the oil daily, and don't salt food over the fryer — salt accelerates breakdown." },
      { heading: "Fry in the right ratio & batches", body: "Keep roughly one part food to six parts oil, and fry in small batches so the temperature doesn't crash. Clear ice crystals before frying." },
      { heading: "Know when to change — and recycle", body: "Change the oil when it's dark, foaming or burnt-smelling. Then let us collect and recycle it — and pay you for it." },
    ],
    faqIds: ["when-change-oil", "palm-vs-sunflower"],
    moneyHref: "/frying-oil",
    moneyLabel: "Choose the right frying oil",
  },
];

export const clusters = {
  uco: {
    slug: "used-cooking-oil",
    title: "Used Cooking Oil Hub",
    metaTitle: "Used Cooking Oil Guide: Collection, Pricing & Compliance | Cuisine Foods",
    metaDescription:
      "Everything South African kitchens need on used cooking oil — disposal, pricing per litre, compliance, recycling into biodiesel and more.",
    intro: "The most useful place in South Africa to understand used cooking oil — how to dispose of it legally, what it's worth, and how it's recycled.",
    moneyHref: "/used-cooking-oil-collection",
  },
  frying: {
    slug: "frying",
    title: "Frying & Cooking Oil",
    metaTitle: "Commercial Frying & Cooking Oil Guides | Cuisine Foods",
    metaDescription: "Practical guides on choosing and getting the most from commercial cooking oil — frying best-practice, oil comparisons and cost.",
    intro: "Practical guidance for professional kitchens on choosing the right oil and getting the longest, cleanest fry-life.",
    moneyHref: "/bulk-cooking-oil-supply",
  },
} as const;

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const articlesInCluster = (c: "uco" | "frying") => articles.filter((a) => a.cluster === c);
