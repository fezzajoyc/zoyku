"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Note, Sel, pick } from "./calc-ui";

/**
 * Bulk UUID v4 generator. Uses crypto.randomUUID with a manual
 * crypto.getRandomValues fallback; everything is local, nothing is stored.
 */

function uuid4(): string {
  const c = globalThis.crypto as Crypto | undefined;
  if (c && typeof c.randomUUID === "function") return c.randomUUID();
  if (c && typeof c.getRandomValues === "function") {
    const b = new Uint8Array(16);
    c.getRandomValues(b);
    b[6] = (b[6] & 0x0f) | 0x40; // version 4
    b[8] = (b[8] & 0x3f) | 0x80; // RFC 4122 variant
    const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  }
  // last resort (non-secure contexts without WebCrypto): Math.random-based v4
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (s) => {
    const v = Number(s);
    return (v ^ (Math.floor(Math.random() * 256) & (15 >> (v / 4)))).toString(16);
  });
}

const COUNTS = [5, 10, 25, 50];

export function CalcEngineUuid() {
  const { locale } = useI18n();
  const [count, setCount] = useState(10);
  const [ids, setIds] = useState<string[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setIds(Array.from({ length: count }, () => uuid4()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, tick]);

  const regenerate = useCallback(() => setTick((t) => t + 1), []);

  return (
    <ToolPanel>
      <div className="flex flex-wrap items-end gap-3">
        <div className="w-40">
          <Sel value={String(count)} onChange={(v) => setCount(Number(v))} aria="number of uuids">
            {COUNTS.map((n) => (
              <option key={n} value={n}>
                {n} UUID{n > 1 && locale !== "zh" ? "s" : ""}
              </option>
            ))}
          </Sel>
        </div>
        <button
          type="button"
          onClick={regenerate}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white transition-opacity hover:opacity-90"
        >
          {pick(locale, { en: "Generate", zh: "重新生成", ja: "生成", es: "Generar", pt: "Gerar" })}
        </button>
        <CopyButton value={() => ids.join("\n")} label={pick(locale, { en: "Copy all", zh: "复制全部", ja: "すべてコピー", es: "Copiar todo", pt: "Copiar tudo" })} />
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border hairline">
        <ul className="divide-y" style={{ borderColor: "var(--color-hairline)" }}>
          {ids.map((id, i) => (
            <li key={`${tick}-${i}`} className="flex items-center justify-between gap-3 px-3.5 py-2.5">
              <code className="mono min-w-0 flex-1 truncate text-[14px]">{id}</code>
              <CopyButton value={id} label={pick(locale, { en: "Copy", zh: "复制", ja: "コピー", es: "Copiar", pt: "Copiar" })} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "These are RFC 4122 version 4 UUIDs: 122 random bits from your device's cryptographic random source. If you need time-ordered identifiers, look for the newer v7 variant — same shape, sortable by creation time.",
            zh: "这里生成的是 RFC 4122 版本 4 UUID:122 位随机位来自设备的加密随机源。如需按时间排序的标识符,请了解较新的 v7 变体——格式相同,但按创建时间有序。",
            ja: "生成されるのは RFC 4122 バージョン 4 の UUID です。122 ビットのランダム値をデバイスの暗号学的乱数源から取得します。時刻順に並ぶ識別子が必要な場合は、新しい v7 を検討してください。同じ形式で作成時刻順にソートできます。",
            es: "Son UUID versión 4 de RFC 4122: 122 bits aleatorios de la fuente criptográfica de tu dispositivo. Si necesita identificadores ordenados por tiempo, busque la variante v7: misma forma, ordenable por creación.",
            pt: "São UUIDs versão 4 (RFC 4122): 122 bits aleatórios da fonte criptográfica do seu dispositivo. Se precisar de identificadores ordenados por tempo, procure a variante v7 — mesma forma, ordenável por criação.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}
