/** NAVIGATION – header + footer. Labels/URLs config-driven; no hardcoded links in components. */

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href?: string; links: NavLink[] };

export const headerNav: NavGroup[] = [
  {
    label: "Cooking Oil Supply",
    href: "/bulk-cooking-oil-supply",
    links: [
      { label: "Bulk Cooking Oil Supply", href: "/bulk-cooking-oil-supply", description: "Reliable bulk delivery, nationwide" },
      { label: "Sunflower Oil", href: "/sunflower-oil", description: "100% pure, versatile" },
      { label: "Palm Olein", href: "/palm-olein", description: "Heat-stable, long fry-life" },
      { label: "Soya Oil", href: "/soya-oil", description: "Cost-effective, neutral" },
      { label: "Frying Oil – which to choose", href: "/frying-oil", description: "The right oil for your fryer" },
    ],
  },
  {
    label: "Used Cooking Oil",
    href: "/used-cooking-oil-collection",
    links: [
      { label: "UCO Collection", href: "/used-cooking-oil-collection", description: "Documented, on your schedule" },
      { label: "Get Paid for Your Used Oil", href: "/used-cooking-oil-collection/get-paid", description: "What your oil is worth" },
      { label: "Compliance & Documentation", href: "/used-cooking-oil-collection/compliance", description: "Your protection at inspection" },
      { label: "Grease-Trap Cleaning", href: "/grease-trap-cleaning", description: "Keep your kitchen compliant" },
      { label: "UCO Compliance Reporting", href: "/uco-compliance-reporting", description: "For franchises & groups" },
      { label: "Cooking Oil Recycling", href: "/cooking-oil-recycling", description: "Into renewable biodiesel" },
    ],
  },
  {
    label: "Locations",
    href: "/locations",
    links: [
      { label: "Nationwide Coverage", href: "/locations", description: "Our regional hubs & national network" },
      { label: "Gauteng", href: "/gauteng", description: "Johannesburg · Pretoria · Centurion" },
      { label: "– Johannesburg", href: "/gauteng/johannesburg" },
      { label: "– Pretoria & Centurion", href: "/gauteng/pretoria" },
      { label: "Western Cape", href: "/western-cape", description: "Cape Town & surrounds" },
      { label: "– Cape Town", href: "/western-cape/cape-town" },
      { label: "– Northern Suburbs", href: "/western-cape/northern-suburbs" },
      { label: "KwaZulu-Natal", href: "/kwazulu-natal", description: "Opening soon" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    links: [
      { label: "All Resources", href: "/resources", description: "Guides for professional kitchens" },
      { label: "Used Cooking Oil Hub", href: "/resources/used-cooking-oil", description: "Collection, pricing & compliance" },
      { label: "Frying & Cooking Oil Hub", href: "/resources/frying", description: "Choosing & getting more from your oil" },
    ],
  },
  { label: "About", href: "/about", links: [] },
];

export const footerNav: NavGroup[] = [
  {
    label: "Cooking Oil Supply",
    links: [
      { label: "Bulk Cooking Oil Supply", href: "/bulk-cooking-oil-supply" },
      { label: "Sunflower Oil", href: "/sunflower-oil" },
      { label: "Palm Olein", href: "/palm-olein" },
      { label: "Soya Oil", href: "/soya-oil" },
      { label: "Frying Oil Guide", href: "/frying-oil" },
      { label: "For Restaurants", href: "/cooking-oil-for-restaurants" },
      { label: "For Hotels", href: "/cooking-oil-for-hotels" },
      { label: "For Caterers", href: "/cooking-oil-for-caterers" },
      { label: "For Food Manufacturers", href: "/cooking-oil-for-food-manufacturers" },
      { label: "For Franchises", href: "/cooking-oil-for-franchises" },
    ],
  },
  {
    label: "Used Cooking Oil",
    links: [
      { label: "UCO Collection", href: "/used-cooking-oil-collection" },
      { label: "Get Paid for Used Oil", href: "/used-cooking-oil-collection/get-paid" },
      { label: "Compliance & Documentation", href: "/used-cooking-oil-collection/compliance" },
      { label: "Grease-Trap Cleaning", href: "/grease-trap-cleaning" },
      { label: "UCO Compliance Reporting", href: "/uco-compliance-reporting" },
      { label: "Cooking Oil Recycling", href: "/cooking-oil-recycling" },
    ],
  },
  {
    label: "Locations",
    links: [
      { label: "Nationwide Coverage", href: "/locations" },
      { label: "Gauteng", href: "/gauteng" },
      { label: "Johannesburg", href: "/gauteng/johannesburg" },
      { label: "Pretoria & Centurion", href: "/gauteng/pretoria" },
      { label: "Western Cape", href: "/western-cape" },
      { label: "Cape Town", href: "/western-cape/cape-town" },
      { label: "Northern Suburbs", href: "/western-cape/northern-suburbs" },
      { label: "KwaZulu-Natal (soon)", href: "/kwazulu-natal" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
      { label: "Request a Quote", href: "/request-a-quote" },
    ],
  },
];
