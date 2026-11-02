import { DevHttpStatusEngine } from "../_engines/dev-http-status";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "http-status-codes",
  category: "developer",
  icon: "globe",
  engine: { component: DevHttpStatusEngine },
  related: ["url-parser", "regex-tester", "json-formatter", "hash-generator"],
  copy: {
    en: {
      name: "HTTP Status Codes",
      tagline:
        "A searchable reference of 56 HTTP status codes grouped by class, each explained in one plain sentence — click any row to copy the number.",
      intro: [
        "Every important status code from 100 Continue to 511 Network Authentication Required, grouped by class and explained in one plain sentence: what actually happened on the wire and what to do next. The classics (200, 301, 404, 500) sit next to the ones that surprise people (207, 418, 451).",
        "Search filters live by number or name — type 30 to land on every redirect, or “teapot” to settle an argument. Clicking a row copies just the number, ready for code, docs or a bug report.",
      ],
      steps: [
        "Type a number or name in the search box, or browse by class.",
        "Read the one-line meaning — no RFC prose, just the practical sense.",
        "Click a row to copy the code number instantly.",
      ],
      faqs: [
        {
          q: "What is the difference between 301, 302 and 307?",
          a: "All three redirect, but 301 is permanent (search engines transfer rankings) while 302/307 are temporary. 307 additionally guarantees the method and body stay unchanged — use it when a POST must survive the redirect.",
        },
        {
          q: "Is 418 I'm a teapot a real status code?",
          a: "It started as an April Fools' joke in RFC 2324 and was later listed as reserved. Some real APIs return it for fun or rate limiting, and browsers handle it like any 4xx error.",
        },
        {
          q: "Why do 401 and 403 both say I can't get in?",
          a: "401 means “who are you?” — credentials are missing or wrong. 403 means “I know who you are and you still can't” — authentication succeeded but the resource is off-limits.",
        },
      ],
    },
    zh: {
      name: "HTTP 状态码速查",
      tagline: "按 1xx–5xx 分类收录 56 个 HTTP 状态码,每条一句平实解释,支持按号码或名称搜索,点击行即复制数字。",
      intro: [
        "从 100 Continue 到 511 Network Authentication Required,按类别分组,每条用一句平实的话讲清:线路上发生了什么、接下来该做什么。常见的 200、301、404、500 都在,冷门的 207、418、451 也在。",
        "搜索按号码或名称实时过滤——输入 30 定位所有重定向,输入 teapot 也能命中。点击行即可复制状态码数字,直接粘进代码、文档或工单。",
      ],
      steps: [
        "在搜索框输入数字或名称,或按类别浏览。",
        "读一行式解释:没有 RFC 原文,只有实际含义。",
        "点击任意一行,立即复制状态码数字。",
      ],
      faqs: [
        {
          q: "301、302 和 307 有什么区别?",
          a: "三者都是重定向,但 301 是永久的(搜索引擎会转移权重),302/307 是临时的。307 还保证方法和请求体不变——POST 需要跨重定向存活时用它。",
        },
        {
          q: "418 I'm a teapot 是真实的状态码吗?",
          a: "它源自 RFC 2324 的愚人节玩笑,后来被列为保留码。一些真实 API 会用它开玩笑或做限流,浏览器把它当普通 4xx 错误处理。",
        },
        {
          q: "401 和 403 都说进不去,区别在哪?",
          a: "401 的意思是「你是谁?」——缺少凭证或凭证错误。403 的意思是「我知道你是谁,但你还是不行」——认证成功但资源禁止访问。",
        },
      ],
    },
    ja: {
      name: "HTTP ステータスコード一覧",
      tagline:
        "1xx から 5xx まで 56 個のステータスコードをクラス別に収録。各コードを一文で平易に解説し、検索とワンクリックコピーに対応。",
      intro: [
        "100 Continue から 511 Network Authentication Required まで、主要なステータスコードをクラス別に収録し、一文でわかりやすく説明します。実際に何が起き、次に何をすべきか。定番の 200・301・404・500 はもちろん、意外な 207・418・451 も載っています。",
        "検索は番号や名前でリアルタイムに絞り込み — 30 と打てばリダイレクト全種、teapot でも命中します。行をクリックすればコード番号だけをコピーでき、コードやドキュメント、バグ報告にすぐ貼れます。",
      ],
      steps: [
        "検索ボックスに番号や名前を入力するか、クラスごとに閲覧します。",
        "一文の説明を読みます。RFC の堅苦しい文ではなく実務的な意味だけ。",
        "行をクリックすると、ステータスコードの番号がすぐコピーされます。",
      ],
      faqs: [
        {
          q: "301・302・307 の違いは?",
          a: "いずれもリダイレクトですが、301 は恒久的(検索エンジンが評価を移す)、302/307 は一時的です。307 はさらにメソッドとボディが変わらないことを保証するので、POST をリダイレクト後も維持したいときに使います。",
        },
        {
          q: "418 I'm a teapot は本物のステータスコード?",
          a: "RFC 2324 のエイプリルフールから生まれ、後に予約コードとして登録されました。冗談やレート制限に使う実在の API もあり、ブラウザは通常の 4xx エラーとして扱います。",
        },
        {
          q: "401 と 403 はどこが違いますか?",
          a: "401 は「あなたは誰?」— 資格情報がないか誤っています。403 は「あなたが誰か分かった上でダメ」— 認証は成功したがリソースへの権限がない、という意味です。",
        },
      ],
    },
    es: {
      name: "Códigos de estado HTTP",
      tagline:
        "Referencia buscable de 56 códigos de estado HTTP agrupados por clase, cada uno explicado en una frase llana — pulsa una fila para copiar el número.",
      intro: [
        "Todos los códigos importantes, de 100 Continue a 511 Network Authentication Required, agrupados por clase y explicados en una frase llana: qué ocurrió realmente en la conexión y qué hacer después. Los clásicos (200, 301, 404, 500) junto a los que sorprenden (207, 418, 451).",
        "La búsqueda filtra en vivo por número o nombre — escribe 30 para ver todos los redireccionamientos, o «teapot» para ganar una discusión. Al pulsar una fila se copia solo el número, listo para código, documentación o un bug report.",
      ],
      steps: [
        "Escribe un número o nombre en el buscador, o navega por clase.",
        "Lee el significado de una línea: nada de prosa RFC, solo el sentido práctico.",
        "Pulsa una fila para copiar el número al instante.",
      ],
      faqs: [
        {
          q: "¿Qué diferencia hay entre 301, 302 y 307?",
          a: "Las tres redirigen, pero 301 es permanente (los buscadores trasladan el posicionamiento) y 302/307 son temporales. 307 además garantiza que el método y el cuerpo no cambian: úsalo cuando un POST deba sobrevivir a la redirección.",
        },
        {
          q: "¿Es 418 I'm a teapot un código real?",
          a: "Nació como broma del Día de los Inocentes en el RFC 2324 y luego quedó como código reservado. Algunas APIs reales lo devuelven por diversión o para limitar peticiones, y los navegadores lo tratan como un 4xx más.",
        },
        {
          q: "401 y 403 dicen ambos que no puedo entrar, ¿en qué se diferencian?",
          a: "401 dice «¿quién eres?» — faltan credenciales o son erróneas. 403 dice «sé quién eres y aun así no puedes» — la autenticación funcionó pero el recurso está vetado.",
        },
      ],
    },
    pt: {
      name: "Códigos de status HTTP",
      tagline:
        "Referência pesquisável de 56 códigos de status HTTP agrupados por classe, cada um explicado numa frase simples — clique numa linha para copiar o número.",
      intro: [
        "Todos os códigos importantes, de 100 Continue a 511 Network Authentication Required, agrupados por classe e explicados numa frase simples: o que realmente aconteceu na conexão e o que fazer em seguida. Os clássicos (200, 301, 404, 500) ao lado dos que surpreendem (207, 418, 451).",
        "A busca filtra ao vivo por número ou nome — digite 30 para ver todos os redirecionamentos, ou “teapot” para encerrar uma discussão. Clicar numa linha copia apenas o número, pronto para código, documentação ou um bug report.",
      ],
      steps: [
        "Digite um número ou nome na busca, ou navegue por classe.",
        "Leia o significado de uma linha — sem prosa de RFC, só o sentido prático.",
        "Clique numa linha para copiar o número na hora.",
      ],
      faqs: [
        {
          q: "Qual a diferença entre 301, 302 e 307?",
          a: "Os três redirecionam, mas 301 é permanente (mecanismos de busca transferem o ranqueamento) enquanto 302/307 são temporários. O 307 ainda garante que método e corpo não mudam — use quando um POST precisa sobreviver ao redirect.",
        },
        {
          q: "O 418 I'm a teapot é um código de verdade?",
          a: "Nasceu como piada de primeiro de abril no RFC 2324 e depois ficou listado como reservado. Algumas APIs reais o devolvem por diversão ou para limitar requisições, e navegadores o tratam como qualquer 4xx.",
        },
        {
          q: "401 e 403 dizem os dois que não posso entrar — qual a diferença?",
          a: "401 diz “quem é você?” — faltam credenciais ou estão erradas. 403 diz “sei quem você é e ainda assim não pode” — a autenticação funcionou, mas o recurso é proibido.",
        },
      ],
    },
  },
});
