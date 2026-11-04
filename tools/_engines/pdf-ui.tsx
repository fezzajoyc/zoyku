"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";
import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { useI18n } from "@/components/i18n-provider";

/* ------------------------------------------------------------------ */
/* pdf.js loader — main-thread "fake worker", no worker URL / CDN.    */
/* Setting globalThis.pdfjsWorker before the first getDocument() call */
/* makes pdf.js skip `new Worker(...)` entirely (verified in 4.10).   */
/* ------------------------------------------------------------------ */

let pdfjsCache: typeof import("pdfjs-dist") | null = null;

export async function loadPdfjs() {
  if (!pdfjsCache) {
    const [pdfjs, worker] = await Promise.all([
      import("pdfjs-dist"),
      import("pdfjs-dist/build/pdf.worker.min.mjs"),
    ]);
    (globalThis as unknown as Record<string, unknown>).pdfjsWorker = worker;
    pdfjsCache = pdfjs;
  }
  return pdfjsCache;
}

export async function loadPdf(bytes: Uint8Array): Promise<PDFDocumentProxy> {
  const pdfjs = await loadPdfjs();
  // pdf.js transfers the buffer, so always hand it a copy.
  return pdfjs.getDocument({ data: bytes.slice(0), isEvalSupported: false }).promise;
}

/** Render one pdf.js page into a fresh canvas at the given scale. */
export async function renderPageToCanvas(page: PDFPageProxy, scale: number): Promise<HTMLCanvasElement> {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unavailable");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas;
}

/** pdf-lib's Uint8Array does not satisfy BlobPart under TS 5.9's lib — cast once, here. */
export function toPdfBlob(bytes: Uint8Array): Blob {
  return new Blob([bytes as unknown as BlobPart], { type: "application/pdf" });
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode failed"))), type, quality),
  );
}

export { downloadBlob, formatBytes } from "@/components/client-ui";

/* ------------------------------------------------------------------ */
/* Inline labels (Record<Locale, string>) and tiny UI atoms.          */
/* ------------------------------------------------------------------ */

export type L = Record<string, string>;
export function tr(labels: L, locale: Locale): string {
  return labels[locale] ?? labels.en;
}

