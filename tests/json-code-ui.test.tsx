import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { I18nProvider } from "@/components/i18n-provider";
import { dict } from "@/lib/i18n";
import { LOCALES, type Locale } from "@/lib/site";
import { JSON_FORMAT_LIMITS } from "@/tools/_lib/json-format";

const state = vi.hoisted(() => ({ values: [] as unknown[], index: 0 }));
vi.mock("react", async (importOriginal) => ({
  ...await importOriginal<typeof import("react")>(),
  useState: (initial: unknown) => [state.index < state.values.length ? state.values[state.index++] : initial, () => {}],
}));
import { DevCodeEngine } from "@/tools/_engines/dev-engine-code";

function render(input: string, locale: Locale = "en", mode = "json-beautify", indentChoice = "2", sortOn = false) {
  state.index = 0;
  state.values = [input, indentChoice, sortOn, { out: "", err: null }];
  return renderToStaticMarkup(<I18nProvider locale={locale} dict={dict(locale)}>
    <DevCodeEngine mode={mode} indent={mode === "json-beautify"} sort={mode === "json-beautify"} sample='{"ok":true}' />
  </I18nProvider>);
}

describe("JSON resource notices and accessible choices", () => {
  it.each(["json-beautify", "json-minify"])("keeps the exact empty input neutral for %s", (mode) => {
    const html = render("", "en", mode);
    expect(html.includes('role="alert"')).toBe(false);
    expect(html).toContain('aria-invalid="false"');
    expect(html).toMatch(/readOnly=""[^>]*><\/textarea>/);
    expect(render(" ", "en", mode)).toContain('role="alert"');
  });

  it("uses the theme text token for the sample action in the neutral empty state", () => {
    const html = render("");
    expect(html).toMatch(/text-\[var\(--color-accent-text\)\][^>]*>Try an example<\/button>/);
  });

  it.each(LOCALES)("renders actual limits in initial HTML for %s", (locale) => {
    for (const mode of ["json-beautify", "json-minify"]) {
      const html = render("{}", locale, mode);
      expect(html).toContain("UTF-16");
      for (const limit of Object.values(JSON_FORMAT_LIMITS)) expect(html).toContain(limit.toLocaleString("en-US"));
      expect(html).toContain("aria-describedby=");
    }
    expect(render("{}", locale, "css-minify")).not.toContain("UTF-16");
  });

  it("exposes the selected indentation and explicit stable-sort state", () => {
    const html = render('{"b":1,"a":2}', "en", "json-beautify", "4", true);
    expect(html).toMatch(/aria-pressed="true"[^>]*>4 spaces<\/button>/);
    expect(html).toMatch(/aria-pressed="false"[^>]*>2 spaces<\/button>/);
    expect(html).toMatch(/aria-pressed="false"[^>]*>Tab<\/button>/);
    expect(html).toMatch(/aria-pressed="true"[^>]*>Sort keys A→Z<\/button>/);
  });

  it.each(["json-beautify", "json-minify"])("localizes input rejection without truncation for %s", (mode) => {
    const html = render(" ".repeat(JSON_FORMAT_LIMITS.inputCharacters + 1), "zh", mode);
    expect(html).toContain('role="alert"');
    expect(html.includes("输入超过")).toBe(true);
    expect(html.includes("JSON input exceeds")).toBe(false);
    expect(html.includes("Hint:")).toBe(false);
    expect(html).toContain('aria-invalid="true"');
    expect(html).toMatch(/readOnly=""[^>]*><\/textarea>/);
  });

  it.each([
    { name: "depth", input: "[".repeat(201) + "0" + "]".repeat(201), term: "嵌套深度超过", indent: "2" },
    { name: "values", input: "[" + "0,".repeat(99_999) + "0]", term: "值数量超过", indent: "2" },
    { name: "output", input: "[".repeat(200) + "0,".repeat(5_999) + "0" + "]".repeat(200), term: "输出超过", indent: "4" },
  ])("localizes $name resource rejection rather than syntax hints", ({ input, term, indent }) => {
    const html = render(input, "zh", "json-beautify", indent);
    expect(html).toContain('role="alert"');
    expect(html.includes(term)).toBe(true);
    expect(html.includes("Hint:")).toBe(false);
    expect(html).toMatch(/readOnly=""[^>]*><\/textarea>/);
  });
});
