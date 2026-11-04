/**
 * 密码/口令短语生成纯函数(从 sec-engine-password 抽出,可测试)。
 * crypto.getRandomValues + 无模偏差拒绝采样;熵按诚实口径计算:
 * 确定性的 capitalize 不计入熵(Bitwarden/1Password 同口径)。
 */

export const SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/",
} as const;

export const AMBIGUOUS = new Set([..."Il1O0o"]);

export function buildPool(opts: {
  upper: boolean; lower: boolean; digits: boolean; symbols: boolean; noAmbiguous?: boolean;
}): string {
  let pool = "";
  if (opts.upper) pool += SETS.upper;
  if (opts.lower) pool += SETS.lower;
  if (opts.digits) pool += SETS.digits;
  if (opts.symbols) pool += SETS.symbols;
  if (opts.noAmbiguous) pool = [...pool].filter((c) => !AMBIGUOUS.has(c)).join("");
  return pool;
}

/** 无模偏差的随机整数:[0, n)(拒绝采样,Node 18+/浏览器通用) */
export function randInt(n: number, random: (buf: Uint32Array) => void = (b) => crypto.getRandomValues(b)): number {
  const buf = new Uint32Array(1);
  const limit = 0x100000000 - (0x100000000 % n);
  let x: number;
  do {
    random(buf);
    x = buf[0];
  } while (x >= limit);
  return x % n;
}

export function passwordEntropy(pool: string, length: number): number {
  return pool.length > 1 ? length * Math.log2(pool.length) : 0;
}

export function passphraseEntropy(wordCount: number, listLength: number, addNumber: boolean): number {
  // capitalize 是确定性变换,不计熵(诚实口径)
  let b = wordCount * Math.log2(listLength);
  if (addNumber) b += Math.log2(90); // 10–99
  return b;
}

export function bucketOf(bits: number): "weak" | "fair" | "strong" | "excellent" {
  if (bits < 45) return "weak";
  if (bits < 70) return "fair";
  if (bits < 100) return "strong";
  return "excellent";
}

export function generatePassword(pool: string, length: number, random?: (buf: Uint32Array) => void): string {
  if (pool.length < 2) return "";
  let pw = "";
  for (let i = 0; i < length; i++) pw += pool[randInt(pool.length, random)];
  return pw;
}

export function generatePassphrase(
  words: readonly string[],
  wordCount: number,
  separator: string,
  capitalize: boolean,
  addNumber: boolean,
  random?: (buf: Uint32Array) => void,
): string {
  const parts: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    let w = words[randInt(words.length, random)];
    if (capitalize) w = w[0].toUpperCase() + w.slice(1);
    parts.push(w);
  }
  let phrase = parts.join(separator);
  if (addNumber) phrase += (separator || "-") + String(randInt(90, random) + 10);
  return phrase;
}
