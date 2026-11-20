"use client";

import { useId, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { HTML_LANG } from "@/lib/i18n";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { decodeJwt, JWT_INPUT_LIMIT, jwtTimeClaim } from "@/tools/_lib/jwt";
import { jwtCopy } from "@/tools/_lib/jwt-copy";

/**
 * 编解码通用引擎:base64 编/解码(UTF-8 安全)、URL 编/解码、JWT 解码。
 * codec 由服务端工具文件以字符串 prop 传入。
 */

type Codec = "base64-encode" | "base64-decode" | "url-encode" | "url-decode" | "jwt-decode";

function base64Encode(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(bin);
}

function base64Decode(s: string): string {
  const clean = s.replace(/\s+/g, "").replace(/^data:[^;,]*;base64,/, "");
  const bin = atob(clean);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

const L = {
  plus: {
    en: "Treat + as space",
    zh: "把 + 当作空格",
    ja: "+ を空白として扱う",
    es: "Tratar + como espacio",
    pt: "Tratar + como espaço",
  },
  header: { en: "Header", zh: "Header(头部)", ja: "Header(ヘッダー)", es: "Header (encabezado)", pt: "Header (cabeçalho)" },
  payload: { en: "Payload", zh: "Payload(负载)", ja: "Payload(ペイロード)", es: "Payload (carga útil)", pt: "Payload (carga útil)" },
  signature: { en: "Signature", zh: "Signature(签名)", ja: "Signature(署名)", es: "Signature (firma)", pt: "Signature (assinatura)" },
  component: { en: "encodeURIComponent", zh: "encodeURIComponent", ja: "encodeURIComponent", es: "encodeURIComponent", pt: "encodeURIComponent" },
  full: { en: "encodeURI", zh: "encodeURI", ja: "encodeURI", es: "encodeURI", pt: "encodeURI" },
  fullDecode: { en: "decodeURI", zh: "decodeURI", ja: "decodeURI", es: "decodeURI", pt: "decodeURI" },
};

type Label = Record<string, string>;
const pick = (label: Label, locale: string) => label[locale] ?? label.en;

export function DevEncoderEngine({ codec }: { codec: Codec }) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [component, setComponent] = useState(true);
  const [plusAsSpace, setPlusAsSpace] = useState(false);
  const [decodedAt, setDecodedAt] = useState(0);
  const id = useId();
  const jwtLabels = jwtCopy(locale);

  const isJwt = codec === "jwt-decode";
  const isUrl = codec === "url-encode" || codec === "url-decode";

  const result = useMemo(() => {
    const src = input;
    if (codec === "jwt-decode" && src.length > JWT_INPUT_LIMIT) return { out: "", err: jwtCopy(locale).error, jwt: null };
    if (!src.trim()) return { out: "", err: null as string | null, jwt: null };
    if (codec === "base64-encode") {
      try {
        return { out: base64Encode(src), err: null, jwt: null };
      } catch (e) {
        return { out: "", err: msg(e), jwt: null };
      }
    }
    if (codec === "base64-decode") {
      try {
        return { out: base64Decode(src), err: null, jwt: null };
      } catch (e) {
        return { out: "", err: msg(e), jwt: null };
      }
    }
    if (codec === "url-encode") {
      try {
        return { out: component ? encodeURIComponent(src) : encodeURI(src), err: null, jwt: null };
      } catch (e) {
        return { out: "", err: msg(e), jwt: null };
      }
    }
    if (codec === "url-decode") {
      try {
        const prepared = plusAsSpace ? src.replace(/\+/g, " ") : src;
        return {
          out: component ? decodeURIComponent(prepared) : decodeURI(prepared),
          err: null,
          jwt: null,
        };
      } catch (e) {
        return { out: "", err: msg(e), jwt: null };
      }
    }
    // jwt-decode
    try {
      return { out: "", err: null, jwt: decodeJwt(src) };
    } catch {
      return { out: "", err: jwtCopy(locale).error, jwt: null };
    }
  }, [input, codec, component, plusAsSpace, locale]);

  const claims = useMemo(() => {
    if (!result.jwt) return [];
    const formatter = new Intl.DateTimeFormat(HTML_LANG[locale] ?? HTML_LANG.en, { dateStyle: "medium", timeStyle: "medium" });
    return result.jwt.claims.map(({ key, raw }) => {
      const claim = jwtTimeClaim(raw, decodedAt);
      return { key, ...claim, date: claim.date ? formatter.format(claim.date) : null };
    });
  }, [result.jwt, locale, decodedAt]);

  return (
    <ToolPanel>
      <div className="space-y-4" data-encoder-tool={codec}>
        {isJwt && <div className="space-y-1.5 text-[13px] leading-5 text-[var(--color-sub)]">
          <p id={`${id}-note`}>{jwtLabels.note}</p>
          <p id={`${id}-limits`}>{jwtLabels.limits}</p>
        </div>}
        <textarea
          className="field mono"
          rows={isJwt ? 5 : 6}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (isJwt) setDecodedAt(Date.now() / 1000);
          }}
          placeholder={t.common.input}
          spellCheck={false}
          aria-label={t.common.input}
          aria-invalid={!!result.err}
          aria-describedby={[isJwt ? `${id}-note ${id}-limits` : "", result.err ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined}
          dir={isJwt ? "ltr" : undefined}
        />

        {isUrl && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setComponent(true)}
              aria-pressed={component}
              className={`mono rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                component
                  ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {pick(L.component, locale)}
            </button>
            <button
              type="button"
              onClick={() => setComponent(false)}
              aria-pressed={!component}
              className={`mono rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                !component
                  ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {codec === "url-decode" ? pick(L.fullDecode, locale) : pick(L.full, locale)}
            </button>
            {codec === "url-decode" && (
              <label className="ml-1 inline-flex cursor-pointer items-center gap-2 text-[14px]">
                <input
                  type="checkbox"
                  className="accent-[var(--color-accent)]"
                  checked={plusAsSpace}
                  onChange={(e) => setPlusAsSpace(e.target.checked)}
                />
                {pick(L.plus, locale)}
              </label>
            )}
          </div>
        )}

        {result.err && (
          <p
            className="mono whitespace-pre-wrap rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
            role="alert"
            id={`${id}-error`}
          >
            {result.err}
          </p>
        )}

        {result.jwt ? (
          <div className="space-y-3">
            <JwtBlock caption={pick(L.header, locale)} value={result.jwt.headerText} />
            <JwtBlock caption={pick(L.payload, locale)} value={result.jwt.payloadText} />
            {claims.length > 0 && (
              <div className="space-y-1">
                {claims.map((c) => (
                  <p key={c.key} className="mono text-[13px] leading-5 text-[var(--color-sub)]">
                    <span className="font-semibold text-[var(--color-ink)]">{c.key}</span>
                    {" → "}
                    {c.date ?? (c.issue === "type" ? jwtLabels.type : jwtLabels.range)}
                    {c.key === "exp" && c.date && (
                      <span className={c.expired ? "text-[var(--color-bad)]" : "text-[var(--color-good)]"}>
                        {" "}
                        ({c.expired ? jwtLabels.expired : jwtLabels.active})
                      </span>
                    )}
                  </p>
                ))}
              </div>
            )}
            <div>
              <p className="mb-1 text-[13px] font-semibold">{pick(L.signature, locale)}</p>
              {result.jwt.signature ? (
                <p className="mono break-all rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5 text-[13px] leading-5">
                  {result.jwt.signature}
                </p>
              ) : (
                <p className="text-[13.5px] text-[var(--color-sub)]">{jwtLabels.missing}</p>
              )}
            </div>
          </div>
        ) : (
          !isJwt && (
            <textarea
              className="field mono bg-[var(--color-surface)]"
              rows={6}
              value={result.out}
              readOnly
              placeholder={t.common.output}
              spellCheck={false}
              aria-label={t.common.output}
            />
          )
        )}

        <div className="flex flex-wrap gap-2.5">
          {!isJwt && <CopyButton value={result.out} />}
          {isJwt && result.jwt && <CopyButton value={result.jwt.payloadText} />}
          <button
            type="button"
            onClick={() => setInput("")}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
        </div>
      </div>
    </ToolPanel>
  );
}

function JwtBlock({ caption, value }: { caption: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-[13px] font-semibold">{caption}</p>
      <pre tabIndex={0} role="region" aria-label={caption} dir="ltr" className="mono overflow-x-auto rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5 text-[13px] leading-5">
        {value}
      </pre>
    </div>
  );
}

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}
