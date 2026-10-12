import { ProductCta } from "@/components/product/product-cta";
import { SoyaRibbon } from "@/components/soya/ribbon";

/**
 * SoyaCta – the closing campaign beat for /soya-oil. Delegates to the shared
 * ProductCta with the Soya packshot and the Pour (liquid ribbon) motif.
 */
export function SoyaCta({
  title, body, primaryLabel, primaryHref,
}: { title: string; body: string; primaryLabel: string; primaryHref: string }) {
  return (
    <ProductCta
      title={title}
      body={body}
      primaryLabel={primaryLabel}
      primaryHref={primaryHref}
      packshot={{ src: "/images/website/product-cooking.png", w: 869, h: 1046, alt: "Cuisine Foods soya oil – bulk pail" }}
      motif={<SoyaRibbon className="h-full w-full" />}
      motifClassName="left-1/2 top-1/2 h-[160%] w-[90%] -translate-x-1/2 -translate-y-1/2 opacity-[0.22]"
    />
  );
}
