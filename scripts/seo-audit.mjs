#!/usr/bin/env node
/**
 * Audit the production output without crawling the server:
 *   node scripts/seo-audit.mjs --mode static --build-dir .next/server/app
 * Then verify a bounded set of actual HTTP responses:
 *   BASE=http://localhost:3000 node scripts/seo-audit.mjs --mode http --sample 24
 * HTTP mode also supports a full crawl, paced below the public 40 requests/10s limit.
 * Static mode checks generated content and file presence; it cannot prove HTTP status/routing.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { readJsonLd, hasSchemaType } from "./schema-utils.mjs";

export const SEO_LOCALES = ["en", "zh", "ja", "es", "pt", "fr", "de", "ru", "it", "tr", "ko", "ar", "hi", "id", "vi"];
const pause = (ms) => new Promise((done) => setTimeout(done, ms));

export function retryAfterMs(value, now = Date.now()) {
  if (!value?.trim()) return null;
  if (/^\d+(?:\.\d+)?$/.test(value.trim())) return Number(value) * 1000;
  const date = Date.parse(value);
  return Number.isFinite(date) ? Math.max(0, date - now) : null;
}

/** One shared request gate: concurrent callers cannot create a burst or evade a 429 cooldown. */
export function createPoliteFetcher({ intervalMs = 350, maxRetries = 2, fetchImpl = fetch, sleep = pause, now = Date.now } = {}) {
  let nextAt = 0;
  let gate = Promise.resolve();
  const stats = { requests: 0, rateLimited: 0, retries: 0 };
  const acquire = () => {
    const turn = gate.then(async () => {
      let wait;
      while ((wait = Math.max(0, nextAt - now())) > 0) await sleep(wait);
      nextAt = now() + intervalMs;
    });
    gate = turn.catch(() => {});
    return turn;
  };
  const request = async (url, init = {}) => {
    for (let attempt = 0; ; attempt++) {
      await acquire();
      stats.requests++;
      const response = await fetchImpl(url, { ...init, signal: init.signal ?? AbortSignal.timeout(20_000) });
      if (response.status !== 429) return response;
      stats.rateLimited++;
      if (attempt >= maxRetries) return response;
      stats.retries++;
      nextAt = Math.max(nextAt, now() + (retryAfterMs(response.headers.get("retry-after"), now()) ?? 10_000));
      await response.body?.cancel();
    }
  };
  request.stats = stats;
  return request;
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(([, key, value]) => [key.toLowerCase(), value.replaceAll("&amp;", "&")]));
}

export function sitemapUrls(xml) {
  const urls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => match[1].replaceAll("&amp;", "&"));
  if (!urls.length) throw new Error("sitemap contains no URLs");
  if (new Set(urls).size !== urls.length) throw new Error("sitemap contains duplicate URLs");
  for (const url of urls) if (!/^https?:$/.test(new URL(url).protocol)) throw new Error(`unsupported sitemap URL: ${url}`);
  return urls;
}

export function generatedHtmlPath(buildDir, url) {
  const root = resolve(buildDir);
  const parsed = new URL(url);
  const pathname = decodeURIComponent(parsed.pathname);
  if (parsed.search || parsed.hash || pathname.includes("\\") || pathname.split("/").includes("..")) throw new Error(`unsupported generated URL path: ${url}`);
  const file = resolve(root, `${pathname.replace(/^\/+|\/+$/g, "") || "index"}.html`);
  if (!file.startsWith(`${root}${sep}`)) throw new Error(`generated path escapes build directory: ${url}`);
  return file;
}

/** Content checks are identical for filesystem and HTTP mode, using public sitemap canonicals. */
export function checkSitemapHtml(url, html, titles = new Map(), locales = SEO_LOCALES) {
  const problems = [];
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => attributes(match[0]));
  const canonicals = links.filter((link) => link.rel === "canonical");
  if (canonicals.length !== 1) problems.push(`canonical count ${canonicals.length} (expected 1)`);
  else if (canonicals[0].href !== url) problems.push(`canonical mismatch: ${canonicals[0].href}`);
  const alternates = new Map(links.filter((link) => link.hreflang).map((link) => [link.hreflang.toLowerCase().replace("zh-cn", "zh").replace("pt-br", "pt"), link.href]));
  const parsed = new URL(url);
  const suffix = parsed.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  for (const locale of [...locales, "x-default"]) {
    const want = `${parsed.origin}/${locale === "x-default" ? "en" : locale}${suffix}`;
    if (!alternates.has(locale)) problems.push(`missing hreflang: ${locale}`);
    else if (alternates.get(locale) !== want) problems.push(`hreflang target mismatch: ${locale} → ${alternates.get(locale)}`);
  }
  const h1 = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  if (h1 !== 1) problems.push(`h1 count ${h1} (expected 1)`);
  const title = html.match(/<title\b[^>]*>([^<]*)<\/title>/i)?.[1].trim() ?? "";
  if (!title) problems.push("empty title");
  else if (titles.has(title)) problems.push(`duplicate title: ${titles.get(title)}`);
  else titles.set(title, url);
  const robots = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => attributes(match[0])).filter((meta) => meta.name === "robots");
  if (robots.some((meta) => /\bnoindex\b/i.test(meta.content ?? ""))) problems.push("unexpected noindex");
  const schema = readJsonLd(html);
  for (const error of schema.errors) problems.push(`JSON-LD ${error.kind}: ${error.message}`);
  if (/\/tools\/[^/]+$/.test(parsed.pathname) && !parsed.pathname.endsWith(".md")) {
    if (![...html.matchAll(/<meta\b[^>]*>/gi)].some((match) => attributes(match[0]).property === "og:image")) problems.push("missing og:image");
    if (!hasSchemaType(schema.nodes, "WebApplication")) problems.push("missing WebApplication schema");
  }
  return problems;
}

