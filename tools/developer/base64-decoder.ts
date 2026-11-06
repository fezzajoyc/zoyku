import { DevEncoderEngine } from "../_engines/dev-engine-encoder";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "base64-decoder",
  category: "developer",
  icon: "swap",
  engine: { component: DevEncoderEngine, props: { codec: "base64-decode" } },
  related: ["base64-encoder", "url-decoder", "jwt-decoder", "hash-generator", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "url-encoder"],
  copy: {
    en: {
      name: "Base64 Decoder",
      tagline:
        "Decode Base64 back into readable text with proper UTF-8 handling — data URIs, API payloads and encoded config values become clear instantly. Private and free.",
      intro: [
        "Reading an Authorization: Basic header, inspecting a JWT segment, or pulling original content back out of a data URI — paste the string and see the decoded text live, without opening a REPL or writing a throwaway script.",
        "Decoding runs through the standard TextDecoder with UTF-8, so multibyte content — accents, emoji, CJK characters — round-trips correctly instead of turning into mojibake. Whitespace, line breaks and data:...;base64, prefixes are handled automatically.",
        "The tool implements RFC 4648: the standard alphabet with + and /, padding with = signs, decoded locally in your browser — the input never leaves the page.",
        "Where command-line equivalents need coaxing (openssl base64 -d rejects wrapped input unless you strip newlines first), this decoder is forgiving by default and keeps details like UTF-8 multibyte handling out of your way — paste, read, copy."
      ],
      steps: [
        "Paste the Base64 string into the input box.",
        "The decoded text appears instantly — copy it with one click.",
        "If decoding fails, check for truncated or non-Base64 characters in the input.",
      ],
      faqs: [
        {
          q: "The output looks like garbage symbols — why?",
          a: "The input is probably not UTF-8 text. Base64 can encode arbitrary bytes: images, PDFs, binary blobs. This tool decodes bytes as UTF-8 text, so binary data shows as replacement characters.",
        },
        {
          q: "Can it decode URL-safe Base64?",
          a: "Yes — it is aimed at JWT-style data, where - and _ replace + and /. Standard Base64 with or without padding works too.",
        },
        {
          q: "Is decoding done on a server?",
          a: "No. Everything runs in your browser; the string never leaves your device.",
        },
      ],
      deepDive: [
        {
          heading: "Base64 is encoding, not encryption",
          paragraphs: [
            "The most common misconception about Base64 is that it hides anything. It does not. Base64 is a reversible encoding defined by RFC 4648: it takes arbitrary bytes and re-expresses them using 64 safe characters (A-Z, a-z, 0-9, + and /) so binary data survives channels that only handle text, like email attachments or JSON fields. Anyone with the string can decode it in one step — this tool does it instantly, and so does any other decoder. If you need secrecy, you need encryption (AES, RSA) with a key; Base64 offers none.",
            "Why 64 characters? Six bits can index exactly 64 values, so Base64 packs every 3 bytes (24 bits) into 4 characters (4 × 6 bits). Data whose length is not a multiple of 3 leaves a remainder, and that is where the = padding comes in: one = means the final group held 2 bytes, two = means 1 byte. Padding is technically optional information — decoders can infer it — which is why you will meet Base64 strings with the trailing = stripped, and why a decoder should accept both.",
            "A related variant matters in practice: URL-safe Base64 replaces + and / with - and _, because + and / cause trouble in URLs and filenames. JWTs use this alphabet, which is why a JWT header or payload decodes cleanly here even though a strict RFC 4648 decoder might reject the - characters.",
          ],
        },
        {
          heading: "What you get back, and what garbage output means",
          paragraphs: [
            "Decoding always produces bytes; the question is how those bytes are interpreted. This tool runs them through a UTF-8 TextDecoder, so text that was encoded as UTF-8 comes back exactly as it started — accented letters, emoji, CJK characters all round-trip because Base64 carries bytes, not characters. If the output shows replacement symbols (�), the input was probably never UTF-8 text: it may be an image, a PDF, or a file encoded in another codepage. The decode still worked; there is simply no text to show.",
            "Real-world Base64 is messy, so the tool cleans before it decodes: whitespace and line breaks are stripped (email and PEM output wrap Base64 at 76 characters, which breaks strict decoders), and a data URI prefix like data:image/png;base64, is removed so you can paste the whole thing. Length is the other common failure: Base64 length must be a multiple of 4, so a string truncated mid-way by a copy-paste or a log line breaks decoding — check the edges first.",
          ],
        },
        {
          heading: "Local by design, and how it compares with the CLI",
          paragraphs: [
            "Encoded strings are everywhere in sensitive contexts: Authorization headers, API keys inside config blobs, JWTs containing account identifiers, embedded payloads you found in traffic. Pasting any of those into a random website that sends input to a server would mean shipping the very data you are inspecting to a third party. This decoder runs entirely in your browser with JavaScript — nothing is uploaded, nothing is logged, and it works offline once the page is loaded.",
            "Command-line tools (openssl base64 -d, certutil, python base64) are powerful but fussy about wrapped input, missing padding and file handling, and they differ across platforms. For a one-off “what is this string?” moment, a browser tool that tolerates prefixes and whitespace, decodes JWT-style URL-safe alphabets, and shows multibyte text correctly is usually faster — with the same privacy guarantee and no shell history storing your encoded secret.",
          ],
        },
      ],
    },
    zh: {
      name: "Base64 解码",
      tagline: "把 Base64 解码回可读文本,UTF-8 处理完整——data URI、API 负载、编码后的配置值即时还原。私密免费,本地完成。",
      intro: [
        "粘贴 Base64,解码文本实时呈现。解码走标准 TextDecoder,多字节 UTF-8 内容——重音符号、emoji、中日韩文字——都能正确还原,不会变成乱码。",
        "对常见情况很宽容:输入中的空白和换行会被忽略,data:image/png;base64, 这类 data URI 前缀会在解码前自动去掉。",
      ],
      steps: [
        "把 Base64 字符串粘贴到输入框。",
        "解码文本即时出现,一键复制。",
        "如果解码失败,检查输入是否被截断或混入了非 Base64 字符。",
      ],
      faqs: [
        {
          q: "输出看起来是乱码,为什么?",
          a: "输入可能不是 UTF-8 文本。Base64 可以编码任意字节:图片、PDF、二进制块。本工具按 UTF-8 文本解码字节,二进制数据会显示为替换字符。",
        },
        {
          q: "能解码 URL 安全的 Base64 吗?",
          a: "可以——它按 JWT 风格处理,即用 - 和 _ 代替 + 和 /。带或不带填充的标准 Base64 也都支持。",
        },
        {
          q: "解码是在服务器上做的吗?",
          a: "不是。一切都在浏览器中完成,字符串不会离开你的设备。",
        },
      ],
      deepDive: [
        {
          heading: "Base64 是编码,不是加密",
          paragraphs: [
            "关于 Base64 最常见的误解是它能保密。它不能。Base64 是 RFC 4648 定义的一种可逆编码:把任意字节用 64 个安全字符(A-Z、a-z、0-9、+ 和 /)重新表示,让二进制数据能通过只认文本的通道,比如邮件附件或 JSON 字段。任何人拿到字符串都能一步解码——本工具可以,任何其他解码器也可以。真要保密,你需要的是带密钥的加密(AES、RSA),Base64 提供不了。",
            "为什么正好 64 个字符?6 个比特恰好能表示 64 个值,所以 Base64 把每 3 个字节(24 比特)打包成 4 个字符(4 × 6 比特)。数据长度不是 3 的倍数时会剩下余数,这就是 = 填充的来历:一个 = 表示最后一组只有 2 个字节,两个 = 表示 1 个字节。填充在信息上其实是多余的——解码器可以自己推算——所以你会遇到结尾 = 被去掉的 Base64 字符串,这也是解码器应该两种都接受的原因。",
            "还有一个实用变体:URL 安全的 Base64 用 - 和 _ 替换 + 和 /,因为后两者在 URL 和文件名里会出问题。JWT 用的就是这套字母表,所以 JWT 的 header 和 payload 在这里能正常解码,而严格的 RFC 4648 解码器可能会拒绝里面的 - 字符。",
          ],
        },
        {
          heading: "解码结果怎么读,乱码说明了什么",
          paragraphs: [
            "解码产出的永远是字节,问题在于这些字节怎么解释。本工具用 UTF-8 TextDecoder 处理它们,所以用 UTF-8 编码过的文本会原样还原——重音字母、emoji、中日韩字符都能完整还原,因为 Base64 携带的是字节而不是字符。如果输出出现替换符号(�),说明输入很可能从来就不是 UTF-8 文本:也许是图片、PDF 或别的码页编码的文件。解码本身成功了,只是没有文本可显示。",
            "现实中的 Base64 往往不干净,所以工具在解码前先做清理:去掉空白和换行(邮件和 PEM 格式会按 76 字符换行,这会让严格的解码器报错),去掉 data:image/png;base64, 这类 data URI 前缀,让你可以直接整段粘贴。长度是另一个常见坑:Base64 长度必须是 4 的倍数,所以被复制粘贴或日志截断的字符串会解码失败——先检查两端。",
          ],
        },
        {
          heading: "本地运行是设计原则,也说说和命令行的差别",
          paragraphs: [
            "编码字符串经常出现在敏感场景:Authorization 头、配置块里的 API key、带账号标识的 JWT、流量里翻出来的嵌入负载。把这类内容贴进一个会把输入发到服务器的网站,等于把你要检查的数据亲手交给第三方。这个解码器完全在你的浏览器里用 JavaScript 运行——不上传、不留日志,页面加载完成后离线也能用。",
            "命令行工具(openssl base64 -d、certutil、python base64)功能强但对换行、缺填充、文件处理都很挑剔,而且各平台行为不一致。对于“这串东西是什么”的一次性疑问,一个容忍前缀和空白、支持 JWT 风格 URL 安全字母表、能正确显示多字节文本的浏览器工具通常更快——隐私保障相同,还不用担心编码过的密钥留在 shell 历史里。",
          ],
        },
      ],
    },
    ja: {
      name: "Base64 デコーダー",
      tagline:
        "Base64 を UTF-8 を正しく扱って読めるテキストへ復元。data URI・API ペイロード・エンコード済み設定値が瞬時に分かります。",
      intro: [
        "Base64 を貼り付けると、デコード結果がリアルタイムに表示されます。標準の TextDecoder を通すため、アクセント記号・絵文字・CJK などのマルチバイト UTF-8 も文字化けせず正しく出ます。",
        "実用面では寛容です。入力内の空白や改行は無視され、data:image/png;base64, のような data URI プレフィックスはデコード前に自動で取り除かれます。",
      ],
      steps: [
        "Base64 文字列を入力欄に貼り付けます。",
        "デコードされたテキストが即座に表示され、ワンクリックでコピーできます。",
        "デコードに失敗する場合は、入力が途中で切れていないか・Base64 以外の文字が混在していないか確認します。",
      ],
      faqs: [
        {
          q: "出力が意味不明な記号になるのはなぜ?",
          a: "入力はおそらく UTF-8 テキストではありません。Base64 は画像・PDF・バイナリなど任意のバイトを扱えます。このツールはバイトを UTF-8 テキストとして解釈するため、バイナリは置換文字として表示されます。",
        },
        {
          q: "URL セーフな Base64 もデコードできますか?",
          a: "はい。+ と / の代わりに - と _ を使う JWT 風のデータを想定しています。パディングの有無を問わず標準 Base64 も OK です。",
        },
        {
          q: "デコードはサーバー上で行われますか?",
          a: "いいえ。すべてブラウザ内で完結し、文字列が端末の外に出ることはありません。",
        },
      ],
      deepDive: [
        {
          heading: "Base64 はエンコードであって、暗号化ではありません",
          paragraphs: [
            "Base64 について最も多い誤解は「内容を隠せる」というものです。できません。Base64 は RFC 4648 で定義された可逆エンコードであり、任意のバイト列を 64 種類の安全な文字(A-Z、a-z、0-9、+、/)で表し直す仕組みです。メール添付や JSON フィールドなど、テキストしか通さない経路でバイナリを運ぶためのものです。文字列を持っている人なら誰でもワンステップで復号できます。秘匿性が必要なら、鍵を使う暗号化(AES、RSA)が必要で、Base64 にはその機能がまったくありません。",
            "なぜ 64 文字なのか。6 ビットはちょうど 64 通りを表せるので、Base64 は 3 バイト(24 ビット)を 4 文字(4 × 6 ビット)に詰め込みます。データ長が 3 の倍数でないと余りが出ます。これが = パディングの由来です。= が 1 つなら最終グループは 2 バイト、2 つなら 1 バイトを意味します。パディングは情報として冗長なので(デコーダ側で推測可能)、末尾の = を削った Base64 文字列も実際には存在し、デコーダは両方を受け付けるべきです。",
            "実務で重要な派生形もあります。URL セーフ Base64 は + と / を - と _ に置き換えます。URL やファイル名ではこの 2 文字が問題になるためです。JWT はこのアルファベットを使うので、JWT の header や payload はここで問題なくデコードできます。厳密な RFC 4648 デコーダなら - を拒否する場面です。",
          ],
        },
        {
          heading: "結果の読み方と、文字化けが意味するもの",
          paragraphs: [
            "デコードの結果は常にバイト列であり、問題はその解釈の仕方です。このツールは UTF-8 の TextDecoder に通すので、UTF-8 でエンコードされたテキストは元どおりに復元されます。アクセント記号・絵文字・CJK も問題なく戻ります。Base64 が運ぶのは文字ではなくバイトだからです。出力に置換記号(�)が並ぶ場合は、入力がもともと UTF-8 テキストではない可能性が高いです。画像・PDF・別のコードページのファイルかもしれません。デコード自体は成功しており、表示できるテキストがないだけです。",
            "現実の Base64 は汚いことが多いので、ツールはデコード前に整えます。空白と改行を取り除き(メールや PEM は 76 文字ごとに折り返すため、厳密なデコーダはエラーになります)、data:image/png;base64, のような data URI プレフィックスを除去して、全体をそのまま貼れるようにします。もう一つの落とし穴は長さです。Base64 の長さは 4 の倍数でなければならないため、コピー・ログで途中まで切れた文字列はデコードできません。まず両端を確認してください。",
          ],
        },
        {
          heading: "ローカル完結という設計と、CLI との違い",
          paragraphs: [
            "エンコード済み文字列は機密性の高い文脈に現れます。Authorization ヘッダ、設定ブロック内の API キー、アカウント識別子を含む JWT、通信から見つけた埋め込みペイロードなどです。入力をサーバーへ送るウェブサイトにそれを貼ることは、確認しようとしていたデータそのものを第三者へ渡すことを意味します。このデコーダはブラウザ内の JavaScript だけで動作し、アップロードも記録もなく、ページを読み込めばオフラインでも使えます。",
            "コマンドラインツール(openssl base64 -d、certutil、python base64)は強力ですが、折り返し入力やパディング欠落・ファイル扱いにうるさく、プラットフォームごとに挙動が違います。「この文字列は何?」という一度きりの疑問には、プレフィックスや空白を許容し、JWT 風の URL セーフ文字列に対応し、マルチバイトを正しく表示するブラウザツールのほうが通常速いでしょう。プライバシー面は同等で、シェル履歴にエンコード済みシークレットが残る心配もありません。",
          ],
        },
      ],
    },
    es: {
      name: "Decodificador Base64",
      tagline:
        "Decodifica Base64 a texto legible con manejo UTF-8 correcto: data URIs, payloads de API y valores codificados se aclaran al instante. Privado y gratis.",
      intro: [
        "Pega Base64 y ve el texto decodificado en vivo. La decodificación usa el TextDecoder estándar, así que el contenido UTF-8 multibyte — acentos, emojis, CJK — sale correcto en lugar de convertirse en caracteres extraños.",
        "Es tolerante donde importa: los espacios y saltos de línea de la entrada se ignoran, y los prefijos data URI como data:image/png;base64, se quitan automáticamente antes de decodificar.",
      ],
      steps: [
        "Pega la cadena Base64 en el cuadro de entrada.",
        "El texto decodificado aparece al instante: cópialo con un clic.",
        "Si la decodificación falla, revisa que la entrada no esté truncada ni contenga caracteres no Base64.",
      ],
      faqs: [
        {
          q: "La salida son símbolos extraños, ¿por qué?",
          a: "La entrada probablemente no es texto UTF-8. Base64 puede codificar bytes arbitrarios: imágenes, PDFs, binarios. Esta herramienta decodifica los bytes como texto UTF-8, así que los datos binarios aparecen como caracteres de reemplazo.",
        },
        {
          q: "¿Decodifica Base64 URL-safe?",
          a: "Sí — está pensado para datos estilo JWT, donde - y _ reemplazan a + y /. También funciona el Base64 estándar con o sin relleno.",
        },
        {
          q: "¿La decodificación ocurre en un servidor?",
          a: "No. Todo corre en tu navegador; la cadena nunca sale de tu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Base64 es codificación, no cifrado",
          paragraphs: [
            "El error más común sobre Base64 es creer que oculta algo. No lo hace. Base64 es una codificación reversible definida por el RFC 4648: toma bytes arbitrarios y los reescribe con 64 caracteres seguros (A-Z, a-z, 0-9, + y /) para que los datos binarios sobrevivan en canales que solo aceptan texto, como adjuntos de correo o campos JSON. Cualquiera que tenga la cadena puede decodificarla en un paso — esta herramienta lo hace al instante, y cualquier otro decodificador también. Si necesitas confidencialidad, necesitas cifrado con clave (AES, RSA); Base64 no ofrece nada de eso.",
            "¿Por qué 64 caracteres? Seis bits indexan exactamente 64 valores, así que Base64 empaqueta cada 3 bytes (24 bits) en 4 caracteres (4 × 6 bits). Cuando la longitud no es múltiplo de 3 queda un resto, y de ahí sale el relleno con =: un = significa que el último grupo tenía 2 bytes, dos = significan 1 byte. El relleno es información redundante — el decodificador puede deducirlo — por eso existen cadenas Base64 sin los = finales, y por eso un decodificador debería aceptar ambas formas.",
            "Otra variante importa en la práctica: Base64 URL-safe sustituye + y / por - y _, porque esos dos caracteres dan problemas en URLs y nombres de archivo. Los JWT usan ese alfabeto, y por eso el header y el payload de un JWT se decodifican bien aquí, aunque un decodificador estricto del RFC 4648 podría rechazar los caracteres -.",
          ],
        },
        {
          heading: "Cómo leer el resultado y qué significa una salida extraña",
          paragraphs: [
            "Decodificar siempre produce bytes; la cuestión es cómo se interpretan. Esta herramienta los pasa por un TextDecoder UTF-8, así que el texto que se codificó como UTF-8 vuelve exactamente como era — acentos, emojis y caracteres CJK se restauran porque Base64 transporta bytes, no caracteres. Si la salida muestra símbolos de reemplazo (�), la entrada probablemente nunca fue texto UTF-8: puede ser una imagen, un PDF o un archivo en otra página de códigos. La decodificación funcionó; simplemente no hay texto que mostrar.",
            "El Base64 real suele estar sucio, así que la herramienta limpia antes de decodificar: elimina espacios y saltos de línea (el correo y el formato PEM parten el Base64 cada 76 caracteres, lo que rompe a los decodificadores estrictos) y quita prefijos data URI como data:image/png;base64, para que puedas pegar la cadena completa. La longitud es otro fallo habitual: la longitud de Base64 debe ser múltiplo de 4, así que una cadena truncada a mitad por un copiado o un log no se decodifica — revisa los extremos primero.",
          ],
        },
        {
          heading: "Local por diseño, y cómo se compara con la línea de comandos",
          paragraphs: [
            "Las cadenas codificadas aparecen en contextos sensibles: cabeceras Authorization, claves API dentro de bloques de configuración, JWT con identificadores de cuenta, payloads encontrados en tráfico. Pegar cualquiera de ellas en un sitio web que envía la entrada a un servidor significa entregar justo los datos que estás inspeccionando. Este decodificador funciona por completo en tu navegador con JavaScript — nada se sube, nada se registra, y funciona sin conexión una vez cargada la página.",
            "Las herramientas de línea de comandos (openssl base64 -d, certutil, python base64) son potentes pero quisquillosas con la entrada partida, el relleno ausente y el manejo de archivos, y cambian entre plataformas. Para un momento puntual de “¿qué es esta cadena?”, una herramienta de navegador que tolera prefijos y espacios, decodifica alfabetos URL-safe estilo JWT y muestra texto multibyte correctamente suele ser más rápida — con la misma garantía de privacidad y sin dejar tu secreto codificado en el historial del shell.",
          ],
        },
      ],
    },
    pt: {
      name: "Decodificador Base64",
      tagline:
        "Decodifique Base64 de volta para texto legível com tratamento UTF-8 correto — data URIs, payloads de API e valores codificados ficam claros na hora.",
      intro: [
        "Cole Base64 e veja o texto decodificado ao vivo. A decodificação passa pelo TextDecoder padrão, então conteúdo UTF-8 multibyte — acentos, emojis, CJK — sai correto em vez de virar caracteres estranhos.",
        "É tolerante onde importa: espaços e quebras de linha na entrada são ignorados, e prefixos data URI como data:image/png;base64, são removidos automaticamente antes da decodificação.",
      ],
      steps: [
        "Cole a string Base64 na caixa de entrada.",
        "O texto decodificado aparece na hora — copie com um clique.",
        "Se a decodificação falhar, verifique se a entrada não está truncada ou com caracteres que não são Base64.",
      ],
      faqs: [
        {
          q: "A saída parece símbolos sem sentido, por quê?",
          a: "A entrada provavelmente não é texto UTF-8. Base64 pode codificar bytes arbitrários: imagens, PDFs, dados binários. Esta ferramenta decodifica os bytes como texto UTF-8, então dados binários aparecem como caracteres de substituição.",
        },
        {
          q: "Decodifica Base64 URL-safe?",
          a: "Sim — pensado para dados estilo JWT, onde - e _ substituem + e /. Base64 padrão, com ou sem padding, também funciona.",
        },
        {
          q: "A decodificação acontece num servidor?",
          a: "Não. Tudo roda no seu navegador; a string nunca sai do seu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Base64 é codificação, não criptografia",
          paragraphs: [
            "O equívoco mais comum sobre Base64 é achar que ele esconde algo. Não esconde. Base64 é uma codificação reversível definida pelo RFC 4648: ela pega bytes arbitrários e os reescreve com 64 caracteres seguros (A-Z, a-z, 0-9, + e /) para que dados binários sobrevivam em canais que só aceitam texto, como anexos de e-mail ou campos JSON. Qualquer pessoa com a string pode decodificá-la em um passo — esta ferramenta faz isso na hora, e qualquer outro decodificador também. Se você precisa de sigilo, precisa de criptografia com chave (AES, RSA); Base64 não oferece nada disso.",
            "Por que exatamente 64 caracteres? Seis bits indexam 64 valores, então o Base64 empacota cada 3 bytes (24 bits) em 4 caracteres (4 × 6 bits). Quando o comprimento não é múltiplo de 3 sobra um resto, e é daí que vem o padding com =: um = significa que o último grupo tinha 2 bytes, dois = significam 1 byte. O padding é informação redundante — o decodificador pode deduzi-lo — por isso existem strings Base64 sem os = finais, e por isso um decodificador deveria aceitar as duas formas.",
            "Outra variante importa na prática: Base64 URL-safe troca + e / por - e _, porque esses dois caracteres dão problema em URLs e nomes de arquivo. Os JWTs usam esse alfabeto, e é por isso que o header e o payload de um JWT decodificam bem aqui, embora um decodificador estrito do RFC 4648 pudesse rejeitar os caracteres -.",
          ],
        },
        {
          heading: "Como ler o resultado e o que significa uma saída estranha",
          paragraphs: [
            "Decodificar sempre produz bytes; a questão é como interpretá-los. Esta ferramenta os passa por um TextDecoder UTF-8, então o texto que foi codificado como UTF-8 volta exatamente como era — acentos, emojis e caracteres CJK se restauram porque Base64 transporta bytes, não caracteres. Se a saída mostra símbolos de substituição (�), a entrada provavelmente nunca foi texto UTF-8: pode ser uma imagem, um PDF ou um arquivo em outra página de códigos. A decodificação funcionou; simplesmente não há texto para mostrar.",
            "Base64 real costuma vir sujo, então a ferramenta limpa antes de decodificar: remove espaços e quebras de linha (e-mail e o formato PEM quebram o Base64 a cada 76 caracteres, o que quebra decodificadores estritos) e tira prefixos data URI como data:image/png;base64, para que você possa colar a string inteira. O comprimento é outra falha comum: o comprimento de Base64 deve ser múltiplo de 4, então uma string cortada no meio por uma cópia ou um log não decodifica — confira as pontas primeiro.",
          ],
        },
        {
          heading: "Local por design, e a comparação com a linha de comando",
          paragraphs: [
            "Strings codificadas aparecem em contextos sensíveis: cabeçalhos Authorization, chaves de API dentro de blocos de configuração, JWTs com identificadores de conta, payloads encontrados em tráfego. Colar qualquer uma delas em um site que envia a entrada para um servidor significa entregar exatamente os dados que você está inspecionando. Este decodificador roda inteiramente no seu navegador com JavaScript — nada é enviado, nada é registrado, e funciona offline depois que a página carrega.",
            "Ferramentas de linha de comando (openssl base64 -d, certutil, python base64) são poderosas mas exigentes com entrada quebrada, padding ausente e manipulação de arquivos, e variam entre plataformas. Para um momento pontual de “o que é essa string?”, uma ferramenta de navegador que tolera prefixos e espaços, decodifica alfabetos URL-safe estilo JWT e mostra texto multibyte corretamente costuma ser mais rápida — com a mesma garantia de privacidade e sem deixar seu segredo codificado no histórico do shell.",
          ],
        },
      ],
    },
  },
});
