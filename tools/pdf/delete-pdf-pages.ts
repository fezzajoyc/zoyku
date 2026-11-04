import { PdfPagesEngine } from "../_engines/pdf-engine-pages";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "delete-pdf-pages",
  category: "pdf",
  icon: "file",
  engine: { component: PdfPagesEngine, props: { op: "delete" } },
  related: ["split-pdf", "rearrange-pdf-pages", "rotate-pdf", "merge-pdf", "compress-pdf", "pdf-to-ppt", "ocr-pdf", "pdf-to-text", "jpg-to-pdf", "page-numbers-pdf"],
  copy: {
    en: {
      name: "Delete PDF Pages",
      tagline:
        "Remove unwanted pages from a PDF in seconds — type the pages to drop, download the trimmed file, all processed inside your browser.",
      intro: [
        "Blank pages, an old cover, a page with someone else's data — enter them as “1, 3-5” and get a clean PDF with everything else intact. The tool shows your document's page count so you can check the numbers before cutting.",
        "The remaining pages are copied byte-for-byte, so text stays selectable and images keep their quality. Everything happens locally with pdf-lib; the file is never uploaded.",
      
        "Page deletion uses pdf-lib's copyPages to write a new document containing only the pages you keep — the ones you cut are never copied into the output file, so their content is gone rather than hidden. Ranges like '1, 3-5' are parsed after the tool shows the document's real page count, so a mistaken range is caught before you write.",
        "Compared with printing to PDF and skipping pages (which rasterizes everything and destroys text), the kept pages are cloned object-for-object: fonts, vectors and selectable text all survive. And unlike desktop editors, there is no save-as dialog maze — one field, one click, one clean file, with no upload of the source document.",
      ],
      steps: [
        "Drop the PDF you want to trim.",
        "Type the pages to delete, for example “2, 6-8”.",
        "Click Delete pages and download the remaining document.",
      ],
      faqs: [
        {
          q: "Can I delete all pages of a document?",
          a: "No — a PDF needs at least one page. If you enter every page the tool will refuse; delete all but one instead if that is what you need.",
        },
        {
          q: "How do I keep only a few pages?",
          a: "Easier to think in reverse: delete everything you do not need. “2-10, 12” on a 12-page document leaves pages 1 and 11.",
        },
        {
          q: "What happens to the page numbering?",
          a: "Pages close up automatically: after deleting pages 2-4, the former page 5 becomes page 2. Internal links that pointed at deleted pages may stop working.",
        },
      ],
    },
    zh: {
      name: "删除 PDF 页面",
      tagline: "几秒钟删除 PDF 中不需要的页面——输入要删的页码,下载裁剪后的文件,全程在浏览器本地处理。",
      intro: [
        "空白页、旧封面、带他人信息的页面——按“1, 3-5”的格式输入,一键得到干净的 PDF,其余页面原样保留。工具会显示文档总页数,删之前可以核对。",
        "保留的页面按原始字节复制,文字仍可选中、图片不失真。全部处理通过 pdf-lib 在本地完成,文件不会被上传。",
      ],
      steps: [
        "拖入要裁剪的 PDF。",
        "输入要删除的页码,例如“2, 6-8”。",
        "点击“删除页面”,下载剩余内容。",
      ],
      faqs: [
        {
          q: "可以把文档的页面全部删光吗?",
          a: "不可以——PDF 至少要有一页。如果输入了所有页码,工具会拒绝执行;如确有需要,可以保留一页删掉其余。",
        },
        {
          q: "只想保留少数几页怎么办?",
          a: "反过来想更容易:把不要的都删掉。比如 12 页的文档删除“2-10, 12”,就只剩第 1 页和第 11 页。",
        },
        {
          q: "删除后页码怎么算?",
          a: "页面会自动前移:删除第 2–4 页后,原来的第 5 页变成第 2 页。指向被删页面的内部链接可能失效。",
        },
      ],
    },
    ja: {
      name: "PDF ページ削除",
      tagline: "PDF から不要なページを数秒で削除。削除するページを入力して切り詰めたファイルをダウンロード。処理はブラウザ内で完結します。",
      intro: [
        "白紙ページ、古い表紙、他人の情報が載ったページ——「1, 3-5」のように入力すれば、それ以外をそのまま残したきれいな PDF が手に入ります。ツールが総ページ数を表示するので、削除前に確認できます。",
        "残ったページはバイト単位でコピーされるため、テキストは選択可能、画像も劣化しません。処理は pdf-lib によりローカルで行われ、ファイルはアップロードされません。",
      ],
      steps: [
        "削減したい PDF をドロップします。",
        "削除するページを入力します(例:「2, 6-8」)。",
        "「ページを削除」をクリックし、残りの文書をダウンロードします。",
      ],
      faqs: [
        {
          q: "すべてのページを削除できますか?",
          a: "できません。PDF には最低 1 ページ必要です。全ページを指定するとツールは実行を拒否します。必要なら 1 ページだけ残してください。",
        },
        {
          q: "数ページだけ残したい場合は?",
          a: "逆に考えると簡単です。不要なページを削除対象にします。12 ページの文書で「2-10, 12」を指定すると、1 ページ目と 11 ページ目が残ります。",
        },
        {
          q: "削除後のページ番号はどうなりますか?",
          a: "ページは自動的に詰まります。2〜4 ページ目を削除すると、元の 5 ページ目が 2 ページ目になります。削除したページへの内部リンクは機能しないことがあります。",
        },
      ],
    },
    es: {
      name: "Eliminar páginas PDF",
      tagline:
        "Quita las páginas que no quieras de un PDF en segundos: escribe cuáles eliminar, descarga el archivo recortado, todo en tu navegador.",
      intro: [
        "Páginas en blanco, una portada antigua, una hoja con datos ajenos: escríbelas como “1, 3-5” y obtén un PDF limpio con el resto intacto. La herramienta muestra el número de páginas para que lo compruebes antes de cortar.",
        "Las páginas restantes se copian byte a byte: el texto sigue siendo seleccionable y las imágenes no pierden calidad. Todo ocurre en local con pdf-lib; el archivo nunca se sube.",
      ],
      steps: [
        "Suelta el PDF que quieres recortar.",
        "Escribe las páginas a eliminar, por ejemplo “2, 6-8”.",
        "Pulsa Eliminar páginas y descarga el documento restante.",
      ],
      faqs: [
        {
          q: "¿Puedo eliminar todas las páginas?",
          a: "No: un PDF necesita al menos una página. Si indicas todas, la herramienta lo rechazará; si es lo que buscas, deja una y elimina el resto.",
        },
        {
          q: "¿Cómo conservo solo unas pocas páginas?",
          a: "Piénsalo al revés: elimina todo lo que no necesites. “2-10, 12” en un documento de 12 páginas deja las páginas 1 y 11.",
        },
        {
          q: "¿Qué pasa con la numeración?",
          a: "Las páginas se reordenan automáticamente: tras eliminar las páginas 2-4, la antigua página 5 pasa a ser la 2. Los enlaces internos a páginas eliminadas pueden dejar de funcionar.",
        },
      ],
    },
    pt: {
      name: "Excluir páginas de PDF",
      tagline:
        "Remova as páginas indesejadas de um PDF em segundos — digite quais excluir, baixe o arquivo aparado, tudo processado no navegador.",
      intro: [
        "Páginas em branco, uma capa antiga, uma folha com dados de outra pessoa — digite como “1, 3-5” e receba um PDF limpo com o resto intacto. A ferramenta mostra o total de páginas para você conferir antes de cortar.",
        "As páginas restantes são copiadas byte a byte, então o texto continua selecionável e as imagens mantêm a qualidade. Tudo acontece localmente com pdf-lib; o arquivo nunca é enviado.",
      ],
      steps: [
        "Solte o PDF que quer aparar.",
        "Digite as páginas a excluir, por exemplo “2, 6-8”.",
        "Clique em Excluir páginas e baixe o documento restante.",
      ],
      faqs: [
        {
          q: "Posso excluir todas as páginas de um documento?",
          a: "Não — um PDF precisa de pelo menos uma página. Se você indicar todas, a ferramenta recusará; se for isso que precisa, deixe uma e exclua o resto.",
        },
        {
          q: "Como manter apenas algumas páginas?",
          a: "Pense ao contrário: exclua tudo o que não precisa. “2-10, 12” em um documento de 12 páginas deixa as páginas 1 e 11.",
        },
        {
          q: "Como fica a numeração depois?",
          a: "As páginas se fecham automaticamente: após excluir as páginas 2-4, a antiga página 5 vira a página 2. Links internos apontando para páginas excluídas podem parar de funcionar.",
        },
      ],
    },
  },
});
