import { describe, expect, it } from "vitest";
import {
  aoaFromRows,
  csvCell,
  detectDelimiter,
  generatedHeader,
  numericCell,
  parseCsv,
  rowsFromSheetMatrix,
  rowsToCsv,
  sanitizeSheetName,
  stripBom,
} from "@/tools/_lib/converters";

/** 与产品代码同一套 SheetJS 步骤(csv⇄xlsx 引擎的真实数据路径)。 */
async function xlsxSteps() {
  const XLSX = await import("xlsx");
  const writeRows = (rows: (string | number)[][], sheet: string) => {
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(rows), sanitizeSheetName(sheet));
    return XLSX.write(wb, { bookType: "xlsx", type: "buffer" }) as Buffer;
  };
  const readRows = (buf: Buffer, sheet: string): string[][] => {
    const wb = XLSX.read(buf, { type: "buffer" });
    const matrix = wb.Sheets[sheet]
      ? (XLSX.utils.sheet_to_json(wb.Sheets[sheet], {
          header: 1,
          raw: false,
          defval: "",
          blankrows: false,
        }) as unknown[][])
      : [];
    return rowsFromSheetMatrix(matrix);
  };
  return { XLSX, writeRows, readRows };
}

describe("stripBom", () => {
  it("removes a leading UTF-8 BOM (Excel CSV exports carry one)", () => {
    expect(stripBom("\uFEFFa,b")).toBe("a,b");
    expect(stripBom("a,b")).toBe("a,b");
    expect(stripBom("")).toBe("");
  });
});

describe("detectDelimiter", () => {
  it("picks the dominant delimiter and ignores delimiters inside quotes", () => {
    expect(detectDelimiter("a,b\n1,2")).toBe(",");
    expect(detectDelimiter("a;b;c\n1;2;3")).toBe(";");
    expect(detectDelimiter("a\tb\n1\t2")).toBe("\t");
    expect(detectDelimiter('"a,b";c')).toBe(";");
  });

  it("falls back to comma for empty or ambiguous input", () => {
    expect(detectDelimiter("")).toBe(",");
    expect(detectDelimiter("hello")).toBe(",");
    expect(detectDelimiter("a,b;c\n1,2;3")).toBe(","); // 2 vs 2 tie → comma
  });
});

describe("parseCsv: RFC 4180 semantics", () => {
  it("parses plain rows and trims nothing", () => {
    expect(parseCsv("a,b,c\n1,2,3", ",")).toEqual([
      ["a", "b", "c"],
      ["1", "2", "3"],
    ]);
  });

  it("keeps commas, doubled quotes and embedded newlines inside quoted fields", () => {
    expect(parseCsv('name,score\n"Ada, Countess",9.5', ",")).toEqual([
      ["name", "score"],
      ["Ada, Countess", "9.5"],
    ]);
    expect(parseCsv('"say ""hi"""', ",")).toEqual([['say "hi"']]);
    expect(parseCsv('a,b\n"x\ny",2', ",")).toEqual([
      ["a", "b"],
      ["x\ny", "2"],
    ]);
  });

  it("normalizes CRLF and swallows the trailing newline", () => {
    expect(parseCsv("a,b\r\n1,2\r\n", ",")).toEqual([
      ["a", "b"],
      ["1", "2"],
    ]);
    expect(parseCsv("a,b\n1,2\n", ",")).toEqual([
      ["a", "b"],
      ["1", "2"],
    ]);
  });

  it("empty input yields no rows instead of throwing", () => {
    expect(parseCsv("", ",")).toEqual([]);
    expect(parseCsv("\n\n\r\n", ",")).toEqual([]);
  });

  it("handles Unicode and CJK cells, long input (≥10⁴ chars)", () => {
    expect(parseCsv("名字,分数\n王明,95\ngrüße,🚀", ",")).toEqual([
      ["名字", "分数"],
      ["王明", "95"],
      ["grüße", "🚀"],
    ]);
    const big = Array.from({ length: 2000 }, (_, i) => `${i},"值 ${i}",x${i}`).join("\n");
    const rows = parseCsv(big, ",");
    expect(rows).toHaveLength(2000);
    expect(rows[1999]).toEqual(["1999", "值 1999", "x1999"]);
  });

  it("drops fully blank rows but keeps empty cells inside real rows", () => {
    expect(parseCsv("a,b\n\n1,", ",")).toEqual([
      ["a", "b"],
      ["1", ""],
    ]);
  });
});

describe("rowsToCsv / csvCell: quoting and roundtrip", () => {
  const tricky: string[][] = [
    ["name", "note"],
    ["Ada, Countess", 'she said "hi"'],
    ["line\nbreak", "tab\there"],
    ["", "plain"],
    ["日本語", "🚀"],
  ];

  it("quotes only cells that need it", () => {
    expect(csvCell("a,b", ",")).toBe('"a,b"');
    expect(csvCell('say "hi"', ",")).toBe('"say ""hi"""');
    expect(csvCell("plain", ",")).toBe("plain");
    expect(csvCell("a,b", ";")).toBe("a,b");
  });

  it.each([",", ";", "\t"] as const)("roundtrips through parseCsv with %r", (delim) => {
    expect(parseCsv(rowsToCsv(tricky, delim), delim)).toEqual(tricky);
  });

  it("roundtrips 10⁴+ characters of data", () => {
    const big: string[][] = Array.from({ length: 2500 }, (_, i) => [`id ${i}`, `值 "${i}"`, "multi\nline"]);
    const csv = rowsToCsv(big, ",");
    expect(csv.length).toBeGreaterThan(10000);
    expect(parseCsv(csv, ",")).toEqual(big);
  });
});

