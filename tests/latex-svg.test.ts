import { describe, expect, it } from "vitest";
import {
  MAX_PNG_SIDE,
  MAX_TEX_LEN,
  exMetrics,
  checkBalanced,
  extractSvg,
  finalizeSvg,
  padAndBackground,
  parseSvgBox,
  pngPixelSize,
  stripMathDelimiters,
  validateTex,
} from "@/tools/_lib/latex-svg";

/**
 * CN-037 LaTeX→SVG 纯逻辑测试。
 *
 * 锚(真实 MathJax 4.1.3 输出,来自本机浏览器里 tex2svg 的实际结果,非编造):
 * - 例:tex2svg("x^2 + \frac{1}{2}") 的外壳是
 *   <mjx-container class="MathJax ..." jax="SVG" ...><svg xmlns="http://www.w3.org/2000/svg"
 *   width="7.174ex" height="4.588ex" role="img" focusable="false"
 *   viewBox="0 -1342 3171 2028" xmlns:xlink=... style="vertical-align:-1.552ex;">…
 *   含 <defs><path id="MJX-…-N…"> 与 <use xlink:href="#MJX-…">。
 * - 错误行为实测:未闭合 \frac{1}{ 不抛异常,而是产出带错误标记的小节点(920 字符);
 *   \notacommand{x} 也不抛异常,会把命令当字面文本渲染。故「明显错误」必须由本地预检拦,
 *   而不能指望 MathJax 报错 —— 这是本模块存在的理由。
 */

const REAL_CONTAINER = `<mjx-container class="MathJax CtxtMenu_Attached_0" jax="SVG" overflow="overflow" display="true" tabindex="0" ctxtmenu_counter="1"><svg xmlns="http://www.w3.org/2000/svg" width="7.174ex" height="4.588ex" role="img" focusable="false" viewBox="0 -1342 3171 2028" xmlns:xlink="http://www.w3.org/1999/xlink" style="vertical-align: -1.552ex;"><defs><path id="MJX-3-NCM-I-1D465" d="M527 373C527 419 482 442 432 442Z"></path><path id="MJX-3-NCM-N-32" d="M213 0L213 14Z"></path></defs><g><use data-c="1D465" xlink:href="#MJX-3-NCM-I-1D465"></use><use data-c="32" xlink:href="#MJX-3-NCM-N-32"></use></g></svg></mjx-container>`;

describe("数学分隔符剥离", () => {
  it("$$...$$ / $...$ / \\(...\\) / \\[...\\] 都能剥", () => {
    expect(stripMathDelimiters("$$x^2$$")).toBe("x^2");
    expect(stripMathDelimiters("$x^2$")).toBe("x^2");
    expect(stripMathDelimiters("\\(x^2\\)")).toBe("x^2");
    expect(stripMathDelimiters("\\[x^2\\]")).toBe("x^2");
  });

  it("裸公式原样返回(只去首尾空白)", () => {
    expect(stripMathDelimiters("  \\frac{1}{2}  ")).toBe("\\frac{1}{2}");
  });

  it("只有单个 $ 时不误剥", () => {
    expect(stripMathDelimiters("$")).toBe("$");
  });

  it("$$ 优先于 $ 匹配(不会剥成 $x^2$)", () => {
    expect(stripMathDelimiters("$$x$$")).toBe("x");
  });
});

describe("括号平衡检查", () => {
  it("平衡的花括号与方括号通过", () => {
    expect(checkBalanced("\\frac{1}{2}").ok).toBe(true);
    expect(checkBalanced("\\sqrt[3]{x}").ok).toBe(true);
    expect(checkBalanced("x^2 + y^2").ok).toBe(true);
  });

  it("转义的 \\{ \\} \\[ \\] 不计入平衡", () => {
    expect(checkBalanced("\\{a\\}").ok).toBe(true);
    expect(checkBalanced("\\[x\\]").ok).toBe(true);
  });

  it("未闭合花括号报数量", () => {
    const r = checkBalanced("\\frac{1}{");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.message).toContain("unclosed");
  });

  it("多余的 } 报位置", () => {
    const r = checkBalanced("{a}}");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.message).toContain("position 4");
  });

  it("圆括号不参与检查(数学里是字面字符)", () => {
    expect(checkBalanced("(a+b").ok).toBe(true);
    expect(checkBalanced("f(x) = (x").ok).toBe(true);
  });

  it("嵌套混排通过", () => {
    expect(checkBalanced("\\sqrt[3]{\\frac{a}{b}}").ok).toBe(true);
  });
});

