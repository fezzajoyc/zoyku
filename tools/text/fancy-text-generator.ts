import { TextFancyEngine } from "../_engines/text-fancy";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "fancy-text-generator",
  category: "text",
  icon: "sparkle",
  engine: { component: TextFancyEngine, props: { sample: "Hello, world! 123" } },
  related: ["emoji-picker", "case-converter", "text-cleaner", "word-counter", "text-diff", "text-sorter", "remove-extra-spaces", "remove-duplicate-lines", "lorem-ipsum-generator", "sentence-counter"],
  copy: {
    en: {
      name: "Fancy Text Generator",
      tagline:
        "Turn plain text into 12 Unicode styles — bold, italic, script, double-struck, circled, fullwidth and more — and copy any one with a single click.",
      intro: [
        "Type once and get twelve Unicode variants at once: mathematical bold, italic, bold italic, script, bold script, double-struck, monospace, circled, squared and fullwidth alphabets, plus combining-character strikethrough and underline. Each style previews your actual text live, so you can compare before copying.",
        "The mapping follows the Unicode Mathematical Alphanumeric Symbols block (U+1D400 upward), including its official quirks: italic small h is unassigned in that block, so the tool substitutes the Planck-constant symbol ℎ (U+210E), and script plus double-struck letters that already exist as Letterlike Symbols (ℬ, ℂ, ℍ …) use those code points — the same characters mathematical typesetting uses.",
        "Because these are real Unicode characters — not fonts — the results paste intact into Instagram bios, TikTok captions, Discord nicknames, tweet drafts and chat apps. Characters outside the Latin alphabet and digits, such as Chinese, Japanese or emoji, are passed through untouched so nothing turns into missing-glyph boxes.",
        "Compared with a font-swap app or a screenshot, the output stays selectable, searchable text that any platform accepts as plain characters. Font coverage differs by site: if a style renders oddly somewhere, bold, circled or fullwidth have the broadest glyph support, as the FAQ below details.",
      ],
      steps: [
        "Type or paste your text — a sample is already loaded to play with.",
        "Scroll the live list: every style previews your text instantly.",
        "Hit Copy on the style you like and paste it anywhere that accepts text.",
      ],
      faqs: [
        {
          q: "Why does the text look the same on some websites?",
          a: "Fancy text uses Unicode characters, and a site's font may lack glyphs for some of them (especially script and double-struck). If a style renders oddly somewhere, try bold, circled or fullwidth — they have the broadest font coverage.",
        },
        {
          q: "Can I use it for my Instagram bio or TikTok nickname?",
          a: "Yes. The output is plain Unicode text, so it works in social bios, display names, comments and anywhere else that accepts regular characters.",
        },
        {
          q: "What happens to characters like emoji or 中文?",
          a: "They are left exactly as typed. The generator only maps Latin letters and digits, so emoji, CJK and accented letters pass through unchanged instead of turning into empty boxes.",
        },
      ],
      deepDive: [
        {
          heading: "These are not fonts — they are lookalike characters",
          paragraphs: [
            "The bold, italic and script styles this tool produces are not font changes. They map your letters to dedicated Unicode code points in the Mathematical Alphanumeric Symbols block (roughly U+1D400–U+1D7FF), added for mathematical notation so that a bold A in a formula could be distinguished from a plain one. Your text stays the same size and the font never changes — you are switching to different characters that merely resemble styled letters.",
            "That mapping explains both the magic and the limits. It works in any text field — Instagram bios, chat nicknames, YouTube titles — because no font installation is involved. But the alphabet is incomplete: there are no bold digits paired to every style, no dotless ı in the italic set (it maps to a Turkish-hostile dotted i), and missing glyphs fall back to plain letters, producing the half-fancy strings people complain about.",
            "Mathematicians use these code points for real semantics — 𝔸 might mean \"the set of A\" in a paper. Using them decoratively hijacks notation that screen readers and search tools read literally, which leads to the next point.",
          ],
        },
        {
          heading: "Where fancy text breaks",
          paragraphs: [
            "Decorative Unicode fails in predictable places. Screen readers announce 𝕭𝖔𝖑𝖉 as a series of mathematical bold characters, which sounds like gibberish rather than \"bold\" — an accessibility problem for every follower relying on assistive technology. Search engines match against ordinary letters, so a profile or headline written in fancy characters can become unsearchable by its own name.",
            "Copy-paste into systems that sanitize input can silently strip the characters back to plain letters or reject them. Databases with old encodings, SMS (no GSM letters for these code points), and older terminals all mangle them. And because each glyph comes from a math font, rendering quality varies: on some devices the letters look fine, on others the stroke weight clashes with surrounding text.",
            "Use fancy text where the reader sees it and nobody needs to search, read aloud or process it: display names, aesthetic captions, event posters. Keep usernames that people will search for, and all important body copy, in ordinary letters.",
          ],
        },
        {
          heading: "Instant, offline, and reversible",
          paragraphs: [
            "The conversion is a per-character table lookup running in your browser — no server, no network call, and it works with no connection at all. Type, compare styles side by side, copy the one you want.",
            "Because the output is ordinary Unicode text, it survives any editor, and it can be reversed: paste the fancy string back in and the tool's plain output (or any normalizer) recovers the base letters. Nothing is stored anywhere in the meantime.",
            "Compared with \"font generator\" apps that ask you to install a profile or download a font, this approach has nothing to install and nothing to trust — what you see in the preview is exactly what lands on the other side of the clipboard.",
          ],
        },
      ],
    },
    zh: {
      name: "花体字生成器",
      tagline: "把普通文字转成粗体、斜体、手写体、空心体、圆圈字、全角等 12 种 Unicode 风格,一键复制任一效果。",
      intro: [
        "输入一次,同时得到 12 种 Unicode 变体:数学粗体、斜体、粗斜体、手写体、粗手写体、空心体、等宽、圆圈字母、方框字母、全角,以及用组合附加符实现的删除线和下划线。",
        "这些是真正的 Unicode 字符而不是字体,粘贴到 Instagram 简介、TikTok 文案、Discord 昵称、评论区都能原样显示。中文、emoji 等拉丁字母表之外的字符会原样保留,不会变成豆腐块。",
      ],
      steps: [
        "输入或粘贴文字,页面已预载示例可直接体验。",
        "在实时列表中滚动查看:每种风格即时预览你的文字。",
        "点击喜欢风格旁的复制按钮,粘贴到任何接受文本的地方。",
      ],
      faqs: [
        {
          q: "为什么有些网站上显示不出某些风格?",
          a: "花体字使用 Unicode 字符,部分网站的字体缺少相应字形(手写体和空心体最常见)。某个风格显示异常时,可以换粗体、圆圈或全角——它们的字体覆盖最广。",
        },
        {
          q: "能用在 Instagram 简介或 TikTok 昵称里吗?",
          a: "可以。输出就是普通 Unicode 文本,可用于社交简介、昵称、评论等任何接受常规字符的地方。",
        },
        {
          q: "emoji 和中文字符会怎样处理?",
          a: "原样保留。生成器只映射拉丁字母和数字,emoji、中日韩文字和重音字符不会参与转换,也不会出现空框。",
        },
      ],
      deepDive: [
        {
          heading: "这些不是字体,而是“长得像”的字符",
          paragraphs: [
            "本工具生成的粗体、斜体、花体并不是换了字体,而是把字母映射到 Unicode 数学字母数字符号区(U+1D400–U+1D7FF 一带)的专用码位。这个区块本是为数学记号设计的,让公式里的粗体 A 能与普通 A 区分。文本字号不变、字体也没变——你只是换成了另一批“长得像艺术字”的字符。",
            "这个映射既带来魔法也带来局限:任何文本框都能用——Instagram 简介、聊天昵称、YouTube 标题——因为完全不需要装字体。但字母表并不完整:并非每种风格都有配套粗体数字,斜体集里没有无点的 ı(会被映射成对土耳其语不友好的点 i),缺失的字形会退回普通字母,产生人们常抱怨的“半花半正常”字符串。",
            "数学上这些码位承载真实语义——论文里 𝔸 可能表示“A 的集合”。拿它们做装饰,等于劫持了屏幕阅读器和搜索工具按字面读取的记号,这就引出下一节。",
          ],
        },
        {
          heading: "花体文本会在哪里翻车",
          paragraphs: [
            "装饰性 Unicode 的翻车点可以预判。屏幕阅读器会把 𝕭𝖔𝖑𝖉 读成一串“数学粗体字母”,听起来像乱码而不是“bold”——对依赖辅助技术的受众是实打实的无障碍问题。搜索引擎按普通字母建索引,用花体字符写的昵称或标题,可能连自己都搜不到。",
            "贴进会清洗输入的系统,字符可能被悄悄还原成普通字母或直接被拒。老编码的数据库、短信(这些码位在 GSM 字母表里不存在)、老旧终端都会把它们弄坏。而且每个字形来自数学字体,渲染质量参差:有的设备上观感尚可,有的设备笔画粗细和周围文本打架。",
            "原则:用在“读者只用眼睛看、不需要搜索朗读或程序处理”的地方——展示名、氛围感文案、活动海报。会被搜索的用户名和所有正文,老老实实用普通字母。",
          ],
        },
        {
          heading: "即时、离线、可还原",
          paragraphs: [
            "转换是浏览器里的逐字符查表,没有服务器、没有网络请求,断网也能用。输入、并排对比各风格、复制要的那一款。",
            "输出是普通 Unicode 文本,在任何编辑器里都活得下来,而且可以还原:把花体字符串贴回来,工具的普通输出(或任何规范化器)能找回基础字母。期间不保存任何内容。",
            "和那些要你装描述文件或下载字体的“字体生成器”相比,这条路没有任何要安装、要信任的东西——预览里看到的,就是剪贴板另一端落下的。",
          ],
        },
      ],
    },
    ja: {
      name: "装飾文字ジェネレーター",
      tagline: "太字・斜体・筆記体・白抜き・円囲み・全角など 12 種類の Unicode スタイルに変換し、ワンクリックでコピーできます。",
      intro: [
        "一度入力すれば 12 種類の Unicode 変体を同時に取得:数学的な太字・斜体・太字斜体・筆記体・太字筆記体・白抜き・等幅・円囲み・四角囲み・全角に加え、結合文字による打ち消し線と下線。",
        "フォントではなく本物の Unicode 文字なので、Instagram のプロフィール、TikTok のキャプション、Discord のニックネーム、コメント欄にそのまま貼り付けできます。日本語や絵文字などラテン文字以外はそのまま残り、豆腐(□)にはなりません。",
      ],
      steps: [
        "テキストを入力または貼り付けます。サンプルが既に入力済みです。",
        "ライブリストをスクロールすると、各スタイルが即座にプレビューされます。",
        "好きなスタイルのコピーを押せば、テキストを扱える場所どこでも貼り付けできます。",
      ],
      faqs: [
        {
          q: "一部のサイトで特定スタイルが正しく表示されないのは?",
          a: "装飾文字は Unicode 文字のため、サイト側フォントに該当字形がない場合があります(筆記体と白抜きが多い)。太字・円囲み・全角はフォント対応が広いので代替におすすめです。",
        },
        {
          q: "Instagram の Bio や TikTok の名前に使えますか?",
          a: "使えます。出力は通常の Unicode テキストなので、自己紹介・表示名・コメントなど通常の文字を入力できる場所であれば動作します。",
        },
        {
          q: "絵文字や日本語はどうなりますか?",
          a: "そのまま保持されます。このツールはラテン文字と数字のみをマッピングするため、絵文字・日本語・アクセント付き文字は変換されず、空欄にもなりません。",
        },
      ],
      deepDive: [
        {
          heading: "フォントではなく「似た字形」の文字",
          paragraphs: [
            "このツールが作る太字・斜体・筆記体はフォント変更ではありません。字母を Unicode の数学英数字記号ブロック(およそ U+1D400–U+1D7FF)の専用コードポイントへ写しているだけです。このブロックは元々、数式内の太字 A を通常の A と区別するために作られました。文字サイズもフォントも変わらず、「芸術的な字形に似た別の文字」へ差し替えているにすぎません。",
            "この写像が魔法と限界の両方を説明します。フォントのインストール不要なので、Instagram の自己紹介やチャットのニックネーム、YouTube のタイトルなど、テキスト欄ならどこでも使えます。ただし字表は不完全で、スタイルごとの太字数字が揃っていなかったり、斜体に点のない ı がなく(トルコ語で問題になる点付き i に写る)、欠けたグリフは通常の字母へフォールバックして「半分だけ装飾された」文字列になります。",
            "数学ではこれらのコードポイントは本物の意味を担います。装飾に転用すると、スクリーンリーダーや検索ツールが字義通りに読む記号を乗っ取ることになり、次の節の問題につながります。",
          ],
        },
        {
          heading: "装飾文字が壊れる場所",
          paragraphs: [
            "装飾 Unicode が失敗する場所は予測できます。スクリーンリーダーは 𝕭𝖔𝖑𝖉 を「数学太字の一連の文字」として読み上げ、「太字」ではなく意味不明な音の連なりになります。検索エンジンは通常の字母で索引を作るため、装飾文字で書いた名前や見出しは、その名前で検索できなくなることがあります。",
            "入力をサニタイズするシステムに貼ると、文字が静かに通常の字母へ戻されたり拒否されたりします。古いエンコーディングのデータベース、SMS(これらのコードポイントは GSM 文字表にない)、古い端末も同様に壊します。グリフが数学フォント由来のため、デバイスによっては線の太さが周囲のテキストと喧嘩します。",
            "原則は、読み手が目で見るだけで検索・読み上げ・処理が不要な場所に使うことです。表示名や雰囲気重視のキャプションには向きますが、検索されるユーザー名と本文は通常の字母にしておくべきです。",
          ],
        },
        {
          heading: "即時・オフライン・復元可能",
          paragraphs: [
            "変換はブラウザ内の 1 文字ずつの対応表引きで、サーバーもネットワーク要求もなく、完全にオフラインで動きます。入力し、スタイルを並べて比較し、必要なものをコピーするだけです。",
            "出力は普通の Unicode テキストなのでどのエディタでも生き残り、復元もできます。装飾文字列を貼り戻せば、ツールの通常出力(または任意の正規化)で元の字母が取り出せます。途中で何も保存されません。",
            "プロファイルのインストールやフォントのダウンロードを求める「フォントジェネレーター」と違い、導入も信頼も不要です。プレビューで見たものが、クリップボードの向こう側にそのまま届きます。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de texto con estilo",
      tagline:
        "Convierte tu texto en 12 estilos Unicode — negrita, cursiva, manuscrita, doble trazo, círculos, ancho completo — y copia cada uno con un clic.",
      intro: [
        "Escribe una vez y obtén doce variantes Unicode a la vez: negrita matemática, cursiva, negrita cursiva, manuscrita, manuscrita negrita, doble trazo, monoespaciada, letras en círculos, en cuadros y ancho completo, además de tachado y subrayado con caracteres combinantes.",
        "Son caracteres Unicode reales, no fuentes: se pegan intactos en biografías de Instagram, descripciones de TikTok, apodos de Discord y apps de chat. Los caracteres fuera del alfabeto latino — chino, japonés, emojis — pasan sin cambios para que no aparezcan huecos.",
      ],
      steps: [
        "Escribe o pega tu texto; hay un ejemplo ya cargado para probar.",
        "Desplázate por la lista en vivo: cada estilo previsualiza tu texto al instante.",
        "Pulsa Copiar en el estilo que quieras y pégalo donde acepte texto.",
      ],
      faqs: [
        {
          q: "¿Por qué algunos estilos no se ven bien en ciertos sitios web?",
          a: "El texto con estilo usa caracteres Unicode y la fuente del sitio puede carecer de glifos (sobre todo manuscrita y doble trazo). Prueba negrita, círculos o ancho completo: tienen la mejor cobertura tipográfica.",
        },
        {
          q: "¿Sirve para la bio de Instagram o el apodo de TikTok?",
          a: "Sí. La salida es texto Unicode normal, así que funciona en bios, nombres visibles, comentarios y cualquier campo que acepte caracteres habituales.",
        },
        {
          q: "¿Qué pasa con los emojis o el chino?",
          a: "Se dejan tal cual. El generador solo mapea letras latinas y dígitos; los emojis, el CJK y los acentos pasan intactos en lugar de convertirse en cuadros vacíos.",
        },
      ],
      deepDive: [
        {
          heading: "No son fuentes — son caracteres que se disfrazan",
          paragraphs: [
            "Los estilos negrita, cursiva y script de esta herramienta no cambian la fuente. Mapean tus letras a puntos de código dedicados del bloque de símbolos matemáticos alfanuméricos de Unicode (aproximadamente U+1D400–U+1D7FF), creado para la notación matemática, de modo que una A en negrita dentro de una fórmula se distinga de una A normal. Tu texto mantiene el tamaño y la fuente nunca cambia: cambias a caracteres distintos que solo se parecen a letras estilizadas.",
            "Ese mapeo explica la magia y los límites. Funciona en cualquier campo de texto — bios de Instagram, apodos de chat, títulos de YouTube — porque no hay nada que instalar. Pero el alfabeto está incompleto: no todos los estilos tienen dígitos en negrita, la cursiva no tiene la ı sin punto (se mapea a una i con punto hostil al turco) y los glifos ausentes caen a letras normales, produciendo las cadenas \"medio adornadas\" que la gente se queja de ver.",
            "En matemáticas estos puntos de código llevan semántica real — 𝔸 puede significar \"el conjunto A\" en un artículo. Usarlos decorativamente secuestra notación que los lectores de pantalla y los buscadores leen literalmente, lo que lleva al punto siguiente.",
          ],
        },
        {
          heading: "Dónde se rompe el texto adornado",
          paragraphs: [
            "El Unicode decorativo falla en sitios predecibles. Los lectores de pantalla anuncian 𝕭𝖔𝖑𝖉 como una serie de caracteres matemáticos en negrita, que suena a galimatías en lugar de \"negrita\" — un problema de accesibilidad para todos los seguidores que dependen de tecnología asistiva. Los buscadores indexan letras normales, así que un perfil o titular en caracteres adornados puede volverse inencontrable por su propio nombre.",
            "Pegarlo en sistemas que sanean la entrada puede eliminar los caracteres en silencio o rechazarlos. Bases de datos con codificaciones viejas, los SMS (estas letras no existen en GSM) y los terminales antiguos los estropean. Y como cada glifo viene de una fuente matemática, la calidad de renderizado varía: en algunos dispositivos el trazo choca con el texto alrededor.",
            "Úsalo donde el lector solo mira y nadie necesita buscar, leer en voz alta ni procesarlo: nombres visibles, captions estéticas, carteles. Los nombres de usuario que la gente buscará y todo el texto importante van en letras ordinarias.",
          ],
        },
        {
          heading: "Instantáneo, sin conexión y reversible",
          paragraphs: [
            "La conversión es una búsqueda por tabla, carácter a carácter, en tu navegador: sin servidor, sin red, y funciona incluso sin conexión. Escribe, compara estilos lado a lado y copia el que quieras.",
            "Como la salida es texto Unicode ordinario, sobrevive en cualquier editor y se puede revertir: pega la cadena adornada de vuelta y la salida normal de la herramienta (o cualquier normalizador) recupera las letras base. Mientras tanto no se guarda nada.",
            "Frente a apps de \"generador de fuentes\" que piden instalar un perfil o descargar una fuente, aquí no hay nada que instalar ni que creer: lo que ves en la vista previa es exactamente lo que llega al otro lado del portapapeles.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de texto estilizado",
      tagline:
        "Transforme seu texto em 12 estilos Unicode — negrito, itálico, manuscrito, duplo traço, circulado, largura total — e copie cada um com um clique.",
      intro: [
        "Digite uma vez e receba doze variantes Unicode de uma vez: negrito matemático, itálico, negrito itálico, manuscrito, manuscrito negrito, duplo traço, monoespaçado, letras circuladas, quadradas e de largura total, além de tachado e sublinhado com caracteres combinantes.",
        "São caracteres Unicode de verdade, não fontes: colam intactos na bio do Instagram, legendas do TikTok, apelidos do Discord e apps de chat. Caracteres fora do alfabeto latino — chinês, japonês, emojis — passam inalterados para não virar quadradinhos.",
      ],
      steps: [
        "Digite ou cole seu texto — um exemplo já vem carregado para testar.",
        "Role a lista ao vivo: cada estilo mostra seu texto na hora.",
        "Clique em Copiar no estilo preferido e cole onde aceitar texto.",
      ],
      faqs: [
        {
          q: "Por que alguns estilos aparecem errados em certos sites?",
          a: "O texto estilizado usa caracteres Unicode e a fonte do site pode não ter os glifos (principalmente manuscrito e duplo traço). Prefira negrito, circulado ou largura total, que têm a melhor cobertura de fontes.",
        },
        {
          q: "Posso usar na bio do Instagram ou no apelido do TikTok?",
          a: "Sim. A saída é texto Unicode comum, então funciona em bios, nomes de exibição, comentários e qualquer campo que aceite caracteres normais.",
        },
        {
          q: "E os emojis ou caracteres em chinês?",
          a: "Ficam como estão. O gerador mapeia apenas letras latinas e dígitos; emojis, CJK e acentos passam intactos em vez de virar caixas vazias.",
        },
      ],
      deepDive: [
        {
          heading: "Não são fontes — são caracteres que se fantasiam",
          paragraphs: [
            "Os estilos negrito, itálico e manuscrito desta ferramenta não mudam a fonte. Eles mapeiam suas letras para pontos de código dedicados do bloco de símbolos matemáticos alfanuméricos do Unicode (aproximadamente U+1D400–U+1D7FF), criado para notação matemática, de modo que um A em negrito numa fórmula se distinga de um A normal. Seu texto mantém o tamanho e a fonte nunca muda — você troca para caracteres diferentes que apenas se parecem com letras estilizadas.",
            "Esse mapeamento explica a mágica e os limites. Funciona em qualquer campo de texto — bios do Instagram, apelidos de chat, títulos do YouTube — porque nada precisa ser instalado. Mas o alfabeto é incompleto: nem todo estilo tem dígitos em negrito, o itálico não tem o ı sem ponto (mapeia para um i com ponto hostil ao turco) e glifos ausentes caem em letras normais, produzindo as strings \"meio enfeitadas\" que as pessoas reclamam de ver.",
            "Na matemática esses pontos de código carregam semântica real — 𝔸 pode significar \"o conjunto A\" num artigo. Usá-los decorativamente sequestra notação que leitores de tela e buscadores leem literalmente, o que leva ao ponto seguinte.",
          ],
        },
        {
          heading: "Onde o texto enfeitado quebra",
          paragraphs: [
            "O Unicode decorativo falha em lugares previsíveis. Leitores de tela anunciam 𝕭𝖔𝖑𝖉 como uma série de caracteres matemáticos em negrito, o que soa como algo sem sentido em vez de \"negrito\" — um problema de acessibilidade para seguidores que dependem de tecnologia assistiva. Buscadores indexam letras normais, então um perfil ou título em caracteres enfeitados pode ficar não pesquisável pelo próprio nome.",
            "Colar em sistemas que higienizam a entrada pode remover os caracteres silenciosamente ou rejeitá-los. Bancos de dados com codificações antigas, SMS (essas letras não existem no GSM) e terminais antigos os estragam. E como cada glifo vem de uma fonte matemática, a qualidade de renderização varia: em alguns dispositivos o traço briga com o texto ao redor.",
            "Use onde o leitor só olha e ninguém precisa buscar, ler em voz alta ou processar: nomes de exibição, legendas estéticas, cartazes. Nomes de usuário que serão buscados e todo texto importante ficam em letras ordinárias.",
          ],
        },
        {
          heading: "Instantâneo, offline e reversível",
          paragraphs: [
            "A conversão é uma busca em tabela, caractere por caractere, no seu navegador: sem servidor, sem rede, e funciona até sem conexão. Digite, compare os estilos lado a lado e copie o que quiser.",
            "Como a saída é texto Unicode comum, sobrevive em qualquer editor e é reversível: cole a string enfeitada de volta e a saída normal da ferramenta (ou qualquer normalizador) recupera as letras base. Nada é armazenado nesse meio-tempo.",
            "Comparado a apps de \"gerador de fontes\" que pedem instalar um perfil ou baixar uma fonte, aqui não há nada para instalar nem para confiar: o que você vê na prévia é exatamente o que chega do outro lado da área de transferência.",
          ],
        },
      ],
    },
  },
});
