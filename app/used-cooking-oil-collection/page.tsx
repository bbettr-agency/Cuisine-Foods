import type { Metadata } from "next";
import { pillars } from "@/config/pillars";
import { buildMetadata } from "@/lib/metadata";
import { UcoPillarView } from "@/views/uco-pillar";

const pillar = pillars.uco;
export const metadata: Metadata = buildMetadata({ title: pillar.metaTitle, description: pillar.metaDescription, path: `/${pillar.slug}` });
export default function Page() {
  return <UcoPillarView pillar={pillar} />;
}
