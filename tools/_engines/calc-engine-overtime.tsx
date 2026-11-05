"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, Tabs, fmtMoney, pick } from "./calc-ui";
import { overtimePay, salaryBreakdown } from "../_lib/finance";

/**
 * 加班费引擎:时薪直填,或年薪经 salaryBreakdown(每周常规工时 × 每年周数)折成时薪。
 * 纯数学在 tools/_lib/finance.ts 的 overtimePay():regular = rate × hours,
 * overtime = rate × multiplier × OT hours,annual 按 weeksPerYear 年化。
 */

const S = {
  hourly: { en: "Hourly rate", zh: "时薪", ja: "時給", es: "Tarifa por hora", pt: "Valor por hora", fr: "Taux horaire", de: "Stundensatz", ru: "Ставка в час", it: "Tariffa oraria", tr: "Saatlik ücret", ko: "시급", ar: "الأجر بالساعة", hi: "प्रति घंटा दर", id: "Tarif per jam", vi: "Lương theo giờ" },
  salary: { en: "Annual salary", zh: "年薪", ja: "年収", es: "Salario anual", pt: "Salário anual", fr: "Salaire annuel", de: "Jahresgehalt", ru: "Годовой оклад", it: "Salario annuale", tr: "Yıllık maaş", ko: "연봉", ar: "الراتب السنوي", hi: "वार्षिक वेतन", id: "Gaji tahunan", vi: "Lương năm" },
  regularHours: { en: "Regular hours / week", zh: "每周常规工时", ja: "通常の週労働時間", es: "Horas regulares / semana", pt: "Horas regulares / semana", fr: "Heures normales / semaine", de: "Reguläre Stunden / Woche", ru: "Обычные часы / нед.", it: "Ore ordinarie / settimana", tr: "Normal saat / hafta", ko: "기본 근무시간 / 주", ar: "الساعات العادية / أسبوع", hi: "सामान्य घंटे / सप्ताह", id: "Jam reguler / minggu", vi: "Giờ chuẩn / tuần" },
  otHours: { en: "Overtime hours / week", zh: "每周加班工时", ja: "週間残業時間", es: "Horas extra / semana", pt: "Horas extras / semana", fr: "Heures supp. / semaine", de: "Überstunden / Woche", ru: "Сверхурочные / нед.", it: "Straordinario / settimana", tr: "Fazla mesai / hafta", ko: "초과 근무 / 주", ar: "ساعات إضافية / أسبوع", hi: "ओवरटाइम घंटे / सप्ताह", id: "Jam lembur / minggu", vi: "Giờ làm thêm / tuần" },
  multiplier: { en: "Overtime multiplier", zh: "加班倍率", ja: "残業の倍率", es: "Multiplicador de horas extra", pt: "Multiplicador de horas extras", fr: "Coefficient des heures supp.", de: "Überstunden-Faktor", ru: "Коэффициент сверхурочных", it: "Moltiplicatore straordinario", tr: "Fazla mesai katsayısı", ko: "초과 수당 배율", ar: "معامل العمل الإضافي", hi: "ओवरटाइम गुणक", id: "Pengali lembur", vi: "Hệ số làm thêm" },
  weeksYear: { en: "Weeks per year", zh: "每年工作周数", ja: "年間労働週数", es: "Semanas por año", pt: "Semanas por ano", fr: "Semaines par an", de: "Wochen pro Jahr", ru: "Недель в году", it: "Settimane all'anno", tr: "Yıllık hafta", ko: "연간 주 수", ar: "أسابيع في السنة", hi: "वार्षिक सप्ताह", id: "Minggu per tahun", vi: "Tuần mỗi năm" },
  otRate: { en: "Overtime rate", zh: "加班时薪", ja: "残業時給", es: "Tarifa de horas extra", pt: "Valor da hora extra", fr: "Taux des heures supp.", de: "Überstundensatz", ru: "Ставка сверхурочных", it: "Tariffa straordinario", tr: "Fazla mesai ücreti", ko: "초과 수당률", ar: "أجر العمل الإضافي", hi: "ओवरटाइम दर", id: "Tarif lembur", vi: "Lương làm thêm" },
  regularPay: { en: "Regular pay / week", zh: "常规周薪", ja: "通常の週給", es: "Pago regular / semana", pt: "Pagamento regular / semana", fr: "Paie normale / semaine", de: "Normallohn / Woche", ru: "Обычная оплата / нед.", it: "Paga ordinaria / settimana", tr: "Normal ücret / hafta", ko: "기본 급여 / 주", ar: "الأجر العادي / أسبوع", hi: "सामान्य वेतन / सप्ताह", id: "Upah reguler / minggu", vi: "Lương chuẩn / tuần" },
  otPay: { en: "Overtime pay / week", zh: "加班周薪", ja: "残業代 / 週", es: "Pago de horas extra / semana", pt: "Pago de horas extras / semana", fr: "Paie heures supp. / semaine", de: "Überstundenlohn / Woche", ru: "Оплата сверхурочных / нед.", it: "Paga straordinario / settimana", tr: "Fazla mesai ücreti / hafta", ko: "초과 수당 / 주", ar: "أجر إضافي / أسبوع", hi: "ओवरटाइम वेतन / सप्ताह", id: "Upah lembur / minggu", vi: "Tiền làm thêm / tuần" },
  totalWeekly: { en: "Total weekly pay", zh: "每周总收入", ja: "週給の合計", es: "Pago semanal total", pt: "Pagamento semanal total", fr: "Paie hebdomadaire totale", de: "Wochenlohn gesamt", ru: "Итого за неделю", it: "Paga settimanale totale", tr: "Toplam haftalık ücret", ko: "주간 총 급여", ar: "الأجر الأسبوعي الإجمالي", hi: "कुल साप्ताहिक वेतन", id: "Total upah mingguan", vi: "Tổng lương tuần" },
  annual: { en: "Annualized (all weeks)", zh: "年化总收入(按全年)", ja: "年換算収入(通年)", es: "Anualizado (todas las semanas)", pt: "Anualizado (ano todo)", fr: "Annualisé (toutes les semaines)", de: "Jahreshochgerechnet (alle Wochen)", ru: "В годовом исчислении (все недели)", it: "Annualizzato (tutte le settimane)", tr: "Yıllıklandırılmış (tüm haftalar)", ko: "연환산(전체 주)", ar: "سنوي (كل الأسابيع)", hi: "वार्षिकीकृत (सभी सप्ताह)", id: "Ditahunkan (semua minggu)", vi: "Quy năm (mọi tuần)" },
  modeHourly: { en: "Hourly rate", zh: "按时薪", ja: "時給で入力", es: "Por hora", pt: "Por hora", fr: "Taux horaire", de: "Stundensatz", ru: "Ставка в час", it: "Tariffa oraria", tr: "Saatlik ücret", ko: "시급", ar: "الأجر بالساعة", hi: "प्रति घंटा दर", id: "Tarif per jam", vi: "Lương theo giờ" },
  modeSalary: { en: "Annual salary", zh: "按年薪", ja: "年収で入力", es: "Salario anual", pt: "Salário anual", fr: "Salaire annuel", de: "Jahresgehalt", ru: "Годовой оклад", it: "Salario annuale", tr: "Yıllık maaş", ko: "연봉", ar: "الراتب السنوي", hi: "वार्षिक वेतन", id: "Gaji tahunan", vi: "Lương năm" },
  m15: { en: "1.5× (time and a half)", zh: "1.5 倍(工作日加班)", ja: "1.5 倍(1.5 割増)", es: "1,5× (hora y media)", pt: "1,5× (hora e meia)", fr: "1,5× (temps et demi)", de: "1,5× (zeitplus)", ru: "1,5× (полторы ставки)", it: "1,5× (tempo e mezzo)", tr: "1,5× (bir buçuk katı)", ko: "1.5배(1.5타임)", ar: "1.5× (مرة ونصف)", hi: "1.5× (डेढ़ गुना)", id: "1,5× (satu setengah kali)", vi: "1,5× (một lần rưỡi)" },
  m20: { en: "2× (double time)", zh: "2 倍(双倍)", ja: "2 倍(ダブル)", es: "2× (tiempo doble)", pt: "2× (dobro)", fr: "2× (double temps)", de: "2× (Doppelzeit)", ru: "2× (двойная ставка)", it: "2× (tempo doppio)", tr: "2× (çift zaman)", ko: "2배(더블타임)", ar: "2× (ضعف الوقت)", hi: "2× (दोगुना)", id: "2× (dua kali)", vi: "2× (gấp đôi)" },
  salaryNote: {
    en: "Salary mode derives the hourly rate as annual salary ÷ (regular hours × weeks per year) — 52,000 over 40-hour weeks and 52 weeks is exactly 25.00/hour before any overtime.",
    zh: "年薪模式下,时薪 = 年薪 ÷(每周常规工时 × 每年周数)——52,000 按 40 小时、52 周折算,加班前时薪正好 25.00。",
    ja: "年収モードでは時給 = 年収 ÷(通常の週労働時間 × 年間週数)で求めます。52,000 を週 40 時間 × 52 週で割ると、残業前の時給はちょうど 25.00 です。",
    es: "En modo salario, la tarifa horaria es salario anual ÷ (horas regulares × semanas por año): 52.000 con semanas de 40 horas y 52 semanas son exactamente 25,00/hora antes de horas extra.",
    pt: "No modo salário, o valor por hora é salário anual ÷ (horas regulares × semanas por ano): 52.000 em semanas de 40 horas e 52 semanas dá exatamente 25,00/hora antes das horas extras.",
    fr: "Mode salaire : le taux horaire = salaire annuel ÷ (heures normales × semaines par an) — la majoration s'applique ensuite aux heures supplémentaires.",
    de: "Gehaltsmodus: Der Stundensatz = Jahresgehalt ÷ (Regelarbeitsstunden × Wochen pro Jahr) — der Zuschlag gilt dann für Überstunden.",
    ru: "Режим оклада: ставка в час = годовой оклад ÷ (обычные часы × недель в году) — надбавка затем применяется к переработкам.",
    it: "Modalità salario: la tariffa oraria = salario annuale ÷ (ore ordinarie × settimane all'anno) — la maggiorazione si applica poi allo straordinario.",
    tr: "Maaş modu: saatlik ücret = yıllık maaş ÷ (normal saat × yıllık hafta) — zammın ardından fazlalarya uygulanır.",
    ko: "연봉 모드: 시급 = 연봉 ÷ (기본 시간 × 연간 주 수) — 이후 초과 수당에 배율을 적용합니다.",
    ar: "وضع الراتب: الأجر الساعي = الراتب السنوي ÷ (الساعات العادية × الأسابيع في السنة) — ثم تُطبق العلاوة على العمل الإضافي.",
    hi: "वेतन मोड: घंटा दर = वार्षिक वेतन ÷ (सामान्य घंटे × सप्ताह प्रति वर्ष) — फिर ओवरटाइम पर गुणक लागू होता है।",
    id: "Mode gaji: tarif per jam = gaji tahunan ÷ (jam reguler × minggu per tahun) — pengali berikutnya diterapkan pada lembur.",
    vi: "Chế độ lương: lương giờ = lương năm ÷ (giờ chuẩn × tuần mỗi năm) — hệ số sau đó áp cho giờ làm thêm.",
  },
  flsaNote: {
    en: "Under the US Fair Labor Standards Act (FLSA), non-exempt employees earn at least 1.5× their regular rate for hours worked beyond 40 in a work week; some employers pay double time for holidays. Totals are gross pay — no taxes or deductions.",
    zh: "按照美国《公平劳动标准法》(FLSA),非豁免员工每周工作超过 40 小时的部分,加班时薪不低于常规时薪的 1.5 倍;部分雇主在节假日按 2 倍支付。金额均为税前,不含税费和扣款。",
    ja: "米国の公正労働基準法(FLSA)では、非免除従業員は週 40 時間を超えた分について通常時給の 1.5 倍以上を受け取ります。祝日に 2 倍を払う雇主もあります。金額はいずれも税引前で、税金・控除は含みません。",
    es: "Según la Fair Labor Standards Act (FLSA) de EE. UU., los empleados no exentos cobran al menos 1,5× su tarifa regular por las horas que excedan las 40 de la semana laboral; algunos empleadores pagan doble en festivos. Todos los importes son brutos, sin impuestos ni deducciones.",
    pt: "Pela Fair Labor Standards Act (FLSA) dos EUA, empregados não isentos recebem pelo menos 1,5× o valor normal pelas horas que passam de 40 na semana; alguns empregadores pagam o dobro em feriados. Todos os valores são brutos, sem impostos ou descontos.",
    fr: "Selon le Fair Labor Standards Act (FLSA) américain, les employés non exemptés gagnent au moins 1,5 × leur taux habituel au-delà de 40 h/semaine — ce calcul suit cette règle par défaut.",
    de: "Nach dem US Fair Labor Standards Act (FLSA) verdienen nicht freigestellte Arbeitnehmer über 40 Std./Woche mindestens das 1,5-Fache — diese Rechnung folgt standardmäßig dieser Regel.",
    ru: "По американскому FLSA работники без освобождения получают минимум 1,5× обычной ставки свыше 40 ч/нед. — расчёт по умолчанию следует этому правилу.",
    it: "Secondo il Fair Labor Standards Act (FLSA) statunitense, i dipendenti non esentati guadagnano almeno 1,5× la tariffa abituale oltre le 40 ore/settimana — il calcolo segue questa regola per impostazione predefinita.",
    tr: "ABD Fair Labor Standards Act'a (FLSA) göre muaf olmayan çalışanlar haftada 40 saatin üzerinde en az 1,5× normal ücret alır — hesap varsayılan olarak bu kuralı izler.",
    ko: "미국 공정노동기준법(FLSA)에 따라 비면제 직원은 주 40시간 초과 시 최소 1.5배를 받습니다 — 계산은 기본적으로 이 규칙을 따릅니다.",
    ar: "بموجب قانون معايير العمل العادلة الأمريكي (FLSA)، يحصل الموظفون غير المعفيين على 1.5× على الأقل فوق 40 ساعة/أسبوع — يتبع الحساب هذه القاعدة افتراضيًا.",
    hi: "अमेरिकी FLSA के तहत गैर-छूट प्राप्त कर्मचारी 40 घंटे/सप्ताह से ऊपर कम से कम 1.5× पाते हैं — गणना डिफ़ॉल्ट रूप से यही नियम मानती है।",
    id: "Berdasarkan FLSA AS, karyawan non-exempt mendapat minimal 1,5× di atas 40 jam/minggu — kalkulasi secara bawaan mengikuti aturan ini.",
    vi: "Theo FLSA Mỹ, nhân viên không miễn trừ được ít nhất 1,5× trên 40 giờ/tuần — phép tính mặc định theo quy tắc này.",
  },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineOvertime() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("hourly");
  const [hourlyRate, setHourlyRate] = useState("25");
  const [salary, setSalary] = useState("52000");
  const [regularHours, setRegularHours] = useState("40");
  const [otHours, setOtHours] = useState("5");
  const [multiplier, setMultiplier] = useState("1.5");
  const [weeks, setWeeks] = useState("52");

  const bySalary = mode === "salary";
  const rh = num(regularHours);
  const w = num(weeks);
  const mult = num(multiplier);

  // 年薪模式:用现有 salaryBreakdown 把年薪折成基准时薪(工时表与加班共用同一组口径)
  const baseRate = useMemo(
    () => (bySalary ? salaryBreakdown(num(salary), rh, w).hourly : num(hourlyRate)),
    [bySalary, salary, rh, w, hourlyRate],
  );
  const res = useMemo(
    () => overtimePay(baseRate, otHours.trim() === "" ? 0 : num(otHours), mult, rh, w),
    [baseRate, otHours, mult, rh, w],
  );
  const money = (n: number) => fmtMoney(n, locale, "$");

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "hourly", label: pick(locale, S.modeHourly) },
          { id: "salary", label: pick(locale, S.modeSalary) },
        ]}
        value={mode}
        onChange={(id) => setMode(id)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {bySalary ? (
          <Field label={pick(locale, S.salary)}>
            <NumIn value={salary} onChange={setSalary} aria="annual salary" />
          </Field>
        ) : (
          <Field label={pick(locale, S.hourly)}>
            <NumIn value={hourlyRate} onChange={setHourlyRate} aria="hourly rate" />
          </Field>
        )}
        <Field label={pick(locale, S.regularHours)}>
          <NumIn value={regularHours} onChange={setRegularHours} aria="regular hours per week" />
        </Field>
        <Field label={pick(locale, S.otHours)}>
          <NumIn value={otHours} onChange={setOtHours} aria="overtime hours per week" placeholder="0" />
        </Field>
        <Field label={pick(locale, S.multiplier)}>
          <Sel value={multiplier} onChange={setMultiplier} aria="overtime multiplier">
            <option value="1.5">{pick(locale, S.m15)}</option>
            <option value="2">{pick(locale, S.m20)}</option>
          </Sel>
        </Field>
        <Field label={pick(locale, S.weeksYear)}>
          <NumIn value={weeks} onChange={setWeeks} aria="weeks per year" />
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.otRate), value: money(res.otRate) },
            { label: pick(locale, S.regularPay), value: money(res.regularPay) },
            { label: pick(locale, S.otPay), value: money(res.overtimePay), tone: "good" },
            { label: pick(locale, S.totalWeekly), value: money(res.totalWeekly), tone: "accent" },
            { label: pick(locale, S.annual), value: money(res.annual) },
          ]}
        />
      </div>

      <div className="mt-3 space-y-2">
        {bySalary && <Note>{pick(locale, S.salaryNote)}</Note>}
        <Note>{pick(locale, S.flsaNote)}</Note>
      </div>
    </ToolPanel>
  );
}
