import { describe, expect, it } from "vitest";
import {
  CHINA_HOLIDAYS,
  chinaHolidayYears,
  expandChinaHolidays,
  expandChinaMakeupWorkdays,
  getChinaHolidayTable,
} from "@/tools/_lib/china-holidays";
import { addWorkdays, workdaysBetween, workdaysBreakdown } from "@/tools/_lib/workdays";

/**
 * CN-020 中国法定节假日调休表。
 * 锚 = 国务院办公厅通知原文(国办发明电〔2025〕7号 / 〔2026〕10号),
 * 全部日期与星期、农历、补班安排逐日核对(2026 新华社/国新办,2027 新华网受权发布)。
 * 本测试强制:① 数据结构合法 ② 补班日必须是周末 ③ 关键日期行为正确。
 */

const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

function weekdayOf(iso: string): number {
  // 0=周日 6=周六(UTC,与 workdays.ts 的日期数学一致)
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

describe("数据结构完整性", () => {
  it("收录 2026 与 2027 两年", () => {
    expect(chinaHolidayYears().sort()).toEqual([2026, 2027]);
  });

  it.each([2026, 2027])("%i 年:区间连续、日期合法、天数正确", (year) => {
    const t = getChinaHolidayTable(year)!;
    expect(t).not.toBeNull();
    for (const [a, b] of t.holidayRanges) {
      expect(a).toMatch(ISO_RE);
      expect(b).toMatch(ISO_RE);
      const da = Date.parse(`${a}T00:00:00Z`);
      const db = Date.parse(`${b}T00:00:00Z`);
      expect(da).not.toBeNaN();
      expect(db).not.toBeNaN();
      expect(db).toBeGreaterThanOrEqual(da);
      // 区间不超过 10 天(长假最长为春节 9 天)
      expect((db - da) / 86_400_000).toBeLessThan(10);
    }
    for (const w of t.makeupWorkdays) expect(w).toMatch(ISO_RE);
  });

  it("2026 年:7 个节日区间、共 33 天、补班 5 天", () => {
    const t = CHINA_HOLIDAYS[2026];
    expect(t.holidayRanges).toHaveLength(7);
    expect(expandChinaHolidays([2026]).size).toBe(33);
    expect(t.makeupWorkdays).toHaveLength(5);
  });

  it("2027 年:7 个节日区间、共 29 天、补班 5 天", () => {
    const t = CHINA_HOLIDAYS[2027];
    expect(t.holidayRanges).toHaveLength(7);
    expect(expandChinaHolidays([2027]).size).toBe(29);
    expect(t.makeupWorkdays).toHaveLength(5);
  });

  it.each([2026, 2027])("%i 年:补班日必须落在周末", (year) => {
    for (const w of CHINA_HOLIDAYS[year].makeupWorkdays) {
      const dow = weekdayOf(w);
      expect([0, 6]).toContain(dow); // 周日或周六
    }
  });

  it("文号溯源字段存在", () => {
    expect(CHINA_HOLIDAYS[2026].source).toContain("2025〕7号");
    expect(CHINA_HOLIDAYS[2027].source).toContain("2026〕10号");
  });
});

describe("关键日期行为(sat-sun 周末)", () => {
  const china = (years: number[]) => ({
    holidays: expandChinaHolidays(years),
    extraWorkdays: expandChinaMakeupWorkdays(years),
  });

  it("2026-01-01 周四元旦 → 休", () => {
    expect(weekdayOf("2026-01-01")).toBe(4);
    expect(workdaysBetween("2026-01-01", "2026-01-01", { ...china([2026]) })).toBe(0);
  });

  it("2026-01-04 周日补班 → 上班", () => {
    expect(weekdayOf("2026-01-04")).toBe(0);
    expect(workdaysBetween("2026-01-04", "2026-01-04", { ...china([2026]) })).toBe(1);
  });

  it("2026-02-16 周一除夕 → 休(春节区间内)", () => {
    expect(weekdayOf("2026-02-16")).toBe(1);
    expect(workdaysBetween("2026-02-16", "2026-02-16", { ...china([2026]) })).toBe(0);
  });

  it("2026-03-09 周一普通日 → 上班", () => {
    expect(workdaysBetween("2026-03-09", "2026-03-09", { ...china([2026]) })).toBe(1);
  });

  it("2026-05-01 周五劳动节 → 休;2026-05-09 周六补班 → 上班", () => {
    expect(weekdayOf("2026-05-01")).toBe(5);
    expect(workdaysBetween("2026-05-01", "2026-05-01", { ...china([2026]) })).toBe(0);
    expect(weekdayOf("2026-05-09")).toBe(6);
    expect(workdaysBetween("2026-05-09", "2026-05-09", { ...china([2026]) })).toBe(1);
  });

  it("2027-02-05 周五除夕 → 休;2027-06-09 周三端午单日 → 休", () => {
    expect(weekdayOf("2027-02-05")).toBe(5);
    expect(workdaysBetween("2027-02-05", "2027-02-05", { ...china([2027]) })).toBe(0);
    expect(weekdayOf("2027-06-09")).toBe(3);
    expect(workdaysBetween("2027-06-09", "2027-06-09", { ...china([2027]) })).toBe(0);
  });

  it("跨年区间:2026-12-28 → 2027-01-09(含元旦 3 休 + 周末)", () => {
    // 12/28(一)~12/31(四)= 4 工作日;1/1(五)休、1/2-1/3 周末;1/4(一)~1/8(五)= 5 工作日;1/9(六)周末
    const r = workdaysBetween("2026-12-28", "2027-01-09", { ...china([2026, 2027]) });
    expect(r).toBe(9);
  });

  it("加工作日:2026-01-01(休)后 1 个工作日 = 2026-01-05 周一(跳过 1/2、1/3、周末;1/4 是补班)", () => {
    // 从 1/1 起向后:1/2(五,休)1/3(六,休)1/4(日,补班→上班!)→ 结果应为 2026-01-04
    expect(weekdayOf("2026-01-02")).toBe(5);
    expect(addWorkdays("2026-01-01", 1, { ...china([2026]) })).toBe("2026-01-04");
  });

  it("不加中国表时周末语义不变(回归护栏)", () => {
    expect(workdaysBetween("2026-01-03", "2026-01-03", { holidays: expandChinaHolidays([2026]) })).toBe(0); // 周六
    expect(workdaysBetween("2026-01-04", "2026-01-04", { holidays: expandChinaHolidays([2026]) })).toBe(0); // 周日,无补班概念
  });
});

describe("统计分解(breakdown)", () => {
  it("2026 春节周 2/16-2/20:全部法定假 → 工作日 0,假日 5", () => {
    const r = workdaysBreakdown("2026-02-16", "2026-02-20", {
      holidays: expandChinaHolidays([2026]),
      extraWorkdays: expandChinaMakeupWorkdays([2026]),
    });
    expect(r).toEqual({ total: 5, weekendDays: 0, holidayDays: 5, workdays: 0 });
  });

  it("含补班的区间:补班日计入工作日,不再算周末", () => {
    // 2026-01-04(日,补班)单日:workdays 1,weekend 0
    const r = workdaysBreakdown("2026-01-04", "2026-01-04", {
      holidays: expandChinaHolidays([2026]),
      extraWorkdays: expandChinaMakeupWorkdays([2026]),
    });
    expect(r).toEqual({ total: 1, weekendDays: 0, holidayDays: 0, workdays: 1 });
  });
});
