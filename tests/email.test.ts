import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { lookupEmailDomain, parseMailDns, type DnsResponse } from "@/tools/_lib/email";
import { isIpRateLimited } from "@/tools/_lib/ip-lookup";

const dns = (...records: Array<[number, string]>): DnsResponse => ({ Status: 0, Answer: records.map(([type, data]) => ({ type, data })) });

describe("real mail DNS parser", () => {
  it("recognizes only the explicit RFC 7505 null MX and never calls its dot a host", () => {
    expect(parseMailDns(dns([15, "0 ."]))).toEqual({ kind: "null-mx", hosts: [] });
  });
  it("parses and orders real MX hosts without trailing dots", () => {
    expect(parseMailDns(dns([15, "20 backup.example.com."], [15, "10 mail.example.com."]))).toEqual({ kind: "mx", hosts: ["mail.example.com", "backup.example.com"] });
  });
  it("does not label an MX-less address-less domain as null MX", () => {
    expect(parseMailDns(dns(), dns(), dns())).toEqual({ kind: "no-route", hosts: [] });
  });
  it("checks both A and AAAA as possible implicit mail routes", () => {
    expect(parseMailDns(dns(), dns([1, "192.0.2.2"]), dns()).kind).toBe("fallback");
    expect(parseMailDns(dns(), dns(), dns([28, "2001:db8::1"])).kind).toBe("fallback");
    expect(parseMailDns(dns()).kind).toBe("needs-address");
  });
  it.each([2, 3, 5])("keeps a known A or AAAA fallback when the other family's DNS status is %i", (status) => {
    expect(parseMailDns(dns(), dns([1, "192.0.2.2"]), { Status: status }).kind).toBe("fallback");
    expect(parseMailDns(dns(), { Status: status }, dns([28, "2001:db8::1"])).kind).toBe("fallback");
  });
  it("preserves NXDOMAIN and SERVFAIL rather than presenting them as missing records", () => {
    expect(parseMailDns({ Status: 3 }).kind).toBe("nxdomain");
    expect(parseMailDns({ Status: 2 }).kind).toBe("servfail");
    expect(parseMailDns(dns(), { Status: 2 }, dns()).kind).toBe("servfail");
    expect(parseMailDns({ Status: 5 }).kind).toBe("temporary-error");
  });
  it("treats malformed and contradictory null MX answers as inconclusive", () => {
    expect(parseMailDns({}).kind).toBe("temporary-error");
    expect(parseMailDns(dns([15, "0 ."], [15, "10 mail.example.com."])).kind).toBe("temporary-error");
    expect(parseMailDns(dns([15, "not an MX"])).kind).toBe("temporary-error");
    expect(parseMailDns({ Status: 0, Answer: [{ type: 15 }] } as DnsResponse).kind).toBe("temporary-error");
    expect(parseMailDns({ Status: 0, Answer: [null] } as unknown as DnsResponse).kind).toBe("temporary-error");
  });
});

describe("mail lookup transport", () => {
  it("sends only the validated domain and queries AAAA as well as A when MX is absent", async () => {
    const urls: string[] = [];
    const result = await lookupEmailDomain("example.com", async (url) => {
      urls.push(String(url));
      return new Response(JSON.stringify(String(url).endsWith("type=AAAA") ? dns([28, "2001:db8::1"]) : dns()));
    });
    expect(result.kind).toBe("fallback");
    expect(urls).toEqual(["https://dns.google/resolve?name=example.com&type=MX", "https://dns.google/resolve?name=example.com&type=A", "https://dns.google/resolve?name=example.com&type=AAAA"]);
    await expect(lookupEmailDomain("private@example.com", async () => { throw new Error("must not send the address"); })).rejects.toThrow("domain");
  });
  it("does not request an address fallback for explicit refusal or DNS failures", async () => {
    for (const response of [dns([15, "0 ."]), { Status: 3 }, { Status: 2 }]) {
      let calls = 0;
      await lookupEmailDomain("example.com", async () => { calls++; return new Response(JSON.stringify(response)); });
      expect(calls).toBe(1);
    }
  });
  it("fails honestly when an HTTP address fallback fails", async () => {
    await expect(lookupEmailDomain("example.com", async (url) => new Response(JSON.stringify(dns()), { status: String(url).endsWith("type=MX") ? 200 : 503 }))).rejects.toThrow("503");
  });
  it.each(["A", "AAAA"])("keeps the known %s route when the other family's HTTP query fails", async (knownFamily) => {
    const result = await lookupEmailDomain("example.com", async (url) => {
      if (String(url).endsWith("type=MX")) return new Response(JSON.stringify(dns()));
      if (String(url).endsWith(`type=${knownFamily}`)) return new Response(JSON.stringify(knownFamily === "A" ? dns([1, "192.0.2.2"]) : dns([28, "2001:db8::1"])));
      return new Response("unavailable", { status: 503 });
    });
    expect(result.kind).toBe("fallback");
  });
  it.each(["A", "AAAA"])("keeps the known %s route when the other family's request rejects", async (knownFamily) => {
    const result = await lookupEmailDomain("example.com", async (url) => {
      if (String(url).endsWith("type=MX")) return new Response(JSON.stringify(dns()));
      if (String(url).endsWith(`type=${knownFamily}`)) return new Response(JSON.stringify(knownFamily === "A" ? dns([1, "192.0.2.2"]) : dns([28, "2001:db8::1"])));
      throw new Error("Network unavailable");
    });
    expect(result.kind).toBe("fallback");
  });
});

describe("real IP quota classifier", () => {
  it("recognizes HTTP 429 and provider quota errors without mislabeling unrelated failures", () => {
    expect(isIpRateLimited(429, null)).toBe(true);
    expect(isIpRateLimited(200, { success: false, message: "Rate limit exceeded" })).toBe(true);
    expect(isIpRateLimited(200, { success: false, message: "Monthly quota exceeded" })).toBe(true);
    expect(isIpRateLimited(400, { success: false, message: "Invalid IP address" })).toBe(false);
    expect(isIpRateLimited(500, null)).toBe(false);
  });
});

describe("mail DNS integration keeps refusal, absence and temporary failures distinct", () => {
  const engine = readFileSync(new URL("../tools/_engines/sec-engine-email.tsx", import.meta.url), "utf8");
  it("uses the tested email-domain lookup rather than interpreting every empty MX answer as null MX", () => {
    expect(engine).toContain("lookupEmailDomain(domain)");
    expect(engine).not.toContain("mxHosts.length === 0 && !hasA");
  });
});

describe("IP quota failures", () => {
  const engine = readFileSync(new URL("../tools/_engines/sec-engine-lookup.tsx", import.meta.url), "utf8");
  it("uses a tested quota classifier and a dedicated retry message", () => {
    expect(engine).toContain("isIpRateLimited(res.status, json)");
    expect(engine).toContain('L(locale, "errIpRateLimited")');
  });
});
