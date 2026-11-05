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
  weighted: { en: "Weighted", zh: "按权重", ja: "加重", es: "Ponderado", pt: "Ponderado", fr: "Pondéré", de: "Gewichtet", ru: "Взвешенный", it: "Ponderato", tr: "Ağırlıklı", ko: "가중", ar: "مرجّح", hi: "भारित", id: "Berbobot", vi: "Có trọng số" },
  points: { en: "Points", zh: "按分数", ja: "配点", es: "Puntos", pt: "Pontos", fr: "Points", de: "Punkte", ru: "Баллы", it: "Punti", tr: "Puan", ko: "점수", ar: "النقاط", hi: "अंक", id: "Poin", vi: "Điểm" },
  name: { en: "Assignment (optional)", zh: "名称(可留空)", ja: "課題名(任意)", es: "Tarea (opcional)", pt: "Atividade (opcional)", fr: "Devoir (facultatif)", de: "Aufgabe (optional)", ru: "Задание (необяз.)", it: "Compito (facoltativo)", tr: "Ödev (isteğe bağlı)", ko: "과제(선택)", ar: "الواجب (اختياري)", hi: "असाइनमेंट (वैकल्पिक)", id: "Tugas (opsional)", vi: "Bài tập (không bắt buộc)" },
  score: { en: "Score", zh: "得分", ja: "得点", es: "Nota", pt: "Nota", fr: "Note", de: "Punktzahl", ru: "Оценка", it: "Punteggio", tr: "Puan", ko: "점수", ar: "الدرجة", hi: "स्कोर", id: "Nilai", vi: "Điểm số" },
  max: { en: "Out of", zh: "满分", ja: "満点", es: "Máximo", pt: "Máximo", fr: "Sur", de: "Von", ru: "Из", it: "Su", tr: "Üzerinden", ko: "만점", ar: "من أصل", hi: "में से", id: "Dari", vi: "Trên tổng" },
  weight: { en: "Weight %", zh: "权重 %", ja: "比重 %", es: "Peso %", pt: "Peso %", fr: "Poids %", de: "Gewicht %", ru: "Вес %", it: "Peso %", tr: "Ağırlık %", ko: "비중 %", ar: "الوزن %", hi: "भार %", id: "Bobot %", vi: "Trọng số %" },
  addRow: { en: "+ Add assignment", zh: "+ 添加一项成绩", ja: "+ 課題を追加", es: "+ Añadir tarea", pt: "+ Adicionar atividade", fr: "+ Ajouter un devoir", de: "+ Aufgabe hinzufügen", ru: "+ Добавить задание", it: "+ Aggiungi compito", tr: "+ Ödev ekle", ko: "+ 과제 추가", ar: "+ إضافة واجب", hi: "+ असाइनमेंट जोड़ें", id: "+ Tambah tugas", vi: "+ Thêm bài tập" },
  removeRow: { en: "Remove row", zh: "删除这一行", ja: "この行を削除", es: "Eliminar fila", pt: "Remover linha", fr: "Supprimer la ligne", de: "Zeile entfernen", ru: "Удалить строку", it: "Rimuovi riga", tr: "Satırı kaldır", ko: "행 삭제", ar: "إزالة الصف", hi: "पंक्ति हटाएँ", id: "Hapus baris", vi: "Xóa dòng" },
  currentGrade: { en: "Current grade", zh: "当前总评", ja: "現在の成績", es: "Nota actual", pt: "Nota atual", fr: "Note actuelle", de: "Aktuelle Note", ru: "Текущая оценка", it: "Voto attuale", tr: "Mevcut not", ko: "현재 성적", ar: "الدرجة الحالية", hi: "वर्तमान ग्रेड", id: "Nilai saat ini", vi: "Điểm hiện tại" },
  letter: { en: "Letter grade", zh: "等级", ja: "評価", es: "Letra", pt: "Conceito", fr: "Note littérale", de: "Notenstufe", ru: "Буквенная оценка", it: "Voto in lettere", tr: "Harf notu", ko: "등급", ar: "الدرجة الحرفية", hi: "अक्षर ग्रेड", id: "Nilai huruf", vi: "Xếp loại chữ" },
  weightCovered: { en: "Weight graded", zh: "已计入权重", ja: "計算済みの比重", es: "Peso evaluado", pt: "Peso avaliado", fr: "Poids évalué", de: "Bewertetes Gewicht", ru: "Оценённый вес", it: "Peso valutato", tr: "Notlu ağırlık", ko: "평가된 비중", ar: "الوزن المقيَّم", hi: "ग्रेड किया भार", id: "Bobot ternilai", vi: "Trọng số đã chấm" },
  pointsSoFar: { en: "Points so far", zh: "目前得分", ja: "現在の得点", es: "Puntos hasta ahora", pt: "Pontos até agora", fr: "Points à ce jour", de: "Punkte bisher", ru: "Баллов на сейчас", it: "Punti finora", tr: "Şu kadarki puan", ko: "지금까지 점수", ar: "النقاط حتى الآن", hi: "अब तक के अंक", id: "Poin sejauh ini", vi: "Điểm tích lũy" },
  finalTitle: { en: "What do I need on the final?", zh: "期末要考多少分?", ja: "期末で何点が必要?", es: "¿Qué necesito en el examen final?", pt: "Quanto preciso no exame final?", fr: "Que me faut-il au final ?", de: "Was brauche ich im Finale?", ru: "Что нужно на финале?", it: "Cosa mi serve sul finale?", tr: "Finalden ne almam gerek?", ko: "기말에서 몇 점이 필요할까?", ar: "ماذا أحتاج في الاختبار النهائي؟", hi: "फ़ाइनल में मुझे क्या चाहिए?", id: "Apa yang kubutuhkan di ujian akhir?", vi: "Tôi cần bao nhiêu ở bài cuối?" },
  finalWeight: { en: "Final exam weight %", zh: "期末权重 %", ja: "期末の比重 %", es: "Peso del examen final %", pt: "Peso do exame final %", fr: "Poids du final %", de: "Gewicht der Abschlussprüfung %", ru: "Вес финала %", it: "Peso esame finale %", tr: "Final ağırlığı %", ko: "기말 비중 %", ar: "وزن الاختبار النهائي %", hi: "फ़ाइनल भार %", id: "Bobot ujian akhir %", vi: "Trọng số cuối kỳ %" },
  finalPoints: { en: "Final exam points", zh: "期末满分", ja: "期末の配点", es: "Puntos del examen final", pt: "Pontos do exame final", fr: "Points du final", de: "Punkte der Abschlussprüfung", ru: "Баллы финала", it: "Punti esame finale", tr: "Final puanı", ko: "기말 점수", ar: "نقاط الاختبار النهائي", hi: "फ़ाइनल अंक", id: "Poin ujian akhir", vi: "Điểm cuối kỳ" },
  target: { en: "Target overall %", zh: "目标总评 %", ja: "目標の総合 %", es: "Objetivo global %", pt: "Meta global %", fr: "Objectif global %", de: "Ziel gesamt %", ru: "Целевой общий %", it: "Obiettivo complessivo %", tr: "Hedef genel %", ko: "목표 총점 %", ar: "الهدف الإجمالي %", hi: "लक्ष्य कुल %", id: "Target keseluruhan %", vi: "Mục tiêu tổng %" },
  need: {
    en: "Score at least {p}% on the final to reach {t}% overall.",
    zh: "期末至少要考 {p}%,总评才能达到 {t}%。",
    ja: "総合 {t}% を達成するには期末で少なくとも {p}% が必要です。",
    es: "Necesitas al menos {p}% en el final para alcanzar {t}% global.",
    pt: "Você precisa de pelo menos {p}% no final para atingir {t}% global.",
    fr: "Obtenez au moins {p}% au final pour atteindre {t}% au total.",
    de: "Erzielte mindestens {p} % in der Abschlussprüfung, um insgesamt {t} % zu erreichen.",
    ru: "Нужно набрать минимум {p}% на финале, чтобы достичь {t}% в целом.",
    it: "Ottieni almeno il {p}% sul finale per raggiungere il {t}% complessivo.",
    tr: "Hedefe {t}% ulaşmak için finalden en az %{p} alın.",
    ko: "전체 {t}% 달성을 위해 기말에서 최소 {p}%를 받아야 합니다.",
    ar: "تحتاج إلى {p}% على الأقل في الاختبار النهائي للوصول إلى {t}% إجمالًا.",
    hi: "कुल {t}% तक पहुँचने के लिए फ़ाइनल में कम से कम {p}% चाहिए।",
    id: "Butuh minimal {p}% pada ujian akhir untuk mencapai {t}% keseluruhan.",
    vi: "Cần ít nhất {p}% điểm cuối kỳ để đạt {t}% tổng.",
  },
  needPts: {
    en: "Score at least {p}% ({pts} of {fp} points) on the final to reach {t}% overall.",
    zh: "期末至少要考 {p}%(即 {pts} / {fp} 分),总评才能达到 {t}%。",
    ja: "総合 {t}% を達成するには期末で少なくとも {p}%({fp} 点中 {pts} 点)が必要です。",
    es: "Necesitas al menos {p}% ({pts} de {fp} puntos) en el final para alcanzar {t}% global.",
    pt: "Você precisa de pelo menos {p}% ({pts} de {fp} pontos) no final para atingir {t}% global.",
    fr: "Obtenez au moins {p}% ({pts} points sur {fp}) au final pour atteindre {t}% au total.",
    de: "Erzielte mindestens {p} % ({pts} von {fp} Punkten) im Finale für insgesamt {t} %.",
    ru: "Нужно минимум {p}% ({pts} из {fp} баллов) на финале для {t}% в целом.",
    it: "Ottieni almeno il {p}% ({pts} su {fp} punti) sul finale per il {t}% complessivo.",
    tr: "Hedefe {t}% ulaşmak için finalden en az %{p} (%{pts}/${fp} puan) alın.",
    ko: "전체 {t}% 달성을 위해 기말에서 최소 {p}%({fp}점 중 {pts}점)가 필요합니다.",
    ar: "تحتاج إلى {p}% على الأقل ({pts} من {fp} نقطة) في النهائي للوصول إلى {t}% إجمالًا.",
    hi: "कुल {t}% के लिए फ़ाइनल में कम से कम {p}% ({fp} में से {pts} अंक) चाहिए।",
    id: "Butuh minimal {p}% ({pts} dari {fp} poin) pada ujian akhir untuk mencapai {t}%.",
    vi: "Cần ít nhất {p}% ({pts}/{fp} điểm) điểm cuối kỳ để đạt {t}% tổng.",
  },
  secured: {
    en: "Already secured — the required final score is {p}% (0% or less).",
    zh: "已经稳了——需要的期末分数是 {p}%(0% 以下)。",
    ja: "すでに達成済み — 必要な期末スコアは {p}%(0% 以下)です。",
    es: "Ya está asegurado: la nota final requerida es {p}% (0% o menos).",
    pt: "Já está garantido — a nota final necessária é {p}% (0% ou menos).",
    fr: "Déjà assuré — le score final requis est de {p}% (0 % ou moins).",
    de: "Bereits gesichert — die nötige Abschlusspunktzahl beträgt {p} % (0 % oder weniger).",
    ru: "Уже обеспечено — требуемый балл на финале: {p}% (0% или меньше).",
    it: "Già garantito — il punteggio richiesto sul finale è {p}% (0% o meno).",
    tr: "Zaten garanti — gereken final puanı %{p} (%0 veya altı).",
    ko: "이미 확보됨 — 기말 필요 점수는 {p}%(0% 이하)입니다.",
    ar: "مضمون بالفعل — الدرجة المطلوبة في النهائي {p}% (صفر أو أقل).",
    hi: "पहले से सुनिश्चित — फ़ाइनल में आवश्यक {p}% (0% या कम) है।",
    id: "Sudah aman — skor ujian akhir yang dibutuhkan {p}% (0% atau kurang).",
    vi: "Đã chắc chắn — điểm cuối kỳ cần là {p}% (0% hoặc thấp hơn).",
  },
  impossible: {
    en: "Not reachable: even 100% on the final falls short of {t}% overall.",
    zh: "达不到了:期末就算考 100%,总评也到不了 {t}%。",
    ja: "届きません:期末で 100% を取っても総合 {t}% には届きません。",
    es: "Inalcanzable: incluso con 100% en el final no se llega al {t}% global.",
    pt: "Inalcançável: mesmo com 100% no final não se chega a {t}% global.",
    fr: "Inatteignable : même 100 % au final ne suffit pas pour atteindre {t}% au total.",
    de: "Nicht erreichbar: Selbst 100 % im Finale reichen für {t} % insgesamt nicht.",
    ru: "Недостижимо: даже 100% на финале не хватит для {t}% в целом.",
    it: "Irraggiungibile: anche il 100% sul finale non basta per il {t}% complessivo.",
    tr: "Ulaşılamaz: finalden %100 alınsa bile %{t} hedefine ulaşılamaz.",
    ko: "도달 불가: 기말에서 100%를 받아도 전체 {t}%에 못 미칩니다.",
    ar: "غير قابل للتحقيق: حتى 100% في النهائي لا تكفي للوصول إلى {t}% إجمالًا.",
    hi: "असंभव: फ़ाइनल में 100% भी कुल {t}% तक नहीं पहुँचाएगा।",
    id: "Tak terjangkau: bahkan 100% pada ujian akhir tidak cukup untuk {t}% keseluruhan.",
    vi: "Không thể đạt: kể cả 100% điểm cuối cũng không đủ cho {t}% tổng.",
  },
  needNA: {
    en: "Enter a positive final weight / points and a target to see what you need.",
    zh: "填写大于 0 的期末权重 / 分数和目标总评,即可反推所需分数。",
    ja: "期末の比重・配点(0 より大きい値)と目標を入力すると必要な点数が出ます。",
    es: "Introduce un peso / puntos finales positivos y un objetivo para ver lo que necesitas.",
    pt: "Informe peso / pontos finais positivos e uma meta para ver o que é preciso.",
    fr: "Saisissez un poids / des points positifs pour le final ainsi qu'un objectif.",
    de: "Gib eine positive Abschlussgewichtung / Punktezahl und ein Ziel ein.",
    ru: "Введите положительный вес/баллы финала и цель.",
    it: "Inserisci un peso/punteggio positivo per il finale e un obiettivo.",
    tr: "Pozitif bir final ağırlığı/puanı ve bir hedef girin.",
    ko: "양수의 기말 비중/점수와 목표를 입력하세요.",
    ar: "أدخل وزنًا/نقاطًا موجبة للنهائي وهدفًا.",
    hi: "सकारात्मक फ़ाइनल वेट/अंक और एक लक्ष्य दर्ज करें।",
    id: "Masukkan bobot/poin ujian akhir positif dan target.",
    vi: "Nhập trọng số/điểm cuối kỳ dương và một mục tiêu.",
  },
  scaleLabel: { en: "Grading scale", zh: "等级标准", ja: "評価基準", es: "Escala", pt: "Escala", fr: "Barème", de: "Notenskala", ru: "Шкала оценок", it: "Scala di valutazione", tr: "Not ölçeği", ko: "성적 척도", ar: "سلّم الدرجات", hi: "ग्रेडिंग स्केल", id: "Skala penilaian", vi: "Thang điểm" },
  scaleUs: { en: "A–F (10-point)", zh: "A–F(10 分制)", ja: "A–F(10 段階)", es: "A–F (10 niveles)", pt: "A–F (10 níveis)", fr: "A–F (10 points)", de: "A–F (10 Punkte)", ru: "A–F (10 баллов)", it: "A–F (10 punti)", tr: "A–F (10 puan)", ko: "A–F(10점)", ar: "A–F (10 نقاط)", hi: "A–F (10 अंक)", id: "A–F (10 poin)", vi: "A–F (10 điểm)" },
  scalePm: { en: "A± (plus/minus)", zh: "A±(带加减)", ja: "A±(プラス / マイナス)", es: "A± (con ±)", pt: "A± (com ±)", fr: "A± (plus/moins)", de: "A± (plus/minus)", ru: "A± (плюс/минус)", it: "A± (più/meno)", tr: "A± (artı/eksi)", ko: "A±(+/−)", ar: "A± (زائد/ناقص)", hi: "A± (प्लस/माइनस)", id: "A± (plus/minus)", vi: "A± (cộng/trừ)" },
  scalePf: { en: "Pass / Fail", zh: "及格 / 不及格", ja: "合格 / 不合格", es: "Apto / No apto", pt: "Aprovado / Reprovado", fr: "Réussite / échec", de: "Bestehen / Durchfallen", ru: "Зачёт / незачёт", it: "Superato / bocciato", tr: "Geçti / kaldı", ko: "통과 / 낙제", ar: "ناجح / راسب", hi: "पास / फेल", id: "Lulus / Gagal", vi: "Đạt / Không đạt" },
  scaleCustom: { en: "Custom thresholds", zh: "自定义门槛", ja: "カスタムしきい値", es: "Umbrales personalizados", pt: "Limites personalizados", fr: "Seuils personnalisés", de: "Eigene Grenzwerte", ru: "Свои пороги", it: "Soglie personalizzate", tr: "Özel eşikler", ko: "사용자 지정 기준", ar: "حدود مخصصة", hi: "कस्टम सीमाएँ", id: "Ambang kustom", vi: "Ngưỡng tùy chỉnh" },
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
