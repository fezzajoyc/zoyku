"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, formatBytes } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import type { Locale } from "@/lib/site";
import { ToolPanel } from "@/components/ui";
import { loadImage, parseExif, parsePngHeader, type ExifResult, type PngInfo } from "./image-util";

/** image-metadata-viewer 引擎:尺寸 / 类型 / 体积 + JPEG EXIF(手写解析器)或 PNG IHDR 信息。 */

const L: Record<string, Record<string, string>> =  {
  fileName: { en: "File name", zh: "文件名", ja: "ファイル名", es: "Nombre", pt: "Nome" },
  type: { en: "Type", zh: "类型", ja: "形式", es: "Tipo", pt: "Tipo" },
  clearAll: { en: "Clear all", zh: "清空全部", ja: "すべて削除", es: "Borrar todo", pt: "Limpar tudo" },
  reading: {
    en: "Reading files…", zh: "正在读取文件…", ja: "ファイルを読み込み中…",
    es: "Leyendo archivos…", pt: "Lendo arquivos…",
  },
  dimensions: { en: "Dimensions", zh: "尺寸", ja: "サイズ", es: "Dimensiones", pt: "Dimensões" },
  pixels: { en: "Megapixels", zh: "像素总量", ja: "画素数", es: "Megapíxeles", pt: "Megapixels" },
  noExif: {
    en: "No EXIF data found. EXIF is carried mainly by JPEG photos — PNG, GIF and most WebP files have none.",
    zh: "未找到 EXIF 数据。EXIF 主要存在于 JPEG 照片中,PNG、GIF 和大多数 WebP 文件没有。",
    ja: "EXIF データは見つかりませんでした。EXIF は主に JPEG 写真が持ち、PNG・GIF・大半の WebP には含まれません。",
    es: "No se encontraron datos EXIF. El EXIF lo llevan sobre todo las fotos JPEG: los PNG, GIF y la mayoría de los WebP no tienen.",
    pt: "Nenhum dado EXIF encontrado. O EXIF é carregado principalmente por fotos JPEG — PNG, GIF e a maioria dos WebP não têm.",
  },
  noExifJpeg: {
    en: "No EXIF data in this JPEG — it was likely stripped by an editor or export.",
    zh: "这张 JPEG 没有 EXIF——可能已被编辑器或导出流程移除。",
    ja: "この JPEG に EXIF はありません。エディタや書き出しで削除された可能性があります。",
    es: "Este JPEG no tiene datos EXIF: probablemente los eliminó un editor o el proceso de exportación.",
    pt: "Este JPEG não tem dados EXIF — provavelmente foram removidos por um editor ou na exportação.",
  },
  gps: { en: "GPS location", zh: "GPS 位置", ja: "GPS 位置情報", es: "Ubicación GPS", pt: "Localização GPS" },
  openMap: { en: "Open in Maps", zh: "在地图中打开", ja: "地図で開く", es: "Abrir en Mapas", pt: "Abrir no Mapas" },
  pngInfo: { en: "PNG details", zh: "PNG 信息", ja: "PNG の詳細", es: "Detalles PNG", pt: "Detalhes PNG" },
  bitDepth: { en: "Bit depth", zh: "位深", ja: "ビット深度", es: "Profundidad de bits", pt: "Profundidade de bits" },
  colorType: { en: "Color type", zh: "颜色类型", ja: "カラータイプ", es: "Tipo de color", pt: "Tipo de cor" },
  interlaced: { en: "Interlaced", zh: "交错扫描", ja: "インターレース", es: "Entrelazado", pt: "Entrelaçado" },
  yes: { en: "Yes", zh: "是", ja: "はい", es: "Sí", pt: "Sim" },
  no: { en: "No", zh: "否", ja: "いいえ", es: "No", pt: "Não" },
  remove: {
    en: "Want to delete this data before sharing? Use the EXIF remover.",
    zh: "想在分享前删除这些数据?使用 EXIF 清除工具。",
    ja: "共有前にこのデータを消したい場合は EXIF 削除ツールを。",
    es: "¿Quieres borrar estos datos antes de compartir? Usa el eliminador de EXIF.",
    pt: "Quer apagar esses dados antes de compartilhar? Use o removedor de EXIF.",
  },
} satisfies Record<string, Record<string, string>>;

type Card = {
  id: string;
  name: string;
  size: number;
  mime: string;
  w: number;
  h: number;
  thumb: string;
  exif: ExifResult | null; // null = 非 JPEG
  png: PngInfo;
};

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dashed hairline py-1.5 last:border-0">
      <span className="flex-none text-[13px] text-[var(--color-sub)]">{label}</span>
      <span className="mono min-w-0 truncate text-right text-[13px] font-medium">{value}</span>
    </div>
  );
}

