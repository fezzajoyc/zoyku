"use client";

import { useEffect, useId, useRef, useState } from "react";
import { DropZone } from "@/components/client-ui";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { RTL_LOCALES } from "@/lib/site";
import { FILE_PARTS_LIMITS, filePartName, planFileSplit, sanitizeFileOutputName, type FilePartsError, type FileSplitOptions } from "../_lib/file-parts";
import { FILE_PARTS_MESSAGES } from "../_lib/file-parts-copy";

type Mode = "split" | "merge";
type Output = { name: string; blob: Blob };
type PrepareError = FilePartsError | "merge-count" | "processing";

function validFile(value: unknown): value is File {
  if (!value || typeof value !== "object") return false;
  const file = value as Partial<File>;
  return typeof file.name === "string" && typeof file.slice === "function" && typeof file.size === "number" && Number.isSafeInteger(file.size) && file.size >= 0;
}

/** Blob handles preserve bytes without reading each file into a JavaScript buffer. */
export function prepareFileParts(files: readonly File[], mode: Mode, options: FileSplitOptions, outputName: string): { outputs: Output[]; error: PrepareError | null } {
  const fail = (error: PrepareError) => ({ outputs: [], error });
  if (!Array.isArray(files) || !files.length || files.some(file => !validFile(file))) return fail("input");
  if (files.length > FILE_PARTS_LIMITS.files) return fail("file-count");
  const total = files.reduce((size, file) => size + file.size, 0);
  if (total > FILE_PARTS_LIMITS.bytes) return fail("size-limit");
  try {
    if (mode === "split") {
      if (files.length !== 1) return fail("file-count");
      const file = files[0];
      const plan = planFileSplit(file.size, options);
      if (plan.error) return fail(plan.error);
      return { error: null, outputs: plan.parts.map(part => ({ name: filePartName(file.name, part.index), blob: file.slice(part.start, part.end, "application/octet-stream") })) };
    }
    if (mode !== "merge") return fail("input");
    if (files.length < 2) return fail("merge-count");
    return { error: null, outputs: [{ name: sanitizeFileOutputName(outputName), blob: new Blob(files, { type: "application/octet-stream" }) }] };
  } catch { return fail("processing"); }
}

const button = "inline-flex min-h-11 items-center justify-center rounded-full border hairline px-3.5 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface)] disabled:opacity-40";
const number = (input: string) => input.trim() === "" ? NaN : Number(input);

