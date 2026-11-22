"use client";

import { useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import { add, determinant, inverse, multiply, parseMatrix, transpose, type Matrix } from "../_lib/matrix-ops";

/**
 * CN-029:矩阵计算器引擎。尺寸选择 2×2/3×3/4×4,双矩阵网格输入。
 * 操作:行列式(A)/逆矩阵(A)/转置(A)/A×B/A+B。结果表格 + 复制。
 */

const SIZES = [2, 3, 4] as const;

const L = {
  size: { en: "Size", zh: "尺寸", ja: "サイズ", es: "Tamaño", pt: "Tamanho" },
  matrixA: { en: "Matrix A", zh: "矩阵 A", ja: "行列 A", es: "Matriz A", pt: "Matriz A" },
  matrixB: { en: "Matrix B", zh: "矩阵 B", ja: "行列 B", es: "Matriz B", pt: "Matriz B" },
  det: { en: "Determinant (A)", zh: "行列式(A)", ja: "行列式(A)", es: "Determinante (A)", pt: "Determinante (A)" },
  inv: { en: "Inverse (A)", zh: "逆矩阵(A)", ja: "逆行列(A)", es: "Inversa (A)", pt: "Inversa (A)" },
  trans: { en: "Transpose (A)", zh: "转置(A)", ja: "転置(A)", es: "Transpuesta (A)", pt: "Transposta (A)" },
  mul: { en: "A × B", zh: "A × B", ja: "A × B", es: "A × B", pt: "A × B" },
  add: { en: "A + B", zh: "A + B", ja: "A + B", es: "A + B", pt: "A + B" },
  result: { en: "Result", zh: "结果", ja: "結果", es: "Resultado", pt: "Resultado" },
  singular: {
    en: "Determinant is 0 — this matrix has no inverse (singular).",
    zh: "行列式为 0——该矩阵不可逆(奇异矩阵)。",
    ja: "行列式が 0 — この行列は逆行列を持ちません(正則でない)。",
    es: "El determinante es 0 — esta matriz no tiene inversa (singular).",
    pt: "O determinante é 0 — esta matriz não tem inversa (singular).",
  },
  badCell: {
    en: "Some cells are not valid numbers — check the highlighted position in the message.",
    zh: "部分单元格不是有效数字——请按提示位置检查。",
    ja: "数値でないセルがあります — メッセージの位置を確認してください。",
    es: "Algunas celdas no son números válidos — revise la posición indicada.",
    pt: "Algumas células não são números válidos — verifique a posição indicada.",
  },
  note: {
    en: "Determinants use cofactor expansion, inverses use Gauss–Jordan elimination with partial pivoting. Results are exact for integer matrices up to rounding in the decimal display. Inverse requires a non-zero determinant (non-singular matrix). All computation runs locally.",
    zh: "行列式用余子式展开,逆矩阵用带部分主元的高斯-若尔当消元;整数矩阵的结果在小数显示内精确。逆矩阵要求行列式非零(非奇异矩阵)。全部本机计算。",
    ja: "行列式は余因子展開、逆行列は部分ピボット付きガウス・ジョルダン消元を使用。整数行列の結果は小数表示内で正確です。逆行列は行列式が非零であることが必要です。すべてローカル計算です。",
    es: "Los determinantes usan expansión por cofactores, las inversas eliminación Gauss–Jordan con pivoteo parcial. Los resultados de matrices enteras son exactos dentro del redondeo decimal. La inversa requiere determinante distinto de cero. Todo cálculo local.",
    pt: "Determinantes usam expansão por cofatores, inversas eliminação Gauss–Jordan com pivoteamento parcial. Resultados de matrizes inteiras são exatos dentro do arredondamento decimal. A inversa exige determinante diferente de zero. Todo cálculo local.",
  },
};

function emptyGrid(n: number): string[][] {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => ""));
}

