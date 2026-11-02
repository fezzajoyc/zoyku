import imageCompressor from "./image-compressor";
import imageResizer from "./image-resizer";
import cropImage from "./crop-image";
import rotateImage from "./rotate-image";
import convertImage from "./convert-image";
import jpgToPng from "./jpg-to-png";
import pngToJpg from "./png-to-jpg";
import webpConverter from "./webp-converter";
import heicToJpg from "./heic-to-jpg";
import svgConverter from "./svg-converter";
import screenshotTool from "./screenshot-tool";
import imageMetadataViewer from "./image-metadata-viewer";
import exifRemover from "./exif-remover";

import watermarkImage from "./watermark-image";
import mergeImages from "./merge-images";
import grayscaleImage from "./grayscale-image";
import faviconGenerator from "./favicon-generator";
import ocrImage from "./ocr-image";
import roundCornersImage from "./round-corners-image";

import imageBorder from "./image-border";
import imageSplitter from "./image-splitter";
import cropCircleImage from "./crop-circle-image";
import compressImageToSize from "./compress-image-to-size";

export const IMAGE_TOOLS = [
  imageCompressor,
  imageResizer,
  cropImage,
  rotateImage,
  convertImage,
  jpgToPng,
  pngToJpg,
  webpConverter,
  heicToJpg,
  svgConverter,
  screenshotTool,
  imageMetadataViewer,
  exifRemover,
  watermarkImage,
  mergeImages,
  grayscaleImage,
  faviconGenerator,
  ocrImage,
  roundCornersImage,
  imageBorder,
  imageSplitter,
  cropCircleImage,
  compressImageToSize,
];
