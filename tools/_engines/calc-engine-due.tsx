"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Stats, INTL_LOCALES, pick } from "./calc-ui";
import { dueDateFromLmp, gestationalAgeAt } from "../_lib/duedate";
import { fill } from "../_lib/types";

/**
 * Due-date engine on top of duedate.dueDateFromLmp(): Naegele rule (LMP + 280
 * days, shifted by the cycle-length difference from 28), current gestational
 * age, days to the due date and the full-term window.
 * props: none.
 */

const S = {
  lmp: { en: "First day of last period (LMP)", zh: "末次月经第一天(LMP)", ja: "最終月経開始日(LMP)", es: "Primer día de la última regla (FUR)", pt: "Primeiro dia da última menstruação (DUM)", fr: "Premier jour des dernières règles", de: "Erster Tag der letzten Periode", ru: "Первый день последней менструации", it: "Primo giorno dell'ultima mestruazione", tr: "Son adetin ilk günü", ko: "마지막 월경 첫날", ar: "أول يوم للدورة الأخيرة", hi: "अंतिम मासिक धर्म का पहला दिन", id: "Hari pertama haid terakhir", vi: "Ngày đầu của kỳ kinh gần nhất" },
  cycle: { en: "Cycle length (days)", zh: "月经周期(天)", ja: "月経周期(日)", es: "Duración del ciclo (días)", pt: "Duração do ciclo (dias)", fr: "Durée du cycle (jours)", de: "Zykluslänge (Tage)", ru: "Длина цикла (дни)", it: "Durata del ciclo (giorni)", tr: "Döngü uzunluğu (gün)", ko: "월경 주기(일)", ar: "طول الدورة (أيام)", hi: "चक्र की लंबाई (दिन)", id: "Panjang siklus (hari)", vi: "Độ dài chu kỳ (ngày)" },
  due: { en: "Estimated due date", zh: "预产期(估计)", ja: "出産予定日", es: "Fecha probable de parto", pt: "Data provável do parto", fr: "Date prévue d'accouchement", de: "Voraussichtlicher Entbindungstermin", ru: "Предполагаемая дата родов", it: "Data presunta del parto", tr: "Tahmini doğum tarihi", ko: "출산 예정일", ar: "تاريخ الولادة المتوقع", hi: "अनुमानित प्रसव तिथि", id: "Perkiraan tanggal persalinan", vi: "Ngày dự sinh" },
  gestAge: { en: "Gestational age today", zh: "今天孕周", ja: "今日の妊娠週数", es: "Edad gestacional hoy", pt: "Idade gestacional hoje", fr: "Âge gestationnel aujourd'hui", de: "Gestationsalter heute", ru: "Гестационный возраст сегодня", it: "Età gestazionale oggi", tr: "Bugünkü gebelik haftası", ko: "오늘 임신 주수", ar: "عمر الحمل اليوم", hi: "आज गर्भकालीन आयु", id: "Usia kehamilan hari ini", vi: "Tuổi thai hôm nay" },
  daysToGo: { en: "Days until due date", zh: "距预产期天数", ja: "出産予定日までの日数", es: "Días hasta la fecha probable", pt: "Dias até a data provável", fr: "Jours avant la date prévue", de: "Tage bis zum Termin", ru: "Дней до даты родов", it: "Giorni alla data presunta", tr: "Doğuma kalan gün", ko: "출산 예정일까지 남은 일수", ar: "الأيام حتى الموعد", hi: "प्रसव तिथि तक दिन", id: "Hari menuju tanggal persalinan", vi: "Số ngày đến ngày dự sinh" },
  termWindow: { en: "Full-term window", zh: "足月窗口", ja: "正期産の期間", es: "Ventana de término a término", pt: "Janela de gestação a termo", fr: "Période à terme", de: "Zeitraum am Termin", ru: "Интервал доношенной беременности", it: "Finestra di gravidanza a termine", tr: "Döneminde doğum aralığı", ko: "만기 출산 기간", ar: "نافذة الحمل الكامل", hi: "पूर्ण अवधि सीमा", id: "Rentang kehamilan cukup bulan", vi: "Khoảng thời gian đủ tháng" },
  trimester: { en: "Trimester", zh: "孕期阶段", ja: "妊娠期区分", es: "Trimestre", pt: "Trimestre", fr: "Trimestre", de: "Trimester", ru: "Триместр", it: "Trimestre", tr: "Trimester", ko: "임신 3기", ar: "ثلاثي الحمل", hi: "तिमाही", id: "Trimester", vi: "Giai đoạn thai kỳ" },
  tri1: { en: "1st trimester", zh: "孕早期(第 1–13 周)", ja: "妊娠初期", es: "Primer trimestre", pt: "Primeiro trimestre", fr: "1er trimestre", de: "1. Trimester", ru: "1-й триместр", it: "Primo trimestre", tr: "1. trimester", ko: "임신 초기", ar: "الثلث الأول", hi: "पहली तिमाही", id: "Trimester pertama", vi: "3 tháng đầu" },
  tri2: { en: "2nd trimester", zh: "孕中期(第 14–27 周)", ja: "妊娠中期", es: "Segundo trimestre", pt: "Segundo trimestre", fr: "2e trimestre", de: "2. Trimester", ru: "2-й триместр", it: "Secondo trimestre", tr: "2. trimester", ko: "임신 중기", ar: "الثلث الثاني", hi: "दूसरी तिमाही", id: "Trimester kedua", vi: "3 tháng giữa" },
  tri3: { en: "3rd trimester", zh: "孕晚期(第 28 周起)", ja: "妊娠後期", es: "Tercer trimestre", pt: "Terceiro trimestre", fr: "3e trimestre", de: "3. Trimester", ru: "3-й триместр", it: "Terzo trimestre", tr: "3. trimester", ko: "임신 후기", ar: "الثلث الثالث", hi: "तीसरी तिमाही", id: "Trimester ketiga", vi: "3 tháng cuối" },
  weeks: { en: "weeks", zh: "周", ja: "週", es: "semanas", pt: "semanas", fr: "semaines", de: "Wochen", ru: "недель", it: "settimane", tr: "hafta", ko: "주", ar: "أسابيع", hi: "सप्ताह", id: "minggu", vi: "tuần" },
  days: { en: "days", zh: "天", ja: "日", es: "días", pt: "dias", fr: "jours", de: "Tage", ru: "дней", it: "giorni", tr: "gün", ko: "일", ar: "أيام", hi: "दिन", id: "hari", vi: "ngày" },
  overdue: { en: "{n} days past the due date", zh: "已过预产期 {n} 天", ja: "出産予定日を {n} 日過ぎ", es: "{n} días después de la fecha probable", pt: "{n} dias após a data provável", fr: "{n} jours après la date prévue", de: "{n} Tage über dem Termin", ru: "На {n} дней позже срока", it: "{n} giorni oltre la data presunta", tr: "Tahmini tarihten {n} gün sonra", ko: "예정일 {n}일 지남", ar: "{n} يومًا بعد الموعد", hi: "तिथि के {n} दिन बाद", id: "{n} hari melewati tanggal", vi: "Quá {n} ngày so với ngày dự sinh" },
  dueToday: { en: "Due today!", zh: "预产期就是今天!", ja: "出産予定日当日!", es: "¡La fecha es hoy!", pt: "A data é hoje!", fr: "C'est aujourd'hui !", de: "Heute ist der Termin!", ru: "Срок сегодня!", it: "La data è oggi!", tr: "Bugün tahmini tarih!", ko: "오늘이 예정일!", ar: "الموعد اليوم!", hi: "आज ही तिथि!", id: "Tanggalnya hari ini!", vi: "Hôm nay là ngày dự sinh!" },
  formula: {
    en: "Naegele's rule: due date = first day of the last period + 280 days (40 weeks). A cycle other than 28 days shifts the date by the difference (30-day cycle → +2 days). Gestational age counts from the LMP, so day 0 is 0 weeks 0 days and the due date is week 40.",
    zh: "Naegele 规则:预产期 = 末次月经第一天 + 280 天(40 周)。周期不是 28 天时按差值平移(30 天周期 → +2 天)。孕周从末次月经起算:第 0 天是孕 0 周 0 天,预产期对应第 40 周。",
    ja: "ネーゲレ法則:出産予定日 = 最終月経開始日 + 280 日(40 週)。周期が 28 日でない場合は差だけずらします(30 日周期 → +2 日)。妊娠週数は最終月経から数え、0 日目は妊娠 0 週 0 日、出産予定日は 40 週に相当します。",
    es: "Regla de Naegele: fecha probable = primer día de la última regla + 280 días (40 semanas). Un ciclo distinto de 28 días desplaza la fecha por la diferencia (ciclo de 30 → +2 días). La edad gestacional cuenta desde la FUR: el día 0 es 0 semanas 0 días y la fecha probable es la semana 40.",
    pt: "Regra de Naegele: data provável = primeiro dia da última menstruação + 280 dias (40 semanas). Um ciclo diferente de 28 dias desloca a data pela diferença (ciclo de 30 → +2 dias). A idade gestacional conta a partir da DUM: o dia 0 é 0 semanas 0 dias e a data provável é a semana 40.",
    fr: "Règle de Naegele : date prévue = premier jour des dernières règles + 280 jours (40 semaines). Un cycle autre que 28 jours décale la date de la différence (cycle de 30 → +2 jours). L'âge gestationnel se compte depuis les dernières règles : le jour 0 est 0 semaine 0 jour et la date prévue correspond à la semaine 40.",
    de: "Naegele-Regel: Termin = erster Tag der letzten Periode + 280 Tage (40 Wochen). Ein Zyklus anders als 28 Tage verschiebt das Datum um die Differenz (30-Tage-Zyklus → +2 Tage). Das Gestationsalter zählt ab der letzten Periode: Tag 0 ist 0 Wochen 0 Tage, der Termin entspricht Woche 40.",
    ru: "Правило Негеле: дата родов = первый день последней менструации + 280 дней (40 недель). Цикл, отличный от 28 дней, сдвигает дату на разницу (цикл 30 дней → +2 дня). Гестационный возраст считается от последней менструации: день 0 — 0 недель 0 дней, срок родов — 40-я неделя.",
    it: "Regola di Naegele: data presunta = primo giorno dell'ultima mestruazione + 280 giorni (40 settimane). Un ciclo diverso da 28 giorni sposta la data della differenza (ciclo di 30 → +2 giorni). L'età gestazionale conta dall'ultima mestruazione: il giorno 0 è 0 settimane 0 giorni e la data presunta è la settimana 40.",
    tr: "Naegele kuralı: tahmini tarih = son adetin ilk günü + 280 gün (40 hafta). 28 gün olmayan bir döngü tarihi fark kadar kaydırır (30 günlük döngü → +2 gün). Gebelik haftası son adetten sayılır: 0. gün 0 hafta 0 gündür, tahmini tarih 40. haftaya denk gelir.",
    ko: "네겔 법칙: 출산 예정일 = 마지막 월경 첫날 + 280일(40주). 주기가 28일이 아니면 그 차이만큼 날짜가 이동합니다(30일 주기 → +2일). 임신 주수는 마지막 월경부터 계산하며, 0일은 임신 0주 0일, 예정일은 40주에 해당합니다.",
    ar: "قاعدة نيجيل: تاريخ الولادة = أول يوم للدورة الأخيرة + 280 يومًا (40 أسبوعًا). الدورة غير 28 يومًا تزيح التاريخ بالفرق (دورة 30 يومًا → +2 يوم). يُحسب عمر الحمل من الدورة الأخيرة: اليوم 0 هو 0 أسبوع 0 يوم، والموعد يقابل الأسبوع 40.",
    hi: "नेगेले नियम: प्रसव तिथि = अंतिम मासिक धर्म का पहला दिन + 280 दिन (40 सप्ताह)। 28 दिन से अलग चक्र तिथि को अंतर से खिसकाता है (30 दिन का चक्र → +2 दिन)। गर्भकालीन आयु अंतिम मासिक धर्म से गिनी जाती है: दिन 0 = 0 सप्ताह 0 दिन, प्रसव तिथि 40वाँ सप्ताह है।",
    id: "Aturan Naegele: tanggal persalinan = hari pertama haid terakhir + 280 hari (40 minggu). Siklus selain 28 hari menggeser tanggal selisihnya (siklus 30 hari → +2 hari). Usia kehamilan dihitung dari haid terakhir: hari 0 adalah 0 minggu 0 hari dan tanggal persalinan adalah minggu ke-40.",
    vi: "Quy tắc Naegele: ngày dự sinh = ngày đầu kỳ kinh gần nhất + 280 ngày (40 tuần). Chu kỳ khác 28 ngày sẽ dịch ngày dự sinh theo chênh lệch (chu kỳ 30 ngày → +2 ngày). Tuổi thai tính từ kỳ kinh gần nhất: ngày 0 là 0 tuần 0 ngày và ngày dự sinh ứng với tuần 40.",
  },
  honesty: {
    en: "The due date is an estimate, not a deadline: about half of births happen within a week either side of it, and any birth between week 37 and week 42 is considered full term. The calculation assumes a regular cycle and ovulation two weeks before the next period; ultrasound dating or IVF timing can move the date. This is not medical advice — your prenatal care provider tracks the official estimate.",
    zh: "预产期是估计值,不是截止日:约一半的婴儿在预产期前后一周内出生,孕 37–42 周之间出生都算足月。本计算假设周期规律、排卵在下次月经前约两周;B 超测龄或试管婴儿的移植日期都可能使预产期移动。本工具不构成医疗建议,正式孕周以产检医生的核算为准。",
    ja: "出産予定日は推定であり、期日ではありません。出生の約半数は予定日の前後 1 週間以内で、妊娠 37〜42 週の出産はすべて正期産とみなされます。計算は周期が規則的で排卵が次回月経の約 2 週間前にあるとの前提です。超音波測定や体外受精の移植日により予定日は変わります。医療上の助言ではありません。正式な週数は産科医の判定によります。",
    es: "La fecha probable es una estimación, no un plazo: cerca de la mitad de los partos ocurren en la semana anterior o posterior, y se considera a término cualquier nacimiento entre las semanas 37 y 42. El cálculo asume un ciclo regular y ovulación unas dos semanas antes de la siguiente regla; la ecografía o la fecha de transferencia en FIV pueden moverla. No es consejo médico: el seguimiento oficial lo hace su matrona o ginecólogo.",
    pt: "A data provável é uma estimativa, não um prazo: cerca de metade dos partos acontece até uma semana antes ou depois, e qualquer nascimento entre a semana 37 e a 42 é considerado a termo. O cálculo assume ciclo regular e ovulação duas semanas antes da próxima menstruação; ultrassom ou a data de transferência em FIV podem mudá-la. Não é conselho médico — o acompanhamento oficial cabe ao seu obstetra.",
    fr: "La date prévue est une estimation, pas une échéance : environ la moitié des naissances ont lieu dans la semaine qui précède ou suit, et tout accouchement entre 37 et 42 semaines est considéré à terme. Le calcul suppose un cycle régulier et une ovulation deux semaines avant les règles suivantes ; l'échographie ou la date de transfert en FIV peuvent la déplacer. Ceci n'est pas un avis médical — le suivi officiel appartient à votre sage-femme ou médecin.",
    de: "Der Termin ist eine Schätzung, keine Frist: rund die Hälfte aller Geburten liegt innerhalb einer Woche davor oder danach, und jede Geburt zwischen Woche 37 und 42 gilt als termingerecht. Die Rechnung geht von einem regelmäßigen Zyklus und einem Eisprung zwei Wochen vor der nächsten Periode aus; Ultraschall oder der Transfertermin bei IVF können das Datum verschieben. Kein medizinischer Rat — den offiziellen Verlauf bestimmt Ihre Frauenärztin.",
    ru: "Предполагаемая дата — это оценка, а не срок: около половины родов происходит в пределах недели до или после, и любые роды между 37-й и 42-й неделями считаются доношенными. Расчёт предполагает регулярный цикл и овуляцию за две недели до следующей менструации; УЗИ или дата переноса при ЭКО могут сдвинуть дату. Это не медицинская консультация — официальный срок ведёт ваш врач.",
    it: "La data presunta è una stima, non una scadenza: circa la metà dei parti avviene entro una settimana prima o dopo, e qualsiasi nascita tra la 37ª e la 42ª settimana è considerata a termine. Il calcolo presuppone un ciclo regolare e un'ovulazione due settimane prima delle mestruazioni successive; l'ecografia o la data di transfer in PMA possono spostarla. Non è un consiglio medico — il calcolo ufficiale spetta al ginecologo.",
    tr: "Tahmini tarih bir tahmindir, son teslim tarihi değildir: doğumların yaklaşık yarısı bir hafta önce ya da sonra gerçekleşir ve 37–42. haftalar arasındaki her doğum miadında sayılır. Hesap, düzenli bir döngü ve bir sonraki adetten iki hafta önce yumurtlama varsayar; ultrason veya tüp bebek transfer tarihi bu tarihi değiştirebilir. Bu tıbbi tavsiye değildir — resmi takibi doğum uzmanınız yapar.",
    ko: "출산 예정일은 추정값이지 기한이 아닙니다. 출산의 약 절반이 예정일 전후 1주 이내에 일어나고, 임신 37~42주 사이의 출산은 모두 만기 출산으로 봅니다. 계산은 주기가 규칙적이고 배란이 다음 월경 약 2주 전에 일어난다는 가정에 기반하며, 초음파 측정이나 시험관아기 이식 날짜에 따라 달라질 수 있습니다. 의학적 조언이 아니며, 공식 주수는 진료 의사가 관리합니다.",
    ar: "تاريخ الولادة المتوقع تقدير وليس موعدًا نهائيًا: نحو نصف الولادات تحدث في الأسبوع قبله أو بعده، وكل ولادة بين الأسبوع 37 والأسبوع 42 تُعد حملًا كامل الأمد. يفترض الحساب دورة منتظمة وإباضة قبل الدورة التالية بأسبوعين؛ وتحديد السونار أو تاريخ نقل الطفل بالأنابيب قد يغيّره. هذه ليست نصيحة طبية — المتابعة الرسمية لدى طبيب متابعة الحمل.",
    hi: "प्रसव तिथि एक अनुमान है, समय-सीमा नहीं: लगभग आधे जन्म इससे एक सप्ताह पहले या बाद होते हैं, और 37 से 42 सप्ताह के बीच कोई भी जन्म पूर्ण अवधि का माना जाता है। गणना नियमित चक्र और अगली मासिक धर्म से लगभग दो सप्ताह पहले अंडाणु विमोचन मानती है; अल्ट्रासाउंड या IVF ट्रांसफर तिथि इसे खिसका सकती है। यह चिकित्सा सलाह नहीं है — आधिकारिक गर्भकाल आपकी डॉक्टर देखती है।",
    id: "Tanggal persalinan adalah perkiraan, bukan tenggat: sekitar separuh kelahiran terjadi dalam rentang satu minggu sebelum atau sesudahnya, dan setiap kelahiran antara minggu 37 hingga 42 dianggap cukup bulan. Perhitungan mengasumsikan siklus teratur dan ovulasi dua minggu sebelum haid berikutnya; penetapan usia lewat ultrasonografi atau tanggal transfer bayi tabung dapat menggesernya. Ini bukan nasihat medis — perkiraan resmi ditetapkan oleh bidan atau dokter kandungan Anda.",
    vi: "Ngày dự sinh là ước tính, không phải thời hạn: khoảng một nửa số ca sinh nằm trong vòng một tuần trước hoặc sau, và sinh bất kỳ lúc nào từ tuần 37 đến tuần 42 đều được xem là đủ tháng. Phép tính giả định chu kỳ đều và rụng trứng hai tuần trước kỳ kinh tiếp theo; siêu âm đo tuổi thai hoặc ngày chuyển phôi IVF có thể thay đổi ngày này. Đây không phải tư vấn y khoa — theo dõi chính thức do bác sĩ sản phụ khoa thực hiện.",
  },
  future: {
    en: "The LMP date you entered is after today, so a gestational age cannot be shown yet. The due date below still follows from the rule.",
    zh: "你输入的末次月经晚于今天,暂时无法显示孕周。下方预产期仍按规则给出。",
    ja: "入力された最終月経は今日以降のため、妊娠週数はまだ表示できません。下の出産予定日は規則に従って計算されています。",
    es: "La FUR introducida es posterior a hoy, así que aún no se puede mostrar la edad gestacional. La fecha probable de abajo sigue la regla igualmente.",
    pt: "A DUM informada é posterior a hoje, então a idade gestacional ainda não pode ser exibida. A data provável abaixo segue a regra normalmente.",
    fr: "La date des dernières règles saisie est postérieure à aujourd'hui : l'âge gestationnel ne peut pas encore être affiché. La date prévue ci-dessous reste calculée par la règle.",
    de: "Das eingegebene Datum der letzten Periode liegt nach heute, daher kann das Gestationsalter noch nicht angezeigt werden. Der Termin unten folgt dennoch der Regel.",
    ru: "Указанная дата последней менструации позже сегодняшней, поэтому гестационный возраст пока не показан. Дата родов ниже всё равно рассчитана по правилу.",
    it: "La data dell'ultima mestruazione inserita è successiva a oggi, quindi l'età gestazionale non può ancora essere mostrata. La data presunta sotto segue comunque la regola.",
    tr: "Girdiğiniz son adet tarihi bugünden sonradır, bu yüzden gebelik haftası henüz gösterilemiyor. Aşağıdaki tahmini tarih yine de kurala göre hesaplanır.",
    ko: "입력한 마지막 월경일이 오늘 이후라 임신 주수를 아직 표시할 수 없습니다. 아래 출산 예정일은 규칙에 따라 계산됩니다.",
    ar: "تاريخ الدورة الأخيرة المُدخل بعد اليوم، لذا لا يمكن عرض عمر الحمل بعد. تاريخ الولادة أدناه ما زال محسوبًا وفق القاعدة.",
    hi: "आपने जो अंतिम मासिक धर्म तिथि दर्ज की है वह आज के बाद है, इसलिए गर्भकालीन आयु अभी नहीं दिखाई जा सकती। नीचे प्रसव तिथि फिर भी नियम से बनी है।",
    id: "Tanggal haid terakhir yang dimasukkan setelah hari ini, jadi usia kehamilan belum bisa ditampilkan. Tanggal persalinan di bawah tetap dihitung dengan aturan tersebut.",
    vi: "Ngày kinh gần nhất bạn nhập muộn hơn hôm nay nên chưa hiển thị được tuổi thai. Ngày dự sinh bên dưới vẫn tính theo quy tắc.",
  },
};

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

