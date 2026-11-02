/** 图像引擎共享的纯函数工具:加载、编码能力探测、命名、EXIF / PNG 元数据解析。 */

export type ImgFormat = "image/png" | "image/jpeg" | "image/webp";

export const FORMAT_EXT: Record<ImgFormat, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export function isImgFormat(v: string): v is ImgFormat {
  return v === "image/png" || v === "image/jpeg" || v === "image/webp";
}

/** 按文件 MIME 推断保留原格式;未知类型按 PNG 处理。 */
export function originalFormat(file: File): ImgFormat {
  if (isImgFormat(file.type)) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "webp") return "image/webp";
  return "image/png";
}

/** 用 object URL 解码图片,读完即释放。 */
export function loadImage(file: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("decode-failed"));
    };
    img.src = url;
  });
}

const encodeCache = new Map<string, boolean>();

/** 探测当前浏览器能否用 canvas.toBlob 编码该格式(Safari 不支持 WebP 编码)。 */
export function supportsEncode(type: ImgFormat): boolean {
  if (typeof document === "undefined") return false;
  if (!encodeCache.has(type)) {
    try {
      const c = document.createElement("canvas");
      c.width = 1;
      c.height = 1;
      encodeCache.set(type, c.toDataURL(type).startsWith(`data:${type};`));
    } catch {
      encodeCache.set(type, false);
    }
  }
  return encodeCache.get(type)!;
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("encode-failed"))),
      type,
      quality,
    );
  });
}

/** photo.jpg → photo-min.jpg */
export function outputName(file: File, suffix: string, ext: string): string {
  const base = file.name.replace(/\.[^.]+$/, "") || file.name;
  return `${base}${suffix}.${ext}`;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

/* ------------------------------------------------------------------ */
/* EXIF(极简手写解析器,仅覆盖 JPEG APP1 / TIFF 结构的常用标签)      */
/* ------------------------------------------------------------------ */

export type ExifEntry = { label: string; value: string };
export type ExifResult = {
  hasExif: boolean;
  entries: ExifEntry[];
  orientation?: number;
  gps?: { lat: number; lon: number };
};

type RawTag = { type: number; count: number; off: number };

const TYPE_SIZE: Record<number, number> = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };

const ORIENTATIONS: Record<number, string> = {
  1: "0°",
  2: "0° mirrored",
  3: "180°",
  4: "180° mirrored",
  5: "90° CW mirrored",
  6: "90° CW",
  7: "270° CW mirrored",
  8: "270° CW",
};

const GPS_LABELS: Record<number, string> = {
  0: "GPSVersionID",
  1: "GPSLatitudeRef",
  2: "GPSLatitude",
  3: "GPSLongitudeRef",
  4: "GPSLongitude",
  5: "GPSAltitudeRef",
  6: "GPSAltitude",
};

function readRational(view: DataView, off: number, little: boolean, signed: boolean): number {
  const n = signed ? view.getInt32(off, little) : view.getUint32(off, little);
  const d = signed ? view.getInt32(off + 4, little) : view.getUint32(off + 4, little);
  return d === 0 ? 0 : n / d;
}

function readTagValue(view: DataView, tag: RawTag, tiff: number, little: boolean): number | number[] | string {
  const { type, count, off } = tag;
  if (type === 2) {
    let s = "";
    for (let i = 0; i < count - 1 && off + i < view.byteLength; i++) {
      const c = view.getUint8(off + i);
      if (c === 0) break;
      s += String.fromCharCode(c);
    }
    return s;
  }
  if (type === 3) {
    const out: number[] = [];
    for (let i = 0; i < count; i++) out.push(view.getUint16(off + i * 2, little));
    return count === 1 ? out[0] : out;
  }
  if (type === 4) {
    const out: number[] = [];
    for (let i = 0; i < count; i++) out.push(view.getUint32(off + i * 4, little));
    return count === 1 ? out[0] : out;
  }
  if (type === 5 || type === 10) {
    const signed = type === 10;
    const out: number[] = [];
    for (let i = 0; i < count; i++) out.push(readRational(view, off + i * 8, little, signed));
    return count === 1 ? out[0] : out;
  }
  if (type === 1 || type === 7 || type === 9) {
    if (count === 1) return view.getUint8(off);
    const out: number[] = [];
    for (let i = 0; i < count; i++) out.push(view.getUint8(off + i));
    return out;
  }
  return "";
}

