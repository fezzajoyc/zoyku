"use client";

import { useEffect, useRef, useState } from "react";
import { CopyButton, DropZone } from "@/components/client-ui";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { RTL_LOCALES, type Locale } from "@/lib/site";
import { FILE_SIGNATURE_READ_LIMIT, identifyFileSignature, type FileSignature } from "../_lib/file-signature";
import { FILE_SIGNATURE_MESSAGES } from "../_lib/file-signature-copy";

export type LocalFileSignatureReport = {
  metadata: { name: string; size: number; browserMime: string; extension: string };
  bytesRead: number;
  hexPreview: string;
  signature: FileSignature | null;
  interpretation: "header-signature-only";
};

function readableFile(value: unknown): value is File {
  if (!value || typeof value !== "object") return false;
  const file = value as Partial<File>;
  return typeof file.name === "string" && typeof file.type === "string" && typeof file.slice === "function"
    && typeof file.size === "number" && Number.isFinite(file.size) && file.size >= 0;
}

/** Read a bounded prefix even when the original file is very large. Never trust its extension as a format. */
export async function readFileSignature(file: File): Promise<LocalFileSignatureReport> {
  if (!readableFile(file)) throw new TypeError("A local file is required.");
  const bytes = new Uint8Array(await file.slice(0, FILE_SIGNATURE_READ_LIMIT).arrayBuffer());
  const dot = file.name.lastIndexOf(".");
  return {
    metadata: { name: file.name, size: file.size, browserMime: file.type,
      extension: dot > 0 && dot < file.name.length - 1 ? file.name.slice(dot + 1).toLowerCase() : "" },
    bytesRead: bytes.length,
    hexPreview: [...bytes.subarray(0, 64)].map(byte => byte.toString(16).toUpperCase().padStart(2, "0")).join(" "),
    signature: identifyFileSignature(bytes),
    interpretation: "header-signature-only",
  };
}

export function FileSignatureResult({ report, locale }: { report: LocalFileSignatureReport; locale: Locale }) {
  const L = FILE_SIGNATURE_MESSAGES[locale];
  const signature = report.signature;
  const metadata = report.metadata;
  const fields = [
    [L.fileName, metadata.name], [L.fileSize, String(metadata.size)],
    [L.browserMime, metadata.browserMime || L.none], [L.extension, metadata.extension || L.none],
  ];
  return <div className="space-y-5" data-file-signature-result={signature?.id ?? "unknown"}>
    <section className="rounded-xl border hairline p-4">
      <h2 className="text-[15px] font-semibold">{signature ? L.matched : L.unknown}</h2>
      {signature && <>
        <p className="mono mt-2 text-xl font-semibold" dir="ltr">{signature.name}</p>
        <dl className="mt-3 space-y-2 text-sm">
          <div><dt className="text-[var(--color-sub)]">{L.signatureMime}</dt><dd className="mono break-all" dir="ltr">{signature.mime}</dd></div>
          <div><dt className="text-[var(--color-sub)]">{L.extensions}</dt><dd className="mono break-all" dir="ltr">{signature.extensions.length ? signature.extensions.map(extension => `.${extension}`).join(", ") : L.none}</dd></div>
        </dl>
      </>}
      {signature?.container && <p className="mt-3 text-sm leading-6 text-[var(--color-sub)]">{L.container}</p>}
    </section>
    <section className="rounded-xl border hairline p-4">
      <h2 className="text-[15px] font-semibold">{L.metadata}</h2>
      <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">{fields.map(([label, value]) => <div key={label}>
        <dt className="text-[var(--color-sub)]">{label}</dt><dd className="mono break-all" dir="ltr">{value}</dd>
      </div>)}</dl>
    </section>
    <div><p className="text-sm text-[var(--color-sub)]">{L.read}: <span dir="ltr" className="mono inline-block">{report.bytesRead}</span></p>
      <h2 className="mt-3 text-sm font-semibold">{L.hex}</h2>
      <pre className="mono mt-2 overflow-x-auto whitespace-pre-wrap break-all rounded-xl bg-[var(--color-surface)] p-3 text-sm" dir="ltr">{report.hexPreview || L.none}</pre>
    </div>
    <CopyButton value={JSON.stringify(report, null, 2)} label={L.copy} />
  </div>;
}

type State = { status: "empty" } | { status: "loading"; name: string } |
  { status: "error"; error: "invalid" | "readError" } | { status: "ready"; report: LocalFileSignatureReport };

export function DevFileTypeEngine() {
  const { locale } = useI18n();
  const L = FILE_SIGNATURE_MESSAGES[locale];
  const [state, setState] = useState<State>({ status: "empty" });
  const revision = useRef(0);
  useEffect(() => () => { revision.current++; }, []);

  const select = async (files: File[]) => {
    const current = ++revision.current;
    const file = files[0];
    if (!readableFile(file)) {
      setState({ status: "error", error: "invalid" });
      return;
    }
    setState({ status: "loading", name: file.name });
    try {
      const report = await readFileSignature(file);
      if (current === revision.current) setState({ status: "ready", report });
    } catch {
      if (current === revision.current) setState({ status: "error", error: "readError" });
    }
  };

  return <ToolPanel><div className="space-y-5" dir={RTL_LOCALES.has(locale) ? "rtl" : "ltr"} aria-describedby="file-signature-rules" data-file-signature-tool="">
    <div id="file-signature-rules" className="space-y-2 text-sm leading-6 text-[var(--color-sub)]"><p>{L.local}</p><p>{L.rule}</p></div>
    <DropZone multiple={false} onFiles={files => { void select(files); }}><p className="text-sm">{L.drop}</p></DropZone>
    <div aria-live="polite" aria-busy={state.status === "loading"}>
      {state.status === "empty" && <p className="text-sm leading-6 text-[var(--color-sub)]">{L.empty}</p>}
      {state.status === "loading" && <p className="text-sm">{L.loading} <bdi className="mono">{state.name}</bdi></p>}
      {state.status === "error" && <p role="alert" className="error-bg rounded-xl p-3 text-sm text-[var(--color-bad)]">{L[state.error]}</p>}
      {state.status === "ready" && <FileSignatureResult report={state.report} locale={locale} />}
    </div>
    {state.status !== "empty" && <button type="button" onClick={() => { revision.current++; setState({ status: "empty" }); }} className="min-h-11 rounded-full border hairline px-4 py-2 text-sm font-medium hover:bg-[var(--color-surface)]">{L.clear}</button>}
  </div></ToolPanel>;
}
