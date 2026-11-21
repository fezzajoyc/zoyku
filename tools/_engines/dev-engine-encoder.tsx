"use client";

import { useId, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { HTML_LANG } from "@/lib/i18n";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { decodeJwt, JWT_INPUT_LIMIT, jwtTimeClaim } from "@/tools/_lib/jwt";
import { jwtCopy } from "@/tools/_lib/jwt-copy";
import { downloadBlob } from "@/components/client-ui";
import { base64ToBytes, encodeFileToBase64, BASE64_FILE_LIMIT } from "../_lib/base64-file";
import { fill } from "../_lib/types";

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

const L_FILE = {
  pickEncode: { en: "Pick any file to encode (≤ 20 MB)", zh: "选择任意文件进行编码(≤ 20 MB)", ja: "エンコードするファイルを選択(最大 20 MB)", es: "Elige cualquier archivo para codificar (≤ 20 MB)", pt: "Escolha qualquer arquivo para codificar (≤ 20 MB)", fr: "Choisissez un fichier à encoder (≤ 20 Mo)", de: "Datei zum Kodieren wählen (≤ 20 MB)", ru: "Выберите файл для кодирования (≤ 20 МБ)", it: "Scegli un file da codificare (≤ 20 MB)", tr: "Kodlanacak dosyayı seçin (≤ 20 MB)", ko: "인코딩할 파일 선택(≤ 20 MB)", ar: "اختر ملفًا للترميز (≤ 20 ميغابايت)", hi: "एन्कोड के लिए कोई फ़ाइल चुनें (≤ 20 MB)", id: "Pilih file untuk dikodekan (≤ 20 MB)", vi: "Chọn tệp để mã hóa (≤ 20 MB)" },
  pickDecode: { en: "Load a Base64 text file", zh: "载入 Base64 文本文件", ja: "Base64 テキストファイルを読み込む", es: "Cargar un archivo de texto Base64", pt: "Carregar um arquivo de texto Base64", fr: "Charger un fichier texte Base64", de: "Base64-Textdatei laden", ru: "Загрузить текстовый файл Base64", it: "Carica un file di testo Base64", tr: "Base64 metin dosyası yükle", ko: "Base64 텍스트 파일 불러오기", ar: "تحميل ملف نصي Base64", hi: "Base64 टेक्स्ट फ़ाइल लोड करें", id: "Muat file teks Base64", vi: "Tải tệp văn bản Base64" },
  note: { en: "{name}: {n} bytes → {m} Base64 characters", zh: "{name}:{n} 字节 → {m} 个 Base64 字符", ja: "{name}:{n} バイト → {m} 文字の Base64", es: "{name}: {n} bytes → {m} caracteres Base64", pt: "{name}: {n} bytes → {m} caracteres Base64", fr: "{name} : {n} octets → {m} caractères Base64", de: "{name}: {n} Bytes → {m} Base64-Zeichen", ru: "{name}: {n} байт → {m} символов Base64", it: "{name}: {n} byte → {m} caratteri Base64", tr: "{name}: {n} bayt → {m} Base64 karakteri", ko: "{name}: {n} 바이트 → {m}개의 Base64 문자", ar: "{name}: {n} بايت → {m} حرفًا من Base64", hi: "{name}: {n} बाइट → {m} Base64 वर्ण", id: "{name}: {n} byte → {m} karakter Base64", vi: "{name}: {n} byte → {m} ký tự Base64" },
  tooLarge: { en: "File exceeds the 20 MB limit — nothing was encoded.", zh: "文件超过 20 MB 限额——未进行编码。", ja: "ファイルが 20 MB の上限を超えています——エンコードしていません。", es: "El archivo supera el límite de 20 MB: no se codificó.", pt: "O arquivo excede o limite de 20 MB: nada foi codificado.", fr: "Le fichier dépasse la limite de 20 Mo — rien n'a été encodé.", de: "Die Datei überschreitet das 20-MB-Limit — nichts wurde kodiert.", ru: "Файл превышает лимит 20 МБ — кодирование не выполнено.", it: "Il file supera il limite di 20 MB: nessuna codifica eseguita.", tr: "Dosya 20 MB sınırını aşıyor — kodlama yapılmadı.", ko: "파일이 20 MB 제한을 초과했습니다 — 인코딩하지 않았습니다.", ar: "الملف يتجاوز حد 20 ميغابايت — لم يتم الترميز.", hi: "फ़ाइल 20 MB सीमा से अधिक है — कुछ भी एन्कोड नहीं किया गया।", id: "File melebihi batas 20 MB — tidak ada yang dikodekan.", vi: "Tệp vượt giới hạn 20 MB — không mã hóa gì." },
  outName: { en: "Decoded file name", zh: "解码后文件名", ja: "デコード後のファイル名", es: "Nombre del archivo decodificado", pt: "Nome do arquivo decodificado", fr: "Nom du fichier décodé", de: "Dekodierter Dateiname", ru: "Имя декодированного файла", it: "Nome del file decodificato", tr: "Çözülen dosya adı", ko: "디코딩된 파일 이름", ar: "اسم الملف المفكوك", hi: "डिकोड फ़ाइल नाम", id: "Nama file hasil dekode", vi: "Tên tệp đã giải mã" },
  downloadFile: { en: "Download decoded file", zh: "下载解码后的文件", ja: "デコードファイルをダウンロード", es: "Descargar archivo decodificado", pt: "Baixar arquivo decodificado", fr: "Télécharger le fichier décodé", de: "Dekodierte Datei herunterladen", ru: "Скачать декодированный файл", it: "Scarica il file decodificato", tr: "Çözülen dosyayı indir", ko: "디코딩된 파일 다운로드", ar: "تنزيل الملف المفكوك", hi: "डिकोड फ़ाइल डाउनलोड करें", id: "Unduh file hasil dekode", vi: "Tải tệp đã giải mã" },
  invalid: { en: "Input is not valid Base64 — nothing to download.", zh: "输入不是合法 Base64——没有可下载内容。", ja: "入力は有効な Base64 ではありません——ダウンロードできません。", es: "La entrada no es Base64 válido: nada para descargar.", pt: "A entrada não é Base64 válido: nada para baixar.", fr: "L'entrée n'est pas du Base64 valide — rien à télécharger.", de: "Eingabe ist kein gültiges Base64 — nichts zum Herunterladen.", ru: "Ввод не является корректным Base64 — скачивать нечего.", it: "L'input non è Base64 valido: nulla da scaricare.", tr: "Giriş geçerli Base64 değil — indirilecek bir şey yok.", ko: "입력이 유효한 Base64가 아닙니다 — 다운로드할 내용이 없습니다.", ar: "الإدخال ليس Base64 صالحًا — لا شيء للتنزيل.", hi: "इनपुट मान्य Base64 नहीं है — डाउनलोड करने के लिए कुछ नहीं।", id: "Input bukan Base64 yang valid — tidak ada untuk diunduh.", vi: "Đầu vào không phải Base64 hợp lệ — không có gì để tải." },
  basicTitle: { en: "HTTP Basic Auth header", zh: "HTTP Basic 认证头", ja: "HTTP Basic 認証ヘッダー", es: "Cabecera HTTP Basic Auth", pt: "Cabeçalho HTTP Basic Auth", fr: "En-tête HTTP Basic Auth", de: "HTTP-Basic-Auth-Header", ru: "Заголовок HTTP Basic Auth", it: "Header HTTP Basic Auth", tr: "HTTP Basic Auth başlığı", ko: "HTTP Basic 인증 헤더", ar: "ترويسة HTTP Basic Auth", hi: "HTTP Basic Auth हेडर", id: "Header HTTP Basic Auth", vi: "Tiêu đề HTTP Basic Auth" },
  basicUser: { en: "Username", zh: "用户名", ja: "ユーザー名", es: "Usuario", pt: "Usuário", fr: "Nom d'utilisateur", de: "Benutzername", ru: "Имя пользователя", it: "Nome utente", tr: "Kullanıcı adı", ko: "사용자 이름", ar: "اسم المستخدم", hi: "उपयोगकर्ता नाम", id: "Nama pengguna", vi: "Tên người dùng" },
  basicPass: { en: "Password", zh: "密码", ja: "パスワード", es: "Contraseña", pt: "Senha", fr: "Mot de passe", de: "Passwort", ru: "Пароль", it: "Password", tr: "Şifre", ko: "비밀번호", ar: "كلمة المرور", hi: "पासवर्ड", id: "Kata sandi", vi: "Mật khẩu" },
  basicNote: { en: "Send as the Authorization header value. UTF-8 credentials are allowed (RFC 7617 charset); the secret stays in this tab.", zh: "作为 Authorization 头的值发送。凭据可用 UTF-8(RFC 7617 允许);秘密只留在此标签页内。", ja: "Authorization ヘッダーの値として送信します。UTF-8 の資格情報が可能(RFC 7617)。シークレットはこのタブ内に留まります。", es: "Envíalo como valor del encabezado Authorization. Credenciales UTF-8 permitidas (RFC 7617); el secreto permanece en esta pestaña.", pt: "Envie como valor do cabeçalho Authorization. Credenciais UTF-8 permitidas (RFC 7617); o segredo fica nesta aba.", fr: "À envoyer comme valeur de l'en-tête Authorization. Identifiants UTF-8 autorisés (RFC 7617) ; le secret reste dans cet onglet.", de: "Als Wert des Authorization-Headers senden. UTF-8-Zugangsdaten erlaubt (RFC 7617); das Secret bleibt in diesem Tab.", ru: "Отправляйте как значение заголовка Authorization. UTF-8 допустим (RFC 7617); секрет остаётся в этой вкладке.", it: "Invia come valore dell'header Authorization. Credenziali UTF-8 consentite (RFC 7617); il segreto resta in questa scheda.", tr: "Authorization başlığı değeri olarak gönderin. UTF-8 kimlik bilgileri mümkün (RFC 7617); gizli anahtar bu sekmede kalır.", ko: "Authorization 헤더 값으로 보내세요. UTF-8 자격 증명 허용(RFC 7617); 시크릿은 이 탭에만 남습니다.", ar: "أرسلها كقيمة ترويسة Authorization. بيانات UTF-8 مسموحة (RFC 7617)؛ السر يبقى في هذا التبويب.", hi: "Authorization हेडर मान के रूप में भेजें। UTF-8 क्रेडेंशियल स्वीकृत (RFC 7617); सीक्रेट इसी टैब में रहता है।", id: "Kirim sebagai nilai header Authorization. Kredensial UTF-8 diizinkan (RFC 7617); rahasia tetap di tab ini.", vi: "Gửi làm giá trị tiêu đề Authorization. Cho phép thông tin UTF-8 (RFC 7617); bí mật giữ trong tab này." },
} as const;

export function DevEncoderEngine({ codec }: { codec: Codec }) {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [component, setComponent] = useState(true);
  const [plusAsSpace, setPlusAsSpace] = useState(false);
  const [decodedAt, setDecodedAt] = useState(0);
  const [fileOut, setFileOut] = useState<{ name: string; base64: string; bytes: number } | null>(null);
  const [fileErr, setFileErr] = useState("");
  const [outName, setOutName] = useState("decoded.bin");
  const [basicUser, setBasicUser] = useState("");
  const [basicPass, setBasicPass] = useState("");
  const basicHeader = (() => {
    if (!basicUser && !basicPass) return "";
    const raw = `${basicUser}:${basicPass}`;
    const bytes = new TextEncoder().encode(raw);
    let bin = "";
    for (const byte of bytes) bin += String.fromCharCode(byte);
    return `Authorization: Basic ${btoa(bin)}`;
  })();
  const id = useId();
  const jwtLabels = jwtCopy(locale);

  const isJwt = codec === "jwt-decode";
  const isUrl = codec === "url-encode" || codec === "url-decode";
  const isB64 = codec === "base64-encode" || codec === "base64-decode";

  // G21:任意二进制文件 → Base64(编码侧)
  const handleEncodeFile = async (file: File | undefined) => {
    setFileErr("");
    setFileOut(null);
    if (!file) return;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const r = encodeFileToBase64(bytes);
    if (!r.ok) {
      setFileErr(pick(L_FILE.tooLarge, locale));
      return;
    }
    setFileOut({ name: file.name, base64: r.base64, bytes: r.bytes });
  };

  // G21:Base64 → 任意二进制下载(解码侧);输入非法时结构化报错,绝不产垃圾文件
  const handleDecodeDownload = () => {
    setFileErr("");
    const cleaned = input.replace(/\s+/g, "").replace(/^data:[^;,]*;base64,/, "");
    const bytes = base64ToBytes(cleaned);
    if (!bytes || bytes.byteLength > BASE64_FILE_LIMIT) {
      setFileErr(pick(L_FILE.invalid, locale));
      return;
    }
    downloadBlob(new Blob([bytes as BlobPart], { type: "application/octet-stream" }), outName.trim() || "decoded.bin");
  };

  const handleDecodeLoadFile = async (file: File | undefined) => {
    setFileErr("");
    if (!file) return;
    const text = await file.text();
    setInput(text.trim());
  };

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

        {isB64 && (
          <div className="space-y-2.5 rounded-xl border hairline p-3.5">
            {codec === "base64-encode" ? (
              <>
                <label className="block text-[13px] font-medium">
                  {pick(L_FILE.pickEncode, locale)}
                  <input
                    type="file"
                    className="mt-1.5 block w-full text-[13px]"
                    onChange={(e) => void handleEncodeFile(e.target.files?.[0])}
                    aria-label={pick(L_FILE.pickEncode, locale)}
                  />
                </label>
                {fileOut && (
                  <div className="space-y-2">
                    <p className="mono text-[12.5px] leading-5 text-[var(--color-sub)]">
                      {fill(pick(L_FILE.note, locale), { name: fileOut.name, n: String(fileOut.bytes), m: String(fileOut.base64.length) })}
                    </p>
                    <textarea
                      className="field mono bg-[var(--color-surface)]"
                      rows={5}
                      value={fileOut.base64}
                      readOnly
                      spellCheck={false}
                      aria-label="base64 of file"
                    />
                    <CopyButton value={fileOut.base64} />
                  </div>
                )}
              </>
            ) : (
              <>
                <label className="block text-[13px] font-medium">
                  {pick(L_FILE.pickDecode, locale)}
                  <input
                    type="file"
                    accept=".b64,.txt,.base64,text/plain"
                    className="mt-1.5 block w-full text-[13px]"
                    onChange={(e) => void handleDecodeLoadFile(e.target.files?.[0])}
                    aria-label={pick(L_FILE.pickDecode, locale)}
                  />
                </label>
                <div className="flex flex-wrap items-end gap-2.5">
                  <label className="block min-w-48 flex-1 text-[13px] font-medium">
                    {pick(L_FILE.outName, locale)}
                    <input
                      type="text"
                      className="field mono mt-1.5 w-full"
                      value={outName}
                      onChange={(e) => setOutName(e.target.value)}
                      aria-label={pick(L_FILE.outName, locale)}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleDecodeDownload}
                    disabled={!base64ToBytes(input.replace(/\s+/g, "").replace(/^data:[^;,]*;base64,/, ""))}
                    className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
                  >
                    {pick(L_FILE.downloadFile, locale)}
                  </button>
                </div>
              </>
            )}
            {fileErr && (
              <p className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]" role="alert">
                {fileErr}
              </p>
            )}
          </div>
        )}

        {codec === "base64-encode" && (
          <div className="space-y-2.5 rounded-xl border hairline p-3.5">
            <p className="text-[13px] font-semibold">{pick(L_FILE.basicTitle, locale)}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block space-y-1.5 text-[13px] font-medium">
                <span>{pick(L_FILE.basicUser, locale)}</span>
                <input
                  type="text"
                  className="field w-full"
                  value={basicUser}
                  onChange={(e) => setBasicUser(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label={pick(L_FILE.basicUser, locale)}
                />
              </label>
              <label className="block space-y-1.5 text-[13px] font-medium">
                <span>{pick(L_FILE.basicPass, locale)}</span>
                <input
                  type="text"
                  className="field mono w-full"
                  value={basicPass}
                  onChange={(e) => setBasicPass(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label={pick(L_FILE.basicPass, locale)}
                />
              </label>
            </div>
            {basicHeader && (
              <div className="space-y-2">
                <p className="mono break-all rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5 text-[13px] leading-5" dir="ltr">
                  {basicHeader}
                </p>
                <CopyButton value={basicHeader} />
              </div>
            )}
            <p className="text-[12.5px] leading-5 text-[var(--color-sub)]">{pick(L_FILE.basicNote, locale)}</p>
          </div>
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
