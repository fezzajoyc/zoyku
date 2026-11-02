"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Icon } from "@/components/icons";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { loc } from "./seo-locale";

/** 桌面/移动端的像素预算(近似 Google 实测截断点) */
const BUDGETS = {
  desktop: { title: 600, desc: 990 },
  mobile: { title: 680, desc: 680 },
} as const;

const FONT_TITLE = "20px Arial, Helvetica, sans-serif";
const FONT_DESC = "14px Arial, Helvetica, sans-serif";

let ctxCache: CanvasRenderingContext2D | null | undefined;
function measure(text: string, font: string): number {
  if (ctxCache === undefined) {
    ctxCache = typeof document === "undefined" ? null : document.createElement("canvas").getContext("2d");
  }
  const ctx = ctxCache;
  if (!ctx) return Array.from(text).length * (font === FONT_TITLE ? 9.5 : 6.6);
  ctx.font = font;
  return ctx.measureText(text).width;
}

function truncate(text: string, font: string, maxPx: number): { text: string; truncated: boolean } {
  if (measure(text, font) <= maxPx) return { text, truncated: false };
  const chars = Array.from(text);
  let lo = 0;
  let hi = chars.length - 1;
  let best = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (measure(chars.slice(0, mid).join("") + "…", font) <= maxPx) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return { text: chars.slice(0, best).join("").replace(/[\s,.;:!?\-–—]+$/, "") + "…", truncated: true };
}

