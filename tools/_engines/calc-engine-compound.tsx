"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, TableBox, fmtMoney, pick } from "./calc-ui";
import { compound, type Freq } from "../_lib/finance";
import { DonutChart, BalanceChart, chartText } from "./calc-charts";
import type { Locale } from "@/lib/site";

/**
 * Compound interest with regular monthly contributions.
 * Deposits land at the start of each month regardless of compounding frequency.
 * Monthly-equivalent growth g = (1 + annual / n)^(n / 12), n = 12 / 4 / 1.
 */

const CURRENCIES: Record<string, { symbol: string; frac: number }> = {
  USD: { symbol: "$", frac: 2 },
  EUR: { symbol: "€", frac: 2 },
  CNY: { symbol: "¥", frac: 2 },
  JPY: { symbol: "¥", frac: 0 },
  BRL: { symbol: "R$", frac: 2 },
};

const S = {
  principal: { en: "Initial deposit", zh: "初始存入", ja: "初期預入額", es: "Depósito inicial", pt: "Depósito inicial", fr: "Dépôt initial", de: "Anfangseinzahlung", ru: "Первоначальный вклад", it: "Deposito iniziale", tr: "Başlangıç yatırımı", ko: "초기 예치금", ar: "الإيداع الأولي", hi: "प्रारंभिक जमा", id: "Setoran awal", vi: "Tiền gửi ban đầu" },
  monthly: { en: "Monthly contribution", zh: "每月定投", ja: "毎月の積立額", es: "Aporte mensual", pt: "Aporte mensal", fr: "Versement mensuel", de: "Monatliche Einzahlung", ru: "Ежемесячное пополнение", it: "Versamento mensile", tr: "Aylık katkı", ko: "월 납입액", ar: "المساهمة الشهرية", hi: "मासिक योगदान", id: "Kontribusi bulanan", vi: "Nộp mỗi tháng" },
  rate: { en: "Annual interest rate (%)", zh: "年利率 (%)", ja: "年利 (%)", es: "Tasa anual (%)", pt: "Taxa anual (%)", fr: "Taux d'intérêt annuel (%)", de: "Jahreszinssatz (%)", ru: "Годовая ставка (%)", it: "Tasso annuo (%)", tr: "Yıllık faiz oranı (%)", ko: "연간 이자율 (%)", ar: "معدل الفائدة السنوي (%)", hi: "वार्षिक ब्याज दर (%)", id: "Suku bunga tahunan (%)", vi: "Lãi suất năm (%)" },
  years: { en: "Years", zh: "年数", ja: "年数", es: "Años", pt: "Anos", fr: "Années", de: "Jahre", ru: "Годы", it: "Anni", tr: "Yıl", ko: "년", ar: "سنوات", hi: "वर्ष", id: "Tahun", vi: "Năm" },
  freq: { en: "Compounding", zh: "复利频率", ja: "複利の頻度", es: "Capitalización", pt: "Capitalização", fr: "Capitalisation", de: "Zinseszins", ru: "Капитализация", it: "Capitalizzazione", tr: "Bileşik dönem", ko: "복리 주기", ar: "التكرار المركب", hi: "चक्रवृद्धि आवृत्ति", id: "Pembungaan", vi: "Kỳ ghép lãi" },
  currency: { en: "Currency", zh: "币种", ja: "通貨", es: "Moneda", pt: "Moeda", fr: "Devise", de: "Währung", ru: "Валюта", it: "Valuta", tr: "Para birimi", ko: "통화", ar: "العملة", hi: "मुद्रा", id: "Mata uang", vi: "Đồng tiền" },
  balance: { en: "Final balance", zh: "期末总额", ja: "最終残高", es: "Saldo final", pt: "Saldo final", fr: "Solde final", de: "Endguthaben", ru: "Итоговый баланс", it: "Saldo finale", tr: "Son bakiye", ko: "최종 잔액", ar: "الرصيد النهائي", hi: "अंतिम शेष", id: "Saldo akhir", vi: "Số dư cuối" },
  contrib: { en: "Total contributed", zh: "累计投入", ja: "累計投入額", es: "Total aportado", pt: "Total aportado", fr: "Total versé", de: "Eingezahlt gesamt", ru: "Всего внесено", it: "Totale versato", tr: "Toplam yatırılan", ko: "총 납입액", ar: "إجمالي المساهمات", hi: "कुल योगदान", id: "Total disetor", vi: "Tổng đã nộp" },
  interest: { en: "Interest earned", zh: "累计利息", ja: "受取利息", es: "Intereses ganados", pt: "Juros ganados", fr: "Intérêts gagnés", de: "Erhaltene Zinsen", ru: "Начисленные проценты", it: "Interessi maturati", tr: "Kazanılan faiz", ko: "받은 이자", ar: "الفائدة المكتسبة", hi: "अर्जित ब्याज", id: "Bunga diperoleh", vi: "Tiền lãi nhận được" },
  year: { en: "Year", zh: "年份", ja: "年", es: "Año", pt: "Ano", fr: "Année", de: "Jahr", ru: "Год", it: "Anno", tr: "Yıl", ko: "연도", ar: "السنة", hi: "वर्ष", id: "Tahun", vi: "Năm" },
  thContrib: { en: "Contributed", zh: "已投入", ja: "投入累計", es: "Aportado", pt: "Aportado", fr: "Versé", de: "Eingezahlt", ru: "Внесено", it: "Versato", tr: "Yatırılan", ko: "납입액", ar: "المساهمة", hi: "योगदान", id: "Disetor", vi: "Đã nộp" },
  thInterest: { en: "Interest", zh: "利息", ja: "利息", es: "Intereses", pt: "Juros", fr: "Intérêts", de: "Zinsen", ru: "Проценты", it: "Interessi", tr: "Faiz", ko: "이자", ar: "الفائدة", hi: "ब्याज", id: "Bunga", vi: "Tiền lãi" },
  thBalance: { en: "Balance", zh: "余额", ja: "残高", es: "Saldo", pt: "Saldo", fr: "Solde", de: "Guthaben", ru: "Баланс", it: "Saldo", tr: "Bakiye", ko: "잔액", ar: "الرصيد", hi: "शेष", id: "Saldo", vi: "Số dư" },
  table: { en: "Year-by-year growth", zh: "逐年增长明细", ja: "年ごとの推移", es: "Crecimiento año por año", pt: "Crescimento ano a ano", fr: "Croissance année par année", de: "Wachstum Jahr für Jahr", ru: "Рост по годам", it: "Crescita anno per anno", tr: "Yıl yıl büyüme", ko: "연도별 성장", ar: "النمو سنة بسنة", hi: "वर्ष-दर-वर्ष वृद्धि", id: "Pertumbuhan tahunan", vi: "Tăng trưởng từng năm" },
  timing: { en: "Contribution timing", zh: "投入时点", ja: "積立タイミング", es: "Momento del aporte", pt: "Momento do aporte", fr: "Moment du versement", de: "Einzahlungszeitpunkt", ru: "Момент взноса", it: "Momento del versamento", tr: "Yatırım zamanı", ko: "납입 시점", ar: "توقيت الإيداع", hi: "योगदान समय", id: "Waktu setoran", vi: "Thời điểm nộp" },
  growth: { en: "Deposit annual growth (%)", zh: "存款年增长率 (%)", ja: "積立の年増加率 (%)", es: "Crecimiento anual del aporte (%)", pt: "Crescimento anual do aporte (%)", fr: "Croissance annuelle du versement (%)", de: "Jährliches Einzahlungswachstum (%)", ru: "Годовой рост взноса (%)", it: "Crescita annua del versamento (%)", tr: "Yıllık yatırım artışı (%)", ko: "납입액 연 증가율 (%)", ar: "النمو السنوي للإيداع (%)", hi: "जमा वार्षिक वृद्धि (%)", id: "Pertumbuhan setoran tahunan (%)", vi: "Tăng trưởng nộp hàng năm (%)" },
  begin: { en: "Start of month", zh: "每月月初", ja: "月初め", es: "Inicio de mes", pt: "Início do mês", fr: "Début du mois", de: "Monatsanfang", ru: "Начало месяца", it: "Inizio mese", tr: "Ay başı", ko: "매월 초", ar: "بداية الشهر", hi: "माह का प्रारंभ", id: "Awal bulan", vi: "Đầu tháng" },
  end: { en: "End of month", zh: "每月月末", ja: "月末", es: "Fin de mes", pt: "Fim do mês", fr: "Fin du mois", de: "Monatsende", ru: "Конец месяца", it: "Fine mese", tr: "Ay sonu", ko: "매월 말", ar: "نهاية الشهر", hi: "माह का अंत", id: "Akhir bulan", vi: "Cuối tháng" },
};

