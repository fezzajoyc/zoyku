"use client";

import { useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton, DropZone, downloadBlob } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, Sel, TextIn, pick } from "./calc-ui";
import {
  aoaFromRows,
  detectDelimiter,
  generatedHeader,
  parseCsv,
  rowsFromSheetMatrix,
  rowsToCsv,
  sanitizeSheetName,
  type Delimiter,
} from "../_lib/converters";

/**
 * CSV ⇄ Excel(.xlsx)双向引擎,方向由服务端工具文件以 prop 传入:
 *   csv2xlsx:粘贴 / 拖入 CSV → SheetJS 生成真 .xlsx 下载(数字单元格识别、表头补全、工作表命名)
 *   xlsx2csv:拖入 .xlsx → 选工作表 → 任意分隔符 CSV(引号转义遵循 RFC 4180)
 * SheetJS 只在事件处理器 / 按需 useMemo 中 await import(),不进主包。
 */

type Mode = "csv2xlsx" | "xlsx2csv";
type DelimChoice = "auto" | Delimiter;

const XLSX_MIME = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const PREVIEW_ROWS = 8;
const PREVIEW_COLS = 6;

const SAMPLE = 'name,score,note\n1,"Ada, Countess",9.5\n2,Grace,8\n3,王明,"line\nbreak"';

const L = {
  delimiter: { en: "Delimiter", zh: "分隔符", ja: "区切り文字", es: "Delimitador", pt: "Delimitador" },
  auto: { en: "Auto-detect", zh: "自动检测", ja: "自動判定", es: "Detección auto.", pt: "Detecção automática" },
  tab: { en: "Tab", zh: "制表符", ja: "タブ", es: "Tabulación", pt: "Tabulação" },
  header: {
    en: "First row is a header",
    zh: "第一行是表头",
    ja: "1 行目はヘッダー",
    es: "La primera fila es la cabecera",
    pt: "A primeira linha é o cabeçalho",
  },
  headerField: { en: "Header row", zh: "表头", ja: "ヘッダー行", es: "Cabecera", pt: "Cabeçalho" },
  headerOff: {
    en: "Off — “Column 1…N” will be added",
    zh: "关——会自动补上「Column 1…N」表头",
    ja: "オフ — 「Column 1…N」のヘッダーを追加します",
    es: "No — se añadirá “Columna 1…N”",
    pt: "Não — um cabeçalho “Column 1…N” será adicionado",
  },
  sheetName: { en: "Sheet name", zh: "工作表名称", ja: "シート名", es: "Nombre de la hoja", pt: "Nome da planilha" },
  sheet: { en: "Sheet", zh: "工作表", ja: "シート", es: "Hoja", pt: "Planilha" },
  preview: { en: "Preview", zh: "预览", ja: "プレビュー", es: "Vista previa", pt: "Pré-visualização" },
  rowsCols: { en: "{r} rows × {c} columns", zh: "{r} 行 × {c} 列", ja: "{r} 行 × {c} 列", es: "{r} filas × {c} columnas", pt: "{r} linhas × {c} colunas" },
  downloadXlsx: { en: "Download .xlsx", zh: "下载 .xlsx", ja: ".xlsx をダウンロード", es: "Descargar .xlsx", pt: "Baixar .xlsx" },
  downloadCsv: { en: "Download .csv", zh: "下载 .csv", ja: ".csv をダウンロード", es: "Descargar .csv", pt: "Baixar .csv" },
  pasteFirst: {
    en: "Paste CSV above or drop a .csv file to see the preview.",
    zh: "在上方粘贴 CSV 或拖入 .csv 文件即可看到预览。",
    ja: "上に CSV を貼り付けるか .csv ファイルをドロップするとプレビューが表示されます。",
    es: "Pega el CSV arriba o suelta un archivo .csv para ver la vista previa.",
    pt: "Cole o CSV acima ou solte um arquivo .csv para ver a pré-visualização.",
  },
  dropFirst: {
    en: "Drop an .xlsx, .xlsm or .xls file here to convert its first sheet.",
    zh: "拖入 .xlsx、.xlsm 或 .xls 文件,默认转换第一个工作表。",
    ja: ".xlsx・.xlsm・.xls ファイルをドロップすると最初のシートを変換します。",
    es: "Suelta un archivo .xlsx, .xlsm o .xls para convertir su primera hoja.",
    pt: "Solte um arquivo .xlsx, .xlsm ou .xls para converter a primeira planilha.",
  },
  noRows: {
    en: "No data rows found in this input.",
    zh: "输入中没有找到数据行。",
    ja: "入力にデータ行が見つかりません。",
    es: "No se encontraron filas de datos.",
    pt: "Nenhuma linha de dados encontrada.",
  },
  badFile: {
    en: "Could not read this file as a spreadsheet. Is it a valid .xlsx / .xls?",
    zh: "无法把这个文件读成电子表格,请确认是有效的 .xlsx / .xls。",
    ja: "このファイルをスプレッドシートとして読み込めません。有効な .xlsx / .xls か確認してください。",
    es: "No se pudo leer el archivo como hoja de cálculo. ¿Es un .xlsx / .xls válido?",
    pt: "Não foi possível ler o arquivo como planilha. É um .xlsx / .xls válido?",
  },
  csvNote: {
    en: "Cells that are clean numbers (9.5, -3, 0) become real numeric cells in Excel; IDs like 007 stay text. Quoted fields and line breaks inside cells are preserved.",
    zh: "纯数字单元格(9.5、-3、0)会写成真正的数值,007 这类编号保持文本。带引号字段和单元格内换行都会保留。",
    ja: "素の数値のセル(9.5、-3、0)は Excel で真の数値セルになり、007 のような ID は文字列のままです。引用フィールドやセル内改行も保持されます。",
    es: "Las celdas con números limpios (9.5, -3, 0) se escriben como celdas numéricas reales; los IDs como 007 quedan como texto. Los campos entrecomillados y los saltos de línea se conservan.",
    pt: "Células com números limpos (9.5, -3, 0) viram células numéricas reais no Excel; IDs como 007 permanecem texto. Campos entre aspas e quebras de linha são preservados.",
  },
  csvOutNote: {
    en: "Numbers are exported with their formatted values. The downloaded file starts with a UTF-8 BOM so Excel opens CJK text correctly.",
    zh: "数字按显示格式导出。下载的文件带 UTF-8 BOM,Excel 打开中文等文本不会乱码。",
    ja: "数値は表示形式どおりに出力されます。ダウンロードファイルは UTF-8 BOM 付きで、Excel でも日本語が正しく開けます。",
    es: "Los números se exportan con su valor con formato. El archivo descargado empieza con BOM UTF-8 para que Excel muestre bien el texto.",
    pt: "Os números são exportados com o valor formatado. O arquivo baixado começa com BOM UTF-8 para o Excel abrir o texto corretamente.",
  },
  readFail: {
    en: "Could not read the file. Please try again.",
    zh: "读取文件失败,请重试。",
    ja: "ファイルを読み込めませんでした。もう一度お試しください。",
    es: "No se pudo leer el archivo. Inténtalo de nuevo.",
    pt: "Não foi possível ler o arquivo. Tente novamente.",
  },
};