function displayUrl(u: string): { domain: string; segs: string[] } {
  const s = u.trim();
  if (!s) return { domain: "example.com", segs: [] };
  try {
    const url = new URL(s.includes("://") ? s : `https://${s}`);
    return {
      domain: url.hostname.replace(/^www\./, ""),
      segs: url.pathname.split("/").filter(Boolean).map((seg) =>
        decodeURIComponent(seg).replace(/[-_]+/g, " ").toLowerCase(),
      ),
    };
  } catch {
    return { domain: s.replace(/^https?:\/\//, "").split("/")[0], segs: [] };
  }
}

const L = {
  title: loc("Title tag", "标题标签(title)", "タイトルタグ", "Etiqueta title", "Tag de título"),
  titlePh: loc("10 proven SEO habits that double organic traffic", "10 个经过验证的 SEO 习惯,让自然流量翻倍", "オーガニック流入を2倍にする実証済みSEO習慣10選", "10 hábitos de SEO probados que duplican el tráfico orgánico", "10 hábitos de SEO comprovados que dobram o tráfego orgânico"),
  desc: loc("Meta description", "meta 描述(description)", "メタディスクリプション", "Meta description", "Meta description"),
  descPh: loc("Learn the exact checklist we use on every page — keywords, structure, internal links and the metrics that actually move rankings.", "了解我们在每个页面上使用的清单——关键词、结构、内链,以及真正影响排名的指标。", "すべてのページで使っているチェックリストを解説します。キーワード、構造、内部リンク、そして本当に順位を動かす指標。", "Conoce la lista que usamos en cada página: palabras clave, estructura, enlaces internos y las métricas que mueven posiciones.", "Conheça a lista que usamos em cada página: palavras-chave, estrutura, links internos e as métricas que movem posições."),
  url: loc("Page URL", "页面 URL", "ページの URL", "URL de la página", "URL da página"),
  desktop: loc("Desktop", "桌面端", "デスクトップ", "Escritorio", "Desktop"),
  mobile: loc("Mobile", "移动端", "モバイル", "Móvil", "Celular"),
  chars: loc("chars", "字符", "文字", "caracteres", "caracteres"),
  titleGuide: loc("Aim for 50–60 characters ≈ 580 px", "建议 50–60 个字符 ≈ 580 像素", "目安は 50〜60 文字 ≈ 580px", "Apunta a 50–60 caracteres ≈ 580 px", "Mire 50–60 caracteres ≈ 580 px"),
  descGuide: loc("Aim for 120–160 characters", "建议 120–160 个字符", "目安は 120〜160 文字", "Apunta a 120–160 caracteres", "Mire 120–160 caracteres"),
  preview: loc("Google result preview", "Google 结果预览", "Google 検索結果のプレビュー", "Vista previa en Google", "Prévia no Google"),
  truncated: loc("Truncated in results", "在搜索结果中被截断", "検索結果で切り詰められます", "Se trunca en los resultados", "É truncado nos resultados"),
} as const;

function Meter({ chars, px, budget, guide, charsLabel }: {
  chars: number;
  px: number;
  budget: number;
  guide: string;
  charsLabel: string;
}) {
  const over = px > budget;
  const pct = Math.min(100, (px / budget) * 100);
  return (
    <div className="mt-1.5">
      <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface)]">
        <div
          className={`h-full rounded-full transition-all ${over ? "bg-[var(--color-bad)]" : "bg-[var(--color-good)]"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className={`mt-1 text-[12px] ${over ? "font-medium text-[var(--color-bad)]" : "text-[var(--color-sub)]"}`}>
        {chars} {charsLabel} · {Math.round(px)} / {budget} px · {guide}
      </p>
    </div>
  );
}

/** Google 搜索结果预览:canvas measureText 按像素截断,桌面/移动双档 */
export function SeoSerpEngine() {
  const { locale } = useI18n();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const budget = BUDGETS[device];
  const shownTitle = title || (L.titlePh[locale] ?? L.titlePh.en);
  const shownDesc = desc || (L.descPh[locale] ?? L.descPh.en);

  const fit = useMemo(
    () => ({
      title: truncate(shownTitle, FONT_TITLE, budget.title),
      desc: truncate(shownDesc, FONT_DESC, budget.desc),
    }),
    [shownTitle, shownDesc, budget],
  );

  const titlePx = useMemo(() => measure(shownTitle, FONT_TITLE), [shownTitle]);
  const descPx = useMemo(() => measure(shownDesc, FONT_DESC), [shownDesc]);

  const { domain, segs } = useMemo(() => displayUrl(url), [url]);

  const segBtn = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
      active
        ? "border-transparent bg-[var(--color-ink)] text-white"
        : "hairline hover:bg-[var(--color-surface)]"
    }`;

  return (
    <ToolPanel>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <div className="min-w-0 space-y-4">
          <div className="flex gap-2">
            <button type="button" className={segBtn(device === "desktop")} onClick={() => setDevice("desktop")}>
              {L.desktop[locale] ?? L.desktop.en}
            </button>
            <button type="button" className={segBtn(device === "mobile")} onClick={() => setDevice("mobile")}>
              {L.mobile[locale] ?? L.mobile.en}
            </button>
          </div>
          <label className="block">
            <span className="mb-1 block text-[13.5px] font-semibold">{L.title[locale] ?? L.title.en}</span>
            <input
              className="field"
              type="text"
              value={title}
              placeholder={L.titlePh[locale] ?? L.titlePh.en}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Meter chars={Array.from(title).length} px={titlePx} budget={budget.title} guide={L.titleGuide[locale] ?? L.titleGuide.en} charsLabel={L.chars[locale] ?? L.chars.en} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[13.5px] font-semibold">{L.desc[locale] ?? L.desc.en}</span>
            <textarea
              className="field"
              rows={3}
              value={desc}
              placeholder={L.descPh[locale] ?? L.descPh.en}
              onChange={(e) => setDesc(e.target.value)}
            />
            <Meter chars={Array.from(desc).length} px={descPx} budget={budget.desc} guide={L.descGuide[locale] ?? L.descGuide.en} charsLabel={L.chars[locale] ?? L.chars.en} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[13.5px] font-semibold">{L.url[locale] ?? L.url.en}</span>
            <input
              className="field"
              type="text"
              value={url}
              placeholder="https://example.com/blog/seo-checklist"
              spellCheck={false}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
        </div>

        <div className="min-w-0">
          <p className="mb-1.5 text-[13.5px] font-semibold">{L.preview[locale] ?? L.preview.en}</p>
          <div
            className="rounded-xl border hairline bg-[var(--color-card)] p-4"
            style={{ maxWidth: device === "desktop" ? 600 : 400 }}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-sub)]">
                <Icon name="globe" size={15} />
              </span>
              <p className="truncate text-[14px]" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                <span className="text-[#202124]">{domain}</span>
                {segs.length > 0 && <span className="text-[#4d5156]"> › {segs.join(" › ")}</span>}
              </p>
            </div>
            <p
              className={`mt-1.5 text-[20px] leading-[1.3] ${title ? "text-[#1a0dab] hover:underline" : "italic text-[#1a0dab]/60"}`}
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              {fit.title.text}
            </p>
            <p
              className={`mt-1 text-[14px] leading-[1.58] ${desc ? "text-[#4d5156]" : "italic text-[#4d5156]/60"}`}
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              {fit.desc.text}
            </p>
          </div>
          {(fit.title.truncated || fit.desc.truncated) && (
            <p className="mt-2.5 text-[12.5px] font-medium text-[var(--color-bad)]">
              {fit.title.truncated ? `Title: ${L.truncated[locale] ?? L.truncated.en}` : ""}
              {fit.title.truncated && fit.desc.truncated ? " · " : ""}
              {fit.desc.truncated ? `Description: ${L.truncated[locale] ?? L.truncated.en}` : ""}
            </p>
          )}
        </div>
      </div>
    </ToolPanel>
  );
}
