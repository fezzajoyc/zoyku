export const IMAGE_COLOR_PICKER_LIMITS = {
  maxFileBytes: 25 * 1024 * 1024,
  maxPixels: 40_000_000,
  maxSide: 16_384,
} as const;

export type PixelColor = {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a: number;
};

export type FormattedPixelColor = PixelColor & {
  hex: string;
  hex8: string;
  rgb: string;
  rgba: string;
};

type Point = { clientX: number; clientY: number };
type Rect = { left: number; top: number; width: number; height: number };

function isPositiveInteger(value: number): boolean {
  return Number.isSafeInteger(value) && value > 0;
}

export function mapPointerToPixel(
  point: Point,
  rect: Rect,
  sourceWidth: number,
  sourceHeight: number,
): { x: number; y: number } | null {
  if (
    !Number.isFinite(point.clientX) ||
    !Number.isFinite(point.clientY) ||
    !Number.isFinite(rect.left) ||
    !Number.isFinite(rect.top) ||
    !isPositiveInteger(sourceWidth) ||
    !isPositiveInteger(sourceHeight) ||
    !Number.isFinite(rect.width) ||
    !Number.isFinite(rect.height) ||
    rect.width <= 0 ||
    rect.height <= 0
  ) {
    return null;
  }

  const localX = point.clientX - rect.left;
  const localY = point.clientY - rect.top;
  if (localX < 0 || localY < 0 || localX >= rect.width || localY >= rect.height) return null;

  const x = Math.floor((localX / rect.width) * sourceWidth);
  const y = Math.floor((localY / rect.height) * sourceHeight);
  return x < sourceWidth && y < sourceHeight ? { x, y } : null;
}

export function sampleRgbaPixel(
  rgba: ArrayLike<number>,
  width: number,
  height: number,
  x: number,
  y: number,
): PixelColor {
  if (!isPositiveInteger(width) || !isPositiveInteger(height)) {
    throw new RangeError("Image dimensions must be positive safe integers.");
  }
  if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || y < 0 || x >= width || y >= height) {
    throw new RangeError("Pixel coordinates are outside the image.");
  }

  const expectedLength = width * height * 4;
  if (!Number.isSafeInteger(expectedLength) || rgba.length < expectedLength) {
    throw new RangeError("RGBA buffer is shorter than the image dimensions require.");
  }

  const offset = (y * width + x) * 4;
  const [r, g, b, a] = [rgba[offset], rgba[offset + 1], rgba[offset + 2], rgba[offset + 3]];
  if ([r, g, b, a].some((channel) => !Number.isInteger(channel) || channel < 0 || channel > 255)) {
    throw new RangeError("RGBA channels must be integers from 0 to 255.");
  }

  return { x, y, r, g, b, a };
}

export function formatPixelColor(pixel: PixelColor): FormattedPixelColor {
  const { x, y, r, g, b, a } = pixel;
  if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || y < 0) {
    throw new RangeError("Pixel coordinates must be non-negative integers.");
  }
  if ([r, g, b, a].some((channel) => !Number.isInteger(channel) || channel < 0 || channel > 255)) {
    throw new RangeError("Color channels must be integers from 0 to 255.");
  }

  const hexChannels = [r, g, b, a].map((channel) => channel.toString(16).padStart(2, "0").toUpperCase());
  const alpha = Number((a / 255).toFixed(5));
  return {
    x,
    y,
    r,
    g,
    b,
    a,
    hex: `#${hexChannels.slice(0, 3).join("")}`,
    hex8: `#${hexChannels.join("")}`,
    rgb: `rgb(${r}, ${g}, ${b})`,
    rgba: `rgba(${r}, ${g}, ${b}, ${alpha})`,
  };
}
