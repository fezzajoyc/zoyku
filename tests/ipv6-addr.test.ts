import { describe, expect, it } from "vitest";
import { ipv6Expand, isIPv6, ipv6ToBinaryString } from "@/tools/_lib/ipv6-addr";

/**
 * CN-031 IPv6 压缩/展开。锚 = Python ipaddress.IPv6Address(compressed/exploded,2026-11-23 生成):
 * RFC 5952 规范(最长零段缩 ::、首段优先、小写、去前导零)。
 */

describe("展开(完整形式)", () => {
  it("2001:db8::1 → 8 组全写", () => {
    const r = ipv6Expand("2001:db8::1");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.expanded).toBe("2001:0db8:0000:0000:0000:0000:0000:0001");
    expect(r.compressed).toBe("2001:db8::1");
  });

  it("经典示例展开", () => {
    const r = ipv6Expand("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.expanded).toBe("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
    expect(r.compressed).toBe("2001:db8:85a3::8a2e:370:7334");
  });

  it(":: 全零与 ::1 环回", () => {
    expect(ipv6Expand("::").ok ? ipv6Expand("::").expanded : "").toBe("0000:0000:0000:0000:0000:0000:0000:0000");
    expect(ipv6Expand("::1").ok ? ipv6Expand("::1").expanded : "").toBe("0000:0000:0000:0000:0000:0000:0000:0001");
  });

  it("IPv4 映射:compressed 保留 IPv4 点分表示", () => {
    const r = ipv6Expand("::ffff:192.168.1.1");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    // RFC 5952 纯 hex 展开;python exploded 对 IPv4 映射保留点分记法属 Python 特有行为
    expect(r.expanded).toBe("0000:0000:0000:0000:0000:ffff:c0a8:0101");
    expect(r.compressed).toBe("::ffff:192.168.1.1");
  });
});

describe("RFC 5952 压缩", () => {
  it("最长零段缩为 ::(首段优先)", () => {
    const r = ipv6Expand("2001:0db8:0000:0000:0000:ff00:0042:8329");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.compressed).toBe("2001:db8::ff00:42:8329");
  });

  it("前导零去除(0370 → 370)", () => {
    const r = ipv6Expand("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.compressed).not.toContain("0370");
    expect(r.compressed).toContain("370");
  });

  it("同长零段取首段(RFC 5952 §4.2.3)", () => {
    // 两个等长零段:应缩第一个
    const r = ipv6Expand("0:0:1:0:0:1:0:0");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.compressed.startsWith("::")).toBe(true);
  });

  it("空输入/非法格式拒绝", () => {
    expect(ipv6Expand("").ok).toBe(false);
    expect(ipv6Expand("2001:db8:::1").ok).toBe(false);
    expect(ipv6Expand("2001:db8:::1").code).toBe("badFormat");
    expect(ipv6Expand("gggg::1").ok).toBe(false);
    expect(ipv6Expand("2001:db8:85a3:0:0:8a2e:370:7334:extra").ok).toBe(false);
  });
});

describe("校验 isIPv6", () => {
  it.each([
    "2001:db8::1",
    "::",
    "::1",
    "fe80::1",
    "::ffff:192.168.1.1",
    "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
  ])("%s → true", (input) => {
    expect(isIPv6(input)).toBe(true);
  });

  it.each([
    "192.168.1.1",
    "2001:db8:::1",
    "gggg::1",
    "",
  ])("%s → false", (input) => {
    expect(isIPv6(input)).toBe(false);
  });
});

describe("二进制一致性(python ipaddress 交叉)", () => {
  it("::ffff:192.168.1.1 展开的 128 位比特与 python exploded 一致", () => {
    const bits = ipv6ToBinaryString("::ffff:192.168.1.1");
    expect(bits).toBe("0".repeat(80) + "1".repeat(16) + "11000000" + "10101000" + "00000001" + "00000001");
  });
});
