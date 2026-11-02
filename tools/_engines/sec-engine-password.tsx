"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

/**
 * 密码 / 口令短语生成器 —— crypto.getRandomValues 本地生成,无 props。
 * 字符集模式下熵 = 长度 × log2(池大小);口令短语模式熵按内置词表实际长度计算。
 * exclude-ambiguous 会从各字符集中剔除 Il1O0o 这类易混淆字符。
 */

const SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/",
} as const;

const AMBIGUOUS = new Set([..."Il1O0o"]);

/** 内置口令短语词表:256 个常见英文词,全部为常见、好打好记的小写词(3–10 字母)。 */
const WORDS: string[] = [
  // 1
  "apple", "arrow", "beach", "bird", "bread", "brush", "camel", "candle",
  "canyon", "cherry", "cloud", "coral", "cotton", "cricket", "crown", "dance",
  // 2
  "dawn", "delta", "desert", "dolphin", "dragon", "dream", "dune", "eagle",
  "earth", "ember", "falcon", "feather", "fern", "field", "fire", "flame",
  // 3
  "float", "flower", "forest", "fossil", "fox", "frost", "garden", "ginger",
  "glacier", "grape", "grass", "harbor", "hawk", "hazel", "honey", "horizon",
  // 4
  "island", "ivory", "jade", "jungle", "juniper", "kayak", "lagoon", "lantern",
  "lemon", "lighthouse", "lily", "lion", "lotus", "lumber", "magnet", "maple",
  // 5
  "marble", "meadow", "melon", "meteor", "mirror", "mist", "moon", "moss",
  "mountain", "nectar", "needle", "noble", "north", "ocean", "olive", "onyx",
  // 6
  "opal", "orbit", "orchid", "otter", "owl", "paddle", "palm", "panda",
  "paper", "pearl", "pebble", "penguin", "pepper", "petal", "phoenix", "piano",
  // 7
  "pilot", "pine", "planet", "plum", "polar", "pond", "poppy", "prairie",
  "quail", "quartz", "quilt", "rabbit", "rainbow", "raven", "reef", "ribbon",
  // 8
  "river", "robin", "rocket", "rose", "ruby", "sail", "salmon", "sand",
  "sapphire", "satin", "shadow", "shell", "shore", "silk", "silver", "sky",
  // 9
  "slate", "snow", "solar", "sparrow", "spice", "spruce", "star", "stone",
  "storm", "sugar", "summer", "sunset", "swift", "tiger", "timber", "tobacco",
  // 10
  "topaz", "torch", "tower", "trail", "tree", "tulip", "tundra", "turtle",
  "valley", "velvet", "vine", "violet", "volcano", "walnut", "water", "whale",
  // 11
  "wheat", "willow", "wind", "winter", "wolf", "wonder", "wood", "woven",
  "yarrow", "zebra", "zenith", "amber", "anchor", "ash", "aspen", "aurora",
  // 12
  "autumn", "azure", "basil", "bay", "birch", "blossom", "breeze", "brook",
  "butter", "cactus", "cedar", "clover", "comet", "copper", "cosmos", "crystal",
  // 13
  "diamond", "daisy", "elm", "emerald", "fable", "fjord", "flint", "fog",
  "galaxy", "garnet", "gecko", "gem", "grove", "hammer", "haven", "herb",
  // 14
  "hill", "hollow", "ice", "iris", "ivy", "jasmine", "jewel", "lark",
  "leaf", "legend", "lilac", "linen", "lupine", "mango", "mellow", "mimic",
  // 15
  "mint", "mocha", "nature", "nomad", "oak", "oasis", "orchard", "osprey",
  "oxide", "pace", "pansy", "patina", "peach", "pewter", "phantom", "pigeon",
  // 16
  "pollen", "poplar", "porter", "prism", "prune", "pueblo", "quiver", "radish",
  "rapids", "resin", "ripple", "rowan", "rustic", "sage", "sandal", "saffron",
  // 17
  "beacon", "bramble", "cinder", "cove", "crane", "dahlia", "dew", "fawn",
  "flax", "glade", "gorge", "kite", "nest", "pampas", "ridge", "sprig", "tide",
];

