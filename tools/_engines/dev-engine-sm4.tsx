"use client";

import { useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Tabs, pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import { sm4Encrypt, sm4Decrypt, type Sm4Mode } from "../_lib/sm4-cipher";

/**
 * CN-027:SM4 加解密引擎。ECB/CBC 双模式,128 位十六进制密钥,CBC 带 IV。
 * 无认证披露:建议配合 HMAC-SM3 使用。GB/T 32907-2016 标准向量已锚定。
 */

const L = {
  enc: { en: "Encrypt", zh: "加密", ja: "暗号化", es: "Cifrar", pt: "Cifrar" },
  dec: { en: "Decrypt", zh: "解密", ja: "復号", es: "Descifrar", pt: "Descifrar" },
  mode: { en: "Mode", zh: "模式", ja: "モード", es: "Modo", pt: "Modo" },
  ecb: { en: "ECB (no IV)", zh: "ECB(无 IV)", ja: "ECB(IV なし)", es: "ECB (sin IV)", pt: "ECB (sem IV)" },
  cbc: { en: "CBC (with IV)", zh: "CBC(带 IV)", ja: "CBC(IV あり)", es: "CBC (con IV)", pt: "CBC (com IV)" },
  key: { en: "Key (32 hex chars = 128-bit)", zh: "密钥(32 位十六进制 = 128 位)", ja: "鍵(32 桁の十六進 = 128 ビット)", es: "Clave (32 hex = 128 bits)", pt: "Chave (32 hex = 128 bits)" },
  iv: { en: "IV (32 hex chars)", zh: "IV(32 位十六进制)", ja: "IV(32 桁の十六進)", es: "IV (32 hex)", pt: "IV (32 hex)" },
  plaintext: { en: "Plaintext", zh: "明文", ja: "平文", es: "Texto en claro", pt: "Texto em claro" },
  ciphertext: { en: "Ciphertext (hex)", zh: "密文(十六进制)", ja: "暗号文(十六進)", es: "Cifrado (hex)", pt: "Cifrado (hex)" },
  run: { en: "Run", zh: "执行", ja: "実行", es: "Ejecutar", pt: "Executar" },
  badKey: {
    en: "Key must be exactly 32 hexadecimal characters (128-bit).",
    zh: "密钥必须为恰好 32 位十六进制字符(128 位)。",
    ja: "鍵は 32 桁の十六進文字である必要があります(128 ビット)。",
    es: "La clave debe ser exactamente 32 caracteres hexadecimales (128 bits).",
    pt: "A chave deve ter exatamente 32 caracteres hexadecimais (128 bits).",
  },
  badIv: {
    en: "IV must be exactly 32 hexadecimal characters for CBC mode.",
    zh: "CBC 模式的 IV 必须为恰好 32 位十六进制字符。",
    ja: "CBC モードの IV は 32 桁の十六進文字である必要があります。",
    es: "El IV debe ser exactamente 32 caracteres hexadecimales en modo CBC.",
    pt: "O IV deve ter exatamente 32 caracteres hexadecimais no modo CBC.",
  },
  badInput: {
    en: "Ciphertext must be hexadecimal and a multiple of the 16-byte block size.",
    zh: "密文必须为十六进制,且长度为 16 字节分组的整数倍。",
    ja: "暗号文は十六進で、16 バイトブロックの整数倍である必要があります。",
    es: "El cifrado debe ser hexadecimal y múltiplo del bloque de 16 bytes.",
    pt: "O cifrado deve ser hexadecimal e múltiplo do bloco de 16 bytes.",
  },
  decryptFailed: {
    en: "Decryption failed — the data may be corrupted, or the final padding is invalid (wrong key or truncated input).",
    zh: "解密失败——数据可能损坏,或末尾填充非法(密钥错误或输入被截断)。",
    ja: "復号に失敗しました — データが破損しているか、末尾のパディングが不正です(鍵の誤りまたは入力の切断)。",
    es: "Descifrado fallido: los datos pueden estar dañados o el relleno final es inválido (clave errónea o entrada truncada).",
    pt: "Falha na decifragem — os dados podem estar corrompidos ou o preenchimento final é inválido (chave errada ou entrada truncada).",
  },
  note: {
    en: "SM4 (GB/T 32907-2016) is the Chinese national-standard block cipher: 128-bit key and block, the symmetric counterpart of SM3 hashing and SM2 signatures. This implementation follows the standard exactly — the GB/T Appendix A test vector validates it. ECB and CBC carry no authentication tag, so tampering is undetectable by decryption alone; pair with HMAC-SM3 when integrity matters. Everything runs locally; nothing is uploaded.",
    zh: "SM4(GB/T 32907-2016)是中国国家标准的分组密码:128 位密钥与分组,与 SM3 杂凑、SM2 签名构成国密对称部分。本实现严格遵循标准——GB/T 附录 A 标准向量已锚定验证。ECB 与 CBC 均不带认证标签,仅凭解密无法检测篡改;完整性敏感场景请配合 HMAC-SM3。全部本机完成,不上传。",
    ja: "SM4(GB/T 32907-2016)は中国国家標準のブロック暗号です:128 ビットの鍵とブロックで、SM3 ハッシュ・SM2 署名と国密の対称部分を構成します。本実装は標準に厳密に従い、GB/T 付録 A のテストベクトルで検証済みです。ECB と CBC には認証タグがなく、解密だけでは改ざんを検出できません。整合性が重要な場合は HMAC-SM3 と併用してください。すべてローカル処理です。",
    es: "SM4 (GB/T 32907-2016) es el cifrador en bloques del estándar nacional chino: clave y bloque de 128 bits, la contraparte simétrica del hashing SM3 y las firmas SM2. Esta implementación sigue el estándar exactamente — el vector de prueba del Anexo A de GB/T lo valida. ECB y CBC no llevan etiqueta de autenticación, así que la manipulación no es detectable solo por descifrar; emparéjelo con HMAC-SM3 cuando la integridad importe. Todo local.",
    pt: "SM4 (GB/T 32907-2016) é a cifra em blocos do padrão nacional chinês: chave e bloco de 128 bits, a contraparte simétrica do hashing SM3 e das assinaturas SM2. Esta implementação segue o padrão exatamente — o vetor de teste do Anexo A da GB/T a valida. ECB e CBC não têm etiqueta de autenticação, então adulteração não é detectável apenas decifrando; combine com HMAC-SM3 quando a integridade importar. Tudo local.",
  },
};

export function DevEngineSm4() {
  const { locale } = useI18n();
  const [dir, setDir] = useState<"enc" | "dec">("enc");
  const [mode, setMode] = useState<Sm4Mode>("ecb");
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const errText = (code: string) =>
    code === "badKey" ? pick(locale, L.badKey) : code === "badIv" ? pick(locale, L.badIv) : code === "badInput" ? pick(locale, L.badInput) : pick(locale, L.decryptFailed);

  const doRun = async () => {
    setErr(null);
    setBusy(true);
    const r = dir === "enc" ? await sm4Encrypt(input, key, mode, iv || undefined) : await sm4Decrypt(input, key, mode, iv || undefined);
    setBusy(false);
    if (r.ok) setOutput(r.data);
    else {
      setOutput("");
      setErr(errText(r.code));
    }
  };

  return (
    <ToolPanel>
      <div className="space-y-4">
        <Tabs
          options={[
            { id: "enc", label: pick(locale, L.enc) },
            { id: "dec", label: pick(locale, L.dec) },
          ]}
          value={dir}
          onChange={(v) => {
            setDir(v as "enc" | "dec");
            setOutput("");
            setErr(null);
          }}
        />

        <div className="space-y-2">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.mode)}</p>
          <div className="flex flex-wrap gap-2" role="group">
            {(["ecb", "cbc"] as Sm4Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  mode === m
                    ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {pick(locale, m === "ecb" ? L.ecb : L.cbc)}
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          className="field mono"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder={pick(locale, L.key)}
          aria-label={pick(locale, L.key)}
          spellCheck={false}
          autoComplete="off"
        />

        {mode === "cbc" && (
          <input
            type="text"
            className="field mono"
            value={iv}
            onChange={(e) => setIv(e.target.value)}
            placeholder={pick(locale, L.iv)}
            aria-label={pick(locale, L.iv)}
            spellCheck={false}
            autoComplete="off"
          />
        )}

        <textarea
          className="field mono"
          rows={dir === "dec" ? 6 : 5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={dir === "enc" ? pick(locale, L.plaintext) : pick(locale, L.ciphertext)}
          spellCheck={false}
          aria-label={dir === "enc" ? pick(locale, L.plaintext) : pick(locale, L.ciphertext)}
        />

        <button
          type="button"
          onClick={doRun}
          disabled={busy || !input.trim() || !key.trim()}
          className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
        >
          {busy ? "…" : pick(locale, L.run)}
        </button>

        {err && (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {err}
          </p>
        )}

        {output && (
          <div className="space-y-2">
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
              {dir === "enc" ? pick(locale, L.ciphertext) : pick(locale, L.plaintext)}
            </p>
            <textarea
              className="field mono bg-[var(--color-surface)]"
              rows={dir === "enc" ? 5 : 5}
              value={output}
              readOnly
              spellCheck={false}
              aria-label={dir === "enc" ? pick(locale, L.ciphertext) : pick(locale, L.plaintext)}
            />
            <CopyButton value={output} />
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