describe("numericCell / aoaFromRows: number detection never loses bytes", () => {
  it("converts only strings that survive String(Number(s)) unchanged", () => {
    expect(numericCell("9.5")).toBe(9.5);
    expect(numericCell("-3")).toBe(-3);
    expect(numericCell("0")).toBe(0);
    expect(numericCell("123456789012345")).toBe(123456789012345);
    // byte-preserving exclusions
    expect(numericCell("007")).toBe("007");
    expect(numericCell("1e3")).toBe("1e3");
    expect(numericCell("0.500")).toBe("0.500");
    expect(numericCell("12.")).toBe("12.");
    expect(numericCell("12345678901234567890")).toBe("12345678901234567890");
    expect(numericCell("abc")).toBe("abc");
    expect(numericCell("")).toBe("");
    expect(numericCell(" 5")).toBe(" 5");
  });

  it("aoaFromRows converts per cell and can be disabled", () => {
    expect(aoaFromRows([["9.5", "007", "x"]])).toEqual([[9.5, "007", "x"]]);
    expect(aoaFromRows([["9.5", "007"]], false)).toEqual([["9.5", "007"]]);
  });
});

describe("rowsFromSheetMatrix: sheet_to_json output normalization", () => {
  it("stringifies numbers/booleans, empties nulls, drops blank rows", () => {
    expect(
      rowsFromSheetMatrix([
        [1, null],
        ["a", undefined],
        [true, "x"],
        [],
        ["", ""],
        [9.5, ""],
      ]),
    ).toEqual([
      ["1", ""],
      ["a", ""],
      ["true", "x"],
      ["9.5", ""],
    ]);
  });

  it("generatedHeader makes Column 1…N", () => {
    expect(generatedHeader(3)).toEqual(["Column 1", "Column 2", "Column 3"]);
  });
});

describe("sanitizeSheetName: Excel sheet-name rules", () => {
  it("strips forbidden characters : \\ / ? * [ ]", () => {
    expect(sanitizeSheetName("My:Sheet?")).toBe("MySheet");
    expect(sanitizeSheetName("a/b\\c[d]e*f")).toBe("abcdef");
  });

  it("truncates to 31 characters and keeps CJK", () => {
    expect(sanitizeSheetName("a".repeat(40))).toHaveLength(31);
    expect(sanitizeSheetName("成绩表")).toBe("成绩表");
  });

  it("falls back to Sheet1 when nothing remains", () => {
    expect(sanitizeSheetName("")).toBe("Sheet1");
    expect(sanitizeSheetName(":?*/\\[]")).toBe("Sheet1");
    expect(sanitizeSheetName("  ")).toBe("Sheet1");
  });
});

describe("SheetJS roundtrip in Node: xlsx → rows → xlsx", () => {
  const rows = [
    ["name", "score", "note"],
    ["Ada, Countess", "9.5", "数学"],
    ["grüß Gott", "line\nbreak", 'say "hi"'],
    ["日本語のセル", "007", "🚀"],
    ["王明", "0.500", "comma, inside"],
  ];

  it("rows → .xlsx bytes → rows is lossless (numbers stay numeric, text stays text)", async () => {
    const { writeRows, readRows } = await xlsxSteps();
    const buf = writeRows(aoaFromRows(rows), "grades");
    expect(readRows(buf, "grades")).toEqual(rows);
  });

  it("csv → parse → .xlsx bytes → rows matches the original rows", async () => {
    const { writeRows, readRows } = await xlsxSteps();
    const csv = rowsToCsv(rows, ",");
    const buf = writeRows(aoaFromRows(parseCsv(csv, ",")), "Sheet1");
    expect(readRows(buf, "Sheet1")).toEqual(rows);
  });

  it("multiple sheets survive: dirty names are sanitized before book_append_sheet (SheetJS rejects :\\/?*[])", async () => {
    const XLSX = await import("xlsx");
    const wb = XLSX.utils.book_new();
    // 直接用脏名会被 SheetJS 拒收 —— 引擎必须先过 sanitizeSheetName,这里走同一条路
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["a", 1]]), sanitizeSheetName("One:Two?"));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([["b", 2]]), "Second");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "buffer" }) as Buffer;
    const wb2 = XLSX.read(buf, { type: "buffer" });
    expect(wb2.SheetNames).toEqual(["OneTwo", "Second"]);
  });

  it("garbage bytes either throw or yield no usable rows — never a crash", async () => {
    const { readRows } = await xlsxSteps();
    let threw = false;
    let out: string[][] = [["sentinel"]];
    try {
      out = readRows(Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]), "nope");
    } catch {
      threw = true;
    }
    if (threw) expect(threw).toBe(true);
    else expect(out).toEqual([]);
  });
});
