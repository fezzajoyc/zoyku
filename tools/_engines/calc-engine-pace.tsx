"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, Tabs, TableBox, fmt, pick } from "./calc-ui";
import { KM_PER_MI, RACE_DISTANCES, formatDuration, paceFor, riegelPredict } from "../_lib/pace";

/**
 * 跑步配速引擎:配速/速度计算 + Riegel 公式竞赛预测。
 * 数学全部在 tools/_lib/pace.ts,这里只做 UI 编排。
 */

const S = {
  pace: { en: "Pace", zh: "配速", ja: "ペース", es: "Ritmo", pt: "Ritmo", fr: "Allure", de: "Tempo", ru: "Темп", it: "Ritmo", tr: "Tempo", ko: "페이스", ar: "الإيقاع", hi: "पेस", id: "Kehendakan", vi: "Pace" },
  predict: { en: "Race predictor", zh: "比赛成绩预测", ja: "レース予測", es: "Predicción de carrera", pt: "Previsão de prova", fr: "Prédicteur de course", de: "Renndauer-Prognose", ru: "Прогноз забега", it: "Predittore di gara", tr: "Yarış tahmini", ko: "레이스 예측", ar: "توقّع السباق", hi: "रेस पूर्वानुमान", id: "Prediksi balapan", vi: "Dự đoán chặng đua" },
  distance: { en: "Distance", zh: "距离", ja: "距離", es: "Distancia", pt: "Distância", fr: "Distance", de: "Distanz", ru: "Дистанция", it: "Distanza", tr: "Mesafe", ko: "거리", ar: "المسافة", hi: "दूरी", id: "Jarak", vi: "Quãng đường" },
  d5k: { en: "5K", zh: "5 公里", ja: "5 km", es: "5 km", pt: "5 km", fr: "5 km", de: "5 km", ru: "5 км", it: "5 km", tr: "5K", ko: "5km", ar: "5 كم", hi: "5K", id: "5K", vi: "5K" },
  d10k: { en: "10K", zh: "10 公里", ja: "10 km", es: "10 km", pt: "10 km", fr: "10 km", de: "10 km", ru: "10 км", it: "10 km", tr: "10K", ko: "10km", ar: "10 كم", hi: "10K", id: "10K", vi: "10K" },
  dhm: { en: "Half marathon", zh: "半程马拉松", ja: "ハーフマラソン", es: "Media maratón", pt: "Meia maratona", fr: "Semi-marathon", de: "Halbmarathon", ru: "Полумарафон", it: "Mezza maratona", tr: "Yarı maraton", ko: "하프 마라톤", ar: "نصف ماراثون", hi: "हाफ़ मैराथन", id: "Setengah maraton", vi: "Nửa marathon" },
  dmarathon: { en: "Marathon", zh: "全程马拉松", ja: "フルマラソン", es: "Maratón", pt: "Maratona", fr: "Marathon", de: "Marathon", ru: "Марафон", it: "Maratona", tr: "Maraton", ko: "마라톤", ar: "ماراثون", hi: "मैराथन", id: "Maraton", vi: "Marathon" },
  dcustom: { en: "Custom", zh: "自定义", ja: "カスタム", es: "Personalizada", pt: "Personalizada", fr: "Personnalisé", de: "Benutzerdefiniert", ru: "Своё", it: "Personalizzato", tr: "Özel", ko: "직접 입력", ar: "مخصص", hi: "कस्टम", id: "Kustom", vi: "Tùy chọn" },
  km: { en: "km", zh: "公里", ja: "km", es: "km", pt: "km", fr: "km", de: "km", ru: "км", it: "km", tr: "km", ko: "km", ar: "كم", hi: "किमी", id: "km", vi: "km" },
  mi: { en: "miles", zh: "英里", ja: "マイル", es: "millas", pt: "milhas", fr: "miles", de: "Meilen", ru: "мили", it: "miglia", tr: "mil", ko: "마일", ar: "أميال", hi: "मील", id: "mil", vi: "dặm" },
  hours: { en: "Hours", zh: "时", ja: "時", es: "Horas", pt: "Horas", fr: "Heures", de: "Stunden", ru: "Часы", it: "Ore", tr: "Saat", ko: "시간", ar: "ساعات", hi: "घंटे", id: "Jam", vi: "Giờ" },
  minutes: { en: "Minutes", zh: "分", ja: "分", es: "Minutos", pt: "Minutos", fr: "Minutes", de: "Minuten", ru: "Минуты", it: "Minuti", tr: "Dakika", ko: "분", ar: "دقائق", hi: "मिनट", id: "Menit", vi: "Phút" },
  seconds: { en: "Seconds", zh: "秒", ja: "秒", es: "Segundos", pt: "Segundos", fr: "Secondes", de: "Sekunden", ru: "Секунды", it: "Secondi", tr: "Saniye", ko: "초", ar: "ثوانٍ", hi: "सेकंड", id: "Detik", vi: "Giây" },
  perKm: { en: "Pace per kilometer", zh: "每公里配速", ja: "1 km のペース", es: "Ritmo por kilómetro", pt: "Ritmo por quilômetro", fr: "Allure au km", de: "Tempo pro km", ru: "Темп на км", it: "Ritmo al km", tr: "km başına tempo", ko: "km당 페이스", ar: "الإيقاع لكل كم", hi: "प्रति किमी पेस", id: "Tempo per km", vi: "Pace mỗi km" },
  perMi: { en: "Pace per mile", zh: "每英里配速", ja: "1 マイルのペース", es: "Ritmo por milla", pt: "Ritmo por milha", fr: "Allure au mile", de: "Tempo pro Meile", ru: "Темп на милю", it: "Ritmo al miglio", tr: "mil başına tempo", ko: "마일당 페이스", ar: "الإيقاع لكل ميل", hi: "प्रति मील पेस", id: "Tempo per mil", vi: "Pace mỗi dặm" },
  speedKmh: { en: "Speed (km/h)", zh: "速度(公里/小时)", ja: "速度(km/時)", es: "Velocidad (km/h)", pt: "Velocidade (km/h)", fr: "Vitesse (km/h)", de: "Geschwindigkeit (km/h)", ru: "Скорость (км/ч)", it: "Velocità (km/h)", tr: "Hız (km/s)", ko: "속도(km/h)", ar: "السرعة (كم/س)", hi: "गति (किमी/घं)", id: "Kecepatan (km/j)", vi: "Tốc độ (km/h)" },
  speedMph: { en: "Speed (mph)", zh: "速度(英里/小时)", ja: "速度(マイル/時)", es: "Velocidad (mph)", pt: "Velocidade (mph)", fr: "Vitesse (mph)", de: "Geschwindigkeit (mph)", ru: "Скорость (миль/ч)", it: "Velocità (mph)", tr: "Hız (mph)", ko: "속도(mph)", ar: "السرعة (ميل/س)", hi: "गति (मील/घं)", id: "Kecepatan (mph)", vi: "Tốc độ (mph)" },
  target: { en: "Target race", zh: "目标比赛", ja: "目標レース", es: "Carrera objetivo", pt: "Prova alvo", fr: "Course cible", de: "Zielrennen", ru: "Целевой забег", it: "Gara obiettivo", tr: "Hedef yarış", ko: "목표 레이스", ar: "السباق المستهدف", hi: "लक्ष्य रेस", id: "Balapan target", vi: "Chặng đua mục tiêu" },
  predicted: { en: "Predicted time", zh: "预测完赛时间", ja: "予測タイム", es: "Tiempo previsto", pt: "Tempo previsto", fr: "Temps prédit", de: "Prognostizierte Zeit", ru: "Прогноз времени", it: "Tempo previsto", tr: "Tahmin edilen süre", ko: "예상 시간", ar: "الوقت المتوقع", hi: "अनुमानित समय", id: "Waktu prediksi", vi: "Thời gian dự đoán" },
  tableDist: { en: "Race", zh: "比赛", ja: "レース", es: "Carrera", pt: "Prova", fr: "Course", de: "Rennen", ru: "Забег", it: "Gara", tr: "Yarış", ko: "레이스", ar: "السباق", hi: "रेस", id: "Balapan", vi: "Chặng đua" },
  tableTime: { en: "Predicted time", zh: "预测时间", ja: "予測タイム", es: "Tiempo previsto", pt: "Tempo previsto", fr: "Temps prédit", de: "Prognostizierte Zeit", ru: "Прогноз времени", it: "Tempo previsto", tr: "Tahmin edilen süre", ko: "예상 시간", ar: "الوقت المتوقع", hi: "अनुमानित समय", id: "Waktu prediksi", vi: "Thời gian dự đoán" },
  tablePace: { en: "Pace /km", zh: "配速/公里", ja: "ペース/km", es: "Ritmo/km", pt: "Ritmo/km", fr: "Allure /km", de: "Tempo /km", ru: "Темп /км", it: "Ritmo /km", tr: "Tempo /km", ko: "페이스 /km", ar: "الإيقاع /كم", hi: "पेस /किमी", id: "Tempo /km", vi: "Pace /km" },
  needBoth: {
    en: "Enter a distance greater than zero and a time above 0:00 to see results.",
    zh: "请输入大于 0 的距离和一个不为 0 的用时。",
    ja: "0 より大きい距離と 0 以外のタイムを入力してください。",
    es: "Introduzca una distancia mayor que cero y un tiempo distinto de 0:00.",
    pt: "Informe uma distância maior que zero e um tempo diferente de 0:00.",
    fr: "Saisissez une distance supérieure à zéro et un temps au-dessus de 0:00 pour voir les résultats.",
    de: "Für Ergebnisse eine Distanz über null und eine Zeit über 0:00 eingeben.",
    ru: "Для результатов введите дистанцию больше нуля и время выше 0:00.",
    it: "Inserisci una distanza maggiore di zero e un tempo sopra 0:00 per vedere i risultati.",
    tr: "Sonuçları görmek için sıfırdan büyük mesafe ve 0:00 üstü süre girin.",
    ko: "결과를 보려면 0보다 큰 거리와 0:00을 넘는 시간을 입력하세요.",
    ar: "أدخل مسافة أكبر من صفر ووقتًا يتجاوز 0:00 لعرض النتائج.",
    hi: "परिणाम देखने के लिए शून्य से बड़ी दूरी और 0:00 से ऊपर समय दर्ज करें।",
    id: "Masukkan jarak di atas nol dan waktu di atas 0:00 untuk melihat hasil.",
    vi: "Nhập quãng đường lớn hơn 0 và thời gian trên 0:00 để xem kết quả.",
  },
  riegelNote: {
    en: "Prediction uses Peter Riegel's formula T₂ = T₁ × (D₂/D₁)^1.06, published in Runner's World (1977). It assumes similar training for both distances.",
    zh: "预测采用 Peter Riegel 公式 T₂ = T₁ × (D₂/D₁)^1.06(1977 年发表于 Runner's World)。前提是两种距离的训练量相当。",
    ja: "予測は Peter Riegel の式 T₂ = T₁ × (D₂/D₁)^1.06(Runner's World、1977 年)を使用します。両方の距離で同程度のトレーニングができているのが前提です。",
    es: "La predicción usa la fórmula de Peter Riegel T₂ = T₁ × (D₂/D₁)^1.06, publicada en Runner's World (1977). Supone un entrenamiento similar para ambas distancias.",
    pt: "A previsão usa a fórmula de Peter Riegel T₂ = T₁ × (D₂/D₁)^1.06, publicada na Runner's World (1977). pressupõe treino equivalente para as duas distâncias.",
    fr: "La prédiction utilise la formule de Peter Riegel T₂ = T₁ × (D₂/D₁)^1,06, publiée dans Runner's World en 1977. Elle suppose un entraînement régulier ; les écarts croissent au-delà du doublement de distance.",
    de: "Die Prognose nutzt Peter Riegels Formel T₂ = T₁ × (D₂/D₁)^1,06 (Runner's World, 1977). Sie setzt regelmäßiges Training voraus; Abweichungen wachsen über die Verdopplung der Distanz hinaus.",
    ru: "Прогноз использует формулу Питера Ригеля T₂ = T₁ × (D₂/D₁)^1,06 (Runner's World, 1977). Предполагается регулярные тренировки; расхождения растут за пределами удвоения дистанции.",
    it: "La previsione usa la formula di Peter Riegel T₂ = T₁ × (D₂/D₁)^1,06, pubblicata su Runner's World nel 1977. Presuppone allenamento regolare; gli scarti crescono oltre il raddoppio della distanza.",
    tr: "Tahmin, 1977'de Runner's World'de yayımlanan Peter Riegel formülü T₂ = T₁ × (D₂/D₁)^1,06 kullanır. Düzenli antrenman varsayar; mesafe ikiye katlanınca sapmalar artar.",
    ko: "예측은 1977년 Runner's World에 발표된 Peter Riegel 공식 T₂ = T₁ × (D₂/D₁)^1.06을 사용합니다. 규칙적 훈련을 전제로 하며, 거리가 두 배를 넘어설수록 오차가 커집니다.",
    ar: "تستخدم التنبؤ صيغة بيتر ريغل T₂ = T₁ × (D₂/D₁)^1.06 المنشورة في Runner's World عام 1977. تفترض تدريبًا منتظمًا؛ وتزيد الفروقات عند مضاعفة المسافة.",
    hi: "पूर्वानुमान Peter Riegel का सूत्र T₂ = T₁ × (D₂/D₁)^1.06 (Runner's World, 1977) उपयोग करता है। नियमित प्रशिक्षण मानता है; दूरी दोगुने से ऊपर बढ़ने पर अंतर बढ़ता है।",
    id: "Prediksi memakai rumus Peter Riegel T₂ = T₁ × (D₂/D₁)^1,06 (Runner's World, 1977). Mengasumsikan latihan rutin; deviasi tumbuh saat jarak lebih dari dua kali lipat.",
    vi: "Dự đoán dùng công thức Peter Riegel T₂ = T₁ × (D₂/D₁)^1,06 đăng trên Runner's World 1977. Giả định tập luyện đều đặn; sai lệch tăng khi quãng đường vượt gấp đôi.",
  },
};

