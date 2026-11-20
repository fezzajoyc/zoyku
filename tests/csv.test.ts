import { describe, expect, it, vi } from "vitest";
import { CSV_DELIMITERS, CSV_LIMITS, csvToJson, escapeCsvCell, inferCsvValue, jsonToCsv } from "@/tools/_lib/csv";
import { parseJsonLossless } from "@/tools/_lib/json-format";

describe("CSV selected-delimiter serialization", () => {
  it.each(CSV_DELIMITERS)("escapes %j in headers and values with quotes, CRLF and Unicode", (delimiter) => {
    const key = `名${delimiter}字`;
    const value = `张三😀${delimiter}he said "hi"\r\nnext`;
    expect(jsonToCsv(JSON.stringify([{ [key]: value }]), delimiter)).toEqual({
      out: `"${key}"\n"${value.replaceAll('"', '""')}"`, error: null,
    });
    expect(JSON.parse(csvToJson(jsonToCsv(JSON.stringify([{ [key]: value }]), delimiter).out, delimiter).out)).toEqual([{ [key]: value }]);
  });

  it.each(CSV_DELIMITERS)("retains string record order and content with %j", (delimiter) => {
    const rows = [{ first: "张三😀", second: "line\r\nnext" }, { first: "a\tb;c,d", second: 'he said "hi"' }];
    const encoded = jsonToCsv(JSON.stringify(rows), delimiter);
    expect(encoded.error).toBeNull();
    expect(JSON.parse(csvToJson(encoded.out, delimiter).out)).toEqual(rows);
  });

  it("only quotes a non-selected separator when another rule requires it", () => {
    expect(escapeCsvCell("a,b", ";")).toBe("a,b");
    expect(escapeCsvCell("a;b", ",")).toBe("a;b");
    expect(escapeCsvCell('a"b', "\t")).toBe('"a""b"');
    expect(escapeCsvCell("", ",")).toBe("");
  });

  it("unions keys in source order and uses empty cells only for missing/null", () => {
    expect(jsonToCsv('[{"2":"two","1":"one","null":null},{"constructor":"own","__proto__":{"n":1}}]')).toEqual({
      out: '2,1,null,constructor,__proto__\ntwo,one,,,\n,,,own,"{""n"":1}"', error: null,
    });
    expect(jsonToCsv('[{"id":1},{"toString":"own"}]').out).toBe("id,toString\n1,\n,own");
  });

  it.each(["9007199254740993", "-9007199254740993", "1e309", "1e-400", "-0", "1.2300", "0.1234567890123456789"])("preserves JSON numeric literal %s without Number", (raw) => {
    expect(jsonToCsv(`[{"value":${raw}}]`)).toEqual({ out: `value\n${raw}`, error: null });
  });

  it("preserves nested number/escape spellings as JSON cell text", () => {
    const raw = '{"n":9007199254740993,"s":"\\u4e2d","a":[1e309,-0,1.00]}';
    expect(jsonToCsv(`[{"nested":${raw}}]`).out).toBe('nested\n"' + raw.replaceAll('"', '""') + '"');
  });
  it("keeps single-column empty, null and missing-value records", () => {
    const result = jsonToCsv('[{"a":""},{"a":null},{}]');
    expect(result).toEqual({ out: 'a\n""\n""\n""', error: null });
    expect(JSON.parse(csvToJson(result.out).out)).toEqual([{ a: "" }, { a: "" }, { a: "" }]);
    expect(jsonToCsv('[{"":"value"}]').out).toBe('""\nvalue');
  });

  it.each(['[{"a":1,"a":2}]', '[{"a":1,"\\u0061":2}]', '[{"nested":{"a":1,"a":2}}]', '[{"list":[{"a":1,"a":2}]}]'])("rejects duplicate decoded keys in %s atomically", (text) => {
    expect(jsonToCsv(text)).toEqual({ out: "", error: "duplicate" });
  });

  it("keeps the exported JSON tree ordered and literal-preserving", () => {
    const root = parseJsonLossless('{"\\u0061":9007199254740993,"a":-0}', true);
    expect(root.kind).toBe("object");
    if (root.kind !== "object") return;
    expect(root.members.map(member => [member.sortKey, member.value])).toEqual([
      ["a", { kind: "literal", raw: "9007199254740993" }], ["a", { kind: "literal", raw: "-0" }],
    ]);
  });
});

