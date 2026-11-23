import { describe, expect, it } from "vitest";
import {
  assToSrt,
  convertSubtitle,
  srtToSrt,
  srtToVtt,
  vttToSrt,
  vttToVtt,
} from "@/tools/_lib/subtitle-convert";

/**
 * CN-034 字幕格式转换。测试向量来源(全部公开规范样例,非凭记忆编造):
 * - SRT:英文维基百科 SubRip 条目 https://en.wikipedia.org/wiki/SubRip
 *   的 Star Wars: Episode II – Attack of the Clones 示例(5 条 cue,逐字抄录)。
 * - WebVTT:W3C WebVTT 1 规范 https://www.w3.org/TR/webvtt1/ 的 §1.1–§1.7 示例。
 * - ASS:构造最小 Dialogue 行(标准 V4+ 十字段布局,向量来自任务定义)。
 *
 * 行为决策(与 _lib/subtitle-convert.ts 头注释一致):
 * - VTT 头不强制存在(宽容);时间戳输出恒为 HH:MM:SS.mmm 带小时形式
 *   (WebVTT 规范允许 MM:SS.mmm,但转换输出固定带小时以保证往返确定性)。
 * - SRT 序号保留原数值(不强制连续,Wikipedia 样例本身即连续 1–5);
 *   缺失/非数字(VTT 侧的 cue identifier)按出现顺序补。
 * - VTT→SRT 剥离行内标签 <v>/<i>/<c> 等;cue settings 丢弃(SRT 无对应语义)。
 * - end ≤ start 一律拒绝:WebVTT 规范 §4.1 要求 cue 结束时间「必须大于」开始时间,
 *   零时长同样拒绝,不做静默修正。
 */

// 维基百科 SubRip 条目的 Star Wars: Episode II 样例(逐字,含结尾换行)
const WIKI_SRT = `1
00:02:16,612 --> 00:02:19,376
Senator, we're making
our final approach into Coruscant.

2
00:02:19,482 --> 00:02:21,609
Very good, Lieutenant.

3
00:03:13,336 --> 00:03:15,167
We made it.

4
00:03:18,608 --> 00:03:20,371
I guess I was wrong.

5
00:03:20,476 --> 00:03:22,671
There was no danger at all.
`;

// 上样的机械变换期望:WEBVTT 头 + 逗号→点;其余逐字节不变
const WIKI_VTT = `WEBVTT

1
00:02:16.612 --> 00:02:19.376
Senator, we're making
our final approach into Coruscant.

2
00:02:19.482 --> 00:02:21.609
Very good, Lieutenant.

3
00:03:13.336 --> 00:03:15.167
We made it.

4
00:03:18.608 --> 00:03:20.371
I guess I was wrong.

5
00:03:20.476 --> 00:03:22.671
There was no danger at all.
`;

// W3C WebVTT §1.1 简单字幕文件样例(取前 2 条 cue,逐字)
const W3C_INTRO = `WEBVTT

00:11.000 --> 00:13.000
<v Roger Bingham>We are in New York City

00:13.000 --> 00:16.000
<v Roger Bingham>We're actually at the Lucern Hotel, just down the street
`;

describe("SRT → VTT", () => {
  it("维基百科 SubRip 样例 → WEBVTT 头 + 点分隔时间戳(逐字节)", () => {
    const r = srtToVtt(WIKI_SRT);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe(WIKI_VTT);
  });

  it("CRLF 输入归一后结果与 LF 相同", () => {
    const crlf = WIKI_SRT.replace(/\n/g, "\r\n");
    const r = srtToVtt(crlf);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe(WIKI_VTT);
  });

  it("无序号行的 SRT 宽容解析:VTT 不造 cue id(决策注释)", () => {
    // 决策:SRT 序号行允许缺失;不虚构序号,输出 VTT 无 id 行。
    const r = srtToVtt(`00:00:10,000 --> 00:00:12,000
Alpha

00:00:13,000 --> 00:00:15,000
Beta
`);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toBe(`WEBVTT

00:00:10.000 --> 00:00:12.000
Alpha

00:00:13.000 --> 00:00:15.000
Beta
`);
    }
  });

  it("SRT → SRT 同格式归一(CRLF→LF、序号补全)", () => {
    const r = srtToSrt(WIKI_SRT.replace(/\n/g, "\r\n"));
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toBe(WIKI_SRT);
  });
});

