import { describe, expect, it } from "vitest";
import {
  convertRmbUppercase, RMB_UPPERCASE_LIMITS, RMB_UPPERCASE_SOURCE,
} from "@/tools/_lib/rmb-uppercase";

/**
 * Source evidence read on 2026-11-21: PBOC Clearing Center, 《支付结算办法》
 * 附一《正确填写票据和结算凭证的基本规定》, I–IV.
 * https://www.cncc.cn/zcfg/200903/t20090323_286.html
 * The official page prints both alternatives for 1680.32 and 107000.53.
 * Rule II allows 整 after 角; this tool consistently includes it when 分=0.
 * This fixture is a record of the read source, not a current-law/acceptance claim.
 */
const OFFICIAL_EXAMPLES = [
  ["1409.50", "人民币壹仟肆佰零玖元伍角整"],
  ["6007.14", "人民币陆仟零柒元壹角肆分"],
  ["1680.32", "人民币壹仟陆佰捌拾元零叁角贰分"],
  ["107000.53", "人民币壹拾万柒仟元零伍角叁分"],
  ["16409.02", "人民币壹万陆仟肆佰零玖元零贰分"],
  ["325.04", "人民币叁佰贰拾伍元零肆分"],
] as const;

const DIGITS: Record<string, bigint> = { 零: 0n, 壹: 1n, 贰: 2n, 叁: 3n, 肆: 4n, 伍: 5n, 陆: 6n, 柒: 7n, 捌: 8n, 玖: 9n };
const SMALL_UNITS: Record<string, bigint> = { 拾: 10n, 佰: 100n, 仟: 1000n };

// Independent test-only reverse check: additive magnitudes, not the encoder's
// zero-emission/group traversal. This is deliberately not a product feature.
function decodeFinancialSection(section: string): bigint {
  let sum = 0n;
  let pending = 0n;
  for (const char of section) {
    if (Object.hasOwn(DIGITS, char)) pending = DIGITS[char];
    else {
      expect(Object.hasOwn(SMALL_UNITS, char), `Unexpected character ${char}`).toBe(true);
      sum += pending * SMALL_UNITS[char];
      pending = 0n;
    }
  }
  return sum + pending;
}

function decodeFinancialAmount(uppercase: string): bigint {
  const amount = uppercase.replace(/^人民币/, "").replace(/整$/, "");
  const [integer, fraction = ""] = amount.split("元");
  let rest = integer;
  let yuan = 0n;
  for (const [unit, magnitude] of [["亿", 100_000_000n], ["万", 10_000n]] as const) {
    if (!rest.includes(unit)) continue;
    const [section, next] = rest.split(unit);
    yuan += decodeFinancialSection(section) * magnitude;
    rest = next;
  }
  yuan += decodeFinancialSection(rest);
  const jiao = /([壹贰叁肆伍陆柒捌玖])角/.exec(fraction)?.[1];
  const fen = /([壹贰叁肆伍陆柒捌玖])分/.exec(fraction)?.[1];
  return yuan * 100n + (jiao ? DIGITS[jiao] * 10n : 0n) + (fen ? DIGITS[fen] : 0n);
}

describe("RMB uppercase source and conservative contract", () => {
  it("retains the actually read official source and rule sections", () => {
    expect(RMB_UPPERCASE_SOURCE.url).toBe("https://www.cncc.cn/zcfg/200903/t20090323_286.html");
    expect(RMB_UPPERCASE_SOURCE.publisher).toBe("中国人民银行清算总中心");
    expect(RMB_UPPERCASE_SOURCE.section).toContain("附一");
    expect(RMB_UPPERCASE_SOURCE.accessedOn).toBe("2026-11-21");
    expect(RMB_UPPERCASE_SOURCE.printedExamples).toHaveLength(6);
  });

  it("exports explicit input and amount limits", () => {
    expect(RMB_UPPERCASE_LIMITS).toEqual({ inputCharacters: 128, integerDigits: 12, fractionDigits: 2, maximumAmount: "999999999999.99" });
    expect(Object.isFrozen(RMB_UPPERCASE_LIMITS)).toBe(true);
  });

  it.each(OFFICIAL_EXAMPLES)("matches the official rule example %s", (input, uppercase) => {
    const result = convertRmbUppercase(input);
    expect(result).toMatchObject({ ok: true, normalizedAmount: input, uppercase });
    if (result.ok) expect(decodeFinancialAmount(result.uppercase).toString()).toBe(result.minorUnits);
  });
});

