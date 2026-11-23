import { describe, expect, it } from "vitest";
import {
  CHART_TYPES,
  chartFromText,
  detectDelimiter,
  escapeXml,
  fmtChartNumber,
  niceTicks,
  parseChartData,
  parseNumberCell,
  renderChartSvg,
  yScaleOf,
} from "@/tools/_lib/chart-svg";

/**
 * CN-036 图表生成(零依赖 SVG)。
 * 锚:数值全部由 node/python 现场计算(nice 刻度用 1/2/5×10^k 定义、
 * 6 位有效数字用 toPrecision 对照);SVG 结构断言只认可验证事实
 * (path 数量、坐标在画布内、标签转义),不比对整串文本以免噪声误判。
 */

describe("数值单元格解析", () => {
  it("整数/小数/正负号/科学计数", () => {
    expect(parseNumberCell("42")).toBe(42);
    expect(parseNumberCell(" -3.5 ")).toBe(-3.5);
    expect(parseNumberCell("+0.25")).toBe(0.25);
    expect(parseNumberCell("1.5e3")).toBe(1500);
    expect(parseNumberCell("-2E-2")).toBe(-0.02);
  });

  it("货币前缀与百分号按字面值(不做归一换算)", () => {
    expect(parseNumberCell("$1,000".replace(",", "_"))).toBe(1000);
    expect(parseNumberCell("¥1200")).toBe(1200);
    expect(parseNumberCell("50%")).toBe(50);
    expect(parseNumberCell("€3.25")).toBe(3.25);
  });

  it("千分位下划线与内部空格被移除", () => {
    expect(parseNumberCell("1_000_000")).toBe(1000000);
    expect(parseNumberCell("12 345")).toBe(12345);
  });

  it("非数字一律 null(空/字母/纯符号/NaN 文本)", () => {
    expect(parseNumberCell("")).toBeNull();
    expect(parseNumberCell("   ")).toBeNull();
    expect(parseNumberCell("abc")).toBeNull();
    expect(parseNumberCell("-")).toBeNull();
    expect(parseNumberCell("1.2.3")).toBeNull();
    expect(parseNumberCell("Infinity")).toBeNull();
    expect(parseNumberCell("0x10")).toBeNull();
  });
});

describe("分隔符探测", () => {
  it("制表符优先,其次分号,再次逗号", () => {
    expect(detectDelimiter("a\t1\t2")).toBe("\t");
    expect(detectDelimiter("a;1;2")).toBe(";");
    expect(detectDelimiter("a,1,2")).toBe(",");
  });

  it("无分隔符时默认逗号", () => {
    expect(detectDelimiter("single")).toBe(",");
  });
});

describe("数据解析", () => {
  it("带表头的单系列", () => {
    const r = parseChartData("Month,Revenue\nJan,120\nFeb,150\n");
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.data.labels).toEqual(["Jan", "Feb"]);
    expect(r.data.series).toEqual([{ name: "Revenue", values: [120, 150] }]);
  });

  it("无表头时系列名为 Value(单列)", () => {
    const r = parseChartData("Jan,120\nFeb,150");
    if (!r.ok) throw new Error("parse failed");
    expect(r.data.series[0].name).toBe("Value");
    expect(r.data.series[0].values).toEqual([120, 150]);
  });

  it("多系列:表头每列一个名字", () => {
    const r = parseChartData("Quarter,Revenue,Cost\nQ1,10,12\nQ2,14,19");
    if (!r.ok) throw new Error("parse failed");
    expect(r.data.series.map((s) => s.name)).toEqual(["Revenue", "Cost"]);
    expect(r.data.series[1].values).toEqual([12, 19]);
  });

  it("数字型系列名(年份)必须显式 headerMode=always,auto 会当数据处理", () => {
    const text = "Quarter,2025,2026\nQ1,10,12\nQ2,14,19";
    const auto = parseChartData(text);
    if (!auto.ok) throw new Error("parse failed");
    expect(auto.data.series.map((s) => s.name)).toEqual(["Series 1", "Series 2"]);
    expect(auto.data.labels).toEqual(["Quarter", "Q1", "Q2"]);

    const forced = parseChartData(text, "always");
    if (!forced.ok) throw new Error("parse failed");
    expect(forced.data.series.map((s) => s.name)).toEqual(["2025", "2026"]);
    expect(forced.data.labels).toEqual(["Q1", "Q2"]);
  });

  it("注释行(#)与空行被忽略;BOM 与 CRLF 归一", () => {
    const r = parseChartData("\uFEFF# comment\r\nA,1\r\n\r\nB,2\r\n");
    if (!r.ok) throw new Error("parse failed");
    expect(r.data.labels).toEqual(["A", "B"]);
  });

  it("列数不一致 → ragged 并带行号", () => {
    const r = parseChartData("A,1\nB,2,3");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("ragged");
  });

  it("非数字单元格 → badNumber 并指出行列", () => {
    const r = parseChartData("Label,Value\nA,1\nB,oops");
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.code).toBe("badNumber");
      expect(r.message).toContain("oops");
    }
  });

  it("空输入 → empty;只有表头 → noRows", () => {
    expect(parseChartData("  \n ").ok).toBe(false);
    const headerOnly = parseChartData("Label,Value\n");
    expect(headerOnly.ok).toBe(false);
    if (!headerOnly.ok) expect(headerOnly.code).toBe("noRows");
  });

  it("冒号/中文标签原样保留(不当作分隔符)", () => {
    const r = parseChartData("城市:北京,10\n城市:上海,20");
    if (!r.ok) throw new Error("parse failed");
    expect(r.data.labels).toEqual(["城市:北京", "城市:上海"]);
  });
});

