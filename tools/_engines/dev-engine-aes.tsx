"use client";

import { useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Tabs, pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import { aesEncrypt, aesDecrypt, type AesMode } from "../_lib/aes-cipher";

/**
 * CN-026:AES 加解密引擎。GCM(认证加密,推荐)/ CBC(遗留)双模式。
 * 加密输出 Base64(salt||IV||密文) 自描述格式;口令错/GCM 认证失败明确报错。
 */

const L = {
  enc: { en: "Encrypt", zh: "加密", ja: "暗号化", es: "Cifrar", pt: "Cifrar" },
  dec: { en: "Decrypt", zh: "解密", ja: "復号", es: "Descifrar", pt: "Descifrar" },
  mode: { en: "Cipher mode", zh: "算法模式", ja: "暗号モード", es: "Modo de cifrado", pt: "Modo de cifra" },
  gcm: { en: "AES-256-GCM (authenticated)", zh: "AES-256-GCM(认证加密)", ja: "AES-256-GCM(認証付き)", es: "AES-256-GCM (autenticado)", pt: "AES-256-GCM (autenticado)" },
  cbc: { en: "AES-256-CBC (legacy, no auth)", zh: "AES-256-CBC(遗留,无认证)", ja: "AES-256-CBC(レガシー、認証なし)", es: "AES-256-CBC (legado, sin autenticación)", pt: "AES-256-CBC (legado, sem autenticação)" },
  password: { en: "Passphrase", zh: "口令", ja: "パスフレーズ", es: "Frase contraseña", pt: "Frase-senha" },
  plaintext: { en: "Plaintext", zh: "明文", ja: "平文", es: "Texto en claro", pt: "Texto em claro" },
  ciphertext: { en: "Ciphertext (Base64 payload)", zh: "密文(Base64 载荷)", ja: "暗号文(Base64 ペイロード)", es: "Cifrado (carga Base64)", pt: "Cifrado (carga Base64)" },
  run: { en: "Run", zh: "执行", ja: "実行", es: "Ejecutar", pt: "Executar" },
  authFailed: {
    en: "Decryption failed — wrong passphrase or tampered data (GCM authentication rejected it).",
    zh: "解密失败——口令错误或数据被篡改(GCM 认证拒绝)。",
    ja: "復号に失敗しました — パスフレーズが誤りか、データが改ざんされています(GCM 認証が拒否)。",
    es: "Descifrado fallido: frase incorrecta o datos manipulados (la autenticación GCM lo rechazó).",
    pt: "Falha na decifragem — frase errada ou dados adulterados (a autenticação GCM rejeitou).",
  },
  badPayload: {
    en: "The payload is not valid Base64 or is too short to contain salt + IV + ciphertext.",
    zh: "载荷不是合法 Base64,或太短而无法容纳 salt+IV+密文。",
    ja: "ペイロードが正しい Base64 でないか、salt+IV+暗号文を格納するには短すぎます。",
    es: "La carga no es Base64 válida o es demasiado corta para contener salt+IV+cifrado.",
    pt: "A carga não é Base64 válida ou é curta demais para conter salt+IV+cifrado.",
  },
  note: {
    en: "Your passphrase is stretched with PBKDF2-SHA256 (210,000 iterations) into a 256-bit key; a random salt and IV are generated per operation and packed with the ciphertext as a self-describing Base64 payload (salt ‖ IV ‖ ciphertext), so the same passphrase always decrypts it without any side settings. GCM authenticates the data — wrong passphrases and tampering are rejected instead of yielding garbage. CBC is provided only for compatibility with legacy systems and carries no authentication. Everything runs locally; nothing is uploaded.",
    zh: "口令经 PBKDF2-SHA256(210,000 次迭代)拉伸为 256 位密钥;每次运算生成随机 salt 与 IV,并与密文一起打包成自描述的 Base64 载荷(salt ‖ IV ‖ 密文)——同一口令无需任何附加设置即可解密。GCM 会认证数据:口令错误与篡改都会被拒绝而不是解出乱码。CBC 仅为兼容遗留系统提供,不带认证。全部本机完成,不上传。",
    ja: "パスフレーズは PBKDF2-SHA256(210,000 回)で 256 ビット鍵にストレッチされ、毎回ランダムな salt と IV が生成され、暗号文と共に自己記述型の Base64 ペイロード(salt ‖ IV ‖ 暗号文)として梱包されます — 同じパスフレーズなら追加設定なしで復号できます。GCM はデータを認証し、誤ったパスフレーズと改ざんを拒否します。CBC はレガシー互換のみで認証なし。すべてローカル処理です。",
    es: "Su frase se estira con PBKDF2-SHA256 (210.000 iteraciones) en una clave de 256 bits; se generan salt e IV aleatorios por operación y se empaquetan con el cifrado como carga Base64 autodescriptiva (salt ‖ IV ‖ cifrado) — la misma frase siempre lo descifra sin ajustes adicionales. GCM autentica los datos: frases incorrectas y manipulaciones se rechazan en lugar de producir basura. CBC solo por compatibilidad con sistemas antiguos, sin autenticación. Todo local.",
    pt: "Sua frase é esticada com PBKDF2-SHA256 (210.000 iterações) numa chave de 256 bits; salt e IV aleatórios são gerados por operação e empacotados com o cifrado como carga Base64 autodescritiva (salt ‖ IV ‖ cifrado) — a mesma frase sempre a decifra sem ajustes extras. O GCM autentica os dados: frases erradas e adulterações são rejeitadas em vez de produzir lixo. CBC apenas por compatibilidade legada, sem autenticação. Tudo local.",
  },
};

export function DevEngineAes() {
  const { locale } = useI18n();
  const [dir, setDir] = useState<"enc" | "dec">("enc");
  const [mode, setMode] = useState<AesMode>("gcm");
  const [password, setPassword] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const errText = (code: string) =>
    code === "authFailed" ? pick(locale, L.authFailed) : code === "badPayload" ? pick(locale, L.badPayload) : pick(locale, L.badPayload);

  const doRun = async () => {
    setErr(null);
    setBusy(true);
    const r = dir === "enc" ? await aesEncrypt(input, password, mode) : await aesDecrypt(input, password, mode);
    setBusy(false);
    if (r.ok) setOutput(r.payload);
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
            {(["gcm", "cbc"] as AesMode[]).map((m) => (
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
                {pick(locale, m === "gcm" ? L.gcm : L.cbc)}
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          className="field mono"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={pick(locale, L.password)}
          aria-label={pick(locale, L.password)}
          spellCheck={false}
          autoComplete="off"
        />

        <textarea
          className="field mono"
          rows={dir === "enc" ? 6 : 8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={dir === "enc" ? pick(locale, L.plaintext) : pick(locale, L.ciphertext)}
          spellCheck={false}
          aria-label={dir === "enc" ? pick(locale, L.plaintext) : pick(locale, L.ciphertext)}
        />

        <button
          type="button"
          onClick={doRun}
          disabled={busy || !input.trim() || !password}
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
              rows={dir === "enc" ? 6 : 6}
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
