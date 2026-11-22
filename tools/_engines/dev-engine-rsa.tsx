"use client";

import { useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import { generateRsaKeyPair, type RsaModulus } from "../_lib/rsa-keygen";

/**
 * CN-023:RSA 密钥对生成引擎。WebCrypto 原生(4096 位约需 1-3 秒)。
 * PEM(SPKI/PKCS8)与 JWK 双格式输出;PEM 默认展示,JWK 折叠在复制按钮后。
 */

const L = {
  modulus: { en: "Key size (bits)", zh: "密钥长度(位)", ja: "鍵長(ビット)", es: "Tamaño de clave (bits)", pt: "Tamanho da chave (bits)" },
  generate: { en: "Generate key pair", zh: "生成密钥对", ja: "鍵ペアを生成", es: "Generar par de claves", pt: "Gerar par de chaves" },
  busy: { en: "Generating…", zh: "生成中…", ja: "生成中…", es: "Generando…", pt: "Gerando…" },
  publicKey: { en: "Public key (PEM)", zh: "公钥(PEM)", ja: "公開鍵(PEM)", es: "Clave pública (PEM)", pt: "Chave pública (PEM)" },
  privateKey: { en: "Private key (PEM)", zh: "私钥(PEM)", ja: "秘密鍵(PEM)", es: "Clave privada (PEM)", pt: "Chave privada (PEM)" },
  jwk: { en: "JWK (kid {kid})", zh: "JWK(kid {kid})", ja: "JWK(kid {kid})", es: "JWK (kid {kid})", pt: "JWK (kid {kid})" },
  note: {
    en: "Generated locally with your browser's WebCrypto (RSASSA-PKCS1-v1_5, SHA-256, exponent 65537) — the private key never leaves this tab. Copy the private key only into systems you control. 4096-bit generation can take a few seconds.",
    zh: "由浏览器原生 WebCrypto 生成(RSASSA-PKCS1-v1_5、SHA-256、公钥指数 65537)——私钥不会离开此标签页。请只把私钥复制进你完全掌控的系统。4096 位生成可能需要数秒。",
    ja: "ブラウザの WebCrypto でローカル生成(RSASSA-PKCS1-v1_5、SHA-256、公開指数 65537)— 秘密鍵はこのタブから出ません。秘密鍵は自分が管理するシステムにのみコピーしてください。4096 ビットの生成には数秒かかることがあります。",
    es: "Generado localmente con WebCrypto de su navegador (RSASSA-PKCS1-v1_5, SHA-256, exponente 65537) — la clave privada nunca sale de esta pestaña. Copie la clave privada solo en sistemas que usted controle. La generación de 4096 bits puede tardar unos segundos.",
    pt: "Gerado localmente com o WebCrypto do seu navegador (RSASSA-PKCS1-v1_5, SHA-256, expoente 65537) — a chave privada nunca sai desta aba. Copie a chave privada apenas para sistemas que você controla. A geração de 4096 bits pode levar alguns segundos.",
  },
};

const MOD_OPTIONS: Array<{ value: RsaModulus; label: string; note: string }> = [
  { value: 2048, label: "2048", note: "recommended" },
  { value: 3072, label: "3072", note: "strong" },
  { value: 4096, label: "4096", note: "slow" },
];

export function DevEngineRsa() {
  const { locale } = useI18n();
  const [bits, setBits] = useState<RsaModulus>(2048);
  const [result, setResult] = useState<Awaited<ReturnType<typeof generateRsaKeyPair>> | null>(null);
  const [busy, setBusy] = useState(false);

  const doGenerate = async () => {
    setBusy(true);
    const r = await generateRsaKeyPair(bits);
    setBusy(false);
    setResult(r);
  };

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.modulus)}</p>
          <div className="flex flex-wrap gap-2" role="group">
            {MOD_OPTIONS.map((m) => (
              <button
                key={m.value}
                type="button"
                aria-pressed={bits === m.value}
                onClick={() => setBits(m.value)}
                className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  bits === m.value
                    ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={doGenerate}
          disabled={busy}
          className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
        >
          {busy ? pick(locale, L.busy) : pick(locale, L.generate)}
        </button>

        {result?.ok && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.publicKey)}</p>
              <textarea className="field mono bg-[var(--color-surface)]" rows={6} value={result.publicKeyPem} readOnly spellCheck={false} aria-label={pick(locale, L.publicKey)} />
              <CopyButton value={result.publicKeyPem} />
            </div>
            <div className="space-y-2">
              <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.privateKey)}</p>
              <textarea className="field mono bg-[var(--color-surface)]" rows={9} value={result.privateKeyPem} readOnly spellCheck={false} aria-label={pick(locale, L.privateKey)} />
              <CopyButton value={result.privateKeyPem} />
            </div>
            <div className="space-y-2">
              <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
                {pick(locale, L.jwk).replace("{kid}", result.keyId)}
              </p>
              <textarea
                className="field mono bg-[var(--color-surface)]"
                rows={4}
                value={JSON.stringify({ pub: result.publicKeyJwk, priv: result.privateKeyJwk }, null, 2)}
                readOnly
                spellCheck={false}
                aria-label="JWK"
              />
              <CopyButton value={JSON.stringify({ pub: result.publicKeyJwk, priv: result.privateKeyJwk }, null, 2)} />
            </div>
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