const LABELS: Record<string, Record<string, string>> = {
  modePassword: {
    en: "Password", zh: "随机密码", ja: "パスワード", es: "Contraseña", pt: "Senha",
  },
  modePassphrase: {
    en: "Passphrase", zh: "口令短语", ja: "パスフレーズ", es: "Frase contraseña", pt: "Frase-senha",
  },
  length: { en: "Length", zh: "长度", ja: "文字数", es: "Longitud", pt: "Comprimento" },
  words: { en: "Words", zh: "单词数", ja: "単語数", es: "Palabras", pt: "Palavras" },
  upper: { en: "A–Z", zh: "大写字母 A–Z", ja: "大文字 A–Z", es: "Mayúsculas A–Z", pt: "Maiúsculas A–Z" },
  lower: { en: "a–z", zh: "小写字母 a–z", ja: "小文字 a–z", es: "Minúsculas a–z", pt: "Minúsculas a–z" },
  digits: { en: "0–9", zh: "数字 0–9", ja: "数字 0–9", es: "Números 0–9", pt: "Números 0–9" },
  symbols: { en: "!@# symbols", zh: "符号 !@#", ja: "記号 !@#", es: "Símbolos !@#", pt: "Símbolos !@#" },
  noAmbiguous: {
    en: "Exclude look-alikes (l, I, 1, O, 0, o)",
    zh: "排除易混淆字符(l、I、1、O、0、o)",
    ja: "紛らわしい文字を除外(l、I、1、O、0、o)",
    es: "Excluir caracteres parecidos (l, I, 1, O, 0, o)",
    pt: "Excluir caracteres parecidos (l, I, 1, O, 0, o)",
  },
  separator: { en: "Separator", zh: "分隔符", ja: "区切り文字", es: "Separador", pt: "Separador" },
  capitalize: {
    en: "Capitalize words", zh: "首字母大写", ja: "単語を大文字で始める", es: "Capitalizar palabras", pt: "Capitalizar palavras",
  },
  addNumber: {
    en: "Append a number", zh: "末尾附加数字", ja: "数字を追加", es: "Añadir un número", pt: "Adicionar um número",
  },
  entropy: { en: "Entropy", zh: "熵", ja: "エントロピー", es: "Entropía", pt: "Entropia" },
  bits: { en: "bits", zh: "位", ja: "ビット", es: "bits", pt: "bits" },
  regenerate: { en: "Generate new", zh: "换一个", ja: "新しく生成", es: "Generar otro", pt: "Gerar outro" },
  weak: { en: "Weak", zh: "较弱", ja: "弱い", es: "Débil", pt: "Fraca" },
  fair: { en: "Fair", zh: "中等", ja: "普通", es: "Aceptable", pt: "Razoável" },
  strong: { en: "Strong", zh: "强", ja: "強い", es: "Fuerte", pt: "Forte" },
  excellent: { en: "Excellent", zh: "极强", ja: "非常に強い", es: "Excelente", pt: "Excelente" },
  sepDash: { en: "Hyphen (-)", zh: "连字符 (-)", ja: "ハイフン (-)", es: "Guion (-)", pt: "Hífen (-)" },
  sepDot: { en: "Dot (.)", zh: "句点 (.)", ja: "ドット (.)", es: "Punto (.)", pt: "Ponto (.)" },
  sepUnderscore: { en: "Underscore (_)", zh: "下划线 (_)", ja: "アンダースコア (_)", es: "Guion bajo (_)", pt: "Sublinhado (_)" },
  sepSpace: { en: "Space", zh: "空格", ja: "スペース", es: "Espacio", pt: "Espaço" },
  sepNone: { en: "None", zh: "无", ja: "なし", es: "Ninguno", pt: "Nenhum" },
  localNote: {
    en: "Generated in your browser with crypto.getRandomValues — never sent, never stored.",
    zh: "由浏览器通过 crypto.getRandomValues 本地生成——不发送、不存储。",
    ja: "ブラウザ内で crypto.getRandomValues を使って生成。送信も保存もされません。",
    es: "Generada en tu navegador con crypto.getRandomValues: no se envía ni se guarda nunca.",
    pt: "Gerada no seu navegador com crypto.getRandomValues — nunca enviada nem armazenada.",
  },
};

