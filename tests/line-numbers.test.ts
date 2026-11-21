import { describe, expect, it } from "vitest";
import { addLineNumbers, LINE_NUMBERS_LIMITS, type LineNumbersOptions } from "@/tools/_lib/line-numbers";

// Demand evidence: stored official LDDGO-01-025 card (2026-11-21) declares
// customizable numbering, alignment and line-start/line-end placement.
// These fixtures define our explicit newline/limit contract, not peer parity.
describe("line numbers preserve text and line boundaries", () => {
  it("numbers each input line with a literal prefix", () => {
    expect(addLineNumbers("apple\nbanana")).toEqual({ out: "1. apple\n2. banana", error: null, lineCount: 2 });
  });
  it("numbers suffixes with user-selected start, step and separator", () => {
    expect(addLineNumbers("红\nblue", { position: "suffix", start: 0, step: 3, separator: " :: " }))
      .toEqual({ out: "红 :: 0\nblue :: 3", error: null, lineCount: 2 });
  });
  it("keeps empty input distinct from an input ending in an empty line", () => {
    expect(addLineNumbers("")).toEqual({ out: "", error: null, lineCount: 0 });
    expect(addLineNumbers("a\n")).toEqual({ out: "1. a\n2. ", error: null, lineCount: 2 });
    expect(addLineNumbers("\n")).toEqual({ out: "1. \n2. ", error: null, lineCount: 2 });
  });
  it("normalizes CRLF and lone CR without trimming whitespace or altering Unicode", () => {
    expect(addLineNumbers("  你好😀\r\n\té\rالعربية\n", { separator: "|" }))
      .toEqual({ out: "1|  你好😀\n2|\té\n3|العربية\n4|", error: null, lineCount: 4 });
  });
  it("uses space padding, never truncates wider numbers and sizes auto padding from the last number", () => {
    expect(addLineNumbers("a\nb", { start: 9, padding: "auto", separator: ":" }).out).toBe(" 9:a\n10:b");
    expect(addLineNumbers("a\nb", { position: "suffix", start: 99, padding: 1, separator: "|" }).out).toBe("a|99\nb|100");
    expect(addLineNumbers("x", { padding: 3, separator: "" }).out).toBe("  1x");
  });
  it("does not interpret escape sequences, templates, dollar signs or markup in the separator", () => {
    const separator = "\\n${x}$&<b>";
    expect(addLineNumbers("a\nb", { separator }).out).toBe(`1${separator}a\n2${separator}b`);
  });
});

describe("line numbers reject unsupported input without partial output", () => {
  it.each([null, undefined, 123, true, {}, [], new String("a")])("rejects non-text %j", (input) => {
    expect(addLineNumbers(input)).toEqual({ out: "", error: "input-type", lineCount: 0 });
  });
  it.each([
    [{ start: -1 }, "start"], [{ start: 1.5 }, "start"], [{ start: 1_000_000_001 }, "start"], [{ start: NaN }, "start"],
    [{ step: 0 }, "step"], [{ step: 1.1 }, "step"], [{ step: 1_000_001 }, "step"], [{ step: Infinity }, "step"],
    [{ padding: -1 }, "padding"], [{ padding: 13 }, "padding"], [{ padding: 1.5 }, "padding"], [{ padding: "12" }, "padding"],
    [{ separator: "x".repeat(65) }, "separator"], [{ separator: null }, "separator"],
    [{ position: "middle" }, "position"], [null, "options"], [[], "options"],
  ])("rejects invalid options %j as %s", (options, error) => {
    expect(addLineNumbers("a", options as LineNumbersOptions)).toEqual({ out: "", error, lineCount: 0 });
  });
  it("checks UTF-16 input length before normalization, including surrogate pairs", () => {
    expect(addLineNumbers("😀".repeat(50_000)).error).toBeNull();
    expect(addLineNumbers("😀".repeat(50_000) + "x")).toEqual({ out: "", error: "input-limit", lineCount: 0 });
    expect(addLineNumbers("\r\n".repeat(50_001)).error).toBe("input-limit");
  });
  it("accepts 10,000 lines and rejects the terminal empty line that would make 10,001", () => {
    const input = Array(10_000).fill("x").join("\n");
    const result = addLineNumbers(input, { start: 1_000_000_000, step: 1_000_000, separator: "" });
    expect(result.error).toBeNull();
    expect(result.lineCount).toBe(10_000);
    expect(result.out.split("\n").at(-1)).toBe("10999000000x");
    expect(addLineNumbers(input + "\n")).toEqual({ out: "", error: "line-limit", lineCount: 0 });
  });
  it("accepts exactly 300,000 output units and rejects one extra separator unit per line", () => {
    const input = Array(10_000).fill("x").join("\n");
    const options = { padding: 12, separator: "-".repeat(16) };
    // 10,000 × (12 number + 16 separator + 1 text) + 9,999 LF = 299,999.
    expect(addLineNumbers(input + "z", options).out.length).toBe(300_000);
    expect(addLineNumbers(input + "zz", options)).toEqual({ out: "", error: "output-limit", lineCount: 0 });
  });
  it("exports the exact bounded resource contract", () => {
    expect(LINE_NUMBERS_LIMITS).toEqual({ inputCharacters: 100_000, outputCharacters: 300_000, lines: 10_000, start: 1_000_000_000, step: 1_000_000, padding: 12, separatorCharacters: 64 });
    expect(addLineNumbers("x", { separator: "😀".repeat(32) }).error).toBeNull();
    expect(addLineNumbers("x", { separator: "😀".repeat(33) }).error).toBe("separator");
  });
});
