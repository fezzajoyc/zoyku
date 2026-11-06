import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "temperature-converter",
  icon: "swap",
  cat: "temperature",
  
  related: ["length-converter", "weight-converter", "speed-converter", "pressure-converter", "energy-converter", "area-converter", "data-converter", "volume-converter", "time-converter"],
  copy: {
    en: {
      name: "Temperature Converter",
      tagline: "Celsius to Fahrenheit and Kelvin, instantly. Live results plus freezing and boiling reference points.",
      intro: [
        "Cooks converting US oven temperatures (350 °F) for a European recipe, travelers checking weather forecasts across °C/°F, engineers reconciling process specs in Kelvin, and students verifying physics homework all convert temperatures — and unlike other units, temperature uses offset formulas, not factors.",
        "Formulas are exact: °F = °C × 9/5 + 32 and K = °C + 273.15. The 9/5 ratio and the 32° and 273.15 offsets are definitions, so a converted value carries no accumulated error. Six significant digits keep 36.6 °C at 97.88 °F rather than a vague 98.",
        "Because temperature scales have different zero points, each conversion applies both a scale factor and an offset — which is why multiplying by 1.8 alone (a classic mistake) gives wrong Fahrenheit values. Kelvin is absolute: 0 K is thermodynamic zero, and negative Kelvin temperatures don't exist.",
        "Temperature is the one unit family where the familiar 'multiply by a factor' mental model fails. This converter applies the correct offset formulas for Celsius, Fahrenheit, Kelvin and Rankine simultaneously, so oven settings, weather and lab values all translate correctly at a glance.",
      ],
      faq: [
        {
          q: "How do you convert Celsius to Fahrenheit?",
          a: "Multiply by 9, divide by 5, then add 32: °F = °C × 9⁄5 + 32. For example, 20 °C = 68 °F. The tool does this for you and shows Kelvin too.",
        },
        {
          q: "What temperature are Fahrenheit and Celsius equal?",
          a: "At −40 degrees: −40 °C = −40 °F. Enter −40 and switch the units to see it.",
        },
      ],
      deepDive: [
        {
          heading: "Three scales, three zero points",
          paragraphs: [
            "Temperature is the odd one out among units: the scales do not share a zero, so every conversion is an offset formula, not a multiplication. Celsius anchors on water — 0 °C freezing, 100 °C boiling at standard pressure. Fahrenheit anchors differently — 32 °F freezing, 212 °F boiling. Kelvin anchors on physics itself: 0 K is absolute zero, −273.15 °C, where molecular motion reaches its minimum.",
            "Because the zero points differ, the formulas carry both a ratio and an offset: °F = °C × 9/5 + 32 and K = °C + 273.15. The degree sizes relate as 9/5, but the offset is why 0 °C is not 0 °F — and why the naive multiply-by-1.8 shortcut gives wrong answers for every input except −40.",
            "−40 is the one point where the scales meet: −40 °C = −40 °F exactly. The curiosity falls straight out of the formulas and doubles as a quick sanity check — if your mental math puts the crossover anywhere else, the offset got dropped along the way.",
          ],
        },
        {
          heading: "Where the scales came from",
          paragraphs: [
            "Fahrenheit, in the early 18th century, fixed his zero at a frigid reference he could reproduce — a mixture of ice, water and salt — and placed body temperature near the top of his original range (96 degrees in the first version, recalibrated later). The odd 32 and 212 anchors are residue of those choices, not deliberate elegance.",
            "Celsius's 1742 proposal actually ran backwards from today's: 0 at boiling, 100 at freezing. The inverted form we use was adopted shortly after his death, and the definition was later re-anchored to absolute zero and the triple point of water rather than the boiling point, because boiling shifts with pressure.",
            "Kelvin, proposed in the 19th century, threw out arbitrary anchors entirely: zero is the coldest anything can be. That makes Kelvin the SI unit and the language of physics — gas laws, thermodynamics and color temperature all speak it — while Celsius survives as Kelvin shifted by 273.15 for everyday weather.",
          ],
        },
        {
          heading: "Reading temperatures in the wild",
          paragraphs: [
            "The same number means different comfort levels by domain: an oven at 180 °C is 356 °F while US dials mark 350 °F, so conversions in that range never land square; body temperature centers on 37 °C / 98.6 °F, and one degree of fever is 1.8 Fahrenheit degrees; weather from −10 to 40 °C maps to 14–104 °F.",
            "Watch the difference trap: a change of 1 Celsius degree equals a change of 1.8 Fahrenheit degrees, so temperature differences convert by the ratio alone, without the offset. 'It got 10 °C warmer' means 18 °F warmer, not 50 °F. This tool converts absolute readings; differences need the bare ratio.",
            "The offset formulas are exact, so results are limited only by the six-digit display. Everything computes in your browser — trivially true for arithmetic this light, but it brings a bonus: the page works offline, in a kitchen with no signal, converting oven settings from a phone.",
          ],
        },
      ],
    },
    zh: {
      name: "温度换算",
      tagline: "摄氏度、华氏度、开尔文一步互转,含冰点沸点参考,零下温度同样精确,浏览器本地运行。",
      intro: [
        "摄氏、华氏、开尔文一步换算。温度不是简单的倍数关系,需要带偏移的公式——这里按正确公式处理,零下温度同样精确。",
        "适合对照外国烤箱温度、看懂天气预报、实验室工作和暖通参数换算。",
      ],
      faq: [
        {
          q: "摄氏度怎么换算成华氏度?",
          a: "先乘 9、除以 5,再加 32:°F = °C × 9⁄5 + 32。例如 20 °C = 68 °F。工具会自动完成,并同时显示开尔文。",
        },
        {
          q: "华氏度和摄氏度在几度时相等?",
          a: "在 −40 度:−40 °C = −40 °F。输入 −40 再切换单位即可看到。",
        },
      ],
      deepDive: [
        {
          heading: "三把标尺,三个零点",
          paragraphs: [
            "温度是单位里的异类:三把标尺不共零点,所以每次换算都是带偏移的公式,而不是乘法。摄氏锚在水上——0 °C 结冰、标准气压下 100 °C 沸腾;华氏锚得不同——32 °F 结冰、212 °F 沸腾;开尔文锚在物理本身——0 K 是绝对零度(−273.15 °C),分子运动降到最低。",
            "零点不同,公式就同时带着比例和偏移:°F = °C × 9/5 + 32,K = °C + 273.15。刻度大小之间是 9/5 的关系,但偏移的存在使得 0 °C 不是 0 °F——也是“只乘 1.8”这个速记法对除 −40 之外一切输入都算错的原因。",
            "−40 是唯一交会的地方:−40 °C 恰等于 −40 °F。这个从公式里自然掉出来的冷知识,顺便是道心算自检——如果你算出的交点在别处,多半是半路把偏移弄丢了。",
          ],
        },
        {
          heading: "标尺从哪里来",
          paragraphs: [
            "18 世纪初的华氏把零点定在他能复现的极冷参考上:冰、水和盐的混合物,并把体温放在原刻度的高处(初版是 96 度,后来重新校准)。32 与 212 这两个古怪的锚点是那些选择的遗留物,不是刻意为之的优雅。",
            "摄尔西乌斯 1742 年的方案其实和今天相反:0 度是沸点,100 度是冰点。他去世后不久,刻度被倒转采用;再后来定义改锚到绝对零度与水的三相点,不再依赖沸点——因为沸点随气压漂移。",
            "19 世纪提出的开尔文干脆扔掉一切人为锚点:零就是“再冷不可能”。这让开尔文成为 SI 单位和物理学的语言——气体定律、热力学、色温都说它——摄氏则作为“开尔文减 273.15”的日常版本存续。",
          ],
        },
        {
          heading: "在真实场景里读温度",
          paragraphs: [
            "同一个数字在不同领域意味着不同的体感:烤箱 180 °C 是 356 °F,而美制旋钮标 350 °F,所以那一带的换算总显得对不太齐;体温中心在 37 °C/98.6 °F,发烧一度等于华氏 1.8 度;天气 −10 到 40 °C 对应 14–104 °F。",
            "注意温差陷阱:温差 1 摄氏度等于 1.8 华氏度,所以温度差只按比例换算、不带偏移。“升温 10 °C”是“升了 18 °F”,不是 50 °F。本工具换算的是绝对读数;温差要用裸比例自己算。",
            "偏移公式是精确的,结果只受六位显示的限制。所有计算都在浏览器里——对这么轻的算术这天然成立,但附带的好处是页面离线可用:在没信号的厨房里,用手机把食谱的烤箱温度换过来。",
          ],
        },
      ],
    },
    ja: {
      name: "温度換算",
      tagline: "摂氏・華氏・ケルビンを即時換算。氷点と沸点の参考値つき、マイナスの温度も正確。",
      intro: [
        "摂氏・華氏・ケルビンをワンステップで変換。温度は単純な倍率ではなくオフセット付きの式が必要で、このツールは 0 度未満も含めて正しく処理します。",
        "海外レシピのオーブン温度、天気予報、実験、空調仕様の確認に便利です。",
      ],
      faq: [
        {
          q: "摂氏を華氏に変換するには?",
          a: "9 を掛けて 5 で割り、32 を足します:°F = °C × 9⁄5 + 32。例:20 °C = 68 °F。ツールが自動計算し、ケルビンも表示します。",
        },
        {
          q: "華氏と摂氏が等しくなる温度は?",
          a: "−40 度です:−40 °C = −40 °F。−40 を入力して単位を切り替えると確認できます。",
        },
      ],
      deepDive: [
        {
          heading: "3 つの目盛り、3 つのゼロ点",
          paragraphs: [
            "温度は単位の仲間外れです。3 つの目盛りはゼロを共有しないので、換算は常にオフセット付きの式であり、掛け算ではありません。摂氏は水に錨を下ろします。0 °C で氷結、標準圧力で 100 °C が沸騰。華氏の錨は別で、32 °F で氷結、212 °F で沸騰。ケルビンの錨は物理そのもので、0 K は絶対零度(−273.15 °C)、分子の運動が最小になる点です。",
            "ゼロ点が違うため、式には比率とオフセットの両方が乗ります。°F = °C × 9/5 + 32、K = °C + 273.15。目盛りの大きさは 9/5 の関係ですが、オフセットがあるからこそ 0 °C は 0 °F ではなく、「1.8 を掛けるだけ」という近道が −40 以外のすべての入力で間違うのです。",
            "−40 だけは 3 つの目盛りが交わる点です。−40 °C は正確に −40 °F。式から自然に落ちてくるこの雑学は、暗算のセルフチェックにも使えます。交点が別の場所に出たら、途中でオフセットを落としています。",
          ],
        },
        {
          heading: "目盛りの来歴",
          paragraphs: [
            "18 世紀初頭のファーレンハイトは、再現できる寒さの基準として氷・水・塩の混合物にゼロを置き、体温を元の目盛りの上のほう(初版は 96 度、のちに再校正)に据えました。32 と 212 という奇巧な錨は、こうした選択の名残であって、意図的な美しさではありません。",
            "セルシウスの 1742 年の提案は実は今と逆で、0 が沸点、100 が氷点でした。彼の死後まもなく現在の向きで採用され、のちに定義は沸点ではなく絶対零度と水の三重点に錨を替えました。沸点は圧力で動くからです。",
            "19 世紀に提案されたケルビンは、人為的な錨をすべて捨てました。ゼロは「これ以上冷ませない」点です。それによりケルビンは SI 単位であり物理学の言葉になります。気体の法則も熱力学も色温度もケルビンで語られ、摂氏は「ケルビンから 273.15 引いた日常版」として生き残っています。",
          ],
        },
        {
          heading: "現場で温度を読む",
          paragraphs: [
            "同じ数字でも分野によって快適さの意味が違います。オーブンの 180 °C は 356 °F で、米国のダイヤルは 350 °F に丸められているため、その辺の換算は「ぴったり合わない」のが普通です。体温の中心は 37 °C/98.6 °F で、1 度の発熱は華氏 1.8 度。気温の −10〜40 °C は 14〜104 °F に対応します。",
            "複数形の罠に注意です。温度差の 1 摂氏度は 1.8 華氏度に等しく、差はオフセットなしの比率だけで換算します。「10 °C 暖かくなった」は「50 °F」ではなく「18 °F 分」。このツールが換算するのは絶対的な読み値で、差は素の比率で計算してください。",
            "オフセット付きの式は正確なので、結果は 6 桁表示だけが上限です。計算はすべてブラウザ内。これほど軽い算術では当然ですが、副次効果としてページはオフラインで動きます。電波のない台所で、レシピのオーブン温度をスマホで換算できます。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de temperatura",
      tagline:
        "Celsius a Fahrenheit y Kelvin al instante, con puntos de congelación y ebullición de referencia.",
      intro: [
        "Convierte Celsius, Fahrenheit y Kelvin en un paso. A diferencia de las unidades lineales, las escalas de temperatura necesitan fórmulas con desfase; esta herramienta las aplica bien, incluso bajo cero.",
        "Útil para recetas con hornos extranjeros, el parte meteorológico, trabajo de laboratorio y especificaciones de climatización.",
      ],
      faq: [
        {
          q: "¿Cómo se convierte Celsius a Fahrenheit?",
          a: "Multiplica por 9, divide entre 5 y suma 32: °F = °C × 9⁄5 + 32. Por ejemplo, 20 °C = 68 °F. La herramienta lo hace y muestra Kelvin también.",
        },
        {
          q: "¿A qué temperatura coinciden Fahrenheit y Celsius?",
          a: "A −40 grados: −40 °C = −40 °F. Introduce −40 y cambia las unidades para verlo.",
        },
      ],
      deepDive: [
        {
          heading: "Tres escalas, tres ceros",
          paragraphs: [
            "La temperatura es la rara de las unidades: las escalas no comparten el cero, así que cada conversión es una fórmula con desfase, no una multiplicación. Celsius ancla en el agua: 0 °C congela y 100 °C hierve a presión estándar. Fahrenheit ancla en otro sitio: 32 °F congela y 212 °F hierve. Kelvin ancla en la física misma: 0 K es el cero absoluto, −273,15 °C, donde el movimiento molecular llega a su mínimo.",
            "Al diferir los ceros, las fórmulas llevan a la vez una razón y un desfase: °F = °C × 9/5 + 32 y K = °C + 273,15. El tamaño de grado se relaciona por 9/5, pero el desfase es la razón de que 0 °C no sea 0 °F — y de que el atajo de \"multiplicar por 1,8\" falle para toda entrada salvo −40.",
            "−40 es el único punto donde las escalas se cruzan: −40 °C = −40 °F exactos. La curiosidad cae sola de las fórmulas y sirve de chequeo mental rápido: si tu cálculo coloca el cruce en otro sitio, el desfase se perdió por el camino.",
          ],
        },
        {
          heading: "De dónde vienen las escalas",
          paragraphs: [
            "Fahrenheit, a principios del siglo XVIII, fijó su cero en una referencia fría que podía reproducir — una mezcla de hielo, agua y sal — y colocó la temperatura corporal cerca del techo de su escala original (96 grados en la primera versión, recalibrada después). Los anclajes raros de 32 y 212 son residuo de esas decisiones, no una elegancia deliberada.",
            "La propuesta de Celsius de 1742 corría al revés de la actual: 0 en la ebullición y 100 en la congelación. Poco después de su muerte se adoptó la forma invertida que usamos, y más tarde la definición se reancló al cero absoluto y al punto triple del agua en lugar del punto de ebullición, porque este se mueve con la presión.",
            "Kelvin, propuesto en el siglo XIX, tiró por completo los anclajes arbitrarios: el cero es lo más frío que algo puede estar. Eso lo convierte en la unidad del SI y el idioma de la física — leyes de los gases, termodinámica y temperatura de color hablan kelvin — mientras Celsius sobrevive como kelvin menos 273,15 para el tiempo de cada día.",
          ],
        },
        {
          heading: "Leer temperaturas en la vida real",
          paragraphs: [
            "El mismo número significa comodidades distintas según el dominio: un horno a 180 °C son 356 °F y las perillas estadounidenses marcan 350 °F, por eso las conversiones por allí nunca cuadran del todo; el cuerpo se centra en 37 °C/98,6 °F y un grado de fiebre son 1,8 grados Fahrenheit; el clima de −10 a 40 °C equivale a 14–104 °F.",
            "Ojo con la trampa de la diferencia: un cambio de 1 grado Celsius equivale a 1,8 grados Fahrenheit, así que las diferencias se convierten solo con la razón, sin desfase. \"Subió 10 °C\" significa \"subió 18 °F\", no 50 °F. Esta herramienta convierte lecturas absolutas; las diferencias piden la razón a secas.",
            "Las fórmulas con desfase son exactas, así que el único límite del resultado es la pantalla de seis cifras. Todo se calcula en tu navegador — trivial para una aritmética tan ligera, pero trae un extra: la página funciona sin conexión, en una cocina sin cobertura, convirtiendo temperaturas de horno desde el móvil.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de temperatura",
      tagline:
        "Celsius para Fahrenheit e Kelvin na hora, com pontos de congelamento e ebulição de referência.",
      intro: [
        "Converta Celsius, Fahrenheit e Kelvin num passo. Diferente das unidades lineares, as escalas de temperatura exigem fórmulas com deslocamento — a ferramenta aplica tudo certo, inclusive abaixo de zero.",
        "Bom para receitas com fornos estrangeiros, previsão do tempo, trabalho de laboratório e especificações de climatização.",
      ],
      faq: [
        {
          q: "Como converter Celsius para Fahrenheit?",
          a: "Multiplique por 9, divida por 5 e some 32: °F = °C × 9⁄5 + 32. Por exemplo, 20 °C = 68 °F. A ferramenta faz isso e mostra Kelvin também.",
        },
        {
          q: "A que temperatura Fahrenheit e Celsius se igualam?",
          a: "A −40 graus: −40 °C = −40 °F. Digite −40 e troque as unidades para conferir.",
        },
      ],
      deepDive: [
        {
          heading: "Três escalas, três zeros",
          paragraphs: [
            "Temperatura é a exceção entre as unidades: as escalas não compartilham o zero, então cada conversão é uma fórmula com deslocamento, não uma multiplicação. Celsius ancora na água: 0 °C congela e 100 °C ferve à pressão padrão. Fahrenheit ancora em outro lugar: 32 °F congela e 212 °F ferve. Kelvin ancora na física em si: 0 K é o zero absoluto, −273,15 °C, onde o movimento molecular chega ao mínimo.",
            "Como os zeros diferem, as fórmulas carregam ao mesmo tempo uma razão e um deslocamento: °F = °C × 9/5 + 32 e K = °C + 273,15. O tamanho do grau se relaciona por 9/5, mas o deslocamento é o motivo de 0 °C não ser 0 °F — e de o atalho de \"multiplicar por 1,8\" errar para toda entrada menos −40.",
            "−40 é o único ponto em que as escalas se cruzam: −40 °C = −40 °F exatos. A curiosidade cai sozinha das fórmulas e serve de conferência mental: se seu cálculo põe o cruzamento em outro lugar, o deslocamento ficou pelo caminho.",
          ],
        },
        {
          heading: "De onde vêm as escalas",
          paragraphs: [
            "Fahrenheit, no começo do século XVIII, fixou seu zero numa referência fria que conseguia reproduzir — uma mistura de gelo, água e sal — e colocou a temperatura corporal perto do teto da sua escala original (96 graus na primeira versão, recalibrada depois). As ancoragens estranhas de 32 e 212 são resíduo dessas escolhas, não uma elegância deliberada.",
            "A proposta de Celsius, em 1742, rodava ao contrário da de hoje: 0 na ebulição e 100 no congelamento. Pouco depois da morte dele adotou-se a forma invertida que usamos, e mais tarde a definição reancorou-se no zero absoluto e no ponto triplo da água em vez do ponto de ebulição, porque este se move com a pressão.",
            "Kelvin, proposto no século XIX, jogou fora de vez as ancoragens arbitrárias: o zero é o mais frio que algo pode estar. Isso o torna a unidade do SI e o idioma da física — leis dos gases, termodinâmica e temperatura de cor falam kelvin — enquanto Celsius sobrevive como kelvin menos 273,15 para o tempo do dia a dia.",
          ],
        },
        {
          heading: "Lendo temperaturas na prática",
          paragraphs: [
            "O mesmo número significa confortos diferentes conforme o domínio: um forno a 180 °C são 356 °F e os botões americanos marcam 350 °F, por isso as conversões por ali nunca fecham redondo; o corpo se centra em 37 °C/98,6 °F e um grau de febre são 1,8 grau Fahrenheit; o tempo de −10 a 40 °C equivale a 14–104 °F.",
            "Cuidado com a pegadinha da diferença: uma variação de 1 grau Celsius equivale a 1,8 grau Fahrenheit, então diferenças se convertem só pela razão, sem deslocamento. \"Esquentou 10 °C\" significa \"esquentou 18 °F\", não 50 °F. Esta ferramenta converte leituras absolutas; diferenças pedem a razão pura.",
            "As fórmulas com deslocamento são exatas, então o único limite do resultado é a tela de seis algarismos. Tudo se calcula no seu navegador — trivial para uma aritmética tão leve, mas traz um bônus: a página funciona offline, numa cozinha sem sinal, convertendo temperaturas de forno pelo celular.",
          ],
        },
      ],
    },
  },
});
