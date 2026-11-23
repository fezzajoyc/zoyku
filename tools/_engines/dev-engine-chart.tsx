"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import type { Locale } from "@/lib/site";
import {
  CHART_TYPES,
  chartFromText,
  fmtChartNumber,
  type ChartErrorCode,
  type ChartType,
  type HeaderMode,
} from "../_lib/chart-svg";

/**
 * CN-036:图表生成引擎。文本数据(CSV/Tab/分号)→ 7 种 SVG 图表 → 预览 + 源码 + 下载。
 * 零依赖:SVG 由 _lib/chart-svg.ts 手写生成,不进任何图表库。
 */

const L = {
  dataIn: {
    en: "Data (first column = label, following columns = values)",
    zh: "数据(第一列 = 标签,后续列 = 数值)",
    ja: "データ(1 列目 = ラベル、以降 = 数値)",
    es: "Datos (primera columna = etiqueta, siguientes = valores)",
    pt: "Dados (primeira coluna = rótulo, seguintes = valores)",
  },
  chartType: { en: "Chart type", zh: "图表类型", ja: "グラフの種類", es: "Tipo de gráfico", pt: "Tipo de gráfico" },
  header: { en: "First row is a header", zh: "首行是表头", ja: "先頭行は見出し", es: "La primera fila es cabecera", pt: "A primeira linha é cabeçalho" },
  headerAuto: { en: "Auto", zh: "自动", ja: "自動", es: "Auto", pt: "Auto" },
  headerYes: { en: "Yes", zh: "是", ja: "はい", es: "Sí", pt: "Sim" },
  headerNo: { en: "No", zh: "否", ja: "いいえ", es: "No", pt: "Não" },
  yLabel: { en: "Y axis label (optional)", zh: "纵轴说明(可选)", ja: "縦軸ラベル(任意)", es: "Etiqueta eje Y (opcional)", pt: "Rótulo eixo Y (opcional)" },
  preview: { en: "Preview", zh: "预览", ja: "プレビュー", es: "Vista previa", pt: "Prévia" },
  source: { en: "SVG source", zh: "SVG 源码", ja: "SVG ソース", es: "Código SVG", pt: "Código SVG" },
  download: { en: "Download .svg", zh: "下载 .svg", ja: ".svg をダウンロード", es: "Descargar .svg", pt: "Baixar .svg" },
  copySvg: { en: "Copy SVG", zh: "复制 SVG", ja: "SVG をコピー", es: "Copiar SVG", pt: "Copiar SVG" },
  clear: { en: "Clear", zh: "清空", ja: "クリア", es: "Limpiar", pt: "Limpar" },
  sample: { en: "Load sample", zh: "载入示例", ja: "サンプルを読み込む", es: "Cargar ejemplo", pt: "Carregar exemplo" },
  warnings: { en: "Notes", zh: "提示", ja: "注意", es: "Notas", pt: "Notas" },
  summary: {
    en: "{r} rows · {s} series · {t}",
    zh: "{r} 行 · {s} 个系列 · {t}",
    ja: "{r} 行 · {s} 系列 · {t}",
    es: "{r} filas · {s} series · {t}",
    pt: "{r} linhas · {s} séries · {t}",
  },
  autoNote: {
    en: "Auto treats the first row as a header only when its value cells are all non-numeric — numeric series names like 2025 need Yes.",
    zh: "自动模式仅在首行数值列全部非数字时才当作表头——像 2025 这样的数字系列名请选「是」。",
    ja: "自動は先頭行の数値セルがすべて非数値のときだけ見出しとみなします — 2025 のような数字の系列名は「はい」を選んでください。",
    es: "Auto solo trata la primera fila como cabecera cuando sus celdas de valor no son numéricas; nombres de serie numéricos como 2025 requieren Sí.",
    pt: "Auto só trata a primeira linha como cabeçalho quando as células de valor não são numéricas — nomes de série numéricos como 2025 exigem Sim.",
  },
  errEmpty: {
    en: "Paste data first — one row per line, comma or tab separated.",
    zh: "请先粘贴数据——每行一条,逗号或制表符分隔。",
    ja: "まずデータを貼り付けてください — 1 行 1 件、カンマまたはタブ区切り。",
    es: "Pega primero los datos: una fila por línea, separadas por coma o tabulador.",
    pt: "Cole primeiro os dados — uma linha por linha, separados por vírgula ou tabulação.",
  },
  errNoRows: {
    en: "No data rows found — the input looks like a header or comments only.",
    zh: "找不到数据行——输入看起来只有表头或注释。",
    ja: "データ行が見つかりません — 見出しやコメントだけのようです。",
    es: "No se encontraron filas de datos: la entrada parece ser solo cabecera o comentarios.",
    pt: "Nenhuma linha de dados encontrada — a entrada parece ser só cabeçalho ou comentários.",
  },
  errRagged: {
    en: "Rows have different column counts — every row must have the same number of columns.",
    zh: "各行列数不一致——每行的列数必须相同。",
    ja: "行ごとに列数が違います — すべての行を同じ列数にしてください。",
    es: "Las filas tienen distinta cantidad de columnas; todas deben coincidir.",
    pt: "As linhas têm contagens de colunas diferentes — todas devem ter o mesmo número.",
  },
  errBadNumber: {
    en: "A value cell is not a number. Numbers may carry a currency prefix, a trailing %, and _ or space thousands separators.",
    zh: "有数值单元格不是数字。数值可以带货币前缀、尾部 %、以及 _ 或空格千分位。",
    ja: "数値セルに数値でないものがあります。通貨記号の接頭、末尾の %、_ や空白の桁区切りは使えます。",
    es: "Una celda de valor no es numérica. Se admiten prefijo de moneda, % final y separadores de miles con _ o espacio.",
    pt: "Uma célula de valor não é numérica. Aceita-se prefixo de moeda, % no fim e separador de milhar com _ ou espaço.",
  },
  errNotEnough: {
    en: "Not enough points — pie, donut and funnel need at least 2 rows; radar needs at least 3.",
    zh: "数据点不足——饼图/环图/漏斗至少要 2 行;雷达图至少要 3 个维度。",
    ja: "データ点が不足しています — 円・ドーナツ・ファネルは最低 2 行、レーダーは最低 3 次元。",
    es: "Puntos insuficientes: circular, anillo y embudo necesitan al menos 2 filas; radar al menos 3.",
    pt: "Pontos insuficientes — pizza, rosca e funil precisam de ao menos 2 linhas; radar, ao menos 3.",
  },
  errAllZero: {
    en: "All values are zero — ratio charts have nothing to divide.",
    zh: "全部数值为 0——比例型图表无从分割。",
    ja: "すべての値が 0 です — 比率グラフは分割できません。",
    es: "Todos los valores son cero: los gráficos de proporción no tienen nada que dividir.",
    pt: "Todos os valores são zero — gráficos de proporção não têm o que dividir.",
  },
  note: {
    en: "Seven chart types are drawn as plain SVG paths — no chart library, no canvas, no animation, no hover tooltips. Bar and area charts always start the Y axis at zero, so a flat-looking series is honest rather than flattering. Pie, donut and funnel use only the first value column and say so when other columns are dropped. Export is a real .svg file you can paste into slides, docs or a web page.",
    zh: "七种图表全部用朴素 SVG 路径绘制——不引入图表库、不用 canvas、没有动画、没有悬停提示。柱图与面积图的纵轴恒从 0 起,所以看起来「平」的序列是诚实的而不是被美化的。饼图、环图、漏斗只用第一列数值,丢弃其它列时会明确提示。导出是真正的 .svg 文件,可直接粘进幻灯片、文档或网页。",
    ja: "7 種類のグラフはすべて素の SVG パスで描画します — チャートライブラリなし、canvas なし、アニメーションなし、ホバー ツールチップなし。棒・面グラフの縦軸は常に 0 から始まるため、平らに見える系列は正直な結果です。円・ドーナツ・ファネルは最初の数値列のみを使い、他の列を捨てたときは明示します。書き出しは本物の .svg ファイルで、スライド・文書・Web ページにそのまま貼れます。",
    es: "Los siete tipos se dibujan como rutas SVG simples: sin biblioteca de gráficos, sin canvas, sin animación y sin tooltips. Las barras y áreas siempre arrancan el eje Y en cero, así que una serie plana es honesta y no embellecida. Circular, anillo y embudo usan solo la primera columna de valores y avisan cuando se descartan otras. La exportación es un .svg real que puedes pegar en diapositivas, documentos o una página web.",
    pt: "Os sete tipos são desenhados como caminhos SVG puros — sem biblioteca de gráficos, sem canvas, sem animação e sem tooltips. Barras e áreas sempre começam o eixo Y em zero, então uma série plana é honesta e não embelezada. Pizza, rosca e funil usam apenas a primeira coluna de valores e avisam quando descartam outras. A exportação é um .svg real que você cola em slides, documentos ou páginas web.",
  },
} as const;