function isoToday(): string {
  const t = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${p(t.getMonth() + 1)}-${p(t.getDate())}`;
}

function longDate(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(INTL_LOCALES[locale] ?? INTL_LOCALES.en, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export function CalcEngineDueDate() {
  const { locale } = useI18n();
  const [lmp, setLmp] = useState("");
  const [cycle, setCycle] = useState("28");
  const [today, setToday] = useState("");

  useEffect(() => {
    // 客户端挂载后:今天 + 一个 20 周前的示例 LMP(默认态即为"孕 20 周"附近)
    setToday(isoToday());
    const d = new Date();
    d.setDate(d.getDate() - 140); // 20 weeks before today
    const p = (n: number) => String(n).padStart(2, "0");
    setLmp(`${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`);
  }, []);

  const cycleN = num(cycle);

  const res = useMemo(() => dueDateFromLmp(lmp, Number.isInteger(cycleN) ? cycleN : NaN), [lmp, cycleN]);
  const age = useMemo(
    () => (today && res ? gestationalAgeAt(lmp, today) : null),
    [lmp, today, res],
  );

  const triLabel = age ? pick(locale, age.trimester === 1 ? S.tri1 : age.trimester === 2 ? S.tri2 : S.tri3) : "—";
  const dueIn = age
    ? age.daysUntilDue > 0
      ? `${age.daysUntilDue} ${pick(locale, S.days)}`
      : age.daysUntilDue === 0
        ? pick(locale, S.dueToday)
        : fill(pick(locale, S.overdue), { n: -age.daysUntilDue })
    : "—";

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.lmp)}>
          <input
            type="date"
            className="field mono"
            value={lmp}
            onChange={(e) => setLmp(e.target.value)}
            aria-label={pick(locale, S.lmp)}
          />
        </Field>
        <Field label={pick(locale, S.cycle)}>
          <NumIn value={cycle} onChange={setCycle} aria="cycle length in days" />
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.due), value: res ? longDate(res.due, locale) : "—", tone: "accent" },
            {
              label: pick(locale, S.gestAge),
              value: age
                ? `${age.weeks} ${pick(locale, S.weeks)} ${age.remainderDays} ${pick(locale, S.days)}`
                : "—",
              tone: "good",
            },
            { label: pick(locale, S.daysToGo), value: dueIn },
            { label: pick(locale, S.trimester), value: triLabel },
          ]}
        />
      </div>

      {res && (
        <div className="mt-3 rounded-xl border hairline px-4 py-3.5">
          <span className="text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.termWindow)}</span>
          <p className="mt-1 text-[15px]">
            {longDate(res.termStart, locale)} — {longDate(res.termEnd, locale)}
          </p>
        </div>
      )}

      <div className="mt-3">
        <Note>{pick(locale, S.formula)}</Note>
        {age === null && res && today && lmp > today && (
          <p className="mt-2 text-[13px] leading-5 text-[var(--color-bad)]">{pick(locale, S.future)}</p>
        )}
        <p className="mt-2 text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, S.honesty)}</p>
      </div>
    </ToolPanel>
  );
}
