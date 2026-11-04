import { FindReplace } from "../_engines/text-engine-findreplace";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "find-and-replace",
  category: "text",
  icon: "code",
  engine: { component: FindReplace },
  related: ["text-diff", "text-cleaner", "remove-duplicate-lines", "text-sorter", "remove-extra-spaces", "word-counter", "lorem-ipsum-generator", "sentence-counter", "text-to-binary", "reverse-text"],
  copy: {
    en: {
      name: "Find and Replace",
      tagline:
        "Find and replace across thousands of words with case, whole-word and regex modes — see the match count before you commit.",
      intro: [
        "One find box, one replace box, three matching modes. Plain text for quick swaps, whole-word mode so 'cat' never lands inside 'category', and regular expressions for patterns — dates, tags, repeated whitespace or anything else you can describe.",
        "Matches are counted as you type and the replacement previews live, so you can see exactly what will change before copying anything out.",
      ],
      steps: [
        "Paste the text, then type what to find and what to replace it with.",
        "Pick a mode: case-sensitive, whole words only, or regular expression.",
        "Check the match count, then copy the replaced result.",
      ],
      faqs: [
        {
          q: "Can I use capture groups in regex mode?",
          a: "Yes. Wrap parts of the pattern in parentheses and reference them in the replacement as $1, $2 and so on — for example find '(\\d{4})-(\\d{2})' and replace with '$2/$1'.",
        },
        {
          q: "What does 'whole words only' prevent?",
          a: "It matches only when the term stands alone: searching 'cat' will no longer match 'category' or 'concatenate'.",
        },
        {
          q: "Are $ signs in my replacement treated literally?",
          a: "In plain mode yes — '$100' stays '$100'. In regex mode $ patterns are special ($1 means group 1); escape as \\$ if you need a literal one.",
        },
      ],
    },
    zh: {
      name: "查找替换",
      tagline: "区分大小写、整词匹配、正则表达式三种模式批量查找替换——先看匹配计数,再放心替换。",
      intro: [
        "一个查找框、一个替换框、三种匹配模式。纯文本模式适合快速替换,整词模式保证 'cat' 不会命中 'category' 内部,正则模式则能处理日期、标签、重复空白等任何模式。",
        "输入的同时统计匹配次数,替换结果实时预览,复制之前就能看清会改什么。",
      ],
      steps: [
        "粘贴文本,输入要查找的内容和替换成的内容。",
        "选择模式:区分大小写、仅整词或正则表达式。",
        "核对匹配计数,复制替换后的结果。",
      ],
      faqs: [
        {
          q: "正则模式里能用捕获组吗?",
          a: "可以。把模式的一部分用括号包起来,替换里用 $1、$2 引用,比如查找 '(\\d{4})-(\\d{2})',替换成 '$2/$1'。",
        },
        {
          q: "“仅整词匹配”防住了什么?",
          a: "它只在词独立出现时匹配:搜 'cat' 不会再命中 'category' 或 'concatenate' 内部。",
        },
        {
          q: "替换文本里的 $ 会按字面处理吗?",
          a: "普通模式会——'$100' 就是 '$100'。正则模式里 $ 是特殊符号($1 表示第 1 组),需要字面 $ 时写成 \\$。",
        },
      ],
    },
    ja: {
      name: "検索と置換",
      tagline: "大文字小文字の区別・単語単位・正規表現の 3 モードで一括置換。マッチ数を確認してから確実に置き換えられます。",
      intro: [
        "検索欄 1 つ、置換欄 1 つ、マッチングモードは 3 種類。普通のテキスト置換はそのまま、単語単位なら 'cat' が 'category' の中で引っかからず、正規表現なら日付・タグ・連続する空白など任意のパターンを処理できます。",
        "入力しながらマッチ数を数え、置換結果もリアルタイムでプレビュー。コピーする前に変更内容を正確に確認できます。",
      ],
      steps: [
        "テキストを貼り付け、検索語と置換後の語を入力します。",
        "モードを選びます:大文字小文字を区別、単語単位、または正規表現。",
        "マッチ数を確認し、置換結果をコピーします。",
      ],
      faqs: [
        {
          q: "正規表現モードでキャプチャ グループは使えますか?",
          a: "使えます。パターンの一部を括弧で囲み、置換側で $1、$2 と参照します。例:「(\\d{4})-(\\d{2})」を検索し「$2/$1」に置換。",
        },
        {
          q: "「単語単位で検索」は何を防ぎますか?",
          a: "語が独立している場合だけマッチします。'cat' で検索しても 'category' や 'concatenate' の内部には引っかかりません。",
        },
        {
          q: "置換テキストの $ は文字通り扱われますか?",
          a: "通常モードでは文字通りです('$100' は '$100' のまま)。正規表現モードでは $ は特別な意味を持ち($1 はグループ 1)、文字として使う場合は \\$ とします。",
        },
      ],
    },
    es: {
      name: "Buscar y reemplazar",
      tagline:
        "Busca y reemplaza en miles de palabras con modos de mayúsculas, palabra completa y expresiones regulares — cuenta las coincidencias antes de confirmar.",
      intro: [
        "Un cuadro para buscar, otro para reemplazar y tres modos de coincidencia. Texto plano para cambios rápidos, modo palabra completa para que «cat» no caiga dentro de «concatenate», y expresiones regulares para patrones: fechas, etiquetas, espacios repetidos o lo que puedas describir.",
        "Las coincidencias se cuentan mientras escribes y el reemplazo se previsualiza en vivo, así que ves exactamente qué cambiará antes de copiar nada.",
      ],
      steps: [
        "Pega el texto y escribe qué buscar y con qué reemplazar.",
        "Elige un modo: distinguir mayúsculas, solo palabras completas o expresión regular.",
        "Comprueba el recuento de coincidencias y copia el resultado reemplazado.",
      ],
      faqs: [
        {
          q: "¿Puedo usar grupos de captura en modo regex?",
          a: "Sí. Rodea partes del patrón con paréntesis y referencíalas en el reemplazo como $1, $2… por ejemplo busca '(\\d{4})-(\\d{2})' y reemplaza con '$2/$1'.",
        },
        {
          q: "¿Qué evita «solo palabras completas»?",
          a: "Solo coincide cuando el término va solo: buscar «cat» ya no dará con «category» ni caerá dentro de «concatenate».",
        },
        {
          q: "¿Los $ del reemplazo se toman literalmente?",
          a: "En modo normal sí: «$100» sigue siendo «$100». En modo regex los patrones $ son especiales ($1 = grupo 1); escapa como \\$ si necesitas uno literal.",
        },
      ],
    },
    pt: {
      name: "Localizar e substituir",
      tagline:
        "Localize e substitua em milhares de palavras com modos de maiúsculas, palavra inteira e expressão regular — veja a contagem antes de confirmar.",
      intro: [
        "Uma caixa para localizar, outra para substituir e três modos de correspondência. Texto simples para trocas rápidas, modo de palavra inteira para que 'gato' nunca caia dentro de 'catalogar', e expressões regulares para padrões — datas, tags, espaços repetidos ou o que você descrever.",
        "As ocorrências são contadas enquanto você digita e a substituição aparece ao vivo, então você vê exatamente o que muda antes de copiar qualquer coisa.",
      ],
      steps: [
        "Cole o texto, digite o que localizar e pelo que substituir.",
        "Escolha o modo: diferenciar maiúsculas, apenas palavras inteiras ou expressão regular.",
        "Confira a contagem de ocorrências e copie o resultado substituído.",
      ],
      faqs: [
        {
          q: "Posso usar grupos de captura no modo regex?",
          a: "Sim. Envolva partes do padrão com parênteses e referencie na substituição como $1, $2… por exemplo localize '(\\d{4})-(\\d{2})' e substitua por '$2/$1'.",
        },
        {
          q: "O que “apenas palavras inteiras” evita?",
          a: "Ela só corresponde quando o termo está sozinho: buscar 'gato' não vai mais pegar 'catalogar' nem cair dentro de 'concatenar'.",
        },
        {
          q: "Os $ na substituição são literais?",
          a: "No modo simples, sim — '$100' continua '$100'. No modo regex o $ é especial ($1 = grupo 1); escape como \\$ se precisar de um literal.",
        },
      ],
    },
  },
});
