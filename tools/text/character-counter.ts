import { TextStats } from "../_engines/text-stats";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "character-counter",
  category: "text",
  icon: "hash",
  engine: { component: TextStats, props: { primary: "characters" } },
  related: ["word-counter", "sentence-counter", "case-converter", "text-cleaner", "text-diff", "text-sorter", "remove-extra-spaces", "remove-duplicate-lines", "lorem-ipsum-generator", "text-to-binary"],
  copy: {
    en: {
      name: "Character Counter",
      tagline:
        "Count characters with and without spaces, plus words, sentences, paragraphs and lines as you type — perfect for tweets, titles and meta descriptions.",
      intro: [
        "A character counter built for hard limits: meta titles around 60 characters, meta descriptions around 155, SMS segments, ad headlines and app form fields that count every keystroke. The panel shows characters with spaces and without, plus words, sentences and lines, so you always know which number the platform in front of you cares about.",
        "Characters are counted as Unicode code points, so an emoji outside the Basic Multilingual Plane (anything above U+FFFF — most smileys and flag sequences) counts as 1, not 2. The no-spaces figure strips every whitespace character including tabs and newlines, matching how form validators usually measure.",
        "Everything recalculates on each keystroke with no count button and no delay, and every metric updates independently — you can watch a title approach its target length while the word total keeps changing. Nothing leaves your browser: paste unpublished drafts, client copy or confidential text without it being stored or sent anywhere.",
        "Compared with word-counter, which is oriented to essays and reading time, this page keeps character totals front and center for tight limits. For text that also needs reshaping before it fits, case-converter and remove-extra-spaces sit one click away in the related-tools row.",
      ],
      steps: [
        "Paste or type your text into the box.",
        "Read the highlighted characters panel first, then the other counts as needed.",
        "Trim your text until you are under the limit — the numbers update live.",
      ],
      faqs: [
        {
          q: "Do spaces and line breaks count as characters?",
          a: "Yes — the main figure counts every character including spaces and line breaks, exactly like most platforms do. The 'No spaces' figure strips whitespace so you can compare.",
        },
        {
          q: "How are emoji counted?",
          a: "Emoji are counted as Unicode code points, so most modern emoji count as one character. Complex sequences built from several code points (skin tones, family emoji) may count as more than one.",
        },
        {
          q: "Which platforms limit by characters?",
          a: "X/Twitter posts, meta titles (around 60) and descriptions (around 160), SMS segments (160) and most ad platforms — always check the specific field you are writing for.",
        },
      ],
      deepDive: [
        {
          heading: "Characters versus grapheme clusters",
          paragraphs: [
            "The word \"character\" hides a trap: what a user perceives as one character is not always one code unit. Emoji with skin tones, flags and family combinations, accented letters written as base plus combining mark, and Devanagari conjuncts are all single characters to the eye but several code points in the string.",
            "That is why serious counters report two numbers: code units (what JavaScript's length property counts, and what most platform limits historically measured) and grapheme clusters (what humans see). The gap is real — a flag emoji is 1 cluster but 4 UTF-16 code units.",
            "For practical purposes: social platforms generally count closer to grapheme clusters nowadays, while older forms and databases count code units. When a limit sits at the boundary, the safe strategy is to leave headroom equal to the number of emoji in your text.",
          ],
        },
        {
          heading: "Reading hard limits correctly",
          paragraphs: [
            "Character limits are rarely negotiable, but they are measurable: SMS segments at 160 characters (70 when any non-GSM character appears, which doubles the cost per segment), platform bios, meta description targets around 150–160 characters, meta titles around 50–60. Knowing which regime applies to your text beats guessing.",
            "The SMS case deserves special attention because it is the most punishing: one accented letter or one emoji flips the entire message into a different encoding and roughly halves the characters per segment. A message that fits in one segment as typed English can become three segments with a single heart emoji.",
            "Counters also help the reverse direction: when writing for a minimum — a 300-character essay response, a product description floor — watching a live count removes the tedium of counting by hand and the risk of submitting under the limit.",
          ],
        },
        {
          heading: "Local counting for private drafts",
          paragraphs: [
            "Counting happens entirely in your browser: the text is analyzed in local JavaScript and never transmitted. That makes it appropriate for unpublished manuscripts, confidential emails, application letters and anything else you would not paste into a random web service.",
            "The counter updates on every keystroke rather than on submit, so the workflow is continuous: type, glance at the number, adjust. There is no button to press and no round trip to wait for.",
            "One habit worth adopting: count the final version, not just drafts. Edits, especially pastes from other sources, change lengths silently, and the version you actually submit is the one whose count matters.",
          ],
        },
      ],
    },
    zh: {
      name: "字符计数器",
      tagline: "字符数实时统计:含空格、不含空格、词数、句数一屏看全,适用于微博、标题和 meta 描述。",
      intro: [
        "为硬性字数限制设计的字符统计工具:社交发帖、meta 标题、meta 描述、广告文案、短信和应用输入框,都按字符精确计数。面板同时显示含空格与不含空格两个数字,对应不同平台的计数规则。",
        "边输入边统计,全程在浏览器本地完成——未发布的草稿、客户文案或保密内容都可以放心粘贴,不会被保存或上传。",
      ],
      steps: [
        "把文本粘贴或输入到输入框。",
        "先看高亮的字符数面板,再按需查看其他统计。",
        "边删改边看数字,直到降到限制以内——统计实时更新。",
      ],
      faqs: [
        {
          q: "空格和换行算字符吗?",
          a: "算。主数字统计包括空格和换行在内的所有字符,和多数平台一致;“不含空格”一栏去掉空白,方便对照。",
        },
        {
          q: "emoji 怎么计数?",
          a: "emoji 按 Unicode 码点计数,大多数 emoji 算 1 个字符;由多个码点组成的复杂 emoji(肤色、家庭组合等)可能计为多个。",
        },
        {
          q: "哪些平台按字符限制?",
          a: "X(Twitter)帖子、meta 标题(约 60)、meta 描述(约 160)、短信分段(160)以及多数广告平台——以你要投放的具体字段为准。",
        },
      ],
      deepDive: [
        {
          heading: "字符与字素簇:一个字未必是一个字",
          paragraphs: [
            "“字符”这个词埋着陷阱:用户眼里的一個字符,不一定对应一个代码单元。带肤色的 emoji、旗帜和家庭成员组合、用基本字符加组合符号写的带音标字母、天城文的合体字——眼睛看是一个字,字符串里却是好几个码点。",
            "所以认真的计数器会给两个数:代码单元数(JavaScript 的 length 属性数的就是它,多数平台限制历史上也按它算)和字素簇数(人眼看到的数)。差距真实存在——一面旗帜 emoji 是 1 个字素簇,却是 4 个 UTF-16 代码单元。",
            "实用结论:如今社交平台的计数更接近字素簇,而老表单和数据库多按代码单元算。当限制正好卡在边界上,稳妥策略是留出与文本中 emoji 数量相等的余量。",
          ],
        },
        {
          heading: "正确理解硬性限制",
          paragraphs: [
            "字符限制几乎不可协商,但都可以测量:短信按 160 字符分段(一旦出现任何非 GSM 字符就变成 70 字符,每段成本翻倍)、平台简介、150–160 字符左右的 meta 描述、50–60 字符左右的标题。搞清楚你的文本属于哪套规则,比瞎猜强。",
            "短信这个案例值得单独强调,因为它惩罚最重:一个带音标的字母或一个 emoji,会把整条消息切到另一种编码,每段可容纳的字符数近乎减半。纯英文打出来正好一段的消息,加一颗爱心就变成三段。",
            "计数器也帮反方向:写有下限的内容时——300 字的论述题回答、产品描述的最低字数——实时计数免去了手动数数的枯燥,也避免提交时低于下限的风险。",
          ],
        },
        {
          heading: "本地计数,草稿放心",
          paragraphs: [
            "计数完全在你的浏览器内进行:文本由本地 JavaScript 分析,从不外传。因此它适合未出版的手稿、机密邮件、申请信,以及任何你不想粘进陌生网站的内容。",
            "计数随每次击键刷新,而不是提交后才更新,所以工作流是连续的:输入、瞥一眼数字、调整。没有按钮要按,也没有往返要等。",
            "一个值得养成的习惯:统计最终版本,别只统计草稿。编辑——尤其是从别处粘贴的内容——会悄悄改变长度,而你真正提交的那一版,才是计数有意义的版本。",
          ],
        },
      ],
    },
    ja: {
      name: "文字数カウンター",
      tagline: "文字数(空白あり/なし)をリアルタイム集計。単語数・文数も同時表示。SNS や meta 文字数の確認に。",
      intro: [
        "文字数の上限がある場所のためのカウンター:SNS 投稿、meta タイトル、meta ディスクリプション、広告文、SMS、アプリの入力欄など、1 文字単位で正確に数えます。空白あり・なしの両方を表示するので、プラットフォームごとの数え方に合わせて確認できます。",
        "入力しながら即時集計。処理はすべてブラウザ内で行われ、未公開の下書きや機密性の高いテキストも保存・送信されません。",
      ],
      steps: [
        "テキストを入力欄に入力または貼り付けます。",
        "ハイライトされた文字数パネルを確認し、必要に応じて他の数値も見ます。",
        "上限以内に収まるまで編集します。数値はリアルタイムで更新されます。",
      ],
      faqs: [
        {
          q: "空白や改行も文字数に含まれますか?",
          a: "含まれます。メインの数値は空白・改行を含む全文字数で、多くのプラットフォームと同じ数え方です。「空白なし」の数値は空白を除いた比較用です。",
        },
        {
          q: "絵文字はどう数えますか?",
          a: "絵文字は Unicode のコードポイント単位で数えるため、多くの絵文字は 1 文字です。肌の色や家族の組み合わせなど、複数コードポイントで構成される絵文字は複数として数えられます。",
        },
        {
          q: "文字数制限がある主な場所は?",
          a: "X(Twitter)の投稿、meta タイトル(約 60 文字)、meta ディスクリプション(約 160 文字)、SMS のセグメント(160 文字)、多くの広告プラットフォームなど。入力するフィールドの規定を確認してください。",
        },
      ],
      deepDive: [
        {
          heading: "文字と書素クラスター:1 文字が 1 文字とは限らない",
          paragraphs: [
            "「文字」という言葉には罠が埋まっています:ユーザーの目には 1 文字に見えても、1 コードユニットとは限らない。肌色付き絵文字、国旗や家族の組み合わせ、基底文字に結合記号を重ねたアクセント付き文字、デーヴァナーガリーの合字——目には 1 文字でも、文字列の中では複数のコードポイントです。",
            "だから本格的なカウンターは 2 つの数字を出します:コードユニット数(JavaScript の length が数えるもの、多くのプラットフォーム制限が歴史的に測ってきたもの)と書素クラスター数(人間の目に見えるもの)。差は現実に——国旗の絵文字はクラスター 1 だが UTF-16 コードユニットでは 4 です。",
            "実用上は:今どきの SNS のカウントは書素クラスターに近く、古いフォームやデータベースはコードユニットに近い。制限が境界ぎりぎりに置かれているなら、テキスト中の絵文字の数ぶんの余裕を残すのが安全策です。",
          ],
        },
        {
          heading: "ハードリミットを正しく読む",
          paragraphs: [
            "文字数制限はほぼ交渉不能ですが、測定は可能です:SMS は 160 文字で 1 セグメント(GSM 外の文字が一つでも出ると 70 文字になり、セグメントあたりのコストが倍増)、SNS のプロフィール文、目安 150〜160 文字の meta description、50〜60 文字のタイトル。自分のテキストがどの規則に当たるか知ることが、推測に勝ります。",
            "SMS のケースは最も罰が重いので特別扱いに値します:アクセント付き文字や絵文字 1 個でメッセージ全体が別のエンコーディングに切り替わり、セグメントあたりの文字数がほぼ半減します。英語で打てば 1 セグメントに収まる文も、ハートの絵文字 1 個で 3 セグメントになります。",
            "カウンターは逆方向にも効きます:下限のある執筆——300 字の記述式回答、商品説明の最低文字数——では、リアルタイムのカウントが手数えの退屈さと、下限未満のまま提出するリスクの両方を取り除きます。",
          ],
        },
        {
          heading: "ローカル計数で下書きも安心",
          paragraphs: [
            "計数は完全にブラウザ内で行われます:テキストはローカルの JavaScript で解析され、送信はされません。未出版の原稿、機密のメール、応募書類、見知らぬ Web サービスに貼りたくないすべてに適します。",
            "カウントは送信時ではなく 1 キーごとに更新されるため、ワークフローは連続的です:打つ、数字を一瞥、調整。押すボタンも待つ往復もありません。",
            "採用すべき習慣:下書きだけでなく最終版を数える。編集、特に他ソースからの貼り付けは長さを静かに変え、実際に提出する版の数だけが意味を持ちます。",
          ],
        },
      ],
    },
    es: {
      name: "Contador de caracteres",
      tagline:
        "Cuenta caracteres con y sin espacios, además de palabras, frases, párrafos y líneas mientras escribes — ideal para tuits, títulos y metadescripciones.",
      intro: [
        "Un contador pensado para límites estrictos: publicaciones sociales, meta títulos, meta descripciones, anuncios, SMS y campos de apps que cuentan cada carácter. El panel muestra el total con y sin espacios, para que sepas siempre qué cifra mira cada plataforma.",
        "Todo se recalcula mientras escribes y nada sale de tu navegador: pega borradores sin publicar, textos de clientes o contenido confidencial sin preocuparte.",
      ],
      steps: [
        "Pega o escribe tu texto en el cuadro.",
        "Mira primero el panel resaltado de caracteres y después el resto de cifras.",
        "Ajusta el texto hasta quedar por debajo del límite: los números se actualizan al instante.",
      ],
      faqs: [
        {
          q: "¿Los espacios y saltos de línea cuentan como caracteres?",
          a: "Sí: la cifra principal cuenta todos los caracteres, espacios y saltos incluidos, igual que la mayoría de plataformas. La cifra «sin espacios» elimina los blancos para comparar.",
        },
        {
          q: "¿Cómo se cuentan los emojis?",
          a: "Los emojis se cuentan como puntos de código Unicode: la mayoría cuenta como uno. Las secuencias complejas (tonos de piel, familia) pueden contar como más de uno.",
        },
        {
          q: "¿Qué plataformas limitan por caracteres?",
          a: "Las publicaciones de X/Twitter, los meta títulos (~60) y descripciones (~160), los segmentos SMS (160) y casi todas las plataformas publicitarias. Consulta siempre el campo concreto.",
        },
      ],
      deepDive: [
        {
          heading: "Caracteres frente a grupos de grafemas",
          paragraphs: [
            "La palabra \"carácter\" esconde una trampa: lo que el usuario percibe como un carácter no siempre es una unidad de código. Emojis con tonos de piel, combinaciones de banderas y familias, letras acentuadas escritas como base más signo combinante y los conjuntos devanágari son un solo carácter a la vista pero varios puntos de código en la cadena.",
            "Por eso los contadores serios dan dos números: unidades de código (lo que cuenta la propiedad length de JavaScript, y lo que la mayoría de límites de plataformas midió históricamente) y grupos de grafemas (lo que ven los humanos). La diferencia es real — una bandera emoji es 1 grupo pero 4 unidades de código UTF-16.",
            "Para uso práctico: las plataformas sociales cuentan hoy más cerca de los grupos de grafemas, mientras que los formularios viejos y las bases de datos cuentan unidades de código. Cuando el límite cae justo en el borde, la estrategia segura es dejar margen igual al número de emojis de tu texto.",
          ],
        },
        {
          heading: "Leer bien los límites duros",
          paragraphs: [
            "Los límites de caracteres casi nunca se negocian, pero sí se miden: los segmentos SMS a 160 caracteres (70 en cuanto aparece cualquier carácter fuera de GSM, lo que duplica el coste por segmento), las biografías de plataformas, las meta descriptions de 150–160 caracteres, los títulos de 50–60. Saber qué régimen aplica a tu texto vale más que adivinar.",
            "El caso SMS merece atención especial porque es el más castigador: una letra acentuada o un emoji cambian todo el mensaje a otra codificación y reducen a la mitad los caracteres por segmento. Un mensaje que cabe en un segmento como inglés tecleado se convierte en tres con un solo corazón emoji.",
            "Los contadores también ayudan en dirección contraria: al escribir con un mínimo — una respuesta de 300 caracteres, un suelo de descripción de producto — ver el número en vivo elimina la rutina de contar a mano y el riesgo de enviar por debajo del límite.",
          ],
        },
        {
          heading: "Conteo local para borradores privados",
          paragraphs: [
            "El conteo ocurre íntegramente en tu navegador: el texto se analiza con JavaScript local y nunca se transmite. Por eso sirve para manuscritos inéditos, correos confidenciales, cartas de solicitud y cualquier cosa que no pegarías en un servicio web cualquiera.",
            "El contador se actualiza con cada tecla en vez de al enviar, así que el flujo es continuo: escribes, miras el número, ajustas. No hay botón que pulsar ni viaje de ida y vuelta que esperar.",
            "Un hábito que vale adoptar: cuenta la versión final, no solo los borradores. Las ediciones — sobre todo los pegados de otras fuentes — cambian longitudes en silencio, y la versión que realmente envías es la única cuyo conteo importa.",
          ],
        },
      ],
    },
    pt: {
      name: "Contador de caracteres",
      tagline:
        "Conte caracteres com e sem espaços, além de palavras, frases, parágrafos e linhas enquanto digita — perfeito para tweets, títulos e meta descriptions.",
      intro: [
        "Um contador feito para limites rígidos: posts sociais, meta títulos, meta descriptions, anúncios, SMS e campos de apps que contam cada caractere. O painel mostra o total com e sem espaços, para você saber sempre qual número cada plataforma usa.",
        "Tudo é recalculado enquanto você digita e nada sai do navegador: cole rascunhos não publicados, textos de clientes ou conteúdo confidencial sem preocupação.",
      ],
      steps: [
        "Cole ou digite seu texto na caixa.",
        "Veja primeiro o painel destacado de caracteres e depois as outras contagens.",
        "Ajuste o texto até ficar abaixo do limite — os números atualizam em tempo real.",
      ],
      faqs: [
        {
          q: "Espaços e quebras de linha contam como caracteres?",
          a: "Sim — o número principal conta todos os caracteres, incluindo espaços e quebras, como a maioria das plataformas. O número “sem espaços” remove os brancos para comparação.",
        },
        {
          q: "Como os emojis são contados?",
          a: "Emojis contam como pontos de código Unicode: a maioria vale um caractere. Sequências complexas (tons de pele, emoji de família) podem contar como mais de um.",
        },
        {
          q: "Quais plataformas limitam por caracteres?",
          a: "Posts do X/Twitter, meta títulos (~60) e descrições (~160), segmentos de SMS (160) e quase todas as plataformas de anúncios. Confira sempre o campo específico.",
        },
      ],
      deepDive: [
        {
          heading: "Caracteres versus agrupamentos de grafemas",
          paragraphs: [
            "A palavra \"caractere\" esconde uma armadilha: o que o usuário percebe como um caractere nem sempre é uma unidade de código. Emojis com tons de pele, combinações de bandeiras e famílias, letras acentuadas escritas como base mais sinal combinante e os conjuntos devanágari são um só caractere aos olhos, mas vários pontos de código na string.",
            "Por isso contadores sérios informam dois números: unidades de código (o que a propriedade length do JavaScript conta, e o que a maioria dos limites de plataformas mediu historicamente) e agrupamentos de grafemas (o que os humanos veem). A diferença é real — uma bandeira emoji é 1 agrupamento mas 4 unidades de código UTF-16.",
            "Para uso prático: as plataformas sociais hoje contam mais perto dos agrupamentos de grafemas, enquanto formulários antigos e bancos de dados contam unidades de código. Quando o limite cai exatamente na borda, a estratégia segura é deixar folga igual ao número de emojis do seu texto.",
          ],
        },
        {
          heading: "Ler bem os limites rígidos",
          paragraphs: [
            "Limites de caracteres raramente são negociáveis, mas são mensuráveis: segmentos de SMS a 160 caracteres (70 assim que aparece qualquer caractere fora do GSM, o que dobra o custo por segmento), biografias de plataformas, meta descriptions de 150–160 caracteres, títulos de 50–60. Saber qual regime se aplica ao seu texto vale mais que adivinhar.",
            "O caso do SMS merece atenção especial porque é o mais punitivo: uma letra acentuada ou um emoji muda a mensagem inteira para outra codificação e reduz pela metade os caracteres por segmento. Uma mensagem que cabe num segmento como inglês digitado vira três com um único emoji de coração.",
            "Os contadores também ajudam na direção contrária: ao escrever com um mínimo — uma resposta de 300 caracteres, um piso de descrição de produto — ver o número ao vivo elimina a chatice de contar à mão e o risco de enviar abaixo do limite.",
          ],
        },
        {
          heading: "Contagem local para rascunhos privados",
          paragraphs: [
            "A contagem acontece inteiramente no seu navegador: o texto é analisado em JavaScript local e nunca transmitido. Por isso serve para manuscritos inéditos, e-mails confidenciais, cartas de candidatura e qualquer coisa que você não colaria num serviço web qualquer.",
            "O contador atualiza a cada tecla em vez de no envio, então o fluxo é contínuo: digita, olha o número, ajusta. Não há botão para apertar nem ida e volta para esperar.",
            "Um hábito que vale adotar: conte a versão final, não só os rascunhos. Edições — sobretudo colagens de outras fontes — mudam comprimentos em silêncio, e a versão que você realmente envia é a única cuja contagem importa.",
          ],
        },
      ],
    },
  },
});
