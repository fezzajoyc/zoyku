import { describe, it, expect, beforeEach } from "vitest";
import { checkMcpRateLimit, resetMcpRateLimit } from "./rate-limit";

describe("checkMcpRateLimit", () => {
  beforeEach(() => resetMcpRateLimit());

  it("窗口内前 30 次放行", () => {
    let t = 1_000_000;
    for (let i = 0; i < 30; i++) {
      expect(checkMcpRateLimit("ip-a", t).allowed).toBe(true);
    }
  });

  it("第 31 次拒绝并给出 retryAfter", () => {
    let t = 1_000_000;
    for (let i = 0; i < 30; i++) checkMcpRateLimit("ip-b", t);
    const r = checkMcpRateLimit("ip-b", t + 1000);
    expect(r.allowed).toBe(false);
    expect(r.retryAfterSec).toBeGreaterThanOrEqual(1);
    expect(r.retryAfterSec).toBeLessThanOrEqual(60);
  });

  it("窗口滑出后恢复放行", () => {
    let t = 2_000_000;
    for (let i = 0; i < 30; i++) checkMcpRateLimit("ip-c", t);
    expect(checkMcpRateLimit("ip-c", t + 500).allowed).toBe(false);
    // 61s 后窗口里的 hits 全部过期
    expect(checkMcpRateLimit("ip-c", t + 61_000).allowed).toBe(true);
  });

  it("不同 IP 互不影响", () => {
    const t = 3_000_000;
    for (let i = 0; i < 30; i++) checkMcpRateLimit("ip-d", t);
    expect(checkMcpRateLimit("ip-e", t).allowed).toBe(true);
  });
});