export const SHARED: Record<string, L> = {
  pages: { en: "Pages", zh: "页数", ja: "ページ数", es: "Páginas", pt: "Páginas", fr: "Pages", de: "Seiten", ru: "Страницы", it: "Pagine", tr: "Sayfalar", ko: "페이지 수", ar: "الصفحات", hi: "पेज", id: "Halaman", vi: "Số trang" },
  pageRange: { en: "Pages (e.g. 1-3, 5)", zh: "页码(如 1-3, 5)", ja: "ページ(例: 1-3, 5)", es: "Páginas (p. ej. 1-3, 5)", pt: "Páginas (ex.: 1-3, 5)", fr: "Pages (ex. 1-3, 5)", de: "Seiten (z. B. 1-3, 5)", ru: "Страницы (напр. 1-3, 5)", it: "Pagine (es. 1-3, 5)", tr: "Sayfalar (örn. 1-3, 5)", ko: "페이지 (예: 1-3, 5)", ar: "الصفحات (مثال 1-3، 5)", hi: "पेज (जैसे 1-3, 5)", id: "Halaman (mis. 1-3, 5)", vi: "Các trang (vd. 1-3, 5)" },
  allPages: { en: "All pages", zh: "所有页面", ja: "すべてのページ", es: "Todas las páginas", pt: "Todas as páginas", fr: "Toutes les pages", de: "Alle Seiten", ru: "Все страницы", it: "Tutte le pagine", tr: "Tüm sayfalar", ko: "모든 페이지", ar: "كل الصفحات", hi: "सभी पेज", id: "Semua halaman", vi: "Tất cả các trang" },
  remove: { en: "Remove", zh: "移除", ja: "削除", es: "Quitar", pt: "Remover", fr: "Retirer", de: "Entfernen", ru: "Убрать", it: "Rimuovi", tr: "Kaldır", ko: "제거", ar: "إزالة", hi: "हटाएँ", id: "Hapus", vi: "Gỡ bỏ" },
  moveUp: { en: "Move up", zh: "上移", ja: "上へ", es: "Subir", pt: "Mover para cima", fr: "Monter", de: "Nach oben", ru: "Вверх", it: "Sposta su", tr: "Yukarı taşı", ko: "위로 이동", ar: "نقل لأعلى", hi: "ऊपर ले जाएँ", id: "Naikkan", vi: "Di chuyển lên" },
  moveDown: { en: "Move down", zh: "下移", ja: "下へ", es: "Bajar", pt: "Mover para baixo", fr: "Descendre", de: "Nach unten", ru: "Вниз", it: "Sposta giù", tr: "Aşağı taşı", ko: "아래로 이동", ar: "نقل لأسفل", hi: "नीचे ले जाएँ", id: "Turunkan", vi: "Di chuyển xuống" },
  downloadAll: { en: "Download all (.zip)", zh: "打包下载(.zip)", ja: "すべてダウンロード(.zip)", es: "Descargar todo (.zip)", pt: "Baixar tudo (.zip)", fr: "Tout télécharger (.zip)", de: "Alles herunterladen (.zip)", ru: "Скачать всё (.zip)", it: "Scarica tutto (.zip)", tr: "Tümünü indir (.zip)", ko: "모두 다운로드(.zip)", ar: "تنزيل الكل (.zip)", hi: "सब डाउनलोड करें (.zip)", id: "Unduh semua (.zip)", vi: "Tải tất cả (.zip)" },
  result: { en: "Result", zh: "结果", ja: "結果", es: "Resultado", pt: "Resultado", fr: "Résultat", de: "Ergebnis", ru: "Результат", it: "Risultato", tr: "Sonuç", ko: "결과", ar: "النتيجة", hi: "परिणाम", id: "Hasil", vi: "Kết quả" },
  addMore: { en: "Add more files", zh: "继续添加文件", ja: "ファイルを追加", es: "Añadir más archivos", pt: "Adicionar mais arquivos", fr: "Ajouter d'autres fichiers", de: "Weitere Dateien hinzufügen", ru: "Добавить ещё файлы", it: "Aggiungi altri file", tr: "Başka dosya ekle", ko: "파일 추가", ar: "إضافة ملفات أخرى", hi: "और फ़ाइलें जोड़ें", id: "Tambah berkas lain", vi: "Thêm tệp khác" },
  needFile: { en: "Choose a PDF file first.", zh: "请先选择 PDF 文件。", ja: "先に PDF ファイルを選択してください。", es: "Primero elige un archivo PDF.", pt: "Escolha um arquivo PDF primeiro.", fr: "Choisissez d'abord un fichier PDF.", de: "Wählen Sie zuerst eine PDF-Datei.", ru: "Сначала выберите файл PDF.", it: "Scegli prima un file PDF.", tr: "Önce bir PDF dosyası seçin.", ko: "먼저 PDF 파일을 선택하세요.", ar: "اختر ملف PDF أولاً.", hi: "पहले एक PDF फ़ाइल चुनें।", id: "Pilih berkas PDF terlebih dahulu.", vi: "Hãy chọn tệp PDF trước." },
  badRange: { en: "Invalid page list.", zh: "页码格式不正确。", ja: "ページ指定が正しくありません。", es: "Lista de páginas no válida.", pt: "Lista de páginas inválida.", fr: "Liste de pages non valide.", de: "Ungültige Seitenliste.", ru: "Неверный список страниц.", it: "Elenco di pagine non valido.", tr: "Sayfa listesi geçersiz.", ko: "페이지 목록이 올바르지 않습니다.", ar: "قائمة صفحات غير صالحة.", hi: "पेज सूची अमान्य है।", id: "Daftar halaman tidak valid.", vi: "Danh sách trang không hợp lệ." },
  failed: { en: "Could not process this file. Is it a valid PDF?", zh: "无法处理该文件,请确认它是有效的 PDF。", ja: "このファイルを処理できませんでした。有効な PDF か確認してください。", es: "No se pudo procesar el archivo. ¿Es un PDF válido?", pt: "Não foi possível processar o arquivo. É um PDF válido?", fr: "Impossible de traiter ce fichier. Est-ce un PDF valide ?", de: "Datei konnte nicht verarbeitet werden. Ist es eine gültige PDF?", ru: "Не удалось обработать файл. Это корректный PDF?", it: "Impossibile elaborare questo file. È un PDF valido?", tr: "Bu dosya işlenemedi. Geçerli bir PDF mi?", ko: "이 파일을 처리할 수 없습니다. 올바른 PDF인가요?", ar: "تعذّرت معالجة هذا الملف. هل هو ملف PDF صالح؟", hi: "यह फ़ाइल प्रोसेस नहीं हो सकी। क्या यह मान्य PDF है?", id: "Berkas ini tidak dapat diproses. Apakah PDF valid?", vi: "Không thể xử lý tệp này. Đây có phải PDF hợp lệ không?" },
  rasterizeNote: { en: "Compression re-renders pages as images at your chosen DPI — text will no longer be selectable or searchable.", zh: "压缩会把每页按所选 DPI 重新渲染为图片,文字将无法选中或搜索。", ja: "圧縮は各ページを指定 DPI の画像として再描画するため、文字の選択・検索はできなくなります。", es: "La compresión vuelve a renderizar las páginas como imágenes al DPI elegido: el texto ya no se podrá seleccionar ni buscar.", pt: "A compressão renderiza as páginas como imagens no DPI escolhido — o texto deixará de ser selecionável ou pesquisável.", fr: "La compression re-rend les pages en images au DPI choisi — le texte ne sera plus sélectionnable ni cherchable.", de: "Die Komprimierung rendert die Seiten mit dem gewählten DPI als Bilder neu — Text ist dann nicht mehr auswählbar oder durchsuchbar.", ru: "Сжатие заново рендерит страницы как изображения в выбранном DPI — текст перестанет выделяться и искаться.", it: "La compressione esegue di nuovo il rendering delle pagine come immagini al DPI scelto: il testo non sarà più selezionabile o ricercabile.", tr: "Sıkıştırma, sayfaları seçilen DPI'da yeniden görüntü olarak işler — metin artık seçilemez veya aranamaz.", ko: "압축은 각 페이지를 선택한 DPI의 이미지로 다시 렌더링하므로 텍스트를 선택하거나 검색할 수 없게 됩니다.", ar: "يعيد الضغط عرض الصفحات كصور بالدقة المختارة — لن يمكن تحديد النص أو البحث فيه بعد ذلك.", hi: "कंप्रेशन हर पेज को चुने गए DPI पर इमेज के रूप में फिर से रेंडर करता है — टेक्स्ट अब चुना या खोजा नहीं जा सकेगा।", id: "Kompresi merender ulang setiap halaman sebagai gambar pada DPI pilihan Anda — teks tidak lagi bisa dipilih atau dicari.", vi: "Nén sẽ kết xuất lại các trang thành ảnh ở DPI bạn chọn — văn bản sẽ không thể chọn hay tìm kiếm nữa." },
  textPdfNote: { en: "Works best on text-based PDFs. Scanned documents and complex two-column layouts may lose formatting — use PDF to Text or OCR for those.", zh: "适合文本型 PDF。扫描件和复杂双栏排版可能丢失格式,这类文件请用 PDF 转文本或 OCR 工具。", ja: "テキスト型 PDF に最適です。スキャン文書や複雑な段組レイアウトでは書式が崩れる場合があり、その場合は PDF からテキスト抽出や OCR をご利用ください。", es: "Funciona mejor con PDF de texto. Los documentos escaneados y los diseños complejos pueden perder el formato; usa PDF a texto u OCR para esos casos.", pt: "Funciona melhor com PDFs de texto. Documentos escaneados e layouts complexos podem perder a formatação — use PDF para texto ou OCR nesses casos.", fr: "Fonctionne mieux sur les PDF textuels. Les documents scannés et les mises en page complexes peuvent perdre leur format — utilisez PDF en texte ou OCR.", de: "Funktioniert am besten mit textbasierten PDFs. Gescannte Dokumente und komplexe Layouts können Formatierung verlieren — nutze dafür PDF zu Text oder OCR.", ru: "Лучше всего работает с текстовыми PDF. Сканы и сложные двухколоночные макеты могут потерять форматирование — используйте PDF в текст или OCR.", it: "Funziona meglio con PDF di testo. Scansioni e layout complessi possono perdere la formattazione — usa PDF in testo o OCR.", tr: "Metin tabanlı PDF'lerde en iyi çalışır. Taranan belgeler ve karmaşık iki sütunlu düzenlerde biçim bozulabilir — bunlar için PDF'den metne veya OCR kullanın.", ko: "텍스트 기반 PDF에 가장 적합합니다. 스캔 문서나 복잡한 두 단 레이아웃은 서식이 깨질 수 있습니다 — 이런 경우 PDF→텍스트 또는 OCR을 사용하세요.", ar: "يعمل بأفضل شكل مع PDF النصية. المستندات الممسوحة والتخطيطات المعقدة قد تفقد التنسيق — استخدم PDF إلى نص أو OCR.", hi: "टेक्स्ट-आधारित PDF पर सबसे अच्छा चलता है। स्कैन दस्तावेज़ और जटिल दो-कॉलम लेआउट में फ़ॉर्मैटिंग टूट सकती है — उनके लिए PDF→टेक्स्ट या OCR इस्तेमाल करें।", id: "Paling baik untuk PDF berbasis teks. Dokumen hasil pindai dan tata letak kompleks bisa kehilangan format — gunakan PDF ke Teks atau OCR.", vi: "Hoạt động tốt nhất với PDF dạng văn bản. Tài liệu quét và bố cục hai cột phức tạp có thể mất định dạng — hãy dùng PDF sang văn bản hoặc OCR." },

  encrypted: { en: "This PDF is password-protected and cannot be processed here.", zh: "该 PDF 有密码保护,无法在此处理。", ja: "この PDF はパスワードで保護されているため処理できません。", es: "Este PDF está protegido con contraseña y no se puede procesar aquí.", pt: "Este PDF é protegido por senha e não pode ser processado aqui.", fr: "Ce PDF est protégé par mot de passe et ne peut pas être traité ici.", de: "Dieses PDF ist passwortgeschützt und kann hier nicht verarbeitet werden.", ru: "Этот PDF защищён паролем и не может быть обработан здесь.", it: "Questo PDF è protetto da password e non può essere elaborato qui.", tr: "Bu PDF parola korumalı ve burada işlenemez.", ko: "이 PDF는 비밀번호로 보호되어 있어 여기서 처리할 수 없습니다.", ar: "هذا الملف محمي بكلمة مرور ولا يمكن معالجته هنا.", hi: "यह PDF पासवर्ड-संरक्षित है और यहाँ प्रोसेस नहीं हो सकता।", id: "PDF ini dilindungi kata sandi dan tidak dapat diproses di sini.", vi: "PDF này được bảo vệ bằng mật khẩu và không thể xử lý tại đây." },
  outName: { en: "Output", zh: "输出文件", ja: "出力", es: "Salida", pt: "Saída", fr: "Fichier de sortie", de: "Ausgabedatei", ru: "Выходной файл", it: "Output", tr: "Çıktı", ko: "출력 파일", ar: "ملف الإخراج", hi: "आउटपुट फ़ाइल", id: "Berkas keluaran", vi: "Tệp đầu ra" },
  done: { en: "Done", zh: "完成", ja: "完了", es: "Listo", pt: "Pronto", fr: "Terminé", de: "Fertig", ru: "Готово", it: "Fatto", tr: "Tamamlandı", ko: "완료", ar: "تم", hi: "पूर्ण", id: "Selesai", vi: "Hoàn tất" },
};

