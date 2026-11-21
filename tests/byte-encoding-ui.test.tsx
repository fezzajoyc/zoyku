import { File } from "node:buffer";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { I18nProvider } from "@/components/i18n-provider";
import { dict } from "@/lib/i18n";
import { LOCALES } from "@/lib/site";
import { DevByteEncodingEngine, ByteEncodingOutput, readByteEncodingFile, downloadByteEncoding } from "@/tools/_engines/dev-engine-byte-encoding";
import { BYTE_ENCODING_MESSAGES } from "@/tools/_lib/byte-encoding-copy";
import tool from "@/tools/developer/byte-encoding-converter";
const escape = (text: string) => renderToStaticMarkup(<span>{text}</span>).replace(/^<span>|<\/span>$/g, "");

describe("byte encoding page and native UI scope", () => {
  it.each(LOCALES)("has native controls, errors, scope and limits in %s", locale => {
    const L = BYTE_ENCODING_MESSAGES[locale];
    const html = renderToStaticMarkup(<I18nProvider locale={locale} dict={dict(locale)}><DevByteEncodingEngine /></I18nProvider>);
    for (const text of [L.scope, L.syntax, L.limits, L.source, L.from, L.to, L.input, L.convert, L.clear, L.empty, L.ignoreWhitespace]) expect(html).toContain(escape(text));
    for (const value of ["utf8", "hex", "base32", "base58", "base64"]) expect(html).toContain(`value="${value}"`);
    expect(html).toContain('dir="ltr"'); expect(html).toContain('<label'); expect(html).not.toContain('data-copy-button'); expect(html).not.toContain('data-byte-encoding-output');
    expect(tool.copy[locale]?.tagline.length).toBeGreaterThanOrEqual(["zh", "ja"].includes(locale) ? 32 : 80);
    expect(tool.copy[locale]?.steps).toHaveLength(3); expect(tool.copy[locale]?.faqs).toHaveLength(2);
    expect(Object.keys(L).sort()).toEqual(Object.keys(BYTE_ENCODING_MESSAGES.en).sort());
    for (const key of ["scope", "syntax", "limits", "emptyOutput", "readError", "formatError", "invalidUtf8", "invalidText", "base58Limit", "downloadError"] as const) {
      expect(L[key]).toBeTruthy(); if (locale !== "en") expect(L[key]).not.toBe(BYTE_ENCODING_MESSAGES.en[key]);
    }
  });
  it("makes the actual text and original byte downloads available for nonempty and zero-byte results", () => {
    for (const [output, bytes] of [["MY======", [102]], ["", []]] as const) {
      const html = renderToStaticMarkup(<I18nProvider locale="en" dict={dict("en")}><ByteEncodingOutput output={output} bytes={new Uint8Array(bytes)} target="base32" locale="en" /></I18nProvider>);
      expect(html).toContain('data-byte-encoding-output'); expect(html).toContain(BYTE_ENCODING_MESSAGES.en.downloadText); expect(html).toContain(BYTE_ENCODING_MESSAGES.en.downloadBytes);
      expect(html.includes('data-copy-button')).toBe(output !== "");
      if (!output) expect(html).toContain(BYTE_ENCODING_MESSAGES.en.emptyOutput);
    }
  });
});

describe("bounded binary file source", () => {
  it("reads actual bytes without interpreting a file name or MIME as an encoding", async () => {
    const file = new File([new Uint8Array([0, 255, 0, 195, 169])], "pretend.txt", { type: "text/plain" });
    const result = await readByteEncodingFile(file as unknown as globalThis.File);
    expect(result).toMatchObject({ ok: true, name: "pretend.txt", bytes: new Uint8Array([0, 255, 0, 195, 169]) });
  });
  it("accepts zero-byte and exact-limit files", async () => {
    for (const size of [0, 65_536]) {
      const result = await readByteEncodingFile(new File([new Uint8Array(size)], "file.bin") as unknown as globalThis.File);
      expect(result.ok).toBe(true); if (result.ok) expect(result.bytes.length).toBe(size);
    }
  });
  it("rejects before reading a file over the limit", async () => {
    let reads = 0;
    const file = { name: "large.bin", size: 65_537, arrayBuffer: async () => { reads++; return new ArrayBuffer(0); } };
    expect(await readByteEncodingFile(file as unknown as globalThis.File)).toEqual({ ok: false, error: "limit" });
    expect(reads).toBe(0);
  });
  it("rejects invalid file objects and read failures without exposing a stale result", async () => {
    expect(await readByteEncodingFile(null as never)).toEqual({ ok: false, error: "input-type" });
    const failed = { name: "bad.bin", size: 1, arrayBuffer: async () => { throw Error("unreadable"); } };
    expect(await readByteEncodingFile(failed as unknown as globalThis.File)).toEqual({ ok: false, error: "read" });
    const deceptive = { name: "bad.bin", size: 1, arrayBuffer: async () => new ArrayBuffer(65_537) };
    expect(await readByteEncodingFile(deceptive as unknown as globalThis.File)).toEqual({ ok: false, error: "limit" });
  });
});


