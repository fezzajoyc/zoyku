import { describe, expect, it } from "vitest";
import { punycodeEncode, punycodeDecode, idnaEncode, idnaDecode } from "@/tools/_lib/punycode";

/**
 * CN-033 Punycode。锚 = Python codecs.encode/decode("punycode") + Python str.encode("idna")
 * + Node 内建 punycode 三实现一致(2026-11-23)。记忆向量已全部废弃。
 */

const encode = (s: string) => punycodeEncode(s);
const decode = (s: string) => punycodeDecode(s);

describe("Punycode 编码(python+node 双确认)", () => {
  it("bücher → bcher-kva", () => {
    const r = encode("bücher");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe("bcher-kva");
  });

  it("日本語 → wgv71a119e", () => {
    const r = encode("日本語");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe("wgv71a119e");
  });

  it("中国 → fiqs8s", () => {
    const r = encode("中国");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe("fiqs8s");
  });

  it("空输入拒绝", () => {
    expect(encode("").ok).toBe(false);
  });
});

describe("Punycode 解码", () => {
  it("bcher-kva → bücher", () => {
    const r = decode("bcher-kva");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe("bücher");
  });

  it("wgv71a119e → 日本語", () => {
    const r = decode("wgv71a119e");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe("日本語");
  });

  it("fiqs8s → 中国", () => {
    const r = decode("fiqs8s");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe("中国");
  });

  it("空输入拒绝", () => {
    expect(decode("").ok).toBe(false);
  });
});

describe("IDNA 域名", () => {
  it("中国 → xn--fiqs8s", () => {
    const r = idnaEncode("中国");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe("xn--fiqs8s");
  });

  it("bücher.de → xn--bcher-kva.de", () => {
    const r = idnaEncode("bücher.de");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe("xn--bcher-kva.de");
  });

  it("ASCII 域名直通", () => {
    const r = idnaEncode("example.com");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe("example.com");
  });

  it("IDNA 解码:xn--fiqs8s → 中国", () => {
    const r = idnaDecode("xn--fiqs8s");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe("中国");
  });

  it("IDNA 解码:xn--bcher-kva.de → bücher.de", () => {
    const r = idnaDecode("xn--bcher-kva.de");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe("bücher.de");
  });

  it("空输入拒绝", () => {
    expect(idnaEncode("").ok).toBe(false);
    expect(idnaDecode("").ok).toBe(false);
  });
});

describe("往返", () => {
  it("编码 → 解码 = 原始", () => {
    for (const text of ["bücher", "日本語", "中国"]) {
      const e = encode(text);
      if (!e.ok) throw new Error("encode failed");
      const d = decode(e.data);
      if (!d.ok) throw new Error("decode failed");
      expect(d.data).toBe(text);
    }
  });

  it("IDNA 往返", () => {
    for (const domain of ["中国", "bücher.de"]) {
      const e = idnaEncode(domain);
      if (!e.ok) throw new Error("encode failed");
      const d = idnaDecode(e.data);
      if (!d.ok) throw new Error("decode failed");
      expect(d.data).toBe(domain);
    }
  });
});
