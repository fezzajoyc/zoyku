"use client";

import { useMemo, useRef, useState } from "react";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { pick } from "./calc-ui";
import { useI18n } from "@/components/i18n-provider";
import type { Locale } from "@/lib/site";
import {
  MAX_BYTES,
  decodeWith,
  detectEncoding,
  humanBytes,
  type DetectConfidence,
  type DetectResult,
} from "../_lib/encoding-detect";

/**
 * CN-038:文件编码探测引擎。
 * 输入:文件上传 / 十六进制粘贴。输出:首选编码 + 置信度 + 全部候选(含分数与证据)+ 解码文本。
 * 用户可手动改选任一候选,实时重解(此时损坏字节显示 U+FFFD 并计数)。
 */

const L = {
  drop: {
    en: "Drop a file here or click to choose",
    zh: "拖入文件或点击选择",
    ja: "ファイルをここにドロップ、またはクリックして選択",
    es: "Suelte un archivo aquí o haga clic para elegir",
    pt: "Solte um arquivo aqui ou clique para escolher",
  },
  hexIn: {
    en: "…or paste raw bytes as hex",
    zh: "……或粘贴十六进制字节",
    ja: "…または生バイトを 16 進で貼り付け",
    es: "…o pegue bytes en hexadecimal",
    pt: "…ou cole bytes em hexadecimal",
  },
  analyze: { en: "Detect encoding", zh: "探测编码", ja: "エンコーディングを判定", es: "Detectar codificación", pt: "Detectar codificação" },
  clear: { en: "Clear", zh: "清空", ja: "クリア", es: "Limpiar", pt: "Limpar" },
  result: { en: "Detected encoding", zh: "探测结果", ja: "判定結果", es: "Codificación detectada", pt: "Codificação detectada" },
  confidence: { en: "Confidence", zh: "置信度", ja: "信頼度", es: "Confianza", pt: "Confiança" },
  confidenceBom: { en: "Certain (BOM)", zh: "确定(BOM)", ja: "確実(BOM)", es: "Cierta (BOM)", pt: "Certa (BOM)" },
  confidenceHigh: { en: "High", zh: "高", ja: "高", es: "Alta", pt: "Alta" },
  confidenceMedium: { en: "Medium", zh: "中", ja: "中", es: "Media", pt: "Média" },
  confidenceLow: { en: "Low", zh: "低", ja: "低", es: "Baja", pt: "Baixa" },
  fileSize: { en: "{n} · {count} bytes", zh: "{n} · {count} 字节", ja: "{n} · {count} バイト", es: "{n} · {count} bytes", pt: "{n} · {count} bytes" },
  candidates: { en: "All candidates that decode these bytes strictly", zh: "全部可严格解码的候选", ja: "厳密にデコードできたすべての候補", es: "Todos los candidatos que decodifican estos bytes estrictamente", pt: "Todos os candidatos que decodificam estes bytes estritamente" },
  use: { en: "Use", zh: "采用", ja: "これを使う", es: "Usar", pt: "Usar" },
  decoded: { en: "Decoded text", zh: "解码文本", ja: "デコード結果", es: "Texto decodificado", pt: "Texto decodificado" },
  replacements: {
    en: "{n} byte(s) could not be decoded and show as �",
    zh: "{n} 个字节无法解码,显示为 �",
    ja: "{n} バイトがデコードできず � として表示",
    es: "{n} byte(s) no se pudieron decodificar y se muestran como �",
    pt: "{n} byte(s) não puderam ser decodificados e aparecem como �",
  },
  evidence: { en: "Evidence", zh: "判断依据", ja: "根拠", es: "Evidencia", pt: "Evidência" },
  errEmpty: { en: "Provide a file or hex bytes first.", zh: "请先提供文件或十六进制字节。", ja: "まずファイルまたは 16 進バイトを指定してください。", es: "Proporcione primero un archivo o bytes hex.", pt: "Forneça primeiro um arquivo ou bytes hex." },
  errTooLarge: { en: "File is too large ({n}); the limit is 2 MB because detection runs synchronously.", zh: "文件过大({n});检测是同步的,上限 2 MB。", ja: "ファイルが大きすぎます({n})。同期処理のため上限は 2 MB です。", es: "Archivo demasiado grande ({n}); el límite es 2 MB porque la detección es sincrónica.", pt: "Arquivo grande demais ({n}); o limite é 2 MB porque a detecção é sincrônica." },
  errBadHex: { en: "That is not valid hex — use pairs of digits like 48 65 6c 6c 6f.", zh: "不是合法十六进制——请用成对的数字,如 48 65 6c 6c 6f。", ja: "有効な 16 進ではありません — 48 65 6c 6c 6f のように 2 桁ずつ指定してください。", es: "No es hexadecimal válido: use pares de dígitos como 48 65 6c 6c 6f.", pt: "Não é hexadecimal válido — use pares de dígitos como 48 65 6c 6c 6f." },
  errUndetectable: { en: "No candidate encoding could decode these bytes strictly — the sample may be binary rather than text.", zh: "没有任何候选编码能严格解码这些字节——这可能是二进制而非文本。", ja: "どの候補エンコーディングも厳密にデコードできませんでした — テキストではなくバイナリの可能性があります。", es: "Ningún candidato pudo decodificar estos bytes estrictamente: puede ser binario y no texto.", pt: "Nenhum candidato conseguiu decodificar estes bytes estritamente — pode ser binário e não texto." },
  note: {
    en: "Detection uses the WHATWG Encoding decoders built into your browser. Strict decoding (fatal mode) rejects illegal byte sequences, which eliminates most candidates outright; what survives is then ranked by script-family evidence — kana for Japanese, Hangul syllables for Korean, high-frequency ideographs for Chinese, letter-frequency profiles for Cyrillic and Greek. Everything runs locally: the file never leaves your device. Two honest limits: (1) short or pure-ASCII samples are genuinely ambiguous and are reported as low confidence rather than guessed; (2) GBK and GB18030 are byte-identical for common characters, so both appear as candidates with the same text — pick either and the result is the same.",
    zh: "检测用的是浏览器内置的 WHATWG 编码解码器。严格模式(fatal)会拒绝非法字节序列,直接淘汰大部分候选;存活下来的再按文字系统证据排序——日文看假名、韩文看韩文音节、中文看高频字比例、西里尔与希腊看字母频率轮廓。全部在本机完成,文件不离开设备。两个诚实的边界:(1) 过短或纯 ASCII 的样本本质上无法区分,会如实标为低置信度而不是硬猜;(2) GBK 与 GB18030 对常用字字节完全相同,两者会以同一文本同时出现在候选里,选哪个结果都一样。",
    ja: "判定にはブラウザ内蔵の WHATWG エンコーディング デコーダを使います。厳密モード(fatal)は不正なバイト列を拒否するため、多くの候補がその時点で除外されます。残った候補は文字体系の根拠で順位付けします — 日本語は仮名、韓国語はハングル音節、中国語は高頻度漢字の比率、キリル文字とギリシャ文字は文字頻度プロファイルです。すべてローカルで完結し、ファイルは端末の外に出ません。正直な限界は 2 つ:(1) 短いサンプルや純 ASCII は本質的に判別不能で、当て推量ではなく低信頼度として報告します。(2) GBK と GB18030 は常用字ではバイトが同一なので、同じテキストで両方が候補に並びます。どちらを選んでも結果は同じです。",
    es: "La detección usa los decodificadores WHATWG integrados en su navegador. La decodificación estricta (modo fatal) rechaza secuencias de bytes ilegales, lo que elimina de entrada a la mayoría de los candidatos; los supervivientes se ordenan por evidencia de sistema de escritura: kana para japonés, sílabas Hangul para coreano, ideogramas de alta frecuencia para chino, perfiles de frecuencia de letras para cirílico y griego. Todo se ejecuta localmente: el archivo nunca sale del dispositivo. Dos límites honestos: (1) las muestras cortas o puramente ASCII son genuinamente ambiguas y se informan con confianza baja en lugar de adivinar; (2) GBK y GB18030 son idénticos byte a byte para los caracteres comunes, así que ambos aparecen como candidatos con el mismo texto: elija el que elija, el resultado es igual.",
    pt: "A detecção usa os decodificadores WHATWG integrados no seu navegador. A decodificação estrita (modo fatal) rejeita sequências de bytes ilegais, o que elimina de imediato a maioria dos candidatos; os sobreviventes são ordenados por evidência de sistema de escrita — kana para japonês, sílabas Hangul para coreano, ideogramas de alta frequência para chinês, perfis de frequência de letras para cirílico e grego. Tudo roda localmente: o arquivo nunca sai do dispositivo. Dois limites honestos: (1) amostras curtas ou puramente ASCII são genuinamente ambíguas e são informadas com confiança baixa em vez de adivinhadas; (2) GBK e GB18030 são byte a byte idênticos para caracteres comuns, então ambos aparecem como candidatos com o mesmo texto — escolha qualquer um, o resultado é o mesmo.",
  },
} as const;

