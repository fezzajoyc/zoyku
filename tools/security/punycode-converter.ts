import { SecEnginePunycode } from "../_engines/sec-engine-punycode";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "punycode-converter",
  category: "security",
  icon: "globe",
  engine: { component: SecEnginePunycode },
  related: ["dns-lookup", "whois-lookup", "http-status-codes", "mime-types"],
  copy: {
    en: {
      name: "Punycode & IDN Converter",
      tagline:
        "Convert internationalized domain names between Unicode and Punycode (xn-- format) — RFC 3492 bootstring encoding for IDNA, used by DNS, browsers and email systems worldwide. Free, instant, offline.",
      intro: [
        "Internationalized domain names (IDN) let users register domains in their native scripts — 中文.com, bücher.de, ログイン.jp. But the DNS protocol only understands ASCII, so these domains are encoded as Punycode with the xn-- prefix (per RFC 3492 and IDNA RFC 5890). This converter handles both directions.",
        "The encoding uses the standard Punycode bootstring algorithm from RFC 3492, which converts any Unicode string into a reversible ASCII-only form. The IDNA encoding additionally processes the domain label-by-label (splitting on dots) and adds the xn-- prefix to each non-ASCII label.",
        "Everything runs locally — no DNS queries, no network calls. The implementation uses the battle-tested punycode library (Mathias Bynens, the same code that powers Node.js), cross-verified against Python's built-in punycode codec.",
      ],
      steps: [
        "Choose Encode (Unicode → xn--) or Decode (xn-- → Unicode).",
        "Enter the domain name or Punycode string.",
        "The result appears below with a copy button — multi-label domains are processed label by label.",
      ],
      faqs: [
        {
          q: "What is the difference between Punycode and IDNA?",
          a: "Punycode (RFC 3492) is the encoding algorithm that converts Unicode to ASCII. IDNA (RFC 5890) is the framework that applies Punycode to domain names, adding the xn-- prefix to signal that the label is encoded. This tool supports both raw Punycode and IDNA-encoded domains.",
        },
        {
          q: "Why does the domain start with xn--?",
          a: "The xn-- prefix tells DNS resolvers and browsers that the label is Punycode-encoded Unicode. Without it, the DNS system would interpret the label as a regular ASCII hostname. All non-ASCII domain labels must start with xn-- per IDNA.",
        },
      ],
      deepDive: [
        {
          heading: "Inside the RFC 3492 bootstring algorithm",
          paragraphs: [
            "Punycode is a bootstring encoding: it treats the ASCII subset already present in the string as its own alphabet and encodes everything else as insertions into that base. Each non-ASCII character becomes a sequence of digits that says where to insert and by how much the code point jumps.",
            "The deltas are generalized variable-length integers: smaller deltas use fewer digits, biased by how many characters have already been processed. This keeps common scripts compact — 中文 is just fiqs8s, not a long digit run.",
            "The result is fully reversible and case-insensitive in its DNS form, which is why registrars accept 中文.com and resolvers worldwide see xn--fiqs8s without ever knowing Unicode exists.",
          ],
        },
        {
          heading: "Homograph attacks: why xn-- deserves a second look",
          paragraphs: [
            "The security catch is visual: Cyrillic а (U+0430) renders identically to Latin a. An attacker registers xn--80ak6aa92e-style domains that look exactly like apple.com but resolve to a different server. This is the classic homograph attack.",
            "Modern browsers mitigate this with mixed-script detection — they show the Punycode form when a label mixes scripts that cannot co-occur legitimately. But policies differ between browsers and version, so a link copied from chat, email or a QR code is worth checking.",
            "Paste any suspicious domain here: if the decoded form uses a different script than you expected, or the xn-- label decodes to something that merely looks right, treat the link as hostile until verified.",
          ],
        },
      ],
    },
    zh: {
      name: "Punycode 与 IDN 转换",
      tagline:
        "国际化域名与 Punycode(xn-- 格式)双向转换——RFC 3492 bootstring 编码,IDNA 逐标签处理,被 DNS、浏览器与邮件系统广泛使用。免费、即时、离线可用。",
      intro: [
        "国际化域名(IDN)让用户以母语注册域名——中文.com、bücher.de、ログイン.jp。但 DNS 协议只理解 ASCII,所以这些域名被编码为带 xn-- 前缀的 Punycode(依 RFC 3492 与 IDNA RFC 5890)。本转换器支持双向。",
        "编码使用 RFC 3492 的标准 Punycode bootstring 算法,将任意 Unicode 字符串转为可逆的纯 ASCII 形式。IDNA 编码额外逐标签处理域名(按点分隔)并为每个非 ASCII 标签添加 xn-- 前缀。",
        "全部本机完成——不做 DNS 查询、无网络调用。实现使用久经考验的 punycode 库(Mathias Bynens,Node.js 内建模块的上游),并与 Python 内建 punycode 编解码交叉验证。",
      ],
      steps: [
        "选择编码(Unicode → xn--)或解码(xn-- → Unicode)。",
        "输入域名或 Punycode 字符串。",
        "结果显示在下方并带复制按钮——多标签域名逐标签处理。",
      ],
      faqs: [
        {
          q: "Punycode 与 IDNA 有什么区别?",
          a: "Punycode(RFC 3492)是将 Unicode 编码为 ASCII 的算法。IDNA(RFC 5890)是将 Punycode 应用于域名的框架,通过添加 xn-- 前缀标示该标签是编码的。本工具同时支持原始 Punycode 和 IDNA 编码域名。",
        },
        {
          q: "为什么域名以 xn-- 开头?",
          a: "xn-- 前缀告诉 DNS 解析器和浏览器该标签是 Punycode 编码的 Unicode。没有它,DNS 系统会把标签解释为普通 ASCII 主机名。所有非 ASCII 域名标签必须以 xn-- 开头(依 IDNA)。",
        },
      ],
      deepDive: [
        {
          heading: "RFC 3492 bootstring 算法内幕",
          paragraphs: [
            "Punycode 是一种 bootstring 编码:它把字符串里已有的 ASCII 子集当作自己的字母表,其余字符全部编码为对这个基底的「插入」。每个非 ASCII 字符变成一串数字,说明插入位置与码点跳变量。",
            "增量采用广义可变长度整数:增量越小占用位数越少,并随已处理字符数做偏置修正。这让常用文字保持紧凑——中文只需 fiqs8s,而不是一长串数字。",
            "结果是完全可逆且在 DNS 形式下大小写不敏感,所以注册局接受 中文.com,而全球解析器看到的都是 xn--fiqs8s,根本不知道 Unicode 的存在。",
          ],
        },
        {
          heading: "同形异码攻击:为什么 xn-- 值得多看一眼",
          paragraphs: [
            "安全陷阱在视觉上:西里尔字母 а(U+0430)与拉丁字母 a 渲染完全相同。攻击者注册 xn--80ak6aa92e 风格的域名,看起来与 apple.com 一模一样,却解析到另一台服务器——这就是经典的同形异码(homograph)攻击。",
            "现代浏览器用混合文字检测来缓解——当标签混合了不可能合法共存的文字系统时,直接显示 Punycode 形式。但各浏览器策略与版本不同,所以从聊天、邮件或二维码复制的链接值得核查。",
            "把可疑域名粘贴到这里:如果解码结果使用了你预期之外的文字系统,或 xn-- 标签解码后只是「看起来对」,在验证之前请把该链接视为恶意。",
          ],
        },
      ],
    },
    ja: {
      name: "Punycode・IDN コンバーター",
      tagline:
        "国際化ドメイン名と Punycode(xn-- 形式)の双方向変換 — RFC 3492 ブートストリング符号化、IDNA ラベルごと処理、DNS・ブラウザ・メールで広く使用。無料・即時・オフライン。",
      intro: [
        "国際化ドメイン名(IDN)により、ユーザーは母国語でドメインを登録できます — 中文.com、bücher.de、ログイン.jp。しかし DNS プロトコルは ASCII のみを理解するため、これらのドメインは xn-- プレフィックス付きの Punycode(RFC 3492 と IDNA RFC 5890)として符号化されます。本ツールは双方向に対応します。",
        "符号化は RFC 3492 の標準 Punycode ブートストリング アルゴリズムを使用し、任意の Unicode 文字列を可逆な ASCII 専用形式に変換します。IDNA 符号化はさらにドメインをラベルごとに処理し(ドットで分割)、非 ASCII ラベルに xn-- プレフィックスを追加します。",
        "すべてローカル実行 — DNS クエリなし、ネットワーク呼び出しなし。実装は実績のある punycode ライブラリ(Mathias Bynens、Node.js 内蔵モジュールのアップストリーム)を使用し、Python の内蔵 punycode コーデックとクロス検証済みです。",
      ],
      steps: [
        "エンコード(Unicode → xn--)またはデコード(xn-- → Unicode)を選択。",
        "ドメイン名または Punycode 文字列を入力。",
        "結果が下に表示されコピーボタンが付きます — 複数ラベルのドメインはラベルごとに処理されます。",
      ],
      faqs: [
        {
          q: "Punycode と IDNA の違いは?",
          a: "Punycode(RFC 3492)は Unicode を ASCII に変換するアルゴリズムです。IDNA(RFC 5890)は Punycode をドメイン名に適用するフレームワークで、xn-- プレフィックスを追加して符号化されたラベルを示します。本ツールは両方に対応しています。",
        },
        {
          q: "ドメインが xn-- で始まるのはなぜ?",
          a: "xn-- プレフィックスは、そのラベルが Punycode 符号化された Unicode であることを DNS リゾルバとブラウザに伝えます。これがないと、DNS システムはラベルを通常の ASCII ホスト名として解釈します。すべての非 ASCII ドメインラベルは IDNA により xn-- で始まる必要があります。",
        },
      ],
      deepDive: [
        {
          heading: "RFC 3492 ブートストリング アルゴリズムの内側",
          paragraphs: [
            "Punycode はブートストリング符号化です:文字列に既に存在する ASCII 部分集合を独自のアルファベットとみなし、それ以外の文字をすべてその基底への「挿入」として符号化します。各非 ASCII 文字は、挿入位置とコードポイントの跳び幅を示す数字列になります。",
            "デルタは汎用可変長整数です:小さいデルタほど少ない桁で表現され、処理済み文字数に応じたバイアスが掛かります。これにより常用文字体系はコンパクトに保たれます — 中文は長い数字列ではなく fiqs8s だけで済みます。",
            "結果は完全に可逆で DNS 形式では大文字小文字を区別しません。だから レジストラは 中文.com を受け付け、世界中のリゾルバは Unicode の存在を知ることなく xn--fiqs8s を見ます。",
          ],
        },
        {
          heading: "ホモグラフ攻撃:xn-- をもう一度見るべき理由",
          paragraphs: [
            "セキュリティ上の落とし穴は視覚です:キリル文字 а(U+0430)はラテン文字 a とまったく同じに描画されます。攻撃者は apple.com と見分けがつかないが別のサーバーに解決される xn--80ak6aa92e 形式のドメインを登録します。これが古典的なホモグラフ攻撃です。",
            "近年のブラウザは混在文字検出で緩和します — 正規には共存し得ない文字体系がラベルに混在する場合、Punycode 形式で表示します。ただし方針はブラウザやバージョンにより異なるため、チャット・メール・QR コードからコピーしたリンクは確認する価値があります。",
            "疑わしいドメインをここに貼り付けてください:デコード結果が予想と異なる文字体系を使っていたり、xn-- ラベルのデコード結果が単に「それらしく見える」だけの場合、検証が済むまでそのリンクは敵性と扱ってください。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor Punycode e IDN",
      tagline:
        "Convierta nombres de dominio internacionalizados entre Unicode y Punycode (formato xn--) — codificación bootstring RFC 3492 para IDNA, usado por DNS, navegadores y sistemas de correo en todo el mundo. Gratis, instantáneo, sin conexión.",
      intro: [
        "Los nombres de dominio internacionalizados (IDN) permiten registrar dominios en escrituras nativas — 中文.com, bücher.de, ログイン.jp. Pero el protocolo DNS solo entiende ASCII, así que estos dominios se codifican como Punycode con el prefijo xn-- (según RFC 3492 e IDNA RFC 5890). Este conversor maneja ambas direcciones.",
        "La codificación usa el algoritmo bootstring Punycode estándar de RFC 3492, que convierte cualquier cadena Unicode en una forma ASCII reversible. La codificación IDNA procesa adicionalmente el dominio etiqueta por etiqueta (dividiendo por puntos) y añade el prefijo xn-- a cada etiqueta no ASCII.",
        "Todo se ejecuta localmente — sin consultas DNS, sin llamadas de red. La implementación usa la librería punycode probada en combate (Mathias Bynens, el mismo código que alimenta Node.js), verificada de forma cruzada contra el códec punycode integrado de Python.",
      ],
      steps: [
        "Elija Codificar (Unicode → xn--) o Decodificar (xn-- → Unicode).",
        "Introduzca el nombre de dominio o la cadena Punycode.",
        "El resultado aparece abajo con botón de copia — los dominios de múltiples etiquetas se procesan etiqueta por etiqueta.",
      ],
      faqs: [
        {
          q: "¿Cuál es la diferencia entre Punycode e IDNA?",
          a: "Punycode (RFC 3492) es el algoritmo que convierte Unicode a ASCII. IDNA (RFC 5890) es el marco que aplica Punycode a nombres de dominio, añadiendo el prefijo xn-- para indicar que la etiqueta está codificada. Esta herramienta soporta tanto Punycode crudo como dominios IDNA.",
        },
        {
          q: "¿Por qué el dominio comienza con xn--?",
          a: "El prefijo xn-- indica a los resolutores DNS y navegadores que la etiqueta está codificada en Punycode Unicode. Sin él, el sistema DNS interpretaría la etiqueta como un nombre de host ASCII regular. Todas las etiquetas de dominio no ASCII deben comenzar con xn-- según IDNA.",
        },
      ],
      deepDive: [
        {
          heading: "Dentro del algoritmo bootstring de RFC 3492",
          paragraphs: [
            "Punycode es una codificación bootstring: toma el subconjunto ASCII ya presente en la cadena como su propio alfabeto y codifica todo lo demás como inserciones en esa base. Cada carácter no ASCII se convierte en una secuencia de dígitos que indica dónde insertar y cuánto salta el punto de código.",
            "Los deltas son enteros de longitud variable generalizados: los deltas pequeños usan menos dígitos, con un sesgo según cuántos caracteres se han procesado. Esto mantiene compactas las escrituras comunes — 中文 es simplemente fiqs8s, no una larga serie de dígitos.",
            "El resultado es totalmente reversible e insensible a mayúsculas en su forma DNS, razón por la cual los registras aceptan 中文.com y los resolvedores de todo el mundo ven xn--fiqs8s sin saber que existe Unicode.",
          ],
        },
        {
          heading: "Ataques homógrafos: por qué xn-- merece una segunda mirada",
          paragraphs: [
            "La trampa de seguridad es visual: la а cirílica (U+0430) se representa igual que la a latina. Un atacante registra dominios estilo xn--80ak6aa92e que se ven exactamente como apple.com pero resuelven a otro servidor. Es el clásico ataque homógrafo.",
            "Los navegadores modernos lo mitigan con detección de escrituras mezcladas — muestran la forma Punycode cuando una etiqueta mezcla sistemas de escritura que no pueden coexistir legítimamente. Pero las políticas varían entre navegadores y versiones, así que vale la pena revisar un enlace copiado de un chat, correo o código QR.",
            "Pegue aquí cualquier dominio sospechoso: si la forma decodificada usa un sistema de escritura distinto al esperado, o la etiqueta xn-- se decodifica en algo que solo parece correcto, trate el enlace como hostil hasta verificarlo.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor Punycode e IDN",
      tagline:
        "Converta nomes de domínio internacionalizados entre Unicode e Punycode (formato xn--) — codificação bootstring RFC 3492 para IDNA, usado por DNS, navegadores e sistemas de e-mail mundialmente. Grátis, instantâneo, offline.",
      intro: [
        "Nomes de domínio internacionalizados (IDN) permitem que usuários registrem domínios em seus escritos nativos — 中文.com, bücher.de, ログイン.jp. Mas o protocolo DNS só entende ASCII, então esses domínios são codificados como Punycode com o prefixo xn-- (per RFC 3492 e IDNA RFC 5890). Este conversor lida com ambas as direções.",
        "A codificação usa o algoritmo bootstring Punycode padrão de RFC 3492, que converte qualquer string Unicode em uma forma reversível apenas ASCII. A codificação IDNA adicionalmente processa o domínio etiqueta por etiqueta (dividindo por pontos) e adiciona o prefixo xn-- a cada etiqueta não ASCII.",
        "Tudo roda localmente — sem consultas DNS, sem chamadas de rede. A implementação usa a biblioteca punycode battle-tested (Mathias Bynens, o mesmo código que alimenta o Node.js), verificação cruzada contra o codec punycode integrado do Python.",
      ],
      steps: [
        "Escolha Codificar (Unicode → xn--) ou Decodificar (xn-- → Unicode).",
        "Digite o nome de domínio ou a string Punycode.",
        "O resultado aparece abaixo com botão de cópia — domínios de múltiplas etiquetas são processados etiqueta por etiqueta.",
      ],
      faqs: [
        {
          q: "Qual é a diferença entre Punycode e IDNA?",
          a: "Punycode (RFC 3492) é o algoritmo que converte Unicode para ASCII. IDNA (RFC 5890) é o framework que aplica Punycode a nomes de domínio, adicionando o prefixo xn-- para sinalizar que a etiqueta está codificada. Esta ferramenta suporta tanto Punycode cru quanto domínios IDNA.",
        },
        {
          q: "Por que o domínio começa com xn--?",
          a: "O prefixo xn-- informa aos resolvedores DNS e navegadores que a etiqueta é Unicode codificada em Punycode. Sem ele, o sistema DNS interpretaria a etiqueta como um nome de host ASCII regular. Todas as etiquetas de domínio não ASCII devem começar com xn-- por IDNA.",
        },
      ],
      deepDive: [
        {
          heading: "Dentro do algoritmo bootstring do RFC 3492",
          paragraphs: [
            "Punycode é uma codificação bootstring: toma o subconjunto ASCII já presente na string como seu próprio alfabeto e codifica todo o resto como inserções nessa base. Cada caractere não ASCII vira uma sequência de dígitos que indica onde inserir e quanto o ponto de código salta.",
            "Os deltas são inteiros de comprimento variável generalizados: deltas menores usam menos dígitos, com um viés conforme a quantidade de caracteres já processados. Isso mantém as escritas comuns compactas — 中文 é simplesmente fiqs8s, não uma longa sequência de dígitos.",
            "O resultado é totalmente reversível e insensível a maiúsculas na forma DNS, razão pela qual registros aceitam 中文.com e resolvedores no mundo inteiro veem xn--fiqs8s sem nunca saber que Unicode existe.",
          ],
        },
        {
          heading: "Ataques homógrafos: por que xn-- merece uma segunda olhada",
          paragraphs: [
            "A pegadinha de segurança é visual: o а cirílico (U+0430) é renderizado idêntico ao a latino. Um atacante registra domínios no estilo xn--80ak6aa92e que parecem exatamente apple.com mas resolvem para outro servidor. É o clássico ataque homógrafo.",
            "Navegadores modernos mitigam isso com detecção de escrituras misturadas — exibem a forma Punycode quando um rótulo mistura sistemas de escritura que não podem coexistir legitimamente. Mas as políticas variam entre navegadores e versões, então um link copiado de chat, e-mail ou código QR vale a pena verificar.",
            "Cole qualquer domínio suspeito aqui: se a forma decodificada usa um sistema de escrita diferente do esperado, ou o rótulo xn-- decodifica para algo que apenas parece certo, trate o link como hostil até verificar.",
          ],
        },
      ],
    },
  },
});
