"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, Tabs, TableBox, pick } from "./calc-ui";
import { bedtimesFor, formatHm, parseHm, wakeTimesFor } from "../_lib/sleep";

/**
 * 睡眠周期引擎:两种用法共用一套周期数学(90 分钟周期 + 15 分钟入睡)。
 * - "按起床时间倒推就寝点"
 * - "现在就睡,顺推醒来时刻"
 * 数学在 tools/_lib/sleep.ts。
 */

const S = {
  bed: { en: "Wake-up time → bedtime", zh: "按起床时间倒推", ja: "起床時刻から就寝時刻へ", es: "Hora de despertar → acostarse", pt: "Hora de acordar → deitar", fr: "Heure de réveil → coucher", de: "Aufwachzeit → Schlafenszeit", ru: "Подъём → отбой", it: "Ora di sveglia → ora di letto", tr: "Uyanma → yatma saati", ko: "기상 시간 → 취침 시간", ar: "وقت الاستيقاظ → وقت النوم", hi: "जागने का समय → सोने का समय", id: "Bangun → waktu tidur", vi: "Giờ thức dậy → giờ đi ngủ" },
  now: { en: "Sleep now → wake times", zh: "现在就睡 → 醒来时间", ja: "今寝る → 起きる時刻", es: "Dormir ahora → despertares", pt: "Dormir agora → despertares", fr: "Coucher maintenant → réveils", de: "Jetzt schlafen → Wachzeiten", ru: "Лечь сейчас → время подъёма", it: "Dormi ora → orari sveglia", tr: "Şimdi uyu → uyanma saatleri", ko: "지금 자기 → 기상 시간", ar: "النوم الآن → أوقات الاستيقاظ", hi: "अभी सोएँ → जागने के समय", id: "Tidur sekarang → waktu bangun", vi: "Ngủ bây giờ → giờ thức dậy" },
  wakeAt: { en: "I need to wake up at", zh: "我需要在几点起床", ja: "起床時刻", es: "Necesito despertarme a las", pt: "Preciso acordar às", fr: "Je dois me réveiller à", de: "Ich muss um … aufwachen", ru: "Мне нужно проснуться в", it: "Devo svegliarmi alle", tr: "Şu saatte uyanmam gerekiyor", ko: "기상해야 할 시간", ar: "يجب أن أستيقظ في", hi: "मुझे जागना है", id: "Saya harus bangun pada", vi: "Tôi cần thức dậy lúc" },
  sleepAt: { en: "I'm going to bed now", zh: "我现在上床睡觉", ja: "今から寝ます", es: "Me acuesto ahora", pt: "Vou dormir agora", fr: "Je me couche maintenant", de: "Ich gehe jetzt schlafen", ru: "Я ложусь спать сейчас", it: "Vado a letto ora", tr: "Şimdi yatıyorum", ko: "지금 자러 갑니다", ar: "سأنام الآن", hi: "मैं अभी सोने जा रहा हूँ", id: "Saya mau tidur sekarang", vi: "Tôi đi ngủ bây giờ" },
  cycles: { en: "Cycles", zh: "周期", ja: "サイクル", es: "Ciclos", pt: "Ciclos", fr: "cycles", de: "Zyklen", ru: "циклов", it: "cicli", tr: "döngü", ko: "사이클", ar: "دورات", hi: "चक्र", id: "siklus", vi: "chu kỳ" },
  sleep: { en: "Sleep", zh: "睡眠时长", ja: "睡眠時間", es: "Sueño", pt: "Sono", fr: "Sommeil", de: "Schlaf", ru: "Сон", it: "Sonno", tr: "Uyku", ko: "수면", ar: "النوم", hi: "नींद", id: "Tidur", vi: "Ngủ" },
  clock: { en: "Clock time", zh: "时刻", ja: "時刻", es: "Hora", pt: "Hora", fr: "Heure", de: "Uhrzeit", ru: "Время", it: "Orario", tr: "Saat", ko: "시각", ar: "الوقت", hi: "समय", id: "Waktu jam", vi: "Giờ đồng hồ" },
  prevDay: { en: "previous day", zh: "前一天", ja: "前日", es: "día anterior", pt: "dia anterior", fr: "veille", de: "Vortag", ru: "пред. день", it: "giorno prima", tr: "önceki gün", ko: "전날", ar: "اليوم السابق", hi: "पिछला दिन", id: "hari sebelumnya", vi: "hôm trước" },
  nextDay: { en: "next day", zh: "次日", ja: "翌日", es: "día siguiente", pt: "dia seguinte", fr: "lendemain", de: "Folgetag", ru: "след. день", it: "giorno dopo", tr: "ertesi gün", ko: "다음 날", ar: "اليوم التالي", hi: "अगला दिन", id: "hari berikutnya", vi: "hôm sau" },
  cyclesUnit: { en: "cycles", zh: "个周期", ja: "サイクル", es: "ciclos", pt: "ciclos", fr: "cycles", de: "Zyklen", ru: "циклов", it: "cicli", tr: "döngü", ko: "사이클", ar: "دورات", hi: "चक्र", id: "siklus", vi: "chu kỳ" },
  invalid: {
    en: "Pick a valid time of day to see the cycle table.",
    zh: "请选择一个有效的时刻。",
    ja: "有効な時刻を選択してください。",
    es: "Elija una hora válida para ver la tabla de ciclos.",
    pt: "Escolha um horário válido para ver a tabela de ciclos.",
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
  caveat: {
    en: "The math uses the 90-minute average cycle plus about 15 minutes to fall asleep. Individual cycles vary from roughly 80 to 120 minutes, so treat these times as targets, not guarantees.",
    zh: "计算采用 90 分钟的平均周期加约 15 分钟入睡时间。个体周期在 80–120 分钟之间波动,这些时刻只能当作目标,而非保证。",
    ja: "計算は 90 分の平均サイクルと約 15 分の入眠時間に基づきます。個人のサイクルは 80〜120 分程度で異なるため、目安としてお使いください。",
    es: "El cálculo usa el ciclo medio de 90 minutos más unos 15 minutos para conciliar el sueño. Los ciclos individuales varían entre 80 y 120 minutos: tome estas horas como objetivos, no como garantías.",
    pt: "O cálculo usa o ciclo médio de 90 minutos mais cerca de 15 minutos para pegar no sono. Os ciclos individuais variam de 80 a 120 minutos: trate estes horários como metas, não garantias.",
    fr: "Le calcul utilise le cycle moyen de 90 minutes plus environ 15 minutes pour s'endormir. Le rythme individuel varie — traitez ces horaires comme des fenêtres, pas des instants précis.",
    de: "Die Rechnung nutzt den 90-Minuten-Durchschnittszyklus plus rund 15 Minuten zum Einschlafen. Individuelle Rhythmen variieren — behandle die Zeiten als Fenster, nicht als exakte Momente.",
    ru: "Расчёт использует средний цикл 90 минут плюс около 15 минут на засыпание. Индивидуальные ритмы различаются — считайте это окнами, а не точными моментами.",
    it: "Il calcolo usa il ciclo medio di 90 minuti più circa 15 minuti per addormentarsi. I ritmi individuali variano — tratta gli orari come finestre, non come momenti esatti.",
    tr: "Hesap, 90 dakikalık ortalama döngü ile uyumak için yaklaşık 15 dakika kullanır. Bireysel ritimler değişir — bunları an değil pencere olarak görün.",
    ko: "계산은 90분 평균 사이클에 잠들기까지 약 15분을 더합니다. 개인차가 있으므로 정확한 시각이 아닌 시간대로 보세요.",
    ar: "يستخدم الحساب متوسط دورة 90 دقيقة مع نحو 15 دقيقة للنوم. الإيقاع الفردي يختلف — تعامل مع الأوقات كنوافذ لا كأوقات دقيقة.",
    hi: "गणना 90-मिनट औसत चक्र और सोने में लगभग 15 मिनट उपयोग करती है। व्यक्तिगत लय भिन्न होती है — इन समयों को सटीक क्षण नहीं, समय-सीमा मानें।",
    id: "Perhitungan memakai siklus rata-rata 90 menit ditambah sekitar 15 menit untuk tertidur. Ritme individu berbeda — anggap waktu ini jendela, bukan momen tepat.",
    vi: "Phép tính dùng chu kỳ trung bình 90 phút cộng thêm khoảng 15 phút để chìm vào giấc ngủ. Nhịp cá nhân khác nhau — coi đây là khung giờ, không phải mốc chính xác.",
  },
};

function useNowHm(): string {
  const [v, setV] = useState("23:00");
  useEffect(() => {
    const d = new Date();
    setV(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
  }, []);
  return v;
}

function durMin(locale: string, minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (locale === "zh") return m === 0 ? `${h} 小时` : `${h} 小时 ${m} 分钟`;
  if (locale === "ja") return m === 0 ? `${h} 時間` : `${h} 時間 ${m} 分`;
  if (locale === "es") return m === 0 ? `${h} h` : `${h} h ${m} min`;
  if (locale === "pt") return m === 0 ? `${h} h` : `${h} h ${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export function CalcEngineSleep() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("bed");
  const [wake, setWake] = useState("07:00");
  const nowHm = useNowHm();
  const [bed, setBed] = useState("23:00");

  useEffect(() => {
    if (mode === "now") setBed(nowHm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const minutes = useMemo(() => {
    const src = mode === "bed" ? wake : bed;
    return parseHm(src);
  }, [mode, wake, bed]);

  const rows = useMemo(() => {
    if (minutes === null) return [];
    return mode === "bed" ? bedtimesFor(minutes) : wakeTimesFor(minutes);
  }, [mode, minutes]);

  const dayTag = (m: number): string => {
    const off = Math.floor(m / 1440);
    if (off < 0) return ` (${pick(locale, S.prevDay)})`;
    if (off > 0) return ` (${pick(locale, S.nextDay)})`;
    return "";
  };

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "bed", label: pick(locale, S.bed) },
          { id: "now", label: pick(locale, S.now) },
        ]}
        value={mode}
        onChange={setMode}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={mode === "bed" ? pick(locale, S.wakeAt) : pick(locale, S.sleepAt)}>
          <input
            type="time"
            className="field mono"
            value={mode === "bed" ? wake : bed}
            onChange={(e) => (mode === "bed" ? setWake(e.target.value) : setBed(e.target.value))}
            aria-label={mode === "bed" ? pick(locale, S.wakeAt) : pick(locale, S.sleepAt)}
          />
        </Field>
      </div>

      {rows.length === 0 ? (
        <div className="mt-5">
          <Note>{pick(locale, S.invalid)}</Note>
        </div>
      ) : (
        <div className="mt-5">
          <TableBox
            head={[
              pick(locale, S.cycles),
              pick(locale, S.sleep),
              pick(locale, S.clock),
            ]}
            rows={rows.map((r) => [
              `${r.cycles} ${pick(locale, S.cyclesUnit)}`,
              durMin(locale, r.sleepMinutes),
              `${formatHm(r.minutes)}${dayTag(r.minutes)}`,
            ])}
          />
        </div>
      )}

      <div className="mt-4">
        <Note>{pick(locale, S.caveat)}</Note>
      </div>
    </ToolPanel>
  );
}
