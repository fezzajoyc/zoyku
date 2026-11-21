import { describe, expect, it } from "vitest";
import { generateTextSequence, SEQUENCE_LIMITS, type TextSequenceOptions } from "@/tools/_lib/string-sequence";
import { parseLocaleNumber } from "@/tools/_lib/numparse";
const options = { start: "1", step: "1", count: 3 };
describe("exact finite decimal text sequences", () => {
  it("uses exact decimal steps without binary floating-point accumulation", () => {
    expect(generateTextSequence({ start: "0.1", step: "0.2", count: 5 })).toEqual({ out: "0.1\n0.3\n0.5\n0.7\n0.9", error: null, count: 5, first: "0.1", last: "0.9" });
    expect(generateTextSequence({ start: "9007199254740993.000000000000000001", step: "0.000000000000000001", count: 3 }).out).toBe("9007199254740993.000000000000000001\n9007199254740993.000000000000000002\n9007199254740993.000000000000000003");
  });
  it("handles negative, zero and descending steps, sign-aware zero padding and canonical negative zero", () => {
    expect(generateTextSequence({ start: "-1.5", step: "0.5", count: 5, integerWidth: 3, prefix: "ID-", suffix: ":x", separator: "," }).out).toBe("ID--001.5:x,ID--001:x,ID--000.5:x,ID-000:x,ID-000.5:x");
    expect(generateTextSequence({ start: "1", step: "-0.25", count: 3 }).out).toBe("1\n0.75\n0.5");
    expect(generateTextSequence({ start: "-0.00", step: "0", count: 2 }).out).toBe("0\n0");
  });
  it.each(["1,234", "0,125", "1.234", "1,234.5", "1.234,5", "1.000.000", "1,5"])("uses the site number separator meaning for %s without lossy conversion", (start) => {
    const result = generateTextSequence({ start, step: "0", count: 1 });
    expect(result.error).toBeNull(); expect(result.out).toBe(String(parseLocaleNumber(start)));
  });
  it("uses literal prefix, suffix and separators without interpolation or escaping", () => {
    expect(generateTextSequence({ ...options, count: 2, prefix: "${x}", suffix: "$&", separator: "\\n" }).out).toBe("${x}1$&\\n${x}2$&");
  });
  it("returns no partial output when options or resources are invalid", () => {
    const invalid = [null, [], { ...options, count: 0 }, { ...options, count: 10001 }, { ...options, count: 1.2 }, { ...options, integerWidth: 0 }, { ...options, integerWidth: 61 }, { ...options, prefix: "x".repeat(129) }, { ...options, start: "1e3" }, { ...options, start: "x+1" }, { ...options, start: "" }, { ...options, start: "1".repeat(97) }, { ...options, step: "0." + "0".repeat(18) + "1" }, { ...options, start: "1".repeat(61) }];
    for (const value of invalid) {
      const result = generateTextSequence(value as TextSequenceOptions);
      expect(result.error, JSON.stringify(value)).not.toBeNull(); expect(result.out).toBe(""); expect(result.count).toBe(0);
    }
    expect(generateTextSequence({ ...options, count: 10000, prefix: "x".repeat(128) }).error).toBe("output-limit");
  });
  it("supports the exact count and numeric limits without shortening large numbers", () => {
    const result = generateTextSequence({ start: "9".repeat(60), step: "1", count: 10000, separator: "" });
    expect(result.error).toBe("output-limit");
    const single = generateTextSequence({ start: "9".repeat(60), step: "1", count: 2, integerWidth: 1 });
    expect(single.last).toBe("1" + "0".repeat(60));
    expect(generateTextSequence({ ...options, count: 10000 }).count).toBe(10000);
    expect(SEQUENCE_LIMITS).toMatchObject({ count: 10000, outputCharacters: 500000, decimalPlaces: 18 });
  });
});
