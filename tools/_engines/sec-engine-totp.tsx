"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

/**
 * TOTP 验证码生成器(RFC 6238)—— WebCrypto HMAC,完全离线。
 * 支持直接粘贴 base32 密钥或 otpauth:// 迁移链接;
 * 可选 6/8 位、30/60 秒周期、SHA-1/SHA-256/SHA-512。
 * 密钥只存在于浏览器内存中,绝不发送、不存储。
 */

const LABELS: Record<string, Record<string, string>> = {
  title: { en: "TOTP code", zh: "验证码", ja: "認証コード", es: "Código", pt: "Código" },
  placeholder: {
    en: "Paste your base32 secret (e.g. JBSW Y3DP EHPK 3PXP) or an otpauth:// link",
    zh: "粘贴 base32 密钥(如 JBSW Y3DP EHPK 3PXP)或 otpauth:// 链接",
    ja: "base32 シークレット(例:JBSW Y3DP EHPK 3PXP)か otpauth:// リンクを貼り付け",
    es: "Pega tu secreto base32 (p. ej. JBSW Y3DP EHPK 3PXP) o un enlace otpauth://",
    pt: "Cole seu segredo base32 (ex.: JBSW Y3DP EHPK 3PXP) ou um link otpauth://",
  },
  digits: { en: "Digits", zh: "位数", ja: "桁数", es: "Dígitos", pt: "Dígitos" },
  period: { en: "Period", zh: "周期", ja: "周期", es: "Periodo", pt: "Período" },
  algorithm: { en: "Algorithm", zh: "算法", ja: "アルゴリズム", es: "Algoritmo", pt: "Algoritmo" },
  seconds: { en: "s", zh: "秒", ja: "秒", es: "s", pt: "s" },
  expiresIn: {
    en: "Expires in {n} s",
    zh: "{n} 秒后刷新",
    ja: "{n} 秒後に更新",
    es: "Caduca en {n} s",
    pt: "Expira em {n} s",
  },
  errShort: {
    en: "That secret is too short — TOTP keys are at least 10 base32 characters.",
    zh: "密钥太短——TOTP 密钥至少需要 10 个 base32 字符。",
    ja: "シークレットが短すぎます。TOTP 鍵は base32 で 10 文字以上必要です。",
    es: "El secreto es demasiado corto: las claves TOTP tienen al menos 10 caracteres base32.",
    pt: "O segredo é curto demais — chaves TOTP têm pelo menos 10 caracteres base32.",
  },
  errChars: {
    en: "That doesn't look like a valid base32 secret. Allowed characters: A–Z and 2–7 (spaces and = are ignored).",
    zh: "这不像有效的 base32 密钥。允许的字符:A–Z 和 2–7(空格和 = 会被忽略)。",
    ja: "有効な base32 シークレットではないようです。使える文字は A–Z と 2–7 です(空白と = は無視されます)。",
    es: "No parece un secreto base32 válido. Caracteres permitidos: A–Z y 2–7 (los espacios y = se ignoran).",
    pt: "Não parece um segredo base32 válido. Caracteres permitidos: A–Z e 2–7 (espaços e = são ignorados).",
  },
  enterFirst: {
    en: "Paste a secret above to see live codes.",
    zh: "在上方粘贴密钥即可实时生成验证码。",
    ja: "シークレットを貼り付けるとコードがリアルタイムで表示されます。",
    es: "Pega un secreto arriba para ver códigos en vivo.",
    pt: "Cole um segredo acima para ver códigos em tempo real.",
  },
  offlineNote: {
    en: "Works fully offline: the code is computed with WebCrypto in your browser and the secret is never sent or stored.",
    zh: "完全离线可用:验证码由浏览器内的 WebCrypto 计算,密钥不会被发送或存储。",
    ja: "完全オフラインで動作:コードはブラウザ内の WebCrypto で計算され、シークレットは送信・保存されません。",
    es: "Funciona totalmente sin conexión: el código se calcula con WebCrypto en tu navegador y el secreto nunca se envía ni se guarda.",
    pt: "Funciona totalmente offline: o código é calculado com WebCrypto no seu navegador e o segredo nunca é enviado nem armazenado.",
  },
  fromLink: {
    en: "Imported from otpauth link{extra}",
    zh: "已从 otpauth 链接导入{extra}",
    ja: "otpauth リンクから読み込みました{extra}",
    es: "Importado del enlace otpauth{extra}",
    pt: "Importado do link otpauth{extra}",
  },
  forAccount: { en: " for {account}", zh: "({account})", ja: "({account})", es: " de {account}", pt: " de {account}" },
};

