import { describe, expect, it } from "vitest";
import { buildSync } from "esbuild";
import { fileURLToPath } from "node:url";
import {
  MAX_RENDER, isRiskyPattern, regexRun, regexWorkerSource, workerFallbackAllowed,
} from "../tools/_lib/regex";

describe("regexRun(纯逻辑,与 Worker 同源)", () => {
  it("基础匹配:文本/位置/编号组", () => {
    const r = regexRun("(\\w+)@(\\w+)", "g", "a@b c@d");
    expect(r.error).toBeNull();
    expect(r.matches.map((m) => m.text)).toEqual(["a@b", "c@d"]);
    expect(r.matches[0].index).toBe(0);
    expect(r.matches[0].groups).toEqual(["a", "b"]);
  });

  it("命名捕获组", () => {
    const r = regexRun("(?<y>\\d{4})-(?<m>\\d{2})", "g", "2026-11");
    expect(r.matches[0].named).toEqual([["y", "2026"], ["m", "11"]]);
  });

  it("零宽匹配不死循环", () => {
    const r = regexRun("(?=a)", "g", "aaa");
    expect(r.matches.length).toBe(3);
    expect(r.matches.map((m) => m.index)).toEqual([0, 1, 2]);
  });

  it("关闭 g 时只返回首次匹配", () => {
    expect(regexRun("a", "", "aba")).toEqual({
      matches: [{ text: "a", index: 0, groups: [], named: [] }],
      error: null,
      truncated: false,
    });
    expect(regexRun("(?:)", "u", "😀").matches.map((m) => m.index)).toEqual([0]);
  });

  it("Unicode 零宽匹配按码点前进并保留 UTF-16 索引", () => {
    const r = regexRun("(?:)", "gu", "😀中😀");
    expect(r.matches.map((m) => m.index)).toEqual([0, 2, 3, 5]);
    expect(r.truncated).toBe(false);
    expect(regexRun("中", "gu", "😀中").matches[0].index).toBe(2);
  });

  it("不启用 u 时零宽匹配使用 UTF-16 代码单元", () => {
    expect(regexRun("(?:)", "g", "😀").matches.map((m) => m.index)).toEqual([0, 1, 2]);
  });

  it("恰好达到显示上限时不谎报截断", () => {
    expect(regexRun("a", "g", "a".repeat(MAX_RENDER)).truncated).toBe(false);
    expect(regexRun("a", "g", "aa", 2)).toEqual({
      matches: [0, 1].map((index) => ({ text: "a", index, groups: [], named: [] })),
      error: null,
      truncated: false,
    });
    expect(regexRun("a", "g", "aaa", 2).truncated).toBe(true);
  });

  it("上限截断标记 truncated", () => {
    const r = regexRun("a", "g", "a".repeat(600));
    expect(r.matches.length).toBe(MAX_RENDER);
    expect(r.truncated).toBe(true);
  });

  it("非法模式返回 error 不抛", () => {
    const r = regexRun("[", "g", "abc");
    expect(r.error).toBeTruthy();
    expect(r.matches).toEqual([]);
  });

  it("无 pattern 返回空结果", () => {
    expect(regexRun("", "g", "abc")).toEqual({ matches: [], error: null, truncated: false });
  });

  it("支持空文本、无匹配、CJK 和未参与捕获组", () => {
    expect(regexRun("^$", "g", "").matches.map((m) => m.text)).toEqual([""]);
    expect(regexRun("x", "g", "中文😀").matches).toEqual([]);
    expect(regexRun("(?<optional>a)?(中)", "g", "中").matches[0]).toEqual({
      text: "中", index: 0, groups: [undefined, "中"], named: [],
    });
    expect(regexRun("a", "gg", "a").error).toBeTruthy();
  });
});

describe("isRiskyPattern(ReDoS 教学提示)", () => {
  it("识别典型嵌套量词/量词内分支", () => {
    expect(isRiskyPattern("(a+)+$")).toBe(true);
    expect(isRiskyPattern("(\\w+)+")).toBe(true);
    expect(isRiskyPattern("(a|a?)+")).toBe(true);
    expect(isRiskyPattern("[a-z]+\\s+")).toBe(false);
    expect(isRiskyPattern("\\d{4}-\\d{2}")).toBe(false);
  });
});

