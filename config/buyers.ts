/** BUYER-SEGMENT PAGES — one real purchasing situation per URL (who is buying),
 *  rendered by views/buyer-view.tsx. Differentiated by operational context, oil
 *  routing and which blocks apply — not the same template with the noun swapped. */
import type { MoneyPage } from "@/config/types";
import { cta } from "@/config/conversion";

const ucoCrossSell = {
  label: "We also collect your used oil – and pay you for it",
  href: "/used-cooking-oil-collection",
  blurb: "One partner for the oil in and the oil out. Scheduled collection with a rebate for eligible oil.",
};

const base = {
  kind: "buyer" as const,
  intent: "supply" as const,
  imageId: "supply-pillar",
  eyebrow: "Bulk Cooking Oil Supply",
  crossSell: ucoCrossSell,
  primaryCtaLabel: cta.supplyQuote,
  national: true,
  ppcReady: true,
};

export const buyers: MoneyPage[] = [
  {
    ...base,
    imageId: "social-kitchen",
    slug: "cooking-oil-for-restaurants",
    h1: "Cooking Oil for Restaurants",
    subhead: "Reliable bulk oil supply that keeps your kitchen frying.",
    metaTitle: "Cooking Oil Supplier for Restaurants | Bulk Delivery | Cuisine Foods",
    metaDescription:
      "Bulk cooking oil for restaurants – sunflower, palm olein & soya – with nationwide delivery, plus used-oil collection and a rebate. Get a quote.",
    operational:
      "A restaurant kitchen can't stop because the oil ran out mid-service. You need a supplier who keeps the fryers fed on a rhythm that matches your covers – and who takes the used oil off your hands when it's spent.",
    intro:
      "We keep restaurants supplied with consistent, quality bulk oil on a delivery schedule that fits your service – and we collect and pay for your used oil too.",
    keyPoints: [
      { icon: "truck", title: "Never run dry", body: "Daily, weekly or monthly delivery that matches how you fry." },
      { icon: "droplet", title: "Consistent quality", body: "The same clean oil every time, so your food tastes the same every service." },
      { icon: "banknote", title: "A rebate on used oil", body: "We buy back your used oil – lowering your real cost per litre." },
    ],
    oilGuidance: [
      { label: "Sunflower oil", href: "/sunflower-oil", when: "One clean, versatile oil for a varied menu – frying, baking and cooking." },
      { label: "Palm olein", href: "/palm-olein", when: "For a hard-working fryer that runs all service – heat-stable, long fry-life." },
      { label: "Not sure?", href: "/frying-oil", when: "Compare the oils for your fryer in the frying guide." },
    ],
    sections: [
      { heading: "Lower your true cost per litre", body: "Because we buy back your used oil, your real cost per litre drops – you're not just buying oil, you're recovering value from it. Ask us to work the numbers against your fry volume.", answers: "value: closed-loop cost" },
      { heading: "Switching is easy", body: "Get a quote and we'll get you set up quickly, with no lock-in.", answers: "objection: switching inertia" },
    ],
    multiSite: { title: "Growing to a second site?", body: "If you run more than one restaurant, we can put supply and collection for every site on one account – talk to us about it." },
    ucoAngle: { title: "Your used oil is worth money", body: "We drop sealed drums, collect on your schedule and pay you for the used oil – so disposal becomes a small rebate instead of a cost or a compliance headache." },
    faqIds: ["supply-restaurants", "min-order", "bulk-pricing", "do-both", "how-start"],
    relatedSlugs: ["cooking-oil-for-caterers", "cooking-oil-for-franchises"],
    quoteTopic: "restaurants",
  },
  {
    ...base,
    imageId: "buyer-hotels",
    slug: "cooking-oil-for-hotels",
    h1: "Cooking Oil for Hotels",
    subhead: "Consistent supply and documented used-oil collection across every outlet.",
    metaTitle: "Cooking Oil Supplier for Hotels | Cuisine Foods",
    metaDescription:
      "Reliable bulk cooking oil and documented used-oil collection for hotels – across restaurants, banqueting and service kitchens, with nationwide delivery. Get a quote.",
    operational:
      "A hotel isn't one kitchen – it's several. Restaurants, banqueting, breakfast service and staff canteens all draw on oil, and all generate used oil that has to be handled to standard. Procurement wants one dependable supplier, not one per outlet.",
    intro:
      "We supply consistent bulk oil across all of a property's food-service outlets and collect the used oil with the documentation your standards require – on one account.",
    keyPoints: [
      { icon: "hotel", title: "Every outlet supplied", body: "One account across restaurants, banqueting and staff canteens." },
      { icon: "file-check", title: "Documented collection", body: "A collection record for your compliance file, property-wide." },
      { icon: "clock", title: "Dependable delivery", body: "Scheduled supply so no outlet runs short." },
    ],
    oilGuidance: [
      { label: "Sunflower oil", href: "/sunflower-oil", when: "A clean, versatile default across à la carte, breakfast and banqueting." },
      { label: "Palm olein", href: "/palm-olein", when: "For high-volume fryers in a busy service kitchen." },
    ],
    sections: [
      { heading: "Consistency your guests can taste", body: "Across restaurants, banqueting and room service, the same clean oil means the same result on every plate – and one documentation file covering the whole property.", answers: "value: multi-outlet consistency" },
      { heading: "One account, one point of contact", body: "Tell us your outlets and volumes and we'll structure supply, collection and a single point of contact.", answers: "objection: coordination" },
    ],
    multiSite: { title: "One property or a group", body: "Whether it's a single property with several outlets or a hotel group, we can run supply and collection across all of it on one arrangement – discuss it with us.", href: "/locations", linkLabel: "See our coverage" },
    ucoAngle: { title: "Used oil, handled to standard", body: "Every outlet's used oil collected on schedule with documentation for your compliance file – no outlet left arranging its own disposal." },
    faqIds: ["supply-hotels", "min-order", "uco-certificate", "do-both", "how-start"],
    relatedSlugs: ["cooking-oil-for-caterers", "cooking-oil-for-restaurants"],
    quoteTopic: "hotels",
  },
  {
    ...base,
    imageId: "buyer-caterers",
    slug: "cooking-oil-for-caterers",
    h1: "Cooking Oil for Caterers",
    subhead: "Bulk oil that flexes with your event calendar.",
    metaTitle: "Wholesale Cooking Oil for Caterers | Cuisine Foods",
    metaDescription:
      "Flexible bulk cooking oil for caterers – sunflower, palm olein & soya in 20L, no strict minimum, nationwide delivery. Plus used-oil collection. Get a quote.",
    operational:
      "Catering volumes swing with the calendar – a quiet fortnight, then a wedding season. You don't want to be locked into a fixed order you'll waste, or scrambling for oil the week of a big function. You want supply that plans around your dates.",
    intro:
      "We supply flexible bulk oil to your calendar, in 20L with no strict minimum, and collect the used oil afterwards – and pay you for it.",
    keyPoints: [
      { icon: "utensils", title: "Flexible volumes", body: "Scale up for a big event, back down after – no rigid minimums." },
      { icon: "truck", title: "Planned to your dates", body: "Tell us the calendar and we'll supply to your event schedule." },
      { icon: "banknote", title: "Paid for used oil", body: "We collect and pay for the oil once the event's done." },
    ],
    oilGuidance: [
      { label: "Sunflower oil", href: "/sunflower-oil", when: "The versatile all-rounder when the menu changes every event." },
      { label: "Palm olein", href: "/palm-olein", when: "For high-volume deep frying at a big function." },
    ],
    sections: [
      { heading: "No event too big or small", body: "From a single function to a full season of contracts, we quote to the calendar – 20L with no strict minimum means you're never over-ordering for a quiet week or scrambling before a busy one.", answers: "value: flexible volume" },
      { heading: "Ad-hoc or recurring", body: "Whether it's a one-off function or weekly contracts, we'll quote to fit.", answers: "objection: flexibility" },
    ],
    ucoAngle: { title: "Collection after the event", body: "When the function's done, we collect the used oil and pay you for it – so clean-up doesn't end with a disposal problem." },
    faqIds: ["supply-caterers", "min-order", "bulk-pricing", "do-both", "how-start"],
    relatedSlugs: ["cooking-oil-for-restaurants", "cooking-oil-for-hotels"],
    quoteTopic: "caterers",
  },
  {
    ...base,
    imageId: "buyer-manufacturers",
    slug: "cooking-oil-for-food-manufacturers",
    h1: "Cooking Oil for Food Manufacturers",
    subhead: "Consistent-spec bulk oil for production lines.",
    metaTitle: "Bulk Cooking Oil for Food Manufacturers | Cuisine Foods",
    metaDescription:
      "Consistent bulk sunflower, soya & palm oil for food manufacturers – reliable volume supply with nationwide delivery, and used-oil offtake. Request a spec & quote.",
    operational:
      "A production line can't tolerate a variable input or an unreliable delivery. You need consistent oil, in the volume and format your process runs on, from a supplier you can plan production around – and a compliant route for the oil that leaves the line.",
    intro:
      "We supply consistent bulk oil – sunflower, soya and palm olein – with the reliability and formats a manufacturing line needs, and we take the used and residue oil off your hands.",
    keyPoints: [
      { icon: "factory", title: "Consistent supply", body: "The same oil, delivery after delivery, for predictable production." },
      { icon: "scale", title: "Volume & formats", body: "From 20L to larger formats – tell us your line's requirement." },
      { icon: "recycle", title: "Used-oil offtake", body: "We collect and recycle your used and residue oil, responsibly." },
    ],
    oilGuidance: [
      { label: "Soya oil", href: "/soya-oil", when: "A cost-effective, neutral oil widely used across food production." },
      { label: "Sunflower oil", href: "/sunflower-oil", when: "A clean, versatile input for a range of products." },
      { label: "Palm olein", href: "/palm-olein", when: "For high-volume frying lines that need heat stability." },
    ],
    sections: [
      { heading: "Supply in, used oil out", body: "Consistent input on the way in, and collection of your used and residue oil with documentation on the way out – the paper trail your quality and environmental systems expect.", answers: "value: documentation / compliance" },
      { heading: "Tell us what your line needs", body: "If your process needs a specification, larger formats or particular delivery terms, request them and we'll tell you honestly what we can supply and quote accordingly.", answers: "objection: spec / procurement" },
    ],
    multiSite: { title: "More than one plant?", body: "Running multiple production sites? We can put supply and used-oil offtake across them on one arrangement – discuss it with us." },
    ucoAngle: { title: "Compliant used-oil offtake", body: "The used and residue oil from your line collected and sent for recovery, with documentation for your environmental records." },
    faqIds: ["supply-manufacturers", "product-packaging", "bulk-pricing", "do-both", "how-start"],
    relatedSlugs: ["soya-oil", "cooking-oil-for-franchises"],
    quoteTopic: "food-manufacturers",
  },
  {
    ...base,
    imageId: "buyer-franchises",
    slug: "cooking-oil-for-franchises",
    h1: "Cooking Oil for Franchise Groups",
    subhead: "One supply and collection relationship across every site.",
    metaTitle: "Cooking Oil Supplier for Franchise Groups | Cuisine Foods",
    metaDescription:
      "Bulk oil supply and used-oil collection for franchise groups & fast-food chains – one relationship across every site, documentation per store, nationwide delivery. Enquire.",
    operational:
      "Across a franchise group, every outlet sourcing its own oil and arranging its own disposal means inconsistent supply, scattered admin and patchy compliance. Head office wants one relationship that covers supply and used-oil collection for every site.",
    intro:
      "We supply every outlet, collect the used oil, and bring the documentation together for head office. That's the closed loop we run – one relationship instead of one per store.",
    keyPoints: [
      { icon: "store", title: "Every outlet supplied", body: "Consistent bulk oil across all sites, on one arrangement." },
      { icon: "file-check", title: "Documented collection", body: "A collection record per store, brought together for head office." },
      { icon: "scale", title: "One relationship", body: "Supply and collection for the whole group, not a different handler per site." },
    ],
    oilGuidance: [
      { label: "Palm olein", href: "/palm-olein", when: "The workhorse for QSR and high-volume franchise fryers." },
      { label: "Sunflower oil", href: "/sunflower-oil", when: "A versatile standard where menus vary across brands." },
    ],
    sections: [
      { heading: "One partner for every site", body: "Instead of each outlet sourcing its own oil and arranging its own disposal, head office gets one supplier and one collection partner, with the documentation from each store brought together – less admin and cleaner compliance, with group pricing we'll quote to your footprint.", answers: "value: centralised group management" },
      { heading: "Roll it out group-wide", body: "Talk to us about a group rollout – supply and collection across every site under one arrangement.", answers: "segment: franchise HQ" },
    ],
    multiSite: { title: "Reporting across the group", body: "We bring the collection documentation from each store together for head office, so used oil is one view across the group rather than a loose end at every site.", href: "/uco-compliance-reporting", linkLabel: "How group reporting works" },
    ucoAngle: { title: "Used-oil collection, every store", body: "Each outlet's used oil collected on schedule with documentation – consolidated for head office, so compliance is managed, not chased." },
    faqIds: ["supply-franchises", "min-order", "uco-certificate", "do-both", "how-start"],
    relatedSlugs: ["uco-compliance-reporting", "cooking-oil-for-hotels"],
    quoteTopic: "franchises",
  },
];

export const getBuyer = (slug: string) => buyers.find((b) => b.slug === slug);
