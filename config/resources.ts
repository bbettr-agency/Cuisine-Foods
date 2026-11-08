/** RESOURCES – content clusters that build topical authority and feed money pages. */

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
  /** Authoritative sources for factual/regulatory/technical claims (E-E-A-T). */
  sources?: { label: string; url?: string }[];
};

export const articles: Article[] = [
  {
    slug: "how-to-dispose-of-used-cooking-oil",
    cluster: "uco",
    title: "How to dispose of used cooking oil in South Africa (legally)",
    metaTitle: "How to Dispose of Used Cooking Oil in South Africa | Cuisine Foods",
    metaDescription:
      "The legal, compliant way to dispose of used cooking oil in South Africa – why the drain is illegal, what the by-laws require, and how compliant collection works.",
    excerpt: "Pouring it down the drain is illegal. Here's the compliant way to get rid of used cooking oil – and get paid for it.",
    updated: "2026-07-13",
    readMinutes: 5,
    intro:
      "Used cooking oil can't go down the drain, into the bin, or back into the fryer indefinitely. South African municipalities treat fats, oils and grease as a serious pollutant, and getting disposal wrong can cost your kitchen fines – or its licence. The good news: the compliant route is also the one that pays you.",
    sections: [
      { heading: "Never pour it down the drain", body: "Fats, oils and grease solidify in the sewer, cause blockages, and are prohibited by municipal wastewater by-laws in cities including Johannesburg, Tshwane and Cape Town. Illegal disposal can bring penalties and, for repeat offences, closure." },
      { heading: "Store it safely between collections", body: "Decant cooled used oil into sealed containers kept away from prep areas. A used-oil collector will usually supply free sealed drums so your oil stays contained and clean." },
      { heading: "Use a used-oil collector who documents it", body: "Your kitchen carries a duty of care for its waste until it's disposed of properly. A used-oil collector removes it, sends it for recovery into biodiesel, and provides collection documentation you can show an inspector." },
      { heading: "Get paid for it", body: "Because used cooking oil is a biodiesel feedstock, reputable collectors pay you per litre rather than charging to remove it – so compliant disposal becomes a small revenue line, not a cost." },
    ],
    faqIds: ["uco-legal", "uco-certificate", "uco-free-drums", "uco-pay-rate"],
    moneyHref: "/used-cooking-oil-collection",
    moneyLabel: "Arrange a compliant collection",
    sources: [
      { label: "National Environmental Management: Waste Act, 2008 (Act No. 59 of 2008) – DFFE", url: "https://www.dffe.gov.za/sites/default/files/legislations/nema_amendment_act59.pdf" },
      { label: "Municipal fats, oils & grease (FOG) by-laws – City of Cape Town, City of Johannesburg and City of Tshwane", url: "https://sawic.environment.gov.za" },
    ],
  },
  {
    slug: "is-it-legal-to-reuse-cooking-oil-in-restaurants",
    cluster: "uco",
    title: "Is it legal to reuse cooking oil in a restaurant?",
    metaTitle: "Can You Reuse Cooking Oil in a Restaurant? (SA) | Cuisine Foods",
    metaDescription:
      "How long you can reuse frying oil in a South African commercial kitchen, when it becomes a food-safety risk, and the rules that apply. A practical guide.",
    excerpt: "You can reuse frying oil – up to a point. Here's when it becomes a food-safety and compliance problem.",
    updated: "2026-07-13",
    readMinutes: 4,
    intro:
      "Reusing frying oil is normal practice and legal within limits – but degraded oil becomes both a food-quality and a food-safety issue. Knowing when to change it protects your customers and your compliance.",
    sections: [
      { heading: "Degraded oil is the real risk", body: "Repeatedly heated oil breaks down, forming compounds that affect food quality and safety. Food-safety guidance treats heavily degraded frying oil as unfit for use – so 'reuse forever' isn't an option." },
      { heading: "Know when to change it", body: "Change your oil when it darkens, foams excessively or smells burnt. Filtering daily, keeping the fryer clean and frying at 160–190°C all extend usable life without compromising safety." },
      { heading: "What you can't do", body: "You can't route spent oil back into the food chain or sell it for human or animal consumption – that's where reuse crosses into illegality. Spent oil should go to a used-oil collector for recycling into biodiesel." },
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
      "Used cooking oil is bought, not just removed – because it's a feedstock for renewable biodiesel. What you're paid per litre depends on a few things you can influence.",
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
      "The journey from a restaurant fryer to renewable biodiesel – collection, filtering, processing and the circular-economy story behind used cooking oil recycling.",
    excerpt: "From your fryer to renewable fuel – the recycling journey your used oil takes.",
    updated: "2026-07-13",
    readMinutes: 4,
    intro:
      "Every litre of used cooking oil we collect has a second life. Here's the journey from a commercial fryer to renewable biodiesel – a genuine circular-economy story your customers value.",
    sections: [
      { heading: "Collection & transport", body: "Spent oil is collected from your sealed drums on a schedule and transported to a processing facility – never back into the food chain." },
      { heading: "Filtering & cleaning", body: "The oil is filtered to remove food debris and water and prepared as a clean feedstock." },
      { heading: "Conversion into biodiesel", body: "Processed used oil becomes renewable biodiesel and oleochemicals – cleaner fuel that displaces fossil diesel and supports your sustainability reporting." },
    ],
    faqIds: ["uco-recycle", "uco-legal"],
    moneyHref: "/cooking-oil-recycling",
    moneyLabel: "See cooking oil recycling",
  },
  {
    slug: "used-cooking-oil-regulations-south-africa",
    cluster: "uco",
    title: "Used cooking oil regulations in South Africa: the Waste Act, SAWIS & FOG by-laws",
    metaTitle: "Used Cooking Oil Regulations in South Africa (2026) | Cuisine Foods",
    metaDescription:
      "How used cooking oil is regulated in South Africa – the Waste Act, SAWIS registration, municipal FOG by-laws and the collection documentation your kitchen needs.",
    excerpt: "What the law actually requires when you dispose of used cooking oil in South Africa – plainly explained.",
    updated: "2026-07-16",
    readMinutes: 6,
    intro:
      "In South Africa, used cooking oil is regulated waste. Your kitchen is legally responsible for disposing of it through a used-oil collector and keeping records – and pouring it down the drain is prohibited. Here's the framework in plain terms, and what it means for a restaurant, franchise or food manufacturer.",
    sections: [
      { heading: "It's regulated under the Waste Act (Act 59 of 2008)", body: "Used cooking oil falls under the National Environmental Management: Waste Act. The Act places a 'duty of care' on the business that generates the waste – you remain responsible until it is handled by an appropriate waste handler and disposed of properly. In practice that means using a documented, used-oil collector rather than a bin or a drain." },
      { heading: "Some generators must register on SAWIS", body: "The South African Waste Information System (SAWIS) was established under the Waste Act, and the National Waste Information Regulations (2012) set out, in their Annexure 1, which waste activities must register and report. Whether your kitchen is caught depends on your volumes and activity – check your obligations with your local authority. Either way, the documentation from each collection is the record that supports that reporting." },
      { heading: "Municipal FOG by-laws ban the drain", body: "Cities including Johannesburg, Tshwane and Cape Town enforce fats-oils-and-grease (FOG) by-laws that prohibit oil entering the sewer and require grease-trap maintenance. Contraventions can bring fines and, for repeat offences, closure of the kitchen. This is the most common way food businesses fall foul of the rules." },
      { heading: "The collection documentation is your proof", body: "A used-oil collector provides documentation of compliant disposal after each collection – the record a health inspector or auditor will ask to see. Keep these on file; for multi-site operators, consolidating those records makes an audit straightforward." },
      { heading: "Why 'selling to anyone' is a risk", body: "Selling used oil to an informal buyer can leave you exposed – you keep the duty of care, and oil that is illegally re-refined into the food chain is a documented food-safety risk. Using a documented, compliant collector protects your business and your customers." },
    ],
    faqIds: ["uco-hazardous", "sawis-register", "uco-legal", "uco-certificate"],
    moneyHref: "/used-cooking-oil-collection/compliance",
    moneyLabel: "See compliant collection",
    sources: [
      { label: "National Environmental Management: Waste Act, 2008 (Act No. 59 of 2008) – Department of Forestry, Fisheries & the Environment", url: "https://www.dffe.gov.za/sites/default/files/legislations/nema_amendment_act59.pdf" },
      { label: "A user-friendly guide to the NEM: Waste Act – SAWIC / DFFE", url: "https://sawic.environment.gov.za/documents/944.pdf" },
      { label: "National Waste Information Regulations, 2012 (registration & reporting; Annexure 1) – DFFE", url: "https://sawic.environment.gov.za" },
      { label: "South African Waste Information System (SAWIS) – DFFE", url: "https://sawic.environment.gov.za" },
      { label: "Municipal fats, oils & grease (FOG) by-laws – City of Cape Town, City of Johannesburg and City of Tshwane wastewater/industrial-effluent by-laws" },
    ],
  },
  {
    slug: "best-oil-for-commercial-deep-frying",
    cluster: "frying",
    title: "The best oil for commercial deep frying in South Africa",
    metaTitle: "Best Oil for Commercial Deep Frying (South Africa) | Cuisine Foods",
    metaDescription:
      "Palm olein, sunflower or soya – which oil is best for your commercial fryer? A practical comparison of heat stability, fry-life, flavour and cost.",
    excerpt: "Palm olein, sunflower or soya? How to choose the right frying oil for a commercial kitchen.",
    updated: "2026-07-13",
    readMinutes: 5,
    intro:
      "The 'best' frying oil depends on how you fry. Here's how palm olein, sunflower and soya compare on the things that matter in a commercial kitchen – heat stability, fry-life, flavour and cost.",
    sections: [
      { heading: "Palm olein – the high-volume workhorse", body: "The most heat-stable of the three, with the longest fry-life. For QSR and busy fryers that run all day, palm olein means fewer oil changes and a lower total cost." },
      { heading: "Sunflower – the versatile all-rounder", body: "Clean flavour and a high smoke point make sunflower ideal when one oil has to fry, bake and cook. A great default for restaurants with a varied menu." },
      { heading: "Soya – cost-effective at volume", body: "Neutral flavour and dependable performance make soya a cost-effective choice for high-volume kitchens and food manufacturers." },
      { heading: "Make whichever you choose last longer", body: "Keep the fryer clean, filter daily, fry at 160–190°C and skim often. And when the oil is spent, we collect and pay for it – lowering your real cost per litre." },
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
      "Practical frying best-practice for commercial kitchens – temperature, filtering, batch size and oil care that extend fry-life and cut cost per litre.",
    excerpt: "Fry smarter, cleaner and longer – the fryer routine that saves oil and money.",
    updated: "2026-07-13",
    readMinutes: 5,
    intro:
      "Good frying is a routine, not a guess. These habits keep your oil cleaner for longer, protect food quality, and cut your cost per litre.",
    sections: [
      { heading: "Hold the right temperature", body: "Fry between 160°C and 190°C. Too hot and the oil degrades fast; too cool and food absorbs oil. A reliable thermostat pays for itself." },
      { heading: "Keep it clean", body: "Skim debris frequently, filter the oil daily, and don't salt food over the fryer – salt accelerates breakdown." },
      { heading: "Fry in the right ratio & batches", body: "Keep roughly one part food to six parts oil, and fry in small batches so the temperature doesn't crash. Clear ice crystals before frying." },
      { heading: "Know when to change – and recycle", body: "Change the oil when it's dark, foaming or burnt-smelling. Then let us collect and recycle it – and pay you for it." },
    ],
    faqIds: ["when-change-oil", "palm-vs-sunflower"],
    moneyHref: "/frying-oil",
    moneyLabel: "Choose the right frying oil",
  },
  {
    slug: "when-to-change-fryer-oil",
    cluster: "frying",
    title: "When should you change your fryer oil?",
    metaTitle: "When to Change Fryer Oil in a Commercial Kitchen (South Africa) | Cuisine Foods",
    metaDescription:
      "How to tell when your fryer oil is spent – the visual and sensory signs, a quick oil-quality test, when to replace it, and how to handle the used oil safely.",
    excerpt: "Change oil on condition, not the calendar. Here's how to read the signs – and handle the spent oil safely.",
    updated: "2026-11-08",
    readMinutes: 5,
    intro:
      "Fryer oil doesn't fail on a fixed day – it fails on condition. Two kitchens running the same oil can be a week apart on when it's spent, because what you fry, how hot, and how well you look after it all change the pace. So the real skill isn't counting days; it's reading the oil. Here's how to tell when it's time, confirm it with a quick check, and turn the change-over into a clean, compliant routine.",
    sections: [
      { heading: "Visual and sensory warning signs", body: "Your eyes, nose and the food itself are the fastest test you have, and they cost nothing. Change the oil when it has darkened to a deep brown and no longer clears between batches, when it smells acrid or burnt rather than neutral, or when it foams and the foam doesn't subside and it smokes at your normal frying temperature. The food tells you too: items that come out greasy, limp, unevenly coloured or carrying a stale aftertaste are a sign the oil is past its best. Any one of these on its own is a yellow flag; two or more together means it should go." },
      { heading: "A quick oil-quality test", body: "Sensory checks are fast but subjective, and they drift as your team gets used to a fryer, so back them with an objective check. Commercial oil test strips and handheld TPM meters – TPM stands for total polar materials, the compounds that build up as oil breaks down – give a repeatable reading, so a shift manager makes the same call as the head chef. South Africa doesn't set a single figure that restaurants must test against, so the point isn't to chase a number: it's consistency. Pair a ten-second check with your sensory signs and your own food-quality standard, and the same decision gets made every shift, instead of good oil being dumped early or spent oil being pushed too far." },
      { heading: "Making the right replacement decision", body: "Once you know the signs, build a rhythm around them rather than waiting for a crisis. Oil type matters: palm olein is the most heat-stable of the common commercial oils and generally lasts longest, while sunflower and soya are excellent all-rounders that turn over a little faster in a hard-working fryer. What you fry matters just as much – breaded and battered foods, and anything salted over the vat, load the oil with debris and shorten its life. Above all, change before quality drops rather than after: heavily degraded oil is a food-safety issue as well as a food-quality one, and it can't be reused indefinitely." },
      { heading: "Handle the spent oil safely", body: "When the oil's done, how you handle it keeps your kitchen compliant. Let it cool before you touch it – hot oil is a burn risk and spatters – then decant it into sealed containers kept away from prep areas so it stays contained and clean. Never pour it down the drain: fats, oils and grease are prohibited in the sewer by municipal by-laws in cities including Johannesburg, Tshwane and Cape Town, and your kitchen carries a duty of care for the waste until it is handled properly." },
      { heading: "The easy part: we collect it", body: "The change-over is also a chance to claw back a little cost. Because used cooking oil is a biodiesel feedstock, a documented collector removes it, recycles it, and pays you per litre rather than charging to take it away. Cuisine Foods handles both sides of that change-over – fresh bulk oil in on your schedule, and compliant used-oil collection out – so the day you change your fryer is one call, not two." },
    ],
    faqIds: ["when-change-oil", "palm-vs-sunflower", "uco-recycle"],
    moneyHref: "/frying-oil",
    moneyLabel: "See our frying oils",
    sources: [
      { label: "Municipal fats, oils & grease (FOG) by-laws – City of Cape Town, City of Johannesburg and City of Tshwane wastewater/industrial-effluent by-laws" },
    ],
  },
  {
    slug: "reduce-commercial-cooking-oil-costs",
    cluster: "frying",
    title: "How to reduce commercial cooking-oil costs",
    metaTitle: "How to Reduce Commercial Cooking-Oil Costs (South Africa) | Cuisine Foods",
    metaDescription:
      "Lower what your kitchen spends on cooking oil – total operating cost over price per litre, less avoidable waste, smarter bulk buying, and paid used-oil collection.",
    excerpt: "The cheapest oil on the invoice is rarely the cheapest oil in practice. Here's where the real cost sits – and how to lower it.",
    updated: "2026-11-08",
    readMinutes: 5,
    intro:
      "Cooking oil is one of the few things a kitchen buys, heats for hours, and then throws away – which makes it an easy line to overspend on without noticing. The temptation is to treat it as a price-per-litre decision and buy whatever's cheapest. But the cheapest oil on the invoice is rarely the cheapest oil in practice. Here's where the real cost actually sits, and the levers a South African kitchen can pull to bring it down – without cutting corners on food.",
    sections: [
      { heading: "Watch total operating cost, not price per litre", body: "Price per litre is only the first number. The real cost of oil includes how fast you get through it, the labour in every change-over, the oil thrown away before it was spent, and what you recover when it's finally collected. A slightly more expensive, more stable oil that lasts longer and needs fewer changes can cost less per week of frying than a cheaper one that turns over quickly. Judge oil on cost over time, per week of trading – not on the invoice line alone." },
      { heading: "Replacement frequency is your biggest lever", body: "The single thing that moves your oil bill most is how often you replace it, so fewer, well-timed changes beat frequent, premature ones. Two habits do most of the work: choosing an oil suited to how you fry, and knowing exactly when a batch is genuinely spent rather than guessing. Palm olein, for example, is the most heat-stable of the common commercial oils and holds up best in all-day, high-volume fryers. For the day-to-day frying routine and how to read the end point, see our commercial frying guide and our guide to when to change your fryer oil – this article stays on the cost side." },
      { heading: "Cut the oil you waste without realising", body: "A lot of oil cost is avoidable waste rather than genuine consumption. The usual culprits are dumping oil before it's spent by changing on a fixed day instead of on condition; letting water or debris into fresh or used oil so it degrades or can't be collected cleanly; spillage and over-filling fryers above the line; and using a short-life oil in a fryer that runs all day. None of these need new equipment to fix – just a tighter routine." },
      { heading: "Buy and stock like it's a planned cost", body: "Emergency top-ups at retail prices are one of the quietest drains on an oil budget. Reliable bulk supply removes that: the right pack sizes for your throughput, delivered on a schedule you set, so you're never caught short and buying small. Cuisine Foods supplies bulk cooking oil from 20L with no strict minimum, on a daily, weekly or monthly rhythm – which makes oil a line you can plan and forecast, not react to." },
      { heading: "Recover value on the way out", body: "Oil cost has two ends, and most kitchens only manage the buying end. When a batch is finally spent, it isn't just waste to pay someone to remove – used cooking oil is a biodiesel feedstock, and a documented collector pays you per litre for it. That recovered value comes straight off the true cost of the fresh oil you buy. Cuisine Foods runs compliant used-oil collection alongside supply – one partner for both ends of the cost line." },
    ],
    faqIds: ["bulk-pricing", "min-order", "uco-pay-rate"],
    moneyHref: "/bulk-cooking-oil-supply",
    moneyLabel: "Order bulk cooking oil",
  },
];

export const clusters = {
  uco: {
    slug: "used-cooking-oil",
    title: "Used Cooking Oil Hub",
    metaTitle: "Used Cooking Oil Guide for SA Kitchens | Cuisine Foods",
    metaDescription:
      "Everything South African kitchens need on used cooking oil – disposal, pricing per litre, compliance, recycling into biodiesel and more.",
    intro: "The most useful place in South Africa to understand used cooking oil – how to dispose of it legally, what it's worth, and how it's recycled.",
    moneyHref: "/used-cooking-oil-collection",
  },
  frying: {
    slug: "frying",
    title: "Frying & Cooking Oil",
    metaTitle: "Commercial Frying & Cooking Oil Guides | Cuisine Foods",
    metaDescription: "Practical guides on choosing and getting the most from commercial cooking oil – frying best-practice, oil comparisons and cost.",
    intro: "Practical guidance for professional kitchens on choosing the right oil and getting the longest, cleanest fry-life.",
    moneyHref: "/bulk-cooking-oil-supply",
  },
} as const;

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const articlesInCluster = (c: "uco" | "frying") => articles.filter((a) => a.cluster === c);
