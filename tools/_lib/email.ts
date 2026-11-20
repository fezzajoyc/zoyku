/** DNS-over-HTTPS responses contain DNS status separately from HTTP status. */
export type DnsResponse = { Status?: number; Answer?: Array<{ type: number; data: string }> };

export type MailDnsKind = "mx" | "null-mx" | "needs-address" | "fallback" | "no-route" | "nxdomain" | "servfail" | "temporary-error";
export type MailDnsResult = { kind: MailDnsKind; hosts: string[] };

function validDomain(domain: string): boolean {
  return domain.length <= 253 && domain.includes(".") && domain.split(".").every((label) => label.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label));
}

function dnsFailure(response: DnsResponse): MailDnsKind | null {
  if (response.Status === 3) return "nxdomain";
  if (response.Status === 2) return "servfail";
  if (response.Status !== 0 || (response.Answer !== undefined && (!Array.isArray(response.Answer) || response.Answer.some((answer) => !answer || typeof answer.type !== "number" || typeof answer.data !== "string")))) return "temporary-error";
  return null;
}

/** RFC 7505 null MX is exactly a single `0 .`; missing MX is NOT null MX.
 * RFC 5321 address fallback is possible only after a successful empty MX query.
 * DNS can establish a possible route, never the existence of a mailbox.
 */
export function parseMailDns(mx: DnsResponse, a?: DnsResponse, aaaa?: DnsResponse): MailDnsResult {
  const result = (kind: MailDnsKind, hosts: string[] = []): MailDnsResult => ({ kind, hosts });
  const failure = dnsFailure(mx);
  if (failure) return result(failure);
  const records = (mx.Answer ?? []).filter((answer) => answer.type === 15);
  if (records.length === 1 && typeof records[0].data === "string" && /^0\s+\.$/.test(records[0].data.trim())) return result("null-mx");
  const parsed = records.map((answer) => {
    const match = typeof answer.data === "string" ? answer.data.trim().match(/^(\d+)\s+(\S+)$/) : null;
    if (!match || Number(match[1]) > 65535) return null;
    const host = match[2].replace(/\.$/, "").toLowerCase();
    return validDomain(host) ? { priority: Number(match[1]), host } : null;
  });
  if (parsed.some((record) => record === null)) return result("temporary-error");
  if (parsed.length) {
    const hosts = parsed.filter((record) => record !== null).sort((x, y) => x.priority - y.priority).map((record) => record.host);
    return result("mx", [...new Set(hosts)]);
  }
  const hasAddress = (response: DnsResponse | undefined, type: number): boolean => Boolean(response && !dnsFailure(response) && (response.Answer ?? []).some((answer) => answer.type === type));
  // Either address family can establish an implicit route independently.
  // An unavailable second family must not discard a known successful answer.
  if (hasAddress(a, 1) || hasAddress(aaaa, 28)) return result("fallback");
  if (!a || !aaaa) return result("needs-address");
  for (const response of [a, aaaa]) {
    const error = dnsFailure(response);
    if (error) return result(error);
  }
  return result("no-route");
}

/** This boundary accepts a domain, never a complete email address or local part. */
export async function lookupEmailDomain(domain: string, fetcher: typeof fetch = fetch): Promise<MailDnsResult> {
  if (!validDomain(domain)) throw new Error("A valid domain is required");
  const query = async (type: "MX" | "A" | "AAAA"): Promise<DnsResponse> => {
    const response = await fetcher(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`);
    if (!response.ok) throw new Error(`DNS HTTP ${response.status}`);
    const data: unknown = await response.json();
    return data && typeof data === "object" ? data as DnsResponse : {};
  };
  const mx = await query("MX");
  const initial = parseMailDns(mx);
  if (initial.kind !== "needs-address") return initial;
  const addresses = await Promise.allSettled([query("A"), query("AAAA")]);
  const [a, aaaa] = addresses.map((response) => response.status === "fulfilled" ? response.value : {});
  const result = parseMailDns(mx, a, aaaa);
  if (result.kind === "fallback") return result;
  // With no known route, preserve transport errors for the UI's retry state.
  const failed = addresses.find((response) => response.status === "rejected");
  if (failed?.status === "rejected") throw failed.reason;
  return result;
}
