/**
 * deepDive 补充模块 —— 收尾四件(crc16-modbus / lunar-calendar-converter /
 * ipv4-range-expander / file-splitter-merger)+ image-color-picker 补齐。
 */

import type { Locale } from "@/lib/site";

type Section = { heading: string; paragraphs: [string, string, string] };
const CORE = ["en", "zh", "ja", "es", "pt"] as const;

function pick5(map: Record<(typeof CORE)[number], Section[]>, locale: Locale): Section[] | undefined {
  // overlay 语种(fr/de/ru/it/tr/ko/ar/hi/id/vi)设计上回退英文深文:
  // 这些语种的界面与页面文案各有 overlay,但深文不铺(与全站既有约定一致)。
  return (map as Record<string, Section[] | undefined>)[locale] ?? map.en;
}

/** CRC-16/Modbus */
export function crc16DeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "Why the parameters matter more than the algorithm",
          paragraphs: [
            "CRC-16/Modbus is defined by a specific parameter set, and every one of them is easy to copy superficially and easy to get wrong in detail: width 16, polynomial 0x8005 used in reflected form as 0xA001, initial value 0xFFFF, input and output reflected, no final XOR. Change any single one and the checksum changes for every message, which is why implementations that look like CRC-16 routinely produce values no Modbus device accepts.",
            "The reflect-in and reflect-out choice comes from the wire, not from mathematics. Modbus transmits the least significant bit first, so reflecting both the polynomial and the data lets the shift register process bits in the order the cable delivers them, avoiding a per-byte bit reversal in the hot loop. That was a real optimisation on 8-bit microcontrollers and it became part of the protocol's definition.",
            "The 0xFFFF initial value is a deliberate departure from the classic 0x0000 start. It makes leading zero bytes contribute to the checksum instead of being invisible to it, which closes a class of undetected errors that would otherwise pass whenever a message begins with zeros.",
          ],
        },
        {
          heading: "Two byte orders, and what a checksum can never tell you",
          paragraphs: [
            "The 16-bit result has two equally legitimate presentations. As a number it is written high byte first — CDC5 for the reference frame 01 03 00 00 00 0A; on a Modbus RTU wire the low byte goes first, so the frame carries C5 CD. Both encode the same arithmetic, and a tool that shows only one invites the classic bug where a correct CRC is appended in the wrong order and the device silently drops the frame.",
            "A CRC detects accidental corruption: single-bit errors, short bursts, and most multi-bit patterns within its guaranteed distance. It is not a signature. Recomputing a CRC after a deliberate modification is trivial arithmetic, so a valid CRC proves only that the bytes are internally consistent — never that they came from an authorised sender or that nobody altered them.",
            "The reference vector matters more than it looks. Checking the published frame against CDC5 confirms the entire parameter set in one step; an implementation that agrees on one standard vector and disagrees on another is usually wrong in exactly one parameter, and finding which one is much easier when both values are printed separately.",
          ],
        },
      ],
      zh: [
        {
          heading: "为什么参数比算法本身更重要",
          paragraphs: [
            "CRC-16/Modbus 由一组特定参数定义,每一项都表面容易照抄、细节容易弄错:位宽 16、多项式 0x8005 以反射形式 0xA001 使用、初值 0xFFFF、输入输出都反射、末尾不异或。改动其中任何一项,每条报文的校验值都会变——这正是「看起来像 CRC-16」的实现经常产出任何 Modbus 设备都不接受的数值的原因。",
            "输入输出反射这个选择来自线缆,而不是来自数学。Modbus 按最低有效位先传,所以同时反射多项式与数据,能让移位寄存器按线缆投递比特的顺序处理,避免热循环里逐字节反转比特。这在 8 位单片机上是真实的优化,后来成了协议定义的一部分。",
            "0xFFFF 初值是对经典 0x0000 起点的刻意偏离。它让前导零字节对校验值有贡献,而不是对校验隐形,从而堵住一类「报文以零开头就会被漏检」的错误。",
          ],
        },
        {
          heading: "两种字节顺序,以及校验值永远无法告诉你的事",
          paragraphs: [
            "16 位结果有两种同样合理的呈现。作为数值按高字节在前书写——参考帧 01 03 00 00 00 0A 写作 CDC5;在 Modbus RTU 线路上低字节先发,所以报文携带 C5 CD。两者编码同一套算术,而只显示其中之一的工具会诱发那个经典 bug:CRC 算对了,却以错误顺序附加,设备静默丢帧。",
            "CRC 检测的是意外损坏:单比特错误、短突发,以及在其保证距离内的大多数多比特模式。它不是签名。故意修改后重算 CRC 是平凡算术,所以一个合法 CRC 只证明这些字节内部自洽——绝不证明来自被授权的发送方,也不证明没人动过。",
            "参考向量的重要性超过它看起来的程度。把公开报文与 CDC5 对照,一步确认整套参数;一个实现能对上一个标准向量却对不上另一个,通常恰好错在某一个参数上,而当两个值分别打印时,找出是哪一个要容易得多。",
          ],
        },
      ],
      ja: [
        {
          heading: "アルゴリズムよりパラメータが重要な理由",
          paragraphs: [
            "CRC-16/Modbus は特定のパラメータ一式で定義され、どれも表面的には写しやすく細部では間違えやすいものです。幅 16、多項式 0x8005 を反射形 0xA001 として使用、初期値 0xFFFF、入力と出力を反射、最終 XOR なし。どれか一つ変えればすべてのメッセージのチェックサムが変わり、CRC-16 に見える実装がどの Modbus 機器も受け付けない値を出すのはそのためです。",
            "入力・出力反射は数学ではなく線路に由来します。Modbus は最下位ビット先に送るので、多項式とデータを同時に反射すればシフトレジスタは線路が届ける順でビットを処理でき、ホットループ内のバイト単位ビット反転を避けられます。8 ビットマイコンでの実際の最適化が、のちにプロトコル定義の一部になりました。",
            "0xFFFF の初期値は古典的な 0x0000 開始からの意図的な逸脱です。先頭のゼロバイトがチェックサムに寄与し、不可視でなくなるため、メッセージがゼロで始まるときに見逃される一類の誤りを塞ぎます。",
          ],
        },
        {
          heading: "二つのバイト順と、チェックサムが決して告げられないこと",
          paragraphs: [
            "16 ビット結果には二つの同等に正当な提示があります。数値としては高バイト先 — 参照フレーム 01 03 00 00 00 0A は CDC5。Modbus RTU の線路上では低バイト先なので、フレームは C5 CD を運びます。両者は同じ算術を符号化しており、片方だけ示すツールは定番のバグを誘います。正しく計算した CRC を誤った順序で付加し、機器がフレームを静かに捨てます。",
            "CRC は偶発的な破損を検出します。単一ビット誤り、短いバースト、保証距離内のほとんどの多ビットパターン。署名ではありません。意図的な変更後に CRC を再計算するのは自明な算術なので、妥当な CRC はバイトが内部整合していることだけを証明し、正規の送信者から来たことや誰も改変していないことは決して証明しません。",
            "参照ベクトルは見た目以上に重要です。公表されたフレームを CDC5 と照合すればパラメータ一式を一手で確認できます。ある標準ベクトルに一致し別に一致しない実装は、たいていちょうど一つのパラメータが誤っており、二つの値が別々に表示されればどれかを見つけるのがはるかに容易です。",
          ],
        },
      ],
      es: [
        {
          heading: "Por qué los parámetros importan más que el algoritmo",
          paragraphs: [
            "CRC-16/Modbus se define con un conjunto específico de parámetros, y cada uno es fácil de copiar superficialmente y fácil de equivocar en detalle: ancho 16, polinomio 0x8005 en forma reflejada como 0xA001, valor inicial 0xFFFF, entrada y salida reflejadas, sin XOR final. Cambiar uno solo cambia la suma para cada mensaje, y por eso implementaciones que parecen CRC-16 producen rutinariamente valores que ningún dispositivo Modbus acepta.",
            "La elección de reflejar entrada y salida viene del cable, no de la matemática. Modbus transmite el bit menos significativo primero, así que reflejar polinomio y datos permite al registro de desplazamiento procesar bits en el orden en que el cable los entrega, evitando una inversión de bits por byte en el bucle caliente. Fue una optimización real en microcontroladores de 8 bits y se volvió parte de la definición del protocolo.",
            "El valor inicial 0xFFFF es una desviación deliberada del clásico 0x0000. Hace que los bytes cero iniciales contribuyan a la suma en vez de ser invisibles, cerrando una clase de errores no detectados que pasarían siempre que un mensaje empiece con ceros.",
          ],
        },
        {
          heading: "Dos órdenes de bytes y lo que una suma nunca puede decirte",
          paragraphs: [
            "El resultado de 16 bits tiene dos presentaciones igualmente legítimas. Como número se escribe byte alto primero — CDC5 para la trama de referencia 01 03 00 00 00 0A; en un cable Modbus RTU el byte bajo va primero, así que la trama lleva C5 CD. Ambos codifican la misma aritmética, y una herramienta que muestra solo uno invita al bug clásico donde un CRC correcto se añade en el orden equivocado y el dispositivo descarta la trama en silencio.",
            "Un CRC detecta corrupción accidental: errores de un bit, ráfagas cortas y la mayoría de patrones multi-bit dentro de su distancia garantizada. No es una firma. Recalcular un CRC tras una modificación deliberada es aritmética trivial, así que un CRC válido prueba solo que los bytes son internamente consistentes, nunca que vinieron de un remitente autorizado ni que nadie los alteró.",
            "El vector de referencia importa más de lo que parece. Comprobar la trama publicada contra CDC5 confirma todo el conjunto de parámetros en un paso; una implementación que coincide en un vector estándar y difiere en otro suele estar equivocada en exactamente un parámetro, y encontrar cuál es mucho más fácil cuando ambos valores se imprimen por separado.",
          ],
        },
      ],
      pt: [
        {
          heading: "Por que os parâmetros importam mais que o algoritmo",
          paragraphs: [
            "CRC-16/Modbus é definido por um conjunto específico de parâmetros, e cada um é fácil de copiar superficialmente e fácil de errar em detalhe: largura 16, polinômio 0x8005 na forma refletida 0xA001, valor inicial 0xFFFF, entrada e saída refletidas, sem XOR final. Mudar um só muda a soma para cada mensagem, e é por isso que implementações que parecem CRC-16 produzem rotineiramente valores que nenhum dispositivo Modbus aceita.",
            "A escolha de refletir entrada e saída vem do cabo, não da matemática. Modbus transmite o bit menos significativo primeiro, então refletir polinômio e dados permite ao registrador de deslocamento processar bits na ordem em que o cabo os entrega, evitando uma inversão de bits por byte no laço quente. Foi uma otimização real em microcontroladores de 8 bits e virou parte da definição do protocolo.",
            "O valor inicial 0xFFFF é um desvio deliberado do clássico 0x0000. Faz os bytes zero iniciais contribuírem para a soma em vez de serem invisíveis, fechando uma classe de erros não detectados que passariam sempre que uma mensagem começa com zeros.",
          ],
        },
        {
          heading: "Duas ordens de bytes e o que uma soma nunca pode dizer",
          paragraphs: [
            "O resultado de 16 bits tem duas apresentações igualmente legítimas. Como número é escrito byte alto primeiro — CDC5 para a trama de referência 01 03 00 00 00 0A; num cabo Modbus RTU o byte baixo vai primeiro, então a trama carrega C5 CD. Ambos codificam a mesma aritmética, e uma ferramenta que mostra só um deles convida ao bug clássico em que um CRC correto é anexado na ordem errada e o dispositivo descarta a trama em silêncio.",
            "Um CRC detecta corrupção acidental: erros de um bit, rajadas curtas e a maioria dos padrões multi-bit dentro da sua distância garantida. Não é uma assinatura. Recalcular um CRC após modificação deliberada é aritmética trivial, então um CRC válido prova apenas que os bytes são internamente consistentes — nunca que vieram de remetente autorizado nem que ninguém os alterou.",
            "O vetor de referência importa mais do que parece. Conferir a trama publicada contra CDC5 confirma todo o conjunto de parâmetros num passo; uma implementação que concorda num vetor padrão e discorda noutro costuma estar errada em exatamente um parâmetro, e achar qual é muito mais fácil quando ambos os valores são impressos separadamente.",
          ],
        },
      ],
    },
    locale,
  );
}

