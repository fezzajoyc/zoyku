"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, pick } from "./calc-ui";
import { lunarToSolar, solarToLunar, type LunarInfo } from "../_lib/lunar";

/**
 * CN-007/010/011:公历↔农历双向转换引擎。
 * 双向单页:公历→农历(含干支年/生肖/节气)与 农历→公历(闰月开关)。
 * 数据:lunar-javascript 1.7.8 懒加载;干支年为正月初一口径(页面标注)。
 */

const L = {
  tabSolar: { en: "Solar → Lunar", zh: "公历 → 农历", ja: "西暦 → 旧暦", es: "Solar → Lunar", pt: "Solar → Lunar", fr: "Solaire → Lunaire", de: "Sonnen- → Mondkalender", ru: "Солнечный → Лунный", it: "Solare → Lunare", tr: "Güneş → Ay", ko: "양력 → 음력", ar: "شمسي → قمري", hi: "सौर → चंद्र", id: "Masehi → Imlek", vi: "Dương → Âm" },
  tabLunar: { en: "Lunar → Solar", zh: "农历 → 公历", ja: "旧暦 → 西暦", es: "Lunar → Solar", pt: "Lunar → Solar", fr: "Lunaire → Solaire", de: "Mond- → Sonnenkalender", ru: "Лунный → Солнечный", it: "Lunare → Solare", tr: "Ay → Güneş", ko: "음력 → 양력", ar: "قمري → شمسي", hi: "चंद्र → सौर", id: "Imlek → Masehi", vi: "Âm → Dương" },
  solarDate: { en: "Solar date (Y, M, D)", zh: "公历日期(年/月/日)", ja: "西暦の日付(年/月/日)", es: "Fecha solar (a, m, d)", pt: "Data solar (a, m, d)", fr: "Date solaire (a, m, j)", de: "SonnenDatum (J, M, T)", ru: "Дата (г, м, д)", it: "Data solare (a, m, g)", tr: "Güneş tarihi (Y, A, G)", ko: "양력 날짜(년/월/일)", ar: "التاريخ الشمسي (س، شهر، يوم)", hi: "सौर तिथि (व, म, द)", id: "Tanggal Masehi (T, B, H)", vi: "Ngày dương (n, t, n)" },
  lunarDate: { en: "Lunar date (Y, M, D)", zh: "农历日期(年/月/日)", ja: "旧暦の日付(年/月/日)", es: "Fecha lunar (a, m, d)", pt: "Data lunar (a, m, d)", fr: "Date lunaire (a, m, j)", de: "MondDatum (J, M, T)", ru: "Лунная дата (г, м, д)", it: "Data lunare (a, m, g)", tr: "Ay tarihi (Y, A, G)", ko: "음력 날짜(년/월/일)", ar: "التاريخ القمري (س، شهر، يوم)", hi: "चंद्र तिथि (व, म, द)", id: "Tanggal Imlek (T, B, H)", vi: "Ngày âm (n, t, n)" },
  leap: { en: "Leap month", zh: "闰月", ja: "閏月", es: "Mes bisiesto", pt: "Mês bissexto", fr: "Mois intercalaire", de: "Schaltmonat", ru: "Вставной месяц", it: "Mese intercalare", tr: "Artık ay", ko: "윤달", ar: "شهر كبيس", hi: "अधिक माह", id: "Bulan kabisat", vi: "Tháng nhuận" },
  year: { en: "Year", zh: "年", ja: "年", es: "Año", pt: "Ano", fr: "Année", de: "Jahr", ru: "Год", it: "Anno", tr: "Yıl", ko: "년", ar: "سنة", hi: "वर्ष", id: "Tahun", vi: "Năm" },
  month: { en: "Month", zh: "月", ja: "月", es: "Mes", pt: "Mês", fr: "Mois", de: "Monat", ru: "Месяц", it: "Mese", tr: "Ay", ko: "월", ar: "شهر", hi: "माह", id: "Bulan", vi: "Tháng" },
  day: { en: "Day", zh: "日", ja: "日", es: "Día", pt: "Dia", fr: "Jour", de: "Tag", ru: "День", it: "Giorno", tr: "Gün", ko: "일", ar: "يوم", hi: "दिन", id: "Hari", vi: "Ngày" },
  convert: { en: "Convert", zh: "转换", ja: "変換", es: "Convertir", pt: "Converter", fr: "Convertir", de: "Umrechnen", ru: "Преобразовать", it: "Converti", tr: "Dönüştür", ko: "변환", ar: "تحويل", hi: "रूपांतरित", id: "Konversi", vi: "Chuyển đổi" },
  invalid: { en: "Invalid or out-of-range date — lunar years roughly cover 1900–2100 and not every year has a leap month.", zh: "日期无效或超出范围——农历年大致覆盖 1900–2100,且并非每年都有闰月。", ja: "日付が無効または範囲外です。旧暦年は概ね 1900〜2100 をカバーし、閏月がない年もあります。", es: "Fecha inválida o fuera de rango: los años lunares cubren aproximadamente 1900–2100 y no todos tienen mes bisiesto.", pt: "Data inválida ou fora do intervalo: anos lunares cobrem aproximadamente 1900–2100 e nem todo ano tem mês bissexto.", fr: "Date invalide ou hors plage : les années lunaires couvrent environ 1900–2100 et toutes n'ont pas de mois intercalaire.", de: "Ungültiges oder außerhalb des Bereichs liegendes Datum — Mondjahre decken etwa 1900–2100 ab, nicht jedes hat einen Schaltmonat.", ru: "Неверная дата или вне диапазона — лунные годы покрывают примерно 1900–2100, и не в каждом есть вставной месяц.", it: "Data non valida o fuori intervallo — gli anni lunari coprono circa 1900–2100 e non tutti hanno un mese intercalare.", tr: "Geçersiz veya aralık dışı tarih — Ay yılları kabaca 1900–2100 kapsar ve her yılın artık ayı olmaz.", ko: "날짜가 잘못되었거나 범위를 벗어났습니다. 음력 연도는 대략 1900~2100이며 매년 윤달이 있는 것은 아닙니다.", ar: "تاريخ غير صالح أو خارج النطاق — تغطي السنوات القمرية تقريبًا 1900–2100 وليس لكل سنة شهرًا كبيسًا.", hi: "अमान्य या सीमा से बाहर तिथि — चंद्र वर्ष लगभग 1900–2100 कवर करते हैं और हर वर्ष में अधिक माह नहीं होता।", id: "Tanggal tidak valid atau di luar jangkauan — tahun Imlek kira-kira mencakup 1900–2100 dan tidak semua tahun punya bulan kabisat.", vi: "Ngày không hợp lệ hoặc ngoài phạm vi — năm âm lịch phủ khoảng 1900–2100 và không phải năm nào cũng có tháng nhuận." },
  resultLunar: { en: "Lunar date", zh: "农历日期", ja: "旧暦の日付", es: "Fecha lunar", pt: "Data lunar", fr: "Date lunaire", de: "Mondkalender-Datum", ru: "Лунная дата", it: "Data lunare", tr: "Ay tarihi", ko: "음력 날짜", ar: "التاريخ القمري", hi: "चंद्र तिथि", id: "Tanggal Imlek", vi: "Ngày âm lịch" },
  resultSolar: { en: "Solar date", zh: "公历日期", ja: "西暦の日付", es: "Fecha solar", pt: "Data solar", fr: "Date solaire", de: "Sonnenkalender-Datum", ru: "Солнечная дата", it: "Data solare", tr: "Güneş tarihi", ko: "양력 날짜", ar: "التاريخ الشمسي", hi: "सौर तिथि", id: "Tanggal Masehi", vi: "Ngày dương lịch" },
  gzYear: { en: "GanZhi year (Lunar New Year convention)", zh: "干支年(按农历新年换年)", ja: "干支年(旧暦正月一日で換年)", es: "Año GanZhi (cambio en Año Nuevo Lunar)", pt: "Ano GanZhi (troca no Ano-Novo Lunar)", fr: "Année GanZhi (changement au Nouvel An lunaire)", de: "GanZhi-Jahr (Wechsel am Mondneujahr)", ru: "Год Гань-чжи (смена по Лунному Новому году)", it: "Anno GanZhi (cambio a Capodanno lunare)", tr: "GanZhi yılı (Ay Yılında değişir)", ko: "간지 연도(음력 설 기준)", ar: "سنة القوانين (التغيير برأس السنة القمرية)", hi: "गणजी वर्ष (चंद्र नववर्ष पर परिवर्तन)", id: "Tahun GanZhi (berganti di Imlek)", vi: "Năm Can Chi (đổi theo Tết Âm lịch)" },
  zodiac: { en: "Zodiac", zh: "生肖", ja: "十二支", es: "Zodíaco", pt: "Zodíaco", fr: "Zodiaque", de: "Tierkreiszeichen", ru: "Зодиак (животный цикл)", it: "Zodiaco", tr: "Burç", ko: "띠", ar: "الأبراج الصينية", hi: "राशि चक्र", id: "Zodiak", vi: "Con giáp" },
  jieQi: { en: "Solar term on this day", zh: "当日节气", ja: "この日の節気", es: "Término solar del día", pt: "Termo solar do dia", fr: "Terme solaire du jour", de: "Solartermin des Tages", ru: "Солнечный термин дня", it: "Termine solare del giorno", tr: "Günün solar terimi", ko: "당일 절기", ar: "المصطلح الشمسي لليوم", hi: "दिन का सौर पद", id: "Solar term hari itu", vi: "Tiết khí của ngày" },
  none: { en: "—", zh: "无", ja: "なし", es: "ninguno", pt: "nenhum", fr: "aucun", de: "keiner", ru: "нет", it: "nessuno", tr: "yok", ko: "없음", ar: "لا شيء", hi: "कोई नहीं", id: "tidak ada", vi: "không" },
  yearSuffix: { en: "", zh: "年", ja: "年", es: "", pt: "", fr: "", de: "", ru: "", it: "", tr: "", ko: "년", ar: "", hi: "", id: "", vi: "" },
  leapMark: { en: " (leap)", zh: " (闰)", ja: " (閏)", es: " (bisiesto)", pt: " (bissexto)", fr: " (intercalaire)", de: " (Schalt)", ru: " (вставной)", it: " (intercalare)", tr: " (artık)", ko: " (윤)", ar: " (كبيس)", hi: " (अधिक)", id: " (kabisat)", vi: " (nhuận)" },
  note: { en: "All conversion runs locally with the lunar-javascript library (MIT). GanZhi years switch at Lunar New Year (not Lichun); leap months exist in about 7 of 19 years. Years ≈1900–2100.", zh: "转换全部由本机的 lunar-javascript 库(MIT)完成。干支年按农历新年换年(非立春口径);闰月约每 19 年 7 次;年份约 1900–2100。", ja: "変換はすべて端末内の lunar-javascript ライブラリ(MIT)で行います。干支年は旧暦正月で換年(立春ではありません)。閏月は約 19 年に 7 回。年は約 1900〜2100。", es: "La conversión se realiza localmente con la biblioteca lunar-javascript (MIT). El año GanZhi cambia en el Año Nuevo Lunar (no en Lichun); hay mes bisiesto unas 7 de cada 19 años. Años ≈1900–2100.", pt: "A conversão roda localmente com a biblioteca lunar-javascript (MIT). O ano GanZhi troca no Ano-Novo Lunar (não no Lichun); meses bissextos ocorrem ~7 de cada 19 anos. Anos ≈1900–2100.", fr: "La conversion se fait localement avec la bibliothèque lunar-javascript (MIT). L'année GanZhi change au Nouvel An lunaire (pas au Lichun) ; mois intercalaire ~7 fois sur 19. Années ≈1900–2100.", de: "Die Umrechnung läuft lokal mit lunar-javascript (MIT). Das GanZhi-Jahr wechselt am Mondneujahr (nicht Lichun); Schaltmonate ~7 von 19 Jahren. Jahre ≈1900–2100.", ru: "Преобразование выполняется локально библиотекой lunar-javascript (MIT). Год Гань-чжи меняется по Лунному Новому году (не по Личунь); вставные месяцы ~7 из 19 лет. Годы ≈1900–2100.", it: "La conversione avviene localmente con la libreria lunar-javascript (MIT). L'anno GanZhi cambia a Capodanno lunare (non a Lichun); mesi intercalari ~7 su 19. Anni ≈1900–2100.", tr: "Dönüştürme, lunar-javascript kitaplığıyla (MIT) bu cihazda yapılır. GanZhi yılı Ay Yılı'nda değişir (Lichun'da değil); artık ay ~19 yılda 7. Yıllar ≈1900–2100.", ko: "변환은 lunar-javascript 라이브러리(MIT)로 이 기기에서 수행됩니다. 간지 연도는 음력 설로 바뀌며(입춘 아님) 윤달은 약 19년에 7번입니다. 연도 ≈1900–2100.", ar: "يعمل التحويل محليًا بمكتبة lunar-javascript (MIT). تتغير سنة القوانين برأس السنة القمرية (لا عند Lichun)؛ الشهر الكبيس ~7 من كل 19 سنة. السنوات ≈1900–2100.", hi: "रूपांतरण इसी डिवाइस पर lunar-javascript लाइब्रेरी (MIT) से होता है। गणजी वर्ष चंद्र नववर्ष पर बदलता है (लिचुन पर नहीं); अधिक माह ~19 में से 7 बार। वर्ष ≈1900–2100।", id: "Konversi berjalan lokal dengan pustaka lunar-javascript (MIT). Tahun GanZhi berganti di Imlek (bukan Lichun); bulan kabisat ~7 dari 19 tahun. Tahun ≈1900–2100.", vi: "Chuyển đổi chạy cục bộ bằng thư viện lunar-javascript (MIT). Năm Can Chi đổi theo Tết (không phải Lịch xuân); tháng nhuận ~7/19 năm. Năm ≈1900–2100." },
};

