import { EmojiPickerEngine } from "../_engines/text-emoji";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "emoji-picker",
  category: "text",
  icon: "sparkle",
  engine: { component: EmojiPickerEngine },
  related: ["fancy-text-generator", "case-converter", "lorem-ipsum-generator", "character-counter", "text-diff", "text-sorter", "remove-extra-spaces", "remove-duplicate-lines", "word-counter", "sentence-counter"],
  copy: {
    en: {
      name: "Emoji Picker",
      tagline:
        "Browse 670+ common emoji in 8 curated groups, search by English name, click to copy instantly, and reuse your 16 most recent picks — all in your browser.",
      intro: [
        "A hand-curated emoji board with 677 entries grouped the way you think: Smileys, People, Animals, Food, Activities, Travel, Objects and Symbols. Search matches the official English name — typing “star” finds ⭐, 🌟 and ✨ in one go.",
        "One click copies the character to your clipboard, with a visible confirmation so you never wonder whether it worked. Your 16 most recent picks are kept on this device via localStorage, so tomorrow's favorite is one tap away. No images are loaded — the grid renders native emoji glyphs instantly.",
      
        "The 677 entries are a curated subset of the Unicode emoji set — the grid renders your system's native emoji font rather than images, so the characters you see are the characters you copy, with no asset download. Search indexes the official Unicode names plus common aliases, so 'fire' finds 🔥 and 'check' finds ✔️.",
        "Compared with OS-level emoji pickers (which hide behind shortcut keys and differ per platform), this is the same board in every browser, searchable by name and grouped by intent. The 16-slot recents row learns what you actually use, and because everything is a string, picked emoji paste into terminals, editors and commit messages without formatting surprises.",
      ],
      steps: [
        "Type a name in the search box or pick a group tab.",
        "Click any emoji — it is copied to your clipboard immediately.",
        "Find your recent picks in the top row, persisted on this device.",
      ],
      faqs: [
        {
          q: "Where do the emoji come from?",
          a: "They are native glyphs rendered by your operating system's emoji font. Nothing is downloaded, so the page stays fast and works offline once loaded.",
        },
        {
          q: "Why do some emoji look different from what I see on my phone?",
          a: "Each platform draws emoji in its own style. The grid shows how the current device renders them; the copied character will look the same way in the receiving app.",
        },
        {
          q: "How does “Recently used” work?",
          a: "Every emoji you copy is remembered in your browser's localStorage (up to 16). Clearing your browser data resets the list.",
        },
      ],
      deepDive: [
        {
          heading: "How emoji actually work under the hood",
          paragraphs: [
            "Emoji are not images — they are Unicode code points rendered by whatever font the platform supplies. The same U+1F600 code point renders as a slightly different smiley on iOS, Android and Windows, which is why an emoji that looks perfect on your phone can look odd in a colleague's screenshot.",
            "Modifiers extend the set: skin-tone modifiers are combining code points that change the base character that precedes them, ZWJ (zero-width joiner) sequences glue multiple emoji into one — family and profession combos — and variation selectors decide between text-style and color-style rendering. A seemingly simple emoji can be a chain of five code points.",
            "This is why searching and copying is safer than composing by hand: the picker supplies the full, correct sequence, while hand-assembled chains are a common source of broken emoji that render as two separate faces or an empty box.",
          ],
        },
        {
          heading: "Choosing and using emoji deliberately",
          paragraphs: [
            "Emoji work best as punctuation for tone, not as replacements for words: a well-placed thumbs-up closes a message warmly, while a paragraph stuffed with symbols reads as noise. Professional contexts reward restraint — one or two per message keeps the signal.",
            "Watch cross-platform meaning drift: some emoji carry secondary meanings that vary by community and region, and a handful are widely read as something other than their face value. When in doubt in formal or international contexts, pick the unambiguous literal option.",
            "Copy-paste is the core interaction because emoji sequences are fragile to edit: deleting one code point in the middle of a ZWJ chain breaks the whole glyph. Editing around emoji is easiest by retyping the surrounding text and pasting the emoji fresh.",
          ],
        },
        {
          heading: "Local processing and Unicode coverage",
          paragraphs: [
            "The picker runs entirely in your browser: search, categorization and copying happen locally against the Unicode name data built in. Nothing you search for or copy is transmitted, which matters when composing private messages or sensitive work documents.",
            "Search works on names and keywords, so results are as good as the naming: \"smile\", \"fire\", \"star\" find their obvious matches, while less-named emoji need browsing by category. Browsing groups — smileys, animals, food, objects, symbols — mirrors how the Unicode standard organizes the set.",
            "Because emoji are text, everything you copy is pasted as text: it works in any field that accepts Unicode, from emails to code comments. If a destination shows a hollow box, that device or font simply lacks a newer emoji — the code point is correct even when the display is not.",
          ],
        },
      ],
    },
    zh: {
      name: "Emoji 选择器",
      tagline: "按表情、人物、动物、食物等 8 组浏览 670+ 常用 emoji,按英文名搜索,点击即复制,最近使用保存在本地。",
      intro: [
        "一份手工挑选的 emoji 面板:表情与情感、人物、动物与自然、食物、活动、旅行、物品、符号 8 组共 677 个。搜索匹配官方英文名——输入 star 即可同时找到 ⭐、🌟 和 ✨。",
        "点击任意 emoji 立即复制到剪贴板,并给出可见的确认提示。最近使用的 16 个保存在浏览器 localStorage 里,下次一键取用。整个面板用原生字形渲染,不加载任何图片,打开即用。",
      ],
      steps: [
        "在搜索框输入名称,或点击分组标签。",
        "点击任意 emoji,立刻复制到剪贴板。",
        "最近使用的一行保存在本设备,常用表情一步直达。",
      ],
      faqs: [
        {
          q: "这些 emoji 从哪里来?",
          a: "它们是操作系统 emoji 字体渲染的原生字形,不下载任何资源,页面加载后可离线使用。",
        },
        {
          q: "为什么有的 emoji 和手机上长得不一样?",
          a: "每个平台都有自己的 emoji 画法。网格显示当前设备的渲染效果,复制出去的字符在对方设备上也会按对方的样式显示。",
        },
        {
          q: "「最近使用」是怎么记录的?",
          a: "每次复制都会写入浏览器 localStorage(最多 16 个);清除浏览器数据后会重置。",
        },
      ],
      deepDive: [
        {
          heading: "emoji 底层到底是怎么运作的",
          paragraphs: [
            "emoji 不是图片——它们是 Unicode 码点,由当前平台提供的字体渲染。同一个 U+1F600 码点,在 iOS、Android 和 Windows 上画出来各有细微差异,这就是为什么你手机上完美的一枚 emoji,在同事的截图里可能很奇怪。",
            "修饰符扩展了集合:肤色修饰符是附加在前面基础字符上的组合码点;ZWJ(零宽连接符)序列把多个 emoji 粘成一个——家庭和职业组合就是这么来的;变体选择符决定按文本样式还是彩色样式渲染。一个看似简单的 emoji 可能是五个码点的链条。",
            "所以搜索和复制比手工拼装安全:选择器提供完整正确的序列,而手工拼的链条是“emoji 变成两张分开的脸或一个空心方框”的常见来源。",
          ],
        },
        {
          heading: "有意识地选择和使用 emoji",
          paragraphs: [
            "emoji 最好当语气的标点,而不是词语的替身:一个位置合适的点赞手势能让消息收得温暖,而一段塞满符号的文字读起来像噪音。职场语境奖励克制——每条消息一两个刚刚好。",
            "注意跨平台的含义漂移:有些 emoji 带有因社群和地区而异的衍生含义,少数的通行解读和字面值并不一致。在正式或跨文化语境里拿不准时,选含义最直白的那一个。",
            "复制粘贴是核心交互,因为 emoji 序列经不起编辑:删掉 ZWJ 链中间的一个码点,整个字形就碎了。围绕 emoji 编辑文字,最省事的做法是重打周围文本、再重新粘贴 emoji。",
          ],
        },
        {
          heading: "本地处理与 Unicode 覆盖",
          paragraphs: [
            "选择器完全在浏览器内运行:搜索、分类和复制都基于内置的 Unicode 名称数据在本地完成。你搜了什么、复制了什么都不会外传,写私人消息或敏感工作文档时这点很重要。",
            "搜索基于名称和关键词,所以结果的上限取决于命名:“smile”“fire”“star”能找到明显的目标,名字不直观的 emoji 则需要按分类浏览。按表情、动物、食物、物品、符号分组浏览,正对应 Unicode 标准组织这套集合的方式。",
            "因为 emoji 本质是文本,复制出来的就按文本粘贴:它能在任何接受 Unicode 的输入框里工作,从邮件到代码注释。如果某个目的地显示空心方框,那是那台设备或字体缺少更新的 emoji——码点本身是对的,显示不出来而已。",
          ],
        },
      ],
    },
    ja: {
      name: "絵文字ピッカー",
      tagline: "顔・動物・食べ物など 8 グループ 670+ の絵文字を英字名で検索、クリックで即コピー、最近使ったものは自動で記憶。",
      intro: [
        "手作業で厳選した絵文字パネル:スマイリー、人物、動物・自然、食べ物、アクティビティ、旅行、物、記号の 8 グループ 677 種。検索は公式の英語名に一致し、star と打てば ⭐・🌟・✨ を一度に見つけられます。",
        "クリックひとつでクリップボードにコピーし、確認表示が出るので失敗がありません。最近使った 16 個は localStorage に保存され、次回はワンタップ。画像を一切読み込まずネイティブの字形で描画するため、表示が速くオフラインでも動きます。",
      ],
      steps: [
        "検索ボックスに名前を入力するか、グループタブを選びます。",
        "絵文字をクリックするとすぐクリップボードにコピーされます。",
        "最近使用の行は端末に保存され、よく使う絵文字にすぐ戻れます。",
      ],
      faqs: [
        {
          q: "絵文字はどこから来ていますか?",
          a: "OS の絵文字フォントが描くネイティブな字形です。画像のダウンロードはなく、読み込み後はオフラインでも動作します。",
        },
        {
          q: "スマホと見た目が違う絵文字があるのは?",
          a: "プラットフォームごとに独自のデザインで描画されるためです。グリッドは現在の端末の見た目を示し、コピーした文字は受け手の端末でもそちらのスタイルで表示されます。",
        },
        {
          q: "「最近使用」はどこに保存されますか?",
          a: "ブラウザの localStorage に保存されます(最大 16 個)。ブラウザのデータを消すとリセットされます。",
        },
      ],
      deepDive: [
        {
          heading: "絵文字は実際どう動いているのか",
          paragraphs: [
            "絵文字は画像ではありません——プラットフォームが供給するフォントによって描画される Unicode のコードポイントです。同じ U+1F600 のコードポイントでも、iOS・Android・Windows では微妙に異なる顔に描画されます。だから自分のスマホでは完璧な絵文字が、同僚のスクショでは奇妙に見えることがあります。",
            "修飾子が集合を拡張します:肌色修飾子は先行する基底文字に付く結合コードポイント、ZWJ(ゼロ幅接合子)列は複数の絵文字を 1 つに結合します——家族や職業の組み合わせはこれです。異体字セレクタはテキスト样式かカラー样式かを決めます。一見単純な絵文字が 5 コードポイントの連鎖のことも。",
            "だから検索とコピーが手作業より安全です:ピッカーは完全で正しい列を供給し、手作業で組んだ列は「絵文字が 2 つの顔に分かれる・空の四角になる」よくある原因です。",
          ],
        },
        {
          heading: "絵文字を意図的に選び、使う",
          paragraphs: [
            "絵文字は語の代替ではなく、トーンの句読点として最も働きます:位置のいいサumbs アップはメッセージを温かく締め、記号を詰め込んだ段落はノイズに読めます。ビジネスの文脈は抑制を報います——1 通に 1〜2 個がちょうどいい。",
            "プラットフォーム間の意味のドリフトに注意:一部の絵文字にはコミュニティや地域で異なる二次的な意味があり、ごく一部は字面通り以外に広く読まれています。フォーマル・国際的な文脈で迷ったら、最も曖昧さのない文字通りの選択肢を。",
            "コピー&ペーストが中心的な操作なのは、絵文字の列が編集に脆いためです:ZWJ 列の途中のコードポイントを 1 つ削ると字形全体が壊れます。絵文字を含む編集は、周囲のテキストを打ち直して絵文字を新たに貼るのが最も簡単です。",
          ],
        },
        {
          heading: "ローカル処理と Unicode カバレッジ",
          paragraphs: [
            "ピッカーは完全にブラウザ内で動きます:検索、分類、コピーはすべて組み込みの Unicode 名前データに対してローカルで行われます。何を検索し、何をコピーしたかは送信されないため、個人的なメッセージやセンシティブな仕事の文書の作成に向きます。",
            "検索は名前とキーワードに対して働くため、結果の質は命名次第です:「smile」「fire」「star」は明快にヒットし、名前が直感的でない絵文字はカテゴリでの閲覧が必要です。スマイリー、動物、食べ物、物、記号というグループ分けは、Unicode 標準の整理方法をそのまま映します。",
            "絵文字はテキストなので、コピーしたものはテキストとして貼り付けられます:メールからコードコメントまで、Unicode を受け付けるあらゆるフィールドで機能します。行き先で中空の四角が表示されるなら、その端末やフォントに新しい絵文字が無いだけ——表示できなくてもコードポイントは正しいです。",
          ],
        },
      ],
    },
    es: {
      name: "Selector de emojis",
      tagline:
        "Explora más de 670 emojis en 8 grupos curados, búscalos por nombre en inglés, cópialos con un clic y reutiliza tus usos recientes.",
      intro: [
        "Un tablero de emojis curado a mano con 677 entradas en ocho grupos: caras, personas, animales, comida, actividades, viajes, objetos y símbolos. La búsqueda coincide con el nombre oficial en inglés: escribir «star» encuentra ⭐, 🌟 y ✨ de una vez.",
        "Un clic copia el carácter al portapapeles con confirmación visible, para que nunca dudes de si funcionó. Tus 16 emojis más recientes se guardan en este dispositivo mediante localStorage. No se carga ninguna imagen: la cuadrícula dibuja glifos nativos al instante.",
      ],
      steps: [
        "Escribe un nombre en el buscador o elige una pestaña de grupo.",
        "Haz clic en cualquier emoji: se copia al portapapeles al instante.",
        "Recupera tus usos recientes en la fila superior, guardados en este dispositivo.",
      ],
      faqs: [
        {
          q: "¿De dónde salen los emojis?",
          a: "Son glifos nativos que dibuja la fuente de emojis de tu sistema. No se descarga nada, así que la página es rápida y funciona sin conexión.",
        },
        {
          q: "¿Por qué algunos emojis se ven distintos que en mi móvil?",
          a: "Cada plataforma dibuja los emojis a su manera. La cuadrícula muestra cómo los pinta este dispositivo; el carácter copiado se verá igual en la app receptora.",
        },
        {
          q: "¿Cómo funciona «Usados recientemente»?",
          a: "Cada emoji copiado se guarda en el localStorage del navegador (hasta 16). Al borrar los datos del navegador, la lista se reinicia.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo funcionan los emoji realmente por dentro",
          paragraphs: [
            "Los emoji no son imágenes — son puntos de código Unicode que renderiza la fuente que cada plataforma suministra. El mismo punto U+1F600 se dibuja con ligeras diferencias en iOS, Android y Windows, por eso un emoji que se ve perfecto en tu móvil puede verse raro en la captura de un colega.",
            "Los modificadores amplían el conjunto: los modificadores de tono de piel son puntos de código combinantes que cambian el carácter base que los precede, las secuencias ZWJ (joiner de ancho cero) pegan varios emoji en uno — las combinaciones de familia y profesión — y los selectores de variante deciden entre estilo texto y estilo color. Un emoji aparentemente simple puede ser una cadena de cinco puntos de código.",
            "Por eso buscar y copiar es más seguro que componer a mano: el selector entrega la secuencia completa y correcta, mientras que las cadenas armadas a mano son la fuente habitual de emoji rotos que se muestran como dos caras separadas o un recuadro vacío.",
          ],
        },
        {
          heading: "Elegir y usar emoji con intención",
          paragraphs: [
            "Los emoji funcionan mejor como puntuación de tono, no como sustitutos de palabras: un pulgar bien puesto cierra un mensaje con calidez, mientras que un párrafo repleto de símbolos se lee como ruido. Los contextos profesionales premian la mesura — uno o dos por mensaje mantienen la señal.",
            "Ojo con la deriva de significados entre plataformas: algunos emoji llevan significados secundarios que varían por comunidad y región, y unos pocos se leen ampliamente como algo distinto de su valor literal. Ante la duda en contextos formales o internacionales, elige la opción literal inequívoca.",
            "Copiar y pegar es la interacción central porque las secuencias de emoji son frágiles al editar: borrar un punto de código en medio de una cadena ZWJ rompe todo el glifo. Lo más fácil es reescribir el texto circundante y pegar el emoji de nuevo.",
          ],
        },
        {
          heading: "Procesado local y cobertura Unicode",
          paragraphs: [
            "El selector funciona íntegramente en tu navegador: la búsqueda, la categorización y el copiado ocurren localmente contra los datos de nombres Unicode incluidos. Nada de lo que buscas o copias se transmite, algo que importa al redactar mensajes privados o documentos de trabajo sensibles.",
            "La búsqueda funciona sobre nombres y palabras clave, así que los resultados valen lo que valga el nombrado: \"smile\", \"fire\", \"star\" encuentran sus coincidencias obvias, mientras que los emoji con nombres poco intuitivos requieren navegar por categorías. Los grupos — caras, animales, comida, objetos, símbolos — reflejan cómo el estándar Unicode organiza el conjunto.",
            "Como los emoji son texto, todo lo que copias se pega como texto: funciona en cualquier campo que acepte Unicode, de correos a comentarios de código. Si un destino muestra un recuadro hueco, ese dispositivo o fuente simplemente carece de un emoji más reciente — el punto de código es correcto aunque la pantalla no lo muestre.",
          ],
        },
      ],
    },
    pt: {
      name: "Seletor de emojis",
      tagline:
        "Explore mais de 670 emojis em 8 grupos curados, busque pelo nome em inglês, copie com um clique e reutilize os recentes — tudo no navegador.",
      intro: [
        "Um painel de emojis curado à mão com 677 entradas em oito grupos: rostos, pessoas, animais, comida, atividades, viagem, objetos e símbolos. A busca usa o nome oficial em inglês: digitar “star” acha ⭐, 🌟 e ✨ de uma vez.",
        "Um clique copia o caractere para a área de transferência, com confirmação visível para você nunca duvidar se funcionou. Seus 16 emojis mais recentes ficam salvos neste dispositivo via localStorage. Nenhuma imagem é carregada: a grade desenha glifos nativos na hora.",
      ],
      steps: [
        "Digite um nome na busca ou escolha uma aba de grupo.",
        "Clique em qualquer emoji — ele é copiado para a área de transferência na hora.",
        "Ache seus usos recentes na linha do topo, salvos neste dispositivo.",
      ],
      faqs: [
        {
          q: "De onde vêm os emojis?",
          a: "São glifos nativos desenhados pela fonte de emojis do seu sistema. Nada é baixado, então a página fica rápida e funciona offline depois de carregada.",
        },
        {
          q: "Por que alguns emojis parecem diferentes dos do meu celular?",
          a: "Cada plataforma desenha emojis do seu jeito. A grade mostra como este dispositivo os renderiza; o caractere copiado aparecerá assim também no app que receber.",
        },
        {
          q: "Como funciona “Usados recentemente”?",
          a: "Todo emoji copiado é lembrado no localStorage do navegador (até 16). Limpar os dados do navegador zera a lista.",
        },
      ],
      deepDive: [
        {
          heading: "Como os emoji funcionam de verdade por dentro",
          paragraphs: [
            "Emoji não são imagens — são pontos de código Unicode renderizados pela fonte que cada plataforma fornece. O mesmo ponto U+1F600 é desenhado com pequenas diferenças no iOS, Android e Windows, por isso um emoji que parece perfeito no seu celular pode parecer estranho na captura de um colega.",
            "Modificadores ampliam o conjunto: os modificadores de tom de pele são pontos de código combinantes que alteram o caractere base que os precede, as sequências ZWJ (juntador de largura zero) colam vários emoji num só — as combinações de família e profissão — e os seletores de variante decidem entre estilo texto e estilo cor. Um emoji aparentemente simples pode ser uma cadeia de cinco pontos de código.",
            "Por isso buscar e copiar é mais seguro que compor à mão: o seletor entrega a sequência completa e correta, enquanto cadeias montadas à mão são a fonte comum de emoji quebrados que aparecem como dois rostos separados ou um quadro vazio.",
          ],
        },
        {
          heading: "Escolher e usar emoji com intenção",
          paragraphs: [
            "Emoji funcionam melhor como pontuação de tom, não como substitutos de palavras: um polegar bem colocado fecha uma mensagem com calor, enquanto um parágrafo cheio de símbolos parece ruído. Contextos profissionais recompensam a moderação — um ou dois por mensagem mantêm o sinal.",
            "Atenção à deriva de significados entre plataformas: alguns emoji carregam significados secundários que variam por comunidade e região, e alguns poucos são amplamente lidos como algo diferente do seu valor literal. Na dúvida em contextos formais ou internacionais, escolha a opção literal inequívoca.",
            "Copiar e colar é a interação central porque sequências de emoji são frágeis para editar: apagar um ponto de código no meio de uma cadeia ZWJ quebra o glifo inteiro. O mais fácil é redigitar o texto ao redor e colar o emoji de novo.",
          ],
        },
        {
          heading: "Processamento local e cobertura Unicode",
          paragraphs: [
            "O seletor roda inteiramente no seu navegador: busca, categorização e cópia acontecem localmente contra os dados de nomes Unicode embutidos. Nada do que você busca ou copia é transmitido, o que importa ao redigir mensagens privadas ou documentos de trabalho sensíveis.",
            "A busca funciona sobre nomes e palavras-chave, então os resultados valem o que vale o batismo: \"smile\", \"fire\", \"star\" acham suas correspondências óbvias, enquanto emoji com nomes pouco intuitivos pedem navegação por categoria. Os grupos — caras, animais, comida, objetos, símbolos — espelham como o padrão Unicode organiza o conjunto.",
            "Como emoji são texto, tudo que você copia é colado como texto: funciona em qualquer campo que aceite Unicode, de e-mails a comentários de código. Se um destino mostra um quadro oco, aquele dispositivo ou fonte simplesmente não tem um emoji mais recente — o ponto de código está correto mesmo quando a exibição não está.",
          ],
        },
      ],
    },
  },
});
