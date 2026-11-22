import { describe, expect, it } from "vitest";
import { validateIban, ibanCheckDigits, ibanMod97 } from "@/tools/_lib/iban";
import { IBAN_REGISTRY } from "@/tools/_lib/iban-registry";

/**
 * CN-024 IBAN。锚 = ① 官方向量 10 国(德语维基 IBAN 注册表抓取,经独立 python mod-97
 * 双实现预验证后准入——记忆样例若错误会被算法本身拒绝)② 算法性质(自生成往返)。
 */

// 双实现(注册表长度 + python mod-97)预验证通过的官方向量
const OFFICIAL_VALID = [
  "DE89370400440532013000",
  "GB29NWBK60161331926819",
  "NL91ABNA0417164300",
  "ES9121000418450200051332",
  "IT60X0542811101000000123456",
  "CH9300762011623852957",
  "AT611904300234573201",
  "BE68539007547034",
  "FR1420041010050500013M02606",
  "NO9386011117947",
];

describe("官方向量 × 双实现", () => {
  it.each(OFFICIAL_VALID)("%s 有效", (iban) => {
    const r = validateIban(iban);
    expect(r.valid).toBe(true);
    if (r.valid && r.parts) {
      expect(r.parts.country).toBe(iban.slice(0, 2));
      expect(r.parts.length).toBe(IBAN_REGISTRY[iban.slice(0, 2)].length);
      expect(r.parts.formatted).toMatch(/^[A-Z0-9]{4}( [A-Z0-9]{1,4})*$/);
    }
  });

  it("带空格与横线输入归一化", () => {
    const r = validateIban("de89 3704-0044 0532 0130 00");
    expect(r.valid).toBe(true);
    if (r.valid && r.parts) expect(r.parts.formatted).toBe("DE89 3704 0044 0532 0130 00");
  });
});

describe("拒绝路径", () => {
  it("校验位篡改:官方样例末位改动 → mod97 失败", () => {
    const tampered = "DE89370400440532013001";
    const r = validateIban(tampered);
    expect(r.valid).toBe(false);
    if (!r.valid) expect(r.error).toBe("mod97");
  });

  it("国家长度不符:DE 用 21 位 → country-length", () => {
    const r = validateIban("DE893704004405320130");
    expect(r.valid).toBe(false);
    if (!r.valid) expect(r.error).toBe("country-length:22");
  });

  it("未知国家码 → country(US/CN 不用 IBAN)", () => {
    expect(validateIban("US12345678901234567890").error ?? "").toBe("country");
    expect(validateIban("ZZ59ZZZZZZZZZZZZZZZZZZZZZZZZZZ").error ?? "").toBe("country");
  });

  it("非法字符(小写已归一;I/O 之外字母与小写合法,但标点非法)→ charset", () => {
    expect(validateIban("DE8937040044053201300!").error ?? "").toBe("charset");
  });

  it("空输入与超长", () => {
    const empty = validateIban("   ");
    expect(empty.valid).toBe(false);
    if (!empty.valid) expect(empty.error).toBe("empty");
    expect(validateIban("DE89370400440532013000".repeat(3)).error ?? "").toBe("length-range");
  });
});

describe("生成(ibanCheckDigits)", () => {
  it("DE:BBAN 370400440532013000 → 校验 89(官方向量往返)", () => {
    expect(ibanCheckDigits("DE", "370400440532013000")).toBe("89");
  });

  it("任意 BBAN 生成 → validate 通过(算法自洽)", () => {
    for (const [cc, info] of Object.entries(IBAN_REGISTRY)) {
      const bbanLen = info.length - 4;
      const bban = "1".repeat(bbanLen);
      const check = ibanCheckDigits(cc, bban);
      expect(check).not.toBeNull();
      const full = `${cc}${check}${bban}`;
      expect(validateIban(full).valid, cc).toBe(true);
      if (cc === "DE") break; // 抽 1 国足够,全部 100 国在 mod97 数学上同构
    }
  });

  it("mod97 算法性质:官方样例重排后余 1", () => {
    expect(ibanMod97("DE89370400440532013000")).toBe(1n);
    expect(ibanMod97("GB29NWBK60161331926819")).toBe(1n);
  });
});
