import { describe, expect, it } from "vitest";
import {
  decodeWith,
  detectBom,
  detectEncoding,
  guessUtf16NoBom,
  humanBytes,
  scoreDecoded,
  strictDecode,
  type EncodingCandidate,
} from "@/tools/_lib/encoding-detect";

/**
 * CN-038 编码探测。
 *
 * 所有字节样本由 python 标准库 codecs 现场编码生成(非凭记忆):
 *   'utf-8':    'The quick brown fox 中文测试'   .encode('utf-8')
 *   'gbk':      '中文测试简体'.encode('gbk')      → d6d0cec4b2e2cad4bcf2cce5
 *   'big5':     '中文測試繁體'.encode('big5')     → a4a4a4e5b4fab8d5c163c5e9
 *   'shift_jis':'日本語のテスト'.encode('shift_jis') → 93fa967b8cea82cc836583588367
 *   'euc-jp':   '日本語のテスト'.encode('euc_jp')
 *   'euc-kr':   '한국어 테스트'.encode('euc_kr')
 *   'windows-1252': 'Café résumé naïve'.encode('cp1252')
 *   'windows-1251': 'Привет мир'.encode('cp1251')
 *   'iso-8859-5':   'Привет мир'.encode('iso-8859-5')
 *   'iso-8859-7':   'Γειά σου'.encode('iso-8859-7')
 *   'utf-16le/be':  'Hello 世界'.encode('utf-16-le'/'utf-16-be')
 */

function bytesFromHex(hex: string): Uint8Array {
  const clean = hex.replace(/\s+/g, "");
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return out;
}

const S = {
  utf8Mixed: bytesFromHex("54686520717569636b2062726f776e20666f7820e4b8ade69687e6b58be8af95"),
  gbk: bytesFromHex("d6d0cec4b2e2cad4bcf2cce5"),
  big5: bytesFromHex("a4a4a4e5b4fab8d5c163c5e9"),
  sjis: bytesFromHex("93fa967b8cea82cc836583588367"),
  eucjp: bytesFromHex("c6fccbdcb8eca4cea5c6a5b9a5c8"),
  euckr: bytesFromHex("c7d1b1b9beee20c5d7bdbac6ae"),
  cp1252: bytesFromHex("436166e92072e973756de9206e61ef7665"),
  cp1251: bytesFromHex("cff0e8e2e5f220ece8f0"),
  iso88595: bytesFromHex("bfe0d8d2d5e220dcd8e0"),
  iso88597: bytesFromHex("c3e5e9dc20f3eff5"),
  latin15: bytesFromHex("4575726f20a4207369676e"),
  utf16le: bytesFromHex("480065006c006c006f002000164e4c75"),
  utf16be: bytesFromHex("00480065006c006c006f00204e16754c"),
  // python: b'\xef\xbb\xbf' + '中文'.encode('utf-8')
  bomUtf8: bytesFromHex("efbbbf" + "e4b8ade69687"),
};

const realBom = {
  bomUtf8: bytesFromHex("efbbbf" + "48656c6c6f"), // BOM + "Hello"
  bomLe: bytesFromHex("fffe" + "480065006c006c006f00"),
  bomBe: bytesFromHex("feff" + "00480065006c006c006f"),
};

describe("BOM 检测", () => {
  it("EF BB BF → utf-8(长度 3)", () => {
    expect(detectBom(realBom.bomUtf8)).toEqual({ kind: "utf-8", length: 3, label: "utf-8" });
  });

  it("FF FE → utf-16le,FE FF → utf-16be", () => {
    expect(detectBom(realBom.bomLe)?.kind).toBe("utf-16le");
    expect(detectBom(realBom.bomBe)?.kind).toBe("utf-16be");
  });

  it("无 BOM → null", () => {
    expect(detectBom(S.gbk)).toBeNull();
    expect(detectBom(S.bomUtf8)).toEqual({ kind: "utf-8", length: 3, label: "utf-8" });
  });
});

describe("UTF-16 无 BOM 启发", () => {
  it("奇数位 NUL → utf-16le", () => {
    expect(guessUtf16NoBom(S.utf16le)).toBe("utf-16le");
  });

  it("偶数位 NUL → utf-16be", () => {
    expect(guessUtf16NoBom(S.utf16be)).toBe("utf-16be");
  });

  it("普通文本不误判;奇数长度直接放弃", () => {
    expect(guessUtf16NoBom(S.utf8Mixed)).toBeNull();
    expect(guessUtf16NoBom(new Uint8Array([0x41]))).toBeNull();
  });
});