export function FilePartsEngine() {
  const { locale } = useI18n();
  const L = FILE_PARTS_MESSAGES[locale];
  const id = useId();
  const [mode, setMode] = useState<Mode>("split");
  const [splitMode, setSplitMode] = useState<"size" | "count">("size");
  const [partBytes, setPartBytes] = useState("1048576");
  const [partCount, setPartCount] = useState("2");
  const [outputName, setOutputName] = useState("merged.bin");
  const [files, setFiles] = useState<File[]>([]);
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [error, setError] = useState<PrepareError | "download" | null>(null);
  const [busy, setBusy] = useState(false);
  const [downloaded, setDownloaded] = useState<number | null>(null);
  const revision = useRef(0);
  const urls = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    revision.current++;
    for (const [url, timer] of urls.current) { clearTimeout(timer); URL.revokeObjectURL(url); }
    urls.current.clear();
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
  }, []);

  function changed() { revision.current++; setOutputs([]); setError(null); setBusy(false); setDownloaded(null); }
  function chooseMode(value: Mode) { changed(); setFiles([]); setMode(value); }
  function select(incoming: File[]) {
    changed();
    if (incoming.some(file => !validFile(file))) { setError("input"); return; }
    const next = mode === "split" ? incoming.slice(0, 1) : [...files, ...incoming];
    if (next.length > FILE_PARTS_LIMITS.files) { setError("file-count"); return; }
    if (next.reduce((total, file) => total + file.size, 0) > FILE_PARTS_LIMITS.bytes) { setError("size-limit"); return; }
    setFiles(next);
  }
  function move(index: number, delta: number) {
    const next = [...files]; const destination = index + delta;
    if (destination < 0 || destination >= next.length) return;
    [next[index], next[destination]] = [next[destination], next[index]];
    changed(); setFiles(next);
  }
  async function generate() {
    const current = ++revision.current;
    setOutputs([]); setError(null); setBusy(true); setDownloaded(null);
    await Promise.resolve();
    if (current !== revision.current) return;
    const options: FileSplitOptions = splitMode === "size" ? { mode: "size", partBytes: number(partBytes) } : { mode: "count", partCount: number(partCount) };
    const result = prepareFileParts(files, mode, options, outputName);
    if (current !== revision.current) return;
    setBusy(false); setOutputs(result.outputs); setError(result.error);
  }
  function download(output: Output, index: number) {
    let url: string | undefined;
    let anchor: HTMLAnchorElement | undefined;
    try {
      url = URL.createObjectURL(output.blob);
      anchor = document.createElement("a"); anchor.href = url; anchor.download = output.name;
      document.body.appendChild(anchor); anchor.click();
      const activeUrl = url;
      const timer = setTimeout(() => { URL.revokeObjectURL(activeUrl); urls.current.delete(activeUrl); }, 5000);
      urls.current.set(url, timer);
      setDownloaded(index); setError(null);
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
      const current = revision.current;
      feedbackTimer.current = setTimeout(() => { if (current === revision.current) setDownloaded(null); }, 1600);
    } catch {
      if (url) URL.revokeObjectURL(url);
      setError("download");
    } finally { anchor?.remove(); }
  }
  const errors: Record<PrepareError | "download", string> = { input: L.inputError, "size-limit": L.sizeError, "part-size": L.partSizeError, "part-count": L.countError, "file-count": L.fileCountError, "merge-count": L.mergeCountError, processing: L.processingError, download: L.downloadError };
  const total = files.reduce((size, file) => size + file.size, 0);

  return <ToolPanel><div className="space-y-5" dir={RTL_LOCALES.has(locale) ? "rtl" : "ltr"} data-file-parts-tool="">
    <div id={`${id}-rules`} className="space-y-2 text-sm leading-6 text-[var(--color-sub)]"><p>{L.local}</p><p>{L.scope}</p><p>{L.limits}</p></div>
    <label htmlFor={`${id}-mode`} className="block text-sm font-semibold">{L.mode}</label>
    <select id={`${id}-mode`} className="field" value={mode} onChange={event => chooseMode(event.target.value as Mode)} data-file-parts-mode="">
      <option value="split">{L.split}</option><option value="merge">{L.merge}</option>
    </select>
    {mode === "split" ? <div className="grid gap-4 sm:grid-cols-2">
      <label className="block text-sm font-medium" htmlFor={`${id}-split-mode`}>{L.splitMode}
        <select id={`${id}-split-mode`} className="field mt-1" value={splitMode} onChange={event => { changed(); setSplitMode(event.target.value as "size" | "count"); }}>
          <option value="size">{L.bySize}</option><option value="count">{L.byCount}</option>
        </select>
      </label>
      {splitMode === "size" ? <label className="block text-sm font-medium" htmlFor={`${id}-bytes`}>{L.partBytes}
        <input id={`${id}-bytes`} className="field mono mt-1" dir="ltr" type="number" min={1} max={FILE_PARTS_LIMITS.bytes} step={1} value={partBytes} onChange={event => { changed(); setPartBytes(event.target.value); }} />
      </label> : <label className="block text-sm font-medium" htmlFor={`${id}-count`}>{L.partCount}
        <input id={`${id}-count`} className="field mono mt-1" dir="ltr" type="number" min={1} max={100} step={1} value={partCount} onChange={event => { changed(); setPartCount(event.target.value); }} />
      </label>}
    </div> : <label className="block text-sm font-medium" htmlFor={`${id}-name`}>{L.outputName}
      <input id={`${id}-name`} className="field mono mt-1" dir="ltr" type="text" value={outputName} onChange={event => { changed(); setOutputName(event.target.value); }} />
    </label>}
    <DropZone key={mode} multiple={mode === "merge"} onFiles={select}><p className="text-sm">{mode === "split" ? L.dropOne : L.dropMany}</p></DropZone>
    {files.length ? <div><p className="mb-2 text-sm font-semibold">{L.filesLabel} · <span dir="ltr" className="mono inline-block">{files.length}</span> · {L.totalBytes}: <span dir="ltr" className="mono inline-block">{total}</span></p>
      {mode === "merge" && <p className="mb-2 text-sm text-[var(--color-sub)]">{L.orderNote}</p>}
      <ol className="space-y-2">{files.map((file, index) => <li key={`${index}-${file.name}`} className="flex flex-wrap items-center gap-2 rounded-xl border hairline p-3" data-file-part-source="">
        <span className="mono min-w-0 flex-1 break-all" dir="ltr">{index + 1}. {file.name} ({file.size} {L.bytes})</span>
        {mode === "merge" && <><button type="button" className={button} disabled={index === 0} aria-label={`${L.moveUp}: ${file.name}`} onClick={() => move(index, -1)}>↑ {L.moveUp}</button><button type="button" className={button} disabled={index === files.length - 1} aria-label={`${L.moveDown}: ${file.name}`} onClick={() => move(index, 1)}>↓ {L.moveDown}</button></>}
        <button type="button" className={button} aria-label={`${L.remove}: ${file.name}`} onClick={() => { changed(); setFiles(files.filter((_, position) => position !== index)); }}>{L.remove}</button>
      </li>)}</ol>
    </div> : <p className="text-sm leading-6 text-[var(--color-sub)]">{L.empty}</p>}
    <div className="flex flex-wrap gap-2"><button type="button" className={`${button} bg-[var(--color-action-bg)] text-white`} disabled={busy || !files.length} onClick={() => { void generate(); }}>{busy ? L.working : L.generate}</button><button type="button" className={button} onClick={() => { changed(); setFiles([]); }}>{L.clear}</button></div>
    {error && <p role="alert" className="error-bg rounded-xl p-3 text-sm text-[var(--color-bad)]">{errors[error]}</p>}
    <div aria-live="polite" aria-busy={busy}>{outputs.length > 0 && <section><h2 className="mb-2 text-sm font-semibold">{L.results}</h2><ol className="space-y-2">{outputs.map((output, index) => <li key={index} className="flex flex-wrap items-center gap-3 rounded-xl border hairline p-3">
      <span className="mono min-w-0 flex-1 break-all" dir="ltr">{output.name} ({output.blob.size} {L.bytes})</span>
      <button type="button" className={button} data-file-part-download={index} onClick={() => download(output, index)}>{downloaded === index ? `✓ ${L.downloaded}` : L.download}</button>
    </li>)}</ol></section>}</div>
  </div></ToolPanel>;
}
