import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { telUrl, whatsappUrl, whatsappPrefill } from "@/config/conversion";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Section } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/funnel/enquiry-form";

export const metadata: Metadata = buildMetadata({
  title: "Contact Cuisine Foods | Gauteng & Western Cape",
  description: "Contact Cuisine Foods for bulk cooking oil supply or used cooking oil collection. Call, WhatsApp or request a quote. Branches in Centurion & Cape Town.",
  path: "/contact",
});

export default function ContactPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Container className="pt-10 lg:pt-16"><Breadcrumbs items={crumbs} /></Container>
      <Section className="pt-4">
        <div className="mx-auto max-w-3xl">
          {/* Contact details */}
          <div>
            <SectionHeading eyebrow="Contact" title="Let's talk oil – in and out" intro="Bulk supply or used-oil collection, we'll come back quickly. WhatsApp is usually fastest." as="h1" />
            <div className="mt-8 space-y-3">
              <a href={telUrl} className="flex items-center gap-3 text-ink hover:text-brand-700"><Phone className="h-5 w-5 text-brand-600" /> {site.contact.phone.display}</a>
              <a href={whatsappUrl(whatsappPrefill.general)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink hover:text-brand-700"><span className="text-gold-600">◍</span> WhatsApp {site.contact.whatsapp.display}</a>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 text-ink hover:text-brand-700"><Mail className="h-5 w-5 text-brand-600" /> {site.contact.email}</a>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {site.offices.map((b) => (
                <div key={b.id}>
                  <p className="flex items-center gap-2 font-semibold text-ink"><MapPin className="h-4 w-4 text-brand-600" /> {b.label}</p>
                  <p className="mt-1 text-sm text-ink-soft">{b.address}</p>
                  <p className="text-xs text-ink-faint">{b.open ? site.contact.hours : b.statusNote}</p>
                  <div className="mt-3"><Button href={b.mapLink} variant="outline" size="md" external>Open in Maps</Button></div>
                </div>
              ))}
            </div>
          </div>

          {/* The site-wide custom form (official GHL form remains its built-in fallback). */}
          <Reveal>
            <div id="quote" className="mt-12 scroll-mt-28">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
