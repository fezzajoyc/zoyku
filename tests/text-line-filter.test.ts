import { describe, expect, it } from "vitest";
import { filterTextLines, TEXT_LINE_FILTER_LIMITS, type TextLineFilterOptions } from "@/tools/_lib/text-line-filter";

const contains = { mode: "contains", query: "a", action: "include", caseSensitive: true } as const;
const length = { mode: "length", min: 0, max: 100_000 } as const;

describe("text line filtering preserves the selected original text", () => {
  it("includes or excludes literal matches without trimming, regex or template interpretation", () => {
    expect(filterTextLines(" a* \nbeta\na*\n", { ...contains, query: "a*" })).toEqual({ out: " a* \na*", error: null, inputLines: 4, outputLines: 2 });
    expect(filterTextLines("a$&\nA$&\nplain", { ...contains, query: "$&", action: "exclude" }).out).toBe("plain");
  });
  it("uses locale-independent lowercase when requested but leaves output unchanged", () => {
    const input = "Apple\napple\nAPPLE\nÄPFEL\nI\nı";
    expect(filterTextLines(input, { ...contains, query: "apple" }).outputLines).toBe(1);
    expect(filterTextLines(input, { ...contains, query: "ApPlE", caseSensitive: false }).out).toBe("Apple\napple\nAPPLE");
    expect(filterTextLines(input, { ...contains, query: "i", caseSensitive: false }).out).toBe("I");
  });
  it("selects one-based inclusive line ranges including blank and terminal lines", () => {
    expect(filterTextLines("first\n\n中😀\nlast\n", { mode: "range", from: 2, to: 5 })).toEqual({ out: "\n中😀\nlast\n", error: null, inputLines: 5, outputLines: 4 });
    expect(filterTextLines("x\n", { mode: "range", from: 2, to: 2 })).toEqual({ out: "", error: null, inputLines: 2, outputLines: 1 });
  });
  it("counts Unicode code points, including combining marks separately", () => {
    const input = "\n😀\ne\u0301\n中a\n👩‍💻\n x ";
    expect(filterTextLines(input, { mode: "length", min: 1, max: 1 }).out).toBe("😀");
    expect(filterTextLines(input, { mode: "length", min: 2, max: 2 }).out).toBe("e\u0301\n中a");
    expect(filterTextLines(input, { mode: "length", min: 3, max: 3 }).out).toBe("👩‍💻\n x ");
  });
  it("normalizes CRLF and CR, preserving whitespace, Unicode and final empty-line counts", () => {
    expect(filterTextLines("  中\r\n\té\rالعربية\n", length)).toEqual({ out: "  中\n\té\nالعربية\n", error: null, inputLines: 4, outputLines: 4 });
    expect(filterTextLines("", length)).toEqual({ out: "", error: null, inputLines: 0, outputLines: 0 });
    expect(filterTextLines("\n", { mode: "length", min: 0, max: 0 })).toEqual({ out: "\n", error: null, inputLines: 2, outputLines: 2 });
    expect(filterTextLines("abc", { ...contains, query: "missing" })).toEqual({ out: "", error: null, inputLines: 1, outputLines: 0 });
  });
  it("extracts literal delimiter columns without CSV quote interpretation", () => {
    expect(filterTextLines('a::  中 ::z\nb::😀::', { mode: "column", delimiter: "::", column: 2, missingColumn: "reject" })).toEqual({ out: "  中 \n😀", error: null, inputLines: 2, outputLines: 2 });
    expect(filterTextLines('"a,b",c', { mode: "column", delimiter: ",", column: 2, missingColumn: "reject" }).out).toBe('b"');
    expect(filterTextLines("a|\nb\n", { mode: "column", delimiter: "|", column: 2, missingColumn: "empty" })).toEqual({ out: "\n\n", error: null, inputLines: 3, outputLines: 3 });
    expect(filterTextLines("a|b\nmissing", { mode: "column", delimiter: "|", column: 2, missingColumn: "reject" })).toEqual({ out: "", error: "missing-column", inputLines: 2, outputLines: 0 });
  });
});

describe("text line filter rejects unsupported configuration and bounded resources", () => {
  it.each([
    [null, "options"], [[], "options"], [{ mode: "regex" }, "mode"],
    [{ ...contains, query: "" }, "query"], [{ ...contains, query: "x".repeat(129) }, "query"], [{ ...contains, query: 3 }, "query"],
    [{ ...contains, action: "other" }, "query"], [{ ...contains, caseSensitive: "false" }, "query"],
    [{ mode: "range", from: 0, to: 1 }, "range"], [{ mode: "range", from: 2, to: 1 }, "range"], [{ mode: "range", from: 1, to: 2 }, "range"], [{ mode: "range", from: 1.5, to: 2 }, "range"],
    [{ mode: "length", min: -1, max: 2 }, "length"], [{ mode: "length", min: 2, max: 1 }, "length"], [{ mode: "length", min: 0, max: Infinity }, "length"],
    [{ mode: "column", delimiter: "", column: 1, missingColumn: "empty" }, "delimiter"],
    [{ mode: "column", delimiter: "x".repeat(129), column: 1, missingColumn: "empty" }, "delimiter"],
    [{ mode: "column", delimiter: "|", column: 0, missingColumn: "empty" }, "column"],
    [{ mode: "column", delimiter: "|", column: 1, missingColumn: "ignore" }, "column"],
  ])("rejects %j as %s", (options, error) => {
    expect(filterTextLines("a", options as TextLineFilterOptions).error).toBe(error);
  });
  it.each([null, undefined, 1, true, {}, []])("rejects non-text input %j", (input) => {
    expect(filterTextLines(input, length)).toEqual({ out: "", error: "input-type", inputLines: 0, outputLines: 0 });
  });
  it("limits raw UTF-16 input before normalization and accepts the exact boundary", () => {
    expect(filterTextLines("😀".repeat(50_000), length).out.length).toBe(100_000);
    expect(filterTextLines("😀".repeat(50_000) + "x", length).error).toBe("input-limit");
    expect(filterTextLines("\r\n".repeat(50_001), length).error).toBe("input-limit");
  });
  it("accepts exactly 10,000 lines but counts a trailing empty line toward the limit", () => {
    const input = Array(10_000).fill("x").join("\n");
    expect(filterTextLines(input, length).outputLines).toBe(10_000);
    expect(filterTextLines(input + "\n", length).error).toBe("line-limit");
  });
  it("handles the full 128-unit query/delimiter limit and large supported column index", () => {
    const query = "😀".repeat(64);
    expect(filterTextLines(query, { ...contains, query }).out).toBe(query);
    expect(filterTextLines("a" + query + "b", { mode: "column", delimiter: query, column: 2, missingColumn: "reject" }).out).toBe("b");
    expect(filterTextLines("|".repeat(9_999) + "last", { mode: "column", delimiter: "|", column: 10_000, missingColumn: "reject" }).out).toBe("last");
    expect(TEXT_LINE_FILTER_LIMITS).toEqual({ inputCharacters: 100_000, outputCharacters: 200_000, lines: 10_000, queryCharacters: 128, delimiterCharacters: 128, column: 10_000 });
  });
});