describe("VTT → SRT", () => {
  it("W3C §1.1 样例:voice 标签剥离、MM:SS 补小时、点→逗号", () => {
    const r = vttToSrt(W3C_INTRO);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toBe(`1
00:00:11,000 --> 00:00:13,000
We are in New York City

2
00:00:13,000 --> 00:00:16,000
We're actually at the Lucern Hotel, just down the street
`);
    }
  });

  it("STYLE 与 NOTE 块整体跳过(W3C §1.3/§1.5 块结构)", () => {
    // 块结构照抄规范:STYLE 块内不得有空行,NOTE 到首个空行结束
    const r = vttToSrt(`WEBVTT

STYLE
::cue {
  color: papayawhip;
}

NOTE This is a comment

00:00:01.000 --> 00:00:03.000
Hello
`);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toBe(`1
00:00:01,000 --> 00:00:03,000
Hello
`);
    }
  });

  it("cue settings(align/size)丢弃,SRT 时间行干净(W3C §1.1)", () => {
    const r = vttToSrt(`WEBVTT

00:30.000 --> 00:31.500 align:right size:50%
<v Roger Bingham>When we e-mailed—
`);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toBe(`1
00:00:30,000 --> 00:00:31,500
When we e-mailed—
`);
    }
  });

  it("多行 cue 文本逐行保留(W3C §1.2 公益广告样例)", () => {
    const r = vttToSrt(`WEBVTT

00:05.000 --> 00:09.000
— It will perforate your stomach.
— You could die.
`);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toBe(`1
00:00:05,000 --> 00:00:09,000
— It will perforate your stomach.
— You could die.
`);
    }
  });

  it("W3C §1.4 cue identifier 样例:数字 id 保留,非数字 id 按序补号", () => {
    // 决策:SRT 序号必须是数字;「123」原样保留,「test」与
    // 「crédit de transcription」按出现顺序占 1、3 号位。
    const r = vttToSrt(`WEBVTT

test
00:00.000 --> 00:02.000
This is a test.

123
00:00.000 --> 00:02.000
That's an, an, that's an L!

crédit de transcription
00:04.000 --> 00:05.000
Transcrit par Célestes™
`);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toBe(`1
00:00:00,000 --> 00:00:02,000
This is a test.

123
00:00:00,000 --> 00:00:02,000
That's an, an, that's an L!

3
00:00:04,000 --> 00:00:05,000
Transcrit par Célestes™
`);
    }
  });

  it("标签剥离只吃真实标签:不等式文本「1 < 2 and 3 > 0」原样保留,卡拉OK时间戳剥离", () => {
    const r = vttToSrt(`WEBVTT

00:00:01.000 --> 00:00:03.000
1 < 2 and 3 > 0
`);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toBe(`1
00:00:01,000 --> 00:00:03,000
1 < 2 and 3 > 0
`);
    }
    const karaoke = vttToSrt(`WEBVTT

00:00:01.000 --> 00:00:03.000
<00:00:01.000>A<00:00:02.000>B
`);
    expect(karaoke.ok).toBe(true);
    if (karaoke.ok) {
      expect(karaoke.data).toContain("AB");
    }
  });

  it("WEBVTT 头缺失仍宽容解析(决策 #2)", () => {
    const r = vttToSrt(`00:11.000 --> 00:13.000
<v Roger Bingham>We are in New York City
`);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toBe(`1
00:00:11,000 --> 00:00:13,000
We are in New York City
`);
    }
  });

  it("VTT → VTT 同格式归一:时间戳带小时、MM:SS 补齐(无 id 的 cue 保持无 id)", () => {
    const r = vttToVtt(W3C_INTRO);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toBe(`WEBVTT

00:00:11.000 --> 00:00:13.000
<v Roger Bingham>We are in New York City

00:00:13.000 --> 00:00:16.000
<v Roger Bingham>We're actually at the Lucern Hotel, just down the street
`);
    }
  });
});

