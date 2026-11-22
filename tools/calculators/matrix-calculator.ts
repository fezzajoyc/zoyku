import { CalcEngineMatrix } from "../_engines/calc-engine-matrix";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "matrix-calculator",
  category: "utility",
  icon: "grid",
  engine: { component: CalcEngineMatrix },
  related: ["scientific-calculator", "percentage-calculator", "gpa-calculator", "emi-calculator"],
  copy: {
    en: {
      name: "Matrix Calculator",
      tagline:
        "Determinants, inverses, transposes, multiplication and addition for 2×2, 3×3 and 4×4 matrices — Gauss–Jordan elimination with partial pivoting, numpy-verified implementation. Free, instant, offline.",
      intro: [
        "Matrices appear everywhere from linear algebra homework to computer graphics transforms and regression coefficients. This calculator handles 2×2, 3×3 and 4×4 square matrices: determinants by cofactor expansion, inverses by Gauss–Jordan elimination with partial pivoting, plus transposes, products and sums.",
        "Enter cells as integers or decimals — the inverse uses partial pivoting so even matrices that would break naive implementations resolve correctly, and singular matrices (determinant 0) are rejected with an explicit message rather than producing division-by-zero garbage. Results are displayed to 12 significant digits, exact for integer-matrix operations up to that rounding.",
        "All computation runs locally with pure typed arithmetic — no network calls, no dependencies beyond the browser. Verified against NumPy as an independent implementation across the whole operation set.",
      ],
      steps: [
        "Choose the matrix size (2×2, 3×3 or 4×4).",
        "Fill matrix A (and B for multiplication/addition) with integers or decimals.",
        "Click an operation — determinant, inverse, transpose, A×B or A+B — and the result grid appears below with a copy button.",
      ],
      faqs: [
        {
          q: "Why can't I invert a matrix whose determinant is 0?",
          a: "A determinant of 0 means the matrix maps space onto a lower dimension — the linear equations it represents have no unique solution, so no matrix can undo it. Such matrices are called singular; this tool rejects them explicitly rather than producing infinite or garbage values.",
        },
        {
          q: "Why is the inverse shown with decimal rounding?",
          a: "Most matrix inverses contain irrational or repeating fractions that cannot be displayed exactly. The computation itself uses full double precision; only the display rounds to 12 significant digits, and the copied result carries the same precision — enough that multiplying it against the original reproduces the identity matrix within 1e-9.",
        },
      ],
      deepDive: [
        {
          heading: "Why partial pivoting — and what breaks without it",
          paragraphs: [
            "Gauss–Jordan elimination divides by the diagonal element at each step. If that element is close to zero, dividing amplifies rounding error catastrophically — and for some matrices the naive algorithm returns garbage even though the matrix is invertible. Partial pivoting swaps each step's row with the one holding the largest absolute value in the current column before dividing, which bounds the error growth mathematically.",
            "The classic failure without pivoting: [[0, 1], [1, 1]] — the top-left zero forces a division by zero in the naive path, yet the matrix is perfectly invertible (det = −1). With partial pivoting the rows swap automatically and the inverse comes out exact. This is also why the tool rejects matrices whose pivot column is entirely zero: those genuinely have no inverse.",
            "The 12-significant-digit display is a consequence of IEEE 754 double precision (about 15–17 digits) minus the digits lost to elimination rounding. If you need exact rational results for integer matrices, use a computer-algebra system — this calculator optimizes for the interactive range where doubles are honest.",
          ],
        },
        {
          heading: "Determinant as the matrix's fingerprint",
          paragraphs: [
            "The determinant compresses everything about a square matrix into one number: non-zero means the matrix is invertible and maps space bijectively; zero means some dimension collapses. Its absolute value measures volume scaling (a det of 2 doubles every area), and its sign tells whether orientation flips.",
            "Cofactor expansion is O(n!) and would be unusable at 4×4 if expanded naively — the implementation memoizes through the recursive minor structure so 4×4 stays instant. For anything larger, LU decomposition is the standard; this page caps at 4×4 because the grid UI stays readable and the operations cover the range where hand-checking matters.",
            "A useful self-check: multiply the computed inverse by the original — the result should be the identity matrix. Any deviation beyond 1e-9 indicates a bug worth reporting; the test suite verifies this property for every size.",
          ],
        },
      ],
    },
    zh: {
      name: "矩阵计算器",
      tagline:
        "2×2/3×3/4×4 矩阵的行列式、逆矩阵、转置、乘法与加法——带部分主元的高斯-若尔当消元,numpy 独立实现交叉验证。免费、即时、离线可用。",
      intro: [
        "矩阵无处不在:线性代数作业、计算机图形学的变换矩阵、回归系数。本计算器支持 2×2/3×3/4×4 方阵:余子式展开求行列式、带部分主元的高斯-若尔当消元求逆、以及转置、乘法与加法。",
        "单元格接受整数与小数——逆矩阵使用部分主元消元,连朴素实现会出错的矩阵也能正确求解;奇异矩阵(行列式为 0)会被明确拒绝而不是产出除零垃圾。结果展示 12 位有效数字,整数矩阵的运算在该舍入范围内精确。",
        "全部使用纯类型运算本机完成——无网络请求。整套运算已与 NumPy 独立实现交叉验证。",
      ],
      steps: [
        "选择矩阵尺寸(2×2、3×3 或 4×4)。",
        "填写矩阵 A(乘法/加法还需要 B),单元格接受整数与小数。",
        "点击运算——行列式、逆矩阵、转置、A×B 或 A+B——结果网格显示在下方并带复制按钮。",
      ],
      faqs: [
        {
          q: "为什么行列式为 0 的矩阵不能求逆?",
          a: "行列式为 0 意味着该矩阵把空间压缩到了更低的维度——它代表的线性方程组没有唯一解,因此不存在能撤销它的矩阵。这类矩阵称为奇异矩阵;本工具明确拒绝,而不是产出无穷大或乱码。",
        },
        {
          q: "逆矩阵为什么显示的是小数?",
          a: "多数矩阵的逆包含无理数或循环分数,无法精确显示。计算本身使用完整双精度;只有显示环节四舍五入到 12 位有效数字,复制的结果携带同样精度——乘回原矩阵可在 1e-9 内还原单位矩阵。",
        },
      ],
      deepDive: [
        {
          heading: "为什么需要部分主元——没有它会坏什么",
          paragraphs: [
            "高斯-若尔当消元每一步都要除以对角元素。如果该元素接近零,除法会把舍入误差灾难性放大——某些矩阵明明可逆,朴素算法却输出乱值。部分主元消元在每步除法前,把当前列绝对值最大的行换到对角位置,从数学上约束了误差增长。",
            "没有主元选取的经典失败:[[0, 1], [1, 1]]——左上角的零让朴素路径直接除零,但这个矩阵完全可逆(det = −1)。带部分主元时行自动交换,逆矩阵精确输出。这也是本工具在主元列整列为零时明确拒绝的原因:那些矩阵真的没有逆。",
            "12 位有效数字的显示是 IEEE 754 双精度(约 15–17 位)减去消元舍入损耗的结果。如果你需要整数矩阵的精确有理数结果,请用计算机代数系统——本计算器优化的目标,是双精度足够诚实的交互范围。",
          ],
        },
        {
          heading: "行列式是矩阵的指纹",
          paragraphs: [
            "行列式把方阵的全部信息压缩成一个数:非零意味着矩阵可逆且对空间双射;零意味着某个维度塌缩。绝对值衡量体积缩放(det 为 2 即面积翻倍),符号说明是否翻转方向。",
            "余子式展开是 O(n!) 复杂度,朴素展开在 4×4 就会慢得不可用——实现通过递归余子式结构记忆化,4×4 保持瞬时。更大的矩阵应该用 LU 分解;本页上限 4×4 是因为网格 UI 在这个范围内保持可读,且覆盖了手工验算真正有意义的区间。",
            "一个有用的自检:把算出的逆矩阵乘回原矩阵——结果应该是单位矩阵。任何超过 1e-9 的偏差都值得报告;测试套件对每个尺寸都验证了这个性质。",
          ],
        },
      ],
    },
    ja: {
      name: "行列計算機",
      tagline:
        "2×2/3×3/4×4 行列の行列式・逆行列・転置・乗算・加算 — 部分ピボット付きガウス・ジョルダン消元、NumPy 独立実装でクロス検証。無料・即時・オフライン。",
      intro: [
        "行列は線形代数の宿題からコンピュータグラフィックスの変換、回帰係数まであらゆる場所に現れます。この計算機は 2×2/3×3/4×4 の正方行列を処理:余因子展開による行列式、部分ピボット付きガウス・ジョルダン消元による逆行列、さらに転置・積・和。",
        "セルには整数も小数も入力できます — 逆行列は部分ピボットを使用するため、素朴な実装が失敗する行列も正しく解きます。奇异行列(行列式 0)は明確なメッセージで拒否され、ゼロ除算のゴミを出しません。結果は 12 桁の有効数字で表示され、整数行列の演算はその丸め範囲で正確です。",
        "すべて純粋な型付き演算でローカル実行 — ネットワーク呼び出しなし。操作セット全体を NumPy の独立実装とクロス検証済みです。",
      ],
      steps: [
        "行列サイズを選択(2×2、3×3、4×4)。",
        "行列 A(乗算・加算では B も)に整数または小数を入力。",
        "演算をクリック — 行列式・逆行列・転置・A×B・A+B — 結果グリッドが下に表示されコピーボタンが付きます。",
      ],
      faqs: [
        {
          q: "行列式が 0 の行列に逆行列がないのはなぜ?",
          a: "行列式 0 はその行列が空間をより低い次元へ写像することを意味し、表す線形方程式系に一意の解がないため、それを取り消す行列は存在しません。このような行列は正則でないと呼ばれます;本ツールは無限大やゴミを出すのではなく明確に拒否します。",
        },
        {
          q: "逆行列が小数で表示されるのはなぜ?",
          a: "多くの逆行列は無理数や循環小数を含み正確に表示できません。計算自体は完全な倍精度で行われ、表示のみ 12 桁の有効数字に丸められます。コピーされる結果も同じ精度を持ち — 元の行列と掛けると 1e-9 以内で単位行列を再現します。",
        },
      ],
      deepDive: [
        {
          heading: "部分ピボットが必要な理由、そして無いと何が壊れるか",
          paragraphs: [
            "ガウス・ジョルダン消元は各ステップで対角要素で除算します。その要素がゼロに近いと除算が丸め誤差を災害的に増幅します — 可逆なのに素朴なアルゴリズムがゴミを出す行列があります。部分ピボットは各ステップの除算前に、現在の列で絶対値最大の行を対角へ交換し、誤差成長を数学的に抑えます。",
            "ピボットなしの古典的失敗:[[0, 1], [1, 1]] — 左上のゼロが素朴な経路でゼロ除算を強制しますが、この行列は完全に可逆(det = −1)。部分ピボットでは行が自動的に交換され、逆行列が正確に出ます。ピボット列が全域ゼロの行列を本ツールが明示的に拒否するのも同じ理由です:それらは本当に逆行列を持ちません。",
            "12 桁有効数字の表示は IEEE 754 倍精度(約 15〜17 桁)から消元の丸め損失を引いた結果です。整数行列の厳密な有理数結果が必要なら計算機代数システムを — 本計算機は倍精度が正直に機能するインタラクティブ範囲に最適化しています。",
          ],
        },
        {
          heading: "行列の指紋としての行列式",
          paragraphs: [
            "行列式は正方行列の全情報を一つの数に圧縮します:非ゼロは可逆で空間への全単射、ゼロはどこかの次元が潰れることを意味します。絶対値は体積スケーリング(det 2 で面積が倍)、符号は向きの反転を示します。",
            "余因子展開は O(n!) で、素朴に展開すると 4×4 でも使用に耐えません — 実装は再帰的な余因子構造を通じてメモ化し、4×4 でも瞬時にします。それより大きい行列には LU 分解が標準です。本ページが 4×4 で上限なのは、グリッド UI がこの範囲で読みやすく、手検算が本当に意味を持つ範囲をカバーするからです。",
            "便利な自己チェック:計算した逆行列に元の行列を掛ける — 結果は単位行列になるはずです。1e-9 を超える偏差は報告価値のあるバグです;テストスイートが全サイズでこの性質を検証しています。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de matrices",
      tagline:
        "Determinantes, inversas, transpuestas, multiplicación y suma para matrices de 2×2, 3×3 y 4×4 — eliminación Gauss–Jordan con pivoteo parcial, implementación verificada contra NumPy. Gratis, instantánea, sin conexión.",
      intro: [
        "Las matrices aparecen en todas partes: desde tareas de álgebra lineal hasta transformaciones de gráficos por computadora y coeficientes de regresión. Esta calculadora maneja matrices cuadradas de 2×2, 3×3 y 4×4: determinantes por expansión de cofactores, inversas por eliminación Gauss–Jordan con pivoteo parcial, además de transpuestas, productos y sumas.",
        "Introduzca celdas como enteros o decimales — la inversa usa pivoteo parcial, así que incluso matrices que romperían implementaciones ingenuas se resuelven correctamente, y las matrices singulares (determinante 0) se rechazan con un mensaje explícito en lugar de producir basura de división por cero. Los resultados se muestran a 12 dígitos significativos, exactos para operaciones de matrices enteras hasta ese redondeo.",
        "Todo el cálculo se ejecuta localmente con aritmética tipada pura — sin llamadas de red. Verificado contra NumPy como implementación independiente en todo el conjunto de operaciones.",
      ],
      steps: [
        "Elija el tamaño de la matriz (2×2, 3×3 o 4×4).",
        "Rellene la matriz A (y B para multiplicación/suma) con enteros o decimales.",
        "Haga clic en una operación — determinante, inversa, transpuesta, A×B o A+B — y la matriz resultante aparece abajo con botón de copia.",
      ],
      faqs: [
        {
          q: "¿Por qué no puedo invertir una matriz con determinante 0?",
          a: "Un determinante de 0 significa que la matriz mapea el espacio a una dimensión menor — el sistema de ecuaciones lineales que representa no tiene solución única, por lo que ninguna matriz puede deshacerlo. Estas matrices se llaman singulares; esta herramienta las rechaza explícitamente en lugar de producir valores infinitos o basura.",
        },
        {
          q: "¿Por qué la inversa se muestra con redondeo decimal?",
          a: "La mayoría de las inversas contienen fracciones irracionales o periódicas que no se pueden mostrar exactamente. El cálculo usa precisión doble completa; solo la pantalla redondea a 12 dígitos significativos, y el resultado copiado lleva la misma precisión — suficiente para que multiplicándolo por la original se reproduzca la identidad dentro de 1e-9.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué el pivoteo parcial — y qué se rompe sin él",
          paragraphs: [
            "La eliminación Gauss–Jordan divide por el elemento diagonal en cada paso. Si ese elemento está cerca de cero, dividir amplifica el error de redondeo catastróficamente — y algunas matrices devuelven basura con el algoritmo ingenuo aunque sean invertibles. El pivoteo parcial intercambia la fila de cada paso con la que tiene el mayor valor absoluto en la columna actual antes de dividir, lo que acota el crecimiento del error matemáticamente.",
            "El fallo clásico sin pivoteo: [[0, 1], [1, 1]] — el cero superior izquierdo fuerza una división por cero en el camino ingenuo, pero la matriz es perfectamente invertible (det = −1). Con pivoteo parcial las filas se intercambian automáticamente y la inversa sale exacta. Esto es también por qué la herramienta rechaza matrices cuya columna de pivote es enteramente cero: esas genuinamente no tienen inversa.",
            "La pantalla de 12 dígitos significativos es consecuencia de IEEE 754 doble precisión (unos 15–17 dígitos) menos los dígitos perdidos al redondeo de la eliminación. Si necesita resultados racionales exactos para matrices enteras, use un sistema de álgebra computacional — esta calculadora optimiza para el rango interactivo donde los doubles son honestos.",
          ],
        },
        {
          heading: "El determinante como huella dactilar de la matriz",
          paragraphs: [
            "El determinante comprime todo sobre una matriz cuadrada en un número: no cero significa que es invertible y mapea el espacio biyectivamente; cero significa que alguna dimensión colapsa. Su valor absoluto mide el escalado de volumen (un det de 2 duplica cada área), y su signo dice si la orientación se invierte.",
            "La expansión por cofactores es O(n!) y sería inutilizable a 4×4 si se expandiera ingenuamente — la implementación memoriza a través de la estructura recursiva de menores así que 4×4 sigue siendo instantáneo. Para matrices mayores, la descomposición LU es el estándar; esta página limita a 4×4 porque la cuadrícula sigue legible y las operaciones cubren el rango donde la verificación manual importa.",
            "Una auto-comprobación útil: multiplique la inversa calculada por la original — el resultado debe ser la matriz identidad. Cualquier desviación más allá de 1e-9 indica un bug que vale la pena reportar; la suite de tests verifica esta propiedad para cada tamaño.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de matrizes",
      tagline:
        "Determinantes, inversas, transpostas, multiplicação e adição para matrizes 2×2, 3×3 e 4×4 — eliminação Gauss–Jordan com pivoteamento parcial, implementação verificada contra NumPy. Grátis, instantânea, offline.",
      intro: [
        "Matrizes aparecem em toda parte: de tarefas de álgebra linear a transformações de computação gráfica e coeficientes de regressão. Esta calculadora lida com matrizes quadradas 2×2, 3×3 e 4×4: determinantes por expansão de cofatores, inversas por eliminação Gauss–Jordan com pivoteamento parcial, além de transpostas, produtos e somas.",
        "Digite células como inteiros ou decimais — a inversa usa pivoteamento parcial, então até matrizes que quebrariam implementações ingênuas são resolvidas corretamente, e matrizes singulares (determinante 0) são rejeitadas com uma mensagem explícita em vez de produzir lixo de divisão por zero. Os resultados são exibidos com 12 dígitos significativos, exatos para operações de matrizes inteiras até esse arredondamento.",
        "Todo o cálculo roda localmente com aritmética tipada pura — sem chamadas de rede. Verificado contra NumPy como implementação independente em todo o conjunto de operações.",
      ],
      steps: [
        "Escolha o tamanho da matriz (2×2, 3×3 ou 4×4).",
        "Preencha a matriz A (e B para multiplicação/adição) com inteiros ou decimais.",
        "Clique em uma operação — determinante, inversa, transposta, A×B ou A+B — e a matriz resultante aparece abaixo com botão de cópia.",
      ],
      faqs: [
        {
          q: "Por que não posso inverter uma matriz com determinante 0?",
          a: "Determinante 0 significa que a matriz mapeia o espaço para uma dimensão menor — o sistema linear que ela representa não tem solução única, então nenhuma matriz pode desfazê-la. Tais matrizes são chamadas singulares; esta ferramenta as rejeita explicitamente em vez de produzir valores infinitos ou lixo.",
        },
        {
          q: "Por que a inversa aparece com arredondamento decimal?",
          a: "A maioria das inversas contém frações irracionais ou periódicas que não podem ser exibidas exatamente. O cálculo usa precisão dupla completa; apenas a exibição arredonda para 12 dígitos significativos, e o resultado copiado carrega a mesma precisão — o suficiente para que multiplicado pela original reproduza a identidade dentro de 1e-9.",
        },
      ],
      deepDive: [
        {
          heading: "Por que o pivoteamento parcial — e o que quebra sem ele",
          paragraphs: [
            "A eliminação Gauss–Jordan divide pelo elemento diagonal a cada passo. Se esse elemento estiver perto de zero, dividir amplifica o erro de arredondamento catastroficamente — e algumas matrizes retornam lixo com o algoritmo ingênuo mesmo sendo invertíveis. O pivoteamento parcial troca a linha de cada passo com a que tem o maior valor absoluto na coluna atual antes de dividir, o que limita o crescimento do erro matematicamente.",
            "A falha clássica sem pivoteamento: [[0, 1], [1, 1]] — o zero no canto superior esquerdo força uma divisão por zero no caminho ingênuo, mas a matriz é perfeitamente invertível (det = −1). Com pivoteamento parcial as linhas trocam automaticamente e a inversa sai exata. É também por isso que a ferramenta rejeita matrizes cuja coluna de pivô é inteiramente zero: essas genuinamente não têm inversa.",
            "A exibição de 12 dígitos significativos é consequência do IEEE 754 dupla precisão (cerca de 15–17 dígitos) menos os dígitos perdidos ao arredondamento da eliminação. Se você precisa de resultados racionais exatos para matrizes inteiras, use um sistema de álgebra computacional — esta calculadora otimiza para a faixa interativa onde doubles são honestos.",
          ],
        },
        {
          heading: "O determinante como impressão digital da matriz",
          paragraphs: [
            "O determinante comprime tudo sobre uma matriz quadrada em um número: não zero significa que é invertível e mapeia o espaço bijetivamente; zero significa que alguma dimensão colapsa. Seu valor absoluto mede o escalonamento de volume (um det de 2 dobra cada área), e seu sinal diz se a orientação inverte.",
            "A expansão por cofatores é O(n!) e seria inutilizável a 4×4 se expandida ingenuamente — a implementação memoiza através da estrutura recursiva de menores para que 4×4 continue instantâneo. Para matrizes maiores, a decomposição LU é o padrão; esta página limita a 4×4 porque a grade UI permanece legível e as operações cobrem a faixa onde a verificação manual importa.",
            "Uma auto-verificação útil: multiplique a inversa calculada pela original — o resultado deve ser a matriz identidade. Qualquer desvio além de 1e-9 indica um bug que vale reportar; a suíte de testes verifica essa propriedade para cada tamanho.",
          ],
        },
      ],
    },
  },
});
