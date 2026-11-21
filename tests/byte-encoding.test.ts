import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { BYTE_ENCODING_LIMITS, convertByteEncoding, decodeByteEncoding, encodeByteEncoding, type ByteEncoding } from "@/tools/_lib/byte-encoding";

// RFC 4648 §10, fetched https://www.rfc-editor.org/rfc/rfc4648.txt (2026-11-22).
const RFC = [
  ["", "", ""], ["f", "MY======", "Zg=="], ["fo", "MZXQ====", "Zm8="],
  ["foo", "MZXW6===", "Zm9v"], ["foob", "MZXW6YQ=", "Zm9vYg=="],
  ["fooba", "MZXW6YTB", "Zm9vYmE="], ["foobar", "MZXW6YTBOI======", "Zm9vYmFy"],
] as const;
// Bitcoin Core src/test/data/base58_encode_decode.json (official repository, 2026-11-22).
const BITCOIN = [
  ["", ""], ["61", "2g"], ["626262", "a3gV"], ["636363", "aPEr"],
  ["73696d706c792061206c6f6e6720737472696e67", "2cFupjhnEsSn59qHXstmK2ffpLv2"],
  ["00eb15231dfceb60925886b67d065299925915aeb172c06647", "1NS17iag9jJgTHD1VXjvLCEnZuQ3rJDE9L"],
  ["516b6fcd0f", "ABnLTmg"], ["bf4f89001e670274dd", "3SEo3LWLoPntC"],
  ["00000000000000000000", "1111111111"],
  ["000111d38e5fc9071ffcd20b4a763cc9ae4f252bb4e48fd66a835e252ada93ff480d6dd43dc62a641155a5", "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"],
  ["271F359E", "zzzzy"], ["271F359F", "zzzzz"], ["271F35A0", "211111"],
] as const;
const FORMATS: ByteEncoding[] = ["utf8", "hex", "base32", "base58", "base64"];
const converted = (input: string, from: ByteEncoding, to: ByteEncoding) => {
  const result = convertByteEncoding(input, from, to);
  if (!result.ok) throw Error(result.error);
  return result;
};

describe("byte codecs use independent standard vectors", () => {
  it.each(RFC)("matches RFC 4648 Base32/Base64 for %j", (text, base32, base64) => {
    expect(converted(text, "utf8", "base32").output).toBe(base32);
    expect(converted(base32, "base32", "utf8").output).toBe(text);
    expect(converted(text, "utf8", "base64").output).toBe(base64);
    expect(converted(base64, "base64", "utf8").output).toBe(text);
  });
  it.each(BITCOIN)("matches Bitcoin Base58 %s → %s without checksums", (hex, base58) => {
    expect(converted(hex, "hex", "base58").output).toBe(base58);
    expect(converted(base58, "base58", "hex").output).toBe(hex.toLowerCase());
  });
  it("retains every leading zero byte rather than treating the value as a number", () => {
    for (let zeros = 0; zeros < 12; zeros++) {
      const input = "00".repeat(zeros) + "01";
      expect(converted(input, "hex", "base58").output).toBe("1".repeat(zeros) + "2");
      expect(converted("1".repeat(zeros) + "2", "base58", "hex").output).toBe(input);
    }
    expect(converted("0000", "hex", "base58")).toMatchObject({ output: "11", byteLength: 2 });
  });
  it("round-trips deterministic random bytes and checks independent Node HEX/Base64", () => {
    for (const size of [0, 1, 2, 3, 4, 5, 31, 32, 63, 255, 1024]) {
      const data = Uint8Array.from({ length: size }, (_, i) => createHash("sha256").update(`${size}:${i}`).digest()[0]);
      for (const format of FORMATS.filter(value => value !== "utf8")) {
        const encoded = encodeByteEncoding(data, format); expect(encoded.ok).toBe(true); if (!encoded.ok) continue;
        const decoded = decodeByteEncoding(encoded.output, format); expect(decoded.ok).toBe(true);
        if (decoded.ok) expect(decoded.bytes).toEqual(data);
        if (format === "base64") expect(encoded.output).toBe(Buffer.from(data).toString("base64"));
        if (format === "hex") expect(encoded.output).toBe(Buffer.from(data).toString("hex"));
      }
    }
  });
});

