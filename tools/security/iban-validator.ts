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
    },
  },
});
