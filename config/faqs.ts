/** FAQ BANK — keyed Q&A reused across pages and emitted as FAQPage schema. */

export type Faq = { id: string; q: string; a: string };

export const faqs: Record<string, Faq> = {
  "min-order": {
    id: "min-order",
    q: "Is there a minimum order for bulk cooking oil?",
    a: "We supply from 20L containers with no strict minimum, though our best pricing is for regular bulk buyers. Tell us your monthly volume and we'll quote accordingly.",
  },
  "delivery-areas": {
    id: "delivery-areas",
    q: "Which areas do you deliver to?",
    a: "We operate from branches in Gauteng (Centurion) and the Western Cape (Cape Town), serving restaurants, hotels, caterers and manufacturers across both provinces, with nationwide delivery available. Tell us your location and we'll confirm coverage.",
  },
  "bulk-pricing": {
    id: "bulk-pricing",
    q: "How does pricing work — are there hidden costs?",
    a: "Pricing is quote-based on your product and monthly volume, with no hidden costs. Send us your requirement and we'll return a competitive written quote quickly.",
  },
  "product-packaging": {
    id: "product-packaging",
    q: "What pack sizes do you supply?",
    a: "We supply in bulk from 20L containers. Need larger formats for a production line? Ask and we'll quote for it.",
  },
  "palm-vs-sunflower": {
    id: "palm-vs-sunflower",
    q: "Palm olein or sunflower — which is better for frying?",
    a: "Palm olein is the most heat-stable with the longest fry-life, ideal for high-volume commercial fryers. Sunflower is more versatile with a clean flavour when you fry, bake and cook on one oil. We'll help you choose.",
  },
  "when-change-oil": {
    id: "when-change-oil",
    q: "When should I change my fryer oil?",
    a: "Change it when the oil turns dark, foams excessively or smells burnt. Keeping the fryer clean, filtering daily and frying at 160–190°C all extend its life.",
  },
  "uco-pay-rate": {
    id: "uco-pay-rate",
    q: "How much do you pay for used cooking oil?",
    a: "We pay per litre, with the rate depending on the volume you produce and the quality of the oil. Larger, cleaner volumes earn more — ask us for today's rate for your kitchen.",
  },
  "uco-free-drums": {
    id: "uco-free-drums",
    q: "Do you provide containers for the used oil?",
    a: "Yes — we supply clean, sealed drums so your used oil is stored safely between collections.",
  },
  "uco-schedule": {
    id: "uco-schedule",
    q: "How often will you collect?",
    a: "Weekly, monthly or a custom schedule that suits your kitchen. We'll set a rhythm that keeps your storage from overflowing.",
  },
  "uco-min-volume": {
    id: "uco-min-volume",
    q: "Is there a minimum volume for used-oil collection?",
    a: "We collect from kitchens of all sizes. The rate we can pay scales with volume, so tell us roughly how many litres you produce a week and we'll confirm the arrangement.",
  },
  "uco-certificate": {
    id: "uco-certificate",
    q: "Do you provide a safe-disposal certificate?",
    a: "We collect as a licensed handler and provide documentation of compliant disposal to keep on file for health inspections and your duty-of-care obligations.",
  },
  "uco-legal": {
    id: "uco-legal",
    q: "Is it illegal to pour used cooking oil down the drain?",
    a: "Yes. South African municipalities prohibit fats, oils and grease entering the sewer, and illegal dumping can bring fines or closure. Compliant collection by a licensed handler is the correct route.",
  },
  "grease-frequency": {
    id: "grease-frequency",
    q: "How often should a grease trap be cleaned?",
    a: "Most commercial kitchens need cleaning roughly every 30 days — more often for busy, high-volume fryers. We'll set a schedule to match your kitchen.",
  },
  "uco-recycle": {
    id: "uco-recycle",
    q: "What happens to the used oil you collect?",
    a: "It's filtered, cleaned and converted into renewable biodiesel and oleochemicals — never routed back into the food chain.",
  },
  // General homepage FAQs
  "do-both": {
    id: "do-both",
    q: "Do you both supply fresh oil and collect used oil?",
    a: "Yes — that's our advantage. We're one of the few partners who supply your fresh cooking oil and collect your used oil, so you deal with one company for the oil going in and the oil coming out.",
  },
  "how-start": {
    id: "how-start",
    q: "How do I get started?",
    a: "Request a quote or message us on WhatsApp with your business type, area and volume. We'll come back quickly with pricing and can usually arrange your first delivery or collection within the week.",
  },

  // --- High-intent / AI-Overview FAQs (answer-first, sourced) ---
  "what-is-palm-olein": {
    id: "what-is-palm-olein",
    q: "What is palm olein?",
    a: "Palm olein is the liquid fraction of palm oil, separated by fractionation. It is the most heat-stable of the common commercial frying oils, prized for long fry-life and consistent performance at high temperatures — which is why high-volume kitchens use it to lower their total oil cost.",
  },
  "best-frying-oil": {
    id: "best-frying-oil",
    q: "What is the best oil for commercial deep frying?",
    a: "For high-volume frying, palm olein gives the best heat stability and the longest fry-life. Sunflower is the most versatile all-rounder with a clean flavour. Soya is a cost-effective choice for high-volume kitchens. The right pick depends on how hard and how often you fry — we help you choose.",
  },
  "uco-worth": {
    id: "uco-worth",
    q: "How much is used cooking oil worth in South Africa?",
    a: "Used cooking oil is bought as a biodiesel feedstock, so collectors pay you per litre rather than charging to remove it. The rate depends on your volume, the oil's quality and your region — larger, cleaner volumes earn more. Ask us for today's rate for your kitchen.",
  },
  "uco-hazardous": {
    id: "uco-hazardous",
    q: "Is used cooking oil regulated or hazardous waste in South Africa?",
    a: "Used cooking oil is regulated waste under the National Environmental Management: Waste Act (Act 59 of 2008). It must be handled by a licensed collector and documented; pouring it down the drain is prohibited by municipal fats-oils-and-grease (FOG) by-laws and can bring fines. We collect it compliantly and provide the documentation.",
  },
  "sawis-register": {
    id: "sawis-register",
    q: "Do I need to register on SAWIS for used cooking oil?",
    a: "Under the Waste Act, generators producing used oil from roughly 20 kg per day must register on the South African Waste Information System (SAWIS) and report periodically. Using a licensed collector who documents every collection is how you keep that record and stay compliant.",
  },
  "uco-how-much-restaurant": {
    id: "uco-how-much-restaurant",
    q: "How much used cooking oil does a restaurant produce?",
    a: "It varies with fryer count and menu, but a single-fryer takeaway typically produces around 20–60 litres a week, while a busy multi-fryer restaurant can generate several hundred litres a month. Tell us your setup and we'll estimate your monthly rebate.",
  },
};

export const getFaqs = (ids: string[]): Faq[] => ids.map((id) => faqs[id]).filter(Boolean);
