"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import type { Locale } from "@/lib/site";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, Tabs, fmt, pick } from "./calc-ui";
import {
  ACTIVITY_FACTORS,
  CM_PER_INCH,
  KG_PER_LB,
  cmFromFtIn,
  bmr,
  calorieGoal,
  idealWeightRange,
  kgFromLb,
  navyBodyFat,
  tdee,
  waterIntake,
  type ActivityKey,
  type GoalKey,
  type Sex,
} from "../_lib/health";

/**
 * One engine for the health calculators: bmr, calorie, bodyfat,
 * idealweight, water. props.kind selects the tool. All math lives in
 * tools/_lib/health.ts (tested); this file only formats and lays out.
 */

const S: Record<string, Record<string, string>> = {
  metric: { en: "Metric", zh: "公制", ja: "メートル法", es: "Métrico", pt: "Métrico", fr: "Métrique", de: "Metrisch", ru: "Метрическая", it: "Metrico", tr: "Metrik", ko: "미터법", ar: "متري", hi: "मीट्रिक", id: "Metrik", vi: "Hệ mét" },
  imperial: { en: "Imperial", zh: "英制", ja: "ヤード・ポンド法", es: "Imperial", pt: "Imperial", fr: "Impérial", de: "Imperial", ru: "Имперская", it: "Imperiale", tr: "İngiliz", ko: "야드파운드법", ar: "إمبراطوري", hi: "इम्पीरियल", id: "Imperial", vi: "Hệ Anh" },
  male: { en: "Male", zh: "男", ja: "男性", es: "Hombre", pt: "Homem", fr: "Homme", de: "Männlich", ru: "Мужской", it: "Uomo", tr: "Erkek", ko: "남성", ar: "ذكر", hi: "पुरुष", id: "Laki-laki", vi: "Nam" },
  female: { en: "Female", zh: "女", ja: "女性", es: "Mujer", pt: "Mulher", fr: "Femme", de: "Weiblich", ru: "Женский", it: "Donna", tr: "Kadın", ko: "여성", ar: "أنثى", hi: "महिला", id: "Perempuan", vi: "Nữ" },
  sex: { en: "Sex", zh: "性别", ja: "性別", es: "Sexo", pt: "Sexo", fr: "Sexe", de: "Geschlecht", ru: "Пол", it: "Sesso", tr: "Cinsiyet", ko: "성별", ar: "الجنس", hi: "लिंग", id: "Jenis kelamin", vi: "Giới tính" },
  age: { en: "Age (years)", zh: "年龄(岁)", ja: "年齢(歳)", es: "Edad (años)", pt: "Idade (anos)", fr: "Âge (années)", de: "Alter (Jahre)", ru: "Возраст (лет)", it: "Età (anni)", tr: "Yaş (yıl)", ko: "나이(세)", ar: "العمر (سنوات)", hi: "उम्र (वर्ष)", id: "Usia (tahun)", vi: "Tuổi (năm)" },
  heightCm: { en: "Height (cm)", zh: "身高 (cm)", ja: "身長 (cm)", es: "Altura (cm)", pt: "Altura (cm)", fr: "Taille (cm)", de: "Größe (cm)", ru: "Рост (см)", it: "Altezza (cm)", tr: "Boy (cm)", ko: "키(cm)", ar: "الطول (سم)", hi: "ऊँचाई (सेमी)", id: "Tinggi (cm)", vi: "Chiều cao (cm)" },
  weightKg: { en: "Weight (kg)", zh: "体重 (kg)", ja: "体重 (kg)", es: "Peso (kg)", pt: "Peso (kg)", fr: "Poids (kg)", de: "Gewicht (kg)", ru: "Вес (кг)", it: "Peso (kg)", tr: "Ağırlık (kg)", ko: "몸무게(kg)", ar: "الوزن (كغ)", hi: "वज़न (किग्रा)", id: "Berat (kg)", vi: "Cân nặng (kg)" },
  heightFt: { en: "Height (ft)", zh: "身高 (英尺)", ja: "身長 (フィート)", es: "Altura (pies)", pt: "Altura (pés)", fr: "Taille (pieds)", de: "Größe (Fuß)", ru: "Рост (футы)", it: "Altezza (piedi)", tr: "Boy (fit)", ko: "키(ft)", ar: "الطول (قدم)", hi: "ऊँचाई (फ़ुट)", id: "Tinggi (kaki)", vi: "Chiều cao (ft)" },
  heightIn: { en: "Height (in)", zh: "身高 (英寸)", ja: "身長 (インチ)", es: "Altura (pulgadas)", pt: "Altura (polegadas)", fr: "Taille (pouces)", de: "Größe (Zoll)", ru: "Рост (дюймы)", it: "Altezza (pollici)", tr: "Boy (inç)", ko: "키(in)", ar: "الطول (بوصة)", hi: "ऊँचाई (इंच)", id: "Tinggi (inci)", vi: "Chiều cao (in)" },
  weightLb: { en: "Weight (lb)", zh: "体重 (磅)", ja: "体重 (lb)", es: "Peso (lb)", pt: "Peso (lb)", fr: "Poids (lb)", de: "Gewicht (lb)", ru: "Вес (фунты)", it: "Peso (lb)", tr: "Ağırlık (lb)", ko: "몸무게(lb)", ar: "الوزن (رطل)", hi: "वज़न (पाउंड)", id: "Berat (lb)", vi: "Cân nặng (lb)" },
  waistCm: { en: "Waist (cm)", zh: "腰围 (cm)", ja: "腹囲 (cm)", es: "Cintura (cm)", pt: "Cintura (cm)", fr: "Tour de taille (cm)", de: "Taillenumfang (cm)", ru: "Талия (см)", it: "Vita (cm)", tr: "Bel (cm)", ko: "허리둘레(cm)", ar: "محيط الخصر (سم)", hi: "कमर (सेमी)", id: "Lingkar pinggang (cm)", vi: "Vòng eo (cm)" },
  neckCm: { en: "Neck (cm)", zh: "颈围 (cm)", ja: "首囲 (cm)", es: "Cuello (cm)", pt: "Pescoço (cm)", fr: "Tour de cou (cm)", de: "Halsumfang (cm)", ru: "Шея (см)", it: "Collo (cm)", tr: "Boyun (cm)", ko: "목둘레(cm)", ar: "محيط الرقبة (سم)", hi: "गर्दन (सेमी)", id: "Lingkar leher (cm)", vi: "Vòng cổ (cm)" },
  hipCm: { en: "Hip (cm)", zh: "臀围 (cm)", ja: "臀囲 (cm)", es: "Cadera (cm)", pt: "Quadril (cm)", fr: "Hanches (cm)", de: "Hüftumfang (cm)", ru: "Бёдра (см)", it: "Fianchi (cm)", tr: "Kalça (cm)", ko: "엉덩이둘레(cm)", ar: "محيط الأرداف (سم)", hi: "कूल्हे (सेमी)", id: "Lingkar pinggul (cm)", vi: "Vòng hông (cm)" },
  waistIn: { en: "Waist (in)", zh: "腰围 (英寸)", ja: "腹囲 (インチ)", es: "Cintura (in)", pt: "Cintura (in)", fr: "Taille (po)", de: "Taille (Zoll)", ru: "Талия (дюймы)", it: "Vita (pollici)", tr: "Bel (inç)", ko: "허리둘레(in)", ar: "محيط الخصر (بوصة)", hi: "कमर (इंच)", id: "Lingkar pinggang (inci)", vi: "Vòng eo (in)" },
  neckIn: { en: "Neck (in)", zh: "颈围 (英寸)", ja: "首囲 (インチ)", es: "Cuello (in)", pt: "Pescoço (in)", fr: "Cou (po)", de: "Hals (Zoll)", ru: "Шея (дюймы)", it: "Collo (pollici)", tr: "Boyun (inç)", ko: "목둘레(in)", ar: "محيط الرقبة (بوصة)", hi: "गर्दन (इंच)", id: "Lingkar leher (inci)", vi: "Vòng cổ (in)" },
  hipIn: { en: "Hip (in)", zh: "臀围 (英寸)", ja: "臀囲 (インチ)", es: "Cadera (in)", pt: "Quadril (in)", fr: "Hanches (po)", de: "Hüfte (Zoll)", ru: "Бёдра (дюймы)", it: "Fianchi (pollici)", tr: "Kalça (inç)", ko: "엉덩이(in)", ar: "محيط الأرداف (بوصة)", hi: "कूल्हे (इंच)", id: "Pinggul (inci)", vi: "Vòng hông (in)" },
  activity: { en: "Activity level", zh: "活动水平", ja: "活動レベル", es: "Nivel de actividad", pt: "Nível de atividade", fr: "Niveau d'activité", de: "Aktivitätsniveau", ru: "Уровень активности", it: "Livello di attività", tr: "Aktivite düzeyi", ko: "활동 수준", ar: "مستوى النشاط", hi: "गतिविधि स्तर", id: "Tingkat aktivitas", vi: "Mức vận động" },
  goal: { en: "Goal", zh: "目标", ja: "目標", es: "Objetivo", pt: "Objetivo", fr: "Objectif", de: "Ziel", ru: "Цель", it: "Obiettivo", tr: "Hedef", ko: "목표", ar: "الهدف", hi: "लक्ष्य", id: "Tujuan", vi: "Mục tiêu" },
  bmrOut: { en: "BMR (kcal/day)", zh: "基础代谢 (千卡/天)", ja: "基礎代謝 (kcal/日)", es: "TMB (kcal/día)", pt: "TMB (kcal/dia)", fr: "BMR (kcal/jour)", de: "BMR (kcal/Tag)", ru: "BMR (ккал/день)", it: "BMR (kcal/giorno)", tr: "BMR (kcal/gün)", ko: "기초대사량(kcal/일)", ar: "معدل الأيض الأساسي (كالوري/يوم)", hi: "BMR (kcal/दिन)", id: "BMR (kcal/hari)", vi: "BMR (kcal/ngày)" },
  tdeeOut: { en: "Maintenance (kcal/day)", zh: "维持热量 (千卡/天)", ja: "維持カロリー (kcal/日)", es: "Mantenimiento (kcal/día)", pt: "Manutenção (kcal/dia)", fr: "Maintien (kcal/jour)", de: "Erhaltung (kcal/Tag)", ru: "Поддержание (ккал/день)", it: "Mantenimento (kcal/giorno)", tr: "Koruma (kcal/gün)", ko: "유지 칼로리(kcal/일)", ar: "الصيانة (كالوري/يوم)", hi: "रखरखाव (kcal/दिन)", id: "Pemeliharaan (kcal/hari)", vi: "Duy trì (kcal/ngày)" },
  targetOut: { en: "Target (kcal/day)", zh: "目标热量 (千卡/天)", ja: "目標カロリー (kcal/日)", es: "Objetivo (kcal/día)", pt: "Meta (kcal/dia)", fr: "Objectif (kcal/jour)", de: "Ziel (kcal/Tag)", ru: "Цель (ккал/день)", it: "Obiettivo (kcal/giorno)", tr: "Hedef (kcal/gün)", ko: "목표(kcal/일)", ar: "الهدف (كالوري/يوم)", hi: "लक्ष्य (kcal/दिन)", id: "Target (kcal/hari)", vi: "Mục tiêu (kcal/ngày)" },
  bodyFatOut: { en: "Body fat", zh: "体脂率", ja: "体脂肪率", es: "Grasa corporal", pt: "Gordura corporal", fr: "Masse grasse", de: "Körperfett", ru: "Жир в организме", it: "Grasso corporeo", tr: "Vücut yağı", ko: "체지방", ar: "دهون الجسم", hi: "शरीर वसा", id: "Lemak tubuh", vi: "Mỡ cơ thể" },
  devineMale: { en: "Devine — men", zh: "Devine 公式(男)", ja: "Devine 式(男性)", es: "Devine — hombres", pt: "Devine — homens", fr: "Devine — hommes", de: "Devine — Männer", ru: "Девайн — мужчины", it: "Devine — uomini", tr: "Devine — erkek", ko: "Devine — 남성", ar: "ديفين — رجال", hi: "Devine — पुरुष", id: "Devine — pria", vi: "Devine — nam" },
  devineFemale: { en: "Devine — women", zh: "Devine 公式(女)", ja: "Devine 式(女性)", es: "Devine — mujeres", pt: "Devine — mulheres", fr: "Devine — femmes", de: "Devine — Frauen", ru: "Девайн — женщины", it: "Devine — donne", tr: "Devine — kadın", ko: "Devine — 여성", ar: "ديفين — نساء", hi: "Devine — महिला", id: "Devine — wanita", vi: "Devine — nữ" },
  healthyRange: { en: "Healthy BMI range", zh: "健康 BMI 区间", ja: "健康 BMI の範囲", es: "Rango de IMC saludable", pt: "Faixa de IMC saudável", fr: "Plage d'IMC saine", de: "Gesunder BMI-Bereich", ru: "Здоровый диапазон ИМТ", it: "Intervallo BMI sano", tr: "Sağlıklı BMI aralığı", ko: "정상 BMI 범위", ar: "نطاق كتلة الجسم الصحي", hi: "स्वस्थ BMI सीमा", id: "Rentang BMI sehat", vi: "Khoảng BMI khỏe mạnh" },
  baselineOut: { en: "Baseline", zh: "基础需水量", ja: "基本必要量", es: "Base", pt: "Base", fr: "Référence", de: "Grundwert", ru: "Базовый", it: "Base", tr: "Temel", ko: "기준", ar: "الأساس", hi: "आधार", id: "Dasar", vi: "Cơ sở" },
  exerciseOut: { en: "Exercise bonus", zh: "运动补充", ja: "運動の補充", es: "Extra por ejercicio", pt: "Extra por exercício", fr: "Bonus d'exercice", de: "Sport-Bonus", ru: "Бонус за упражнения", it: "Bonus esercizio", tr: "Egzersiz eki", ko: "운동 보너스", ar: "مكافأة التمرين", hi: "व्यायाम बोनस", id: "Bonus olahraga", vi: "Thưởng vận động" },
  totalOut: { en: "Daily target", zh: "每日目标", ja: "1日の目標", es: "Objetivo diario", pt: "Meta diária", fr: "Objectif quotidien", de: "Tagesziel", ru: "Дневная цель", it: "Obiettivo giornaliero", tr: "Günlük hedef", ko: "일일 목표", ar: "الهدف اليومي", hi: "दैनिक लक्ष्य", id: "Target harian", vi: "Mục tiêu hằng ngày" },
  exerciseMin: { en: "Exercise (min/day)", zh: "运动时间(分钟/天)", ja: "運動(分/日)", es: "Ejercicio (min/día)", pt: "Exercício (min/dia)", fr: "Exercice (min/jour)", de: "Sport (Min./Tag)", ru: "Упражнения (мин/день)", it: "Esercizio (min/giorno)", tr: "Egzersiz (dk/gün)", ko: "운동(분/일)", ar: "التمرين (دقيقة/يوم)", hi: "व्यायाम (मिनट/दिन)", id: "Olahraga (menit/hari)", vi: "Vận động (phút/ngày)" },
};

