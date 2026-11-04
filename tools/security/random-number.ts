import { SecRandomEngine } from "../_engines/sec-engine-random";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "random-number",
  category: "security",
  icon: "shuffle",
  engine: { component: SecRandomEngine },
  related: ["password-generator", "uuid-generator", "password-strength", "whois-lookup", "ip-lookup", "email-validator", "totp-generator", "dns-lookup"],
  copy: {
    en: {
      name: "Random Number Generator",
      tagline:
        "Generate truly random numbers from any range — singles, batches, unique lottery-style draws — using your browser's cryptographic RNG.",
      intro: [
        "Math.random() is fine for games but biased and predictable. This generator draws from crypto.getRandomValues, your browser's cryptographic random source, with rejection sampling that removes modulo bias — every number in the range is equally likely.",
        "Draw one number between bounds, a whole batch, or unique draws for raffles and giveaways; sort results ascending or keep draw order. The tool also shows the total entropy of the draw in bits, so you can demonstrate a giveaway was fair.",
      ],
      steps: [
        "Set the minimum and maximum (both inclusive, negatives welcome).",
        "Choose how many numbers you need and toggle unique draws if repeats would ruin the raffle.",
        "Enable sort ascending for ordered results, or leave it off to preserve draw order.",
        "Copy the list straight into your spreadsheet or raffle announcement.",
      ],
      faqs: [
        {
          q: "Is this suitable for giveaways and lotteries?",
          a: "Yes. The numbers come from the browser's cryptographic RNG with an unbiased rejection-sampling step, so each value in the range has the same probability. The entropy readout shows exactly how much randomness went into the draw.",
        },
        {
          q: "What does “no duplicates” do when the range is small?",
          a: "It switches to drawing without replacement — like pulling numbered balls from a bowl. If you ask for more unique numbers than the range contains, the tool explains the conflict instead of returning a biased result.",
        },
        {
          q: "Are the numbers saved anywhere?",
          a: "No. Everything is computed in your browser's memory from crypto.getRandomValues; reloading the page wipes the results, and nothing is ever uploaded.",
        },
      ],
    },
    zh: {
      name: "随机数生成器",
      tagline: "从任意范围生成真随机数——单个、批量、不重复抽奖式抽取——完全基于浏览器的加密级随机数生成器。",
      intro: [
        "Math.random() 用于游戏尚可,但有偏差且可预测。本工具从 crypto.getRandomValues——浏览器的加密级随机源——取样,并通过拒绝采样消除模偏差,范围内每个数字出现的概率完全相同。",
        "支持在上下界之间抽取单个数字、整批数字,或用于抽奖的不重复抽取;结果可保持抽取顺序或升序排列。工具还会显示本次抽取的总熵(位),方便你证明抽奖的公平性。",
      ],
      steps: [
        "设置最小值和最大值(均包含在内,支持负数)。",
        "选择需要的个数;如果重复会毁掉抽奖,就勾选“不重复抽取”。",
        "需要有序结果就勾选“升序排列”,想保留抽取顺序则不用。",
        "把结果列表直接复制进表格或抽奖公告。",
      ],
      faqs: [
        {
          q: "适合抽奖和摇号吗?",
          a: "适合。数字来自浏览器的加密级随机数生成器,并经过无偏拒绝采样,范围内每个取值概率相同。熵值读数能准确告诉你这次抽取用了多少随机性。",
        },
        {
          q: "范围很小时,“不重复”是怎么工作的?",
          a: "它会切换为“无放回抽取”——就像从碗里摸编号球。如果你要求的不重复个数超过范围内的取值数量,工具会明确说明冲突,而不是返回有偏差的结果。",
        },
        {
          q: "结果会被保存吗?",
          a: "不会。所有计算都基于 crypto.getRandomValues 在浏览器内存中完成,刷新页面结果即清空,任何数据都不会上传。",
        },
      ],
    },
    ja: {
      name: "乱数生成",
      tagline:
        "任意の範囲から本物の乱数を生成——1 個でも連続でも、重複なしの抽選でも。ブラウザの暗号論的乱数生成器を使用します。",
      intro: [
        "Math.random() はゲーム用途なら十分ですが、偏りがあり予測可能です。このツールはブラウザの暗号論的乱数源 crypto.getRandomValues から抽出し、棄却サンプリングでモジュロ偏りを排除します。範囲内のすべての数値が等確率で選ばれます。",
        "上下限の間で 1 個でもまとめてでも、あるいは抽選向けの重複なし抽出でも生成できます。結果は昇順ソートも可能。合計エントロピー(ビット)も表示されるので、抽選の公平性を示せます。",
      ],
      steps: [
        "最小値と最大値を設定します(両端を含み、負数も可)。",
        "必要な個数を指定し、重複が困る抽選なら「重複なし」を有効にします。",
        "順番に並べたい場合は「昇順に並べる」を、抽選の順序を残したい場合はオフのままにします。",
        "リストをそのままコピーして表計算や抽選発表に貼り付けます。",
      ],
      faqs: [
        {
          q: "抽選やガラポンに使えますか?",
          a: "使えます。数値は暗号論的乱数生成器から、偏りのない棄却サンプリングで取り出されるため、範囲内のどの値も同じ確率です。エントロピー表示が抽選に使われた乱数の量を正確に示します。",
        },
        {
          q: "範囲が狭いとき「重複なし」はどう動きますか?",
          a: "復元抽出なしの方式に切り替わります。碗から番号球を取り出すイメージです。範囲より多い個数を要求すると、偏った結果を返す代わりにその旨を説明します。",
        },
        {
          q: "結果はどこかに保存されますか?",
          a: "いいえ。計算はすべて crypto.getRandomValues に基づいてブラウザのメモリ内で行われます。再読み込みすれば結果は消え、アップロードは一切ありません。",
        },
      ],
    },
    es: {
      name: "Generador de números aleatorios",
      tagline:
        "Genera números verdaderamente aleatorios desde cualquier rango: sueltos, en lote o extracciones únicas de sorteo, con el RNG criptográfico del navegador.",
      intro: [
        "Math.random() sirve para juegos, pero tiene sesgo y es predecible. Este generador extrae de crypto.getRandomValues —la fuente criptográfica del navegador— con muestreo por rechazo que elimina el sesgo de módulo: cada número del rango tiene la misma probabilidad.",
        "Saca un número entre límites, un lote entero o extracciones sin repetición para rifas y sorteos; ordena los resultados o conserva el orden de extracción. La herramienta muestra la entropía total del sorteo en bits, así puedes demostrar que fue justo.",
      ],
      steps: [
        "Fija el mínimo y el máximo (ambos inclusive, con negativos permitidos).",
        "Elige cuántos números necesitas y activa las extracciones únicas si los repetidos arruinarían la rifa.",
        "Activa el orden ascendente para resultados ordenados, o déjalo desactivado para conservar el orden de extracción.",
        "Copia la lista directamente a tu hoja de cálculo o al anuncio de la rifa.",
      ],
      faqs: [
        {
          q: "¿Sirve para rifas y sorteos?",
          a: "Sí. Los números salen del RNG criptográfico del navegador con un paso de rechazo sin sesgo, así que cada valor del rango tiene la misma probabilidad. El indicador de entropía muestra exactamente cuánta aleatoriedad entró en el sorteo.",
        },
        {
          q: "¿Qué hace “sin duplicados” cuando el rango es pequeño?",
          a: "Cambia a extraer sin reemplazo, como sacar bolas numeradas de una urna. Si pides más números únicos de los que contiene el rango, la herramienta explica el conflicto en vez de devolver un resultado sesgado.",
        },
        {
          q: "¿Se guardan los números en algún sitio?",
          a: "No. Todo se calcula en la memoria del navegador a partir de crypto.getRandomValues; al recargar la página los resultados desaparecen y nunca se sube nada.",
        },
      ],
    },
    pt: {
      name: "Gerador de números aleatórios",
      tagline:
        "Gere números verdadeiramente aleatórios em qualquer faixa — avulsos, em lote ou sorteios únicos sem repetição — com o gerador criptográfico do navegador.",
      intro: [
        "O Math.random() serve para jogos, mas tem viés e é previsível. Este gerador extrai do crypto.getRandomValues — a fonte criptográfica do navegador — com amostragem por rejeição que elimina o viés de módulo: cada número da faixa tem a mesma probabilidade.",
        "Sorteie um número entre limites, um lote inteiro ou extrações únicas para rifas e sorteios; ordene os resultados ou mantenha a ordem do sorteio. A ferramenta mostra a entropia total em bits, para você provar que o sorteio foi justo.",
      ],
      steps: [
        "Defina o mínimo e o máximo (ambos inclusive, negativos são bem-vindos).",
        "Escolha quantos números precisa e ative extrações únicas se repetições estragariam a rifa.",
        "Ative a ordem crescente para resultados ordenados, ou deixe desligado para preservar a ordem do sorteio.",
        "Copie a lista direto para a sua planilha ou para o anúncio da rifa.",
      ],
      faqs: [
        {
          q: "Serve para rifas e sorteios?",
          a: "Sim. Os números vêm do gerador criptográfico do navegador com uma etapa de rejeição sem viés, então cada valor da faixa tem a mesma probabilidade. O indicador de entropia mostra exatamente quanta aleatoriedade entrou no sorteio.",
        },
        {
          q: "O que “sem duplicados” faz quando a faixa é pequena?",
          a: "Muda para extração sem reposição — como tirar bolas numeradas de uma urna. Se você pedir mais números únicos do que a faixa contém, a ferramenta explica o conflito em vez de devolver um resultado viciado.",
        },
        {
          q: "Os números ficam salvos em algum lugar?",
          a: "Não. Tudo é calculado na memória do navegador a partir do crypto.getRandomValues; ao recarregar a página os resultados desaparecem e nada é enviado.",
        },
      ],
    },
  },
});
