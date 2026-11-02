"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";

/**
 * URL 拆解引擎:纯浏览器 URL API,无依赖。
 * 无协议头时按浏览器惯例补 https:// 重试;解析失败给内联友好提示,绝不崩溃。
 */

type Param = { key: string; value: string };

type ParsedUrl = {
  protocol: string;
  host: string;
  port: string;
  pathname: string;
  segments: string[];
  params: Param[];
  hash: string;
};

function parseUrl(raw: string): ParsedUrl | null {
  const trimmed = raw.trim();
  // URL 不允许内部空白;外层空白仅做 trim
  if (!trimmed || /\s/.test(trimmed)) return null;
  let candidate = trimmed;
  if (candidate.startsWith("//")) candidate = `https:${candidate}`;
  else if (!/^[a-z][a-z0-9+.-]*:/i.test(candidate)) candidate = `https://${candidate}`;
  try {
    const u = new URL(candidate);
    const segments = u.pathname
      .split("/")
      .filter(Boolean)
      .map((seg) => {
        try {
          return decodeURIComponent(seg);
        } catch {
          return seg; // 非法百分号编码按原样展示
        }
      });
    return {
      protocol: u.protocol.replace(/:$/, ""),
      host: u.hostname,
      port: u.port,
      pathname: u.pathname,
      segments,
      params: [...u.searchParams.entries()].map(([key, value]) => ({ key, value })),
      hash: u.hash.replace(/^#/, ""),
    };
  } catch {
    return null;
  }
}

const L: Record<string, Record<string, string>> = {
  protocol: { en: "Protocol", zh: "协议", ja: "プロトコル", es: "Protocolo", pt: "Protocolo" },
  host: { en: "Host", zh: "主机", ja: "ホスト", es: "Host", pt: "Host" },
  port: { en: "Port", zh: "端口", ja: "ポート", es: "Puerto", pt: "Porta" },
  hash: { en: "Hash", zh: "锚点(Hash)", ja: "ハッシュ", es: "Fragmento (hash)", pt: "Fragmento (hash)" },
  segments: {
    en: "Path segments",
    zh: "路径分段",
    ja: "パスセグメント",
    es: "Segmentos de ruta",
    pt: "Segmentos do caminho",
  },
  params: {
    en: "Query parameters",
    zh: "查询参数",
    ja: "クエリパラメータ",
    es: "Parámetros de consulta",
    pt: "Parâmetros de consulta",
  },
  copyJson: {
    en: "Copy as JSON",
    zh: "复制为 JSON",
    ja: "JSON としてコピー",
    es: "Copiar como JSON",
    pt: "Copiar como JSON",
  },
  empty: { en: "(empty)", zh: "(空)", ja: "(空)", es: "(vacío)", pt: "(vazio)" },
  invalid: {
    en: "That doesn’t look like a valid URL — check the spelling or add a scheme like https://",
    zh: "这不是一个有效的 URL——检查拼写,或补上 https:// 这样的协议头",
    ja: "有効な URL ではないようです。スペルを確認するか、https:// のようなスキームを追加してください",
    es: "No parece una URL válida — revisa la escritura o añade un esquema como https://",
    pt: "Não parece uma URL válida — confira a digitação ou adicione um esquema como https://",
  },
};

const pick = (l: Record<string, string>, locale: Locale) => l[locale] ?? l.en;

export function DevUrlParserEngine({
  sample = "https://example.com/shop/shoes?color=red&size=42&utm_source=newsletter#reviews",
}: {
  sample?: string;
}) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");

  const parsed = useMemo(() => parseUrl(input), [input]);
  const hasInput = input.trim() !== "";

  const json = useMemo(() => {
    if (!parsed) return "";
    return JSON.stringify(
      {
        protocol: parsed.protocol,
        host: parsed.host,
        port: parsed.port,
        pathname: parsed.pathname,
        segments: parsed.segments,
        query: parsed.params.map((p) => ({ key: p.key, value: p.value })),
        hash: parsed.hash,
      },
      null,
      2,
    );
  }, [parsed]);

  const part = (label: string, value: string) => (
    <div className="rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5">
      <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--color-sub)]">{label}</p>
      <p className="mono mt-0.5 break-all text-[14px] font-medium">{value || "—"}</p>
    </div>
  );

  return (
    <ToolPanel>
      <div className="space-y-4">
        <input
          type="url"
          className="field mono"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com/path?query=1#hash"
          spellCheck={false}
          aria-label={t.common.input}
        />

        {hasInput && !parsed && (
          <p
            className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
            role="alert"
          >
            {pick(L.invalid, locale)}
          </p>
        )}

        {parsed && (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {part(pick(L.protocol, locale), parsed.protocol)}
              {part(pick(L.host, locale), parsed.host)}
              {part(pick(L.port, locale), parsed.port)}
              {part(pick(L.hash, locale), parsed.hash)}
            </div>

            {parsed.segments.length > 0 && (
              <div>
                <p className="mb-1.5 text-[13px] font-semibold">
                  {pick(L.segments, locale)}
                  <span className="ml-1.5 font-normal text-[var(--color-sub)]">{parsed.segments.length}</span>
                </p>
                <div className="divide-y divide-[var(--color-hairline)] rounded-xl border hairline">
                  {parsed.segments.map((seg, i) => (
                    <p key={`${i}-${seg}`} className="mono flex items-center gap-3 px-3.5 py-2 text-[13.5px]">
                      <span className="w-8 flex-none text-right text-[var(--color-sub)]">/{i + 1}</span>
                      <span className="min-w-0 break-all">{seg}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {parsed.params.length > 0 && (
              <div>
                <p className="mb-1.5 text-[13px] font-semibold">
                  {pick(L.params, locale)}
                  <span className="ml-1.5 font-normal text-[var(--color-sub)]">{parsed.params.length}</span>
                </p>
                <div className="divide-y divide-[var(--color-hairline)] rounded-xl border hairline">
                  {parsed.params.map((p, i) => (
                    <div key={`${i}-${p.key}`} className="flex flex-col gap-0.5 px-3.5 py-2 sm:flex-row sm:gap-3">
                      <p className="mono w-56 flex-none break-all text-[13.5px] font-semibold">{p.key}</p>
                      <p className="mono min-w-0 flex-1 break-all text-[13.5px] text-[var(--color-sub)]">
                        {p.value || pick(L.empty, locale)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2.5">
          {parsed && <CopyButton value={json} label={pick(L.copyJson, locale)} />}
          <button
            type="button"
            onClick={() => setInput("")}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
          {!hasInput && (
            <button
              type="button"
              onClick={() => setInput(sample)}
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
