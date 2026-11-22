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
import { CHINESE_TEXT_OVERLAYS } from "../_lib/chinese-text-overlays";
import { LUNAR_CALENDAR_OVERLAYS } from "../_lib/lunar-calendar-overlays";
import { PINYIN_OVERLAYS } from "../_lib/pinyin-overlays";
import { SM3_OVERLAYS } from "../_lib/sm3-overlays";
import { GBK_OVERLAYS } from "../_lib/gbk-overlays";
import { TOML_OVERLAYS } from "../_lib/toml-overlays";
import { RSA_OVERLAYS } from "../_lib/rsa-overlays";
import { IBAN_OVERLAYS } from "../_lib/iban-overlays";
import { AES_OVERLAYS } from "../_lib/aes-overlays";
import { SM4_OVERLAYS } from "../_lib/sm4-overlays";
import { SM2_OVERLAYS } from "../_lib/sm2-overlays";
import { DOCKER_COMPOSE_OVERLAYS } from "../_lib/docker-compose-overlays";

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
  fr: { ...fr, "crc16-modbus": CRC16_MODBUS_OVERLAYS.fr, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.fr, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.fr, "lunar-calendar-converter": LUNAR_CALENDAR_OVERLAYS.fr, "chinese-text-converter": CHINESE_TEXT_OVERLAYS.fr, "pinyin-converter": PINYIN_OVERLAYS.fr , "sm3-hash": SM3_OVERLAYS.fr , "gbk-decoder": GBK_OVERLAYS.fr , "toml-converter": TOML_OVERLAYS.fr , "rsa-key-generator": RSA_OVERLAYS.fr , "iban-validator": IBAN_OVERLAYS.fr , "docker-compose-converter": DOCKER_COMPOSE_OVERLAYS.fr , "aes-encrypt": AES_OVERLAYS.fr , "sm4-encrypt": SM4_OVERLAYS.fr , "sm2-sign": SM2_OVERLAYS.fr },
  ru: { ...ru, "crc16-modbus": CRC16_MODBUS_OVERLAYS.ru, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.ru, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.ru, "lunar-calendar-converter": LUNAR_CALENDAR_OVERLAYS.ru, "chinese-text-converter": CHINESE_TEXT_OVERLAYS.ru, "pinyin-converter": PINYIN_OVERLAYS.ru , "sm3-hash": SM3_OVERLAYS.ru , "gbk-decoder": GBK_OVERLAYS.ru , "toml-converter": TOML_OVERLAYS.ru , "rsa-key-generator": RSA_OVERLAYS.ru , "iban-validator": IBAN_OVERLAYS.ru , "docker-compose-converter": DOCKER_COMPOSE_OVERLAYS.ru , "aes-encrypt": AES_OVERLAYS.ru , "sm4-encrypt": SM4_OVERLAYS.ru , "sm2-sign": SM2_OVERLAYS.ru },
  de: { ...de, "crc16-modbus": CRC16_MODBUS_OVERLAYS.de, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.de, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.de, "lunar-calendar-converter": LUNAR_CALENDAR_OVERLAYS.de, "chinese-text-converter": CHINESE_TEXT_OVERLAYS.de, "pinyin-converter": PINYIN_OVERLAYS.de , "sm3-hash": SM3_OVERLAYS.de , "gbk-decoder": GBK_OVERLAYS.de , "toml-converter": TOML_OVERLAYS.de , "rsa-key-generator": RSA_OVERLAYS.de , "iban-validator": IBAN_OVERLAYS.de , "docker-compose-converter": DOCKER_COMPOSE_OVERLAYS.de , "aes-encrypt": AES_OVERLAYS.de , "sm4-encrypt": SM4_OVERLAYS.de , "sm2-sign": SM2_OVERLAYS.de },
  it: { ...itOverlay, "crc16-modbus": CRC16_MODBUS_OVERLAYS.it, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.it, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.it, "lunar-calendar-converter": LUNAR_CALENDAR_OVERLAYS.it, "chinese-text-converter": CHINESE_TEXT_OVERLAYS.it, "pinyin-converter": PINYIN_OVERLAYS.it , "sm3-hash": SM3_OVERLAYS.it , "gbk-decoder": GBK_OVERLAYS.it , "toml-converter": TOML_OVERLAYS.it , "rsa-key-generator": RSA_OVERLAYS.it , "iban-validator": IBAN_OVERLAYS.it , "docker-compose-converter": DOCKER_COMPOSE_OVERLAYS.it , "aes-encrypt": AES_OVERLAYS.it , "sm4-encrypt": SM4_OVERLAYS.it , "sm2-sign": SM2_OVERLAYS.it },
  ar: { ...ar, "crc16-modbus": CRC16_MODBUS_OVERLAYS.ar, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.ar, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.ar, "lunar-calendar-converter": LUNAR_CALENDAR_OVERLAYS.ar, "chinese-text-converter": CHINESE_TEXT_OVERLAYS.ar, "pinyin-converter": PINYIN_OVERLAYS.ar , "sm3-hash": SM3_OVERLAYS.ar , "gbk-decoder": GBK_OVERLAYS.ar , "toml-converter": TOML_OVERLAYS.ar , "rsa-key-generator": RSA_OVERLAYS.ar , "iban-validator": IBAN_OVERLAYS.ar , "docker-compose-converter": DOCKER_COMPOSE_OVERLAYS.ar , "aes-encrypt": AES_OVERLAYS.ar , "sm4-encrypt": SM4_OVERLAYS.ar , "sm2-sign": SM2_OVERLAYS.ar },
  ko: { ...ko, "crc16-modbus": CRC16_MODBUS_OVERLAYS.ko, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.ko, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.ko, "lunar-calendar-converter": LUNAR_CALENDAR_OVERLAYS.ko, "chinese-text-converter": CHINESE_TEXT_OVERLAYS.ko, "pinyin-converter": PINYIN_OVERLAYS.ko , "sm3-hash": SM3_OVERLAYS.ko , "gbk-decoder": GBK_OVERLAYS.ko , "toml-converter": TOML_OVERLAYS.ko , "rsa-key-generator": RSA_OVERLAYS.ko , "iban-validator": IBAN_OVERLAYS.ko , "docker-compose-converter": DOCKER_COMPOSE_OVERLAYS.ko , "aes-encrypt": AES_OVERLAYS.ko , "sm4-encrypt": SM4_OVERLAYS.ko , "sm2-sign": SM2_OVERLAYS.ko },
  tr: { ...tr, "crc16-modbus": CRC16_MODBUS_OVERLAYS.tr, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.tr, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.tr, "lunar-calendar-converter": LUNAR_CALENDAR_OVERLAYS.tr, "chinese-text-converter": CHINESE_TEXT_OVERLAYS.tr, "pinyin-converter": PINYIN_OVERLAYS.tr , "sm3-hash": SM3_OVERLAYS.tr , "gbk-decoder": GBK_OVERLAYS.tr , "toml-converter": TOML_OVERLAYS.tr , "rsa-key-generator": RSA_OVERLAYS.tr , "iban-validator": IBAN_OVERLAYS.tr , "docker-compose-converter": DOCKER_COMPOSE_OVERLAYS.tr , "aes-encrypt": AES_OVERLAYS.tr , "sm4-encrypt": SM4_OVERLAYS.tr , "sm2-sign": SM2_OVERLAYS.tr },
  id: { ...id, "crc16-modbus": CRC16_MODBUS_OVERLAYS.id, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.id, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.id, "lunar-calendar-converter": LUNAR_CALENDAR_OVERLAYS.id, "chinese-text-converter": CHINESE_TEXT_OVERLAYS.id, "pinyin-converter": PINYIN_OVERLAYS.id , "sm3-hash": SM3_OVERLAYS.id , "gbk-decoder": GBK_OVERLAYS.id , "toml-converter": TOML_OVERLAYS.id , "rsa-key-generator": RSA_OVERLAYS.id , "iban-validator": IBAN_OVERLAYS.id , "docker-compose-converter": DOCKER_COMPOSE_OVERLAYS.id , "aes-encrypt": AES_OVERLAYS.id , "sm4-encrypt": SM4_OVERLAYS.id , "sm2-sign": SM2_OVERLAYS.id },
  vi: { ...vi, "crc16-modbus": CRC16_MODBUS_OVERLAYS.vi, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.vi, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.vi, "lunar-calendar-converter": LUNAR_CALENDAR_OVERLAYS.vi, "chinese-text-converter": CHINESE_TEXT_OVERLAYS.vi, "pinyin-converter": PINYIN_OVERLAYS.vi , "sm3-hash": SM3_OVERLAYS.vi , "gbk-decoder": GBK_OVERLAYS.vi , "toml-converter": TOML_OVERLAYS.vi , "rsa-key-generator": RSA_OVERLAYS.vi , "iban-validator": IBAN_OVERLAYS.vi , "docker-compose-converter": DOCKER_COMPOSE_OVERLAYS.vi , "aes-encrypt": AES_OVERLAYS.vi , "sm4-encrypt": SM4_OVERLAYS.vi , "sm2-sign": SM2_OVERLAYS.vi },
  hi: { ...hi, "crc16-modbus": CRC16_MODBUS_OVERLAYS.hi, "image-color-picker": IMAGE_COLOR_PICKER_OVERLAYS.hi, "ipv4-range-expander": IPV4_RANGE_OVERLAYS.hi, "lunar-calendar-converter": LUNAR_CALENDAR_OVERLAYS.hi, "chinese-text-converter": CHINESE_TEXT_OVERLAYS.hi, "pinyin-converter": PINYIN_OVERLAYS.hi , "sm3-hash": SM3_OVERLAYS.hi , "gbk-decoder": GBK_OVERLAYS.hi , "toml-converter": TOML_OVERLAYS.hi , "rsa-key-generator": RSA_OVERLAYS.hi , "iban-validator": IBAN_OVERLAYS.hi , "docker-compose-converter": DOCKER_COMPOSE_OVERLAYS.hi , "aes-encrypt": AES_OVERLAYS.hi , "sm4-encrypt": SM4_OVERLAYS.hi , "sm2-sign": SM2_OVERLAYS.hi },
};
