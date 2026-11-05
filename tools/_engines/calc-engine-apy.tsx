"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, Tabs, fmt, fmtMoney, pick } from "./calc-ui";
import { apy, apyBalance, aprFromApy, type CompoundingFreq } from "../_lib/finance";

/**
 * APR ↔ APY 引擎:名义年利率与实际年利率(考虑复利频率)互转,
 * 可选本金 + 年数给出按 APY 增长后的余额。
 * 纯数学在 tools/_lib/finance.ts:apy() / aprFromApy() / apyBalance()。
 */

const S = {
  aprRate: { en: "Nominal rate (APR %)", zh: "名义年利率(APR %)", ja: "名目金利(APR %)", es: "Tasa nominal (APR %)", pt: "Taxa nominal (APR %)", fr: "Taux nominal (TAEG %)", de: "Nominalzins (APR %)", ru: "Номинальная ставка (APR %)", it: "Tasso nominale (APR %)", tr: "Nominal oran (APR %)", ko: "명목 이자율(APR %)", ar: "المعدل الاسمي (APR %)", hi: "नाममात्र दर (APR %)", id: "Suku bunga nominal (APR %)", vi: "Lãi suất danh nghĩa (APR %)" },
  apyRate: { en: "Effective rate (APY %)", zh: "实际年利率(APY %)", ja: "実質年利(APY %)", es: "Tasa efectiva (APY %)", pt: "Taxa efetiva (APY %)", fr: "Taux effectif (APY %)", de: "Effektivzins (APY %)", ru: "Эффективная ставка (APY %)", it: "Tasso effettivo (APY %)", tr: "Efektif oran (APY %)", ko: "실효 이자율(APY %)", ar: "المعدل الفعلي (APY %)", hi: "प्रभावी दर (APY %)", id: "Suku bunga efektif (APY %)", vi: "Lãi suất thực (APY %)" },
  freq: { en: "Compounding", zh: "复利频率", ja: "複利の頻度", es: "Capitalización", pt: "Capitalização", fr: "Capitalisation", de: "Zinseszins", ru: "Капитализация", it: "Capitalizzazione", tr: "Bileşik dönem", ko: "복리 주기", ar: "التكرار المركب", hi: "चक्रवृद्धि आवृत्ति", id: "Pembungaan", vi: "Kỳ ghép lãi" },
  principal: { en: "Deposit (optional)", zh: "本金(可选)", ja: "元本(任意)", es: "Depósito (opcional)", pt: "Depósito (opcional)", fr: "Dépôt (facultatif)", de: "Einzahlung (optional)", ru: "Вклад (необяз.)", it: "Deposito (facoltativo)", tr: "Yatırım (isteğe bağlı)", ko: "예치금(선택)", ar: "الإيداع (اختياري)", hi: "जमा (वैकल्पिक)", id: "Setoran (opsional)", vi: "Tiền gửi (không bắt buộc)" },
  years: { en: "Years", zh: "年数", ja: "年数", es: "Años", pt: "Anos", fr: "ans", de: "Jahre", ru: "лет", it: "anni", tr: "yıl", ko: "년", ar: "سنوات", hi: "वर्ष", id: "tahun", vi: "năm" },
  apyOut: { en: "APY — effective annual yield", zh: "APY —— 实际年化收益", ja: "APY — 実質年利回り", es: "APY — rendimiento anual efectivo", pt: "APY — rendimento anual efetivo", fr: "APY — rendement annuel effectif", de: "APY — effektiver Jahresertrag", ru: "APY — эффективная годовая доходность", it: "APY — rendimento annuo effettivo", tr: "APY — efektif yıllık getiri", ko: "APY — 실효 연수익률", ar: "APY — العائد السنوي الفعلي", hi: "APY — प्रभावी वार्षिक आय", id: "APY — imbal hasil tahunan efektif", vi: "APY — lợi suất năm thực" },
  aprOut: { en: "APR — equivalent nominal rate", zh: "APR —— 对应名义利率", ja: "APR — 対応する名目金利", es: "APR — tasa nominal equivalente", pt: "APR — taxa nominal equivalente", fr: "APR — taux nominal équivalent", de: "APR — äquivalenter Nominalzins", ru: "APR — эквивалентная номинальная ставка", it: "APR — tasso nominale equivalente", tr: "APR — eşdeğer nominal oran", ko: "APR — 동등 명목 이자율", ar: "APR — المعدل الاسمي المكافئ", hi: "APR — समतुल्य नाममात्र दर", id: "APR — suku bunga nominal setara", vi: "APR — lãi suất danh nghĩa tương đương" },
  balance: { en: "Balance after {y} years", zh: "{y} 年后余额", ja: "{y} 年後の残高", es: "Saldo tras {y} años", pt: "Saldo após {y} anos", fr: "Solde après {y} ans", de: "Guthaben nach {y} Jahren", ru: "Баланс через {y} лет", it: "Saldo dopo {y} anni", tr: "{y} yıl sonra bakiye", ko: "{y}년 후 잔액", ar: "الرصيد بعد {y} سنة", hi: "{y} वर्ष बाद शेष", id: "Saldo setelah {y} tahun", vi: "Số dư sau {y} năm" },
  interest: { en: "Interest earned", zh: "累计利息", ja: "受取利息", es: "Intereses ganados", pt: "Juros ganados", fr: "Intérêts gagnés", de: "Erhaltene Zinsen", ru: "Начисленные проценты", it: "Interessi maturati", tr: "Kazanılan faiz", ko: "받은 이자", ar: "الفائدة المكتسبة", hi: "अर्जित ब्याज", id: "Bunga diperoleh", vi: "Tiền lãi nhận được" },
  modeApr: { en: "APR → APY", zh: "APR → APY", ja: "APR → APY", es: "APR → APY", pt: "APR → APY", fr: "APR → APY", de: "APR → APY", ru: "APR → APY", it: "APR → APY", tr: "APR → APY", ko: "APR → APY", ar: "APR → APY", hi: "APR → APY", id: "APR → APY", vi: "APR → APY" },
  modeApy: { en: "APY → APR", zh: "APY → APR", ja: "APY → APR", es: "APY → APR", pt: "APY → APR", fr: "APY → APR", de: "APY → APR", ru: "APY → APR", it: "APY → APR", tr: "APY → APR", ko: "APY → APR", ar: "APY → APR", hi: "APY → APR", id: "APY → APR", vi: "APY → APR" },
  daily: { en: "Daily (365)", zh: "每日(365 期)", ja: "毎日(365 回)", es: "Diaria (365)", pt: "Diária (365)", fr: "Quotidien (365)", de: "Täglich (365)", ru: "Ежедневно (365)", it: "Giornaliera (365)", tr: "Günlük (365)", ko: "매일(365)", ar: "يوميًا (365)", hi: "दैनिक (365)", id: "Harian (365)", vi: "Hằng ngày (365)" },
  monthly: { en: "Monthly (12)", zh: "每月(12 期)", ja: "毎月(12 回)", es: "Mensual (12)", pt: "Mensal (12)", fr: "Mensuel (12)", de: "Monatlich (12)", ru: "Ежемесячно (12)", it: "Mensile (12)", tr: "Aylık (12)", ko: "매월(12)", ar: "شهريًا (12)", hi: "मासिक (12)", id: "Bulanan (12)", vi: "Hằng tháng (12)" },
  quarterly: { en: "Quarterly (4)", zh: "每季度(4 期)", ja: "四半期ごと(4 回)", es: "Trimestral (4)", pt: "Trimestral (4)", fr: "Trimestriel (4)", de: "Quartalsweise (4)", ru: "Ежеквартально (4)", it: "Trimestrale (4)", tr: "Üç aylık (4)", ko: "분기(4)", ar: "ربع سنوي (4)", hi: "त्रैमासिक (4)", id: "Kuartalan (4)", vi: "Hằng quý (4)" },
  annually: { en: "Annually (1)", zh: "每年(1 期)", ja: "毎年(1 回)", es: "Anual (1)", pt: "Anual (1)", fr: "Annuel (1)", de: "Jährlich (1)", ru: "Ежегодно (1)", it: "Annuale (1)", tr: "Yıllık (1)", ko: "매년(1)", ar: "سنويًا (1)", hi: "वार्षिक (1)", id: "Tahunan (1)", vi: "Hằng năm (1)" },
  note: {
    en: "APY = (1 + r ÷ n)^n − 1, with r the nominal APR and n the compounding periods per year. For any nominal rate above zero, APY is strictly greater than APR whenever money compounds more than once a year — 12% nominal compounded monthly is 12.6825% effective — and the gap widens with frequency (daily here uses 365 periods). Savings ads quote APY because it is the rate your money actually grows at; loans quote APR.",
    zh: "APY = (1 + r ÷ n)ⁿ − 1,其中 r 是名义 APR,n 是每年复利期数。只要名义利率大于 0 且复利次数多于每年一次,APY 就严格大于 APR——12% 名义月复利的实际年化是 12.6825%——而且频率越高差距越大(此处每日按 365 期计)。存款广告报 APY,因为那才是你的钱实际增长的速度;贷款侧则报 APR。",
    ja: "APY = (1 + r ÷ n)ⁿ − 1(r は名目 APR、n は年間の複利回数)。名目金利が 0 より大きく年 1 回より頻繁に複利がつくとき、APY は必ず APR を上回ります。名目 12% を月複利にすると実質 12.6825% で、頻度が高いほど差は広がります(ここでは日複利を 365 回として計算)。預金の広告が APY を示すのは、それが実際の増加速度だからです。ローンは APR で表示されます。",
    es: "APY = (1 + r ÷ n)^n − 1, donde r es el APR nominal y n los periodos de capitalización al año. Para cualquier tasa nominal positiva, el APY es estrictamente mayor que el APR siempre que el dinero capitalice más de una vez al año — un 12% nominal mensual es un 12,6825% efectivo — y la diferencia crece con la frecuencia (aquí lo diario usa 365 periodos). Los depósitos se anuncian con APY porque es lo que tu dinero realmente rinde; los préstamos usan APR.",
    pt: "APY = (1 + r ÷ n)^n − 1, em que r é o APR nominal e n os períodos de capitalização por ano. Para qualquer taxa nominal positiva, o APY é estritamente maior que o APR sempre que o dinheiro render mais de uma vez ao ano — 12% nominal mensal dá 12,6825% efetivo — e a diferença cresce com a frequência (aqui o diário usa 365 períodos). Depósitos são anunciados em APY porque é o que o dinheiro rende de fato; empréstimos usam APR.",
    fr: "Les deux formules sont des estimations à partir de séries sous-maximales. Elles concordent le mieux entre 4 et 10 reps ; au-delà, l'Epley surestime. Testez la charge réelle avant une compétition.",
    de: "Beide Formeln sind Schätzungen aus submaximalen Sätzen. Sie stimmen im 4–10-Wdh.-Bereich am besten überein; darüber überschätzt Epley. Teste das echte Gewicht vor dem Wettkampf.",
    ru: "Обе формулы — оценки из субмаксимальных подходов. Лучше всего совпадают в диапазоне 4–10 повторений; выше Epley завышает. Проверьте реальный вес перед соревнованием.",
    it: "Entrambe le formule sono stime da serie submassimali. Concordano meglio tra 4 e 10 ripetizioni; oltre, Epley sovrastima. Prova il peso reale prima della gara.",
    tr: "Her iki formül de submaksimal setlerden tahmindir. 4–10 tekrar aralığında en iyi örtüşürler; üzerinde Epley yukarı tahmin eder. Yarışmadan önce gerçek ağırlığı test edin.",
    ko: "두 공식 모두 최대 이하 세트 기반 추정치입니다. 4–10회 범위에서 가장 잘 일치하며, 그 이상에서는 Epley가 높게 나옵니다. 대회 전 실제 중량을 확인하세요.",
    ar: "كلتا الصيغتين تقديران من مجموعات دون الأقصى. تتطابقان أفضل في نطاق 4–10 تكرارات؛ وفوق ذلك يبالف Epley في التقدير. اختبر الوزن الحقيقي قبل المنافسة.",
    hi: "दोनों सूत्र उप-अधिकतम सेट से अनुमान हैं। 4–10 रेप्स पर सबसे मेल खाते हैं; उससे ऊपर Epley अधिक बताता है। प्रतियोगिता से पहले असली वज़न आज़माएँ।",
    id: "Kedua rumus adalah estimasi dari set submaksimal. Paling cocok pada rentang 4–10 repetisi; di atasnya Epley melebihkan. Uji beban nyata sebelum kompetisi.",
    vi: "Cả hai công thức đều là ước lượng từ set dưới tối đa. Khớp nhất ở khoảng 4–10 rep; trên đó Epley ước cao hơn. Hãy thử tải trọng thật trước khi thi đấu.",
  },
};

