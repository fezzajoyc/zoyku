import { DevHashEngine } from "../_engines/dev-engine-hash";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sha512-generator",
  category: "developer",
  icon: "hash",
  engine: { component: DevHashEngine, props: { algos: ["SHA-512"] } },
  related: ["sha256-generator", "sha384-generator", "hash-generator", "base64-encoder", "md5-generator", "base64-image", "json-validator", "json-formatter", "url-encoder", "html-minifier"],
  copy: {
    en: {
      name: 'SHA-512 Generator',
      tagline: 'Compute SHA-512 hashes of text or files in your browser with native WebCrypto — the strongest SHA-2 digest for checksums, HMAC and archival integrity. 100% client-side.',
      intro: [
        "Hashing large installers or disk images, generating long-term archival checksums, or signing API payloads where the widest margin matters — paste text or drop a file and the 512-bit digest updates live, entirely in your browser.",
        "The digest is 128 hexadecimal characters (64 bytes). On 64-bit CPUs SHA-512 actually outpaces SHA-256 because it works on 64-bit words internally, so even large files hash quickly without a single byte leaving your device.",
        "Everything runs through the native WebCrypto SubtleCrypto digest API, which implements FIPS 180-4: 1024-bit blocks, 80 rounds of 64-bit words. Results match sha512sum, OpenSSL and every other standards-compliant tool.",
        "That margin is why modern Linux /etc/shadow password entries, HMAC-SHA512 API signatures and archival manifests build on it — when a checksum must still be trustworthy decades from now, 512 bits is the conventional answer."
      ],
      steps: ['Type or paste the text — the digest updates as you type.', 'Or switch to File mode and drop a file to hash it locally.', 'Copy the hexadecimal digest and compare it with the expected value.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "SHA-512: the widest digest in the SHA-2 family",
          paragraphs: [
            "SHA-512 is the largest standard member of the SHA-2 family, standardized in FIPS 180-4: 512-bit digests written as 128 lowercase hexadecimal characters. Internally it processes 1024-bit blocks through 80 rounds of 64-bit words — a wider pipeline than SHA-256's 32-bit words, which is what gives it its character.",
            "That 64-bit design has a famous practical consequence: on modern 64-bit CPUs, SHA-512 actually hashes large files faster than SHA-256, despite producing more output. If you are fingerprinting installers, disk images or backup archives, the strongest SHA-2 digest is also usually the quickest — a rare case where the paranoid choice and the pragmatic choice are the same one.",
            "No practical collision or preimage attacks are known against SHA-512. That margin is why it anchors long-lived integrity commitments: HMAC-SHA512 API signatures, password entries in modern Linux /etc/shadow, and archival manifests meant to still be verifiable decades from now. For new designs with no external constraint, SHA-256 is the conventional default and SHA-512 is the conventional upgrade.",
          ],
        },
        {
          heading: "Reading, comparing and trusting a 128-character digest",
          paragraphs: [
            "The length check comes first: a SHA-512 digest is exactly 128 hex characters. Values of other lengths in a config field named sha512 are a different algorithm mislabeled, and the mismatch will surface as an integration failure later. This tool produces the canonical lowercase form, matching sha512sum, OpenSSL and every other conformant implementation.",
            "Comparison is all-or-nothing: two digests either match exactly or the inputs differ. A single flipped bit anywhere in a multi-gigabyte file produces an unrelated 512-bit value — the avalanche effect that makes checksums trustworthy. Compare programmatically (diff, ==, or a checksum utility) rather than proofreading 128 characters by eye, where a transposed pair is invisible.",
            "Remember what a digest does and does not promise. It proves the bytes are unchanged since the digest was computed, provided the digest itself reached you over a channel an attacker could not rewrite. It says nothing about who produced the input, and — because hashing is one-way — it cannot be reversed to recover the content. Publishing a checksum alongside a download is an integrity measure, not a signature.",
          ],
        },
        {
          heading: "Why hash files locally at all",
          paragraphs: [
            "A hash is only meaningful if the hashing environment is trustworthy, and a random web service is not. This tool computes through the browser's native WebCrypto SubtleCrypto — audited code that already carries your TLS traffic — and nothing leaves the device: text hashes as you type, and file mode hashes the file's exact bytes locally with no upload and no ceiling beyond available memory.",
            "For the tool's typical workloads this locality is not a luxury. Disk images and installers are gigabytes that no one wants uploading just to be fingerprinted; archival manifests often cover files with licensing or privacy constraints; and API signing material should never transit a third-party page. Once the page is loaded, the entire workflow runs offline.",
            "Input precision completes the picture: text is hashed as UTF-8 bytes, so line-ending conversions or an editor-appended newline change every character of the output. When verifying a download, hash the file itself rather than retyped content, then compare against the publisher's value programmatically — that pair of habits catches essentially every false-alarm mismatch.",
          ],
        },
      ],
    },
    zh: {
      name: 'SHA-512 生成器',
      tagline: '在浏览器里用原生 WebCrypto 计算 SHA-512 哈希——SHA-2 家族最强的摘要算法,校验和、HMAC 与归档完整性首选。完全本地处理。',
      intro: ['粘贴文本即可实时看到 512 位 SHA-512 摘要,或拖入文件在本地生成指纹。在 64 位硬件上 SHA-512 反而比 SHA-256 更快,处理大文件归档和备份时是自然之选。', 'SHA-512 常见于 HMAC-SHA512 API 签名、磁盘镜像校验和注重安全余量的长期归档校验。一键复制十六进制摘要,与任何公开校验和比对。'],
      steps: ['输入或粘贴文本——摘要随输入实时更新。', '也可切换到文件模式,拖入文件在本地计算。', '复制十六进制摘要,与预期值比对。'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "SHA-512:SHA-2 家族里最宽的摘要",
          paragraphs: [
            "SHA-512 是 SHA-2 家族里最大的标准成员,标准化于 FIPS 180-4:512 位摘要,写成 128 个小写十六进制字符。内部以 80 轮 64 位字处理 1024 位分组——管线比 SHA-256 的 32 位字更宽,这正是它的性格来源。",
            "64 位设计带来一个著名的实际后果:在现代 64 位 CPU 上,SHA-512 处理大文件反而比 SHA-256 快,尽管输出更多。如果你在给安装包、磁盘镜像或备份归档取指纹,SHA-2 里最强的摘要同时也是最快的——偏执的选择和务实的选择罕见地是同一个。",
            "目前没有针对 SHA-512 的实用碰撞或原像攻击。这份余量正是它锚定长期完整性承诺的原因:HMAC-SHA512 API 签名、现代 Linux /etc/shadow 里的密码条目、以及希望几十年后仍可验证的归档清单。没有外部约束的新设计,惯例默认是 SHA-256,惯例升级是 SHA-512。",
          ],
        },
        {
          heading: "读取、比对与信任一个 128 字符的摘要",
          paragraphs: [
            "先做长度检查:SHA-512 摘要恰好 128 个十六进制字符。在名为 sha512 的配置字段里出现其他长度的值,是被贴错标签的另一个算法,不匹配迟早会以集成故障的形式浮出水面。本工具产出规范的小写形式,与 sha512sum、OpenSSL 和所有合规实现一致。",
            "比对是全有或全无:两个摘要要么精确相等,要么输入不同。一个几十亿字节的文件里翻转任何一个比特,都会产生一个毫不相干的 512 位值——正是这种雪崩效应让校验和可信。用程序比对(diff、== 或校验和工具),别靠肉眼校对 128 个字符——换位的两个字符肉眼是看不见的。",
            "记住摘要求诺什么、不承诺什么。只要摘要本身经攻击者无法改写的信道传到你手上,它就证明字节自计算起未被改动。它不说明输入是谁产生的,而且——因为哈希是单向的——不能反推恢复内容。下载旁边附一个校验和是完整性措施,不是签名。",
          ],
        },
        {
          heading: "为什么文件哈希要在本地做",
          paragraphs: [
            "只有哈希环境可信,哈希才有意义,而一个随机的网络服务并不可信。本工具通过浏览器原生 WebCrypto SubtleCrypto 计算——承载你 TLS 流量的同一段经过审计的代码——而且什么都不离开设备:文本随输入哈希,文件模式在本地哈希文件的精确字节,不上传,上限只有可用内存。",
            "对这个工具的典型负载,本地性不是奢侈。磁盘镜像和安装包是几个 GB,没人想为了取个指纹就上传;归档清单覆盖的文件常带授权或隐私约束;API 签名材料更不该经过第三方页面。页面加载完成后,整个工作流离线可用。",
            "输入的精确性补全这幅图:文本按 UTF-8 字节哈希,所以换行符转换或编辑器追加的换行会改变输出的每个字符。验证下载时,哈希文件本身而不是重新敲的内容,再与发布方的值用程序比对——这两个习惯能抓住几乎所有虚惊一场的不匹配。",
          ],
        },
      ],
    },
    ja: {
      name: 'SHA-512 ジェネレーター',
      tagline: 'ネイティブ WebCrypto でブラウザ内のテキストやファイルの SHA-512 を計算 — SHA-2 ファミリー最強のダイジェスト。チェックサム・HMAC・アーカイブ完全性に最適。100% クライアント処理。',
      intro: ['テキストを貼り付けると 512 ビットの SHA-512 ダイジェストがリアルタイムに表示され、ファイルをドロップすればローカルでフィンガープリントできます。64 ビット CPU では SHA-512 が SHA-256 より速いことも多く、大きなアーカイブやバックアップのハッシュに適します。', 'SHA-512 は HMAC-SHA512 API 署名、ディスクイメージ検証、セキュリティマージンを最重視する長期アーカイブのチェックサムに登場します。16 進ダイジェストをワンクリックでコピーし、公開されたチェックサムと比較できます。'],
      steps: ['テキストを入力・貼り付け — ダイジェストは入力に合わせて更新されます。', 'またはファイルモードに切り替え、ファイルをドロップしてローカルでハッシュ化。', '16 進ダイジェストをコピーし、期待値と比較します。'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "SHA-512:SHA-2 ファミリーで最も広いダイジェスト",
          paragraphs: [
            "SHA-512 は SHA-2 ファミリーの最大の標準メンバーで、FIPS 180-4 に標準化されています。512 ビットのダイジェスト、小文字 16 進 128 文字。内部では 1024 ビット ブロックを 80 ラウンドの 64 ビット語で処理します — SHA-256 の 32 ビット語より広いパイプラインで、これがその性格を与えています。",
            "その 64 ビット設計には有名な実用的帰結があります。現代の 64 ビット CPU では、SHA-512 はより多くの出力を生みながら、大きなファイルのハッシュでは SHA-256 より実際に速いのです。インストーラ、ディスク イメージ、バックアップ アーカイブのフィンガープリントを取るなら、SHA-2 で最も強いダイジェストが同時に通常最速 — 偏執的な選択と実務的な選択が一致する稀なケースです。",
            "SHA-512 に対する実用的な衝突攻撃も原像攻撃も知られていません。このマージンゆえに、長寿命の完全性の約束を支えます。HMAC-SHA512 の API 署名、現代の Linux の /etc/shadow のパスワード エントリ、数十年後も検証可能であるべきアーカイブのマニフェスト。外部制約のない新しい設計では、慣例の既定は SHA-256、慣例のアップグレードは SHA-512 です。",
          ],
        },
        {
          heading: "128 文字のダイジェストを読み、比較し、信頼する",
          paragraphs: [
            "まず長さの検査です。SHA-512 のダイジェストは正確に 16 進 128 文字。sha512 と名のついた設定フィールドに別の長さの値があれば、それは誤ラベルの別アルゴリズムであり、不一致は後で統合障害として姿を現します。このツールは標準の小文字形式を生み出し、sha512sum、OpenSSL、そしてすべての準拠実装と一致します。",
            "比較は全か無かです。2 つのダイジェストは正確に一致するか、入力が異なるかのどちらかです。数ギガバイトのファイルのどこかで 1 ビット反転すれば、無関係な 512 ビット値が生まれます — チェックサムを信頼できるものにする雪崩効果です。128 文字を目で校正するのではなく、プログラムで比較してください(diff、==、チェックサム ユーティリティ)。入れ替わった 2 文字は肉眼には見えません。",
            "ダイジェストが何を約束し、何を約束しないかを覚えておいてください。ダイジェスト自体が攻撃者が書き換えられない経路で届くなら、バイトが計算時点から変わっていないことを証明します。入力の作り手については何も言わず、ハッシュは一方向なので内容を復元することもできません。ダウンロードの横にチェックサムを置くことは完全性の施策であって、署名ではありません。",
          ],
        },
        {
          heading: "なぜファイルのハッシュをローカルで行うのか",
          paragraphs: [
            "ハッシュ環境が信頼できなければ、ハッシュは意味を持ちません。見知らぬ Web サービスは信頼できません。このツールはブラウザのネイティブ WebCrypto SubtleCrypto — あなたの TLS 通信をすでに運ぶ監査済みコード — で計算し、何も端末の外に出ません。テキストは入力に合わせてハッシュされ、ファイル モードはファイルの正確なバイトをローカルでハッシュします。アップロードはなく、上限は利用可能なメモリだけです。",
            "このツールの典型的なワークロードでは、この局所性は贅沢ではありません。ディスク イメージやインストーラは、フィンガープリントのためだけにアップロードしたくないギガバイトです。アーカイブのマニフェストは、ライセンスやプライバシーの制約を持つファイルをよくカバーします。API 署名の材料はサードパーティのページを経由すべきではありません。ページを読み込んだ後、ワークフロー全体がオフラインで動きます。",
            "入力の正確さが絵を仕上げます。テキストは UTF-8 バイトでハッシュされるため、改行コードの変換やエディタが付け足した改行は出力のすべての文字を変えます。ダウンロードの検証では、打ち直した内容ではなくファイル自体をハッシュし、発行者の値とプログラムで比較してください — この二つの習慣が、実質的にすべての誤報の不一致を捉えます。",
          ],
        },
      ],
    },
    es: {
      name: 'Generador SHA-512',
      tagline: 'Calcula hashes SHA-512 de texto o archivos en tu navegador con WebCrypto nativo — el resumen SHA-2 más fuerte para checksums, HMAC e integridad de archivos. 100% local.',
      intro: ['Pega texto para ver su resumen SHA-512 de 512 bits en vivo, o suelta un archivo para generar su huella localmente. En hardware de 64 bits, SHA-512 es incluso más rápido que SHA-256, lo que lo convierte en la elección natural para archivar y respaldar grandes volúmenes.', 'SHA-512 aparece en firmas HMAC-SHA512 de APIs, verificación de imágenes de disco y checksums de archivo a largo plazo donde importa el mayor margen de seguridad. Copia el resumen hexadecimal y compáralo con cualquier checksum publicado.'],
      steps: ['Escribe o pega el texto: el resumen se actualiza al escribir.', 'O cambia al modo archivo y suelta un archivo para hashearlo localmente.', 'Copia el resumen hexadecimal y compáralo con el valor esperado.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "SHA-512: el resumen más ancho de la familia SHA-2",
          paragraphs: [
            "SHA-512 es el miembro estándar más grande de la familia SHA-2, estandarizado en FIPS 180-4: resúmenes de 512 bits escritos como 128 caracteres hexadecimales en minúsculas. Internamente procesa bloques de 1024 bits mediante 80 rondas de palabras de 64 bits — un conducto más ancho que las palabras de 32 bits de SHA-256, y eso es lo que le da su carácter.",
            "Ese diseño de 64 bits tiene una consecuencia práctica famosa: en CPUs de 64 bits modernas, SHA-512 hashea archivos grandes más rápido que SHA-256, pese a producir más salida. Si tomas la huella de instaladores, imágenes de disco o archivos de respaldo, el resumen SHA-2 más fuerte es también normalmente el más rápido — un caso raro en que la elección paranoica y la pragmática son la misma.",
            "No se conocen ataques prácticos de colisión ni de preimagen contra SHA-512. Ese margen es por qué ancla compromisos de integridad de larga vida: firmas de API HMAC-SHA512, entradas de contraseñas en el /etc/shadow de Linux moderno, y manifiestos de archivo pensados para seguir siendo verificables dentro de décadas. Para diseños nuevos sin restricción externa, el valor por defecto convencional es SHA-256 y la mejora convencional es SHA-512.",
          ],
        },
        {
          heading: "Leer, comparar y confiar en un resumen de 128 caracteres",
          paragraphs: [
            "La comprobación de longitud va primero: un resumen SHA-512 tiene exactamente 128 caracteres hexadecimales. Valores de otra longitud en un campo llamado sha512 son otro algoritmo mal etiquetado, y el desfase aparecerá después como fallo de integración. Esta herramienta produce la forma canónica en minúsculas, coincidente con sha512sum, OpenSSL y toda implementación conforme.",
            "La comparación es todo-o-nada: dos resúmenes coinciden exactamente o las entradas difieren. Un solo bit volteado en cualquier lugar de un archivo de varios gigabytes produce un valor de 512 bits sin relación — el efecto avalancha que hace confiables los checksums. Compara programáticamente (diff, ==, o una utilidad de checksum) en vez de corregir 128 caracteres a ojo, donde un par transpuesto es invisible.",
            "Recuerda qué promete y qué no promete un resumen. Demuestra que los bytes no han cambiado desde que se calculó el resumen, siempre que el resumen mismo te llegara por un canal que un atacante no pudiera reescribir. No dice nada sobre quién produjo la entrada, y — porque el hashing es unidireccional — no puede invertirse para recuperar el contenido. Publicar un checksum junto a una descarga es una medida de integridad, no una firma.",
          ],
        },
        {
          heading: "Por qué hashear archivos en local",
          paragraphs: [
            "Un hash solo tiene sentido si el entorno de hashing es confiable, y un servicio web aleatorio no lo es. Esta herramienta calcula mediante el WebCrypto SubtleCrypto nativo del navegador — código auditado que ya transporta tu tráfico TLS — y nada sale del dispositivo: el texto se hashea al escribir, y el modo archivo hashea los bytes exactos del archivo en local, sin subida y sin techo más allá de la memoria disponible.",
            "Para las cargas de trabajo típicas de la herramienta, esa localidad no es un lujo. Las imágenes de disco y los instaladores son gigabytes que nadie quiere subir solo para tomarles la huella; los manifiestos de archivo suelen cubrir archivos con restricciones de licencia o privacidad; y el material de firma de API jamás debería pasar por una página de terceros. Una vez cargada la página, todo el flujo corre sin conexión.",
            "La precisión de la entrada completa el cuadro: el texto se hashea como bytes UTF-8, así que conversiones de finales de línea o un salto añadido por el editor cambian cada carácter de la salida. Al verificar una descarga, hashea el archivo mismo en vez del contenido reescrito, y compara con el valor del editor programáticamente — ese par de hábitos atrapa esencialmente toda alarma falsa.",
          ],
        },
      ],
    },
    pt: {
      name: 'Gerador SHA-512',
      tagline: 'Calcule hashes SHA-512 de texto ou arquivos no navegador com WebCrypto nativo — o resumo SHA-2 mais forte para checksums, HMAC e integridade de arquivos. 100% local.',
      intro: ['Cole texto para ver o resumo SHA-512 de 512 bits em tempo real, ou solte um arquivo para gerar a impressão digital localmente. Em hardware de 64 bits, SHA-512 é até mais rápido que SHA-256, sendo a escolha natural para arquivar e backup de grandes volumes.', 'SHA-512 aparece em assinaturas HMAC-SHA512 de APIs, verificação de imagens de disco e checksums de arquivo de longo prazo onde a maior margem de segurança importa. Copie o resumo hexadecimal e compare com qualquer checksum publicado.'],
      steps: ['Digite ou cole o texto — o resumo atualiza conforme você digita.', 'Ou mude para o modo arquivo e solte um arquivo para hashear localmente.', 'Copie o resumo hexadecimal e compare com o valor esperado.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "SHA-512: o resumo mais largo da família SHA-2",
          paragraphs: [
            "O SHA-512 é o maior membro padrão da família SHA-2, padronizado no FIPS 180-4: resumos de 512 bits escritos como 128 caracteres hexadecimais minúsculos. Internamente processa blocos de 1024 bits por 80 rodadas de palavras de 64 bits — um duto mais largo que as palavras de 32 bits do SHA-256, e é isso que lhe dá o caráter.",
            "Esse desenho de 64 bits tem uma consequência prática famosa: em CPUs de 64 bits modernas, o SHA-512 hashea arquivos grandes mais rápido que o SHA-256, apesar de produzir mais saída. Se você tira a impressão digital de instaladores, imagens de disco ou arquivos de backup, o resumo SHA-2 mais forte é também normalmente o mais rápido — um caso raro em que a escolha paranoica e a pragmática são a mesma.",
            "Não se conhecem ataques práticos de colisão nem de pré-imagem contra o SHA-512. Essa margem é por que ele ancora compromissos de integridade de longa vida: assinaturas de API HMAC-SHA512, entradas de senha no /etc/shadow do Linux moderno, e manifestos de arquivo pensados para continuar verificáveis daqui a décadas. Para desenhos novos sem restrição externa, o padrão convencional é o SHA-256 e a atualização convencional é o SHA-512.",
          ],
        },
        {
          heading: "Ler, comparar e confiar num resumo de 128 caracteres",
          paragraphs: [
            "A checagem de comprimento vem primeiro: um resumo SHA-512 tem exatamente 128 caracteres hexadecimais. Valores de outro comprimento num campo chamado sha512 são outro algoritmo mal rotulado, e o descasamento aparecerá depois como falha de integração. Esta ferramenta produz a forma canônica minúscula, coincidente com sha512sum, OpenSSL e toda implementação conforme.",
            "A comparação é tudo-ou-nada: dois resumos coincidem exatamente ou as entradas diferem. Um único bit virado em qualquer lugar de um arquivo de vários gigabytes produz um valor de 512 bits sem relação — o efeito avalanche que torna checksums confiáveis. Compare programaticamente (diff, ==, ou um utilitário de checksum) em vez de revisar 128 caracteres a olho, onde um par trocado é invisível.",
            "Lembre o que um resumo promete e o que não promete. Ele prova que os bytes não mudaram desde que o resumo foi calculado, contanto que o resumo mesmo tenha chegado até você por um canal que um atacante não pudesse reescrever. Não diz nada sobre quem produziu a entrada, e — porque hashing é unidirecional — não pode ser revertido para recuperar o conteúdo. Publicar um checksum junto a um download é uma medida de integridade, não uma assinatura.",
          ],
        },
        {
          heading: "Por que hashear arquivos localmente",
          paragraphs: [
            "Um hash só faz sentido se o ambiente de hashing é confiável, e um serviço web aleatório não é. Esta ferramenta calcula pelo WebCrypto SubtleCrypto nativo do navegador — código auditado que já transporta seu tráfego TLS — e nada sai do dispositivo: o texto hashea enquanto você digita, e o modo arquivo hashea os bytes exatos do arquivo localmente, sem upload e sem teto além da memória disponível.",
            "Para as cargas de trabalho típicas da ferramenta, essa localidade não é luxo. Imagens de disco e instaladores são gigabytes que ninguém quer subir só para tirar a impressão digital; manifestos de arquivo costumam cobrir arquivos com restrições de licença ou privacidade; e material de assinatura de API jamais deveria passar por uma página de terceiros. Uma vez carregada a página, todo o fluxo roda offline.",
            "A precisão da entrada completa o quadro: o texto é hasheado como bytes UTF-8, então conversões de finais de linha ou uma quebra acrescentada pelo editor mudam cada caractere da saída. Ao verificar um download, hasheie o próprio arquivo em vez do conteúdo redigitado, e compare com o valor do publicador programaticamente — esse par de hábitos captura essencialmente todo falso alarme.",
          ],
        },
      ],
    },
  },
});
