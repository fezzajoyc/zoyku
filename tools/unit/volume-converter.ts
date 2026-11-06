import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "volume-converter",
  icon: "crop",
  cat: "volume",
  related: ["length-converter", "weight-converter", "area-converter", "energy-converter", "data-converter", "time-converter", "temperature-converter", "speed-converter", "pressure-converter"],
  copy: {
    en: {
      name: "Volume Converter",
      tagline: "Liters, gallons, cups, milliliters and cubic meters — US and UK units clearly labeled.",
      intro: [
        "Cooks scaling US recipes that list cups and fluid ounces into milliliters, engineers comparing liters with cubic inches for engine displacement, aquarium owners calculating gallons versus liters, and anyone filling a pool or fuel tank across measurement systems runs into volume conversion.",
        "Six significant digits: the US gallon is defined as exactly 3.785411784 liters, so conversions are exact at full precision. Be aware that US and imperial gallons differ by about 20% — a UK gallon is 4.54609 L — and this tool separates the two systems explicitly.",
        "All units convert through the liter (or equivalently cubic meters): 1 L = 0.001 m³ exactly. US customary factors are the legal definitions from the 1959 agreement; imperial factors come from the 1824 British Weights and Measures Act as refined since. Kitchen units (cup, tablespoon) use the US legal definitions.",
        "Volume is the classic place where US customary, imperial and metric collide — a 'gallon' means different things by country. This converter shows liters, gallons (US and imperial), quarts, cups, milliliters and cubic units all at once, with the system of each unit made explicit.",
      ],
      faq: [
        {
          q: "Is a US gallon the same as a UK gallon?",
          a: "No. 1 US gallon = 3.785 L, 1 UK gallon = 4.546 L. The converter lists them separately so you always pick the right one.",
        },
      ],
      deepDive: [
        {
          heading: "Two gallons, one name",
          paragraphs: [
            "The gallon split when the empires did. The US kept the older English wine gallon of 231 cubic inches (standardized by a British statute in the early 1700s), which works out to exactly 3.785411784 liters now that the inch has its 1959 metric definition. Britain's 1824 Weights and Measures Act replaced it with an imperial gallon defined as the volume of ten pounds of water: 4.54609 liters exactly. Same word, about 20% apart.",
            "The mismatch cascades: a US quart is 0.946 L, an imperial quart 1.137 L; a US pint is 473 mL while the imperial pint — the one in a British pub — is 568 mL. Recipes, fuel figures and pool chemicals all go wrong crossing the Atlantic when the unit name is trusted instead of the system.",
            "This tool labels the system of every unit — gal (US), gal (UK), qt (US), pt (US) — precisely because the names alone lie. If a source just says gallon, find out which side of the Atlantic it was written on before converting.",
          ],
        },
        {
          heading: "Kitchen units are legal definitions too",
          paragraphs: [
            "The cup here is the US legal cup, exactly 236.5882365 mL, and the fluid ounce exactly 29.5735295625 mL — both fixed fractions of the US gallon (a gallon is 16 cups), not conventions of convenience.",
            "Recipes are the top trap: the cup in a British book and the pint in an American one each refer to a different legal volume. Convert the units before scaling, or the flour-to-liquid ratio breaks. Liquids especially never lie — one US cup of water is 236.6 g, so the error can only come from the wrong unit.",
            "The cubic units serve the other world: engine displacement in cubic inches and liters, aquariums and tanks in cubic feet, HVAC ducts in cubic meters. 1 ft³ is exactly 28.316846592 L, and the metric side lines up as clean powers of ten.",
          ],
        },
        {
          heading: "Reading the table, and where it earns its keep",
          paragraphs: [
            "Fuel economy itself splits by country: US mpg and UK mpg carry the same 20% gallon gap, which is why a 50 mpg British spec looks impossible next to American numbers. Any figure based on gallons inherits that crack.",
            "Aquarium dosing and pool chlorination are the serious case: doses scale with real volume, and a 20% error is an overdose. Convert once to liters and dose from that number — that alone prevents it.",
            "As everywhere on the site, the math runs in your browser and no number is uploaded. Six significant digits read clearly for recipes and specs alike without stacking digits nobody reads. When volume crosses systems, read the system name as part of the unit name — that is the habit this page wants to leave behind.",
          ],
        },
      ],
    },
    zh: {
      name: "体积换算",
      tagline: "升、加仑、杯、毫升、立方米互转,美制英制分开标注,烘焙调饮不再搞混,全程本地运行。",
      intro: [
        "厨房与工程体积单位一页换算,美制/英制明确区分:美制加仑 3.785 升,英制加仑 4.546 升,相差 20%——混用会毁掉配方。",
        "适合烘焙调饮、酿酒、鱼缸给药、油耗计算和混凝土估算。",
      ],
      faq: [
        {
          q: "美制加仑和英制加仑一样吗?",
          a: "不一样。1 美制加仑 = 3.785 升,1 英制加仑 = 4.546 升。换算表里两者分开列出,不会选错。",
        },
      ],
      deepDive: [
        {
          heading: "两种加仑,一个名字",
          paragraphs: [
            "加仑在两个帝国分家时就分了家。美国保留的是更老的英制酒加仑——231 立方英寸(18 世纪初英国法令定型);英寸在 1959 年获得公制定义之后,它精确等于 3.785411784 升。英国 1824 年度量衡法案改用“10 磅水的体积”定义帝国加仑:精确 4.54609 升。同一个词,相差约 20%。",
            "错位一路传导:美制夸脱 0.946 L,英制夸脱 1.137 L;美制品脱 473 mL,而英制品脱——英国酒馆那一品脱——是 568 mL。食谱、油耗、泳池药剂跨大西洋时,信单位名而不信单位系,都会出事。",
            "本工具给每个单位标注所属系统——gal (US)、gal (UK)、qt (US)、pt (US)——正因为只看名字会被骗。资料里只写“加仑”时,先弄清它是大西洋哪一边的,再动手换算。",
          ],
        },
        {
          heading: "厨房单位也是法定定义",
          paragraphs: [
            "这里的杯是美制法定杯,精确 236.5882365 mL;液量盎司精确 29.5735295625 mL——两者都是美制加仑的固定分数(1 加仑 = 16 杯),不是图省事的随手约定。",
            "食谱是头号陷阱:英国书里的 cup、美国书里的 pint,各指各的法定体积。先换算单位、再放大份量,面粉与液体的比例才不会被破坏。液体尤其不会说谎——1 美杯水就是 236.6 克,误差只会来自单位搞错。",
            "立方单位服务另一个世界:发动机排量的立方英寸与升、鱼缸与水箱的立方英尺、暖通风道的立方米。1 ft³ 精确等于 28.316846592 L,公制一侧全是干净的十的幂。",
          ],
        },
        {
          heading: "读表与真正的用武之地",
          paragraphs: [
            "油耗本身也因国而异——US mpg 与 UK mpg 背着同样的 20% 加仑差,英国规格的“50 mpg”放在美国数字旁边显得不可能,原因在此。凡以加仑为基的指标,都继承了这道裂缝。",
            "鱼缸给药和泳池投药是最吓人的场景:剂量随真实体积缩放,20% 的偏差就是过量。先换算成升,再按升给药——光这一步就能防住。",
            "与全站一样,计算全在浏览器里完成,不上传任何数字。六位有效数字对食谱和规格都读得清,又不堆没人读的尾数。面对跨系统的体积,把系统名当单位名的一部分来读——这是本页最想留住的习惯。",
          ],
        },
      ],
    },
    ja: {
      name: "体積換算",
      tagline: "リットル・ガロン・カップ・ミリリットル・立方メートル。米国系と英国系を明確に表示。",
      intro: [
        "キッチンと工学の体積単位を、米国系/英国系の違いを明示して変換:米ガロンは 3.785 L、英ガロンは 4.546 L で 20% の差。混ぜるとレシピが台無しになります。",
        "料理、醸造、水槽の投薬、燃費、コンクリートの概算に便利です。",
      ],
      faq: [
        {
          q: "米ガロンと英ガロンは同じ?",
          a: "違います。1 米ガロン = 3.785 L、1 英ガロン = 4.546 L。変換表では別々に表示されるので、常に正しい方を選べます。",
        },
      ],
      deepDive: [
        {
          heading: "2 つのガロン、1 つの名前",
          paragraphs: [
            "ガロンは帝国が分かれたときに分かれました。米国が受け継いだのは古い英国のワインガロン——231 立方インチ(18 世紀初頭の英国法令で定型化)で、インチが 1959 年に公定義を得たのち、正確に 3.785411784 リットルと計算されます。英国は 1824 年の度量衡法で「水 10 ポンドの体積」として帝国ガロンを定義し直しました。正確に 4.54609 リットル。同じ単語が約 20% 違います。",
            "ずれは連鎖します。米クォートは 0.946 L、英クォートは 1.137 L。米パイントは 473 mL、英国のパブに出る英パイントは 568 mL。レシピも燃費もプールの薬剤も、単位の名を信じて系を疑わないと、大西洋を渡った途端に狂います。",
            "このツールは各単位の系を明示します——gal (US)、gal (UK)、qt (US)、pt (US)。名前だけでは嘘をつくからです。資料に単に「ガロン」とあれば、大西洋のどちら側の文書かを確かめてから換算してください。",
          ],
        },
        {
          heading: "キッチンの単位も法定定義",
          paragraphs: [
            "ここのカップは米法定カップで正確に 236.5882365 mL、液量オンスは正確に 29.5735295625 mL。どちらも米ガロンの固定分数(1 ガロン = 16 カップ)で、その場の取り決めではありません。",
            "レシピが最大の罠です。英国の本に書かれた cup、米国の本に書かれた pint は、それぞれ別の法定体積を指します。分量を増減する前に単位を換算する——小麦粉と液体の比率は、そこを守らないと壊れます。液体は特に嘘をつきません。米カップ 1 の水は 236.6 g で、誤差は単位の取り違えからしか来ません。",
            "立方の単位はもう 1 つの世界のものです。エンジン排気量の立方インチとリットル、水槽やタンクの立方フィート、空調ダクトの立方メートル。1 ft³ は正確に 28.316846592 L で、メートル側はきれいな 10 の冪に並びます。",
          ],
        },
        {
          heading: "表の読み方と本領発揮の場所",
          paragraphs: [
            "燃費そのものも国で割れます。US mpg と UK mpg はあの 20% のガロン差をそのまま背負っており、英国スペックの「50 mpg」が米国の数字の隣ではあり得ない数に見えるのはこのためです。ガロンを基にする指標は、みなこの裂け目を継承します。",
            "水槽の投薬とプールの塩素処理は最も恐ろしい場面です。用量は実際の体積に比例し、20% の誤差は過剰投与です。まずリットルに換算し、その数から与える——それだけで防げます。",
            "このサイトらしく計算はすべてブラウザ内で、数字のアップロードはありません。有効数字 6 桁の表示はレシピも仕様も読み取りやすく、誰も読まない桁を積み上げません。系をまたぐ体積では、系の名前を単位名の一部として読む——それがこのページが残したい習慣です。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de volumen",
      tagline:
        "Litros, galones, tazas, mililitros y metros cúbicos, con las unidades de EE. UU. y del R. U. bien etiquetadas.",
      intro: [
        "Convierte unidades de volumen de cocina e ingeniería distinguiendo EE. UU./R. U.: un galón estadounidense son 3,785 L y un galón imperial 4,546 L — un 20% de diferencia, y mezclarlos arruina recetas.",
        "Pensado para cocinar, fermentar, dosificar acuarios, cifras de combustible y presupuestos de hormigón.",
      ],
      faq: [
        {
          q: "¿Un galón de EE. UU. equivale a un galón británico?",
          a: "No. 1 galón de EE. UU. = 3,785 L; 1 galón del R. U. = 4,546 L. El conversor los lista por separado para que elijas el correcto.",
        },
      ],
      deepDive: [
        {
          heading: "Dos galones, un nombre",
          paragraphs: [
            "El galón se partió cuando se partieron los imperios. EE. UU. conservó el viejo galón de vino inglés de 231 pulgadas cúbicas (tipificado por una ley británica de principios del siglo XVIII), que salen exactamente 3,785411784 litros ahora que la pulgada tiene su definición métrica de 1959. El acta británica de pesas y medidas de 1824 lo sustituyó por un galón imperial definido como el volumen de diez libras de agua: 4,54609 litros exactos. La misma palabra, un 20% de distancia.",
            "El desajuste se propaga en cascada: el cuarto de galón estadounidense son 0,946 L y el imperial 1,137 L; la pinta de EE. UU. son 473 mL mientras la imperial — la del pub británico — son 568 mL. Recetas, consumos y químicos de piscina se tuercen al cruzar el Atlántico cuando se confía en el nombre de la unidad y no en su sistema.",
            "Esta herramienta etiqueta el sistema de cada unidad — gal (US), gal (UK), qt (US), pt (US) — justamente porque los nombres solos mienten. Si una fuente dice solo galón, averigua de qué lado del Atlántico está escrita antes de convertir.",
          ],
        },
        {
          heading: "Las unidades de cocina también son definiciones legales",
          paragraphs: [
            "La taza de aquí es la taza legal estadounidense, exactamente 236,5882365 mL, y la onza líquida 29,5735295625 mL — ambas fracciones fijas del galón de EE. UU. (un galón son 16 tazas), no convenciones al vuelo.",
            "Las recetas son la trampa número uno: el cup de un libro británico y la pint de uno americano señalan volúmenes legales distintos. Convierte las unidades antes de escalar, o la proporción entre harina y líquido se rompe. Los líquidos sobre todo no mienten: una taza estadounidense de agua son 236,6 g, y el error solo puede venir de la unidad equivocada.",
            "Las unidades cúbicas sirven al otro mundo: la cilindrada en pulgadas cúbicas y litros, acuarios y depósitos en pies cúbicos, conductos de climatización en metros cúbicos. 1 ft³ son exactamente 28,316846592 L, y el lado métrico se ordena en potencias limpias de diez.",
          ],
        },
        {
          heading: "Cómo leer la tabla y dónde brilla",
          paragraphs: [
            "El consumo también se parte por países: US mpg y UK mpg cargan con la misma brecha del 20% del galón, y por eso un 50 mpg de especificación británica parece imposible junto a cifras americanas. Toda cifra basada en galones hereda esa grieta.",
            "La dosificación de acuarios y la cloración de piscinas son el caso serio: la dosis escala con el volumen real, y un 20% de error es una sobredosis. Convierte una vez a litros y dosifica desde ese número — con eso basta.",
            "Como en todo el sitio, la cuenta corre en tu navegador y no se sube ninguna cifra. La pantalla de seis cifras significativas lee bien recetas y especificaciones sin apilar dígitos que nadie lee. Ante volúmenes entre sistemas, lee el nombre del sistema como parte del nombre de la unidad: ese es el hábito que esta página quiere dejar.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de volume",
      tagline:
        "Litros, galões, xícaras, mililitros e metros cúbicos, com unidades dos EUA e do R. U. bem identificadas.",
      intro: [
        "Converta unidades de volume de cozinha e engenharia distinguindo EUA/R. U.: um galão americano tem 3,785 L e o imperial 4,546 L — 20% de diferença, e misturá-los estraga receitas.",
        "Feito para cozinhar, fermentar, dosar aquários, números de combustível e orçamentos de concreto.",
      ],
      faq: [
        {
          q: "Um galão dos EUA é igual ao do Reino Unido?",
          a: "Não. 1 galão dos EUA = 3,785 L; 1 galão do R. U. = 4,546 L. O conversor lista os dois separados para você escolher o certo.",
        },
      ],
      deepDive: [
        {
          heading: "Dois galões, um nome",
          paragraphs: [
            "O galão se partiu quando os impérios se partiram. Os EUA herdaram o velho galão de vinho inglês de 231 polegadas cúbicas (tipificado por uma lei britânica do começo do século XVIII), que dão exatamente 3,785411784 litros agora que a polegada tem sua definição métrica de 1959. A lei britânica de pesos e medidas de 1824 o substituiu por um galão imperial definido como o volume de dez libras de água: 4,54609 litros exatos. A mesma palavra, a 20% de distância.",
            "O descompasso se propaga em cascata: o quart dos EUA são 0,946 L e o imperial 1,137 L; o pint americano são 473 mL enquanto o imperial — o do pub britânico — são 568 mL. Receitas, consumos e produtos de piscina entortam ao cruzar o Atlântico quando se confia no nome da unidade e não no seu sistema.",
            "Esta ferramenta etiqueta o sistema de cada unidade — gal (US), gal (UK), qt (US), pt (US) — justamente porque os nomes sozinhos mentem. Se uma fonte diz apenas galão, descubra de que lado do Atlântico ela foi escrita antes de converter.",
          ],
        },
        {
          heading: "As unidades de cozinha também são definições legais",
          paragraphs: [
            "A xícara daqui é a xícara legal americana, exatamente 236,5882365 mL, e a onça fluida 29,5735295625 mL — ambas frações fixas do galão dos EUA (um galão são 16 xícaras), não convenções de ocasião.",
            "Receitas são a armadilha número um: o cup de um livro britânico e o pint de um americano apontam volumes legais diferentes. Converta as unidades antes de escalar, ou a proporção entre farinha e líquido quebra. Os líquidos em especial não mentem: uma xícara americana de água são 236,6 g, e o erro só pode vir da unidade trocada.",
            "As unidades cúbicas servem ao outro mundo: cilindrada em polegadas cúbicas e litros, aquários e caixas em pés cúbicos, dutos de climatização em metros cúbicos. 1 ft³ são exatamente 28,316846592 L, e o lado métrico se ordena em potências limpas de dez.",
          ],
        },
        {
          heading: "Como ler a tabela e onde ela brilha",
          paragraphs: [
            "O consumo também se parte por país: US mpg e UK mpg carregam a mesma brecha dos 20% do galão, e por isso um 50 mpg de especificação britânica parece impossível ao lado dos números americanos. Toda cifra baseada em galões herda essa fenda.",
            "A dosagem de aquários e a cloração de piscinas são o caso sério: a dose escala com o volume real, e um erro de 20% é uma sobredose. Converta uma vez para litros e dose a partir desse número — com isso basta.",
            "Como em todo o site, a conta roda no seu navegador e nenhuma cifra é enviada. A tela de seis algarismos significativos lê bem receitas e especificações sem empilhar dígitos que ninguém lê. Diante de volumes entre sistemas, leia o nome do sistema como parte do nome da unidade: esse é o hábito que esta página quer deixar.",
          ],
        },
      ],
    },
  },
});
