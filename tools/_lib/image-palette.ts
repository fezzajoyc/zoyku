/** Frequent quantized RGB groups, not a perceptual or optimal-color algorithm. */
export const IMAGE_PALETTE_LIMITS = {
  maxFileBytes: 25 * 1024 * 1024,
  maxPixels: 40_000_000,
  maxSide: 16_384,
  maxSamples: 65_536,
  maxColors: 12,
} as const;

export type ImagePaletteOptions = { colorCount?: number; maxSamples?: number };
export type ImagePaletteGroup = {
  group: number;
  r: number;
  g: number;
  b: number;
  hex: string;
  rgb: string;
  /** Sum of sampled alpha / 255 in this group. */
  weight: number;
  /** Percentage of ALL sampled visible alpha weight, including omitted groups. */
  percentage: number;
};
export type ImagePaletteResult = {
  width: number;
  height: number;
  totalPixels: number;
  sampledPixels: number;
  visibleSamplePixels: number;
  totalAlphaWeight: number;
  groups: ImagePaletteGroup[];
};

/**
 * Samples midpoint positions uniformly through the row-major RGBA raster.
 * Groups channels into 5-bit bins; averages original channels weighted by alpha.
 * This accepts decoded pixels, never image files or remote URLs.
 */
export function extractImagePalette(
  rgba: ArrayLike<number>,
  width: number,
  height: number,
  options: ImagePaletteOptions = {},
): ImagePaletteResult {
  if (![width, height].every(value => Number.isSafeInteger(value) && value > 0 && value <= IMAGE_PALETTE_LIMITS.maxSide)) {
    throw new RangeError("Image dimensions must be positive integers no larger than 16384.");
  }
  const totalPixels = width * height;
  if (totalPixels > IMAGE_PALETTE_LIMITS.maxPixels) throw new RangeError("Image exceeds the 40 megapixel limit.");
  if (!rgba || rgba.length !== totalPixels * 4) throw new RangeError("RGBA buffer length must equal width × height × 4.");
  const colorCount = options.colorCount ?? 8;
  const maxSamples = options.maxSamples ?? IMAGE_PALETTE_LIMITS.maxSamples;
  if (!Number.isInteger(colorCount) || colorCount < 1 || colorCount > IMAGE_PALETTE_LIMITS.maxColors) {
    throw new RangeError("Color count must be an integer from 1 to 12.");
  }
  if (!Number.isInteger(maxSamples) || maxSamples < 1 || maxSamples > IMAGE_PALETTE_LIMITS.maxSamples) {
    throw new RangeError("Sample limit must be an integer from 1 to 65536.");
  }
  // Byte arrays are already channel-safe; validate plain arrays (including omitted
  // sample positions) to reject malformed API input instead of coercing it.
  if (!(rgba instanceof Uint8Array) && !(rgba instanceof Uint8ClampedArray)) {
    for (let i = 0; i < rgba.length; i++) {
      const channel = rgba[i];
      if (!Number.isInteger(channel) || channel < 0 || channel > 255) throw new RangeError("RGBA channels must be integers from 0 to 255.");
    }
  }
  const sampledPixels = Math.min(totalPixels, maxSamples);
  let visibleSamplePixels = 0;
  let totalAlpha = 0;
  const bins = new Map<number, { alpha: number; r: number; g: number; b: number }>();
  for (let i = 0; i < sampledPixels; i++) {
    const offset = Math.floor(((i + 0.5) * totalPixels) / sampledPixels) * 4;
    const r = rgba[offset], g = rgba[offset + 1], b = rgba[offset + 2], a = rgba[offset + 3];
    if (a === 0) continue;
    visibleSamplePixels++;
    totalAlpha += a;
    const group = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
    const bin = bins.get(group) ?? { alpha: 0, r: 0, g: 0, b: 0 };
    bin.alpha += a;
    bin.r += r * a;
    bin.g += g * a;
    bin.b += b * a;
    bins.set(group, bin);
  }
  const groups = [...bins.entries()]
    .sort(([leftGroup, left], [rightGroup, right]) => right.alpha - left.alpha || leftGroup - rightGroup)
    .slice(0, colorCount)
    .map(([group, bin]): ImagePaletteGroup => {
      const r = Math.round(bin.r / bin.alpha), g = Math.round(bin.g / bin.alpha), b = Math.round(bin.b / bin.alpha);
      const hex = "#" + [r, g, b].map(value => value.toString(16).padStart(2, "0").toUpperCase()).join("");
      return { group, r, g, b, hex, rgb: `rgb(${r}, ${g}, ${b})`, weight: bin.alpha / 255, percentage: bin.alpha / totalAlpha * 100 };
    });
  return { width, height, totalPixels, sampledPixels, visibleSamplePixels, totalAlphaWeight: totalAlpha / 255, groups };
}
