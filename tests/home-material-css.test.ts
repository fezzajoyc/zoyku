import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const material = css.slice(css.indexOf("/* Home A→B material scene."));

describe("home material progressive CSS", () => {
  it("keeps the filtered ribbon still while the scroll scene is idle", () => {
    expect(css).toMatch(/\.home-material-scene \.ribbon-drift,\s*\.home-material-scene \.ribbon-bg \.spark\s*\{\s*animation: none;/);
  });
  it("uses solid home surfaces when neither standard nor WebKit backdrop blur is supported", () => {
    const fallback = material.slice(material.indexOf("@supports not"));
    expect(fallback).toMatch(
      /@supports not \(\(backdrop-filter: blur\(1px\)\) or \(-webkit-backdrop-filter: blur\(1px\)\)\)/,
    );
    expect(fallback).toMatch(
      /\.home-material-scene \.home-search[\s\S]*?\.home-material-scene \.home-tool-card\s*\{\s*background: var\(--color-card\);/,
    );
    expect(fallback).toMatch(
      /\.home-material-scene \.home-category-card\s*\{\s*background: var\(--home-tint\);/,
    );
  });
  it("bounds the ambient layer and blur without interpolating card geometry", () => {
    expect(material).toContain("height: min(760px, 100svh)");
    expect(material).toContain(
      "--home-frost: calc(var(--home-progress) * 16px)",
    );
    const cardPaint =
      material.match(
        /\.home-material-scene \.home-tool-card \{([^}]+)\}/,
      )?.[1] ?? "";
    expect(cardPaint).toContain("background:");
    expect(cardPaint).not.toMatch(/(?:height|width|padding|margin|font-size):/);
    expect(material).not.toMatch(/(?:^|\n)(?:html|body|:root)\b/);
  });
  it("keeps static A before JavaScript whenever reduced motion is preferred", () => {
    const reduced = material.slice(
      material.indexOf("@media (prefers-reduced-motion: reduce)"),
    );
    expect(reduced).toContain("--home-progress: 0 !important");
    expect(reduced).toContain("transform: none");
    expect(reduced).toContain("backdrop-filter: none");
  });
});
