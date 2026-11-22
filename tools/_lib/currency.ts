/**
 * 共享货币选择:8 币种 + 语言默认(2026-11-22 浏览器回归发现 6 个引擎硬编码货币符号的系统性修复)。
 * 默认按 UI 语言推断:zh→CNY、ja→JPY、ko→KRW、hi→INR、pt→BRL、de/fr/it→EUR,其余 USD。
 * 用户显式选择优先于语言默认;选择只影响显示符号,不参与数值计算。
 */

import { useState } from "react";

export type CurrencyDef = { symbol: string; frac: number; label: string };

export const CURRENCIES: Record<string, CurrencyDef> = {
  USD: { symbol: "$", frac: 2, label: "USD — $" },
  EUR: { symbol: "€", frac: 2, label: "EUR — €" },
  CNY: { symbol: "¥", frac: 2, label: "CNY — ¥" },
  JPY: { symbol: "¥", frac: 0, label: "JPY — ¥" },
  KRW: { symbol: "₩", frac: 0, label: "KRW — ₩" },
  GBP: { symbol: "£", frac: 2, label: "GBP — £" },
  INR: { symbol: "₹", frac: 2, label: "INR — ₹" },
  BRL: { symbol: "R$", frac: 2, label: "BRL — R$" },
};

const LOCALE_CURRENCY: Record<string, string> = {
  zh: "CNY",
  ja: "JPY",
  ko: "KRW",
  hi: "INR",
  pt: "BRL",
  de: "EUR",
  fr: "EUR",
  it: "EUR",
};

export function localeDefaultCurrency(locale: string): string {
  return LOCALE_CURRENCY[locale] ?? "USD";
}

/** 引擎用:货币状态 + 当前定义。override 用于场景化默认(如 GST→INR)。 */
export function useLocaleCurrency(locale: string, override?: string) {
  const [currency, setCurrency] = useState(() => override ?? localeDefaultCurrency(locale));
  const cur = CURRENCIES[currency] ?? CURRENCIES.USD;
  return { currency, setCurrency, cur };
}

/** 引擎标签(15 语)——与 calc-engine-auto 的 currency 标签一致。 */
export const CURRENCY_LABEL = {
  en: "Currency",
  zh: "币种",
  ja: "通貨",
  es: "Moneda",
  pt: "Moeda",
  fr: "Devise",
  de: "Währung",
  ru: "Валюта",
  it: "Valuta",
  tr: "Para birimi",
  ko: "통화",
  ar: "العملة",
  hi: "मुद्रा",
  id: "Mata uang",
  vi: "Đồng tiền",
} as const;
