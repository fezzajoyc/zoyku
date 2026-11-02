import { CalcEngineBarcode } from "../_engines/calc-engine-barcode";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "barcode-generator",
  category: "utility",
  icon: "hash",
  engine: { component: CalcEngineBarcode },
  related: ["qr-generator", "uuid-generator", "color-picker", "binary-converter"],
  copy: {
    en: {
      name: "Barcode Generator",
      tagline: "Create scannable CODE128, EAN-13 and UPC-A barcodes with adjustable bar width and height — vector SVG output, rendered in your browser.",
      intro: [
        "Type a value, pick a symbology and get a retail-ready barcode with an optional human-readable line underneath. CODE128 handles any letters, digits and symbols for inventory labels; EAN-13 and UPC-A validate and auto-complete the check digit for product packaging.",
        "Rendering uses the JsBarcode library inside your browser and outputs a scalable SVG, so the same file prints crisply on a 12 mm label or an A4 sheet. Nothing is uploaded and no codes are stored.",
      ],
      steps: [
        "Enter the barcode value — letters/digits for CODE128, 12 digits for EAN-13, 11 for UPC-A.",
        "Pick the format and adjust bar width and height.",
        "Download the SVG for printing or import it into your design tool.",
      ],
      faqs: [
        {
          q: "Why does my EAN-13 input get rejected?",
          a: "EAN-13 needs exactly 12 digits (the 13th check digit is computed automatically) or all 13 digits with a valid final check digit. UPC-A similarly wants 11 digits. Letters, spaces or the wrong digit count are rejected with the library's error message.",
        },
        {
          q: "Which format should I use for retail products?",
          a: "EAN-13 in most of the world, UPC-A in the US and Canada — both are GS1 retail standards that scanners at checkout expect. Use CODE128 for internal stock, asset and shipping labels where no GS1 number exists.",
        },
        {
          q: "What resolution is the output?",
          a: "The download is a vector SVG, so it scales to any DPI without blur. Keep the quiet zones (the blank margins on each side) intact when placing it — trimming them is the most common cause of unreadable scans.",
        },
      ],
    },
    zh: {
      name: "条形码生成器",
      tagline: "生成可扫描的 CODE128、EAN-13、UPC-A 条形码,条宽高度可调,输出矢量 SVG——渲染完全在浏览器内完成。",
      intro: [
        "输入内容、选择码制,即可得到零售可用的条形码,下方可选显示可读字符。CODE128 支持任意字母、数字和符号,适合库存标签;EAN-13 和 UPC-A 会校验并自动补全校验位,适合商品包装。",
        "渲染由浏览器内的 JsBarcode 库完成,输出可缩放的 SVG:同一个文件印在 12 毫米标签或 A4 纸上都清晰。不上传、不存储任何条码。",
      ],
      steps: [
        "输入条码内容——CODE128 用字母/数字,EAN-13 用 12 位数字,UPC-A 用 11 位。",
        "选择码制并调整条宽与高度。",
        "下载 SVG 用于打印,或导入设计软件。",
      ],
      faqs: [
        {
          q: "为什么我的 EAN-13 输入被拒绝?",
          a: "EAN-13 需要恰好 12 位数字(第 13 位校验位自动计算),或 13 位且末位校验正确的数字。UPC-A 类似,需要 11 位。字母、空格或位数不对都会被拒绝并显示库的错误提示。",
        },
        {
          q: "零售商品应该用哪种码制?",
          a: "全球大部分地区用 EAN-13,美国和加拿大用 UPC-A——两者都是收银台扫描器识别的 GS1 零售标准。没有 GS1 编号的内部库存、资产和物流标签用 CODE128。",
        },
        {
          q: "输出是什么分辨率?",
          a: "下载的是矢量 SVG,任何 DPI 下都不失真。排版时务必保留两侧的空白静区——裁掉静区是扫描失败最常见的原因。",
        },
      ],
    },
    ja: {
      name: "バーコード生成",
      tagline: "CODE128・EAN-13・UPC-A のスキャン可能なバーコードを、バーの幅と高さを調整して作成。ベクター SVG 出力、ブラウザ内で描画。",
      intro: [
        "値を入力してシンボル体系を選ぶだけで、下に読み取り用の文字を付けられる実用バーコードができます。CODE128 は英数字と記号全般に対応し在庫ラベル向け、EAN-13 と UPC-A はチェックディジットを検証・自動補完し商品パッケージ向けです。",
        "描画はブラウザ内の JsBarcode ライブラリで、出力は拡縮自在な SVG。12 mm のラベルでも A4 用紙でも同じファイルが鮮明に印刷できます。アップロードも保存もありません。",
      ],
      steps: [
        "バーコードの値を入力します(CODE128 は英数字、EAN-13 は 12 桁、UPC-A は 11 桁)。",
        "形式を選び、バーの幅と高さを調整します。",
        "印刷用に SVG をダウンロードするか、デザインツールに取り込みます。",
      ],
      faqs: [
        {
          q: "EAN-13 の入力が拒否されるのはなぜですか?",
          a: "EAN-13 はちょうど 12 桁(13 桁目のチェックディジットは自動計算)、またはチェックディジットを含む 13 桁が必要です。UPC-A は同様に 11 桁です。英字・空白・桁数違いはライブラリのエラーメッセージとともに拒否されます。",
        },
        {
          q: "小売商品にはどの形式を使えばいいですか?",
          a: "世界の大半では EAN-13、米国とカナダでは UPC-A です。どちらもレジのスキャナーが想定する GS1 規格です。GS1 番号のない社内在庫・資産・配送ラベルには CODE128 を使います。",
        },
        {
          q: "出力の解像度は?",
          a: "ダウンロードはベクター SVG のため、どの DPI でもにじみません。配置の際は両端の空白(クワイエットゾーン)を必ず残してください。削るとスキャン不能になる最も多い原因です。",
        },
      ],
    },
    es: {
      name: "Generador de códigos de barras",
      tagline: "Cree códigos de barras escaneables CODE128, EAN-13 y UPC-A con ancho y alto ajustables — salida vectorial SVG, renderizado en su navegador.",
      intro: [
        "Escriba un valor, elija la simbología y obtenga un código listo para el comercio con una línea legible opcional debajo. CODE128 admite letras, dígitos y símbolos para etiquetas de inventario; EAN-13 y UPC-A validan y completan el dígito de control para el embalaje de producto.",
        "El renderizado usa la librería JsBarcode dentro de su navegador y produce un SVG escalable: el mismo archivo se imprime nítido en una etiqueta de 12 mm o en un A4. No se sube nada ni se guardan códigos.",
      ],
      steps: [
        "Introduzca el valor — letras/dígitos para CODE128, 12 dígitos para EAN-13, 11 para UPC-A.",
        "Elija el formato y ajuste el ancho y el alto de las barras.",
        "Descargue el SVG para imprimir o impórtelo en su herramienta de diseño.",
      ],
      faqs: [
        {
          q: "¿Por qué se rechaza mi entrada EAN-13?",
          a: "EAN-13 necesita exactamente 12 dígitos (el 13.º dígito de control se calcula solo) o los 13 con un dígito final válido. UPC-A pide 11 de igual manera. Letras, espacios o un número erróneo de dígitos se rechazan con el mensaje de error de la librería.",
        },
        {
          q: "¿Qué formato uso para productos de venta al público?",
          a: "EAN-13 en casi todo el mundo y UPC-A en EE. UU. y Canadá: ambos son estándares GS1 que los escáneres de caja esperan. Para etiquetas internas de stock, activos y envíos sin número GS1, use CODE128.",
        },
        {
          q: "¿Qué resolución tiene la salida?",
          a: "La descarga es un SVG vectorial, así que escala a cualquier DPI sin difuminarse. Mantenga las zonas silenciosas (los márgenes en blanco de los lados) al colocarlo: recortarlas es la causa más habitual de lecturas fallidas.",
        },
      ],
    },
    pt: {
      name: "Gerador de código de barras",
      tagline: "Crie códigos de barras escaneáveis CODE128, EAN-13 e UPC-A com largura e altura ajustáveis — saída vetorial SVG, renderizado no navegador.",
      intro: [
        "Digite um valor, escolha a simbologia e receba um código pronto para o varejo com uma linha legível opcional embaixo. O CODE128 aceita letras, dígitos e símbolos para etiquetas de estoque; EAN-13 e UPC-A validam e completam o dígito verificador para embalagens de produto.",
        "A renderização usa a biblioteca JsBarcode dentro do navegador e gera um SVG escalável: o mesmo arquivo imprime nítido numa etiqueta de 12 mm ou numa folha A4. Nada é enviado e nenhum código é guardado.",
      ],
      steps: [
        "Informe o valor — letras/dígitos para CODE128, 12 dígitos para EAN-13, 11 para UPC-A.",
        "Escolha o formato e ajuste a largura e a altura das barras.",
        "Baixe o SVG para imprimir ou importe-o na sua ferramenta de design.",
      ],
      faqs: [
        {
          q: "Por que minha entrada EAN-13 é rejeitada?",
          a: "O EAN-13 exige exatamente 12 dígitos (o 13º dígito verificador é calculado automaticamente) ou os 13 com verificador final válido. O UPC-A pede 11 da mesma forma. Letras, espaços ou contagem errada são rejeitados com a mensagem de erro da biblioteca.",
        },
        {
          q: "Qual formato usar para produtos de varejo?",
          a: "EAN-13 na maior parte do mundo e UPC-A nos EUA e no Canadá — ambos são padrões GS1 que os leitores de caixa esperam. Para etiquetas internas de estoque, ativos e envio sem número GS1, use CODE128.",
        },
        {
          q: "Qual é a resolução da saída?",
          a: "O download é um SVG vetorial, então escala para qualquer DPI sem perder nitidez. Ao posicionar, mantenha as zonas silenciosas (as margens em branco dos lados) — cortá-las é a causa mais comum de leituras que falham.",
        },
      ],
    },
  },
});