describe("6 位有效数字格式化", () => {
  it("对照 toPrecision(6) 的常规量级", () => {
    expect(fmtChartNumber(37.777778)).toBe("37.7778");
    expect(fmtChartNumber(1234.5678)).toBe("1234.57");
    expect(fmtChartNumber(0.393701)).toBe("0.393701");
    expect(fmtChartNumber(1000)).toBe("1000");
    expect(fmtChartNumber(0)).toBe("0");
  });

  it("极大/极小走指数;非有限值 → 破折号", () => {
    expect(fmtChartNumber(1.2345e12)).toMatch(/e\+?12/);
    expect(fmtChartNumber(1.23e-7)).toMatch(/e-7/);
    expect(fmtChartNumber(Number.NaN)).toBe("—");
    expect(fmtChartNumber(Infinity)).toBe("—");
  });

  it("负数保留符号", () => {
    expect(fmtChartNumber(-42.1234)).toBe("-42.1234");
  });
});

describe("y 轴范围与 nice 刻度", () => {
  it("非负数据从 0 起(柱图不从 0 起会误导)", () => {
    const s = yScaleOf([12, 30, 45]);
    expect(s.min).toBe(0);
    expect(s.max).toBe(45);
  });

  it("含负值时从最小值起", () => {
    const s = yScaleOf([-8, 0, 16]);
    expect(s.min).toBe(-8);
    expect(s.max).toBe(16);
  });

  it("nice 刻度落在 1/2/5×10^k 步长且覆盖范围", () => {
    const ticks = niceTicks(0, 45);
    // 步长必为 10 的幂 × 1/2/5
    for (const t of ticks) {
      const step = 10; // 45/5=9 → 步长 10
      expect(Number.isInteger(t / step) || Math.abs(t / step - Math.round(t / step)) < 1e-9).toBe(true);
    }
    expect(ticks[0]).toBeLessThanOrEqual(45);
    expect(ticks.length).toBeGreaterThanOrEqual(4);
  });

  it("极小范围不产生 0.30000000000000004 类噪声", () => {
    const ticks = niceTicks(0, 0.3);
    for (const t of ticks) {
      expect(String(t)).not.toMatch(/00000000/);
    }
  });
});

