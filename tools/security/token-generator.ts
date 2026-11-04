import { DevEngineTokenGenerator } from "../_engines/dev-engine-token";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "token-generator",
  category: "security",
  icon: "key",
  engine: { component: DevEngineTokenGenerator },
  related: ["password-generator", "password-strength", "uuid-generator", "ulid-generator", "totp-generator", "hmac-generator", "sha256-generator"],
  copy: {
    en: {
      name: "Token Generator",
      tagline: "Generate cryptographically random API tokens, session IDs and secrets in your browser — crypto.getRandomValues, batch output, entropy shown per token.",
      intro: [
        "API keys, bearer tokens, webhook secrets, session identifiers, CSV export nonces — most of them are just random strings, and the wrong way to make them is Math.random(). This generator uses crypto.getRandomValues, the browser's cryptographic random source, so every token is uniformly drawn from its character set with no predictable bias.",
        "Choose a length from 8 to 128 characters, a character set (alphanumeric, hex, or alphanumeric plus URL-safe symbols), an optional prefix for grep-ability in logs, and generate up to 50 at once — useful when seeding test fixtures or provisioning multiple services. The estimated entropy in bits is shown for the current settings, so you can see that a 32-character alphanumeric token carries ~190 bits.",
        "Tokens are generated in memory and never transmitted: reload the page and they are gone. That makes the tool safe for production secrets, not just test data — though for anything long-lived, a password manager or secret store remains the right place to keep them.",
      ],
      steps: [
        "Set the length, character set, optional prefix and how many tokens you need.",
        "Click Generate — the tokens appear as a list, each with a one-click copy button.",
        "Click Refresh for a new batch; copy the ones you need before leaving the page.",
      ],
      faqs: [
        {
          q: "Is this safe for production API keys?",
          a: "Yes. crypto.getRandomValues is the same CSPRNG that TLS and password managers rely on, and generation happens entirely in your browser's memory — nothing is sent over the network or persisted. The theoretical security of the token equals the entropy shown, so pick a length that matches your threat model.",
        },
        {
          q: "How long should my token be?",
          a: "For internal API keys and session IDs, 32 alphanumeric characters (~190 bits) is far beyond brute-force reach. Hex tokens are popular because they map to bytes exactly: 32 hex characters = 16 random bytes. Symbols add entropy per character but can break systems that don't URL-encode headers — use them only where the consumer handles them.",
        },
        {
          q: "Token vs UUID vs ULID — which one?",
          a: "Use opaque random tokens (this tool) when the identifier must be unguessable: API keys, session tokens, webhook secrets. UUIDs/ULIDs are for identifiers that may need to be generated in parallel or sorted by time — they leak timing or count information and should not carry security weight. If you need a sortable ID instead of a secret, use the ULID generator.",
        },
      ],
    },
    zh: {
      name: "Token 生成器",
      tagline: "在浏览器里生成密码学安全的 API Token、会话 ID 和密钥——crypto.getRandomValues 驱动,支持批量生成,实时显示每个 Token 的熵。",
      intro: [
        "API 密钥、Bearer Token、webhook 密钥、会话 ID、导出文件随机名——大多数就是一串随机字符,而错误的生成方式是 Math.random()。本工具使用 crypto.getRandomValues(浏览器的密码学随机源),每个 Token 都从字符集中均匀抽取,没有任何可预测偏差。",
        "可选 8–128 位长度、字符集(字母数字/十六进制/加 URL 安全符号)、可选前缀(方便在日志里 grep),一次最多生成 50 个——批量造测试数据或同时给多个服务发密钥时很方便。当前设置下每个 Token 的估算熵(比特)会实时显示,比如 32 位字母数字约 190 比特。",
        "Token 只在内存里生成、从不传输:刷新页面即消失。因此它不仅能造测试数据,生产密钥也安全——不过长期使用的密钥,最终归宿还是密码管理器或密钥管理服务。",
      ],
      steps: [
        "设置长度、字符集、可选前缀和生成数量。",
        "点击生成——Token 以列表显示,每个都有一键复制按钮。",
        "点「换一批」重新生成;离开页面前把需要的复制走。",
      ],
      faqs: [
        {
          q: "能用来生成生产环境的 API 密钥吗?",
          a: "可以。crypto.getRandomValues 与 TLS、密码管理器用的是同一类密码学安全随机源,且生成完全发生在浏览器内存里——不经过网络、不留存。Token 的理论强度就是显示的熵值,按你的威胁模型选长度即可。",
        },
        {
          q: "Token 应该多长?",
          a: "内部 API 密钥和会话 ID 用 32 位字母数字(约 190 比特)已经远超暴力破解范围。十六进制 Token 流行的原因是与字节精确对应:32 个十六进制字符 = 16 个随机字节。符号能提高单字符熵,但遇到不做 URL 编码的系统会出问题——只在消费方能处理时使用。",
        },
        {
          q: "Token、UUID、ULID 怎么选?",
          a: "需要不可猜测时用不透明随机 Token(API 密钥、会话、webhook 密钥)。UUID/ULID 适合并行生成或按时间排序的标识符——它们会泄露时序或数量信息,不应承担安全职责。要可排序 ID 而非密钥,用 ULID 生成器。",
        },
      ],
    },
    ja: {
      name: "トークンジェネレーター",
      tagline: "ブラウザ内で暗号学的に安全な API トークン・セッション ID を生成 — crypto.getRandomValues 使用、一括生成対応、トークンごとのエントロピーを表示。",
      intro: [
        "API キー、Bearer トークン、webhook シークレット、セッション ID、エクスポート用ナンス — その多くは単なるランダム文字列であり、誤った生成方法は Math.random() です。このツールはブラウザの暗号学的乱数源 crypto.getRandomValues を使用し、各トークンを文字集合から偏りなく一様に抽出します。",
        "長さ 8〜128 文字、文字集合(英数字 / 16 進 / URL 安全な記号付き)、ログ検索用の接頭辞を指定でき、最大 50 個を一括生成 — テストデータの投入や複数サービスへのキー発行に便利です。現在の設定での推定エントロピー(ビット)をリアルタイム表示します(例:32 文字の英数字で約 190 ビット)。",
        "トークンはメモリ上で生成され送信されません:ページを再読み込みすれば消えます。テストデータだけでなく本番用シークレットにも安全ですが、長期利用する鍵の最終的な保管先はパスワードマネージャーやシークレットストアです。",
      ],
      steps: [
        "長さ・文字集合・接頭辞(任意)・生成数を設定します。",
        "生成をクリック — トークンがリスト表示され、各項目にワンクリックコピーが付きます。",
        "「再生成」で新しいバッチに切り替え;必要なものをコピーしてからページを離れます。",
      ],
      faqs: [
        {
          q: "本番環境の API キーに使えますか?",
          a: "はい。crypto.getRandomValues は TLS やパスワードマネージャーと同じクラスの CSPRNG で、生成は完全にブラウザのメモリ内で行われます — ネットワーク送信も保存もありません。トークンの理論強度は表示されたエントロピーそのものなので、脅威モデルに応じた長さを選んでください。",
        },
        {
          q: "トークンの長さはどれくらいが適切?",
          a: "内部 API キーやセッション ID なら 32 文字の英数字(約 190 ビット)でブルートフォースの範囲を遥かに超えます。16 進トークンが好まれるのはバイトと正確に対応するからです:32 文字の 16 進 = 16 ランダムバイト。記号を加えると文字あたりのエントロピーは増えますが、URL エンコードしないシステムでは壊れることがあります。",
        },
        {
          q: "トークン・UUID・ULID の使い分けは?",
          a: "推測されては困る識別子(API キー、セッショントークン、webhook シークレット)には不透明なランダムトークン(このツール)を使います。UUID/ULID は並列生成や時刻順ソートが必要な識別子向けで、時序や個数の情報が漏れるためセキュリティ用途には向きません。ソート可能な ID が必要なら ULID ジェネレーターを。",
        },
      ],
    },
    es: {
      name: "Generador de Tokens",
      tagline: "Genera tokens de API, IDs de sesión y secretos criptográficamente aleatorios en tu navegador — con crypto.getRandomValues, salida por lotes y entropía mostrada por token.",
      intro: [
        "Claves de API, bearer tokens, secretos de webhook, identificadores de sesión, nonces de exportación — la mayoría son solo cadenas aleatorias, y la forma incorrecta de crearlas es Math.random(). Este generador usa crypto.getRandomValues, la fuente criptográfica del navegador, así que cada token sale de su conjunto de caracteres sin sesgo predecible.",
        "Elige longitud de 8 a 128 caracteres, conjunto de caracteres (alfanumérico, hexadecimal, o alfanumérico más símbolos seguros para URL), un prefijo opcional para poder grep-ear en logs, y genera hasta 50 de una vez — útil al sembrar datos de prueba o aprovisionar varios servicios. La entropía estimada en bits se muestra en vivo para la configuración actual: un token de 32 caracteres alfanuméricos lleva ~190 bits.",
        "Los tokens se generan en memoria y nunca se transmiten: al recargar la página desaparecen. Eso lo hace seguro para secretos de producción, no solo datos de prueba — aunque lo que vive mucho tiempo belongs en un gestor de contraseñas o un almacén de secretos.",
      ],
      steps: [
        "Configura longitud, conjunto de caracteres, prefijo opcional y cuántos tokens necesitas.",
        "Pulsa Generar — los tokens aparecen en lista, cada uno con botón de copia en un clic.",
        "Pulsa Actualizar para un lote nuevo; copia los que necesites antes de salir de la página.",
      ],
      faqs: [
        {
          q: "¿Es seguro para claves de API de producción?",
          a: "Sí. crypto.getRandomValues es el mismo CSPRNG en el que confían TLS y los gestores de contraseñas, y la generación ocurre por completo en la memoria del navegador — nada viaja por la red ni se guarda. La seguridad teórica del token equivale a la entropía mostrada: elige una longitud acorde a tu modelo de amenazas.",
        },
        {
          q: "¿Cuánto debe medir mi token?",
          a: "Para claves internas e IDs de sesión, 32 caracteres alfanuméricos (~190 bits) sobra con creces frente a la fuerza bruta. Los tokens hexadecimales gustan porque mapean a bytes exactos: 32 caracteres hex = 16 bytes aleatorios. Los símbolos añaden entropía por carácter pero rompen sistemas que no codifican URL en las cabeceras — úsalos solo si el consumidor los maneja.",
        },
        {
          q: "¿Token, UUID o ULID?",
          a: "Usa tokens aleatorios opacos (esta herramienta) cuando el identificador debe ser imposible de adivinar: claves de API, sesiones, secretos de webhook. UUID/ULID son para identificadores generados en paralelo u ordenables por tiempo — filtran información de ritmo o de conteo y no deben cargar peso de seguridad. Si necesitas un ID ordenable en vez de un secreto, usa el generador ULID.",
        },
      ],
    },
    pt: {
      name: "Gerador de Tokens",
      tagline: "Gere tokens de API, IDs de sessão e segredos criptograficamente aleatórios no navegador — crypto.getRandomValues, saída em lote e entropia exibida por token.",
      intro: [
        "Chaves de API, bearer tokens, segredos de webhook, identificadores de sessão, nonces de exportação — a maioria é apenas uma sequência aleatória, e o jeito errado de criá-las é Math.random(). Este gerador usa crypto.getRandomValues, a fonte criptográfica do navegador, então cada token é extraído do conjunto de caracteres sem viés previsível.",
        "Escolha o comprimento de 8 a 128 caracteres, o conjunto (alfanumérico, hexadecimal, ou alfanumérico com símbolos seguros para URL), um prefixo opcional para facilitar o grep em logs, e gere até 50 de uma vez — útil ao semear dados de teste ou provisionar vários serviços. A entropia estimada em bits aparece em tempo real para a configuração atual: um token de 32 caracteres alfanuméricos carrega ~190 bits.",
        "Os tokens são gerados na memória e nunca transmitidos: recarregar a página e eles somem. Isso torna a ferramenta segura para segredos de produção, não apenas dados de teste — embora o destino final de segredos duradouros seja um gerenciador de senhas ou cofre de segredos.",
      ],
      steps: [
        "Defina comprimento, conjunto de caracteres, prefixo opcional e quantos tokens precisa.",
        "Clique em Gerar — os tokens aparecem em lista, cada um com botão de copiar em um clique.",
        "Clique em Atualizar para um novo lote; copie os que precisar antes de sair da página.",
      ],
      faqs: [
        {
          q: "É seguro para chaves de API de produção?",
          a: "Sim. crypto.getRandomValues é o mesmo CSPRNG usado por TLS e gerenciadores de senhas, e a geração acontece inteiramente na memória do navegador — nada trafega pela rede nem é persistido. A segurança teórica do token equivale à entropia exibida: escolha um comprimento compatível com seu modelo de ameaças.",
        },
        {
          q: "Qual deve ser o tamanho do token?",
          a: "Para chaves internas e IDs de sessão, 32 caracteres alfanuméricos (~190 bits) estão muito além do alcance de força bruta. Tokens hexadecimais são populares por mapearem bytes exatos: 32 caracteres hex = 16 bytes aleatórios. Símbolos aumentam a entropia por caractere mas quebram sistemas que não fazem URL-encode de cabeçalhos — use apenas se o consumidor os tratar.",
        },
        {
          q: "Token, UUID ou ULID?",
          a: "Use tokens aleatórios opacos (esta ferramenta) quando o identificador precisa ser inadivinhável: chaves de API, sessões, segredos de webhook. UUID/ULID são para identificadores gerados em paralelo ou ordenáveis por tempo — vazam informação de tempo ou contagem e não devem carregar peso de segurança. Se precisa de um ID ordenável em vez de segredo, use o gerador ULID.",
        },
      ],
    },
  },
});
