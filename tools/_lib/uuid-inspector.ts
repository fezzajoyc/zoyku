import { base64ToBytes, bytesToBase64 } from "./converters";

/** Demand: LDDGO-01-081; layout and special values: RFC 9562 §§4, 5.9, 5.10. */
export const UUID_INSPECTOR_INPUT_LIMIT = 128;
export type UuidVariant = "ncs" | "rfc" | "microsoft" | "future";
export type UuidInspectorError = "input-type" | "empty" | "too-long" | "format";
export type UuidInspection = {
  canonical: string; uppercase: string; raw: string; urn: string; braced: string;
  binary: string; base64: string; bytes: number[];
  /** Version bits are only interpreted for the RFC variant; special values have no version. */
  version: number | null; versionNibble: number; versionSupported: boolean;
  variant: UuidVariant; special: "nil" | "max" | null;
  /** Recognized RFC bit layout or NIL/MAX; does not prove algorithm, uniqueness or randomness. */
  isRfc9562: boolean;
};
export type UuidInspectionResult = { ok: true } & UuidInspection | { ok: false; error: UuidInspectorError };
const CANONICAL = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i;
const HEX = /^[\da-f]{32}$/i;
const BINARY = /^[01]{128}$/;
const BASE64 = /^[A-Za-z0-9+/]{22}==$/;

/** Strict textual representations, with one optional wrapper around canonical text only. */
export function inspectUuid(input: unknown): UuidInspectionResult {
  if (typeof input !== "string") return { ok: false, error: "input-type" };
  if (input.length > UUID_INSPECTOR_INPUT_LIMIT) return { ok: false, error: "too-long" };
  const value = input.trim();
  if (!value) return { ok: false, error: "empty" };
  let raw: string;
  if (CANONICAL.test(value)) raw = value.replaceAll("-", "");
  else if (HEX.test(value)) raw = value;
  else if (/^urn:uuid:/i.test(value) && CANONICAL.test(value.slice(9))) raw = value.slice(9).replaceAll("-", "");
  else if (value.startsWith("{") && value.endsWith("}") && CANONICAL.test(value.slice(1, -1))) raw = value.slice(1, -1).replaceAll("-", "");
  else if (BINARY.test(value)) raw = Array.from({ length: 16 }, (_, index) => parseInt(value.slice(index * 8, index * 8 + 8), 2).toString(16).padStart(2, "0")).join("");
  else if (BASE64.test(value)) {
    const decoded = base64ToBytes(value);
    // Canonical re-encoding rejects alternate encodings with nonzero padding bits.
    if (!decoded || decoded.length !== 16 || bytesToBase64(decoded) !== value) return { ok: false, error: "format" };
    raw = [...decoded].map(byte => byte.toString(16).padStart(2, "0")).join("");
  } else return { ok: false, error: "format" };
  raw = raw.toLowerCase();
  const bytes = Array.from({ length: 16 }, (_, index) => parseInt(raw.slice(index * 2, index * 2 + 2), 16));
  const canonical = `${raw.slice(0, 8)}-${raw.slice(8, 12)}-${raw.slice(12, 16)}-${raw.slice(16, 20)}-${raw.slice(20)}`;
  const variant: UuidVariant = (bytes[8] & 0x80) === 0 ? "ncs" : (bytes[8] & 0x40) === 0 ? "rfc" : (bytes[8] & 0x20) === 0 ? "microsoft" : "future";
  const special = bytes.every(byte => byte === 0) ? "nil" : bytes.every(byte => byte === 255) ? "max" : null;
  const versionNibble = bytes[6] >>> 4;
  const versionSupported = special === null && variant === "rfc" && versionNibble >= 1 && versionNibble <= 8;
  return {
    ok: true, canonical, uppercase: canonical.toUpperCase(), raw, urn: `urn:uuid:${canonical}`, braced: `{${canonical}}`,
    bytes, binary: bytes.map(byte => byte.toString(2).padStart(8, "0")).join(""), base64: bytesToBase64(new Uint8Array(bytes)),
    version: versionSupported ? versionNibble : null, versionNibble, versionSupported, variant, special,
    isRfc9562: special !== null || versionSupported,
  };
}