function confLabel(c: DetectConfidence, locale: Locale): string {
  switch (c) {
    case "bom":
      return pick(locale, L.confidenceBom);
    case "high":
      return pick(locale, L.confidenceHigh);
    case "medium":
      return pick(locale, L.confidenceMedium);
    default:
      return pick(locale, L.confidenceLow);
  }
}

/** 十六进制字符串 → 字节(允许空格/换行/冒号分隔;奇数长度或非法字符返回 null)。 */
function hexToBytes(raw: string): Uint8Array | null {
  const cleaned = raw.replace(/[\s:]/g, "").toLowerCase();
  if (cleaned === "") return null;
  if (cleaned.length % 2 !== 0) return null;
  if (!/^[0-9a-f]+$/.test(cleaned)) return null;
  const out = new Uint8Array(cleaned.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(cleaned.slice(i * 2, i * 2 + 2), 16);
  return out;
}

const CONF_STYLE: Record<string, string> = {
  bom: "bg-[var(--color-good,#0a7d33)] text-white",
  high: "bg-[var(--color-good,#0a7d33)] text-white",
  medium: "bg-[var(--color-warn,#a16207)] text-white",
  low: "bg-[var(--color-sub)] text-white",
};

export function UtilEngineEncodingDetect() {
  const { locale } = useI18n();
  const [bytes, setBytes] = useState<Uint8Array | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [hexInput, setHexInput] = useState("");
  const [result, setResult] = useState<DetectResult | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [chosen, setChosen] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const readFile = async (file: File) => {
    setErr(null);
    setResult(null);
    setChosen(null);
    if (file.size > MAX_BYTES) {
      setErr(pick(locale, L.errTooLarge).replace("{n}", humanBytes(file.size)));
      return;
    }
    const buf = new Uint8Array(await file.arrayBuffer());
    setBytes(buf);
    setFileName(file.name);
    setHexInput("");
  };

  const analyze = (src: Uint8Array | null) => {
    setErr(null);
    if (!src || src.length === 0) {
      setErr(pick(locale, L.errEmpty));
      return;
    }
    const r = detectEncoding(src);
    if (!r.ok) {
      setResult(null);
      if (r.code === "tooLarge") setErr(pick(locale, L.errTooLarge).replace("{n}", r.message ?? ""));
      else if (r.code === "undetectable") setErr(pick(locale, L.errUndetectable));
      else setErr(pick(locale, L.errEmpty));
      return;
    }
    setResult(r);
    setChosen(r.label);
  };

  const analyzeHex = () => {
    const b = hexToBytes(hexInput);
    if (!b) {
      setErr(pick(locale, L.errBadHex));
      // 清掉上一次结果:否则页面会同时显示「新输入非法」和「旧的检测结果」,易误读
      setResult(null);
      setChosen(null);
      setBytes(null);
      return;
    }
    setBytes(b);
    setFileName(null);
    analyze(b);
  };

  const decoded = useMemo(() => {
    if (!bytes || !chosen) return null;
    return decodeWith(bytes, chosen);
  }, [bytes, chosen]);

  return (
    <ToolPanel>
      <div className="space-y-4">
        {/* 文件区 */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) void readFile(f);
          }}
          className="rounded-xl border border-dashed hairline px-4 py-8 text-center"
        >
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity"
          >
            {pick(locale, L.drop)}
          </button>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void readFile(f);
            }}
            aria-label={pick(locale, L.drop)}
          />
          {fileName && (
            <p className="mt-2 text-[13px] text-[var(--color-sub)]">
              {fileName} · {bytes ? pick(locale, L.fileSize).replace("{n}", humanBytes(bytes.length)).replace("{count}", String(bytes.length)) : ""}
            </p>
          )}
        </div>

        {/* 十六进制区 */}
        <label className="block">
          <span className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, L.hexIn)}</span>
          <textarea
            className="field mono"
            rows={3}
            value={hexInput}
            onChange={(e) => {
              // 关键:一旦手动改 hex 输入,就丢弃此前读入的文件字节,
              // 否则「探测」按钮会继续分析上一份 bytes,新输入形同虚设(实测踩过)。
              setBytes(null);
              setFileName(null);
              setHexInput(e.target.value);
            }}
            placeholder="d6 d0 ce c4 b2 e2 ca d4"
            spellCheck={false}
            aria-label={pick(locale, L.hexIn)}
          />
        </label>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => (bytes ? analyze(bytes) : analyzeHex())}
            className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity"
          >
            {pick(locale, L.analyze)}
          </button>
          <button
            type="button"
            onClick={() => {
              setBytes(null);
              setFileName(null);
              setHexInput("");
              setResult(null);
              setErr(null);
              setChosen(null);
            }}
            className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
          >
            {pick(locale, L.clear)}
          </button>
        </div>

        {err && (
          <p role="alert" className="rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
            {err}
          </p>
        )}

        {result?.ok && (
          <div className="space-y-4">
            <div className="rounded-xl bg-[var(--color-surface)] px-3.5 py-3">
              <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.result)}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="mono text-[16px] font-semibold">{result.name}</span>
                <span className="mono rounded-full px-2 py-0.5 text-[11.5px] font-medium bg-white/20">{result.label}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11.5px] font-medium ${CONF_STYLE[result.confidence] ?? CONF_STYLE.low}`}>
                  {pick(locale, L.confidence)}: {confLabel(result.confidence, locale)}
                </span>
              </div>
              <p className="mt-1.5 text-[12.5px] leading-5 text-[var(--color-sub)]">
                <span className="font-medium">{pick(locale, L.evidence)}: </span>
                {result.reason}
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{pick(locale, L.candidates)}</p>
              <ul className="divide-y divide-[var(--color-line,#e5e5ea)]">
                {result.candidates.map((c) => {
                  const active = c.label === chosen;
                  return (
                    <li key={c.label} className="flex flex-wrap items-center gap-2 py-1.5">
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => setChosen(c.label)}
                        className={`mono rounded-full border px-2.5 py-0.5 text-[12px] font-medium transition-colors ${
                          active
                            ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                            : "hairline hover:bg-[var(--color-surface)]"
                        }`}
                      >
                        {c.label}
                      </button>
                      <span className="min-w-0 flex-1 text-[13px] text-[var(--color-sub)]">{c.name}</span>
                      <span className="mono text-[12px] text-[var(--color-sub)]">{c.score}</span>
                      {!active && (
                        <button
                          type="button"
                          onClick={() => setChosen(c.label)}
                          className="text-[12px] font-medium text-[var(--color-accent,#0071e3)]"
                        >
                          {pick(locale, L.use)}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {decoded && (
              <div className="space-y-2">
                <p className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">
                  {pick(locale, L.decoded)} · <span className="mono">{chosen}</span>
                </p>
                <textarea
                  className="field mono bg-[var(--color-surface)]"
                  rows={10}
                  value={decoded.text.slice(0, 200000)}
                  readOnly
                  spellCheck={false}
                  aria-label={pick(locale, L.decoded)}
                />
                <div className="flex flex-wrap items-center gap-2.5">
                  <CopyButton value={decoded.text} />
                  {decoded.replacements > 0 && (
                    <p className="text-[12.5px] leading-5 text-[var(--color-bad)]">
                      {pick(locale, L.replacements).replace("{n}", String(decoded.replacements))}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">{pick(locale, L.note)}</p>
      </div>
    </ToolPanel>
  );
}
