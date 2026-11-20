import { describe, expect, it } from "vitest";
import {
  SOCIAL_CREDIT_ALPHABET, SOCIAL_CREDIT_LIMITS, calculateSocialCreditCheckCharacter,
  maskSocialCredit, normalizeSocialCredit, validateSocialCredit, validateSocialCreditBatch,
} from "@/tools/_lib/social-credit";

const ALPHABET = "0123456789ABCDEFGHJKLMNPQRTUWXY";
const EXAMPLE = "91350100M000100Y43";
// Independent modular-exponent reference; no production weights or helper.
function referenceCheck(body: string): string {
  const sum = [...body].reduce((total, character, index) => total + BigInt(ALPHABET.indexOf(character)) * (3n ** BigInt(index)), 0n);
  const value = Array.from({ length: 31 }, (_, n) => n).find(n => (sum + BigInt(n)) % 31n === 0n)!;
  return ALPHABET[value];
}
const withCheck = (body: string) => body + referenceCheck(body);

describe("GB 32100 outer checksum and character rules", () => {
  it("uses the official 31-character alphabet with unique values 0–30", () => {
    expect(SOCIAL_CREDIT_ALPHABET).toBe(ALPHABET);
    expect(new Set(SOCIAL_CREDIT_ALPHABET).size).toBe(31);
    for (const excluded of "IOSVZ") expect(SOCIAL_CREDIT_ALPHABET).not.toContain(excluded);
  });
  it("matches the official Annex B example: sum 1640, remainder 28, check 3", () => {
    expect(calculateSocialCreditCheckCharacter(EXAMPLE.slice(0, 17))).toBe("3");
    expect(referenceCheck(EXAMPLE.slice(0, 17))).toBe("3");
    expect(validateSocialCredit(EXAMPLE).valid).toBe(true);
  });
  it("matches an independent reference for all 31 check characters, including 0 and Y", () => {
    const seen = new Set<string>();
    for (const character of ALPHABET) {
      const body = EXAMPLE.slice(0, 16) + character;
      const expected = referenceCheck(body);
      seen.add(expected);
      expect(calculateSocialCreditCheckCharacter(body)).toBe(expected);
      expect(validateSocialCredit(body + expected).valid).toBe(true);
    }
    expect([...seen].sort()).toEqual([...ALPHABET].sort());
  });
  it.each(["", "0".repeat(16), "0".repeat(18), "a".repeat(17), "I".repeat(17), null, undefined, 12, {}, []])("rejects malformed raw checksum body without throwing: %s", value => {
    expect(calculateSocialCreditCheckCharacter(value)).toBeNull();
  });
  it.each(["I", "O", "S", "V", "Z", "-", "_", "中", "Х", "ﬀ"])("rejects disallowed character %s", character => {
    expect(validateSocialCredit(EXAMPLE.slice(0, 8) + character + EXAMPLE.slice(9)).errors).toContain("characters");
  });
  it("rejects every one-character substitution of a valid code", () => {
    for (let position = 0; position < EXAMPLE.length; position++) {
      for (const character of ALPHABET) {
        if (character === EXAMPLE[position]) continue;
        expect(validateSocialCredit(EXAMPLE.slice(0, position) + character + EXAMPLE.slice(position + 1)).valid).toBe(false);
      }
    }
  });
});

