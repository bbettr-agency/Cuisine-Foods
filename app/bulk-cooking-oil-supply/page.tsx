import type { Metadata } from "next";
import { pillars } from "@/config/pillars";
import { buildMetadata } from "@/lib/metadata";
import { CookingOilView } from "@/views/cooking-oil-view";

const pillar = pillars.supply;
export const metadata: Metadata = buildMetadata({ title: pillar.metaTitle, description: pillar.metaDescription, path: `/${pillar.slug}` });
export default function Page() {
  return <CookingOilView pillar={pillar} />;
}
