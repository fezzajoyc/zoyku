"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Note, pick } from "./calc-ui";

type KeyRecord = {
  key: string;
  code: string;
  keyCode: number;
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  meta: boolean;
  repeat: boolean;
};

const MOD_KEY = (on: boolean, label: string) => (
  <span
    className={`mono rounded-md border px-2 py-0.5 text-[13px] font-medium transition-colors ${
      on ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]" : "hairline text-[var(--color-sub)]"
    }`}
  >
    {label}
  </span>
);

export function UtilEngineKeycode() {
  const { locale } = useI18n();
  const [rec, setRec] = useState<KeyRecord | null>(null);
  const [history, setHistory] = useState<KeyRecord[]>([]);
  const [ignoreRepeat, setIgnoreRepeat] = useState(true);
  const ignoreRef = useRef(ignoreRepeat);
  ignoreRef.current = ignoreRepeat;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (ignoreRef.current && e.repeat) return;
      const r: KeyRecord = {
        key: e.key,
        code: e.code,
        keyCode: e.keyCode,
        ctrl: e.ctrlKey,
        alt: e.altKey,
        shift: e.shiftKey,
        meta: e.metaKey,
        repeat: e.repeat,
      };
      setRec(r);
      setHistory((h) => [r, ...h].slice(0, 10));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const L = {
    key: pick(locale, { en: "event.key", zh: "event.key", ja: "event.key", es: "event.key", pt: "event.key" }),
    code: pick(locale, { en: "event.code", zh: "event.code", ja: "event.code", es: "event.code", pt: "event.code" }),
    kc: pick(locale, { en: "keyCode", zh: "keyCode", ja: "keyCode", es: "keyCode", pt: "keyCode" }),
    hint: pick(locale, {
      en: "Press any key — the values update instantly. Focus stays on the page, no input box needed.",
      zh: "按下任意键,数值即时更新。无需点击输入框,页面获得焦点即可。",
      ja: "任意のキーを押すと即座に表示されます。入力欄の選択は不要です。",
      es: "Pulse cualquier tecla: los valores se actualizan al instante, sin cuadro de texto.",
      pt: "Pressione qualquer tecla — os valores atualizam na hora, sem caixa de texto.",
    }),
    repeat: pick(locale, { en: "Ignore auto-repeat", zh: "忽略重复按键", ja: "自動リピートを無視", es: "Ignorar repetición automática", pt: "Ignorar repetição automática" }),
    hist: pick(locale, { en: "Last 10 keys", zh: "最近 10 次按键", ja: "直近10キー", es: "Últimas 10 teclas", pt: "Últimas 10 teclas" }),
    wait: pick(locale, { en: "Waiting for a key press…", zh: "等待按键…", ja: "キー入力を待っています…", es: "Esperando una tecla…", pt: "Aguardando uma tecla…" }),
    clear: pick(locale, { en: "Clear history", zh: "清空历史", ja: "履歴を消去", es: "Borrar historial", pt: "Limpar histórico" }),
    yes: pick(locale, { en: "yes", zh: "是", ja: "はい", es: "sí", pt: "sim" }),
    no: pick(locale, { en: "no", zh: "否", ja: "いいえ", es: "no", pt: "não" }),
  };

  return (
    <ToolPanel>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: L.key, value: rec ? rec.key : "—" },
          { label: L.code, value: rec ? rec.code : "—" },
          { label: L.kc, value: rec ? String(rec.keyCode) : "—" },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border hairline px-4 py-4 text-center">
            <div className="mono text-[11.5px] uppercase tracking-wide text-[var(--color-sub)]">{c.label}</div>
            <div className="mono mt-1.5 truncate text-[22px] font-semibold" aria-live="polite">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[13px] font-medium text-[var(--color-sub)]">
          {pick(locale, { en: "Modifiers", zh: "修饰键", ja: "修飾キー", es: "Modificadoras", pt: "Modificadoras" })}
        </span>
        {MOD_KEY(!!rec?.ctrl, "Ctrl")}
        {MOD_KEY(!!rec?.alt, "Alt")}
        {MOD_KEY(!!rec?.shift, "Shift")}
        {MOD_KEY(!!rec?.meta, "Meta")}
        {rec && (
          <span className="mono ml-1 text-[12.5px] text-[var(--color-sub)]">
            repeat: {rec.repeat ? L.yes : L.no}
          </span>
        )}
        <label className="ml-auto flex items-center gap-1.5 text-[13px]">
          <input type="checkbox" checked={ignoreRepeat} onChange={(e) => setIgnoreRepeat(e.target.checked)} />
          {L.repeat}
        </label>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[13px] font-medium text-[var(--color-sub)]">{L.hist}</span>
          <button
            type="button"
            onClick={() => setHistory([])}
            className="rounded-full border hairline px-3 py-1 text-[12.5px] font-medium hover:bg-[var(--color-surface)]"
          >
            {L.clear}
          </button>
        </div>
        {history.length === 0 ? (
          <Note>{L.wait}</Note>
        ) : (
          <div className="overflow-hidden rounded-xl border hairline">
            <table className="w-full text-[13.5px]">
              <tbody>
                {history.map((h, i) => (
                  <tr key={i} className={i % 2 ? "bg-[var(--color-surface)]" : ""}>
                    <td className="mono px-3.5 py-1.5 font-medium">{h.key}</td>
                    <td className="mono px-3.5 py-1.5 text-[var(--color-sub)]">{h.code}</td>
                    <td className="mono px-3.5 py-1.5 text-right text-[var(--color-sub)]">{h.keyCode}</td>
                    <td className="px-3.5 py-1.5 text-right text-[12px] text-[var(--color-sub)]">
                      {[h.ctrl && "Ctrl", h.alt && "Alt", h.shift && "Shift", h.meta && "Meta"].filter(Boolean).join("+") || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="mt-3">
        <Note>{L.hint}</Note>
      </div>
    </ToolPanel>
  );
}
