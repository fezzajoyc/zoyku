"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, TableBox, fmt, fmtMoney, pick } from "./calc-ui";
import { CURRENCY_LABEL, CURRENCIES, useLocaleCurrency } from "../_lib/currency";
import { balanceAtYear, monthlyAmortization } from "../_lib/amortize";
import { fill } from "../_lib/types";
import { DonutChart, BalanceChart, chartText } from "./calc-charts";

/**
 * Monthly amortization engine on top of amortize.monthlyAmortization(): a
 * month-by-month schedule (interest / principal / remaining balance per month),
 * plus the balance left at the end of any chosen year.
 * props: none.
 */

const S = {
  loan: { en: "Loan amount", zh: "贷款金额", ja: "借入額", es: "Importe del préstamo", pt: "Valor do empréstimo", fr: "Montant du prêt", de: "Kreditbetrag", ru: "Сумма кредита", it: "Importo del prestito", tr: "Kredi tutarı", ko: "대출 금액", ar: "مبلغ القرض", hi: "ऋण राशि", id: "Jumlah pinjaman", vi: "Số tiền vay" },
  rate: { en: "Annual interest rate (%)", zh: "年利率 (%)", ja: "年利 (%)", es: "Tasa de interés anual (%)", pt: "Taxa de juros anual (%)", fr: "Taux d'intérêt annuel (%)", de: "Jahreszinssatz (%)", ru: "Годовая ставка (%)", it: "Tasso annuo (%)", tr: "Yıllık faiz oranı (%)", ko: "연간 이자율 (%)", ar: "معدل الفائدة السنوي (%)", hi: "वार्षिक ब्याज दर (%)", id: "Suku bunga tahunan (%)", vi: "Lãi suất năm (%)" },
  term: { en: "Term (years)", zh: "贷款年限", ja: "期間(年)", es: "Plazo (años)", pt: "Prazo (anos)", fr: "Durée (années)", de: "Laufzeit (Jahre)", ru: "Срок (лет)", it: "Durata (anni)", tr: "Vade (yıl)", ko: "기간(년)", ar: "المدة (سنوات)", hi: "अवधि (वर्ष)", id: "Jangka waktu (tahun)", vi: "Thời hạn (năm)" },
  yearQ: { en: "Balance after year", zh: "第几年末结余", ja: "○年後の残高(年)", es: "Saldo tras el año", pt: "Saldo após o ano", fr: "Solde après l'année", de: "Restschuld nach Jahr", ru: "Баланс после года", it: "Saldo dopo l'anno", tr: "Yıl sonunda bakiye", ko: "연차 후 잔액", ar: "الرصيد بعد سنة", hi: "वर्ष बाद शेष", id: "Saldo setelah tahun", vi: "Số dư sau năm" },
  monthlyPI: { en: "Monthly payment (P&I)", zh: "月供(本息)", ja: "毎月の返済額(元利)", es: "Cuota mensual (capital e interés)", pt: "Parcela mensal (principal + juros)", fr: "Mensualité (capital + intérêts)", de: "Monatsrate (Tilgung + Zins)", ru: "Платёж в месяц (долг + %)", it: "Rata mensile (capitale + interessi)", tr: "Aylık ödeme (ana para + faiz)", ko: "월 상환액(원리금)", ar: "القسط الشهري (أصل + فائدة)", hi: "मासिक भुगतान (मूल + ब्याज)", id: "Cicilan bulanan (pokok + bunga)", vi: "Trả hàng tháng (gốc + lãi)" },
  interest: { en: "Total interest", zh: "总利息", ja: "総利息", es: "Interés total", pt: "Total de juros", fr: "Intérêts totaux", de: "Gesamtzinsen", ru: "Всего процентов", it: "Interessi totali", tr: "Toplam faiz", ko: "총 이자", ar: "إجمالي الفائدة", hi: "कुल ब्याज", id: "Total bunga", vi: "Tổng tiền lãi" },
  totalPaid: { en: "Total repaid", zh: "还款总额", ja: "返済総額", es: "Total pagado", pt: "Total pago", fr: "Total remboursé", de: "Gesamtrückzahlung", ru: "Всего выплачено", it: "Totale pagato", tr: "Toplam ödeme", ko: "총 상환액", ar: "إجمالي المدفوع", hi: "कुल भुगतान", id: "Total dibayar", vi: "Tổng đã trả" },
  yearBalance: { en: "Balance at end of year {n}", zh: "第 {n} 年末剩余本金", ja: "{n} 年末の残高", es: "Saldo a fin del año {n}", pt: "Saldo no fim do ano {n}", fr: "Solde à fin de l'année {n}", de: "Restschuld Ende Jahr {n}", ru: "Баланс на конец года {n}", it: "Saldo a fine anno {n}", tr: "{n}. yıl sonu bakiyesi", ko: "{n}년 말 잔액", ar: "الرصيد في نهاية السنة {n}", hi: "वर्ष {n} के अंत में शेष", id: "Saldo akhir tahun {n}", vi: "Số dư cuối năm {n}" },
  month: { en: "Month", zh: "月份", ja: "月", es: "Mes", pt: "Mês", fr: "Mois", de: "Monat", ru: "Месяц", it: "Mese", tr: "Ay", ko: "개월", ar: "الشهر", hi: "महीना", id: "Bulan", vi: "Tháng" },
  prinPaid: { en: "Principal paid", zh: "已还本金", ja: "返済元本", es: "Capital pagado", pt: "Principal pago", fr: "Capital remboursé", de: "Getilgte Tilgung", ru: "Погашенный долг", it: "Capitale pagato", tr: "Ödenen anapara", ko: "상환 원금", ar: "الأصل المدفوع", hi: "चुकता मूलधन", id: "Pokok dibayar", vi: "Nợ gốc đã trả" },
  intPaid: { en: "Interest paid", zh: "已还利息", ja: "支払利息", es: "Interés pagado", pt: "Juros pagos", fr: "Intérêts payés", de: "Gezahlte Zinsen", ru: "Выплаченные проценты", it: "Interessi pagati", tr: "Ödenen faiz", ko: "지급 이자", ar: "الفائدة المدفوعة", hi: "चुकता ब्याज", id: "Bunga dibayar", vi: "Tiền lãi đã trả" },
  balance: { en: "Balance", zh: "剩余本金", ja: "残高", es: "Saldo", pt: "Saldo devedor", fr: "Solde", de: "Guthaben", ru: "Баланс", it: "Saldo", tr: "Bakiye", ko: "잔액", ar: "الرصيد", hi: "शेष", id: "Saldo", vi: "Số dư" },
  schedule: { en: "Monthly amortization schedule", zh: "逐月摊销表", ja: "月次返済スケジュール", es: "Tabla de amortización mensual", pt: "Tabela de amortização mensal", fr: "Tableau d'amortissement mensuel", de: "Monatlicher Tilgungsplan", ru: "Помесячный график погашения", it: "Piano di ammortamento mensile", tr: "Aylık ödeme planı", ko: "월별 상환 일정", ar: "جدول السداد الشهري", hi: "मासिक परिशोधन तालिका", id: "Jadwal amortisasi bulanan", vi: "Lịch trả nợ hằng tháng" },
  formula: {
    en: "Monthly payment = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where r is the monthly rate (annual ÷ 12 ÷ 100) and n the number of months. Each month the interest is the balance × r and the rest of the payment retires principal. The rate is an example input, not an offer.",
    zh: "月供 = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1),其中 r 为月利率(年利率 ÷ 12 ÷ 100),n 为月数。每月利息 = 上月余额 × r,月供的其余部分归还本金。利率仅为示例输入,不构成任何报价。",
    ja: "毎月の返済額 = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)。r は月利(年利 ÷ 12 ÷ 100)、n は月数です。各月の利息は残高 × r で、返済額の残りが元本に充てられます。金利は入力例であり、提案ではありません。",
    es: "Cuota = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), donde r es el tipo mensual (anual ÷ 12 ÷ 100) y n los meses. Cada mes los intereses son el saldo × r y el resto de la cuota amortiza capital. El tipo es un dato de ejemplo, no una oferta.",
    pt: "Parcela = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), onde r é a taxa mensal (anual ÷ 12 ÷ 100) e n os meses. A cada mês os juros são o saldo × r e o resto da parcela amortiza o principal. A taxa é um exemplo de entrada, não uma oferta.",
    fr: "Mensualité = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), où r est le taux mensuel (annuel ÷ 12 ÷ 100) et n les mois. Chaque mois, les intérêts valent solde × r et le reste rembourse le capital. Le taux ici est un exemple, pas une offre.",
    de: "Monatsrate = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), wobei r der Monatszins (jährlich ÷ 12 ÷ 100) und n die Monate sind. Jeden Monat sind die Zinsen Restschuld × r, der Rest tilgt Kapital. Der Zinssatz hier ist ein Beispiel, kein Angebot.",
    ru: "Платёж = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), где r — месячная ставка (годовая ÷ 12 ÷ 100), n — месяцы. Каждый месяц проценты равны балансу × r, остальное гасит долг. Ставка здесь — пример, а не предложение.",
    it: "Rata = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), dove r è il tasso mensile (annuale ÷ 12 ÷ 100) e n i mesi. Ogni mese gli interessi sono saldo × r e il resto estingue il capitale. Il tasso qui è un esempio, non un'offerta.",
    tr: "Aylık ödeme = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1); r aylık oran (yıllık ÷ 12 ÷ 100), n ay sayısıdır. Her ay faiz = bakiye × r, kalan kısım anaparayı öder. Buradaki oran örnek girdidir, teklif değildir.",
    ko: "월 상환액 = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1). r는 월 이자율(연율 ÷ 12 ÷ 100), n은 개월 수입니다. 매월 이자는 잔액 × r이고 나머지가 원금을 갚습니다. 여기 금리는 예시 입력이며 제안이 아닙니다.",
    ar: "القسط = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)، حيث r المعدل الشهري (السنوي ÷ 12 ÷ 100)، وn الأشهر. كل شهر الفائدة = الرصيد × r، والباقي يسدد الأصل. السعر هنا مثال وليس عرضًا.",
    hi: "मासिक भुगतान = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), जहाँ r मासिक दर (वार्षिक ÷ 12 ÷ 100) और n महीने हैं। हर महीने ब्याज = शेष × r, शेष भुगतान मूलधन चुकाता है। यहाँ दर उदाहरण है, पेशकश नहीं।",
    id: "Cicilan = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), dengan r suku bunga bulanan (tahunan ÷ 12 ÷ 100), n jumlah bulan. Setiap bulan bunga = saldo × r dan sisanya melunasi pokok. Suku bunga di sini contoh input, bukan penawaran.",
    vi: "Khoản trả = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), trong đó r là lãi suất tháng (năm ÷ 12 ÷ 100), n số tháng. Mỗi tháng tiền lãi = số dư × r, phần còn lại trả gốc. Lãi suất ở đây chỉ là ví dụ, không phải chào giá.",
  },
  yearHint: {
    en: "Enter a whole year from 0 to the term; year 0 means no payment has been made yet.",
    zh: "输入 0 到年限之间的整数年;0 表示尚未开始还款。",
    ja: "0 から期間までの整数年を入力します。0 は返済前を意味します。",
    es: "Introduzca un año entero de 0 al plazo; 0 significa que aún no se ha pagado nada.",
    pt: "Informe um ano inteiro de 0 ao prazo; 0 significa que nada foi pago ainda.",
    fr: "Saisissez une année entière de 0 à la durée ; 0 signifie qu'aucun paiement n'a été effectué.",
    de: "Geben Sie eine ganze Zahl von 0 bis zur Laufzeit ein; 0 bedeutet noch keine Zahlung.",
    ru: "Введите целое число лет от 0 до срока; 0 означает, что платежей ещё не было.",
    it: "Inserisci un anno intero da 0 alla durata; 0 significa che nessun pagamento è stato effettuato.",
    tr: "0 ile vade arasında tam bir yıl girin; 0 henüz ödeme yapılmadığı anlamına gelir.",
    ko: "0부터 기간까지의 정수 연도를 입력하세요. 0은 아직 상환 전임을 의미합니다.",
    ar: "أدخل عددًا صحيحًا للسنوات من 0 إلى المدة؛ 0 يعني أنه لم يتم أي دفعة بعد.",
    hi: "0 से अवधि तक पूर्ण वर्ष दर्ज करें; 0 का अर्थ है कि अभी कोई भुगतान नहीं हुआ।",
    id: "Masukkan tahun bulat dari 0 hingga jangka waktu; 0 berarti belum ada pembayaran.",
    vi: "Nhập số năm nguyên từ 0 đến thời hạn; 0 nghĩa là chưa trả khoản nào.",
  },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineAmort() {
  const { locale } = useI18n();
  const { currency, setCurrency, cur } = useLocaleCurrency(locale);
  const [loan, setLoan] = useState("240000");
  const [rate, setRate] = useState("6");
  const [term, setTerm] = useState("30");
  const [yearQ, setYearQ] = useState("5");

  const l = num(loan);
  const r = num(rate);
  const y = num(term);

  const res = useMemo(() => monthlyAmortization(l, r, y), [l, r, y]);

  const yearN = Math.floor(num(yearQ));
  const yearValid = Number.isInteger(num(yearQ)) && yearN >= 0 && yearN <= y;
  const yearBal = yearValid && Number.isFinite(res.monthlyPI) ? balanceAtYear(l, r, y, yearN) : NaN;

  // 年末余额曲线:每年最后一行(期限非整年时补最后一月)
  const yearEnds = res.rows.filter((row, i) => (i + 1) % 12 === 0 || i === res.rows.length - 1);
  const money = (n: number) => fmtMoney(n, locale, cur.symbol);

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.loan)}>
          <NumIn value={loan} onChange={setLoan} aria="loan amount" />
        </Field>
        <Field label={pick(locale, S.rate)}>
          <NumIn value={rate} onChange={setRate} aria="annual rate" />
        </Field>
        <Field label={pick(locale, S.term)}>
          <NumIn value={term} onChange={setTerm} aria="term in years" />
        </Field>
        <Field label={pick(locale, S.yearQ)}>
          <NumIn value={yearQ} onChange={setYearQ} aria="year for balance" />
        </Field>
              <Field label={pick(locale, CURRENCY_LABEL)}>
          <Sel value={currency} onChange={setCurrency} aria="currency">
            {Object.entries(CURRENCIES).map(([code, def]) => (
              <option key={code} value={code}>
                {def.label}
              </option>
            ))}
          </Sel>
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.monthlyPI), value: money(res.monthlyPI), tone: "accent" },
            { label: pick(locale, S.interest), value: money(res.totalInterest), tone: "bad" },
            { label: pick(locale, S.totalPaid), value: money(res.totalPaid) },
            {
              label: yearValid ? fill(pick(locale, S.yearBalance), { n: yearN }) : pick(locale, S.yearQ),
              value: money(yearBal),
              tone: "good",
            },
          ]}
        />
      </div>

      <div className="mt-3">
        <Note>{pick(locale, S.formula)}</Note>
        <p className="mt-2 text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, S.yearHint)}</p>
      </div>

      {Number.isFinite(res.monthlyPI) && res.totalInterest > 0 && (
        <div className="mt-5">
          <h3 className="mb-3 text-[15px] font-semibold">{chartText(locale, "composition")}</h3>
          <DonutChart
            slices={[
              { label: chartText(locale, "principal"), value: l, color: "var(--color-accent)" },
              { label: chartText(locale, "interestOnly"), value: res.totalInterest, color: "var(--color-good)" },
            ]}
            centerTitle={pick(locale, S.loan)}
            centerValue={money(l)}
            ariaLabel={chartText(locale, "composition")}
          />
        </div>
      )}

      {yearEnds.length > 1 && (
        <div className="mt-6">
          <h3 className="mb-3 text-[15px] font-semibold">{chartText(locale, "balanceCurve")}</h3>
          <BalanceChart
            values={yearEnds.map((row) => row.balance)}
            ariaLabel={chartText(locale, "balanceCurve")}
            valueFormatter={(n) => money(n)}
          />
        </div>
      )}

      {res.rows.length > 0 && (
        <div className="mt-7">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.schedule)}</h3>
          <TableBox
            head={[pick(locale, S.month), pick(locale, S.prinPaid), pick(locale, S.intPaid), pick(locale, S.balance)]}
            rows={res.rows.map((row) => [
              row.month,
              fmt(row.principal, locale, 2),
              fmt(row.interest, locale, 2),
              fmt(row.balance, locale, 2),
            ])}
          />
        </div>
      )}
    </ToolPanel>
  );
}
