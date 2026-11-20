import type { ToolCopy } from "../_lib/types";
import { fr } from "./fr";
import { ru } from "./ru";
import { de } from "./de";
import { it as itOverlay } from "./it";
import { ar } from "./ar";
import { ko } from "./ko";
import { tr } from "./tr";
import { id } from "./id";
import { vi } from "./vi";
import { hi } from "./hi";

/**
 * 扩展语言覆盖层:每种语言一个文件,key = 工具 slug。
 * 契约(tests/overlays.test.ts 强制):凡出现在 OVERLAYS 里的语言,
 * 每个注册 slug 必须有工具原生文案或 overlay 文案；不能依赖英文回退。
 * 工具已原生提供该语言时无需重复 overlay；不完整的语言不要注册进来。
 * 新增语言:1) lib/site.ts LOCALES  2) lib/dictionaries/{loc}.ts
 *          3) tools/_i18n/{loc}.ts  4) 在本文件注册。
 */
export type Overlay = Record<string, ToolCopy>;

export const OVERLAYS: Record<string, Overlay> = {
  fr,
  ru,
  de,
  it: itOverlay,
  ar,
  ko,
  tr,
  id,
  vi,
  hi,
};
