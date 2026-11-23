"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Loader2, X } from "lucide-react";
import { WHATSAPP_PROVINCES, whatsappPopupCopy as copy } from "@/config/whatsapp-popup";
import { captureAttribution } from "@/lib/attribution";
import { trackWhatsAppContact } from "@/components/funnel/meta-pixel";

/**
 * WhatsAppLeadPopup — ONE popup for every WhatsApp link on the site.
 *
 * Mounted once in the root layout. It listens for clicks on any link that points
 * at WhatsApp (header, footer, heroes, CTA bands, the floating button, the sticky
 * mobile bar, both funnels …), so no individual button had to change and every
 * link keeps its own number and prefilled message. On click it holds the
 * navigation, asks for five details, sends them to /api/whatsapp-lead, and only
 * after the server confirms delivery continues to that exact WhatsApp link.
 *
 * Links inside the popup itself carry data-wa-direct and are never intercepted.
 */
const inputCls =
  "w-full min-h-[50px] rounded-xl border border-line bg-surface px-4 text-base text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-gold-600 focus:ring-2 focus:ring-gold-500/30 aria-[invalid=true]:border-red-600";

type Values = { firstName: string; lastName: string; email: string; phone: string; province: string };
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "done" | "error";
const EMPTY: Values = { firstName: "", lastName: "", email: "", phone: "", province: "" };

const isWhatsApp = (href: string) => /^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href);

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.firstName.trim().length < 2) e.firstName = "Please enter your first name.";
  if (v.lastName.trim().length < 2) e.lastName = "Please enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) e.phone = "Please enter a valid phone number.";
  if (!(WHATSAPP_PROVINCES as readonly string[]).includes(v.province)) e.province = "Please choose your province.";
  return e;
}

