"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, Note, Tabs, pick } from "./calc-ui";
import { gradientCss, rotateHue, type GradientKind, type RadialShape } from "../_lib/gradient";

/**
 * CSS 渐变生成器:色标管理与 UI 编排;字符串数学全在 tools/_lib/gradient.ts(纯,已测)。
 * 位置留空 = 按色标顺序自动插值(CSS 规则)。输出带回退色、-webkit 前缀行与标准行。
 */

type StopDraft = { color: string; position: number | null };

const DEFAULT_STOPS: StopDraft[] = [
  { color: "#7C3AED", position: null },
  { color: "#EC4899", position: null },
];

const PRESET_PALETTES = [
  { key: "pSunset", colors: ["#F97316", "#DB2777", "#7C3AED"] },
  { key: "pOcean", colors: ["#0EA5E9", "#2563EB", "#1E3A8A"] },
  { key: "pForest", colors: ["#84CC16", "#059669", "#065F46"] },
  { key: "pCandy", colors: ["#F472B6", "#FBCFE8", "#A5F3FC", "#818CF8"] },
  { key: "pMono", colors: ["#111827", "#4B5563", "#9CA3AF", "#F3F4F6"] },
] as const;

const HARMONIZE_STEPS = [30, 45, 60, 90, 120, 150, 180];

const L: Record<string, Record<string, string>> = {
  stops: { en: "Color stops", zh: "色标", ja: "カラーストップ", es: "Paradas de color", pt: "Paradas de cor" },
  position: { en: "Position %", zh: "位置 %", ja: "位置 %", es: "Posición %", pt: "Posição %" },
  positionAuto: { en: "auto", zh: "自动", ja: "自動", es: "auto", pt: "auto" },
  kind: { en: "Gradient type", zh: "渐变类型", ja: "グラデーション種別", es: "Tipo de degradado", pt: "Tipo de gradiente" },
  linear: { en: "Linear", zh: "线性", ja: "線形", es: "Lineal", pt: "Linear" },
  radial: { en: "Radial", zh: "径向", ja: "円形", es: "Radial", pt: "Radial" },
  conic: { en: "Conic", zh: "锥形", ja: "円錐", es: "Cónico", pt: "Cônico" },
  angle: { en: "Angle", zh: "角度", ja: "角度", es: "Ángulo", pt: "Ângulo" },
  fromAngle: { en: "From angle", zh: "起始角度", ja: "開始角度", es: "Ángulo inicial", pt: "Ângulo inicial" },
  shape: { en: "Shape", zh: "形状", ja: "形状", es: "Forma", pt: "Forma" },
  circle: { en: "Circle", zh: "圆形", ja: "サークル", es: "Círculo", pt: "Círculo" },
  ellipse: { en: "Ellipse", zh: "椭圆", ja: "楕円", es: "Elipse", pt: "Elipse" },
  preview: { en: "Live preview", zh: "实时预览", ja: "ライブプレビュー", es: "Vista previa", pt: "Pré-visualização" },
  css: { en: "CSS", zh: "CSS 代码", ja: "CSS", es: "CSS", pt: "CSS" },
  addStop: { en: "Add color", zh: "添加颜色", ja: "色を追加", es: "Añadir color", pt: "Adicionar cor" },
  remove: { en: "Remove", zh: "移除", ja: "削除", es: "Quitar", pt: "Remover" },
  presets: { en: "Palettes", zh: "预设配色", ja: "パレット", es: "Paletas", pt: "Paletas" },
  harmonize: { en: "Random harmonize", zh: "随机和谐", ja: "ランダム調和", es: "Armonizar al azar", pt: "Harmonizar" },
  invalid: {
    en: "Add at least two colors (and keep every position a number between 0 and 100).",
    zh: "至少需要两个颜色(位置需为 0–100 的数字)。",
    ja: "色は 2 つ以上必要です(位置は 0〜100 の数値)。",
    es: "Añade al menos dos colores (y usa posiciones numéricas entre 0 y 100).",
    pt: "Adicione pelo menos duas cores (e use posições numéricas entre 0 e 100).",
  },
  maxStops: {
    en: "Five stops is the maximum.",
    zh: "最多支持 5 个色标。",
    ja: "ストップは最大 5 つです。",
    es: "El máximo son cinco paradas.",
    pt: "O máximo são cinco paradas.",
  },
  pSunset: { en: "Sunset", zh: "日落", ja: "夕焼け", es: "Atardecer", pt: "Pôr do sol" },
  pOcean: { en: "Ocean", zh: "海洋", ja: "海", es: "Océano", pt: "Oceano" },
  pForest: { en: "Forest", zh: "森林", ja: "森", es: "Bosque", pt: "Floresta" },
  pCandy: { en: "Candy", zh: "糖果", ja: "キャンディ", es: "Caramelo", pt: "Guloseima" },
  pMono: { en: "Monochrome", zh: "单色灰阶", ja: "モノクロ", es: "Monocromo", pt: "Monocromático" },
  hintLinear: {
    en: "0° points up and 90° to the right — the angle runs clockwise.",
    zh: "0° 朝上、90° 朝右,角度顺时针递增。",
    ja: "0° は上向き、90° は右向き。角度は時計回りに進みます。",
    es: "0° apunta hacia arriba y 90° hacia la derecha; el ángulo avanza en sentido horario.",
    pt: "0° aponta para cima e 90° para a direita — o ângulo avança no sentido horário.",
  },
  hintConic: {
    en: "A conic gradient sweeps around a center point, starting at the “from” angle.",
    zh: "锥形渐变围绕中心点旋转扫过,从“起始角度”开始。",
    ja: "円錐グラデーションは中心点の周りを、「開始角度」から一周します。",
    es: "Un degradado cónico barre alrededor de un punto central, empezando en el ángulo inicial.",
    pt: "Um gradiente cônico varre em torno de um ponto central, começando no ângulo inicial.",
  },
  hintRadial: {
    en: "A radial gradient radiates outward from the center of the box.",
    zh: "径向渐变从盒子中心向外扩散。",
    ja: "円形グラデーションはボックスの中心から外側へ広がります。",
    es: "Un degradado radial se irradia desde el centro de la caja.",
    pt: "Um gradiente radial se irradia do centro da caixa para fora.",
  },
};

