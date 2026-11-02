"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { tr, type Text } from "./seo-locale";

// 仅转发类型;loc/tr 等函数留在 seo-locale.ts(工具定义文件在服务端调用它们)
export type { Localized, Text } from "./seo-locale";

export type TagField = {
  key: string;
  label: Text;
  type?: "text" | "textarea" | "select" | "date";
  options?: { value: string; label?: Text }[];
  default?: string;
  placeholder?: Text;
  hint?: Text;
  rows?: number;
  /** 字符计:len 超过 max 标红 */
  meter?: { warn: number; max: number };
};

export type TagLine = {
  /** 支持 {{key}} 占位符,值做 HTML 属性转义(& < > ") */
  template: string;
  /** 该字段为空时整行省略 */
  when?: string;
};

export type TagEngineProps = {
  fields: TagField[];
  /** lines 模式必填;url 模式(UTM)可省略 */
  lines?: TagLine[];
  /** lines = 逐行模板;url = 基础 URL + 查询参数拼接(UTM) */
  mode?: "lines" | "url";
  urlKey?: string;
  params?: { key: string; name: string }[];
  preview?: "social";
  tips?: { en: string[] } & Partial<Record<Locale, string[]>>;
  outputLabel?: Text;
};

const TIPS_TITLE: Record<string, string> = {
  en: "Checklist",
  zh: "要点清单",
  ja: "チェックリスト",
  es: "Lista de verificación",
  pt: "Checklist",
};

const PREVIEW_LABEL: Record<string, string> = {
  en: "Share card preview",
  zh: "分享卡片预览",
  ja: "シェアカードのプレビュー",
  es: "Vista previa de la tarjeta",
  pt: "Prévia do cartão",
};

const IMAGE_HINT: Record<string, string> = {
  en: "image URL (1200 × 630)",
  zh: "图片 URL(1200 × 630)",
  ja: "画像 URL(1200 × 630)",
  es: "URL de imagen (1200 × 630)",
  pt: "URL da imagem (1200 × 630)",
};

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function domainOf(u: string): string {
  const s = u.trim();
  if (!s) return "";
  try {
    return new URL(s).hostname.replace(/^www\./, "");
  } catch {
    return s.replace(/^https?:\/\//, "").split("/")[0];
  }
}

/** og: + twitter: 标签驱动的分享卡片模拟 */
function SocialCard({ vals }: { vals: Record<string, string> }) {
  const { locale } = useI18n();
  const large = (vals["twitter:card"] || "summary_large_image") !== "summary";
  const image = vals["og:image"] || "";
  const [imgOk, setImgOk] = useState(true);
  useEffect(() => setImgOk(true), [image]);

  const domain = domainOf(vals["og:url"] ?? "") || "example.com";
  const title = vals["og:title"] || "Page title";
  const desc = vals["og:description"] || "";

  const box = (
    <div className={`relative flex-none overflow-hidden bg-[var(--color-surface)] ${large ? "aspect-[1.91/1] w-full" : "h-[126px] w-[126px]"}`}>
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-2 text-center text-[var(--color-sub)]">
        <Icon name="image" size={22} />
        <span className="text-[11.5px] leading-4">{IMAGE_HINT[locale] ?? IMAGE_HINT.en}</span>
      </span>
      {image && imgOk && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setImgOk(false)}
        />
      )}
    </div>
  );

  const text = (
    <div className="min-w-0 px-3 py-2.5">
      <p className="truncate text-[12.5px] text-[var(--color-sub)]">{domain}</p>
      <p className="mt-0.5 line-clamp-2 text-[15px] font-semibold leading-5">{title}</p>
      {desc && (
        <p className="mt-1 line-clamp-2 text-[13px] leading-[1.35] text-[var(--color-sub)]">{desc}</p>
      )}
    </div>
  );

  return large ? (
    <div className="overflow-hidden rounded-xl border hairline">
      {box}
      {text}
    </div>
  ) : (
    <div className="flex overflow-hidden rounded-xl border hairline">
      {box}
      <div className="min-w-0 flex-1">{text}</div>
    </div>
  );
}

/**
 * SEO 标签通用引擎:props 里只放可序列化的字段配置 + 模板行,
 * meta / og / canonical / hreflang / utm 五个工具共用。
 */
