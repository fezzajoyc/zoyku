import { describe, expect, it } from "vitest";
import { findJsonError, jsonBeautify, jsonMinify } from "@/tools/_lib/transforms";
import { formatJsonLossless, JSON_FORMAT_LIMITS, JsonFormatLimitError } from "@/tools/_lib/json-format";

// Independent lexical reference: remove whitespace only outside quoted strings.
function compactReference(source: string): string {
  return source.replace(/("(?:\\[\s\S]|[^"\\])*")|[ \t\r\n]+/g, (token) => token.startsWith('"') ? token : "");
}

const LIMITS = { inputCharacters: 1_000_000, outputCharacters: 4_000_000, maxDepth: 200, maxValues: 100_000 };

describe("lossless JSON formatting", () => {
  it("preserves unsafe integers, fractional zeros, negative zero and exponent spelling", () => {
    const source = " [ 9007199254740993, -9007199254740993, 1.2300, -0, -0.00, 1E+03, 1e-999, 1e999 ] ";
    const expected = "[9007199254740993,-9007199254740993,1.2300,-0,-0.00,1E+03,1e-999,1e999]";
    expect(jsonMinify(source)).toBe(expected);
    expect(jsonMinify(jsonBeautify(source))).toBe(expected);
  });

  it("preserves all original string escapes and literal Unicode", () => {
    const source = String.raw` { "\u0061" : "\u0041\/\n\r\t\b\f\"\\\uD83D\uDE00", "中文😀" : "café é" } `;
    expect(jsonMinify(source)).toBe(compactReference(source));
    expect(jsonMinify(jsonBeautify(source))).toBe(compactReference(source));
  });

  it("keeps duplicate members and the original order of numeric-looking keys", () => {
    const source = String.raw` { "2": 2, "10": 10, "1": 1, "a": 9007199254740993, "a": -0, "\u0061": 1.00 } `;
    expect(jsonMinify(source)).toBe(compactReference(source));
    expect(jsonMinify(jsonBeautify(source, 4, false))).toBe(compactReference(source));
  });

  it("only explicitly sorts by decoded keys, with stable equal keys and unchanged array order", () => {
    const source = String.raw`{"b":-0,"10":1e999,"2":9007199254740993,"a":1.2300,"\u0061":2e+3,"a":3,"arr":[{"z":1,"2":2,"10":3},4,2]}`;
    const expected = String.raw`{"10":1e999,"2":9007199254740993,"a":1.2300,"\u0061":2e+3,"a":3,"arr":[{"10":3,"2":2,"z":1},4,2],"b":-0}`;
    expect(jsonMinify(jsonBeautify(source, 2, true))).toBe(expected);
    expect(jsonMinify(jsonBeautify(source))).toBe(source);
  });

  it("sorts Unicode keys using deterministic UTF-16 code unit order", () => {
    const source = String.raw`{"😀":1,"é":2,"中":3,"a":4,"\u0061":5,"A":6}`;
    expect(jsonMinify(jsonBeautify(source, 2, true))).toBe(String.raw`{"A":6,"a":4,"\u0061":5,"é":2,"中":3,"😀":1}`);
  });

  it("never assigns user keys to objects or changes prototype-related members", () => {
    const source = '{"__proto__":{"polluted":true},"constructor":{"prototype":{"pwn":1}},"__proto__":-0}';
    expect(jsonMinify(jsonBeautify(source))).toBe(source);
    expect(jsonMinify(jsonBeautify(source, 2, true))).toBe('{"__proto__":{"polluted":true},"__proto__":-0,"constructor":{"prototype":{"pwn":1}}}');
    expect(Object.prototype).not.toHaveProperty("polluted");
    expect(Object.prototype).not.toHaveProperty("pwn");
  });

  it.each([2, 4, "\t"] as const)("supports %s indentation without changing tokens", (indent) => {
    const unit = typeof indent === "number" ? " ".repeat(indent) : indent;
    const source = '{"a":[1,{"b":"c"}]}';
    const expected = `\{\n${unit}"a": [\n${unit.repeat(2)}1,\n${unit.repeat(2)}\{\n${unit.repeat(3)}"b": "c"\n${unit.repeat(2)}\}\n${unit}]\n\}`;
    expect(jsonBeautify(source, indent)).toBe(expected);
    expect(jsonMinify(jsonBeautify(source, indent))).toBe(source);
  });

  it.each(["null", "true", "false", "0", "-0", '"\\ud800"', "[]", "{}"])("handles the root value %s", (source) => {
    expect(jsonMinify(` \t\n${source}\r `)).toBe(source);
    expect(jsonBeautify(source)).toBe(source);
  });

  it("keeps string whitespace while removing insignificant whitespace", () => {
    const source = String.raw` { "x": " a  b \t c \n d ", "empty": [ {}, [] ] } `;
    expect(jsonMinify(source)).toBe(compactReference(source));
  });

  it("matches an independent whitespace-only reference across generated nested documents", () => {
    const literals = ["1.00", "-0", "1E+003", "1e999", "9007199254740993", '"中文😀"', String.raw`"\u0061\/"`, "null", "false"];
    for (let seed = 0; seed < 180; seed++) {
      const value = literals[seed % literals.length];
      const source = ` { "2" : ${value}, "1": [ ${seed}, { "d": ${value}, "d": true } ], "空" : " x y " } `;
      const compact = compactReference(source);
      expect(jsonMinify(source)).toBe(compact);
      for (const indent of [2, 4, "\t"] as const) {
        const pretty = jsonBeautify(source, indent);
        expect(jsonMinify(pretty)).toBe(compact);
        expect(jsonBeautify(pretty, indent)).toBe(pretty);
      }
    }
  });

  it("preserves native JSON meaning for independently parsed ordinary valid inputs", () => {
    const values = [null, true, 123.5, "中文😀", [], {}, { list: [1, "a\tb", false], nested: { x: 2 } }];
    for (const value of values) {
      const source = JSON.stringify(value);
      expect(JSON.parse(jsonBeautify(source))).toEqual(value);
      expect(JSON.parse(jsonMinify(source))).toEqual(value);
    }
  });
});

