import { describe, expect, it } from "vitest";
import { ALL_TOOLS } from "@/tools/registry";

/**
 * deepDive 覆盖契约。
 *
 * 背景:大部分工具的 copy 由工厂函数生成(chinese-id-copy / social-credit-copy /
 * rmb-uppercase-copy 等)。工厂里漏掉 deepDive 时,**源码 grep 会误判为已覆盖**
 * (因为其它语种可能直接写在工具文件里),只有走 registry 读运行时对象才看得见。
 * 这个测试就是那面镜子:它直接断言「每个工具 × 每个核心语种都有 ≥2 节深文」。
 *
 * 为什么要 ≥2 节而不是 ≥1:全站 deepDive 规范是 2 节 × 3 段,单节深文属半成品。
 * 覆盖目标为 5 个核心语(en/zh/ja/es/pt);其余 10 个 overlay 语种允许回退 en。
 */
const CORE = ["en", "zh", "ja", "es", "pt"] as const;

describe("deepDive coverage", () => {
  it("every tool has at least 2 deepDive sections in all five core locales", () => {
    const problems: string[] = [];
    for (const tool of ALL_TOOLS) {
      for (const locale of CORE) {
        const copy = (tool.copy as Record<string, unknown>)[locale] as
          | { deepDive?: { heading: string; paragraphs: string[] }[] }
          | undefined;
        const dd = copy?.deepDive;
        if (!Array.isArray(dd) || dd.length < 2) {
          problems.push(`${tool.slug}[${locale}]:${Array.isArray(dd) ? dd.length : 0}`);
        }
      }
    }
    expect(problems, `missing deepDive: ${problems.slice(0, 30).join(", ")}${problems.length > 30 ? ` …(+${problems.length - 30})` : ""}`).toEqual([]);
  });

  it("every deepDive section has a heading and at least 2 substantive paragraphs", () => {
    const problems: string[] = [];
    for (const tool of ALL_TOOLS) {
      for (const locale of CORE) {
        const copy = (tool.copy as Record<string, unknown>)[locale] as
          | { deepDive?: { heading: string; paragraphs: string[] }[] }
          | undefined;
        for (const [i, sec] of (copy?.deepDive ?? []).entries()) {
          // CJK 一个字符承载的信息量远高于拉丁字母:中文 6 字的标题已是完整表述,
          // 英文 6 词(约 30 字符)才相当。阈值必须按语言区分,否则只会惩罚写法而不评判内容。
          const minHeading = locale === "zh" || locale === "ja" ? 6 : 14;
          if (!sec.heading || sec.heading.trim().length < minHeading) {
            problems.push(`${tool.slug}[${locale}]#${i} heading too short (${sec.heading?.length ?? 0} < ${minHeading})`);
          }
          if (!Array.isArray(sec.paragraphs) || sec.paragraphs.length < 2) {
            problems.push(`${tool.slug}[${locale}]#${i} <2 paragraphs`);
          } else if (sec.paragraphs.some((p) => typeof p !== "string" || p.trim().length < 40)) {
            // 阈值 40 而非 100:CJK 段落字符密度远高于英文,40 个汉字已是实质内容;
            // 该断言的目的在于抓空桩/占位,而不是评判文风长短。
            problems.push(`${tool.slug}[${locale}]#${i} paragraph too short`);
          }
        }
      }
    }
    expect(problems.slice(0, 20)).toEqual([]);
  });
});
