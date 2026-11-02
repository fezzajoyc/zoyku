import type { Locale } from "@/lib/site";

/**
 * 纯 TS 共享模块(无 "use client"):工具定义文件在服务端求值,
 * 不能调用 client 模块导出的函数,因此 loc/tr/文案类型放在这里。
 */

/** 5 语文案:en 必填,其余可缺省回退到 en */
export type Localized = { en: string } & Partial<Record<Locale, string>>;

/** 本地化文案,或不需要翻译的纯字符串(参数名、URL、token) */
export type Text = Localized | string;

export function loc(en: string, zh: string, ja: string, es: string, pt: string): Localized {
  return { en, zh, ja, es, pt };
}

export function tr(locale: Locale, v: Text | undefined): string {
  if (v === undefined) return "";
  return typeof v === "string" ? v : v[locale] ?? v.en;
}
