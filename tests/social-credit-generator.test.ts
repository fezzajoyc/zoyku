import { describe, expect, it } from "vitest";
import { calculateOrganizationCheckCharacter, generateSocialCreditSamples, getSocialCreditSampleDisplay, SOCIAL_CREDIT_GENERATOR_LIMITS } from "@/tools/_lib/social-credit-generator";

const fixture = { department: "9", category: "1", addressCode: "350100", startBody: "M000100Y", count: 1 };
const alphabet = "0123456789ABCDEFGHJKLMNPQRTUWXY";
const innerWeights = [3, 7, 9, 10, 5, 8, 4, 2];
function independentlyCheck(code: string) {
  const innerSum = [...code.slice(8, 16)].reduce((sum, char, index) => sum + BigInt(parseInt(char, 36)) * BigInt(innerWeights[index]), 0n);
  const innerValue = code[16] === "X" ? 10n : BigInt(code[16]);
  expect((innerSum + innerValue) % 11n).toBe(0n);
  const outerSum = [...code.slice(0, 17)].reduce((sum, char, index) => sum + BigInt(alphabet.indexOf(char)) * 3n ** BigInt(index), 0n);
  expect((outerSum + BigInt(alphabet.indexOf(code[17]))) % 31n).toBe(0n);
}

describe("GB11714 organization check character", () => {
  it("matches the official D2143569-X annex example and both standards' shared example", () => {
    expect(calculateOrganizationCheckCharacter("D2143569")).toBe("X");
    expect(calculateOrganizationCheckCharacter("M000100Y")).toBe("4");
  });
  it("uses all 36 character values rather than the outer MOD31 alphabet", () => {
    expect(calculateOrganizationCheckCharacter("M0000000")).toBe("0");
    expect(calculateOrganizationCheckCharacter("Y0000000")).toBe("8");
    expect(calculateOrganizationCheckCharacter("I0000000")).toBe("1");
  });
  it("maps MOD11 remainder zero to 0 and remainder one to X", () => {
    expect(calculateOrganizationCheckCharacter("00000000")).toBe("0");
    expect(calculateOrganizationCheckCharacter("00000006")).toBe("X");
  });
  it.each([null, undefined, 17, {}, [], "", "1234567", "123456789", "d2143569", "Ｄ2143569", "中2143569", "D214356!", "A".repeat(10_001)])("rejects a non-raw eight-character body: %s", value => {
    expect(calculateOrganizationCheckCharacter(value)).toBeNull();
  });
});