function baseName(name: string): string {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(0, i) : name;
}

function TruncatedTable({ rows }: { rows: string[][] }) {
  const width = rows.reduce((m, r) => Math.max(m, r.length), 0);
  return (
    <div className="overflow-hidden rounded-xl border hairline">
      <div className="max-h-[18rem] overflow-auto">
        <table className="w-full text-[13px]">
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={i % 2 ? "bg-[var(--color-surface)]" : ""}>
                {Array.from({ length: width }, (_, j) => (
                  <td key={j} className="mono max-w-[14rem] truncate border-b hairline px-3 py-1.5 last:border-b-0">
                    {r[j] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DevEngineSheet({ mode }: { mode: Mode }) {
  const { locale, t } = useI18n();
  const isToXlsx = mode === "csv2xlsx";

  const [input, setInput] = useState("");
  const [delimChoice, setDelimChoice] = useState<DelimChoice>("auto");
  const [outDelim, setOutDelim] = useState<Delimiter>(",");
  const [header, setHeader] = useState(true);
  const [sheetName, setSheetName] = useState("Sheet1");
  const [sourceName, setSourceName] = useState("converted");
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [activeSheet, setActiveSheet] = useState("");
  const [rows, setRows] = useState<string[][]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<File | null>(null);

  // csv2xlsx:解析 + 预览
  const parsed = useMemo(() => {
    if (!isToXlsx || input.trim() === "") return { rows: [], delim: "," as Delimiter };
    const delim = delimChoice === "auto" ? detectDelimiter(input) : delimChoice;
    return { rows: parseCsv(input, delim), delim };
  }, [input, delimChoice, isToXlsx]);

  const aoa = useMemo(() => {
    if (!isToXlsx || parsed.rows.length === 0) return [];
    const width = parsed.rows.reduce((m, r) => Math.max(m, r.length), 0);
    const padded = parsed.rows.map((r) => (r.length < width ? [...r, ...Array<string>(width - r.length).fill("")] : r));
    return header ? aoaFromRows(padded) : aoaFromRows([generatedHeader(width), ...padded]);
  }, [parsed, header, isToXlsx]);

  const csvOut = useMemo(() => (isToXlsx ? "" : rowsToCsv(rows, outDelim)), [rows, outDelim, isToXlsx]);

  const widthOf = (rs: string[][]) => rs.reduce((m, r) => Math.max(m, r.length), 0);

  const readWorkbook = async (file: File) => {
    setBusy(true);
    setErr(null);
    try {
      const XLSX = await import("xlsx");
      const wb = XLSX.read(new Uint8Array(await file.arrayBuffer()), { type: "array" });
      const first = wb.SheetNames[0] ?? "";
      fileRef.current = file;
      setSourceName(baseName(file.name));
      setSheetNames(wb.SheetNames);
      setActiveSheet(first);
      const matrix = first
        ? (XLSX.utils.sheet_to_json(wb.Sheets[first], { header: 1, raw: false, defval: "", blankrows: false }) as unknown[][])
        : [];
      setRows(rowsFromSheetMatrix(matrix));
    } catch {
      setSheetNames([]);
      setRows([]);
      setErr(pick(locale, L.badFile));
    } finally {
      setBusy(false);
    }
  };

  const switchSheet = async (name: string) => {
    setActiveSheet(name);
    if (!name || !fileRef.current) {
      setRows([]);
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      const XLSX = await import("xlsx");
      const wb = XLSX.read(new Uint8Array(await fileRef.current.arrayBuffer()), { type: "array" });
      const matrix = wb.Sheets[name]
        ? (XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, raw: false, defval: "", blankrows: false }) as unknown[][])
        : [];
      setRows(rowsFromSheetMatrix(matrix));
    } catch {
      setRows([]);
      setErr(pick(locale, L.badFile));
    } finally {
      setBusy(false);
    }
  };

  const downloadXlsx = async () => {
    if (aoa.length === 0) return;
    setBusy(true);
    try {
      const XLSX = await import("xlsx");
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(aoa);
      XLSX.utils.book_append_sheet(wb, ws, sanitizeSheetName(sheetName));
      const bytes = XLSX.write(wb, { bookType: "xlsx", type: "array" }) as ArrayBuffer;
      downloadBlob(new Blob([bytes], { type: XLSX_MIME }), `${sourceName || "converted"}.xlsx`);
    } catch {
      setErr(t.common.error);
    } finally {
      setBusy(false);
    }
  };

  const downloadCsv = () => {
    if (rows.length === 0) return;
    // UTF-8 BOM:Excel 双击打开中文 / Emoji 不乱码
    downloadBlob(new Blob(["\uFEFF" + csvOut], { type: "text/csv;charset=utf-8" }), `${sourceName || "converted"}.csv`);
  };

  const previewRows = isToXlsx ? parsed.rows : rows;
  const previewWidth = widthOf(previewRows);
  const hasData = previewRows.length > 0;
  const delimButtons: { id: DelimChoice; label: string }[] = isToXlsx
    ? [
        { id: "auto", label: pick(locale, L.auto) },
        { id: ",", label: '","' },
        { id: ";", label: '";"' },
        { id: "\t", label: pick(locale, L.tab) },
      ]
    : [
        { id: ",", label: '","' },
        { id: ";", label: '";"' },
        { id: "\t", label: pick(locale, L.tab) },
      ];
  const activeDelim: DelimChoice = isToXlsx ? delimChoice : outDelim;

  return (
    <ToolPanel>
      <div className="space-y-4">
        {isToXlsx ? (
          <>
            <DropZone onFiles={(files) => void readWorkbookAsText(files[0], setInput, setSourceName, setErr, locale)} accept=".csv,.tsv,.txt,text/csv" multiple={false} />
            <textarea
              className="field mono"
              rows={8}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.common.input}
              spellCheck={false}
              aria-label={t.common.input}
            />
          </>
        ) : (
          <DropZone onFiles={(files) => void readWorkbook(files[0])} accept=".xlsx,.xlsm,.xls" multiple={false} />
        )}

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-semibold">{pick(locale, L.delimiter)}</span>
          {delimButtons.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => (isToXlsx ? setDelimChoice(d.id) : setOutDelim(d.id as Delimiter))}
              aria-pressed={activeDelim === d.id}
              className={`mono rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                activeDelim === d.id
                  ? "border-transparent bg-[var(--color-ink)] text-white"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={pick(locale, isToXlsx ? L.headerField : L.sheet)}>
            {isToXlsx ? (
              <span className="space-y-1">
                <label className="flex items-center gap-2 text-[14px]">
                  <input
                    type="checkbox"
                    checked={header}
                    onChange={(e) => setHeader(e.target.checked)}
                    className="h-4 w-4 accent-[var(--color-ink)]"
                    aria-label={pick(locale, L.header)}
                  />
                  {pick(locale, L.header)}
                </label>
                {!header && <span className="block text-[12.5px] text-[var(--color-sub)]">{pick(locale, L.headerOff)}</span>}
              </span>
            ) : sheetNames.length > 1 ? (
              <Sel value={activeSheet} onChange={(v) => void switchSheet(v)} aria={pick(locale, L.sheet)}>
                {sheetNames.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </Sel>
            ) : (
              <span className="mono block text-[14px] text-[var(--color-sub)]">{activeSheet || "—"}</span>
            )}
          </Field>
          {isToXlsx && (
            <Field label={pick(locale, L.sheetName)}>
              <TextIn value={sheetName} onChange={setSheetName} aria={pick(locale, L.sheetName)} mono />
            </Field>
          )}
        </div>

        {busy && <p className="text-[13px] text-[var(--color-sub)]">{t.common.processing}</p>}
        {err && (
          <p
            className="mono whitespace-pre-wrap rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]"
            role="alert"
          >
            {err}
          </p>
        )}

        {isToXlsx && input.trim() !== "" && parsed.rows.length === 0 && !err && (
          <p className="text-[13.5px] text-[var(--color-bad)]" role="alert">
            {pick(locale, L.noRows)}
          </p>
        )}

        {isToXlsx && input === "" && (
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setInput(SAMPLE)}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-accent-strong)] transition-colors hover:bg-[rgba(0,113,227,0.06)]"
            >
              {t.common.sample}
            </button>
          </div>
        )}

        {hasData && (
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="text-[15px] font-semibold">{pick(locale, L.preview)}</h3>
              <span className="mono text-[12.5px] text-[var(--color-sub)]">
                {pick(locale, L.rowsCols).replace("{r}", String(previewRows.length)).replace("{c}", String(previewWidth))}
                {previewRows.length > PREVIEW_ROWS || previewWidth > PREVIEW_COLS ? " ·…" : ""}
              </span>
            </div>
            <TruncatedTable
              rows={previewRows.slice(0, PREVIEW_ROWS).map((r) => r.slice(0, PREVIEW_COLS))}
            />
          </div>
        )}

        {isToXlsx && (
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => void downloadXlsx()}
              disabled={aoa.length === 0 || busy}
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white transition-opacity disabled:opacity-40"
            >
              {pick(locale, L.downloadXlsx)}
            </button>
            <button
              type="button"
              onClick={() => {
                setInput("");
                setErr(null);
              }}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
            >
              {t.common.clear}
            </button>
          </div>
        )}

        {!isToXlsx && (
          <div className="space-y-3">
            <textarea
              className="field mono bg-[var(--color-surface)]"
              rows={8}
              value={csvOut}
              readOnly
              placeholder={t.common.output}
              spellCheck={false}
              aria-label={t.common.output}
            />
            <div className="flex flex-wrap gap-2.5">
              <CopyButton value={csvOut} />
              <button
                type="button"
                onClick={downloadCsv}
                disabled={rows.length === 0}
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13.5px] font-medium text-white transition-opacity disabled:opacity-40"
              >
                {pick(locale, L.downloadCsv)}
              </button>
            </div>
          </div>
        )}

        <p className="text-[13px] leading-5 text-[var(--color-sub)]">
          {pick(locale, isToXlsx ? L.csvNote : L.csvOutNote)}
        </p>
        {!hasData && !err && !busy && (
          <p className="text-[13px] leading-5 text-[var(--color-sub)]">
            {pick(locale, isToXlsx ? L.pasteFirst : L.dropFirst)}
          </p>
        )}
      </div>
    </ToolPanel>
  );
}

/** DropZone 回调:读 .csv 文本进输入框(文件名留作下载名)。 */
async function readWorkbookAsText(
  file: File | undefined,
  setInput: (v: string) => void,
  setSourceName: (v: string) => void,
  setErr: (v: string | null) => void,
  locale: Locale,
): Promise<void> {
  if (!file) return;
  setErr(null);
  try {
    const text = await file.text();
    const i = file.name.lastIndexOf(".");
    setSourceName(i > 0 ? file.name.slice(0, i) : file.name);
    setInput(text);
  } catch {
    setErr(pick(locale, L.readFail));
  }
}
