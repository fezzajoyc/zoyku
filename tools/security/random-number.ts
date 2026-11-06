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
        "If the bounds do not divide 2^32 evenly, values are drawn and rejected until they land in a uniform window, so with inclusive bounds every integer from min to max has exactly 1/(max−min+1) probability. The entropy readout is log2 of that count: a fair six-sided draw carries about 2.58 bits.",
        "Numbers come from the browser's CSPRNG seeded by the operating system — not from Math.random() or the system clock, both of which can be reconstructed from a few observed outputs. Unique-draw mode samples without replacement, so raffle entries cannot repeat.",
        "Online true-randomness services trade a network round-trip and an account for entropy you cannot verify locally, while spreadsheet RAND() is fine for dice but not for prizes. For raffles, giveaways and random sampling, cryptographic randomness generated in the page is both fair and auditable — the tool also shows the total entropy of the draw in bits.",
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
      deepDive: [
        {
          heading: "Modulo bias: the bug most random-number pages have",
          paragraphs: [
            "Computers produce random integers as 32-bit values, but almost no useful range divides 2^32 evenly. The naive approach — take a random 32-bit number and apply modulo of the range size — stacks the leftover remainder onto the low end of the range: with a range of 10, some numbers become measurably more likely than others. For a game it is invisible; for a raffle with prizes attached it is a fairness bug.",
            "The fix is rejection sampling: draw a 32-bit value, and if it falls in the leftover remainder at the top of the space, discard it and draw again. The accepted values then cover the range in an exactly uniform window, so every integer from min to max carries precisely the same 1/(max−min+1) probability. It costs a few extra draws on average and buys mathematical fairness.",
            "This tool applies that step and says so plainly, because “cryptographic randomness” alone does not guarantee uniformity — the mapping from raw bytes to your range is where bias sneaks in. When you publish raffle results, the entropy readout (log2 of the range size, summed over the draw) documents how much genuine randomness decided the outcome.",
          ],
        },
        {
          heading: "CSPRNG versus Math.random and the clock",
          paragraphs: [
            "Math.random() is a pseudo-random generator tuned for speed: its internal state is finite, and observing enough outputs reveals that state, after which every “future” number is computable. Seeding from the system clock is worse — clocks move predictably, so an attacker who knows roughly when you clicked can reproduce your draw. Neither failure is hypothetical; they are the standard reasons online draws get challenged.",
            "crypto.getRandomValues is the browser's cryptographically secure source: its output is designed to be unpredictable even to an attacker who has seen all previous outputs, and it is seeded by the operating system from hardware entropy. This tool uses it exclusively — the same source that password and key generation rely on.",
            "A practical consequence: results here are reproducible by no one, including you. If you need auditable draws, the honest workflow is to publish your bounds and count before the draw, generate in front of witnesses or on stream, and copy the output immediately — the page keeps no record, which is a privacy property, not a limitation to work around.",
          ],
        },
        {
          heading: "With or without replacement, and where each fits",
          paragraphs: [
            "Two sampling modes match two different questions. With replacement — each draw independent, duplicates allowed — answers “give me N random numbers”: test data, Monte-Carlo-style sampling, dice. Without replacement — like pulling numbered balls from a bowl — answers “pick N winners from M entries”: raffles, giveaways, random ordering of a list.",
            "Without replacement has one hard rule: you cannot draw more unique numbers than the range contains. A tool that silently loops or biases in that case is broken; this one refuses and explains instead. Sorting the output after a unique draw changes presentation only — the set of winners is the same — but for a multi-prize raffle where place matters, preserve the draw order and treat the first number as first prize.",
          ],
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
      deepDive: [
        {
          heading: "模偏差:大多数随机数页面都有的 bug",
          paragraphs: [
            "计算机产生的是 32 位随机整数,而几乎没有任何实用范围能整除 2^32。朴素做法——取一个随机 32 位数再对范围大小取模——会把除不尽的余数堆到范围的低段:范围是 10 时,某些数字的出现概率会明显偏高。做游戏时看不出来;挂上奖品的抽奖里,这就是公平性 bug。",
            "修法是拒绝采样:抽一个 32 位值,如果落在数值空间顶部的余数区,就丢弃重抽。被接受的部分恰好铺满范围的均匀窗口,于是 min 到 max 之间每个整数都严格等于 1/(max−min+1) 的概率。平均多花几次抽样,换来的是数学意义上的公平。",
            "本工具应用了这一步,并且明说——因为“加密级随机”本身并不保证均匀,偏差恰恰是从“原始字节映射到范围”这一步钻进来的。发布抽奖结果时,熵读数(范围大小取 log2,按抽取次数累加)就是“结果由多少真实随机性决定”的书面证明。",
          ],
        },
        {
          heading: "CSPRNG、Math.random 与系统时钟",
          paragraphs: [
            "Math.random() 是为速度调优的伪随机数生成器:内部状态有限,观察足够多输出就能反推出状态,之后所有“未来”数字都可计算。用系统时钟播种更糟——时钟是可预测的,知道你大概什么时候点了按钮的人能复现整个抽取过程。这两类翻车都不是假设,而是网上抽奖被质疑时的标准成因。",
            "crypto.getRandomValues 是浏览器的加密安全随机源:设计目标就是即使攻击者看遍之前所有输出也无法预测下一个,种子来自操作系统采集的硬件熵。本工具只使用它——与密码、密钥生成同源。",
            "一个实际后果:这里的结果任何人都无法复现,包括你自己。要可审计的抽奖,诚实的流程是抽取前公布范围和数量、当众或在直播中生成、立刻复制结果。页面不留任何记录——这是隐私属性,不是需要绕开的缺陷。",
          ],
        },
        {
          heading: "有放回与无放回,各适合什么场景",
          paragraphs: [
            "两种抽样模式对应两个不同的问题。有放回——每次抽取独立,允许重复——回答“给我 N 个随机数”:测试数据、蒙特卡洛式采样、掷骰子。无放回——像从碗里摸编号球——回答“从 M 个里挑 N 个中奖者”:抽奖、赠品、列表随机排序。",
            "无放回有一条硬规则:不能抽取超过范围内取值数的不重复数字。遇到这种情况悄悄循环或悄悄产生偏差的工具是有毛病的;本工具会拒绝并说明原因。不重复抽取后排序只改变展示顺序——中奖者集合不变——但如果多个奖项分名次,请保留抽取顺序,第一个数字即一等奖。",
          ],
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
      deepDive: [
        {
          heading: "モジュロ偏り:多くの乱数ページが抱えるバグ",
          paragraphs: [
            "コンピュータが作る乱数は 32 ビットの整数ですが、実用範囲で 2^32 を割り切れるものはほぼありません。素朴な手法——ランダムな 32 ビット値を範囲の大きさで剰余する——では、割り切れない端数が範囲の低い側に積み上がります。範囲 10 なら、特定の数だけ出現確率が目に見えて高くなる。ゲームなら気づきませんが、賞品つきの抽選では公平性のバグです。",
            "修正が棄却サンプリングです。32 ビット値を取り、空間の上端の端数部分に落ちたら捨てて再抽出手順にします。受理された値は範囲をちょうど一様に覆い、min から max のどの整数も厳密に 1/(max−min+1) の確率になります。平均して数回の追加抽出手順で、数学的な公平性が買えます。",
            "このツールはその工程を適用し、明示しています。「暗号論的乱数」だけでは一様性は保証されず、偏りは「生バイトを範囲へ写像する」段階で紛れ込むからです。抽選結果を公開するとき、エントロピー表示(範囲の大きさの log2、抽出手順の回数分の合計)が「結果を決めた真の乱数の量」の記録になります。",
          ],
        },
        {
          heading: "CSPRNG、Math.random、そして時計",
          paragraphs: [
            "Math.random() は速度重視で調整された擬似乱数生成器です。内部状態は有限で、十分な出力を観察すれば状態を復元でき、以後の「未来の数」は全部計算できます。システム時計での播種はさらに悪く、時計は予測どおりに進むので、クリック時刻をある程度知る攻撃者は抽出手順を再現できます。どちらの失敗も仮定ではなく、ネット抽選への疑義の定型原因です。",
            "crypto.getRandomValues はブラウザの暗号論的に安全な乱数源です。過去の出力をすべて見た攻撃者でも次の 1 バイトを予測できないよう設計され、OS が収集したハードウェアエントロピーで播種されます。このツールはそれだけを使います。パスワードや鍵の生成と同じ源です。",
            "実務上の帰結は、ここの結果は誰にも——あなた自身にも——再現できないことです。監査可能な抽選の誠実な流れは、抽出手順の前に範囲と個数を公開し、人前や配信で生成し、すぐ結果をコピーすること。ページは何も記録しません。それは回避すべき制限ではなく、プライバシーの性質です。",
          ],
        },
        {
          heading: "復元ありと復元なし、それぞれの適所",
          paragraphs: [
            "二つの抽出手順方式は、二つの異なる問いに対応します。復元あり——毎回独立、重複あり——は「N 個の乱数をちょうだい」に答えます。テストデータ、モンテカルロ式のサンプリング、サイコロ。復元なし——碗から番号球を取り出すように——は「M 件から N 名の当選者を選ぶ」に答えます。抽選、プレゼント、リストのシャッフルです。",
            "復元なしには一つの鉄則があります。範囲内の値の数を超える個数は抽出できません。ここで黙ってループしたり偏らせたりするツールは壊れています。このツールは拒否して理由を説明します。復元なし抽選後のソートは表示だけの変更で、当選者の集合は変わりません。ただし順位付きの抽選では抽出手順の順序を残し、最初の数を 1 等として扱ってください。",
          ],
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
      deepDive: [
        {
          heading: "El sesgo de módulo: el bug que tienen la mayoría de las páginas de aleatorios",
          paragraphs: [
            "Las computadoras producen enteros aleatorios de 32 bits, y casi ningún rango útil divide 2^32 de forma exacta. El enfoque ingenuo — tomar un número de 32 bits y aplicar el módulo del tamaño del rango — apila el resto sobre la parte baja del rango: con un rango de 10, algunos números se vuelven medible-mente más probables que otros. En un juego no se nota; en una rifa con premios es un bug de equidad.",
            "La corrección es el muestreo por rechazo: se extrae un valor de 32 bits y, si cae en el resto sobrante de la parte alta del espacio, se descarta y se extrae de nuevo. Los valores aceptados cubren el rango en una ventana exactamente uniforme, así que cada entero entre el mínimo y el máximo lleva con precisión la probabilidad 1/(max−min+1). Cuesta unas extracciones extra de media y compra equidad matemática.",
            "Esta herramienta aplica ese paso y lo dice con claridad, porque “aleatoriedad criptográfica” por sí sola no garantiza uniformidad — el sesgo se cuela justo en el mapeo de bytes crudos a tu rango. Al publicar resultados de una rifa, el indicador de entropía (log2 del tamaño del rango, acumulado sobre el sorteo) documenta cuánta aleatoriedad genuina decidió el desenlace.",
          ],
        },
        {
          heading: "CSPRNG frente a Math.random y al reloj",
          paragraphs: [
            "Math.random() es un generador pseudoaleatorio afinado para velocidad: su estado interno es finito, y observar suficientes salidas lo revela, tras lo cual cada número “futuro” es calculable. Sembrar desde el reloj del sistema es peor — los relojes avanzan de forma previsible, así que quien sepa más o menos cuándo pulsaste puede reproducir tu sorteo. Ninguno de los dos fallos es hipotético; son las razones estándar por las que se impugnan los sorteos online.",
            "crypto.getRandomValues es la fuente criptográficamente segura del navegador: su salida está diseñada para ser impredecible incluso para quien haya visto todas las salidas anteriores, y se siembra desde la entropía de hardware del sistema operativo. Esta herramienta la usa exclusivamente — la misma fuente de la que dependen la generación de contraseñas y claves.",
            "Una consecuencia práctica: los resultados aquí no son reproducibles por nadie, ni siquiera por ti. Para sorteos auditables, el flujo honesto es publicar límites y cantidad antes del sorteo, generar en presencia de testigos o en directo, y copiar el resultado de inmediato — la página no conserva nada, lo cual es una propiedad de privacidad, no una limitación que rodear.",
          ],
        },
        {
          heading: "Con o sin reemplazo, y dónde encaja cada uno",
          paragraphs: [
            "Dos modos de muestreo responden a dos preguntas distintas. Con reemplazo — cada extracción independiente, duplicados permitidos — responde a “dame N números aleatorios”: datos de prueba, muestreo tipo Monte Carlo, dados. Sin reemplazo — como sacar bolas numeradas de una urna — responde a “elige N ganadores de M participantes”: rifas, regalos, orden aleatorio de una lista.",
            "Sin reemplazo tiene una regla dura: no puedes extraer más números únicos de los que el rango contiene. Una herramienta que en ese caso silencia, repite en bucle o sesga está rota; esta se niega y lo explica. Ordenar la salida tras un sorteo único solo cambia la presentación — el conjunto de ganadores es el mismo — pero en una rifa con puestos, conserva el orden de extracción y trata el primer número como primer premio.",
          ],
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
      deepDive: [
        {
          heading: "O viés de módulo: o bug que a maioria das páginas de aleatórios tem",
          paragraphs: [
            "Computadores produzem inteiros aleatórios de 32 bits, e quase nenhuma faixa útil divide 2^32 de forma exata. A abordagem ingênua — pegar um número de 32 bits e aplicar o módulo do tamanho da faixa — empilha o resto na parte baixa da faixa: com uma faixa de 10, alguns números ficam mensuravelmente mais prováveis que outros. Num jogo não se nota; numa rifa com prêmios é um bug de justiça.",
            "A correção é a amostragem por rejeição: extrai-se um valor de 32 bits e, se ele cair no resto sobrando no alto do espaço, descarta-se e extrai-se de novo. Os valores aceitos cobrem a faixa numa janela exatamente uniforme, então cada inteiro entre o mínimo e o máximo carrega com precisão a probabilidade 1/(max−min+1). Custa algumas extrações extras em média e compra justiça matemática.",
            "Esta ferramenta aplica esse passo e o diz com clareza, porque “aleatoriedade criptográfica” sozinha não garante uniformidade — o viés se esconde justamente no mapeamento dos bytes crus para a sua faixa. Ao publicar resultados de rifa, o indicador de entropia (log2 do tamanho da faixa, acumulado sobre o sorteio) documenta quanta aleatoriedade genuína decidiu o desfecho.",
          ],
        },
        {
          heading: "CSPRNG versus Math.random e o relógio",
          paragraphs: [
            "O Math.random() é um gerador pseudoaleatório ajustado para velocidade: seu estado interno é finito, e observar saídas suficientes o revela, depois do que todo número “futuro” é calculável. Semear pelo relógio do sistema é pior — relógios andam de forma previsível, então quem souber mais ou menos quando você clicou reproduz seu sorteio. Nenhuma dessas falas é hipotética; são as razões padrão pelas quais sorteios online são contestados.",
            "O crypto.getRandomValues é a fonte criptograficamente segura do navegador: sua saída é desenhada para ser imprevisível mesmo para quem viu todas as saídas anteriores, e é semeada pela entropia de hardware do sistema operacional. Esta ferramenta usa exclusivamente ela — a mesma fonte em que se apoiam a geração de senhas e chaves.",
            "Uma consequência prática: os resultados aqui não são reproduzíveis por ninguém, nem por você. Para rifas auditáveis, o fluxo honesto é publicar limites e quantidade antes do sorteio, gerar na frente de testemunhas ou em transmissão, e copiar o resultado na hora — a página não guarda nada, o que é uma propriedade de privacidade, não uma limitação a contornar.",
          ],
        },
        {
          heading: "Com ou sem reposição, e onde cada um cabe",
          paragraphs: [
            "Dois modos de amostragem respondem a duas perguntas diferentes. Com reposição — cada extração independente, duplicatas permitidas — responde a “me dê N números aleatórios”: dados de teste, amostragem tipo Monte Carlo, dados de jogo. Sem reposição — como tirar bolas numeradas de uma urna — responde a “escolha N ganhadores entre M inscritos”: rifas, brindes, ordem aleatória de uma lista.",
            "Sem reposição tem uma regra dura: você não pode extrair mais números únicos do que a faixa contém. Uma ferramenta que nesse caso silencia, repete em loop ou vicia está quebrada; esta recusa e explica. Ordenar a saída depois de um sorteio único muda só a apresentação — o conjunto de ganhadores é o mesmo — mas numa rifa com colocações, preserve a ordem do sorteio e trate o primeiro número como primeiro prêmio.",
          ],
        },
      ],
    },
  },
});
