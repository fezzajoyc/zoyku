"use client";

import { useEffect, useRef, useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import type { Locale } from "@/lib/site";
import {
  EX_TO_PX,
  MAX_TEX_LEN,
  exMetrics,
  finalizeSvg,
  parseSvgBox,
  pngPixelSize,
  validateTex,
  type LatexErrorCode,
} from "../_lib/latex-svg";

/**
 * CN-037:LaTeX → SVG/PNG 引擎。
 *
 * MathJax 4 从 /vendor/mathjax/tex-svg.js 按需加载(1.8MB,只在首次渲染时拉,不进主包)。
 * 渲染是同步的 MathJax.tex2svg(),无需 await;加载器自己做就绪等待。
 *
 * 诚实边界:
 * - MathJax 对未闭合花括号不抛异常(产出错误标记小节点),对未知命令会把命令当字面文本,
 *   所以本地预检(括号平衡/空/超长)是必要的第一道闸,不能靠库报错。
 * - PNG 由 SVG 经 canvas 栅格化;MathJax 的 <use>/<defs> 在同文档内可解析,
 *   但页面里必须先用 DOMParser 包一层 —— 直接 drawImage 未序列化片段会丢字形。
 * - 不提供 LaTeX 编译(不需要 TeX 发行版)、不提供 PDF、不做批量。
 */

const L = {
  tex: { en: "LaTeX expression", zh: "LaTeX 表达式", ja: "LaTeX 式", es: "Expresión LaTeX", pt: "Expressão LaTeX" },
  options: { en: "Export options", zh: "导出选项", ja: "書き出し設定", es: "Opciones de exportación", pt: "Opções de exportação" },
  padding: { en: "Padding", zh: "内边距", ja: "余白", es: "Relleno", pt: "Preenchimento" },
  background: { en: "Background", zh: "背景", ja: "背景", es: "Fondo", pt: "Fundo" },
  scale: { en: "PNG scale", zh: "PNG 缩放", ja: "PNG 倍率", es: "Escala PNG", pt: "Escala PNG" },
  preview: { en: "Preview", zh: "预览", ja: "プレビュー", es: "Vista previa", pt: "Prévia" },
  source: { en: "SVG source", zh: "SVG 源码", ja: "SVG ソース", es: "Código SVG", pt: "Código SVG" },
  downloadSvg: { en: "Download .svg", zh: "下载 .svg", ja: ".svg をダウンロード", es: "Descargar .svg", pt: "Baixar .svg" },
  downloadPng: { en: "Download .png", zh: "下载 .png", ja: ".png をダウンロード", es: "Descargar .png", pt: "Baixar .png" },
  clear: { en: "Clear", zh: "清空", ja: "クリア", es: "Limpiar", pt: "Limpar" },
  sizing: {
    en: "{w} × {h} px at {s}× {clamp}",
    zh: "{w} × {h} px(缩放 {s}×){clamp}",
    ja: "{w} × {h} px({s}× 倍){clamp}",
    es: "{w} × {h} px a {s}×{clamp}",
    pt: "{w} × {h} px em {s}×{clamp}",
  },
  clampNote: {
    en: " — capped at {max}px per side",
    zh: " — 单边上限 {max}px",
    ja: " — 片側上限 {max}px",
    es: " — limitado a {max}px por lado",
    pt: " — limitado a {max}px por lado",
  },
  loading: { en: "Loading the math engine (first time only)…", zh: "正在加载数学引擎(仅首次)…", ja: "数式エンジンを読み込み中(初回のみ)…", es: "Cargando el motor matemático (solo la primera vez)…", pt: "Carregando o motor matemático (só na primeira vez)…" },
  errEmpty: { en: "Enter a LaTeX expression first.", zh: "请先输入 LaTeX 表达式。", ja: "まず LaTeX 式を入力してください。", es: "Introduce primero una expresión LaTeX.", pt: "Digite primeiro uma expressão LaTeX." },
  errUnbalanced: { en: "Unbalanced braces or brackets — fix the delimiters and try again.", zh: "花括号或方括号不平衡——请修正分隔符后重试。", ja: "波括弧または角括弧が対応していません — 区切りを修正してください。", es: "Llaves o corchetes sin balancear: corrige los delimitadores e inténtalo de nuevo.", pt: "Chaves ou colchetes desbalanceados — corrija os delimitadores e tente novamente." },
  errTooLong: { en: "The expression is too long ({n} characters; the limit is 4000).", zh: "表达式过长(当前 {n} 字符,上限 4000)。", ja: "式が長すぎます({n} 文字、上限 4000)。", es: "La expresión es demasiado larga ({n} caracteres; el límite es 4000).", pt: "A expressão é longa demais ({n} caracteres; o limite é 4000)." },
  errNoSvg: { en: "The renderer produced no SVG — check the expression syntax.", zh: "渲染器没有产出 SVG——请检查表达式语法。", ja: "レンダラーが SVG を生成しませんでした — 式の構文を確認してください。", es: "El renderizador no produjo SVG: revisa la sintaxis.", pt: "O renderizador não produziu SVG — verifique a sintaxe." },
  errLoad: { en: "The math engine could not be loaded. Check your connection and retry.", zh: "数学引擎加载失败。请检查网络后重试。", ja: "数式エンジンを読み込めませんでした。接続を確認して再試行してください。", es: "No se pudo cargar el motor matemático. Revisa la conexión y reintenta.", pt: "Não foi possível carregar o motor matemático. Verifique a conexão e tente novamente." },
  samples: { en: "Examples", zh: "示例", ja: "例", es: "Ejemplos", pt: "Exemplos" },
  note: {
    en: "Rendering is done by MathJax 4 in your browser — no TeX distribution, no server. The SVG you download contains real vector glyph paths plus a <defs>/<use> glyph cache, so it scales without blur and opens in Illustrator or Inkscape. The PNG is rasterized at your chosen scale up to 4000 px per side. MathJax tolerates malformed input instead of failing, so this tool pre-checks brace balance and rejects obviously broken expressions rather than exporting a silently wrong formula.",
    zh: "渲染由浏览器内的 MathJax 4 完成——不需要 TeX 发行版,不需要服务器。下载的 SVG 含真实的矢量字形路径与 <defs>/<use> 字形缓存,可无损缩放,能直接在 Illustrator 或 Inkscape 打开。PNG 按你选的倍数栅格化,单边上限 4000 像素。MathJax 对畸形输入是容错而非报错,所以本工具预检花括号平衡,拒绝明显损坏的表达式,而不是导出一个悄悄错误的公式。",
    ja: "レンダリングはブラウザ内の MathJax 4 が行います — TeX ディストリビューション不要、サーバー不要。ダウンロードした SVG は実際のベクター字形パスと <defs>/<use> 字形キャッシュを含み、ぼやけずに拡大できます。Illustrator や Inkscape で直接開けます。PNG は選んだ倍率でラスタライズされ、片側 4000 ピクセルが上限です。MathJax は不正な入力を許容して失敗しないため、本ツールは波括弧の対応を事前に検査し、明らかに壊れた式を拒否します。静かに間違った数式を書き出す代わりに。",
    es: "La renderización la hace MathJax 4 en tu navegador — sin distribución TeX, sin servidor. El SVG que descargas contiene rutas de glifos vectoriales reales más una caché <defs>/<use>, así que escala sin difuminarse y se abre en Illustrator o Inkscape. El PNG se rasteriza a la escala elegida hasta 4000 px por lado. MathJax tolera entradas malformadas en vez de fallar, así que esta herramienta precomprueba el balance de llaves y rechaza expresiones obviamente rotas en lugar de exportar una fórmula silenciosamente incorrecta.",
    pt: "A renderização é feita pelo MathJax 4 no seu navegador — sem distribuição TeX, sem servidor. O SVG baixado contém caminhos de glifos vetoriais reais mais um cache <defs>/<use>, então escala sem desfoque e abre no Illustrator ou Inkscape. O PNG é rasterizado na escala escolhida até 4000 px por lado. O MathJax tolera entrada malformada em vez de falhar, então esta ferramenta pré-verifica o equilíbrio de chaves e rejeita expressões obviamente quebradas em vez de exportar uma fórmula silenciosamente errada.",
  },
} as const;

const SAMPLES = [
  "E = mc^2",
  "\\int_0^\\infty e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}",
  "\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}",
  "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}",
  "\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}",
];

const PAD_OPTIONS = [0, 4, 8, 16];
const SCALE_OPTIONS = [1, 2, 3, 4];

type MathJaxLike = {
  /** MathJax 实际返回元素节点;用 Element 类型以便取 outerHTML */
  tex2svg: (tex: string, opts?: { display?: boolean }) => Element;
  startup: { promise: Promise<void> };
};

declare global {
  interface Window {
    MathJax?: MathJaxLike;
  }
}

/** 加载 MathJax 4(单次;失败时清缓存让重试成为真重试)。 */
let mjPromise: Promise<MathJaxLike> | null = null;
function loadMathJax(): Promise<MathJaxLike> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.MathJax?.tex2svg) return Promise.resolve(window.MathJax);
  if (mjPromise) return mjPromise;

  mjPromise = new Promise<MathJaxLike>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/vendor/mathjax/tex-svg.js";
    script.async = true;
    const cleanup = () => {
      script.onload = null;
      script.onerror = null;
    };
    script.onload = () => {
      cleanup();
      const mj = window.MathJax;
      if (!mj) {
        mjPromise = null;
        script.remove();
        reject(new Error("MathJax missing after load"));
        return;
      }
      // 注意:不能用 MathJax.startup.promise —— 因为脚本是在页面 load 之后注入的,
      // "页面就绪"事件已错过,该 promise 可能永远不 resolve(实测挂起 5 秒以上)。
      // 正确做法:探测式同步检查 —— 先试一次极小公式,成功即视为就绪。
      const probe = () => {
        try {
          const n = mj.tex2svg("x", { display: false });
          return Boolean(n && (n as Element).outerHTML);
        } catch {
          return false;
        }
      };
      if (probe()) {
        resolve(mj);
        return;
      }
      let tries = 0;
      const timer = setInterval(() => {
        tries += 1;
        if (probe()) {
          clearInterval(timer);
          resolve(mj);
        } else if (tries >= 40) {
          clearInterval(timer);
          mjPromise = null;
          script.remove();
          reject(new Error("MathJax did not become ready"));
        }
      }, 50);
    };
    script.onerror = () => {
      cleanup();
      mjPromise = null; // 关键:失败清缓存,让用户的下一次点击是真正的重试
      script.remove();
      reject(new Error("MathJax script failed"));
    };
    document.head.appendChild(script);
  });
  return mjPromise;
}

