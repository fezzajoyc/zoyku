"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { BigOut, Field, Note, Stats, fmt, pick } from "./calc-ui";
import { contrastRatio, parseColor, wcagBadges } from "../_lib/contrast";

/**
 * WCAG 对比度检查引擎:前景 / 背景两个颜色(hex 文本 + 原生取色器),
 * 纯数学在 tools/_lib/contrast.ts,这里只做编排。徽章判定用全精度比值,
 * 展示取 2 位小数,避免 4.4996 被舍入成 4.5 造成误判。
 */

const PRESETS: { fg: string; bg: string; key: "p0" | "p1" | "p2" | "p3" }[] = [
  { fg: "#000000", bg: "#FFFFFF", key: "p0" },
  { fg: "#767676", bg: "#FFFFFF", key: "p1" },
  { fg: "#0000FF", bg: "#FFFFFF", key: "p2" },
  { fg: "#999999", bg: "#FFFFFF", key: "p3" },
];

const L = {
  fg: { en: "Foreground", zh: "前景色", ja: "文字色", es: "Color de primer plano", pt: "Cor do texto" },
  bg: { en: "Background", zh: "背景色", ja: "背景色", es: "Color de fondo", pt: "Cor de fundo" },
  ratio: { en: "Contrast ratio", zh: "对比度", ja: "コントラスト比", es: "Relación de contraste", pt: "Taxa de contraste" },
  pass: { en: "Pass", zh: "通过", ja: "合格", es: "Pasa", pt: "Passa" },
  fail: { en: "Fail", zh: "不通过", ja: "不合格", es: "No pasa", pt: "Não passa" },
  aaNormal: { en: "AA · Normal text", zh: "AA · 正文", ja: "AA · 通常文字", es: "AA · Texto normal", pt: "AA · Texto normal" },
  aaaNormal: { en: "AAA · Normal text", zh: "AAA · 正文", ja: "AAA · 通常文字", es: "AAA · Texto normal", pt: "AAA · Texto normal" },
  aaLarge: { en: "AA · Large text", zh: "AA · 大字", ja: "AA · 拡大文字", es: "AA · Texto grande", pt: "AA · Texto grande" },
  aaaLarge: { en: "AAA · Large text", zh: "AAA · 大字", ja: "AAA · 拡大文字", es: "AAA · Texto grande", pt: "AAA · Texto grande" },
  invalid: {
    en: "One of the colors is not valid. Use hex like #333 or #1F2937, or rgb()/rgba().",
    zh: "有一个颜色不合法。请用 #333、#1F2937 这样的 hex,或 rgb()/rgba()。",
    ja: "色の指定が不正です。#333 や #1F2937 のような HEX、または rgb()/rgba() を使ってください。",
    es: "Uno de los colores no es válido. Usa hex como #333 o #1F2937, o rgb()/rgba().",
    pt: "Uma das cores não é válida. Use hex como #333 ou #1F2937, ou rgb()/rgba().",
  },
  badgesNote: {
    en: "WCAG thresholds — normal text: AA ≥ 4.5, AAA ≥ 7; large text (≥ 24 px, or ≥ 18.7 px bold): AA ≥ 3, AAA ≥ 4.5.",
    zh: "WCAG 阈值——正文:AA ≥ 4.5、AAA ≥ 7;大字(≥ 24px,或 ≥ 18.7px 粗体):AA ≥ 3、AAA ≥ 4.5。",
    ja: "WCAG のしきい値 — 通常文字:AA ≥ 4.5、AAA ≥ 7。拡大文字(≥ 24px、または ≥ 18.7px の太字):AA ≥ 3、AAA ≥ 4.5。",
    es: "Umbrales WCAG — texto normal: AA ≥ 4.5, AAA ≥ 7; texto grande (≥ 24 px, o ≥ 18.7 px en negrita): AA ≥ 3, AAA ≥ 4.5.",
    pt: "Limites WCAG — texto normal: AA ≥ 4.5, AAA ≥ 7; texto grande (≥ 24 px, ou ≥ 18.7 px em negrito): AA ≥ 3, AAA ≥ 4.5.",
  },
  p0: { en: "Black on white", zh: "黑字白底", ja: "黒×白", es: "Negro sobre blanco", pt: "Preto no branco" },
  p1: { en: "Gray on white (AA)", zh: "灰字白底(刚好 AA)", ja: "グレー×白(ぎり AA)", es: "Gris sobre blanco (AA)", pt: "Cinza no branco (AA)" },
  p2: { en: "Blue on white (AAA)", zh: "蓝字白底(AAA)", ja: "青×白(AAA)", es: "Azul sobre blanco (AAA)", pt: "Azul no branco (AAA)" },
  p3: { en: "Light gray (fails)", zh: "浅灰(不通过)", ja: "薄グレー(不合格)", es: "Gris claro (no pasa)", pt: "Cinza claro (reprovado)" },
};

