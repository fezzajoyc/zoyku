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
    },
  },
});
