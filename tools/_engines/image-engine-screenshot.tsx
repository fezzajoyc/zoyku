"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { downloadBlob, formatBytes } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import type { Locale } from "@/lib/site";
import { ToolPanel } from "@/components/ui";
import { canvasToBlob, clamp } from "./image-util";
import { CropStage, fitRect, type CropRect } from "./image-crop-widget";

/**
 * screenshot-tool 引擎:getDisplayMedia 抓取一帧(经浏览器授权弹窗),
 * 流立即停止;本地方案内可选裁剪后保存 PNG。全程不录屏、不上传。
 */

const L: Record<string, Record<string, string>> =  {
  title: {
    en: "Capture your screen",
    zh: "捕捉屏幕画面",
    ja: "画面をキャプチャ",
    es: "Captura tu pantalla",
    pt: "Capture sua tela",
  },
  consent: {
    en: "Your browser will ask which screen, window or tab to share. Exactly one still frame is grabbed, the share ends immediately, and the image is processed on your device — nothing is recorded or uploaded.",
    zh: "浏览器会询问你要共享哪个屏幕、窗口或标签页。工具只抓取一帧静止画面,共享随即结束,图片在本机处理——不做任何录制,也不上传。",
    ja: "ブラウザが共有する画面・ウィンドウ・タブを尋ねます。取得するのは 1 枚の静止画のみで、共有は即座に終了します。画像は端末内で処理され、録画もアップロードも行われません。",
    es: "Tu navegador preguntará qué pantalla, ventana o pestaña compartir. Se toma exactamente un fotograma, la compartición termina de inmediato y la imagen se procesa en tu dispositivo: no se graba ni se sube nada.",
    pt: "Seu navegador vai perguntar qual tela, janela ou aba compartilhar. Apenas um quadro é capturado, o compartilhamento termina imediatamente e a imagem é processada no seu dispositivo — nada é gravado ou enviado.",
  },
  start: {
    en: "Choose screen & capture",
    zh: "选择屏幕并截取",
    ja: "画面を選んでキャプチャ",
    es: "Elegir pantalla y capturar",
    pt: "Escolher tela e capturar",
  },
  again: {
    en: "Capture again",
    zh: "重新截取",
    ja: "もう一度キャプチャ",
    es: "Capturar de nuevo",
    pt: "Capturar novamente",
  },
  cropToggle: {
    en: "Crop before saving",
    zh: "保存前裁剪",
    ja: "保存前に切り抜く",
    es: "Recortar antes de guardar",
    pt: "Recortar antes de salvar",
  },
  save: {
    en: "Save PNG",
    zh: "保存 PNG",
    ja: "PNG を保存",
    es: "Guardar PNG",
    pt: "Salvar PNG",
  },
  denied: {
    en: "Screen sharing was cancelled or denied. Nothing was captured.",
    zh: "屏幕共享被取消或拒绝,未捕获任何内容。",
    ja: "画面共有がキャンセルか拒否されました。何も取得していません。",
    es: "La compartición de pantalla se canceló o fue denegada. No se capturó nada.",
    pt: "O compartilhamento de tela foi cancelado ou negado. Nada foi capturado.",
  },
  unsupported: {
    en: "This browser cannot capture the screen. Screen capture needs a desktop browser (Chrome, Edge, Firefox or Safari 13+ on macOS).",
    zh: "当前浏览器无法截取屏幕。屏幕捕捉需要桌面版浏览器(Chrome、Edge、Firefox 或 macOS 上的 Safari 13+)。",
    ja: "このブラウザは画面をキャプチャできません。画面キャプチャにはデスクトップ ブラウザ(Chrome、Edge、Firefox、macOS の Safari 13 以降)が必要です。",
    es: "Este navegador no puede capturar la pantalla. La captura requiere un navegador de escritorio (Chrome, Edge, Firefox o Safari 13+ en macOS).",
    pt: "Este navegador não consegue capturar a tela. A captura requer um navegador de desktop (Chrome, Edge, Firefox ou Safari 13+ no macOS).",
  },
  captured: {
    en: "Frame captured · sharing already stopped",
    zh: "已捕获画面 · 共享已结束",
    ja: "フレーム取得済み · 共有は終了しています",
    es: "Fotograma capturado · la compartición ya se detuvo",
    pt: "Quadro capturado · o compartilhamento já parou",
  },
} satisfies Record<string, Record<string, string>>;

type Phase = "idle" | "captured" | "denied" | "unsupported";

