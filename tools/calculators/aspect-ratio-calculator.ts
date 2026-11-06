import { CalcEngineConverters } from "../_engines/calc-engine-converters";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "aspect-ratio-calculator",
  category: "utility",
  icon: "crop",
  engine: { component: CalcEngineConverters, props: { kind: "aspect" } },
  related: ["color-picker", "color-converter", "binary-converter", "qr-generator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Aspect Ratio Calculator",
      tagline: "Given a ratio like 16:9 and one dimension, get the missing width or height instantly — plus presets from 1:1 to 21:9 for video and design.",
      intro: [
        "Enter a ratio — tap a preset (1:1, 4:3, 3:2, 16:9, 16:10, 21:9) or type custom numbers — then give it a known width or height. The missing dimension appears immediately, together with the pair formatted as W×H and the decimal ratio.",
        "The classic resize without distortion: video crops, responsive image containers, sensor and film formats, print scaling and CSS object-fit decisions all live here, computed locally as you type.",
        "The math is integer ratio reduction: width and height are divided by their greatest common divisor, so 1920 × 1080 reduces to 16:9 exactly, with the decimal ratio (1.7778) shown alongside for CSS work. The missing dimension is the known side multiplied by the ratio, kept exact rather than rounded mid-calculation.",
        "Generic photo editors resize by dragging until it looks right; here the ratio is locked arithmetically, so a 16:9 video frame, a 3:2 print and a 21:9 ultrawide crop come out exact on the first try. Everything computes locally as you type, which turns compare-and-decide questions — does 4:3 or 16:10 fit my slide? — into a two-second answer.",
      ],
      steps: [
        "Pick a ratio preset or type your own width:height values.",
        "Choose which dimension you already know — width or height.",
        "Enter the known value and read the missing dimension.",
      ],
      faqs: [
        {
          q: "How is the missing dimension calculated?",
          a: "By direct proportion: known dimension × (target side ÷ matching ratio side). For 16:9 with a width of 1920, height = 1920 × 9 ÷ 16 = 1080. The result is shown rounded, with the exact decimal beneath it.",
        },
        {
          q: "Why does 16:9 and 16:10 matter so much for screens?",
          a: "16:9 matches video (1920×1080, 3840×2160) and most monitors; 16:10 adds vertical space for documents and code (1920×1200). Picking the wrong one means letterboxing or stretched pixels — this tool shows exactly what each ratio produces.",
        },
        {
          q: "Can I use decimal or unusual ratios?",
          a: "Yes. Both ratio fields accept any positive numbers, so 2.39:1 cinema scope, 1.85:1, 4:5 portrait social crops or sensor sizes like 1.5:1 all work — the proportion math is identical.",
        },
      ],
      deepDive: [
        {
          heading: "Cinema ratios: 1.85:1 vs 2.39:1",
          paragraphs: [
            "Hollywood settled on two widescreen standards after decades of competing formats. The \"flat\" 1.85:1 ratio fills a standard theater screen and is used for most mainstream films and TV-adjacent work; the \"scope\" 2.39:1 ratio is the wide, letterboxed look of epics and action films. When a scope film is shown on a 16:9 TV, the black bars you see are not a bug — they are the honest geometry of the difference between 2.39:1 and 1.78:1.",
            "The practical consequence for creators: shoot or crop at 2.39:1 and every platform will letterbox it; crop at 1.85:1 or 16:9 and you keep more vertical image but lose the cinematic framing. Use this calculator before committing — enter 3840 as the width for 2.39:1 and you will see the frame needs about 1607 pixels of height, which tells you immediately how much vertical resolution a scope crop throws away.",
            "Older formats still surface in modern workflows: 4:3 comes from television and 35mm still photography, 3:2 from 35mm film frames, and 1:1 from square print formats long before Instagram. Knowing the lineage helps when restoring old footage or matching a vintage look, because the ratio itself carries the era with it.",
          ],
        },
        {
          heading: "Where 16:9 came from and why it stuck",
          paragraphs: [
            "16:9 was not chosen for aesthetics. It was a compromise derived in the 1980s so that a single display could show both existing 4:3 television and cinema widescreen content with the least waste: 16:9 is the geometric mean that splits the difference between 4:3 (1.33) and common film ratios around 2.35, minimizing the letterboxing either way. When HD television was standardized, 16:9 came with it, and 1920×1080, 1280×720 and 3840×2160 all inherit the same shape.",
            "That inheritance is why 16:9 is the safe default for video on every major platform today, while 16:10 (1920×1200) survives mostly on laptops and monitors aimed at document and code work — the extra vertical tenth of a screen holds one more line of text or a toolbar without scrolling.",
            "The arithmetic is exact, not coincidental: 1920÷16 = 120 and 1080÷9 = 120, so every 16:9 resolution is a clean multiple. That is also why this calculator reduces 1920×1080 to exactly 16:9 via the greatest common divisor rather than approximating — the GCD of 1920 and 1080 is 120, and dividing both sides gives the canonical ratio.",
          ],
        },
        {
          heading: "Common mistakes when resizing",
          paragraphs: [
            "The most common error is entering the ratio as a decimal in one field and an integer in the other — 1.7778:1 is not the same commitment as 16:9 for pixel-exact work, because rounding accumulates. Type whole-number ratios when you have them and let the tool show the decimal for reference, rather than the reverse.",
            "The second error is rounding the output dimension to a \"nice\" number. If 2.39:1 with width 1920 computes a height of about 803, snapping to 800 changes the ratio by nearly half a percent — invisible on a rough preview, visible as drift in a multi-clip edit. When the exact pixel is fractional, decide deliberately: round for display, or keep the exact value for the master file.",
            "Finally, remember that object-fit: cover in CSS crops rather than scales — a 4:3 image inside a 16:9 container loses its top and bottom, it does not squeeze. Sizing the source image with this calculator to match the container ratio first avoids silently discarding content.",
          ],
        },
      ],
    },
    zh: {
      name: "宽高比计算器",
      tagline: "已知 16:9 之类的比例和一个边长,立即算出另一边——内置 1:1 到 21:9 预设,视频与设计常用比例一应俱全。",
      intro: [
        "输入比例——点选预设(1:1、4:3、3:2、16:9、16:10、21:9)或自定义——再给出已知的宽或高,缺失的一边立即出现,同时显示 W×H 尺寸对和十进制比例。",
        "最经典的等比缩放场景:视频裁切、响应式图片容器、传感器与胶片规格、印刷缩放和 CSS object-fit 决策,输入即算,全程本地完成。",
      ],
      steps: [
        "点选比例预设,或输入自定义的宽:高。",
        "选择你已知的一边——宽度或高度。",
        "输入已知数值,查看缺失的一边。",
      ],
      faqs: [
        {
          q: "缺失的一边是怎么算出来的?",
          a: "按正比例直接计算:已知边 × (目标边 ÷ 对应比例边)。16:9、宽 1920 时,高 = 1920 × 9 ÷ 16 = 1080。结果会四舍五入显示,下方同时给出精确小数。",
        },
        {
          q: "为什么屏幕比例 16:9 和 16:10 差别很大?",
          a: "16:9 对应视频(1920×1080、3840×2160)和大多数显示器;16:10 为文档和代码多留了纵向空间(1920×1200)。选错比例就会出现黑边或拉伸变形——这个工具能精确展示每种比例的结果。",
        },
        {
          q: "支持小数或特殊比例吗?",
          a: "支持。两个比例字段接受任意正数:2.39:1 电影宽银幕、1.85:1、4:5 竖版社交裁切或 1.5:1 的传感器规格都行——比例运算完全一样。",
        },
      ],
      deepDive: [
        {
          heading: "电影比例:1.85:1 与 2.39:1",
          paragraphs: [
            "好莱坞在几十年的格式混战后留下了两条宽银幕标准:1.85:1 的\"遮幅\"制,撑满普通影厅银幕,大多数主流电影和剧集后期用它;2.39:1 的\"变形宽银幕\"制,是史诗片和动作片那种上下带黑边的极宽画幅。宽银幕电影放到 16:9 电视上出现的黑边不是出错——那是 2.39:1 与 1.78:1 之间几何差异的诚实呈现。",
            "对创作者的实际影响:按 2.39:1 拍摄或裁切,所有平台都会给它加黑边;按 1.85:1 或 16:9 裁切,保留更多纵向画面,但失去电影感构图。动手前先算一算:输入宽 3840、比例 2.39:1,画面需要约 1607 像素的高度——宽银幕裁切要牺牲多少纵向分辨率,一眼就有答案。",
            "老格式今天仍在出现:4:3 来自电视和 35mm 静态摄影,3:2 来自 35mm 胶片画框,1:1 在 Instagram 之前很久就是方形印刷品的标准。了解这层渊源在修复旧素材、复刻年代感时很有用——比例本身就带着时代的印记。",
          ],
        },
        {
          heading: "16:9 的来历,以及它为什么站住了",
          paragraphs: [
            "16:9 不是按审美选出来的。它是上世纪八十年代的一个折中:要让一块屏幕同时尽量少浪费地显示 4:3 电视和约 2.35:1 的电影画面,取两者之间的几何平均最省黑边。高清电视定标时 16:9 跟着定了下来,1920×1080、1280×720、3840×2160 全都继承同一个形状。",
            "这份继承就是 16:9 今天成为所有主流平台视频安全默认值的原因;16:10(1920×1200)则主要留在笔记本和面向文档、代码的显示器上——多出来的那一条纵向空间,刚好多放一行文字或一个工具栏。",
            "这个算法是精确的,不是巧合:1920÷16 = 120,1080÷9 = 120,每个 16:9 分辨率都是干净的整数倍。这也是本工具用最大公约数把 1920×1080 精确约分成 16:9 而不是近似取值的原因——1920 和 1080 的最大公约数是 120,两边一除就得到标准比例。",
          ],
        },
        {
          heading: "缩放时的常见错误",
          paragraphs: [
            "最常见的错误是在比例栏一边填小数一边填整数——做像素级精确的工作时,1.7778:1 不等于 16:9,因为舍入会累积。有整数比例就填整数,让工具显示小数做参考,别反过来。",
            "第二个错误是把算出的边长\"取整好看\"。2.39:1、宽 1920 算出的高约 803,顺手取成 800 就让比例偏了将近半个百分点——粗略预览看不出来,多剪辑的工程里会累积成漂移。结果是分数时要有意识地决定:展示用四舍五入值,母版文件保留精确值。",
            "最后记住 CSS 里的 object-fit: cover 是裁切不是挤压——16:9 容器里的 4:3 图片会切掉上下,不是压扁。先用这个计算器把源图尺寸对齐容器比例,再放进布局,就不会悄悄丢内容。",
          ],
        },
      ],
    },
    ja: {
      name: "アスペクト比計算",
      tagline: "16:9 などの比率と片方の寸法があれば、もう片方を即算出。1:1 から 21:9 までのプリセットで動画・デザインに即対応。",
      intro: [
        "比率を入力します。プリセット(1:1、4:3、3:2、16:9、16:10、21:9)を選んでも、数値を直接入れても構いません。既知の幅か高さを与えると、欠けている辺がすぐ出ます。W×H のサイズと小数の比率も同時に表示します。",
        "典型例は歪みのないリサイズです。動画のトリミング、レスポンシブ画像コンテナ、センサー・フィルムの規格、印刷の拡大縮小、CSS の object-fit の判断に、入力しながらローカルで即計算できます。",
      ],
      steps: [
        "比率のプリセットを選ぶか、幅:高さを直接入力します。",
        "わかっている辺(幅か高さ)を選びます。",
        "既知の値を入力すると、もう片方の寸法が表示されます。",
      ],
      faqs: [
        {
          q: "もう片方の寸法はどう計算しますか?",
          a: "単純な比例計算です。既知の寸法 ×(目標の辺 ÷ 対応する比率の辺)。16:9 で幅 1920 なら、高さ = 1920 × 9 ÷ 16 = 1080 です。結果は丸めて表示し、正確な小数も下に示します。",
        },
        {
          q: "画面で 16:9 と 16:10 が重要なのはなぜですか?",
          a: "16:9 は動画(1920×1080、3840×2160)や多くのモニター向け、16:10 は文書やコードに縦の余裕を加えます(1920×1200)。選びを誤るとレターボックスや引き伸ばしになります。このツールで各比率の結果を正確に確認できます。",
        },
        {
          q: "小数や特殊な比率も使えますか?",
          a: "はい。比率欄は任意の正数を受け付けます。2.39:1 のシネスコ、1.85:1、4:5 の縦型 SNS クロップ、1.5:1 のセンサーなども同じ比例計算で扱えます。",
        },
      ],
      deepDive: [
        {
          heading: "映画の比率:1.85:1 と 2.39:1",
          paragraphs: [
            "ハリウッドは数十年にわたる規格争いの末、二つのワイド画面標準を残しました。1.85:1 の「フラット」は通常の劇場スクリーンを満たす比率で、多くの主流映画やドラマのポストプロダクションで使われます。2.39:1 の「スコープ」は、叙事詩的作品やアクション映画に見られる上下黒帯の極端に広い画角です。スコープ作品を 16:9 のテレビで見るときの黒帯は不具合ではなく、2.39:1 と 1.78:1 の幾何学的な差の正直な表れです。",
            "制作者への実務的な影響は次のとおりです。2.39:1 で撮るかクロップすれば、どのプラットフォームでもレターボックスになります。1.85:1 や 16:9 にすれば縦の情報は多く残りますが、映画的な構図は失われます。手を動かす前に計算してみてください。幅 3840、比率 2.39:1 と入力すると、必要な高さは約 1607 ピクセルで、スコープクロップが縦方向の解像度をどれだけ捨てるかが即座に分かります。",
            "古い規格も今のワークフローに顔を出します。4:3 はテレビと 35mm スチールから、3:2 は 35mm フィルムのコマから、1:1 は Instagram よりずっと前の正方形印刷物から来ています。古い素材の修復や年代感の再現では、比率そのものが時代を運んでいることを知っていると役立ちます。",
          ],
        },
        {
          heading: "16:9 の由来と、それが定着した理由",
          paragraphs: [
            "16:9 は美観で選ばれたのではありません。1980 年代の妥協案として、1 枚の画面で 4:3 のテレビと 2.35 前後の映画映像を、どちらも少ししか無駄なく表示する方法として導かれました。4:3(1.33)と映画比率の間の幾何平均的な位置にあり、どちらを表示しても黒帯が最小になります。ハイビジョン規格化の際に 16:9 が採用され、1920×1080、1280×720、3840×2160 はすべて同じ形を受け継いでいます。",
            "この継承が、16:9 が今日あらゆる主要プラットフォームで動画の安全な既定値である理由です。16:10(1920×1200)は主にノート PC や文書・コード向けモニターに残っています。縦方向に 1 割多いスペースが、テキストのもう 1 行やツールバーをスクロールなしで収めてくれます。",
            "この算術は正確で、偶然ではありません。1920÷16 = 120、1080÷9 = 120 であり、あらゆる 16:9 解像度はきれいな整数倍になります。本ツールが 1920×1080 を最大公約数で厳密に約分して 16:9 と判定する理由もここにあります。1920 と 1080 の最大公約数は 120 で、両辺を割れば正規の比率が出ます。",
          ],
        },
        {
          heading: "リサイズでありがちなミス",
          paragraphs: [
            "最も多いのは、比率欄に小数と整数を混ぜて入れるケースです。ピクセル単位の正確さが要る作業では、1.7778:1 は 16:9 と同じではありません。丸めが積み重なるからです。整数の比率を持っているなら整数で入力し、小数は参考表示としてツールに任せるのが順番です。",
            "二つ目は、計算結果の寸法を「きりのいい数」へ丸めてしまうことです。2.39:1 で幅 1920 のとき高さは約 803 ですが、800 に丸めると比率が半パーセント近くずれます。粗いプレビューでは見えませんが、複数クリップの編集ではドリフトとして現れます。結果が端数のときは意識して決めてください。表示用は四捨五入、マスターファイルは正確値、という具合です。",
            "最後に、CSS の object-fit: cover は引き伸ばしではなくトリミングだという点です。16:9 コンテナ内の 4:3 画像は上下が切られ、潰されはしません。この計算機でソース画像の寸法をコンテナの比率に合わせてから配置すれば、内容を黙って捨てる事故を避けられます。",
          ],
        },
      ],
    },
    es: {
      name: "Calculadora de relación de aspecto",
      tagline: "Con una relación como 16:9 y una dimensión, obtenga la anchura o altura que falta al instante — con presets de 1:1 a 21:9 para vídeo y diseño.",
      intro: [
        "Introduzca una relación — elija un preset (1:1, 4:3, 3:2, 16:9, 16:10, 21:9) o escriba números propios — y proporciónele una anchura o altura conocida. La dimensión que falta aparece enseguida, junto con el par formateado como ancho×alto y la relación decimal.",
        "El clásico reescalado sin deformación: recortes de vídeo, contenedores de imagen responsive, formatos de sensor y película, escalado de impresión y decisiones de CSS object-fit, todo calculado localmente mientras escribe.",
      ],
      steps: [
        "Elija un preset de relación o escriba sus valores de anchura:altura.",
        "Indique qué dimensión ya conoce: anchura o altura.",
        "Introduzca el valor conocido y lea la dimensión que falta.",
      ],
      faqs: [
        {
          q: "¿Cómo se calcula la dimensión que falta?",
          a: "Por proporción directa: dimensión conocida × (lado buscado ÷ lado equivalente de la relación). Para 16:9 con anchura 1920, altura = 1920 × 9 ÷ 16 = 1080. El resultado se muestra redondeado, con el decimal exacto debajo.",
        },
        {
          q: "¿Por qué importan tanto 16:9 y 16:10 en pantallas?",
          a: "16:9 corresponde al vídeo (1920×1080, 3840×2160) y a la mayoría de monitores; 16:10 añade espacio vertical para documentos y código (1920×1200). Elegir mal significa bandas negras o píxeles estirados; esta herramienta muestra exactamente qué produce cada relación.",
        },
        {
          q: "¿Puedo usar relaciones decimales o poco comunes?",
          a: "Sí. Ambos campos aceptan números positivos cualesquiera: 2.39:1 de cine, 1.85:1, recortes verticales 4:5 para redes sociales o sensores como 1.5:1 funcionan igual, porque la proporción es la misma matemática.",
        },
      ],
      deepDive: [
        {
          heading: "Relaciones de cine: 1.85:1 frente a 2.39:1",
          paragraphs: [
            "Tras décadas de formatos en competencia, Hollywood dejó dos estándares panorámicos. El \"flat\" 1.85:1 llena la pantalla de un cine convencional y lo usan la mayoría de películas comerciales y la postproducción de series; el \"scope\" 2.39:1 es el encuadre extremadamente ancho, con bandas negras, de las superproducciones y el cine de acción. Las bandas que aparecen al ver una película scope en un televisor 16:9 no son un error: son la geometría honesta de la diferencia entre 2.39:1 y 1.78:1.",
            "Para quienes crean contenido, la consecuencia práctica es clara: rodar o recortar a 2.39:1 implica que todas las plataformas lo mostrarán con bandas; recortar a 1.85:1 o 16:9 conserva más imagen vertical pero pierde la composición cinematográfica. Calcule antes de decidir: con anchura 3840 y relación 2.39:1, el cuadro necesita unos 1607 píxeles de altura, y se ve de inmediato cuánta resolución vertical abandona un recorte scope.",
            "Los formatos antiguos siguen apareciendo en flujos de trabajo actuales: el 4:3 viene de la televisión y la fotografía de 35 mm, el 3:2 de los fotogramas de película de 35 mm, y el 1:1 de los impresos cuadrados mucho antes de Instagram. Conocer ese linaje ayuda a restaurar material antiguo o replicar una estética de época, porque la propia relación arrastra su era consigo.",
          ],
        },
        {
          heading: "De dónde salió el 16:9 y por qué se quedó",
          paragraphs: [
            "El 16:9 no se eligió por estética. Fue un compromiso de los años ochenta: la forma que permite mostrar en una sola pantalla televisión 4:3 y contenido cinematográfico de unos 2.35:1 con el mínimo desperdicio, situándose en una posición de media geométrica entre ambos. Cuando se estandarizó la televisión en alta definición, el 16:9 vino con ella, y 1920×1080, 1280×720 y 3840×2160 heredan la misma forma.",
            "Esa herencia explica que hoy el 16:9 sea el valor seguro para vídeo en todas las plataformas importantes, mientras que el 16:10 (1920×1200) sobrevive sobre todo en portátiles y monitores orientados a documentos y código: esa décima vertical extra cabe una línea más de texto o una barra de herramientas sin desplazarse.",
            "La aritmética es exacta, no casual: 1920÷16 = 120 y 1080÷9 = 120, de modo que cada resolución 16:9 es un múltiplo limpio. Por eso esta calculadora reduce 1920×1080 a exactamente 16:9 mediante el máximo común divisor en lugar de aproximar: el MCD de 1920 y 1080 es 120, y al dividir ambos lados queda la relación canónica.",
          ],
        },
        {
          heading: "Errores comunes al reescalar",
          paragraphs: [
            "El error más frecuente es mezclar decimal y entero en los campos de la relación: para trabajo con precisión de píxel, 1.7778:1 no equivale a 16:9, porque el redondeo se acumula. Si tiene una relación de números enteros, escríbala entera y deje que la herramienta muestre el decimal como referencia, no al revés.",
            "El segundo error es redondear la dimensión resultante a un número \"bonito\". Si 2.39:1 con anchura 1920 da una altura de unos 803, redondear a 800 altera la relación casi medio por ciento: invisible en una vista previa, visible como deriva en una edición de varios clips. Cuando el píxel exacto es fraccional, decida con criterio: redondear para pantalla, conservar el valor exacto para el máster.",
            "Por último, recuerde que object-fit: cover en CSS recorta, no estira: una imagen 4:3 dentro de un contenedor 16:9 pierde arriba y abajo, no se comprime. Dimensionar la imagen de origen con esta calculadora para que coincida con la relación del contenedor evita descartar contenido sin darse cuenta.",
          ],
        },
      ],
    },
    pt: {
      name: "Calculadora de proporção",
      tagline: "Com uma proporção como 16:9 e uma dimensão, obtenha a largura ou altura que falta na hora — com presets de 1:1 a 21:9 para vídeo e design.",
      intro: [
        "Digite uma proporção — toque num preset (1:1, 4:3, 3:2, 16:9, 16:10, 21:9) ou informe números próprios — e dê uma largura ou altura conhecida. A dimensão que falta aparece imediatamente, junto com o par formatado como L×A e a proporção decimal.",
        "O clássico redimensionamento sem distorção: cortes de vídeo, contêineres de imagem responsivos, formatos de sensor e filme, escala de impressão e decisões de CSS object-fit — tudo calculado localmente enquanto você digita.",
      ],
      steps: [
        "Escolha um preset de proporção ou digite seus valores de largura:altura.",
        "Indique qual dimensão você já conhece — largura ou altura.",
        "Informe o valor conhecido e veja a dimensão que falta.",
      ],
      faqs: [
        {
          q: "Como a dimensão que falta é calculada?",
          a: "Por proporção direta: dimensão conhecida × (lado desejado ÷ lado correspondente da proporção). Para 16:9 com largura 1920, altura = 1920 × 9 ÷ 16 = 1080. O resultado aparece arredondado, com o decimal exato logo abaixo.",
        },
        {
          q: "Por que 16:9 e 16:10 importam tanto em telas?",
          a: "16:9 corresponde a vídeo (1920×1080, 3840×2160) e à maioria dos monitores; 16:10 adiciona espaço vertical para documentos e código (1920×1200). Escolher errado gera faixas pretas ou pixels esticados — a ferramenta mostra exatamente o que cada proporção produz.",
        },
        {
          q: "Posso usar proporções decimais ou incomuns?",
          a: "Sim. Os dois campos aceitam qualquer número positivo: 2.39:1 de cinema, 1.85:1, recortes verticais 4:5 para redes sociais ou sensores como 1.5:1 — a matemática de proporção é a mesma.",
        },
      ],
      deepDive: [
        {
          heading: "Proporções de cinema: 1.85:1 contra 2.39:1",
          paragraphs: [
            "Depois de décadas de formatos disputados, Hollywood deixou dois padrões widescreen. O \"flat\" 1.85:1 preenche a tela de um cinema convencional e é usado pela maioria dos filmes comerciais e pela pós-produção de séries; o \"scope\" 2.39:1 é o enquadramento extremamente largo, com faixas pretas, dos blockbusters e do cinema de ação. As faixas que aparecem ao assistir a um filme scope numa TV 16:9 não são defeito: são a geometria honesta da diferença entre 2.39:1 e 1.78:1.",
            "Para quem cria conteúdo, a consequência prática é direta: rodar ou cortar em 2.39:1 significa que todas as plataformas vão exibir com barras; cortar em 1.85:1 ou 16:9 preserva mais imagem vertical, mas perde a composição cinematográfica. Calcule antes de decidir: com largura 3840 e proporção 2.39:1, o quadro precisa de cerca de 1607 pixels de altura, e se vê na hora quanto de resolução vertical um corte scope joga fora.",
            "Formatos antigos ainda aparecem nos fluxos de trabalho atuais: o 4:3 vem da televisão e da fotografia em filme 35 mm, o 3:2 dos fotogramas do 35 mm, e o 1:1 dos impressos quadrados muito antes do Instagram. Conhecer essa linhagem ajuda a restaurar material antigo ou reproduzir uma estética de época, porque a própria proporção carrega a era junto.",
          ],
        },
        {
          heading: "De onde veio o 16:9 e por que ele venceu",
          paragraphs: [
            "O 16:9 não foi escolhido por estética. Foi um compromisso dos anos 1980: a forma que permite mostrar numa única tela tanto a TV 4:3 quanto conteúdo de cinema em torno de 2.35:1 com o mínimo de desperdício, numa posição de média geométrica entre os dois. Quando a TV em alta definição foi padronizada, o 16:9 veio junto, e 1920×1080, 1280×720 e 3840×2160 herdam a mesma forma.",
            "Essa herança explica por que o 16:9 é hoje o padrão seguro de vídeo em todas as grandes plataformas, enquanto o 16:10 (1920×1200) sobrevive sobretudo em notebooks e monitores voltados a documentos e código: aquela décima vertical extra cabe uma linha a mais de texto ou uma barra de ferramentas sem rolagem.",
            "A aritmética é exata, não coincidência: 1920÷16 = 120 e 1080÷9 = 120, de modo que toda resolução 16:9 é um múltiplo limpo. É por isso que esta calculadora reduz 1920×1080 a exatamente 16:9 pelo máximo divisor comum em vez de aproximar: o MDC de 1920 e 1080 é 120, e dividir os dois lados dá a proporção canônica.",
          ],
        },
        {
          heading: "Erros comuns ao redimensionar",
          paragraphs: [
            "O erro mais comum é misturar decimal e inteiro nos campos da proporção: para trabalho com precisão de pixel, 1.7778:1 não equivale a 16:9, porque o arredondamento se acumula. Se você tem uma proporção de números inteiros, digite ela inteira e deixe a ferramenta mostrar o decimal como referência, não o contrário.",
            "O segundo erro é arredondar a dimensão calculada para um número \"redondinho\". Se 2.39:1 com largura 1920 dá uma altura de cerca de 803, ajustar para 800 altera a proporção em quase meio por cento: invisível numa prévia, visível como desvio numa edição de vários clipes. Quando o pixel exato é fracionário, decida com critério: arredonde para exibição, guarde o valor exato para o arquivo mestre.",
            "Por fim, lembre que object-fit: cover no CSS corta, não estica: uma imagem 4:3 dentro de um contêiner 16:9 perde o topo e a base, não é comprimida. Dimensionar a imagem de origem com esta calculadora para casar com a proporção do contêiner evita descartar conteúdo sem perceber.",
          ],
        },
      ],
    },
  },
});