/** Cover each page kind, then spread the remaining bounded sample across languages and long-tail URLs. */
export function sampleUrls(urls, count) {
  if (count >= urls.length) return [...urls];
  const selected = new Set();
  const kinds = new Set();
  for (const url of urls) {
    const path = new URL(url).pathname;
    const kind = /\/tools\//.test(path) ? "tool" : /\/categories\//.test(path) ? "category" : /\/tools$/.test(path) ? "directory" : "home";
    if (!kinds.has(kind) && selected.size < count) { selected.add(url); kinds.add(kind); }
  }
  if (selected.size < count) selected.add(urls.at(-1));
  const remaining = count - selected.size;
  for (let index = 1; selected.size < count && index <= remaining; index++) selected.add(urls[Math.round(index * (urls.length - 1) / (remaining + 1))]);
  for (let index = 0; selected.size < count && index < count; index++) selected.add(urls[Math.round(index * (urls.length - 1) / Math.max(1, count - 1))]);
  for (const url of urls) { if (selected.size >= count) break; selected.add(url); }
  return [...selected];
}

export async function runAudit({ mode = "http", base = process.env.BASE ?? "http://localhost:3456", buildDir = ".next/server/app", sitemapPath, lang, sample, limit, fetcher = createPoliteFetcher(), onProgress = () => {} } = {}) {
  if (!["static", "http"].includes(mode)) throw new Error(`unsupported audit mode: ${mode}`);
  let xml;
  if (mode === "static") xml = await readFile(sitemapPath ?? resolve(buildDir, "sitemap.xml.body"), "utf8");
  else {
    const response = await fetcher(`${base.replace(/\/+$/, "")}/sitemap.xml`);
    if (response.status !== 200) throw new Error(`sitemap HTTP ${response.status}`);
    xml = await response.text();
  }
  let urls = sitemapUrls(xml);
  const total = urls.length;
  if (lang) urls = urls.filter((url) => new URL(url).pathname.split("/")[1] === lang);
  if (sample) urls = sampleUrls(urls, sample);
  if (limit) urls = urls.slice(0, limit);
  if (!urls.length) throw new Error("no sitemap URLs match the selected audit scope");
  const failures = [];
  const titles = new Map();
  for (let index = 0; index < urls.length; index++) {
    const url = urls[index];
    let html;
    const problems = [];
    try {
      if (mode === "static") html = await readFile(generatedHtmlPath(buildDir, url), "utf8");
      else {
        const parsed = new URL(url);
        const response = await fetcher(`${base.replace(/\/+$/, "")}${parsed.pathname}${parsed.search}`, { redirect: "manual" });
        if (response.status !== 200) problems.push(`HTTP ${response.status}`);
        else html = await response.text();
      }
      if (html !== undefined) problems.push(...checkSitemapHtml(url, html, titles));
    } catch (error) { problems.push(`${mode === "static" ? "generated HTML unavailable" : "fetch failed"}: ${error.message}`); }
    if (problems.length) failures.push({ url, problems });
    if ((index + 1) % 500 === 0) onProgress(index + 1, urls.length);
  }
  return { mode, source: mode === "static" ? resolve(buildDir) : base, generatedAt: new Date().toISOString(), sitemapCount: total, checked: urls.length, selectedUrls: urls, failures, http: mode === "http" ? { ...fetcher.stats } : null, scope: mode === "static" ? "Generated HTML content/file presence; HTTP routing/status not checked" : "HTTP status and sitemap HTML content" };
}

export function parseAuditArgs(args) {
  const options = {};
  const flags = { "--mode": "mode", "--base": "base", "--build-dir": "buildDir", "--sitemap": "sitemapPath", "--lang": "lang", "--sample": "sample", "--limit": "limit", "--out": "out" };
  for (let index = 0; index < args.length; index++) {
    const key = flags[args[index]];
    if (!key || !args[index + 1] || args[index + 1].startsWith("--")) throw new Error(`invalid audit option: ${args[index]}`);
    const value = args[++index];
    options[key] = ["sample", "limit"].includes(key) ? Number(value) : value;
    if (["sample", "limit"].includes(key) && (!Number.isSafeInteger(options[key]) || options[key] <= 0)) throw new Error(`${key} must be a positive integer`);
  }
  return options;
}

async function main() {
  try {
    const { out, ...options } = parseAuditArgs(process.argv.slice(2));
    const report = await runAudit({ ...options, onProgress: (checked, total) => console.log(`  … ${checked}/${total}`) });
    if (out) { await mkdir(dirname(resolve(out)), { recursive: true }); await writeFile(out, `${JSON.stringify(report, null, 2)}\n`); }
    console.log(`${report.mode} audit: ${report.checked}/${report.sitemapCount} sitemap URLs; ${report.scope}`);
    if (report.http) console.log(`HTTP requests=${report.http.requests}, 429=${report.http.rateLimited}, retries=${report.http.retries}`);
    if (report.failures.length) {
      console.error(`✗ ${report.failures.length} URLs failed:`);
      for (const failure of report.failures.slice(0, 30)) console.error(`  ${failure.url}\n    - ${failure.problems.join("\n    - ")}`);
      process.exitCode = 1;
    } else console.log(`✓ ${report.checked}/${report.checked} passed (canonical/hreflang/h1/title/JSON-LD/OG/WebApplication)`);
  } catch (error) { console.error(`SEO audit failed: ${error.message}`); process.exitCode = 1; }
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await main();
