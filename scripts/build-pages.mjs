import { copyFile, writeFile } from "node:fs/promises";

const basePath = process.env.GITHUB_PAGES_BASE_PATH ?? "/water-out-of-reach";
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("pages", `${Date.now()}`);

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://pages.local/", {
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

if (!response.ok) {
  throw new Error(`Static render failed with status ${response.status}`);
}

const sourceHtml = await response.text();
const pagesHtml = sourceHtml
  .replaceAll("/assets/", `${basePath}/assets/`)
  .replaceAll("/og-water-access.png", `${basePath}/og-water-access.png`);

const outputUrl = new URL("../dist/client/index.html", import.meta.url);
await writeFile(outputUrl, pagesHtml);
await copyFile(outputUrl, new URL("../dist/client/404.html", import.meta.url));

console.log(`GitHub Pages output prepared for ${basePath}/`);