describe("strict byte syntax and UTF-8 preserve actual data", () => {
  it("keeps UTF-8 Unicode, whitespace, null bytes and BOM without guessing other charsets", () => {
    const text = "\ufeff  中😀\n\u0000é\t";
    for (const format of FORMATS) {
      const encoded = converted(text, "utf8", format);
      expect(converted(encoded.output, format, "utf8").output).toBe(text);
    }
    expect(converted("FF00aB", "hex", "hex").output).toBe("ff00ab");
    expect(converted("", "hex", "base32")).toEqual({ ok: true, output: "", byteLength: 0 });
  });
  it.each(["ff", "c080", "eda080", "f4908080", "e282", "80"])("rejects malformed UTF-8 %s without replacement characters", hex => {
    expect(convertByteEncoding(hex, "hex", "utf8")).toEqual({ ok: false, error: "invalid-utf8" });
  });
  it.each(["\ud800", "\udc00", "a\ud800b"])("rejects unpaired UTF-16 input %j before replacement", text => {
    expect(decodeByteEncoding(text, "utf8")).toEqual({ ok: false, error: "invalid-text" });
  });
  it.each(["MZ======", "MZXR====", "MZXW7===", "MZXW6YR=", "MY", "MY=====", "my======", "M1======", "M=Y=====", "MY======A", "MZXW6YTBOJ======"])("rejects noncanonical Base32 %s", input => {
    expect(decodeByteEncoding(input, "base32")).toEqual({ ok: false, error: "format" });
  });
  it.each(["Zh==", "Zm9=", "Zg", "Zg=", "Zg===", "Zm=v", "Zg==A", "_w==", "-w==", "A==="])("rejects noncanonical Base64 %s", input => {
    expect(decodeByteEncoding(input, "base64")).toEqual({ ok: false, error: "format" });
  });
  it.each(["0", "O", "I", "l", "2g=", "2g\u00a0", "😀"])("rejects characters outside the Bitcoin Base58 alphabet %j", input => {
    expect(decodeByteEncoding(input, "base58")).toEqual({ ok: false, error: "format" });
  });
  it.each(["f", "0x12", "GG", "ff_ff"])("rejects malformed HEX %j", input => expect(decodeByteEncoding(input, "hex")).toEqual({ ok: false, error: "format" }));
  it("ignores only explicit ASCII whitespace in encoded inputs, never UTF-8 source text", () => {
    for (const [input, from, hex] of [[" 66\t6f\r\n", "hex", "666f"], [" MZ\vXQ\f====\n", "base32", "666f"], [" Zm\t8=\r\n", "base64", "666f"], [" 2\ng ", "base58", "61"]] as const) {
      expect(decodeByteEncoding(input, from)).toEqual({ ok: false, error: "format" });
      const result = convertByteEncoding(input, from, "hex", { ignoreAsciiWhitespace: true });
      expect(result).toMatchObject({ ok: true, output: hex });
    }
    expect(convertByteEncoding(" a\t\n", "utf8", "hex", { ignoreAsciiWhitespace: true })).toMatchObject({ ok: true, output: "2061090a" });
    expect(decodeByteEncoding("66\u00a06f", "hex", { ignoreAsciiWhitespace: true })).toEqual({ ok: false, error: "format" });
  });
});

describe("codec resources and malformed API calls are bounded", () => {
  it("supports 65,536 bytes for linear codecs and exactly 1,024 bytes for Base58", () => {
    const bytes = Uint8Array.from({ length: 65_536 }, (_, i) => i % 256);
    for (const format of ["hex", "base32", "base64"] as const) {
      const encoded = encodeByteEncoding(bytes, format); expect(encoded.ok).toBe(true); if (!encoded.ok) continue;
      const decoded = decodeByteEncoding(encoded.output, format); expect(decoded.ok).toBe(true);
      if (decoded.ok) expect(Buffer.compare(Buffer.from(decoded.bytes), Buffer.from(bytes))).toBe(0);
    }
    expect(encodeByteEncoding(new Uint8Array(65_537), "hex")).toEqual({ ok: false, error: "limit" });
    expect(encodeByteEncoding(new Uint8Array(1_025), "base58")).toEqual({ ok: false, error: "base58-limit" });
    expect(decodeByteEncoding("1".repeat(1_024), "base58").ok).toBe(true);
    expect(decodeByteEncoding("1".repeat(1_025), "base58")).toEqual({ ok: false, error: "base58-limit" });
    expect(decodeByteEncoding("z".repeat(1_400), "base58")).toEqual({ ok: false, error: "base58-limit" });
    expect(decodeByteEncoding("41".repeat(65_537), "hex")).toEqual({ ok: false, error: "limit" });
    expect(decodeByteEncoding("😀".repeat(16_385), "utf8")).toEqual({ ok: false, error: "limit" });
    expect(BYTE_ENCODING_LIMITS).toMatchObject({ bytes: 65_536, base58Bytes: 1_024, inputCharacters: 262_144 });
  });
  it("rejects oversized raw input before whitespace stripping", () => {
    expect(decodeByteEncoding(" ".repeat(262_145), "base64", { ignoreAsciiWhitespace: true })).toEqual({ ok: false, error: "limit" });
    expect(decodeByteEncoding(" ".repeat(262_144), "base64", { ignoreAsciiWhitespace: true })).toMatchObject({ ok: true, bytes: new Uint8Array() });
  });
  it.each([null, undefined, 4, true, {}, []])("rejects nontext input %j", input => expect(decodeByteEncoding(input, "hex")).toEqual({ ok: false, error: "input-type" }));
  it("rejects unsupported modes/options and non-byte sources without throwing", () => {
    expect(decodeByteEncoding("f", "wat" as ByteEncoding)).toEqual({ ok: false, error: "encoding" });
    expect(encodeByteEncoding(new Uint8Array(), "wat" as ByteEncoding)).toEqual({ ok: false, error: "encoding" });
    expect(decodeByteEncoding("", "hex", null as never)).toEqual({ ok: false, error: "options" });
    expect(decodeByteEncoding("", "hex", { ignoreAsciiWhitespace: "yes" } as never)).toEqual({ ok: false, error: "options" });
    expect(encodeByteEncoding([1, 2] as never, "hex")).toEqual({ ok: false, error: "input-type" });
  });
});
