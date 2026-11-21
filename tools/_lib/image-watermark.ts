/** Local visible-watermark geometry; source evidence: LDDGO image-watermark entries. */
export const IMAGE_WATERMARK_LIMITS = Object.freeze({
  files: 6, fileBytes: 10 * 1024 * 1024, totalBytes: 30 * 1024 * 1024,
  sourcePixels: 10_000_000, sourceSide: 8192, logoBytes: 5 * 1024 * 1024,
  logoPixels: 2_000_000, logoSide: 4096, outputBytes: 50 * 1024 * 1024,
  textCharacters: 60, tiles: 144,
});
export const WATERMARK_POSITIONS = ["tl", "tc", "tr", "ml", "mc", "mr", "bl", "bc", "br"] as const;
export type WatermarkPosition = (typeof WATERMARK_POSITIONS)[number];
export type ImageWatermarkOptions = {
  width: number; height: number; markWidth: number; markHeight: number;
  /** Percent of source width before fitting the rotated mark inside the margin. */
  relativeWidth: number;
  /** Degrees clockwise. */
  rotation: number;
  /** Percent of the source's shorter edge. */
  margin: number;
  position: WatermarkPosition; tile: boolean;
};
export type ImageWatermarkPlan = {
  markWidth: number; markHeight: number; boundsWidth: number; boundsHeight: number;
  /** Clockwise radians for CanvasRenderingContext2D.rotate. */
  radians: number; margin: number; placements: { x: number; y: number }[];
};
export type ImageWatermarkPlanError = "options" | "dimensions" | "tile-limit";
export type ImageWatermarkPlanResult = { plan: ImageWatermarkPlan | null; error: ImageWatermarkPlanError | null };

export function planImageWatermark(options: ImageWatermarkOptions): ImageWatermarkPlanResult {
  const fail = (error: ImageWatermarkPlanError): ImageWatermarkPlanResult => ({ plan: null, error });
  if (!options || typeof options !== "object") return fail("options");
  const { width, height, markWidth, markHeight, relativeWidth, rotation, margin, position, tile } = options;
  if (![width, height].every(value => Number.isSafeInteger(value) && value > 0 && value <= IMAGE_WATERMARK_LIMITS.sourceSide) || width * height > IMAGE_WATERMARK_LIMITS.sourcePixels) return fail("dimensions");
  if (![markWidth, markHeight].every(value => Number.isFinite(value) && value > 0) || !Number.isFinite(markWidth / markHeight)) return fail("dimensions");
  if (!Number.isFinite(relativeWidth) || relativeWidth < 1 || relativeWidth > 90 || !Number.isFinite(rotation) || rotation < -180 || rotation > 180 || !Number.isFinite(margin) || margin < 0 || margin > 10 || !WATERMARK_POSITIONS.includes(position) || typeof tile !== "boolean") return fail("options");
  const pad = Math.min(width, height) * margin / 100;
  const availableWidth = width - 2 * pad, availableHeight = height - 2 * pad;
  const radians = rotation * Math.PI / 180;
  const cos = Math.abs(Math.cos(radians)), sin = Math.abs(Math.sin(radians));
  let drawWidth = width * relativeWidth / 100;
  let drawHeight = drawWidth * markHeight / markWidth;
  let boundsWidth = drawWidth * cos + drawHeight * sin;
  let boundsHeight = drawWidth * sin + drawHeight * cos;
  const fit = Math.min(1, availableWidth / boundsWidth, availableHeight / boundsHeight);
  drawWidth *= fit; drawHeight *= fit; boundsWidth *= fit; boundsHeight *= fit;
  if (![drawWidth, drawHeight, boundsWidth, boundsHeight].every(value => Number.isFinite(value) && value > 0)) return fail("dimensions");
  let placements: { x: number; y: number }[];
  if (tile) {
    const gap = Math.max(1, Math.min(width, height) * 0.04);
    const columns = Math.max(1, Math.floor((availableWidth + gap) / (boundsWidth + gap) + 1e-10));
    const rows = Math.max(1, Math.floor((availableHeight + gap) / (boundsHeight + gap) + 1e-10));
    if (columns * rows > IMAGE_WATERMARK_LIMITS.tiles) return fail("tile-limit");
    const firstX = pad + (availableWidth - (columns * boundsWidth + (columns - 1) * gap)) / 2 + boundsWidth / 2;
    const firstY = pad + (availableHeight - (rows * boundsHeight + (rows - 1) * gap)) / 2 + boundsHeight / 2;
    placements = Array.from({ length: rows * columns }, (_, index) => ({ x: firstX + (index % columns) * (boundsWidth + gap), y: firstY + Math.floor(index / columns) * (boundsHeight + gap) }));
  } else {
    const x = position.endsWith("l") ? pad + boundsWidth / 2 : position.endsWith("r") ? width - pad - boundsWidth / 2 : width / 2;
    const y = position.startsWith("t") ? pad + boundsHeight / 2 : position.startsWith("b") ? height - pad - boundsHeight / 2 : height / 2;
    placements = [{ x, y }];
  }
  return { error: null, plan: { markWidth: drawWidth, markHeight: drawHeight, boundsWidth, boundsHeight, radians, margin: pad, placements } };
}

export function watermarkDimensionsAllowed(width: number, height: number, logo = false): boolean {
  const side = logo ? IMAGE_WATERMARK_LIMITS.logoSide : IMAGE_WATERMARK_LIMITS.sourceSide;
  const pixels = logo ? IMAGE_WATERMARK_LIMITS.logoPixels : IMAGE_WATERMARK_LIMITS.sourcePixels;
  return Number.isSafeInteger(width) && Number.isSafeInteger(height) && width > 0 && height > 0 && width <= side && height <= side && width * height <= pixels;
}