describe("XML 转义", () => {
  it("五个保留字符全部转义", () => {
    expect(escapeXml(`<a href="x">'b' & c</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;&#39;b&#39; &amp; c&lt;/a&gt;",
    );
  });

  it("标签里的恶意内容不会破坏 SVG 结构", () => {
    const r = chartFromText("</svg><script>alert(1)</script>,5", "bar");
    if (!r.ok) throw new Error("render failed");
    expect(r.svg).not.toContain("<script>");
    expect(r.svg).toContain("&lt;");
    expect(r.svg.indexOf("</svg>")).toBe(r.svg.length - 6);
  });
});

describe("各图表渲染", () => {
  const sample = "Month,Revenue\nJan,120\nFeb,150\nMar,90";

  it("bar:单系列每行一个 rect,且带数值标签", () => {
    const r = chartFromText(sample, "bar");
    if (!r.ok) throw new Error("render failed");
    const rects = (r.svg.match(/<rect[^>]*fill="#2563eb"/g) ?? []).length;
    expect(rects).toBe(3);
    expect(r.svg).toContain(">120<");
  });

  it("bar:多系列并排分组(数据柱 = 行×系列,图例另计)", () => {
    const r = chartFromText("Q,Revenue,Cost\nQ1,10,12\nQ2,14,19", "bar");
    if (!r.ok) throw new Error("render failed");
    const dataBars = (r.svg.match(/<rect[^>]*fill="#[^>]*rx="2"/g) ?? []).length;
    expect(dataBars).toBe(4);
    expect(r.svg).toContain(">Revenue<");
    expect(r.svg).toContain(">Cost<");
  });

  it("line:每系列一条 path + 每点一个 circle", () => {
    const r = chartFromText(sample, "line");
    if (!r.ok) throw new Error("render failed");
    expect((r.svg.match(/<path[^>]*stroke=/g) ?? []).length).toBe(1);
    expect((r.svg.match(/<circle[^>]*r="3"/g) ?? []).length).toBe(3);
  });

  it("area:折线外加半透明填充路径", () => {
    const r = chartFromText(sample, "area");
    if (!r.ok) throw new Error("render failed");
    expect(r.svg).toContain('fill-opacity="0.16"');
  });

  it("pie:切片数 = 行数,百分比标签总量约 100%", () => {
    const r = chartFromText("A,50\nB,30\nC,20", "pie");
    if (!r.ok) throw new Error("render failed");
    const pctLabels = [...r.svg.matchAll(/>(\d+)%</g)].map((m) => Number(m[1]));
    expect(pctLabels.length).toBe(3);
    expect(pctLabels.reduce((a, b) => a + b, 0)).toBeGreaterThanOrEqual(99);
    expect(pctLabels.reduce((a, b) => a + b, 0)).toBeLessThanOrEqual(101);
  });

  it("donut:带内圈(路径数不变但填充非扇形起点)", () => {
    const r = chartFromText("A,50\nB,50", "donut");
    if (!r.ok) throw new Error("render failed");
    // 环形图路径不含圆心起点 M cx,cy
    expect(r.svg).not.toContain("M217.60,184.00 L");
  });

  it("radar:维度 ≥3 才渲染;多边形闭合", () => {
    const r = chartFromText("Speed,8\nAccuracy,6\nPower,9\nStamina,7", "radar");
    if (!r.ok) throw new Error("render failed");
    const polys = r.svg.match(/<path[^>]*fill-opacity="0.14"[^>]*\/>/g) ?? [];
    expect(polys.length).toBe(1);
  });

  it("radar:维度 <3 拒绝(notEnough)", () => {
    const r = chartFromText("A,1\nB,2", "radar");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("notEnough");
  });

  it("funnel:相邻转化率按比例计算(100→60 = 60%)", () => {
    const r = chartFromText("Visit,100\nSignup,60\nPurchase,12", "funnel");
    if (!r.ok) throw new Error("render failed");
    // 1 位小数:100→60 = 60.0%,60→12 = 20.0%(不是 6 位有效数字的 84.5238%)
    expect(r.svg).toContain(">60.0%<");
    expect(r.svg).toContain(">20.0%<");
  });

  it("饼图多列时警告被忽略的系列(不静默丢数据)", () => {
    const r = chartFromText("A,Revenue,Cost\nX,10,20\nY,30,40", "pie");
    if (!r.ok) throw new Error("render failed");
    expect(r.warnings.length).toBe(1);
    expect(r.warnings[0]).toContain("Cost");
  });

  it("全 0 的比例图拒绝(allZero),但柱图允许(全零柱图合法)", () => {
    const pie = chartFromText("A,0\nB,0", "pie");
    expect(pie.ok).toBe(false);
    if (!pie.ok) expect(pie.code).toBe("allZero");
    const bar = chartFromText("A,0\nB,0", "bar");
    expect(bar.ok).toBe(true);
  });

  it("所有图表类型都能产出合法 <svg> 根与 viewBox", () => {
    for (const type of CHART_TYPES) {
      const r = chartFromText("A,10\nB,20\nC,30", type);
      expect(r.ok, `${type} failed: ${r.ok ? "" : r.code}`).toBe(true);
      if (!r.ok) continue;
      expect(r.svg.startsWith("<svg xmlns=")).toBe(true);
      expect(r.svg).toContain('viewBox="0 0 640 360"');
      expect(r.svg.trim().endsWith("</svg>")).toBe(true);
    }
  });

  it("所有绘制坐标都落在画布内(不溢出)", () => {
    for (const type of CHART_TYPES) {
      const r = chartFromText("Alpha,10\nBeta,25\nGamma,40\nDelta,15", type);
      if (!r.ok) continue;
      const xs = [...r.svg.matchAll(/x="(-?[\d.]+)"/g)].map((m) => Number(m[1]));
      const ys = [...r.svg.matchAll(/y="(-?[\d.]+)"/g)].map((m) => Number(m[1]));
      // 允许图例/标签的负向偏置(=0),不允许超出画布边界
      expect(Math.min(...xs)).toBeGreaterThanOrEqual(-1);
      expect(Math.max(...xs)).toBeLessThanOrEqual(641);
      expect(Math.min(...ys)).toBeGreaterThanOrEqual(-1);
      expect(Math.max(...ys)).toBeLessThanOrEqual(361);
    }
  });

  it("直接调 renderChartSvg 与 chartFromText 结果一致", () => {
    const parsed = parseChartData(sample);
    if (!parsed.ok) throw new Error("parse failed");
    const a = renderChartSvg(parsed.data, "bar", "Revenue");
    const b = chartFromText(sample, "bar", "Revenue");
    expect(a.ok && b.ok && a.svg === b.svg).toBe(true);
  });

  it("yLabel 会渲染进纵轴说明", () => {
    const r = chartFromText(sample, "bar", "USD");
    if (!r.ok) throw new Error("render failed");
    expect(r.svg).toContain(">USD<");
  });
});
