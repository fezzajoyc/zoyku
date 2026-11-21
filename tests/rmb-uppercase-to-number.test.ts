import { describe, expect, it } from "vitest";
import { parseRmbUppercase } from "@/tools/_lib/rmb-uppercase-to-number";
import { convertRmbUppercase, RMB_UPPERCASE_SOURCE } from "@/tools/_lib/rmb-uppercase";

const OFFICIAL = [
  ["人民币壹仟肆佰零玖元伍角", "1409.50"],
  ["人民币陆仟零柒元壹角肆分", "6007.14"],
  ["人民币壹仟陆佰捌拾元零叁角贰分", "1680.32"],
  ["人民币壹仟陆佰捌拾元叁角贰分", "1680.32"],
  ["人民币壹拾万柒仟元零伍角叁分", "107000.53"],
  ["人民币壹拾万零柒仟元伍角叁分", "107000.53"],
  ["人民币壹万陆仟肆佰零玖元零贰分", "16409.02"],
  ["人民币叁佰贰拾伍元零肆分", "325.04"],
] as const;

describe("strict RMB financial uppercase reverse parsing", () => {
  it.each(OFFICIAL)("parses the actually read official spelling %s", (text, amount) => {
    expect(parseRmbUppercase(text)).toMatchObject({ ok: true, normalizedAmount: amount, minorUnits: amount.replace(".", "") });
  });

  it.each([
    ["零元整", "0.00", "0"], ["零元正", "0.00", "0"], ["壹元整", "1.00", "100"],
    ["人民币壹元正", "1.00", "100"], ["壹拾元整", "10.00", "1000"],
    ["零元壹角", "0.10", "10"], ["零元零壹分", "0.01", "1"], ["壹元伍角正", "1.50", "150"],
    ["壹拾元伍角", "10.50", "1050"], ["壹拾元零伍角整", "10.50", "1050"],
    ["人民币壹億零貳萬陸仟圓正", "100026000.00", "10002600000"],
    ["玖仟玖佰玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖元玖角玖分", "999999999999.99", "99999999999999"],
  ])("supports scoped financial form %s", (input, normalizedAmount, minorUnits) => {
    expect(parseRmbUppercase(input)).toMatchObject({ ok: true, normalizedAmount, minorUnits });
  });

  it.each([
    "壹佰佰元整", "壹拾佰元整", "壹佰壹元整", "壹佰零壹拾元整", "零壹元整", "壹零元整",
    "壹亿零零壹元整", "壹亿零万元整", "壹万元零整", "壹元", "壹元整正", "壹元壹角贰分整",
    "壹元伍分", "壹元零零伍分", "壹元零角伍分", "壹元零伍角", "人民币人民币壹元整", "壹元人民币整",
    "abc壹元整xyz", "￥壹元整", "-壹元整", "负壹元整", "一百一", "一元整", "两元整", "〇元整", "壹元叁厘",
    "壹角伍分", "壹点伍元整", "人民幣壹元整", "參元整", "壹圆整", "壹万亿元整", "壹元 整", "壹元\n整", "壹元\u200b整",
  ])("rejects unsupported or ambiguous input without repairing it: %j", (input) => {
    expect(parseRmbUppercase(input).ok).toBe(false);
  });

  it.each([null, undefined, 1.23, NaN, Infinity, {}, [], true])("rejects non-text %j without throwing", (input) => {
    expect(parseRmbUppercase(input)).toMatchObject({ ok: false });
  });

  it("bounds the raw UTF-16 input before trimming, and reports normalization", () => {
    expect(parseRmbUppercase(" ".repeat(125) + "壹元整")).toMatchObject({ ok: true, normalizedAmount: "1.00", normalizationApplied: true });
    expect(parseRmbUppercase(" ".repeat(126) + "壹元整")).toMatchObject({ ok: false, error: "too_long" });
    expect(parseRmbUppercase("中😀".repeat(10_000))).toMatchObject({ ok: false, error: "too_long" });
    expect(parseRmbUppercase("　人民币貳圓正 ")).toMatchObject({ ok: true, normalizedInput: "人民币贰元正", normalizationApplied: true, normalizedAmount: "2.00" });
  });

  it.each(["", " \t\n", "　"])("treats %j as empty", (input) => { expect(parseRmbUppercase(input)).toMatchObject({ ok: false, error: "empty" }); });

  it("covers all eight actually printed source spellings", () => {
    expect(RMB_UPPERCASE_SOURCE.printedExamples.flatMap(example => example.spellings)).toEqual(OFFICIAL.map(example => example[0]));
  });

  it("semantically round-trips every cent across integer zero/group boundaries", () => {
    for (const yuan of [0n, 1n, 10n, 101n, 1001n, 10_000n, 10_001n, 10_010n, 107_000n, 100_000_001n, 100_010_001n, 999_999_999_999n]) {
      for (let fraction = 0n; fraction < 100n; fraction++) {
        const amount = `${yuan}.${fraction.toString().padStart(2, "0")}`;
        const forward = convertRmbUppercase(amount);
        expect(forward.ok).toBe(true);
        if (!forward.ok) continue;
        expect(parseRmbUppercase(forward.uppercase)).toMatchObject({ ok: true, normalizedAmount: amount, minorUnits: (yuan * 100n + fraction).toString() });
      }
    }
  });

  it("round-trips deterministic amounts across the full supported range without floating arithmetic", () => {
    let seed = 20261121n;
    for (let index = 0; index < 4000; index++) {
      seed = (6364136223846793005n * seed + 1442695040888963407n) % (1n << 64n);
      const minor = seed % 100_000_000_000_000n;
      const amount = `${minor / 100n}.${(minor % 100n).toString().padStart(2, "0")}`;
      const forward = convertRmbUppercase(amount);
      if (!forward.ok) throw new Error("Forward amount outside its stated range");
      expect(parseRmbUppercase(forward.uppercase)).toMatchObject({ ok: true, normalizedAmount: amount, minorUnits: minor.toString() });
    }
  });
});
