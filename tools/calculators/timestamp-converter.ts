import { CalcEngineTime } from "../_engines/calc-engine-time";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "timestamp-converter",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEngineTime, props: { kind: "timestamp" } },
  related: ["timezone-converter", "date-calculator", "time-converter", "binary-converter", "body-fat-calculator", "tip-calculator", "cooking-conversion", "age-calculator", "calorie-calculator", "aspect-ratio-calculator"],
  copy: {
    en: {
      name: "Unix Timestamp Converter",
      tagline: "Convert Unix seconds or milliseconds to human dates and back, with a live clock, local-timezone and UTC output — all in your browser.",
      intro: [
        "A live counter shows the current Unix timestamp in seconds and milliseconds with one-click copy. Paste a timestamp and it is decoded to your local time and to UTC — 10-digit values are treated as seconds, 13-digit as milliseconds, automatically.",
        "Going the other way, pick a date and time to get its exact timestamp. Everything is computed locally from your device clock; timestamps are timezone-independent by definition, so the numbers are the same anywhere on earth.",
        "Unix time counts seconds since 1970-01-01 00:00:00 UTC and ignores leap seconds, which is why it is the interchange format for APIs and logs. The tool auto-detects 10-digit values as seconds and 13-digit as milliseconds; values outside those lengths are flagged rather than silently misread.",
        "Compared with converting in a terminal, both directions and both units live on one page with one-click copy, and the live counter confirms your device clock is sane before you debug a scheduling bug. Timestamps carry no time zone by definition, so always pair them with an explicit zone in your systems — the classic source of off-by-hours defects.",
      ],
      steps: [
        "Copy the live current timestamp, or paste one into the decode field.",
        "Read the local and UTC human dates; seconds vs. milliseconds is detected automatically.",
        "Or pick a date-time to get its Unix timestamp in seconds and milliseconds.",
      ],
      faqs: [
        {
          q: "What exactly is a Unix timestamp?",
          a: "The number of seconds elapsed since 1970-01-01 00:00:00 UTC, not counting leap seconds. It is the standard way computers store points in time because sorting and subtraction become trivial. Millisecond timestamps (13 digits) are common in JavaScript and Java.",
        },
        {
          q: "How does the tool know if my number is in seconds or milliseconds?",
          a: "By magnitude: values under 1 trillion cannot describe a modern date in milliseconds, so they are read as seconds; 13-digit values are read as milliseconds. The result states which interpretation was applied.",
        },
        {
          q: "Will the same timestamp decode differently in other timezones?",
          a: "The raw number never changes — it encodes an absolute instant. Only the human-readable rendering differs, which is why the tool shows your local time and UTC side by side.",
        },
      ],
    },
    zh: {
      name: "Unix 时间戳转换",
      tagline: "Unix 秒/毫秒时间戳与人类可读日期双向转换,实时时钟常驻,本地时区与 UTC 同时输出——全程浏览器本地计算。",
      intro: [
        "实时计数器以秒和毫秒显示当前 Unix 时间戳,一键复制。粘贴任意时间戳即可解码为本地时间和 UTC——10 位自动按秒解析,13 位自动按毫秒解析。",
        "反方向则选择日期时间,得到精确时间戳。全部计算基于设备时钟在本地完成;时间戳与时区无关,全球任何地方数字都相同。",
      ],
      steps: [
        "复制实时时间戳,或在解码框中粘贴一个。",
        "查看本地时间与 UTC 两种人类可读结果;秒/毫秒自动识别。",
        "或选择日期时间,得到以秒和毫秒表示的 Unix 时间戳。",
      ],
      faqs: [
        {
          q: "Unix 时间戳到底是什么?",
          a: "自 1970-01-01 00:00:00 UTC 起经过的秒数(不计闰秒)。它让时间排序和相减变得极其简单,是计算机存储时刻的标准方式。JavaScript 和 Java 中常见的毫秒时间戳是 13 位。",
        },
        {
          q: "工具怎么判断我的数字是秒还是毫秒?",
          a: "按数量级判断:小于 1 万亿的值不可能是现代日期的毫秒数,按秒解读;13 位数字按毫秒解读。结果会注明采用了哪种解释。",
        },
        {
          q: "同一个时间戳在其他时区解码结果不同吗?",
          a: "原始数字永远不变——它编码的是绝对时刻。不同的只是人类可读的显示形式,因此工具把本地时间和 UTC 并排展示。",
        },
      ],
    },
    ja: {
      name: "Unix タイムスタンプ変換",
      tagline: "Unix の秒・ミリ秒と人間が読める日付を双方向に変換。ライブ時計つき、ローカル時間と UTC を同時表示、すべてブラウザ内で処理。",
      intro: [
        "現在の Unix タイムスタンプを秒とミリ秒でライブ表示し、ワンクリックでコピーできます。タイムスタンプを貼り付けるとローカル時間と UTC に変換 — 10 桁は秒、13 桁はミリ秒として自動判別します。",
        "逆方向では日時を選ぶと正確なタイムスタンプを取得できます。計算は端末の時計をもとにローカルで完結します。タイムスタンプは定義上タイムゾーンに依存しないため、数値は世界中で同じです。",
      ],
      steps: [
        "ライブの現在時刻をコピーするか、変換欄にタイムスタンプを貼り付けます。",
        "ローカルと UTC の日時を確認します。秒かミリ秒かは自動判定されます。",
        "または日時を選んで、秒・ミリ秒の Unix タイムスタンプを取得します。",
      ],
      faqs: [
        {
          q: "Unix タイムスタンプとは何ですか?",
          a: "1970-01-01 00:00:00 UTC からの経過秒数です(うるう秒は除外)。並べ替えや引き算が単純になるため、コンピューターが時刻を扱う標準方式です。JavaScript や Java で一般的なミリ秒は 13 桁になります。",
        },
        {
          q: "入力が秒かミリ秒かはどう判断しますか?",
          a: "桁の大きさで判断します。1 兆未満の値は現代の日付をミリ秒で表せないため秒と読み、13 桁はミリ秒と読みます。どちらで解釈したかは結果に表示します。",
        },
        {
          q: "同じタイムスタンプでもタイムゾーンが違うと結果が変わりますか?",
          a: "数値そのものは変わりません。絶対的な時刻を表すからです。変わるのは表示のみで、このツールはローカル時間と UTC を並べて見せるためです。",
        },
      ],
    },
    es: {
      name: "Conversor de timestamps Unix",
      tagline: "Convierte segundos o milisegundos Unix en fechas legibles y viceversa, con reloj en vivo y salida en su zona horaria y UTC, todo local.",
      intro: [
        "Un contador en vivo muestra el timestamp Unix actual en segundos y milisegundos con copia al clic. Pegue un timestamp y se descodificará a su hora local y a UTC — los valores de 10 dígitos se leen como segundos y los de 13 como milisegundos, automáticamente.",
        "En sentido inverso, elija una fecha y hora para obtener su timestamp exacto. Todo se calcula localmente con el reloj del dispositivo; por definición un timestamp no depende de la zona horaria, así que el número es el mismo en todo el planeta.",
      ],
      steps: [
        "Copie el timestamp actual en vivo o pegue uno en el campo de descodificación.",
        "Lea las fechas legibles local y UTC; segundos frente a milisegundos se detectan solos.",
        "O elija una fecha y hora para obtener su timestamp en segundos y milisegundos.",
      ],
      faqs: [
        {
          q: "¿Qué es exactamente un timestamp Unix?",
          a: "Los segundos transcurridos desde 1970-01-01 00:00:00 UTC, sin contar los segundos intercalares. Es la forma estándar de guardar instantes porque ordenar y restar se vuelve trivial. Los de milisegundos (13 dígitos) son habituales en JavaScript y Java.",
        },
        {
          q: "¿Cómo sabe la herramienta si mi número está en segundos o milisegundos?",
          a: "Por magnitud: valores menores de un billón no pueden describir una fecha moderna en milisegundos, así que se leen como segundos; los de 13 dígitos, como milisegundos. El resultado indica qué interpretación se aplicó.",
        },
        {
          q: "¿El mismo timestamp se descodifica distinto en otras zonas horarias?",
          a: "El número nunca cambia — codifica un instante absoluto. Solo cambia la representación legible, razón por la que la herramienta muestra su hora local y UTC una al lado de la otra.",
        },
      ],
    },
    pt: {
      name: "Conversor de timestamp Unix",
      tagline: "Converta segundos ou milissegundos Unix em datas legíveis e vice-versa, com relógio ao vivo e saída no fuso local e UTC — tudo no navegador.",
      intro: [
        "Um contador ao vivo mostra o timestamp Unix atual em segundos e milissegundos com cópia num clique. Cole um timestamp e ele é decodificado para a sua hora local e para UTC — valores de 10 dígitos são lidos como segundos e de 13 como milissegundos, automaticamente.",
        "No sentido inverso, escolha uma data e hora para obter o timestamp exato. Tudo é calculado localmente com o relógio do dispositivo; por definição o timestamp não depende do fuso, então o número é o mesmo em qualquer lugar do mundo.",
      ],
      steps: [
        "Copie o timestamp atual ao vivo ou cole um no campo de decodificação.",
        "Veja as datas legíveis no fuso local e em UTC; segundos ou milissegundos são detectados sozinhos.",
        "Ou escolha uma data e hora para obter o timestamp em segundos e milissegundos.",
      ],
      faqs: [
        {
          q: "O que é exatamente um timestamp Unix?",
          a: "O número de segundos decorridos desde 1970-01-01 00:00:00 UTC, sem contar os segundos intercalares. É a forma padrão de guardar instantes porque ordenar e subtrair fica trivial. Os de milissegundos (13 dígitos) são comuns em JavaScript e Java.",
        },
        {
          q: "Como a ferramenta sabe se o número está em segundos ou milissegundos?",
          a: "Pela magnitude: valores abaixo de 1 trilhão não podem descrever uma data moderna em milissegundos, então são lidos como segundos; os de 13 dígitos, como milissegundos. O resultado informa qual leitura foi aplicada.",
        },
        {
          q: "O mesmo timestamp decodifica diferente em outros fusos?",
          a: "O número nunca muda — ele codifica um instante absoluto. Só a representação legível muda, por isso a ferramenta mostra a hora local e a UTC lado a lado.",
        },
      ],
    },
  },
});
