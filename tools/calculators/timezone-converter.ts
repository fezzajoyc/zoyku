import { CalcEngineTime } from "../_engines/calc-engine-time";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "timezone-converter",
  category: "utility",
  icon: "globe",
  engine: { component: CalcEngineTime, props: { kind: "timezone" } },
  related: ["timestamp-converter", "time-converter", "date-calculator", "age-calculator", "body-fat-calculator", "tip-calculator", "cooking-conversion", "calorie-calculator", "aspect-ratio-calculator", "bmr-calculator"],
  copy: {
    en: {
      name: "Time Zone Converter",
      tagline: "Compare times across 21 major cities with live clocks and an hour-by-hour table — DST handled exactly, everything runs in your browser.",
      intro: [
        "Pick any two cities from Los Angeles to Tokyo and see both live clocks side by side, the exact offset difference for today, and a 24-row comparison table showing what every hour of the day becomes in the other city — the fastest way to find a meeting slot across time zones.",
        "The conversion uses your browser's built-in IANA time zone database, so daylight-saving transitions land on the correct minute without any network call.",
      ],
      steps: [
        "Choose the starting city — its live local clock appears underneath.",
        "Choose the destination city; the clock and UTC offset update instantly.",
        "Scan the hour-by-hour table to find times that work for both sides.",
        "Use the swap button to flip the two cities.",
      ],
      faqs: [
        {
          q: "Does the converter handle daylight saving time?",
          a: "Yes. Offsets are computed with the browser's own IANA time zone rules for today's date, so a city currently on DST shows its correct shifted offset and the hour table reflects the real clocks on both sides.",
        },
        {
          q: "Why does the hour table show a different date in some rows?",
          a: "When cities are far apart, one side's calendar date changes during the day. Each row shows the destination's date next to the time so you can spot when, for example, 9:00 in Shanghai is still 21:00 the previous evening in New York.",
        },
        {
          q: "Does this tool need internet access?",
          a: "No. City times come from the time zone database built into your browser and your device clock — nothing is downloaded and no location is shared.",
        },
      ],
    },
    zh: {
      name: "时区换算",
      tagline: "21 个主要城市两两对照:实时双时钟、精确时差、逐小时时间表,夏令时精确处理,全程浏览器本地运行。",
      intro: [
        "从洛杉矶到东京,任选两个城市,即可并排查看两地实时时钟、今天的精确时差,以及一张 24 行的逐小时对照表——找到跨时区会议时间的最快方式。",
        "换算使用浏览器内置的 IANA 时区数据库,夏令时切换精确到分钟,全程无需联网。",
      ],
      steps: [
        "选择起点城市,下方会显示其实时本地时间。",
        "选择目标城市,时钟与 UTC 偏移即时更新。",
        "浏览逐小时对照表,找到双方都合适的时间。",
        "点击交换按钮可以调换两个城市。",
      ],
      faqs: [
        {
          q: "能正确处理夏令时吗?",
          a: "可以。时差按当天日期用浏览器内置的 IANA 时区规则计算,处于夏令时的城市会显示偏移后的正确时间,对照表反映的也是两地的真实钟面时间。",
        },
        {
          q: "为什么对照表里有些行的日期不一样?",
          a: "两个城市相距很远时,一天之内某一侧的日期会发生变化。每行都在时间旁标注了目标城市的日期,方便你发现例如上海 9:00 对应纽约前一天 21:00 这类情况。",
        },
        {
          q: "这个工具需要联网吗?",
          a: "不需要。城市时间来自浏览器内置的时区数据库和你的设备时钟——不下载任何数据,也不会共享你的位置。",
        },
      ],
    },
    ja: {
      name: "タイムゾーン変換",
      tagline: "主要 21 都市の時刻をリアルタイム双時計と 1 時間ごとの対応表で比較。サマータイムも正確、すべてブラウザ内で動作します。",
      intro: [
        "ロサンゼルスから東京まで、好きな 2 都市を選ぶとリアルタイムの時計が並んで表示され、今日の正確な時差と 24 行の時間帯対応表がわかります。国際会議の時間探しに最短ルートです。",
        "変換にはブラウザ内蔵の IANA タイムゾーンデータベースを使用するため、サマータイムの切替も正確で、通信は一切発生しません。",
      ],
      steps: [
        "起点の都市を選ぶと、下にリアルタイムの現地時刻が表示されます。",
        "先方の都市を選ぶと、時計と UTC オフセットが即座に更新されます。",
        "時間帯対応表を見て、双方に無理のない時間を探します。",
        "入れ替えボタンで 2 都市を反転できます。",
      ],
      faqs: [
        {
          q: "サマータイムにも対応していますか?",
          a: "はい。オフセットは当日の日付でブラウザ内蔵の IANA ルールに従って計算されるため、サマータイム中の都市は正しくずれた時刻を表示し、対応表も両側の実際の時計を反映します。",
        },
        {
          q: "対応表で日付が変わる行があるのはなぜですか?",
          a: "距離が離れた都市では、一日のうちに片側の日付が変わります。各行には先方の日付も併記しているので、上海の 9:00 がニューヨークでは前日の 21:00 といった対応もひと目でわかります。",
        },
        {
          q: "このツールはインターネット接続が必要ですか?",
          a: "いいえ。都市の時刻はブラウザ内蔵のタイムゾーンデータベースと端末の時計から得ており、何もダウンロードせず、位置情報も送信しません。",
        },
      ],
    },
    es: {
      name: "Conversor de husos horarios",
      tagline: "Compara la hora entre 21 grandes ciudades con relojes en vivo y una tabla hora a hora: el horario de verano exacto, todo en tu navegador.",
      intro: [
        "Elija dos ciudades, de Los Ángeles a Tokio, y vea sus relojes en vivo lado a lado, la diferencia exacta de hoy y una tabla de 24 filas que muestra a qué hora corresponde cada hora del día en la otra ciudad: la forma más rápida de buscar una reunión global.",
        "La conversión usa la base de datos IANA integrada en su navegador, así que los cambios de horario de verano caen en el minuto correcto sin ninguna llamada de red.",
      ],
      steps: [
        "Elija la ciudad de origen: su reloj local en vivo aparece debajo.",
        "Elija la ciudad de destino; el reloj y el desfase UTC se actualizan al instante.",
        "Revise la tabla hora a hora para encontrar horarios viables para ambos lados.",
        "Use el botón de intercambio para invertir las dos ciudades.",
      ],
      faqs: [
        {
          q: "¿El conversor tiene en cuenta el horario de verano?",
          a: "Sí. Los desfases se calculan con las reglas IANA del navegador para la fecha de hoy, así que una ciudad en horario de verano muestra su desfase correcto y la tabla refleja los relojes reales de ambos lados.",
        },
        {
          q: "¿Por qué algunas filas de la tabla muestran otra fecha?",
          a: "Cuando las ciudades están muy separadas, la fecha cambia durante el día en uno de los lados. Cada fila indica la fecha del destino junto a la hora, para detectar por ejemplo que las 9:00 de Shanghái son las 21:00 del día anterior en Nueva York.",
        },
        {
          q: "¿Necesita internet esta herramienta?",
          a: "No. Las horas provienen de la base de zonas horarias integrada en el navegador y del reloj del dispositivo: no se descarga nada ni se comparte su ubicación.",
        },
      ],
    },
    pt: {
      name: "Conversor de fusos horários",
      tagline: "Compare horários entre 21 grandes cidades com relógios ao vivo e tabela hora a hora — horário de verão exato, tudo no seu navegador.",
      intro: [
        "Escolha duas cidades, de Los Angeles a Tóquio, e veja os relógios ao vivo lado a lado, a diferença exata de hoje e uma tabela de 24 linhas mostrando a que hora corresponde cada hora do dia na outra cidade — o caminho mais rápido para marcar reuniões globais.",
        "A conversão usa o banco de dados IANA embutido no navegador, então as transições de horário de verão caem no minuto certo, sem nenhuma chamada de rede.",
      ],
      steps: [
        "Escolha a cidade de origem — o relógio local ao vivo aparece abaixo.",
        "Escolha a cidade de destino; o relógio e o fuso UTC atualizam na hora.",
        "Percorra a tabela hora a hora para achar horários que funcionem para os dois lados.",
        "Use o botão de troca para inverter as duas cidades.",
      ],
      faqs: [
        {
          q: "O conversor lida com horário de verão?",
          a: "Sim. Os fusos são calculados com as regras IANA do navegador para a data de hoje, então uma cidade em horário de verão mostra o fuso deslocado correto e a tabela reflete os relógios reais dos dois lados.",
        },
        {
          q: "Por que algumas linhas da tabela mostram outra data?",
          a: "Quando as cidades são distantes, a data muda no decorrer do dia em um dos lados. Cada linha mostra a data do destino ao lado da hora, para você perceber, por exemplo, que 9:00 em Xangai ainda são 21:00 da véspera em Nova York.",
        },
        {
          q: "Esta ferramenta precisa de internet?",
          a: "Não. Os horários vêm do banco de fusos embutido no navegador e do relógio do dispositivo — nada é baixado e nenhuma localização é compartilhada.",
        },
      ],
    },
  },
});
