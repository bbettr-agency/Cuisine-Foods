/**
 * GHL FIELD MAP – the Cuisine Foods enquiry form, mirrored from GoHighLevel.
 *
 * GENERATED from the live sub-account (read-only) – field IDs, keys and option
 * values are EXACT copies of what the official form "Cuisine Foods (Phase 2) -
 * Copy" (5qCMWMxLFGwkpxTkDvRg) writes. Do not "tidy" any value: GHL matches
 * options by exact string (the Centurion option, for instance, really does start
 * with an invisible character). None of this is secret – IDs are public in the
 * official form – so the file is shared by the browser form and the server route.
 */
export type GhlField = { id: string; key: string; label: string; required: boolean; options: string[] };

export const GHL_LOCATION_ID = "HzftIvKXZGCy4lvw09vh";

export const ghlFields = {
  businessType: { id: "qBtflB9H3QDPLbx6Jitn", key: "contact.what_best_discribes_your_business", label: "What best describes your business?", required: true, options: ["Restaurant/Takeaway", "Caterer", "Food Manufacturer", "Oil reseller / Distributer", "Private label / branded oil buyer"] },
  oilType: { id: "w9dWkE4mLd5le8Pjn7wx", key: "contact.oil_type", label: "Oil type", required: true, options: ["Sunflower Oil", "Palm Olein", "Soya Oil", "Sunflower & Palm", "Used Oil Collection"] },
  volume: { id: "FYqi2AAG27iwXEBnjqkG", key: "contact.estimated_monthly_volume", label: "Estimated monthly volume", required: true, options: ["3–5 x 20L buckets", "6–23 x 20L buckets", "24+ x 20L buckets (bulk pricing)", "1–5 Tons", "5+ Tons"] },
  province: { id: "VjXdXxTnXCF12t3OPei0", key: "contact.location", label: "Province", required: true, options: ["Gauteng", "North-West", "Western Cape", "Free State", "Limpopo", "Mpumalanga", "KwaZulu-Natal", "Eastern Cape", "Northern Cape"] },
  gautengRegion: { id: "keBf9EvEl1C4QNL9R4em", key: "contact.select_area", label: "Region", required: true, options: ["Johannesburg", "Tshwane", "Ekurhuleni", "Sedibeng", "West Rand"] },
  capeTownRegion: { id: "Moi5qvm9vN5gxM0KsEWS", key: "contact.select_your_cape_town_region", label: "Cape Town region", required: true, options: ["Lower Northern Suburbs", "Upper Northern Suburbs", "Cape Flats", "Eastern Suburbs", "Cape Winelands District", "West-Coast Suburbs & Century City", "Upper Southern Suburbs", "Lower Southern Suburbs & South Peninsula", "City Bowl & Outskirts", "Atlantic Seaboard"] },
  northWestArea: { id: "mRSHR72TmA0ZJ7QTmDv8", key: "contact.select_area_in_north_west", label: "Your area in North West", required: false, options: ["Carletonville", "Delareyville", "Fochville", "Genesa", "Groot Marico", "Heidelberg", "Klerksdorp", "Kroonstad", "Lichtenburg", "Mafikeng", "Orkney", "Ottosdal", "Parys", "Potchefstroom", "Rustenburg", "Vanderbijlpark", "Vereeniging", "Viljoenskroon", "Vryburg", "Wolmaransstad", "Zeerust"] },
} satisfies Record<string, GhlField>;

/** Oil type value that marks a used-oil collection enquiry (existing GHL option). */
export const UCO_OIL_TYPE = "Used Oil Collection";

/** Province → the follow-up question GHL shows (same rules as the official form). */
export const provinceFollowUp: Record<string, "gautengRegion" | "capeTownRegion" | "northWestArea"> = {
  Gauteng: "gautengRegion",
  "Western Cape": "capeTownRegion",
  "North-West": "northWestArea",
};

