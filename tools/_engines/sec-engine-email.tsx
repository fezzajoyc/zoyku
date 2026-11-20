"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Icon } from "@/components/icons";
import { ToolPanel } from "@/components/ui";
import type { Locale } from "@/lib/site";
import { lookupEmailDomain, type MailDnsResult } from "../_lib/email";

/**
 * 邮箱校验器 —— 两段式:
 *  1) 语法检查 100% 本地(长度、local part、域名标签、TLD);
 *  2) MX 检查通过 DNS-over-HTTPS(dns.google)联网查询域名邮件记录,带 A 记录回退。
 *  3) 常见域名拼写纠错(本地编辑距离)。
 * UI 顶部与结果区都要披露"域名部分会联网查询"。
 */

const LABELS: Record<string, Record<string, string>> = {
  placeholder: {
    en: "name@example.com",
    zh: "name@example.com",
    ja: "name@example.com",
    es: "name@example.com",
    pt: "name@example.com",
  },
  validate: { en: "Validate", zh: "校验", ja: "検証", es: "Validar", pt: "Validar" },
  checking: { en: "Checking…", zh: "检测中…", ja: "確認中…", es: "Comprobando…", pt: "Verificando…" },
  disclosure: {
    en: "Network notice: only the domain (the part after the @) is sent to Google's public DNS (dns.google) over HTTPS to check its mail records. The full address and the part before the @ never leave your browser.",
    zh: "联网说明:校验时仅将域名(@ 之后的部分)通过 HTTPS 发送到 Google 公共 DNS(dns.google)查询邮件记录;完整邮箱地址和 @ 之前的部分不会离开你的浏览器。",
    ja: "ネットワーク利用について:検証時はドメイン部分(@ の右側)だけが HTTPS 経由で Google Public DNS(dns.google)に送信され、メールレコードを確認します。メールアドレス全体や @ の左側はブラウザの外に出ません。",
    es: "Aviso de red: solo el dominio (la parte tras la @) se envía por HTTPS al DNS público de Google (dns.google) para comprobar sus registros de correo. La dirección completa y la parte anterior a la @ nunca salen de tu navegador.",
    pt: "Aviso de rede: apenas o domínio (a parte depois do @) é enviado por HTTPS ao DNS público do Google (dns.google) para verificar os registros de e-mail. O endereço completo e a parte antes do @ nunca saem do seu navegador.",
  },
  syntax: { en: "Syntax", zh: "语法格式", ja: "書式", es: "Sintaxis", pt: "Sintaxe" },
  syntaxOk: {
    en: "Valid email format",
    zh: "邮箱格式有效",
    ja: "メールアドレスの書式は有効です",
    es: "Formato de correo válido",
    pt: "Formato de e-mail válido",
  },
  syntaxBad: {
    en: "This is not a valid email format.",
    zh: "这不是有效的邮箱格式。",
    ja: "有効なメールアドレスの形式ではありません。",
    es: "Este no es un formato de correo válido.",
    pt: "Este não é um formato de e-mail válido.",
  },
  typo: { en: "Common-domain check", zh: "常见域名比对", ja: "主要ドメインのチェック", es: "Comprobación de dominio común", pt: "Verificação de domínio comum" },
  typoOk: {
    en: "No typo detected in the domain.",
    zh: "未发现域名拼写错误。",
    ja: "ドメインに誤字は見つかりませんでした。",
    es: "No se detectaron errores en el dominio.",
    pt: "Nenhum erro de digitação detectado no domínio.",
  },
  typoSuggest: {
    en: "Did you mean {suggestion}?",
    zh: "你是不是想输入 {suggestion}?",
    ja: "{suggestion} の間違いではありませんか?",
    es: "¿Quisiste decir {suggestion}?",
    pt: "Você quis dizer {suggestion}?",
  },
  mx: { en: "Mail servers (MX)", zh: "邮件服务器(MX)", ja: "メールサーバー(MX)", es: "Servidores de correo (MX)", pt: "Servidores de e-mail (MX)" },
  mxOk: {
    en: "This domain can receive email.",
    zh: "该域名可以接收邮件。",
    ja: "このドメインはメールを受信できます。",
    es: "Este dominio puede recibir correos.",
    pt: "Este domínio pode receber e-mails.",
  },
  mxNone: {
    en: "No MX records found.",
    zh: "未找到 MX 记录。",
    ja: "MX レコードが見つかりません。",
    es: "No se encontraron registros MX.",
    pt: "Nenhum registro MX encontrado.",
  },
  mxAFallback: {
    en: "No MX records, but the domain has an A record — some servers still accept mail this way.",
    zh: "没有 MX 记录,但该域名有 A 记录——部分服务器仍可能通过这种方式收信。",
    ja: "MX レコードはありませんが、A レコードはあります。この方式でメールを受け付けるサーバーもあります。",
    es: "Sin registros MX, pero el dominio tiene registro A: algunos servidores aún aceptan correo así.",
    pt: "Sem registros MX, mas o domínio tem um registro A — alguns servidores ainda aceitam e-mail assim.",
  },
  mxNull: {
    en: "This domain explicitly publishes that it accepts no mail (null MX).",
    zh: "该域名明确声明不接收任何邮件(null MX)。",
    ja: "このドメインはメールを受け付けないと明示しています(null MX)。",
    es: "Este dominio indica explícitamente que no acepta correo (null MX).",
    pt: "Este domínio declara explicitamente que não aceita e-mail (null MX).",
  },
  enterFirst: {
    en: "Enter an email address and press Validate.",
    zh: "输入邮箱地址后点击校验。",
    ja: "メールアドレスを入力して「検証」を押してください。",
    es: "Introduce un correo y pulsa Validar.",
    pt: "Digite um e-mail e clique em Validar.",
  },
  summaryGood: {
    en: "Looks deliverable",
    zh: "看起来可以投递",
    ja: "配信できそうです",
    es: "Parece entregable",
    pt: "Parece entregável",
  },
  summaryBad: {
    en: "Problems found",
    zh: "发现问题",
    ja: "問題が見つかりました",
    es: "Problemas encontrados",
    pt: "Problemas encontrados",
  },
  networkError: {
    en: "The DNS query failed. Check your connection and try again.",
    zh: "DNS 查询失败,请检查网络连接后重试。",
    ja: "DNS 問い合わせに失敗しました。接続を確認して再試行してください。",
    es: "La consulta DNS falló. Comprueba tu conexión e inténtalo de nuevo.",
    pt: "A consulta DNS falhou. Verifique sua conexão e tente novamente.",
  },
  priority: { en: "priority", zh: "优先级", ja: "優先度", es: "prioridad", pt: "prioridade" },
};

