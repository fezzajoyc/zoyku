import { describe, expect, it } from "vitest";
import { expandIpRange, intToIp, ipToInt } from "@/tools/_lib/subnet";

/** G15:任意起止 IPv4 区间展开。锚 = intToIp/ipToInt 互逆 + 手算区间。 */

describe("expandIpRange", () => {
  it("小区间逐地址展开,首尾含入", () => {
    const r = expandIpRange(ipToInt("10.0.0.0")!, ipToInt("10.0.0.3")!);
    expect(r?.total).toBe(4);
    expect(r?.ips.map(intToIp)).toEqual(["10.0.0.0", "10.0.0.1", "10.0.0.2", "10.0.0.3"]);
    expect(r?.truncated).toBe(false);
  });

  it("单地址区间 = 1 个地址", () => {
    const r = expandIpRange(ipToInt("192.168.1.7")!, ipToInt("192.168.1.7")!);
    expect(r?.total).toBe(1);
    expect(r?.ips).toEqual([ipToInt("192.168.1.7")!]);
  });

  it("倒序拒绝(不猜意图)", () => {
    expect(expandIpRange(ipToInt("10.0.0.5")!, ipToInt("10.0.0.1")!)).toBeNull();
  });

  it("跨字节边界:10.0.0.255 → 10.0.1.2 连续递增", () => {
    const r = expandIpRange(ipToInt("10.0.0.255")!, ipToInt("10.0.1.2")!);
    expect(r?.total).toBe(4);
    expect(r?.ips.map(intToIp)).toEqual(["10.0.0.255", "10.0.1.0", "10.0.1.1", "10.0.1.2"]);
  });

  it("超大区间:总量正确、列表诚实截断", () => {
    const r = expandIpRange(ipToInt("0.0.0.0")!, ipToInt("255.255.255.255")!, 65536);
    expect(r?.total).toBe(2 ** 32);
    expect(r?.ips.length).toBe(65536);
    expect(r?.truncated).toBe(true);
    expect(r?.ips[0]).toBe(0);
  });

  it("默认上限 65536;恰好在上限处不截断", () => {
    const atLimit = expandIpRange(ipToInt("1.0.0.0")!, ipToInt("1.0.0.0")! + 65535);
    expect(atLimit?.truncated).toBe(false);
    expect(atLimit?.ips.length).toBe(65536);
    const over = expandIpRange(ipToInt("1.0.0.0")!, ipToInt("1.0.0.0")! + 65536);
    expect(over?.truncated).toBe(true);
  });

  it("非法输入结构化拒绝(非整数/越界),绝不抛异常", () => {
    expect(expandIpRange(-1, 5)).toBeNull();
    expect(expandIpRange(0, 2 ** 32)).toBeNull();
    expect(expandIpRange(1.5, 3)).toBeNull();
    expect(expandIpRange(NaN, 3)).toBeNull();
  });

  it("展开结果全部经 intToIp 往返一致", () => {
    const r = expandIpRange(ipToInt("172.16.5.250")!, ipToInt("172.16.6.10")!);
    if (!r) throw new Error("expand failed");
    for (let i = 0; i < r.ips.length; i++) {
      expect(ipToInt(intToIp(r.ips[i]))).toBe(r.ips[i]);
    }
  });
});
