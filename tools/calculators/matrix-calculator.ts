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
    },
  },
});
