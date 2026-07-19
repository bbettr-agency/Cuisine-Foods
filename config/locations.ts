/**
 * LOCATIONS — province pillars + metro children.
 * Anti-doorway (OS P11): each metro carries genuinely unique local content —
 * real suburbs/nodes, local logistics, local customer clusters, and that
 * municipality's actual used-oil/FOG regulation note. No find-and-replace clones.
 */

export type Metro = {
  slug: string;
  provinceSlug: "gauteng" | "western-cape";
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  suburbs: string[];
  localLogistics: string;
  customerClusters: string;
  complianceNote: string; // municipality-specific — the anti-doorway signal
  faqIds: string[];
  imageId?: string; // its own local visual story (never the same photo twice)
};

export type Province = {
  slug: "gauteng" | "western-cape";
  name: string;
  branchId: "gauteng" | "western-cape";
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  imageId: string;
  metros: string[]; // metro slugs
};

export const provinces: Province[] = [
  {
    slug: "gauteng",
    name: "Gauteng",
    branchId: "gauteng",
    h1: "Cooking Oil Supply & Used-Oil Collection in Gauteng",
    metaTitle: "Bulk Cooking Oil Supplier Gauteng | UCO Collection | Cuisine Foods",
    metaDescription:
      "Bulk cooking oil supply and used cooking oil collection across Gauteng — Johannesburg, Pretoria & Centurion. Local branch in Centurion. Get a quote.",
    intro:
      "From our Centurion branch we supply bulk cooking oil and collect used cooking oil across Gauteng — Johannesburg, Pretoria, Centurion, the East and West Rand. Fresh oil delivered on schedule, used oil collected and paid for, all compliant.",
    imageId: "location-gauteng",
    metros: ["johannesburg", "pretoria"],
  },
  {
    slug: "western-cape",
    name: "Western Cape",
    branchId: "western-cape",
    h1: "Cooking Oil Supply & Used-Oil Collection in the Western Cape",
    metaTitle: "Bulk Cooking Oil Supplier Cape Town | UCO Collection | Cuisine Foods",
    metaDescription:
      "Bulk cooking oil supply and used cooking oil collection across the Western Cape — Cape Town & the Northern Suburbs. Local branch in Montague Gardens. Get a quote.",
    intro:
      "From our Montague Gardens branch we supply bulk cooking oil and collect used cooking oil across the Western Cape — Cape Town, the Northern and Southern Suburbs, and the Winelands. One local partner for the oil in and the oil out.",
    imageId: "location-western-cape",
    metros: ["cape-town", "northern-suburbs"],
  },
];