const ACTIVITY_LABELS: Record<ActivityKey, Record<string, string>> = {
  sedentary: {
    en: "Sedentary — little or no exercise",
    zh: "久坐 — 几乎不运动",
    ja: "座位中心 — ほぼ運動なし",
    es: "Sedentario — poco o ningún ejercicio",
    pt: "Sedentário — pouco ou nenhum exercício",
    fr: "Sédentaire — peu ou pas d'exercice",
    de: "Sitzend — wenig oder kein Sport",
    ru: "Сидячий — почти без нагрузок",
    it: "Sedentario — poca o nessuna attività",
    tr: "Hareketsiz — az ya da hiç egzersiz yok",
    ko: "비활동적 — 운동 거의 없음",
    ar: "خامل — تمرين قليل أو معدوم",
    hi: "गतिहीन — बहुत कम या कोई व्यायाम नहीं",
    id: "Sedenter — olahraga sedikit atau tidak sama sekali",
    vi: "Ít vận động — hầu như không tập",
  },
  lightlyActive: {
    en: "Lightly active — 1–3 days/week",
    zh: "轻度活动 — 每周 1–3 次",
    ja: "軽い運動 — 週 1〜3 回",
    es: "Ligeramente activo — 1–3 días/semana",
    pt: "Levemente ativo — 1–3 dias/semana",
    fr: "Légèrement actif — 1–3 jours/semaine",
    de: "Leicht aktiv — 1–3 Tage/Woche",
    ru: "Слегка активный — 1–3 дня/нед.",
    it: "Leggermente attivo — 1–3 giorni/settimana",
    tr: "Az aktif — haftada 1–3 gün",
    ko: "가벼운 활동 — 주 1–3일",
    ar: "نشيط قليلًا — 1–3 أيام/أسبوع",
    hi: "हल्का सक्रिय — सप्ताह में 1–3 दिन",
    id: "Cukup aktif — 1–3 hari/minggu",
    vi: "Hoạt động nhẹ — 1–3 ngày/tuần",
  },
  moderatelyActive: {
    en: "Moderately active — 3–5 days/week",
    zh: "中度活动 — 每周 3–5 次",
    ja: "中程度の運動 — 週 3〜5 回",
    es: "Moderadamente activo — 3–5 días/semana",
    pt: "Moderadamente ativo — 3–5 dias/semana",
    fr: "Modérément actif — 3–5 jours/semaine",
    de: "Mäßig aktiv — 3–5 Tage/Woche",
    ru: "Умеренно активный — 3–5 дней/нед.",
    it: "Moderatamente attivo — 3–5 giorni/settimana",
    tr: "Orta aktif — haftada 3–5 gün",
    ko: "중간 활동 — 주 3–5일",
    ar: "نشيط باعتدال — 3–5 أيام/أسبوع",
    hi: "मध्यम सक्रिय — सप्ताह में 3–5 दिन",
    id: "Cukup aktif — 3–5 hari/minggu",
    vi: "Hoạt động vừa — 3–5 ngày/tuần",
  },
  veryActive: {
    en: "Very active — 6–7 days/week",
    zh: "高强度活动 — 每周 6–7 次",
    ja: "激しい運動 — 週 6〜7 回",
    es: "Muy activo — 6–7 días/semana",
    pt: "Muito ativo — 6–7 dias/semana",
    fr: "Très actif — 6–7 jours/semaine",
    de: "Sehr aktiv — 6–7 Tage/Woche",
    ru: "Очень активный — 6–7 дней/нед.",
    it: "Molto attivo — 6–7 giorni/settimana",
    tr: "Çok aktif — haftada 6–7 gün",
    ko: "고활동 — 주 6–7일",
    ar: "نشيط جدًا — 6–7 أيام/أسبوع",
    hi: "अति सक्रिय — सप्ताह में 6–7 दिन",
    id: "Sangat aktif — 6–7 hari/minggu",
    vi: "Rất năng động — 6–7 ngày/tuần",
  },
  extraActive: {
    en: "Extra active — physical job or twice-daily training",
    zh: "极高强度 — 体力职业或一天两练",
    ja: "非常に激しい — 肉体労働や1日2回の練習",
    es: "Extra activo — trabajo físico o doble sesión diaria",
    pt: "Extra ativo — trabalho físico ou treino duas vezes ao dia",
    fr: "Très haut niveau — métier physique ou double entraînement quotidien",
    de: "Extrem aktiv — körperliche Arbeit oder zweimal täglich Training",
    ru: "Экстра-активный — физический труд или 2 тренировки в день",
    it: "Estremamente attivo — lavoro fisico o doppio allenamento quotidiano",
    tr: "Ekstra aktif — bedensel iş ya da günde iki antrenman",
    ko: "매우 높은 활동 — 육체노동 또는 하루 두 번 훈련",
    ar: "نشيط للغاية — عمل بدني أو تمرينان يوميًا",
    hi: "अत्यधिक सक्रिय — शारीरिक काम या दिन में दो बार प्रशिक्षण",
    id: "Ekstra aktif — kerja fisik atau latihan dua kali sehari",
    vi: "Cực năng động — lao động chân tay hoặc tập 2 lần/ngày",
  },
};

