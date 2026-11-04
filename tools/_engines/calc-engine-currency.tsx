"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Icon } from "@/components/icons";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, fmt, pick, INTL_LOCALES } from "./calc-ui";

/**
 * Currency converter — the ONLY calculator in this batch that touches the
 * network. Rates come from the free, keyless open.er-api.com endpoint and are
 * cached in localStorage for one hour; the conversion arithmetic itself runs
 * locally in the browser. Disclosed in the note below and in the page copy.
 */

const API = "https://open.er-api.com/v6/latest/USD";
const CACHE_KEY = "zoyku-fx-rates-v1";
const TTL_MS = 60 * 60 * 1000; // 1 hour

const COMMON = [
  "USD", "EUR", "GBP", "JPY", "CNY", "INR", "AUD", "CAD", "CHF", "HKD",
  "SGD", "KRW", "BRL", "MXN", "RUB", "TRY", "AED", "SAR", "THB", "NZD",
  "SEK", "NOK", "DKK", "PLN", "CZK", "HUF", "ZAR", "TWD", "VND", "PHP",
  "IDR", "MYR", "ILS", "EGP", "NGN", "ARS", "CLP", "COP", "PKR", "BDT",
];

const LABELS: Record<string, Record<string, string>> = {
  amount: { en: "Amount", zh: "金额", ja: "金額", es: "Cantidad", pt: "Valor", fr: "Montant", de: "Betrag", ru: "Сумма", it: "Importo", tr: "Tutar", ko: "금액", ar: "المبلغ", hi: "राशि", id: "Jumlah", vi: "Số tiền" },
  convertedTo: { en: "Converted to", zh: "转换为", ja: "変換先", es: "Convertir a", pt: "Converter para", fr: "Converti en", de: "Umgerechnet in", ru: "Перевести в", it: "Convertito in", tr: "Dönüştürülecek birim", ko: "변환 대상", ar: "يحوّل إلى", hi: "इसमें बदलें", id: "Dikonversi ke", vi: "Chuyển đổi sang" },
  copied: { en: "Copied", zh: "已复制", ja: "コピーしました", es: "Copiado", pt: "Copiado", fr: "Copié", de: "Kopiert", ru: "Скопировано", it: "Copiato", tr: "Kopyalandı", ko: "복사됨", ar: "تم النسخ", hi: "कॉपी हो गया", id: "Tersalin", vi: "Đã sao chép" },
  copyRate: { en: "Copy rate", zh: "复制汇率", ja: "レートをコピー", es: "Copiar tasa", pt: "Copiar taxa", fr: "Copier le taux", de: "Kurs kopieren", ru: "Копировать курс", it: "Copia il tasso", tr: "Kuru kopyala", ko: "환율 복사", ar: "نسخ السعر", hi: "रेट कॉपी करें", id: "Salin kurs", vi: "Sao chép tỷ giá" },
  loading: { en: "Loading exchange rates…", zh: "正在加载汇率……", ja: "為替レートを読み込み中…", es: "Cargando tipos de cambio…", pt: "Carregando cotações…", fr: "Chargement des taux…", de: "Wechselkurse werden geladen…", ru: "Загрузка курсов…", it: "Caricamento dei tassi…", tr: "Kurlar yükleniyor…", ko: "환율 불러오는 중…", ar: "جارٍ تحميل أسعار الصرف…", hi: "विनिमय दरें लोड हो रही हैं…", id: "Memuat kurs…", vi: "Đang tải tỷ giá…" },
  stale: {
    en: "Showing rates cached on your device from {date} — could not reach the rate service just now.",
    zh: "当前显示设备上的缓存汇率(更新于 {date})——暂时无法连接汇率服务。",
    ja: "現在デバイスにキャッシュされたレートを表示しています({date} 更新)——ただ今レートサービスに接続できません。",
    es: "Mostrando tipos en caché de tu dispositivo del {date} — no se pudo contactar el servicio ahora.",
    pt: "Exibindo cotações em cache do seu dispositivo de {date} — não foi possível contactar o serviço agora.",
    fr: "Taux en cache sur votre appareil du {date} — le service de taux est injoignable pour le moment.",
    de: "Auf Ihrem Gerät zwischengespeicherte Kurse vom {date} — der Kursdienst ist gerade nicht erreichbar.",
    ru: "Показаны курсы из кэша устройства от {date} — сервис курсов сейчас недоступен.",
    it: "Tassi in cache sul dispositivo del {date} — servizio dei tassi irraggiungibile al momento.",
    tr: "Aygıtınızda {date} tarihinden itibaren önbelleğe alınan kurlar gösteriliyor — kur hizmetine şu anda ulaşılamıyor.",
    ko: "기기에 캐시된 환율 표시 중({date} 기준) — 지금 환율 서비스에 연결할 수 없습니다.",
    ar: "تُعرض أسعار مخزَّنة على جهازك بتاريخ {date} — تعذّر الوصول إلى خدمة الأسعار الآن.",
    hi: "आपके डिवाइस पर {date} का कैश किया गया रेट दिख रहा है — अभी रेट सेवा से संपर्क नहीं हो पा रहा।",
    id: "Menampilkan kurs yang di-cache di perangkat Anda dari {date} — layanan kurs tidak dapat dihubungi saat ini.",
    vi: "Đang hiển thị tỷ giá đã lưu cache trên thiết bị của bạn từ {date} — hiện không kết nối được dịch vụ tỷ giá.",
  },
  fresh: {
    en: "Mid-market rates updated {date}.",
    zh: "中间价汇率更新于 {date}。",
    ja: "ミッドマーケットレートの更新: {date}。",
    es: "Tipos de referencia actualizados el {date}.",
    pt: "Cotações de referência atualizadas em {date}.",
    fr: "Taux de référence mis à jour le {date}.",
    de: "Referenzkurse aktualisiert am {date}.",
    ru: "Среднерыночные курсы обновлены {date}.",
    it: "Tassi di riferimento aggiornati il {date}.",
    tr: "Orta piyasa kurları güncellendi: {date}.",
    ko: "중간가 환율 업데이트: {date}.",
    ar: "تحديث أسعار السوق المرجعية: {date}.",
    hi: "मिड-मार्केट रेट अपडेट: {date}.",
    id: "Kurs referensi diperbarui {date}.",
    vi: "Tỷ giá tham chiếu cập nhật {date}.",
  },
  refresh: { en: "Refresh rates", zh: "刷新汇率", ja: "レートを更新", es: "Actualizar tasas", pt: "Atualizar cotações", fr: "Actualiser les taux", de: "Kurse aktualisieren", ru: "Обновить курсы", it: "Aggiorna i tassi", tr: "Kurları güncelle", ko: "환율 새로고침", ar: "تحديث الأسعار", hi: "रेट रिफ्रेश करें", id: "Muat ulang kurs", vi: "Làm mới tỷ giá" },
  offlineErr: {
    en: "Could not load exchange rates. Check your internet connection and try again — every other tool on this site works fully offline.",
    zh: "无法加载汇率。请检查网络连接后重试——本站其他工具均可完全离线使用。",
    ja: "為替レートを読み込めませんでした。ネットワーク接続を確認して再試行してください。当サイトの他のツールは完全オフラインで動作します。",
    es: "No se pudieron cargar los tipos de cambio. Revise su conexión e inténtelo de nuevo; el resto de herramientas del sitio funcionan sin conexión.",
    pt: "Não foi possível carregar as cotações. Verifique sua conexão e tente novamente — as outras ferramentas do site funcionam offline.",
    fr: "Impossible de charger les taux. Vérifiez votre connexion et réessayez — tous les autres outils du site fonctionnent hors ligne.",
    de: "Wechselkurse konnten nicht geladen werden. Prüfen Sie die Verbindung und versuchen Sie es erneut — alle anderen Tools der Seite funktionieren offline.",
    ru: "Не удалось загрузить курсы. Проверьте соединение и попробуйте снова — все остальные инструменты сайта работают офлайн.",
    it: "Impossibile caricare i tassi. Verifica la connessione e riprova — tutti gli altri strumenti del sito funzionano offline.",
    tr: "Kurlar yüklenemedi. Bağlantınızı kontrol edip tekrar deneyin — sitedeki diğer tüm araçlar çevrimdışı çalışır.",
    ko: "환율을 불러올 수 없습니다. 네트워크 연결을 확인하고 다시 시도하세요 — 사이트의 다른 도구는 모두 오프라인에서 작동합니다.",
    ar: "تعذّر تحميل أسعار الصرف. تحقق من اتصالك وحاول مجدداً — كل أدوات الموقع الأخرى تعمل دون اتصال.",
    hi: "विनिमय दरें लोड नहीं हो सकीं। अपना कनेक्शन जाँचें और फिर कोशिश करें — साइट के बाकी सभी टूल पूरी तरह ऑफ़लाइन चलते हैं।",
    id: "Kurs tidak dapat dimuat. Periksa koneksi Anda dan coba lagi — semua alat lain di situs ini berfungsi offline.",
    vi: "Không thể tải tỷ giá. Kiểm tra kết nối và thử lại — mọi công cụ khác trên trang đều hoạt động ngoại tuyến.",
  },
  retry: { en: "Retry", zh: "重试", ja: "再試行", es: "Reintentar", pt: "Tentar novamente", fr: "Réessayer", de: "Erneut versuchen", ru: "Повторить", it: "Riprova", tr: "Tekrar dene", ko: "다시 시도", ar: "إعادة المحاولة", hi: "फिर कोशिश करें", id: "Coba lagi", vi: "Thử lại" },
  howItWorks: {
    en: "How it works: the exchange-rate table is fetched once from the free open.er-api.com service (no key, no account) and cached on your device for an hour; the multiplication that converts your amount happens locally in your browser. No amount you type is ever sent anywhere.",
    zh: "工作方式:汇率表从免费的 open.er-api.com 服务获取一次(无需密钥、无需注册),并在设备上缓存一小时;金额换算的乘法运算完全在浏览器本地完成。你输入的任何金额都不会被发送到任何地方。",
    ja: "仕組み:レート表は無料の open.er-api.com サービスから 1 回だけ取得し(キーも登録も不要)、1 時間デバイスにキャッシュします。金額の掛け算はブラウザ内で行われ、入力した金額が送信されることはありません。",
    es: "Cómo funciona: la tabla de tipos se obtiene una vez del servicio gratuito open.er-api.com (sin clave ni cuenta) y se guarda en tu dispositivo durante una hora; la multiplicación de tu cantidad ocurre en tu navegador. Ningún importe que escribas se envía a ningún sitio.",
    pt: "Como funciona: a tabela de cotações é obtida uma vez do serviço gratuito open.er-api.com (sem chave, sem cadastro) e fica em cache no seu dispositivo por uma hora; a multiplicação do valor acontece localmente no navegador. Nada do que você digita é enviado.",
    fr: "Fonctionnement : la table des taux est récupérée une fois depuis le service gratuit open.er-api.com (sans clé ni compte) et mise en cache sur votre appareil pendant une heure ; la multiplication qui convertit votre montant se fait localement dans votre navigateur. Rien de ce que vous saisissez n'est envoyé nulle part.",
    de: "So funktioniert es: Die Kurstabelle wird einmal vom kostenlosen Dienst open.er-api.com abgerufen (kein Schlüssel, kein Konto) und eine Stunde auf Ihrem Gerät zwischengespeichert; die Umrechnung Ihres Betrags geschieht lokal im Browser. Nichts, was Sie eingeben, wird irgendwohin gesendet.",
    ru: "Как это работает: таблица курсов загружается один раз из бесплатного сервиса open.er-api.com (без ключа и регистрации) и кэшируется на устройстве на час; умножение для конвертации происходит локально в браузере. Ничто из введённого вами никуда не отправляется.",
    it: "Come funziona: la tabella dei tassi viene recuperata una volta dal servizio gratuito open.er-api.com (senza chiave né account) e messa in cache sul dispositivo per un'ora; la moltiplicazione che converte l'importo avviene localmente nel browser. Nessun importo digitato viene mai inviato.",
    tr: "Nasıl çalışır: Kur tablosu ücretsiz open.er-api.com servisi (anahtar ve hesap gerekmez) bir kez alınır ve aygıtınızda bir saat önbelleğe alınır; tutarınızı çeviren çarpma işlemi tarayıcınızda yerel olarak yapılır. Girdiğiniz hiçbir tutar hiçbir yere gönderilmez.",
    ko: "작동 방식: 환율 표는 무료 open.er-api.com 서비스에서 한 번 가져와(키·계정 불필요) 기기에 1시간 캐시됩니다. 금액을 변환하는 곱셈은 브라우저에서 로컬로 수행됩니다. 입력한 금액은 어디로도 전송되지 않습니다.",
    ar: "كيف يعمل: يُجلب جدول الأسعار مرة واحدة من خدمة open.er-api.com المجانية (بلا مفتاح أو حساب) ويُخزَّن على جهازك لمدة ساعة؛ عملية الضرب التي تحوّل مبلغك تتم محلياً في متصفحك. لا يُرسل أي مبلغ تكتبه إلى أي مكان.",
    hi: "यह कैसे काम करता है: विनिमय-दर तालिका मुफ़्त open.er-api.com सेवा से एक बार लाई जाती है (कोई कुंजी/खाता नहीं) और आपके डिवाइस पर एक घंटे के लिए कैश होती है; आपकी राशि बदलने वाला गुणन ब्राउज़र में लोकल होता है। आपने जो भी राशि लिखी, वह कहीं नहीं भेजी जाती।",
    id: "Cara kerja: tabel kurs diambil sekali dari layanan gratis open.er-api.com (tanpa kunci/akun) dan di-cache di perangkat Anda selama satu jam; perkalian yang mengonversi jumlah Anda berjalan lokal di browser. Tidak ada jumlah yang Anda ketik yang dikirim ke mana pun.",
    vi: "Cách hoạt động: bảng tỷ giá được lấy một lần từ dịch vụ miễn phí open.er-api.com (không cần khóa/tài khoản) và lưu cache trên thiết bị của bạn một giờ; phép nhân chuyển đổi số tiền chạy cục bộ trong trình duyệt. Không số tiền nào bạn nhập được gửi đi đâu cả.",
  },
  common: { en: "Common", zh: "常用", ja: "よく使う通貨", es: "Frecuentes", pt: "Comuns", fr: "Courantes", de: "Häufig", ru: "Популярные", it: "Frequenti", tr: "Yaygın", ko: "자주 쓰는 통화", ar: "الشائعة", hi: "सामान्य", id: "Umum", vi: "Phổ biến" },
  allCurrencies: { en: "All currencies", zh: "全部货币", ja: "すべての通貨", es: "Todas las monedas", pt: "Todas las moedas", fr: "Toutes les devises", de: "Alle Währungen", ru: "Все валюты", it: "Tutte le valute", tr: "Tüm para birimleri", ko: "모든 통화", ar: "كل العملات", hi: "सभी मुद्राएँ", id: "Semua mata uang", vi: "Tất cả tiền tệ" },
};

