import { CalcEngineContrast } from "../_engines/calc-engine-contrast";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "contrast-checker",
  category: "utility",
  icon: "palette",
  engine: { component: CalcEngineContrast },
  related: ["color-converter", "color-picker", "grade-calculator", "gradient-generator"],
  copy: {
    en: {
      name: "Contrast Checker",
      tagline:
        "Check the WCAG contrast ratio between two colors with AA and AAA pass/fail for normal and large text, plus a live preview. Runs entirely in your browser.",
      intro: [
        "Enter a foreground and a background color — hex like #333 or #1F2937, or rgb()/rgba() — and get the WCAG contrast ratio to two decimals, with immediate pass/fail badges for the four thresholds that matter: AA and AAA, for normal and large text. A live preview shows both a body-text and a large-text sample in the actual colors.",
        "The math is the official WCAG 2.x relative-luminance formula — the same one the W3C checker uses — so a 4.5 here is a 4.5 everywhere. Presets include a borderline 4.54:1 gray pair so you can see how tight the AA line really is.",
      
        "The math is the WCAG 2.x relative-luminance formula: linearize each sRGB channel, weight by 0.2126 / 0.7152 / 0.0722, then compute (L1 + 0.05) / (L2 + 0.05). The result is a ratio — 4.5:1 is the AA threshold for normal text, 3:1 for large text — and a 4.5 here passes the same test in every WCAG checker on the web.",
        "Compared with eyeballing a color pair or trusting a design tool's contrast hint, the numeric ratio is the standard auditors and accessibility requirements actually cite. The live preview shows both body and large text in the actual colors, and the presets include the borderline 4.54:1 pair so you can see how tight the AA line really is — useful when tweaking a palette that is 'almost passing'.",
      ],
      steps: [
        "Type a hex or rgb() value, or use the color picker, for the foreground.",
        "Do the same for the background color.",
        "Read the ratio and the AA / AAA badges, or tap a preset pair.",
        "Check the preview block to judge the pairing with your own eyes.",
      ],
      faqs: [
        {
          q: "What contrast ratio do I need to pass?",
          a: "WCAG 2.x: normal body text needs 4.5:1 for AA and 7:1 for AAA. Large text — at least 24 px, or 18.7 px bold — needs 3:1 for AA and 4.5:1 for AAA. UI components and graphical objects need 3:1.",
        },
        {
          q: "How is the ratio calculated?",
          a: "Each color is linearized from sRGB and combined into a relative luminance L = 0.2126·R + 0.7152·G + 0.0722·B; the ratio is (L lighter + 0.05) / (L darker + 0.05). That is the exact formula from the WCAG 2.x specification, matching the W3C's own checker.",
        },
        {
          q: "What about semi-transparent colors?",
          a: "An rgba() alpha below 1 is flattened onto white before the ratio is computed. WCAG itself has no alpha concept — composite the color over its real background first, or enter the resulting opaque color, for authoritative numbers.",
        },
      ],
      deepDive: [
        {
          heading: "What 4.5:1 and 3:1 actually mean",
          paragraphs: [
            "The contrast ratio is a luminance comparison defined by WCAG: measure the relative luminance of foreground and background, add a small offset to each, and divide the lighter by the darker. The result ranges from 1:1 (identical colors) to 21:1 (black on white). The formula comes from the way human eyes perceive brightness non-linearly, which is why the calculation converts colors to linear luminance rather than comparing raw channel values — two grays that \"look close\" in the picker may differ measurably in luminance.",
            "WCAG 2.x sets two thresholds. AA level: 4.5:1 for normal body text, 3:1 for large text — defined as 18pt (24px) regular or 14pt (roughly 18.5px) bold and larger. AAA level raises the bar to 7:1 for normal text and 4.5:1 for large. Graphical objects and UI component boundaries (icons, input borders) also fall under the 3:1 requirement in WCAG 2.1.",
            "The thresholds are floors, not design targets. A site can pass at 4.5:1 while still being hard to read in sunlight or on cheap displays; most legibility research supports aiming well above the minimum for body text.",
          ],
        },
        {
          heading: "Common ways designers misjudge contrast",
          paragraphs: [
            "The classic failure is colored text on tinted backgrounds: a mid-gray on a pastel can measure below 4.5:1 even though both colors feel \"soft\". The eye compensates; the math does not. Second is assuming dark mode solves contrast — dark gray text on dark gray backgrounds fails by exactly the same formula, just inverted.",
            "Text over images is the recurring trap: the contrast against one pixel of the photo may pass while another pixel fails. The practical solution is a scrim (overlay layer) or a solid pill behind the text, then re-check the effective background color — the tool accepts any two colors, so test the worst-case background pixel.",
            "Opacity is invisible math: a black text at 60% opacity on white is not \"black-ish\", it is a computed blend — roughly a mid-gray — and the ratio should be checked on the blended result, not the source color.",
          ],
        },
        {
          heading: "Compute locally, iterate instantly",
          paragraphs: [
            "The ratio is calculated in your browser on every color change — no API, no round trip. Paste hex values from your design system, or adjust live, and the pass/fail badges update per keystroke.",
            "Everything is local, which matters because design colors are often confidential before launch: unreleased palettes and brand explorations never leave the page. Refresh and the inputs clear.",
            "Pair it with the gradient generator when checking text placed over gradients — sample the lightest point of the gradient as the background and test against that, since contrast guarantees only apply to the worst case, not the average.",
          ],
        },
      ],
    },
    zh: {
      name: "对比度检查器",
      tagline:
        "计算两个颜色的 WCAG 对比度,并给出正文 / 大字在 AA、AAA 档位的通过徽章,附实时预览。全部在浏览器本地完成,数据不出设备。",
      intro: [
        "输入前景色和背景色——#333、#1F2937 这样的 hex,或 rgb()/rgba()——即可得到保留两位小数的 WCAG 对比度,并立刻看到四个关键档位的通过 / 不通过徽章:AA 与 AAA,分别对应正文和大字。预览区会用真实颜色渲染一段正文和大字示例。",
        "计算用的是 WCAG 2.x 官方相对亮度公式,与 W3C 官方检查器一致——这里的 4.5 放到哪都是 4.5。预设里有一个 4.54:1 的压线灰白组合,让你直观感受 AA 及格线有多紧。",
      ],
      steps: [
        "为前景色输入 hex 或 rgb() 值,或使用取色器。",
        "同样设置背景色。",
        "查看对比度与 AA / AAA 徽章,或点一个预设组合。",
        "看一眼预览块,用肉眼确认这对配色。",
      ],
      faqs: [
        {
          q: "对比度多少才算合格?",
          a: "WCAG 2.x 规定:正文 AA 需要 4.5:1,AAA 需要 7:1;大字(≥ 24px,或 ≥ 18.7px 粗体)AA 需要 3:1,AAA 需要 4.5:1。UI 组件和图形元素需要 3:1。",
        },
        {
          q: "对比度是怎么算出来的?",
          a: "先把 sRGB 通道线性化,再合成相对亮度 L = 0.2126·R + 0.7152·G + 0.0722·B;对比度 = (较亮 L + 0.05) / (较暗 L + 0.05)。这正是 WCAG 2.x 规范原文公式,与 W3C 官方检查器结果一致。",
        },
        {
          q: "半透明颜色怎么处理?",
          a: "alpha 小于 1 的 rgba() 会先压平到白底再计算。WCAG 本身没有透明度概念——想要权威数值,请先把颜色合成到真实背景上,或直接输入合成后的不透明颜色。",
        },
      ],
      deepDive: [
        {
          heading: "4.5:1 和 3:1 到底在量什么",
          paragraphs: [
            "对比度是 WCAG 定义的亮度比值:测出前景与背景的相对亮度,各自加上一个小偏移量,再以较亮者除以较暗者。结果范围从 1:1(完全相同)到 21:1(白底黑字)。公式源于人眼对亮度的非线性感知——这也是为什么计算要把颜色换算到线性亮度,而不是直接比较通道值:取色器里“看起来差不多”的两个灰,在亮度上可以有可测量的差别。",
            "WCAG 2.x 设了两档阈值。AA 级:正文 4.5:1,大字号 3:1——大字号定义为 18pt(24px)常规体,或 14pt(约 18.5px)粗体及以上。AAA 级提到正文 7:1、大字号 4.5:1。图形对象与 UI 组件边界(图标、输入框描边)在 WCAG 2.1 里同样适用 3:1。",
            "阈值是底线,不是设计目标。一个 4.5:1 勉强达标的站点,在阳光下或廉价屏幕上照样难读;可读性研究大多支持正文远高于最低值。",
          ],
        },
        {
          heading: "设计师误判对比度的常见方式",
          paragraphs: [
            "经典翻车是彩色文字配淡彩背景:中间调灰色放在淡粉上,可能低于 4.5:1,尽管两个颜色“都很柔和”。眼睛会代偿,数学不会。第二是以为深色模式自动解决对比度——深灰文字配深灰背景,按同一条公式照样不及格,只是方向反了。",
            "文字压图是反复出现的陷阱:照片某个像素下对比度达标,另一个像素不达标。务实解法是加暗角遮罩或给文字垫一块纯色胶囊,然后重新校验有效背景色——工具接受任意两个颜色,拿最差的背景像素来测。",
            "透明度是看不见的数学:白底上 60% 不透明度的黑字不是“偏黑”,而是一个算出来的混合色——大致是中间灰——比率应按混合结果校验,而不是按原始颜色。",
          ],
        },
        {
          heading: "本地计算,即时迭代",
          paragraphs: [
            "比值在浏览器里随颜色变化即时计算——无 API、无往返。把设计系统的 hex 值粘进来,或者现场调整,通过/不通过的徽标随击键刷新。",
            "全程本地,这在配色尚未发布时很关键:未公开的色板和品牌探索不会离开页面。刷新即清空。",
            "检查放在渐变上的文字时,配合本站渐变生成器使用:取渐变最亮的一点作为背景来测——对比度保证只对最坏情况负责,不对平均值。",
          ],
        },
      ],
    },
    ja: {
      name: "コントラストチェッカー",
      tagline:
        "2 色の WCAG コントラスト比を算出し、通常文字 / 拡大文字ごとの AA・AAA 合否をバッジで表示。プレビュー付きで、処理はすべてブラウザ内です。",
      intro: [
        "前景色と背景色(#333 や #1F2937 のような HEX、rgb()/rgba() も可)を入力すると、小数第 2 位までの WCAG コントラスト比と、重要な 4 つのしきい値(AA と AAA、通常文字と拡大文字)の合否バッジがすぐ出ます。プレビューでは実際の色で本文と大きめの文字サンプルを確認できます。",
        "計算は WCAG 2.x 公式の相対輝度の式で、W3C のチェッカーと同じものです — ここの 4.5 はどこでも 4.5 です。プリセットには 4.54:1 のぎりぎりのグレー×白の組み合わせがあり、AA のラインがどれだけ厳しいか体感できます。",
      ],
      steps: [
        "前景色に HEX か rgb() を入力するか、カラーピッカーで選びます。",
        "同じく背景色を設定します。",
        "コントラスト比と AA / AAA バッジを確認するか、プリセットをタップします。",
        "プレビューで実際の見え方を自分の目で確かめます。",
      ],
      faqs: [
        {
          q: "合格に必要なコントラスト比は?",
          a: "WCAG 2.x では通常の本文は AA で 4.5:1、AAA で 7:1。大きめの文字(24px 以上、または 18.7px 以上の太字)は AA で 3:1、AAA で 4.5:1 です。UI 部品や図形は 3:1 が基準です。",
        },
        {
          q: "コントラスト比はどう計算していますか?",
          a: "sRGB チャンネルを線形化して相対輝度 L = 0.2126·R + 0.7152·G + 0.0722·B を求め、比 = (明るい方の L + 0.05) / (暗い方の L + 0.05) とします。WCAG 2.x 仕様書の式そのもので、W3C の公式チェッカーと一致します。",
        },
        {
          q: "半透明の色はどう扱われますか?",
          a: "alpha が 1 未満の rgba() は白にフラット化してから計算します。WCAG 自体に透明度の概念はないため、正式な数値が必要なら実際の背景に合成した不透明色を入力してください。",
        },
      ],
      deepDive: [
        {
          heading: "4.5:1 と 3:1 は何を測っているのか",
          paragraphs: [
            "コントラスト比は WCAG が定義する輝度の比です。前景と背景の相対輝度を測り、それぞれ小さなオフセットを加え、明るい方を暗い方で割ります。結果は 1:1(同一色)から 21:1(白地に黒)まで。式は人間の目の明るさ知覚が非線形であることに由来し、だからこそ計算は色を線形輝度へ変換します。チャンネル値の生の比較ではありません。ピッカーで「似て見える」2 つのグレーが、輝度では測定可能な差を持つことがあります。",
            "WCAG 2.x は 2 つの閾値を設けます。AA レベルは本文 4.5:1、大きな文字 3:1——大きな文字は 18pt(24px)の通常、または 14pt(約 18.5px)の太字以上。AAA レベルは本文 7:1、大きな文字 4.5:1 です。図形オブジェクトと UI コンポーネントの境界(アイコン、入力欄のボーダー)も WCAG 2.1 の 3:1 の対象です。",
            "閾値は下限であって設計目標ではありません。4.5:1 でギリギリ合格したサイトも、日差しの下や安価なディスプレイでは読みにくいままです。可読性研究の多くは、本文を最低値より十分上に置くことを支持しています。",
          ],
        },
        {
          heading: "デザイナーがコントラストを誤る定番",
          paragraphs: [
            "定番の失敗は、着色テキスト × 淡い着色背景です。ミッドグレーを淡い色の上に置くと、両方「柔らかい」のに 4.5:1 を下回ることがあります。目は補償し、数式はしません。2 つ目は、ダークモードがコントラストを解決するという思い込みです。暗いグレー × 暗いグレーは、同じ式で同じように落ちます。向きが逆なだけです。",
            "画像の上のテキストは繰り返し出る罠です。写真の 1 ピクセルに対しては合格し、別のピクセルでは落ちます。実務解はスクリム(重ねレイヤー)かテキストの下のソリッドのピルで、その上で実効背景色を再確認します。このツールは任意の 2 色を受け付けるので、最悪の背景ピクセルで試してください。",
            "不透明度は見えない数学です。白地の 60% 不透明度の黒は「黒っぽい」のではなく計算された混合色——だいたいのミッドグレー——で、比は元の色ではなく混合結果で確認すべきです。",
          ],
        },
        {
          heading: "ローカル計算、即時反復",
          paragraphs: [
            "比は色が変わるたびブラウザ内で計算されます。API も往復もなし。デザインシステムの hex を貼るなり、その場で調整するなりすれば、合格/不合格のバッジはキー入力ごとに更新されます。",
            "すべてローカルです。ローンチ前のデザインカラーはしばしば機密であり、未公開のパレットやブランドの模索はページを離れません。更新すれば入力は空になります。",
            "グラデーションの上のテキストを確認するときは、このサイトのグラデーションジェネレーターと組ませます。グラデーションの最も明るい点を背景として試してください。コントラストの保証は平均ではなく最悪のケースにのみ適用されるからです。",
          ],
        },
      ],
    },
    es: {
      name: "Comprobador de contraste",
      tagline:
        "Calcula la relación de contraste WCAG entre dos colores con distintivos AA y AAA para texto normal y grande, y vista previa en vivo. Todo en tu navegador.",
      intro: [
        "Introduce un color de primer plano y otro de fondo — hex como #333 o #1F2937, o rgb()/rgba() — y obtén la relación de contraste WCAG con dos decimales, con distintivos inmediatos de aprueba / no aprueba para los cuatro umbrales que importan: AA y AAA, para texto normal y grande. Una vista previa en vivo muestra texto de cuerpo y texto grande con los colores reales.",
        "El cálculo usa la fórmula oficial de luminancia relativa de WCAG 2.x — la misma del comprobador del W3C — así que un 4.5 aquí es un 4.5 en todas partes. Entre los ajustes hay un par gris de 4.54:1 justo en el límite para que veas lo ajustada que es la barra del AA.",
      ],
      steps: [
        "Escribe un valor hex o rgb(), o usa el selector, para el primer plano.",
        "Haz lo mismo con el color de fondo.",
        "Lee la relación y los distintivos AA / AAA, o toca un par predefinido.",
        "Mira el bloque de vista previa para juzgar la combinación con tus ojos.",
      ],
      faqs: [
        {
          q: "¿Qué relación de contraste necesito para aprobar?",
          a: "WCAG 2.x: el texto normal necesita 4.5:1 para AA y 7:1 para AAA. El texto grande — 24 px o más, o 18.7 px en negrita — necesita 3:1 para AA y 4.5:1 para AAA. Los componentes de interfaz y los gráficos necesitan 3:1.",
        },
        {
          q: "¿Cómo se calcula la relación?",
          a: "Cada color se linealiza desde sRGB y se combina en una luminancia relativa L = 0.2126·R + 0.7152·G + 0.0722·B; la relación es (L claro + 0.05) / (L oscuro + 0.05). Es la fórmula exacta de la especificación WCAG 2.x, idéntica a la del comprobador oficial del W3C.",
        },
        {
          q: "¿Y los colores semitransparentes?",
          a: "Un alfa rgba() menor que 1 se aplana sobre blanco antes de calcular. WCAG no tiene concepto de transparencia — compón el color sobre su fondo real o introduce el color opaco resultante para obtener cifras autorizadas.",
        },
      ],
      deepDive: [
        {
          heading: "Qué significan de verdad 4.5:1 y 3:1",
          paragraphs: [
            "La relación de contraste es una comparación de luminancia definida por WCAG: mide la luminancia relativa de primer plano y fondo, suma un pequeño desplazamiento a cada uno y divide el más claro por el más oscuro. El resultado va de 1:1 (colores idénticos) a 21:1 (negro sobre blanco). La fórmula viene de la percepción no lineal del brillo por el ojo humano, y por eso el cálculo convierte los colores a luminancia lineal en lugar de comparar valores de canal crudos — dos grises que \"se ven parecidos\" en el selector pueden diferir de forma medible en luminancia.",
            "WCAG 2.x fija dos umbrales. Nivel AA: 4.5:1 para texto normal, 3:1 para texto grande — definido como 18pt (24px) regular o 14pt (unos 18,5px) en negrita o mayor. El nivel AAA sube a 7:1 para texto normal y 4.5:1 para texto grande. Los objetos gráficos y los límites de componentes de UI (iconos, bordes de entrada) también caen bajo el 3:1 en WCAG 2.1.",
            "Los umbrales son suelos, no objetivos de diseño. Un sitio puede pasar a 4.5:1 y seguir siendo difícil de leer al sol o en pantallas baratas; la mayoría de la investigación de legibilidad apunta bien por encima del mínimo para el texto de cuerpo.",
          ],
        },
        {
          heading: "Cómo se equivocan los diseñadores al juzgar contraste",
          paragraphs: [
            "El fallo clásico es texto de color sobre fondo tintado: un gris medio sobre un pastel puede medir por debajo de 4.5:1 aunque ambos colores parezcan \"suaves\". El ojo compensa; la matemática no. Segundo: asumir que el modo oscuro arregla el contraste — texto gris oscuro sobre fondo gris oscuro falla por la misma fórmula, solo que invertida.",
            "Texto sobre imagen es la trampa recurrente: el contraste contra un píxel de la foto puede pasar mientras otro falla. La solución práctica es un scrim (capa superpuesta) o una pastilla sólida tras el texto, y luego re-verificar el color de fondo efectivo — la herramienta acepta dos colores cualesquiera, así que prueba el píxel de fondo en el peor caso.",
            "La opacidad es matemática invisible: un texto negro al 60% de opacidad sobre blanco no es \"algo negruzco\", es una mezcla calculada — aproximadamente un gris medio — y la relación debe comprobarse sobre el resultado mezclado, no sobre el color de origen.",
          ],
        },
        {
          heading: "Calcular en local, iterar al instante",
          paragraphs: [
            "La relación se calcula en tu navegador con cada cambio de color — sin API, sin viaje de ida y vuelta. Pega los hex de tu sistema de diseño, o ajusta en vivo, y las insignias de aprobado/suspenso se actualizan por pulsación.",
            "Todo es local, lo que importa porque los colores del diseño suelen ser confidenciales antes del lanzamiento: paletas no anunciadas y exploraciones de marca nunca salen de la página. Recarga y los campos se vacían.",
            "Combínalo con el generador de gradientes al revisar texto colocado sobre gradientes — toma el punto más claro del gradiente como fondo y prueba contra él, ya que las garantías de contraste aplican al peor caso, no a la media.",
          ],
        },
      ],
    },
    pt: {
      name: "Verificador de contraste",
      tagline:
        "Calcule a taxa de contraste WCAG entre duas cores com selos AA e AAA para texto normal e grande, além de pré-visualização ao vivo. Tudo no navegador.",
      intro: [
        "Informe uma cor de texto e uma de fundo — hex como #333 ou #1F2937, ou rgb()/rgba() — e receba a taxa de contraste WCAG com duas casas decimais, com selos imediatos de passa / não passa para os quatro limites que importam: AA e AAA, para texto normal e grande. Uma pré-visualização ao vivo mostra texto de corpo e texto grande nas cores reais.",
        "O cálculo usa a fórmula oficial de luminância relativa do WCAG 2.x — a mesma do verificador do W3C — então um 4.5 aqui é 4.5 em qualquer lugar. Os presets incluem um par cinza de 4.54:1 bem na linha para você sentir o quanto o limite do AA é apertado.",
      ],
      steps: [
        "Digite um valor hex ou rgb(), ou use o seletor, para a cor do texto.",
        "Faça o mesmo para a cor de fundo.",
        "Leia a taxa e os selos AA / AAA, ou toque em um par predefinido.",
        "Confira o bloco de pré-visualização para julgar a combinação com os próprios olhos.",
      ],
      faqs: [
        {
          q: "Qual taxa de contraste eu preciso para passar?",
          a: "WCAG 2.x: texto normal precisa de 4.5:1 para AA e 7:1 para AAA. Texto grande — pelo menos 24 px, ou 18.7 px em negrito — precisa de 3:1 para AA e 4.5:1 para AAA. Componentes de interface e elementos gráficos precisam de 3:1.",
        },
        {
          q: "Como a taxa é calculada?",
          a: "Cada cor é linearizada do sRGB e combinada em uma luminância relativa L = 0.2126·R + 0.7152·G + 0.0722·B; a taxa é (L mais claro + 0.05) / (L mais escuro + 0.05). É a fórmula exata da especificação WCAG 2.x, idêntica à do verificador oficial do W3C.",
        },
        {
          q: "E cores semitransparentes?",
          a: "Um alfa rgba() abaixo de 1 é achatado sobre o branco antes do cálculo. O WCAG não tem conceito de transparência — componha a cor sobre o fundo real primeiro, ou informe a cor opaca resultante, para números oficiais.",
        },
      ],
      deepDive: [
        {
          heading: "O que 4.5:1 e 3:1 realmente medem",
          paragraphs: [
            "A razão de contraste é uma comparação de luminância definida pelo WCAG: mede a luminância relativa de primeiro plano e fundo, soma um pequeno deslocamento a cada um e divide o mais claro pelo mais escuro. O resultado vai de 1:1 (cores idênticas) a 21:1 (preto no branco). A fórmula vem da percepção não linear de brilho pelo olho humano, e por isso o cálculo converte as cores para luminância linear em vez de comparar valores de canal crus — dois cinzas que \"parecem próximos\" no seletor podem diferir de forma mensurável em luminância.",
            "O WCAG 2.x define dois limiares. Nível AA: 4.5:1 para texto normal, 3:1 para texto grande — definido como 18pt (24px) regular ou 14pt (cerca de 18,5px) em negrito ou maior. O nível AAA sobe para 7:1 no texto normal e 4.5:1 no grande. Objetos gráficos e fronteiras de componentes de UI (ícones, bordas de input) também caem sob o 3:1 no WCAG 2.1.",
            "Os limiares são pisos, não metas de design. Um site pode passar com 4.5:1 e continuar difícil de ler no sol ou em telas ruins; a maioria das pesquisas de legibilidade aponta bem acima do mínimo para texto corrido.",
          ],
        },
        {
          heading: "Como designers erram ao julgar contraste",
          paragraphs: [
            "A falha clássica é texto colorido sobre fundo tingido: um cinza médio sobre um pastel pode medir abaixo de 4.5:1 embora as duas cores pareçam \"suaves\". O olho compensa; a matemática não. Segundo: presumir que o modo escuro resolve o contraste — texto cinza-escuro sobre fundo cinza-escuro falha pela mesma fórmula, só que invertida.",
            "Texto sobre imagem é a armadilha recorrente: o contraste contra um pixel da foto pode passar enquanto outro falha. A solução prática é um scrim (camada sobreposta) ou uma pílula sólida atrás do texto, e depois re-verificar a cor de fundo efetiva — a ferramenta aceita duas cores quaisquer, então teste o pixel de fundo no pior caso.",
            "Opacidade é matemática invisível: texto preto a 60% de opacidade sobre branco não é \"preto-avermelhado de leve\", é uma mistura calculada — aproximadamente um cinza médio — e a razão deve ser conferida sobre o resultado misturado, não sobre a cor de origem.",
          ],
        },
        {
          heading: "Calcular localmente, iterar na hora",
          paragraphs: [
            "A razão é calculada no seu navegador a cada mudança de cor — sem API, sem ida e volta. Cole os hex do seu design system, ou ajuste ao vivo, e os selos de aprovado/reprovado atualizam a cada tecla.",
            "Tudo é local, o que importa porque cores de design costumam ser confidenciais antes do lançamento: paletas não anunciadas e explorações de marca nunca saem da página. Recarregue e os campos se esvaziam.",
            "Combine com o gerador de gradientes ao revisar texto colocado sobre gradientes — pegue o ponto mais claro do gradiente como fundo e teste contra ele, já que garantias de contraste se aplicam ao pior caso, não à média.",
          ],
        },
      ],
    },
  },
});
