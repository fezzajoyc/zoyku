"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import { ToolPanel } from "@/components/ui";
import { Note, Tabs, pick } from "./calc-ui";

/**
 * QR code scanner: uploaded images and live camera, decoded with jsqr.
 * Everything runs locally — image pixels and camera frames never leave the
 * device; the camera stream is stopped the moment a code is found or the
 * user stops scanning.
 */

type JsQR = typeof import("jsqr").default;
type ImgState = "idle" | "decoding" | "noqr" | "badimage";
type CamState = "idle" | "starting" | "scanning" | "denied" | "nocam" | "unsupported" | "error";

const S = {
  imageTab: { en: "From an image", zh: "从图片识别", ja: "画像から読み取り", es: "Desde una imagen", pt: "De uma imagem" },
  camTab: { en: "Live camera", zh: "摄像头实时扫描", ja: "カメラで読み取り", es: "Cámara en vivo", pt: "Câmera ao vivo" },
  drop: { en: "Drop a QR image here or click to choose", zh: "把二维码图片拖到这里,或点击选择", ja: "QR 画像をドロップ、またはクリックして選択", es: "Suelte una imagen con QR o haga clic para elegir", pt: "Solte uma imagem com QR ou clique para escolher" },
  decoding: { en: "Decoding…", zh: "识别中…", ja: "読み取り中…", es: "Decodificando…", pt: "Decodificando…" },
  noqr: { en: "No QR code found in this image. Try a sharper, larger crop.", zh: "图中未找到二维码。试试更清晰、更聚焦的截图。", ja: "この画像から QR コードは見つかりませんでした。鮮明で大きな切り抜きをお試しください。", es: "No se encontró ningún código QR en la imagen. Pruebe un recorte más nítido y grande.", pt: "Nenhum código QR encontrado nesta imagem. Tente um recorte mais nítido e maior." },
  badimage: { en: "That file could not be read as an image.", zh: "该文件无法作为图片读取。", ja: "そのファイルは画像として読み込めませんでした。", es: "No se pudo leer el archivo como imagen.", pt: "Não foi possível ler o arquivo como imagem." },
  idle: { en: "Point the camera at a QR code", zh: "将摄像头对准二维码", ja: "カメラを QR コードに向けてください", es: "Apunte la cámara a un código QR", pt: "Aponte a câmera para um código QR" },
  starting: { en: "Starting camera…", zh: "正在启动摄像头…", ja: "カメラを起動中…", es: "Iniciando cámara…", pt: "Iniciando câmera…" },
  start: { en: "Start camera", zh: "开启摄像头", ja: "カメラを起動", es: "Iniciar cámara", pt: "Iniciar câmera" },
  stop: { en: "Stop camera", zh: "关闭摄像头", ja: "カメラを停止", es: "Detener cámara", pt: "Parar câmera" },
  denied: { en: "Camera access was denied. Allow camera permission for this site and try again.", zh: "摄像头权限被拒绝。请在浏览器中允许本站使用摄像头后重试。", ja: "カメラへのアクセスが拒否されました。ブラウザでこのサイトのカメラ権限を許可して再試行してください。", es: "Se denegó el acceso a la cámara. Permita el uso de la cámara para este sitio e inténtelo de nuevo.", pt: "O acesso à câmera foi negado. Permita o uso da câmera para este site e tente novamente." },
  nocam: { en: "No camera was found on this device.", zh: "该设备上没有找到摄像头。", ja: "このデバイスにカメラが見つかりません。", es: "No se encontró ninguna cámara en este dispositivo.", pt: "Nenhuma câmera encontrada neste dispositivo." },
  unsupported: { en: "Live scanning needs a secure (https) page and a browser with camera support.", zh: "实时扫描需要安全(https)页面以及支持摄像头的浏览器。", ja: "ライブ読み取りには安全な(https)ページとカメラ対応ブラウザが必要です。", es: "El escaneo en vivo necesita una página segura (https) y un navegador con soporte de cámara.", pt: "A leitura ao vivo precisa de uma página segura (https) e de um navegador com suporte a câmera." },
  error: { en: "The camera could not be started. Try another browser or check device settings.", zh: "摄像头无法启动。请换一个浏览器或检查设备设置。", ja: "カメラを起動できませんでした。別のブラウザをお試しいただくか、デバイス設定をご確認ください。", es: "No se pudo iniciar la cámara. Pruebe con otro navegador o revise la configuración del dispositivo.", pt: "Não foi possível iniciar a câmera. Tente outro navegador ou verifique as configurações do dispositivo." },
  consent: {
    en: "The camera stream never leaves this device: frames are decoded locally, nothing is recorded, stored or uploaded, and the camera turns off as soon as a code is found.",
    zh: "摄像头画面不会离开本机:逐帧在本地解码,不录制、不存储、不上传,识别到二维码后摄像头立即关闭。",
    ja: "カメラ映像はこの端末から出ません。フレームはローカルでデコードされ、録画・保存・アップロードは一切ありません。コードが見つかり次第カメラはすぐに停止します。",
    es: "La señal de la cámara nunca sale de este dispositivo: los fotogramas se decodifican localmente, no se graba ni se sube nada, y la cámara se apaga en cuanto se encuentra un código.",
    pt: "O sinal da câmera nunca sai deste dispositivo: os quadros são decodificados localmente, nada é gravado ou enviado, e a câmera desliga assim que um código é encontrado.",
  },
  result: { en: "Decoded content", zh: "识别结果", ja: "読み取り結果", es: "Contenido decodificado", pt: "Conteúdo decodificado" },
  openLink: { en: "Open link", zh: "打开链接", ja: "リンクを開く", es: "Abrir enlace", pt: "Abrir link" },
};

