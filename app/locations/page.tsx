import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { LocationsView } from "@/views/locations-view";

export const metadata: Metadata = buildMetadata({
  title: "Locations & Coverage Across South Africa | Cuisine Foods",
  description:
    "Where Cuisine Foods operates: regional hubs in Gauteng and the Western Cape, with KwaZulu-Natal opening soon. One national commercial cooking-oil supply and used-oil recovery network.",
  path: "/locations",
});

export default function Page() {
  return <LocationsView />;
}