describe("JSON syntax diagnostics remain strict and localized", () => {
  it.each(["", " ", "[1,]", "{\n  bad: 1\n}", "[1 2]", '{"a":1 "b":2}', "01", "1.", "1e", "+1", "NaN", "Infinity", "-", "tru", "truefalse", "null x", "{", "[", String.raw`"\x20"`, String.raw`"\u12xx"`, '"a\tb"', "\u00a0null", "{/*x*/}"])("rejects %j with the existing scanner's line and column", (source) => {
    const error = findJsonError(source);
    expect(error).not.toBeNull();
    const expected = `Line ${error!.line}, column ${error!.col}: ${error!.msg}`;
    expect(() => jsonBeautify(source)).toThrow(expected);
    expect(() => jsonMinify(source)).toThrow(expected);
  });

  it("reports the exact known 1-based location across lines", () => {
    expect(() => jsonBeautify('{\n  "a": 1,\n  "b": @@\n}')).toThrow("Line 3, column 8: Unexpected token '@'");
  });

  it("agrees with native strict-JSON syntax acceptance across deterministic mutations", () => {
    const documents = ['{"x":[1,true,null],"x":1e999}', '"中\\u0061"', "[[],{},-0.00]", "false"];
    const insertions = ["", ",", ":", "[", "]", "{", "}", "'", "\\", "0", "x", "\n", "\u0000"];
    for (let seed = 0; seed < 600; seed++) {
      const base = documents[seed % documents.length];
      const position = (seed * 13) % (base.length + 1);
      const source = base.slice(0, position) + insertions[Math.floor(seed / documents.length) % insertions.length] + base.slice(position + (seed % 3 === 0 ? 1 : 0));
      let nativeAccepts = true;
      try { JSON.parse(source); } catch { nativeAccepts = false; }
      if (nativeAccepts) expect(jsonMinify(source)).toBe(compactReference(source));
      else expect(() => jsonMinify(source)).toThrow();
    }
  });
});

