import assert from "node:assert/strict";
import test from "node:test";

const technicalMarkers = /\b(?:codex-preview|chatgpt|openai)\b/i;

test("renders a clean development preview", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
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

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<html\b[^>]*\blang=["']ru["']/i);
  assert.match(html, /<title>СНЕГ — кондиционирование и вентиляция<\/title>/i);
  assert.doesNotMatch(html, technicalMarkers);
});
