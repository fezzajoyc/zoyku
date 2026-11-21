"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { RTL_LOCALES, type Locale } from "@/lib/site";
import { BYTE_ENCODINGS, BYTE_ENCODING_LIMITS, decodeByteEncoding, encodeByteEncoding, type ByteEncoding, type ByteEncodingError } from "../_lib/byte-encoding";
import { BYTE_ENCODING_MESSAGES } from "../_lib/byte-encoding-copy";

type Loaded = { ok: true; name: string; bytes: Uint8Array<ArrayBuffer> };
type FileResult = Loaded | { ok: false; error: "input-type" | "limit" | "read" };

/** Raw binary only. Enforce the file bound before reading; do not infer a text encoding from metadata. */
export async function readByteEncodingFile(file: File): Promise<FileResult> {
  if (!file || typeof file !== "object" || typeof file.name !== "string" || !Number.isSafeInteger(file.size) || file.size < 0 || typeof file.arrayBuffer !== "function") return { ok: false, error: "input-type" };
  if (file.size > BYTE_ENCODING_LIMITS.bytes) return { ok: false, error: "limit" };
  try {
    const buffer = await file.arrayBuffer();
    if (!(buffer instanceof ArrayBuffer)) return { ok: false, error: "read" };
    if (buffer.byteLength > BYTE_ENCODING_LIMITS.bytes) return { ok: false, error: "limit" };
    if (buffer.byteLength !== file.size) return { ok: false, error: "read" };
    return { ok: true, name: file.name, bytes: new Uint8Array(buffer) };
  } catch { return { ok: false, error: "read" }; }
}
const FORMAT_NAMES: Record<ByteEncoding, string> = { utf8: "UTF-8", hex: "HEX", base32: "Base32", base58: "Base58 (Bitcoin)", base64: "Base64" };
const button = "min-h-11 rounded-full border hairline px-4 py-2 text-sm font-medium disabled:opacity-40";
function EncodingSelect({ id, label, value, onChange }: { id: string; label: string; value: ByteEncoding; onChange: (value: ByteEncoding) => void }) {
  return <div className="space-y-2"><label htmlFor={id} className="block text-sm font-semibold">{label}</label>
    <select id={id} dir="ltr" className="field mono w-full" value={value} onChange={event => onChange(event.target.value as ByteEncoding)}>
      {BYTE_ENCODINGS.map(encoding => <option key={encoding} value={encoding}>{FORMAT_NAMES[encoding]}</option>)}
    </select>
  </div>;
}

/** Own each native download URL, including failures before or during anchor.click(). */
function nativeByteDownload(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  let anchor: HTMLAnchorElement | undefined;
  let started = false;
  try {
    anchor = document.createElement("a"); anchor.href = url; anchor.download = name;
    document.body.appendChild(anchor); anchor.click(); started = true;
  } finally {
    try { anchor?.remove(); }
    finally {
      if (started) setTimeout(() => URL.revokeObjectURL(url), 4000);
      else URL.revokeObjectURL(url);
    }
  }
}

/** A failed browser download must not be presented as saved. */
export function downloadByteEncoding(kind: "text" | "bytes", output: string, bytes: Uint8Array, target: ByteEncoding,
  download: (blob: Blob, name: string) => void = nativeByteDownload): { ok: boolean } {
  try {
    if (kind === "text") download(new Blob([output], { type: "text/plain;charset=utf-8" }), `converted-${target}.txt`);
    else download(new Blob([new Uint8Array(bytes).buffer], { type: "application/octet-stream" }), "decoded-bytes.bin");
    return { ok: true };
  } catch { return { ok: false }; }
}

export function ByteEncodingOutput({ output, bytes, target, locale }: { output: string; bytes: Uint8Array; target: ByteEncoding; locale: Locale }) {
  const L = BYTE_ENCODING_MESSAGES[locale];
  const [saved, setSaved] = useState<"text" | "bytes" | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { if (saved) { const timer = setTimeout(() => setSaved(null), 1600); return () => clearTimeout(timer); } }, [saved]);
  const save = (kind: "text" | "bytes") => {
    setSaved(null); setFailed(false);
    const attempt = downloadByteEncoding(kind, output, bytes, target);
    if (attempt.ok) setSaved(kind); else setFailed(true);
  };
  return <div className="space-y-3" data-byte-encoding-output="">
    <p className="text-sm text-[var(--color-sub)]">{L.bytes}: <bdi dir="ltr">{bytes.length.toLocaleString(locale)}</bdi></p>
    <pre className="field mono whitespace-pre-wrap break-all text-sm leading-6" dir="ltr">{output || L.emptyOutput}</pre>
    <div className="flex flex-wrap gap-2.5">
      {output !== "" && <CopyButton value={output} label={L.copy} />}
      <button type="button" className={button} onClick={() => save("text")}>{saved === "text" ? `✓ ${L.saved}` : L.downloadText}</button>
      <button type="button" className={button} onClick={() => save("bytes")}>{saved === "bytes" ? `✓ ${L.saved}` : L.downloadBytes}</button>
    </div>
    {failed && <p role="alert" className="error-bg rounded-xl p-3 text-sm leading-6 text-[var(--color-bad)]">{L.downloadError}</p>}
  </div>;
}

