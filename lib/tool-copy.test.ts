import { describe, expect, it } from "vitest";
import { withCategoryFaqs } from "./tool-copy";
import type { ToolCopy } from "@/tools/_lib/types";

const base: ToolCopy = {
  name: "T",
  tagline: "tag",
  intro: ["i"],
  steps: ["a", "b", "c"],
  faqs: [{ q: "Is this tool free to use?", a: "yes" }, { q: "Own question?", a: "own" }],
};

describe("withCategoryFaqs", () => {
  it("补足到 6 条并去重(类目池里同题不重复)", () => {
    const out = withCategoryFaqs(base, "developer", "en");
    expect(out.faqs.length).toBeGreaterThanOrEqual(6);
    const qs = out.faqs.map((f) => f.q.toLowerCase());
    expect(new Set(qs).size).toBe(qs.length);
    expect(out.faqs[1]).toBe(base.faqs[1]); // 原有顺序保持
  });
  it("已 ≥6 条时原样返回", () => {
    const many: ToolCopy = { ...base, faqs: Array.from({ length: 6 }, (_, i) => ({ q: `q${i}`, a: "a" })) };
    expect(withCategoryFaqs(many, "pdf", "en")).toBe(many);
  });
  it("中文 locale 用中文池", () => {
    const out = withCategoryFaqs(base, "security", "zh");
    expect(out.faqs.some((f) => /免费|安全/.test(f.q))).toBe(true);
  });
});
