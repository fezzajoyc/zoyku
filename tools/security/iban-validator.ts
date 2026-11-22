import { SecEngineIban } from "../_engines/sec-engine-iban";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "iban-validator",
  category: "security",
  icon: "shield",
  engine: { component: SecEngineIban },
  related: ["social-credit-validator", "chinese-id-validator", "email-validator", "vat-calculator"],
  copy: {
    en: {
      name: "IBAN Validator & Parser",
      tagline:
        "Validate and parse IBANs from 100 countries — ISO 13616 country lengths, ISO/IEC 7064 MOD-97 check, batch mode with country/check-digit/BBAN breakdown. Free, private, offline.",
      intro: [
        "A wrong character in an international bank transfer means a delayed or lost payment. This validator checks IBANs exactly the way the standard intends: the character set, the country-specific total length from the ISO 13616 registry (100 countries), and the MOD-97-10 remainder check from ISO/IEC 7064:2003 that catches every single-character substitution.",
        "Batch mode accepts one IBAN per line and returns, for each valid entry, the country code, the two check digits, the BBAN (bank and account portion) and the canonical four-character grouped format that payment forms expect. Invalid entries get a specific reason — wrong country length, illegal character, unknown country or failed checksum — instead of a bare rejection.",
        "Everything runs locally in your browser: no lookups against banks, no transmission of account data. Note that a structurally valid IBAN does not prove the account exists — only that the number is internally consistent and correctly formed for its country.",
      ],
      steps: [
        "Paste one IBAN per line — spaces and dashes are normalized automatically.",
        "Click Validate — each line gets a verdict with the parsed breakdown.",
        "For valid entries, copy the canonical grouped format; for invalid ones, read the specific reason and fix the input.",
      ],
      faqs: [
        {
          q: "What does a passing IBAN actually prove?",
          a: "Only that the number is well-formed: correct character set, correct length for its country, and a checksum that matches. It does not prove the bank code exists, the account is open, or the recipient matches. For high-value transfers, confirm the IBAN with the beneficiary through a separate channel.",
        },
        {
          q: "Which countries are supported?",
          a: "All 100 countries in the ISO 13616 registry, from AD (Andorra) to XK (Kosovo) — including full SEPA coverage. The US and China do not participate in the IBAN system and therefore are not in the registry; an IBAN starting with US or CN is invalid by definition.",
        },
      ],
      deepDive: [
        {
          heading: "Why MOD-97 catches almost every typo",
          paragraphs: [
            "The check works on one big integer. Take the IBAN, move the first four characters (country code plus check digits) to the end, replace every letter with its ISO value (A=10 … Z=35), and interpret the whole string as one number. A valid IBAN leaves remainder 1 when divided by 97 — the MOD 97-10 system of ISO/IEC 7064:2003.",
            "Dividing by a two-digit prime like 97 is what gives the check its power: every single-character substitution changes the remainder, as does the transposition of any two adjacent characters and nearly all other transpositions. The two leading check digits are themselves part of the arithmetic, so a country code typo fails just like a digit typo. Wrong-length numbers fail earlier, at the registry check.",
            "The cost of this strength is that the arithmetic must be exact. JavaScript numbers lose precision beyond 2^53, so the computation uses BigInt over up to 68 decimal digits; any implementation that floats this computation will accept corrupted IBANs. When cross-checking with another tool, a disagreement almost always means one of the two implementations is floating the math.",
          ],
        },
        {
          heading: "What the registry knows — and what it deliberately does not",
          paragraphs: [
            "The 100-country registry is maintained by SWIFT as the ISO 13616 registration authority; it fixes each country's total length (DE 22, FR 27, MT 31 …) and its SEPA membership. Length matters as much as the checksum: a 21-character DE IBAN can pass a naive mod-97 test with reordered check digits, so this tool checks length first, then the checksum.",
            "What the tool deliberately does not do: validate the bank code, branch code or the national check digits that many countries embed inside their BBAN (Germany's method has its own mod-11, France reports the Rib key, Italy uses a CAB+ABI structure). Those belong to domestic banking systems and change independently of ISO 13616. Passing here means the number is well-formed and checksum-consistent — the honest limit that any IBAN checker must state.",
            "SEPA membership is shown because it has practical consequences: within SEPA, a valid IBAN plus a BIC is (since 2016) sufficient for a cross-border credit transfer — national clearing identifiers are no longer required. Outside SEPA, the IBAN is often only part of the routing information.",
          ],
        },
      ],
    },
    zh: {
      name: "IBAN 校验与解析",
      tagline:
        "校验并解析 100 个国家的 IBAN——ISO 13616 国家长度、ISO/IEC 7064 MOD-97 校验、批量模式附国家/校验位/BBAN 拆解。免费、即时、离线可用。",
      intro: [
        "国际汇款里错一个字符就可能延误或丢失款项。本工具按标准本意校验 IBAN:字符集、ISO 13616 注册表的国家长度(100 国)、以及 ISO/IEC 7064:2003 的 MOD-97-10 余数校验——可发现一切单字符替换错误。",
        "批量模式每行一个 IBAN,对有效条目返回国家码、两位校验位、BBAN(银行与账号部分)以及付款表单期望的标准四位分组格式;无效条目给出具体原因——国家长度不符、非法字符、未知国家或校验失败——而非笼统拒绝。",
        "全部在本机浏览器完成:不查询银行、不传输账户数据。注意:结构有效的 IBAN 不代表账户真实存在——只代表该号码内部一致且符合其国家格式。",
      ],
      steps: [
        "每行粘贴一个 IBAN——空格与横线自动归一化。",
        "点击校验——每行给出判定与解析拆解。",
        "有效条目复制标准分组格式;无效条目读具体原因后修正输入。",
      ],
      faqs: [
        {
          q: "IBAN 校验通过能证明什么?",
          a: "只能证明号码构造正确:字符集合法、符合所属国家长度、校验和匹配。它不能证明银行代码存在、账户仍然开着、或收款人相符。大额汇款请通过另一渠道与收款人核对 IBAN。",
        },
        {
          q: "支持哪些国家?",
          a: "ISO 13616 注册表的全部 100 国,从 AD(安道尔)到 XK(科索沃),完整覆盖 SEPA。美国与中国不参与 IBAN 体系,因此不在注册表;以 US 或 CN 开头的 IBAN 按定义无效。",
        },
      ],
      deepDive: [
        {
          heading: "MOD-97 为什么能抓住几乎所有的手误",
          paragraphs: [
            "校验的数学是把整个 IBAN 变成一个大整数:把前四位(国家码+校验位)移到末尾,字母按 ISO 值展开(A=10 … Z=35),整个串当作一个数。合法 IBAN 除以 97 的余数为 1——这就是 ISO/IEC 7064:2003 的 MOD 97-10。",
            "除数选两位素数 97 是强度的来源:任何单字符替换都会改变余数,任意相邻两字符的换位也一样,其余绝大多数换位也逃不掉。开头的两位校验位本身就参与运算,国家码写错与数字写错一样会被抓;长度错误则在更早的注册表检查就失败。",
            "这种强度的代价是运算必须精确。JavaScript 的 number 超过 2^53 就丢精度,所以本工具用 BigInt 处理最多 68 位十进制;任何用浮点数做这个运算的实现都会放过损坏的 IBAN。与其他工具交叉验证出现不一致时,几乎总是其中一方用了浮点。",
          ],
        },
        {
          heading: "注册表知道什么——以及刻意不管什么",
          paragraphs: [
            "100 国注册表由 SWIFT 作为 ISO 13616 注册管理机构维护,它固定了每国的总长度(DE 22、FR 27、MT 31…)与 SEPA 成员身份。长度与校验和同等重要:一条 21 位的 DE IBAN 可以在只做 mod-97 的朴素校验里通过(重排校验位即可),所以本工具先查长度、再查校验和。",
            "工具刻意不做的:校验 BBAN 内部的银行代码、分行代码与许多国家内嵌的国内校验位(德国有自己的 mod-11,法国有 Rib key,意大利用 CAB+ABI 结构)。这些属于各国国内银行体系,与 ISO 13616 各自独立演进。通过本工具只意味着号码构造正确且校验和一致——这是任何 IBAN 校验器都必须声明的诚实边界。",
            "SEPA 身份被展示是因为它有实际后果:SEPA 境内,有效 IBAN 加 BIC 自 2016 年起就足以完成跨境贷记转账,不再需要各国清算标识;SEPA 之外,IBAN 通常只是路由信息的一部分。",
          ],
        },
      ],
    },
    ja: {
      name: "IBAN 検証・パーサー",
      tagline:
        "100 か国の IBAN を検証・解析 — ISO 13616 の国別長、ISO/IEC 7064 MOD-97 チェック、国/チェックディジット/BBAN の内訳付きバッチモード。無料・プライベート・オフライン。",
      intro: [
        "国際送金で一文字でも間違えると支払いが遅延・喪失しかねません。この検証器は標準の意図どおりに IBAN をチェックします:文字セット、ISO 13616 レジストリの国別総長(100 か国)、そしてあらゆる一文字置換を検出する ISO/IEC 7064:2003 の MOD-97-10 余り検査。",
        "バッチモードは 1 行に 1 つの IBAN を受け付け、有効な項目には国コード、2 桁のチェックディジット、BBAN(銀行+口座部分)、支払いフォームが期待する 4 文字グループの正規形式を返します。無効な項目には、国の長さ違い・不正文字・未知の国・チェックサム失敗など具体的な理由を表示します。",
        "すべてブラウザ内で完結:銀行への照会も口座データの送信もありません。構造的に有効な IBAN は口座の実在を保証するものではなく、番号が内部整合し国の形式に合致することだけを示します。",
      ],
      steps: [
        "1 行に 1 つの IBAN を貼り付け — 空白とハイフンは自動で正規化されます。",
        "検証をクリック — 各行に判定と解析内訳が表示されます。",
        "有効な項目は正規グループ形式をコピーし、無効な項目は具体的原因を読んで入力を修正します。",
      ],
      faqs: [
        {
          q: "IBAN 検証の合格が実際に証明するものは?",
          a: "番号が well-formed であることだけです:文字セットが正しい、国の長さに合う、チェックサムが一致。銀行コードの存在、口座が開いていること、受取人の一致は証明しません。高額送金では別のチャネルで受益者と IBAN を確認してください。",
        },
        {
          q: "どの国に対応していますか?",
          a: "ISO 13616 レジストリの全部 100 か国(AD アンドラから XK コソボまで)、SEPA をフルカバー。米国と中国は IBAN システムに非参加のためレジストリにありません。US や CN で始まる IBAN は定義上無効です。",
        },
      ],
      deepDive: [
        {
          heading: "MOD-97 がほぼすべての打ち間違いを検出する理由",
          paragraphs: [
            "検査の数学は IBAN 全体を一つの大きな整数に変換します:先頭 4 文字(国コード+チェックディジット)を末尾へ移動し、字母を ISO 値(A=10 … Z=35)に展開し、全体を一つの数として扱います。正しい IBAN は 97 で割った余りが 1 — これが ISO/IEC 7064:2003 の MOD 97-10 です。",
            "除数に 2 桁の素数 97 を選ぶのが強度の源泉です:あらゆる一文字置換が余りを変え、隣接 2 文字の転置もすべて、その他の大半の転置も検出されます。先頭のチェックディジット自身も演算に参加するため、国コードの打ち間違いも数字と同様に検出されます。長さの誤りはさらに前段のレジストリ検査で失敗します。",
            "この強度の代償は演算の正確さです。JavaScript の number は 2^53 を超えると精度を失うため、本ツールは最大 68 桁を BigInt で処理します。浮動小数でこの計算を行う実装は破損した IBAN を受け入れてしまいます。他ツールとの不一致は、ほぼ常にどちらかが浮動小数を使っていることを意味します。",
          ],
        },
        {
          heading: "レジストリが知っていること、意図的に扱わないこと",
          paragraphs: [
            "100 か国のレジストリは SWIFT が ISO 13616 登録機関として維持し、各国の総長(DE 22、FR 27、MT 31 …)と SEPA 加盟を固定します。長さはチェックサムと同じくらい重要です:21 文字の DE IBAN はチェックディジットを並べ替えれば素朴な mod-97 検査を通るため、本ツールは先に長さ、次にチェックサムを検査します。",
            "意図的に行わないこと:BBAN 内部の銀行コード・支店コード・多くの国が内蔵する国内チェックディジット(ドイツ独自の mod-11、フランスの Rib キー、イタリアの CAB+ABI 構造)の検証。これらは各国の銀行体系に属し、ISO 13616 とは独立に変わります。合格は番号が正しく構成されチェックサムが一致することだけを意味します — どの IBAN チェッカーも表明すべき誠実な限界です。",
            "SEPA 加盟を表示するのは実務的意味があるためです:SEPA 内では、有効な IBAN と BIC があれば(2016 年以降)跨境振込が完了し、国内清算識別子は不要です。SEPA 外では IBAN はしばしばルーティング情報の一部に過ぎません。",
          ],
        },
      ],
    },
    es: {
      name: "Validador y parser de IBAN",
      tagline:
        "Valide y analice IBAN de 100 países — longitudes por país ISO 13616, chequeo MOD-97 de ISO/IEC 7064, modo por lotes con desglose de país/dígitos/BBAN. Gratis, privado, sin conexión.",
      intro: [
        "Un carácter equivocado en una transferencia internacional significa un pago retrasado o perdido. Este validador comprueba los IBAN exactamente como pretende el estándar: el conjunto de caracteres, la longitud total por país del registro ISO 13616 (100 países) y la comprobación de resto MOD-97-10 de ISO/IEC 7064:2003 que detecta toda sustitución de un solo carácter.",
        "El modo por lotes acepta un IBAN por línea y devuelve, para cada entrada válida, el código de país, los dos dígitos de control, el BBAN (parte de banco y cuenta) y el formato agrupado de cuatro caracteres que esperan los formularios de pago. Las entradas no válidas reciben una razón específica en lugar de un rechazo genérico.",
        "Todo se ejecuta localmente en su navegador: sin consultas a bancos ni transmisión de datos de cuenta. Tenga en cuenta que un IBAN estructuralmente válido no prueba que la cuenta exista — solo que el número es internamente consistente y está correctamente formado para su país.",
      ],
      steps: [
        "Pegue un IBAN por línea — los espacios y guiones se normalizan automáticamente.",
        "Haga clic en Validar — cada línea recibe un veredicto con el desglose analizado.",
        "Para las válidas, copie el formato agrupado canónico; para las no válidas, lea la razón específica y corrija la entrada.",
      ],
      faqs: [
        {
          q: "¿Qué demuestra realmente un IBAN que pasa la validación?",
          a: "Solo que el número está bien formado: conjunto de caracteres correcto, longitud correcta para su país y suma de control coincidente. No prueba que el código de banco exista, que la cuenta esté abierta ni que coincida el beneficiario. Para transferencias de alto valor, confirme el IBAN con el beneficiario por otro canal.",
        },
        {
          q: "¿Qué países están admitidos?",
          a: "Los 100 países del registro ISO 13616, de AD (Andorra) a XK (Kosovo), incluida toda la cobertura SEPA. EE. UU. y China no participan en el sistema IBAN y por tanto no están en el registro; un IBAN que empiece por US o CN es inválido por definición.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué MOD-97 detecta casi cualquier error tipográfico",
          paragraphs: [
            "La comprobación opera sobre un gran entero: tome el IBAN, mueva los primeros cuatro caracteres (código de país más dígitos de control) al final, sustituya cada letra por su valor ISO (A=10 … Z=35) e interprete toda la cadena como un número. Un IBAN válido deja resto 1 al dividir por 97 — el sistema MOD 97-10 de ISO/IEC 7064:2003.",
            "Dividir por un primo de dos dígitos como 97 es lo que da potencia a la comprobación: cada sustitución de un carácter cambia el resto, igual que la transposición de dos caracteres adyacentes y casi todas las demás transposiciones. Los dos dígitos de control iniciales forman parte de la aritmética, así que un error en el código de país falla igual que un dígito. Las longitudes incorrectas fallan antes, en la comprobación del registro.",
            "El coste de esta fuerza es que la aritmética debe ser exacta. Los números de JavaScript pierden precisión por encima de 2^53, así que el cálculo usa BigInt sobre hasta 68 dígitos decimales; cualquier implementación que use coma flotante aceptará IBAN corruptos. Si otra herramienta discrepa, casi siempre significa que una de las dos usa coma flotante.",
          ],
        },
        {
          heading: "Lo que el registro sabe — y lo que deliberadamente no",
          paragraphs: [
            "El registro de 100 países lo mantiene SWIFT como autoridad de registro ISO 13616; fija la longitud total de cada país (DE 22, FR 27, MT 31 …) y su pertenencia a SEPA. La longitud importa tanto como el checksum: un IBAN alemán de 21 caracteres puede pasar una prueba mod-97 ingenua con dígitos reordenados, por eso esta herramienta comprueba primero la longitud y después el checksum.",
            "Lo que la herramienta deliberadamente no hace: validar el código de banco, la oficina o los dígitos de control nacionales que muchos países embeben en su BBAN (Alemania tiene su propio mod-11, Francia informa la clave Rib, Italia usa estructura CAB+ABI). Eso pertenece a los sistemas bancarios domésticos y evoluciona independientemente de ISO 13616. Pasar aquí significa que el número está bien formado y es consistente con su checksum — el límite honesto que cualquier verificador de IBAN debe declarar.",
            "La pertenencia a SEPA se muestra por sus consecuencias prácticas: dentro de SEPA, un IBAN válido más un BIC es (desde 2016) suficiente para una transferencia transfronteriza — ya no se requieren identificadores nacionales. Fuera de SEPA, el IBAN suele ser solo parte de la información de enrutamiento.",
          ],
        },
      ],
    },
    pt: {
      name: "Validador e parser de IBAN",
      tagline:
        "Valide e analise IBANs de 100 países — comprimentos por país ISO 13616, verificação MOD-97 de ISO/IEC 7064, modo em lote com detalhamento de país/dígitos/BBAN. Grátis, privado, offline.",
      intro: [
        "Um caractere errado em uma transferência internacional significa um pagamento atrasado ou perdido. Este validador confere os IBANs exatamente como o padrão pretende: o conjunto de caracteres, o comprimento total por país do registro ISO 13616 (100 países) e a verificação de resto MOD-97-10 de ISO/IEC 7064:2003 que detecta toda substituição de um único caractere.",
        "O modo em lote aceita um IBAN por linha e retorna, para cada entrada válida, o código do país, os dois dígitos de controle, o BBAN (parte de banco e conta) e o formato agrupado de quatro caracteres que os formulários de pagamento esperam. Entradas inválidas recebem um motivo específico — comprimento errado do país, caractere ilegal, país desconhecido ou checksum reprovado — em vez de uma recusa genérica.",
        "Tudo é executado localmente no seu navegador: sem consultas a bancos, sem transmissão de dados de conta. Um IBAN estruturalmente válido não prova que a conta existe — apenas que o número é internamente consistente e corretamente formado para seu país.",
      ],
      steps: [
        "Cole um IBAN por linha — espaços e hífens são normalizados automaticamente.",
        "Clique em Validar — cada linha recebe um veredicto com o detalhamento analisado.",
        "Para as válidas, copie o formato agrupado canônico; para as inválidas, leia o motivo específico e corrija a entrada.",
      ],
      faqs: [
        {
          q: "O que um IBAN aprovado realmente prova?",
          a: "Apenas que o número está bem formado: conjunto de caracteres correto, comprimento correto para o país e checksum correspondente. Não prova que o código do banco existe, que a conta está aberta ou que o beneficiário corresponde. Para transferências de alto valor, confirme o IBAN com o beneficiário por outro canal.",
        },
        {
          q: "Quais países são suportados?",
          a: "Todos os 100 países do registro ISO 13616, de AD (Andorra) a XK (Kosovo), incluindo cobertura SEPA completa. EUA e China não participam do sistema IBAN e portanto não estão no registro; um IBAN começando com US ou CN é inválido por definição.",
        },
      ],
      deepDive: [
        {
          heading: "Por que o MOD-97 captura quase todo erro de digitação",
          paragraphs: [
            "A verificação opera sobre um grande inteiro: tome o IBAN, mova os primeiros quatro caracteres (código do país mais dígitos de controle) para o final, substitua cada letra pelo valor ISO (A=10 … Z=35) e interprete a cadeia inteira como um número. Um IBAN válido deixa resto 1 quando dividido por 97 — o sistema MOD 97-10 da ISO/IEC 7064:2003.",
            "Dividir por um primo de dois dígitos como 97 é o que dá força à verificação: toda substituição de um caractere muda o resto, assim como a transposição de dois caracteres adjacentes e quase todas as outras transposições. Os dois dígitos de controle iniciais fazem parte da aritmética, então um erro no código do país falha igual que um dígito. Comprimentos errados falham antes, na verificação do registro.",
            "O custo dessa força é que a aritmética deve ser exata. Números de JavaScript perdem precisão acima de 2^53, então o cálculo usa BigInt sobre até 68 dígitos decimais; qualquer implementação que use ponto flutuante aceitará IBANs corrompidos. Ao cruzar com outra ferramenta, uma divergência quase sempre significa que uma das duas usa ponto flutuante.",
          ],
        },
        {
          heading: "O que o registro sabe — e o que deliberadamente não faz",
          paragraphs: [
            "O registro de 100 países é mantido pela SWIFT como autoridade de registro ISO 13616; ele fixa o comprimento total de cada país (DE 22, FR 27, MT 31 …) e sua adesão ao SEPA. O comprimento importa tanto quanto o checksum: um IBAN alemão de 21 caracteres pode passar uma verificação mod-97 ingênua com dígitos reordenados, por isso esta ferramenta verifica primeiro o comprimento e depois o checksum.",
            "O que a ferramenta deliberadamente não faz: validar o código do banco, da agência ou os dígitos de controle nacionais que muitos países embutem no BBAN (a Alemanha tem seu próprio mod-11, a França informa a chave Rib, a Itália usa estrutura CAB+ABI). Isso pertence aos sistemas bancários domésticos e evolui independentemente da ISO 13616. Passar aqui significa que o número está bem formado e consistente com o checksum — o limite honesto que qualquer verificador de IBAN deve declarar.",
            "A adesão ao SEPA é exibida por suas consequências práticas: dentro do SEPA, um IBAN válido mais um BIC é (desde 2016) suficiente para uma transferência transfronteiriça — identificadores de compensação nacionais não são mais exigidos. Fora do SEPA, o IBAN costuma ser apenas parte das informações de roteamento.",
          ],
        },
      ],
    },
  },
});