/** 色标草稿 → 纯函数输入(位置 null → undefined = 自动) */
function toStops(drafts: StopDraft[]) {
  return drafts.map((d) => ({
    color: d.color,
    position: d.position === null ? undefined : d.position,
  }));
}

function cssBlock(gradient: string, fallback: string): string {
  return [
    `background-color: ${fallback}; /* fallback for old browsers */`,
    `background-image: -webkit-${gradient};`,
    `background-image: ${gradient};`,
  ].join("\n");
}

export function CalcEngineGradient() {
  const { locale, t } = useI18n();
  const [stops, setStops] = useState<StopDraft[]>(DEFAULT_STOPS);
  const [kind, setKind] = useState<GradientKind>("linear");
  const [angle, setAngle] = useState(135);
  const [shape, setShape] = useState<RadialShape>("circle");
  const [notice, setNotice] = useState("");

  const gradient = useMemo(() => {
    const valid = stops.length >= 2 && stops.every((s) => s.color.trim() !== "");
    if (!valid) return null;
    return gradientCss(toStops(stops), kind, kind === "radial" ? 0 : angle, shape);
  }, [stops, kind, angle, shape]);

  const fallback = stops[0]?.color.trim() || "#333333";
  const block = gradient ? cssBlock(gradient, fallback) : "";

  const setStop = (i: number, patch: Partial<StopDraft>) => {
    setStops((prev) => prev.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  };

  const addStop = () => {
    setNotice("");
    if (stops.length >= 5) {
      setNotice(pick(locale, L.maxStops));
      return;
    }
    setStops((prev) => [...prev, { color: "#94A3B8", position: null }]);
  };

  const removeStop = (i: number) => {
    setNotice("");
    setStops((prev) => (prev.length <= 2 ? prev : prev.filter((_, j) => j !== i)));
  };

  const harmonize = () => {
    setNotice("");
    const deg = HARMONIZE_STEPS[Math.floor(Math.random() * HARMONIZE_STEPS.length)] * (Math.random() < 0.5 ? -1 : 1);
    setStops((prev) => {
      const rotated = rotateHue(prev.map((s) => s.color), deg);
      return prev.map((s, i) => ({ ...s, color: rotated[i] }));
    });
  };

  const angleLabel = kind === "conic" ? pick(locale, L.fromAngle) : pick(locale, L.angle);

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.stops)}</p>
          <div className="space-y-2">
            {stops.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="color"
                  value={/^#[0-9a-f]{6}$/i.test(s.color.trim()) ? s.color.trim().toLowerCase() : "#94a3b8"}
                  onChange={(e) => setStop(i, { color: e.target.value })}
                  className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border hairline bg-[var(--color-card)]"
                  aria-label={`${pick(locale, L.stops)} ${i + 1}`}
                />
                <input
                  type="text"
                  className="field mono w-28 shrink-0"
                  value={s.color}
                  onChange={(e) => setStop(i, { color: e.target.value })}
                  placeholder="#7C3AED"
                  spellCheck={false}
                  aria-label={`${pick(locale, L.stops)} ${i + 1} hex`}
                />
                <label className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="hidden text-[12.5px] text-[var(--color-sub)] sm:inline">
                    {pick(locale, L.position)}
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={100}
                    className="field bare mono w-20"
                    value={s.position === null ? "" : s.position}
                    onChange={(e) => {
                      const v = e.target.value === "" ? null : Number(e.target.value);
                      setStop(i, { position: v === null || Number.isFinite(v) ? v : s.position });
                    }}
                    placeholder={pick(locale, L.positionAuto)}
                    aria-label={`${pick(locale, L.position)} ${i + 1}`}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeStop(i)}
                  disabled={stops.length <= 2}
                  aria-label={pick(locale, L.remove)}
                  className="h-7 w-7 flex-none rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)] disabled:opacity-30"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={addStop}
              disabled={stops.length >= 5}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)] disabled:opacity-40"
            >
              + {pick(locale, L.addStop)}
            </button>
            <button
              type="button"
              onClick={harmonize}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-accent-strong)] transition-colors hover:bg-[rgba(0,113,227,0.06)]"
            >
              ⟳ {pick(locale, L.harmonize)}
            </button>
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.presets)}</p>
          <div className="flex flex-wrap gap-2">
            {PRESET_PALETTES.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => {
                  setNotice("");
                  setStops(p.colors.map((c) => ({ color: c, position: null })));
                }}
                aria-label={pick(locale, L[p.key])}
                className="flex items-center gap-2 rounded-full border hairline py-1 pl-1.5 pr-3.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
              >
                <span className="flex" aria-hidden>
                  {p.colors.map((c, i) => (
                    <span
                      key={`${c}-${i}`}
                      className="inline-block h-4 w-4 rounded-full border hairline"
                      style={{ background: c, marginLeft: i > 0 ? -6 : 0 }}
                    />
                  ))}
                </span>
                {pick(locale, L[p.key])}
              </button>
            ))}
          </div>
        </div>

        <Tabs
          options={[
            { id: "linear", label: pick(locale, L.linear) },
            { id: "radial", label: pick(locale, L.radial) },
            { id: "conic", label: pick(locale, L.conic) },
          ]}
          value={kind}
          onChange={(id) => setKind(id as GradientKind)}
        />

        {kind === "radial" ? (
          <Field label={pick(locale, L.shape)}>
            <select
              className="field sm:w-56"
              value={shape}
              onChange={(e) => setShape(e.target.value as RadialShape)}
              aria-label={pick(locale, L.shape)}
            >
              <option value="circle">{pick(locale, L.circle)}</option>
              <option value="ellipse">{pick(locale, L.ellipse)}</option>
            </select>
          </Field>
        ) : (
          <Field label={`${angleLabel}: ${angle}°`}>
            <input
              type="range"
              min={0}
              max={359}
              value={angle}
              onChange={(e) => setAngle(+e.target.value)}
              className="w-full"
              aria-label={angleLabel}
            />
          </Field>
        )}

        {notice && (
          <p className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] text-[var(--color-bad)]" role="alert">
            {notice}
          </p>
        )}

        <Field label={pick(locale, L.preview)}>
          <div
            className="h-44 w-full rounded-xl border hairline"
            style={gradient ? { backgroundImage: gradient } : undefined}
            role="img"
            aria-label={gradient ?? pick(locale, L.invalid)}
          />
        </Field>

        {gradient ? (
          <Field label={pick(locale, L.css)}>
            <pre className="overflow-x-auto rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[13px] leading-5">{block}</pre>
            <div className="mt-2 flex flex-wrap gap-2.5">
              <CopyButton value={block} label={t.common.copy} />
            </div>
          </Field>
        ) : (
          <p className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] text-[var(--color-bad)]" role="alert">
            {pick(locale, L.invalid)}
          </p>
        )}

        <Note>
          {kind === "linear"
            ? pick(locale, L.hintLinear)
            : kind === "conic"
              ? pick(locale, L.hintConic)
              : pick(locale, L.hintRadial)}
        </Note>
      </div>
    </ToolPanel>
  );
}