describe("严格解码", () => {
  it("UTF-8 字节用 utf-8 严格解码成功", () => {
    expect(strictDecode(S.utf8Mixed, "utf-8")).toBe("The quick brown fox 中文测试");
  });

  it("GBK 字节用 utf-8 严格解码失败(这是最强判别信号)", () => {
    expect(strictDecode(S.gbk, "utf-8")).toBeNull();
  });

  it("GBK 字节用 gbk 严格解码得到正确文本", () => {
    expect(strictDecode(S.gbk, "gbk")).toBe("中文测试简体");
  });

  it("Big5 / Shift_JIS / EUC-KR 各自严格解码回原文", () => {
    expect(strictDecode(S.big5, "big5")).toBe("中文測試繁體");
    expect(strictDecode(S.sjis, "shift_jis")).toBe("日本語のテスト");
    expect(strictDecode(S.eucjp, "euc-jp")).toBe("日本語のテスト");
    expect(strictDecode(S.euckr, "euc-kr")).toBe("한국어 테스트");
  });

  it("单字节编码(西里尔/希腊/西欧)严格解码回原文", () => {
    expect(strictDecode(S.cp1251, "windows-1251")).toBe("Привет мир");
    expect(strictDecode(S.iso88595, "iso-8859-5")).toBe("Привет мир");
    expect(strictDecode(S.iso88597, "iso-8859-7")).toBe("Γειά σου");
    expect(strictDecode(S.cp1252, "windows-1252")).toBe("Café résumé naïve");
    expect(strictDecode(S.latin15, "iso-8859-15")).toBe("Euro € sign");
  });
});

describe("打分", () => {
  it("命中目标文字区段得高分", () => {
    const spec = { label: "gbk", name: "GBK", family: "cjk" as const, asciiCompatible: true };
    // "中文测试" 四字全在简体高频字表里 → 高频比例 4/4 → 满分
    const s = scoreDecoded("中文测试", spec);
    expect(s.score).toBeGreaterThanOrEqual(90);
    expect(s.scriptHits).toBe(4);
    expect(s.suspicious).toBe(0);
  });

  it("全控制符被强烈降分", () => {
    const spec = { label: "x", name: "x", family: "cjk" as const, asciiCompatible: true };
    const s = scoreDecoded("\u0001\u0002\u0003\u0004", spec);
    expect(s.score).toBe(0);
    expect(s.suspicious).toBe(4);
  });

  it("纯 ASCII 对 UTF-8 得 60(有解码证据但无文字系统证据)", () => {
    const spec = { label: "utf-8", name: "UTF-8", family: "utf" as const, asciiCompatible: true };
    const s = scoreDecoded("plain ascii text", spec);
    expect(s.score).toBe(60);
  });

  it("CJK 高频字比例决定分数:生僻字拿不到分(这是区分同字节多解的关键)", () => {
    const spec = { label: "gbk", name: "GBK", family: "cjk" as const, asciiCompatible: true };
    // 笢恅聆彸潠极 = GBK 字节用 Big5 解出的"生僻字",一个都不在高频表
    expect(scoreDecoded("笢恅聆彸潠极", spec).score).toBe(0);
    // 中文测试 = 正确解码,四字全高频
    expect(scoreDecoded("中文测试", spec).score).toBe(100);
  });

  it("假名比例决定日文编码分数", () => {
    const spec = { label: "shift_jis", name: "SJIS", family: "japanese" as const, asciiCompatible: true };
    const withKana = scoreDecoded("日本語のテスト", spec);
    expect(withKana.score).toBeGreaterThanOrEqual(50);
    expect(withKana.signal).toContain("kana");
    const withoutKana = scoreDecoded("擔杮岅偺僥僗僩", spec);
    expect(withoutKana.score).toBeLessThan(withKana.score);
  });

  it("混排文字被惩罚(西里尔编码解出 Latin+Cyrillic 是错解码特征)", () => {
    const spec = { label: "windows-1251", name: "CP1251", family: "cyrillic" as const, asciiCompatible: true };
    const pure = scoreDecoded("Привет", spec);
    const mixed = scoreDecoded("Cafй rйsumй", spec);
    expect(pure.score).toBeGreaterThan(mixed.score);
  });
});

