"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { DropZone, downloadBlob, formatBytes } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { buildDocx, imageTypeFromBytes, type InlineImage } from "@/tools/_lib/docx-export";

/**
 * Word 导出引擎:Markdown 风格文本 + 拖入图片 → .docx。
 * 图片通过 {{image:n}} 占位符插入文本流;docx 库动态 import(懒加载铁律 §1.4)。
 */

const L = {
  textLabel: {
    en: "Document text (Markdown-style)", zh: "文档文字(Markdown 风格)", ja: "文書テキスト(Markdown 風)",
    es: "Texto del documento (estilo Markdown)", pt: "Texto do documento (estilo Markdown)",
    fr: "Texte du document (style Markdown)", de: "Dokumenttext (Markdown-Stil)",
    ru: "Текст документа (в стиле Markdown)", it: "Testo del documento (stile Markdown)",
    tr: "Belge metni (Markdown biçiminde)", ko: "문서 텍스트(Markdown 스타일)",
    ar: "نص المستند (بأسلوب Markdown)", hi: "दस्तावेज़ का टेक्स्ट (Markdown शैली)",
    id: "Teks dokumen (gaya Markdown)", vi: "Nội dung văn bản (kiểu Markdown)",
  },
  placeholder: {
    en: "# Report\n\n**Bold** and *italic* text, [{{image:1}}] where the first image goes.\n\n- bullet point\n\n1. numbered item",
    zh: "# 报告\n\n**粗体**与*斜体*文字,在要插图的位置写 [{{image:1}}](代表第一张图)。\n\n- 列表项\n\n1. 编号项",
    ja: "# レポート\n\n**太字**と*斜体*。[{{image:1}}] の位置に 1 枚目の画像が入ります。\n\n- 箇条書き\n\n1. 番号付き",
    es: "# Informe\n\nTexto en **negrita** y *cursiva*; [{{image:1}}] marca la primera imagen.\n\n- Viñeta\n\n1. Elemento numerado",
    pt: "# Relatório\n\nTexto em **negrito** e *itálico*; [{{image:1}}] marca a primeira imagem.\n\n- Marcador\n\n1. Item numerado",
    fr: "# Rapport\n\nTexte en **gras** et *italique* ; [{{image:1}}] marque la première image.\n\n- Puce\n\n1. Élément numéroté",
    de: "# Bericht\n\n**Fetter** und *kursiver* Text; [{{image:1}}] markiert das erste Bild.\n\n- Aufzählung\n\n1. Nummerierter Punkt",
    ru: "# Отчёт\n\n**Полужирный** и *курсивный* текст; [{{image:1}}] — место первого изображения.\n\n- Маркер\n\n1. Нумерованный пункт",
    it: "# Report\n\nTesto in **grassetto** e *corsivo*; [{{image:1}}] segna la prima immagine.\n\n- Elenco puntato\n\n1. Elemento numerato",
    tr: "# Rapor\n\n**Kalın** ve *italik* metin; [{{image:1}}] ilk görselin yeridir.\n\n- Madde\n\n1. Numaralı öğe",
    ko: "# 보고서\n\n**굵게**와 *기울임* 텍스트, [{{image:1}}] 위치에 첫 번째 이미지가 들어갑니다.\n\n- 글머리 기호\n\n1. 번호 항목",
    ar: "# تقرير\n\nنص **عريض** و*مائل*؛ [{{image:1}}] تشير إلى موضع الصورة الأولى.\n\n- عنصر نقطي\n\n1. عنصر مرقّم",
    hi: "# रिपोर्ट\n\n**बोल्ड** और *इटैलिक* टेक्स्ट; [{{image:1}}] पहली छवि का स्थान है।\n\n- बुलेट\n\n1. क्रमांकित आइटम",
    id: "# Laporan\n\nTeks **tebal** dan *miring*; [{{image:1}}] menandai gambar pertama.\n\n- Butir\n\n1. Item bernomor",
    vi: "# Báo cáo\n\nChữ **in đậm** và *in nghiêng*; [{{image:1}}] là vị trí ảnh đầu tiên.\n\n- Gạch đầu dòng\n\n1. Mục đánh số",
  },
  imagesLabel: {
    en: "Images", zh: "图片", ja: "画像", es: "Imágenes", pt: "Imagens",
    fr: "Images", de: "Bilder", ru: "Изображения", it: "Immagini", tr: "Görseller",
    ko: "이미지", ar: "الصور", hi: "छवियाँ", id: "Gambar", vi: "Ảnh",
  },
  addImages: {
    en: "Drop images (PNG / JPG / GIF / BMP) or paste from clipboard",
    zh: "拖入图片(PNG / JPG / GIF / BMP),也可直接粘贴",
    ja: "画像をドロップ(PNG / JPG / GIF / BMP)、クリップボードからの貼り付けも可",
    es: "Suelta imágenes (PNG / JPG / GIF / BMP) o pega del portapapeles",
    pt: "Solte imagens (PNG / JPG / GIF / BMP) ou cole da área de transferência",
    fr: "Déposez des images (PNG / JPG / GIF / BMP) ou collez depuis le presse-papiers",
    de: "Bilder ablegen (PNG / JPG / GIF / BMP) oder einfügen",
    ru: "Перетащите изображения (PNG / JPG / GIF / BMP) или вставьте из буфера",
    it: "Trascina immagini (PNG / JPG / GIF / BMP) o incolla dagli appunti",
    tr: "Görselleri bırakın (PNG / JPG / GIF / BMP) veya panodan yapıştırın",
    ko: "이미지를 드롭하세요(PNG / JPG / GIF / BMP), 붙여넣기도 가능",
    ar: "أفلت الصور (PNG / JPG / GIF / BMP) أو الصقها من الحافظة",
    hi: "छवियाँ डालें (PNG / JPG / GIF / BMP) या क्लिपबोर्ड से पेस्ट करें",
    id: "Letakkan gambar (PNG / JPG / GIF / BMP) atau tempel dari papan klip",
    vi: "Kéo ảnh vào (PNG / JPG / GIF / BMP) hoặc dán từ clipboard",
  },
  imageN: {
    en: "image {n}", zh: "图片 {n}", ja: "画像 {n}", es: "imagen {n}", pt: "imagem {n}",
    fr: "image {n}", de: "Bild {n}", ru: "изображение {n}", it: "immagine {n}", tr: "görsel {n}",
    ko: "이미지 {n}", ar: "الصورة {n}", hi: "छवि {n}", id: "gambar {n}", vi: "ảnh {n}",
  },
  insertRef: {
    en: "Insert as {{image:1}}", zh: "插入为 {{image:1}}", ja: "{{image:1}} として挿入", es: "Insertar como {{image:1}}",
    pt: "Inserir como {{image:1}}", fr: "Insérer comme {{image:1}}", de: "Einfügen als {{image:1}}",
    ru: "Вставить как {{image:1}}", it: "Inserisci come {{image:1}}", tr: "{{image:1}} olarak ekle",
    ko: "{{image:1}}로 삽입", ar: "إدراج كـ {{image:1}}", hi: "{{image:1}} के रूप में डालें",
    id: "Sisipkan sebagai {{image:1}}", vi: "Chèn dạng {{image:1}}",
  },
  fileName: {
    en: "File name", zh: "文件名", ja: "ファイル名", es: "Nombre del archivo", pt: "Nome do arquivo",
    fr: "Nom du fichier", de: "Dateiname", ru: "Имя файла", it: "Nome del file", tr: "Dosya adı",
    ko: "파일 이름", ar: "اسم الملف", hi: "फ़ाइल का नाम", id: "Nama file", vi: "Tên tệp",
  },
  export: {
    en: "Export .docx", zh: "导出 .docx", ja: ".docx を書き出す", es: "Exportar .docx", pt: "Exportar .docx",
    fr: "Exporter .docx", de: ".docx exportieren", ru: "Экспорт .docx", it: "Esporta .docx", tr: ".docx dışa aktar",
    ko: ".docx 내보내기", ar: "تصدير .docx", hi: ".docx निर्यात करें", id: "Ekspor .docx", vi: "Xuất .docx",
  },
  needText: {
    en: "Add some text or an image first — the document is empty.",
    zh: "先写点文字或加一张图——文档现在是空的。",
    ja: "まずテキストか画像を追加してください——文書が空です。",
    es: "Añade texto o una imagen primero: el documento está vacío.",
    pt: "Adicione texto ou uma imagem primeiro: o documento está vazio.",
    fr: "Ajoutez d'abord du texte ou une image — le document est vide.",
    de: "Zuerst Text oder ein Bild hinzufügen — das Dokument ist leer.",
    ru: "Сначала добавьте текст или изображение — документ пуст.",
    it: "Aggiungi prima testo o un'immagine: il documento è vuoto.",
    tr: "Önce metin veya görsel ekleyin — belge boş.",
    ko: "먼저 텍스트나 이미지를 추가하세요 — 문서가 비어 있습니다.",
    ar: "أضف نصًا أو صورة أولًا — المستند فارغ.",
    hi: "पहले कुछ टेक्स्ट या छवि जोड़ें — दस्तावेज़ खाली है।",
    id: "Tambahkan teks atau gambar dulu — dokumen masih kosong.",
    vi: "Hãy thêm chữ hoặc ảnh trước — tài liệu đang trống.",
  },
  badImage: {
    en: "Unsupported image (only PNG / JPG / GIF / BMP): {name}",
    zh: "不支持的图片格式(仅 PNG / JPG / GIF / BMP):{name}",
    ja: "未対応の画像形式です(PNG / JPG / GIF / BMP のみ):{name}",
    es: "Imagen no compatible (solo PNG / JPG / GIF / BMP): {name}",
    pt: "Imagem não compatível (apenas PNG / JPG / GIF / BMP): {name}",
    fr: "Image non prise en charge (PNG / JPG / GIF / BMP uniquement) : {name}",
    de: "Nicht unterstütztes Bildformat (nur PNG / JPG / GIF / BMP): {name}",
    ru: "Неподдерживаемый формат (только PNG / JPG / GIF / BMP): {name}",
    it: "Immagine non supportata (solo PNG / JPG / GIF / BMP): {name}",
    tr: "Desteklenmeyen görsel (yalnızca PNG / JPG / GIF / BMP): {name}",
    ko: "지원하지 않는 이미지 형식(PNG / JPG / GIF / BMP만): {name}",
    ar: "صيغة صورة غير مدعومة (PNG / JPG / GIF / BMP فقط): {name}",
    hi: "असमर्थित छवि (केवल PNG / JPG / GIF / BMP): {name}",
    id: "Gambar tidak didukung (hanya PNG / JPG / GIF / BMP): {name}",
    vi: "Định dạng ảnh không hỗ trợ (chỉ PNG / JPG / GIF / BMP): {name}",
  },
  ready: {
    en: "Ready to export · {size}", zh: "可以导出 · {size}", ja: "書き出し可能 · {size}", es: "Listo para exportar · {size}",
    pt: "Pronto para exportar · {size}", fr: "Prêt à exporter · {size}", de: "Bereit zum Exportieren · {size}",
    ru: "Готово к экспорту · {size}", it: "Pronto per l'esportazione · {size}", tr: "Dışa aktarıma hazır · {size}",
    ko: "내보내기 준비 완료 · {size}", ar: "جاهز للتصدير · {size}", hi: "निर्यात के लिए तैयार · {size}",
    id: "Siap diekspor · {size}", vi: "Sẵn sàng xuất · {size}",
  },
  cheatTitle: {
    en: "Syntax quick reference", zh: "语法速查", ja: "書式クイックリファレンス", es: "Referencia rápida",
    pt: "Referência rápida", fr: "Aide-mémoire", de: "Kurzreferenz", ru: "Шпаргалка",
    it: "Riferimento rapido", tr: "Hızlı başvuru", ko: "빠른 문법 참조", ar: "مرجع سريع", hi: "त्वरित संदर्भ",
    id: "Referensi cepat", vi: "Tham khảo nhanh",
  },
  cheatBody: {
    en: "# / ## / ### headings · **bold** · *italic* · - bullets · 1. numbered · > quote · ``` code · --- divider · {{image:n}} places image n. Image sizing adapts: width scales to fit the page (max ~470 pt), keeping the aspect ratio.",
    zh: "# / ## / ### 标题 · **粗体** · *斜体* · - 列表 · 1. 编号 · > 引用 · ``` 代码 · --- 分隔线 · {{image:n}} 插入第 n 张图。图片尺寸自适应:宽度按页面缩放(最大约 470 pt),保持纵横比。",
    ja: "# / ## / ### 見出し · **太字** · *斜体* · - 箇条書き · 1. 番号付き · > 引用 · ``` コード · --- 区切り線 · {{image:n}} で n 番目の画像。画像はページ幅に合わせて縮小(最大約 470 pt)、縦横比は維持されます。",
    es: "# / ## / ### títulos · **negrita** · *cursiva* · - viñetas · 1. numerado · > cita · ``` código · --- separador · {{image:n}} coloca la imagen n. Las imágenes se ajustan al ancho de la página (máx. ~470 pt) manteniendo la proporción.",
    pt: "# / ## / ### títulos · **negrito** · *itálico* · - marcadores · 1. numerado · > citação · ``` código · --- divisor · {{image:n}} insere a imagem n. As imagens se ajustam à largura da página (máx. ~470 pt) mantendo a proporção.",
    fr: "# / ## / ### titres · **gras** · *italique* · - puces · 1. numéroté · > citation · ``` code · --- séparateur · {{image:n}} insère l'image n. Les images s'adaptent à la largeur de la page (max ~470 pt) en gardant les proportions.",
    de: "# / ## / ### Überschriften · **fett** · *kursiv* · - Aufzählung · 1. nummeriert · > Zitat · ``` Code · --- Trennlinie · {{image:n}} fügt Bild n ein. Bilder werden an die Seitenbreite angepasst (max. ~470 pt), Seitenverhältnis bleibt.",
    ru: "# / ## / ### заголовки · **полужирный** · *курсив* · - маркеры · 1. нумерованный · > цитата · ``` код · --- разделитель · {{image:n}} вставляет изображение n. Изображения масштабируются под ширину страницы (макс. ~470 pt), пропорции сохраняются.",
    it: "# / ## / ### titoli · **grassetto** · *corsivo* · - elenco · 1. numerato · > citazione · ``` codice · --- separatore · {{image:n}} inserisce l'immagine n. Le immagini si adattano alla larghezza della pagina (max ~470 pt) mantenendo le proporzioni.",
    tr: "# / ## / ### başlıklar · **kalın** · *italik* · - madde · 1. numaralı · > alıntı · ``` kod · --- ayraç · {{image:n}} n. görseli yerleştirir. Görseller sayfa genişliğine uyarlanır (en fazla ~470 pt), en-boy oranı korunur.",
    ko: "# / ## / ### 제목 · **굵게** · *기울임* · - 글머리 · 1. 번호 · > 인용 · ``` 코드 · --- 구분선 · {{image:n}}은 n번째 이미지를 넣습니다. 이미지는 페이지 폭에 맞춰 조정(최대 약 470 pt)되며 비율이 유지됩니다.",
    ar: "# / ## / ### عناوين · **عريض** · *مائل* · - نقطي · 1. مرقّم · > اقتباس · ``` كود · --- فاصل · {{image:n}} تضع الصورة رقم n. تُضبط الصور على عرض الصفحة (بحد أقصى ~470 pt) مع الحفاظ على النسبة.",
    hi: "# / ## / ### शीर्षक · **बोल्ड** · *इटैलिक* · - बुलेट · 1. क्रमांकित · > कोट · ``` कोड · --- विभाजक · {{image:n}} nवीं छवि रखता है। छवियाँ पृष्ठ चौड़ाई के अनुसार अनुकूलित होती हैं (अधिकतम ~470 pt), अनुपात बना रहता है।",
    id: "# / ## / ### judul · **tebal** · *miring* · - butir · 1. bernomor · > kutipan · ``` kode · --- pembatas · {{image:n}} menempatkan gambar ke-n. Gambar disesuaikan dengan lebar halaman (maks ~470 pt), rasio dipertahankan.",
    vi: "# / ## / ### tiêu đề · **đậm** · *nghiêng* · - gạch đầu dòng · 1. đánh số · > trích dẫn · ``` mã · --- đường kẻ · {{image:n}} chèn ảnh thứ n. Ảnh được thu theo chiều rộng trang (tối đa ~470 pt), giữ nguyên tỉ lệ.",
  },
} as const;

