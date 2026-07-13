import type { Metadata } from "next";
import { getProvince } from "@/config/locations";
import { buildMetadata } from "@/lib/metadata";
import { LocationProvinceView } from "@/views/location-province";

const province = getProvince("western-cape")!;
export const metadata: Metadata = buildMetadata({ title: province.metaTitle, description: province.metaDescription, path: `/${province.slug}` });
export default function Page() {
  return <LocationProvinceView province={province} />;
}
