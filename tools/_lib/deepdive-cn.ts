/**
 * 内容深度补充批次:CN 族(身份证 / 社会信用代码 / 人民币大写 / 导出场景)的 deepDive。
 *
 * 为什么要单独一个文件:这些工具的 ToolCopy 由工厂函数生成(chinese-id-copy /
 * social-credit-copy / social-credit-generator-copy / rmb-uppercase-copy),
 * 工厂里没有 deepDive 字段,直接在工厂里塞 5 语长文会把那些已经很长的字典文件
 * 变得不可维护。折中:深文放这里,工厂只加一行 `deepDive: cnDeepDive("...", locale)`。
 *
 * 写作纪律(沿用全站 deepDive 规范):2 节 × 3 段 × 5 核心语;讲原理、边界与实务,
 * 不做营销;所有数字与规则出处可核。
 */

import type { Locale } from "@/lib/site";

type Section = { heading: string; paragraphs: [string, string, string] };
const CORE = ["en", "zh", "ja", "es", "pt"] as const;

function pick5(map: Record<(typeof CORE)[number], Section[]>, locale: Locale): Section[] | undefined {
  // overlay 语种(fr/de/ru/it/tr/ko/ar/hi/id/vi)设计上回退英文深文:
  // 这些语种的界面与页面文案各有 overlay,但深文不铺(与全站既有约定一致)。
  return (map as Record<string, Section[] | undefined>)[locale] ?? map.en;
}

