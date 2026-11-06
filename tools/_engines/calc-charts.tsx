"use client";

import { pick } from "./calc-ui";

/**
 * 轻量 SVG 图表(零依赖,本地渲染):calc 族工具页的结果可视化。
 * 配色走 CSS 变量,自动适配亮暗色;无动画依赖,SSR 安全。
 */

export type Slice = { label: string; value: number; color: string };

/** 环形图:本金/利息构成 */
export function DonutChart({
  slices,
  centerTitle,
  centerValue,
  ariaLabel,
}: {
  slices: Slice[];
  centerTitle?: string;
  centerValue?: string;
  ariaLabel?: string;
}) {
  const total = slices.reduce((s, x) => s + Math.max(0, x.value), 0);
  if (!(total > 0)) return null;
  const R = 42;
  const C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <figure className="flex flex-wrap items-center gap-5">
      <svg
        viewBox="0 0 120 120"
        className="h-[132px] w-[132px] flex-none"
        role="img"
        aria-label={ariaLabel}
      >
        <circle cx="60" cy="60" r={R} fill="none" stroke="var(--color-surface)" strokeWidth="14" />
        {slices.map((s, i) => {
          const frac = Math.max(0, s.value) / total;
          const dash = frac * C;
          const el = (
            <circle
              key={i}
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth="14"
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={-acc * C}
              transform="rotate(-90 60 60)"
              strokeLinecap="butt"
            />
          );
          acc += frac;
          return el;
        })}
        {centerValue ? (
          <>
            <text x="60" y="57" textAnchor="middle" className="fill-[var(--color-sub)]" fontSize="8">
              {centerTitle}
            </text>
            <text x="60" y="70" textAnchor="middle" className="fill-[var(--color-ink)]" fontSize="13" fontWeight="600">
              {centerValue}
            </text>
          </>
        ) : null}
      </svg>
      <ul className="min-w-[140px] space-y-1.5 text-[13px]">
        {slices.map((s, i) => (
          <li key={i} className="flex items-center gap-2">
            <span aria-hidden className="inline-block h-2.5 w-2.5 flex-none rounded-full" style={{ background: s.color }} />
            <span className="text-[var(--color-sub)]">{s.label}</span>
            <span className="ml-auto font-medium text-[var(--color-ink)]">
              {total > 0 ? `${Math.round((Math.max(0, s.value) / total) * 100)}%` : "—"}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** 余额衰减曲线:逐年贷款余额(面积图) */
export function BalanceChart({
  values,
  xLabel,
  yLabel,
  ariaLabel,
  valueFormatter,
}: {
  values: number[];
  xLabel?: string;
  yLabel?: string;
  ariaLabel?: string;
  valueFormatter?: (n: number) => string;
}) {
  const vals = values.filter((v) => Number.isFinite(v) && v >= 0);
  if (vals.length < 2) return null;
  const W = 320;
  const H = 120;
  const PAD_L = 8;
  const PAD_B = 18;
  const max = Math.max(...vals);
  const min = Math.min(...vals, 0);
  const span = max - min || 1;
  const px = (i: number) => PAD_L + (i / (vals.length - 1)) * (W - PAD_L - 6);
  const py = (v: number) => 6 + (1 - (v - min) / span) * (H - PAD_B - 10);
  const line = vals.map((v, i) => `${i === 0 ? "M" : "L"}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" ");
  const area = `${line} L${px(vals.length - 1).toFixed(1)},${H - PAD_B} L${px(0).toFixed(1)},${H - PAD_B} Z`;
  return (
    <figure>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-[120px] w-full"
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="none"
      >
        <path d={area} fill="var(--color-accent)" opacity="0.12" />
        <path d={line} fill="none" stroke="var(--color-accent)" strokeWidth="2" />
        <line x1={PAD_L} y1={H - PAD_B} x2={W - 6} y2={H - PAD_B} stroke="var(--color-hairline)" strokeWidth="1" />
        {/* 首末点数值标注 */}
        <text x={PAD_L} y={py(vals[0]) - 4} fontSize="9" className="fill-[var(--color-sub)]">
          {valueFormatter ? valueFormatter(vals[0]) : Math.round(vals[0])}
        </text>
        <text x={W - 6} y={py(vals[vals.length - 1]) - 4} textAnchor="end" fontSize="9" className="fill-[var(--color-sub)]">
          {valueFormatter ? valueFormatter(vals[vals.length - 1]) : Math.round(vals[vals.length - 1])}
        </text>
      </svg>
      {(xLabel || yLabel) && (
        <figcaption className="mt-1 flex justify-between text-[11.5px] text-[var(--color-sub)]">
          <span>{yLabel}</span>
          <span>{xLabel}</span>
        </figcaption>
      )}
    </figure>
  );
}

/** 共用文案(15 语):图表标题 */
export const CHART_LABELS = {
  composition: {
    en: "Payment composition", zh: "还款构成", ja: "返済の内訳", es: "Composición del pago", pt: "Composição do pagamento",
    fr: "Composition du paiement", de: "Zusammensetzung der Zahlung", ru: "Структура платежей", it: "Composizione del pagamento",
    tr: "Ödeme bileşimi", ko: "상환 구성", ar: "تكوين الدفعة", hi: "भुगतान संरचना", id: "Komposisi pembayaran", vi: "Cơ cấu khoản trả",
  },
  balanceCurve: {
    en: "Remaining balance over time", zh: "剩余本金走势", ja: "残高の推移", es: "Saldo pendiente en el tiempo", pt: "Saldo devedor ao longo do tempo",
    fr: "Solde restant dans le temps", de: "Restschuld im Zeitverlauf", ru: "Остаток долга по годам", it: "Saldo residuo nel tempo",
    tr: "Zaman içindeki kalan bakiye", ko: "잔액 추이", ar: "الرصيد المتبقي مع الزمن", hi: "समय के साथ शेष राशि", id: "Sisa saldo dari waktu ke waktu", vi: "Số dư còn lại theo thời gian",
  },
  principal: {
    en: "Principal", zh: "本金", ja: "元本", es: "Capital", pt: "Principal", fr: "Capital", de: "Tilgung", ru: "Основной долг",
    it: "Capitale", tr: "Ana para", ko: "원금", ar: "أصل القرض", hi: "मूलधन", id: "Pokok", vi: "Gốc",
  },
  interestOnly: {
    en: "Interest", zh: "利息", ja: "利息", es: "Interés", pt: "Juros", fr: "Intérêts", de: "Zinsen", ru: "Проценты",
    it: "Interessi", tr: "Faiz", ko: "이자", ar: "الفائدة", hi: "ब्याज", id: "Bunga", vi: "Lãi",
  },
} as const;

export function chartText(locale: string, key: keyof typeof CHART_LABELS): string {
  return pick(locale as Parameters<typeof pick>[0], CHART_LABELS[key]);
}
