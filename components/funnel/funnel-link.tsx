"use client";

import { useEffect, useState } from "react";

/**
 * Advertising attribution parameters that are carried between the funnel routes
 * (/quote → /quote/buy ↔ /quote/collect). Only this allow-list is forwarded, so
 * nothing else that happens to be in the URL (e.g. personal details used to
 * prefill a form) is ever copied onto another page.
 */
const ATTRIBUTION_PARAM =
  /^(utm_[a-z0-9_]+|fbclid|gclid|gbraid|wbraid|msclkid|ttclid|li_fat_id|campaign_id|adset_id|ad_id|placement|site_source_name)$/i;

/** Returns `href` with the current page's attribution parameters appended. */
export function withAttribution(href: string, search: string): string {
  const current = new URLSearchParams(search);
  const [path, existing = ""] = href.split("?");
  const out = new URLSearchParams(existing);
  current.forEach((value, key) => {
    if (ATTRIBUTION_PARAM.test(key) && !out.has(key)) out.set(key, value);
  });
  const query = out.toString();
  return query ? `${path}?${query}` : path;
}

/**
 * FunnelLink — a link between funnel routes that keeps UTM / click-id parameters.
 *
 * It is a plain <a> (a full page load) on purpose: the official GoHighLevel form
 * reads the landing URL's parameters when the page loads, so a real navigation
 * guarantees the form and its tracking see the same attribution the ad sent.
 * Works with and without query parameters, and without JavaScript (the bare href).
 */
export function FunnelLink({
  href,
  children,
  ...rest
}: { href: string; children: React.ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const [to, setTo] = useState(href);

  useEffect(() => {
    setTo(withAttribution(href, window.location.search));
  }, [href]);

  return (
    <a
      href={to}
      // Re-read the URL at click time too, in case it changed after mount.
      onClick={(e) => {
        e.currentTarget.href = withAttribution(href, window.location.search);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