/** 身份证:校验器与生成器共用一个工厂,深文按 mode 区分。 */
export function chineseIdDeepDive(mode: "validator" | "generator", locale: Locale): Section[] | undefined {
  const validator: Record<(typeof CORE)[number], Section[]> = {
    en: [
      {
        heading: "What the 18 digits actually encode",
        paragraphs: [
          "A resident ID number is not an opaque string: it is a fixed layout of 18 digits. The first six are an administrative division code (province, city, county) valid at the time the number was issued; the next eight are the birth date as YYYYMMDD; the three after that are a sequence code, whose odd/even parity encodes sex; and the last digit is a check character computed over the previous seventeen.",
          "The check character uses ISO 7064 MOD 11-2 as specified in GB 11643-1999: each of the first seventeen digits is multiplied by a fixed weight (7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2), the products are summed, the sum is taken modulo 11, and the remainder indexes the check character from the string 10X98765432. A number failing this arithmetic cannot be a validly issued 18-digit ID, whatever else looks right about it.",
          "The practical consequence is that a checksum pass proves only internal consistency. A number can be arithmetically perfect and still never have been issued: the region code may be a retired county, the birth date may fall on a day that never existed, or the sequence may never have been assigned. This validator reports exactly the layer it checked and refuses to imply anything beyond it.",
        ],
      },
      {
        heading: "Reading names and addresses out of the number, honestly",
        paragraphs: [
          "The division code is the most easily misread field. Codes are historical: a number issued in 1995 keeps the county code that existed in 1995 even if that county was merged, renamed or split later. Mapping a code through today's registry and reporting the result as the person's current residence is a guess dressed as a fact, so this tool labels the prefix as what it is — a recognized provincial prefix — rather than claiming a current address.",
          "The reason the provincial prefix can still be checked is scale: the first two digits identify a province level unit, which changes rarely and is well documented. Anything finer needs a year-aware registry that is not published as a stable machine-readable dataset, so this tool stops at the province level and says so.",
          "Dates carry the same kind of trap. An 18-digit number encodes a four-digit year directly, but a 15-digit legacy number does not — it carries only YY, leaving a century ambiguous. This tool converts 15-digit numbers under an explicit 19xx assumption and displays that assumption next to the result, because the alternative is silently choosing a century for the user.",
        ],
      },
    ],
    zh: [
      {
        heading: "18 位数字里到底编码了什么",
        paragraphs: [
          "居民身份证号不是一串不透明字符,而是一个固定布局的 18 位结构:前 6 位是签发时有效的行政区划代码(省、市、县),接着 8 位是出生日期 YYYYMMDD,再 3 位是顺序码(其奇偶编码性别),最后 1 位是对前 17 位算出的校验码。",
          "校验码采用 GB 11643-1999 规定的 ISO 7064 MOD 11-2:前 17 位各自乘以固定权重(7、9、10、5、8、4、2、1、6、3、7、9、10、5、8、4、2),乘积求和,和对 11 取模,余数在字符串 10X98765432 上索引出校验字符。算术不过关的号码不可能是有效签发的 18 位身份证号,无论其它部分看起来多像。",
          "实际后果是:校验通过只证明内部一致性。一个号码可以算术完美却从未被签发——区划码可能是已撤并的县,出生日期可能落在不存在的日期,顺序码可能从未分配过。本校验器明确报告自己检查了哪一层,并拒绝在此基础上做任何延伸暗示。",
        ],
      },
      {
        heading: "从号码里读出姓名与地址这件事,要诚实到什么程度",
        paragraphs: [
          "行政区划码是最容易被误读的字段。代码是历史性的:1995 年签发的号码保留 1995 年当时的县码,即使该县后来被合并、更名或拆分。拿今天的区划库去映射一个旧号码、再把结果说成「现住址」,是把猜测包装成事实。所以本工具只把前缀标注为它本来的样子——已识别的省级前缀——而不声称任何当前地址。",
          "省级前缀之所以还能校验,是因为量级:前两位标识省级单位,变动少且记载完备。更细的层级需要一个带年份维度的区划库,而它并没有以稳定的机器可读数据集形式公开,所以本工具停在省级并明说这一点。",
          "日期也有同类陷阱。18 位号码直接编码四位年份,而 15 位旧号只有 YY,世纪是歧义的。本工具在明确的「19xx」假设下转换 15 位号码,并把该假设显示在结果旁边——替代方案是替用户悄悄选一个世纪。",
        ],
      },
    ],
    ja: [
      {
        heading: "18 桁には何が符号化されているか",
        paragraphs: [
          "住民身分証番号は不透明な文字列ではなく、18 桁の固定レイアウトです。先頭 6 桁は発行時に有効だった行政区画コード(省・市・県)、続く 8 桁は生年月日 YYYYMMDD、さらに 3 桁は順序コード(その偶奇が性別を符号化)、最後の 1 桁は前 17 桁から算出した検査文字です。",
          "検査文字は GB 11643-1999 が定める ISO 7064 MOD 11-2 を使います。前 17 桁の各桁に固定の重み(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)を掛けて合計し、11 で割った余りで文字列 10X98765432 から検査文字を引きます。この算術を通らない番号は、他の部分がどれほど正しく見えても有効に発行された 18 桁の番号ではありません。",
          "実務上の帰結は、検査通過が内部整合性しか証明しないことです。算術的に完璧でも一度も発行されていない番号はあり得ます。区画コードが廃止された県だったり、生年月日が存在しない日だったり、順序コードが一度も割り当てられていなかったりします。この検証器は自分が確認した層だけを報告し、それ以上を暗示しません。",
        ],
      },
      {
        heading: "番号から氏名や住所を読み出すことの誠実さ",
        paragraphs: [
          "区画コードは最も誤読されやすい項目です。コードは歴史的で、1995 年に発行された番号はその時点の県コードを保持します。その後その県が合併・改名・分割されても変わりません。現在の台帳でコードを引き、その結果を「現住所」として報告するのは、推測を事実の装いで出すことです。したがって本ツールは接頭辞を本来の姿 — 認識済みの省級接頭辞 — として表示し、現在の住所を主張しません。",
          "省級接頭辞を検査できる理由はその規模にあります。先頭 2 桁は省級単位を示し、変動が少なく記録も整っています。より細かい階層には年次を考慮した区画台帳が必要ですが、それは安定した機械可読データセットとして公開されていないため、本ツールは省級で止まり、そう明記します。",
          "日付にも同じ罠があります。18 桁は 4 桁の年を直接符号化しますが、15 桁の旧番号は YY しか持たず世紀が曖昧です。本ツールは 15 桁を明示的な「19xx」仮定で変換し、その仮定を結果の横に表示します。代替案はユーザーの代わりに世紀を黙って選ぶことです。",
        ],
      },
    ],
    es: [
      {
        heading: "Qué codifican realmente los 18 dígitos",
        paragraphs: [
          "Un número de identidad de residente no es una cadena opaca: es un diseño fijo de 18 dígitos. Los seis primeros son un código de división administrativa (provincia, ciudad, condado) válido en el momento de la emisión; los ocho siguientes son la fecha de nacimiento como AAAAMMDD; los tres posteriores son un código de secuencia cuya paridad impar/par codifica el sexo; y el último dígito es un carácter de control calculado sobre los diecisiete anteriores.",
          "El carácter de control usa ISO 7064 MOD 11-2 según GB 11643-1999: cada uno de los diecisiete dígitos se multiplica por un peso fijo (7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2), los productos se suman, la suma se toma módulo 11 y el resto indexa el carácter de control en la cadena 10X98765432. Un número que falle esta aritmética no puede ser un número de 18 dígitos emitido válidamente, por mucho que el resto parezca correcto.",
          "La consecuencia práctica es que pasar el control demuestra solo consistencia interna. Un número puede ser aritméticamente perfecto y no haber sido emitido nunca: el código de región puede ser de un condado retirado, la fecha puede caer en un día inexistente o la secuencia puede no haberse asignado jamás. Este validador informa exactamente qué capa comprobó y se niega a insinuar nada más allá.",
        ],
      },
      {
        heading: "Leer nombres y direcciones del número, con honestidad",
        paragraphs: [
          "El código de división es el campo más fácil de malinterpretar. Los códigos son históricos: un número emitido en 1995 conserva el código del condado que existía en 1995 aunque luego se fusionara, renombrara o dividiera. Mapear un código con el registro actual y presentar el resultado como residencia actual es una conjetura disfrazada de hecho, así que esta herramienta etiqueta el prefijo por lo que es — un prefijo provincial reconocido — en lugar de afirmar una dirección actual.",
          "La razón por la que el prefijo provincial aún puede verificarse es de escala: los dos primeros dígitos identifican una unidad provincial, que cambia rara vez y está bien documentada. Cualquier nivel más fino requiere un registro administrativo sensible al año que no se publica como conjunto de datos estable legible por máquina, así que la herramienta se detiene en el nivel provincial y lo dice.",
          "Las fechas arrastran la misma trampa. Un número de 18 dígitos codifica un año de cuatro dígitos directamente, pero uno heredado de 15 dígitos no: solo lleva YY, dejando el siglo ambiguo. Esta herramienta convierte números de 15 dígitos bajo una suposición 19xx explícita y muestra esa suposición junto al resultado, porque la alternativa es elegir un siglo en silencio por el usuario.",
        ],
      },
    ],
    pt: [
      {
        heading: "O que os 18 dígitos realmente codificam",
        paragraphs: [
          "Um número de identidade de residente não é uma string opaca: é um layout fixo de 18 dígitos. Os seis primeiros são um código de divisão administrativa (província, cidade, distrito) válido na data da emissão; os oito seguintes são a data de nascimento como AAAAMMDD; os três seguintes são um código de sequência cuja paridade ímpar/par codifica o sexo; e o último dígito é um caractere verificador calculado sobre os dezessete anteriores.",
          "O caractere verificador usa ISO 7064 MOD 11-2 conforme GB 11643-1999: cada um dos dezessete dígitos é multiplicado por um peso fixo (7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2), os produtos são somados, a soma é tomada módulo 11 e o resto indexa o caractere na string 10X98765432. Um número que falhe essa aritmética não pode ser um número de 18 dígitos emitido validamente, por mais que o resto pareça correto.",
          "A consequência prática é que passar na verificação prova apenas consistência interna. Um número pode ser aritmeticamente perfeito e nunca ter sido emitido: o código de região pode ser de um distrito extinto, a data pode cair num dia inexistente ou a sequência pode nunca ter sido atribuída. Este validador informa exatamente qual camada verificou e se recusa a insinuar qualquer coisa além dela.",
        ],
      },
      {
        heading: "Ler nomes e endereços a partir do número, com honestidade",
        paragraphs: [
          "O código de divisão é o campo mais fácil de interpretar errado. Códigos são históricos: um número emitido em 1995 mantém o código do distrito que existia em 1995 mesmo que ele tenha sido fundido, renomeado ou dividido depois. Mapear um código pelo registro atual e apresentar o resultado como residência atual é um palpite fantasiado de fato, então esta ferramenta rotula o prefixo pelo que ele é — um prefixo provincial reconhecido — em vez de afirmar um endereço atual.",
          "A razão de o prefixo provincial ainda poder ser verificado é de escala: os dois primeiros dígitos identificam uma unidade provincial, que muda raramente e é bem documentada. Qualquer nível mais fino exige um registro administrativo sensível ao ano que não é publicado como conjunto de dados estável legível por máquina, então a ferramenta para no nível provincial e diz isso.",
          "As datas carregam a mesma armadilha. Um número de 18 dígitos codifica um ano de quatro dígitos diretamente, mas um legado de 15 dígitos não: carrega apenas YY, deixando o século ambíguo. Esta ferramenta converte números de 15 dígitos sob uma suposição 19xx explícita e mostra essa suposição ao lado do resultado, porque a alternativa é escolher um século em silêncio pelo usuário.",
        ],
      },
    ],
  };

  const generator: Record<(typeof CORE)[number], Section[]> = {
    en: [
      {
        heading: "How test samples are constructed without impersonating anyone",
        paragraphs: [
          "The generator builds numbers from a supplied division prefix, birth date and starting sequence, then appends the check character the arithmetic demands. Because the check character is computed rather than invented, every sample is arithmetically valid — which is the point, since the purpose is to give a test suite input that passes validation.",
          "The honest boundary is stated where it matters: samples are unique within a batch by construction (the sequence increments), but they may coincide with a number that was actually assigned to a real person, because the sequence space in any division is finite and public test generators cannot know which ranges were used. They are marked as software-testing fixtures, and the tool says plainly that passing validation does not prove a real identity.",
          "Parity is offered as an explicit choice rather than inferred, because the sex encoding is the one field where a wrong default would produce samples that silently fail a downstream assertion. Choosing “any parity” increments the sequence by one; choosing odd or even increments by two so the parity stays constant across the batch.",
        ],
      },
      {
        heading: "Why the check character must be computed, not copied",
        paragraphs: [
          "A common shortcut in test fixtures is to hard-code a handful of real-looking numbers. That fails in two directions: the sample set cannot be extended when a test needs more rows, and any that were transcribed incorrectly fail the checksum and get blamed on the validator. Computing the check character from the weights removes both problems — generated samples are always self-consistent, and the batch can grow to whatever count the test asks for.",
          "The weights themselves are not arbitrary. They come from ISO 7064 MOD 11-2 as bound by GB 11643-1999, and the auxiliary string 10X98765432 maps remainders 0 through 10 onto the ten digit characters plus the letter X used for remainder 2. Every one of those details matters: swapping even one weight produces numbers that look plausible and fail validation, which is exactly the class of bug this generator exists to avoid.",
          "Sequence capacity is a real constraint, not a formality. A starting sequence of 999 with a count of 100 cannot be satisfied without crossing into the next block of the space, so the tool rejects the combination instead of silently wrapping or truncating. A test generator that quietly produces fewer rows than asked is worse than one that refuses.",
        ],
      },
    ],
    zh: [
      {
        heading: "测试样本怎么构造,才不会冒用真实身份",
        paragraphs: [
          "生成器用给定的行政区划前缀、出生日期与起始顺序码拼出号码,然后补上算术要求的校验字符。因为校验字符是算出来的而不是编出来的,每个样本在算术上都有效——这正是重点:目的是给测试套件一个能通过校验的输入。",
          "诚实的边界写在关键位置:样本在构造上保证批次内互异(顺序码递增),但它们可能与真实分配给某个人的号码重合,因为任何区划的顺序空间都是有限的,公开的测试生成器无法知道哪些区间已被占用。它们被标注为软件测试数据,且工具明说:通过校验并不证明真实身份。",
          "奇偶作为显式选项提供而不是推断,因为性别编码是唯一一个「默认值选错就会让样本悄悄挂掉下游断言」的字段。选「不限奇偶」时顺序码每次 +1;选奇或偶时每次 +2,使批次内奇偶保持一致。",
        ],
      },
      {
        heading: "为什么校验字符必须算出来,而不是抄过来",
        paragraphs: [
          "测试数据里常见的偷懒做法是硬编码几个看起来真实的号码。这在两个方向上都会失败:测试需要更多行时样本集无法扩展;而任何转录错误的号码都会校验失败,然后被怪到校验器头上。从权重出发计算校验字符同时消除这两个问题——生成的样本永远自洽,批次也能扩到测试要的任何数量。",
          "权重本身不是随手定的。它们来自 GB 11643-1999 所采用的 ISO 7064 MOD 11-2,辅助字符串 10X98765432 把余数 0 到 10 映射为十个数字字符加上余数 2 用的字母 X。这些细节每一个都重要:哪怕只换掉一个权重,产出的号码看起来很像却校验不过,而这正是本生成器存在要避免的那类 bug。",
          "顺序码容量是真实约束而非形式。起始顺序码 999 加数量 100 必然越界,工具直接拒绝这个组合,而不是悄悄回绕或截断。一个悄悄少给几行的测试生成器,比一个明确拒绝的更糟。",
        ],
      },
    ],
    ja: [
      {
        heading: "実在の身元を騙らないテストサンプルの作り方",
        paragraphs: [
          "生成器は与えられた行政区画接頭辞・生年月日・開始順序コードから番号を組み立て、算術が要求する検査文字を付加します。検査文字は発明ではなく計算されるため、すべてのサンプルは算術的に有効です。目的は検証を通る入力をテストスイートに与えることなので、これが要点です。",
          "誠実な境界は重要な箇所に明記します。サンプルは構築上バッチ内で一意(順序コードが増加)ですが、実際にある人に割り当てられた番号と一致し得ます。どの区画でも順序空間は有限で、公開されたテスト生成器はどの範囲が使用済みか知り得ないからです。ソフトウェアテスト用のデータと明示し、検証通過が実在の身元を証明しないことも明言します。",
          "偶奇は推測ではなく明示的な選択として提供します。性別符号化は「既定値を誤ると下流のアサーションが黙って落ちるサンプルができる」唯一の項目だからです。「偶奇を問わない」では順序を 1 ずつ、「奇数/偶数」では 2 ずつ増やし、バッチ内で偶奇を保ちます。",
        ],
      },
      {
        heading: "検査文字は写すのではなく計算しなければならない理由",
        paragraphs: [
          "テストフィクスチャでよくある近道は、本物らしい番号を数個ハードコードすることです。これは二方向で破綻します。テストがより多くの行を必要としたときサンプル集合を拡張できず、転記を誤った番号は検査に失敗して検証器のせいにされます。重みから検査文字を計算すれば両方が解消します — 生成サンプルは常に自己整合で、バッチはテストが要求する数まで増やせます。",
          "重みは恣意的ではありません。GB 11643-1999 が採用する ISO 7064 MOD 11-2 に由来し、補助文字列 10X98765432 は余り 0〜10 を十の数字と、余り 2 用の文字 X に写します。どの細部も重要です。重みを一つ入れ替えるだけで、もっともらしく見えて検証に落ちる番号ができます — まさにこの生成器が避けるために存在するバグの類型です。",
          "順序容量は形式ではなく実際の制約です。開始順序 999 に件数 100 は空間をまたがないと満たせないため、ツールは黙って回り込んだり切り詰めたりせず、その組み合わせを拒否します。要求より静かに少ない行を返すテスト生成器は、明確に拒否するものより悪いです。",
        ],
      },
    ],
    es: [
      {
        heading: "Cómo se construyen muestras de prueba sin suplantar a nadie",
        paragraphs: [
          "El generador construye números a partir de un prefijo de división, una fecha de nacimiento y una secuencia inicial suministrados, y luego añade el carácter de control que exige la aritmética. Puesto que el carácter se calcula en vez de inventarse, toda muestra es aritméticamente válida: ese es el punto, ya que el propósito es dar a una suite de pruebas una entrada que pase la validación.",
          "El límite honesto se declara donde importa: las muestras son únicas dentro de un lote por construcción (la secuencia incrementa), pero pueden coincidir con un número realmente asignado a una persona, porque el espacio de secuencia de cualquier división es finito y los generadores públicos de prueba no pueden saber qué rangos se usaron. Se marcan como fixtures de pruebas de software y la herramienta dice con claridad que pasar la validación no prueba una identidad real.",
          "La paridad se ofrece como elección explícita en lugar de inferirse, porque la codificación de sexo es el único campo donde un valor por defecto equivocado produciría muestras que fallan en silencio una aserción posterior. Elegir «cualquier paridad» incrementa la secuencia de uno en uno; elegir impar o par la incrementa de dos en dos para que la paridad se mantenga en todo el lote.",
        ],
      },
      {
        heading: "Por qué el carácter de control debe calcularse, no copiarse",
        paragraphs: [
          "Un atajo común en fixtures es codificar a mano un puñado de números de apariencia real. Falla en dos direcciones: el conjunto no puede extenderse cuando una prueba necesita más filas, y cualquiera transcrito incorrectamente falla la suma de control y se culpa al validador. Calcular el carácter a partir de los pesos elimina ambos problemas: las muestras generadas son siempre autoconsistentes y el lote puede crecer hasta la cantidad que la prueba pida.",
          "Los pesos no son arbitrarios. Provienen de ISO 7064 MOD 11-2 tal como lo vincula GB 11643-1999, y la cadena auxiliar 10X98765432 mapea los restos 0 a 10 sobre diez caracteres de dígito más la letra X para el resto 2. Cada detalle importa: intercambiar un solo peso produce números que parecen plausibles y fallan la validación, que es exactamente la clase de error que este generador existe para evitar.",
          "La capacidad de secuencia es una restricción real, no una formalidad. Una secuencia inicial de 999 con un recuento de 100 no puede satisfacerse sin cruzar al siguiente bloque del espacio, así que la herramienta rechaza la combinación en vez de ajustar o truncar en silencio. Un generador de pruebas que devuelve en silencio menos filas de las pedidas es peor que uno que se niega.",
        ],
      },
    ],
    pt: [
      {
        heading: "Como amostras de teste são construídas sem se passar por ninguém",
        paragraphs: [
          "O gerador monta números a partir de um prefixo de divisão, data de nascimento e sequência inicial fornecidos, e então acrescenta o caractere verificador que a aritmética exige. Como o caractere é calculado em vez de inventado, toda amostra é aritmeticamente válida — esse é o ponto, já que o propósito é dar a uma suíte de testes uma entrada que passe na validação.",
          "O limite honesto é declarado onde importa: as amostras são únicas dentro de um lote por construção (a sequência incrementa), mas podem coincidir com um número realmente atribuído a uma pessoa, porque o espaço de sequência de qualquer divisão é finito e geradores públicos de teste não podem saber quais faixas foram usadas. São marcadas como fixtures de teste de software e a ferramenta diz claramente que passar na validação não prova uma identidade real.",
          "A paridade é oferecida como escolha explícita em vez de inferida, porque a codificação de sexo é o único campo em que um padrão errado produziria amostras que falham silenciosamente numa asserção posterior. Escolher «qualquer paridade» incrementa a sequência de um em um; escolher ímpar ou par incrementa de dois em dois para manter a paridade em todo o lote.",
        ],
      },
      {
        heading: "Por que o caractere verificador deve ser calculado, não copiado",
        paragraphs: [
          "Um atalho comum em fixtures é fixar à mão alguns números de aparência real. Isso falha em duas direções: o conjunto não pode ser estendido quando um teste precisa de mais linhas, e qualquer um transcrito incorretamente falha a soma de verificação e a culpa cai no validador. Calcular o caractere a partir dos pesos elimina ambos os problemas — as amostras geradas são sempre autoconsistentes e o lote cresce até a quantidade que o teste pedir.",
          "Os pesos não são arbitrários. Vêm do ISO 7064 MOD 11-2 conforme vinculado pela GB 11643-1999, e a string auxiliar 10X98765432 mapeia os restos 0 a 10 sobre dez caracteres de dígito mais a letra X para o resto 2. Cada detalhe importa: trocar um único peso produz números que parecem plausíveis e falham a validação, que é exatamente a classe de erro que este gerador existe para evitar.",
          "A capacidade de sequência é uma restrição real, não formalidade. Uma sequência inicial de 999 com contagem 100 não pode ser satisfeita sem cruzar para o próximo bloco do espaço, então a ferramenta recusa a combinação em vez de dar a volta ou truncar em silêncio. Um gerador de testes que devolve silenciosamente menos linhas do que foi pedido é pior que um que se recusa.",
        ],
      },
    ],
  };

  return pick5(mode === "validator" ? validator : generator, locale);
}

