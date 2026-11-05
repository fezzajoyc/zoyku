"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Stats, fmt, fmtMoney, pick } from "./calc-ui";
import { hourlyToSalary, salaryBreakdown } from "../_lib/finance";

/**
 * Shared engine for the salary↔hourly pair.
 * props.mode = "salary2hourly" | "hourly2salary".
 * Unpaid days off (salary mode only) shrink the working year by 1/5 week per
 * day; the adjusted hourly is the same annual salary spread over the hours
 * actually worked.
 */

const S = {
  annual: { en: "Annual salary", zh: "年薪", ja: "年収", es: "Salario anual", pt: "Salário anual", fr: "Salaire annuel", de: "Jahresgehalt", ru: "Годовой оклад", it: "Salario annuale", tr: "Yıllık maaş", ko: "연봉", ar: "الراتب السنوي", hi: "वार्षिक वेतन", id: "Gaji tahunan", vi: "Lương năm" },
  hourlyRate: { en: "Hourly rate", zh: "时薪", ja: "時給", es: "Tarifa por hora", pt: "Valor por hora", fr: "Taux horaire", de: "Stundensatz", ru: "Ставка в час", it: "Tariffa oraria", tr: "Saatlik ücret", ko: "시급", ar: "الأجر بالساعة", hi: "प्रति घंटा दर", id: "Tarif per jam", vi: "Lương theo giờ" },
  hoursWeek: { en: "Hours per week", zh: "每周工时", ja: "週間労働時間", es: "Horas por semana", pt: "Horas por semana", fr: "Heures par semaine", de: "Stunden pro Woche", ru: "Часов в неделю", it: "Ore a settimana", tr: "Haftalık saat", ko: "주간 근무시간", ar: "ساعات كل أسبوع", hi: "सप्ताहिक घंटे", id: "Jam per minggu", vi: "Giờ mỗi tuần" },
  weeksYear: { en: "Weeks per year", zh: "每年工作周数", ja: "年間労働週数", es: "Semanas por año", pt: "Semanas por ano", fr: "Semaines par an", de: "Wochen pro Jahr", ru: "Недель в году", it: "Settimane all'anno", tr: "Yıllık hafta", ko: "연간 주 수", ar: "أسابيع في السنة", hi: "वार्षिक सप्ताह", id: "Minggu per tahun", vi: "Tuần mỗi năm" },
  unpaid: { en: "Unpaid days off / year", zh: "每年无薪休假天数", ja: "無給休暇日数/年", es: "Días sin sueldo / año", pt: "Dias não remunerados / ano", fr: "Jours non payés / an", de: "Unbezahlte freie Tage / Jahr", ru: "Неоплачиваемые выходные / год", it: "Giorni non retribuiti / anno", tr: "Ücretsiz izin / yıl", ko: "무급 휴일 / 연", ar: "أيام غير مدفوعة / سنة", hi: "बिना वेतन छुट्टियाँ / वर्ष", id: "Hari libur tak dibayar / tahun", vi: "Ngày nghỉ không lương / năm" },
  hourly: { en: "Hourly", zh: "时薪", ja: "時給", es: "Por hora", pt: "Por hora", fr: "Horaire", de: "Stunden", ru: "Часовая", it: "Oraria", tr: "Saatlik", ko: "시급", ar: "ساعي", hi: "घंटा", id: "Per jam", vi: "Theo giờ" },
  daily: { en: "Daily", zh: "日薪", ja: "日給", es: "Por día", pt: "Por dia", fr: "Journalier", de: "Täglich", ru: "Дневная", it: "Giornaliera", tr: "Günlük", ko: "일급", ar: "يومي", hi: "दैनिक", id: "Harian", vi: "Theo ngày" },
  weekly: { en: "Weekly", zh: "周薪", ja: "週給", es: "Por semana", pt: "Por semana", fr: "Hebdomadaire", de: "Wöchentlich", ru: "Недельная", it: "Settimanale", tr: "Haftalık", ko: "주급", ar: "أسبوعي", hi: "साप्ताहिक", id: "Mingguan", vi: "Theo tuần" },
  biweekly: { en: "Biweekly", zh: "双周薪", ja: "半月給", es: "Quincenal", pt: "Quinzenal", fr: "Toutes les 2 semaines", de: "Alle 2 Wochen", ru: "Раз в 2 недели", it: "Bisettimanale", tr: "İki haftada bir", ko: "2주급", ar: "كل أسبوعين", hi: "द्विसाप्ताहिक", id: "Dwi-mingguan", vi: "2 tuần/lần" },
  monthly: { en: "Monthly", zh: "月薪", ja: "月給", es: "Mensual", pt: "Mensal", fr: "Mensuel", de: "Monatlich", ru: "Месячная", it: "Mensile", tr: "Aylık", ko: "월급", ar: "شهري", hi: "मासिक", id: "Bulanan", vi: "Theo tháng" },
  annualStat: { en: "Annual", zh: "年薪", ja: "年収", es: "Anual", pt: "Anual", fr: "Annuel", de: "Jährlich", ru: "Годовая", it: "Annuale", tr: "Yıllık", ko: "연봉", ar: "سنوي", hi: "वार्षिक", id: "Tahunan", vi: "Theo năm" },
  adjusted: { en: "Hourly after unpaid days", zh: "扣除无薪假后的时薪", ja: "無給休暇後の時給", es: "Hora tras días sin sueldo", pt: "Hora após dias não remunerados", fr: "Taux horaire après jours non payés", de: "Stundensatz nach unbezahlten Tagen", ru: "Ставка с учётом неоплаченных дней", it: "Tariffa oraria dopo giorni non pagati", tr: "Ücretsiz günler sonrası saatlik", ko: "무급일 반영 시급", ar: "الأجر بعد الأيام غير المدفوعة", hi: "बिना वेतन दिनों के बाद दर", id: "Tarif per jam setelah hari tak dibayar", vi: "Lương giờ sau ngày không lương" },
  effective: {
    en: "Unpaid days shrink the working year (5-day weeks): 10 days ≈ 2 weeks. The adjusted hourly divides the same annual salary by the hours actually worked, so it rises with more time off. Totals are gross pay — no taxes or deductions.",
    zh: "无薪休假会缩短工作年(每周 5 个工作日):10 天 ≈ 2 周。调整后时薪把同一年薪摊到实际工作的小时上,休假越多数值越高。各项金额均为税前,不含税费和扣款。",
    ja: "無給休暇は労働年を縮めます(週 5 日勤務):10 日 ≈ 2 週間。「無給休暇後の時給」は同じ年収を実際に働いた時間で割った値で、休暇が多いほど高くなります。金額はいずれも税引前で、税金・控除は含みません。",
    es: "Los días sin sueldo acortan el año laboral (semanas de 5 días): 10 días ≈ 2 semanas. La hora ajustada divide el mismo salario anual entre las horas realmente trabajadas, así que sube cuantos más días. Todos los importes son brutos, sin impuestos ni deducciones.",
    pt: "Os dias não remunerados encurtam o ano de trabalho (semanas de 5 dias): 10 dias ≈ 2 semanas. O valor por hora ajustado divide o mesmo salário anual pelas horas realmente trabalhadas, então sobe com mais folga. Todos os valores são brutos, sem impostos ou descontos.",
    fr: "Les jours non payés réduisent l'année travaillée (semaines de 5 jours) : 10 jours ≈ 2 semaines. Le taux horaire ajusté en tient compte.",
    de: "Unbezahlte Tage verkürzen das Arbeitsjahr (5-Tage-Wochen): 10 Tage ≈ 2 Wochen. Der angepasste Stundensatz berücksichtigt das.",
    ru: "Неоплачиваемые дни сокращают рабочий год (5-дневные недели): 10 дней ≈ 2 недели. Скорректированная ставка это учитывает.",
    it: "I giorni non retribuiti accorciano l'anno lavorativo (settimane di 5 giorni): 10 giorni ≈ 2 settimane. La tariffa oraria rettificata ne tiene conto.",
    tr: "Ücretsiz günler çalışma yılını kısaltır (5 günlük hafta): 10 gün ≈ 2 hafta. Düzeltilmiş saatlik ücret bunu hesaba katar.",
    ko: "무급일은 근무 연도를 줄입니다(주 5일 기준): 10일 ≈ 2주. 조정된 시급이 이를 반영합니다.",
    ar: "الأيام غير مدفوعة تقصّر سنة العمل (أسابيع 5 أيام): 10 أيام ≈ أسبوعان. ويراعي ذلك الأجر الساعي المعدّل.",
    hi: "बिना वेतन के दिन कार्य वर्ष छोटा करते हैं (5-दिन सप्ताह): 10 दिन ≈ 2 सप्ताह। समायोजित दर इसे मानती है।",
    id: "Hari tanpa bayar memperpendek tahun kerja (pekan 5 hari): 10 hari ≈ 2 minggu. Tarif per jam yang disesuaikan memperhitungkannya.",
    vi: "Ngày không lương rút ngắn năm làm việc (tuần 5 ngày): 10 ngày ≈ 2 tuần. Lương giờ đã điều chỉnh tính điều này.",
  },
  noteSalary: {
    en: "Hourly = annual ÷ (hours per week × weeks per year); daily uses a 5-day week. Example: 52,000 at 40 h/week over 52 weeks is exactly 25.00/hour.",
    zh: "时薪 = 年薪 ÷(每周工时 × 每年周数);日薪按每周 5 个工作日折算。例如年薪 52,000、每周 40 小时、52 周,时薪正好 25.00。",
    ja: "時給 = 年収 ÷(週労働時間 × 年間週数)。日給は週 5 日換算です。例:年収 52,000・週 40 時間・52 週なら時給はちょうど 25.00 です。",
    es: "Hora = anual ÷ (horas por semana × semanas por año); el día usa una semana de 5 días. Ejemplo: 52.000 a 40 h/semana durante 52 semanas son exactamente 25,00/hora.",
    pt: "Hora = anual ÷ (horas por semana × semanas por ano); o dia usa uma semana de 5 dias. Exemplo: 52.000 a 40 h/semana durante 52 semanas dá exatamente 25,00/hora.",
    fr: "Horaire = annuel ÷ (heures par semaine × semaines par an) ; le journal se base sur une semaine de 5 jours. Exemple : 52 000 € ≈ 25 €/h à 40 h et 52 semaines.",
    de: "Stundensatz = Jahresgehalt ÷ (Std./Woche × Wochen/Jahr); der Tagessatz nutzt 5-Tage-Wochen. Beispiel: 52.000 € ≈ 25 €/h bei 40 Std. und 52 Wochen.",
    ru: "Часовая = годовая ÷ (часов в неделю × недель в году); дневная — по 5-дневной неделе. Пример: 52 000 ≈ 25/ч при 40 ч и 52 неделях.",
    it: "Oraria = annuale ÷ (ore a settimana × settimane all'anno); la giornaliera usa settimane di 5 giorni. Esempio: 52.000 ≈ 25/ora a 40 ore e 52 settimane.",
    tr: "Saatlik = yıllık ÷ (haftalık saat × yıllık hafta); günlük 5 günlük haftayı kullanır. Örnek: 52.000 ≈ 25/saat (40 saat, 52 hafta).",
    ko: "시급 = 연봉 ÷ (주간 시간 × 연간 주 수); 일급은 주 5일 기준. 예: 52,000 ≈ 25/시간(주 40시간, 52주).",
    ar: "الساعي = السنوي ÷ (ساعات كل أسبوع × أسابيع السنة)؛ اليومي على أساس أسبوع 5 أيام. مثال: 52,000 ≈ 25/ساعة عند 40 ساعة و52 أسبوعًا.",
    hi: "घंटा = वार्षिक ÷ (सप्ताहिक घंटे × वार्षिक सप्ताह); दैनिक 5-दिन सप्ताह उपयोग करता है। उदाहरण: 52,000 ≈ 25/घंटा (40 घंटे, 52 सप्ताह)।",
    id: "Per jam = tahunan ÷ (jam per minggu × minggu per tahun); harian memakai pekan 5 hari. Contoh: 52.000 ≈ 25/jam (40 jam, 52 minggu).",
    vi: "Lương giờ = lương năm ÷ (giờ mỗi tuần × tuần mỗi năm); ngày làm dùng tuần 5 ngày. Ví dụ: 52.000 ≈ 25/giờ (40 giờ, 52 tuần).",
  },
  noteHourly: {
    en: "Annual = hourly × hours per week × weeks per year; daily uses a 5-day week. Example: 25/hour at 40 h/week over 52 weeks is exactly 52,000/year.",
    zh: "年薪 = 时薪 × 每周工时 × 每年周数;日薪按每周 5 个工作日折算。例如时薪 25、每周 40 小时、52 周,年薪正好 52,000。",
    ja: "年収 = 時給 × 週労働時間 × 年間週数。日給は週 5 日換算です。例:時給 25・週 40 時間・52 週なら年収はちょうど 52,000 です。",
    es: "Anual = tarifa × horas por semana × semanas por año; el día usa una semana de 5 días. Ejemplo: 25/hora a 40 h/semana durante 52 semanas son exactamente 52.000/año.",
    pt: "Anual = valor por hora × horas por semana × semanas por ano; o dia usa uma semana de 5 dias. Exemplo: 25/hora a 40 h/semana durante 52 semanas dá exatamente 52.000/ano.",
    fr: "Annuel = horaire × heures par semaine × semaines par an ; le journal se base sur une semaine de 5 jours. Exemple : 25 €/h ≈ 52 000 € à 40 h et 52 semaines.",
    de: "Jahresgehalt = Stundensatz × Std./Woche × Wochen/Jahr; der Tagessatz nutzt 5-Tage-Wochen. Beispiel: 25 €/h ≈ 52.000 € bei 40 Std. und 52 Wochen.",
    ru: "Годовая = часовая × часов в неделю × недель в году; дневная — по 5-дневной неделе. Пример: 25/ч ≈ 52 000 при 40 ч и 52 неделях.",
    it: "Annuale = oraria × ore a settimana × settimane all'anno; la giornaliera usa settimane di 5 giorni. Esempio: 25/ora ≈ 52.000 a 40 ore e 52 settimane.",
    tr: "Yıllık = saatlik × haftalık saat × yıllık hafta; günlük 5 günlük haftayı kullanır. Örnek: 25/saat ≈ 52.000 (40 saat, 52 hafta).",
    ko: "연봉 = 시급 × 주간 시간 × 연간 주 수; 일급은 주 5일 기준. 예: 25/시간 ≈ 52,000(주 40시간, 52주).",
    ar: "السنوي = الساعي × ساعات كل أسبوع × أسابيع السنة؛ اليومي على أساس أسبوع 5 أيام. مثال: 25/ساعة ≈ 52,000 عند 40 ساعة و52 أسبوعًا.",
    hi: "वार्षिक = घंटा × सप्ताहिक घंटे × वार्षिक सप्ताह; दैनिक 5-दिन सप्ताह उपयोग करता है। उदाहरण: 25/घंटा ≈ 52,000 (40 घंटे, 52 सप्ताह)।",
    id: "Tahunan = per jam × jam per minggu × minggu per tahun; harian memakai pekan 5 hari. Contoh: 25/jam ≈ 52.000 (40 jam, 52 minggu).",
    vi: "Lương năm = lương giờ × giờ mỗi tuần × tuần mỗi năm; ngày làm dùng tuần 5 ngày. Ví dụ: 25/giờ ≈ 52.000 (40 giờ, 52 tuần).",
  },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineSalary({ mode }: { mode: string }) {
  const { locale } = useI18n();
  const toHourly = mode === "salary2hourly";
  const [salary, setSalary] = useState("52000");
  const [hourlyRate, setHourlyRate] = useState("25");
  const [hours, setHours] = useState("40");
  const [weeks, setWeeks] = useState("52");
  const [unpaid, setUnpaid] = useState("");

  const h = num(hours);
  const w = num(weeks);
  const symbol = "$";

  const sb = useMemo(
    () => salaryBreakdown(num(salary), h, w, unpaid.trim() === "" ? 0 : num(unpaid)),
    [salary, h, w, unpaid],
  );
  const hs = useMemo(() => hourlyToSalary(num(hourlyRate), h, w), [hourlyRate, h, w]);

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        {toHourly ? (
          <>
            <Field label={pick(locale, S.annual)}>
              <NumIn value={salary} onChange={setSalary} aria="annual salary" />
            </Field>
            <Field label={pick(locale, S.unpaid)}>
              <NumIn value={unpaid} onChange={setUnpaid} aria="unpaid days off per year" placeholder="0" />
            </Field>
          </>
        ) : (
          <Field label={pick(locale, S.hourlyRate)}>
            <NumIn value={hourlyRate} onChange={setHourlyRate} aria="hourly rate" />
          </Field>
        )}
        <Field label={pick(locale, S.hoursWeek)}>
          <NumIn value={hours} onChange={setHours} aria="hours per week" />
        </Field>
        <Field label={pick(locale, S.weeksYear)}>
          <NumIn value={weeks} onChange={setWeeks} aria="weeks per year" />
        </Field>
      </div>

      <div className="mt-5">
        {toHourly ? (
          <Stats
            items={[
              { label: pick(locale, S.hourly), value: fmtMoney(sb.hourly, locale, symbol), tone: "accent" },
              { label: pick(locale, S.adjusted), value: fmtMoney(sb.adjustedHourly, locale, symbol), tone: "good" },
              { label: pick(locale, S.daily), value: fmtMoney(sb.daily, locale, symbol) },
              { label: pick(locale, S.weekly), value: fmtMoney(sb.weekly, locale, symbol) },
              { label: pick(locale, S.biweekly), value: fmtMoney(sb.biweekly, locale, symbol) },
              { label: pick(locale, S.monthly), value: fmtMoney(sb.monthly, locale, symbol) },
            ]}
          />
        ) : (
          <Stats
            items={[
              { label: pick(locale, S.annualStat), value: fmtMoney(hs.annual, locale, symbol), tone: "accent" },
              { label: pick(locale, S.monthly), value: fmtMoney(hs.monthly, locale, symbol) },
              { label: pick(locale, S.biweekly), value: fmtMoney(hs.biweekly, locale, symbol) },
              { label: pick(locale, S.weekly), value: fmtMoney(hs.weekly, locale, symbol) },
              { label: pick(locale, S.daily), value: fmtMoney(hs.daily, locale, symbol) },
            ]}
          />
        )}
      </div>

      <div className="mt-3 space-y-2">
        <Note>{toHourly ? pick(locale, S.noteSalary) : pick(locale, S.noteHourly)}</Note>
        {toHourly && Number.isFinite(sb.effectiveWeeks) && sb.effectiveWeeks < w && (
          <Note>
            {pick(locale, {
              en: "With the unpaid days off you entered, the working year is about ",
              zh: "按你输入的无薪休假天数,实际工作年约为 ",
              ja: "入力した無給休暇日数では、実労働年は約 ",
              es: "Con los días sin sueldo indicados, el año laboral ronda las ",
              pt: "Com os dias não remunerados informados, o ano de trabalho é de cerca de ",
              fr: "Avec les jours non payés saisis, l'année travaillée fait environ ",
              de: "Mit den eingegebenen unbezahlten freien Tagen umfasst das Arbeitsjahr etwa ",
              ru: "С введёнными неоплачиваемыми выходными рабочий год составляет около ",
              it: "Con i giorni non retribuiti inseriti, l'anno lavorativo è di circa ",
              tr: "Girdiğiniz ücretsiz izin günleriyle çalışma yılı yaklaşık ",
              ko: "입력한 무급 휴일을 반영하면 근무 연도는 약 ",
              ar: "مع أيام الراحة غير المدفوعة التي أدخلتها، سنة العمل نحو ",
              hi: "आपके दर्ज बिना वेतन छुट्टी दिनों के साथ कार्य वर्ष लगभग ",
              id: "Dengan hari libur tak dibayar yang Anda masukkan, tahun kerja sekitar ",
              vi: "Với số ngày nghỉ không lương đã nhập, năm làm việc khoảng ",
            }) + fmt(sb.effectiveWeeks, locale, 1)}
            {pick(locale, {
              en: " weeks.",
              zh: " 周。",
              ja: " 週です。",
              es: " semanas.",
              pt: " semanas.",
              fr: " semaines.",
              de: " Wochen.",
              ru: " недель.",
              it: " settimane.",
              tr: " hafta.",
              ko: "주입니다.",
              ar: " أسبوعًا.",
              hi: " सप्ताह।",
              id: " minggu.",
              vi: " tuần.",
            })}
          </Note>
        )}
        <Note>{pick(locale, S.effective)}</Note>
      </div>
    </ToolPanel>
  );
}
