import { beforeEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const state = vi.hoisted(() => ({ input: "", delimiter: ",", calls: 0 }));
vi.mock("react", async (importOriginal) => {
  const react = await importOriginal<typeof import("react")>();
  return { ...react, useState: () => [state.calls++ === 0 ? state.input : state.delimiter, () => {}] };
});
vi.mock("@/components/i18n-provider", () => ({
  useI18n: () => ({ locale: "en", t: { common: { input: "Input", output: "Output", clear: "Clear", sample: "Sample" } } }),
}));
vi.mock("@/components/client-ui", () => ({ CopyButton: () => null }));

import { DevCsvEngine } from "@/tools/_engines/dev-engine-csv";

function output(direction: "json2csv" | "csv2json", input: string, delimiter = ",") {
  Object.assign(state, { input, delimiter, calls: 0 });
  const html = renderToStaticMarkup(createElement(DevCsvEngine, { direction }));
  return /<textarea[^>]*readOnly=""[^>]*>([\s\S]*?)<\/textarea>/i.exec(html)?.[1];
}

function escaped(text: string) {
  return renderToStaticMarkup(createElement("textarea", { readOnly: true, value: text }))
    .replace(/^<textarea[^>]*>|<\/textarea>$/g, "");
}

describe("CSV data-loss regressions through the real engine", () => {
  beforeEach(() => { state.calls = 0; });

  it.each([";", "\t"])("quotes a value containing the selected %j delimiter", (delimiter) => {
    expect(output("json2csv", JSON.stringify([{ id: 1, name: `Ada${delimiter}Bob` }]), delimiter))
      .toBe(escaped(`id${delimiter}name\n1${delimiter}"Ada${delimiter}Bob"`));
  });

  it.each(["9007199254740993", "1e309", "1e-400", "0.1234567890123456789"])("retains %s as text when numeric inference changes it", (value) => {
    expect(output("csv2json", `value\n${value}`))
      .toBe(escaped(JSON.stringify([{ value }], null, 2)));
  });

  it.each(["9007199254740993", "1e309", "1e-400", "0.1234567890123456789", "-0"])("preserves the JSON number literal %s in CSV", (value) => {
    expect(output("json2csv", `[{"value":${value}}]`)).toBe(escaped(`value\n${value}`));
  });

  it("rejects duplicate decoded JSON keys instead of dropping an earlier member", () => {
    expect(output("json2csv", '[{"a":1,"\\u0061":2}]')).toBe("");
  });

  it("preserves a quoted empty record", () => {
    expect(output("csv2json", 'a\n""')).toBe(escaped(JSON.stringify([{ a: "" }], null, 2)));
  });

  it("rejects a row wider than its header instead of dropping data", () => {
    expect(output("csv2json", "a,b\n1,2,3")).toBe("");
  });

  it("rejects duplicate headers instead of overwriting a field", () => {
    expect(output("csv2json", "a,a\nfirst,second")).toBe("");
  });
});
