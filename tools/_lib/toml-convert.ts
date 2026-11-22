/**
 * CN-022:TOML ↔ JSON 转换(@iarna/toml 2.2.5,MIT)。
 * 懒加载。TOML 根必须是表(对象)——JSON 的数组/标量根按标准不支持,明确拒绝。
 * 日期:TOML 日期经 JSON 输出为 ISO 字符串;JSON→TOML 方向日期保持字符串(如实披露,不伪造日期类型)。
 */

type TomlModule = {
  parse: (text: string) => unknown;
  stringify: (value: object) => string;
};

let modulePromise: Promise<TomlModule> | null = null;

function getModule(): Promise<TomlModule> {
  modulePromise ??= import("@iarna/toml") as Promise<TomlModule>;
  return modulePromise;
}

export type TomlToJsonResult =
  | { ok: true; json: string }
  | { ok: false; code: "empty" | "tooLong" | "invalid"; message?: string };

export type JsonToTomlResult =
  | { ok: true; toml: string }
  | { ok: false; code: "empty" | "tooLong" | "invalidJson" | "unsupported"; message?: string };

const MAX_INPUT = 512_000;

export function errMessage(result: { code: string; message?: string }, locale: string): string {
  const zh = locale === "zh";
  const ja = locale === "ja";
  const es = locale === "es";
  const pt = locale === "pt";
  switch (result.code) {
    case "empty":
      if (zh) return "请输入内容。";
      if (ja) return "入力してください。";
      if (es) return "Ingrese contenido.";
      if (pt) return "Insira o conteúdo.";
      return "Enter some content.";
    case "tooLong":
      return zh
        ? "输入超过 512,000 字符上限——请分段处理。"
        : ja
          ? "入力が 512,000 文字の上限を超えました — 分割して処理してください。"
          : es
            ? "La entrada supera el límite de 512,000 caracteres: divídala en partes."
            : pt
              ? "A entrada excede o limite de 512.000 caracteres: divida em partes."
              : "Input exceeds the 512,000-character limit — split it into parts.";
    case "unsupported":
      return zh
        ? "TOML 根必须是表(对象)——数组或标量请包一层,例如 { items: [...] }。"
        : ja
          ? "TOML のルートはテーブル(オブジェクト)である必要があります — 配列やスカラーは { items: [...] } のように包んでください。"
          : es || pt
            ? "La raíz TOML debe ser una tabla (objeto): envuelva arrays o escalares, p. ej. { items: [...] }."
            : "The TOML root must be a table (object) — wrap arrays or scalars, e.g. { items: [...] }.";
    default:
      return result.message || (zh ? "解析失败。" : "Parsing failed.");
  }
}

export async function tomlToJson(text: string): Promise<TomlToJsonResult> {
  const trimmed = text.trim();
  if (trimmed === "") return { ok: false, code: "empty" };
  if (text.length > MAX_INPUT) return { ok: false, code: "tooLong" };
  const mod = await getModule();
  try {
    const parsed = mod.parse(trimmed) as Record<string, unknown>;
    return { ok: true, json: JSON.stringify(parsed, null, 2) };
  } catch (e) {
    return { ok: false, code: "invalid", message: e instanceof Error ? e.message : String(e) };
  }
}

export async function jsonToToml(text: string): Promise<JsonToTomlResult> {
  const trimmed = text.trim();
  if (trimmed === "") return { ok: false, code: "empty" };
  if (text.length > MAX_INPUT) return { ok: false, code: "tooLong" };
  let obj: unknown;
  try {
    obj = JSON.parse(trimmed);
  } catch (e) {
    return { ok: false, code: "invalidJson", message: e instanceof Error ? e.message : String(e) };
  }
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    return { ok: false, code: "unsupported" };
  }
  const mod = await getModule();
  try {
    return { ok: true, toml: mod.stringify(obj as object) };
  } catch (e) {
    return { ok: false, code: "unsupported", message: e instanceof Error ? e.message : String(e) };
  }
}