describe("deterministic social credit test sample generation", () => {
  it("calculates both check characters to reproduce the complete official example", () => {
    const result = generateSocialCreditSamples(fixture);
    expect(result.errors).toEqual([]);
    expect(result.codes).toEqual(["91350100M000100Y43"]);
    independentlyCheck(result.codes[0]);
  });
  it("normalizes full-width ASCII, lowercase and outer whitespace only", () => {
    const result = generateSocialCreditSamples({ department: "　９ ", category: "１", addressCode: "３５０１００", startBody: " ｍ０００１００ｙ　", count: "０１" });
    expect(result.codes).toEqual(["91350100M000100Y43"]);
    expect(result.normalized).toEqual(fixture);
  });
  it("generates 100 distinct consecutive bodies with independently verified inner and outer checks", () => {
    const options = { ...fixture, startBody: "00000001", count: 100 };
    const first = generateSocialCreditSamples(options), repeated = generateSocialCreditSamples(options);
    expect(first.codes).toHaveLength(100);
    expect(new Set(first.codes).size).toBe(100);
    expect(repeated.codes).toEqual(first.codes);
    for (const code of first.codes) { expect(code).toMatch(/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/); independentlyCheck(code); }
  });
  it("increments using the disclosed 31-character body alphabet, skipping excluded letters", () => {
    expect(generateSocialCreditSamples({ ...fixture, startBody: "0000000H", count: 2 }).codes.map(code => code.slice(8, 16))).toEqual(["0000000H", "0000000J"]);
    expect(generateSocialCreditSamples({ ...fixture, startBody: "0000000Y", count: 2 }).codes.map(code => code.slice(8, 16))).toEqual(["0000000Y", "00000010"]);
    expect(generateSocialCreditSamples({ ...fixture, startBody: "HYYYYYYY", count: 2 }).codes.map(code => code.slice(8, 16))).toEqual(["HYYYYYYY", "J0000000"]);
  });
  it("allows the last body once and atomically refuses any batch that would wrap", () => {
    expect(generateSocialCreditSamples({ ...fixture, startBody: "YYYYYYYY", count: 1 }).codes).toHaveLength(1);
    expect(generateSocialCreditSamples({ ...fixture, startBody: "YYYYYYYY", count: 2 })).toMatchObject({ codes: [], errors: ["capacity"] });
    expect(generateSocialCreditSamples({ ...fixture, startBody: "YYYYYYYX", count: 3 })).toMatchObject({ codes: [], errors: ["capacity"] });
  });
  it("conservatively rejects the whole PDY prefix including a batch that enters it", () => {
    for (const startBody of ["PDY00000", "PDY00001", "PDY99999", "PDYABCDE"]) {
      expect(generateSocialCreditSamples({ ...fixture, startBody })).toMatchObject({ codes: [], errors: ["reserved"] });
    }
    expect(generateSocialCreditSamples({ ...fixture, startBody: "PDXYYYYY", count: 2 })).toMatchObject({ codes: [], errors: ["reserved"] });
    expect(generateSocialCreditSamples({ ...fixture, startBody: "PDXYYYYY", count: 1 }).codes).toHaveLength(1);
  });
  it("states code-table, administrative, registration and cross-batch limitations explicitly", () => {
    const result = generateSocialCreditSamples({ ...fixture, department: "A", category: "Y", addressCode: "999999" });
    expect(result.codes).toHaveLength(1);
    expect(result.scope).toEqual({ registrationDepartmentVerified: false, organizationCategoryVerified: false, administrativeCodeVerified: false, registrationVerified: false, crossBatchUnique: false, deterministic: true });
  });
  it.each([
    ["department", ""], ["department", "91"], ["department", "I"], ["category", "O"], ["category", "中"],
    ["addressCode", "12345"], ["addressCode", "1234567"], ["addressCode", "12 345"], ["addressCode", "ABCDEF"],
    ["startBody", "1234567"], ["startBody", "123456789"], ["startBody", "I0000000"], ["startBody", "0000000S"], ["startBody", "00 00000"],
    ["count", 0], ["count", -1], ["count", 101], ["count", 1.5], ["count", Infinity], ["count", NaN], ["count", "1e2"], ["count", "+1"], ["count", ""],
  ])("rejects invalid %s=%s without returning partial rows", (field, value) => {
    const result = generateSocialCreditSamples({ ...fixture, [field]: value });
    expect(result.codes).toEqual([]); expect(result.errors.length).toBeGreaterThan(0); expect(result.fieldErrors).toHaveProperty(field);
  });
  it.each([null, undefined, "", 12, []])("handles an invalid options value: %s", value => {
    expect(generateSocialCreditSamples(value)).toMatchObject({ codes: [], errors: ["input_type"] });
  });
  it("checks raw resource limits before whitespace normalization", () => {
    for (const field of ["department", "category", "addressCode", "startBody", "count"]) {
      const result = generateSocialCreditSamples({ ...fixture, [field]: " ".repeat(10_001) + "1" });
      expect(result).toMatchObject({ codes: [], errors: ["too_long"], fieldErrors: { [field]: "too_long" } });
    }
    expect(SOCIAL_CREDIT_GENERATOR_LIMITS).toMatchObject({ inputCharacters: 64, count: 100 });
  });
});

describe("display and export of generated samples", () => {
  const codes = ["91350100M000100Y43", "91350100D2143569X0"];

  it("uses masked rows for the default visible result and exact export", () => {
    expect(getSocialCreditSampleDisplay(codes, false)).toEqual({
      rows: ["913***********0Y43", "913***********69X0"],
      text: "913***********0Y43\n913***********69X0",
    });
  });

  it("exports only the currently revealed rows after reveal", () => {
    expect(getSocialCreditSampleDisplay(codes, true)).toEqual({ rows: codes, text: codes.join("\n") });
  });

  it("produces no export for empty results", () => {
    expect(getSocialCreditSampleDisplay([], false)).toEqual({ rows: [], text: "" });
  });
});
