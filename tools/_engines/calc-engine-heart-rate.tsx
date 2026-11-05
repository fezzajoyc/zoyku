"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, Stats, Tabs, TableBox, fmt, pick } from "./calc-ui";
import { hrZones, maxHeartRate } from "../_lib/heart-rate";

/**
 * 心率训练区引擎:年龄估最大心率(Tanaka 一族回归式)或手输,
 * Karvonen 储备心率法切五区。数学在 tools/_lib/heart-rate.ts,这里只做 UI 编排。
 */

const S = {
  byAge: { en: "Estimate from age", zh: "按年龄估算", ja: "年齢から推定", es: "Estimar por edad", pt: "Estimar por idade", fr: "Estimer selon l'âge", de: "Aus Alter schätzen", ru: "Оценка по возрасту", it: "Stima dall'età", tr: "Yaştan tahmin et", ko: "나이로 추정", ar: "تقدير حسب العمر", hi: "उम्र से अनुमान", id: "Estimasi dari usia", vi: "Ước theo tuổi" },
  manual: { en: "Manual max HR", zh: "手动输入最大心率", ja: "最大心拍数を手入力", es: "FC máx. manual", pt: "FC máx. manual", fr: "FC max manuelle", de: "Max. Puls manuell", ru: "Макс. ЧСС вручную", it: "FC max manuale", tr: "Manuel maks. nabız", ko: "최대 심박수 직접 입력", ar: "إدخال الحد الأقصى يدويًا", hi: "अधिकतम HR मैन्युअल", id: "Detak maks manual", vi: "Nhập HR tối đa" },
  age: { en: "Age", zh: "年龄", ja: "年齢", es: "Edad", pt: "Idade", fr: "Âge", de: "Alter", ru: "Возраст", it: "Età", tr: "Yaş", ko: "나이", ar: "العمر", hi: "उम्र", id: "Usia", vi: "Tuổi" },
  resting: { en: "Resting heart rate (bpm)", zh: "静息心率(次/分)", ja: "安静時心拍数(bpm)", es: "Frecuencia en reposo (lpm)", pt: "Frequência em repouso (bpm)", fr: "FC de repos (bpm)", de: "Ruhepuls (bpm)", ru: "ЧСС покоя (уд/мин)", it: "FC a riposo (bpm)", tr: "Dinlenme nabzı (bpm)", ko: "안정 심박수(bpm)", ar: "معدل النبض أثناء الراحة (bpm)", hi: "विश्राम हृदय गति (bpm)", id: "Detak jantung istirahat (bpm)", vi: "Nhịp tim nghỉ (bpm)" },
  maxHr: { en: "Max heart rate (bpm)", zh: "最大心率(次/分)", ja: "最大心拍数(bpm)", es: "Frecuencia máx. (lpm)", pt: "Frequência máx. (bpm)", fr: "FC max (bpm)", de: "Max. Puls (bpm)", ru: "Макс. ЧСС (уд/мин)", it: "FC max (bpm)", tr: "Maks. nabız (bpm)", ko: "최대 심박수(bpm)", ar: "أقصى نبض (bpm)", hi: "अधिकतम हृदय गति (bpm)", id: "Detak jantung maks (bpm)", vi: "Nhịp tim tối đa (bpm)" },
  maxOut: { en: "Max heart rate", zh: "最大心率", ja: "最大心拍数", es: "FC máxima", pt: "FC máxima", fr: "FC max", de: "Maximalpuls", ru: "Макс. ЧСС", it: "FC max", tr: "Maks. nabız", ko: "최대 심박수", ar: "أقصى نبض", hi: "अधिकतम हृदय गति", id: "Detak jantung maks", vi: "Nhịp tim tối đa" },
  reserve: { en: "Heart-rate reserve", zh: "心率储备(HRR)", ja: "心拍数予備能(HRR)", es: "Reserva de FC (HRR)", pt: "Reserva de FC (HRR)", fr: "Réserve cardiaque", de: "Pulsreserve", ru: "Резерв ЧСС", it: "Riserva cardiaca", tr: "Nabız rezervi", ko: "심박수 예비력", ar: "احتياطي النبض", hi: "हृदय गति आरक्षित", id: "Cadangan detak jantung", vi: "Dự trữ nhịp tim" },
  zone: { en: "Zone", zh: "区间", ja: "ゾーン", es: "Zona", pt: "Zona", fr: "Zone", de: "Zone", ru: "Зона", it: "Zona", tr: "Bölge", ko: "구간", ar: "المنطقة", hi: "ज़ोन", id: "Zona", vi: "Vùng" },
  intensity: { en: "% of reserve", zh: "占储备 %", ja: "予備能に対する%", es: "% de reserva", pt: "% da reserva", fr: "% de la réserve", de: "% der Reserve", ru: "% от резерва", it: "% della riserva", tr: "Rezervin %'si", ko: "예비력의 %", ar: "% من الاحتياطي", hi: "आरक्षित का %", id: "% dari cadangan", vi: "% dự trữ" },
  bpmRange: { en: "Heart rate (bpm)", zh: "心率(次/分)", ja: "心拍数(bpm)", es: "Frecuencia (lpm)", pt: "Frequência (bpm)", fr: "Fréquence cardiaque (bpm)", de: "Herzfrequenz (bpm)", ru: "Пульс (уд/мин)", it: "Frequenza cardiaca (bpm)", tr: "Nabız (bpm)", ko: "심박수(bpm)", ar: "معدل النبض (bpm)", hi: "हृदय गति (bpm)", id: "Detak jantung (bpm)", vi: "Nhịp tim (bpm)" },
  z1: { en: "Z1 — Warm-up", zh: "Z1 — 热身", ja: "Z1 — ウォームアップ", es: "Z1 — Calentamiento", pt: "Z1 — Aquecimento", fr: "Z1 — Échauffement", de: "Z1 — Aufwärmen", ru: "Z1 — Разминка", it: "Z1 — Riscaldamento", tr: "Z1 — Isınma", ko: "Z1 — 워밍업", ar: "Z1 — تسخين", hi: "Z1 — वॉर्म-अप", id: "Z1 — Pemanasan", vi: "Z1 — Khởi động" },
  z2: { en: "Z2 — Fat burn", zh: "Z2 — 燃脂", ja: "Z2 — 脂肪燃焼", es: "Z2 — Quemagrasas", pt: "Z2 — Queima de gordura", fr: "Z2 — Combustion des graisses", de: "Z2 — Fettverbrennung", ru: "Z2 — Жиросжигание", it: "Z2 — Bruciore dei grassi", tr: "Z2 — Yağ yakımı", ko: "Z2 — 지방 연소", ar: "Z2 — حرق الدهون", hi: "Z2 — फैट बर्न", id: "Z2 — Pembakaran lemak", vi: "Z2 — Đốt mỡ" },
  z3: { en: "Z3 — Aerobic", zh: "Z3 — 有氧", ja: "Z3 — 有酸素", es: "Z3 — Aeróbica", pt: "Z3 — Aeróbica", fr: "Z3 — Aérobie", de: "Z3 — Aerob", ru: "Z3 — Аэробная", it: "Z3 — Aerobica", tr: "Z3 — Aerobik", ko: "Z3 — 유산소", ar: "Z3 — هوائي", hi: "Z3 — एरोबिक", id: "Z3 — Aerobik", vi: "Z3 — Hiếu khí" },
  z4: { en: "Z4 — Anaerobic", zh: "Z4 — 无氧", ja: "Z4 — 無酸素", es: "Z4 — Anaeróbica", pt: "Z4 — Anaeróbica", fr: "Z4 — Anaérobie", de: "Z4 — Anaerob", ru: "Z4 — Анаэробная", it: "Z4 — Anaerobica", tr: "Z4 — Anaerobik", ko: "Z4 — 무산소", ar: "Z4 — لاهوائي", hi: "Z4 — एनएरोबिक", id: "Z4 — Anaerobik", vi: "Z4 — Yếu khí" },
  z5: { en: "Z5 — VO₂ max", zh: "Z5 — 最大摄氧", ja: "Z5 — 最大酸素摂取量", es: "Z5 — VO₂ máx.", pt: "Z5 — VO₂ máx.", fr: "Z5 — VO₂ max", de: "Z5 — VO₂-max", ru: "Z5 — VO₂ макс", it: "Z5 — VO₂ max", tr: "Z5 — VO₂ maks", ko: "Z5 — 최대산섭취량", ar: "Z5 — الحد الأقصى للأكسجين", hi: "Z5 — VO₂ अधिकतम", id: "Z5 — VO₂ maks", vi: "Z5 — VO₂ tối đa" },
  invalid: {
    en: "Enter an age between 10 and 100 and a resting heart rate below your max heart rate.",
    zh: "请输入 10–100 之间的年龄,以及低于最大心率的静息心率。",
    ja: "10〜100 の年齢と、最大心拍数より低い安静時心拍数を入力してください。",
    es: "Introduzca una edad entre 10 y 100 y una frecuencia en reposo inferior a su FC máxima.",
    pt: "Informe uma idade entre 10 e 100 e uma frequência em repouso abaixo da sua FC máxima.",
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
  manualInvalid: {
    en: "Enter a max heart rate above 0 and a resting heart rate below it.",
    zh: "请输入大于 0 的最大心率,以及低于它的静息心率。",
    ja: "0 より大きい最大心拍数と、それより低い安静時心拍数を入力してください。",
    es: "Introduzca una FC máxima mayor que cero y una frecuencia en reposo inferior.",
    pt: "Informe uma FC máxima maior que zero e uma frequência em repouso abaixo dela.",
    fr: "Saisissez une fréquence cardiaque max supérieure à 0 et une FC de repos inférieure.",
    de: "Maximalpuls über 0 und Ruhepuls darunter eingeben.",
    ru: "Введите максимальный пульс больше 0 и пульс покоя ниже него.",
    it: "Inserisci una FC max maggiore di 0 e una FC a riposo inferiore.",
    tr: "Sıfırdan büyük bir maksimum nabız ve ondan düşük dinlenme nabzı girin.",
    ko: "0보다 큰 최대 심박수와 그보다 낮은 안정 심박수를 입력하세요.",
    ar: "أدخل معدلًا أقصى أكبر من 0 ومعدل راحة أقل منه.",
    hi: "0 से बड़ी अधिकतम HR और उससे कम विश्राम HR दर्ज करें।",
    id: "Masukkan detak maksimum di atas 0 dan detak istirahat di bawahnya.",
    vi: "Nhập HR tối đa lớn hơn 0 và HR nghỉ thấp hơn.",
  },
  karvonen: {
    en: "Zone bounds use the Karvonen method: bpm = resting + pct × (max − resting). The reserve (max − resting) is scaled, not the max itself, so zones stay honest for people with low or high resting heart rates.",
    zh: "区间用 Karvonen 储备心率法计算:心率 = 静息 + 百分比 × (最大 − 静息)。缩放的是储备(最大 − 静息)而不是最大心率本身,静息偏高或偏低的人得到的区间才不失真。",
    ja: "ゾーンは Karvonen の予備心拍数法で計算します:心拍数 = 安静時 + 割合 × (最大 − 安静時)。最大値そのものではなく予備能(最大 − 安静時)を振り分けるため、安静時が高め・低めの人でも Zone が歪みません。",
    es: "Los límites usan el método Karvonen: lpm = reposo + % × (máx − reposo). Se escala la reserva (máx − reposo), no la FC máxima, así las zonas son honestas con reposos altos o bajos.",
    pt: "Os limites usam o método de Karvonen: bpm = repouso + % × (máx − repouso). O que se escala é a reserva (máx − repouso), não a FC máxima, então as zonas ficam honestas para repousos altos ou baixos.",
    fr: "Les bornes de zone utilisent la méthode Karvonen : bpm = repos + pct × (max − repos). La réserve (max − repos) cible l'intensité réelle au-delà du repos.",
    de: "Zonengrenzen nach Karvonen: bpm = Ruhe + pct × (max − Ruhe). Die Reserve (max − Ruhe) zielt auf die tatsächliche Intensität über Ruhepuls.",
    ru: "Границы зон по методу Карвонена: ЧСС = покой + pct × (макс − покой). Резерв (макс − покой) таргетирует реальную интенсивность сверх покоя.",
    it: "I limiti di zona usano il metodo Karvonen: bpm = riposo + pct × (max − riposo). La riserva (max − riposo) punta all'intensità reale oltre il riposo.",
    tr: "Bölge sınırları Karvonen yöntemini kullanır: nabız = dinlenme + pct × (maks − dinlenme). Rezerv (maks − dinlenme) dinlenme ötesi gerçek yoğunluğu hedefler.",
    ko: "구간 경계는 Karvonen 방식입니다: bpm = 안정 + pct × (최대 − 안정). 예비율(최대 − 안정)은 안정 이상의 실제 강도를 목표로 합니다.",
    ar: "حدود المناطق تستخدم طريقة كارفونن: bpm = الراحة + pct × (الأقصى − الراحة). الاحتياطي (الأقصى − الراحة) يستهدف الشدة الفعلية فوق الراحة.",
    hi: "ज़ोन सीमाएँ Karvonen विधि उपयोग करती हैं: bpm = विश्राम + pct × (अधिकतम − विश्राम)। आरक्षित (अधिकतम − विश्राम) विश्राम से ऊपर की वास्तविक तीव्रता को लक्षित करता है।",
    id: "Batas zona memakai metode Karvonen: bpm = istirahat + pct × (maks − istirahat). Cadangan (maks − istirahat) menarget intensitas nyata di atas istirahat.",
    vi: "Ranh giới vùng dùng phương pháp Karvonen: bpm = nghỉ + pct × (tối đa − nghỉ). Phần dự trữ (tối đa − nghỉ) nhắm cường độ thực trên mức nghỉ.",
  },
};

const ZONE_LABELS = [S.z1, S.z2, S.z3, S.z4, S.z5];

export function CalcEngineHeartRate() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("age");
  const [age, setAge] = useState("30");
  const [resting, setResting] = useState("60");
  const [manualMax, setManualMax] = useState("185");

  const rest = Number(resting);
  const max = useMemo(
    () => (mode === "age" ? maxHeartRate(Number(age)) : Number(manualMax)),
    [mode, age, manualMax],
  );
  const zones = useMemo(() => hrZones(max, rest), [max, rest]);
  const valid = zones.length > 0;

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "age", label: pick(locale, S.byAge) },
          { id: "manual", label: pick(locale, S.manual) },
        ]}
        value={mode}
        onChange={setMode}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {mode === "age" ? (
          <Field label={pick(locale, S.age)}>
            <NumIn value={age} onChange={setAge} aria={pick(locale, S.age)} placeholder="30" />
          </Field>
        ) : (
          <Field label={pick(locale, S.maxHr)}>
            <NumIn value={manualMax} onChange={setManualMax} aria={pick(locale, S.maxHr)} placeholder="185" />
          </Field>
        )}
        <Field label={pick(locale, S.resting)}>
          <NumIn value={resting} onChange={setResting} aria={pick(locale, S.resting)} placeholder="60" />
        </Field>
      </div>

      {!valid ? (
        <div className="mt-5">
          <Note>{pick(locale, mode === "age" ? S.invalid : S.manualInvalid)}</Note>
        </div>
      ) : (
        <>
          <div className="mt-5">
            <Stats
              items={[
                { label: pick(locale, S.maxOut), value: fmt(max, locale, 1), tone: "accent" },
                { label: pick(locale, S.reserve), value: fmt(max - rest, locale, 1) },
              ]}
            />
          </div>
          <div className="mt-4">
            <TableBox
              head={[pick(locale, S.zone), pick(locale, S.intensity), pick(locale, S.bpmRange)]}
              rows={zones.map((z, i) => [
                pick(locale, ZONE_LABELS[i]),
                `${z.pctLow}–${z.pctHigh}%`,
                `${fmt(z.low, locale, 0)}–${fmt(z.high, locale, 0)}`,
              ])}
            />
          </div>
          <div className="mt-4">
            <Note>{pick(locale, S.karvonen)}</Note>
          </div>
        </>
      )}
    </ToolPanel>
  );
}
