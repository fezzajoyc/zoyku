import { formatJsonLossless, parseJsonLossless, type JsonLosslessNode } from "./json-format";

/** Counts UTF-16 code units, including any surrounding whitespace. */
export const JWT_INPUT_LIMIT = 1_000_000;
const CLAIMS = ["exp", "iat", "nbf"] as const;
type ClaimKey = typeof CLAIMS[number];

function decodePart(part: string): string {
  if (!/^[A-Za-z0-9_-]+$/.test(part) || part.length % 4 === 1) throw new Error("base64url");
  const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64 + "=".repeat((4 - base64.length % 4) % 4));
  return new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
}

function objectPart(source: string): Extract<JsonLosslessNode, { kind: "object" }> {
  const node = parseJsonLossless(source, true);
  if (node.kind !== "object") throw new Error("object");
  const keys = new Set<string>();
  for (const member of node.members) {
    if (keys.has(member.sortKey)) throw new Error("duplicate");
    keys.add(member.sortKey);
  }
  return node;
}

/** Inspection only: this deliberately makes no cryptographic/trust decision. */
export function decodeJwt(input: string) {
  if (input.length > JWT_INPUT_LIMIT) throw new Error("input-limit");
  const parts = input.trim().split(".");
  if (parts.length < 2 || parts.length > 3 || (parts[2] !== undefined && !/^[A-Za-z0-9_-]*$/.test(parts[2]))) throw new Error("shape");
  const header = decodePart(parts[0]);
  const payload = decodePart(parts[1]);
  objectPart(header);
  const parsed = objectPart(payload);
  const claims: { key: ClaimKey; raw: string }[] = [];
  for (const key of CLAIMS) {
    const value = parsed.members.find((member) => member.sortKey === key)?.value;
    if (value) claims.push({ key, raw: value.kind === "literal" ? value.raw : value.kind === "array" ? "[]" : "{}" });
  }
  return {
    headerText: formatJsonLossless(header),
    payloadText: formatJsonLossless(payload),
    signature: parts[2] ?? null,
    claims,
  };
}

/** Date rendering is bounded independently from lossless JSON inspection. */
function decimalSignature(raw: string): string | null {
  const match = /^(-?)(0|[1-9]\d*)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(raw);
  if (!match) return null;
  const fraction = match[3] ?? "";
  const digits = (match[2] + fraction).replace(/^0+/, "");
  if (!digits) return "0";
  const coefficient = digits.replace(/0+$/, "");
  const exponent = Number(match[4] ?? "0") - fraction.length + digits.length - coefficient.length;
  return Number.isSafeInteger(exponent) ? `${match[1]}${coefficient}e${exponent}` : null;
}

export function jwtTimeClaim(raw: string, nowSeconds: number): { date: Date | null; expired: boolean; issue: "type" | "range" | null } {
  if (!/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(raw)) return { date: null, expired: false, issue: "type" };
  const seconds = Number(raw);
  // Refuse a time annotation when Number would silently change the decimal
  // value, particularly just beyond exp or the Date range boundary.
  const decimal = decimalSignature(raw);
  if (!Number.isFinite(seconds) || Math.abs(seconds) > 8.64e12 || decimal === null || decimal !== decimalSignature(String(seconds))) return { date: null, expired: false, issue: "range" };
  const date = new Date(seconds * 1000);
  if (!Number.isFinite(date.getTime())) return { date: null, expired: false, issue: "range" };
  return { date, expired: seconds <= nowSeconds, issue: null };
}