describe("往返(逐字节等价)", () => {
  it("SRT → VTT → SRT 与维基百科样例逐字节等价", () => {
    const vtt = srtToVtt(WIKI_SRT);
    expect(vtt.ok).toBe(true);
    if (!vtt.ok) throw new Error("srtToVtt failed");
    const back = vttToSrt(vtt.data);
    expect(back.ok).toBe(true);
    if (!back.ok) throw new Error("vttToSrt failed");
    expect(back.data).toBe(WIKI_SRT);
  });

  it("VTT → SRT → VTT 与规范风格样例逐字节等价", () => {
    // 样例构造来源:cue id 用数字(W3C §1.7 metadata 样例即用 1/2/3 做 id)、
    // 时间戳带小时(W3C §1.6 chapters 样例即 00:00:00.000 形式)、
    // 文本取 §1.2 公益广告样例。三个要素均出自规范示例。
    const vtt = `WEBVTT

1
00:00:01.000 --> 00:00:04.000
Never drink liquid nitrogen.

2
00:00:05.000 --> 00:00:09.000
— It will perforate your stomach.
— You could die.
`;
    const srt = vttToSrt(vtt);
    expect(srt.ok).toBe(true);
    if (!srt.ok) throw new Error("vttToSrt failed");
    const back = srtToVtt(srt.data);
    expect(back.ok).toBe(true);
    if (!back.ok) throw new Error("srtToVtt failed");
    expect(back.data).toBe(vtt);
  });
});