describe("conservative CSV numeric inference", () => {
  it.each([
    ["0", 0], ["1", 1], ["-1", -1], ["1.5", 1.5], ["0.1", 0.1], ["1.2300", 1.23],
    ["1e3", 1000], ["1e-7", 1e-7], ["9007199254740991", Number.MAX_SAFE_INTEGER],
    ["-9007199254740991", Number.MIN_SAFE_INTEGER], ["9007199254740991.0", Number.MAX_SAFE_INTEGER],
    ["5e-324", Number.MIN_VALUE], ["0e999999999999999999999999", 0],
    ["true", true], ["false", false], ["null", null],
  ])("infers the supported value %s", (source, expected) => { expect(inferCsvValue(source as string)).toBe(expected); });

  it.each([
    "9007199254740992", "9007199254740993", "-9007199254740992", "1e20", "1e309", "-1e309",
    "1e-400", "-1e-400", "2e-324", "3e-324", "4.9406564584124654e-324", "-0", "-0.00",
    "0.1234567890123456789", "1.0000000000000001", "9007199254740990.5", "1.7976931348623157e308",
    "007", "-01", "+1", ".5", "1.", "1,000", " 1", "1 ", "\t1", "1\n", "NaN", "Infinity",
    "TRUE", "False", "NULL", "", "中😀", "１２３", "١٢٣", "2026-11-21",
  ])("preserves the exact text %j", (text) => { expect(inferCsvValue(text)).toBe(text); });

  it("retains unsafe values in output while keeping ordinary JSON types", () => {
    const text = "id,overflow,small,decimal,ordinary,active,maybe,zip\n9007199254740993,1e309,1e-400,0.1234567890123456789,1.25,true,null,007";
    expect(JSON.parse(csvToJson(text).out)).toEqual([{ id: "9007199254740993", overflow: "1e309", small: "1e-400", decimal: "0.1234567890123456789", ordinary: 1.25, active: true, maybe: null, zip: "007" }]);
  });
});

describe("CSV record and error boundaries", () => {
  it("handles BOM, CRLF, escaped quotes, quoted empty/space records and final delimiters", () => {
    expect(JSON.parse(csvToJson('\uFEFFa,b\r\n"he said ""hi""","line\r\nnext"\r\n"",\r\n" ", ').out)).toEqual([
      { a: 'he said "hi"', b: "line\r\nnext" }, { a: "", b: "" }, { a: " ", b: " " },
    ]);
    expect(JSON.parse(csvToJson('a\n\n""\n"  "\n').out)).toEqual([{ a: "" }, { a: "  " }]);
  });
  it("accepts an initial BOM before a quoted first header", () => {
    expect(csvToJson('\uFEFF"a","b"\r\n"1","2"')).toEqual({ out: JSON.stringify([{ a: 1, b: 2 }], null, 2), error: null });
    expect(JSON.parse(csvToJson('a\n"\uFEFFvalue"').out)).toEqual([{ a: "\uFEFFvalue" }]);
  });

  it("trims headers and names empty columns without prototype assignment", () => {
    const result = csvToJson(' name ,,__proto__,constructor\n张三😀,007,x,y');
    expect(JSON.parse(result.out)).toEqual([{ name: "张三😀", column2: "007", ["__proto__"]: "x", constructor: "y" }]);
    expect(Object.getPrototypeOf({})).toBe(Object.prototype);
  });

  it.each(["a,a\n1,2", ",column1\n1,2", " a ,a\n1,2"])("rejects duplicate final header names: %j", (input) => {
    expect(csvToJson(input)).toEqual({ out: "", error: "headers" });
  });
  it.each(['a,b\n"unclosed', 'a,b\n"one"x,two', 'a,b\non"e,two', "a,b\n1,2,3", "a,b\n1"])("rejects malformed or unequal-width CSV: %j", (input) => {
    expect(csvToJson(input)).toEqual({ out: "", error: "csv" });
  });
  it.each(["", " \n\t", "　"])("keeps empty input %j empty", (input) => {
    expect(jsonToCsv(input)).toEqual({ out: "", error: null });
    expect(csvToJson(input)).toEqual({ out: "", error: null });
  });
  it.each([null, undefined, 123, {}, [], true])("rejects non-text %j without throwing", (value) => {
    expect(jsonToCsv(value)).toEqual({ out: "", error: "input" });
    expect(csvToJson(value)).toEqual({ out: "", error: "input" });
  });
  it.each(["{}", "null", "[1]", "[[]]", "[null]"])("requires a JSON object array: %s", (input) => { expect(jsonToCsv(input).error).toBe("array"); });
  it.each(['[{"a":1,}]', '[{"a":01}]', '[{"a":"line\nnext"}]', "["])("rejects malformed JSON: %j", (input) => { expect(jsonToCsv(input)).toEqual({ out: "", error: "json" }); });
  it("handles empty arrays, header-only tables and unrepresentable zero-column rows", () => {
    expect(jsonToCsv("[]")).toEqual({ out: "", error: null });
    expect(csvToJson("header")).toEqual({ out: "[]", error: null });
    expect(jsonToCsv("[{},{}]")).toEqual({ out: "", error: "columns" });
  });
  it("refuses unsupported delimiters", () => {
    expect(jsonToCsv("[]", "|" as ",").error).toBe("delimiter");
    expect(csvToJson("a\nb", "|" as ",").error).toBe("delimiter");
  });
  it("handles more than ten thousand Unicode characters without truncation", () => {
    const text = "中😀".repeat(10_001);
    const result = jsonToCsv(JSON.stringify([{ text }]));
    expect(JSON.parse(csvToJson(result.out).out)).toEqual([{ text }]);
  });
});

