"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Note, TableBox, pick } from "./calc-ui";
import { formatStopwatch, lapRows } from "../_lib/stopwatch";

/**
 * 秒表引擎:开始/暂停/计次/重置,大号等宽数显 + 分段表。
 * 时间锚定 Date.now(),requestAnimationFrame 刷新;分段数学在
 * tools/_lib/stopwatch.ts(Node 可测),这里只做 UI 编排。
 */

type Phase = "idle" | "running" | "paused";

const S = {
  start: { en: "Start", zh: "开始", ja: "スタート", es: "Iniciar", pt: "Iniciar", fr: "Démarrer", de: "Starten", ru: "Старт", it: "Avvia", tr: "Başlat", ko: "시작", ar: "ابدأ", hi: "शुरू करें", id: "Mulai", vi: "Bắt đầu" },
  pause: { en: "Pause", zh: "暂停", ja: "一時停止", es: "Pausar", pt: "Pausar", fr: "Pause", de: "Pause", ru: "Пауза", it: "Pausa", tr: "Duraklat", ko: "일시정지", ar: "إيقاف مؤقت", hi: "रोकें", id: "Jeda", vi: "Tạm dừng" },
  resume: { en: "Resume", zh: "继续", ja: "再開", es: "Continuar", pt: "Retomar", fr: "Reprendre", de: "Fortsetzen", ru: "Продолжить", it: "Riprendi", tr: "Devam et", ko: "재개", ar: "متابعة", hi: "फिर से शुरू करें", id: "Lanjutkan", vi: "Tiếp tục" },
  lap: { en: "Lap", zh: "计次", ja: "ラップ", es: "Vuelta", pt: "Volta", fr: "Tour", de: "Runde", ru: "Круг", it: "Giro", tr: "Tur", ko: "랩", ar: "لفة", hi: "लैप", id: "Putaran", vi: "Vòng" },
  reset: { en: "Reset", zh: "重置", ja: "リセット", es: "Reiniciar", pt: "Zerar", fr: "Réinitialiser", de: "Zurücksetzen", ru: "Сброс", it: "Azzera", tr: "Sıfırla", ko: "초기화", ar: "إعادة تعيين", hi: "रीसेट करें", id: "Atur ulang", vi: "Đặt lại" },
  lapNo: { en: "Lap", zh: "分段", ja: "ラップ", es: "Vuelta", pt: "Volta", fr: "Tour", de: "Runde", ru: "Круг", it: "Giro", tr: "Tur", ko: "랩", ar: "لفة", hi: "लैप", id: "Putaran", vi: "Vòng" },
  lapTime: { en: "Lap time", zh: "分段用时", ja: "ラップタイム", es: "Tiempo de vuelta", pt: "Tempo de volta", fr: "Temps au tour", de: "Rundenzeit", ru: "Время круга", it: "Tempo giro", tr: "Tur süresi", ko: "랩 타임", ar: "زمن اللفة", hi: "लैप समय", id: "Waktu putaran", vi: "Thời gian vòng" },
  totalTime: { en: "Total time", zh: "累计用时", ja: "累計タイム", es: "Tiempo total", pt: "Tempo total", fr: "Temps total", de: "Gesamtzeit", ru: "Общее время", it: "Tempo totale", tr: "Toplam süre", ko: "총 시간", ar: "الوقت الإجمالي", hi: "कुल समय", id: "Total waktu", vi: "Tổng thời gian" },
  noLaps: {
    en: "Press Lap while running to split the current total into segments — each row shows the segment time and the running total.",
    zh: "计时进行中按“计次”,把当前累计切成分段——每行显示该段用时和累计用时。",
    ja: "計測中に「ラップ」を押すと現在の累計を分割できます。各行にラップタイムと累計タイムを表示します。",
    es: "Pulse Vuelta durante la marcha para dividir el total actual en tramos: cada fila muestra el tiempo del tramo y el acumulado.",
    pt: "Pressione Volta em andamento para dividir o total atual em trechos — cada linha mostra o tempo do trecho e o total acumulado.",
    fr: "Appuyez sur Tour pendant la course pour scinder le total courant en segments — chaque ligne affiche le segment et le total.",
    de: "Drücke während des Laufs auf Runde, um die laufende Gesamtzeit in Segmente zu teilen — jede Zeile zeigt Segment und Gesamt.",
    ru: "Нажимайте Круг во время отсчёта, чтобы делить текущее общее время на отрезки — каждая строка показывает отрезок и общее время.",
    it: "Premi Giro mentre è in corsa per dividere il totale corrente in segmenti — ogni riga mostra segmento e totale.",
    tr: "Çalışırken Tur'a basarak güncel toplamı bölümlere ayırın — her satır bölümü ve toplamı gösterir.",
    ko: "실행 중 랩을 누르면 현재 총 시간을 구간으로 나눕니다 — 각 행에 구간과 총합이 표시됩니다.",
    ar: "اضغط لفة أثناء التشغيل لتقسيم الإجمالي الحالي إلى مقاطع — كل صف يعرض المقطع والإجمالي.",
    hi: "चलते समय लैप दबाएँ और मौजूदा कुल को खंडों में बाँटें — प्रत्येक पंक्ति खंड और कुल दिखाती है।",
    id: "Tekan Putaran saat berjalan untuk membagi total saat ini menjadi segmen — tiap baris menampilkan segmen dan total.",
    vi: "Nhấn Vòng khi đang chạy để chia tổng hiện tại thành các đoạn — mỗi dòng hiện đoạn và tổng.",
  },
  bgNote: {
    en: "The stopwatch is anchored to the wall clock, so it keeps counting if you switch tabs; rendering just catches up when you come back. Times show minutes:seconds.centiseconds.",
    zh: "秒表以墙上时钟为基准,切换标签页仍会继续计时,回来时画面立刻跟上;显示格式为 分:秒.百分秒。",
    ja: "ストップウォッチは実時間に固定されているため、タブを切り替えても計測が続きます。表示は 分:秒.センチ秒 です。",
    es: "El cronómetro está anclado al reloj real, así que sigue contando si cambia de pestaña; la pantalla se pone al día al volver. El formato es minutos:segundos.centésimas.",
    pt: "O cronômetro é ancorado no relógio real, então continua contando se você trocar de aba; a tela se atualiza ao voltar. O formato é minutos:segundos.centésimos.",
    fr: "Le compte à rebours est ancré sur l'horloge système : il continue si vous changez d'onglet ou minimisez ; le titre de l'onglet affiche le temps restant.",
    de: "Der Countdown ist an die Systemuhr gekoppelt: Er läuft weiter, wenn du den Tab wechselst oder minimierst; der Tab-Titel zeigt die Restzeit.",
    ru: "Обратный отсчёт привязан к системным часам: он продолжается при смене вкладки или сворачивании; в заголовке вкладки — оставшееся время.",
    it: "Il conto alla rovescia è ancorato all'orologio di sistema: continua se cambi scheda o minimizzi; il titolo della scheda mostra il tempo residuo.",
    tr: "Geri sayım sistem saatine bağlıdır: sekme değiştirir veya simge durumuna küçültürseniz devam eder; sekme başlığı kalan süreyi gösterir.",
    ko: "카운트다운은 시스템 시계에 고정됩니다: 탭을 바꾸거나 최소화해도 계속되며, 탭 제목에 남은 시간이 표시됩니다.",
    ar: "العد التنازلي مرتبط بساعة النظام: يستمر عند تغيير التبويب أو التصغير؛ ويعرض عنوان التبويب الوقت المتبقي.",
    hi: "काउंटडाउन सिस्टम घड़ी से बंधा है: टैब बदलने या मिनिमाइज़ करने पर भी चलता रहता है; टैब शीर्षक में शेष समय दिखता है।",
    id: "Hitung mundur terikat ke jam sistem: tetap berjalan saat ganti tab atau diminimalkan; judul tab menampilkan waktu tersisa.",
    vi: "Đếm ngược neo vào đồng hồ hệ thống: vẫn chạy khi đổi tab hoặc thu nhỏ; tiêu đề tab hiển thị thời gian còn lại.",
  },
};

