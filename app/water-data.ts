export type WaterAccessCountry = {
  code: string;
  name: string;
  atlasName: string;
  region: string;
  basicAccessPercent: number;
  lackingPercent: number;
  peopleWithoutBasicAccess: number;
  coordinates: [longitude: number, latitude: number];
};

export type CountryGivingRoute = {
  organization: string;
  project: string;
  summary: string;
  donationUrl: string;
  verificationUrl: string;
  verificationLabel: string;
  waterFocused: boolean;
};

export const WATER_ACCESS_COUNTRIES: WaterAccessCountry[] = [
  { code: "COD", name: "Democratic Republic of the Congo", atlasName: "Dem. Rep. Congo", region: "Sub Saharan Africa", basicAccessPercent: 35.7, lackingPercent: 64.3, peopleWithoutBasicAccess: 70285006, coordinates: [15.3222, -4.325] },
  { code: "CAF", name: "Central African Republic", atlasName: "Central African Rep.", region: "Sub Saharan Africa", basicAccessPercent: 36.5, lackingPercent: 63.5, peopleWithoutBasicAccess: 3384773, coordinates: [21.6407, 5.63056] },
  { code: "SSD", name: "South Sudan", atlasName: "S. Sudan", region: "Sub Saharan Africa", basicAccessPercent: 39.7, lackingPercent: 60.3, peopleWithoutBasicAccess: 7195970, coordinates: [31.6, 4.85] },
  { code: "BFA", name: "Burkina Faso", atlasName: "Burkina Faso", region: "Sub Saharan Africa", basicAccessPercent: 50, lackingPercent: 50, peopleWithoutBasicAccess: 11774706, coordinates: [-1.53395, 12.3605] },
  { code: "TCD", name: "Chad", atlasName: "Chad", region: "Sub Saharan Africa", basicAccessPercent: 52.2, lackingPercent: 47.8, peopleWithoutBasicAccess: 9701143, coordinates: [15.0445, 12.1048] },
  { code: "PNG", name: "Papua New Guinea", atlasName: "Papua New Guinea", region: "East Asia and Pacific", basicAccessPercent: 53.3, lackingPercent: 46.7, peopleWithoutBasicAccess: 4939387, coordinates: [147.194, -9.47357] },
  { code: "NER", name: "Niger", atlasName: "Niger", region: "Sub Saharan Africa", basicAccessPercent: 53.4, lackingPercent: 46.6, peopleWithoutBasicAccess: 12589679, coordinates: [2.1073, 13.514] },
  { code: "MDG", name: "Madagascar", atlasName: "Madagascar", region: "Sub Saharan Africa", basicAccessPercent: 55.3, lackingPercent: 44.7, peopleWithoutBasicAccess: 14275882, coordinates: [45.7167, -20.4667] },
  { code: "ETH", name: "Ethiopia", atlasName: "Ethiopia", region: "Sub Saharan Africa", basicAccessPercent: 55.6, lackingPercent: 44.4, peopleWithoutBasicAccess: 58639727, coordinates: [38.7468, 9.02274] },
  { code: "RWA", name: "Rwanda", atlasName: "Rwanda", region: "Sub Saharan Africa", basicAccessPercent: 61.4, lackingPercent: 38.6, peopleWithoutBasicAccess: 5504150, coordinates: [30.0587, -1.95325] },
  { code: "GNB", name: "Guinea Bissau", atlasName: "Guinea-Bissau", region: "Sub Saharan Africa", basicAccessPercent: 61.8, lackingPercent: 38.2, peopleWithoutBasicAccess: 840747, coordinates: [-15.1804, 11.8037] },
  { code: "UGA", name: "Uganda", atlasName: "Uganda", region: "Sub Saharan Africa", basicAccessPercent: 63, lackingPercent: 37, peopleWithoutBasicAccess: 18502682, coordinates: [32.5729, 0.314269] },
  { code: "TZA", name: "Tanzania", atlasName: "Tanzania", region: "Sub Saharan Africa", basicAccessPercent: 64.6, lackingPercent: 35.4, peopleWithoutBasicAccess: 24266208, coordinates: [35.7382, -6.17486] },
  { code: "TGO", name: "Togo", atlasName: "Togo", region: "Sub Saharan Africa", basicAccessPercent: 64.8, lackingPercent: 35.2, peopleWithoutBasicAccess: 2960265, coordinates: [1.2255, 6.1228] },
  { code: "SDN", name: "Sudan", atlasName: "Sudan", region: "Sub Saharan Africa", basicAccessPercent: 64.9, lackingPercent: 35.1, peopleWithoutBasicAccess: 17711767, coordinates: [32.5363, 15.5932] },
  { code: "KEN", name: "Kenya", atlasName: "Kenya", region: "Sub Saharan Africa", basicAccessPercent: 65.6, lackingPercent: 34.4, peopleWithoutBasicAccess: 19414853, coordinates: [36.8126, -1.27975] },
  { code: "BDI", name: "Burundi", atlasName: "Burundi", region: "Sub Saharan Africa", basicAccessPercent: 65.9, lackingPercent: 34.1, peopleWithoutBasicAccess: 4787611, coordinates: [29.3639, -3.3784] },
  { code: "MOZ", name: "Mozambique", atlasName: "Mozambique", region: "Sub Saharan Africa", basicAccessPercent: 66.6, lackingPercent: 33.4, peopleWithoutBasicAccess: 11558267, coordinates: [32.5713, -25.9664] },
  { code: "ZWE", name: "Zimbabwe", atlasName: "Zimbabwe", region: "Sub Saharan Africa", basicAccessPercent: 67.2, lackingPercent: 32.8, peopleWithoutBasicAccess: 5454241, coordinates: [31.0672, -17.8312] },
  { code: "AGO", name: "Angola", atlasName: "Angola", region: "Sub Saharan Africa", basicAccessPercent: 68, lackingPercent: 32, peopleWithoutBasicAccess: 12138345, coordinates: [13.242, -8.81155] },
  { code: "SLE", name: "Sierra Leone", atlasName: "Sierra Leone", region: "Sub Saharan Africa", basicAccessPercent: 68.1, lackingPercent: 31.9, peopleWithoutBasicAccess: 2758618, coordinates: [-13.2134, 8.4821] },
  { code: "BEN", name: "Benin", atlasName: "Benin", region: "Sub Saharan Africa", basicAccessPercent: 69.6, lackingPercent: 30.4, peopleWithoutBasicAccess: 4398571, coordinates: [2.6323, 6.4779] },
  { code: "CMR", name: "Cameroon", atlasName: "Cameroon", region: "Sub Saharan Africa", basicAccessPercent: 71.4, lackingPercent: 28.6, peopleWithoutBasicAccess: 8326426, coordinates: [11.5174, 3.8721] },
  { code: "SLB", name: "Solomon Islands", atlasName: "Solomon Is.", region: "East Asia and Pacific", basicAccessPercent: 71.6, lackingPercent: 28.4, peopleWithoutBasicAccess: 232578, coordinates: [159.949, -9.42676] },
  { code: "MWI", name: "Malawi", atlasName: "Malawi", region: "Sub Saharan Africa", basicAccessPercent: 73.1, lackingPercent: 26.9, peopleWithoutBasicAccess: 5835326, coordinates: [33.7703, -13.9899] },
  { code: "HTI", name: "Haiti", atlasName: "Haiti", region: "Latin America and Caribbean", basicAccessPercent: 73.3, lackingPercent: 26.7, peopleWithoutBasicAccess: 3141419, coordinates: [-72.3288, 18.5392] },
  { code: "ZMB", name: "Zambia", atlasName: "Zambia", region: "Sub Saharan Africa", basicAccessPercent: 73.4, lackingPercent: 26.6, peopleWithoutBasicAccess: 5667212, coordinates: [28.2937, -15.3982] },
  { code: "GIN", name: "Guinea", atlasName: "Guinea", region: "Sub Saharan Africa", basicAccessPercent: 74.2, lackingPercent: 25.8, peopleWithoutBasicAccess: 3807843, coordinates: [-13.7, 9.51667] },
  { code: "YEM", name: "Yemen", atlasName: "Yemen", region: "Middle East and North Africa", basicAccessPercent: 75, lackingPercent: 25, peopleWithoutBasicAccess: 10131278, coordinates: [44.2075, 15.352] },
  { code: "SOM", name: "Somalia", atlasName: "Somalia", region: "Sub Saharan Africa", basicAccessPercent: 75.3, lackingPercent: 24.7, peopleWithoutBasicAccess: 4696249, coordinates: [45.3254, 2.07515] },
  { code: "CIV", name: "Côte d’Ivoire", atlasName: "Côte d'Ivoire", region: "Sub Saharan Africa", basicAccessPercent: 77.2, lackingPercent: 22.8, peopleWithoutBasicAccess: 7265976, coordinates: [-4.0305, 5.332] },
  { code: "MRT", name: "Mauritania", atlasName: "Mauritania", region: "Sub Saharan Africa", basicAccessPercent: 77.3, lackingPercent: 22.7, peopleWithoutBasicAccess: 1174246, coordinates: [-15.9824, 18.2367] },
  { code: "STP", name: "São Tomé and Príncipe", atlasName: "São Tomé and Príncipe", region: "Sub Saharan Africa", basicAccessPercent: 78, lackingPercent: 22, peopleWithoutBasicAccess: 51918, coordinates: [6.6071, 0.20618] },
  { code: "LSO", name: "Lesotho", atlasName: "Lesotho", region: "Sub Saharan Africa", basicAccessPercent: 78.1, lackingPercent: 21.9, peopleWithoutBasicAccess: 512387, coordinates: [27.7167, -29.5208] },
  { code: "LBR", name: "Liberia", atlasName: "Liberia", region: "Sub Saharan Africa", basicAccessPercent: 78.8, lackingPercent: 21.2, peopleWithoutBasicAccess: 1188355, coordinates: [-10.7957, 6.30039] },
  { code: "KIR", name: "Kiribati", atlasName: "Kiribati", region: "East Asia and Pacific", basicAccessPercent: 79.1, lackingPercent: 20.9, peopleWithoutBasicAccess: 28157, coordinates: [172.979, 1.32905] },
  { code: "DJI", name: "Djibouti", atlasName: "Djibouti", region: "Middle East and North Africa", basicAccessPercent: 79.7, lackingPercent: 20.3, peopleWithoutBasicAccess: 237700, coordinates: [43.1425, 11.5806] },
];

