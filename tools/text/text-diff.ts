import { TextDiff } from "../_engines/text-diff";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "text-diff",
  category: "text",
  icon: "search",
  engine: { component: TextDiff },
  related: ["find-and-replace", "sentence-counter", "word-counter", "text-cleaner", "text-sorter", "remove-extra-spaces", "remove-duplicate-lines", "lorem-ipsum-generator", "text-to-binary", "reverse-text"],
  copy: {
    en: {
      name: "Text Diff",
      tagline:
        "Compare two versions of a text word by word, with additions and deletions highlighted — no account, no upload, no size fuss.",
      intro: [
        "Paste the original on the left and the edited version on the right: changed words light up immediately, deletions in one color and additions in another. It is the quickest way to review a contract revision, an editor's rewrite or a colleague's last-minute edits to a paragraph.",
        "The comparison runs entirely in your browser — long contracts, unpublished manuscripts and confidential text never touch a server.",
      ],
      steps: [
        "Paste the original text into the left box.",
        "Paste the modified text into the right box.",
        "Read the merged view below: strikethrough marks removals, green marks additions.",
      ],
      faqs: [
        {
          q: "How are differences displayed?",
          a: "Unchanged text is plain; removed words are struck through in orange and added words are highlighted in green, so a paragraph reads like a tracked change.",
        },
        {
          q: "Is it a character-level or word-level diff?",
          a: "Word-level. Small edits inside a word are shown as one removed word plus one added word, which is easier to scan than a character-level diff.",
        },
        {
          q: "Is there a size limit?",
          a: "Only your browser's memory — book-length comparisons work, though very large texts take a moment to render.",
        },
      ],
    },
    zh: {
      name: "文本对比",
      tagline: "逐词对比两个版本的文本,新增与删除高亮显示——无需账号、不上传、不限用途。",
      intro: [
        "左边贴原文,右边贴修改稿:改动立刻高亮,删除一种颜色、新增另一种颜色。审合同修订、看编辑改稿、查同事临时的段落改动,这是最快的办法。",
        "对比完全在浏览器里进行——长合同、未出版的书稿、机密文本都不会经过任何服务器。",
      ],
      steps: [
        "把原文粘贴到左边的框。",
        "把修改稿粘贴到右边的框。",
        "阅读下方合并视图:删除线标出删减,绿色标出新增。",
      ],
      faqs: [
        {
          q: "差异是怎么展示的?",
          a: "未改动的文本正常显示;被删的词用橙色加删除线,新增的词用绿色高亮,读起来像带修订痕迹的文档。",
        },
        {
          q: "是字符级对比还是词级对比?",
          a: "词级。词内的小改动会显示为一个删除词加一个新增词,比字符级对比更易扫读。",
        },
        {
          q: "有篇幅限制吗?",
          a: "只受浏览器内存限制——整本书的对比也能跑,只是超大文本渲染会稍慢。",
        },
      ],
    },
    ja: {
      name: "テキスト差分",
      tagline: "2 つのテキストを単語単位で比較し、追加と削除をハイライト表示。アカウント登録もアップロードも不要です。",
      intro: [
        "左に原文、右に修正版を貼り付けると、変わった単語が即座に浮かび上がります。削除と追加は色分け表示。契約書の改訂確認、編集者によるリライトのチェック、同僚の直前修正の確認に最短ルートです。",
        "比較はすべてブラウザ内で完結します。長編の契約書、未刊行の原稿、機密文書もサーバーには一切送信されません。",
      ],
      steps: [
        "元のテキストを左の欄に貼り付けます。",
        "修正版を右の欄に貼り付けます。",
        "下の統合ビューを確認します。取り消し線が削除、緑が追加を示します。",
      ],
      faqs: [
        {
          q: "差分はどのように表示されますか?",
          a: "変更のない部分はそのまま、削除された単語はオレンジの取り消し線、追加された単語は緑で強調され、修正履歴つきの文書のように読めます。",
        },
        {
          q: "文字単位ですか、単語単位ですか?",
          a: "単語単位です。語内の小さな修正は「削除された語+追加された語」として表示され、文字単位より見通しがよくなります。",
        },
        {
          q: "サイズの上限はありますか?",
          a: "ブラウザのメモリだけが上限です。書籍一冊分の比較も可能ですが、非常に大きなテキストは描画に少し時間がかかります。",
        },
      ],
    },
    es: {
      name: "Comparador de textos",
      tagline:
        "Compara dos versiones de un texto palabra por palabra, con altas y bajas resaltadas — sin cuenta, sin subidas, sin complicaciones.",
      intro: [
        "Pega el original a la izquierda y la versión editada a la derecha: las palabras cambiadas se encienden al momento, las eliminaciones en un color y las adiciones en otro. Es la forma más rápida de revisar una revisión de contrato, la reescritura de un editor o los cambios de última hora de un compañero.",
        "La comparación ocurre por completo en tu navegador: contratos largos, manuscritos inéditos y texto confidencial nunca tocan un servidor.",
      ],
      steps: [
        "Pega el texto original en el cuadro de la izquierda.",
        "Pega el texto modificado en el cuadro de la derecha.",
        "Lee la vista combinada de abajo: el tachado marca eliminaciones y el verde marca añadidos.",
      ],
      faqs: [
        {
          q: "¿Cómo se muestran las diferencias?",
          a: "El texto sin cambios va en normal; las palabras eliminadas van tachadas en naranja y las añadidas resaltadas en verde, como un documento con control de cambios.",
        },
        {
          q: "¿Es un diff a nivel de carácter o de palabra?",
          a: "A nivel de palabra. Un cambio pequeño dentro de una palabra se muestra como una palabra eliminada más una añadida, más fácil de escanear que el diff por caracteres.",
        },
        {
          q: "¿Hay límite de tamaño?",
          a: "Solo la memoria de tu navegador: se pueden comparar textos del tamaño de un libro, aunque los muy grandes tardan un poco en renderizarse.",
        },
      ],
    },
    pt: {
      name: "Comparador de textos",
      tagline:
        "Compare duas versões de um texto palavra por palavra, com adições e exclusões destacadas — sem conta, sem upload, sem complicação.",
      intro: [
        "Cole o original à esquerda e a versão editada à direita: as palavras alteradas acendem na hora, exclusões numa cor e adições em outra. É o caminho mais rápido para revisar uma alteração de contrato, a reescrita de um editor ou os ajustes de última hora de um colega.",
        "A comparação acontece inteiramente no seu navegador — contratos longos, manuscritos inéditos e texto confidencial nunca passam por um servidor.",
      ],
      steps: [
        "Cole o texto original na caixa da esquerda.",
        "Cole o texto modificado na caixa da direita.",
        "Leia a visão combinada abaixo: o tachado marca exclusões e o verde marca adições.",
      ],
      faqs: [
        {
          q: "Como as diferenças são exibidas?",
          a: "O texto sem mudanças fica normal; palavras removidas aparecem tachadas em laranja e palavras adicionadas em verde, como um documento com controle de alterações.",
        },
        {
          q: "O diff é por caractere ou por palavra?",
          a: "Por palavra. Uma edição pequena dentro de uma palavra aparece como uma palavra removida mais uma adicionada — mais fácil de ler do que o diff por caractere.",
        },
        {
          q: "Existe limite de tamanho?",
          a: "Só a memória do navegador — comparações do tamanho de um livro funcionam, embora textos muito grandes demorem um pouco para renderizar.",
        },
      ],
    },
  },
});
