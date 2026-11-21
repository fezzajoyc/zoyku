import { z } from "zod";
import { UNIT_CATEGORIES, convertValue, formatNumber } from "../tools/_lib/units";
import {
  apy, aprFromApy, breakEven, compound, hourlyToSalary, mortgage,
  overtimePay, rentAffordability, salaryBreakdown,
} from "../tools/_lib/finance";
import { gpaFromCourses } from "../tools/_lib/grade";
import {
  bmr, idealWeightRange, navyBodyFat, tdee, waterIntake, HEALTH_LIMITS,
} from "../tools/_lib/health";
import { hrZones, maxHeartRate } from "../tools/_lib/heart-rate";
import { shoeConvert } from "../tools/_lib/shoe-size";
import { formatDuration, oneRepMax, paceFor, riegelPredict } from "../tools/_lib/pace";
import { addWorkdays, workdaysBetween } from "../tools/_lib/workdays";
import { bedtimesFor, formatHm, wakeTimesFor } from "../tools/_lib/sleep";
import { cookConvert } from "../tools/_lib/cooking";
import { contrastRatio, wcagBadges } from "../tools/_lib/contrast";
import { gradePercent, letterFor, US_SCALE, PLUS_MINUS_SCALE, PASS_FAIL_SCALE } from "../tools/_lib/grade";
import {
  cleanText, computeTextInsights, countTextStats, dedupeLines, removeExtraSpaces, reverseText, slugify,
  sortLines, toCamel, toKebab, toPascal, toSnake, toTitleCase,
} from "../tools/_lib/transforms";
import { jsonDiff, jsonQuery, jsonToTs } from "../tools/_lib/jsontool";
import { detectDelimiter, jsonToXml, parseCsv } from "../tools/_lib/converters";
import { generateSocialCreditSamples } from "../tools/_lib/social-credit-generator";
import { parseRmbUppercase } from "../tools/_lib/rmb-uppercase-to-number";
import { calculateCrc16Modbus, CRC16_MODBUS_LIMITS } from "../tools/_lib/crc16-modbus";
import { formatPixelColor } from "../tools/_lib/image-color-picker";
import { expandIpRange, intToIp, ipToInt } from "../tools/_lib/subnet";
import { transformCsvTable } from "../tools/_lib/csv-table";
import { extractImagePalette } from "../tools/_lib/image-palette";
import { identifyFileSignature, signatureBytesFromHex, FILE_SIGNATURE_READ_LIMIT } from "../tools/_lib/file-signature";
import { addLineNumbers } from "../tools/_lib/line-numbers";
import { convertYamlJson } from "../tools/_lib/yaml-converter";

/**
 * MCP 工具注册表:把 tools/_lib 的纯函数暴露为 AI 可执行工具。
 * 站上的同名工具在浏览器里跑(交互式),这里跑同一份经过测试的实现——
 * 人和 AI 用同一套逻辑,而不是两套各写各的。
 */

const num = (n: number) => (Number.isFinite(n) ? String(n) : "invalid input — see tool description for accepted ranges");
const json = (v: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(v, null, 2) }] });
const DEFAULT_IPV4_RANGE_RESULTS = 256;
const MAX_IPV4_RANGE_RESULTS = 4096;
const MCP_CSV_CHARACTERS = 100_000;
const MCP_PALETTE_PIXELS = 4096;
const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });

export type McpToolDef = {
  name: string;
  title: string;
  description: string;
  schema: Record<string, any>;
  run: (args: any) => { content: { type: "text"; text: string }[]; isError?: boolean } | Promise<{ content: { type: "text"; text: string }[]; isError?: boolean }>;
};