const GOAL_LABELS: Record<GoalKey, Record<string, string>> = {
  lose: {
    en: "Lose weight (≈ −0.5 kg/week)",
    zh: "减重(约 −0.5 公斤/周)",
    ja: "減量(約 −0.5 kg/週)",
    es: "Perder peso (≈ −0,5 kg/semana)",
    pt: "Perder peso (≈ −0,5 kg/semana)",
    fr: "Perdre du poids (≈ −0,5 kg/semaine)",
    de: "Abnehmen (≈ −0,5 kg/Woche)",
    ru: "Похудеть (≈ −0,5 кг/нед.)",
    it: "Perdere peso (≈ −0,5 kg/settimana)",
    tr: "Kilo ver (≈ −0,5 kg/hafta)",
    ko: "체중 감량(≈ 주 −0.5kg)",
    ar: "خسارة الوزن (≈ −0.5 كغ/أسبوع)",
    hi: "वज़न घटाएँ (≈ −0.5 किग्रा/सप्ताह)",
    id: "Turun berat (≈ −0,5 kg/minggu)",
    vi: "Giảm cân (≈ −0,5 kg/tuần)",
  },
  maintain: {
    en: "Maintain weight",
    zh: "维持体重",
    ja: "体重維持",
    es: "Mantener peso",
    pt: "Manter peso",
    fr: "Maintenir le poids",
    de: "Gewicht halten",
    ru: "Поддерживать вес",
    it: "Mantenere il peso",
    tr: "Kiloyu koru",
    ko: "체중 유지",
    ar: "الحفاظ على الوزن",
    hi: "वज़न बनाए रखें",
    id: "Jaga berat",
    vi: "Giữ cân",
  },
  gain: {
    en: "Gain weight (≈ +0.5 kg/week)",
    zh: "增重(约 +0.5 公斤/周)",
    ja: "増量(約 +0.5 kg/週)",
    es: "Ganar peso (≈ +0,5 kg/semana)",
    pt: "Ganar peso (≈ +0,5 kg/semana)",
    fr: "Prendre du poids (≈ +0,5 kg/semaine)",
    de: "Zunehmen (≈ +0,5 kg/Woche)",
    ru: "Набрать вес (≈ +0,5 кг/нед.)",
    it: "Aumentare di peso (≈ +0,5 kg/settimana)",
    tr: "Kilo al (≈ +0,5 kg/hafta)",
    ko: "체중 증량(≈ 주 +0.5kg)",
    ar: "زيادة الوزن (≈ +0.5 كغ/أسبوع)",
    hi: "वज़न बढ़ाएँ (≈ +0.5 किग्रा/सप्ताह)",
    id: "Naik berat (≈ +0,5 kg/minggu)",
    vi: "Tăng cân (≈ +0,5 kg/tuần)",
  },
};

const ACTIVITY_ORDER: ActivityKey[] = [
  "sedentary",
  "lightlyActive",
  "moderatelyActive",
  "veryActive",
  "extraActive",
];

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

/** "1,780 kcal" — or just the em dash when the value is not finite. */
function kcal(n: number, locale: Locale): string {
  return Number.isFinite(n) ? `${fmt(n, locale, 0)} kcal` : fmt(n, locale, 0);
}

