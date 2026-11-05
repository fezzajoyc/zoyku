"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { downloadBlob } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, Note, Sel, pick } from "./calc-ui";

/**
 * QR code generator. The `qrcode` package is imported dynamically on the
 * client; encoding runs entirely in the browser. PNG + SVG download.
 */

type Ecc = "L" | "M" | "Q" | "H";

export function CalcEngineQr() {
  const { locale, t } = useI18n();
  const [text, setText] = useState("https://");
  const [size, setSize] = useState(320);
  const [ecc, setEcc] = useState<Ecc>("M");
  const [dark, setDark] = useState("#1d1d1f");
  const [light, setLight] = useState("#ffffff");
  const [logo, setLogo] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!canvasRef.current) return;
      if (!text.trim()) {
        const ctx = canvasRef.current.getContext("2d");
        ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setReady(false);
        return;
      }
      try {
        const QR = (await import("qrcode")).default;
        await QR.toCanvas(canvasRef.current, text, {
          width: size,
          margin: 2,
          errorCorrectionLevel: ecc,
          color: { dark, light },
        });
        // LOGO 叠加:中心留白由 EC 纠错冗余兜底(H=30% 冗余最稳);占码面 ≤12%,圆角白底保对比
        if (logo) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            const img = new Image();
            await new Promise<void>((res, rej) => {
              img.onload = () => res();
              img.onerror = () => rej(new Error("logo load failed"));
              img.src = logo;
            });
            const logoSide = Math.round(size * 0.22);
            const pad = Math.round(logoSide * 0.12);
            const box = logoSide + pad * 2;
            const x = (size - box) / 2;
            const y = (size - box) / 2;
            ctx.fillStyle = light;
            ctx.beginPath();
            const radius = Math.round(box * 0.18);
            ctx.roundRect(x, y, box, box, radius);
            ctx.fill();
            ctx.drawImage(img, x + pad, y + pad, logoSide, logoSide);
          }
        }
        if (alive) setReady(true);
      } catch {
        if (alive) setReady(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [text, size, ecc, dark, light, logo]);

  const downloadPng = async () => {
    if (!canvasRef.current || !ready) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) downloadBlob(blob, "qr-code.png");
    }, "image/png");
  };

  const downloadSvg = async () => {
    if (!text.trim()) return;
    const QR = (await import("qrcode")).default;
    const svg = await QR.toString(text, {
      type: "svg",
      width: size,
      margin: 2,
      errorCorrectionLevel: ecc,
      color: { dark, light },
    });
    downloadBlob(new Blob([svg], { type: "image/svg+xml" }), "qr-code.svg");
  };

  return (
    <ToolPanel>
      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <Field label={pick(locale, { en: "Text or URL", zh: "文本或网址", ja: "テキストまたは URL", es: "Texto o URL", pt: "Texto ou URL", fr: "Texte ou URL", de: "Text oder URL", ru: "Текст или URL", it: "Testo o URL", tr: "Metin veya URL", ko: "텍스트 또는 URL", ar: "نص أو رابط", hi: "टेक्स्ट या URL", id: "Teks atau URL", vi: "Văn bản hoặc URL" })}>
            <textarea
              className="field mono"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com"
              aria-label={pick(locale, { en: "Text or URL", zh: "文本或网址", ja: "テキストまたは URL", es: "Texto o URL", pt: "Texto ou URL", fr: "Texte ou URL", de: "Text oder URL", ru: "Текст или URL", it: "Testo o URL", tr: "Metin veya URL", ko: "텍스트 또는 URL", ar: "نص أو رابط", hi: "टेक्स्ट या URL", id: "Teks atau URL", vi: "Văn bản hoặc URL" })}
              spellCheck={false}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={pick(locale, { en: "Error correction", zh: "纠错级别", ja: "誤り訂正レベル", es: "Corrección de errores", pt: "Correção de erros", fr: "Correction d'erreur", de: "Fehlerkorrektur", ru: "Коррекция ошибок", it: "Correzione errori", tr: "Hata düzeltme", ko: "오류 복구", ar: "تصحيح الأخطاء", hi: "त्रुटि सुधार", id: "Koreksi kesalahan", vi: "Sửa lỗi" })}>
              <Sel value={ecc} onChange={(v) => setEcc(v as Ecc)} aria="error correction level">
                <option value="L">L · 7%</option>
                <option value="M">M · 15%</option>
                <option value="Q">Q · 25%</option>
                <option value="H">H · 30%</option>
              </Sel>
            </Field>
            <Field label={pick(locale, { en: "Colors (code / background)", zh: "颜色(码 / 背景)", ja: "色(コード / 背景)", es: "Colores (código / fondo)", pt: "Cores (código / fundo)", fr: "Couleurs (code / fond)", de: "Farben (Code / Hintergrund)", ru: "Цвета (код / фон)", it: "Colori (codice / sfondo)", tr: "Renkler (kod / arka plan)", ko: "색상 (코드 / 배경)", ar: "الألوان (الرمز / الخلفية)", hi: "रंग (कोड / पृष्ठभूमि)", id: "Warna (kode / latar)", vi: "Màu sắc (mã / nền)" })}>
              <div className="flex items-center gap-2">
                <input type="color" className="h-10 w-14 cursor-pointer rounded-lg border hairline bg-[var(--color-card)]" value={dark} onChange={(e) => setDark(e.target.value)} aria-label="code color" />
                <input type="color" className="h-10 w-14 cursor-pointer rounded-lg border hairline bg-[var(--color-card)]" value={light} onChange={(e) => setLight(e.target.value)} aria-label="background color" />
              </div>
            </Field>
          </div>
          <Field label={pick(locale, { en: "Logo (optional, center)", zh: "中心 LOGO(可选)", ja: "ロゴ(任意・中央)", es: "Logotipo (opcional, centro)", pt: "Logotipo (opcional, centro)", fr: "Logo (facultatif, centre)", de: "Logo (optional, Mitte)", ru: "Логотип (необяз., центр)", it: "Logo (facoltativo, centro)", tr: "Logo (isteğe bağlı, orta)", ko: "로고(선택, 중앙)", ar: "الشعار (اختياري، الوسط)", hi: "लोगो (वैकल्पिक, केंद्र)", id: "Logo (opsional, tengah)", vi: "Logo (không bắt buộc, giữa)" })}>
            <div className="flex items-center gap-2.5">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                className="text-[13px]"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) { setLogo(null); return; }
                  const reader = new FileReader();
                  reader.onload = () => setLogo(String(reader.result));
                  reader.readAsDataURL(f);
                }}
                aria-label="logo file"
              />
              {logo && (
                <button
                  type="button"
                  onClick={() => setLogo(null)}
                  className="rounded-full border hairline px-3 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
                >
                  × {t.common.clear}
                </button>
              )}
            </div>
            <p className="mt-1.5 text-[12.5px] leading-5 text-[var(--color-sub)]">
              {pick(locale, {
                en: "Best with error correction H — the code hides the logo from its redundant modules. Keep the logo under ~25% of the code area.",
                zh: "建议搭配纠错级别 H——码点会从冗余模块里“让出”LOGO 位置,LOGO 面积控制在码面 25% 以内。",
                ja: "誤り訂正レベル H との併用が最適です。冗余モジュールがロゴ分を吸収します。ロゴはコード面積の 25% 以内に。",
                es: "Mejor con corrección H: los módulos redundantes dejan espacio al logo. Mantén el logo bajo ~25% del área del código.",
                pt: "Melhor com correção H: os módulos redundantes abrem espaço ao logo. Mantenha o logo abaixo de ~25% da área do código.",
                fr: "Idéal avec la correction H : les modules redondants laissent la place au logo. Gardez le logo sous ~25 % de la zone du code.",
                de: "Am besten mit Korrektur H: Die redundanten Module machen Platz für das Logo. Logo unter ~25 % der Codefläche halten.",
                ru: "Лучше всего с коррекцией H: избыточные модули освобождают место под логотип. Держите логотип в пределах ~25% площади кода.",
                it: "Meglio con correzione H: i moduli ridondanti lasciano spazio al logo. Tieni il logo sotto il ~25% dell'area del codice.",
                tr: "H düzeltme ile en iyi sonuç: yedek modüller logoya yer açar. Logoyu kod alanının ~%25'inin altında tutun.",
                ko: "오류 복구 H와 함께 쓰는 것이 좋습니다 — 여분 모듈이 로고 자리를 흡수합니다. 로고는 코드 면적의 25% 이내로.",
                ar: "الأفضل مع تصحيح H: الوحدات الزائدة تترك مكانًا للشعار. حافظ على الشعار أقل من ~25% من مساحة الرمز.",
                hi: "सुधार H के साथ सबसे अच्छा — अतिरिक्त मॉड्यूल लोगो की जगह बनाते हैं। लोगो को कोड क्षेत्र के ~25% से नीचे रखें।",
                id: "Paling baik dengan koreksi H — modul redundan memberi ruang bagi logo. Jaga logo di bawah ~25% area kode.",
                vi: "Nên dùng kèm sửa lỗi H — các mô-đun dự phòng chừa chỗ cho logo. Giữ logo dưới ~25% diện tích mã.",
              })}
            </p>
          </Field>
          <Field label={`${pick(locale, { en: "Size", zh: "尺寸", ja: "サイズ", es: "Tamaño", pt: "Tamanho", fr: "Taille", de: "Größe", ru: "Размер", it: "Dimensione", tr: "Boyut", ko: "크기", ar: "الحجم", hi: "आकार", id: "Ukuran", vi: "Kích thước" })} (${size} px)`}>
            <input type="range" min={128} max={768} step={16} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full" aria-label="qr size" />
          </Field>
        </div>

        <div className="flex flex-col items-center justify-start gap-3">
          <div className="rounded-2xl border hairline p-3">
            <canvas ref={canvasRef} width={size} height={size} aria-label="QR code preview" />
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            <button
              type="button"
              disabled={!ready}
              onClick={downloadPng}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
            >
              {t.common.download} PNG
            </button>
            <button
              type="button"
              disabled={!ready}
              onClick={downloadSvg}
              className="inline-flex items-center gap-1.5 rounded-full border hairline px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-[var(--color-surface)] disabled:opacity-40"
            >
              {t.common.download} SVG
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "Encoding happens in your browser via the qrcode library — the image is never uploaded. Higher error-correction levels keep codes scannable even when partially covered or printed small.",
            zh: "二维码由浏览器内的 qrcode 库生成,图片不会上传。纠错级别越高,二维码被遮挡一部分或印得很小时仍可扫出。",
            ja: "QR コードはブラウザ内の qrcode ライブラリで生成され、画像はアップロードされません。誤り訂正レベルを上げると、一部が隠れても小さく印刷しても読み取れます。",
            es: "La codificación ocurre en su navegador con la librería qrcode: la imagen nunca se sube. Niveles de corrección más altos permiten escanear códigos parcialmente cubiertos o impresos pequeños.",
            pt: "A codificação acontece no seu navegador com a biblioteca qrcode — a imagem nunca é enviada. Níveis maiores de correção mantêm o código legível mesmo parcialmente coberto ou impresso pequeno.",
            fr: "L'encodage se fait dans votre navigateur via la bibliothèque qrcode — l'image n'est jamais téléversée. Des niveaux de correction d'erreur plus élevés gardent les codes lisibles même partiellement couverts ou imprimés petit.",
            de: "Die Kodierung erfolgt im Browser über die qrcode-Bibliothek — das Bild wird nie hochgeladen. Höhere Fehlerkorrekturstufen halten Codes lesbar, selbst wenn sie teilweise verdeckt oder klein gedruckt sind.",
            ru: "Кодирование происходит в браузере через библиотеку qrcode — изображение никогда не загружается. Более высокие уровни коррекции ошибок сохраняют читаемость кода даже при частичном перекрытии или мелкой печати.",
            it: "La codifica avviene nel browser tramite la libreria qrcode — l'immagine non viene mai caricata. Livelli di correzione errori più alti mantengono i codici leggibili anche parzialmente coperti o stampati piccoli.",
            tr: "Kodlama tarayıcınızda qrcode kitaplığıyla yapılır — görüntü asla yüklenmez. Daha yüksek hata düzeltme düzeyleri, kodları kısmen kaplıyken veya küçük basıldığında bile okunur tutar.",
            ko: "인코딩은 브라우저에서 qrcode 라이브러리로 이루어집니다 — 이미지는 절대 업로드되지 않습니다. 높은 오류 복구 수준은 코드가 일부 가려지거나 작게 인쇄돼도 판독 가능하게 유지합니다.",
            ar: "يتم الترميز في متصفحك عبر مكتبة qrcode — لا تُرفع الصورة أبدًا. مستويات تصحيح الأخطاء الأعلى تُبقي الشيفرة قابلة للمسح حتى عند تغطيتها جزئيًا أو طباعتها صغيرة.",
            hi: "एनकोडिंग आपके ब्राउज़र में qrcode लाइब्रेरी से होती है — इमेज कभी अपलोड नहीं होती। उच्च त्रुटि-सुधार स्तर आंशिक ढके या छोटे छपे कोड को भी स्कैन योग्य रखते हैं।",
            id: "Enkode terjadi di peramban Anda lewat pustaka qrcode — gambar tidak pernah diunggah. Tingkat koreksi kesalahan lebih tinggi menjaga kode tetap terbaca meski sebagian tertutup atau dicetak kecil.",
            vi: "Việc mã hóa diễn ra trong trình duyệt qua thư viện qrcode — ảnh không bao giờ được tải lên. Mức sửa lỗi cao giữ mã quét được ngay cả khi bị che một phần hoặc in nhỏ.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}
