import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { I18nProvider } from "@/components/i18n-provider";
import { dict } from "@/lib/i18n";
import { LOCALES } from "@/lib/site";
import { RMB_UPPERCASE_SOURCE } from "@/tools/_lib/rmb-uppercase";
import { RMB_UPPERCASE_TO_NUMBER_MESSAGES } from "@/tools/_lib/rmb-uppercase-to-number-copy";
import tool from "@/tools/utility/rmb-uppercase-to-number";

describe("reverse RMB tool initial page contract", () => {
  it.each(LOCALES)("renders the actual input and scope in %s", (locale) => {
    const messages = RMB_UPPERCASE_TO_NUMBER_MESSAGES[locale];
    const html = renderToStaticMarkup(createElement(I18nProvider,
      { locale, dict: dict(locale) } as Parameters<typeof I18nProvider>[0],
      createElement(tool.engine.component),
    ));

    for (const message of [messages.input, messages.scope, messages.grammar, messages.normalize]) {
      const escaped = renderToStaticMarkup(createElement("p", null, message)).slice(3, -4);
      expect(html).toContain(escaped);
    }
    expect(tool.copy[locale]?.name).toBe(messages.name);
    expect(html).toContain(RMB_UPPERCASE_SOURCE.url);
    expect(html).toContain('lang="zh-Hans"');
    expect(html).not.toMatch(/maxlength=/i);
    expect(html).not.toContain('data-testid="rmb-reverse-decimal"');
  });
});
