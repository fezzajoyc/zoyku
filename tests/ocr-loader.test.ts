import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type Script = { src?: string; async?: boolean; onload?: () => void; onerror?: () => void; remove: ReturnType<typeof vi.fn> };
let scripts: Script[];
let host: Record<string, unknown>;

beforeEach(() => {
  vi.resetModules();
  scripts = [];
  host = {};
  vi.stubGlobal("window", host);
  vi.stubGlobal("document", {
    createElement: () => ({ remove: vi.fn() }),
    head: { appendChild: (script: Script) => { scripts.push(script); } },
  });
});
afterEach(() => vi.unstubAllGlobals());

describe("shared OCR CDN loader", () => {
  it("shares concurrent loads, retries a rejected request, then caches the real loaded engine", async () => {
    const { loadTesseract } = await import("@/tools/_engines/ocr-loader");
    const first = loadTesseract();
    const second = loadTesseract();
    expect(second).toBe(first);
    expect(scripts).toHaveLength(1);
    expect(scripts[0].src).toBe("https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js");
    expect(scripts[0].async).toBe(true);
    scripts[0].onerror?.();
    expect(await Promise.allSettled([first, second])).toEqual([
      { status: "rejected", reason: new Error("cdn") },
      { status: "rejected", reason: new Error("cdn") },
    ]);
    expect(scripts[0].remove).toHaveBeenCalledOnce();

    const retry = loadTesseract();
    expect(scripts).toHaveLength(2);
    const engine = { recognize: () => Promise.resolve({ data: { text: "synthetic" } }) };
    host.Tesseract = engine;
    scripts[1].onload?.();
    await expect(retry).resolves.toBe(engine);
    await expect(loadTesseract()).resolves.toBe(engine);
    expect(scripts).toHaveLength(2);
  });

  it("removes an invalid CDN response and allows a fresh retry", async () => {
    const { loadTesseract } = await import("@/tools/_engines/ocr-loader");
    const first = loadTesseract();
    scripts[0].onload?.();
    await expect(first).rejects.toThrow("cdn");
    expect(scripts[0].remove).toHaveBeenCalledOnce();
    const second = loadTesseract();
    expect(scripts).toHaveLength(2);
    scripts[1].onerror?.();
    await expect(second).rejects.toThrow("cdn");
  });

  it("reuses a previously loaded browser engine without injecting a script", async () => {
    const engine = { recognize: () => undefined };
    host.Tesseract = engine;
    const { loadTesseract } = await import("@/tools/_engines/ocr-loader");
    await expect(loadTesseract()).resolves.toBe(engine);
    expect(scripts).toHaveLength(0);
  });
});