/** 统一社会信用代码(USCC):校验器与生成器。 */
export function socialCreditDeepDive(mode: "validator" | "generator", locale: Locale): Section[] | undefined {
  const validator: Record<(typeof CORE)[number], Section[]> = {
    en: [
      {
        heading: "The 18 characters of a USCC and what each block means",
        paragraphs: [
          "A unified social credit code is 18 characters drawn from a 31-character alphabet that deliberately excludes I, O, Z and S to avoid confusion with 1 and 0 and with digits in handwriting. The layout is positional: the first digit is the registration authority class, the second the registering body, digits 3 through 5 and 6 through 9 encode the administrative division, 10 through 17 are the organization code, and the last is the check character.",
          "The check character uses ISO 7064 MOD 31-2 with a specific weight vector (1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28), a modulus of 31, and a mapping from the resulting remainder to the 31-character alphabet. That weight vector is not a round number: each weight is a power of 3 modulo 31, which is precisely what makes the scheme detect transpositions and single-character substitutions reliably.",
          "The practical reading is the same as with ID numbers: a passing checksum proves internal consistency and nothing more. Whether the organization actually exists, whether the division code was valid in the year of registration, and whether the registration authority really issued the code are three separate facts this tool has no access to.",
        ],
      },
      {
        heading: "Why the alphabet drops four letters, and why that matters to your test data",
        paragraphs: [
          "The 31-character set excludes I, O, Z and S because each is visually ambiguous with a digit or with another letter. When a code is read aloud over the phone, printed on a form and transcribed by hand, or scanned from a low-resolution PDF, those four characters are the ones people get wrong. Removing them removes a whole class of transcription error at the cost of four characters of entropy — a trade that registration systems make deliberately.",
          "That constraint is a trap for anyone writing test fixtures: a hand-made sample using the letter O looks plausible and fails validation, and the failure then gets blamed on the validator or on the code being fake. Generating samples through the algorithm rather than typing them ensures the alphabet and check character are always coherent, which is why this generator exposes the fields rather than asking you to hand-assemble a string.",
          "Sequence generation also has to respect the alphabet boundary: when the organization code block increments past the end of the character set, the carry has to propagate correctly, because an out-of-alphabet character would make the whole code unverifiable regardless of how the checksum works out in isolation.",
        ],
      },
    ],
    zh: [
      {
        heading: "统一社会信用代码的 18 个字符,每一段是什么意思",
        paragraphs: [
          "统一社会信用代码是 18 个字符,取自一个刻意排除 I、O、Z、S 的 31 字符字母表——排除这四个是为了避免与 1、0 以及手写体数字混淆。布局是按位定义的:第 1 位是登记管理部门类别,第 2 位是登记机构,第 3–5 位与第 6–9 位编码行政区划,第 10–17 位是组织机构代码,最后一位是校验字符。",
          "校验字符采用 ISO 7064 MOD 31-2,权重向量为 (1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28),模数 31,余数按 31 字符字母表映射。这个权重向量不是随手取的整数:每个权重都是 3 的幂对 31 取模,这正是它能可靠检出换位与单字符替换的原因。",
          "实际的解读方式与身份证号同理:校验通过只证明内部一致。企业是否真实存在、区划码在注册当年是否有效、登记机关是否真的发过这个码,是三件本工具无从接触的事实。",
        ],
      },
      {
        heading: "为什么字母表要去掉四个字母,以及这对你的测试数据意味着什么",
        paragraphs: [
          "31 字符集排除 I、O、Z、S,因为每一个都与某个数字或另一个字母视觉上歧义。当代码被电话口述、打印在表格上再人工转录、或从低分辨率 PDF 扫描时,人们记错的正是这四个。去掉它们以损失四个字符的熵为代价消除了一整类转录错误——这是登记系统刻意的取舍。",
          "这个约束对写测试数据的人是个陷阱:一个用了字母 O 的手工样本看起来像真的却校验不过,失败随后被归咎于校验器或「这个代码是假的」。通过算法生成样本而不是手敲,能保证字母表与校验字符始终自洽——这也是本生成器把字段暴露出来、而不是让你手工拼字符串的原因。",
          "顺序生成还必须尊重字母表边界:组织机构代码块递增越过字符集末尾时,进位必须正确传播,因为一个超出字母表的字符会让整段代码无法校验,无论校验和单独算出来是什么。",
        ],
      },
    ],
    ja: [
      {
        heading: "統一社会信用コードの 18 文字と各区画の意味",
        paragraphs: [
          "統一社会信用コードは 18 文字で、I・O・Z・S を意図的に除いた 31 文字の字母から成ります。除外は 1 や 0、手書き数字との混同を避けるためです。配置は位置定義で、1 文字目は登記管理部門の区分、2 文字目は登記機関、3〜5 と 6〜9 が行政区画、10〜17 が組織コード、最後が検査文字です。",
          "検査文字は ISO 7064 MOD 31-2 を重みベクトル (1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28)、法 31 で使い、余りを 31 文字の字母に写します。この重みベクトルは丸めた数ではありません。各重みは 3 の冪を 31 で割った余りであり、それこそが転置と単一文字置換を確実に検出できる理由です。",
          "実務的な読み方は身分証番号と同じです。検査を通ることは内部整合性だけを証明します。組織が実在するか、区画コードが登記当年に有効だったか、登記機関が本当に発行したかは、本ツールが関与できない三つの別事実です。",
        ],
      },
      {
        heading: "字母が四文字を落とす理由と、それがテストデータに与える影響",
        paragraphs: [
          "31 文字集合は I・O・Z・S を除きます。いずれも数字か別の文字と視覚的に曖昧だからです。コードが電話で読み上げられ、用紙に印刷され手で転記され、低解像度 PDF から読み取られるとき、人が間違えるのはこの四文字です。それらを除くことで、四文字分のエントロピーを犠牲にして転記エラーの一類型を消しています — 登記システムが意図的に選んだ取引です。",
          "この制約はテストフィクスチャを書く人には罠です。文字 O を使った手作りサンプルはもっともらしく見えて検証に落ち、その失敗が検証器や「偽のコード」のせいにされます。手で打つのではなくアルゴリズムで生成すれば、字母と検査文字は常に整合します — この生成器が文字列を手組みさせずフィールドを公開している理由です。",
          "順序生成も字母の境界を尊重する必要があります。組織コード区画が文字集合の末尾を越えて増えるとき、桁上がりが正しく伝播しなければなりません。字母外の文字は、検査和が単独でどう出てもコード全体を検証不能にするからです。",
        ],
      },
    ],
    es: [
      {
        heading: "Los 18 caracteres de un USCC y qué significa cada bloque",
        paragraphs: [
          "Un código social de crédito unificado tiene 18 caracteres tomados de un alfabeto de 31 que excluye deliberadamente I, O, Z y S para evitar confusión con 1 y 0 y con dígitos manuscritos. La disposición es posicional: el primer dígito es la clase de autoridad de registro, el segundo el organismo registrador, los dígitos 3 a 5 y 6 a 9 codifican la división administrativa, del 10 al 17 son el código de organización y el último es el carácter de control.",
          "El carácter de control usa ISO 7064 MOD 31-2 con un vector de pesos específico (1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28), módulo 31, y un mapeo del resto resultante al alfabeto de 31 caracteres. Ese vector no es un número redondo: cada peso es una potencia de 3 módulo 31, que es precisamente lo que hace que el esquema detecte transposiciones y sustituciones de un carácter de forma fiable.",
          "La lectura práctica es la misma que con los números de identidad: una suma de control correcta prueba consistencia interna y nada más. Si la organización existe realmente, si el código de división era válido en el año de registro y si la autoridad de registro emitió de verdad el código son tres hechos separados a los que esta herramienta no tiene acceso.",
        ],
      },
      {
        heading: "Por qué el alfabeto omite cuatro letras y por qué importa para tus datos de prueba",
        paragraphs: [
          "El conjunto de 31 caracteres excluye I, O, Z y S porque cada uno es visualmente ambiguo con un dígito o con otra letra. Cuando un código se dicta por teléfono, se imprime en un formulario y se transcribe a mano, o se escanea desde un PDF de baja resolución, esos cuatro caracteres son los que la gente equivoca. Eliminarlos suprime toda una clase de error de transcripción a costa de cuatro caracteres de entropía: un intercambio que los sistemas de registro hacen deliberadamente.",
          "Esa restricción es una trampa para quien escribe fixtures: una muestra hecha a mano con la letra O parece plausible y falla la validación, y luego la culpa recae sobre el validador o sobre el código falso. Generar muestras mediante el algoritmo en vez de teclearlas garantiza que el alfabeto y el carácter de control sean siempre coherentes, y por eso este generador expone los campos en lugar de pedirte ensamblar la cadena a mano.",
          "La generación de secuencias también debe respetar el límite del alfabeto: cuando el bloque del código de organización incrementa más allá del final del conjunto, el acarreo debe propagarse correctamente, porque un carácter fuera del alfabeto haría inverificable todo el código, independientemente del resultado aislado de la suma de control.",
        ],
      },
    ],
    pt: [
      {
        heading: "Os 18 caracteres de um USCC e o que cada bloco significa",
        paragraphs: [
          "Um código social de crédito unificado tem 18 caracteres tirados de um alfabeto de 31 que exclui deliberadamente I, O, Z e S para evitar confusão com 1 e 0 e com dígitos manuscritos. O layout é posicional: o primeiro dígito é a classe de autoridade de registro, o segundo o órgão registrador, os dígitos 3 a 5 e 6 a 9 codificam a divisão administrativa, do 10 ao 17 são o código de organização e o último é o caractere verificador.",
          "O caractere verificador usa ISO 7064 MOD 31-2 com um vetor de pesos específico (1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28), módulo 31, e um mapeamento do resto resultante ao alfabeto de 31 caracteres. Esse vetor não é um número redondo: cada peso é uma potência de 3 módulo 31, e é exatamente isso que faz o esquema detectar transposições e substituições de um único caractere de forma confiável.",
          "A leitura prática é a mesma dos números de identidade: uma soma de verificação correta prova consistência interna e nada além. Se a organização existe de fato, se o código de divisão era válido no ano de registro e se a autoridade de registro realmente emitiu o código são três fatos separados aos quais esta ferramenta não tem acesso.",
        ],
      },
      {
        heading: "Por que o alfabeto omite quatro letras e por que isso importa para seus dados de teste",
        paragraphs: [
          "O conjunto de 31 caracteres exclui I, O, Z e S porque cada um é visualmente ambíguo com um dígito ou com outra letra. Quando um código é ditado ao telefone, impresso num formulário e transcrito à mão, ou lido de um PDF de baixa resolução, esses quatro caracteres são os que as pessoas erram. Removê-los suprime toda uma classe de erro de transcrição ao custo de quatro caracteres de entropia — uma troca que sistemas de registro fazem de propósito.",
          "Essa restrição é uma armadilha para quem escreve fixtures: uma amostra feita à mão com a letra O parece plausível e falha na validação, e a falha cai no validador ou na ideia de que o código é falso. Gerar amostras pelo algoritmo em vez de digitá-las garante que o alfabeto e o caractere verificador sejam sempre coerentes, e é por isso que este gerador expõe os campos em vez de pedir que você monte a string à mão.",
          "A geração de sequências também precisa respeitar o limite do alfabeto: quando o bloco do código de organização incrementa além do fim do conjunto, o transporte deve se propagar corretamente, porque um caractere fora do alfabeto tornaria todo o código inverificável, independentemente do resultado isolado da soma de verificação.",
        ],
      },
    ],
  };

  const generator: Record<(typeof CORE)[number], Section[]> = {
    en: [
      {
        heading: "Building a valid USCC from parts, using the real algorithm",
        paragraphs: [
          "The generator takes the registration authority digits, a division code and an organization-code seed, assembles them into the positional layout and appends the ISO 7064 MOD 31-2 check character computed over the seventeen preceding characters. Because the check character is derived rather than guessed, every generated code validates — which is what a test fixture needs.",
          "The alphabet is the part that trips people up. Because I, O, Z and S are not in the 31-character set, an organization seed containing them cannot be used; the tool rejects it rather than silently substituting, because silent substitution would produce a code whose text differs from the input and whose provenance is then unclear.",
          "Sequence framing matters too: generating several codes increments the organization block, and the carry must respect the alphabet. A batch that wraps from the last valid character back to the first has to do so through the defined alphabet order, since any character outside the set makes the whole code unverifiable no matter what the checksum says.",
        ],
      },
      {
        heading: "What a generated code does and does not claim",
        paragraphs: [
          "A generated code is exactly that: a string that satisfies the format and the check character. It carries no claim that the organization exists, that the division code was valid when it allegedly registered, or that any authority issued it. The tool labels generated output as test data and keeps that labeling visible next to the result rather than only in documentation.",
          "This matters for reviewability. If a generated code leaks into a production fixture and someone tries to look it up in a national registry, the lookup will fail — and the failure is the intended behavior, not a bug. Making the generated nature explicit in the UI is what keeps that surprise from turning into a support ticket.",
          "The broader point is that validation and verification are different operations. This site can tell you a code is well-formed; it cannot tell you a company exists. Any tool that claims otherwise is either querying a database you did not authorize or guessing.",
        ],
      },
    ],
    zh: [
      {
        heading: "用真实算法从零件拼出一个有效的统一社会信用代码",
        paragraphs: [
          "生成器取出登记管理部门位、行政区划码与组织机构代码种子,按位置布局组装,并对前 17 个字符算出 ISO 7064 MOD 31-2 校验字符附在末尾。因为校验字符是推导而非猜测,每个生成的代码都能通过校验——这正是测试数据需要的。",
          "最容易绊倒人的是字母表。由于 I、O、Z、S 不在 31 字符集里,含这些字母的机构种子无法使用;工具直接拒绝,而不是悄悄替换——静默替换会产出一个文本与输入不同、来路不清的代码。",
          "序号框架同样重要:连续生成多个代码会递增组织机构块,进位必须尊重字母表。批次从最后一个合法字符回绕到第一个时,必须按定义的字母表顺序走,因为任何超出集合的字符都会让整段代码无法校验,无论校验和算出什么。",
        ],
      },
      {
        heading: "生成的代码声称了什么,又没有声称什么",
        paragraphs: [
          "生成的代码就是它本身:一个满足格式与校验字符的字符串。它不携带任何「该企业存在」「该区划码在所谓注册当年有效」「某机关签发过它」的主张。工具把生成结果标注为测试数据,并让这一标注在结果旁边持续可见,而不是只写在文档里。",
          "这对可核查性很重要。如果一个生成的代码泄漏进生产数据,有人拿去国家企业信用信息公示系统查询,查询会失败——而失败是预期行为,不是 bug。在界面上明示「这是生成的」,正是防止这个意外变成工单的关键。",
          "更根本的一点:校验与核实是两种不同的操作。本站能告诉你一个代码格式良好;它不能告诉你一家公司存在。任何声称能做到后者的工具,要么在查一个你没授权的数据库,要么在猜。",
        ],
      },
    ],
    ja: [
      {
        heading: "実アルゴリズムで部品から有効な USCC を組み立てる",
        paragraphs: [
          "生成器は登記管理部門の桁、行政区画コード、組織コードの種を受け取り、位置レイアウトに組み立て、先行 17 文字から ISO 7064 MOD 31-2 の検査文字を算出して末尾に付けます。検査文字は推測ではなく導出なので、生成されたコードはすべて検証を通ります — テストフィクスチャが必要とするのはまさにそれです。",
          "つまずきやすいのは字母です。I・O・Z・S は 31 文字集合に含まれないため、それらを含む組織種は使えません。ツールは黙って置換せず拒否します。黙って置換すれば、入力と本文が異なり出所の不明なコードができるからです。",
          "順序の枠組みも重要です。複数のコードを生成すると組織ブロックが増え、桁上がりは字母を尊重しなければなりません。バッチが最後の有効文字から先頭へ回り込むときは定義された字母順で回る必要があります。集合外の文字は検査和が何を言おうとコード全体を検証不能にするからです。",
        ],
      },
      {
        heading: "生成コードが主張すること、しないこと",
        paragraphs: [
          "生成コードはまさにそれです。形式と検査文字を満たす文字列。組織が存在する、行政区画コードが登記当年に有効だった、いずれかの機関が発行した、という主張は一切含みません。ツールは生成出力をテストデータと表示し、その表示を文書だけでなく結果の横に保ちます。",
          "これは検証可能性にとって重要です。生成コードが本番データに紛れ込み、誰かが国家登記簿で照会すると失敗します — そしてその失敗は意図された挙動で、バグではありません。生成物であることを UI で明示することが、その驚きをサポートチケットに変えないための鍵です。",
          "より広い論点は、検証と確認は別の操作だということです。本サイトはコードが整形式であると伝えられますが、会社が存在するとは伝えられません。後者ができると主張するツールは、あなたが許可していないデータベースを照会しているか、推測しているかのどちらかです。",
        ],
      },
    ],
    es: [
      {
        heading: "Construir un USCC válido a partir de partes con el algoritmo real",
        paragraphs: [
          "El generador toma los dígitos de la autoridad de registro, un código de división y una semilla de código de organización, los ensambla en el diseño posicional y añade el carácter de control ISO 7064 MOD 31-2 calculado sobre los diecisiete caracteres precedentes. Como el carácter se deriva en vez de adivinarse, todo código generado valida, que es lo que un fixture de pruebas necesita.",
          "El alfabeto es la parte que desconcierta. Como I, O, Z y S no están en el conjunto de 31 caracteres, una semilla de organización que los contenga no puede usarse; la herramienta la rechaza en vez de sustituir en silencio, porque una sustitución silenciosa produciría un código cuyo texto difiere de la entrada y cuya procedencia queda poco clara.",
          "El encuadre de secuencias también importa: generar varios códigos incrementa el bloque de organización, y el acarreo debe respetar el alfabeto. Un lote que da la vuelta del último carácter válido al primero debe hacerlo por el orden alfabético definido, ya que cualquier carácter fuera del conjunto hace inverificable todo el código, diga lo que diga la suma de control.",
        ],
      },
      {
        heading: "Qué afirma y qué no afirma un código generado",
        paragraphs: [
          "Un código generado es exactamente eso: una cadena que satisface el formato y el carácter de control. No conlleva ninguna afirmación de que la organización exista, de que el código de división fuera válido cuando supuestamente se registró, ni de que alguna autoridad lo emitiera. La herramienta etiqueta la salida generada como datos de prueba y mantiene esa etiqueta visible junto al resultado, no solo en la documentación.",
          "Esto importa para la auditabilidad. Si un código generado se filtra a un fixture de producción y alguien intenta consultarlo en un registro nacional, la consulta fallará, y el fallo es el comportamiento previsto, no un bug. Hacer explícita la naturaleza generada en la interfaz es lo que impide que esa sorpresa se convierta en un ticket de soporte.",
          "El punto más amplio es que validar y verificar son operaciones distintas. Este sitio puede decirte que un código está bien formado; no puede decirte que una empresa existe. Cualquier herramienta que afirme lo contrario está consultando una base de datos que no autorizaste o adivinando.",
        ],
      },
    ],
    pt: [
      {
        heading: "Construir um USCC válido a partir de partes com o algoritmo real",
        paragraphs: [
          "O gerador pega os dígitos da autoridade de registro, um código de divisão e uma semente de código de organização, monta-os no layout posicional e acrescenta o caractere verificador ISO 7064 MOD 31-2 calculado sobre os dezessete caracteres precedentes. Como o caractere é derivado em vez de adivinhado, todo código gerado valida — que é o que um fixture de teste precisa.",
          "O alfabeto é a parte que confunde. Como I, O, Z e S não estão no conjunto de 31 caracteres, uma semente de organização que os contenha não pode ser usada; a ferramenta recusa em vez de substituir em silêncio, porque uma substituição silenciosa produziria um código cujo texto difere da entrada e cuja procedência fica obscura.",
          "O enquadramento de sequências também importa: gerar vários códigos incrementa o bloco de organização, e o transporte deve respeitar o alfabeto. Um lote que dá a volta do último caractere válido ao primeiro precisa fazê-lo pela ordem alfabética definida, já que qualquer caractere fora do conjunto torna todo o código inverificável, diga o que disser a soma de verificação.",
        ],
      },
      {
        heading: "O que um código gerado afirma e o que não afirma",
        paragraphs: [
          "Um código gerado é exatamente isso: uma string que satisfaz o formato e o caractere verificador. Não carrega nenhuma afirmação de que a organização exista, de que o código de divisão fosse válido quando supostamente se registrou, nem de que alguma autoridade o emitiu. A ferramenta rotula a saída gerada como dados de teste e mantém esse rótulo visível ao lado do resultado, não só na documentação.",
          "Isso importa para auditabilidade. Se um código gerado vazar para um fixture de produção e alguém tentar consultá-lo num registro nacional, a consulta falhará — e a falha é o comportamento pretendido, não um bug. Tornar explícita a natureza gerada na interface é o que impede que essa surpresa vire um chamado de suporte.",
          "O ponto mais amplo é que validar e verificar são operações diferentes. Este site pode dizer que um código está bem formado; não pode dizer que uma empresa existe. Qualquer ferramenta que afirme o contrário está consultando um banco de dados que você não autorizou ou adivinhando.",
        ],
      },
    ],
  };

  return pick5(mode === "validator" ? validator : generator, locale);
}

