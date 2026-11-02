"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { downloadBlob } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, Note, Sel, pick } from "./calc-ui";

/**
 * QR code generator. The `qrcode` package is imported dynamically on the
 * client; encoding runs entirely in the browser. PNG + SVG download.
 */

type Ecc = "L" | "M" | "Q" | "H";

export function CalcEngineQr() {
  const { locale, t } = useI18n();
  const [text, setText] = useState("https://");
  const [size, setSize] = useState(320);
  const [ecc, setEcc] = useState<Ecc>("M");
  const [dark, setDark] = useState("#1d1d1f");
  const [light, setLight] = useState("#ffffff");
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!canvasRef.current) return;
      if (!text.trim()) {
        const ctx = canvasRef.current.getContext("2d");
        ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setReady(false);
        return;
      }
      try {
        const QR = (await import("qrcode")).default;
        await QR.toCanvas(canvasRef.current, text, {
          width: size,
          margin: 2,
          errorCorrectionLevel: ecc,
          color: { dark, light },
        });
        if (alive) setReady(true);
      } catch {
        if (alive) setReady(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [text, size, ecc, dark, light]);

  const downloadPng = async () => {
    if (!canvasRef.current || !ready) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) downloadBlob(blob, "qr-code.png");
    }, "image/png");
  };

  const downloadSvg = async () => {
    if (!text.trim()) return;
    const QR = (await import("qrcode")).default;
    const svg = await QR.toString(text, {
      type: "svg",
      width: size,
      margin: 2,
      errorCorrectionLevel: ecc,
      color: { dark, light },
    });
    downloadBlob(new Blob([svg], { type: "image/svg+xml" }), "qr-code.svg");
  };

  return (
    <ToolPanel>
      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
        <div className="space-y-4">
          <Field label={pick(locale, { en: "Text or URL", zh: "文本或网址", ja: "テキストまたは URL", es: "Texto o URL", pt: "Texto ou URL" })}>
            <textarea
              className="field mono"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com"
              aria-label={pick(locale, { en: "Text or URL", zh: "文本或网址", ja: "テキストまたは URL", es: "Texto o URL", pt: "Texto ou URL" })}
              spellCheck={false}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={pick(locale, { en: "Error correction", zh: "纠错级别", ja: "誤り訂正レベル", es: "Corrección de errores", pt: "Correção de erros" })}>
              <Sel value={ecc} onChange={(v) => setEcc(v as Ecc)} aria="error correction level">
                <option value="L">L · 7%</option>
                <option value="M">M · 15%</option>
                <option value="Q">Q · 25%</option>
                <option value="H">H · 30%</option>
              </Sel>
            </Field>
            <Field label={pick(locale, { en: "Colors (code / background)", zh: "颜色(码 / 背景)", ja: "色(コード / 背景)", es: "Colores (código / fondo)", pt: "Cores (código / fundo)" })}>
              <div className="flex items-center gap-2">
                <input type="color" className="h-10 w-14 cursor-pointer rounded-lg border hairline bg-[var(--color-card)]" value={dark} onChange={(e) => setDark(e.target.value)} aria-label="code color" />
                <input type="color" className="h-10 w-14 cursor-pointer rounded-lg border hairline bg-[var(--color-card)]" value={light} onChange={(e) => setLight(e.target.value)} aria-label="background color" />
              </div>
            </Field>
          </div>
          <Field label={`${pick(locale, { en: "Size", zh: "尺寸", ja: "サイズ", es: "Tamaño", pt: "Tamanho" })} (${size} px)`}>
            <input type="range" min={128} max={768} step={16} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full" aria-label="qr size" />
          </Field>
        </div>

        <div className="flex flex-col items-center justify-start gap-3">
          <div className="rounded-2xl border hairline p-3">
            <canvas ref={canvasRef} width={size} height={size} aria-label="QR code preview" />
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            <button
              type="button"
              disabled={!ready}
              onClick={downloadPng}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white transition-opacity disabled:opacity-40"
            >
              {t.common.download} PNG
            </button>
            <button
              type="button"
              disabled={!ready}
              onClick={downloadSvg}
              className="inline-flex items-center gap-1.5 rounded-full border hairline px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-[var(--color-surface)] disabled:opacity-40"
            >
              {t.common.download} SVG
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "Encoding happens in your browser via the qrcode library — the image is never uploaded. Higher error-correction levels keep codes scannable even when partially covered or printed small.",
            zh: "二维码由浏览器内的 qrcode 库生成,图片不会上传。纠错级别越高,二维码被遮挡一部分或印得很小时仍可扫出。",
            ja: "QR コードはブラウザ内の qrcode ライブラリで生成され、画像はアップロードされません。誤り訂正レベルを上げると、一部が隠れても小さく印刷しても読み取れます。",
            es: "La codificación ocurre en su navegador con la librería qrcode: la imagen nunca se sube. Niveles de corrección más altos permiten escanear códigos parcialmente cubiertos o impresos pequeños.",
            pt: "A codificação acontece no seu navegador com a biblioteca qrcode — a imagem nunca é enviada. Níveis maiores de correção mantêm o código legível mesmo parcialmente coberto ou impresso pequeno.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}
