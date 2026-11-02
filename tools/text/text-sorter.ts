import { TextSorter } from "../_engines/text-sorter";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "text-sorter",
  category: "text",
  icon: "shuffle",
  engine: { component: TextSorter },
  related: ["remove-duplicate-lines", "remove-extra-spaces", "find-and-replace", "text-cleaner"],
  copy: {
    en: {
      name: "Text Sorter",
      tagline:
        "Sort any list of lines alphabetically, backwards, by length or by number — locale-aware and instant, right in your browser.",
      intro: [
        "Paste a list of names, URLs, prices, tasks or log lines and reorder it with one click: A→Z for directories and indexes, Z→A for ranked lists, shortest-first for cleanup passes, numeric order so 'item 10' lands after 'item 2' instead of between 'item 1' and 'item 2'.",
        "Sorting uses the browser's locale-aware collation, so accented characters sort where a human expects them instead of after the whole alphabet.",
      ],
      steps: [
        "Paste your list into the input box — one entry per line.",
        "Pick an order: A→Z, Z→A, short→long or numeric.",
        "Copy the sorted result or re-sort with another order to compare.",
      ],
      faqs: [
        {
          q: "How does numeric sorting differ from A→Z?",
          a: "Alphabetical sorting compares character by character, so '10' comes before '2'. Numeric mode reads each line as a number first and orders it by value.",
        },
        {
          q: "Does it handle accented and non-Latin text?",
          a: "Yes. Sorting uses Intl.Collator, the browser's locale-aware comparison, so é, ñ, ü and CJK characters sort according to linguistic conventions rather than raw code points.",
        },
        {
          q: "Is the original list modified?",
          a: "No — the input stays untouched and the sorted result appears in the output box, so you can always go back.",
        },
      ],
    },
    zh: {
      name: "文本排序",
      tagline: "按字母、倒序、长度或数字对任意行列表排序——本地即时完成,支持重音字符的本地化排序。",
      intro: [
        "把名单、URL、价格、任务或日志行粘贴进来,一键重排:A→Z 适合目录和索引,Z→A 适合排名,短→长适合清理,数字顺序则让“第 10 项”正确排在“第 2 项”之后,而不是卡在“第 1 项”和“第 2 项”之间。",
        "排序使用浏览器的本地化对照规则,重音字符会排在人类预期的位置,而不是整个字母表之后。",
      ],
      steps: [
        "把列表粘贴到输入框,每行一条。",
        "选择排序方式:A→Z、Z→A、短→长或数字。",
        "复制排序结果,或换一种方式再排对比。",
      ],
      faqs: [
        {
          q: "数字排序和 A→Z 有什么区别?",
          a: "字母排序逐字符比较,'10' 会排在 '2' 前面;数字模式先把每行当作数字读取,再按大小排。",
        },
        {
          q: "重音字符和非拉丁文字支持吗?",
          a: "支持。排序使用浏览器的 Intl.Collator 本地化对照,é、ñ、ü 和中日韩字符按语言习惯排序,而不是按码点硬排。",
        },
        {
          q: "原始列表会被修改吗?",
          a: "不会——输入保持原样,排序结果显示在输出框,随时可以回头。",
        },
      ],
    },
    ja: {
      name: "テキスト整列",
      tagline: "行のリストをアルファベット順・逆順・文字数順・数値順にワンクリック整列。アクセント付き文字もロケール規則どおりに。",
      intro: [
        "名簿、URL、価格、タスク、ログ行などを貼り付けてワンクリックで並べ替え:A→Z は目次やインデックスに、Z→A はランキングに、短い順はクリーンアップに。数値順なら「項目 10」が「項目 2」の後ろに正しく並びます。",
        "並べ替えにはブラウザの Intl.Collator(ロケール対応照合)を使用するため、アクセント付き文字や CJK 文字も言語的な慣習に従って並びます。",
      ],
      steps: [
        "リストを入力欄に貼り付けます(1 行 1 項目)。",
        "並べ替え方法を選択:A→Z、Z→A、短→長、数値。",
        "結果をコピーするか、別の順序で並べ替えて比較します。",
      ],
      faqs: [
        {
          q: "数値順と A→Z の違いは?",
          a: "アルファベット順は文字ごとに比較するため '10' が '2' の前に来ます。数値順は各行を数値として読み、値の大小で並べます。",
        },
        {
          q: "アクセント付き文字や日本語は正しく並びますか?",
          a: "はい。Intl.Collator によるロケール対応の比較を使うため、é、ñ、ü や日本語・中国語・韓国語もコードポイント順ではなく言語的な順序で並びます。",
        },
        {
          q: "元のリストが変更されることは?",
          a: "ありません。入力はそのままで、並べ替えた結果は出力欄に表示されます。いつでも元に戻せます。",
        },
      ],
    },
    es: {
      name: "Ordenador de texto",
      tagline:
        "Ordena listas de líneas alfabética o inversamente, por longitud o por número — con collation local y al instante, en tu navegador.",
      intro: [
        "Pega una lista de nombres, URLs, precios, tareas o líneas de log y reordénala con un clic: A→Z para directorios e índices, Z→A para rankings, corto→largo para limpiezas y orden numérico para que «elemento 10» quede detrás de «elemento 2» y no entre «elemento 1» y «elemento 2».",
        "La ordenación usa la collation local del navegador (Intl.Collator), así que é, ñ y los caracteres CJK se ordenan como espera una persona, no por puntos de código.",
      ],
      steps: [
        "Pega tu lista en el cuadro de entrada: una entrada por línea.",
        "Elige un orden: A→Z, Z→A, corto→largo o numérico.",
        "Copia el resultado o vuelve a ordenar con otro criterio para comparar.",
      ],
      faqs: [
        {
          q: "¿En qué difiere el orden numérico del A→Z?",
          a: "El alfabético compara carácter a carácter, así que «10» queda antes que «2». El modo numérico lee cada línea como número y la ordena por valor.",
        },
        {
          q: "¿Maneja texto con acentos o no latino?",
          a: "Sí. Usa Intl.Collator, la comparación local del navegador, de modo que é, ñ, ü y los caracteres CJK se ordenan según convenciones lingüísticas.",
        },
        {
          q: "¿Se modifica la lista original?",
          a: "No: la entrada queda intacta y el resultado aparece en la salida, así que siempre puedes volver atrás.",
        },
      ],
    },
    pt: {
      name: "Ordenador de texto",
      tagline:
        "Ordene listas de linhas alfabeticamente, ao contrário, por tamanho ou por número — com collation local e instantâneo, no seu navegador.",
      intro: [
        "Cole uma lista de nomes, URLs, preços, tarefas ou linhas de log e reordene com um clique: A→Z para diretórios e índices, Z→A para rankings, curto→longo para limpezas e ordem numérica para que “item 10” fique depois de “item 2” em vez de entre “item 1” e “item 2”.",
        "A ordenação usa o Intl.Collator do navegador (comparação com regras locais), então é, ñ, ü e caracteres CJK ficam onde uma pessoa esperaria, não por pontos de código.",
      ],
      steps: [
        "Cole sua lista na caixa de entrada — uma entrada por linha.",
        "Escolha a ordem: A→Z, Z→A, curto→longo ou numérica.",
        "Copie o resultado ou reordene com outro critério para comparar.",
      ],
      faqs: [
        {
          q: "Qual a diferença entre ordem numérica e A→Z?",
          a: "A alfabética compara caractere por caractere, então “10” vem antes de “2”. O modo numérico lê cada linha como número e ordena por valor.",
        },
        {
          q: "Funciona com acentos e alfabetos não latinos?",
          a: "Sim. Usa o Intl.Collator, comparação com regras locais do navegador, então é, ñ, ü e caracteres CJK seguem convenções linguísticas.",
        },
        {
          q: "A lista original é alterada?",
          a: "Não — a entrada permanece intacta e o resultado aparece na saída; você sempre pode voltar.",
        },
      ],
    },
  },
});
