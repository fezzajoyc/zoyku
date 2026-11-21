import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/site";
import { extractImagePalette, IMAGE_PALETTE_LIMITS } from "@/tools/_lib/image-palette";
import { IMAGE_PALETTE_COPY, IMAGE_PALETTE_MESSAGES } from "@/tools/_lib/image-palette-copy";

const pixels = (...colors: number[][]) => colors.flat();

describe("image palette RGB groups", () => {
  it("reports a 75/25 distribution using original RGB values", () => {
    const result = extractImagePalette(pixels([255,0,0,255], [255,0,0,255], [0,0,255,255], [255,0,0,255]), 4, 1);
    expect(result).toMatchObject({ width:4, height:1, totalPixels:4, sampledPixels:4, visibleSamplePixels:4, totalAlphaWeight:4 });
    expect(result.groups.map(({ hex, percentage, weight }) => ({ hex, percentage, weight }))).toEqual([
      {hex:"#FF0000",percentage:75,weight:3}, {hex:"#0000FF",percentage:25,weight:1},
    ]);
  });

  it("ignores zero alpha and weights translucent colors and averages by alpha", () => {
    const result = extractImagePalette(pixels([1,2,3,255], [7,6,5,85], [0,0,255,170], [255,255,255,0]), 2, 2);
    // First group: alpha 340/255, rounded channels (850/340, 1020/340, 1190/340).
    expect(result.groups[0]).toMatchObject({r:3,g:3,b:4,hex:"#030304",rgb:"rgb(3, 3, 4)"});
    expect(result.groups[0].weight).toBeCloseTo(4/3, 12);
    expect(result.groups[0].percentage).toBeCloseTo(200/3, 12);
    expect(result.groups[1].percentage).toBeCloseTo(100/3, 12);
    expect(result.visibleSamplePixels).toBe(3);
    expect(result.totalAlphaWeight).toBe(2);
  });

  it("splits at 5-bit boundaries and breaks tied weights by numeric RGB group", () => {
    const result = extractImagePalette(pixels([8,0,0,255], [0,8,0,255], [0,0,8,255], [7,0,0,255], [1,0,0,255]), 5, 1);
    expect(result.groups.map(({group,hex}) => ({group,hex}))).toEqual([
      {group:0,hex:"#040000"}, {group:1,hex:"#000008"}, {group:32,hex:"#000800"}, {group:1024,hex:"#080000"},
    ]);
  });

  it("keeps omitted groups in the percentage denominator", () => {
    const result = extractImagePalette(pixels([255,0,0,255], [0,255,0,255], [0,0,255,255]), 3, 1, {colorCount:1});
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0].percentage).toBeCloseTo(100/3,12);
  });

  it("returns an honest empty palette for fully transparent input", () => {
    expect(extractImagePalette(pixels([255,0,0,0], [0,0,255,0]), 2, 1)).toMatchObject({ groups:[], sampledPixels:2, visibleSamplePixels:0, totalAlphaWeight:0 });
  });

  it("samples uniformly and deterministically within the hard cap", () => {
    const rgba = new Uint8Array(400*200*4);
    for (let i=0;i<80000;i++) rgba.set(i < 40000 ? [255,0,0,255] : [0,0,255,255], i*4);
    const result = extractImagePalette(rgba,400,200);
    expect(result.sampledPixels).toBe(65536);
    expect(result.groups.map(({hex,percentage})=>({hex,percentage}))).toEqual([{hex:"#0000FF",percentage:50},{hex:"#FF0000",percentage:50}]);
    expect(extractImagePalette(rgba,400,200)).toEqual(result);
    expect(extractImagePalette(rgba,400,200,{maxSamples:2}).groups.map(({percentage})=>percentage)).toEqual([50,50]);
    expect(IMAGE_PALETTE_LIMITS).toMatchObject({maxFileBytes:25*1024*1024,maxPixels:40_000_000,maxSide:16384,maxSamples:65536,maxColors:12});
  });

  it("rejects malformed dimensions, buffers, channels and limits", () => {
    const rgba = [255,0,0,255];
    for (const [width,height] of [[0,1],[-1,1],[1.5,1],[Infinity,1],[16385,1],[10000,5000]]) {
      expect(() => extractImagePalette(rgba,width,height)).toThrow(RangeError);
    }
    expect(() => extractImagePalette([1,2,3],1,1)).toThrow(/RGBA/);
    expect(() => extractImagePalette([1,2,3,4,5],1,1)).toThrow(/RGBA/);
    for (const channel of [-1,256,NaN,1.5,undefined]) expect(() => extractImagePalette([channel as number,0,0,255],1,1)).toThrow(/channel/);
    for (const colorCount of [0,13,1.5,NaN]) expect(() => extractImagePalette(rgba,1,1,{colorCount})).toThrow(RangeError);
    for (const maxSamples of [0,65537,1.5,Infinity]) expect(() => extractImagePalette(rgba,1,1,{maxSamples})).toThrow(RangeError);
  });
});

describe("image palette localization", () => {
  it("provides complete page and runtime messages in every locale", () => {
    const keys = Object.keys(IMAGE_PALETTE_MESSAGES.en).sort();
    for (const locale of LOCALES) {
      const copy = IMAGE_PALETTE_COPY[locale];
      expect(copy.name).toBeTruthy();
      expect(copy.tagline.length).toBeGreaterThanOrEqual(["zh","ja"].includes(locale)?32:80);
      expect(copy.steps).toHaveLength(3);
      expect(copy.faqs.length).toBeGreaterThanOrEqual(2);
      expect(Object.keys(IMAGE_PALETTE_MESSAGES[locale]).sort()).toEqual(keys);
      expect(Object.values(IMAGE_PALETTE_MESSAGES[locale]).every(value=>typeof value === "string" && value.length>0)).toBe(true);
    }
  });
});
