import { describe, expect, it } from "vitest";
import { encodeTime, encodeRandom, generateUlid, parseUlid, ULID_LENGTH } from "@/tools/_lib/ulid";

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

describe("ULID", () => {
  it("encodes known timestamps per spec", () => {
    // 规范经典示例:时间戳 0 → "0000000000"
    expect(encodeTime(0)).toBe("0000000000");
    // 编码后可往返解码回原毫秒值
    const t = encodeTime(1469918176385);
    expect(t).toMatch(/^[0-7][0-9A-HJKMNP-TV-Z]{9}$/);
    let n = 0;
    for (const ch of t) n = n * 32 + ALPHABET.indexOf(ch);
    expect(n).toBe(1469918176385);
  });

  it("generates 26-char ULIDs that parse back", () => {
    const before = Date.now();
    const ulid = generateUlid();
    const after = Date.now();
    expect(ulid).toHaveLength(ULID_LENGTH);
    expect(ulid).toMatch(/^[0-9A-HJKMNP-TV-Z]{26}$/);
    const parsed = parseUlid(ulid);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.timestamp).toBeGreaterThanOrEqual(before);
      expect(parsed.timestamp).toBeLessThanOrEqual(after);
    }
    // 随机部分:两次生成不应碰撞
    expect(generateUlid()).not.toBe(generateUlid());
  });

  it("rejects bad input", () => {
    expect(parseUlid("short").ok).toBe(false);
    expect(parseUlid("01ARZ3NDEKTSV4RRFFQ69G5F").ok).toBe(false); // 25 字符
    expect(parseUlid("01ARZ3NDEKTSV4RRFFQ69G5FU").ok).toBe(false); // U 不在字母表
    expect(() => encodeRandom(new Uint8Array(3))).toThrow();
    const ten = new Uint8Array(10).fill(0);
    expect(encodeRandom(ten)).toBe("0000000000000000");
    expect(() => generateUlid(-1)).toThrow();
  });
});
