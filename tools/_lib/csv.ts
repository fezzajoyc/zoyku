import { JSON_FORMAT_LIMITS, JsonFormatLimitError, parseJsonLossless, type JsonLosslessNode } from "./json-format";

export const CSV_DELIMITERS = [",", ";", "\t"] as const;
export type CsvDelimiter = (typeof CSV_DELIMITERS)[number];
export type CsvError = "input" | "delimiter" | "json" | "array" | "duplicate" | "csv" | "headers" | "rows" | "columns" | "limit";
export type CsvResult = { out: string; error: CsvError | null };
export const CSV_LIMITS = Object.freeze({
  inputCharacters: JSON_FORMAT_LIMITS.inputCharacters,
  outputCharacters: JSON_FORMAT_LIMITS.outputCharacters,
  jsonDepth: JSON_FORMAT_LIMITS.maxDepth,
  jsonValues: JSON_FORMAT_LIMITS.maxValues,
});

const NUMERIC = /^(-?)(0|[1-9]\d*)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/;
const fail = (error: CsvError): CsvResult => ({ out: "", error });
const delimiterAllowed = (value: unknown): value is CsvDelimiter => CSV_DELIMITERS.includes(value as CsvDelimiter);

/** Decimal equality, not binary-float equality; spelling such as 1.00 may normalize. */
function decimalValue(text: string): string | null {
  const match = NUMERIC.exec(text);
  if (!match) return null;
  const fraction = match[3] ?? "";
  const digits = (match[2] + fraction).replace(/^0+/, "");
  if (!digits) return "0";
  const coefficient = digits.replace(/0+$/, "");
  const exponent = Number(match[4] ?? "0") - fraction.length + digits.length - coefficient.length;
  return Number.isSafeInteger(exponent) ? `${match[1]}${coefficient}e${exponent}` : null;
}

/** Infer only values that survive JSON serialization without decimal-value loss. */
export function inferCsvValue(value: string): unknown {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  if (!NUMERIC.test(value)) return value;
  const number = Number(value);
  if (!Number.isFinite(number) || Object.is(number, -0) || (Number.isInteger(number) && !Number.isSafeInteger(number))) return value;
  const decimal = decimalValue(value);
  return decimal !== null && decimal === decimalValue(JSON.stringify(number)) ? number : value;
}