export function SeoTagsEngine({
  fields,
  lines = [],
  mode = "lines",
  urlKey = "url",
  params = [],
  preview,
  tips,
  outputLabel,
}: TagEngineProps) {
  const { locale, t } = useI18n();
  const defaults = () => Object.fromEntries(fields.map((f) => [f.key, f.default ?? ""]));
  const [vals, setVals] = useState<Record<string, string>>(defaults);
  const set = (key: string, v: string) => setVals((s) => ({ ...s, [key]: v }));
  const L = (v: Text | undefined) => tr(locale, v);

  const output = useMemo(() => {
    if (mode === "url") {
      const base = (vals[urlKey] ?? "").trim();
      if (!base) return "";
      const pairs = params
        .map((p) => ({ name: p.name, value: (vals[p.key] ?? "").trim() }))
        .filter((p) => p.value !== "")
        .map((p) => `${p.name}=${encodeURIComponent(p.value)}`);
      if (pairs.length === 0) return base;
      return `${base}${base.includes("?") ? "&" : "?"}${pairs.join("&")}`;
    }
    return lines
      .map((l) => {
        if (l.when && !(vals[l.when] ?? "").trim()) return null;
        return l.template.replace(/\{\{([\w.:-]+)\}\}/g, (_, k: string) =>
          escapeAttr(vals[k] ?? ""),
        );
      })
      .filter((s): s is string => s !== null)
      .join("\n");
  }, [mode, urlKey, params, lines, vals]);

  return (
    <ToolPanel>
      <div className={`grid gap-6 ${preview === "social" ? "lg:grid-cols-[minmax(0,1fr)_360px]" : ""}`}>
        <div className="min-w-0 space-y-4">
          {fields.map((f) => {
            const v = vals[f.key] ?? "";
            const len = Array.from(v).length;
            return (
              <label key={f.key} className="block">
                <span className="mb-1 flex items-baseline justify-between gap-3">
                  <span className="text-[13.5px] font-semibold">{L(f.label)}</span>
                  {f.meter && (
                    <span
                      className={`mono text-[12px] ${
                        len > f.meter.max ? "font-semibold text-[var(--color-bad)]" : "text-[var(--color-sub)]"
                      }`}
                    >
                      {len} / {f.meter.max}
                    </span>
                  )}
                </span>
                {f.type === "textarea" ? (
                  <textarea
                    className="field"
                    rows={f.rows ?? 3}
                    value={v}
                    placeholder={L(f.placeholder)}
                    onChange={(e) => set(f.key, e.target.value)}
                  />
                ) : f.type === "select" ? (
                  <select className="field" value={v} onChange={(e) => set(f.key, e.target.value)}>
                    {(f.options ?? []).map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label ? L(o.label) : o.value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="field"
                    type="text"
                    value={v}
                    placeholder={L(f.placeholder)}
                    spellCheck={false}
                    onChange={(e) => set(f.key, e.target.value)}
                  />
                )}
                {f.hint && (
                  <span className="mt-1 block text-[12.5px] leading-4 text-[var(--color-sub)]">
                    {L(f.hint)}
                  </span>
                )}
              </label>
            );
          })}

          <div>
            <p className="mb-1.5 text-[13.5px] font-semibold">
              {outputLabel ? L(outputLabel) : t.common.output}
            </p>
            <textarea
              className="field mono bg-[var(--color-surface)]"
              rows={mode === "url" ? 3 : Math.min(14, lines.length + 1)}
              value={output}
              readOnly
              spellCheck={false}
              aria-label={t.common.output}
            />
            <div className="mt-3 flex flex-wrap gap-2.5">
              <CopyButton value={output} />
              <button
                type="button"
                onClick={() => setVals(defaults())}
                className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
              >
                {t.common.reset}
              </button>
            </div>
          </div>

          {tips && (
            <div className="rounded-xl bg-[var(--color-surface)] p-4">
              <p className="text-[13.5px] font-semibold">{TIPS_TITLE[locale] ?? TIPS_TITLE.en}</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[13.5px] leading-5 text-[var(--color-sub)]">
                {(tips[locale] ?? tips.en).map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {preview === "social" && (
          <div className="min-w-0">
            <p className="mb-1.5 text-[13.5px] font-semibold">{PREVIEW_LABEL[locale] ?? PREVIEW_LABEL.en}</p>
            <SocialCard vals={vals} />
          </div>
        )}
      </div>
    </ToolPanel>
  );
}
