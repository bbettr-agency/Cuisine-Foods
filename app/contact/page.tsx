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
import { LeadForm } from "@/components/funnel/lead-form";

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
      <Container className="pt-8 lg:pt-12"><Breadcrumbs items={crumbs} /></Container>
      <Section className="pt-4">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Contact details */}
          <div>
            <SectionHeading eyebrow="Contact" title="Let's talk oil — in and out" intro="Bulk supply or used-oil collection, we'll come back quickly. WhatsApp is usually fastest." as="h1" />
            <div className="mt-8 space-y-3">
              <a href={telUrl} className="flex items-center gap-3 text-ink hover:text-brand-700"><Phone className="h-5 w-5 text-brand-600" /> {site.contact.phone.display}</a>
              <a href={whatsappUrl(whatsappPrefill.general)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink hover:text-brand-700"><span className="text-[#25D366]">◍</span> WhatsApp {site.contact.whatsapp.display}</a>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 text-ink hover:text-brand-700"><Mail className="h-5 w-5 text-brand-600" /> {site.contact.email}</a>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {site.branches.map((b) => (
                <div key={b.id}>
                  <p className="flex items-center gap-2 font-semibold text-ink"><MapPin className="h-4 w-4 text-brand-600" /> {b.label}</p>
                  <p className="mt-1 text-sm text-ink-soft">{b.street}, {b.city}, {b.postalCode}</p>
                  <p className="text-xs text-ink-faint">{site.contact.hours}</p>
                  <div className="mt-3"><Button href={b.mapLink} variant="outline" size="md" external>Open in Maps</Button></div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote form */}
          <Reveal>
            <div id="quote">
              <LeadForm defaultIntent="supply" />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
