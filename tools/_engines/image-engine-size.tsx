"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { searchQuality } from "../_lib/imgsize";

/**
 * 按目标体积压缩引擎:二分质量(纯逻辑在 tools/_lib/imgsize.ts,探针为 canvas.toBlob)
 * + 质量触底后渐进降采样。仍达不到目标时诚实给出最接近的结果并明确标注“超出目标”。
 */

type Format = "image/jpeg" | "image/webp";

const EXT: Record<Format, string> = { "image/jpeg": "jpg", "image/webp": "webp" };
const MIN_QUALITY = 0.3;
const MAX_QUALITY = 0.95;
const MAX_SCALES = 5;

type SizeResult = {
  name: string;
  blob: Blob;
  url: string;
  before: number;
  after: number;
  qualityPct: number;
  scalePct: number;
  ok: boolean;
};

const L: Record<string, Record<string, string>> = {
  target: { en: "Target size (KB)", zh: "目标体积(KB)", ja: "目標サイズ (KB)", es: "Tamaño objetivo (KB)", pt: "Tamanho alvo (KB)" },
  format: { en: "Format", zh: "格式", ja: "フォーマット", es: "Formato", pt: "Formato" },
  compress: { en: "Compress to target", zh: "压到目标体积", ja: "目標サイズに圧縮", es: "Comprimir al objetivo", pt: "Comprimir para o alvo" },
  quality: { en: "Quality", zh: "画质", ja: "品質", es: "Calidad", pt: "Qualidade" },
  scaled: { en: "Scaled", zh: "缩放", ja: "縮小", es: "Escalado", pt: "Reduzido" },
  overTarget: {
    en: "Over target — this is the closest the format gets",
    zh: "超出目标——这是该格式能压到的最接近结果",
    ja: "目標超過 — このフォーマットで最も近い結果",
    es: "Sobre el objetivo — es lo más cerca que llega el formato",
    pt: "Acima do alvo — é o mais perto que o formato chega",
  },
  badTarget: {
    en: "Enter a target size above 0 KB.",
    zh: "请输入大于 0 的目标体积(KB)。",
    ja: "0 KB を超える目標サイズを入力してください。",
    es: "Introduce un tamaño objetivo mayor de 0 KB.",
    pt: "Digite um tamanho alvo maior que 0 KB.",
  },
};

