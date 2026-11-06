import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "length-converter",
  icon: "ruler",
  cat: "length",
  
  related: ["weight-converter", "area-converter", "speed-converter", "temperature-converter", "energy-converter", "data-converter", "volume-converter", "time-converter", "pressure-converter"],
  copy: {
    en: {
      name: "Length Converter",
      tagline:
        "Convert length and distance instantly: meters, feet, inches, miles, centimeters and more — right in your browser.",
      intro: [
        "Travelers converting luggage dimensions from inches to centimeters for airline limits, woodworkers translating imperial plans to metric stock, runners tracking miles versus kilometers, and designers converting CSS units all use length conversion constantly — it's the most-converted physical quantity in the world.",
        "Six significant digits by default: 1 inch is exactly 2.54 cm and 1 mile is exactly 1,609.344 m — both defined, not measured, since the 1959 international yard agreement. Converting inches → feet → meters in a chain loses nothing because every factor is exact.",
        "The meter is the SI base unit; every imperial unit has an exact metric definition (1 ft = 0.3048 m exactly). Nautical miles, light years and astronomical units use their standard IAU/international values, so even specialized conversions stay authoritative rather than approximate.",
        "Instead of one fixed pair, every length unit from millimeters to nautical miles updates simultaneously as you type. That makes the tool useful for shopping, construction, homework and travel planning alike — anywhere you need more than two units at once.",
      ],
      faq: [
        {
          q: "How many cm in an inch?",
          a: "One inch is exactly 2.54 centimeters, by international agreement since 1959. Enter 1 in → cm above to verify.",
        },
      ],
      deepDive: [
        {
          heading: "Every factor on this page is a definition",
          paragraphs: [
            "The inch-to-centimeter conversion carries no measurement error because it is not a measurement: 1 in = 2.54 cm exactly, fixed by the 1959 international yard and pound agreement, which reconciled the small differences that had crept between the US and British copies of the yard. The same agreement pinned the yard at 0.9144 m and the pound at 0.45359237 kg, so the whole imperial length ladder hangs on one exact ratio.",
            "The metric side is equally exact. The meter was once a metal bar in a Paris vault, but since 1983 it has been defined through the speed of light: the distance light travels in 1/299,792,458 of a second, with the second itself locked to the cesium atomic transition. That makes the speed of light an exact number by definition, and every metric length factor exact with it.",
            "Because both sides are definitions, chained conversions accumulate no rounding: inches to feet to meters lose nothing no matter how long the chain. Rounding appears only at display, where results are formatted to six significant digits — enough for engineering work without printing digits that are pure noise.",
          ],
        },
        {
          heading: "Six digits, and the mile that is not the other mile",
          paragraphs: [
            "Stopping at six significant digits is deliberate. 1 mi is exactly 1,609.344 m, so printing more would be honest but useless — tape measures, GPS receivers and road signs never reach that precision. Daily conversions need three or four digits; six leaves headroom for construction and machining, where the last digit still means something.",
            "The classic trap is the two miles. The statute mile is 1,609.344 m; the nautical mile is 1,852 m — about 8% longer. Aviation and marine navigation use the nautical mile exclusively, so a route planned with statute miles understates distance and fuel by that margin. This tool lists nmi separately for exactly that reason.",
            "The nautical mile's value is not arbitrary: it approximates one minute of arc of latitude along a meridian, which is how it survived centuries of navigation practice. The International Hydrographic Conference of 1929 fixed it at exactly 1,852 m, and the knot — one nautical mile per hour — inherited that exactness.",
          ],
        },
        {
          heading: "Where conversions actually bite",
          paragraphs: [
            "Airline baggage forms ask for centimeters while suitcases are sold in inches; furniture specs, door clearances and appliance niches mix systems within one project; woodworking plans arrive from the US in feet and fractions while lumber is sold in millimeters. In all of these, seeing the full unit table at once beats typing pairs into a search box.",
            "Search-engine converters handle one pair at a time and often round to two or three digits — fine for a walking distance, too coarse for repeated checks. Here one input updates every unit simultaneously, and the factor line shows the exact ratio used, so a result can be verified instead of merely trusted.",
            "Since 1959 the inch has been identical in the US and the UK, but older documents — land records especially — can carry pre-agreement survey values that differ in the sixth significant digit. Everything computes locally in your browser; the area and volume built on these lengths are covered by the area and volume converters under the same exact-factor policy.",
          ],
        },
      ],
    },
    zh: {
      name: "长度换算",
      tagline: "米、英尺、英寸、英里、厘米等长度单位即时互转,浏览器本地运行,结果秒出。",
      intro: [
        "在公制与英制长度单位之间自由换算,不用再去搜索框里打字。输入任意数值,米、英尺、英寸、英里等所有单位一次性显示。",
        "适合装修量尺、旅行规划、工程图纸和作业验算——需要快速精确换算的场景都好用。",
      ],
      faq: [
        {
          q: "一英寸等于多少厘米?",
          a: "1 英寸 = 2.54 厘米,这是 1959 年国际协议确定的精确值。在上方输入 1 in → cm 即可验证。",
        },
      ],
      deepDive: [
        {
          heading: "每个换算系数都是定义,不是测量",
          paragraphs: [
            "英寸到厘米的换算没有测量误差,因为它根本不是测量:1 in = 2.54 cm 是精确值,由 1959 年国际码与磅协定确定——这份协定抹平了美英两国码尺之间累积的细微差异,同时把码定为 0.9144 m、磅定为 0.45359237 kg。整条英制长度链都挂在这一个精确比值上。",
            "公制一侧同样精确。米曾是一根锁在巴黎地下室里的金属杆,但自 1983 年起,米由光速定义:光在 1/299,792,458 秒内走过的距离。秒本身锁定在铯原子跃迁上,于是光速按定义是精确数,所有公制长度系数随之精确。",
            "两侧都是定义,链式换算就不累积舍入:英寸→英尺→米,链再长也不丢精度。舍入只出现在显示层——结果按六位有效数字格式化,工程上够用,也不会打印纯粹噪音的多余位。",
          ],
        },
        {
          heading: "六位有效数字,以及两种英里",
          paragraphs: [
            "停在六位是刻意的。1 mi 精确等于 1,609.344 m,再往后的数字真实但无用——卷尺、GPS 和路牌都到不了那个精度。日常换算三四位足够,六位给建筑与机加工留了余量,最后一位仍然有意义。",
            "经典陷阱是“两种英里”:法定英里 1,609.344 m,海里 1,852 m,长约 8%。航空与航海只用海里,用法定英里算航线会低估距离和燃油。本工具把 nmi 单独列出,就是为了防这一手。",
            "海里的数值不是随手定的:它近似子午线上纬度 1 分的弧长,这是它在数百年航海实践中存活下来的原因。1929 年国际水文会议把海里固定为精确的 1,852 m,节(每小时 1 海里)也随之精确。",
          ],
        },
        {
          heading: "换算真正踩坑的场景",
          paragraphs: [
            "航司行李表按厘米计,行李箱按英寸卖;家具规格、门洞净宽和电器嵌入式尺寸在同一项目里混用两套单位;美版木工图纸用英尺和分数,而建材按毫米卖。这些场景里,一眼看全单位表比在搜索框里一对对输入快得多。",
            "搜索引擎换算器一次只能处理一对单位,还常常只给两三位数——问问路够用,反复核对就太粗。这里一次输入、所有单位同时更新,系数行还显示所用精确比值,结果可以验证,而不是只能相信。",
            "1959 年后美英英寸一致,但更早的文档(尤其地籍资料)可能带着协定前的旧值,差异出现在第六位有效数字上。所有计算都在浏览器本地完成;建立在这些长度上的面积与体积,由面积换算和体积换算按同样的精确系数口径接管。",
          ],
        },
      ],
    },
    ja: {
      name: "長さ換算",
      tagline: "メートル・フィート・インチ・マイルなど長さの単位をブラウザ内で即時換算。",
      intro: [
        "メートル法とヤード・ポンド法を検索ボックスに入力せずに相互変換。数値を入れると、メートル・フィート・インチ・マイルなどすべての単位が一度に表示されます。",
        "DIY、旅行の下調べ、図面の確認、宿題の検算など、正確な換算が必要な場面で活用できます。",
      ],
      faq: [
        {
          q: "1 インチは何センチ?",
          a: "1 インチ = 2.54 センチです(1959 年に国際協定で確定)。上で 1 in → cm を入力して確認できます。",
        },
      ],
      deepDive: [
        {
          heading: "このページの係数はすべて定義値",
          paragraphs: [
            "インチからセンチへの換算に測定誤差がないのは、それが測定ではないからです。1 in = 2.54 cm は正確な値で、1959 年の国際ヤード・ポンド協定が定めました。この協定は米英で微妙にずれていたヤードの基準を揃え、1 yd = 0.9144 m、1 ポンド = 0.45359237 kg も同時に確定させています。ヤード・ポンド法の長さの階梯は、この 1 つの正確な比率にぶら下がっています。",
            "メートル側も同じく正確です。メートルはかつてパリの地下に納められた金属棒でしたが、1983 年以降は光の速さで定義されます。1 秒の 1/299,792,458 に光が進む距離。秒自体はセシウム原子の遷移に固定されているため、光速は定義により正確な数値であり、メートル法のすべての長さの係数もそれに伴って正確です。",
            "両側が定義値なので、連鎖する換算で丸め誤差は蓄積しません。インチ→フィート→メートルと何段つなげても桁は失われません。丸めは表示の段階だけで、結果は有効数字 6 桁に整えられます。工学の仕事には十分で、ノイズでしかない桁は印字しません。",
          ],
        },
        {
          heading: "有効数字 6 桁、そして 2 種類のマイル",
          paragraphs: [
            "6 桁で止めるのは意図的です。1 mi は正確に 1,609.344 m なので、それ以上印字しても正直ではあるけれど無意味です。巻き尺も GPS も道路標識もその精度に届きません。日常の換算には 3〜4 桁で足り、6 桁は建築や機械加工で最後の桁がまだ意味を持つ場面のための余裕です。",
            "定番の落とし穴は「2 種類のマイル」です。法定マイルは 1,609.344 m、海里は 1,852 m で約 8% 長い。航空と海運はもっぱら海里を使うため、法定マイルで航路を立てると距離も燃料もその分過小評価されます。このツールが nmi を別枠で示すのはまさにそのためです。",
            "海里の値は恣意的なものではありません。子午線上の緯度 1 分の弧長にほぼ相当し、数百年の航海術を生き延びたのはこのためです。1929 年の国際水路会議が海里を正確に 1,852 m と固定し、ノット(毎時 1 海里)もその正確さを受け継ぎました。",
          ],
        },
        {
          heading: "換算が本当に効く場面",
          paragraphs: [
            "航空会社の預け入れ規定はセンチで書かれ、スーツケースはインチ売り。家具の寸法、ドアの開口、家電の収まりは 1 つの案件の中で 2 つの単位系が混ざります。米国の木工図面はフィートと分数で来るのに、材木はミリ売り。こうした場面では、全単位の表を一望できるほうが、検索ボックスに 1 組ずつ入力するより速い。",
            "検索エンジンの換算は 1 組ずつで、桁も 2〜3 に丸められがちです。街角の距離ならそれで足りても、繰り返す確認には粗すぎます。ここでは 1 つの入力から全単位が同時に更新され、係数行に使った正確な比率が出るので、結果を「信じる」のではなく「検証」できます。",
            "1959 年以降、インチは米英で同一ですが、それ以前の文書——特に土地記録——には協定前の測量値が残り、差は有効数字 6 桁目に出ます。計算はすべてブラウザ内。長さの上に立つ面積と体積は、面積換算と体積換算が同じ正確係数の方針で引き受けます。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de longitud",
      tagline:
        "Convierte metros, pies, pulgadas, millas y centímetros al instante, directamente en tu navegador.",
      intro: [
        "Convierte entre unidades métricas e imperiales sin escribir en un buscador. Introduce una cantidad y verá metros, pies, pulgadas y millas al mismo tiempo.",
        "Útil para bricolaje, viajes, planos técnicos y deberes: cualquier situación donde una conversión exacta supere a la intuición.",
      ],
      faq: [
        {
          q: "¿Cuántos cm tiene una pulgada?",
          a: "Una pulgada son exactamente 2,54 centímetros, según el acuerdo internacional de 1959. Introduce 1 in → cm arriba para comprobarlo.",
        },
      ],
      deepDive: [
        {
          heading: "Cada factor de esta página es una definición",
          paragraphs: [
            "La conversión de pulgadas a centímetros no arrastra error de medición porque no es una medición: 1 in = 2,54 cm exactos, fijados por el acuerdo internacional de yardas y libras de 1959, que armonizó las pequeñas divergencias acumuladas entre las copias estadounidense y británica de la yarda. El mismo acuerdo dejó la yarda en 0,9144 m y la libra en 0,45359237 kg, así que toda la escala imperial de longitud cuelga de una única razón exacta.",
            "El lado métrico es igual de exacto. El metro fue una barra de metal en una bóveda parisina, pero desde 1983 se define por la velocidad de la luz: la distancia que recorre en 1/299.792.458 de segundo, con el segundo anclado a la transición del cesio. Eso convierte la velocidad de la luz en una cifra exacta por definición, y con ella todos los factores métricos de longitud.",
            "Al ser definiciones en ambos lados, las conversiones encadenadas no acumulan redondeos: de pulgadas a pies a metros no se pierde nada por largo que sea el camino. El redondeo solo aparece en pantalla, donde los resultados se formatean a seis cifras significativas: suficiente para ingeniería, sin imprimir dígitos que son puro ruido.",
          ],
        },
        {
          heading: "Seis dígitos y la milla que no es la otra milla",
          paragraphs: [
            "Detenerse en seis cifras significativas es deliberado. 1 mi son exactamente 1.609,344 m, así que imprimir más sería honesto pero inútil: ni cintas métricas ni receptores GPS ni señales viales llegan a esa precisión. El uso diario se conforma con tres o cuatro dígitos; los seis dejan margen para obra y mecanizado, donde la última cifra aún significa algo.",
            "La trampa clásica son las dos millas: la terrestre mide 1.609,344 m y la milla náutica 1.852 m, un 8% más. Aviación y navegación usan solo la náutica, así que planificar una ruta con millas terrestres subestima distancia y combustible en ese margen. Esta herramienta lista nmi aparte precisamente por eso.",
            "El valor de la milla náutica no es arbitrario: aproxima un minuto de arco de latitud sobre el meridiano, y así sobrevivió a siglos de práctica de navegación. La Conferencia Hidrográfica Internacional de 1929 la fijó en 1.852 m exactos, y el nudo — una milla náutica por hora — heredó esa exactitud.",
          ],
        },
        {
          heading: "Dónde de verdad muerde la conversión",
          paragraphs: [
            "Las aerolíneas piden el equipaje en centímetros y las maletas se venden en pulgadas; muebles, huecos de puertas y nichos de electrodomésticos mezclan sistemas dentro de un mismo proyecto; los planos de carpintería llegan de EE. UU. en pies y fracciones mientras la madera se vende en milímetros. En todos esos casos, ver la tabla completa de unidades de un vistazo gana a teclear pares en un buscador.",
            "Los conversores de buscador atienden una pareja por vez y suelen redondear a dos o tres dígitos: basta para la distancia de un paseo, se queda corto para verificaciones repetidas. Aquí una sola entrada actualiza todas las unidades a la vez, y la línea de factor muestra la razón exacta usada, así que el resultado se verifica en vez de confiarse.",
            "Desde 1959 la pulgada es idéntica en EE. UU. y Reino Unido, pero documentos anteriores — sobre todo registros catastrales — pueden conservar valores de levantamiento previos al acuerdo, con diferencias en la sexta cifra significativa. Todo corre en tu navegador; el área y el volumen construidos sobre estas longitudes los cubren el conversor de área y el de volumen con la misma política de factores exactos.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de comprimento",
      tagline:
        "Converta metros, pés, polegadas, milhas e centímetros na hora, direto no navegador.",
      intro: [
        "Converta entre unidades métricas e imperiais sem digitar num buscador. Digite um valor e veja metros, pés, polegadas e milhas de uma vez.",
        "Útil para reformas, viagens, desenhos técnicos e dever de escola — sempre que uma conversão exata vale mais que um palpite.",
      ],
      faq: [
        {
          q: "Quantos cm tem uma polegada?",
          a: "Uma polegada tem exatamente 2,54 centímetros, pelo acordo internacional de 1959. Digite 1 in → cm acima para conferir.",
        },
      ],
      deepDive: [
        {
          heading: "Todo fator desta página é uma definição",
          paragraphs: [
            "A conversão de polegadas para centímetros não carrega erro de medição porque não é uma medição: 1 in = 2,54 cm exatos, fixados pelo acordo internacional de jarda e libra de 1959, que harmonizou as pequenas divergências acumuladas entre as cópias americana e britânica da jarda. O mesmo acordo fixou a jarda em 0,9144 m e a libra em 0,45359237 kg, então toda a escada imperial de comprimento pende de uma única razão exata.",
            "O lado métrico é igualmente exato. O metro já foi uma barra de metal num cofre em Paris, mas desde 1983 é definido pela velocidade da luz: a distância percorrida em 1/299.792.458 de segundo, com o segundo ancorado na transição do césio. Isso torna a velocidade da luz um número exato por definição — e, com ela, todos os fatores métricos de comprimento.",
            "Sendo definições dos dois lados, conversões encadeadas não acumulam arredondamento: de polegadas a pés a metros nada se perde, por mais longa a cadeia. O arredondamento só aparece na exibição, com resultados formatados em seis algarismos significativos — o bastante para engenharia, sem imprimir dígitos que são puro ruído.",
          ],
        },
        {
          heading: "Seis dígitos, e a milha que não é a outra milha",
          paragraphs: [
            "Parar em seis algarismos é deliberado. 1 mi são exatamente 1.609,344 m, então imprimir mais seria honesto mas inútil: trena, GPS e placas de rua não chegam a essa precisão. O dia a dia se contenta com três ou quatro dígitos; os seis deixam folga para obra e usinagem, onde o último ainda significa algo.",
            "A armadilha clássica são as duas milhas: a terrestre mede 1.609,344 m e a milha náutica 1.852 m — uns 8% mais. Aviação e navegação usam só a náutica, então planejar uma rota com milhas terrestres subestima distância e combustível nessa margem. Esta ferramenta lista nmi à parte exatamente por isso.",
            "O valor da milha náutica não é arbitrário: aproxima um minuto de arco de latitude ao longo do meridiano, e foi assim que sobreviveu a séculos de navegação. A Conferência Hidrográfica Internacional de 1929 a fixou em exatamente 1.852 m, e o nó — uma milha náutica por hora — herdou essa exatidão.",
          ],
        },
        {
          heading: "Onde a conversão realmente morde",
          paragraphs: [
            "Companhias aéreas pedem bagagem em centímetros e malas são vendidas em polegadas; móveis, vãos de porta e nichos de eletrodomésticos misturam sistemas num mesmo projeto; planos de marcenaria chegam dos EUA em pés e frações enquanto a madeira se vende em milímetros. Em todos esses casos, ver a tabela completa de unidades de uma vez ganha de digitar pares num buscador.",
            "Conversores de buscador cuidam de um par por vez e costumam arredondar a dois ou três dígitos: serve para a distância de um passeio, fica grosso demais para conferências repetidas. Aqui uma entrada só atualiza todas as unidades de uma vez, e a linha de fator mostra a razão exata usada — o resultado se verifica em vez de se confiar.",
            "Desde 1959 a polegada é idêntica nos EUA e no Reino Unido, mas documentos anteriores — principalmente registros de terra — podem guardar valores de levantamento pré-acordo, com diferença no sexto algarismo significativo. Tudo roda no seu navegador; área e volume construídos sobre esses comprimentos ficam com o conversor de área e o de volume, sob a mesma política de fatores exatos.",
          ],
        },
      ],
    },
  },
});
