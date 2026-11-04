"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import {
  SHARED, Err, FileRow, Ghost, Primary, Progress, baseName, toPdfBlob, tr, type L,
} from "./pdf-ui";

type Op = "unlock" | "flatten";
type Out = { name: string; blob: Blob };

const UI: Record<string, L> = {
  unlock: { en: "Remove protection", zh: "移除保护", ja: "保護を解除", es: "Quitar protección", pt: "Remover proteção" },
  flatten: { en: "Flatten form", zh: "扁平化表单", ja: "フォームを平坦化", es: "Aplanar formulario", pt: "Achatar formulário" },
  // Unlock honesty note: pdf-lib can only reopen what is readable with ignoreEncryption.
  unlockNote: {
    en: "This works on PDFs that are readable without entering a password in a normal viewer — files that only carry owner-level restrictions (no printing, no copying) or open-password files your viewer has cached. PDFs that ask for an open password every time cannot be decrypted here, and adding encryption to a PDF is not possible in the browser.",
    zh: "适用于在普通阅读器中无需输入密码即可阅读的 PDF——只带所有者级限制(禁止打印、复制)的文件,或阅读器已记住密码的文件。每次打开都要求输入密码的 PDF 无法在此解密;浏览器中也无法给 PDF 添加加密。",
    ja: "通常のビューアでパスワード入力なしに読める PDF が対象です。閲覧制限(印刷・コピー禁止)のみのファイルや、ビューアがパスワードを記憶しているファイルを処理できます。開くたびにパスワードを求められる PDF はここでは復号できず、ブラウザで PDF に暗号化を追加することもできません。",
    es: "Funciona con PDF que se leen sin escribir contraseña en un visor normal: archivos que solo llevan restricciones de propietario (sin impresión, sin copia) o protegidos con contraseña que tu visor ya recuerda. Los PDF que piden contraseña al abrir no se pueden descifrar aquí, y añadir cifrado a un PDF no es posible en el navegador.",
    pt: "Funciona com PDFs legíveis sem digitar senha num visualizador comum — arquivos que só têm restrições do proprietário (sem impressão, sem cópia) ou protegidos por senha que o visualizador já memorizou. PDFs que pedem senha toda vez que abrem não podem ser decifrados aqui, e adicionar criptografia a um PDF não é possível no navegador.",
  },
  flattenNote: {
    en: "Form fields (checkboxes, text boxes, signatures) are baked into the page as static content. The result looks identical but is no longer an interactive form — the standard last step before submitting a filled PDF.",
    zh: "表单字段(复选框、文本框、签名)会被固化为页面上的静态内容。结果外观完全一致,但不再是可交互表单——这是提交已填写 PDF 前的标准步骤。",
    ja: "フォームフィールド(チェックボックス、テキストボックス、署名)はページに静的コンテンツとして焼き込まれます。見た目は同じですが、対話フォームではなくなります。記入済み PDF を提出する前の定番の手順です。",
    es: "Los campos de formulario (casillas, cuadros de texto, firmas) se graban en la página como contenido estático. El resultado se ve igual pero deja de ser un formulario interactivo: el paso estándar antes de enviar un PDF rellenado.",
    pt: "Os campos de formulário (caixas de seleção, campos de texto, assinaturas) são gravados na página como conteúdo estático. O resultado fica idêntico, mas deixa de ser um formulário interativo — o passo padrão antes de enviar um PDF preenchido.",
  },
  noForms: {
    en: "This PDF has no fillable form fields — nothing to flatten, the original is already final.",
    zh: "该 PDF 没有可填写的表单字段——无需扁平化,原文件已是最终状态。",
    ja: "この PDF には入力可能なフォームフィールドがありません。平坦化の必要はなく、元のファイルはすでに確定しています。",
    es: "Este PDF no tiene campos de formulario rellenables: nada que aplanar, el original ya está finalizado.",
    pt: "Este PDF não tem campos de formulário preenchíveis — nada a achatar, o original já está finalizado.",
  },
};

export function PdfProtectEngine({ op }: { op: Op }) {
  const { t, locale } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState("");
  const [out, setOut] = useState<Out | null>(null);

  const reset = useCallback(() => {
    setFile(null);
    setOut(null);
    setErr("");
    setProgress(0);
  }, []);

  const addFiles = useCallback(
    (list: File[]) => {
      setOut(null);
      setErr("");
      const pdfs = list.filter((f) => /\.pdf$/i.test(f.name) || f.type === "application/pdf");
      if (!pdfs.length) {
        setErr(t.common.error);
        return;
      }
      setFile(pdfs[0]);
    },
    [t.common.error],
  );

  async function run() {
    if (!file) {
      setErr(tr(SHARED.needFile, locale));
      return;
    }
    setBusy(true);
    setErr("");
    setOut(null);
    setProgress(0.05);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      setProgress(0.4);
      const suffix = op === "unlock" ? "-unlocked" : "-flattened";
      if (op === "flatten" && doc.getForm().getFields().length === 0) {
        setErr(tr(UI.noForms, locale));
        return;
      }
      if (op === "flatten") doc.getForm().flatten();
      const saved = await doc.save();
      setProgress(1);
      setOut({ name: `${baseName(file.name)}${suffix}.pdf`, blob: toPdfBlob(saved) });
    } catch (e) {
      console.error("[pdf-protect] run failed:", e);
      setErr(tr(SHARED.failed, locale));
    } finally {
      setBusy(false);
    }
  }

  return (
    <ToolPanel>
      {!file && (
        <DropZone onFiles={addFiles} accept="application/pdf,.pdf">
          <p className="text-[14px] text-[var(--color-sub)]">{t.common.dropFile}</p>
        </DropZone>
      )}
      {file && (
        <div className="space-y-3">
          <ul className="space-y-2">
            <li className="rounded-xl">
              <FileRow name={file.name} size={formatBytes(file.size)} onRemove={reset} />
            </li>
          </ul>

          <p className="rounded-xl bg-[var(--color-surface)] px-3.5 py-3 text-[13.5px] leading-5 text-[var(--color-sub)]">
            {tr(op === "unlock" ? UI.unlockNote : UI.flattenNote, locale)}
          </p>

          {busy && <Progress value={progress} />}
          <Err msg={err} />

          {out && (
            <div className="rounded-2xl border hairline p-4">
              <p className="mb-2 text-[13.5px] font-semibold">{t.common.output}</p>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2.5 text-[14px]">
                  <span className="min-w-0 flex-1 truncate">{out.name}</span>
                  <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{formatBytes(out.blob.size)}</span>
                  <button type="button" onClick={() => downloadBlob(out.blob, out.name)}
                    className="flex-none rounded-full border hairline px-3 py-1 text-[12.5px] font-medium hover:bg-[var(--color-surface)]">
                    {t.common.download}
                  </button>
                </li>
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2.5">
            <Primary onClick={run} disabled={busy}>{tr(op === "unlock" ? UI.unlock : UI.flatten, locale)}</Primary>
            {file && !busy && <Ghost onClick={reset}>{t.common.reset}</Ghost>}
          </div>
        </div>
      )}
    </ToolPanel>
  );
}
