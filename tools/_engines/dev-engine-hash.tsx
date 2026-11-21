"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, DropZone, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

/**
 * 哈希通用引擎:SHA-1/256/384/512 走 WebCrypto,MD5 动态 import js-md5。
 * algos/defaultAlgo 由服务端工具文件以字符串 prop 传入(hash-generator、
 * md5-generator、sha256-generator 三个页面共用)。
 */

import { encodeDigest, ripemd160Bytes, sha224Bytes, type DigestEncoding } from "../_lib/hash-digests";

type Algo = "MD5" | "SHA-224" | "RIPEMD-160" | "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

const TAB_LABELS: Record<string, Record<string, string>> = {
  text: { en: "Text", zh: "文本", ja: "テキスト", es: "Texto", pt: "Texto" },
  file: { en: "File", zh: "文件", ja: "ファイル", es: "Archivo", pt: "Arquivo" },
};

async function digestBytes(algo: Algo, data: ArrayBuffer | string): Promise<Uint8Array> {
  if (algo === "MD5") {
    const { md5 } = await import("js-md5");
    return new Uint8Array(md5.arrayBuffer(data));
  }
  if (algo === "SHA-224") return sha224Bytes(typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data));
  if (algo === "RIPEMD-160") return ripemd160Bytes(typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data));
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
  return new Uint8Array(await crypto.subtle.digest(algo, bytes));
}

const ENC_LABELS: Record<DigestEncoding, Record<string, string>> = {
  hex: { en: "HEX", zh: "十六进制", ja: "16進数", es: "Hexadecimal", pt: "Hexadecimal" },
  base64: { en: "Base64", zh: "Base64", ja: "Base64", es: "Base64", pt: "Base64" },
  base64url: { en: "Base64url", zh: "Base64url", ja: "Base64url", es: "Base64url", pt: "Base64url" },
  binary: { en: "Binary", zh: "二进制", ja: "2進数", es: "Binario", pt: "Binário" },
};

export function DevHashEngine({ algos, defaultAlgo }: { algos: Algo[]; defaultAlgo?: Algo }) {
  const { locale, t } = useI18n();
  const [algo, setAlgo] = useState<Algo>(defaultAlgo ?? algos[0] ?? "SHA-256");
  const [tab, setTab] = useState<"text" | "file">("text");
  const [input, setInput] = useState("");
  const [textHash, setTextHash] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [fileMeta, setFileMeta] = useState<{ name: string; size: number } | null>(null);
  const [encoding, setEncoding] = useState<DigestEncoding>("hex");
  const [busy, setBusy] = useState(false);
  const seq = useRef(0);

  useEffect(() => {
    const id = ++seq.current;
    if (!input.trim()) {
      setTextHash("");
      return;
    }
    setBusy(true);
    const timer = setTimeout(async () => {
      try {
        const h = encodeDigest(await digestBytes(algo, input), encoding);
        if (seq.current === id) setTextHash(h);
      } catch {
        if (seq.current === id) setTextHash("");
      } finally {
        if (seq.current === id) setBusy(false);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [input, algo, encoding]);

  const onFile = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;
      const id = ++seq.current;
      setBusy(true);
      setFileMeta({ name: file.name, size: file.size });
      setFileHash("");
      try {
        const h = encodeDigest(await digestBytes(algo, await file.arrayBuffer()), encoding);
        if (seq.current === id) setFileHash(h);
      } catch {
        if (seq.current === id) setFileHash("");
      } finally {
        if (seq.current === id) setBusy(false);
      }
    },
    [algo, encoding],
  );

  const shown = tab === "text" ? textHash : fileHash;

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {(["text", "file"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                tab === key
                  ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {TAB_LABELS[key][locale] ?? TAB_LABELS[key].en}
            </button>
          ))}
          {algos.length > 1 && <span aria-hidden className="mx-1 hidden w-px bg-[var(--color-hairline)] sm:block" />}
          {algos.length > 1 &&
            algos.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAlgo(a)}
                className={`mono rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  algo === a
                    ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {a}
              </button>
            ))}
          {(
            <span aria-hidden className="mx-1 hidden w-px bg-[var(--color-hairline)] sm:block" />
          )}
          {(Object.keys(ENC_LABELS) as DigestEncoding[]).map((enc) => (
              <button
                key={enc}
                type="button"
                onClick={() => setEncoding(enc)}
                aria-pressed={encoding === enc}
                className={`rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                  encoding === enc
                    ? "border-transparent bg-[var(--color-accent)] text-white"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {ENC_LABELS[enc][locale] ?? ENC_LABELS[enc].en}
              </button>
            ))}
        </div>

        {tab === "text" ? (
          <textarea
            className="field mono"
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.common.input}
            spellCheck={false}
            aria-label={t.common.input}
          />
        ) : (
          <DropZone onFiles={onFile} multiple={false} />
        )}

        {busy && <p className="text-[13px] text-[var(--color-sub)]">{t.common.processing}</p>}

        {shown && (
          <div>
            {fileMeta && tab === "file" && (
              <p className="mono mb-1 text-[13px] text-[var(--color-sub)]">
                {fileMeta.name} · {formatBytes(fileMeta.size)}
              </p>
            )}
            <p className="mono break-all rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5 text-[13.5px] leading-5">
              {shown}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2.5">
          <CopyButton value={shown} />
          {tab === "text" && (
            <button
              type="button"
              onClick={() => setInput("")}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              {t.common.clear}
            </button>
          )}
        </div>
      </div>
    </ToolPanel>
  );
}
