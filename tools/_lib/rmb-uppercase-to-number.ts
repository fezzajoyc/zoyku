import { convertRmbUppercase, RMB_UPPERCASE_LIMITS } from "./rmb-uppercase";

/** Application scope, not a claim to accept every valid banking spelling. */
export const RMB_UPPERCASE_PARSE_LIMITS = Object.freeze({
  inputCharacters: RMB_UPPERCASE_LIMITS.inputCharacters,
  maximumAmount: RMB_UPPERCASE_LIMITS.maximumAmount,
});
export type RmbUppercaseParseError = "empty" | "too_long" | "unsupported_form" | "range";
export type RmbUppercaseParseResult =
  | { ok: true; normalizedAmount: string; minorUnits: string; canonicalUppercase: string; normalizedInput: string; normalizationApplied: boolean }
  | { ok: false; error: RmbUppercaseParseError };

const DIGITS = new Map([..."壹贰叁肆伍陆柒捌玖"].map((char, index) => [char, BigInt(index + 1)]));
const SMALL = new Map([["拾", { position: 1, value: 10n }], ["佰", { position: 2, value: 100n }], ["仟", { position: 3, value: 1000n }]]);
const ALIASES: Record<string, string> = { 貳: "贰", 陸: "陆", 億: "亿", 萬: "万", 圓: "元" };
const MAX_MINOR = BigInt(RMB_UPPERCASE_LIMITS.maximumAmount.replace(".", ""));

/** A nonzero four-place section: explicit digits, descending units, exact gap zeros. */
function section(text: string): { value: bigint; firstPosition: number } | null {
  let previous: number | null = null, firstPosition = 0, zero = false, value = 0n;
  for (let index = 0; index < text.length;) {
    if (text[index] === "零") {
      if (previous === null || zero) return null;
      zero = true; index++; continue;
    }
    const digit = DIGITS.get(text[index]);
    if (digit === undefined) return null;
    const unit = SMALL.get(text[index + 1]);
    const position = unit?.position ?? 0;
    if (previous !== null && (position >= previous || zero !== (previous - position > 1))) return null;
    if (previous === null) firstPosition = position;
    value += digit * (unit?.value ?? 1n);
    previous = position; zero = false; index += unit ? 2 : 1;
  }
  return previous === null || zero ? null : { value, firstPosition };
}

function integer(text: string): bigint | null {
  if (text === "零") return 0n;
  const groups: { text: string; rank: number; weight: bigint }[] = [];
  let rest = text;
  for (const [symbol, rank, weight] of [["亿", 2, 100_000_000n], ["万", 1, 10_000n]] as const) {
    const index = rest.indexOf(symbol);
    if (index >= 0) { groups.push({ text: rest.slice(0, index), rank, weight }); rest = rest.slice(index + 1); }
  }
  if (rest) groups.push({ text: rest, rank: 0, weight: 1n });
  let previous: { rank: number; value: bigint } | null = null, total = 0n;
  for (const group of groups) {
    const leadingZero = group.text.startsWith("零");
    const parsed = section(leadingZero ? group.text.slice(1) : group.text);
    if (!parsed || (!previous && leadingZero)) return null;
    if (previous) {
      const required = previous.rank - group.rank > 1 || parsed.firstPosition < 3;
      // Appendix IV(3)'s 万位=0 / 千位非0 variant, including the second
      // printed 107000.53 spelling. This is syntax, not re-render equality.
      const optional = previous.rank === 1 && group.rank === 0 && previous.value % 10n === 0n && parsed.firstPosition === 3;
      if ((!leadingZero && required) || (leadingZero && !required && !optional)) return null;
    }
    total += parsed.value * group.weight;
    previous = { rank: group.rank, value: parsed.value };
  }
  return previous ? total : null;
}

function fraction(text: string, yuan: bigint): bigint | null {
  if (text === "整" || text === "正") return 0n;
  const fenOnly = /^零([壹贰叁肆伍陆柒捌玖])分$/.exec(text);
  if (fenOnly) return DIGITS.get(fenOnly[1])!;
  const jiao = /^(零)?([壹贰叁肆伍陆柒捌玖])角(?:([壹贰叁肆伍陆柒捌玖])分|[整正])?$/.exec(text);
  if (!jiao || (jiao[1] && yuan % 10n !== 0n)) return null;
  return DIGITS.get(jiao[2])! * 10n + (jiao[3] ? DIGITS.get(jiao[3])! : 0n);
}

/** Strict financial subset; never removes arbitrary characters or guesses shorthand. */
export function parseRmbUppercase(input: unknown): RmbUppercaseParseResult {
  if (typeof input !== "string") return { ok: false, error: "unsupported_form" };
  if (input.length > RMB_UPPERCASE_PARSE_LIMITS.inputCharacters) return { ok: false, error: "too_long" };
  const normalizedInput = input.trim().replace(/[貳陸億萬圓]/g, char => ALIASES[char]);
  if (!normalizedInput) return { ok: false, error: "empty" };
  const body = normalizedInput.startsWith("人民币") ? normalizedInput.slice(3) : normalizedInput;
  if (!/^[零壹贰叁肆伍陆柒捌玖拾佰仟万亿元角分整正]+$/.test(body)) return { ok: false, error: "unsupported_form" };
  const parts = body.split("元");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return { ok: false, error: "unsupported_form" };
  const yuan = integer(parts[0]);
  if (yuan === null) return { ok: false, error: "unsupported_form" };
  const cents = fraction(parts[1], yuan);
  if (cents === null) return { ok: false, error: "unsupported_form" };
  const minor = yuan * 100n + cents;
  if (minor > MAX_MINOR) return { ok: false, error: "range" };
  const normalizedAmount = `${minor / 100n}.${(minor % 100n).toString().padStart(2, "0")}`;
  // Reuse only for the displayed fixed wording, never to decide input validity.
  const forward = convertRmbUppercase(normalizedAmount);
  if (!forward.ok) return { ok: false, error: "range" };
  return { ok: true, normalizedAmount, minorUnits: minor.toString(), canonicalUppercase: forward.uppercase,
    normalizedInput, normalizationApplied: normalizedInput !== input };
}
