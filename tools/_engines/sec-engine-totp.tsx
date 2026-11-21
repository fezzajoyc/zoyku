"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import {
  ALGOS, base32Decode, hotp, parseOtpauth, totp,
  type TotpAlgo,
} from "../_lib/totp";
import { adjacentCodes, base32Encode, buildOtpauthUri, generateTotpSecret } from "../_lib/totp-generate";

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
  genNeedAccount: {
    en: "Enter an account name first — it labels the secret in your app.",
    zh: "请先填写账户名——它会作为密钥在应用中的标签。",
    ja: "まずアカウント名を入力してください——アプリ内のラベルになります。",
    es: "Introduce primero un nombre de cuenta: etiqueta el secreto en tu app.",
    pt: "Informe primeiro um nome de conta: ele rotula o segredo no seu app.",
    fr: "Saisissez d'abord un nom de compte : il étiquette le secret dans votre app.",
    de: "Zuerst einen Kontonamen eingeben — er beschriftet das Secret in der App.",
    ru: "Сначала укажите имя учётной записи — оно станет меткой секрета в приложении.",
    it: "Inserisci prima un nome account: etichetta il segreto nella tua app.",
    tr: "Önce hesap adı girin — uygulamanızda anahtarın etiketi olur.",
    ko: "먼저 계정 이름을 입력하세요 — 앱에서 시크릿의 라벨이 됩니다.",
    ar: "أدخل اسم الحساب أولاً — سيكون تسمية المفتاح في تطبيقك.",
    hi: "पहले खाता नाम दर्ज करें — यह ऐप में सीक्रेट का लेबल होगा।",
    id: "Masukkan nama akun dulu — itu menjadi label secret di aplikasi Anda.",
    vi: "Nhập tên tài khoản trước — nó là nhãn của secret trong app của bạn.",
  },
  fromLink: {
    en: "Imported from otpauth link{extra}",
    zh: "已从 otpauth 链接导入{extra}",
    ja: "otpauth リンクから読み込みました{extra}",
    es: "Importado del enlace otpauth{extra}",
    pt: "Importado do link otpauth{extra}", fr: "Importé depuis un lien otpauth{extra}", de: "Aus otpauth-Link importiert{extra}", ru: "Импортировано из ссылки otpauth{extra}", it: "Importato da link otpauth{extra}", tr: "otpauth bağlantısından içe aktarıldı{extra}", ko: "otpauth 링크에서 가져옴{extra}", ar: "تم الاستيراد من رابط otpauth{extra}", hi: "otpauth लिंक से आयातित{extra}", id: "Diimpor dari tautan otpauth{extra}", vi: "Đã nhập từ liên kết otpauth{extra}",
  },
  forAccount: { en: " for {account}", zh: "({account})", ja: "({account})", es: " de {account}", pt: " de {account}", fr: " pour {account}", de: " für {account}", ru: " для {account}", it: " per {account}", tr: " ({account})", ko: " ({account})", ar: " لـ {account}", hi: " ({account})", id: " untuk {account}", vi: " cho {account}" },
  errLink: {
    en: "Cannot import this TOTP link. It needs a secret and supported settings: SHA1/SHA256/SHA512, 6 or 8 digits, and 30 or 60 seconds. Omitted settings default to SHA1, 6 digits and 30 seconds.",
    zh: "无法导入此 TOTP 链接。需要密钥及支持的设置：SHA1/SHA256/SHA512、6 或 8 位、30 或 60 秒。省略参数时默认使用 SHA1、6 位和 30 秒。",
    ja: "このTOTPリンクは読み込めません。シークレットと対応設定（SHA1/SHA256/SHA512、6/8桁、30/60秒）が必要です。省略時はSHA1・6桁・30秒です。",
    es: "No se puede importar este enlace TOTP. Requiere un secreto y SHA1/SHA256/SHA512, 6 u 8 dígitos y 30 o 60 segundos. Si se omiten, se usa SHA1, 6 dígitos y 30 segundos.",
    pt: "Não foi possível importar o link TOTP. É necessário um segredo e SHA1/SHA256/SHA512, 6 ou 8 dígitos e 30 ou 60 segundos. O padrão é SHA1, 6 dígitos e 30 segundos.",
    fr: "Lien TOTP non importable. Un secret et des paramètres compatibles sont requis : SHA1/SHA256/SHA512, 6 ou 8 chiffres, 30 ou 60 secondes. Par défaut : SHA1, 6 chiffres, 30 secondes.",
    de: "TOTP-Link nicht importierbar. Erfordert ein Secret und SHA1/SHA256/SHA512, 6 oder 8 Stellen und 30 oder 60 Sekunden. Ohne Angabe gelten SHA1, 6 Stellen und 30 Sekunden.",
    ru: "Не удалось импортировать ссылку TOTP. Нужны ключ и параметры SHA1/SHA256/SHA512, 6 или 8 цифр, 30 или 60 секунд. По умолчанию: SHA1, 6 цифр, 30 секунд.",
    it: "Impossibile importare il link TOTP. Servono un segreto e SHA1/SHA256/SHA512, 6 o 8 cifre, 30 o 60 secondi. Se omessi: SHA1, 6 cifre e 30 secondi.",
    tr: "TOTP bağlantısı içe aktarılamıyor. Gizli anahtar ve SHA1/SHA256/SHA512, 6 veya 8 hane, 30 veya 60 saniye gerekir. Varsayılanlar SHA1, 6 hane ve 30 saniyedir.",
    ko: "TOTP 링크를 가져올 수 없습니다. 시크릿과 지원 설정(SHA1/SHA256/SHA512, 6/8자리, 30/60초)이 필요합니다. 생략 시 SHA1, 6자리, 30초가 적용됩니다.",
    ar: "تعذر استيراد رابط TOTP. يلزم مفتاح وإعدادات مدعومة: SHA1/SHA256/SHA512 و6 أو 8 خانات و30 أو 60 ثانية. الإعدادات الافتراضية SHA1 و6 خانات و30 ثانية.",
    hi: "यह TOTP लिंक आयात नहीं हो सका। सीक्रेट और समर्थित सेटिंग चाहिए: SHA1/SHA256/SHA512, 6 या 8 अंक, 30 या 60 सेकंड। न देने पर SHA1, 6 अंक और 30 सेकंड लागू होते हैं।",
    id: "Tautan TOTP tidak dapat diimpor. Perlu secret dan pengaturan SHA1/SHA256/SHA512, 6 atau 8 digit, 30 atau 60 detik. Jika dihilangkan, digunakan SHA1, 6 digit, 30 detik.",
    vi: "Không thể nhập liên kết TOTP. Cần secret và thiết lập hỗ trợ: SHA1/SHA256/SHA512, 6 hoặc 8 chữ số, 30 hoặc 60 giây. Khi bỏ trống: SHA1, 6 chữ số, 30 giây.",
  },
};

