import { CSV_DELIMITERS, escapeCsvCell, parseCsvRows, type CsvDelimiter } from "./csv";

export const CSV_TABLE_LIMITS = Object.freeze({
  inputCharacters: 1_000_000,
  outputCharacters: 4_000_000,
  maxCells: 100_000,
  maxRows: 10_000,
  maxColumns: 1_000,
});

export type CsvTableOperation = "transpose" | "swap";
export type CsvTableOptions = {
  operation: CsvTableOperation;
  delimiter?: CsvDelimiter;
  /** One-based column positions; required for swap, ignored for transpose. */
  firstColumn?: number;
  secondColumn?: number;
};
export type CsvTableError = "input" | "delimiter" | "operation" | "csv" | "ragged" | "selection" | "limit";
export type CsvTableResult = { out: string; error: CsvTableError | null; rows: number; columns: number };

const fail = (error: CsvTableError): CsvTableResult => ({ out: "", error, rows: 0, columns: 0 });
const empty = (): CsvTableResult => ({ out: "", error: null, rows: 0, columns: 0 });

/** Rearrange a rectangular text matrix without header handling or type inference. */
export function transformCsvTable(input: unknown, options: CsvTableOptions): CsvTableResult {
  if (typeof input !== "string") return fail("input");
  if (!options || !["transpose", "swap"].includes(options.operation)) return fail("operation");
  const delimiter = options.delimiter ?? ",";
  if (!CSV_DELIMITERS.includes(delimiter)) return fail("delimiter");
  if (input.length > CSV_TABLE_LIMITS.inputCharacters) return fail("limit");
  const table = parseCsvRows(input, delimiter);
  if (!table) return fail("csv");
  if (table.length === 0) return empty();
  const height = table.length, width = table[0].length;
  if (height > CSV_TABLE_LIMITS.maxRows || width > CSV_TABLE_LIMITS.maxColumns) return fail("limit");
  if (table.some(row => row.length !== width)) return fail("ragged");
  if (height * width > CSV_TABLE_LIMITS.maxCells) return fail("limit");
  const rows = options.operation === "transpose" ? width : height;
  const columns = options.operation === "transpose" ? height : width;
  if (rows > CSV_TABLE_LIMITS.maxRows || columns > CSV_TABLE_LIMITS.maxColumns) return fail("limit");
  const first = options.firstColumn, second = options.secondColumn;
  if (options.operation === "swap" && [first, second].some(column => !Number.isSafeInteger(column) || column! < 1 || column! > width)) return fail("selection");
  const firstIndex = (first ?? 1) - 1, secondIndex = (second ?? 1) - 1;

  const chunks: string[] = [];
  let length = 0;
  for (let row = 0; row < rows; row++) {
    if (row > 0) { chunks.push("\n"); length++; }
    for (let column = 0; column < columns; column++) {
      if (column > 0) { chunks.push(delimiter); length++; }
      const sourceColumn = column === firstIndex ? secondIndex : column === secondIndex ? firstIndex : column;
      const value = options.operation === "transpose" ? table[column][row] : table[row][sourceColumn];
      // An unquoted empty one-cell row is a blank physical line and would vanish.
      const encoded = escapeCsvCell(value, delimiter) || (columns === 1 ? '""' : "");
      length += encoded.length;
      if (length > CSV_TABLE_LIMITS.outputCharacters) return fail("limit");
      chunks.push(encoded);
    }
  }
  return { out: chunks.join(""), error: null, rows, columns };
}
