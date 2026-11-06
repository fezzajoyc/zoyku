import { TextSorter } from "../_engines/text-sorter";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "text-sorter",
  category: "text",
  icon: "shuffle",
  engine: { component: TextSorter },
  related: ["remove-duplicate-lines", "remove-extra-spaces", "find-and-replace", "text-cleaner", "text-diff", "word-counter", "lorem-ipsum-generator", "sentence-counter", "text-to-binary", "reverse-text"],
  copy: {
    en: {
      name: "Text Sorter",
      tagline:
        "Sort any list of lines alphabetically, backwards, by length or by number — locale-aware and instant, right in your browser.",
      intro: [
        "Paste a list of names, URLs, prices, tasks or log lines and reorder it with one click: A→Z for directories and indexes, Z→A for ranked lists, shortest-first for cleanup passes, and numeric order so 'item 10' lands after 'item 2' instead of between 'item 1' and 'item 2'.",
        "Sorting uses the browser's Intl.Collator with numeric ordering enabled, so accented characters sort where a human expects them (é beside e, not after z) and embedded numbers compare as values, not text — version-like strings such as v1.9 and v1.10 come out in true order.",
        "Length mode sorts by raw character count, which is handy for pushing the longest lines to the top or bottom of a list. Input splits on both Windows CRLF and Unix LF line endings, so pasting straight from a text editor, terminal or spreadsheet export behaves identically.",
        "Compared with spreadsheet sorting, there is no column import, no formula and no file upload — paste, sort, copy. When the list you actually want is a de-duplicated one, run remove-duplicate-lines first; the two tools share the same line-splitting behavior, so results line up.",
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
      deepDive: [
        {
          heading: "Sorting text is not sorting numbers",
          paragraphs: [
            "Numeric sort and lexicographic sort disagree on basics: lexicographically, \"10\" comes before \"9\" because \"1\" sorts before \"9\" character by character. Sorting a list of prices, versions or chapter numbers alphabetically produces the classic 1, 10, 11, 2, 3 ordering that no one wants. Numeric-aware sorting fixes this by comparing whole values, not character sequences.",
            "Case is another fork: ASCII order puts all capitals before all lowercase, so \"Zebra\" sorts before \"apple\". Case-insensitive comparison is what most people expect from a word list. Direction (ascending/descending) and uniqueness (keep duplicates or collapse them) complete the option set.",
            "Leading articles are a genuinely editorial choice: book titles beginning with \"The\" are usually shelved under the second word. A sort tool that offers the option beats one that forces you to hand-edit every line first.",
          ],
        },
        {
          heading: "Locale-aware comparison: why é and å have opinions",
          paragraphs: [
            "Plain code-point sorting treats accented letters as strangers: Swedish \"å\" sorts as if it were \"a\" followed by junk, German \"ä\" lands far from \"a\", and Spanish traditionally treats \"ch\" and \"ll\" as letters of their own alphabet. Locale-aware collation (the Unicode Collation Algorithm, implemented in every modern runtime) fixes this: in Swedish, å sorts after z; in German phonebook order, ä sits beside a.",
            "This matters when the list is real names — customer lists, city names, author indexes. Sorting a Spanish or Swedish directory by raw code points produces an ordering locals immediately spot as wrong. The tool applies locale-aware rules so names sort the way a native speaker expects.",
            "CJK has its own conventions: Chinese sorts by pinyin in most modern contexts and by stroke count in dictionaries. Japanese kana ordering follows the gojūon sequence. Perfect collation for every language is a rabbit hole, but getting the Latin diacritics right covers most everyday lists.",
          ],
        },
        {
          heading: "Client-side by design",
          paragraphs: [
            "Sorting happens entirely in your browser as lines split, compare, reorder. There is no upload — for customer lists, HR data or unpublished rosters, a sorting page that sends nothing is the only acceptable kind.",
            "Performance is a non-issue at realistic scales: a hundred thousand lines sort in a blink, because the underlying comparison is optimized native code. Stability is preserved: lines that compare equal keep their original order rather than shuffling, which matters when the file is a log where later lines carry more recent state.",
            "Nothing persists between reloads. Sort, copy the result, move on — the input never becomes a stored artifact anywhere.",
          ],
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
      deepDive: [
        {
          heading: "排序文本不是排序数字",
          paragraphs: [
            "数字排序和字典序排序在最基本的事情上就不一致:字典序里 “10” 排在 “9” 前面,因为逐字符比较时 “1” 小于 “9”。把价格、版本号、章节号列表按字母排,就会得到谁都不想要的 1, 10, 11, 2, 3。感知数字的排序按整值比较,而不是按字符序列。",
            "大小写是另一个分叉:ASCII 顺序把所有大写排在所有小写之前,“Zebra” 会排在 “apple” 前面。对词表来说,人们期望的通常是不区分大小写的比较。升序/降序方向、保留还是合并重复项,共同补全了选项集合。",
            "冠词是真正编辑层面的选择:以 “The” 开头的书名通常按第二个词上架。一个提供该选项的排序工具,胜过逼你先把每一行手工改一遍的工具。",
          ],
        },
        {
          heading: "区域感知比较:为什么 é 和 å 有自己的意见",
          paragraphs: [
            "按码位朴素排序会把带重音的字母当外人:瑞典语 “å” 被当成 “a” 加一串杂物,德语 “ä” 离 “a” 很远,西班牙语传统上把 “ch”“ll” 当独立字母。区域感知排序(Unicode 整序算法,现代运行时都有实现)修正这一切:瑞典语里 å 排在 z 之后;德语电话簿序里 ä 与 a 并肩。",
            "列表是真实人名时这一点至关重要——客户名单、城市名、作者索引。按原始码位排西语或瑞典语目录,本地人一眼就看出不对。本工具应用区域感知规则,让名字按母语者的预期排列。",
            "CJK 有自己的惯例:现代语境下中文多按拼音排序,词典里按笔画数;日语假名遵循五十音顺序。给每种语言都做完美整序是个无底洞,但把拉丁重音字母排对,已经覆盖大多数日常列表。",
          ],
        },
        {
          heading: "设计上就是纯客户端",
          paragraphs: [
            "排序完全在浏览器里完成:按行切分、比较、重排。不上传——对客户名单、人事数据或未公布的名单,一个什么都不发的排序页面才是唯一可接受的形态。",
            "现实规模下性能不成问题:十万行一眨眼排完,底层比较是优化过的原生代码。排序是稳定的:比较相等的行保持原有顺序而不被洗牌——当文件是日志、后面的行携带更新的状态时,这一点很重要。",
            "刷新之间不保留任何东西。排完、复制结果、继续干活——输入永远不会在任何地方变成被存储的制品。",
          ],
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
      deepDive: [
        {
          heading: "テキストの並べ替えは数値の並べ替えではない",
          paragraphs: [
            "数値ソートと辞書式ソートは基本事項で食い違います。辞書式では「10」が「9」の前に来ます。文字単位では「1」が「9」より先だからです。価格・バージョン・章番号のリストをアルファベット順に並べると、誰も望まない 1, 10, 11, 2, 3 の並びになります。数値を意識したソートは文字列ではなく値全体を比較します。",
            "大文字小文字も分岐点です。ASCII 順ではすべての大文字がすべての小文字より先になり、「Zebra」が「apple」の前に来ます。単語リストで期待されるのは大文字小文字を無視する比較です。昇順・降順の向きと、重複を残すか圧縮するかが残りの選択肢です。",
            "先頭の冠詞は真に編集的な選択です。「The」で始まる書名は通常 2 語目の下に並べられます。選択肢を提供するソートツールは、全行を先に手で直すことを強いるツールに勝ります。",
          ],
        },
        {
          heading: "ロケール対応比較:é と å が意見を持つ理由",
          paragraphs: [
            "素朴なコードポイント順はアクセント付き文字をよそ者扱いします。スウェーデン語の「å」は「a」の後にゴミが続くものとして扱われ、ドイツ語の「ä」は「a」から遠くに着地し、スペイン語は伝統的に「ch」「ll」を独立した文字として扱ってきました。ロケール対応の照合(Unicode 照合アルゴリズム。現代のランタイムはすべて実装)はこれを直します。スウェーデン語では å が z の後ろに、ドイツ語の電話帳順では ä が a のそばに並びます。",
            "リストが実在の人名——顧客リスト、都市名、著者索引——のとき、これが決定的です。生のコードポイントでスペイン語やスウェーデン語の名簿を並べると、ネイティブが一目で違和感を覚える順序になります。このツールはロケール対応の規則を適用し、名前を母語話者の期待どおりに並べます。",
            "CJK には独自の慣行があります。中国語は現代では主にピンイン順、辞書では画数順。日本語の仮名は五十音に従います。全言語の完全な照合は底なしですが、ラテン文字のダイアクリティカルマークを正しく並べるだけで、日常のリストのほとんどを覆います。",
          ],
        },
        {
          heading: "設計としてクライアント側",
          paragraphs: [
            "並べ替えはブラウザ内で完全に行われます。行に分割し、比較し、並べ替える。アップロードなし——顧客リスト、人事データ、未発表の名簿にとって、何も送らない並べ替えページだけが受け入れられる形です。",
            "現実的な規模では性能は問題になりません。10 万行が一瞬で並びます。基盤の比較は最適化されたネイティブコードだからです。安定性は保たれます。比較して等しい行は元の順序を保ち、シャッフルされません。後の行が新しい状態を持つログでは、これが重要です。",
            "リロード間で何も残しません。並べ、結果をコピーし、次へ。入力がどこかで保存された成果物になることは決してありません。",
          ],
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
      deepDive: [
        {
          heading: "Ordenar texto no es ordenar números",
          paragraphs: [
            "El orden numérico y el lexicográfico discrepan en lo básico: lexicográficamente, \"10\" va antes que \"9\" porque \"1\" ordena antes que \"9\" carácter a carácter. Ordenar alfabéticamente una lista de precios, versiones o números de capítulo produce el clásico 1, 10, 11, 2, 3 que nadie quiere. La ordenación consciente de números compara valores enteros, no secuencias de caracteres.",
            "Las mayúsculas son otra bifurcación: el orden ASCII pone todas las mayúsculas antes que todas las minúsculas, así que \"Zebra\" ordena antes que \"apple\". La comparación sin distinción de mayúsculas es lo que la mayoría espera de una lista de palabras. La dirección (ascendente/descendente) y la unicidad (mantener duplicados o colapsarlos) completan las opciones.",
            "Los artículos iniciales son una decisión genuinamente editorial: los títulos que empiezan por \"El\" o \"The\" suelen archivarse por la segunda palabra. Una herramienta que ofrece la opción gana a la que te obliga a editar cada línea a mano primero.",
          ],
        },
        {
          heading: "Comparación por locale: por qué é y å tienen opinión",
          paragraphs: [
            "La ordenación por puntos de código trata las letras acentuadas como extrañas: la \"å\" sueca se ordena como si fuera \"a\" seguida de basura, la \"ä\" alemana aterriza lejos de \"a\", y el español tradicionalmente considera \"ch\" y \"ll\" letras de su propio alfabeto. La collation por locale (el algoritmo de colación Unicode, implementado en cada runtime moderno) lo arregla: en sueco, å ordena después de z; en el orden de guía telefónica alemán, ä se sienta junto a a.",
            "Esto importa cuando la lista son nombres reales — clientes, ciudades, índices de autores. Ordenar un directorio español o sueco por puntos de código crudos produce un orden que los nativos detectan de inmediato como incorrecto. La herramienta aplica reglas por locale para que los nombres se ordenen como espera un hablante nativo.",
            "El CJK tiene sus propias convenciones: el chino ordena por pinyin en la mayoría de contextos modernos y por trazos en los diccionarios. El kana japonés sigue el orden gojūon. La collación perfecta para cada idioma es un pozo sin fondo, pero acertar con los diacríticos latinos cubre la mayoría de las listas cotidianas.",
          ],
        },
        {
          heading: "Cliente por diseño",
          paragraphs: [
            "La ordenación ocurre por completo en tu navegador: dividir en líneas, comparar, reordenar. Sin subida — para listas de clientes, datos de RRHH o listados sin publicar, una página de ordenación que no envía nada es la única aceptable.",
            "El rendimiento no es problema a escala realista: cien mil líneas se ordenan en un parpadeo, porque la comparación subyacente es código nativo optimizado. Se preserva la estabilidad: las líneas que comparan igual mantienen su orden original en vez de barajarse, lo que importa cuando el archivo es un registro donde las líneas posteriores llevan estado más reciente.",
            "Nada persiste entre recargas. Ordena, copia el resultado, sigue — la entrada nunca se convierte en un artefacto almacenado en ningún sitio.",
          ],
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
      deepDive: [
        {
          heading: "Ordenar texto não é ordenar números",
          paragraphs: [
            "A ordem numérica e a lexicográfica discordam no básico: lexicograficamente, \"10\" vem antes de \"9\" porque \"1\" ordena antes de \"9\", caractere a caractere. Ordenar alfabeticamente uma lista de preços, versões ou números de capítulo produz o clássico 1, 10, 11, 2, 3 que ninguém quer. A ordenação consciente de números compara valores inteiros, não sequências de caracteres.",
            "Maiúsculas são outra bifurcação: a ordem ASCII coloca todas as maiúsculas antes de todas as minúsculas, então \"Zebra\" ordena antes de \"apple\". A comparação sem distinguir maiúsculas é o que a maioria espera de uma lista de palavras. A direção (ascendente/descendente) e a unicidade (manter duplicados ou colapsá-los) completam as opções.",
            "Artigos iniciais são uma decisão genuinamente editorial: títulos que começam com \"O\" ou \"The\" costumam ser arquivados pela segunda palavra. Uma ferramenta que oferece a opção vence a que te obriga a editar cada linha à mão primeiro.",
          ],
        },
        {
          heading: "Comparação por locale: por que é e å têm opinião",
          paragraphs: [
            "A ordenação por pontos de código trata letras acentuadas como estranhas: o \"å\" sueco ordena como se fosse \"a\" seguida de lixo, o \"ä\" alemão aterriza longe do \"a\", e o espanhol tradicionalmente trata \"ch\" e \"ll\" como letras do próprio alfabeto. A collation por locale (o algoritmo de colação Unicode, implementado em todo runtime moderno) conserta isso: em sueco, å ordena depois de z; na ordem de lista telefônica alemã, ä senta ao lado de a.",
            "Isso importa quando a lista tem nomes reais — clientes, cidades, índices de autores. Ordenar um diretório espanhol ou sueco por pontos de código crus produz uma ordem que nativos percebem imediatamente como errada. A ferramenta aplica regras por locale para que nomes ordenem como um falante nativo espera.",
            "CJK tem convenções próprias: o chinês ordena por pinyin na maioria dos contextos modernos e por traços em dicionários. O kana japonês segue a sequência gojūon. Collation perfeita para todo idioma é um poço sem fundo, mas acertar os diacríticos latinos cobre a maioria das listas do dia a dia.",
          ],
        },
        {
          heading: "Cliente por design",
          paragraphs: [
            "A ordenação acontece por completo no seu navegador: dividir em linhas, comparar, reordenar. Sem envio — para listas de clientes, dados de RH ou listagens não publicadas, uma página de ordenação que não envia nada é a única aceitável.",
            "Desempenho não é problema em escala realista: cem mil linhas ordenam num piscar, porque a comparação por baixo é código nativo otimizado. Estabilidade é preservada: linhas que comparam iguais mantêm a ordem original em vez de se embaralharem, o que importa quando o arquivo é um log onde linhas posteriores carregam estado mais recente.",
            "Nada persiste entre recargas. Ordene, copie o resultado, siga em frente — a entrada nunca vira um artefato armazenado em lugar algum.",
          ],
        },
      ],
    },
  },
});
