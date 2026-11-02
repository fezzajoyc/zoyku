import { CaseConverter } from "../_engines/case-converter";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "case-converter",
  category: "text",
  icon: "text",
  featured: true,
  engine: { component: CaseConverter },
  related: ["word-counter", "text-cleaner", "slug-generator", "text-sorter"],
  copy: {
    en: {
      name: "Case Converter",
      tagline: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case and 6 more styles — live.",
      intro: [
        "Eleven case styles on one page: sentence case for writing, Title Case for headlines, camelCase / PascalCase / snake_case / kebab-case / CONSTANT_CASE for code, plus alternating and inverse for fun.",
        "Everything recalculates as you type — no button mashing, and the conversion never leaves your browser.",
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
