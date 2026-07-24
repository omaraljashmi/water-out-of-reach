import assert from "node:assert/strict";
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
  assert.match(html, /<title>Where Water Runs Thin<\/title>/i);
  assert.match(html, /Where water is out of reach/);
  assert.match(html, /Without a basic drinking water service/);
  assert.match(html, /charity: water/);
  assert.match(html, /Why ask this question/);
  assert.match(html, /31 of them are in Sub Saharan Africa/);
  assert.match(html, /not a drilling instruction/);
  assert.match(html, /Read the estimation method/);
  assert.equal((html.match(/class="country-marker/g) ?? []).length, 37);
  assert.match(html, /charitynavigator\.org\/ein\/223936753/);
  assert.match(html, /Darker blue means a greater share of people in need/);
  assert.doesNotMatch(
    html,
    /Why Oman is not highlighted|Access is not the same as water stress/i,
  );
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
