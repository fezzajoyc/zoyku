/**
 * CN-016:简繁中文转换(opencc-js 1.4.2,MIT)。
 * 支持:简→繁(OpenCC标准/台湾/香港)、繁→简。
 * 懒加载(词典 5.81MB unpacked,只在首次调用时 import)。
 */

type OpenCCModule = {
  Converter: (config: { from: string; to: string }) => ((text: string) => string);
};

let moduleCache: OpenCCModule | null = null;

async function getModule(): Promise<OpenCCModule> {
  if (!moduleCache) {
    moduleCache = (await import("opencc-js")) as unknown as OpenCCModule;
  }
  return moduleCache;
}

export type ChineseVariant = "s2t" | "s2tw" | "s2hk" | "t2s";

const VARIANTS: Record<ChineseVariant, { from: string; to: string }> = {
  s2t: { from: "cn", to: "twp" }, // 简→繁(OpenCC 标准,含词汇)
  s2tw: { from: "cn", to: "tw" }, // 简→繁(台湾正体)
  s2hk: { from: "cn", to: "hk" }, // 简→繁(香港繁体)
  t2s: { from: "t", to: "cn" },   // 繁→简
};

export type ConvertResult =
  | { ok: true; text: string }
  | { ok: false; code: "empty" | "tooLong" };

const MAX_INPUT = 100_000;

export async function convertChineseText(
  text: string,
  variant: ChineseVariant,
): Promise<ConvertResult> {
  if (text.trim() === "") return { ok: false, code: "empty" };
  if (text.length > MAX_INPUT) return { ok: false, code: "tooLong" };
  const mod = await getModule();
  const cfg = VARIANTS[variant];
  if (!cfg) return { ok: false, code: "empty" };
  const conv = mod.Converter({ from: cfg.from, to: cfg.to });
  return { ok: true, text: conv(text) };
}

export const CHINESE_VARIANT_LABELS: Record<ChineseVariant, string> = {
  s2t: "简 → 繁",
  s2tw: "简 → 繁(台)",
  s2hk: "简 → 繁(港)",
  t2s: "繁 → 简",
};
