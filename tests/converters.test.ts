/**
 * Engine tests for tools/_lib/converters.ts — every exported pure function.
 * Matrix per the zoyku standard: normal values (exact, hand-computed),
 * empty input, boundaries, invalid input (graceful, never an unhandled
 * throw), Unicode & CJK, roundtrip. XML roundtrip is cross-checked against
 * fast-xml-parser (the xml-to-json tool's engine); base64 is cross-checked
 * against Node's Buffer.
 */
import { describe, expect, it } from "vitest";
import { XMLParser } from "fast-xml-parser";
import {
  aoaFromRows,
  base64ByteLength,
  base64ToBytes,
  bytesToBase64,
  ConvertError,
  csvCell,
  detectDelimiter,
  escapeXmlAttr,
  escapeXmlText,
  generatedHeader,
  guessImageMimeFromBytes,
  imageMimeToExt,
  isImageMime,
  imageMimeToExt as extOf,
  jsonToXml,
  numericCell,
  parseCsv,
  parseDataUrl,
  rowsFromSheetMatrix,
  rowsToCsv,
  sanitizeSheetName,
  stripBom,
  toXmlName,
} from "@/tools/_lib/converters";

/** Same parser configuration as the xml-to-json tool engine. */
const FXP = { ignoreAttributes: false, attributeNamePrefix: "@", trimValues: true };
const parseXml = (xml: string): unknown => new XMLParser(FXP).parse(xml);

/** Well-known 1×1 PNG (the decode-mode sample in the engine). */
const TINY_PNG_B64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
const TINY_PNG_URL = `data:image/png;base64,${TINY_PNG_B64}`;

/* ------------------------------------------------------------------ */
/* CSV / sheet helpers                                                 */
/* ------------------------------------------------------------------ */

describe("stripBom", () => {
  it("removes a leading UTF-8 BOM and keeps everything else", () => {
    expect(stripBom("\uFEFFa,b")).toBe("a,b");
  });

  it("leaves text without a BOM untouched", () => {
    expect(stripBom("plain")).toBe("plain");
    expect(stripBom("")).toBe("");
  });
});

describe("detectDelimiter", () => {
  it("picks the character that appears most often outside quotes", () => {
    expect(detectDelimiter("a,b\nc,d")).toBe(",");
    expect(detectDelimiter("a;b\nc;d")).toBe(";");
    expect(detectDelimiter("a\tb\nc\td")).toBe("\t");
  });

  it("ignores separators inside quoted fields", () => {
    // the only unquoted separator is ";", commas live inside quotes
    expect(detectDelimiter('"1,5";a\n"2,0";b')).toBe(";");
  });

  it("falls back to comma for empty or ambiguous input", () => {
    expect(detectDelimiter("")).toBe(",");
    expect(detectDelimiter("solo")).toBe(",");
  });
});

describe("parseCsv", () => {
  it("splits simple rows and cells", () => {
    expect(parseCsv("a,b\nc,d", ",")).toEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
  });

  it("keeps separators, escaped quotes and newlines inside quoted fields", () => {
    expect(parseCsv('"x,y",z', ",")).toEqual([["x,y", "z"]]);
    expect(parseCsv('"he said ""hi""",x', ",")).toEqual([['he said "hi"', "x"]]);
    expect(parseCsv('"a\nb",c', ",")).toEqual([["a\nb", "c"]]);
  });

  it("normalizes CRLF and tolerates a trailing newline", () => {
    expect(parseCsv("a,b\r\nc,d", ",")).toEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
    expect(parseCsv("a,b\n", ",")).toEqual([["a", "b"]]);
  });

  it("keeps empty cells and strips the BOM", () => {
    expect(parseCsv("a,,c", ",")).toEqual([["a", "", "c"]]);
    expect(parseCsv("\uFEFFa,b", ",")).toEqual([["a", "b"]]);
  });

  it("returns no rows for empty input", () => {
    expect(parseCsv("", ",")).toEqual([]);
  });
});