export function CalcEngineStopwatch() {
  const { locale } = useI18n();
  const [phase, setPhase] = useState<Phase>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  const startAtRef = useRef(0);
  const accumulatedRef = useRef(0);

  /* 运行中用 rAF 刷新;时间永远从 Date.now() 现算,节流不漂移;卸载即清理 */
  useEffect(() => {
    if (phase !== "running") return;
    let raf = 0;
    const step = () => {
      setElapsed(accumulatedRef.current + (Date.now() - startAtRef.current));
      raf = window.requestAnimationFrame(step);
    };
    raf = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(raf);
  }, [phase]);

  const currentElapsed = () =>
    phase === "running"
      ? accumulatedRef.current + (Date.now() - startAtRef.current)
      : elapsed;

  const start = () => {
    startAtRef.current = Date.now();
    setPhase("running");
  };
  const pause = () => {
    accumulatedRef.current += Date.now() - startAtRef.current;
    setElapsed(accumulatedRef.current);
    setPhase("paused");
  };
  const reset = () => {
    accumulatedRef.current = 0;
    setElapsed(0);
    setLaps([]);
    setPhase("idle");
  };
  const lap = () => {
    setLaps((prev) => [...prev, currentElapsed()]);
  };

  const rows = lapRows(laps);
  const btn = (primary: boolean) =>
    `rounded-full px-5 py-2 text-sm font-medium transition-colors ${
      primary
        ? "bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f] hover:opacity-90"
        : "border hairline hover:bg-[var(--color-surface)]"
    }`;

  return (
    <ToolPanel>
      <div
        className="mono py-6 text-center text-5xl font-semibold tabular-nums sm:text-6xl"
        aria-live="polite"
      >
        {formatStopwatch(elapsed)}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {phase !== "running" && (
          <button type="button" className={btn(true)} onClick={start}>
            {pick(locale, phase === "paused" ? S.resume : S.start)}
          </button>
        )}
        {phase === "running" && (
          <button type="button" className={btn(true)} onClick={pause}>
            {pick(locale, S.pause)}
          </button>
        )}
        {phase !== "idle" && (
          <button type="button" className={btn(false)} onClick={lap}>
            {pick(locale, S.lap)}
          </button>
        )}
        {phase !== "idle" && (
          <button type="button" className={btn(false)} onClick={reset}>
            {pick(locale, S.reset)}
          </button>
        )}
      </div>

      <div className="mt-6">
        {rows.length === 0 ? (
          <Note>{pick(locale, S.noLaps)}</Note>
        ) : (
          <TableBox
            head={[pick(locale, S.lapNo), pick(locale, S.lapTime), pick(locale, S.totalTime)]}
            rows={[...rows]
              .reverse()
              .map((r) => [`#${r.index}`, formatStopwatch(r.lap), formatStopwatch(r.total)])}
          />
        )}
      </div>

      <div className="mt-4">
        <Note>{pick(locale, S.bgNote)}</Note>
      </div>
    </ToolPanel>
  );
}
