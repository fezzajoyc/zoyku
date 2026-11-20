import { afterEach, describe, expect, it } from "vitest";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const run = promisify(execFile);
const folders = [];
const locales = ["en", "zh", "ja", "es", "pt", "fr", "de", "ru", "it", "tr", "ko", "ar", "hi", "id", "vi"];
const origin = "https://zoyku.com";
const page = (path, { title = path, application = true } = {}) => `<html><head><title>${title}</title><link rel="canonical" href="${origin}${path}">${[...locales, "x-default"].map((locale) => `<link rel="alternate" hreflang="${locale}" href="${origin}/${locale === "x-default" ? "en" : locale}${path.replace(/^\/[a-z]{2}/, "")}">`).join("")}<meta property="og:image" content="${origin}/image.png"><script type="application/ld+json">${JSON.stringify({ "@type": application ? "WebApplication" : "WebSite" })}</script></head><body><h1>Tool</h1></body></html>`;

async function fixture(paths) {
  const root = await mkdtemp(join(tmpdir(), "zoyku-seo-audit-"));
  folders.push(root);
  await writeFile(join(root, "sitemap.xml.body"), `<urlset>${paths.map((path) => `<url><loc>${origin}${path}</loc></url>`).join("")}</urlset>`);
  for (const path of paths) {
    const file = join(root, `${path.slice(1)}.html`);
    await mkdir(resolve(file, ".."), { recursive: true });
    await writeFile(file, page(path));
  }
  return root;
}
afterEach(async () => { await Promise.all(folders.splice(0).map((folder) => rm(folder, { recursive: true, force: true }))); });

describe("generated-output audit CLI", () => {
  it("audits every generated sitemap HTML without making HTTP requests", async () => {
    const root = await fixture(["/en", "/zh/tools/merge-pdf"]);
    const result = await run(process.execPath, ["scripts/seo-audit.mjs", "--mode", "static", "--build-dir", root], { cwd: process.cwd(), env: { ...process.env, BASE: "http://127.0.0.1:1" } });
    expect(result.stdout).toContain("2/2");
    expect(result.stdout).toContain("HTTP routing/status not checked");
  });
  it("fails for a missing generated page instead of silently excluding it", async () => {
    const root = await fixture(["/en", "/zh/tools/merge-pdf"]);
    await rm(join(root, "zh/tools/merge-pdf.html"));
    await expect(run(process.execPath, ["scripts/seo-audit.mjs", "--mode", "static", "--build-dir", root], { cwd: process.cwd() })).rejects.toMatchObject({ code: 1, stderr: expect.stringContaining("generated HTML unavailable") });
  });
});

// Importing the audit helpers must never launch a crawl.
import { checkSitemapHtml, createPoliteFetcher, generatedHtmlPath, parseAuditArgs, retryAfterMs, runAudit, sampleUrls } from "./seo-audit.mjs";

describe("shared sitemap content checks", () => {
  const url = `${origin}/en/tools/merge-pdf`;
  it("uses the public sitemap canonical in both static and HTTP modes", () => {
    expect(checkSitemapHtml(url, page("/en/tools/merge-pdf"))).toEqual([]);
    expect(checkSitemapHtml(url, page("/en/tools/merge-pdf").replace(`href="${url}"`, 'href="http://localhost:3477/en/tools/merge-pdf"'))).toContain("canonical mismatch: http://localhost:3477/en/tools/merge-pdf");
  });
  it("requires all alternates including x-default and validates regional alias targets", () => {
    const clean = page("/en/tools/merge-pdf");
    expect(checkSitemapHtml(url, clean.replace('hreflang="zh"', 'hreflang="zh-CN"').replace('hreflang="pt"', 'hreflang="pt-BR"'))).toEqual([]);
    expect(checkSitemapHtml(url, clean.replace('hreflang="x-default"', 'hreflang="other"'))).toContain("missing hreflang: x-default");
    expect(checkSitemapHtml(url, clean.replace(`href="${origin}/zh/tools/merge-pdf"`, `href="${origin}/en/tools/merge-pdf"`)).some((problem) => problem.startsWith("hreflang target mismatch: zh"))).toBe(true);
  });
  it("rejects duplicate titles, noindex, malformed schema and schema words in prose", () => {
    const titles = new Map();
    checkSitemapHtml(url, page("/en/tools/merge-pdf", { title: "same" }), titles);
    expect(checkSitemapHtml(`${origin}/zh/tools/merge-pdf`, page("/zh/tools/merge-pdf", { title: "same" }), titles)).toContain(`duplicate title: ${url}`);
    expect(checkSitemapHtml(url, page("/en/tools/merge-pdf").replace("</head>", '<meta name="robots" content="noindex"></head>'))).toContain("unexpected noindex");
    expect(checkSitemapHtml(url, page("/en/tools/merge-pdf", { application: false }) + "<p>WebApplication</p>")).toContain("missing WebApplication schema");
    expect(checkSitemapHtml(url, page("/en/tools/merge-pdf").replace('{"@type":"WebApplication"}', '{broken')).some((problem) => problem.startsWith("JSON-LD parse"))).toBe(true);
  });
  it("maps only safe generated HTML paths and validates audit mode scope", () => {
    expect(generatedHtmlPath("/build/app", url)).toBe("/build/app/en/tools/merge-pdf.html");
    expect(() => generatedHtmlPath("/build/app", `${origin}/en/%2F..%2Foutside`)).toThrow("unsupported generated URL path");
    expect(() => parseAuditArgs(["--sample", "0"])).toThrow("positive integer");
    expect(() => parseAuditArgs(["--mode"])).toThrow("invalid audit option");
    expect(parseAuditArgs(["--mode", "static", "--build-dir", "/build/app", "--sample", "8"])).toMatchObject({ mode: "static", buildDir: "/build/app", sample: 8 });
  });
  it("bounds the sample while covering page kinds and distant languages", () => {
    const urls = ["/en", "/en/tools", "/en/categories/pdf", ...Array.from({ length: 100 }, (_, index) => `/en/tools/tool-${index}`), "/ar/tools/final"].map((path) => `${origin}${path}`);
    const selected = sampleUrls(urls, 8);
    expect(selected).toHaveLength(8);
    expect(selected).toContain(`${origin}/en`);
    expect(selected).toContain(`${origin}/en/tools`);
    expect(selected).toContain(`${origin}/en/categories/pdf`);
    expect(selected).toContain(`${origin}/ar/tools/final`);
    expect(new Set(selected).size).toBe(8);
  });
});

