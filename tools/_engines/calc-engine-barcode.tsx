"use client";

import type { Locale } from "@/lib/site";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { downloadBlob } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, Note, Sel, TextIn, pick } from "./calc-ui";

/**
 * Barcode generator built on JsBarcode (loaded dynamically). Renders to an
 * inline <svg>; downloads the SVG. Formats: CODE128, EAN-13, UPC.
 */

const FORMATS = ["CODE128", "EAN13", "UPC"] as const;
type Format = (typeof FORMATS)[number];

export function CalcEngineBarcode() {
  const { locale, t } = useI18n();
  const [text, setText] = useState("ZOYKU-2026");
  const [format, setFormat] = useState<Format>("CODE128");
  const [barWidth, setBarWidth] = useState(2);
  const [height, setHeight] = useState(90);
  const [showText, setShowText] = useState(true);
  const [error, setError] = useState("");
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!svgRef.current || !text.trim()) {
        setError("");
        return;
      }
      try {
        const JsBarcode = (await import("jsbarcode")).default;
        JsBarcode(svgRef.current, text, {
          format,
          width: barWidth,
          height,
          displayValue: showText,
          fontSize: 16,
          margin: 10,
          lineColor: "#1d1d1f",
          background: "#ffffff",
        });
        if (alive) setError("");
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      alive = false;
    };
  }, [text, format, barWidth, height, showText]);

  const downloadSvg = () => {
    if (!svgRef.current || error) return;
    const xml = new XMLSerializer().serializeToString(svgRef.current);
    downloadBlob(new Blob([xml], { type: "image/svg+xml" }), `barcode-${format.toLowerCase()}.svg`);
  };

  const hints: Record<Format, Record<string, string>> = {
    CODE128: {
      en: "CODE128 accepts any letters, digits and most symbols — the default for inventory and tracking labels.",
      zh: "CODE128 支持任意字母、数字和常见符号,是库存与物流标签的默认选择。",
      ja: "CODE128 は英数字と多くの記号に対応し、在庫・追跡ラベルの標準です。",
      es: "CODE128 acepta letras, dígitos y la mayoría de los símbolos: el estándar para inventario y seguimiento.",
      pt: "O CODE128 aceita letras, dígitos e a maioria dos símbolos — o padrão para inventário e rastreamento.",
      fr: "CODE128 accepte lettres, chiffres et la plupart des symboles — le défaut pour l'inventaire et le suivi.",
      de: "CODE128 akzeptiert Buchstaben, Ziffern und die meisten Symbole — der Standard für Inventar und Verfolgung.",
      ru: "CODE128 принимает буквы, цифры и большинство символов — стандарт для инвентаря и отслеживания.",
      it: "CODE128 accetta lettere, cifre e la maggior parte dei simboli — l'impostazione predefinita per inventario e tracciamento.",
      tr: "CODE128 harf, rakam ve çoğu simgeyi kabul eder — envanter ve takip için varsayılan.",
      ko: "CODE128은 문자, 숫자, 대부분의 기호를 지원합니다 — 재고·추적의 기본값.",
      ar: "CODE128 يقبل الحروف والأرقام ومعظم الرموز — الافتراضي للمخزون والتتبع.",
      hi: "CODE128 अक्षर, अंक और अधिकांश चिह्न स्वीकार करता है — इन्वेंट्री व ट्रैकिंग के लिए डिफ़ॉल्ट।",
      id: "CODE128 menerima huruf, angka, dan sebagian besar simbol — bawaan untuk inventaris dan pelacakan.",
      vi: "CODE128 chấp nhận chữ, số và hầu hết ký hiệu — mặc định cho quản kho và theo dõi.",
    },
    EAN13: {
      en: "EAN-13 needs exactly 12 digits (a check digit is added) or 13 digits with a valid final check digit.",
      zh: "EAN-13 需要恰好 12 位数字(自动补校验位),或 13 位且末位校验正确的数字。",
      ja: "EAN-13 は 12 桁の数字(チェックディジットを自動付加)、またはチェックディジットを含む 13 桁が必要です。",
      es: "EAN-13 requiere exactamente 12 dígitos (se añade el dígito de control) o 13 dígitos con control válido.",
      pt: "O EAN-13 exige exatamente 12 dígitos (o dígito verificador é adicionado) ou 13 dígitos com verificador válido.",
      fr: "EAN-13 exige exactement 12 chiffres (un chiffre de contrôle est ajouté) ou 13 chiffres avec un contrôle final valide.",
      de: "EAN-13 benötigt genau 12 Ziffern (eine Prüfziffer wird ergänzt) oder 13 Ziffern mit gültiger Prüfziffer.",
      ru: "EAN-13 требует ровно 12 цифр (контрольная добавится) или 13 цифр с корректной контрольной.",
      it: "EAN-13 richiede esattamente 12 cifre (viene aggiunta una cifra di controllo) o 13 cifre con controllo finale valido.",
      tr: "EAN-13 tam 12 rakam ister (kontrol rakamı eklenir) veya geçerli kontrol rakamlı 13 rakam.",
      ko: "EAN-13은 정확히 12자리 숫자(체크디지트 자동 추가) 또는 유효한 체크디지트를 포함한 13자리가 필요합니다.",
      ar: "EAN-13 يتطلب 12 رقمًا بالضبط (يُضاف رقم تحقق) أو 13 رقمًا مع رقم تحقق صحيح.",
      hi: "EAN-13 में ठीक 12 अंक चाहिए (चेक अंक जोड़ा जाता है) या वैध चेक अंक सहित 13 अंक।",
      id: "EAN-13 butuh tepat 12 digit (digit cek ditambahkan) atau 13 digit dengan cek akhir yang valid.",
      vi: "EAN-13 cần đúng 12 chữ số (tự thêm chữ kiểm tra) hoặc 13 chữ số có chữ kiểm tra hợp lệ.",
    },
    UPC: {
      en: "UPC-A needs exactly 11 digits (a check digit is added) or 12 digits with a valid final check digit.",
      zh: "UPC-A 需要恰好 11 位数字(自动补校验位),或 12 位且末位校验正确的数字。",
      ja: "UPC-A は 11 桁の数字(チェックディジットを自動付加)、またはチェックディジットを含む 12 桁が必要です。",
      es: "UPC-A requiere exactamente 11 dígitos (se añade el dígito de control) o 12 dígitos con control válido.",
      pt: "O UPC-A exige exatamente 11 dígitos (o dígito verificador é adicionado) ou 12 dígitos com verificador válido.",
      fr: "UPC-A exige exactement 11 chiffres (un contrôle est ajouté) ou 12 chiffres avec un contrôle final valide.",
      de: "UPC-A benötigt genau 11 Ziffern (eine Prüfziffer wird ergänzt) oder 12 Ziffern mit gültiger Prüfziffer.",
      ru: "UPC-A требует ровно 11 цифр (контрольная добавится) или 12 цифр с корректной контрольной.",
      it: "UPC-A richiede esattamente 11 cifre (viene aggiunto un controllo) o 12 cifre con controllo finale valido.",
      tr: "UPC-A tam 11 rakam ister (kontrol rakamı eklenir) veya geçerli kontrol rakamlı 12 rakam.",
      ko: "UPC-A는 정확히 11자리 숫자(체크디지트 자동 추가) 또는 유효한 체크디지트를 포함한 12자리가 필요합니다.",
      ar: "UPC-A يتطلب 11 رقمًا بالضبط (يُضاف رقم تحقق) أو 12 رقمًا مع رقم تحقق صحيح.",
      hi: "UPC-A में ठीक 11 अंक चाहिए (चेक अंक जोड़ा जाता है) या वैध चेक अंक सहित 12 अंक।",
      id: "UPC-A butuh tepat 11 digit (digit cek ditambahkan) atau 12 digit dengan cek akhir yang valid.",
      vi: "UPC-A cần đúng 11 chữ số (tự thêm chữ kiểm tra) hoặc 12 chữ số có chữ kiểm tra hợp lệ.",
    },
  };
  type Locale_ = Locale;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, { en: "Barcode value", zh: "条码内容", ja: "バーコードの値", es: "Valor del código", pt: "Valor do código", fr: "Valeur du code-barres", de: "Barcode-Wert", ru: "Значение штрихкода", it: "Valore barcode", tr: "Barkod değeri", ko: "바코드 값", ar: "قيمة الباركود", hi: "बारकोड मान", id: "Nilai barcode", vi: "Giá trị mã vạch" })}>
          <TextIn value={text} mono onChange={setText} aria="barcode value" spellCheck={false} placeholder={format === "CODE128" ? "ABC-123" : "590123412345"} />
        </Field>
        <Field label={pick(locale, { en: "Format", zh: "格式", ja: "形式", es: "Formato", pt: "Formato", fr: "Format", de: "Format", ru: "Формат", it: "Formato", tr: "Biçim", ko: "형식", ar: "التنسيق", hi: "प्रारूप", id: "Format", vi: "Định dạng" })}>
          <Sel value={format} onChange={(v) => setFormat(v as Format)} aria="barcode format">
            {FORMATS.map((f) => (
              <option key={f} value={f}>
                {f === "EAN13" ? "EAN-13" : f === "UPC" ? "UPC-A" : f}
              </option>
            ))}
          </Sel>
        </Field>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label={`${pick(locale, { en: "Bar width", zh: "条宽", ja: "バーの幅", es: "Ancho de barra", pt: "Largura da barra", fr: "Largeur de barre", de: "Balkenbreite", ru: "Ширина полосы", it: "Larghezza barra", tr: "Çubuk genişliği", ko: "막대 폭", ar: "عرض الشريط", hi: "बार चौड़ाई", id: "Lebar batang", vi: "Độ rộng vạch" })} (${barWidth}×)`}>
          <input type="range" min={1} max={4} step={1} value={barWidth} onChange={(e) => setBarWidth(Number(e.target.value))} className="w-full" aria-label="bar width" />
        </Field>
        <Field label={`${pick(locale, { en: "Height", zh: "高度", ja: "高さ", es: "Altura", pt: "Altura", fr: "Hauteur", de: "Höhe", ru: "Высота", it: "Altezza", tr: "Yükseklik", ko: "높이", ar: "الارتفاع", hi: "ऊँचाई", id: "Tinggi", vi: "Chiều cao" })} (${height} px)`}>
          <input type="range" min={40} max={160} step={10} value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full" aria-label="barcode height" />
        </Field>
      </div>
      <label className="mt-4 inline-flex cursor-pointer items-center gap-2 text-[14px]">
        <input type="checkbox" className="accent-[var(--color-accent)]" checked={showText} onChange={(e) => setShowText(e.target.checked)} />
        {pick(locale, { en: "Show value under the bars", zh: "在条码下方显示内容", ja: "バーの下に値を表示", es: "Mostrar el valor bajo las barras", pt: "Mostrar o valor sob as barras", fr: "Afficher la valeur sous les barres", de: "Wert unter den Balken anzeigen", ru: "Показывать значение под полосами", it: "Mostra il valore sotto le barre", tr: "Çubukların altında değeri göster", ko: "막대 아래 값 표시", ar: "إظهار القيمة تحت الأشرطة", hi: "बार के नीचे मान दिखाएँ", id: "Tampilkan nilai di bawah batang", vi: "Hiện giá trị dưới các vạch" })}
      </label>

      <div className="mt-5 flex flex-col items-center gap-3">
        <div className="w-full max-w-xl overflow-x-auto rounded-2xl border hairline p-3">
          <svg ref={svgRef} role="img" aria-label="barcode preview" className="mx-auto block h-auto" />
        </div>
        {error ? (
          <p className="text-[13.5px] leading-5 text-[var(--color-bad)]" role="alert">{error}</p>
        ) : (
          text.trim() !== "" && (
            <button
              type="button"
              onClick={downloadSvg}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f]"
            >
              {t.common.download} SVG
            </button>
          )
        )}
      </div>
      <div className="mt-4">
        <Note>{hints[format][locale] ?? hints[format].en}</Note>
      </div>
    </ToolPanel>
  );
}
