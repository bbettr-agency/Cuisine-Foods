"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, Phone } from "lucide-react";
import { site } from "@/config/site";
import { ghlFields, UCO_OIL_TYPE } from "@/config/ghl-fields";
import { quoteFormCopy as copy, supplyOilTypes, ucoVolume, type QuoteService } from "@/config/quote-form";
import { telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { areaField, regionField, stepFields, validate, type QuoteErrors, type QuotePayload } from "@/lib/quote-validate";
import { cn } from "@/lib/utils";

/**
 * QuoteForm — the custom three-step enquiry form shared by /quote/buy and
 * /quote/collect (service preselected by the page).
 *
 *   1. Business & location   2. Requirements (buy OR collect)   3. Contact & consent
 *
 * Every question, option value and conditional rule mirrors the official GHL form
 * (config/ghl-fields.ts). The browser only talks to our own /api/quote route; it
 * shows success ONLY when that route confirms the enquiry was saved.
 */

const inputCls =
  "w-full min-h-[52px] rounded-xl border border-line bg-surface px-4 text-base text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-gold-600 focus:ring-2 focus:ring-gold-500/30 aria-[invalid=true]:border-red-600";
const labelCls = "block text-sm font-semibold text-ink";

type Status = "idle" | "sending" | "done" | "error" | "not_connected";

export function QuoteForm({ service, onUseStandardForm }: { service: QuoteService; onUseStandardForm?: () => void }) {
  const uid = useId();
  const startedAt = useRef(Date.now());
  const topRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [website, setWebsite] = useState(""); // honeypot – real visitors never see or fill it
  const [v, setV] = useState<QuotePayload>({
    service,
    businessType: "",
    province: "",
    region: "",
    area: "",
    oilType: service === "collect" ? UCO_OIL_TYPE : "",
    volume: "",
    firstName: "",
    businessName: "",
    phone: "",
    email: "",
    consent: false,
  });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = <K extends keyof QuotePayload>(key: K, value: QuotePayload[K]) => {
    setV((prev) => {
      const next = { ...prev, [key]: value };
      // Same dependency chain as the official form: a new province/region clears what hung off the old one.
      if (key === "province") {
        next.region = "";
        next.area = "";
      }
      if (key === "region") next.area = "";
      return next;
    });
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const rf = regionField(v.province);
  const af = areaField(v.province, v.region);

  const focusTop = () => requestAnimationFrame(() => topRef.current?.focus());

  const stepErrors = (i: number): QuoteErrors => {
    const all = validate(v);
    return Object.fromEntries(stepFields[i].filter((k) => all[k]).map((k) => [k, all[k]])) as QuoteErrors;
  };

  const next = () => {
    const e = stepErrors(step);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setStep((s) => s + 1);
      focusTop();
    }
  };
  const back = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
    focusTop();
  };

  const submit = async () => {
    const all = validate(v);
    setErrors(all);
    if (Object.keys(all).length > 0) {
      const firstBad = stepFields.findIndex((keys) => keys.some((k) => all[k]));
      if (firstBad >= 0) setStep(firstBad);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, website, elapsedMs: Date.now() - startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; errors?: QuoteErrors };
      if (res.ok && data.ok === true) {
        setStatus("done");
      } else if (data.code === "invalid" && data.errors) {
        setErrors(data.errors);
        const firstBad = stepFields.findIndex((keys) => keys.some((k) => data.errors?.[k]));
        setStep(firstBad >= 0 ? firstBad : 0);
        setStatus("idle");
      } else {
        setStatus(data.code === "not_configured" ? "not_connected" : "error");
      }
    } catch {
      setStatus("error");
    }
    focusTop();
  };

  const card = "rounded-[25px] border border-line bg-surface p-5 shadow-soft sm:p-8";

  /* ---------- Success ---------- */
  if (status === "done") {
    const s = copy.success[service];
    return (
      <div ref={topRef} tabIndex={-1} role="status" className={cn(card, "text-center outline-none")}>
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-ink"><Check className="h-7 w-7" /></span>
        <h3 className="mt-5 font-display text-2xl font-bold text-ink">{s.title}</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">{s.body}</p>
      </div>
    );
  }

  const failed = status === "error" || status === "not_connected";

  return (
    <div ref={topRef} tabIndex={-1} className={cn(card, "outline-none")}>
      {/* Progress */}
      <div aria-hidden className="flex gap-2">
        {copy.steps.map((label, i) => (
          <span key={label} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-300", i <= step ? "bg-gold-500" : "bg-line")} />
        ))}
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gold-700">
        Step {step + 1} of {copy.steps.length} <span className="text-ink-faint">· {copy.steps[step]}</span>
      </p>

      <form
        noValidate
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 2) next();
          else void submit();
        }}
      >
        {step === 0 && (
          <div className="space-y-7">
            <Choices legend={ghlFields.businessType.label} name={`${uid}-bt`} options={ghlFields.businessType.options} value={v.businessType} onChange={(x) => set("businessType", x)} error={errors.businessType} />
            <Choices legend="Where is your business?" name={`${uid}-pr`} options={ghlFields.province.options} value={v.province} onChange={(x) => set("province", x)} error={errors.province} columns="grid-cols-2 sm:grid-cols-3" />
            {rf && (
              <Select id={`${uid}-rg`} label={rf.label} required={rf.required} options={rf.options} value={v.region} onChange={(x) => set("region", x)} error={errors.region} hint="We use your location to assign your nearest team." />
            )}
            {af && <Select id={`${uid}-ar`} label={af.label} required={af.required} options={af.options} value={v.area} onChange={(x) => set("area", x)} error={errors.area} />}
          </div>
        )}

        {step === 1 && service === "buy" && (
          <div className="space-y-7">
            <Choices legend="Which oil do you need?" name={`${uid}-ot`} options={supplyOilTypes} value={v.oilType} onChange={(x) => set("oilType", x)} error={errors.oilType} columns="grid-cols-1 sm:grid-cols-2" />
            <Choices legend="Estimated monthly volume" name={`${uid}-vol`} options={ghlFields.volume.options} value={v.volume} onChange={(x) => set("volume", x)} error={errors.volume} columns="grid-cols-1 sm:grid-cols-2" />
          </div>
        )}

        {step === 1 && service === "collect" && (
          <div className="space-y-7">
            <p className="flex items-center gap-2 rounded-xl border border-gold-500/40 bg-gold-100/40 px-4 py-3 text-sm font-semibold text-ink">
              <Check className="h-4 w-4 shrink-0 text-gold-700" /> Service: used cooking oil collection
            </p>
            <Choices legend={ucoVolume.label} name={`${uid}-uvol`} options={ucoVolume.options} value={v.volume} onChange={(x) => set("volume", x)} error={errors.volume} columns="grid-cols-1 sm:grid-cols-2" />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Text id={`${uid}-fn`} label="First name" autoComplete="given-name" value={v.firstName} onChange={(x) => set("firstName", x)} error={errors.firstName} />
              <Text id={`${uid}-bn`} label="Business name" autoComplete="organization" value={v.businessName} onChange={(x) => set("businessName", x)} error={errors.businessName} />
              <Text id={`${uid}-ph`} label="Phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 071 676 6767" value={v.phone} onChange={(x) => set("phone", x)} error={errors.phone} />
              <Text id={`${uid}-em`} label="Email" type="email" inputMode="email" autoComplete="email" placeholder="e.g. you@business.co.za" value={v.email} onChange={(x) => set("email", x)} error={errors.email} />
            </div>
            {/* Honeypot: hidden from people and assistive tech; bots that fill it are rejected server-side. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
            </div>
            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-soft">
                <input
                  type="checkbox"
                  checked={v.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? `${uid}-consent-err` : undefined}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink/30 accent-[rgb(var(--gold-600))]"
                />
                <span>{copy.consent[service]}</span>
              </label>
              {errors.consent && <p id={`${uid}-consent-err`} className="mt-2 text-sm font-medium text-red-700">{errors.consent}</p>}
            </div>
          </div>
        )}

        {/* Failure – shown only when nothing was saved. Never a false success. */}
        {failed && (
          <div role="alert" className="mt-6 rounded-2xl border border-red-700/30 bg-red-50 p-4 text-sm text-ink">
            <p className="font-semibold">{copy.failure.title}</p>
            <p className="mt-1 text-ink-soft">{status === "not_connected" ? copy.failure.notConnected : copy.failure.body}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-semibold">
              <a href={whatsappUrl(whatsappPrefill[service === "collect" ? "uco" : "supply"])} target="_blank" rel="noopener noreferrer" className="underline decoration-gold-500 decoration-2 underline-offset-4">WhatsApp us</a>
              <a href={telUrl} className="inline-flex items-center gap-1.5 underline decoration-gold-500 decoration-2 underline-offset-4"><Phone className="h-4 w-4" /> {site.contact.phone.display}</a>
              {onUseStandardForm && (
                <button type="button" onClick={onUseStandardForm} className="underline decoration-gold-500 decoration-2 underline-offset-4">Use our standard form instead</button>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={back} disabled={status === "sending"} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-5 text-base font-semibold text-ink-soft transition-colors hover:text-ink disabled:opacity-50">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-8 text-base font-semibold text-ink shadow-soft transition-colors hover:bg-gold-600 disabled:opacity-70 sm:w-auto"
          >
            {status === "sending" ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
            ) : step < 2 ? (
              <>Continue <ArrowRight className="h-4 w-4" /></>
            ) : (
              <>{failed ? "Try again" : copy.submit[service]} <ArrowRight className="h-4 w-4" /></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- Field primitives ---------- */

function Choices({ legend, name, options, value, onChange, error, columns = "grid-cols-1 sm:grid-cols-2" }: {
  legend: string; name: string; options: string[]; value: string; onChange: (v: string) => void; error?: string; columns?: string;
}) {
  return (
    <fieldset aria-invalid={!!error} aria-describedby={error ? `${name}-err` : undefined}>
      <legend className={labelCls}>{legend}</legend>
      <div className={cn("mt-3 grid gap-2.5", columns)}>
        {options.map((o) => (
          <label
            key={o}
            className="flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface px-4 py-2.5 text-[15px] font-medium text-ink transition-colors hover:border-gold-500/70 has-[:checked]:border-gold-600 has-[:checked]:bg-gold-100/50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-600"
          >
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} className="peer sr-only" />
            <span aria-hidden className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ink/30 text-transparent transition-colors peer-checked:border-gold-600 peer-checked:bg-gold-500 peer-checked:text-ink">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            {/* Display only: GHL's value keeps any invisible characters, the label drops them. */}
            <span>{o.replace(/[⁠​]/g, "")}</span>
          </label>
        ))}
      </div>
      {error && <p id={`${name}-err`} className="mt-2 text-sm font-medium text-red-700">{error}</p>}
    </fieldset>
  );
}

function Select({ id, label, options, value, onChange, error, required, hint }: {
  id: string; label: string; options: string[]; value: string; onChange: (v: string) => void; error?: string; required: boolean; hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>{label}{!required && <span className="font-normal text-ink-faint"> (optional)</span>}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={cn(inputCls, "mt-2 appearance-auto")}>
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o.replace(/[⁠​]/g, "")}</option>
        ))}
      </select>
      {hint && !error && <p className="mt-2 text-xs text-ink-faint">{hint}</p>}
      {error && <p id={`${id}-err`} className="mt-2 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}

function Text({ id, label, value, onChange, error, ...rest }: {
  id: string; label: string; value: string; onChange: (v: string) => void; error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "id">) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>{label}</label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={cn(inputCls, "mt-2")} {...rest} />
      {error && <p id={`${id}-err`} className="mt-2 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}