function NumIn({ value, onChange, aria, min, max }: { value: string; onChange: (v: string) => void; aria: string; min: number; max: number }) {
  return (
    <input
      type="number"
      className="field mono w-full"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      aria-label={aria}
    />
  );
}

export function CalcEngineLunar() {
  const { locale } = useI18n();
  const Lf = (key: keyof typeof L) => L[key][locale] ?? L[key].en;

  const [tab, setTab] = useState<"solar" | "lunar">("solar");
  // 公历侧
  const [sy, setSy] = useState("2026");
  const [sm, setSm] = useState("2");
  const [sd, setSd] = useState("17");
  const [lunarOut, setLunarOut] = useState<LunarInfo | null>(null);
  // 农历侧
  const [ly, setLy] = useState("2024");
  const [lm, setLm] = useState("1");
  const [ld, setLd] = useState("1");
  const [leap, setLeap] = useState(false);
  const [solarOut, setSolarOut] = useState<{ y: number; m: number; d: number } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const reset = () => {
    setLunarOut(null);
    setSolarOut(null);
    setErr(null);
  };

  const runSolar = () => {
    setErr(null);
    setLunarOut(null);
    setBusy(true);
    void solarToLunar(Number(sy), Number(sm), Number(sd)).then((r) => {
      setBusy(false);
      if (r) setLunarOut(r);
      else setErr(Lf("invalid"));
    });
  };

  const runLunar = () => {
    setErr(null);
    setSolarOut(null);
    setBusy(true);
    void lunarToSolar(Number(ly), Number(lm), Number(ld), leap).then((r) => {
      setBusy(false);
      if (r.ok) setSolarOut({ y: r.year, m: r.month, d: r.day });
      else setErr(Lf("invalid"));
    });
  };

  const convert = () => (tab === "solar" ? runSolar() : runLunar());

  // 错误态变化时重置另一个方向的残留输出
  useEffect(() => {
    reset();
  }, [tab]);

  const lunarText = lunarOut
    ? `${lunarOut.yearCN}${Lf("yearSuffix")} ${lunarOut.monthCN}${lunarOut.dayCN}${lunarOut.isLeap ? Lf("leapMark") : ""}`
    : "";

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2" role="group">
          {(["solar", "lunar"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={tab === m}
              onClick={() => setTab(m)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                tab === m
                  ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {Lf(m === "solar" ? "tabSolar" : "tabLunar")}
            </button>
          ))}
        </div>

        {tab === "solar" ? (
          <Field label={Lf("solarDate")}>
            <div className="grid grid-cols-3 gap-2">
              <NumIn value={sy} onChange={setSy} aria={Lf("year")} min={1900} max={2100} />
              <NumIn value={sm} onChange={setSm} aria={Lf("month")} min={1} max={12} />
              <NumIn value={sd} onChange={setSd} aria={Lf("day")} min={1} max={31} />
            </div>
          </Field>
        ) : (
          <Field label={Lf("lunarDate")}>
            <div className="grid grid-cols-3 gap-2">
              <NumIn value={ly} onChange={setLy} aria={Lf("year")} min={1900} max={2100} />
              <NumIn value={lm} onChange={setLm} aria={Lf("month")} min={1} max={12} />
              <NumIn value={ld} onChange={setLd} aria={Lf("day")} min={1} max={30} />
            </div>
            <label className="mt-2 flex items-center gap-2 text-[13.5px]">
              <input type="checkbox" className="h-4 w-4" checked={leap} onChange={(e) => setLeap(e.target.checked)} aria-label={Lf("leap")} />
              {Lf("leap")}
            </label>
          </Field>
        )}

        <button
          type="button"
          onClick={convert}
          disabled={busy}
          className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
        >
          {Lf("convert")}
        </button>

        {err && (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {err}
          </p>
        )}

        {lunarOut && tab === "solar" && (
          <div className="space-y-3 rounded-xl bg-[var(--color-surface)] px-4 py-4">
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{Lf("resultLunar")}</p>
            <p className="text-[22px] font-bold leading-tight">
              {lunarText}
              {lunarOut.jieQi && (
                <span className="ml-2 rounded-full bg-[var(--color-card)] px-2.5 py-0.5 text-[13px] font-medium text-[var(--color-accent-text)]">
                  {lunarOut.jieQi}
                </span>
              )}
            </p>
            <div className="grid gap-2 text-[13.5px] sm:grid-cols-2">
              <span className="text-[var(--color-sub)]">{Lf("gzYear")}</span>
              <span className="mono font-medium">{lunarOut.yearGZ}</span>
              <span className="text-[var(--color-sub)]">{Lf("zodiac")}</span>
              <span className="font-medium">{lunarOut.zodiac}</span>
              <span className="text-[var(--color-sub)]">{Lf("jieQi")}</span>
              <span>{lunarOut.jieQi ?? Lf("none")}</span>
            </div>
            <CopyButton value={lunarText} />
          </div>
        )}

        {solarOut && tab === "lunar" && (
          <div className="space-y-3 rounded-xl bg-[var(--color-surface)] px-4 py-4">
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{Lf("resultSolar")}</p>
            <p className="mono text-[22px] font-bold leading-tight" dir="ltr">
              {solarOut.y}-{String(solarOut.m).padStart(2, "0")}-{String(solarOut.d).padStart(2, "0")}
            </p>
            <CopyButton value={`${solarOut.y}-${String(solarOut.m).padStart(2, "0")}-${String(solarOut.d).padStart(2, "0")}`} />
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{Lf("note")}</p>
      </div>
    </ToolPanel>
  );
}
