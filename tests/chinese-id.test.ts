import { describe, expect, it } from "vitest";
import {
  calculateChineseIdCheckCharacter, generateChineseIdSamples, maskChineseId,
  normalizeChineseId, validateChineseId, validateChineseIdBatch,
} from "@/tools/_lib/chinese-id";

const REFERENCE = "2026-11-20";
// Independent reference: solve the complete MOD 11-2 congruence by trying
// each character value. It does not reuse production weights or its lookup.
function referenceCheck(body: string): string {
  const sum = [...body].reduce((n, d, i) => n + Number(d) * (2 ** (17 - i)), 0);
  const digit = Array.from({ length: 11 }, (_, i) => i).find((i) => (sum + i) % 11 === 1)!;
  return digit === 10 ? "X" : String(digit);
}
const numberFor = (body: string) => body + referenceCheck(body);
const defaults = { areaCode: "110105", birthDate: "2000-02-29", sex: "any" as const, startSequence: 1, count: 10, referenceDate: REFERENCE };

describe("Chinese ID checksum and normalization", () => {
  it.each([["11010519491231002", "X"], ["44052418800101001", "4"]])("matches GB 11643 annex example %s", (body, check) => {
    expect(calculateChineseIdCheckCharacter(body)).toBe(check);
    expect(validateChineseId(body + check, REFERENCE).valid).toBe(true);
  });
  it("matches an independent complete-number congruence for every sequence and all 11 characters", () => {
    const seen = new Set<string>();
    for (let n = 1; n <= 999; n++) {
      const body = "11010520000229" + String(n).padStart(3, "0");
      const expected = referenceCheck(body);
      seen.add(expected);
      expect(calculateChineseIdCheckCharacter(body)).toBe(expected);
      expect(validateChineseId(body + expected, REFERENCE).valid).toBe(true);
    }
    expect([...seen].sort()).toEqual([..."0123456789X"].sort());
  });
  it.each(["", "123", "1".repeat(18), "a".repeat(17), null, undefined, 123])("rejects invalid checksum bodies without throwing: %s", (input) => {
    expect(calculateChineseIdCheckCharacter(input)).toBeNull();
  });
  it("normalizes full-width ASCII, lowercase x and Unicode whitespace", () => {
    expect(normalizeChineseId("　１１０１０５１９４９１２３１００２ｘ \t\n")).toBe("11010519491231002X");
    expect(validateChineseId("110 105\t19491231 002x", REFERENCE).valid).toBe(true);
  });
  it("does not silently normalize lookalikes or punctuation into an ID", () => {
    expect(validateChineseId("110105-19491231-002X", REFERENCE).errors).toContain("format");
    expect(validateChineseId("11010519491231002Х", REFERENCE).errors).toContain("format");
  });
});

describe("Chinese ID validation boundaries", () => {
  it("parses encoded fields and age against the explicit reference date", () => {
    const r = validateChineseId("11010519491231002X", REFERENCE);
    expect(r).toMatchObject({ valid: true, administrativeCodeVerified: false, identityVerified: false, legacyAssumption: null, canonicalNumber: "11010519491231002X" });
    expect(r.parsed).toMatchObject({ areaCode: "110105", provinceCode: "11", provinceName: "北京市", birthDate: "1949-12-31", age: 76, sex: "female", sequence: "002" });
    expect(validateChineseId("11010519491231002X", "2026-12-31").parsed?.age).toBe(77);
  });
  it("does not invent a current or historical county lookup", () => {
    const r = validateChineseId(numberFor("11999920000101001"), REFERENCE);
    expect(r.valid).toBe(true);
    expect(r.administrativeCodeVerified).toBe(false);
    expect(r.identityVerified).toBe(false);
  });
  it.each(["000000", "990000", "100000", "660000"])("rejects an unrecognized province prefix %s", (area) => {
    expect(validateChineseId(numberFor(area + "20000101001"), REFERENCE).errors).toContain("province");
  });
  it.each(["20000229", "20240229", "18800101", "00010101"])("accepts a real nonfuture Gregorian birth date %s", (birth) => {
    expect(validateChineseId(numberFor("110105" + birth + "001"), REFERENCE).valid).toBe(true);
  });
  it.each(["19000229", "20230229", "20260431", "20260001", "20260100", "00000101"])("rejects impossible birth date %s", (birth) => {
    expect(validateChineseId(numberFor("110105" + birth + "001"), REFERENCE).errors).toContain("birth_date");
  });
  it("allows the reference date itself but rejects the following day", () => {
    expect(validateChineseId(numberFor("11010520261120001"), REFERENCE).parsed?.age).toBe(0);
    expect(validateChineseId(numberFor("11010520261121001"), REFERENCE).errors).toContain("future_birth");
  });
  it.each(["", "2026-02-30", "2026-2-1", "0000-01-01", undefined])("requires a real explicit reference date: %s", (reference) => {
    expect(validateChineseId("11010519491231002X", reference as string).errors).toContain("reference_date");
  });
  it("rejects sequence 000 even with a correct checksum", () => {
    expect(validateChineseId(numberFor("11010520000101000"), REFERENCE).errors).toContain("sequence");
  });
  it("reports a wrong check character without auto-correcting the entered number", () => {
    const r = validateChineseId("110105194912310020", REFERENCE);
    expect(r.valid).toBe(false);
    expect(r.errors).toContain("checksum");
    expect(r.expectedCheckCharacter).toBe("X");
    expect(r.canonicalNumber).toBe("110105194912310020");
    expect(r.parsed).toBeNull();
  });
  it("converts old 15-digit numbers under a visible 19xx assumption", () => {
    const r = validateChineseId("110105491231002", REFERENCE);
    expect(r).toMatchObject({ valid: true, legacyAssumption: "19xx", canonicalNumber: "11010519491231002X" });
    expect(r.parsed?.birthDate).toBe("1949-12-31");
  });
  it.each(["", " \t　", "中文🙂", "1".repeat(16), null, undefined, 110105194912310020])("handles empty or malformed input without throwing: %s", (value) => {
    expect(validateChineseId(value, REFERENCE).valid).toBe(false);
  });
  it("bounds long inputs before normalization", () => {
    expect(validateChineseId("1".repeat(10_000), REFERENCE).errors).toContain("too_long");
    expect(normalizeChineseId(" ".repeat(10_000) + "11010519491231002X")).toBe("");
  });
});

