"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { downloadBlob, formatBytes } from "@/components/client-ui";
import { Icon } from "@/components/icons";
import type { Locale } from "@/lib/site";

/** 所有图像引擎共用的逐文件结果列表:缩略图、前后体积、下载单个 / 全部。 */

export type ImgResult = {
  id: string;
  /** 输出文件名 */
  name: string;
  ok: boolean;
  /** 失败原因:固定键,渲染时按 locale 翻译 */
  err?: "decode" | "encode";
  /** 结果 object URL(预览 + 下载),由生产方负责 revoke */
  url?: string;
  blob?: Blob;
  before: number;
  after?: number;
  w?: number;
  h?: number;
  /** 附加说明(如 WebP 回退 JPEG) */
  note?: string;
};

const ERR: Record<"decode" | "encode", Record<string, string>> = {
  decode: {
    en: "This file could not be read as an image.",
    zh: "无法将该文件读取为图片。",
    ja: "このファイルは画像として読み込めませんでした。",
    es: "No se pudo leer este archivo como imagen.",
    pt: "Não foi possível ler este arquivo como imagem.", fr: "Impossible de lire ce fichier comme image.", de: "Datei konnte nicht als Bild gelesen werden.", ru: "Не удалось прочитать файл как изображение.", it: "Impossibile leggere questo file come immagine.", tr: "Dosya görsel olarak okunamadı.", ko: "이 파일을 이미지로 읽을 수 없습니다.", ar: "تعذّرت قراءة هذا الملف كصورة.", hi: "यह फ़ाइल इमेज के रूप में नहीं पढ़ी जा सकी।", id: "Berkas ini tidak dapat dibaca sebagai gambar.", vi: "Không thể đọc tệp này dưới dạng hình ảnh.",
  },
  encode: {
    en: "The result could not be generated.",
    zh: "生成结果失败。",
    ja: "結果を生成できませんでした。",
    es: "No se pudo generar el resultado.",
    pt: "Não foi possível gerar o resultado.", fr: "Impossible de générer le résultat.", de: "Ergebnis konnte nicht erstellt werden.", ru: "Не удалось создать результат.", it: "Impossibile generare il risultato.", tr: "Sonuç oluşturulamadı.", ko: "결과를 생성하지 못했습니다.", ar: "تعذّر إنشاء النتيجة.", hi: "परिणाम जेनरेट नहीं हो सका।", id: "Hasil tidak dapat dibuat.", vi: "Không thể tạo kết quả.",
  },
};

export function saveResult(r: ImgResult) {
  if (!r.blob) return;
  downloadBlob(r.blob, r.name);
}

export function ResultList({
  rows,
  busy,
  onDownloadAll,
}: {
  rows: ImgResult[];
  busy?: boolean;
  onDownloadAll?: () => void;
}) {
  const { locale, t } = useI18n();
  const [savedName, setSavedName] = useState<string | null>(null);

  const saveOne = (r: ImgResult) => {
    saveResult(r);
    setSavedName(r.name);
    setTimeout(() => setSavedName((cur) => (cur === r.name ? null : cur)), 1400);
  };
  if (rows.length === 0 && !busy) return null;

  const done = rows.filter((r) => r.ok);
  const totalBefore = done.reduce((s, r) => s + r.before, 0);
  const totalAfter = done.reduce((s, r) => s + (r.after ?? 0), 0);
  const savedPct = totalBefore > 0 ? Math.round((1 - totalAfter / totalBefore) * 100) : 0;

  return (
    <div className="mt-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13.5px] font-semibold">
          {done.length > 0 && totalAfter > 0 && totalAfter < totalBefore ? (
            <>
              {done.length} · {formatBytes(totalBefore)} → {formatBytes(totalAfter)}{" "}
              <span className="font-medium text-[var(--color-good)]">(−{savedPct}%)</span>
            </>
          ) : (
            <>{done.length}/{rows.length}</>
          )}
          {busy && <span className="ml-2 font-normal text-[var(--color-sub)]">· {t.common.processing}</span>}
        </p>
        {done.length > 1 && onDownloadAll && (
          <button
            type="button"
            onClick={onDownloadAll}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-3.5 py-1.5 text-[13px] font-medium text-white dark:bg-white dark:text-[#1d1d1f] transition-opacity hover:opacity-85"
          >
            <Icon name="download" size={14} />
            {ERR_SAVE_ALL[locale] ?? ERR_SAVE_ALL.en}
          </button>
        )}
      </div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li
            key={r.id}
            className="flex items-center gap-3 rounded-xl border hairline px-3 py-2.5"
          >
            {r.ok && r.url ? (
              <img
                src={r.url}
                alt=""
                aria-hidden="true"
                className="h-11 w-11 flex-none rounded-lg border hairline bg-[var(--color-surface)] object-cover"
              />
            ) : (
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-[rgba(178,80,0,0.08)] text-[var(--color-bad)]">
                <Icon name="file" size={16} />
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="mono block truncate text-[13.5px] font-medium">{r.name}</span>
              {r.ok ? (
                <span className="mono block truncate text-[12.5px] text-[var(--color-sub)]">
                  {r.w ? `${r.w}×${r.h} · ` : ""}
                  {r.after !== undefined ? (
                    <>
                      {formatBytes(r.before)} → {formatBytes(r.after)}
                      {r.before > 0 && r.after < r.before && (
                        <span className="text-[var(--color-good)]"> (−{Math.round((1 - r.after / r.before) * 100)}%)</span>
                      )}
                    </>
                  ) : (
                    formatBytes(r.before)
                  )}
                  {r.note ? ` · ${r.note}` : ""}
                </span>
              ) : (
                <span className="block text-[12.5px] text-[var(--color-bad)]">
                  {r.err ? ERR[r.err][locale] ?? ERR[r.err].en : ""}
                </span>
              )}
            </span>
            {r.ok && r.blob && (
              <button
                type="button"
                onClick={() => saveOne(r)}
                className="inline-flex flex-none items-center gap-1.5 rounded-full border hairline px-3 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
              >
                <Icon name="download" size={13} />
                {savedName === r.name ? "✓" : ERR_SAVE_ONE[locale] ?? ERR_SAVE_ONE.en}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const ERR_SAVE_ALL: Record<string, string> = {
  en: "Download all",
  zh: "全部下载",
  ja: "すべて保存",
  es: "Descargar todo",
  pt: "Baixar tudo", fr: "Tout télécharger", de: "Alle herunterladen", ru: "Скачать всё", it: "Scarica tutto", tr: "Tümünü indir", ko: "모두 다운로드", ar: "تنزيل الكل", hi: "सब डाउनलोड करें", id: "Unduh semua", vi: "Tải tất cả",
};

const ERR_SAVE_ONE: Record<string, string> = {
  en: "Save",
  zh: "下载",
  ja: "保存",
  es: "Guardar",
  pt: "Salvar", fr: "Enregistrer", de: "Speichern", ru: "Сохранить", it: "Salva", tr: "Kaydet", ko: "저장", ar: "حفظ", hi: "सेव करें", id: "Simpan", vi: "Lưu",
};

/** 批量下载:拉开间隔避免浏览器拦截连续下载。 */
export function downloadAllResults(rows: ImgResult[]) {
  rows.filter((r) => r.ok && r.blob).forEach((r, i) => {
    setTimeout(() => saveResult(r), i * 350);
  });
}
