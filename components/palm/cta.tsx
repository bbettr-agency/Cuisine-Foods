import { ProductCta } from "@/components/product/product-cta";
import { PalmBotanical } from "@/components/palm/frond";

/**
 * PalmCta – the closing campaign beat for /palm-olein. Delegates to the shared
 * ProductCta (deliberate, fully-visible product + dominant copy) with the Palm
 * Olein packshot and the Unfurl canopy motif.
 */
export function PalmCta({
  title, body, primaryLabel, primaryHref,
}: { title: string; body: string; primaryLabel: string; primaryHref: string }) {
  return (
    <ProductCta
      title={title}
      body={body}
      primaryLabel={primaryLabel}
      primaryHref={primaryHref}
      packshot={{ src: "/images/website/product-palm.png", w: 827, h: 1027, alt: "Cuisine Foods 100% pure palm olein – bulk pail" }}
      motif={<div className="palm-canopy h-full w-full"><PalmBotanical className="h-full w-full" /></div>}
      motifClassName="left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-[55%] opacity-[0.17]"
    />
  );
}
