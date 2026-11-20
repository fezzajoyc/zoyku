import { describe, expect, it } from "vitest";
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

  it("零宽匹配不死循环(每次 lastIndex++)", () => {
    const r = regexRun("(?=a)", "g", "aaa");
    expect(r.matches.length).toBe(3);
    expect(r.matches.map((m) => m.index)).toEqual([0, 1, 2]);
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
