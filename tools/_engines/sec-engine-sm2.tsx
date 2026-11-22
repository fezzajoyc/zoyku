"use client";

import { useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import {
  generateSm2KeyPair,
  sm2SignMessage,
  sm2VerifyMessage,
  sm2EncryptText,
  sm2DecryptText,
} from "../_lib/sm2-cipher";

/**
 * CN-028:SM2 引擎。三段:密钥对(生成/查看)、签名与验签、加密与解密。
 * 私钥/公钥可粘贴外部值(64/130 hex 校验);GB/T 32918 C1C3C2;签名含 SM3 摘要。
 */

const L = {
  keyTitle: { en: "Key pair", zh: "密钥对", ja: "鍵ペア", es: "Par de claves", pt: "Par de chaves" },
  generate: { en: "Generate key pair", zh: "生成密钥对", ja: "鍵ペアを生成", es: "Generar par de claves", pt: "Gerar par de chaves" },
  privateKey: { en: "Private key (keep secret)", zh: "私钥(请保密)", ja: "秘密鍵(秘密保持)", es: "Clave privada (manténgala secreta)", pt: "Chave privada (mantenha em segredo)" },
  publicKey: { en: "Public key (share freely)", zh: "公钥(可公开)", ja: "公開鍵(公開可)", es: "Clave pública (compartible)", pt: "Chave pública (compartilhável)" },
  sigTitle: { en: "Sign & verify", zh: "签名与验签", ja: "署名と検証", es: "Firmar y verificar", pt: "Assinar e verificar" },
  encTitle: { en: "Encrypt & decrypt", zh: "加密与解密", ja: "暗号化と復号", es: "Cifrar y descifrar", pt: "Cifrar e descifrar" },
  message: { en: "Message", zh: "消息", ja: "メッセージ", es: "Mensaje", pt: "Mensagem" },
  signature: { en: "Signature", zh: "签名", ja: "署名", es: "Firma", pt: "Assinatura" },
  plaintext: { en: "Plaintext", zh: "明文", ja: "平文", es: "Texto en claro", pt: "Texto em claro" },
  ciphertext: { en: "Ciphertext (hex)", zh: "密文(十六进制)", ja: "暗号文(十六進)", es: "Cifrado (hex)", pt: "Cifrado (hex)" },
  privateKeyField: { en: "Private key (64 hex)", zh: "私钥(64 位十六进制)", ja: "秘密鍵(64 桁十六進)", es: "Clave privada (64 hex)", pt: "Chave privada (64 hex)" },
  publicKeyField: { en: "Public key (130 hex)", zh: "公钥(130 位十六进制)", ja: "公開鍵(130 桁十六進)", es: "Clave pública (130 hex)", pt: "Chave pública (130 hex)" },
  sign: { en: "Sign", zh: "签名", ja: "署名", es: "Firmar", pt: "Assinar" },
  verify: { en: "Verify", zh: "验签", ja: "検証", es: "Verificar", pt: "Verificar" },
  encrypt: { en: "Encrypt", zh: "加密", ja: "暗号化", es: "Cifrar", pt: "Cifrar" },
  decrypt: { en: "Decrypt", zh: "解密", ja: "復号", es: "Descifrar", pt: "Descifrar" },
  run: { en: "Run", zh: "执行", ja: "実行", es: "Ejecutar", pt: "Executar" },
  valid: { en: "Signature VALID ✓", zh: "签名有效 ✓", ja: "署名は有効 ✓", es: "Firma VÁLIDA ✓", pt: "Assinatura VÁLIDA ✓" },
  invalid: { en: "Signature INVALID ✗", zh: "签名无效 ✗", ja: "署名は無効 ✗", es: "Firma INVÁLIDA ✗", pt: "Assinatura INVÁLIDA ✗" },
  badKey: {
    en: "Key format invalid — private key must be 64 hex chars, public key 130 hex chars starting with 04.",
    zh: "密钥格式非法——私钥须为 64 位十六进制,公钥须为 04 开头的 130 位十六进制。",
    ja: "鍵の形式が不正です — 秘密鍵は 64 桁十六進、公開鍵は 04 で始まる 130 桁十六進である必要があります。",
    es: "Formato de clave no válido — la privada debe ser 64 hex, la pública 130 hex comenzando por 04.",
    pt: "Formato de chave inválido — a privada deve ter 64 hex, a pública 130 hex começando com 04.",
  },
  badSig: {
    en: "Signature must be hexadecimal (typically 128 chars for r‖s).",
    zh: "签名必须为十六进制(通常为 r‖s 共 128 位)。",
    ja: "署名は十六進である必要があります(通常 r‖s で 128 桁)。",
    es: "La firma debe ser hexadecimal (normalmente 128 caracteres para r‖s).",
    pt: "A assinatura deve ser hexadecimal (normalmente 128 caracteres para r‖s).",
  },
  note: {
    en: "SM2 (GB/T 32918-2016) is the elliptic-curve signature and encryption algorithm of the Chinese commercial cryptography suite — the asymmetric counterpart of SM3 and SM4, mandated in government, finance and e-seal workflows. Signatures use SM3 hashing; encryption uses the C1C3C2 ciphertext order. Each signature and encryption introduces a fresh random k, so outputs differ every time while remaining verifiable/decryptable. Keys here are SM2-curve keys — they are not ECDSA/RSA keys and vice versa. Everything runs locally; nothing is uploaded.",
    zh: "SM2(GB/T 32918-2016)是中国商用密码体系的椭圆曲线签名与加密算法——SM3 与 SM4 的非对称部分,政务、金融与电子签章流程强制使用。签名含 SM3 摘要;加密采用 C1C3C2 密文顺序。每次签名与加密都引入随机 k,输出每次不同但验签/解密恒定有效。此处的密钥是 SM2 曲线密钥——不是 ECDSA/RSA 密钥,反之亦然。全部本机完成,不上传。",
    ja: "SM2(GB/T 32918-2016)は中国商用暗号スイートの楕円曲線署名・暗号アルゴリズム — SM3 と SM4 の非対称部分で、政府・金融・電子印章ワークフローで必須です。署名は SM3 ハッシュを含み、暗号は C1C3C2 順の暗号文を使用します。各署名・暗号はランダム k を導入するため出力は毎回変わりますが、検証・復号は常に有効です。ここの鍵は SM2 曲線の鍵 — ECDSA/RSA 鍵ではありません。すべてローカル処理です。",
    es: "SM2 (GB/T 32918-2016) es el algoritmo de firma y cifrado de curva elíptica del conjunto de criptografía comercial chino — la contraparte asimétrica de SM3 y SM4, obligatorio en flujos de gobierno, finanzas y sellos electrónicos. Las firmas usan hash SM3; el cifrado usa el orden de cifrado C1C3C2. Cada firma y cifrado introduce un k aleatorio nuevo, así que las salidas difieren cada vez pero siguen siendo verificables/descifrables. Las claves aquí son de curva SM2 — no son claves ECDSA/RSA y viceversa. Todo local.",
    pt: "SM2 (GB/T 32918-2016) é o algoritmo de assinatura e cifragem de curva elíptica do conjunto de criptografia comercial chinês — a contraparte assimétrica de SM3 e SM4, obrigatório em fluxos de governo, finanças e selos eletrônicos. As assinaturas usam hash SM3; a cifragem usa a ordem de cifrado C1C3C2. Cada assinatura e cifragem introduz um k aleatório novo, então as saídas diferem a cada vez mas permanecem verificáveis/decifráveis. As chaves aqui são de curva SM2 — não são chaves ECDSA/RSA e vice-versa. Tudo local.",
  },
};

export function SecEngineSm2() {
  const { locale } = useI18n();
  const [kp, setKp] = useState<{ privateKey: string; publicKey: string } | null>(null);
  const [privIn, setPrivIn] = useState("");
  const [pubIn, setPubIn] = useState("");
  const [msg, setMsg] = useState("");
  const [sig, setSig] = useState("");
  const [text, setText] = useState("");
  const [out, setOut] = useState("");
  const [verdict, setVerdict] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const privateKey = privIn || kp?.privateKey || "";
  const publicKey = pubIn || kp?.publicKey || "";

  const errText = (code: string) =>
    code === "badKey" || code === "badPublicKey" || code === "badPrivateKey"
      ? pick(locale, L.badKey)
      : code === "badSignature"
        ? pick(locale, L.badSig)
        : pick(locale, L.badSig);

  const doGenerate = () => {
    const pair = generateSm2KeyPair();
    setKp(pair);
    setPrivIn(pair.privateKey);
    setPubIn(pair.publicKey);
    setErr(null);
  };

  const doSign = async () => {
    setErr(null);
    setBusy(true);
    const r = sm2SignMessage(msg, privateKey);
    setBusy(false);
    if (r.ok) {
      setSig(r.data); // 签名回填到验签输入框——验签立即可用
      setOut(r.data);
    } else setErr(errText(r.code));
  };

  const doVerify = async () => {
    setErr(null);
    setBusy(true);
    const r = sm2VerifyMessage(msg, sig.trim(), publicKey);
    setBusy(false);
    if (r.ok) setVerdict(r.data ? pick(locale, L.valid) : pick(locale, L.invalid));
    else setErr(errText(r.code));
  };

  const doEncrypt = async () => {
    setErr(null);
    setBusy(true);
    const r = sm2EncryptText(text, publicKey);
    setBusy(false);
    if (r.ok) setOut(r.data);
    else setErr(errText(r.code));
  };

  const doDecrypt = async () => {
    setErr(null);
    setBusy(true);
    const r = sm2DecryptText(text, privateKey);
    setBusy(false);
    if (r.ok) setOut(r.data);
    else setErr(errText(r.code));
  };

  return (
    <ToolPanel>
      <div className="space-y-5">
        {/* 密钥对段 */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.keyTitle)}</p>
            <button
              type="button"
              onClick={doGenerate}
              className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f]"
            >
              {pick(locale, L.generate)}
            </button>
          </div>
          <textarea
            className="field mono"
            rows={2}
            value={privIn}
            onChange={(e) => setPrivIn(e.target.value)}
            placeholder={pick(locale, L.privateKeyField)}
            aria-label={pick(locale, L.privateKeyField)}
            spellCheck={false}
          />
          <textarea
            className="field mono"
            rows={2}
            value={pubIn}
            onChange={(e) => setPubIn(e.target.value)}
            placeholder={pick(locale, L.publicKeyField)}
            aria-label={pick(locale, L.publicKeyField)}
            spellCheck={false}
          />
        </div>

        {/* 签名与验签 */}
        <div className="space-y-3">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.sigTitle)}</p>
          <textarea
            className="field mono"
            rows={3}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder={pick(locale, L.message)}
            aria-label={pick(locale, L.message)}
            spellCheck={false}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={doSign}
              disabled={busy || !msg.trim() || !privateKey}
              className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] disabled:opacity-40"
            >
              {busy ? "…" : pick(locale, L.sign)}
            </button>
            <button
              type="button"
              onClick={doVerify}
              disabled={busy || !msg.trim() || !sig.trim() || !publicKey}
              className="rounded-full border hairline px-4 py-2 text-[13.5px] font-medium hover:bg-[var(--color-surface)] disabled:opacity-40"
            >
              {pick(locale, L.verify)}
            </button>
          </div>
          {sig && (
            <div className="space-y-2">
              <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.signature)}</p>
              <textarea className="field mono bg-[var(--color-surface)]" rows={2} value={sig} onChange={(e) => setSig(e.target.value)} spellCheck={false} aria-label={pick(locale, L.signature)} />
              <CopyButton value={sig} />
            </div>
          )}
          {verdict && (
            <p role="status" className={`rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium ${verdict.includes("✓") ? "bg-[var(--color-surface)] text-[var(--color-good)]" : "error-bg text-[var(--color-bad)]"}`}>
              {verdict}
            </p>
          )}
        </div>

        {/* 加密与解密 */}
        <div className="space-y-3">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.encTitle)}</p>
          <textarea
            className="field mono"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={pick(locale, L.plaintext)}
            aria-label={pick(locale, L.plaintext)}
            spellCheck={false}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={doEncrypt}
              disabled={busy || !text.trim() || !publicKey}
              className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] disabled:opacity-40"
            >
              {pick(locale, L.encrypt)}
            </button>
            <button
              type="button"
              onClick={doDecrypt}
              disabled={busy || !text.trim() || !privateKey}
              className="rounded-full border hairline px-4 py-2 text-[13.5px] font-medium hover:bg-[var(--color-surface)] disabled:opacity-40"
            >
              {pick(locale, L.decrypt)}
            </button>
          </div>
          {out && (
            <div className="space-y-2">
              <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
                {text && /^[0-9a-fA-F]{200,}$/.test(text) ? pick(locale, L.plaintext) : pick(locale, L.ciphertext)}
              </p>
              <textarea className="field mono bg-[var(--color-surface)]" rows={4} value={out} readOnly spellCheck={false} aria-label={out.slice(0, 20)} />
              <CopyButton value={out} />
            </div>
          )}
        </div>

        {err && (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {err}
          </p>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
