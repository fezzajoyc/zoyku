import { CalcEngineShoeSize } from "../_engines/calc-engine-shoe-size";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "shoe-size-converter",
  category: "utility",
  icon: "ruler",
  engine: { component: CalcEngineShoeSize },
  related: ["length-converter", "bmi-calculator", "heart-rate-zones-calculator", "cooking-conversion", "body-fat-calculator", "tip-calculator", "date-calculator", "age-calculator", "calorie-calculator", "aspect-ratio-calculator"],
  copy: {
    en: {
      name: "Shoe Size Converter",
      tagline: "Convert shoe sizes between US, UK, EU and Japanese systems for men and women — anchored to foot length in centimeters.",
      intro: [
        "Pick any system and size, and every equivalent appears at once, anchored to foot length in centimeters so the comparison is physical, not a guess.",
        "Sizing is not standardized across brands — treat results as a starting point and measure your feet at the end of the day, when they are largest.",
        "The conversion anchors on foot length in centimeters and follows published charts for US (men's and women's), UK, EU and Mondopoint sizing, each half-size step worth roughly 4–5 mm. Because lasts differ between brands — a US 10 in one fits like 9.5 in another — the anchor keeps the comparison physical rather than nominal.",
        "Compared with brand-by-brand guessing, one input shows every system at once, which is what ordering shoes across regions needs. Size charts are conventions, not guarantees: measure both feet at day's end when they are largest, fit the larger foot, and check the retailer's own chart for that brand. When two sizes straddle, take the larger for closed shoes.",
      ],
      steps: [
        "Choose men's or women's sizing.",
        "Pick the system you know and enter the size.",
        "Read the equivalent sizes in every other system.",
      ],
      faqs: [
        {
          q: "Why do brands differ by half a size?",
          a: "Last shapes and manufacturing vary. The table gives the standard conversion; individual brands may run small or large, so always check the brand's own chart when ordering online.",
        },
        {
          q: "How do I measure my feet?",
          a: "Stand on a sheet of paper at the end of the day, trace both feet, and measure heel to longest toe in centimeters. Use the larger foot.",
        },
      ],
      deepDive: [
        {
          heading: "Why shoe sizes are a mess of conventions",
          paragraphs: [
            "Shoe size numbers are arbitrary, and each region invented its own scale. The US and UK systems number sizes from a barleycorn-based ladder — each full size step worth about a third of an inch (roughly 8.5 mm) — while the EU scale divides foot length by a base figure with its own rounding, and Japan uses Mondopoint, which is simply the foot length in centimeters. None of the scales share a common zero, which is why the same physical foot can read a 9 in one system and a 42 in another.",
            "The men's and women's scales in the US and UK are offset from each other — a US women's 8 corresponds to roughly a men's 6.5 — because women's sizing historically ran its own ladder about 1.5 sizes above men's. This is why a unisex converter needs the gender selector: converting a women's size through the men's ladder without the offset lands you two sizes off, one of the most common mistakes when shopping unisex styles.",
            "Anchoring on foot length in centimeters sidesteps most of this: length is the physical fact, size numbers are labels. Half a size is worth roughly 4–5 mm of length, so when a chart places you between two sizes, your measured centimeters tell you which side of the gap your foot actually sits on.",
          ],
        },
        {
          heading: "How to use a conversion honestly",
          paragraphs: [
            "Feet swell through the day — standing, walking and heat push blood into the tissue — so a morning measurement can read a half size under the shoe you will actually need by evening. Measure at day's end, standing with full weight on the foot, and trace or measure both feet: most people's feet differ slightly, and the shoe must fit the larger one.",
            "Brands build shoes on different lasts — the foot-shaped mold the shoe is formed around — and a last that is narrow at the heel or roomy at the toe changes fit without changing the stamped size number. A US 10 in one brand fitting like a 9.5 in another is normal, not a chart error. Online retailers publish their own size notes (“runs small”, “size up half”); those notes outrank any universal table.",
            "When your converted size sits between two options, take the larger for closed shoes — leather stretches, socks take up room, and a slightly loose shoe adjusts better than a pinching one. For straps, sandals and open styles, sizing down is safer. Treat every conversion here as the center of a range, then let the brand's own chart narrow it.",
          ],
        },
        {
          heading: "Systems in detail and local execution",
          paragraphs: [
            "Mondopoint (the ISO-referenced foot-length measure, used by Japan and by ski boots worldwide) is the most rational of the systems: a Japanese 25.0 means a 25 cm foot, no offset and no gender split in principle. The EU scale is the loosest — it is enforced by practice rather than a tight standard, and French/German sources disagree by a size at some points. US and UK charts are precise but split by gender, and UK runs exactly one size below US men's at most points on the scale.",
            "Children's sizing is its own world — growth-room conventions like a full thumb-width of extra space are common, and kids' ladders in the US and UK differ from the adult ones. This converter covers adult men's and women's charts; kids' conversions need a dedicated children's table.",
            "The whole table runs in your browser from static published charts — no account, no measurement upload, nothing stored. Reopen it whenever a brand's chart surprises you; comparing its numbers against the standard anchor is usually enough to see whether the brand runs small or the chart simply uses a different rounding.",
          ],
        },
      ],
    },
    zh: {
      name: "鞋码换算",
      tagline: "美码、英码、欧码、日码鞋码互转,男女款分开对照,以脚长厘米为基准。",
      intro: [
        "选定任意码制与尺码,所有体系的对应码一次性显示——锚点是脚长厘米,比较的是实际尺寸而非猜测。",
        "各品牌尺码并不统一——结果当起点,傍晚双脚最大时量脚最准。",
      ],
      steps: [
        "选择男款或女款。",
        "选择你熟悉的码制并输入尺码。",
        "查看其余所有体系的对应尺码。",
      ],
      faqs: [
        {
          q: "为什么品牌间会差半码?",
          a: "楦型与工艺不同。表格给出标准换算,品牌可能偏大或偏小,网购时请以品牌自己的尺码表为准。",
        },
        {
          q: "怎么量脚长?",
          a: "傍晚站纸上描下双脚,量脚跟到最长趾尖的厘米数,取较大的那只脚。",
        },
      ],
      deepDive: [
        {
          heading: "鞋码为什么是一堆互不相通的约定",
          paragraphs: [
            "鞋码数字本身是任意的,各地区各造了一套刻度。美码和英码基于“大麦粒”阶梯——一个整码约等于三分之一英寸(约 8.5 毫米);欧码用脚长除以一个基数、再按自己的方式取整;日码直接用 Mondopoint,就是脚长的厘米数。几套刻度连零点都不相同,所以同一只脚在一个体系里是 9 码,在另一个体系里是 42 码。",
            "美码和英码的男女刻度互有偏移——美制女款 8 码大致对应男款 6.5 码——因为历史上女款刻度整体比男款高出约 1.5 个码。这正是中性款换算器需要先选男女的原因:拿女码直接套男款阶梯而不做偏移,会差出约两码,这是买中性鞋最常见的错误。",
            "以脚长厘米为锚点可以绕开大部分麻烦:长度是物理事实,码数只是标签。半个码大约值 4–5 毫米,当换算把你卡在两个码之间时,量出来的厘米数会告诉你你的脚究竟落在间隙的哪一边。",
          ],
        },
        {
          heading: "怎样诚实地使用换算结果",
          paragraphs: [
            "脚在一天里会肿——站立、行走和热量都会让血液涌入组织——清晨量的尺寸可能比傍晚实际需要的鞋小半个码。请在傍晚、双脚承重站立时测量,并量两只脚:多数人双脚略有差异,鞋必须迁就较大的那只。",
            "品牌用不同的楦头(做鞋的脚形模具),楦在脚跟处收窄或脚趾处加宽都会改变合脚度,却不会改变印在鞋上的码数。一个品牌的美码 10 在另一家穿起来像 9.5,是正常现象而不是换算表错了。网购平台的尺码备注(“偏小,建议大半码”)优先于任何通用对照表。",
            "换算结果落在两个码之间时,闭口鞋取大的——皮会撑开、袜子也占空间,稍松的鞋比夹脚的鞋更好调整;绑带、凉鞋等开放款式则取小更稳妥。把这里的换算当作区间的中心,再让品牌自己的尺码表收窄范围。",
          ],
        },
        {
          heading: "各体系细说与本地运行",
          paragraphs: [
            "Mondopoint(以 ISO 为参照的脚长口径,日本和国际滑雪靴都在用)是各体系里最讲道理的:日本 25.0 码就是 25 厘米的脚,原则上不偏移、不分男女。欧码最松散——它靠行业惯例而非严格标准约束,法德来源在某些点位上能差出一个码。美码和英码精确但分男女,英码在刻度大部分位置上比美制男码整整低一号。",
            "童鞋是另一个世界——普遍采用留生长余量的惯例(如留一个拇指宽),而且美英的童码阶梯与成人款不同。本换算覆盖成人男女;童码需要专用的儿童对照表。",
            "整张表都在浏览器里从静态出版数据计算——不需要账号、不上传测量结果、不存储任何东西。某个品牌的尺码表让你意外时,随时回来对照标准锚点,通常一眼就能看出是品牌偏小,还是它的取整口径不同。",
          ],
        },
      ],
    },
    ja: {
      name: "靴サイズ変換",
      tagline: "US・UK・EU・JP の靴サイズを男女別に相互変換。足長センチを基準にした対応表です。",
      intro: [
        "好きなサイズ表記を入力すると、足長センチを基準にすべての表記が一度に表示されます。物理的なサイズでの比較です。",
        "ブランド間で規格は統一されていません。結果は目安にし、夕方に足を測るのが最も正確です。",
      ],
      steps: [
        "メンズ・レディースを選びます。",
        "知っている表記を選んでサイズを入力します。",
        "他のすべての表記の対応サイズを確認します。",
      ],
      faqs: [
        {
          q: "ブランドで半サイズずれるのはなぜ?",
          a: "ラスト形状と製造の差異です。表は標準変換で、ブランドにより小さめ・大きめに作られます。通販ではブランド独自のサイズ表を確認してください。",
        },
        {
          q: "足の測り方は?",
          a: "夕方に紙の上で立ち、かかとから最長の指先までを cm で測り、大きい方の足を採用します。",
        },
      ],
      deepDive: [
        {
          heading: "靴サイズが各階入りする理由",
          paragraphs: [
            "靴サイズの数字は任意のもので、地域ごとに別の目盛りが生まれました。米国と英国は「バーリーコーン」を基準にした階段を使います——1 サイズあたり約 1/3 インチ(約 8.5 mm)。EU 表記は足長を基準数で割って独自に丸めたもので、日本は Mondopoint、つまり足長の cm 数そのものです。各体系はゼロ点すら共有しないため、同じ足がある表記では 9、別の表記では 42 になります。",
            "米・英ではメンズとレディースの目盛りが互いにずれています——米国レディースの 8 はメンズの約 6.5 に相当。歴史的にレディースの階段はメンズより約 1.5 サイズ上に置かれてきたためです。ユニセックスの換算で性別を選ぶ必要があるのはこのためで、オフセットを無視してレディースの数値をメンズの階段に通すと約 2 サイズずれます。ユニセックス靴で最もよくある間違いです。",
            "足長 cm を基準にすると、この問題の大半を回避できます。長さは物理的事実で、数字はラベルにすぎません。半サイズはおよそ 4〜5 mm に相当するので、表が 2 つのサイズの間に置いたとき、測った cm 数がどちら側に足があるかを教えてくれます。",
          ],
        },
        {
          heading: "換算結果を正しく使うには",
          paragraphs: [
            "足は一日の中で膨らみます。立ち仕事や歩行、熱で組織に血が押し込まれるため、朝の測定は夕方に必要な靴より半サイズ小さく出ることがあります。夕方、体重を乗せて立った状態で測り、両足を測ってください。ほとんどの人は左右で少し差があり、靴は大きい方に合わせます。",
            "ブランドは異なるラスト(靴を成形する足型)の上に靴を作ります。かかとが細いラスト、つま先が広いラストは、刻印されたサイズを変えずにフィット感を変えます。あるブランドの US 10 が別のブランドでは 9.5 の履き心地になるのは正常で、表の誤りではありません。通販サイトの「小さめ・半サイズアップ推奨」といった注記は、どんな汎用表よりも優先します。",
            "換算結果が 2 つのサイズの間に落ちたとき、クローズドな靴では大きい方を選びます。革は伸び、靴下も空間を取ります。多少緩い靴のほうがきつい靴より調整しやすい。ストラップやサンダルなど開放型なら小さい方が安全です。ここの換算は範囲の中心として使い、範囲の絞り込みはブランド自身の表に任せてください。",
          ],
        },
        {
          heading: "各体系の細部とローカル実行",
          paragraphs: [
            "Mondopoint(ISO を参照にした足長基準。日本と世界中のスキーブーツが採用)は最も合理的です。日本の 25.0 は 25 cm の足を意味し、原則としてオフセットも男女差もありません。EU 表記は最も緩く、厳密な規格ではなく慣行で支えられており、フランスとドイツの出典がある点で 1 サイズ食い違います。米・英の表は精密ですが男女で分かれ、英国は目盛りの大部分で米国メンズよりちょうど 1 下です。",
            "子供靴は別世界です。親指 1 本ぶんの余裕を残すといった成長スペースの慣行が一般的で、米・英の子供用階段は大人のものと別物です。この変換は成人男女の表を対象とし、子供用は専用の表が必要です。",
            "表全体は公開データからブラウザ内で計算されます。アカウントも測定のアップロードも保存もありません。ブランドの表に驚いたら、いつでもここに戻って標準の基準と照らしてください。それだけで、ブランドが小さめなのか、単に丸め方が違うのかが見分けられます。",
          ],
        },
      ],
    },
    es: {
      name: "Convertidor de tallas de zapato",
      tagline: "Convierte tallas entre sistemas US, UK, EU y japonés para hombre y mujer, ancladas al largo del pie en centímetros.",
      intro: [
        "Elige cualquier sistema y talla, y verás todos los equivalentes de una vez, anclados al largo del pie en cm: la comparación es física, no una suposición.",
        "Las tallas no están estandarizadas entre marcas: usa el resultado como punto de partida y mide tus pies al final del día, cuando están más grandes.",
      ],
      steps: [
        "Elige calzado de hombre o mujer.",
        "Elige el sistema que conoces e introduce la talla.",
        "Lee las tallas equivalentes en los demás sistemas.",
      ],
      faqs: [
        {
          q: "¿Por qué las marcas varían media talla?",
          a: "Las hormas y la fabricación varían. La tabla da la conversión estándar; las marcas pueden calzar pequeño o grande, así que revisa su propia tabla al comprar online.",
        },
        {
          q: "¿Cómo mido mis pies?",
          a: "De pie sobre papel al final del día, traza ambos pies y mide del talón al dedo más largo en cm. Usa el pie mayor.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué las tallas de zapato son un caos de convenciones",
          paragraphs: [
            "Los números de talla de calzado son arbitrarios y cada región inventó su propia escala. Los sistemas de EE. UU. y Reino Unido usan una escalera basada en el «grano de cebada» — cada talla completa vale un tercio de pulgada, unos 8,5 mm — mientras la escala EU divide el largo del pie por una cifra base con su propio redondeo, y Japón usa Mondopoint, que es sencillamente el largo del pie en centímetros. Ninguna escala comparte un cero común: el mismo pie mide un 9 en un sistema y un 42 en otro.",
            "Las escalas de hombre y mujer en EE. UU. y Reino Unido están desplazadas entre sí — un 8 de mujer estadounidense equivale aproximadamente a un 6,5 de hombre — porque la talla femenina históricamente corrió su propia escalera unas 1,5 tallas por encima. Por eso un conversor unisex necesita el selector de género: pasar una talla de mujer por la escalera de hombre sin el desplazamiento te deja dos tallas fuera, uno de los errores más comunes al comprar estilos unisex.",
            "Anclar en el largo del pie en centímetros esquiva casi todo esto: el largo es el hecho físico y los números son etiquetas. Media talla vale unos 4–5 mm de largo, así que cuando la tabla te deja entre dos tallas, tus centímetros medidos dicen en qué lado del hueco está realmente tu pie.",
          ],
        },
        {
          heading: "Cómo usar una conversión con honestidad",
          paragraphs: [
            "Los pies se hinchan a lo largo del día — estar de pie, caminar y el calor empujan sangre al tejido — así que una medición matutina puede leer media talla menos que el zapato que necesitarás de noche. Mide al final del día, de pie con todo el peso sobre el pie, y mide o traza ambos pies: la mayoría de la gente tiene pies ligeramente distintos, y el zapato debe calzar al mayor.",
            "Las marcas construyen zapatos sobre hormas distintas — el molde con forma de pie alrededor del cual se forma el zapato — y una horma estrecha en el talón o holgada en el dedo cambia el ajuste sin cambiar el número estampado. Que un US 10 de una marca calce como un 9,5 de otra es normal, no un error de la tabla. Las notas de talla de la tienda online («calza pequeño», «sube media talla») mandan sobre cualquier tabla universal.",
            "Cuando la talla convertida cae entre dos opciones, toma la mayor en calzado cerrado — el cuero estira, el calcetín ocupa espacio y un zapato algo holgado se adapta mejor que uno que aprieta. En estilos con correas, sandalias y abiertos, bajar media talla es más seguro. Trata cada conversión aquí como el centro de un rango y deja que la tabla de la propia marca lo afine.",
          ],
        },
        {
          heading: "Los sistemas en detalle y la ejecución local",
          paragraphs: [
            "Mondopoint (la medida de largo del pie referenciada por ISO, usada por Japón y por las botas de esquí de todo el mundo) es el sistema más racional: un 25,0 japonés significa un pie de 25 cm, sin desplazamiento ni separación por género en principio. La escala EU es la más laxa — se sostiene por práctica más que por un estándar estricto, y fuentes francesas y alemanas discrepan en una talla en algunos puntos. Las tablas de EE. UU. y Reino Unido son precisas pero parten por género, y la UK queda exactamente una talla por debajo de la US de hombre en casi toda la escala.",
            "La talla infantil es otro mundo: hay convenciones de margen de crecimiento, como dejar un ancho de pulgar extra, y las escaleras infantiles de EE. UU. y Reino Unido difieren de las de adulto. Este conversor cubre las tablas adultas de hombre y mujer; para niños hace falta una tabla infantil específica.",
            "La tabla entera corre en tu navegador a partir de datos publicados estáticos — sin cuenta, sin subir mediciones, sin guardar nada. Cuando la tabla de una marca te sorprenda, vuelve aquí y compárala con el anclaje estándar: con eso suele bastar para ver si la marca calza pequeño o simplemente redondea distinto.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de numeração de sapato",
      tagline: "Converta numeração entre US, UK, EU e japonês para masculino e feminino, com base no comprimento do pé em centímetros.",
      intro: [
        "Escolha qualquer sistema e número, e todos os equivalentes aparecem de uma vez, ancorados no comprimento do pé em cm — a comparação é física, não um palpite.",
        "A numeração não é padronizada entre marcas: trate o resultado como ponto de partida e meça os pés no fim do dia, quando estão maiores.",
      ],
      steps: [
        "Escolha masculino ou feminino.",
        "Escolha o sistema que você conhece e digite o número.",
        "Veja os equivalentes em todos os outros sistemas.",
      ],
      faqs: [
        {
          q: "Por que as marcas variam meio número?",
          a: "Formas e fabricação variam. A tabela dá a conversão padrão; marcas podem ficar menores ou maiores, então confira a tabela da própria marca ao comprar online.",
        },
        {
          q: "Como medir os pés?",
          a: "Em pé sobre papel no fim do dia, contorne os dois pés e meça do calcanhar ao dedo mais longo em cm. Use o pé maior.",
        },
      ],
      deepDive: [
        {
          heading: "Por que a numeração de sapatos é um caos de convenções",
          paragraphs: [
            "Os números de numeração de calçados são arbitrários, e cada região inventou a própria escala. Os sistemas dos EUA e do Reino Unido usam uma escada baseada no «grão de cevada» — cada número inteiro vale um terço de polegada, uns 8,5 mm — enquanto a escala EU divide o comprimento do pé por uma base com arredondamento próprio, e o Japão usa Mondopoint, que é simplesmente o comprimento do pé em centímetros. Nenhuma escala compartilha o mesmo zero: o mesmo pé lê 9 num sistema e 42 no outro.",
            "As escalas masculina e feminina nos EUA e no Reino Unido estão deslocadas entre si — um 8 feminino americano corresponde a um 6,5 masculino aproximadamente — porque a numeração feminina historicamente correu numa escada própria, umas 1,5 numerações acima. Por isso um conversor unissex precisa do seletor de gênero: passar uma numeração feminina pela escada masculina sem o deslocamento te deixa dois números fora, um dos erros mais comuns ao comprar modelos unissex.",
            "Ancorar no comprimento do pé em centímetros contorna quase tudo isso: o comprimento é o fato físico, os números são etiquetas. Meio número vale uns 4–5 mm, então quando a tabela te coloca entre dois números, os centímetros medidos dizem de que lado do vão seu pé está de fato.",
          ],
        },
        {
          heading: "Como usar uma conversão com honestidade",
          paragraphs: [
            "Os pés incham ao longo do dia — estar em pé, caminhar e o calor empurram sangue para os tecidos — então uma medição matinal pode ler meio número abaixo do sapato que você vai precisar à noite. Meça no fim do dia, em pé com todo o peso no pé, e meça ou contorne os dois pés: a maioria das pessoas tem pés levemente diferentes, e o sapato precisa servir o maior.",
            "As marcas constroem sapatos sobre formas diferentes — o molde com formato de pé em torno do qual o sapato é moldado — e uma forma estreita no calcanhar ou folga no dedo muda o ajuste sem mudar o número estampado. Um US 10 de uma marca servir como um 9,5 de outra é normal, não um erro da tabela. As observações de numeração da loja online («fica pequeno», «compre meio número acima») valem mais que qualquer tabela universal.",
            "Quando o número convertido cai entre duas opções, fique com o maior em calçado fechado — o couro estica, a meia ocupa espaço, e um sapato um pouco folgado se ajusta melhor que um que aperta. Em estilos com tiras, sandálias e modelos abertos, descer meio número é mais seguro. Trate cada conversão aqui como o centro de uma faixa e deixe a tabela da própria marca afinar.",
          ],
        },
        {
          heading: "Os sistemas em detalhe e a execução local",
          paragraphs: [
            "O Mondopoint (a medida de comprimento do pé referenciada pela ISO, usada pelo Japão e pelas botas de esqui do mundo inteiro) é o sistema mais racional: um 25,0 japonês significa um pé de 25 cm, sem deslocamento nem divisão por gênero em princípio. A escala EU é a mais solta — sustentada por prática mais que por um padrão rigoroso, e fontes francesas e alemãs divergem em um número em alguns pontos. As tabelas dos EUA e do Reino Unido são precisas mas separam por gênero, e a UK fica exatamente um número abaixo da americana masculina na maior parte da escala.",
            "A numeração infantil é outro mundo: existem convenções de margem de crescimento, como deixar um espaço da largura de um polegar, e as escadas infantis dos EUA e do Reino Unido diferem das de adulto. Este conversor cobre as tabelas adultas masculina e feminina; para crianças é preciso uma tabela infantil dedicada.",
            "A tabela inteira roda no seu navegador a partir de dados publicados estáticos — sem conta, sem enviar medições, sem guardar nada. Quando a tabela de uma marca te surpreender, volte aqui e compare com a âncora padrão: isso normalmente basta para ver se a marca fica pequena ou apenas arredonda de outro jeito.",
          ],
        },
      ],
    },
  },
});
