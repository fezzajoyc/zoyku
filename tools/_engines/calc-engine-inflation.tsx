"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Stats, TableBox, fmt, fmtMoney, pick } from "./calc-ui";
import { inflationAdjusted } from "../_lib/finance";
import { BalanceChart } from "./calc-charts";

/**
 * Inflation purchasing-power engine on top of finance.inflationAdjusted():
 * what the same basket costs after n years of inflation, the cumulative
 * inflation rate, what the amount buys then, and a year-by-year table.
 * props: none.
 */

const S = {
  amount: { en: "Amount", zh: "金额", ja: "金額", es: "Importe", pt: "Valor", fr: "Montant", de: "Betrag", ru: "Сумма", it: "Importo", tr: "Tutar", ko: "금액", ar: "المبلغ", hi: "राशि", id: "Jumlah", vi: "Số tiền" },
  rate: { en: "Inflation rate (%/year)", zh: "通胀率 (%/年)", ja: "インフレ率 (%/年)", es: "Inflación (%/año)", pt: "Inflação (%/ano)", fr: "Inflation (%/an)", de: "Inflation (%/Jahr)", ru: "Инфляция (%/год)", it: "Inflazione (%/anno)", tr: "Enflasyon (%/yıl)", ko: "인플레이션 (%/년)", ar: "التضخم (%/سنة)", hi: "मुद्रास्फीति (%/वर्ष)", id: "Inflasi (%/tahun)", vi: "Lạm phát (%/năm)" },
  years: { en: "Years", zh: "年数", ja: "年数", es: "Años", pt: "Anos", fr: "Années", de: "Jahre", ru: "Годы", it: "Anni", tr: "Yıl", ko: "년", ar: "السنوات", hi: "वर्ष", id: "Tahun", vi: "Số năm" },
  future: { en: "Same basket will cost", zh: "届时同一篮子价格", ja: "同じ買い物かごの価格", es: "Costará la misma cesta", pt: "A mesma cesta custará", fr: "Le même panier coûtera", de: "Gleicher Warenkorb kostet", ru: "Та же корзина будет стоить", it: "Lo stesso paniere costerà", tr: "Aynı sepetin maliyeti", ko: "같은 바구니의 가격", ar: "ستكلف السلة نفسها", hi: "उसी टोकरी की कीमत", id: "Keranjang sama akan berharga", vi: "Cùng giỏ hàng sẽ có giá" },
  cum: { en: "Cumulative inflation", zh: "累计通胀率", ja: "累計インフレ率", es: "Inflación acumulada", pt: "Inflação acumulada", fr: "Inflation cumulée", de: "Kumulierte Inflation", ru: "Кумулятивная инфляция", it: "Inflazione cumulata", tr: "Kümülatif enflasyon", ko: "누적 인플레이션", ar: "التضخم التراكمي", hi: "संचयी मुद्रास्फीति", id: "Inflasi kumulatif", vi: "Lạm phát tích lũy" },
  real: { en: "Purchasing power of the amount", zh: "这笔钱的实际购买力", ja: "この金額の実際の購買力", es: "Poder adquisitivo del importe", pt: "Poder de compra do valor", fr: "Pouvoir d'achat du montant", de: "Kaufkraft des Betrags", ru: "Покупательная способность суммы", it: "Potere d'acquisto dell'importo", tr: "Tutarın satın alma gücü", ko: "그 금액의 실제 구매력", ar: "القوة الشرائية للمبلغ", hi: "राशि की क्रय शक्ति", id: "Daya beli dari jumlah", vi: "Sức mua của số tiền" },
  year: { en: "Year", zh: "年份", ja: "年", es: "Año", pt: "Ano", fr: "Année", de: "Jahr", ru: "Год", it: "Anno", tr: "Yıl", ko: "연도", ar: "السنة", hi: "वर्ष", id: "Tahun", vi: "Năm" },
  cost: { en: "Basket cost", zh: "篮子价格", ja: "かごの価格", es: "Costo de la cesta", pt: "Custo da cesta", fr: "Coût du panier", de: "Warenkorbpries", ru: "Стоимость корзины", it: "Costo del paniere", tr: "Sepet maliyeti", ko: "바구니 가격", ar: "تكلفة السلة", hi: "टोकरी की कीमत", id: "Harga keranjang", vi: "Giá giỏ hàng" },
  value: { en: "Purchasing power", zh: "购买力", ja: "購買力", es: "Poder adquisitivo", pt: "Poder de compra", fr: "Pouvoir d'achat", de: "Kaufkraft", ru: "Покупательная способность", it: "Potere d'acquisto", tr: "Satın alma gücü", ko: "구매력", ar: "القوة الشرائية", hi: "क्रय शक्ति", id: "Daya beli", vi: "Sức mua" },
  table: { en: "Year-by-year comparison", zh: "逐年对照表", ja: "年ごとの比較", es: "Comparación año a año", pt: "Comparação ano a ano", fr: "Comparaison année par année", de: "Vergleich Jahr für Jahr", ru: "Сравнение по годам", it: "Confronto anno per anno", tr: "Yıl yıl karşılaştırma", ko: "연도별 비교", ar: "مقارنة سنة بسنة", hi: "वर्ष-दर-वर्ष तुलना", id: "Perbandingan tahun demi tahun", vi: "So sánh từng năm" },
  deflation: {
    en: "Negative rate entered — a deflation scenario: prices fall and each unit of money buys more.",
    zh: "输入为负——通缩情景:价格下降,同样多的钱能买更多东西。",
    ja: "マイナスの入力——デフレのシナリオ:物価が下がり、同じお金でより多く買えます。",
    es: "Tipo negativo introducido — escenario de deflación: los precios bajan y cada unidad de dinero compra más.",
    pt: "Taxa negativa informada — cenário de deflação: os preços caem e cada unidade de dinheiro compra mais.",
    fr: "Taux négatif saisi — scénario de déflation : les prix baissent et chaque unité de monnaie achète plus.",
    de: "Negativer Satz eingegeben — Deflationsszenario: Preise fallen, jede Geldeinheit kauft mehr.",
    ru: "Введён отрицательный показатель — сценарий дефляции: цены снижаются, и каждая денежная единица покупает больше.",
    it: "Tasso negativo inserito — scenario di deflazione: i prezzi scendono e ogni unità di denaro compra più.",
    tr: "Negatif oran girildi — deflasyon senaryosu: fiyatlar düşer ve her para birimi daha fazla alır.",
    ko: "음수 입력 — 디플레이션 시나리오: 물가가 내려가고 같은 돈으로 더 많이 살 수 있습니다.",
    ar: "تم إدخال معدل سالب — سيناريو الانكماش: تنخفض الأسعار وتشتري كل وحدة نقدية المزيد.",
    hi: "ऋणात्मक दर दर्ज — डिफ़लेशन परिदृश्य: कीमतें गिरती हैं और प्रत्येक मुद्रा इकाई अधिक खरीदती है।",
    id: "Nilai negatif dimasukkan — skenario deflasi: harga turun dan setiap unit uang membeli lebih banyak.",
    vi: "Đã nhập tỷ lệ âm — kịch bản giảm phát: giá giảm và mỗi đơn vị tiền mua được nhiều hơn.",
  },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineInflation() {
  const { locale } = useI18n();
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("3");
  const [years, setYears] = useState("10");
  const symbol = "$";

  const r = num(rate);
  const res = useMemo(() => inflationAdjusted(num(amount), r, num(years)), [amount, rate, years]);
  const deflating = Number.isFinite(r) && r < 0;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.amount)}>
          <NumIn value={amount} onChange={setAmount} aria="amount" />
        </Field>
        <Field label={pick(locale, S.rate)}>
          <NumIn value={rate} onChange={setRate} aria="inflation rate percent per year" />
        </Field>
        <Field label={pick(locale, S.years)}>
          <NumIn value={years} onChange={setYears} aria="years" />
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.future), value: fmtMoney(res.futureCost, locale, symbol), tone: "accent" },
            {
              label: pick(locale, S.cum),
              value: Number.isFinite(res.cumulativeInflationPct) ? `${fmt(res.cumulativeInflationPct, locale, 2)}%` : "—",
              tone: "good",
            },
            { label: pick(locale, S.real), value: fmtMoney(res.realValue, locale, symbol) },
          ]}
        />
      </div>

      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "A basket costing A today costs A × (1 + i)^n after n years of inflation i; (1 + i)^n − 1 is the cumulative inflation. The same amount of money then buys only what A ÷ (1 + i)^n buys today. A negative rate models deflation: prices fall and money buys more. Rates here are an example input, not a forecast.",
            zh: "今天花 A 的篮子,在通胀率 i 下 n 年后要花 A × (1 + i)^n;(1 + i)^n − 1 就是累计通胀率。届时同样多的钱只买得到今天 A ÷ (1 + i)^n 能买的东西。负值模拟通缩:价格下降,钱的购买力上升。通胀率仅为示例输入,不构成任何预测。",
            ja: "今日 A 円の買い物かごは、インフレ率 i で n 年後には A × (1 + i)^n かかります。(1 + i)^n − 1 が累計インフレ率です。同じ金額で買えるのは、今日の A ÷ (1 + i)^n 分だけです。マイナス値はデフレを表します。金利は入力例であり、予測ではありません。",
            es: "Una cesta que hoy cuesta A cuesta A × (1 + i)^n tras n años de inflación i; (1 + i)^n − 1 es la inflación acumulada. La misma cantidad de dinero entonces solo compra lo que hoy compra A ÷ (1 + i)^n. Un tipo negativo modela deflación: los precios bajan y el dinero compra más. El tipo aquí es un dato de ejemplo, no una previsión.",
            pt: "Uma cesta que hoje custa A custa A × (1 + i)^n após n anos de inflação i; (1 + i)^n − 1 é a inflação acumulada. A mesma quantia de dinheiro então compra apenas o que A ÷ (1 + i)^n compra hoje. Uma taxa negativa modela deflação: os preços caem e o dinheiro compra mais. A taxa aqui é um exemplo de entrada, não uma previsão.",
            fr: "Un panier coûtant A aujourd'hui coûte A × (1 + i)^n après n années d'inflation i ; (1 + i)^n − 1 est l'inflation cumulée. La même somme ne pourra alors acheter que ce que A ÷ (1 + i)^n achète aujourd'hui. Un taux négatif modélise la déflation : les prix baissent et la monnaie achète plus. Le taux ici est un exemple, pas une prévision.",
            de: "Ein Warenkorb, der heute A kostet, kostet nach n Jahren Inflation i A × (1 + i)^n; (1 + i)^n − 1 ist die kumulierte Inflation. Dieselbe Geldmenge kauft dann nur noch, was heute A ÷ (1 + i)^n kauft. Ein negativer Satz modelliert Deflation: Preise fallen, Geld kauft mehr. Der Satz hier ist ein Beispiel, keine Prognose.",
            ru: "Корзина, которая сегодня стоит A, через n лет инфляции i стоит A × (1 + i)^n; (1 + i)^n − 1 — кумулятивная инфляция. Тогда та же сумма денег купит лишь то, что сегодня покупает A ÷ (1 + i)^n. Отрицательный показатель моделирует дефляцию: цены падают, деньги покупают больше. Ставка здесь — пример, а не прогноз.",
            it: "Un paniere che oggi costa A costerà A × (1 + i)^n dopo n anni di inflazione i; (1 + i)^n − 1 è l'inflazione cumulata. La stessa somma di denaro comprerà solo ciò che oggi compra A ÷ (1 + i)^n. Un tasso negativo modella la deflazione: i prezzi scendono e il denaro compra più. Il tasso qui è un esempio, non una previsione.",
            tr: "Bugün A maliyetinde bir sepet, i enflasyonuyla n yıl sonra A × (1 + i)^n maliyetinde olur; (1 + i)^n − 1 kümülatif enflasyondur. Aynı para miktarı o zaman yalnızca bugün A ÷ (1 + i)^n'nin satın aldığını alır. Negatif oran deflasyonu modeller: fiyatlar düşer, para daha fazla alır. Buradaki oran örnek girdidir, tahmin değildir.",
            ko: "오늘 A인 바구니는 인플레이션 i로 n년 후 A × (1 + i)^n이 됩니다. (1 + i)^n − 1이 누적 인플레이션입니다. 같은 돈으로는 오늘 A ÷ (1 + i)^n 만큼만 살 수 있습니다. 음수는 디플레이션을 나타냅니다. 여기의 수치는 예시 입력이며 예측이 아닙니다.",
            ar: "السلة التي تكلف A اليوم تكلف A × (1 + i)^n بعد n سنة من التضخم i؛ و(1 + i)^n − 1 هو التضخم التراكمي. نفس المبلغ من المال سيشتري حينها فقط ما يشتريه A ÷ (1 + i)^n اليوم. المعدل السالب يحاكي الانكماش: تنخفض الأسعار ويشتري المال أكثر. المعدل هنا مثال توضيحي وليس توقعًا.",
            hi: "आज A की टोकरी, मुद्रास्फीति i पर n वर्षों बाद A × (1 + i)^n की होगी; (1 + i)^n − 1 संचयी मुद्रास्फीति है। उसी राशि तब उतना ही खरीद पाएगी जितना आज A ÷ (1 + i)^n खरीदता है। ऋणात्मक दर डिफ़लेशन दर्शाती है: कीमतें गिरती हैं, पैसा अधिक खरीदता है। यहाँ दर उदाहरण है, पूर्वानुमान नहीं।",
            id: "Keranjang yang hari ini berharga A akan berharga A × (1 + i)^n setelah n tahun inflasi i; (1 + i)^n − 1 adalah inflasi kumulatif. Jumlah uang yang sama nanti hanya membeli apa yang hari ini dibeli A ÷ (1 + i)^n. Nilai negatif memodelkan deflasi: harga turun dan uang membeli lebih banyak. Nilai di sini contoh input, bukan prediksi.",
            vi: "Giỏ hàng hôm nay giá A sẽ có giá A × (1 + i)^n sau n năm lạm phát i; (1 + i)^n − 1 là lạm phát tích lũy. Cùng số tiền lúc đó chỉ mua được những gì hôm nay A ÷ (1 + i)^n mua được. Giá trị âm mô phỏng giảm phát: giá giảm và tiền mua được nhiều hơn. Tỷ lệ ở đây là ví dụ, không phải dự báo.",
          })}
        </Note>
        {deflating && (
          <p className="mt-2 text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, S.deflation)}</p>
        )}
      </div>

      {Number.isFinite(res.realValue) && res.schedule.length > 1 && (
        <div className="mt-6">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.real)}</h3>
          <BalanceChart
            values={res.schedule.map((row) => row.value)}
            ariaLabel={pick(locale, S.real)}
            valueFormatter={(n) => fmtMoney(n, locale, symbol, 0)}
          />
        </div>
      )}

      {res.schedule.length > 0 && (
        <div className="mt-7">
          <h3 className="mb-3 text-[15px] font-semibold">{pick(locale, S.table)}</h3>
          <TableBox
            head={[pick(locale, S.year), pick(locale, S.cost), pick(locale, S.value)]}
            rows={res.schedule.map((row) => [
              row.year,
              fmtMoney(row.cost, locale, symbol, 2),
              fmtMoney(row.value, locale, symbol, 2),
            ])}
          />
        </div>
      )}
    </ToolPanel>
  );
}