export const MAIL_DNS_LABELS: Record<string, Record<Locale, string>> = {
  mxOk: {
    en: "Mail routing records found. This does not verify that the mailbox exists or accepts delivery.",
    zh: "已找到邮件路由记录。这不能验证邮箱是否存在或能否成功投递。",
    ja: "メールの配送先レコードが見つかりました。メールボックスの存在や配信成功は確認できません。",
    es: "Se encontraron rutas de correo. Esto no verifica que el buzón exista o acepte entregas.",
    pt: "Registros de rota de e-mail encontrados. Isso não confirma a existência da caixa nem a entrega.",
    fr: "Routage de courrier trouvé. Cela ne vérifie ni l'existence de la boîte ni l'acceptation des messages.",
    de: "Mail-Routing-Einträge gefunden. Existenz und Zustellbarkeit des Postfachs sind damit nicht bestätigt.",
    ru: "Найдены записи маршрутизации почты. Это не подтверждает существование ящика или доставку.",
    it: "Trovate rotte di posta. Questo non verifica che la casella esista o accetti messaggi.",
    tr: "E-posta yönlendirme kayıtları bulundu. Bu, posta kutusunun varlığını veya teslimatı doğrulamaz.",
    ko: "메일 경로 레코드를 찾았습니다. 메일함의 존재나 수신 가능 여부를 확인한 것은 아닙니다.",
    ar: "عُثر على سجلات توجيه البريد. هذا لا يؤكد وجود صندوق البريد أو قبوله للتسليم.",
    hi: "मेल रूटिंग रिकॉर्ड मिले। इससे मेलबॉक्स के अस्तित्व या ईमेल स्वीकार करने की पुष्टि नहीं होती।",
    id: "Catatan rute email ditemukan. Ini tidak memastikan kotak surat ada atau menerima pengiriman.",
    vi: "Đã tìm thấy bản ghi định tuyến thư. Điều này không xác minh hộp thư tồn tại hay nhận được thư.",
  },
  mxAFallback: {
    en: "No MX records; A or AAAA records provide a possible fallback route. Mail acceptance is unverified.",
    zh: "没有 MX 记录；A 或 AAAA 记录提供了可能的备用路径。尚未验证是否接受邮件。",
    ja: "MXレコードはありません。AまたはAAAAによる代替経路の可能性がありますが、受信は未確認です。",
    es: "Sin registros MX; los registros A o AAAA ofrecen una posible ruta alternativa. La recepción no está verificada.",
    pt: "Sem registros MX; A ou AAAA oferecem uma possível rota alternativa. A aceitação de e-mail não foi confirmada.",
    fr: "Aucun MX ; les enregistrements A ou AAAA offrent un repli possible. La réception reste non vérifiée.",
    de: "Keine MX-Einträge; A oder AAAA bieten eine mögliche Ausweichroute. Die Mail-Annahme ist ungeprüft.",
    ru: "MX-записей нет; A или AAAA дают возможный резервный маршрут. Приём почты не подтверждён.",
    it: "Nessun MX; i record A o AAAA offrono una possibile rotta alternativa. Ricezione non verificata.",
    tr: "MX kaydı yok; A veya AAAA kayıtları olası bir alternatif yol sunuyor. E-posta kabulü doğrulanmadı.",
    ko: "MX 레코드가 없습니다. A 또는 AAAA 레코드가 대체 경로가 될 수 있으나 메일 수신은 확인되지 않았습니다.",
    ar: "لا توجد سجلات MX؛ تتيح سجلات A أو AAAA مسارًا بديلًا محتملًا. قبول البريد غير مؤكد.",
    hi: "MX रिकॉर्ड नहीं हैं; A या AAAA रिकॉर्ड संभावित वैकल्पिक मार्ग देते हैं। मेल स्वीकार होना सत्यापित नहीं है।",
    id: "Tidak ada MX; catatan A atau AAAA memberi kemungkinan rute cadangan. Penerimaan email belum terverifikasi.",
    vi: "Không có MX; bản ghi A hoặc AAAA tạo tuyến dự phòng có thể dùng. Chưa xác minh việc nhận thư.",
  },
  mxNull: {
    en: "This domain explicitly refuses email with a null MX record (0 .).",
    zh: "该域名通过 null MX 记录（0 .）明确声明不接收邮件。",
    ja: "このドメインはnull MXレコード（0 .）でメールを受信しないと明示しています。",
    es: "Este dominio rechaza el correo explícitamente mediante un registro MX nulo (0 .).",
    pt: "Este domínio recusa e-mail explicitamente com um registro MX nulo (0 .).",
    fr: "Ce domaine refuse explicitement le courrier via un enregistrement MX nul (0 .).",
    de: "Diese Domain lehnt E-Mail ausdrücklich mit einem Null-MX-Eintrag (0 .) ab.",
    ru: "Домен явно отказывается от почты с помощью нулевой MX-записи (0 .).",
    it: "Questo dominio rifiuta esplicitamente la posta con un record MX nullo (0 .).",
    tr: "Bu alan adı, null MX kaydıyla (0 .) e-postayı açıkça reddediyor.",
    ko: "이 도메인은 null MX 레코드(0 .)로 메일을 받지 않음을 명시합니다.",
    ar: "يرفض هذا النطاق البريد صراحةً عبر سجل MX فارغ (0 .).",
    hi: "यह डोमेन null MX रिकॉर्ड (0 .) द्वारा स्पष्ट रूप से ईमेल अस्वीकार करता है।",
    id: "Domain ini secara tegas menolak email melalui catatan null MX (0 .).",
    vi: "Tên miền này tuyên bố từ chối email qua bản ghi null MX (0 .).",
  },
  mxNone: {
    en: "No MX, A or AAAA mail route was found. This is not an explicit null MX declaration.",
    zh: "未找到 MX、A 或 AAAA 邮件路径。这不等同于明确的 null MX 声明。",
    ja: "MX・A・AAAAによる配送経路が見つかりません。明示的なnull MX宣言とは異なります。",
    es: "No se encontró ninguna ruta MX, A o AAAA. Esto no es una declaración explícita de MX nulo.",
    pt: "Nenhuma rota MX, A ou AAAA encontrada. Isso não é uma declaração explícita de MX nulo.",
    fr: "Aucune route MX, A ou AAAA trouvée. Ce n'est pas une déclaration explicite de MX nul.",
    de: "Keine Mail-Route über MX, A oder AAAA gefunden. Das ist keine ausdrückliche Null-MX-Erklärung.",
    ru: "Не найден маршрут MX, A или AAAA. Это не явное объявление нулевого MX.",
    it: "Nessuna rotta MX, A o AAAA trovata. Non è una dichiarazione esplicita di MX nullo.",
    tr: "MX, A veya AAAA posta yolu bulunamadı. Bu, açık bir null MX bildirimi değildir.",
    ko: "MX, A, AAAA 메일 경로를 찾지 못했습니다. 명시적인 null MX 선언과는 다릅니다.",
    ar: "لم يُعثر على مسار بريد MX أو A أو AAAA. هذا ليس إعلانًا صريحًا عن MX فارغ.",
    hi: "MX, A या AAAA मेल मार्ग नहीं मिला। यह स्पष्ट null MX घोषणा नहीं है।",
    id: "Rute email MX, A, atau AAAA tidak ditemukan. Ini bukan pernyataan null MX eksplisit.",
    vi: "Không tìm thấy tuyến thư MX, A hay AAAA. Đây không phải tuyên bố null MX rõ ràng.",
  },
  dnsNx: {
    en: "The domain does not exist (NXDOMAIN).",
    zh: "域名不存在（NXDOMAIN）。",
    ja: "ドメインが存在しません（NXDOMAIN）。",
    es: "El dominio no existe (NXDOMAIN).",
    pt: "O domínio não existe (NXDOMAIN).",
    fr: "Le domaine n'existe pas (NXDOMAIN).",
    de: "Die Domain existiert nicht (NXDOMAIN).",
    ru: "Домен не существует (NXDOMAIN).",
    it: "Il dominio non esiste (NXDOMAIN).",
    tr: "Alan adı mevcut değil (NXDOMAIN).",
    ko: "도메인이 존재하지 않습니다(NXDOMAIN).",
    ar: "النطاق غير موجود (NXDOMAIN).",
    hi: "डोमेन मौजूद नहीं है (NXDOMAIN)।",
    id: "Domain tidak ada (NXDOMAIN).",
    vi: "Tên miền không tồn tại (NXDOMAIN).",
  },
  dnsServfail: {
    en: "DNS resolution failed temporarily (SERVFAIL). Mail routing is unknown; retry later.",
    zh: "DNS 解析暂时失败（SERVFAIL）。邮件路由未知，请稍后重试。",
    ja: "DNS解決が一時的に失敗しました（SERVFAIL）。配送経路は不明です。後でもう一度お試しください。",
    es: "El DNS falló temporalmente (SERVFAIL). La ruta de correo es desconocida; reinténtelo más tarde.",
    pt: "Falha temporária no DNS (SERVFAIL). Rota de e-mail desconhecida; tente mais tarde.",
    fr: "Échec DNS temporaire (SERVFAIL). Routage de courrier inconnu ; réessayez plus tard.",
    de: "Vorübergehender DNS-Fehler (SERVFAIL). Mail-Routing unbekannt; später erneut versuchen.",
    ru: "Временный сбой DNS (SERVFAIL). Маршрут почты неизвестен; повторите позже.",
    it: "Errore DNS temporaneo (SERVFAIL). Rotta di posta sconosciuta; riprovare più tardi.",
    tr: "DNS çözümlemesi geçici olarak başarısız (SERVFAIL). Posta yolu bilinmiyor; daha sonra deneyin.",
    ko: "일시적인 DNS 해석 실패입니다(SERVFAIL). 메일 경로를 알 수 없습니다. 나중에 다시 시도하세요.",
    ar: "فشل DNS مؤقتًا (SERVFAIL). مسار البريد غير معروف؛ أعد المحاولة لاحقًا.",
    hi: "DNS समाधान अस्थायी रूप से विफल हुआ (SERVFAIL)। मेल मार्ग अज्ञात है; बाद में फिर कोशिश करें।",
    id: "Resolusi DNS gagal sementara (SERVFAIL). Rute email belum diketahui; coba lagi nanti.",
    vi: "Phân giải DNS tạm thời thất bại (SERVFAIL). Chưa rõ tuyến thư; hãy thử lại sau.",
  },
  dnsTemporary: {
    en: "DNS returned an inconclusive or refused response. Mail routing is unknown; retry later.",
    zh: "DNS 返回了无法确定或被拒绝的响应。邮件路由未知，请稍后重试。",
    ja: "DNSから不確定または拒否の応答がありました。配送経路は不明です。後で再試行してください。",
    es: "El DNS devolvió una respuesta inconclusa o rechazada. Ruta de correo desconocida; reinténtelo más tarde.",
    pt: "O DNS retornou resposta inconclusiva ou recusada. Rota de e-mail desconhecida; tente mais tarde.",
    fr: "Réponse DNS non concluante ou refusée. Routage inconnu ; réessayez plus tard.",
    de: "DNS-Antwort unklar oder verweigert. Mail-Routing unbekannt; später erneut versuchen.",
    ru: "Ответ DNS неопределён или отклонён. Маршрут почты неизвестен; повторите позже.",
    it: "Risposta DNS inconcludente o rifiutata. Rotta di posta sconosciuta; riprovare più tardi.",
    tr: "DNS belirsiz veya reddedilen bir yanıt döndürdü. Posta yolu bilinmiyor; daha sonra deneyin.",
    ko: "DNS 응답이 불확실하거나 거부되었습니다. 메일 경로를 알 수 없습니다. 나중에 다시 시도하세요.",
    ar: "أعاد DNS استجابة غير حاسمة أو مرفوضة. مسار البريد غير معروف؛ أعد المحاولة لاحقًا.",
    hi: "DNS ने अनिर्णायक या अस्वीकृत उत्तर दिया। मेल मार्ग अज्ञात है; बाद में फिर कोशिश करें।",
    id: "DNS memberi respons tidak pasti atau ditolak. Rute email belum diketahui; coba lagi nanti.",
    vi: "DNS trả về phản hồi chưa rõ hoặc bị từ chối. Chưa rõ tuyến thư; hãy thử lại sau.",
  },
};

