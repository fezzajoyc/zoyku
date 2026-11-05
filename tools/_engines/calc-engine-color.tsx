"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, Note, TextIn, pick } from "./calc-ui";

/**
 * Shared engine for color-picker and color-converter. Everything is computed
 * locally: hex ↔ rgb ↔ hsl, EyeDropper API when available, tints and shades.
 * props.kind = "picker" | "converter".
 */

type Rgb = { r: number; g: number; b: number };

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

export function hexOf({ r, g, b }: Rgb): string {
  const h = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

function parseHex(s: string): Rgb | null {
  let t = s.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(t)) t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2];
  if (!/^[0-9a-f]{6}$/i.test(t)) return null;
  return { r: parseInt(t.slice(0, 2), 16), g: parseInt(t.slice(2, 4), 16), b: parseInt(t.slice(4, 6), 16) };
}

function parseRgb(s: string): Rgb | null {
  const m = /^rgba?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})/.exec(s.trim());
  if (!m) return null;
  return { r: clamp(Number(m[1]), 0, 255), g: clamp(Number(m[2]), 0, 255), b: clamp(Number(m[3]), 0, 255) };
}

export function rgbToHsl({ r, g, b }: Rgb): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: l * 100 };
  const dd = max - min;
  const s = l > 0.5 ? dd / (2 - max - min) : dd / (max + min);
  let h: number;
  if (max === rn) h = ((gn - bn) / dd + (gn < bn ? 6 : 0)) * 60;
  else if (max === gn) h = ((bn - rn) / dd + 2) * 60;
  else h = ((rn - gn) / dd + 4) * 60;
  return { h, s: s * 100, l: l * 100 };
}

export function hslToRgb(h: number, s: number, l: number): Rgb {
  const sn = clamp(s, 0, 100) / 100;
  const ln = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const hp = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  const m = ln - c / 2;
  let rgb: [number, number, number];
  if (hp < 1) rgb = [c, x, 0];
  else if (hp < 2) rgb = [x, c, 0];
  else if (hp < 3) rgb = [0, c, x];
  else if (hp < 4) rgb = [0, x, c];
  else if (hp < 5) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  return { r: (rgb[0] + m) * 255, g: (rgb[1] + m) * 255, b: (rgb[2] + m) * 255 };
}

