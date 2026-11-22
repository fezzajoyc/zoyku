/**
 * CN-032:JSON → Java / C# / Golang 类生成器(纯 TS,零依赖)。
 * 三种目标语言,类型推断(含数组元素合并、null 弱化),PascalCase 类名,camelCase/PascalCase 字段名。
 * 根必须为对象(与 TOML 同理);数组根可包一层 items。
 */

export type CodeLang = "java" | "csharp" | "go";

export type CodeGenResult =
  | { ok: true; code: string }
  | { ok: false; code: "empty" | "badJson" | "notObject" | "tooLong"; message?: string };

const MAX_INPUT = 512_000;

export const CODE_LANGS: CodeLang[] = ["java", "csharp", "go"];

function pascalCase(s: string): string {
  return s
    .replace(/[^a-zA-Z0-9]+(.)?/g, (_, ch) => (ch ? ch.toUpperCase() : ""))
    .replace(/^(.)/, (ch) => ch.toUpperCase())
    .replace(/^(.)/, (ch) => ch.toUpperCase()) || "Item";
}

function camelCase(s: string): string {
  const pc = pascalCase(s);
  return pc.charAt(0).toLowerCase() + pc.slice(1);
}

function safeGoName(s: string): string {
  return pascalCase(s).replace(/[^a-zA-Z0-9]/g, "") || "Field";
}

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

/** 推断 JSON 值的类型标签,合并数组内多对象字段。 */
function inferType(value: Json, className: string, lang: CodeLang): string {
  if (value === null) return lang === "java" ? "Object" : lang === "csharp" ? "object" : "interface{}";
  if (typeof value === "string") return "string";
  if (typeof value === "boolean") return lang === "java" ? "boolean" : "bool";
  if (typeof value === "number") {
    if (Number.isInteger(value)) return lang === "java" ? "int" : lang === "csharp" ? "int" : "int";
    return "double";
  }
  if (Array.isArray(value)) {
    // 合并数组内所有对象的字段
    const objects = value.filter((v): v is { [key: string]: Json } => v !== null && typeof v === "object" && !Array.isArray(v));
    if (objects.length > 0) {
      return pascalCase(className) + (lang === "go" ? "" : "");
    }
    // 标量数组:取第一个非 null 元素类型
    const first = value.find((v) => v !== null);
    if (first === undefined) return lang === "java" ? "List<Object>" : lang === "csharp" ? "List<object>" : "[]interface{}";
    const elem = inferType(first, className, lang);
    if (lang === "java") return `List<${elem}>`;
    if (lang === "csharp") return `List<${elem}>`;
    return `[]${elem}`;
  }
  return pascalCase(className); // 嵌套对象 → 类名
}

/** 收集嵌套对象字段生成类定义(Java 风格)。 */
function emitJava(obj: { [key: string]: Json }, className: string, out: string[], visited: Set<string>): void {
  const fields: string[] = [];
  const nested: Array<[string, { [key: string]: Json }]> = [];
  for (const [key, value] of Object.entries(obj)) {
    const field = camelCase(key);
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      const innerClass = pascalCase(key);
      fields.push(`    private ${innerClass} ${field};`);
      nested.push([innerClass, value as { [key: string]: Json }]);
    } else if (Array.isArray(value)) {
      const objects = value.filter((v): v is { [key: string]: Json } => v !== null && typeof v === "object" && !Array.isArray(v));
      if (objects.length > 0) {
        const innerClass = pascalCase(key);
        // 合并数组内对象字段
        const merged: { [key: string]: Json } = {};
        for (const o of objects) Object.assign(merged, o);
        fields.push(`    private List<${innerClass}> ${field};`);
        nested.push([innerClass, merged]);
      } else {
        const first = value.find((v) => v !== null);
        const elem = first === undefined ? "Object" : inferScalar(first);
        fields.push(`    private List<${elem}> ${field};`);
      }
    } else {
      fields.push(`    private ${inferScalar(value)} ${field};`);
    }
  }
  const classBody = [
    `public class ${className} {`,
    ...fields.map((f) => `${f}\n`),
    "}",
  ].join("\n");
  out.push(classBody);
  for (const [innerClass, innerObj] of nested) {
    if (!visited.has(innerClass)) {
      visited.add(innerClass);
      emitJava(innerObj, innerClass, out, visited);
    }
  }
}

function inferScalar(value: Json): string {
  if (typeof value === "string") return "String";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return Number.isInteger(value) ? "int" : "double";
  return "Object";
}

function emitJavaCode(obj: { [key: string]: Json }, rootName: string): string {
  const out: string[] = [];
  const visited = new Set<string>();
  emitJava(obj, rootName, out, visited);
  return out.join("\n\n");
}