const RACE_OPTIONS = ["5k", "10k", "hm", "marathon"] as const;
type RaceKey = (typeof RACE_OPTIONS)[number] | "custom";

export function CalcEnginePace() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("pace");
  const [preset, setPreset] = useState<RaceKey>("10k");
  const [custom, setCustom] = useState("10");
  const [unit, setUnit] = useState("km");
  const [h, setH] = useState("0");
  const [m, setM] = useState("50");
  const [s, setS] = useState("0");

  const distLabel = (key: RaceKey): string =>
    key === "custom"
      ? pick(locale, S.dcustom)
      : key === "5k"
        ? pick(locale, S.d5k)
        : key === "10k"
          ? pick(locale, S.d10k)
          : key === "hm"
            ? pick(locale, S.dhm)
            : pick(locale, S.dmarathon);

  const distanceKm = useMemo(() => {
    if (preset !== "custom") return RACE_DISTANCES[preset];
    const raw = Number(custom);
    if (!Number.isFinite(raw) || raw <= 0) return NaN;
    return unit === "mi" ? raw * KM_PER_MI : raw;
  }, [preset, custom, unit]);

  const totalSec = useMemo(() => {
    const hh = Number(h), mm = Number(m), ss = Number(s);
    if (![hh, mm, ss].every(Number.isFinite)) return NaN;
    return hh * 3600 + mm * 60 + ss;
  }, [h, m, s]);

  const valid = Number.isFinite(distanceKm) && distanceKm > 0 && Number.isFinite(totalSec) && totalSec > 0;
  const pace = paceFor(distanceKm, totalSec);
  const summary = valid
    ? `${distLabel(preset)} ${formatDuration(totalSec)} — ${formatDuration(pace.secPerKm)}/km`
    : "";

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "pace", label: pick(locale, S.pace) },
          { id: "predict", label: pick(locale, S.predict) },
        ]}
        value={mode}
        onChange={setMode}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, S.distance)}>
          <Sel value={preset} onChange={(v) => setPreset(v as RaceKey)} aria={pick(locale, S.distance)}>
            {RACE_OPTIONS.map((k) => (
              <option key={k} value={k}>
                {distLabel(k)}
              </option>
            ))}
            <option value="custom">{pick(locale, S.dcustom)}</option>
          </Sel>
        </Field>
        {preset === "custom" && (
          <>
            <Field label={`${pick(locale, S.distance)} (${unit === "mi" ? pick(locale, S.mi) : pick(locale, S.km)})`}>
              <NumIn value={custom} onChange={setCustom} aria={pick(locale, S.distance)} placeholder="10" />
            </Field>
            <Field label={pick(locale, { en: "Unit", zh: "单位", ja: "単位", es: "Unidad", pt: "Unidade", fr: "Unité", de: "Einheit", ru: "Единица", it: "Unità", tr: "Birim", ko: "단위", ar: "الوحدة", hi: "इकाई", id: "Satuan", vi: "Đơn vị" })}>
              <Sel value={unit} onChange={setUnit} aria="unit">
                <option value="km">{pick(locale, S.km)}</option>
                <option value="mi">{pick(locale, S.mi)}</option>
              </Sel>
            </Field>
          </>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, S.hours)}>
          <NumIn value={h} onChange={setH} aria={pick(locale, S.hours)} placeholder="0" />
        </Field>
        <Field label={pick(locale, S.minutes)}>
          <NumIn value={m} onChange={setM} aria={pick(locale, S.minutes)} placeholder="50" />
        </Field>
        <Field label={pick(locale, S.seconds)}>
          <NumIn value={s} onChange={setS} aria={pick(locale, S.seconds)} placeholder="0" />
        </Field>
      </div>

      {!valid ? (
        <div className="mt-5">
          <Note>{pick(locale, S.needBoth)}</Note>
        </div>
      ) : mode === "pace" ? (
        <>
          <div className="mt-5">
            <Stats
              items={[
                { label: pick(locale, S.perKm), value: formatDuration(pace.secPerKm), tone: "accent" },
                { label: pick(locale, S.perMi), value: formatDuration(pace.secPerMi) },
                { label: pick(locale, S.speedKmh), value: fmt(pace.kmh, locale, 2) },
                { label: pick(locale, S.speedMph), value: fmt(pace.mph, locale, 2) },
              ]}
            />
          </div>
          <div className="mt-4">
            <CopyButton value={summary} label={pick(locale, { en: "Copy result", zh: "复制结果", ja: "結果をコピー", es: "Copiar resultado", pt: "Copiar resultado", fr: "Copier le résultat", de: "Ergebnis kopieren", ru: "Копировать результат", it: "Copia risultato", tr: "Sonucu kopyala", ko: "결과 복사", ar: "نسخ النتيجة", hi: "परिणाम कॉपी करें", id: "Salin hasil", vi: "Sao chép kết quả" })} />
          </div>
        </>
      ) : (
        <>
          <div className="mt-5">
            <TableBox
              head={[pick(locale, S.tableDist), pick(locale, S.tableTime), pick(locale, S.tablePace)]}
              rows={RACE_OPTIONS.map((k) => {
                const t = riegelPredict(totalSec, distanceKm, RACE_DISTANCES[k]);
                return [distLabel(k), formatDuration(t), formatDuration(t / RACE_DISTANCES[k])];
              })}
            />
          </div>
          <div className="mt-4">
            <Note>{pick(locale, S.riegelNote)}</Note>
          </div>
        </>
      )}
    </ToolPanel>
  );
}
