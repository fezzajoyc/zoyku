"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

/**
 * Markdown 实时预览:marked 动态 import,渲染前先经过白名单 sanitizer
 * (去 script/事件属性/javascript: 协议,只保留安全的标签与属性)。
 */

const ALLOWED_TAGS = new Set([
  "h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "ul", "ol", "li", "blockquote", "pre", "code", "em", "strong",
  "del", "s", "hr", "br", "img", "table", "thead", "tbody", "tfoot", "tr", "th", "td", "sup", "sub", "span",
  "input", "details", "summary",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "hreflang"]),
  img: new Set(["src", "alt", "title", "width", "height", "loading"]),
  input: new Set(["type", "checked", "disabled"]),
  ol: new Set(["start"]),
  th: new Set(["align", "colspan", "rowspan"]),
  td: new Set(["align", "colspan", "rowspan"]),
  code: new Set(["class"]),
};

function safeUri(uri: string, isImg: boolean): boolean {
  const clean = uri.replace(/[\u0000-\u0020]+/g, "");
  const m = /^([a-z][a-z0-9+.-]*):/i.exec(clean);
  if (!m) return true; // 相对路径 / 锚点 / 查询串
  const scheme = m[1].toLowerCase();
  if (scheme === "http" || scheme === "https" || scheme === "mailto" || scheme === "tel") return true;
  if (isImg && scheme === "data" && /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);/i.test(clean)) return true;
  return false;
}

function sanitizeHtml(html: string): string {
  if (typeof DOMParser === "undefined") return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  const body = doc.body;

  // 不在白名单里的元素:拆壳保内容,反复处理直到收敛
  for (let round = 0; round < 60; round++) {
    let removed = 0;
    for (const el of Array.from(body.querySelectorAll("*"))) {
      if (!ALLOWED_TAGS.has(el.tagName.toLowerCase())) {
        el.replaceWith(...el.childNodes);
        removed++;
      }
    }
    if (removed === 0) break;
  }

  const comments: Comment[] = [];
  const walker = doc.createTreeWalker(body, NodeFilter.SHOW_COMMENT);
  while (walker.nextNode()) comments.push(walker.currentNode as Comment);
  for (const c of comments) c.parentNode?.removeChild(c);

  for (const el of Array.from(body.querySelectorAll("*"))) {
    const tag = el.tagName.toLowerCase();
    const allowed = ALLOWED_ATTRS[tag] ?? new Set<string>();
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      let keep = allowed.has(name);
      if (keep && name === "href") keep = safeUri(attr.value, false);
      if (keep && name === "src") keep = safeUri(attr.value, true);
      if (keep && name === "class" && tag === "code") keep = /^language-[\w+#.:-]*$/.test(attr.value);
      if (keep && tag === "input") keep = ["checkbox"].includes(attr.value) || name === "checked" || name === "disabled";
      if (!keep) el.removeAttribute(attr.name);
    }
  }
  return body.innerHTML;
}

const PROSE = [
  "[&_h1]:mt-0 [&_h1]:mb-3 [&_h1]:text-[1.6rem] [&_h1]:font-bold",
  "[&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:text-[1.3rem] [&_h2]:font-semibold",
  "[&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-[1.1rem] [&_h3]:font-semibold",
  "[&_h4]:mt-4 [&_h4]:mb-1 [&_h4]:font-semibold",
  "[&_p]:my-2.5 [&_ul]:my-2.5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-2.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1",
  "[&_a]:text-[var(--color-accent-strong)] [&_a]:underline",
  "[&_blockquote]:my-3 [&_blockquote]:border-l-[3px] [&_blockquote]:border-[var(--color-hairline)] [&_blockquote]:pl-3 [&_blockquote]:text-[var(--color-sub)]",
  "[&_code]:rounded [&_code]:bg-[var(--color-surface)] [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.9em]",
  "[&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-[var(--color-surface)] [&_pre]:p-3 [&_pre]:text-[13px] [&_pre_code]:bg-transparent [&_pre_code]:p-0",
  "[&_table]:my-3 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-[var(--color-hairline)] [&_th]:px-2.5 [&_th]:py-1.5 [&_th]:text-left [&_td]:border [&_td]:border-[var(--color-hairline)] [&_td]:px-2.5 [&_td]:py-1.5",
  "[&_img]:my-2 [&_img]:max-w-full [&_img]:rounded-lg [&_hr]:my-4 [&_hr]:border-[var(--color-hairline)]",
].join(" ");

const L = {
  preview: { en: "Preview", zh: "预览", ja: "プレビュー", es: "Vista previa", pt: "Pré-visualização" },
  html: { en: "HTML", zh: "HTML", ja: "HTML", es: "HTML", pt: "HTML" },
  source: { en: "Markdown", zh: "Markdown 源码", ja: "Markdown ソース", es: "Markdown", pt: "Markdown" },
};

const pick = (label: Record<string, string>, locale: string) => label[locale] ?? label.en;

export function DevMarkdownEngine({ sample = "" }: { sample?: string }) {
  const { locale, t } = useI18n();
  const [src, setSrc] = useState("");
  const [html, setHtml] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const markedRef = useRef<typeof import("marked").marked | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      if (!src.trim()) {
        setHtml("");
        setErr(null);
        return;
      }
      try {
        if (!markedRef.current) {
          const mod = await import("marked");
          markedRef.current = mod.marked;
        }
        const raw = markedRef.current.parse(src, { async: false });
        if (cancelled) return;
        setHtml(sanitizeHtml(raw));
        setErr(null);
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : String(e));
      }
    }, 200);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [src]);

  return (
    <ToolPanel>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-[13px] font-semibold">{pick(L.source, locale)}</label>
          <textarea
            className="field mono h-80"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            placeholder={t.common.input}
            spellCheck={false}
            aria-label={pick(L.source, locale)}
          />
          {sample && src === "" && (
            <button
              type="button"
              onClick={() => setSrc(sample)}
              className="mt-2 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-accent-strong)] transition-colors hover:bg-[rgba(0,113,227,0.06)]"
            >
              {t.common.sample}
            </button>
          )}
        </div>
        <div>
          <label className="mb-1 block text-[13px] font-semibold">{pick(L.preview, locale)}</label>
          <div
            className={`h-80 overflow-y-auto rounded-xl border hairline bg-[var(--color-card)] p-4 text-[15px] leading-6 ${PROSE}`}
          >
            {html ? (
              <div dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <p className="text-[14px] text-[#a1a1a6]">{pick(L.preview, locale)}…</p>
            )}
          </div>
        </div>
      </div>

      {err && (
        <p
          className="mono mt-4 whitespace-pre-wrap rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
          role="alert"
        >
          {err}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2.5">
        {html && <CopyButton value={html} label={pick(L.html, locale)} />}
        <button
          type="button"
          onClick={() => setSrc("")}
          className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
        >
          {t.common.clear}
        </button>
      </div>
    </ToolPanel>
  );
}
