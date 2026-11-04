"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

/**
 * chmod 计算器:owner/group/other × read/write/execute 勾选矩阵
 * + setuid/setgid/sticky 特殊位,实时输出数字模式与 rwx 符号模式,
 * 支持反向输入(输 644 自动勾选)与 chmod 命令预览。
 * 八进制语义:read=4, write=2, execute=1;特殊位 setuid=4000, setgid=2000, sticky=1000。
 */

const LABELS: Record<string, Record<string, string>> = {
  owner: { en: "Owner", zh: "所有者", ja: "所有者", es: "Propietario", pt: "Proprietário" },
  group: { en: "Group", zh: "组", ja: "グループ", es: "Grupo", pt: "Grupo" },
  other: { en: "Others", zh: "其他用户", ja: "その他", es: "Otros", pt: "Outros" },
  read: { en: "Read", zh: "读", ja: "読み取り", es: "Lectura", pt: "Leitura" },
  write: { en: "Write", zh: "写", ja: "書き込み", es: "Escritura", pt: "Escrita" },
  exec: { en: "Execute", zh: "执行", ja: "実行", es: "Ejecución", pt: "Execução" },
  special: { en: "Special bits", zh: "特殊权限位", ja: "特殊ビット", es: "Bits especiales", pt: "Bits especiais" },
  setuid: { en: "setuid (4000) — run as file owner", zh: "setuid (4000)——以文件所有者身份运行", ja: "setuid (4000) — 所有者権限で実行", es: "setuid (4000): ejecutar como propietario", pt: "setuid (4000) — executar como dono" },
  setgid: { en: "setgid (2000) — run as file group", zh: "setgid (2000)——以文件属组身份运行", ja: "setgid (2000) — グループ権限で実行", es: "setgid (2000): ejecutar como grupo", pt: "setgid (2000) — executar como grupo" },
  sticky: { en: "sticky (1000) — only owner may delete", zh: "sticky (1000)——仅所有者可删除", ja: "sticky (1000) — 所有者のみ削除可", es: "sticky (1000): solo el propietario puede borrar", pt: "sticky (1000) — só o dono pode apagar" },
  numeric: { en: "Numeric mode", zh: "数字模式", ja: "数値モード", es: "Modo numérico", pt: "Modo numérico" },
  symbolic: { en: "Symbolic mode", zh: "符号模式", ja: "記号モード", es: "Modo simbólico", pt: "Modo simbólico" },
  command: { en: "Command", zh: "命令", ja: "コマンド", es: "Comando", pt: "Comando" },
  reverse: { en: "Set from number (e.g. 644)", zh: "按数字设置(如 644)", ja: "数値から設定(例: 644)", es: "Fijar desde número (p. ej. 644)", pt: "Definir pelo número (ex.: 644)" },
  apply: { en: "Apply", zh: "应用", ja: "適用", es: "Aplicar", pt: "Aplicar" },
  invalid: { en: "Enter three octal digits (000–777).", zh: "请输入三位八进制数字(000–777)。", ja: "3 桁の 8 進数(000–777)を入力してください。", es: "Introduce tres dígitos octales (000–777).", pt: "Digite três dígitos octais (000–777)." },
};

const BITS = [
  ["read", 4, "r"],
  ["write", 2, "w"],
  ["exec", 1, "x"],
] as const;

const CLASSES = ["owner", "group", "other"] as const;

type Who = (typeof CLASSES)[number];

/** 八进制一位 → rwx 三元组符号,特殊位体现为 s/S/t/T */
function triad(bits: number, cls: Who): string {
  const set = (b: number) => (bits & b ? true : false);
  let str = "";
  // read
  str += set(4) ? "r" : "-";
  // write
  str += set(2) ? "w" : "-";
  // execute + 特殊位覆盖
  const x = set(1);
  if (cls === "owner") str += x ? (set(8) ? "s" : "x") : set(8) ? "S" : "-";
  else if (cls === "group") str += x ? (set(8) ? "s" : "x") : set(8) ? "S" : "-";
  else str += x ? (set(8) ? "t" : "x") : set(8) ? "T" : "-";
  return str;
}