export function ImageMetadataEngine({ accept = "image/*" }: { accept?: string }) {
  const { locale, t } = useI18n();
  const [cards, setCards] = useState<Card[]>([]);
  const [busy, setBusy] = useState(false);

  const urlsRef = useRef<string[]>([]);
  useEffect(() => {
    const urls = urlsRef.current;
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const addFiles = useCallback((list: File[]) => {
    void (async () => {
      setBusy(true);
      const next: Card[] = [];
      for (let i = 0; i < list.length; i++) {
        const file = list[i];
        try {
          const [img, buf] = await Promise.all([
            loadImage(file),
            file.arrayBuffer(),
          ]);
          const isJpeg = file.type === "image/jpeg" || /\.jpe?g$/i.test(file.name);
          const thumb = URL.createObjectURL(file);
          urlsRef.current.push(thumb);
          next.push({
            id: `${file.name}-${file.lastModified}-${i}`,
            name: file.name,
            size: file.size,
            mime: file.type || file.name.split(".").pop()?.toUpperCase() || "?",
            w: img.naturalWidth,
            h: img.naturalHeight,
            thumb,
            exif: isJpeg ? parseExif(buf) : null,
            png: parsePngHeader(buf),
          });
        } catch {
          // 无法解码的文件直接跳过
        }
      }
      setCards((prev) => [...prev, ...next]);
      setBusy(false);
    })();
  }, []);

  return (
    <ToolPanel>
      <DropZone onFiles={addFiles} accept={accept}>
        <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFiles}</p>
      </DropZone>

      {busy && (
        <p className="mt-4 text-[13.5px] text-[var(--color-sub)]" role="status">
          {L.reading[locale] ?? L.reading.en}
        </p>
      )}

      {cards.length > 0 && (
        <div className="mt-5 space-y-3">
          {cards.map((card) => (
            <article key={card.id} className="rounded-2xl border hairline p-4">
              <div className="flex items-start gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.thumb}
                  alt=""
                  aria-hidden="true"
                  className="h-20 w-20 flex-none rounded-xl border hairline bg-[var(--color-surface)] object-contain"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="mono truncate text-[14px] font-semibold">{card.name}</h3>
                  <div className="mt-2 grid gap-x-8 sm:grid-cols-2">
                    <Row label={t.common.fileSize} value={formatBytes(card.size)} />
                    <Row label={L.type[locale] ?? L.type.en} value={card.mime} />
                    <Row label={L.dimensions[locale] ?? L.dimensions.en} value={`${card.w} × ${card.h} px`} />
                    <Row
                      label={L.pixels[locale] ?? L.pixels.en}
                      value={`${((card.w * card.h) / 1_000_000).toFixed(1)} MP`}
                    />
                  </div>
                </div>
              </div>

              {card.exif !== null ? (
                card.exif.entries.length > 0 ? (
                  <div className="mt-3 rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5">
                    <div className="grid gap-x-8 sm:grid-cols-2">
                      {card.exif.entries.map((e) => (
                        <Row key={e.label} label={e.label} value={e.value} />
                      ))}
                    </div>
                    <p className="mt-2 flex items-start gap-1.5 text-[12.5px] leading-5 text-[var(--color-sub)]">
                      <Icon name="lock" size={13} className="mt-0.5 flex-none text-[var(--color-good)]" />
                      {L.remove[locale] ?? L.remove.en}
                    </p>
                  </div>
                ) : (
                  <p className="mt-3 text-[13px] text-[var(--color-sub)]">{L.noExifJpeg[locale] ?? L.noExifJpeg.en}</p>
                )
              ) : card.png ? (
                <div className="mt-3 rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5">
                  <p className="mb-1 text-[13px] font-semibold">{L.pngInfo[locale] ?? L.pngInfo.en}</p>
                  <div className="grid gap-x-8 sm:grid-cols-2">
                    <Row label={L.bitDepth[locale] ?? L.bitDepth.en} value={card.png.bitDepth} />
                    <Row label={L.colorType[locale] ?? L.colorType.en} value={card.png.colorType} />
                    <Row label={L.interlaced[locale] ?? L.interlaced.en} value={card.png.interlaced ? L.yes[locale] ?? L.yes.en : L.no[locale] ?? L.no.en} />
                  </div>
                  <p className="mt-2 text-[12.5px] leading-5 text-[var(--color-sub)]">{L.noExif[locale] ?? L.noExif.en}</p>
                </div>
              ) : (
                <p className="mt-3 text-[13px] text-[var(--color-sub)]">{L.noExif[locale] ?? L.noExif.en}</p>
              )}

              {card.exif?.gps && (
                <p className="mt-2.5 flex flex-wrap items-center gap-2 text-[13px]">
                  <Icon name="globe" size={14} className="text-[var(--color-accent-strong)]" />
                  <span className="font-medium">{L.gps[locale] ?? L.gps.en}:</span>
                  <span className="mono">
                    {card.exif.gps.lat.toFixed(6)}, {card.exif.gps.lon.toFixed(6)}
                  </span>
                  <a
                    href={`https://www.google.com/maps?q=${card.exif.gps.lat},${card.exif.gps.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--color-accent-strong)] hover:underline"
                  >
                    {L.openMap[locale] ?? L.openMap.en} ↗
                  </a>
                </p>
              )}
            </article>
          ))}
          <button
            type="button"
            onClick={() => setCards([])}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {L.clearAll[locale] ?? L.clearAll.en}
          </button>
        </div>
      )}
    </ToolPanel>
  );
}
