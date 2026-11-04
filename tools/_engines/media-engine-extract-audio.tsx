"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";

/**
 * ffmpeg.wasm 单线程版,按需从 CDN 加载(不进 bundle,首屏零影响):
 * core 约 31MB,首次使用时下载并被浏览器缓存。
 * 视频文件不离开设备——解封装 + 音频编码全在浏览器内完成。
 * 单线程版无需 SharedArrayBuffer,站点因此无需加 COOP/COEP 响应头。
 * CDN 加载失败/进度文案模式沿用 pdf-engine-ocr(tesseract)先例。
 */

const FFMPEG_JS_CDN = "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15/dist/umd/ffmpeg.js";
// worker/core 必须走 ESM 版:UMD worker 在 classWorkerURL(blob) 下被强制以 module 类型实例化,
// 其 webpack 运行时在 module worker 里不可用(实测 "Cannot find module");ESM worker + ESM core 已浏览器实测通过。
const FFMPEG_WORKER_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15/dist/esm/worker.js";
const FFMPEG_CORE_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.js";
const FFMPEG_CORE_WASM = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.wasm";

type FFmpegLike = {
  load: (config: { coreURL: string; wasmURL: string; classWorkerURL?: string }) => Promise<boolean>;
  writeFile: (name: string, data: Uint8Array) => Promise<boolean>;
  readFile: (name: string) => Promise<Uint8Array | string>;
  exec: (args: string[]) => Promise<number>;
  on: (event: "progress", callback: (e: { progress?: number }) => void) => void;
  loaded?: boolean;
};

const UI: Record<string, Record<string, string>> = {
  cdnFail: {
    en: "Could not load the conversion engine (about 31 MB, downloaded once and cached by your browser). Check your internet connection and try again — your video never leaves your device.",
    zh: "无法加载转换引擎(约 31 MB,只需下载一次,浏览器会缓存)。请检查网络后重试——视频文件不会离开你的设备。",
    ja: "変換エンジン(約 31 MB、初回のみダウンロードしてブラウザがキャッシュ)を読み込めませんでした。ネットワークを確認して再試行してください。動画が端末の外に出ることはありません。",
    es: "No se pudo cargar el motor de conversión (unos 31 MB, se descarga una vez y tu navegador lo guarda en caché). Comprueba tu conexión e inténtalo de nuevo: tu video nunca sale de tu dispositivo.",
    pt: "Não foi possível carregar o motor de conversão (cerca de 31 MB, baixado uma vez e mantido em cache pelo navegador). Verifique sua conexão e tente novamente — seu vídeo nunca sai do dispositivo.",
  },
  quality: { en: "MP3 quality", zh: "MP3 音质", ja: "MP3 音質", es: "Calidad MP3", pt: "Qualidade MP3" },
  qHigh: { en: "High (320 kbps)", zh: "高(320 kbps)", ja: "高(320 kbps)", es: "Alta (320 kbps)", pt: "Alta (320 kbps)" },
  qStd: { en: "Standard (192 kbps)", zh: "标准(192 kbps)", ja: "標準(192 kbps)", es: "Estándar (192 kbps)", pt: "Padrão (192 kbps)" },
  qSmall: { en: "Small (128 kbps)", zh: "小文件(128 kbps)", ja: "小容量(128 kbps)", es: "Pequeño (128 kbps)", pt: "Pequeno (128 kbps)" },
  start: { en: "Extract audio", zh: "提取音频", ja: "音声を抽出", es: "Extraer audio", pt: "Extrair áudio" },
  loadEngine: {
    en: "Loading the conversion engine (first time only, ~31 MB)…",
    zh: "正在加载转换引擎(仅首次,约 31 MB)…",
    ja: "変換エンジンを読み込み中(初回のみ、約 31 MB)…",
    es: "Cargando el motor de conversión (solo la primera vez, ~31 MB)…",
    pt: "Carregando o motor de conversão (apenas na primeira vez, ~31 MB)…",
  },
  done: { en: "Audio extracted", zh: "音频提取完成", ja: "音声の抽出が完了", es: "Audio extraído", pt: "Áudio extraído" },
  noAudio: {
    en: "No audio track found in this video — it may be silent or use an unsupported container. Try MP4, MOV or WebM.",
    zh: "这个视频里没有找到音频轨——可能是无声视频或容器不受支持。试试 MP4、MOV 或 WebM。",
    ja: "この動画に音声トラックが見つかりません — 無音か未対応のコンテナの可能性があります。MP4・MOV・WebM をお試しください。",
    es: "No se encontró pista de audio en este video: puede estar sin sonido o usar un contenedor no admitido. Prueba MP4, MOV o WebM.",
    pt: "Nenhuma faixa de áudio encontrada neste vídeo — pode estar sem som ou usar um contêiner não suportado. Tente MP4, MOV ou WebM.",
  },
};

