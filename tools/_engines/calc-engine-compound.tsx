"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, TableBox, fmtMoney, pick } from "./calc-ui";
import { compound, type Freq } from "../_lib/finance";
import { DonutChart, BalanceChart, chartText } from "./calc-charts";

/**
 * Compound interest with regular monthly contributions.
 * Periodic rate r = annual / periods_per_year; per period the contributions
 * made during that period are deposited first, then interest accrues:
 *   FV ← (FV + contribution_per_period) × (1 + r)
 * Deposits land at the start of each period (annuity-due), which is what the
 * recursion above says — stated honestly in the FAQ.
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
  const [currency, setCurrency] = useState("USD");

  const p = num(principal);
  const c = num(monthly);
  const annual = num(rate);
  const y = num(years);
  const cur = CURRENCIES[currency] ?? CURRENCIES.USD;
  const money = (n: number) => fmtMoney(n, locale, cur.symbol, cur.frac);

  const { total, contributed, schedule } = useMemo(
    () => compound(p, c, annual, y, freq),
    [p, c, annual, y, freq],
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
          {pick(locale, {
            en: "Each period the balance grows as FV ← (FV + contribution) × (1 + r), with r = annual rate ÷ periods per year (12 / 4 / 1). Contributions are deposited at the start of each period, so each one earns interest from that period on.",
            zh: "每期余额按 FV ← (FV + 投入) × (1 + r) 递推,其中 r = 年利率 ÷ 每年期数(12 / 4 / 1)。投入在每期期初存入,因此从当期起就开始产生利息。",
            ja: "各期の残高は FV ← (FV + 積立額) × (1 + r) で計算します。r は年利 ÷ 年間の期数(12 / 4 / 1)です。積立は各期の初めに預け入れられるため、当期から利息がつきます。",
            es: "En cada periodo el saldo crece como FV ← (FV + aporte) × (1 + r), con r = tasa anual ÷ periodos por año (12 / 4 / 1). Los aportes se depositan al inicio de cada periodo, así que generan intereses desde ese periodo.",
            pt: "A cada período o saldo cresce como FV ← (FV + aporte) × (1 + r), com r = taxa anual ÷ períodos por ano (12 / 4 / 1). Os aportes entram no início de cada período, então rendem desde esse período.",
            fr: "À chaque période, le solde croît selon FV ← (FV + versement) × (1 + r), avec r = taux annuel ÷ périodes par an (12 / 4 / 1). Les versements sont déposés en début de période et rapportent donc dès cette période.",
            de: "Pro Periode wächst das Guthaben als FV ← (FV + Einzahlung) × (1 + r), mit r = Jahreszins ÷ Perioden pro Jahr (12 / 4 / 1). Einzahlungen erfolgen zu Periodenbeginn und verzinsen sich ab dieser Periode.",
            ru: "Каждый период баланс растёт как FV ← (FV + взнос) × (1 + r), где r = годовая ставка ÷ периодов в год (12 / 4 / 1). Взносы вносятся в начале периода и приносят проценты с этого периода.",
            it: "A ogni periodo il saldo cresce come FV ← (FV + versamento) × (1 + r), con r = tasso annuo ÷ periodi all'anno (12 / 4 / 1). I versamenti sono depositati all'inizio del periodo e maturano interessi da quel periodo.",
            tr: "Her dönem bakiye FV ← (FV + katkı) × (1 + r) olarak büyür; r = yıllık oran ÷ yıllık dönem (12 / 4 / 1). Katkılar dönemin başında yatırılır ve o dönemden itibaren faiz kazanır.",
            ko: "각 기기마다 잔액은 FV ← (FV + 납입액) × (1 + r)로 증가합니다(r = 연 이자율 ÷ 연간 기기 수, 12/4/1). 납입액은 기기 시작 시 입금되어 해당 기기부터 이자가 붙습니다.",
            ar: "في كل فترة ينمو الرصيد كـ FV ← (FV + المساهمة) × (1 + r)، حيث r = المعدل السنوي ÷ الفترات في السنة (12 / 4 / 1). تُودع المساهمات في بداية كل فترة فتكتسب الفائدة من تلك الفترة.",
            hi: "हर अवधि में शेष FV ← (FV + योगदान) × (1 + r) से बढ़ता है, r = वार्षिक दर ÷ वार्षिक अवधियाँ (12 / 4 / 1)। योगदान प्रत्येक अवधि के आरंभ में जमा होते हैं, इसलिए उस अवधि से ब्याज अर्जित करते हैं।",
            id: "Setiap periode saldo bertumbuh sebagai FV ← (FV + kontribusi) × (1 + r), dengan r = suku bunga tahunan ÷ periode per tahun (12 / 4 / 1). Kontribusi disetor di awal periode sehingga berbunga sejak periode itu.",
            vi: "Mỗi kỳ số dư tăng theo FV ← (FV + khoản nộp) × (1 + r), với r = lãi suất năm ÷ số kỳ mỗi năm (12 / 4 / 1). Khoản nộp được gửi đầu kỳ nên sinh lãi từ kỳ đó.",
          })}
        </Note>
      </div>

      {Number.isFinite(total) && interest > 0 && contributed > 0 && (
        <div className="mt-5">
          <h3 className="mb-3 text-[15px] font-semibold">{chartText(locale, "composition")}</h3>
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
          <h3 className="mb-3 text-[15px] font-semibold">{chartText(locale, "balanceCurve")}</h3>
          <BalanceChart
            values={schedule.map((r) => r.balance)}
            ariaLabel={chartText(locale, "balanceCurve")}
            valueFormatter={(n) => money(n)}
          />
        </div>
      )}

      {schedule.length > 0 && (
        <div className="mt-7">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.table)}</h3>
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
