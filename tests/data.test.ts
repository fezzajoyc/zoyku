/**
 * Dataset integrity tests for tools/_engines/*-data.ts plus the fancy-text
 * Unicode maps (tested through the public fancyText API since the raw maps
 * are module-private).
 */
import { describe, it, expect } from "vitest";
import { EMOJI_ALL, EMOJI_GROUPS } from "@/tools/_engines/text-emoji-data";
import { STATUS_GROUPS, STATUS_TOTAL } from "@/tools/_engines/dev-http-status-data";
import { fancyText, type FancyStyle } from "@/tools/_lib/transforms";
import { LOCALES } from "@/lib/site";

/** The 8 groups documented in the emoji dataset header. */
const EMOJI_GROUP_KEYS = ["smileys", "people", "animals", "food", "activities", "travel", "objects", "symbols"];

const ZWJ = "\u200d";
const SKIN_TONES = /[\u{1F3FB}-\u{1F3FF}]/u;
const VARIATION_SELECTOR_16 = "\ufe0f";

describe("emoji dataset", () => {
  it("ships at least 300 emoji entries", () => {
    expect(EMOJI_ALL.length).toBeGreaterThanOrEqual(300);
  });

  it("has no duplicate emoji characters across the whole dataset", () => {
    const chars = EMOJI_ALL.map((e) => e.char);
    expect(new Set(chars).size).toBe(chars.length);
  });

  it("gives every entry a non-empty name and char inside a group", () => {
    for (const group of EMOJI_GROUPS) {
      expect(group.items.length, `group ${group.key} is empty`).toBeGreaterThan(0);
      for (const item of group.items) {
        expect(item.name.trim().length, `empty name in ${group.key}`).toBeGreaterThan(0);
        expect(item.char.length, `empty char for ${item.name}`).toBeGreaterThan(0);
      }
    }
  });

  it("uses exactly the eight documented groups with labels resolvable in every locale", () => {
    expect(EMOJI_GROUPS.map((g) => g.key)).toEqual(EMOJI_GROUP_KEYS);
    for (const group of EMOJI_GROUPS) {
      for (const locale of LOCALES) {
        expect((group.label[locale] ?? group.label.en).trim().length, `group ${group.key} missing ${locale} label`).toBeGreaterThan(0);
      }
    }
  });

  it("contains no ZWJ sequences and no skin-tone variants, as documented", () => {
    for (const item of EMOJI_ALL) {
      expect(item.char.includes(ZWJ), `ZWJ in ${item.name}`).toBe(false);
      expect(SKIN_TONES.test(item.char), `skin tone in ${item.name}`).toBe(false);
    }
  });

  it("is composed of single code points, optionally followed by a VS16 emoji-presentation selector", () => {
    for (const item of EMOJI_ALL) {
      const cps = [...item.char];
      const ok = cps.length === 1 || (cps.length === 2 && cps[1] === VARIATION_SELECTOR_16);
      expect(ok, `${item.name} = ${item.char} has ${cps.length} code points`).toBe(true);
    }
  });
});

describe("http status dataset", () => {
  const allCodes = STATUS_GROUPS.flatMap((g) => g.codes);

  it("ships at least 50 status codes", () => {
    expect(STATUS_TOTAL).toBeGreaterThanOrEqual(50);
    expect(allCodes.length).toBe(STATUS_TOTAL);
  });

  it("has unique codes in the 100–599 range", () => {
    const codes = allCodes.map((c) => c.code);
    expect(new Set(codes).size).toBe(codes.length);
    for (const code of codes) {
      expect(code, "code must be an integer").toBe(Math.trunc(code));
      expect(code).toBeGreaterThanOrEqual(100);
      expect(code).toBeLessThanOrEqual(599);
    }
  });

  it("assigns each code to the group matching its class digit", () => {
    expect(STATUS_GROUPS.map((g) => g.cls)).toEqual(["1xx", "2xx", "3xx", "4xx", "5xx"]);
    for (const group of STATUS_GROUPS) {
      const cls = Number(group.cls[0]);
      for (const entry of group.codes) {
        expect(Math.floor(entry.code / 100), `code ${entry.code} misplaced in ${group.cls}`).toBe(cls);
      }
    }
  });

  it("gives every code a name and a description resolvable in every locale", () => {
    for (const entry of allCodes) {
      expect(entry.name.trim().length, `code ${entry.code} missing name`).toBeGreaterThan(0);
      for (const locale of LOCALES) {
        expect((entry.desc[locale] ?? entry.desc.en).trim().length, `code ${entry.code} missing ${locale} description`).toBeGreaterThan(0);
      }
    }
  });

  it("gives every class group a label resolvable in every locale", () => {
    for (const group of STATUS_GROUPS) {
      for (const locale of LOCALES) {
        expect((group.label[locale] ?? group.label.en).trim().length, `group ${group.cls} missing ${locale} label`).toBeGreaterThan(0);
      }
    }
  });
});

