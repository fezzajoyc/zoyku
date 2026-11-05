#!/usr/bin/env node
/**
 * 深度 SEO 审计(参考 ghb-next 的分层抽样 + 分级报告,适配 Zoyku):
 *
 *   node scripts/seo-deep-audit.mjs [--base http://localhost:3000] [--out reports/seo]
 *
 * 与 scripts/seo-audit.mjs(发布门禁,全量 sitemap)互补:
 * 那个查"每条 URL 都活着、canonical 一致";这个查"每类页面的深信号":
 *   - title 非空且 ≤70 / description 非空且 ≤165(钳制回归)
 *   - 恰好 1 个 h1
 *   - canonical 等于期望值(不是"存在"而是"正确")
 *   - hreflang 逐语验证目标 URL(15 语 + x-default,含 self)
 *   - 意外 noindex = P0;JSON-LD 不可解析/缺 @type = P0
 *   - robots.txt 声明 sitemap;基础设施端点(llms.txt / llms-mcp.txt / feed.xml / mcp GET)200
 *   - 慢响应(>3s)= P2
 * 分层抽样覆盖 15 语首页 / 分类 / 工具长尾 / 静态页 / 基础设施。
 * 退出码:发现 P0 → 1(CI 可用)。报告落盘 reports/seo/*.json + *.md。
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const argOf = (flag, fallback) => {
  const i = process.argv.indexOf(flag);
  return i === -1 ? fallback : process.argv[i + 1];
};
const BASE = (argOf("--base", process.env.BASE ?? "http://localhost:3000")).replace(/\/+$/, "");
const OUT_DIR = argOf("--out", "reports/seo");

const LOCALES = ["en", "zh", "ja", "es", "pt", "fr", "de", "ru", "it", "tr", "ko", "ar", "hi", "id", "vi"];
const CATEGORIES = ["pdf", "image", "text", "developer", "seo", "security", "utility"];

/** hreflang 期望目标:/{lang}{pathNoLang};x-default 恒指 /en 前缀。独立导出供测试。 */
export function expectedHref(lang, samplePath) {
  const pathNoLang = samplePath.replace(/^\/(?:[a-z]{2})(?=\/|$)/, "") || "";
  return `/${lang === "x-default" ? "en" : lang}${pathNoLang}`;
}

/** 分层样本。kind 决定附加检查(tool 页额外查 og:image/FAQPage)。 */
export function samples() {
  const out = [];
  for (const l of ["en", "zh", "ja", "es", "pt", "ar"]) out.push({ kind: "home", path: `/${l}` });
  out.push({ kind: "root", path: "/", expectRedirect: true });
  out.push({ kind: "directory", path: "/en/tools" });
  for (const cat of CATEGORIES) out.push({ kind: "category", path: `/en/categories/${cat}` });
  out.push({ kind: "category", path: "/zh/categories/pdf" });
  // 工具长尾:每类 1 个 + 长标题/长描述历史重灾区 + 边缘样本
  const toolPicks = [
    "word-counter", "merge-pdf", "image-compressor", "json-formatter", "meta-tag-generator",
    "password-generator", "bmi-calculator", "hmac-generator", "pdf-to-word", "heic-to-jpg",
    "base64-encoder", "lorem-ipsum-generator",
  ];
  for (const slug of toolPicks) out.push({ kind: "tool", path: `/en/tools/${slug}` });
  out.push({ kind: "tool", path: "/zh/tools/merge-pdf" });
  out.push({ kind: "tool-md", path: "/en/tools/word-counter.md" });
  for (const p of ["about", "privacy", "terms"]) out.push({ kind: "static", path: `/en/${p}` });
  return out;
}

const INFRA = [
  { kind: "robots", path: "/robots.txt", mustContain: "Sitemap:" },
  { kind: "sitemap", path: "/sitemap.xml", mustContain: "<urlset" },
  { kind: "llms", path: "/llms.txt", mustContain: "## Tools" },
  { kind: "llms-mcp", path: "/llms-mcp.txt", mustContain: "## Tools" },
  { kind: "feed", path: "/feed.xml", mustContain: "<rss" },
  { kind: "mcp", path: "/mcp", mustContain: "tools" },
];

