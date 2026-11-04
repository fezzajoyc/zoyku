import { DevHtmlEscapeEngine } from "../_engines/dev-html-escape";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "html-escape",
  category: "developer",
  icon: "code",
  engine: {
    component: DevHtmlEscapeEngine,
    props: {
      escapeId: "html-escape",
      unescapeId: "html-unescape",
      sample: `<a href="/docs?a=1&b=2">Tom & Jerry's "favorites"</a>`,
    },
  },
  related: ["html-formatter", "html-minifier", "url-encoder", "url-decoder", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "json-path-query"],
  copy: {
    en: {
      name: "HTML Escape / Unescape",
      tagline:
        "Escape or unescape HTML entities live as you type: & < > and quotes become safe references, with an optional numeric mode for non-ASCII characters.",
      intro: [
        "Encode the five characters that break HTML — ampersand, angle brackets and both quote styles — into their named entities, or paste entities back into readable text. A second toggle switches accented and non-Latin characters to numeric references like &#233;, useful for legacy systems and email templates.",
        "Both directions run live in one panel, and the readout shows exactly how the character count changed, so a broken double-escape is visible at a glance.",
      ],
      steps: [
        "Paste HTML or escaped text into the input box.",
        "Pick Escape or Unescape; both run live as you type.",
        "Enable numeric entities if you need non-ASCII output like &#233;.",
        "Copy the result — the char-count readout shows how much it grew or shrank.",
      ],
      faqs: [
        {
          q: "Why is the single quote escaped as &#39; instead of &apos;?",
          a: "&apos; is valid in XML and HTML5 but was never part of HTML 4, so some older parsers and email clients mishandle it. The numeric &#39; is safe everywhere.",
        },
        {
          q: "Do I need to escape non-ASCII characters?",
          a: "In UTF-8 documents, usually no — browsers handle é directly. Numeric entities matter for legacy encodings, email pipelines or systems that mangle non-ASCII bytes.",
        },
        {
          q: "Which named entities does unescaping recognize?",
          a: "About 70 common ones — markup (&amp;, &lt;, &gt;, &quot;, &apos;), punctuation (&mdash;, &hellip;, &ldquo;), Latin accents and symbols (&copy;, &euro;) — plus every decimal and hexadecimal numeric reference.",
        },
      ],
    },
    zh: {
      name: "HTML 转义 / 反转义",
      tagline: "实时互转 HTML 实体:& < > 引号一键转义,可选数字实体处理非 ASCII 字符,并显示字符数变化。",
      intro: [
        "把破坏 HTML 的五个字符——&、尖括号和两种引号——编码成命名实体,也可以把实体文本反转回可读内容。另有一个开关,把带重音和非拉丁字符切换为 &#233; 这样的数字引用,适合遗留系统和邮件模板。",
        "两个方向在同一个面板里实时运行,读数会显示字符数如何变化,二次转义之类的问题一眼可见。",
      ],
      steps: [
        "把 HTML 或已转义的文本粘贴进输入框。",
        "选择转义或反转义,输入即算。",
        "需要 &#233; 这类非 ASCII 输出时,打开数字实体开关。",
        "复制结果——字符数读数会显示变长还是变短。",
      ],
      faqs: [
        {
          q: "单引号为什么转义成 &#39; 而不是 &apos;?",
          a: "&apos; 在 XML 和 HTML5 里合法,但不属于 HTML 4,一些老解析器和邮件客户端会处理出错。数字形式 &#39; 在任何地方都安全。",
        },
        {
          q: "非 ASCII 字符需要转义吗?",
          a: "UTF-8 文档通常不需要——浏览器直接处理 é。数字实体主要用于旧编码、邮件管线或会损坏非 ASCII 字节的系统。",
        },
        {
          q: "反转义识别哪些命名实体?",
          a: "约 70 个常用实体:标记类(&amp;、&lt;、&gt;、&quot;、&apos;)、标点(&mdash;、&hellip;、&ldquo;)、拉丁重音字符和符号(&copy;、&euro;),以及全部十进制和十六进制数字引用。",
        },
      ],
    },
    ja: {
      name: "HTML エスケープ / アンエスケープ",
      tagline:
        "HTML 実体を入力しながらリアルタイム変換:& < > 引用符を安全な参照へ。非 ASCII は数値実体も選べ、文字数の変化も表示します。",
      intro: [
        "HTML を壊す 5 文字(&、山括弧、両方の引用符)を名前付き実体へエンコード、または実体テキストを元の読める文字へ戻します。もうひとつのトグルで、アクセント付きや非ラテン文字を &#233; のような数値参照に切り替えられます。レガシーシステムやメールテンプレートに便利です。",
        "両方向が 1 つのパネルでライブに動き、文字数の変化を読み取りとして表示するため、二重エスケープも一目でわかります。",
      ],
      steps: [
        "HTML やエスケープ済みテキストを入力欄に貼り付けます。",
        "エスケープかアンエスケープを選択。入力すると即座に反映されます。",
        "&#233; のような非 ASCII 出力が必要なら数値実体を有効にします。",
        "結果をコピー — 文字数の読み取りで増減がわかります。",
      ],
      faqs: [
        {
          q: "一重引用符が &apos; ではなく &#39; になるのは?",
          a: "&apos; は XML や HTML5 では有効ですが HTML 4 には存在せず、古いパーサーやメールクライアントで誤扱いされることがあります。数値の &#39; ならどこでも安全です。",
        },
        {
          q: "非 ASCII 文字はエスケープが必要ですか?",
          a: "UTF-8 文書では通常不要で、ブラウザは é を直接扱えます。数値実体はレガシーな文字コード、メール配信、非 ASCII バイトを壊すシステムで役立ちます。",
        },
        {
          q: "アンエスケープはどの名前付き実体に対応?",
          a: "約 70 個のよく使う実体 — マークアップ(&amp;、&lt;、&gt;、&quot;、&apos;)、記号(&mdash;、&hellip;、&ldquo;)、ラテン文字のアクセントやシンボル(&copy;、&euro;)— に加え、10 進・16 進の数値参照すべてに対応します。",
        },
      ],
    },
    es: {
      name: "Escapar / desescapar HTML",
      tagline:
        "Escapa o desescapa entidades HTML en vivo mientras escribes: & < > y comillas se vuelven referencias seguras, con modo numérico opcional para no ASCII.",
      intro: [
        "Codifica los cinco caracteres que rompen el HTML — ampersand, ángulos y ambas comillas — en sus entidades nombradas, o convierte entidades de vuelta en texto legible. Un segundo interruptor cambia los caracteres acentuados y no latinos a referencias numéricas como &#233;, útil para sistemas heredados y plantillas de correo.",
        "Ambas direcciones funcionan en vivo en un mismo panel, y la lectura muestra cuánto cambió el número de caracteres, así que un doble escape roto se detecta de un vistazo.",
      ],
      steps: [
        "Pega HTML o texto escapado en el cuadro de entrada.",
        "Elige Escapar o Desescapar; ambos van en vivo mientras escribes.",
        "Activa las entidades numéricas si necesitas salida no ASCII como &#233;.",
        "Copia el resultado: la lectura de caracteres indica cuánto creció o se redujo.",
      ],
      faqs: [
        {
          q: "¿Por qué la comilla simple se escapa como &#39; y no &apos;?",
          a: "&apos; es válido en XML y HTML5 pero nunca formó parte de HTML 4, así que algunos parseadores antiguos y clientes de correo la manejan mal. El &#39; numérico funciona en todas partes.",
        },
        {
          q: "¿Hace falta escapar caracteres no ASCII?",
          a: "En documentos UTF-8 normalmente no: los navegadores procesan é directamente. Las entidades numéricas importan para codificaciones heredadas, correo o sistemas que estropean bytes no ASCII.",
        },
        {
          q: "¿Qué entidades nombradas reconoce al desescapar?",
          a: "Unas 70 habituales: de marcado (&amp;, &lt;, &gt;, &quot;, &apos;), puntuación (&mdash;, &hellip;, &ldquo;), acentos latinos y símbolos (&copy;, &euro;), además de todas las referencias numéricas decimales y hexadecimales.",
        },
      ],
    },
    pt: {
      name: "Escapar / reverter HTML",
      tagline:
        "Escape ou reverta entidades HTML ao vivo enquanto digita: & < > e aspas viram referências seguras, com modo numérico opcional para não ASCII.",
      intro: [
        "Codifique os cinco caracteres que quebram o HTML — e comercial, sinais de maior/menor e os dois estilos de aspas — em entidades nomeadas, ou cole entidades e volte ao texto legível. Um segundo interruptor converte acentuados e caracteres não latinos em referências numéricas como &#233;, útil em sistemas legados e templates de e-mail.",
        "Os dois sentidos rodam ao vivo no mesmo painel, e o contador mostra exatamente como o número de caracteres mudou, então um escape duplo quebrado aparece de relance.",
      ],
      steps: [
        "Cole HTML ou texto escapado na caixa de entrada.",
        "Escolha Escapar ou Reverter; ambos rodam ao vivo enquanto você digita.",
        "Ative entidades numéricas se precisar de saída não ASCII como &#233;.",
        "Copie o resultado — a contagem de caracteres mostra quanto cresceu ou encolheu.",
      ],
      faqs: [
        {
          q: "Por que a aspa simples vira &#39; em vez de &apos;?",
          a: "&apos; é válido em XML e HTML5, mas nunca fez parte do HTML 4, então alguns parsers antigos e clientes de e-mail lidam mal com ela. O &#39; numérico funciona em qualquer lugar.",
        },
        {
          q: "Preciso escapar caracteres não ASCII?",
          a: "Em documentos UTF-8, normalmente não — navegadores lidam com é direto. Entidades numéricas importam para codificações legadas, pipelines de e-mail ou sistemas que corrompem bytes não ASCII.",
        },
        {
          q: "Quais entidades nomeadas a reversão reconhece?",
          a: "Cerca de 70 comuns — de marcação (&amp;, &lt;, &gt;, &quot;, &apos;), pontuação (&mdash;, &hellip;, &ldquo;), acentos latinos e símbolos (&copy;, &euro;) — além de todas as referências numéricas decimais e hexadecimais.",
        },
      ],
    },
  },
});