const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
export const TOTP_LINK_LABELS = LABELS.errLink;

const GEN = {
  genTitle: { en: "Generate a new secret", zh: "生成新的注册密钥", ja: "新しいシークレットを生成", es: "Generar un nuevo secreto", pt: "Gerar um novo segredo", fr: "Générer un nouveau secret", de: "Neues Secret erzeugen", ru: "Создать новый секрет", it: "Genera un nuovo segreto", tr: "Yeni gizli anahtar üret", ko: "새 시크릿 생성", ar: "إنشاء مفتاح جديد", hi: "नया सीक्रेट बनाएँ", id: "Buat secret baru", vi: "Tạo secret mới" },
  genAccount: { en: "Account (name shown in your app)", zh: "账户(应用中显示的名称)", ja: "アカウント(アプリに表示)", es: "Cuenta (nombre en tu app)", pt: "Conta (nome no app)", fr: "Compte (nom dans l'app)", de: "Konto (Name in der App)", ru: "Учётная запись (в приложении)", it: "Account (nome nell'app)", tr: "Hesap (uygulamada görünen)", ko: "계정(앱에 표시)", ar: "الحساب (يظهر في التطبيق)", hi: "खाता (ऐप में दिखेगा)", id: "Akun (tampil di aplikasi)", vi: "Tài khoản (hiện trong app)" },
  genIssuer: { en: "Issuer (service name, optional)", zh: "签发方(服务名,可选)", ja: "発行者(サービス名、任意)", es: "Emisor (servicio, opcional)", pt: "Emissor (serviço, opcional)", fr: "Émetteur (service, facultatif)", de: "Herausgeber (Dienst, optional)", ru: "Издатель (сервис, необяз.)", it: "Emittente (servizio, opzionale)", tr: "Sağlayıcı (hizmet adı, isteğe bağlı)", ko: "발급자(서비스 이름, 선택)", ar: "المُصدر (اسم الخدمة، اختياري)", hi: "जारीकर्ता (सेवा नाम, वैकल्पिक)", id: "Penerbit (nama layanan, opsional)", vi: "Nhà phát hành (tên dịch vụ, tùy chọn)" },
  genBtn: { en: "Generate secret", zh: "生成密钥", ja: "シークレットを生成", es: "Generar secreto", pt: "Gerar segredo", fr: "Générer le secret", de: "Secret erzeugen", ru: "Сгенерировать секрет", it: "Genera segreto", tr: "Gizli anahtar üret", ko: "시크릿 생성", ar: "إنشاء المفتاح", hi: "सीक्रेट बनाएँ", id: "Buat secret", vi: "Tạo secret" },
  genSecret: { en: "Secret (base32)", zh: "密钥(base32)", ja: "シークレット(base32)", es: "Secreto (base32)", pt: "Segredo (base32)", fr: "Secret (base32)", de: "Secret (Base32)", ru: "Секрет (base32)", it: "Segreto (base32)", tr: "Gizli anahtar (base32)", ko: "시크릿(base32)", ar: "المفتاح (base32)", hi: "सीक्रेट (base32)", id: "Secret (base32)", vi: "Secret (base32)" },
  genUri: { en: "otpauth:// link (paste into your app or the QR tool)", zh: "otpauth:// 链接(粘贴到验证器应用或二维码工具)", ja: "otpauth:// リンク(アプリや QR ツールに貼り付け)", es: "Enlace otpauth:// (pega en tu app o la herramienta QR)", pt: "Link otpauth:// (cole no app ou na ferramenta QR)", fr: "Lien otpauth:// (collez dans l'app ou l'outil QR)", de: "otpauth://-Link (in App oder QR-Tool einfügen)", ru: "Ссылка otpauth:// (в приложение или QR-инструмент)", it: "Link otpauth:// (incolla nell'app o nello strumento QR)", tr: "otpauth:// bağlantısı (uygulamaya veya QR aracına yapıştır)", ko: "otpauth:// 링크(앱이나 QR 도구에 붙여넣기)", ar: "رابط otpauth:// (الصق في التطبيق أو أداة QR)", hi: "otpauth:// लिंक (ऐप या QR टूल में पेस्ट करें)", id: "Tautan otpauth:// (tempel di aplikasi atau alat QR)", vi: "Liên kết otpauth:// (dán vào app hoặc công cụ QR)" },
  genHint: { en: "The generated secret fills the box above — codes start immediately. Everything stays on this device.", zh: "生成的密钥会填入上方输入框,验证码立即开始计算;一切都在本机完成。", ja: "生成したシークレットは上のボックスに入り、すぐコードが始まります。すべて端末内で完結します。", es: "El secreto generado llena el cuadro de arriba: los códigos empiezan de inmediato. Todo queda en este dispositivo.", pt: "O segredo gerado preenche a caixa acima — os códigos começam imediatamente. Tudo fica neste dispositivo.", fr: "Le secret généré remplit le champ ci-dessus — les codes démarrent immédiatement. Tout reste sur cet appareil.", de: "Das erzeugte Secret füllt das Feld oben — Codes starten sofort. Alles bleibt auf diesem Gerät.", ru: "Созданный секрет заполнит поле выше — коды начнутся сразу. Всё остаётся на этом устройстве.", it: "Il segreto generato riempie il campo sopra — i codici partono subito. Tutto resta su questo dispositivo.", tr: "Üretilen anahtar yukarıdaki kutuyu doldurur — kodlar hemen başlar. Her şey bu cihazda kalır.", ko: "생성된 시크릿이 위 입력란을 채우고 코드가 바로 시작됩니다. 모든 것은 이 기기에만 남습니다.", ar: "المفتاح المُنشأ يملأ الصندوق أعلاه — تبدأ الرموز فوراً. كل شيء يبقى على هذا الجهاز.", hi: "बनाया गया सीक्रेट ऊपर के बॉक्स में भर जाएगा — कोड तुरंत शुरू होंगे। सब कुछ इसी डिवाइस पर रहेगा।", id: "Secret yang dibuat mengisi kotak di atas — kode langsung dimulai. Semua tetap di perangkat ini.", vi: "Secret tạo ra sẽ điền vào ô phía trên — mã bắt đầu ngay. Mọi thứ giữ nguyên trên thiết bị này." },
  adjPrev: { en: "Previous window", zh: "上一时间窗", ja: "前のウィンドウ", es: "Ventana anterior", pt: "Janela anterior", fr: "Fenêtre précédente", de: "Vorheriges Fenster", ru: "Предыдущее окно", it: "Finestra precedente", tr: "Önceki pencere", ko: "이전 창", ar: "النافذة السابقة", hi: "पिछली विंडो", id: "Jendela sebelumnya", vi: "Cửa sổ trước" },
  adjNext: { en: "Next window", zh: "下一时间窗", ja: "次のウィンドウ", es: "Ventana siguiente", pt: "Janela seguinte", fr: "Fenêtre suivante", de: "Nächstes Fenster", ru: "Следующее окно", it: "Finestra successiva", tr: "Sonraki pencere", ko: "다음 창", ar: "النافذة التالية", hi: "अगली विंडो", id: "Jendela berikutnya", vi: "Cửa sổ sau" },
  adjNote: { en: "Clock slightly off on this device? These are the adjacent windows.", zh: "本机时钟略偏?这是前后两个时间窗的码。", ja: "端末の時計がずれている場合の前後ウィンドウです。", es: "¿El reloj está ligeramente desajustado? Estas son las ventanas adyacentes.", pt: "Relógio levemente dessincronizado? Estas são as janelas adjacentes.", fr: "Horloge légèrement décalée ? Voici les fenêtres adjacentes.", de: "Uhr leicht abweichend? Dies sind die angrenzenden Fenster.", ru: "Часы немного спешат/отстают? Это соседние окна.", it: "Orologio leggermente sfasato? Queste sono le finestre adiacenti.", tr: "Saat biraz kaymış mı? Bunlar komşu pencereler.", ko: "기기 시계가 약간 어긋났나요? 인접 창의 코드입니다.", ar: "الساعة متأخرة قليلاً؟ هذه النافذتان المجاورتان.", hi: "घड़ी थोड़ी आगे/पीछे है? ये आस-पास की विंडो हैं।", id: "Jam sedikit meleset? Ini jendela di sekitarnya.", vi: "Đồng hồ hơi lệch? Đây là hai cửa sổ liền kề." },
} as const;

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
  const [genAccount, setGenAccount] = useState("");
  const [genIssuer, setGenIssuer] = useState("");
  const [genSecret, setGenSecret] = useState("");
  const [genUri, setGenUri] = useState("");
  const [genError, setGenError] = useState<string | null>(null);
  const [adj, setAdj] = useState<{ previous: string; next: string } | null>(null);

  // 解析输入:otpauth 链接或裸 base32 密钥(渲染期纯解析,副作用交给 effect)
  const parsed = useMemo(() => {
    const s = input.trim();
    if (!s) return { kind: "empty" as const };
    let secret = s;
    let link: { digits: number; period: number; algo: TotpAlgo; account?: string } | null = null;
    if (/^otpauth:\/\//i.test(s)) {
      const p = parseOtpauth(s);
      if (!p) return { kind: "invalidLink" as const };
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
    if (parsed.kind === "invalidLink") {
      setError(L("errLink"));
      setImported(null);
      return;
    }
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
      setDigits(parsed.link.digits);
      setPeriod(parsed.link.period);
      setAlgo(parsed.link.algo);
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

  // G17:相邻时间窗(时钟略偏时对照用)
  useEffect(() => {
    let cancelled = false;
    if (!key) {
      setAdj(null);
      return;
    }
    void adjacentCodes(key, now, algo, digits, period, totp).then((r) => {
      if (!cancelled) setAdj({ previous: r.previous, next: r.next });
    });
    return () => {
      cancelled = true;
    };
  }, [key, now, algo, digits, period]);

  const progress = remaining / period;

  // G17:生成注册密钥 → 直接灌入上方输入框,立即出码
  const doGenerate = () => {
    setGenError(null);
    const r = generateTotpSecret();
    if ("error" in r) {
      setGenError(L("errShort"));
      return;
    }
    const secret32 = base32Encode(r);
    const uri = buildOtpauthUri({
      account: genAccount,
      issuer: genIssuer,
      secretBase32: secret32,
      algo,
      digits,
      period,
    });
    if (!uri.ok) {
      setGenError(uri.code === "emptyAccount" ? L("genNeedAccount") : L("errChars"));
      return;
    }
    setGenSecret(secret32);
    setGenUri(uri.uri);
    setInput(secret32);
  };

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

        {code && adj && (
          <div className="mono flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-[var(--color-sub)]">
            <span>
              {GEN.adjPrev[locale] ?? GEN.adjPrev.en}: {adj.previous}
            </span>
            <span>
              {GEN.adjNext[locale] ?? GEN.adjNext.en}: {adj.next}
            </span>
            <span className="text-[12.5px]">{GEN.adjNote[locale] ?? GEN.adjNote.en}</span>
          </div>
        )}

        {code && (
          <div className="flex flex-wrap gap-2.5">
            <CopyButton value={code} />
          </div>
        )}

        <div className="space-y-3 rounded-xl border hairline p-4">
          <p className="text-[13px] font-semibold">{GEN.genTitle[locale] ?? GEN.genTitle.en}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block space-y-1.5 text-[13px] font-medium">
              <span>{GEN.genAccount[locale] ?? GEN.genAccount.en}</span>
              <input
                type="text"
                className="field w-full"
                value={genAccount}
                onChange={(e) => setGenAccount(e.target.value)}
                aria-label={GEN.genAccount[locale] ?? GEN.genAccount.en}
              />
            </label>
            <label className="block space-y-1.5 text-[13px] font-medium">
              <span>{GEN.genIssuer[locale] ?? GEN.genIssuer.en}</span>
              <input
                type="text"
                className="field w-full"
                value={genIssuer}
                onChange={(e) => setGenIssuer(e.target.value)}
                aria-label={GEN.genIssuer[locale] ?? GEN.genIssuer.en}
              />
            </label>
          </div>
          <button
            type="button"
            onClick={doGenerate}
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
            disabled={!genAccount.trim()}
          >
            {GEN.genBtn[locale] ?? GEN.genBtn.en}
          </button>
          {genError && (
            <p role="alert" className="rounded-xl bg-[rgba(178,80,0,0.08)] px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
              {genError}
            </p>
          )}
          {genSecret && (
            <div className="space-y-2">
              <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{GEN.genSecret[locale] ?? GEN.genSecret.en}</p>
              <p className="mono break-all rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5 text-[13.5px]">{genSecret}</p>
              <CopyButton value={genSecret} />
            </div>
          )}
          {genUri && (
            <div className="space-y-2">
              <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{GEN.genUri[locale] ?? GEN.genUri.en}</p>
              <p className="mono break-all rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5 text-[13px] leading-5" dir="ltr">
                {genUri}
              </p>
              <CopyButton value={genUri} />
            </div>
          )}
          <p className="text-[12.5px] leading-5 text-[var(--color-sub)]">{GEN.genHint[locale] ?? GEN.genHint.en}</p>
        </div>

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{L("offlineNote")}</p>
      </div>
    </ToolPanel>
  );
}
