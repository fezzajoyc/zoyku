"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, Sel, Tabs, TextIn, fmt, pick } from "./calc-ui";

/**
 * Shared engine for the small "converters": binary/hex/octal/decimal grid,
 * Roman numerals (both directions with validation), aspect ratio.
 * props.kind = "binary" | "roman" | "aspect".
 */

/* ---------------- binary ---------------- */

/** Parse a digit string in the given radix into a BigInt; null when invalid. */
function parseBig(s: string, radix: number): bigint | null {
  const t = s.trim().toLowerCase().replace(/[\s_]/g, "");
  if (!t) return null;
  let v = 0n;
  const b = BigInt(radix);
  for (const ch of t) {
    const d = parseInt(ch, radix);
    if (Number.isNaN(d) || ch === "+" || ch === "-") return null;
    v = v * b + BigInt(d);
  }
  return v;
}

/** BigInt to digit string in the given radix. */
function toBigStr(v: bigint, radix: number): string {
  if (v === 0n) return "0";
  if (v < 0n) return "-" + toBigStr(-v, radix);
  const digits = "0123456789abcdef";
  let out = "";
  const b = BigInt(radix);
  while (v > 0n) {
    out = digits[Number(v % b)] + out;
    v /= b;
  }
  return out;
}

const GROUP = (s: string, size: number): string => {
  const neg = s.startsWith("-");
  const body = neg ? s.slice(1) : s;
  const out = body.replace(new RegExp(`\\B(?=(.{${size}})+(?!.))`, "g"), " ");
  return (neg ? "-" : "") + out;
};

