"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

/**
 * Token 生成器:crypto.getRandomValues 本地生成。
 * 选项:长度 8–128、字符集(alphanumeric / hex / 带符号)、批量 N 个、可选前缀。
 * 一次性显示 10 个,Refresh 重新生成。
 */

const LABELS: Record<string, Record<string, string>> = {
  length: { en: "Length", zh: "长度", ja: "文字数", es: "Longitud", pt: "Comprimento" },
  charset: { en: "Character set", zh: "字符集", ja: "文字種", es: "Conjunto de caracteres", pt: "Conjunto de caracteres" },
  alnum: { en: "Alphanumeric (A–Z, a–z, 0–9)", zh: "字母数字(A–Z、a–z、0–9)", ja: "英数字(A–Z、a–z、0–9)", es: "Alfanumérico (A–Z, a–z, 0–9)", pt: "Alfanumérico (A–Z, a–z, 0–9)" },
  hex: { en: "Hex (0–9, a–f)", zh: "十六进制(0–9、a–f)", ja: "16 進(0–9、a–f)", es: "Hexadecimal (0–9, a–f)", pt: "Hexadecimal (0–9, a–f)" },
  withSymbols: { en: "With symbols (-_~)", zh: "带符号(-_~)", ja: "記号付き(-_~)", es: "Con símbolos (-_~)", pt: "Com símbolos (-_~)" },
  count: { en: "How many", zh: "生成数量", ja: "生成数", es: "Cantidad", pt: "Quantidade" },
  prefix: { en: "Prefix (optional)", zh: "前缀(可选)", ja: "接頭辞(任意)", es: "Prefijo (opcional)", pt: "Prefixo (opcional)" },
  refresh: { en: "Refresh", zh: "换一批", ja: "再生成", es: "Actualizar", pt: "Atualizar" },
  tokens: { en: "Tokens", zh: "Token 列表", ja: "トークン一覧", es: "Tokens", pt: "Tokens" },
  entropy: { en: "Entropy per token", zh: "单个 Token 熵", ja: "1 個あたりのエントロピー", es: "Entropía por token", pt: "Entropia por token" },
  localNote: {
    en: "Generated in your browser with crypto.getRandomValues — never sent, never stored.",
    zh: "由浏览器通过 crypto.getRandomValues 本地生成——不发送、不存储。",
    ja: "ブラウザ内で crypto.getRandomValues を使って生成。送信も保存もされません。",
    es: "Generado en tu navegador con crypto.getRandomValues: no se envía ni se guarda nunca.",
    pt: "Gerado no seu navegador com crypto.getRandomValues — nunca enviado nem armazenado.",
  },
};

const POOLS: Record<string, string> = {
  alnum: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  hex: "0123456789abcdef",
  withSymbols: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_~",
};

/** 无模偏差随机整数 [0, n) */
function randInt(n: number): number {
  const buf = new Uint32Array(1);
  const limit = 0x100000000 - (0x100000000 % n);
  let x: number;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % n;
}

function generateToken(pool: string, length: number, prefix: string): string {
  let s = prefix;
  for (let i = 0; i < length; i++) s += pool[randInt(pool.length)];
  return s;
}

const COUNT = 10;

export function DevEngineTokenGenerator() {
  const { locale } = useI18n();
  const L = (k: string) => LABELS[k]?.[locale] ?? LABELS[k]?.en ?? k;

  const [length, setLength] = useState(32);
  const [charset, setCharset] = useState<"alnum" | "hex" | "withSymbols">("alnum");
  const [count, setCount] = useState(10);
  const [prefix, setPrefix] = useState("");
  const [tokens, setTokens] = useState<string[]>([]);

  const generate = useCallback(() => {
    const pool = POOLS[charset];
    const list: string[] = [];
    for (let i = 0; i < COUNT; i++) list.push(generateToken(pool, length, prefix));
    setTokens(list);
  }, [charset, length, prefix]);

  useEffect(() => {
    generate();
  }, [generate]);

  const bits = Math.round(length * Math.log2(POOLS[charset].length));

  return (
    <ToolPanel>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-3 text-[14px] font-medium">
            {L("length")}
            <input
              type="range"
              min={8}
              max={128}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-44"
              aria-label={L("length")}
            />
            <span className="mono w-8 text-right font-semibold">{length}</span>
          </label>
          <label className="flex items-center gap-2 text-[14px] font-medium">
            {L("count")}
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value) || 1)))}
              className="field mono w-20 py-1.5"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["alnum", "hex", "withSymbols"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCharset(c)}
              className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors ${
                charset === c
                  ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {L(c)}
            </button>
          ))}
        </div>

        <label className="flex flex-wrap items-center gap-2 text-[14px] font-medium">
          {L("prefix")}
          <input
            className="field mono w-40 py-1.5"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder="tok_"
            spellCheck={false}
          />
        </label>

        <p className="text-[13.5px] text-[var(--color-sub)]">
          {L("entropy")}: <span className="mono font-semibold text-[var(--color-ink)]">{bits}</span> bits
        </p>

        <div>
          <p className="mb-2 text-[13px] font-semibold">{L("tokens")}</p>
          <div className="space-y-2">
            {tokens.slice(0, count).map((t, i) => (
              <div key={`${t}-${i}`} className="flex items-center gap-2 rounded-lg border hairline px-3 py-2">
                <code className="mono min-w-0 flex-1 break-all text-[13px]">{t}</code>
                <CopyButton value={t} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={generate}
            className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {L("refresh")}
          </button>
          <CopyButton value={tokens.slice(0, count).join("\n")} />
        </div>

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{L("localNote")}</p>
      </div>
    </ToolPanel>
  );
}
