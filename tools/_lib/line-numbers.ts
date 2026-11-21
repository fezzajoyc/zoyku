/** Evidence: LDDGO-01-025 in docs/research/2026-11-21-lddgo-catalog-matrix.json. */
export const LINE_NUMBERS_LIMITS = Object.freeze({
  inputCharacters: 100_000, outputCharacters: 300_000, lines: 10_000,
  start: 1_000_000_000, step: 1_000_000, padding: 12, separatorCharacters: 64,
});
export type LineNumbersOptions = {
  position?: "prefix" | "suffix";
  start?: number;
  step?: number;
  /** Minimum number-column width, padded with spaces; auto uses the last number. */
  padding?: number | "auto";
  /** Literal text, with no template, escape-sequence or regular-expression processing. */
  separator?: string;
};
export type LineNumbersError = "input-type" | "input-limit" | "line-limit" | "options" | "position" | "start" | "step" | "padding" | "separator" | "number-limit" | "output-limit";
export type LineNumbersResult = { out: string; error: LineNumbersError | null; lineCount: number };
export function addLineNumbers(input: unknown, options: LineNumbersOptions = {}): LineNumbersResult {
  const fail = (error: LineNumbersError): LineNumbersResult => ({ out: "", error, lineCount: 0 });
  if (typeof input !== "string") return fail("input-type");
  if (input.length > LINE_NUMBERS_LIMITS.inputCharacters) return fail("input-limit");
  if (typeof options !== "object" || options === null || Array.isArray(options)) return fail("options");
  const position = options.position === undefined ? "prefix" : options.position;
  const start = options.start === undefined ? 1 : options.start;
  const step = options.step === undefined ? 1 : options.step;
  const padding = options.padding === undefined ? 0 : options.padding;
  const separator = options.separator === undefined ? ". " : options.separator;
  if (position !== "prefix" && position !== "suffix") return fail("position");
  if (!Number.isInteger(start) || start < 0 || start > LINE_NUMBERS_LIMITS.start) return fail("start");
  if (!Number.isInteger(step) || step < 1 || step > LINE_NUMBERS_LIMITS.step) return fail("step");
  if (padding !== "auto" && (!Number.isInteger(padding) || padding < 0 || padding > LINE_NUMBERS_LIMITS.padding)) return fail("padding");
  if (typeof separator !== "string" || separator.length > LINE_NUMBERS_LIMITS.separatorCharacters) return fail("separator");
  if (input === "") return { out: "", error: null, lineCount: 0 };

  // Literal replacements only: a final newline deliberately creates an empty line.
  const normalized = input.split("\r\n").join("\n").split("\r").join("\n");
  const lines = normalized.split("\n");
  if (lines.length > LINE_NUMBERS_LIMITS.lines) return fail("line-limit");
  const last = start + (lines.length - 1) * step;
  if (!Number.isSafeInteger(last)) return fail("number-limit");
  const width = padding === "auto" ? String(last).length : padding;

  // Check the output bound before constructing large strings; no partial output.
  let size = normalized.length + lines.length * separator.length;
  for (let index = 0; index < lines.length; index++) {
    size += Math.max(width, String(start + index * step).length);
    if (size > LINE_NUMBERS_LIMITS.outputCharacters) return fail("output-limit");
  }
  const out = lines.map((line, index) => {
    const number = String(start + index * step).padStart(width, " ");
    return position === "prefix" ? number + separator + line : line + separator + number;
  }).join("\n");
  return { out, error: null, lineCount: lines.length };
}
