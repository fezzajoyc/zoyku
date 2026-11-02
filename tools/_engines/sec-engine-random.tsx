"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

/**
 * 随机数生成器 —— crypto.getRandomValues(53 位无模偏差抽样),本地生成。
 * 支持范围/数量/不重复/排序;展示总熵(位)。
 */

const LABELS: Record<string, Record<string, string>> = {
  min: { en: "Minimum", zh: "最小值", ja: "最小値", es: "Mínimo", pt: "Mínimo" },
  max: { en: "Maximum", zh: "最大值", ja: "最大値", es: "Máximo", pt: "Máximo" },
  quantity: { en: "How many", zh: "生成个数", ja: "個数", es: "Cantidad", pt: "Quantidade" },
  unique: {
    en: "No duplicates (unique draws)",
    zh: "不重复抽取",
    ja: "重複なし(ユニークな抽選)",
    es: "Sin repetir (sorteo único)",
    pt: "Sem repetição (sorteio único)",
  },
  sort: { en: "Sort ascending", zh: "升序排列", ja: "昇順に並べる", es: "Ordenar ascendente", pt: "Ordenar crescente" },
  generate: { en: "Generate", zh: "生成", ja: "生成", es: "Generar", pt: "Gerar" },
  errRange: {
    en: "Minimum must be less than or equal to maximum.",
    zh: "最小值不能大于最大值。",
    ja: "最小値は最大値以下にしてください。",
    es: "El mínimo debe ser menor o igual que el máximo.",
    pt: "O mínimo deve ser menor ou igual ao máximo.",
  },
  errUnique: {
    en: "Not enough numbers in the range for {n} unique draws. Lower the count or widen the range.",
    zh: "范围内的数字不够完成 {n} 个不重复抽取。请减少个数或扩大范围。",
    ja: "範囲内の数が {n} 個の重複なし抽選に足りません。個数を減らすか範囲を広げてください。",
    es: "No hay suficientes números en el rango para {n} extracciones únicas. Reduce la cantidad o amplía el rango.",
    pt: "Não há números suficientes na faixa para {n} sorteios únicos. Reduza a quantidade ou amplie a faixa.",
  },
  entropy: { en: "Entropy", zh: "熵", ja: "エントロピー", es: "Entropía", pt: "Entropia" },
  bits: { en: "bits", zh: "位", ja: "ビット", es: "bits", pt: "bits" },
  localNote: {
    en: "Drawn from your browser's cryptographic random number generator (crypto.getRandomValues) — nothing is sent anywhere.",
    zh: "取自浏览器的加密级随机数生成器(crypto.getRandomValues)——不发送任何数据。",
    ja: "ブラウザの暗号論的乱数生成器(crypto.getRandomValues)から抽出。データは一切送信されません。",
    es: "Extraídos del generador criptográfico de tu navegador (crypto.getRandomValues): no se envía nada.",
    pt: "Sorteados pelo gerador criptográfico do seu navegador (crypto.getRandomValues) — nada é enviado.",
  },
};

/** 无模偏差随机整数:[0, n),支持到 2^53 */
function randBelow(n: number): number {
  const buf = new Uint32Array(1);
  if (n <= 0x100000000) {
    const limit = 0x100000000 - (0x100000000 % n);
    let x: number;
    do {
      crypto.getRandomValues(buf);
      x = buf[0];
    } while (x >= limit);
    return x % n;
  }
  // 53 位:高 21 位 + 低 32 位
  const limit = 0x20000000000000 - (0x20000000000000 % n);
  let d: number;
  do {
    crypto.getRandomValues(buf);
    const lo = buf[0];
    crypto.getRandomValues(buf);
    const hi = buf[0] >>> 11;
    d = hi * 0x100000000 + lo;
  } while (d >= limit);
  return d % n;
}

