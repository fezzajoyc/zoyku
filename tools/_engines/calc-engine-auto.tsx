"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, TableBox, fmtMoney, pick } from "./calc-ui";
import { mortgage } from "../_lib/finance";
import { DonutChart, BalanceChart, chartText } from "./calc-charts";

/**
 * Auto loan engine reusing finance.mortgage()/mortgagePayment() directly:
 * car price minus down payment financed at the annual rate over a term in
 * months (typically 36–84), with monthly payment, total interest and a
 * year-aggregated amortization schedule.
 * props: none.
 */

const CURRENCIES: Record<string, { symbol: string; frac: number }> = {
  USD: { symbol: "$", frac: 2 },
  EUR: { symbol: "€", frac: 2 },
  CNY: { symbol: "¥", frac: 2 },
  JPY: { symbol: "¥", frac: 0 },
  BRL: { symbol: "R$", frac: 2 },
};

const S = {
  price: { en: "Car price", zh: "车价", ja: "車両価格", es: "Precio del coche", pt: "Preço do carro", fr: "Prix de la voiture", de: "Autopreis", ru: "Цена автомобиля", it: "Prezzo dell'auto", tr: "Araba fiyatı", ko: "차량 가격", ar: "سعر السيارة", hi: "कार की कीमत", id: "Harga mobil", vi: "Giá xe" },
  down: { en: "Down payment", zh: "首付", ja: "頭金", es: "Pago inicial", pt: "Entrada", fr: "Apport personnel", de: "Anzahlung", ru: "Первоначальный взнос", it: "Acconto", tr: "Peşinat", ko: "계약금", ar: "الدفعة الأولى", hi: "डाउन पेमेंट", id: "Uang muka", vi: "Tiền đặt trước" },
  amount: { en: "amount", zh: "金额", ja: "金額", es: "importe", pt: "valor", fr: "montant", de: "Betrag", ru: "сумма", it: "importo", tr: "tutar", ko: "금액", ar: "المبلغ", hi: "राशि", id: "jumlah", vi: "số tiền" },
  rate: { en: "Annual interest rate (%)", zh: "年利率 (%)", ja: "年利 (%)", es: "Tasa de interés anual (%)", pt: "Taxa de juros anual (%)", fr: "Taux d'intérêt annuel (%)", de: "Jahreszinssatz (%)", ru: "Годовая ставка (%)", it: "Tasso annuo (%)", tr: "Yıllık faiz oranı (%)", ko: "연간 이자율 (%)", ar: "معدل الفائدة السنوي (%)", hi: "वार्षिक ब्याज दर (%)", id: "Suku bunga tahunan (%)", vi: "Lãi suất năm (%)" },
  term: { en: "Term (months)", zh: "期限(月)", ja: "期間(か月)", es: "Plazo (meses)", pt: "Prazo (meses)", fr: "Durée (mois)", de: "Laufzeit (Monate)", ru: "Срок (месяцев)", it: "Durata (mesi)", tr: "Vade (ay)", ko: "기간(개월)", ar: "المدة (أشهر)", hi: "अवधि (महीने)", id: "Jangka waktu (bulan)", vi: "Thời hạn (tháng)" },
  currency: { en: "Currency", zh: "币种", ja: "通貨", es: "Moneda", pt: "Moeda", fr: "Devise", de: "Währung", ru: "Валюта", it: "Valuta", tr: "Para birimi", ko: "통화", ar: "العملة", hi: "मुद्रा", id: "Mata uang", vi: "Đồng tiền" },
  monthly: { en: "Monthly payment (P&I)", zh: "月供(本息)", ja: "毎月の返済額(元利)", es: "Cuota mensual (capital e interés)", pt: "Parcela mensal (principal + juros)", fr: "Mensualité (capital + intérêts)", de: "Monatsrate (Tilgung + Zins)", ru: "Платёж в месяц (долг + %)", it: "Rata mensile (capitale + interessi)", tr: "Aylık ödeme (ana para + faiz)", ko: "월 상환액(원리금)", ar: "القسط الشهري (أصل + فائدة)", hi: "मासिक भुगतान (मूल + ब्याज)", id: "Cicilan bulanan (pokok + bunga)", vi: "Trả hàng tháng (gốc + lãi)" },
  loan: { en: "Loan amount", zh: "贷款金额", ja: "借入額", es: "Importe del préstamo", pt: "Valor financiado", fr: "Montant du prêt", de: "Kreditbetrag", ru: "Сумма кредита", it: "Importo prestito", tr: "Kredi tutarı", ko: "대출 금액", ar: "مبلغ القرض", hi: "ऋण राशि", id: "Jumlah pinjaman", vi: "Số tiền vay" },
  interest: { en: "Total interest", zh: "总利息", ja: "総利息", es: "Interés total", pt: "Total de juros", fr: "Intérêts totaux", de: "Gesamtzinsen", ru: "Всего процентов", it: "Interessi totali", tr: "Toplam faiz", ko: "총 이자", ar: "إجمالي الفائدة", hi: "कुल ब्याज", id: "Total bunga", vi: "Tổng tiền lãi" },
  totalPaid: { en: "Total paid", zh: "还款总额", ja: "返済総額", es: "Pago total", pt: "Total pago", fr: "Paiement total", de: "Gesamtzahlung", ru: "Всего выплат", it: "Totale pagato", tr: "Toplam ödeme", ko: "총 상환액", ar: "إجمالي المدفوع", hi: "कुल भुगतान", id: "Total dibayar", vi: "Tổng thanh toán" },
  year: { en: "Year", zh: "年份", ja: "年", es: "Año", pt: "Ano", fr: "Année", de: "Jahr", ru: "Год", it: "Anno", tr: "Yıl", ko: "연도", ar: "السنة", hi: "वर्ष", id: "Tahun", vi: "Năm" },
  prinPaid: { en: "Principal paid", zh: "已还本金", ja: "返済元本", es: "Capital pagado", pt: "Principal pago", fr: "Capital remboursé", de: "Getilgte Tilgung", ru: "Погашенный долг", it: "Capitale pagato", tr: "Ödenen anapara", ko: "상환 원금", ar: "الأصل المدفوع", hi: "चुकता मूलधन", id: "Pokok dibayar", vi: "Nợ gốc đã trả" },
  intPaid: { en: "Interest paid", zh: "已还利息", ja: "支払利息", es: "Interés pagado", pt: "Juros pagos", fr: "Intérêts payés", de: "Gezahlte Zinsen", ru: "Выплаченные проценты", it: "Interessi pagati", tr: "Ödenen faiz", ko: "지급 이자", ar: "الفائدة المدفوعة", hi: "चुकता ब्याज", id: "Bunga dibayar", vi: "Tiền lãi đã trả" },
  balance: { en: "Balance", zh: "剩余本金", ja: "残高", es: "Saldo", pt: "Saldo devedor", fr: "Solde", de: "Restschuld", ru: "Остаток", it: "Saldo", tr: "Kalan bakiye", ko: "잔액", ar: "الرصيد", hi: "शेष", id: "Sisa", vi: "Dư nợ" },
  schedule: { en: "Yearly amortization schedule", zh: "年度还款计划表", ja: "年次返済スケジュール", es: "Tabla de amortización anual", pt: "Tabela de amortização anual", fr: "Tableau d'amortissement annuel", de: "Jährlicher Tilgungsplan", ru: "Годовой график погашения", it: "Piano di ammortamento annuo", tr: "Yıllık ödeme planı", ko: "연간 상환 일정", ar: "جدول السداد السنوي", hi: "वार्षिक परिशोधन तालिका", id: "Jadwal amortisasi tahunan", vi: "Lịch trả nợ hằng năm" },
  noLoan: {
    en: "The down payment covers the price — no loan needed.",
    zh: "首付已覆盖车价——无需贷款。",
    ja: "頭金が車両価格をカバーしているため、ローンは不要です。",
    es: "El pago inicial cubre el precio — no se necesita préstamo.",
    pt: "A entrada cobre o preço — não é necessário financiamento.",
    fr: "L'apport couvre le prix — aucun prêt n'est nécessaire.",
    de: "Die Anzahlung deckt den Preis ab — kein Kredit nötig.",
    ru: "Первоначальный взнос покрывает цену — кредит не нужен.",
    it: "L'acconto copre il prezzo — non serve un prestito.",
    tr: "Peşinat fiyatı karşılıyor — kredi gerekmiyor.",
    ko: "계약금이 차량 가격을 충당합니다 — 대출이 필요하지 않습니다.",
    ar: "الدفعة الأولى تغطي السعر — لا حاجة إلى قرض.",
    hi: "डाउन पेमेंट कीमत को कवर करता है — ऋण की आवश्यकता नहीं है।",
    id: "Uang muka menutup harga — pinjaman tidak diperlukan.",
    vi: "Tiền đặt trước đã phủ giá xe — không cần vay.",
  },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineAuto() {
  const { locale } = useI18n();
  const [price, setPrice] = useState("30000");
  const [down, setDown] = useState("20");
  const [downMode, setDownMode] = useState("percent");
  const [rate, setRate] = useState("6");
  const [term, setTerm] = useState("60");
  const [currency, setCurrency] = useState("USD");

  const p = num(price);
  const d = num(down);
  const annual = num(rate);
  const months = num(term);
  const cur = CURRENCIES[currency] ?? CURRENCIES.USD;
  const money = (n: number) => fmtMoney(n, locale, cur.symbol, cur.frac);

  const downAmount = downMode === "percent" ? (p * d) / 100 : d;
  const loan = p - downAmount;
  // 车贷期限常以月计(36–84);mortgage() 以年入参,months/12 经 Math.round 还原精确月数。
  const years = Number.isFinite(months) ? months / 12 : NaN;

  const res = useMemo(() => mortgage(loan, annual, years), [loan, annual, years]);
  const noLoan = Number.isFinite(p) && p > 0 && Number.isFinite(downAmount) && downAmount >= p;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.price)}>
          <NumIn value={price} onChange={setPrice} aria="car price" />
        </Field>
        <Field label={pick(locale, S.down)}>
          <div className="flex gap-2">
            <NumIn value={down} onChange={setDown} aria="down payment" className="min-w-0 flex-1" />
            <Sel value={downMode} onChange={setDownMode} aria="down payment mode">
              <option value="percent">%</option>
              <option value="amount">{pick(locale, S.amount)}</option>
            </Sel>
          </div>
        </Field>
        <Field label={pick(locale, S.rate)}>
          <NumIn value={rate} onChange={setRate} aria="annual rate" />
        </Field>
        <Field label={pick(locale, S.term)}>
          <NumIn value={term} onChange={setTerm} aria="term in months" />
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
            { label: pick(locale, S.monthly), value: money(res.monthlyPI), tone: "accent" },
            { label: pick(locale, S.loan), value: money(loan) },
            { label: pick(locale, S.interest), value: money(res.totalInterest), tone: "good" },
            { label: pick(locale, S.totalPaid), value: money(res.totalPaid) },
          ]}
        />
      </div>

      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "Monthly payment = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where L is the amount financed (price − down payment), r the monthly rate (annual ÷ 12 ÷ 100) and n the number of months. Car loan terms are typically 36–84 months; the table aggregates the schedule by year. Rates here are an example input, not an offer.",
            zh: "月供 = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1),其中 L 为放款额(车价 − 首付),r 为月利率(年利率 ÷ 12 ÷ 100),n 为月数。车贷期限常见 36–84 个月;下表按年汇总。利率仅为示例输入,不构成任何报价。",
            ja: "毎月の返済額 = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)。L は借入額(車両価格 − 頭金)、r は月利(年利 ÷ 12 ÷ 100)、n は月数です。自動車ローンの期間は 36〜84 か月が一般的です。表は年ごとに集計しています。金利は入力例であり、提案ではありません。",
            es: "Cuota = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), donde L es el importe financiado (precio − pago inicial), r el tipo mensual (anual ÷ 12 ÷ 100) y n los meses. Los plazos de crédito automovilístico suelen ser de 36 a 84 meses; la tabla agrega por año. El tipo es un dato de ejemplo, no una oferta.",
            pt: "Parcela = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), onde L é o valor financiado (preço − entrada), r a taxa mensal (anual ÷ 12 ÷ 100) e n os meses. Prazos de financiamento de veículos costumam ser de 36 a 84 meses; a tabela agrega por ano. A taxa é um exemplo de entrada, não uma oferta.",
            fr: "Mensualité = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), où L est le montant financé (prix − apport), r le taux mensuel (annuel ÷ 12 ÷ 100) et n les mois. Les durées de crédit auto sont typiquement de 36 à 84 mois ; le tableau agrège par année. Les taux ici sont un exemple, pas une offre.",
            de: "Monatsrate = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), wobei L der finanzierte Betrag (Preis − Anzahlung), r der Monatszins (jährlich ÷ 12 ÷ 100) und n die Monate sind. Autokredite laufen typischerweise 36–84 Monate; die Tabelle fasst jährlich zusammen. Die Zinssätze hier sind ein Beispiel, kein Angebot.",
            ru: "Платёж = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), где L — сумма финансирования (цена − первый взнос), r — месячная ставка (годовая ÷ 12 ÷ 100), n — месяцы. Автокредиты обычно выдаются на 36–84 месяца; таблица агрегирует по годам. Ставки здесь — пример, а не предложение.",
            it: "Rata = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), dove L è l'importo finanziato (prezzo − acconto), r il tasso mensile (annuale ÷ 12 ÷ 100) e n i mesi. I prestiti auto durano tipicamente 36–84 mesi; la tabella aggrega per anno. I tassi qui sono un esempio, non un'offerta.",
            tr: "Aylık ödeme = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1); L finanse edilen tutar (fiyat − peşinat), r aylık oran (yıllık ÷ 12 ÷ 100), n ay sayısıdır. Taşıt kredileri genellikle 36–84 ay sürer; tablo yıllara göre özetler. Buradaki oranlar örnek girdidir, teklif değildir.",
            ko: "월 상환액 = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1). L은 대출액(차량 가격 − 계약금), r는 월 이자율(연율 ÷ 12 ÷ 100), n은 개월 수입니다. 자동차 대출 기간은 보통 36~84개월입니다. 표는 연도별로 집계합니다. 여기 금리는 예시 입력이며 제안이 아닙니다.",
            ar: "القسط الشهري = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)، حيث L المبلغ الممول (السعر − الدفعة الأولى)، وr المعدل الشهري (السنوي ÷ 12 ÷ 100)، وn عدد الأشهر. مدة قروض السيارات عادةً 36–84 شهرًا؛ والجدول يجمع سنويًا. الأسعار هنا مثال توضيحي وليست عرضًا.",
            hi: "मासिक भुगतान = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), जहाँ L वित्त पोषित राशि (कीमत − डाउन पेमेंट), r मासिक दर (वार्षिक ÷ 12 ÷ 100) और n महीने हैं। कार ऋण की अवधि सामान्यतः 36–84 महीने होती है; तालिका वर्षवार संक्षेप में दिखाती है। यहाँ दरें उदाहरण हैं, पेशकश नहीं।",
            id: "Cicilan bulanan = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), dengan L jumlah yang dibiayai (harga − uang muka), r suku bunga bulanan (tahunan ÷ 12 ÷ 100), n jumlah bulan. Tenor kredit mobil umumnya 36–84 bulan; tabel merangkum per tahun. Suku bunga di sini contoh input, bukan penawaran.",
            vi: "Trả hàng tháng = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), trong đó L là số tiền vay (giá − tiền đặt trước), r lãi suất tháng (năm ÷ 12 ÷ 100), n số tháng. Thời hạn vay mua xe thường 36–84 tháng; bảng tổng hợp theo năm. Lãi suất ở đây chỉ là ví dụ, không phải chào giá.",
          })}
        </Note>
        {noLoan && (
          <p className="mt-2 text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, S.noLoan)}</p>
        )}
      </div>

      {Number.isFinite(res.monthlyPI) && res.totalInterest > 0 && (
        <div className="mt-5">
          <h3 className="mb-3 text-[15px] font-semibold">{chartText(locale, "composition")}</h3>
          <DonutChart
            slices={[
              { label: chartText(locale, "principal"), value: loan, color: "var(--color-accent)" },
              { label: chartText(locale, "interestOnly"), value: res.totalInterest, color: "var(--color-good)" },
            ]}
            centerTitle={pick(locale, S.loan)}
            centerValue={money(loan)}
            ariaLabel={chartText(locale, "composition")}
          />
        </div>
      )}

      {res.schedule.length > 1 && (
        <div className="mt-6">
          <h3 className="mb-3 text-[15px] font-semibold">{chartText(locale, "balanceCurve")}</h3>
          <BalanceChart
            values={res.schedule.map((r) => r.balance)}
            ariaLabel={chartText(locale, "balanceCurve")}
            valueFormatter={(n) => money(n)}
          />
        </div>
      )}

      {res.schedule.length > 0 && (
        <div className="mt-7">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.schedule)}</h3>
          <TableBox
            head={[pick(locale, S.year), pick(locale, S.prinPaid), pick(locale, S.intPaid), pick(locale, S.balance)]}
            rows={res.schedule.map((row) => [
              row.year,
              money(row.principal),
              money(row.interest),
              money(row.balance),
            ])}
          />
        </div>
      )}
    </ToolPanel>
  );
}
