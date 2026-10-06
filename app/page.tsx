import type { Metadata } from "next";
import { home } from "@/config/home";
import { getFaqs } from "@/config/faqs";
import { buildMetadata } from "@/lib/metadata";
import { faqPageSchema } from "@/lib/schema";
import { seo } from "@/config/seo";

import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { ProductsLineup } from "@/components/sections/products-lineup";
import { ProductJourney } from "@/components/motion/product-journey";
import { CredibilityBand } from "@/components/sections/credibility-band";
import { NationalFootprint } from "@/components/sections/national-footprint";
import { ClosedLoop } from "@/components/sections/closed-loop";
import { WhyUs } from "@/components/sections/why-us";
import { Industries } from "@/components/sections/industries";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/funnel/cta-band";

export const metadata: Metadata = buildMetadata({
  title: seo.defaultTitle,
  description: seo.defaultDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqPageSchema(getFaqs([...home.faqIds]))} />
      {/* Hero → Products cinematic drum journey (one persistent object). */}
      <ProductJourney>
        <Hero />
        <ProductsLineup />
      </ProductJourney>
      {/* V2 national narrative, with a deliberate tonal rhythm (paper → warm
          surface → INK peak → paper → warm → paper → warm → INK close):
          who we are/sell → national credibility → national footprint (ink) →
          supply + recovery → who we serve → why Cuisine → FAQ → conversion. */}
      <CredibilityBand />
      <NationalFootprint />
      <ClosedLoop />
      <Industries />
      <WhyUs />
      <FaqSection ids={[...home.faqIds]} alt />
      <CtaBand title={home.closing.title} body={home.closing.body} />
    </>
  );
}
