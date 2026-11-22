import { describe, expect, it } from "vitest";
import { convertChineseText, CHINESE_VARIANT_LABELS } from "@/tools/_lib/chinese-text-convert";
import { convertToPinyin } from "@/tools/_lib/pinyin-convert";

/** CN-016 简繁 + CN-014 拼音。锚 = opencc-js/pinyin-pro 库输出 × 手工核对。 */

describe("convertChineseText(简繁)", () => {
  it("简→繁:基本转换", async () => {
    const r = await convertChineseText("简体中文", "s2t");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toContain("簡體");
  });
  it("简→繁(台):台湾用词", async () => {
    const r = await convertChineseText("简体中文", "s2tw");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toContain("簡體");
  });
  it("繁→简", async () => {
    const r = await convertChineseText("繁體中文轉換", "t2s");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toContain("繁体");
  });
  it("空输入拒绝", async () => {
    expect((await convertChineseText("", "s2t")).ok).toBe(false);
  });
  it("台湾变体含词汇:软件→軟體(opencc-js to:'twp')", async () => {
    const r = await convertChineseText("软件", "s2tw");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toBe("軟體");
  });
  it("标准繁体不带地区词汇:软件→軟件(opencc-js to:'t')", async () => {
    const r = await convertChineseText("软件", "s2t");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toBe("軟件");
  });
  it("香港繁体词汇保留:软件→軟件", async () => {
    const r = await convertChineseText("软件", "s2hk");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toBe("軟件");
  });
});

describe("convertToPinyin(拼音)", () => {
  it("带声调:中文 → zhōng wén", async () => {
    const r = await convertToPinyin("中文", "tone");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toContain("zhōng");
  });
  it("多音字:重庆 → chóng qìng(非 zhòng)", async () => {
    const r = await convertToPinyin("重庆", "tone");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toContain("chóng");
  });
  it("首字母:中文 → z w", async () => {
    const r = await convertToPinyin("中文", "first");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toBe("z w");
  });
  it("无声调模式存在", async () => {
    const r = await convertToPinyin("中文", "num");
    expect(r.ok).toBe(true);
  });
  it("无汉字输入 → noChinese", async () => {
    expect((await convertToPinyin("hello world", "tone")).ok).toBe(false);
  });
  it("空输入拒绝", async () => {
    expect((await convertToPinyin("", "tone")).ok).toBe(false);
  });
});