export const COMPOUND_END_CONVENTION: Record<Locale, string> = {
  en: "This run uses month-END deposits: each month B ← B × g + deposit, with the same monthly-equivalent growth g as described above. Optional deposit growth raises the deposit every 12 months (year 2 onward) by the given percentage. All other conventions are unchanged.",
  zh: "本计算使用每月月末存入：每月 B ← B × g + 存入，g 与上文相同（等效月增长）。可选的存款年增长率从第 2 年起每 12 个月按给定百分比上调存入额。其余约定不变。",
  ja: "この計算は月末積立です：毎月 B ← B × g + 積立額、g は上記と同じ等価月次成長です。任意の積立年増加率は 2 年目以降 12 か月ごとに指定率で積立額を引き上げます。その他の規約は変わりません。",
  es: "Esta ejecución usa aportes a fin de mes: cada mes B ← B × g + aporte, con la misma g equivalente mensual descrita antes. El crecimiento opcional del aporte lo sube cada 12 meses (desde el año 2) el porcentaje dado. Las demás convenciones no cambian.",
  pt: "Esta execução usa aportes no fim do mês: cada mês B ← B × g + aporte, com o mesmo g mensal equivalente descrito acima. O crescimento opcional do aporte eleva o valor a cada 12 meses (a partir do ano 2) pelo percentual dado. As demais convenções permanecem.",
  fr: "Cette exécution utilise des versements en fin de mois : chaque mois B ← B × g + versement, avec le même g mensuel équivalent décrit plus haut. La croissance facultative du versement l'augmente tous les 12 mois (à partir de l'année 2) du pourcentage indiqué. Les autres conventions restent inchangées.",
  de: "Dieser Lauf nutzt Einzahlungen zum Monatsende: monatlich B ← B × g + Einzahlung, mit dem oben beschriebenen äquivalenten Monatswachstum g. Das optionale Einzahlungswachstum erhöht den Betrag alle 12 Monate (ab Jahr 2) um den angegebenen Prozentsatz. Alle übrigen Regeln bleiben unverändert.",
  ru: "Этот расчёт использует взносы в конце месяца: каждый месяц B ← B × g + взнос, с тем же эквивалентным месячным ростом g, что описан выше. Необязательный годовой рост взноса повышает сумму каждые 12 месяцев (со 2-го года) на указанный процент. Остальные правила без изменений.",
  it: "Questa simulazione usa versamenti a fine mese: ogni mese B ← B × g + versamento, con la stessa g mensile equivalente descritta sopra. La crescita facoltativa del versamento lo aumenta ogni 12 mesi (dal 2° anno) della percentuale indicata. Le altre convenzioni restano invariate.",
  tr: "Bu hesaplama ay SONU yatırımı kullanır: her ay B ← B × g + yatırım, g yukarıda açıklanan eşdeğer aylık büyümedir. İsteğe bağlı yıllık yatırım artışı, tutarı 2. yıldan itibaren her 12 ayda verilen yüzdeyle yükseltir. Diğer kurallar değişmez.",
  ko: "이 계산은 매월 말 납입을 사용합니다: 매월 B ← B × g + 납입액, g는 위와 같은 등가 월 성장률입니다. 선택적 납입 연 증가율은 2년째부터 12개월마다 지정된 비율로 납입액을 올립니다. 나머지 규칙은 동일합니다.",
  ar: "يستخدم هذا الحساب الإيداع في نهاية كل شهر: كل شهر B ← B × g + الإيداع، بمعامل النمو الشهري المكافئ g المذكور أعلاه. النمو السنوي الاختياري للإيداع يرفعه كل 12 شهرًا (من السنة الثانية) بالنسبة المئوية المحددة. تبقى القواعد الأخرى كما هي.",
  hi: "यह गणना महीने के अंत में जमा उपयोग करती है: प्रत्येक माह B ← B × g + जमा, g वही समतुल्य मासिक वृद्धि है जो ऊपर वर्णित है। वैकल्पिक जमा वार्षिक वृद्धि राशि को हर 12 महीने (दूसरे वर्ष से) दिए गए प्रतिशत से बढ़ाती है। शेष नियम अपरिवर्तित हैं।",
  id: "Perhitungan ini memakai setoran akhir bulan: setiap bulan B ← B × g + setoran, dengan pertumbuhan bulanan setara g seperti dijelaskan di atas. Pertumbuhan setoran tahunan opsional menaikkan jumlah setiap 12 bulan (mulai tahun ke-2) sebesar persentase yang diberikan. Ketentuan lain tidak berubah.",
  vi: "Lần tính này dùng khoản nộp vào CUỐI tháng: mỗi tháng B ← B × g + khoản nộp, với g là tăng trưởng tháng tương đương như đã nêu. Tùy chọn tăng trưởng nộp hàng năm sẽ nâng khoản nộp mỗi 12 tháng (từ năm thứ hai) theo phần trăm đã cho. Các quy ước khác giữ nguyên.",
};