type CacheEntry = { t: number; r: Record<string, number> };

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (parsed && typeof parsed.t === "number" && parsed.r && typeof parsed.r.USD === "number") return parsed;
    return null;
  } catch {
    return null;
  }
}

function writeCache(entry: CacheEntry): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // storage unavailable — session-only caching then
  }
}



function fmtDate(unixMs: number, locale: string): string {
  return new Intl.DateTimeFormat(INTL_LOCALES[locale] ?? INTL_LOCALES.en, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(unixMs);
}

export function CalcEngineCurrency() {
  const { locale, t } = useI18n();
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [updated, setUpdated] = useState<number | null>(null);
  const [stale, setStale] = useState(false);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [copied, setCopied] = useState(false);
  const askedRef = useRef(false);

  const load = useCallback(async (force: boolean) => {
    setStatus((s) => (rates ? s : "loading"));
    const cache = readCache();
    if (!force && cache && Date.now() - cache.t < TTL_MS) {
      setRates(cache.r);
      setUpdated(cache.t);
      setStale(false);
      setStatus("ok");
      return;
    }
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { result?: string; time_last_update_unix?: number; rates?: Record<string, number> };
      if (data.result !== "success" || !data.rates || !data.rates.USD) throw new Error("bad payload");
      const entry: CacheEntry = { t: (data.time_last_update_unix ?? Date.now() / 1000) * 1000, r: data.rates };
      writeCache(entry);
      setRates(entry.r);
      setUpdated(entry.t);
      setStale(false);
      setStatus("ok");
    } catch {
      if (cache) {
        // offline fallback: keep serving cached rates, clearly labeled
        setRates(cache.r);
        setUpdated(cache.t);
        setStale(true);
        setStatus("ok");
      } else {
        setStatus("error");
      }
    }
  }, [rates]);

  useEffect(() => {
    if (askedRef.current) return;
    askedRef.current = true;
    void load(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const a = Number(amount.replace(",", "."));
  const rateFrom = rates?.[from];
  const rateTo = rates?.[to];
  const converted = Number.isFinite(a) && rateFrom && rateTo ? (a / rateFrom) * rateTo : NaN;

  const codes = useMemo(() => {
    if (!rates) return { common: [] as string[], rest: [] as string[] };
    const all = Object.keys(rates).sort();
    return {
      common: COMMON.filter((c) => c in rates),
      rest: all.filter((c) => !COMMON.includes(c)),
    };
  }, [rates]);

  const nameOf = useCallback(
    (code: string): string => {
      try {
        return new Intl.DisplayNames([INTL_LOCALES[locale] ?? INTL_LOCALES.en], { type: "currency" }).of(code) ?? code;
      } catch {
        return code;
      }
    },
    [locale],
  );

  const copyRate = async () => {
    if (!rateFrom || !rateTo) return;
    const text = `1 ${from} = ${((1 / rateFrom) * rateTo).toFixed(4)} ${to}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable
    }
  };

  const opts = (list: string[]) =>
    list.map((c) => (
      <option key={c} value={c}>
        {c} · {nameOf(c)}
      </option>
    ));

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div className="space-y-2">
          <Field label={pick(locale, LABELS.amount)}>
            <NumIn value={amount} onChange={setAmount} aria="amount" className="text-lg" />
          </Field>
          {sel(from, setFrom, "from currency")}
        </div>
        <button
          type="button"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          className="mx-auto mb-1.5 inline-flex rounded-full border hairline p-2.5 text-[var(--color-sub)] transition-colors hover:bg-[var(--color-surface)]"
          aria-label={t.common.swap}
        >
          <Icon name="swap" size={18} />
        </button>
        <div className="space-y-2">
          <Field label={pick(locale, LABELS.convertedTo)}>
            <output className="field mono block truncate bg-[var(--color-surface)] text-lg font-medium" aria-live="polite">
              {Number.isFinite(converted) ? fmt(converted, locale, 2) : "—"}
            </output>
          </Field>
          {sel(to, setTo, "to currency")}
        </div>
      </div>

      {rateFrom && rateTo && (
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[14px] text-[var(--color-sub)]">
          <span>
            1 {from} = <strong className="font-semibold text-[var(--color-ink)]">{((1 / rateFrom) * rateTo).toFixed(4)}</strong> {to}
          </span>
          <button type="button" onClick={copyRate} className="inline-flex items-center gap-1 rounded-full border hairline px-2.5 py-1 text-[12.5px] font-medium transition-colors hover:bg-[var(--color-surface)]">
            {copied ? pick(locale, LABELS.copied) : pick(locale, LABELS.copyRate)}
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-[var(--color-sub)]">
          {status === "loading" &&
            pick(locale, LABELS.loading)}
          {status === "ok" && updated !== null &&
            (stale
              ? pick(locale, LABELS.stale).replace("{date}", fmtDate(updated, locale))
              : pick(locale, LABELS.fresh).replace("{date}", fmtDate(updated, locale)))}        </p>
        <button
          type="button"
          onClick={() => void load(true)}
          className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
        >
          <Icon name="rotate" size={14} />
          {pick(locale, LABELS.refresh)}
        </button>
      </div>

      {status === "error" && (
        <div className="mt-4 rounded-xl border hairline bg-[var(--color-surface)] px-4 py-3.5" role="alert">
          <p className="text-[14px] font-medium text-[var(--color-bad)]">
            {pick(locale, LABELS.offlineErr)}
          </p>
          <button
            type="button"
            onClick={() => void load(true)}
            className="mt-2.5 inline-flex rounded-full bg-[var(--color-ink)] px-4 py-1.5 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f]"
          >
            {pick(locale, LABELS.retry)}
          </button>
        </div>
      )}

      <div className="mt-4">
        <Note>
          {pick(locale, LABELS.howItWorks)}
        </Note>
      </div>
    </ToolPanel>
  );

  function sel(v: string, set: (s: string) => void, aria: string) {
    if (codes.common.length === 0) {
      // rates not loaded yet — keep the select usable with the current code
      return (
        <Sel value={v} onChange={set} aria={aria}>
          <option value={v}>{v}</option>
        </Sel>
      );
    }
    return (
      <Sel value={v} onChange={set} aria={aria}>
        {codes.common.length > 0 && <optgroup label={pick(locale, LABELS.common)}>{opts(codes.common)}</optgroup>}
        {codes.rest.length > 0 && <optgroup label={pick(locale, LABELS.allCurrencies)}>{opts(codes.rest)}</optgroup>}
      </Sel>
    );
  }
}
