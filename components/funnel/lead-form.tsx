"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import type { CtaIntent } from "@/config/conversion";
import { cn } from "@/lib/utils";

const businessTypes = [
  "Restaurant", "Hotel", "Caterer", "Food manufacturer", "Wholesaler / distributor",
  "Fast-food / franchise group", "Bakery", "Commercial / institutional kitchen",
  "Other business", "Personal / household",
];

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

/** Multi-step qualifying quote form (OS P6). Step 1 low-friction; step 2 qualifiers. */
export function LeadForm({ defaultIntent = "supply" }: { defaultIntent?: CtaIntent }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    intent: defaultIntent === "uco" ? "uco" : "supply",
    name: "",
    business: "",
    phone: "",
    email: "",
    businessType: "",
    volume: "",
    sites: "",
    area: "",
    message: "",
    consent: false,
  });

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const step1Valid = form.name.trim() && form.phone.trim() && form.business.trim();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.consent) {
      setError("Please accept the privacy consent to continue.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Please try again, or WhatsApp us directly.");
      setSubmitting(false);
    }
  }

  const isUco = form.intent === "uco";

  return (
    <form onSubmit={submit} className="card p-6 shadow-soft sm:p-8" noValidate>
      {/* Intent fork */}
      <fieldset className="mb-6">
        <legend className={labelCls}>What can we help with?</legend>
        <div className="grid grid-cols-2 gap-2">
          {[
            { v: "supply", label: "Buy bulk oil" },
            { v: "uco", label: "Arrange collection" },
          ].map((o) => (
            <button
              type="button"
              key={o.v}
              onClick={() => set("intent", o.v)}
              className={cn(
                "rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
                form.intent === o.v
                  ? "border-brand-600 bg-brand-50 text-brand-800"
                  : "border-line text-ink-soft hover:border-brand-300",
              )}
              aria-pressed={form.intent === o.v}
            >
              {o.label}
            </button>
          ))}
        </div>
      </fieldset>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className={labelCls}>Your name</label>
            <input id="name" className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} required autoComplete="name" />
          </div>
          <div>
            <label htmlFor="business" className={labelCls}>Business name</label>
            <input id="business" className={inputCls} value={form.business} onChange={(e) => set("business", e.target.value)} required autoComplete="organization" />
          </div>
          <div>
            <label htmlFor="phone" className={labelCls}>Phone / WhatsApp number</label>
            <input id="phone" type="tel" inputMode="tel" className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} required autoComplete="tel" />
          </div>
          <button
            type="button"
            disabled={!step1Valid}
            onClick={() => setStep(2)}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 font-semibold text-ink transition-colors hover:bg-gold-600 disabled:opacity-50"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-center text-xs text-ink-faint">Prefer to chat? WhatsApp or call us — details in the header.</p>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="businessType" className={labelCls}>Business type</label>
            <select id="businessType" className={inputCls} value={form.businessType} onChange={(e) => set("businessType", e.target.value)}>
              <option value="">Select…</option>
              {businessTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="volume" className={labelCls}>
                {isUco ? "Used oil produced / week" : "Oil volume / month"}
              </label>
              <input id="volume" className={inputCls} placeholder={isUco ? "e.g. 60L" : "e.g. 200L"} value={form.volume} onChange={(e) => set("volume", e.target.value)} />
            </div>
            <div>
              <label htmlFor="sites" className={labelCls}>Number of sites</label>
              <input id="sites" type="number" inputMode="numeric" min={1} className={inputCls} placeholder="1" value={form.sites} onChange={(e) => set("sites", e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="area" className={labelCls}>Suburb / area</label>
            <input id="area" className={inputCls} placeholder="e.g. Sandton, Cape Town CBD" value={form.area} onChange={(e) => set("area", e.target.value)} />
          </div>
          <div>
            <label htmlFor="email" className={labelCls}>Email <span className="text-ink-faint">(optional)</span></label>
            <input id="email" type="email" inputMode="email" className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
          </div>
          <div>
            <label htmlFor="message" className={labelCls}>Anything else? <span className="text-ink-faint">(optional)</span></label>
            <textarea id="message" rows={3} className={inputCls} value={form.message} onChange={(e) => set("message", e.target.value)} />
          </div>

          <label className="flex items-start gap-3 text-xs leading-relaxed text-ink-soft">
            <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-brand-700 focus:ring-brand-500" required />
            <span>I consent to Cuisine Foods contacting me about my enquiry and to my details being processed in line with the POPI Act.</span>
          </label>

          {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-line px-5 font-semibold text-ink-soft transition-colors hover:border-brand-300">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button type="submit" disabled={submitting} className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-gold-500 font-semibold text-ink transition-colors hover:bg-gold-600 disabled:opacity-60">
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Send my enquiry"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
