import { CalcEngineScientific } from "../_engines/calc-engine-scientific";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "scientific-calculator",
  category: "utility",
  icon: "code",
  engine: { component: CalcEngineScientific },
  related: ["percentage-calculator", "binary-converter", "emi-calculator", "roman-numeral", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Scientific Calculator",
      tagline: "A full scientific calculator in your browser: trig, log, ln, powers and roots with a live result — no eval, no server, no tracking.",
      intro: [
        "A keypad plus a typeable expression line: sin, cos, tan (DEG/RAD), log₁₀, ln, square root, squares, arbitrary powers, parentheses, π and e. The result preview updates as you type, and = folds it back into the expression for chained calculations.",
        "Expressions are parsed by a hand-written recursive-descent evaluator built for this site — JavaScript's eval and Function constructor are never used, and nothing is sent anywhere. Implicit multiplication (2π, 3(4+1)) works out of the box.",
        "The evaluator is a hand-written recursive-descent parser with proper operator precedence, right-associative powers and implicit multiplication (2π, 3(4+1)) — JavaScript's eval and Function constructor are never called, so an expression cannot execute arbitrary code. Trig functions honor the DEG/RAD toggle.",
        "Compared with shipping a formula to a server, everything evaluates in your browser instantly and works offline, and the expression line stays editable so mistakes are fixed, not retyped. Chain results with = and continue on the same line. Expect ordinary floating-point artifacts — 0.1 + 0.2 shows as 0.30000000000000004, which is IEEE 754 behavior, not a bug.",
      ],
      steps: [
        "Tap the keypad or type an expression with your keyboard.",
        "Toggle DEG/RAD for trigonometric functions as needed.",
        "Press = to commit the previewed result, then keep calculating on it.",
      ],
      faqs: [
        {
          q: "How are the expressions evaluated?",
          a: "By a small tokenizer and recursive-descent parser written into the page: numbers, constants, functions, parentheses, unary minus, postfix % and x², right-associative powers, and implicit multiplication between adjacent values. Invalid input simply shows an error instead of executing anything.",
        },
        {
          q: "How do I get a tangent of 45 degrees?",
          a: "Leave the DEG toggle active (it is the default), press tan, then 45 and =. For radians — e.g. tan(π/4) — switch to RAD and type tan(π/4) directly.",
        },
        {
          q: "Why is my result shown with limited digits?",
          a: "Results are rounded to 12 significant digits to hide floating-point noise such as 0.30000000000000004. Precision beyond 12 digits is rarely meaningful on binary floating-point hardware anyway.",
        },
      ],
    },
    zh: {
      name: "科学计算器",
      tagline: "浏览器里的科学计算器:三角函数、对数、幂和开方,结果实时预览——不用 eval、不联网、零追踪。",
      intro: [
        "键盘加可输入的表达式行:sin、cos、tan(DEG/RAD)、log₁₀、ln、平方根、平方、任意次幂、括号、π 和 e。结果随输入实时预览,按 = 可把结果并入表达式继续计算。",
        "表达式由本站手写的递归下降解析器求值——全程不使用 JavaScript 的 eval 和 Function 构造器,也不发送任何数据。隐式乘法(2π、3(4+1))开箱即用。",
      ],
      steps: [
        "点击键盘或直接用电脑键盘输入表达式。",
        "按需切换 DEG/RAD 以匹配三角函数单位。",
        "按 = 确认预览结果,然后可以继续在其上计算。",
      ],
      faqs: [
        {
          q: "表达式是怎么求值的?",
          a: "由页面内置的小型词法分析器和递归下降解析器完成:数字、常量、函数、括号、一元负号、后缀 % 和 x²、右结合的幂运算,以及相邻值之间的隐式乘法。非法输入只会显示错误,不会执行任何东西。",
        },
        {
          q: "怎么求 45 度的正切?",
          a: "保持 DEG 开关打开(默认即是),按 tan,再按 45 和 = 即可。需要弧度——例如 tan(π/4)——时切到 RAD 直接输入 tan(π/4)。",
        },
        {
          q: "为什么结果只显示有限位数?",
          a: "结果按 12 位有效数字四舍五入,以隐藏 0.30000000000000004 这类浮点噪声。二进制浮点硬件上超过 12 位的精度本来就没有实际意义。",
        },
      ],
    },
    ja: {
      name: "関数電卓",
      tagline: "ブラウザで使える関数電卓:三角関数・対数・べき乗・平方根をリアルタイム計算。eval 不使用、サーバー通信ゼロ。",
      intro: [
        "テンキーに加えて入力可能な式行を備えます。sin・cos・tan(DEG/RAD)、log₁₀、ln、平方根、2 乗、任意のべき乗、括弧、π と e。結果は入力中もプレビューされ、= で式に取り込んで連続計算できます。",
        "式はこのサイト専用に書かれた再帰下降パーサーで評価します。JavaScript の eval や Function は一切使わず、データ送信もありません。省略乗算(2π、3(4+1))もそのまま動きます。",
      ],
      steps: [
        "キーパッドをタップするか、キーボードで式を入力します。",
        "三角関数に合わせて DEG/RAD を切り替えます。",
        "= を押してプレビューの結果を確定し、そのまま続けて計算します。",
      ],
      faqs: [
        {
          q: "式はどのように評価されますか?",
          a: "ページ内に実装した小さな字句解析器と再帰下降パーサーによります。数値・定数・関数・括弧・単項マイナス・後置 % と x²・右結合のべき乗・隣接値の省略乗算に対応します。不正な入力は何も実行せずエラーを表示するだけです。",
        },
        {
          q: "tan 45° を出すには?",
          a: "DEG を有効のまま(既定です)tan、45、= の順に押します。ラジアンで計算する場合(例:tan(π/4))は RAD に切り替えて直接 tan(π/4) と入力します。",
        },
        {
          q: "結果の桁数が限られるのはなぜですか?",
          a: "0.30000000000000004 のような浮動小数点のノイズを消すため、結果は有効数字 12 桁に丸めて表示します。2 進浮動小数点では 12 桁を超える精度に実質的な意味はほとんどありません。",
        },
      ],
    },
    es: {
      name: "Calculadora científica",
      tagline: "Una calculadora científica completa en su navegador: trigonometría, log, ln, potencias y raíces con resultado en vivo, sin eval ni servidor.",
      intro: [
        "Teclado en pantalla más una línea de expresión tecleable: sen, cos, tan (DEG/RAD), log₁₀, ln, raíz cuadrada, cuadrados, potencias arbitrarias, paréntesis, π y e. El resultado se previsualiza mientras escribe, y = lo reincorpora a la expresión para seguir calculando.",
        "Las expresiones las evalúa un analizador descendente escrito a mano para este sitio: nunca se usan eval ni el constructor Function, y no se envía nada a ningún sitio. La multiplicación implícita (2π, 3(4+1)) funciona de serie.",
      ],
      steps: [
        "Pulse el teclado en pantalla o escriba la expresión con el suyo.",
        "Cambie entre DEG y RAD según las funciones trigonométricas.",
        "Pulse = para confirmar el resultado previsto y continuar operando con él.",
      ],
      faqs: [
        {
          q: "¿Cómo se evalúan las expresiones?",
          a: "Con un pequeño tokenizador y un analizador descendente incluidos en la página: números, constantes, funciones, paréntesis, menos unario, % y x² posfijos, potencias asociativas por la derecha y multiplicación implícita entre valores contiguos. Una entrada inválida solo muestra un error, no ejecuta nada.",
        },
        {
          q: "¿Cómo obtengo la tangente de 45 grados?",
          a: "Deje activado DEG (es el valor por defecto), pulse tan, después 45 y =. Para radianes — por ejemplo tan(π/4) — cambie a RAD y escriba tan(π/4) directamente.",
        },
        {
          q: "¿Por qué el resultado tiene dígitos limitados?",
          a: "Los resultados se redondean a 12 cifras significativas para ocultar el ruido de coma flotante tipo 0,30000000000000004. Más de 12 dígitos rara vez significa algo en hardware binario de coma flotante.",
        },
      ],
    },
    pt: {
      name: "Calculadora científica",
      tagline: "Uma calculadora científica completa no navegador: trig, log, ln, potências e raízes com resultado ao vivo — sem eval, sem servidor, sem rastreio.",
      intro: [
        "Teclado na tela mais uma linha de expressão digitável: sen, cos, tan (DEG/RAD), log₁₀, ln, raiz quadrada, quadrados, potências arbitrárias, parênteses, π e e. O resultado é pré-visualizado enquanto você digita, e = o reincorpora à expressão para continuar calculando.",
        "As expressões são avaliadas por um analisador descendente escrito à mão para este site — eval e Function nunca são usados, e nada é enviado a lugar algum. Multiplicação implícita (2π, 3(4+1)) funciona de cara.",
      ],
      steps: [
        "Toque no teclado da tela ou digite a expressão pelo teclado físico.",
        "Alterne DEG/RAD conforme as funções trigonométricas.",
        "Pressione = para confirmar o resultado previsto e continuar calculando sobre ele.",
      ],
      faqs: [
        {
          q: "Como as expressões são avaliadas?",
          a: "Por um tokenizador e um analisador descendente escritos na própria página: números, constantes, funções, parênteses, menos unário, % e x² pós-fixos, potências associativas à direita e multiplicação implícita entre valores adjacentes. Entrada inválida só mostra erro, não executa nada.",
        },
        {
          q: "Como obtenho a tangente de 45 graus?",
          a: "Deixe o DEG ativo (é o padrão), pressione tan, depois 45 e =. Para radianos — por exemplo tan(π/4) — mude para RAD e digite tan(π/4) direto.",
        },
        {
          q: "Por que o resultado aparece com dígitos limitados?",
          a: "Os resultados são arredondados para 12 algarismos significativos para esconder ruídos de ponto flutuante como 0,30000000000000004. Mais de 12 dígitos raramente significa algo em hardware binário de ponto flutuante.",
        },
      ],
    },
  },
});
