import { ProductCta } from "@/components/product/product-cta";
import { SunflowerBotanical } from "@/components/sunflower/botanical";

/**
 * SunflowerCta – the closing campaign beat for /sunflower-oil. Delegates to the
 * shared ProductCta with the Sunflower packshot and the Bloom botanical motif.
 */
export function SunflowerCta({
  title,
  body,
  primaryLabel,
  primaryHref,
}: {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
}) {
  return (
    <ProductCta
      title={title}
      body={body}
      primaryLabel={primaryLabel}
      primaryHref={primaryHref}
      packshot={{ src: "/images/website/product-sunflower.png", w: 837, h: 1024, alt: "Cuisine Foods 100% pure sunflower oil – bulk pail" }}
      motif={<div className="sf-botanical h-full w-full"><SunflowerBotanical className="h-full w-full" /></div>}
      motifClassName="left-1/2 top-1/2 h-[150%] w-[130%] -translate-x-1/2 -translate-y-[52%] opacity-[0.17]"
    />
  );
}