/** 人民币大写:正转与逆转两个方向共用一个工厂。 */
export function rmbDeepDive(mode: "toUppercase" | "toNumber", locale: Locale): Section[] | undefined {
  const toUppercase: Record<(typeof CORE)[number], Section[]> = {
    en: [
      {
        heading: "Why Chinese financial amounts use different digits entirely",
        paragraphs: [
          "Ordinary Chinese numerals (一二三四) are simple strokes and trivially altered: adding a stroke turns 一 into 十, or 二 into 三. On a cheque or settlement voucher, that single stroke is the difference between the amount someone intended and the amount someone wrote. Financial numerals solve this by using a separate set of characters (壹贰叁肆) whose strokes are dense and cannot be cheaply modified without leaving visible traces.",
          "The system also fixes positions explicitly. 拾 (ten), 佰 (hundred), 仟 (thousand) appear as place markers, and 万 / 亿 divide the number into large blocks, so an amount reads as a sequence of digit-then-place pairs. This is why a written amount cannot be silently rescaled by moving a decimal point — there is no decimal point in the financial form at all; the 角 and 分 positions do that job.",
          "The 元 character marks the boundary between whole yuan and fractional parts. Everything before it is yuan, the 角 position is tenths, and the 分 position is hundredths. Chinese amounts stop at 分 in practice, which is why this tool accepts at most two decimal places and refuses to round rather than rounding silently.",
        ],
      },
      {
        heading: "整, 零 and the placement rules that trip people up",
        paragraphs: [
          "整 (whole) closes an amount that has no fractional part. It appears after 元 when the amount is a whole number of yuan, and after 角 when there are jiao but no fen — 壹仟肆佰零玖元伍角整 is correct for 1409.50, and 壹仟肆佰零玖元整 for 1409.00. Writing 整 after any 分 is wrong, which is why a converter that appends it unconditionally produces invalid vouchers.",
          "零 does not mean zero as a quantity; it is a gap marker. When the 角 place is empty but 分 is present, the amount reads 元零…分 — one 零 to signal the skipped place. When a zero appears inside the integer part, 零 also appears there to prevent misreading across the skipped place, but consecutive zeros collapse into a single 零 rather than repeating.",
          "These rules come from the clearing-center guidance that banks cite for voucher completion. They are not stylistic preferences: a voucher whose wording differs from the guidance risks rejection at the counter, which is why this tool follows one consistent convention and states the source rather than offering several variants.",
        ],
      },
    ],
    zh: [
      {
        heading: "为什么中文金额要用完全不同的一套数字",
        paragraphs: [
          "普通中文数字(一二三四)笔画简单,改动起来毫不费力:加一笔可以把一变成十,也可以把二变成三。在支票或结算凭证上,这一笔之差就是「某人想写的金额」与「某人写下的金额」的区别。大写数字正是为此设计的:壹贰叁肆笔画稠密,想改动必然留下可见痕迹。",
          "这套体系还显式固定了位次。拾、佰、仟 作为位标记出现,万、亿 把数字切成大块,于是一个金额读起来就是「数字—位次」成对的序列。这也是为什么书面金额无法靠挪小数点被悄悄改值——凭证上根本没有小数点,角位与分位承担了这个职责。",
          "元 字标记整数元与小数部分的分界。它之前是元,角位是十分之一,分位是百分之一。实务中中文金额止于分,所以本工具最多接受两位小数,并拒绝四舍五入而不是悄悄取整。",
        ],
      },
      {
        heading: "整、零 与那些最容易写错的位次规则",
        paragraphs: [
          "整 用来收束一个没有小数部分的金额。整数元时它跟在元之后,有角无分时它跟在角之后——1409.50 写作 壹仟肆佰零玖元伍角整,1409.00 写作 壹仟肆佰零玖元整。任何带了分的金额后面写整都是错的,这就是为什么无条件追加「整」的转换器会产出不合规的凭证。",
          "零 不是「数值为零」,而是空位标记。当角位为空但分位有值时,金额读作 元零…分——一个零标示被跳过的位次。当整数部分内部出现零时,零也会在那里出现,以免跨过空位误读,但连续多个零会合并成一个零而不是重复书写。",
          "这些规则来自银行引用办理凭证的清算中心指引。它们不是行文风格偏好:措辞与指引不符的凭证有在柜台被退回的风险,所以本工具遵循单一一致的惯例并标注出处,而不是提供好几种写法。",
        ],
      },
    ],
    ja: [
      {
        heading: "中国語の金額が全く別の数字体系を使う理由",
        paragraphs: [
          "通常の漢数字(一二三四)は画数が少なく、改変が容易です。一に一画足せば十に、二に一画足せば三になります。小切手や決済証書では、その一画の差が「書こうとした金額」と「書かれた金額」の差になります。大字はそのために設計されました。壱弐参肆は画数が密で、改変すれば必ず痕跡が残ります。",
          "この体系は位取りも明示します。拾・佰・仟 が位標として現れ、万・億 が数を大きな塊に区切るため、金額は「数字＋位」の対の列として読めます。書面の金額が小数点を動かして静かに書き換えられないのはこのためです。証書に小数点は存在せず、角位と分位がその役を担います。",
          "元 は整数部と小数部の境界を示します。その前が元、角位が十分の一、分位が百分の一です。実務上、中国語の金額は分で止まるため、本ツールは小数 2 桁まで受け入れ、四捨五入せずに拒否します。",
        ],
      },
      {
        heading: "整・零 と、間違えやすい位取りの規則",
        paragraphs: [
          "整 は小数部のない金額を締めます。整数元なら元の後、角あり分なしなら角の後に付きます — 1409.50 は 壹仟肆佰零玖元伍角整、1409.00 は 壹仟肆佰零玖元整。分を含む金額の後に整を書くのは誤りで、無条件に「整」を足す変換器が不正な証書を作るのはこのためです。",
          "零 は「数量がゼロ」ではなく空位の標識です。角位が空で分位に値があるとき、金額は 元零…分 と読み、一つの零が飛ばされた位を示します。整数部の内部にゼロが現れるときも、空位を越えた誤読を防ぐために零が現れますが、連続するゼロは繰り返さず一つに畳みます。",
          "これらの規則は、銀行が証書作成のために引用する清算センターの指針に由来します。文体の好みではありません。指針と文言が異なる証書は窓口で受理されない危険があるため、本ツールは単一の一貫した慣行に従い、出典を明記します。",
        ],
      },
    ],
    es: [
      {
        heading: "Por qué los importes financieros chinos usan dígitos completamente distintos",
        paragraphs: [
          "Los numerales chinos ordinarios (一二三四) tienen pocos trazos y se alteran trivialmente: añadir un trazo convierte 一 en 十, o 二 en 三. En un cheque o comprobante de liquidación, ese único trazo es la diferencia entre el importe que alguien quiso escribir y el que alguien escribió. Los numerales financieros lo resuelven usando un conjunto separado de caracteres (壹贰叁肆) cuyos trazos son densos y no pueden modificarse baratamente sin dejar rastro visible.",
          "El sistema también fija las posiciones explícitamente. 拾 (diez), 佰 (cien) y 仟 (mil) aparecen como marcadores de posición, y 万 / 亿 dividen el número en bloques grandes, así que un importe se lee como una secuencia de pares dígito-posición. Es la razón por la que un importe escrito no puede reescalarse en silencio moviendo la coma decimal: en el formulario financiero no hay coma decimal; las posiciones 角 y 分 hacen ese trabajo.",
          "El carácter 元 marca el límite entre yuanes enteros y partes fraccionarias. Lo anterior son yuanes, la posición 角 son décimas y la posición 分 centésimas. En la práctica los importes chinos terminan en 分, razón por la cual esta herramienta acepta como máximo dos decimales y rechaza en lugar de redondear.",
        ],
      },
      {
        heading: "整, 零 y las reglas de colocación que desconciertan",
        paragraphs: [
          "整 (entero) cierra un importe sin parte fraccionaria. Aparece después de 元 cuando el importe es un número entero de yuanes, y después de 角 cuando hay jiao pero no fen: 壹仟肆佰零玖元伍角整 es correcto para 1409.50, y 壹仟肆佰零玖元整 para 1409.00. Escribir 整 después de cualquier 分 es incorrecto, y por eso un conversor que lo añade incondicionalmente produce comprobantes inválidos.",
          "零 no significa cero como cantidad; es un marcador de hueco. Cuando la posición 角 está vacía pero hay 分, el importe se lee 元零…分: un solo 零 que señala la posición omitida. Cuando aparece un cero dentro de la parte entera, 零 también aparece ahí para evitar mala lectura a través del hueco, pero ceros consecutivos se colapsan en un único 零 en lugar de repetirse.",
          "Estas reglas provienen de la guía del centro de compensación que los bancos citan para cumplimentar comprobantes. No son preferencias estilísticas: un comprobante cuyo texto difiere de la guía arriesga rechazo en ventanilla, y por eso esta herramienta sigue una convención única y declara la fuente en lugar de ofrecer varias variantes.",
        ],
      },
    ],
    pt: [
      {
        heading: "Por que valores financeiros chineses usam dígitos inteiramente diferentes",
        paragraphs: [
          "Os numerais chineses comuns (一二三四) têm poucos traços e são trivialmente alterados: acrescentar um traço transforma 一 em 十, ou 二 em 三. Num cheque ou comprovante de liquidação, esse único traço é a diferença entre o valor que alguém quis escrever e o que alguém escreveu. Os numerais financeiros resolvem isso com um conjunto separado de caracteres (壹贰叁肆) cujos traços são densos e não podem ser modificados baratamente sem deixar vestígio visível.",
          "O sistema também fixa as posições explicitamente. 拾 (dez), 佰 (cem) e 仟 (mil) aparecem como marcadores de posição, e 万 / 亿 dividem o número em blocos grandes, então um valor é lido como uma sequência de pares dígito-posição. É por isso que um valor escrito não pode ser reescalado em silêncio movendo a vírgula: no formulário financeiro não existe vírgula decimal; as posições 角 e 分 fazem esse trabalho.",
          "O caractere 元 marca a fronteira entre yuans inteiros e partes fracionárias. O que vem antes são yuans, a posição 角 são décimos e a posição 分 centésimos. Na prática os valores chineses terminam em 分, razão pela qual esta ferramenta aceita no máximo duas casas decimais e recusa em vez de arredondar.",
        ],
      },
      {
        heading: "整, 零 e as regras de colocação que confundem",
        paragraphs: [
          "整 (inteiro) fecha um valor sem parte fracionária. Aparece depois de 元 quando o valor é um número inteiro de yuans, e depois de 角 quando há jiao mas não fen: 壹仟肆佰零玖元伍角整 é correto para 1409.50, e 壹仟肆佰零玖元整 para 1409.00. Escrever 整 depois de qualquer 分 está errado, e é por isso que um conversor que o acrescenta incondicionalmente produz comprovantes inválidos.",
          "零 não significa zero como quantidade; é um marcador de lacuna. Quando a posição 角 está vazia mas há 分, o valor é lido 元零…分: um único 零 sinalizando a posição pulada. Quando um zero aparece dentro da parte inteira, 零 também aparece ali para evitar leitura errada através da lacuna, mas zeros consecutivos colapsam num único 零 em vez de se repetirem.",
          "Essas regras vêm da orientação do centro de compensação que os bancos citam para preencher comprovantes. Não são preferências estilísticas: um comprovante cujo texto difere da orientação arrisca recusa no caixa, e por isso esta ferramenta segue uma convenção única e declara a fonte em vez de oferecer várias variantes.",
        ],
      },
    ],
  };

  const toNumber: Record<(typeof CORE)[number], Section[]> = {
    en: [
      {
        heading: "Parsing financial numerals back into a number",
        paragraphs: [
          "Reverse conversion has to handle what forward conversion never produces: real-world variation. Vouchers written by different banks and clerks use 元 or 圆, sometimes omit 整, and occasionally place 零 in slightly different spots. A parser that understands only one canonical form will reject valid paperwork, so this tool accepts the common aliases while reporting exactly which normalized number it derived.",
          "The parse strategy is positional and sequential. Each financial digit contributes a digit value; each place marker (拾 佰 仟 万 亿) multiplies the accumulated value for that block; 角 and 分 switch the parser into fractional mode. When 万 and 亿 appear, the accumulated block is flushed upward, which is what makes 壹亿贰仟万 parse correctly as a block structure rather than a flat digit stream.",
          "Ambiguity is reported, not resolved silently. A string containing a financial digit where a place marker should be, or a 亿 followed by a 万 without an intervening block, is rejected with a reason rather than coerced into a plausible number — because the failure mode of coercing is producing a different amount than what the document says.",
        ],
      },
      {
        heading: "What reverse conversion is for, and where it must stop",
        paragraphs: [
          "The realistic use is data entry and reconciliation: a stack of vouchers needs to become spreadsheet rows, or a scanned ledger line has to be checked against a booked figure. In that workflow the tool's job is to produce a number a human can compare, and to be explicit when it cannot, so the human checks that line instead of trusting an invented value.",
          "The hard limit is that reverse conversion verifies nothing about the document. It cannot tell you whether the voucher is authentic, whether the amount matches an invoice, or whether the writing is consistent with the issuer's convention. It converts a string into a number, and the note under the result says exactly that.",
          "Edge behaviour matters more here than in forward conversion: more than two decimal places, missing 元, or a stray character all change whether a value is usable. Each of those cases gets a distinct message rather than a generic failure, because a data-entry operator needs to know whether to fix the entry or discard the row.",
        ],
      },
    ],
    zh: [
      {
        heading: "把大写金额解析回数字",
        paragraphs: [
          "反向转换必须处理正向转换永远不会产生的东西:现实中的变体。不同银行与柜员写出的凭证会用元或圆,有时省略整,偶尔把零放在略不同的位置。只认一种规范写法的解析器会把合法单据判为无效,所以本工具接受常见别名,同时精确报告它推导出的归一化数字。",
          "解析策略是按位、按序。每个大写数字贡献一个数值;每个位标记(拾 佰 仟 万 亿)对该块的累计值做乘法切换;角与分让解析器进入小数模式。万与亿出现时,累计块向上冲刷——这正是 壹亿贰仟万 能被正确解析为块结构而不是一维数字流的原因。",
          "歧义会被报告而不是被静默消解。大写数字出现在本该是位标记的位置、或亿后面跟着万却中间没有块,都会被拒绝并给出原因,而不是硬凑成一个看起来合理的数字——因为硬凑的失败模式是产出一个与单据不符的金额。",
        ],
      },
      {
        heading: "反向转换是干什么用的,以及它必须在哪里停下",
        paragraphs: [
          "实际用途是录入与对账:一叠凭证要变成表格行,或扫描到的台账某行要与已记账数字核对。在这类流程里,工具的职责是产出一个人类能比对的数字,并在无法产出时明说,让人去查那一行,而不是相信一个凭空造出的值。",
          "硬性边界是反向转换对单据本身不做任何验证。它不能告诉你凭证是否真实、金额是否与发票一致、字迹是否符合开票方的惯例。它把一个字符串变成数字,结果下方的说明正是这样写的。",
          "边界行为在这里比正向转换更重要:超过两位小数、缺少元、或混入杂字符,都会改变这个值是否可用。每种情况都有各自的消息而不是笼统失败,因为录入人员需要知道是该修正录入还是丢弃这一行。",
        ],
      },
    ],
    ja: [
      {
        heading: "大字金額を数値に戻す",
        paragraphs: [
          "逆変換は、正変換が決して生まないもの — 現実のばらつき — を扱わなければなりません。銀行や係員によって書かれた証書は元や円を使い、時に整を省き、零を少し違う位置に置きます。単一の正規形しか理解しないパーサーは正当な書類を弾くため、本ツールは一般的な別表記を受け入れつつ、導出した正規化数値を正確に報告します。",
          "解析方針は位取りと順序に基づきます。各大字数字は数値を寄与し、位標(拾 佰 仟 万 億)がその塊の累計を乗算的に切り替え、角と分で小数モードに入ります。万や億が現れると累計ブロックが上へ流されます — 壹億貳仟万 が一次元の数字列ではなく塊構造として正しく解析されるのはこのためです。",
          "曖昧さは黙って解消せず報告します。位標があるべき位置に大字数字がある、億の直後に万が来るが間の塊がない、といった文字列は理由付きで拒否され、もっともらしい数値に強制変換されません。強制変換の失敗モードは、書類と異なる金額を作ることだからです。",
        ],
      },
      {
        heading: "逆変換の用途と、止まらなければならない地点",
        paragraphs: [
          "現実的な用途は入力と照合です。証書の束を表計算の行にする、スキャンした台帳の一行を記帳済みの数字と突き合わせる。その工程でツールの役割は、人間が比較できる数値を出し、出せないときは明示することです。そうすれば人間はその行を確認し、捏造された値を信じることはありません。",
          "厳格な限界は、逆変換が書類そのものについて何も検証しないことです。証書が真正か、金額が請求書と一致するか、筆跡が発行者の慣行に沿うかは分かりません。文字列を数値に変換するだけで、結果下の注記がそう明記します。",
          "境界挙動は正変換より重要です。小数 3 桁以上、元の欠落、余計な文字は、いずれも値が使えるかどうかを変えます。それぞれに個別のメッセージを返し、一律の失敗にしないのは、入力担当者が「修正すべきか行を捨てるべきか」を知る必要があるからです。",
        ],
      },
    ],
    es: [
      {
        heading: "Convertir numerales financieros de vuelta a un número",
        paragraphs: [
          "La conversión inversa debe manejar lo que la directa nunca produce: variación del mundo real. Los comprobantes escritos por distintos bancos y cajeros usan 元 o 圆, a veces omiten 整 y ocasionalmente colocan 零 en posiciones algo distintas. Un parser que solo entiende una forma canónica rechazará papeles válidos, así que esta herramienta acepta los alias comunes mientras informa exactamente qué número normalizado derivó.",
          "La estrategia de análisis es posicional y secuencial. Cada dígito financiero aporta un valor; cada marcador de posición (拾 佰 仟 万 亿) multiplica el valor acumulado de ese bloque; 角 y 分 ponen el parser en modo fraccionario. Cuando aparecen 万 y 亿, el bloque acumulado se descarga hacia arriba, que es lo que hace que 壹亿贰仟万 se analice correctamente como estructura de bloques y no como un flujo plano de dígitos.",
          "La ambigüedad se informa, no se resuelve en silencio. Una cadena con un dígito financiero donde debería haber un marcador, o un 亿 seguido de 万 sin bloque intermedio, se rechaza con una razón en lugar de forzarse a un número plausible, porque el modo de fallo de forzar es producir un importe distinto del que dice el documento.",
        ],
      },
      {
        heading: "Para qué sirve la conversión inversa y dónde debe detenerse",
        paragraphs: [
          "El uso realista es captura de datos y conciliación: una pila de comprobantes debe convertirse en filas de hoja de cálculo, o una línea de libro escaneada debe contrastarse con una cifra registrada. En ese flujo, la tarea de la herramienta es producir un número que una persona pueda comparar, y ser explícita cuando no puede, para que la persona revise esa línea en vez de confiar en un valor inventado.",
          "El límite duro es que la conversión inversa no verifica nada sobre el documento. No puede decir si el comprobante es auténtico, si el importe coincide con una factura o si la escritura es consistente con la convención del emisor. Convierte una cadena en un número, y la nota bajo el resultado dice exactamente eso.",
          "El comportamiento en los bordes importa más aquí que en la conversión directa: más de dos decimales, falta de 元 o un carácter suelto cambian si un valor es utilizable. Cada uno de esos casos recibe un mensaje distinto en vez de un fallo genérico, porque un operador de captura necesita saber si corregir la entrada o descartar la fila.",
        ],
      },
    ],
    pt: [
      {
        heading: "Converter numerais financeiros de volta a um número",
        paragraphs: [
          "A conversão inversa precisa lidar com o que a direta nunca produz: variação do mundo real. Comprovantes escritos por bancos e caixas diferentes usam 元 ou 圆, às vezes omitem 整 e ocasionalmente colocam 零 em posições um pouco diferentes. Um parser que só entende uma forma canônica rejeitará papelada válida, então esta ferramenta aceita os aliases comuns enquanto informa exatamente qual número normalizado derivou.",
          "A estratégia de análise é posicional e sequencial. Cada dígito financeiro contribui com um valor; cada marcador de posição (拾 佰 仟 万 亿) multiplica o valor acumulado daquele bloco; 角 e 分 colocam o parser em modo fracionário. Quando 万 e 亿 aparecem, o bloco acumulado é descarregado para cima, que é o que faz 壹亿贰仟万 ser analisado corretamente como estrutura de blocos e não como um fluxo plano de dígitos.",
          "A ambiguidade é informada, não resolvida em silêncio. Uma string com um dígito financeiro onde deveria haver um marcador, ou um 亿 seguido de 万 sem bloco intermediário, é recusada com um motivo em vez de forçada a um número plausível, porque o modo de falha de forçar é produzir um valor diferente do que o documento diz.",
        ],
      },
      {
        heading: "Para que serve a conversão inversa e onde ela deve parar",
        paragraphs: [
          "O uso realista é entrada de dados e conciliação: uma pilha de comprovantes precisa virar linhas de planilha, ou uma linha de livro escaneada precisa ser conferida contra um valor lançado. Nesse fluxo, a tarefa da ferramenta é produzir um número que uma pessoa possa comparar, e ser explícita quando não consegue, para que a pessoa revise aquela linha em vez de confiar num valor inventado.",
          "O limite duro é que a conversão inversa não verifica nada sobre o documento. Não pode dizer se o comprovante é autêntico, se o valor coincide com uma nota fiscal ou se a escrita é consistente com a convenção do emissor. Ela converte uma string em número, e a nota sob o resultado diz exatamente isso.",
          "O comportamento nas bordas importa mais aqui do que na conversão direta: mais de duas casas decimais, falta de 元 ou um caractere solto mudam se um valor é utilizável. Cada um desses casos recebe uma mensagem distinta em vez de falha genérica, porque um operador de entrada precisa saber se corrige o lançamento ou descarta a linha.",
        ],
      },
    ],
  };

  return pick5(mode === "toUppercase" ? toUppercase : toNumber, locale);
}
