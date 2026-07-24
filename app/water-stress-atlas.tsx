"use client";

import { useId, useMemo, useState } from "react";
import {
  geoGraticule10,
  geoNaturalEarth1,
  geoPath,
  type GeoPermissibleObjects,
} from "d3-geo";
import type {
  FeatureCollection,
  Geometry,
} from "geojson";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldTopologyJson from "world-atlas/countries-110m.json";
import {
  COUNTRY_BY_NAME,
  OMAN_DROUGHT_STUDY_URL,
  UNICEF_DONATION_URL,
  UNICEF_VERIFICATION_URL,
  WATER_STRESS_COUNTRIES,
  WRI_COUNTRY_EVIDENCE_URL,
  type WaterStressCountry,
} from "./water-data";

type CountryProperties = {
  name: string;
};

const topology = worldTopologyJson as unknown as Topology<{
  countries: GeometryCollection<CountryProperties>;
}>;

const WORLD = feature(
  topology,
  topology.objects.countries,
) as FeatureCollection<Geometry, CountryProperties>;

const PROJECTION = geoNaturalEarth1().fitExtent(
  [
    [18, 18],
    [942, 502],
  ],
  WORLD,
);

const PATH = geoPath(PROJECTION);
const GRATITUDE = geoGraticule10();

type CountryMarker = {
  country: WaterStressCountry;
  x: number;
  y: number;
};

const MARKERS: CountryMarker[] = WATER_STRESS_COUNTRIES.flatMap((country) => {
  const projected = PROJECTION(country.coordinates);
  if (!projected) return [];
  const [x, y] = projected;
  return Number.isFinite(x) && Number.isFinite(y)
    ? [{ country, x, y }]
    : [];
});

function pathFor(geometry: GeoPermissibleObjects): string {
  return PATH(geometry) ?? "";
}

