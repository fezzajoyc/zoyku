"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import {
  ALGOS, base32Decode, hotp, parseOtpauth,
  type TotpAlgo,
} from "../_lib/totp";

/**
 * TOTP 验证码生成器(RFC 6238)—— WebCrypto HMAC,完全离线。
 * 支持直接粘贴 base32 密钥或 otpauth:// 迁移链接;
 * 可选 6/8 位、30/60 秒周期、SHA-1/SHA-256/SHA-512。
 * 密钥只存在于浏览器内存中,绝不发送、不存储。
 */

const LABELS: Record<string, Record<string, string>> = {
  title: { en: "TOTP code", zh: "验证码", ja: "認証コード", es: "Código", pt: "Código", fr: "Code TOTP", de: "TOTP-Code", ru: "Код TOTP", it: "Codice TOTP", tr: "TOTP kodu", ko: "TOTP 코드", ar: "رمز TOTP", hi: "TOTP कोड", id: "Kode TOTP", vi: "Mã TOTP" },
  placeholder: {
    en: "Paste your base32 secret (e.g. JBSW Y3DP EHPK 3PXP) or an otpauth:// link",
    zh: "粘贴 base32 密钥(如 JBSW Y3DP EHPK 3PXP)或 otpauth:// 链接",
    ja: "base32 シークレット(例:JBSW Y3DP EHPK 3PXP)か otpauth:// リンクを貼り付け",
    es: "Pega tu secreto base32 (p. ej. JBSW Y3DP EHPK 3PXP) o un enlace otpauth://",
    pt: "Cole seu segredo base32 (ex.: JBSW Y3DP EHPK 3PXP) ou um link otpauth://", fr: "Collez votre secret base32 (ex. JBSW Y3DP EHPK 3PXP) ou un lien otpauth://", de: "Base32-Secret einfügen (z. B. JBSW Y3DP EHPK 3PXP) oder einen otpauth://-Link", ru: "Вставьте base32-ключ (напр. JBSW Y3DP EHPK 3PXP) или ссылку otpauth://", it: "Incolla il segreto base32 (es. JBSW Y3DP EHPK 3PXP) o un link otpauth://", tr: "base32 gizli anahtarınızı (örn. JBSW Y3DP EHPK 3PXP) veya bir otpauth:// bağlantısını yapıştırın", ko: "base32 시크릿(예: JBSW Y3DP EHPK 3PXP) 또는 otpauth:// 링크를 붙여넣으세요", ar: "الصق مفتاح base32 (مثال JBSW Y3DP EHPK 3PXP) أو رابط otpauth://", hi: "अपना base32 सीक्रेट (जैसे JBSW Y3DP EHPK 3PXP) या otpauth:// लिंक पेस्ट करें", id: "Tempel secret base32 Anda (mis. JBSW Y3DP EHPK 3PXP) atau tautan otpauth://", vi: "Dán secret base32 (vd. JBSW Y3DP EHPK 3PXP) hoặc liên kết otpauth://",
  },
  digits: { en: "Digits", zh: "位数", ja: "桁数", es: "Dígitos", pt: "Dígitos", fr: "Chiffres", de: "Stellen", ru: "Цифры", it: "Cifre", tr: "Hane", ko: "자릿수", ar: "الخانات", hi: "अंक", id: "Digit", vi: "Số chữ số" },
  period: { en: "Period", zh: "周期", ja: "周期", es: "Periodo", pt: "Período", fr: "Période", de: "Periode", ru: "Период", it: "Periodo", tr: "Periyot", ko: "주기", ar: "الفترة", hi: "अवधि", id: "Periode", vi: "Chu kỳ" },
  algorithm: { en: "Algorithm", zh: "算法", ja: "アルゴリズム", es: "Algoritmo", pt: "Algoritmo", fr: "Algorithme", de: "Algorithmus", ru: "Алгоритм", it: "Algoritmo", tr: "Algoritma", ko: "알고리즘", ar: "الخوارزمية", hi: "एल्गोरिद्म", id: "Algoritma", vi: "Thuật toán" },
  seconds: { en: "s", zh: "秒", ja: "秒", es: "s", pt: "s", fr: "s", de: "s", ru: "с", it: "s", tr: "sn", ko: "초", ar: "ث", hi: "से", id: "dtk", vi: "giây" },
  expiresIn: {
    en: "Expires in {n} s",
    zh: "{n} 秒后刷新",
    ja: "{n} 秒後に更新",
    es: "Caduca en {n} s",
    pt: "Expira em {n} s", fr: "Expire dans {n} s", de: "Läuft ab in {n} s", ru: "Обновится через {n} с", it: "Scade tra {n} s", tr: "{n} sn içinde yenilenir", ko: "{n}초 후 갱신", ar: "يتجدد بعد {n} ث", hi: "{n} सेकंड में नया कोड", id: "Berakhir dalam {n} dtk", vi: "Hết hạn sau {n} giây",
  },
  errShort: {
    en: "That secret is too short — TOTP keys are at least 10 base32 characters.",
    zh: "密钥太短——TOTP 密钥至少需要 10 个 base32 字符。",
    ja: "シークレットが短すぎます。TOTP 鍵は base32 で 10 文字以上必要です。",
    es: "El secreto es demasiado corto: las claves TOTP tienen al menos 10 caracteres base32.",
    pt: "O segredo é curto demais — chaves TOTP têm pelo menos 10 caracteres base32.", fr: "Ce secret est trop court — les clés TOTP font au moins 10 caractères base32.", de: "Dieses Secret ist zu kurz — TOTP-Schlüssel haben mindestens 10 base32-Zeichen.", ru: "Ключ слишком короткий — ключи TOTP содержат минимум 10 символов base32.", it: "Questo segreto è troppo corto — le chiavi TOTP hanno almeno 10 caratteri base32.", tr: "Bu gizli anahtar çok kısa — TOTP anahtarları en az 10 base32 karakterdir.", ko: "시크릿이 너무 짧습니다 — TOTP 키는 base32로 10자 이상이어야 합니다.", ar: "هذا المفتاح قصير جداً — مفاتيح TOTP تتكون من 10 أحرف base32 على الأقل.", hi: "यह सीक्रेट बहुत छोटा है — TOTP कुंजियाँ कम से कम 10 base32 अक्षर की होती हैं।", id: "Secret terlalu pendek — kunci TOTP minimal 10 karakter base32.", vi: "Secret quá ngắn — khóa TOTP cần ít nhất 10 ký tự base32.",
  },
  errChars: {
    en: "That doesn't look like a valid base32 secret. Allowed characters: A–Z and 2–7 (spaces and = are ignored).",
    zh: "这不像有效的 base32 密钥。允许的字符:A–Z 和 2–7(空格和 = 会被忽略)。",
    ja: "有効な base32 シークレットではないようです。使える文字は A–Z と 2–7 です(空白と = は無視されます)。",
    es: "No parece un secreto base32 válido. Caracteres permitidos: A–Z y 2–7 (los espacios y = se ignoran).",
    pt: "Não parece um segredo base32 válido. Caracteres permitidos: A–Z e 2–7 (espaços e = são ignorados).", fr: "Ceci ne ressemble pas à un secret base32 valide. Caractères autorisés : A–Z et 2–7 (les espaces et = sont ignorés).", de: "Das sieht nicht nach einem gültigen base32-Secret aus. Erlaubte Zeichen: A–Z und 2–7 (Leerzeichen und = werden ignoriert).", ru: "Это не похоже на корректный base32-ключ. Допустимые символы: A–Z и 2–7 (пробелы и = игнорируются).", it: "Non sembra un segreto base32 valido. Caratteri ammessi: A–Z e 2–7 (spazi e = vengono ignorati).", tr: "Bu geçerli bir base32 gizli anahtarı gibi görünmüyor. İzin verilen karakterler: A–Z ve 2–7 (boşluk ve = yok sayılır).", ko: "유효한 base32 시크릿이 아닌 것 같습니다. 허용 문자: A–Z와 2–7(공백과 =는 무시됩니다).", ar: "لا يبدو هذا مفتاح base32 صالحاً. الأحرف المسموحة: A–Z و 2–7 (تُتجاهل المسافات و=).", hi: "यह मान्य base32 सीक्रेट जैसा नहीं लगता। अनुमत अक्षर: A–Z और 2–7 (स्पेस और = को नज़रअंदाज़ किया जाता है)।", id: "Ini tidak tampak seperti secret base32 yang valid. Karakter yang diizinkan: A–Z dan 2–7 (spasi dan = diabaikan).", vi: "Đây không giống secret base32 hợp lệ. Ký tự cho phép: A–Z và 2–7 (dấu cách và = bị bỏ qua).",
  },
  enterFirst: {
    en: "Paste a secret above to see live codes.",
    zh: "在上方粘贴密钥即可实时生成验证码。",
    ja: "シークレットを貼り付けるとコードがリアルタイムで表示されます。",
    es: "Pega un secreto arriba para ver códigos en vivo.",
    pt: "Cole um segredo acima para ver códigos em tempo real.", fr: "Collez un secret ci-dessus pour voir les codes en direct.", de: "Oben ein Secret einfügen, um Live-Codes zu sehen.", ru: "Вставьте ключ выше, чтобы видеть коды в реальном времени.", it: "Incolla un segreto sopra per vedere i codici in tempo reale.", tr: "Canlı kodları görmek için yukarıya bir gizli anahtar yapıştırın.", ko: "위에 시크릿을 붙여넣으면 실시간 코드가 표시됩니다.", ar: "الصق مفتاحاً بالأعلى لرؤية الرموز مباشرة.", hi: "लाइव कोड देखने के लिए ऊपर सीक्रेट पेस्ट करें।", id: "Tempel secret di atas untuk melihat kode secara langsung.", vi: "Dán secret ở trên để xem mã trực tiếp.",
  },
  offlineNote: {
    en: "Works fully offline: the code is computed with WebCrypto in your browser and the secret is never sent or stored.",
    zh: "完全离线可用:验证码由浏览器内的 WebCrypto 计算,密钥不会被发送或存储。",
    ja: "完全オフラインで動作:コードはブラウザ内の WebCrypto で計算され、シークレットは送信・保存されません。",
    es: "Funciona totalmente sin conexión: el código se calcula con WebCrypto en tu navegador y el secreto nunca se envía ni se guarda.",
    pt: "Funciona totalmente offline: o código é calculado com WebCrypto no seu navegador e o segredo nunca é enviado nem armazenado.", fr: "Fonctionne totalement hors ligne : le code est calculé avec WebCrypto dans votre navigateur et le secret n'est jamais envoyé ni stocké.", de: "Funktioniert vollständig offline: Der Code wird mit WebCrypto im Browser berechnet, das Secret wird nie gesendet oder gespeichert.", ru: "Работает полностью офлайн: код вычисляется через WebCrypto в браузере, ключ не отправляется и не сохраняется.", it: "Funziona completamente offline: il codice è calcolato con WebCrypto nel browser e il segreto non viene mai inviato o salvato.", tr: "Tamamen çevrimdışı çalışır: kod tarayıcınızda WebCrypto ile hesaplanır, gizli anahtar asla gönderilmez veya saklanmaz.", ko: "완전 오프라인 작동: 코드는 브라우저의 WebCrypto로 계산되며 시크릿은 전송·저장되지 않습니다.", ar: "يعمل دون اتصال تماماً: يُحسب الرمز عبر WebCrypto في متصفحك ولا يُرسل المفتاح أو يُخزَّن أبداً.", hi: "पूरी तरह ऑफ़लाइन चलता है: कोड आपके ब्राउज़र में WebCrypto से बनता है और सीक्रेट कभी भेजा या सेव नहीं होता।", id: "Bekerja sepenuhnya offline: kode dihitung dengan WebCrypto di browser Anda dan secret tidak pernah dikirim atau disimpan.", vi: "Hoạt động hoàn toàn ngoại tuyến: mã được tính bằng WebCrypto trong trình duyệt và secret không bao giờ được gửi hay lưu.",
  },
  fromLink: {
    en: "Imported from otpauth link{extra}",
    zh: "已从 otpauth 链接导入{extra}",
    ja: "otpauth リンクから読み込みました{extra}",
    es: "Importado del enlace otpauth{extra}",
    pt: "Importado do link otpauth{extra}", fr: "Importé depuis un lien otpauth{extra}", de: "Aus otpauth-Link importiert{extra}", ru: "Импортировано из ссылки otpauth{extra}", it: "Importato da link otpauth{extra}", tr: "otpauth bağlantısından içe aktarıldı{extra}", ko: "otpauth 링크에서 가져옴{extra}", ar: "تم الاستيراد من رابط otpauth{extra}", hi: "otpauth लिंक से आयातित{extra}", id: "Diimpor dari tautan otpauth{extra}", vi: "Đã nhập từ liên kết otpauth{extra}",
  },
  forAccount: { en: " for {account}", zh: "({account})", ja: "({account})", es: " de {account}", pt: " de {account}", fr: " pour {account}", de: " für {account}", ru: " для {account}", it: " per {account}", tr: " ({account})", ko: " ({account})", ar: " لـ {account}", hi: " ({account})", id: " untuk {account}", vi: " cho {account}" },
};

const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

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
