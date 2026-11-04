import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "html-minifier",
  category: "developer",
  icon: "crop",
  engine: { component: DevCodeEngine, props: { mode: "html-minify", showSize: true } },
  related: ["html-formatter", "css-minifier", "javascript-minifier", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "url-encoder", "url-decoder"],
  copy: {
    en: {
      name: "HTML Minifier",
      tagline:
        "Minify HTML in your browser: strip comments and collapse whitespace to cut page weight — a conservative cleaner that keeps your markup and rendering intact.",
      intro: [
        "Paste HTML and get a lighter version in real time. Comments are removed (IE conditional comments survive), runs of whitespace collapse to a single space, and whitespace between block-level tags is dropped entirely — while inline text spacing is preserved so words never fuse together.",
        "This is a deliberately conservative minifier: it does not rename classes, remove quotes or restructure anything. That makes it safe for email templates and legacy markup, and the live size readout shows exactly how many bytes you saved.",
      ],
      steps: [
        "Paste your HTML into the input box.",
        "The minified output appears instantly, with input/output sizes and the percentage saved.",
        "Copy the compact HTML or clear the input to minify another page.",
      ],
      faqs: [
        {
          q: "Can minification break my HTML?",
          a: "This tool takes the safe route: whitespace inside pre, textarea, script and style is untouched, whitespace-only gaps between inline elements become a single space, and only gaps between block-level tags are removed. Comments are dropped except IE conditional comments.",
        },
        {
          q: "Why is the saved percentage lower than other minifiers?",
          a: "Because it is conservative by design — it never merges text with tags or removes quotes. What it does remove (comments, indentation, inter-block whitespace) is always render-safe.",
        },
        {
          q: "Is anything uploaded?",
          a: "No. Everything runs locally in your browser; the page and its markup never leave your device.",
        },
      ],
    },
    zh: {
      name: "HTML 压缩",
      tagline: "在浏览器里压缩 HTML:去注释、折叠空白,给页面减重——保守策略,渲染效果分毫不差,实时显示节省比例。",
      intro: [
        "粘贴 HTML,实时得到更轻的版本。注释会被移除(IE 条件注释保留),连续空白折叠成单个空格,块级标签之间的空白直接删除——而行内文本之间的空格会保留,单词绝不会粘连。",
        "这是刻意保守的压缩器:不改类名、不去引号、不重组任何结构。因此对邮件模板和老页面都很安全,实时的大小读数会告诉你省了多少字节。",
      ],
      steps: [
        "把 HTML 粘贴到输入框。",
        "压缩结果即时出现,并显示输入/输出大小和节省百分比。",
        "复制压缩后的 HTML,或清空输入压缩下一个页面。",
      ],
      faqs: [
        {
          q: "压缩会破坏我的 HTML 吗?",
          a: "本工具走安全路线:pre、textarea、script、style 内部的空白原样保留,行内元素之间的纯空白折叠为一个空格,只有块级标签之间的空白会删除;注释全部移除,IE 条件注释除外。",
        },
        {
          q: "为什么节省比例比别的压缩器低?",
          a: "因为它刻意保守——不会把文本和标签粘在一起,也不删引号。但它删掉的部分(注释、缩进、块级标签间空白)永远不影响渲染。",
        },
        {
          q: "会上传任何内容吗?",
          a: "不会。一切都在浏览器本地运行,页面和标记不会离开你的设备。",
        },
      ],
    },
    ja: {
      name: "HTML ミニファイアー",
      tagline:
        "HTML をブラウザ内で圧縮:コメント除去と空白の折り畳みでページを軽量化。レンダリングを崩さない保守的な手法で、節約率も表示します。",
      intro: [
        "HTML を貼り付けると、リアルタイムで軽量版が得られます。コメントは削除され(IE 条件コメントは保持)、連続する空白は 1 つに折り畳まれ、ブロックレベルタグ間の空白は完全に除去されます。インラインテキスト間の空白は保持されるため、単語がくっつくことはありません。",
        "意図的に保守的なミニファイアーです。クラス名の変更・引用符の削除・構造の組み替えは一切しません。メールテンプレートやレガシーなマークアップにも安全で、リアルタイムのサイズ表示で節約バイト数が分かります。",
      ],
      steps: [
        "HTML を入力欄に貼り付けます。",
        "圧縮結果が即座に表示され、入力/出力サイズと節約率も出ます。",
        "圧縮後の HTML をコピーするか、入力をクリアして次のページを圧縮します。",
      ],
      faqs: [
        {
          q: "圧縮で HTML が壊れることはありますか?",
          a: "このツールは安全側に倒しています。pre・textarea・script・style の内部は無加工、インライン要素間の空白のみのギャップは 1 スペースに、削除されるのはブロックレベルタグ間だけです。コメントは IE 条件コメントを除き削除します。",
        },
        {
          q: "節約率が他のミニファイアーより低いのはなぜ?",
          a: "設計として保守的だからです。テキストとタグの結合や引用符の削除はしません。削除するもの(コメント・インデント・ブロック間の空白)は常にレンダリング上安全です。",
        },
        {
          q: "何かアップロードされますか?",
          a: "いいえ。すべてブラウザ内でローカルに動作し、ページとマークアップは端末の外に出ません。",
        },
      ],
    },
    es: {
      name: "Minificador HTML",
      tagline:
        "Minifica HTML en tu navegador: elimina comentarios y colapsa espacios para reducir el peso de la página, sin romper tu marcado ni el renderizado.",
      intro: [
        "Pega HTML y obtén en tiempo real una versión más ligera. Los comentarios se eliminan (los condicionales de IE sobreviven), las series de espacios se colapsan a uno y el espacio entre etiquetas de bloque desaparece — mientras que el espacio del texto en línea se conserva y las palabras nunca se pegan.",
        "Es un minificador deliberadamente conservador: no renombra clases, no quita comillas ni reestructura nada. Eso lo hace seguro para plantillas de email y marcado heredado, y el indicador de tamaño muestra cuántos bytes has ahorrado.",
      ],
      steps: [
        "Pega tu HTML en el cuadro de entrada.",
        "La salida minificada aparece al instante, con tamaños de entrada/salida y el porcentaje ahorrado.",
        "Copia el HTML compacto o borra la entrada para minificar otra página.",
      ],
      faqs: [
        {
          q: "¿Puede la minificación romper mi HTML?",
          a: "Esta herramienta va por lo seguro: el espacio dentro de pre, textarea, script y style no se toca, los huecos entre elementos en línea se reducen a un espacio y solo se eliminan los huecos entre etiquetas de bloque. Los comentarios desaparecen salvo los condicionales de IE.",
        },
        {
          q: "¿Por qué el ahorro es menor que en otros minificadores?",
          a: "Porque es conservador a propósito: nunca une texto con etiquetas ni quita comillas. Lo que elimina (comentarios, indentación, espacio entre bloques) siempre es seguro para el renderizado.",
        },
        {
          q: "¿Se sube algo?",
          a: "No. Todo corre localmente en tu navegador; la página y su marcado nunca salen de tu dispositivo.",
        },
      ],
    },
    pt: {
      name: "Minificador HTML",
      tagline:
        "Minifique HTML no navegador: remova comentários e colapse espaços para reduzir o peso da página — de forma conservadora, sem quebrar a renderização.",
      intro: [
        "Cole HTML e receba em tempo real uma versão mais leve. Comentários são removidos (condicionais do IE sobrevivem), sequências de espaços colapsam para um único espaço, e o espaço entre tags de bloco é eliminado — enquanto o espaço do texto inline é preservado, então palavras nunca se fundem.",
        "É um minificador deliberadamente conservador: não renomeia classes, não remove aspas nem reestrutura nada. Isso o torna seguro para templates de e-mail e marcação legada, e o indicador de tamanho mostra exatamente quantos bytes você economizou.",
      ],
      steps: [
        "Cole seu HTML na caixa de entrada.",
        "A saída minificada aparece na hora, com tamanhos de entrada/saída e a porcentagem economizada.",
        "Copie o HTML compacto ou limpe a entrada para minificar outra página.",
      ],
      faqs: [
        {
          q: "A minificação pode quebrar meu HTML?",
          a: "Esta ferramenta segue o caminho seguro: espaço dentro de pre, textarea, script e style não é tocado, lacunas entre elementos inline viram um único espaço, e só as lacunas entre tags de bloco são removidas. Comentários saem, exceto condicionais do IE.",
        },
        {
          q: "Por que a economia é menor que em outros minificadores?",
          a: "Porque ela é conservadora por princípio — nunca funde texto com tags nem remove aspas. O que ela remove (comentários, indentação, espaço entre blocos) é sempre seguro para a renderização.",
        },
        {
          q: "Algo é enviado para a internet?",
          a: "Não. Tudo roda localmente no seu navegador; a página e sua marcação nunca saem do seu dispositivo.",
        },
      ],
    },
  },
});