function parseHsl(s: string): Rgb | null {
  const m = /^hsla?\(\s*([\d.]+)(?:deg)?\s*[,\s]\s*([\d.]+)%\s*[,\s]\s*([\d.]+)%/.exec(s.trim());
  if (!m) return null;
  return hslToRgb(Number(m[1]), Number(m[2]), Number(m[3]));
}

function parseAny(s: string): Rgb | null {
  return parseHex(s) ?? parseRgb(s) ?? parseHsl(s);
}

function mixWith(rgb: Rgb, target: Rgb, amount: number): Rgb {
  return {
    r: rgb.r + (target.r - rgb.r) * amount,
    g: rgb.g + (target.g - rgb.g) * amount,
    b: rgb.b + (target.b - rgb.b) * amount,
  };
}

function SwatchRow({ base, label }: { base: Rgb; label: string }) {
  const white: Rgb = { r: 255, g: 255, b: 255 };
  const black: Rgb = { r: 0, g: 0, b: 0 };
  const steps = [0.8, 0.6, 0.4, 0.2].map((a) => mixWith(base, white, a));
  steps.push(base);
  for (const a of [0.2, 0.4, 0.6, 0.8]) steps.push(mixWith(base, black, a));
  return (
    <div>
      <div className="mb-2 text-[13px] font-medium text-[var(--color-sub)]">{label}</div>
      <div className="grid grid-cols-9 overflow-hidden rounded-xl border hairline">
        {steps.map((c, i) => {
          const hex = hexOf(c);
          return (
            <div
              key={i}
              title={hex}
              aria-label={hex}
              className="h-12 sm:h-14"
              style={{ backgroundColor: hex }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- picker ---------------- */

function Picker() {
  const { locale } = useI18n();
  const [hex, setHex] = useState("#0071e3");
  const [canPick, setCanPick] = useState(false);

  useEffect(() => {
    setCanPick(typeof window !== "undefined" && "EyeDropper" in window);
  }, []);

  const eyedrop = async () => {
    try {
      const ED = (window as unknown as { EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper;
      const res = await new ED().open();
      setHex(res.sRGBHex);
    } catch {
      // user cancelled
    }
  };

  const rgb = parseHex(hex) ?? { r: 0, g: 0, b: 0 };
  const hsl = rgbToHsl(rgb);

  return (
    <ToolPanel>
      <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
        <div className="space-y-3">
          <div className="h-24 w-full rounded-2xl border hairline sm:w-40" style={{ backgroundColor: hex }} aria-hidden />
          <input
            type="color"
            className="h-11 w-full cursor-pointer rounded-xl border hairline bg-[var(--color-card)] sm:w-40"
            value={hexOf(rgb)}
            onChange={(e) => setHex(e.target.value)}
            aria-label="pick color"
          />
          {canPick && (
            <button
              type="button"
              onClick={eyedrop}
              className="w-full rounded-full border hairline px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-[var(--color-surface)] sm:w-40"
            >
              {pick(locale, { en: "Pick from screen", zh: "从屏幕取色", ja: "画面からスポイト", es: "Tomar de la pantalla", pt: "Capturar da tela", fr: "Choisir à l'écran", de: "Vom Bildschirm wählen", ru: "Выбрать с экрана", it: "Scegli dallo schermo", tr: "Ekrandan seç", ko: "화면에서 선택", ar: "اختر من الشاشة", hi: "स्क्रीन से चुनें", id: "Pilih dari layar", vi: "Chọn từ màn hình" })}
            </button>
          )}
        </div>
        <div className="space-y-3">
          {[hexOf(rgb), `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`, `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`].map((v) => (
            <div key={v} className="flex items-center gap-3">
              <code className="mono min-w-0 flex-1 rounded-xl border hairline bg-[var(--color-surface)] px-3.5 py-2.5 text-[14.5px]">{v}</code>
              <CopyButton value={v} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <Note>
          {canPick
            ? pick(locale, {
                en: "Screen eyedropper uses the browser EyeDropper API — the pixel color is read locally, nothing is recorded.",
                zh: "屏幕取色使用浏览器的 EyeDropper API,像素颜色在本地读取,不会被记录。",
                ja: "画面スポイトはブラウザの EyeDropper API を使用します。ピクセル色はローカルで取得され、記録されません。",
                es: "La lupa de pantalla usa la API EyeDropper del navegador: el color se lee localmente y no se registra nada.",
                pt: "O conta-giros usa a API EyeDropper do navegador — a cor do pixel é lida localmente e nada é registrado.",
                fr: "La pipette d'écran utilise l'API EyeDropper du navigateur — la couleur du pixel est lue localement, rien n'est enregistré.",
                de: "Der Bildschirm-Pipette nutzt die EyeDropper-API des Browsers — die Pixelfarbe wird lokal gelesen, nichts wird gespeichert.",
                ru: "Пипетка экрана использует API EyeDropper браузера — цвет пикселя читается локально, ничего не сохраняется.",
                it: "Il contagocce dello schermo usa l'API EyeDropper del browser — il colore del pixel è letto localmente, nulla viene registrato.",
                tr: "Ekran damlalığı tarayıcının EyeDropper API'sini kullanır — piksel rengi yerel olarak okunur, hiçbir şey kaydedilmez.",
                ko: "화면 스포이드는 브라우저의 EyeDropper API를 사용합니다 — 픽셀 색은 로컬에서 읽히며 기록되지 않습니다.",
                ar: "قطارة الشاشة تستخدم EyeDropper API في المتصفح — يُقرأ لون البكسل محليًا ولا يُسجل شيء.",
                hi: "स्क्रीन आइड्रॉपर ब्राउज़र के EyeDropper API का उपयोग करता है — पिक्सेल रंग स्थानीय रूप से पढ़ा जाता है, कुछ भी रिकॉर्ड नहीं होता।",
                id: "Pipet layar memakai EyeDropper API peramban — warna piksel dibaca lokal, tidak ada yang direkam.",
                vi: "Ống hút màn hình dùng EyeDropper API của trình duyệt — màu pixel được đọc cục bộ, không ghi lại gì.",
              })
            : pick(locale, {
                en: "Your browser does not expose the EyeDropper API, so use the swatch input; hex/rgb/hsl values still update live.",
                zh: "当前浏览器不支持 EyeDropper API,请使用色块选择;hex/rgb/hsl 仍会实时更新。",
                ja: "このブラウザは EyeDropper API に対応していないため、カラーピッカーをご利用ください。hex/rgb/hsl はリアルタイム更新されます。",
                es: "Su navegador no expone la API EyeDropper; use el selector de color. Los valores hex/rgb/hsl se actualizan igualmente.",
                pt: "Seu navegador não expõe a API EyeDropper; use o seletor de cor. Os valores hex/rgb/hsl continuam atualizando.",
                fr: "Votre navigateur n'expose pas l'API EyeDropper ; utilisez la saisie par nuancier — les valeurs hex/rgb/hsl restent mises à jour en direct.",
                de: "Dein Browser stellt die EyeDropper-API nicht bereit; nutze die Farbmustereingabe — Hex/RGB/HSL-Werte aktualisieren weiterhin live.",
                ru: "Ваш браузер не предоставляет API EyeDropper; используйте ввод образцами — значения hex/rgb/hsl по-прежнему обновляются на лету.",
                it: "Il tuo browser non espone l'API EyeDropper; usa l'input a campioni — i valori hex/rgb/hsl si aggiornano comunque in tempo reale.",
                tr: "Tarayıcınız EyeDropper API'sini sunmuyor; renk örneği girişini kullanın — hex/rgb/hsl değerleri yine canlı güncellenir.",
                ko: "브라우저가 EyeDropper API를 지원하지 않습니다 — 색 견본 입력을 사용하세요. hex/rgb/hsl 값은 실시간으로 갱신됩니다.",
                ar: "متصفحك لا يوفر EyeDropper API؛ استخدم إدخال العينات — تتحدث قيم hex/rgb/hsl فوريًا.",
                hi: "आपका ब्राउज़र EyeDropper API उपलब्ध नहीं कराता — स्वैच इनपुट उपयोग करें; hex/rgb/hsl मान अब भी लाइव अपडेट होते हैं।",
                id: "Peramban Anda tidak menyediakan EyeDropper API; gunakan input swatch — nilai hex/rgb/hsl tetap diperbarui langsung.",
                vi: "Trình duyệt của bạn không hỗ trợ EyeDropper API — hãy dùng nhập ô màu; giá trị hex/rgb/hsl vẫn cập nhật trực tiếp.",
              })}
        </Note>
      </div>
    </ToolPanel>
  );
}

/* ---------------- converter ---------------- */

function Converter() {
  const { locale } = useI18n();
  const [input, setInput] = useState("#0071e3");
  const rgb = parseAny(input);

  const invalidMsg =
    input.trim() === "" ? null : pick(locale, {
      en: "Not a color we can read. Try #0071e3, rgb(0, 113, 227) or hsl(211, 100%, 45%).",
      zh: "无法识别的颜色。试试 #0071e3、rgb(0, 113, 227) 或 hsl(211, 100%, 45%)。",
      ja: "読み取れない色です。#0071e3、rgb(0, 113, 227)、hsl(211, 100%, 45%) などを試してください。",
      es: "Color no reconocido. Pruebe #0071e3, rgb(0, 113, 227) o hsl(211, 100%, 45%).",
      pt: "Cor não reconhecida. Tente #0071e3, rgb(0, 113, 227) ou hsl(211, 100%, 45%).",
      fr: "Couleur illisible. Essayez #0071e3, rgb(0, 113, 227) ou hsl(211, 100 %, 45 %).",
      de: "Keine lesbare Farbe. Versuche #0071e3, rgb(0, 113, 227) oder hsl(211, 100 %, 45 %).",
      ru: "Не удалось прочитать цвет. Попробуйте #0071e3, rgb(0, 113, 227) или hsl(211, 100 %, 45 %).",
      it: "Colore non leggibile. Prova #0071e3, rgb(0, 113, 227) o hsl(211, 100%, 45%).",
      tr: "Okunabilir bir renk değil. #0071e3, rgb(0, 113, 227) veya hsl(211, %100, %45) deneyin.",
      ko: "읽을 수 있는 색이 아닙니다. #0071e3, rgb(0, 113, 227) 또는 hsl(211, 100%, 45%)를 시도해 보세요.",
      ar: "لون غير قابل للقراءة. جرّب #0071e3 أو rgb(0, 113, 227) أو hsl(211, 100%, 45%).",
      hi: "पढ़ने योग्य रंग नहीं। #0071e3, rgb(0, 113, 227) या hsl(211, 100%, 45%) आज़माएँ।",
      id: "Warna tidak dapat dibaca. Coba #0071e3, rgb(0, 113, 227), atau hsl(211, 100%, 45%).",
      vi: "Không đọc được màu này. Hãy thử #0071e3, rgb(0, 113, 227) hoặc hsl(211, 100%, 45%).",
    });

  return (
    <ToolPanel>
      <Field label={pick(locale, { en: "Color (hex, rgb() or hsl())", zh: "颜色(hex、rgb() 或 hsl())", ja: "色(hex、rgb()、hsl())", es: "Color (hex, rgb() u hsl())", pt: "Cor (hex, rgb() ou hsl())", fr: "Couleur (hex, rgb() ou hsl())", de: "Farbe (hex, rgb() oder hsl())", ru: "Цвет (hex, rgb() или hsl())", it: "Colore (hex, rgb() o hsl())", tr: "Renk (hex, rgb() veya hsl())", ko: "색상 (hex, rgb() 또는 hsl())", ar: "اللون (hex أو rgb() أو hsl())", hi: "रंग (hex, rgb() या hsl())", id: "Warna (hex, rgb() atau hsl())", vi: "Màu (hex, rgb() hoặc hsl())" })}>
        <TextIn value={input} mono onChange={setInput} aria="color value" spellCheck={false} placeholder="#0071e3" />
      </Field>
      {rgb && (
        <div className="mt-4 flex items-center gap-4">
          <div className="h-14 w-20 flex-none rounded-xl border hairline" style={{ backgroundColor: hexOf(rgb) }} aria-hidden />
          <div className="space-y-2 min-w-0">
            {[
              hexOf(rgb),
              `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`,
              (() => {
                const hsl = rgbToHsl(rgb);
                return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
              })(),
            ].map((v) => (
              <div key={v} className="flex items-center gap-3">
                <code className="mono min-w-0 flex-1 truncate rounded-xl border hairline bg-[var(--color-surface)] px-3.5 py-2 text-[14px]">{v}</code>
                <CopyButton value={v} />
              </div>
            ))}
          </div>
        </div>
      )}
      {invalidMsg && <p className="mt-3 text-[13.5px] text-[var(--color-bad)]" role="alert">{invalidMsg}</p>}
      {rgb && (
        <div className="mt-6 space-y-5">
          <SwatchRow base={rgb} label={pick(locale, { en: "Tints & shades", zh: "明暗色阶", ja: "ティント & シェード", es: "Tonos y sombras", pt: "Tons e sombras", fr: "Teintes et nuances", de: "Abstufungen", ru: "Оттенки", it: "Tinte e sfumature", tr: "Tonlar ve gölgeler", ko: "색조 및 음영", ar: "الدرجات والتظليل", hi: "टिंट और शेड", id: "Corak dan bayangan", vi: "Sắc độ và bóng màu" })} />
        </div>
      )}
      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "The swatch row mixes the color with white (left) and black (right) at 20/40/60/80% — handy for hover states and dark-mode variants.",
            zh: "色阶行把颜色与白色(左)和黑色(右)按 20/40/60/80% 混合——适合做 hover 态与深色模式变体。",
            ja: "スウォッチ行は、白(左)と黒(右)に 20/40/60/80% ずつ混ぜた色です。ホバー状態やダークモードのバリエーションに便利です。",
            es: "La fila de muestras mezcla el color con blanco (izquierda) y negro (derecha) al 20/40/60/80% — útil para estados hover y modo oscuro.",
            pt: "A fileira de amostras mistura a cor com branco (esquerda) e preto (direita) a 20/40/60/80% — útil para estados hover e modo escuro.",
            fr: "La rangée de nuances mélange la couleur avec du blanc (à gauche) et du noir (à droite) à 20/40/60/80 % — pratique pour les états survolés et les variantes sombres.",
            de: "Die Musterreihe mischt die Farbe mit Weiß (links) und Schwarz (rechts) bei 20/40/60/80 % — praktisch für Hover-Zustände und Dark-Mode-Varianten.",
            ru: "Ряд образцов смешивает цвет с белым (слева) и чёрным (справа) на 20/40/60/80 % — удобно для hover-состояний и тёмных вариантов.",
            it: "La riga di campioni mescola il colore con bianco (sinistra) e nero (destra) al 20/40/60/80% — utile per stati hover e varianti dark-mode.",
            tr: "Renk örneği sırası rengi %20/40/60/80 oranında beyazla (solda) ve siyahla (sağda) karıştırır — hover durumları ve koyu tema varyantları için pratik.",
            ko: "색 견본 행은 색을 흰색(왼쪽)·검정(오른쪽)과 20/40/60/80% 비율로 섞습니다 — hover 상태와 다크 모드 변형에 유용합니다.",
            ar: "صف العينات يمزج اللون مع الأبيض (يسارًا) والأسود (يمينًا) بنسب 20/40/60/80% — مفيد لحالات التحويم ونسخ الوضع الداكن.",
            hi: "स्वैच पंक्ति रंग को 20/40/60/80% पर सफ़ेद (बाएँ) और काले (दाएँ) से मिलाती है — hover स्थितियों और डार्क-मोड संस्करणों के लिए उपयोगी।",
            id: "Baris swatch mencampur warna dengan putih (kiri) dan hitam (kanan) pada 20/40/60/80% — berguna untuk status hover dan varian mode gelap.",
            vi: "Hàng ô màu pha màu với trắng (trái) và đen (phải) ở 20/40/60/80% — tiện cho trạng thái hover và biến thể chế tối.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

export function CalcEngineColor({ kind }: { kind: string }) {
  return kind === "picker" ? <Picker /> : <Converter />;
}