/** Unit-tabs pair, shared by every sub-form. */
function UnitTabs({ value, onChange, locale }: { value: string; onChange: (id: string) => void; locale: Locale }) {
  return (
    <Tabs
      options={[
        { id: "metric", label: pick(locale, S.metric) },
        { id: "imperial", label: pick(locale, S.imperial) },
      ]}
      value={value}
      onChange={onChange}
    />
  );
}

function SexTabs({ value, onChange, locale }: { value: Sex; onChange: (id: Sex) => void; locale: Locale }) {
  return (
    <div className="mb-4">
      <Tabs
        options={[
          { id: "male", label: pick(locale, S.male) },
          { id: "female", label: pick(locale, S.female) },
        ]}
        value={value}
        onChange={(id) => onChange(id as Sex)}
      />
    </div>
  );
}

/* ---------------- BMR / Calorie (shared person form) ---------------- */

function Energy({ kind }: { kind: "bmr" | "calorie" }) {
  const { locale } = useI18n();
  const [units, setUnits] = useState("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [cm, setCm] = useState("175");
  const [kg, setKg] = useState("72");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("9");
  const [lb, setLb] = useState("159");
  const [age, setAge] = useState("30");
  const [activity, setActivity] = useState<ActivityKey>("moderatelyActive");
  const [goal, setGoal] = useState<GoalKey>("maintain");

  const isMetric = units === "metric";
  const w = isMetric ? num(kg) : kgFromLb(num(lb));
  const h = isMetric ? num(cm) : cmFromFtIn(num(ft), num(inch));
  const a = num(age);
  const b = bmr(w, h, a, sex);
  const t = kind === "calorie" ? tdee(b, activity) : NaN;
  const target = kind === "calorie" ? calorieGoal(t, goal) : NaN;

  return (
    <ToolPanel>
      <UnitTabs value={units} onChange={setUnits} locale={locale} />
      <SexTabs value={sex} onChange={setSex} locale={locale} />
      <div className="grid gap-4 sm:grid-cols-3">
        {isMetric ? (
          <>
            <Field label={pick(locale, S.heightCm)}>
              <NumIn value={cm} onChange={setCm} aria="height cm" />
            </Field>
            <Field label={pick(locale, S.weightKg)}>
              <NumIn value={kg} onChange={setKg} aria="weight kg" />
            </Field>
          </>
        ) : (
          <>
            <Field label={pick(locale, S.heightFt)}>
              <NumIn value={ft} onChange={setFt} aria="height feet" />
            </Field>
            <Field label={pick(locale, S.heightIn)}>
              <NumIn value={inch} onChange={setInch} aria="height inches" />
            </Field>
            <Field label={pick(locale, S.weightLb)}>
              <NumIn value={lb} onChange={setLb} aria="weight pounds" />
            </Field>
          </>
        )}
        <Field label={pick(locale, S.age)}>
          <NumIn value={age} onChange={setAge} aria="age years" />
        </Field>
      </div>

      {kind === "calorie" && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label={pick(locale, S.activity)}>
            <Sel value={activity} onChange={(v) => setActivity(v as ActivityKey)} aria="activity level">
              {ACTIVITY_ORDER.map((key) => (
                <option key={key} value={key}>
                  {pick(locale, ACTIVITY_LABELS[key])} (×{ACTIVITY_FACTORS[key]})
                </option>
              ))}
            </Sel>
          </Field>
          <Field label={pick(locale, S.goal)}>
            <Sel value={goal} onChange={(v) => setGoal(v as GoalKey)} aria="goal">
              {(["lose", "maintain", "gain"] as GoalKey[]).map((key) => (
                <option key={key} value={key}>
                  {pick(locale, GOAL_LABELS[key])}
                </option>
              ))}
            </Sel>
          </Field>
        </div>
      )}

      <div className="mt-5">
        <Stats
          items={
            kind === "bmr"
              ? [{ label: pick(locale, S.bmrOut), value: kcal(b, locale), tone: "accent" as const }]
              : [
                  { label: pick(locale, S.bmrOut), value: kcal(b, locale) },
                  { label: pick(locale, S.tdeeOut), value: kcal(t, locale) },
                  { label: pick(locale, S.targetOut), value: kcal(target, locale), tone: "accent" as const },
                ]
          }
          cols={kind === "bmr" ? "sm:grid-cols-1" : "sm:grid-cols-3"}
        />
      </div>

      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "Mifflin–St Jeor equation (1990): 10 × kg + 6.25 × cm − 5 × age + 5 for men, − 161 for women, with weight in kg and height in cm. Activity multipliers 1.2–1.9 and the ±500 kcal goal adjustment are standard TDEE heuristics.",
            zh: "Mifflin–St Jeor 公式(1990):10 × 体重(kg)+ 6.25 × 身高(cm)− 5 × 年龄,男性 + 5,女性 − 161。活动系数 1.2–1.9 与 ±500 千卡的目标调整是通用的 TDEE 估算方法。",
            ja: "Mifflin–St Jeor 式(1990):10 × 体重 + 6.25 × 身長 − 5 × 年齢、男性は + 5、女性は − 161。活動係数 1.2〜1.9 と ±500 kcal の目標調整は一般的な TDEE の目安です。",
            es: "Ecuación de Mifflin–St Jeor (1990): 10 × kg + 6,25 × cm − 5 × edad, + 5 para hombres y − 161 para mujeres. Los multiplicadores de actividad 1,2–1,9 y el ajuste de ±500 kcal son heurísticas TDEE estándar.",
            pt: "Equação de Mifflin–St Jeor (1990): 10 × kg + 6,25 × cm − 5 × idade, + 5 para homens e − 161 para mulheres. Os multiplicadores de atividade 1,2–1,9 e o ajuste de ±500 kcal são heurísticas TDEE padrão.",
            fr: "Équation de Mifflin–St Jeor (1990) : 10 × kg + 6,25 × cm − 5 × âge + 5 pour les hommes, − 161 pour les femmes, poids en kg et taille en cm. Les multiplicateurs d'activité 1,2–1,9 et l'ajustement ±500 kcal sont des heuristiques TDEE standards.",
            de: "Mifflin–St-Jeor-Gleichung (1990): 10 × kg + 6,25 × cm − 5 × Alter + 5 für Männer, − 161 für Frauen, Gewicht in kg, Größe in cm. Aktivitätsfaktoren 1,2–1,9 und die ±500-kcal-Zielanpassung sind gängige TDEE-Heuristiken.",
            ru: "Уравнение Миффлина–Сен-Жеора (1990): 10 × кг + 6,25 × см − 5 × возраст + 5 для мужчин, − 161 для женщин (вес в кг, рост в см). Множители активности 1,2–1,9 и поправка ±500 ккал — стандартные эвристики TDEE.",
            it: "Equazione di Mifflin–St Jeor (1990): 10 × kg + 6,25 × cm − 5 × età + 5 per gli uomini, − 161 per le donne, peso in kg e altezza in cm. I moltiplicatori di attività 1,2–1,9 e la correzione ±500 kcal sono euristiche TDEE standard.",
            tr: "Mifflin–St Jeor denklemi (1990): erkekler için 10 × kg + 6,25 × cm − 5 × yaş + 5, kadınlar için − 161; ağırlık kg, boy cm. 1,2–1,9 aktivite çarpanları ve ±500 kcal hedef düzeltmesi standart TDEE sezgiselleridir.",
            ko: "Mifflin–St Jeor 공식(1990): 남성 10 × kg + 6.25 × cm − 5 × 나이 + 5, 여성은 − 161(체중 kg, 신장 cm). 활동 계수 1.2–1.9와 ±500kcal 목표 조정은 표준 TDEE 경험칙입니다.",
            ar: "معادلة ميفلين-سان جيور (1990): 10 × كغ + 6.25 × سم − 5 × العمر + 5 للرجال، − 161 للنساء، بالوزن بالكيلوغرام والطول بالسنتيمتر. مضاعفات النشاط 1.2–1.9 وتعديل الهدف ±500 كالوري هي إرشادات TDEE القياسية.",
            hi: "मिफ़्लिन–सेंट जीयर समीकरण (1990): पुरुषों के लिए 10 × किग्रा + 6.25 × सेमी − 5 × आयु + 5, महिलाओं के लिए − 161; वज़न किग्रा और ऊँचाई सेमी में। गतिविधि गुणक 1.2–1.9 और ±500 kcal लक्ष्य समायोजन मानक TDEE अनुमान हैं।",
            id: "Persamaan Mifflin–St Jeor (1990): 10 × kg + 6,25 × cm − 5 × usia + 5 untuk pria, − 161 untuk wanita, berat dalam kg dan tinggi dalam cm. Pengali aktivitas 1,2–1,9 dan penyesuaian target ±500 kcal adalah heuristik TDEE standar.",
            vi: "Phương trình Mifflin–St Jeor (1990): nam 10 × kg + 6,25 × cm − 5 × tuổi + 5, nữ − 161; cân nặng kg, chiều cao cm. Hệ số hoạt động 1,2–1,9 và điều chỉnh mục tiêu ±500 kcal là quy tắc TDEE chuẩn.",
          })}
        </Note>
      </div>
      {kind === "calorie" && Number.isFinite(t) && (
        <div className="mt-2">
          <Note>
            {pick(locale, {
              en: "The goal shifts maintenance by about ±500 kcal/day, which is roughly 0.5 kg of body weight per week (1 kg ≈ 7,700 kcal).",
              zh: "目标在维持热量的基础上增减约 500 千卡/天,大致相当于每周 0.5 公斤体重(1 公斤 ≈ 7,700 千卡)。",
              ja: "目標は維持カロリーを約 ±500 kcal/日 動かします。これは体重にして週約 0.5 kg です(1 kg ≈ 7,700 kcal)。",
              es: "El objetivo desplaza el mantenimiento unos ±500 kcal/día, aproximadamente 0,5 kg de peso corporal por semana (1 kg ≈ 7.700 kcal).",
              pt: "A meta desloca a manutenção cerca de ±500 kcal/dia, o que dá aproximadamente 0,5 kg de peso corporal por semana (1 kg ≈ 7.700 kcal).",
              fr: "L'objectif décale le maintien d'environ ±500 kcal/jour, soit environ 0,5 kg de poids corporel par semaine (1 kg ≈ 7 700 kcal).",
              de: "Das Ziel verschiebt den Erhaltungsbedarf um rund ±500 kcal/Tag — etwa 0,5 kg Körpergewicht pro Woche (1 kg ≈ 7.700 kcal).",
              ru: "Цель смещает поддержку примерно на ±500 ккал/день — это около 0,5 кг веса в неделю (1 кг ≈ 7 700 ккал).",
              it: "L'obiettivo sposta il mantenimento di circa ±500 kcal/giorno, cioè circa 0,5 kg di peso corporeo a settimana (1 kg ≈ 7.700 kcal).",
              tr: "Hedef, koruma kalorisini yaklaşık ±500 kcal/gün kaydırır — haftada kabaca 0,5 kg vücut ağırlığı (1 kg ≈ 7.700 kcal).",
              ko: "목표는 유지 칼로리를 약 ±500kcal/일만큼 이동시킵니다 — 주당 약 0.5kg(1kg ≈ 7,700kcal).",
              ar: "يحول الهدف سعرات الصيانة بنحو ±500 كالوري/يوم، أي قرابة 0.5 كغ من وزن الجسم أسبوعيًا (1 كغ ≈ 7700 كالوري).",
              hi: "लक्ष्य रखरखाव को लगभग ±500 kcal/दिन खिसकाता है — यानी सप्ताह में लगभग 0.5 किग्रा (1 किग्रा ≈ 7,700 kcal)।",
              id: "Target menggeser kalori pemeliharaan sekitar ±500 kcal/hari, kira-kira 0,5 kg berat tubuh per minggu (1 kg ≈ 7.700 kcal).",
              vi: "Mục tiêu dịch duy trì khoảng ±500 kcal/ngày, tương đương ~0,5 kg cân nặng mỗi tuần (1 kg ≈ 7.700 kcal).",
            })}
          </Note>
        </div>
      )}
    </ToolPanel>
  );
}

