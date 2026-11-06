import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "area-converter",
  icon: "layers",
  cat: "area",
  related: ["length-converter", "volume-converter", "weight-converter", "speed-converter", "energy-converter", "data-converter", "time-converter", "temperature-converter", "pressure-converter"],
  copy: {
    en: {
      name: "Area Converter",
      tagline: "Square meters, square feet, acres, hectares and more — for real estate, land and flooring.",
      intro: [
        "Home buyers comparing apartment sizes listed in square meters against US square feet, farmers converting acreage between hectares and acres, surveyors reconciling land records across measurement systems, and architects checking floor plans against local code requirements all run into area conversion daily.",
        "Conversions run at full double precision and display six significant digits — enough that 1 acre shows as exactly 4,046.86 m² rather than a rounded 4,000. Chained conversions (acres → hectares → m²) stay accurate because every unit routes through one exact SI base factor instead of hand-tuned pairwise tables.",
        "Every unit maps to square meters through its official SI factor: the foot is defined as exactly 0.3048 m by international agreement, so the square foot is exactly 0.09290304 m² — no approximations involved. Historic units like the US survey acre differ from the international acre by only 4 parts per million, well below display precision.",
        "Most online converters round aggressively or limit you to a fixed unit pair. Here all area units are visible at once — type one value and every equivalent updates live, so you can compare square meters, square feet, acres, hectares and more side by side without re-selecting units.",
      ],
      faq: [
        {
          q: "How big is one acre in square meters?",
          a: "One acre = 4,046.86 m², or about 43,560 square feet. A hectare is 2.471 acres.",
        },
      ],
      deepDive: [
        {
          heading: "Where the acre came from",
          paragraphs: [
            "The acre is not a tidy metric invention — it is medieval farming arithmetic. An acre was the area a team of oxen could plow in one day: a furrow-long strip (a furlong, about 220 yards) by a chain wide (22 yards), giving the 43,560 square feet that survives today. Units born from daily labor explain why so many land measurements are oddly specific — they encode what a working day could accomplish, not what decimal arithmetic would choose.",
            "The hectare is the metric answer to the same question: 100 meters by 100 meters, exactly 10,000 m², adopted with the metric system after the French Revolution as part of the rationalized measurement reform. One hectare is 2.471 acres — the awkward factor is the historical residue of two systems answering one need.",
            "This tool routes every unit through exact SI factors rather than pairwise approximations: the international foot is defined as exactly 0.3048 m by 1959 agreement among English-speaking countries, so the square foot is exactly 0.09290304 m². The older US survey foot differed by about 2 parts per million — far below what real estate listings need, but the reason surveying documents sometimes show a fifth decimal place of difference.",
          ],
        },
        {
          heading: "Reading land sizes across systems",
          paragraphs: [
            "The everyday anchors worth memorizing: a hectare is about two and a half acres; a football/soccer field is roughly 0.7 hectares (close to 1.8 acres); a typical city residential lot ranges from a few hundred square meters to a few thousand. Real estate listings in the US quote square feet, in most of the world square meters, for land parcels acres or hectares — the same apartment reads very differently across these units, which is exactly where conversion mistakes in purchase decisions happen.",
            "Beware the square-vs-linear confusion: doubling a side length quadruples the area. A 20 m × 20 m plot is 400 m², not 200 — a slip that has produced more than one real-estate dispute. Similarly, price per square meter and price per square foot differ by a factor of about 10.76, not 3.28.",
            "For flooring and paint, the conversion is the easy half; the hard half is waste allowance — professionals add 5-10% for cuts and defects. The converter gives you the true area; the order quantity is a judgment on top.",
          ],
        },
        {
          heading: "Exact factors, all computed locally",
          paragraphs: [
            "Every conversion multiplies by the exact official factor in your browser and displays six significant digits, so 1 acre shows as 4,046.86 m² — not a rounded 4,000. All units update live from a single input, which turns the tool into a comparison table without re-selecting anything.",
            "Full double precision is used internally; the rounding happens only at display. Chained conversions — acres to hectares to square meters — therefore do not accumulate error, because no intermediate rounded value is ever reused.",
            "Nothing is sent anywhere: land areas and property sizes stay on your device. For a homebuyer comparing listings or a farmer negotiating a lease, that local model also means the tool works in the field, offline, with no connection needed.",
          ],
        },
      ],
    },
    zh: {
      name: "面积换算",
      tagline: "平方米、平方英尺、英亩、公顷等面积单位互转,买房看地铺地板都用得上。",
      intro: [
        "跨体系换算土地与表面单位:平方米、平方英尺、英亩、公顷、平方英里,输入任意数值全部同时显示。",
        "典型用途:对比不同国家的房产面积、规划庭院农田、估算地板与涂料用量。",
      ],
      faq: [
        {
          q: "一英亩是多少平方米?",
          a: "1 英亩 = 4,046.86 平方米,约 43,560 平方英尺。1 公顷 = 2.471 英亩。",
        },
      ],
      deepDive: [
        {
          heading: "英亩从哪里来",
          paragraphs: [
            "英亩不是整齐的公制发明,而是中世纪农耕算术:一英亩是一队牛一天能犁完的地——一弗隆长(约 220 码)、一链宽(22 码),得出今天沿用的 43,560 平方英尺。从日常劳作中诞生的单位,解释了为什么这么多土地计量单位“尺寸奇怪”——它们编码的是“一个工作日能完成什么”,而不是十进制算术愿意选的数。",
            "公顷是公制对同一问题的回答:100 米 × 100 米,恰好 10,000 平方米,随法国大革命后的公制化改革一起落地。1 公顷等于 2.471 英亩——这个别扭的系数,就是两套体系回答同一个问题留下的历史残余。",
            "本工具让每个单位通过精确的 SI 因子换算,而不是两两近似:根据 1959 年英语国家协议,国际英尺被定义为恰好 0.3048 米,所以平方英尺恰好是 0.09290304 平方米。更早的美国测绘英尺与之相差约百万分之二——远低于房产挂牌所需的精度,但这就是测绘文件有时多出第五位小数差异的原因。",
          ],
        },
        {
          heading: "跨体系读土地面积",
          paragraphs: [
            "值得记住的日常锚点:1 公顷约等于 2.5 英亩;一个标准足球场约 0.7 公顷(近 1.8 英亩);城市普通宅地从几百到几千平方米不等。美国房产报平方英尺,世界多数地方报平方米,地块用英亩或公顷——同一套房子在不同单位下读数差异巨大,购房决策里的换算错误恰恰发生在这里。",
            "警惕“平方与一次方”混淆:边长加倍,面积变四倍。20 m × 20 m 的地块是 400 平方米,不是 200——这个手滑引发过的房产纠纷不止一起。同理,每平方米单价和每平方英尺单价相差约 10.76 倍,而不是 3.28 倍。",
            "铺地板和刷漆,换算只是简单的一半;难的一半是损耗余量——行内人会加 5%-10% 应对切割和瑕疵。转换器给你真实面积;下单量是在其上的判断。",
          ],
        },
        {
          heading: "精确因子,全本地计算",
          paragraphs: [
            "每次换算都在浏览器里乘以精确的官方因子,显示六位有效数字:1 英亩显示为 4,046.86 平方米,而不是约整的 4,000。输入一个数,所有单位实时联动,不重选单位就能得到一张对照表。",
            "内部用完整双精度,只在显示时取整。因此链式换算(英亩 → 公顷 → 平方米)不会累积误差——中间从不复用被舍入的值。",
            "数据不出本机:土地面积和房产尺寸留在你的设备上。对正在比价的购房者或正在谈租约的农户,本地模式还意味着田间地头、断网状态都能用。",
          ],
        },
      ],
    },
    ja: {
      name: "面積換算",
      tagline: "平方メートル・平方フィート・エーカー・ヘクタールなどを換算。不動産・土地・床材に。",
      intro: [
        "土地と表面積の単位を体系をまたいで変換:平方メートル、平方フィート、エーカー、ヘクタール、平方マイルを一度に表示します。",
        "国の違う物件の広さ比較、庭や農地のプランニング、床材や塗料の量の見積もりに。",
      ],
      faq: [
        {
          q: "1 エーカーは何平方メートル?",
          a: "1 エーカー = 4,046.86 m²(約 43,560 平方フィート)。ヘクタールは 2.471 エーカーです。",
        },
      ],
      deepDive: [
        {
          heading: "エーカーはどこから来たか",
          paragraphs: [
            "エーカーは整然としたメートル法の発明ではなく、中世の農耕算術です。1 エーカーは牛のチームが 1 日で耕せた面積——約 220 ヤードの畝(ファーロング)× 22 ヤードの幅(チェーン)——で、今日まで残る 43,560 平方フィートになります。日常の労働から生まれた単位は、なぜ多くの土地計量が奇妙に具体的なのかを説明します。十進算術が選ぶ数ではなく、労働 1 日で達成できるものを符号化しているからです。",
            "ヘクタールは同じ問いへのメートル法の答えです。100 m × 100 m、ちょうど 10,000 m² で、フランス革命後のメートル法化改革とともに採用されました。1 ヘクタールは 2.471 エーカー——この扱いにくい係数は、2 つの体系が 1 つの必要性に答えた歴史の残滓です。",
            "このツールは各単位を正確な SI 係数で通します。1959 年の英語圏合意で国際フィートは正確に 0.3048 m と定義されたため、平方フィートは正確に 0.09290304 m² です。より古い米測量フィートは約 100 万分の 2 異なります——不動産表示に必要な精度よりはるかに下ですが、測量資料に第 5 位の桁の差が現れることがある理由です。",
          ],
        },
        {
          heading: "体系をまたいで土地の広さを読む",
          paragraphs: [
            "覚えておきたい日常の錨:1 ヘクタールは約 2.5 エーカー。サッカー場は約 0.7 ヘクタール(約 1.8 エーカー)。都市の普通の宅地は数百〜数千 m²。米国の物件は平方フィート、世界の多くは平方メートル、土地はエーカーかヘクタール——同じ部屋でも単位によって読みが大きく変わり、購入判断での換算ミスはまさにここで起こります。",
            "「平方と一次」の混同に注意。辺の長さを 2 倍にすると面積は 4 倍です。20 m × 20 m の敷地は 400 m² であって 200 m² ではありません。この手滑が引き起こした不動産紛争は 1 件や 2 件ではありません。同様に、m² 単価と平方フィート単価は約 10.76 倍違い、3.28 倍ではありません。",
            "床材や塗料では、換算は簡単な方の半分です。難しい半分はロスの見込みで、業者は切断と欠陥のために 5〜10% を上乗せします。コンバーターは真の面積を与え、発注量はその上の判断です。",
          ],
        },
        {
          heading: "正確な係数、すべてローカル計算",
          paragraphs: [
            "換算はブラウザ内で正確な公式係数を乗じ、6 桁の有効数字で表示します。1 エーカーは 4,046.86 m² と表示され、丸めた 4,000 ではありません。1 つの入力から全単位がリアルタイムに更新され、選択し直さずに比較表になります。",
            "内部は完全な倍精度で、丸めは表示のみです。したがって連鎖換算(エーカー→ヘクタール→m²)は誤差を蓄積しません。丸められた中間値は決して再利用されないからです。",
            "データはどこにも送りません。土地面積と物件サイズは端末にとどまります。物件を比較する購入者にも、賃借を交渉する農家にも、ローカルモデルは野外・オフラインで使えることを意味します。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de área",
      tagline:
        "Metros cuadrados, pies cuadrados, acres, hectáreas y más: para inmobiliaria, terreno y suelo.",
      intro: [
        "Convierte unidades de superficie entre sistemas: metros cuadrados, pies cuadrados, acres, hectáreas y millas cuadradas, todas a la vez para cualquier valor.",
        "Usos típicos: comparar anuncios inmobiliarios de países distintos, planificar huertos y fincas, estimar suelo o pintura.",
      ],
      faq: [
        {
          q: "¿Cuánto mide un acre en metros cuadrados?",
          a: "Un acre = 4.046,86 m², unos 43.560 pies cuadrados. Una hectárea son 2,471 acres.",
        },
      ],
      deepDive: [
        {
          heading: "De dónde viene el acre",
          paragraphs: [
            "El acre no es una invención métrica ordenada — es aritmética agrícola medieval. Un acre era la superficie que una yunta de bueyes podía arar en un día: una franja de un furlong de largo (unos 220 yardas) por una cadena de ancho (22 yardas), que da los 43,560 pies cuadrados que sobreviven hoy. Las unidades nacidas del trabajo diario explican por qué tantas medidas de tierra son extrañamente específicas — codifican lo que un día laborable podía lograr, no lo que la aritmética decimal elegiría.",
            "La hectárea es la respuesta métrica a la misma pregunta: 100 metros por 100 metros, exactamente 10.000 m², adoptada con el sistema métrico tras la Revolución Francesa como parte de la reforma racionalizadora. Una hectárea son 2,471 acres — el factor incómodo es el residuo histórico de dos sistemas respondiendo a una misma necesidad.",
            "Esta herramienta pasa cada unidad por factores SI exactos en lugar de aproximaciones por pares: por acuerdo de 1959 entre países angloparlantes, el pie internacional se define exactamente como 0,3048 m, así que el pie cuadrado es exactamente 0,09290304 m². El viejo pie de agrimensura estadounidense difería en unas 2 partes por millón — muy por debajo de lo que necesita un anuncio inmobiliario, pero la razón de que los documentos topográficos a veces muestren una quinta cifra decimal de diferencia.",
          ],
        },
        {
          heading: "Leer tamaños de tierra entre sistemas",
          paragraphs: [
            "Las anclas cotidianas que valen memorizar: una hectárea son unas dos veces y media un acre; un campo de fútbol ronda las 0,7 hectáreas (cerca de 1,8 acres); una parcela residencial urbana va de unos cientos a unos miles de metros cuadrados. En EE. UU. los anuncios hablan en pies cuadrados, en la mayor parte del mundo en metros cuadrados, y las parcelas en acres o hectáreas — el mismo piso se lee muy distinto según la unidad, y ahí es donde ocurren los errores de conversión en las decisiones de compra.",
            "Cuidado con la confusión cuadrado-lineal: duplicar el lado multiplica el área por cuatro. Un terreno de 20 m × 20 m son 400 m², no 200 — un desliz que ha provocado más de una disputa inmobiliaria. Igualmente, el precio por metro cuadrado y por pie cuadrado difieren en un factor de unos 10,76, no de 3,28.",
            "Para suelo y pintura, la conversión es la mitad fácil; la mitad difícil es el margen de desperdicio — los profesionales añaden un 5-10% por cortes y defectos. El conversor da el área real; la cantidad a pedir es un juicio encima.",
          ],
        },
        {
          heading: "Factores exactos, todo calculado en local",
          paragraphs: [
            "Cada conversión multiplica por el factor oficial exacto en tu navegador y muestra seis cifras significativas: 1 acre aparece como 4.046,86 m² — no un 4.000 redondeado. Todas las unidades se actualizan en vivo desde una sola entrada, lo que convierte la herramienta en una tabla comparativa sin reseleccionar nada.",
            "Internamente se usa doble precisión completa; el redondeo ocurre solo al mostrar. Las conversiones encadenadas — acres a hectáreas a metros cuadrados — no acumulan error, porque nunca se reutiliza un valor intermedio redondeado.",
            "No se envía nada: las superficies y tamaños de propiedad se quedan en tu dispositivo. Para un comprador comparando anuncios o un agricultor negociando un arrendamiento, el modelo local significa además que la herramienta funciona en el campo, sin conexión.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de área",
      tagline:
        "Metros quadrados, pés quadrados, acres, hectares e mais — para imóveis, terrenos e pisos.",
      intro: [
        "Converta unidades de superfície entre sistemas: metros quadrados, pés quadrados, acres, hectares e milhas quadradas, todas de uma vez para qualquer valor.",
        "Usos típicos: comparar anúncios imobiliários de países diferentes, planejar hortas e fazendas, estimar piso ou tinta.",
      ],
      faq: [
        {
          q: "Qual o tamanho de um acre em metros quadrados?",
          a: "Um acre = 4.046,86 m², cerca de 43.560 pés quadrados. Um hectare tem 2,471 acres.",
        },
      ],
      deepDive: [
        {
          heading: "De onde vem o acre",
          paragraphs: [
            "O acre não é uma invenção métrica arrumada — é aritmética agrícola medieval. Um acre era a área que uma junta de bois podia arar num dia: uma faixa de um furlong de comprimento (cerca de 220 jardas) por uma corrente de largura (22 jardas), resultando nos 43.560 pés quadrados que sobrevivem até hoje. Unidades nascidas do trabalho diário explicam por que tantas medidas de terra são estranhamente específicas — elas codificam o que um dia de trabalho podia realizar, não o que a aritmética decimal escolheria.",
            "O hectare é a resposta métrica à mesma pergunta: 100 metros por 100 metros, exatamente 10.000 m², adotado com o sistema métrico após a Revolução Francesa como parte da reforma racionalizadora. Um hectare tem 2,471 acres — o fator desconfortável é o resíduo histórico de dois sistemas respondendo a uma mesma necessidade.",
            "Esta ferramenta passa cada unidade por fatores SI exatos em vez de aproximações par a par: por acordo de 1959 entre países de língua inglesa, o pé internacional é definido como exatamente 0,3048 m, então o pé quadrado é exatamente 0,09290304 m². O antigo pé de agrimensura americano diferia em cerca de 2 partes por milhão — bem abaixo do que um anúncio imobiliário precisa, mas a razão de documentos topográficos às vezes mostrarem uma quinta casa decimal de diferença.",
          ],
        },
        {
          heading: "Ler tamanhos de terra entre sistemas",
          paragraphs: [
            "Âncoras do dia a dia que valem memorizar: um hectare é cerca de duas vezes e meia um acre; um campo de futebol tem aproximadamente 0,7 hectare (perto de 1,8 acre); um lote residencial urbano vai de algumas centenas a alguns milhares de metros quadrados. Nos EUA os anúncios usam pés quadrados, na maior parte do mundo metros quadrados, e terrenos em acres ou hectares — o mesmo apartamento se lê muito diferente entre unidades, e é exatamente aí que os erros de conversão em decisões de compra acontecem.",
            "Cuidado com a confusão quadrado-linear: dobrar o lado quadruplica a área. Um terreno de 20 m × 20 m tem 400 m², não 200 — um deslize que já causou mais de uma disputa imobiliária. Da mesma forma, preço por metro quadrado e por pé quadrado diferem num fator de cerca de 10,76, não 3,28.",
            "Para piso e tinta, a conversão é a metade fácil; a metade difícil é a margem de desperdício — profissionais acrescentam 5-10% para cortes e defeitos. O conversor dá a área real; a quantidade a encomendar é um julgamento por cima.",
          ],
        },
        {
          heading: "Fatores exatos, tudo calculado localmente",
          paragraphs: [
            "Cada conversão multiplica pelo fator oficial exato no seu navegador e mostra seis dígitos significativos: 1 acre aparece como 4.046,86 m² — não um 4.000 arredondado. Todas as unidades atualizam ao vivo a partir de uma única entrada, o que transforma a ferramenta numa tabela comparativa sem reselecionar nada.",
            "Internamente usa-se dupla precisão completa; o arredondamento acontece só na exibição. Conversões encadeadas — acres para hectares para metros quadrados — portanto não acumulam erro, porque nenhum valor intermediário arredondado é reutilizado.",
            "Nada é enviado: áreas e tamanhos de imóveis ficam no seu dispositivo. Para um comprador comparando anúncios ou um agricultor negociando um arrendamento, o modelo local significa ainda que a ferramenta funciona no campo, offline, sem conexão.",
          ],
        },
      ],
    },
  },
});
