export const TEXT_LINE_FILTER_LIMITS = Object.freeze({ inputCharacters: 100_000, outputCharacters: 200_000, lines: 10_000, queryCharacters: 128, delimiterCharacters: 128, column: 10_000 });
export type TextLineFilterOptions =
  | { mode: "contains"; query: string; action: "include" | "exclude"; caseSensitive: boolean }
  | { mode: "range"; from: number; to: number }
  | { mode: "length"; min: number; max: number }
  | { mode: "column"; delimiter: string; column: number; missingColumn: "reject" | "empty" };
export type TextLineFilterError = "input-type" | "options" | "input-limit" | "line-limit" | "mode" | "query" | "range" | "length" | "delimiter" | "column" | "missing-column" | "output-limit";
export type TextLineFilterResult = { out: string; error: TextLineFilterError | null; inputLines: number; outputLines: number };
export function filterTextLines(input: unknown, options: TextLineFilterOptions): TextLineFilterResult {
  const fail = (error: TextLineFilterError, inputLines = 0): TextLineFilterResult => ({ out: "", error, inputLines, outputLines: 0 });
  if (typeof input !== "string") return fail("input-type");
  if (input.length > TEXT_LINE_FILTER_LIMITS.inputCharacters) return fail("input-limit");
  if (typeof options !== "object" || options === null || Array.isArray(options)) return fail("options");
  switch (options.mode) {
    case "contains":
      if (typeof options.query !== "string" || options.query.length === 0 || options.query.length > TEXT_LINE_FILTER_LIMITS.queryCharacters ||
          (options.action !== "include" && options.action !== "exclude") || typeof options.caseSensitive !== "boolean") return fail("query");
      break;
    case "range":
      if (!Number.isInteger(options.from) || !Number.isInteger(options.to) || options.from < 1 || options.to < options.from || options.to > TEXT_LINE_FILTER_LIMITS.lines) return fail("range");
      break;
    case "length":
      if (!Number.isInteger(options.min) || !Number.isInteger(options.max) || options.min < 0 || options.max < options.min || options.max > TEXT_LINE_FILTER_LIMITS.inputCharacters) return fail("length");
      break;
    case "column":
      if (typeof options.delimiter !== "string" || options.delimiter.length === 0 || options.delimiter.length > TEXT_LINE_FILTER_LIMITS.delimiterCharacters) return fail("delimiter");
      if (!Number.isInteger(options.column) || options.column < 1 || options.column > TEXT_LINE_FILTER_LIMITS.column ||
          (options.missingColumn !== "reject" && options.missingColumn !== "empty")) return fail("column");
      break;
    default: return fail("mode");
  }
  if (input === "") return { out: "", error: null, inputLines: 0, outputLines: 0 };
  // Split literal newline sequences. A trailing newline leaves a final empty line.
  const lines = input.split("\r\n").join("\n").split("\r").join("\n").split("\n");
  if (lines.length > TEXT_LINE_FILTER_LIMITS.lines) return fail("line-limit");
  let selected: string[];
  switch (options.mode) {
    case "contains": {
      const query = options.caseSensitive ? options.query : options.query.toLowerCase();
      selected = lines.filter((line) => {
        const matches = (options.caseSensitive ? line : line.toLowerCase()).includes(query);
        return options.action === "include" ? matches : !matches;
      });
      break;
    }
    case "range":
      if (options.to > lines.length) return fail("range", lines.length);
      selected = lines.slice(options.from - 1, options.to);
      break;
    case "length":
      selected = lines.filter((line) => { const size = [...line].length; return size >= options.min && size <= options.max; });
      break;
    case "column":
      selected = [];
      for (const line of lines) {
        const columns = line.split(options.delimiter);
        if (options.column > columns.length && options.missingColumn === "reject") return fail("missing-column", lines.length);
        selected.push(columns[options.column - 1] ?? "");
      }
      break;
  }
  const size = selected.reduce((sum, line) => sum + line.length, Math.max(0, selected.length - 1));
  if (size > TEXT_LINE_FILTER_LIMITS.outputCharacters) return fail("output-limit", lines.length);
  return { out: selected.join("\n"), error: null, inputLines: lines.length, outputLines: selected.length };
}
