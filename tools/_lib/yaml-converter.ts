import type { LoadOptions, Schema } from "js-yaml";
import { inferCsvValue } from "./csv";
import { JsonFormatLimitError, parseJsonLossless, type JsonLosslessNode } from "./json-format";

export type YamlDirection = "json2yaml" | "yaml2json";
export const YAML_CONVERTER_LIMITS = { input: 100_000, output: 1_000_000, nodes: 100_000, depth: 100 } as const;
export type YamlConversionResult = { ok: true; output: string } | { ok: false; error: { code: string; detail?: string } };
const NUMERIC = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;
class Rejection extends Error { constructor(public code: string) { super(code); } }
const reject = (code: string): never => { throw new Rejection(code); };

function safeNumber(raw: string) {
  if (typeof inferCsvValue(raw) !== "number") reject("number");
}

function checkJson(node: JsonLosslessNode, depth = 0, count = { value: 0 }): void {
  if (++count.value > YAML_CONVERTER_LIMITS.nodes || depth > YAML_CONVERTER_LIMITS.depth) reject("limit");
  if (node.kind === "literal") {
    if (NUMERIC.test(node.raw)) safeNumber(node.raw);
    return;
  }
  if (node.kind === "array") { for (const child of node.items) checkJson(child, depth + 1, count); return; }
  const keys = new Set<string>();
  for (const member of node.members) {
    if (++count.value > YAML_CONVERTER_LIMITS.nodes) reject("limit");
    if (keys.has(member.sortKey)) reject("duplicate");
    keys.add(member.sortKey);
    checkJson(member.value, depth + 1, count);
  }
}

type Event = { type: number; style?: number; anchorStart?: number; tagStart?: number; valueStart?: number; valueEnd?: number };
type YamlV5 = typeof import("js-yaml") & {
  parseEvents(input: string, options: { maxDepth: number }): Event[];
  getScalarValue(input: string, event: Event): string;
  EVENT_ID: { DOCUMENT: number; MAPPING: number; SEQUENCE: number; SCALAR: number; ALIAS: number; POP: number };
  SCALAR_STYLE: { PLAIN: number };
  JSON_SCHEMA: Schema & { resolveImplicitScalarTag(value: string): { value: unknown } };
};

function checkYamlEvents(input: string, yaml: YamlV5): void {
  // The parser also counts document/root frames; product depth counts values.
  const events = yaml.parseEvents(input, { maxDepth: YAML_CONVERTER_LIMITS.depth + 2 });
  const frames: { type: number; key: boolean }[] = [];
  let count = 0;
  for (const event of events) {
    const id = yaml.EVENT_ID;
    if (event.type === id.POP) { frames.pop(); continue; }
    if (event.type === id.DOCUMENT) { frames.push({ type: id.DOCUMENT, key: false }); continue; }
    if (++count > YAML_CONVERTER_LIMITS.nodes) reject("limit");
    if (event.type === id.ALIAS || (event.anchorStart ?? -1) >= 0 || (event.tagStart ?? -1) >= 0) reject("features");
    const parent = frames.at(-1);
    const isKey = parent?.type === id.MAPPING && parent.key;
    if (parent?.type === id.MAPPING) parent.key = !parent.key;
    if (event.type === id.SCALAR) {
      const raw = yaml.getScalarValue(input, event);
      const plain = event.style === yaml.SCALAR_STYLE.PLAIN;
      const value = plain ? yaml.JSON_SCHEMA.resolveImplicitScalarTag(raw).value : raw;
      if (isKey && typeof value !== "string") reject("features");
      if (plain && (typeof value === "number" || NUMERIC.test(raw) || /^[-+]?\.(?:inf|nan)$/i.test(raw))) {
        safeNumber(raw.replace(/\.(?=[eE]|$)/, ".0"));
      }
    } else {
      if (isKey) reject("features");
      frames.push({ type: event.type, key: event.type === id.MAPPING });
    }
  }
}

function checkValue(value: unknown, depth = 0, count = { value: 0 }): void {
  if (++count.value > YAML_CONVERTER_LIMITS.nodes || depth > YAML_CONVERTER_LIMITS.depth) reject("limit");
  if (typeof value === "number" && (!Number.isFinite(value) || Object.is(value, -0) || (Number.isInteger(value) && !Number.isSafeInteger(value)))) reject("number");
  if (value === null || ["string", "boolean", "number"].includes(typeof value)) return;
  if (!value || typeof value !== "object") return reject("features");
  if (Array.isArray(value)) { for (const child of value) checkValue(child, depth + 1, count); }
  else for (const child of Object.values(value)) checkValue(child, depth + 1, count);
}

/** JSON-compatible values only. Parser loading happens when conversion is explicitly requested. */
export async function convertYamlJson(input: string, direction: YamlDirection): Promise<YamlConversionResult> {
  try {
    if (typeof input !== "string" || !["json2yaml", "yaml2json"].includes(direction)) reject("input");
    if (!input.trim()) reject("empty");
    if (input.length > YAML_CONVERTER_LIMITS.input) reject("limit");
    const yaml = await import("js-yaml") as unknown as YamlV5;
    let value: unknown;
    let output: string;
    if (direction === "json2yaml") {
      checkJson(parseJsonLossless(input, true));
      value = JSON.parse(input);
      checkValue(value);
      output = yaml.dump(value, { schema: yaml.JSON_SCHEMA, indent: 2, lineWidth: 80, noRefs: true });
    } else {
      checkYamlEvents(input, yaml);
      const options: LoadOptions & { maxDepth: number; maxAliases: number } = { schema: yaml.JSON_SCHEMA, maxDepth: YAML_CONVERTER_LIMITS.depth + 2, maxAliases: 0 };
      value = yaml.load(input, options);
      checkValue(value);
      output = JSON.stringify(value, null, 2);
    }
    if (output.length > YAML_CONVERTER_LIMITS.output) reject("limit");
    return { ok: true, output };
  } catch (error) {
    const code = error instanceof Rejection ? error.code : error instanceof JsonFormatLimitError || (error instanceof Error && /maxDepth|nesting exceeded/.test(error.message)) ? "limit" : error instanceof Error && /duplicated mapping key/.test(error.message) ? "duplicate" : "syntax";
    return { ok: false, error: { code } };
  }
}
