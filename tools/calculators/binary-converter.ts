import { CalcEngineConverters } from "../_engines/calc-engine-converters";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "binary-converter",
  category: "utility",
  icon: "hash",
  engine: { component: CalcEngineConverters, props: { kind: "binary" } },
  related: ["roman-numeral", "data-converter", "timestamp-converter", "aspect-ratio-calculator", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Binary Converter",
      tagline: "Convert between decimal, hexadecimal, octal and binary in one live grid — supports arbitrarily large integers, grouping for readability.",
      intro: [
        "Type a number into any of the four fields — decimal, hex, octal or binary — and the other three update instantly. Hex values group every two digits and binary every four, so long bit patterns stay readable.",
        "Conversion uses BigInt arithmetic, which means there is no 32-bit or 64-bit ceiling: paste a 40-digit decimal or a full 256-bit hex string and every representation stays exact.",
        "Each field maps through the standard positional bases — 2, 8, 10 and 16 — with BigInt carrying the value, so the 64-bit unsigned maximum 18,446,744,073,709,551,615 or larger converts without the floating-point drift JavaScript numbers suffer past 2^53. Hex groups by 2 digits and binary by 4 because one hex digit is exactly four bits.",
        "Compared with console or calculator conversions, all four representations stay on screen at once and update as you type, which is what makes bit masks, flag values and protocol headers easy to eyeball. Values here are unsigned — two's-complement and signed interpretations are out of scope, so keep that in mind when porting values from C or assembly.",
      ],
      steps: [
        "Type or paste a value into any field — decimal, hex, octal or binary.",
        "The other three bases update live as you type.",
        "Prefixes like 0x are optional; grouping spaces are ignored when parsing.",
      ],
      faqs: [
        {
          q: "How large a number can this converter handle?",
          a: "Arbitrarily large non-negative integers. Calculations use BigInt, so a 256-bit hexadecimal value converts exactly — far beyond the 2^53 limit of normal JavaScript numbers.",
        },
        {
          q: "Why does my hex letter input show as invalid?",
          a: "Each base only accepts its own digits: binary takes 0–1, octal 0–7, decimal 0–9 and hexadecimal 0–9 plus a–f. A stray space or symbol inside the number is also rejected.",
        },
        {
          q: "Are negative numbers or fractions supported?",
          a: "No — this grid converts whole non-negative values, which is what bit patterns, hashes and memory addresses are. Signed and fractional formats depend on encoding choices (two's complement, IEEE 754) that would make the mapping ambiguous.",
        },
      ],
      deepDive: [
        {
          heading: "Why hex and binary are the same language",
          paragraphs: [
            "One hexadecimal digit encodes exactly four bits: 0–9 plus a–f cover the sixteen values of a 4-bit group. That is not a convenience anyone chose — it is why every hex digit maps to a fixed four-bit binary pattern (F = 1111, 8 = 1000) with no ambiguity in either direction. The same holds for octal at three bits per digit, which is why old systems (file permissions, PDP-era computing) grouped in threes.",
            "This is the reason the display groups binary by 4 and hex by 2: each group is exactly one byte, so a 32-bit value shows as eight hex digits or four binary nibbles and you can read the byte boundaries directly off the screen. When you are checking a bit mask or a protocol header, that alignment turns \"count the bits carefully\" into \"glance at the groups\".",
            "The conversion itself is positional: a number in base b is the sum of each digit times b raised to its position. Hex just repackages binary — 0xFF is 11111111 — so converting between hex and binary is mechanical, while decimal conversion requires actual division. All four views stay in sync here as you type, with BigInt carrying the exact value at any size.",
          ],
        },
        {
          heading: "Two's complement: the signed world this grid deliberately leaves out",
          paragraphs: [
            "Hardware does not store minus signs. Signed integers use two's complement, where the highest bit doubles as a sign and negative numbers are formed by flipping all bits and adding one — which is why −1 in 8 bits is 11111111 and why an unsigned read of that same pattern shows 255. One bit pattern, two values: the mapping from bits to meaning depends on the interpretation, and that is exactly why this tool converts unsigned values only.",
            "The unsigned-only rule also sidesteps the other ambiguity: fractions. Floating-point numbers follow IEEE 754, where the bits split into sign, exponent and mantissa fields — converting that bit pattern as a plain integer gives a huge number with no relation to the decimal value. Hex dumps of floats only make sense with the encoding in hand.",
            "So keep this converter for what it is for: bit patterns, hashes, colors packed into integers, memory addresses and flags. When porting a value out of C, Rust or assembly, check whether the source variable was signed first — if it was, interpret the top bit yourself before trusting the decimal here.",
          ],
        },
        {
          heading: "Where the 2^53 limit comes from and why BigInt matters",
          paragraphs: [
            "JavaScript's ordinary numbers are 64-bit floats, and IEEE 754 spends 53 of those bits on the mantissa. That means every integer up to 2^53 — about 9 quadrillion — is exact, and past it, numbers start being rounded to the nearest representable float: add 1 to 2^53 in plain JavaScript and nothing changes. IDs, hashes and cryptographic values routinely exceed that line, which is why pasted 64-bit hex strings have historically come back wrong from naive converters.",
            "BigInt sidesteps the problem by representing numbers as arbitrary-precision integers instead of floats, so a 256-bit hash or a 40-digit decimal converts exactly at any size. The cost is negligible for this workload — the conversion is still instantaneous — and the result is that all four fields agree with each other rather than each rounding independently.",
            "A quick sanity check when you suspect precision trouble elsewhere: convert the value here and compare with what another tool reported. If the low digits differ, the other tool was rounding through floats — this grid shows the true value.",
          ],
        },
      ],
    },
    zh: {
      name: "进制转换",
      tagline: "十进制、十六进制、八进制、二进制四栏联动即时互转,支持任意大的整数,并按位分组便于阅读。",
      intro: [
        "在十进制、十六进制、八进制、二进制任意一栏输入数字,其余三栏即时联动。十六进制每 2 位一组、二进制每 4 位一组,长比特串也能轻松读。",
        "转换基于 BigInt 运算,没有 32 位或 64 位上限:40 位的十进制或 256 位的十六进制串都能精确转换。",
      ],
      steps: [
        "在任意一栏输入或粘贴数值——十进制、十六进制、八进制或二进制均可。",
        "输入时其余三种进制实时更新。",
        "0x 之类前缀可以省略;解析时会忽略分组空格。",
      ],
      faqs: [
        {
          q: "能处理多大的数字?",
          a: "任意大的非负整数。计算使用 BigInt,256 位的十六进制值也能精确转换——远超普通 JavaScript 数字的 2^53 上限。",
        },
        {
          q: "为什么输入十六进制字母提示无效?",
          a: "每种进制只接受自己的数字:二进制 0–1、八进制 0–7、十进制 0–9、十六进制 0–9 加 a–f。数字中间混入的空格或符号也会被判为无效。",
        },
        {
          q: "支持负数或小数吗?",
          a: "不支持——四栏换算的是非负整数,这正是比特串、哈希值和内存地址的表示方式。带符号和小数依赖具体编码(补码、IEEE 754),映射不再唯一,故不纳入。",
        },
      ],
      deepDive: [
        {
          heading: "十六进制和二进制为什么是同一种语言",
          paragraphs: [
            "一个十六进制位恰好编码 4 个比特:0–9 加 a–f 正好覆盖 4 位组的十六个取值。这不是谁刻意选的方便写法——而是每个十六进制位都对应一组固定的四位二进制模式(F = 1111,8 = 1000),两个方向都没有歧义。八进制同理,每位对应 3 个比特,所以老系统(文件权限、早期计算机)按三位一组。",
            "这就是显示上二进制按 4 位、十六进制按 2 位分组的原因:每组恰好一个字节,32 位值显示为 8 个十六进制位或 4 个二进制半字节,字节边界直接看分组就知道。查位掩码或协议头时,这种对齐把\"仔细数比特\"变成\"扫一眼分组\"。",
            "转换本身基于位权:某个进制的数等于每位数字乘以该进制,再按位置取幂求和。十六进制只是二进制的重新打包——0xFF 就是 11111111——所以十六进制与二进制之间是机械映射,而十进制转换需要真正的除法。四栏随输入实时同步,BigInt 在任意大小下都携带精确值。",
          ],
        },
        {
          heading: "补码:本工具刻意不碰的带符号世界",
          paragraphs: [
            "硬件不存负号。带符号整数用补码表示:最高位兼作符号位,负数按\"逐位取反加一\"构造——所以 8 位下的 −1 是 11111111,同一模式按无符号读出来是 255。同一段比特,两种含义:比特到数值的映射取决于解读方式,这正是本工具只转无符号值的原因。",
            "只用无符号也顺手绕开了另一种歧义:小数。浮点数遵循 IEEE 754,比特被切成符号、指数、尾数三段——把那段比特当普通整数转换,得到的巨大数字和小数值毫无关系。看浮点数的十六进制转储,必须同时拿着编码规则才有意义。",
            "所以把这个转换器用在它该用的地方:比特串、哈希、打包成整数的颜色、内存地址、标志位。从 C、Rust 或汇编搬数值过来时,先确认源变量是不是带符号——如果是,自己解读好最高位,再相信这里的十进制结果。",
          ],
        },
        {
          heading: "2^53 上限从哪来,BigInt 为什么重要",
          paragraphs: [
            "JavaScript 的普通数字是 64 位浮点数,IEEE 754 把其中 53 位留给尾数。也就是说 2^53(约 9 千万亿)以内的整数都是精确的,过了这条线,数字开始被舍入到最近的浮点数:在普通 JavaScript 里给 2^53 加 1,结果纹丝不动。ID、哈希、密码学数值动辄越过这条线,所以过去把 64 位十六进制串贴进朴素的转换器,常得到错误结果。",
            "BigInt 用任意精度整数替代浮点数来表示数值,256 位的哈希或 40 位的十进制在任意大小下都能精确转换。对这种工作量,开销可以忽略——转换照样瞬时完成——结果是四个字段互相一致,而不是各自独立舍入。",
            "怀疑别处出了精度问题时有个快速自查:把数值贴到这里转换,和另一个工具的结果对比。低位数字不一致,就说明对方经过了浮点舍入——这里显示的才是真实值。",
          ],
        },
      ],
    },
    ja: {
      name: "進数変換",
      tagline: "10 進・16 進・8 進・2 進を 4 欄同時リアルタイム変換。桁数無制限の整数に対応し、読みやすく桁区切り表示。",
      intro: [
        "10 進・16 進・8 進・2 進のどれか 1 欄に数値を入れると、他の 3 欄が即座に更新されます。16 進は 2 桁ずつ、2 進は 4 桁ずつ区切って表示するので、長いビット列も読みやすくなっています。",
        "変換は BigInt 演算を使用するため 32 ビットや 64 ビットの上限がありません。40 桁の 10 進数でも 256 ビットの 16 進数でも正確に変換できます。",
      ],
      steps: [
        "どれか 1 欄に値を入力または貼り付けます(10/16/8/2 進どれでも)。",
        "入力に合わせて他の 3 進法がリアルタイム更新されます。",
        "0x などの接頭辞は省略可能です。桁区切りの空白は無視して解析します。",
      ],
      faqs: [
        {
          q: "どのくらい大きな数まで扱えますか?",
          a: "非負の整数なら無制限です。BigInt で計算するため、256 ビットの 16 進数も正確に変換できます。通常の JavaScript 数値の 2^53 上限を大きく超えます。",
        },
        {
          q: "16 進の英字を入れると無効になるのはなぜですか?",
          a: "各進法は固有の数字しか受け付けません。2 進は 0–1、8 進は 0–7、10 進は 0–9、16 進は 0–9 と a–f です。数値の途中の空白や記号も無効になります。",
        },
        {
          q: "負数や小数は使えますか?",
          a: "いいえ。この表は非負の整数のみを変換します。ビット列・ハッシュ・メモリアドレスは整数だからです。符号付きや小数は補数や IEEE 754 など符号化方式に依存し、対応が一意にならないため対象外です。",
        },
      ],
      deepDive: [
        {
          heading: "16 進と 2 進が同じ言語である理由",
          paragraphs: [
            "16 進の 1 桁はちょうど 4 ビットを符号化します。0–9 と a–f が 4 ビットグループの 16 個の値をちょうど覆うからです。これは誰かが選んだ便宜ではなく、各 16 進桁が固定の 4 ビットパターンに対応するため(F = 1111、8 = 1000)、どちらの方向にも曖昧さがありません。8 進も同じ理屈で 1 桁 3 ビットであり、古いシステム(ファイル権限、初期のコンピュータ)が 3 桁区切りだったのはこのためです。",
            "だから表示は 2 進を 4 桁、16 進を 2 桁で区切ります。各グループがちょうど 1 バイトであり、32 ビットの値は 16 進 8 桁か 2 進の 4 ニブルとして表示され、バイト境界が画面上でそのまま読めます。ビットマスクやプロトコルヘッダを確認するとき、この整列のおかげで「慎重にビットを数える」作業が「グループを一目見る」作業になります。",
            "変換自体は位取りの原理です。基数 b の数は、各桁の数字に b の位置乗を掛けて合計したものです。16 進は 2 進の単なる詰め直し(0xFF は 11111111)なので機械的な対応ですが、10 進への変換には実際の除算が要ります。4 欄は入力に合わせてリアルタイムで同期し、BigInt が任意の桁数で正確な値を保持します。",
          ],
        },
        {
          heading: "補数:この表があえて扱わない符号付きの世界",
          paragraphs: [
            "ハードウェアはマイナス記号を保存しません。符号付き整数は 2 の補数を使い、最上位ビットが符号を兼ね、負の数は全ビットを反転して 1 を足して作ります。だから 8 ビットの −1 は 11111111 であり、同じパターンを符号なしで読むと 255 になります。同じビット列に二つの値があり得る。ビットから意味への対応は解釈次第であり、これこそ本ツールが符号なしの値だけを変換する理由です。",
            "符号なし限定はもう一つの曖昧さも避けます。小数です。浮動小数点数は IEEE 754 に従い、ビットが符号・指数・仮数に分かれます。そのビット列を普通の整数として変換しても、得られる巨大な数は 10 進の値と無関係です。float の 16 進ダンプは、符号化方式を手元に持って初めて意味を持ちます。",
            "だからこの変換器は本来の用途に使ってください。ビット列、ハッシュ、整数に詰めた色、メモリアドレス、フラグです。C や Rust、アセンブリから値を持ってくるときは、先に元の変数が符号付きか確認してください。符号付きなら最上位ビットを自分で解釈してから、ここの 10 進を信頼します。",
          ],
        },
        {
          heading: "2^53 の上限はどこから来て、BigInt が何を解決するか",
          paragraphs: [
            "JavaScript の普通の数値は 64 ビット浮動小数点で、IEEE 754 はそのうち 53 ビットを仮数に割きます。つまり 2^53(約 9 千兆)までの整数は正確ですが、その先は表現できる最寄りの浮動小数点へ丸められます。素の JavaScript で 2^53 に 1 を足しても何も変わりません。ID、ハッシュ、暗号学的な値は日常的にこの線を超えるため、64 ビットの 16 進文字列を単純な変換器に貼ると歴史的に誤った結果が返ってきました。",
            "BigInt は数を浮動小数点ではなく任意精度整数として表すので、256 ビットのハッシュも 40 桁の 10 進数も任意の大きさで正確に変換できます。この用途ではコストは無視でき、変換は即座に終わり、4 欄がそれぞれ独立に丸めるのではなく互いに一致します。",
            "別の場所で精度の問題を疑うときの簡易チェック:ここで値を変換し、別ツールの結果と比べます。下位の桁が違えば、相手は浮動小数点経由で丸めています。この表が真の値を示します。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor binario",
      tagline: "Convierte entre decimal, hexadecimal, octal y binario en una cuadrícula en vivo: admite enteros de cualquier tamaño y agrupa para leerlos mejor.",
      intro: [
        "Escriba un número en cualquiera de los cuatro campos — decimal, hex, octal o binario — y los otros tres se actualizan al instante. Los valores hex se agrupan cada dos dígitos y los binarios cada cuatro, para que las cadenas largas sigan siendo legibles.",
        "La conversión usa aritmética BigInt, sin techo de 32 ni 64 bits: pegue un decimal de 40 dígitos o un hex de 256 bits y todas las representaciones quedan exactas.",
      ],
      steps: [
        "Escriba o pegue un valor en cualquier campo: decimal, hex, octal o binario.",
        "Las otras tres bases se actualizan en vivo mientras escribe.",
        "Los prefijos como 0x son opcionales; los espacios de agrupación se ignoran al interpretar.",
      ],
      faqs: [
        {
          q: "¿Hasta qué número puede manejar el conversor?",
          a: "Enteros no negativos de cualquier tamaño. Los cálculos usan BigInt, así que un valor hexadecimal de 256 bits se convierte exactamente, muy por encima del límite de 2^53 de los números JavaScript normales.",
        },
        {
          q: "¿Por qué mi letra hexadecimal aparece como no válida?",
          a: "Cada base solo acepta sus propios dígitos: binario 0–1, octal 0–7, decimal 0–9 y hexadecimal 0–9 más a–f. Un espacio o símbolo dentro del número también se rechaza.",
        },
        {
          q: "¿Se admiten negativos o fracciones?",
          a: "No: la cuadrícula convierte valores enteros no negativos, que es lo que son los patrones de bits, hashes y direcciones de memoria. Los formatos con signo o decimales dependen de codificaciones (complemento a dos, IEEE 754) que harían la correspondencia ambigua.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué hexadecimal y binario son el mismo idioma",
          paragraphs: [
            "Un dígito hexadecimal codifica exactamente cuatro bits: 0–9 más a–f cubren justo los dieciséis valores de un grupo de 4 bits. No es una comodidad elegida por alguien: cada dígito hex corresponde a un patrón binario fijo de cuatro bits (F = 1111, 8 = 1000), sin ambigüedad en ninguna dirección. Lo mismo vale para el octal a tres bits por dígito, razón por la que los sistemas antiguos (permisos de archivos, la informática de la era PDP) agrupaban de tres en tres.",
            "Por eso la vista agrupa el binario de 4 en 4 y el hex de 2 en 2: cada grupo es exactamente un byte, así que un valor de 32 bits se muestra como ocho dígitos hex o cuatro nibbles binarios y los límites de byte se leen directamente en pantalla. Al revisar una máscara de bits o una cabecera de protocolo, esa alineación convierte \"contar los bits con cuidado\" en \"mirar los grupos\".",
            "La conversión en sí es posicional: un número en base b es la suma de cada dígito por b elevado a su posición. El hex solo reempaqueta el binario — 0xFF es 11111111 — así que la conversión hex-binario es mecánica, mientras que la decimal exige división real. Las cuatro vistas se sincronizan mientras escribe, con BigInt llevando el valor exacto a cualquier tamaño.",
          ],
        },
        {
          heading: "El complemento a dos: el mundo con signo que esta cuadrícula deja fuera a propósito",
          paragraphs: [
            "El hardware no almacena signos. Los enteros con signo usan complemento a dos: el bit más alto hace de signo y los negativos se forman invirtiendo todos los bits y sumando uno. Por eso −1 en 8 bits es 11111111, y el mismo patrón leído sin signo muestra 255. Un patrón de bits, dos valores: la correspondencia de bits a significado depende de la interpretación, y por eso esta herramienta convierte solo valores sin signo.",
            "La regla sin signo evita además la otra ambigüedad: las fracciones. Los números de coma flotante siguen IEEE 754, donde los bits se dividen en signo, exponente y mantisa; convertir ese patrón como entero da un número enorme sin relación con el valor decimal. Los volcados hex de floats solo tienen sentido con la codificación en la mano.",
            "Reserve este conversor para lo que sirve: patrones de bits, hashes, colores empaquetados en enteros, direcciones de memoria y banderas. Al portar un valor desde C, Rust o ensamblador, compruebe primero si la variable de origen era con signo; si lo era, interprete usted el bit más alto antes de fiarse del decimal aquí.",
          ],
        },
        {
          heading: "De dónde sale el límite de 2^53 y por qué importa BigInt",
          paragraphs: [
            "Los números ordinarios de JavaScript son flotantes de 64 bits, e IEEE 754 dedica 53 de esos bits a la mantisa. Todo entero hasta 2^53 — unos 9 cuatrillones — es exacto; más allá, los números se redondean al flotante representable más próximo: sumar 1 a 2^53 en JavaScript puro no cambia nada. Los ID, hashes y valores criptográficos superan esa línea con frecuencia, por lo que las cadenas hex de 64 bits pegadas en conversores ingenuos han vuelto históricamente mal.",
            "BigInt evita el problema representando los números como enteros de precisión arbitraria en lugar de flotantes, de modo que un hash de 256 bits o un decimal de 40 dígitos se convierten con exactitud a cualquier tamaño. El coste es despreciable para esta carga — la conversión sigue siendo instantánea — y las cuatro casillas concuerdan entre sí en lugar de redondear cada una por su cuenta.",
            "Una comprobación rápida cuando sospeche de precisión en otra parte: convierta el valor aquí y compárelo con lo que reportó otra herramienta. Si los dígitos bajos difieren, la otra herramienta redondeaba a través de flotantes — esta cuadrícula muestra el valor verdadero.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor binário",
      tagline: "Converta entre decimal, hexadecimal, octal e binário numa grade ao vivo — aceita inteiros de qualquer tamanho e agrupa dígitos para facilitar a leitura.",
      intro: [
        "Digite um número em qualquer um dos quatro campos — decimal, hex, octal ou binário — e os outros três atualizam na hora. Valores hex são agrupados de 2 em 2 dígitos e binários de 4 em 4, mantendo longas sequências legíveis.",
        "A conversão usa aritmética BigInt, sem teto de 32 ou 64 bits: cole um decimal de 40 dígitos ou um hex de 256 bits e todas as representações permanecem exatas.",
      ],
      steps: [
        "Digite ou cole um valor em qualquer campo — decimal, hex, octal ou binário.",
        "As outras três bases atualizam ao vivo enquanto você digita.",
        "Prefixos como 0x são opcionais; espaços de agrupamento são ignorados na leitura.",
      ],
      faqs: [
        {
          q: "Qual o maior número que o conversor aceita?",
          a: "Inteiros não negativos de qualquer tamanho. Os cálculos usam BigInt, então um hexadecimal de 256 bits é convertido com exatidão — bem além do limite de 2^53 dos números JavaScript comuns.",
        },
        {
          q: "Por que minha letra hexadecimal aparece como inválida?",
          a: "Cada base aceita apenas os próprios dígitos: binário 0–1, octal 0–7, decimal 0–9 e hexadecimal 0–9 mais a–f. Um espaço ou símbolo no meio do número também é rejeitado.",
        },
        {
          q: "Aceita negativos ou frações?",
          a: "Não — a grade converte apenas inteiros não negativos, que é o formato de padrões de bits, hashes e endereços de memória. Formatos com sinal ou decimais dependem de codificações (complemento de dois, IEEE 754) que tornariam a correspondência ambígua.",
        },
      ],
      deepDive: [
        {
          heading: "Por que hexadecimal e binário são a mesma língua",
          paragraphs: [
            "Um dígito hexadecimal codifica exatamente quatro bits: 0–9 mais a–f cobrem exatamente os dezesseis valores de um grupo de 4 bits. Não é uma conveniência que alguém escolheu: cada dígito hex corresponde a um padrão binário fixo de quatro bits (F = 1111, 8 = 1000), sem ambiguidade em nenhuma direção. O vale para o octal, a três bits por dígito — por isso sistemas antigos (permissões de arquivo, a computação da era PDP) agrupavam de três em três.",
            "É por isso que a exibição agrupa o binário de 4 em 4 e o hex de 2 em 2: cada grupo é exatamente um byte, então um valor de 32 bits aparece como oito dígitos hex ou quatro nibbles binários, e os limites de byte se leem direto na tela. Ao conferir uma máscara de bits ou um cabeçalho de protocolo, esse alinhamento transforma \"contar os bits com cuidado\" em \"olhar os grupos\".",
            "A conversão em si é posicional: um número na base b é a soma de cada dígito vezes b elevado à sua posição. O hex apenas reempacota o binário — 0xFF é 11111111 — então converter entre hex e binário é mecânico, enquanto a conversão decimal exige divisão de verdade. As quatro vistas ficam em sincronia enquanto você digita, com o BigInt carregando o valor exato em qualquer tamanho.",
          ],
        },
        {
          heading: "Complemento de dois: o mundo com sinal que esta grade deixa de fora de propósito",
          paragraphs: [
            "O hardware não guarda sinal. Inteiros com sinal usam complemento de dois: o bit mais alto faz vezes de sinal e os negativos se formam invertendo todos os bits e somando um. Por isso −1 em 8 bits é 11111111, e o mesmo padrão lido sem sinal mostra 255. Um padrão de bits, dois valores: a correspondência de bits para significado depende da interpretação, e é exatamente por isso que esta ferramenta converte apenas valores sem sinal.",
            "A regra sem sinal também contorna a outra ambiguidade: frações. Números de ponto flutuante seguem o IEEE 754, com os bits divididos em sinal, expoente e mantissa; converter esse padrão como inteiro comum dá um número enorme sem relação com o valor decimal. Despejos hex de floats só fazem sentido com a codificação em mãos.",
            "Reserve este conversor para o que ele serve: padrões de bits, hashes, cores empacotadas em inteiros, endereços de memória e flags. Ao portar um valor de C, Rust ou assembly, confira primeiro se a variável de origem era com sinal — se era, interprete você o bit mais alto antes de confiar no decimal aqui.",
          ],
        },
        {
          heading: "De onde vem o limite de 2^53 e por que o BigInt importa",
          paragraphs: [
            "Os números comuns do JavaScript são floats de 64 bits, e o IEEE 754 dedica 53 desses bits à mantissa. Todo inteiro até 2^53 — cerca de 9 quatrilhões — é exato; além disso, os números passam a ser arredondados para o float representável mais próximo: somar 1 a 2^53 em JavaScript puro não muda nada. IDs, hashes e valores criptográficos cruzam essa linha rotineiramente, e por isso strings hex de 64 bits coladas em conversores ingênuos historicamente voltavam erradas.",
            "O BigInt contorna o problema representando números como inteiros de precisão arbitrária em vez de floats, então um hash de 256 bits ou um decimal de 40 dígitos converte com exatidão em qualquer tamanho. O custo é desprezível para esta carga — a conversão continua instantânea — e o resultado é que os quatro campos concordam entre si em vez de arredondar cada um por conta própria.",
            "Uma verificação rápida quando suspeitar de precisão em outro lugar: converta o valor aqui e compare com o que outra ferramenta reportou. Se os dígitos finais divergem, a outra ferramenta arredondava através de floats — esta grade mostra o valor verdadeiro.",
          ],
        },
      ],
    },
  },
});
