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
  "https://data.unicef.org/resources/jmp-report-2025/";
export const WHO_WATER_LADDER_URL =
  "https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health/monitoring-and-evidence/wash-monitoring";
export const WHO_SMALL_SUPPLIES_URL =
  "https://www.who.int/publications/i/item/9789240088740";

export const CHARITY_WATER_DONATION_URL =
  "https://www.charitywater.org/donate";
export const CHARITY_WATER_METHOD_URL =
  "https://www.charitywater.org/donate/water-project-sponsorship";
export const CHARITY_WATER_VERIFICATION_URL =
  "https://www.charitynavigator.org/ein/223936753";
