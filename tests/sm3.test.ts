import { describe, expect, it } from "vitest";
import { computeSm3, hexToBase64 } from "@/tools/_lib/sm3-hash";

/**
 * CN-017 SM3。锚 = python3 hashlib.new('sm3')(OpenSSL C 实现,GB/T 32905-2016)。
 * 绝不手写密码学;sm-crypto 仅作运行时实现,正确性由本文件锚定。
 */

// python3 生成:hashlib.new('sm3') — 官方示例 "abc" + 块边界(64/65)+ 200B + 中文
// 注:空串向量(1ab21d83…)无法经工具 UI 触达——空输入按契约拒绝,故不列。
const VECTORS: Array<{ label: string; bytes: number[]; hex: string }> = [
  { label: "abc(官方示例)", bytes: [0x61, 0x62, 0x63], hex: "66c7f0f462eeedd9d1f2d46bdc10e4e24167c4875cf2f7a2297da02b8f4ba8e0" },
  { label: "整块 64B", bytes: Array(64).fill(0x61), hex: "616ec433c359e7c2b19f360e2b8f2a1b6e9ed76b8dc1a7d207b31a5341c611e9" },
  { label: "跨块 65B", bytes: Array(65).fill(0x61), hex: "3d1d94afa238ec3e2bbc20ad504702b24c16f2889c94973f2f8da3526c44e4bc" },
  { label: "0x00-0xc7 200B(二进制,仅 hex/base64 路径)", bytes: Array.from({ length: 200 }, (_, i) => i), hex: "137c8be9a568df1f999ea75e042359e582990c708027d61f20489a368bf5ced5" },
  { label: "中文 UTF-8", bytes: Array.from(new TextEncoder().encode("中文输入测试")), hex: "cee6f0a254aaf332ee1b532e01e5c661c13221c74b9546903225e07378b8f74f" },
];

const toHex = (b: number[]) => b.map((x) => x.toString(16).padStart(2, "0")).join("");
const toB64 = (b: number[]) => Buffer.from(b).toString("base64");

describe("computeSm3(text)", () => {
  // 仅 UTF-8 文本可表达的字节串走 text 路径;二进制向量走 hex/base64
  it.each([VECTORS[0], VECTORS[1], VECTORS[2], VECTORS[4]])("文本输入 $label", async ({ bytes, hex }) => {
    const text = new TextDecoder().decode(new Uint8Array(bytes));
    const r = await computeSm3(text, "text");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.hex).toBe(hex);
  });

  it("hex 输入:跨块 65B", async () => {
    const r = await computeSm3(toHex(VECTORS[3].bytes), "hex");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.hex).toBe(VECTORS[3].hex);
  });

  it("base64 输入:200B 二进制", async () => {
    const r = await computeSm3(toB64(VECTORS[4].bytes), "base64");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.hex).toBe(VECTORS[4].hex);
  });

  it("输出 base64 与锚一致(Buffer.from hex 独立换算)", async () => {
    const r = await computeSm3("abc", "text");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.base64).toBe(Buffer.from(VECTORS[0].hex, "hex").toString("base64"));
  });
});

describe("computeSm3 拒绝路径", () => {
  it("空输入拒绝", async () => {
    expect((await computeSm3("", "text")).ok).toBe(false);
    expect((await computeSm3("   ", "text")).ok).toBe(false);
  });
  it("非法 hex:奇数长度 / 非 hex 字符", async () => {
    expect((await computeSm3("abc", "hex")).ok).toBe(false);
    expect((await computeSm3("zz12", "hex")).ok).toBe(false);
  });
  it("非法 base64:长度 %4 / 非法字符 / padding 位置", async () => {
    expect((await computeSm3("YWJj", "base64")).ok).toBe(true); // "abc"
    expect((await computeSm3("YWJ", "base64")).ok).toBe(false);
    expect((await computeSm3("YW=j", "base64")).ok).toBe(false);
    expect((await computeSm3("-_-_", "base64")).ok).toBe(false);
  });
});

describe("hexToBase64", () => {
  it("SM3 256-bit hex → 44 字符标准 base64(独立锚 = Buffer.from)", () => {
    expect(hexToBase64(VECTORS[0].hex)).toBe(Buffer.from(VECTORS[0].hex, "hex").toString("base64"));
    expect(hexToBase64("00")).toBe("AA==");
  });
});
