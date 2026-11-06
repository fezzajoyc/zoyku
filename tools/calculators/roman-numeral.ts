import { CalcEngineConverters } from "../_engines/calc-engine-converters";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "roman-numeral",
  category: "utility",
  icon: "text",
  engine: { component: CalcEngineConverters, props: { kind: "roman" } },
  related: ["binary-converter", "date-calculator", "timestamp-converter", "scientific-calculator", "body-fat-calculator", "tip-calculator", "cooking-conversion", "age-calculator", "calorie-calculator", "aspect-ratio-calculator"],
  copy: {
    en: {
      name: "Roman Numeral Converter",
      tagline: "Convert numbers to Roman numerals and back, in both directions at once — with strict classical validation of subtractive notation.",
      intro: [
        "Type an Arabic number (1–3999) and see its Roman form, or type a numeral and get the number — both fields are live, so you can correct either side. The parser enforces classical rules: I before V/X, X before L/C, C before D/M.",
        "Handy for clock faces, book chapters, film years, monument inscriptions and Super Bowl numbers — anywhere Roman numerals still appear.",
        "Conversion uses the standard subtractive set — IV, IX, XL, XC, CD, CM — and the classical constraint that no numeral may repeat more than three times, which is why the range stops at 3,999 (MMMCMXCIX): classical notation had no symbol larger than M without the vinculum overline.",
        "Compared with lookup tables, both directions convert live in one input pair, so editing either side updates instantly — useful for numbering documents, chapters or annual editions. The parser rejects malformed forms such as IIV or VIV rather than guessing. Watch for historical variants: clock faces deliberately use IIII, and old inscriptions mix conventions.",
      ],
      steps: [
        "Enter a number between 1 and 3999 to get its Roman numeral.",
        "Or type a Roman numeral — the number appears instantly.",
        "Invalid forms like VIIII or IM are flagged with an explanation of the rules.",
      ],
      faqs: [
        {
          q: "Why is 4000 the upper limit (MMMCMXCIX)?",
          a: "Classical Roman notation has no digit larger than M (1000), and repeating M four times (MMMM) was not used. The largest number expressible in strict classical form is 3999, written MMMCMXCIX.",
        },
        {
          q: "Why is VIIII rejected when clocks sometimes show it?",
          a: "Some clock faces use additive IIII for four, but the standard classical system requires subtractive IV. This tool validates against the strict canonical regex, so VIIII, IC or IM are flagged rather than silently converted.",
        },
        {
          q: "Does the converter accept lowercase letters?",
          a: "Yes — input like mcmxciv is uppercased automatically and converted to 1994. The output is always shown in uppercase, as inscriptions traditionally are.",
        },
      ],
      deepDive: [
        {
          heading: "A system with no zero — and why that shapes everything",
          paragraphs: [
            "Roman numerals are an additive-subtractive notation, not a positional one: each symbol has a fixed value wherever it stands, and there is no zero and no place value. That single fact explains both the strengths and the limits of the system. Addition is trivial — just gather the symbols — but multiplication and division are laborious, which is why Roman merchants calculated on abacuses and wrote the results in numerals.",
            "The absence of zero also caps the range. Classical notation's largest symbol is M (1000), and the convention against writing a letter more than three times means the largest strictly well-formed number is MMMCMXCIX — 3999. Mediaeval writers later invented the vinculum, an overline multiplying a numeral by 1,000, to reach larger values, but it never became part of the classical canon, so converters that stay classical stop where this one does.",
            "The strict rules are modern tidiness as much as ancient practice. The subtractive pairs (IV, IX, XL, XC, CD, CM) were used inconsistently on real Roman inscriptions — IIII appears alongside IV on colosseum gates — and the canonical regex this tool validates against reflects the standardized classical form that printers and type designers later settled on.",
          ],
        },
        {
          heading: "The IIII clock-face tradition",
          paragraphs: [
            "Look at almost any traditional clock face and you will see IIII where the classical rule says IV. This is one of the oldest and most persistent variant conventions, and clockmakers have used the additive form for centuries — on sundials, church clocks and watch dials alike.",
            "No single reason is documented beyond doubt, and the plausible explanations stack up rather than compete. Visual balance: IIII sits opposite VIII on the dial and their combined strokes harmonize; with IV the left half of the dial looks heavier. Manufacturing: casting four identical I punches was cheaper than cutting a separate IV mold. Royal lore: legends claim a king objected to IV as too close to the god Jupiter (written IVPITER in Latin), though that story is tradition rather than verified history.",
            "Whatever the origin, the takeaway for a converter user is that IIII is a legitimate historical form that strict classical validation rejects. This tool enforces the canonical system — IV, never IIII — because a converter's job is one consistent answer, not an encyclopedia of variants. When you meet IIII on a dial, read it as 4; when you write a numeral, write the canonical form.",
          ],
        },
        {
          heading: "Strict validation and the variants it rejects",
          paragraphs: [
            "The parser accepts exactly one canonical spelling per number and rejects the rest, with the rule explained. That means VIIII (additive 9), IIM (subtractive beyond one step down), IC (subtracting across two ranks) and VX are all flagged rather than guessed at. The strictness is deliberate: ambiguous input is where silent errors live, and a converter that guesses teaches nothing.",
            "Historical usage was looser than the canon. Old inscriptions and manuscripts show additive forms, irregular subtractives and even letters whose values shifted over time — mediaeval numerals sometimes ran non-standard shapes entirely. If you are transcribing an original source, expect to meet forms this tool rejects; the validator still helps there, by telling you exactly which classical rule each variant breaks.",
            "Lowercase input is accepted and normalized to uppercase, matching how inscriptions were traditionally cut. Everything runs locally in the browser — paste film years, chapter numbers or monument inscriptions freely; nothing is sent anywhere, and both directions stay live so you can proof either side against the other.",
          ],
        },
      ],
    },
    zh: {
      name: "罗马数字转换",
      tagline: "阿拉伯数字与罗马数字双向即时互转,严格校验经典减法记数规则,时钟、章节、年份一查便知。",
      intro: [
        "输入阿拉伯数字(1–3999)即可得到罗马数字;输入罗马数字也能立即得到对应数字。两侧实时联动,任意一边都可以修改。解析器强制执行经典规则:I 在 V/X 前、X 在 L/C 前、C 在 D/M 前。",
        "适合查钟表盘、书籍章节、电影年份、碑文铭刻和超级碗届数——罗马数字仍然出现的每个角落。",
      ],
      steps: [
        "输入 1–3999 之间的数字,得到对应罗马数字。",
        "或输入罗马数字,对应的数字立即出现。",
        "VIIII、IM 之类的非法写法会被标记,并说明原因。",
      ],
      faqs: [
        {
          q: "为什么上限是 3999(MMMCMXCIX)?",
          a: "经典罗马记数中没有大于 M(1000)的符号,把 M 连写四次(MMMM)也不符合规范。严格经典形式能表示的最大数就是 3999,写作 MMMCMXCIX。",
        },
        {
          q: "钟表上常见 VIIII,为什么这里判为无效?",
          a: "有些表盘用加法的 IIII 表示 4,但标准经典体系要求用减法 IV。本工具按严格的规范正则校验,因此 VIIII、IC、IM 会被标记而不是默默转换。",
        },
        {
          q: "支持小写字母吗?",
          a: "支持——mcmxciv 这样的输入会自动转成大写并换算为 1994。输出始终为大写,与碑文传统一致。",
        },
      ],
      deepDive: [
        {
          heading: "一个没有零的系统——这决定了它的一切",
          paragraphs: [
            "罗马数字是加减式记数法,不是位值制:每个符号无论站在哪个位置都有固定值,没有零,也没有数位。这一个事实同时解释了这套系统的强项和极限。加法极其简单——把符号归拢即可——但乘法和除法非常吃力,所以罗马商人在算盘上运算,再用数字把结果记下来。",
            "没有零也封死了表示范围。经典记数中最大的符号是 M(1000),而“同一字母最多连写三次”的惯例意味着严格合法的最大数就是 MMMCMXCIX——3999。中世纪的书写者后来发明了 vinculum(上划线,表示乘以 1000)来表示更大的数,但它从未进入经典规范,所以坚持经典口径的转换器都在这里止步。",
            "严格的规则一半是现代整理的结果。真实罗马碑文里减法组合(IV、IX、XL、XC、CD、CM)用得并不一致——斗兽场的门上 IIII 与 IV 并存——本工具校验所依据的规范形式,其实是后来的印刷商和字体设计师整理定型的经典标准。",
          ],
        },
        {
          heading: "钟表盘上的 IIII 传统",
          paragraphs: [
            "几乎任何一块传统钟表盘上,你都会在“经典规则要求写 IV”的位置看到 IIII。这是最古老也最顽固的变体传统之一,几百年里制表师在日晷、教堂大钟和腕表表盘上一直沿用加法式写法。",
            "成因没有一条有确凿的定论,各种解释更像叠加而不是互斥。视觉平衡:IIII 与表盘对侧的 VIII 笔画呼应;用 IV 会让表盘左半边显得更重。工艺:铸四个相同的 I 字冲头,比单独开 IV 的模更便宜。王室传说:有故事说某位国王嫌 IV 太接近朱庇特神(拉丁文写作 IVPITER)的名号——但那只是传说,不是被证实的历史。",
            "对使用者来说结论很清楚:IIII 是合法的历史写法,但会被严格的经典校验拒绝。本工具强制执行规范体系——用 IV,不用 IIII——因为转换器的职责是给出唯一一致的答案,而不是罗列变体百科。在表盘上见到 IIII,读作 4;自己写罗马数字时,写规范形式。",
          ],
        },
        {
          heading: "严格校验,以及它拒绝的变体",
          paragraphs: [
            "解析器对每个数字只接受唯一一种规范写法,其余一律拒绝并说明违反的规则。VIIII(加法的 9)、IIM(一步减不下去)、IC(跨两级相减)、VX 这类形式都会被标记,而不是被猜测。严格是刻意的:歧义输入正是静默错误的温床,会猜测的转换器什么也教不了你。",
            "历史上的用法比规范松散得多。古碑文和手稿里能看到加法式、不规则的减法式,甚至有些字母的值随年代变化——中世纪数字有时整串都不合标准。如果你在转录原始文献,遇到被拒绝的形式是常态;这时校验器依然有用,它会告诉你每个变体具体违反了哪条经典规则。",
            "小写输入会被接受并归一成大写,与碑文的传统刻法一致。全程在浏览器本地运行——电影年份、章节编号、碑文铭刻随便粘贴;数据不出设备,双向实时联动,任何一边都可以对照校验另一边。",
          ],
        },
      ],
    },
    ja: {
      name: "ローマ数字変換",
      tagline: "アラビア数字とローマ数字を双方向でリアルタイム変換。減算法の古典規則を厳格に検証します。",
      intro: [
        "アラビア数字(1〜3999)を入力すればローマ数字が、ローマ数字を入力すれば対応する数が即座に表示されます。両欄が連動しているので、どちらを直しても構いません。解析器は古典規則(I は V/X の前、X は L/C の前、C は D/M の前)を強制します。",
        "時計の文字盤、書籍の章、映画の年、記念碑の銘文、スーパーボウルの回数など、ローマ数字が今も使われる場面で便利です。",
      ],
      steps: [
        "1〜3999 の数値を入力するとローマ数字が出ます。",
        "またはローマ数字を入力すると、数値が即座に表示されます。",
        "VIIII や IM のような不正な形は、規則の説明とともに指摘されます。",
      ],
      faqs: [
        {
          q: "上限が 3999(MMMCMXCIX)なのはなぜですか?",
          a: "古典的なローマ記法には M(1000)より大きい記号がなく、M を 4 回並べる(MMMM)のは正式ではありません。厳密な古典形式で表せる最大数は 3999、MMCMXCIX ではなく MMMCMXCIX です。",
        },
        {
          q: "時計で見かける VIIII が不可なのは?",
          a: "文字盤によっては加算の IIII を使いますが、標準的な古典体系では減算の IV が規則です。このツールは厳格な正規表現で検証するため、VIIII・IC・IM は黙って変換されず指摘されます。",
        },
        {
          q: "小文字も入力できますか?",
          a: "はい。mcmxciv のような入力は自動で大文字に整えられ、1994 に変換されます。出力は碑文の伝統に倣い、常に大文字で表示します。",
        },
      ],
      deepDive: [
        {
          heading: "ゼロを持たない体系——それがすべてを決める",
          paragraphs: [
            "ローマ数字は位取り記数法ではなく加減式の記法です。各記号は立つ位置にかかわらず固定の値を持ち、ゼロも位もありません。この一事実が体系の強みと限界の両方を説明します。加算は簡単——記号を集めるだけ——ですが、乗算と除算は骨の折れる作業で、ローマの商人はそろばんで計算し、結果を数字で書き留めていました。",
            "ゼロがないことは表現範囲も制限します。古典記法で最大の記号は M(1000)であり、同じ字を 3 回までしか並べない慣行があるため、厳密に正しい形で書ける最大数は MMMCMXCIX——3999 です。中世の書き手は後に大きな数のためにビンキュラム(上線、1,000 倍を表す)を考案しましたが、古典の正典には組み込まれず、古典基準を守る変換器はどこもこの値で止まります。",
            "厳格な規則は、古代の実践と同じくらい現代の整理の産物です。減算の組(IV・IX・XL・XC・CD・CM)は実際のローマ碑文では一貫せず、コロッセオの門では IIII と IV が併存します。このツールの検証基準である正典形は、後の印刷業者や書体設計者が整えた標準化された古典形です。",
          ],
        },
        {
          heading: "時計の文字盤と IIII の伝統",
          paragraphs: [
            "伝統的な時計の文字盤のほとんどすべてで、古典規則が IV を求める場所に IIII が並んでいます。これは最も古く最も根強い変体慣行の一つで、時計職人は何世紀にもわたり日時計・教会の時計・腕時計の文字盤で加算形を使い続けてきました。",
            "理由として疑いようのない定説は一つもなく、有力な説明は競合ではなく積み重なっています。視覚の均衡:IIII は文字盤で VIII の対面にあり画数が調和し、IV では盤面の左半分が重く見えます。製造:同じ I のポンチ 4 つを打つのは、別に IV の型を起こすより安上がりでした。王室の伝承:ある王が IV を神ユピテル(ラテン語で IVPITER と書く)に近すぎるとして嫌ったという話がありますが、これは伝説であって検証された歴史ではありません。",
            "利用者への結論は明快です。IIII は正当な歴史的形ですが、厳格な古典検証には拒まれます。このツールは正典体系を強制します——IV であって IIII ではありません。変換器の役割は一貫した唯一の答えを出すことであって、変体の百科事典になることではないからです。文字盤で IIII に出会ったら 4 と読み、書くときは正典形を書いてください。",
          ],
        },
        {
          heading: "厳格検証と、それが拒む変体",
          paragraphs: [
            "解析器は各数に対して正確に一つの正典表記だけを受け入れ、残りは規則の説明とともに拒みます。VIIII(加算の 9)、IIM(1 段の減算の範囲を超える)、IC(二階級またぎの減算)、VX はいずれも推測されず指摘されます。厳格さは意図的です。曖昧な入力こそ静かな誤りの住処であり、推測する変換器は何も教えてくれません。",
            "歴史上の用法は正典よりずっと緩いものでした。古い碑文や写本には加算形、不規則な減算形、時期によって値が変わった文字まで現れます。中世の数字は全体が非標準の形をしていることもあります。原典を書き起こすなら、このツールが拒む形に出会うのは織り込み済みです。それでも検証器は役に立ちます。各変体が古典のどの規則を破っているかを正確に教えるからです。",
            "小文字の入力は受け入れられ大文字へ正規化されます。碑文が伝統的に彫られた形に合わせたものです。すべてブラウザ内でローカルに動きます。映画の年、章番号、記念碑の銘文を自由に貼り付けてください。どこにも送信されず、両方向が常に連動しているので、どちらの側でももう一方に対して校正できます。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de números romanos",
      tagline: "Convierte números a romanos y viceversa en ambas direcciones a la vez, con validación estricta de la notación sustractiva clásica.",
      intro: [
        "Escriba un número arábigo (1–3999) y verá su forma romana, o escriba un numeral y obtendrá el número: ambos campos están conectados en vivo, así que puede corregir cualquiera de los dos. El analizador aplica las reglas clásicas: I antes de V/X, X antes de L/C, C antes de D/M.",
        "Útil para esferas de reloj, capítulos de libros, años de películas, inscripciones de monumentos y ediciones de la Super Bowl, donde los romanos siguen apareciendo.",
      ],
      steps: [
        "Introduzca un número entre 1 y 3999 para obtener su numeral romano.",
        "O escriba un numeral romano: el número aparece al instante.",
        "Las formas no válidas como VIIII o IM se marcan con una explicación de las reglas.",
      ],
      faqs: [
        {
          q: "¿Por qué el límite es 3999 (MMMCMXCIX)?",
          a: "La notación romana clásica no tiene símbolo mayor que M (1000) y repetir M cuatro veces (MMMM) no se usaba. El mayor número expresable en forma clásica estricta es 3999, escrito MMMCMXCIX.",
        },
        {
          q: "¿Por qué se rechaza VIIII si algunos relojes lo muestran?",
          a: "Algunas esferas usan el aditivo IIII para el cuatro, pero el sistema clásico estándar exige el sustractivo IV. Esta herramienta valida con la forma canónica estricta, así que VIIII, IC o IM se marcan en lugar de convertirse sin más.",
        },
        {
          q: "¿Acepta letras minúsculas?",
          a: "Sí: una entrada como mcmxciv se pasa a mayúsculas automáticamente y se convierte en 1994. La salida siempre se muestra en mayúsculas, como en las inscripciones tradicionales.",
        },
      ],
      deepDive: [
        {
          heading: "Un sistema sin cero — y por qué eso lo condiciona todo",
          paragraphs: [
            "Los números romanos son una notación aditiva-sustractiva, no posicional: cada símbolo tiene un valor fijo dondequiera que esté, sin cero y sin valor de posición. Ese único hecho explica las fortalezas y los límites del sistema. La suma es trivial — basta reunir los símbolos — pero la multiplicación y la división son laboriosas, razón por la que los comerciantes romanos calculaban en ábaco y escribían el resultado en numerales.",
            "La ausencia de cero también limita el rango. El símbolo mayor de la notación clásica es M (1000), y la convención de no repetir una letra más de tres veces implica que el número estrictamente bien formado más grande es MMMCMXCIX — 3999. Escritores medievales inventaron después el vínculo, una barra superior que multiplica el numeral por 1.000, para llegar a valores mayores, pero nunca entró en el canon clásico, así que los conversores clásicos se detienen donde este lo hace.",
            "Las reglas estrictas son orden moderno tanto como práctica antigua. En inscripciones romanas reales los pares sustractivos (IV, IX, XL, XC, CD, CM) se usaban de forma inconsistente — IIII aparece junto a IV en las puertas del coliseo — y la forma canónica contra la que valida esta herramienta refleja el estándar que impresores y tipógrafos fijaron después.",
          ],
        },
        {
          heading: "La tradición del IIII en las esferas de reloj",
          paragraphs: [
            "Mire casi cualquier esfera tradicional y verá IIII donde la regla clásica pide IV. Es una de las convenciones variantes más antiguas y persistentes, y los relojeros han usado la forma aditiva durante siglos — en relojes de sol, campanarios y esferas de pulsera por igual.",
            "Ninguna razón única está documentada sin duda, y las explicaciones plausibles se acumulan en vez de competir. Equilibrio visual: IIII se sitúa frente a VIII en la esfera y sus trazos armonizan; con IV la mitad izquierda del dial se ve más pesada. Fabricación: fundir cuatro punzones idénticos de I salía más barato que abrir un molde específico de IV. Leyenda real: se cuenta que un rey rechazó IV por su cercanía al dios Júpiter (escrito IVPITER en latín), aunque esa historia es tradición más que historia verificada.",
            "Sea cual sea el origen, la lección para quien usa un conversor es que IIII es una forma histórica legítima que la validación clásica estricta rechaza. Esta herramienta impone el sistema canónico — IV, nunca IIII — porque el trabajo de un conversor es una única respuesta consistente, no una enciclopedia de variantes. Cuando se tope con IIII en un dial, léalo como 4; cuando escriba un numeral, escriba la forma canónica.",
          ],
        },
        {
          heading: "Validación estricta y las variantes que rechaza",
          paragraphs: [
            "El analizador acepta exactamente una ortografía canónica por número y rechaza las demás, explicando la regla. VIIII (aditivo 9), IIM (sustracción de más de un escalón), IC (sustracción a través de dos rangos) y VX se marcan en lugar de adivinarse. La rigidez es deliberada: la entrada ambigua es donde viven los errores silenciosos, y un conversor que adivina no enseña nada.",
            "El uso histórico fue más laxo que el canon. Inscripciones y manuscritos antiguos muestran formas aditivas, sustractivos irregulares e incluso letras cuyo valor cambió con el tiempo — los numerales medievales a veces adoptaron formas por completo no estándar. Si transcribe una fuente original, espere encontrarse formas que esta herramienta rechaza; el validador sigue ayudando, porque le dice exactamente qué regla clásica rompe cada variante.",
            "La entrada en minúsculas se acepta y se normaliza a mayúsculas, siguiendo el corte tradicional de las inscripciones. Todo corre localmente en el navegador — pegue años de cine, capítulos o inscripciones con libertad; nada se envía a ningún sitio, y ambas direcciones permanecen en vivo para que coteje un lado contra el otro.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de números romanos",
      tagline: "Converta números em romanos e vice-versa nos dois sentidos ao mesmo tempo, com validação rigorosa da notação subtrativa clássica.",
      intro: [
        "Digite um número arábico (1–3999) e veja a forma romana, ou digite um numeral e receba o número — os dois campos são ligados ao vivo, então você pode corrigir qualquer um dos lados. O parser aplica as regras clássicas: I antes de V/X, X antes de L/C, C antes de D/M.",
        "Útil para mostradores de relógio, capítulos de livros, anos em filmes, inscrições em monumentos e números do Super Bowl — onde os romanos ainda aparecem.",
      ],
      steps: [
        "Digite um número entre 1 e 3999 para obter o numeral romano.",
        "Ou digite um numeral romano — o número aparece na hora.",
        "Formas inválidas como VIIII ou IM são sinalizadas com uma explicação das regras.",
      ],
      faqs: [
        {
          q: "Por que o limite é 3999 (MMMCMXCIX)?",
          a: "A notação romana clássica não tem símbolo maior que M (1000) e repetir M quatro vezes (MMMM) não era usado. O maior número expressável na forma clássica estrita é 3999, escrito MMMCMXCIX.",
        },
        {
          q: "Por que VIIII é rejeitado se alguns relógios o usam?",
          a: "Alguns mostradores usam o aditivo IIII para o quatro, mas o sistema clássico padrão exige o subtrativo IV. A ferramenta valida pela forma canônica estrita, então VIIII, IC ou IM são sinalizados em vez de convertidos sem critério.",
        },
        {
          q: "Aceita letras minúsculas?",
          a: "Sim — entradas como mcmxciv viram maiúsculas automaticamente e convertem para 1994. A saída sempre aparece em maiúsculas, como nas inscrições tradicionais.",
        },
      ],
      deepDive: [
        {
          heading: "Um sistema sem zero — e por que isso molda tudo",
          paragraphs: [
            "Os numerais romanos são uma notação aditiva-subtrativa, não posicional: cada símbolo tem um valor fixo onde quer que esteja, sem zero e sem valor de posição. Esse único fato explica os pontos fortes e os limites do sistema. A soma é trivial — basta juntar os símbolos — mas multiplicação e divisão são trabalhosas, razão pela qual comerciantes romanos calculavam no ábaco e escreviam o resultado em numerais.",
            "A ausência do zero também limita a faixa. O maior símbolo da notação clássica é M (1000), e a convenção de não repetir uma letra mais de três vezes significa que o maior número estritamente bem formado é MMMCMXCIX — 3999. Escritores medievais inventaram depois o vínculo, uma barra superior que multiplica o numeral por 1.000, para alcançar valores maiores, mas ele nunca entrou no cânone clássico, então conversores que ficam no clássico param onde este para.",
            "As regras rigorosas são arrumação moderna tanto quanto prática antiga. Em inscrições romanas reais, os pares subtrativos (IV, IX, XL, XC, CD, CM) eram usados de forma inconsistente — IIII aparece junto com IV nos portões do coliseu — e a forma canônica contra a qual esta ferramenta valida reflete o padrão que impressores e tipógrafos fixaram depois.",
          ],
        },
        {
          heading: "A tradição do IIII nos mostradores de relógio",
          paragraphs: [
            "Olhe quase qualquer mostrador tradicional e verá IIII onde a regra clássica pede IV. É uma das convenções variantes mais antigas e persistentes, e relojoeiros usam a forma aditiva há séculos — em relógios de sol, torres de igreja e mostradores de pulso igualmente.",
            "Nenhuma razão única está documentada fora de dúvida, e as explicações plausíveis se acumulam em vez de competir. Equilíbrio visual: IIII fica de frente para VIII no mostrador e seus traços combinam; com IV, a metade esquerda do mostrador parece mais pesada. Fabricação: fundir quatro punções idênticas de I saía mais barato que abrir um molde específico de IV. Lenda real: conta-se que um rei rejeitou IV por ficar perto do deus Júpiter (escrito IVPITER em latim), mas essa história é tradição, não história verificada.",
            "Seja qual for a origem, a lição para quem usa um conversor é que IIII é uma forma histórica legítima que a validação clássica rigorosa rejeita. Esta ferramenta impõe o sistema canônico — IV, nunca IIII — porque o trabalho de um conversor é uma única resposta consistente, não uma enciclopédia de variantes. Quando encontrar IIII num mostrador, leia como 4; quando escrever um numeral, escreva a forma canônica.",
          ],
        },
        {
          heading: "Validação rigorosa e as variantes que ela rejeita",
          paragraphs: [
            "O parser aceita exatamente uma grafia canônica por número e rejeita as demais, explicando a regra. VIIII (aditivo 9), IIM (subtração além de um degrau), IC (subtração atravessando duas ordens) e VX são sinalizados em vez de adivinhados. O rigor é deliberado: entrada ambígua é onde mora o erro silencioso, e um conversor que adivinha não ensina nada.",
            "O uso histórico era mais solto que o cânone. Inscrições e manuscritos antigos mostram formas aditivas, subtrativos irregulares e até letras cujo valor mudou com o tempo — numerais medievais às vezes assumiam formas completamente não padrão. Se você está transcrevendo uma fonte original, espere encontrar formas que esta ferramenta rejeita; o validador ainda ajuda, porque diz exatamente qual regra clássica cada variante quebra.",
            "Entrada em minúsculas é aceita e normalizada para maiúsculas, acompanhando o corte tradicional das inscrições. Tudo roda localmente no navegador — cole anos de filmes, capítulos ou inscrições à vontade; nada é enviado a lugar algum, e os dois sentidos permanecem ao vivo para que você confira um lado contra o outro.",
          ],
        },
      ],
    },
  },
});
