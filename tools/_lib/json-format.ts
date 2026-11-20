/**
 * Strict JSON formatting that only changes insignificant whitespace and,
 * when explicitly requested, object-member order. Literals are never rebuilt
 * from JavaScript values, so number spelling, escapes and duplicates survive.
 */

/** Character limits count JavaScript UTF-16 code units, not bytes/code points. */
export const JSON_FORMAT_LIMITS = Object.freeze({
  inputCharacters: 1_000_000,
  outputCharacters: 4_000_000,
  maxDepth: 200,
  /** Every value, including object/array containers; object keys are excluded. */
  maxValues: 100_000,
});

export type JsonFormatLimitKind = "input" | "output" | "depth" | "values";

/** Resource rejections must bypass the more permissive diagnostic scanner. */
export class JsonFormatLimitError extends Error {
  constructor(public readonly kind: JsonFormatLimitKind, message: string) {
    super(message);
    this.name = "JsonFormatLimitError";
  }
}

export type JsonFormatOptions = {
  indent?: number | "\t";
  sortKeys?: boolean;
  minify?: boolean;
};

type Member = { keyRaw: string; sortKey: string; order: number; value: JsonNode };
type JsonNode =
  | { kind: "literal"; raw: string }
  | { kind: "array"; items: JsonNode[] }
  | { kind: "object"; members: Member[] };

/** Ordered, literal-preserving tree; decoded keys are optional for consumers. */
export type JsonLosslessNode = JsonNode;

/**
 * Parses into ordered member lists rather than assigning untrusted object
 * keys. JSON.parse is used only to decode a validated key string for sorting;
 * its object/number result is never used to construct the output.
 * SyntaxError is translated to the existing line/column diagnostics by the
 * public transforms; limit errors remain explicit and are never truncated.
 */
export function parseJsonLossless(source: string, decodeKeys = false): JsonLosslessNode {
  if (source.length > JSON_FORMAT_LIMITS.inputCharacters) {
    throw new JsonFormatLimitError("input", "JSON input exceeds the maximum of 1,000,000 UTF-16 code units. Reduce the input size.");
  }

  let index = 0;
  let values = 0;
  const length = source.length;
  const number = /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/y;

  const syntax = (message: string): never => {
    throw new SyntaxError(`${message} at character ${index + 1}`);
  };

  const skipWhitespace = () => {
    while (index < length) {
      const code = source.charCodeAt(index);
      if (code !== 32 && code !== 9 && code !== 10 && code !== 13) break;
      index++;
    }
  };

  const readString = (): string => {
    const start = index++;
    while (index < length) {
      const code = source.charCodeAt(index);
      if (code === 34) {
        index++;
        return source.slice(start, index);
      }
      if (code === 92) {
        const escape = source[index + 1];
        if (escape === undefined) return syntax("Unterminated string");
        if ('"\\/bfnrt'.includes(escape)) {
          index += 2;
          continue;
        }
        if (escape === "u" && /^[0-9a-fA-F]{4}$/.test(source.slice(index + 2, index + 6))) {
          index += 6;
          continue;
        }
        return syntax("Invalid string escape");
      }
      if (code < 0x20) return syntax("Unescaped control character in string");
      index++;
    }
    return syntax("Unterminated string");
  };

  const parseValue = (depth: number): JsonNode => {
    skipWhitespace();
    if (++values > JSON_FORMAT_LIMITS.maxValues) {
      throw new JsonFormatLimitError("values", "JSON exceeds the maximum value count of 100,000, including object and array containers. Reduce the input size.");
    }
    const char = source[index];
    if (char === "{" || char === "[") {
      if (depth >= JSON_FORMAT_LIMITS.maxDepth) {
        throw new JsonFormatLimitError("depth", "JSON exceeds the maximum nesting depth of 200. Reduce nesting.");
      }
      index++;
      skipWhitespace();
      if (char === "[") {
        const items: JsonNode[] = [];
        if (source[index] === "]") {
          index++;
          return { kind: "array", items };
        }
        for (;;) {
          items.push(parseValue(depth + 1));
          skipWhitespace();
          if (source[index] === "]") {
            index++;
            return { kind: "array", items };
          }
          if (source[index] !== ",") return syntax("Expected ',' or ']'");
          index++;
        }
      }
      const members: Member[] = [];
      if (source[index] === "}") {
        index++;
        return { kind: "object", members };
      }
      for (;;) {
        skipWhitespace();
        if (source[index] !== '"') return syntax("Expected property name");
        const keyRaw = readString();
        skipWhitespace();
        if (source[index] !== ":") return syntax("Expected ':' after property name");
        index++;
        members.push({
          keyRaw,
          sortKey: decodeKeys ? JSON.parse(keyRaw) as string : "",
          order: members.length,
          value: parseValue(depth + 1),
        });
        skipWhitespace();
        if (source[index] === "}") {
          index++;
          return { kind: "object", members };
        }
        if (source[index] !== ",") return syntax("Expected ',' or '}'");
        index++;
      }
    }
    if (char === '"') return { kind: "literal", raw: readString() };
    if (char === "-" || (char >= "0" && char <= "9")) {
      number.lastIndex = index;
      const match = number.exec(source);
      if (!match) return syntax("Invalid number");
      index = number.lastIndex;
      return { kind: "literal", raw: match[0] };
    }
    for (const keyword of ["true", "false", "null"]) {
      if (source.startsWith(keyword, index)) {
        index += keyword.length;
        return { kind: "literal", raw: keyword };
      }
    }
    return syntax(index >= length ? "Unexpected end of input" : "Unexpected token");
  };

  const root = parseValue(0);
  skipWhitespace();
  if (index < length) return syntax("Unexpected content after JSON value");
  return root;
}