describe("csvCell / rowsToCsv", () => {
  it("quotes only when needed and doubles embedded quotes", () => {
    expect(csvCell("plain", ",")).toBe("plain");
    expect(csvCell("a,b", ",")).toBe('"a,b"');
    expect(csvCell('say "hi"', ",")).toBe('"say ""hi"""');
    expect(csvCell("a\nb", ",")).toBe('"a\nb"');
    // a comma is not special under a semicolon delimiter
    expect(csvCell("a,b", ";")).toBe("a,b");
  });

  it("roundtrips tricky rows byte-for-byte through parseCsv", () => {
    const rows = [
      ["name", "note", "名前"],
      ["张三", 'said "hi", loudly\ntwice', "太郎"],
      ["emoji", "😀 🎉", ""],
    ];
    expect(parseCsv(rowsToCsv(rows, ","), ",")).toEqual(rows);
  });
});

describe("numericCell / aoaFromRows / rowsFromSheetMatrix / generatedHeader", () => {
  it("converts only lossless numbers, keeps text like 007 and 1e3", () => {
    expect(numericCell("9.5")).toBe(9.5);
    expect(numericCell("-3")).toBe(-3);
    expect(numericCell("0")).toBe(0);
    expect(numericCell("007")).toBe("007");
    expect(numericCell("1e3")).toBe("1e3");
    expect(numericCell("0.500")).toBe("0.500");
    expect(numericCell("")).toBe("");
    expect(numericCell("abc")).toBe("abc");
  });

  it("applies number recognition per aoaFromRows option", () => {
    expect(aoaFromRows([["a", "9.5"]])).toEqual([["a", 9.5]]);
    expect(aoaFromRows([["a", "9.5"]], false)).toEqual([["a", "9.5"]]);
  });

  it("stringifies sheet cells, drops fully empty rows, generates headers", () => {
    expect(rowsFromSheetMatrix([[1, undefined], [null, "x"]])).toEqual([
      ["1", ""],
      ["", "x"],
    ]);
    expect(rowsFromSheetMatrix([["1"], ["", ""], ["2"]])).toEqual([["1"], ["2"]]);
    expect(generatedHeader(3)).toEqual(["Column 1", "Column 2", "Column 3"]);
    expect(generatedHeader(0)).toEqual([]);
  });
});

describe("sanitizeSheetName", () => {
  it("strips forbidden characters and truncates to 31 chars", () => {
    expect(sanitizeSheetName("a:b/c?d")).toBe("abcd");
    expect(sanitizeSheetName("x".repeat(40))).toBe("x".repeat(31));
  });

  it("falls back to Sheet1 for empty results", () => {
    expect(sanitizeSheetName("")).toBe("Sheet1");
    expect(sanitizeSheetName("  ")).toBe("Sheet1");
    expect(sanitizeSheetName(":::")).toBe("Sheet1");
  });
});

/* ------------------------------------------------------------------ */
/* XML name sanitizing & escaping                                      */
/* ------------------------------------------------------------------ */

describe("toXmlName", () => {
  it("keeps legal ASCII and Unicode (CJK, accents) names untouched", () => {
    expect(toXmlName("name")).toBe("name");
    expect(toXmlName("名前")).toBe("名前");
    expect(toXmlName("café")).toBe("café");
    expect(toXmlName("a:b")).toBe("a:b");
    expect(toXmlName("a-1.b")).toBe("a-1.b");
  });

  it("replaces illegal characters and prefixes a bad start", () => {
    expect(toXmlName("123")).toBe("_123");
    expect(toXmlName("a b")).toBe("a_b");
    expect(toXmlName("a&b")).toBe("a_b");
    expect(toXmlName("😀")).toBe("_");
    expect(toXmlName("")).toBe("_");
  });
});

describe("escapeXmlText / escapeXmlAttr", () => {
  it("escapes the five XML specials", () => {
    expect(escapeXmlText('&<>"\'')).toBe("&amp;&lt;&gt;&quot;&apos;");
    expect(escapeXmlAttr('&<>"\'')).toBe("&amp;&lt;&gt;&quot;&apos;");
  });

  it("leaves ordinary Unicode text alone", () => {
    expect(escapeXmlText("café 太郎 😀")).toBe("café 太郎 😀");
  });
});

/* ------------------------------------------------------------------ */
/* jsonToXml                                                           */
/* ------------------------------------------------------------------ */