export const COUNTRY_BY_ATLAS_NAME = new Map(
  WATER_ACCESS_COUNTRIES.map((country) => [country.atlasName, country]),
);

export const FOCUS_COUNTRY_COUNT = WATER_ACCESS_COUNTRIES.length;
export const PEOPLE_WITHOUT_BASIC_ACCESS = WATER_ACCESS_COUNTRIES.reduce(
  (sum, country) => sum + country.peopleWithoutBasicAccess,
  0,
);

export const WORLD_BANK_WATER_DATA_URL =
  "https://data.worldbank.org/indicator/SH.H2O.BASW.ZS";
export const WORLD_BANK_POPULATION_DATA_URL =
  "https://data.worldbank.org/indicator/SP.POP.TOTL";
export const JMP_REPORT_URL =
  "https://washdata.org/reports/jmp-2025-wash-households";
export const JMP_METHODS_URL =
  "https://washdata.org/topics/methods/estimation-methods";
export const WHO_WATER_LADDER_URL =
  "https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health/monitoring-and-evidence/wash-monitoring";
export const WHO_DRINKING_WATER_FACTS_URL =
  "https://www.who.int/news-room/fact-sheets/detail/drinking-water";
export const WHO_SMALL_SUPPLIES_URL =
  "https://www.who.int/publications/i/item/9789240088740";
