import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "weight-converter",
  icon: "calc",
  cat: "weight",
  
  related: ["length-converter", "area-converter", "volume-converter", "data-converter", "energy-converter", "time-converter", "temperature-converter", "speed-converter", "pressure-converter"],
  copy: {
    en: {
      name: "Weight Converter",
      tagline:
        "Convert kilograms, pounds, ounces, stones and grams instantly — free, private and works offline.",
      intro: [
        "Shoppers comparing a 5 lb bag of flour with a 2 kg one, travelers checking airline baggage allowances in kilograms against bathroom scales in pounds, athletes converting bodyweight between systems for training plans, and kitchens scaling recipes across grams and ounces all need weight conversion.",
        "Six significant digits: the pound is defined as exactly 0.45359237 kg by international agreement, so pounds↔kilograms never drift. Mass and force are kept distinct — kilograms and pounds here are always mass; newtons belong to the force world and are not mixed in.",
        "The kilogram is the SI base unit; every other unit has an exact factor (1 oz = 28.349523125 g exactly, a stone is exactly 14 lb). Precious-metal traders use troy ounces (31.1034768 g exactly) — kept separate from avoirdupois ounces to prevent the costly confusion that occasionally hits gold pricing.",
        "Weight confusion between pounds, kilograms, stones and ounces crosses cultures daily — and the troy/avoirdupois ounce trap trips even professionals. This converter shows all common mass units together from one input, with each system labeled clearly.",
      ],
      faq: [
        {
          q: "How many pounds is 1 kg?",
          a: "One kilogram is 2.20462 pounds (1 lb = 0.45359237 kg exactly). Enter 1 kg → lb above to see it.",
        },
        {
          q: "What is a stone in kg?",
          a: "One stone (used in the UK for body weight) is 6.35029318 kilograms — exactly 14 pounds.",
        },
      ],
      deepDive: [
        {
          heading: "The pound that stopped moving",
          paragraphs: [
            "Before 1959, the US and British pounds differed around the sixth decimal — tiny, but real when you weigh a shipload of cargo. The international yard and pound agreement pinned the avoirdupois pound at exactly 0.45359237 kg, ending the drift. Every pound-to-kilogram conversion since then runs on one frozen number.",
            "The kilogram changed by a different route: from 1889 it was defined by a platinum-iridium cylinder in a Sèvres vault (le Grand K), the last SI base unit defined by an artifact. In 2019 it was redefined through the Planck constant — an exact value fixed by nature, in place of an object that could gain or lose atoms.",
            "The practical payoff is the same either way: no rounding between systems, ever. The stone (exactly 14 lb), the ounce (1/16 lb) and the ton all reduce to exact fractions, so this converter's whole table hangs off the two frozen constants — 0.45359237 and the kilogram's definition — not off measured averages.",
          ],
        },
        {
          heading: "Troy, avoirdupois, and the ounce that is not an ounce",
          paragraphs: [
            "The ordinary ounce is avoirdupois: 28.349523125 g. The troy ounce — the one gold, silver and gem markets quote — is 31.1034768 g, about 10% heavier. Gold is priced per troy ounce, always; food and postage are avoirdupois. Mixing them skews metal pricing by ten percent.",
            "The stone is a survivor: exactly 14 pounds, and still the everyday body-weight unit in Britain and Ireland — a person weighing 11 stone is 69.85 kg. Most of the world never meets it, which is exactly why it is listed here instead of quietly omitted.",
            "The carat belongs to gems, exactly 200 mg by international convention — and it measures mass, not purity. Purity is karat with a k (24-karat gold). The two words are cousins, and confusing them has cost buyers real money at jewelry counters.",
          ],
        },
        {
          heading: "Mass, weight, and the scale that lies politely",
          paragraphs: [
            "Physics distinguishes mass (how much matter, in kilograms) from weight (the force gravity applies, in newtons). Everyday scales measure the force and display a mass number — fine at one gravity, broken in orbit. An astronaut's weightlessness is the loss of apparent weight, not of mass.",
            "This page deals in mass only: kg, g, lb, oz, stone and the carat are all mass units, and no force unit is mixed in. That is why the same conversion works for a recipe in São Paulo and a payload spec alike, while a spring scale's reading would need the local gravity to agree.",
            "Luggage allowances, athletic weight classes and parcel pricing all live inside these units, and everything computes in your browser — your bathroom-scale number stays yours. Six significant digits cover ring settings (carats) through cargo (tons) without switching tools.",
          ],
        },
      ],
    },
    zh: {
      name: "重量换算",
      tagline: "千克、磅、盎司、英石、克等重量单位即时互转,免费、离线可用、隐私无忧。",
      intro: [
        "公制与英制重量单位一站换算:千克、磅、盎司、英石、克拉等,输入即算,所有单位同时显示。",
        "适合对照外国食谱烘焙、核对行李限重、记录健身训练重量以及估算运费。",
      ],
      faq: [
        {
          q: "1 千克等于多少磅?",
          a: "1 千克 = 2.20462 磅(精确值:1 磅 = 0.45359237 千克)。在上方输入 1 kg → lb 即可查看。",
        },
        {
          q: "一英石等于多少千克?",
          a: "1 英石(stone,英国常用体重单位)= 6.35029318 千克,即整 14 磅。",
        },
      ],
      deepDive: [
        {
          heading: "不再移动的磅",
          paragraphs: [
            "1959 年之前,美制磅与英制磅在小数点后第六位附近存在差异——微小,但称一船货时就是真的。国际码与磅协定把常衡磅固定为精确的 0.45359237 kg,漂移就此终结。此后一切磅与千克的换算,都跑在这一个冻结的数字上。",
            "千克走了另一条路:从 1889 年起,它由塞夫勒地下室里一支铂铱合金圆柱体(大 K)定义,是最后一个靠实物定义的 SI 基本单位。2019 年,它改由普朗克常数定义——一个由自然固定的精确值,替代了那根会增减原子的金属柱。",
            "无论哪条路,好处都一样:两套系统之间永远没有舍入。英石(精确 14 磅)、盎司(1/16 磅)、吨都归约为精确分数,所以这张换算表挂在两个冻结常数上——0.45359237 和千克的定义——而不是挂在测量平均值上。",
          ],
        },
        {
          heading: "金衡、常衡,和那个不是盎司的盎司",
          paragraphs: [
            "日常盎司是常衡制:28.349523125 g。金衡盎司——金银与宝石市场报价用的那个——是 31.1034768 g,重约 10%。金价按盎司报,永远是金衡;食品与邮资是常衡。两者混用,金属定价会偏出一成。",
            "英石是幸存者:精确 14 磅,至今仍是英国和爱尔兰的日常体重单位——一个人“11 stone”是 69.85 kg。世界多数地方从不遇到它,这正是它被列在这里、而不是被悄悄省略的原因。",
            "克拉属于宝石,按国际约定精确 200 mg——而且量的是质量,不是纯度。纯度是 karat(24K 金的 K)。两个词是表亲,把它们混为一谈,在珠宝柜台前真实地花过冤枉钱。",
          ],
        },
        {
          heading: "质量、重量,和那个礼貌撒谎的秤",
          paragraphs: [
            "物理学区分质量(有多少物质,千克)与重量(重力施加的力,牛顿)。日常的秤测的是力,却显示一个质量数——在一个 g 下没问题,到了轨道上就穿帮:宇航员的“失重”失去的是视重,不是质量。",
            "本页只管质量:kg、g、lb、oz、英石、克拉全是质量单位,不掺任何力的单位。所以同一组换算,既适用于圣保罗的一张食谱,也适用于载荷规格;而弹簧秤的读数,还得让当地重力先一致才谈得上相同。",
            "行李限额、运动员级别、快递计费都活在这些单位里,全部计算在浏览器本地完成——体重秤上的数字只属于你自己。六位有效数字从戒托的克拉覆盖到货物的吨,不用中途换工具。",
          ],
        },
      ],
    },
    ja: {
      name: "重さ換算",
      tagline: "キログラム・ポンド・オンス・ストーン・グラムをブラウザ内で即時換算。無料・オフライン対応。",
      intro: [
        "メートル法とヤード・ポンド法の重量単位をまとめて変換:キログラム、ポンド、オンス、ストーン、カラットなど、入力しながらすべて再計算されます。",
        "海外レシピの材料計量、受託荷物の重量制限チェック、トレーニング記録、送料の概算に便利です。",
      ],
      faq: [
        {
          q: "1 kg は何ポンド?",
          a: "1 キログラム = 2.20462 ポンドです(正確には 1 ポンド = 0.45359237 kg)。上で 1 kg → lb を入力して確認できます。",
        },
        {
          q: "1 ストーンは何 kg?",
          a: "1 ストーン(英国の体重単位)= 6.35029318 キログラム、ちょうど 14 ポンドです。",
        },
      ],
      deepDive: [
        {
          heading: "動かなくなったポンド",
          paragraphs: [
            "1959 年以前、米ポンドと英ポンドは小数 6 桁目のあたりで微妙に違いました。微小でも、船一隻分の貨物を量れば現実になります。国際ヤード・ポンド協定は常用ポンドを正確に 0.45359237 kg と固定し、漂いを終わらせました。以後のすべてのポンド⇔キログラム換算は、この 1 つの凍結された数の上を走ります。",
            "キログラムは別の道を歩きました。1889 年以降、セーヴルの地下に納められた白金イリジウム円筒(ル・グラン K)で定義され、実物で定義される最後の SI 基本単位でした。2019 年、定義はプランク定数に置き換わりました。原子を増やしたり減らしたりしうる物体ではなく、自然が固定する正確な値です。",
            "どちらの道でも実益は同じです。系の間に丸めは一切ありません。ストーン(正確に 14 ポンド)、オンス(1/16 ポンド)、トンはみな正確な分数に帰着するので、この表全体が 2 つの凍結定数——0.45359237 とキログラムの定義——に掛かっていて、測定平均には掛かっていません。",
          ],
        },
        {
          heading: "トロイと常衡、そしてオンスではないオンス",
          paragraphs: [
            "ふつうのオンスは常用 avoirdupois で 28.349523125 g。トロイオンス——金・銀・宝石の市場が相場をつけるもの——は 31.1034768 g で約 10% 重い。金の価格は常にトロイ、食品と郵便料金は常用。混ぜると金属の値付けが一割ずれます。",
            "ストーンは生き残りです。正確に 14 ポンドで、今も英国とアイルランドの日常の体重単位です。「11 ストーン」の人は 69.85 kg。世界の大部分はこれに出会いません。出会わないからこそ、黙って省略せずここに列挙する価値があります。",
            "カラットは宝石のもので、国際取り決めにより正確に 200 mg。しかも測るのは質量であって純度ではありません。純度のほうは karat(24K 金の K)。2 つの語はいとこ同士で、この混同は宝石店のカウンターで実際に損を生んできました。",
          ],
        },
        {
          heading: "質量、重さ、そして礼儀正しく嘘をつく秤",
          paragraphs: [
            "物理学は質量(物質の量、キログラム)と重さ(重力が及ぼす力、ニュートン)を区別します。日常の秤は力を測りながら質量の数字を表示します。1 g の世界では問題なく、軌道では破綻します。宇宙飛行士の「無重量」は見かけの重さを失ったのであって、質量を失ったのではありません。",
            "このページが扱うのは質量だけです。kg・g・ポンド・オンス・ストーン・カラットはすべて質量の単位で、力の単位は混ざりません。だから同じ換算がサンパウロのレシピにもペイロードの仕様にも通じます。ばね秤の読みは、その土地の重力が揃って初めて一致します。",
            "受託荷物の上限、階級制のあるスポーツ、宅配の課金はみなこの単位の中で暮らしています。計算はすべてブラウザ内で行われ、体重の数字を知る必要があるのはあなた自身だけ。有効数字 6 桁は指輪の石(カラット)から貨物(トン)までを覆い、道具を乗り換えさせません。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de peso",
      tagline:
        "Convierte kilogramos, libras, onzas, stones y gramos al instante: gratis, privado y sin conexión.",
      intro: [
        "Cambia entre unidades métricas e imperiales de peso en un solo sitio: kilogramos, libras, onzas, stones y quilates, todo recalculado al escribir.",
        "Práctico para cocinar con recetas extranjeras, revisar límites de equipaje, registrar entrenamientos y calcular envíos.",
      ],
      faq: [
        {
          q: "¿Cuántas libras son 1 kg?",
          a: "Un kilogramo son 2,20462 libras (1 lb = 0,45359237 kg exactos). Introduce 1 kg → lb arriba para verlo.",
        },
        {
          q: "¿Cuánto es un stone en kg?",
          a: "Un stone (usado en Reino Unido para el peso corporal) son 6,35029318 kilogramos: exactamente 14 libras.",
        },
      ],
      deepDive: [
        {
          heading: "La libra que dejó de moverse",
          paragraphs: [
            "Antes de 1959, la libra estadounidense y la británica diferían alrededor del sexto decimal — minúsculo, pero real cuando se pesa la carga de un barco. El acuerdo internacional de yarda y libra fijó la libra avoirdupois en exactamente 0,45359237 kg y terminó la deriva. Toda conversión entre libras y kilogramos desde entonces corre sobre un único número congelado.",
            "El kilogramo cambió por otro camino: desde 1889 lo definía un cilindro de platino e iridio guardado en una bóveda de Sèvres (le Grand K), la última unidad base del SI definida por un objeto. En 2019 se redefinió a través de la constante de Planck — un valor exacto fijado por la naturaleza, en lugar de un artefacto que puede ganar o perder átomos.",
            "El prove práctico es el mismo en ambos casos: ningún redondeo entre sistemas, nunca. El stone (14 libras exactas), la onza (1/16 de libra) y la tonelada se reducen a fracciones exactas, así que toda la tabla de este conversor cuelga de las dos constantes congeladas — el 0,45359237 y la definición del kilogramo — y no de promedios medidos.",
          ],
        },
        {
          heading: "Troya, avoirdupois y la onza que no es una onza",
          paragraphs: [
            "La onza corriente es avoirdupois: 28,349523125 g. La onza troy — la que cotizan los mercados de oro, plata y gemas — son 31,1034768 g, un 10% más pesada. El oro se cotiza siempre en onzas troy; la comida y la correspondencia van en avoirdupois. Mezclarlas descoloca el precio del metal en un diez por ciento.",
            "El stone es un superviviente: exactamente 14 libras, y sigue siendo la unidad cotidiana del peso corporal en Gran Bretaña e Irlanda — una persona de 11 stone pesa 69,85 kg. La mayoría del mundo no lo encuentra nunca, y por eso mismo vale listarlo aquí en vez de asumir que no existe.",
            "El quilate pertenece a las gemas: 200 mg exactos por convención internacional, y mide masa, no pureza. La pureza es el kilate con k (el oro de 24 kilates). Las dos palabras son primas, y confundirlas ha costado dinero de verdad en mostradores de joyería.",
          ],
        },
        {
          heading: "Masa, peso y la báscula que miente con educación",
          paragraphs: [
            "La física distingue masa (cuánta materia hay, en kilogramos) de peso (la fuerza que aplica la gravedad, en newtons). Las básculas cotidianas miden la fuerza y muestran una cifra de masa: funciona a una gravedad y se rompe en órbita — la ingravidez del astronauta es pérdida de peso aparente, no de masa.",
            "Esta página trata solo de masa: kg, g, libras, onzas, stones y quilates son unidades de masa y ninguna unidad de fuerza se mezcla. Por eso la misma conversión vale para una receta en São Paulo y para una especificación de carga, mientras que la lectura de una báscula de resorte necesitaría acordar antes la gravedad local.",
            "Límites de equipaje, categorías deportivas y tarifas de paquetería viven dentro de estas unidades, y todo se calcula en tu navegador — tu cifra de la báscula es asunto tuyo y solo tuyo. Seis cifras significativas cubren desde engastes de anillos (quilates) hasta carga (toneladas) sin cambiar de herramienta.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de peso",
      tagline:
        "Converta quilogramas, libras, onças, stones e gramas na hora — grátis, privado e offline.",
      intro: [
        "Alterne entre unidades métricas e imperiais de peso num só lugar: quilogramas, libras, onças, stones e quilates, tudo recalculado enquanto você digita.",
        "Prático para cozinhar com receitas estrangeiras, conferir o limite de bagagem, registrar treinos e estimar fretes.",
      ],
      faq: [
        {
          q: "Quantas libras tem 1 kg?",
          a: "Um quilograma tem 2,20462 libras (1 lb = 0,45359237 kg exatos). Digite 1 kg → lb acima para ver.",
        },
        {
          q: "Quanto é um stone em kg?",
          a: "Um stone (usado no Reino Unido para peso corporal) tem 6,35029318 quilogramas — exatamente 14 libras.",
        },
      ],
      deepDive: [
        {
          heading: "A libra que parou de se mover",
          paragraphs: [
            "Antes de 1959, a libra americana e a britânica diferiam perto do sexto decimal — minúsculo, mas real quando se pesa a carga de um navio. O acordo internacional de jarda e libra fixou a libra avoirdupois em exatamente 0,45359237 kg e acabou com a deriva. Toda conversão entre libras e quilogramas desde então corre sobre um único número congelado.",
            "O quilograma mudou por outro caminho: desde 1889 era definido por um cilindro de platina e irídio guardado num cofre em Sèvres (le Grand K), a última unidade de base do SI definida por um objeto. Em 2019 foi redefinido por meio da constante de Planck — um valor exato fixado pela natureza, em lugar de um artefato que pode ganhar ou perder átomos.",
            "O proveito prático é o mesmo nos dois casos: nenhum arredondamento entre sistemas, nunca. O stone (14 libras exatas), a onça (1/16 da libra) e a tonelada se reduzem a frações exatas, então a tabela inteira deste conversor pende das duas constantes congeladas — o 0,45359237 e a definição do quilograma — e não de médias medidas.",
          ],
        },
        {
          heading: "Troy, avoirdupois e a onça que não é uma onça",
          paragraphs: [
            "A onça comum é avoirdupois: 28,349523125 g. A onça troy — a que os mercados de ouro, prata e gemas cotam — são 31,1034768 g, uns 10% mais pesada. Ouro é sempre cotado em onça troy; comida e postagem, em avoirdupois. Misturá-las desalinia o preço do metal em dez por cento.",
            "O stone é um sobrevivente: exatamente 14 libras, e continua sendo a unidade cotidiana de peso corporal na Grã-Bretanha e na Irlanda — uma pessoa de 11 stone pesa 69,85 kg. A maioria do mundo nunca o encontra, e é exatamente por isso que vale listá-lo aqui em vez de fingir que não existe.",
            "O quilate pertence às gemas: exatamente 200 mg por convenção internacional, e mede massa, não pureza. A pureza é o karate com k (ouro de 24 karates). As duas palavras são primas, e confundi-las já custou dinheiro de verdade em balcões de joalheria.",
          ],
        },
        {
          heading: "Massa, peso e a balança que mente com educação",
          paragraphs: [
            "A física distingue massa (quanta matéria há, em quilogramas) de peso (a força que a gravidade aplica, em newtons). Balanças do dia a dia medem a força e exibem um número de massa: funciona a uma gravidade e quebra em órbita — a imponderabilidade do astronauta é perda de peso aparente, não de massa.",
            "Esta página trata só de massa: kg, g, libras, onças, stones e quilates são unidades de massa, e nenhuma unidade de força se mistura. Por isso a mesma conversão serve para uma receita em São Paulo e para uma especificação de carga, enquanto a leitura de uma balança de mola precisaria da gravidade local para combinar.",
            "Limites de bagagem, categorias esportivas e tarifas de encomenda vivem dentro dessas unidades, e tudo se calcula no seu navegador — o número da sua balança é assunto seu e de mais ninguém. Seis algarismos significativos cobrem de cravação de anéis (quilates) a carga (toneladas) sem trocar de ferramenta.",
          ],
        },
      ],
    },
  },
});
