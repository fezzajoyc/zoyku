import { describe, expect, it } from "vitest";
import { convertYamlJson } from "@/tools/_lib/yaml-converter";

describe("bounded JSON and YAML conversion", () => {
  it.each([98, 99, 100])("round-trips data at supported nesting depth %i", async depth => {
    const input = "[".repeat(depth) + "0" + "]".repeat(depth);
    const forward = await convertYamlJson(input, "json2yaml");
    expect(forward.ok).toBe(true);
    if (!forward.ok) return;
    const reverse = await convertYamlJson(forward.output, "yaml2json");
    expect(reverse.ok).toBe(true);
    if (reverse.ok) expect(JSON.parse(reverse.output)).toEqual(JSON.parse(input));
  });
  it("round-trips nested JSON, strings, null and booleans in both directions", async () => {
    const input = '{"name":"中😀","values":[1,0.1,true,null,"NO","Norway","2026-01-01"],"__proto__":{"x":1}}';
    const yaml = await convertYamlJson(input, "json2yaml");
    expect(yaml.ok).toBe(true);
    if (!yaml.ok) return;
    const json = await convertYamlJson(yaml.output, "yaml2json");
    expect(json.ok).toBe(true);
    if (json.ok) expect(JSON.parse(json.output)).toEqual(JSON.parse(input));
  });
  it("keeps date-like and legacy YAML words as strings", async () => {
    const result = await convertYamlJson("date: 2026-01-01\ncountry: NO\nword: Norway\nflag: on", "yaml2json");
    expect(result.ok).toBe(true);
    if (result.ok) expect(JSON.parse(result.output)).toEqual({ date: "2026-01-01", country: "NO", word: "Norway", flag: "on" });
  });
  it.each(['{"x":1,"x":2}', '{"a":1,"\\u0061":2}'])("rejects duplicate decoded JSON keys %s", async input => {
    expect(await convertYamlJson(input, "json2yaml")).toMatchObject({ ok: false, error: { code: "duplicate" } });
  });
  it.each(["x: 1\nx: 2", "a: [", "---\na: 1\n---\nb: 2"])("rejects invalid or multiple YAML documents %s", async input => {
    expect((await convertYamlJson(input, "yaml2json")).ok).toBe(false);
  });
  it.each(["a: &x [1]\nb: *x", "a: &x [*x]", "!!timestamp 2026-01-01"])("rejects reference/tag constructs before expansion %s", async input => {
    expect(await convertYamlJson(input, "yaml2json")).toMatchObject({ ok: false, error: { code: "features" } });
  });
  it.each(["9007199254740993", "-0", "-0.0", "1e999", "1e-999", "0.1234567890123456789"])("rejects JSON numeric data loss %s", async value => {
    expect(await convertYamlJson(`{"x":${value}}`, "json2yaml")).toMatchObject({ ok: false, error: { code: "number" } });
  });
  it.each(["9007199254740993", "-0", "-0.0", "1e999", "1e-999", "0.1234567890123456789", ".nan", ".inf", "1.e-999", "1234567890123456789.e-20"])("rejects YAML numeric data loss %s", async value => {
    expect(await convertYamlJson(`x: ${value}`, "yaml2json")).toMatchObject({ ok: false, error: { code: "number" } });
  });
  it("rejects non-string YAML keys", async () => {
    expect(await convertYamlJson("1: one", "yaml2json")).toMatchObject({ ok: false, error: { code: "features" } });
  });
  it.each(["json2yaml", "yaml2json"] as const)("rejects empty, excessive size and depth in %s", async direction => {
    expect(await convertYamlJson(" ", direction)).toMatchObject({ ok: false, error: { code: "empty" } });
    expect(await convertYamlJson("x".repeat(100001), direction)).toMatchObject({ ok: false, error: { code: "limit" } });
    expect((await convertYamlJson("[".repeat(110) + "0" + "]".repeat(110), direction)).ok).toBe(false);
  });
});
