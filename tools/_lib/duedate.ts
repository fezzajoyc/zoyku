/**
 * 预产期纯日期数学(Naegele 规则)。
 * Naegele:预产期 = 末次月经(LMP)第 1 天 + 280 天(40 周);
 * 月经周期 ≠ 28 天时按差值平移:EDD = LMP + 280 + (周期长度 − 28) 天。
 * 所有日期一律走 UTC(避免时区/夏令时把日期挪一天);
 * 非法输入(格式错、不存在的日历日、周期越界)返回 null,诚实表达"无法计算"。
 * 诚实口径:预产期是估计,孕 37–42 周出生都算足月;本函数不做医疗判断。
 */

export type DueDateResult = {
  lmp: Date;
  due: Date;
  /** 周期长度相对 28 天的平移天数(28 周期时为 0) */
  shift: number;
  /** 足月窗口起点:孕 37 周 0 天(预产期前 21 天) */
  termStart: Date;
  /** 足月窗口终点:孕 42 周结束(预产期后 14 天) */
  termEnd: Date;
};

const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;
/** 临床上常规周期长度范围;超出该区间的周期本规则已不可靠,拒绝计算 */
export const MIN_CYCLE_DAYS = 20;
export const MAX_CYCLE_DAYS = 45;

function parseISODate(iso: string): Date | null {
  if (!ISO_RE.test(iso)) return null;
  const y = Number(iso.slice(0, 4));
  const m = Number(iso.slice(5, 7));
  const d = Number(iso.slice(8, 10));
  const date = new Date(Date.UTC(y, m - 1, d));
  // 排除 2025-02-31 这类不存在的日历日(UTC 构造会静默滚动到下个月)
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null;
  return date;
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86400000);
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

/**
 * 由末次月经与月经周期长度推算预产期(Naegele + 周期平移)。
 *
 * 手算锚点:LMP 2025-01-01、周期 28 → 2025-01-01 + 280 天 = 2025-10-08(经典锚点);
 * 周期 30 → 再 +2 天 = 2025-10-10;足月窗口 2025-09-17 至 2025-10-22。
 *
 * lmpISO 必须是真实存在的 YYYY-MM-DD 日历日;cycleDays 默认 28,合法区间
 * [20, 45](0/负数/小数/越界一律 null);LMP 在未来(晚于"今天"由调用方传入的场景除外)
 * 本函数不做时间判断,未来日期同样按规则平移——调用方决定是否展示。
 */
export function dueDateFromLmp(lmpISO: string, cycleDays = 28): DueDateResult | null {
  const lmp = parseISODate(lmpISO);
  if (!lmp) return null;
  if (!Number.isInteger(cycleDays) || cycleDays < MIN_CYCLE_DAYS || cycleDays > MAX_CYCLE_DAYS) return null;
  const shift = cycleDays - 28;
  const due = addDays(lmp, 280 + shift);
  return {
    lmp,
    due,
    shift,
    termStart: addDays(due, -21), // 37w0d = 280 − 21 = 259 天
    termEnd: addDays(due, 14), // 42w 结束 = 280 + 14 = 294 天
  };
}

export type GestAge = {
  /** 距 LMP 的总天数(LMP 当天 = 第 0 天,孕 0w0d) */
  days: number;
  /** 孕周(整数部分) */
  weeks: number;
  /** 不足一周的余数天 */
  remainderDays: number;
  /** 距预产期(280 天)还剩的天数;为负表示已过预产期 */
  daysUntilDue: number;
  /** 孕期三分段:1 = <14 周,2 = 14–27 周,3 = ≥28 周(按孕 14/28 周分界) */
  trimester: 1 | 2 | 3;
};

/**
 * 某一天(todayISO)的孕周。todayISO 必须是真实日历日且 ≥ lmpISO,
 * 否则返回 null(还没怀孕/日期倒挂,诚实拒绝)。
 *
 * 手算锚点:LMP 2025-01-01、today 2025-03-15 → 相差 73 天 = 孕 10 周 3 天,
 * 距预产期(第 280 天)还有 207 天。分段分界:孕 1 期 = 第 0–97 天(0w0d–13w6d),
 * 第 98 天(14w0d)起为孕 2 期,第 196 天(28w0d)起为孕 3 期。73 < 98 → 孕 1 期。
 */
export function gestationalAgeAt(lmpISO: string, todayISO: string): GestAge | null {
  const lmp = parseISODate(lmpISO);
  const today = parseISODate(todayISO);
  if (!lmp || !today) return null;
  const days = daysBetween(lmp, today);
  if (days < 0) return null;
  return {
    days,
    weeks: Math.floor(days / 7),
    remainderDays: days % 7,
    daysUntilDue: 280 - days,
    trimester: days < 98 ? 1 : days < 196 ? 2 : 3,
  };
}