describe("JSON formatting resource limits fail explicitly", () => {
  it("exports an immutable, explicit resource contract for the UI", () => {
    expect(JSON_FORMAT_LIMITS).toEqual(LIMITS);
    expect(Object.isFrozen(JSON_FORMAT_LIMITS)).toBe(true);
    expect(formatJsonLossless('{"x":-0}', { minify: true })).toBe('{"x":-0}');
    expect(() => formatJsonLossless("[1,]")).toThrow(SyntaxError);
  });

  it("allows exactly the input UTF-16 character limit and rejects one more", () => {
    expect(jsonMinify("0" + " ".repeat(LIMITS.inputCharacters - 1))).toBe("0");
    expect(() => jsonMinify("0" + " ".repeat(LIMITS.inputCharacters))).toThrow(/input.*1,?000,?000.*UTF-16/i);
    expect(() => jsonBeautify('"' + "😀".repeat(LIMITS.inputCharacters / 2) + '"')).toThrow(/input.*UTF-16/i);
  });

  it("allows exactly the maximum container depth and rejects the next level", () => {
    const atLimit = "[".repeat(LIMITS.maxDepth) + "0" + "]".repeat(LIMITS.maxDepth);
    expect(jsonMinify(atLimit)).toBe(atLimit);
    expect(jsonBeautify(atLimit, 0)).toBe(atLimit);
    expect(() => jsonMinify("[" + atLimit + "]")).toThrow(/maximum nesting depth.*200/i);
    expect(() => jsonBeautify("[".repeat(20_000))).toThrow(/maximum nesting depth.*200/i);
  });

  it("limits the total value count, including containers", () => {
    const atLimit = "[" + Array(LIMITS.maxValues - 1).fill("0").join(",") + "]";
    expect(jsonMinify(atLimit)).toBe(atLimit);
    expect(() => jsonMinify("[0," + atLimit.slice(1))).toThrow(/maximum value count.*100,?000/i);
  });

  it("allows exactly the output UTF-16 character limit and rejects expansion by one", () => {
    // D nested arrays with N leaves and 4 spaces take 4D² + N(4D+3) - 2 chars.
    // D=100, N=9826 gives 3,999,876. Replace the last 0 with 123 chars in quotes (+124).
    const make = (stringLength: number) => "[".repeat(100) + "0,".repeat(9825) + '"' + "x".repeat(stringLength) + '"' + "]".repeat(100);
    const atLimit = make(123);
    expect(jsonBeautify(atLimit, 4)).toHaveLength(LIMITS.outputCharacters);
    expect(() => jsonBeautify(make(124), 4)).toThrow(/output.*4,?000,?000.*UTF-16/i);
    expect(jsonMinify(make(124))).toBe(make(124));
  });

  it("handles over ten thousand Unicode characters without truncation", () => {
    const source = JSON.stringify({ text: "中文😀é".repeat(5000) });
    expect(jsonMinify(jsonBeautify(source))).toBe(source);
  });

  it("exposes a typed resource error rather than converting a limit rejection into syntax diagnostics", () => {
    try {
      jsonMinify("[".repeat(LIMITS.maxDepth + 1));
      throw new Error("Expected a resource rejection");
    } catch (error) {
      expect(error).toBeInstanceOf(JsonFormatLimitError);
      expect((error as JsonFormatLimitError).kind).toBe("depth");
      expect((error as Error).name).toBe("JsonFormatLimitError");
      expect((error as Error).message).not.toContain("Line ");
    }
  });
});
