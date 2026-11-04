import { DevUuidEngine } from "../_engines/dev-engine-uuid";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "uuid-generator",
  category: "developer",
  icon: "shuffle",
  engine: { component: DevUuidEngine },
  related: ["hash-generator", "md5-generator", "sha256-generator", "base64-image", "json-validator", "json-formatter", "url-encoder", "html-minifier", "url-decoder", "json-path-query"],
  copy: {
    en: {
      name: "UUID Generator",
      tagline:
        "Generate random UUID v4 identifiers in bulk with one click — 1 to 500 at a time, using your browser's cryptographic randomness. Free, instant, offline-capable.",
      intro: [
        "Create version 4 UUIDs in whatever quantity you need: test fixtures, database seeds, file names, request IDs or API key drafts. Each identifier is produced by crypto.randomUUID, the browser's cryptographically secure random source, so batches are unpredictable and safe to use as unguessable resource identifiers.",
        "A v4 UUID is 122 random bits plus 6 fixed version/variant bits, formatted as the canonical 8-4-4-4-12 hexadecimal layout (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx). The version nibble is always 4 and the top bits of the third group are 8, 9, a or b — quick tells that an identifier is a well-formed v4.",
        "The format comes from RFC 4122, updated in 2024 by RFC 9562 which added v6/v7/v8 — v4 itself is unchanged. With 2^122 possible values, the collision probability across a full batch is far below anything measurable: you would need to generate tens of billions of UUIDs to have even a one-in-a-billion chance of a duplicate.",
        "Unlike time-based versions (v1/v6/v7), v4 carries no timestamp or MAC address and leaks nothing about when or where it was created — the page tells you exactly that, plus when your batch was generated. Compared with counting integers or random strings, UUIDs need no central coordinator and can be generated on any device without conflicts.",

      ],
      steps: [
        "Set how many UUIDs you need (1–500).",
        "Click Generate — the list appears instantly.",
        "Copy all of them at once, or clear and generate a fresh batch.",
      ],
      faqs: [
        {
          q: "Can two generated UUIDs ever collide?",
          a: "Theoretically yes, practically no. With 122 random bits, generating a collision requires on the order of 10^36 UUIDs — far beyond any realistic workload.",
        },
        {
          q: "Why choose v4 instead of UUID v1 or v7?",
          a: "v4 leaks no timing or hardware information and needs no clock or MAC address. If you need database-index-friendly, time-sortable IDs, look at v7 — but for plain uniqueness, v4 is the standard choice.",
        },
        {
          q: "Are the UUIDs generated on a server?",
          a: "No. They come from your own browser's cryptographic random generator and never leave your device.",
        },
      ],
    },
    zh: {
      name: "UUID 生成器",
      tagline: "一键批量生成随机 UUID v4 标识符——每次 1 到 500 个,使用浏览器密码学安全随机源。免费即时,离线可用。",
      intro: [
        "按需生成 RFC 4122 第 4 版 UUID:测试数据、数据库种子、文件名、请求 ID 或 API key 草稿。每个标识符都来自 crypto.randomUUID,即浏览器内置的密码学安全随机源——122 位随机,碰撞概率在实际中永远不会遇到。",
        "与基于时间的 v1/v6/v7 不同,v4 不含时间戳,不会泄露创建时间和地点——页面会明确说明这一点,并显示本批次生成的时间。",
      ],
      steps: [
        "设置需要的 UUID 数量(1–500)。",
        "点击生成——列表立即出现。",
        "一次性全部复制,或清空后重新生成一批。",
      ],
      faqs: [
        {
          q: "生成的 UUID 会重复吗?",
          a: "理论上可能,实际上不会。122 位随机意味着需要约 10^36 个 UUID 才可能撞上——远超任何现实工作负载。",
        },
        {
          q: "为什么选 v4 而不是 v1 或 v7?",
          a: "v4 不泄露时间或硬件信息,也不依赖时钟或 MAC 地址。如果需要适合数据库索引、按时间排序的 ID,可以考虑 v7;但只论唯一性,v4 是标准选择。",
        },
        {
          q: "UUID 是在服务器上生成的吗?",
          a: "不是。它们来自你自己浏览器的密码学随机生成器,不会离开你的设备。",
        },
      ],
    },
    ja: {
      name: "UUID ジェネレーター",
      tagline:
        "ランダムな UUID v4 をワンクリックで一括生成 — 1〜500 個ずつ、ブラウザの暗号学的乱数を使用。無料・即時・オフライン対応です。",
      intro: [
        "必要な数だけ RFC 4122 version 4 の UUID を生成:テストフィクスチャ、DB シード、ファイル名、リクエスト ID、API キーの下書きなど。各識別子は crypto.randomUUID、つまりブラウザの暗号学的に安全な乱数源から作られます。122 ビットのランダム性で、実務では衝突を気にする必要がありません。",
        "時間ベースの v1/v6/v7 と異なり、v4 はタイムスタンプを含まず、作成時刻や場所を漏らしません。このページではその点と、バッチの生成時刻を明示します。",
      ],
      steps: [
        "必要な UUID の個数を設定します(1〜500)。",
        "Generate をクリック — リストが即座に表示されます。",
        "一括でコピーするか、クリアして新しいバッチを生成します。",
      ],
      faqs: [
        {
          q: "生成した UUID が重複することはありますか?",
          a: "理論上はありますが、実際にはありません。122 ビットのランダム性では、衝突には 10^36 個程度の生成が必要です — 現実の workload をはるかに超えています。",
        },
        {
          q: "v1 や v7 ではなく v4 を選ぶ理由は?",
          a: "v4 は時刻やハードウェアの情報を漏らさず、時計や MAC アドレスも不要です。DB のインデックスに優しい時刻順 ID が必要なら v7 を検討してください。単純な一意性なら v4 が標準です。",
        },
        {
          q: "UUID はサーバーで生成されますか?",
          a: "いいえ。あなたのブラウザの暗号学的乱数生成器から作られ、端末の外には出ません。",
        },
      ],
    },
    es: {
      name: "Generador UUID",
      tagline:
        "Genera identificadores UUID v4 aleatorios en lote con un clic — de 1 a 500 cada vez, con la aleatoriedad criptográfica del navegador. Gratis e instantáneo.",
      intro: [
        "Crea UUID versión 4 (RFC 4122) en la cantidad que necesites: fixtures de prueba, semillas de base de datos, nombres de archivo, IDs de petición o borradores de claves API. Cada identificador sale de crypto.randomUUID, la fuente aleatoria criptográfica del navegador — 122 bits aleatorios, con colisiones que jamás verás en la práctica.",
        "A diferencia de las versiones basadas en tiempo (v1/v6/v7), v4 no lleva marca de tiempo ni filtra cuándo o dónde se creó — la página te lo aclara, junto con cuándo se generó tu lote.",
      ],
      steps: [
        "Indica cuántos UUID necesitas (1–500).",
        "Pulsa Generate — la lista aparece al instante.",
        "Cópialos todos de una vez, o borra y genera un lote nuevo.",
      ],
      faqs: [
        {
          q: "¿Pueden coincidir dos UUID generados?",
          a: "En teoría sí; en la práctica no. Con 122 bits aleatorios, hacer colisionar dos exige del orden de 10^36 UUID — muy por encima de cualquier carga de trabajo real.",
        },
        {
          q: "¿Por qué elegir v4 en lugar de v1 o v7?",
          a: "v4 no filtra información temporal ni de hardware y no depende de reloj ni MAC. Si necesitas IDs ordenables por tiempo y amables con el índice de la BD, mira v7 — para unicidad a secas, v4 es el estándar.",
        },
        {
          q: "¿Los UUID se generan en un servidor?",
          a: "No. Salen del generador aleatorio criptográfico de tu propio navegador y nunca salen de tu dispositivo.",
        },
      ],
    },
    pt: {
      name: "Gerador UUID",
      tagline:
        "Gere identificadores UUID v4 aleatórios em lote com um clique — de 1 a 500 por vez, usando a aleatoriedade criptográfica do navegador. Grátis e instantâneo.",
      intro: [
        "Crie UUIDs versão 4 (RFC 4122) na quantidade que precisar: fixtures de teste, seeds de banco de dados, nomes de arquivo, IDs de requisição ou rascunhos de chaves de API. Cada identificador vem de crypto.randomUUID, a fonte de aleatoriedade criptográfica do navegador — 122 bits aleatórios, com colisões que você nunca verá na prática.",
        "Diferente das versões baseadas em tempo (v1/v6/v7), o v4 não contém timestamp e não vaza quando nem onde foi criado — a página deixa isso claro e mostra quando o lote foi gerado.",
      ],
      steps: [
        "Defina quantos UUIDs você precisa (1–500).",
        "Clique em Generate — a lista aparece na hora.",
        "Copie todos de uma vez, ou limpe e gere um lote novo.",
      ],
      faqs: [
        {
          q: "Dois UUIDs gerados podem colidir?",
          a: "Teoricamente sim; na prática não. Com 122 bits aleatórios, uma colisão exige da ordem de 10^36 UUIDs — muito além de qualquer carga de trabalho real.",
        },
        {
          q: "Por que escolher v4 em vez de v1 ou v7?",
          a: "O v4 não vaza informação de tempo ou de hardware e não depende de relógio nem MAC. Se precisar de IDs ordenáveis por tempo e amigáveis ao índice do banco, veja o v7 — para unicidade pura, o v4 é o padrão.",
        },
        {
          q: "Os UUIDs são gerados num servidor?",
          a: "Não. Eles vêm do gerador aleatório criptográfico do seu próprio navegador e nunca saem do seu dispositivo.",
        },
      ],
    },
  },
});