export function checkPage(sample, r, locales = LOCALES) {
  const issues = [];
  const url = `${BASE}${sample.path}`;

  if (r.error) {
    issues.push({ url, type: "fetch-failed", sev: "P0", detail: r.error });
    return issues;
  }
  if (sample.expectRedirect) {
    if (!(r.status >= 301 && r.status <= 308)) {
      issues.push({ url, type: "unexpected-status", sev: "P1", detail: `expect redirect, got ${r.status}` });
    }
    return issues;
  }
  if (r.status !== 200) {
    issues.push({ url, type: "http-status", sev: r.status >= 500 ? "P0" : "P1", detail: `got ${r.status}` });
    return issues;
  }
  if (r.ms > 3000) issues.push({ url, type: "slow-response", sev: "P2", detail: `${r.ms}ms` });

  const html = r.body ?? "";

  // .md 是 text/markdown AI 答案页(无 HTML 结构),HTML 检查全部豁免,只留 status/slow
  const isMd = sample.path.endsWith(".md");
  if (!isMd) {
  // title / description / h1
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  if (!title.trim()) issues.push({ url, type: "missing-title", sev: "P0", detail: "" });
  else if (title.length > 70) issues.push({ url, type: "long-title", sev: "P2", detail: `${title.length}ch` });
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  if (!desc.trim()) issues.push({ url, type: "missing-description", sev: "P1", detail: "" });
  else if (desc.length > 165) issues.push({ url, type: "long-description", sev: "P2", detail: `${desc.length}ch` });
  const h1s = html.match(/<h1[ >]/g) ?? [];
  if (h1s.length !== 1) issues.push({ url, type: "h1-count", sev: "P1", detail: `got ${h1s.length}` });

  // noindex:不允许出现
  const robotsMeta = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
  if (/noindex/i.test(robotsMeta)) {
    issues.push({ url, type: "unexpected-noindex", sev: "P0", detail: robotsMeta });
  }

  // canonical 必须等于期望值
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  const wantCanonical = `${new URL(BASE).origin}${sample.path}`;
  if (!canonical) issues.push({ url, type: "missing-canonical", sev: "P1", detail: "" });
  else if (canonical !== wantCanonical) {
    issues.push({ url, type: "canonical-mismatch", sev: "P1", detail: `${canonical} want ${wantCanonical}` });
  }

  // hreflang:15 语 + x-default,目标逐语验证 + self 存在
    const hreflangs = [...html.matchAll(/hreflang="([^"]+)" href="([^"]+)"/gi)];
    const byLang = new Map(hreflangs.map(([, l, h]) => [l.toLowerCase(), h]));
    const expectedLangs = [...locales, "x-default"];
    // zh/pt 在 HTML 里以 zh-CN/pt-BR(ISO 地区码形态)输出——URL /zh /pt 的合法等价
    const langMatches = (l) => byLang.has(l) || (l === "zh" && byLang.has("zh-cn")) || (l === "pt" && byLang.has("pt-br"));
    const missing = expectedLangs.filter((l) => !langMatches(l));
    if (missing.length) issues.push({ url, type: "hreflang-incomplete", sev: "P1", detail: `missing: ${missing.join(",")}` });
    for (const l of expectedLangs) {
      if (!byLang.has(l)) continue;
      const got = byLang.get(l);
      const wantPath = expectedHref(l, sample.path);
      if (!got.endsWith(wantPath)) {
        issues.push({ url, type: "hreflang-wrong-target", sev: "P1", detail: `${l} → ${got} (want …${wantPath})` });
      }
    }
  }

  // JSON-LD:每块可解析、是对象、带 @type
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const parsed = JSON.parse(m[1]);
      const nodes = Array.isArray(parsed) ? parsed : [parsed];
      const bad = nodes.some((n) => typeof n !== "object" || n === null || Array.isArray(n) || !n["@type"]);
      if (bad) {
        issues.push({ url, type: "ld+json-invalid", sev: "P1", detail: "missing @type or not an object" });
      }
    } catch (e) {
      issues.push({ url, type: "ld+json-unparsable", sev: "P0", detail: String(e).slice(0, 80) });
    }
  }

  // 工具页附加:og:image 与 FAQPage 必须在场
  if (sample.kind === "tool") {
    if (!/og:image/.test(html)) issues.push({ url, type: "missing-og-image", sev: "P1", detail: "" });
    if (!/FAQPage/.test(html)) issues.push({ url, type: "missing-faq-schema", sev: "P1", detail: "" });
  }
  // 工具 .md 答案页:应为纯文本 markdown
  if (sample.kind === "tool-md" && !/^#/.test((r.body ?? "").trim())) {
    issues.push({ url, type: "md-not-markdown", sev: "P1", detail: "does not start with heading" });
  }
  return issues;
}

