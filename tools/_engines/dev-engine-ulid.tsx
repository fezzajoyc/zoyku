"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { generateUlid, parseUlid } from "../_lib/ulid";

/**
 * ULID 生成器:48 bit 毫秒时间戳 + 80 bit 随机,Crockford Base32,26 字符。
 * 批量生成,显示每个 ULID 对应的时间戳。
 */

const LABELS: Record<string, Record<string, string>> = {
  count: { en: "How many", zh: "生成数量", ja: "生成数", es: "Cantidad", pt: "Quantidade" },
  generate: { en: "Generate", zh: "生成", ja: "生成", es: "Generar", pt: "Gerar" },
  timestamp: { en: "Timestamp (ms)", zh: "时间戳(毫秒)", ja: "タイムスタンプ (ms)", es: "Marca de tiempo (ms)", pt: "Timestamp (ms)" },
  localTime: { en: "Local time", zh: "本地时间", ja: "ローカル時刻", es: "Hora local", pt: "Hora local" },
  ulids: { en: "ULIDs", zh: "ULID 列表", ja: "ULID 一覧", es: "ULIDs", pt: "ULIDs" },
  localNote: {
    en: "Generated locally with crypto.getRandomValues — 48-bit timestamp + 80-bit randomness, Crockford Base32, 26 characters.",
    zh: "由 crypto.getRandomValues 本地生成——48 位时间戳 + 80 位随机数,Crockford Base32 编码,共 26 字符。",
    ja: "crypto.getRandomValues でローカル生成 — 48 ビットのタイムスタンプ + 80 ビットの乱数、Crockford Base32、26 文字。",
    es: "Generado localmente con crypto.getRandomValues: sello de 48 bits + aleatoriedad de 80 bits, Crockford Base32, 26 caracteres.",
    pt: "Gerado localmente com crypto.getRandomValues — timestamp de 48 bits + 80 bits aleatórios, Crockford Base32, 26 caracteres.",
  },
};

export function DevEngineUlidGenerator() {
  const { locale } = useI18n();
  const L = (k: string) => LABELS[k]?.[locale] ?? LABELS[k]?.en ?? k;
  const [count, setCount] = useState(10);
  const [items, setItems] = useState<{ ulid: string; ts: number }[]>([]);

  const generate = useCallback(() => {
    const now = Date.now();
    const list: { ulid: string; ts: number }[] = [];
    for (let i = 0; i < count; i++) {
      const ulid = generateUlid(now);
      const p = parseUlid(ulid);
      list.push({ ulid, ts: p.ok ? p.timestamp : now });
    }
    setItems(list);
  }, [count]);

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <ToolPanel>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-[14px] font-medium" htmlFor="ulid-count">
            {L("count")}
            <input
              id="ulid-count"
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value) || 1)))}
              className="field mono w-20 py-1.5"
            />
          </label>
          <button
            type="button"
            onClick={generate}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium hover:bg-[var(--color-surface)]"
          >
            {L("generate")}
          </button>
          <CopyButton value={items.map((x) => x.ulid).join("\n")} />
        </div>

        <div>
          <div className="mb-2 grid grid-cols-[1fr_auto] gap-2 text-[12px] font-semibold text-[var(--color-sub)] sm:grid-cols-[1fr_auto_auto]">
            <span>{L("ulids")}</span>
            <span className="hidden sm:block">{L("localTime")}</span>
            <span>{L("timestamp")}</span>
          </div>
          <div className="space-y-2">
            {items.map((it, i) => (
              <div key={`${it.ulid}-${i}`} className="flex items-center gap-2 rounded-lg border hairline px-3 py-2">
                <code className="mono min-w-0 flex-1 break-all text-[13px]">{it.ulid}</code>
                <time className="mono hidden text-[12px] text-[var(--color-sub)] sm:block">
                  {new Date(it.ts).toLocaleString(locale)}
                </time>
                <span className="mono w-36 text-right text-[12px] text-[var(--color-sub)]">{it.ts}</span>
                <CopyButton value={it.ulid} />
              </div>
            ))}
          </div>
        </div>

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{L("localNote")}</p>
      </div>
    </ToolPanel>
  );
}
