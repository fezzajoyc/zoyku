/** RFC 4648 standard Base32/Base64 and Bitcoin raw Base58; no Base58Check. */
export const BYTE_ENCODINGS = ["utf8", "hex", "base32", "base58", "base64"] as const;
export type ByteEncoding = typeof BYTE_ENCODINGS[number];
export const BYTE_ENCODING_LIMITS = Object.freeze({ bytes: 65_536, base58Bytes: 1_024, inputCharacters: 262_144 });
export type ByteEncodingError = "input-type" | "encoding" | "options" | "format" | "invalid-text" | "invalid-utf8" | "limit" | "base58-limit";
export type ByteEncodingFailure = { ok: false; error: ByteEncodingError };
export type DecodedBytes = { ok: true; bytes: Uint8Array<ArrayBuffer> } | ByteEncodingFailure;
export type EncodedBytes = { ok: true; output: string; byteLength: number } | ByteEncodingFailure;
export type ByteEncodingOptions = { ignoreAsciiWhitespace?: boolean };
const fail = (error: ByteEncodingError): ByteEncodingFailure => ({ ok: false, error });
const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const validEncoding = (encoding: unknown): encoding is ByteEncoding => BYTE_ENCODINGS.includes(encoding as ByteEncoding);

function encodeBits(bytes: Uint8Array, alphabet: string, width: number, group: number): string {
  let output = "", buffer = 0, bits = 0;
  for (const byte of bytes) {
    buffer = (buffer << 8) | byte; bits += 8;
    while (bits >= width) { bits -= width; output += alphabet[(buffer >>> bits) & ((1 << width) - 1)]; }
    buffer &= (1 << bits) - 1;
  }
  if (bits) output += alphabet[(buffer << (width - bits)) & ((1 << width) - 1)];
  return output.padEnd(Math.ceil(output.length / group) * group, "=");
}
function decodeBits(text: string, alphabet: string, width: number, group: number): DecodedBytes {
  if (text.length % group !== 0 || !/^[A-Za-z0-9+/]*={0,6}$/.test(text)) return fail("format");
  const body = text.replace(/=+$/, "");
  const byteLength = Math.floor(body.length * width / 8);
  if (byteLength > BYTE_ENCODING_LIMITS.bytes) return fail("limit");
  const bytes = new Uint8Array(byteLength);
  let buffer = 0, bits = 0, offset = 0;
  for (const char of body) {
    const digit = alphabet.indexOf(char);
    if (digit < 0) return fail("format");
    buffer = (buffer << width) | digit; bits += width;
    if (bits >= 8) { bits -= 8; bytes[offset++] = (buffer >>> bits) & 255; }
    buffer &= (1 << bits) - 1;
  }
  if (buffer !== 0 || encodeBits(bytes, alphabet, width, group) !== text) return fail("format");
  return { ok: true, bytes };
}
function encode58(bytes: Uint8Array): string {
  let zeros = 0;
  while (zeros < bytes.length && bytes[zeros] === 0) zeros++;
  let integer = 0n;
  for (const byte of bytes.subarray(zeros)) integer = (integer << 8n) | BigInt(byte);
  let output = "";
  while (integer > 0n) { output = B58[Number(integer % 58n)] + output; integer /= 58n; }
  return "1".repeat(zeros) + output;
}
function decode58(text: string): DecodedBytes {
  // The largest encoding of 1,024 bytes is 1,399 characters; bound before BigInt work.
  if (text.length > 1_400) return fail("base58-limit");
  let zeros = 0;
  while (zeros < text.length && text[zeros] === "1") zeros++;
  if (zeros > BYTE_ENCODING_LIMITS.base58Bytes) return fail("base58-limit");
  let integer = 0n;
  const max = 1n << BigInt((BYTE_ENCODING_LIMITS.base58Bytes - zeros) * 8);
  for (const char of text.slice(zeros)) {
    const digit = B58.indexOf(char);
    if (digit < 0) return fail("format");
    integer = integer * 58n + BigInt(digit);
    if (integer >= max) return fail("base58-limit");
  }
  const tail: number[] = [];
  while (integer > 0n) { tail.push(Number(integer & 255n)); integer >>= 8n; }
  tail.reverse();
  const bytes = new Uint8Array(zeros + tail.length); bytes.set(tail, zeros);
  return { ok: true, bytes };
}

/** Decode only the selected representation. Encoded whitespace is strict unless explicitly ignored. */
export function decodeByteEncoding(input: unknown, encoding: ByteEncoding, options: ByteEncodingOptions = {}): DecodedBytes {
  if (typeof input !== "string") return fail("input-type");
  if (!validEncoding(encoding)) return fail("encoding");
  if (!options || typeof options !== "object" || Array.isArray(options) || (options.ignoreAsciiWhitespace !== undefined && typeof options.ignoreAsciiWhitespace !== "boolean")) return fail("options");
  if (input.length > BYTE_ENCODING_LIMITS.inputCharacters) return fail("limit");
  if (encoding === "utf8") {
    // TextEncoder otherwise replaces unpaired UTF-16 surrogates with U+FFFD.
    for (const char of input) { const cp = char.codePointAt(0)!; if (cp >= 0xd800 && cp <= 0xdfff) return fail("invalid-text"); }
    const bytes = new TextEncoder().encode(input);
    return bytes.length > BYTE_ENCODING_LIMITS.bytes ? fail("limit") : { ok: true, bytes };
  }
  const text = options.ignoreAsciiWhitespace ? input.replace(/[\x09-\x0d\x20]/g, "") : input;
  if (encoding === "hex") {
    if (!/^(?:[\da-fA-F]{2})*$/.test(text)) return fail("format");
    if (text.length / 2 > BYTE_ENCODING_LIMITS.bytes) return fail("limit");
    return { ok: true, bytes: Uint8Array.from(text.match(/../g) ?? [], byte => parseInt(byte, 16)) };
  }
  if (encoding === "base58") return decode58(text);
  return encoding === "base32" ? decodeBits(text, B32, 5, 8) : decodeBits(text, B64, 6, 4);
}

/** Encode existing bytes; UTF-8 requires valid bytes and preserves a BOM as U+FEFF. */
export function encodeByteEncoding(bytes: Uint8Array, encoding: ByteEncoding): EncodedBytes {
  if (!(bytes instanceof Uint8Array)) return fail("input-type");
  if (!validEncoding(encoding)) return fail("encoding");
  if (bytes.length > BYTE_ENCODING_LIMITS.bytes) return fail("limit");
  if (encoding === "base58" && bytes.length > BYTE_ENCODING_LIMITS.base58Bytes) return fail("base58-limit");
  let output: string;
  if (encoding === "utf8") {
    try { output = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes); }
    catch { return fail("invalid-utf8"); }
  } else if (encoding === "hex") output = Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
  else if (encoding === "base58") output = encode58(bytes);
  else output = encoding === "base32" ? encodeBits(bytes, B32, 5, 8) : encodeBits(bytes, B64, 6, 4);
  return { ok: true, output, byteLength: bytes.length };
}
export function convertByteEncoding(input: unknown, from: ByteEncoding, to: ByteEncoding, options: ByteEncodingOptions = {}): EncodedBytes {
  const result = decodeByteEncoding(input, from, options);
  return result.ok ? encodeByteEncoding(result.bytes, to) : result;
}