async function fetchOne(path) {
  const started = Date.now();
  try {
    const res = await fetch(`${BASE}${path}`, { redirect: "manual", signal: AbortSignal.timeout(20_000) });
    const body = res.status === 200 ? await res.text() : "";
    return { status: res.status, body, ms: Date.now() - started };
  } catch (e) {
    return { status: 0, body: "", ms: Date.now() - started, error: String(e && e.message || e) };
  }
}

const SEV_RANK = { P0: 0, P1: 1, P2: 2 };

async function main() {
  const pages = samples();
  const issues = [];

  // 页面抽样,低并发
  const queue = [...pages];
  const CONCURRENCY = 6;
  async function worker() {
    while (queue.length) {
      const sample = queue.shift();
      const r = await fetchOne(sample.path);
      issues.push(...checkPage(sample, r));
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  // 基础设施端点
  for (const item of INFRA) {
    const r = await fetchOne(item.path);
    if (r.error || r.status !== 200) {
      issues.push({ url: `${BASE}${item.path}`, type: "infra-unreachable", sev: "P0", detail: r.error || `status ${r.status}` });
    } else if (item.mustContain && !r.body.includes(item.mustContain)) {
      issues.push({ url: `${BASE}${item.path}`, type: "infra-content", sev: "P1", detail: `missing ${item.mustContain}` });
    }
  }

  // robots.txt 声明的 sitemap 必须真的可达
  const robotsRes = await fetchOne("/robots.txt");
  const declaredSitemaps = [...robotsRes.body?.matchAll(/Sitemap:\s*(\S+)/g)]?.map((m) => m[1]) ?? [];
  for (const sm of declaredSitemaps.slice(0, 3)) {
    const smPath = sm.replace(BASE, "") || new URL(sm).pathname;
    const r = await fetchOne(smPath);
    if (r.status !== 200) {
      issues.push({ url: sm, type: "sitemap-unreachable", sev: "P0", detail: `declared in robots.txt, status ${r.status}` });
    }
  }
  if (robotsRes.status === 200 && declaredSitemaps.length === 0) {
    issues.push({ url: `${BASE}/robots.txt`, type: "robots-no-sitemap", sev: "P1", detail: "no Sitemap: line" });
  }

  issues.sort((a, b) => SEV_RANK[a.sev] - SEV_RANK[b.sev]);
  const bySeverity = { P0: 0, P1: 0, P2: 0 };
  for (const i of issues) bySeverity[i.sev]++;

  const report = {
    base: BASE,
    generatedAt: new Date().toISOString(),
    sampleCount: pages.length + INFRA.length,
    issueCount: issues.length,
    bySeverity,
    issues,
  };

  mkdirSync(OUT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 16);
  const jsonPath = join(OUT_DIR, `seo-deep-${stamp}.json`);
  const mdPath = join(OUT_DIR, `seo-deep-${stamp}.md`);
  writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  const md = [
    `# Zoyku 深度 SEO 审计 — ${report.generatedAt}`,
    ``,
    `- 基准:${BASE}`,
    `- 样本:${report.sampleCount} 页(分层:15 语首页×6 / 分类×8 / 工具×13 / 静态×3 / 基础设施×6 + sitemap 抽验)`,
    `- 结果:**P0=${bySeverity.P0} P1=${bySeverity.P1} P2=${bySeverity.P2}**`,
    ``,
    ...issues.map((i) => `- **${i.sev}** ${i.type} — ${i.url}${i.detail ? ` · ${i.detail}` : ""}`),
    "",
  ].join("\n");
  writeFileSync(mdPath, md);

  console.log(`样本 ${report.sampleCount} → P0=${bySeverity.P0} P1=${bySeverity.P1} P2=${bySeverity.P2}`);
  console.log(`报告:${jsonPath}`);
  if (bySeverity.P0 > 0) {
    for (const i of issues.filter((x) => x.sev === "P0")) console.error(`P0 ${i.type} ${i.url} ${i.detail}`);
    process.exit(1);
  }
}

// 被 import 时(测试)不自动执行
if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
