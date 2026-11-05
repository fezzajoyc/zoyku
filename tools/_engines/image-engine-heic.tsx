"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import type { Locale } from "@/lib/site";
import { ToolPanel } from "@/components/ui";
import { loadImage } from "./image-util";
import { ResultList, downloadAllResults, type ImgResult } from "./image-results";

/** heic-to-jpg 引擎:heic2any 按需加载,HEIC/HEIF → JPG/PNG,批量。 */

const L: Record<string, Record<string, string>> =  {
  outputFormat: {
    en: "Output format", zh: "输出格式", ja: "出力フォーマット",
    es: "Formato de salida", pt: "Formato de saída",
    fr: "Format de sortie", de: "Ausgabeformat", ru: "Формат вывода",
    it: "Formato di output", tr: "Çıkış biçimi", ko: "출력 형식",
    ar: "تنسيق الإخراج", hi: "आउटपुट प्रारूप", id: "Format keluaran", vi: "Định dạng đầu ra",
  },
  quality: {
    en: "Quality", zh: "画质", ja: "品質", es: "Calidad", pt: "Qualidade",
    fr: "Qualité", de: "Qualität", ru: "Качество", it: "Qualità",
    tr: "Kalite", ko: "품질", ar: "الجودة", hi: "गुणवत्ता", id: "Kualitas", vi: "Chất lượng",
  },
  convert: {
    en: "Convert", zh: "开始转换", ja: "変換", es: "Convertir", pt: "Converter",
    fr: "Convertir", de: "Konvertieren", ru: "Конвертировать", it: "Converti",
    tr: "Dönüştür", ko: "변환", ar: "تحويل", hi: "कन्वर्ट करें", id: "Konversi", vi: "Chuyển đổi",
  },
  slowNote: {
    en: "HEIC decoding runs entirely on your device — large iPhone photos can take a few seconds each.",
    zh: "HEIC 解码完全在本机完成,iPhone 大图每张可能需要几秒钟。",
    ja: "HEIC のデコードは端末内で完結します。大きな iPhone 写真は 1 枚数秒かかることがあります。",
    es: "La decodificación HEIC ocurre en tu dispositivo: las fotos grandes de iPhone pueden tardar unos segundos cada una.",
    pt: "A decodificação HEIC acontece no seu dispositivo — fotos grandes de iPhone podem levar alguns segundos cada.",
    fr: "Le décodage HEIC s'effectue entièrement sur votre appareil — les grandes photos iPhone peuvent prendre quelques secondes chacune.",
    de: "Die HEIC-Dekodierung läuft vollständig auf Ihrem Gerät — große iPhone-Fotos können jeweils einige Sekunden dauern.",
    ru: "Декодирование HEIC выполняется полностью на вашем устройстве — большие фото с iPhone могут обрабатываться по несколько секунд.",
    it: "La decodifica HEIC avviene interamente sul tuo dispositivo — le foto iPhone grandi possono richiedere qualche secondo ciascuna.",
    tr: "HEIC kod çözme tamamen cihazınızda yapılır — büyük iPhone fotoğraflarının her biri birkaç saniye sürebilir.",
    ko: "HEIC 디코딩은 기기에서 완전히 처리됩니다 — 큰 iPhone 사진은 한 장에 몇 초씩 걸릴 수 있습니다.",
    ar: "يتم فك ترميز HEIC بالكامل على جهازك — قد تستغرق صور iPhone الكبيرة بضع ثوانٍ لكل صورة.",
    hi: "HEIC डिकोडिंग पूरी तरह आपके डिवाइस पर होती है — बड़ी iPhone फ़ोटो में से प्रत्येक में कुछ सेकंड लग सकते हैं।",
    id: "Dekode HEIC berjalan sepenuhnya di perangkat Anda — foto iPhone berukuran besar bisa memakan waktu beberapa detik per foto.",
    vi: "Việc giải mã HEIC diễn ra hoàn toàn trên thiết bị của bạn — ảnh iPhone lớn có thể mất vài giây mỗi tấm.",
  },
} satisfies Record<string, Record<string, string>>;

function chipCls(active: boolean): string {
  return `rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
    active
      ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
      : "hairline hover:bg-[var(--color-surface)]"
  }`;
}

type Target = "image/jpeg" | "image/png";