/* ---------------- Body fat (US Navy) ---------------- */

function BodyFat() {
  const { locale } = useI18n();
  const [units, setUnits] = useState("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [cm, setCm] = useState("178");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("10");
  const [waistM, setWaistM] = useState("86");
  const [neckM, setNeckM] = useState("38");
  const [hipM, setHipM] = useState("95");
  const [waistI, setWaistI] = useState("34");
  const [neckI, setNeckI] = useState("15");
  const [hipI, setHipI] = useState("37");

  const isMetric = units === "metric";
  const h = isMetric ? num(cm) : cmFromFtIn(num(ft), num(inch));
  const waist = isMetric ? num(waistM) : num(waistI) * CM_PER_INCH;
  const neck = isMetric ? num(neckM) : num(neckI) * CM_PER_INCH;
  const hip = isMetric ? num(hipM) : num(hipI) * CM_PER_INCH;
  const bf = navyBodyFat(sex, h, waist, neck, hip);
  const girthBad =
    Number.isFinite(waist) &&
    Number.isFinite(neck) &&
    (sex === "male" ? waist <= neck : !(waist + hip - neck > 0));

  return (
    <ToolPanel>
      <UnitTabs value={units} onChange={setUnits} locale={locale} />
      <SexTabs value={sex} onChange={setSex} locale={locale} />
      <div className="grid gap-4 sm:grid-cols-2">
        {isMetric ? (
          <Field label={pick(locale, S.heightCm)}>
            <NumIn value={cm} onChange={setCm} aria="height cm" />
          </Field>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Field label={pick(locale, S.heightFt)}>
              <NumIn value={ft} onChange={setFt} aria="height feet" />
            </Field>
            <Field label={pick(locale, S.heightIn)}>
              <NumIn value={inch} onChange={setInch} aria="height inches" />
            </Field>
          </div>
        )}
        <Field label={isMetric ? pick(locale, S.neckCm) : pick(locale, S.neckIn)}>
          <NumIn value={isMetric ? neckM : neckI} onChange={isMetric ? setNeckM : setNeckI} aria="neck circumference" />
        </Field>
        <Field label={isMetric ? pick(locale, S.waistCm) : pick(locale, S.waistIn)}>
          <NumIn value={isMetric ? waistM : waistI} onChange={isMetric ? setWaistM : setWaistI} aria="waist circumference" />
        </Field>
        {sex === "female" && (
          <Field label={isMetric ? pick(locale, S.hipCm) : pick(locale, S.hipIn)}>
            <NumIn value={isMetric ? hipM : hipI} onChange={isMetric ? setHipM : setHipI} aria="hip circumference" />
          </Field>
        )}
      </div>

      <div className="mt-5">
        <Stats
          items={[
            {
              label: pick(locale, S.bodyFatOut),
              value: Number.isFinite(bf) ? `${fmt(bf, locale, 1)} %` : fmt(bf, locale, 1),
              tone: "accent",
            },
          ]}
          cols="sm:grid-cols-1"
        />
      </div>

      {girthBad ? (
        <div className="mt-4">
          <Note>
            {pick(locale, {
              en: "The waist must be larger than the neck for the formula to apply — double-check the tape positions.",
              zh: "腰围必须大于颈围,公式才适用——请核对测量位置。",
              ja: "腹囲は首囲より大きくなければ式が成立しません。テープの位置を確認してください。",
              es: "La cintura debe ser mayor que el cuello para que la fórmula sea aplicable — revise la posición de la cinta.",
              pt: "A cintura precisa ser maior que o pescoço para a fórmula valer — confira a posição da fita.",
              fr: "Le tour de taille doit être supérieur au tour de cou pour que la formule s'applique — vérifiez les positions du mètre ruban.",
              de: "Der Taillenumfang muss größer als der Halsumfang sein, damit die Formel gilt — prüfe die Maßband-Positionen.",
              ru: "Обхват талии должен быть больше обхвата шеи, иначе формула неприменима — перепроверьте положение ленты.",
              it: "Il girovita deve essere maggiore del collo perché la formula si applichi — ricontrolla le posizioni del metro.",
              tr: "Formülün uygulanabilmesi için bel çevresi boyun çevresinden büyük olmalı — mezura konumlarını tekrar kontrol edin.",
              ko: "공식이 적용되려면 허리둘레가 목둘레보다 커야 합니다 — 줄자 위치를 다시 확인하세요.",
              ar: "يجب أن يكون محيط الخصر أكبر من محيط الرقبة لتنطبق الصيغة — تحقق من مواضع الشريط.",
              hi: "सूत्र लागू होने के लिए कमर का घेर गर्दन से बड़ा होना चाहिए — फ़ीते की स्थिति दोबारा जाँचें।",
              id: "Lingkar pinggang harus lebih besar dari lingkar leher agar rumus berlaku — periksa ulang posisi meteran.",
              vi: "Vòng eo phải lớn hơn vòng cổ công thức mới áp dụng được — kiểm tra lại vị trí thước dây.",
            })}
          </Note>
        </div>
      ) : (
        <div className="mt-4">
          <Note>
            {pick(locale, {
              en: "US Navy circumference method (Hodgdon & Beckett, 1984): 495 / (1.0324 − 0.19077·log10(waist − neck) + 0.15456·log10(height)) − 450 for men; women add the hip to the girth term and use the female coefficients (1.29579 / 0.35004 / 0.22100). Measure the neck below the larynx, the waist at the navel (men) or narrowest point (women), the hip at its fullest part.",
              zh: "美国海军围度法(Hodgdon & Beckett,1984):男性 495 ÷ (1.0324 − 0.19077·log10(腰围 − 颈围) + 0.15456·log10(身高)) − 450;女性把臀围计入围度项,并使用女性系数(1.29579 / 0.35004 / 0.22100)。颈围在喉结下方测量,腰围男性量肚脐处、女性量最细处,臀围量最丰满处。",
              ja: "米海軍の囲度法(Hodgdon & Beckett、1984):男性は 495 ÷ (1.0324 − 0.19077·log10(腹囲 − 首囲) + 0.15456·log10(身長)) − 450。女性は臀囲を囲の項に加え、女性用係数(1.29579 / 0.35004 / 0.22100)を使います。首囲は喉仏の下、腹囲は男性はへその高さ・女性は最も細い部分、臀囲は最も出た部分を測ります。",
              es: "Método de circunferencias de la Marina de EE. UU. (Hodgdon y Beckett, 1984): hombres 495 / (1.0324 − 0,19077·log10(cintura − cuello) + 0,15456·log10(altura)) − 450; las mujeres suman la cadera al término de circunferencias y usan los coeficientes femeninos (1.29579 / 0.35004 / 0.22100). Mida el cuello bajo la laringe, la cintura al nivel del ombligo (hombres) o en su punto más estrecho (mujeres) y la cadera en su parte más ancha.",
              pt: "Método de circunferências da Marinha dos EUA (Hodgdon & Beckett, 1984): homens 495 / (1.0324 − 0,19077·log10(cintura − pescoço) + 0,15456·log10(altura)) − 450; as mulheres somam o quadril ao termo de circunferências e usam os coeficientes femininos (1.29579 / 0.35004 / 0.22100). Meça o pescoço abaixo da laringe, a cintura na altura do umbigo (homens) ou no ponto mais estreito (mulheres) e o quadril na parte mais larga.",
              fr: "Méthode des circonférences de l'US Navy (Hodgdon & Beckett, 1984) : 495 / (1,0324 − 0,19077·log10(taille − cou) + 0,15456·log10(taille)) − 450 pour les hommes ; pour les femmes, la hanche s'ajoute au terme de périmètre et les coefficients féminins s'appliquent (1,29579 / 0,35004 / 0,22100). Mesurez le cou sous le larynx, la taille au nombril (hommes) ou au point le plus étroit (femmes), la hanche à son point le plus fort.",
              de: "US-Navy-Umfangsmethode (Hodgdon & Beckett, 1984): 495 / (1,0324 − 0,19077·log10(Taille − Hals) + 0,15456·log10(Größe)) − 450 für Männer; bei Frauen kommt die Hüfte in den Umfangsterm, mit weiblichen Koeffizienten (1,29579 / 0,35004 / 0,22100). Miss den Hals unter dem Kehlkopf, die Taille am Bauchnabel (Männer) bzw. an der schmalsten Stelle (Frauen), die Hüfte an der stärksten Stelle.",
              ru: "Метод окружностей ВМС США (Ходждон и Беккет, 1984): 495 / (1,0324 − 0,19077·log10(талия − шея) + 0,15456·log10(рост)) − 450 для мужчин; у женщин в слагаемое добавляется бёдра и женские коэффициенты (1,29579 / 0,35004 / 0,22100). Измеряйте шею под гортанью, талию на уровне пупка (мужчины) или в самом узком месте (женщины), бёдра — в самом широком месте.",
              it: "Metodo delle circonferenze della US Navy (Hodgdon & Beckett, 1984): 495 / (1,0324 − 0,19077·log10(vita − collo) + 0,15456·log10(altezza)) − 450 per gli uomini; per le donne si aggiunge i fianchi al termine di circonferenza con i coefficienti femminili (1,29579 / 0,35004 / 0,22100). Misura il collo sotto la laringe, la vita all'ombelico (uomini) o nel punto più stretto (donne), i fianchi nel punto più ampio.",
              tr: "ABD Donanması çevre yöntemi (Hodgdon & Beckett, 1984): erkekler için 495 / (1,0324 − 0,19077·log10(bel − boyun) + 0,15456·log10(boy)) − 450; kadınlarda çevre terimine kalça eklenir ve kadın katsayıları kullanılır (1,29579 / 0,35004 / 0,22100). Boyunu gırtlak altından, beli göbek deliğinden (erkek) veya en dar noktadan (kadın), kalçayı en geniş yerinden ölçün.",
              ko: "미 해군 둘레법(Hodgdon & Beckett, 1984): 남성 495 / (1.0324 − 0.19077·log10(허리 − 목) + 0.15456·log10(키)) − 450; 여성은 둘레 항에 엉덩이를 더하고 여성 계수(1.29579 / 0.35004 / 0.22100)를 사용합니다. 목은 후두 아래, 허리는 배꼽(남성) 또는 가장 좁은 부위(여성), 엉덩이는 가장 두꺼운 부위에서 측정하세요.",
              ar: "طريقة محيطات البحرية الأمريكية (Hodgdon وBeckett، 1984): للرجال 495 / (1.0324 − 0.19077·log10(الخصر − الرقبة) + 0.15456·log10(الطول)) − 450؛ وتضيف النساء الورك إلى حد المحيط وتستخدم المعاملات الأنثوية (1.29579 / 0.35004 / 0.22100). قِس الرقبة تحت الحنجرة، والخصر عند السرة (رجال) أو أضيق نقطة (نساء)، والورك عند أعرض نقطة.",
              hi: "यूएस नेवी परिधि विधि (Hodgdon & Beckett, 1984): पुरुषों के लिए 495 / (1.0324 − 0.19077·log10(कमर − गर्दन) + 0.15456·log10(ऊँचाई)) − 450; महिलाओं में परिधि पद में कूल्हा जुड़ता है और महिला गुणांक (1.29579 / 0.35004 / 0.22100) उपयोग होते हैं। गर्दन कंठ के नीचे, कमर नाभि पर (पुरुष) या सबसे पतली जगह (महिला), कूल्हा सबसे चौड़े स्थान पर मापें।",
              id: "Metode lingkar US Navy (Hodgdon & Beckett, 1984): pria 495 / (1,0324 − 0,19077·log10(pinggang − leher) + 0,15456·log10(tinggi)) − 450; wanita menambahkan pinggul ke suku lingkar dan memakai koefisien wanita (1,29579 / 0,35004 / 0,22100). Ukur leher di bawah laring, pinggang di pusar (pria) atau titik tersempit (wanita), pinggul di bagian terlebar.",
              vi: "Phương pháp chu vi Hải quân Mỹ (Hodgdon & Beckett, 1984): nam 495 / (1,0324 − 0,19077·log10(eo − cổ) + 0,15456·log10(cao)) − 450; nữ cộng vòng hông vào số hạng chu vi và dùng hệ số nữ (1,29579 / 0,35004 / 0,22100). Đo cổ dưới thanh quản, eo tại rốn (nam) hoặc điểm hẹp nhất (nữ), hông tại chỗ rộng nhất.",
            })}
          </Note>
        </div>
      )}
    </ToolPanel>
  );
}

/* ---------------- Ideal weight (Devine 1975 + BMI band) ---------------- */

function IdealWeight() {
  const { locale } = useI18n();
  const [units, setUnits] = useState("metric");
  const [cm, setCm] = useState("170");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("7");

  const isMetric = units === "metric";
  const r = idealWeightRange(isMetric ? num(cm) : cmFromFtIn(num(ft), num(inch)));
  const toOut = (kg: number) => (isMetric ? kg : kg / KG_PER_LB);
  const unit = isMetric ? "kg" : "lb";

  return (
    <ToolPanel>
      <UnitTabs value={units} onChange={setUnits} locale={locale} />
      <div className="grid gap-4 sm:grid-cols-2">
        {isMetric ? (
          <Field label={pick(locale, S.heightCm)}>
            <NumIn value={cm} onChange={setCm} aria="height cm" />
          </Field>
        ) : (
          <>
            <Field label={pick(locale, S.heightFt)}>
              <NumIn value={ft} onChange={setFt} aria="height feet" />
            </Field>
            <Field label={pick(locale, S.heightIn)}>
              <NumIn value={inch} onChange={setInch} aria="height inches" />
            </Field>
          </>
        )}
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.devineMale), value: `${fmt(toOut(r.devineMale), locale, 1)} ${unit}` },
            { label: pick(locale, S.devineFemale), value: `${fmt(toOut(r.devineFemale), locale, 1)} ${unit}` },
            {
              label: pick(locale, S.healthyRange),
              value: `${fmt(toOut(r.bmiMin), locale, 1)} – ${fmt(toOut(r.bmiMax), locale, 1)} ${unit}`,
              tone: "accent",
            },
          ]}
          cols="sm:grid-cols-3"
        />
      </div>

      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "Devine formula (1975): 50 kg + 2.3 kg per inch over 5 ft for men, 45.5 kg + 2.3 kg per inch for women — originally derived for drug dosing and still the most-cited ideal-weight equation. The healthy band multiplies your height in meters squared by BMI 18.5 and 24.9 (WHO limits). Imperial results are converted from kilograms.",
            zh: "Devine 公式(1975):男性 50 公斤 + 5 英尺以上每英寸 × 2.3 公斤,女性 45.5 公斤起同法计算——最初用于药物剂量,至今仍是最常被引用的理想体重公式。健康区间用身高(米)的平方乘以 BMI 18.5 和 24.9(WHO 上下限)。",
            ja: "Devine 式(1975):男性は 50 kg + 5 フィートを超える 1 インチごとに 2.3 kg、女性は 45.5 kg + 2.3 kg — もともと薬剤投与量のために導かれた式で、今も最も引用される理想体重式です。健康体重の帯域は身長(メートル)の 2 乗に BMI 18.5 と 24.9(WHO の下限・上限)を掛けた値です。",
            es: "Fórmula de Devine (1975): hombres 50 kg + 2,3 kg por pulgada que exceda 5 pies; mujeres 45,5 kg + 2,3 kg por pulgada — se derivó para dosificar fármacos y sigue siendo la ecuación de peso ideal más citada. La banda saludable multiplica su altura en metros al cuadrado por los IMC 18,5 y 24,9 (límites de la OMS).",
            pt: "Fórmula de Devine (1975): homens 50 kg + 2,3 kg por polegada acima de 5 pés; mulheres 45,5 kg + 2,3 kg por polegada — derivada originalmente para dosagem de medicamentos e ainda a equação de peso ideal mais citada. A faixa saudável multiplica sua altura em metros ao quadrado pelos IMCs 18,5 e 24,9 (limites da OMS).",
            fr: "Formule de Devine (1975) : 50 kg + 2,3 kg par pouce au-delà de 5 pieds pour les hommes, 45,5 kg + 2,3 kg par pouce pour les femmes — conçue à l'origine pour le dosage médicamenteux, elle reste l'équation de poids idéal la plus citée. La fourchette saine multiplie votre taille en mètres au carré par les IMC 18,5 et 24,9 (limites OMS). Les résultats impériaux sont convertis depuis les kilogrammes.",
            de: "Devine-Formel (1975): 50 kg + 2,3 kg pro Zoll über 5 ft für Männer, 45,5 kg + 2,3 kg pro Zoll für Frauen — ursprünglich für Medikamentendosierung abgeleitet und immer noch die meistzitierte Idealgewichts-Gleichung. Der gesunde Bereich multipliziert deine Größe in Metern zum Quadrat mit BMI 18,5 und 24,9 (WHO-Grenzen). Imperiale Ergebnisse werden aus Kilogramm umgerechnet.",
            ru: "Формула Девайна (1975): 50 кг + 2,3 кг на дюйм свыше 5 футов для мужчин, 45,5 кг + 2,3 кг на дюйм для женщин — изначально для дозировки лекарств, до сих пор самая цитируемая формула идеального веса. Здоровый диапазон умножает ваш рост в метрах в квадрате на ИМТ 18,5 и 24,9 (пределы ВОЗ). Имперские результаты конвертируются из килограммов.",
            it: "Formula di Devine (1975): 50 kg + 2,3 kg per pollice oltre 5 piedi per gli uomini, 45,5 kg + 2,3 kg per pollice per le donne — nata per il dosaggio dei farmaci, resta l'equazione di peso ideale più citata. L'intervallo sano moltiplica la tua altezza in metri al quadrato per BMI 18,5 e 24,9 (limiti OMS). I risultati imperiali sono convertiti dai chilogrammi.",
            tr: "Devine formülü (1975): erkekler için 50 kg + 5 fit üzerindeki her inç için 2,3 kg, kadınlar için 45,5 kg + inç başına 2,3 kg — ilaç dozlaması için türetilmiş olup hâlâ en çok atıf alan ideal ağırlık denklemidir. Sağlıklı bant, metre cinsinden boyun karesini BMI 18,5 ve 24,9 (DSÖ sınırları) ile çarpar. İngiliz birim sonuçları kilogramdan çevrilir.",
            ko: "Devine 공식(1975): 남성 50kg + 5피트 초과 인치당 2.3kg, 여성 45.5kg + 인치당 2.3kg — 본래 약물 용량 산정용이며 여전히 가장 많이 인용되는 이상체중 공식입니다. 건강 범위는 신장(m) 제곱에 BMI 18.5과 24.9(WHO 기준)을 곱합니다. 야드파운드 결과는 킬로그램에서 변환됩니다.",
            ar: "صيغة ديفين (1975): 50 كغ + 2.3 كغ لكل بوصة فوق 5 أقدام للرجال، و45.5 كغ + 2.3 كغ لكل بوصة للنساء — أُسست أصلًا لجرعات الأدوية وما تزال أكثر معادلات الوزن المثالي اقتباسًا. النطاق الصحي يضرب طولك بالمتر مربع في BMI 18.5 و24.9 (حدود منظمة الصحة العالمية). النتائج الإمبراطورية محولة من الكيلوغرام.",
            hi: "डेवाइन सूत्र (1975): पुरुषों के लिए 50 किग्रा + 5 फ़ुट से ऊपर प्रति इंच 2.3 किग्रा, महिलाओं के लिए 45.5 किग्रा + प्रति इंच 2.3 किग्रा — मूलतः दवा खुराक के लिए और आज भी सर्वाधिक उद्धृत आदर्श-वज़न समीकरण। स्वस्थ पट्टी आपकी ऊँचाई (मीटर²) को BMI 18.5 और 24.9 (WHO सीमाएँ) से गुणा करती है। इम्पीरियल परिणाम किलोग्राम से रूपांतरित हैं।",
            id: "Rumus Devine (1975): pria 50 kg + 2,3 kg per inci di atas 5 kaki, wanita 45,5 kg + 2,3 kg per inci — awalnya untuk dosis obat dan masih persamaan berat ideal yang paling banyak dikutip. Rentang sehat mengalikan tinggi Anda dalam meter kuadrat dengan BMI 18,5 dan 24,9 (batas WHO). Hasil imperial dikonversi dari kilogram.",
            vi: "Công thức Devine (1975): nam 50 kg + 2,3 kg mỗi inch trên 5 ft, nữ 45,5 kg + 2,3 kg mỗi inch — ra đời cho việc định lượng thuốc và vẫn là phương trình cân nặng lý tưởng được trích nhiều nhất. Dải khỏe mạnh nhân chiều cao (m²) với BMI 18,5 và 24,9 (ngưỡng WHO). Kết quả hệ Anh quy đổi từ kilogram.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