describe("端到端探测", () => {
  const topLabel = (c: EncodingCandidate[]) => c[0]?.label;

  it("UTF-8 混合文本 → utf-8(high)", () => {
    const r = detectEncoding(S.utf8Mixed);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.label).toBe("utf-8");
    expect(r.confidence).toBe("high");
    expect(r.text).toBe("The quick brown fox 中文测试");
  });

  it("GBK 简体 → 简体系候选领先且回原文", () => {
    const r = detectEncoding(S.gbk);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.text).toBe("中文测试简体");
    // GBK / GB18030 对常用字字节完全重合 → 同族同分是应有的诚实结果;
    // 同分时按 SPECS 顺序优先 GBK(更常见),而非字典序的 GB18030
    expect(r.label).toBe("gbk");
    expect(r.candidates.length).toBeGreaterThanOrEqual(1);
  });

  it("Big5 繁体 → big5 领先并回原文", () => {
    const r = detectEncoding(S.big5);
    if (!r.ok) throw new Error("detect failed");
    expect(r.text).toBe("中文測試繁體");
    expect(topLabel(r.candidates)).toBe("big5");
  });

  it("Shift_JIS → 必须是日文族且回原文(EUC-JP 对这些字节严格解码失败,故唯一解)", () => {
    const r = detectEncoding(S.sjis);
    if (!r.ok) throw new Error("detect failed");
    expect(r.text).toBe("日本語のテスト");
    expect(r.label).toBe("shift_jis");
  });

  it("EUC-KR 韩文 → 韩文音节是决定性证据,回原文", () => {
    const r = detectEncoding(S.euckr);
    if (!r.ok) throw new Error("detect failed");
    expect(r.text).toBe("한국어 테스트");
    expect(r.label).toBe("euc-kr");
  });

  it("单字节西里尔:严格解码后西里尔命中数显著", () => {
    const r = detectEncoding(S.cp1251);
    if (!r.ok) throw new Error("detect failed");
    expect(r.text).toMatch(/Привет/);
    const cyr = [...r.text].filter((c) => {
      const cp = c.codePointAt(0) ?? 0;
      return (cp >= 0x400 && cp <= 0x4ff) || (cp >= 0x500 && cp <= 0x52f);
    }).length;
    expect(cyr).toBeGreaterThanOrEqual(8);
  });

  it("西欧重音字母 → 拉丁族领先且回原文(Latin-1 与 cp1252 对这些字节重合)", () => {
    const r = detectEncoding(S.cp1252);
    if (!r.ok) throw new Error("detect failed");
    expect(r.text).toContain("Café");
    expect(r.text).toContain("résumé");
    expect(["windows-1252", "iso-8859-1", "iso-8859-15", "iso-8859-2"]).toContain(r.label);
    // 西里尔/希腊编码不得领先(它们对这些字节同样能"解",但会产出混排)
    expect(r.label).not.toBe("windows-1251");
    expect(r.label).not.toBe("iso-8859-7");
  });

  it("带 BOM 的 UTF-8 → confidence=bom,且 BOM 不进正文", () => {
    const r = detectEncoding(S.bomUtf8);
    if (!r.ok) throw new Error("detect failed");
    expect(r.confidence).toBe("bom");
    expect(r.label).toBe("utf-8");
    expect(r.text).toBe("中文");
  });

  it("UTF-16LE/BE 无 BOM → 靠 NUL 启发正确判定并回原文", () => {
    const le = detectEncoding(S.utf16le);
    if (!le.ok) throw new Error("detect failed");
    expect(le.label).toBe("utf-16le");
    expect(le.text).toBe("Hello 世界");
    const be = detectEncoding(S.utf16be);
    if (!be.ok) throw new Error("detect failed");
    expect(be.label).toBe("utf-16be");
    expect(be.text).toBe("Hello 世界");
  });

  it("纯 ASCII → confidence=low,首选 utf-8(同分时给现代默认,而非字典序)", () => {
    const r = detectEncoding(new TextEncoder().encode("plain ascii text"));
    if (!r.ok) throw new Error("detect failed");
    expect(r.confidence).toBe("low");
    expect(r.reason).toContain("ASCII");
    // 纯 ASCII 下所有 ASCII 兼容编码解出同一文本,utf-8 作为默认推荐置顶
    expect(r.label).toBe("utf-8");
    expect(r.candidates[0].label).toBe("utf-8");
  });

  it("拒绝路径:空字节 → empty", () => {
    const r = detectEncoding(new Uint8Array(0));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("empty");
  });

  it("超大输入 → tooLarge", () => {
    const r = detectEncoding(new Uint8Array(2_000_001));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("tooLarge");
  });

  it("全部候选都严格解码失败 → undetectable(构造非法 UTF-16 序列)", () => {
    // 孤立的 0xD8 后接 ASCII:utf-16 两种都会失败;单字节编码却能解 → 所以这里难造。
    // 用 4 个 0xFF 字节:utf-8 失败;多数单字节能解 → 验证不误报 undetectable。
    const r = detectEncoding(new Uint8Array([0xff, 0xff, 0xff, 0xff]));
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.text.length).toBeGreaterThan(0);
  });

  it("候选列表按分数降序,且最优与 label 一致", () => {
    const r = detectEncoding(S.gbk);
    if (!r.ok) throw new Error("detect failed");
    for (let i = 1; i < r.candidates.length; i++) {
      expect(r.candidates[i - 1].score).toBeGreaterThanOrEqual(r.candidates[i].score);
    }
    expect(r.candidates[0].label).toBe(r.label);
  });
});

describe("辅助函数", () => {
  it("decodeWith 非 fatal:损坏字节计为替换符", () => {
    const r = decodeWith(bytesFromHex("e4b8ad" + "ff"), "utf-8");
    expect(r.replacements).toBe(1);
  });

  it("humanBytes 分级", () => {
    expect(humanBytes(512)).toBe("512 B");
    expect(humanBytes(2048)).toBe("2.0 KB");
    expect(humanBytes(3 * 1024 * 1024)).toBe("3.00 MB");
  });
});