function Binary() {
  const { locale } = useI18n();
  const [state, setState] = useState<{ raw: string; radix: number }>({ raw: "255", radix: 10 });
  const v = parseBig(state.raw, state.radix);

  const fields: { radix: number; label: string; text: string; group: number }[] = [
    { radix: 10, label: "Decimal (DEC)", text: v === null ? "" : toBigStr(v, 10), group: 3 },
    { radix: 16, label: "Hexadecimal (HEX)", text: v === null ? "" : toBigStr(v, 16), group: 2 },
    { radix: 8, label: "Octal (OCT)", text: v === null ? "" : toBigStr(v, 8), group: 3 },
    { radix: 2, label: "Binary (BIN)", text: v === null ? "" : toBigStr(v, 2), group: 4 },
  ];

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <Field key={f.radix} label={f.label}>
            <input
              type="text"
              className={`field mono text-lg ${state.radix === f.radix ? "" : "bg-[var(--color-surface)]"}`}
              value={
                state.radix === f.radix
                  ? state.raw
                  : v === null
                    ? ""
                    : GROUP(toBigStr(v, f.radix).toUpperCase(), f.group)
              }
              onChange={(e) => setState({ raw: e.target.value, radix: f.radix })}
              aria-label={f.label}
              spellCheck={false}
              placeholder={f.radix === 10 ? "0" : "—"}
            />
          </Field>
        ))}
      </div>
      <div className="mt-4">
        <Note>
          {v === null && state.raw.trim() !== ""
            ? pick(locale, {
                en: "That value does not parse in the selected base — check for stray characters.",
                zh: "当前值无法按所选进制解析,请检查是否有多余字符。",
                ja: "選択した基数では解析できません。不要な文字がないか確認してください。",
                es: "Ese valor no se puede interpretar en la base elegida: revise los caracteres.",
                pt: "Não foi possível interpretar esse valor na base escolhida — confira os caracteres.",
                fr: "Cette valeur n'est pas analysable dans la base choisie — vérifiez les caractères parasites.",
                de: "Dieser Wert ist in der gewählten Basis nicht parsebar — prüfe auf fremde Zeichen.",
                ru: "Значение не разбирается в выбранной системе — проверьте на посторонние символы.",
                it: "Questo valore non si analizza nella base scelta — controlla i caratteri estranei.",
                tr: "Bu değer seçilen tabanda ayrıştırılamıyor — yabancı karakterleri kontrol edin.",
                ko: "선택한 진법에서 이 값을 해석할 수 없습니다 — 잘못된 문자를 확인하세요.",
                ar: "تعذّر تحليل هذه القيمة في النظام المختار — تحقق من الأحرف الدخيلة.",
                hi: "चुने गए आधार में यह मान पार्स नहीं हुआ — बाहरी वर्ण जाँचें।",
                id: "Nilai itu tidak terbaca pada basis terpilih — periksa karakter asing.",
                vi: "Không phân tích được giá trị này ở cơ số đã chọn — kiểm tra ký tự lạ.",
              })
            : pick(locale, {
                en: "Type in any field and the other three update instantly. Supports arbitrarily large non-negative integers, and HEX groups every 2 digits, BIN every 4 for readability.",
                zh: "在任意输入框输入,其余三个即时联动。支持任意大的非负整数;HEX 每 2 位、BIN 每 4 位分组便于阅读。",
                ja: "どの欄に入力しても他の 3 欄が即時更新されます。大きな非負整数にも対応し、HEX は 2 桁・BIN は 4 桁ずつ区切って表示します。",
                es: "Escriba en cualquier campo y los otros tres se actualizan al instante. Admite enteros no negativos de cualquier tamaño; HEX se agrupa cada 2 dígitos y BIN cada 4.",
                pt: "Digite em qualquer campo e os outros três atualizam na hora. Aceita inteiros não negativos de qualquer tamanho; HEX agrupa a cada 2 dígitos e BIN a cada 4.",
                fr: "Tapez dans n'importe quel champ, les trois autres se mettent à jour instantanément. Gère des entiers non négatifs arbitrairement grands ; HEX regroupe tous les 2 chiffres, BIN tous les 4 pour la lisibilité.",
                de: "Tippe in ein beliebiges Feld, die anderen drei aktualisieren sofort. Unterstützt beliebig große nicht-negative Ganzzahlen; HEX gruppiert je 2 Ziffern, BIN je 4 zur Lesbarkeit.",
                ru: "Введите в любое поле — остальные три обновятся мгновенно. Поддерживает сколь угодно большие неотрицательные целые; HEX группирует по 2 цифры, BIN по 4 для читаемости.",
                it: "Digita in un campo qualsiasi e gli altri tre si aggiornano all'istante. Supporta interi non negativi arbitrariamente grandi; HEX raggruppa ogni 2 cifre, BIN ogni 4 per leggibilità.",
                tr: "Herhangi bir alana yazın, diğer üçü anında güncellenir. İstenirse kadar büyük negatif olmayan tam sayıları destekler; HEX 2, BIN 4 rakamda bir gruplanır.",
                ko: "아무 필드에나 입력하면 나머지 세 개가 즉시 갱신됩니다. 매우 큰 음이 아닌 정수를 지원하며, HEX는 2자리·BIN은 4자리씩 묶어 가독성을 높입니다.",
                ar: "اكتب في أي حقل فتتحدث الحقول الثلاثة الأخرى فورًا. يدعم أعدادًا صحيحة غير سالبة بأي حجم؛ HEX يجمع كل رقمين وBIN كل 4 للقراءة.",
                hi: "किसी भी फ़ील्ड में लिखें, बाकी तीन तुरंत अपडेट होंगे। बड़ी गैर-ऋणात्मक पूर्ण संख्याएँ समर्थित; HEX हर 2 अंक, BIN हर 4 पर समूहित।",
                id: "Ketik di kolom mana pun, tiga lainnya langsung diperbarui. Mendukung bilangan bulat non-negatif sangat besar; HEX dikelompokkan tiap 2 digit, BIN tiap 4 agar mudah dibaca.",
                vi: "Nhập vào trường bất kỳ, ba trường còn lại cập nhật ngay. Hỗ trợ số nguyên không âm lớn tùy ý; HEX nhóm mỗi 2 chữ số, BIN mỗi 4 cho dễ đọc.",
              })}
        </Note>
      </div>
    </ToolPanel>
  );
}

/* ---------------- roman ---------------- */

const ROMAN_PAIRS: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

const ROMAN_RE = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

function toRoman(n: number): string {
  let out = "";
  let v = n;
  for (const [val, sym] of ROMAN_PAIRS) {
    while (v >= val) {
      out += sym;
      v -= val;
    }
  }
  return out;
}

function fromRoman(s: string): number | null {
  const t = s.trim().toUpperCase();
  if (!t || !ROMAN_RE.test(t)) return null;
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < t.length; i++) {
    const cur = map[t[i]];
    const next = map[t[i + 1]];
    total += next && next > cur ? -cur : cur;
  }
  return total >= 1 && total <= 3999 ? total : null;
}

