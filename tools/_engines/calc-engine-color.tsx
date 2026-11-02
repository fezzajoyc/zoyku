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
              {pick(locale, { en: "Pick from screen", zh: "从屏幕取色", ja: "画面からスポイト", es: "Tomar de la pantalla", pt: "Capturar da tela" })}
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
              })
            : pick(locale, {
                en: "Your browser does not expose the EyeDropper API, so use the swatch input; hex/rgb/hsl values still update live.",
                zh: "当前浏览器不支持 EyeDropper API,请使用色块选择;hex/rgb/hsl 仍会实时更新。",
                ja: "このブラウザは EyeDropper API に対応していないため、カラーピッカーをご利用ください。hex/rgb/hsl はリアルタイム更新されます。",
                es: "Su navegador no expone la API EyeDropper; use el selector de color. Los valores hex/rgb/hsl se actualizan igualmente.",
                pt: "Seu navegador não expõe a API EyeDropper; use o seletor de cor. Os valores hex/rgb/hsl continuam atualizando.",
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
    });

  return (
    <ToolPanel>
      <Field label={pick(locale, { en: "Color (hex, rgb() or hsl())", zh: "颜色(hex、rgb() 或 hsl())", ja: "色(hex、rgb()、hsl())", es: "Color (hex, rgb() u hsl())", pt: "Cor (hex, rgb() ou hsl())" })}>
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
          <SwatchRow base={rgb} label={pick(locale, { en: "Tints & shades", zh: "明暗色阶", ja: "ティント & シェード", es: "Tonos y sombras", pt: "Tons e sombras" })} />
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
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

export function CalcEngineColor({ kind }: { kind: string }) {
  return kind === "picker" ? <Picker /> : <Converter />;
}