export function WhatsAppLeadPopup() {
  const uid = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openedAt = useRef(0);
  const submissionId = useRef("");
  const sending = useRef(false); // duplicate-click guard that does not wait for a re-render
  const [target, setTarget] = useState(""); // the original WhatsApp link, untouched
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [website, setWebsite] = useState(""); // honeypot

  // Intercept every WhatsApp link on the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.hasAttribute("data-wa-direct") || !isWhatsApp(link.href)) return;
      e.preventDefault();
      setTarget(link.getAttribute("href") ?? link.href); // the link exactly as written: same number, same prefilled message
      setV(EMPTY);
      setErrors({});
      setStatus("idle");
      setWebsite("");
      openedAt.current = Date.now();
      submissionId.current = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sending.current = false;
      if (!dialogRef.current?.open) dialogRef.current?.showModal();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  const set = (key: keyof Values, value: string) => {
    setV((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = async () => {
    if (sending.current) return;
    const found = validate(v);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    sending.current = true;
    setStatus("sending");
    let ok = false;
    try {
      const url = new URL(target);
      const res = await fetch("/api/whatsapp-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...v,
          website,
          elapsedMs: Date.now() - openedAt.current,
          submissionId: submissionId.current,
          page: window.location.pathname,
          whatsappMessage: url.searchParams.get("text") ?? "",
          whatsappNumber: url.pathname.replace(/\D/g, ""),
          attribution: captureAttribution(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; errors?: Errors };
      if (res.ok && data.ok === true) ok = true;
      else if (data.code === "invalid" && data.errors) setErrors(data.errors);
    } catch {
      ok = false;
    }
    sending.current = false;
    if (!ok) {
      setStatus("error");
      return;
    }
    setStatus("done");
    trackWhatsAppContact(submissionId.current); // only with advertising consent; never the quote-form Lead event
    // Continue to the ORIGINAL link. If the browser blocks the new tab, the "Open WhatsApp" button below does it.
    window.open(target, "_blank", "noopener,noreferrer");
  };

  const linkCls = "font-semibold text-ink underline decoration-gold-500 decoration-2 underline-offset-2";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${uid}-title`}
      onClick={(e) => {
        if (e.target === dialogRef.current) close(); // click on the backdrop
      }}
      className="m-auto w-[calc(100%-1.5rem)] max-w-md rounded-[25px] border border-line bg-paper p-0 text-ink shadow-lift backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      <div className="max-h-[calc(100dvh-1.5rem)] overflow-y-auto p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">{copy.eyebrow}</p>
            <h2 id={`${uid}-title`} className="mt-1 font-display text-2xl font-extrabold text-ink">
              {status === "done" ? copy.successTitle : copy.title}
            </h2>
          </div>
          <button type="button" onClick={close} aria-label="Close" className="-mr-2 -mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/[0.06] hover:text-ink">
            <X className="h-5 w-5" />
          </button>
        </div>

        {status === "done" ? (
          <div role="status" className="mt-3">
            <p className="text-ink-soft">{copy.successBody}</p>
            <a
              data-wa-direct
              href={target}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-5 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 text-base font-semibold text-ink shadow-soft transition-colors hover:bg-gold-600"
            >
              {copy.open} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <form
            noValidate
            className="mt-3"
            onSubmit={(e) => {
              e.preventDefault();
              void submit();
            }}
          >
            <p className="text-ink-soft">{copy.body}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field id={`${uid}-fn`} label="First name" autoComplete="given-name" value={v.firstName} onChange={(x) => set("firstName", x)} error={errors.firstName} />
              <Field id={`${uid}-ln`} label="Last name" autoComplete="family-name" value={v.lastName} onChange={(x) => set("lastName", x)} error={errors.lastName} />
              <Field id={`${uid}-em`} label="Email address" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={(x) => set("email", x)} error={errors.email} />
              <Field id={`${uid}-ph`} label="Phone number" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={(x) => set("phone", x)} error={errors.phone} />
              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-pr`} className="block text-sm font-semibold text-ink">Province</label>
                <select id={`${uid}-pr`} value={v.province} onChange={(e) => set("province", e.target.value)} aria-invalid={!!errors.province} aria-describedby={errors.province ? `${uid}-pr-err` : undefined} className={`${inputCls} mt-2 appearance-auto`}>
                  <option value="">Select…</option>
                  {WHATSAPP_PROVINCES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.province && <p id={`${uid}-pr-err`} className="mt-2 text-sm font-medium text-red-700">{errors.province}</p>}
              </div>
            </div>
            {/* Honeypot: hidden from people and assistive tech; bots that fill it are rejected server-side. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
            </div>

            {status === "error" && (
              <div role="alert" className="mt-5 rounded-2xl border border-red-700/30 bg-red-50 p-4 text-sm text-ink">
                <p className="font-semibold">{copy.failureTitle}</p>
                <p className="mt-1 text-ink-soft">{copy.failureBody}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-5 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 text-base font-semibold text-ink shadow-soft transition-colors hover:bg-gold-600 disabled:opacity-70"
            >
              {status === "sending" ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> {copy.sending}</>
              ) : (
                <>{status === "error" ? copy.retry : copy.submit} <ArrowRight className="h-4 w-4" /></>
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-relaxed text-ink-faint">
              {copy.privacy}{" "}
              <a href="/privacy-policy" target="_blank" rel="noopener" className={linkCls}>Privacy Policy</a>
            </p>
            <p className="mt-3 text-center text-sm">
              <a data-wa-direct href={target} target="_blank" rel="noopener noreferrer" onClick={close} className={linkCls}>
                {copy.skip}
              </a>
            </p>
          </form>
        )}
      </div>
    </dialog>
  );
}

function Field({ id, label, value, onChange, error, ...rest }: {
  id: string; label: string; value: string; onChange: (v: string) => void; error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "id">) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">{label}</label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={`${inputCls} mt-2`} {...rest} />
      {error && <p id={`${id}-err`} className="mt-2 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}