const TYPE_LABEL: Record<ChartType, string> = {
  bar: "Bar",
  line: "Line",
  area: "Area",
  pie: "Pie",
  donut: "Donut",
  radar: "Radar",
  funnel: "Funnel",
};

const SAMPLE = `Quarter,Revenue,Cost
Q1,120,78
Q2,168,96
Q3,142,88
Q4,196,104`;

function errMsg(code: ChartErrorCode, locale: Locale, detail?: string): string {
  const base = (() => {
    switch (code) {
      case "empty":
        return pick(locale, L.errEmpty);
      case "noRows":
        return pick(locale, L.errNoRows);
      case "ragged":
        return pick(locale, L.errRagged);
      case "badNumber":
        return pick(locale, L.errBadNumber);
      case "notEnough":
        return pick(locale, L.errNotEnough);
      case "allZero":
        return pick(locale, L.errAllZero);
    }
  })();
  return detail ? `${base} (${detail})` : base;
}

export function DevEngineChart() {
  const { locale } = useI18n();
  const [input, setInput] = useState(SAMPLE);
  const [type, setType] = useState<ChartType>("bar");
  const [headerMode, setHeaderMode] = useState<HeaderMode>("auto");
  const [yLabel, setYLabel] = useState("");
  const [showSource, setShowSource] = useState(false);

  const result = useMemo(() => chartFromText(input, type, yLabel, headerMode), [input, type, yLabel, headerMode]);

  const download = () => {
    if (!result.ok) return;
    const blob = new Blob([result.svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zoyku-${type}-chart.svg`;
    a.click();
    // 下一帧再释放,避免 Safari 尚未读取就失效
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block">
            <span className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.dataIn)}</span>
            <textarea
              className="field mono"
              rows={8}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              aria-label={pick(locale, L.dataIn)}
            />
          </label>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setInput(SAMPLE)}
              className="rounded-full border hairline px-3 py-1 text-[12.5px] transition-colors hover:bg-[var(--color-surface)]"
            >
              {pick(locale, L.sample)}
            </button>
            <button
              type="button"
              onClick={() => setInput("")}
              className="rounded-full border hairline px-3 py-1 text-[12.5px] transition-colors hover:bg-[var(--color-surface)]"
            >
              {pick(locale, L.clear)}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.chartType)}</p>
          <div className="flex flex-wrap gap-2" role="group">
            {CHART_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={type === t}
                onClick={() => setType(t)}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  type === t
                    ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {TYPE_LABEL[t]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <fieldset className="block">
            <legend className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.header)}</legend>
            <div className="flex flex-wrap gap-2" role="group">
              {(
                [
                  { id: "auto", label: pick(locale, L.headerAuto) },
                  { id: "always", label: pick(locale, L.headerYes) },
                  { id: "never", label: pick(locale, L.headerNo) },
                ] as Array<{ id: HeaderMode; label: string }>
              ).map((o) => (
                <button
                  key={o.id}
                  type="button"
                  aria-pressed={headerMode === o.id}
                  onClick={() => setHeaderMode(o.id)}
                  className={`rounded-full border px-3 py-1 text-[12.5px] font-medium transition-colors ${
                    headerMode === o.id
                      ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                      : "hairline hover:bg-[var(--color-surface)]"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <p className="mt-1 text-[12px] leading-4 text-[var(--color-sub)]">
              {headerMode === "auto" ? pick(locale, L.autoNote) : ""}
            </p>
          </fieldset>
          <label className="block">
            <span className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.yLabel)}</span>
            <input
              className="field"
              value={yLabel}
              onChange={(e) => setYLabel(e.target.value)}
              placeholder="USD"
              aria-label={pick(locale, L.yLabel)}
            />
          </label>
        </div>

        {!result.ok ? (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {errMsg(result.code, locale, result.message)}
          </p>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.preview)}</p>
              {/* SVG 来自本工具的生成器:标签已做 XML 转义,不注入外来 HTML */}
              <div
                className="overflow-hidden rounded-xl border hairline bg-white"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: result.svg }}
              />
              <p className="text-[12.5px] leading-5 text-[var(--color-sub)]">
                {pick(locale, L.summary)
                  .replace("{r}", String(result.data.labels.length))
                  .replace("{s}", String(result.data.series.length))
                  .replace("{t}", TYPE_LABEL[type])}
                {" · "}
                {result.data.series
                  .map((s) => `${s.name}: ${s.values.map(fmtChartNumber).join(", ").slice(0, 60)}`)
                  .join(" | ")
                  .slice(0, 120)}
              </p>
            </div>

            {result.warnings.length > 0 && (
              <div className="rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5">
                <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.warnings)}</p>
                <ul className="mt-1 space-y-0.5">
                  {result.warnings.map((w) => (
                    <li key={w} className="text-[13px] leading-5">
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={download}
                className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity"
              >
                {pick(locale, L.download)}
              </button>
              <CopyButton value={result.svg} />
              <button
                type="button"
                onClick={() => setShowSource((v) => !v)}
                aria-expanded={showSource}
                className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
              >
                {pick(locale, L.source)}
              </button>
            </div>

            {showSource && (
              <textarea
                className="field mono bg-[var(--color-surface)]"
                rows={10}
                value={result.svg}
                readOnly
                spellCheck={false}
                aria-label={pick(locale, L.source)}
              />
            )}
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