function Roman() {
  const { locale } = useI18n();
  const [numStr, setNumStr] = useState("2026");
  const [romanStr, setRomanStr] = useState("");

  const n = Math.floor(Number(numStr));
  const numValid = numStr.trim() !== "" && Number.isFinite(n) && n >= 1 && n <= 3999;
  const romValid = romanStr.trim() !== "" && fromRoman(romanStr) !== null;
  const showErr = (numStr.trim() !== "" && !numValid) || (romanStr.trim() !== "" && !romValid);

  const invalid = pick(locale, {
    en: "Enter a whole number between 1 and 3999, or standard Roman numerals (I, IV, IX, XL, CD, CM…).",
    zh: "请输入 1–3999 的整数,或标准罗马数字(I、IV、IX、XL、CD、CM 等)。",
    ja: "1〜3999 の整数か、標準的なローマ数字(I、IV、IX、XL、CD、CM など)を入力してください。",
    es: "Introduzca un número entero entre 1 y 3999 o números romanos estándar (I, IV, IX, XL, CD, CM…).",
    pt: "Digite um número inteiro entre 1 e 3999 ou numerais romanos padrão (I, IV, IX, XL, CD, CM…).",
    fr: "Entrez un nombre entier entre 1 et 3999, ou des chiffres romains standard (I, IV, IX, XL, CD, CM…).",
    de: "Gib eine ganze Zahl zwischen 1 und 3999 oder Standard-römische Zahlen ein (I, IV, IX, XL, CD, CM…).",
    ru: "Введите целое число от 1 до 3999 или стандартные римские цифры (I, IV, IX, XL, CD, CM…).",
    it: "Inserisci un numero intero tra 1 e 3999, o numeri romani standard (I, IV, IX, XL, CD, CM…).",
    tr: "1 ile 3999 arasında bir tam sayı veya standart Roma rakamları girin (I, IV, IX, XL, CD, CM…).",
    ko: "1~3999 사이의 정수 또는 표준 로마 숫자를 입력하세요(I, IV, IX, XL, CD, CM…).",
    ar: "أدخل عددًا صحيحًا بين 1 و3999 أو أرقامًا رومانية قياسية (I, IV, IX, XL, CD, CM…).",
    hi: "1 से 3999 के बीच पूर्ण संख्या या मानक रोमन अंक दर्ज करें (I, IV, IX, XL, CD, CM…)।",
    id: "Masukkan bilangan bulat 1–3999, atau angka Romawi standar (I, IV, IX, XL, CD, CM…).",
    vi: "Nhập số nguyên từ 1 đến 3999, hoặc chữ số La Mã chuẩn (I, IV, IX, XL, CD, CM…).",
  });

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, { en: "Number", zh: "数字", ja: "数値", es: "Número", pt: "Número", fr: "Nombre", de: "Zahl", ru: "Число", it: "Numero", tr: "Sayı", ko: "숫자", ar: "الرقم", hi: "संख्या", id: "Angka", vi: "Số" })}>
          <NumIn
            value={numStr}
            onChange={(v2) => {
              setNumStr(v2);
              const x = Math.floor(Number(v2));
              setRomanStr(v2.trim() !== "" && Number.isFinite(x) && x >= 1 && x <= 3999 ? toRoman(x) : "");
            }}
            aria="number"
          />
        </Field>
        <Field label={pick(locale, { en: "Roman numeral", zh: "罗马数字", ja: "ローマ数字", es: "Número romano", pt: "Numeral romano", fr: "Chiffre romain", de: "Römische Zahl", ru: "Римская цифра", it: "Numero romano", tr: "Roma rakamı", ko: "로마 숫자", ar: "الرقم الروماني", hi: "रोमन अंक", id: "Angka Romawi", vi: "Chữ số La Mã" })}>
          <TextIn
            value={romanStr}
            mono
            onChange={(v2) => {
              setRomanStr(v2.toUpperCase());
              const parsed = fromRoman(v2);
              setNumStr(parsed === null ? numStr : String(parsed));
            }}
            aria="roman numeral"
            placeholder="MMXXVI"
          />
        </Field>
      </div>
      <div className="mt-5">
        {numStr.trim() === "" && romanStr.trim() === "" ? (
          <Note>{pick(locale, { en: "Type a number or a numeral — the other side converts live.", zh: "输入数字或罗马数字,另一侧实时换算。", ja: "数値かローマ数字を入力すると、もう片方へ即時変換されます。", es: "Escriba un número o un numeral: el otro lado convierte al instante.", pt: "Digite um número ou um numeral — o outro lado converte na hora.", fr: "Tapez un nombre ou un chiffre — l'autre côté se convertit en direct.", de: "Zahl oder römische Zahl eingeben — die andere Seite wandelt live um.", ru: "Введите число или римскую цифру — вторая сторона конвертируется на лету.", it: "Digita un numero o una cifra: l'altro lato si converte in tempo reale.", tr: "Sayı veya rakam yazın — diğer taraf canlı dönüşür.", ko: "숫자나 로마 숫자를 입력하세요 — 반대쪽이 실시간 변환됩니다.", ar: "اكتب رقمًا أو رقمًا رومانيًا — يقوم الطرف الآخر بالتحويل فورًا.", hi: "संख्या या रोमन अंक लिखें — दूसरी ओर लाइव रूपांतरित होगी।", id: "Ketik angka atau angka Romawi — sisi lain langsung dikonversi.", vi: "Nhập số hoặc chữ số La Mã — phía kia tự chuyển ngay." })}</Note>
        ) : showErr ? (
          <p className="text-[13.5px] leading-5 text-[var(--color-bad)]" role="alert">{invalid}</p>
        ) : (
          <div className="rounded-xl border hairline px-4 py-3.5 text-[16px]">
            <span className="mono font-semibold">{numValid ? n : "?"}</span>
            <span className="mx-2 text-[var(--color-sub)]">=</span>
            <span className="mono font-semibold">{romValid ? romanStr.trim().toUpperCase() : numValid ? toRoman(n) : "?"}</span>
          </div>
        )}
      </div>
      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "Validation follows the classical subtractive rules: I before V/X, X before L/C, C before D/M — so VIIII is rejected and IX is accepted.",
            zh: "校验遵循经典减法规则:I 在 V/X 前、X 在 L/C 前、C 在 D/M 前——因此 VIIII 不合法,IX 合法。",
            ja: "検証は古典的な減算規則に従います。I は V/X の前、X は L/C の前、C は D/M の前のみ。VIIII は不可、IX は有効です。",
            es: "La validación sigue las reglas sustractivas clásicas: I antes de V/X, X antes de L/C, C antes de D/M; VIIII se rechaza y IX se acepta.",
            pt: "A validação segue as regras subtrativas clássicas: I antes de V/X, X antes de L/C, C antes de D/M — VIIII é rejeitado e IX aceito.",
            fr: "La validation suit les règles soustractives classiques : I devant V/X, X devant L/C, C devant D/M — VIIII est donc rejeté et IX accepté.",
            de: "Die Validierung folgt den klassischen Subtraktionsregeln: I vor V/X, X vor L/C, C vor D/M — VIIII wird abgelehnt, IX akzeptiert.",
            ru: "Проверка следует классическим правилам вычитания: I перед V/X, X перед L/C, C перед D/M — VIIII отклоняется, IX принимается.",
            it: "La validazione segue le regole sottrattive classiche: I prima di V/X, X prima di L/C, C prima di D/M — VIIII viene rifiutato e IX accettato.",
            tr: "Doğrulama klasik çıkarma kurallarını izler: V/X'den önce I, L/C'den önce X, D/M'den önce C — VIIII reddedilir, IX kabul edilir.",
            ko: "검증은 고전적인 감산 규칙을 따릅니다: V/X 앞의 I, L/C 앞의 X, D/M 앞의 C — VIIII는 거부되고 IX는 허용됩니다.",
            ar: "يتبع التحقق قواعد الطرح الكلاسيكية: I قبل V/X، وX قبل L/C، وC قبل D/M — لذلك يُرفض VIIII ويُقبل IX.",
            hi: "सत्यापन शास्त्रीय घटाव नियमों का पालन करता है: V/X से पहले I, L/C से पहले X, D/M से पहले C — VIIII अस्वीकृत, IX स्वीकृत।",
            id: "Validasi mengikuti aturan pengurangan klasik: I sebelum V/X, X sebelum L/C, C sebelum D/M — VIIII ditolak, IX diterima.",
            vi: "Kiểm tra theo quy tắc trừ cổ điển: I trước V/X, X trước L/C, C trước D/M — VIIII bị từ chối, IX được chấp nhận.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

