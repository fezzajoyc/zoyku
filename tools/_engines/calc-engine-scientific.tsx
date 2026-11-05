"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Note, pick } from "./calc-ui";

/**
 * Scientific calculator: keypad + expression display. The expression is
 * evaluated by a hand-written tokenizer + recursive-descent parser — there is
 * NO eval / new Function anywhere. Functions: sin cos tan (DEG/RAD), log (base
 * 10), ln, √, x², powers; constants π and e; unary minus, %, implicit ×.
 */

type Tok =
  | { t: "num"; v: number }
  | { t: "op"; v: "+" | "-" | "*" | "/" | "^" }
  | { t: "lp" }
  | { t: "rp" }
  | { t: "fn"; v: string }
  | { t: "const"; v: "pi" | "e" }
  | { t: "post"; v: "sq" | "pct" };

const FUNCS = new Set(["sin", "cos", "tan", "asin", "acos", "atan", "log", "ln", "sqrt"]);

function tokenize(src: string): Tok[] {
  const s = src
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/[−–—]/g, "-")
    .replace(/√/g, "sqrt")
    .replace(/π/g, "pi");
  const toks: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (ch === " " || ch === "," || ch === "_") {
      i++;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      const n = Number(s.slice(i, j));
      if (!Number.isFinite(n)) throw new Error("bad number");
      toks.push({ t: "num", v: n });
      i = j;
      continue;
    }
    if (/[a-z]/i.test(ch)) {
      let j = i;
      while (j < s.length && /[a-z]/i.test(s[j])) j++;
      const w = s.slice(i, j).toLowerCase();
      if (w === "pi") toks.push({ t: "const", v: "pi" });
      else if (w === "e") toks.push({ t: "const", v: "e" });
      else if (FUNCS.has(w)) toks.push({ t: "fn", v: w });
      else throw new Error(`unknown word: ${w}`);
      i = j;
      continue;
    }
    if (ch === "²") {
      toks.push({ t: "post", v: "sq" });
      i++;
      continue;
    }
    if (ch === "%") {
      toks.push({ t: "post", v: "pct" });
      i++;
      continue;
    }
    if (ch === "(") {
      toks.push({ t: "lp" });
      i++;
      continue;
    }
    if (ch === ")") {
      toks.push({ t: "rp" });
      i++;
      continue;
    }
    if (ch === "+" || ch === "-" || ch === "*" || ch === "/" || ch === "^") {
      toks.push({ t: "op", v: ch });
      i++;
      continue;
    }
    throw new Error(`unexpected char: ${ch}`);
  }
  return toks;
}

function evaluate(src: string, degrees: boolean): number {
  const toks = tokenize(src);
  let pos = 0;

  const peek = (): Tok | undefined => toks[pos];
  const startsPrimary = (tk?: Tok): boolean =>
    !!tk && (tk.t === "num" || tk.t === "lp" || tk.t === "fn" || tk.t === "const");

  const applyTrig = (name: string, x: number): number => {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const fromRad = (v: number) => (v * 180) / Math.PI;
    switch (name) {
      case "sin": return Math.sin(degrees ? toRad(x) : x);
      case "cos": return Math.cos(degrees ? toRad(x) : x);
      case "tan": return Math.tan(degrees ? toRad(x) : x);
      case "asin": return degrees ? fromRad(Math.asin(x)) : Math.asin(x);
      case "acos": return degrees ? fromRad(Math.acos(x)) : Math.acos(x);
      case "atan": return degrees ? fromRad(Math.atan(x)) : Math.atan(x);
      default: throw new Error(`bad fn ${name}`);
    }
  };

  const primary = (): number => {
    const tk = peek();
    if (!tk) throw new Error("unexpected end");
    if (tk.t === "num") {
      pos++;
      return tk.v;
    }
    if (tk.t === "const") {
      pos++;
      return tk.v === "pi" ? Math.PI : Math.E;
    }
    if (tk.t === "fn") {
      pos++;
      let arg: number;
      const next = peek();
      if (next && next.t === "lp") {
        pos++; // consume (
        arg = expr();
        const close = peek();
        if (!close || close.t !== "rp") throw new Error("missing )");
        pos++;
      } else {
        arg = unary(); // allow √9 without parens
      }
      switch (tk.v) {
        case "log": return Math.log10(arg);
        case "ln": return Math.log(arg);
        case "sqrt": return Math.sqrt(arg);
        default: return applyTrig(tk.v, arg);
      }
    }
    if (tk.t === "lp") {
      pos++;
      const v = expr();
      const close = peek();
      if (!close || close.t !== "rp") throw new Error("missing )");
      pos++;
      return v;
    }
    throw new Error("expected value");
  };

  const postfix = (): number => {
    let v = primary();
    for (;;) {
      const tk = peek();
      if (tk && tk.t === "post") {
        pos++;
        v = tk.v === "sq" ? v * v : v / 100;
      } else break;
    }
    return v;
  };

  const unary = (): number => {
    const tk = peek();
    if (tk && tk.t === "op" && (tk.v === "-" || tk.v === "+")) {
      pos++;
      const v = unary();
      return tk.v === "-" ? -v : v;
    }
    return postfix();
  };

  const power = (): number => {
    const base = unary();
    const tk = peek();
    if (tk && tk.t === "op" && tk.v === "^") {
      pos++;
      const exp = unary(); // right-associative, allows 2^-3
      return Math.pow(base, exp);
    }
    return base;
  };

  const term = (): number => {
    let v = power();
    for (;;) {
      const tk = peek();
      if (tk && tk.t === "op" && (tk.v === "*" || tk.v === "/")) {
        pos++;
        const rhs = power();
        v = tk.v === "*" ? v * rhs : v / rhs;
      } else if (startsPrimary(tk)) {
        const rhs = power();
        v = v * rhs; // implicit multiplication: 2π, 3(4+1), 2sin(30)
      } else break;
    }
    return v;
  };

  const expr = (): number => {
    let v = term();
    for (;;) {
      const tk = peek();
      if (tk && tk.t === "op" && (tk.v === "+" || tk.v === "-")) {
        pos++;
        const rhs = term();
        v = tk.v === "+" ? v + rhs : v - rhs;
      } else break;
    }
    return v;
  };

  const result = expr();
  if (pos !== toks.length) throw new Error("trailing input");
  if (!Number.isFinite(result) && !Number.isNaN(result)) throw new Error("infinite");
  return result;
}

