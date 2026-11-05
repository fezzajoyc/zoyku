"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, TableBox, fmt, fmtMoney, pick } from "./calc-ui";

/**
 * Shared engine for EMI and loan repayment: standard reducing-balance EMI
 * formula, with a yearly amortization schedule for the loan variant.
 * props.kind = "emi" | "loan".
 */

const S = {
  principal: { en: "Loan amount", zh: "贷款金额", ja: "借入額", es: "Importe del préstamo", pt: "Valor do empréstimo", fr: "Montant du prêt", de: "Kreditbetrag", ru: "Сумма кредита", it: "Importo prestito", tr: "Kredi tutarı", ko: "대출 금액", ar: "مبلغ القرض", hi: "ऋण राशि", id: "Jumlah pinjaman", vi: "Số tiền vay" },
  rate: { en: "Annual interest rate (%)", zh: "年利率 (%)", ja: "年利 (%)", es: "Tasa de interés anual (%)", pt: "Taxa de juros anual (%)", fr: "Taux d'intérêt annuel (%)", de: "Jahreszinssatz (%)", ru: "Годовая ставка (%)", it: "Tasso annuo (%)", tr: "Yıllık faiz oranı (%)", ko: "연간 이자율 (%)", ar: "معدل الفائدة السنوي (%)", hi: "वार्षिक ब्याज दर (%)", id: "Suku bunga tahunan (%)", vi: "Lãi suất năm (%)" },
  tenure: { en: "Tenure", zh: "期限", ja: "期間", es: "Plazo", pt: "Prazo", fr: "Durée", de: "Laufzeit", ru: "Срок", it: "Durata", tr: "Vade", ko: "기간", ar: "المدة", hi: "अवधि", id: "Jangka waktu", vi: "Thời hạn" },
  years: { en: "years", zh: "年", ja: "年", es: "años", pt: "anos", fr: "ans", de: "Jahre", ru: "лет", it: "anni", tr: "yıl", ko: "년", ar: "سنوات", hi: "वर्ष", id: "tahun", vi: "năm" },
  months: { en: "months", zh: "个月", ja: "か月", es: "meses", pt: "meses", fr: "mois", de: "Monate", ru: "месяцев", it: "mesi", tr: "ay", ko: "개월", ar: "أشهر", hi: "महीने", id: "bulan", vi: "tháng" },
  emi: { en: "Monthly payment (EMI)", zh: "月供 (EMI)", ja: "月々の返済額 (EMI)", es: "Cuota mensual (EMI)", pt: "Parcela mensal (EMI)", fr: "Mensualité (EMI)", de: "Monatsrate (EMI)", ru: "Платёж в месяц (EMI)", it: "Rata mensile (EMI)", tr: "Aylık taksit (EMI)", ko: "월 상환액(EMI)", ar: "القسط الشهري (EMI)", hi: "मासिक किस्त (EMI)", id: "Cicilan bulanan (EMI)", vi: "Trả hàng tháng (EMI)" },
  interest: { en: "Total interest", zh: "总利息", ja: "総利息", es: "Interés total", pt: "Total de juros", fr: "Intérêts totaux", de: "Gesamtzinsen", ru: "Всего процентов", it: "Interessi totali", tr: "Toplam faiz", ko: "총 이자", ar: "إجمالي الفائدة", hi: "कुल ब्याज", id: "Total bunga", vi: "Tổng tiền lãi" },
  pay: { en: "Total payment", zh: "还款总额", ja: "返済総額", es: "Pago total", pt: "Total pago", fr: "Paiement total", de: "Gesamtzahlung", ru: "Всего выплат", it: "Pagamento totale", tr: "Toplam ödeme", ko: "총 상환액", ar: "إجمالي الدفع", hi: "कुल भुगतान", id: "Total pembayaran", vi: "Tổng thanh toán" },
  year: { en: "Year", zh: "年份", ja: "年", es: "Año", pt: "Ano", fr: "Année", de: "Jahr", ru: "Год", it: "Anno", tr: "Yıl", ko: "연도", ar: "السنة", hi: "वर्ष", id: "Tahun", vi: "Năm" },
  prinPaid: { en: "Principal paid", zh: "已还本金", ja: "返済元本", es: "Capital pagado", pt: "Principal pago", fr: "Capital remboursé", de: "Getilgte Tilgung", ru: "Погашенный долг", it: "Capitale pagato", tr: "Ödenen anapara", ko: "상환 원금", ar: "الأصل المدفوع", hi: "चुकता मूलधन", id: "Pokok dibayar", vi: "Nợ gốc đã trả" },
  intPaid: { en: "Interest paid", zh: "已还利息", ja: "支払利息", es: "Interés pagado", pt: "Juros pagos", fr: "Intérêts payés", de: "Gezahlte Zinsen", ru: "Выплаченные проценты", it: "Interessi pagati", tr: "Ödenen faiz", ko: "지급 이자", ar: "الفائدة المدفوعة", hi: "चुकता ब्याज", id: "Bunga dibayar", vi: "Tiền lãi đã trả" },
  balance: { en: "Balance", zh: "剩余本金", ja: "残高", es: "Saldo", pt: "Saldo devedor", fr: "Solde", de: "Restschuld", ru: "Остаток", it: "Saldo", tr: "Kalan bakiye", ko: "잔액", ar: "الرصيد", hi: "शेष", id: "Sisa", vi: "Dư nợ" },
  schedule: { en: "Yearly amortization schedule", zh: "年度还款计划表", ja: "年次返済スケジュール", es: "Tabla de amortización anual", pt: "Tabela de amortização anual", fr: "Tableau d'amortissement annuel", de: "Jährlicher Tilgungsplan", ru: "Годовой график погашения", it: "Piano di ammortamento annuo", tr: "Yıllık ödeme planı", ko: "연간 상환 일정", ar: "جدول السداد السنوي", hi: "वार्षिक परिशोधन तालिका", id: "Jadwal amortisasi tahunan", vi: "Lịch trả nợ hằng năm" },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

/** Standard EMI: P·r·(1+r)^n / ((1+r)^n − 1), r = monthly rate. */
function emiOf(p: number, annualRate: number, nMonths: number): number {
  const r = annualRate / 1200;
  if (nMonths < 1) return NaN;
  if (r === 0) return p / nMonths;
  const f = Math.pow(1 + r, nMonths);
  return (p * r * f) / (f - 1);
}

export function CalcEngineLoan({ kind }: { kind: string }) {
  const { locale } = useI18n();
  const isLoan = kind === "loan";
  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate] = useState("8.5");
  const [tenure, setTenure] = useState("20");
  const [unit, setUnit] = useState("years");

  const p = num(principal);
  const annual = num(rate);
  const t = num(tenure);
  const nMonths = Number.isFinite(t) ? Math.round(unit === "years" ? t * 12 : t) : NaN;

  const schedule = useMemo(() => {
    if (!Number.isFinite(p) || p <= 0 || !Number.isFinite(annual) || annual < 0 || !Number.isFinite(nMonths) || nMonths < 1) {
      return [];
    }
    const emi = emiOf(p, annual, nMonths);
    const r = annual / 1200;
    let bal = p;
    const rows: { year: number; prin: number; int: number; bal: number }[] = [];
    let yPrin = 0;
    let yInt = 0;
    for (let m = 1; m <= nMonths; m++) {
      const interest = bal * r;
      let prin = emi - interest;
      if (prin > bal) prin = bal;
      bal -= prin;
      yPrin += prin;
      yInt += interest;
      if (m % 12 === 0 || m === nMonths) {
        rows.push({ year: Math.ceil(m / 12), prin: yPrin, int: yInt, bal: Math.max(bal, 0) });
        yPrin = 0;
        yInt = 0;
      }
    }
    return rows;
  }, [p, annual, nMonths]);

  const emi = Number.isFinite(p) && Number.isFinite(annual) && Number.isFinite(nMonths) ? emiOf(p, annual, nMonths) : NaN;
  const totalPay = Number.isFinite(emi) && Number.isFinite(nMonths) ? emi * nMonths : NaN;
  const totalInt = Number.isFinite(totalPay) ? totalPay - p : NaN;
  const symbol = "₹";

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.principal)}>
          <NumIn value={principal} onChange={setPrincipal} aria="loan amount" />
        </Field>
        <Field label={pick(locale, S.rate)}>
          <NumIn value={rate} onChange={setRate} aria="annual rate" />
        </Field>
        <Field label={pick(locale, S.tenure)}>
          <NumIn value={tenure} onChange={setTenure} aria="tenure" />
        </Field>
        <Field label=" ">
          <Sel value={unit} onChange={setUnit} aria="tenure unit">
            <option value="years">{pick(locale, S.years)}</option>
            <option value="months">{pick(locale, S.months)}</option>
          </Sel>
        </Field>
      </div>
      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.emi), value: fmtMoney(emi, locale, symbol), tone: "accent" },
            { label: pick(locale, S.interest), value: fmtMoney(totalInt, locale, symbol) },
            { label: pick(locale, S.pay), value: fmtMoney(totalPay, locale, symbol), tone: "good" },
          ]}
        />
      </div>
      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) — the standard reducing-balance formula used by banks, where r is the monthly rate and n the number of months.",
            zh: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1),即银行通用的等额本息(余额递减)公式,r 为月利率,n 为期数。",
            ja: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)。銀行で使われる標準的な残高スライド式の公式で、r は月利、n は返済回数です。",
            es: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), la fórmula estándar de saldo decreciente que usan los bancos, donde r es la tasa mensual y n el número de cuotas.",
            pt: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) — a fórmula padrão de saldo decrescente usada pelos bancos, onde r é a taxa mensal e n o número de parcelas.",
            fr: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) — la formule d'amortissement dégressif standard des banques, où r est le taux mensuel et n le nombre de mois.",
            de: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) — die von Banken genutzte Standard-Restschuldformel, wobei r der Monatszins und n die Anzahl der Monate ist.",
            ru: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) — стандартная формула аннуитета банков, где r — месячная ставка, n — число месяцев.",
            it: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) — la formula standard a saldotaggio decrescente usata dalle banche, dove r è il tasso mensile e n il numero di mesi.",
            tr: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) — bankaların kullandığı standart azalan bakiye formülü; r aylık oran, n ay sayısıdır.",
            ko: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) — 은행이 쓰는 표준 원리금 균등 상환 공식입니다(r는 월 이자율, n은 개월 수).",
            ar: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) — الصيغة القياسية للرصيد المتناقص التي تستخدمها البنوك، حيث r المعدل الشهري وn عدد الأشهر.",
            hi: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) — बैंकों द्वारा उपयोग किया जाने वाला मानक घटती-शेष सूत्र, जहाँ r मासिक दर और n महीनों की संख्या है।",
            id: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) — rumus saldo menurun standar yang dipakai bank, dengan r suku bunga bulanan dan n jumlah bulan.",
            vi: "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1) — công thức dư nợ giảm dần chuẩn mà ngân hàng dùng, r là lãi suất tháng, n là số tháng.",
          })}
        </Note>
      </div>
      {isLoan && schedule.length > 0 && (
        <div className="mt-7">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.schedule)}</h3>
          <TableBox
            head={[pick(locale, S.year), pick(locale, S.prinPaid), pick(locale, S.intPaid), pick(locale, S.balance)]}
            rows={schedule.map((row) => [
              row.year,
              fmt(row.prin, locale, 0),
              fmt(row.int, locale, 0),
              fmt(row.bal, locale, 0),
            ])}
          />
        </div>
      )}
    </ToolPanel>
  );
}
