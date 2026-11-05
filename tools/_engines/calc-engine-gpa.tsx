"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, NumIn, Note, Sel, Stats, TextIn, fmt, pick } from "./calc-ui";
import { fill } from "../_lib/types";
import { blendGpa, GPA_LETTERS, gpaFromCourses } from "../_lib/grade";

/**
 * GPA 引擎:动态课程行(名称可选 / 学分 / 字母等级),按 4.0 质量点表算学期 GPA;
 * 填入既往 GPA + 既往学分时,再用 blendGpa() 混合出累计 GPA。
 * 纯数学在 tools/_lib/grade.ts 的 gpaFromCourses() / blendGpa()。
 */

type Row = { name: string; credits: string; letter: string };

const DEMO: Row[] = [
  { name: "Calculus", credits: "4", letter: "A" },
  { name: "Biology", credits: "3", letter: "B+" },
  { name: "History", credits: "3", letter: "A-" },
];

const EMPTY_ROW: Row = { name: "", credits: "", letter: "" };

const L = {
  name: { en: "Course (optional)", zh: "课程名(可留空)", ja: "科目名(任意)", es: "Asignatura (opcional)", pt: "Disciplina (opcional)", fr: "Cours (facultatif)", de: "Kurs (optional)", ru: "Предмет (необяз.)", it: "Corso (facoltativo)", tr: "Ders (isteğe bağlı)", ko: "과목(선택)", ar: "المقرر (اختياري)", hi: "पाठ्यक्रम (वैकल्पिक)", id: "Mata kuliah (opsional)", vi: "Môn học (không bắt buộc)" },
  credits: { en: "Credits", zh: "学分", ja: "単位", es: "Créditos", pt: "Créditos", fr: "Crédits", de: "Credits", ru: "Кредиты", it: "Crediti", tr: "Kredi", ko: "학점", ar: "الساعات المعتمدة", hi: "क्रेडिट", id: "SKS", vi: "Tín chỉ" },
  letter: { en: "Letter grade", zh: "等级", ja: "評価", es: "Letra", pt: "Conceito", fr: "Note littérale", de: "Notenstufe", ru: "Буквенная оценка", it: "Voto in lettere", tr: "Harf notu", ko: "등급", ar: "الدرجة الحرفية", hi: "अक्षर ग्रेड", id: "Nilai huruf", vi: "Xếp loại chữ" },
  noLetter: { en: "—", zh: "—", ja: "—", es: "—", pt: "—", fr: "—", de: "—", ru: "—", it: "—", tr: "—", ko: "—", ar: "—", hi: "—", id: "—", vi: "—" },
  addRow: { en: "+ Add course", zh: "+ 添加课程", ja: "+ 科目を追加", es: "+ Añadir asignatura", pt: "+ Adicionar disciplina", fr: "+ Ajouter un cours", de: "+ Kurs hinzufügen", ru: "+ Добавить предмет", it: "+ Aggiungi corso", tr: "+ Ders ekle", ko: "+ 과목 추가", ar: "+ إضافة مقرر", hi: "+ पाठ्यक्रम जोड़ें", id: "+ Tambah mata kuliah", vi: "+ Thêm môn học" },
  removeRow: { en: "Remove row", zh: "删除这一行", ja: "この行を削除", es: "Eliminar fila", pt: "Remover linha", fr: "Supprimer la ligne", de: "Zeile entfernen", ru: "Удалить строку", it: "Rimuovi riga", tr: "Satırı kaldır", ko: "행 삭제", ar: "إزالة الصف", hi: "पंक्ति हटाएँ", id: "Hapus baris", vi: "Xóa dòng" },
  semesterGpa: { en: "Semester GPA", zh: "学期 GPA", ja: "学期 GPA", es: "GPA del semestre", pt: "GPA do semestre", fr: "Moyenne du semestre", de: "Semester-Notenschnitt", ru: "GPA за семестр", it: "Media del semestre", tr: "Dönem GPA", ko: "학기 GPA", ar: "معدل الفصل", hi: "सेमेस्टर GPA", id: "IPK semester", vi: "GPA học kỳ" },
  cumulativeGpa: { en: "Cumulative GPA", zh: "累计 GPA", ja: "累計 GPA", es: "GPA acumulado", pt: "GPA acumulado", fr: "Moyenne cumulée", de: "Gesamt-Notenschnitt", ru: "Общий GPA", it: "Media complessiva", tr: "Genel GPA", ko: "누적 GPA", ar: "المعدل التراكمي", hi: "संचयी GPA", id: "IPK kumulatif", vi: "GPA tích lũy" },
  creditsTaken: { en: "Credits counted", zh: "计入学分", ja: "計上単位数", es: "Créditos contados", pt: "Créditos contados", fr: "Crédits comptabilisés", de: "Gezählte Credits", ru: "Учтённые кредиты", it: "Crediti conteggiati", tr: "Sayılan kredi", ko: "계산된 학점", ar: "الساعات المحسوبة", hi: "गणित क्रेडिट", id: "SKS dihitung", vi: "Tín chỉ đã tính" },
  qualityPoints: { en: "Quality points", zh: "质量点合计", ja: "質点の合計", es: "Puntos de calidad", pt: "Pontos de qualidade", fr: "Points de qualité", de: "Qualitätspunkte", ru: "Баллы качества", it: "Punti qualità", tr: "Kalite puanı", ko: "품질 점수", ar: "نقاط الجودة", hi: "गुणवत्ता अंक", id: "Poin kualitas", vi: "Điểm chất lượng" },
  dropped: { en: "{n} incomplete row(s) ignored — give each course credits and a letter.", zh: "已忽略 {n} 条没填完的行——每门课都需要学分和等级。", ja: "{n} 件の未入力行を無視しました。各科目に単位と評価を入力してください。", es: "{n} fila(s) incompleta(s) ignorada(s): indique créditos y letra de cada asignatura.", pt: "{n} linha(s) incompleta(s) ignorada(s) — informe créditos e conceito de cada disciplina.", fr: "{n} ligne(s) incomplète(s) ignorée(s) — attribuez crédits et note à chaque cours.", de: "{n} unvollständige Zeile(n) ignoriert — vergebe jedem Kurs Credits und eine Note.", ru: "{n} незаполненных строк пропущено — укажите кредиты и оценку для каждого предмета.", it: "{n} righe incomplete ignorate — assegna crediti e voto a ogni corso.", tr: "{n} eksik satır atlandı — her derse kredi ve not verin.", ko: "{n}개의 미완성 행이 제외되었습니다 — 각 과목에 학점과 등급을 입력하세요.", ar: "تم تجاهل {n} صف غير مكتمل — أدخل الساعات والدرجة لكل مقرر.", hi: "{n} अधूरी पंक्तियाँ छोड़ी गईं — हर पाठ्यक्रम में क्रेडिट और ग्रेड दें।", id: "{n} baris tidak lengkap diabaikan — isi SKS dan nilai untuk tiap mata kuliah.", vi: "Đã bỏ qua {n} dòng chưa đủ — hãy nhập tín chỉ và xếp loại cho mỗi môn." },
  priorTitle: { en: "Blend with your transcript", zh: "与成绩单合并", ja: "成績表と合わせる", es: "Combinar con tu expediente", pt: "Combinar com seu histórico", fr: "Combiner avec votre relevé", de: "Mit deinem Notenauszug mischen", ru: "Объединить с транскриптом", it: "Combina con la trascrizione", tr: "Transkriptinle birleştir", ko: "성적표와 합산", ar: "الدمج مع سجلك", hi: "अपने ट्रांसक्रिप्ट से मिलाएँ", id: "Gabung dengan transkrip", vi: "Gộp với bảng điểm của bạn" },
  priorGpa: { en: "GPA so far", zh: "既往 GPA", ja: "これまでの GPA", es: "GPA hasta ahora", pt: "GPA até agora", fr: "Moyenne actuelle", de: "Bisheriger Schnitt", ru: "GPA на сейчас", it: "Media finora", tr: "Şu ana kadarki GPA", ko: "지금까지 GPA", ar: "المعدل حتى الآن", hi: "अब तक का GPA", id: "IPK sejauh ini", vi: "GPA hiện tại" },
  priorCredits: { en: "Credits earned so far", zh: "已修学分", ja: "修得済みの単位数", es: "Créditos acumulados", pt: "Créditos já obtidos", fr: "Crédits obtenus à ce jour", de: "Bisher erworbene Credits", ru: "Получено кредитов", it: "Crediti ottenuti finora", tr: "Şu kadarki kredi", ko: "이수 학점", ar: "الساعات المكتسبة", hi: "अब तक के क्रेडिट", id: "SKS terkumpul", vi: "Tín chỉ đã tích lũy" },
  blendNote: {
    en: "Cumulative GPA = (semester GPA × semester credits + prior GPA × prior credits) ÷ (total credits). Leave the prior fields empty if this is your first semester — the semester GPA is then your cumulative one.",
    zh: "累计 GPA =(学期 GPA × 学期学分 + 既往 GPA × 既往学分)÷ 总学分。如果是第一学期,既往两项留空即可,学期 GPA 就是累计 GPA。",
    ja: "累計 GPA =(学期 GPA × 学期単位 + 既往 GPA × 既往単位)÷ 総単位。最初の学期なら既往欄は空のままで OK です。その場合、学期 GPA がそのまま累計 GPA になります。",
    es: "GPA acumulado = (GPA del semestre × créditos del semestre + GPA previo × créditos previos) ÷ créditos totales. Si es su primer semestre, deje los campos previos vacíos: el GPA del semestre es entonces el acumulado.",
    pt: "GPA acumulado = (GPA do semestre × créditos do semestre + GPA anterior × créditos anteriores) ÷ créditos totais. Se for o seu primeiro semestre, deixe os campos anteriores vazios: o GPA do semestre é então o acumulado.",
    fr: "Moyenne cumulée = (moyenne du semestre × crédits du semestre + moyenne antérieure × crédits antérieurs) ÷ (crédits totaux). Cette formule pondérée est celle utilisée par la plupart des établissements.",
    de: "Gesamtschnitt = (Semesterschnitt × Semester-Credits + bisheriger Schnitt × bisherige Credits) ÷ (Gesamtcredits). Diese Gewichtung nutzen die meisten Hochschulen.",
    ru: "Общий GPA = (GPA семестра × кредиты семестра + прежний GPA × прежние кредиты) ÷ (всего кредитов). Так взвешивает большинство учебных заведений.",
    it: "Media complessiva = (media del semestre × crediti del semestre + media precedente × crediti precedenti) ÷ (crediti totali). Questa ponderazione è usata dalla maggior parte degli atenei.",
    tr: "Genel GPA = (dönem GPA × dönem kredisi + önceki GPA × önceki kredi) ÷ (toplam kredi). Bu ağırlıklama çoğu kurum tarafından kullanılır.",
    ko: "누적 GPA = (학기 GPA × 학기 학점 + 기존 GPA × 기존 학점) ÷ (총 학점). 대부분의 학교가 이 가중 방식을 사용합니다.",
    ar: "المعدل التراكمي = (معدل الفصل × ساعات الفصل + المعدل السابق × الساعات السابقة) ÷ (إجمالي الساعات). هذه الترجيح تستخدمها معظم المؤسسات.",
    hi: "संचयी GPA = (सेमेस्टर GPA × सेमेस्टर क्रेडिट + पिछला GPA × पिछले क्रेडिट) ÷ (कुल क्रेडिट)। अधिकांश संस्थान यही भारण उपयोग करते हैं।",
    id: "IPK kumulatif = (IPK semester × SKS semester + IPK sebelumnya × SKS sebelumnya) ÷ (total SKS). Pembobotan ini dipakai kebanyakan institusi.",
    vi: "GPA tích lũy = (GPA học kỳ × tín chỉ học kỳ + GPA trước × tín chỉ trước) ÷ (tổng tín chỉ). Cách gia quyền này được đa số cơ sở sử dụng.",
  },
  tableNote: {
    en: "Quality points on the standard 4.0 scale: A+/A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D+ = 1.3, D = 1.0, D− = 0.7, F = 0. GPA = Σ(points × credits) ÷ Σcredits — a 4-credit A outweighs a 3-credit A.",
    zh: "标准 4.0 制质量点:A+/A = 4.0,A− = 3.7,B+ = 3.3,B = 3.0,B− = 2.7,C+ = 2.3,C = 2.0,C− = 1.7,D+ = 1.3,D = 1.0,D− = 0.7,F = 0。GPA = Σ(质量点 × 学分)÷ Σ学分——4 学分的 A 比 3 学分的 A 更有分量。",
    ja: "標準 4.0 制の質点:A+/A = 4.0、A− = 3.7、B+ = 3.3、B = 3.0、B− = 2.7、C+ = 2.3、C = 2.0、C− = 1.7、D+ = 1.3、D = 1.0、D− = 0.7、F = 0。GPA = Σ(質点 × 単位)÷ Σ単位。4 単位の A は 3 単位の A より重く効きます。",
    es: "Puntos de calidad en la escala 4.0 estándar: A+/A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D+ = 1.3, D = 1.0, D− = 0.7, F = 0. GPA = Σ(puntos × créditos) ÷ Σcréditos — una A de 4 créditos pesa más que una A de 3.",
    pt: "Pontos de qualidade na escala 4.0 padrão: A+/A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D+ = 1.3, D = 1.0, D− = 0.7, F = 0. GPA = Σ(pontos × créditos) ÷ Σcréditos — um A de 4 créditos pesa mais que um A de 3.",
    fr: "Points de qualité sur l'échelle 4,0 standard : A+/A = 4,0 ; A− = 3,7 ; B+ = 3,3 ; B = 3,0 ; B− = 2,7 ; C+ = 2,3 ; C = 2,0 ; C− = 1,7 ; D = 1,0 ; F = 0.",
    de: "Qualitätspunkte auf der Standard-4.0-Skala: A+/A = 4,0; A− = 3,7; B+ = 3,3; B = 3,0; B− = 2,7; C+ = 2,3; C = 2,0; C− = 1,7; D = 1,0; F = 0.",
    ru: "Баллы качества по стандартной шкале 4.0: A+/A = 4,0; A− = 3,7; B+ = 3,3; B = 3,0; B− = 2,7; C+ = 2,3; C = 2,0; C− = 1,7; D = 1,0; F = 0.",
    it: "Punti qualità sulla scala 4.0 standard: A+/A = 4,0; A− = 3,7; B+ = 3,3; B = 3,0; B− = 2,7; C+ = 2,3; C = 2,0; C− = 1,7; D = 1,0; F = 0.",
    tr: "Standart 4.0 ölçeğinde kalite puanları: A+/A = 4,0; A− = 3,7; B+ = 3,3; B = 3,0; B− = 2,7; C+ = 2,3; C = 2,0; C− = 1,7; D = 1,0; F = 0.",
    ko: "표준 4.0 스케일 품질 점수: A+/A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D = 1.0, F = 0.",
    ar: "نقاط الجودة على مقياس 4.0 القياسي: A+/A = 4.0؛ A− = 3.7؛ B+ = 3.3؛ B = 3.0؛ B− = 2.7؛ C+ = 2.3؛ C = 2.0؛ C− = 1.7؛ D = 1.0؛ F = 0.",
    hi: "मानक 4.0 पैमाने पर गुणवत्ता अंक: A+/A = 4.0; A− = 3.7; B+ = 3.3; B = 3.0; B− = 2.7; C+ = 2.3; C = 2.0; C− = 1.7; D = 1.0; F = 0.",
    id: "Poin kualitas pada skala 4.0 standar: A+/A = 4,0; A− = 3,7; B+ = 3,3; B = 3,0; B− = 2,7; C+ = 2,3; C = 2,0; C− = 1,7; D = 1,0; F = 0.",
    vi: "Điểm chất lượng theo thang 4.0 chuẩn: A+/A = 4,0; A− = 3,7; B+ = 3,3; B = 3,0; B− = 2,7; C+ = 2,3; C = 2,0; C− = 1,7; D = 1,0; F = 0.",
  },
};

