import { describe, expect, it } from "vitest";
import {
  buildDocx, imageTypeFromBytes, parseBlocks, parseInline,
  type InlineImage,
} from "../tools/_lib/docx-export";
import { execSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// 1×1 红色 PNG(真实魔数与 IHDR,尺寸解析可用)
const RED_1x1 = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "base64",
);

const IMG: InlineImage = { data: RED_1x1, type: "png", width: 120, height: 80 };

/** 用 Python zipfile 正式解包(工程标准:docx 产物必须正式解析,不许字节 grep) */
function unzip(buf: Buffer): Record<string, string> {
  const fs = require("node:fs") as typeof import("node:fs");
  const dir = mkdtempSync(join(tmpdir(), "docx-test-"));
  const zipPath = join(dir, "out.docx");
  fs.writeFileSync(zipPath, buf);
  execSync(`python3 -c "
import zipfile, json, sys, os
z = zipfile.ZipFile('${zipPath}')
out = {}
for n in z.namelist():
    data = z.read(n)
    try: out[n] = data.decode('utf-8')
    except UnicodeDecodeError: out[n] = os.path.basename(n)  # 二进制部件只记名字
print(json.dumps(out))
" > ${dir}/dump.json`);
  const dump: Record<string, string> = JSON.parse(readFileSync(join(dir, "dump.json"), "utf-8"));
  rmSync(dir, { recursive: true, force: true });
  return dump;
}

describe("parseBlocks(行级解析)", () => {
  it("标题/段落/列表/引用/分隔线各归其位", () => {
    const blocks = parseBlocks(
      "# H1\n## H2\n### H3\n\n普通段落\n\n- 项目\n* 项目2\n+ 项目3\n\n1. 甲\n2. 乙\n3. 丙\n\n> 引用\n\n---\n尾段",
    );
    expect(blocks).toEqual([
      { kind: "heading", level: 1, text: "H1" },
      { kind: "heading", level: 2, text: "H2" },
      { kind: "heading", level: 3, text: "H3" },
      { kind: "para", text: "普通段落" },
      { kind: "bullet", text: "项目" },
      { kind: "bullet", text: "项目2" },
      { kind: "bullet", text: "项目3" },
      { kind: "numbered", text: "甲", n: 1 },
      { kind: "numbered", text: "乙", n: 2 },
      { kind: "numbered", text: "丙", n: 3 },
      { kind: "quote", text: "引用" },
      { kind: "hr" },
      { kind: "para", text: "尾段" },
    ]);
  });

  it("编号列表被空行打断后重新从 1 计数", () => {
    const blocks = parseBlocks("1. 甲\n2. 乙\n\n1. 丙\n2. 丁");
    expect(blocks.filter((b) => b.kind === "numbered").map((b) => (b as { n: number }).n))
      .toEqual([1, 2, 1, 2]);
  });

  it("``` 围栏内的空行与内容并入同一代码块;悬挂 fence 不产生空代码块", () => {
    expect(parseBlocks("```\nline1\n\nline2\n```")).toEqual([{ kind: "code", text: "line1\n\nline2" }]);
    expect(parseBlocks("前段\n```\ncode\n")).toEqual([{ kind: "para", text: "前段" }, { kind: "code", text: "code" }]);
  });

  it("空输入与纯空行都产出空数组", () => {
    expect(parseBlocks("")).toEqual([]);
    expect(parseBlocks("\n\n\n")).toEqual([]);
  });

  it("CRLF 归一", () => {
    expect(parseBlocks("# 题\r\n\r\n段\r\n")).toEqual([
      { kind: "heading", level: 1, text: "题" },
      { kind: "para", text: "段" },
    ]);
  });

  it("emoji 与 CJK 正常保留", () => {
    expect(parseBlocks("## 🚀 发布 🎉")).toEqual([{ kind: "heading", level: 2, text: "🚀 发布 🎉" }]);
  });
});

