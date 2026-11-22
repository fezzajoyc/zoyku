"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Sel, NumIn, Note, Stats, TableBox, fmt, fmtMoney, pick } from "./calc-ui";
import { CURRENCY_LABEL, CURRENCIES, useLocaleCurrency } from "../_lib/currency";
import { retirementProjection } from "../_lib/finance";
import { DonutChart, BalanceChart } from "./calc-charts";

/**
 * Retirement savings engine on top of finance.retirementProjection():
 * monthly-compounded growth from current age to retirement age, the total
 * deflated to today's purchasing power, and the fixed monthly withdrawal
 * that empties the fund over the retirement years at the same return.
 * props: none.
 */

const S = {
  curAge: { en: "Current age", zh: "当前年龄", ja: "現在の年齢", es: "Edad actual", pt: "Idade atual", fr: "Âge actuel", de: "Aktuelles Alter", ru: "Текущий возраст", it: "Età attuale", tr: "Mevcut yaş", ko: "현재 나이", ar: "العمر الحالي", hi: "वर्तमान आयु", id: "Usia saat ini", vi: "Tuổi hiện tại" },
  retAge: { en: "Retirement age", zh: "退休年龄", ja: "退職年齢", es: "Edad de jubilación", pt: "Idade de aposentadoria", fr: "Âge de départ à la retraite", de: "Renteneintrittsalter", ru: "Возраст выхода на пенсию", it: "Età di pensionamento", tr: "Emeklilik yaşı", ko: "은퇴 나이", ar: "سن التقاعد", hi: "सेवानिवृत्ति की आयु", id: "Usia pensiun", vi: "Tuổi nghỉ hưu" },
  savings: { en: "Current savings", zh: "现有储蓄", ja: "現在の貯蓄", es: "Ahorros actuales", pt: "Poupança atual", fr: "Épargne actuelle", de: "Aktuelles Sparguthaben", ru: "Текущие накопления", it: "Risparmi attuali", tr: "Mevcut birikim", ko: "현재 저축액", ar: "المدخرات الحالية", hi: "वर्तमान बचत", id: "Tabungan saat ini", vi: "Tiết kiệm hiện tại" },
  monthly: { en: "Monthly contribution", zh: "每月存入", ja: "毎月の積立額", es: "Aporte mensual", pt: "Aporte mensal", fr: "Versement mensuel", de: "Monatliche Sparrate", ru: "Взнос в месяц", it: "Versamento mensile", tr: "Aylık katkı", ko: "월 적립액", ar: "الإيداع الشهري", hi: "मासिक योगदान", id: "Setoran bulanan", vi: "Tiền gửi mỗi tháng" },
  ret: { en: "Annual return (%)", zh: "年回报率 (%)", ja: "年間リターン (%)", es: "Rendimiento anual (%)", pt: "Retorno anual (%)", fr: "Rendement annuel (%)", de: "Jährliche Rendite (%)", ru: "Годовая доходность (%)", it: "Rendimento annuo (%)", tr: "Yıllık getiri (%)", ko: "연 수익률 (%)", ar: "العائد السنوي (%)", hi: "वार्षिक रिटर्न (%)", id: "Imbal hasil tahunan (%)", vi: "Lợi suất hàng năm (%)" },
  infl: { en: "Inflation (%/year)", zh: "通胀率 (%/年)", ja: "インフレ率 (%/年)", es: "Inflación (%/año)", pt: "Inflação (%/ano)", fr: "Inflation (%/an)", de: "Inflation (%/Jahr)", ru: "Инфляция (%/год)", it: "Inflazione (%/anno)", tr: "Enflasyon (%/yıl)", ko: "인플레이션 (%/년)", ar: "التضخم (%/سنة)", hi: "मुद्रास्फीति (%/वर्ष)", id: "Inflasi (%/tahun)", vi: "Lạm phát (%/năm)" },
  withYears: { en: "Years in retirement", zh: "退休后年限", ja: "退職後の年数", es: "Años de jubilación", pt: "Anos de aposentadoria", fr: "Années de retraite", de: "Jahre im Ruhestand", ru: "Лет на пенсии", it: "Anni di pensionamento", tr: "Emeklilik yılları", ko: "은퇴 후 기간(년)", ar: "سنوات التقاعد", hi: "सेवानिवृत्ति के वर्ष", id: "Tahun masa pensiun", vi: "Số năm nghỉ hưu" },
  nominal: { en: "Total at retirement", zh: "退休时总额", ja: "退職時の総額", es: "Total al jubilarse", pt: "Total na aposentadoria", fr: "Total à la retraite", de: "Betrag bei Renteneintritt", ru: "Сумма к моменту пенсии", it: "Totale al pensionamento", tr: "Emeklilikteki toplam", ko: "은퇴 시 총액", ar: "الإجمالي عند التقاعد", hi: "सेवानिवृत्ति पर कुल राशि", id: "Total saat pensiun", vi: "Tổng khi nghỉ hưu" },
  real: { en: "Purchasing power (today's money)", zh: "购买力(按今天的钱)", ja: "購買力(現在の価値)", es: "Poder adquisitivo (dinero actual)", pt: "Poder de compra (dinheiro de hoje)", fr: "Pouvoir d'achat (argent actuel)", de: "Kaufkraft (heutiges Geld)", ru: "Покупательная способность (в сегодняшних деньгах)", it: "Potere d'acquisto (denaro attuale)", tr: "Satın alma gücü (bugünkü para)", ko: "구매력(현재 가치)", ar: "القوة الشرائية (بأموال اليوم)", hi: "क्रय शक्ति (आज का पैसा)", id: "Daya beli (uang hari ini)", vi: "Sức mua (theo tiền hôm nay)" },
  withdraw: { en: "Monthly withdrawal (nominal)", zh: "月取款额(名义)", ja: "月々の引出額(名目)", es: "Retiro mensual (nominal)", pt: "Retirada mensal (nominal)", fr: "Retrait mensuel (nominal)", de: "Monatliche Entnahme (nominal)", ru: "Снятие в месяц (номинал)", it: "Prelievo mensile (nominale)", tr: "Aylık çekim (nominal)", ko: "월 인출액(명목)", ar: "السحب الشهري (الاسمي)", hi: "मासिक निकासी (नाममात्र)", id: "Penarikan bulanan (nominal)", vi: "Rút mỗi tháng (danh nghĩa)" },
  contributed: { en: "Total contributed", zh: "累计投入", ja: "累計拠出額", es: "Total aportado", pt: "Total aportado", fr: "Total versé", de: "Einzahlungen gesamt", ru: "Всего внесено", it: "Totale versato", tr: "Toplam katkı", ko: "총 납입액", ar: "إجمالي المساهمات", hi: "कुल योगदान", id: "Total disetor", vi: "Tổng đã đóng" },
  ageErr: {
    en: "Retirement age must be greater than the current age.",
    zh: "退休年龄必须大于当前年龄。",
    ja: "退職年齢は現在の年齢より大きくなければなりません。",
    es: "La edad de jubilación debe ser mayor que la edad actual.",
    pt: "A idade de aposentadoria deve ser maior que a idade atual.",
    fr: "L'âge de départ à la retraite doit être supérieur à l'âge actuel.",
    de: "Das Renteneintrittsalter muss über dem aktuellen Alter liegen.",
    ru: "Возраст выхода на пенсию должен быть больше текущего возраста.",
    it: "L'età di pensionamento deve essere superiore all'età attuale.",
    tr: "Emeklilik yaşı mevcut yaştan büyük olmalıdır.",
    ko: "은퇴 나이는 현재 나이보다 커야 합니다.",
    ar: "يجب أن يكون سن التقاعد أكبر من العمر الحالي.",
    hi: "सेवानिवृत्ति की आयु वर्तमान आयु से अधिक होनी चाहिए।",
    id: "Usia pensiun harus lebih besar dari usia saat ini.",
    vi: "Tuổi nghỉ hưu phải lớn hơn tuổi hiện tại.",
  },
  growth: { en: "Growth over time", zh: "积累走势", ja: "積立の推移", es: "Crecimiento en el tiempo", pt: "Crescimento ao longo do tempo", fr: "Évolution dans le temps", de: "Wachstum im Zeitverlauf", ru: "Рост с течением времени", it: "Crescita nel tempo", tr: "Zaman içindeki büyüme", ko: "시간에 따른 성장", ar: "النمو مع مرور الوقت", hi: "समय के साथ वृद्धि", id: "Pertumbuhan seiring waktu", vi: "Tăng trưởng theo thời gian" },
  compTitle: { en: "Contributions vs earnings", zh: "投入与收益", ja: "拠出と運用収益", es: "Aportes vs rendimiento", pt: "Aportes vs rendimentos", fr: "Versements et gains", de: "Einzahlungen und Ertrag", ru: "Взносы и доход", it: "Versamenti e rendimenti", tr: "Katkı ve kazanç", ko: "납입과 수익", ar: "المساهمات والأرباح", hi: "योगदान और आय", id: "Setoran dan hasil", vi: "Đóng góp và lợi nhuận" },
  contribLbl: { en: "Contributions", zh: "本金投入", ja: "拠出額", es: "Aportes", pt: "Aportes", fr: "Versements", de: "Einzahlungen", ru: "Взносы", it: "Versamenti", tr: "Katkılar", ko: "납입", ar: "المساهمات", hi: "योगदान", id: "Setoran", vi: "Khoản đóng" },
  earnLbl: { en: "Earnings", zh: "投资收益", ja: "運用収益", es: "Rendimientos", pt: "Rendimentos", fr: "Gains", de: "Ertrag", ru: "Доход", it: "Rendimenti", tr: "Kazanç", ko: "수익", ar: "الأرباح", hi: "आय", id: "Hasil", vi: "Lợi nhuận" },
  year: { en: "Year", zh: "年份", ja: "年", es: "Año", pt: "Ano", fr: "Année", de: "Jahr", ru: "Год", it: "Anno", tr: "Yıl", ko: "연도", ar: "السنة", hi: "वर्ष", id: "Tahun", vi: "Năm" },
  balance: { en: "Balance", zh: "余额", ja: "残高", es: "Saldo", pt: "Saldo", fr: "Solde", de: "Guthaben", ru: "Баланс", it: "Saldo", tr: "Bakiye", ko: "잔액", ar: "الرصيد", hi: "शेष", id: "Saldo", vi: "Số dư" },
  schedule: { en: "Yearly accumulation schedule", zh: "逐年积累表", ja: "年次積立スケジュール", es: "Tabla de acumulación anual", pt: "Tabela de acumulação anual", fr: "Tableau d'accumulation annuel", de: "Jährlicher Ansparplan", ru: "Годовой график накоплений", it: "Piano di accumulazione annuo", tr: "Yıllık birikim planı", ko: "연간 적립 일정", ar: "جدول التراكم السنوي", hi: "वार्षिक संचय तालिका", id: "Jadwal akumulasi tahunan", vi: "Lịch tích lũy hằng năm" },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineRetirement() {
  const { locale } = useI18n();
  const { currency, setCurrency, cur } = useLocaleCurrency(locale);
  const [curAge, setCurAge] = useState("35");
  const [retAge, setRetAge] = useState("65");
  const [savings, setSavings] = useState("50000");
  const [monthly, setMonthly] = useState("500");
  const [ret, setRet] = useState("6");
  const [infl, setInfl] = useState("2.5");
  const [withYears, setWithYears] = useState("20");
  const symbol = cur.symbol;

  const a = num(curAge);
  const b = num(retAge);
  const res = useMemo(
    () => retirementProjection(a, b, num(savings), num(monthly), num(ret), num(infl), num(withYears)),
    [a, b, savings, monthly, ret, infl, withYears],
  );
  const ageInvalid = Number.isFinite(a) && Number.isFinite(b) && b <= a;
  const earnings = Number.isFinite(res.nominalTotal) && Number.isFinite(res.contributed)
    ? res.nominalTotal - res.contributed
    : NaN;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.curAge)}>
          <NumIn value={curAge} onChange={setCurAge} aria="current age" />
        </Field>
        <Field label={pick(locale, S.retAge)}>
          <NumIn value={retAge} onChange={setRetAge} aria="retirement age" />
        </Field>
        <Field label={pick(locale, S.savings)}>
          <NumIn value={savings} onChange={setSavings} aria="current savings" />
        </Field>
        <Field label={pick(locale, S.monthly)}>
          <NumIn value={monthly} onChange={setMonthly} aria="monthly contribution" />
        </Field>
        <Field label={pick(locale, S.ret)}>
          <NumIn value={ret} onChange={setRet} aria="annual return percent" />
        </Field>
        <Field label={pick(locale, S.infl)}>
          <NumIn value={infl} onChange={setInfl} aria="inflation percent per year" />
        </Field>
        <Field label={pick(locale, S.withYears)}>
          <NumIn value={withYears} onChange={setWithYears} aria="years in retirement" />
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
            { label: pick(locale, S.nominal), value: fmtMoney(res.nominalTotal, locale, symbol), tone: "accent" },
            { label: pick(locale, S.real), value: fmtMoney(res.realTotal, locale, symbol), tone: "good" },
            { label: pick(locale, S.withdraw), value: fmtMoney(res.monthlyWithdrawal, locale, symbol) },
            { label: pick(locale, S.contributed), value: fmtMoney(res.contributed, locale, symbol) },
          ]}
        />
      </div>

      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "Savings grow with monthly compounding, each month's contribution added at the start of the month. Purchasing power divides the total by (1 + inflation)^years. The monthly withdrawal is the fixed amount that, with the same assumed return continuing into retirement, exactly empties the fund over the retirement years. The return and inflation rates are example inputs, not forecasts.",
            zh: "储蓄按月复利增长,每期投入在当期月初计入。购买力 = 总额 ÷ (1 + 通胀率)^年数。月取款额是假设退休后按同一回报率继续增值时、恰好把余额在退休年限内取完的固定月付。回报率与通胀率仅为示例输入,不构成任何预测。",
            ja: "貯蓄は月複利で増え、毎月の積立額は月初に計上されます。購買力 = 総額 ÷ (1 + インフレ率)^年数。月々の引出額は、退職後も同じリターンが続くと仮定して、退職後の年数でちょうど使い切る一定額です。リターンとインフレ率は入力例であり、予測ではありません。",
            es: "Los ahorros crecen con capitalización mensual, añadiendo el aporte de cada mes al inicio del mes. El poder adquisitivo divide el total por (1 + inflación)^años. El retiro mensual es el importe fijo que, con el mismo rendimiento supuesto continuando en la jubilación, agota exactamente el fondo en los años de jubilación. El rendimiento y la inflación son datos de ejemplo, no previsiones.",
            pt: "A poupança cresce com capitalização mensal, com o aporte de cada mês registrado no início do mês. O poder de compra divide o total por (1 + inflação)^anos. A retirada mensal é o valor fixo que, com o mesmo retorno pressuposto continuando na aposentadoria, esvazia exatamente o fundo nos anos de aposentadoria. Retorno e inflação são exemplos de entrada, não previsões.",
            fr: "L'épargne croît avec capitalisation mensuelle, chaque versement étant ajouté en début de mois. Le pouvoir d'achat divise le total par (1 + inflation)^années. Le retrait mensuel est le montant fixe qui, avec le même rendement supposé poursuivi à la retraite, vide exactement le fonds sur les années de retraite. Rendement et inflation sont des exemples, pas des prévisions.",
            de: "Das Sparguthaben wächst mit monatlicher Verzinsung, jede Monatsrate wird am Monatsanfang verrechnet. Die Kaufkraft teilt den Gesamtbetrag durch (1 + Inflation)^Jahre. Die monatliche Entnahme ist der feste Betrag, der den Fonds bei fortgesetzter gleicher Rendite über die Ruhestandsjahre genau aufbraucht. Rendite und Inflation sind Beispielwerte, keine Prognosen.",
            ru: "Накопления растут с ежемесячной капитализацией, взнос добавляется в начале месяца. Покупательная способность = сумма ÷ (1 + инфляция)^годы. Ежемесячное снятие — фиксированная сумма, которая при той же предполагаемой доходности в пенсионный период исчерпывает фонд ровно за годы пенсии. Доходность и инфляция — примеры, а не прогнозы.",
            it: "I risparmi crescono con capitalizzazione mensile, il versamento di ogni mese è accreditato a inizio mese. Il potere d'acquisto divide il totale per (1 + inflazione)^anni. Il prelievo mensile è l'importo fisso che, con lo stesso rendimento ipotizzato proseguito in pensione, esaurisce esattamente il fondo negli anni di pensionamento. Rendimento e inflazione sono esempi, non previsioni.",
            tr: "Birikim aylık bileşik büyür, her ayın katkısı ayın başında hesaba katılır. Satın alma gücü = toplam ÷ (1 + enflasyon)^yıl. Aylık çekim, emeklilikte aynı getirisinin sürdürüldüğü varsayımıyla fondun emeklilik yılları boyunca tamamen tükenmesini sağlayan sabit tutardır. Getiri ve enflasyon örnek girdidir, tahmin değildir.",
            ko: "저축은 월복리로 늘어나며 매월 적립액은 월초에 계상됩니다. 구매력 = 총액 ÷ (1 + 인플레이션)^연수. 월 인출액은 은퇴 후에도 같은 수익률이 유지된다고 가정할 때 은퇴 기간 동안 정확히 다 쓰는 고정액입니다. 수익률과 인플레이션은 예시 입력이며 예측이 아닙니다.",
            ar: "تنمو المدخرات بتركيب شهري، ويُضاف إيداع كل شهر في بداية الشهر. القوة الشرائية = الإجمالي ÷ (1 + التضخم)^السنوات. السحب الشهري هو المبلغ الثابت الذي، مع افتراض استمرار نفس العائد بعد التقاعد، يستنزف الصندوق تمامًا خلال سنوات التقاعد. العائد والتضخم أمثلة توضيحية وليست توقعات.",
            hi: "बचत मासिक चक्रवृद्धि से बढ़ती है, हर महीने का योगदान महीने की शुरुआत में जोड़ा जाता है। क्रय शक्ति = कुल ÷ (1 + मुद्रास्फीति)^वर्ष। मासिक निकासी वह स्थिर राशि है जो सेवानिवृत्ति में भी उसी मानी हुई रिटर्न के साथ, सेवानिवृत्ति के वर्षों में कोष को ठीक-ठीक समाप्त कर देती है। रिटर्न और मुद्रास्फीति उदाहरण हैं, पूर्वानुमान नहीं।",
            id: "Tabungan tumbuh dengan bunga majemuk bulanan, setoran tiap bulan dicatat di awal bulan. Daya beli = total ÷ (1 + inflasi)^tahun. Penarikan bulanan adalah jumlah tetap yang, dengan asumsi imbal hasil yang sama berlanjut saat pensiun, menghabiskan dana tepat selama tahun-tahun pensiun. Imbal hasil dan inflasi adalah contoh input, bukan prediksi.",
            vi: "Tiết kiệm tăng theo lãi kép hàng tháng, khoản gửi mỗi tháng được tính vào đầu tháng. Sức mua = tổng ÷ (1 + lạm phát)^số năm. Khoản rút hàng tháng là số tiền cố định mà, với giả định lợi suất như vậy tiếp tục sau nghỉ hưu, dùng cạn quỹ đúng trong số năm nghỉ hưu. Lợi suất và lạm phát chỉ là ví dụ, không phải dự báo.",
          })}
        </Note>
        {ageInvalid && (
          <p className="mt-2 text-[13px] leading-5 text-[var(--color-bad)]">{pick(locale, S.ageErr)}</p>
        )}
      </div>

      {Number.isFinite(res.nominalTotal) && res.nominalTotal > 0 && Number.isFinite(earnings) && earnings > 0 && (
        <div className="mt-5">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.compTitle)}</h3>
          <DonutChart
            slices={[
              { label: pick(locale, S.contribLbl), value: res.contributed, color: "var(--color-accent)" },
              { label: pick(locale, S.earnLbl), value: earnings, color: "var(--color-good)" },
            ]}
            centerTitle={pick(locale, S.nominal)}
            centerValue={fmtMoney(res.nominalTotal, locale, symbol, 0)}
            ariaLabel={pick(locale, S.compTitle)}
          />
        </div>
      )}

      {Number.isFinite(res.nominalTotal) && res.schedule.length > 1 && (
        <div className="mt-6">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.growth)}</h3>
          <BalanceChart
            values={res.schedule.map((r) => r.balance)}
            ariaLabel={pick(locale, S.growth)}
            valueFormatter={(n) => fmtMoney(n, locale, symbol, 0)}
          />
        </div>
      )}

      {res.schedule.length > 0 && (
        <div className="mt-7">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.schedule)}</h3>
          <TableBox
            head={[pick(locale, S.year), pick(locale, S.contributed), pick(locale, S.earnLbl), pick(locale, S.balance)]}
            rows={res.schedule.map((row) => [
              row.year,
              fmtMoney(row.contrib, locale, symbol, 0),
              fmtMoney(row.interest, locale, symbol, 0),
              fmtMoney(row.balance, locale, symbol, 0),
            ])}
          />
        </div>
      )}
    </ToolPanel>
  );
}