export function DevByteEncodingEngine() {
  const { locale } = useI18n();
  const L = BYTE_ENCODING_MESSAGES[locale];
  const id = useId();
  const revision = useRef(0);
  const fileReadRevision = useRef(0);
  const fileInput = useRef<HTMLInputElement>(null);
  const [source, setSource] = useState<"text" | "file">("text");
  const [input, setInput] = useState("");
  const [from, setFrom] = useState<ByteEncoding>("utf8");
  const [to, setTo] = useState<ByteEncoding>("base32");
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [reading, setReading] = useState(false);
  const [error, setError] = useState<ByteEncodingError | "read" | null>(null);
  const [result, setResult] = useState<{ output: string; bytes: Uint8Array<ArrayBuffer>; revision: number } | null>(null);
  useEffect(() => () => { revision.current++; fileReadRevision.current++; }, []);
  const invalidate = () => { revision.current++; setResult(null); setError(null); };
  const cancelFileRead = () => { fileReadRevision.current++; setReading(false); };
  const changeSource = (next: "text" | "file") => { invalidate(); cancelFileRead(); setLoaded(null); setSource(next); };
  const clear = () => { invalidate(); cancelFileRead(); setInput(""); setLoaded(null); if (fileInput.current) fileInput.current.value = ""; };
  const selectFile = async (file: File | undefined) => {
    invalidate(); cancelFileRead(); setLoaded(null);
    if (!file) return;
    const current = fileReadRevision.current;
    setReading(true);
    const next = await readByteEncodingFile(file);
    if (current !== fileReadRevision.current) return;
    setReading(false);
    if (next.ok) setLoaded(next); else setError(next.error);
  };
  const convert = () => {
    invalidate();
    const decoded = source === "file" ? loaded : decodeByteEncoding(input, from, { ignoreAsciiWhitespace: ignoreWhitespace });
    if (!decoded) { setError("input-type"); return; }
    if (!decoded.ok) { setError(decoded.error); return; }
    const encoded = encodeByteEncoding(decoded.bytes, to);
    if (encoded.ok) setResult({ output: encoded.output, bytes: decoded.bytes, revision: revision.current }); else setError(encoded.error);
  };
  const errors: Record<ByteEncodingError | "read", string> = {
    "input-type": L.invalidInput, encoding: L.invalidInput, options: L.invalidInput, format: L.formatError,
    "invalid-text": L.invalidText, "invalid-utf8": L.invalidUtf8, limit: L.limitError, "base58-limit": L.base58Limit, read: L.readError,
  };
  return <ToolPanel><div className="space-y-5" data-byte-encoding-tool="" dir={RTL_LOCALES.has(locale) ? "rtl" : "ltr"}>
    <div id={`${id}-rules`} className="space-y-2 text-sm leading-6 text-[var(--color-sub)]"><p>{L.scope}</p><p>{L.syntax}</p><p>{L.limits}</p></div>
    <div className="space-y-2"><label htmlFor={`${id}-source`} className="block text-sm font-semibold">{L.source}</label>
      <select id={`${id}-source`} className="field w-full" value={source} onChange={event => changeSource(event.target.value as "text" | "file")}><option value="text">{L.text}</option><option value="file">{L.file}</option></select>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">{source === "text" && <EncodingSelect id={`${id}-from`} label={L.from} value={from} onChange={value => { invalidate(); setFrom(value); }} />}<EncodingSelect id={`${id}-to`} label={L.to} value={to} onChange={value => { invalidate(); setTo(value); }} /></div>
    {source === "text" ? <>
      <div className="space-y-2"><label htmlFor={`${id}-input`} className="block text-sm font-semibold">{L.input}</label>
        <textarea id={`${id}-input`} rows={7} dir="ltr" className="field mono w-full" value={input} spellCheck={false} autoComplete="off" autoCapitalize="off"
          aria-invalid={Boolean(error)} aria-describedby={`${id}-rules${error ? ` ${id}-error` : ""}`} onChange={event => { invalidate(); setInput(event.target.value); }} />
      </div>
      <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={ignoreWhitespace} onChange={event => { invalidate(); setIgnoreWhitespace(event.target.checked); }} />{L.ignoreWhitespace}</label>
    </> : <div className="space-y-2">
      <label htmlFor={`${id}-file`} className="block text-sm font-semibold">{L.pickFile}</label>
      <input ref={fileInput} id={`${id}-file`} type="file" className="field w-full" aria-describedby={`${id}-rules`} onChange={event => { void selectFile(event.target.files?.[0]); event.target.value = ""; }} />
      {loaded && <p className="text-sm text-[var(--color-sub)]"><bdi>{loaded.name}</bdi> · {L.bytes}: <bdi dir="ltr">{loaded.bytes.length.toLocaleString(locale)}</bdi></p>}
    </div>}
    <div className="flex flex-wrap gap-2.5">
      <button type="button" className={button} disabled={reading || (source === "file" && !loaded)} onClick={convert}>{L.convert}</button>
      {source === "text" && <button type="button" className={button} onClick={() => { invalidate(); setFrom("utf8"); setInput("Hello, 中😀"); }}>{L.sample}</button>}
      <button type="button" className={button} onClick={clear}>{L.clear}</button>
    </div>
    <div aria-live="polite" aria-busy={reading}>
      {error ? <p id={`${id}-error`} role="alert" className="error-bg rounded-xl p-3 text-sm leading-6 text-[var(--color-bad)]">{errors[error]}</p>
        : reading ? <p className="text-sm">{L.working}</p>
        : result ? <><h2 className="mb-3 text-sm font-semibold">{L.output} · <bdi>{FORMAT_NAMES[to]}</bdi></h2><ByteEncodingOutput key={result.revision} output={result.output} bytes={result.bytes} target={to} locale={locale} /></>
        : <p className="text-sm text-[var(--color-sub)]">{L.empty}</p>}
    </div>
  </div></ToolPanel>;
}