describe("jsonToXml", () => {
  it("serializes a flat object under a default root with declaration", () => {
    expect(jsonToXml({ a: "1", b: "x" })).toBe(
      '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <a>1</a>\n  <b>x</b>\n</root>',
    );
  });

  it("can omit the declaration and take a custom root name and indent", () => {
    expect(jsonToXml({ a: "1" }, { declaration: false, rootName: "book" })).toBe(
      "<book>\n  <a>1</a>\n</book>",
    );
    expect(jsonToXml({ a: "1" }, { declaration: false, indent: 4 })).toBe(
      "<root>\n    <a>1</a>\n</root>",
    );
  });

  it("nests objects deeply with 2-space levels", () => {
    expect(jsonToXml({ a: { b: { c: "deep" } } }, { declaration: false })).toBe(
      "<root>\n  <a>\n    <b>\n      <c>deep</c>\n    </b>\n  </a>\n</root>",
    );
  });

  it("repeats the key once per array item (no singularization)", () => {
    expect(jsonToXml({ items: ["a", "b"] }, { declaration: false })).toBe(
      "<root>\n  <items>a</items>\n  <items>b</items>\n</root>",
    );
  });

  it("maps @ / @_ keys to attributes and #text to text content", () => {
    expect(jsonToXml({ a: { "@id": "1", "#text": "hi" } }, { declaration: false })).toBe(
      "<root>\n  <a id=\"1\">hi</a>\n</root>",
    );
    expect(jsonToXml({ a: { "@_id": "1" } }, { declaration: false })).toBe(
      '<root>\n  <a id="1" />\n</root>',
    );
    expect(jsonToXml({ a: { "@id": "1", b: "2" } }, { declaration: false })).toBe(
      '<root>\n  <a id="1">\n    <b>2</b>\n  </a>\n</root>',
    );
  });

  it("renders empty objects, null and skipped undefined as empty elements", () => {
    expect(jsonToXml({ a: {} }, { declaration: false })).toBe("<root>\n  <a />\n</root>");
    expect(jsonToXml({ a: null }, { declaration: false })).toBe("<root>\n  <a />\n</root>");
    expect(jsonToXml({ a: undefined }, { declaration: false })).toBe("<root />");
    expect(jsonToXml({}, { declaration: false })).toBe("<root />");
  });

  it("escapes & < > \" ' in text and attribute values", () => {
    expect(jsonToXml({ s: 'a&b<c>d"e\'f' }, { declaration: false })).toBe(
      "<root>\n  <s>a&amp;b&lt;c&gt;d&quot;e&apos;f</s>\n</root>",
    );
    expect(jsonToXml({ a: { '@t': `x"y'z&w` } }, { declaration: false })).toBe(
      '<root>\n  <a t="x&quot;y&apos;z&amp;w" />\n</root>',
    );
  });

  it("preserves CJK and emoji in names and values", () => {
    expect(jsonToXml({ 名前: "太郎 😀" }, { declaration: false })).toBe(
      "<root>\n  <名前>太郎 😀</名前>\n</root>",
    );
  });

  it("sanitizes illegal element names instead of emitting invalid XML", () => {
    expect(jsonToXml({ "123": "x", "a b": "y" }, { declaration: false })).toBe(
      "<root>\n  <_123>x</_123>\n  <a_b>y</a_b>\n</root>",
    );
  });

  it("wraps a root-level array as <root><item>…</item></root>", () => {
    expect(jsonToXml(["a", "b"], { declaration: false })).toBe(
      "<root>\n  <item>a</item>\n  <item>b</item>\n</root>",
    );
  });

  it("puts root primitives directly into the root element", () => {
    expect(jsonToXml("hello", { declaration: false })).toBe("<root>hello</root>");
    expect(jsonToXml(42, { declaration: false })).toBe("<root>42</root>");
    expect(jsonToXml(null, { declaration: false })).toBe("<root />");
  });

  it("renders NaN and Infinity like null (JSON.stringify semantics)", () => {
    expect(jsonToXml({ a: Number.NaN, b: Number.POSITIVE_INFINITY }, { declaration: false })).toBe(
      "<root>\n  <a />\n  <b />\n</root>",
    );
  });

  it("produces no element for empty arrays (repeated elements of zero items)", () => {
    expect(jsonToXml({ a: [] }, { declaration: false })).toBe("<root />");
  });

  it("throws ConvertError on circular references — objects and arrays alike", () => {
    const obj: Record<string, unknown> = {};
    obj.me = obj;
    expect(() => jsonToXml(obj)).toThrow(ConvertError);
    const arr: unknown[] = ["x"];
    arr.push(arr);
    expect(() => jsonToXml({ list: arr })).toThrow(/Circular reference/);
  });

  it("throws a friendly error when an attribute value is not a primitive", () => {
    expect(() => jsonToXml({ a: { "@x": { deep: true } } })).toThrow(ConvertError);
    expect(() => jsonToXml({ a: { "@x": ["no"] } })).toThrow(/Attribute "@x"/);
    expect(() => jsonToXml({ a: { "#text": {} } })).toThrow(/#text/);
  });

  it("handles ≥10⁴ characters of input without blowing up", () => {
    const big = Object.fromEntries(Array.from({ length: 5000 }, (_, i) => [`k${i}`, i]));
    const out = jsonToXml(big, { declaration: false });
    expect(out.length).toBeGreaterThan(10_000);
    expect(out.match(/<k\d+>/g)).toHaveLength(5000);
  });
});

/* ------------------------------------------------------------------ */
/* jsonToXml ⇄ fast-xml-parser roundtrip                               */
/* ------------------------------------------------------------------ */

describe("jsonToXml roundtrip through fast-xml-parser", () => {
  it("roundtrips a representative string-only document exactly", () => {
    const sample = {
      user: {
        "@id": "42",
        "@active": "true",
        name: "Ada Lovelace",
        email: "ada@example.com",
        tags: { tag: ["math", "computing"] },
      },
    };
    const xml = jsonToXml(sample, { declaration: false });
    expect(parseXml(xml)).toEqual({
      root: {
        user: {
          "@id": "42",
          "@active": "true",
          name: "Ada Lovelace",
          email: "ada@example.com",
          tags: { tag: ["math", "computing"] },
        },
      },
    });
  });

  it("survives escaping roundtrip with XML specials, CJK and emoji", () => {
    const sample = { s: 'a & b < c > d "e" \'f\'', 名前: "太郎 & 花子 😀" };
    expect(parseXml(jsonToXml(sample, { declaration: false }))).toEqual({ root: sample });
  });

  it("roundtrips attributes plus text content via #text", () => {
    const sample = { p: { "@lang": "en", "#text": "hello world" } };
    expect(parseXml(jsonToXml(sample, { declaration: false }))).toEqual({ root: sample });
  });

  it("lets fast-xml-parser coerce numeric/boolean tag text back to JSON types (attributes stay strings)", () => {
    const xml = jsonToXml({ a: { n: 42, ok: true, f: 1.5 } }, { declaration: false });
    expect(parseXml(xml)).toEqual({
      root: { a: { n: 42, ok: true, f: 1.5 } },
    });
  });

  it("wraps a root array into <root><item>…</item></root> on the way back", () => {
    expect(parseXml(jsonToXml(["a", "b"], { declaration: false }))).toEqual({
      root: { item: ["a", "b"] },
    });
  });

  it("roundtrips a root-level array of objects with nested data", () => {
    const items = [
      { "@sku": "A-1", "@price": "9.90", names: { n: ["alpha", "beta"] } },
      { "@sku": "B-2", "@price": "3.50", names: { n: ["gamma", "delta"] } },
    ];
    expect(parseXml(jsonToXml(items, { declaration: false }))).toEqual({
      root: { item: items },
    });
  });
});

/* ------------------------------------------------------------------ */
/* base64 encode / decode                                              */
/* ------------------------------------------------------------------ */

describe("bytesToBase64", () => {
  it("matches hand-computed values for tiny inputs", () => {
    expect(bytesToBase64(new Uint8Array([0]))).toBe("AA==");
    expect(bytesToBase64(new TextEncoder().encode("hi"))).toBe("aGk=");
    expect(bytesToBase64(new TextEncoder().encode("hi!"))).toBe("aGkh");
  });

  it("encodes an empty input to an empty string", () => {
    expect(bytesToBase64(new Uint8Array(0))).toBe("");
  });

  it("matches Node's Buffer for every 1..255 byte, CJK and a large random buffer", () => {
    for (let n = 1; n <= 255; n++) {
      const bytes = Uint8Array.from({ length: n }, (_, i) => i & 0xff);
      expect(bytesToBase64(bytes)).toBe(Buffer.from(bytes).toString("base64"));
    }
    const cjk = new TextEncoder().encode("中文");
    expect(bytesToBase64(cjk)).toBe("5Lit5paH");
    // deterministic pseudo-random 10 kB buffer
    let seed = 42;
    const big = Uint8Array.from({ length: 10_000 }, () => (seed = (seed * 1103515245 + 12345) & 0xff));
    expect(bytesToBase64(big)).toBe(Buffer.from(big).toString("base64"));
  });
});

describe("base64ToBytes", () => {
  it("decodes standard base64 exactly", () => {
    expect(base64ToBytes("AA==")).toEqual(new Uint8Array([0]));
    expect(base64ToBytes("aGk=")).toEqual(new TextEncoder().encode("hi"));
    expect(base64ToBytes("5Lit5paH")).toEqual(new TextEncoder().encode("中文"));
  });

  it("tolerates missing padding and whitespace", () => {
    expect(base64ToBytes("aGk")).toEqual(new TextEncoder().encode("hi"));
    expect(base64ToBytes("a Gk\n=")).toEqual(new TextEncoder().encode("hi"));
    expect(base64ToBytes("")).toEqual(new Uint8Array(0));
  });

  it("returns null (never throws) for invalid base64", () => {
    expect(base64ToBytes("A")).toBeNull(); // impossible length n % 4 === 1
    expect(base64ToBytes("AB!c")).toBeNull(); // illegal character
    expect(base64ToBytes("====")).toBeNull(); // more than two padding chars
    expect(base64ToBytes("Zh==")).toBeNull(); // non-zero trailing bits
    expect(base64ToBytes("AB=C")).toBeNull(); // padding in the middle
  });

  it("roundtrips 1000 deterministic pseudo-random buffers", () => {
    let seed = 7;
    for (let i = 0; i < 100; i++) {
      const len = i * 37; // 0…, hits every length mod 3
      const bytes = Uint8Array.from({ length: len }, () => (seed = (seed * 16807) & 0x7fffffff) & 0xff);
      const decoded = base64ToBytes(bytesToBase64(bytes));
      expect(decoded).not.toBeNull();
      expect(Buffer.from(decoded as Uint8Array).equals(Buffer.from(bytes))).toBe(true);
    }
  });
});

describe("base64ByteLength", () => {
  it("returns the decoded byte length without decoding", () => {
    expect(base64ByteLength("")).toBe(0);
    expect(base64ByteLength("AA==")).toBe(1);
    expect(base64ByteLength("aGk=")).toBe(2);
    expect(base64ByteLength("aGkh")).toBe(3);
    expect(base64ByteLength("aGk")).toBe(2); // unpadded
    expect(base64ByteLength(TINY_PNG_B64)).toBe(base64ToBytes(TINY_PNG_B64)?.length ?? -1);
  });

  it("returns -1 for impossible lengths or excessive padding", () => {
    expect(base64ByteLength("A")).toBe(-1);
    expect(base64ByteLength("====")).toBe(-1);
  });
});

/* ------------------------------------------------------------------ */
/* data URL parsing & image type detection                             */
/* ------------------------------------------------------------------ */

describe("parseDataUrl", () => {
  it("parses a valid PNG data URL: mime, payload and bytes", () => {
    const parsed = parseDataUrl(TINY_PNG_URL);
    expect(parsed).not.toBeNull();
    expect(parsed?.mime).toBe("image/png");
    expect(parsed?.base64).toBe(TINY_PNG_B64);
    expect(parsed?.bytes[0]).toBe(0x89);
    expect(guessImageMimeFromBytes(parsed?.bytes ?? new Uint8Array())).toBe("image/png");
  });

  it("tolerates surrounding whitespace and newlines inside the payload", () => {
    const parsed = parseDataUrl(`data:image/jpeg;base64,${TINY_PNG_B64.slice(0, 20)}\n${TINY_PNG_B64.slice(20)}\n`);
    expect(parsed?.base64).toBe(TINY_PNG_B64);
  });

  it("lowercases the declared MIME type", () => {
    expect(parseDataUrl(`DATA:IMAGE/PNG;BASE64,${TINY_PNG_B64}`)?.mime).toBe("image/png");
  });

  it("rejects non-data URLs, missing MIME, and percent-encoded payloads", () => {
    expect(parseDataUrl("http://example.com/x.png")).toBeNull();
    expect(parseDataUrl("")).toBeNull();
    expect(parseDataUrl("not a url at all")).toBeNull();
    expect(parseDataUrl(`data:;base64,${TINY_PNG_B64}`)).toBeNull();
    expect(parseDataUrl("data:image/svg+xml,%3Csvg%20xmlns")).toBeNull();
  });

  it("rejects invalid base64 payloads gracefully", () => {
    expect(parseDataUrl("data:image/png;base64,!!!")).toBeNull();
    expect(parseDataUrl("data:image/png;base64,A")).toBeNull();
  });
});

describe("isImageMime / imageMimeToExt", () => {
  it("accepts known image MIMEs case-insensitively and rejects the rest", () => {
    expect(isImageMime("image/png")).toBe(true);
    expect(isImageMime("IMAGE/JPEG")).toBe(true);
    expect(isImageMime("image/svg+xml")).toBe(true);
    expect(isImageMime("text/plain")).toBe(false);
    expect(isImageMime("application/json")).toBe(false);
  });

  it("maps MIME to a sensible file extension with an img fallback", () => {
    expect(extOf("image/png")).toBe("png");
    expect(extOf("image/jpeg")).toBe("jpg");
    expect(extOf("image/svg+xml")).toBe("svg");
    expect(extOf("image/x-icon")).toBe("ico");
    expect(extOf("image/webp")).toBe("webp");
    expect(imageMimeToExt("image/unknown")).toBe("img");
  });
});

describe("guessImageMimeFromBytes", () => {
  it("detects raster formats from magic bytes", () => {
    const png = base64ToBytes(TINY_PNG_B64) as Uint8Array;
    expect(guessImageMimeFromBytes(png)).toBe("image/png");
    expect(guessImageMimeFromBytes(Uint8Array.of(0xff, 0xd8, 0xff, 0xe0))).toBe("image/jpeg");
    expect(guessImageMimeFromBytes(new TextEncoder().encode("GIF89a\x01\x00"))).toBe("image/gif");
    const webp = new TextEncoder().encode("RIFF\x00\x00\x00\x00WEBPVP8 ");
    expect(guessImageMimeFromBytes(webp)).toBe("image/webp");
    expect(guessImageMimeFromBytes(new TextEncoder().encode("BM\x00\x00"))).toBe("image/bmp");
    const avif = new TextEncoder().encode("\x00\x00\x00\x20ftypavif\x00\x00");
    expect(guessImageMimeFromBytes(avif)).toBe("image/avif");
    const heic = new TextEncoder().encode("\x00\x00\x00\x20ftypheic\x00\x00");
    expect(guessImageMimeFromBytes(heic)).toBe("image/heic");
  });

  it("detects SVG text (with BOM/whitespace) and returns null for non-images", () => {
    expect(guessImageMimeFromBytes(new TextEncoder().encode("<svg xmlns='x'></svg>"))).toBe("image/svg+xml");
    expect(guessImageMimeFromBytes(new TextEncoder().encode("\uFEFF  <?xml version='1.0'?><svg/>"))).toBe("image/svg+xml");
    expect(guessImageMimeFromBytes(new TextEncoder().encode("hello, world"))).toBeNull();
    expect(guessImageMimeFromBytes(new Uint8Array(0))).toBeNull();
    expect(guessImageMimeFromBytes(new TextEncoder().encode("<div>html</div>"))).toBeNull();
  });
});
