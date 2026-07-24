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
  JMP_METHODS_URL,
  JMP_REPORT_URL,
  PEOPLE_WITHOUT_BASIC_ACCESS,
  UNICEF_CLIMATE_WASH_URL,
  UNICEF_CONFLICT_WASH_URL,
  WATER_ACCESS_COUNTRIES,
  WHO_BOREHOLE_GUIDANCE_URL,
  WHO_DRINKING_WATER_FACTS_URL,
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
          <p className="section-kicker">Why this map exists</p>
          <h2 id="notes-title">Why safe water is still hard to reach.</h2>
        </div>
        <div className="notes-body">
          <div>
            <h3>Why ask this question</h3>
            <p>
              Water can be nearby and still be hard to reach. A village may not
              have pipes, a working pump, clean storage or money to keep a water
              system running. I made this map to show where the problem is
              biggest and where help can start.{" "}
              <a href={JMP_REPORT_URL} target="_blank" rel="noreferrer">
                See the research
              </a>
              .
            </p>
          </div>
          <div>
            <h3>How the map works</h3>
            <p>
              Blue countries are places where at least one in five people does
              not have a basic drinking water service. Basic means the water
              comes from a safer type of source and takes 30 minutes or less to
              collect. I take each country&apos;s 2024{" "}
              <a
                href={WORLD_BANK_WATER_DATA_URL}
                target="_blank"
                rel="noreferrer"
              >
                access number
              </a>{" "}
              away from 100. To estimate how many people that represents, I use
              the same percentage with{" "}
              <a
                href={WORLD_BANK_POPULATION_DATA_URL}
                target="_blank"
                rel="noreferrer"
              >
                2024 population data
              </a>
              .{" "}
              <a
                href={WHO_WATER_LADDER_URL}
                target="_blank"
                rel="noreferrer"
              >
                See what basic service means
              </a>
              .
            </p>
          </div>
          <div>
            <h3>What these countries share</h3>
            <p>
              31 of the 37 countries are in Sub Saharan Africa. Every country is
              different, but the same problems often appear. Water is far from
              rural homes. Families have less money.{" "}
              <a
                href={WHO_SMALL_SUPPLIES_URL}
                target="_blank"
                rel="noreferrer"
              >
                Local water systems lack staff and funding
              </a>
              ,{" "}
              <a
                href={UNICEF_CONFLICT_WASH_URL}
                target="_blank"
                rel="noreferrer"
              >
                war damages pipes and power
              </a>
              , and{" "}
              <a
                href={UNICEF_CLIMATE_WASH_URL}
                target="_blank"
                rel="noreferrer"
              >
                droughts and floods damage water sources
              </a>
              .
            </p>
          </div>
          <div>
            <h3>What happens to people</h3>
            <p>
              People can spend hours collecting water. Women and children often
              carry most of it. Unsafe water can spread cholera, diarrhoea,
              typhoid and other diseases. It can also mean missed school, missed
              work and more medical bills.{" "}
              <a
                href={WHO_DRINKING_WATER_FACTS_URL}
                target="_blank"
                rel="noreferrer"
              >
                See the health facts
              </a>
              .
            </p>
          </div>
          <div>
            <h3>When a well makes sense</h3>
            <p>
              A blue country does not automatically mean build a well. Local
              experts first check if there is enough safe water underground.
              They also plan the pump, water testing and who will keep the well
              working. Sometimes a well is right. Sometimes pipes, repairs,
              filters or rainwater collection work better.{" "}
              <a
                href={WHO_BOREHOLE_GUIDANCE_URL}
                target="_blank"
                rel="noreferrer"
              >
                See the WHO well guide
              </a>{" "}
              and{" "}
              <a
                href={CHARITY_WATER_METHOD_URL}
                target="_blank"
                rel="noreferrer"
              >
                how projects are chosen
              </a>
              .
            </p>
          </div>
          <div>
            <h3>What the map cannot show</h3>
            <p>
              This map points to countries, not villages. A country number can
              hide big differences from one place to another. Local teams still
              need to visit communities, test the water and listen to people
              before choosing a project.{" "}
              <a href={JMP_METHODS_URL} target="_blank" rel="noreferrer">
                Read how the numbers are made
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
        </div>
      </section>

      <footer className="site-footer">
        <span>Source: WHO and UNICEF JMP · 2024 estimates</span>
        <span>Giving route checked July 2026</span>
      </footer>
    </main>
  );
}