describe("normalization and structural boundaries", () => {
  it("normalizes disclosed full-width ASCII, lowercase ASCII and Unicode whitespace", () => {
    const input = "　９１３５０１００ｍ０００１００ｙ４３ \t";
    expect(normalizeSocialCredit(input)).toBe(EXAMPLE);
    expect(validateSocialCredit(input)).toMatchObject({ valid: true, normalized: EXAMPLE, normalizationApplied: true });
    expect(validateSocialCredit(EXAMPLE).normalizationApplied).toBe(false);
    expect(validateSocialCredit("9135 0100\tM000100y43").valid).toBe(true);
  });
  it("does not expand non-ASCII ligatures into allowed ASCII letters", () => {
    const input = EXAMPLE.slice(0, 8) + "ﬀ" + EXAMPLE.slice(9);
    expect(normalizeSocialCredit(input)).toContain("ﬀ");
    expect(validateSocialCredit(input).errors).toContain("characters");
  });
  it("parses only the five raw segments and exposes all verification limits", () => {
    expect(validateSocialCredit(EXAMPLE)).toMatchObject({
      valid: true, normalized: EXAMPLE, errors: [], expectedCheckCharacter: "3",
      administrativeCodeVerified: false, registrationDepartmentVerified: false,
      organizationCategoryVerified: false, organizationCodeVerified: false, registrationVerified: false,
      parsed: { registrationDepartment: "9", organizationCategory: "1", addressCode: "350100", subjectIdentifier: "M000100Y4", checkCharacter: "3" },
    });
  });
  it.each(["000000", "999999", "990001"])("does not reject an unverified current or historical area code %s", area => {
    const value = withCheck("91" + area + "M000100Y4");
    expect(validateSocialCredit(value)).toMatchObject({ valid: true, administrativeCodeVerified: false, parsed: { addressCode: area } });
  });
  it("requires six decimal address digits even when the outer checksum is correct", () => {
    const result = validateSocialCredit(withCheck("9135010AM000100Y4"));
    expect(result.errors).toEqual(["address"]);
    expect(result.parsed).toBeNull();
  });
  it("does not claim registering-department/category or internal GB11714 verification", () => {
    expect(validateSocialCredit(withCheck("AA350100AAAAAAAAA"))).toMatchObject({
      valid: true, registrationDepartmentVerified: false, organizationCategoryVerified: false,
      organizationCodeVerified: false, registrationVerified: false,
    });
  });
  it("reports a mismatched check character without silently correcting the number", () => {
    const result = validateSocialCredit(EXAMPLE.slice(0, 17) + "0");
    expect(result).toMatchObject({ valid: false, normalized: EXAMPLE.slice(0, 17) + "0", expectedCheckCharacter: "3", errors: ["checksum"], parsed: null });
  });
  it.each(["", " \t　\r\n"])("reports empty input %s", input => {
    expect(validateSocialCredit(input).errors).toContain("empty_input");
  });
  it.each(["1", "1".repeat(17), "1".repeat(19), "中文🙂"])("reports wrong length %s", input => {
    expect(validateSocialCredit(input).errors).toContain("length");
  });
  it.each([null, undefined, 12, [], {}])("reports wrong runtime input type without throwing: %s", input => {
    expect(validateSocialCredit(input).errors).toEqual(["input_type"]);
  });
  it("bounds long raw input before normalization and never retains it", () => {
    expect(validateSocialCredit(" ".repeat(10_000) + EXAMPLE)).toMatchObject({ valid: false, normalized: "", errors: ["too_long"] });
    expect(normalizeSocialCredit("中".repeat(10_000))).toBe("");
    expect(calculateSocialCreditCheckCharacter("1".repeat(10_000))).toBeNull();
  });
  it("exports immutable explicit input and batch limits", () => {
    expect(SOCIAL_CREDIT_LIMITS).toEqual({ inputCharacters: 256, batchCharacters: 20_000, batchRows: 100 });
    expect(Object.isFrozen(SOCIAL_CREDIT_LIMITS)).toBe(true);
  });
});

describe("bounded batches and masking", () => {
  it("ignores blank lines, preserves original line numbers and keeps per-row errors", () => {
    const result = validateSocialCreditBatch(`${EXAMPLE}\r\n\n${EXAMPLE.slice(0, 17)}0\u2028${EXAMPLE.toLowerCase()}`);
    expect(result.error).toBeNull();
    expect(result.results.map(row => [row.lineNumber, row.valid])).toEqual([[1, true], [3, false], [4, true]]);
    expect(result.results[2].normalizationApplied).toBe(true);
  });
  it("accepts 100 rows and refuses 101 atomically", () => {
    expect(validateSocialCreditBatch(Array(100).fill(EXAMPLE).join("\n")).results).toHaveLength(100);
    expect(validateSocialCreditBatch(Array(101).fill(EXAMPLE).join("\n"))).toEqual({ results: [], error: "batch_limit" });
  });
  it("enforces the batch character boundary before allocating rows", () => {
    const atLimit = (EXAMPLE + " ".repeat(181) + "\n").repeat(100);
    expect(atLimit).toHaveLength(20_000);
    expect(validateSocialCreditBatch(atLimit).results).toHaveLength(100);
    expect(validateSocialCreditBatch(atLimit + " ")).toEqual({ results: [], error: "batch_too_long" });
  });
  it.each(["", " \r\n\t　"])("reports empty batches: %s", input => {
    expect(validateSocialCreditBatch(input)).toEqual({ results: [], error: "empty_input" });
  });
  it.each([null, 1, undefined, []])("reports non-string batches without throwing: %s", input => {
    expect(validateSocialCreditBatch(input)).toEqual({ results: [], error: "input_type" });
  });
  it("masks by default without altering normalized values", () => {
    expect(maskSocialCredit(EXAMPLE)).toBe("913***********0Y43");
    expect(maskSocialCredit(EXAMPLE.toLowerCase())).toBe("913***********0Y43");
    expect(maskSocialCredit("abc")).toBe("***");
    expect(maskSocialCredit(null)).toBe("");
    expect(maskSocialCredit("A".repeat(10_000))).toBe("");
  });
});