describe("RMB uppercase integer and fraction boundaries", () => {
  it.each([
    ["0", "0.00", "人民币零元整"],
    ["000.00", "0.00", "人民币零元整"],
    ["0.1", "0.10", "人民币零元壹角整"],
    ["0.01", "0.01", "人民币零元零壹分"],
    ["1", "1.00", "人民币壹元整"],
    ["10", "10.00", "人民币壹拾元整"],
    ["10.10", "10.10", "人民币壹拾元零壹角整"],
    ["11.01", "11.01", "人民币壹拾壹元零壹分"],
    ["101", "101.00", "人民币壹佰零壹元整"],
    ["1001", "1001.00", "人民币壹仟零壹元整"],
    ["10000", "10000.00", "人民币壹万元整"],
    ["10001", "10001.00", "人民币壹万零壹元整"],
    ["10010", "10010.00", "人民币壹万零壹拾元整"],
    ["100000", "100000.00", "人民币壹拾万元整"],
    ["100001", "100001.00", "人民币壹拾万零壹元整"],
    ["1000001", "1000001.00", "人民币壹佰万零壹元整"],
    ["100000000", "100000000.00", "人民币壹亿元整"],
    ["100000001", "100000001.00", "人民币壹亿零壹元整"],
    ["100001000", "100001000.00", "人民币壹亿零壹仟元整"],
    ["100010001", "100010001.00", "人民币壹亿零壹万零壹元整"],
    ["100100000", "100100000.00", "人民币壹亿零壹拾万元整"],
    ["100000000000", "100000000000.00", "人民币壹仟亿元整"],
    ["999999999999.99", "999999999999.99", "人民币玖仟玖佰玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖元玖角玖分"],
  ])("converts %s without changing its value", (input, normalizedAmount, uppercase) => {
    const result = convertRmbUppercase(input);
    expect(result).toMatchObject({ ok: true, normalizedAmount, uppercase });
    if (result.ok) {
      expect(decodeFinancialAmount(result.uppercase).toString()).toBe(result.minorUnits);
      expect(result.uppercase).not.toMatch(/零零|零[万亿整]|分整$/);
    }
  });

  it("normalizes ordinary full-width digits and decimal point, outer whitespace and leading zeros", () => {
    expect(convertRmbUppercase(" \t０００１２３．４５　")).toMatchObject({ ok: true, normalizedAmount: "123.45", minorUnits: "12345", uppercase: "人民币壹佰贰拾叁元肆角伍分" });
  });

  it("handles every cents combination without appending 整 after 分", () => {
    for (let cents = 0n; cents < 100n; cents++) {
      for (const yuan of [0n, 1n, 10n, 1010n, 100_000_001n]) {
        const input = `${yuan}.${cents.toString().padStart(2, "0")}`;
        const result = convertRmbUppercase(input);
        expect(result.ok, input).toBe(true);
        if (!result.ok) continue;
        expect(decodeFinancialAmount(result.uppercase)).toBe(yuan * 100n + cents);
        expect(result.uppercase.endsWith("整")).toBe(cents % 10n === 0n);
        if (cents > 0n && cents < 10n) expect(result.uppercase).toContain("元零");
      }
    }
  });

  it("independently round-trips deterministic random values across the full supported range", () => {
    let seed = 20_261_121n;
    for (let n = 0; n < 1500; n++) {
      seed = (6364136223846793005n * seed + 1442695040888963407n) % (1n << 64n);
      const cents = seed % 100_000_000_000_000n;
      const input = `${cents / 100n}.${(cents % 100n).toString().padStart(2, "0")}`;
      const result = convertRmbUppercase(input);
      expect(result.ok, input).toBe(true);
      if (!result.ok) continue;
      expect(result.minorUnits).toBe(cents.toString());
      expect(result.normalizedAmount).toBe(input);
      expect(decodeFinancialAmount(result.uppercase)).toBe(cents);
      expect(convertRmbUppercase(result.normalizedAmount)).toEqual(result);
    }
  });
});

describe("RMB uppercase explicit rejection without rounding or guessing", () => {
  it.each(["", " \n\t", "　"])("rejects empty input %j", (input) => {
    expect(convertRmbUppercase(input)).toEqual({ ok: false, error: "empty" });
  });
  it.each([null, undefined, 12.34, NaN, Infinity, {}, [], ["1.00"], true])("rejects non-text input %j without throwing", (input) => {
    expect(convertRmbUppercase(input)).toEqual({ ok: false, error: "format" });
  });
  it.each(["-0", "-1", "+1", "−1", "－１", "＋１", "1e3", "1E+2", "￥1", "¥1", "RMB1", "CNY 1", "人民币1", "1元", "壹元", ".5", "1.", "1,234.56", "12,34.56", "１，２３４．５６", "1 234", "1\n.20", "1\u200b.20", "1。20", "١٢.٣٤", "12😀", "NaN", "Infinity"])("rejects unsupported syntax %j", (input) => {
    expect(convertRmbUppercase(input)).toEqual({ ok: false, error: "format" });
  });
  it.each(["1.000", "1.234", "0.005", "999999999999.999"])("does not round excess decimal places in %s", (input) => {
    expect(convertRmbUppercase(input)).toEqual({ ok: false, error: "precision" });
  });
  it.each(["1000000000000", "1000000000000.00", "9999999999999.99"])("rejects out-of-range %s", (input) => {
    expect(convertRmbUppercase(input)).toEqual({ ok: false, error: "range" });
  });
  it("bounds input before normalization and never silently truncates", () => {
    expect(convertRmbUppercase("0".repeat(128))).toMatchObject({ ok: true, normalizedAmount: "0.00" });
    expect(convertRmbUppercase("0".repeat(129))).toEqual({ ok: false, error: "too_long" });
    expect(convertRmbUppercase("中😀".repeat(10_000))).toEqual({ ok: false, error: "too_long" });
  });
});