export const WHO_BOREHOLE_GUIDANCE_URL =
  "https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health/water-safety-and-quality/water-safety-planning/borehole-with-a-motorized-pump";
export const UNICEF_CONFLICT_WASH_URL =
  "https://www.unicef.org/stories/fast-facts-water-sanitation-hygiene-conflict";
export const UNICEF_CLIMATE_WASH_URL =
  "https://www.unicef.org/wash/climate";

export const GLOBALGIVING_VETTING_URL =
  "https://www.globalgiving.org/aboutus/how-it-works/vetting/";

const globalGivingRoute = (
  organization: string,
  project: string,
  summary: string,
  slug: string,
  waterFocused = true,
): CountryGivingRoute => ({
  organization,
  project,
  summary,
  donationUrl: `https://www.globalgiving.org/projects/${slug}/`,
  verificationUrl: GLOBALGIVING_VETTING_URL,
  verificationLabel: "Read GlobalGiving’s vetting process",
  waterFocused,
});

export const COUNTRY_GIVING_ROUTES: Record<string, CountryGivingRoute> = {
  COD: globalGivingRoute(
    "ODDPH",
    "Bring Safe Water to Munigi’s Displaced Families",
    "Funds a deep well and local water access for displaced families in North Kivu.",
    "bring-safe-water-to-munigis-displaced-families",
  ),
  CAF: globalGivingRoute(
    "Association des Femmes pour le Développement Durable",
    "Provide Healthy Water and Food for 5,953 Children",
    "Funds water drilling and school food gardens in rural Central African Republic.",
    "provide-healthy-water-and-food-for-5953-children",
  ),
  SSD: globalGivingRoute(
    "Alaska Sudan Medical Project",
    "Food and Water for Refugees in South Sudan",
    "Funds new wells and farming support for refugee communities in South Sudan.",
    "clean-water-for-1500-refugees-in-south-sudan",
  ),
  BFA: globalGivingRoute(
    "BARKA Foundation",
    "Clean Water for Rural Villagers in Burkina Faso",
    "Funds clean water, sanitation and community led water management in eastern Burkina Faso.",
    "barka-peace-water-wisdom",
  ),
  TCD: globalGivingRoute(
    "Community of National Artistic Unity",
    "The Emergency Aid for Vulnerable",
    "Supports families in Chad with food, clean water and longer term help for farming.",
    "emergency-aid",
    false,
  ),
  PNG: {
    organization: "Nazarene Compassionate Ministries",
    project: "Asia Pacific Bible College Campus WASH Project",
    summary:
      "Funds a well, solar pump and water system for a campus community in Papua New Guinea.",
    donationUrl: "https://give.ncm.org/donate/140094",
    verificationUrl: "https://give.ncm.org/donate/140094",
    verificationLabel: "Check the organization’s project page",
    waterFocused: true,
  },
  NER: globalGivingRoute(
    "Les Puits du Désert",
    "Clean Water for Tafadek, Agadez Region, Niger",
    "Funds a solar powered water system, fountains and sanitation for Tafadek.",
    "clean-water-for-tafadek-agadez-region-niger",
  ),
  MDG: globalGivingRoute(
    "SEED Madagascar",
    "Making Access to Water Sustainable in Madagascar",
    "Keeps clean water systems working across 30 rural communities.",
    "making-access-to-water-sustainable-in-madagascar",
  ),
  ETH: globalGivingRoute(
    "HOPE International Development Agency",
    "Changing the Future with Clean Water",
    "Funds clean water systems and hygiene training with rural communities in southern Ethiopia.",
    "changing-the-future-with-clean-water",
  ),
  RWA: globalGivingRoute(
    "Fields of Hope",
    "Give Safe Water to 731 Families in Rwanda",
    "Funds four boreholes, household filters and water safety training in southern Rwanda.",
    "give-safe-water-to-731-vulnerable-families-in-need",
  ),
  GNB: globalGivingRoute(
    "WellFound",
    "Water, Health and Women’s Empowerment in Guinea Bissau",
    "Funds clean water pumps, family toilets, gardens and local maintenance training.",
    "water-health-and-womens-empowerment-guinea-bissau",
  ),
  UGA: globalGivingRoute(
    "Field for Humanity",
    "Uganda Water Project",
    "Funds water points and kiosks serving rural villages in Uganda.",
    "uganda-water-project",
  ),
  TZA: globalGivingRoute(
    "Tanzania Development Trust",
    "Bring Clean Water to 100 Villages in Tanzania",
    "Funds boreholes, rope pumps and local water work in Tanzanian villages.",
    "post-covid-recovery-for-tanzania",
  ),
  TGO: globalGivingRoute(
    "Association pour une Jeunesse Sans Frontière",
    "Clean Water to Communities in Northern Togo",
    "Funds boreholes, pumps and water committees in underserved villages in northern Togo.",
    "clean-water-to-communities-in-northern-togo",
  ),
  SDN: globalGivingRoute(
    "Kids for Kids",
    "Water, the Gift of Life, for Children in Darfur",
    "Funds community water access for children and families in Darfur, Sudan.",
    "water-for-children-in-darfur",
  ),
  KEN: globalGivingRoute(
    "Brighter Communities Worldwide",
    "Clean Water for Kenyan Families",
    "Funds clean water, latrines and hygiene education for families and schools in Kenya.",
    "clean-water-kenyan-families-when-every-drop-counts",
  ),
  BDI: globalGivingRoute(
    "JRMD",
    "Supply Clean Water to a School and Orphanage",
    "Funds the solar pump, tanks and pipes for a school, orphanage and nearby village in Burundi.",
    "supplying-clean-water-to-the-orphanage-school",
  ),
  MOZ: globalGivingRoute(
    "Water Underground",
    "Give Water and Hope to Two Villages in Mozambique",
    "Funds water infrastructure for two communities in Mozambique.",
    "cleanwater-for-a-whole-mozambican-community",
  ),
  ZWE: globalGivingRoute(
    "Action Change",
    "Help Provide Access to Clean Water in Zimbabwe",
    "Funds community water pumps, materials and long term system support in Zimbabwe.",
    "preventing-drought-and-water-crisis-in-zimbabwe",
  ),
  AGO: globalGivingRoute(
    "Community of National Artistic Unity",
    "Angola Lifeline Project",
    "Funds food, clean water and education support for vulnerable communities in Angola.",
    "emergency-relief-and-food-security",
  ),
  SLE: globalGivingRoute(
    "WellFound",
    "Water, Sanitation and Sustainability in Sierra Leone",
    "Funds a village well, sanitation facilities and community gardens in Sierra Leone.",
    "water-sanitation-and-sustainability-guinea-bissau",
  ),
  BEN: globalGivingRoute(
    "BIO BENIN",
    "Protect Waterways, Protect Life",
    "Restores riverbanks that protect freshwater, farming and fishing in northern Benin.",
    "environmentalwatershedprotection",
  ),
  CMR: globalGivingRoute(
    "Integrated Agricultural Association",
    "Give Clean Water to Communities in Cameroon",
    "Funds wells, boreholes, rainwater systems and sanitation in Cameroonian communities.",
    "give-clean-water-to-needy-communities-in-cameroon",
  ),
  SLB: {
    organization: "ADRA Australia",
    project: "Turn on the Tap",
    summary:
      "Funds fresh water, safer toilets and hygiene education in schools in the Solomon Islands.",
    donationUrl: "https://adra.org.au/project/turn-on-the-tap/",
    verificationUrl: "https://adra.org.au/project/turn-on-the-tap/",
    verificationLabel: "Check the organization’s project page",
    waterFocused: true,
  },
  MWI: globalGivingRoute(
    "Water Wells for Africa",
    "Your Gift of Water for Women and Children of Malawi",
    "Funds a well, hygiene education and local maintenance training in rural Malawi.",
    "your-gift-of-water-for-women-and-children-of-malawi",
  ),
  HTI: globalGivingRoute(
    "Poured Out",
    "Sustain Clean Water Access for Haitian Communities",
    "Funds filters, repairs and Haitian water technicians who maintain community WaterHouse systems.",
    "sustain-clean-water-access-for-haitian-communities",
  ),
  ZMB: globalGivingRoute(
    "Kukula Solar",
    "Solar Water Pump and Irrigation Project",
    "Funds solar water pumps and training for small farmers in eastern Zambia.",
    "solar-water-pump-and-irrigation-project",
  ),
  GIN: globalGivingRoute(
    "David Shepherd Wildlife Foundation",
    "Protecting Chimpanzees",
    "Supports rescue, conservation and community education work in Guinea.",
    "protecting-chimpanzees",
    false,
  ),
  YEM: globalGivingRoute(
    "Support Yemeni Society Organization for Development",
    "Provide Clean Water for 5,000 Displaced People in Yemen",
    "Funds drinking water, tanks, hygiene kits and sanitation for displaced families in Sana’a.",
    "provide-clean-water-for-5000-idps-in-yemen",
  ),
  SOM: globalGivingRoute(
    "Accept International",
    "Humanitarian Aid for People in Somalia",
    "Funds clean water, hygiene items, nutrition and medical support in underserved displacement camps.",
    "provid-humanitalian-aid-for-people-in-somalia",
  ),
  CIV: globalGivingRoute(
    "Pallottine Missionary Foundation Salvatti",
    "A School for Children with No Chance for Education",
    "Funds a school and support for children in Brobo, Côte d’Ivoire.",
    "education-changes-the-world-help-me-go-to-school",
    false,
  ),
  MRT: globalGivingRoute(
    "Social Innovation Cluster for Change",
    "Life Saving Digital Healthcare in Mauritania",
    "Funds community health tools and support for mothers and children in rural Mauritania.",
    "life-saving-digital-healthcare-in-mauritania",
    false,
  ),
  STP: {
    organization: "ONG Fundação Príncipe",
    project: "Community and Conservation Work on Príncipe",
    summary:
      "Supports community development and biodiversity work on Príncipe in São Tomé and Príncipe.",
    donationUrl: "https://fundacaoprincipe.org/pt/como-apoiar",
    verificationUrl: "https://fundacaoprincipe.org/pt/como-apoiar",
    verificationLabel: "Check the organization’s donation page",
    waterFocused: false,
  },
  LSO: globalGivingRoute(
    "Educare Fund",
    "Help Educate 40 Bright Girls in Lesotho",
    "Funds school fees, books and supplies for girls in Lesotho.",
    "help-educate-40-bright-girls-in-lesotho",
    false,
  ),
  LBR: globalGivingRoute(
    "Civic Village International",
    "Increasing Water Security for All in Rural Liberia",
    "Funds purification, rainwater systems, pumps and community water stations in rural Liberia.",
    "improve-access-to-clean-water-in-rural-liberia",
  ),
  KIR: {
    organization: "Kindling Kiribati",
    project: "Support I-Kiribati Women",
    summary:
      "Funds business education and small loans for women living in Kiribati.",
    donationUrl: "https://www.paypal.me/kindlingkiribati",
    verificationUrl: "https://kindlingkiribati.org/our-impact/",
    verificationLabel: "Read the organization’s impact reports",
    waterFocused: false,
  },
  DJI: {
    organization: "DJIB SOLIDEV",
    project: "Clean Water Wells in Djibouti",
    summary:
      "Supports a Djiboutian association that reports building drinking water wells across the country.",
    donationUrl: "https://djibsolidev.org/",
    verificationUrl: "https://djibsolidev.org/",
    verificationLabel: "Check the local organization’s website",
    waterFocused: true,
  },
};
