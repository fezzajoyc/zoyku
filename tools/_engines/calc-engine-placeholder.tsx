"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, downloadBlob } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, Sel, TextIn, pick } from "./calc-ui";
import { placeholderSvg } from "../_lib/placeholder";

/**
 * 占位图生成器引擎:纯函数 placeholderSvg() 产出 SVG 字符串,
 * 浏览器端负责预览(data URI)、复制 SVG、下载 SVG/PNG/JPG( canvas 转码)。
 */

const S = {
  width: { en: "Width (px)", zh: "宽度(像素)", ja: "幅(px)", es: "Ancho (px)", pt: "Largura (px)", fr: "Largeur (px)", de: "Breite (px)", ru: "Ширина (px)", it: "Larghezza (px)", tr: "Genişlik (px)", ko: "너비(px)", ar: "العرض (بكسل)", hi: "चौड़ाई (px)", id: "Lebar (px)", vi: "Bề rộng (px)" },
  height: { en: "Height (px)", zh: "高度(像素)", ja: "高さ(px)", es: "Alto (px)", pt: "Altura (px)", fr: "Hauteur (px)", de: "Höhe (px)", ru: "Высота (px)", it: "Altezza (px)", tr: "Yükseklik (px)", ko: "높이(px)", ar: "الارتفاع (بكسل)", hi: "ऊँचाई (px)", id: "Tinggi (px)", vi: "Bề cao (px)" },
  bg: { en: "Background color", zh: "背景色", ja: "背景色", es: "Color de fondo", pt: "Cor de fundo", fr: "Couleur de fond", de: "Hintergrundfarbe", ru: "Цвет фона", it: "Colore di sfondo", tr: "Arka plan rengi", ko: "배경색", ar: "لون الخلفية", hi: "पृष्ठभूमि रंग", id: "Warna latar", vi: "Màu nền" },
  color: { en: "Text color", zh: "文字颜色", ja: "文字色", es: "Color del texto", pt: "Cor do texto", fr: "Couleur du texte", de: "Textfarbe", ru: "Цвет текста", it: "Colore del testo", tr: "Metin rengi", ko: "글자색", ar: "لون النص", hi: "टेक्स्ट रंग", id: "Warna teks", vi: "Màu chữ" },
  label: { en: "Label (optional)", zh: "文字(可选)", ja: "ラベル(任意)", es: "Texto (opcional)", pt: "Texto (opcional)", fr: "Texte (facultatif)", de: "Beschriftung (optional)", ru: "Надпись (необяз.)", it: "Etichetta (facoltativa)", tr: "Etiket (isteğe bağlı)", ko: "표시 문구(선택)", ar: "النص (اختياري)", hi: "लेबल (वैकल्पिक)", id: "Label (opsional)", vi: "Nhãn (không bắt buộc)" },
  format: { en: "Format", zh: "格式", ja: "形式", es: "Formato", pt: "Formato", fr: "Format", de: "Format", ru: "Формат", it: "Formato", tr: "Biçim", ko: "형식", ar: "التنسيق", hi: "प्रारूप", id: "Format", vi: "Định dạng" },
  download: { en: "Download", zh: "下载", ja: "ダウンロード", es: "Descargar", pt: "Baixar", fr: "Télécharger", de: "Herunterladen", ru: "Скачать", it: "Scarica", tr: "İndir", ko: "다운로드", ar: "تنزيل", hi: "डाउनलोड करें", id: "Unduh", vi: "Tải xuống" },
  copySvg: { en: "Copy SVG", zh: "复制 SVG", ja: "SVG をコピー", es: "Copiar SVG", pt: "Copiar SVG", fr: "Copier le SVG", de: "SVG kopieren", ru: "Копировать SVG", it: "Copia SVG", tr: "SVG kopyala", ko: "SVG 복사", ar: "نسخ SVG", hi: "SVG कॉपी करें", id: "Salin SVG", vi: "Sao chép SVG" },
  invalid: {
    en: "Enter whole dimensions between 1 and 5000, and hex colors like #RRGGBB or #RGB.",
    zh: "宽高请输入 1–5000 的整数,颜色请使用 #RRGGBB 或 #RGB 格式。",
    ja: "寸法は 1〜5000 の整数、色は #RRGGBB または #RGB 形式で入力してください。",
    es: "Use dimensiones enteras de 1 a 5000 y colores hex como #RRGGBB o #RGB.",
    pt: "Use dimensões inteiras de 1 a 5000 e cores hex como #RRGGBB ou #RGB.",
    fr: "Vérifiez les dates : cet outil attend des dates AAAA-MM-JJ et un nombre entier de jours.",
    de: "Daten prüfen: Das Tool erwartet JJJJ-MM-TT-Daten und eine ganze Zahl von Tagen.",
    ru: "Проверьте даты: нужен формат ГГГГ-ММ-ДД и целое число дней.",
    it: "Controlla le date: lo strumento richiede date AAAA-MM-GG e un numero intero di giorni.",
    tr: "Tarihleri kontrol edin: araç YYYY-AA-GG tarihleri ve tam sayı gün ister.",
    ko: "날짜를 확인하세요: YYYY-MM-DD 형식의 날짜와 정수 일수가 필요합니다.",
    ar: "تحقق من التواريخ: تتطلب الأداة تواريخ بصيغة YYYY-MM-DD وعددًا صحيحًا من الأيام.",
    hi: "तारीखें जाँचें: उपकरण को YYYY-MM-DD तारीखें और पूर्ण दिनों की संख्या चाहिए।",
    id: "Periksa tanggal: alat ini butuh tanggal YYYY-MM-DD dan jumlah hari bulat.",
    vi: "Kiểm tra ngày: công cụ cần ngày dạng YYYY-MM-DD và số ngày nguyên.",
  },
  rasterFail: {
    en: "PNG/JPG rendering isn't available in this browser — the SVG download still works.",
    zh: "当前浏览器无法渲染 PNG/JPG——SVG 下载仍然可用。",
    ja: "このブラウザでは PNG/JPG の描画ができません。SVG のダウンロードは利用できます。",
    es: "Este navegador no puede renderizar PNG/JPG; la descarga en SVG sigue funcionando.",
    pt: "Este navegador não consegue renderizar PNG/JPG; o download em SVG continua funcionando.",
    fr: "Le rendu PNG/JPG n'est pas disponible dans ce navigateur — le téléchargement SVG fonctionne toujours.",
    de: "PNG/JPG-Darstellung ist in diesem Browser nicht verfügbar — der SVG-Download funktioniert weiterhin.",
    ru: "Рендеринг PNG/JPG недоступен в этом браузере — скачивание SVG по-прежнему работает.",
    it: "Il rendering PNG/JPG non è disponibile in questo browser — il download SVG continua a funzionare.",
    tr: "PNG/JPG oluşturma bu tarayıcıda kullanılamıyor — SVG indirme yine de çalışır.",
    ko: "이 브라우저에서는 PNG/JPG 렌더링이 불가합니다 — SVG 다운로드는 계속 동작합니다.",
    ar: "عرض PNG/JPG غير متاح في هذا المتصفح — لا يزال تنزيل SVG يعمل.",
    hi: "इस ब्राउज़र में PNG/JPG रेंडरिंग उपलब्ध नहीं है — SVG डाउनलोड फिर भी काम करता है।",
    id: "Rendering PNG/JPG tidak tersedia di peramban ini — unduhan SVG tetap berfungsi.",
    vi: "Trình duyệt này không render được PNG/JPG — tải xuống SVG vẫn hoạt động.",
  },
  sizeNote: {
    en: "Everything is generated locally: the SVG is pure markup you can paste into any project, and PNG/JPG versions are rendered on a canvas in your browser.",
    zh: "全部在本地生成:SVG 是可直接粘贴进项目的纯标记,PNG/JPG 由浏览器画布即时渲染。",
    ja: "すべてローカルで生成されます。SVG はそのまま貼り付けられる純粋なマークアップで、PNG/JPG はブラウザのキャンバスで描画されます。",
    es: "Todo se genera localmente: el SVG es marcado puro que puede pegar en cualquier proyecto, y las versiones PNG/JPG se renderizan en el lienzo del navegador.",
    pt: "Tudo é gerado localmente: o SVG é marcação pura que você pode colar em qualquer projeto, e as versões PNG/JPG são renderizadas no canvas do navegador.",
    fr: "Tout est généré localement : le SVG est du balisage pur à coller dans n'importe quel projet, et les versions PNG/JPG sont rendues sur un canvas dans votre navigateur.",
    de: "Alles wird lokal erzeugt: Das SVG ist reines Markup für jedes Projekt, PNG/JPG-Versionen werden per Canvas im Browser gerendert.",
    ru: "Всё генерируется локально: SVG — чистая разметка для любого проекта, версии PNG/JPG рендерятся на canvas в браузере.",
    it: "Tutto è generato localmente: l'SVG è markup puro da incollare in qualsiasi progetto, le versioni PNG/JPG sono renderizzate su canvas nel browser.",
    tr: "Her şey yerel olarak üretilir: SVG herhangi bir projeye yapıştırılabilir saf işaretlemedir, PNG/JPG sürümleri tarayıcınızdaki canvas ile oluşturulur.",
    ko: "모두 로컬에서 생성됩니다: SVG는 프로젝트에 바로 붙일 수 있는 순수 마크업이고, PNG/JPG는 브라우저 캔버스로 렌더링됩니다.",
    ar: "كل شيء يُولَّد محليًا: SVG ترميز نقي يمكنك لصقه في أي مشروع، وتُرسم نسخ PNG/JPG على canvas في متصفحك.",
    hi: "सब कुछ स्थानीय रूप से बनता है: SVG शुद्ध मार्कअप है जो किसी भी प्रोजेक्ट में पेस्ट हो सकता है, PNG/JPG संस्करण ब्राउज़र के कैनवास पर रेंडर होते हैं।",
    id: "Semuanya dibuat lokal: SVG adalah markup murni yang bisa ditempel ke proyek apa pun, versi PNG/JPG dirender di canvas peramban.",
    vi: "Mọi thứ được tạo cục bộ: SVG là markup thuần dán vào dự án nào cũng được, bản PNG/JPG render bằng canvas trong trình duyệt.",
  },
};

