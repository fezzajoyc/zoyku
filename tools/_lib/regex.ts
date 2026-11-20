/**
 * 正则匹配纯逻辑 + Worker 源码(供 dev-engine-regex 使用)。
 * 拆出 _lib 的原因:①可在 Node 里单测(含 ReDoS 样本)②Worker 源码与主逻辑同源,不重复实现。
 */

export type RegexMatch = {
  text: string;
  index: number;
  groups: (string | undefined)[];
  named: [string, string][];
};

export type RegexRunResult = {
  matches: RegexMatch[];
  error: string | null;
  truncated: boolean;
};

export const MAX_RENDER = 500;
export const MAX_GUARD = 10000;
/** 测试文本硬上限:防止海量输入把 worker 内存打爆(长度本身不足以挡 ReDoS,靠 worker 超时) */
export const MAX_TEST_CHARS = 20000;

/**
 * 实际匹配函数。刻意只用 ES2015 语法 + 无外部闭包,便于 .toString() 注入 Blob Worker。
 * 注意:零宽匹配 lastIndex++ 与上限保护都在这里,worker 和单测走同一份代码。
 */
export function regexRun(
  pattern: string,
  flags: string,
  text: string,
  maxRender: number = MAX_RENDER,
): RegexRunResult {
  if (!pattern) return { matches: [], error: null, truncated: false };
  try {
    const re = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];
    let guard = 0;
    while (guard++ < MAX_GUARD) {
      const m = re.exec(text);
      if (!m) break;
      matches.push({
        text: m[0],
        index: m.index,
        groups: m.slice(1),
        named: m.groups ? Object.entries(m.groups).filter(([, v]) => v !== undefined) as [string, string][] : [],
      });
      if (m[0] === "") {
        re.lastIndex++;
        if (re.lastIndex > text.length) break;
      }
      if (matches.length >= maxRender) break;
    }
    return { matches, error: null, truncated: matches.length >= maxRender };
  } catch (e) {
    return { matches: [], error: e instanceof Error ? e.message : String(e), truncated: false };
  }
}

/**
 * 生成 Blob Worker 源码。把 regexRun 的源码字面量拼进去 —— 同源、不重复。
 * Worker 收到 {pattern, flags, text},回 { matches, error, truncated }。
 */
export function regexWorkerSource(): string {
  // regexRun.toString() 引用了模块常量,Worker 作用域里没有 → 把常量的当前值一起注入,
  // 从导出常量取值而非硬编码,避免改动上限后 Worker 与主线程口径漂移。
  return `
var MAX_RENDER = ${MAX_RENDER};
var MAX_GUARD = ${MAX_GUARD};
self.onmessage = function (ev) {
  var d = ev.data || {};
  var result = (${regexRun.toString()})(d.pattern || "", d.flags || "", d.text || "", d.maxRender);
  self.postMessage(result);
};
`;
}

/**
 * Worker 执行结果的判别联合。必须区分"超时"与"环境不可用":
 * 超时意味着正则本身可能是灾难性回溯 —— 此时若降级到主线程同步重跑,等于把冻结搬到主线程,
 * 与引入 Worker 的目的完全相反。故超时一律不降级。
 */
export type WorkerOutcome =
  | { kind: "ok"; result: RegexRunResult }
  | { kind: "unavailable" }
  | { kind: "timeout" };

/** 仅当 Worker 环境不可用且文本足够短时,才允许主线程同步兜底。超时一律 false。 */
export function workerFallbackAllowed(outcome: WorkerOutcome, textLength: number): boolean {
  return outcome.kind === "unavailable" && textLength <= 2000;
}

/** 高可疑 ReDoS 结构:嵌套量词 / 量词内分支。用于给用户在跑之前提示,不拦截(页面教学需要能试危险模式)。 */
export function isRiskyPattern(pattern: string): boolean {
  return (
    /(\([^)]*[+*][^)]*\))[+*{]/.test(pattern) || // (a+)+ / (a*)*
    /\([^)]*\|[^)]*\)[+*{]/.test(pattern) ||       // (a|a?)+
    /(\[[^\]]+\])[+*]\s*[+*]/.test(pattern)        // [a+]+ 类
  );
}