export function CalcEngineMatrix() {
  const { locale } = useI18n();
  const [n, setN] = useState<number>(3);
  const [gridA, setGridA] = useState<string[][]>(emptyGrid(3));
  const [gridB, setGridB] = useState<string[][]>(emptyGrid(3));
  const [result, setResult] = useState<Matrix | null>(null);
  const [scalar, setScalar] = useState<number | null>(null);
  const [label, setLabel] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const changeSize = (size: number) => {
    setN(size);
    setGridA(emptyGrid(size));
    setGridB(emptyGrid(size));
    setResult(null);
    setScalar(null);
    setErr(null);
  };

  const setCell = (grid: "a" | "b", i: number, j: number, v: string) => {
    const g = (grid === "a" ? gridA : gridB).map((row) => [...row]);
    g[i][j] = v;
    if (grid === "a") setGridA(g);
    else setGridB(g);
    setResult(null);
    setErr(null);
  };

  const errText = (code: string, message?: string) =>
    code === "singular"
      ? pick(locale, L.singular)
      : code === "badCell"
        ? pick(locale, L.badCell) + (message ? ` (${message})` : "")
        : pick(locale, L.badCell);

  const showMatrix = (m: Matrix) => setResult(m);
  const showScalar = (v: number, lbl: string) => {
    setScalar(v);
    setLabel(lbl);
    setResult(null);
  };

  const parseA = () => parseMatrix(gridA, n);
  const parseB = () => parseMatrix(gridB, n);

  const op = (kind: "det" | "inv" | "trans" | "mul" | "add") => {
    setErr(null);
    setScalar(null);
    if (kind === "det") {
      const a = parseA();
      if (!a.ok) return setErr(errText(a.code, a.message));
      showScalar(determinant(a.matrix), pick(locale, L.det));
      return;
    }
    if (kind === "inv") {
      const a = parseA();
      if (!a.ok) return setErr(errText(a.code, a.message));
      const r = inverse(a.matrix);
      if (!r.ok) return setErr(errText(r.code));
      showMatrix(r.matrix);
      return;
    }
    if (kind === "trans") {
      const a = parseA();
      if (!a.ok) return setErr(errText(a.code, a.message));
      showMatrix(transpose(a.matrix));
      return;
    }
    const a = parseA();
    const b = parseB();
    if (!a.ok) return setErr(errText(a.code, a.message));
    if (!b.ok) return setErr(errText(b.code, b.message));
    const r = kind === "mul" ? multiply(a.matrix, b.matrix) : add(a.matrix, b.matrix);
    if (!r.ok) return setErr(errText(r.code));
    showMatrix(r.matrix);
  };

  const resultStr = result ? result.map((row) => row.map((v) => String(Number(v.toPrecision(12)))).join("\t")).join("\n") : "";
  const scalarStr = scalar !== null ? String(Number(scalar.toPrecision(12))) : "";

  const grid = (values: string[][], label: string, onCell: (i: number, j: number, v: string) => void) => (
    <div className="space-y-2">
      <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{label}</p>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {values.map((row, i) =>
          row.map((cell, j) => (
            <input
              key={`${i}-${j}`}
              type="text"
              inputMode="decimal"
              className="field mono text-center"
              value={cell}
              onChange={(e) => onCell(i, j, e.target.value)}
              aria-label={`${label} ${i + 1}-${j + 1}`}
              spellCheck={false}
            />
          )),
        )}
      </div>
    </div>
  );

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.size)}</p>
          <div className="flex flex-wrap gap-2" role="group">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={n === s}
                onClick={() => changeSize(s)}
                className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  n === s
                    ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                    : "hairline hover:bg-[var(--color-surface)]"
                }`}
              >
                {s}×{s}
              </button>
            ))}
          </div>
        </div>

        {grid(gridA, pick(locale, L.matrixA), (i, j, v) => setCell("a", i, j, v))}
        {grid(gridB, pick(locale, L.matrixB), (i, j, v) => setCell("b", i, j, v))}

        <div className="flex flex-wrap gap-2">
          {([
            [L.det, "det"],
            [L.inv, "inv"],
            [L.trans, "trans"],
            [L.mul, "mul"],
            [L.add, "add"],
          ] as const).map(([lbl, kind]) => (
            <button
              key={kind}
              type="button"
              onClick={() => op(kind)}
              className="rounded-full border hairline px-3.5 py-2 text-[13.5px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              {pick(locale, lbl)}
            </button>
          ))}
        </div>

        {err && (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {err}
          </p>
        )}

        {result && (
          <div className="space-y-2">
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.result)}</p>
            <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${result[0].length}, minmax(0, 1fr))` }}>
              {result.map((row, i) =>
                row.map((v, j) => (
                  <div key={`${i}-${j}`} className="mono rounded-lg bg-[var(--color-surface)] px-2 py-2 text-center text-[13px]">
                    {Number(v.toPrecision(12))}
                  </div>
                )),
              )}
            </div>
            <CopyButton value={resultStr} />
          </div>
        )}

        {scalar !== null && (
          <div className="space-y-2">
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{label}</p>
            <div className="mono rounded-lg bg-[var(--color-surface)] px-3 py-2 text-[15px]">{scalarStr}</div>
            <CopyButton value={scalarStr} />
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
