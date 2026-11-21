import { ATTRIBUTION_KEYS } from "@/config/quote-form";

/**
 * Campaign attribution for the custom form (browser only).
 *
 * Reads the allow-listed UTM / click-id parameters from the landing URL plus
 * Meta's own _fbc / _fbp cookies (present only if the pixel is running), and
 * remembers them for the tab's session so they survive moving between funnel
 * pages. Nothing else from the URL is read, and nothing is sent anywhere until
 * the visitor submits the form.
 */
const STORE = "cf_attribution";

const cookie = (name: string) => document.cookie.split("; ").find((c) => c.startsWith(`${name}=`))?.split("=")[1] ?? "";

export function captureAttribution(): Record<string, string> {
  let saved: Record<string, string> = {};
  try {
    saved = JSON.parse(sessionStorage.getItem(STORE) ?? "{}");
  } catch {}
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = { ...saved };
  for (const key of ATTRIBUTION_KEYS) {
    // landing_page is set once, on the first funnel page of the visit, and then kept.
    if (key === "landing_page") {
      if (!out.landing_page) out.landing_page = window.location.pathname.slice(0, 200);
      continue;
    }
    const value = key === "fbc" ? cookie("_fbc") : key === "fbp" ? cookie("_fbp") : params.get(key) ?? "";
    if (value) out[key] = value.slice(0, 200);
  }
  try {
    sessionStorage.setItem(STORE, JSON.stringify(out));
  } catch {}
  return out;
}
