import { DevHashEngine } from "../_engines/dev-engine-hash";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "md5-generator",
  category: "developer",
  icon: "hash",
  engine: { component: DevHashEngine, props: { algos: ["MD5"] } },
  related: ["sha256-generator", "hash-generator", "base64-encoder", "base64-image", "json-validator", "json-formatter", "url-encoder", "html-minifier", "url-decoder", "json-path-query"],
  copy: {
    en: {
      name: "MD5 Generator",
      tagline:
        "Generate MD5 hashes of any text or file instantly in your browser — perfect for checksums, dedup keys and legacy integrations. One-way, never uploaded.",
      intro: [
        "Comparing a download against the checksum a mirror publishes, generating keys for a cache or dedup table, or integrating with a legacy system that still expects MD5 — paste text or drop a file and the 128-bit digest appears instantly, computed locally.",
        "Output is 32 lowercase hexadecimal characters, updating as you type; file hashing stays on your device, so nothing is uploaded. The implementation follows RFC 1321 and matches md5sum and every other conformant tool.",
        "MD5 (Rivest, 1991) compresses input through a Merkle-Damgard construction into a 128-bit digest. It is fast by design — exactly why it survives in checksums, content addressing and non-cryptographic fingerprints.",
        "Cryptographically, though, it is broken: practical collisions have existed since 2004, and the 2012 Flame malware forged a Microsoft code-signing certificate with an MD5 collision. Use it for compatibility and integrity checks only — for signatures or password storage, move to SHA-256 or a dedicated password hash."
      ],
      steps: [
        "Type or paste the text — the MD5 digest updates live.",
        "Or switch to File mode and drop a file to hash it locally.",
        "Copy the hexadecimal digest and compare it with the expected checksum.",
      ],
      faqs: [
        {
          q: "Is MD5 safe for storing passwords?",
          a: "No — not even close. MD5 is fast by design and collision attacks are practical, which makes cracking MD5 password hashes trivial. Use a dedicated password hashing scheme such as bcrypt, scrypt or Argon2 instead.",
        },
        {
          q: "What is MD5 still good for?",
          a: "Non-adversarial integrity: verifying a file survived a transfer, deduplicating content, cache keys and talking to legacy systems that expect it. For security-relevant checks use SHA-256 or better.",
        },
        {
          q: "Are my text and files sent to a server?",
          a: "No. Everything runs in your browser; even files are read and hashed entirely on your device.",
        },
      ],
      deepDive: [
        {
          heading: "Why MD5 is broken — and why it still survives",
          paragraphs: [
            "MD5 was designed by Ron Rivest in 1991 as a fast 128-bit message digest, and for a decade it was the default hash of the web. That speed was its selling point — and eventually its undoing. Because it processes data quickly, attackers can try enormous numbers of inputs per second, and because its internal structure has known weaknesses, they do not even need brute force to break its collision resistance.",
            "The collision resistance of MD5 collapsed in stages through the mid-2000s: researchers demonstrated practical collision techniques, and the 2012 Flame malware famously used an MD5 collision to forge a Microsoft code-signing certificate. Since then, no serious security protocol accepts MD5 for signatures, certificates or authentication.",
            "Yet MD5 has not disappeared, and that is fine as long as you understand the distinction: a collision attack lets an attacker craft two different inputs with the same hash, but it does not help them reverse a hash or tamper with a file undetected in every setting. Verifying that a large download matches a checksum published by the same trusted source is non-adversarial — no one is crafting collisions against you. For that job, MD5 remains perfectly serviceable; for anything where an attacker chooses part of the input, it is not.",
          ],
        },
        {
          heading: "Using checksums correctly",
          paragraphs: [
            "A checksum comparison is only as trustworthy as the source of the expected value. When a project publishes an MD5 alongside a download, the checksum is meant to detect corruption in transit — a truncated transfer, a bad mirror, a scratched disc. If the checksum itself comes from an untrusted channel, an attacker who can swap the file can swap the checksum too, and MD5 will happily confirm the forgery.",
            "Case sensitivity trips people up more than it should: some tools print uppercase hex, some lowercase. The digests are identical — A3F… and a3f… are the same number in a different notation — so compare case-insensitively or normalize before declaring a mismatch. A trailing newline in the input is the other classic gotcha: hashing a text file that ends with a newline gives a different digest than hashing the same characters without it, which is why our text mode hashes exactly the characters you provide.",
            "For dedup keys and cache busters, MD5's speed is a feature, not a compromise. Generating a 32-character key from a blob of content is cheap and stable across runs, languages and platforms — the same RFC 1321 algorithm produces the same output whether you call it from JavaScript here, md5sum on Linux, or a library in your backend.",
          ],
        },
        {
          heading: "Everything runs on your device",
          paragraphs: [
            "Hashing is exactly the kind of operation you do not want to outsource: the whole point of checking a file is often that you do not fully trust the network it came from. Sending that same file to an unknown web server to be hashed would defeat the purpose. This tool therefore computes MD5 entirely in your browser — text is hashed as you type, and files are read locally with the browser's file API, never uploaded.",
            "That local design has practical benefits beyond privacy: there is no upload time, no size gate and no server queuing. A multi-gigabyte ISO image takes as long as reading it from disk takes and works offline once the page is loaded.",
            "For anything security-critical, pair this tool with SHA-256 — our SHA-256 generator uses the same local workflow, and the hash-generator page lets you compute several algorithms side by side so you can publish both digests for your users.",
          ],
        },
      ],
    },
    zh: {
      name: "MD5 生成器",
      tagline: "在浏览器里即时计算文本或文件的 MD5 哈希——校验和、去重键、老系统对接都好用。单向不可逆,数据不上传。",
      intro: [
        "输入文本即可实时看到 128 位 MD5 摘要,或直接拖入文件生成指纹,一个字节都不会上传。哈希在本地用成熟的 MD5 JavaScript 实现完成。",
        "MD5 仍然无处不在:下载校验和、文件去重键、缓存刷新、老系统集成。但要记住它不适合什么——MD5 在密码学上已被攻破,绝不要用于密码、签名或任何攻击者可能篡改的场景。",
      ],
      steps: [
        "输入或粘贴文本——MD5 摘要实时更新。",
        "也可切换到文件模式,拖入文件在本地计算。",
        "复制十六进制摘要,与预期校验和比对。",
      ],
      faqs: [
        {
          q: "MD5 适合存密码吗?",
          a: "完全不适合。MD5 的设计目标就是快,碰撞攻击已经实用化,破解 MD5 密码哈希轻而易举。存密码请用 bcrypt、scrypt 或 Argon2 这类专门的口令哈希方案。",
        },
        {
          q: "MD5 还适合什么场景?",
          a: "非对抗性的完整性:确认文件传输无损、内容去重、缓存键,以及对接仍然要求 MD5 的老系统。涉及安全的校验请用 SHA-256 或更强算法。",
        },
        {
          q: "文本和文件会被发送到服务器吗?",
          a: "不会。一切都在浏览器中完成,文件也完全在你的设备上读取和计算。",
        },
      ],
      deepDive: [
        {
          heading: "MD5 为什么被攻破,却又一直活着",
          paragraphs: [
            "MD5 由 Ron Rivest 在 1991 年设计,输出 128 位摘要,曾十年间是互联网的默认哈希。它的卖点就是快——而快正是它垮掉的原因:处理速度越快,攻击者每秒能尝试的输入就越多;加上内部结构存在已知弱点,攻破它的抗碰撞性甚至不需要暴力枚举。",
            "MD5 的抗碰撞能力在 2000 年代中期分阶段瓦解:研究者演示了实用的碰撞构造方法,2012 年的 Flame 恶意软件更是利用 MD5 碰撞伪造了微软的代码签名证书。从那以后,任何严肃的安全协议都不再接受 MD5 用于签名、证书或身份认证。",
            "但 MD5 并没有消失——只要分清界限,它仍然可用:碰撞攻击允许攻击者构造出两个哈希相同的输入,却不能帮你反推哈希,也不意味着任何场景下都能篡改文件而不被察觉。校验一个大文件下载是否与可信来源发布的校验和一致,是非对抗性的——没有人针对你构造碰撞。这类工作交给 MD5 完全没问题;但凡攻击者能参与选择输入,就不行。",
          ],
        },
        {
          heading: "校验和要怎么比才靠谱",
          paragraphs: [
            "校验和比对的可信度,取决于预期值的来源。项目在下载页发布 MD5,目的通常是发现传输损坏——下载中断、镜像出错。但如果校验和本身来自不可信的渠道,能替换文件的攻击者同样能替换校验和,MD5 会欣然确认这个伪造结果。",
            "大小写问题比想象中常见:有的工具输出大写十六进制,有的输出小写。摘要完全相同——A3F… 和 a3f… 是同一个数的两种写法——比对时忽略大小写或统一后再下结论。另一个经典坑是末尾换行:带换行的文本和不带的,摘要完全不同,这也是本工具文本模式对你输入的字符逐字节精确计算的原因。",
            "做去重键和缓存刷新时,MD5 的快是优点而非妥协。从内容生成 32 字符的键便宜且跨次稳定,无论用这里的 JavaScript、Linux 的 md5sum 还是后端库,同一套 RFC 1321 算法给出相同输出。",
          ],
        },
        {
          heading: "一切都在你的设备上完成",
          paragraphs: [
            "哈希恰恰是最不该外包的操作:校验文件的初衷往往就是不完全信任它来自的那个网络。把同一个文件再传给一个陌生服务器去算哈希,等于白校验。所以本工具完全在浏览器内计算 MD5——文本边输入边算,文件用浏览器的文件 API 在本地读取,一个字节都不上传。",
            "本地设计带来的好处不只是隐私:没有上传等待、没有体积限制、没有服务器排队。几个 GB 的镜像文件,耗时就是读盘的耗时,页面加载后离线也能用。",
            "涉及安全的场景请搭配 SHA-256 使用——我们的 SHA-256 生成器是同样的本地流程,哈希生成器页面还能并排计算多种算法,方便你同时发布两种摘要给用户。",
          ],
        },
      ],
    },
    ja: {
      name: "MD5 ジェネレーター",
      tagline:
        "テキストやファイルの MD5 ハッシュをブラウザ内で即座に生成 — チェックサム・重複排除キー・レガシー連携に最適。一方向で未アップロード。",
      intro: [
        "テキストを入力すれば 128 ビットの MD5 ダイジェストがリアルタイムに表示され、ファイルをドロップすれば 1 バイトもアップロードせずにフィンガープリントを作れます。ハッシュ計算は成熟した MD5 の JavaScript 実装でローカルに行われます。",
        "MD5 は今もあちこちにあります:ダウンロードのチェックサム、ファイルの重複排除、キャッシュバスター、レガシーシステムとの連携。ただし「何に向かないか」も覚えておいてください。MD5 は暗号学的に破られており、パスワードや署名、攻撃者が改ざんできるものには絶対に使わないでください。",
      ],
      steps: [
        "テキストを入力・貼り付け — MD5 ダイジェストがリアルタイムに更新されます。",
        "またはファイルモードに切り替え、ファイルをドロップしてローカルでハッシュ化。",
        "16 進ダイジェストをコピーし、期待されるチェックサムと比較します。",
      ],
      faqs: [
        {
          q: "MD5 はパスワード保存に安全ですか?",
          a: "まったく安全ではありません。MD5 は設計上高速で、衝突攻撃は実用段階です。MD5 のパスワードハッシュの解読は容易です。パスワードには bcrypt・scrypt・Argon2 などの専用方式を使ってください。",
        },
        {
          q: "MD5 がまだ役立つ場面は?",
          a: "非対称性のない整合性確認:ファイルが転送で壊れていないかの確認、コンテンツの重複排除、キャッシュキー、MD5 を要求するレガシーシステム。セキュリティに関わる検証には SHA-256 以上を使います。",
        },
        {
          q: "テキストやファイルはサーバーに送られますか?",
          a: "いいえ。すべてブラウザ内で完結し、ファイルも完全に端末上で読み込まれハッシュ化されます。",
        },
      ],
      deepDive: [
        {
          heading: "MD5 はなぜ破られ、それでいて生き残っているのか",
          paragraphs: [
            "MD5 は 1991 年に Ron Rivest が設計した 128 ビットのメッセージダイジェストで、十年ほどの間インターネットのデフォルトハッシュでした。売り文句は速さでしたが、その速さこそが破綻の原因でもあります。処理が速いほど攻撃者は1秒間に膨大な入力を試せますし、内部構造に既知の弱点があるため、衝突耐性の突破に総当たりすら必要ありません。",
            "MD5 の衝突耐性は 2000 年代半ばに段階的に崩れました。研究者たちが実用的な衝突構成手法を実演し、2012 年の Flame マルウェアは MD5 衝突を利用してマイクロソフトのコード署名証明書を偽造したことで有名です。以降、署名・証明書・認証に MD5 を受け入れる重大なセキュリティプロトコルは存在しません。",
            "それでも MD5 は消えていません。境界さえ理解すれば今も使えます。衝突攻撃は「同じハッシュを持つ2つの入力を攻撃者が作れる」ことであって、ハッシュの逆算や、あらゆる場面での検知されない改ざんを可能にするわけではありません。信頼できる発行元が公開したチェックサムと大きなダウンロードを照合するのは非対立的な用途で、誰もあなたを狙って衝突を作っていません。そういう仕事なら MD5 でも十分です。攻撃者が入力の一部を選べる場面では駄目です。",
          ],
        },
        {
          heading: "チェックサムを正しく比較するには",
          paragraphs: [
            "チェックサム比較の信頼性は、期待値の出所次第です。プロジェクトがダウンロードページに MD5 を掲載するのは、転送中の破損——切断されたダウンロード、壊れたミラー——を検出するためです。しかしチェックサム自体が信頼できない経路から来ているなら、ファイルを差し替えられる攻撃者はチェックサムも差し替えられ、MD5 はその偽造を喜んで「一致」と判定します。",
            "大文字小文字の違いは思った以上につまずきポイントです。大文字十六進を出すツールも小文字を出すツールもあります。ダイジェストは同一で——A3F… と a3f… は同じ数の別表記——比較時は大文字小文字を無視するか統一してから判断します。もう一つの古典的な落とし穴が末尾の改行で、改行ありとなしではダイジェストが全く変わります。本ツールのテキストモードが入力文字を正確に1バイトずつ計算するのはこのためです。",
            "重複排除キーやキャッシュバスターとしては、MD5 の速さは妥協ではなく利点です。コンテンツから 32 文字のキーを作るのは安価で、このツールの JavaScript でも Linux の md5sum でもバックエンドのライブラリでも、同じ RFC 1321 アルゴリズムは同じ出力を返します。",
          ],
        },
        {
          heading: "すべて端末上で完結",
          paragraphs: [
            "ハッシュ化は外部化すべきでない操作の典型です。ファイルを検証する動機そのものが、それが来たネットワークを完全には信用していないことが多いからです。同じファイルを知らないサーバーに送ってハッシュしてもらうのは、検証の意味を無くします。だから本ツールは MD5 を完全にブラウザ内で計算します。テキストは入力しながら、ファイルはブラウザのファイル API でローカルに読み込み、1 バイトもアップロードしません。",
            "ローカル設計の利点はプライバシーだけではありません。アップロード待ちもサイズ制限もサーバーの順番待ちもなく、数 GB の ISO イメージはディスクから読む時間だけで済み、ページを読み込んだ後はオフラインでも使えます。",
            "セキュリティに関わる場面では SHA-256 と組み合わせてください。SHA-256 ジェネレーターは同じローカル方式で、ハッシュジェネレーターのページでは複数アルゴリズムを並べて計算でき、両方のダイジェストをユーザーに公開できます。",
          ],
        },
      ],
    },
    es: {
      name: "Generador MD5",
      tagline:
        "Genera hashes MD5 de cualquier texto o archivo al instante en tu navegador — ideal para checksums, claves de deduplicación e integraciones heredadas.",
      intro: [
        "Escribe texto y ve su digest MD5 de 128 bits en vivo, o suelta un archivo para obtener su huella sin subir un solo byte. El hasheo ocurre localmente con una implementación JavaScript madura del algoritmo MD5.",
        "MD5 sigue estando en todas partes: checksums de descargas, claves de deduplicación, cache busters, integraciones con sistemas antiguos. Recuerda para qué no sirve — MD5 está criptográficamente roto, así que nunca lo uses para contraseñas, firmas ni nada que un atacante pueda manipular.",
      ],
      steps: [
        "Escribe o pega el texto — el digest MD5 se actualiza en vivo.",
        "O cambia a modo Archivo y suelta un archivo para hashearlo localmente.",
        "Copia el digest hexadecimal y compáralo con el checksum esperado.",
      ],
      faqs: [
        {
          q: "¿Es MD5 seguro para guardar contraseñas?",
          a: "No — ni de lejos. MD5 es rápido por diseño y los ataques de colisión son prácticos, así que crackear hashes MD5 de contraseñas es trivial. Usa un esquema específico como bcrypt, scrypt o Argon2.",
        },
        {
          q: "¿Para qué sirve todavía MD5?",
          a: "Integridad sin adversarios: comprobar que un archivo llegó intacto, deduplicar contenido, claves de caché e integraciones heredadas que lo exigen. Para comprobaciones de seguridad usa SHA-256 o mejor.",
        },
        {
          q: "¿Mi texto y archivos se envían a un servidor?",
          a: "No. Todo corre en tu navegador; incluso los archivos se leen y hashean íntegramente en tu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué MD5 está roto — y por qué sigue vivo",
          paragraphs: [
            "MD5 fue diseñado por Ron Rivest en 1991 como un digest de 128 bits rápido, y durante una década fue el hash por defecto de la web. Su punto fuerte era la velocidad — y esa misma velocidad acabó con él: cuanto más rápido procesa datos, más entradas por segundo puede probar un atacante, y como su estructura interna tiene debilidades conocidas, romper su resistencia a colisiones ni siquiera requiere fuerza bruta.",
            "La resistencia a colisiones de MD5 se derrumbó por etapas a mediados de los 2000: investigadores demostraron técnicas de colisión prácticas, y el malware Flame de 2012 usó una colisión MD5 para falsificar un certificado de firma de código de Microsoft. Desde entonces, ningún protocolo serio acepta MD5 para firmas, certificados o autenticación.",
            "Aun así MD5 no ha desaparecido, y está bien mientras entiendas la distinción: un ataque de colisión permite a un atacante crear dos entradas distintas con el mismo hash, pero no le sirve para invertir un hash ni para alterar un archivo sin ser detectado en cualquier contexto. Verificar que una descarga coincide con el checksum publicado por la misma fuente confiable es no adversarial — nadie construye colisiones contra ti. Para ese trabajo MD5 sigue siendo útil; para cualquier caso donde el atacante elige parte de la entrada, no.",
          ],
        },
        {
          heading: "Cómo comparar checksums correctamente",
          paragraphs: [
            "Una comparación de checksums es tan confiable como el origen del valor esperado. Cuando un proyecto publica un MD5 junto a la descarga, sirve para detectar corrupción en tránsito — una transferencia cortada, un mirror defectuoso. Pero si el checksum llega por un canal no confiable, un atacante que pueda sustituir el archivo puede sustituir también el checksum, y MD5 confirmará la falsificación sin dudarlo.",
            "Las mayúsculas confunden más de lo debido: algunas herramientas imprimen hexadecimal en mayúsculas y otras en minúsculas. Los digests son idénticos — A3F… y a3f… son el mismo número en otra notación — así que compara ignorando mayúsculas o normaliza antes de declarar un fallo. El otro clásico es el salto de línea final: un archivo de texto que termina en salto de línea produce un digest distinto al de los mismos caracteres sin él; por eso el modo texto calcula exactamente los caracteres que escribes.",
            "Para claves de deduplicación y cache busters, la velocidad de MD5 es una virtud, no un compromiso. Generar una clave de 32 caracteres desde un contenido es barato y estable entre ejecuciones, lenguajes y plataformas: el mismo algoritmo RFC 1321 produce la misma salida desde este JavaScript, desde md5sum en Linux o desde una librería en tu backend.",
          ],
        },
        {
          heading: "Todo se ejecuta en tu dispositivo",
          paragraphs: [
            "El hasheo es justo el tipo de operación que no quieres externalizar: la razón de verificar un archivo suele ser que no confías del todo en la red de la que vino. Enviar ese mismo archivo a un servidor desconocido para que lo hashee anularía la verificación. Por eso esta herramienta calcula MD5 íntegramente en tu navegador — el texto se hashea mientras escribes y los archivos se leen localmente con la API de archivos del navegador, sin subir nada.",
            "El diseño local aporta beneficios además de privacidad: no hay tiempo de subida, ni límite de tamaño, ni colas de servidor. Una imagen ISO de varios gigas tarda lo que leerla del disco y funciona sin conexión una vez cargada la página.",
            "Para cualquier uso crítico de seguridad, combina esto con SHA-256 — nuestro generador SHA-256 usa el mismo flujo local, y la página de generador de hashes te permite calcular varios algoritmos a la vez para publicar ambos digests.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador MD5",
      tagline:
        "Gere hashes MD5 de qualquer texto ou arquivo na hora, no seu navegador — perfeito para checksums, chaves de deduplicação e integrações legadas.",
      intro: [
        "Digite texto e veja o digest MD5 de 128 bits ao vivo, ou solte um arquivo para gerar a impressão digital sem enviar um byte sequer. O hashing acontece localmente com uma implementação JavaScript madura do algoritmo MD5.",
        "O MD5 continua em toda parte: checksums de downloads, chaves de deduplicação, cache busters, integrações com sistemas antigos. Só lembre do que ele não serve — MD5 está criptograficamente quebrado, então nunca use para senhas, assinaturas ou algo que um atacante possa adulterar.",
      ],
      steps: [
        "Digite ou cole o texto — o digest MD5 atualiza ao vivo.",
        "Ou mude para o modo Arquivo e solte um arquivo para hashear localmente.",
        "Copie o digest hexadecimal e compare com o checksum esperado.",
      ],
      faqs: [
        {
          q: "MD5 é seguro para armazenar senhas?",
          a: "Não — nem de longe. MD5 é rápido por design e ataques de colisão são práticos, o que torna trivial quebrar hashes de senha MD5. Use um esquema dedicado como bcrypt, scrypt ou Argon2.",
        },
        {
          q: "Para que o MD5 ainda serve?",
          a: "Integridade sem adversários: conferir se um arquivo sobreviveu à transferência, deduplicar conteúdo, chaves de cache e sistemas legados que o exigem. Para verificações de segurança use SHA-256 ou superior.",
        },
        {
          q: "Meu texto e arquivos são enviados a um servidor?",
          a: "Não. Tudo roda no seu navegador; até os arquivos são lidos e hasheados inteiramente no seu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Por que o MD5 foi quebrado — e por que sobrevive",
          paragraphs: [
            "O MD5 foi desenhado por Ron Rivest em 1991 como um digest de 128 bits rápido, e por uma década foi o hash padrão da web. O ponto de venda era a velocidade — e foi ela que o derrubou: quanto mais rápido processa dados, mais entradas por segundo um atacante consegue testar, e como sua estrutura interna tem fraquezas conhecidas, quebrar sua resistência a colisões nem exige força bruta.",
            "A resistência a colisões do MD5 desmoronou por etapas em meados dos anos 2000: pesquisadores demonstraram técnicas práticas de colisão, e o malware Flame de 2012 usou uma colisão MD5 para falsificar um certificado de assinatura de código da Microsoft. Desde então, nenhum protocolo sério aceita MD5 para assinaturas, certificados ou autenticação.",
            "Mesmo assim o MD5 não desapareceu, e tudo bem desde que você entenda a distinção: um ataque de colisão permite a um atacante criar duas entradas diferentes com o mesmo hash, mas não ajuda a reverter um hash nem a alterar um arquivo sem detecção em qualquer cenário. Verificar se um download confere com o checksum publicado pela mesma fonte confiável é não adversarial — ninguém está criando colisões contra você. Para esse trabalho o MD5 continua servindo; para qualquer caso em que o atacante escolhe parte da entrada, não.",
          ],
        },
        {
          heading: "Como comparar checksums corretamente",
          paragraphs: [
            "Uma comparação de checksum é tão confiável quanto a origem do valor esperado. Quando um projeto publica um MD5 junto ao download, o objetivo é detectar corrupção no caminho — transferência interrompida, mirror defeituoso. Mas se o checksum vier por um canal não confiável, um atacante que possa trocar o arquivo pode trocar o checksum também, e o MD5 confirmará a falsificação sem hesitar.",
            "Maiúsculas e minúsculas confundem mais do que deveriam: algumas ferramentas imprimem hexadecimal em maiúsculas, outras em minúsculas. Os digests são idênticos — A3F… e a3f… são o mesmo número em outra notação — então compare ignorando maiúsculas ou normalize antes de declarar divergência. O outro clássico é a quebra de linha final: um arquivo de texto que termina com quebra de linha gera um digest diferente dos mesmos caracteres sem ela; por isso o modo de texto calcula exatamente os caracteres que você digita.",
            "Para chaves de deduplicação e cache busters, a velocidade do MD5 é virtude, não compromisso. Gerar uma chave de 32 caracteres a partir de um conteúdo é barato e estável entre execuções, linguagens e plataformas: o mesmo algoritmo RFC 1321 produz a mesma saída neste JavaScript, no md5sum do Linux ou numa biblioteca do seu backend.",
          ],
        },
        {
          heading: "Tudo roda no seu dispositivo",
          paragraphs: [
            "Hashing é exatamente o tipo de operação que você não quer terceirizar: o motivo de verificar um arquivo costuma ser não confiar totalmente na rede de onde ele veio. Enviar o mesmo arquivo a um servidor desconhecido para ser hasheado anularia a verificação. Por isso esta ferramenta calcula o MD5 inteiramente no seu navegador — o texto é hasheado enquanto você digita e os arquivos são lidos localmente com a API de arquivos do navegador, sem enviar nada.",
            "O design local traz benefícios além da privacidade: sem tempo de upload, sem limite de tamanho, sem fila de servidor. Uma imagem ISO de vários gigas leva o tempo de lê-la do disco e funciona offline depois que a página carrega.",
            "Para qualquer uso crítico de segurança, combine isto com SHA-256 — nosso gerador SHA-256 usa o mesmo fluxo local, e a página do gerador de hashes permite calcular vários algoritmos lado a lado para publicar os dois digests.",
          ],
        },
      ],
    },
  },
});
