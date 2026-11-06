import { CalcEngineColor } from "../_engines/calc-engine-color";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "color-converter",
  category: "utility",
  icon: "palette",
  engine: { component: CalcEngineColor, props: { kind: "converter" } },
  related: ["color-picker", "qr-generator", "aspect-ratio-calculator", "uuid-generator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Color Converter",
      tagline: "Paste a color in hex, rgb() or hsl() and get all three formats plus a ready-made row of tints and shades for your design system.",
      intro: [
        "Feed it #0071e3, rgb(0, 113, 227) or hsl(211, 100%, 45%) — the parser detects the format automatically and outputs hex, RGB and HSL at once, each with a one-click copy.",
        "Below the values, a tint-and-shade row mixes your color with white and black at 20/40/60/80% steps: instant hover states, borders and dark-mode variants without opening a design tool.",
        "Conversions follow the standard sRGB math: hex is the RGB triplet in base 16, and HSL is derived with hue in degrees 0–360 and saturation and lightness as percentages. Values are rounded for display but kept full-precision internally, so hex → HSL → hex round-trips without drifting a shade.",
        "Compared with pasting values into a design app, the tint-and-shade row plus one-click copy across all three formats covers most front-end needs — hover states, borders, dark-mode pairs — in one glance. Note the colors are sRGB only: wide-gamut spaces such as Display-P3 fall outside this model, so printed or HDR output may look different.",
      ],
      steps: [
        "Paste a color in any of the three formats — hex, rgb() or hsl().",
        "Read the converted values and copy the one you need.",
        "Grab tints and shades from the swatch row below.",
      ],
      faqs: [
        {
          q: "How is HSL converted to RGB?",
          a: "Through the standard Cylindrical–RGB mapping: chromaticity c = (1 − |2L − 1|) × S, an intermediate value x determined by the hue sector, then each channel is offset by m = L − c/2. The math is the textbook formulas, so results match design tools.",
        },
        {
          q: "Why does my color code show as invalid?",
          a: "Accepted forms are #RGB / #RRGGBB, rgb(r, g, b) and hsl(h, s%, l%). Channels must be in range (0–255 for RGB, 0–360 for hue, 0–100% for the rest) and each part separated by a comma or space.",
        },
        {
          q: "What are tints and shades good for?",
          a: "Tints (mixed with white) make hover backgrounds, badges and cards; shades (mixed with black) make pressed states, borders and dark-mode surfaces. Deriving both from one brand color keeps every UI state visually consistent.",
        },
      ],
      deepDive: [
        {
          heading: "Why RGB-to-HSL conversion loses information",
          paragraphs: [
            "Hex and RGB describe the same thing — three channel values — so converting between them is just base-16 bookkeeping, lossless in both directions. HSL is different: it is a re-description of the color in cylindrical coordinates (hue as an angle, saturation and lightness as percentages). The round trip hex → HSL → hex still returns the same color, but the human-readable HSL triplet itself has been quantized, which is why two colors that differ subtly can share an HSL hue.",
            "The deeper issue is perceptual. HSL's lightness is not perceptual lightness: hsl(60, 100%, 50%) — pure yellow — looks far brighter than hsl(240, 100%, 50%) — pure blue — even though both claim 50% lightness. Designers who generate palettes by rotating hue at fixed HSL lightness get palettes where every color feels differently heavy. This converter reports the honest math rather than pretending HSL lightness is what your eye sees.",
            "Practical takeaway: use HSL for what it is good at — nudging a hue, building a predictable tint ladder around one color — and verify contrast ratios with actual luminance values rather than trusting the L number. The tint-and-shade row here mixes with white and black in RGB space, which keeps the ladder consistent with how browsers composite colors.",
          ],
        },
        {
          heading: "OKLCH and perceptually uniform spaces: what this converter is not",
          paragraphs: [
            "Modern CSS supports OKLCH, a perceptually uniform space where moving a fixed distance in the coordinate space changes perceived color by roughly the same amount anywhere — yellow and blue at the same L value genuinely look equally light. This converter deliberately stays in the classic sRGB triad of hex, RGB and HSL, because those are what legacy design systems, brand guidelines and style tokens still specify.",
            "The difference matters most in palette generation. In HSL, stepping hue around a circle at constant L produces colors of wildly varying perceived intensity; in OKLCH the same walk produces an even ramp. Similarly, HSL \"saturation 50%\" does not mean half the perceived chroma. If you are building a new design token scale from scratch, it is worth generating in a uniform space — but translating existing brand hex values into it changes the numbers your team already memorized.",
            "Also outside this model: wide-gamut color. Values here are sRGB, the space every browser and most screens target; Display-P3 screens can show more saturated greens and reds than sRGB can express. A color chosen here will render correctly everywhere but leaves the extra gamut unused — a safe, compatible default for UI work.",
          ],
        },
        {
          heading: "How tints and shades are actually built",
          paragraphs: [
            "A tint is the color mixed with white, a shade mixed with black, each at fixed fractions. In RGB terms that is a linear interpolation channel by channel: a 40% tint of rgb(0, 113, 227) lifts every channel 40% of the way toward 255, and a 40% shade drops each 40% toward 0. The steps here are 20/40/60/80%, giving five usable stops above and below the base color.",
            "This simple mixing is intentionally not the same as color-managed blending in Lab-based spaces, which tries to keep perceived hue constant while lightness changes. Simple RGB mixing darkens saturated colors slightly unevenly — a known, accepted behavior in most design systems, where the ladder is generated once and checked by eye.",
            "Workflow-wise, generating the ladder from the same source value every time beats hand-picking variants: hover states, disabled buttons and dark-mode surfaces stay reproducible, and everyone on the team can regenerate the exact same set from the one hex they memorized. Everything computes locally in the browser — the color never leaves the page.",
          ],
        },
      ],
    },
    zh: {
      name: "颜色转换器",
      tagline: "粘贴 hex、rgb() 或 hsl() 格式的颜色,一次得到三种格式,外加一排现成的明暗色阶,设计系统直接取用。",
      intro: [
        "输入 #0071e3、rgb(0, 113, 227) 或 hsl(211, 100%, 45%)——解析器自动识别格式,同时输出 hex、RGB 和 HSL 三种写法,均可一键复制。",
        "数值下方是明暗色阶行:按 20/40/60/80% 与白色和黑色混合——悬停背景、边框和深色模式变体无需打开设计工具就能拿到。",
      ],
      steps: [
        "粘贴任意一种格式的颜色——hex、rgb() 或 hsl()。",
        "查看转换结果并复制所需格式。",
        "从下方色阶行获取明色和暗色变体。",
      ],
      faqs: [
        {
          q: "HSL 是怎么转换成 RGB 的?",
          a: "通过标准圆柱坐标到 RGB 的映射:色度 c = (1 − |2L − 1|) × S,中间量 x 由色相所在区间决定,各通道再加偏移 m = L − c/2。用的是教科书公式,结果与设计工具一致。",
        },
        {
          q: "为什么我的颜色代码提示无效?",
          a: "支持的写法是 #RGB / #RRGGBB、rgb(r, g, b) 和 hsl(h, s%, l%)。通道要在范围内(RGB 为 0–255,色相 0–360,其余 0–100%),各部分用逗号或空格分隔。",
        },
        {
          q: "明暗色阶有什么用?",
          a: "明色(混白)适合悬停背景、徽章和卡片;暗色(混黑)适合按压态、边框和深色模式表面。从同一个品牌色派生所有状态,视觉上才够统一。",
        },
      ],
      deepDive: [
        {
          heading: "RGB 转 HSL 为什么会\"损失观感\"",
          paragraphs: [
            "hex 和 RGB 描述的是同一件事——三个通道值——互相转换只是十六进制记账,两个方向都无损。HSL 不一样:它是用柱坐标重新描述颜色(色相是角度,饱和度和亮度是百分比)。hex → HSL → hex 走一圈还是会回到同一个颜色,但人读的那组 HSL 数字本身被量化过,所以两个细微差别的颜色可能共用同一个色相值。",
            "更深的问题是感知。HSL 的\"亮度\"不是人眼感知的明度:hsl(60, 100%, 50%) 的纯黄看起来比 hsl(240, 100%, 50%) 的纯蓝亮得多,尽管两者都声称 50% 亮度。靠固定 HSL 亮度转色相生成的调色板,每个颜色的视觉重量都不一样——这是设计里常见的坑。本转换器如实输出数学结果,不假装 HSL 亮度就是你眼睛看到的。",
            "实用结论:HSL 适合用它擅长的事——微调色相、围绕一个颜色搭可预测的明暗阶梯——而对比度要用真实亮度值验证,别信 L 那个数。这里的明暗色阶在 RGB 空间与白、黑混合,和浏览器合成颜色的方式保持一致。",
          ],
        },
        {
          heading: "OKLCH 与感知均匀色空间:本工具不做什么",
          paragraphs: [
            "现代 CSS 支持 OKLCH——一个感知均匀的色空间,在坐标空间里移动相同距离,人眼感知的变化处处大致相等:同样的 L 值,黄色和蓝色看起来真的差不多亮。本转换器刻意停留在 hex、RGB、HSL 这套经典 sRGB 组合里,因为存量设计系统、品牌规范和样式 token 指定的仍是这些。",
            "差别在生成调色板时最明显。HSL 里固定 L 绕色相环走一圈,感知强度忽高忽低;OKLCH 里同样的走法得到均匀的过渡。同样,HSL 的\"饱和度 50%\"也不等于感知彩度的一半。如果从零开始搭新的设计 token 阶梯,值得在均匀色空间里生成——但把现有品牌 hex 值换算过去,团队背下来的那组数字就全变了。",
            "本工具也不覆盖广色域:这里的值都是 sRGB,是所有浏览器和大多数屏幕的目标色空间;Display-P3 屏幕能显示比 sRGB 更饱和的绿和红。在这里选的颜色处处渲染正确,只是没用到额外的色域——对 UI 工作来说,这是安全兼容的默认选择。",
          ],
        },
        {
          heading: "明暗色阶到底是怎么算出来的",
          paragraphs: [
            "明色是与白色按固定比例混合,暗色是与黑色混合。在 RGB 里就是逐通道线性插值:rgb(0, 113, 227) 的 40% 明色把每个通道朝 255 方向抬 40%,40% 暗色则朝 0 压 40%。这里的档位是 20/40/60/80%,基准色上下各留五档可用。",
            "这种简单混合有意不做基于 Lab 等色彩管理空间的混色——那种混法试图在明度变化时保持感知色相不变。简单 RGB 混合对高饱和颜色的变暗会略不均匀——这是多数设计系统已接受的行为,阶梯只生成一次,再用眼睛校验。",
            "工作流上,从同一个源值每次生成阶梯,胜过手工挑变体:悬停态、禁用按钮、深色模式表面都可复现,团队每个人都能从记住的那一个 hex 重新生成一模一样的一套。全部计算在浏览器本地完成——颜色从不离开页面。",
          ],
        },
      ],
    },
    ja: {
      name: "カラーコンバーター",
      tagline: "hex・rgb()・hsl() の色を貼り付ければ 3 形式まとめて変換。さらにティント&シェードの段階表まで自動生成します。",
      intro: [
        "#0071e3、rgb(0, 113, 227)、hsl(211, 100%, 45%) のいずれでも入力できます。形式は自動判別され、hex・RGB・HSL が同時に出力され、どれもワンクリックでコピー可能です。",
        "値の下には、白と黒に 20/40/60/80% ずつ混ぜたティント&シェードの行があります。ホバー状態・枠線・ダークモード向けのバリエーションをデザインツールなしで即座に用意できます。",
      ],
      steps: [
        "hex・rgb()・hsl() のいずれかの形式で色を貼り付けます。",
        "変換結果を確認し、必要な形式をコピーします。",
        "下の段階表から明るい色・暗い色を取得します。",
      ],
      faqs: [
        {
          q: "HSL から RGB へはどう変換しますか?",
          a: "標準の円筒座標→RGB 変換を使います。彩度成分 c = (1 − |2L − 1|) × S、色相の区間で決まる中間値 x、そして各チャネルに m = L − c/2 を加える形です。教科書どおりの式なので、デザインツールと同じ結果になります。",
        },
        {
          q: "色コードが無効になるのはなぜですか?",
          a: "受け付けるのは #RGB / #RRGGBB、rgb(r, g, b)、hsl(h, s%, l%) です。各チャネルは範囲内(RGB は 0–255、色相は 0–360、他は 0–100%)で、各部はカンマか空白で区切ります。",
        },
        {
          q: "ティントとシェードは何に使いますか?",
          a: "ティント(白と混合)はホバー背景・バッジ・カード向き、シェード(黒と混合)は押下状態・枠線・ダークモードの表面向きです。1 つのブランドカラーから派生させると、UI の状態全体が視覚的にそろいます。",
        },
      ],
      deepDive: [
        {
          heading: "RGB から HSL への変換が情報を落とす理由",
          paragraphs: [
            "hex と RGB は同じものの別の書き方(3 チャネルの値)なので、相互変換は 16 進の帳簿づけにすぎず、双方向で損はありません。HSL は違います。色相を角度、彩度と明度をパーセントとする円筒座標での再記述です。hex → HSL → hex の往復は同じ色に戻りますが、人間が読む HSL の数値自体は量子化されており、微妙に違う 2 色が同じ色相値を共有することがあります。",
            "より深い問題は知覚です。HSL の「明度」は知覚的な明るさではありません。hsl(60, 100%, 50%) の純黄は、hsl(240, 100%, 50%) の純青よりはるかに明るく見えます。両者とも明度 50% を主張しているのにです。HSL の明度を固定したまま色相を回してパレットを作ると、色ごとに視覚的な重さがばらつきます。本コンバーターは数学の結果を正直に出し、HSL の明度が目に見えるものだと装いません。",
            "実用上の結論:HSL は得意なことに使います。色相の微調整、1 色を中心にした予測可能な階段作りです。コントラスト比は H の数値ではなく実際の輝度値で検証してください。ここのティント&シェードは RGB 空間で白と黒に混ぜており、ブラウザの色合成と一貫します。",
          ],
        },
        {
          heading: "OKLCH と知覚均一色空間:このツールがしないこと",
          paragraphs: [
            "現代の CSS は OKLCH をサポートします。知覚的に均一な色空間で、座標空間で同じ距離動けば、知覚される色の変化量がどこでもほぼ同じになります。同じ L の黄と青は、実際にほぼ同じ明るさに見えます。本コンバーターはあえて hex・RGB・HSL の古典的な sRGB の三つ組に留まっています。既存のデザインシステム、ブランドガイド、スタイルトークンが指定しているのは依然としてこれらだからです。",
            "差が最も出るのはパレット生成です。HSL で L を固定して色相環を一周すると、知覚的な強さが激しく上下します。OKLCH では同じ動きが均一な勾配になります。同様に、HSL の「彩度 50%」も知覚的な色の鮮やかさの半分を意味しません。新しいトークン階段をゼロから作るなら均一色空間での生成が価値ありますが、既存のブランド hex をそこへ写すと、チームが暗記してきた数値が変わってしまいます。",
            "このモデルの外にあるものとして広色域もあります。ここでの値は sRGB で、すべてのブラウザと多くの画面が対象とする空間です。Display-P3 の画面は sRGB で表せるより鮮やかな緑と赤を表示できます。ここで選んだ色はどこでも正しく表示されますが、余った色域は未使用です。UI の仕事には安全で互換性のある既定値です。",
          ],
        },
        {
          heading: "ティントとシェードは実際どう作られているか",
          paragraphs: [
            "ティントは白との混合、シェードは黒との混合で、それぞれ固定の割合です。RGB ではチャネルごとの線形補間になります。rgb(0, 113, 227) の 40% ティントは各チャネルを 255 へ向かって 4 割持ち上げ、40% シェードは 0 へ向かって 4 割下げます。ここでの段階は 20/40/60/80% で、基準色の上下に 5 段ずつ使える目盛りができます。",
            "この単純な混合は、Lab 系のカラーマネージドな混色(明度が変わっても知覚色相を一定に保つ狙い)とは意図的に同じではありません。単純な RGB 混合は高彩度の色の暗くなり方にわずかな偏りがありますが、これは多くのデザインシステムで受け入れられた既知の挙動で、階段は一度生成して目で確認します。",
            "ワークフローとしては、手でバリエーションを選ぶより同じソース値から毎回生成する方が勝ります。ホバー状態、無効ボタン、ダークモードの表面が再現可能になり、チームの誰でも暗記した 1 つの hex から同じセットを再生できます。計算はすべてブラウザ内でローカルに行われ、色はページの外へ出ません。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de colores",
      tagline: "Pegue un color en hex, rgb() o hsl() y obtenga los tres formatos más una fila de tonos y sombras lista para su sistema de diseño.",
      intro: [
        "Entréguele #0071e3, rgb(0, 113, 227) o hsl(211, 100%, 45%): el analizador detecta el formato solo y devuelve hex, RGB y HSL a la vez, cada uno copiable con un clic.",
        "Bajo los valores, una fila de tonos y sombras mezcla su color con blanco y negro en pasos del 20/40/60/80%: estados hover, bordes y variantes de modo oscuro al instante, sin abrir una herramienta de diseño.",
      ],
      steps: [
        "Pegue un color en cualquiera de los tres formatos: hex, rgb() u hsl().",
        "Lea los valores convertidos y copie el que necesite.",
        "Tome tonos y sombras de la fila de muestras inferior.",
      ],
      faqs: [
        {
          q: "¿Cómo se convierte HSL a RGB?",
          a: "Mediante la correspondencia cilíndrica estándar: cromacidad c = (1 − |2L − 1|) × S, un valor intermedio x fijado por el sector del tono y un desplazamiento m = L − c/2 en cada canal. Son las fórmulas de manual, así que los resultados coinciden con las herramientas de diseño.",
        },
        {
          q: "¿Por qué mi código de color aparece como no válido?",
          a: "Las formas aceptadas son #RGB / #RRGGBB, rgb(r, g, b) y hsl(h, s%, l%). Los canales deben estar en rango (0–255 para RGB, 0–360 para el tono, 0–100% para el resto) y separados por comas o espacios.",
        },
        {
          q: "¿Para qué sirven los tonos y sombras?",
          a: "Los tonos (mezclados con blanco) sirven para fondos hover, insignias y tarjetas; las sombras (mezcladas con negro) para estados pulsados, bordes y superficies oscuras. Derivar ambos de un único color de marca mantiene la UI coherente.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué la conversión RGB a HSL pierde información",
          paragraphs: [
            "Hex y RGB describen lo mismo — tres valores de canal — así que convertir entre ellos es simple contabilidad en base 16, sin pérdida en ningún sentido. HSL es distinto: es una re-descripción del color en coordenadas cilíndricas (tono como ángulo, saturación y luminosidad como porcentajes). El viaje hex → HSL → hex devuelve el mismo color, pero el trío HSL legible por humanos quedó cuantizado, y por eso dos colores sutilmente distintos pueden compartir el mismo tono HSL.",
            "El problema de fondo es perceptual. La luminosidad de HSL no es luminosidad perceptual: hsl(60, 100%, 50%) — amarillo puro — se ve mucho más brillante que hsl(240, 100%, 50%) — azul puro — aunque ambos afirman 50%. Quien genera paletas rotando el tono a luminosidad HSL fija obtiene colores con pesos visuales distintos. Este conversor reporta la matemática honesta y no pretende que la L de HSL sea lo que ve su ojo.",
            "Conclusión práctica: use HSL para lo que hace bien — ajustar un tono, construir una escala previsible alrededor de un color — y verifique contrastes con valores reales de luminancia, no con la cifra L. La fila de tonos y sombras aquí mezcla con blanco y negro en espacio RGB, lo que mantiene la escala coherente con cómo los navegadores componen colores.",
          ],
        },
        {
          heading: "OKLCH y los espacios perceptualmente uniformes: lo que este conversor no es",
          paragraphs: [
            "El CSS moderno admite OKLCH, un espacio perceptualmente uniforme donde moverse una distancia fija cambia el color percibido aproximadamente lo mismo en cualquier punto — amarillo y azul con la misma L se ven realmente igual de claros. Este conversor permanece deliberadamente en la tríada clásica sRGB de hex, RGB y HSL, porque es lo que los sistemas de diseño heredados, las guías de marca y los tokens de estilo siguen especificando.",
            "La diferencia importa sobre todo al generar paletas. En HSL, recorrer el círculo de tonos a L constante produce colores de intensidad percibida muy variable; en OKLCH el mismo recorrido da una rampa uniforme. Igualmente, la \"saturación 50%\" de HSL no significa la mitad del croma percibido. Si construye una escala de tokens nueva desde cero, conviene generarla en un espacio uniforme — pero traducir los hex de marca existentes cambia los números que su equipo ya memorizó.",
            "También queda fuera el color de gama amplia. Los valores aquí son sRGB, el espacio al que apuntan todos los navegadores y la mayoría de pantallas; las pantallas Display-P3 pueden mostrar verdes y rojos más saturados que sRGB. Un color elegido aquí se renderiza bien en todas partes pero deja esa gama extra sin usar: un valor por defecto seguro y compatible para UI.",
          ],
        },
        {
          heading: "Cómo se construyen realmente tonos y sombras",
          paragraphs: [
            "Un tono es el color mezclado con blanco y una sombra mezclada con negro, cada uno a fracciones fijas. En RGB es una interpolación lineal canal a canal: un tono al 40% de rgb(0, 113, 227) acerca cada canal un 40% hacia 255, y una sombra al 40% lo baja un 40% hacia 0. Los pasos aquí son 20/40/60/80%, cinco paradas utilizables por encima y por debajo del color base.",
            "Esta mezcla simple no pretende igualar la fusión gestionada en espacios basados en Lab, que busca mantener el tono percibido constante mientras cambia la luminosidad. La mezcla RGB oscurece los colores saturados de forma ligeramente desigual: comportamiento conocido y aceptado en la mayoría de sistemas de diseño, donde la escala se genera una vez y se revisa a ojo.",
            "En flujo de trabajo, generar la escala desde el mismo valor de origen siempre vence a elegir variantes a mano: estados hover, botones deshabilitados y superficies oscuras siguen siendo reproducibles, y cualquier miembro del equipo puede regenerar el mismo conjunto desde el hex que memorizó. Todo se calcula localmente en el navegador — el color nunca sale de la página.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de cores",
      tagline: "Cole uma cor em hex, rgb() ou hsl() e receba os três formatos mais uma fileira de tons e sombras pronta para o seu design system.",
      intro: [
        "Informe #0071e3, rgb(0, 113, 227) ou hsl(211, 100%, 45%) — o parser detecta o formato automaticamente e devolve hex, RGB e HSL de uma vez, cada um com cópia em um clique.",
        "Abaixo dos valores, uma fileira de tons e sombras mistura a cor com branco e preto em passos de 20/40/60/80%: estados hover, bordas e variantes de modo escuro na hora, sem abrir ferramenta de design.",
      ],
      steps: [
        "Cole uma cor em qualquer dos três formatos — hex, rgb() ou hsl().",
        "Veja os valores convertidos e copie o que precisar.",
        "Pegue tons e sombras na fileira de amostras abaixo.",
      ],
      faqs: [
        {
          q: "Como o HSL é convertido em RGB?",
          a: "Pelo mapeamento cilíndrico padrão: croma c = (1 − |2L − 1|) × S, um valor intermediário x definido pelo setor do matiz e um deslocamento m = L − c/2 em cada canal. São as fórmulas clássicas, então os resultados batem com as ferramentas de design.",
        },
        {
          q: "Por que meu código de cor aparece como inválido?",
          a: "As formas aceitas são #RGB / #RRGGBB, rgb(r, g, b) e hsl(h, s%, l%). Os canais devem estar no intervalo (0–255 para RGB, 0–360 para o matiz, 0–100% para o resto), separados por vírgula ou espaço.",
        },
        {
          q: "Para que servem tons e sombras?",
          a: "Tons (misturados com branco) servem para fundos hover, badges e cartões; sombras (misturadas com preto) para estados pressionados, bordas e superfícies escuras. Derivar tudo de uma cor de marca mantém a UI consistente.",
        },
      ],
      deepDive: [
        {
          heading: "Por que a conversão RGB para HSL perde informação",
          paragraphs: [
            "Hex e RGB descrevem a mesma coisa — três valores de canal — então converter entre eles é só contabilidade em base 16, sem perda em nenhum sentido. HSL é diferente: é uma redescrição da cor em coordenadas cilíndricas (matiz como ângulo, saturação e luminosidade como porcentagens). A ida e volta hex → HSL → hex devolve a mesma cor, mas o trio HSL legível por humanos foi quantizado, e é por isso que duas cores sutilmente diferentes podem compartilhar o mesmo matiz HSL.",
            "O problema mais profundo é perceptual. A luminosidade do HSL não é luminosidade perceptual: hsl(60, 100%, 50%) — amarelo puro — parece muito mais claro que hsl(240, 100%, 50%) — azul puro — embora ambos afirmem 50%. Quem gera paletas girando o matiz com luminosidade HSL fixa obtém cores com pesos visuais diferentes. Este conversor reporta a matemática honesta e não finge que o L do HSL é o que seu olho vê.",
            "Conclusão prática: use HSL para o que ele faz bem — ajustar um matiz, construir uma escala previsível em torno de uma cor — e verifique contraste com valores reais de luminância, não com o número L. A fileira de tons e sombras aqui mistura com branco e preto no espaço RGB, o que mantém a escala coerente com o modo como os navegadores compõem cores.",
          ],
        },
        {
          heading: "OKLCH e espaços perceptualmente uniformes: o que este conversor não é",
          paragraphs: [
            "O CSS moderno suporta OKLCH, um espaço perceptualmente uniforme em que mover uma distância fixa muda a cor percebida aproximadamente o mesmo em qualquer ponto — amarelo e azul com o mesmo L realmente parecem igual de claros. Este conversor fica deliberadamente na tríade clássica sRGB de hex, RGB e HSL, porque é o que sistemas de design antigos, guias de marca e tokens de estilo ainda especificam.",
            "A diferença importa sobretudo na geração de paletas. No HSL, percorrer o círculo de matiz com L constante produz cores de intensidade percebida muito variável; no OKLCH o mesmo caminho produz uma rampa uniforme. Da mesma forma, \"saturação 50%\" no HSL não significa metade do croma percebido. Se você vai construir uma escala de tokens nova do zero, vale gerá-la num espaço uniforme — mas traduzir os hex de marca existentes muda os números que seu time já memorizou.",
            "Também fica fora o modelo a cor de gama larga. Os valores aqui são sRGB, o espaço que todos os navegadores e a maioria das telas alvejam; telas Display-P3 podem mostrar verdes e vermelhos mais saturados que o sRGB. Uma cor escolhida aqui renderiza corretamente em todo lugar, mas deixa a gama extra sem uso — um padrão seguro e compatível para trabalho de UI.",
          ],
        },
        {
          heading: "Como tons e sombras são realmente construídos",
          paragraphs: [
            "Um tom é a cor misturada com branco e uma sombra misturada com preto, cada um em frações fixas. Em RGB é uma interpolação linear canal a canal: um tom a 40% de rgb(0, 113, 227) aproxima cada canal 40% do caminho até 255, e uma sombra a 40% abaixa cada um 40% em direção a 0. Os passos aqui são 20/40/60/80%, cinco pontos usáveis acima e abaixo da cor base.",
            "Essa mistura simples intencionalmente não equivale à mistura gerenciada em espaços baseados em Lab, que tenta manter o matiz percebido constante enquanto a luminosidade muda. Misturar em RGB escurece cores saturadas de forma levemente desigual — comportamento conhecido e aceito na maioria dos design systems, em que a escala é gerada uma vez e conferida a olho.",
            "No fluxo de trabalho, gerar a escala sempre do mesmo valor de origem vence escolher variantes à mão: estados hover, botões desabilitados e superfícies escuras continuam reproduzíveis, e qualquer pessoa do time regenera o mesmo conjunto a partir do hex que memorizou. Tudo calcula localmente no navegador — a cor nunca sai da página.",
          ],
        },
      ],
    },
  },
});
