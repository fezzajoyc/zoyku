/**
 * IPv4 subnet calculations with unsigned (>>>) arithmetic only,
 * so every intermediate value stays in the 0..2^32-1 range.
 * An IPv4 address is represented as a uint32 number.
 */

export type SubnetInfo = {
  network: number;
  broadcast: number;
  mask: number;
  wildcard: number;
  prefix: number;
  /** total addresses including network+broadcast */
  totalHosts: number;
  /** usable host count (prefix >= 31 → totalHosts) */
  usableHosts: number;
  firstHost: number;
  lastHost: number;
  ipClass: "A" | "B" | "C" | "D" | "E";
  isPrivate: boolean;
};

export function ipToInt(ip: string): number | null {
  const m = ip.trim().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!m) return null;
  let v = 0;
  for (let i = 1; i <= 4; i++) {
    const o = Number(m[i]);
    if (o > 255) return null;
    v = (v * 256 + o) >>> 0;
  }
  return v;
}

export function intToIp(v: number): string {
  return [(v >>> 24) & 255, (v >>> 16) & 255, (v >>> 8) & 255, v & 255].join(".");
}

export function parseCidr(input: string): { ip: number; prefix: number } | null {
  const t = input.trim();
  const slash = t.indexOf("/");
  const ipPart = slash === -1 ? t : t.slice(0, slash);
  const ip = ipToInt(ipPart);
  if (ip === null) return null;
  if (slash === -1) return { ip, prefix: 32 };
  const p = t.slice(slash + 1);
  if (!/^\d{1,2}$/.test(p)) return null;
  const prefix = Number(p);
  if (prefix > 32) return null;
  return { ip, prefix };
}

export function maskOf(prefix: number): number {
  return prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
}

export function isPrivateIp(v: number): boolean {
  const inRange = (cidr: string) => {
    const parsed = parseCidr(cidr);
    if (!parsed) return false;
    const m = maskOf(parsed.prefix);
    return ((v & m) >>> 0) === ((parsed.ip & m) >>> 0);
  };
  return (
    inRange("10.0.0.0/8") ||
    inRange("172.16.0.0/12") ||
    inRange("192.168.0.0/16") ||
    inRange("127.0.0.0/8") ||
    inRange("169.254.0.0/16") ||
    inRange("100.64.0.0/10")
  );
}

export function ipClass(v: number): "A" | "B" | "C" | "D" | "E" {
  const b1 = (v >>> 24) & 255;
  if (b1 < 128) return "A";
  if (b1 < 192) return "B";
  if (b1 < 224) return "C";
  if (b1 < 240) return "D";
  return "E";
}

export function subnetInfo(ip: number, prefix: number): SubnetInfo {
  const p = Math.min(32, Math.max(0, prefix));
  const mask = maskOf(p);
  const network = (ip & mask) >>> 0;
  const wildcard = (~mask) >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  const totalHosts = p === 0 ? 4294967296 : Math.pow(2, 32 - p);
  const usableHosts = p >= 31 ? totalHosts : totalHosts - 2;
  const firstHost = p >= 31 ? network : (network + 1) >>> 0;
  const lastHost = p >= 31 ? broadcast : (broadcast - 1) >>> 0;
  return {
    network,
    broadcast,
    mask,
    wildcard,
    prefix: p,
    totalHosts,
    usableHosts,
    firstHost,
    lastHost,
    ipClass: ipClass(ip),
    isPrivate: isPrivateIp(ip),
  };
}

/** Minimal covering CIDR for two IPv4 addresses. */
export function smallestCidr(a: number, b: number): { network: number; prefix: number } {
  const lo = Math.min(a, b) >>> 0;
  const hi = Math.max(a, b) >>> 0;
  const xor = (lo ^ hi) >>> 0;
  let prefix = 32;
  while (prefix > 0 && ((maskOf(prefix) & xor) >>> 0) !== 0) prefix -= 1;
  const mask = maskOf(prefix);
  return { network: (lo & mask) >>> 0, prefix };
}