function readIFD(view: DataView, start: number, tiff: number, little: boolean): Map<number, RawTag> {
  const map = new Map<number, RawTag>();
  if (start + 2 > view.byteLength) return map;
  const n = view.getUint16(start, little);
  for (let i = 0; i < n; i++) {
    const e = start + 2 + i * 12;
    if (e + 12 > view.byteLength) break;
    const type = view.getUint16(e + 2, little);
    const count = view.getUint32(e + 4, little);
    const size = (TYPE_SIZE[type] ?? 1) * count;
    const off = size <= 4 ? e + 8 : tiff + view.getUint32(e + 8, little);
    map.set(view.getUint16(e, little), { type, count, off });
  }
  return map;
}

function fmt1(v: number, digits = 1): string {
  return String(Math.round(v * 10 ** digits) / 10 ** digits);
}

/** 解析 JPEG 的 EXIF。非 JPEG 或没有 APP1/Exif 段时 hasExif = false。 */
export function parseExif(buf: ArrayBuffer): ExifResult {
  const empty: ExifResult = { hasExif: false, entries: [] };
  const view = new DataView(buf);
  if (view.byteLength < 4 || view.getUint16(0) !== 0xffd8) return empty;

  // 找 APP1(Exif)段
  let tiff = -1;
  let offset = 2;
  while (offset + 4 < view.byteLength) {
    const marker = view.getUint16(offset);
    if ((marker & 0xff00) !== 0xff00) break;
    const size = view.getUint16(offset + 2);
    if (marker === 0xffe1 && view.getUint32(offset + 4) === 0x45786966) {
      // "Exif"
      tiff = offset + 10; // 段头(4)+ 长度(2)+"Exif\0\0"(6)
      break;
    }
    if (marker === 0xffda) break; // SOS:后面是压缩数据
    offset += 2 + size;
  }
  if (tiff < 0 || tiff + 8 > view.byteLength) return empty;

  const little = view.getUint16(tiff) === 0x4949;
  if (!little && view.getUint16(tiff) !== 0x4d4d) return empty;
  if (view.getUint16(tiff + 2, little) !== 0x2a) return empty;

  const ifd0 = readIFD(view, tiff + view.getUint32(tiff + 4, little), tiff, little);
  const exifIfdTag = ifd0.get(0x8769);
  const gpsIfdTag = ifd0.get(0x8825);
  const exifIfd = exifIfdTag ? readIFD(view, tiff + Number(readTagValue(view, exifIfdTag, tiff, little)), tiff, little) : null;
  const gpsIfd = gpsIfdTag ? readIFD(view, tiff + Number(readTagValue(view, gpsIfdTag, tiff, little)), tiff, little) : null;

  const str = (m: Map<number, RawTag> | null, t: number): string => {
    const tag = m?.get(t);
    return tag ? String(readTagValue(view, tag, tiff, little)) : "";
  };
  const num = (m: Map<number, RawTag> | null, t: number): number => {
    const tag = m?.get(t);
    if (!tag) return NaN;
    const v = readTagValue(view, tag, tiff, little);
    return typeof v === "number" ? v : NaN;
  };
  const rat = (m: Map<number, RawTag> | null, t: number): number => {
    const tag = m?.get(t);
    if (!tag) return NaN;
    const v = readTagValue(view, tag, tiff, little);
    return typeof v === "number" ? v : NaN;
  };

  const entries: ExifEntry[] = [];
  const push = (label: string, value: string) => {
    if (value) entries.push({ label, value });
  };

  push("Camera make", str(ifd0, 0x010f));
  push("Camera model", str(ifd0, 0x0110));
  push("Lens model", str(exifIfd, 0xa434));
  push("Software", str(ifd0, 0x0131));
  push("Date / time", str(ifd0, 0x0132));
  push("Date taken", str(exifIfd, 0x9003));
  push("Artist", str(ifd0, 0x013b) || str(ifd0, 0x8298));

  const exposure = rat(exifIfd, 0x829a);
  if (!Number.isNaN(exposure) && exposure > 0) {
    push("Exposure", exposure < 1 ? `1/${Math.round(1 / exposure)} s` : `${fmt1(exposure, 2)} s`);
  }
  const fnum = rat(exifIfd, 0x829d);
  if (!Number.isNaN(fnum) && fnum > 0) push("Aperture", `f/${fmt1(fnum, 1)}`);
  const iso = num(exifIfd, 0x8827);
  if (!Number.isNaN(iso)) push("ISO", String(iso));
  const focal = rat(exifIfd, 0x920a);
  if (!Number.isNaN(focal) && focal > 0) push("Focal length", `${fmt1(focal, 1)} mm`);

  const orientation = num(ifd0, 0x0112);
  if (!Number.isNaN(orientation) && orientation >= 1 && orientation <= 8) {
    push("Orientation", `${ORIENTATIONS[orientation]} (flag ${orientation})`);
  }

  let gps: ExifResult["gps"];
  if (gpsIfd) {
    const latRef = str(gpsIfd, 1) || "N";
    const lonRef = str(gpsIfd, 3) || "E";
    const latArr = readTagValue(view, gpsIfd.get(2)!, tiff, little);
    const lonArr = readTagValue(view, gpsIfd.get(4)!, tiff, little);
    if (Array.isArray(latArr) && latArr.length >= 3 && Array.isArray(lonArr) && lonArr.length >= 3) {
      const toDeg = (a: number[]) => a[0] + a[1] / 60 + a[2] / 3600;
      const lat = toDeg(latArr) * (latRef.startsWith("S") ? -1 : 1);
      const lon = toDeg(lonArr) * (lonRef.startsWith("W") ? -1 : 1);
      if (Number.isFinite(lat) && Number.isFinite(lon) && (lat !== 0 || lon !== 0)) {
        gps = { lat, lon };
        push("GPS position", `${lat.toFixed(6)}, ${lon.toFixed(6)} (${latRef}/${lonRef})`);
      }
    }
    const alt = rat(gpsIfd, 6);
    if (!Number.isNaN(alt)) push("GPS altitude", `${fmt1(alt, 0)} m`);
  }

  return {
    hasExif: entries.length > 0 || gps !== undefined,
    entries,
    orientation: Number.isNaN(orientation) ? undefined : orientation,
    gps,
  };
}

/* ------------------------------------------------------------------ */
/* PNG IHDR(位深 / 颜色类型 / 交错),用于元数据查看器                  */
/* ------------------------------------------------------------------ */

const PNG_COLOR_TYPES: Record<number, string> = {
  0: "Grayscale",
  2: "RGB",
  3: "Palette",
  4: "Grayscale + alpha",
  6: "RGBA",
};

export type PngInfo = { bitDepth: number; colorType: string; interlaced: boolean } | null;

export function parsePngHeader(buf: ArrayBuffer): PngInfo {
  const view = new DataView(buf);
  // 8 字节签名 + IHDR 长度(4)+ "IHDR"(4)+ 宽(4)+ 高(4)+ 位深(1)+ 颜色类型(1)
  if (view.byteLength < 27) return null;
  if (view.getUint32(0) !== 0x89504e47 || view.getUint32(12) !== 0x49485452) return null;
  const bitDepth = view.getUint8(24);
  const ct = view.getUint8(25);
  return {
    bitDepth,
    colorType: PNG_COLOR_TYPES[ct] ?? `type ${ct}`,
    interlaced: view.getUint8(26) === 1,
  };
}
