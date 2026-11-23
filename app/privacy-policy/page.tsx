import type { Metadata } from "next";
import { site } from "@/config/site";
import { telUrl } from "@/config/conversion";
import { privacyPolicy, privacySections, type PolicyBlock } from "@/config/privacy";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Section } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ResetAdChoice } from "@/components/funnel/meta-pixel";

// Indexable only once the business has confirmed the open items and the policy has been reviewed.
export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Cuisine Foods",
  description:
    "How Cuisine Foods collects, uses and protects personal information from website enquiries – including our enquiry forms, advertising measurement, cookies and your rights under POPIA.",
  path: privacyPolicy.path,
  noindex: !privacyPolicy.reviewed,
});

function Block({ block }: { block: PolicyBlock }) {
  if (typeof block === "string") return <p className="mt-4 leading-relaxed text-ink-soft">{block}</p>;
  if ("list" in block) {
    return (
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-ink-soft marker:text-gold-600">
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <div className="mt-5 overflow-x-auto rounded-[var(--radius)] border border-line">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-surface-2">
            {block.table.head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-semibold text-ink">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.table.rows.map(([a, b]) => (
            <tr key={a} className="border-t border-line align-top odd:bg-surface even:bg-surface-2/40">
              <td className="px-4 py-3 text-ink">{a}</td>
              <td className="px-4 py-3 text-ink-soft">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Privacy Policy", path: privacyPolicy.path }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Container className="pt-10 lg:pt-16"><Breadcrumbs items={crumbs} /></Container>
      <Section className="pt-4">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow mb-3">Privacy</p>
          <h1 className="text-display text-ink">Privacy Policy</h1>
          <p className="mt-4 text-sm text-ink-faint">Last updated: {privacyPolicy.lastUpdated}</p>

          {!privacyPolicy.reviewed && (
            <p role="note" className="mt-6 rounded-[var(--radius)] border border-gold-500/40 bg-gold-100/40 p-4 text-sm leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">This policy is being finalised.</span> It describes how this website handles
              personal information today and is subject to final review.
            </p>
          )}

          {/* On this page */}
          <nav aria-label="On this page" className="mt-8 rounded-[var(--radius)] border border-line bg-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">On this page</p>
            <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              {privacySections.map((s) => (
                <li key={s.id}><a href={`#${s.id}`} className="text-brand-700 hover:underline">{s.title}</a></li>
              ))}
            </ol>
          </nav>

          {privacySections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28 pt-10">
              <h2 className="font-display text-2xl font-bold text-ink">{s.title}</h2>
              {s.blocks.map((b, i) => (
                <Block key={i} block={b} />
              ))}

              {s.id === "who-we-are" && (
                <dl className="mt-5 grid gap-4 rounded-[var(--radius)] border border-line bg-surface p-5 text-sm sm:grid-cols-2">
                  {site.offices.map((o) => (
                    <div key={o.id}>
                      <dt className="font-semibold text-ink">{o.label} office</dt>
                      <dd className="mt-1 text-ink-soft">{o.address}</dd>
                    </div>
                  ))}
                  <div>
                    <dt className="font-semibold text-ink">Telephone</dt>
                    <dd className="mt-1"><a href={telUrl} className="text-brand-700 hover:underline">{site.contact.phone.display}</a></dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Email</dt>
                    <dd className="mt-1"><a href={`mailto:${site.contact.email}`} className="text-brand-700 hover:underline">{site.contact.email}</a></dd>
                  </div>
                </dl>
              )}

              {s.id === "cookies" && <ResetAdChoice />}

              {s.id === "your-rights" && (
                <p className="mt-4 leading-relaxed text-ink-soft">
                  Information Regulator (South Africa):{" "}
                  <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 hover:underline">inforegulator.org.za</a>
                </p>
              )}
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
