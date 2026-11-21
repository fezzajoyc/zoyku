/** Inspect a bounded header. A signature match does not validate a whole file. */
export const FILE_SIGNATURE_READ_LIMIT = 65_536;

export type FileSignature = {
  id: string;
  name: string;
  mime: string;
  extensions: string[];
  container: boolean;
  offsets: number[];
};

type Rule = FileSignature & { bytes: number[] };
const rule = (id: string, name: string, mime: string, extensions: string[], bytes: number[], container = false): Rule =>
  ({ id, name, mime, extensions, bytes, container, offsets: [0] });
const ascii = (text: string) => Array.from(text, char => char.charCodeAt(0));
const matches = (bytes: Uint8Array, signature: number[], offset = 0) =>
  bytes.length >= offset + signature.length && signature.every((value, index) => bytes[offset + index] === value);
const result = (signature: Rule): FileSignature => ({
  id: signature.id, name: signature.name, mime: signature.mime,
  extensions: signature.extensions, container: signature.container, offsets: signature.offsets,
});

const RULES: Rule[] = [
  rule("png", "PNG", "image/png", ["png"], [0x89, 80, 78, 71, 13, 10, 26, 10]),
  rule("jpeg", "JPEG", "image/jpeg", ["jpg", "jpeg"], [255, 216, 255]),
  rule("gif", "GIF", "image/gif", ["gif"], ascii("GIF87a")),
  rule("gif", "GIF", "image/gif", ["gif"], ascii("GIF89a")),
  rule("pdf", "PDF", "application/pdf", ["pdf"], ascii("%PDF-")),
  rule("zip", "ZIP container", "application/zip", ["zip"], [80, 75, 3, 4], true),
  rule("zip", "ZIP container", "application/zip", ["zip"], [80, 75, 5, 6], true),
  rule("zip", "ZIP container", "application/zip", ["zip"], [80, 75, 7, 8], true),
  rule("gzip", "GZIP", "application/gzip", ["gz"], [31, 139, 8], true),
  rule("7z", "7-Zip", "application/x-7z-compressed", ["7z"], [55, 122, 188, 175, 39, 28], true),
  rule("rar", "RAR", "application/vnd.rar", ["rar"], [82, 97, 114, 33, 26, 7, 0], true),
  rule("rar", "RAR", "application/vnd.rar", ["rar"], [82, 97, 114, 33, 26, 7, 1, 0], true),
  rule("xz", "XZ", "application/x-xz", ["xz"], [253, 55, 122, 88, 90, 0], true),
  rule("tiff", "TIFF", "image/tiff", ["tif", "tiff"], [73, 73, 42, 0]),
  rule("tiff", "TIFF", "image/tiff", ["tif", "tiff"], [77, 77, 0, 42]),
  rule("bmp", "BMP", "image/bmp", ["bmp"], ascii("BM")),
  rule("ico", "ICO", "image/vnd.microsoft.icon", ["ico"], [0, 0, 1, 0]),
  rule("ogg", "Ogg container", "application/ogg", ["ogg", "oga", "ogv"], [79, 103, 103, 83, 0], true),
  rule("flac", "FLAC", "audio/flac", ["flac"], ascii("fLaC")),
  rule("sqlite", "SQLite 3", "application/vnd.sqlite3", ["sqlite", "sqlite3", "db"], ascii("SQLite format 3\0")),
  rule("woff", "WOFF", "font/woff", ["woff"], ascii("wOFF")),
  rule("woff2", "WOFF2", "font/woff2", ["woff2"], ascii("wOF2")),
  rule("wasm", "WebAssembly 1", "application/wasm", ["wasm"], [0, 97, 115, 109, 1, 0, 0, 0]),
  rule("ole", "OLE Compound File container", "application/x-ole-storage", [], [208, 207, 17, 224, 161, 177, 26, 225], true),
];

export function identifyFileSignature(input: Uint8Array): FileSignature | null {
  const bytes = input.subarray(0, FILE_SIGNATURE_READ_LIMIT);
  for (const signature of RULES) if (matches(bytes, signature.bytes)) return result(signature);
  if (matches(bytes, ascii("BZh")) && bytes.length >= 4 && bytes[3] >= 49 && bytes[3] <= 57) {
    return result(rule("bzip2", "BZIP2", "application/x-bzip2", ["bz2"], [], true));
  }
  if (matches(bytes, ascii("RIFF")) && bytes.length >= 12) {
    for (const [brand, id, name, mime, extensions] of [
      ["WEBP", "webp", "WebP", "image/webp", ["webp"]],
      ["WAVE", "wav", "WAVE", "audio/wav", ["wav"]],
      ["AVI ", "avi", "AVI container", "video/x-msvideo", ["avi"]],
    ] as const) {
      if (matches(bytes, ascii(brand), 8) && (id !== "webp" || matches(bytes, ascii("WEBPVP"), 8))) {
        return { id, name, mime, extensions: [...extensions], container: id === "avi", offsets: [0, 8] };
      }
    }
  }
  if (bytes.length >= 263 && matches(bytes, ascii("ustar"), 257) && [0, 32].includes(bytes[262])) {
    return { id: "tar", name: "TAR archive", mime: "application/x-tar", extensions: ["tar"], container: true, offsets: [257] };
  }
  if (bytes.length >= 16 && matches(bytes, ascii("ftyp"), 4)) {
    const boxSize = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(0);
    if (boxSize >= 16 && boxSize % 4 === 0 && boxSize <= bytes.length) {
      const brands = [String.fromCharCode(...bytes.subarray(8, 12))];
      for (let offset = 16; offset < boxSize; offset += 4) {
        brands.push(String.fromCharCode(...bytes.subarray(offset, offset + 4)));
      }
      const kind = brands.some(brand => ["avif", "avis"].includes(brand)) ? ["avif", "AVIF", "image/avif", ["avif"]] as const
        : brands.some(brand => ["heic", "heix", "hevc", "hevx"].includes(brand)) ? ["heif", "HEIF / HEIC", "image/heic", ["heic"]] as const
        : brands.some(brand => ["isom", "iso2", "mp41", "mp42", "avc1", "M4V ", "M4A "].includes(brand))
          ? ["mp4", "MPEG-4 container", "application/mp4", ["mp4", "m4a", "m4v"]] as const
          : ["isobmff", "ISO Base Media File container", "application/octet-stream", []] as const;
      return { id: kind[0], name: kind[1], mime: kind[2], extensions: [...kind[3]], container: true, offsets: [4, 8] };
    }
  }
  return null;
}

export function signatureBytesFromHex(input: string): Uint8Array {
  if (input.length > FILE_SIGNATURE_READ_LIMIT * 3) throw new RangeError("Hex input exceeds the 65,536-byte header limit.");
  const text = input.replace(/\s/g, "");
  if (text.length > FILE_SIGNATURE_READ_LIMIT * 2 || text.length % 2 || /[^\da-f]/i.test(text)) {
    throw new TypeError("Enter complete hexadecimal bytes separated by optional whitespace.");
  }
  return Uint8Array.from(text.match(/../g) ?? [], byte => parseInt(byte, 16));
}
