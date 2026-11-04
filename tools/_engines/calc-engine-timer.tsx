"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, pick } from "./calc-ui";

/**
 * 倒计时引擎:时长输入 + 快速预设、SVG 进度环、归零 WebAudio 蜂鸣、
 * 标签页标题随剩余时间更新。时间一律锚定 Date.now()(墙上时钟),
 * 后台节流也不会累积漂移;状态机保持引擎本地,不进 _lib。
 */

type Phase = "idle" | "running" | "paused" | "done";

const PRESETS_MIN = [1, 3, 5, 10, 25];
const RING_R = 70;
const RING_C = 2 * Math.PI * RING_R;

/** 剩余毫秒 → "M:SS" / "H:MM:SS"(向上取整,满 5 分钟显示 5:00 而非 4:59) */
function formatRemaining(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) ms = 0;
  const total = Math.ceil(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const two = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${two(m)}:${two(s)}` : `${m}:${two(s)}`;
}

const S = {
  duration: { en: "Duration", zh: "时长", ja: "時間", es: "Duración", pt: "Duração" },
  hours: { en: "Hours", zh: "时", ja: "時", es: "Horas", pt: "Horas" },
  minutes: { en: "Minutes", zh: "分", ja: "分", es: "Minutos", pt: "Minutos" },
  seconds: { en: "Seconds", zh: "秒", ja: "秒", es: "Segundos", pt: "Segundos" },
  presets: { en: "Quick presets", zh: "快速预设", ja: "クイックプリセット", es: "Ajustes rápidos", pt: "Predefinições" },
  start: { en: "Start", zh: "开始", ja: "スタート", es: "Iniciar", pt: "Iniciar" },
  pause: { en: "Pause", zh: "暂停", ja: "一時停止", es: "Pausar", pt: "Pausar" },
  resume: { en: "Resume", zh: "继续", ja: "再開", es: "Continuar", pt: "Retomar" },
  reset: { en: "Reset", zh: "重置", ja: "リセット", es: "Reiniciar", pt: "Zerar" },
  done: { en: "Time is up — three beeps, and this tab's title reads 0:00.", zh: "时间到——蜂鸣三声,标签页标题停在 0:00。", ja: "時間です——3 回のビープ音が鳴り、タブのタイトルは 0:00 になります。", es: "Se acabó el tiempo: tres pitidos y el título de esta pestaña marca 0:00.", pt: "Acabou o tempo — três bipes e o título desta aba marca 0:00." },
  needDuration: {
    en: "Set a duration above 0:00 to start the countdown.",
    zh: "请设置一个大于 0:00 的时长再开始倒计时。",
    ja: "0:00 より長い時間を設定してからカウントダウンを開始してください。",
    es: "Fije una duración mayor que 0:00 para iniciar la cuenta atrás.",
    pt: "Defina uma duração maior que 0:00 para iniciar a contagem regressiva.",
  },
  bgNote: {
    en: "The countdown is anchored to the wall clock: it keeps running if you switch tabs or minimize the browser, and the tab title always shows the remaining time.",
    zh: "倒计时以墙上时钟为基准:切换标签页或最小化浏览器它仍继续走,标签页标题会一直显示剩余时间。",
    ja: "カウントダウンは実時間に固定されています。タブを切り替えたりブラウザーを最小化しても計測は続き、タブのタイトルに残り時間が常に表示されます。",
    es: "La cuenta atrás está anclada al reloj real: sigue corriendo si cambia de pestaña o minimiza el navegador, y el título de la pestaña muestra siempre el tiempo restante.",
    pt: "A contagem é ancorada no relógio real: continua correndo se você trocar de aba ou minimizar o navegador, e o título da aba mostra sempre o tempo restante.",
  },
};

export function CalcEngineTimer() {
  const { locale } = useI18n();
  const [phase, setPhase] = useState<Phase>("idle");
  const [h, setH] = useState("0");
  const [m, setM] = useState("5");
  const [s, setS] = useState("0");
  const [remaining, setRemaining] = useState(0);

  const endAtRef = useRef(0);
  const activeDurationRef = useRef(0);
  const audioRef = useRef<AudioContext | null>(null);
  const baseTitleRef = useRef<string | null>(null);

  const durationMs = useMemo(() => {
    const num = (v: string) => {
      const n = Number(v);
      return Number.isFinite(n) && n > 0 ? n : 0;
    };
    return Math.round((num(h) * 3600 + num(m) * 60 + num(s)) * 1000);
  }, [h, m, s]);

  /* 运行中每 200 ms 按墙上时钟校正剩余时间;归零即结束,区间随卸载清理 */
  useEffect(() => {
    if (phase !== "running") return;
    const id = window.setInterval(() => {
      const rem = endAtRef.current - Date.now();
      if (rem <= 0) {
        setRemaining(0);
        setPhase("done");
      } else {
        setRemaining(rem);
      }
    }, 200);
    return () => window.clearInterval(id);
  }, [phase]);

  /* 归零蜂鸣:WebAudio 振荡器,无音频资源;失败静默(计时本身不受影响) */
  useEffect(() => {
    if (phase !== "done") return;
    const ctx = audioRef.current;
    if (!ctx) return;
    try {
      const t0 = ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = 880;
        const at = t0 + i * 0.35;
        gain.gain.setValueAtTime(0.0001, at);
        gain.gain.exponentialRampToValueAtTime(0.25, at + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(at);
        osc.stop(at + 0.3);
      }
    } catch {
      /* 音频不可用时忽略 */
    }
  }, [phase]);

  /* 标签页标题随剩余时间更新;卸载时恢复原标题 */
  useEffect(() => {
    if (baseTitleRef.current === null) baseTitleRef.current = document.title;
    const base = baseTitleRef.current;
    document.title = phase === "idle" ? base : `${formatRemaining(phase === "done" ? 0 : remaining)} — ${base}`;
    return () => {
      if (baseTitleRef.current !== null) document.title = baseTitleRef.current;
    };
  }, [phase, remaining]);

  const ensureAudio = () => {
    try {
      if (!audioRef.current) {
        const Ctor =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (Ctor) audioRef.current = new Ctor();
      }
      void audioRef.current?.resume();
    } catch {
      /* 音频不可用时忽略 */
    }
  };

  const toIdle = () => {
    if (phase === "done" || phase === "running" || phase === "paused") setPhase("idle");
  };

  const start = () => {
    if (durationMs <= 0) return;
    ensureAudio();
    activeDurationRef.current = durationMs;
    endAtRef.current = Date.now() + durationMs;
    setRemaining(durationMs);
    setPhase("running");
  };
  const pause = () => {
    setRemaining(Math.max(0, endAtRef.current - Date.now()));
    setPhase("paused");
  };
  const resume = () => {
    ensureAudio();
    endAtRef.current = Date.now() + remaining;
    setPhase("running");
  };
  const reset = () => setPhase("idle");

  const shownMs = phase === "idle" ? durationMs : phase === "done" ? 0 : remaining;
  const totalMs = phase === "idle" || phase === "done" ? durationMs : activeDurationRef.current;
  const frac = totalMs > 0 ? Math.min(1, Math.max(0, shownMs / totalMs)) : 0;
  const canStart = phase === "idle" && durationMs > 0;

  const btn = (primary: boolean) =>
    `rounded-full px-5 py-2 text-sm font-medium transition-colors ${
      primary
        ? "bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f] hover:opacity-90"
        : "border hairline hover:bg-[var(--color-surface)]"
    }`;

  return (
    <ToolPanel>
      <Note>{pick(locale, S.presets)}</Note>
      <div className="mt-2 flex flex-wrap gap-2">
        {PRESETS_MIN.map((min) => (
          <button
            key={min}
            type="button"
            onClick={() => {
              setH("0");
              setM(String(min));
              setS("0");
              toIdle();
            }}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium hover:bg-[var(--color-surface)]"
          >
            {min} min
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, S.hours)}>
          <NumIn value={h} onChange={(v) => { setH(v); toIdle(); }} aria={pick(locale, S.hours)} placeholder="0" />
        </Field>
        <Field label={pick(locale, S.minutes)}>
          <NumIn value={m} onChange={(v) => { setM(v); toIdle(); }} aria={pick(locale, S.minutes)} placeholder="5" />
        </Field>
        <Field label={pick(locale, S.seconds)}>
          <NumIn value={s} onChange={(v) => { setS(v); toIdle(); }} aria={pick(locale, S.seconds)} placeholder="0" />
        </Field>
      </div>

      <div className="relative mx-auto mt-6 h-48 w-48">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="80" cy="80" r={RING_R} fill="none" stroke="var(--color-surface)" strokeWidth="10" />
          <circle
            cx="80"
            cy="80"
            r={RING_R}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={RING_C * (1 - frac)}
            className="text-[var(--color-accent-strong)] transition-[stroke-dashoffset] duration-200 ease-linear"
          />
        </svg>
        <div
          className="mono absolute inset-0 flex items-center justify-center text-4xl font-semibold tabular-nums"
          aria-live="polite"
        >
          {formatRemaining(shownMs)}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {phase === "idle" && (
          <button type="button" className={btn(true)} onClick={start} disabled={!canStart}>
            {pick(locale, S.start)}
          </button>
        )}
        {phase === "running" && (
          <>
            <button type="button" className={btn(true)} onClick={pause}>
              {pick(locale, S.pause)}
            </button>
            <button type="button" className={btn(false)} onClick={reset}>
              {pick(locale, S.reset)}
            </button>
          </>
        )}
        {phase === "paused" && (
          <>
            <button type="button" className={btn(true)} onClick={resume}>
              {pick(locale, S.resume)}
            </button>
            <button type="button" className={btn(false)} onClick={reset}>
              {pick(locale, S.reset)}
            </button>
          </>
        )}
        {phase === "done" && (
          <button type="button" className={btn(true)} onClick={reset}>
            {pick(locale, S.reset)}
          </button>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {phase === "done" && <Note>{pick(locale, S.done)}</Note>}
        {phase === "idle" && durationMs <= 0 && <Note>{pick(locale, S.needDuration)}</Note>}
        <Note>{pick(locale, S.bgNote)}</Note>
      </div>
    </ToolPanel>
  );
}