function clampInt(v: string, min: number, max: number, fallback: number): number {
  const n = Math.round(Number(v));
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

export function SecRandomEngine() {
  const { locale } = useI18n();
  const L = (key: string) => LABELS[key][locale] ?? LABELS[key].en;

  const [minV, setMinV] = useState("1");
  const [maxV, setMaxV] = useState("100");
  const [quantity, setQuantity] = useState(1);
  const [unique, setUnique] = useState(false);
  const [sortAsc, setSortAsc] = useState(false);
  const [out, setOut] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const min = clampInt(minV, -1e15, 1e15, 1);
  const max = clampInt(maxV, -1e15, 1e15, 100);
  const range = max - min + 1;
  const needUnique = unique && quantity > 1;

  const bits = useMemo(() => {
    if (range <= 0) return 0;
    if (needUnique) {
      let b = 0;
      for (let i = 0; i < quantity; i++) b += Math.log2(range - i);
      return b;
    }
    return quantity * Math.log2(range);
  }, [range, quantity, needUnique]);

  const generate = useCallback(() => {
    if (range <= 0) {
      setError(L("errRange"));
      setOut([]);
      return;
    }
    if (needUnique && quantity > range) {
      setError(L("errUnique").replace("{n}", String(quantity)));
      setOut([]);
      return;
    }
    setError(null);
    if (needUnique) {
      // 部分 Fisher–Yates:虚拟池中抽 quantity 个不重复值
      const picked: number[] = [];
      const pool = new Map<number, number>(); // 索引 → 值(惰性映射,适合大范围)
      for (let i = 0; i < quantity; i++) {
        const j = i + randBelow(range - i);
        const vi = pool.has(i) ? pool.get(i)! : min + i;
        const vj = pool.has(j) ? pool.get(j)! : min + j;
        pool.set(i, vj);
        pool.set(j, vi);
        picked.push(vj);
      }
      const result = sortAsc ? picked.sort((a, b) => a - b) : picked;
      setOut(result);
      return;
    }
    const result: number[] = [];
    for (let i = 0; i < quantity; i++) result.push(min + randBelow(range));
    setOut(sortAsc ? result.sort((a, b) => a - b) : result);
  }, [min, max, range, quantity, needUnique, sortAsc, locale]);

  // 设置变化即重生成,保持所见即所得
  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <ToolPanel>
      <div className="space-y-5">
        <div className="flex flex-wrap gap-3">
          {(
            [
              ["min", minV, setMinV],
              ["max", maxV, setMaxV],
            ] as const
          ).map(([key, val, set]) => (
            <label key={key} className="inline-flex items-center gap-2 text-[14px]">
              <span>{L(key)}</span>
              <input
                type="number"
                className="field bare mono w-32 px-2.5 py-1.5 text-[14px]"
                value={val}
                onChange={(e) => set(e.target.value)}
                aria-label={L(key)}
              />
            </label>
          ))}
          <label className="inline-flex items-center gap-2 text-[14px]">
            <span>{L("quantity")}</span>
            <input
              type="number"
              className="field bare mono w-24 px-2.5 py-1.5 text-[14px]"
              min={1}
              max={1000}
              value={quantity}
              onChange={(e) => setQuantity(clampInt(e.target.value, 1, 1000, 1))}
              aria-label={L("quantity")}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          <label
            className={`inline-flex cursor-pointer select-none items-center gap-2 rounded-full border hairline px-3.5 py-1.5 text-[13.5px] font-medium transition-colors ${
              unique ? "bg-[var(--color-surface)]" : "opacity-60"
            }`}
          >
            <input
              type="checkbox"
              checked={unique}
              onChange={(e) => setUnique(e.target.checked)}
              className="accent-[var(--color-accent)]"
            />
            {L("unique")}
          </label>
          <label
            className={`inline-flex cursor-pointer select-none items-center gap-2 rounded-full border hairline px-3.5 py-1.5 text-[13.5px] font-medium transition-colors ${
              sortAsc ? "bg-[var(--color-surface)]" : "opacity-60"
            }`}
          >
            <input
              type="checkbox"
              checked={sortAsc}
              onChange={(e) => setSortAsc(e.target.checked)}
              className="accent-[var(--color-accent)]"
            />
            {L("sort")}
          </label>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-[rgba(178,80,0,0.08)] px-4 py-2.5 text-[13.5px] leading-6 text-[var(--color-bad)]"
          >
            {error}
          </p>
        )}

        {out.length > 0 && !error && (
          <div className="rounded-xl bg-[var(--color-surface)] px-4 py-4">
            <p className="mono flex flex-wrap gap-x-4 gap-y-1 text-[18px] font-semibold leading-7">
              {out.slice(0, 200).map((n, i) => (
                <span key={i}>{n.toLocaleString(locale === "zh" ? "zh-CN" : locale === "pt" ? "pt-BR" : locale)}</span>
              ))}
            </p>
            {out.length > 200 && (
              <p className="mt-2 text-[13px] text-[var(--color-sub)]">
                +{out.length - 200} …
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2.5">
          <CopyButton value={out.map((n) => String(n)).join("\n")} />
          <button
            type="button"
            onClick={generate}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {L("generate")}
          </button>
          {bits > 0 && !error && (
            <span className="ml-auto text-[13px] text-[var(--color-sub)]">
              {L("entropy")}: <span className="mono">{Math.round(bits)}</span> {L("bits")}
            </span>
          )}
        </div>

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{L("localNote")}</p>
      </div>
    </ToolPanel>
  );
}
