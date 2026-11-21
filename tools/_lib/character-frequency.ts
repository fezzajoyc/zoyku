export const FREQUENCY_LIMITS = Object.freeze({ inputCharacters: 100000, distinct: 4096, displayRows: 500, outputCharacters: 500000 });
export type CharacterFrequencyOptions = { ignoreWhitespace?: boolean; caseMode?: "preserve" | "lower"; sort?: "count-desc" | "count-asc" | "codepoint" | "first"; limit?: number };
export type FrequencyRow = { character: string; codepoint: string; count: number; share: number };
export type FrequencyError = "input-type" | "input-limit" | "options" | "distinct-limit";
export type CharacterFrequencyResult = { rows: FrequencyRow[]; error: FrequencyError | null; rawCodePoints: number; total: number; distinct: number; shown: number; truncated: boolean };
export function countCharacterFrequency(input: unknown, options: CharacterFrequencyOptions = {}): CharacterFrequencyResult {
  const fail = (error: FrequencyError): CharacterFrequencyResult => ({ rows: [], error, rawCodePoints: 0, total: 0, distinct: 0, shown: 0, truncated: false });
  if (typeof input !== "string") return fail("input-type");
  if (input.length > FREQUENCY_LIMITS.inputCharacters) return fail("input-limit");
  if (!options || typeof options !== "object" || Array.isArray(options)) return fail("options");
  const ignore = options.ignoreWhitespace === undefined ? false : options.ignoreWhitespace;
  const caseMode = options.caseMode === undefined ? "preserve" : options.caseMode;
  const sort = options.sort === undefined ? "count-desc" : options.sort;
  const limit = options.limit === undefined ? 100 : options.limit;
  if (typeof ignore !== "boolean" || !["preserve", "lower"].includes(caseMode) || !["count-desc", "count-asc", "codepoint", "first"].includes(sort) || !Number.isInteger(limit) || limit < 1 || limit > FREQUENCY_LIMITS.displayRows) return fail("options");
  const rawCodePoints = [...input].length;
  const text = caseMode === "lower" ? input.toLowerCase() : input;
  const counts = new Map<string, { count: number; first: number }>();
  let total = 0;
  for (const character of text) {
    if (ignore && /^\s$/u.test(character)) continue;
    total++;
    const known = counts.get(character);
    if (known) known.count++;
    else {
      if (counts.size >= FREQUENCY_LIMITS.distinct) return fail("distinct-limit");
      counts.set(character, { count: 1, first: counts.size });
    }
  }
  const entries = [...counts.entries()];
  entries.sort(([ca, a], [cb, b]) => sort === "codepoint" ? ca.codePointAt(0)! - cb.codePointAt(0)! : sort === "first" ? a.first - b.first : (sort === "count-desc" ? b.count - a.count : a.count - b.count) || a.first - b.first);
  const rows = entries.map(([character, { count }]) => ({ character, codepoint: "U+" + character.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0"), count, share: count / total }));
  return { rows, error: null, rawCodePoints, total, distinct: rows.length, shown: Math.min(rows.length, limit), truncated: rows.length > limit };
}
/** Exports all rows; JSON character notation makes control/space/quote rows unambiguous. */
export function exportCharacterFrequency(result: CharacterFrequencyResult, format: "csv" | "txt"): string {
  if (result.error || !result.rows.length || (format !== "csv" && format !== "txt")) return "";
  const fields = [["character_json", "codepoint", "count", "share"], ...result.rows.map(row => [JSON.stringify(row.character), row.codepoint, String(row.count), String(Number(row.share.toPrecision(12)))])];
  const out = format === "txt" ? fields.map(row => row.join("\t")).join("\n") : fields.map(row => row.map(value => /[",\r\n]/.test(value) ? '"' + value.replace(/"/g, '""') + '"' : value).join(",")).join("\r\n");
  return out.length <= FREQUENCY_LIMITS.outputCharacters ? out : "";
}