const MAIN_ROWS: string[][] = [
  ["AC", "⌫", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "(", ")"],
];

const FN_ROWS: string[][] = [
  ["sin", "cos", "tan", "log", "ln"],
  ["√(", "x²", "π", "e", "^"],
];

export function CalcEngineScientific() {
  const { locale } = useI18n();
  const [expr, setExpr] = useState("");
  const [degrees, setDegrees] = useState(true);
  const [lastError, setLastError] = useState(false);

  const preview = useMemo(() => {
    if (!expr.trim()) return { ok: true as const, text: "" };
    try {
      const v = evaluate(expr, degrees);
      if (Number.isNaN(v)) return { ok: false as const, text: "" };
      return { ok: true as const, text: Number(v.toPrecision(12)).toString() };
    } catch {
      return { ok: false as const, text: "" };
    }
  }, [expr, degrees]);

  const press = (k: string) => {
    setLastError(false);
    if (k === "AC") {
      setExpr("");
      return;
    }
    if (k === "⌫") {
      setExpr((e) => e.slice(0, -1));
      return;
    }
    if (k === "x²") {
      setExpr((e) => e + "²");
      return;
    }
    if (k === "=") {
      if (preview.ok && preview.text) setExpr(preview.text);
      else setLastError(true);
      return;
    }
    setExpr((e) => e + k);
  };

  const btn = (k: string, extra = "") => {
    const isAction = k === "AC" || k === "⌫" || k === "=";
    return (
      <button
        key={k}
        type="button"
        onClick={() => press(k)}
        className={`mono h-11 rounded-xl border text-[15px] font-medium transition-colors sm:h-12 ${
          isAction
            ? k === "="
              ? "border-transparent bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-strong)]"
              : "hairline bg-[var(--color-surface)] hover:bg-[rgba(0,0,0,0.06)]"
            : `hairline hover:bg-[var(--color-surface)] ${extra}`
        }`}
      >
        {k}
      </button>
    );
  };

  return (
    <ToolPanel>
      <div className="flex items-center justify-between gap-3">
        <div className="flex rounded-full border hairline p-0.5" role="group">
          {[true, false].map((d) => (
            <button
              key={String(d)}
              type="button"
              onClick={() => setDegrees(d)}
              className={`mono rounded-full px-3.5 py-1 text-[12.5px] font-semibold transition-colors ${
                degrees === d ? "bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]" : "text-[var(--color-sub)] hover:text-[var(--color-ink)]"
              }`}
            >
              {d ? "DEG" : "RAD"}
            </button>
          ))}
        </div>
        <span className="text-[12.5px] text-[var(--color-sub)]">
          {pick(locale, { en: "Live result · no eval, no server", zh: "实时预览 · 无 eval、不联网", ja: "リアルタイム計算・eval なし・通信なし", es: "Resultado en vivo · sin eval ni servidor", pt: "Resultado ao vivo · sem eval e sem servidor", fr: "Résultat en direct · sans eval ni serveur", de: "Live-Ergebnis · ohne eval, ohne Server", ru: "Результат в реальном времени · без eval и без сервера", it: "Risultato live · senza eval né server", tr: "Canlı sonuç · eval yok, sunucu yok", ko: "실시간 결과 · eval 없음 · 서버 없음", ar: "نتيجة فورية · بدون eval أو خادم", hi: "लाइव परिणाम · eval नहीं, सर्वर नहीं", id: "Hasil langsung · tanpa eval, tanpa server", vi: "Kết quả trực tiếp · không eval, không máy chủ" })}
        </span>
      </div>

      <div className="mt-4 rounded-2xl border hairline bg-[var(--color-surface)] px-4 py-3.5">
        <input
          type="text"
          className="mono w-full border-0 bg-transparent text-right text-xl font-medium outline-none"
          value={expr}
          onChange={(e) => {
            setLastError(false);
            setExpr(e.target.value);
          }}
          placeholder="0"
          aria-label="expression"
          spellCheck={false}
          autoComplete="off"
        />
        <p className={`mono mt-1 min-h-6 text-right text-[15px] ${lastError || !preview.ok ? "text-[var(--color-bad)]" : "text-[var(--color-sub)]"}`} aria-live="polite">
          {preview.ok && preview.text ? `= ${preview.text}` : lastError || (!preview.ok && expr.trim() !== "") ? "—" : ""}
        </p>
      </div>

      <div className="mt-4 space-y-2">
        {FN_ROWS.map((row, i) => (
          <div key={i} className="grid grid-cols-5 gap-2">
            {row.map((k) => btn(k))}
          </div>
        ))}
        {MAIN_ROWS.slice(0, 4).map((row, i) => (
          <div key={i} className="grid grid-cols-4 gap-2">
            {row.map((k) => btn(k, /[0-9.]/.test(k) ? "bg-[var(--color-card)]" : ""))}
          </div>
        ))}
        <div className="grid grid-cols-5 gap-2">
          {MAIN_ROWS[4].map((k) => btn(k, /[0-9.]/.test(k) ? "bg-[var(--color-card)]" : ""))}
          {btn("=")}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <CopyButton value={preview.ok ? preview.text : ""} label={pick(locale, { en: "Copy result", zh: "复制结果", ja: "結果をコピー", es: "Copiar resultado", pt: "Copiar resultado", fr: "Copier le résultat", de: "Ergebnis kopieren", ru: "Копировать результат", it: "Copia risultato", tr: "Sonucu kopyala", ko: "결과 복사", ar: "نسخ النتيجة", hi: "परिणाम कॉपी करें", id: "Salin hasil", vi: "Sao chép kết quả" })} />
      </div>

      <div className="mt-3">
        <Note>
          {pick(locale, {
            en: "Type with the keypad or your keyboard. Implicit multiplication works (2π, 3(4+1)); % divides by 100; DEG/RAD switches trigonometric units.",
            zh: "可用键盘输入或直接敲击。支持隐式乘法(2π、3(4+1));% 表示除以 100;DEG/RAD 切换三角函数单位。",
            ja: "キーパッドでもキーボードでも入力できます。省略乗算(2π、3(4+1))に対応、% は 100 で割る意味、DEG/RAD で三角関数の単位を切替ます。",
            es: "Escriba con el teclado en pantalla o el suyo. Hay multiplicación implícita (2π, 3(4+1)); % divide entre 100; DEG/RAD cambia las unidades trigonométricas.",
            pt: "Digite pelo teclado da tela ou o físico. Há multiplicação implícita (2π, 3(4+1)); % divide por 100; DEG/RAD troca as unidades trigonométricas.",
            fr: "Tapez au clavier virtuel ou physique. La multiplication implicite fonctionne (2π, 3(4+1)) ; % divise par 100 ; DEG/RAD bascule les unités trigonométriques.",
            de: "Tippe über Keypad oder Tastatur. Implizite Multiplikation funktioniert (2π, 3(4+1)); % dividiert durch 100; DEG/RAD schaltet trigonometrische Einheiten.",
            ru: "Вводите с клавиатуры панели или обычной. Неявное умножение работает (2π, 3(4+1)); % делит на 100; DEG/RAD переключает тригонометрические единицы.",
            it: "Digita con il tastierino o la tastiera. La moltiplicazione implicita funziona (2π, 3(4+1)); % divide per 100; DEG/RAD cambia le unità trigonometriche.",
            tr: "Tuş takımı veya klavyenizle yazın. Örtük çarpım çalışır (2π, 3(4+1)); % 100'e böler; DEG/RAD trigonometri birimini değiştirir.",
            ko: "키패드나 키보드로 입력하세요. 암시적 곱셈이 동작하고(2π, 3(4+1)) %는 100으로 나누며, DEG/RAD로 삼각함수 단위를 바꿉니다.",
            ar: "اكتب بلوحة المفاتيح أو لوحتك. الضرب الضمني يعمل (2π، 3(4+1))؛ % يقسم على 100؛ وDEG/RAD يبدّل وحدات المثلثات.",
            hi: "कीपैड या अपने कीबोर्ड से लिखें। अव्यक्त गुणन काम करता है (2π, 3(4+1)); % 100 से भाग देता है; DEG/RAD त्रिकोणमितीय इकाइयाँ बदलता है।",
            id: "Ketik dengan keypad atau papan tulis Anda. Perkalian implisit berfungsi (2π, 3(4+1)); % membagi 100; DEG/RAD mengganti satuan trigonometri.",
            vi: "Nhập bằng bàn phím ảo hoặc bàn phím máy. Nhân ngầm hoạt động (2π, 3(4+1)); % chia cho 100; DEG/RAD đổi đơn vị lượng giác.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}
