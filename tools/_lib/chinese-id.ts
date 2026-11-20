/**
 * GB 11643-1999 rule checks and deterministic test samples only.
 * No current/historical county-code database or issued-identity lookup.
 * Reference dates are mandatory: this module never reads the system clock.
 */
export const CHINESE_ID_STANDARD_URL = "https://zjw.beijing.gov.cn/Portals/0/zhuanti/fazhan/%E8%BA%AB%E4%BB%BD%E8%AF%81GB11643-1999.pdf";
export const CHINESE_ID_MAX_ROWS = 100;
export const CHINESE_ID_MAX_BATCH_CHARACTERS = 20_000;
const MAX_NUMBER_INPUT_CHARACTERS = 256;
const PROVINCES: Record<string, string> = {
  "11": "北京市", "12": "天津市", "13": "河北省", "14": "山西省", "15": "内蒙古自治区",
  "21": "辽宁省", "22": "吉林省", "23": "黑龙江省", "31": "上海市", "32": "江苏省",
  "33": "浙江省", "34": "安徽省", "35": "福建省", "36": "江西省", "37": "山东省",
  "41": "河南省", "42": "湖北省", "43": "湖南省", "44": "广东省", "45": "广西壮族自治区",
  "46": "海南省", "50": "重庆市", "51": "四川省", "52": "贵州省", "53": "云南省",
  "54": "西藏自治区", "61": "陕西省", "62": "甘肃省", "63": "青海省", "64": "宁夏回族自治区",
  "65": "新疆维吾尔自治区", "71": "台湾省", "81": "香港特别行政区", "82": "澳门特别行政区",
};
const WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] as const;
const CHECK_CHARACTERS = "10X98765432";

export type ChineseIdError = "empty_input" | "too_long" | "format" | "province" | "birth_date" | "future_birth" | "sequence" | "checksum" | "reference_date" | "count" | "sex" | "sequence_capacity" | "batch_limit" | "batch_too_long";
export type ChineseIdSex = "male" | "female";
type CalendarDate = { year: number; month: number; day: number; iso: string };
export type ChineseIdValidation = {
  valid: boolean;
  normalized: string;
  canonicalNumber: string | null;
  expectedCheckCharacter: string | null;
  legacyAssumption: "19xx" | null;
  errors: ChineseIdError[];
  administrativeCodeVerified: false;
  identityVerified: false;
  parsed: null | {
    areaCode: string; provinceCode: string; provinceName: string;
    birthDate: string; age: number; sex: ChineseIdSex; sequence: string;
  };
};

function calendarDate(value: unknown): CalendarDate | null {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (year < 1 || year > 9999 || month < 1 || month > 12) return null;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day < 1 || day > days[month - 1]) return null;
  return { year, month, day, iso: value };
}

export function normalizeChineseId(input: unknown): string {
  if (typeof input !== "string" || input.length > MAX_NUMBER_INPUT_CHARACTERS) return "";
  return input.replace(/[\uFF01-\uFF5E]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)).replace(/\s/g, "").toUpperCase();
}

export function calculateChineseIdCheckCharacter(body: unknown): string | null {
  if (typeof body !== "string" || !/^\d{17}$/.test(body)) return null;
  const sum = [...body].reduce((n, c, i) => n + Number(c) * WEIGHTS[i], 0);
  return CHECK_CHARACTERS[sum % 11];
}

