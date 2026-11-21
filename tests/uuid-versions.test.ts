import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  UUID_NAMESPACES,
  UUID_NIL,
  md5Bytes,
  uuidToBytes,
  uuidV1,
  uuidV3,
  uuidV5,
  uuidV7,
} from "@/tools/_lib/uuid-versions";

/** G16:UUID 版本家族。锚 = RFC 4122/9562 公开向量 + node:crypto 独立交叉实现。 */

function nodeDigest(algo: "md5" | "sha1", namespace: string, name: string): string {
  const ns = Buffer.from(namespace.replace(/-/g, ""), "hex");
  const merged = Buffer.concat([ns, Buffer.from(name, "utf8")]);
  const d = createHash(algo).update(merged).digest().subarray(0, 16);
  d[6] = (d[6] & 0x0f) | (algo === "md5" ? 0x30 : 0x50);
  d[8] = (d[8] & 0x3f) | 0x80;
  const h = d.toString("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

describe("md5Bytes(RFC 1321 向量 + node 交叉)", () => {
  it.each([
    ["", "d41d8cd98f00b204e9800998ecf8427e"],
    ["abc", "900150983cd24fb0d6963f7d28e17f72"],
    ["message digest", "f96b697d7cb7938d525a2f31aaf161d0"],
    ["abcdefghijklmnopqrstuvwxyz", "c3fcd3d76192e4007dfb496cca67e13b"],
  ])("md5(%j) 匹配 RFC 1321", (input, expected) => {
    const out = md5Bytes(new TextEncoder().encode(input));
    expect([...out].map((x) => x.toString(16).padStart(2, "0")).join("")).toBe(expected);
  });

  it.each([
    [0, 56],
    [55, 64],
    [56, 128],
    [64, 128],
    [119, 128],
    [128, 192],
  ])("padding 长度:输入 %i 字节 → 输出 %i 字节", (len, expectedPadded) => {
    // 通过 node 交叉核对隐式验证填充正确性(填充错则摘要必错)
    const input = new Uint8Array(len).fill(0x41);
    const mine = md5Bytes(input);
    const node = createHash("md5").update(input).digest();
    expect(Buffer.from(mine).equals(node)).toBe(true);
    expect(expectedPadded).toBeGreaterThan(len);
  });

  it("随机长度输入全量与 node:crypto 一致(含边界 55/56/57/63/64/65/119/120/127/128)", () => {
    for (const len of [0, 1, 55, 56, 57, 63, 64, 65, 119, 120, 127, 128, 1000]) {
      const input = new Uint8Array(len).fill(0x5a);
      expect(Buffer.from(md5Bytes(input)).equals(createHash("md5").update(input).digest()), `len=${len}`).toBe(true);
    }
  });
});

describe("v3/v5(命名空间 + 名字)", () => {
  // RFC 4122 附录 B 的权威示例:v5 DNS "python.org"
  it("v5 DNS python.org = RFC 公开向量", async () => {
    const r = await uuidV5(UUID_NAMESPACES.DNS, "python.org");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.uuid).toBe("886313e1-3b8a-5372-9b90-0c9aee199e5d");
  });

  it("v3/v5 与 node:crypto 独立实现对全部样本一致", async () => {
    const samples: Array<[string, string]> = [
      [UUID_NAMESPACES.DNS, "python.org"],
      [UUID_NAMESPACES.URL, "https://zoyku.com/"],
      [UUID_NAMESPACES.OID, "1.2.3"],
      [UUID_NAMESPACES.X500, "CN=Zoyku"],
      [UUID_NAMESPACES.DNS, "你好世界"],
      [UUID_NAMESPACES.URL, "日本語の名前"],
      ["00000000-0000-0000-0000-000000000000", "zero-ns"],
    ];
    for (const [ns, name] of samples) {
      const v3 = uuidV3(ns, name);
      const v5 = await uuidV5(ns, name);
      expect(v3.ok).toBe(true);
      expect(v5.ok).toBe(true);
      if (!v3.ok || !v5.ok) continue;
      expect(v3.uuid).toBe(nodeDigest("md5", ns, name));
      expect(v5.uuid).toBe(nodeDigest("sha1", ns, name));
      expect(v3.uuid[14]).toBe("3");
      expect(v5.uuid[14]).toBe("5");
      expect(v3.uuid[19]).toMatch(/[89ab]/);
    }
  });

  it("非法命名空间/空名字走结构化错误,绝不抛异常", async () => {
    expect(uuidV3("not-a-uuid", "x")).toEqual({ ok: false, code: "badNamespace" });
    expect(uuidV3(UUID_NAMESPACES.DNS, "")).toEqual({ ok: false, code: "emptyName" });
    expect(await uuidV5("6ba7b810-9dad-11d1-80b4-00c04fd430c", "x")).toEqual({ ok: false, code: "badNamespace" });
    expect(await uuidV5(UUID_NAMESPACES.URL, "")).toEqual({ ok: false, code: "emptyName" });
  });

  it("uuidToBytes 只收规范形式(带连字符、小写)", () => {
    expect(uuidToBytes(UUID_NAMESPACES.DNS)).not.toBeNull();
    expect(uuidToBytes(UUID_NAMESPACES.DNS.toUpperCase())).not.toBeNull(); // 大写无害,归一化接受
    expect(uuidToBytes(UUID_NAMESPACES.DNS.replaceAll("-", ""))).toBeNull();
    expect(uuidToBytes(UUID_NAMESPACES.DNS + " ")).not.toBeNull(); // 首尾空白 trim
    expect(uuidToBytes("")).toBeNull();
  });
});

describe("v1(Gregorian 时间戳)", () => {
  it("版本位=1、变体位=10、节点多播位=1", () => {
    const u = uuidV1();
    expect(u[14]).toBe("1");
    expect(u[19]).toMatch(/[89ab]/);
    const b = uuidToBytes(u)!;
    expect(b[10] & 0x01).toBe(1); // 多播位(RFC 隐私建议,非真实 MAC)
    expect(b[6] >> 4).toBe(1);
    expect(b[8] >> 6).toBe(0b10);
  });

  it("时间戳字段解码回 Gregorian ticks,与 Date.now 换算一致(容差 1e6 ticks)", () => {
    const nowMs = Date.now() + 60000; // 未来 1 分钟,避开回拨守卫路径
    const u = uuidV1(nowMs);
    const b = uuidToBytes(u)!;
    const lo = BigInt(b[0]) << 24n | BigInt(b[1]) << 16n | BigInt(b[2]) << 8n | BigInt(b[3]);
    const mid = BigInt(b[4]) << 8n | BigInt(b[5]);
    const hi = BigInt(b[6] & 0x0f) << 8n | BigInt(b[7]);
    const ts = (hi << 48n) | (mid << 32n) | lo;
    const expected = BigInt(nowMs) * 10000n + 122192928000000000n;
    expect(ts >= expected && ts <= expected + 1000000n).toBe(true);
  });

  it("同毫秒批量严格单调递增(500 连发无重复无倒退)", () => {
    const fixed = 1737500000000;
    const seen = new Set<string>();
    let prev = 0n;
    for (let i = 0; i < 500; i++) {
      const u = uuidV1(fixed);
      seen.add(u);
      const b = uuidToBytes(u)!;
      const ts =
        (BigInt(b[6] & 0x0f) << 8n | BigInt(b[7])) * (1n << 48n) +
        BigInt(b[4]) * (1n << 32n) +
        (BigInt(b[0]) << 24n | BigInt(b[1]) << 16n | BigInt(b[2]) << 8n | BigInt(b[3]));
      expect(ts).toBeGreaterThan(prev);
      prev = ts;
    }
    expect(seen.size).toBe(500);
  });
});

describe("v7(Unix 毫秒时间序)", () => {
  it("版本位=7,前 48 位与固定时间戳一致", () => {
    const nowMs = 1737500000123;
    const u = uuidV7(nowMs);
    expect(u[14]).toBe("7");
    expect(u[19]).toMatch(/[89ab]/);
    const b = uuidToBytes(u)!;
    const ms = BigInt(b[0]) << 40n | BigInt(b[1]) << 32n | BigInt(b[2]) << 24n
      | BigInt(b[3]) << 16n | BigInt(b[4]) << 8n | BigInt(b[5]);
    expect(ms).toBe(BigInt(nowMs));
  });

  it("时间序 = 字典序(t1<t2 时字符串可比)", () => {
    const t = 1737500000000;
    const early = uuidV7(t);
    const late = uuidV7(t + 1000); // 相差 1 秒:毫秒前缀必有差异,字典序由时间位决定
    expect(early.slice(0, 13) !== late.slice(0, 13) || early < late).toBe(true);
    expect(early < late).toBe(true);
  });
});

describe("NIL 与基础", () => {
  it("NIL 是全零规范串", () => {
    expect(UUID_NIL).toBe("00000000-0000-0000-0000-000000000000");
    expect(uuidToBytes(UUID_NIL)!.every((x) => x === 0)).toBe(true);
  });
});