export const metros: Metro[] = [
  {
    slug: "johannesburg",
    imageId: "metro-johannesburg",
    provinceSlug: "gauteng",
    name: "Johannesburg",
    h1: "Cooking Oil Supply & UCO Collection in Johannesburg",
    metaTitle: "Cooking Oil Supplier Johannesburg | UCO Collection | Cuisine Foods",
    metaDescription:
      "Bulk cooking oil delivery and used cooking oil collection across Johannesburg — Sandton, Midrand, Soweto, the East & West Rand. Get a quote or arrange collection.",
    intro:
      "Johannesburg's kitchens fry hard, and they need a supplier who keeps up. We deliver bulk sunflower, palm olein and soya across the city and collect your used oil for cash.",
    suburbs: ["Sandton", "Midrand", "Randburg", "Roodepoort", "Soweto", "the East Rand", "the West Rand"],
    localLogistics:
      "Scheduled delivery and collection routes run across the greater Johannesburg metro, from Sandton and Midrand through to Soweto and the East Rand, on daily, weekly or monthly cycles.",
    customerClusters:
      "We supply Sandton hotels and corporate caterers, Soweto shisanyama and takeaways, and the high-volume QSR outlets and food manufacturers spread across the city's industrial nodes.",
    complianceNote:
      "Johannesburg Water's by-laws prohibit fats, oils and grease entering the sewer and require food businesses to manage grease traps — our collection keeps you documented and compliant.",
    faqIds: ["delivery-areas", "uco-pay-rate", "uco-certificate", "min-order"],
  },
  {
    slug: "pretoria",
    imageId: "metro-pretoria",
    provinceSlug: "gauteng",
    name: "Pretoria & Centurion",
    h1: "Cooking Oil Supply & UCO Collection in Pretoria & Centurion",
    metaTitle: "Cooking Oil Supplier Pretoria & Centurion | Cuisine Foods",
    metaDescription:
      "Local bulk cooking oil supply and used cooking oil collection in Pretoria & Centurion — our Gauteng home base. Fast delivery and collection. Get a quote.",
    intro:
      "Centurion is our Gauteng home, so Pretoria and Centurion kitchens get our fastest, most local service — bulk oil delivered and used oil collected, often same-week.",
    suburbs: ["Centurion", "Pretoria East", "Hatfield", "Menlyn", "Montana", "Rosslyn", "Sunderland Ridge"],
    localLogistics:
      "With our branch in Sunderland Ridge, Centurion, we run tight local routes across Pretoria and Centurion — short lead times on both delivery and collection.",
    customerClusters:
      "We serve Pretoria East and Menlyn restaurants, Hatfield student-strip takeaways, corporate canteens in the capital, and manufacturers around Rosslyn and Sunderland Ridge.",
    complianceNote:
      "City of Tshwane wastewater by-laws restrict fats, oils and grease to the sewer and expect proper grease-trap management — our documented collection keeps your kitchen compliant.",
    faqIds: ["delivery-areas", "uco-pay-rate", "uco-certificate", "min-order"],
  },
  {
    slug: "cape-town",
    imageId: "metro-cape-town",
    provinceSlug: "western-cape",
    name: "Cape Town",
    h1: "Cooking Oil Supply & UCO Collection in Cape Town",
    metaTitle: "Cooking Oil Supplier Cape Town | UCO Collection | Cuisine Foods",
    metaDescription:
      "Bulk cooking oil delivery and used cooking oil collection across Cape Town — CBD, Atlantic Seaboard, Southern Suburbs. Local branch in Montague Gardens. Get a quote.",
    intro:
      "Cape Town's restaurants demand consistency and Cape Town's by-laws demand compliance — we deliver both. Bulk oil across the metro, used oil collected and recycled the right way.",
    suburbs: ["the CBD", "Atlantic Seaboard", "Southern Suburbs", "Woodstock", "Salt River", "Montague Gardens", "Milnerton"],
    localLogistics:
      "From our Montague Gardens branch we run delivery and collection across the Cape Town metro — the CBD and Atlantic Seaboard restaurant strip, the Southern Suburbs, and the Montague Gardens/Milnerton industrial belt.",
    customerClusters:
      "We supply Atlantic Seaboard and CBD restaurants, V&A and Southern Suburbs hospitality, and the food manufacturers clustered around Montague Gardens and Epping.",
    complianceNote:
      "The City of Cape Town enforces strict Wastewater and Industrial Effluent by-laws on fats, oils and grease, with grease-trap requirements and penalties for non-compliance — our documented collection protects you.",
    faqIds: ["delivery-areas", "uco-pay-rate", "uco-certificate", "uco-legal"],
  },
  {
    slug: "northern-suburbs",
    imageId: "metro-northern-suburbs",
    provinceSlug: "western-cape",
    name: "Northern Suburbs",
    h1: "Cooking Oil Supply & UCO Collection — Cape Town Northern Suburbs",
    metaTitle: "Cooking Oil Supplier Northern Suburbs Cape Town | Cuisine Foods",
    metaDescription:
      "Bulk cooking oil supply and used cooking oil collection across Cape Town's Northern Suburbs — Bellville, Durbanville, Brackenfell. Local & fast. Get a quote.",
    intro:
      "Our Montague Gardens branch sits on the doorstep of the Northern Suburbs, so Bellville, Durbanville and Brackenfell kitchens get quick, local supply and collection.",
    suburbs: ["Bellville", "Durbanville", "Brackenfell", "Parow", "Goodwood", "Kraaifontein", "Kuils River"],
    localLogistics:
      "Short, frequent routes from Montague Gardens cover the Northern Suburbs — quick delivery turnaround and flexible collection for Bellville, Durbanville and Brackenfell.",
    customerClusters:
      "We serve family restaurants and franchises across Durbanville and Brackenfell, Bellville's commercial kitchens and takeaways, and food producers around Parow and Goodwood.",
    complianceNote:
      "City of Cape Town fats-oils-grease by-laws apply across the Northern Suburbs too — our documented collection keeps Bellville, Durbanville and Brackenfell kitchens compliant.",
    faqIds: ["delivery-areas", "uco-pay-rate", "uco-certificate", "min-order"],
  },
];

export const getProvince = (slug: string) => provinces.find((p) => p.slug === slug);
export const getMetro = (slug: string) => metros.find((m) => m.slug === slug);
export const metrosFor = (provinceSlug: string) => metros.filter((m) => m.provinceSlug === provinceSlug);
