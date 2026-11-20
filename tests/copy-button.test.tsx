import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CopyButton } from "@/components/client-ui";
import { I18nProvider } from "@/components/i18n-provider";
import { COPY_BUTTON_MESSAGES } from "@/components/copy-button-copy";
import { dict } from "@/lib/i18n";
import { LOCALES } from "@/lib/site";

describe("CopyButton public contract and localized failure recovery", () => {
  it("authors failure and manual recovery for all fifteen supported locales", () => {
    expect(Object.keys(COPY_BUTTON_MESSAGES).sort()).toEqual([...LOCALES].sort());
    for (const locale of LOCALES) {
      const message = COPY_BUTTON_MESSAGES[locale];
      expect(message.failed.trim().length).toBeGreaterThan(2);
      expect(message.recovery.trim().length).toBeGreaterThan(12);
      if (locale !== "en") {
        expect(message.failed).not.toBe(COPY_BUTTON_MESSAGES.en.failed);
        expect(message.recovery).not.toBe(COPY_BUTTON_MESSAGES.en.recovery);
      }
    }
  });

  it.each(LOCALES)("renders idle %s labels without invoking value or callback functions", locale => {
    let reads = 0, callbacks = 0;
    const html = renderToStaticMarkup(createElement(I18nProvider,
      { locale, dict: dict(locale) } as Parameters<typeof I18nProvider>[0],
      createElement(CopyButton, {
        value: () => { reads++; return "Source text"; },
        onCopied: () => { callbacks++; },
      }),
    ));
    expect(reads).toBe(0);
    expect(callbacks).toBe(0);
    expect(html).toContain(dict(locale).common.copy);
    expect(html).not.toContain(COPY_BUTTON_MESSAGES[locale].recovery);
    expect(html).toContain('type="button"');
    expect(html).toContain('aria-live="polite"');
  });

  it("keeps the caller label and original button styling classes on the button", () => {
    const html = renderToStaticMarkup(createElement(I18nProvider,
      { locale: "en", dict: dict("en") } as Parameters<typeof I18nProvider>[0],
      createElement(CopyButton, { value: "", label: "Copy result", className: "flex-none caller-style" }),
    ));
    expect(html).toContain("Copy result");
    expect(html.startsWith("<button ")).toBe(true);
    expect(html.endsWith("</button>")).toBe(true);
    expect(html).toMatch(/<button[^>]+class="[^"]*rounded-full border hairline[^"+]*flex-none caller-style/);
    expect(html).not.toContain('role="status"');
  });
});
