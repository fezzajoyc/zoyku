"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { BigOut, Field, Note, NumIn, Stats, Tabs, TextIn, fmt, pick } from "./calc-ui";
import { fill } from "../_lib/types";
import {
  PASS_FAIL_SCALE,
  PLUS_MINUS_SCALE,
  US_SCALE,
  gradePercent,
  isValidItem,
  letterFor,
  requiredFinalPoints,
  requiredFinalWeighted,
  type GradeItem,
  type GradeMode,
  type LetterScale,
} from "../_lib/grade";

/**
 * 成绩计算引擎:动态行(名称可选 / 得分 / 满分 / 权重),加权或按分两种模式,
 * 外加"期末要考多少分"反推。纯数学在 tools/_lib/grade.ts,这里只做编排。
 */

type Row = { name: string; score: string; max: string; weight: string };
type ScaleId = "us" | "pm" | "pf" | "custom";

const DEMO: Row[] = [
  { name: "Homework", score: "92", max: "100", weight: "20" },
  { name: "Midterm", score: "78", max: "100", weight: "30" },
  { name: "Essay", score: "85", max: "100", weight: "15" },
];

const EMPTY_ROW: Row = { name: "", score: "", max: "", weight: "" };

const L = {
  weighted: { en: "Weighted", zh: "按权重", ja: "加重", es: "Ponderado", pt: "Ponderado" },
  points: { en: "Points", zh: "按分数", ja: "配点", es: "Puntos", pt: "Pontos" },
  name: { en: "Assignment (optional)", zh: "名称(可留空)", ja: "課題名(任意)", es: "Tarea (opcional)", pt: "Atividade (opcional)" },
  score: { en: "Score", zh: "得分", ja: "得点", es: "Nota", pt: "Nota" },
  max: { en: "Out of", zh: "满分", ja: "満点", es: "Máximo", pt: "Máximo" },
  weight: { en: "Weight %", zh: "权重 %", ja: "比重 %", es: "Peso %", pt: "Peso %" },
  addRow: { en: "+ Add assignment", zh: "+ 添加一项成绩", ja: "+ 課題を追加", es: "+ Añadir tarea", pt: "+ Adicionar atividade" },
  removeRow: { en: "Remove row", zh: "删除这一行", ja: "この行を削除", es: "Eliminar fila", pt: "Remover linha" },
  currentGrade: { en: "Current grade", zh: "当前总评", ja: "現在の成績", es: "Nota actual", pt: "Nota atual" },
  letter: { en: "Letter grade", zh: "等级", ja: "評価", es: "Letra", pt: "Conceito" },
  weightCovered: { en: "Weight graded", zh: "已计入权重", ja: "計算済みの比重", es: "Peso evaluado", pt: "Peso avaliado" },
  pointsSoFar: { en: "Points so far", zh: "目前得分", ja: "現在の得点", es: "Puntos hasta ahora", pt: "Pontos até agora" },
  finalTitle: { en: "What do I need on the final?", zh: "期末要考多少分?", ja: "期末で何点が必要?", es: "¿Qué necesito en el examen final?", pt: "Quanto preciso no exame final?" },
  finalWeight: { en: "Final exam weight %", zh: "期末权重 %", ja: "期末の比重 %", es: "Peso del examen final %", pt: "Peso do exame final %" },
  finalPoints: { en: "Final exam points", zh: "期末满分", ja: "期末の配点", es: "Puntos del examen final", pt: "Pontos do exame final" },
  target: { en: "Target overall %", zh: "目标总评 %", ja: "目標の総合 %", es: "Objetivo global %", pt: "Meta global %" },
  need: {
    en: "Score at least {p}% on the final to reach {t}% overall.",
    zh: "期末至少要考 {p}%,总评才能达到 {t}%。",
    ja: "総合 {t}% を達成するには期末で少なくとも {p}% が必要です。",
    es: "Necesitas al menos {p}% en el final para alcanzar {t}% global.",
    pt: "Você precisa de pelo menos {p}% no final para atingir {t}% global.",
  },
  needPts: {
    en: "Score at least {p}% ({pts} of {fp} points) on the final to reach {t}% overall.",
    zh: "期末至少要考 {p}%(即 {pts} / {fp} 分),总评才能达到 {t}%。",
    ja: "総合 {t}% を達成するには期末で少なくとも {p}%({fp} 点中 {pts} 点)が必要です。",
    es: "Necesitas al menos {p}% ({pts} de {fp} puntos) en el final para alcanzar {t}% global.",
    pt: "Você precisa de pelo menos {p}% ({pts} de {fp} pontos) no final para atingir {t}% global.",
  },
  secured: {
    en: "Already secured — the required final score is {p}% (0% or less).",
    zh: "已经稳了——需要的期末分数是 {p}%(0% 以下)。",
    ja: "すでに達成済み — 必要な期末スコアは {p}%(0% 以下)です。",
    es: "Ya está asegurado: la nota final requerida es {p}% (0% o menos).",
    pt: "Já está garantido — a nota final necessária é {p}% (0% ou menos).",
  },
  impossible: {
    en: "Not reachable: even 100% on the final falls short of {t}% overall.",
    zh: "达不到了:期末就算考 100%,总评也到不了 {t}%。",
    ja: "届きません:期末で 100% を取っても総合 {t}% には届きません。",
    es: "Inalcanzable: incluso con 100% en el final no se llega al {t}% global.",
    pt: "Inalcançável: mesmo com 100% no final não se chega a {t}% global.",
  },
  needNA: {
    en: "Enter a positive final weight / points and a target to see what you need.",
    zh: "填写大于 0 的期末权重 / 分数和目标总评,即可反推所需分数。",
    ja: "期末の比重・配点(0 より大きい値)と目標を入力すると必要な点数が出ます。",
    es: "Introduce un peso / puntos finales positivos y un objetivo para ver lo que necesitas.",
    pt: "Informe peso / pontos finais positivos e uma meta para ver o que é preciso.",
  },
  scaleLabel: { en: "Grading scale", zh: "等级标准", ja: "評価基準", es: "Escala", pt: "Escala" },
  scaleUs: { en: "A–F (10-point)", zh: "A–F(10 分制)", ja: "A–F(10 段階)", es: "A–F (10 niveles)", pt: "A–F (10 níveis)" },
  scalePm: { en: "A± (plus/minus)", zh: "A±(带加减)", ja: "A±(プラス / マイナス)", es: "A± (con ±)", pt: "A± (com ±)" },
  scalePf: { en: "Pass / Fail", zh: "及格 / 不及格", ja: "合格 / 不合格", es: "Apto / No apto", pt: "Aprovado / Reprovado" },
  scaleCustom: { en: "Custom thresholds", zh: "自定义门槛", ja: "カスタムしきい値", es: "Umbrales personalizados", pt: "Limites personalizados" },
};

