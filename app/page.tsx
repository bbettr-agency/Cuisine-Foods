import type { Metadata } from "next";
import { home } from "@/config/home";
import { getFaqs } from "@/config/faqs";
import { buildMetadata } from "@/lib/metadata";
import { faqPageSchema } from "@/lib/schema";
import { seo } from "@/config/seo";

import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/funnel/trust-bar";
import { OfferCards } from "@/components/sections/offer-cards";
import { WhyUs } from "@/components/sections/why-us";
import { Industries } from "@/components/sections/industries";
import { Coverage } from "@/components/sections/coverage";
import { HowItWorks } from "@/components/sections/how-it-works";
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
      <Hero />
      <TrustBar />
      <OfferCards />
      <WhyUs />
      <Industries />
      <Coverage />
      <HowItWorks />
      <FaqSection ids={[...home.faqIds]} alt />
      <CtaBand title={home.closing.title} body={home.closing.body} />
    </>
  );
}
