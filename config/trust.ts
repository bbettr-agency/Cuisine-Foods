/**
 * TRUST LEDGER — the progressive, config-driven trust system (OS pattern P9).
 *
 * Every trust element reads from here. An item renders ONLY when `enabled` is
 * true AND it has real data. Pending items stay disabled — so the site is
 * persuasive today with verified facts, and lights up as the client confirms
 * more, with ZERO code changes. Nothing here is fabricated: unverified claims
 * stay `enabled: false` until confirmed.
 */

export type TrustStat = { value: string; label: string; enabled: boolean; note?: string };
export type TrustBadge = { id: string; label: string; enabled: boolean };
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  location?: string;
  enabled: boolean;
};

export const trust = {
  /** Headline proof strip (shown under the hero). Only enabled items render. */
  stats: [
    { value: "Since 2009", label: "Serving SA kitchens", enabled: true, note: "PENDING: reconcile 2009 vs 15+ yrs" },
    { value: "2", label: "Branches — Gauteng & Western Cape", enabled: true },
    { value: "Family-owned", label: "Proudly South African", enabled: true },
    { value: "Licensed", label: "Compliant UCO collection", enabled: true, note: "PENDING: exact licence/registration" },
    // Disabled until verified — do not fabricate:
    { value: "1000s", label: "Kitchens served", enabled: false, note: "client-stated; confirm before use" },
    { value: "", label: "Litres delivered / month", enabled: false, note: "PENDING quantified volume" },
  ] as TrustStat[],

  /**
   * Certifications / accreditations. All PENDING — render as a badge row when provided.
   * NOTE: correct UCO/biodiesel bodies are ISCC + SABA (SA Biodiesel Association) and
   * IWMSA. Do NOT use the ROSE Foundation for used COOKING oil — ROSE governs used
   * LUBRICATING/motor oil only (verified rosefoundation.org.za). Compliance framework:
   * Waste Act 59/2008 + SAWIS registration + municipal FOG by-laws.
   */
  certifications: [
    { id: "bbbee", label: "B-BBEE Contributor", enabled: false },
    { id: "haccp", label: "HACCP / Food Safety", enabled: false },
    { id: "iso", label: "ISO", enabled: false },
    { id: "iscc", label: "ISCC Certified (UCO / biodiesel feedstock)", enabled: false },
    { id: "saba", label: "SA Biodiesel Association (SABA) Member", enabled: false },
    { id: "iwmsa", label: "IWMSA Member", enabled: false },
  ] as TrustBadge[],

  /** Client industries served (category-level — safe to show, no named clients). */
  industries: [
    "Restaurants",
    "Hotels",
    "Caterers",
    "Food manufacturers",
    "Bakeries",
    "Take-aways & QSR",
    "Franchise groups",
    "Institutional kitchens",
  ],

  /** Service guarantees — high-value conversion lever. PENDING confirmation. */
  guarantees: [
    { id: "ontime", label: "On-time delivery commitment", enabled: false },
    { id: "noobligation", label: "No-obligation, no lock-in quote", enabled: true },
  ] as TrustBadge[],

  /** Response-time promise (immediacy lever). PENDING exact figure. */
  responseTime: { enabled: false, text: "" }, // e.g. { enabled: true, text: "We reply on WhatsApp within 30 minutes, business hours" }

  /** Real testimonials only, with consent. NONE yet — never invent these. */
  testimonials: [] as Testimonial[],
} as const;

export const enabledStats = () => trust.stats.filter((s) => s.enabled && s.value);
export const enabledCerts = () => trust.certifications.filter((c) => c.enabled);
export const enabledGuarantees = () => trust.guarantees.filter((g) => g.enabled);
export const hasTestimonials = () => trust.testimonials.length > 0;
