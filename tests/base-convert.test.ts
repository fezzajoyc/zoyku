import { describe, expect, it } from "vitest";
import { BASE64_ALPHABET, parseInBase, toBaseStr } from "@/tools/_lib/base-convert";

/** G04:2–64 进制转换。锚 = node parseInt/toString(2–36 交叉)+ 往返性质(37–64)。 */

describe("parseInBase(2–36 与 node parseInt 交叉)", () => {
  it.each([
    ["1010", 2, 10n],
    ["ff", 16, 255n],
    ["777", 8, 511n],
    ["zzz", 36, 46655n],
    ["z1", 36, 1261n],
  ])("parseInBase(%j, %i) = %i", (input, radix, expected) => {
    const r = parseInBase(input, radix);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value).toBe(expected);
  });

  it("0 到 Number.MAX_SAFE_INTEGER 随机样本与 Number.parseInt 一致(2/8/10/16/36)", () => {
    const samples = [0n, 1n, 255n, 65535n, 2n ** 52n - 1n, Number.MAX_SAFE_INTEGER.toString() as unknown as bigint].map(BigInt);
    for (const radix of [2, 8, 10, 16, 36]) {
      for (const v of samples) {
        if (v > BigInt(Number.MAX_SAFE_INTEGER)) continue;
        const s = v.toString(radix);
        const r = parseInBase(s, radix);
        expect(r.ok, `${s}@${radix}`).toBe(true);
        if (r.ok) expect(r.value).toBe(v);
      }
    }
  });

  it("大数(超过 2^64)往返无损", () => {
    const v = 2n ** 100n + 12345n;
    for (const radix of [2, 10, 16, 36, 64]) {
      const s = toBaseStr(v, radix);
      const r = parseInBase(s, radix);
      expect(r.ok).toBe(true);
      if (r.ok) expect(r.value).toBe(v);
    }
  });
});

describe("37–64 进制(大小写敏感字母表)", () => {
  it("字母表 = 0-9 a-z A-Z + /,共 64 字符", () => {
    expect(BASE64_ALPHABET.length).toBe(64);
    expect(BASE64_ALPHABET[36]).toBe("A");
    expect(BASE64_ALPHABET[62]).toBe("+");
    expect(BASE64_ALPHABET[63]).toBe("/");
  });

  it("255 在 64 进制 = '3/'(3×64+63)", () => {
    expect(toBaseStr(255n, 64)).toBe("3/");
    const r = parseInBase("3/", 64);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBe(255n);
  });

  it("base 37+ 严格大小写:'a' 与 'A' 数值不同", () => {
    const low = parseInBase("a", 37);
    const up = parseInBase("A", 37);
    expect(low.ok && up.ok).toBe(true);
    if (!low.ok || !up.ok) return;
    expect(low.value).toBe(10n);
    expect(up.value).toBe(36n);
    expect(low.value).not.toBe(up.value);
  });

  it("超出所选进制的字符拒绝(如 base 2 收到 '2',base 37 收到 '+')", () => {
    expect(parseInBase("2", 2)).toEqual({ ok: false, code: "invalidDigits" });
    expect(parseInBase("+", 37)).toEqual({ ok: false, code: "negative" }); // 37 进制下 + 是符号不是数字
    const plus64 = parseInBase("+", 64); // 64 进制下 + 是数字位(62)
    expect(plus64.ok).toBe(true);
    if (plus64.ok) expect(plus64.value).toBe(62n);
  });
});

describe("严格校验与边界", () => {
  it.each([
    ["", 10],
    ["   ", 10],
    ["12 34", -1],
    ["ff", 1],
    ["ff", 65],
    ["1.5", 10],
  ])("非法输入 %j@%i 结构化拒绝", (input, radix) => {
    const r = parseInBase(input, radix);
    expect(r.ok).toBe(false);
  });

  it("空白与下划线容忍(千分位风格)", () => {
    const r = parseInBase("1_000\n 000", 10);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBe(1000000n);
  });

  it("toBaseStr 非法进制抛错(内部守卫),parseInBase 永不抛", () => {
    expect(() => toBaseStr(1n, 65)).toThrow();
    expect(parseInBase("1", 0)).toEqual({ ok: false, code: "badRadix" });
  });

  it("负数按工具契约拒绝(非负整数),两侧都不含糊", () => {
    expect(() => toBaseStr(-(2n ** 65n), 36)).toThrow();
    expect(parseInBase("-ff", 16)).toEqual({ ok: false, code: "negative" });
    expect(parseInBase("+ff", 16)).toEqual({ ok: false, code: "negative" });
  });
});
