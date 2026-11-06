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
      deepDive: [
        {
          heading: "Operator precedence and why −2² equals −4",
          paragraphs: [
            "A calculator's job is not arithmetic — it is deciding what an expression means. This evaluator follows the mathematical convention you learned in school: parentheses first, then unary minus, then postfix operations like % and x², then powers, then multiplication and division, then addition and subtraction. Getting this order right is exactly the difference between a calculator and a toy.",
            "One convention surprises people: 2^3^2 means 2^(3^2) = 512, not (2^3)^2 = 64. Exponentiation binds to the right, following standard mathematical practice — stacked powers are read top-down. Relatedly, −2² is −4, not 4, because the square applies to 2 before the unary minus does. Spreadsheets sometimes disagree with these conventions; this calculator matches the textbook.",
            "Implicit multiplication works between adjacent values — 2π, 3(4+1), (1+2)(3+4) all multiply without an explicit × sign. One deliberate subtlety: implicit multiplication binds more tightly than division in the same run, so 1/2π is read as 1/(2π) rather than (1/2)×π — the reading physicists and engineers intend when they write it inline.",
          ],
        },
        {
          heading: "Why there is no eval, and floating-point honesty",
          paragraphs: [
            "Most web calculators feed your expression into JavaScript's eval or the Function constructor — the browser parses the string as code and executes it. It is quick to build, but it means a crafted string can run arbitrary code, and it makes the tool's behavior depend on JavaScript quirks rather than calculator rules. This evaluator is a small tokenizer plus a recursive-descent parser written for the page: invalid input yields an error message, never an execution.",
            "Numbers are IEEE 754 double-precision floats, which is the honest description of what every mainstream calculator engine below the display layer does. That produces artifacts like 0.1 + 0.2 = 0.30000000000000004 — the decimal 0.1 has no exact binary representation, so the sum carries representation noise. Results here are rounded to 12 significant digits to suppress the noise, which is also why repeated operations do not visibly accumulate junk.",
            "Two honest limits: rounding beyond 12 digits is meaningless on binary hardware, so demanding more precision buys nothing; and trigonometric results inherit a few units in the last place even for exact angles, so tan of a near-right angle explodes by nature — the calculator reports the true floating-point behavior rather than papering over it.",
          ],
        },
        {
          heading: "Degrees, radians and the workflow of chaining",
          paragraphs: [
            "The DEG/RAD toggle is the single largest source of wrong trig answers anywhere, so it deserves a rule: DEG is the default because most people reaching for a calculator are working in degrees; RAD is for calculus-style math and anything expressed with π. tan(π/4) in DEG mode gives a wrong answer with full confidence — the calculator cannot know which you meant, so check the toggle before blaming the result.",
            "The live preview means the expression is always editable: fix a middle term and the whole result recomputes, instead of retyping into a stack-based calculator. Pressing = folds the result back into the expression line, so chaining — taking a result, multiplying, then taking a log — happens on one editable line rather than through memory registers.",
            "Everything runs locally in your browser: no expression or result is transmitted, and the page works offline once loaded. For calculations involving anything private — pricing, payroll, exam problems — that means the computation is yours alone. The related percentage-calculator and binary-converter handle the two jobs (percent arithmetic and base conversion) that a scientific keypad does awkwardly.",
          ],
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
      deepDive: [
        {
          heading: "运算优先级,以及为什么 −2² 等于 −4",
          paragraphs: [
            "计算器的工作不是算术,而是决定表达式是什么意思。本求值器遵循学校教的数学约定:先括号,再一元负号,然后是 % 和 x² 这类后缀运算,接着是幂,再是乘除,最后加减。这个顺序是否正确,正是\"计算器\"和\"玩具\"的分界线。",
            "有一个约定容易让人意外:2^3^2 表示 2^(3^2) = 512,而不是 (2^3)^2 = 64。幂运算按数学惯例向右结合——叠在一起的幂从上往下读。同理,−2² 是 −4 而不是 4,因为平方先作用于 2,一元负号最后才轮到。个别电子表格与这些约定不一致;本计算器与教科书一致。",
            "相邻的值之间可以用隐式乘法——2π、3(4+1)、(1+2)(3+4) 都不用写乘号。一个有意为之的细节:隐式乘法比同级连写中的除法结合得更紧,所以 1/2π 读作 1/(2π),而不是 (1/2)×π——这也是物理和工程人员把它写在一行时想表达的意思。",
          ],
        },
        {
          heading: "为什么不用 eval,以及浮点数的诚实",
          paragraphs: [
            "大多数网页计算器把你的表达式塞给 JavaScript 的 eval 或 Function 构造器——浏览器把字符串当代码解析执行。省事,但代价是构造出来的字符串能执行任意代码,而且工具行为取决于 JavaScript 的怪癖而不是计算器规则。本求值器是为页面手写的小型词法分析器加递归下降解析器:非法输入只会得到错误信息,永远不会执行。",
            "数字是 IEEE 754 双精度浮点数——这也是每一个主流计算器在显示层之下真实发生的事情。于是会出现 0.1 + 0.2 = 0.30000000000000004 这类现象:十进制 0.1 没有精确的二进制表示,求和便携带了表示噪声。本工具的结果四舍五入到 12 位有效数字来压制噪声,这也是重复运算不会 visibly 累积垃圾尾数的原因。",
            "两条诚实的边界:在二进制硬件上,超过 12 位的舍入毫无意义,追求更多位数买不到任何东西;三角函数即使输入精确角度,最后几位也可能相差几个单位——接近 90 度的正切本来就是爆炸性的,计算器如实报告浮点行为,而不是粉饰过去。",
          ],
        },
        {
          heading: "度与弧度,以及链式计算的用法",
          paragraphs: [
            "DEG/RAD 开关是全世界三角函数算错的第一大来源,值得立一条规矩:默认 DEG,因为伸手拿计算器的大多数人在用度;RAD 用于微积分式的问题和带 π 的表达式。DEG 模式下算 tan(π/4) 会错得理直气壮——计算器不可能知道你指哪个单位,怀疑结果之前先看开关。",
            "实时预览意味着表达式始终可编辑:改掉中间一项,整个结果重算,不用像栈式计算器那样推倒重来。按 = 会把结果并入表达式行,于是\"取一个结果、乘一下、再取对数\"的链式操作发生在同一行可编辑表达式上,而不需要借助存储寄存器。",
            "一切都在浏览器本地运行:表达式和结果都不发送,页面加载后离线可用。算涉及隐私的数字——报价、工资、考题——计算只属于你。相关的 percentage-calculator 和 binary-converter 承接科学键盘不擅长的两类活:百分比算术和进制转换。",
          ],
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
      deepDive: [
        {
          heading: "演算の優先順位と、なぜ −2² が −4 になるか",
          paragraphs: [
            "電卓の仕事は算術ではなく、式が何を意味するかを決めることです。この評価器は学校で習う数学の慣行に従います。まず括弧、次に単項マイナス、それから % や x² の後置演算、べき乗、乗除、最後に加減。この順序を守れるかどうかが、「電卓」と「おもちゃ」の分かれ目です。",
            "意外に思われやすい約束が一つ。2^3^2 は 2^(3^2) = 512 であって (2^3)^2 = 64 ではありません。べき乗は数学の標準に従って右結合で、積み重なったべきは上から読みます。同様に −2² は −4 であって 4 ではありません。2 乗が先に 2 にかかり、単項マイナスがその後だからです。表計算ソフトにはこの慣行と食い違うものがありますが、この電卓は教科書に合わせています。",
            "隣接する値の間では省略乗算が働きます。2π、3(4+1)、(1+2)(3+4) は × を書かなくても掛かります。意図的な細部が一つ。省略乗算は同じ連なりの中で除法より強く結合するため、1/2π は (1/2)×π ではなく 1/(2π) と読みます。物理や工学の人が行内に書くときに意図する読み方です。",
          ],
        },
        {
          heading: "eval を使わない理由と、浮動小数点の正直さ",
          paragraphs: [
            "多くのウェブ電卓は式を JavaScript の eval や Function に渡します。ブラウザが文字列をコードとして解析して実行するのです。作るのは楽ですが、細工した文字列が任意のコードを実行できてしまう上、電卓の規則ではなく JavaScript の癖に挙動が依存します。この評価器はページ用に書かれた小さな字句解析器と再帰下降パーサーです。不正な入力はエラーメッセージになるだけで、実行は決して起こりません。",
            "数値は IEEE 754 倍精度浮動小数点です。これは、主流の電卓が表示層の下で本当にやっていることの正直な説明でもあります。その結果、0.1 + 0.2 = 0.30000000000000004 のような現象が起きます。10 進の 0.1 は 2 進で正確に表せないため、和には表現のノイズが乗ります。ここでは結果を有効数字 12 桁に丸めてノイズを抑えており、繰り返し演算でもゴミの末尾が目に見えて蓄積しません。",
            "正直な限界が二つ。2 進ハードウェアでは 12 桁を超える丸めに意味がなく、もっと精度を求めても何も買えません。また三角関数は、正確な角度でも最後の数桁に数単位の誤差を持ち込みます。90 度に近い tan は本質的に爆発します。電卓は浮動小数点の実際の振る舞いを報告するのであって、飾り消しはしません。",
          ],
        },
        {
          heading: "度とラジアン、連続計算の流れ",
          paragraphs: [
            "DEG/RAD の切替は、世界中で三角関数の答えを間違える最大の原因です。だから規則を一つ。既定は DEG です。電卓に手を伸ばす人の大半は度を使っているからです。RAD は微積分風の問題や π を含む式のためのもの。DEG のまま tan(π/4) を計算すると、堂々と間違った答えが出ます。電卓はどちらを意図したか知り得ないので、結果を疑う前にスイッチを確認してください。",
            "ライブプレビューがあるので式は常に編集可能です。途中の項を直せば全体が再計算され、スタック式電卓のように打ち直す必要がありません。= を押すと結果が式行に取り込まれるので、「結果を出して掛けて、対数を取る」という連鎖がメモリレジスタを介さず、編集可能な 1 行の上で完結します。",
            "すべてはブラウザ内でローカルに動きます。式も結果も送信されず、ページは読み込み後オフラインで使えます。プライベートな数字——見積もり、給与、試験問題——の計算はあなたのものだけです。関連の percentage-calculator と binary-converter は、関数電卓のキーパッドが苦手な二つの仕事(パーセント計算と進法変換)を担当します。",
          ],
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
      deepDive: [
        {
          heading: "Precedencia de operadores y por qué −2² es −4",
          paragraphs: [
            "El trabajo de una calculadora no es la aritmética — es decidir qué significa una expresión. Este evaluador sigue la convención matemática que se aprende en la escuela: primero paréntesis, luego el menos unario, después las operaciones posfijas como % y x², luego potencias, luego multiplicación y división, y al final suma y resta. Respetar ese orden es exactamente la diferencia entre una calculadora y un juguete.",
            "Una convención sorprende: 2^3^2 significa 2^(3^2) = 512, no (2^3)^2 = 64. La potenciación asocia por la derecha, como manda la práctica matemática estándar — las potencias apiladas se leen de arriba abajo. En la misma línea, −2² es −4 y no 4, porque el cuadrado actúa sobre 2 antes que el menos unario. Algunas hojas de cálculo discrepan de estas convenciones; esta calculadora sigue al manual.",
            "La multiplicación implícita funciona entre valores contiguos — 2π, 3(4+1), (1+2)(3+4) se multiplican sin signo × explícito. Un detalle deliberado: la multiplicación implícita liga más fuerte que la división dentro de la misma cadena, así que 1/2π se lee 1/(2π) y no (1/2)×π — la lectura que físicos e ingenieros tienen en mente al escribirla en línea.",
          ],
        },
        {
          heading: "Por qué no hay eval, y la honestidad del punto flotante",
          paragraphs: [
            "La mayoría de calculadoras web alimentan su expresión al eval de JavaScript o al constructor Function — el navegador analiza la cadena como código y la ejecuta. Es rápido de construir, pero una cadena maliciosa puede ejecutar código arbitrario, y el comportamiento depende de peculiaridades de JavaScript en lugar de reglas de calculadora. Este evaluador es un pequeño tokenizador más un analizador descendente escritos para la página: la entrada inválida produce un mensaje de error, nunca una ejecución.",
            "Los números son flotantes de doble precisión IEEE 754, que es la descripción honesta de lo que todo motor de calculadora convencional hace bajo la capa de pantalla. Eso produce artefactos como 0,1 + 0,2 = 0,30000000000000004 — el decimal 0,1 no tiene representación binaria exacta, así que la suma arrastra ruido de representación. Los resultados se redondean a 12 cifras significativas para suprimir el ruido, y por eso las operaciones repetidas no acumulan basura visible.",
            "Dos límites honestos: redondear más allá de 12 dígitos no significa nada en hardware binario, así que exigir más precisión no compra nada; y las funciones trigonométricas heredan unas pocas unidades en el último dígito incluso con ángulos exactos — la tangente de un ángulo casi recto explota por naturaleza. La calculadora reporta el comportamiento real del punto flotante en vez de taparlo.",
          ],
        },
        {
          heading: "Grados, radianes y el flujo de cálculo encadenado",
          paragraphs: [
            "El interruptor DEG/RAD es la mayor fuente mundial de respuestas trigonométricas erróneas, así que merece una regla: DEG por defecto, porque casi todos los que llegan a una calculadora trabajan en grados; RAD para matemáticas tipo cálculo y cualquier cosa expresada con π. Calcular tan(π/4) en modo DEG da un resultado equivocado con total seguridad — la calculadora no puede saber a cuál de los dos usted se refería, así que revise el interruptor antes de culpar al resultado.",
            "La vista previa en vivo mantiene la expresión siempre editable: corrige un término intermedio y todo el resultado se recalcula, sin volver a teclear como en una calculadora de pila. Al pulsar =, el resultado se reincorpora a la línea de expresión, así que el encadenado — tomar un resultado, multiplicarlo, luego aplicar un log — ocurre sobre una sola línea editable, sin registros de memoria.",
            "Todo corre localmente en su navegador: no se transmite expresión ni resultado, y la página funciona sin conexión una vez cargada. Para cálculos con datos privados — precios, nóminas, ejercicios de examen — la computación es solo suya. El percentage-calculator y el binary-converter relacionados cubren los dos trabajos que un teclado científico hace torpemente: aritmética de porcentajes y conversión de bases.",
          ],
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
      deepDive: [
        {
          heading: "Precedência de operadores e por que −2² é −4",
          paragraphs: [
            "O trabalho de uma calculadora não é aritmética — é decidir o que uma expressão significa. Este avaliador segue a convenção matemática que se aprende na escola: primeiro parênteses, depois o menos unário, em seguida as operações pós-fixas como % e x², depois potências, então multiplicação e divisão, e por fim soma e subtração. Respeitar essa ordem é exatamente a diferença entre uma calculadora e um brinquedo.",
            "Uma convenção surpreende: 2^3^2 significa 2^(3^2) = 512, e não (2^3)^2 = 64. A potenciação associativa à direita, como manda a prática matemática padrão — potências empilhadas se leem de cima para baixo. Na mesma linha, −2² é −4 e não 4, porque o quadrado age sobre o 2 antes que o menos unário. Algumas planilhas discordam dessas convenções; esta calculadora segue o manual.",
            "A multiplicação implícita funciona entre valores adjacentes — 2π, 3(4+1), (1+2)(3+4) se multiplicam sem o × explícito. Um detalhe deliberado: a multiplicação implícita liga mais forte que a divisão dentro da mesma sequência, então 1/2π se lê 1/(2π), e não (1/2)×π — a leitura que físicos e engenheiros têm em mente ao escrever assim numa linha.",
          ],
        },
        {
          heading: "Por que não há eval, e a honestidade do ponto flutuante",
          paragraphs: [
            "A maioria das calculadoras web entrega sua expressão ao eval do JavaScript ou ao construtor Function — o navegador analisa a string como código e a executa. É rápido de construir, mas uma string maliciosa pode rodar código arbitrário, e o comportamento depende de caprichos do JavaScript em vez de regras de calculadora. Este avaliador é um pequeno tokenizador mais um analisador descendente escritos para a página: entrada inválida gera uma mensagem de erro, nunca uma execução.",
            "Os números são floats de dupla precisão IEEE 754, que é a descrição honesta do que todo motor de calculadora convencional faz sob a camada de exibição. Daí artefatos como 0,1 + 0,2 = 0,30000000000000004 — o decimal 0,1 não tem representação binária exata, então a soma carrega ruído de representação. Os resultados são arredondados para 12 algarismos significativos para suprimir o ruído, e por isso operações repetidas não acumulam lixo visível no final.",
            "Dois limites honestos: arredondar além de 12 dígitos não significa nada em hardware binário, então exigir mais precisão não compra nada; e as funções trigonométricas herdam algumas unidades no último algarismo mesmo com ângulos exatos — a tangente de um ângulo quase reto explode por natureza. A calculadora reporta o comportamento real do ponto flutuante em vez de disfarçá-lo.",
          ],
        },
        {
          heading: "Graus, radianos e o fluxo de cálculo encadeado",
          paragraphs: [
            "O interruptor DEG/RAD é a maior fonte mundial de respostas trigonométricas erradas, então merece uma regra: DEG por padrão, porque quase todo mundo que busca uma calculadora está trabalhando em graus; RAD para matemática tipo cálculo e qualquer coisa expressa com π. Calcular tan(π/4) em modo DEG dá um resultado errado com toda a confiança — a calculadora não pode saber qual unidade você quis, então confira o interruptor antes de culpar o resultado.",
            "A pré-visualização ao vivo mantém a expressão sempre editável: corrija um termo no meio e o resultado inteiro se recalcula, em vez de digitar tudo de novo como numa calculadora de pilha. Ao pressionar =, o resultado volta para a linha de expressão, então o encadeamento — pegar um resultado, multiplicar, depois aplicar um log — acontece numa única linha editável, sem registros de memória.",
            "Tudo roda localmente no seu navegador: nenhuma expressão ou resultado é transmitido, e a página funciona offline depois de carregada. Para cálculos com dados privados — preços, folha de pagamento, questões de prova — a computação é só sua. O percentage-calculator e o binary-converter relacionados cobrem os dois trabalhos que um teclado científico faz mal: aritmética de porcentagem e conversão de base.",
          ],
        },
      ],
    },
  },
});
