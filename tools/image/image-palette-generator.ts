import { ImagePaletteEngine } from "../_engines/image-engine-palette";
import { IMAGE_PALETTE_COPY } from "../_lib/image-palette-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "image-palette-generator",
  category: "image",
  icon: "palette",
  engine: { component: ImagePaletteEngine },
  related: ["image-color-picker", "color-picker", "gradient-generator", "image-metadata-viewer", "image-compressor"],
  copy: IMAGE_PALETTE_COPY,
});
