"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, Sel, Stats, TableBox, fmt, pick } from "./calc-ui";
import { oneRepMax, ormTable } from "../_lib/pace";

/**
 * 单次最大重量(1RM)引擎:Epley 主估 + Brzycki 对照,
 * 附 1–12 次重复的训练表(重量 + 占 1RM 百分比)。数学在 tools/_lib/pace.ts。
 */

const S = {
  weight: { en: "Weight lifted", zh: "重量", ja: "重量", es: "Peso levantado", pt: "Peso levantado", fr: "Poids soulevé", de: "Gewicht", ru: "Поднятый вес", it: "Peso sollevato", tr: "Kaldırılan ağırlık", ko: "들어올린 무게", ar: "الوزن المرفوع", hi: "उठाया गया वज़न", id: "Beban yang diangkat", vi: "Khối lượng tập" },
  unit: { en: "Unit", zh: "单位", ja: "単位", es: "Unidad", pt: "Unidade", fr: "Unité", de: "Einheit", ru: "Единица", it: "Unità", tr: "Birim", ko: "단위", ar: "الوحدة", hi: "इकाई", id: "Satuan", vi: "Đơn vị" },
  reps: { en: "Repetitions", zh: "重复次数", ja: "レップ数", es: "Repeticiones", pt: "Repetições", fr: "Répétitions", de: "Wiederholungen", ru: "Повторения", it: "Ripetizioni", tr: "Tekrar", ko: "반복 횟수", ar: "التكرارات", hi: "दोहराव", id: "Pengulangan", vi: "Số lần lặp" },
  epley: { en: "1RM — Epley", zh: "1RM — Epley 公式", ja: "1RM — Epley", es: "1RM — Epley", pt: "1RM — Epley", fr: "1RM — Epley", de: "1RM — Epley", ru: "1ПМ — Эпли", it: "1RM — Epley", tr: "1TM — Epley", ko: "1RM — Epley", ar: "1RM — إبلي", hi: "1RM — एप्ले", id: "1RM — Epley", vi: "1RM — Epley" },
  brzycki: { en: "1RM — Brzycki", zh: "1RM — Brzycki 公式", ja: "1RM — Brzycki", es: "1RM — Brzycki", pt: "1RM — Brzycki", fr: "1RM — Brzycki", de: "1RM — Brzycki", ru: "1ПМ — Бжицки", it: "1RM — Brzycki", tr: "1TM — Brzycki", ko: "1RM — Brzycki", ar: "1RM — برزيتسكي", hi: "1RM — ब्रज़िकी", id: "1RM — Brzycki", vi: "1RM — Brzycki" },
  tableReps: { en: "Reps", zh: "次数", ja: "レップ", es: "Reps", pt: "Reps", fr: "Reps", de: "Wiederholungen", ru: "Повторы", it: "Reps", tr: "Tekrar", ko: "횟수", ar: "التكرارات", hi: "रेप्स", id: "Reps", vi: "Số rep" },
  tableWeight: { en: "Max weight", zh: "最大重量", ja: "最大重量", es: "Peso máx.", pt: "Peso máx.", fr: "Poids max", de: "Maximalgewicht", ru: "Максимальный вес", it: "Peso massimo", tr: "Maksimum ağırlık", ko: "최대 무게", ar: "الوزن الأقصى", hi: "अधिकतम वज़न", id: "Beban maks", vi: "Khối lượng tối đa" },
  tablePct: { en: "% of 1RM", zh: "占 1RM", ja: "1RM に対する割合", es: "% de 1RM", pt: "% de 1RM", fr: "% du 1RM", de: "% des 1RM", ru: "% от 1ПМ", it: "% del 1RM", tr: "1TM'nin %'si", ko: "1RM의 %", ar: "% من 1RM", hi: "1RM का %", id: "% dari 1RM", vi: "% của 1RM" },
  invalid: {
    en: "Enter a weight greater than zero and a whole number of reps between 1 and 20.",
    zh: "请输入大于 0 的重量,以及 1–20 之间的整数次数。",
    ja: "0 より大きい重量と 1〜20 の整数レップを入力してください。",
    es: "Introduzca un peso mayor que cero y un número entero de repeticiones entre 1 y 20.",
    pt: "Informe um peso maior que zero e um número inteiro de repetições entre 1 e 20.",
    fr: "Vérifiez les dates : cet outil attend des dates AAAA-MM-JJ et un nombre entier de jours.",
    de: "Daten prüfen: Das Tool erwartet JJJJ-MM-TT-Daten und eine ganze Zahl von Tagen.",
    ru: "Проверьте даты: нужен формат ГГГГ-ММ-ДД и целое число дней.",
    it: "Controlla le date: lo strumento richiede date AAAA-MM-GG e un numero intero di giorni.",
    tr: "Tarihleri kontrol edin: araç YYYY-AA-GG tarihleri ve tam sayı gün ister.",
    ko: "날짜를 확인하세요: YYYY-MM-DD 형식의 날짜와 정수 일수가 필요합니다.",
    ar: "تحقق من التواريخ: تتطلب الأداة تواريخ بصيغة YYYY-MM-DD وعددًا صحيحًا من الأيام.",
    hi: "तारीखें जाँचें: उपकरण को YYYY-MM-DD तारीखें और पूर्ण दिनों की संख्या चाहिए।",
    id: "Periksa tanggal: alat ini butuh tanggal YYYY-MM-DD dan jumlah hari bulat.",
    vi: "Kiểm tra ngày: công cụ cần ngày dạng YYYY-MM-DD và số ngày nguyên.",
  },
  note: {
    en: "Both formulas are estimates from submaximal sets. They agree best in the 4–10 rep range; above ~10 reps fatigue makes predictions drift, and nothing beats actually testing the lift.",
    zh: "两个公式都由次极限组推算而来,在 4–10 次范围内最一致;超过约 10 次后疲劳会让预测失真,真想知道极限还是要实际测一次。",
    ja: "どちらの式もサブマックスのセットからの推定です。4〜10 レップの範囲で最も一致し、10 レップを超えると疲労の影響でずれます。正確には実際にテストするのが一番です。",
    es: "Ambas fórmulas son estimaciones a partir de series submáximas. Coinciden mejor entre 4 y 10 repeticiones; por encima de ~10 la fatiga distorsiona la predicción, y nada sustituye a probarlo de verdad.",
    pt: "As duas fórmulas são estimativas a partir de séries submáximas. Concordam melhor na faixa de 4–10 repetições; acima de ~10 reps a fadiga distorce a previsão, e nada substitui testar de verdade.",
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

export function CalcEngineOrm() {
  const { locale } = useI18n();
  const [weight, setWeight] = useState("100");
  const [unit, setUnit] = useState("kg");
  const [reps, setReps] = useState("5");

  const w = Number(weight);
  const r = Number(reps);
  const orm = useMemo(() => oneRepMax(w, r), [w, r]);
  const valid = Number.isFinite(orm.epley);
  const rows = useMemo(() => (valid ? ormTable(orm.epley) : []), [valid, orm.epley]);

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, S.weight)}>
          <NumIn value={weight} onChange={setWeight} aria={pick(locale, S.weight)} placeholder="100" />
        </Field>
        <Field label={pick(locale, S.unit)}>
          <Sel value={unit} onChange={setUnit} aria={pick(locale, S.unit)}>
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </Sel>
        </Field>
        <Field label={pick(locale, S.reps)}>
          <NumIn value={reps} onChange={setReps} aria={pick(locale, S.reps)} placeholder="5" />
        </Field>
      </div>

      {!valid ? (
        <div className="mt-5">
          <Note>{pick(locale, S.invalid)}</Note>
        </div>
      ) : (
        <>
          <div className="mt-5">
            <Stats
              items={[
                { label: pick(locale, S.epley), value: `${fmt(orm.epley, locale, 1)} ${unit}`, tone: "accent" },
                { label: pick(locale, S.brzycki), value: `${fmt(orm.brzycki, locale, 1)} ${unit}` },
              ]}
            />
          </div>
          <div className="mt-5">
            <TableBox
              head={[pick(locale, S.tableReps), pick(locale, S.tableWeight), pick(locale, S.tablePct)]}
              rows={rows.map((row) => [row.reps, `${fmt(row.weight, locale, 1)} ${unit}`, `${fmt(row.pct, locale, 1)}%`])}
            />
          </div>
        </>
      )}

      <div className="mt-4">
        <Note>{pick(locale, S.note)}</Note>
      </div>
    </ToolPanel>
  );
}
