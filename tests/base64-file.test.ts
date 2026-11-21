import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { base64ToBytes, bytesToBase64, encodeFileToBase64, BASE64_FILE_LIMIT } from "@/tools/_lib/base64-file";

/** G21:任意二进制 ↔ Base64。锚 = node:crypto/Buffer 独立实现交叉核对。 */
describe("bytesToBase64(与 Buffer 交叉)", () => {
  it.each([0, 1, 2, 3, 57, 58, 8191, 8192, 8193, 0x8000, 0x8000 + 1, 100_000])(
    "%i 字节随机数据与 Buffer.toString('base64') 一致",
    (len) => {
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = (i * 131 + 7) & 0xff;
      const mine = bytesToBase64(bytes);
      const node = Buffer.from(bytes).toString("base64");
      expect(mine).toBe(node);
      if (len > 0) {
        // md5 双锚:编码结果解码回原字节哈希一致(0 字节按设计拒绝解码)
        const round = Buffer.from(base64ToBytes(mine)!);
        expect(createHash("md5").update(round).digest("hex")).toBe(createHash("md5").update(bytes).digest("hex"));
      }
    },
  );

  it("极端字节 0x00/0xff 交替与全字节表往返无损", () => {
    const alternating = new Uint8Array(64).map((_, i) => (i % 2 ? 0xff : 0x00));
    const round1 = base64ToBytes(bytesToBase64(alternating))!;
    expect([...round1]).toEqual([...alternating]);
    const all = new Uint8Array(256);
    for (let i = 0; i < 256; i++) all[i] = i;
    const round2 = base64ToBytes(bytesToBase64(all))!;
    expect([...round2]).toEqual([...all]);
  });
});

describe("base64ToBytes(严格校验)", () => {
  it("标准与 URL 安全字母表、空白容忍、无填充接受", () => {
    expect(Buffer.from(base64ToBytes("YWJj")!).toString()).toBe("abc");
    expect(Buffer.from(base64ToBytes("YWJjZA==")!).toString()).toBe("abcd");
    expect(Buffer.from(base64ToBytes("YWJjZA")!).toString()).toBe("abcd"); // 无填充
    expect(Buffer.from(base64ToBytes("-_8")!)).toEqual(Buffer.from(base64ToBytes("+/8")!)); // urlsafe 等价
    expect(Buffer.from(base64ToBytes("YWJj\nZGE=")!).toString()).toBe("abcda"); // 空白容忍(YWJjZGE= = 6 字节)
  });

  it("非法输入结构化拒绝:非法字符/长度%4==1/空", () => {
    expect(base64ToBytes("abc*")).toBeNull();
    expect(base64ToBytes("abcde")).toBeNull(); // %4==1
    expect(base64ToBytes("")).toBeNull();
    expect(base64ToBytes("YWJj!")).toBeNull();
    // 非法字符被拒,而不是静默产出垃圾字节(@ 不是 Base64 字符;/ 合法)
    expect(base64ToBytes("aGVsbG8@text")).toBeNull();
  });
});

describe("encodeFileToBase64(诚实限额)", () => {
  it("限额内正常编码并报告字节数", () => {
    const bytes = new Uint8Array(1000).fill(0x7f);
    const r = encodeFileToBase64(bytes);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.bytes).toBe(1000);
      expect(r.base64).toBe(Buffer.from(bytes).toString("base64"));
    }
  });

  it("超过限额返回 tooLarge,不部分编码不抛异常", () => {
    const r = encodeFileToBase64(new Uint8Array(BASE64_FILE_LIMIT + 1));
    expect(r).toEqual({ ok: false, code: "tooLarge" });
    const edge = encodeFileToBase64(new Uint8Array(BASE64_FILE_LIMIT));
    expect(edge.ok).toBe(true);
  });
});
