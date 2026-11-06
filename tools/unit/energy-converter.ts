import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "energy-converter",
  icon: "sparkle",
  cat: "energy",
  related: ["pressure-converter", "weight-converter", "temperature-converter", "data-converter", "area-converter", "volume-converter", "time-converter", "speed-converter", "length-converter"],
  copy: {
    en: {
      name: "Energy Converter",
      tagline: "Calories, kilojoules, joules, kWh, Wh and BTU — food labels, electricity bills and physics in one place.",
      intro: [
        "Nutritionists comparing food calories (kcal) with joules on EU labels, engineers converting kWh to megajoules for energy audits, physicists working in electronvolts, and homeowners comparing heater outputs in BTU against air conditioners in watts all cross energy unit systems.",
        "Six significant digits with definitions stated: the thermochemical calorie is exactly 4.184 J (the definition used here), and 1 kWh is exactly 3.6 MJ by definition — a rare exactness worth knowing when reading electricity bills.",
        "The joule is the SI unit; every factor is a defined constant (1 cal = 4.184 J, 1 BTU ≈ 1,055.06 J with the ISO value, 1 eV = 1.602176634×10⁻¹⁹ J exact per the 2019 SI redefinition). Watt-hours convert exactly because they are joules × 3,600.",
        "Energy spans nutrition, engineering and physics, each with its own units — calories, kWh, BTU, eV — and comparing them manually invites errors. This converter displays them together: type one value and see joules, calories, kilowatt-hours, BTU and electronvolts at once.",
      ],
      faq: [
        {
          q: "Is a calorie the same as a kilocalorie?",
          a: "No. 1 kcal = 1000 cal. Food labels saying 'Calorie' (capital C) actually mean kilocalories. Enter 1 kcal → cal to verify.",
        },
        {
          q: "How many kWh is 1 BTU?",
          a: "1 BTU = 0.000293071 kWh. A 10,000 BTU air conditioner running for one hour uses about 2.93 kWh.",
        },
      ],
      deepDive: [
        {
          heading: "The joule and the bill in your mailbox",
          paragraphs: [
            "The joule is the SI unit: one newton of force over one meter, or one watt sustained for one second. It is tiny at household scale, which is why electricity bills speak kilowatt-hours — and the kilowatt-hour is a bundle of joules with an exact definition: 1 kWh = 3.6 MJ, always, because watt-hours are just joules times 3,600.",
            "That exactness makes energy arithmetic a little special: the electric column contains no measured constants at all. A 2,000 W heater running one hour consumes 2 kWh = 7.2 MJ, and the conversion cannot drift because both sides are defined quantities.",
            "Reading bills across countries is the everyday payoff: Europe quotes kWh, gas sometimes MJ, and comparing a heater in BTU with an air conditioner in watts needs exactly this bridge. Six significant digits are far more than a bill needs, but they keep audit-grade sums honest.",
          ],
        },
        {
          heading: "The calorie's split personality",
          paragraphs: [
            "The calorie was defined 19th-century style: the heat that raises one gram of water by one degree Celsius. Water's heat capacity drifts slightly with temperature, so the vague definition forked into several calories — this tool uses the thermochemical calorie, now fixed at exactly 4.184 J, the convention behind most chemistry and food tables.",
            "The food Calorie with a capital C is a kilocalorie: 1,000 small calories, 4,184 J. EU labels show kJ and kcal side by side; US labels say Calories meaning kcal. The factor-of-1,000 slip is the classic dieting-app error — enter 1 kcal → cal above and watch the gap.",
            "Physics retired the calorie for good reason, but kitchens and gyms never will: the unit survives because how much heat warms a gram of water is the most intuitive picture of energy anyone ever invented. Just carry the 1:1,000 ratio along with it.",
          ],
        },
        {
          heading: "BTU and the physics unit nobody bills in",
          paragraphs: [
            "The BTU — British thermal unit — is the pound-world's calorie: the heat that raises one pound of water by one degree Fahrenheit, about 1,055 J with the standard ISO value. HVAC capacity is quoted in BTU per hour, so a 10,000 BTU air conditioner delivers roughly 2.93 kWh of cooling per hour — and consumes a bit more electricity than that to do it.",
            "Physics keeps its books in electronvolts instead: 1 eV is exactly 1.602176634 × 10⁻¹⁹ J, an exactness guaranteed by the 2019 SI redefinition. Particle accelerators and battery chemistry speak eV; groceries and gas bills never will.",
            "This converter lines the worlds up side by side — joules, calories, kWh, BTU and eV from one input, all computed locally in your browser. Six significant digits matter most where magnitudes collide: a 200 kcal snack is 836,800 J, and seeing that number next to a heater's megajoules is the fastest way to feel what food energy means.",
          ],
        },
      ],
    },
    zh: {
      name: "能量换算",
      tagline: "卡路里、千焦、焦耳、千瓦时、瓦时、BTU 互转——食品标签、电费单、物理题一站解决。",
      intro: [
        "跨场景换算能量单位:食品热量(kcal)与化学热量(cal)、用电用 kWh、制热用 BTU、物理计算用焦耳。",
        "明确区分 cal 与 kcal——很多营养标签误读就出在这里——并采用精确的标准系数。",
      ],
      faq: [
        {
          q: "卡路里和千卡是一回事吗?",
          a: "不是。1 kcal = 1000 cal。食品标签上的“卡路里”(大写 Calorie)实际指千卡。输入 1 kcal → cal 即可验证。",
        },
        {
          q: "1 BTU 等于多少千瓦时?",
          a: "1 BTU = 0.000293071 kWh。一台 10000 BTU 的空调运行一小时约耗电 2.93 kWh。",
        },
      ],
      deepDive: [
        {
          heading: "焦耳,和你信箱里的账单",
          paragraphs: [
            "焦耳是 SI 单位:一牛的力推过一米,或一瓦持续一秒。对家用尺度它太小了,所以电费单说千瓦时——而千瓦时是一捆带精确定义的焦耳:1 kWh = 3.6 MJ,永远如此,因为瓦时本来就是焦耳乘 3600。",
            "这份精确让能量算术有点特别:电力这一列没有任何测量常数。2000 W 的取暖器开一小时耗电 2 kWh = 7.2 MJ,换算不可能漂移——两边都是定义量。",
            "跨国读账单是日常收益:欧洲按 kWh 报,燃气有时用 MJ,拿 BTU 的暖炉对比瓦数的空调,恰恰需要这座桥。六位有效数字远超账单所需,但足以让审计级的加总保持诚实。",
          ],
        },
        {
          heading: "卡路里的分裂人格",
          paragraphs: [
            "卡路里是 19 世纪式的定义:把一克水升高一摄氏度所需的热。水的热容随温度略有漂移,模糊的定义于是分叉出好几种卡——本工具采用热化学卡,如今精确定格在 4.184 J,这正是多数化学与食品表格背后的口径。",
            "大写 C 的食品卡路里是千卡:1000 个小卡,4184 J。欧盟标签并排标 kJ 和 kcal;美国标签写 Calories,意思是 kcal。差 1000 倍是节食 App 的经典错误——在上方输入 1 kcal → cal,看看这道鸿沟。",
            "物理学退役了卡路里,理由充分;但厨房和健身房永远不会:这个单位能活下来,是因为“多少热能暖热一克水”是有人发明过的最直觉的能量图像。只要随身带上 1:1000 这个比例就行。",
          ],
        },
        {
          heading: "BTU 与物理界记账的单位",
          paragraphs: [
            "BTU——英热单位——是磅世界的卡路里:把一磅水升高一华氏度所需的热,按 ISO 标准值约 1,055 J。暖通能力按 BTU 每小时报价,一台 10,000 BTU 的空调每小时送出约 2.93 kWh 的冷量——而做到这件事耗的电还要多一点。",
            "物理学改用电子伏特记账:1 eV 精确等于 1.602176634 × 10⁻¹⁹ J,这一精确性由 2019 年的 SI 重新定义担保。粒子加速器和电池化学说 eV;食品杂货和燃气账单永远不会。",
            "本换算器把几个世界并排排开——一次输入,同时得到焦耳、卡路里、kWh、BTU、eV——全部在浏览器本地计算。六位有效数字在量级相撞时最有用:一份 200 kcal 的零食是 836,800 J,把它和取暖器的兆焦并排看,是对食物能量最快的直觉校准。",
          ],
        },
      ],
    },
    ja: {
      name: "エネルギー換算",
      tagline: "カロリー・キロジュール・ジュール・kWh・Wh・BTU を換算。食品表示も電気代も物理も。",
      intro: [
        "文脈をまたいでエネルギーの単位を変換:食品カロリー(kcal)と化学カロリー(cal)、電力は kWh、暖房は BTU、物理はジュール。",
        "cal と kcal を明確に区別(ダイエット表示の誤解のもと)し、標準の正確な係数を使います。",
      ],
      faq: [
        {
          q: "カロリーとキロカロリーは同じ?",
          a: "違います。1 kcal = 1000 cal。食品表示の「カロリー」(大文字 Calorie)は実際にはキロカロリーです。1 kcal → cal を入力して確認できます。",
        },
        {
          q: "1 BTU は何 kWh?",
          a: "1 BTU = 0.000293071 kWh。10,000 BTU のエアコンを 1 時間動かすと約 2.93 kWh 消費します。",
        },
      ],
      deepDive: [
        {
          heading: "ジュールと、郵便受けの中の請求書",
          paragraphs: [
            "ジュールは SI 単位です。1 ニュートンの力を 1 メートルに及ぼす、あるいは 1 ワットを 1 秒続けること。家庭の規模では小さすぎるため、電気代はキロワット時で語ります。キロワット時は正確な定義つきのジュールの束です。1 kWh = 3.6 MJ、常に。ワット時とはもともとジュールに 3,600 を掛けたものですから。",
            "この正確さゆえ、エネルギーの算術は少し変わっています。電気の列には測定定数が一つもありません。2,000 W のヒーターを 1 時間動かすと 2 kWh = 7.2 MJ。両辺とも定義量なので、この換算は漂いません。",
            "国をまたいで請求書を読むのが日常の実益です。欧州は kWh、ガスはときに MJ、BTU 建てのヒーターとワット建てのエアコンを比べるには、まさにこの橋が必要です。有効数字 6 桁は請求書には過剰なほどですが、監査級の合計を正直に保ちます。",
          ],
        },
        {
          heading: "カロリーの分裂人格",
          paragraphs: [
            "カロリーは 19 世紀式の定義でした。1 g の水を 1 度上げる熱。水の熱容量は温度でわずかに動くため、あいまいな定義はいくつものカロリーに分かれました。このツールは熱化学カロリーを使い、今や正確に 4.184 J と固定されています。化学や食品の表の多くがいまだにその基準です。",
            "大文字で始まる食品のカロリーはキロカロリーです。1,000 小カロリー、4,184 J。EU の表示は kJ と kcal を併記し、米国の表示は Calories と書いて kcal を意味します。1,000 倍の取り違えはダイエットアプリの定番ミスです。上で 1 kcal → cal を入力し、溝の大きさを見てください。",
            "物理学は理由あってカロリーを永久退役させましたが、台所とジムは決してそうしません。「どれだけの熱が 1 g の水を温めるか」は、誰が発明した中最も直感的なエネルギーの絵だからです。1 対 1,000 の比だけを持って歩けば十分です。",
          ],
        },
        {
          heading: "BTU と、物理が請求書に使わない単位",
          paragraphs: [
            "BTU(英熱量)はポンド世界のカロリーです。1 ポンドの水を 1 華氏度上げる熱で、ISO の標準値で約 1,055 J。空調の能力は BTU 毎時で見積もられ、10,000 BTU のエアコンは毎時およそ 2.93 kWh の冷熱を供給します——そのために消費する電力はそれより少し多い。",
            "物理学はその代わり電子ボルトで帳簿をつけます。1 eV は正確に 1.602176634 × 10⁻¹⁹ J。この正確さは 2019 年の SI 再定義が保証します。加速器も電池の化学も eV で語り、食料品とガスの請求書は永遠にそうしません。",
            "このコンバーターは世界を並べます。1 つの入力からジュール・カロリー・kWh・BTU・eV を一度に、すべてブラウザ内で計算します。有効数字 6 桁が最も活きるのは桁がぶつかる場所です。200 kcal のお菓子は 836,800 J。その数をヒーターのメガジュールの隣に置いてみることこそ、食品エネルギーの実感を最速で鍛える方法です。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de energía",
      tagline:
        "Calorías, kilojulios, julios, kWh, Wh y BTU: etiquetas de alimentos, factura de la luz y física.",
      intro: [
        "Convierte energía entre contextos: calorías de alimentos (kcal) frente a calorías de química (cal), electricidad en kWh, calefacción en BTU, física en julios.",
        "Distinción clara entre cal y kcal —el origen de muchos malentendidos con etiquetas— con factores estándar exactos.",
      ],
      faq: [
        {
          q: "¿Una caloría es lo mismo que una kilocaloría?",
          a: "No. 1 kcal = 1000 cal. Las etiquetas que dicen «Caloría» (con mayúscula) se refieren en realidad a kilocalorías. Introduce 1 kcal → cal para comprobarlo.",
        },
        {
          q: "¿Cuántos kWh son 1 BTU?",
          a: "1 BTU = 0,000293071 kWh. Un aire acondicionado de 10.000 BTU durante una hora consume unos 2,93 kWh.",
        },
      ],
      deepDive: [
        {
          heading: "El julio y la factura en tu buzón",
          paragraphs: [
            "El julio es la unidad del SI: un newton de fuerza a lo largo de un metro, o un vatio sostenido un segundo. A escala doméstica es diminuto, y por eso las facturas hablan en kilovatios-hora — y el kilovatio-hora es un haz de julios con definición exacta: 1 kWh = 3,6 MJ, siempre, porque el vatio-hora es simplemente julios por 3.600.",
            "Esa exactitud hace peculiar la aritmética de energía: en la columna eléctrica no hay ninguna constante medida. Un calefactor de 2.000 W encendido una hora consume 2 kWh = 7,2 MJ, y la conversión no puede derivar porque los dos lados son cantidades definidas.",
            "Leer facturas entre países es la ganancia cotidiana: Europa usa kWh, el gas a veces MJ, y comparar un calefactor en BTU con un aire acondicionado en vatios exige precisamente este puente. Seis cifras significativas son mucho más de lo que una factura necesita, pero mantienen honestas las sumas de auditoría.",
          ],
        },
        {
          heading: "La personalidad dividida de la caloría",
          paragraphs: [
            "La caloría se definió a la manera del siglo XIX: el calor que eleva un gramo de agua un grado Celsius. Como la capacidad calorífica del agua varía algo con la temperatura, la definición vaga se bifurcó en varias calorías — esta herramienta usa la caloría termoquímica, hoy fijada en exactamente 4,184 J, la convención detrás de la mayoría de tablas de química y de alimentos.",
            "La Caloría de alimentos, con mayúscula, es una kilocaloría: 1.000 calorías pequeñas, 4.184 J. Las etiquetas europeas muestran kJ y kcal; las estadounidenses dicen Calories queriendo decir kcal. El desliz del factor 1.000 es el error clásico de las apps de dieta — introduce 1 kcal → cal arriba y mira el abismo.",
            "La física jubiló la caloría con razón, pero las cocinas y los gimnasios nunca lo harán: la unidad sobrevive porque cuánto calor calienta un gramo de agua es la imagen de energía más intuitiva jamás inventada. Solo lleva consigo la proporción de 1:1.000.",
          ],
        },
        {
          heading: "BTU y la unidad de física en la que nadie factura",
          paragraphs: [
            "La BTU — unidad térmica británica — es la caloría del mundo de la libra: el calor que eleva una libra de agua un grado Fahrenheit, unos 1.055 J con el valor ISO estándar. La capacidad de climatización se cotiza en BTU por hora, así que un aire de 10.000 BTU entrega unos 2,93 kWh de frío por hora — y consume algo más de electricidad para lograrlo.",
            "La física factura en electronvoltios: 1 eV son exactamente 1,602176634 × 10⁻¹⁹ J, exactitud garantizada por la redefinición del SI de 2019. Los aceleradores de partículas y la química de baterías hablan en eV; el supermercado y la factura del gas nunca lo harán.",
            "Este conversor alinea los mundos de un lado a otro — julios, calorías, kWh, BTU y eV desde una sola entrada, todo calculado en tu navegador. Las seis cifras importan más donde chocan las magnitudes: un tentempié de 200 kcal son 836.800 J, y ver ese número junto a los megajulios de un calefactor es la forma más rápida de intuir qué significa la energía de la comida.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de energia",
      tagline:
        "Calorias, quilojoules, joules, kWh, Wh e BTU — rótulos de alimentos, conta de luz e física.",
      intro: [
        "Converta energia entre contextos: calorias de alimentos (kcal) vs calorias da química (cal), eletricidade em kWh, aquecimento em BTU, física em joules.",
        "Distinção clara entre cal e kcal — a raiz de muita confusão em rótulos — com fatores padrão exatos.",
      ],
      faq: [
        {
          q: "Caloria é a mesma coisa que quilocaloria?",
          a: "Não. 1 kcal = 1000 cal. Rótulos que dizem “Caloria” (com C maiúsculo) na verdade significam quilocalorias. Digite 1 kcal → cal para conferir.",
        },
        {
          q: "Quantos kWh tem 1 BTU?",
          a: "1 BTU = 0,000293071 kWh. Um ar-condicionado de 10.000 BTU ligado por uma hora consome cerca de 2,93 kWh.",
        },
      ],
      deepDive: [
        {
          heading: "O joule e a conta na sua caixa de correio",
          paragraphs: [
            "O joule é a unidade do SI: um newton de força ao longo de um metro, ou um watt sustentado por um segundo. Na escala doméstica é diminuto, e por isso as contas de luz falam em quilowatts-hora — e o quilowatt-hora é um feixe de joules com definição exata: 1 kWh = 3,6 MJ, sempre, porque o watt-hora é simplesmente joules vezes 3.600.",
            "Essa exatidão torna peculiar a aritmética de energia: na coluna elétrica não há nenhuma constante medida. Um aquecedor de 2.000 W ligado por uma hora consome 2 kWh = 7,2 MJ, e a conversão não pode derivar, porque os dois lados são quantidades definidas.",
            "Ler contas entre países é o ganho cotidiano: a Europa usa kWh, o gás às vezes MJ, e comparar um aquecedor em BTU com um ar-condicionado em watts exige exatamente esta ponte. Seis algarismos significativos são muito mais do que uma conta precisa, mas mantêm honestas as somas de auditoria.",
          ],
        },
        {
          heading: "A personalidade dividida da caloria",
          paragraphs: [
            "A caloria foi definida à moda do século XIX: o calor que eleva um grama de água um grau Celsius. Como a capacidade térmica da água varia um pouco com a temperatura, a definição vaga se bifurcou em várias calorias — esta ferramenta usa a caloria termoquímica, hoje fixada em exatamente 4,184 J, a convenção por trás da maioria das tabelas de química e de alimentos.",
            "A Caloria de alimentos, com maiúscula, é uma quilocaloria: 1.000 calorias pequenas, 4.184 J. Os rótulos europeus mostram kJ e kcal; os americanos dizem Calories querendo dizer kcal. O deslize do fator 1.000 é o erro clássico dos aplicativos de dieta — digite 1 kcal → cal acima e veja o abismo.",
            "A física aposentou a caloria com razão, mas cozinhas e academias nunca o farão: a unidade sobrevive porque quanto calor aquece um grama de água é a imagem de energia mais intuitiva já inventada. Só leve junto a proporção de 1:1.000.",
          ],
        },
        {
          heading: "BTU e a unidade de física em que ninguém faz conta",
          paragraphs: [
            "A BTU — unidade térmica britânica — é a caloria do mundo da libra: o calor que eleva uma libra de água um grau Fahrenheit, uns 1.055 J com o valor padrão da ISO. A capacidade de climatização é cotada em BTU por hora, então um ar de 10.000 BTU entrega uns 2,93 kWh de frio por hora — e consome um pouco mais de eletricidade para conseguir isso.",
            "A física faz a conta em elétron-volts: 1 eV são exatamente 1,602176634 × 10⁻¹⁹ J, exatidão garantida pela redefinição do SI de 2019. Aceleradores de partículas e a química de baterias falam em eV; o mercadinho e a conta de gás nunca falarão.",
            "Este conversor alinha os mundos lado a lado — joules, calorias, kWh, BTU e eV a partir de uma só entrada, tudo calculado no seu navegador. Os seis algarismos importam mais onde as grandezas se cruzam: um lanche de 200 kcal são 836.800 J, e ver esse número ao lado dos megajoules de um aquecedor é o jeito mais rápido de sentir o que significa a energia da comida.",
          ],
        },
      ],
    },
  },
});
