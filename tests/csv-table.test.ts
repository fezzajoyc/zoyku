import { describe, expect, it } from "vitest";
import { CSV_DELIMITERS, escapeCsvCell, parseCsvRows } from "@/tools/_lib/csv";
import { CSV_TABLE_LIMITS, transformCsvTable, type CsvTableOptions } from "@/tools/_lib/csv-table";

const transpose = { operation: "transpose" } as const;
const swap = { operation: "swap", firstColumn: 1, secondColumn: 2 } as const;
const failure = (error: string) => ({ out: "", error, rows: 0, columns: 0 });
const encode = (rows: string[][], delimiter: "," | ";" | "\t") => rows.map(row => row.map(cell => escapeCsvCell(cell, delimiter) || (row.length === 1 ? '""' : "")).join(delimiter)).join("\n");

describe("CSV table transformation API", () => {
  it("provides a pure text-matrix transformer", () => {
    expect(transformCsvTable).toBeTypeOf("function");
  });
});

describe("CSV text-matrix operations", () => {
  it("transposes the first row as ordinary data and reports the output shape", () => {
    expect(transformCsvTable("name,name,\nAda,007,-0", transpose)).toEqual({ out: "name,Ada\nname,007\n,-0", error: null, rows: 3, columns: 2 });
  });
  it("swaps one-based columns in every row, including the first", () => {
    expect(transformCsvTable("a,b,c\n1,2,3", { ...swap, secondColumn: 3 })).toEqual({ out: "c,b,a\n3,2,1", error: null, rows: 2, columns: 3 });
    expect(transformCsvTable("a,b", { ...swap, secondColumn: 1 }).out).toBe("a,b");
  });
  it.each(CSV_DELIMITERS)("preserves all cell strings through transpose twice and swap twice with %j", delimiter => {
    const rows = [["  ", "007", "-0", "90071992547409931234567890"], ["中😀", `a${delimiter}b`, 'said "hi"', "line\r\nnext"], ["", "true", "null", "\uFEFFtext"]];
    const input = encode(rows, delimiter);
    const first = transformCsvTable(input, { ...transpose, delimiter });
    const second = transformCsvTable(first.out, { ...transpose, delimiter });
    expect(first.error).toBeNull();
    expect(second.error).toBeNull();
    expect(parseCsvRows(second.out, delimiter)).toEqual(rows);
    const exchanged = transformCsvTable(input, { ...swap, delimiter, firstColumn: 2, secondColumn: 4 });
    expect(parseCsvRows(exchanged.out, delimiter)).toEqual(rows.map(row => [row[0], row[3], row[2], row[1]]));
    expect(parseCsvRows(transformCsvTable(exchanged.out, { ...swap, delimiter, firstColumn: 2, secondColumn: 4 }).out, delimiter)).toEqual(rows);
  });
  it("ignores only empty physical records while preserving quoted empty and whitespace cells", () => {
    expect(transformCsvTable('\r\n""\n\n \r\n"  "\n', transpose)).toEqual({ out: ", ,  ", error: null, rows: 1, columns: 3 });
    expect(transformCsvTable('""', transpose)).toEqual({ out: '""', error: null, rows: 1, columns: 1 });
    expect(transformCsvTable('"",""', transpose)).toEqual({ out: '""\n""', error: null, rows: 2, columns: 1 });
    expect(transformCsvTable("   ", transpose).out).toBe("   ");
  });
  it.each(["", "\n\r\n"])("keeps empty input %j empty", input => {
    expect(transformCsvTable(input, transpose)).toEqual({ out: "", error: null, rows: 0, columns: 0 });
    expect(transformCsvTable(input, swap)).toEqual({ out: "", error: null, rows: 0, columns: 0 });
  });
  it("handles a single row, single column, CRLF and final empty cells", () => {
    expect(transformCsvTable("a,b,", transpose).out).toBe('a\nb\n""');
    expect(transformCsvTable("a\r\nb\r\nc\r\n", transpose).out).toBe("a,b,c");
  });
  it("handles more than ten thousand Unicode characters without truncation", () => {
    const value = "中😀".repeat(10_001);
    expect(transformCsvTable(`${value},007`, transpose).out).toBe(`${value}\n007`);
  });
});

describe("CSV table atomic validation", () => {
  it.each([null, undefined, 1, {}, [], false])("rejects non-text input %j", input => { expect(transformCsvTable(input, transpose)).toEqual(failure("input")); });
  it.each(['"open', 'a"b,c', '"a"x,b', ' "a",b'])("rejects malformed quote boundaries in %j", input => { expect(transformCsvTable(input, transpose)).toEqual(failure("csv")); });
  it.each(["a,b\nc", "a\nb,c", "a,b\nc,d,e"])("rejects unequal-width rows in %j without padding or dropping", input => { expect(transformCsvTable(input, transpose)).toEqual(failure("ragged")); });
  it.each([0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, 3, undefined])("rejects invalid column selection %j", column => {
    expect(transformCsvTable("a,b", { ...swap, firstColumn: column })).toEqual(failure("selection"));
    expect(transformCsvTable("a,b", { ...swap, secondColumn: column })).toEqual(failure("selection"));
  });
  it("rejects unsupported operations and delimiters without throwing", () => {
    expect(transformCsvTable("a,b", { operation: "delete" } as unknown as CsvTableOptions)).toEqual(failure("operation"));
    expect(transformCsvTable("a,b", { ...transpose, delimiter: "|" } as unknown as CsvTableOptions)).toEqual(failure("delimiter"));
    expect(transformCsvTable("a,b", null as unknown as CsvTableOptions)).toEqual(failure("operation"));
  });
});

describe("CSV table resource caps", () => {
  it("publishes immutable input, output and table budgets", () => {
    expect(CSV_TABLE_LIMITS).toEqual({ inputCharacters: 1_000_000, outputCharacters: 4_000_000, maxCells: 100_000, maxRows: 10_000, maxColumns: 1_000 });
    expect(Object.isFrozen(CSV_TABLE_LIMITS)).toBe(true);
  });
  it("checks UTF-16 input size before parsing and accepts exactly the limit", () => {
    expect(transformCsvTable(" ".repeat(CSV_TABLE_LIMITS.inputCharacters), transpose).out.length).toBe(CSV_TABLE_LIMITS.inputCharacters);
    expect(transformCsvTable("😀".repeat(CSV_TABLE_LIMITS.inputCharacters / 2 + 1), transpose)).toEqual(failure("limit"));
  });
  it("accepts the cell limit and rejects one additional complete row", () => {
    const row = Array(100).fill("x").join(",");
    expect(transformCsvTable(Array(1_000).fill(row).join("\n"), transpose)).toMatchObject({ error: null, rows: 100, columns: 1_000 });
    expect(transformCsvTable(Array(1_001).fill(row).join("\n"), { ...swap })).toEqual(failure("limit"));
  });
  it("checks input row and column caps and the transposed output column cap", () => {
    expect(transformCsvTable(Array(10_000).fill("x").join("\n"), { ...swap, secondColumn: 1 }).error).toBeNull();
    expect(transformCsvTable(Array(10_001).fill("x").join("\n"), { ...swap, secondColumn: 1 })).toEqual(failure("limit"));
    expect(transformCsvTable(Array(1_000).fill("x").join(","), transpose)).toMatchObject({ error: null, rows: 1_000, columns: 1 });
    expect(transformCsvTable(Array(1_001).fill("x").join(","), transpose)).toEqual(failure("limit"));
    expect(transformCsvTable(Array(1_001).fill("x").join("\n"), transpose)).toEqual(failure("limit"));
  });
});
