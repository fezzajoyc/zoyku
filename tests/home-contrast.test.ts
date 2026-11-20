import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { contrastRatio, parseColor } from "@/tools/_lib/contrast";

const css = readFileSync(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const vars = (selector: string) => {
  const block =
    css.match(
      new RegExp(
        `${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\{([^}]+)\\}`,
      ),
    )?.[1] ?? "";
  return Object.fromEntries(
    [...block.matchAll(/(--[\w-]+):\s*(#[\da-f]{6})/gi)].map((match) => [
      match[1],
      match[2],
    ]),
  );
};

describe("homepage readable theme tokens", () => {
  it.each([":root", ".dark"])(
    "keeps the composited search placeholder readable in %s",
    (theme) => {
      const home = vars(theme === ":root" ? ".home-page" : ".dark .home-page");
      const base = vars(theme);
      const placeholder =
        css.match(/\.home-search input::placeholder \{([^}]+)\}/)?.[1] ?? "";
      const alpha = Number(
        placeholder.match(/opacity:\s*([\d.]+)/)?.[1] ?? "1",
      );
      const ink = parseColor(home["--home-muted"])!;
      const paper = parseColor(base["--color-card"])!;
      const blended = `rgb(${ink.r * alpha + paper.r * (1 - alpha)}, ${ink.g * alpha + paper.g * (1 - alpha)}, ${ink.b * alpha + paper.b * (1 - alpha)})`;
      expect(
        contrastRatio(blended, base["--color-card"]),
      ).toBeGreaterThanOrEqual(4.5);
    },
  );
  it.each([":root", ".dark"])(
    "keeps shared field placeholders readable in %s",
    (theme) => {
      const tokens = vars(theme);
      const placeholder =
        css.match(/\.field::placeholder \{([^}]+)\}/)?.[1] ?? "";
      const rawColor = placeholder.match(/color:\s*([^;]+)/)?.[1]?.trim() ?? "";
      const token = rawColor.match(/^var\((--[\w-]+)\)$/)?.[1];
      const alpha = Number(
        placeholder.match(/opacity:\s*([\d.]+)/)?.[1] ?? "1",
      );
      const ink = parseColor(token ? tokens[token] : rawColor)!;
      const paper = parseColor(tokens["--color-card"])!;
      const blended = `rgb(${ink.r * alpha + paper.r * (1 - alpha)}, ${ink.g * alpha + paper.g * (1 - alpha)}, ${ink.b * alpha + paper.b * (1 - alpha)})`;
      expect(
        contrastRatio(blended, tokens["--color-card"]),
      ).toBeGreaterThanOrEqual(4.5);
      expect(placeholder).toMatch(/opacity:\s*1\s*;/);
    },
  );
  it("lets the explicit site theme control native controls and light-dark colors", () => {
    expect(css.match(/html \{([^}]+)\}/)?.[1]).toContain(
      "color-scheme: light;",
    );
    expect(css.match(/\.dark \{([^}]+)\}/)?.[1]).toContain(
      "color-scheme: dark;",
    );
  });
  it.each([":root", ".dark"])(
    "keeps small secondary text readable in %s",
    (theme) => {
      const tokens = vars(theme);
      expect(
        contrastRatio(tokens["--color-sub"], tokens["--color-bg"]),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(tokens["--color-sub"], tokens["--color-card"]),
      ).toBeGreaterThanOrEqual(4.5);
    },
  );
  it.each([".home-page", ".dark .home-page"])(
    "keeps homepage links and descriptions readable in %s",
    (theme) => {
      const tokens = vars(theme);
      expect(
        contrastRatio(tokens["--home-muted"], tokens["--home-paper"]),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(tokens["--home-accent"], tokens["--home-paper"]),
      ).toBeGreaterThanOrEqual(4.5);
    },
  );
});
