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

test("server renders the water stress atlas", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Where Water Runs Thin<\/title>/i);
  assert.match(html, /Where water runs thin/);
  assert.match(html, /Extremely high water stress/);
  assert.match(html, /UNICEF USA/);
  assert.match(html, /WRI Aqueduct 4\.0/);
  assert.match(html, /Why Oman is included/);
  assert.match(html, /10\.1016\/j\.atmosres\.2020\.105126/);
  assert.equal((html.match(/class="country-marker/g) ?? []).length, 25);
  assert.match(html, /charitynavigator\.org\/ein\/131760110/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