export function ImageScreenshotEngine() {
  const { locale } = useI18n();
  const [phase, setPhase] = useState<Phase>("idle");
  const [shot, setShot] = useState<{ url: string; blob: Blob; w: number; h: number } | null>(null);
  const [cropOn, setCropOn] = useState(false);
  const [rect, setRect] = useState<CropRect>({ x: 0, y: 0, w: 0, h: 0 });
  const [busy, setBusy] = useState(false);
  const shotUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (shotUrlRef.current) URL.revokeObjectURL(shotUrlRef.current);
    };
  }, []);

  const supported = typeof navigator !== "undefined" && !!navigator.mediaDevices?.getDisplayMedia;

  const capture = useCallback(async () => {
    if (!supported) {
      setPhase("unsupported");
      return;
    }
    setBusy(true);
    let stream: MediaStream | null = null;
    const video = document.createElement("video");
    // 部分浏览器(Safari)会对脱离 DOM 的视频限流,挂载为不可见的 1px 元素
    video.setAttribute("aria-hidden", "true");
    video.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none;";
    document.body.appendChild(video);
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;
      await video.play();
      // 等两帧,确保首帧已渲染
      await new Promise<void>((r) =>
        requestAnimationFrame(() => requestAnimationFrame(() => r())),
      );
      const w = video.videoWidth;
      const h = video.videoHeight;
      if (!w || !h) throw new Error("no-frame");
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("no-frame");
      ctx.drawImage(video, 0, 0, w, h);
      const blob = await canvasToBlob(canvas, "image/png");
      if (shotUrlRef.current) URL.revokeObjectURL(shotUrlRef.current);
      const url = URL.createObjectURL(blob);
      shotUrlRef.current = url;
      setShot({ url, blob, w, h });
      setRect(fitRect(w, h, null));
      setPhase("captured");
    } catch {
      setShot(null);
      setPhase("denied");
    } finally {
      video.pause();
      video.srcObject = null;
      video.remove();
      stream?.getTracks().forEach((tr) => tr.stop());
      setBusy(false);
    }
  }, [supported]);

  const save = useCallback(async () => {
    if (!shot) return;
    const stamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 19);
    if (!cropOn) {
      downloadBlob(shot.blob, `screenshot-${stamp}.png`);
      return;
    }
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = () => reject(new Error("decode-failed"));
      im.src = shot.url;
    });
    const canvas = document.createElement("canvas");
    const sx = clamp(Math.round(rect.x), 0, shot.w - 1);
    const sy = clamp(Math.round(rect.y), 0, shot.h - 1);
    const sw = clamp(Math.round(rect.w), 1, shot.w - sx);
    const sh = clamp(Math.round(rect.h), 1, shot.h - sy);
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    canvas.toBlob((b) => b && downloadBlob(b, `screenshot-${stamp}.png`), "image/png");
  }, [shot, cropOn, rect]);

  return (
    <ToolPanel>
      {phase === "idle" || phase === "unsupported" || phase === "denied" ? (
        <div className="py-2 text-center">
          <span className="inline-flex rounded-2xl bg-[var(--color-surface)] p-4 text-[var(--color-sub)]">
            <Icon name="download" size={30} />
          </span>
          <h2 className="mt-3 text-[17px] font-semibold">{L.title[locale] ?? L.title.en}</h2>
          <p className="mx-auto mt-2 max-w-xl text-[14px] leading-6 text-[var(--color-sub)]">
            {L.consent[locale] ?? L.consent.en}
          </p>
          {phase === "denied" && (
            <p className="mx-auto mt-3 max-w-xl text-[13.5px] text-[var(--color-bad)]" role="alert">
              {L.denied[locale] ?? L.denied.en}
            </p>
          )}
          {phase === "unsupported" && (
            <p className="mx-auto mt-3 max-w-xl text-[13.5px] text-[var(--color-bad)]" role="alert">
              {L.unsupported[locale] ?? L.unsupported.en}
            </p>
          )}
          <button
            type="button"
            onClick={() => void capture()}
            disabled={busy || !supported}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Icon name="download" size={16} />
            {busy ? "…" : L.start[locale] ?? L.start.en}
          </button>
        </div>
      ) : null}

      {phase === "captured" && shot && (
        <>
          <p className="mb-3 flex items-center gap-2 text-[13.5px] font-medium text-[var(--color-good)]" role="status">
            <Icon name="check" size={15} />
            {L.captured[locale] ?? L.captured.en} · {shot.w}×{shot.h} · {formatBytes(shot.blob.size)}
          </p>

          <label className="flex cursor-pointer items-center gap-2 text-[14px] font-medium">
            <input type="checkbox" checked={cropOn} onChange={(e) => setCropOn(e.target.checked)} className="h-4 w-4" />
            {L.cropToggle[locale] ?? L.cropToggle.en}
          </label>

          {cropOn && (
            <div className="mt-3">
              <CropStage
                src={shot.url}
                width={shot.w}
                height={shot.h}
                rect={rect}
                aspect={null}
                onChange={setRect}
              />
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => void save()}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Icon name="download" size={15} />
              {L.save[locale] ?? L.save.en}
            </button>
            <button
              type="button"
              onClick={() => void capture()}
              disabled={busy}
              className="rounded-full border hairline px-4 py-2 text-[14px] font-medium transition-colors hover:bg-[var(--color-surface)] disabled:opacity-50"
            >
              {L.again[locale] ?? L.again.en}
            </button>
          </div>
        </>
      )}
    </ToolPanel>
  );
}