const SEPARATORS = ["-", ".", "_", " ", ""] as const;

/** 无模偏差的随机整数:[0, n) */
function randInt(n: number): number {
  const buf = new Uint32Array(1);
  const limit = 0x100000000 - (0x100000000 % n);
  let x: number;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % n;
}

function pick<T>(list: T[]): T {
  return list[randInt(list.length)];
}

function bucketOf(bits: number): "weak" | "fair" | "strong" | "excellent" {
  if (bits < 45) return "weak";
  if (bits < 70) return "fair";
  if (bits < 100) return "strong";
  return "excellent";
}

export function SecPasswordGeneratorEngine() {
  const { locale } = useI18n();
  const L = (key: string) => LABELS[key][locale] ?? LABELS[key].en;

  const [mode, setMode] = useState<"password" | "passphrase">("password");
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [noAmbiguous, setNoAmbiguous] = useState(false);
  const [wordCount, setWordCount] = useState(5);
  const [separator, setSeparator] = useState<(typeof SEPARATORS)[number]>("-");
  const [capitalize, setCapitalize] = useState(true);
  const [addNumber, setAddNumber] = useState(false);
  const [out, setOut] = useState("");

  const bits = useMemo(() => {
    if (mode === "passphrase") {
      let b = wordCount * Math.log2(WORDS.length);
      if (capitalize) b += wordCount; // 每个词多 1 bit 二选一
      if (addNumber) b += Math.log2(90); // 10–99
      return b;
    }
    let pool = "";
    if (useUpper) pool += SETS.upper;
    if (useLower) pool += SETS.lower;
    if (useDigits) pool += SETS.digits;
    if (useSymbols) pool += SETS.symbols;
    if (noAmbiguous) pool = [...pool].filter((c) => !AMBIGUOUS.has(c)).join("");
    return pool.length > 1 ? length * Math.log2(pool.length) : 0;
  }, [mode, length, useUpper, useLower, useDigits, useSymbols, noAmbiguous, wordCount, capitalize, addNumber]);

  const generate = useCallback(() => {
    if (mode === "passphrase") {
      const words: string[] = [];
      for (let i = 0; i < wordCount; i++) {
        let w = pick(WORDS);
        if (capitalize) w = w[0].toUpperCase() + w.slice(1);
        words.push(w);
      }
      let phrase = words.join(separator);
      if (addNumber) phrase += (separator || "-") + String(randInt(90) + 10);
      setOut(phrase);
      return;
    }
    let pool = "";
    if (useUpper) pool += SETS.upper;
    if (useLower) pool += SETS.lower;
    if (useDigits) pool += SETS.digits;
    if (useSymbols) pool += SETS.symbols;
    if (noAmbiguous) pool = [...pool].filter((c) => !AMBIGUOUS.has(c)).join("");
    if (pool.length < 2) {
      setOut("");
      return;
    }
    let pw = "";
    for (let i = 0; i < length; i++) pw += pool[randInt(pool.length)];
    setOut(pw);
  }, [mode, length, wordCount, separator, capitalize, addNumber, useUpper, useLower, useDigits, useSymbols, noAmbiguous]);

  // 选项一变就即时重生成,保持"所见即所得"
  useEffect(() => {
    generate();
  }, [generate]);

  const bucket = bucketOf(bits);
  const bucketLabel = L(bucket);
  const barColor =
    bucket === "weak" ? "var(--color-bad)" : bucket === "fair" ? "#b8860b" : "var(--color-good)";

  const toggleCls =
    "inline-flex items-center gap-2 rounded-full border hairline px-3.5 py-1.5 text-[13.5px] font-medium transition-colors cursor-pointer select-none";

  return (
    <ToolPanel>
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {(["password", "passphrase"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors ${
                mode === m
                  ? "border-transparent bg-[var(--color-ink)] text-white"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {L(m === "password" ? "modePassword" : "modePassphrase")}
            </button>
          ))}
        </div>

        {mode === "password" ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-24 flex-none text-[14px] font-medium">{L("length")}</span>
              <input
                type="range"
                min={8}
                max={64}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full max-w-xs"
                aria-label={L("length")}
              />
              <span className="mono w-10 text-right text-[14px] font-semibold">{length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["upper", useUpper, setUseUpper],
                  ["lower", useLower, setUseLower],
                  ["digits", useDigits, setUseDigits],
                  ["symbols", useSymbols, setUseSymbols],
                ] as const
              ).map(([key, val, set]) => (
                <label key={key} className={`${toggleCls} ${val ? "bg-[var(--color-surface)]" : "opacity-60"}`}>
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={(e) => set(e.target.checked)}
                    className="accent-[var(--color-accent)]"
                  />
                  {L(key)}
                </label>
              ))}
              <label className={`${toggleCls} ${noAmbiguous ? "bg-[var(--color-surface)]" : "opacity-60"}`}>
                <input
                  type="checkbox"
                  checked={noAmbiguous}
                  onChange={(e) => setNoAmbiguous(e.target.checked)}
                  className="accent-[var(--color-accent)]"
                />
                {L("noAmbiguous")}
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-24 flex-none text-[14px] font-medium">{L("words")}</span>
              <input
                type="range"
                min={3}
                max={10}
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="w-full max-w-xs"
                aria-label={L("words")}
              />
              <span className="mono w-10 text-right text-[14px] font-semibold">{wordCount}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 text-[14px]">
                <span>{L("separator")}</span>
                <select
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value as (typeof SEPARATORS)[number])}
                  className="field w-auto py-1.5 text-[14px]"
                >
                  <option value="-">{L("sepDash")}</option>
                  <option value=".">{L("sepDot")}</option>
                  <option value="_">{L("sepUnderscore")}</option>
                  <option value=" ">{L("sepSpace")}</option>
                  <option value="">{L("sepNone")}</option>
                </select>
              </label>
              <label className={toggleCls}>
                <input
                  type="checkbox"
                  checked={capitalize}
                  onChange={(e) => setCapitalize(e.target.checked)}
                  className="accent-[var(--color-accent)]"
                />
                {L("capitalize")}
              </label>
              <label className={toggleCls}>
                <input
                  type="checkbox"
                  checked={addNumber}
                  onChange={(e) => setAddNumber(e.target.checked)}
                  className="accent-[var(--color-accent)]"
                />
                {L("addNumber")}
              </label>
            </div>
          </div>
        )}

        <div className="rounded-xl bg-[var(--color-surface)] px-4 py-5 text-center">
          <p className="mono break-all text-[20px] font-semibold leading-7 tracking-wide sm:text-[24px]">
            {out || "—"}
          </p>
        </div>

        {bits > 0 && (
          <div>
            <p className="mb-1.5 flex items-baseline gap-2 text-[13.5px]">
              <span className="font-medium">
                {L("entropy")}: <span className="mono">{Math.round(bits)}</span> {L("bits")}
              </span>
              <span className="font-semibold" style={{ color: barColor }}>
                · {bucketLabel}
              </span>
            </p>
            <div className="h-1.5 w-full max-w-md overflow-hidden rounded-full bg-[var(--color-surface)]">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (bits / 128) * 100)}%`, background: barColor }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={out} />
          <button
            type="button"
            onClick={generate}
            className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {L("regenerate")}
          </button>
        </div>

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{L("localNote")}</p>
      </div>
    </ToolPanel>
  );
}
