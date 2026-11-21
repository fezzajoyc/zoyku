import { beforeEach, describe, expect, it, vi } from "vitest";
import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LOCALES, type Locale } from "@/lib/site";

const state = vi.hoisted(() => ({ locale: "en", values: ["", "transpose", ",", "1", "2"], calls: 0 }));
vi.mock("react", async importOriginal => {
  const react = await importOriginal<typeof import("react")>();
  return { ...react, useState: () => [state.values[state.calls++], () => {}] };
});
vi.mock("@/components/i18n-provider", () => ({
  useI18n: () => ({ locale: state.locale, t: { common: { input: "Input", output: "Output", clear: "Clear", sample: "Sample" } } }),
}));
vi.mock("@/components/client-ui", () => ({ CopyButton: ({ value }: { value: string }) => createElement("button", { disabled: !value, "data-copy": value }, "Copy") }));
vi.mock("@/components/ui", () => ({ ToolPanel: ({ children }: { children: ReactNode }) => createElement("section", {}, children) }));

import { DevCsvTableEngine } from "@/tools/_engines/dev-engine-csv-table";
import { CSV_TABLE_MESSAGES, csvTableErrorText, csvTableLimitsText } from "@/tools/_lib/csv-table-copy";
import tool from "@/tools/developer/csv-table-editor";

function markup(input = "", operation = "transpose", delimiter = ",", first = "1", second = "2", locale: Locale = "en") {
  Object.assign(state, { locale, values: [input, operation, delimiter, first, second], calls: 0 });
  return renderToStaticMarkup(createElement(DevCsvTableEngine));
}
const output = (html: string) => /<textarea[^>]*readOnly=""[^>]*>([\s\S]*?)<\/textarea>/i.exec(html)?.[1];
const escape = (text: string) => renderToStaticMarkup(createElement("span", {}, text)).replace(/^<span>|<\/span>$/g, "");

describe("CSV table editor rendering", () => {
  beforeEach(() => { state.calls = 0; });
  it("renders transformed text and dimensions from the real pure function", () => {
    const html = markup("name,code\nAda,007\n中😀,-0");
    expect(output(html)).toBe("name,Ada,中😀\ncode,007,-0");
    expect(html).toContain("2 rows × 3 columns · 6 cells");
    expect(html).toContain("data-copy=");
    expect(html).not.toContain("disabled=");
  });
  it("associates visible labels with every input and keeps data LTR within Arabic UI", () => {
    const html = markup("a,b\n1,2", "swap", ",", "1", "2", "ar");
    const ids = [...html.matchAll(/<(?:textarea|select|input)\b[^>]*\bid="([^"]+)"/g)].map(match => match[1]);
    expect(ids).toHaveLength(6);
    for (const id of ids) expect(html).toContain(`for="${id}"`);
    expect([...html.matchAll(/<(?:textarea|input)\b[^>]*\bdir="ltr"/g)]).toHaveLength(4);
    expect(output(html)).toBe("b,a\n2,1");
    expect(html).toContain(CSV_TABLE_MESSAGES.ar.swap);
  });
  it("clears output and exposes linked localized errors for invalid selection", () => {
    const html = markup("a,b", "swap", ",", "0", "2", "zh");
    expect(output(html)).toBe("");
    expect(html).toContain('role="alert"');
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain(CSV_TABLE_MESSAGES.zh.selectionError);
    expect(html).toContain("disabled=");
  });
  it.each(["a,b\nc", 'a,b\n"open'])("never presents stale output for invalid input %j", input => {
    const html = markup(input);
    expect(output(html)).toBe("");
    expect(html).toContain('role="alert"');
    expect(html).not.toContain("rows ×");
  });
  it.each(LOCALES)("renders native controls and a useful empty state in %s", locale => {
    const html = markup("", "transpose", ",", "1", "2", locale);
    expect(html).toContain(escape(CSV_TABLE_MESSAGES[locale].operation));
    expect(html).toContain(escape(CSV_TABLE_MESSAGES[locale].delimiter));
    expect(html).toContain(escape(CSV_TABLE_MESSAGES[locale].empty));
    expect(html).toContain("disabled=");
  });
});

describe("CSV table native copy contract", () => {
  it.each(LOCALES)("has complete original page copy, limits and error labels in %s", locale => {
    const copy = tool.copy[locale]!;
    expect(copy.name.length).toBeGreaterThan(0);
    expect(copy.tagline.length).toBeGreaterThanOrEqual(locale === "zh" || locale === "ja" ? 32 : 80);
    expect(copy.intro).toHaveLength(3);
    expect(copy.steps).toHaveLength(3);
    expect(copy.faqs.length).toBeGreaterThanOrEqual(2);
    expect(csvTableLimitsText(locale)).not.toMatch(/\{\w+\}/);
    for (const value of [1_000_000, 4_000_000, 10_000, 1_000, 100_000]) expect(csvTableLimitsText(locale)).toContain(String(value));
    for (const error of ["input", "delimiter", "operation", "csv", "ragged", "selection", "limit"] as const) {
      expect(csvTableErrorText(locale, error).length).toBeGreaterThan(0);
      if (locale !== "en") expect(csvTableErrorText(locale, error)).not.toBe(csvTableErrorText("en", error));
    }
    if (locale !== "en") expect(copy.name).not.toBe(tool.copy.en.name);
  });
});