export function EmailDnsOutcome({ result, locale }: { result: MailDnsResult; locale: Locale }) {
  const key = result.kind === "mx" ? "mxOk" : result.kind === "null-mx" ? "mxNull" : result.kind === "fallback" ? "mxAFallback" : result.kind === "no-route" ? "mxNone" : result.kind === "nxdomain" ? "dnsNx" : result.kind === "servfail" ? "dnsServfail" : "dnsTemporary";
  return <div className="flex items-start gap-2.5" data-mail-dns={result.kind}>
    <StatusIcon ok={result.kind === "mx"} warn={["fallback", "servfail", "temporary-error", "needs-address"].includes(result.kind)} />
    <div className="min-w-0">
      <dt className="text-[13.5px] font-semibold">{LABELS.mx[locale] ?? LABELS.mx.en}</dt>
      <dd className="text-[13.5px] leading-6 text-[var(--color-sub)]">
        {MAIL_DNS_LABELS[key][locale]}
        {result.kind === "mx" && <ul className="mono mt-1 space-y-0.5 text-[13px]">{result.hosts.slice(0, 6).map((host) => <li key={host}>{host}</li>)}</ul>}
      </dd>
    </div>
  </div>;
}

const COMMON_DOMAINS = [
  "gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "live.com", "msn.com",
  "yahoo.com", "icloud.com", "me.com", "aol.com", "proton.me", "protonmail.com",
  "hey.com", "fastmail.com", "zoho.com", "yandex.com", "gmx.com", "mail.com",
  "qq.com", "163.com", "126.com",
];

