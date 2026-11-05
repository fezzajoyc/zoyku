import { describe, it, expect } from "vitest";
import { expectedHref, checkPage, samples } from "./seo-deep-audit.mjs";

const LOCALES = ["en", "zh", "ja", "es", "pt", "fr", "de", "ru", "it", "tr", "ko", "ar", "hi", "id", "vi"];

function htmlOf(overrides = {}) {
  return `<!doctype html><html><head>
<title>Zoyku — free browser tools</title>
<meta name="description" content="${"d".repeat(140)}">
<meta property="og:image" content="http://localhost:3000/en/tools/word-counter/opengraph-image">
<link rel="canonical" href="http://localhost:3000/en/tools/word-counter">
${LOCALES.map((l) => `<link rel="alternate" hreflang="${l}" href="http://localhost:3000/${l}/tools/word-counter">`).join("\n")}
<link rel="alternate" hreflang="x-default" href="http://localhost:3000/en/tools/word-counter">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage"}</script>
</head><body><h1>Word Counter</h1></body></html>${overrides.tail ?? ""}`;
}

describe("expectedHref", () => {
  it("语言前缀替换为对应语言", () => {
    expect(expectedHref("zh", "/en/tools/word-counter")).toBe("/zh/tools/word-counter");
    expect(expectedHref("en", "/zh/tools/merge-pdf")).toBe("/en/tools/merge-pdf");
  });
  it("x-default 恒指 /en", () => {
    expect(expectedHref("x-default", "/zh/categories/pdf")).toBe("/en/categories/pdf");
  });
  it("根路径处理", () => {
    expect(expectedHref("ko", "/en")).toBe("/ko");
  });
});

describe("checkPage", () => {
  const BASE = "http://localhost:3000";

  it("干净页面零问题", () => {
    const issues = checkPage(
      { kind: "tool", path: "/en/tools/word-counter" },
      { status: 200, body: htmlOf(), ms: 100 },
      LOCALES,
    );
    expect(issues).toEqual([]);
  });

  it("缺 title 是 P0;超长 title/desc 是 P2", () => {
    const issues = checkPage(
      { kind: "home", path: "/en" },
      { status: 200, body: htmlOf().replace(/<title>[^<]*<\/title>/, "<title></title>"), ms: 100 },
      LOCALES,
    );
    expect(issues.some((i) => i.type === "missing-title" && i.sev === "P0")).toBe(true);

    const longTitle = "X".repeat(90);
    const issues2 = checkPage(
      { kind: "home", path: "/en" },
      { status: 200, body: htmlOf().replace(/<title>[^<]*<\/title>/, `<title>${longTitle}</title>`), ms: 100 },
      LOCALES,
    );
    expect(issues2.some((i) => i.type === "long-title" && i.sev === "P2")).toBe(true);
  });

  it("noindex 是 P0;.md 页面豁免 hreflang", () => {
    const issues = checkPage(
      { kind: "home", path: "/en" },
      { status: 200, body: htmlOf({ tail: '<meta name="robots" content="noindex">' }), ms: 100 },
      LOCALES,
    );
    expect(issues.some((i) => i.type === "unexpected-noindex" && i.sev === "P0")).toBe(true);
  });

  it("canonical 错位报 P1", () => {
    const body = htmlOf().replace(
      'rel="canonical" href="http://localhost:3000/en/tools/word-counter"',
      'rel="canonical" href="http://localhost:3000/en"',
    );
    const issues = checkPage(
      { kind: "tool", path: "/en/tools/word-counter" },
      { status: 200, body, ms: 100 },
      LOCALES,
    );
    expect(issues.some((i) => i.type === "canonical-mismatch")).toBe(true);
  });

  it("hreflang 缺语言报 incomplete;错位报 wrong-target", () => {
    const body = htmlOf().replace('hreflang="de"', 'hreflang="xx"');
    const issues = checkPage(
      { kind: "tool", path: "/en/tools/word-counter" },
      { status: 200, body, ms: 100 },
      LOCALES,
    );
    expect(issues.some((i) => i.type === "hreflang-incomplete" && i.detail.includes("de"))).toBe(true);

    const wrong = htmlOf().replace(
      'hreflang="ja" href="http://localhost:3000/ja/tools/word-counter"',
      'hreflang="ja" href="http://localhost:3000/en/tools/word-counter"',
    );
    const issues2 = checkPage(
      { kind: "tool", path: "/en/tools/word-counter" },
      { status: 200, body: wrong, ms: 100 },
      LOCALES,
    );
    expect(issues2.some((i) => i.type === "hreflang-wrong-target" && i.detail.startsWith("ja"))).toBe(true);
  });

  it("JSON-LD 不可解析报 P0;数组每项必须带 @type(缺则 P1)", () => {
    const broken = htmlOf().replace(
      '{"@context":"https://schema.org","@type":"FAQPage"}',
      '{"@context": broken,,,}',
    );
    const issues = checkPage(
      { kind: "home", path: "/en" },
      { status: 200, body: broken, ms: 100 },
      LOCALES,
    );
    expect(issues.some((i) => i.type === "ld+json-unparsable" && i.sev === "P0")).toBe(true);

    const arr = htmlOf().replace(
      '{"@context":"https://schema.org","@type":"FAQPage"}',
      '[{"@type":"Thing"},{"context":"no-type"}]',
    );
    const issues2 = checkPage(
      { kind: "home", path: "/en" },
      { status: 200, body: arr, ms: 100 },
      LOCALES,
    );
    expect(issues2.some((i) => i.type === "ld+json-invalid")).toBe(true);
  });

  it("工具页缺 og:image/FAQPage 报 P1;重定向样本检查 3xx", () => {
    const noOg = htmlOf().replace(/<meta property="og:image"[^>]*>/, "");
    const issues = checkPage(
      { kind: "tool", path: "/en/tools/word-counter" },
      { status: 200, body: noOg, ms: 100 },
      LOCALES,
    );
    expect(issues.some((i) => i.type === "missing-og-image")).toBe(true);

    const issues2 = checkPage(
      { kind: "root", path: "/", expectRedirect: true },
      { status: 200, body: "", ms: 100 },
      LOCALES,
    );
    expect(issues2.some((i) => i.type === "unexpected-status")).toBe(true);
  });

  it("慢响应报 P2;5xx 报 P0", () => {
    const issues = checkPage(
      { kind: "home", path: "/en" },
      { status: 200, body: htmlOf(), ms: 4000 },
      LOCALES,
    );
    expect(issues.some((i) => i.type === "slow-response" && i.sev === "P2")).toBe(true);

    const issues2 = checkPage(
      { kind: "home", path: "/en" },
      { status: 503, body: "", ms: 100 },
      LOCALES,
    );
    expect(issues2.some((i) => i.type === "http-status" && i.sev === "P0")).toBe(true);
  });
});

describe("samples", () => {
  it("分层覆盖:首页 6 语、7 分类、工具含 hmac-generator 重灾样本", () => {
    const s = samples();
    const homes = s.filter((x) => x.kind === "home");
    expect(homes.length).toBe(6);
    expect(s.filter((x) => x.kind === "category").length).toBe(8);
    expect(s.some((x) => x.path.includes("hmac-generator"))).toBe(true);
    expect(s.some((x) => x.kind === "tool-md")).toBe(true);
  });
});