export function validateChineseId(input: unknown, referenceDate: string): ChineseIdValidation {
  const result: ChineseIdValidation = {
    valid: false, normalized: "", canonicalNumber: null, expectedCheckCharacter: null,
    legacyAssumption: null, errors: [], administrativeCodeVerified: false, identityVerified: false, parsed: null,
  };
  const reference = calendarDate(referenceDate);
  if (!reference) result.errors.push("reference_date");
  if (typeof input !== "string") { result.errors.push("format"); return result; }
  if (input.length > MAX_NUMBER_INPUT_CHARACTERS) { result.errors.push("too_long"); return result; }
  result.normalized = normalizeChineseId(input);
  if (!result.normalized) { result.errors.push("empty_input"); return result; }
  let canonical = result.normalized;
  if (/^\d{15}$/.test(canonical)) {
    result.legacyAssumption = "19xx";
    const body = canonical.slice(0, 6) + "19" + canonical.slice(6);
    canonical = body + calculateChineseIdCheckCharacter(body);
  } else if (!/^\d{17}[\dX]$/.test(canonical)) {
    result.errors.push("format"); return result;
  }
  result.canonicalNumber = canonical;
  const areaCode = canonical.slice(0, 6);
  const provinceCode = areaCode.slice(0, 2);
  if (!Object.hasOwn(PROVINCES, provinceCode)) result.errors.push("province");
  const rawBirth = canonical.slice(6, 14);
  const birth = calendarDate(`${rawBirth.slice(0, 4)}-${rawBirth.slice(4, 6)}-${rawBirth.slice(6, 8)}`);
  if (!birth) result.errors.push("birth_date");
  else if (reference && birth.iso > reference.iso) result.errors.push("future_birth");
  const sequence = canonical.slice(14, 17);
  if (sequence === "000") result.errors.push("sequence");
  result.expectedCheckCharacter = calculateChineseIdCheckCharacter(canonical.slice(0, 17));
  if (canonical[17] !== result.expectedCheckCharacter) result.errors.push("checksum");
  if (result.errors.length || !birth || !reference) return result;
  const beforeBirthday = reference.month < birth.month || (reference.month === birth.month && reference.day < birth.day);
  result.parsed = {
    areaCode, provinceCode, provinceName: PROVINCES[provinceCode], birthDate: birth.iso,
    age: reference.year - birth.year - Number(beforeBirthday),
    sex: Number(sequence) % 2 ? "male" : "female", sequence,
  };
  result.valid = true;
  return result;
}

export function validateChineseIdBatch(input: unknown, referenceDate: string): {
  results: Array<ChineseIdValidation & { lineNumber: number }>;
  error: ChineseIdError | null;
} {
  if (!calendarDate(referenceDate)) return { results: [], error: "reference_date" };
  if (typeof input !== "string") return { results: [], error: "format" };
  if (input.length > CHINESE_ID_MAX_BATCH_CHARACTERS) return { results: [], error: "batch_too_long" };
  const rows = input.split(/\r\n|[\n\r\u2028\u2029]/).map((text, i) => ({ text, lineNumber: i + 1 })).filter((row) => row.text.trim() !== "");
  if (!rows.length) return { results: [], error: "empty_input" };
  if (rows.length > CHINESE_ID_MAX_ROWS) return { results: [], error: "batch_limit" };
  return { results: rows.map((row) => ({ ...validateChineseId(row.text, referenceDate), lineNumber: row.lineNumber })), error: null };
}

export function maskChineseId(input: unknown): string {
  const value = normalizeChineseId(input);
  if (value.length <= 7) return "*".repeat(value.length);
  return value.slice(0, 3) + "*".repeat(value.length - 7) + value.slice(-4);
}

export type ChineseIdGenerationOptions = {
  areaCode: string; birthDate: string; sex: ChineseIdSex | "any";
  startSequence: number; count: number; referenceDate: string;
};
export function generateChineseIdSamples(options: ChineseIdGenerationOptions): {
  numbers: string[]; errors: ChineseIdError[]; administrativeCodeVerified: false; identityVerified: false;
} {
  const result: ReturnType<typeof generateChineseIdSamples> = { numbers: [], errors: [], administrativeCodeVerified: false, identityVerified: false };
  if (!options || typeof options !== "object") { result.errors.push("format"); return result; }
  const { areaCode, birthDate, sex, startSequence, count, referenceDate } = options;
  if (typeof areaCode !== "string" || !/^\d{6}$/.test(areaCode) || !Object.hasOwn(PROVINCES, areaCode.slice(0, 2))) result.errors.push("province");
  const reference = calendarDate(referenceDate);
  const birth = calendarDate(birthDate);
  if (!reference) result.errors.push("reference_date");
  if (!birth) result.errors.push("birth_date");
  else if (reference && birth.iso > reference.iso) result.errors.push("future_birth");
  if (!Number.isInteger(startSequence) || startSequence < 1 || startSequence > 999) result.errors.push("sequence");
  if (!Number.isInteger(count) || count < 1 || count > CHINESE_ID_MAX_ROWS) result.errors.push("count");
  if (sex !== "any" && sex !== "male" && sex !== "female") result.errors.push("sex");
  if (result.errors.length) return result;
  const step = sex === "any" ? 1 : 2;
  const parity = sex === "male" ? 1 : 0;
  const first = startSequence + Number(sex !== "any" && startSequence % 2 !== parity);
  if (first + (count - 1) * step > 999) { result.errors.push("sequence_capacity"); return result; }
  const birthDigits = birthDate.replace(/-/g, "");
  for (let i = 0; i < count; i++) {
    const body = areaCode + birthDigits + String(first + i * step).padStart(3, "0");
    result.numbers.push(body + calculateChineseIdCheckCharacter(body));
  }
  return result;
}
