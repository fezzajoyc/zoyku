/** RMB amount wording only: no tax advice or bank/voucher acceptance check. */
export const RMB_UPPERCASE_LIMITS = Object.freeze({
  inputCharacters: 128,
  integerDigits: 12,
  fractionDigits: 2,
  maximumAmount: "999999999999.99",
});

/**
 * The official PBOC Clearing Center page was actually read, including 附一.
 * Other PBOC regional pages refused automated access and are not evidence.
 * This records the source and examples, not a claim that the entire 1997 law
 * is unamended/current or that a generated string passes a bank's review.
 */
export const RMB_UPPERCASE_SOURCE = Object.freeze({
  url: "https://www.cncc.cn/zcfg/200903/t20090323_286.html",
  publisher: "中国人民银行清算总中心",
  title: "《支付结算办法》附一《正确填写票据和结算凭证的基本规定》",
  section: "附一第一至第四项（金额书写）",
  accessedOn: "2026-11-21",
  evidence: "official_page_body_read",
  governmentTextUrl: "https://www.gov.cn/zhengce/1997-09/19/content_5712671.htm",
  amendmentReadUrl: "https://www.gov.cn/gongbao/2024/issue_11346/202405/content_6951515.html",
  ruleSummary: [
    "使用壹贰叁肆伍陆柒捌玖拾佰仟万亿元角分零整等财务大写。",
    "到元后写整；角后可以写整；有分时分后不写整。",
    "大写金额紧接人民币，不留空白。",
    "中间连续零合并；角为零且分非零时，元后写零。",
  ],
  printedExamples: [
    { amount: "1409.50", spellings: ["人民币壹仟肆佰零玖元伍角"] },
    { amount: "6007.14", spellings: ["人民币陆仟零柒元壹角肆分"] },
    { amount: "1680.32", spellings: ["人民币壹仟陆佰捌拾元零叁角贰分", "人民币壹仟陆佰捌拾元叁角贰分"] },
    { amount: "107000.53", spellings: ["人民币壹拾万柒仟元零伍角叁分", "人民币壹拾万零柒仟元伍角叁分"] },
    { amount: "16409.02", spellings: ["人民币壹万陆仟肆佰零玖元零贰分"] },
    { amount: "325.04", spellings: ["人民币叁佰贰拾伍元零肆分"] },
  ],
});

export type RmbUppercaseError = "empty" | "too_long" | "format" | "precision" | "range";
export type RmbUppercaseResult =
  | { ok: true; normalizedAmount: string; minorUnits: string; uppercase: string }
  | { ok: false; error: RmbUppercaseError };

const FINANCIAL_DIGITS = "零壹贰叁肆伍陆柒捌玖";
const PLACE_UNITS = ["", "拾", "佰", "仟"] as const;
const GROUP_UNITS = ["", "万", "亿"] as const;

function sectionUppercase(section: string): string {
  let out = "";
  let zero = false;
  for (let index = 0; index < section.length; index++) {
    const digit = section[index];
    if (digit === "0") {
      if (out) zero = true;
      continue;
    }
    if (zero) out += "零";
    out += FINANCIAL_DIGITS[digit.charCodeAt(0) - 48] + PLACE_UNITS[section.length - index - 1];
    zero = false;
  }
  return out;
}

function integerUppercase(integer: string): string {
  if (integer === "0") return "零";
  const sections: string[] = [];
  for (let end = integer.length; end > 0; end -= 4) {
    sections.push(integer.slice(Math.max(0, end - 4), end));
  }
  let out = "";
  let skipped = false;
  for (let index = sections.length - 1; index >= 0; index--) {
    const section = sections[index];
    if (/^0+$/.test(section)) {
      if (out) skipped = true;
      continue;
    }
    if (out && (skipped || section.startsWith("0"))) out += "零";
    out += sectionUppercase(section) + GROUP_UNITS[index];
    skipped = false;
  }
  return out;
}

/**
 * Accept only non-negative decimal text. No floating-point conversion,
 * rounding, exponent syntax, grouping, currency prefix or reverse parsing.
 */
export function convertRmbUppercase(input: unknown): RmbUppercaseResult {
  if (typeof input !== "string") return { ok: false, error: "format" };
  if (input.length > RMB_UPPERCASE_LIMITS.inputCharacters) return { ok: false, error: "too_long" };
  const text = input.trim().replace(/[０-９．]/g, (char) => char === "．" ? "." : String.fromCharCode(char.charCodeAt(0) - 0xfee0));
  if (!text) return { ok: false, error: "empty" };
  const match = /^(\d+)(?:\.(\d+))?$/.exec(text);
  if (!match) return { ok: false, error: "format" };
  const fraction = match[2] ?? "";
  if (fraction.length > RMB_UPPERCASE_LIMITS.fractionDigits) return { ok: false, error: "precision" };
  const integer = match[1].replace(/^0+(?=\d)/, "");
  if (integer.length > RMB_UPPERCASE_LIMITS.integerDigits) return { ok: false, error: "range" };
  const decimals = fraction.padEnd(2, "0");
  const minorUnits = BigInt(integer) * 100n + BigInt(decimals);
  const jiao = decimals[0];
  const fen = decimals[1];
  let uppercase = `人民币${integerUppercase(integer)}元`;
  if (jiao === "0" && fen === "0") uppercase += "整";
  else {
    if (jiao !== "0") {
      // Use the official permitted 元零角 form consistently when 元位=0.
      if (integer !== "0" && integer.endsWith("0")) uppercase += "零";
      uppercase += FINANCIAL_DIGITS[jiao.charCodeAt(0) - 48] + "角";
    } else uppercase += "零";
    if (fen !== "0") uppercase += FINANCIAL_DIGITS[fen.charCodeAt(0) - 48] + "分";
    else uppercase += "整";
  }
  return { ok: true, normalizedAmount: `${integer}.${decimals}`, minorUnits: minorUnits.toString(), uppercase };
}