export function ImageEngineSize({ defaultTargetKb = 100 }: { defaultTargetKb?: number }) {
  const { t, locale } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [targetKb, setTargetKb] = useState(String(defaultTargetKb));
  const [format, setFormat] = useState<Format>("image/jpeg");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [results, setResults] = useState<SizeResult[]>([]);
  const urlsRef = useRef<string[]>([]);

  const trL = (k: string) => L[k][locale] ?? L[k].en;

  const revokeAll = () => {
    for (const u of urlsRef.current) URL.revokeObjectURL(u);
    urlsRef.current = [];
  };
  useEffect(() => revokeAll, []);

  const addFiles = (list: File[]) => {
    const imgs = list.filter((f) => f.type.startsWith("image/"));
    if (imgs.length) {
      setFiles((p) => [...p, ...imgs]);
      revokeAll();
      setResults([]);
      setErr("");
    }
  };

  const removeAt = (i: number) => {
    setFiles((p) => p.filter((_, j) => j !== i));
    revokeAll();
    setResults([]);
  };

  const encode = (canvas: HTMLCanvasElement, type: Format, quality: number) =>
    new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode"))), type, quality),
    );

  async function run() {
    const kb = Number(targetKb);
    if (!Number.isFinite(kb) || kb <= 0) {
      setErr(trL("badTarget"));
      return;
    }
    const targetBytes = kb * 1024;
    setBusy(true);
    setErr("");
    revokeAll();
    setResults([]);
    const out: SizeResult[] = [];
    try {
      for (const file of files) {
        const bitmap = await createImageBitmap(file);
        let scale = 1;
        let done = false;
        let best: { blob: Blob; quality: number; scale: number } | null = null;

        for (let attempt = 0; attempt < MAX_SCALES && !done; attempt++) {
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(bitmap.width * scale));
          canvas.height = Math.max(1, Math.round(bitmap.height * scale));
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("canvas");
          ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

          const res = await searchQuality(
            async (q) => (await encode(canvas, format, q)).size,
            targetBytes,
            MIN_QUALITY,
            MAX_QUALITY,
          );

          if (res.ok) {
            const blob = await encode(canvas, format, res.quality);
            out.push({
              name: file.name.replace(/\.[^.]+$/, "") + `-${Math.round(kb)}kb.${EXT[format]}`,
              blob,
              url: URL.createObjectURL(blob),
              before: file.size,
              after: blob.size,
              qualityPct: Math.round(res.quality * 100),
              scalePct: Math.round(scale * 100),
              ok: true,
            });
            done = true;
            break;
          }

          const blob = await encode(canvas, format, res.bestQuality);
          if (!best || blob.size < best.blob.size) best = { blob, quality: res.bestQuality, scale };
          scale *= 0.7;
        }

        bitmap.close?.();

        if (!done && best) {
          // 诚实降级:给出最接近目标的结果并明确标注
          out.push({
            name: file.name.replace(/\.[^.]+$/, "") + `-${Math.round(kb)}kb.${EXT[format]}`,
            blob: best.blob,
            url: URL.createObjectURL(best.blob),
            before: file.size,
            after: best.blob.size,
            qualityPct: Math.round(best.quality * 100),
            scalePct: Math.round(best.scale * 100),
            ok: false,
          });
        }
      }
      urlsRef.current = out.map((r) => r.url);
      setResults(out);
    } catch {
      setErr(t.common.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolPanel>
      <DropZone onFiles={addFiles} accept="image/*">
        <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFiles}</p>
      </DropZone>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5">
              <span className="min-w-0 flex-1 truncate text-[14px]">{f.name}</span>
              <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(f.size)}</span>
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label={t.common.clear}
                className="h-7 w-7 flex-none rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)]"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
            {trL("target")}
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            className="field mono"
            value={targetKb}
            onChange={(e) => setTargetKb(e.target.value)}
            aria-label={trL("target")}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
            {trL("format")}
          </span>
          <select
            className="field"
            value={format}
            onChange={(e) => setFormat(e.target.value as Format)}
            aria-label={trL("format")}
          >
            <option value="image/jpeg">JPEG</option>
            <option value="image/webp">WebP</option>
          </select>
        </label>
      </div>

      {err && (
        <p role="alert" className="mt-3 rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] text-[var(--color-bad)]">
          {err}
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-4 space-y-2.5">
          {results.map((r) => (
            <div key={r.url} className="flex items-center gap-3 rounded-xl border hairline p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.url} alt={r.name} className="h-12 w-12 flex-none rounded-lg border hairline object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px]">{r.name}</p>
                <p className="mono mt-0.5 text-[12.5px] text-[var(--color-sub)]">
                  {formatBytes(r.before)} → {formatBytes(r.after)} · {trL("quality")} {r.qualityPct}%
                  {r.scalePct < 100 ? ` · ${trL("scaled")} ${r.scalePct}%` : ""}
                </p>
                {!r.ok && (
                  <p className="mt-0.5 text-[12.5px] font-medium text-[var(--color-bad)]">{trL("overTarget")}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => downloadBlob(r.blob, r.name)}
                className="flex-none rounded-full border hairline px-3 py-1 text-[12.5px] font-medium hover:bg-[var(--color-surface)]"
              >
                {t.common.download}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={run}
          disabled={busy || !files.length}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {busy ? t.common.processing : trL("compress")}
        </button>
        {files.length > 0 && !busy && (
          <button
            type="button"
            onClick={() => {
              revokeAll();
              setFiles([]);
              setResults([]);
              setErr("");
            }}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.reset}
          </button>
        )}
      </div>
    </ToolPanel>
  );
}