describe("bounded batch and masking", () => {
  it("keeps original line numbers, ignores blank lines, and reports each row", () => {
    const r = validateChineseIdBatch("11010519491231002X\n\n110105194912310020\r\n110105491231002", REFERENCE);
    expect(r.error).toBeNull();
    expect(r.results.map((r) => [r.lineNumber, r.valid])).toEqual([[1, true], [3, false], [4, true]]);
  });
  it("accepts 100 rows but refuses 101 instead of silently truncating", () => {
    expect(validateChineseIdBatch(Array(100).fill("11010519491231002X").join("\n"), REFERENCE).results).toHaveLength(100);
    expect(validateChineseIdBatch(Array(101).fill("11010519491231002X").join("\n"), REFERENCE)).toMatchObject({ error: "batch_limit", results: [] });
  });
  it.each(["", " \r\n\t", null, 12])("reports empty or wrong-type batches: %s", (value) => {
    expect(validateChineseIdBatch(value, REFERENCE).error).not.toBeNull();
  });
  it("bounds the batch character count and requires a valid reference date", () => {
    expect(validateChineseIdBatch("中".repeat(100_000), REFERENCE).error).toBe("batch_too_long");
    expect(validateChineseIdBatch("11010519491231002X", "2026-02-30").error).toBe("reference_date");
  });
  it("masks birth and sequence digits without mutating data", () => {
    expect(maskChineseId("11010519491231002X")).toBe("110***********002X");
    expect(maskChineseId("110105491231002")).toBe("110********1002");
    expect(maskChineseId("abc")).toBe("***");
    expect(maskChineseId(null)).toBe("");
    expect(maskChineseId("1".repeat(10_000)).length).toBeLessThan(30);
  });
});

describe("deterministic test-sample generation", () => {
  it("generates 100 distinct format samples that round-trip, without verifying issuance", () => {
    const r = generateChineseIdSamples({ ...defaults, count: 100 });
    expect(r.errors).toEqual([]);
    expect(r.numbers).toHaveLength(100);
    expect(new Set(r.numbers).size).toBe(100);
    expect(r).toMatchObject({ administrativeCodeVerified: false, identityVerified: false });
    for (const s of r.numbers) {
      expect(s).toBe(numberFor(s.slice(0, 17)));
      expect(validateChineseId(s, REFERENCE).valid).toBe(true);
    }
    expect(generateChineseIdSamples({ ...defaults, count: 100 })).toEqual(r);
  });
  it.each([["male", 2, "003"], ["female", 1, "002"], ["any", 1, "001"]] as const)("aligns %s sequence parity from %i", (sex, startSequence, first) => {
    const r = generateChineseIdSamples({ ...defaults, sex, startSequence, count: 100 });
    expect(r.errors).toEqual([]);
    expect(r.numbers[0].slice(14, 17)).toBe(first);
    if (sex !== "any") for (const s of r.numbers) expect(Number(s[16]) % 2).toBe(sex === "male" ? 1 : 0);
  });
  it("supports the final sequence and refuses overflow atomically", () => {
    expect(generateChineseIdSamples({ ...defaults, startSequence: 999, count: 1 }).numbers).toHaveLength(1);
    expect(generateChineseIdSamples({ ...defaults, startSequence: 999, count: 2 })).toMatchObject({ numbers: [], errors: ["sequence_capacity"] });
    expect(generateChineseIdSamples({ ...defaults, sex: "female", startSequence: 999, count: 1 }).errors).toContain("sequence_capacity");
  });
  it.each([0, -1, 101, 1.5, NaN, Infinity])("rejects invalid quantity %s", (count) => {
    expect(generateChineseIdSamples({ ...defaults, count }).errors).toContain("count");
  });
  it.each([0, -1, 1000, 1.5, NaN, Infinity])("rejects invalid starting sequence %s", (startSequence) => {
    expect(generateChineseIdSamples({ ...defaults, startSequence }).errors).toContain("sequence");
  });
  it.each(["", "11010", "1101050", "990105", "11a105", "１１０１０５"])("rejects invalid manually supplied area code %s", (areaCode) => {
    expect(generateChineseIdSamples({ ...defaults, areaCode }).errors).toContain("province");
  });
  it.each(["", "2026-02-30", "1900-02-29", "2026-11-21"])("rejects invalid or future birth date %s", (birthDate) => {
    expect(generateChineseIdSamples({ ...defaults, birthDate }).numbers).toEqual([]);
  });
  it("rejects invalid runtime options without throwing", () => {
    expect(generateChineseIdSamples(null as never).numbers).toEqual([]);
    expect(generateChineseIdSamples({ ...defaults, sex: "invalid" as never }).errors).toContain("sex");
    expect(generateChineseIdSamples({ ...defaults, referenceDate: "bad" }).errors).toContain("reference_date");
  });
});
