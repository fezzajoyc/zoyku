"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, downloadBlob } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { loc } from "./seo-locale";

type Freq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
const FREQS: Freq[] = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
const PRIOS = ["1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1"];

const L = {
  input: loc("URL list (one per line)", "URL 列表(每行一个)", "URL リスト(1 行に 1 件)", "Lista de URLs (una por línea)", "Lista de URLs (uma por linha)"),
  lastmod: loc("lastmod", "lastmod", "lastmod", "lastmod", "lastmod"),
  today: loc("Today's date", "今天的日期", "今日の日付", "Fecha de hoy", "Data de hoje"),
  custom: loc("Custom date", "自定义日期", "日付を指定", "Fecha personalizada", "Data personalizada"),
  omit: loc("Omit", "省略", "省略", "Omitir", "Omitir"),
  freq: loc("changefreq — default", "changefreq — 默认", "changefreq — デフォルト", "changefreq — predeterminado", "changefreq — padrão"),
  prio: loc("priority — default", "priority — 默认", "priority — デフォルト", "priority — predeterminado", "priority — padrão"),
  inherit: loc("Default", "跟随默认", "デフォルト", "Predeterminado", "Padrão"),
  groups: loc("Sections (set changefreq / priority per group)", "目录分组(按分组设置 changefreq / priority)", "セクション(グループごとに changefreq / priority を設定)", "Secciones (changefreq / priority por grupo)", "Seções (changefreq / priority por grupo)"),
  root: loc("(root pages)", "(根路径页面)", "(ルートページ)", "(páginas raíz)", "(páginas raiz)"),
  urls: loc("URLs", "个 URL", "件の URL", "URLs", "URLs"),
  groupsN: loc("groups", "个分组", "グループ", "grupos", "grupos"),
  dups: loc("duplicates removed", "条重复已去除", "件の重複を削除", "duplicados eliminados", "duplicadas removidas"),
  lastmodHint: loc("Only set lastmod when the page content actually changed — copied dates teach Google to ignore yours.", "只有页面内容真正变化时才设置 lastmod——照抄当天日期会让 Google 不再信任你的值。", "ページの内容が実際に変わったときだけ lastmod を設定してください。全ページに今日の日付を付けると信頼されません。", "Solo pon lastmod cuando el contenido cambió de verdad: copiar la fecha de hoy hace que Google ignore el tuyo.", "Só use lastmod quando o conteúdo mudou de verdade: copiar a data de hoje faz o Google ignorar o seu."),
} as const;

function escXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function groupOf(u: string): string {
  try {
    const url = new URL(u);
    const seg = url.pathname.split("/").filter(Boolean)[0];
    return seg ? `/${seg}/` : "/";
  } catch {
    return "/";
  }
}

