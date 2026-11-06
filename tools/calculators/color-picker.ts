import { CalcEngineColor } from "../_engines/calc-engine-color";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "color-picker",
  category: "utility",
  icon: "palette",
  engine: { component: CalcEngineColor, props: { kind: "picker" } },
  related: ["color-converter", "qr-generator", "barcode-generator", "aspect-ratio-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Color Picker",
      tagline: "Pick a color from the swatch or grab one straight from your screen with the EyeDropper API — hex, RGB and HSL copied in one click.",
      intro: [
        "Click the swatch to compose a color visually, or — in Chromium browsers — use Pick from screen to sample any pixel already on your display. The chosen value appears simultaneously as hex, rgb() and hsl(), each with its own copy button.",
        "Sampling uses the browser's built-in EyeDropper API and reads the pixel locally; nothing is recorded, uploaded or stored. On browsers without the API, the swatch input keeps everything working.",
        "The EyeDropper API, available in Chromium browsers since 2022, opens the same magnifier UI the OS color dialog uses and returns the sampled pixel as a hex string, which is then converted to rgb() and hsl() locally with the same sRGB math used across the site.",
        "The advantage over screenshotting and inspecting pixels manually is speed: sample a brand color from a logo, a competitor page or a photo and it is already on your clipboard in three formats. The API reads anything visible on your display, not just this tab. Colors outside the sRGB gamut are clipped to the nearest representable value.",
      ],
      steps: [
        "Click the color swatch and choose a color, or use Pick from screen where available.",
        "Read the hex, RGB and HSL values under the preview.",
        "Click Copy next to the format you need.",
      ],
      faqs: [
        {
          q: "Why is “Pick from screen” not showing?",
          a: "The EyeDropper API is currently available in Chromium-based browsers (Chrome, Edge, Brave, Opera). Firefox and Safari do not expose it yet, so those browsers show only the swatch input — everything else works identically.",
        },
        {
          q: "What is the difference between hex, RGB and HSL?",
          a: "They describe the same color three ways: hex packs red-green-blue into #RRGGBB for CSS and design tools; rgb() states the three channels numerically; hsl() expresses hue, saturation and lightness, which is easier for building palettes and hover states by hand.",
        },
        {
          q: "Is the screen sampling private?",
          a: "Yes. The EyeDropper API shows a system picker and returns only the single pixel you click; the reading happens in your browser and no screenshot, history or value is transmitted or saved.",
        },
      ],
      deepDive: [
        {
          heading: "The EyeDropper API: what it can and cannot do",
          paragraphs: [
            "EyeDropper is a deliberate contrast to older screen-capture APIs. It requests no camera, no screen-recording permission and no persistent access: the browser shows the system magnifier, you click one pixel, and the API resolves with exactly one hex string. There is nothing to revoke later because nothing is kept — no stream is open between calls, so a page cannot snoop on your screen while you work.",
            "Its limits follow from that design. It reads only what is currently composited on your display, at your display's resolution — zoom into an image first if you need a precise pixel from a large area. And it is click-only: no hover previews of values before committing, and no way to sample a region programmatically. For pixel-precise work on a mockup, designers still open the file in an editor; for grabbing a brand color off a live page, one click beats a screenshot-and-inspect workflow every time.",
            "Support is the other practical boundary: Chromium browsers have shipped it since 2022; Firefox and Safari do not expose it yet. This tool feature-detects and simply hides the screen option where it is missing, so the picker degrades to swatch-only without breaking anything.",
          ],
        },
        {
          heading: "Why sampled colors sometimes shift slightly",
          paragraphs: [
            "A sampled color goes through more steps than it seems: the source was authored in some color space, rendered to your display's profile, composited, and then handed back to JavaScript as an sRGB hex triplet. If the original lived in a wider gamut than sRGB — a Display-P3 color on a Mac, for instance — the round trip clips it to the nearest sRGB value, and the hex you get is the best sRGB approximation, not the original.",
            "Color management explains the rest. Operating systems map sRGB values to display profiles, and screens with vivid modes or night-shift-like adjustments can alter what is physically shown without changing the stored value. Sampling therefore reports what is on the glass in the standard space; two monitors can show the same hex differently while the underlying value is identical.",
            "For brand work the safeguard is simple: treat a screen sample as a starting point, then confirm against the official source value if one exists. The three formats here — hex, rgb(), hsl() — stay mathematically consistent with each other regardless, since the conversion happens locally from the single sampled value.",
          ],
        },
        {
          heading: "A picker workflow that survives a design system",
          paragraphs: [
            "Getting a color is the easy part; keeping it usable is the discipline. After sampling, fix the canonical format first — most design systems use hex as the token, with rgb()/hsl() as derived views — and store one value, not three that can drift apart. This tool copies all three, but the one you paste into your tokens file is the one that becomes truth.",
            "Then build states from the single source: hover slightly lighter, pressed slightly darker, disabled a fixed opacity. Deriving them arithmetically from the sampled base (as the related color converter does with its tint-and-shade row) keeps every state regenerable, instead of accumulating one-off hex values nobody can explain.",
            "Finally, note where the color will appear. A sampled dark background with white text should be re-checked for contrast before it ships; picking and converting never validates accessibility, they only reproduce what you saw. Everything runs locally in the browser — sampled values are not recorded anywhere.",
          ],
        },
      ],
    },
    zh: {
      name: "取色器",
      tagline: "色板选色,或在支持的浏览器里用 EyeDropper API 直接从屏幕取色——hex、RGB、HSL 一键复制。",
      intro: [
        "点击色板可视化调色;在 Chromium 内核浏览器中还可以“从屏幕取色”,直接吸取屏幕上的任意像素。所选颜色同时以 hex、rgb() 和 hsl() 三种格式显示,各带复制按钮。",
        "屏幕取色使用浏览器内置的 EyeDropper API,像素在本地读取;不记录、不上传、不存储。不支持该 API 的浏览器使用色板输入,其余功能完全一致。",
      ],
      steps: [
        "点击色块选择颜色,或在支持时使用“从屏幕取色”。",
        "在预览下方查看 hex、RGB 和 HSL 数值。",
        "点击所需格式旁的“复制”。",
      ],
      faqs: [
        {
          q: "为什么看不到“从屏幕取色”?",
          a: "EyeDropper API 目前只在 Chromium 内核浏览器(Chrome、Edge、Brave、Opera)中提供。Firefox 和 Safari 尚未开放,这些浏览器只显示色板输入——其余功能完全相同。",
        },
        {
          q: "hex、RGB、HSL 有什么区别?",
          a: "三种写法描述同一个颜色:hex 把红绿蓝打包成 #RRGGBB,CSS 和设计工具通用;rgb() 用数字列出三个通道;hsl() 表示色相、饱和度、亮度,手工构建调色板和悬停态时更直观。",
        },
        {
          q: "屏幕取色隐私吗?",
          a: "隐私。EyeDropper API 会弹出系统取色器,只返回你点击的那一个像素;读取在浏览器内完成,不会传输或保存任何截图、历史或数值。",
        },
      ],
      deepDive: [
        {
          heading: "EyeDropper API:能做什么,不能做什么",
          paragraphs: [
            "EyeDropper 与旧的屏幕捕获 API 形成刻意对比:它不要摄像头、不要录屏权限、不要持久访问。浏览器弹出系统放大镜,你点一个像素,API 就只返回一个 hex 字符串。没有什么需要在事后撤销,因为什么都不保留——两次取色之间也不存在任何打开的流,页面不可能在你工作时窥探屏幕。",
            "它的限制也来自这个设计。它只能读到当前合成到显示器上的内容,分辨率就是屏幕分辨率——想从大图里精确取某个像素,先把图放大。而且只支持点击:提交前没有悬停预览数值,也不能用程序取一片区域。要对设计稿做像素级精确取色,设计师还是得打开编辑器;但从线上页面抓一个品牌色,一次点击永远胜过截图加吸管的工作流。",
            "支持范围是另一条现实边界:Chromium 浏览器自 2022 年起可用,Firefox 和 Safari 尚未开放。本工具做特性检测,不支持时直接隐藏屏幕取色选项,取色器退化为纯色板模式,其他功能不受影响。",
          ],
        },
        {
          heading: "取到的颜色为什么会有些许偏差",
          paragraphs: [
            "一个取到的颜色经过的环节比看上去多:源头按某种色空间编写,渲染到显示器的配置文件,再合成,最后以 sRGB 三元组交回 JavaScript。如果原始颜色活在比 sRGB 更宽的色域里——比如 Mac 上的 Display-P3 颜色——这个往返会被裁剪到最接近的 sRGB 值,你拿到的 hex 是最佳 sRGB 近似,不是原色。",
            "其余的偏差来自色彩管理。操作系统把 sRGB 值映射到显示器配置文件,开了鲜艳模式或护眼类调整的屏幕会改变实际显示,但不改动存储值。所以取色报告的是标准空间里\"玻璃上\"的颜色;同一台 hex 在两台显示器上可能显示不同,底层数值却完全一致。",
            "品牌工作的保障办法很简单:把屏幕取样当起点,如果存在官方源值,就用它做最终确认。这里的 hex、rgb()、hsl() 三种格式无论如何都互相数学一致,因为转换是从同一个取样值在本地完成的。",
          ],
        },
        {
          heading: "让取到的颜色在设计系统里活得下去",
          paragraphs: [
            "取色是容易的部分,让颜色保持可用才是纪律。取样之后先定标准格式——多数设计系统用 hex 做 token,rgb()/hsl() 是派生视图——只存一个值,不要存三个会各自漂移的副本。本工具三个都给你复制,但真正贴进 token 文件的那个才成为事实。",
            "然后从唯一源头派生状态:悬停略亮、按压略暗、禁用固定透明度。从取样基准值算术派生(就像配套颜色转换器用明暗色阶做的那样),每个状态都可再生,而不是积累一堆谁也说不清来历的一次性 hex。",
            "最后注意颜色出现的场景。取样来的深色背景配白字,上线前应该复测对比度;取色和换算只复现你看到的东西,从不验证可访问性。全部逻辑在浏览器本地运行——取样值不会在任何地方被记录。",
          ],
        },
      ],
    },
    ja: {
      name: "カラーピッカー",
      tagline: "スウォッチで選ぶか、EyeDropper API で画面から直接スポイト。hex・RGB・HSL をワンクリックでコピーします。",
      intro: [
        "スウォッチをクリックして視覚的に色を作るか、Chromium 系ブラウザでは「画面からスポイト」で画面上の任意のピクセルを取得できます。選んだ色は hex・rgb()・hsl() の 3 形式で同時に表示され、それぞれコピー ボタンが付きます。",
        "スポイトはブラウザ内蔵の EyeDropper API を使い、ピクセルをローカルで読み取ります。記録・アップロード・保存は一切ありません。API 非対応のブラウザではスウォッチ入力のみ表示され、他の機能は同一です。",
      ],
      steps: [
        "カラースウォッチで色を選ぶか、対応ブラウザでは「画面からスポイト」を使います。",
        "プレビューの下で hex・RGB・HSL の値を確認します。",
        "必要な形式の横の「コピー」を押します。",
      ],
      faqs: [
        {
          q: "「画面からスポイト」が表示されないのはなぜ?",
          a: "EyeDropper API は現在 Chromium 系ブラウザ(Chrome・Edge・Brave・Opera)のみが提供しています。Firefox と Safari は未対応のため、これらではスウォッチ入力だけが表示されます。他の機能はまったく同じです。",
        },
        {
          q: "hex・RGB・HSL の違いは何ですか?",
          a: "同じ色を 3 通りで表します。hex は赤緑青を #RRGGBB にまとめた CSS・デザインツール標準、rgb() は 3 チャネルを数値で示す書き方、hsl() は色相・彩度・明度で表すため、パレットやホバー状態を手で作るとき便利です。",
        },
        {
          q: "画面スポイトはプライバシー上是安全ですか?",
          a: "はい。EyeDropper API はシステムのピッカーを表示し、クリックした 1 ピクセルだけを返します。読み取りはブラウザ内で完結し、スクリーンショットも履歴も値も送信・保存されません。",
        },
      ],
      deepDive: [
        {
          heading: "EyeDropper API:できることとできないこと",
          paragraphs: [
            "EyeDropper は古い画面キャプチャ API とは意図的に対照的です。カメラも画面録画の権限も永続的なアクセスも要求しません。ブラウザがシステムの拡大鏡を表示し、1 ピクセルをクリックすると、API は 1 つの hex 文字列だけで解決します。何も保持されないので、後で取り消すべきものもありません。呼び出しの間に開かれたストリームも存在しないため、作業中にページが画面を覗くこともできません。",
            "制限もこの設計から来ています。読めるのは現在ディスプレイに合成されている内容だけで、解像度は画面そのものです。大きな画像の特定のピクセルが要るなら、先に拡大してください。クリックのみで、確定前のホバーによる値のプレビューはなく、領域をプログラムで取得する方法もありません。モックアップのピクセル単位の作業には編集ソフトを開く方が速いですが、生きているページからブランドカラーを拾うなら、1 クリックがスクリーンショット+検証の流れに常に勝ります。",
            "対応状況がもう一つの現実的な境界です。Chromium 系ブラウザでは 2022 年から利用可能ですが、Firefox と Safari はまだ公開していません。本ツールは機能検出を行い、未対応なら画面スポイトの選択肢を隠してスウォッチのみに縮退させ、他の機能は壊しません。",
          ],
        },
        {
          heading: "取得した色がわずかにずれる理由",
          paragraphs: [
            "取得した色は見た目より多くの段階を経ています。ソースはなんらかの色空間で書かれ、ディスプレイのプロファイルへレンダリングされ、合成され、最後に JavaScript へは sRGB の hex 三つ組として渡されます。元が sRGB より広い色域にいた場合(たとえば Mac 上の Display-P3 の色)、この往復は最も近い sRGB の値へクリップされ、得られる hex は最良の sRGB 近似であって原色ではありません。",
            "残りのずれはカラーマネジメントで説明がつきます。OS は sRGB の値をディスプレイのプロファイルへ写像し、ビビッドモードや夜間モード系の調整が入った画面は、保存された値を変えずに実際の表示を変えます。スポイトが報告するのは標準空間での「ガラスの上」の色です。同じ hex でも 2 台のモニターで見え方が違うことがあり、それでも元の値は同一です。",
            "ブランド作業の防衛策は単純です。画面サンプルを出発点として扱い、公式のソース値が存在すれば最終確認に使います。ここの hex・rgb()・hsl() はいずれにしても互いに数学的に一貫しています。変換は単一のサンプル値からローカルで行われるからです。",
          ],
        },
        {
          heading: "取得した色をデザインシステムの中で生かす",
          paragraphs: [
            "色を取るのは簡単な部分で、使える状態を保つのが規律です。取得後、まず正規の形式を決めます。多くのデザインシステムはトークンに hex を使い、rgb()/hsl() を派生ビューにします。保存するのは 1 つの値だけ。 drift する可能性のある 3 つのコピーを置かないこと。本ツールは 3 形式すべてをコピーしますが、トークンファイルに貼ったものだけが真実になります。",
            "次に、その唯一のソースから状態を作ります。ホバーはわずかに明るく、押下はわずかに暗く、無効は固定の不透明度。取得した基準値から算術的に派生させれば(関連のカラーコンバーターのティント&シェード行のように)、すべての状態が再生可能になり、説明のつかない使い捨て hex が溜まりません。",
            "最後に、色が現れる場所を意識します。取得した暗い背景に白文字を載せるなら、出荷前にコントラストを再確認すべきです。取得と変換は見たものを再現するだけで、アクセシビリティを検証しません。すべてブラウザ内でローカルに動き、取得値がどこかに記録されることはありません。",
          ],
        },
      ],
    },
    es: {
      name: "Selector de color",
      tagline: "Elija un color en la muestra o capte uno directamente de la pantalla con la API EyeDropper — hex, RGB y HSL copiables con un clic.",
      intro: [
        "Pulse la muestra para componer un color visualmente o, en navegadores Chromium, use Tomar de la pantalla para muestrear cualquier píxel ya visible. El valor elegido aparece a la vez como hex, rgb() y hsl(), cada uno con su botón de copiar.",
        "El muestreo usa la API EyeDropper del navegador y lee el píxel localmente; nada se registra, sube o guarda. En navegadores sin la API, la entrada de muestra mantiene todo funcionando igual.",
      ],
      steps: [
        "Pulse la muestra y elija un color, o use Tomar de la pantalla si está disponible.",
        "Lea los valores hex, RGB y HSL bajo la vista previa.",
        "Pulse Copiar junto al formato que necesite.",
      ],
      faqs: [
        {
          q: "¿Por qué no aparece «Tomar de la pantalla»?",
          a: "La API EyeDropper está disponible hoy en navegadores basados en Chromium (Chrome, Edge, Brave, Opera). Firefox y Safari aún no la exponen, así que en ellos solo se muestra la entrada de muestra; todo lo demás funciona idéntico.",
        },
        {
          q: "¿Qué diferencia hay entre hex, RGB y HSL?",
          a: "Describen el mismo color de tres maneras: hex empaqueta rojo-verde-azul en #RRGGBB para CSS y herramientas de diseño; rgb() enumera los canales numéricamente; hsl() expresa tono, saturación y luminosidad, más cómodo para construir paletas y estados hover a mano.",
        },
        {
          q: "¿Es privado el muestreo de pantalla?",
          a: "Sí. La API EyeDropper muestra un selector del sistema y devuelve solo el píxel que usted pulsa; la lectura ocurre en su navegador y no se transmite ni guarda ninguna captura, historial o valor.",
        },
      ],
      deepDive: [
        {
          heading: "La API EyeDropper: lo que puede y no puede hacer",
          paragraphs: [
            "EyeDropper es un contraste deliberado con las API antiguas de captura de pantalla. No pide cámara, ni permiso de grabación, ni acceso persistente: el navegador muestra la lupa del sistema, usted pulsa un píxel y la API resuelve con exactamente una cadena hex. No hay nada que revocar después porque no se guarda nada: no queda ningún flujo abierto entre llamadas, así que la página no puede espiar su pantalla mientras trabaja.",
            "Sus límites se derivan de ese diseño. Solo lee lo que está compuesto ahora mismo en su pantalla, a la resolución del monitor — si necesita un píxel preciso de una zona grande, haga zoom primero. Y es solo con clic: sin vista previa del valor al pasar el cursor antes de confirmar, y sin forma de muestrear una región por programa. Para trabajo de precisión de píxel sobre una maqueta, los diseñadores siguen abriendo el archivo en un editor; para tomar un color de marca de una página en vivo, un clic vence siempre al flujo de captura e inspección.",
            "El soporte es la otra frontera práctica: los navegadores Chromium lo traen desde 2022; Firefox y Safari aún no lo exponen. Esta herramienta detecta la función y simplemente oculta la opción de pantalla donde falta, así que el selector degrada a solo muestra sin romper nada.",
          ],
        },
        {
          heading: "Por qué los colores muestreados a veces cambian levemente",
          paragraphs: [
            "Un color muestreado pasa por más pasos de los que parece: la fuente fue creada en algún espacio de color, renderizada al perfil de su pantalla, compuesta y devuelta a JavaScript como un trío hex sRGB. Si el original vivía en una gama más amplia que sRGB — un color Display-P3 en un Mac, por ejemplo — el viaje lo recorta al valor sRGB más próximo, y el hex que recibe es la mejor aproximación sRGB, no el original.",
            "La gestión de color explica el resto. Los sistemas operativos mapean los valores sRGB a perfiles de pantalla, y monitores con modos vivos o ajustes nocturnos alteran lo que se muestra físicamente sin cambiar el valor almacenado. El muestreo, por tanto, reporta lo que hay en el cristal en el espacio estándar: dos monitores pueden mostrar el mismo hex de forma distinta mientras el valor subyacente es idéntico.",
            "Para trabajo de marca la salvaguarda es simple: trate la muestra de pantalla como punto de partida y confírmela contra el valor oficial si existe. Los tres formatos aquí — hex, rgb(), hsl() — siguen siendo matemáticamente consistentes entre sí en cualquier caso, porque la conversión se hace localmente desde el único valor muestreado.",
          ],
        },
        {
          heading: "Un flujo de selección que sobrevive a un sistema de diseño",
          paragraphs: [
            "Conseguir el color es la parte fácil; mantenerlo utilizable es la disciplina. Tras muestrear, fije primero el formato canónico — la mayoría de sistemas de diseño usan hex como token, con rgb()/hsl() como vistas derivadas — y almacene un valor, no tres que puedan divergir. Esta herramienta copia los tres, pero el que pegue en su archivo de tokens es el que se vuelve verdad.",
            "Luego construya los estados desde la única fuente: hover un poco más claro, pulsado un poco más oscuro, deshabilitado a opacidad fija. Derivarlos aritméticamente de la base muestreada (como hace el conversor de colores relacionado con su fila de tonos y sombras) mantiene cada estado reproducible, en lugar de acumular hex de una sola vez que nadie puede explicar.",
            "Por último, fíjese en dónde aparecerá el color. Un fondo oscuro muestreado con texto blanco merece reverificar su contraste antes de publicarse; seleccionar y convertir nunca valida la accesibilidad, solo reproduce lo que usted vio. Todo corre localmente en el navegador — los valores muestreados no se registran en ningún sitio.",
          ],
        },
      ],
    },
    pt: {
      name: "Seletor de cores",
      tagline: "Escolha uma cor na paleta ou capture uma direto da tela com a API EyeDropper — hex, RGB e HSL copiáveis num clique.",
      intro: [
        "Clique na paleta para compor uma cor visualmente ou, nos navegadores Chromium, use Capturar da tela para amostrar qualquer pixel já visível. O valor escolhido aparece ao mesmo tempo como hex, rgb() e hsl(), cada um com seu botão de copiar.",
        "A captura usa a API EyeDropper do navegador e lê o pixel localmente; nada é registrado, enviado ou armazenado. Em navegadores sem a API, a entrada da paleta mantém tudo funcionando igual.",
      ],
      steps: [
        "Clique na paleta e escolha uma cor, ou use Capturar da tela quando disponível.",
        "Veja os valores hex, RGB e HSL sob a pré-visualização.",
        "Clique em Copiar ao lado do formato que precisar.",
      ],
      faqs: [
        {
          q: "Por que «Capturar da tela» não aparece?",
          a: "A API EyeDropper hoje está disponível em navegadores baseados em Chromium (Chrome, Edge, Brave, Opera). Firefox e Safari ainda não a expõem, então nesses navegadores só aparece a entrada da paleta — todo o resto funciona igual.",
        },
        {
          q: "Qual a diferença entre hex, RGB e HSL?",
          a: "São três formas de descrever a mesma cor: hex empacota vermelho-verde-azul em #RRGGBB para CSS e ferramentas de design; rgb() lista os canais numericamente; hsl() expressa matiz, saturação e luminosidade, o que facilita montar paletas e estados hover à mão.",
        },
        {
          q: "A captura de tela é privada?",
          a: "Sim. A API EyeDropper mostra um seletor do sistema e devolve apenas o pixel clicado; a leitura acontece no navegador e nenhuma captura, histórico ou valor é transmitido ou salvo.",
        },
      ],
      deepDive: [
        {
          heading: "A API EyeDropper: o que pode e não pode fazer",
          paragraphs: [
            "A EyeDropper é um contraste deliberado com as APIs antigas de captura de tela. Não pede câmera, nem permissão de gravação, nem acesso persistente: o navegador mostra a lupa do sistema, você clica num pixel e a API resolve com exatamente uma string hex. Não há nada a revogar depois porque nada é guardado — nenhum fluxo fica aberto entre chamadas, então a página não pode espionar sua tela enquanto você trabalha.",
            "Os limites seguem desse design. Ela lê apenas o que está composto agora na sua tela, na resolução do monitor — se precisar de um pixel preciso de uma área grande, dê zoom antes. E é só por clique: sem prévia do valor ao passar o mouse antes de confirmar, e sem como amostrar uma região por programa. Para trabalho de precisão de pixel num mockup, designers ainda abrem o arquivo num editor; para pegar uma cor de marca numa página ao vivo, um clique ganha sempre do fluxo de capturar e inspecionar.",
            "O suporte é a outra fronteira prática: navegadores Chromium trazem a API desde 2022; Firefox e Safari ainda não a expõem. Esta ferramenta faz detecção de recurso e simplesmente esconde a opção de tela onde falta, então o seletor degrada para só paleta sem quebrar nada.",
          ],
        },
        {
          heading: "Por que cores amostradas às vezes mudam um pouco",
          paragraphs: [
            "Uma cor amostrada passa por mais etapas do que parece: a origem foi escrita em algum espaço de cor, renderizada para o perfil da sua tela, composta e devolvida ao JavaScript como um trio hex sRGB. Se o original vivia numa gama mais larga que o sRGB — uma cor Display-P3 num Mac, por exemplo — a viagem recorta para o valor sRGB mais próximo, e o hex que você recebe é a melhor aproximação sRGB, não a cor original.",
            "O gerenciamento de cor explica o resto. Os sistemas operacionais mapeiam valores sRGB para perfis de tela, e monitores com modos vívidos ou ajustes noturnos alteram o que é mostrado fisicamente sem mudar o valor armazenado. A amostragem, portanto, reporta o que está no vidro no espaço padrão; dois monitores podem mostrar o mesmo hex de forma diferente com o valor subjacente idêntico.",
            "Para trabalho de marca a salvaguarda é simples: trate a amostra de tela como ponto de partida e confirme contra o valor oficial, se existir. Os três formatos aqui — hex, rgb(), hsl() — continuam matematicamente consistentes entre si de qualquer forma, porque a conversão acontece localmente a partir do único valor amostrado.",
          ],
        },
        {
          heading: "Um fluxo de escolha que sobrevive a um design system",
          paragraphs: [
            "Conseguir a cor é a parte fácil; mantê-la utilizável é a disciplina. Depois de amostrar, fixe primeiro o formato canônico — a maioria dos design systems usa hex como token, com rgb()/hsl() como vistas derivadas — e guarde um valor, não três que podem divergir. Esta ferramenta copia os três, mas o que você colar no arquivo de tokens é o que vira verdade.",
            "Depois construa os estados a partir da única fonte: hover um pouco mais claro, pressionado um pouco mais escuro, desabilitado com opacidade fixa. Derivá-los aritmeticamente da base amostrada (como faz o conversor de cores relacionado com sua fileira de tons e sombras) mantém cada estado reproduzível, em vez de acumular hex avulsos que ninguém consegue explicar.",
            "Por fim, note onde a cor vai aparecer. Um fundo escuro amostrado com texto branco merece reverificar o contraste antes de publicar; escolher e converter nunca valida acessibilidade, só reproduzem o que você viu. Tudo roda localmente no navegador — valores amostrados não são registrados em lugar nenhum.",
          ],
        },
      ],
    },
  },
});
