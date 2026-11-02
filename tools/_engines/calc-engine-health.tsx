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
  metric: { en: "Metric", zh: "公制", ja: "メートル法", es: "Métrico", pt: "Métrico" },
  imperial: { en: "Imperial", zh: "英制", ja: "ヤード・ポンド法", es: "Imperial", pt: "Imperial" },
  male: { en: "Male", zh: "男", ja: "男性", es: "Hombre", pt: "Homem" },
  female: { en: "Female", zh: "女", ja: "女性", es: "Mujer", pt: "Mulher" },
  sex: { en: "Sex", zh: "性别", ja: "性別", es: "Sexo", pt: "Sexo" },
  age: { en: "Age (years)", zh: "年龄(岁)", ja: "年齢(歳)", es: "Edad (años)", pt: "Idade (anos)" },
  heightCm: { en: "Height (cm)", zh: "身高 (cm)", ja: "身長 (cm)", es: "Altura (cm)", pt: "Altura (cm)" },
  weightKg: { en: "Weight (kg)", zh: "体重 (kg)", ja: "体重 (kg)", es: "Peso (kg)", pt: "Peso (kg)" },
  heightFt: { en: "Height (ft)", zh: "身高 (英尺)", ja: "身長 (フィート)", es: "Altura (pies)", pt: "Altura (pés)" },
  heightIn: { en: "Height (in)", zh: "身高 (英寸)", ja: "身長 (インチ)", es: "Altura (pulgadas)", pt: "Altura (polegadas)" },
  weightLb: { en: "Weight (lb)", zh: "体重 (磅)", ja: "体重 (lb)", es: "Peso (lb)", pt: "Peso (lb)" },
  waistCm: { en: "Waist (cm)", zh: "腰围 (cm)", ja: "腹囲 (cm)", es: "Cintura (cm)", pt: "Cintura (cm)" },
  neckCm: { en: "Neck (cm)", zh: "颈围 (cm)", ja: "首囲 (cm)", es: "Cuello (cm)", pt: "Pescoço (cm)" },
  hipCm: { en: "Hip (cm)", zh: "臀围 (cm)", ja: "臀囲 (cm)", es: "Cadera (cm)", pt: "Quadril (cm)" },
  waistIn: { en: "Waist (in)", zh: "腰围 (英寸)", ja: "腹囲 (インチ)", es: "Cintura (in)", pt: "Cintura (in)" },
  neckIn: { en: "Neck (in)", zh: "颈围 (英寸)", ja: "首囲 (インチ)", es: "Cuello (in)", pt: "Pescoço (in)" },
  hipIn: { en: "Hip (in)", zh: "臀围 (英寸)", ja: "臀囲 (インチ)", es: "Cadera (in)", pt: "Quadril (in)" },
  activity: { en: "Activity level", zh: "活动水平", ja: "活動レベル", es: "Nivel de actividad", pt: "Nível de atividade" },
  goal: { en: "Goal", zh: "目标", ja: "目標", es: "Objetivo", pt: "Objetivo" },
  bmrOut: { en: "BMR (kcal/day)", zh: "基础代谢 (千卡/天)", ja: "基礎代謝 (kcal/日)", es: "TMB (kcal/día)", pt: "TMB (kcal/dia)" },
  tdeeOut: { en: "Maintenance (kcal/day)", zh: "维持热量 (千卡/天)", ja: "維持カロリー (kcal/日)", es: "Mantenimiento (kcal/día)", pt: "Manutenção (kcal/dia)" },
  targetOut: { en: "Target (kcal/day)", zh: "目标热量 (千卡/天)", ja: "目標カロリー (kcal/日)", es: "Objetivo (kcal/día)", pt: "Meta (kcal/dia)" },
  bodyFatOut: { en: "Body fat", zh: "体脂率", ja: "体脂肪率", es: "Grasa corporal", pt: "Gordura corporal" },
  devineMale: { en: "Devine — men", zh: "Devine 公式(男)", ja: "Devine 式(男性)", es: "Devine — hombres", pt: "Devine — homens" },
  devineFemale: { en: "Devine — women", zh: "Devine 公式(女)", ja: "Devine 式(女性)", es: "Devine — mujeres", pt: "Devine — mulheres" },
  healthyRange: { en: "Healthy BMI range", zh: "健康 BMI 区间", ja: "健康 BMI の範囲", es: "Rango de IMC saludable", pt: "Faixa de IMC saudável" },
  baselineOut: { en: "Baseline", zh: "基础需水量", ja: "基本必要量", es: "Base", pt: "Base" },
  exerciseOut: { en: "Exercise bonus", zh: "运动补充", ja: "運動の補充", es: "Extra por ejercicio", pt: "Extra por exercício" },
  totalOut: { en: "Daily target", zh: "每日目标", ja: "1日の目標", es: "Objetivo diario", pt: "Meta diária" },
  exerciseMin: { en: "Exercise (min/day)", zh: "运动时间(分钟/天)", ja: "運動(分/日)", es: "Ejercicio (min/día)", pt: "Exercício (min/dia)" },
};

const ACTIVITY_LABELS: Record<ActivityKey, Record<string, string>> = {
  sedentary: {
    en: "Sedentary — little or no exercise",
    zh: "久坐 — 几乎不运动",
    ja: "座位中心 — ほぼ運動なし",
    es: "Sedentario — poco o ningún ejercicio",
    pt: "Sedentário — pouco ou nenhum exercício",
  },
  lightlyActive: {
    en: "Lightly active — 1–3 days/week",
    zh: "轻度活动 — 每周 1–3 次",
    ja: "軽い運動 — 週 1〜3 回",
    es: "Ligeramente activo — 1–3 días/semana",
    pt: "Levemente ativo — 1–3 dias/semana",
  },
  moderatelyActive: {
    en: "Moderately active — 3–5 days/week",
    zh: "中度活动 — 每周 3–5 次",
    ja: "中程度の運動 — 週 3〜5 回",
    es: "Moderadamente activo — 3–5 días/semana",
    pt: "Moderadamente ativo — 3–5 dias/semana",
  },
  veryActive: {
    en: "Very active — 6–7 days/week",
    zh: "高强度活动 — 每周 6–7 次",
    ja: "激しい運動 — 週 6〜7 回",
    es: "Muy activo — 6–7 días/semana",
    pt: "Muito ativo — 6–7 dias/semana",
  },
  extraActive: {
    en: "Extra active — physical job or twice-daily training",
    zh: "极高强度 — 体力职业或一天两练",
    ja: "非常に激しい — 肉体労働や1日2回の練習",
    es: "Extra activo — trabajo físico o doble sesión diaria",
    pt: "Extra ativo — trabalho físico ou treino duas vezes ao dia",
  },
};

const GOAL_LABELS: Record<GoalKey, Record<string, string>> = {
  lose: {
    en: "Lose weight (≈ −0.5 kg/week)",
    zh: "减重(约 −0.5 公斤/周)",
    ja: "減量(約 −0.5 kg/週)",
    es: "Perder peso (≈ −0,5 kg/semana)",
    pt: "Perder peso (≈ −0,5 kg/semana)",
  },
  maintain: {
    en: "Maintain weight",
    zh: "维持体重",
    ja: "体重維持",
    es: "Mantener peso",
    pt: "Manter peso",
  },
  gain: {
    en: "Gain weight (≈ +0.5 kg/week)",
    zh: "增重(约 +0.5 公斤/周)",
    ja: "増量(約 +0.5 kg/週)",
    es: "Ganar peso (≈ +0,5 kg/semana)",
    pt: "Ganar peso (≈ +0,5 kg/semana)",
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
