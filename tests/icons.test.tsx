import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Icon, hasIcon } from "@/components/icons";
import { ALL_TOOLS } from "@/tools/registry";

describe("tool icon contract", () => {
  it("every registered tool names an actual glyph rather than the file fallback", () => {
    expect(ALL_TOOLS.filter(tool => !hasIcon(tool.icon)).map(tool => ({ slug: tool.slug, icon: tool.icon }))).toEqual([]);
  });

  it.each(["missing-icon", "constructor", "toString", "__proto__"])("safely renders the file fallback for %s", name => {
    expect(hasIcon(name)).toBe(false);
    expect(renderToStaticMarkup(<Icon name={name} />)).toBe(renderToStaticMarkup(<Icon name="file" />));
  });

  it("keeps registered calculator and PDF glyphs distinct from the generic file", () => {
    for (const name of ["calc", "pdf"]) {
      expect(hasIcon(name)).toBe(true);
      expect(renderToStaticMarkup(<Icon name={name} />)).not.toBe(renderToStaticMarkup(<Icon name="file" />));
    }
  });
});