/* ---------------- Water intake ---------------- */

function Water() {
  const { locale } = useI18n();
  const [units, setUnits] = useState("metric");
  const [kg, setKg] = useState("70");
  const [lb, setLb] = useState("154");
  const [min, setMin] = useState("30");

  const isMetric = units === "metric";
  const r = waterIntake(isMetric ? num(kg) : kgFromLb(num(lb)), num(min));
  const ml = (n: number) => (Number.isFinite(n) ? `${fmt(n, locale, 0)} ml` : fmt(n, locale, 0));

  return (
    <ToolPanel>
      <UnitTabs value={units} onChange={setUnits} locale={locale} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={isMetric ? pick(locale, S.weightKg) : pick(locale, S.weightLb)}>
          <NumIn value={isMetric ? kg : lb} onChange={isMetric ? setKg : setLb} aria="body weight" />
        </Field>
        <Field label={pick(locale, S.exerciseMin)}>
          <NumIn value={min} onChange={setMin} aria="exercise minutes per day" />
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, S.baselineOut), value: ml(r.baselineMl) },
            {
              label: pick(locale, S.exerciseOut),
              value: Number.isFinite(r.exerciseMl) && r.exerciseMl > 0 ? `+${ml(r.exerciseMl)}` : ml(r.exerciseMl),
            },
            {
              label: pick(locale, S.totalOut),
              value: Number.isFinite(r.totalMl) ? `${fmt(r.totalMl / 1000, locale, 2)} L` : fmt(r.totalMl / 1000, locale, 2),
              tone: "accent",
            },
          ]}
          cols="sm:grid-cols-3"
        />
      </div>

      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "Baseline of 35 ml per kilogram of body weight — a standard maintenance-fluid heuristic — plus about 350 ml for every 30 minutes of exercise. In hot weather, or if you sweat heavily, drink more than this. Food and other drinks also supply water.",
            zh: "基础量为每公斤体重 35 毫升(常用的维持液量估算),每运动 30 分钟再补充约 350 毫升。天气炎热或大量出汗时应喝更多。食物和其他饮品也提供水分。",
            ja: "基本量は体重 1 kg あたり 35 ml(維持輸液量の標準的な目安)で、運動 30 分ごとに約 350 ml を追加します。暑い日や大量に汗をかくときはさらに多めに。食事や他の飲み物からも水分は摂れます。",
            es: "Base de 35 ml por kilo de peso corporal — una heurística estándar de líquidos de mantenimiento — más unos 350 ml por cada 30 minutos de ejercicio. Con calor o si suda mucho, beba más. Los alimentos y otras bebidas también aportan agua.",
            pt: "Base de 35 ml por quilo de peso corporal — uma heurística padrão de manutenção de líquidos — mais cerca de 350 ml a cada 30 minutos de exercício. No calor, ou se você suar muito, beba mais. Alimentos e outras bebidas também fornecem água.",
            fr: "Base de 35 ml par kilo de poids corporel — une heuristique standard des liquides d'entretien — plus environ 350 ml par tranche de 30 minutes d'exercice. Par temps chaud ou en cas de transpiration abondante, buvez davantage. La nourriture et les autres boissons apportent aussi de l'eau.",
            de: "Basis von 35 ml pro Kilogramm Körpergewicht — eine gängige Erhaltungsflüssigkeits-Heuristik — plus rund 350 ml je 30 Minuten Sport. Bei Hitze oder starkem Schwitzen mehr trinken. Essen und andere Getränke liefern ebenfalls Flüssigkeit.",
            ru: "База 35 мл на килограмм веса — стандартная эвристика поддерживающей жидкости — плюс около 350 мл за каждые 30 минут упражнений. В жару или при сильном потоотделении пейте больше. Еда и другие напитки тоже дают воду.",
            it: "Base di 35 ml per chilogrammo di peso corporeo — un'euristica standard dei liquidi di mantenimento — più circa 350 ml ogni 30 minuti di esercizio. Con il caldo o sudando molto, bevete di più. Anche cibo e altre bevande forniscono acqua.",
            tr: "Kilogram başına 35 ml taban — standart bakım sıvısı sezgiseli — plus 30 dakikalık egzersiz başına yaklaşık 350 ml. Sıcak hava veya yoğun terlemede daha fazla için. Yiyecek ve diğer içecekler de su sağlar.",
            ko: "체중 1kg당 35ml 기준 — 표준 유지 수분 경험칙 — 그리고 운동 30분당 약 350ml를 더합니다. 더운 날씨나 땀을 많이 흘릴 때는 이보다 더 마시세요. 음식과 다른 음료도 수분을 공급합니다.",
            ar: "أساس 35 مل لكل كيلوغرام من وزن الجسم — إرشاد قياسي لسوائل الصيانة — يضاف إليه نحو 350 مل لكل 30 دقيقة تمرين. في الجو الحار أو عند التعرق الشديد اشرب أكثر. الطعام والمشروبات الأخرى تمدك بالماء أيضًا.",
            hi: "शरीर के वज़न के प्रति किग्रा 35 मिली आधार — रखरखाव-द्रव का मानक अनुमान — और व्यायाम के हर 30 मिनट पर लगभग 350 मिली। गर्मी में या अधिक पसीना आने पर इससे अधिक पिएँ। भोजन और अन्य पेय भी पानी देते हैं।",
            id: "Dasar 35 ml per kilogram berat badan — heuristik standar cairan pemeliharaan — ditambah sekitar 350 ml per 30 menit olahraga. Saat panas atau berkeringat banyak, minumlah lebih. Makanan dan minuman lain juga menyuplai air.",
            vi: "Cơ sở 35 ml mỗi kg cân nặng — quy tắc dịch vụ duy trì chuẩn — cộng thêm khoảng 350 ml cho mỗi 30 phút vận động. Trời nóng hoặc đổ mồ hôi nhiều thì uống nhiều hơn. Đồ ăn và thức uống khác cũng cung cấp nước.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

export function CalcEngineHealth({ kind }: { kind: string }) {
  switch (kind) {
    case "bmr":
      return <Energy kind="bmr" />;
    case "calorie":
      return <Energy kind="calorie" />;
    case "bodyfat":
      return <BodyFat />;
    case "idealweight":
      return <IdealWeight />;
    case "water":
      return <Water />;
    default:
      return null;
  }
}