/** hex 文本 → 原生取色器可用的 #rrggbb;无效时回退中性色。 */
function hexForPicker(input: string, fallback: string): string {
  const s = input.trim();
  if (/^#[0-9a-f]{6}$/i.test(s)) return s.toLowerCase();
  const m = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(s);
  if (m) return ("#" + m[1] + m[1] + m[2] + m[2] + m[3] + m[3]).toLowerCase();
  return fallback;
}

function ColorRow({
  label,
  value,
  onChange,
  fallback,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  fallback: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <input
        type="color"
        value={hexForPicker(value, fallback)}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-14 shrink-0 cursor-pointer rounded-lg border hairline bg-[var(--color-card)]"
        aria-label={label}
      />
      <input
        type="text"
        className="field mono"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#1F2937"
        aria-label={label}
        spellCheck={false}
      />
    </div>
  );
}

export function CalcEngineContrast() {
  const { locale } = useI18n();
  const [fg, setFg] = useState("#333333");
  const [bg, setBg] = useState("#FFFFFF");

  const ratio = contrastRatio(fg, bg);
  const valid = Number.isFinite(ratio);
  const badges = wcagBadges(valid ? ratio : -1);
  const fgRgb = parseColor(fg);
  const bgRgb = parseColor(bg);

  const swap = () => {
    setFg(bg);
    setBg(fg);
  };

  const fmtRatio = fmt(ratio, locale, 2);

  const badge = (on: boolean) => ({ value: on ? pick(locale, L.pass) : pick(locale, L.fail), tone: on ? ("good" as const) : ("bad" as const) });

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={pick(locale, L.fg)}>
            <ColorRow label={pick(locale, L.fg)} value={fg} onChange={setFg} fallback="#333333" />
          </Field>
          <Field label={pick(locale, L.bg)}>
            <ColorRow label={pick(locale, L.bg)} value={bg} onChange={setBg} fallback="#FFFFFF" />
          </Field>
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => {
                setFg(p.fg);
                setBg(p.bg);
              }}
              aria-label={`${pick(locale, L[p.key])} — ${p.fg} / ${p.bg}`}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              <span className="mr-2 inline-flex" aria-hidden>
                <span
                  className="inline-block h-3.5 w-3.5 rounded-full border hairline align-middle"
                  style={{ background: p.bg }}
                />
                <span
                  className="-ml-1.5 inline-block h-3.5 w-3.5 rounded-full border hairline align-middle"
                  style={{ background: p.fg }}
                />
              </span>
              {pick(locale, L[p.key])}
            </button>
          ))}
          <button
            type="button"
            onClick={swap}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            ⇄
          </button>
        </div>

        {!valid && (
          <p
            className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
            role="alert"
          >
            {pick(locale, L.invalid)}
          </p>
        )}

        <Field label={pick(locale, L.ratio)}>
          <BigOut>{fmtRatio} : 1</BigOut>
        </Field>

        <Stats
          items={[
            { label: pick(locale, L.aaNormal), ...badge(badges.aaNormal) },
            { label: pick(locale, L.aaaNormal), ...badge(badges.aaaNormal) },
            { label: pick(locale, L.aaLarge), ...badge(badges.aaLarge) },
            { label: pick(locale, L.aaaLarge), ...badge(badges.aaaLarge) },
          ]}
        />

        {fgRgb && bgRgb && (
          <div
            className="rounded-xl border hairline px-4 py-5"
            style={{ background: `rgb(${bgRgb.r} ${bgRgb.g} ${bgRgb.b})` }}
          >
            <p
              className="text-[16px] leading-6"
              style={{ color: `rgb(${fgRgb.r} ${fgRgb.g} ${fgRgb.b})` }}
            >
              Aa — The quick brown fox jumps over the lazy dog. 0123456789
            </p>
            <p
              className="mt-2 text-[24px] font-bold leading-8"
              style={{ color: `rgb(${fgRgb.r} ${fgRgb.g} ${fgRgb.b})` }}
            >
              Aa — Large & bold sample 24px
            </p>
          </div>
        )}

        <Note>{pick(locale, L.badgesNote)}</Note>
      </div>
    </ToolPanel>
  );
}