const FORMATS = [
  { id: "svg", label: "SVG" },
  { id: "png", label: "PNG" },
  { id: "jpg", label: "JPG" },
];

export function CalcEnginePlaceholder() {
  const { locale } = useI18n();
  const [width, setWidth] = useState("1200");
  const [height, setHeight] = useState("630");
  const [bg, setBg] = useState("#111827");
  const [color, setColor] = useState("#ffffff");
  const [text, setText] = useState("");
  const [format, setFormat] = useState("svg");
  const [rasterError, setRasterError] = useState(false);

  const svg = useMemo(
    () =>
      placeholderSvg({
        width: Number(width),
        height: Number(height),
        bg: bg.trim(),
        color: color.trim(),
        text,
      }),
    [width, height, bg, color, text],
  );

  const dataUri = svg
    ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
    : "";

  const downloadSvg = () => {
    if (!svg) return;
    downloadBlob(new Blob([svg], { type: "image/svg+xml" }), `placeholder-${Math.round(Number(width))}x${Math.round(Number(height))}.svg`);
  };

  const downloadRaster = async () => {
    if (!svg) return;
    const w = Math.round(Number(width));
    const h = Math.round(Number(height));
    try {
      setRasterError(false);
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("svg load failed"));
        img.src = dataUri;
      });
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("no 2d context");
      if (format === "jpg") {
        ctx.fillStyle = bg.trim();
        ctx.fillRect(0, 0, w, h);
      }
      ctx.drawImage(img, 0, 0, w, h);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, format === "jpg" ? "image/jpeg" : "image/png", 0.92),
      );
      if (!blob) throw new Error("toBlob failed");
      downloadBlob(blob, `placeholder-${w}x${h}.${format}`);
    } catch {
      setRasterError(true);
    }
  };

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.width)}>
          <NumIn value={width} onChange={setWidth} aria={pick(locale, S.width)} placeholder="1200" />
        </Field>
        <Field label={pick(locale, S.height)}>
          <NumIn value={height} onChange={setHeight} aria={pick(locale, S.height)} placeholder="630" />
        </Field>
        <Field label={pick(locale, S.bg)}>
          <div className="flex gap-2">
            <input
              type="color"
              className="h-10 w-12 shrink-0 rounded-lg border hairline bg-transparent p-1"
              value={/^#[0-9a-fA-F]{6}$/.test(bg.trim()) ? bg.trim() : "#111827"}
              onChange={(e) => setBg(e.target.value)}
              aria-label={pick(locale, S.bg)}
            />
            <TextIn value={bg} onChange={setBg} aria={pick(locale, S.bg)} mono placeholder="#RRGGBB" />
          </div>
        </Field>
        <Field label={pick(locale, S.color)}>
          <div className="flex gap-2">
            <input
              type="color"
              className="h-10 w-12 shrink-0 rounded-lg border hairline bg-transparent p-1"
              value={/^#[0-9a-fA-F]{6}$/.test(color.trim()) ? color.trim() : "#ffffff"}
              onChange={(e) => setColor(e.target.value)}
              aria-label={pick(locale, S.color)}
            />
            <TextIn value={color} onChange={setColor} aria={pick(locale, S.color)} mono placeholder="#RRGGBB" />
          </div>
        </Field>
      </div>

      <div className="mt-4">
        <Field label={pick(locale, S.label)}>
          <TextIn value={text} onChange={setText} aria={pick(locale, S.label)} placeholder="1200×630" spellCheck={false} />
        </Field>
      </div>

      {svg ? (
        <>
          <div className="mt-5 overflow-hidden rounded-xl border hairline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUri} alt={text || `${Math.round(Number(width))}×${Math.round(Number(height))}`} className="block max-h-72 w-full bg-[var(--color-surface)] object-contain" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="w-36">
              <Sel value={format} onChange={setFormat} aria={pick(locale, S.format)}>
                {FORMATS.map((f) => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </Sel>
            </div>
            <button
              type="button"
              onClick={format === "svg" ? downloadSvg : downloadRaster}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity hover:opacity-90"
            >
              {pick(locale, S.download)} {format.toUpperCase()}
            </button>
            <CopyButton value={() => svg} label={pick(locale, S.copySvg)} />
          </div>
        </>
      ) : (
        <div className="mt-5">
          <Note>{pick(locale, S.invalid)}</Note>
        </div>
      )}

      {rasterError && (
        <div className="mt-3">
          <Note>{pick(locale, S.rasterFail)}</Note>
        </div>
      )}

      <div className="mt-4">
        <Note>{pick(locale, S.sizeNote)}</Note>
      </div>
    </ToolPanel>
  );
}
