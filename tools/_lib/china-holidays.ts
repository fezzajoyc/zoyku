/**
 * CN-020:中国法定节假日官方调休表(2026/2027,国务院办公厅)。
 * 来源(逐日核验,星期/农历/补班均与官方通知一致):
 *  - 2026:国办发明电〔2025〕7号,2025-11-04 发布
 *    (国新办转载 scio.gov.cn/zdgz/jj/202511/t20251110_938367.html)
 *  - 2027:国办发明电〔2026〕10号,2026-11-05 发布
 *    (新华网受权发布 xinhuanet.com/politics/20261105/…)
 * 数据以「区间」存储降低抄写错误面;补班日(workdays)为调休上班的周末。
 * 后续年份:每年 11 月左右国务院发布次年安排,届时在 CHINA_HOLIDAYS 增补即可。
 */

export type ChinaHolidayTable = {
  year: number;
  /** 文号 + 发布日期(数据溯源) */
  source: string;
  /** 法定放假区间 [起, 止](含调休连放的周末),ISO YYYY-MM-DD,闭区间 */
  holidayRanges: Array<[string, string]>;
  /** 调休补班的周末日期(当天按工作日计) */
  makeupWorkdays: string[];
};

export const CHINA_HOLIDAYS: Record<number, ChinaHolidayTable> = {
  2026: {
    year: 2026,
    source: "国办发明电〔2025〕7号(2025-11-04)",
    holidayRanges: [
      ["2026-01-01", "2026-01-03"], // 元旦 3 天
      ["2026-02-15", "2026-02-23"], // 春节 9 天(除夕 2/16 在内)
      ["2026-04-04", "2026-04-06"], // 清明节 3 天
      ["2026-05-01", "2026-05-05"], // 劳动节 5 天
      ["2026-06-19", "2026-06-21"], // 端午节 3 天
      ["2026-09-25", "2026-09-27"], // 中秋节 3 天
      ["2026-10-01", "2026-10-07"], // 国庆节 7 天
    ],
    makeupWorkdays: ["2026-01-04", "2026-02-14", "2026-02-28", "2026-05-09", "2026-10-10"],
  },
  2027: {
    year: 2027,
    source: "国办发明电〔2026〕10号(2026-11-05)",
    holidayRanges: [
      ["2027-01-01", "2027-01-03"], // 元旦 3 天
      ["2027-02-05", "2027-02-13"], // 春节 9 天(除夕 2/5 在内)
      ["2027-04-03", "2027-04-05"], // 清明节 3 天
      ["2027-05-01", "2027-05-05"], // 劳动节 5 天
      ["2027-06-09", "2027-06-09"], // 端午节 1 天
      ["2027-09-15", "2027-09-15"], // 中秋节 1 天
      ["2027-10-01", "2027-10-07"], // 国庆节 7 天
    ],
    makeupWorkdays: ["2027-01-31", "2027-02-14", "2027-05-08", "2027-09-26", "2027-10-09"],
  },
};

export function getChinaHolidayTable(year: number): ChinaHolidayTable | null {
  return CHINA_HOLIDAYS[year] ?? null;
}

/** 已收录的年份(降序)。 */
export function chinaHolidayYears(): number[] {
  return Object.keys(CHINA_HOLIDAYS).map(Number).sort((a, b) => b - a);
}

function isoToUtcDay(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d) / 86_400_000;
}

function dayToUtcIso(day: number): string {
  return new Date(day * 86_400_000).toISOString().slice(0, 10);
}

/** 展开某年(或多年并集)的法定假日集合。 */
export function expandChinaHolidays(years: number[]): Set<string> {
  const out = new Set<string>();
  for (const y of years) {
    const table = CHINA_HOLIDAYS[y];
    if (!table) continue;
    for (const [a, b] of table.holidayRanges) {
      for (let d = isoToUtcDay(a); d <= isoToUtcDay(b); d++) out.add(dayToUtcIso(d));
    }
  }
  return out;
}

/** 展开某年(或多年并集)的调休补班日集合。 */
export function expandChinaMakeupWorkdays(years: number[]): Set<string> {
  const out = new Set<string>();
  for (const y of years) {
    const table = CHINA_HOLIDAYS[y];
    if (!table) continue;
    for (const iso of table.makeupWorkdays) out.add(iso);
  }
  return out;
}
