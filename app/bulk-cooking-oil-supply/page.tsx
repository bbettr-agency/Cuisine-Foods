import type { Metadata } from "next";
import { pillars } from "@/config/pillars";
import { buildMetadata } from "@/lib/metadata";
import { PillarView } from "@/views/pillar";

const pillar = pillars.supply;
export const metadata: Metadata = buildMetadata({ title: pillar.metaTitle, description: pillar.metaDescription, path: `/${pillar.slug}` });
export default function Page() {
  return <PillarView pillar={pillar} />;
}
