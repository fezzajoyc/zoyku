import { describe, it, expect } from "vitest";
import {
  AMBIGUOUS, buildPool, bucketOf, generatePassphrase, generatePassword,
  passphraseEntropy, passwordEntropy, randInt, SETS,
} from "../tools/_lib/password";

/** 确定性伪随机源:固定序列,用于让生成结果可断言 */
function seqRandom(values: number[]) {
  let i = 0;
  return (buf: Uint32Array) => {
    buf[0] = values[i++ % values.length]!;
  };
}

describe("randInt", () => {
  it("范围 [0, n) 且确定性", () => {
    const r = seqRandom([5, 100, 0, 0xFFFFFFFF]);
    expect(randInt(10, r)).toBe(5);
    expect(randInt(128, r)).toBe(100);
    expect(randInt(7, r)).toBe(0);
  });

  it("无模偏差:拒绝采样不产生越界值", () => {
    // 全部喂 0xFFFFFFFF(≥ limit 时应重抽)——用混合序列,断言输出仍落在范围内
    const r = seqRandom([0xFFFFFFFF, 3, 0xFFFFFFFF, 1]);
    expect(randInt(10, r)).toBe(3);
    expect(randInt(10, r)).toBe(1);
  });

  it("真实 crypto 源:大样本分布落在界内", () => {
    for (let i = 0; i < 1000; i++) {
      const v = randInt(62);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(62);
    }
  });
});

describe("buildPool", () => {
  it("四集合全开 = 86 字符(26+26+10+24,与文案口径一致)", () => {
    expect(buildPool({ upper: true, lower: true, digits: true, symbols: true }).length).toBe(86);
  });
  it("排除易混淆字符后减 6", () => {
    const withAmb = buildPool({ upper: true, lower: true, digits: true, symbols: false, noAmbiguous: false });
    const noAmb = buildPool({ upper: true, lower: true, digits: true, symbols: false, noAmbiguous: true });
    expect(noAmb.length).toBe(withAmb.length - AMBIGUOUS.size);
    for (const c of AMBIGUOUS) expect(noAmb).not.toContain(c);
  });
  it("全关时池为空", () => {
    expect(buildPool({ upper: false, lower: false, digits: false, symbols: false })).toBe("");
  });
});

describe("passwordEntropy / passphraseEntropy", () => {
  it("log2(pool^length):86 字符 12 位 ≈ 77.1", () => {
    const bits = passwordEntropy(buildPool({ upper: true, lower: true, digits: true, symbols: true }), 12);
    expect(bits).toBeCloseTo(77.12, 1);
  });
  it("capitalize 不计熵(诚实口径,修前虚报 +wordCount)", () => {
    const b = passphraseEntropy(5, 273, false);
    expect(b).toBeCloseTo(5 * Math.log2(273), 6);
    // 没有别的参数会引入 capitalize——公式里根本没有它
    expect(passphraseEntropy(5, 273, false)).toBe(b);
  });
  it("addNumber 贡献 log2(90)", () => {
    expect(passphraseEntropy(5, 273, true)).toBeCloseTo(5 * Math.log2(273) + Math.log2(90), 6);
  });
});

describe("bucketOf", () => {
  it("分级边界:45/70/100", () => {
    expect(bucketOf(44.9)).toBe("weak");
    expect(bucketOf(45)).toBe("fair");
    expect(bucketOf(69.9)).toBe("fair");
    expect(bucketOf(70)).toBe("strong");
    expect(bucketOf(99.9)).toBe("strong");
    expect(bucketOf(100)).toBe("excellent");
  });
});

describe("generatePassword", () => {
  it("确定性随机源:逐字符按序列取", () => {
    const pool = buildPool({ upper: true, lower: true, digits: true, symbols: true });
    const r = seqRandom([0, 1, 2]);
    expect(generatePassword(pool, 3, r)).toBe(pool[0] + pool[1] + pool[2]);
  });
  it("池太小返回空(防止 1 字符'密码')", () => {
    expect(generatePassword("", 8)).toBe("");
    expect(generatePassword("a", 8)).toBe("");
  });
  it("真实源 1000 次:长度正确且字符全在池内", () => {
    const pool = buildPool({ upper: true, lower: true, digits: true, symbols: true, noAmbiguous: true });
    for (let i = 0; i < 1000; i++) {
      const pw = generatePassword(pool, 16);
      expect(pw.length).toBe(16);
      for (const ch of pw) expect(pool).toContain(ch);
    }
  });
});

describe("generatePassphrase", () => {
  const WORDS = ["apple", "beach", "cloud", "dawn", "ember", "falcon"];
  it("词数/分隔符/大写结构正确", () => {
    const p = generatePassphrase(WORDS, 4, "-", true, false, seqRandom([0, 1, 2, 3]));
    const parts = p.split("-");
    expect(parts).toEqual(["Apple", "Beach", "Cloud", "Dawn"]);
  });
  it("addNumber 尾巴在 10–99", () => {
    const p = generatePassphrase(WORDS, 2, ".", true, true, seqRandom([0, 1, 45]));
    expect(p).toMatch(/^\w+\.\w+\.\d{2}$/);
    const n = Number(p.split(".").pop()!);
    expect(n).toBeGreaterThanOrEqual(10);
    expect(n).toBeLessThanOrEqual(99);
  });
  it("空分隔符时数字用 - 兜底连接", () => {
    const p = generatePassphrase(WORDS, 2, "", true, true, seqRandom([0, 1, 0]));
    expect(p).toMatch(/^[A-Z][a-z]+[A-Z][a-z]+-\d{2}$/);
  });
});