/** 农历转换 */
export function lunarDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "The Chinese calendar is astronomical, not arithmetical",
          paragraphs: [
            "The lunar calendar used in China is lunisolar: months begin on the day of the astronomical new moon, and the year begins on the second new moon after the winter solstice (with an exception that allows the first if it falls before a certain date). Because new moon instants and solstice instants are computed from ephemerides rather than from a fixed rule, the calendar cannot be regenerated from a simple formula — it must be tabulated.",
            "That is why the leap month is not on a fixed schedule. A leap month is inserted in years that contain thirteen new moons between successive winter solstices, and the leap month takes the number of the month that does not contain a principal term (zhongqi). Getting the leap month wrong shifts the whole second half of the year, so a converter that guesses is not approximately right — it is off by a month.",
            "The honest design consequence is that the conversion has to depend on a table covering a bounded range, and the table has to be pinned to a published source. A library that extrapolates past its tabulated range produces dates that look plausible and are wrong, which is the worst failure mode for a calendar tool.",
          ],
        },
        {
          heading: "Ganzhi, zodiac and the two things people most often confuse",
          paragraphs: [
            "The sexagenary cycle (干支) is two interlocking cycles of ten heavenly stems and twelve earthly branches, which pair up to produce sixty combinations before repeating. The year's ganzhi is conventionally reckoned from the lunar new year in everyday usage, while other reckonings (from the winter solstice, or from lichun) exist in specific technical contexts — and a tool that mixes them produces a stem-branch that disagrees with whatever the user's other reference says.",
            "The zodiac animal follows from the earthly branch, so it changes with the year boundary for the same reason. Anyone born in late January or early February sits in the gap where solar and lunar new years differ, and the correct answer depends entirely on which convention the question is asking about — which is why this tool states its convention rather than asserting one answer.",
            "Solar terms (节气) are the third element worth pinning down. They are defined by the sun's apparent longitude at fifteen-degree intervals, not by lunar month boundaries, so a term can fall inside any lunar month or span the boundary. Reporting the term active on the converted date is a factual statement; implying the term defines the month would be wrong.",
          ],
        },
      ],
      zh: [
        {
          heading: "中国农历是天文历,不是算术历",
          paragraphs: [
            "中国使用的农历是阴阳合历:月份始于天文新月(朔)所在之日,年始于冬至之后的第二个新月(有例外:若第一个新月落在某个日期之前则可用它)。因为朔的时刻与冬至的时刻是从星历表算出来的,而不是来自固定规则,这部历法无法用一条简单公式重算——它必须被制成表。",
            "这就是闰月不在固定周期上的原因。当连续两个冬至之间出现十三个新月时,该年置闰,而闰月取那个不含中气的月份的编号。闰月弄错,下半年整体错位,所以一个靠猜的转换器不是「大致对」——它整整差一个月。",
            "由此得出的诚实设计后果是:转换必须依赖一张覆盖有界范围的表,而这张表必须锚定到公开来源。一个外推到制表范围之外的库,会产出看起来合理却是错的日期——对一个日历工具而言这是最糟糕的失败模式。",
          ],
        },
        {
          heading: "干支、生肖,以及人们最常混淆的两件事",
          paragraphs: [
            "六十甲子(干支)是两个互相咬合的循环——十位天干与十二位地支,配对后产生六十个组合再重复。日常使用中,年的干支惯例上从农历新年起算,而其它起算方式(从冬至、或从立春)存在于特定技术语境中——一个混用它们的工具,会产出与用户别的参考资料相矛盾的干支。",
            "生肖由地支推出,所以它随年界变化的原因完全相同。任何出生在一月下旬或二月上旬的人,正处在太阳年与农历年不一致的那段缝隙里,正确答案完全取决于问题在问哪种惯例——所以本工具明说自己的惯例,而不是断言某一个答案。",
            "节气是第三个值得钉住的要素。节气由太阳视黄经相差十五度的位置定义,不由农历月界定义,所以一个节气可能落在任何农历月内,也可能跨越月界。报告转换日期当天生效的节气是事实陈述;暗示节气定义了月份就是错的。",
          ],
        },
      ],
      ja: [
        {
          heading: "中国暦は天文暦であり算術暦ではない",
          paragraphs: [
            "中国で使われる旧暦は陰陽暦です。月は天文上の新月(朔)の日に始まり、年は冬至の後の二度目の新月に始まります(例外として、最初の新月がある日付より前に来る場合はそれを使えます)。朔の瞬間と冬至の瞬間は天体暦から計算され固定規則からではないため、この暦は単純な式で再生成できません。表にする必要があります。",
            "閏月が固定周期にない理由でもあります。連続する冬至の間に 13 回の新月が入る年には閏月が置かれ、閏月は中気を含まない月の番号を取ります。閏月を間違えると後半がまるごとずれるので、推測する変換器は「だいたい正しい」ではなく、ひと月ずれます。",
            "正直な設計上の帰結は、変換が有界の範囲を覆う表に依存し、その表が公表された出典に固定される必要があることです。表の範囲を超えて外挿するライブラリは、もっともらしく見えて誤った日付を出します。暦ツールにとって最悪の失敗モードです。",
          ],
        },
        {
          heading: "干支、干支と動物、そして最も混同される二点",
          paragraphs: [
            "六十干支は十干と十二支という二つの噛み合う循環で、組み合わせて 60 通りを作り繰り返します。日常では年の干支は旧暦の新年から数えるのが慣例で、他の起点(冬至から、または立春から)は特定の技術的文脈に存在します。これらを混ぜるツールは、利用者の別の参考資料と食い違う干支を出します。",
            "動物は地支から導かれ、年境界で変わる理由もまったく同じです。1 月下旬や 2 月上旬に生まれた人は、太陽年と旧暦の新年が食い違う隙間に位置し、正しい答えは問いがどちらの慣例を問うかに完全に依存します。だから本ツールは一つの答えを断定せず、自分の慣例を明示します。",
            "二十四節気は固定すべき第三の要素です。節気は太陽の視黄経が 15 度ごとに来る位置で定義され、旧暦の月境界では定義されません。よって節気は任意の旧暦月の内側にも月境界をまたいでも来ます。変換日当日に有効な節気を報告することは事実の陳述であり、節気が月を定義すると示唆するのは誤りです。",
          ],
        },
      ],
      es: [
        {
          heading: "El calendario chino es astronómico, no aritmético",
          paragraphs: [
            "El calendario lunar usado en China es lunisolar: los meses comienzan el día de la luna nueva astronómica, y el año comienza en la segunda luna nueva tras el solsticio de invierno (con una excepción que permite la primera si cae antes de cierta fecha). Como los instantes de luna nueva y solsticio se calculan de efemérides y no de una regla fija, el calendario no puede regenerarse con una fórmula simple — tiene que estar tabulado.",
            "Esa es la razón por la que el mes bisiesto no sigue un calendario fijo. Un mes intercalar se inserta en años que contienen trece lunas nuevas entre solsticios sucesivos, y toma el número del mes que no contiene un término principal (zhongqi). Equivocar el mes bisiesto desplaza toda la segunda mitad del año, así que un conversor que adivina no está «más o menos bien»: está desfasado un mes entero.",
            "La consecuencia honesta de diseño es que la conversión tiene que depender de una tabla que cubre un rango acotado, y la tabla tiene que estar anclada a una fuente publicada. Una librería que extrapola más allá de su rango tabulado produce fechas que parecen plausibles y son incorrectas, que es el peor modo de fallo para una herramienta de calendario.",
          ],
        },
        {
          heading: "Ganzhi, zodiaco y las dos cosas que más se confunden",
          paragraphs: [
            "El ciclo sexagenario (干支) son dos ciclos entrelazados de diez troncos celestes y doce ramas terrestres, que se emparejan para producir sesenta combinaciones antes de repetir. El ganzhi del año se calcula convencionalmente desde el año nuevo lunar en el uso cotidiano, mientras existen otras convenciones (desde el solsticio de invierno, o desde lichun) en contextos técnicos específicos — y una herramienta que las mezcla produce un tronco-rama que discrepa de cualquier otra referencia del usuario.",
            "El animal del zodiaco se deriva de la rama terrestre, así que cambia con el límite del año por la misma razón. Quien nace a finales de enero o principios de febrero está en la brecha donde el año solar y el lunar difieren, y la respuesta correcta depende por completo de qué convención pregunta la pregunta — por eso esta herramienta declara su convención en vez de afirmar una respuesta.",
            "Los términos solares (节气) son el tercer elemento digno de fijarse. Se definen por la longitud aparente del sol a intervalos de quince grados, no por los límites de los meses lunares, así que un término puede caer dentro de cualquier mes lunar o cruzar el límite. Informar el término activo en la fecha convertida es una afirmación de hecho; insinuar que el término define el mes sería incorrecto.",
          ],
        },
      ],
      pt: [
        {
          heading: "O calendário chinês é astronômico, não aritmético",
          paragraphs: [
            "O calendário lunar usado na China é lunissolar: os meses começam no dia da lua nova astronômica, e o ano começa na segunda lua nova após o solstício de inverno (com uma exceção que permite a primeira se cair antes de certa data). Como os instantes de lua nova e solstício são calculados de efemérides e não de uma regra fixa, o calendário não pode ser regenerado com uma fórmula simples — precisa ser tabulado.",
            "É por isso que o mês bissexto não segue um calendário fixo. Um mês intercalar é inserido em anos que contêm treze luas novas entre solstícios sucessivos, e toma o número do mês que não contém um termo principal (zhongqi). Errar o mês bissexto desloca toda a segunda metade do ano, então um conversor que adivinha não está «mais ou menos certo»: está deslocado um mês inteiro.",
            "A consequência honesta de design é que a conversão precisa depender de uma tabela que cobre um intervalo limitado, e a tabela precisa estar ancorada numa fonte publicada. Uma biblioteca que extrapola além do seu intervalo tabelado produz datas que parecem plausíveis e estão erradas — o pior modo de falha para uma ferramenta de calendário.",
          ],
        },
        {
          heading: "Ganzhi, zodíaco e as duas coisas mais confundidas",
          paragraphs: [
            "O ciclo sexagenário (干支) são dois ciclos entrelaçados de dez troncos celestes e doze ramos terrestres, que se emparelham para produzir sessenta combinações antes de repetir. O ganzhi do ano é convencionalmente contado a partir do ano novo lunar no uso cotidiano, enquanto outras contagens (do solstício de inverno, ou de lichun) existem em contextos técnicos específicos — e uma ferramenta que as mistura produz um tronco-ramo que discorda de qualquer outra referência do usuário.",
            "O animal do zodíaco deriva do ramo terrestre, então muda com o limite do ano pela mesma razão. Quem nasce no fim de janeiro ou início de fevereiro está na brecha onde o ano solar e o lunar diferem, e a resposta correta depende inteiramente de qual convenção a pergunta pergunta — por isso esta ferramenta declara sua convenção em vez de afirmar uma resposta.",
            "Os termos solares (节气) são o terceiro elemento que vale fixar. São definidos pela longitude aparente do sol a intervalos de quinze graus, não pelos limites dos meses lunares, então um termo pode cair dentro de qualquer mês lunar ou cruzar o limite. Informar o termo ativo na data convertida é uma afirmação de fato; insinuar que o termo define o mês seria errado.",
          ],
        },
      ],
    },
    locale,
  );
}

