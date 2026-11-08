"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

/** Enquiry types → the intent tag forwarded to GHL, so the lead is categorised. */
const ENQUIRY_TYPES: { label: string; intent: "supply" | "uco" | "general" }[] = [
  { label: "Bulk cooking oil supply", intent: "supply" },
  { label: "Used cooking oil collection", intent: "uco" },
  { label: "Grease-trap cleaning", intent: "uco" },
  { label: "General enquiry", intent: "general" },
  { label: "Other", intent: "general" },
];

/**
 * ContactForm — a minimal, single-step enquiry form for the Contact page.
 * Posts to the shared /api/lead endpoint (GHL). Distinct from the multi-step
 * qualifying quote form (LeadForm) used on /request-a-quote.
 */
export function ContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    enquiryType: "",
    message: "",
    consent: false,
    website: "", // honeypot – must stay empty
  });

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setError("Please add your name, email and phone so we can reply.");
      return;
    }
    if (!form.consent) {
      setError("Please accept the privacy consent to continue.");
      return;
    }
    setSubmitting(true);
    try {
      const intent = ENQUIRY_TYPES.find((t) => t.label === form.enquiryType)?.intent ?? "general";
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, intent, formType: "contact" }),
      });
      if (!res.ok) throw new Error();
      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Please try again, or WhatsApp us directly.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="card p-6 shadow-soft sm:p-8" noValidate>
      {/* Honeypot – hidden from users; bots that fill it are dropped server-side */}
      <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
        <label htmlFor="c-website">Leave this field empty</label>
        <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="c-name" className={labelCls}>Full name</label>
          <input id="c-name" className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="c-business" className={labelCls}>Business name <span className="text-ink-faint">(optional)</span></label>
          <input id="c-business" className={inputCls} value={form.business} onChange={(e) => set("business", e.target.value)} autoComplete="organization" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="c-email" className={labelCls}>Email</label>
            <input id="c-email" type="email" inputMode="email" className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} required autoComplete="email" />
          </div>
          <div>
            <label htmlFor="c-phone" className={labelCls}>Phone / WhatsApp</label>
            <input id="c-phone" type="tel" inputMode="tel" className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} required autoComplete="tel" />
          </div>
        </div>
        <div>
          <label htmlFor="c-type" className={labelCls}>Enquiry type</label>
          <select id="c-type" className={inputCls} value={form.enquiryType} onChange={(e) => set("enquiryType", e.target.value)}>
            <option value="">Select…</option>
            {ENQUIRY_TYPES.map((t) => <option key={t.label} value={t.label}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="c-message" className={labelCls}>Message</label>
          <textarea id="c-message" rows={4} className={inputCls} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us a little about what you need…" />
        </div>

        <label className="flex items-start gap-3 text-xs leading-relaxed text-ink-soft">
          <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-brand-700 focus:ring-brand-500" required />
          <span>I consent to Cuisine Foods contacting me about my enquiry and to my details being processed in line with the POPI Act.</span>
        </label>

        {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}

        <button type="submit" disabled={submitting} className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 font-semibold text-ink transition-colors hover:bg-gold-600 disabled:opacity-60">
          {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Send message <Send className="h-4 w-4" /></>}
        </button>
      </div>
    </form>
  );
}