describe("byte downloads retain exact content and report failures", () => {
  it("downloads UTF-8 output text and original binary bytes without text decoding", async () => {
    const delivered: { blob: Blob; name: string }[] = [];
    const download = (blob: Blob, name: string) => { delivered.push({ blob, name }); };
    const bytes = new Uint8Array([0, 255, 195, 169]);
    expect(downloadByteEncoding("text", "中😀", bytes, "utf8", download)).toEqual({ ok: true });
    expect(downloadByteEncoding("bytes", "ignored", bytes, "hex", download)).toEqual({ ok: true });
    expect(await delivered[0].blob.text()).toBe("中😀");
    expect(delivered[0].name).toBe("converted-utf8.txt");
    expect(new Uint8Array(await delivered[1].blob.arrayBuffer())).toEqual(bytes);
    expect(delivered[1].blob.type).toBe("application/octet-stream");
    expect(delivered[1].name).toBe("decoded-bytes.bin");
  });
  it("returns a failure rather than an unhandled exception or false success", () => {
    expect(downloadByteEncoding("bytes", "", new Uint8Array(), "base64", () => { throw Error("blocked"); })).toEqual({ ok: false });
  });
});


describe("native byte download URL lifecycle", () => {
  it("immediately revokes a URL when clicking fails and removes its anchor", () => {
    const revoke = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:failed-byte-download");
    const anchor = { href: "", download: "", click: () => { throw Error("blocked"); }, remove: vi.fn() };
    vi.stubGlobal("document", { createElement: () => anchor, body: { appendChild: vi.fn() } });
    try {
      expect(downloadByteEncoding("bytes", "", new Uint8Array([0, 255]), "hex")).toEqual({ ok: false });
      expect(revoke).toHaveBeenCalledExactlyOnceWith("blob:failed-byte-download");
      expect(anchor.remove).toHaveBeenCalledOnce();
    } finally { vi.unstubAllGlobals(); vi.restoreAllMocks(); }
  });
  it("keeps a successful URL briefly, then revokes it, and removes its anchor", () => {
    vi.useFakeTimers();
    const revoke = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:successful-byte-download");
    const anchor = { href: "", download: "", click: vi.fn(), remove: vi.fn() };
    const append = vi.fn();
    vi.stubGlobal("document", { createElement: () => anchor, body: { appendChild: append } });
    try {
      expect(downloadByteEncoding("text", "MY======", new Uint8Array([102]), "base32")).toEqual({ ok: true });
      expect(anchor.download).toBe("converted-base32.txt");
      expect(anchor.click).toHaveBeenCalledOnce(); expect(append).toHaveBeenCalledExactlyOnceWith(anchor);
      expect(anchor.remove).toHaveBeenCalledOnce(); expect(revoke).not.toHaveBeenCalled();
      vi.advanceTimersByTime(4000);
      expect(revoke).toHaveBeenCalledExactlyOnceWith("blob:successful-byte-download");
    } finally { vi.unstubAllGlobals(); vi.restoreAllMocks(); vi.useRealTimers(); }
  });
  it("releases the URL even if anchor construction fails", () => {
    const revoke = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:no-anchor");
    vi.stubGlobal("document", { createElement: () => { throw Error("no DOM element"); } });
    try {
      expect(downloadByteEncoding("bytes", "", new Uint8Array(), "base64")).toEqual({ ok: false });
      expect(revoke).toHaveBeenCalledExactlyOnceWith("blob:no-anchor");
    } finally { vi.unstubAllGlobals(); vi.restoreAllMocks(); }
  });
});
