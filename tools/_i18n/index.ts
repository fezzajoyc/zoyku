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
import { CRC16_MODBUS_OVERLAYS } from "../_lib/crc16-copy";
import { IMAGE_COLOR_PICKER_OVERLAYS } from "../_lib/image-color-picker-tool-copy";
import { IPV4_RANGE_OVERLAYS } from "../_lib/ipv4-range-copy";

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
  fr: { ...fr, "crc16-modbus": CRC16_MODBUS_OVERLAYS.fr, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.fr, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.fr },
  ru: { ...ru, "crc16-modbus": CRC16_MODBUS_OVERLAYS.ru, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.ru, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.ru },
  de: { ...de, "crc16-modbus": CRC16_MODBUS_OVERLAYS.de, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.de, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.de },
  it: { ...itOverlay, "crc16-modbus": CRC16_MODBUS_OVERLAYS.it, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.it, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.it },
  ar: { ...ar, "crc16-modbus": CRC16_MODBUS_OVERLAYS.ar, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.ar, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.ar },
  ko: { ...ko, "crc16-modbus": CRC16_MODBUS_OVERLAYS.ko, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.ko, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.ko },
  tr: { ...tr, "crc16-modbus": CRC16_MODBUS_OVERLAYS.tr, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.tr, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.tr },
  id: { ...id, "crc16-modbus": CRC16_MODBUS_OVERLAYS.id, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.id, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.id },
  vi: { ...vi, "crc16-modbus": CRC16_MODBUS_OVERLAYS.vi, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.vi, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.vi },
  hi: { ...hi, "crc16-modbus": CRC16_MODBUS_OVERLAYS.hi, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.hi, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.hi },
};
