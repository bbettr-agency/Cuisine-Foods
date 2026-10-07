import { ProductCta } from "@/components/product/product-cta";
import { LivingBotanical } from "@/components/cooking/botanical";

/**
 * CookingCta – the closing campaign beat for /bulk-cooking-oil-supply. Delegates
 * to the shared ProductCta with the bulk cooking-oil bucket and the Living Label
 * botanical motif.
 */
export function CookingCta({
  title, body, primaryLabel, primaryHref,
}: { title: string; body: string; primaryLabel: string; primaryHref: string }) {
  return (
    <ProductCta
      title={title}
      body={body}
      primaryLabel={primaryLabel}
      primaryHref={primaryHref}
      packshot={{ src: "/images/website/product-cooking.png", w: 869, h: 1046, alt: "Cuisine Foods 100% pure cooking oil – 20L bucket" }}
      packshotWidthClass="w-[200px] sm:w-[240px] lg:w-[320px]"
      motif={<div className="living-art h-full w-full"><LivingBotanical className="h-full w-full" id="cta" /></div>}
      motifClassName="left-1/2 top-1/2 h-[180%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-[0.2]"
    />
  );
}
