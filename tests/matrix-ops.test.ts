import { describe, expect, it } from "vitest";
import { add, determinant, inverse, multiply, parseMatrix, transpose } from "@/tools/_lib/matrix-ops";

/**
 * CN-029 矩阵运算。锚 = numpy(双精度,2026-11-22 生成):
 * A=[[2,1,3],[0,4,5],[1,2,6]] det=21 inv 见各断言;B=[[1,0,2],[3,1,0],[0,2,1]];D4 det=4。
 * 数值断言容差 1e-9(浮点);整数结果用精确匹配。
 */

const A3 = [
  [2, 1, 3],
  [0, 4, 5],
  [1, 2, 6],
];
const B3 = [
  [1, 0, 2],
  [3, 1, 0],
  [0, 2, 1],
];
const close = (a: number, b: number, tol = 1e-9) => Math.abs(a - b) < tol;
const closeM = (a: number[][], b: number[][]) =>
  a.length === b.length && a.every((row, i) => row.every((v, j) => close(v, b[i][j])));

describe("行列式(numpy 锚)", () => {
  it("det2([[4,7],[2,6]]) = 10", () => {
    expect(determinant([
      [4, 7],
      [2, 6],
    ])).toBe(10);
  });
  it("det3(A) = 21", () => {
    expect(determinant(A3)).toBe(21);
  });
  it("det4(4×4 含负元素) = 4", () => {
    expect(
      determinant([
        [3, 0, 2, -1],
        [1, 2, 0, 4],
        [5, 1, 3, 0],
        [0, 1, 1, 2],
      ]),
    ).toBe(4);
  });
  it("奇异矩阵 det = 0([[1,2,3],[4,5,6],[7,8,9]])", () => {
    expect(determinant([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])).toBe(0);
  });
});

describe("逆矩阵(numpy 锚,高斯-若尔当)", () => {
  it("inv(A) 与 numpy 一致(容差 1e-9)", () => {
    const r = inverse(A3);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const np = [
      [0.6666666666666666, 0, -0.3333333333333333],
      [0.23809523809523808, 0.42857142857142855, -0.47619047619047616],
      [-0.19047619047619047, -0.14285714285714285, 0.38095238095238093],
    ];
    expect(closeM(r.matrix, np)).toBe(true);
  });

  it("inv(A) × A = I(自洽往返)", () => {
    const r = inverse(A3);
    if (!r.ok) throw new Error("inv failed");
    const prod = multiply(r.matrix, A3);
    if (!prod.ok) throw new Error("mul failed");
    const I = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    expect(closeM(prod.matrix, I)).toBe(true);
  });

  it("inv2([[4,7],[2,6]]) 与 numpy 一致", () => {
    const r = inverse([
      [4, 7],
      [2, 6],
    ]);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(closeM(r.matrix, [[0.6, -0.7], [-0.2, 0.4]])).toBe(true);
  });

  it("奇异矩阵 → singular(明确拒绝)", () => {
    const r = inverse([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("singular");
  });
});

describe("乘法/加法/转置(numpy 锚)", () => {
  it("A×B = [[5,7,7],[12,14,5],[7,14,8]]", () => {
    const r = multiply(A3, B3);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.matrix).toEqual([
      [5, 7, 7],
      [12, 14, 5],
      [7, 14, 8],
    ]);
  });

  it("A+B = [[3,1,5],[3,5,5],[1,4,7]]", () => {
    const r = add(A3, B3);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.matrix).toEqual([
      [3, 1, 5],
      [3, 5, 5],
      [1, 4, 7],
    ]);
  });

  it("A 转置 = [[2,0,1],[1,4,2],[3,5,6]]", () => {
    expect(transpose(A3)).toEqual([
      [2, 0, 1],
      [1, 4, 2],
      [3, 5, 6],
    ]);
  });
});

describe("parseMatrix 与拒绝路径", () => {
  it("字符串单元格解析(整数与小数)", () => {
    const r = parseMatrix([["1", "2.5"], ["-3", "0"]], 2);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.matrix).toEqual([
      [1, 2.5],
      [-3, 0],
    ]);
  });

  it("非数字单元格 → badCell(带定位)", () => {
    const r = parseMatrix([["1", "abc"], ["3", "4"]], 2);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("badCell");
  });

  it("尺寸非法 → badSize", () => {
    expect(parseMatrix([[1, 2, 3]], 2).ok).toBe(false);
    expect(parseMatrix([[1]], 5).ok).toBe(false);
  });
});
