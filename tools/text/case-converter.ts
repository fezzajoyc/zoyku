import { CaseConverter } from "../_engines/case-converter";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "case-converter",
  category: "text",
  icon: "text",
  featured: true,
  engine: { component: CaseConverter },
  related: ["word-counter", "text-cleaner", "slug-generator", "text-sorter", "text-diff", "remove-extra-spaces", "remove-duplicate-lines", "lorem-ipsum-generator", "sentence-counter", "text-to-binary"],
  copy: {
    en: {
      name: "Case Converter",
      tagline: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case and 6 more styles — live.",
      intro: [
        "Eleven case styles on one page: sentence case for body writing, Title Case for headlines, lowercase and UPPERCASE for quick fixes, camelCase / PascalCase / snake_case / kebab-case / CONSTANT_CASE for code identifiers, plus alternating and inverse case for tests and jokes.",
        "Title Case follows the editorial small-words convention: articles, short conjunctions and prepositions (a, an, the, and, of, to, vs …) stay lowercase unless they open or close the title. Sentence case re-capitalizes after Western (. ! ?) and full-width (。！？) sentence marks, so mixed Chinese-English text is handled too.",
        "Code styles split identifiers intelligently: camelCase boundaries such as parseHTMLValue are split before conversion, and accented Latin letters (é, ñ, ü) are kept rather than discarded. Alternating case alternates letters only — punctuation and digits keep their positions — and inverse swaps each character's case in place.",
        "Everything recalculates as you type with no button mashing, and the conversion never leaves your browser. Compared with find-and-replace or hand-written regexes, this applies all eleven transforms at once so you can compare outputs side by side before pasting.",
      ],
      steps: [
        "Paste or type your text into the input box.",
        "Click a style button — the output updates instantly.",
        "Copy the result or switch to another style to compare.",
      ],
      faqs: [
        {
          q: "What is the difference between camelCase and PascalCase?",
          a: "camelCase starts lowercase (myVariableName), PascalCase starts uppercase (MyVariableName). Both strip spaces and underscores from the words.",
        },
        {
          q: "Does Title Case keep small words lowercase?",
          a: "Yes. Articles and short prepositions (a, the, of, in…) stay lowercase unless they are the first or last word, following common editorial style.",
        },
        {
          q: "Is my text uploaded anywhere?",
          a: "No. The conversion happens locally in your browser with JavaScript — nothing is sent to any server.",
        },
      ],
    },
    zh: {
      name: "大小写转换",
      tagline: "大写、小写、标题式、camelCase、snake_case 等 11 种大小写风格实时互转。",
      intro: [
        "一页提供 11 种大小写风格:写作用的句首大写、标题用的 Title Case,写代码用的 camelCase / PascalCase / snake_case / kebab-case / CONSTANT_CASE,还有大小写交替和互换。",
        "输入即转换,无需反复点按钮,整个过程都在你的浏览器里完成。",
      ],
      steps: [
        "把文本粘贴或输入到输入框。",
        "点击风格按钮,输出即时更新。",
        "复制结果,或切换其他风格对比。",
      ],
      faqs: [
        {
          q: "camelCase 和 PascalCase 有什么区别?",
          a: "camelCase 首字母小写(myVariableName),PascalCase 首字母大写(MyVariableName)。两者都会去掉空格和下划线再拼接单词。",
        },
        {
          q: "Title Case 会保留小词的小写吗?",
          a: "会。冠词和短介词(a、the、of、in 等)保持小写,除非它们位于开头或结尾,符合通行编辑规范。",
        },
        {
          q: "文本会被上传吗?",
          a: "不会。转换由浏览器里的 JavaScript 本地完成,不会发送到任何服务器。",
        },
      ],
      deepDive: [
        {
          heading: "大小写转换比看上去难",
          paragraphs: [
            "大小写转换看似一一对应,Unicode 里却埋着不少特例。德语 ß 转大写会变成两个字符的 \"SS\"——一个字母变两个,长度改变且不可逆。土耳其语的 ı 和 İ 更是出名到有了专属 bug 名:对土耳其语文本套用英文大小写规则,会把 İstanbul 变成 Istanbul 之类的错字。本工具使用标准 Unicode 大小写映射,对国际化文本是正确的默认。",
            "希腊语等文字也有自己的边界情况:大写 sigma 统一转成 Σ,而小写化时词尾 sigma 理论上应还原为 ς 而非 σ。要做到完美需要多数工具都省略的 locale 感知算法;实际结论是——没有任何大小写转换普遍可逆,确认结果之前保留原文。",
            "因为映射不是一一对应,转换器无法总是自我还原:strafe 这类词大写再小写,ß 就永久消失了。编辑源码时,先在副本上做大小写改动,diff 确认后再提交。",
          ],
        },
        {
          heading: "Title Case 与小词规则",
          paragraphs: [
            "标题式大写不是一条规则,而是一堆打架的风格指南:Chicago 把所有介词小写,AP 对四个字母以上的词大写,各家内部规范对 with、from、versus 也各执一词。本工具采用通行编辑约定——冠词、短连词和短介词(a、an、the、and、of、to、vs 等)保持小写,除非位于标题的开头或结尾——与大多数出版物实际排印一致。",
            "首词和尾词无论长短一律大写,工具还会在西式(. ! ?)和全角(。！？)句读符之后重新大写,中英混排的标题不会在第一个中文标点处断掉。",
            "如果目标风格的小词表不同,先转换再手工修那几个词即可——工具能到九成五,没有哪套自动规则能匹配所有出版社的词表。",
          ],
        },
        {
          heading: "代码命名风格与使用场景",
          paragraphs: [
            "编程风格需要的不只是改大小写,还有词边界识别:parseHTMLValue 这类 camelCase 标识符必须先拆词才能变成 snake_case。本工具按已有边界切分——大写字母、下划线、连字符和空格——五种代码风格(camelCase、PascalCase、snake_case、kebab-case、CONSTANT_CASE)之间可以干净往返。带重音的拉丁字母(é、ñ、ü)会被保留而不是剔除,对姓名和本地化字符串很重要。",
            "实际工作流是:贴入常量名或字段名,点目标风格,复制——比手动逐个改下划线快得多。写文章时,句首大写和 Title Case 覆盖正文与标题;交替大小写和反转主要用于测试界面在混合大小写下的渲染。",
            "和本站所有工具一样,整个转换在浏览器 JavaScript 里跑:私有仓库或客户项目的代码随便贴,因为不会有任何数据外发。",
          ],
        },
      ],
    },
    ja: {
      name: "ケース変換",
      tagline: "大文字・小文字・タイトルケース・camelCase・snake_case など 11 スタイルにリアルタイム変換。",
      intro: [
        "11 種類のケーススタイルを 1 ページで:文章向けのセンテンスケース、見出し向けのタイトルケース、コード向けの camelCase / PascalCase / snake_case / kebab-case / CONSTANT_CASE、さらに交互と反転。",
        "入力しながら即時変換。ボタン連打は不要で、変換はすべてブラウザ内で完結します。",
      ],
      steps: [
        "テキストを入力欄に入力または貼り付けます。",
        "スタイルボタンをクリックすると即座に変換されます。",
        "結果をコピーするか、別のスタイルに切り替えて比較します。",
      ],
      faqs: [
        {
          q: "camelCase と PascalCase の違いは?",
          a: "camelCase は先頭が小文字(myVariableName)、PascalCase は先頭が大文字(MyVariableName)。どちらも空白とアンダースコアを取り除いて連結します。",
        },
        {
          q: "タイトルケースで短い語は小文字のまま?",
          a: "はい。冠詞や短い前置詞(a、the、of、in など)は先頭・末尾以外では小文字のままです。一般的な編集スタイルに従っています。",
        },
        {
          q: "テキストはアップロードされますか?",
          a: "いいえ。変換はブラウザ内の JavaScript でローカルに行われ、サーバーには何も送信されません。",
        },
      ],
      deepDive: [
        {
          heading: "ケース変換は見た目より難しい",
          paragraphs: [
            "大小文字の変換は一対一の対応に見えて、Unicode には意図的な例外がいくつもあります。ドイツ語のエスツェット(ß)を大文字にすると 2 文字の \"SS\" になり、1 文字が 2 文字に増えて長さが変わり、元に戻せません。トルコ語の ı と İ は有名すぎて専用のバグ名があるほどで、英語式のルールを適用すると İstanbul が Istanbul になるなどの文字化けが起きます。このツールは標準の Unicode ケースマッピングを使い、国際対応テキストにはそれが正しい既定値です。",
            "ギリシャ語などにも固有の境界例があります。大文字のシグマは一律 Σ になりますが、小文字化では語尾のシグマは理想的には σ ではなく ς を返すべきです。完全を期すには多くのツールが省略するロケール対応アルゴリズムが必要です。実務上の結論は、普遍的に可逆なケース変換は存在しない、ということ。結果を確認するまで原文を残しておくのが安全です。",
            "対応が一対一でないため、変換器は必ずしも自己復元できません。straße を大文字→小文字と往復すると strasse になり、ß は失われたままです。ソースコードを編集する場合は、コピーに対してケース変更を行い、diff で確認してからコミットしてください。",
          ],
        },
        {
          heading: "タイトルケースと短い語のルール",
          paragraphs: [
            "見出しの大文字化は 1 つのルールではなく、対立するスタイルガイドの集まりです。Chicago はすべての前置詞を小文字にし、AP は 4 文字以上の語を大文字にし、社内規定は with、from、versus について意見が割れます。このツールは一般的な編集慣行——冠詞・短い接続詞・短い前置詞(a、an、the、and、of、to、vs など)は見出しの冒頭・末尾でなければ小文字のまま——に従っています。多くの出版物の実際の組版と一致します。",
            "最初と最後の語は長さに関係なく必ず大文字になります。さらに西式の文末記号(. ! ?)と全角(。！？)の後でも大文字へ戻すため、日英混在の見出しが最初の句読点で壊れることはありません。",
            "スタイルガイドが別の小語リストを要求する場合は、変換してから残りの数語を手で直してください。ツールで 9 前後まで仕上げられ、すべての出版社のリストに自動で合わせられるルールは存在しません。",
          ],
        },
        {
          heading: "コード識別子と使いどころ",
          paragraphs: [
            "プログラミング向けスタイルには、単なる大小変換ではなく語境界の検出が必要です。parseHTMLValue のような camelCase 識別子は、snake_case にする前に分割しなければなりません。このツールは既存の境界——大文字、アンダースコア、ハイフン、空白——で分割するため、5 つのコードスタイル(camelCase、PascalCase、snake_case、kebab-case、CONSTANT_CASE)の間をきれいに行き来できます。アクセント付きラテン文字(é、ñ、ü)は削除せず保持され、人名やローカライズ文字列で重要です。",
            "実務の流れは、定数名やカラム名を貼り付け、対象スタイルをクリックし、コピーする——アンダースコアを手で直すよりはるかに速い。文章ならセンテンスケースとタイトルケースで本文と見出しをカバーし、交互・反転は UI が混在ケースをどう描画するかの確認に主に使います。",
            "このサイトの全ツールと同様、変換はすべてブラウザの JavaScript で動きます。非公開リポジトリやクライアント案件のコードも自由に貼り付けてください。データは一切外に出ません。",
          ],
        },
      ],
    },
    es: {
      name: "Convertidor de mayúsculas y minúsculas",
      tagline: "Convierte texto entre MAYÚSCULAS, minúsculas, Tipo Título, camelCase, snake_case y 6 estilos más.",
      intro: [
        "Once estilos en una página: tipo oración para escritura, Tipo Título para titulares, camelCase / PascalCase / snake_case / kebab-case / CONSTANT_CASE para código, más alternante e inverso.",
        "Todo se recalcula mientras escribes: sin pulsar botones una y otra vez, y la conversión nunca sale de tu navegador.",
      ],
      steps: [
        "Pega o escribe tu texto en el cuadro de entrada.",
        "Pulsa un botón de estilo: la salida se actualiza al instante.",
        "Copia el resultado o cambia a otro estilo para comparar.",
      ],
      faqs: [
        {
          q: "¿Qué diferencia hay entre camelCase y PascalCase?",
          a: "camelCase empieza en minúscula (miVariableNombre) y PascalCase en mayúscula (MiVariableNombre). Ambos eliminan espacios y guiones bajos.",
        },
        {
          q: "¿El Tipo Título mantiene minúsculas las palabras cortas?",
          a: "Sí. Artículos y preposiciones cortas (a, el, de, en…) van en minúscula salvo al principio o al final, según el estilo editorial habitual.",
        },
        {
          q: "¿Se sube mi texto a algún sitio?",
          a: "No. La conversión ocurre localmente en tu navegador con JavaScript: no se envía nada a ningún servidor.",
        },
      ],
      deepDive: [
        {
          heading: "Convertir mayúsculas es más difícil de lo que parece",
          paragraphs: [
            "Poner en mayúsculas parece un mapeo trivial uno a uno, pero Unicode guarda algunas sorpresas deliberadas. La es alemana (ß) se convierte en mayúscula en una secuencia de dos caracteres \"SS\": una letra pasa a dos, la longitud cambia y el proceso no es reversible. La i turca sin punto y la İ con punto son tan famosas que tienen un bug con nombre propio: aplicar reglas inglesas de mayúsculas a texto turco convierte İstanbul en Istanbul y produce errores parecidos. Esta herramienta aplica el mapeo estándar de Unicode, que es el valor por defecto correcto para texto internacional.",
            "El griego y otros alfabetos tienen sus propios casos límite: la sigma mayúscula se unifica en Σ, pero al pasar a minúsculas una sigma final debería idealmente devolver ς y no σ. La perfección exige algoritmos conscientes del idioma que la mayoría de herramientas omiten; la conclusión práctica es que ninguna conversión de mayúsculas es universalmente reversible, así que conserva el texto original hasta verificar el resultado.",
            "Como el mapeo no es uno a uno, el convertidor no siempre puede deshacerse a sí mismo: poner \"straße\" en mayúsculas y volver a minúsculas produce \"strasse\", con la ß perdida para siempre. Si editas código fuente, aplica los cambios en una copia y revisa el diff antes de confirmar.",
          ],
        },
        {
          heading: "Tipo Título, palabras cortas y guías de estilo",
          paragraphs: [
            "La capitalización de titulares no es una regla sino una familia de guías enfrentadas: Chicago pone en minúscula todas las preposiciones, AP capitaliza las palabras de cuatro letras o más, y los estilos internos discrepan sobre \"with\", \"from\" y \"versus\". Esta herramienta sigue la convención editorial común — artículos, conjunciones cortas y preposiciones cortas (a, an, the, and, of, to, vs…) van en minúscula salvo que abran o cierren el título — que coincide con lo que la mayoría de publicaciones imprimen de verdad.",
            "La primera y la última palabra siempre van en mayúscula sin importar su longitud, y la herramienta vuelve a capitalizar tras los signos de frase (. ! ? y también los de ancho completo 。！？), así que un titular mixto chino-inglés se divide bien en vez de romperse en el primer signo chino.",
            "Si tu guía de estilo pide otra lista de palabras cortas, convierte y corrige a mano las dos o tres que queden: la herramienta cubre casi todo, y ninguna regla automática iguala la lista de todas las editoriales.",
          ],
        },
        {
          heading: "Identificadores de código y dónde encaja",
          paragraphs: [
            "Los estilos de programación necesitan detectar límites de palabra, no solo cambiar cajas: un camelCase como parseHTMLValue debe dividirse antes de convertirse en snake_case. Esta herramienta parte por los límites existentes — mayúsculas, guiones bajos, guiones y espacios — así que las conversiones entre los cinco estilos de código (camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE) van y vuelven limpias. Las letras latinas acentuadas (é, ñ, ü) se conservan en vez de eliminarse, lo cual importa para nombres y cadenas localizadas.",
            "El flujo real es: pega la constante o el nombre de columna, pulsa el estilo objetivo, copia — mucho más rápido que editar guiones bajos a mano. Para prosa, el tipo oración y el Tipo Título cubren cuerpo y titulares; el alternado y el inverso sirven sobre todo para probar cómo tu interfaz pinta cajas mezcladas.",
            "Como en todas las herramientas del sitio, la conversión entera corre en el JavaScript de tu navegador: pega código de un repositorio privado o de un cliente sin miedo, porque nada se transmite a ningún sitio.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de maiúsculas e minúsculas",
      tagline: "Converta texto entre MAIÚSCULAS, minúsculas, Tipo Título, camelCase, snake_case e mais 6 estilos.",
      intro: [
        "Onze estilos numa página: tipo sentença para escrita, Tipo Título para manchetes, camelCase / PascalCase / snake_case / kebab-case / CONSTANT_CASE para código, mais alternado e inverso.",
        "Tudo é recalculado enquanto você digita — sem ficar apertando botões — e a conversão nunca sai do seu navegador.",
      ],
      steps: [
        "Cole ou digite seu texto na caixa de entrada.",
        "Clique num botão de estilo — a saída atualiza na hora.",
        "Copie o resultado ou troque para outro estilo e compare.",
      ],
      faqs: [
        {
          q: "Qual a diferença entre camelCase e PascalCase?",
          a: "camelCase começa com minúscula (minhaVariavel), PascalCase com maiúscula (MinhaVariavel). Ambos removem espaços e underscores antes de juntar as palavras.",
        },
        {
          q: "O Tipo Título mantém palavras curtas em minúsculas?",
          a: "Sim. Artigos e preposições curtas (a, o, de, em…) ficam em minúsculas, exceto na primeira ou última palavra, seguindo o estilo editorial comum.",
        },
        {
          q: "Meu texto é enviado para algum lugar?",
          a: "Não. A conversão acontece localmente no seu navegador com JavaScript — nada é enviado a nenhum servidor.",
        },
      ],
    },
  },
});