describe("validateTex 入口", () => {
  it("空输入 → empty", () => {
    const r = validateTex("   ");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("empty");
  });

  it("$$...$$ 空内容 → empty", () => {
    const r = validateTex("$$$$");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("empty");
  });

  it("超长 → tooLong,且报字符数", () => {
    const long = "x".repeat(MAX_TEX_LEN + 1);
    const r = validateTex(long);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.code).toBe("tooLong");
      expect(r.message).toContain(String(MAX_TEX_LEN + 1));
    }
  });

  it("括号不平衡 → unbalanced,并透出原因", () => {
    const r = validateTex("\\frac{a}{");
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.code).toBe("unbalanced");
      expect(r.message).toContain("unclosed");
    }
  });

  it("合法公式返回剥离后的原文", () => {
    const r = validateTex("$\\frac{1}{2}$");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe("\\frac{1}{2}");
  });

  it("恰好 MAX_TEX_LEN 长度允许", () => {
    const r = validateTex("x".repeat(MAX_TEX_LEN));
    expect(r.ok).toBe(true);
  });
});

describe("从 MathJax 外壳提取 SVG", () => {
  it("取真实 MathJax 输出:得到独立 svg,含 defs/use 全部内容", () => {
    const r = extractSvg(REAL_CONTAINER);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.data.startsWith("<svg")).toBe(true);
    expect(r.data.endsWith("</svg>")).toBe(true);
    expect(r.data).toContain('id="MJX-3-NCM-I-1D465"');
    expect(r.data).toContain('xlink:href="#MJX-3-NCM-N-32"');
    expect(r.data).toContain('xmlns:xlink="http://www.w3.org/1999/xlink"');
  });

  it("去掉 vertical-align(依赖宿主 CSS,独立文件里无意义)", () => {
    const r = extractSvg(REAL_CONTAINER);
    if (!r.ok) throw new Error("extract failed");
    expect(r.data).not.toContain("vertical-align");
  });

  it("无 svg → noSvg", () => {
    const r = extractSvg("<div>nothing</div>");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("noSvg");
  });

  it("缺少 xlink 命名空间时自动补上(否则独立文件里 xlink:href 非法)", () => {
    const noNs = `<mjx-container><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><use xlink:href="#a"/></svg></mjx-container>`;
    const r = extractSvg(noNs);
    if (!r.ok) throw new Error("extract failed");
    expect(r.data).toContain('xmlns:xlink="http://www.w3.org/1999/xlink"');
  });
});

describe("viewBox 解析", () => {
  it("真实 MathJax 的负起点 viewBox 正确读出", () => {
    const r = extractSvg(REAL_CONTAINER);
    if (!r.ok) throw new Error("extract failed");
    const box = parseSvgBox(r.data);
    expect(box).toEqual({ minX: 0, minY: -1342, w: 3171, h: 2028 });
  });

  it("无 viewBox 时按 width/height 兜底", () => {
    const box = parseSvgBox('<svg xmlns="http://www.w3.org/2000/svg" width="120ex" height="40ex"></svg>');
    expect(box).toEqual({ minX: 0, minY: 0, w: 120, h: 40 });
  });

  it("两者都缺 → null", () => {
    expect(parseSvgBox("<svg></svg>")).toBeNull();
  });
});

