import { CalcEngineCurrency } from "../_engines/calc-engine-currency";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "currency-converter",
  category: "utility",
  icon: "swap",
  featured: true,
  engine: { component: CalcEngineCurrency },
  related: ["percentage-calculator", "tip-calculator", "profit-calculator", "emi-calculator", "body-fat-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator", "aspect-ratio-calculator"],
  copy: {
    en: {
      name: "Currency Converter",
      tagline: "Convert 160+ world currencies with fresh mid-market rates — loaded once online, calculated and cached privately in your browser.",
      intro: [
        "Exchange rates are fetched once from the free, keyless open.er-api.com service and cached on your device for an hour, so repeat conversions are instant and work offline. The arithmetic that turns your amount into another currency happens locally in your browser.",
        "Type an amount, pick two currencies from the searchable list of 160+, and read the result plus the live rate line. Amounts you enter are never transmitted anywhere — only the anonymous rate table is downloaded.",
        "Rates come from the open.er-api.com endpoint, which publishes reference mid-market rates refreshed regularly; the one-hour device cache matches typical volatility needs. Cross rates such as JPY to GBP are computed by dividing through the USD-based table, the same triangle most services use.",
        "Because the table is a mid-market reference rather than a bank quote, the number you see is the fair rate — cards and exchange desks typically add 1–3% on top, so budget accordingly. The advantage over search-engine converters is the searchable list of 160+ currencies, the offline cache, and the fact that no amount you type ever leaves your device.",
      ],
      steps: [
        "Enter the amount you want to convert.",
        "Choose the source and target currency — common ones are listed first.",
        "Read the converted result and the exact rate; use Refresh rates for the newest data.",
      ],
      faqs: [
        {
          q: "How often do the exchange rates update?",
          a: "The open.er-api.com table refreshes about once per day, and this tool caches it in your browser for one hour before refetching. Press “Refresh rates” at any time to pull the newest table immediately.",
        },
        {
          q: "Does using this tool send my data online?",
          a: "No amounts are ever sent anywhere. The only network request downloads an anonymous, public rate table (USD-based) once per hour; the conversion math runs locally in your browser and even works offline from the cache.",
        },
        {
          q: "Are these the rates my bank will give me?",
          a: "These are mid-market reference rates — the midpoint between buy and sell prices banks trade at. Card networks and banks typically add a 1–3% spread or fee on top of this figure.",
        },
      ],
      deepDive: [
        {
          heading: "Mid-market rates: the fair number your bank won't quote you",
          paragraphs: [
            "Every currency has two live prices: what dealers buy it at and what they sell it at, and the mid-market rate is the midpoint between them. That midpoint is the number you see in headlines and search engines — it is also the best rate a bank customer can never quite get. Retail conversions stack a spread on top: 1–3% is typical for cards, more at airport desks.",
            "That structure explains how to read this tool's output: the figure shown is a fair reference, and the rate your card actually charges will land slightly worse. For a 1,000-unit purchase a 2% spread is 20 units — small enough to ignore once, expensive as a habit on frequent travel or business payments.",
            "The rates come from the open.er-api.com service, which publishes reference mid-market values, and this tool caches the table on your device for one hour before refetching. It is honest about what that means: this is a decision-making reference, not a guaranteed execution price. Check your card issuer's actual rate when a large purchase rides on the difference.",
          ],
        },
        {
          heading: "How cross rates are computed",
          paragraphs: [
            "There is no published exchange table for every pair on earth — with 160+ currencies that would be tens of thousands of quotes. Instead, services publish one base table (here USD-based: how much of each currency one dollar buys) and every other pair is derived: JPY to GBP means divide yen-per-dollar by pounds-per-dollar. This triangle is how card networks and forex screens work too.",
            "The derived rate is exactly as accurate as the base table, no more no less: both legs move with the market, so during a sharp yen move the JPY/GBP cross here moves in lockstep with any professional terminal using the same convention. Small differences between providers come from snapshot timing, not method.",
            "The one-hour cache matters at quiet and busy times alike. Overnight for most pairs the rate barely moves and the cache is indistinguishable from fresh; during high volatility the refresh button gets you a newer snapshot. Either way, the arithmetic never rounds in your favor — the multiplication happens locally on the full-precision table.",
          ],
        },
        {
          heading: "What never leaves your device",
          paragraphs: [
            "A currency conversion feels like a question about your finances, which is why many online converters log amounts and pairs. This tool draws a hard line: the only network traffic is the anonymous public rate table download. The amounts you type, the pairs you check and the results never touch a server — the multiplication runs in your browser, and the cached table keeps working offline.",
            "That privacy design also explains the tool's speed profile: after the first load there is nothing to wait for, no per-query round-trip, no ads gated on each conversion. Repeat conversions cost literally zero requests.",
            "Practical workflow: check the rate before a trip, refresh before committing a large exchange, and remember the spread when comparing with what your bank quotes. The number here is the fair baseline; what you negotiate against it is the margin.",
          ],
        },
      ],
    },
    zh: {
      name: "汇率换算",
      tagline: "160+ 种货币实时汇率换算:汇率仅在线获取一次并缓存到本地,换算过程完全在浏览器中私密完成。",
      intro: [
        "汇率来自免费的 open.er-api.com 服务(无需密钥),获取一次后会缓存在你的设备上 1 小时,因此再次换算立即出结果,断网也能用缓存数据。把金额换算成另一种货币的乘法运算完全在浏览器本地完成。",
        "输入金额,从 160+ 种货币中选择两种,即可看到换算结果和精确汇率。你输入的金额不会发送到任何地方——下载的只有匿名的公共汇率表。",
      ],
      steps: [
        "输入要换算的金额。",
        "选择源货币和目标货币——常用货币排在最前面。",
        "查看换算结果与精确汇率;需要最新数据时点击“刷新汇率”。",
      ],
      faqs: [
        {
          q: "汇率多久更新一次?",
          a: "open.er-api.com 的汇率表大约每天更新一次,本工具会在浏览器中缓存 1 小时,到期后自动重新获取。你也可以随时点击“刷新汇率”立即拉取最新数据。",
        },
        {
          q: "使用这个工具会把我的数据传到网上吗?",
          a: "你输入的金额不会被发送到任何地方。唯一的网络请求是每小时下载一次匿名的公共汇率表(以 USD 为基准);换算运算在浏览器本地完成,断网时也能用缓存继续换算。",
        },
        {
          q: "这个汇率和银行给我的汇率一样吗?",
          a: "这里是中间价(市场参考价),即银行间买卖价的中间值。卡组织和银行通常会在中间价基础上加收 1%–3% 的点差或手续费。",
        },
      ],
      deepDive: [
        {
          heading: "中间价:银行不会真正给你的那个公平数字",
          paragraphs: [
            "每种货币同时有两个价:交易商的买入价和卖出价,中间价就是两者取中。新闻里和搜索引擎显示的都是这个数——它也是银行客户永远拿不满的最好价格。零售换算要在中间价上加点差:刷卡通常 1%–3%,机场柜台更高。",
            "理解了结构,就知道怎么读本工具的结果:显示的是一个公平的参考值,你的卡实际扣款汇率会比它略差。一笔 1000 单位的消费,2% 点差就是 20 单位——偶尔一次无所谓,频繁出境或跨境付款时,这个习惯成本就会显形。",
            "汇率来自 open.er-api.com 发布的中间参考价,本工具把汇率表缓存在设备上 1 小时再刷新。如实说明:这是决策参考,不是保证成交价。金额大、差价敏感时,以发卡行实际汇率为准。",
          ],
        },
        {
          heading: "交叉汇率是怎么算出来的",
          paragraphs: [
            "世界上不存在覆盖所有货币对的现成汇率表——160 多种货币意味着几万个报价。实际做法是发布一张基准表(本工具是 USD 基准:一美元兑换各币种的量),其余货币对全部推算:日元兑英镑,就是\"每美元日元\"除以\"每美元英镑\"。银行卡组织和外汇行情用的也是同一个三角算法。",
            "推算出的汇率与基准表同等准确,不多不少:两条腿都随市场波动,日元剧烈波动时,这里的 JPY/GBP 与任何用同一惯例的专业终端同步移动。不同服务商之间的小差异来自快照时间,不是方法。",
            "1 小时缓存对冷热时段都成立。多数货币对在夜间几乎不动,缓存数据和最新数据没有区别;波动剧烈时,点刷新就能拿到更新的快照。无论哪种情况,乘法运算都在本地以全精度汇率表完成,不会朝对你有利的方向凑整。",
          ],
        },
        {
          heading: "什么永远不会离开你的设备",
          paragraphs: [
            "汇率换算看起来像在问你的财务状况,所以很多在线换算器会记录金额和货币对。本工具划了一条硬线:唯一的网络流量是下载匿名的公共汇率表。你输入的金额、查过的货币对、得到的结果都不经过任何服务器——乘法在浏览器里完成,缓存表让断网也能继续换算。",
            "这个隐私设计也解释了工具的速度表现:首次加载之后无事可等,没有每次查询的往返,没有按次换算收费的广告。重复换算的请求数量就是零。",
            "实用流程:出行前查一次汇率,大额换汇前点一次刷新,和银行报价比较时记得算上点差。这里的数字是公平基线,你要争取的就是它之上的那部分加价。",
          ],
        },
      ],
    },
    ja: {
      name: "通貨換算",
      tagline: "160 以上の通貨をミッドマーケットレートで換算。レートはオンラインで 1 回だけ取得し、計算はブラウザ内で完結します。",
      intro: [
        "為替レートは無料の open.er-api.com サービス(キー不要)から 1 回だけ取得し、1 時間デバイスにキャッシュします。そのため 2 回目以降の換算は即時で、オフラインでもキャッシュから利用できます。金額を掛け算する処理はすべてブラウザ内で行われます。",
        "金額を入力し、160 以上の通貨から 2 つ選ぶだけ。換算結果と正確なレートが表示されます。入力した金額が送信されることはなく、取得するのは匿名の公開レート表だけです。",
      ],
      steps: [
        "換算したい金額を入力します。",
        "換算元と換算先の通貨を選びます。よく使う通貨は先頭に表示されます。",
        "結果とレートを確認します。最新データが必要なときは「レートを更新」を押します。",
      ],
      faqs: [
        {
          q: "為替レートはどのくらいの頻度で更新されますか?",
          a: "open.er-api.com のレート表は 1 日 1 回程度更新され、このツールはブラウザに 1 時間キャッシュしてから再取得します。「レートを更新」を押せば、いつでも最新の表を即座に取得できます。",
        },
        {
          q: "このツールの利用でデータは送信されますか?",
          a: "入力した金額が送信されることはありません。ネットワーク通信は匿名の公開レート表(USD 基準)を 1 時間に 1 回取得するだけで、換算計算はブラウザ内で完結し、キャッシュがあればオフラインでも動作します。",
        },
        {
          q: "銀行のレートと同じですか?",
          a: "ここに表示するのはミッドマーケットレート(仲値)です。銀行間の買値と売値の中間値で、カード会社や銀行は通常これに 1〜3% のスプレッドや手数料を上乗せします。",
        },
      ],
      deepDive: [
        {
          heading: "仲値:銀行が本当に提示しない公正な数字",
          paragraphs: [
            "どの通貨にも常に二つの価格があります。ディーラーの買値と売値で、仲値はその中間です。見出しや検索エンジンに表示されるのはこの数字で、銀行の顧客が完全には得られない最良のレートでもあります。小売の両替ではここにスプレッドが上乗せされます。カードなら 1〜3% が典型的で、空港のカウンターはもっと高い。",
            "この構造を踏まえると、本ツールの出力の読み方が決まります。表示される数字は公正な参考値で、カードの実際の適用レートはそれよりわずかに悪くなります。1,000 単位の買い物でスプレッド 2% なら 20 単位です。一度なら無視できる額ですが、出張や海外送金が頻繁になると習慣としての費用が姿を現します。",
            "レートは open.er-api.com が公開する仲値の参考値で、本ツールはその表をデバイスに 1 時間キャッシュしてから再取得します。正直に言えば、これは意思決定のための参考であり、保証された約定価格ではありません。差が問題になるような大きな支払いでは、カード発行会社の実際のレートを確認してください。",
          ],
        },
        {
          heading: "クロスレートの計算方法",
          paragraphs: [
            "地球上のすべてのペアを網羅する為替表は存在しません。160 以上の通貨なら数万件のquoteが必要になります。実際には、1 つの基準表(ここでは USD 基準:1 ドルで各通貨がどれだけ買えるか)だけを公開し、他のペアはすべて導出します。JPY から GBP へは「1 ドルあたりの円」を「1 ドルあたりのポンド」で割るだけです。この三角計算は、カードネットワークや為替画面でも同じやり方です。",
            "導出されたレートは基準表と同等の精度で、それ以上でも以下でもありません。両方の足が市場で動くため、円が急変しているときでも、同じ慣行を使うプロの端末とここでの JPY/GBP は連動して動きます。提供元間の小さな差は方法ではなくスナップショットのタイミングから来ます。",
            "1 時間のキャッシュは静かな時間にも忙しい時間にも成り立ちます。多くのペアは夜間ほとんど動かず、キャッシュと最新の区別がつきません。変動が激しいときは更新ボタンで新しいスナップショットを取れます。どちらの場合も、乗算は全精度の表でローカルに行われ、有利な方向に丸めることはありません。",
          ],
        },
        {
          heading: "デバイスの外へ出ないもの",
          paragraphs: [
            "通貨換算は自分の財務についての質問に見えるため、多くのオンライン換算器は金額とペアを記録します。本ツールはここに明確な線を引きました。唯一のネットワーク通信は匿名の公開レート表のダウンロードです。入力した金額、確認したペア、出た結果はどれもサーバーに触れません。乗算はブラウザ内で行われ、キャッシュした表がオフラインでも換算を続けます。",
            "このプライバシー設計はツールの速度の特性も説明します。最初の読み込み以降、待つものは何もなく、1 回ごとの往復もなく、換算のたびに広告を通すこともありません。2 回目以降の換算のリクエスト数は文字どおりゼロです。",
            "実用的な流れ:出発前にレートを確認し、大きな両替の前に更新し、銀行の提示と比べるときはスプレッドを忘れずに。ここの数字が公正な基準線で、交渉の対象はその上のマージンです。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de monedas",
      tagline: "Convierte más de 160 monedas con tipos de referencia actualizados: se cargan una vez en línea y se calculan y guardan de forma privada en tu navegador.",
      intro: [
        "Los tipos de cambio se descargan una vez del servicio gratuito open.er-api.com (sin clave) y se guardan en tu dispositivo durante una hora, así que las conversiones repetidas son instantáneas y funcionan sin conexión. La multiplicación que convierte tu importe ocurre localmente en tu navegador.",
        "Escribe una cantidad, elige dos monedas de la lista de más de 160 y lee el resultado junto con la tasa exacta. Los importes que introduces nunca se transmiten: solo se descarga la tabla anónima de tipos.",
      ],
      steps: [
        "Introduce la cantidad que quieres convertir.",
        "Elige la moneda de origen y la de destino: las frecuentes aparecen primero.",
        "Lee el resultado y la tasa exacta; usa «Actualizar tasas» para los datos más recientes.",
      ],
      faqs: [
        {
          q: "¿Cada cuánto se actualizan los tipos de cambio?",
          a: "La tabla de open.er-api.com se actualiza aproximadamente una vez al día, y esta herramienta la guarda en tu navegador durante una hora antes de volver a pedirla. Pulsa «Actualizar tasas» cuando quieras la tabla más reciente.",
        },
        {
          q: "¿Se envían mis datos a internet al usar esta herramienta?",
          a: "Ningún importe se envía a ningún sitio. La única petición de red descarga una tabla pública y anónima de tipos (base USD) una vez por hora; la conversión se calcula en tu navegador y funciona sin conexión gracias a la caché.",
        },
        {
          q: "¿Son los mismos tipos que me dará mi banco?",
          a: "Son tipos de referencia de mercado (mid-market), el punto medio entre los precios de compra y venta. Las redes de tarjetas y los bancos suelen añadir un margen o comisión del 1–3% sobre esta cifra.",
        },
      ],
      deepDive: [
        {
          heading: "Tipos de referencia: el número justo que su banco nunca le cotiza",
          paragraphs: [
            "Cada moneda tiene dos precios vivos: al que los operadores la compran y al que la venden, y el tipo de referencia (mid-market) es el punto medio entre ambos. Ese punto medio es el número de los titulares y de los buscadores — y también el mejor tipo que un cliente de banco nunca llega a obtener del todo. Las conversiones minoristas apilan un margen encima: 1–3% es lo típico con tarjetas, más en los mostradores de aeropuerto.",
            "Esa estructura explica cómo leer el resultado de esta herramienta: la cifra mostrada es una referencia justa, y el tipo que su tarjeta aplica realmente quedará algo peor. En una compra de 1.000 unidades, un margen del 2% son 20 unidades — pequeño para ignorar una vez, caro como hábito en viajes frecuentes o pagos de negocio.",
            "Los tipos vienen del servicio open.er-api.com, que publica valores de referencia de mercado, y esta herramienta guarda la tabla en su dispositivo durante una hora antes de volver a descargarla. Es honesto sobre lo que significa: es una referencia para decidir, no un precio garantizado de ejecución. Cuando una compra grande dependa de la diferencia, verifique el tipo real de su emisor.",
          ],
        },
        {
          heading: "Cómo se calculan los tipos cruzados",
          paragraphs: [
            "No existe una tabla publicada para cada par del mundo — con más de 160 monedas serían decenas de miles de cotizaciones. En su lugar, los servicios publican una tabla base (aquí en USD: cuánto de cada moneda compra un dólar) y todos los demás pares se derivan: JPY a GBP es dividir yenes por dólar entre libras por dólar. Este triángulo es también como funcionan las redes de tarjetas y las pantallas de divisas.",
            "El tipo derivado es exactamente tan preciso como la tabla base, ni más ni menos: ambas piernas se mueven con el mercado, así que durante un movimiento brusco del yen, el cruce JPY/GBP aquí se mueve en sincronía con cualquier terminal profesional que use la misma convención. Las pequeñas diferencias entre proveedores vienen del momento de la instantánea, no del método.",
            "La caché de una hora importa en momentos tranquilos y agitados por igual. De noche la mayoría de pares apenas se mueven y la caché es indistinguible de un dato fresco; en alta volatilidad el botón de actualizar trae una instantánea más nueva. En cualquier caso, la aritmética nunca redondea a su favor — la multiplicación ocurre localmente sobre la tabla de precisión completa.",
          ],
        },
        {
          heading: "Lo que nunca sale de su dispositivo",
          paragraphs: [
            "Una conversión de moneda parece una pregunta sobre sus finanzas, y por eso muchos conversores en línea registran importes y pares. Esta herramienta traza una línea dura: el único tráfico de red es la descarga anónima de la tabla pública de tipos. Los importes que escribe, los pares que consulta y los resultados jamás tocan un servidor — la multiplicación corre en su navegador, y la tabla en caché sigue funcionando sin conexión.",
            "Ese diseño de privacidad explica también el perfil de velocidad: tras la primera carga no hay nada que esperar, ni viaje por consulta, ni publicidad que gated cada conversión. Las conversiones repetidas cuestan literalmente cero peticiones.",
            "Flujo práctico: consulte el tipo antes de un viaje, actualice antes de cerrar un cambio grande, y recuerde el margen al comparar con lo que cota su banco. El número aquí es la línea base justa; contra lo que negocia es el sobreprecio.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de moedas",
      tagline: "Converta mais de 160 moedas com cotações atualizadas — carregadas uma vez online e calculadas e guardadas com privacidade no seu navegador.",
      intro: [
        "As cotações vêm do serviço gratuito open.er-api.com (sem chave) uma única vez e ficam em cache no seu dispositivo por uma hora, então conversões repetidas são instantâneas e funcionam offline. A multiplicação que converte o seu valor acontece localmente no navegador.",
        "Digite um valor, escolha duas moedas na lista com mais de 160 opções e veja o resultado junto com a taxa exata. Os valores que você digita nunca são transmitidos — apenas a tabela pública e anônima de cotações é baixada.",
      ],
      steps: [
        "Digite o valor que você quer converter.",
        "Escolha a moeda de origem e a de destino — as mais comuns aparecem primeiro.",
        "Veja o resultado e a taxa exata; use «Atualizar cotações» para os dados mais recentes.",
      ],
      faqs: [
        {
          q: "Com que frequência as cotações são atualizadas?",
          a: "A tabela do open.er-api.com é atualizada cerca de uma vez por dia, e esta ferramenta a mantém em cache no navegador por uma hora antes de buscar de novo. Toque em «Atualizar cotações» para puxar a tabela mais recente na hora.",
        },
        {
          q: "Usar esta ferramenta envia meus dados para a internet?",
          a: "Nenhum valor é enviado a lugar algum. A única requisição de rede baixa uma tabela pública e anônima de cotações (base USD) uma vez por hora; a conversão é calculada no seu navegador e funciona offline com o cache.",
        },
        {
          q: "Essas cotações são as mesmas do meu banco?",
          a: "São cotações de referência (mid-market), o ponto médio entre preços de compra e venda. Bandeiras de cartão e bancos normalmente adicionam um spread ou taxa de 1–3% sobre esse valor.",
        },
      ],
      deepDive: [
        {
          heading: "Cotação de referência: o número justo que seu banco nunca te dá",
          paragraphs: [
            "Toda moeda tem dois preços ao vivo: pelo qual os operadores compram e pelo qual vendem, e a cotação de referência (mid-market) é o ponto médio entre os dois. Esse ponto médio é o número dos títulos de notícia e dos buscadores — e também a melhor cotação que um cliente de banco nunca consegue de fato. Conversões de varejo empilham um spread por cima: 1–3% é típico em cartões, mais nos guichês de aeroporto.",
            "Essa estrutura explica como ler o resultado desta ferramenta: o número mostrado é uma referência justa, e a cotação que seu cartão aplica de verdade ficará um pouco pior. Numa compra de 1.000 unidades, um spread de 2% são 20 unidades — pequeno o bastante para ignorar uma vez, caro como hábito em viagens frequentes ou pagamentos de trabalho.",
            "As cotações vêm do serviço open.er-api.com, que publica valores de referência de mercado, e esta ferramenta guarda a tabela no seu dispositivo por uma hora antes de buscar de novo. Sendo honesto sobre o que isso significa: é uma referência para decisão, não um preço garantido de execução. Quando uma compra grande depender da diferença, confira a cotação real do seu emissor.",
          ],
        },
        {
          heading: "Como as cotações cruzadas são calculadas",
          paragraphs: [
            "Não existe uma tabela publicada para cada par do mundo — com mais de 160 moedas seriam dezenas de milhares de cotações. Em vez disso, os serviços publicam uma tabela-base (aqui em USD: quanto de cada moeda um dólar compra) e todos os outros pares são derivados: JPY para GBP é dividir ienes por dólar entre libras por dólar. Esse triângulo é também como funcionam as bandeiras de cartão e as telas de câmbio.",
            "A cotação derivada é exatamente tão precisa quanto a tabela-base, nem mais nem menos: as duas pernas se movem com o mercado, então durante um movimento brusco do iene, o cruzamento JPY/GBP aqui se move em sincronia com qualquer terminal profissional que use a mesma convenção. As pequenas diferenças entre provedores vêm do momento da captura, não do método.",
            "O cache de uma hora importa em momentos calmos e agitados igualmente. De noite a maioria dos pares quase não se move e o cache é indistinguível de um dado fresco; em alta volatilidade, o botão de atualizar traz uma captura mais nova. Em qualquer caso, a aritmética nunca arredonda a seu favor — a multiplicação acontece localmente sobre a tabela de precisão completa.",
          ],
        },
        {
          heading: "O que nunca sai do seu dispositivo",
          paragraphs: [
            "Uma conversão de moeda parece uma pergunta sobre suas finanças, e é por isso que muitos conversores online registram valores e pares. Esta ferramenta traça uma linha dura: o único tráfego de rede é o download anônimo da tabela pública de cotações. Os valores que você digita, os pares que consulta e os resultados jamais tocam um servidor — a multiplicação roda no seu navegador, e a tabela em cache continua funcionando offline.",
            "Esse desenho de privacidade também explica o perfil de velocidade: depois da primeira carga não há nada a esperar, nem viagem por consulta, nem anúncio bloqueando cada conversão. Conversões repetidas custam literalmente zero requisições.",
            "Fluxo prático: confira a cotação antes de uma viagem, atualize antes de fechar uma troca grande, e lembre do spread ao comparar com o que seu banco cota. O número aqui é a linha de base justa; contra o que você negocia é a margem.",
          ],
        },
      ],
    },
  },
});
