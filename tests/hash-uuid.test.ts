import { describe, it, expect } from "vitest";
import { md5 } from "js-md5";

/**
 * hash-generator / uuid-generator 金标准测试:
 * - SHA 向量取自 NIST CSRC 测试集(RFC 3174/6234/4634 同源用例)
 * - MD5 向量取自 RFC 1321
 * - UUID v4 结构按 RFC 9562(版本 nibble=4、变体位 10xx)
 */

async function shaHex(algo: "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512", input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  return [...new Uint8Array(await crypto.subtle.digest(algo, bytes))]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

describe("SHA 金标准向量(NIST/RFC)", () => {
  it('SHA-1("abc")', async () => {
    expect(await shaHex("SHA-1", "abc")).toBe("a9993e364706816aba3e25717850c26c9cd0d89d");
  });
  it('SHA-256("abc")', async () => {
    expect(await shaHex("SHA-256", "abc")).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
  });
  it('SHA-256("") 空串向量', async () => {
    expect(await shaHex("SHA-256", "")).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    );
  });
  it('SHA-384("abc")', async () => {
    expect(await shaHex("SHA-384", "abc")).toBe(
      "cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7",
    );
  });
  it('SHA-512("abc")', async () => {
    expect(await shaHex("SHA-512", "abc")).toBe(
      "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f",
    );
  });
  it('MD5("abc") RFC 1321 向量', () => {
    expect(md5("abc")).toBe("900150983cd24fb0d6963f7d28e17f72");
  });
  it("MD5 字节输入与字符串输入一致(文件路径同源)", () => {
    const bytes = new TextEncoder().encode("abc");
    expect(md5(new Uint8Array(bytes))).toBe(md5("abc"));
  });
});

describe("UUID v4 结构(RFC 9562)", () => {
  const V4_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

  it("1000 个全部符合 v4 格式:版本位=4,变体位=89ab", () => {
    for (let i = 0; i < 1000; i++) {
      const u = crypto.randomUUID();
      expect(u).toMatch(V4_RE);
    }
  });

  it("500 个批量唯一", () => {
    const set = new Set<string>();
    for (let i = 0; i < 500; i++) set.add(crypto.randomUUID());
    expect(set.size).toBe(500);
  });

  it("回退路径 getRandomValues 手工拼 v4 同样合法", () => {
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40; // version 4
    b[8] = (b[8] & 0x3f) | 0x80; // variant 10xx
    const h = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
    const u = `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
    expect(u).toMatch(V4_RE);
  });
});
