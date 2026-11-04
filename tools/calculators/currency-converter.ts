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
    },
  },
});