export function formatJsonLossless(source: string, options: JsonFormatOptions = {}): string {
  const sortKeys = options.sortKeys === true;
  const root = parseJsonLossless(source, sortKeys);

  // Match JSON.stringify's bounded numeric indentation contract, without
  // using its value serialization. The UI supplies 2, 4, or a single tab.
  const indent = options.indent ?? 2;
  const width = typeof indent === "number" ? Math.min(10, Math.max(0, Math.trunc(indent) || 0)) : 0;
  const unit = options.minify ? "" : indent === "\t" ? "\t" : " ".repeat(width);
  const chunks: string[] = [];
  let outputLength = 0;
  const write = (text: string) => {
    if (outputLength + text.length > JSON_FORMAT_LIMITS.outputCharacters) {
      throw new JsonFormatLimitError("output", "JSON output exceeds the maximum of 4,000,000 UTF-16 code units. Reduce the input size or indentation.");
    }
    outputLength += text.length;
    chunks.push(text);
  };
  const newline = (depth: number) => {
    if (unit) {
      write("\n");
      write(unit.repeat(depth));
    }
  };
  const render = (node: JsonNode, depth: number): void => {
    if (node.kind === "literal") {
      write(node.raw);
      return;
    }
    if (node.kind === "array") {
      write("[");
      node.items.forEach((item, position) => {
        if (position) write(",");
        newline(depth + 1);
        render(item, depth + 1);
      });
      if (node.items.length) newline(depth);
      write("]");
      return;
    }
    const members = sortKeys
      ? [...node.members].sort((a, b) => a.sortKey < b.sortKey ? -1 : a.sortKey > b.sortKey ? 1 : a.order - b.order)
      : node.members;
    write("{");
    members.forEach((member, position) => {
      if (position) write(",");
      newline(depth + 1);
      write(member.keyRaw);
      write(unit ? ": " : ":");
      render(member.value, depth + 1);
    });
    if (members.length) newline(depth);
    write("}");
  };
  render(root, 0);
  return chunks.join("");
}
