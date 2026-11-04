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
    },
  },
});
