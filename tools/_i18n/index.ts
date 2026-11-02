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
 * 必须覆盖注册表中的每一个 slug——不完整的语言不要注册进来。
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
