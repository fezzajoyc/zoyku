/**
 * CN-007/010/011:公历↔农历转换封装(lunar-javascript 1.7.8,MIT)。
 * - 浏览器侧懒加载(>50KB 铁律);Node 测试直接 require。
 * - 干支年口径:按农历正月初一换年(民俗/老黄历口径,与立春制不同,页面须标注)。
 * - 锚:公开历表春节/中秋/闰月样本(tests/lunar.test.ts)。
 */

export type LunarInfo = {
  /** 农历中文年,如 二〇二四 */
  yearCN: string;
  /** 中文月,如 正月 / 闰二月 / 腊月 */
  monthCN: string;
  /** 中文日,如 初一 / 十五 / 廿三 */
  dayCN: string;
  /** 数字月(闰月为负数表示,如 -2 = 闰二月) */
  month: number;
  day: number;
  /** 农历年(正月初一所属年) */
  year: number;
  isLeap: boolean;
  /** 干支年(按农历新年换年) */
  yearGZ: string;
  /** 生肖 */
  zodiac: string;
  /** 当日节气名,无节气为 null */
  jieQi: string | null;
};

export type LunarToSolarError = { ok: false; code: "invalid" };
export type LunarToSolarOk = {
  ok: true;
  year: number;
  month: number;
  day: number;
};
export type LunarToSolarResult = LunarToSolarOk | LunarToSolarError;

type LunarCtor = {
  fromYmd: (y: number, m: number, d: number, isLeap?: boolean) => LunarLike;
};

interface LunarLike {
  toString(): string;
  getYear(): number;
  /** 闰月返回负数(如闰二月 = -2) */
  getMonth(): number;
  getDay(): number;
  getYearInChinese(): string;
  getMonthInChinese(): string;
  getDayInChinese(): string;
  /** 农历年口径(正月初一换年) */
  getYearInGanZhi(): string;
  getYearShengXiao(): string;
  getJieQi(): string;
  getSolar(): { getYear(): number; getMonth(): number; getDay(): number; toYmd(): string };
}

/** 公历 → 农历完整信息。data 以外的年份由库自行限定(1900–2100)。 */
export async function solarToLunar(y: number, m: number, d: number): Promise<LunarInfo | null> {
  const lib = (await import("lunar-javascript")) as unknown as { Solar: { fromYmd: (y: number, m: number, d: number) => { getLunar: () => LunarLike } } };
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return null;
  let lunar: LunarLike;
  try {
    lunar = lib.Solar.fromYmd(y, m, d).getLunar();
  } catch {
    return null;
  }
  const jieQi = lunar.getJieQi();
  const month = lunar.getMonth();
  return {
    yearCN: lunar.getYearInChinese(),
    /** 显示级月名,含「月」后缀(如 正月/闰二月/腊月) */
    monthCN: lunar.getMonthInChinese() + "月",
    dayCN: lunar.getDayInChinese(),
    month: Math.abs(month),
    day: lunar.getDay(),
    year: lunar.getYear(),
    isLeap: month < 0,
    yearGZ: lunar.getYearInGanZhi(),
    zodiac: lunar.getYearShengXiao(),
    jieQi: jieQi === "" ? null : jieQi,
  };
}

/** 农历 → 公历(闰月用负数月或 isLeap)。 */
export async function lunarToSolar(
  year: number,
  month: number,
  day: number,
  isLeap = false,
): Promise<LunarToSolarResult> {
  const lib = (await import("lunar-javascript")) as unknown as { Lunar: LunarCtor };
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return { ok: false, code: "invalid" };
  }
  const m = isLeap ? -Math.abs(month) : month;
  try {
    const solar = lib.Lunar.fromYmd(year, m, day, isLeap).getSolar();
    return { ok: true, year: solar.getYear(), month: solar.getMonth(), day: solar.getDay() };
  } catch {
    return { ok: false, code: "invalid" };
  }
}