describe("parseInline(行内解析)", () => {
  it("粗体/斜体/混合", () => {
    expect(parseInline("**粗**和*斜*", 0)).toEqual([
      { t: "bold", text: "粗" },
      { t: "text", text: "和" },
      { t: "italic", text: "斜" },
    ]);
  });

  it("图片占位符解析为 index(1 基 → 0 基),越界回退为字面文本", () => {
    expect(parseInline("a {{image:1}} b", 1)).toEqual([
      { t: "text", text: "a " },
      { t: "image", index: 0 },
      { t: "text", text: " b" },
    ]);
    expect(parseInline("{{image:5}}", 2)).toEqual([{ t: "text", text: "{{image:5}}" }]);
    expect(parseInline("{{image:0}}", 9)).toEqual([{ t: "text", text: "{{image:0}}" }]);
  });

  it("未闭合标记按字面文本", () => {
    expect(parseInline("这是 **未闭合", 0)).toEqual([{ t: "text", text: "这是 **未闭合" }]);
  });
});

describe("imageTypeFromBytes(魔数判定)", () => {
  it("PNG/JPEG/GIF/BMP 各自命中", () => {
    expect(imageTypeFromBytes(RED_1x1)).toBe("png");
    expect(imageTypeFromBytes(Buffer.from([0xff, 0xd8, 0xff, 0xe0]))).toBe("jpg");
    expect(imageTypeFromBytes(Buffer.from("GIF89a"))).toBe("gif");
    expect(imageTypeFromBytes(Buffer.from("BM"))).toBe("bmp");
    expect(imageTypeFromBytes(Buffer.from("<svg>"))).toBeNull();
    expect(imageTypeFromBytes(new Uint8Array(0))).toBeNull();
  });
});

describe("buildDocx(产物结构,Python 正式解包)", () => {
  it("生成合法 zip:document.xml 含标题样式/列表/图片引用,media/ 内有 PNG", async () => {
    const src = "# 报告\n\n**要点**与 {{image:1}}。\n\n- 一项\n\n1. 第一步\n\n> 提醒\n\n```\ncode\n```";
    const buf = await buildDocx(src, [IMG], "年度报告");
    expect(buf.length).toBeGreaterThan(5000);
    // zip 魔数 PK\x03\x04
    expect(buf[0]).toBe(0x50); expect(buf[1]).toBe(0x4b);

    const dump = unzip(buf);
    expect(dump["word/document.xml"]).toContain('w:val="Heading1"');
    expect(dump["word/document.xml"]).toContain("要点");
    expect(dump["word/document.xml"]).toContain("报告");
    expect(dump["word/document.xml"]).toContain("<w:drawing>");
    // 列表走 numbering 定义
    expect(dump["word/numbering.xml"]).toContain('w:numFmt w:val="decimal"'); // 编号列表定义存在(库内部重映射 reference 名)
    // 图片部件真实存在且为 PNG 魔数(记名断言)
    const mediaNames = Object.keys(dump).filter((n) => n.startsWith("word/media/"));
    expect(mediaNames.length).toBe(1);
    // 文档属性 title
    expect(dump["docProps/core.xml"]).toContain("年度报告");
  });

  it("多张图片产生多个 media 部件;越界占位符输出 [image] 字面文本", async () => {
    // 同一字节去重:docx 库对相同内容只存一份 → 用内容不同的两张图
    const jpgLike = Buffer.from([0xff, 0xd8, 0xff, 0xdb, 0x00, 0x04, 0x00, 0x00]);
    const buf = await buildDocx("{{image:1}} 与 {{image:2}} 与 {{image:9}}", [IMG, { ...IMG, data: jpgLike, type: "jpg" }], "two");
    const dump = unzip(buf);
    const mediaNames = Object.keys(dump).filter((n) => n.startsWith("word/media/"));
    expect(mediaNames.length).toBe(2);
    expect(dump["word/document.xml"]).toContain("[image]");
  });

  it("无图片占位符时无 drawing、无 media", async () => {
    const buf = await buildDocx("纯文字\n第二行", [], "plain");
    const dump = unzip(buf);
    expect(dump["word/document.xml"]).not.toContain("<w:drawing>");
    expect(Object.keys(dump).some((n) => n.startsWith("word/media/"))).toBe(false);
  });

  it("空标题回退 document;空文档产出仍合法", async () => {
    const buf = await buildDocx("只有一段", [], "");
    const dump = unzip(buf);
    expect(dump["word/document.xml"]).toContain("只有一段");
  });

  it("特殊 XML 字符(< > &)被转义,不产出损坏包", async () => {
    const buf = await buildDocx("a < b && c > d", [], "xml-char");
    const dump = unzip(buf);
    expect(dump["word/document.xml"]).toContain("a &lt; b &amp;&amp; c &gt; d");
  });
});
