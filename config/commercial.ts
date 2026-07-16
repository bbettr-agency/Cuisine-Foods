/**
 * COMMERCIAL / CONVERSION content — the reusable "Why Cuisine Foods" trust band
 * placed mid-page on commercial pages. Combines the closed-loop differentiator,
 * reliability + objection-handling proof points, progressive certifications, and
 * an inline CTA. Content-driven; every point answers a real procurement objection.
 */
import type { FeaturePoint } from "@/config/types";

export const trustBand = {
  eyebrow: "Why Cuisine Foods",
  headline: "The reliable, compliant partner for South Africa's kitchens",
  differentiator:
    "One partner for the oil going in and the oil coming out — delivered on time, across Gauteng and the Western Cape.",
  points: [
    { icon: "truck", title: "On-time, every time", body: "Dependable scheduled delivery so a busy kitchen never runs dry." },
    { icon: "droplet", title: "Consistent quality", body: "The same clean, pure oil every batch, to strict food-safety standards." },
    { icon: "banknote", title: "Lower real cost", body: "We buy back your used oil, cutting your true cost per litre." },
    { icon: "shield-check", title: "Licensed & compliant", body: "Compliant used-oil handling with safe-disposal documentation." },
  ] as FeaturePoint[],
  // Low-risk reassurances shown as a compact row (proactive objection handling).
  reassurances: [
    "No strict minimum — from 20L",
    "First delivery this week",
    "No lock-in, no-obligation quote",
  ],
} as const;