/** "" → NaN(空串不能当 0 计入)。 */
function num(s: string): number {
  const t = s.trim();
  if (t === "") return NaN;
  const n = Number(t.replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
}

function toItems(rows: Row[]): GradeItem[] {
  return rows.map((r) => ({
    name: r.name.trim() || undefined,
    score: num(r.score),
    max: num(r.max),
    weight: num(r.weight),
  }));
}

export function CalcEngineGrade() {
  const { locale, t } = useI18n();
  const [mode, setMode] = useState<GradeMode>("weighted");
  const [rows, setRows] = useState<Row[]>([...DEMO, { ...EMPTY_ROW }]);
  const [scaleId, setScaleId] = useState<ScaleId>("us");
  const [custom, setCustom] = useState({ a: "90", b: "80", c: "70", d: "60" });
  const [finalWeight, setFinalWeight] = useState("35");
  const [finalPoints, setFinalPoints] = useState("200");
  const [target, setTarget] = useState("85");

  const items = toItems(rows);
  const percent = gradePercent(items, mode);
  const hasGrade = Number.isFinite(percent);

  const scale: LetterScale =
    scaleId === "us"
      ? US_SCALE
      : scaleId === "pm"
        ? PLUS_MINUS_SCALE
        : scaleId === "pf"
          ? PASS_FAIL_SCALE
          : // letterFor 只认「percent ≥ min」的最高门槛,空缺门槛(NaN)自然不参与
            [
              { min: num(custom.a), letter: "A" },
              { min: num(custom.b), letter: "B" },
              { min: num(custom.c), letter: "C" },
              { min: num(custom.d), letter: "D" },
              { min: 0, letter: "F" },
            ];
  const letter = letterFor(percent, scale);

  const valid = items.filter(isValidItem);
  const weightSum = valid.reduce((s, it) => s + (Number.isFinite(it.weight) ? (it.weight as number) : 0), 0);
  const earned = valid.reduce((s, it) => s + it.score, 0);
  const possible = valid.reduce((s, it) => s + it.max, 0);

  const fw = num(finalWeight);
  const fp = num(finalPoints);
  const tg = num(target);
  const required =
    mode === "weighted"
      ? requiredFinalWeighted({ items, finalWeight: fw, targetPercent: tg })
      : requiredFinalPoints({ earned, possible, finalPoints: fp, targetPercent: tg });
  const reqValid = Number.isFinite(required);
  const secured = reqValid && required <= 0;
  const impossible = reqValid && required > 100;

  const setRow = (i: number, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r, j) => (j === i ? { ...r, ...patch } : r)));

  const tone = secured ? "good" : impossible ? "bad" : "accent";

  const message = !reqValid
    ? pick(locale, L.needNA)
    : secured
      ? fill(pick(locale, L.secured), { p: fmt(required, locale, 1) })
      : impossible
        ? fill(pick(locale, L.impossible), { t: fmt(tg, locale, 1) })
        : mode === "weighted"
          ? fill(pick(locale, L.need), { p: fmt(required, locale, 1), t: fmt(tg, locale, 1) })
          : fill(pick(locale, L.needPts), {
              p: fmt(required, locale, 1),
              pts: fmt((required / 100) * fp, locale, 0),
              fp: fmt(fp, locale, 0),
              t: fmt(tg, locale, 1),
            });

  return (
    <ToolPanel>
      <div className="space-y-4">
        <Tabs
          options={[
            { id: "weighted", label: pick(locale, L.weighted) },
            { id: "points", label: pick(locale, L.points) },
          ]}
          value={mode}
          onChange={(id) => setMode(id as GradeMode)}
        />

        <div className="space-y-2">
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 sm:grid-cols-[minmax(0,1fr)_5.5rem_5.5rem_5.5rem_2.25rem]">
              <TextIn value={r.name} onChange={(v) => setRow(i, { name: v })} aria={pick(locale, L.name)} placeholder={pick(locale, L.name)} />
              <NumIn value={r.score} onChange={(v) => setRow(i, { score: v })} aria={pick(locale, L.score)} placeholder={pick(locale, L.score)} />
              <NumIn value={r.max} onChange={(v) => setRow(i, { max: v })} aria={pick(locale, L.max)} placeholder={pick(locale, L.max)} />
              {mode === "weighted" ? (
                <NumIn value={r.weight} onChange={(v) => setRow(i, { weight: v })} aria={pick(locale, L.weight)} placeholder={pick(locale, L.weight)} />
              ) : (
                <span className="hidden sm:block" />
              )}
              <button
                type="button"
                onClick={() => setRows((rs) => (rs.length > 1 ? rs.filter((_, j) => j !== i) : rs))}
                aria-label={`${pick(locale, L.removeRow)} ${i + 1}`}
                className="mono rounded-lg border hairline text-[14px] text-[var(--color-sub)] transition-colors hover:bg-[var(--color-surface)]"
              >
                ×
              </button>
            </div>
          ))}
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setRows((rs) => [...rs, { ...EMPTY_ROW }])}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              {pick(locale, L.addRow)}
            </button>
            <button
              type="button"
              onClick={() => setRows([...DEMO, { ...EMPTY_ROW }])}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-accent-strong)] transition-colors hover:bg-[rgba(0,113,227,0.06)]"
            >
              {t.common.sample}
            </button>
            <button
              type="button"
              onClick={() => setRows([{ ...EMPTY_ROW }])}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              {t.common.clear}
            </button>
          </div>
        </div>

        <Stats
          items={[
            { label: pick(locale, L.currentGrade), value: hasGrade ? `${fmt(percent, locale, 1)}%` : "—", tone: "accent" },
            { label: pick(locale, L.letter), value: hasGrade ? letter || "—" : "—", tone: "good" },
            mode === "weighted"
              ? { label: pick(locale, L.weightCovered), value: `${fmt(weightSum, locale, 0)}%` }
              : { label: pick(locale, L.pointsSoFar), value: `${fmt(earned, locale, 0)} / ${fmt(possible, locale, 0)}` },
          ]}
          cols="sm:grid-cols-3"
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {mode === "weighted" ? (
            <Field label={pick(locale, L.finalWeight)}>
              <NumIn value={finalWeight} onChange={setFinalWeight} aria={pick(locale, L.finalWeight)} />
            </Field>
          ) : (
            <Field label={pick(locale, L.finalPoints)}>
              <NumIn value={finalPoints} onChange={setFinalPoints} aria={pick(locale, L.finalPoints)} />
            </Field>
          )}
          <Field label={pick(locale, L.target)}>
            <NumIn value={target} onChange={setTarget} aria={pick(locale, L.target)} />
          </Field>
          <Field label={pick(locale, L.scaleLabel)}>
            <select
              className="field"
              value={scaleId}
              onChange={(e) => setScaleId(e.target.value as ScaleId)}
              aria-label={pick(locale, L.scaleLabel)}
            >
              <option value="us">{pick(locale, L.scaleUs)}</option>
              <option value="pm">{pick(locale, L.scalePm)}</option>
              <option value="pf">{pick(locale, L.scalePf)}</option>
              <option value="custom">{pick(locale, L.scaleCustom)}</option>
            </select>
          </Field>
        </div>

        {scaleId === "custom" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(["a", "b", "c", "d"] as const).map((k, i) => (
              <Field key={k} label={`${["A", "B", "C", "D"][i]} ≥`}>
                <NumIn value={custom[k]} onChange={(v) => setCustom((c) => ({ ...c, [k]: v }))} aria={`${["A", "B", "C", "D"][i]} minimum`} />
              </Field>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-[15px] font-semibold">{pick(locale, L.finalTitle)}</h3>
          <BigOut>
            <span
              className={
                tone === "good"
                  ? "text-[var(--color-good)]"
                  : tone === "bad"
                    ? "text-[var(--color-bad)]"
                    : "text-[var(--color-accent-strong)]"
              }
            >
              {reqValid ? `${fmt(required, locale, 1)}%` : "—"}
            </span>
          </BigOut>
          <Note>{message}</Note>
        </div>
      </div>
    </ToolPanel>
  );
}
