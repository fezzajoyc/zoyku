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
    },
  },
});