function num(s: string): number {
  const t = s.trim();
  if (t === "") return NaN;
  const n = Number(t.replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineApy() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("apr2apy");
  const [rate, setRate] = useState("12");
  const [freq, setFreq] = useState<CompoundingFreq>("monthly");
  const [principal, setPrincipal] = useState("10000");
  const [years, setYears] = useState("5");

  const r = num(rate);
  const p = num(principal);
  const y = num(years);

  // 双向换算共用一个 rate 框:APR→APY 正算,APY→APR 反推(往返一致)
  const effective = useMemo(
    () => (mode === "apr2apy" ? apy(r, freq) : aprFromApy(r, freq)),
    [mode, r, freq],
  );
  const apyPct = mode === "apr2apy" ? effective : r;
  const balance = useMemo(() => apyBalance(p, apyPct, y), [p, apyPct, y]);
  const hasBalance = Number.isFinite(balance) && p > 0;

  const money = (n: number) => fmtMoney(n, locale, "$");
  const pct = (v: number) => (Number.isFinite(v) ? `${fmt(v, locale, 4)}%` : "—");
  const yearsLabel = pick(locale, S.balance).replace("{y}", fmt(y, locale, 1));

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "apr2apy", label: pick(locale, S.modeApr) },
          { id: "apy2apr", label: pick(locale, S.modeApy) },
        ]}
        value={mode}
        onChange={(id) => setMode(id)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={mode === "apr2apy" ? pick(locale, S.aprRate) : pick(locale, S.apyRate)}>
          <NumIn value={rate} onChange={setRate} aria="interest rate percent" />
        </Field>
        <Field label={pick(locale, S.freq)}>
          <Sel value={freq} onChange={(v) => setFreq(v as CompoundingFreq)} aria="compounding frequency">
            <option value="daily">{pick(locale, S.daily)}</option>
            <option value="monthly">{pick(locale, S.monthly)}</option>
            <option value="quarterly">{pick(locale, S.quarterly)}</option>
            <option value="annually">{pick(locale, S.annually)}</option>
          </Sel>
        </Field>
        <Field label={pick(locale, S.principal)}>
          <NumIn value={principal} onChange={setPrincipal} aria="optional deposit" placeholder="0" />
        </Field>
        <Field label={pick(locale, S.years)}>
          <NumIn value={years} onChange={setYears} aria="years" />
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            {
              label: mode === "apr2apy" ? pick(locale, S.apyOut) : pick(locale, S.aprOut),
              value: pct(effective),
              tone: "accent",
            },
            { label: mode === "apr2apy" ? pick(locale, S.aprRate) : pick(locale, S.apyRate), value: pct(r) },
            { label: yearsLabel, value: hasBalance ? money(balance) : "—" },
            { label: pick(locale, S.interest), value: hasBalance ? money(balance - p) : "—" },
          ]}
          cols="sm:grid-cols-2"
        />
      </div>

      <div className="mt-3">
        <Note>{pick(locale, S.note)}</Note>
      </div>
    </ToolPanel>
  );
}