describe("polite HTTP request gate", () => {
  it("honors Retry-After seconds before retrying and spaces following requests", async () => {
    let clock = 0;
    const starts = [];
    let requests = 0;
    const fetcher = createPoliteFetcher({ now: () => clock, sleep: async (ms) => { clock += ms; }, fetchImpl: async () => { starts.push(clock); return ++requests === 1 ? new Response("limited", { status: 429, headers: { "Retry-After": "2" } }) : new Response("ok"); } });
    expect((await fetcher(`${origin}/en`)).status).toBe(200);
    await fetcher(`${origin}/zh`);
    expect(starts).toEqual([0, 2000, 2350]);
    expect(fetcher.stats).toEqual({ requests: 3, rateLimited: 1, retries: 1 });
  });
  it("serializes concurrent callers and stops retrying persistent 429 responses", async () => {
    let clock = 0;
    const starts = [];
    const fetcher = createPoliteFetcher({ now: () => clock, sleep: async (ms) => { clock += ms; }, maxRetries: 0, fetchImpl: async () => { starts.push(clock); return new Response("limited", { status: 429 }); } });
    const results = await Promise.all(Array.from({ length: 3 }, () => fetcher(`${origin}/en`)));
    expect(starts).toEqual([0, 350, 700]);
    expect(results.map((result) => result.status)).toEqual([429, 429, 429]);
    expect(fetcher.stats.retries).toBe(0);
  });
  it("rechecks a shared cooldown when a 429 arrives during another queued caller's wait", async () => {
    let clock = 0;
    let releaseFirstWait;
    const waiting = [];
    const starts = [];
    let count = 0;
    const fetcher = createPoliteFetcher({ now: () => clock, sleep: (ms) => new Promise((done) => { waiting.push(() => { clock += ms; done(); }); releaseFirstWait ??= () => waiting.shift()(); }), fetchImpl: async () => { starts.push(clock); return ++count === 1 ? new Response("limited", { status: 429, headers: { "Retry-After": "2" } }) : new Response("ok"); } });
    const first = fetcher(`${origin}/en`);
    const second = fetcher(`${origin}/zh`);
    for (let turn = 0; turn < 20; turn++) await Promise.resolve();
    expect(waiting.length).toBeGreaterThan(0);
    releaseFirstWait();
    for (let turn = 0; turn < 20; turn++) await Promise.resolve();
    while (waiting.length) { waiting.shift()(); for (let turn = 0; turn < 20; turn++) await Promise.resolve(); }
    await Promise.all([first, second]);
    expect(starts[1]).toBeGreaterThanOrEqual(2000);
  });
  it("parses Retry-After dates and refuses to invent invalid delays", () => {
    const now = Date.parse("2026-11-20T00:00:00Z");
    expect(retryAfterMs("Fri, 20 Nov 2026 00:00:10 GMT", now)).toBe(10_000);
    expect(retryAfterMs("Fri, 20 Nov 2026 00:00:00 GMT", now + 1000)).toBe(0);
    expect(retryAfterMs("garbage", now)).toBeNull();
  });
  it("reports non-200 HTTP pages as failures rather than auditing their error bodies", async () => {
    const xml = `<urlset><url><loc>${origin}/en</loc></url></urlset>`;
    const fetcher = Object.assign(async (url) => url.endsWith("sitemap.xml") ? new Response(xml) : new Response("rate limited", { status: 429 }), { stats: { requests: 2, rateLimited: 1, retries: 0 } });
    const report = await runAudit({ mode: "http", base: "http://localhost:3477", fetcher });
    expect(report.failures).toEqual([{ url: `${origin}/en`, problems: ["HTTP 429"] }]);
    expect(report.scope).toContain("HTTP status");
  });
});
