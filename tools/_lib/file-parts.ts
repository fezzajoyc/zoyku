/** Raw bytes only. Evidence: LDDGO-10-018/019 in the saved official catalog. */
export const FILE_PARTS_LIMITS = Object.freeze({ bytes: 50 * 1024 * 1024, parts: 100, files: 100 });
export type FilePartsError = "input" | "size-limit" | "part-size" | "part-count" | "file-count";
export type FilePartRange = { index: number; start: number; end: number; size: number };
export type FilePartsPlan = { parts: FilePartRange[]; error: FilePartsError | null };
export type FileSplitOptions = { mode: "size"; partBytes: number } | { mode: "count"; partCount: number };

export function planFileSplit(size: number, options: FileSplitOptions): FilePartsPlan {
  if (!options || typeof options !== "object") return { error: "input", parts: [] };
  if (options.mode === "size") return planFileParts(size, options.partBytes);
  if (options.mode !== "count") return { error: "input", parts: [] };
  if (!Number.isSafeInteger(size) || size < 0) return { error: "input", parts: [] };
  if (size > FILE_PARTS_LIMITS.bytes) return { error: "size-limit", parts: [] };
  const count = options.partCount;
  if (!Number.isSafeInteger(count) || count < 1 || count > FILE_PARTS_LIMITS.parts || (size === 0 ? count !== 1 : count > size)) return { error: "part-count", parts: [] };
  const base = Math.floor(size / count), extra = size % count;
  let start = 0;
  return { error: null, parts: Array.from({ length: count }, (_, index) => {
    const length = base + (index < extra ? 1 : 0);
    const part = { index: index + 1, start, end: start + length, size: length };
    start += length;
    return part;
  }) };
}

/** Ranges use zero-based inclusive start/exclusive end. An empty file has one empty part. */
export function planFileParts(size: number, partBytes: number): FilePartsPlan {
  const fail = (error: FilePartsError): FilePartsPlan => ({ error, parts: [] });
  if (!Number.isSafeInteger(size) || size < 0) return fail("input");
  if (size > FILE_PARTS_LIMITS.bytes) return fail("size-limit");
  if (!Number.isSafeInteger(partBytes) || partBytes < 1 || partBytes > FILE_PARTS_LIMITS.bytes) return fail("part-size");
  const count = Math.max(1, Math.ceil(size / partBytes));
  if (count > FILE_PARTS_LIMITS.parts) return fail("part-count");
  return { error: null, parts: Array.from({ length: count }, (_, index) => {
    const start = index * partBytes;
    const end = Math.min(size, start + partBytes);
    return { index: index + 1, start, end, size: end - start };
  }) };
}

export function mergeFileBytes(parts: readonly Uint8Array[]): { bytes: Uint8Array | null; error: FilePartsError | null } {
  const fail = (error: FilePartsError) => ({ bytes: null, error });
  if (!Array.isArray(parts)) return fail("input");
  if (parts.length < 1 || parts.length > FILE_PARTS_LIMITS.files) return fail("file-count");
  let total = 0;
  try {
    for (const part of parts) {
      if (!(part instanceof Uint8Array)) return fail("input");
      // Reading a view on a detached ArrayBuffer throws instead of silently becoming empty.
      part.subarray(0, 0);
      total += part.byteLength;
      if (total > FILE_PARTS_LIMITS.bytes) return fail("size-limit");
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const part of parts) { bytes.set(part, offset); offset += part.byteLength; }
    return { bytes, error: null };
  } catch { return fail("input"); }
}

/** A filename, never a path. No escaping, URL or directory semantics are interpreted. */
export function sanitizeFileOutputName(input: string, fallback = "merged.bin"): string {
  const name = typeof input === "string" ? input.replace(/[\/\\\u0000-\u001f\u007f-\u009f]/g, "_").trim().slice(0, 200) : "";
  return name && name !== "." && name !== ".." ? name : fallback;
}

export function filePartName(sourceName: string, index: number): string {
  return `${sanitizeFileOutputName(sourceName, "file")}.part${String(index).padStart(3, "0")}`;
}
