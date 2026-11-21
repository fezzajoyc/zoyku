import { ImageWatermarkEngine } from "../_engines/image-engine-watermark";
import { IMAGE_WATERMARK_COPY } from "../_lib/image-watermark-copy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "watermark-image",
  category: "image",
  icon: "image",
  engine: { component: ImageWatermarkEngine },
  related: ["image-resizer", "crop-image", "exif-remover", "image-compressor", "grayscale-image", "image-border", "image-splitter", "compress-image-to-size", "crop-circle-image", "heic-to-jpg"],
  copy: IMAGE_WATERMARK_COPY,
});