export const COMPOUND_CONVENTION: Record<Locale, string> = {
  en: "Deposits are made at the start of every month, for every compounding choice. Each month: B ← (B + monthly deposit) × g, where g = (1 + annual rate ÷ n)^(n ÷ 12), n = 12, 4 or 1 and the rate is decimal. This uses fractional periods; future deposits are never invested early. Duration is rounded to whole months.",
  zh: "无论复利频率如何，均在每月月初存入。每月 B ← (B + 月投入) × g，其中 g = (1 + 年利率 ÷ n)^(n ÷ 12)，n 为 12、4 或 1，利率用小数表示。采用不足整期的等效增长，不提前计入未来投入；年限按整月取整。",
  ja: "複利頻度にかかわらず毎月初めに積み立てます。毎月 B ← (B + 月額積立) × g、g = (1 + 年利 ÷ n)^(n ÷ 12)、nは12・4・1、年利は小数です。端数期間の等価成長を使い、将来の積立を先取りしません。期間は月単位に丸めます。",
  es: "Los aportes se hacen al inicio de cada mes con cualquier frecuencia. Cada mes: B ← (B + aporte mensual) × g; g = (1 + tasa anual ÷ n)^(n ÷ 12), n = 12, 4 o 1, tasa decimal. Se usan periodos fraccionarios sin anticipar aportes futuros. El plazo se redondea a meses enteros.",
  pt: "Os aportes entram no início de cada mês em todas as frequências. Por mês: B ← (B + aporte mensal) × g; g = (1 + taxa anual ÷ n)^(n ÷ 12), n = 12, 4 ou 1, taxa decimal. Usamos períodos fracionários sem antecipar aportes futuros. O prazo é arredondado em meses inteiros.",
  fr: "Les versements ont lieu au début de chaque mois pour toute fréquence. Chaque mois : B ← (B + versement mensuel) × g ; g = (1 + taux annuel ÷ n)^(n ÷ 12), n = 12, 4 ou 1, taux décimal. Les périodes fractionnaires évitent d'anticiper les versements futurs. Durée arrondie en mois entiers.",
  de: "Einzahlungen erfolgen bei jeder Verzinsung zu Monatsbeginn. Monatlich: B ← (B + Monatseinzahlung) × g, g = (1 + Jahreszins ÷ n)^(n ÷ 12), n = 12, 4 oder 1, Zinssatz dezimal. Anteilsperioden verhindern vorzeitige künftige Einzahlungen. Laufzeit auf volle Monate gerundet.",
  ru: "Взносы поступают в начале каждого месяца при любой капитализации. Ежемесячно: B ← (B + взнос) × g; g = (1 + годовая ставка ÷ n)^(n ÷ 12), n = 12, 4 или 1, ставка десятичная. Используются доли периода без досрочного учёта будущих взносов. Срок округляется до месяцев.",
  it: "I versamenti avvengono a inizio mese con ogni frequenza. Ogni mese: B ← (B + versamento mensile) × g; g = (1 + tasso annuo ÷ n)^(n ÷ 12), n = 12, 4 o 1, tasso decimale. I periodi frazionari non anticipano i versamenti futuri. Durata arrotondata a mesi interi.",
  tr: "Her bileşik sıklığında ay başında katkı yatırılır. Aylık: B ← (B + aylık katkı) × g; g = (1 + yıllık oran ÷ n)^(n ÷ 12), n = 12, 4 veya 1; oran ondalıktır. Kesirli dönemler kullanılır, gelecek katkılar erken yatırılmaz. Süre tam aya yuvarlanır.",
  ko: "복리 주기와 관계없이 매월 초 납입합니다. 매월 B ← (B + 월 납입액) × g, g = (1 + 연이율 ÷ n)^(n ÷ 12), n은 12, 4, 1이고 이율은 소수입니다. 부분 기간의 등가 성장을 적용하며 미래 납입액을 미리 투자하지 않습니다. 기간은 월 단위로 반올림합니다.",
  ar: "تُودع المساهمات أول كل شهر مهما كان تكرار التركيب. شهريًا: B ← (B + الإيداع الشهري) × g؛ حيث g = (1 + المعدل السنوي ÷ n)^(n ÷ 12)، وn = 12 أو 4 أو 1 والمعدل عشري. تُستخدم فترات كسرية دون تقديم الإيداعات المستقبلية. المدة مقربة لأشهر كاملة.",
  hi: "हर चक्रवृद्धि विकल्प में जमा हर महीने की शुरुआत में होता है। मासिक: B ← (B + मासिक जमा) × g, जहाँ g = (1 + वार्षिक दर ÷ n)^(n ÷ 12), n = 12, 4 या 1 और दर दशमलव में है। आंशिक अवधि का उपयोग होता है; भविष्य की जमा पहले नहीं लगती। अवधि पूरे महीनों में पूर्णांकित होती है।",
  id: "Setoran masuk awal bulan untuk semua frekuensi. Tiap bulan: B ← (B + setoran bulanan) × g; g = (1 + bunga tahunan ÷ n)^(n ÷ 12), n = 12, 4, atau 1 dan bunga desimal. Periode pecahan digunakan tanpa menginvestasikan setoran masa depan lebih awal. Durasi dibulatkan ke bulan penuh.",
  vi: "Nộp tiền đầu mỗi tháng với mọi kỳ ghép lãi. Mỗi tháng: B ← (B + tiền nộp tháng) × g; g = (1 + lãi suất năm ÷ n)^(n ÷ 12), n = 12, 4 hoặc 1, lãi suất dạng thập phân. Dùng kỳ lẻ, không đầu tư trước khoản nộp tương lai. Thời hạn làm tròn theo tháng.",
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineCompound() {
  const { locale } = useI18n();
  const [principal, setPrincipal] = useState("10000");
  const [monthly, setMonthly] = useState("100");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const [freq, setFreq] = useState<Freq>("monthly");
  const [timing, setTiming] = useState<"beginning" | "end">("beginning");
  const [growth, setGrowth] = useState("0");
  const [currency, setCurrency] = useState("USD");

  const p = num(principal);
  const c = num(monthly);
  const annual = num(rate);
  const y = num(years);
  const cur = CURRENCIES[currency] ?? CURRENCIES.USD;
  const money = (n: number) => fmtMoney(n, locale, cur.symbol, cur.frac);

  const { total, contributed, schedule } = useMemo(
    () => compound(p, c, annual, y, freq, { timing, depositAnnualGrowthPct: num(growth) }),
    [p, c, annual, y, freq, timing, growth],
  );

  const interest = Number.isFinite(total) ? total - contributed : NaN;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.principal)}>
          <NumIn value={principal} onChange={setPrincipal} aria="initial deposit" />
        </Field>
        <Field label={pick(locale, S.monthly)}>
          <NumIn value={monthly} onChange={setMonthly} aria="monthly contribution" />
        </Field>
        <Field label={pick(locale, S.rate)}>
          <NumIn value={rate} onChange={setRate} aria="annual interest rate" />
        </Field>
        <Field label={pick(locale, S.years)}>
          <NumIn value={years} onChange={setYears} aria="years" />
        </Field>
        <Field label={pick(locale, S.freq)}>
          <Sel value={freq} onChange={(v) => setFreq(v as Freq)} aria="compound frequency">
            <option value="monthly">{pick(locale, { en: "Monthly", zh: "每月", ja: "毎月", es: "Mensual", pt: "Mensal", fr: "Mensuel", de: "Monatlich", ru: "Ежемесячно", it: "Mensile", tr: "Aylık", ko: "매월", ar: "شهريًا", hi: "मासिक", id: "Bulanan", vi: "Hằng tháng" })}</option>
            <option value="quarterly">{pick(locale, { en: "Quarterly", zh: "每季度", ja: "四半期ごと", es: "Trimestral", pt: "Trimestral", fr: "Trimestriel", de: "Quartalsweise", ru: "Ежеквартально", it: "Trimestrale", tr: "Üç aylık", ko: "분기", ar: "ربع سنوي", hi: "त्रैमासिक", id: "Kuartalan", vi: "Hằng quý" })}</option>
            <option value="annually">{pick(locale, { en: "Annually", zh: "每年", ja: "毎年", es: "Anual", pt: "Anual", fr: "Annuel", de: "Jährlich", ru: "Ежегодно", it: "Annuale", tr: "Yıllık", ko: "매년", ar: "سنويًا", hi: "वार्षिक", id: "Tahunan", vi: "Hằng năm" })}</option>
          </Sel>
        </Field>
        <Field label={pick(locale, S.timing)}>
          <Sel value={timing} onChange={(v) => setTiming(v as "beginning" | "end")} aria="contribution timing">
            <option value="beginning">{pick(locale, S.begin)}</option>
            <option value="end">{pick(locale, S.end)}</option>
          </Sel>
        </Field>
        <Field label={pick(locale, S.growth)}>
          <NumIn value={growth} onChange={setGrowth} aria="deposit annual growth percent" />
        </Field>
        <Field label={pick(locale, S.currency)}>
          <Sel value={currency} onChange={setCurrency} aria="currency">
            <option value="USD">USD — $</option>
            <option value="EUR">EUR — €</option>
            <option value="CNY">CNY — ¥</option>
            <option value="JPY">JPY — ¥</option>
            <option value="BRL">BRL — R$</option>
          </Sel>
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.balance), value: money(total), tone: "accent" },
            { label: pick(locale, S.contrib), value: money(contributed) },
            { label: pick(locale, S.interest), value: money(interest), tone: "good" },
          ]}
          cols="sm:grid-cols-3"
        />
      </div>

      <div className="mt-3">
        <Note>
          {(timing === "end" ? COMPOUND_END_CONVENTION[locale] : COMPOUND_CONVENTION[locale])}
        </Note>
      </div>

      {Number.isFinite(total) && interest > 0 && contributed > 0 && (
        <div className="mt-5">
          <h2 className="mb-3 text-[15px] font-semibold">{chartText(locale, "composition")}</h2>
          <DonutChart
            slices={[
              { label: chartText(locale, "principal"), value: contributed, color: "var(--color-accent)" },
              { label: chartText(locale, "interestOnly"), value: interest, color: "var(--color-good)" },
            ]}
            centerTitle={chartText(locale, "interestOnly")}
            centerValue={`${Math.round((interest / (contributed + interest)) * 100)}%`}
            ariaLabel={chartText(locale, "composition")}
          />
        </div>
      )}

      {schedule.length > 1 && (
        <div className="mt-6">
          <h2 className="mb-3 text-[15px] font-semibold">{chartText(locale, "balanceCurve")}</h2>
          <BalanceChart
            values={schedule.map((r) => r.balance)}
            ariaLabel={chartText(locale, "balanceCurve")}
            valueFormatter={(n) => money(n)}
          />
        </div>
      )}

      {schedule.length > 0 && (
        <div className="mt-7">
          <h2 className="mb-3 text-[15px] font-semibold">{pick(locale, S.table)}</h2>
          <TableBox
            head={[pick(locale, S.year), pick(locale, S.thContrib), pick(locale, S.thInterest), pick(locale, S.thBalance)]}
            rows={schedule.map((row) => [
              row.year,
              money(row.contrib),
              money(row.interest),
              money(row.balance),
            ])}
          />
        </div>
      )}
    </ToolPanel>
  );
}