/** Quote for the selected delimiter, including headers and embedded CR/LF. */
export function escapeCsvCell(value: string, delimiter: CsvDelimiter): string {
  return value.includes(delimiter) || /["\r\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

function compact(node: JsonLosslessNode): string {
  if (node.kind === "literal") return node.raw;
  if (node.kind === "array") return `[${node.items.map(compact).join(",")}]`;
  return `{${node.members.map(member => `${member.keyRaw}:${compact(member.value)}`).join(",")}}`;
}

function hasDuplicate(node: JsonLosslessNode): boolean {
  if (node.kind === "literal") return false;
  if (node.kind === "array") return node.items.some(hasDuplicate);
  const keys = new Set<string>();
  for (const member of node.members) {
    if (keys.has(member.sortKey)) return true;
    keys.add(member.sortKey);
    if (hasDuplicate(member.value)) return true;
  }
  return false;
}

function cellValue(node: JsonLosslessNode): string {
  if (node.kind !== "literal") return compact(node);
  if (node.raw === "null") return "";
  return node.raw.startsWith('"') ? JSON.parse(node.raw) as string : node.raw;
}

export function jsonToCsv(input: unknown, delimiter: CsvDelimiter = ","): CsvResult {
  if (typeof input !== "string") return fail("input");
  if (!delimiterAllowed(delimiter)) return fail("delimiter");
  if (input.length > CSV_LIMITS.inputCharacters) return fail("limit");
  if (!input.trim()) return { out: "", error: null };
  try {
    const root = parseJsonLossless(input, true);
    if (root.kind !== "array" || root.items.some(row => row.kind !== "object")) return fail("array");
    if (hasDuplicate(root)) return fail("duplicate");
    if (root.items.length === 0) return { out: "", error: null };
    const rows = root.items.filter(row => row.kind === "object");
    const columns = [...new Set(rows.flatMap(row => row.members.map(member => member.sortKey)))];
    if (!columns.length) return fail("columns");
    const chunks: string[] = [];
    let length = 0;
    const write = (text: string) => {
      length += text.length;
      if (length > CSV_LIMITS.outputCharacters) throw new JsonFormatLimitError("output", "CSV output limit");
      chunks.push(text);
    };
    columns.forEach((column, index) => { if (index) write(delimiter); write(escapeCsvCell(column, delimiter) || (columns.length === 1 ? '""' : "")); });
    for (const row of rows) {
      const members = new Map(row.members.map(member => [member.sortKey, member.value]));
      write("\n");
      columns.forEach((column, index) => {
        if (index) write(delimiter);
        const node = members.get(column);
        const cell = node ? escapeCsvCell(cellValue(node), delimiter) : "";
        write(cell || (columns.length === 1 ? '""' : ""));
      });
    }
    return { out: chunks.join(""), error: null };
  } catch (error) {
    return fail(error instanceof JsonFormatLimitError ? "limit" : "json");
  }
}

/** Strict quote boundaries; ignore blank physical lines, preserve quoted empty records. */
function parseRows(text: string, delimiter: CsvDelimiter): string[][] | null {
  const rows: string[][] = [];
  let row: string[] = [], cell = "", state: "start" | "text" | "quoted" | "closed" = "start", started = false;
  const finish = () => {
    if (started) rows.push([...row, cell]);
    row = []; cell = ""; state = "start"; started = false;
  };
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (state === "quoted") {
      if (char === '"') {
        if (text[index + 1] === '"') { cell += '"'; index++; }
        else state = "closed";
      } else cell += char;
      continue;
    }
    if (char === delimiter) { row.push(cell); cell = ""; state = "start"; started = true; continue; }
    if (char === "\r" || char === "\n") { if (char === "\r" && text[index + 1] === "\n") index++; finish(); continue; }
    if (state === "closed") return null;
    if (char === '"') { if (state !== "start") return null; state = "quoted"; started = true; continue; }
    cell += char; state = "text"; started = true;
  }
  if (state === "quoted") return null;
  finish();
  return rows;
}

export { parseRows as parseCsvRows };

/** JSON.stringify string length, including well-formed lone-surrogate escapes. */
function jsonStringLength(value: string): number {
  let length = 2;
  for (let index = 0; index < value.length; index++) {
    const code = value.charCodeAt(index);
    if (code === 34 || code === 92 || [8, 9, 10, 12, 13].includes(code)) length += 2;
    else if (code < 32) length += 6;
    else if (code >= 0xd800 && code <= 0xdbff && value.charCodeAt(index + 1) >= 0xdc00 && value.charCodeAt(index + 1) <= 0xdfff) { length += 2; index++; }
    else length += code >= 0xd800 && code <= 0xdfff ? 6 : 1;
  }
  return length;
}

export function csvToJson(input: unknown, delimiter: CsvDelimiter = ","): CsvResult {
  if (typeof input !== "string") return fail("input");
  if (!delimiterAllowed(delimiter)) return fail("delimiter");
  if (input.length > CSV_LIMITS.inputCharacters) return fail("limit");
  if (!input.trim()) return { out: "", error: null };
  const rows = parseRows(input.startsWith("\uFEFF") ? input.slice(1) : input, delimiter);
  if (rows === null) return fail("csv");
  if (!rows.length) return fail("rows");
  const header = rows[0].map((value, index) => value.trim() || `column${index + 1}`);
  if (new Set(header).size !== header.length) return fail("headers");
  if (rows.some(row => row.length !== header.length)) return fail("csv");
  const count = rows.length - 1;
  if (!count) return { out: "[]", error: null };
  // Exact 2-space pretty-JSON budget. Repeated headers can expand a tiny CSV
  // enormously, so reject before constructing objects or serializing a table.
  const keysLength = header.reduce((sum, key) => sum + jsonStringLength(key), 0);
  let length = 4 + count * (6 + 8 * header.length + keysLength) + 2 * (count - 1);
  if (length > CSV_LIMITS.outputCharacters) return fail("limit");
  for (let index = 1; index < rows.length; index++) for (const cell of rows[index]) {
    const value = inferCsvValue(cell);
    length += typeof value === "string" ? jsonStringLength(value) : JSON.stringify(value).length;
    if (length > CSV_LIMITS.outputCharacters) return fail("limit");
  }
  const chunks = ["[\n"];
  for (let index = 1; index < rows.length; index++) {
    const record = Object.fromEntries(header.map((key, column) => [key, inferCsvValue(rows[index][column])]));
    if (index > 1) chunks.push(",\n");
    chunks.push("  " + JSON.stringify(record, null, 2).replaceAll("\n", "\n  "));
  }
  chunks.push("\n]");
  return { out: chunks.join(""), error: null };
}