export function WaterStressAtlas() {
  const titleId = useId();
  const descriptionId = useId();
  const [pinnedCode, setPinnedCode] = useState("OMN");
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  const activeCountry = useMemo(
    () =>
      WATER_STRESS_COUNTRIES.find(
        (country) => country.code === (hoveredCode ?? pinnedCode),
      ) ?? WATER_STRESS_COUNTRIES[4],
    [hoveredCode, pinnedCode],
  );

  const activePosition =
    WATER_STRESS_COUNTRIES.findIndex(
      (country) => country.code === activeCountry.code,
    ) + 1;

  function activate(country: WaterStressCountry) {
    setPinnedCode(country.code);
  }

  return (
    <main className="site-shell">
      <header className="topline">
        <a className="wordmark" href="#top" aria-label="Where Water Runs Thin">
          WRT · Atlas 01
        </a>
        <nav aria-label="Page">
          <a href="#atlas">Explore</a>
          <a href="#notes">Data notes</a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">A water stress atlas</p>
          <h1 id="page-title">Where water runs thin</h1>
          <p className="hero-deck">
            Explore the countries using more than 80% of their renewable water
            supply in a typical year, then give through a verified route.
          </p>
        </div>
        <div className="hero-facts" aria-label="Key facts">
          <div className="hero-fact">
            <span className="fact-label">Countries</span>
            <span className="fact-value">25</span>
            <span className="fact-copy">
              Rated extremely high in WRI Aqueduct 4.0.
            </span>
          </div>
          <div className="hero-fact">
            <span className="fact-label">Threshold</span>
            <span className="fact-value">&gt;80%</span>
            <span className="fact-copy">
              Renewable supply withdrawn in a typical year.
            </span>
          </div>
        </div>
      </section>

      <section className="atlas" id="atlas" aria-labelledby="atlas-title">
        <div className="atlas-head">
          <div>
            <p className="section-kicker">Annual exposure</p>
            <h2 id="atlas-title">Extremely high water stress</h2>
          </div>
          <p className="legend">
            <span className="legend-dot" aria-hidden="true" />
            More than 80% of renewable supply withdrawn
          </p>
        </div>

        <div className="atlas-workspace">
          <div className="map-panel">
            <p className="map-instruction">Hover, focus or tap a marker</p>
            <svg
              className="world-map"
              viewBox="0 0 960 520"
              role="img"
              aria-labelledby={`${titleId} ${descriptionId}`}
            >
              <title id={titleId}>
                World map of countries with extremely high baseline water stress
              </title>
              <desc id={descriptionId}>
                Twenty five countries are marked. Hover, focus, or select a
                marker to read the country details and find a verified donation
                route.
              </desc>
              <path className="sphere" d={pathFor({ type: "Sphere" })} />
              <path className="graticule" d={pathFor(GRATITUDE)} />
              <g aria-hidden="true">
                {WORLD.features.map((country) => {
                  const stressedCountry = COUNTRY_BY_NAME.get(
                    country.properties.name,
                  );
                  const isActive = stressedCountry?.code === activeCountry.code;
                  return (
                    <path
                      key={country.id ?? country.properties.name}
                      className={[
                        "country",
                        stressedCountry ? "stressed" : "",
                        isActive ? "active" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      d={pathFor(country)}
                    />
                  );
                })}
              </g>
              <g aria-label="Countries with extremely high water stress">
                {MARKERS.map(({ country, x, y }) => {
                  const isActive = country.code === activeCountry.code;
                  return (
                    <g
                      key={country.code}
                      className={`country-marker${isActive ? " active" : ""}`}
                      transform={`translate(${x} ${y})`}
                      role="button"
                      tabIndex={0}
                      aria-label={`${country.name}, score ${country.score.toFixed(2)} out of 5. Select for details.`}
                      aria-pressed={pinnedCode === country.code}
                      onMouseEnter={() => setHoveredCode(country.code)}
                      onMouseLeave={() => setHoveredCode(null)}
                      onFocus={() => setHoveredCode(country.code)}
                      onBlur={() => setHoveredCode(null)}
                      onClick={() => activate(country)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          activate(country);
                        }
                      }}
                    >
                      <title>{country.name}</title>
                      <circle className="marker-hit" r="14" />
                      <circle className="marker-ring" r={isActive ? 10 : 7} />
                      <circle className="marker-core" r={isActive ? 5.5 : 3.8} />
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          <aside className="detail-rail" aria-live="polite">
            <div className="detail-summary">
              <p className="country-index">
                Country {String(activePosition).padStart(2, "0")} of 25
              </p>
              <h3>{activeCountry.name}</h3>
              <p className="country-region">{activeCountry.region}</p>

              <div className="stress-reading">
                <div className="score">
                  {activeCountry.score.toFixed(2)}
                  <span> / 5</span>
                </div>
                <div>
                  <p className="stress-label">Extremely high</p>
                  <p className="stress-threshold">
                    Baseline water stress category
                  </p>
                </div>
              </div>

              <p className="meaning">
                In a typical year, demand uses at least 80% of the renewable
                water supply available here. Small changes in supply or demand
                can create serious competition for water.
              </p>

              <div className="evidence-block">
                <p className="rail-kicker">
                  {activeCountry.code === "OMN"
                    ? "Why Oman is included"
                    : "Country evidence"}
                </p>
                {activeCountry.code === "OMN" ? (
                  <p>
                    WRI specifically names Oman among the countries with the
                    highest baseline water stress. A separate peer reviewed
                    study found a significant increase in drought frequency and
                    severity in Oman from 1979 to 2014. Drought and baseline
                    water stress are related pressures, but they are not the
                    same measure.
                  </p>
                ) : (
                  <p>
                    This country&apos;s classification comes from WRI Aqueduct
                    4.0, which uses open source, peer reviewed data to compare
                    water demand with renewable supply.
                  </p>
                )}
                <div className="evidence-links">
                  <a
                    href={WRI_COUNTRY_EVIDENCE_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read the WRI finding ↗
                  </a>
                  {activeCountry.code === "OMN" ? (
                    <a
                      href={OMAN_DROUGHT_STUDY_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read the Oman study ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="giving">
              <p className="verified-row">
                <span className="verified-mark" aria-hidden="true">
                  ✓
                </span>
                Verified giving route
              </p>
              <h4>UNICEF USA · Safe Water</h4>
              <p className="giving-copy">
                Official UNICEF USA route supporting water, sanitation and
                hygiene work in more than 100 countries.
              </p>
              <a
                className="donate-link"
                href={UNICEF_DONATION_URL}
                target="_blank"
                rel="noreferrer"
              >
                Donate to global water work <span aria-hidden="true">↗</span>
              </a>
              <a
                className="verification-link"
                href={UNICEF_VERIFICATION_URL}
                target="_blank"
                rel="noreferrer"
              >
                Check independent charity rating ↗
              </a>
              <p className="allocation-note">
                Important: this route supports UNICEF&apos;s global work. Your
                gift is not guaranteed to be restricted to {activeCountry.name}.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="notes" id="notes" aria-labelledby="notes-title">
        <div>
          <p className="section-kicker">Read before using</p>
          <h2 id="notes-title">Water stress is pressure, not a full diagnosis.</h2>
        </div>
        <div className="notes-body">
          <div>
            <h3>What the map measures</h3>
            <p>
              Baseline water stress compares total water demand with available
              renewable surface and groundwater supplies. It is a supply and
              demand risk indicator, not a direct measure of household water
              access or humanitarian need.
            </p>
          </div>
          <div>
            <h3>Source and license</h3>
            <p>
              Country rankings come from{" "}
              <a
                href="https://www.wri.org/data/aqueduct-40-country-rankings"
                target="_blank"
                rel="noreferrer"
              >
                WRI Aqueduct 4.0
              </a>
              , accessed July 2026. WRI data is made available under{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noreferrer"
              >
                CC BY 4.0
              </a>
              .
            </p>
          </div>
          <div className="country-list">
            <h3>The 25 countries shown</h3>
            <p>
              {WATER_STRESS_COUNTRIES.map((country) => country.name).join(" · ")}
            </p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>Source: WRI Aqueduct 4.0 · Accessed July 2026</span>
        <span>Giving route verified through official and independent sources</span>
      </footer>
    </main>
  );
}
