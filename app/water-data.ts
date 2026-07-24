export type WaterStressCountry = {
  code: string;
  name: string;
  region: string;
  score: number;
  coordinates: [longitude: number, latitude: number];
};

export const WATER_STRESS_COUNTRIES: WaterStressCountry[] = [
  { code: "BHR", name: "Bahrain", region: "Middle East & North Africa", score: 5, coordinates: [50.5425, 26.0417] },
  { code: "CYP", name: "Cyprus", region: "Europe & Central Asia", score: 5, coordinates: [33.0056, 34.9172] },
  { code: "KWT", name: "Kuwait", region: "Middle East & North Africa", score: 5, coordinates: [47.5882, 29.3333] },
  { code: "LBN", name: "Lebanon", region: "Middle East & North Africa", score: 5, coordinates: [35.878, 33.9212] },
  { code: "OMN", name: "Oman", region: "Middle East & North Africa", score: 5, coordinates: [56.0622, 20.586] },
  { code: "QAT", name: "Qatar", region: "Middle East & North Africa", score: 5, coordinates: [51.1844, 25.3048] },
  { code: "ARE", name: "United Arab Emirates", region: "Middle East & North Africa", score: 4.999991, coordinates: [54.2927, 23.9051] },
  { code: "SAU", name: "Saudi Arabia", region: "Middle East & North Africa", score: 4.980808, coordinates: [44.6632, 24.0865] },
  { code: "ISR", name: "Israel", region: "Middle East & North Africa", score: 4.941652, coordinates: [34.9997, 31.4516] },
  { code: "EGY", name: "Egypt", region: "Middle East & North Africa", score: 4.851625, coordinates: [29.8779, 26.4596] },
  { code: "LBY", name: "Libya", region: "Middle East & North Africa", score: 4.805211, coordinates: [18.0662, 27.0168] },
  { code: "YEM", name: "Yemen", region: "Middle East & North Africa", score: 4.693676, coordinates: [47.5677, 15.9172] },
  { code: "BWA", name: "Botswana", region: "Sub-Saharan Africa", score: 4.664307, coordinates: [23.8085, -22.1655] },
  { code: "IRN", name: "Iran", region: "Middle East & North Africa", score: 4.653369, coordinates: [54.4408, 32.5273] },
  { code: "JOR", name: "Jordan", region: "Middle East & North Africa", score: 4.619581, coordinates: [36.7575, 31.2385] },
  { code: "CHL", name: "Chile", region: "Latin America & Caribbean", score: 4.471869, coordinates: [-71.0558, -36.0749] },
  { code: "SMR", name: "San Marino", region: "Europe & Central Asia", score: 4.449199, coordinates: [12.4594, 43.9415] },
  { code: "BEL", name: "Belgium", region: "Europe & Central Asia", score: 4.410842, coordinates: [4.6464, 50.6388] },
  { code: "GRC", name: "Greece", region: "Europe & Central Asia", score: 4.338904, coordinates: [22.9646, 39.0479] },
  { code: "TUN", name: "Tunisia", region: "Middle East & North Africa", score: 4.280359, coordinates: [9.5561, 34.0889] },
  { code: "NAM", name: "Namibia", region: "Sub-Saharan Africa", score: 4.175798, coordinates: [17.1952, -22.0697] },
  { code: "ZAF", name: "South Africa", region: "Sub-Saharan Africa", score: 4.167754, coordinates: [25.1937, -28.9744] },
  { code: "IRQ", name: "Iraq", region: "Middle East & North Africa", score: 4.146235, coordinates: [43.7737, 33.0096] },
  { code: "IND", name: "India", region: "South Asia", score: 4.107794, coordinates: [79.5637, 22.7766] },
  { code: "SYR", name: "Syria", region: "Middle East & North Africa", score: 4.013469, coordinates: [38.4878, 35.019] },
];

export const COUNTRY_BY_NAME = new Map(
  WATER_STRESS_COUNTRIES.map((country) => [country.name, country]),
);

export const UNICEF_DONATION_URL =
  "https://www.unicefusa.org/what-unicef-does/childrens-health/water-sanitation/safe-water-projects?form=donate";

export const UNICEF_VERIFICATION_URL =
  "https://www.charitynavigator.org/ein/131760110";

export const WRI_COUNTRY_EVIDENCE_URL =
  "https://www.wri.org/insights/highest-water-stressed-countries";

export const OMAN_DROUGHT_STUDY_URL =
  "https://doi.org/10.1016/j.atmosres.2020.105126";