function pick(rec: Record<string, string>, locale: string): string {
  return rec[locale] ?? rec.en;
}

function fill(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k: string) => (k in vars ? vars[k] : `{${k}}`));
}

/** A4 内容区宽度上限(磅):8.27in − 2×1in 边距 ≈ 451 pt,留余量 470 */
const MAX_W_PT = 470;

type StagedImage = { file: File; name: string; bytes: Uint8Array; type: "png" | "jpg" | "gif" | "bmp"; w: number; h: number };

export function WordExportEngine() {
  const { locale, t } = useI18n();
  const [text, setText] = useState("");
  const [images, setImages] = useState<StagedImage[]>([]);
  const [fileName, setFileName] = useState("document");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const urlsRef = useRef<string[]>([]);

  useEffect(() => () => { for (const u of urlsRef.current) URL.revokeObjectURL(u); }, []);

  const addFiles = useCallback(async (files: File[]) => {
    setErr("");
    for (const f of files) {
      const bytes = new Uint8Array(await f.arrayBuffer());
      const type = imageTypeFromBytes(bytes);
      if (!type) { setErr(fill(pick(L.badImage, locale), { name: f.name })); continue; }
      // 读原始尺寸(decoding PNG/JPEG/GIF/BMP 头)
      const dim = await imageSize(bytes, type);
      const url = URL.createObjectURL(new Blob([bytes]));
      urlsRef.current.push(url);
      setImages((prev) => [...prev, { file: f, name: f.name, bytes, type, w: dim.w, h: dim.h, url } as unknown as StagedImage]);
    }
  }, [locale]);

  // 全局粘贴图片直接进队列(DropZone 自带 paste,这里对无 DropZone 场景兜底)
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const files = Array.from(e.clipboardData?.files ?? []);
      if (files.length) { e.preventDefault(); void addFiles(files); }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [addFiles]);

  const reset = () => { setText(""); setImages([]); setErr(""); setDone(false); };

  const exportDocx = async () => {
    if (!text.trim() && images.length === 0) { setErr(pick(L.needText, locale)); return; }
    setBusy(true); setErr("");
    try {
      const docxModule = await import("docx");
      void docxModule; // 懒加载预热;构建本身走 buildDocx 内部的静态 import
      const inline: InlineImage[] = images.map((im) => ({
        data: im.bytes, type: im.type, ...fitSize(im.w, im.h),
      }));
      const buf = await buildDocx(text, inline, fileName || "document");
      downloadBlob(new Blob([new Uint8Array(buf)]), `${fileName || "document"}.docx`);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const canExport = text.trim() !== "" || images.length > 0;

  return (
    <ToolPanel>
      <div className="space-y-5">
        <div>
          <label className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(L.fileName, locale)}</label>
          <div className="flex items-center gap-1.5">
            <input type="text" className="field" value={fileName} onChange={(e) => setFileName(e.target.value)} spellCheck={false} aria-label={pick(L.fileName, locale)} />
            <span className="text-[13px] text-[var(--color-sub)]">.docx</span>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(L.textLabel, locale)}</label>
          <textarea
            className="field mono"
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={pick(L.placeholder, locale)}
            spellCheck={false}
            aria-label={pick(L.textLabel, locale)}
          />
          <p className="mt-1.5 rounded-xl bg-[var(--color-surface)] px-3.5 py-2.5 text-[12.5px] leading-5 text-[var(--color-sub)]">
            <span className="font-medium">{pick(L.cheatTitle, locale)}</span> — {pick(L.cheatBody, locale)}
          </p>
        </div>

        <div>
          <label className="mb-1 block text-[13px] font-medium text-[var(--color-sub)]">{pick(L.imagesLabel, locale)}{images.length > 0 ? ` · ${images.length}` : ""}</label>
          <DropZone accept="image/png,image/jpeg,image/gif,image/bmp" multiple onFiles={(fs) => void addFiles(fs)}>
            {pick(L.addImages, locale)}
          </DropZone>
          {images.length > 0 && (
            <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {images.map((im, i) => (
                <li key={`${im.name}-${i}`} className="overflow-hidden rounded-xl border hairline">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={(im as unknown as { url: string }).url} alt={fill(pick(L.imageN, locale), { n: String(i + 1) })} className="block max-h-32 w-full bg-white object-contain" />
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <p className="truncate text-[11.5px] text-[var(--color-sub)]" title={im.name}>
                      {fill(pick(L.imageN, locale), { n: String(i + 1) })} · {im.w}×{im.h}
                    </p>
                    <span className="flex shrink-0 gap-1">
                      <button type="button" title={pick(L.insertRef, locale).replace("{{image:1}}", `{{image:${i + 1}}}`)}
                        onClick={() => setText((prev) => `${prev}${prev && !prev.endsWith("\n") ? "\n" : ""}{{image:${i + 1}}}`)}
                        className="rounded-full border hairline px-2 py-0.5 text-[11px] font-medium hover:bg-[var(--color-surface)]">
                        ↩ {i + 1}
                      </button>
                      <button type="button" onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                        aria-label="×"
                        className="rounded-full border hairline px-2 py-0.5 text-[11px] font-medium hover:bg-[var(--color-surface)]">×</button>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {err && <p className="error-bg rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-[var(--color-bad)]">{err}</p>}

        <div className="flex flex-wrap items-center gap-2.5">
          <button type="button" onClick={exportDocx} disabled={busy || !canExport}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-2 text-[13.5px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 dark:bg-white dark:text-[#1d1d1f]">
            {done ? "✓" : busy ? "…" : ""}{pick(L.export, locale)}
          </button>
          {canExport && !busy && (
            <button type="button" onClick={reset}
              className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]">
              {t.common.reset}
            </button>
          )}
          {canExport && !busy && !err && (
            <span className="text-[12.5px] text-[var(--color-sub)]">
              {fill(pick(L.ready, locale), { size: formatBytes(estimateSize(text, images)) })}
            </span>
          )}
        </div>
      </div>
    </ToolPanel>
  );
}

/** 图片按页宽等比缩放:pt = px × 0.75(96 DPI 假设) */
function fitSize(pxW: number, pxH: number): { width: number; height: number } {
  let w = Math.max(8, pxW * 0.75);
  let h = Math.max(8, pxH * 0.75);
  if (w > MAX_W_PT) { h = h * (MAX_W_PT / w); w = MAX_W_PT; }
  return { width: Math.round(w), height: Math.round(h) };
}

/** 粗估产物大小:docx 压缩图片原字节 + 文本膨胀系数 ~1.3(实测经验值) */
function estimateSize(text: string, images: StagedImage[]): number {
  const imgBytes = images.reduce((s, im) => s + im.bytes.length, 0);
  return Math.round(imgBytes + text.length * 1.3 + 8000);
}

/** PNG/JPEG/GIF/BMP 头部尺寸解析(不依赖 Image 元素,SSR/Node 亦可测) */
export async function imageSize(bytes: Uint8Array, type: "png" | "jpg" | "gif" | "bmp"): Promise<{ w: number; h: number }> {
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (type === "png") return { w: dv.getUint32(16), h: dv.getUint32(20) };
  if (type === "gif") return { w: dv.getUint16(6, true), h: dv.getUint16(8, true) };
  if (type === "bmp") return { w: dv.getInt32(18, true), h: Math.abs(dv.getInt32(22, true)) };
  // JPEG:扫 SOF0/2 段
  let i = 2;
  while (i + 9 < bytes.length) {
    if (bytes[i] !== 0xff) { i++; continue; }
    const marker = bytes[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { w: dv.getUint16(i + 7), h: dv.getUint16(i + 5) };
    }
    i += 2 + dv.getUint16(i + 2);
  }
  return { w: 400, h: 300 };
}
