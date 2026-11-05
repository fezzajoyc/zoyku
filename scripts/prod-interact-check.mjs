#!/usr/bin/env node
/**
 * R4 生产抽查脚本(打磨程序自我完善产物):
 * 对给定工具页做"SSR 内容 + CDN 缓存"抽查,替代人工 curl 逐条敲:
 *   node scripts/prod-interact-check.mjs https://zoyku.com en tools/bmi-calculator "22.5"
 *   node scripts/prod-interact-check.mjs https://zoyku.com ko tools/bmi-calculator "정상 체중"
 * 校验项:
 *   1) HTTP 200
 *   2) SSR HTML 包含期望片段(交互引擎的文案走 chunk,SSR 查不到属预期——用页面级可断言内容)
 *   3) x-vercel-cache 命中(HIT/PRERENDER;MISS = 静态化回归,直接报错)
 *   4) cache-control 不含 private(同上)
 * 退出码:0 = 全过;1 = 任何失败。
 */

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error("usage: node scripts/prod-interact-check.mjs <base-url> <locale> <path-suffix> [expect-ssr]...");
  process.exit(1);
}
const [base, locale, suffix, ...expects] = args;
const url = `${base.replace(/\/$/, "")}/${locale}/${suffix.replace(/^\//, "")}`;

const res = await fetch(url, { headers: { "user-agent": "zoyku-prod-check/1.0" } });
const html = await res.text();
let fail = 0;

const say = (ok, label, detail) => {
  console.log(`${ok ? "✓" : "✗"} ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) fail++;
};

say(res.status === 200, `HTTP 200`, `got ${res.status}`);

const cache = res.headers.get("x-vercel-cache") ?? "(no header)";
const cc = res.headers.get("cache-control") ?? "";
say(/HIT|PRERENDER/.test(cache), `CDN cache HIT/PRERENDER`, cache);
say(!/private/.test(cc), `cache-control public`, cc);

for (const expect of expects) {
  say(html.includes(expect), `SSR contains ${JSON.stringify(expect.slice(0, 60))}`);
}

console.log(fail === 0 ? `ALL PASS ${url}` : `${fail} FAILURES ${url}`);
process.exit(fail === 0 ? 0 : 1);