/** "" → NaN(空串不能当 0 学分计入)。 */
function num(s: string): number {
  const t = s.trim();
  if (t === "") return NaN;
  const n = Number(t.replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
}

export function CalcEngineGpa() {
  const { locale, t } = useI18n();
  const [rows, setRows] = useState<Row[]>([...DEMO, { ...EMPTY_ROW }]);
  const [priorGpa, setPriorGpa] = useState("");
  const [priorCredits, setPriorCredits] = useState("");

  const pg = num(priorGpa);
  const pc = num(priorCredits);
  const hasPrior = Number.isFinite(pg) && Number.isFinite(pc) && pc > 0;

  const sem = gpaFromCourses(rows.map((r) => ({ name: r.name.trim() || undefined, credits: num(r.credits), letter: r.letter })));
  const hasSem = Number.isFinite(sem.gpa);
  const cum = hasSem ? blendGpa(sem.gpa, sem.credits, pg, hasPrior ? pc : NaN) : NaN;

  const setRow = (i: number, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r, j) => (j === i ? { ...r, ...patch } : r)));

  return (
    <ToolPanel>
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-[minmax(0,1fr)_7rem_9rem_2.25rem]">
          <span className="text-[12.5px] font-medium text-[var(--color-sub)]">{pick(locale, L.name)}</span>
          <span className="text-[12.5px] font-medium text-[var(--color-sub)]">{pick(locale, L.credits)}</span>
          <span className="text-[12.5px] font-medium text-[var(--color-sub)]">{pick(locale, L.letter)}</span>
          <span />
        </div>
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 sm:grid-cols-[minmax(0,1fr)_7rem_9rem_2.25rem]">
            <TextIn value={r.name} onChange={(v) => setRow(i, { name: v })} aria={pick(locale, L.name)} placeholder={pick(locale, L.name)} />
            <NumIn value={r.credits} onChange={(v) => setRow(i, { credits: v })} aria={pick(locale, L.credits)} placeholder="3" />
            <Sel value={r.letter} onChange={(v) => setRow(i, { letter: v })} aria={pick(locale, L.letter)}>
              <option value="">{pick(locale, L.noLetter)}</option>
              {GPA_LETTERS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </Sel>
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

      <div className="mt-5">
        <Stats
          items={[
            { label: pick(locale, L.semesterGpa), value: hasSem ? fmt(sem.gpa, locale, 2) : "—", tone: "accent" },
            ...(hasPrior && Number.isFinite(cum)
              ? [{ label: pick(locale, L.cumulativeGpa), value: fmt(cum, locale, 2), tone: "good" as const }]
              : []),
            { label: pick(locale, L.creditsTaken), value: fmt(sem.credits, locale, 1) },
            { label: pick(locale, L.qualityPoints), value: fmt(sem.qualityPoints, locale, 1) },
          ]}
        />
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <h3 className="text-[15px] font-semibold sm:col-span-2">{pick(locale, L.priorTitle)}</h3>
        <Field label={pick(locale, L.priorGpa)}>
          <NumIn value={priorGpa} onChange={setPriorGpa} aria="prior cumulative GPA" placeholder="3.45" />
        </Field>
        <Field label={pick(locale, L.priorCredits)}>
          <NumIn value={priorCredits} onChange={setPriorCredits} aria="prior credits earned" placeholder="60" />
        </Field>
      </div>

      <div className="mt-3 space-y-2">
        <Note>{pick(locale, L.blendNote)}</Note>
        {sem.dropped > 0 && (
          <Note>{fill(pick(locale, L.dropped), { n: String(sem.dropped) })}</Note>
        )}
        <Note>{pick(locale, L.tableNote)}</Note>
      </div>
    </ToolPanel>
  );
}