/** Region → its own area question (same rules as the official form). */
export const areaFieldByRegion: Record<string, GhlField> = {
  "Johannesburg": { id: "4ZGWxIVSnI4DsoOAbLBI", key: "contact.contactselect_area_jr4_copy", label: "Your area in Johannesburg", required: true, options: ["Johannesburg CBD", "Sandton", "Randburg", "Roodepoort", "Midrand", "Soweto"] },
  "Tshwane": { id: "CLQdlrV8g36ve1sxbLvF", key: "contact.contactselect_area_jr4_copy_q8n_copy", label: "Your area in Pretoria", required: true, options: ["Pretoria CBD", "⁠Centurion", "Akasia", "Soshanguve", "Mabopane", "Bronkorstspruit"] },
  "Ekurhuleni": { id: "hIFARtCDXbWJBlCsrEaR", key: "contact.contactselect_area_jr4_copy_q8n_copy_wgx_copy", label: "Your area in Ekurhuleni", required: true, options: ["Germiston", "Kempton Park", "Benoni", "Boksburg", "Brakpan", "Springs", "Nigel", "Alberton"] },
  "Sedibeng": { id: "8ejBjUOTpmfMJmQCtv2f", key: "contact.contactselect_area_jr4_copy_q8n_copy_wgx_copy_gbd_copy", label: "Your area in Sedibeng", required: true, options: ["Vanderbijlpark", "Vereeniging", "Meyerton", "Henley-on-Klip", "Heidelberg", "Ratanda", "Nigel", "Alberton"] },
  "West Rand": { id: "JS3h1Oj271McndI5JuKz", key: "contact.contactselect_area_jr4_copy_q8n_copy_wgx_copy_gbd_copy_wwg_copy", label: "Your area in the West Rand", required: true, options: ["Krugersdorp", "Magaliesburg", "Carletonville", "Fochville", "Randfontein", "Westonaria", "Ratanda", "Nigel", "Alberton"] },
  "Lower Northern Suburbs": { id: "5D8i6GawHPY4TB1ZIaOq", key: "contact.select_your_area_lower_northern_suburbs", label: "Your area in Lower Northern Suburbs", required: true, options: ["Panorama", "Edgemead", "Bothasig", "Plattekloof", "Durbanville", "Goodwood", "Parow", "Burgundy Estate"] },
  "Upper Northern Suburbs": { id: "Lh67UmqHb6XaRSzH80sc", key: "contact.upper_northern_suburbs", label: "Your area in Upper Northern Suburbs", required: true, options: ["Bellville North", "Oakdale", "Boston", "Brackenfell", "Tyger Valley", "Kraaifontein"] },
  "Cape Flats": { id: "D2txbV2COhlNq9ePxerG", key: "contact.cape_flats", label: "Your area in Cape Flats", required: true, options: ["Khayelitsha", "Eerste River", "Blue Downs", "Mandela Park", "Mitchells Plain"] },
  "Eastern Suburbs": { id: "h4lsOQnzPMtJUHiL9hSC", key: "contact.eastern_suburbs", label: "Your area in Eastern Suburbs", required: true, options: ["Kuils River", "Blue Downs", "Delft", "Belville South", "Airport Industria / Matroosfontein", "Belhar"] },
  "Cape Winelands District": { id: "hNoIvTqQjHwVjWWrXtSi", key: "contact.cape_winelands_district", label: "Your area in Cape Winelands District", required: false, options: ["Paarl", "Wellington", "Stellenbosch", "Klapmuts"] },
  "West-Coast Suburbs & Century City": { id: "z5iUq03eha5jAM5eCz3X", key: "contact.westcoast_suburbs__century_city", label: "Your area in West-Coast Suburbs & Century City", required: true, options: ["Milnerton", "Table View", "Montague Gardens", "Killarney Gardens", "Blouberg", "Parklands", "Sunningdale", "Century City", "Maitland", "Kensington"] },
  "Upper Southern Suburbs": { id: "AmQlJxf1mSMBL7oHrw4i", key: "contact.upper_southern_suburbs", label: "Your area in Upper Southern Suburbs", required: true, options: ["Observatory", "Mowbray", "Rondebosch", "Claremont", "Newlands", "Wynberg", "Plumstead", "Athlone", "Retreat", "Grassy Park", "Ottery", "Kenilworth", "Diep River"] },
  "Lower Southern Suburbs & South Peninsula": { id: "5H0DBNLGDjQ4b0v7ejAB", key: "contact.lower_southern_suburbs__south_peninsula", label: "Your area in Lower Southern Suburbs & South Peninsula", required: true, options: ["Bergvliet", "Tokai", "Constantia", "Muizenberg", "Lakeside", "Steenberg", "Hout Bay", "Kalk Bay", "Simon's Town", "Kommetjie", "Noordhoek", "Fish Hoek"] },
  "City Bowl & Outskirts": { id: "BYzqEr9aM4vFbPFnkvUQ", key: "contact.city_bowl__outskirts", label: "Your area in City Bowl & Outskirts", required: true, options: ["Cape Town City Bowl", "Foreshore", "Gardens", "Tamboerskloof", "Oranjezicht", "Vredehoek", "De Waterkant", "Woodstock", "Salt River", "Bo-Kaap"] },
  "Atlantic Seaboard": { id: "VcrDUwPhZBYgu0s3EsfB", key: "contact.atlantic_seaboard", label: "Your area in Atlantic Seaboard", required: false, options: ["V&A Waterfront", "Green Point", "Sea Point", "Mouille Point", "Bantry Bay", "Clifton", "Camps Bay", "Fresnaye"] },
};