function tr2(l: Record<string, string>, locale: string): string {
  return l[locale] ?? l.en!;
}

let ffmpegJsPromise: Promise<Record<string, unknown>> | null = null;

function loadFfmpegScript(): Promise<Record<string, unknown>> {
  if (ffmpegJsPromise) return ffmpegJsPromise;
  ffmpegJsPromise = new Promise((resolve, reject) => {
    const w = window as unknown as Record<string, unknown>;
    if (w.FFmpegWASM) {
      resolve(w.FFmpegWASM as Record<string, unknown>);
      return;
    }
    const script = document.createElement("script");
    script.src = FFMPEG_JS_CDN;
    script.async = true;
    script.onload = () => {
      if (w.FFmpegWASM) resolve(w.FFmpegWASM as Record<string, unknown>);
      else reject(new Error("cdn"));
    };
    script.onerror = () => reject(new Error("cdn"));
    document.head.appendChild(script);
  });
  return ffmpegJsPromise;
}

export function ExtractAudioEngine() {
  const { t, locale } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [bitrate, setBitrate] = useState<"320k" | "192k" | "128k">("192k");
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState<"idle" | "engine" | "convert" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState("");
  const [out, setOut] = useState<{ name: string; blob: Blob } | null>(null);
  const ffmpegRef = useRef<FFmpegLike | null>(null);

  const reset = useCallback(() => {
    setFile(null);
    setOut(null);
    setErr("");
    setPhase("idle");
    setProgress(0);
  }, []);

  const pick = useCallback(
    (fs: File[]) => {
      const f = fs.find((x) => /\.(mp4|mov|webm|mkv|avi|m4v|ts)$/i.test(x.name) || x.type.startsWith("video/"));
      if (!f) {
        setErr(t.common.error);
        return;
      }
      setFile(f);
      setOut(null);
      setErr("");
      setPhase("idle");
      setProgress(0);
    },
    [t.common.error],
  );

  useEffect(
    () => () => {
      // 引擎随页面释放;core wasm 由 HTTP 缓存接管,下次进入不重新下载
      ffmpegRef.current = null;
      ffmpegJsPromise = null;
    },
    [],
  );

  async function ensureFfmpeg(): Promise<FFmpegLike> {
    if (ffmpegRef.current?.loaded) return ffmpegRef.current;
    setPhase("engine");
    const mod = await loadFfmpegScript();
    // loadFfmpegScript resolve 的就是 window.FFmpegWASM 本体({ FFFSType, FFmpeg }),FFmpeg 类直接在其顶层
    const FFmpegClass = (mod as { FFmpeg: new () => FFmpegLike }).FFmpeg;
    const ff = new FFmpegClass();
    ff.on("progress", (e) => {
      if (typeof e.progress === "number" && e.progress >= 0) setProgress(Math.min(0.99, e.progress));
    });
    // 跨域 Worker 绕过:fetch 脚本为 blob: URL,使 Worker 同源
    // worker 脚本转 blob 绕过 Worker 同源限制;其内部相对 import 重写为绝对 URL(blob 基底解析不了相对路径)
    const workerCode = await fetch(FFMPEG_WORKER_URL).then((r) => r.text());
    const esmBase = FFMPEG_WORKER_URL.replace(/worker\.js$/, "");
    const fixed = workerCode.replace(/from\s*"(\.\/[^"]+)"/g, (_m, rel) => `from "${esmBase}${rel.slice(2)}"`);
    const workerBlob = URL.createObjectURL(new Blob([fixed], { type: "text/javascript" }));
    await ff.load({
      classWorkerURL: workerBlob,
      coreURL: FFMPEG_CORE_URL,
      wasmURL: FFMPEG_CORE_WASM,
    });
    ff.loaded = true;
    ffmpegRef.current = ff;
    return ff;
  }

  async function run() {
    if (!file) {
      setErr(t.common.dropFile);
      return;
    }
    setBusy(true);
    setErr("");
    setOut(null);
    setProgress(0);
    let inName: string | null = null;
    let outName: string | null = null;
    try {
      const ff = await ensureFfmpeg();
      setPhase("convert");
      inName = "input" + (file.name.match(/\.[a-z0-9]+$/i)?.[0] ?? ".mp4");
      outName = (file.name.replace(/\.[^.]+$/, "") || "audio") + ".mp3";
      await ff.writeFile(inName, new Uint8Array(await file.arrayBuffer()));
      const code = await ff.exec(["-i", inName, "-vn", "-c:a", "libmp3lame", "-b:a", bitrate, "-y", outName]);
      if (code !== 0) throw new Error("ffmpeg");
      const result = await ff.readFile(outName);
      if (!(result instanceof Uint8Array) || result.length === 0) throw new Error("noaudio");
      const blob = new Blob([result.slice().buffer as ArrayBuffer], { type: "audio/mpeg" });
      setOut({ name: outName, blob });
      setPhase("done");
      setProgress(1);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg === "noaudio" || msg === "ffmpeg") setErr(tr2(UI.noAudio, locale));
      else if (msg === "cdn") setErr(tr2(UI.cdnFail, locale));
      else setErr(`${tr2(UI.cdnFail, locale)} (${msg.slice(0, 120)})`);
    } finally {
      // 虚拟 FS 清理,防内存驻留大文件
      try {
        const ff = ffmpegRef.current;
        if (ff && inName) await ff.writeFile(inName, new Uint8Array(0));
        if (ff && outName) await ff.writeFile(outName, new Uint8Array(0));
      } catch { /* best-effort */ }
      setBusy(false);
    }
  }

  return (
    <ToolPanel>
      <div className="space-y-4">
        {!file && <DropZone onFiles={pick} accept="video/*,.mp4,.mov,.webm,.mkv,.avi" />}
        {file && (
          <div className="flex items-center justify-between rounded-xl border hairline px-3.5 py-2.5">
            <span className="min-w-0 flex-1 truncate text-[14px]">{file.name}</span>
            <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(file.size)}</span>
            {!busy && (
              <button type="button" onClick={reset} aria-label={t.common.reset}
                className="ml-2 h-7 w-7 flex-none rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)]">
                <span aria-hidden="true">×</span>
              </button>
            )}
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[var(--color-sub)]">{tr2(UI.quality, locale)}</label>
          <div className="flex flex-wrap gap-2">
            {(["320k", "192k", "128k"] as const).map((b) => (
              <button key={b} type="button" onClick={() => setBitrate(b)}
                aria-pressed={bitrate === b}
                className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${bitrate === b ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]" : "hairline hover:bg-[var(--color-surface)]"}`}>
                {b === "320k" ? tr2(UI.qHigh, locale) : b === "128k" ? tr2(UI.qSmall, locale) : tr2(UI.qStd, locale)}
              </button>
            ))}
          </div>
        </div>

        {busy && phase === "engine" && <p className="text-[13px] text-[var(--color-sub)]">{tr2(UI.loadEngine, locale)}</p>}
        {busy && phase === "convert" && (
          <div role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface)]">
              <div className="h-full rounded-full bg-[var(--color-accent)] transition-all" style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
            <p className="mono mt-1.5 text-[12.5px] text-[var(--color-sub)]">{Math.round(progress * 100)}%</p>
          </div>
        )}

        {out && (
          <div className="rounded-xl border hairline p-4">
            <p className="mb-2 text-[13.5px] font-semibold">{tr2(UI.done, locale)}</p>
            <div className="flex items-center gap-2.5 text-[14px]">
              <span className="min-w-0 flex-1 truncate">{out.name}</span>
              <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(out.blob.size)}</span>
              <button type="button" onClick={() => downloadBlob(out.blob, out.name)}
                className="flex-none rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium hover:bg-[var(--color-surface)]">
                {t.common.download}
              </button>
            </div>
          </div>
        )}

        {err && <p className="error-bg rounded-xl px-3.5 py-2.5 text-[13.5px] text-[var(--color-bad)]" role="alert">{err}</p>}

        <div className="flex flex-wrap gap-2.5">
          <button type="button" onClick={run} disabled={busy || !file}
            className="rounded-full bg-[var(--color-ink)] px-5 py-2 text-[14px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40">
            {tr2(UI.start, locale)}
          </button>
          {file && !busy && <button type="button" onClick={reset} className="rounded-full border hairline px-3.5 py-2 text-[13px] font-medium hover:bg-[var(--color-surface)]">{t.common.reset}</button>}
        </div>
      </div>
    </ToolPanel>
  );
}
