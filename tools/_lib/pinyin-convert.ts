/**
 * CN-014/015:汉字拼音转换(pinyin-pro 3.29.5,MIT)。
 * 支持全拼/首字母/声调数字/无声调;多音字自动校正(如 重庆→chóngqìng)。
 * 懒加载(词典 0.91MB unpacked)。
 */

type PinyinModule = {
  pinyin: (text: string, options?: Record<string, unknown>) => string;
};

let moduleCache: PinyinModule | null = null;

async function getModule(): Promise<PinyinModule> {
  if (!moduleCache) {
    moduleCache = (await import("pinyin-pro")) as unknown as PinyinModule;
  }
  return moduleCache;
}

export type PinyinMode = "tone" | "num" | "first" | "none";

export type PinyinResult =
  | { ok: true; text: string }
  | { ok: false; code: "empty" | "noChinese" | "tooLong" };

const MAX_INPUT = 50_000;

export async function convertToPinyin(
  text: string,
  mode: PinyinMode,
): Promise<PinyinResult> {
  if (text.trim() === "") return { ok: false, code: "empty" };
  if (text.length > MAX_INPUT) return { ok: false, code: "tooLong" };
  // 检查是否包含汉字(U+4E00–U+9FFF 或扩展 A)
  const hasChinese = /[\u4e00-\u9fff\u3400-\u4dbf]/.test(text);
  if (!hasChinese) return { ok: false, code: "noChinese" };
  const mod = await getModule();
  const opts: Record<string, unknown> = { toneType: mode === "none" ? "none" : mode === "num" ? "num" : "mark", type: "string" };
  if (mode === "first") {
    return { ok: true, text: mod.pinyin(text, { pattern: "first", toneType: "none", type: "string" }) };
  }
  return { ok: true, text: mod.pinyin(text, opts) };
}
