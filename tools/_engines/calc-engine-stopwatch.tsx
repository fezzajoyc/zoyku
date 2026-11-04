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
  start: { en: "Start", zh: "开始", ja: "スタート", es: "Iniciar", pt: "Iniciar" },
  pause: { en: "Pause", zh: "暂停", ja: "一時停止", es: "Pausar", pt: "Pausar" },
  resume: { en: "Resume", zh: "继续", ja: "再開", es: "Continuar", pt: "Retomar" },
  lap: { en: "Lap", zh: "计次", ja: "ラップ", es: "Vuelta", pt: "Volta" },
  reset: { en: "Reset", zh: "重置", ja: "リセット", es: "Reiniciar", pt: "Zerar" },
  lapNo: { en: "Lap", zh: "分段", ja: "ラップ", es: "Vuelta", pt: "Volta" },
  lapTime: { en: "Lap time", zh: "分段用时", ja: "ラップタイム", es: "Tiempo de vuelta", pt: "Tempo de volta" },
  totalTime: { en: "Total time", zh: "累计用时", ja: "累計タイム", es: "Tiempo total", pt: "Tempo total" },
  noLaps: {
    en: "Press Lap while running to split the current total into segments — each row shows the segment time and the running total.",
    zh: "计时进行中按“计次”,把当前累计切成分段——每行显示该段用时和累计用时。",
    ja: "計測中に「ラップ」を押すと現在の累計を分割できます。各行にラップタイムと累計タイムを表示します。",
    es: "Pulse Vuelta durante la marcha para dividir el total actual en tramos: cada fila muestra el tiempo del tramo y el acumulado.",
    pt: "Pressione Volta em andamento para dividir o total atual em trechos — cada linha mostra o tempo do trecho e o total acumulado.",
  },
  bgNote: {
    en: "The stopwatch is anchored to the wall clock, so it keeps counting if you switch tabs; rendering just catches up when you come back. Times show minutes:seconds.centiseconds.",
    zh: "秒表以墙上时钟为基准,切换标签页仍会继续计时,回来时画面立刻跟上;显示格式为 分:秒.百分秒。",
    ja: "ストップウォッチは実時間に固定されているため、タブを切り替えても計測が続きます。表示は 分:秒.センチ秒 です。",
    es: "El cronómetro está anclado al reloj real, así que sigue contando si cambia de pestaña; la pantalla se pone al día al volver. El formato es minutos:segundos.centésimas.",
    pt: "O cronômetro é ancorado no relógio real, então continua contando se você trocar de aba; a tela se atualiza ao voltar. O formato é minutos:segundos.centésimos.",
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