function isUrl(text: string): boolean {
  return /^https?:\/\/\S+$/i.test(text.trim());
}

export function CalcEngineQrScan() {
  const { locale } = useI18n();
  const [tab, setTab] = useState("image");

  const [imgState, setImgState] = useState<ImgState>("idle");
  const [camState, setCamState] = useState<CamState>("idle");
  const [result, setResult] = useState<string | null>(null);

  const jsqrRef = useRef<JsQR | null>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const camRafRef = useRef(0);

  const loadJsqr = useCallback(async () => {
    if (!jsqrRef.current) jsqrRef.current = (await import("jsqr")).default;
    return jsqrRef.current;
  }, []);

  const stopCam = useCallback(() => {
    cancelAnimationFrame(camRafRef.current);
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
    streamRef.current = null;
    setCamState("idle");
  }, []);

  // leave nothing running when the tab changes or the page unmounts
  useEffect(() => {
    if (tab !== "camera") stopCam();
  }, [tab, stopCam]);
  useEffect(() => stopCam, [stopCam]);

  /** Draw the uploaded image with the detected QR corners highlighted. */
  const drawPreview = (img: HTMLImageElement, corners: { x: number; y: number }[] | null) => {
    const canvas = previewRef.current;
    if (!canvas) return;
    const maxW = 420;
    const scale = Math.min(1, maxW / img.naturalWidth);
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const h = Math.max(1, Math.round(img.naturalHeight * scale));
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, w, h);
    if (corners && corners.length === 4) {
      ctx.beginPath();
      ctx.moveTo(corners[0].x * scale, corners[0].y * scale);
      for (let i = 1; i < 4; i++) ctx.lineTo(corners[i].x * scale, corners[i].y * scale);
      ctx.closePath();
      ctx.strokeStyle = "#0071e3";
      ctx.lineWidth = Math.max(2, 3 * scale);
      ctx.stroke();
    }
  };

  const decodeImage = async (file: File) => {
    setImgState("decoding");
    setResult(null);
    const url = URL.createObjectURL(file);
    try {
      const [jsQR, img] = await Promise.all([
        loadJsqr(),
        new Promise<HTMLImageElement>((resolve, reject) => {
          const im = new Image();
          im.onload = () => resolve(im);
          im.onerror = () => reject(new Error("decode"));
          im.src = url;
        }),
      ]);
      const cap = 1500;
      const scale = Math.min(1, cap / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.max(1, Math.round(img.naturalWidth * scale));
      const h = Math.max(1, Math.round(img.naturalHeight * scale));
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) throw new Error("decode");
      octx.drawImage(img, 0, 0, w, h);
      const res = jsQR(octx.getImageData(0, 0, w, h).data, w, h);
      drawPreview(
        img,
        res
          ? [res.location.topLeftCorner, res.location.topRightCorner, res.location.bottomRightCorner, res.location.bottomLeftCorner]
          : null,
      );
      if (res) {
        setResult(res.data);
        setImgState("idle");
      } else {
        setImgState("noqr");
      }
    } catch {
      setImgState("badimage");
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  const startCam = async () => {
    setResult(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setCamState("unsupported");
      return;
    }
    setCamState("starting");
    let jsQR: JsQR;
    try {
      jsQR = await loadJsqr();
    } catch {
      setCamState("error");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      setCamState("scanning");
      await video.play();
    } catch (e) {
      const name = e instanceof DOMException ? e.name : "";
      // play() can still fail after the stream is live — never leak it
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((tr) => tr.stop());
        streamRef.current = null;
      }
      if (name === "NotFoundError" || name === "OverconstrainedError") setCamState("nocam");
      else if (name === "NotAllowedError" || name === "SecurityError") setCamState("denied");
      else setCamState("error");
      return;
    }

    const off = document.createElement("canvas");
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!octx) {
      stopCam();
      return;
    }
    const tick = () => {
      const video = videoRef.current;
      if (!streamRef.current || !video) return;
      if (video.readyState >= 2 && video.videoWidth > 0) {
        const cap = 640;
        const scale = Math.min(1, cap / Math.max(video.videoWidth, video.videoHeight));
        const w = Math.max(1, Math.round(video.videoWidth * scale));
        const h = Math.max(1, Math.round(video.videoHeight * scale));
        if (off.width !== w || off.height !== h) {
          off.width = w;
          off.height = h;
        }
        octx.drawImage(video, 0, 0, w, h);
        const res = jsQR(octx.getImageData(0, 0, w, h).data, w, h);
        if (res) {
          setResult(res.data);
          stopCam();
          return;
        }
      }
      camRafRef.current = requestAnimationFrame(tick);
    };
    camRafRef.current = requestAnimationFrame(tick);
  };

  const scanning = camState === "scanning" || camState === "starting";
  const camMsg: Record<string, string> | null =
    camState === "denied" ? S.denied
    : camState === "nocam" ? S.nocam
    : camState === "unsupported" ? S.unsupported
    : camState === "error" ? S.error
    : null;

  return (
    <ToolPanel>
      <Tabs
        value={tab}
        onChange={setTab}
        options={[
          { id: "image", label: pick(locale, S.imageTab) },
          { id: "camera", label: pick(locale, S.camTab) },
        ]}
      />

      {tab === "image" ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
          <div className="space-y-4">
            <DropZoneSingle onFile={decodeImage} label={pick(locale, S.drop)} />
            {imgState === "decoding" && <p className="text-[14px] text-[var(--color-sub)]">{pick(locale, S.decoding)}</p>}
            {imgState === "noqr" && <p className="text-[14px] text-[var(--color-bad)]">{pick(locale, S.noqr)}</p>}
            {imgState === "badimage" && <p className="text-[14px] text-[var(--color-bad)]">{pick(locale, S.badimage)}</p>}
          </div>
          <div className="overflow-hidden rounded-2xl border hairline">
            <canvas ref={previewRef} className="block max-w-full" aria-label="image preview" />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border hairline bg-[var(--color-surface)]">
            <video
              ref={videoRef}
              playsInline
              muted
              className="block aspect-[4/3] w-full object-cover transition-opacity"
              style={{ opacity: scanning ? 1 : 0 }}
              aria-label="camera preview"
            />
            {!scanning && (
              <div className="absolute inset-0 grid place-items-center p-6 text-center">
                <p className="text-[14px] text-[var(--color-sub)]">{pick(locale, S.idle)}</p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={scanning ? stopCam : startCam}
              disabled={camState === "starting"}
              className="rounded-full bg-[var(--color-ink)] px-6 py-2.5 text-[14px] font-semibold text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity hover:opacity-85 disabled:opacity-40"
            >
              {scanning ? pick(locale, S.stop) : pick(locale, S.start)}
            </button>
            {scanning && <p className="text-[13px] text-[var(--color-sub)]">{pick(locale, S.decoding)}</p>}
          </div>
          {camMsg && <p className="text-[14px] text-[var(--color-bad)]">{pick(locale, camMsg)}</p>}
          <p className="max-w-2xl text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, S.consent)}</p>
        </div>
      )}

      {result !== null && (
        <div className="mt-6 rounded-2xl border hairline bg-[var(--color-surface)] px-5 py-4" aria-live="polite">
          <div className="text-[12.5px] font-medium uppercase tracking-wide text-[var(--color-sub)]">
            {pick(locale, S.result)}
          </div>
          <p className="mono mt-2 break-all text-[15px] leading-6">{result}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <CopyButton value={result} />
            {isUrl(result) && (
              <a
                href={result.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-card)]"
              >
                <Icon name="link" size={14} />
                {pick(locale, S.openLink)}
              </a>
            )}
          </div>
        </div>
      )}

      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "Decoding runs entirely on this page with the jsqr library: uploaded images are read from local pixels and camera frames are analyzed in memory, so nothing is uploaded, logged or stored. The camera stops as soon as a code is recognized or you press stop.",
            zh: "识别完全在本页用 jsqr 库完成:上传的图片只读取本地像素,摄像头画面仅在内存中分析,不上传、不留日志、不存储。识别到二维码或你点击停止后,摄像头立即关闭。",
            ja: "読み取りはこのページ上で jsqr ライブラリにより完結します。アップロード画像はローカルのピクセルから、カメラのフレームはメモリ内で解析され、アップロード・記録・保存は一切ありません。コードを認識するか停止を押すと、カメラはすぐに止まります。",
            es: "La decodificación ocurre íntegramente en esta página con la librería jsqr: las imágenes subidas se leen de píxeles locales y los fotogramas de la cámara se analizan en memoria; nada se sube, registra o almacena. La cámara se detiene en cuanto reconoce un código o cuando pulsa detener.",
            pt: "A decodificação acontece inteiramente nesta página com a biblioteca jsqr: imagens enviadas são lidas de pixels locais e os quadros da câmera são analisados na memória — nada é enviado, registrado ou armazenado. A câmera para assim que um código é reconhecido ou quando você aperta parar.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

/** Single-file drop zone variant (image scanner). */
function DropZoneSingle({ onFile, label }: { onFile: (f: File) => void; label: string }) {
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const take = (list: FileList | null) => {
    if (list?.length) onFile(list[0]);
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        take(e.dataTransfer.files);
      }}
      className={`dropzone cursor-pointer py-12 ${over ? "over" : ""}`}
      aria-label={label}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          take(e.target.files);
          e.target.value = "";
        }}
      />
      <div className="pointer-events-none">
        <Icon name="qr" size={26} className="mx-auto mb-2 text-[var(--color-sub)]" />
        <p className="text-[14px] text-[var(--color-sub)]">{label}</p>
      </div>
    </div>
  );
}