/**
 * Fancy maps are private to transforms.ts, so the contract is exercised via
 * the public fancyText(style) API. Map styles = everything except the two
 * combining-mark styles.
 */
const MAP_STYLES: FancyStyle[] = [
  "bold",
  "italic",
  "bold-italic",
  "script",
  "bold-script",
  "double-struck",
  "monospace",
  "circled",
  "squared",
  "fullwidth",
];
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";

/** Code points fancyText(style, ch) produces for a single-character input. */
function mappedCodePoints(style: FancyStyle, ch: string): number[] {
  return [...fancyText(ch, style)].map((c) => c.codePointAt(0)!);
}

describe("fancy text maps", () => {
  it("maps A–Z and a–z to non-ASCII glyphs, all distinct within each style, in all ten map styles", () => {
    for (const style of MAP_STYLES) {
      const ups = mappedCodePoints(style, UPPER);
      const los = mappedCodePoints(style, LOWER);
      expect(new Set(ups).size, `${style} uppercase not 26 distinct`).toBe(26);
      expect(new Set(los).size, `${style} lowercase not 26 distinct`).toBe(26);
      expect(ups.every((cp) => cp > 0x7f), `${style} has ASCII uppercase glyph`).toBe(true);
      expect(los.every((cp) => cp > 0x7f), `${style} has ASCII lowercase glyph`).toBe(true);
      expect(ups.every((cp, i) => cp !== (65 + i)), `${style} leaves an uppercase letter unmapped`).toBe(true);
      expect(los.every((cp, i) => cp !== (97 + i)), `${style} leaves a lowercase letter unmapped`).toBe(true);
    }
  });

  it("shares glyphs between upper and lower case only in squared (documented), nowhere else", () => {
    for (const style of MAP_STYLES) {
      const combined = new Set([...mappedCodePoints(style, UPPER), ...mappedCodePoints(style, LOWER)]);
      if (style === "squared") {
        expect(combined.size, "squared should reuse the 26 boxed glyphs").toBe(26);
      } else {
        expect(combined.size, `${style} collides upper and lower case`).toBe(52);
      }
    }
  });

  it("never maps the same letter to the same glyph in two different styles", () => {
    for (let i = 0; i < 52; i++) {
      const ch = (UPPER + LOWER)[i];
      const seen = new Map<number, string>();
      for (const style of MAP_STYLES) {
        const cps = mappedCodePoints(style, ch);
        expect(cps.length, `${style} must map ${ch} to one code point`).toBe(1);
        const cp = cps[0];
        const owner = seen.get(cp);
        expect(owner, `${ch} maps to U+${cp.toString(16)} in both ${owner} and ${style}`).toBeUndefined();
        seen.set(cp, style);
      }
    }
  });

  it("maps digits in the seven styles that have digit forms and leaves them literal elsewhere", () => {
    const mappedStyles = ["bold", "bold-italic", "bold-script", "double-struck", "monospace", "circled", "fullwidth"];
    const passthroughStyles = ["italic", "script", "squared"];
    for (const style of mappedStyles as FancyStyle[]) {
      const cps = mappedCodePoints(style, DIGITS);
      expect(new Set(cps).size, `${style} digit glyphs not distinct`).toBe(10);
      expect(cps.every((cp) => cp > 0x7f), `${style} has ASCII digit glyph`).toBe(true);
    }
    for (const style of passthroughStyles as FancyStyle[]) {
      expect(fancyText(DIGITS, style), `${style} should pass digits through`).toBe(DIGITS);
    }
  });

  it("appends combining marks in strikethrough and underline and keeps fullwidth/circled special forms", () => {
    for (const ch of "aZ0中文😀") {
      expect([...fancyText(ch, "strikethrough")]).toEqual([ch, "\u0336"]);
      expect([...fancyText(ch, "underline")]).toEqual([ch, "\u0332"]);
    }
    expect(fancyText("0", "circled")).toBe("⓪");
    expect(fancyText(" ", "fullwidth")).toBe("\u3000");
  });
});
