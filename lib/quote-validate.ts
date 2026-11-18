import { ghlFields, provinceFollowUp, areaFieldByRegion, UCO_OIL_TYPE, type GhlField } from "@/config/ghl-fields";
import { supplyOilTypes, ucoVolume, type QuoteService } from "@/config/quote-form";

/** What the browser sends. Every choice is re-checked on the server against the GHL option lists. */
export type QuotePayload = {
  service: QuoteService;
  businessType: string;
  province: string;
  region: string;
  area: string;
  oilType: string;
  volume: string;
  firstName: string;
  businessName: string;
  phone: string;
  email: string;
  consent: boolean;
};

export type QuoteErrors = Partial<Record<keyof QuotePayload, string>>;

/** Which fields belong to which step – shared by the form (per-step checks) and tests. */
export const stepFields: (keyof QuotePayload)[][] = [
  ["businessType", "province", "region", "area"],
  ["oilType", "volume"],
  ["firstName", "businessName", "phone", "email", "consent"],
];

/** The region question (if any) that follows the chosen province. */
export function regionField(province: string): GhlField | null {
  const k = provinceFollowUp[province];
  return k ? ghlFields[k] : null;
}

/** The area question (if any) that follows the chosen region. North-West has none (its "region" IS the area). */
export function areaField(province: string, region: string): GhlField | null {
  return provinceFollowUp[province] === "northWestArea" ? null : areaFieldByRegion[region] ?? null;
}

/** South African numbers typed locally (0xx…) are stored as +27…; anything else keeps its digits. */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (/^0\d{9}$/.test(digits)) return `+27${digits.slice(1)}`;
  if (/^27\d{9}$/.test(digits)) return `+${digits}`;
  return digits;
}

const clean = (v: unknown, max = 120) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function parsePayload(input: unknown): QuotePayload {
  const o = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  return {
    service: o.service === "collect" ? "collect" : "buy",
    businessType: clean(o.businessType),
    province: clean(o.province),
    region: clean(o.region),
    area: clean(o.area),
    oilType: clean(o.oilType),
    volume: clean(o.volume),
    firstName: clean(o.firstName, 60),
    businessName: clean(o.businessName, 100),
    phone: clean(o.phone, 30),
    email: clean(o.email, 120).toLowerCase(),
    consent: o.consent === true,
  };
}

export function validate(p: QuotePayload): QuoteErrors {
  const e: QuoteErrors = {};
  if (!ghlFields.businessType.options.includes(p.businessType)) e.businessType = "Please choose your business type.";
  if (!ghlFields.province.options.includes(p.province)) e.province = "Please choose your province.";

  const rf = regionField(p.province);
  if (rf && (rf.required || p.region) && !rf.options.includes(p.region)) e.region = "Please choose your region.";
  const af = areaField(p.province, p.region);
  if (af && (af.required || p.area) && !af.options.includes(p.area)) e.area = "Please choose your area.";

  if (p.service === "collect") {
    if (p.oilType !== UCO_OIL_TYPE) e.oilType = "Please confirm the service.";
    if (!ucoVolume.options.includes(p.volume)) e.volume = "Please choose an estimate.";
  } else {
    if (!supplyOilTypes.includes(p.oilType)) e.oilType = "Please choose an oil type.";
    if (!ghlFields.volume.options.includes(p.volume)) e.volume = "Please choose an estimated volume.";
  }

  if (p.firstName.length < 2) e.firstName = "Please enter your first name.";
  if (p.businessName.length < 2) e.businessName = "Please enter your business name.";
  const digits = normalisePhone(p.phone).replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) e.phone = "Please enter a valid phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(p.email)) e.email = "Please enter a valid email address.";
  if (!p.consent) e.consent = "Please tick the consent box to continue.";
  return e;
}

/**
 * Maps a validated payload onto the EXISTING GHL custom fields (multi-select
 * type, so every value is sent as a one-item list). `ucoVolumeFieldId` is the
 * new collection field's ID, once it exists.
 */
export function toGhlCustomFields(p: QuotePayload, ucoVolumeFieldId?: string) {
  const out: { id: string; field_value: string[] }[] = [
    { id: ghlFields.businessType.id, field_value: [p.businessType] },
    { id: ghlFields.oilType.id, field_value: [p.oilType] },
    { id: ghlFields.province.id, field_value: [p.province] },
  ];
  if (p.service === "collect") {
    if (ucoVolumeFieldId) out.push({ id: ucoVolumeFieldId, field_value: [p.volume] });
  } else {
    out.push({ id: ghlFields.volume.id, field_value: [p.volume] });
  }
  const rf = regionField(p.province);
  if (rf && p.region) out.push({ id: rf.id, field_value: [p.region] });
  const af = areaField(p.province, p.region);
  if (af && p.area) out.push({ id: af.id, field_value: [p.area] });
  return out;
}
