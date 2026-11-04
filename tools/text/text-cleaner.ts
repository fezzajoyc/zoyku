import { TextTransform } from "../_engines/text-tool";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "text-cleaner",
  category: "text",
  icon: "sparkle",
  engine: {
    component: TextTransform,
    props: {
      transform: "clean-text",
      options: [
        { key: "trimLines", label: { en: "Trim line edges", zh: "去除行首尾空格", ja: "行頭行末の空白を削除", es: "Recortar bordes de línea", pt: "Aparar início e fim das linhas" } },
        { key: "collapseSpaces", label: { en: "Collapse repeated spaces", zh: "折叠连续空格", ja: "連続する空白を圧縮", es: "Reducir espacios repetidos", pt: "Reduzir espaços repetidos" } },
        { key: "removeEmpty", label: { en: "Remove empty lines", zh: "删除空行", ja: "空行を削除", es: "Quitar líneas vacías", pt: "Remover linhas vazias" } },
        { key: "removePrintable", label: { en: "Remove invisible characters", zh: "清除隐形字符", ja: "不可視文字を除去", es: "Eliminar caracteres invisibles", pt: "Eliminar caracteres invisíveis" } },
        { key: "normalizePunct", label: { en: "Normalize punctuation", zh: "规范标点符号", ja: "句読点を正規化", es: "Normalizar puntuación", pt: "Normalizar pontuação" } },
      ],
    },
  },
  related: ["remove-extra-spaces", "remove-duplicate-lines", "case-converter", "word-counter", "text-diff", "text-sorter", "lorem-ipsum-generator", "sentence-counter", "text-to-binary", "reverse-text"],
  copy: {
    en: {
      name: "Text Cleaner",
      tagline:
        "Remove invisible characters, smart quotes, extra spaces and empty lines from text pasted out of PDFs, Word processors and chat apps.",
      intro: [
        "Copy-paste is where clean text goes to die: PDFs leave zero-width characters, Word swaps straight quotes for curly ones and adds non-breaking spaces, chat apps insert control characters. This tool strips the invisible junk and repairs the punctuation in one pass.",
        "Every option is a toggle, so you decide how aggressive the cleanup is — from just trimming lines to a full scrub that removes non-printable characters and normalizes quotes, dashes and ellipses.",
      ],
      steps: [
        "Paste the messy text into the input box.",
        "Toggle the cleanups you want: trim lines, collapse spaces, remove empty lines, strip invisible characters, normalize punctuation.",
        "Copy the clean output back into your document, CMS or editor.",
      ],
      faqs: [
        {
          q: "What are invisible characters and where do they come from?",
          a: "Zero-width spaces, byte-order marks and control characters — added by PDFs, some websites and office software. They are invisible but break searches, regexes and database imports, so removing them is usually safe.",
        },
        {
          q: "What does 'normalize punctuation' change?",
          a: "Curly quotes become straight ones, en and em dashes become hyphens, the ellipsis character becomes three dots and non-breaking spaces become regular spaces. Use it when plain, code-safe punctuation matters.",
        },
        {
          q: "Is cleanup lossless?",
          a: "No tool can know your intent for sure. The output box always shows the result first, so review it before replacing your original.",
        },
      ],
    },
    zh: {
      name: "文本清洗",
      tagline: "清除从 PDF、Word、聊天软件粘贴出的隐形字符、弯引号、多余空格和空行,一次恢复干净文本。",
      intro: [
        "复制粘贴是干净文本的重灾区:PDF 留下零宽字符,Word 把直引号换成弯引号、塞进不换行空格,聊天软件夹带控制字符。本工具一次清除这些看不见的杂质,并顺手修复标点。",
        "每个清理项都是独立开关,清理力度由你决定——从仅去行首尾空格,到彻底清除不可打印字符、规范引号、破折号和省略号。",
      ],
      steps: [
        "把乱糟糟的文本粘贴到输入框。",
        "打开需要的清理项:去行首尾空格、折叠空格、删空行、清除隐形字符、规范标点。",
        "复制干净的输出,贴回文档、CMS 或编辑器。",
      ],
      faqs: [
        {
          q: "隐形字符是什么,从哪来的?",
          a: "零宽空格、字节顺序标记和控制字符——由 PDF、部分网站和办公软件引入。它们看不见,但会破坏搜索、正则和数据库导入,通常可以放心删除。",
        },
        {
          q: "“规范标点符号”会改什么?",
          a: "弯引号变直引号,en/em 破折号变连字符,省略号字符变三个点,不换行空格变普通空格。需要纯文本、代码安全标点时使用。",
        },
        {
          q: "清理是无损的吗?",
          a: "任何工具都无法百分之百还原你的意图。输出框会先展示结果,替换原文前请先检查一遍。",
        },
      ],
    },
    ja: {
      name: "テキストクリーナー",
      tagline: "PDF や Word、チャットから貼り付けたテキストから、不可視文字・スマート引用符・余分な空白・空行を一括除去。",
      intro: [
        "コピペはテキストが汚れる瞬間です:PDF はゼロ幅文字を残し、Word はストレート引用符をカーリーに置き換えてノーブレークスペースを混ぜ、チャットアプリは制御文字を挿入します。本ツールはそうした見えないゴミを一括で取り除き、句読点も整えます。",
        "各項目はオン/オフ式なので、行端のトリムだけにとどめることも、不可視文字の除去と引用符・ダッシュ・省略号の正規化まで一気に行うこともできます。",
      ],
      steps: [
        "乱れたテキストを入力欄に貼り付けます。",
        "必要な清掃項目を切り替えます:トリム、空白の圧縮、空行削除、不可視文字の除去、句読点の正規化。",
        "きれいになった出力を文書・CMS・エディタに戻します。",
      ],
      faqs: [
        {
          q: "不可視文字とは何ですか?どこから来るの?",
          a: "ゼロ幅スペース、BOM、制御文字のことです。PDF や一部のウェブサイト、オフィスソフトが付け加えます。検索・正規表現・データベース取り込みを壊す原因になるので、通常は削除して問題ありません。",
        },
        {
          q: "「句読点を正規化」では何が変わりますか?",
          a: "カーリークォートがストレートに、en/em ダッシュがハイフンに、省略号が 3 つの点に、ノーブレークスペースが通常の空白に変わります。プレーンでコード安全な記号が必要なときに使います。",
        },
        {
          q: "クリーンアップは可逆ですか?",
          a: "意図を完全に推測できるツールはありません。出力欄に結果が先に表示されるので、元のテキストを置き換える前に確認してください。",
        },
      ],
    },
    es: {
      name: "Limpiador de texto",
      tagline:
        "Elimina caracteres invisibles, comillas tipográficas, espacios extra y líneas vacías del texto pegado de PDFs, Word y apps de chat.",
      intro: [
        "Copiar y pegar es donde el texto limpio se estropea: los PDFs dejan caracteres de ancho cero, Word convierte las comillas rectas en curvas y añade espacios duros, y las apps de chat insertan caracteres de control. Esta herramienta retira la basura invisible y repara la puntuación de una vez.",
        "Cada limpieza es un interruptor, así que tú decides la intensidad: desde solo recortar líneas hasta una limpieza completa con caracteres no imprimibles fuera y comillas, guiones y puntos suspensivos normalizados.",
      ],
      steps: [
        "Pega el texto sucio en el cuadro de entrada.",
        "Activa las limpiezas que quieras: recortar líneas, reducir espacios, quitar líneas vacías, eliminar caracteres invisibles, normalizar puntuación.",
        "Copia la salida limpia de vuelta a tu documento, CMS o editor.",
      ],
      faqs: [
        {
          q: "¿Qué son los caracteres invisibles y de dónde salen?",
          a: "Espacios de ancho cero, marcas BOM y caracteres de control que añaden PDFs, algunas webs y suites ofimáticas. Son invisibles pero rompen búsquedas, regexes e importaciones de bases de datos; quitarlos suele ser seguro.",
        },
        {
          q: "¿Qué cambia «normalizar puntuación»?",
          a: "Las comillas curvas pasan a rectas, los guiones en y em a guiones simples, el carácter de puntos suspensivos a tres puntos y los espacios duros a espacios normales. Úsalo cuando quieras puntuación plana y segura para código.",
        },
        {
          q: "¿La limpieza no pierde nada?",
          a: "Ninguna herramienta adivina tu intención. El resultado aparece primero en la salida: revísalo antes de sustituir tu original.",
        },
      ],
    },
    pt: {
      name: "Limpador de texto",
      tagline:
        "Remova caracteres invisíveis, aspas tipográficas, espaços extras e linhas vazias de texto colado de PDFs, Word e apps de mensagem.",
      intro: [
        "Copiar e colar é onde o texto limpo se estraga: PDFs deixam caracteres de largura zero, o Word troca aspas retas por curvas e insere espaços rígidos, e apps de mensagem enchem o texto de caracteres de controle. Esta ferramenta remove o lixo invisível e conserta a pontuação numa passada.",
        "Cada limpeza é uma opção, então você define a intensidade — de apenas aparar linhas até uma faxina completa com remoção de não imprimíveis e normalização de aspas, travessões e reticências.",
      ],
      steps: [
        "Cole o texto sujo na caixa de entrada.",
        "Ative as limpezas desejadas: aparar linhas, reduzir espaços, remover linhas vazias, eliminar caracteres invisíveis, normalizar pontuação.",
        "Copie a saída limpa de volta para o documento, CMS ou editor.",
      ],
      faqs: [
        {
          q: "O que são caracteres invisíveis e de onde vêm?",
          a: "Espaços de largura zero, marcas BOM e caracteres de controle, inseridos por PDFs, alguns sites e softwares de escritório. São invisíveis, mas quebram buscas, regex e importações de banco de dados — removê-los costuma ser seguro.",
        },
        {
          q: "O que a “normalizar pontuação” muda?",
          a: "Aspas curvas viram retas, travessões en/em viram hífen, o caractere de reticências vira três pontos e espaços rígidos viram espaços comuns. Use quando precisar de pontuação simples e segura para código.",
        },
        {
          q: "A limpeza é sem perdas?",
          a: "Nenhuma ferramenta adivinha sua intenção. O resultado aparece primeiro na saída: revise antes de substituir o original.",
        },
      ],
    },
  },
});