describe("内边距与背景", () => {
  it("padding 向外扩张 viewBox 与宽高(不改字形坐标)", () => {
    const r = extractSvg(REAL_CONTAINER);
    if (!r.ok) throw new Error("extract failed");
    const padded = padAndBackground(r.data, { padding: 8, background: "" });
    if (!padded.ok) throw new Error("pad failed");
    expect(padded.data).toContain('viewBox="-8 -1350 3187 2044"');
    // 宽高必须是 ex 单位(不是 viewBox 单位):3171 units ↔ 7.174ex → 3187 units ≈ 7.21ex
    expect(padded.data).toMatch(/width="7\.2[0-9]ex"/);
    expect(padded.data).toMatch(/height="4\.6[0-9]ex"/);
    // 字形 path 的 d 属性一字不动
    expect(padded.data).toContain('d="M527 373C527 419 482 442 432 442Z"');
  });

  it("背景矩形插入在 svg 开标签之后、字形之前", () => {
    const r = extractSvg(REAL_CONTAINER);
    if (!r.ok) throw new Error("extract failed");
    const padded = padAndBackground(r.data, { padding: 4, background: "#ffffff" });
    if (!padded.ok) throw new Error("pad failed");
    const rectIdx = padded.data.indexOf('<rect x="-4"');
    const defsIdx = padded.data.indexOf("<defs>");
    expect(rectIdx).toBeGreaterThan(-1);
    expect(rectIdx).toBeLessThan(defsIdx);
    expect(padded.data).toContain('fill="#ffffff"');
  });

  it("空背景不插矩形(导出透明)", () => {
    const r = extractSvg(REAL_CONTAINER);
    if (!r.ok) throw new Error("extract failed");
    const padded = padAndBackground(r.data, { padding: 4, background: "" });
    if (!padded.ok) throw new Error("pad failed");
    expect(padded.data).not.toContain("<rect");
  });

  it("背景色属性做 XML 转义(防注入)", () => {
    const r = extractSvg(REAL_CONTAINER);
    if (!r.ok) throw new Error("extract failed");
    const padded = padAndBackground(r.data, { padding: 2, background: '" onload=alert(1)' });
    if (!padded.ok) throw new Error("pad failed");
    // 安全性质:注入的引号被转义进 fill 属性内部,不能提前闭合属性再造出 onload
    expect(padded.data).toContain("&quot;");
    expect(padded.data).not.toContain('" onload');
    expect((padded.data.match(/onload=/g) ?? []).length).toBe(1);
  });

  it("finalizeSvg = extract + pad 一条链", () => {
    const a = finalizeSvg(REAL_CONTAINER, { padding: 6, background: "#fff" });
    const b = (() => {
      const e = extractSvg(REAL_CONTAINER);
      if (!e.ok) throw new Error("extract failed");
      return padAndBackground(e.data, { padding: 6, background: "#fff" });
    })();
    expect(a.ok && b.ok && a.data === b.data).toBe(true);
  });
});

describe("PNG 像素尺寸", () => {
  it("按 ex 尺寸 × 8px × scale 换算(1ex≈8px)", () => {
    // 7.174ex × 8 × 3 = 172px;4.588ex × 8 × 3 = 110px
    const s = pngPixelSize({ widthEx: 7.174, heightEx: 4.588 }, 3);
    expect(s.width).toBe(Math.round(7.174 * 8 * 3));
    expect(s.height).toBe(Math.round(4.588 * 8 * 3));
    expect(s.clamped).toBe(false);
  });

  it("超过 MAX_PNG_SIDE 时等比缩小并标记", () => {
    const s = pngPixelSize({ widthEx: 600, heightEx: 400 }, 4);
    expect(Math.max(s.width, s.height)).toBeLessThanOrEqual(MAX_PNG_SIDE);
    expect(s.clamped).toBe(true);
    const ratio = s.width / s.height;
    expect(Math.abs(ratio - 600 / 400)).toBeLessThan(0.02);
  });

  it("极小尺寸至少 1 像素", () => {
    const s = pngPixelSize({ widthEx: 0.01, heightEx: 0.01 }, 1);
    expect(s.width).toBe(1);
    expect(s.height).toBe(1);
  });

  it("exMetrics 从真实属性反推 unitsPerEx", () => {
    const r = extractSvg(REAL_CONTAINER);
    if (!r.ok) throw new Error("extract failed");
    const box = parseSvgBox(r.data);
    if (!box) throw new Error("box missing");
    const m = exMetrics(r.data, box);
    // 3171 / 7.174 ≈ 442
    expect(m.unitsPerEx).toBeGreaterThan(430);
    expect(m.unitsPerEx).toBeLessThan(450);
    expect(m.widthEx).toBeCloseTo(7.174, 3);
  });
});