function errMsg(code: LatexErrorCode, locale: Locale, detail?: string): string {
  switch (code) {
    case "empty":
      return pick(locale, L.errEmpty);
    case "unbalanced":
      return detail ? `${pick(locale, L.errUnbalanced)} (${detail})` : pick(locale, L.errUnbalanced);
    case "tooLong":
      return pick(locale, L.errTooLong).replace("{n}", detail ?? "");
    default:
      return pick(locale, L.errNoSvg);
  }
}

export function DevEngineLatex() {
  const { locale } = useI18n();
  const [tex, setTex] = useState("\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}");
  const [padding, setPadding] = useState(8);
  const [background, setBackground] = useState("#ffffff");
  const [scale, setScale] = useState(2);
  const [svg, setSvg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const lastRender = useRef(0);

  const render = async (text: string) => {
    setErr(null);
    setPreviewError(false);
    const v = validateTex(text);
    if (!v.ok) {
      setSvg(null);
      setErr(errMsg(v.code, locale, v.message ?? (v.code === "tooLong" ? String(text.length) : undefined)));
      return;
    }
    setLoading(true);
    try {
      const mj = await loadMathJax();
      // MathJax 的 tex2svg 是同步的:先产出容器节点,再由我们提取成独立 svg
      const seq = ++lastRender.current;
      const node = mj.tex2svg(v.data, { display: true });
      const html = node.outerHTML;
      const fin = finalizeSvg(html, { padding, background });
      if (seq !== lastRender.current) return; // 竞态守卫:快速连点时丢弃旧结果
      if (!fin.ok) {
        setSvg(null);
        setErr(errMsg(fin.code, locale, fin.message));
      } else {
        setSvg(fin.data);
      }
    } catch {
      setSvg(null);
      setErr(pick(locale, L.errLoad));
    } finally {
      setLoading(false);
    }
  };

  // 首次进入自动渲染一次示例
  useEffect(() => {
    void render(tex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 选项变化后重渲染(已有结果时)
  useEffect(() => {
    if (svg) void render(tex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [padding, background]);

  const download = (kind: "svg" | "png") => {
    if (!svg) return;
    if (kind === "svg") {
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      triggerDownload(blob, "latex.svg");
      return;
    }
    const box = parseSvgBox(svg);
    if (!box) return;
    const exSize = exMetrics(svg, box);
    const px = pngPixelSize(exSize, scale);
    const img = new Image();
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = px.width;
      canvas.height = px.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, px.width, px.height);
        canvas.toBlob((blob) => {
          if (blob) triggerDownload(blob, "latex.png");
        }, "image/png");
      }
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setPreviewError(true);
    };
    img.src = url;
  };

  const box = svg ? parseSvgBox(svg) : null;
  const ex = box && svg ? exMetrics(svg, box) : null;
  const px = ex ? pngPixelSize(ex, scale) : null;

  return (
    <ToolPanel>
      <div className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.tex)}</span>
          <textarea
            className="field mono"
            rows={5}
            value={tex}
            onChange={(e) => setTex(e.target.value)}
            placeholder="\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}"
            spellCheck={false}
            aria-label={pick(locale, L.tex)}
          />
          <p className="mt-1 text-[12px] leading-4 text-[var(--color-sub)]">
            {tex.length} / {MAX_TEX_LEN}
          </p>
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.samples)}</span>
          {SAMPLES.slice(0, 4).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setTex(s);
                void render(s);
              }}
              className="mono max-w-full truncate rounded-full border hairline px-3 py-1 text-[12px] transition-colors hover:bg-[var(--color-surface)]"
            >
              {s.length > 22 ? s.slice(0, 21) + "…" : s}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => void render(tex)}
            disabled={loading || !tex.trim()}
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
          >
            {loading ? "…" : "Render"}
          </button>
          <button
            type="button"
            onClick={() => {
              setTex("");
              setSvg(null);
              setErr(null);
            }}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {pick(locale, L.clear)}
          </button>
        </div>

        {loading && <p className="text-[13px] text-[var(--color-sub)]">{pick(locale, L.loading)}</p>}

        {err && (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {err}
          </p>
        )}

        {svg && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.preview)}</p>
              {/* SVG 由 MathJax 产出:字形是 path,文本已由库内转义 */}
              <div
                className="overflow-x-auto rounded-xl border hairline bg-[var(--color-surface)] p-3"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <fieldset>
                <legend className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.padding)}</legend>
                <div className="flex flex-wrap gap-1.5">
                  {PAD_OPTIONS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      aria-pressed={padding === p}
                      onClick={() => setPadding(p)}
                      className={`mono rounded-full border px-2.5 py-1 text-[12.5px] font-medium transition-colors ${
                        padding === p
                          ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                          : "hairline hover:bg-[var(--color-surface)]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.background)}</legend>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { v: "white", label: "White", value: "#ffffff" },
                    { v: "transparent", label: "Transparent", value: "" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      aria-pressed={o.value === "" ? background === "" : background !== ""}
                      onClick={() => setBackground(o.value)}
                      className={`rounded-full border px-2.5 py-1 text-[12.5px] font-medium transition-colors ${
                        (background === o.v) || (o.v === "#00000000" && background === "")
                          ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                          : "hairline hover:bg-[var(--color-surface)]"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.scale)}</legend>
                <div className="flex flex-wrap gap-1.5">
                  {SCALE_OPTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={scale === s}
                      onClick={() => setScale(s)}
                      className={`mono rounded-full border px-2.5 py-1 text-[12.5px] font-medium transition-colors ${
                        scale === s
                          ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                          : "hairline hover:bg-[var(--color-surface)]"
                      }`}
                    >
                      {s}×
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            {px && (
              <p className="text-[12.5px] leading-5 text-[var(--color-sub)]">
                {ex ? `${(ex.widthEx * EX_TO_PX / 16).toFixed(2)}em × ${(ex.heightEx * EX_TO_PX / 16).toFixed(2)}em · ` : ""}
                {pick(locale, L.sizing)
                  .replace("{w}", String(px.width))
                  .replace("{h}", String(px.height))
                  .replace("{s}", String(scale))
                  .replace("{clamp}", px.clamped ? pick(locale, L.clampNote).replace("{max}", "4000") : "")}
              </p>
            )}

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => download("svg")}
                className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity"
              >
                {pick(locale, L.downloadSvg)}
              </button>
              <button
                type="button"
                onClick={() => download("png")}
                className="rounded-full border hairline px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-[var(--color-surface)]"
              >
                {pick(locale, L.downloadPng)}
              </button>
              <CopyButton value={svg} />
              <button
                type="button"
                onClick={() => setShowSource((v) => !v)}
                aria-expanded={showSource}
                className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
              >
                {pick(locale, L.source)}
              </button>
            </div>

            {previewError && (
              <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
                {pick(locale, L.errNoSvg)}
              </p>
            )}

            {showSource && (
              <textarea
                className="field mono bg-[var(--color-surface)]"
                rows={12}
                value={svg}
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

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
