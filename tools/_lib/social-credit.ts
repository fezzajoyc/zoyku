/**
 * GB 32100-2015, clauses 4.1/4.2.3/4.2.5 and Annexes A/B.
 * Government-hosted scanned PDF: physical pages 5–8 (printed pages 2–5).
 * Only the outer alphabet/address shape/MOD31 are checked. In particular,
 * GB11714 internal organization-code rules and registration records are NOT.
 */
export const SOCIAL_CREDIT_STANDARD_URL = "https://www.shandan.gov.cn/zfxxgk/fdzdgknr/qtfdxx/shzz/202402/W020240220405892314500.pdf";
export const SOCIAL_CREDIT_STANDARD_INFO_URL = "https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=24691C25985C1073D3A7C85629378AC0";
export const SOCIAL_CREDIT_ALPHABET = "0123456789ABCDEFGHJKLMNPQRTUWXY";
/** Limits count UTF-16 code units in the raw input, before normalization. */
export const SOCIAL_CREDIT_LIMITS = Object.freeze({ inputCharacters: 256, batchCharacters: 20_000, batchRows: 100 });
const WEIGHTS = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28] as const;
const ALLOWED = /^[0-9A-HJ-NPQRTUWXY]+$/;

export type SocialCreditError = "empty_input" | "input_type" | "too_long" | "length" | "characters" | "address" | "checksum" | "batch_limit" | "batch_too_long";
export type SocialCreditValidation = {
  /** The disclosed structural subset only; never proof of a registered entity. */
  valid: boolean;
  normalized: string;
  normalizationApplied: boolean;
  errors: SocialCreditError[];
  expectedCheckCharacter: string | null;
  administrativeCodeVerified: false;
  registrationDepartmentVerified: false;
  organizationCategoryVerified: false;
  organizationCodeVerified: false;
  registrationVerified: false;
  parsed: null | {
    registrationDepartment: string;
    organizationCategory: string;
    addressCode: string;
    subjectIdentifier: string;
    checkCharacter: string;
  };
};

/** Full-width ASCII → ASCII; ASCII a–z → A–Z; ECMAScript whitespace removed. */
export function normalizeSocialCredit(input: unknown): string {
  if (typeof input !== "string" || input.length > SOCIAL_CREDIT_LIMITS.inputCharacters) return "";
  return input.replace(/[\uFF01-\uFF5E]/g, character => String.fromCharCode(character.charCodeAt(0) - 0xfee0))
    .replace(/\s/g, "").replace(/[a-z]/g, character => character.toUpperCase());
}

/** Raw 17-character body only; no normalization or code-table validation. */
export function calculateSocialCreditCheckCharacter(body: unknown): string | null {
  if (typeof body !== "string" || body.length !== 17 || !ALLOWED.test(body)) return null;
  const sum = [...body].reduce((total, character, index) => total + SOCIAL_CREDIT_ALPHABET.indexOf(character) * WEIGHTS[index], 0);
  return SOCIAL_CREDIT_ALPHABET[(31 - sum % 31) % 31];
}

export function validateSocialCredit(input: unknown): SocialCreditValidation {
  const result: SocialCreditValidation = {
    valid: false, normalized: "", normalizationApplied: false, errors: [], expectedCheckCharacter: null,
    administrativeCodeVerified: false, registrationDepartmentVerified: false,
    organizationCategoryVerified: false, organizationCodeVerified: false, registrationVerified: false, parsed: null,
  };
  if (typeof input !== "string") { result.errors.push("input_type"); return result; }
  if (input.length > SOCIAL_CREDIT_LIMITS.inputCharacters) { result.errors.push("too_long"); return result; }
  result.normalized = normalizeSocialCredit(input);
  result.normalizationApplied = result.normalized !== input;
  if (!result.normalized) { result.errors.push("empty_input"); return result; }
  if (result.normalized.length !== 18) { result.errors.push("length"); return result; }
  if (!ALLOWED.test(result.normalized)) { result.errors.push("characters"); return result; }
  const addressCode = result.normalized.slice(2, 8);
  if (!/^\d{6}$/.test(addressCode)) result.errors.push("address");
  result.expectedCheckCharacter = calculateSocialCreditCheckCharacter(result.normalized.slice(0, 17));
  if (result.normalized[17] !== result.expectedCheckCharacter) result.errors.push("checksum");
  if (result.errors.length) return result;
  result.parsed = {
    registrationDepartment: result.normalized[0], organizationCategory: result.normalized[1], addressCode,
    subjectIdentifier: result.normalized.slice(8, 17), checkCharacter: result.normalized[17],
  };
  result.valid = true;
  return result;
}

export function validateSocialCreditBatch(input: unknown): {
  results: Array<SocialCreditValidation & { lineNumber: number }>;
  error: SocialCreditError | null;
} {
  if (typeof input !== "string") return { results: [], error: "input_type" };
  if (input.length > SOCIAL_CREDIT_LIMITS.batchCharacters) return { results: [], error: "batch_too_long" };
  const lines = input.split(/\r\n|[\n\r\u2028\u2029]/).map((text, index) => ({ text, lineNumber: index + 1 })).filter(line => line.text.trim() !== "");
  if (!lines.length) return { results: [], error: "empty_input" };
  if (lines.length > SOCIAL_CREDIT_LIMITS.batchRows) return { results: [], error: "batch_limit" };
  return { error: null, results: lines.map(line => ({ ...validateSocialCredit(line.text), lineNumber: line.lineNumber })) };
}

export function maskSocialCredit(input: unknown): string {
  const normalized = normalizeSocialCredit(input);
  if (normalized.length <= 7) return "*".repeat(normalized.length);
  return normalized.slice(0, 3) + "*".repeat(normalized.length - 7) + normalized.slice(-4);
}
