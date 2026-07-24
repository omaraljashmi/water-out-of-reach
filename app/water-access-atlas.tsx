"use client";

import { useId, useMemo, useState } from "react";
import {
  geoGraticule10,
  geoNaturalEarth1,
  geoPath,
  type GeoPermissibleObjects,
} from "d3-geo";
import type { FeatureCollection, Geometry } from "geojson";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldTopologyJson from "world-atlas/countries-110m.json";
import {
  CHARITY_WATER_DONATION_URL,
  CHARITY_WATER_METHOD_URL,
  CHARITY_WATER_VERIFICATION_URL,
  COUNTRY_BY_ATLAS_NAME,
  FOCUS_COUNTRY_COUNT,
  JMP_REPORT_URL,
  PEOPLE_WITHOUT_BASIC_ACCESS,
  WATER_ACCESS_COUNTRIES,
  WHO_SMALL_SUPPLIES_URL,
  WHO_WATER_LADDER_URL,
  WORLD_BANK_POPULATION_DATA_URL,
  WORLD_BANK_WATER_DATA_URL,
  type WaterAccessCountry,
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
const GRATICULE = geoGraticule10();

type CountryMarker = {
  country: WaterAccessCountry;
  x: number;
  y: number;
};

const MARKERS: CountryMarker[] = WATER_ACCESS_COUNTRIES.flatMap((country) => {
  const projected = PROJECTION(country.coordinates);
  if (!projected) return [];
  const [x, y] = projected;
  return Number.isFinite(x) && Number.isFinite(y)
    ? [{ country, x, y }]
    : [];
});

const PEOPLE_FORMAT = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function pathFor(geometry: GeoPermissibleObjects): string {
  return PATH(geometry) ?? "";
}

function needBand(lackingPercent: number): string {
  if (lackingPercent >= 55) return "need-critical";
  if (lackingPercent >= 40) return "need-very-high";
  if (lackingPercent >= 30) return "need-high";
  return "need-serious";
}

function formatPeople(value: number): string {
  return PEOPLE_FORMAT.format(value);
}

export function WaterAccessAtlas() {
  const titleId = useId();
  const descriptionId = useId();
  const [pinnedCode, setPinnedCode] = useState("COD");
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  const activeCountry = useMemo(
    () =>
      WATER_ACCESS_COUNTRIES.find(
        (country) => country.code === (hoveredCode ?? pinnedCode),
      ) ?? WATER_ACCESS_COUNTRIES[0],
    [hoveredCode, pinnedCode],
  );

  const activePosition =
    WATER_ACCESS_COUNTRIES.findIndex(
      (country) => country.code === activeCountry.code,
    ) + 1;

  function activate(country: WaterAccessCountry) {
    setPinnedCode(country.code);
    setHoveredCode(null);
  }

  return (
    <main className="site-shell">
      <header className="topline">
        <a className="wordmark" href="#top" aria-label="Where Water Runs Thin">
          WRT · Atlas 02
        </a>
        <nav aria-label="Page">
          <a href="#atlas">Explore</a>
          <a href="#notes">How to read it</a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">Drinking water access · 2024</p>
          <h1 id="page-title">Where water is out of reach</h1>
          <p className="hero-deck">
            This map focuses on people, not national water supply. It shows the
            countries where at least one in five people still lack even a basic
            drinking water service.
          </p>
        </div>
        <div className="hero-facts" aria-label="Key facts">
          <div className="hero-fact">
            <span className="fact-label">Countries in focus</span>
            <span className="fact-value">{FOCUS_COUNTRY_COUNT}</span>
            <span className="fact-copy">
              Each has at least 20% of its population without basic access.
            </span>
          </div>
          <div className="hero-fact">
            <span className="fact-label">People in focus</span>
            <span className="fact-value">
              {formatPeople(PEOPLE_WITHOUT_BASIC_ACCESS)}
            </span>
            <span className="fact-copy">
              Estimated from 2024 access and population data.
            </span>
          </div>
        </div>
      </section>

      <section className="atlas" id="atlas" aria-labelledby="atlas-title">
        <div className="atlas-head">
          <div>
            <p className="section-kicker">Household access</p>
            <h2 id="atlas-title">Without a basic drinking water service</h2>
          </div>
          <div className="legend" aria-label="Map color scale">
            <span>20%</span>
            <span className="legend-scale" aria-hidden="true" />
            <span>55% or more</span>
            <small>Darker blue means a greater share of people in need</small>
          </div>
        </div>

        <div className="atlas-workspace">
          <div className="map-panel">
            <p className="map-instruction">Hover, focus or tap a blue marker</p>
            <svg
              className="world-map"
              viewBox="0 0 960 520"
              role="img"
              aria-labelledby={`${titleId} ${descriptionId}`}
            >
              <title id={titleId}>
                World map of countries where at least 20 percent of people lack
                a basic drinking water service
              </title>
              <desc id={descriptionId}>
                Thirty seven countries are shaded from light to dark blue.
                Darker blue means a larger share of people lack basic access.
                Select a marker for country details and a verified giving route.
              </desc>
              <path className="sphere" d={pathFor({ type: "Sphere" })} />
              <path className="graticule" d={pathFor(GRATICULE)} />
              <g aria-hidden="true">
                {WORLD.features.map((country) => {
                  const focusCountry = COUNTRY_BY_ATLAS_NAME.get(
                    country.properties.name,
                  );
                  const isActive = focusCountry?.code === activeCountry.code;
                  return (
                    <path
                      key={country.id ?? country.properties.name}
                      className={[
                        "country",
                        focusCountry
                          ? `focus-country ${needBand(focusCountry.lackingPercent)}`
                          : "",
                        isActive ? "active" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      d={pathFor(country)}
                    />
                  );
                })}
              </g>
              <g aria-label="Countries where at least one in five people lack basic drinking water access">
                {MARKERS.map(({ country, x, y }) => {
                  const isActive = country.code === activeCountry.code;
                  return (
                    <g
                      key={country.code}
                      className={`country-marker ${needBand(country.lackingPercent)}${isActive ? " active" : ""}`}
                      transform={`translate(${x} ${y})`}
                      role="button"
                      tabIndex={0}
                      aria-label={`${country.name}, ${country.lackingPercent.toFixed(1)} percent without basic access, about ${formatPeople(country.peopleWithoutBasicAccess)} people. Select for details.`}
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
                      <title>{`${country.name}: ${country.lackingPercent.toFixed(1)}% without basic access`}</title>
                      <circle className="marker-hit" r="8" />
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
                Country {String(activePosition).padStart(2, "0")} of{" "}
                {FOCUS_COUNTRY_COUNT}
              </p>
              <h3>{activeCountry.name}</h3>
              <p className="country-region">{activeCountry.region}</p>

              <div className="access-reading">
                <div className="score">
                  {activeCountry.lackingPercent.toFixed(1)}
                  <span>%</span>
                </div>
                <div>
                  <p className="access-label">Lack basic access</p>
                  <p className="access-count">
                    About{" "}
                    {formatPeople(activeCountry.peopleWithoutBasicAccess)} people
                  </p>
                </div>
              </div>

              <p className="meaning">
                This includes people who spend more than 30 minutes collecting
                water from an improved source, use an unprotected well or
                spring, or drink water directly from a river, lake or canal.
              </p>

              <div className="evidence-block">
                <p className="rail-kicker">Why this country is included</p>
                <p>
                  WHO and UNICEF estimate that only{" "}
                  {activeCountry.basicAccessPercent.toFixed(1)}% of people here
                  used at least a basic drinking water service in 2024. This map
                  shows the remaining {activeCountry.lackingPercent.toFixed(1)}%.
                </p>
                <div className="evidence-links">
                  <a
                    href={WORLD_BANK_WATER_DATA_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Check the access data ↗
                  </a>
                  <a
                    href={WHO_WATER_LADDER_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read the definitions ↗
                  </a>
                </div>
              </div>

              <div className="solution-note">
                <p className="rail-kicker">Could a well help?</p>
                <p>
                  Sometimes. A drilled well only works where groundwater is
                  reachable, safe and able to supply enough water. Local teams
                  may choose a piped system, filter, spring protection, rainwater
                  collection or a repair instead.
                </p>
                <a
                  href={CHARITY_WATER_METHOD_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  See how projects are chosen ↗
                </a>
              </div>
            </div>

            <div className="giving">
              <p className="verified-row">
                <span className="verified-mark" aria-hidden="true">
                  ✓
                </span>
                Independently verified
              </p>
              <h4>charity: water</h4>
              <p className="giving-copy">
                Donations fund clean water projects through local partners,
                including wells where groundwater and water quality make sense.
              </p>
              <a
                className="donate-link"
                href={CHARITY_WATER_DONATION_URL}
                target="_blank"
                rel="noreferrer"
              >
                Give to clean water projects <span aria-hidden="true">↗</span>
              </a>
              <a
                className="verification-link"
                href={CHARITY_WATER_VERIFICATION_URL}
                target="_blank"
                rel="noreferrer"
              >
                Check the Four Star charity rating ↗
              </a>
              <p className="allocation-note">
                This is a global giving route. A donation is not guaranteed to
                be used in {activeCountry.name}.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="notes" id="notes" aria-labelledby="notes-title">
        <div>
          <p className="section-kicker">Read it honestly</p>
          <h2 id="notes-title">Access is not the same as water stress.</h2>
        </div>
        <div className="notes-body">
          <div>
            <h3>What the map measures</h3>
            <p>
              The percentage without at least a basic drinking water service.
              It is not a direct dirty water rate. It combines long collection
              times, unimproved sources and direct surface water use.
            </p>
          </div>
          <div>
            <h3>Why Oman is not highlighted</h3>
            <p>
              Oman, Saudi Arabia and the UAE face water scarcity, but this map
              asks a different question: whether households have basic drinking
              water access. High water stress alone does not prove that people
              are drinking unsafe water.
            </p>
          </div>
          <div>
            <h3>Source and method</h3>
            <p>
              2024 country estimates come from the{" "}
              <a
                href={WORLD_BANK_WATER_DATA_URL}
                target="_blank"
                rel="noreferrer"
              >
                WHO and UNICEF Joint Monitoring Programme
              </a>
              , published by the World Bank under CC BY 4.0. People estimates
              multiply the access gap by{" "}
              <a
                href={WORLD_BANK_POPULATION_DATA_URL}
                target="_blank"
                rel="noreferrer"
              >
                2024 population data
              </a>
              .
            </p>
          </div>
          <div>
            <h3>Wells need local evidence</h3>
            <p>
              WHO guidance calls for context appropriate standards, water safety
              planning, sanitary inspections and ongoing oversight for small
              supplies. A borehole is one tool, not a universal answer.{" "}
              <a
                href={WHO_SMALL_SUPPLIES_URL}
                target="_blank"
                rel="noreferrer"
              >
                Read the guidance
              </a>
              .
            </p>
          </div>
          <div className="country-list">
            <h3>The {FOCUS_COUNTRY_COUNT} countries shown</h3>
            <p>
              {WATER_ACCESS_COUNTRIES.map((country) => country.name).join(" · ")}
            </p>
          </div>
          <div className="global-context">
            <h3>Global context</h3>
            <p>
              The 2025 JMP report estimates that 287 million people used limited
              services, 302 million used unimproved sources and 106 million
              drank surface water in 2024.{" "}
              <a href={JMP_REPORT_URL} target="_blank" rel="noreferrer">
                Read the report
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>Source: WHO and UNICEF JMP · 2024 estimates</span>
        <span>Giving route checked July 2026</span>
      </footer>
    </main>
  );
}
