"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

type Res = { name: string; blob: Blob; before: number; after: number };

/** 批量黑白化:canvas filter,输出 JPG(更小)或 PNG(无损)。 */
export function ImageGrayscaleEngine() {
  const { t } = useI18n();
  const [files, setFiles] = useState<File[]>([]);
  const [type, setType] = useState<"image/jpeg" | "image/png">("image/jpeg");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [results, setResults] = useState<Res[]>([]);

  const addFiles = (list: File[]) => {
    const imgs = list.filter((f) => f.type.startsWith("image/"));
    if (imgs.length) {
      setFiles((p) => [...p, ...imgs]);
      setResults([]);
      setErr("");
    }
  };

  async function run() {
    if (!files.length) return;
    setBusy(true);
    setErr("");
    setResults([]);
    try {
      const out: Res[] = [];
      for (const f of files) {
        const bitmap = await createImageBitmap(f);
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("canvas");
        ctx.filter = "grayscale(1)";
        ctx.drawImage(bitmap, 0, 0);
        const blob = await new Promise<Blob>((resolve, reject) =>
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode"))), type, 0.9),
        );
        const ext = type === "image/jpeg" ? "jpg" : "png";
        out.push({
          name: f.name.replace(/\.[^.]+$/, "") + `-gray.${ext}`,
          blob,
          before: f.size,
          after: blob.size,
        });
      }
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

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        {(["image/jpeg", "image/png"] as const).map((ty) => (
          <button
            key={ty}
            type="button"
            onClick={() => setType(ty)}
            className={`rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors ${
              type === ty ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]" : "hairline hover:bg-[var(--color-surface)]"
            }`}
          >
            {ty === "image/jpeg" ? "JPG" : "PNG"}
          </button>
        ))}
      </div>

      {err && <p role="alert" className="mt-3 rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] text-[var(--color-bad)]">{err}</p>}

      {results.length > 0 && (
        <div className="mt-4 rounded-2xl border hairline p-4">
          <ul className="space-y-1.5">
            {results.map((r) => (
              <li key={r.name} className="flex items-center gap-2.5 text-[14px]">
                <span className="min-w-0 flex-1 truncate">{r.name}</span>
                <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">
                  {formatBytes(r.before)} → {formatBytes(r.after)}
                </span>
                <button
                  type="button"
                  onClick={() => downloadBlob(r.blob, r.name)}
                  className="flex-none rounded-full border hairline px-3 py-1 text-[12.5px] font-medium hover:bg-[var(--color-surface)]"
                >
                  {t.common.download}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={run}
          disabled={busy || !files.length}
          className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {busy ? t.common.processing : t.common.download}
        </button>
        {files.length > 0 && !busy && (
          <button
            type="button"
            onClick={() => { setFiles([]); setResults([]); }}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {t.common.reset}
          </button>
        )}
      </div>
    </ToolPanel>
  );
}
