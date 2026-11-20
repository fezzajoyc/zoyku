"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { PROTECT_UI as UI } from "./pdf-locales";
import {
  SHARED, Err, FileRow, Ghost, Primary, Progress, baseName, toPdfBlob, tr,
} from "./pdf-ui";

type Op = "unlock" | "flatten";
type Out = { name: string; blob: Blob };

export function PdfProtectEngine({ op }: { op: Op }) {
  const { t, locale } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState("");
  const [out, setOut] = useState<Out | null>(null);

  const reset = useCallback(() => {
    setFile(null);
    setOut(null);
    setErr("");
    setProgress(0);
  }, []);

  const addFiles = useCallback(
    (list: File[]) => {
      setOut(null);
      setErr("");
      const pdfs = list.filter((f) => /\.pdf$/i.test(f.name) || f.type === "application/pdf");
      if (!pdfs.length) {
        setErr(t.common.error);
        return;
      }
      setFile(pdfs[0]);
    },
    [t.common.error],
  );

  async function run() {
    if (!file) {
      setErr(tr(SHARED.needFile, locale));
      return;
    }
    setBusy(true);
    setErr("");
    setOut(null);
    setProgress(0.05);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      // ignoreEncryption only allows inspecting the structure. It does not
      // decrypt content; saving an encrypted document can produce corrupt PDFs.
      if (doc.isEncrypted) {
        setErr(tr(UI.encryptedUnsupported, locale));
        return;
      }
      if (op === "unlock") {
        setErr(tr(UI.notEncrypted, locale));
        return;
      }
      setProgress(0.4);
      const suffix = "-flattened";
      if (doc.getForm().getFields().length === 0) {
        setErr(tr(UI.noForms, locale));
        return;
      }
      doc.getForm().flatten();
      const saved = await doc.save();
      setProgress(1);
      setOut({ name: `${baseName(file.name)}${suffix}.pdf`, blob: toPdfBlob(saved) });
    } catch (e) {
      console.error("[pdf-protect] run failed:", e);
      setErr(tr(SHARED.failed, locale));
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolPanel>
      {op === "unlock" && (
        <p className="mb-3 rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[13.5px] leading-5 text-[var(--color-sub)]">
          {tr(UI.unlockNote, locale)}
        </p>
      )}
      {!file && (
        <DropZone onFiles={addFiles} accept="application/pdf,.pdf">
          <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFile}</p>
        </DropZone>
      )}
      {file && (
        <div className="space-y-3">
          <ul className="space-y-2">
            <li className="rounded-xl">
              <FileRow name={file.name} size={formatBytes(file.size)} onRemove={reset} />
            </li>
          </ul>

          {op === "flatten" && <p className="rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[13.5px] leading-5 text-[var(--color-sub)]">{tr(UI.flattenNote, locale)}</p>}

          {busy && <Progress value={progress} />}
          <Err msg={err} />

          {out && (
            <div className="rounded-2xl border hairline p-4">
              <p className="mb-2 text-[13.5px] font-semibold">{t.common.output}</p>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2.5 text-[14px]">
                  <span className="min-w-0 flex-1 truncate">{out.name}</span>
                  <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(out.blob.size)}</span>
                  <button type="button" onClick={() => downloadBlob(out.blob, out.name)}
                    className="flex-none rounded-full border hairline px-3 py-1 text-[12.5px] font-medium hover:bg-[var(--color-surface)]">
                    {t.common.download}
                  </button>
                </li>
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2.5">
            <Primary onClick={run} disabled={busy}>{tr(op === "unlock" ? UI.unlock : UI.flatten, locale)}</Primary>
            {file && !busy && <Ghost onClick={reset}>{t.common.reset}</Ghost>}
          </div>
        </div>
      )}
    </ToolPanel>
  );
}
