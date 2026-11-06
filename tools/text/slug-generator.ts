import { TextTransform } from "../_engines/text-tool";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "slug-generator",
  category: "text",
  icon: "link",
  engine: {
    component: TextTransform,
    props: {
      transform: "slugify",
      sample: "Café Mémoirs — The 2026 Edition (Vol. 2)!",
    },
  },
  related: ["case-converter", "lorem-ipsum-generator", "remove-extra-spaces", "text-cleaner", "text-diff", "text-sorter", "remove-duplicate-lines", "word-counter", "sentence-counter", "text-to-binary"],
  copy: {
    en: {
      name: "Slug Generator",
      tagline:
        "Turn any headline into a clean URL slug — lowercase, accent-free and hyphenated — ready for SEO-friendly links.",
      intro: [
        "A slug is the part of a URL that names the page — /tools/slug-generator, for example. Good slugs are lowercase, use hyphens instead of spaces and keep only letters and numbers, which makes links readable in search results, easy to copy and safe across servers and frameworks.",
        "Paste a title in any language: accents are stripped with Unicode NFD decomposition (café → cafe, über → uber), punctuation and spaces collapse into single hyphens, and the result is trimmed so no slug starts or ends with a dash. Double spaces, underscores and symbols all fold to the same clean form.",
        "NFD decomposition splits accented letters and removes the combining marks in the U+0300–036F range, which is why German umlauts, French accents and Vietnamese diacritics reduce predictably. One trade-off to know: CJK, Cyrillic and other non-Latin scripts produce an empty slug, so transliterate those titles first.",
        "Compared with letting a CMS auto-slug silently or hand-editing URLs, you see exactly what the algorithm does to each character and copy the result with one click. Pair it with case-converter for kebab-case identifiers in code, which follows the same lowercase-hyphen convention.",
      ],
      steps: [
        "Type or paste the page title into the input box.",
        "Watch the slug appear as you type — adjust the title until it reads well.",
        "Copy the slug into your CMS, router or static site generator.",
      ],
      faqs: [
        {
          q: "What makes a good URL slug?",
          a: "Short, lowercase, hyphen-separated and descriptive. Search engines read slugs as a ranking hint and users read them in results, so 'blue-running-shoes' beats '/p?id=8123'.",
        },
        {
          q: "Why are accents removed?",
          a: "Non-ASCII characters get percent-encoded in URLs (é becomes %C3%A9), producing long, ugly and error-prone links. ASCII slugs stay short and work everywhere.",
        },
        {
          q: "Should I keep stop words like 'the' and 'of'?",
          a: "Many SEO guides suggest dropping them to keep slugs short — edit the generated slug freely before copying; the tool gives you the full hyphenated base.",
        },
      ],
      deepDive: [
        {
          heading: "What a slug is for",
          paragraphs: [
            "A slug is the URL-safe version of a title: \"10 Tips for Great Coffee\" becomes 10-tips-for-great-coffee. Slugs matter for three reasons: they make URLs readable to humans before clicking, they carry keywords that search engines use as a ranking signal, and they keep URLs stable and shareable — no spaces, no percent-encoding garbage like %20 everywhere.",
            "The mechanics: lowercase everything, replace spaces with a separator (hyphen is the web convention), strip characters that are illegal or ambiguous in URLs, and collapse repeats. A good generator does all of that at once instead of leaving you to hand-fix \"%C3%A9\" sequences in a share link.",
            "Slugs also serve non-URL jobs: file names for exported assets, git branch names, component IDs. Same rules apply everywhere — the character set that survives copying, encoding and terminals without turning into escapes.",
          ],
        },
        {
          heading: "Accents, transiteration and the CJK problem",
          paragraphs: [
            "Accented Latin is the first decision point. Two schools exist: transliterate (café → cafe) or strip the accents (café → caf). Transliteration preserves readability and is what this tool does for common Latin diacritics — á becomes a, ü becomes u — using the standard Unicode folding rules.",
            "CJK text forces a harder choice: there is no Latin letter to fold 一杯好咖啡 into. The options are pinyin for Chinese, romanization for Japanese, or keeping the characters as-is. Modern browsers handle UTF-8 URLs fine, so keeping CJK characters in a slug is technically valid and common on Chinese platforms; international sharing, however, favors pinyin or romanization because it survives SMS, terminals and older systems without encoding noise.",
            "Numbers and stop-words are taste decisions: keeping \"the\" and \"of\" makes longer, more readable slugs; trimming them makes shorter ones. SEO advice has flip-flopped over the years; the stable consensus is that a slug matching the title is more important than a slug that is short.",
          ],
        },
        {
          heading: "Generated live, kept local",
          paragraphs: [
            "The conversion runs on every keystroke in your browser. No API call, no rate limit, works offline — unlike slug services that need a round trip per title.",
            "Deterministic output matters for content systems: the same title always produces the same slug, so links built today do not break when the article is regenerated. There is no random suffix unless you add one yourself (a short random tail is the standard way to guarantee uniqueness across thousands of articles).",
            "Uniqueness checking is deliberately not done here — it requires knowing your full URL inventory, which lives in your CMS. The tool guarantees format correctness; collision avoidance stays in your routing layer, where it belongs.",
          ],
        },
      ],
    },
    zh: {
      name: "Slug 生成器",
      tagline: "把任意标题转成干净的 URL slug:小写、去重音符、连字符分隔,直接用于对 SEO 友好的链接。",
      intro: [
        "slug 是 URL 中标识页面的部分,比如 /tools/slug-generator。好的 slug 全小写、用连字符代替空格、只保留字母和数字,让链接在搜索结果里可读、方便复制,并在各种服务器和框架之间保持安全。",
        "粘贴任意语言的标题:重音会被去除(café → cafe),标点和空格折叠为单个连字符,结果会去掉首尾,slug 不会以连字符开头或结尾。",
      ],
      steps: [
        "把页面标题输入或粘贴到输入框。",
        "边输入边看 slug 生成,直到读起来顺口。",
        "把 slug 复制到 CMS、路由或静态站点生成器里。",
      ],
      faqs: [
        {
          q: "什么样的 slug 算好?",
          a: "短、全小写、连字符分隔、含义明确。搜索引擎把 slug 当作排名参考,用户也会在结果里读到它,所以 'blue-running-shoes' 远好于 '/p?id=8123'。",
        },
        {
          q: "为什么要去掉重音符号?",
          a: "非 ASCII 字符在 URL 里会被百分号编码(é 变成 %C3%A9),又长又丑还容易出错;ASCII slug 更短,在哪都能用。",
        },
        {
          q: "'the'、'of' 这类虚词要保留吗?",
          a: "不少 SEO 建议删掉它们让 slug 更短——复制前自由编辑即可,工具给你完整的基础形态。",
        },
      ],
      deepDive: [
        {
          heading: "slug 是干什么用的",
          paragraphs: [
            "slug 是标题的 URL 安全版本:“10 条泡好咖啡的技巧”变成 10-tips-for-great-coffee。slug 重要有三个原因:点击前人类就能读懂 URL;它携带搜索引擎用作排名信号的关键词;它让 URL 稳定、可分享——没有空格,没有满屏 %20 这样的百分号编码垃圾。",
            "机制是:全部转小写、空格替换成分隔符(连字符是 Web 惯例)、剔除 URL 中非法或有歧义的字符、折叠连续重复。好的生成器一次做完这些,而不是让你在分享链接里手工修理 %C3%A9 这样的序列。",
            "slug 还兼任 URL 之外的工作:导出资源的文件名、git 分支名、组件 ID。规则处处相同——这套字符集在复制、编码和终端里都不会变成转义符。",
          ],
        },
        {
          heading: "重音符、转写与 CJK 难题",
          paragraphs: [
            "带重音的拉丁字母是第一个决策点。两个流派:转写(café → cafe)或剥掉重音符(café → caf)。转写保留可读性,本工具对常见拉丁变音符走这条路——á 变 a,ü 变 u——用的是标准 Unicode 折叠规则。",
            "CJK 文本逼出更难的抉择:一杯好咖啡没有对应的拉丁字母可折叠。选项有中文拼音、日语罗马字,或保留原字符。现代浏览器处理 UTF-8 URL 没有问题,所以在 slug 里保留 CJK 字符技术上有效、中文平台也常见;但国际分享更偏向拼音或罗马字,因为它能干净地穿过短信、终端和旧系统,不产生编码噪音。",
            "数字和停用词是品味决策:保留 “the”“of” 让 slug 更长更可读,裁掉则更短。SEO 建议这些年反复横跳;稳定共识是 slug 与标题一致,比 slug 短更重要。",
          ],
        },
        {
          heading: "实时生成,本地完成",
          paragraphs: [
            "转换随每次击键在浏览器里完成。没有 API 调用、没有频率限制、离线可用——不像那些每个标题都要往返一次的 slug 服务。",
            "确定性输出对内容系统很重要:同一个标题永远产出同一个 slug,文章重新生成时链接不会断。除非你自己加上,这里不会有随机后缀(短随机尾巴是保证几千篇文章间唯一性的标准做法)。",
            "唯一性检查刻意不做——那需要知道你全部的 URL 清单,而它住在你的 CMS 里。工具保证格式正确;避免冲突留在你的路由层,那才是它该在的地方。",
          ],
        },
      ],
    },
    ja: {
      name: "スラッグ生成",
      tagline: "見出しを小文字・アクセントなし・ハイフン区切りのクリーンな URL スラッグに変換。SEO にやさしいリンクに。",
      intro: [
        "スラッグは URL のうちページ名を示す部分です(例:/tools/slug-generator)。良いスラッグは小文字で、空白の代わりにハイフンを使い、英数字だけを残します。検索結果で読みやすく、コピーしやすく、サーバーやフレームワークをまたいでも安全です。",
        "どの言語のタイトルでも貼り付ければ OK:アクセントは取り除かれ(café → cafe)、記号や空白は 1 つのハイフンにまとめられ、先頭・末尾のハイフンは自動で取り除かれます。",
      ],
      steps: [
        "ページタイトルを入力または貼り付けます。",
        "入力に合わせてスラッグが生成されます。読みやすくなるまで調整します。",
        "スラッグをコピーして CMS、ルーターや静的サイトジェネレーターに貼り付けます。",
      ],
      faqs: [
        {
          q: "良い URL スラッグの条件は?",
          a: "短く、小文字で、ハイフン区切り、内容が分かること。検索エンジンはスラッグをランキングの参考にし、ユーザーも結果画面で読むため、'blue-running-shoes' は '/p?id=8123' よりはるかに有利です。",
        },
        {
          q: "なぜアクセントを取り除くのですか?",
          a: "ASCII 外の文字は URL でパーセントエンコードされ(é は %C3%A9 に)、長く醜くミスもしやすいリンクになります。ASCII のスラッグは短く、どこでも機能します。",
        },
        {
          q: "'the' や 'of' のような機能語は残すべき?",
          a: "短くするために外すよう推奨する SEO ガイドも多くあります。コピーする前に自由に編集してください。ツールはハイフン区切りの完全な形を出します。",
        },
      ],
      deepDive: [
        {
          heading: "スラッグは何のためにあるか",
          paragraphs: [
            "スラッグはタイトルの URL 安全版です。「おいしいコーヒーのコツ 10」は oishii-coffee-tips-10 のようになります。スラッグが重要な理由は 3 つあります。クリック前に人間が URL を読めること、検索エンジンがランキングシグナルとして使うキーワードを運ぶこと、そして URL を安定して共有可能に保つこと——空白も、%20 のようなパーセントエンコーディングのゴミもなしで。",
            "仕組みは、すべて小文字化、空白を区切り文字(ウェブの慣習ではハイフン)に置換、URL で違法または曖昧な文字の除去、繰り返しの圧縮です。良いジェネレーターはこれを一度に済ませ、共有リンク内の %C3%A9 シーケンスを手作業で直すようなことはさせません。",
            "スラッグは URL 以外の仕事も担います。書き出すアセットのファイル名、git ブランチ名、コンポーネント ID。ルールはどこでも同じ——コピー・エンコード・端末を通ってもエスケープに化けない文字セットです。",
          ],
        },
        {
          heading: "アクセント、翻字、CJK の問題",
          paragraphs: [
            "アクセント付きラテン文字が最初の意思決定点です。翻字する(café → cafe)派とアクセントを剥がす(café → caf)派があります。翻字は可読性を保ち、このツールは一般的なラテン dia を標準の Unicode 折りたたみ規則で処理します。á は a に、ü は u になります。",
            "CJK テキストはより難しい選択を迫ります。一杯好咖啡 に折りたためるラテン文字は存在しないからです。選択肢は中国語ならピンイン、日本語ならローマ字、または文字をそのまま保持すること。現代のブラウザは UTF-8 URL を問題なく扱うので、スラッグに CJK 文字を保持するのは技術的に有効で、中国のプラットフォームでは一般的です。ただし国際的な共有では、SMS・端末・旧システムをエンコードノイズなしで通過できるピンインやローマ字が好まれます。",
            "数字とストップワードは好みの判断です。「the」「of」を残すとより長く読みやすいスラッグに、削ると短くなります。SEO の助言は年来揺れ動いていますが、安定した合意は、短いスラッグよりタイトルと一致するスラッグのほうが重要だというものです。",
          ],
        },
        {
          heading: "リアルタイム生成、ローカル完結",
          paragraphs: [
            "変換はキー入力のたびにブラウザ内で走ります。API 呼び出しもレート制限もなく、オフラインで動きます。タイトルごとに往復を要するスラッグサービスとは違います。",
            "決定論的な出力はコンテンツシステムで重要です。同じタイトルは常に同じスラッグを生むので、記事を再生成しても今日作ったリンクは壊れません。自分で追加しない限りランダム接尾辞は付きません(短いランダムな尾を付けるのが、数千記事間の一意性を保証する標準手法です)。",
            "一意性チェックは意図的に行いません。それは URL の全在庫を知る必要があり、その在庫は CMS の中にあります。このツールは形式の正しさを保証し、衝突の回避は属する先であるルーティング層に任せます。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de slugs",
      tagline:
        "Convierte cualquier titular en un slug de URL limpio — en minúsculas, sin acentos y con guiones — listo para enlaces amigables con SEO.",
      intro: [
        "El slug es la parte de la URL que nombra la página — por ejemplo /tools/slug-generator. Un buen slug va en minúsculas, usa guiones en lugar de espacios y conserva solo letras y números: así los enlaces se leen bien en los resultados de búsqueda, se copian fácil y funcionan en cualquier servidor o framework.",
        "Pega un título en cualquier idioma: los acentos se quitan (café → cafe), la puntuación y los espacios se pliegan en guiones simples y el resultado se recorta para que el slug no empiece ni termine con guion.",
      ],
      steps: [
        "Escribe o pega el título de la página en el cuadro.",
        "El slug aparece mientras escribes: ajusta el título hasta que se lea bien.",
        "Copia el slug a tu CMS, router o generador de sitio estático.",
      ],
      faqs: [
        {
          q: "¿Qué hace bueno a un slug?",
          a: "Corto, en minúsculas, separado por guiones y descriptivo. Los buscadores lo leen como pista de posicionamiento y los usuarios lo ven en los resultados: 'blue-running-shoes' gana a '/p?id=8123'.",
        },
        {
          q: "¿Por qué se quitan los acentos?",
          a: "Los caracteres no ASCII se codifican en las URLs (é pasa a %C3%A9), dando enlaces largos, feos y propensos a errores. Los slugs ASCII son cortos y funcionan en todas partes.",
        },
        {
          q: "¿Debo conservar palabras como 'de' o 'the'?",
          a: "Muchas guías SEO aconsejan quitarlas para acortar el slug — edita el resultado antes de copiar; la herramienta te da la base completa con guiones.",
        },
      ],
      deepDive: [
        {
          heading: "Para qué sirve un slug",
          paragraphs: [
            "Un slug es la versión segura para URL de un título: \"10 consejos para un buen café\" se convierte en 10-consejos-para-un-buen-cafe. Los slugs importan por tres razones: hacen la URL legible para humanos antes de hacer clic, llevan palabras clave que los buscadores usan como señal de ranking, y mantienen las URL estables y compartibles — sin espacios, sin basura de codificación tipo %20.",
            "La mecánica: pasar todo a minúsculas, sustituir espacios por un separador (el guion es la convención web), eliminar caracteres ilegales o ambiguos en URL y colapsar repeticiones. Un buen generador hace todo eso de una vez en lugar de dejarte reparar a mano secuencias tipo %C3%A9 en un enlace compartido.",
            "Los slugs también sirven trabajos fuera de la URL: nombres de archivo de recursos exportados, nombres de rama en git, IDs de componentes. Las reglas son las mismas en todas partes — el conjunto de caracteres que sobrevive a copiar, codificar y terminales sin convertirse en escapes.",
          ],
        },
        {
          heading: "Acentos, transliteración y el problema CJK",
          paragraphs: [
            "El latín acentuado es el primer punto de decisión. Hay dos escuelas: transliterar (café → cafe) o quitar los acentos (café → caf). Transliterar conserva la legibilidad, y es lo que hace esta herramienta con los diacríticos latinos comunes — á pasa a a, ü pasa a u — usando las reglas estándar de plegado de Unicode.",
            "El texto CJK obliga a una elección más difícil: 一杯好咖啡 no tiene letra latina a la que plegarse. Las opciones son pinyin para el chino, romanización para el japonés, o mantener los caracteres tal cual. Los navegadores modernos manejan bien las URL UTF-8, así que mantener caracteres CJK en un slug es técnicamente válido y común en plataformas chinas; el intercambio internacional, sin embargo, favorece pinyin o romanización porque sobrevive a SMS, terminales y sistemas antiguos sin ruido de codificación.",
            "Los números y las palabras vacías son decisiones de gusto: conservar \"the\" y \"of\" hace slugs más largos y legibles; recortarlos los acorta. El consejo SEO ha virado con los años; el consenso estable es que un slug que coincide con el título importa más que un slug corto.",
          ],
        },
        {
          heading: "Generado en vivo, mantenido local",
          paragraphs: [
            "La conversión corre en cada pulsación en tu navegador. Sin llamada a API, sin límite de tasa, funciona sin conexión — a diferencia de servicios de slug que requieren un viaje por título.",
            "La salida determinista importa en sistemas de contenido: el mismo título produce siempre el mismo slug, así que los enlaces creados hoy no se rompen cuando el artículo se regenera. No hay sufijo aleatorio salvo que lo añadas tú (una cola corta aleatoria es la forma estándar de garantizar unicidad entre miles de artículos).",
            "La comprobación de unicidad no se hace aquí a propósito — requiere conocer tu inventario completo de URL, que vive en tu CMS. La herramienta garantiza la corrección de formato; evitar colisiones queda en tu capa de enrutamiento, donde le corresponde estar.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de slugs",
      tagline:
        "Transforme qualquer título em um slug de URL limpo — minúsculas, sem acentos e com hífens — pronto para links amigáveis ao SEO.",
      intro: [
        "O slug é a parte da URL que dá nome à página — por exemplo /tools/slug-generator. Um bom slug fica em minúsculas, usa hífens no lugar de espaços e mantém só letras e números: assim os links ficam legíveis nos resultados de busca, fáceis de copiar e seguros em qualquer servidor ou framework.",
        "Cole um título em qualquer idioma: os acentos são removidos (café → cafe), pontuação e espaços viram hífens únicos e o resultado é aparado para que o slug não comece nem termine com hífen.",
      ],
      steps: [
        "Digite ou cole o título da página na caixa de entrada.",
        "O slug aparece enquanto você digita — ajuste o título até ler bem.",
        "Copie o slug para o seu CMS, router ou gerador de site estático.",
      ],
      faqs: [
        {
          q: "O que faz um bom slug de URL?",
          a: "Curto, em minúsculas, separado por hífens e descritivo. Buscadores leem o slug como sinal de ranqueamento e usuários o veem nos resultados: 'blue-running-shoes' ganha de '/p?id=8123'.",
        },
        {
          q: "Por que os acentos são removidos?",
          a: "Caracteres fora do ASCII são codificados nas URLs (é vira %C3%A9), gerando links longos, feios e sujeitos a erro. Slugs ASCII são curtos e funcionam em todo lugar.",
        },
        {
          q: "Devo manter palavras como 'de' ou 'the'?",
          a: "Muitos guias de SEO sugerem removê-las para encurtar o slug — edite o resultado antes de copiar; a ferramenta entrega a base completa com hífens.",
        },
      ],
      deepDive: [
        {
          heading: "Para que serve um slug",
          paragraphs: [
            "Um slug é a versão segura para URL de um título: \"10 dicas para um ótimo café\" vira 10-dicas-para-um-otimo-cafe. Slugs importam por três razões: tornam a URL legível para humanos antes do clique, carregam palavras-chave que buscadores usam como sinal de ranqueamento, e mantêm as URL estáveis e compartilháveis — sem espaços, sem lixo de codificação tipo %20.",
            "A mecânica: passar tudo para minúsculas, trocar espaços por um separador (o hífen é a convenção da web), remover caracteres ilegais ou ambíguos em URL e colapsar repetições. Um bom gerador faz tudo isso de uma vez, em vez de deixar você consertar sequências tipo %C3%A9 num link compartilhado.",
            "Slugs também servem trabalhos fora da URL: nomes de arquivo de assets exportados, nomes de branch no git, IDs de componentes. As regras são as mesmas em toda parte — o conjunto de caracteres que sobrevive a copiar, codificar e terminais sem virar escapes.",
          ],
        },
        {
          heading: "Acentos, transliteração e o problema CJK",
          paragraphs: [
            "Latim acentuado é o primeiro ponto de decisão. Existem duas escolas: transliterar (café → cafe) ou remover os acentos (café → caf). Transliterar preserva a legibilidade e é o que esta ferramenta faz com os diacríticos latinos comuns — á vira a, ü vira u — usando as regras padrão de folding do Unicode.",
            "Texto CJK força uma escolha mais difícil: 一杯好咖啡 não tem letra latina para se dobrar. As opções são pinyin para chinês, romanização para japonês, ou manter os caracteres como estão. Navegadores modernos lidam bem com URL UTF-8, então manter caracteres CJK no slug é tecnicamente válido e comum em plataformas chinesas; o compartilhamento internacional, porém, favorece pinyin ou romanização porque sobrevive a SMS, terminais e sistemas antigos sem ruído de codificação.",
            "Números e stopwords são decisões de gosto: manter \"the\" e \"of\" faz slugs mais longos e legíveis; cortá-los encurta. O conselho de SEO oscilou ao longo dos anos; o consenso estável é que um slug que combina com o título importa mais que um slug curto.",
          ],
        },
        {
          heading: "Gerado ao vivo, mantido local",
          paragraphs: [
            "A conversão roda a cada tecla no seu navegador. Sem chamada de API, sem limite de taxa, funciona offline — diferente de serviços de slug que exigem uma ida e volta por título.",
            "A saída determinística importa em sistemas de conteúdo: o mesmo título sempre produz o mesmo slug, então links criados hoje não quebram quando o artigo é regenerado. Não há sufixo aleatório a menos que você adicione (uma cauda curta aleatória é a forma padrão de garantir unicidade entre milhares de artigos).",
            "A checagem de unicidade é deliberadamente não feita aqui — exige conhecer seu inventário completo de URL, que vive no seu CMS. A ferramenta garante a correção do formato; evitar colisões fica na sua camada de roteamento, onde pertence.",
          ],
        },
      ],
    },
  },
});
