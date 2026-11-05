"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { beepPattern, remainingParts, ringGeometry, totalSeconds } from "../_lib/countdown";
import { Field, NumIn, pick } from "./calc-ui";

const PRESETS = [1, 3, 5, 10, 25];

/** 倒计时:SVG 进度环 + 零点提示音(WebAudio,无音频资源)。 */
export function CalcEngineCountdown() {
  const { locale, t } = useI18n();
  const [h, setH] = useState("0");
  const [m, setM] = useState("5");
  const [s, setS] = useState("0");
  const [left, setLeft] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const raf = useRef<number | null>(null);
  const deadline = useRef(0);
  const audioCtx = useRef<AudioContext | null>(null);

  const total = totalSeconds({
    hours: Math.max(0, Math.floor(Number(h) || 0)),
    minutes: Math.max(0, Math.floor(Number(m) || 0)),
    seconds: Math.max(0, Math.floor(Number(s) || 0)),
  });

  useEffect(() => {
    if (!running) return;
    deadline.current = Date.now() + (left ?? total) * 1000;
    const tick = () => {
      const rem = (deadline.current - Date.now()) / 1000;
      if (rem <= 0) {
        setLeft(0);
        setRunning(false);
        setDone(true);
        // 提示音
        try {
          audioCtx.current ??= new AudioContext();
          const ctx = audioCtx.current;
          const t0 = ctx.currentTime;
          beepPattern().durationsMs.forEach((dur, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = beepPattern().freq;
            gain.gain.value = 0.08;
            osc.connect(gain).connect(ctx.destination);
            osc.start(t0 + i * 0.36);
            osc.stop(t0 + i * 0.36 + dur / 1000);
          });
        } catch {
          /* 无音频设备时静默 */
        }
        return;
      }
      setLeft(rem);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const parts = remainingParts(left ?? total);
  const display = `${parts.hours > 0 ? `${parts.hours}:` : ""}${String(parts.minutes).padStart(parts.hours > 0 ? 2 : 1, "0")}:${String(parts.seconds).padStart(2, "0")}`;
  const elapsedFraction = total > 0 ? 1 - (left ?? total) / total : 0;
  const R = 88;
  const ring = ringGeometry(running || left !== null ? elapsedFraction : 0, R);

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, { en: "Hours", zh: "小时", ja: "時間", es: "Horas", pt: "Horas", fr: "Heures", de: "Stunden", ru: "Часы", it: "Ore", tr: "Saat", ko: "시간", ar: "ساعات", hi: "घंटे", id: "Jam", vi: "Giờ" })}>
          <NumIn value={h} onChange={setH} aria="hours" />
        </Field>
        <Field label={pick(locale, { en: "Minutes", zh: "分钟", ja: "分", es: "Minutos", pt: "Minutos", fr: "Minutes", de: "Minuten", ru: "Минуты", it: "Minuti", tr: "Dakika", ko: "분", ar: "دقائق", hi: "मिनट", id: "Menit", vi: "Phút" })}>
          <NumIn value={m} onChange={setM} aria="minutes" />
        </Field>
        <Field label={pick(locale, { en: "Seconds", zh: "秒", ja: "秒", es: "Segundos", pt: "Segundos", fr: "Secondes", de: "Sekunden", ru: "Секунды", it: "Secondi", tr: "Saniye", ko: "초", ar: "ثوانٍ", hi: "सेकंड", id: "Detik", vi: "Giây" })}>
          <NumIn value={s} onChange={setS} aria="seconds" />
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => { setH("0"); setM(String(p)); setS("0"); setLeft(null); setRunning(false); setDone(false); }}
            className="rounded-full border hairline px-3 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {p} min
          </button>
        ))}
      </div>

      <div className="relative mx-auto mt-6 h-56 w-56">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle cx="100" cy="100" r={R} fill="none" stroke="var(--color-surface)" strokeWidth="8" />
          <circle
            cx="100" cy="100" r={R} fill="none"
            stroke={done ? "var(--color-good)" : "var(--color-accent)"}
            strokeWidth="8" strokeLinecap="round"
            strokeDasharray={ring.circumference}
            strokeDashoffset={ring.dashOffset}
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center ${done ? "text-[var(--color-good)]" : ""}`}>
          <span className="mono text-4xl font-bold tabular-nums">{display}</span>
        </div>
      </div>

      {done && (
        <p role="status" className="mt-3 text-center text-[15px] font-semibold text-[var(--color-good)]">
          {pick(locale, { en: "Time's up!", zh: "时间到!", ja: "時間です!", es: "¡Tiempo!", pt: "Tempo esgotado!", fr: "Le temps est écoulé !", de: "Die Zeit ist um!", ru: "Время вышло!", it: "Tempo scaduto!", tr: "Süre doldu!", ko: "시간이 다 되었습니다!", ar: "انتهى الوقت!", hi: "समय समाप्त!", id: "Waktu habis!", vi: "Hết giờ!" })}
        </p>
      )}

      <div className="mt-5 flex flex-wrap justify-center gap-2.5">
        <button
          type="button"
          onClick={() => { if (!running) setDone(false); setRunning((r) => !r); }}
          disabled={total <= 0 && !running}
          className="rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {running
            ? pick(locale, { en: "Pause", zh: "暂停", ja: "一時停止", es: "Pausar", pt: "Pausar", fr: "Pause", de: "Pause", ru: "Пауза", it: "Pausa", tr: "Duraklat", ko: "일시정지", ar: "إيقاف مؤقت", hi: "रोकें", id: "Jeda", vi: "Tạm dừng" })
            : pick(locale, { en: "Start", zh: "开始", ja: "スタート", es: "Iniciar", pt: "Iniciar", fr: "Démarrer", de: "Starten", ru: "Старт", it: "Avvia", tr: "Başlat", ko: "시작", ar: "ابدأ", hi: "शुरू करें", id: "Mulai", vi: "Bắt đầu" })}
        </button>
        <button
          type="button"
          onClick={() => { setRunning(false); setLeft(null); setDone(false); }}
          className="rounded-full border hairline px-4 py-2.5 text-[14px] font-medium transition-colors hover:bg-[var(--color-surface)]"
        >
          {t.common.reset}
        </button>
      </div>
    </ToolPanel>
  );
}
