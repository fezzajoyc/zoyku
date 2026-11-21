import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { encodeDigest, ripemd160Bytes, sha224Bytes, sha256Bytes } from "@/tools/_lib/hash-digests";

/** G02:SHA-224/RIPEMD-160 纯实现 + 摘要输出编码。锚 = node:crypto 独立交叉核对。 */

const hex = (bytes: Uint8Array) => [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");

describe("SHA-224(RFC 3874 向量 + node 交叉)", () => {
  it.each([
    ["", "d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f"],
    ["abc", "23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7"],
    ["abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq", "75388b16512776cc5dba5da1fd890150b0c6455cb4f58b1952522525"],
  ])("SHA-224(%j) 匹配官方向量", (input, expected) => {
    expect(hex(sha224Bytes(new TextEncoder().encode(input)))).toBe(expected);
  });

  it("多长度随机数据与 node:crypto sha224 全量一致(含块边界)", () => {
    for (const len of [0, 1, 55, 56, 57, 63, 64, 65, 119, 120, 127, 128, 1000, 65536]) {
      const input = new Uint8Array(len);
      for (let i = 0; i < len; i++) input[i] = (i * 197 + 13) & 0xff;
      const mine = hex(sha224Bytes(input));
      const node = createHash("sha224").update(input).digest("hex");
      expect(mine, `len=${len}`).toBe(node);
    }
  });
});

describe("RIPEMD-160(ISO/IEC 10118-3 向量 + node 交叉)", () => {
  it.each([
    ["", "9c1185a5c5e9fc54612808977ee8f548b2258d31"],
    ["a", "0bdc9d2d256b3ee9daae347be6f4dc835a467ffe"],
    ["abc", "8eb208f7e05d987a9b044a8e98c6b087f15a0bfc"],
    ["message digest", "5d0689ef49d2fae572b881b123a85ffa21595f36"],
    ["abcdefghijklmnopqrstuvwxyz", "f71c27109c692c1b56bbdceb5b9d2865b3708dbc"],
  ])("RIPEMD-160(%j) 匹配官方向量", (input, expected) => {
    expect(hex(ripemd160Bytes(new TextEncoder().encode(input)))).toBe(expected);
  });

  it("多长度随机数据与 node:crypto ripemd160 全量一致(含块边界)", () => {
    for (const len of [0, 1, 55, 56, 57, 63, 64, 65, 119, 120, 127, 128, 1000, 65536]) {
      const input = new Uint8Array(len);
      for (let i = 0; i < len; i++) input[i] = (i * 173 + 29) & 0xff;
      const mine = hex(ripemd160Bytes(input));
      const node = createHash("ripemd160").update(input).digest("hex");
      expect(mine, `len=${len}`).toBe(node);
    }
  });
});

describe("SHA-256 纯实现与 WebCrypto 等价性(node 交叉)", () => {
  it("sha256Bytes 与 node sha256 一致(抽样长度)", () => {
    for (const len of [0, 55, 64, 1000]) {
      const input = new Uint8Array(len).fill(0x3c);
      expect(hex(sha256Bytes(input))).toBe(createHash("sha256").update(input).digest("hex"));
    }
  });
});

describe("encodeDigest(四种输出编码)", () => {
  const bytes = new Uint8Array([0xde, 0xad, 0xbe, 0xef, 0x00, 0xff]);
  it("hex", () => {
    expect(encodeDigest(bytes, "hex")).toBe("deadbeef00ff");
  });
  it("base64 与 node 一致", () => {
    expect(encodeDigest(bytes, "base64")).toBe(Buffer.from(bytes).toString("base64"));
  });
  it("base64url 无填充且 URL 安全", () => {
    const r = encodeDigest(bytes, "base64url");
    expect(r).not.toMatch(/[+/=]/);
    expect(r).toBe(Buffer.from(bytes).toString("base64url"));
  });
  it("binary 是逐字节 8 位拼接", () => {
    expect(encodeDigest(bytes, "binary")).toBe("110111101010110110111110111011110000000011111111");
  });
});
