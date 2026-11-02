import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "javascript-minifier",
  category: "developer",
  icon: "crop",
  engine: { component: DevCodeEngine, props: { mode: "js-minify", showSize: true } },
  related: ["css-minifier", "html-minifier", "json-minifier", "regex-tester"],
  copy: {
    en: {
      name: "JavaScript Minifier",
      tagline:
        "A conservative JavaScript minifier: strips comments and collapses blank lines, keeping line breaks — no risky rewrites, your code semantics stay untouched.",
      intro: [
        "This minifier does exactly two things: it removes // and /* */ comments (even inside gnarly files — strings, template literals including nested ${…} and regex literals are respected), and it collapses blank lines and indentation. Line breaks between statements are preserved, so automatic semicolon insertion keeps working exactly as before.",
        "It will never rename variables, inline code or merge statements — that is the job of a full build tool. What you get is a meaningfully smaller, safely minified file plus a live byte-savings readout, entirely in your browser.",
      ],
      steps: [
        "Paste your JavaScript into the input box.",
        "The minified output appears instantly, with input/output sizes and the percentage saved.",
        "Copy the compact script or clear the input to minify another file.",
      ],
      faqs: [
        {
          q: "Why does it keep line breaks instead of joining everything into one line?",
          a: "Deliberate choice. JavaScript relies on automatic semicolon insertion, and removing newlines can silently change what a program does. Keeping line breaks makes this minifier safe for code that never goes through a real bundler.",
        },
        {
          q: "How is this different from Terser or UglifyJS?",
          a: "Those parse and rewrite the AST: mangling names, removing dead code, inlining. Much smaller output, but a real build step. This tool only removes comments and blank lines — zero risk of behavior change, no build required.",
        },
        {
          q: "Is my code uploaded anywhere?",
          a: "No. Everything runs locally in your browser — your source never leaves the device.",
        },
      ],
    },
    zh: {
      name: "JavaScript 压缩",
      tagline: "保守的 JS 压缩:只去注释、折叠空行并保留换行——不做危险改写,语义分毫不差。适合没有构建流程的场景。",
      intro: [
        "这个压缩器只做两件事:移除 // 和 /* */ 注释(字符串、模板字符串(含嵌套 ${…})和正则字面量都会被正确跳过),并折叠空行和缩进。语句之间的换行会保留,因此自动分号插入(ASI)的行为和原来完全一样。",
        "它绝不重命名变量、内联代码或合并语句——那是完整构建工具的工作。你得到的是一个明显变小、绝对安全的压缩文件,外加实时字节节省读数,全程在浏览器中完成。",
      ],
      steps: [
        "把 JavaScript 粘贴到输入框。",
        "压缩结果即时出现,并显示输入/输出大小和节省百分比。",
        "复制压缩后的脚本,或清空输入压缩下一个文件。",
      ],
      faqs: [
        {
          q: "为什么保留换行,不把所有语句并成一行?",
          a: "这是刻意选择。JavaScript 依赖自动分号插入(ASI),删掉换行可能悄悄改变程序行为。保留换行让这个压缩器对没走真实构建流程的代码也安全。",
        },
        {
          q: "和 Terser、UglifyJS 有什么区别?",
          a: "它们会解析并重写 AST:混淆变量名、删除死代码、内联展开——输出更小,但需要真正的构建步骤。本工具只删注释和空行——行为零风险,也无需构建。",
        },
        {
          q: "代码会被上传吗?",
          a: "不会。一切都在浏览器本地运行,源码不离开设备。",
        },
      ],
    },
    ja: {
      name: "JavaScript ミニファイアー",
      tagline:
        "保守的な JS ミニファイアー:コメント除去と空行の折り畳みのみで改行は保持 — 危険な書き換えをせず、コードの意味はそのまま。ビルド不要の現場に。",
      intro: [
        "このミニファイアーは 2 つのことだけをします。// と /* */ のコメントを除去し(文字列・${…} を含むテンプレートリテラル・正規表現リテラルは正しく保護)、空行とインデントを折り畳みます。文の間の改行は保持されるため、自動セミコロン挿入(ASI)の挙動は以前とまったく同じです。",
        "変数名の変更・コードのインライン化・文の結合は絶対にしません。それは本格的なビルドツールの仕事です。手に入るのは、確実に小さく安全に圧縮されたファイルと、リアルタイムの節約バイト数表示だけ。すべてブラウザ内で完結します。",
      ],
      steps: [
        "JavaScript を入力欄に貼り付けます。",
        "圧縮結果が即座に表示され、入力/出力サイズと節約率も出ます。",
        "圧縮後のスクリプトをコピーするか、入力をクリアして次のファイルへ。",
      ],
      faqs: [
        {
          q: "なぜ改行を残して 1 行に結合しないのですか?",
          a: "意図的な選択です。JavaScript は自動セミコロン挿入に依存し、改行を削除するとプログラムの動作が静かに変わる可能性があります。改行を残すことで、本格的なバンドラーを通らないコードでも安全に使えます。",
        },
        {
          q: "Terser や UglifyJS との違いは?",
          a: "それらは AST を解析・書き換えます(名前の短縮、デッドコード除去、インライン化)。出力はさらに小さい一方、本物のビルド工程が必要です。このツールはコメントと空行だけを除去 — 挙動変化のリスクはゼロで、ビルドも不要です。",
        },
        {
          q: "コードはどこかにアップロードされますか?",
          a: "いいえ。すべてブラウザ内でローカルに実行され、ソースは端末の外に出ません。",
        },
      ],
    },
    es: {
      name: "Minificador JavaScript",
      tagline:
        "Un minificador JS conservador: elimina comentarios y colapsa líneas en blanco conservando los saltos — sin reescrituras arriesgadas, tu código se comporta igual.",
      intro: [
        "Este minificador hace exactamente dos cosas: elimina los comentarios // y /* */ (respetando cadenas, plantillas literales con ${…} anidado y expresiones regulares) y colapsa líneas en blanco e indentación. Los saltos entre sentencias se conservan, así que la inserción automática de punto y coma sigue funcionando igual que siempre.",
        "Nunca renombra variables, inlinea código ni fusiona sentencias — eso es trabajo de una herramienta de build completa. Obtienes un archivo claramente más pequeño y minificado con seguridad, más un indicador de bytes ahorrados, todo en tu navegador.",
      ],
      steps: [
        "Pega tu JavaScript en el cuadro de entrada.",
        "La salida minificada aparece al instante, con tamaños de entrada/salida y el porcentaje ahorrado.",
        "Copia el script compacto o borra la entrada para minificar otro archivo.",
      ],
      faqs: [
        {
          q: "¿Por qué conserva los saltos de línea en vez de unir todo en una línea?",
          a: "Es una decisión deliberada. JavaScript depende de la inserción automática de punto y coma, y eliminar saltos puede cambiar silenciosamente el comportamiento de un programa. Conservarlos hace este minificador seguro para código que no pasa por un bundler real.",
        },
        {
          q: "¿En qué se diferencia de Terser o UglifyJS?",
          a: "Ellos analizan y reescriben el AST: ofuscan nombres, eliminan código muerto, inlinean. Salida más pequeña, pero un paso de build real. Esta herramienta solo quita comentarios y líneas en blanco: riesgo cero de cambiar el comportamiento y sin build.",
        },
        {
          q: "¿Mi código se sube a algún sitio?",
          a: "No. Todo corre localmente en tu navegador — tu fuente nunca sale del dispositivo.",
        },
      ],
    },
    pt: {
      name: "Minificador JavaScript",
      tagline:
        "Um minificador JS conservador: remove comentários e colapsa linhas em branco mantendo as quebras — sem reescritas arriscadas, sua semântica fica intacta.",
      intro: [
        "Este minificador faz exatamente duas coisas: remove comentários // e /* */ (respeitando strings, template literals com ${…} aninhado e regex) e colapsa linhas em branco e indentação. As quebras entre statements são preservadas, então a inserção automática de ponto e vírgula continua funcionando igual.",
        "Ele nunca renomeia variáveis, inlineia código ou funde statements — isso é papel de uma ferramenta de build completa. Você recebe um arquivo bem menor e minificado com segurança, mais um indicador de bytes economizados, tudo no seu navegador.",
      ],
      steps: [
        "Cole seu JavaScript na caixa de entrada.",
        "A saída minificada aparece na hora, com tamanhos de entrada/saída e a porcentagem economizada.",
        "Copie o script compacto ou limpe a entrada para minificar outro arquivo.",
      ],
      faqs: [
        {
          q: "Por que manter as quebras de linha em vez de juntar tudo em uma linha?",
          a: "Escolha deliberada. JavaScript depende da inserção automática de ponto e vírgula, e remover quebras pode mudar silenciosamente o comportamento do programa. Mantê-las torna este minificador seguro para código que não passa por um bundler real.",
        },
        {
          q: "Qual a diferença para Terser ou UglifyJS?",
          a: "Eles analisam e reescrevem a AST: encurtam nomes, removem código morto, fazem inlining. Saída menor, mas exige um build de verdade. Esta ferramenta só remove comentários e linhas em branco — risco zero de mudança de comportamento e sem build.",
        },
        {
          q: "Meu código é enviado para algum lugar?",
          a: "Não. Tudo roda localmente no seu navegador — seu código-fonte nunca sai do dispositivo.",
        },
      ],
    },
  },
});