/** 语法检查:全部本地。宽松但实用的 RFC 5321/5322 近似。 */
function checkSyntax(email: string): boolean {
  const s = email.trim();
  if (s.length === 0 || s.length > 254) return false;
  const at = s.lastIndexOf("@");
  if (at <= 0 || at === s.length - 1) return false;
  const local = s.slice(0, at);
  const domain = s.slice(at + 1);
  // local part
  if (local.length > 64) return false;
  if (!/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local)) return false;
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;
  // domain:小写化后逐标签校验
  const d = domain.toLowerCase();
  if (d.length > 253) return false;
  const labels = d.split(".");
  if (labels.length < 2) return false;
  const labelRe = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
  return labels.every((l) => l.length > 0 && l.length <= 63 && labelRe.test(l));
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 3) return 99;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = cur;
  }
  return prev[n];
}

function findTypo(domain: string): string | null {
  let best: { d: string; dist: number } | null = null;
  for (const d of COMMON_DOMAINS) {
    const dist = levenshtein(domain, d);
    if (dist === 0) return null; // 本身就是常见域名
    if (!best || dist < best.dist) best = { d, dist };
  }
  return best && best.dist <= 2 ? best.d : null;
}

type CheckState = "idle" | "loading" | "done" | "error";

function StatusIcon({ ok, warn = false }: { ok: boolean; warn?: boolean }) {
  if (ok) {
    return <Icon name="check" size={16} className="mt-0.5 flex-none text-[var(--color-good)]" />;
  }
  if (warn) {
    return <Icon name="clock" size={16} className="mt-0.5 flex-none text-[#b8860b]" />;
  }
  return (
    <span
      aria-hidden
      className="mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-[var(--color-bad)] text-[11px] font-bold leading-none text-white"
    >
      ×
    </span>
  );
}