describe("CSV resource rejections are explicit and atomic", () => {
  it("checks raw UTF-16 input before ignoring whitespace", () => {
    expect(Object.isFrozen(CSV_LIMITS)).toBe(true);
    const text = " ".repeat(CSV_LIMITS.inputCharacters + 1);
    expect(jsonToCsv(text)).toEqual({ out: "", error: "limit" });
    expect(csvToJson(text)).toEqual({ out: "", error: "limit" });
  });
  it("rejects excess JSON depth or values", () => {
    expect(jsonToCsv("[".repeat(CSV_LIMITS.jsonDepth + 1) + "]".repeat(CSV_LIMITS.jsonDepth + 1)).error).toBe("limit");
    expect(jsonToCsv("[" + Array(CSV_LIMITS.jsonValues).fill("0").join(",") + "]").error).toBe("limit");
  });
  it("rejects expanding JSON output without returning a prefix", () => {
    expect(csvToJson("a\n" + "\u0000".repeat(700_000))).toEqual({ out: "", error: "limit" });
  });
  it("bounds sparse tables before a quadratic CSV allocation", () => {
    const source = "[" + Array.from({ length: 2200 }, (_, index) => `{"k${index}":1}`).join(",") + "]";
    expect(jsonToCsv(source)).toEqual({ out: "", error: "limit" });
  });
  it("rejects repeated long headers before serializing an over-limit whole table", () => {
    const source = "h".repeat(10_000) + "\n" + Array(500).fill("x").join("\n");
    const serialize = vi.spyOn(JSON, "stringify");
    try {
      expect(csvToJson(source)).toEqual({ out: "", error: "limit" });
      expect(serialize.mock.calls.some(([value]) => Array.isArray(value) && value.length === 500)).toBe(false);
    } finally { serialize.mockRestore(); }
  });
  it("allows exactly the JSON output budget and rejects the next code unit", () => {
    const header = "h".repeat(9978);
    const tail = "\n" + Array(399).fill("x").join("\n");
    const exact = csvToJson(header + "\n" + "x".repeat(399) + tail);
    expect(exact.error).toBeNull();
    expect(exact.out.length).toBe(CSV_LIMITS.outputCharacters);
    expect(csvToJson(header + "\n" + "x".repeat(400) + tail)).toEqual({ out: "", error: "limit" });
  });
});
