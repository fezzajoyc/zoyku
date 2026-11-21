import { describe, expect, it } from "vitest";
import { lunarToSolar, solarToLunar } from "@/tools/_lib/lunar";

/** CN-007:公历↔农历。锚 = 公开历表(春节/中秋/闰月)逐点核对。 */

describe("solarToLunar(公开历表锚点)", () => {
  it.each([
    [2024, 2, 10, "正月初一", "甲辰", "龙"],
    [2025, 1, 29, "正月初一", "乙巳", "蛇"],
    [2026, 2, 17, "正月初一", "丙午", "马"],
    [2025, 10, 6, "八月十五", "乙巳", "蛇"],
  ])("%i-%i-%i → 农历 %s(干支 %s,生肖 %s)", async (y, m, d, day, gz, zx) => {
    const r = await solarToLunar(y, m, d);
    expect(r).not.toBeNull();
    if (!r) return;
    expect(r.monthCN + r.dayCN).toBe(day);
    expect(r.yearGZ).toBe(gz);
    expect(r.zodiac).toBe(zx);
  });

  it("闰月识别:2023-03-22 = 闰二月初一", async () => {
    const r = await solarToLunar(2023, 3, 22);
    expect(r).not.toBeNull();
    if (!r) return;
    expect(r.isLeap).toBe(true);
    expect(r.month).toBe(2);
    expect(r.monthCN).toBe("闰二月");
    expect(r.dayCN).toBe("初一");
  });

  it("节气:2026-02-04 立春;无节气日为 null", async () => {
    const jq = await solarToLunar(2026, 2, 4);
    expect(jq?.jieQi).toBe("立春");
    const none = await solarToLunar(2026, 3, 10);
    expect(none?.jieQi).toBeNull();
  });

  it("非法输入结构化拒绝;库的年份覆盖比 folklore 更宽(1899 亦可转)", async () => {
    // lunar-javascript 实际支持远超 1900-2100 的年份——不设人为下限
    const old = await solarToLunar(1899, 1, 1);
    expect(old?.yearCN).toBe("一八九八");
    expect(await solarToLunar(1.5, 1, 1)).toBeNull();
  });
});

describe("lunarToSolar(反向 + 往返)", () => {
  it("农历 2024 正月初一 → 2024-02-10", async () => {
    const r = await lunarToSolar(2024, 1, 1);
    expect(r).toEqual({ ok: true, year: 2024, month: 2, day: 10 });
  });

  it("闰二月:农历 2023 闰二月初一 → 2023-03-22(isLeap=true)", async () => {
    const r = await lunarToSolar(2023, 2, 1, true);
    expect(r).toEqual({ ok: true, year: 2023, month: 3, day: 22 });
  });

  it("非法日期(不存在的日子)结构化拒绝", async () => {
    // 2024 无闰月 → 闰三十 不存在
    const r = await lunarToSolar(2024, 2, 30, true);
    expect(r.ok).toBe(false);
  });

  it("双向往返:公开锚点日期来回一致", async () => {
    const anchors: Array<[number, number, number]> = [
      [2024, 2, 10],
      [2025, 1, 29],
      [2025, 10, 6],
      [2026, 2, 17],
    ];
    for (const [y, m, d] of anchors) {
      const l = await solarToLunar(y, m, d);
      expect(l).not.toBeNull();
      if (!l) continue;
      const back = await lunarToSolar(l.year, l.month, l.day, l.isLeap);
      expect(back).toEqual({ ok: true, year: y, month: m, day: d });
    }
  });
});