export function SecEmailValidatorEngine() {
  const { locale } = useI18n();
  const L = (key: string) => { const labels = MAIL_DNS_LABELS[key] ?? LABELS[key]; return labels[locale] ?? labels.en; };

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<CheckState>("idle");
  const [syntaxOk, setSyntaxOk] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [mailDns, setMailDns] = useState<MailDnsResult | null>(null);

  const run = async () => {
    const s = email.trim();
    const ok = checkSyntax(s);
    setSyntaxOk(ok);
    setMailDns(null);

    if (!ok) {
      setSuggestion(null);
      setStatus("done");
      return;
    }

    const domain = s.slice(s.lastIndexOf("@") + 1).toLowerCase();
    setSuggestion(findTypo(domain));
    setStatus("loading");
    try {
      setMailDns(await lookupEmailDomain(domain));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <ToolPanel>
      <div className="space-y-4">
        <p className="flex items-start gap-2 rounded-xl bg-[rgba(0,113,227,0.06)] px-4 py-2.5 text-[13px] leading-5 text-[var(--color-sub)]">
          <Icon name="globe" size={15} className="mt-0.5 flex-none text-[var(--color-accent-strong)]" />
          {L("disclosure")}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && void run()}
            placeholder={L("placeholder")}
            className="field min-w-[220px] flex-1"
            spellCheck={false}
            autoComplete="off"
            aria-label={L("placeholder")}
          />
          <button
            type="button"
            onClick={() => void run()}
            disabled={status === "loading" || email.trim().length === 0}
            className="rounded-full bg-[var(--color-accent)] px-5 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
          >
            {status === "loading" ? L("checking") : L("validate")}
          </button>
        </div>

        {status === "idle" && <p className="text-[13.5px] text-[var(--color-sub)]">{L("enterFirst")}</p>}

        {status === "error" && (
          <p
            role="alert"
            className="rounded-xl bg-[rgba(178,80,0,0.08)] px-4 py-2.5 text-[13.5px] leading-6 text-[var(--color-bad)]"
          >
            {L("networkError")}
          </p>
        )}

        {status === "done" && (
          <div className="space-y-3">
            <dl className="space-y-3">
              <div className="flex items-start gap-2.5">
                <StatusIcon ok={syntaxOk} />
                <div className="min-w-0">
                  <dt className="text-[13.5px] font-semibold">{L("syntax")}</dt>
                  <dd className="text-[13.5px] leading-6 text-[var(--color-sub)]">
                    {syntaxOk ? L("syntaxOk") : L("syntaxBad")}
                  </dd>
                </div>
              </div>

              {syntaxOk && suggestion && (
                <div className="flex items-start gap-2.5">
                  <StatusIcon ok={false} />
                  <div className="min-w-0">
                    <dt className="text-[13.5px] font-semibold">{L("typo")}</dt>
                    <dd className="text-[13.5px] leading-6 text-[var(--color-bad)]">
                      {L("typoSuggest").replace("{suggestion}", suggestion)}
                    </dd>
                  </div>
                </div>
              )}

              {syntaxOk && mailDns && <EmailDnsOutcome result={mailDns} locale={locale} />}
            </dl>
          </div>
        )}
      </div>
    </ToolPanel>
  );
}