export const MCP_TOOLS: McpToolDef[] = [
  // ── 单位换算 ──
  {
    name: "list_unit_categories",
    title: "List unit categories",
    description: "List all unit conversion categories available in convert_unit (length, weight, temperature, data, speed, volume, time, pressure, energy) with their unit ids and symbols.",
    schema: {},
    run: () => json(Object.fromEntries(
      Object.entries(UNIT_CATEGORIES).map(([id, cat]) => [
        id,
        cat.units.map((u) => `${u.id} (${u.symbol})`),
      ]),
    )),
  },
  {
    name: "convert_unit",
    title: "Convert unit",
    description: "Convert an amount between units. Get valid category/unit ids from list_unit_categories first. Examples: length m→ft, weight kg→lb, data GB→GiB, temperature c→f, pressure bar→psi, energy kcal→kj.",
    schema: {
      category: z.enum(["length", "weight", "area", "volume", "speed", "data", "time", "temperature", "pressure", "energy"]),
      from: z.string().describe("source unit id, e.g. 'm', 'kg', 'gb', 'c'"),
      to: z.string().describe("target unit id"),
      amount: z.number().describe("amount to convert"),
    },
    run: (a) => {
      const cat = UNIT_CATEGORIES[a.category];
      if (!cat) return { content: [{ type: "text", text: `unknown category: ${a.category}` }], isError: true };
      const value = convertValue(cat, a.amount, a.from, a.to);
      if (!Number.isFinite(value)) {
        return { content: [{ type: "text", text: `unknown units: ${a.from} → ${a.to} in category ${a.category} — call list_unit_categories for valid ids` }], isError: true };
      }
      return text(num(value));
    },
  },

  // ── 财务 ──
  {
    name: "mortgage_payment",
    title: "Mortgage payment",
    description: "Mortgage payment calculator: monthly principal & interest via standard amortization, plus loan amount, total interest and total paid. Also returns the yearly amortization schedule.",
    schema: {
      home_price: z.number().positive(),
      down_payment: z.number().min(0).describe("down payment in currency units (not %)"),
      annual_rate_pct: z.number().min(0),
      years: z.number().positive(),
    },
    run: (a) => {
      const r = mortgage(a.home_price - a.down_payment, a.annual_rate_pct, a.years);
      if (!Number.isFinite(r.monthlyPI)) {
        return { content: [{ type: "text", text: "invalid input: loan amount (price − down payment) must be positive" }], isError: true };
      }
      return json(r);
    },
  },
  {
    name: "compound_interest",
    title: "Compound interest",
    description: "Compound interest calculator: future value of a lump sum or savings plan with deposits at the start of every month regardless of compounding frequency. Monthly growth uses (1 + nominal annual rate / n)^(n/12); no future deposits are prepaid. Returns total, contributed, interest and a year-by-year schedule.",
    schema: {
      principal: z.number().min(0),
      monthly_contribution: z.number().min(0).describe("monthly deposit"),
      annual_rate_pct: z.number().min(0),
      years: z.number().positive().max(100),
      periods_per_year: z.union([z.literal(1), z.literal(4), z.literal(12)]).default(12),
    },
    run: (a) => {
      const r = compound(a.principal, a.monthly_contribution, a.annual_rate_pct, a.years, a.periods_per_year === 1 ? "annually" : a.periods_per_year === 4 ? "quarterly" : "monthly");
      if (!Number.isFinite(r.total)) {
        return { content: [{ type: "text", text: "invalid input: values must be non-negative and years 1–100" }], isError: true };
      }
      return json(r);
    },
  },
  {
    name: "salary_breakdown",
    title: "Salary to hourly",
    description: "Salary to hourly calculator: break an annual salary down to hourly/daily/weekly/biweekly/monthly. Optional unpaid days off raise the effective hourly rate (same salary over fewer worked days).",
    schema: {
      annual_salary: z.number().positive(),
      hours_per_week: z.number().positive().max(168).default(40),
      weeks_per_year: z.number().positive().max(52).default(52),
      unpaid_days_off: z.number().min(0).default(0),
    },
    run: (a) => json(salaryBreakdown(a.annual_salary, a.hours_per_week, a.weeks_per_year, a.unpaid_days_off)),
  },
  {
    name: "hourly_to_salary",
    title: "Hourly to salary",
    description: "Hourly to salary calculator: convert an hourly rate to daily/weekly/biweekly/monthly/annual pay.",
    schema: {
      hourly_rate: z.number().positive(),
      hours_per_week: z.number().positive().max(168).default(40),
      weeks_per_year: z.number().positive().max(52).default(52),
    },
    run: (a) => json(hourlyToSalary(a.hourly_rate, a.hours_per_week, a.weeks_per_year)),
  },
  {
    name: "break_even",
    title: "Break-even point",
    description: "Break-even units and revenue for fixed costs, unit price and variable unit cost; includes contribution margin and profit at 0.5×/1×/1.5×/2× of break-even volume.",
    schema: {
      fixed_costs: z.number().min(0),
      price_per_unit: z.number().positive(),
      variable_cost_per_unit: z.number().min(0),
    },
    run: (a) => {
      const r = breakEven(a.fixed_costs, a.price_per_unit, a.variable_cost_per_unit);
      if (!Number.isFinite(r.units)) {
        return { content: [{ type: "text", text: "cannot break even: price per unit must exceed variable cost per unit" }], isError: true };
      }
      return json(r);
    },
  },

  // ── 健康(YMYL:描述固定声明是估算)──
  {
    name: "bmr",
    title: "Basal metabolic rate",
    description: "BMR (basal metabolic rate) calculator via the Mifflin-St Jeor equation (1990). Estimate only — not medical advice. Metric units. Adults18+ only; not for pregnancy or breastfeeding.",
    schema: {
      weight_kg: z.number().min(HEALTH_LIMITS.minWeightKg).max(HEALTH_LIMITS.maxWeightKg),
      height_cm: z.number().min(HEALTH_LIMITS.minHeightCm).max(HEALTH_LIMITS.maxHeightCm),
      age: z.number().min(18).max(130).describe("adult age, 18–130 years"),
      sex: z.enum(["male", "female"]),
    },
    run: (a) => {
      const result = bmr(a.weight_kg, a.height_cm, a.age, a.sex);
      if (!Number.isFinite(result) || result <= 0) return { content: [{ type: "text", text: "Invalid adult energy estimate; check the stated measurement limits." }], isError: true };
      return text(num(result) + " kcal/day (Mifflin-St Jeor adult estimate)");
    },
  },
  {
    name: "tdee",
    title: "Daily calorie needs (TDEE)",
    description: "TDEE calculator (daily calorie needs): total daily energy expenditure = BMR (Mifflin-St Jeor) × activity factor (sedentary 1.2 … very active 1.9). Estimate only — not medical advice.",
    schema: {
      weight_kg: z.number().min(HEALTH_LIMITS.minWeightKg).max(HEALTH_LIMITS.maxWeightKg),
      height_cm: z.number().min(HEALTH_LIMITS.minHeightCm).max(HEALTH_LIMITS.maxHeightCm),
      age: z.number().min(18).max(130).describe("adult age, 18–130 years"),
      sex: z.enum(["male", "female"]),
      activity: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
    },
    run: (a) => {
      const activity = { sedentary: "sedentary", light: "lightlyActive", moderate: "moderatelyActive", active: "veryActive", very_active: "extraActive" } as const;
      const result = tdee(bmr(a.weight_kg, a.height_cm, a.age, a.sex), activity[a.activity as keyof typeof activity]);
      if (!Number.isFinite(result) || result <= 0) return { content: [{ type: "text", text: "Invalid adult energy estimate; check the stated measurement limits." }], isError: true };
      return text(num(result) + " kcal/day (adult estimate)");
    },
  },
  {
    name: "body_fat_navy",
    title: "Body fat % (US Navy)",
    description: "Body fat percentage via the US Navy circumference method (Hodgdon & Beckett 1984). Metric cm. Hip is required for female. Estimate only.",
    schema: {
      sex: z.enum(["male", "female"]),
      height_cm: z.number().positive(),
      waist_cm: z.number().positive(),
      neck_cm: z.number().positive(),
      hip_cm: z.number().positive().optional().describe("required for female"),
    },
    run: (a) => {
      const v = navyBodyFat(a.sex, a.height_cm, a.waist_cm, a.neck_cm, a.hip_cm ?? 0);
      return text(num(v) + " % body fat (US Navy method estimate)");
    },
  },
  {
    name: "ideal_weight",
    title: "Ideal weight range",
    description: "Ideal weight by the Devine formula (1975, male and female) plus the healthy BMI 18.5–24.9 range for a given height. Metric cm.",
    schema: { height_cm: z.number().positive() },
    run: (a) => json(idealWeightRange(a.height_cm)),
  },
  {
    name: "water_intake",
    title: "Daily water intake",
    description: "Baseline 35 ml/kg body weight plus ~350 ml per 30 minutes of exercise. Returns baseline, exercise and total ml. General guideline, not medical advice.",
    schema: {
      weight_kg: z.number().positive(),
      exercise_minutes: z.number().min(0).default(0),
    },
    run: (a) => json(waterIntake(a.weight_kg, a.exercise_minutes)),
  },

  // ── 健身 ──
  {
    name: "running_pace",
    title: "Running pace",
    description: "Pace (per km and per mile) and speed from a race distance and finish time. Distance: '5k', '10k', 'half', 'marathon' or custom meters.",
    schema: {
      distance: z.union([z.enum(["5k", "10k", "half", "marathon"]), z.number().describe("custom distance in km")]),
      time_seconds: z.number().positive().describe("finish time in seconds (e.g. 1500 for 25:00)"),
    },
    run: (a) => {
      const km = a.distance === "5k" ? 5 : a.distance === "10k" ? 10 : a.distance === "half" ? 21.0975 : a.distance === "marathon" ? 42.195 : a.distance;
      const p = paceFor(km, a.time_seconds);
      return text(`pace ${formatDuration(p.secPerKm)} /km · ${formatDuration(p.secPerMi)} /mi · speed ${p.kmh} km/h (${p.mph} mph)`);
    },
  },
  {
    name: "race_time_predict",
    title: "Race time prediction",
    description: "Predict a race time from a recent result using Riegel's formula (exponent 1.06). Distances in km (5, 10, 21.0975, 42.195 or custom).",
    schema: {
      known_distance_km: z.number().positive(),
      known_time_seconds: z.number().positive(),
      target_distance_km: z.number().positive(),
    },
    run: (a) => text(formatDuration(riegelPredict(a.known_time_seconds, a.known_distance_km, a.target_distance_km))),
  },
  {
    name: "one_rep_max",
    title: "One-rep max",
    description: "Estimated 1RM from weight lifted and reps (Epley and Brzycki formulas).",
    schema: { weight: z.number().positive(), reps: z.number().int().positive() },
    run: (a) => json(oneRepMax(a.weight, a.reps)),
  },

  // ── 日期 ──
  {
    name: "workdays_between",
    title: "Business days between dates",
    description: "Count working days (Mon–Fri by default) between two ISO dates, inclusive. Optional holidays (YYYY-MM-DD).",
    schema: {
      start: z.string().describe("ISO date YYYY-MM-DD"),
      end: z.string().describe("ISO date YYYY-MM-DD"),
      holidays: z.array(z.string()).default([]),
    },
    run: (a) => json({ workdays: workdaysBetween(a.start, a.end, { holidays: a.holidays }) }),
  },
  {
    name: "add_workdays",
    title: "Add working days",
    description: "Add N working days to an ISO date (negative to subtract). Optional holidays. Returns the resulting ISO date.",
    schema: {
      start: z.string(),
      days: z.number().int(),
      holidays: z.array(z.string()).default([]),
    },
    run: (a) => text(addWorkdays(a.start, a.days, { holidays: a.holidays }) ?? "invalid date"),
  },
  {
    name: "sleep_schedule",
    title: "Sleep schedule",
    description: "Bedtimes to wake at a given time, or wake times if sleeping now — based on 90-minute sleep cycles plus 15 minutes to fall asleep. Cycles vary 80–120 min between individuals.",
    schema: {
      mode: z.enum(["bedtimes", "wake_times"]),
      time: z.string().describe("HH:MM (24h)"),
    },
    run: (a) => {
      const [h, m] = a.time.split(":").map(Number);
      const nowMin = h * 60 + m;
      if (!Number.isInteger(nowMin) || nowMin < 0 || nowMin >= 1440) {
        return { content: [{ type: "text", text: "invalid time — use HH:MM (24h)" }], isError: true };
      }
      const options = a.mode === "bedtimes" ? bedtimesFor(nowMin) : wakeTimesFor(nowMin);
      return json(options.map((o) => ({
        cycles: o.cycles,
        sleep_hours: o.sleepMinutes / 60,
        time: formatHm(o.minutes),
        day_offset: o.minutes < 0 || o.minutes >= 1440 ? 1 : 0,
      })));
    },
  },

  // ── 烹饪 ──
  {
    name: "cooking_convert",
    title: "Cooking conversion",
    description: "Convert between volume and weight for ~24 ingredients (flour, sugar, butter, honey…) using average densities. Units: cup, tbsp, tsp, fl-oz, ml, l, g, kg, oz, lb. Densities are averages — weigh for baking precision.",
    schema: {
      amount: z.number(),
      from: z.string(),
      to: z.string(),
      ingredient: z.string().describe("required for volume↔weight, e.g. flour, sugar, butter, honey"),
    },
    run: (a) => text(num(cookConvert(a.amount, a.from, a.to, a.ingredient ?? "")) + ""),
  },

  // ── 颜色/评分 ──
  {
    name: "contrast_ratio",
    title: "WCAG contrast ratio",
    description: "Contrast ratio between two colors (#RGB/#RRGGBB) with WCAG AA/AAA pass-fail for normal and large text.",
    schema: { foreground: z.string(), background: z.string() },
    run: (a) => {
      const ratio = contrastRatio(a.foreground, a.background);
      return json({ ratio: Math.round(ratio * 100) / 100, ...wcagBadges(ratio) });
    },
  },
  {
    name: "grade",
    title: "Grade calculator",
    description: "Weighted grade from scored items, plus letter grade on a configurable scale.",
    schema: {
      items: z.array(z.object({ score: z.number(), max: z.number().positive(), weight: z.number().positive() })),
      scale: z.enum(["us_10", "plus_minus", "pass_fail"]).default("us_10"),
    },
    run: (a) => {
      const pct = gradePercent(a.items, "weighted");
      const scale = a.scale === "plus_minus" ? PLUS_MINUS_SCALE : a.scale === "pass_fail" ? PASS_FAIL_SCALE : US_SCALE;
      return text(`${num(pct)}% — letter: ${letterFor(pct, scale)}`);
    },
  },

  // ── 文本 ──
  {
    name: "slugify",
    title: "URL slug",
    description: "Turn text into a URL-safe slug (lowercase, accents stripped, hyphens).",
    schema: { text: z.string() },
    run: (a) => text(slugify(a.text)),
  },
  {
    name: "text_stats",
    title: "Word/character statistics",
    description: "Word counter and character counter (CJK-aware, like the website tool): words, characters with/without spaces, sentences, paragraphs, lines, plus unique words, average word length, page estimate (250 words/page) and top keywords with density.",
    schema: { text: z.string() },
    run: (a) => {
      const stats = countTextStats(a.text);
      return json({ ...stats, insights: computeTextInsights(a.text, stats) });
    },
  },
  {
    name: "transform_text",
    title: "Text transform",
    description: "Case and cleanup transforms: title_case, camel, pascal, snake, kebab, dedupe_lines, sort_lines, reverse, clean (collapse spaces/trim), remove_extra_spaces.",
    schema: {
      transform: z.enum(["title_case", "camel", "pascal", "snake", "kebab", "dedupe_lines", "sort_lines", "reverse", "clean", "remove_extra_spaces"]),
      text: z.string(),
    },
    run: (a) => {
      const f: Record<string, (s: string) => string> = {
        title_case: toTitleCase, camel: toCamel, pascal: toPascal, snake: toSnake, kebab: toKebab,
        dedupe_lines: (s) => dedupeLines(s), sort_lines: (s) => sortLines(s, "asc"), reverse: (s) => reverseText(s),
        clean: (s) => cleanText(s, { trimLines: true, collapseSpaces: true, removeEmpty: true }),
        remove_extra_spaces: (s) => removeExtraSpaces(s),
      };
      return text(f[a.transform](a.text));
    },
  },
  {
    name: "parse_csv",
    title: "Parse CSV",
    description: "Parse RFC-4180 CSV (quoted fields, embedded newlines, ,/;/tab delimiter auto-detect) into an array of row objects using the first row as header.",
    schema: { csv: z.string() },
    run: (a) => {
      const rows = parseCsv(a.csv, detectDelimiter(a.csv));
      const [head, ...body] = rows;
      return json(body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""]))));
    },
  },
  {
    name: "json_to_xml",
    title: "JSON to XML",
    description: "Convert a JSON object to XML. Arrays become repeated elements; '@'-prefixed keys become attributes; '#text' becomes text content. Mixed content is not representable.",
    schema: {
      json: z.string().describe("JSON document as a string"),
      root: z.string().default("root").describe("root element name"),
    },
    run: (a) => {
      try {
        return text(jsonToXml(JSON.parse(a.json), { rootName: a.root ?? "root" }));
      } catch (e) {
        return { content: [{ type: "text", text: `invalid JSON: ${(e as Error).message}` }], isError: true };
      }
    },
  },

  // ── 2026-11 新增批次 ──
  {
    name: "overtime_pay",
    title: "Overtime pay",
    description: "Weekly and annualized pay with overtime: hourly rate, overtime hours and a multiplier (US FLSA standard is 1.5× over 40 h/week).",
    schema: {
      hourly_rate: z.number().positive(),
      overtime_hours: z.number().min(0),
      multiplier: z.number().positive().default(1.5),
      regular_hours_per_week: z.number().positive().max(168).default(40),
      weeks_per_year: z.number().positive().max(52).default(52),
    },
    run: (a) => json(overtimePay(a.hourly_rate, a.overtime_hours, a.multiplier, a.regular_hours_per_week, a.weeks_per_year)),
  },
  {
    name: "rent_affordability",
    title: "Rent affordability",
    description: "Maximum rent by an income-share rule (default 30% of monthly income), with debt payments deducted and the resulting debt-to-income share reported.",
    schema: {
      monthly_income: z.number().positive(),
      ratio_pct: z.number().positive().max(100).default(30),
      other_debt_monthly: z.number().min(0).default(0),
    },
    run: (a) => json(rentAffordability(a.monthly_income, a.ratio_pct, a.other_debt_monthly)),
  },
  {
    name: "apy",
    title: "APY from nominal rate",
    description: "APY calculator: effective annual yield from a nominal rate and compounding frequency: APY = (1 + r/n)^n − 1. Also returns the reverse (APY → nominal APR).",
    schema: {
      nominal_rate_pct: z.number().min(0),
      frequency: z.enum(["daily", "monthly", "quarterly", "annually"]).default("monthly"),
    },
    run: (a) => json({
      apy_pct: Math.round(apy(a.nominal_rate_pct, a.frequency) * 10000) / 10000,
      apr_pct: Math.round(aprFromApy(apy(a.nominal_rate_pct, a.frequency), a.frequency) * 10000) / 10000,
    }),
  },
  {
    name: "gpa",
    title: "GPA (4.0 scale)",
    description: "GPA from courses with credits and letter grades (A…F quality points). Invalid courses are dropped and reported.",
    schema: {
      courses: z.array(z.object({ credits: z.number().positive(), letter: z.string() })),
    },
    run: (a) => json(gpaFromCourses(a.courses)),
  },
  {
    name: "heart_rate_zones",
    title: "Heart rate zones",
    description: "Five training zones via Karvonen's heart-rate-reserve method. Max HR defaults to the Tanaka formula (206.9 − 0.67 × age). BPM ranges per zone.",
    schema: {
      age: z.number().int().positive(),
      resting_hr: z.number().min(0).default(60),
    },
    run: (a) => {
      const max = maxHeartRate(a.age);
      return json({
        max_hr: max,
        zones: hrZones(max, a.resting_hr).map((zone) => ({
          id: zone.id, low_bpm: Math.round(zone.low), high_bpm: Math.round(zone.high),
        })),
      });
    },
  },
  {
    name: "shoe_size",
    title: "Shoe size conversion",
    description: "Convert an adult shoe size between US/UK/EU/JP systems for men or women, anchored to foot length in cm. Brands vary ±half size.",
    schema: {
      value: z.number(),
      system: z.enum(["us", "uk", "eu", "jp"]),
      gender: z.enum(["men", "women"]),
    },
    run: (a) => {
      const row = shoeConvert(a.value, a.system, a.gender);
      if (!row) return { content: [{ type: "text", text: "size not found in the conversion table" }], isError: true };
      return json(row);
    },
  },

  {
    name: "social_credit_samples",
    title: "China social credit test samples",
    description: "Generate deterministic local test samples for China's 18-character unified social credit code. This is a format/check-character sample generator, not a registration lookup or authenticity check. Department and category are one outer-table character, address_code is six digits, and start_body is an eight-character organization-code body.",
    schema: {
      department: z.string().describe("one GB 32100 department character"),
      category: z.string().describe("one GB 32100 organization-category character"),
      address_code: z.string().describe("six-digit administrative/address code"),
      start_body: z.string().describe("eight-character organization-code body"),
      count: z.number().int().min(1).max(100).default(1),
    },
    run: (a) => {
      const result = generateSocialCreditSamples({
        department: a.department,
        category: a.category,
        addressCode: a.address_code,
        startBody: a.start_body,
        count: a.count,
      });
      if (result.errors.length) {
        return { content: [{ type: "text", text: JSON.stringify(result) }], isError: true };
      }
      return json(result);
    },
  },
  {
    name: "rmb_uppercase_to_number",
    title: "RMB financial uppercase to number",
    description: "Parse the disclosed strict subset of Chinese RMB financial uppercase spellings into an exact decimal amount, integer fen, normalized input and canonical uppercase. Supports the official appendix examples and limited disclosed traditional variants; it is not a general Chinese-number parser or bank-acceptance guarantee.",
    schema: {
      uppercase: z.string().describe("financial uppercase amount, e.g. 人民币陆仟零柒元壹角肆分"),
    },
    run: (a) => {
      const result = parseRmbUppercase(a.uppercase);
      if (!result.ok) {
        return { content: [{ type: "text", text: JSON.stringify(result) }], isError: true };
      }
      return json(result);
    },
  },

  {
    name: "json_to_typescript",
    title: "JSON to TypeScript",
    description: "Generate TypeScript interfaces from a JSON object: nested objects become named interfaces, arrays of objects merge into one shape, mixed arrays become unions.",
    schema: {
      json: z.string().describe("JSON object as a string (root must be an object)"),
      root_name: z.string().default("Root"),
    },
    run: (a) => {
      try {
        const r = jsonToTs(JSON.parse(a.json), a.root_name ?? "Root");
        return "error" in r
          ? { content: [{ type: "text", text: r.error }], isError: true }
          : text(r.code);
      } catch (e) {
        return { content: [{ type: "text", text: `invalid JSON: ${(e as Error).message}` }], isError: true };
      }
    },
  },
  {
    name: "crc16_modbus",
    title: "CRC-16/Modbus",
    description: "Calculate CRC-16/Modbus from a whitespace-separated hexadecimal byte stream. Returns the conventional 16-bit value and Modbus low-byte-first wire bytes separately. CRC detects transmission errors; it is not encryption or authentication.",
    schema: {
      hex: z.string().max(CRC16_MODBUS_LIMITS.maxBytes * 3).describe("Hexadecimal bytes, e.g. '01 03 00 00 00 0A'; whitespace is ignored."),
    },
    run: (a) => {
      try {
        return json(calculateCrc16Modbus(a.hex));
      } catch (error) {
        return { content: [{ type: "text", text: error instanceof Error ? error.message : "Invalid hexadecimal byte input." }], isError: true };
      }
    },
  },
  {
    name: "image_pixel_color",
    title: "Image pixel color",
    description: "Format one already sampled RGBA image pixel as HEX, HEX8, RGB and RGBA. The website samples local files in the browser; this MCP tool accepts the pixel channels and coordinates directly.",
    schema: {
      x: z.number().int().min(0).max(2_147_483_647).describe("source pixel X coordinate"),
      y: z.number().int().min(0).max(2_147_483_647).describe("source pixel Y coordinate"),
      r: z.number().int().min(0).max(255).describe("red channel 0–255"),
      g: z.number().int().min(0).max(255).describe("green channel 0–255"),
      b: z.number().int().min(0).max(255).describe("blue channel 0–255"),
      a: z.number().int().min(0).max(255).describe("alpha channel 0–255"),
    },
    run: (a) => json(formatPixelColor(a)),
  },
  {
    name: "ipv4_range_expand",
    title: "IPv4 range expander",
    description: "List consecutive IPv4 addresses from a starting address to an ending address, inclusive. Returns the exact total and marks whether the list is truncated. Performs address arithmetic only.",
    schema: {
      start_ip: z.string().trim().max(15).describe("First dotted-decimal IPv4 address, e.g. 192.0.2.5."),
      end_ip: z.string().trim().max(15).describe("Last dotted-decimal IPv4 address, e.g. 192.0.2.10."),
      max_results: z.number().int().min(1).max(MAX_IPV4_RANGE_RESULTS).optional()
        .describe(`Maximum addresses returned; defaults to ${DEFAULT_IPV4_RANGE_RESULTS}, at most ${MAX_IPV4_RANGE_RESULTS}.`),
    },
    run: (a) => {
      const start = ipToInt(a.start_ip);
      const end = ipToInt(a.end_ip);
      if (start === null || end === null) {
        return { content: [{ type: "text", text: "Enter two valid dotted-decimal IPv4 addresses." }], isError: true };
      }
      const range = expandIpRange(start, end, a.max_results ?? DEFAULT_IPV4_RANGE_RESULTS);
      if (!range) {
        return { content: [{ type: "text", text: "The last address must not come before the first." }], isError: true };
      }
      return json({
        startIp: intToIp(start),
        endIp: intToIp(end),
        total: range.total,
        truncated: range.truncated,
        addresses: range.ips.map(intToIp),
      });
    },
  },
  {
    name: "csv_table_transform",
    title: "CSV table editor",
    description: "Transpose a rectangular CSV/TSV matrix or swap two one-based columns. Includes the first row as data, preserves strings without numeric inference, and uses the same delimiter in the output. Requests and responses are limited to 100,000 characters; results are never silently truncated.",
    schema: {
      input: z.string().max(MCP_CSV_CHARACTERS).describe("Delimited text, including quoted multiline fields."),
      operation: z.enum(["transpose", "swap"]),
      delimiter: z.enum([",", ";", "\t"]).optional().describe("Field delimiter; defaults to comma."),
      first_column: z.number().int().min(1).max(1000).optional().describe("One-based first column, required for swap."),
      second_column: z.number().int().min(1).max(1000).optional().describe("One-based second column, required for swap."),
    },
    run: (a) => {
      const result = transformCsvTable(a.input, {
        operation: a.operation, delimiter: a.delimiter,
        firstColumn: a.first_column, secondColumn: a.second_column,
      });
      if (result.error) {
        const messages = {
          input: "Enter CSV or TSV text.",
          delimiter: "Choose comma, semicolon or Tab.",
          operation: "Choose transpose or swap.",
          csv: "Check quoted fields and escaped quotes.",
          ragged: "Every row must have the same number of fields.",
          selection: "For swap, supply two one-based column positions within the table.",
          limit: "The table exceeds the supported row, column, cell or character limits.",
        };
        return { content: [{ type: "text", text: messages[result.error] }], isError: true };
      }
      if (result.out.length > MCP_CSV_CHARACTERS) {
        return { content: [{ type: "text", text: "The transformed text exceeds the 100,000-character MCP response limit. Use a smaller table or the website." }], isError: true };
      }
      return json(result);
    },
  },
  {
    name: "image_palette",
    title: "Raw RGBA image palette",
    description: "Find frequent RGB color groups in a small already decoded RGBA raster, at most 4,096 pixels. Groups use five bits per RGB channel, average original colors with alpha weighting, and ignore fully transparent pixels. Percentages use all visible alpha weight; returned groups may sum to less than 100%. Accepts raw channels, not image files.",
    schema: {
      width: z.number().int().min(1).max(MCP_PALETTE_PIXELS),
      height: z.number().int().min(1).max(MCP_PALETTE_PIXELS),
      rgba: z.array(z.number().int().min(0).max(255)).max(MCP_PALETTE_PIXELS * 4)
        .describe("Row-major red, green, blue, alpha channels, exactly width × height × 4 values."),
      color_count: z.number().int().min(1).max(12).optional().describe("Maximum returned color groups; defaults to eight."),
    },
    run: (a) => {
      try {
        return json(extractImagePalette(a.rgba, a.width, a.height, { colorCount: a.color_count }));
      } catch (error) {
        return { content: [{ type: "text", text: error instanceof Error ? error.message : "Invalid RGBA raster." }], isError: true };
      }
    },
  },
  {
    name: "file_signature",
    title: "File header signature",
    description: "Match supported file-header signatures from up to 65,536 hexadecimal bytes. Returns a generic container for ZIP/OLE rather than guessing Office document types. A null match means unrecognized; this does not validate, repair, decode or assess file safety.",
    schema: {
      hex: z.string().max(FILE_SIGNATURE_READ_LIMIT * 3).describe("Hex bytes with optional whitespace; no 0x prefix."),
    },
    run: (a) => {
      try {
        const bytes = signatureBytesFromHex(a.hex);
        return json({ bytesRead: bytes.length, signature: identifyFileSignature(bytes) });
      } catch (error) {
        return { content: [{ type: "text", text: error instanceof Error ? error.message : "Invalid hexadecimal bytes." }], isError: true };
      }
    },
  },
  {
    name: "add_line_numbers",
    title: "Add text line numbers",
    description: "Add prefix or suffix line numbers while preserving text, Unicode and empty lines. A terminal newline creates a final numbered empty line; CRLF/CR become LF. Padding uses spaces. Empty input returns empty output. Input is limited to 100,000 characters and 10,000 lines; output to 300,000 characters.",
    schema: {
      input: z.string().max(100_000),
      position: z.enum(["prefix", "suffix"]).optional(),
      start: z.number().int().min(0).max(1_000_000_000).optional(),
      step: z.number().int().min(1).max(1_000_000).optional(),
      padding: z.union([z.number().int().min(0).max(12), z.literal("auto")]).optional(),
      separator: z.string().max(64).optional().describe("Literal separator; defaults to period and space."),
    },
    run: (a) => {
      const result = addLineNumbers(a.input, {
        position: a.position, start: a.start, step: a.step, padding: a.padding, separator: a.separator,
      });
      return result.error
        ? { content: [{ type: "text", text: `Line numbering failed: ${result.error}. Check the accepted options and size limits.` }], isError: true }
        : json(result);
    },
  },
  {
    name: "convert_yaml_json",
    title: "Convert JSON and YAML",
    description: "Convert JSON to YAML or a JSON-compatible YAML document to JSON. MCP input and output are limited to 100,000 characters, with additional depth and node limits. Rejects aliases, cyclic values, duplicate keys and numbers that cannot be represented safely. Processes text locally without a network service.",
    schema: {
      input: z.string().max(100_000),
      direction: z.enum(["json2yaml", "yaml2json"]),
    },
    run: async (a) => {
      const result = await convertYamlJson(a.input, a.direction);
      if (result.ok && result.output.length > 100_000) {
        return { content: [{ type: "text", text: "Converted output exceeds the 100,000-character MCP response limit. Use a smaller document or the website." }], isError: true };
      }
      return result.ok ? json({ output: result.output })
        : { content: [{ type: "text", text: `Conversion failed: ${result.error.code}.` }], isError: true };
    },
  },
  {
    name: "json_diff",
    title: "JSON structural diff",
    description: "Compare two JSON documents path by path: added, removed and changed keys with full paths like $.user.name. Arrays compared by index.",
    schema: {
      json_a: z.string().describe("first JSON document"),
      json_b: z.string().describe("second JSON document"),
    },
    run: (a) => {
      try {
        const entries = jsonDiff(JSON.parse(a.json_a), JSON.parse(a.json_b));
        return text(entries.length === 0 ? "identical" : entries.map((e) =>
          `${e.type === "added" ? "+" : e.type === "removed" ? "−" : "~"} ${e.path}${e.type === "changed" ? `  ${e.from} → ${e.to}` : e.type === "added" ? `  ${e.to}` : `  ${e.from}`}`
        ).join("\n"));
      } catch (e) {
        return { content: [{ type: "text", text: `invalid JSON: ${(e as Error).message}` }], isError: true };
      }
    },
  },
  {
    name: "json_query",
    title: "JSON path query",
    description: "Extract a value from JSON by path: $.a.b, $.items[0].id, $['quoted key']. Returns found/value or a plain-language reason.",
    schema: {
      json: z.string().describe("JSON document"),
      path: z.string().describe("path like $.a.b[0] — $ is the root"),
    },
    run: (a) => {
      try {
        const r = jsonQuery(JSON.parse(a.json), a.path);
        return r.found ? text(JSON.stringify(r.value, null, 2)) : { content: [{ type: "text", text: r.error ?? "not found" }], isError: true };
      } catch (e) {
        return { content: [{ type: "text", text: `invalid JSON: ${(e as Error).message}` }], isError: true };
      }
    },
  },
];
