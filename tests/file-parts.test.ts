import { describe, expect, it } from "vitest";
import { FILE_PARTS_LIMITS, filePartName, mergeFileBytes, planFileParts, planFileSplit, sanitizeFileOutputName } from "@/tools/_lib/file-parts";

describe("binary file split planning", () => {
  it("creates exact, contiguous ranges including a short final part", () => {
    expect(planFileParts(8, 3)).toEqual({ error: null, parts: [
      { index: 1, start: 0, end: 3, size: 3 }, { index: 2, start: 3, end: 6, size: 3 }, { index: 3, start: 6, end: 8, size: 2 },
    ] });
  });
  it("keeps an empty source as one empty part and an exact multiple has no trailing empty part", () => {
    expect(planFileParts(0, 5)).toEqual({ error: null, parts: [{ index: 1, start: 0, end: 0, size: 0 }] });
    expect(planFileParts(6, 3).parts).toHaveLength(2);
  });
  it.each([-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER])("rejects invalid or excessive source size %s", size => {
    expect(planFileParts(size, 3).error).toBeTruthy(); expect(planFileParts(size, 3).parts).toEqual([]);
  });
  it.each([0, -1, 1.5, NaN, Infinity, FILE_PARTS_LIMITS.bytes + 1])("rejects invalid part size %s", bytes => {
    expect(planFileParts(6, bytes)).toEqual({ error: "part-size", parts: [] });
  });
  it("checks part count before allocating ranges and accepts exact source limit", () => {
    expect(planFileParts(101, 1)).toEqual({ error: "part-count", parts: [] });
    expect(planFileParts(FILE_PARTS_LIMITS.bytes, FILE_PARTS_LIMITS.bytes).parts).toHaveLength(1);
    expect(planFileParts(FILE_PARTS_LIMITS.bytes + 1, 1000000).error).toBe("size-limit");
  });
  it("balances a selected number of contiguous parts without empty tails", () => {
    expect(planFileSplit(8, { mode: "count", partCount: 3 })).toEqual({ error: null, parts: [
      { index: 1, start: 0, end: 3, size: 3 }, { index: 2, start: 3, end: 6, size: 3 }, { index: 3, start: 6, end: 8, size: 2 },
    ] });
    expect(planFileSplit(2, { mode: "count", partCount: 3 }).error).toBe("part-count");
    expect(planFileSplit(0, { mode: "count", partCount: 1 }).parts).toHaveLength(1);
    expect(planFileSplit(0, { mode: "count", partCount: 2 }).error).toBe("part-count");
    expect(planFileSplit(8, { mode: "size", partBytes: 3 })).toEqual(planFileParts(8, 3));
  });
  it("covers every byte exactly once across count-mode boundary combinations", () => {
    for (const size of [1, 2, 7, 99, 100, 101, 65537, FILE_PARTS_LIMITS.bytes]) {
      for (const count of [1, 2, 3, 99, 100].filter(count => count <= size)) {
        const plan = planFileSplit(size, { mode: "count", partCount: count });
        expect(plan.error).toBeNull(); expect(plan.parts).toHaveLength(count);
        expect(plan.parts[0].start).toBe(0); expect(plan.parts.at(-1)!.end).toBe(size);
        expect(plan.parts.reduce((sum, part) => sum + part.size, 0)).toBe(size);
        expect(Math.max(...plan.parts.map(part => part.size)) - Math.min(...plan.parts.map(part => part.size))).toBeLessThanOrEqual(1);
        plan.parts.forEach((part, index) => { expect(part.size).toBeGreaterThan(0); if (index) expect(part.start).toBe(plan.parts[index - 1].end); });
      }
    }
  });
});

describe("ordered byte merge", () => {
  it("reconstructs every byte including null, high bytes and UTF-8 fragments", () => {
    const source = Uint8Array.from([0, 255, 128, 1, 240, 159, 152, 128, 13, 10, 0]);
    const parts = planFileParts(source.length, 3).parts.map(part => source.subarray(part.start, part.end));
    expect(mergeFileBytes(parts)).toEqual({ error: null, bytes: source });
    expect([...mergeFileBytes([...parts].reverse()).bytes!]).toEqual(parts.reverse().flatMap(part => [...part]));
  });
  it("respects view offsets and creates independent result storage", () => {
    const buffer = Uint8Array.from([99, 1, 2, 99]);
    const result = mergeFileBytes([buffer.subarray(1, 3), new Uint8Array(0)]);
    expect([...result.bytes!]).toEqual([1, 2]); buffer[1] = 8; expect(result.bytes![0]).toBe(1);
  });
  it("allows one file or empty inputs but requires at least one selected part", () => {
    expect(mergeFileBytes([new Uint8Array(0)])).toEqual({ error: null, bytes: new Uint8Array(0) });
    expect(mergeFileBytes([])).toEqual({ error: "file-count", bytes: null });
    expect(mergeFileBytes(Array.from({ length: 101 }, () => new Uint8Array(0))).error).toBe("file-count");
  });
  it("rejects non-byte arrays and aggregate resources before constructing output", () => {
    expect(mergeFileBytes([[]] as unknown as Uint8Array[])).toEqual({ error: "input", bytes: null });
    const part = new Uint8Array(FILE_PARTS_LIMITS.bytes / 2 + 1);
    expect(mergeFileBytes([part, part])).toEqual({ error: "size-limit", bytes: null });
  });
  it("rejects detached buffers instead of silently accepting an empty view", () => {
    const part = new Uint8Array([1, 2]); structuredClone(part.buffer, { transfer: [part.buffer] });
    expect(mergeFileBytes([part])).toEqual({ bytes: null, error: "input" });
  });
});

describe("download names", () => {
  it("preserves Unicode and extensions but removes path/control characters", () => {
    expect(sanitizeFileOutputName("../../中😀\u0000\\x.bin")).toBe(".._.._中😀__x.bin");
    expect(sanitizeFileOutputName(" .. ")).toBe("merged.bin");
    expect(sanitizeFileOutputName("  result.zip  ")).toBe("result.zip");
    expect(filePartName("sample.bin", 1)).toBe("sample.bin.part001");
    expect(filePartName("sample.bin", 100)).toBe("sample.bin.part100");
    expect(sanitizeFileOutputName("a".repeat(400)).length).toBeLessThanOrEqual(200);
  });
});
