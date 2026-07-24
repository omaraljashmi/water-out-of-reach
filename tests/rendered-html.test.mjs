import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server renders the drinking water access atlas", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Water Out of Reach<\/title>/i);
  assert.match(html, /Water out of reach/);
  assert.match(html, /Without a basic drinking water service/);
  assert.match(html, /ODDPH/);
  assert.match(html, /Bring Safe Water to Munigi/);
  assert.match(
    html,
    /globalgiving\.org\/projects\/bring-safe-water-to-munigis-displaced-families/,
  );
  assert.match(html, /Why ask this question/);
  assert.match(html, /31 of the 37 countries are in Sub Saharan Africa/);
  assert.match(html, /does not automatically mean build a well/);
  assert.match(html, /Read how the numbers are made/);
  assert.equal((html.match(/class="country-marker/g) ?? []).length, 37);
  assert.match(html, /globalgiving\.org\/aboutus\/how-it-works\/vetting/);
  assert.match(html, /Country specific water project/);
  assert.match(html, /Darker blue means a greater share of people in need/);
  assert.doesNotMatch(html, /charity: water/i);
  assert.doesNotMatch(
    html,
    /Why Oman is not highlighted|Access is not the same as water stress/i,
  );
  assert.doesNotMatch(html, /react-loading-skeleton/i);
});

test("every country has a distinct giving destination", async () => {
  const source = await readFile(
    new URL("../app/water-data.ts", import.meta.url),
    "utf8",
  );
  const globalGivingSlugs = [
    ...source.matchAll(
      /globalGivingRoute\([\s\S]*?\n\s*"([^"]+)",\n\s*(?:true|false|\))/g,
    ),
  ].map((match) => match[1]);
  const directDonationUrls = [
    ...source.matchAll(/donationUrl: "([^"]+)"/g),
  ].map((match) => match[1]);
  const destinations = [
    ...globalGivingSlugs.map(
      (slug) => `https://www.globalgiving.org/projects/${slug}/`,
    ),
    ...directDonationUrls,
  ];

  assert.equal(destinations.length, 37);
  assert.equal(new Set(destinations).size, 37);
});
