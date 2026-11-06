import { DevHashEngine } from "../_engines/dev-engine-hash";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sha384-generator",
  category: "developer",
  icon: "hash",
  engine: { component: DevHashEngine, props: { algos: ["SHA-384"] } },
  related: ["sha256-generator", "sha512-generator", "hash-generator", "jwt-decoder", "md5-generator", "base64-image", "json-validator", "json-formatter", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: 'SHA-384 Generator',
      tagline: 'Compute SHA-384 hashes of text or files in your browser via native WebCrypto — the mid-size SHA-2 variant used in TLS 1.2 and code signing. Fully client-side.',
      intro: [
        "Meeting TLS 1.2 cipher-suite requirements, matching enterprise code-signing digests, or filling a certificate configuration that expects exactly 384 bits — paste text or drop a file and the digest appears instantly, computed locally.",
        "Output is 96 lowercase hexadecimal characters (48 bytes). SHA-384 is SHA-512 truncated to 384 bits but with different initial hash values, so it is a distinct FIPS 180-4 algorithm — you cannot reproduce it by cutting a SHA-512 digest short.",
        "Hashing goes through native WebCrypto SubtleCrypto, which follows FIPS 180-4; results match sha384sum, OpenSSL and every other compliant implementation. Text and file inputs never leave your device.",
        "Compared with SHA-256, SHA-384 offers a larger security margin and pairs naturally with the P-384 elliptic curve in ECDSA — the reason TLS 1.2 suites such as ECDHE_ECDSA_WITH_AES_256_CBC_SHA384 specify it. Pick SHA-512 instead when raw speed on 64-bit hardware matters most."
      ],
      steps: ['Type or paste the text — the digest updates as you type.', 'Or switch to File mode and drop a file to hash it locally.', 'Copy the hexadecimal digest and compare it with the expected value.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "Where SHA-384 sits in the SHA-2 family",
          paragraphs: [
            "SHA-2 is not one algorithm but a family standardized in FIPS 180-4, defined by two internal engines: SHA-224 and SHA-256 run the 256-bit engine (32-bit words), while SHA-384 and SHA-512 run the 512-bit engine (64-bit words). The outputs are 224, 256, 384 and 512 bits respectively — 56, 64, 96 and 128 hexadecimal characters. SHA-384 is what you get when the 512-bit engine is initialized with different constants and its output is truncated to 384 bits.",
            "That truncation is why SHA-384 is not simply “SHA-512 cut short”. The different initial values make it a distinct algorithm with its own specification: no known attack on SHA-512 would transfer to SHA-384's shorter output, and conversely you cannot verify a SHA-384 digest by hashing with SHA-512 and slicing. The tools must agree on the algorithm, not just the family.",
            "Security-wise, all four SHA-2 variants are believed to offer close to their output length in collision resistance — SHA-384 gives a 192-bit security level against collisions, far beyond any practical need. The usual reason to pick one over another is infrastructure compatibility: what your TLS suite, your code-signing chain or your counterpart's verifier already expects.",
          ],
        },
        {
          heading: "Reading the output and checking it correctly",
          paragraphs: [
            "The digest is 96 hexadecimal characters, emitted here in lowercase — hexadecimal comparison is case-insensitive, but some verifier tools compare strings literally, so a case mismatch can look like a hash mismatch. The digest is deterministic: the same input bytes always yield the same output on every correct implementation, which is exactly why it works as a checksum.",
            "Beware the encoding trap when comparing with a reference value: hashing the text “hello” as UTF-8, UTF-16 or with a trailing newline produces three different digests. Command-line tools notoriously append a newline to echo's output unless you use echo -n or printf. When your digest does not match, the data almost certainly differs — same algorithm, different bytes.",
            "For files, the digest identifies content, not metadata: copying the file preserves the hash, while re-encoding, converting line endings or re-saving through an editor changes it. That property is what makes SHA-384 digests useful as tamper evidence for installers and certificates — and why a matching hash proves only that the bytes are identical, not that the sender is trustworthy.",
          ],
        },
        {
          heading: "Native crypto, local processing",
          paragraphs: [
            "The hashing goes through your browser's native WebCrypto SubtleCrypto, not JavaScript code written by this site — the same audited implementation your browser uses for TLS. Output matches sha384sum, OpenSSL and every other FIPS 180-4 compliant tool byte for byte, and it runs faster than any pure-JS hash for large files.",
            "Text and file inputs never leave your device: the digest is computed in your browser's memory and nothing is uploaded, stored or logged. That matters for the typical use — verifying installers, hashing internal secrets for configuration, or computing the digest of a document you have not published yet.",
          ],
        },
      ],
    },
    zh: {
      name: 'SHA-384 生成器',
      tagline: '在浏览器里用原生 WebCrypto 计算 SHA-384 哈希——TLS 1.2 和代码签名常用的 SHA-2 变体。完全本地处理,数据不上传。',
      intro: ['粘贴文本即可实时看到 384 位 SHA-384 摘要,或拖入文件在本地生成指纹。SHA-384 就是 SHA-512 截断到 384 位:安全强度与 SHA-512 同级,输出更短,适合证书与 HMAC 配置里用不上 512 位的场合。', '你会在 TLS 1.2 加密套件、macOS 系统完整性检查和企业代码签名链里遇到 SHA-384。一键复制十六进制摘要,与厂商或规范发布的值比对。'],
      steps: ['输入或粘贴文本——摘要随输入实时更新。', '也可切换到文件模式,拖入文件在本地计算。', '复制十六进制摘要,与预期值比对。'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "SHA-384 在 SHA-2 家族中的位置",
          paragraphs: [
            "SHA-2 不是一个算法,而是 FIPS 180-4 标准化的一个家族,内部由两台“引擎”构成:SHA-224 和 SHA-256 跑 256 位引擎(32 位字),SHA-384 和 SHA-512 跑 512 位引擎(64 位字)。输出分别是 224、256、384、512 位——对应 56、64、96、128 个十六进制字符。SHA-384 就是 512 位引擎换一组初始常量、再把输出截断到 384 位的结果。",
            "正因为这个截断,SHA-384 不是“把 SHA-512 剪短”这么简单。不同的初始值让它成为有独立规格的独立算法:对 SHA-512 的已知攻击不会迁移到 SHA-384 更短的输出上;反过来,也不能用 SHA-512 哈希再切一段来伪造或校验 SHA-384 摘要。两端必须约定同一个算法,而不只是同一个家族。",
            "安全性上,SHA-2 四个变体的抗碰撞强度都被认为接近其输出长度——SHA-384 提供 192 位的抗碰撞安全级,远超任何实际需求。选哪一个通常取决于基础设施兼容性:你的 TLS 套件、代码签名链、或对端校验程序已经在用哪个。",
          ],
        },
        {
          heading: "读输出,并正确地比对",
          paragraphs: [
            "摘要是 96 个十六进制字符,这里以小写输出——十六进制比较本不区分大小写,但有些校验工具按字符串严格比较,大小写不一致会被误判为哈希不一致。摘要是确定性的:同样的输入字节在任何正确实现上都得到同样的输出,这正是它能当校验和的原因。",
            "和参考值比对时小心编码陷阱:同一段文本按 UTF-8、UTF-16 或末尾多一个换行来哈希,会得到三个不同的摘要。命令行工具臭名昭著的一点是 echo 会给输出补换行,除非用 echo -n 或 printf。摘要对不上时,几乎一定是数据不同——算法相同,字节不同。",
            "对文件而言,摘要标识的是内容而非元数据:复制文件哈希不变,而重新编码、转换换行符或经编辑器再保存都会改变它。这个性质让 SHA-384 可以用作安装包和证书的防篡改证据——也意味着哈希一致只能证明字节相同,不能证明发送方可信。",
          ],
        },
        {
          heading: "原生加密库,本地处理",
          paragraphs: [
            "哈希走的是浏览器原生 WebCrypto SubtleCrypto,不是本站手写的 JavaScript——和浏览器做 TLS 用的是同一套经过审计的实现。输出与 sha384sum、OpenSSL 及一切符合 FIPS 180-4 的工具逐字节一致,大文件也比任何纯 JS 哈希快。",
            "文本和文件输入不离开设备:摘要在浏览器内存里算完,不上传、不存储、不留日志。这对典型用途很重要——校验安装包、为配置计算内部密钥的摘要、或给一份还没发布的文档算指纹。",
          ],
        },
      ],
    },
    ja: {
      name: 'SHA-384 ジェネレーター',
      tagline: 'ネイティブ WebCrypto でブラウザ内のテキストやファイルの SHA-384 を計算 — TLS 1.2 やコード署名で使われる SHA-2 変種。完全クライアント処理です。',
      intro: ['テキストを貼り付けると 384 ビットの SHA-384 ダイジェストがリアルタイムに表示され、ファイルをドロップすればローカルでフィンガープリントできます。SHA-384 は SHA-512 を 384 ビットに切り詰めたもの:強度は SHA-512 と同水準で、出力が短いため証明書や HMAC 設定で 512 ビットが過剰な場合に適します。', 'SHA-384 は TLS 1.2 の暗号スイート、macOS のシステム整合性チェック、エンタープライズのコード署名チェーンで登場します。16 進ダイジェストをワンクリックでコピーし、ベンダーや仕様が公開する値と比較できます。'],
      steps: ['テキストを入力・貼り付け — ダイジェストは入力に合わせて更新されます。', 'またはファイルモードに切り替え、ファイルをドロップしてローカルでハッシュ化。', '16 進ダイジェストをコピーし、期待値と比較します。'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "SHA-2 ファミリーの中での SHA-384 の位置",
          paragraphs: [
            "SHA-2 は 1 つのアルゴリズムではなく、FIPS 180-4 で標準化されたファミリーです。内部は 2 つのエンジンで構成され、SHA-224 と SHA-256 は 256 ビットエンジン(32 ビット語)、SHA-384 と SHA-512 は 512 ビットエンジン(64 ビット語)で動きます。出力はそれぞれ 224・256・384・512 ビット——16 進で 56・64・96・128 文字。SHA-384 は 512 ビットエンジンを別の初期定数で初期化し、出力を 384 ビットに切り詰めたものです。",
            "この切り詰めがあるため、SHA-384 は「SHA-512 を短くしただけ」ではありません。初期値が異なるため独自の仕様を持つ独立したアルゴリズムであり、SHA-512 に対する既知の攻撃が SHA-384 の短い出力にそのまま当てはまるわけではなく、逆に SHA-512 でハッシュして切り出しても SHA-384 の検証はできません。合意すべきはファミリーではなくアルゴリズムです。",
            "セキュリティ面では、SHA-2 の 4 変種はいずれも衝突耐性がほぼ出力長に近いと考えられています。SHA-384 は衝突に対し 192 ビットの強度で、実用上の必要を大きく超えます。どれを選ぶかは通常、TLS スイート、コード署名チェーン、相手側の検証器がどれを期待しているかという互換性の問題です。",
          ],
        },
        {
          heading: "出力の読み方と正しい照合",
          paragraphs: [
            "ダイジェストは 16 進 96 文字で、ここでは小文字で出力します。16 進の比較は大小文字を区別しませんが、検証ツールによっては文字列として厳密に比べるものがあり、大文字小文字の違いがハッシュ不一致に見えることがあります。ダイジェストは決定的で、同じ入力バイトはどんな正しい実装でも同じ出力になります。だからこそチェックサムとして機能します。",
            "参照値と照合するときはエンコーディングの罠に注意です。同じテキストでも UTF-8、UTF-16、末尾の改行の有無で 3 種類のダイジェストが生まれます。コマンドラインの echo は改行を追加することで悪名高く、echo -n か printf が必要です。ダイジェストが合わないとき、ほぼ確実にデータが違います——アルゴリズムは同じ、バイトが違う。",
            "ファイルでは、ダイジェストは内容を識別しメタデータは識別しません。コピーならハッシュは変わらず、再エンコード、改行コード変換、エディタでの再保存で変わります。この性質ゆえに SHA-384 はインストーラや証明書の改ざん証拠として有用であり、同時にハッシュ一致は「バイトが同一」の証明であって「送信者が信頼できる」証明ではありません。",
          ],
        },
        {
          heading: "ネイティブ暗号、ローカル処理",
          paragraphs: [
            "ハッシュはこのサイトが書いた JavaScript ではなく、ブラウザのネイティブな WebCrypto SubtleCrypto で行われます。ブラウザが TLS に使うのと同じ監査済み実装です。出力は sha384sum、OpenSSL、その他すべての FIPS 180-4 準拠ツールとバイト単位で一致し、大きなファイルでは純 JS 実装より速く動きます。",
            "テキストもファイルも端末の外に出ません。ダイジェストはブラウザのメモリ内で計算され、アップロード・保存・ログは一切ありません。インストーラの検証、設定用の内部シークレットのハッシュ化、未公開文書のフィンガープリントといった典型的用途で重要になります。",
          ],
        },
      ],
    },
    es: {
      name: 'Generador SHA-384',
      tagline: 'Calcula hashes SHA-384 de texto o archivos en tu navegador con WebCrypto nativo — la variante SHA-2 usada en TLS 1.2 y firma de código. 100% local.',
      intro: ['Pega texto para ver su resumen SHA-384 de 384 bits en vivo, o suelta un archivo para generar su huella localmente. SHA-384 es SHA-512 truncado a 384 bits: la misma clase de fuerza con una salida más corta, ideal para certificados y configuraciones HMAC donde 512 bits es excesivo.', 'Encontrarás SHA-384 en suites de cifrado TLS 1.2, verificaciones de integridad de macOS y cadenas de firma de código corporativas. Copia el resumen hexadecimal y compáralo con el valor publicado por tu proveedor o especificación.'],
      steps: ['Escribe o pega el texto: el resumen se actualiza al escribir.', 'O cambia al modo archivo y suelta un archivo para hashearlo localmente.', 'Copia el resumen hexadecimal y compáralo con el valor esperado.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "Dónde encaja SHA-384 en la familia SHA-2",
          paragraphs: [
            "SHA-2 no es un algoritmo sino una familia estandarizada en FIPS 180-4, definida por dos motores internos: SHA-224 y SHA-256 usan el motor de 256 bits (palabras de 32 bits), mientras que SHA-384 y SHA-512 usan el de 512 bits (palabras de 64 bits). Las salidas son 224, 256, 384 y 512 bits — 56, 64, 96 y 128 caracteres hexadecimales. SHA-384 es lo que resulta al inicializar el motor de 512 bits con constantes distintas y truncar su salida a 384 bits.",
            "Ese truncamiento es la razón de que SHA-384 no sea simplemente “SHA-512 recortado”. Los valores iniciales distintos lo convierten en un algoritmo con especificación propia: ningún ataque conocido contra SHA-512 se traslada a la salida más corta de SHA-384, y a la inversa, no puedes verificar un resumen SHA-384 calculando con SHA-512 y cortando. Las dos partes deben acordar el algoritmo, no solo la familia.",
            "En seguridad, las cuatro variantes de SHA-2 se cree que ofrecen casi su longitud de salida en resistencia a colisiones — SHA-384 da un nivel de 192 bits frente a colisiones, muy por encima de cualquier necesidad práctica. La razón habitual para elegir uno u otra es la compatibilidad de infraestructura: qué suite TLS, qué cadena de firma de código o qué verificador del otro lado ya espera.",
          ],
        },
        {
          heading: "Leer la salida y compararla correctamente",
          paragraphs: [
            "El resumen son 96 caracteres hexadecimales, emitidos aquí en minúsculas — la comparación hexadecimal no distingue mayúsculas, pero algunas herramientas verifican la cadena literalmente, así que una diferencia de caja puede parecer un hash distinto. El resumen es determinista: los mismos bytes de entrada producen siempre la misma salida en cualquier implementación correcta, y por eso sirve como checksum.",
            "Cuidado con la trampa de codificación al comparar con un valor de referencia: hashear el texto “hello” como UTF-8, UTF-16 o con un salto de línea final produce tres resúmenes distintos. Las herramientas de línea de comandos tienen la fama de añadir un salto de línea a la salida de echo salvo que uses echo -n o printf. Cuando tu resumen no coincide, casi seguro los datos difieren — mismo algoritmo, bytes distintos.",
            "Para archivos, el resumen identifica contenido, no metadatos: copiar el archivo conserva el hash, mientras que recodificar, convertir saltos de línea o guardar de nuevo desde un editor lo cambia. Esa propiedad hace que los resúmenes SHA-384 sirvan como evidencia de manipulación en instaladores y certificados — y también implica que un hash coincidente solo prueba que los bytes son idénticos, no que el emisor sea confiable.",
          ],
        },
        {
          heading: "Criptografía nativa, procesamiento local",
          paragraphs: [
            "El hash pasa por el WebCrypto SubtleCrypto nativo de tu navegador, no por código JavaScript escrito por este sitio — la misma implementación auditada que tu navegador usa para TLS. La salida coincide byte a byte con sha384sum, OpenSSL y cualquier herramienta conforme a FIPS 180-4, y corre más rápido que cualquier hash en JS puro con archivos grandes.",
            "Los textos y archivos nunca salen de tu dispositivo: el resumen se calcula en la memoria del navegador y nada se sube, almacena ni registra. Eso importa en el uso típico — verificar instaladores, hashear secretos internos para configuración, o calcular el digest de un documento que aún no has publicado.",
          ],
        },
      ],
    },
    pt: {
      name: 'Gerador SHA-384',
      tagline: 'Calcule hashes SHA-384 de texto ou arquivos no navegador com WebCrypto nativo — a variante SHA-2 usada em TLS 1.2 e assinatura de código. 100% local.',
      intro: ['Cole texto para ver o resumo SHA-384 de 384 bits em tempo real, ou solte um arquivo para gerar a impressão digital localmente. SHA-384 é SHA-512 truncado para 384 bits: a mesma classe de força com saída mais curta, ideal para certificados e configurações HMAC onde 512 bits é excessivo.', 'Você encontrará SHA-384 em suítes de cifra TLS 1.2, verificações de integridade do macOS e cadeias de assinatura de código corporativas. Copie o resumo hexadecimal e compare com o valor publicado pelo fornecedor ou especificação.'],
      steps: ['Digite ou cole o texto — o resumo atualiza conforme você digita.', 'Ou mude para o modo arquivo e solte um arquivo para hashear localmente.', 'Copie o resumo hexadecimal e compare com o valor esperado.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "Onde o SHA-384 se encaixa na família SHA-2",
          paragraphs: [
            "SHA-2 não é um algoritmo, e sim uma família padronizada no FIPS 180-4, definida por dois motores internos: SHA-224 e SHA-256 usam o motor de 256 bits (palavras de 32 bits), enquanto SHA-384 e SHA-512 usam o de 512 bits (palavras de 64 bits). As saídas são 224, 256, 384 e 512 bits — 56, 64, 96 e 128 caracteres hexadecimais. O SHA-384 é o resultado de inicializar o motor de 512 bits com constantes diferentes e truncar a saída para 384 bits.",
            "É esse truncamento que faz o SHA-384 não ser simplesmente “SHA-512 cortado”. Os valores iniciais diferentes o tornam um algoritmo com especificação própria: nenhum ataque conhecido contra o SHA-512 se transfere para a saída mais curta do SHA-384, e reciprocamente você não pode verificar um resumo SHA-384 hasheando com SHA-512 e cortando. As duas pontas precisam concordar no algoritmo, não apenas na família.",
            "Em segurança, acredita-se que as quatro variantes do SHA-2 ofereçam quase sua extensão de saída em resistência a colisões — o SHA-384 dá um nível de 192 bits contra colisões, muito além de qualquer necessidade prática. O motivo usual para escolher um em vez do outro é compatibilidade de infraestrutura: qual suíte TLS, cadeia de assinatura de código ou verificador da outra ponta já espera.",
          ],
        },
        {
          heading: "Lendo a saída e conferindo corretamente",
          paragraphs: [
            "O resumo tem 96 caracteres hexadecimais, emitido aqui em minúsculas — a comparação hexadecimal não distingue maiúsculas, mas algumas ferramentas comparam a string literalmente, então uma diferença de caixa pode parecer um hash diferente. O resumo é determinístico: os mesmos bytes de entrada sempre produzem a mesma saída em qualquer implementação correta, e é exatamente por isso que funciona como checksum.",
            "Cuidado com a armadilha de codificação ao comparar com um valor de referência: hashear o texto “hello” como UTF-8, UTF-16 ou com uma quebra de linha no final produz três resumos diferentes. Ferramentas de linha de comando têm a fama de acrescentar uma quebra de linha à saída do echo a menos que você use echo -n ou printf. Quando o resumo não bate, quase certamente os dados diferem — mesmo algoritmo, bytes diferentes.",
            "Para arquivos, o resumo identifica conteúdo, não metadados: copiar o arquivo preserva o hash, enquanto recodificar, converter quebras de linha ou salvar de novo por um editor o altera. Essa propriedade faz dos resumos SHA-384 uma evidência de violação para instaladores e certificados — e também significa que um hash igual só prova que os bytes são idênticos, não que o remetente é confiável.",
          ],
        },
        {
          heading: "Criptografia nativa, processamento local",
          paragraphs: [
            "O hashing passa pelo WebCrypto SubtleCrypto nativo do seu navegador, não por código JavaScript escrito por este site — a mesma implementação auditada que seu navegador usa para TLS. A saída bate byte a byte com sha384sum, OpenSSL e qualquer ferramenta conforme ao FIPS 180-4, e roda mais rápido que qualquer hash em JS puro para arquivos grandes.",
            "Textos e arquivos nunca saem do seu dispositivo: o resumo é calculado na memória do navegador e nada é enviado, armazenado ou registrado. Isso importa no uso típico — verificar instaladores, hashear segredos internos para configuração, ou calcular o digest de um documento que você ainda não publicou.",
          ],
        },
      ],
    },
  },
});
