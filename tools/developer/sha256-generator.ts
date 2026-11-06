import { DevHashEngine } from "../_engines/dev-engine-hash";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sha256-generator",
  category: "developer",
  icon: "hash",
  engine: { component: DevHashEngine, props: { algos: ["SHA-256"] } },
  related: ["md5-generator", "hash-generator", "uuid-generator", "jwt-decoder", "base64-image", "json-validator", "json-formatter", "url-encoder", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: "SHA-256 Generator",
      tagline:
        "Calculate SHA-256 hashes of text or files online using native WebCrypto — the standard choice for integrity checks and fingerprints. 100% client-side.",
      intro: [
        "Type text to watch its 256-bit SHA-256 digest appear live, or drop in a file to fingerprint gigabytes without uploading anything. The hash is computed by the browser's own WebCrypto implementation — the same code your OS and TLS stack trust.",
        "SHA-256 is today's default for verifying downloads, signing artifacts, deduplicating content, building content-addressed storage and blockchain work. Copy the hex digest in one click and compare it with the checksum a publisher gave you.",
      ],
      steps: [
        "Type or paste the text — the digest updates as you type.",
        "Or switch to File mode and drop a file to hash it locally.",
        "Copy the hexadecimal digest and compare it with the expected value.",
      ],
      faqs: [
        {
          q: "Is SHA-256 secure?",
          a: "Yes — SHA-256 is part of the SHA-2 family and remains unbroken after two decades of analysis. It is the digest behind TLS certificates, Bitcoin and most software release verification.",
        },
        {
          q: "Why does the same input always give the same hash?",
          a: "Because SHA-256 is deterministic: identical bytes always produce an identical digest. That property is exactly what makes checksum comparison work — one changed byte anywhere changes the whole digest.",
        },
        {
          q: "Are my text and files uploaded?",
          a: "No. Hashing runs locally in your browser with WebCrypto — your data never leaves the device.",
        },
      ],
      deepDive: [
        {
          heading: "The SHA-2 family and its output sizes",
          paragraphs: [
            "SHA-256 is one member of the SHA-2 family, which the US NIST standardized in the early 2000s as the replacement for SHA-1. The family name encodes the output size in bits: SHA-224, SHA-256, SHA-384 and SHA-512 produce 224, 256, 384 and 512 bits respectively — that is 64, 64, 96 and 128 hexadecimal characters. A “SHA-256” digest that is not exactly 64 hex characters is not SHA-256, whatever the label claims.",
            "The variants differ internally too, not just in truncation. SHA-512 operates on 64-bit words and is actually faster than SHA-256 on modern 64-bit CPUs when hashing large files; SHA-256 uses 32-bit words and is the choice for broader compatibility. SHA-224 and SHA-384 are simply truncated variants defined for specific standards that wanted shorter digests.",
            "Do not confuse SHA-2 with SHA-3 (Keccak), a different construction standardized a decade later, or with SHA-1, a 160-bit predecessor that was broken for collision attacks and must not be used in new designs. When a download page says “verify with SHA-256”, this tool gives you exactly that digest, computed by your browser's WebCrypto.",
          ],
        },
        {
          heading: "Reading and comparing digests",
          paragraphs: [
            "Two digests either match exactly or the files differ — there is no partial credit. Comparing by eye across 64 characters is error-prone, so automate it: pipe the downloaded file through sha256sum, shasum -a 256 or CertUtil, then compare strings programmatically or with a diff. A single differing character means corruption or substitution, never a rounding artifact.",
            "The avalanche effect is the property that makes checksums trustworthy: flip one bit anywhere in a multi-gigabyte file and the digest becomes an unrelated random-looking 256-bit value. This also means you cannot infer anything about the content from the digest — two files that look identical in a file manager can differ in metadata and hash differently.",
            "Watch the input pipeline, not the algorithm. Encoding is the usual culprit: hashing the text “café” as UTF-8 and as Latin-1 gives different digests because the bytes differ. This tool hashes exactly the bytes of what you type (UTF-8 for text) or the exact bytes of the file, which is what every standard checksum workflow expects.",
          ],
        },
        {
          heading: "Why compute hashes in the browser",
          paragraphs: [
            "A hash of a file is only meaningful if the hashing environment is trustworthy, and a random web server is not. This tool uses WebCrypto — the cryptographic library built into the browser itself and relied on by TLS — so the digest you get comes from audited native code, computed locally; text and files never leave your device.",
            "Local computation also removes the practical ceilings: no upload bandwidth, no size limit beyond available memory, no waiting in a queue. Fingerprinting a large archive is bound by disk read speed, and once the page is loaded the whole workflow works offline.",
            "WebCrypto does not offer MD5, which is why this site's MD5 generator uses a pure-JavaScript implementation while SHA-256 rides the native one. For anything new, prefer SHA-256 or stronger — the hash-generator page computes the whole SHA-2 family side by side when you need several digests at once.",
          ],
        },
      ],
    },
    zh: {
      name: "SHA-256 生成器",
      tagline: "用浏览器原生 WebCrypto 在线计算文本或文件的 SHA-256 哈希——完整性校验与指纹的标准选择,100% 本地处理。",
      intro: [
        "输入文本即可实时看到 256 位 SHA-256 摘要,或拖入文件为几 GB 的内容生成指纹而无需上传任何东西。哈希由浏览器自带的 WebCrypto 实现——与你操作系统和 TLS 信任的是同一套代码。",
        "SHA-256 是当今校验下载、为构件签名、内容去重、内容寻址存储和区块链工作的默认选择。一键复制十六进制摘要,与发布方提供的校验和比对。",
      ],
      steps: [
        "输入或粘贴文本——摘要随输入实时更新。",
        "也可切换到文件模式,拖入文件在本地计算。",
        "复制十六进制摘要,与预期值比对。",
      ],
      faqs: [
        {
          q: "SHA-256 安全吗?",
          a: "安全。SHA-256 属于 SHA-2 家族,经过二十年的分析仍未被攻破。TLS 证书、比特币和大多数软件发布验证都以它为摘要算法。",
        },
        {
          q: "为什么相同输入总是得到相同哈希?",
          a: "因为 SHA-256 是确定性的:相同的字节永远产生相同的摘要。这正是校验和比对有效的原因——任何位置改动一个字节,整个摘要都会改变。",
        },
        {
          q: "文本和文件会被上传吗?",
          a: "不会。哈希在浏览器中用 WebCrypto 本地完成,数据不离开设备。",
        },
      ],
      deepDive: [
        {
          heading: "SHA-2 家族与输出长度",
          paragraphs: [
            "SHA-256 是 SHA-2 家族的成员之一。SHA-2 由美国 NIST 在 2000 年代初标准化,作为 SHA-1 的替代品。家族名字里就编码了输出的位长:SHA-224、SHA-256、SHA-384、SHA-512 分别输出 224、256、384、512 位,对应 64、64、96、128 个十六进制字符。一个号称 SHA-256 的摘要如果不是恰好 64 个十六进制字符,那它就不是 SHA-256,标签怎么写都一样。",
            "各变体不只是截断的区别,内部结构也不同。SHA-512 按 64 位字运算,在现代 64 位 CPU 上处理大文件时反而比 SHA-256 快;SHA-256 用 32 位字,兼容性最广。SHA-224 和 SHA-384 是为特定标准定义的截断变体,想要更短的摘要时用。",
            "别把 SHA-2 和 SHA-3(Keccak)混淆——后者是十年后标准化的另一种构造;更别和 SHA-1 混淆——它是 160 位的前辈,抗碰撞已被攻破,新设计里绝不能用。当下载页写着“用 SHA-256 校验”,本工具给出的正是这个摘要,由浏览器的 WebCrypto 计算。",
          ],
        },
        {
          heading: "摘要怎么比才不出错",
          paragraphs: [
            "两个摘要要么完全一致,要么文件不同——没有部分正确一说。肉眼比对 64 个字符极易出错,所以要用工具:把下载的文件过一遍 sha256sum、shasum -a 256 或 CertUtil,再程序化比对字符串,或用 diff。只要有一个字符不同,就是损坏或被替换,绝不是什么舍入误差。",
            "雪崩效应是校验和可信的根本:在几 GB 的文件里翻转一个比特,摘要就变成一个毫不相关的、看似随机的 256 位值。这也意味着你无法从摘要推断内容——文件管理器里看起来一样的两个文件,元数据不同,哈希就不同。",
            "要盯的是输入管线,而不是算法本身。编码是最常见的元凶:把“café”按 UTF-8 和按 Latin-1 哈希会得到不同摘要,因为字节不同。本工具对你输入的内容按精确字节计算(文本用 UTF-8),文件则按文件的原字节,这正是所有标准校验流程所预期的。",
          ],
        },
        {
          heading: "为什么要在浏览器里算哈希",
          paragraphs: [
            "文件的哈希只有在计算环境可信时才有意义,而一个陌生的 Web 服务器并不可信。本工具用的是 WebCrypto——浏览器内置、TLS 也依赖的密码学库——你得到的摘要来自经过审计的原生代码,在本地计算;文本和文件从不离开设备。",
            "本地计算还消除了实际上的天花板:没有上传带宽、没有内存之外的体积限制、不用排队。给大档案做指纹的耗时只取决于磁盘读取速度,页面加载后整个流程离线也能跑。",
            "WebCrypto 不提供 MD5,所以本站的 MD5 生成器用的是纯 JavaScript 实现,而 SHA-256 走原生通道。新项目请优先 SHA-256 或更强算法——需要多个摘要时,哈希生成器页面可以并排计算整个 SHA-2 家族。",
          ],
        },
      ],
    },
    ja: {
      name: "SHA-256 ジェネレーター",
      tagline:
        "ネイティブ WebCrypto でテキストやファイルの SHA-256 をオンライン計算 — 整合性チェックとフィンガープリントの標準。100% ブラウザ内処理です。",
      intro: [
        "テキストを入力すれば 256 ビットの SHA-256 ダイジェストがリアルタイムに現れ、ファイルをドロップすれば数 GB のデータもアップロードなしでフィンガープリントできます。ハッシュはブラウザ自身の WebCrypto 実装が計算します — OS や TLS スタックが信頼するのと同じコードです。",
        "SHA-256 は今日、ダウンロード検証・成果物の署名・コンテンツの重複排除・コンテンツアドレス型ストレージ・ブロックチェーン処理の標準です。16 進ダイジェストをワンクリックでコピーし、公開元のチェックサムと比較できます。",
      ],
      steps: [
        "テキストを入力・貼り付け — ダイジェストは入力に合わせて更新されます。",
        "またはファイルモードに切り替え、ファイルをドロップしてローカルでハッシュ化。",
        "16 進ダイジェストをコピーし、期待値と比較します。",
      ],
      faqs: [
        {
          q: "SHA-256 は安全ですか?",
          a: "はい。SHA-256 は SHA-2 ファミリーの一部で、20 年以上の解析でも破られていません。TLS 証明書、Bitcoin、多くのソフトウェアリリース検証の基盤となるダイジェストです。",
        },
        {
          q: "同じ入力から常に同じハッシュになるのはなぜ?",
          a: "SHA-256 は決定論的だからです。同一のバイト列は常に同一のダイジェストを生みます。チェックサム比較が機能するのはまさにこの性質のおかげで、どこか 1 バイト変わればダイジェスト全体が変わります。",
        },
        {
          q: "テキストやファイルはアップロードされますか?",
          a: "いいえ。ハッシュはブラウザ内の WebCrypto でローカルに計算され、データは端末の外に出ません。",
        },
      ],
      deepDive: [
        {
          heading: "SHA-2 ファミリーと出力長",
          paragraphs: [
            "SHA-256 は SHA-2 ファミリーの一員です。SHA-2 は米国 NIST が 2000 年代初頭に SHA-1 の後継として標準化したものです。ファミリー名には出力ビット長がそのまま入っています:SHA-224・SHA-256・SHA-384・SHA-512 はそれぞれ 224・256・384・512 ビット、つまり 64・64・96・128 文字の十六進です。「SHA-256」と名乗るダイジェストが 64 文字の十六進でなければ、ラベルが何と言おうと SHA-256 ではありません。",
            "各変体は単なる切り詰めではなく、内部構造も異なります。SHA-512 は 64 ビット語で動作し、現代の 64 ビット CPU では大きなファイルをハッシュする際、実は SHA-256 より速いこともあります。SHA-256 は 32 ビット語で互換性が最も広い。SHA-224 と SHA-384 は特定の規格がより短いダイジェストを求めたための切り詰め変体です。",
            "SHA-2 を SHA-3(Keccak)と混同しないでください——後者は十年後に標準化された別の構成方式です。SHA-1 とはなおさらです——160 ビットの前身で、衝突耐性は破られており、新しい設計では絶対に使えません。ダウンロードページに「SHA-256 で検証」とあるなら、本ツールがそのダイジェストをブラウザの WebCrypto で計算します。",
          ],
        },
        {
          heading: "ダイジェストを正しく比較する",
          paragraphs: [
            "二つのダイジェストは完全一致か、そうでなければファイルが違うか——部分的な正解はありません。64 文字を目で比較するのは危険なので、ツールに任せてください。ダウンロードしたファイルを sha256sum・shasum -a 256・CertUtil に通し、文字列をプログラムで比較するか diff を使います。一文字でも違えば破損か置き換えで、丸め誤差ではありません。",
            "雪崩効果こそがチェックサムの信頼の根拠です。数 GB のファイルのどこか 1 ビットを反転すれば、ダイジェストは無関係なランダム風の 256 ビット値に変わります。これはダイジェストから内容を推測できないことも意味します——ファイラーでは同一に見える二つのファイルも、メタデータが違えばハッシュも違います。",
            "注目すべきはアルゴリズムではなく入力経路です。エンコーディングが定番の元凶で、「café」を UTF-8 と Latin-1 でハッシュすれば、バイト列が違うためダイジェストも違います。本ツールは入力のバイトをそのまま計算し(テキストは UTF-8)、ファイルはそのままのバイトで計算します。これはあらゆる標準チェックサム作業が期待する動作です。",
          ],
        },
        {
          heading: "なぜブラウザでハッシュするのか",
          paragraphs: [
            "ファイルのハッシュは、計算環境が信頼できなければ意味がありません。見知らぬ Web サーバーは信頼できません。本ツールは WebCrypto——ブラウザに組み込まれ TLS も依存している暗号ライブラリ——を使うので、得られるダイジェストは監査済みのネイティブコードによるもので、ローカルで計算されます。テキストもファイルも端末の外に出ません。",
            "ローカル計算は実務上の上限も取り払います。アップロード帯域も、メモリを超えるサイズ制限も、サーバーの順番待ちもありません。大きなアーカイブのフィンガープリントはディスク読み出し速度が律速で、ページを読み込んだ後はオフラインでも全工程が動きます。",
            "WebCrypto は MD5 を提供しないため、当サイトの MD5 ジェネレーターは純 JavaScript 実装を、SHA-256 はネイティブ実装を使います。新規の設計では SHA-256 以上を選びましょう。複数のダイジェストが必要なときは、ハッシュジェネレーターのページで SHA-2 ファミリー全体を並べて計算できます。",
          ],
        },
      ],
    },
    es: {
      name: "Generador SHA-256",
      tagline:
        "Calcula hashes SHA-256 de texto o archivos en línea con WebCrypto nativo — la opción estándar para integridad y huellas. 100% en el navegador.",
      intro: [
        "Escribe texto y ve aparecer su digest SHA-256 de 256 bits en vivo, o suelta un archivo para obtener la huella de gigabytes sin subir nada. El hash lo calcula la implementación WebCrypto del propio navegador — el mismo código en el que confían tu sistema operativo y tu pila TLS.",
        "SHA-256 es hoy el estándar para verificar descargas, firmar artefactos, deduplicar contenido, almacenamiento direccionado por contenido y trabajo con blockchain. Copia el digest hexadecimal con un clic y compáralo con el checksum del publicador.",
      ],
      steps: [
        "Escribe o pega el texto — el digest se actualiza al escribir.",
        "O cambia a modo Archivo y suelta un archivo para hashearlo localmente.",
        "Copia el digest hexadecimal y compáralo con el valor esperado.",
      ],
      faqs: [
        {
          q: "¿SHA-256 es seguro?",
          a: "Sí — SHA-256 pertenece a la familia SHA-2 y lleva dos décadas de análisis sin romperse. Es el digest detrás de los certificados TLS, Bitcoin y la mayoría de verificaciones de lanzamientos de software.",
        },
        {
          q: "¿Por qué la misma entrada da siempre el mismo hash?",
          a: "Porque SHA-256 es determinista: bytes idénticos producen siempre un digest idéntico. Esa propiedad es la que hace funcionar la comparación de checksums — un solo byte cambiado altera el digest completo.",
        },
        {
          q: "¿Mi texto y archivos se suben?",
          a: "No. El hasheo corre localmente en tu navegador con WebCrypto — tus datos nunca salen del dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "La familia SHA-2 y sus tamaños de salida",
          paragraphs: [
            "SHA-256 es un miembro de la familia SHA-2, que el NIST estadounidense estandarizó a principios de los 2000 como reemplazo de SHA-1. El nombre de la familia codifica el tamaño de salida en bits: SHA-224, SHA-256, SHA-384 y SHA-512 producen 224, 256, 384 y 512 bits respectivamente — es decir 64, 64, 96 y 128 caracteres hexadecimales. Un digest que se diga “SHA-256” y no tenga exactamente 64 caracteres hexadecimales no es SHA-256, diga lo que diga la etiqueta.",
            "Las variantes difieren internamente, no solo por truncado. SHA-512 opera con palabras de 64 bits y puede ser más rápido que SHA-256 en CPUs de 64 bits al hashear archivos grandes; SHA-256 usa palabras de 32 bits y es la opción con mayor compatibilidad. SHA-224 y SHA-384 son variantes truncadas definidas para estándares que querían digests más cortos.",
            "No confundas SHA-2 con SHA-3 (Keccak), una construcción distinta estandarizada una década después, ni con SHA-1, el predecesor de 160 bits cuya resistencia a colisiones está rota y no debe usarse en diseños nuevos. Cuando una página de descarga dice “verifica con SHA-256”, esta herramienta te da exactamente ese digest, calculado por el WebCrypto de tu navegador.",
          ],
        },
        {
          heading: "Comparar digests sin equivocarse",
          paragraphs: [
            "Dos digests o coinciden exactamente o los archivos difieren — no hay aciertos parciales. Comparar 64 caracteres a ojo es propenso a errores, así que automatízalo: pasa el archivo descargado por sha256sum, shasum -a 256 o CertUtil, y compara las cadenas por programa o con un diff. Un solo carácter distinto significa corrupción o sustitución, nunca un artefacto de redondeo.",
            "El efecto avalancha es la propiedad que da credibilidad a los checksums: voltea un bit en cualquier parte de un archivo de varios gigas y el digest se convierte en un valor de 256 bits sin relación alguna, de aspecto aleatorio. Esto también implica que no puedes inferir nada del contenido a partir del digest — dos archivos que parecen idénticos en el explorador pueden diferir en metadatos y hashear distinto.",
            "Cuida el pipeline de entrada, no el algoritmo. La codificación es el culpable habitual: hashear el texto “café” como UTF-8 y como Latin-1 da digests distintos porque los bytes difieren. Esta herramienta hashea exactamente los bytes de lo que escribes (UTF-8 para texto) o los bytes exactos del archivo, que es lo que todo flujo de checksum estándar espera.",
          ],
        },
        {
          heading: "Por qué hashear en el navegador",
          paragraphs: [
            "El hash de un archivo solo significa algo si el entorno que lo calcula es confiable, y un servidor web cualquiera no lo es. Esta herramienta usa WebCrypto — la librería criptográfica integrada en el propio navegador y en la que confía TLS — así que el digest proviene de código nativo auditado, calculado localmente; el texto y los archivos nunca salen de tu dispositivo.",
            "El cálculo local también elimina los techos prácticos: sin ancho de banda de subida, sin límite de tamaño más allá de la memoria disponible, sin colas. La huella de un archivo grande está limitada por la velocidad de lectura del disco, y una vez cargada la página todo el flujo funciona sin conexión.",
            "WebCrypto no ofrece MD5, por eso el generador MD5 de este sitio usa una implementación JavaScript pura mientras SHA-256 va por la nativa. Para cualquier cosa nueva, prefiere SHA-256 o más fuerte — la página del generador de hashes calcula toda la familia SHA-2 a la vez cuando necesitas varios digests.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador SHA-256",
      tagline:
        "Calcule hashes SHA-256 de texto ou arquivos on-line com WebCrypto nativo — a escolha padrão para integridade e impressões digitais. 100% no navegador.",
      intro: [
        "Digite texto e veja o digest SHA-256 de 256 bits surgir ao vivo, ou solte um arquivo para gerar a impressão digital de gigabytes sem enviar nada. O hash é calculado pela implementação WebCrypto do próprio navegador — o mesmo código em que seu sistema operacional e pilha TLS confiam.",
        "SHA-256 é hoje o padrão para verificar downloads, assinar artefatos, deduplicar conteúdo, armazenamento endereçado por conteúdo e trabalho com blockchain. Copie o digest hexadecimal com um clique e compare com o checksum que o publicador forneceu.",
      ],
      steps: [
        "Digite ou cole o texto — o digest atualiza conforme você digita.",
        "Ou mude para o modo Arquivo e solte um arquivo para hashear localmente.",
        "Copie o digest hexadecimal e compare com o valor esperado.",
      ],
      faqs: [
        {
          q: "SHA-256 é seguro?",
          a: "Sim — o SHA-256 faz parte da família SHA-2 e segue intacto após duas décadas de análise. É o digest por trás de certificados TLS, Bitcoin e da maioria das verificações de releases de software.",
        },
        {
          q: "Por que a mesma entrada sempre gera o mesmo hash?",
          a: "Porque o SHA-256 é determinístico: bytes idênticos sempre produzem um digest idêntico. É exatamente essa propriedade que faz a comparação de checksums funcionar — um único byte alterado muda o digest inteiro.",
        },
        {
          q: "Meu texto e arquivos são enviados?",
          a: "Não. O hashing roda localmente no seu navegador com WebCrypto — seus dados nunca saem do dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "A família SHA-2 e seus tamanhos de saída",
          paragraphs: [
            "O SHA-256 é um membro da família SHA-2, padronizada pelo NIST americano no início dos anos 2000 como substituição do SHA-1. O nome da família codifica o tamanho de saída em bits: SHA-224, SHA-256, SHA-384 e SHA-512 produzem 224, 256, 384 e 512 bits respectivamente — ou seja 64, 64, 96 e 128 caracteres hexadecimais. Um digest que se diz “SHA-256” e não tem exatamente 64 caracteres hexadecimais não é SHA-256, diga o que disser a etiqueta.",
            "As variantes diferem internamente, não apenas por truncamento. O SHA-512 opera com palavras de 64 bits e pode ser mais rápido que o SHA-256 em CPUs de 64 bits ao hashear arquivos grandes; o SHA-256 usa palavras de 32 bits e é a opção com maior compatibilidade. SHA-224 e SHA-384 são variantes truncadas definidas para padrões que queriam digests mais curtos.",
            "Não confunda SHA-2 com SHA-3 (Keccak), uma construção diferente padronizada uma década depois, nem com o SHA-1, o predecessor de 160 bits cuja resistência a colisões está quebrada e não deve ser usado em projetos novos. Quando uma página de download diz “verifique com SHA-256”, esta ferramenta entrega exatamente esse digest, calculado pelo WebCrypto do seu navegador.",
          ],
        },
        {
          heading: "Comparar digests sem errar",
          paragraphs: [
            "Dois digests ou coincidem exatamente ou os arquivos diferem — não existe acerto parcial. Comparar 64 caracteres a olho é propenso a erros, então automatize: passe o arquivo baixado por sha256sum, shasum -a 256 ou CertUtil, e compare as strings por programa ou com um diff. Um único caractere diferente significa corrupção ou substituição, nunca um artefato de arredondamento.",
            "O efeito avalanche é a propriedade que dá credibilidade aos checksums: inverta um bit em qualquer ponto de um arquivo de vários gigas e o digest se torna um valor de 256 bits sem qualquer relação, de aparência aleatória. Isso também implica que você não pode inferir nada do conteúdo a partir do digest — dois arquivos que parecem idênticos no gerenciador podem diferir nos metadados e hashear diferente.",
            "Cuide do pipeline de entrada, não do algoritmo. A codificação é o culpado habitual: hashear o texto “café” como UTF-8 e como Latin-1 dá digests diferentes porque os bytes diferem. Esta ferramenta hashea exatamente os bytes do que você digita (UTF-8 para texto) ou os bytes exatos do arquivo, que é o que todo fluxo de checksum padrão espera.",
          ],
        },
        {
          heading: "Por que hashear no navegador",
          paragraphs: [
            "O hash de um arquivo só faz sentido se o ambiente que o calcula for confiável, e um servidor web qualquer não é. Esta ferramenta usa WebCrypto — a biblioteca criptográfica embutida no próprio navegador e na qual o TLS confia — então o digest vem de código nativo auditado, calculado localmente; o texto e os arquivos nunca saem do seu dispositivo.",
            "O cálculo local também elimina os tetos práticos: sem banda de upload, sem limite de tamanho além da memória disponível, sem filas. A impressão digital de um arquivo grande é limitada pela velocidade de leitura do disco, e depois que a página carrega todo o fluxo funciona offline.",
            "O WebCrypto não oferece MD5, por isso o gerador MD5 deste site usa uma implementação JavaScript pura enquanto o SHA-256 vai pela nativa. Para qualquer coisa nova, prefira SHA-256 ou mais forte — a página do gerador de hashes calcula toda a família SHA-2 lado a lado quando você precisa de vários digests.",
          ],
        },
      ],
    },
  },
});
