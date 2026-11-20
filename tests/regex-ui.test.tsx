import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { RegexMatch } from "../tools/_lib/regex";

const state = vi.hoisted(() => ({ values: [] as unknown[], index: 0 }));
vi.mock("react", async (importOriginal) => ({
  ...await importOriginal<typeof import("react")>(),
  useState: () => [state.values[state.index++], () => {}],
}));
vi.mock("@/components/i18n-provider", () => ({
  useI18n: () => ({ locale: "en", t: { common: { input: "Input", sample: "Sample" } } }),
}));

import { DevRegexEngine } from "../tools/_engines/dev-engine-regex";

function renderPreview(text: string, matches: RegexMatch[]) {
  state.values = ["(?:)", { g: true, u: true }, text, { matches, error: null, truncated: false }, false];
  return renderToStaticMarkup(<DevRegexEngine />);
}

const match = (index: number, text = ""): RegexMatch => ({ text, index, groups: [], named: [] });

describe("regex visible preview", () => {
  beforeEach(() => { state.index = 0; });

  it("preserves the entire emoji for zero-width Unicode matches", () => {
    const html = renderPreview("😀", [match(0), match(2)]);
    expect(html).toContain("<span>😀</span>");
    expect(html).toContain("2 match(es)");
  });

  it("preserves all text between empty matches and regular highlighted matches", () => {
    const html = renderPreview("a中😀z", [match(0), match(1, "中"), match(2), match(4)]);
    expect(html).toContain("<span>a</span><mark");
    expect(html).toContain(">中</mark><span>😀</span><span>z</span>");
  });
});