/** IPv4 区间展开 */
export function ipv4RangeDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "Why an address is four bytes, not four decimal numbers",
          paragraphs: [
            "An IPv4 address is a 32-bit integer. The dotted form is a convenient notation that splits those 32 bits into four groups of eight, but every operation worth doing — comparing two addresses, testing containment in a range, computing a prefix — happens on the integer. Converting dotted notation to an integer and back is therefore the first correctness-critical step, and the failure mode is subtle: an off-by-one in the byte order produces an address that is a valid dotted quad and refers to entirely different host.",
            "Range expansion is where this matters most. A range from 10.0.0.1 to 10.0.0.5 contains five addresses; from 10.0.0.1 to 10.0.1.1 contains 257; from 10.0.0.1 to 10.1.0.1 contains 65,793. Counting inclusively means the first and last addresses are both members, and every off-by-one in that count produces a list that looks plausible and is wrong by one at each end.",
            "Big-endian is not an arbitrary choice here. The dotted notation’s octets are the 32 bits read from the most significant side, so the first octet is the highest-order byte. Doing the arithmetic on the integer and converting back through the same order is what keeps the tool’s output matching what a network engineer expects when they ping the endpoints.",
          ],
        },
        {
          heading: "Memory, limits, and why the tool refuses instead of truncating",
          paragraphs: [
            "A /16 contains 65,536 addresses and expanding it produces 65,536 lines of text. That is a legitimate operation — people do want the full list for blocklists or test vectors — but it is also the point where a naive implementation locks the interface while it builds a string. The honest handling is a stated ceiling with an explicit truncated flag, so the user knows whether they are looking at the complete set or a prefix of it.",
            "Truncating silently is worse than refusing, because a truncated blocklist that looks complete is a blocklist with holes. When the range exceeds what the tool will enumerate, it must say so in the output rather than in a footnote, and the copy here states the cap and the flag.",
            "Reversed ranges are the other trap. A range whose end is smaller than its start is not an empty range, it is an error in the caller’s head: the intent was a range, the input describes an impossibility. Reporting the inversion rather than swapping the endpoints silently is the difference between a tool that helps you find your bug and one that hides it in a plausible-looking list.",
          ],
        },
      ],
      zh: [
        {
          heading: "为什么一个地址是四个字节,而不是四个十进制数",
          paragraphs: [
            "IPv4 地址是一个 32 位整数。点分形式只是一种方便的记法,把这 32 位拆成四组八位,但所有值得做的操作——比较两个地址、判断是否落在一个区间内、计算前缀——都发生在整数上。因此,点分记法与整数之间的互相转换是第一个关乎正确性的步骤,而它的失败方式很微妙:字节序上的差一,会产出一个合法的点分四元组,却指向完全不同的主机。",
            "区间展开是这件事最要紧的地方。从 10.0.0.1 到 10.0.0.5 含五个地址;从 10.0.0.1 到 10.0.1.1 含 257 个;从 10.0.0.1 到 10.1.0.1 含 65,793 个。闭区间意味着首尾地址都是成员,而这个计数里任何差一,都会产出一个看起来合理、却在两端各错一个的列表。",
            "这里用大端并不是随意选择。点分记法的各个八位组,是按从最高位那一侧开始的 32 位来读的,所以第一个八位组就是最高位字节。在整数上做算术、再按同一顺序转回,才能让工具的输出与网络工程师 ping 端点时的预期一致。",
          ],
        },
        {
          heading: "内存、上限,以及为什么工具选择拒绝而不是截断",
          paragraphs: [
            "一个 /16 含 65,536 个地址,展开它就产出 65,536 行文本。这是一个正当操作——人们确实需要完整列表来做黑名单或测试向量——但它也正是天真实现在构建字符串时会锁死界面的那个点。诚实的处理方式是声明上限并提供明确的截断标志,让用户知道自己看到的是完整集合,还是它的前缀。",
            "静默截断比拒绝更糟,因为一份看起来完整的截断黑名单,是一份有洞的黑名单。当区间超出工具愿意枚举的范围时,必须在输出里说明,而不是写在脚注里——这里的文案声明了上限与标志。",
            "逆序区间是另一个陷阱。结束小于开始的区间不是空区间,而是调用方脑子里的错误:意图是区间,输入描述的却是不可能。报告这个倒置、而不是悄悄交换两端,是「帮你找到自己 bug 的工具」与「把 bug 藏进一份看起来合理的列表的工具」之间的差别。",
          ],
        },
      ],
      ja: [
        {
          heading: "アドレスが 4 バイトであって 4 つの十進数ではない理由",
          paragraphs: [
            "IPv4 アドレスは 32 ビット整数です。ドット表記はその 32 ビットを 8 ビットずつ四つに分ける便利な記法にすぎませんが、価値のある操作 — 二つのアドレスの比較、範囲内かどうかの判定、プレフィックスの計算 — はすべて整数上で起こります。したがってドット表記と整数の相互変換が最初の正確性クリティカルな段階で、失敗の仕方は微妙です。バイト順の off-by-one は、妥当なドット四つ組でありながら全く別のホストを指すアドレスを生みます。",
            "範囲展開はこれが最も効く場所です。10.0.0.1 から 10.0.0.5 は 5 個、10.0.0.1 から 10.0.1.1 は 257 個、10.0.0.1 から 10.1.0.1 は 65,793 個を含みます。閉区間は先頭と末尾の両方がメンバーで、その数え方の off-by-one は、もっともらしく見えて両端で一つずつずれたリストを生みます。",
            "ここでビッグエンディアンは恣意的な選択ではありません。ドット表記のオクテットは 32 ビットを最上位側から読んだもので、最初のオクテットが最上位バイトです。整数で算術して同じ順で戻すことが、ツールの出力をネットワーク技術者が端点を ping するときの期待に一致させます。",
          ],
        },
        {
          heading: "メモリ、上限、そして切り詰めずに拒否する理由",
          paragraphs: [
            "a /16 は 65,536 個のアドレスを含み、展開すると 65,536 行のテキストになります。これは正当な操作です — ブロックリストやテストベクタのために完全なリストを求める人はいます — しかし素朴な実装が文字列を構築しながら UI を固める点でもあります。正直な扱いは上限を明示し明示的な truncated フラグを付けることで、利用者は完全な集合を見ているのかその接頭辞なのかを知ります。",
            "黙って切り詰めるのは拒否より悪いです。完全に見える切り詰めブロックリストは穴のあるブロックリストだからです。範囲がツールの列挙を超えるとき、脚注ではなく出力の中でそう述べなければならず、ここでの文案は上限とフラグを明記します。",
            "逆順の範囲はもう一つの罠です。終端が開始より小さい範囲は空の範囲ではなく、呼び出し側の頭の中の誤りです。意図は範囲、入力は不可能を記述しています。端点を黙って入れ替えるのではなく反転を報告することは、「自分のバグを見つけるのを助けるツール」と「バグをもっともらしいリストに隠すツール」の違いです。",
          ],
        },
      ],
      es: [
        {
          heading: "Por qué una dirección son cuatro bytes, no cuatro números decimales",
          paragraphs: [
            "Una dirección IPv4 es un entero de 32 bits. La forma con puntos es una notación conveniente que parte esos 32 bits en cuatro grupos de ocho, pero toda operación que vale la pena — comparar dos direcciones, probar contención en un rango, calcular un prefijo — ocurre sobre el entero. Convertir notación con puntos a entero y de vuelta es por tanto el primer paso crítico para la corrección, y el modo de fallo es sutil: un off-by-one en el orden de bytes produce una dirección que es un cuádruple con puntos válido y se refiere a un host completamente distinto.",
            "La expansión de rangos es donde esto más importa. Un rango de 10.0.0.1 a 10.0.0.5 contiene cinco direcciones; de 10.0.0.1 a 10.0.1.1 contiene 257; de 10.0.0.1 a 10.1.0.1 contiene 65.793. Contar de forma inclusiva significa que la primera y la última son ambas miembros, y cualquier off-by-one en ese conteo produce una lista que parece plausible y está mal por uno en cada extremo.",
            "Big-endian no es una elección arbitraria aquí. Los octetos de la notación con puntos son los 32 bits leídos desde el lado más significativo, así que el primer octeto es el byte de mayor orden. Hacer la aritmética sobre el entero y convertir de vuelta por el mismo orden es lo que mantiene la salida de la herramienta coincidiendo con lo que un ingeniero de red espera al hacer ping a los extremos.",
          ],
        },
        {
          heading: "Memoria, límites y por qué la herramienta rechaza en vez de truncar",
          paragraphs: [
            "Una /16 contiene 65.536 direcciones y expandirla produce 65.536 líneas de texto. Es una operación legítima — la gente sí quiere la lista completa para blocklists o vectores de prueba — pero también es el punto donde una implementación ingenua congela la interfaz mientras construye una cadena. El manejo honesto es un techo declarado con un flag truncado explícito, para que el usuario sepa si está viendo el conjunto completo o un prefijo.",
            "Truncar en silencio es peor que rechazar, porque una blocklist truncada que parece completa es una blocklist con agujeros. Cuando el rango excede lo que la herramienta enumerará, debe decirlo en la salida en vez de en una nota al pie, y el copy aquí declara el tope y el flag.",
            "Los rangos invertidos son la otra trampa. Un rango cuyo fin es menor que su inicio no es un rango vacío, es un error en la cabeza de quien llama: la intención era un rango, la entrada describe una imposibilidad. Informar la inversión en vez de intercambiar los extremos en silencio es la diferencia entre una herramienta que te ayuda a encontrar tu bug y una que lo esconde en una lista de aspecto plausible.",
          ],
        },
      ],
      pt: [
        {
          heading: "Por que um endereço são quatro bytes, não quatro números decimais",
          paragraphs: [
            "Um endereço IPv4 é um inteiro de 32 bits. A forma pontuada é uma notação conveniente que parte esses 32 bits em quatro grupos de oito, mas toda operação que vale a pena — comparar dois endereços, testar contenção num intervalo, calcular um prefixo — acontece sobre o inteiro. Converter notação pontuada para inteiro e de volta é portanto o primeiro passo crítico de correção, e o modo de falha é sutil: um off-by-one na ordem de bytes produz um endereço que é um quádruplo pontuado válido e se refere a um host completamente diferente.",
            "A expansão de intervalos é onde isso mais importa. Um intervalo de 10.0.0.1 a 10.0.0.5 contém cinco endereços; de 10.0.0.1 a 10.0.1.1 contém 257; de 10.0.0.1 a 10.1.0.1 contém 65.793. Contar de forma inclusiva significa que o primeiro e o último são ambos membros, e qualquer off-by-one nessa contagem produz uma lista que parece plausível e está errada por um em cada extremo.",
            "Big-endian não é uma escolha arbitrária aqui. Os octetos da notação pontuada são os 32 bits lidos do lado mais significativo, então o primeiro octeto é o byte de maior ordem. Fazer a aritmética sobre o inteiro e converter de volta pela mesma ordem é o que mantém a saída da ferramenta coincidindo com o que um engenheiro de rede espera ao pingar os extremos.",
          ],
        },
        {
          heading: "Memória, limites e por que a ferramenta recusa em vez de truncar",
          paragraphs: [
            "Uma /16 contém 65.536 endereços e expandi-la produz 65.536 linhas de texto. É uma operação legítima — pessoas realmente querem a lista completa para blocklists ou vetores de teste — mas também é o ponto onde uma implementação ingênua congela a interface enquanto constrói uma string. O tratamento honesto é um teto declarado com uma flag truncado explícita, para o usuário saber se está vendo o conjunto completo ou um prefixo.",
            "Truncar em silêncio é pior que recusar, porque uma blocklist truncada que parece completa é uma blocklist com buracos. Quando o intervalo excede o que a ferramenta enumerará, ela precisa dizer isso na saída em vez de numa nota de rodapé, e o copy aqui declara o teto e a flag.",
            "Intervalos invertidos são a outra armadilha. Um intervalo cujo fim é menor que seu início não é um intervalo vazio, é um erro na cabeça de quem chama: a intenção era um intervalo, a entrada descreve uma impossibilidade. Informar a inversão em vez de trocar os extremos em silêncio é a diferença entre uma ferramenta que ajuda a achar seu bug e uma que o esconde numa lista de aparência plausível.",
          ],
        },
      ],
    },
    locale,
  );
}

