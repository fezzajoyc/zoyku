import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import { config, proxy } from "@/proxy";
import { LOCALES } from "@/lib/site";

afterEach(() => vi.useRealTimers());

describe("navigation throttling and framework prefetch", () => {
  it.each([
    { "next-router-prefetch": "1" },
    { purpose: "prefetch" },
    { "next-router-prefetch": "1", purpose: "prefetch" },
  ])("does not charge speculative route requests to real visits: %j", (headers) => {
    expect(unstable_doesMiddlewareMatch({ config, url: "/en/tools/merge-pdf?_rsc=abc", headers })).toBe(false);
  });
  it("still runs for actual HTML, client navigation, and unlocalized visits", () => {
    for (const url of ["/en", "/zh/tools/merge-pdf", "/en/tools/merge-pdf?_rsc=abc", "/about"])
      expect(unstable_doesMiddlewareMatch({ config, url })).toBe(true);
  });
  it.each(["/", "/about", "/enough", "/xx/tools", "/privacy"])("keeps locale negotiation for prefetched unlocalized URL %s", (url) => {
    for (const headers of [{ "next-router-prefetch": "1" }, { purpose: "prefetch" }])
      expect(unstable_doesMiddlewareMatch({ config, url, headers })).toBe(true);
  });
  it.each(LOCALES)("aligns prefetch exclusions with the actual %s locale routes", (locale) => {
    for (const suffix of ["", "/", "/tools/merge-pdf"])
      expect(unstable_doesMiddlewareMatch({ config, url: `/${locale}${suffix}`, headers: { "next-router-prefetch": "1" } })).toBe(false);
  });
  it("keeps the ordinary 40-request limit and allows a new window", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-20T12:00:00Z"));
    const request = new NextRequest("https://zoyku.com/en", { headers: { "x-real-ip": "192.0.2.72", "user-agent": "proxy-regression" } });
    for (let n = 0; n < 40; n++) expect(proxy(request).status).toBe(200);
    const limited = proxy(request);
    expect(limited.status).toBe(429);
    expect(limited.headers.get("retry-after")).toBe("10");
    vi.advanceTimersByTime(10_001);
    expect(proxy(request).status).toBe(200);
  });
  it("preserves locale negotiation for normal visits", () => {
    const request = new NextRequest("https://zoyku.com/about?q=privacy", { headers: { "accept-language": "zh-CN, en;q=0.8", "x-real-ip": "192.0.2.73" } });
    expect(proxy(request).headers.get("location")).toBe("https://zoyku.com/zh/about?q=privacy");
  });
});
