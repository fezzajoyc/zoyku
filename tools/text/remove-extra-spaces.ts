import { TextTransform } from "../_engines/text-tool";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "remove-extra-spaces",
  category: "text",
  icon: "crop",
  engine: {
    component: TextTransform,
    props: {
      transform: "remove-extra-spaces",
      sample: "Hello   world  this  text  has\tsome\ttabs.\n\n\nFix   it   in   one  click.",
      options: [
        { key: "tabs", label: { en: "Convert tabs to spaces", zh: "制表符转空格", ja: "タブを空白に変換", es: "Convertir tabulaciones en espacios", pt: "Converter tabulações em espaços" } },
        { key: "trimLines", label: { en: "Trim line edges", zh: "去除行首尾空格", ja: "行頭行末の空白を削除", es: "Recortar bordes de línea", pt: "Aparar início e fim das linhas" } },
        { key: "removeEmptyLines", label: { en: "Remove empty lines", zh: "删除空行", ja: "空行を削除", es: "Quitar líneas vacías", pt: "Remover linhas vazias" } },
      ],
    },
  },
  related: ["remove-duplicate-lines", "text-cleaner", "text-sorter", "word-counter", "text-diff", "lorem-ipsum-generator", "sentence-counter", "text-to-binary", "reverse-text", "slug-generator"],
  copy: {
    en: {
      name: "Remove Extra Spaces",
      tagline:
        "Collapse double spaces into one, convert tabs, trim line edges and remove empty lines — clean up pasted text in a single pass.",
      intro: [
        "Text copied from PDFs, spreadsheets, terminals and chat apps often arrives riddled with double spaces, stray tabs and empty lines. This tool squashes repeated spaces into one and gives you toggles for the rest: turn tabs into spaces, trim each line's edges, and drop blank lines.",
        "Everything runs locally as you type, so you can paste logs, drafts or anything else sensitive without a second thought.",
      
        "Each cleanup rule is a discrete pass: consecutive spaces collapse to one, tabs convert to a chosen width, per-line edges trim, and runs of blank lines reduce to one or zero depending on the toggle. Because passes run in order, a pasted PDF's '  word   word  ' becomes 'word word' predictably rather than aggressively.",
        "Compared with doing this by regex each time (which means remembering the pattern and checking the edge cases), the toggles are already tuned to the four real-world cases: PDF copy, terminal output, spreadsheet paste and chat app export. And like every text tool here, the input never leaves your tab — a pasted stack trace or log stays local.",
      ],
      steps: [
        "Paste the messy text into the input box.",
        "Toggle tab conversion, line trimming or empty-line removal as needed.",
        "Copy the cleaned output straight back into your document or editor.",
      ],
      faqs: [
        {
          q: "Does it collapse spaces inside lines or only at the edges?",
          a: "Repeated spaces anywhere in the text are collapsed to a single space. Edge whitespace is only removed when you enable 'Trim line edges'.",
        },
        {
          q: "Will it break my code indentation?",
          a: "It can — indentation relies on leading spaces or tabs. For code, leave 'Trim line edges' off or use a proper formatter instead.",
        },
        {
          q: "Are line breaks preserved?",
          a: "Yes. The tool only touches horizontal whitespace and empty lines; the line structure of your text stays intact.",
        },
      ],
    },
    zh: {
      name: "去除多余空格",
      tagline: "把连续空格折叠为一个,制表符转空格、去行首尾空白、删空行——一次清洗粘贴来的文本。",
      intro: [
        "从 PDF、表格、终端和聊天软件复制出来的文本,常常带着成对空格、多余制表符和空行。本工具把重复空格压缩为一个,其余交给开关:制表符转空格、去掉每行首尾空白、删除空行。",
        "全程本地实时处理,日志、草稿、任何内容都可以放心粘贴。",
      ],
      steps: [
        "把杂乱的文本粘贴到输入框。",
        "按需打开制表符转换、行首尾去空格或删空行选项。",
        "复制清理后的输出,直接贴回文档或编辑器。",
      ],
      faqs: [
        {
          q: "只会处理行边缘的空格,还是行内的也会?",
          a: "全文所有连续空格都会压缩为一个;行首尾空白只在打开“去除行首尾空格”后才会删掉。",
        },
        {
          q: "会破坏代码缩进吗?",
          a: "可能会——缩进依赖行首空格或制表符。处理代码请关掉“去除行首尾空格”,或改用专门的格式化工具。",
        },
        {
          q: "换行会保留吗?",
          a: "会。工具只处理水平空白和空行,文本的行结构保持不变。",
        },
      ],
    },
    ja: {
      name: "余分な空白の削除",
      tagline: "連続する空白を 1 つに圧縮し、タブ変換・行端のトリム・空行削除もワンクリック。貼り付けたテキストを一発で整えます。",
      intro: [
        "PDF、表計算、ターミナル、チャットからコピーしたテキストには、重複した空白、余計なタブ、空行が混ざりがちです。本ツールは連続する空白を 1 つにまとめ、残りはオプションで対応:タブを空白へ変換、各行の端をトリム、空行の削除。",
        "処理はすべてローカルでリアルタイム。ログや下書きも安心して貼り付けられます。",
      ],
      steps: [
        "整っていないテキストを入力欄に貼り付けます。",
        "タブ変換・トリム・空行削除のオプションを必要に応じて切り替えます。",
        "整形後の出力をコピーして文書やエディタに戻します。",
      ],
      faqs: [
        {
          q: "行の端だけでなく行内の空白もまとまりますか?",
          a: "文中のどこにある連続空白も 1 つに圧縮されます。行の端の空白は「行頭行末の空白を削除」を有効にした場合のみ取り除かれます。",
        },
        {
          q: "コードのインデントが崩れませんか?",
          a: "崩れる可能性があります。インデントは行頭の空白やタブに依存するため、コードではトリムを無効にするか、フォーマッタを使ってください。",
        },
        {
          q: "改行は保持されますか?",
          a: "はい。本ツールが触るのは水平方向の空白と空行だけで、行の構造はそのまま残ります。",
        },
      ],
    },
    es: {
      name: "Eliminar espacios extra",
      tagline:
        "Reduce los espacios dobles a uno, convierte tabulaciones, recorta los bordes de línea y elimina líneas vacías: limpia el texto pegado de una vez.",
      intro: [
        "El texto copiado de PDFs, hojas de cálculo, terminales y chats suele llegar lleno de espacios dobles, tabulaciones sueltas y líneas en blanco. Esta herramienta comprime los espacios repetidos a uno y el resto va por interruptores: convertir tabulaciones, recortar cada línea y quitar líneas vacías.",
        "Todo se procesa en local y en tiempo real: pega logs, borradores o texto confidencial sin pensarlo dos veces.",
      ],
      steps: [
        "Pega el texto desordenado en el cuadro de entrada.",
        "Activa la conversión de tabulaciones, el recorte o la eliminación de líneas vacías según necesites.",
        "Copia la salida limpia de vuelta a tu documento o editor.",
      ],
      faqs: [
        {
          q: "¿Colapsa espacios dentro de las líneas o solo en los bordes?",
          a: "Los espacios repetidos en cualquier parte del texto se reducen a uno. Los blancos de los bordes solo se quitan con «Recortar bordes de línea» activado.",
        },
        {
          q: "¿Romperá la indentación de mi código?",
          a: "Puede: la indentación depende de los espacios y tabulaciones iniciales. Para código, deja el recorte desactivado o usa un formateador.",
        },
        {
          q: "¿Se conservan los saltos de línea?",
          a: "Sí. La herramienta solo toca el espacio horizontal y las líneas vacías; la estructura de líneas queda intacta.",
        },
      ],
    },
    pt: {
      name: "Remover espaços extras",
      tagline:
        "Reduz espaços duplos a um, converte tabulações, apara as bordas das linhas e remove linhas vazias — limpe o texto colado numa única passada.",
      intro: [
        "Texto copiado de PDFs, planilhas, terminais e apps de mensagem costuma chegar cheio de espaços duplos, tabulações soltas e linhas em branco. Esta ferramenta comprime os espaços repetidos em um e o resto fica por conta das opções: converter tabulações, aparar as pontas de cada linha e descartar linhas vazias.",
        "Tudo roda localmente e em tempo real — cole logs, rascunhos ou texto confidencial sem pensar duas vezes.",
      ],
      steps: [
        "Cole o texto bagunçado na caixa de entrada.",
        "Ative a conversão de tabulações, o aparar de linhas ou a remoção de linhas vazias conforme precisar.",
        "Copie a saída limpa de volta para o documento ou editor.",
      ],
      faqs: [
        {
          q: "Reduz espaços dentro das linhas ou só nas bordas?",
          a: "Espaços repetidos em qualquer parte do texto viram um só. Os espaços das bordas só saem com “Aparar início e fim das linhas” ativado.",
        },
        {
          q: "Vai quebrar a indentação do meu código?",
          a: "Pode — a indentação depende dos espaços e tabulações iniciais. Para código, deixe o aparar desligado ou use um formatador.",
        },
        {
          q: "As quebras de linha são mantidas?",
          a: "Sim. A ferramenta só mexe em espaços horizontais e linhas vazias; a estrutura de linhas fica intacta.",
        },
      ],
    },
  },
});