describe("ASS/SSA → SRT", () => {
  it("最小 Dialogue 行:剥离 {\\b1}/{\\b0} 覆盖标签(任务定义向量)", () => {
    const r = assToSrt(`[Script Info]
Title: Test

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:01.00,0:00:03.00,Default,,0,0,0,,{\\b1}Hello{\\b0} world
`);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toBe(`1
00:00:01,000 --> 00:00:03,000
Hello world
`);
    }
  });

  it("\\N 换行、\\h 转空格、全角字符(，、)原样保留", () => {
    const r = assToSrt(`[Events]
Dialogue: 0,0:00:05.00,0:00:07.50,Default,,0,0,0,,こんにちは、世界\\N第二行\\hテスト
`);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toBe(`1
00:00:05,000 --> 00:00:07,500
こんにちは、世界
第二行 テスト
`);
    }
  });

  it("文本含半角逗号安全:第 10 字段(第 9 逗号之后)整体是文本", () => {
    const r = assToSrt(`[Events]
Dialogue: 0,0:00:10.00,0:00:12.00,Default,,0,0,0,,Hello, world, again
`);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toBe(`1
00:00:10,000 --> 00:00:12,000
Hello, world, again
`);
    }
  });

  it("Comment: 行跳过;SSA(Marked)格式行按字段序解析", () => {
    const r = assToSrt(`[Events]
Format: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Comment: 0,0:00:00.00,0:00:59.00,Default,,0,0,0,,not a subtitle
Dialogue: Marked=0,0:00:01.00,0:00:02.00,Default,,0,0,0,,SSA line
`);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toBe(`1
00:00:01,000 --> 00:00:02,000
SSA line
`);
    }
  });

  it("ASS 厘秒 → SRT 毫秒:1:23:45.67 → 01:23:45,670", () => {
    // 手算:1h×3600000 + 23m×60000 + 45s×1000 + 67cs×10 = 5025670ms
    const r = assToSrt(`[Events]
Dialogue: 0,1:23:45.67,1:23:46.68,Default,,0,0,0,,Late
`);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toBe(`1
01:23:45,670 --> 01:23:46,680
Late
`);
    }
  });

  it("无 Dialogue 行 → noCues 拒绝", () => {
    const r = assToSrt(`[Script Info]
Title: Empty

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("noCues");
  });
});

describe("拒绝路径(4 类)", () => {
  it("空输入 → empty(三个函数一致)", () => {
    expect(srtToVtt("").ok).toBe(false);
    expect(vttToSrt("   \n ").ok).toBe(false);
    expect(assToSrt("").ok).toBe(false);
    for (const r of [srtToVtt(""), vttToSrt("  "), assToSrt(" ")] as const) {
      if (!r.ok) expect(r.code).toBe("empty");
    }
  });

  it("疑似编码异常(含 U+0000,如 UTF-16 粘贴)→ encoding", () => {
    const garbage = "W\u0000E\u0000B\u0000V\u0000T\u0000T\u0000";
    for (const r of [srtToVtt(garbage), vttToSrt(garbage), assToSrt(garbage)] as const) {
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.code).toBe("encoding");
    }
  });

  it("无有效 cue → noCues", () => {
    for (const r of [srtToVtt("hello world"), vttToSrt("WEBVTT\n\nNOTE only a comment\n")] as const) {
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.code).toBe("noCues");
    }
  });

  it("时间戳格式错 → badTimestamp(缺毫秒 / 分钟越界)", () => {
    const missingMs = srtToVtt(`1
00:02:16,612 --> 00:02:19
Broken
`);
    expect(missingMs.ok).toBe(false);
    if (!missingMs.ok) expect(missingMs.code).toBe("badTimestamp");

    // 分钟 >59:WebVTT 规范与 SRT 惯例都约束分钟 ≤59
    const overMinutes = vttToSrt(`WEBVTT

00:61.000 --> 00:63.000
X
`);
    expect(overMinutes.ok).toBe(false);
    if (!overMinutes.ok) expect(overMinutes.code).toBe("badTimestamp");
  });

  it("起止倒置/零时长 → inverted(end 必须严格大于 start)", () => {
    const backwards = srtToVtt(`1
00:00:05,000 --> 00:00:03,000
Backwards
`);
    expect(backwards.ok).toBe(false);
    if (!backwards.ok) expect(backwards.code).toBe("inverted");

    const zeroLength = vttToSrt(`WEBVTT

00:00:01.000 --> 00:00:01.000
Zero
`);
    expect(zeroLength.ok).toBe(false);
    if (!zeroLength.ok) expect(zeroLength.code).toBe("inverted");
  });
});

describe("convertSubtitle 引擎分发", () => {
  const srt = WIKI_SRT;
  const vtt = `WEBVTT

1
00:00:01.000 --> 00:00:04.000
Never drink liquid nitrogen.
`;

  it("矩阵:srt→vtt、srt→srt、vtt→srt、vtt→vtt 与直调一致", () => {
    const a = convertSubtitle(srt, "srt", "vtt");
    const b = srtToVtt(srt);
    expect(a).toEqual(b);

    const c = convertSubtitle(vtt, "vtt", "srt");
    const d = vttToSrt(vtt);
    expect(c).toEqual(d);

    expect(convertSubtitle(srt, "srt", "srt")).toEqual(srtToSrt(srt));
    expect(convertSubtitle(vtt, "vtt", "vtt")).toEqual(vttToVtt(vtt));
  });

  it("ASS 源恒走 ASS→SRT(单向能力,与工具文案一致)", () => {
    const ass = `[Events]
Dialogue: 0,0:00:01.00,0:00:03.00,Default,,0,0,0,,Hi
`;
    const direct = assToSrt(ass);
    expect(convertSubtitle(ass, "ass", "srt")).toEqual(direct);
    expect(convertSubtitle(ass, "ass", "vtt")).toEqual(direct);
    expect(direct.ok).toBe(true);
  });
});