function emitCSharp(obj: { [key: string]: Json }, className: string, out: string[], visited: Set<string>): void {
  const fields: string[] = [];
  const nested: Array<[string, { [key: string]: Json }]> = [];
  for (const [key, value] of Object.entries(obj)) {
    const prop = pascalCase(key);
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      const innerClass = pascalCase(key);
      fields.push(`    public ${innerClass} ${prop} { get; set; }`);
      nested.push([innerClass, value as { [key: string]: Json }]);
    } else if (Array.isArray(value)) {
      const objects = value.filter((v): v is { [key: string]: Json } => v !== null && typeof v === "object" && !Array.isArray(v));
      if (objects.length > 0) {
        const innerClass = pascalCase(key);
        const merged: { [key: string]: Json } = {};
        for (const o of objects) Object.assign(merged, o);
        fields.push(`    public List<${innerClass}> ${prop} { get; set; }`);
        nested.push([innerClass, merged]);
      } else {
        const first = value.find((v) => v !== null);
        const elem = first === undefined ? "object" : inferScalarCs(first);
        fields.push(`    public List<${elem}> ${prop} { get; set; }`);
      }
    } else {
      fields.push(`    public ${inferScalarCs(value)} ${prop} { get; set; }`);
    }
  }
  out.push(`public class ${className}\n{`);
  for (const f of fields) out.push(`${f}\n`);
  out.push("}\n");
  for (const [innerClass, innerObj] of nested) {
    if (!visited.has(innerClass)) {
      visited.add(innerClass);
      emitCSharp(innerObj, innerClass, out, visited);
    }
  }
}

function inferScalarCs(value: Json): string {
  if (typeof value === "string") return "string";
  if (typeof value === "boolean") return "bool";
  if (typeof value === "number") return Number.isInteger(value) ? "int" : "double";
  return "object";
}

function emitGo(obj: { [key: string]: Json }, structName: string, out: string[], visited: Set<string>): void {
  const lines: string[] = [`type ${structName} struct {`];
  const nested: Array<[string, { [key: string]: Json }]> = [];
  for (const [key, value] of Object.entries(obj)) {
    const goName = safeGoName(key);
    const jsonTag = key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      const innerStruct = pascalCase(key);
      lines.push(`\t${goName} ${innerStruct} \`json:"${jsonTag}"\``);
      nested.push([innerStruct, value as { [key: string]: Json }]);
    } else if (Array.isArray(value)) {
      const objects = value.filter((v): v is { [key: string]: Json } => v !== null && typeof v === "object" && !Array.isArray(v));
      if (objects.length > 0) {
        const innerStruct = pascalCase(key);
        const merged: { [key: string]: Json } = {};
        for (const o of objects) Object.assign(merged, o);
        lines.push(`\t${goName} []${innerStruct} \`json:"${jsonTag}"\``);
        nested.push([innerStruct, merged]);
      } else {
        const first = value.find((v) => v !== null);
        const elem = first === undefined ? "interface{}" : inferScalarGo(first);
        lines.push(`\t${goName} []${elem} \`json:"${jsonTag}"\``);
      }
    } else {
      lines.push(`\t${goName} ${inferScalarGo(value)} \`json:"${jsonTag}"\``);
    }
  }
  lines.push("}");
  out.push(lines.join("\n"));
  for (const [innerStruct, innerObj] of nested) {
    if (!visited.has(innerStruct)) {
      visited.add(innerStruct);
      emitGo(innerObj, innerStruct, out, visited);
    }
  }
}

function inferScalarGo(value: Json): string {
  if (typeof value === "string") return "string";
  if (typeof value === "boolean") return "bool";
  if (typeof value === "number") return Number.isInteger(value) ? "int" : "float64";
  return "interface{}";
}

/** 主入口:JSON 字符串 → 目标语言类代码。 */
export function jsonToCode(json: string, lang: CodeLang, rootName: string = "Root"): CodeGenResult {
  const trimmed = json.trim();
  if (trimmed === "") return { ok: false, code: "empty" };
  if (json.length > MAX_INPUT) return { ok: false, code: "tooLong" };
  let parsed: Json;
  try {
    parsed = JSON.parse(trimmed) as Json;
  } catch (e) {
    return { ok: false, code: "badJson", message: e instanceof Error ? e.message : String(e) };
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, code: "notObject", message: lang === "java" ? "Wrap arrays as { \"items\": [...] }" : undefined };
  }
  const out: string[] = [];
  const className = pascalCase(rootName);
  const visited = new Set<string>();
  if (lang === "java") {
    emitJava(parsed as { [key: string]: Json }, className, out, visited);
  } else if (lang === "csharp") {
    emitCSharp(parsed as { [key: string]: Json }, className, out, visited);
  } else {
    emitGo(parsed as { [key: string]: Json }, className, out, visited);
  }
  return { ok: true, code: out.join("\n\n") };
}