/* ---------------- aspect ratio ---------------- */

const RATIOS: { w: number; h: number }[] = [
  { w: 1, h: 1 },
  { w: 4, h: 3 },
  { w: 3, h: 2 },
  { w: 16, h: 9 },
  { w: 16, h: 10 },
  { w: 21, h: 9 },
];

function Aspect() {
  const { locale } = useI18n();
  const [rw, setRw] = useState("16");
  const [rh, setRh] = useState("9");
  const [dir, setDir] = useState("w");
  const [val, setVal] = useState("1920");

  const W = Number(rw);
  const H = Number(rh);
  const x = Number(val);
  const okRatio = Number.isFinite(W) && Number.isFinite(H) && W > 0 && H > 0;
  const out = okRatio && Number.isFinite(x) ? (dir === "w" ? (x * H) / W : (x * W) / H) : NaN;

  const wLabel = pick(locale, { en: "Ratio width", zh: "比例宽", ja: "比率の幅", es: "Ancho de la relación", pt: "Largura da proporção", fr: "Largeur du ratio", de: "Verhältnis-Breite", ru: "Ширина соотношения", it: "Larghezza rapporto", tr: "Oran genişliği", ko: "비율 너비", ar: "عرض النسبة", hi: "अनुपात चौड़ाई", id: "Lebar rasio", vi: "Bề rộng tỷ lệ" });
  const hLabel = pick(locale, { en: "Ratio height", zh: "比例高", ja: "比率の高さ", es: "Alto de la relación", pt: "Altura da proporção", fr: "Hauteur du ratio", de: "Verhältnis-Höhe", ru: "Высота соотношения", it: "Altezza rapporto", tr: "Oran yüksekliği", ko: "비율 높이", ar: "ارتفاع النسبة", hi: "अनुपात ऊँचाई", id: "Tinggi rasio", vi: "Bề cao tỷ lệ" });

  return (
    <ToolPanel>
      <div className="flex flex-wrap gap-2">
        {RATIOS.map((r) => (
          <button
            key={`${r.w}:${r.h}`}
            type="button"
            onClick={() => {
              setRw(String(r.w));
              setRh(String(r.h));
            }}
            className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              rw === String(r.w) && rh === String(r.h)
                ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                : "hairline hover:bg-[var(--color-surface)]"
            }`}
          >
            {r.w}:{r.h}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-4">
        <Field label={wLabel}>
          <NumIn value={rw} onChange={setRw} aria={wLabel} />
        </Field>
        <Field label={hLabel}>
          <NumIn value={rh} onChange={setRh} aria={hLabel} />
        </Field>
        <Field label={pick(locale, { en: "You know the…", zh: "已知", ja: "わかっている辺", es: "Se conoce…", pt: "Você sabe o…", fr: "Vous connaissez…", de: "Bekannt ist…", ru: "Известно…", it: "Conosci…", tr: "Bilinen…", ko: "다음을 알고…", ar: "تعرف…", hi: "आप जानते हैं…", id: "Anda tahu…", vi: "Bạn biết…" })}>
          <Sel value={dir} onChange={setDir} aria="known dimension">
            <option value="w">{pick(locale, { en: "Width", zh: "宽度", ja: "幅", es: "Ancho", pt: "Largura", fr: "Largeur", de: "Breite", ru: "Ширина", it: "Larghezza", tr: "Genişlik", ko: "너비", ar: "العرض", hi: "चौड़ाई", id: "Lebar", vi: "Bề rộng" })}</option>
            <option value="h">{pick(locale, { en: "Height", zh: "高度", ja: "高さ", es: "Alto", pt: "Altura", fr: "Hauteur", de: "Höhe", ru: "Высота", it: "Altezza", tr: "Yükseklik", ko: "높이", ar: "الارتفاع", hi: "ऊँचाई", id: "Tinggi", vi: "Bề cao" })}</option>
          </Sel>
        </Field>
        <Field label={pick(locale, { en: "Value (px, cm, in…)", zh: "数值(px、cm 等)", ja: "値(px、cm など)", es: "Valor (px, cm…)", pt: "Valor (px, cm…)", fr: "Valeur (px, cm, po…)", de: "Wert (px, cm, in…)", ru: "Значение (px, см, дюймы…)", it: "Valore (px, cm, in…)", tr: "Değer (px, cm, in…)", ko: "값(px, cm, in…)", ar: "القيمة (بكسل، سم، بوصة…)", hi: "मान (px, cm, in…)", id: "Nilai (px, cm, inci…)", vi: "Giá trị (px, cm, in…)" })}>
          <NumIn value={val} onChange={setVal} aria="known value" />
        </Field>
      </div>
      <div className="mt-5 rounded-xl border hairline px-4 py-3.5">
        <span className="text-[13px] font-medium text-[var(--color-sub)]">
          {dir === "w"
            ? pick(locale, { en: "Height", zh: "高度", ja: "高さ", es: "Alto", pt: "Altura", fr: "Hauteur", de: "Höhe", ru: "Высота", it: "Altezza", tr: "Yükseklik", ko: "높이", ar: "الارتفاع", hi: "ऊँचाई", id: "Tinggi", vi: "Bề cao" })
            : pick(locale, { en: "Width", zh: "宽度", ja: "幅", es: "Ancho", pt: "Largura", fr: "Largeur", de: "Breite", ru: "Ширина", it: "Larghezza", tr: "Genişlik", ko: "너비", ar: "العرض", hi: "चौड़ाई", id: "Lebar", vi: "Bề rộng" })}
        </span>
        <p className="mono mt-1 text-[20px] font-semibold" aria-live="polite">
          {fmt(out, locale, 2)}
        </p>
        {okRatio && Number.isFinite(x) && (
          <p className="mono mt-1 text-[13.5px] text-[var(--color-sub)]">
            {dir === "w" ? `${fmt(x, locale, 2)} × ${fmt(out, locale, 2)}` : `${fmt(out, locale, 2)} × ${fmt(x, locale, 2)}`} ·{" "}
            {(W / H).toFixed(4).replace(/\.?0+$/, "")}
          </p>
        )}
      </div>
      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "Ratio fields accept any positive numbers, so 2.35:1 cinema scopes and odd sensor ratios work too.",
            zh: "比例字段支持任意正数,2.35:1 电影宽银幕或特殊传感器比例同样适用。",
            ja: "比率欄には任意の正数を入れられます。2.35:1 のシネスコや特殊なセンサー比にも対応します。",
            es: "Los campos de relación aceptan cualquier número positivo: sirven 2.35:1 de cine o relaciones de sensores atípicas.",
            pt: "Os campos de proporção aceitam qualquer número positivo — 2.35:1 de cinema e proporções incomuns de sensor funcionam.",
            fr: "Les champs de ratio acceptent tout nombre positif : les formats cinéma 2,35:1 et les capteurs aux ratios inhabituels fonctionnent aussi.",
            de: "Die Verhältnisfelder akzeptieren beliebige positive Zahlen — 2,35:1-Kinoformate und ungewöhnliche Sensorverhältnisse funktionieren ebenfalls.",
            ru: "Поля соотношения принимают любые положительные числа: подойдёт и кинематографическое 2,35:1, и необычные пропорции сенсоров.",
            it: "I campi del rapporto accettano qualsiasi numero positivo: funzionano anche i formati cinema 2,35:1 e i rapporti dei sensori insoliti.",
            tr: "Oran alanları herhangi bir pozitif sayıyı kabul eder; 2,35:1 sinema formatları ve sıra dışı sensör oranları da çalışır.",
            ko: "비율 필드는 모든 양수를 받습니다 — 2.35:1 시네마 스코프나 특수한 센서 비율도 됩니다.",
            ar: "تقبل حقول النسبة أي أرقام موجبة، لذا تعمل نطاقات السينما 2.35:1 ونسب المستشعرات غير المعتادة أيضًا.",
            hi: "अनुपात फ़ील्ड कोई भी धनात्मक संख्या लेते हैं — 2.35:1 सिनेमा स्कोप और विचित्र सेंसर अनुपात भी चलते हैं।",
            id: "Kolom rasio menerima angka positif apa pun, jadi rasio layar sinema 2,35:1 dan rasio sensor aneh juga berfungsi.",
            vi: "Trường tỷ lệ nhận mọi số dương, nên tỉ lệ điện ảnh 2,35:1 hay tỉ lệ cảm biến lạ đều dùng được.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

export function CalcEngineConverters({ kind }: { kind: string }) {
  switch (kind) {
    case "binary":
      return <Binary />;
    case "roman":
      return <Roman />;
    case "aspect":
      return <Aspect />;
    default:
      return null;
  }
}
