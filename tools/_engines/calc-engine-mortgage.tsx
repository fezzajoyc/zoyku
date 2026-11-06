"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, TableBox, fmtMoney, pick } from "./calc-ui";
import { mortgage } from "../_lib/finance";
import { DonutChart, BalanceChart, chartText } from "./calc-charts";

/**
 * Mortgage payment engine on top of finance.mortgage(): P&I via the standard
 * amortization formula, PITI extras (property tax / insurance per year, HOA per
 * month) and a yearly amortization schedule.
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
  price: { en: "Home price", zh: "房屋总价", ja: "住宅価格", es: "Precio de la vivienda", pt: "Preço do imóvel", fr: "Prix du logement", de: "Kaufpreis", ru: "Стоимость жилья", it: "Prezzo dell'abitazione", tr: "Konut fiyatı", ko: "주택 가격", ar: "سعر المنزل", hi: "घर की कीमत", id: "Harga rumah", vi: "Giá nhà" },
  down: { en: "Down payment", zh: "首付", ja: "頭金", es: "Pago inicial", pt: "Entrada", fr: "Apport personnel", de: "Anzahlung", ru: "Первоначальный взнос", it: "Acconto", tr: "Peşinat", ko: "계약금", ar: "الدفعة الأولى", hi: "डाउन पेमेंट", id: "Uang muka", vi: "Tiền đặt trước" },
  amount: { en: "amount", zh: "金额", ja: "金額", es: "importe", pt: "valor", fr: "montant", de: "Betrag", ru: "сумма", it: "importo", tr: "tutar", ko: "금액", ar: "المبلغ", hi: "राशि", id: "jumlah", vi: "số tiền" },
  rate: { en: "Annual interest rate (%)", zh: "年利率 (%)", ja: "年利 (%)", es: "Tasa de interés anual (%)", pt: "Taxa de juros anual (%)", fr: "Taux d'intérêt annuel (%)", de: "Jahreszinssatz (%)", ru: "Годовая ставка (%)", it: "Tasso annuo (%)", tr: "Yıllık faiz oranı (%)", ko: "연간 이자율 (%)", ar: "معدل الفائدة السنوي (%)", hi: "वार्षिक ब्याज दर (%)", id: "Suku bunga tahunan (%)", vi: "Lãi suất năm (%)" },
  term: { en: "Term (years)", zh: "贷款年限", ja: "期間(年)", es: "Plazo (años)", pt: "Prazo (anos)", fr: "Durée (années)", de: "Laufzeit (Jahre)", ru: "Срок (лет)", it: "Durata (anni)", tr: "Vade (yıl)", ko: "기간(년)", ar: "المدة (سنوات)", hi: "अवधि (वर्ष)", id: "Jangka waktu (tahun)", vi: "Thời hạn (năm)" },
  tax: { en: "Property tax / year (optional)", zh: "房产税/年(可选)", ja: "固定資産税/年(任意)", es: "Impuesto anual (opcional)", pt: "IPTU / ano (opcional)", fr: "Taxe foncière / an (facultatif)", de: "Grundsteuer / Jahr (optional)", ru: "Налог на недвижимость / год (необяз.)", it: "Imposta immobiliare / anno (facoltativa)", tr: "Emlak vergisi / yıl (isteğe bağlı)", ko: "재산세 / 연(선택)", ar: "ضريبة العقار / سنة (اختياري)", hi: "संपत्ति कर / वर्ष (वैकल्पिक)", id: "Pajak properti / tahun (opsional)", vi: "Thuế nhà đất / năm (không bắt buộc)" },
  insurance: { en: "Insurance / year (optional)", zh: "保险/年(可选)", ja: "保険料/年(任意)", es: "Seguro anual (opcional)", pt: "Seguro / ano (opcional)", fr: "Assurance / an (facultatif)", de: "Versicherung / Jahr (optional)", ru: "Страховка / год (необяз.)", it: "Assicurazione / anno (facoltativa)", tr: "Sigorta / yıl (isteğe bağlı)", ko: "보험 / 연(선택)", ar: "التأمين / سنة (اختياري)", hi: "बीमा / वर्ष (वैकल्पिक)", id: "Asuransi / tahun (opsional)", vi: "Bảo hiểm / năm (không bắt buộc)" },
  hoa: { en: "HOA / month (optional)", zh: "物业费/月(可选)", ja: "管理費/月(任意)", es: "Cuota mensual (opcional)", pt: "Condomínio / mês (opcional)", fr: "Charges copro. / mois (facultatif)", de: "Hausgeld / Monat (optional)", ru: "Взносы ТСЖ / мес. (необяз.)", it: "Spese condominio / mese (facoltative)", tr: "Site aidatı / ay (isteğe bağlı)", ko: "관리비 / 월(선택)", ar: "رسوم الصيانة / شهر (اختياري)", hi: "HOA / माह (वैकल्पिक)", id: "Iuran perumahan / bulan (opsional)", vi: "Phí quản lý / tháng (không bắt buộc)" },
  currency: { en: "Currency", zh: "币种", ja: "通貨", es: "Moneda", pt: "Moeda", fr: "Devise", de: "Währung", ru: "Валюта", it: "Valuta", tr: "Para birimi", ko: "통화", ar: "العملة", hi: "मुद्रा", id: "Mata uang", vi: "Đồng tiền" },
  monthly: { en: "Monthly payment (P&I)", zh: "月供(本息)", ja: "毎月の返済額(元利)", es: "Cuota mensual (capital e interés)", pt: "Parcela mensal (principal + juros)", fr: "Mensualité (capital + intérêts)", de: "Monatsrate (Tilgung + Zins)", ru: "Платёж в месяц (долг + %)", it: "Rata mensile (capitale + interessi)", tr: "Aylık ödeme (ana para + faiz)", ko: "월 상환액(원리금)", ar: "القسط الشهري (أصل + فائدة)", hi: "मासिक भुगतान (मूल + ब्याज)", id: "Cicilan bulanan (pokok + bunga)", vi: "Trả hàng tháng (gốc + lãi)" },
  piti: { en: "Total monthly (PITI)", zh: "每月总支出(PITI)", ja: "毎月の合計(PITI)", es: "Total mensual (PITI)", pt: "Total mensal (PITI)", fr: "Mensualité totale (PITI)", de: "Monatsrate gesamt (PITI)", ru: "Всего в месяц (PITI)", it: "Mensile totale (PITI)", tr: "Toplam aylık (PITI)", ko: "월 총액(PITI)", ar: "الإجمالي الشهري (PITI)", hi: "कुल मासिक (PITI)", id: "Total bulanan (PITI)", vi: "Tổng hàng tháng (PITI)" },
  loan: { en: "Loan amount", zh: "贷款金额", ja: "借入額", es: "Importe del préstamo", pt: "Valor financiado", fr: "Montant du prêt", de: "Kreditbetrag", ru: "Сумма кредита", it: "Importo prestito", tr: "Kredi tutarı", ko: "대출 금액", ar: "مبلغ القرض", hi: "ऋण राशि", id: "Jumlah pinjaman", vi: "Số tiền vay" },
  interest: { en: "Total interest", zh: "总利息", ja: "総利息", es: "Interés total", pt: "Total de juros", fr: "Intérêts totaux", de: "Gesamtzinsen", ru: "Всего процентов", it: "Interessi totali", tr: "Toplam faiz", ko: "총 이자", ar: "إجمالي الفائدة", hi: "कुल ब्याज", id: "Total bunga", vi: "Tổng tiền lãi" },
  year: { en: "Year", zh: "年份", ja: "年", es: "Año", pt: "Ano", fr: "Année", de: "Jahr", ru: "Год", it: "Anno", tr: "Yıl", ko: "연도", ar: "السنة", hi: "वर्ष", id: "Tahun", vi: "Năm" },
  prinPaid: { en: "Principal paid", zh: "已还本金", ja: "返済元本", es: "Capital pagado", pt: "Principal pago", fr: "Capital remboursé", de: "Getilgte Tilgung", ru: "Погашенный долг", it: "Capitale pagato", tr: "Ödenen anapara", ko: "상환 원금", ar: "الأصل المدفوع", hi: "चुकता मूलधन", id: "Pokok dibayar", vi: "Nợ gốc đã trả" },
  intPaid: { en: "Interest paid", zh: "已还利息", ja: "支払利息", es: "Interés pagado", pt: "Juros pagos", fr: "Intérêts payés", de: "Gezahlte Zinsen", ru: "Выплаченные проценты", it: "Interessi pagati", tr: "Ödenen faiz", ko: "지급 이자", ar: "الفائدة المدفوعة", hi: "चुकता ब्याज", id: "Bunga dibayar", vi: "Tiền lãi đã trả" },
  balance: { en: "Balance", zh: "剩余本金", ja: "残高", es: "Saldo", pt: "Saldo devedor", fr: "Solde", de: "Guthaben", ru: "Баланс", it: "Saldo", tr: "Bakiye", ko: "잔액", ar: "الرصيد", hi: "शेष", id: "Saldo", vi: "Số dư" },
  schedule: { en: "Yearly amortization schedule", zh: "年度还款计划表", ja: "年次返済スケジュール", es: "Tabla de amortización anual", pt: "Tabela de amortização anual", fr: "Tableau d'amortissement annuel", de: "Jährlicher Tilgungsplan", ru: "Годовой график погашения", it: "Piano di ammortamento annuo", tr: "Yıllık ödeme planı", ko: "연간 상환 일정", ar: "جدول السداد السنوي", hi: "वार्षिक परिशोधन तालिका", id: "Jadwal amortisasi tahunan", vi: "Lịch trả nợ hằng năm" },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineMortgage() {
  const { locale } = useI18n();
  const [price, setPrice] = useState("300000");
  const [down, setDown] = useState("20");
  const [downMode, setDownMode] = useState("percent");
  const [rate, setRate] = useState("6");
  const [term, setTerm] = useState("30");
  const [tax, setTax] = useState("");
  const [insurance, setInsurance] = useState("");
  const [hoa, setHoa] = useState("");
  const [currency, setCurrency] = useState("USD");

  const p = num(price);
  const d = num(down);
  const annual = num(rate);
  const years = num(term);
  const taxY = num(tax);
  const insY = num(insurance);
  const hoaM = num(hoa);
  const cur = CURRENCIES[currency] ?? CURRENCIES.USD;
  const money = (n: number) => fmtMoney(n, locale, cur.symbol, cur.frac);

  const downAmount = downMode === "percent" ? p * d / 100 : d;
  const loan = p - downAmount;

  const res = useMemo(
    () => mortgage(loan, annual, years),
    [loan, annual, years],
  );

  const extrasOK = [taxY, insY, hoaM].every((v) => !Number.isFinite(v) || v >= 0);
  const extras = (Number.isFinite(taxY) ? taxY : 0) / 12 + (Number.isFinite(insY) ? insY : 0) / 12 + (Number.isFinite(hoaM) ? hoaM : 0);
  const piti = Number.isFinite(res.monthlyPI) && extrasOK ? res.monthlyPI + extras : NaN;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.price)}>
          <NumIn value={price} onChange={setPrice} aria="home price" />
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
          <NumIn value={term} onChange={setTerm} aria="term in years" />
        </Field>
        <Field label={pick(locale, S.tax)}>
          <NumIn value={tax} onChange={setTax} aria="property tax per year" placeholder="0" />
        </Field>
        <Field label={pick(locale, S.insurance)}>
          <NumIn value={insurance} onChange={setInsurance} aria="insurance per year" placeholder="0" />
        </Field>
        <Field label={pick(locale, S.hoa)}>
          <NumIn value={hoa} onChange={setHoa} aria="HOA per month" placeholder="0" />
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
            { label: pick(locale, S.piti), value: money(piti), tone: "good" },
            { label: pick(locale, S.loan), value: money(loan) },
            { label: pick(locale, S.interest), value: money(res.totalInterest) },
          ]}
        />
      </div>

      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "P&I = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where L is the loan (price − down payment), r the monthly rate (annual ÷ 12 ÷ 100) and n the months. PITI adds monthly shares of yearly property tax and insurance plus HOA. Rates here are an example input, not an offer.",
            zh: "本息月供 = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1),其中 L 为贷款额(房价 − 首付),r 为月利率(年利率 ÷ 12 ÷ 100),n 为月数。PITI 在此基础上加上房产税、保险的月均额和物业费。利率仅为示例输入,不构成任何报价。",
            ja: "元利均等返済額 = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)。L は借入額(価格 − 頭金)、r は月利(年利 ÷ 12 ÷ 100)、n は月数です。PITI は固定資産税・保険の月割額と管理費を加えた合計です。金利は入力例であり、提案ではありません。",
            es: "Cuota = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), donde L es el préstamo (precio − entrada), r el tipo mensual (anual ÷ 12 ÷ 100) y n los meses. El PITI añade la parte mensual del impuesto y del seguro anuales más la cuota de comunidad. El tipo es un dato de ejemplo, no una oferta.",
            pt: "Parcela = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), onde L é o valor financiado (preço − entrada), r a taxa mensal (anual ÷ 12 ÷ 100) e n os meses. O PITI soma as frações mensais de IPTU e seguro anuais mais o condomínio. A taxa é um exemplo de entrada, não uma oferta.",
            fr: "P&I = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), où L est le prêt (prix − apport), r le taux mensuel (annuel ÷ 12 ÷ 100) et n les mois. La mensualité totale (PITI) ajoute les parts mensuelles de taxe foncière et d'assurance annuelles, plus les charges de copropriété. Les taux ici sont un exemple, pas une offre.",
            de: "P&I = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), wobei L der Kredit (Kaufpreis − Anzahlung), r der Monatszins (jährlich ÷ 12 ÷ 100) und n die Monate sind. PITI ergänzt monatliche Anteile von Grundsteuer und Versicherung plus Hausgeld. Die Zinssätze hier sind ein Beispiel, kein Angebot.",
            ru: "P&I = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), где L — кредит (цена − первый взнос), r — месячная ставка (годовая ÷ 12 ÷ 100), n — месяцы. PITI добавляет месячные доли годового налога на недвижимость и страховки плюс взносы ТСЖ. Ставки здесь — пример, а не предложение.",
            it: "P&I = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), dove L è il prestito (prezzo − acconto), r il tasso mensile (annuale ÷ 12 ÷ 100) e n i mesi. PITI aggiunge le quote mensili di imposta immobiliare e assicurazione annuali più le spese condominiali. I tassi qui sono un esempio, non un'offerta.",
            tr: "P&I = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1); L kredi (fiyat − peşinat), r aylık oran (yıllık ÷ 12 ÷ 100), n ay sayısıdır. PITI, yıllık emlak vergisi ve sigortanın aylık paylarını plus site aidatını ekler. Buradaki oranlar örnek girdidir, teklif değildir.",
            ko: "P&I = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1). L은 대출액(가격 − 계약금), r는 월 이자율(연율 ÷ 12 ÷ 100), n은 개월 수입니다. PITI는 연간 재산세·보험의 월 분담액과 관리비를 더합니다. 여기 금리는 예시 입력이며 제안이 아닙니다.",
            ar: "P&I = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)، حيث L القرض (السعر − الدفعة الأولى)، وr المعدل الشهري (السنوي ÷ 12 ÷ 100)، وn الأشهر. يضيف PITI الحصص الشهرية من ضريبة العقار والتأمين السنويين زائد رسوم الصيانة. الأسعار هنا مثال توضيحي وليست عرضًا.",
            hi: "P&I = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), जहाँ L ऋण (कीमत − डाउन पेमेंट), r मासिक दर (वार्षिक ÷ 12 ÷ 100) और n महीने हैं। PITI में वार्षिक संपत्ति कर और बीमा के मासिक हिस्से जुड़ते हैं, साथ में HOA। यहाँ दरें उदाहरण हैं, पेशकश नहीं।",
            id: "P&I = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), dengan L pinjaman (harga − uang muka), r suku bunga bulanan (tahunan ÷ 12 ÷ 100), n jumlah bulan. PITI menambahkan porsi bulanan pajak properti dan asuransi tahunan plus iuran perumahan. Suku bunga di sini contoh input, bukan penawaran.",
            vi: "P&I = L × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), trong đó L là khoản vay (giá − tiền đặt trước), r lãi suất tháng (năm ÷ 12 ÷ 100), n số tháng. PITI cộng thêm phần tháng của thuế nhà đất và bảo hiểm hằng năm cùng phí quản lý. Lãi suất ở đây chỉ là ví dụ, không phải chào giá.",
          })}
        </Note>
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
