import { describe, it, expect } from "vitest";
import { base32Decode, hotp, parseOtpauth, totp } from "../tools/_lib/totp";

// RFC 6238 Appendix B 官方测试向量(金标准)
// SHA-1 secret = ASCII "12345678901234567890"(20 字节)
// SHA-256 secret = ASCII "12345678901234567890123456789012"(32 字节)
// SHA-512 secret = 同上 64 字节版本
const B32_SHA1 = "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ"; // "12345678901234567890"
const SHA256_SECRET = new TextEncoder().encode("12345678901234567890123456789012");
const SHA512_SECRET = new TextEncoder().encode(
  "1234567890123456789012345678901234567890123456789012345678901234",
);

// T(秒) → 8 位 TOTP(逐行取自 RFC 6238 Appendix B)
const RFC_SHA1: Array<[number, string]> = [
  [59, "94287082"],
  [1111111109, "07081804"],
  [1111111111, "14050471"],
  [1234567890, "89005924"],
  [2000000000, "69279037"],
  [20000000000, "65353130"],
];
const RFC_SHA256: Array<[number, string]> = [
  [59, "46119246"],
  [1111111109, "68084774"],
  [1111111111, "67062674"],
  [1234567890, "91819424"],
  [2000000000, "90698825"],
  [20000000000, "77737706"],
];
const RFC_SHA512: Array<[number, string]> = [
  [59, "90693936"],
  [1111111109, "25091201"],
  [1111111111, "99943326"],
  [1234567890, "93441116"],
  [2000000000, "38618901"],
  [20000000000, "47863826"],
];

describe("RFC 6238 官方向量(金标准)", () => {
  const sha1Key = base32Decode(B32_SHA1)!;

  it.each(RFC_SHA1)("SHA-1 T=%i → %s", async (time, expected) => {
    expect(await totp(sha1Key, time, "SHA-1", 8)).toBe(expected);
  });

  it.each(RFC_SHA256)("SHA-256 T=%i → %s", async (time, expected) => {
    expect(await totp(SHA256_SECRET, time, "SHA-256", 8)).toBe(expected);
  });

  it.each(RFC_SHA512)("SHA-512 T=%i → %s", async (time, expected) => {
    expect(await totp(SHA512_SECRET, time, "SHA-512", 8)).toBe(expected);
  });

  it("6 位 = 8 位向量的后 6 位(SHA-1 T=59 → 287082)", async () => {
    expect(await totp(sha1Key, 59, "SHA-1", 6)).toBe("287082");
  });

  it("计数器拆分:RFC 最大向量 T=20000000000 → counter=666666666(低 32 位内,向量已验证编码路径)", () => {
    expect(Math.floor(20000000000 / 30)).toBe(666666666);
  });
});

describe("base32Decode", () => {
  it("RFC 4648 标准用例", () => {
    const dec = (s: string) => new TextDecoder().decode(base32Decode(s)!);
    expect(dec("MY======")).toBe("f");
    expect(dec("MZXQ====")).toBe("fo");
    expect(dec("MZXW6===")).toBe("foo");
    expect(dec("MZXW6YQ=")).toBe("foob");
    expect(dec("MZXW6YTB")).toBe("fooba");
    expect(dec("MZXW6YTBOI======")).toBe("foobar");
  });
  it("空白/小写/填充混合容忍", () => {
    const dec = (s: string) => new TextDecoder().decode(base32Decode(s)!);
    expect(dec("MZ XW-6Y TB OI ======")).toBe("foobar");
    expect(dec("mzxw6ytboi")).toBe("foobar");
  });
  it("非法字符返回 null;空串返回 null", () => {
    expect(base32Decode("ABC1")).toBeNull(); // 1 不在字母表
    expect(base32Decode("")).toBeNull();
  });
});

describe("parseOtpauth", () => {
  it("标准 Google Authenticator 链接", () => {
    const r = parseOtpauth("otpauth://totp/Alice?secret=JBSWY3DPEHPK3PXP&issuer=Example");
    expect(r).toMatchObject({ secret: "JBSWY3DPEHPK3PXP", account: "Alice" });
    expect(r!.digits).toBeUndefined();
    expect(r!.algo).toBeUndefined();
  });
  it("带 issuer 前缀的 label 取账户段", () => {
    const r = parseOtpauth("otpauth://totp/Example:alice@example.com?secret=JBSWY3DPEHPK3PXP");
    expect(r!.account).toBe("alice@example.com");
  });
  it("digits/period/algorithm 合法值解析,非法值回退 undefined", () => {
    const good = parseOtpauth("otpauth://totp/x?secret=JBSW&digits=8&period=60&algorithm=SHA256");
    expect(good).toMatchObject({ digits: 8, period: 60, algo: "SHA-256" });
    const bad = parseOtpauth("otpauth://totp/x?secret=JBSW&digits=7&period=45&algorithm=MD5");
    expect(bad!.digits).toBeUndefined();
    expect(bad!.period).toBeUndefined();
    expect(bad!.algo).toBeUndefined();
  });
  it("非 totp / 无 secret 返回 null", () => {
    expect(parseOtpauth("otpauth://hotp/x?secret=JBSW")).toBeNull();
    expect(parseOtpauth("otpauth://totp/x?issuer=Example")).toBeNull();
    expect(parseOtpauth("https://example.com")).toBeNull();
  });
});
