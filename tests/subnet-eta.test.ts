import { describe, expect, it } from "vitest";
import { intToIp, ipToInt, parseCidr, smallestCidr, subnetInfo } from "@/tools/_lib/subnet";
import { estimateEta, humanizeDuration } from "@/tools/_lib/eta";

describe("subnet: ipToInt / intToIp round-trip", () => {
  it("round-trips and rejects octets > 255", () => {
    expect(ipToInt("192.168.1.1")).toBe(0xc0a80101);
    expect(intToIp(0xc0a80101)).toBe("192.168.1.1");
    expect(intToIp(0)).toBe("0.0.0.0");
    expect(ipToInt("256.1.1.1")).toBeNull();
    expect(ipToInt("1.2.3")).toBeNull();
    expect(ipToInt("1.2.3.4.5")).toBeNull();
  });

  it("parses CIDR with prefix validation", () => {
    expect(parseCidr("10.0.0.0/8")).toEqual({ ip: ipToInt("10.0.0.0"), prefix: 8 });
    expect(parseCidr("1.2.3.4")).toEqual({ ip: ipToInt("1.2.3.4"), prefix: 32 });
    expect(parseCidr("1.2.3.4/33")).toBeNull();
    expect(parseCidr("1.2.3.4/x")).toBeNull();
  });
});

describe("subnetInfo: /24 baseline and boundary prefixes", () => {
  it("computes 192.168.1.130/26 correctly", () => {
    const info = subnetInfo(ipToInt("192.168.1.130")!, 26);
    expect(intToIp(info.network)).toBe("192.168.1.128");
    expect(intToIp(info.broadcast)).toBe("192.168.1.191");
    expect(intToIp(info.mask)).toBe("255.255.255.192");
    expect(intToIp(info.wildcard)).toBe("0.0.0.63");
    expect(info.usableHosts).toBe(62);
    expect(intToIp(info.firstHost)).toBe("192.168.1.129");
    expect(intToIp(info.lastHost)).toBe("192.168.1.190");
    expect(info.ipClass).toBe("C");
    expect(info.isPrivate).toBe(true);
  });

  it("treats /31 (RFC 3021) and /32 as all-usable", () => {
    const p31 = subnetInfo(ipToInt("10.0.0.4")!, 31);
    expect(p31.usableHosts).toBe(2);
    expect(p31.firstHost >>> 0).toBe(p31.network >>> 0);
    expect(p31.lastHost >>> 0).toBe(p31.broadcast >>> 0);
    const p32 = subnetInfo(ipToInt("1.2.3.4")!, 32);
    expect(p32.usableHosts).toBe(1);
    expect(p32.totalHosts).toBe(1);
    expect(intToIp(p32.broadcast)).toBe("1.2.3.4");
  });

  it("handles /0 and class A private/public detection", () => {
    const p0 = subnetInfo(ipToInt("77.13.5.9")!, 0);
    expect(p0.totalHosts).toBe(4294967296);
    expect(intToIp(p0.broadcast)).toBe("255.255.255.255");
    expect(subnetInfo(ipToInt("8.8.8.8")!, 32).isPrivate).toBe(false);
    expect(subnetInfo(ipToInt("172.16.0.1")!, 32).isPrivate).toBe(true);
    expect(subnetInfo(ipToInt("172.32.0.1")!, 32).isPrivate).toBe(false);
    expect(subnetInfo(ipToInt("100.64.1.1")!, 32).isPrivate).toBe(true);
    expect(subnetInfo(ipToInt("169.254.3.3")!, 32).isPrivate).toBe(true);
    expect(subnetInfo(ipToInt("11.0.0.1")!, 8).ipClass).toBe("A");
    expect(subnetInfo(ipToInt("224.0.0.1")!, 24).ipClass).toBe("D");
  });
});

describe("smallestCidr", () => {
  it("merges two hosts into the minimal covering block", () => {
    const r = smallestCidr(ipToInt("10.1.2.3")!, ipToInt("10.1.9.200")!);
    expect(intToIp(r.network)).toBe("10.1.0.0");
    expect(r.prefix).toBe(20);
  });

  it("gives /32 for identical IPs and is order-independent", () => {
    const a = ipToInt("8.8.4.4")!;
    expect(smallestCidr(a, a)).toEqual({ network: a, prefix: 32 });
    expect(smallestCidr(ipToInt("1.2.3.4")!, ipToInt("255.255.255.255")!).prefix).toBe(0);
  });
});

describe("eta lib", () => {
  it("computes duration for a per-day rate", () => {
    const start = Date.UTC(2026, 0, 5, 9, 0); // Monday
    const r = estimateEta({ startMs: start, total: 120, rate: 8, rateUnit: "day", hoursPerDay: 8 });
    expect(r).not.toBeNull();
    expect(r!.hours).toBe(120);
    expect(r!.daysRemaining).toBe(15);
    expect(r!.finishMs).toBe(start + 15 * 86_400_000);
  });

  it("rejects non-positive or out-of-range input", () => {
    expect(estimateEta({ startMs: 0, total: 0, rate: 1, rateUnit: "day" })).toBeNull();
    expect(estimateEta({ startMs: 0, total: 10, rate: 0, rateUnit: "day" })).toBeNull();
    expect(estimateEta({ startMs: 0, total: 10, rate: 1, rateUnit: "day", hoursPerDay: 25 })).toBeNull();
  });

  it("humanizes durations and supports a week rate (5-day week)", () => {
    expect(humanizeDuration((3 * 1440 + 4 * 60) * 60_000, "en")).toBe("3 d 4 h");
    expect(humanizeDuration(2 * 3600_000 + 15 * 60_000, "en")).toBe("2 h 15 min");
    expect(humanizeDuration(45 * 60_000, "en")).toBe("45 min");
    expect(humanizeDuration(90 * 60_000, "zh")).toBe("1 小时 30 分钟");
    const r = estimateEta({ startMs: 0, total: 10, rate: 10, rateUnit: "week", hoursPerDay: 8 });
    expect(r!.daysRemaining).toBe(7);
  });
});
