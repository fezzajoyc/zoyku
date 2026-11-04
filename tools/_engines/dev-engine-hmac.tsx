"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

/**
 * HMAC 引擎:用 WebCrypto 计算 HMAC-SHA-256/384/512/SHA-1。
 * 输出 hex + base64 双编码,常用在 webhook 签名、API 验证。
 */

type Algo = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

const L = {
  secret: { en: "Secret key", zh: "密钥", ja: "秘密鍵", es: "Clave secreta", pt: "Chave secreta" },
  secretPh: { en: "Enter the shared secret…", zh: "输入共享密钥…", ja: "共有シークレットを入力…", es: "Introduce el secreto compartido…", pt: "Introduza o segredo partilhado…" },
  message: { en: "Message", zh: "消息", ja: "メッセージ", es: "Mensaje", pt: "Mensagem" },
  messagePh: { en: "Paste the payload to sign…", zh: "粘贴要签名的内容…", ja: "署名するペイロードを貼り付け…", es: "Pega la carga útil a firmar…", pt: "Cole o payload a assinar…" },
  hex: { en: "Hex", zh: "十六进制", ja: "16進", es: "Hex", pt: "Hex" },
  b64: { en: "Base64", zh: "Base64", ja: "Base64", es: "Base64", pt: "Base64" },
} as Record<string, Record<string, string>>;

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function toB64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(s);
}

async function hmac(algo: Algo, secret: string, msg: string): Promise<ArrayBuffer> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: algo }, false, ["sign"]);
  return crypto.subtle.sign("HMAC", key, enc.encode(msg));
}

export function DevHmacEngine({ algos = ["SHA-256"], defaultAlgo }: { algos?: Algo[]; defaultAlgo?: Algo }) {
  const { locale, t } = useI18n();
  const [algo, setAlgo] = useState<Algo>(defaultAlgo ?? algos[0] ?? "SHA-256");
  const [secret, setSecret] = useState("");
  const [msg, setMsg] = useState("");
  const [hexOut, setHexOut] = useState("");
  const [b64Out, setB64Out] = useState("");
  const [busy, setBusy] = useState(false);
  const seq = useRef(0);

  useEffect(() => {
    const id = ++seq.current;
    if (!secret || !msg) {
      setHexOut("");
      setB64Out("");
      return;
    }
    setBusy(true);
    const timer = setTimeout(async () => {
      try {
        const buf = await hmac(algo, secret, msg);
        if (seq.current === id) {
          setHexOut(toHex(buf));
          setB64Out(toB64(buf));
        }
      } catch {
        if (seq.current === id) {
          setHexOut("");
          setB64Out("");
        }
      } finally {
        if (seq.current === id) setBusy(false);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [secret, msg, algo]);

  return (
    <ToolPanel>
      <div className="space-y-4">
        {algos.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {algos.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAlgo(a)}
                className={`mono rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  algo === a ? "border-transparent bg-[var(--color-ink)] text-white" : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[var(--color-sub)]">
            {L.secret[locale] ?? L.secret.en}
          </label>
          <input
            type="text"
            className="field mono w-full"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder={L.secretPh[locale] ?? L.secretPh.en}
            spellCheck={false}
            aria-label={L.secret[locale] ?? L.secret.en}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[var(--color-sub)]">
            {L.message[locale] ?? L.message.en}
          </label>
          <textarea
            className="field mono w-full"
            rows={5}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder={L.messagePh[locale] ?? L.messagePh.en}
            spellCheck={false}
            aria-label={L.message[locale] ?? L.message.en}
          />
        </div>

        {busy && <p className="text-[13px] text-[var(--color-sub)]">{t.common.processing}</p>}

        {hexOut && (
          <div className="space-y-3">
            <div>
              <p className="mb-1 text-[12px] font-medium uppercase tracking-wider text-[var(--color-sub)]">
                {L.hex[locale] ?? L.hex.en}
              </p>
              <div className="flex items-start gap-2">
                <p className="mono flex-1 break-all rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5 text-[13.5px] leading-5">
                  {hexOut}
                </p>
                <CopyButton value={hexOut} />
              </div>
            </div>
            <div>
              <p className="mb-1 text-[12px] font-medium uppercase tracking-wider text-[var(--color-sub)]">
                {L.b64[locale] ?? L.b64.en}
              </p>
              <div className="flex items-start gap-2">
                <p className="mono flex-1 break-all rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5 text-[13.5px] leading-5">
                  {b64Out}
                </p>
                <CopyButton value={b64Out} />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPanel>
  );
}
