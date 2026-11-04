"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, downloadBlob } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import type TurndownService from "turndown";

/**
 * HTML → Markdown 引擎:turndown 动态 import,转换在浏览器本地完成。
 * 可选:标题风格(atx # / setext 下划线)与无序列表符号(- / * / +)。
 */

type HeadingStyle = "atx" | "setext";
type BulletMarker = "-" | "*" | "+";

const L = {
  heading: { en: "Heading style", zh: "标题风格", ja: "見出しスタイル", es: "Estilo de encabezados", pt: "Estilo de títulos" },
  atx: { en: "# ATX", zh: "# ATX", ja: "# ATX", es: "# ATX", pt: "# ATX" },
  setext: { en: "Setext", zh: "Setext 下划线", ja: "Setext", es: "Setext", pt: "Setext" },
  bullets: { en: "Bullet marker", zh: "列表符号", ja: "箇条書きマーカー", es: "Viñetas", pt: "Marcador de lista" },
  markdown: { en: "Markdown", zh: "Markdown", ja: "Markdown", es: "Markdown", pt: "Markdown" },
  failed: {
    en: "Conversion failed — the HTML may be malformed.",
    zh: "转换失败——HTML 可能格式有误。",
    ja: "変換に失敗しました — HTML が壊れている可能性があります。",
    es: "La conversión falló — el HTML puede estar mal formado.",
    pt: "A conversão falhou — o HTML pode estar malformado.",
  },
};

const pick = (label: Record<string, string>, locale: string) => label[locale] ?? label.en;

export function DevHtmlToMarkdownEngine({ sample = "" }: { sample?: string }) {
  const { locale, t } = useI18n();
  const [src, setSrc] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [headingStyle, setHeadingStyle] = useState<HeadingStyle>("atx");
  const [bullet, setBullet] = useState<BulletMarker>("-");
  const tdRef = useRef<typeof TurndownService | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      if (!src.trim()) {
        setOut("");
        setErr(null);
        return;
      }
      try {
        if (!tdRef.current) tdRef.current = (await import("turndown")).default;
        const td = new tdRef.current({ headingStyle, bulletListMarker: bullet });
        if (cancelled) return;
        setOut(td.turndown(src));
        setErr(null);
      } catch (e) {
        if (!cancelled) {
          setOut("");
          setErr(`${pick(L.failed, locale)} (${e instanceof Error ? e.message : String(e)})`);
        }
      }
    }, 200);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [src, headingStyle, bullet, locale]);

  const pillCls = (active: boolean): string =>
    `mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
      active ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]" : "hairline hover:bg-[var(--color-surface)]"
    }`;

  return (
    <ToolPanel>
      <div className="space-y-4">
        <textarea
          className="field mono h-64"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          placeholder={t.common.input}
          spellCheck={false}
          aria-label={t.common.input}
        />

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-semibold">{pick(L.heading, locale)}</span>
            <button type="button" className={pillCls(headingStyle === "atx")} onClick={() => setHeadingStyle("atx")}>
              {pick(L.atx, locale)}
            </button>
            <button type="button" className={pillCls(headingStyle === "setext")} onClick={() => setHeadingStyle("setext")}>
              {pick(L.setext, locale)}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-semibold">{pick(L.bullets, locale)}</span>
            {(["-", "*", "+"] as const).map((m) => (
              <button key={m} type="button" className={pillCls(bullet === m)} onClick={() => setBullet(m)}>
                {m}
              </button>
            ))}
          </div>
        </div>

        {err && (
          <p
            className="mono whitespace-pre-wrap rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
            role="alert"
          >
            {err}
          </p>
        )}

        <textarea
          className="field mono h-64 bg-[var(--color-surface)]"
          value={out}
          readOnly
          placeholder={t.common.output}
          spellCheck={false}
          aria-label={t.common.output}
        />

        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={out} label={pick(L.markdown, locale)} />
          {out && (
            <button
              type="button"
              onClick={() => downloadBlob(new Blob([out], { type: "text/markdown;charset=utf-8" }), "document.md")}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              {t.common.download} .md
            </button>
          )}
          <button
            type="button"
            onClick={() => setSrc("")}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
          {sample && src === "" && (
            <button
              type="button"
              onClick={() => setSrc(sample)}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-accent-strong)] transition-colors hover:bg-[rgba(0,113,227,0.06)]"
            >
              {t.common.sample}
            </button>
          )}
        </div>
      </div>
    </ToolPanel>
  );
}