/** 文件拆分/合并 */
export function filePartsDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "Splitting is byte arithmetic, and the last part is the tell",
          paragraphs: [
            "A split file is a byte stream cut into fixed-size chunks. Nothing is added and nothing is removed, which means the sum of the parts is exactly the original size and the final part is usually shorter. If the last part is exactly the same size as the others, either the file size happens to divide evenly or something was padded — and padding changes the reassembled file in a way that only shows up when the last bytes matter.",
            "Part names matter as much as part contents. A convention that sorts correctly as text is the difference between a reassembly that works and one that silently interleaves. Numbering with a fixed-width suffix, or with a zero-padded index before the extension, keeps lexical order equal to numerical order — which is what every naive concatenation script assumes.",
            "Merging then becomes strictly ordered concatenation, and the honest requirement is that the parts all came from the same source. Merging parts from two different files produces a valid file of the wrong length, and no checksum in the parts themselves can detect it — which is why the tool reports the total size and the part count so a reviewer can compare against what they expected.",
          ],
        },
        {
          heading: "Where browser limits bite, and what to do instead",
          paragraphs: [
            "Splitting large files in a browser means holding the file and the parts in memory at the same time. That works up to a few hundred megabytes on a modern machine and fails in ways that are hard to diagnose beyond it, so a stated ceiling is more useful than a crash. The honest alternative for genuinely large data is a desktop tool or a streaming script — and the copy says so rather than implying the browser handles anything.",
            "Merging has the mirror problem: every part must be read into memory before they can be concatenated, so the ceiling applies to the total, not to each part. Showing the running total as parts are added turns a later failure into a visible limit.",
            "The reassembly guarantee is worth stating precisely. Byte-exact concatenation of the same parts in the same order reproduces the original exactly, and nothing else does. Renaming, reordering, re-compressing or editing any part breaks it, and no tool can tell from the parts alone which of those happened — so the tool states the requirement instead of pretending to verify it.",
          ],
        },
      ],
      zh: [
        {
          heading: "拆分是字节算术,而最后一块会说话",
          paragraphs: [
            "拆分后的文件就是被切成定长块的字节流。没有添加、没有移除,这意味着各块之和恰好等于原始大小,而最后一块通常更短。如果最后一块与其它块大小完全一致,要么文件大小正好整除,要么某处被填充了——而填充会以「只有末字节重要时才暴露」的方式改变重组后的文件。",
            "分块命名与分块内容同等重要。一个按文本排序正确的命名约定,是「重组能工作」与「重组会悄悄交错」之间的差别。用定宽后缀编号、或在扩展名前用补零索引,能让字典序等于数值序——而这正是所有天真的拼接脚本所假设的。",
            "于是合并就变成严格有序的拼接,而诚实的要求是:这些分块都来自同一个源。把两个不同文件的分块合并,会产出一个长度错误的合法文件,而分块自身没有任何校验能发现它——这就是工具会报告总大小与分块数的原因,让复核者能与预期对照。",
          ],
        },
        {
          heading: "浏览器限制在哪里咬人,以及该换什么办法",
          paragraphs: [
            "在浏览器里拆分大文件,意味着要同时把文件与各分块都留在内存里。这在现代机器上到几百兆都可行,超过之后就会以很难诊断的方式失败,所以声明上限比崩溃更有用。对真正大的数据,诚实的替代方案是桌面工具或流式脚本——文案也正是这样说的,而不是暗示浏览器什么都能扛。",
            "合并有镜像问题:每个分块都必须先读进内存才能拼接,所以上限针对的是总量而不是单块。随着分块被添加显示累计总量,能把后来的失败变成可见的限制。",
            "重组保证值得精确表述。同一批分块按同一顺序的逐字节拼接,才精确复现原文,其它任何做法都不行。重命名、重排、重压缩或编辑任一分块都会破坏它,而没有工具能从分块本身看出发生了哪一种——所以工具陈述这个要求,而不是假装验证了它。",
          ],
        },
      ],
      ja: [
        {
          heading: "分割はバイト算術であり、最後の断片が証拠になる",
          paragraphs: [
            "分割ファイルは固定長チャンクに切られたバイト列です。何も加えず何も除かないので、断片の総和はちょうど元のサイズで、最後の断片は通常より短くなります。最後の断片が他と同じサイズなら、ファイルサイズが割り切れたか、どこかがパディングされたかです。パディングは、末尾のバイトが重要なときにだけ現れる形で再結合ファイルを変えます。",
            "断片名は断片内容と同じくらい重要です。テキストとして正しくソートされる命名規則が、再結合が機能するか静かに交互配置になるかの差です。固定幅の接尾辞、または拡張子の前にゼロ埋めしたインデックスは、辞書順を数値順に等しくします。素朴な連結スクリプトが仮定しているのはそれです。",
            "結合は厳密に順序付けられた連結になり、正直な要件は断片がすべて同じ出所から来たことです。二つの異なるファイルの断片を結合すると、長さの違う妥当なファイルができ、断片自体のチェックサムでは検出できません。だからツールは総サイズと断片数を報告し、レビュー担当が期待と照合できるようにします。",
          ],
        },
        {
          heading: "ブラウザの限界が効く場所と、代わりに何をすべきか",
          paragraphs: [
            "ブラウザで大きなファイルを分割すると、ファイルと断片を同時にメモリに保持することになります。現代のマシンで数百 MB までは機能し、超えると診断しにくい形で失敗します。だから宣言された上限はクラッシュより有用です。本当に大きなデータには、正直な代替はデスクトップツールやストリーミングスクリプトで、文案もブラウザが何でも扱うと示唆せずそう述べます。",
            "結合は鏡像の問題を抱えます。各断片は連結前にメモリへ読む必要があるので、上限は各断片ではなく合計に適用されます。断片を追加するたびに累計を表示すれば、後での失敗が可視の限界になります。",
            "再結合の保証は正確に述べる価値があります。同じ断片を同じ順でバイトどおり連結することだけが元を正確に再現します。名前変更、並べ替え、再圧縮、いずれかの断片の編集はこれを壊し、断片自体からどれが起きたかを見るツールはありません。だからツールは検証を装わず要件を述べます。",
          ],
        },
      ],
      es: [
        {
          heading: "Dividir es aritmética de bytes, y la última parte es la prueba",
          paragraphs: [
            "Un archivo dividido es un flujo de bytes cortado en trozos de tamaño fijo. Nada se añade y nada se quita, lo que significa que la suma de las partes es exactamente el tamaño original y la última parte normalmente es más corta. Si la última parte tiene exactamente el mismo tamaño que las demás, o el tamaño del archivo se divide justo o algo se rellenó — y el relleno cambia el archivo reensamblado de una forma que solo aparece cuando los últimos bytes importan.",
            "Los nombres de parte importan tanto como los contenidos. Una convención que ordena correctamente como texto es la diferencia entre un reensamblado que funciona y uno que silenciosamente intercala. Numerar con sufijo de ancho fijo, o con un índice con ceros a la izquierda antes de la extensión, mantiene el orden léxico igual al numérico — que es lo que asume todo script de concatenación ingenuo.",
            "Fusionar se vuelve entonces concatenación estrictamente ordenada, y el requisito honesto es que todas las partes vengan de la misma fuente. Fusionar partes de dos archivos distintos produce un archivo válido de longitud equivocada, y ningún checksum en las partes puede detectarlo — por eso la herramienta reporta el tamaño total y el número de partes para que un revisor pueda comparar con lo esperado.",
          ],
        },
        {
          heading: "Dónde muerden los límites del navegador y qué hacer en su lugar",
          paragraphs: [
            "Dividir archivos grandes en un navegador significa mantener el archivo y las partes en memoria al mismo tiempo. Funciona hasta unos cientos de megabytes en una máquina moderna y falla de formas difíciles de diagnosticar más allá, así que un techo declarado es más útil que un crash. La alternativa honesta para datos genuinamente grandes es una herramienta de escritorio o un script en streaming — y el copy lo dice en vez de insinuar que el navegador aguanta cualquier cosa.",
            "Fusionar tiene el problema especular: cada parte debe leerse en memoria antes de poder concatenarse, así que el techo aplica al total, no a cada parte. Mostrar el total acumulado mientras se añaden partes convierte un fallo posterior en un límite visible.",
            "La garantía de reensamblado vale la pena enunciarla con precisión. La concatenación exacta en bytes de las mismas partes en el mismo orden reproduce el original exactamente, y nada más lo hace. Renombrar, reordenar, recomprimir o editar cualquier parte lo rompe, y ninguna herramienta puede saber por las partes solas cuál de esas ocurrió — así que la herramienta declara el requisito en vez de fingir verificarlo.",
          ],
        },
      ],
      pt: [
        {
          heading: "Dividir é aritmética de bytes, e a última parte é a prova",
          paragraphs: [
            "Um arquivo dividido é um fluxo de bytes cortado em blocos de tamanho fixo. Nada é acrescentado e nada removido, o que significa que a soma das partes é exatamente o tamanho original e a última parte normalmente é menor. Se a última parte tem exatamente o mesmo tamanho das outras, ou o tamanho do arquivo se divide certinho ou algo foi preenchido — e preenchimento muda o arquivo remontado de um jeito que só aparece quando os últimos bytes importam.",
            "Os nomes das partes importam tanto quanto os conteúdos. Uma convenção que ordena corretamente como texto é a diferença entre uma remontagem que funciona e uma que silenciosamente intercala. Numerar com sufixo de largura fixa, ou com índice com zeros à esquerda antes da extensão, mantém a ordem léxica igual à numérica — que é o que todo script de concatenação ingênuo supõe.",
            "Fundir passa a ser concatenação estritamente ordenada, e o requisito honesto é que todas as partes venham da mesma fonte. Fundir partes de dois arquivos diferentes produz um arquivo válido de comprimento errado, e nenhum checksum nas partes consegue detectar isso — por isso a ferramenta reporta o tamanho total e a contagem de partes para um revisor comparar com o esperado.",
          ],
        },
        {
          heading: "Onde os limites do navegador mordem e o que fazer em vez disso",
          paragraphs: [
            "Dividir arquivos grandes no navegador significa manter o arquivo e as partes em memória ao mesmo tempo. Funciona até algumas centenas de megabytes numa máquina moderna e falha de formas difíceis de diagnosticar além disso, então um teto declarado é mais útil que um crash. A alternativa honesta para dados genuinamente grandes é uma ferramenta de desktop ou um script em streaming — e o copy diz isso em vez de insinuar que o navegador aguenta qualquer coisa.",
            "Fundir tem o problema especular: cada parte precisa ser lida em memória antes de poder ser concatenada, então o teto vale para o total, não para cada parte. Mostrar o total acumulado conforme partes são adicionadas transforma uma falha posterior num limite visível.",
            "A garantia de remontagem vale a pena ser enunciada com precisão. Concatenação exata em bytes das mesmas partes na mesma ordem reproduz o original exatamente, e nada mais reproduz. Renomear, reordenar, recomprimir ou editar qualquer parte quebra isso, e nenhuma ferramenta consegue saber pelas partes sozinhas qual dessas coisas aconteceu — então a ferramenta declara o requisito em vez de fingir verificar.",
          ],
        },
      ],
    },
    locale,
  );
}

