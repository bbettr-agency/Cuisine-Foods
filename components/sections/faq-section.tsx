import { getFaqs } from "@/config/faqs";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqList } from "@/components/shared/faq-list";

export function FaqSection({
  ids,
  title = "Common questions",
  eyebrow = "FAQ",
  alt = false,
}: {
  ids: string[];
  title?: string;
  eyebrow?: string;
  alt?: boolean;
}) {
  const faqs = getFaqs(ids);
  if (faqs.length === 0) return null;
  return (
    <Section alt={alt}>
      <SectionHeading eyebrow={eyebrow} title={title} align="center" />
      <div className="mt-10">
        <FaqList faqs={faqs} />
      </div>
    </Section>
  );
}
