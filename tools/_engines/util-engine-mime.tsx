"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Note, TextIn, pick } from "./calc-ui";
import { MIME_ENTRIES, searchMime } from "../_lib/mime-types";

export function UtilEngineMime() {
  const { locale } = useI18n();
  const [q, setQ] = useState("");
  const rows = useMemo(() => searchMime(q), [q]);

  const L = {
    search: pick(locale, {
      en: "Filter by extension or MIME prefix…",
      zh: "按扩展名或 MIME 前缀过滤…",
      ja: "拡張子やMIMEの前方一致で絞り込み…",
      es: "Filtrar por extensión o prefijo MIME…",
      pt: "Filtrar por extensão ou prefixo MIME…",
    }),
    ext: pick(locale, { en: "Extension", zh: "扩展名", ja: "拡張子", es: "Extensión", pt: "Extensão" }),
    mime: pick(locale, { en: "MIME type", zh: "MIME 类型", ja: "MIMEタイプ", es: "Tipo MIME", pt: "Tipo MIME" }),
    cat: pick(locale, { en: "Category", zh: "类别", ja: "分類", es: "Categoría", pt: "Categoria" }),
    desc: pick(locale, { en: "Description", zh: "说明", ja: "説明", es: "Descripción", pt: "Descrição" }),
    none: pick(locale, {
      en: "No entries match that filter.",
      zh: "没有匹配的条目。",
      ja: "一致する項目がありません。",
      es: "Ninguna entrada coincide.",
      pt: "Nenhuma entrada corresponde.",
    }),
    note: pick(locale, {
      en: "Click Copy on any row to put the MIME type on your clipboard. Type without a dot — \"pdf\" and \".pdf\" both work.",
      zh: "点击任意行的复制按钮即可把 MIME 类型写入剪贴板。输入不需要点号——\"pdf\" 与 \".pdf\" 都可以。",
      ja: "行のコピーでMIMEタイプをクリップボードへ。ドットは不要で「pdf」「.pdf」どちらも可。",
      es: "Pulse Copiar en cualquier fila para llevar el tipo MIME al portapapeles. Sin punto: valen «pdf» y «.pdf».",
      pt: "Clique em Copiar para levar o tipo MIME à área de transferência. Sem ponto: \"pdf\" e \".pdf\" funcionam.",
    }),
  };

  return (
    <ToolPanel>
      <TextIn value={q} onChange={setQ} aria="mime filter" placeholder={L.search} />
      <p className="mt-2 text-[13px] text-[var(--color-sub)]" aria-live="polite">
        {rows.length} / {MIME_ENTRIES.length}
      </p>
      <div className="mt-3 overflow-hidden rounded-xl border hairline">
        <div className="max-h-[30rem] overflow-y-auto">
          <table className="w-full text-[14px]">
            <thead className="sticky top-0 bg-[var(--color-card)]">
              <tr className="border-b hairline text-[12.5px] uppercase tracking-wide text-[var(--color-sub)]">
                <th scope="col" className="px-3.5 py-2 text-left font-semibold">{L.ext}</th>
                <th scope="col" className="px-3.5 py-2 text-left font-semibold">{L.mime}</th>
                <th scope="col" className="px-3.5 py-2 text-left font-semibold">{L.cat}</th>
                <th scope="col" className="hidden px-3.5 py-2 text-left font-semibold sm:table-cell">{L.desc}</th>
                <th scope="col" className="px-3.5 py-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map((e, i) => (
                <tr key={`${e.ext}-${e.mime}-${i}`} className={i % 2 ? "bg-[var(--color-surface)]" : ""}>
                  <td className="mono px-3.5 py-2 font-medium">.{e.ext}</td>
                  <td className="mono break-all px-3.5 py-2 text-[var(--color-sub)]">{e.mime}</td>
                  <td className="px-3.5 py-2 text-[var(--color-sub)]">{e.category}</td>
                  <td className="hidden px-3.5 py-2 text-[var(--color-sub)] sm:table-cell">{e.desc}</td>
                  <td className="px-3.5 py-2 text-right">
                    <CopyButton value={e.mime} className="!px-2.5 !py-1 text-[12px]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {rows.length === 0 && (
        <p className="mt-3 text-[13.5px] text-[var(--color-bad)]" role="alert">{L.none}</p>
      )}
      <div className="mt-3">
        <Note>{L.note}</Note>
      </div>
    </ToolPanel>
  );
}
