import { calculateSocialCreditCheckCharacter, maskSocialCredit, SOCIAL_CREDIT_ALPHABET } from "./social-credit";

export const ORGANIZATION_CODE_STANDARD_URL = "https://irss.cods.org.cn/cods/2020-10/29/12582hi/2026052817544819074.pdf";
export const ORGANIZATION_CODE_STANDARD_INFO_URL = "https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=D4FCCBF166BB7DDD95236DC211E660BF";
export const SOCIAL_CREDIT_GENERATOR_LIMITS = Object.freeze({ inputCharacters: 64, count: 100 });
const ORGANIZATION_WEIGHTS = [3, 7, 9, 10, 5, 8, 4, 2] as const;
const BODY_CAPACITY = 31n ** 8n;
const SCOPE = Object.freeze({ registrationDepartmentVerified: false, organizationCategoryVerified: false,
  administrativeCodeVerified: false, registrationVerified: false, crossBatchUnique: false, deterministic: true } as const);

export type SocialCreditGeneratorField = "department" | "category" | "addressCode" | "startBody" | "count";
export type SocialCreditGeneratorError = "input_type" | "too_long" | "department" | "category" | "address" | "body" | "count" | "capacity" | "reserved";
export type SocialCreditGenerationOptions = { department: string; category: string; addressCode: string; startBody: string; count: number };
export type SocialCreditGenerationResult = {
  codes: string[];
  errors: SocialCreditGeneratorError[];
  fieldErrors: Partial<Record<SocialCreditGeneratorField, SocialCreditGeneratorError>>;
  normalized: SocialCreditGenerationOptions | null;
  scope: typeof SCOPE;
};

/**
 * GB 11714-1997 2.1.2 and Annex A: the inner code uses 36 values, NOT the
 * outer credit-code alphabet. Raw eight-character body; no normalization.
 * CODS PDF physical pages 2/4/5: weights, table, D2143569-X worked example.
 */
export function calculateOrganizationCheckCharacter(body: unknown): string | null {
  if (typeof body !== "string" || body.length !== 8 || !/^[0-9A-Z]{8}$/.test(body)) return null;
  const sum = [...body].reduce((value, character, index) => value + parseInt(character, 36) * ORGANIZATION_WEIGHTS[index], 0);
  const check = 11 - sum % 11;
  return check === 10 ? "X" : check === 11 ? "0" : String(check);
}

function normalizeField(value: string) {
  return value.replace(/[\uFF01-\uFF5E]/g, character => String.fromCharCode(character.charCodeAt(0) - 0xfee0))
    .replace(/[a-z]/g, character => character.toUpperCase()).trim();
}

function bodyToNumber(body: string) {
  return [...body].reduce((value, character) => value * 31n + BigInt(SOCIAL_CREDIT_ALPHABET.indexOf(character)), 0n);
}

function numberToBody(value: bigint) {
  let body = "";
  for (let i = 0; i < 8; i++) { body = SOCIAL_CREDIT_ALPHABET[Number(value % 31n)] + body; value /= 31n; }
  return body;
}

/**
 * Local deterministic TEST samples carrying both GB11714 and GB32100 check
 * characters. No department/category/address code tables or issuance lookup.
 * Increment eight-character bodies in the disclosed outer 31-character order.
 * Application restriction: reject ALL PDY prefixes, conservatively covering
 * GB11714 clause 3's PDY00001–PDY99999 internal-only zone. Never skip, wrap,
 * or return a partial batch. No claim of random or cross-batch unique values.
 */
export function generateSocialCreditSamples(options: unknown): SocialCreditGenerationResult {
  const result: SocialCreditGenerationResult = { codes: [], errors: [], fieldErrors: {}, normalized: null, scope: SCOPE };
  const fail = (field: SocialCreditGeneratorField, error: SocialCreditGeneratorError) => {
    result.fieldErrors[field] = error;
    if (!result.errors.includes(error)) result.errors.push(error);
  };
  if (options === null || typeof options !== "object" || Array.isArray(options)) { result.errors.push("input_type"); return result; }
  const raw = options as Record<string, unknown>;
  const normalized: Record<SocialCreditGeneratorField, string> = { department: "", category: "", addressCode: "", startBody: "", count: "" };
  for (const field of Object.keys(normalized) as SocialCreditGeneratorField[]) {
    const value = raw[field];
    if (field === "count" && typeof value === "number") continue;
    if (typeof value !== "string") fail(field, "input_type");
    else if (value.length > SOCIAL_CREDIT_GENERATOR_LIMITS.inputCharacters) fail(field, "too_long");
    else normalized[field] = normalizeField(value);
  }
  // Raw limits/types are checked before trimming, mapping or numeric parsing.
  if (result.errors.length) return result;
  const oneCharacter = /^[0-9A-HJ-NPQRTUWXY]$/;
  if (!oneCharacter.test(normalized.department)) fail("department", "department");
  if (!oneCharacter.test(normalized.category)) fail("category", "category");
  if (!/^\d{6}$/.test(normalized.addressCode)) fail("addressCode", "address");
  if (!/^[0-9A-HJ-NPQRTUWXY]{8}$/.test(normalized.startBody)) fail("startBody", "body");
  const count = typeof raw.count === "number" ? raw.count : /^\d+$/.test(normalized.count) ? Number(normalized.count) : NaN;
  if (!Number.isInteger(count) || count < 1 || count > SOCIAL_CREDIT_GENERATOR_LIMITS.count) fail("count", "count");
  if (result.errors.length) return result;
  const start = bodyToNumber(normalized.startBody);
  if (start + BigInt(count) > BODY_CAPACITY) { fail("count", "capacity"); return result; }
  const bodies = Array.from({ length: count }, (_, index) => numberToBody(start + BigInt(index)));
  if (bodies.some(body => body.startsWith("PDY"))) {
    fail(normalized.startBody.startsWith("PDY") ? "startBody" : "count", "reserved"); return result;
  }
  result.normalized = { department: normalized.department, category: normalized.category, addressCode: normalized.addressCode, startBody: normalized.startBody, count };
  result.codes = bodies.map(body => {
    const organizationCode = body + calculateOrganizationCheckCharacter(body)!;
    const creditBody = normalized.department + normalized.category + normalized.addressCode + organizationCode;
    return creditBody + calculateSocialCreditCheckCharacter(creditBody)!;
  });
  return result;
}

/** Keep the visible rows, clipboard and TXT download in sync. */
export function getSocialCreditSampleDisplay(codes: readonly string[], revealed: boolean) {
  const rows = codes.map(code => revealed ? code : maskSocialCredit(code));
  return { rows, text: rows.join("\n") };
}
