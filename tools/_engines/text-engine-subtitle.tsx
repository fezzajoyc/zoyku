"use client";

import { useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import { convertSubtitle, type SubtitleFormat } from "../_lib/subtitle-convert";
import type { Locale } from "@/lib/site";

/**
 * CN-034:字幕格式转换引擎。源格式(SRT/WebVTT/ASS)→ 目标格式(SRT/WebVTT)。
 * ASS/SSA 只到 SRT(单向,界面锁死);VTT→ASS 明确不做(文案与 note 诚实说明)。
 * 全部本地转换,无上传。
 */

const L = {
  src: { en: "Source format", zh: "源格式", ja: "変換元フォーマット", es: "Formato de origen", pt: "Formato de origem" },
  tgt: { en: "Target format", zh: "目标格式", ja: "変換先フォーマット", es: "Formato de destino", pt: "Formato de destino" },
  input: { en: "Subtitle content", zh: "字幕内容", ja: "字幕の内容", es: "Contenido del subtítulo", pt: "Conteúdo da legenda" },
  output: { en: "Result", zh: "结果", ja: "結果", es: "Resultado", pt: "Resultado" },
  run: { en: "Convert", zh: "转换", ja: "変換", es: "Convertir", pt: "Converter" },
  fmtSrt: { en: "SRT (SubRip)", zh: "SRT(SubRip)", ja: "SRT(SubRip)", es: "SRT (SubRip)", pt: "SRT (SubRip)" },
  fmtVtt: { en: "WebVTT", zh: "WebVTT", ja: "WebVTT", es: "WebVTT", pt: "WebVTT" },
  fmtAss: { en: "ASS / SSA (SubStation)", zh: "ASS / SSA(SubStation)", ja: "ASS / SSA(SubStation)", es: "ASS / SSA (SubStation)", pt: "ASS / SSA (SubStation)" },
  errEmpty: {
    en: "Nothing to convert — paste subtitle content first.",
    zh: "没有可转换的内容——请先粘贴字幕。",
    ja: "変換する内容がありません — 字幕を貼り付けてください。",
    es: "Nada que convertir — pega primero el contenido del subtítulo.",
    pt: "Nada para converter — cole primeiro o conteúdo da legenda.",
  },
  errEncoding: {
    en: "The text looks like a decoding artifact (null bytes) — save the file as UTF-8 and paste again.",
    zh: "文本疑似解码异常(含空字节)——请将文件另存为 UTF-8 后重新粘贴。",
    ja: "テキストはデコードの問題( null バイト)の可能性があります — UTF-8 で保存し直して貼り付けてください。",
    es: "El texto parece un artefacto de decodificación (bytes nulos) — guarda el archivo como UTF-8 y pégalo de nuevo.",
    pt: "O texto parece um artefato de decodificação (bytes nulos) — salve o arquivo como UTF-8 e cole novamente.",
  },
  errNoCues: {
    en: "No valid cues found — this does not look like a subtitle file.",
    zh: "未找到有效字幕条目——这看起来不是字幕文件。",
    ja: "有効なキューが見つかりません — 字幕ファイルではないようです。",
    es: "No se encontraron pistas válidas — esto no parece un archivo de subtítulos.",
    pt: "Nenhuma entrada válida encontrada — isso não parece um arquivo de legendas.",
  },
  errBadTimestamp: {
    en: "A timestamp could not be parsed — check the timing lines (format like 00:01:15,123 in SRT).",
    zh: "有时间戳无法解析——请检查时间行(SRT 格式形如 00:01:15,123)。",
    ja: "タイムスタンプを解析できませんでした — タイミング行を確認してください(SRT は 00:01:15,123 形式)。",
    es: "No se pudo analizar una marca de tiempo — revisa las líneas de tiempo (en SRT: 00:01:15,123).",
    pt: "Não foi possível analisar um carimbo de tempo — verifique as linhas de tempo (no SRT: 00:01:15,123).",
  },
  errInverted: {
    en: "A cue ends before (or exactly when) it starts — fix the timing and try again.",
    zh: "有字幕条目的结束时间早于(或等于)开始时间——请修正时间轴后重试。",
    ja: "開始時刻より前(または同時)に終わるキューがあります — タイミングを修正してください。",
    es: "Una pista termina antes (o justo cuando) empieza — corrige los tiempos e inténtalo de nuevo.",
    pt: "Uma entrada termina antes (ou exatamente quando) começa — corrija os tempos e tente novamente.",
  },
  note: {
    en: "Converts SRT and WebVTT in both directions, and ASS/SSA to SRT one-way only. Converting to plain formats strips what they cannot express: WebVTT voice spans and cue settings are dropped, ASS override tags and styles are removed, and no timeline shifting or scaling is performed — this is a format converter, not a subtitle editor. Everything runs locally in your browser; nothing is uploaded.",
    zh: "SRT 与 WebVTT 双向互转;ASS/SSA 仅单向转出为 SRT。转为朴素格式时会剥离其无法表达的内容:WebVTT 的 voice 标签与 cue 设置会被丢弃,ASS 覆盖标签与样式会被移除;不做时间轴平移或缩放——这是格式转换工具,不是字幕编辑器。全部在本机浏览器内完成,不上传任何内容。",
    ja: "SRT と WebVTT は双方向、ASS/SSA は SRT への片方向のみ対応します。単純な形式に変換する際、その形式で表現できないものは取り除かれます。WebVTT の voice タグや cue 設定は削除され、ASS の上書きタグやスタイルは除去されます。タイムラインの移動やスケール変更は行いません。これはフォーマット変換ツールであり、字幕エディタではありません。すべてブラウザ内で処理され、アップロードはありません。",
    es: "Convierte SRT y WebVTT en ambas direcciones, y ASS/SSA a SRT solo en un sentido. Al convertir a formatos planos se elimina lo que no pueden expresar: los spans de voz y los ajustes de cue de WebVTT se descartan, las etiquetas y estilos de ASS se quitan, y no se desplaza ni reescala la línea de tiempo — es un conversor de formatos, no un editor de subtítulos. Todo se ejecuta localmente en tu navegador; nada se sube.",
    pt: "Converte SRT e WebVTT em ambas as direções, e ASS/SSA para SRT apenas num sentido. Ao converter para formatos simples, o que eles não conseguem expressar é removido: os spans de voz e as configurações de cue do WebVTT são descartados, as tags e estilos do ASS são eliminados, e nenhuma mudança ou escala de linha de tempo é feita — isto é um conversor de formatos, não um editor de legendas. Tudo roda localmente no seu navegador; nada é enviado.",
  },
} as const;

function errMsg(code: string, locale: Locale): string {
  switch (code) {
    case "empty":
      return pick(locale, L.errEmpty);
    case "encoding":
      return pick(locale, L.errEncoding);
    case "noCues":
      return pick(locale, L.errNoCues);
    case "badTimestamp":
      return pick(locale, L.errBadTimestamp);
    case "inverted":
      return pick(locale, L.errInverted);
    default:
      return pick(locale, L.errNoCues);
  }
}

export function TextEngineSubtitle() {
  const { locale, t } = useI18n();
  const [source, setSource] = useState<SubtitleFormat>("srt");
  const [target, setTarget] = useState<SubtitleFormat>("vtt");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const changeSource = (v: string) => {
    const fmt = v as SubtitleFormat;
    setSource(fmt);
    setOutput("");
    setErr(null);
    // ASS 只能出 SRT(单向),锁定目标;离开 ASS(此前锁在 SRT)时恢复默认的 SRT↔VTT 配对
    if (fmt === "ass") setTarget("srt");
    else if (source === "ass" && target === "srt") setTarget("vtt");
  };

  const changeTarget = (v: string) => {
    setTarget(v as SubtitleFormat);
    setOutput("");
    setErr(null);
  };

  const doRun = async () => {
    setErr(null);
    setOutput("");
    setBusy(true);
    const r = convertSubtitle(input, source, target);
    setBusy(false);
    if (r.ok) setOutput(r.data);
    else setErr(errMsg(r.code, locale));
  };

  const targetDisabled = source === "ass";

  return (
    <ToolPanel>
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.src)}</span>
            <select
              className="field"
              value={source}
              onChange={(e) => changeSource(e.target.value)}
              aria-label={pick(locale, L.src)}
            >
              <option value="srt">{pick(locale, L.fmtSrt)}</option>
              <option value="vtt">{pick(locale, L.fmtVtt)}</option>
              <option value="ass">{pick(locale, L.fmtAss)}</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.tgt)}</span>
            <select
              className="field"
              value={target}
              onChange={(e) => changeTarget(e.target.value)}
              disabled={targetDisabled}
              aria-label={pick(locale, L.tgt)}
            >
              <option value="srt">{pick(locale, L.fmtSrt)}</option>
              <option value="vtt">{pick(locale, L.fmtVtt)}</option>
            </select>
          </label>
        </div>

        <textarea
          className="field mono"
          rows={10}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.common.input}
          spellCheck={false}
          aria-label={pick(locale, L.input)}
        />

        <button
          type="button"
          onClick={doRun}
          disabled={busy || !input.trim()}
          className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity disabled:opacity-40"
        >
          {busy ? "…" : pick(locale, L.run)}
        </button>

        {err && (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {err}
          </p>
        )}

        {output && (
          <div className="space-y-2">
            <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.output)}</p>
            <textarea className="field mono bg-[var(--color-surface)]" rows={10} value={output} readOnly spellCheck={false} aria-label={output} />
            <div className="flex flex-wrap gap-2.5">
              <CopyButton value={output} />
              <button
                type="button"
                onClick={() => {
                  setInput("");
                  setOutput("");
                  setErr(null);
                }}
                className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
              >
                {t.common.clear}
              </button>
            </div>
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