export function DevEngineChmodCalculator() {
  const { locale } = useI18n();
  const L = (k: string) => LABELS[k]?.[locale] ?? LABELS[k]?.en ?? k;

  // 每类 4 bit:read=4 write=2 exec=1,特殊位第 4 bit=8
  const [perm, setPerm] = useState<Record<Who, number>>({ owner: 7, group: 5, other: 5 });
  const [special, setSpecial] = useState({ setuid: false, setgid: false, sticky: false });
  const [reverseInput, setReverseInput] = useState("");
  const [reverseError, setReverseError] = useState(false);

  const octal = useMemo(() => `${perm.owner}${perm.group}${perm.other}`, [perm]);

  const symbolic = useMemo(() => {
    const owner = triad(perm.owner | (special.setuid ? 8 : 0), "owner");
    const group = triad(perm.group | (special.setgid ? 8 : 0), "group");
    const other = triad(perm.other | (special.sticky ? 8 : 0), "other");
    return owner + group + other;
  }, [perm, special]);

  const absolute = useMemo(() => {
    let base = perm.owner * 64 + perm.group * 8 + perm.other;
    if (special.setuid) base += 4000;
    if (special.setgid) base += 2000;
    if (special.sticky) base += 1000;
    return base;
  }, [perm, special]);

  const command = useMemo(() => {
    // GNU chmod:四位数字也接受;有特殊位时用四位形式更明确
    const num = absolute > 777 ? String(absolute).padStart(4, "0") : octal;
    return `chmod ${num} file`;
  }, [octal, absolute]);

  const toggle = (who: Who, bit: number) =>
    setPerm((p) => ({ ...p, [who]: p[who] ^ bit }));

  const applyReverse = () => {
    const s = reverseInput.trim();
    if (!/^[0-7]{3}$/.test(s)) {
      setReverseError(true);
      return;
    }
    setReverseError(false);
    setPerm({ owner: Number(s[0]), group: Number(s[1]), other: Number(s[2]) });
  };

  // 反向输入框跟随当前模式变化(仅展示用)
  useEffect(() => setReverseInput(""), [octal]);

  const toggleCls =
    "cursor-pointer select-none rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors";

  return (
    <ToolPanel>
      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {CLASSES.map((who) => (
            <div key={who} className="rounded-xl border hairline p-3">
              <p className="mb-2 text-[14px] font-semibold">{L(who)}</p>
              <div className="space-y-1.5">
                {BITS.map(([label, bit]) => {
                  const on = (perm[who] & bit) !== 0;
                  return (
                    <label key={label} className="flex cursor-pointer items-center gap-2 text-[13.5px]">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggle(who, bit)}
                        className="accent-[var(--color-accent)]"
                      />
                      {L(label)}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border hairline p-3">
          <p className="mb-2 text-[14px] font-semibold">{L("special")}</p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["setuid", special.setuid, (v: boolean) => setSpecial((s) => ({ ...s, setuid: v }))],
                ["setgid", special.setgid, (v: boolean) => setSpecial((s) => ({ ...s, setgid: v }))],
                ["sticky", special.sticky, (v: boolean) => setSpecial((s) => ({ ...s, sticky: v }))],
              ] as const
            ).map(([key, val, set]) => (
              <label key={key} className={`${toggleCls} hairline ${val ? "bg-[var(--color-surface)]" : "opacity-70"}`}>
                <input type="checkbox" checked={val} onChange={(e) => set(e.target.checked)} className="mr-1.5 accent-[var(--color-accent)]" />
                {L(key)}
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-[var(--color-surface)] px-4 py-4 text-center">
            <p className="mb-1 text-[12.5px] font-medium text-[var(--color-sub)]">{L("numeric")}</p>
            <p className="mono text-[28px] font-bold tracking-widest">{octal}</p>
            {absolute > 777 && <p className="mono mt-1 text-[13px] text-[var(--color-sub)]">{absolute}</p>}
          </div>
          <div className="rounded-xl bg-[var(--color-surface)] px-4 py-4 text-center">
            <p className="mb-1 text-[12.5px] font-medium text-[var(--color-sub)]">{L("symbolic")}</p>
            <p className="mono break-all text-[24px] font-bold tracking-widest">{symbolic}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[13.5px] font-medium">{L("command")}</span>
          <code className="mono rounded-lg bg-[var(--color-surface)] px-3 py-1.5 text-[13.5px]">{command}</code>
          <CopyButton value={command} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="text-[13.5px]" htmlFor="chmod-reverse">{L("reverse")}</label>
          <input
            id="chmod-reverse"
            className="field mono w-24 py-1.5"
            value={reverseInput}
            onChange={(e) => setReverseInput(e.target.value)}
            placeholder="644"
            inputMode="numeric"
          />
          <button type="button" onClick={applyReverse} className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium hover:bg-[var(--color-surface)]">
            {L("apply")}
          </button>
          {reverseError && <span className="text-[13px]" style={{ color: "var(--color-bad)" }}>{L("invalid")}</span>}
        </div>
      </div>
    </ToolPanel>
  );
}
