/**
 * ETA / completion-time estimation, pure functions.
 * A task of `total` units progresses at `rate` units per `rateUnit`
 * ("hour" | "day" | "week"), optionally limited to `hoursPerDay`
 * working hours when the rate unit is not hours.
 */

export type RateUnit = "hour" | "day" | "week";

export const UNIT_HOURS: Record<RateUnit, number> = {
  hour: 1,
  day: 24,
  week: 168,
};

export type EtaInput = {
  /** start timestamp, ms epoch */
  startMs: number;
  total: number;
  rate: number;
  rateUnit: RateUnit;
  /** working hours per day, used to stretch calendar time; default 24 (work around the clock) */
  hoursPerDay?: number;
};

export type EtaResult = {
  /** total working hours needed */
  hours: number;
  /** calendar milliseconds from start to finish */
  durationMs: number;
  /** finish timestamp, ms epoch */
  finishMs: number;
  /** calendar days remaining (fractional) */
  daysRemaining: number;
};

export function estimateEta(input: EtaInput): EtaResult | null {
  const { startMs, rateUnit } = input;
  const total = Number(input.total);
  const rate = Number(input.rate);
  const hpd = input.hoursPerDay === undefined ? 24 : Number(input.hoursPerDay);
  if (!Number.isFinite(total) || !Number.isFinite(rate) || !Number.isFinite(hpd)) return null;
  if (total <= 0 || rate <= 0 || hpd <= 0 || hpd > 24) return null;
  // Working hours needed. Rate unit "week" counts a 5-day work week.
  const workHoursPerUnit = rateUnit === "hour" ? 1 : rateUnit === "day" ? hpd : hpd * 5;
  const hours = (total / rate) * workHoursPerUnit;
  // Calendar span: work is spread evenly across calendar days at hpd hours/day
  // (a "week" rate still means the task occupies 7 calendar days per rate period).
  const calendarDaysPerUnit = rateUnit === "hour" ? 1 / 24 : rateUnit === "day" ? 1 : 7;
  const durationMs = (total / rate) * calendarDaysPerUnit * 86_400_000;
  return {
    hours: (total / rate) * (rateUnit === "hour" ? 1 : rateUnit === "day" ? hpd : hpd * 5),
    durationMs,
    finishMs: startMs + durationMs,
    daysRemaining: durationMs / 86_400_000,
  };
}

/** Human-friendly duration: "3 d 4 h", "2 h 15 min", "45 min". */
export function humanizeDuration(ms: number, locale: string): string {
  if (!Number.isFinite(ms) || ms < 0) return "—";
  const totalMin = Math.round(ms / 60_000);
  const d = Math.floor(totalMin / 1440);
  const h = Math.floor((totalMin % 1440) / 60);
  const m = totalMin % 60;
  const parts: string[] = [];
  const u: Record<string, [string, string, string, string, string]> = {
    en: ["d", "h", "min", "about {n} min", "done"],
    zh: ["天", "小时", "分钟", "约 {n} 分钟", "即将完成"],
    ja: ["日", "時間", "分", "約 {n} 分", "まもなく完了"],
    es: ["d", "h", "min", "unos {n} min", "listo"],
    pt: ["d", "h", "min", "cerca de {n} min", "pronto"],
  };
  const l = u[locale] ?? u.en;
  if (d > 0) parts.push(`${d} ${l[0]}`);
  if (h > 0) parts.push(`${h} ${l[1]}`);
  if (m > 0 && d === 0) parts.push(`${m} ${l[2]}`);
  if (parts.length === 0) return totalMin <= 1 ? l[4] : l[3].replace("{n}", String(totalMin));
  return parts.join(" ");
}