function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** 粘贴 URL 列表 → sitemap.xml:去重、按首段路径分组、组级 changefreq/priority */
export function SeoSitemapEngine() {
  const { locale, t } = useI18n();
  const [raw, setRaw] = useState("");
  const [lastmodMode, setLastmodMode] = useState<"today" | "custom" | "none">("today");
  const [lastmodCustom, setLastmodCustom] = useState("");
  const [defaultFreq, setDefaultFreq] = useState("");
  const [defaultPrio, setDefaultPrio] = useState("");
  const [groupFreq, setGroupFreq] = useState<Record<string, string>>({});
  const [groupPrio, setGroupPrio] = useState<Record<string, string>>({});

  const parsed = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    let dups = 0;
    for (const line of raw.split(/\r?\n/)) {
      const u = line.trim();
      if (!u || u.startsWith("#")) continue;
      if (seen.has(u)) {
        dups += 1;
        continue;
      }
      seen.add(u);
      list.push(u);
    }
    return { list, dups };
  }, [raw]);

  const groups = useMemo(() => {
    const m = new Map<string, number>();
    for (const u of parsed.list) {
      const g = groupOf(u);
      m.set(g, (m.get(g) ?? 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [parsed]);

  const output = useMemo(() => {
    if (parsed.list.length === 0) return "";
    const lastmod =
      lastmodMode === "today"
        ? fmtDate(new Date())
        : lastmodMode === "custom" && lastmodCustom
          ? lastmodCustom
          : "";
    const parts = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
    for (const u of parsed.list) {
      const g = groupOf(u);
      const freq = groupFreq[g] || defaultFreq;
      const prio = groupPrio[g] || defaultPrio;
      parts.push("  <url>");
      parts.push(`    <loc>${escXml(u)}</loc>`);
      if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
      if (freq) parts.push(`    <changefreq>${freq}</changefreq>`);
      if (prio) parts.push(`    <priority>${prio}</priority>`);
      parts.push("  </url>");
    }
    parts.push("</urlset>");
    return parts.join("\n");
  }, [parsed, lastmodMode, lastmodCustom, defaultFreq, defaultPrio, groupFreq, groupPrio]);

  const stats = `${parsed.list.length} ${L.urls[locale] ?? L.urls.en} · ${groups.length} ${L.groupsN[locale] ?? L.groupsN.en}${parsed.dups > 0 ? ` · ${parsed.dups} ${L.dups[locale] ?? L.dups.en}` : ""}`;

  return (
    <ToolPanel>
      <div className="space-y-5">
        <label className="block">
          <span className="mb-1 block text-[13.5px] font-semibold">{L.input[locale] ?? L.input.en}</span>
          <textarea
            className="field mono"
            rows={7}
            value={raw}
            placeholder={"https://example.com/\nhttps://example.com/pricing\nhttps://example.com/blog/post-1"}
            spellCheck={false}
            onChange={(e) => setRaw(e.target.value)}
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1 block text-[13px] text-[var(--color-sub)]">{L.lastmod[locale] ?? L.lastmod.en}</span>
            <select className="field" value={lastmodMode} onChange={(e) => setLastmodMode(e.target.value as "today" | "custom" | "none")}>
              <option value="today">{L.today[locale] ?? L.today.en}</option>
              <option value="custom">{L.custom[locale] ?? L.custom.en}</option>
              <option value="none">{L.omit[locale] ?? L.omit.en}</option>
            </select>
          </label>
          {lastmodMode === "custom" && (
            <label className="block">
              <span className="mb-1 block text-[13px] text-[var(--color-sub)]">{L.lastmod[locale] ?? L.lastmod.en}</span>
              <input
                className="field"
                type="date"
                value={lastmodCustom}
                onChange={(e) => setLastmodCustom(e.target.value)}
              />
            </label>
          )}
          <label className="block">
            <span className="mb-1 block text-[13px] text-[var(--color-sub)]">{L.freq[locale] ?? L.freq.en}</span>
            <select className="field" value={defaultFreq} onChange={(e) => setDefaultFreq(e.target.value)}>
              <option value="">{L.omit[locale] ?? L.omit.en}</option>
              {FREQS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-[13px] text-[var(--color-sub)]">{L.prio[locale] ?? L.prio.en}</span>
            <select className="field" value={defaultPrio} onChange={(e) => setDefaultPrio(e.target.value)}>
              <option value="">{L.omit[locale] ?? L.omit.en}</option>
              {PRIOS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="text-[12.5px] leading-4 text-[var(--color-sub)]">{L.lastmodHint[locale] ?? L.lastmodHint.en}</p>

        {groups.length > 0 && (
          <div>
            <p className="mb-2 text-[13.5px] font-semibold">{L.groups[locale] ?? L.groups.en}</p>
            <div className="space-y-2">
              {groups.map(([g, count]) => (
                <div key={g} className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl bg-[var(--color-surface)] px-3.5 py-2">
                  <span className="mono min-w-0 flex-1 truncate text-[13.5px] font-semibold">
                    {g === "/" ? L.root[locale] ?? L.root.en : `${g}*`}
                    <span className="ml-2 font-normal text-[var(--color-sub)]">× {count}</span>
                  </span>
                  <label className="flex items-center gap-1.5 text-[12.5px] text-[var(--color-sub)]">
                    changefreq
                    <select
                      className="field mono py-1.5"
                      value={groupFreq[g] ?? ""}
                      onChange={(e) => setGroupFreq((s) => ({ ...s, [g]: e.target.value }))}
                    >
                      <option value="">{L.inherit[locale] ?? L.inherit.en}</option>
                      {FREQS.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </label>
                  <label className="flex items-center gap-1.5 text-[12.5px] text-[var(--color-sub)]">
                    priority
                    <select
                      className="field mono py-1.5"
                      value={groupPrio[g] ?? ""}
                      onChange={(e) => setGroupPrio((s) => ({ ...s, [g]: e.target.value }))}
                    >
                      <option value="">{L.inherit[locale] ?? L.inherit.en}</option>
                      {PRIOS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <p className="text-[13.5px] font-semibold">sitemap.xml</p>
            {parsed.list.length > 0 && (
              <p className="text-[12.5px] text-[var(--color-sub)]">{stats}</p>
            )}
          </div>
          <textarea
            className="field mono min-h-[16rem] bg-[var(--color-surface)]"
            rows={14}
            value={output}
            readOnly
            spellCheck={false}
            aria-label={t.common.output}
          />
          <div className="mt-3 flex flex-wrap gap-2.5">
            <CopyButton value={output} />
            <button
              type="button"
              disabled={!output}
              onClick={() => downloadBlob(new Blob([output], { type: "application/xml" }), "sitemap.xml")}
              className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)] disabled:opacity-50"
            >
              {t.common.download}
            </button>
          </div>
        </div>
      </div>
    </ToolPanel>
  );
}
