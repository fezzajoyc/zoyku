/**
 * CN-029:矩阵运算(纯 TS,零依赖)。
 * 支持 2×2/3×3/4×4:行列式(余子式展开/拉普拉斯)、逆矩阵(高斯-若尔当消元)、转置、乘法、加法。
 * 锚 = numpy(双精度)生成的确定性向量;奇异矩阵明确报"行列式为 0,不可逆"。
 */

export type Matrix = number[][];

export type MatrixResult =
  | { ok: true; matrix: Matrix; scalar?: number }
  | { ok: false; code: "empty" | "badSize" | "badCell" | "notSquare" | "dimMismatch" | "singular"; message?: string };

const ALLOWED_SIZES = [2, 3, 4];

/** 解析用户输入的矩阵(N×N 全部单元格,允许整数与小数)。 */
export function parseMatrix(cells: unknown[][], n: number): MatrixResult {
  if (!ALLOWED_SIZES.includes(n)) return { ok: false, code: "badSize" };
  if (!cells || cells.length !== n) return { ok: false, code: "badSize" };
  const m: Matrix = [];
  for (let i = 0; i < n; i++) {
    if (!cells[i] || cells[i].length !== n) return { ok: false, code: "badSize" };
    const row: number[] = [];
    for (let j = 0; j < n; j++) {
      const v = typeof cells[i][j] === "string" ? Number(String(cells[i][j]).trim()) : Number(cells[i][j]);
      if (!Number.isFinite(v)) return { ok: false, code: "badCell", message: `第 ${i + 1} 行第 ${j + 1} 列` };
      row.push(v);
    }
    m.push(row);
  }
  return { ok: true, matrix: m };
}

/** 行列式(拉普拉斯展开,按第一行;4×4 用递归)。输入须为方阵。 */
export function determinant(m: Matrix): number {
  const n = m.length;
  if (n === 1) return m[0][0];
  if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  let sum = 0;
  for (let j = 0; j < n; j++) {
    const minor: Matrix = [];
    for (let r = 1; r < n; r++) {
      const row: number[] = [];
      for (let c = 0; c < n; c++) if (c !== j) row.push(m[r][c]);
      minor.push(row);
    }
    sum += (j % 2 === 0 ? 1 : -1) * m[0][j] * determinant(minor);
  }
  return sum;
}

/** 逆矩阵(高斯-若尔当消元,部分主元选取)。奇异 → singular。 */
export function inverse(m: Matrix): MatrixResult {
  const n = m.length;
  const det = determinant(m);
  if (Math.abs(det) < 1e-12) return { ok: false, code: "singular" };
  // 增广 [m | I]
  const aug: number[][] = m.map((row, i) => [...row, ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))]);
  for (let col = 0; col < n; col++) {
    // 部分主元:找当前列绝对值最大的行
    let pivot = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(aug[r][col]) > Math.abs(aug[pivot][col])) pivot = r;
    if (Math.abs(aug[pivot][col]) < 1e-12) return { ok: false, code: "singular" };
    [aug[col], aug[pivot]] = [aug[pivot], aug[col]];
    const d = aug[col][col];
    for (let c = 0; c < 2 * n; c++) aug[col][c] /= d;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const factor = aug[r][col];
      if (factor === 0) continue;
      for (let c = 0; c < 2 * n; c++) aug[r][c] -= factor * aug[col][c];
    }
  }
  return { ok: true, matrix: aug.map((row) => row.slice(n)) };
}

export function transpose(m: Matrix): Matrix {
  return m.map((_, i) => m.map((row) => row[i]));
}

/** 矩阵乘法(n×n × n×n)。 */
export function multiply(a: Matrix, b: Matrix): MatrixResult {
  const n = a.length;
  if (b.length !== n || a.some((row) => row.length !== n) || b.some((row) => row.length !== n)) {
    return { ok: false, code: "dimMismatch" };
  }
  const out: Matrix = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => a[i].reduce((sum, v, k) => sum + v * b[k][j], 0)),
  );
  return { ok: true, matrix: out };
}

/** 矩阵加法。 */
export function add(a: Matrix, b: Matrix): MatrixResult {
  const n = a.length;
  if (b.length !== n || a.some((row) => row.length !== n) || b.some((row) => row.length !== n)) {
    return { ok: false, code: "dimMismatch" };
  }
  return { ok: true, matrix: a.map((row, i) => row.map((v, j) => v + b[i][j])) };
}
