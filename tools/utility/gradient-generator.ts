import { CalcEngineGradient } from "../_engines/calc-engine-gradient";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "gradient-generator",
  category: "utility",
  icon: "palette",
  engine: { component: CalcEngineGradient },
  related: ["contrast-checker", "color-converter", "color-picker", "image-border", "grade-calculator"],
  copy: {
    en: {
      name: "CSS Gradient Generator",
      tagline:
        "Blend two to five colors into linear, radial or conic CSS gradients with a live preview, ready-to-paste code and one-click harmonized palettes.",
      intro: [
        "Pick two to five colors, choose linear, radial or conic, and drag the angle — the preview updates as you type and the CSS is always one copy away. Leave a stop's position blank and it is placed automatically the way CSS would, or set exact percentages for hard stops and off-center blends.",
        "The output ships as a real production block: a solid-color fallback line for ancient browsers, a -webkit- prefixed line for old WebKit builds, and the standard syntax last. A random-harmonize button rotates the hues of your palette in HSL space so every shuffle stays balanced instead of clashing.",
      
        "Color stops are positioned the way CSS resolves them: a stop with no position auto-places midway between its neighbors, and explicit percentages create hard stops — the technique behind 'stripes' effects. Linear, radial and conic all share the same stop list; the angle control maps to deg values for linear and the start position for conic.",
        "Compared with writing gradient syntax by hand (which means re-checking vendor prefixes and comma positions), the tool emits a production-ready block: a solid fallback color, the -webkit- prefixed line for legacy WebKit, and the standard syntax last. The random-harmonize shuffle rotates hue in HSL space, so each shuffle stays in the same tonal family instead of producing clashes.",
      ],
      steps: [
        "Set two to five colors, or start from a preset palette.",
        "Choose the gradient type, then set the angle or shape; optionally pin stop positions.",
        "Copy the CSS block and paste it into your stylesheet.",
      ],
      faqs: [
        {
          q: "Why does the CSS include a -webkit- prefixed line?",
          a: "It is a compatibility line for legacy WebKit browsers (roughly Safari 5–6 era) that only understood -webkit-linear-gradient. Every browser from the last decade reads the standard line, so you can delete the prefixed one if you do not need to support those versions — it costs one line to keep and nothing if you drop it.",
        },
        {
          q: "What does the angle in a linear gradient mean?",
          a: "It is the direction the gradient travels, measured clockwise from pointing up: 0deg goes bottom-to-top, 90deg left-to-right, 180deg top-to-bottom. The tool normalizes any angle you give (−45 becomes 315) and the old syntax's opposite-direction convention is handled for you in the -webkit- line.",
        },
        {
          q: "When should I use a conic gradient instead of linear or radial?",
          a: "Conic sweeps color around a center point — that is what pie charts, angle dials and sunburst effects are made of. Linear blends along a straight line and radial radiates from a center outward. Same stops, completely different geometry, so switch type and watch the preview rather than guessing.",
        },
      ],
      deepDive: [
        {
          heading: "Angles, directions and the axis of a gradient",
          paragraphs: [
            "In CSS, a linear gradient's angle describes the direction the colors travel toward, measured from a line pointing up: 0deg goes bottom-to-top, 90deg goes left-to-right, 180deg goes top-to-bottom. The opposite direction needs the angle plus 180, which is the number one mental slip in gradient work — a sunset that should fade upward but fades sideways is usually an angle off by 90 degrees.",
            "Color stops are positions along that axis, in percentages or lengths. The default even distribution is often wrong for design purposes: placing a stop early (e.g. color at 20%) holds that color longer, while a stop's position marks where the color is fully reached. A \"hard stop\" — two stops at the same position — produces a sharp edge instead of a blend, the technique behind crisp stripes and segmented bars built entirely from gradients.",
            "Two-stop gradients interpolate in sRGB by default, which can produce a muddy middle: blending yellow to blue passes through desaturated gray rather than through green. Designers who care route around this with a third mid-stop in the hue they want, or by picking endpoints closer in hue.",
          ],
        },
        {
          heading: "Reading and writing gradient syntax",
          paragraphs: [
            "The CSS output maps directly to a linear-gradient declaration: linear-gradient(90deg, #ff0000 0%, #0000ff 100%). Radial gradients replace the angle with a shape and position — circle or ellipse, centered or anchored at a corner — useful for spotlights, vignettes and soft glows.",
            "Common debugging failures: forgetting the deg unit (bare numbers are invalid), using commas where the browser expects spaces inside color functions, and nesting the gradient as background-image while a background-color sits behind it — the color only shows through where the gradient has transparency.",
            "Performance note that rarely matters but occasionally does: gradients render on the GPU and are cheap, but animating the stop positions forces repaints. Animating opacity or transform of an overlaid element is the smooth path.",
          ],
        },
        {
          heading: "Visual feedback, zero upload",
          paragraphs: [
            "The preview renders live as you move stops and change colors, and the CSS is copy-ready — paste into any stylesheet with no cleanup. Everything computes and renders in your browser; the tool works offline and stores nothing.",
            "Contrast discipline applies here: text over a gradient must be checked against the gradient's lightest stop, not its average, using the contrast checker. A gradient that looks great with no text on it can fail legibility the moment a heading lands on its bright end.",
            "For quick exploration, start from two endpoints close in hue and increase separation gradually — most \"muddy gradient\" complaints are endpoints from opposite sides of the color wheel, not a broken generator.",
          ],
        },
      ],
    },
    zh: {
      name: "CSS 渐变生成器",
      tagline:
        "把 2–5 个颜色混合成线性、径向或锥形 CSS 渐变:实时预览、即贴即用的代码,还有一键随机和谐配色。",
      intro: [
        "选 2 到 5 个颜色,切换线性、径向或锥形,拖动角度——预览随输入实时更新,CSS 永远一键可复制。色标位置留空时按 CSS 规则自动布置;填上精确百分比就能做出硬分隔和偏心混合。",
        "输出的是真正的生产级代码块:给上古浏览器准备的纯色回退行、给老 WebKit 内核准备的 -webkit- 前缀行,最后是标准语法。随机和谐按钮会在 HSL 空间旋转整组色相,每次洗牌都保持协调,不会变得刺眼。",
      ],
      steps: [
        "设置 2–5 个颜色,或从预设配色开始。",
        "选择渐变类型,再调角度或形状;需要时固定色标位置。",
        "复制 CSS 代码块,粘贴进样式表。",
      ],
      faqs: [
        {
          q: "CSS 里为什么带一行 -webkit- 前缀?",
          a: "这是给老 WebKit 内核(大约 Safari 5–6 时代)准备的兼容行,它们只认 -webkit-linear-gradient。近十年的浏览器都读标准行;如果不需要照顾那些老版本,直接删掉前缀行即可——留着只多一行,删掉也没损失。",
        },
        {
          q: "线性渐变的角度是什么意思?",
          a: "角度表示渐变行进的方向,从正上方起顺时针计量:0deg 自下而上,90deg 从左到右,180deg 自上而下。工具会把你输入的任意角度归一化(−45 变 315),-webkit- 行里老语法的方向相反问题也已代你处理。",
        },
        {
          q: "什么时候用锥形渐变而不是线性或径向?",
          a: "锥形渐变围绕中心点扫过颜色——饼图、角度表盘、日冕效果都是它做的。线性沿直线混合,径向从中心向外扩散。同样的色标,几何完全不同,直接切换类型看预览,不用猜。",
        },
      ],
      deepDive: [
        {
          heading: "渐变的角度、方向与轴向",
          paragraphs: [
            "CSS 里,linear-gradient 的角度描述颜色前进的方向,从竖直向上的线量起:0deg 自下而上,90deg 从左到右,180deg 自上而下。反向需要角度加 180——这是渐变工作里最常见的心算手滑:该向上淡出的落日渐变横向淡出了,多半是角度差了 90 度。",
            "色标是轴向上的位置,用百分比或长度表示。默认的均匀分布往往不合设计意图:色标放得靠前(比如 20%)会让该颜色持续更久;色标的位置标记的是颜色完全到达的位置。“硬色标”——两个色标放同一位置——产生锐利边缘而不是过渡,这是纯用渐变做清晰条纹和分段条的技术。",
            "双端渐变默认在 sRGB 里插值,中间可能发闷:黄到蓝的过渡会穿过去饱和的灰,而不是经过绿。在意的设计师用想要的色相加第三个中间色标绕开,或者选色相更接近的两端。",
          ],
        },
        {
          heading: "读和写渐变语法",
          paragraphs: [
            "CSS 输出直接对应 linear-gradient 声明:linear-gradient(90deg, #ff0000 0%, #0000ff 100%)。径向渐变用形状和位置替代角度——圆或椭圆、居中或锚定在角上——适合聚光、暗角和柔光。",
            "常见调试失败:忘写 deg 单位(裸数字无效)、在颜色函数内该用空格的地方写了逗号、把渐变设为 background-image 而底下还有 background-color——颜色只在渐变透明的地方透出来。",
            "一条很少出问题但偶尔出问题的性能注记:渐变在 GPU 上渲染、很便宜,但动画改色标位置会强制重绘。对叠加元素动 opacity 或 transform 才是顺滑路径。",
          ],
        },
        {
          heading: "可视化反馈,零上传",
          paragraphs: [
            "拖动色标、改颜色时预览实时渲染,CSS 直接可复制——粘进任何样式表无需清理。一切在浏览器里计算和渲染;工具离线可用,不存任何东西。",
            "对比度纪律在这里同样适用:渐变上的文字要按渐变最亮的色标校验,而不是按平均值,用对比度检查器。没有文字时好看的渐变,标题一落到亮端就可能不及格。",
            "快速探索的方法:从色相相近的两个端点开始,逐渐拉开距离——大多数“渐变发闷”的抱怨都是端点取自色轮的相对两侧,而不是生成器坏了。",
          ],
        },
      ],
    },
    ja: {
      name: "CSS グラデーション生成",
      tagline:
        "2〜5 色をリニア・円形・円錐の CSS グラデーションに。ライブプレビュー、貼り付け可能なコード、ワンクリックの調和パレット付き。",
      intro: [
        "2〜5 色を選び、リニア・円形・円錐から種別を選んで角度をドラッグ — プレビューは入力に合わせて即時更新され、CSS は常にワンコピーです。ストップの位置を空欄にすると CSS と同じ規則で自動配置され、正確なパーセントを指定すればハードストップやオフセンターの混合も自在です。",
        "出力は実運用レベルのコードブロック:古いブラウザ向けの単色フォールバック行、旧 WebKit 向けの -webkit- 接頭辞行、最後に標準構文。ランダム調和ボタンはパレットの色相を HSL 空間で回転させるので、何度シャッフルしても配色が破綻しません。",
      ],
      steps: [
        "2〜5 色を設定するか、プリセットパレットから始めます。",
        "グラデーション種別を選び、角度や形状を調整。必要ならストップ位置を固定します。",
        "CSS ブロックをコピーしてスタイルシートに貼り付けます。",
      ],
      faqs: [
        {
          q: "CSS に -webkit- 接頭辞の行が含まれるのはなぜ?",
          a: "旧 WebKit ブラウザ(おおよそ Safari 5〜6 の時代)が -webkit-linear-gradient しか理解しないための互換行です。ここ 10 年のブラウザは標準行を読むので、旧バージョンに対応しないなら削除して構いません。残しても 1 行、削除しても損はありません。",
        },
        {
          q: "リニアグラデーションの角度は何を意味しますか?",
          a: "グラデーションが進む方向で、真上を 0° として時計回りに測ります:0deg は下から上、90deg は左から右、180deg は上から下です。入力した角度は正規化され(−45 は 315 に)、-webkit- 行の旧構文の逆向き規約も自動処理されます。",
        },
        {
          q: "リニアや円形ではなく円錐を使う場面は?",
          a: "円錐グラデーションは中心点の周りを色が回ります。円グラフ、角度ダイヤル、日の出効果はこれで作ります。リニアは直線に沿って、円形は中心から外へ。同じストップでも幾何がまったく違うので、種別を切り替えてプレビューで確かめるのが確実です。",
        },
      ],
      deepDive: [
        {
          heading: "グラデーションの角度・方向・軸",
          paragraphs: [
            "CSS では、linear-gradient の角度は色が進む方向を、上向きの線からの角で表します。0deg は下から上、90deg は左から右、180deg は上から下。逆方向には角度に 180 を足します——グラデーション作業で最も多い頭の滑りです。上へフェードすべき夕焼けが横向きにフェードするのは、たいてい角度が 90 度ずれています。",
            "カラーストップはその軸上の位置で、パーセントか長さで示します。既定の均等配置は設計意図にはしばしば合いません。ストップを早めに置く(例 20%)とその色が長く続き、ストップの位置はその色に完全に達する地点を示します。「ハードストップ」——同じ位置に 2 つのストップ——はブレンドではなく鋭い縁を作ります。グラデーションだけで鮮明な縞や分割バーを作る技法です。",
            "2 ストップのグラデーションは既定で sRGB で補間されるため、中間が濁ることがあります。黄から青への混色は緑ではなく低彩度のグレーを通ります。気にするデザイナーは、欲しい色相の第 3 の中間ストップを入れるか、色相の近い両端を選んで回避します。",
          ],
        },
        {
          heading: "グラデーション構文の読み書き",
          paragraphs: [
            "CSS 出力は linear-gradient 宣言に直接対応します。linear-gradient(90deg, #ff0000 0%, #0000ff 100%)。radial-gradient は角度の代わりに形状と位置を取ります。円か楕円、中央か角へのアンカーで、スポットライト、ビネット、柔らかい光に向きます。",
            "定番のデバッグ失敗:deg 単位の付け忘れ(裸の数は無効)、カラー関数内でスペースの代わりにカンマを使う、グラデーションを background-image に置きながら下に background-color を残す——色はグラデーションが透明な場所にしか透けません。",
            "めったに効かないが時々効く性能メモ:グラデーションは GPU で描画され安価ですが、ストップ位置のアニメーションは再描画を強制します。重ねた要素の opacity や transform を動かすのが滑らかな経路です。",
          ],
        },
        {
          heading: "視覚的フィードバック、アップロードゼロ",
          paragraphs: [
            "ストップを動かし色を変えるとプレビューがリアルタイムに描画され、CSS はそのままコピー可能——整なしでどのスタイルシートにも貼れます。すべてブラウザ内で計算・描画され、オフラインで動き、何も保存しません。",
            "コントラストの規律はここでも有効です。グラデーション上のテキストは、平均ではなく最も明るいストップに対して、コントラストチェッカーで確認します。文字がない状態で美しいグラデーションも、見出しが明るい端に落ちた瞬間に読みやすさを失うことがあります。",
            "素早く探る方法は、色相の近い 2 つの端点から始めて距離を徐々に広げること。「グラデーションが濁る」不満の大半は、壊れたジェネレーターではなく、色環の対側から取った端点です。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de degradados CSS",
      tagline:
        "Mezcla de dos a cinco colores en degradados CSS lineales, radiales o cónicos, con vista previa en vivo, código listo para pegar y paletas armonizadas a un clic.",
      intro: [
        "Elige de dos a cinco colores, selecciona lineal, radial o cónico y arrastra el ángulo — la vista previa se actualiza al escribir y el CSS está siempre a una copia de distancia. Si dejas vacía la posición de una parada se coloca automáticamente como lo haría CSS; fija porcentajes exactos para cortes duros y mezclas descentradas.",
        "La salida es un bloque de producción real: una línea de color sólido de reserva para navegadores antiguos, una línea con prefijo -webkit- para builds viejas de WebKit y la sintaxis estándar al final. El botón de armonización aleatoria rota los matices de tu paleta en el espacio HSL, así cada barajado mantiene el equilibrio en lugar de chocar.",
      ],
      steps: [
        "Fija de dos a cinco colores, o parte de una paleta predefinida.",
        "Elige el tipo de degradado y ajusta ángulo o forma; fija posiciones si quieres.",
        "Copia el bloque CSS y pégalo en tu hoja de estilos.",
      ],
      faqs: [
        {
          q: "¿Por qué el CSS incluye una línea con prefijo -webkit-?",
          a: "Es una línea de compatibilidad para navegadores WebKit antiguos (era de Safari 5–6 aproximadamente) que solo entendían -webkit-linear-gradient. Todos los navegadores de la última década leen la línea estándar, así que puedes borrar la prefijada si no necesitas dar soporte a esas versiones — mantenerla cuesta una línea y borrarla no cuesta nada.",
        },
        {
          q: "¿Qué significa el ángulo en un degradado lineal?",
          a: "Es la dirección en la que avanza el degradado, medida en sentido horario desde arriba: 0deg va de abajo hacia arriba, 90deg de izquierda a derecha, 180deg de arriba abajo. La herramienta normaliza cualquier ángulo (−45 pasa a 315) y la convención de dirección opuesta de la sintaxis vieja queda resuelta en la línea -webkit-.",
        },
        {
          q: "¿Cuándo conviene un degradado cónico en vez de lineal o radial?",
          a: "El cónico barre el color alrededor de un punto central — así se hacen gráficos de tarta, diales de ángulo y efectos de estallido solar. El lineal mezcla a lo largo de una recta y el radial se irradia desde el centro hacia fuera. Mismas paradas, geometría completamente distinta: cambia de tipo y mira la vista previa en lugar de adivinar.",
        },
      ],
      deepDive: [
        {
          heading: "Ángulos, direcciones y el eje de un gradiente",
          paragraphs: [
            "En CSS, el ángulo de un linear-gradient describe la dirección en que viajan los colores, medido desde una línea que apunta hacia arriba: 0deg va de abajo a arriba, 90deg de izquierda a derecha, 180deg de arriba a abajo. La dirección contraria necesita el ángulo más 180 — el tropiezo mental número uno del trabajo con gradientes. Un atardecer que debería desvanecerse hacia arriba pero se desvanece hacia el lado suele tener el ángulo desviado 90 grados.",
            "Los paradas de color son posiciones sobre ese eje, en porcentajes o longitudes. La distribución uniforme por defecto rara vez encaja con la intención de diseño: colocar una parada temprano (p. ej. al 20%) sostiene ese color más tiempo, mientras que la posición de una parada marca dónde el color se alcanza por completo. Una \"parada dura\" — dos paradas en la misma posición — produce un borde nítido en vez de una mezcla: la técnica tras franjas limpias y barras segmentadas construidas solo con gradientes.",
            "Los gradientes de dos paradas interpolan en sRGB por defecto, lo que puede dar un centro lodoso: mezclar amarillo con azul atraviesa un gris desaturado en lugar de pasar por el verde. Quien se preocupa lo esquiva con una tercera parada intermedia en el matiz que quiere, o eligiendo extremos cercanos en matiz.",
          ],
        },
        {
          heading: "Leer y escribir la sintaxis de gradientes",
          paragraphs: [
            "La salida CSS corresponde directamente a la declaración linear-gradient: linear-gradient(90deg, #ff0000 0%, #0000ff 100%). Los gradientes radiales sustituyen el ángulo por forma y posición — círculo o elipse, centrado o anclado en una esquina — útiles para focos, viñetas y halos suaves.",
            "Fallos de depuración habituales: olvidar la unidad deg (los números desnudos son inválidos), usar comas donde el navegador espera espacios dentro de las funciones de color, y poner el gradiente como background-image con un background-color debajo — el color solo asoma donde el gradiente tiene transparencia.",
            "Nota de rendimiento que rara vez importa pero a veces importa: los gradientes se renderizan en GPU y son baratos, pero animar las posiciones de las paradas fuerza repintados. Animar la opacidad o transform de un elemento superpuesto es el camino fluido.",
          ],
        },
        {
          heading: "Feedback visual, cero subidas",
          paragraphs: [
            "La vista previa se renderiza en vivo al mover paradas y cambiar colores, y el CSS sale listo para copiar — pégalo en cualquier hoja de estilos sin limpiarlo. Todo se calcula y dibuja en tu navegador; la herramienta funciona sin conexión y no guarda nada.",
            "La disciplina de contraste aplica también aquí: el texto sobre un gradiente debe comprobarse contra la parada más clara del gradiente, no contra su media, con el comprobador de contraste. Un gradiente precioso sin texto puede fallar la legibilidad en cuanto un titular aterriza en su extremo brillante.",
            "Para explorar rápido, empieza con dos extremos cercanos en matiz y abre la distancia poco a poco — la mayoría de las quejas de \"gradiente lodoso\" son extremos de lados opuestos del círculo cromático, no un generador roto.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de gradientes CSS",
      tagline:
        "Mistura de duas a cinco cores em gradientes CSS lineares, radiais ou cônicos, com pré-visualização ao vivo, código pronto para colar e paletas harmonizadas.",
      intro: [
        "Escolha de duas a cinco cores, selecione linear, radial ou cônico e arraste o ângulo — a pré-visualização atualiza enquanto você digita e o CSS está sempre a uma cópia de distância. Deixe a posição de uma parada em branco e ela é colocada automaticamente como o CSS faria; defina porcentagens exatas para cortes duros e misturas descentralizadas.",
        "A saída é um bloco de produção de verdade: uma linha de fallback com cor sólida para navegadores antigos, uma linha com prefixo -webkit- para builds antigas do WebKit e a sintaxe padrão por último. O botão de harmonização aleatória gira os matizes da paleta no espaço HSL, então cada embaralhada continua equilibrada em vez de virar bagunça.",
      ],
      steps: [
        "Defina de duas a cinco cores, ou comece de uma paleta predefinida.",
        "Escolha o tipo de gradiente e ajuste ângulo ou forma; fixe posições se quiser.",
        "Copie o bloco CSS e cole na sua folha de estilos.",
      ],
      faqs: [
        {
          q: "Por que o CSS inclui uma linha com prefixo -webkit-?",
          a: "É uma linha de compatibilidade para navegadores WebKit antigos (era do Safari 5–6, mais ou menos) que só entendiam -webkit-linear-gradient. Todo navegador da última década lê a linha padrão, então você pode apagar a prefixada se não precisar dar suporte a essas versões — mantê-la custa uma linha; removê-la não custa nada.",
        },
        {
          q: "O que significa o ângulo em um gradiente linear?",
          a: "É a direção em que o gradiente avança, medida no sentido horário a partir de cima: 0deg vai de baixo para cima, 90deg da esquerda para a direita, 180deg de cima para baixo. A ferramenta normaliza qualquer ângulo (−45 vira 315) e a convenção de direção oposta da sintaxe antiga já vem resolvida na linha -webkit-.",
        },
        {
          q: "Quando usar um gradiente cônico em vez de linear ou radial?",
          a: "O cônico varre a cor ao redor de um ponto central — é assim que se fazem gráficos de pizza, mostradores de ângulo e efeitos de explosão solar. O linear mistura ao longo de uma reta e o radial se irradia do centro para fora. Mesmas paradas, geometria completamente diferente: troque o tipo e observe a pré-visualização em vez de adivinhar.",
        },
      ],
      deepDive: [
        {
          heading: "Ângulos, direções e o eixo de um gradiente",
          paragraphs: [
            "No CSS, o ângulo de um linear-gradient descreve a direção em que as cores viajam, medido a partir de uma linha apontando para cima: 0deg vai de baixo para cima, 90deg da esquerda para a direita, 180deg de cima para baixo. A direção contrária precisa do ângulo mais 180 — o tropeço mental número um do trabalho com gradientes. Um pôr do sol que deveria desvanecer para cima mas desvanece para o lado costuma ter o ângulo errado em 90 graus.",
            "Os stops de cor são posições nesse eixo, em porcentagens ou comprimentos. A distribuição uniforme padrão raramente serve à intenção de design: colocar um stop cedo (p. ex. a 20%) segura aquela cor por mais tempo, enquanto a posição de um stop marca onde a cor é alcançada por completo. Um \"stop duro\" — dois stops na mesma posição — produz uma borda nítida em vez de uma mistura: a técnica por trás de listras limpas e barras segmentadas feitas só com gradientes.",
            "Gradientes de dois stops interpolam em sRGB por padrão, o que pode dar um centro embaciado: misturar amarelo com azul atravessa um cinza dessaturado em vez de passar pelo verde. Quem se importa contorna isso com um terceiro stop intermediário no matiz desejado, ou escolhendo extremos próximos em matiz.",
          ],
        },
        {
          heading: "Ler e escrever sintaxe de gradiente",
          paragraphs: [
            "A saída CSS corresponde direto à declaração linear-gradient: linear-gradient(90deg, #ff0000 0%, #0000ff 100%). Gradientes radiais trocam o ângulo por forma e posição — círculo ou elipse, centrado ou ancorado numa quina — úteis para holofotes, vinhetas e brilhos suaves.",
            "Falhas de depuração comuns: esquecer a unidade deg (números nus são inválidos), usar vírgulas onde o navegador espera espaços dentro das funções de cor, e colocar o gradiente como background-image com um background-color por baixo — a cor só aparece onde o gradiente tem transparência.",
            "Nota de desempenho que raramente importa mas às vezes importa: gradientes renderizam na GPU e são baratos, mas animar as posições dos stops força repinturas. Animar opacity ou transform de um elemento sobreposto é o caminho suave.",
          ],
        },
        {
          heading: "Feedback visual, zero upload",
          paragraphs: [
            "A prévia renderiza ao vivo conforme você move os stops e muda as cores, e o CSS sai pronto para copiar — cole em qualquer folha de estilo sem limpar. Tudo é calculado e desenhado no seu navegador; a ferramenta funciona offline e não guarda nada.",
            "A disciplina de contraste vale aqui também: texto sobre um gradiente deve ser conferido contra o stop mais claro do gradiente, não contra a média, usando o verificador de contraste. Um gradiente lindo sem texto pode falhar a legibilidade no momento em que um título aterriza no seu extremo claro.",
            "Para explorar rápido, comece com dois extremos próximos em matiz e aumente a distância aos poucos — a maioria das queixas de \"gradiente embaciado\" vem de extremos em lados opostos do círculo cromático, não de um gerador quebrado.",
          ],
        },
      ],
    },
  },
});