const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

/** RFC 4648 base32 解码(忽略空白与填充) */
function base32Decode(input: string): Uint8Array<ArrayBuffer> | null {
  const clean = input.toUpperCase().replace(/[\s=-]/g, "");
  if (clean.length === 0) return null;
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const ch of clean) {
    const idx = B32.indexOf(ch);
    if (idx === -1) return null;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(out);
}

type TotpAlgo = "SHA-1" | "SHA-256" | "SHA-512";
const ALGOS: TotpAlgo[] = ["SHA-1", "SHA-256", "SHA-512"];

async function hotp(key: Uint8Array<ArrayBuffer>, counter: number, algo: TotpAlgo, digits: number): Promise<string> {
  const buf = new ArrayBuffer(8);
  const view = new DataView(buf);
  view.setUint32(0, Math.floor(counter / 0x100000000));
  view.setUint32(4, counter >>> 0);
  const cryptoKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: algo }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", cryptoKey, buf));
  const off = mac[mac.length - 1] & 0x0f;
  const bin =
    ((mac[off] & 0x7f) << 24) | (mac[off + 1] << 16) | (mac[off + 2] << 8) | mac[off + 3];
  return String(bin % 10 ** digits).padStart(digits, "0");
}

/** 解析 otpauth://totp/… 链接,返回规范化参数 */
function parseOtpauth(
  raw: string,
): { secret: string; digits?: number; period?: number; algo?: TotpAlgo; account?: string } | null {
  const m = raw.trim().match(/^otpauth:\/\/totp\/?([^?]*)\?(.*)$/i);
  if (!m) return null;
  const params = new URLSearchParams(m[2]);
  const secret = (params.get("secret") ?? "").replace(/\s/g, "");
  if (!secret) return null;
  const label = decodeURIComponent(m[1] ?? "");
  const account = label.includes(":") ? label.split(":").pop()?.trim() : label.trim();
  const algoRaw = (params.get("algorithm") ?? "").toUpperCase().replace("-", "");
  const algo = ALGOS.find((a) => a.replace("-", "") === algoRaw);
  const digitsRaw = Number(params.get("digits"));
  const periodRaw = Number(params.get("period"));
  return {
    secret,
    digits: digitsRaw === 6 || digitsRaw === 8 ? digitsRaw : undefined,
    period: periodRaw === 30 || periodRaw === 60 ? periodRaw : undefined,
    algo,
    account: account || undefined,
  };
}