export function Err({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-3 rounded-xl error-bg px-3.5 py-2.5 text-[13.5px] leading-5 text-[var(--color-bad)]">
      {msg}
    </p>
  );
}

export function Primary({
  onClick, disabled, children,
}: { onClick: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export function Ghost({
  onClick, children, className = "",
}: { onClick: () => void; children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)] ${className}`}
    >
      {children}
    </button>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-wide text-[var(--color-sub)]">{children}</span>;
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface)]" role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-[var(--color-accent)] transition-[width]" style={{ width: `${Math.round(value * 100)}%` }} />
    </div>
  );
}

/** One chosen file with optional reorder/remove controls. */
export function FileRow({
  name, size, first, last, onUp, onDown, onRemove, controls = true,
}: {
  name: string; size?: string; first?: boolean; last?: boolean;
  onUp?: () => void; onDown?: () => void; onRemove?: () => void; controls?: boolean;
}) {
  const { locale } = useI18n();
  return (
    <li className="flex items-center gap-2.5 rounded-xl border hairline px-3.5 py-2.5">
      <span className="min-w-0 flex-1 truncate text-[14px]">{name}</span>
      {size && <span className="mono flex-none text-[12.5px] text-[var(--color-sub)]">{size}</span>}
      {controls && (
        <span className="flex flex-none items-center gap-1">
          {onUp && !first && (
            <button type="button" aria-label={tr(SHARED.moveUp, locale)} onClick={onUp}
              className="h-7 w-7 rounded-full text-[13px] text-[var(--color-sub)] hover:bg-[var(--color-surface)]"><span aria-hidden="true">↑</span></button>
          )}
          {onDown && !last && (
            <button type="button" aria-label={tr(SHARED.moveDown, locale)} onClick={onDown}
              className="h-7 w-7 rounded-full text-[13px] text-[var(--color-sub)] hover:bg-[var(--color-surface)]"><span aria-hidden="true">↓</span></button>
          )}
          {onRemove && (
            <button type="button" aria-label={tr(SHARED.remove, locale)} onClick={onRemove}
              className="h-7 w-7 rounded-full text-[14px] leading-none text-[var(--color-sub)] hover:bg-[var(--color-surface)]"><span aria-hidden="true">×</span></button>
          )}
        </span>
      )}
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Misc helpers                                                        */
/* ------------------------------------------------------------------ */

/** Parse "1,3-5" into sorted unique 1-based page numbers within [1, count]. */
export function parsePageRanges(spec: string, count: number): number[] | null {
  const out = new Set<number>();
  for (const part of spec.split(/[,，、\s]+/).filter(Boolean)) {
    const m = part.match(/^(\d+)(?:\s*[-–~]\s*(\d+))?$/);
    if (!m) return null;
    const a = parseInt(m[1], 10);
    const b = m[2] ? parseInt(m[2], 10) : a;
    if (!Number.isFinite(a) || !Number.isFinite(b) || a < 1 || b < a) return null;
    for (let i = a; i <= Math.min(b, count); i++) out.add(i);
  }
  if (out.size === 0) return null;
  return [...out].sort((x, y) => x - y);
}

export function baseName(name: string): string {
  return name.replace(/\.[^.]+$/, "") || "file";
}

export function toDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL("image/png");
}