describe("regexWorkerSource(Blob Worker 源码)", () => {
  it("生产压缩后 Worker 仍不依赖模块闭包变量名", () => {
    const bundled = buildSync({
      entryPoints: [fileURLToPath(new URL("../tools/_lib/regex.ts", import.meta.url))],
      bundle: true, write: false, minify: true, format: "cjs", platform: "browser", target: "es2018",
    }).outputFiles[0].text;
    const bundledModule = { exports: {} as { regexWorkerSource: typeof regexWorkerSource } };
    new Function("module", "exports", bundled)(bundledModule, bundledModule.exports);
    let posted: unknown;
    const workerSelf: { onmessage?: (event: { data: unknown }) => void; postMessage: (result: unknown) => void } = {
      postMessage(result) { posted = result; },
    };
    new Function("self", bundledModule.exports.regexWorkerSource())(workerSelf);
    workerSelf.onmessage?.({ data: { pattern: "(?:)", flags: "gu", text: "😀" } });
    expect(posted).toEqual({
      matches: [0, 2].map((index) => ({ text: "", index, groups: [], named: [] })),
      error: null,
      truncated: false,
    });
  });

  it("源码含 regexRun 实现与 postMessage,可直接在 Worker 上下文执行", () => {
    const src = regexWorkerSource();
    expect(src).toContain("self.onmessage");
    expect(src).toContain("postMessage");
    expect(src).toContain("new RegExp");
    // 不含任何模块 import(Worker Blob 无模块解析)
    expect(src).not.toContain("import ");
  });

  it("在模拟 Worker 作用域里跑出与主线程一致的结果", () => {
    const src = regexWorkerSource();
    let posted: unknown = null;
    let handler: ((ev: { data: unknown }) => void) | null = null;
    const fakeSelf = {
      set onmessage(fn: (ev: { data: unknown }) => void) { handler = fn; },
      postMessage: (v: unknown) => { posted = v; },
    };
    // 用 Function 模拟 Worker 全局(仅测试,不 mock 被测逻辑本身——源码就是产物)
    new Function("self", src)(fakeSelf);
    (handler as unknown as (ev: { data: unknown }) => void)({ data: { pattern: "a", flags: "g", text: "aba" } });
    expect((posted as { matches: { text: string }[] }).matches.map((m) => m.text)).toEqual(["a", "a"]);
  });

  it.each([
    { pattern: "a", flags: "", text: "aba" },
    { pattern: "(?:)", flags: "gu", text: "😀中😀" },
    { pattern: "a", flags: "g", text: "a".repeat(MAX_RENDER) },
    { pattern: "a", flags: "g", text: "a".repeat(MAX_RENDER + 1) },
  ])("Worker 无模块闭包且保持相同行为: $flags / $pattern", (data) => {
    let posted: unknown;
    const workerSelf: { onmessage?: (event: { data: typeof data }) => void; postMessage: (result: unknown) => void } = {
      postMessage(result) { posted = result; },
    };
    new Function("self", regexWorkerSource())(workerSelf);
    workerSelf.onmessage?.({ data });
    expect(posted).toEqual(regexRun(data.pattern, data.flags, data.text));
  });
});


describe("workerFallbackAllowed(超时绝不降级到主线程)", () => {
  it("环境不可用 + 短文本才允许同步兜底", () => {
    expect(workerFallbackAllowed({ kind: "unavailable" }, 100)).toBe(true);
    expect(workerFallbackAllowed({ kind: "unavailable" }, 3000)).toBe(false);
  });
  it("超时一律不降级(否则把 ReDoS 冻结搬回主线程)", () => {
    expect(workerFallbackAllowed({ kind: "timeout" }, 10)).toBe(false);
    expect(workerFallbackAllowed({ kind: "timeout" }, 3000)).toBe(false);
  });
});
