import { describe, expect, it } from "vitest";
import { decodeGbkBytes, decodeGbkInput, countReplacements } from "@/tools/_lib/gbk-decode";

/**
 * CN-018 GBK/GB18030 解码。锚 = python3 内建 gbk/gb18030 codec(C 实现)+ node TextDecoder 双向核对。
 * WHATWG Encoding 标准:gbk 标签兼容 GB2312;gb18030 支持 4 字节序列。
 */

const VECTOR_TEXT = "中文"; // python: '中文'.encode('gbk') = d6 d0 ce c4
const VECTOR_HELLO = "你好,世界!"; // c4 e3 ba c3 2c ca c0 bd e7 21
const VECTOR_PUNCT = "【国标】《测试》"; // a1 be ... a1 b7
const U20000 = "𠀀"; // python: .encode('gb18030') = 95 32 82 36(4 字节)

const enc = (s: string, e: "gbk" | "gb18030" = "gbk") =>
  Array.from(new TextEncoder().encode(s)); // 锚字节由 python 生成的 hex 重建,见 hex 用例

describe("decodeGbkBytes", () => {
  it("GBK:中文(d6 d0 ce c4)", () => {
    const r = decodeGbkBytes(new Uint8Array([0xd6, 0xd0, 0xce, 0xc4]), "gbk");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.text).toBe(VECTOR_TEXT);
      expect(r.replacementCount).toBe(0);
      expect(r.byteLength).toBe(4);
    }
  });
  it("GBK:你好,世界!", () => {
    const r = decodeGbkBytes(new Uint8Array([0xc4, 0xe3, 0xba, 0xc3, 0x2c, 0xca, 0xc0, 0xbd, 0xe7, 0x21]), "gbk");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toBe(VECTOR_HELLO);
  });
  it("GBK:全角标点【】《》", () => {
    const r = decodeGbkBytes(
      new Uint8Array([0xa1, 0xbe, 0xb9, 0xfa, 0xb1, 0xea, 0xa1, 0xbf, 0xa1, 0xb6, 0xb2, 0xe2, 0xca, 0xd4, 0xa1, 0xb7]),
      "gbk",
    );
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toBe(VECTOR_PUNCT);
  });
  it("ASCII 直通", () => {
    const r = decodeGbkBytes(new TextEncoder().encode("plain ascii 123"), "gbk");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toBe("plain ascii 123");
  });
  it("GB18030:4 字节序列 U+20000(95 32 82 36)", () => {
    const r = decodeGbkBytes(new Uint8Array([0x95, 0x32, 0x82, 0x36]), "gb18030");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toBe(U20000);
  });
  it("损坏字节 → U+FFFD 计数(0xD6 0x7F:非法跟随字节)", () => {
    const r = decodeGbkBytes(new Uint8Array([0xd6, 0x7f]), "gbk");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.replacementCount).toBe(1);
  });
  it("截断前导字节(0xD6 单独)→ 1 个替换符", () => {
    const r = decodeGbkBytes(new Uint8Array([0xd6]), "gbk");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.replacementCount).toBe(1);
  });
  it("空输入拒绝", () => {
    expect(decodeGbkBytes(new Uint8Array(0), "gbk").ok).toBe(false);
  });
  it("超大输入拒绝(>2MB)", () => {
    expect(decodeGbkBytes(new Uint8Array(2_000_001), "gbk").ok).toBe(false);
  });
});

describe("decodeGbkInput(粘贴路径)", () => {
  it("hex 输入:中文", () => {
    const r = decodeGbkInput("d6d0cec4", "hex", "gbk");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toBe(VECTOR_TEXT);
  });
  it("hex 大小写不敏感 + 空格容忍", () => {
    const r = decodeGbkInput("D6 D0 CE C4", "hex", "gbk");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toBe(VECTOR_TEXT);
  });
  it("非法 hex 拒绝", () => {
    expect(decodeGbkInput("zz", "hex", "gbk").ok).toBe(false);
  });
  it("base64 输入:你好", () => {
    // python: '你好'.encode('gbk') = c4 e3 ba c3 → base64 xOO6ww==
    const r = decodeGbkInput("xOO6ww==", "base64", "gbk");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text).toBe("你好");
  });
  it("空粘贴拒绝", () => {
    expect(decodeGbkInput("", "hex", "gbk").ok).toBe(false);
  });
});

describe("countReplacements", () => {
  it("按码点计数而非按 UTF-16 单元", () => {
    expect(countReplacements("\u{FFFD}\u{FFFD}中文")).toBe(2);
  });
});
