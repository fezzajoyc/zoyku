import { describe, expect, it } from "vitest";
import { decodeJwt, JWT_INPUT_LIMIT, jwtTimeClaim } from "@/tools/_lib/jwt";

const b64 = (text: string) => Buffer.from(text).toString("base64url");
const jwt = (payload: string, header = '{"alg":"HS256","typ":"JWT"}') => `${b64(header)}.${b64(payload)}.eA`;

describe("lossless JWT inspection", () => {
  it("decodes UTF-8 JSON objects and preserves numeric spelling", () => {
    const result = decodeJwt(jwt('{"name":"张三😀","id":9007199254740993,"huge":1e309,"tiny":1e-999}'));
    expect(result.payloadText).toContain('"name": "张三😀"');
    for (const raw of ["9007199254740993", "1e309", "1e-999"]) expect(result.payloadText).toContain(raw);
    expect(result.signature).toBe("eA");
  });
  it("retains inspection of two-part and empty-signature tokens without claiming verification", () => {
    const two = `${b64("{}")} .${b64("{}")}`.replace(" ", "");
    expect(decodeJwt(two).signature).toBeNull();
    expect(decodeJwt(`${two}.`).signature).toBe("");
  });
  it.each(["", "a", "a.b.c.d", "=.e30.x", "e30.e30.+", "e30.e 30.x", "e30=.e30.x", "e30.e30.x="])("rejects malformed compact input %j", (value) => {
    expect(() => decodeJwt(value)).toThrow();
  });
  it.each(["null", "[]", "true", "42", '"str"'])("requires objects for payload and header: %s", (value) => {
    expect(() => decodeJwt(jwt(value))).toThrow();
    expect(() => decodeJwt(jwt("{}", value))).toThrow();
  });
  it("rejects invalid UTF-8 instead of replacing bytes", () => {
    expect(() => decodeJwt(`${b64("{}")}.${Buffer.from([123,34,120,34,58,34,255,34,125]).toString("base64url")}.x`)).toThrow();
  });
  it("rejects decoded duplicate top-level keys, including escaped spellings", () => {
    expect(() => decodeJwt(jwt('{"exp":1,"\\u0065xp":2}'))).toThrow();
    expect(() => decodeJwt(jwt("{}", '{"alg":"none","alg":"HS256"}'))).toThrow();
  });
  it("does not assign prototype keys or silently collapse nested JSON", () => {
    const result = decodeJwt(jwt('{"__proto__":{"polluted":1},"nested":{"a":1,"a":2}}'));
    expect(result.payloadText).toContain('"__proto__"');
    expect(result.payloadText.match(/"a":/g)).toHaveLength(2);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });
  it("rejects excessive input and nested data explicitly", () => {
    expect(() => decodeJwt("a".repeat(JWT_INPUT_LIMIT + 1))).toThrow();
    expect(() => decodeJwt(jwt('{"x":' + "[".repeat(200) + "0" + "]".repeat(200) + "}"))).toThrow();
  });
  it("supports long text without truncation", () => {
    const result = decodeJwt(jwt(JSON.stringify({ text: "中😀".repeat(4000) })));
    expect(result.payloadText).toContain("中😀".repeat(4000));
  });
});

describe("JWT NumericDate annotations", () => {
  it("expires exactly at exp, and uses fractional seconds", () => {
    expect(jwtTimeClaim("1000", 1000).expired).toBe(true);
    expect(jwtTimeClaim("1000.5", 1000).expired).toBe(false);
    expect(jwtTimeClaim("-1", 0).expired).toBe(true);
  });
  it.each(["1e100", "1e309", "-1e309", "1e-999", "8640000000001", "1000.00000000000001", "8640000000000.0001"])("does not construct an invalid, rounded or underflowed date for %s", (raw) => {
    expect(jwtTimeClaim(raw, 0).date).toBeNull();
    expect(jwtTimeClaim(raw, 0).issue).toBe("range");
  });
  it.each(['"1000"', "null", "true", "{}", "[]"])("rejects non-numeric claim %s", (raw) => expect(jwtTimeClaim(raw, 0).issue).toBe("type"));
  it("preserves valid date boundaries, zero and fractional dates", () => {
    for (const raw of ["0", "-0", "0.5", "8640000000000", "-8640000000000"]) {
      expect(Number.isFinite(jwtTimeClaim(raw, 0).date?.getTime())).toBe(true);
    }
  });
});