export function SecTotpEngine() {
  const { locale } = useI18n();
  const L = (key: string) => LABELS[key][locale] ?? LABELS[key].en;

  const [input, setInput] = useState("");
  const [digits, setDigits] = useState(6);
  const [period, setPeriod] = useState(30);
  const [algo, setAlgo] = useState<TotpAlgo>("SHA-1");
  const [now, setNow] = useState(() => Date.now());
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imported, setImported] = useState<string | null>(null);

  // 解析输入:otpauth 链接或裸 base32 密钥(渲染期纯解析,副作用交给 effect)
  const parsed = useMemo(() => {
    const s = input.trim();
    if (!s) return { kind: "empty" as const };
    let secret = s;
    let link: { digits?: number; period?: number; algo?: TotpAlgo; account?: string } | null = null;
    if (/^otpauth:\/\//i.test(s)) {
      const p = parseOtpauth(s);
      if (!p) return { kind: "invalid" as const };
      secret = p.secret;
      link = { digits: p.digits, period: p.period, algo: p.algo, account: p.account };
    }
    if (secret.length < 10) return { kind: "short" as const };
    const decoded = base32Decode(secret);
    if (!decoded) return { kind: "invalid" as const };
    return { kind: "ok" as const, key: decoded, link };
  }, [input]);

  const key = parsed.kind === "ok" ? parsed.key : null;

  // 同步解析结果到错误提示 / 链接参数
  useEffect(() => {
    if (parsed.kind === "invalid") {
      setError(L("errChars"));
      setImported(null);
      return;
    }
    if (parsed.kind === "short") {
      setError(L("errShort"));
      setImported(null);
      return;
    }
    setError(null);
    if (parsed.kind === "ok" && parsed.link) {
      if (parsed.link.digits) setDigits(parsed.link.digits);
      if (parsed.link.period) setPeriod(parsed.link.period);
      if (parsed.link.algo) setAlgo(parsed.link.algo);
      const extra = parsed.link.account
        ? L("forAccount").replace("{account}", parsed.link.account)
        : "";
      setImported(L("fromLink").replace("{extra}", extra));
    } else {
      setImported(null);
    }
  }, [parsed, locale]); // eslint-disable-line react-hooks/exhaustive-deps

  // 500ms 心跳驱动倒计时
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, []);

  const counter = Math.floor(now / 1000 / period);
  const remaining = period - (Math.floor(now / 1000) % period);

  useEffect(() => {
    let cancelled = false;
    if (!key) {
      setCode(null);
      return;
    }
    void hotp(key, counter, algo, digits).then((c) => {
      if (!cancelled) setCode(c);
    });
    return () => {
      cancelled = true;
    };
  }, [key, counter, algo, digits]);

  const progress = remaining / period;

  return (
    <ToolPanel>
      <div className="space-y-4">
        <textarea
          className="field mono"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={L("placeholder")}
          spellCheck={false}
          autoComplete="off"
          aria-label={L("placeholder")}
        />

        <div className="flex flex-wrap gap-4">
          <label className="inline-flex items-center gap-2 text-[14px]">
            <span>{L("digits")}</span>
            <select
              value={digits}
              onChange={(e) => setDigits(Number(e.target.value))}
              className="field w-auto py-1.5 text-[14px]"
            >
              <option value={6}>6</option>
              <option value={8}>8</option>
            </select>
          </label>
          <label className="inline-flex items-center gap-2 text-[14px]">
            <span>{L("period")}</span>
            <select
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="field w-auto py-1.5 text-[14px]"
            >
              <option value={30}>30 {L("seconds")}</option>
              <option value={60}>60 {L("seconds")}</option>
            </select>
          </label>
          <label className="inline-flex items-center gap-2 text-[14px]">
            <span>{L("algorithm")}</span>
            <select
              value={algo}
              onChange={(e) => setAlgo(e.target.value as TotpAlgo)}
              className="field mono w-auto py-1.5 text-[14px]"
            >
              {ALGOS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
        </div>

        {imported && <p className="text-[13px] leading-5 text-[var(--color-sub)]">{imported}</p>}

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-[rgba(178,80,0,0.08)] px-4 py-2.5 text-[13.5px] leading-6 text-[var(--color-bad)]"
          >
            {error}
          </p>
        )}

        {!key && !error && <p className="text-[13.5px] text-[var(--color-sub)]">{L("enterFirst")}</p>}

        {key && !error && (
          <div className="rounded-xl bg-[var(--color-surface)] px-4 py-5">
            <p className="mb-1 text-[12.5px] font-medium uppercase tracking-wide text-[var(--color-sub)]">
              {L("title")}
            </p>
            <p className="mono text-[34px] font-bold leading-none tracking-[0.18em] tabular-nums sm:text-[40px]">
              {code ? (digits === 6 ? `${code.slice(0, 3)} ${code.slice(3)}` : `${code.slice(0, 4)} ${code.slice(4)}`) : "…"}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--color-card)]">
                <div
                  className="h-full rounded-full bg-[var(--color-accent)] transition-[width] duration-500 ease-linear"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="mono w-8 text-right text-[13.5px] font-semibold text-[var(--color-sub)] tabular-nums">
                {remaining}
              </span>
            </div>
          </div>
        )}

        {code && (
          <div className="flex flex-wrap gap-2.5">
            <CopyButton value={code} />
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{L("offlineNote")}</p>
      </div>
    </ToolPanel>
  );
}
