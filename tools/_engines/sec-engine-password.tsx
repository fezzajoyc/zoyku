"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import {
  AMBIGUOUS, buildPool, bucketOf, generatePassphrase, generatePassword,
  passphraseEntropy, passwordEntropy, randInt, SETS,
} from "../_lib/password";

/**
 * 密码 / 口令短语生成器 —— crypto.getRandomValues 本地生成,无 props。
 * 字符集模式下熵 = 长度 × log2(池大小);口令短语模式熵按内置词表实际长度计算。
 * exclude-ambiguous 会从各字符集中剔除 Il1O0o 这类易混淆字符。
 */


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
    en: "Password", zh: "随机密码", ja: "パスワード", es: "Contraseña", pt: "Senha", fr: "Mot de passe", de: "Passwort", ru: "Пароль", it: "Password", tr: "Şifre", ko: "비밀번호", ar: "كلمة المرور", hi: "पासवर्ड", id: "Kata sandi", vi: "Mật khẩu",
  },
  modePassphrase: {
    en: "Passphrase", zh: "口令短语", ja: "パスフレーズ", es: "Frase contraseña", pt: "Frase-senha", fr: "Phrase secrète", de: "Passphrase", ru: "Парольная фраза", it: "Frase password", tr: "Parola cümlesi", ko: "패스프레이즈", ar: "عبارة المرور", hi: "पासफ़्रेज़", id: "Frasa sandi", vi: "Cụm mật khẩu",
  },
  length: { en: "Length", zh: "长度", ja: "文字数", es: "Longitud", pt: "Comprimento", fr: "Longueur", de: "Länge", ru: "Длина", it: "Lunghezza", tr: "Uzunluk", ko: "길이", ar: "الطول", hi: "लंबाई", id: "Panjang", vi: "Độ dài", },
  words: { en: "Words", zh: "单词数", ja: "単語数", es: "Palabras", pt: "Palavras", fr: "Mots", de: "Wörter", ru: "Слов", it: "Parole", tr: "Kelime", ko: "단어 수", ar: "الكلمات", hi: "शब्द", id: "Kata", vi: "Số từ", },
  upper: { en: "A–Z", zh: "大写字母 A–Z", ja: "大文字 A–Z", es: "Mayúsculas A–Z", pt: "Maiúsculas A–Z", fr: "A–Z", de: "A–Z", ru: "A–Z", it: "A–Z", tr: "A–Z", ko: "A–Z", ar: "A–Z", hi: "A–Z", id: "A–Z", vi: "A–Z", },
  lower: { en: "a–z", zh: "小写字母 a–z", ja: "小文字 a–z", es: "Minúsculas a–z", pt: "Minúsculas a–z", fr: "a–z", de: "a–z", ru: "a–z", it: "a–z", tr: "a–z", ko: "a–z", ar: "a–z", hi: "a–z", id: "a–z", vi: "a–z", },
  digits: { en: "0–9", zh: "数字 0–9", ja: "数字 0–9", es: "Números 0–9", pt: "Números 0–9", fr: "0–9", de: "0–9", ru: "0–9", it: "0–9", tr: "0–9", ko: "0–9", ar: "0–9", hi: "0–9", id: "0–9", vi: "0–9", },
  symbols: { en: "!@# symbols", zh: "符号 !@#", ja: "記号 !@#", es: "Símbolos !@#", pt: "Símbolos !@#", fr: "!@# symboles", de: "!@# Symbole", ru: "!@# символы", it: "!@# simboli", tr: "!@# simgeler", ko: "!@# 특수문자", ar: "!@# رموز", hi: "!@# प्रतीक", id: "!@# simbol", vi: "!@# ký hiệu", },
  noAmbiguous: {
    en: "Exclude look-alikes (l, I, 1, O, 0, o)",
    zh: "排除易混淆字符(l、I、1、O、0、o)",
    ja: "紛らわしい文字を除外(l、I、1、O、0、o)",
    es: "Excluir caracteres parecidos (l, I, 1, O, 0, o)",
    pt: "Excluir caracteres parecidos (l, I, 1, O, 0, o)", fr: "Exclure les caractères semblables (l, I, 1, O, 0, o)", de: "Ähnliche Zeichen ausschließen (l, I, 1, O, 0, o)", ru: "Исключить похожие символы (l, I, 1, O, 0, o)", it: "Escludi caratteri simili (l, I, 1, O, 0, o)", tr: "Benzer karakterleri hariç tut (l, I, 1, O, 0, o)", ko: "혼동되기 쉬운 문자 제외 (l, I, 1, O, 0, o)", ar: "استبعاد الأحرف المتشابهة (l, I, 1, O, 0, o)", hi: "समान दिखने वाले अक्षर हटाएँ (l, I, 1, O, 0, o)", id: "Kecualikan karakter mirip (l, I, 1, O, 0, o)", vi: "Loại bỏ ký tự dễ nhầm (l, I, 1, O, 0, o)",
  },
  separator: { en: "Separator", zh: "分隔符", ja: "区切り文字", es: "Separador", pt: "Separador", fr: "Séparateur", de: "Trennzeichen", ru: "Разделитель", it: "Separatore", tr: "Ayırıcı", ko: "구분 기호", ar: "الفاصل", hi: "विभाजक", id: "Pemisah", vi: "Ký tự phân cách", },
  capitalize: {
    en: "Capitalize words", zh: "首字母大写", ja: "単語を大文字で始める", es: "Capitalizar palabras", pt: "Capitalizar palavras", fr: "Majuscule aux mots", de: "Wörter großschreiben", ru: "Слова с заглавной", it: "Maiuscola alle parole", tr: "Kelimeleri büyük harfle başlat", ko: "단어 첫 글자 대문자", ar: "كبّر أول حرف من الكلمات", hi: "शब्दों का पहला अक्षर बड़ा करें", id: "Kapitalkan kata", vi: "Viết hoa các từ",
  },
  addNumber: {
    en: "Append a number", zh: "末尾附加数字", ja: "数字を追加", es: "Añadir un número", pt: "Adicionar um número", fr: "Ajouter un nombre", de: "Zahl anhängen", ru: "Добавить число", it: "Aggiungi un numero", tr: "Sayı ekle", ko: "숫자 추가", ar: "إضافة رقم", hi: "अंत में संख्या जोड़ें", id: "Tambah angka", vi: "Thêm số ở cuối",
  },
  entropy: { en: "Entropy", zh: "熵", ja: "エントロピー", es: "Entropía", pt: "Entropia", fr: "Entropie", de: "Entropie", ru: "Энтропия", it: "Entropia", tr: "Entropi", ko: "엔트로피", ar: "الإنتروبيا", hi: "एन्ट्रॉपी", id: "Entropi", vi: "Entropi", },
  bits: { en: "bits", zh: "位", ja: "ビット", es: "bits", pt: "bits", fr: "bits", de: "Bit", ru: "бит", it: "bit", tr: "bit", ko: "비트", ar: "بت", hi: "बिट", id: "bit", vi: "bit", },
  regenerate: { en: "Generate new", zh: "换一个", ja: "新しく生成", es: "Generar otro", pt: "Gerar outro", fr: "Générer un nouveau", de: "Neu generieren", ru: "Сгенерировать новый", it: "Genera di nuovo", tr: "Yeniden oluştur", ko: "새로 생성", ar: "إنشاء جديد", hi: "नया जेनरेट करें", id: "Buat baru", vi: "Tạo mới", },
  weak: { en: "Weak", zh: "较弱", ja: "弱い", es: "Débil", pt: "Fraca", fr: "Faible", de: "Schwach", ru: "Слабый", it: "Debole", tr: "Zayıf", ko: "약함", ar: "ضعيفة", hi: "कमज़ोर", id: "Lemah", vi: "Yếu", },
  fair: { en: "Fair", zh: "中等", ja: "普通", es: "Aceptable", pt: "Razoável", fr: "Correct", de: "Mittel", ru: "Средний", it: "Accettabile", tr: "Orta", ko: "보통", ar: "مقبولة", hi: "ठीक-ठाक", id: "Cukup", vi: "Trung bình", },
  strong: { en: "Strong", zh: "强", ja: "強い", es: "Fuerte", pt: "Forte", fr: "Fort", de: "Stark", ru: "Надёжный", it: "Forte", tr: "Güçlü", ko: "강함", ar: "قوية", hi: "मज़बूत", id: "Kuat", vi: "Mạnh", },
  excellent: { en: "Excellent", zh: "极强", ja: "非常に強い", es: "Excelente", pt: "Excelente", fr: "Excellent", de: "Ausgezeichnet", ru: "Отличный", it: "Eccellente", tr: "Mükemmel", ko: "매우 강함", ar: "ممتازة", hi: "अत्यंत मज़बूत", id: "Sangat kuat", vi: "Rất mạnh", },
  sepDash: { en: "Hyphen (-)", zh: "连字符 (-)", ja: "ハイフン (-)", es: "Guion (-)", pt: "Hífen (-)", fr: "Tiret (-)", de: "Bindestrich (-)", ru: "Дефис (-)", it: "Trattino (-)", tr: "Kısa çizgi (-)", ko: "하이픈 (-)", ar: "شرطة (-)", hi: "हाइफ़न (-)", id: "Tanda hubung (-)", vi: "Gạch nối (-)", },
  sepDot: { en: "Dot (.)", zh: "句点 (.)", ja: "ドット (.)", es: "Punto (.)", pt: "Ponto (.)", fr: "Point (.)", de: "Punkt (.)", ru: "Точка (.)", it: "Punto (.)", tr: "Nokta (.)", ko: "점 (.)", ar: "نقطة (.)", hi: "बिंदु (.)", id: "Titik (.)", vi: "Dấu chấm (.)", },
  sepUnderscore: { en: "Underscore (_)", zh: "下划线 (_)", ja: "アンダースコア (_)", es: "Guion bajo (_)", pt: "Sublinhado (_)", fr: "Souligné (_)", de: "Unterstrich (_)", ru: "Подчёркивание (_)", it: "Trattino basso (_)", tr: "Alt çizgi (_)", ko: "밑줄 (_)", ar: "شرطة سفلية (_)", hi: "अंडरस्कोर (_)", id: "Garis bawah (_)", vi: "Gạch dưới (_)", },
  sepSpace: { en: "Space", zh: "空格", ja: "スペース", es: "Espacio", pt: "Espaço", fr: "Espace", de: "Leerzeichen", ru: "Пробел", it: "Spazio", tr: "Boşluk", ko: "공백", ar: "مسافة", hi: "स्पेस", id: "Spasi", vi: "Khoảng trắng", },
  sepNone: { en: "None", zh: "无", ja: "なし", es: "Ninguno", pt: "Nenhum", fr: "Aucun", de: "Keine", ru: "Нет", it: "Nessuno", tr: "Yok", ko: "없음", ar: "بدون", hi: "कोई नहीं", id: "Tanpa", vi: "Không", },
  localNote: {
    en: "Generated in your browser with crypto.getRandomValues — never sent, never stored.",
    zh: "由浏览器通过 crypto.getRandomValues 本地生成——不发送、不存储。",
    ja: "ブラウザ内で crypto.getRandomValues を使って生成。送信も保存もされません。",
    es: "Generada en tu navegador con crypto.getRandomValues: no se envía ni se guarda nunca.",
    pt: "Gerada no seu navegador com crypto.getRandomValues — nunca enviada nem armazenada.", fr: "Généré dans votre navigateur avec crypto.getRandomValues — jamais envoyé, jamais stocké.", de: "Im Browser mit crypto.getRandomValues erzeugt — nie gesendet, nie gespeichert.", ru: "Генерируется в браузере через crypto.getRandomValues — никогда не отправляется и не сохраняется.", it: "Generato nel browser con crypto.getRandomValues — mai inviato, mai salvato.", tr: "Tarayıcınızda crypto.getRandomValues ile üretilir — asla gönderilmez, saklanmaz.", ko: "브라우저에서 crypto.getRandomValues로 생성 — 전송·저장되지 않습니다.", ar: "يُنشأ في متصفحك عبر crypto.getRandomValues — لا يُرسل ولا يُخزَّن أبداً.", hi: "आपके ब्राउज़र में crypto.getRandomValues से जेनरेट होता है — कभी भेजा या सेव नहीं होता।", id: "Dibuat di browser Anda dengan crypto.getRandomValues — tak pernah dikirim atau disimpan.", vi: "Tạo ngay trong trình duyệt bằng crypto.getRandomValues — không bao giờ gửi hay lưu.",
  },
};

const SEPARATORS = ["-", ".", "_", " ", ""] as const;

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
      // capitalize 是确定性变换,不计熵(诚实口径,与 Bitwarden/1Password 一致)
      return passphraseEntropy(wordCount, WORDS.length, addNumber);
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
      setOut(generatePassphrase(WORDS, wordCount, separator, capitalize, addNumber));
      return;
    }
    const pool = buildPool({ upper: useUpper, lower: useLower, digits: useDigits, symbols: useSymbols, noAmbiguous });
    setOut(generatePassword(pool, length));
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
                  ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
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
