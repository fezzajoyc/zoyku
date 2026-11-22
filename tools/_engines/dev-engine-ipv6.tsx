"use client";

import { useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import { ipv6Expand } from "../_lib/ipv6-addr";

/**
 * CN-031:IPv6 压缩/展开引擎。输入任意合法 IPv6 → 同时显示 RFC 5952 压缩与完整展开。
 */

const L = {
  input: {
    en: "IPv6 address",
    zh: "IPv6 地址",
    ja: "IPv6 アドレス",
    es: "Dirección IPv6",
    pt: "Endereço IPv6",
  },
  compressed: { en: "RFC 5952 compressed", zh: "RFC 5952 压缩", ja: "RFC 5952 圧縮", es: "RFC 5952 comprimido", pt: "RFC 5952 comprimido" },
  expanded: { en: "Expanded (full form)", zh: "展开(完整形式)", ja: "展開(完全形)", es: "Expandido (forma completa)", pt: "Expandido (forma completa)" },
  run: { en: "Convert", zh: "转换", ja: "変換", es: "Convertir", pt: "Converter" },
  badFormat: {
    en: "Not a valid IPv6 address — check for multiple ::, missing groups, or characters outside 0-9 a-f A-F.",
    zh: "不是合法的 IPv6 地址——检查是否有多个 ::、缺失组、或 0-9 a-f A-F 之外的字符。",
    ja: "有効な IPv6 アドレスではありません — 複数の ::、不足グループ、0-9 a-f A-F 以外の文字を確認してください。",
    es: "No es una dirección IPv6 válida — revise si hay múltiples ::, grupos faltantes o caracteres fuera de 0-9 a-f A-F.",
    pt: "Não é um endereço IPv6 válido — verifique múltiplos ::, grupos ausentes ou caracteres fora de 0-9 a-f A-F.",
  },
  note: {
    en: "RFC 5952 canonical compression: the longest zero run (2+) becomes ::, leading zeros are stripped, and the output is lowercase. IPv4-mapped addresses (::ffff:0:0/96) keep the dotted-decimal tail per RFC 5952 §5. Brackets and zone indices (%) are stripped automatically. Everything runs locally; no network calls.",
    zh: "RFC 5952 规范压缩:最长零段(2 组及以上)缩为 ::,去前导零,输出小写。IPv4 映射地址(::ffff:0:0/96)按 RFC 5952 §5 保留点分尾部。方括号与区号(%)自动去除。全部本机完成,无网络调用。",
    ja: "RFC 5952 規範圧縮:最長ゼロラン(2 以上)を :: にし、先行ゼロを取り除き、出力は小文字。IPv4 マップアドレス(::ffff:0:0/96)は RFC 5952 §5 に従いドット区切りを保持します。角括弧とゾーンインデックス(%)は自動で除去。すべてローカルで、ネットワーク呼び出しなし。",
    es: "Compresión canónica RFC 5952: la cadena de ceros más larga (2+) se convierte en ::, se eliminan los ceros iniciales y la salida es en minúsculas. Las direcciones mapeadas IPv4 (::ffff:0:0/96) mantienen el sufijo decimal según RFC 5952 §5. Los corchetes e índices de zona (%) se eliminan automáticamente. Todo local.",
    pt: "Compressão canônica RFC 5952: a sequência de zeros mais longa (2+) vira ::, zeros à esquerda são removidos, e a saída é em minúsculas. Endereços mapeados IPv4 (::ffff:0:0/96) mantêm o sufixo decimal conforme RFC 5952 §5. Colchetes e índices de zona (%) são removidos automaticamente. Tudo local.",
  },
};

export function DevEngineIpv6() {
  const { locale } = useI18n();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ compressed: string; expanded: string } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const doRun = async () => {
    setErr(null);
    setBusy(true);
    const r = ipv6Expand(input);
    setBusy(false);
    if (r.ok) setResult({ compressed: r.compressed, expanded: r.expanded });
    else {
      setResult(null);
      setErr(pick(locale, L.badFormat));
    }
  };

  return (
    <ToolPanel>
      <div className="space-y-4">
        <textarea
          className="field mono"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={pick(locale, L.input)}
          spellCheck={false}
          aria-label={pick(locale, L.input)}
        />

        <button
          type="button"
          onClick={doRun}
          disabled={busy || !input.trim()}
          className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
        >
          {busy ? "…" : pick(locale, L.run)}
        </button>

        {err && (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {err}
          </p>
        )}

        {result && (
          <div className="space-y-3">
            <div className="space-y-2">
              <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.compressed)}</p>
              <textarea className="field mono bg-[var(--color-surface)]" rows={2} value={result.compressed} readOnly spellCheck={false} aria-label={pick(locale, L.compressed)} />
              <CopyButton value={result.compressed} />
            </div>
            <div className="space-y-2">
              <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.expanded)}</p>
              <textarea className="field mono bg-[var(--color-surface)]" rows={2} value={result.expanded} readOnly spellCheck={false} aria-label={pick(locale, L.expanded)} />
              <CopyButton value={result.expanded} />
            </div>
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