export function ImageHeicEngine({
  accept = ".heic,.heif,image/heic,image/heif",
}: {
  accept?: string;
}) {
  const { locale, t } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [target, setTarget] = useState<Target>("image/jpeg");
  const [quality, setQuality] = useState(90);
  const [results, setResults] = useState<ImgResult[]>([]);
  const [busy, setBusy] = useState(false);

  const urlsRef = useRef<string[]>([]);
  useEffect(() => {
    const urls = urlsRef.current;
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const addFiles = useCallback((list: File[]) => {
    setFiles((prev) => [...prev, ...list]);
    setResults([]);
  }, []);

  const run = useCallback(async () => {
    if (files.length === 0) return;
    setBusy(true);
    const { default: heic2any } = await import("heic2any");
    const rows: ImgResult[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const out = await heic2any({
          blob: file,
          toType: target,
          quality: target === "image/jpeg" ? Math.min(1, Math.max(0.1, quality / 100)) : undefined,
        });
        const blob = Array.isArray(out) ? out[0] : out;
        const ext = target === "image/jpeg" ? "jpg" : "png";
        const name = `${file.name.replace(/\.[^.]+$/, "") || file.name}.${ext}`;
        const url = URL.createObjectURL(blob);
        urlsRef.current.push(url);
        let dims: { w?: number; h?: number } = {};
        try {
          const img = await loadImage(blob);
          dims = { w: img.naturalWidth, h: img.naturalHeight };
        } catch {
          // 尺寸仅用于展示,失败不影响下载
        }
        rows.push({
          id: `${file.name}-${i}-${file.lastModified}`,
          name,
          ok: true,
          url,
          blob,
          before: file.size,
          after: blob.size,
          ...dims,
        });
      } catch {
        rows.push({
          id: `${file.name}-${i}-${file.lastModified}`,
          name: file.name,
          ok: false,
          err: "heic",
          before: file.size,
        });
      }
    }
    setResults((prev) => {
      prev.forEach((r) => r.url && URL.revokeObjectURL(r.url));
      return rows;
    });
    setBusy(false);
    // quality/target 刻意不作为触发条件:由“转换”按钮显式启动,避免重复解码大文件
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, target, quality]);

  const started = files.length > 0;

  return (
    <ToolPanel>
      <DropZone onFiles={addFiles} accept={accept}>
        <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFiles}</p>
      </DropZone>

      {started && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {files.map((f, i) => (
            <span
              key={`${f.name}-${i}-${f.lastModified}`}
              className="mono inline-flex max-w-full items-center gap-1 rounded-full bg-[var(--color-surface)] px-2.5 py-1 text-[12.5px]"
            >
              <span className="truncate">{f.name}</span>
            </span>
          ))}
          <button
            type="button"
            onClick={() => {
              setFiles([]);
              setResults([]);
            }}
            className="rounded-full border hairline px-3 py-1 text-[12.5px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.clear}
          </button>
        </div>
      )}

      {started && (
        <>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-semibold">{L.outputFormat[locale] ?? L.outputFormat.en}</span>
            <button type="button" onClick={() => setTarget("image/jpeg")} className={chipCls(target === "image/jpeg")}>
              JPG
            </button>
            <button type="button" onClick={() => setTarget("image/png")} className={chipCls(target === "image/png")}>
              PNG
            </button>
          </div>

          {target === "image/jpeg" && (
            <div className="mt-4">
              <label className="flex items-center gap-3 text-[13px] font-semibold">
                {L.quality[locale] ?? L.quality.en}
                <span className="mono rounded-full bg-[var(--color-surface)] px-2.5 py-1 text-[12.5px] font-medium">{quality}%</span>
                <input
                  type="range"
                  min={40}
                  max={100}
                  step={5}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="min-w-40 flex-1"
                  aria-label={L.quality[locale] ?? L.quality.en}
                />
              </label>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void run()}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <Icon name="swap" size={15} />
              {busy ? t.common.processing : L.convert[locale] ?? L.convert.en}
            </button>
            <span className="text-[12.5px] text-[var(--color-sub)]">{L.slowNote[locale] ?? L.slowNote.en}</span>
          </div>
        </>
      )}

      {(busy || results.length > 0) && (
        <ResultList rows={results} busy={busy} onDownloadAll={() => downloadAllResults(results)} />
      )}
    </ToolPanel>
  );
}
