import { describe, expect, it } from "vitest";
import { base32Decode, parseOtpauth, totp } from "@/tools/_lib/totp";
import {
  adjacentCodes,
  base32Encode,
  buildOtpauthUri,
  generateTotpSecret,
} from "@/tools/_lib/totp-generate";

/** G17:注册密钥生成 + otpauth 导出 + 相邻窗。闭环锚=RFC 4648 向量 + 既有 parseOtpauth 回读。 */

describe("base32Encode(RFC 4648 向量)", () => {
  it.each([
    [new Uint8Array(0), ""],
    [new Uint8Array([0x66]), "MY======"], // "f"
    [new Uint8Array([0x66, 0x6f]), "MZXQ===="], // "fo"
    [new Uint8Array([0x66, 0x6f, 0x6f]), "MZXW6==="], // "foo"
    [new Uint8Array([0x66, 0x6f, 0x6f, 0x62]), "MZXW6YQ="], // "foob"
    [new Uint8Array([0x66, 0x6f, 0x6f, 0x62, 0x61]), "MZXW6YTB"], // "fooba"
    [new Uint8Array([0x66, 0x6f, 0x6f, 0x62, 0x61, 0x72]), "MZXW6YTBOI======"], // "foobar"
  ])("base32Encode(%j)", (bytes, expected) => {
    expect(base32Encode(bytes, true)).toBe(expected);
    expect(base32Encode(bytes, false)).toBe(expected.replaceAll("=", ""));
  });

  it("与 base32Decode 互逆(随机长度 0..64)", () => {
    for (const len of [0, 1, 5, 10, 16, 20, 21, 32, 64]) {
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = (i * 89 + 3) & 0xff;
      const round = base32Decode(base32Encode(bytes));
      expect([...(round ?? [])]).toEqual([...bytes]);
    }
  });
});

describe("generateTotpSecret(CSPRNG)", () => {
  it("默认 160 位(20 字节),仅 base32 字母表", () => {
    const r = generateTotpSecret();
    if ("error" in r) throw new Error("unexpected error");
    expect(r.byteLength).toBe(20);
    expect(base32Encode(r)).toMatch(/^[A-Z2-7]+$/);
  });

  it.each([16, 32, 64])("%i 字节可生成", (n) => {
    const r = generateTotpSecret(n);
    expect("error" in r).toBe(false);
  });

  it("越界字节数结构化拒绝;连续生成互不相同", () => {
    expect(generateTotpSecret(15)).toEqual({ error: "badLength" });
    expect(generateTotpSecret(65)).toEqual({ error: "badLength" });
    const a = generateTotpSecret();
    const b = generateTotpSecret();
    expect([...(a as Uint8Array)]).not.toEqual([...(b as Uint8Array)]);
  });
});

describe("buildOtpauthUri(Google Authenticator 约定)", () => {
  const base = "JBSWY3DPEHPK3PXP";

  it("典型形态:issuer:account 标签 + issuer 参数 + period=30 省略", () => {
    const r = buildOtpauthUri({
      account: "alice@example.com",
      issuer: "Zoyku",
      secretBase32: base,
      algo: "SHA-1",
      digits: 6,
      period: 30,
    });
    expect(r).toEqual({
      ok: true,
      uri: "otpauth://totp/Zoyku:alice%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=Zoyku",
    });
  });

  it("非默认算法/位数/周期显式输出", () => {
    const r = buildOtpauthUri({
      account: "u",
      secretBase32: base,
      algo: "SHA-256",
      digits: 8,
      period: 60,
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.uri).toContain("algorithm=SHA256");
    expect(r.uri).toContain("digits=8");
    expect(r.uri).toContain("period=60");
  });

  it("特殊字符转义:空格/斜杠/& 在标签与 issuer 中不破坏 URI 结构", () => {
    const r = buildOtpauthUri({
      account: "a b/c&d",
      issuer: "My Corp:Next",
      secretBase32: base,
      algo: "SHA-1",
      digits: 6,
      period: 30,
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    // issuer 内部的 ":" 保留为字面(标签分隔约定),其余转义
    expect(r.uri).toContain("My%20Corp:Next:a%20b%2Fc%26d");
    // 闭环:既有 parseOtpauth 能完整回读
    const parsed = parseOtpauth(r.uri);
    expect(parsed).not.toBeNull();
    expect(parsed!.secret).toBe(base);
    expect(parsed!.digits).toBe(6);
    expect(parsed!.period).toBe(30);
  });

  it("SHA-1 缺省时不输出 algorithm 参数(与主流 App 兼容)", () => {
    const r = buildOtpauthUri({ account: "u", secretBase32: base, algo: "SHA-1", digits: 6, period: 30 });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.uri).not.toContain("algorithm");
  });

  it("非法输入结构化拒绝:空 account/非法 secret/越界 digits/非法 period", () => {
    expect(buildOtpauthUri({ account: "  ", secretBase32: base, algo: "SHA-1", digits: 6, period: 30 })).toEqual({ ok: false, code: "emptyAccount" });
    expect(buildOtpauthUri({ account: "u", secretBase32: "ABC1", algo: "SHA-1", digits: 6, period: 30 })).toEqual({ ok: false, code: "badSecret" }); // 1 不在 base32
    expect(buildOtpauthUri({ account: "u", secretBase32: base, algo: "SHA-1", digits: 5, period: 30 })).toEqual({ ok: false, code: "badDigits" });
    expect(buildOtpauthUri({ account: "u", secretBase32: base, algo: "SHA-1", digits: 6, period: 45 })).toEqual({ ok: false, code: "badPeriod" });
  });
});

describe("adjacentCodes(相邻时间窗)", () => {
  const key = base32Decode("JBSWY3DPEHPK3PXP")!;

  it("previous/current/next 与独立调用 totp(±period) 完全一致", async () => {
    const nowMs = 1_800_000_000_000;
    const adj = await adjacentCodes(key, nowMs, "SHA-1", 6, 30, totp);
    const nowSec = 1_800_000_000;
    const [p, c, n] = await Promise.all([
      totp(key, nowSec - 30, "SHA-1", 6, 30),
      totp(key, nowSec, "SHA-1", 6, 30),
      totp(key, nowSec + 30, "SHA-1", 6, 30),
    ]);
    expect(adj).toEqual({ previous: p, current: c, next: n });
    expect(adj.previous).not.toBe(adj.current);
    expect(adj.current).toMatch(/^\d{6}$/);
  });

  it("SHA-512/8 位/60 秒同样成立", async () => {
    const adj = await adjacentCodes(key, 1_800_000_000_000, "SHA-512", 8, 60, totp);
    expect(adj.current).toMatch(/^\d{8}$/);
  });
});