/** 取色器(补齐 3/5 → 5/5:仅需 ja/es/pt 两节) */
export function colorPickerDeepDive(locale: Locale): Section[] | undefined {
  return pick5(
    {
      en: [
        {
          heading: "Hex, RGB and HSL describe the same colour three different ways",
          paragraphs: [
            "A colour can be written as a hex triplet, as three decimal channel values, or as hue-saturation-lightness. They are three coordinate systems over the same space, and converting between them is exact in one direction and lossy in the other: hex and RGB hold 8-bit channel values, while HSL encodes hue as a continuous angle, so a round trip through HSL can shift a channel by one count.",
            "Hue is the part that behaves unintuitively at the extremes. At zero saturation or maximum lightness, hue carries no visible information — every such colour looks the same regardless of hue — which is why the hue slider appears to do nothing on a white or grey pixel. That is not a bug in the picker; it is what the colour space does.",
            "Reporting all three notations is the honest default, because the right one depends on the destination: design tools want hex, CSS often wants HSL for animation, and older interchange formats want RGB. Showing one and hiding the others forces the user to convert elsewhere, and every extra conversion is a place where a rounding difference can appear.",
          ],
        },
        {
          heading: "Screen colour is device-referred, and the eyedropper is a permission",
          paragraphs: [
            "A pixel's hex value in a screenshot is sRGB as the source application wrote it, which is not the same as the physical light that hits your eye. Two monitors at different brightness and profiles will display the same hex differently, and a print will differ again. Presenting hex is honest precisely because it is device-referred; claiming to report “the colour of the object” would not be.",
            "The screen eyedropper uses the browser's EyeDropper API, which asks the operating system to sample a pixel. That requires an explicit user gesture and, on most platforms, an explicit permission grant — so a tool cannot silently sample your screen, and one that appears to should be treated as suspicious. Sampling happens on the machine, and the sampled value is one pixel, not a stream.",
            "Alpha is the last piece worth stating. A picker that reports RGB without mentioning alpha is reporting a colour that may not be opaque; where the source carries transparency, the composite over a background is what a viewer sees, and that composite is not a property of the pixel alone.",
          ],
        },
      ],
      zh: [
        {
          heading: "Hex、RGB 与 HSL 用三种方式描述同一种颜色",
          paragraphs: [
            "一种颜色可以写成十六进制三元组、三个十进制通道值,或色相-饱和度-明度。它们是同一空间上的三套坐标系,互转在一个方向上是精确的,在另一个方向上是有损的:hex 与 RGB 保存 8 位通道值,而 HSL 把色相编码为连续角度,所以经 HSL 往返一次可能让某个通道偏移一个计数。",
            "色相是在极端值上表现反直觉的那一部分。在饱和为零或明度最高时,色相不携带任何可见信息——所有这类颜色看起来都一样,与色相无关——这就是为什么在纯白或纯灰像素上拖动色相滑杆看起来毫无作用。这不是取色器的 bug,而是色彩空间本身如此。",
            "同时报告三种写法是诚实的默认,因为正确的那一种取决于去处:设计工具要 hex,CSS 动画常要 HSL,较旧的交换格式要 RGB。只显示一种而藏起其余的,会迫使用户到别处去转换,而每一次额外转换都是舍入差异可能出现的地方。",
          ],
        },
        {
          heading: "屏幕颜色是设备相关值,而吸管是一项权限",
          paragraphs: [
            "截图中一个像素的十六进制值,是源应用写下的 sRGB,与你眼睛接收到的物理光并不相同。两台亮度与配置文件不同的显示器会把同一个 hex 显示成不同样子,打印出来又是另一种。呈现 hex 之所以诚实,正因为它是一个「设备相关值」;声称在报告「物体的颜色」则不诚实。",
            "屏幕吸管使用浏览器的 EyeDropper API,它请求操作系统采样一个像素。这需要明确的用户手势,并在多数平台上需要明确的权限授予——所以工具不可能悄悄采样你的屏幕,看起来能做到的工具应当被视为可疑。采样发生在机器本地,而且采的是一个像素,不是一个数据流。",
            "透明度是最后值得说明的一块。一个报告 RGB 却不提 alpha 的取色器,报告的是一个可能并非不透明的颜色;当来源带有透明时,观看者看到的是它在背景上的合成结果,而那个合成结果不是像素本身的属性。",
          ],
        },
      ],
      ja: [
        {
          heading: "Hex・RGB・HSL は同じ色を三通りに表す",
          paragraphs: [
            "色は 16 進の三つ組、三つの十進チャネル値、あるいは色相・彩度・明度として書けます。同じ空間上の三つの座標系で、相互変換は一方向では正確、他方向では非可逆です。hex と RGB は 8 ビットのチャネル値を保持し、HSL は色相を連続角度として符号化するため、HSL を経由した往復でチャネルが 1 カウントずれることがあります。",
            "色相は極値で直感に反する部位です。彩度ゼロまたは明度最大では色相は可視情報を持ちません。そのような色は色相に関係なく同じに見えます。白やグレーのピクセルで色相スライダーが何もしないように見えるのはそのためで、ピッカーのバグではなく色空間の性質です。",
            "三つの表記をすべて報告するのが正直な既定です。正しい一つは行き先で決まるからです。デザインツールは hex、CSS アニメーションはしばしば HSL、古い交換形式は RGB を求めます。一つだけ見せて他を隠せば、利用者は他所で変換することを強いられ、余分な変換はたびたび丸め差の現れる場所になります。",
          ],
        },
        {
          heading: "画面の色はデバイス参照値で、スポイトは権限です",
          paragraphs: [
            "スクリーンショットのピクセルの 16 進値は、元アプリが書いた sRGB であり、目に届く物理光とは同じではありません。明るさとプロファイルの違う二台のモニタは同じ hex を違って表示し、印刷ではさらに違います。hex を示すのが誠実なのは、それがデバイス参照値だからです。「物体の色」を報告すると称するのは誠実ではありません。",
            "画面スポイトはブラウザの EyeDropper API を使い、OS にピクセルのサンプリングを依頼します。明示的なユーザー操作が必要で、多くのプラットフォームでは明示的な権限許可も必要です。だからツールが黙って画面を採取することはできず、できているように見えるものは疑わしいと見るべきです。採取は端末上で行われ、値は 1 ピクセルであり、ストリームではありません。",
            "アルファは最後に述べる価値のある部分です。RGB だけを報告して alpha に触れないピッカーは、不透明でないかもしれない色を報告しています。出所が透過を持つ場合、見る人が見るのは背景上の合成結果であり、その合成結果はピクセル単体の性質ではありません。",
          ],
        },
      ],
      es: [
        {
          heading: "Hex, RGB y HSL describen el mismo color de tres formas",
          paragraphs: [
            "Un color puede escribirse como terna hex, como tres valores decimales de canal o como tono-saturación-luminosidad. Son tres sistemas de coordenadas sobre el mismo espacio, y convertir entre ellos es exacto en una dirección y con pérdida en la otra: hex y RGB guardan valores de canal de 8 bits, mientras HSL codifica el tono como ángulo continuo, así que un viaje de ida y vuelta por HSL puede desplazar un canal en una cuenta.",
            "El tono es la parte que se comporta de forma contraintuitiva en los extremos. Con saturación cero o luminosidad máxima, el tono no lleva información visible: todo color así se ve igual sin importar el tono, y por eso el deslizador de tono parece no hacer nada sobre un píxel blanco o gris. No es un bug del selector; es lo que hace el espacio de color.",
            "Informar las tres notaciones es el valor por defecto honesto, porque la correcta depende del destino: las herramientas de diseño quieren hex, CSS suele querer HSL para animación, y formatos de intercambio antiguos quieren RGB. Mostrar uno y esconder los otros obliga al usuario a convertir en otro sitio, y cada conversión extra es un lugar donde puede aparecer una diferencia de redondeo.",
          ],
        },
        {
          heading: "El color de pantalla está referido al dispositivo, y el cuentagotas es un permiso",
          paragraphs: [
            "El valor hex de un píxel en una captura es sRGB tal como lo escribió la aplicación de origen, que no es lo mismo que la luz física que llega a tu ojo. Dos monitores con brillo y perfiles distintos mostrarán el mismo hex de forma diferente, y una impresión diferirá otra vez. Presentar hex es honesto precisamente porque está referido al dispositivo; afirmar que se reporta «el color del objeto» no lo sería.",
            "El cuentagotas de pantalla usa la API EyeDropper del navegador, que pide al sistema operativo muestrear un píxel. Eso requiere un gesto explícito del usuario y, en la mayoría de plataformas, una concesión explícita de permiso, así que una herramienta no puede muestrear tu pantalla en silencio, y una que parece hacerlo debería tratarse como sospechosa. El muestreo ocurre en la máquina, y el valor muestreado es un píxel, no un flujo.",
            "Alfa es la última pieza que vale declarar. Un selector que reporta RGB sin mencionar alfa está reportando un color que puede no ser opaco; donde la fuente lleva transparencia, lo que ve un visor es el compuesto sobre un fondo, y ese compuesto no es una propiedad del píxel solo.",
          ],
        },
      ],
      pt: [
        {
          heading: "Hex, RGB e HSL descrevem a mesma cor de três formas",
          paragraphs: [
            "Uma cor pode ser escrita como tríade hex, como três valores decimais de canal ou como matiz-saturação-luminosidade. São três sistemas de coordenadas sobre o mesmo espaço, e converter entre eles é exato numa direção e com perda na outra: hex e RGB guardam valores de canal de 8 bits, enquanto HSL codifica a matiz como ângulo contínuo, então uma ida e volta por HSL pode deslocar um canal em uma contagem.",
            "A matiz é a parte que se comporta de forma contraintuitiva nos extremos. Com saturação zero ou luminosidade máxima, a matiz não carrega informação visível — toda cor assim parece igual independentemente da matiz — e é por isso que o controle de matiz parece não fazer nada num pixel branco ou cinza. Não é um bug do seletor; é o que o espaço de cor faz.",
            "Informar as três notações é o padrão honesto, porque a correta depende do destino: ferramentas de design querem hex, CSS costuma querer HSL para animação, e formatos de intercâmbio antigos querem RGB. Mostrar uma e esconder as outras força o usuário a converter noutro lugar, e cada conversão extra é um lugar onde uma diferença de arredondamento pode aparecer.",
          ],
        },
        {
          heading: "A cor da tela é referida ao dispositivo, e o conta-gotas é uma permissão",
          paragraphs: [
            "O valor hex de um pixel numa captura é sRGB como a aplicação de origem o escreveu, o que não é a mesma coisa que a luz física que chega ao seu olho. Dois monitores com brilho e perfis diferentes mostrarão o mesmo hex de forma diferente, e uma impressão diferirá outra vez. Apresentar hex é honesto justamente porque é referido ao dispositivo; afirmar que reporta «a cor do objeto» não seria.",
            "O conta-gotas de tela usa a API EyeDropper do navegador, que pede ao sistema operacional para amostrar um pixel. Isso exige um gesto explícito do usuário e, na maioria das plataformas, uma concessão explícita de permissão — então uma ferramenta não consegue amostrar sua tela em silêncio, e uma que parece conseguir deve ser tratada como suspeita. A amostragem acontece na máquina, e o valor amostrado é um pixel, não um fluxo.",
            "Alfa é a última peça que vale declarar. Um seletor que reporta RGB sem mencionar alfa está reportando uma cor que pode não ser opaca; quando a fonte carrega transparência, o que um visualizador vê é o composto sobre um fundo, e esse composto não é propriedade do pixel sozinho.",
          ],
        },
      ],
    },
    locale,
  );
}
