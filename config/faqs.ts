/** FAQ BANK – keyed Q&A reused across pages and emitted as FAQPage schema. */

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
    q: "How does pricing work – are there hidden costs?",
    a: "Pricing is quote-based on your product and monthly volume, with no hidden costs. Send us your requirement and we'll return a competitive written quote quickly.",
  },
  "product-packaging": {
    id: "product-packaging",
    q: "What pack sizes do you supply?",
    a: "We supply in bulk from 20L containers. Need larger formats for a production line? Ask and we'll quote for it.",
  },
  "palm-vs-sunflower": {
    id: "palm-vs-sunflower",
    q: "Palm olein or sunflower – which is better for frying?",
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
    a: "We pay you for the used oil we collect, with the rate depending on the volume you produce and the quality of the oil. Larger, cleaner volumes earn more – ask us for today's rate for your kitchen.",
  },
  "uco-free-drums": {
    id: "uco-free-drums",
    q: "Do you provide containers for the used oil?",
    a: "Yes – we supply clean, sealed drums so your used oil is stored safely between collections.",
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
    q: "Do you provide collection documentation?",
    a: "Yes. After each collection we provide documentation of how your used oil was handled, to keep on file for health inspections and your duty-of-care obligations.",
  },
  "uco-legal": {
    id: "uco-legal",
    q: "Is it illegal to pour used cooking oil down the drain?",
    a: "Yes. South African municipalities prohibit fats, oils and grease entering the sewer, and illegal dumping can bring penalties. Arranging scheduled collection and keeping the documentation is the correct route.",
  },
  "grease-frequency": {
    id: "grease-frequency",
    q: "How often should a grease trap be cleaned?",
    a: "Most commercial kitchens need cleaning roughly every 30 days – more often for busy, high-volume fryers. We'll set a schedule to match your kitchen.",
  },
  "uco-recycle": {
    id: "uco-recycle",
    q: "What happens to the used oil you collect?",
    a: "It's filtered, cleaned and converted into renewable biodiesel and oleochemicals – never routed back into the food chain.",
  },
  // General homepage FAQs
  "do-both": {
    id: "do-both",
    q: "Do you both supply fresh oil and collect used oil?",
    a: "Yes. Cuisine Foods supplies fresh commercial cooking oil and collects used cooking oil, so you have one relationship for both sides of your oil operation – the oil going in and the oil coming out, on one account.",
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
    a: "Palm olein is the liquid fraction of palm oil, separated by fractionation. It is the most heat-stable of the common commercial frying oils, prized for long fry-life and consistent performance at high temperatures – which is why high-volume kitchens use it to lower their total oil cost.",
  },
  "best-frying-oil": {
    id: "best-frying-oil",
    q: "What is the best oil for commercial deep frying?",
    a: "For high-volume frying, palm olein gives the best heat stability and the longest fry-life. Sunflower is the most versatile all-rounder with a clean flavour. Soya is a cost-effective choice for high-volume kitchens. The right pick depends on how hard and how often you fry – we help you choose.",
  },
  "uco-worth": {
    id: "uco-worth",
    q: "How much is used cooking oil worth in South Africa?",
    a: "Used cooking oil is bought as a biodiesel feedstock, so collectors pay you per litre rather than charging to remove it. The rate depends on your volume, the oil's quality and your region – larger, cleaner volumes earn more. Ask us for today's rate for your kitchen.",
  },
  "uco-hazardous": {
    id: "uco-hazardous",
    q: "Is used cooking oil regulated or hazardous waste in South Africa?",
    a: "Used cooking oil is regulated waste under the National Environmental Management: Waste Act (Act 59 of 2008). It should be collected and documented rather than dumped; pouring it down the drain is prohibited by municipal fats-oils-and-grease (FOG) by-laws and can bring penalties. We collect it responsibly and provide the documentation.",
  },
  "sawis-register": {
    id: "sawis-register",
    q: "Do I need to register on SAWIS for used cooking oil?",
    a: "Under the Waste Act, generators above the thresholds for used oil may need to register on the South African Waste Information System (SAWIS) and report periodically – whether it applies depends on your volumes, so check with your local authority. Using a collector that documents every collection is how you keep that record either way.",
  },
  "uco-how-much-restaurant": {
    id: "uco-how-much-restaurant",
    q: "How much used cooking oil does a restaurant produce?",
    a: "It varies with fryer count and menu, but a single-fryer takeaway typically produces around 20–60 litres a week, while a busy multi-fryer restaurant can generate several hundred litres a month. Tell us your setup and we'll estimate your monthly rebate.",
  },
  "grease-why": {
    id: "grease-why",
    q: "Why does a commercial kitchen need a grease trap?",
    a: "South African municipal by-laws require food premises to fit and maintain a grease trap so that fats, oils and grease (FOG) don't enter the sewer and cause blockages. A neglected trap brings odours, slow drains, pests and failed inspections – regular servicing keeps your kitchen hygienic and on the right side of the by-law.",
  },
  "grease-included": {
    id: "grease-included",
    q: "Can grease-trap cleaning be combined with used-oil collection?",
    a: "Yes. We can service your grease trap on the same relationship as your used-oil collection and fresh-oil supply, so it's one point of contact for a compliant kitchen. Tell us your setup and we'll match a servicing schedule to how hard your kitchen works.",
  },
  "reporting-includes": {
    id: "reporting-includes",
    q: "What does used-oil reporting include for a group?",
    a: "For multi-site operators we bring the collection documentation from each store together for head office, so you have one view of how used oil is handled across the group rather than a loose end at every site. The exact format we consolidate records in is confirmed when we set the account up.",
  },

  // --- Homepage company/commercial overview ---
  "oils-supplied": {
    id: "oils-supplied",
    q: "What cooking oils do you supply?",
    a: "Bulk sunflower oil, palm olein, soya oil and all-purpose cooking/frying oil – supplied from 20L containers up to larger formats for high-volume commercial kitchens.",
  },
  "supply-nationwide": {
    id: "supply-nationwide",
    q: "Do you supply cooking oil across South Africa?",
    a: "Yes. Cuisine Foods supplies commercial cooking oil to businesses across South Africa, delivered through our regional hubs, with scheduled delivery routes for professional kitchens.",
  },
  "who-supplied": {
    id: "who-supplied",
    q: "What kinds of businesses do you supply?",
    a: "Restaurants, hotels, caterers, franchises, food manufacturers and other commercial kitchens – from single sites to multi-site groups that need one account across every location.",
  },

  // --- Per-product supply FAQs (answer-engine friendly, tailored) ---
  "supply-sunflower": {
    id: "supply-sunflower",
    q: "Do you supply sunflower oil to businesses?",
    a: "Yes. Cuisine Foods supplies 100% pure bulk sunflower oil to restaurants, caterers, food manufacturers and other commercial kitchens – from 20L with no strict minimum, with nationwide delivery from our regional hubs.",
  },
  "supply-palm": {
    id: "supply-palm",
    q: "Do you supply palm olein to commercial kitchens?",
    a: "Yes. We supply RBD palm olein in bulk for high-volume commercial frying – prized for its heat stability and long fry-life – from 20L, delivered nationwide.",
  },
  "supply-soya": {
    id: "supply-soya",
    q: "Do you supply soya oil in bulk?",
    a: "Yes. We supply refined bulk soya oil to food manufacturers, caterers and high-volume kitchens – neutral in flavour and cost-effective at volume, with nationwide delivery.",
  },

  // --- Buyer-segment FAQs (answer-engine friendly, one per industry) ---
  "supply-restaurants": {
    id: "supply-restaurants",
    q: "Does Cuisine Foods supply cooking oil to restaurants?",
    a: "Yes. We supply restaurants with bulk sunflower, palm olein and soya on a delivery schedule that fits your service, and we collect and pay for your used oil too – from 20L, with no strict minimum.",
  },
  "supply-hotels": {
    id: "supply-hotels",
    q: "Can Cuisine Foods supply a hotel's kitchens?",
    a: "Yes. We supply bulk cooking oil across a hotel's outlets – restaurants, banqueting and service kitchens – on one account, and collect the used oil with documentation for your compliance file.",
  },
  "supply-caterers": {
    id: "supply-caterers",
    q: "Does Cuisine Foods supply catering businesses?",
    a: "Yes. We supply caterers with flexible bulk oil quoted to your event calendar, in 20L with no strict minimum, and collect the used oil afterwards.",
  },
  "supply-manufacturers": {
    id: "supply-manufacturers",
    q: "Can food manufacturers buy bulk oil from Cuisine Foods?",
    a: "Yes. We supply consistent bulk sunflower, soya and palm olein for production, in 20L up to larger formats, and we can take the used and residue oil off your line. Tell us your requirement and we'll quote.",
  },
  "supply-franchises": {
    id: "supply-franchises",
    q: "Can Cuisine Foods supply a franchise group?",
    a: "Yes. We can supply every outlet, collect the used oil, and bring the documentation together for head office – one supply and collection relationship across the group rather than one per site.",
  },
};

export const getFaqs = (ids: string[]): Faq[] => ids.map((id) => faqs[id]).filter(Boolean);
