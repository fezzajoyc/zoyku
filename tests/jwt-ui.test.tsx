import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { I18nProvider } from "@/components/i18n-provider";
import { dict } from "@/lib/i18n";
import { LOCALES, type Locale } from "@/lib/site";
import { jwtCopy, jwtCapabilityCopy } from "@/tools/_lib/jwt-copy";
import jwtDecoder from "@/tools/developer/jwt-decoder";

const state = vi.hoisted(() => ({ values: [] as unknown[], index: 0 }));
vi.mock("react", async (importOriginal) => ({
  ...await importOriginal<typeof import("react")>(),
  useState: (initial: unknown) => [state.index < state.values.length ? state.values[state.index++] : initial, () => {}],
}));
import { DevEncoderEngine } from "@/tools/_engines/dev-engine-encoder";

const part = (value: string) => Buffer.from(value).toString("base64url");
const token = (payload: string, header = '{"alg":"HS256"}') => `${part(header)}.${part(payload)}.eA`;
function render(input: string, locale: Locale = "en", codec: "jwt-decode" | "url-encode" = "jwt-decode") {
  state.index = 0;
  state.values = [input, true, false];
  return renderToStaticMarkup(<I18nProvider locale={locale} dict={dict(locale)}><DevEncoderEngine codec={codec} /></I18nProvider>);
}

describe("JWT recoverable decoding", () => {
  it.each(["null", "[]", "1", '"text"'])("rejects a non-object payload %s while preserving controls", (payload) => {
    const html = render(token(payload));
    expect(html).toContain('role="alert"');
    expect(html).toContain("<textarea");
    expect(html).toContain("Clear");
  });
  it("rejects a non-object header", () => expect(render(token("{}", "null"))).toContain('role="alert"'));
  it.each(["1e100", "1e309", "-1e309"])("does not crash for an out-of-range NumericDate %s", (value) => {
    const html = render(token(`{"exp":${value}}`));
    expect(html).toContain("<textarea");
    expect(html).toContain("Cannot display");
    expect(html).toContain(value);
  });
  it("preserves number lexemes in the visible JSON", () => {
    const html = render(token('{"id":9007199254740993,"small":1e-999,"exp":1e309}'));
    expect(html).toContain("9007199254740993");
    expect(html).toContain("1e-999");
    expect(html).toContain("1e309");
  });
  it("does not call an unverified token active or valid", () => {
    const html = render(token('{"exp":4102444800}'), "zh");
    expect(html).toContain("未过期（解码时）");
    expect(html).not.toContain("(有效)");
  });
  it("allows keyboard focus on decoded JSON blocks", () => expect(render(token("{}"))).toMatch(/<pre[^>]*tabindex="0"/));
  it("exposes URL encoding selection", () => expect(render("a b", "en", "url-encode")).toMatch(/aria-pressed="true"/));
  it("checks the raw JWT input limit before treating whitespace as empty", () => {
    const html = render(" ".repeat(1_000_001));
    expect(html.includes('role="alert"')).toBe(true);
    expect(html.includes('aria-invalid="true"')).toBe(true);
  });
  it.each(LOCALES)("provides authored error, limits and truthful capability copy for %s", (locale) => {
    const copy = jwtCopy(locale);
    const empty = render("", locale);
    expect(empty).not.toContain('role="alert"');
    expect(empty).toContain("1,000,000");
    expect(empty).toContain("4,000,000");
    expect(empty).toContain("aria-describedby=");
    const rejected = render(token("null"), locale);
    expect(rejected).toContain('aria-invalid="true"');
    expect(rejected).toContain(copy.error);
    expect(render(token('{"exp":1e100}'), locale)).toContain(copy.range);
    expect(render(token('{"exp":"100"}'), locale)).toContain(copy.type);
    const metadata = jwtCapabilityCopy(locale, jwtDecoder.copy.en);
    expect(metadata.name).toBe(jwtDecoder.copy.en.name);
    expect(metadata.tagline).toBe(jwtDecoder.copy.en.tagline);
    expect(metadata.intro).toEqual([copy.note, copy.limits]);
    expect(metadata.steps).toHaveLength(3);
    expect(metadata.faqs).toHaveLength(2);
    expect(metadata.deepDive).toBeUndefined();
    if (locale !== "en") expect(copy.error).not.toBe(jwtCopy("en").error);
  });
});
