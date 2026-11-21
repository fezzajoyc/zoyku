import { describe, expect, it } from "vitest";
import { identifyFileSignature, signatureBytesFromHex, FILE_SIGNATURE_READ_LIMIT } from "@/tools/_lib/file-signature";

const hex = (s: string) => Uint8Array.from(s.match(/../g) ?? [], byte => parseInt(byte, 16));
const ascii = (s: string) => new TextEncoder().encode(s);

describe("file signature inspection", () => {
  it.each([
    ["89504e470d0a1a0a", "png"], ["ffd8ff", "jpeg"],
    ["474946383761", "gif"], ["474946383961", "gif"],
    ["255044462d312e37", "pdf"], ["504b0304", "zip"],
    ["504b0506", "zip"], ["504b0708", "zip"],
    ["1f8b08", "gzip"], ["377abcaf271c", "7z"],
    ["526172211a0700", "rar"], ["526172211a070100", "rar"],
    ["425a6831", "bzip2"], ["fd377a585a00", "xz"],
    ["49492a00", "tiff"], ["4d4d002a", "tiff"],
    ["424d", "bmp"], ["00000100", "ico"],
    ["4f67675300", "ogg"], ["664c6143", "flac"],
    ["774f4646", "woff"], ["774f4632", "woff2"],
    ["0061736d01000000", "wasm"], ["d0cf11e0a1b11ae1", "ole"],
  ])("recognizes published magic bytes %s as %s", (bytes, id) => {
    expect(identifyFileSignature(hex(bytes))?.id).toBe(id);
  });

  it("checks RIFF subtype instead of confusing WebP, WAVE and AVI", () => {
    for (const [brand, id] of [["WEBP", "webp"], ["WAVE", "wav"], ["AVI ", "avi"]]) {
      expect(identifyFileSignature(ascii("RIFF\0\0\0\0" + brand + (brand === "WEBP" ? "VP" : "")))?.id).toBe(id);
    }
    expect(identifyFileSignature(ascii("RIFF\0\0\0\0NOPE"))).toBeNull();
    expect(identifyFileSignature(ascii("RIFF\0\0\0\0WEBP"))).toBeNull();
    expect(identifyFileSignature(ascii("RIFF\0\0\0\0WEBPNOPE"))).toBeNull();
  });

  it("keeps ZIP and OLE generic instead of guessing Office file types", () => {
    expect(identifyFileSignature(hex("504b0304"))).toMatchObject({ id: "zip", container: true });
    expect(identifyFileSignature(hex("d0cf11e0a1b11ae1"))).toMatchObject({ id: "ole", container: true });
  });

  it("reads the tar marker at offset 257 and rejects a marker at the wrong offset", () => {
    const bytes = new Uint8Array(512);
    bytes.set(ascii("ustar\0"), 257);
    expect(identifyFileSignature(bytes)?.id).toBe("tar");
    expect(identifyFileSignature(ascii("ustar\0"))).toBeNull();
  });

  it("uses ISO BMFF major brands and distinguishes unknown containers", () => {
    for (const [brand, id] of [["avif", "avif"], ["heic", "heif"], ["mp42", "mp4"], ["zzzz", "isobmff"]]) {
      const bytes = hex("0000001066747970" + [...ascii(brand)].map(b => b.toString(16).padStart(2, "0")).join("") + "00000000");
      expect(identifyFileSignature(bytes)?.id).toBe(id);
    }
    expect(identifyFileSignature(hex("0000000866747970"))).toBeNull();
    expect(identifyFileSignature(hex("00000011667479706d70343200000000"))).toBeNull();
    expect(identifyFileSignature(hex("00000018667479706d70343200000000"))).toBeNull();
    expect(identifyFileSignature(hex("00000014667479707a7a7a7a000000006d703432"))?.id).toBe("mp4");
  });

  it("recognizes SQLite and treats text, empty or partial signatures as unknown", () => {
    expect(identifyFileSignature(ascii("SQLite format 3\0"))?.id).toBe("sqlite");
    for (const bytes of [new Uint8Array(), ascii('{"file":"photo.png"}'), hex("89504e470d0a1a"), ascii("BZh0")]) {
      expect(identifyFileSignature(bytes)).toBeNull();
    }
  });

  it("parses bounded hexadecimal prefixes, rejecting malformed or oversized bytes", () => {
    expect(signatureBytesFromHex("89 50\n4e 47")).toEqual(hex("89504e47"));
    expect(FILE_SIGNATURE_READ_LIMIT).toBe(65536);
    for (const text of ["G0", "abc", "0x89", "00".repeat(FILE_SIGNATURE_READ_LIMIT + 1)]) {
      expect(() => signatureBytesFromHex(text)).toThrow();
    }
  });
});
