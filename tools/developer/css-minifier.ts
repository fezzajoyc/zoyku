import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "css-minifier",
  category: "developer",
  icon: "crop",
  engine: { component: DevCodeEngine, props: { mode: "css-minify", showSize: true } },
  related: ["html-minifier", "javascript-minifier", "json-minifier", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "url-encoder", "url-decoder"],
  copy: {
    en: {
      name: "CSS Minifier",
      tagline:
        "Minify CSS online: remove comments and needless spaces to cut stylesheet size for faster loads. Instant, private, and safe for your rules.",
      intro: [
        "Paste any stylesheet and get a compact one-line version in real time: comments are stripped, redundant whitespace collapses, and separators tighten up — while the contents of strings, url() values and your selector/property semantics remain exactly as written.",
        "Use it to prepare critical CSS, slim down a theme before committing, or check how many bytes a cleanup would actually save. The live size readout shows input size, output size and the percentage saved.",
      ],
      steps: [
        "Paste your CSS into the input box.",
        "The minified output appears instantly, with the size saved shown below.",
        "Copy the compact stylesheet or clear the input to minify another file.",
      ],
      faqs: [
        {
          q: "Will minification change how my CSS behaves?",
          a: "No. Only comments and whitespace are removed — and even those carefully: strings and url() contents are preserved byte-for-byte, so content values and data URIs stay intact.",
        },
        {
          q: "Does it optimize colors, merge rules or autoprefix?",
          a: "No — this is a safe, syntax-level minifier. Structural optimization (merging duplicate rules, shortening colors) needs a full postprocessor; this tool guarantees zero semantic change.",
        },
        {
          q: "Where does my CSS go?",
          a: "Nowhere. Minification runs locally in your browser; nothing is uploaded or stored.",
        },
      ],
    },
    zh: {
      name: "CSS 压缩",
      tagline: "在线压缩 CSS:去掉注释和多余空白,减小样式表体积、加快页面加载。即时、私密、规则零改动,数据不上传。",
      intro: [
        "粘贴任意样式表,实时得到紧凑的单行版本:注释被移除,冗余空白被折叠,分隔符被收紧——而字符串、url() 的内容以及选择器/属性的语义与原文完全一致。",
        "适合准备关键 CSS、提交前给主题瘦身,或者看看一次清理到底能省多少字节。实时大小读数显示输入大小、输出大小和节省的百分比。",
      ],
      steps: [
        "把 CSS 粘贴到输入框。",
        "压缩结果即时出现,下方显示节省的比例。",
        "复制紧凑样式表,或清空输入压缩下一个文件。",
      ],
      faqs: [
        {
          q: "压缩会改变 CSS 的表现吗?",
          a: "不会。只移除注释和空白——而且处理得很小心:字符串和 url() 的内容逐字节保留,content 值和 data URI 完整无损。",
        },
        {
          q: "会做颜色优化、规则合并或自动加前缀吗?",
          a: "不会——这是语法层面的安全压缩器。结构性优化(合并重复规则、缩短颜色值)需要完整的后处理器;本工具保证零语义变化。",
        },
        {
          q: "我的 CSS 会去哪里?",
          a: "哪儿也不去。压缩在浏览器本地运行,不上传、不存储。",
        },
      ],
    },
    ja: {
      name: "CSS ミニファイアー",
      tagline:
        "CSS をオンラインで圧縮:コメントと余分な空白を取り除き、スタイルシートを軽量化して表示を高速化。プライベートで安全、アップロードは一切ありません。",
      intro: [
        "スタイルシートを貼り付けると、リアルタイムでコンパクトな 1 行版に。コメントの除去・冗長な空白の折り畳み・区切りの整形を行いますが、文字列や url() の内容、セレクタとプロパティの意味は書いたまま保たれます。",
        "クリティカル CSS の準備、コミット前のテーマ軽量化、クリーンアップで実際に何バイト節約できるかの確認に使えます。入力サイズ・出力サイズ・節約率を常時表示します。",
      ],
      steps: [
        "CSS を入力欄に貼り付けます。",
        "圧縮結果が即座に表示され、節約率も下部に出ます。",
        "圧縮後のスタイルシートをコピーするか、入力をクリアして次のファイルへ。",
      ],
      faqs: [
        {
          q: "圧縮すると CSS の挙動は変わりますか?",
          a: "変わりません。コメントと空白を取り除くだけです。しかも慎重に:文字列と url() の内容はバイト単位で保持され、content の値や data URI もそのままです。",
        },
        {
          q: "色の最適化やルール統合、自動プレフィックスもしますか?",
          a: "しません。構文レベルの安全な圧縮に特化しています。構造の最適化(重複ルールの統合、色の短縮)には本格的なポストプロセッサが必要です。このツールは意味の変化ゼロを保証します。",
        },
        {
          q: "CSS はどこかへ送られますか?",
          a: "どこへも行きません。圧縮はブラウザ内でローカルに実行され、アップロードも保存もありません。",
        },
      ],
    },
    es: {
      name: "Minificador CSS",
      tagline:
        "Minifica CSS en línea: elimina comentarios y espacios innecesarios para aligerar tus hojas de estilo y cargar más rápido. Instantáneo, privado y sin cambios en tus reglas.",
      intro: [
        "Pega cualquier hoja de estilos y obtén en tiempo real una versión compacta de una línea: se quitan los comentarios, el espacio redundante se colapsa y los separadores se ajustan — mientras las cadenas, los valores url() y la semántica de selectores y propiedades quedan tal cual.",
        "Úsalo para preparar CSS crítico, adelgazar un tema antes de hacer commit o comprobar cuántos bytes ahorraría una limpieza. El indicador muestra tamaño de entrada, de salida y el porcentaje ahorrado.",
      ],
      steps: [
        "Pega tu CSS en el cuadro de entrada.",
        "La salida minificada aparece al instante, con el ahorro indicado debajo.",
        "Copia la hoja compacta o borra la entrada para minificar otro archivo.",
      ],
      faqs: [
        {
          q: "¿La minificación cambia el comportamiento del CSS?",
          a: "No. Solo se eliminan comentarios y espacios — y con cuidado: las cadenas y el contenido de url() se conservan byte a byte, así que los content y los data URI quedan intactos.",
        },
        {
          q: "¿Optimiza colores, fusiona reglas o autoprefija?",
          a: "No: es un minificador seguro a nivel sintáctico. La optimización estructural (fusionar reglas duplicadas, acortar colores) requiere un postprocesador completo; esta herramienta garantiza cero cambios semánticos.",
        },
        {
          q: "¿Adónde va mi CSS?",
          a: "A ninguna parte. La minificación corre localmente en tu navegador; nada se sube ni se almacena.",
        },
      ],
    },
    pt: {
      name: "Minificador CSS",
      tagline:
        "Minifique CSS on-line: remova comentários e espaços desnecessários para deixar as folhas de estilo mais leves e o carregamento mais rápido. Nada é enviado.",
      intro: [
        "Cole qualquer folha de estilos e receba em tempo real uma versão compacta em uma linha: comentários saem, espaços redundantes colapsam e separadores encolhem — enquanto strings, valores de url() e a semântica de seletores e propriedades ficam exatamente como escritos.",
        "Use para preparar CSS crítico, enxugar um tema antes do commit ou ver quantos bytes uma limpeza realmente economizaria. O indicador mostra tamanho de entrada, de saída e a porcentagem economizada.",
      ],
      steps: [
        "Cole seu CSS na caixa de entrada.",
        "A saída minificada aparece na hora, com a economia indicada abaixo.",
        "Copie a folha compacta ou limpe a entrada para minificar outro arquivo.",
      ],
      faqs: [
        {
          q: "A minificação muda o comportamento do CSS?",
          a: "Não. Apenas comentários e espaços são removidos — e com cuidado: strings e o conteúdo de url() são preservados byte a byte, então content e data URIs ficam intactos.",
        },
        {
          q: "Ela otimiza cores, funde regras ou adiciona prefixos?",
          a: "Não — é um minificador seguro, a nível de sintaxe. Otimização estrutural (fundir regras duplicadas, encurtar cores) exige um pós-processador completo; esta ferramenta garante zero mudança semântica.",
        },
        {
          q: "Para onde vai meu CSS?",
          a: "Para lugar nenhum. A minificação roda localmente no seu navegador; nada é enviado ou armazenado.",
        },
      ],
    },
  },
});
