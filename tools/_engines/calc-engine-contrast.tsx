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
  fg: { en: "Foreground", zh: "前景色", ja: "文字色", es: "Color de primer plano", pt: "Cor do texto", fr: "Premier plan", de: "Vordergrund", ru: "Текст", it: "Primo piano", tr: "Ön plan", ko: "전경", ar: "المقدمة", hi: "अग्रभूमि", id: "Depan", vi: "Màu chữ" },
  bg: { en: "Background", zh: "背景色", ja: "背景色", es: "Color de fondo", pt: "Cor de fundo", fr: "Arrière-plan", de: "Hintergrund", ru: "Фон", it: "Sfondo", tr: "Arka plan", ko: "배경", ar: "الخلفية", hi: "पृष्ठभूमि", id: "Latar", vi: "Màu nền" },
  ratio: { en: "Contrast ratio", zh: "对比度", ja: "コントラスト比", es: "Relación de contraste", pt: "Taxa de contraste", fr: "Ratio de contraste", de: "Kontrastverhältnis", ru: "Коэффициент контраста", it: "Rapporto di contrasto", tr: "Kontrast oranı", ko: "명도 대비", ar: "نسبة التباين", hi: "कंट्रास्ट अनुपात", id: "Rasio kontras", vi: "Tỷ lệ tương phản" },
  pass: { en: "Pass", zh: "通过", ja: "合格", es: "Pasa", pt: "Passa", fr: "Réussite", de: "Besteht", ru: "Пройдено", it: "Superato", tr: "Geçer", ko: "통과", ar: "ناجح", hi: "पास", id: "Lulus", vi: "Đạt" },
  fail: { en: "Fail", zh: "不通过", ja: "不合格", es: "No pasa", pt: "Não passa", fr: "Échec", de: "Fällt durch", ru: "Не пройдено", it: "Fallito", tr: "Kalır", ko: "미달", ar: "راسب", hi: "फेल", id: "Gagal", vi: "Không đạt" },
  aaNormal: { en: "AA · Normal text", zh: "AA · 正文", ja: "AA · 通常文字", es: "AA · Texto normal", pt: "AA · Texto normal", fr: "AA · Texte normal", de: "AA · Normaler Text", ru: "AA · Обычный текст", it: "AA · Testo normale", tr: "AA · Normal metin", ko: "AA · 일반 텍스트", ar: "AA · نص عادي", hi: "AA · सामान्य टेक्स्ट", id: "AA · Teks normal", vi: "AA · Chữ thường" },
  aaaNormal: { en: "AAA · Normal text", zh: "AAA · 正文", ja: "AAA · 通常文字", es: "AAA · Texto normal", pt: "AAA · Texto normal", fr: "AAA · Texte normal", de: "AAA · Normaler Text", ru: "AAA · Обычный текст", it: "AAA · Testo normale", tr: "AAA · Normal metin", ko: "AAA · 일반 텍스트", ar: "AAA · نص عادي", hi: "AAA · सामान्य टेक्स्ट", id: "AAA · Teks normal", vi: "AAA · Chữ thường" },
  aaLarge: { en: "AA · Large text", zh: "AA · 大字", ja: "AA · 拡大文字", es: "AA · Texto grande", pt: "AA · Texto grande", fr: "AA · Texte large", de: "AA · Großer Text", ru: "AA · Крупный текст", it: "AA · Testo grande", tr: "AA · Büyük metin", ko: "AA · 큰 텍스트", ar: "AA · نص كبير", hi: "AA · बड़ा टेक्स्ट", id: "AA · Teks besar", vi: "AA · Chữ lớn" },
  aaaLarge: { en: "AAA · Large text", zh: "AAA · 大字", ja: "AAA · 拡大文字", es: "AAA · Texto grande", pt: "AAA · Texto grande", fr: "AAA · Texte large", de: "AAA · Großer Text", ru: "AAA · Крупный текст", it: "AAA · Testo grande", tr: "AAA · Büyük metin", ko: "AAA · 큰 텍스트", ar: "AAA · نص كبير", hi: "AAA · बड़ा टेक्स्ट", id: "AAA · Teks besar", vi: "AAA · Chữ lớn" },
  invalid: {
    en: "One of the colors is not valid. Use hex like #333 or #1F2937, or rgb()/rgba().",
    zh: "有一个颜色不合法。请用 #333、#1F2937 这样的 hex,或 rgb()/rgba()。",
    ja: "色の指定が不正です。#333 や #1F2937 のような HEX、または rgb()/rgba() を使ってください。",
    es: "Uno de los colores no es válido. Usa hex como #333 o #1F2937, o rgb()/rgba().",
    pt: "Uma das cores não é válida. Use hex como #333 ou #1F2937, ou rgb()/rgba().",
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
  badgesNote: {
    en: "WCAG thresholds — normal text: AA ≥ 4.5, AAA ≥ 7; large text (≥ 24 px, or ≥ 18.7 px bold): AA ≥ 3, AAA ≥ 4.5.",
    zh: "WCAG 阈值——正文:AA ≥ 4.5、AAA ≥ 7;大字(≥ 24px,或 ≥ 18.7px 粗体):AA ≥ 3、AAA ≥ 4.5。",
    ja: "WCAG のしきい値 — 通常文字:AA ≥ 4.5、AAA ≥ 7。拡大文字(≥ 24px、または ≥ 18.7px の太字):AA ≥ 3、AAA ≥ 4.5。",
    es: "Umbrales WCAG — texto normal: AA ≥ 4.5, AAA ≥ 7; texto grande (≥ 24 px, o ≥ 18.7 px en negrita): AA ≥ 3, AAA ≥ 4.5.",
    pt: "Limites WCAG — texto normal: AA ≥ 4.5, AAA ≥ 7; texto grande (≥ 24 px, ou ≥ 18.7 px em negrito): AA ≥ 3, AAA ≥ 4.5.",
    fr: "Seuils WCAG — texte normal : AA ≥ 4,5, AAA ≥ 7 ; texte large (≥ 24 px, ou ≥ 18,7 px gras) : AA ≥ 3, AAA ≥ 4,5.",
    de: "WCAG-Schwellen — normaler Text: AA ≥ 4,5, AAA ≥ 7; großer Text (≥ 24 px oder ≥ 18,7 px fett): AA ≥ 3, AAA ≥ 4,5.",
    ru: "Пороги WCAG — обычный текст: AA ≥ 4,5, AAA ≥ 7; крупный (≥ 24 px или ≥ 18,7 px жирный): AA ≥ 3, AAA ≥ 4,5.",
    it: "Soglie WCAG — testo normale: AA ≥ 4,5, AAA ≥ 7; testo grande (≥ 24 px o ≥ 18,7 px grassetto): AA ≥ 3, AAA ≥ 4,5.",
    tr: "WCAG eşikleri — normal metin: AA ≥ 4,5, AAA ≥ 7; büyük metin (≥ 24 px veya ≥ 18,7 px kalın): AA ≥ 3, AAA ≥ 4,5.",
    ko: "WCAG 기준 — 일반 텍스트: AA ≥ 4.5, AAA ≥ 7; 큰 텍스트(≥ 24px 또는 ≥ 18.7px 굵게): AA ≥ 3, AAA ≥ 4.5.",
    ar: "حدود WCAG — نص عادي: AA ≥ 4.5 و AAA ≥ 7؛ نص كبير (≥ 24px أو ≥ 18.7px عريض): AA ≥ 3 و AAA ≥ 4.5.",
    hi: "WCAG सीमाएँ — सामान्य टेक्स्ट: AA ≥ 4.5, AAA ≥ 7; बड़ा टेक्स्ट (≥ 24px या ≥ 18.7px बोल्ड): AA ≥ 3, AAA ≥ 4.5।",
    id: "Ambang WCAG — teks normal: AA ≥ 4,5, AAA ≥ 7; teks besar (≥ 24 px atau ≥ 18,7 px tebal): AA ≥ 3, AAA ≥ 4,5.",
    vi: "Ngưỡng WCAG — chữ thường: AA ≥ 4,5, AAA ≥ 7; chữ lớn (≥ 24px hoặc ≥ 18,7px đậm): AA ≥ 3, AAA ≥ 4,5.",
  },
  p0: { en: "Black on white", zh: "黑字白底", ja: "黒×白", es: "Negro sobre blanco", pt: "Preto no branco", fr: "Noir sur blanc", de: "Schwarz auf Weiß", ru: "Чёрный на белом", it: "Nero su bianco", tr: "Beyaz üzerine siyah", ko: "흰 배경 검정", ar: "أسود على أبيض", hi: "सफ़ेद पर काला", id: "Hitam di atas putih", vi: "Đen trên trắng" },
  p1: { en: "Gray on white (AA)", zh: "灰字白底(刚好 AA)", ja: "グレー×白(ぎり AA)", es: "Gris sobre blanco (AA)", pt: "Cinza no branco (AA)", fr: "Gris sur blanc (AA)", de: "Grau auf Weiß (AA)", ru: "Серый на белом (AA)", it: "Grigio su bianco (AA)", tr: "Beyaz üzerine gri (AA)", ko: "흰 배경 회색(AA)", ar: "رمادي على أبيض (AA)", hi: "सफ़ेद पर ग्रे (AA)", id: "Abu di atas putih (AA)", vi: "Xám trên trắng (AA)" },
  p2: { en: "Blue on white (AAA)", zh: "蓝字白底(AAA)", ja: "青×白(AAA)", es: "Azul sobre blanco (AAA)", pt: "Azul no branco (AAA)", fr: "Bleu sur blanc (AAA)", de: "Blau auf Weiß (AAA)", ru: "Синий на белом (AAA)", it: "Blu su bianco (AAA)", tr: "Beyaz üzerine mavi (AAA)", ko: "흰 배경 파랑(AAA)", ar: "أزرق على أبيض (AAA)", hi: "सफ़ेद पर नीला (AAA)", id: "Biru di atas putih (AAA)", vi: "Xanh trên trắng (AAA)" },
  p3: { en: "Light gray (fails)", zh: "浅灰(不通过)", ja: "薄グレー(不合格)", es: "Gris claro (no pasa)", pt: "Cinza claro (reprovado)", fr: "Gris clair (échoue)", de: "Hellgrau (durchgefallen)", ru: "Светло-серый (не проходит)", it: "Grigio chiaro (fallito)", tr: "Açık gri (kalır)", ko: "밝은 회색(미달)", ar: "رمادي فاتح (راسب)", hi: "हल्का ग्रे (फेल)", id: "Abu muda (gagal)", vi: "Xám nhạt (không đạt)" },
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
