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
        "Paste a title in any language: accents are stripped (café → cafe), punctuation and spaces collapse into single hyphens, and the result is trimmed so no slug starts or ends with a dash.",
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
    },
  },
});
