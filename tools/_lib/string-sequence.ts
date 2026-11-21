export const SEQUENCE_LIMITS = Object.freeze({ count: 10000, numericCharacters: 96, digits: 60, decimalPlaces: 18, integerWidth: 60, affixCharacters: 128, separatorCharacters: 128, outputCharacters: 500000 });
export type TextSequenceOptions = { start: string; step: string; count: number; integerWidth?: number; prefix?: string; suffix?: string; separator?: string };
export type SequenceError = "options" | "start" | "step" | "numeric-limit" | "count" | "width" | "affix" | "separator" | "output-limit";
export type TextSequenceResult = { out: string; error: SequenceError | null; count: number; first: string; last: string };
type Decimal = { units: bigint; scale: number };
/** Mirrors parseLocaleNumber's comma/dot normalization, without Number conversion. */
function decimal(raw: unknown): Decimal | "format" | "limit" {
  if (typeof raw !== "string") return "format";
  if (raw.length > SEQUENCE_LIMITS.numericCharacters) return "limit";
  let text = raw.trim();
  const comma = text.lastIndexOf(","), dot = text.lastIndexOf(".");
  if (comma > dot) {
    const commas = text.split(",").length - 1;
    text = commas === 1 && text.slice(comma + 1).length !== 3 ? text.split(".").join("").replace(",", ".") : text.split(",").join("").split(".").join("");
  } else if (dot > comma) {
    text = text.split(".").length === 2 ? text.split(",").join("") : text.split(",").join("").split(".").join("");
  }
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) return "format";
  const sign = text.startsWith("-") ? -1n : 1n;
  text = text.replace(/^[+-]/, "");
  const [whole, fraction = ""] = text.split(".");
  const digits = (whole + fraction).replace(/^0+/, "") || "0";
  if (digits.length > SEQUENCE_LIMITS.digits || fraction.length > SEQUENCE_LIMITS.decimalPlaces) return "limit";
  return { units: BigInt(digits) * sign, scale: fraction.length };
}
function formatDecimal(units: bigint, scale: number, width: number): string {
  const negative = units < 0n;
  let digits = (negative ? -units : units).toString().padStart(scale + 1, "0");
  const whole = (scale ? digits.slice(0, -scale) : digits).padStart(width, "0");
  digits = scale ? digits.slice(-scale).replace(/0+$/, "") : "";
  return (negative ? "-" : "") + whole + (digits ? "." + digits : "");
}
export function generateTextSequence(options: TextSequenceOptions): TextSequenceResult {
  const fail = (error: SequenceError): TextSequenceResult => ({ out: "", error, count: 0, first: "", last: "" });
  if (!options || typeof options !== "object" || Array.isArray(options)) return fail("options");
  const start = decimal(options.start), step = decimal(options.step);
  if (start === "limit" || step === "limit") return fail("numeric-limit");
  if (start === "format") return fail("start");
  if (step === "format") return fail("step");
  if (!Number.isInteger(options.count) || options.count < 1 || options.count > SEQUENCE_LIMITS.count) return fail("count");
  const width = options.integerWidth === undefined ? 1 : options.integerWidth;
  if (!Number.isInteger(width) || width < 1 || width > SEQUENCE_LIMITS.integerWidth) return fail("width");
  const prefix = options.prefix === undefined ? "" : options.prefix, suffix = options.suffix === undefined ? "" : options.suffix;
  const separator = options.separator === undefined ? "\n" : options.separator;
  if (typeof prefix !== "string" || typeof suffix !== "string" || prefix.length > SEQUENCE_LIMITS.affixCharacters || suffix.length > SEQUENCE_LIMITS.affixCharacters) return fail("affix");
  if (typeof separator !== "string" || separator.length > SEQUENCE_LIMITS.separatorCharacters) return fail("separator");
  const scale = Math.max(start.scale, step.scale);
  const initial = start.units * 10n ** BigInt(scale - start.scale);
  const increment = step.units * 10n ** BigInt(scale - step.scale);
  const values: string[] = [];
  let size = (options.count - 1) * separator.length;
  for (let index = 0; index < options.count; index++) {
    const value = formatDecimal(initial + BigInt(index) * increment, scale, width);
    size += prefix.length + value.length + suffix.length;
    if (size > SEQUENCE_LIMITS.outputCharacters) return fail("output-limit");
    values.push(value);
  }
  return { out: values.map(value => prefix + value + suffix).join(separator), error: null, count: values.length, first: values[0], last: values[values.length - 1] };
}
