import { CalcEngineBarcode } from "../_engines/calc-engine-barcode";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "barcode-generator",
  category: "utility",
  icon: "hash",
  engine: { component: CalcEngineBarcode },
  related: ["qr-generator", "uuid-generator", "color-picker", "binary-converter", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Barcode Generator",
      tagline: "Create scannable CODE128, EAN-13 and UPC-A barcodes with adjustable bar width and height — vector SVG output, rendered in your browser.",
      intro: [
        "Type a value, pick a symbology and get a retail-ready barcode with an optional human-readable line underneath. CODE128 handles any letters, digits and symbols for inventory labels; EAN-13 and UPC-A validate and auto-complete the check digit for product packaging.",
        "Rendering uses the JsBarcode library inside your browser and outputs a scalable SVG, so the same file prints crisply on a 12 mm label or an A4 sheet. Nothing is uploaded and no codes are stored.",
        "CODE128 encodes the full ASCII set and auto-selects its A/B/C subsets to pack digits tightly; EAN-13 and UPC-A are fixed-length numeric symbologies whose final digit is a modulo-10 check character computed from a weighted sum of the others — the generator computes and renders it for you instead of rejecting incomplete input.",
        "Compared with screenshotting a barcode from other software, the SVG output scales to any print size without jagged edges, and the human-readable line toggles to match your label stock. Quiet zones — the blank margins scanners require — are preserved in the output. Always test-scan a new label format with your actual scanner before committing to a print run.",
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
      deepDive: [
        {
          heading: "Code128 vs EAN-13: two jobs, two symbologies",
          paragraphs: [
            "These formats exist for different jobs and are not interchangeable. EAN-13 and UPC-A are GS1 retail symbologies: fixed length, numeric only, tied to a company prefix you license from a GS1 member organization, and understood by every checkout scanner in the world. CODE128 is a logistics symbology: variable length, full ASCII, free to use for anything internal — warehouse bins, asset tags, serial numbers, shipping references.",
            "The difference shows in density and tolerance. CODE128 auto-switches among its A (upper case + control), B (full alphanumeric) and C (digit-pairs) subsets, so a long run of digits is packed as two per code word — that is why a CODE128 label holding the same number as an EAN-13 comes out noticeably narrower. EAN-13, by contrast, fixes the module widths by standard so that any checkout scanner can decode it at speed regardless of who printed it.",
            "A practical rule: if a retailer or marketplace will assign you a product number, print it as EAN-13/UPC-A and never re-encode it in another format, because their systems match on the GS1 number. For everything that never leaves your own operation, CODE128 is simpler and more flexible.",
          ],
        },
        {
          heading: "The check digit and why input gets corrected",
          paragraphs: [
            "Retail symbologies end with a modulo-10 check character computed from a weighted sum of the other digits. For EAN-13, digits are weighted 1 and 3 alternately from the right; the check digit is what makes the total reach the next multiple of 10. This catches the two most common real-world failures: a mistyped digit and two transposed adjacent digits (transposed digits differ by weight 3−1=2, so many but not all swaps are caught).",
            "This generator accepts either 12 digits and computes the 13th, or a full 13 with verification — so an input with a wrong final digit is rejected rather than silently reprinted. If you are transcribing a number from paperwork, entering 12 digits and letting the tool compute the check digit is the safer workflow: it will not validate, but it will reveal a mismatch.",
            "The same modulo-10 family extends across GS1 logistics codes, which is why the habit of verifying the final digit transfers: if a scanned code consistently fails at the till or in your inventory app while the label looks fine, a corrupted check digit is one of the first things to suspect.",
          ],
        },
        {
          heading: "Quiet zones, bar width and print sizing",
          paragraphs: [
            "Every symbology reserves quiet zones — blank margins on both sides of the bars that scanners use to find the symbol's start. GS1 specifies minimum widths in absolute size, not pixels; when you crop or place a barcode flush against text or a box edge, the code can become unreadable even though every bar looks perfect. Leave more margin than feels necessary, especially on small labels.",
            "Bar width and height trade off against scanner capability. Narrow bars raise the demands on print resolution and scanner optics; taller bars give scanners a longer vertical band to hit at an angle. For handheld and checkout scanning, follow the print-size guidance of your standard rather than shrinking labels to fit the layout — a code that scans 200 times a day pays for the label space it takes.",
            "Because the output is vector SVG, the same file stays sharp at any size; what does not scale is the physics. Test-scan each new format with your actual scanner and your actual print stock before committing to a run, and nothing needs to leave your browser while you iterate — the rendering happens locally.",
          ],
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
      deepDive: [
        {
          heading: "Code128 与 EAN-13:两种码制,两种用途",
          paragraphs: [
            "这两种格式为不同的工作而存在,不能互相替代。EAN-13 和 UPC-A 是 GS1 零售码制:定长、纯数字,绑定你向 GS1 成员组织注册取得的公司前缀,全球收银台扫描器都认识。CODE128 是物流码制:变长、全 ASCII、内部随便用——库位、资产标签、序列号、运单号都行。",
            "差别体现在密度和容错上。CODE128 会在 A 子集(大写+控制符)、B 子集(全字母数字)、C 子集(数字成对)之间自动切换,一长串数字可以两位一码打包——这就是同样一个数字,CODE128 标签比 EAN-13 明显更窄的原因。EAN-13 则按标准固定模块宽度,让任何收银扫描器都能不看印刷方、快速可靠地读出。",
            "一条实用规则:如果零售商或平台会分配商品编号,就把这个编号按 EAN-13/UPC-A 打印,不要用别的码制重新编码——他们的系统按 GS1 编号对账。所有不出你自己运营范围的编码,CODE128 更简单也更灵活。",
          ],
        },
        {
          heading: "校验位:为什么输入会被纠正",
          paragraphs: [
            "零售码制都以一个模 10 校验字符收尾,由其余数字按权重求和得出。EAN-13 从右往左交替按 1、3 加权,校验位让总和凑到 10 的倍数。它能抓住两类最常见的真实错误:抄错一位数字,以及相邻两位互换(相邻位交换的差是 3−1=2 的倍数关系,大部分但并非全部互换都能查出)。",
            "本生成器接受 12 位自动补第 13 位,或输入完整 13 位做校验——末位不对的输入会被拒绝,而不是印出去。如果是从纸质单据抄号,输 12 位让工具算校验位更稳妥:虽然不能验证,但能暴露对不上的情况。",
            "同一套模 10 校验覆盖 GS1 整条物流编码族,这个习惯可以直接迁移:如果某个条码标签看起来完好,却在收银台或库存系统里持续读不出来,损坏的校验位是首先要怀疑的对象之一。",
          ],
        },
        {
          heading: "静区、条宽与印刷尺寸",
          paragraphs: [
            "每种码制都保留静区——条两侧的空白,扫描器靠它定位符号的起点。GS1 对最小静区宽度按绝对尺寸规定,不按像素。把条形码贴着文字或盒子边缘裁切排版时,代码可能整条不可读,尽管每根条看起来都完美。宁可多留边距,小标签尤其如此。",
            "条宽和条高与扫描器能力是权衡关系。条越窄,对打印分辨率和扫描光学要求越高;条越高,扫描器斜着打也有更长的纵向命中带。手持和收银场景按所用标准的最小印刷尺寸来,不要为了排版硬缩——一天扫两百次的码,付得起它占的那点标签面积。",
            "输出是矢量 SVG,同一文件任何尺寸都清晰;不会随缩放变化的是物理规律。正式开印前用你的扫描器、你的实际标签纸把每个新格式都试扫一遍——迭代全程在浏览器内本地完成,任何内容都不需要离开你的设备。",
          ],
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
      deepDive: [
        {
          heading: "CODE128 と EAN-13:二つの用途、二つの規格",
          paragraphs: [
            "この二つは別の仕事のために作られた規格で、置き換えができません。EAN-13 と UPC-A は GS1 の小売向けシンボル体系です。固定長・数字のみで、GS1 加盟団体から取得した企業プレフィックスに紐づき、世界のどのレジのスキャナーでも読めます。CODE128 は物流向けで、可変長・全 ASCII・社内用途には自由。棚番号、資産タグ、シリアル番号、配送参照番号に使えます。",
            "差は密度と耐性に現れます。CODE128 は A(大文字+制御文字)、B(英数字全般)、C(数字ペア)のサブセットを自動で切り替え、数字の連続は 2 桁を 1 コード語に詰めます。同じ数字でも EAN-13 より CODE128 の方が明らかに細くなるのはこのためです。逆に EAN-13 はモジュール幅が規格で固定され、印字者が誰であれ、レジのスキャナーが高速かつ確実に読めるように設計されています。",
            "実務の原則:小売店やプラットフォームが商品番号を発行するなら、その番号は EAN-13/UPC-A で印字し、別の形式で再エンコードしないこと。相手のシステムは GS1 番号で照合します。自社の運用から出ないコードなら、CODE128 の方が簡単で柔軟です。",
          ],
        },
        {
          heading: "チェックディジットと、入力が訂正される理由",
          paragraphs: [
            "小売向けシンボル体系は、他の桁の重み付き和から算出するモジュロ 10 のチェックキャラクタで終わります。EAN-13 は右から 1 と 3 を交互に重みとして掛け、合計が 10 の倍数になるように最後の桁を決めます。これで防げるのは実務で最も多い二つのミス、1 桁の打ち間違いと隣接桁の入れ替わり(入れ替わりの差は重み 3−1=2 に係るため、すべてではなく多くのケースを検出)です。",
            "本ジェネレーターは 12 桁の入力に 13 桁目を自動計算するか、13 桁を入れて検証するかのどちらも受け付けます。末尾が誤りの入力は黙って印字されるのではなく拒否されます。紙の伝票から番号を写す場合は、12 桁を入れてツールに計算させる方が安全です。検証はできませんが、食い違いが明らかになります。",
            "同じモジュロ 10 の一族は GS1 の物流コード全体に広がっており、末尾桁を確認する習慣はそのまま持ち越せます。ラベルは綺麗なのにレジや在庫アプリでだけ読み取りが続けて失敗する場合、壊れたチェックディジットは真っ先に疑うべき原因の一つです。",
          ],
        },
        {
          heading: "クワイエットゾーン、バー幅、印刷サイズ",
          paragraphs: [
            "どのシンボル体系もクワイエットゾーンを確保します。バーの両側の空白で、スキャナーはここでシンボルの始まりを見つけます。GS1 は最小幅をピクセルではなく絶対寸法で定めています。コードを文字や箱の端にぴったり配置して切り詰めると、各バーが完璧に見えてもコード全体が読めなくなることがあります。余白は必要に感じるより多めに。小さいラベルほどそうです。",
            "バーの幅と高さはスキャナー能力とのトレードオフです。バーが細いほど印刷解像度と読取光学への要求が上がり、バーが高いほど斜めに読んでも縦方向の命中帯が長くなります。ハンディやレジでの読み取りでは、レイアウトに合わせてラベルを縮めるより、規格の最小印字サイズに従ってください。1 日 200 回読まれるコードなら、占めるラベル面積はすぐに元が取れます。",
            "出力はベクター SVG のため、同じファイルがどのサイズでも鮮明です。縮んでも変わらないのは物理法則の側です。本番の印刷前に、実際のスキャナーと実際のラベル用紙で新しいフォーマットを必ず試し読みしてください。反復作業はブラウザ内でローカルに完結し、何もデバイスの外へ出ません。",
          ],
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
      deepDive: [
        {
          heading: "CODE128 frente a EAN-13: dos trabajos, dos simbologías",
          paragraphs: [
            "Estos formatos existen para trabajos distintos y no son intercambiables. EAN-13 y UPC-A son simbologías minoristas de GS1: longitud fija, solo numéricas, ligadas a un prefijo de empresa que se licencia a una organización miembro de GS1, y reconocidas por todos los escáneres de caja del mundo. CODE128 es una simbología logística: longitud variable, ASCII completo, de uso libre para cualquier cosa interna — ubicaciones de almacén, etiquetas de activos, números de serie, referencias de envío.",
            "La diferencia se nota en densidad y tolerancia. CODE128 alterna automáticamente entre sus subconjuntos A (mayúsculas y control), B (alfanumérico completo) y C (pares de dígitos), de modo que una serie larga de dígitos se empaqueta de dos en dos; por eso una etiqueta CODE128 con el mismo número que un EAN-13 resulta claramente más estrecha. EAN-13, en cambio, fija los anchos de módulo por norma para que cualquier escáner de caja lo descodifique con rapidez sin importar quién lo imprimió.",
            "Una regla práctica: si un minorista o mercado le asignará un número de producto, imprímalo como EAN-13/UPC-A y no lo recodifique en otro formato, porque sus sistemas lo cotejan por el número GS1. Para todo lo que nunca sale de su propia operación, CODE128 es más simple y más flexible.",
          ],
        },
        {
          heading: "El dígito de control y por qué se corrige la entrada",
          paragraphs: [
            "Las simbologías minoristas terminan con un carácter de control módulo-10 calculado como suma ponderada de los demás dígitos. En EAN-13 los dígitos se ponderan 1 y 3 alternando desde la derecha; el dígito final es el que hace que el total llegue al siguiente múltiplo de 10. Esto detecta los dos fallos más comunes: una cifra mal escrita y dos dígitos adyacentes intercambiados (el intercambio altera el peso en 3−1=2, así que muchos, aunque no todos, los intercambios se detectan).",
            "Este generador acepta 12 dígitos y calcula el 13.º, o bien los 13 completos con verificación: una entrada con dígito final erróneo se rechaza en lugar de reimprimirse en silencio. Si transcribe un número desde papel, introducir 12 dígitos y dejar que la herramienta calcule el dígito es el flujo más seguro: no validará, pero revelará la discrepancia.",
            "La misma familia módulo-10 cubre toda la logística GS1, y el hábito de verificar el dígito final se traslada: si un código se lee bien en la etiqueta pero falla sistemáticamente en la caja o en su inventario, un dígito de control dañado es de las primeras sospechas.",
          ],
        },
        {
          heading: "Zonas silenciosas, ancho de barra y tamaño de impresión",
          paragraphs: [
            "Toda simbología reserva zonas silenciosas: márgenes en blanco a ambos lados de las barras que los escáneres usan para localizar el inicio del símbolo. GS1 especifica anchos mínimos en tamaño absoluto, no en píxeles. Al recortar o colocar un código pegado a texto o al borde de una caja, puede volverse ilegible aunque cada barra parezca perfecta. Deje más margen del que parece necesario, sobre todo en etiquetas pequeñas.",
            "El ancho y alto de barra se compensan con la capacidad del escáner. Barras estrechas exigen más resolución de impresión y óptica; barras altas dan una banda vertical mayor para acertar en ángulo. Para lectura manual o en caja, siga el tamaño mínimo de impresión de su norma en vez de encoger etiquetas por el diseño: un código que se escanea 200 veces al día paga con creces el espacio de etiqueta que ocupa.",
            "Como la salida es un SVG vectorial, el mismo archivo se mantiene nítido a cualquier tamaño; lo que no escala es la física. Pruebe cada formato nuevo con su escáner real y su soporte de impresión real antes de una tirada, e itere sin que nada salga de su navegador: el renderizado ocurre localmente.",
          ],
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
      deepDive: [
        {
          heading: "CODE128 contra EAN-13: dois trabalhos, duas simbologias",
          paragraphs: [
            "Esses formatos existem para trabalhos diferentes e não são intercambiáveis. EAN-13 e UPC-A são simbologias varejistas da GS1: comprimento fixo, só numéricas, ligadas a um prefixo de empresa licenciado junto a uma organização membro da GS1, e reconhecidas por todos os leitores de caixa do mundo. CODE128 é uma simbologia logística: comprimento variável, ASCII completo, de uso livre para qualquer coisa interna — endereços de depósito, etiquetas de ativos, números de série, referências de envio.",
            "A diferença aparece na densidade e na tolerância. O CODE128 alterna automaticamente entre os subconjuntos A (maiúsculas e controle), B (alfanumérico completo) e C (pares de dígitos), então uma sequência longa de dígitos é empacotada de dois em dois; por isso uma etiqueta CODE128 com o mesmo número de um EAN-13 sai bem mais estreita. O EAN-13, ao contrário, fixa as larguras de módulo por norma para que qualquer leitor de caixa decodifique rápido, independentemente de quem imprimiu.",
            "Uma regra prática: se um varejista ou marketplace vai atribuir um número de produto, imprima-o como EAN-13/UPC-A e não o recodifique em outro formato, porque os sistemas dele casam pelo número GS1. Para tudo que nunca sai da sua própria operação, o CODE128 é mais simples e mais flexível.",
          ],
        },
        {
          heading: "O dígito verificador e por que a entrada é corrigida",
          paragraphs: [
            "As simbologias varejistas terminam com um caractere verificador módulo-10, calculado como soma ponderada dos demais dígitos. No EAN-13, os dígitos recebem peso 1 e 3 alternando a partir da direita; o dígito final faz o total chegar ao próximo múltiplo de 10. Isso detecta as duas falhas mais comuns: um dígito digitado errado e dois dígitos adjacentes trocados (a troca altera o peso em 3−1=2, então muitas — embora não todas — as trocas sejam detectadas).",
            "Este gerador aceita 12 dígitos e calcula o 13º, ou os 13 completos com verificação: uma entrada com dígito final errado é rejeitada em vez de reimpressa em silêncio. Se você está transcrevendo um número de um papel, digitar 12 dígitos e deixar a ferramenta calcular é o fluxo mais seguro: não vai validar, mas vai revelar a divergência.",
            "A mesma família módulo-10 cobre toda a logística GS1, e o hábito de conferir o dígito final se transfere: se um código parece perfeito na etiqueta mas falha sempre no caixa ou no seu inventário, um dígito verificador corrompido é das primeiras suspeitas.",
          ],
        },
        {
          heading: "Zonas silenciosas, largura de barra e tamanho de impressão",
          paragraphs: [
            "Toda simbologia reserva zonas silenciosas: margens em branco dos dois lados das barras que os leitores usam para achar o início do símbolo. A GS1 especifica larguras mínimas em tamanho absoluto, não em pixels. Ao cortar ou posicionar um código encostado em texto ou na borda da caixa, ele pode ficar ilegível mesmo com cada barra parecendo perfeita. Deixe margem maior do que parece necessário, sobretudo em etiquetas pequenas.",
            "Largura e altura de barra se compensam com a capacidade do leitor. Barras finas exigem mais resolução de impressão e óptica; barras altas dão uma faixa vertical maior para acertar em ângulo. Para leitura manual ou no caixa, siga o tamanho mínimo de impressão da sua norma em vez de encolher etiquetas pelo layout: um código lido 200 vezes por dia paga sobejamente o espaço de etiqueta que ocupa.",
            "Como a saída é um SVG vetorial, o mesmo arquivo fica nítido em qualquer tamanho; o que não escala é a física. Teste cada formato novo com o seu leitor real e o seu papel de etiqueta real antes da tirada, e itere sem nada sair do navegador: a renderização acontece localmente.",
          ],
        },
      ],
    },
  },
});
