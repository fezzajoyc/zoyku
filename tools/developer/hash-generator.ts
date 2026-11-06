import { DevHashEngine } from "../_engines/dev-engine-hash";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "hash-generator",
  category: "developer",
  icon: "hash",
  engine: {
    component: DevHashEngine,
    props: { algos: ["SHA-256", "SHA-1", "SHA-384", "SHA-512", "MD5"], defaultAlgo: "SHA-256" },
  },
  related: ["sha256-generator", "md5-generator", "uuid-generator", "base64-encoder", "base64-image", "json-validator", "json-formatter", "url-encoder", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: "Hash Generator",
      tagline:
        "Compute SHA-1, SHA-256, SHA-384, SHA-512 or MD5 hashes of text or files, right in your browser. Fast checksums for integrity checks — nothing uploaded.",
      intro: [
        "Hash any text as you type, or drop in a file to fingerprint it without reading it byte by byte. SHA-2 family digests run on the browser's native WebCrypto engine; MD5 uses a vetted JavaScript implementation — all local, all free. Typical uses: verifying a download against a published checksum, deduplicating files, or comparing two versions of a document.",
        "Each algorithm has a fixed digest length you can use to sanity-check the output: MD5 is 128 bits (32 hex characters), SHA-1 is 160 bits (40 hex), SHA-256 is 256 bits (64 hex), SHA-384 is 384 bits (96 hex) and SHA-512 is 512 bits (128 hex). The digests are hexadecimal lowercase, matching what sha256sum and openssl dgst print.",
        "All hashes are one-way: the digest cannot be reversed to recover the input, and identical input always yields an identical digest while a one-character change — even a trailing space — alters roughly half the output bits. Hashing a file computes over raw bytes, so the same file downloaded twice always matches.",
        "Security status matters when choosing: SHA-256 and SHA-512 are the current standards for checksums and signatures, while MD5 (collisions demonstrated in 2004) and SHA-1 (the 2017 SHAttered collision) are broken against adversaries and fit only legacy checksums. This tool offers both, so you can verify old sums and generate future-proof ones side by side.",

      ],
      steps: [
        "Pick the algorithm: SHA-256 by default, or SHA-1/384/512/MD5.",
        "Type or paste text — or switch to File mode and drop a file in.",
        "Copy the hexadecimal digest; compare it with the expected checksum.",
      ],
      faqs: [
        {
          q: "Which algorithm should I use?",
          a: "SHA-256 is the sensible default for integrity checks and fingerprints. SHA-384/512 for longer digests; SHA-1 and MD5 are legacy — fine for non-security checksums, but do not rely on them against attackers.",
        },
        {
          q: "Can a hash be reversed to recover the input?",
          a: "No. Hashes are one-way: fixed-length digests discard information by design. Finding an input that produces a given digest means brute-forcing the whole space.",
        },
        {
          q: "Are my text and files uploaded?",
          a: "Never. Hashing runs locally in your browser — even multi-gigabyte files are read by your own device only.",
        },
      ],
      deepDive: [
        {
          heading: "One algorithm per job: the SHA-2 family versus the broken ones",
          paragraphs: [
            "This tool deliberately offers five algorithms because different jobs need different ones. SHA-256 and SHA-512 are the current standards — they back TLS certificates, code signing and Bitcoin. SHA-384 is the same construction as SHA-512 with a truncated output, and is common where a shorter digest is required by a standard. SHA-1 and MD5 appear here not to recommend them but because the real world still does: legacy archive checksums, old vendors and old verifiers keep asking for them.",
            "The breaking history is worth knowing precisely. MD5's collision resistance fell in the mid-2000s, with the 2012 Flame malware forging a Microsoft certificate as the headline demonstration. SHA-1 lasted longer: Google and CWI Amsterdam demonstrated the first practical SHA-1 collision (the SHAttered attack) in 2017. Both remain acceptable for non-adversarial integrity — confirming a file survived a transfer — but both must be rejected wherever an attacker could choose part of the input.",
            "A practical rule of thumb: for anything you publish today, generate SHA-256 (or SHA-512 for large files, where its 64-bit internals are faster on modern CPUs). When you must verify an old MD5 or SHA-1 sum, do it here once and also generate a SHA-256 alongside, so the record carries both the legacy check and a future-proof one.",
          ],
        },
        {
          heading: "Digest lengths and the shape of correct output",
          paragraphs: [
            "Each algorithm's output has a fixed size, which makes wrong output instantly recognizable: MD5 is 32 hex characters, SHA-1 is 40, SHA-256 is 64, SHA-384 is 96 and SHA-512 is 128. If a claimed SHA-256 has 63 characters or 65, something upstream is broken — a truncation, a copy-paste slip, or a different algorithm wearing the wrong label. Checking the length before comparing saves the confusion of hunting for a mismatch that is actually a formatting error.",
            "Hex case is another comparison trap: some tools print uppercase digests, some lowercase. The values are identical — hexadecimal is just notation — so compare case-insensitively or normalize both sides first. And beware trailing whitespace: hashing a text with a final newline produces a different digest than without it, which is why the text mode here hashes exactly the characters you provide and the file mode hashes the file's raw bytes.",
            "The one-way property is what makes all of this work: a fixed-length digest discards information by design, and identical bytes always produce identical digests. That determinism is what lets a checksum published by a project in one country match what you compute in your browser in another — same bytes, same digest, regardless of who computes it or where.",
          ],
        },
        {
          heading: "Hashing where the file lives",
          paragraphs: [
            "A hash is usually computed precisely because trust is in question — so the hashing environment matters as much as the algorithm. Sending a file to an unknown server for hashing is self-defeating: you transmit the very bytes whose integrity you are trying to verify. Everything here runs in your browser; text hashes as you type and files are read locally with the browser's file API, never uploaded.",
            "Local execution removes the practical ceilings too. There is no upload bandwidth, no size limit beyond your memory, and no queue — fingerprinting a multi-gigabyte ISO takes only as long as reading it from disk, and once the page is loaded the workflow works offline.",
            "For focused single-algorithm work, the SHA-256 generator and MD5 generator pages give each algorithm a dedicated view; this page is the side-by-side tool — one input, five digests, and the freedom to verify old sums and publish new ones in the same place.",
          ],
        },
      ],
    },
    zh: {
      name: "哈希生成器",
      tagline: "在浏览器里计算文本或文件的 SHA-1、SHA-256、SHA-384、SHA-512、MD5 哈希。快速完整性校验,文件不上传。",
      intro: [
        "文本随输入随计算,也可以直接拖入文件生成指纹,无需逐字节比对。SHA-2 系列走浏览器原生 WebCrypto 引擎,MD5 使用成熟的 JavaScript 实现——全部本地、全部免费。",
        "常见用途:核对下载文件的发布校验和、文件去重、生成缓存键、比较文档的两个版本。一键切换算法,十六进制摘要即时可复制。",
      ],
      steps: [
        "选择算法:默认 SHA-256,或 SHA-1/384/512/MD5。",
        "输入或粘贴文本——也可切到文件模式拖入文件。",
        "复制十六进制摘要,与预期校验和比对。",
      ],
      faqs: [
        {
          q: "应该选哪个算法?",
          a: "完整性校验和指纹用 SHA-256 最稳妥。需要更长摘要用 SHA-384/512;SHA-1 和 MD5 属于遗留算法——非安全场景的校验和还能用,但不要用来对抗攻击者。",
        },
        {
          q: "哈希能反推出原文吗?",
          a: "不能。哈希是单向的:定长摘要的设计本身就在丢弃信息。想找出对应某个摘要的输入,只能暴力遍历整个空间。",
        },
        {
          q: "文本和文件会被上传吗?",
          a: "绝不。哈希在浏览器本地完成——即使几 GB 的文件也只由你自己的设备读取。",
        },
      ],
      deepDive: [
        {
          heading: "一个活一个岗位:SHA-2 家族与被攻破的算法",
          paragraphs: [
            "本工具刻意提供五种算法,因为不同的活需要不同的算法。SHA-256 和 SHA-512 是当今标准——支撑着 TLS 证书、代码签名和比特币。SHA-384 是 SHA-512 同一构造的截断输出,常见于标准要求更短摘要的场合。SHA-1 和 MD5 出现在这里不是推荐它们,而是因为现实世界还在用:老的存档校验和、老厂商、老校验程序还在要它们。",
            "被攻破的历史值得记准确。MD5 的抗碰撞能力在 2000 年代中期瓦解,2012 年 Flame 恶意软件伪造微软证书是最著名的实证。SHA-1 撑得久一些:谷歌和 CWI Amsterdam 在 2017 年演示了首个实用的 SHA-1 碰撞(SHAttered 攻击)。两者用于非对抗性的完整性确认——确认文件传输无损——仍然可以;但只要攻击者可能参与选择输入,就必须拒绝。",
            "一条实用经验:今天发布的东西一律生成 SHA-256(大文件用 SHA-512,它的 64 位内部结构在现代 CPU 上更快)。必须核对旧的 MD5 或 SHA-1 校验和时,在这里核对一次,同时顺手生成一份 SHA-256,让记录同时带着遗留校验和面向未来的校验。",
          ],
        },
        {
          heading: "摘要长度与正确输出的形状",
          paragraphs: [
            "每个算法的输出长度固定,这让错误的输出一眼可辨:MD5 是 32 个十六进制字符,SHA-1 是 40,SHA-256 是 64,SHA-384 是 96,SHA-512 是 128。一个号称 SHA-256 的摘要只有 63 或 65 个字符,上游一定出了问题——截断、复制漏字,或者挂错标签的别的算法。比对前先查长度,省得去找一个其实是格式错误的“不匹配”。",
            "十六进制大小写是另一个比对陷阱:有的工具输出大写,有的输出小写。数值完全相同——十六进制只是记法——所以比对时忽略大小写或先统一两侧。还要当心尾部空白:带末尾换行的文本和不带的,摘要完全不同,这也是本工具文本模式精确按你提供的字符计算、文件模式按文件原始字节计算的原因。",
            "单向性让这一切成立:定长摘要按设计丢弃信息,相同字节永远产生相同摘要。正是这种确定性,让某个项目在某国发布的校验和,与你在另一个国家的浏览器里算出的结果吻合——同样的字节,同样的摘要,与计算者是谁、在哪里无关。",
          ],
        },
        {
          heading: "在文件所在之处计算哈希",
          paragraphs: [
            "计算哈希往往恰恰因为信任出了问题——所以计算环境和算法同样重要。把文件发给陌生服务器去算哈希是自相矛盾的:你传输的正是你想验证完整性的那些字节。这里的一切都在浏览器内运行;文本边输入边算,文件用浏览器的文件 API 本地读取,绝不上传。",
            "本地执行还消除了实际的天花板。没有上传带宽、没有内存之外的体积限制、不用排队——给几 GB 的 ISO 算指纹只花读盘的时间,页面加载后整个流程离线可用。",
            "专注单一算法时,SHA-256 生成器和 MD5 生成器页面各给一个专属视图;这一页是并排工具——一个输入、五个摘要,核对旧校验和与发布新校验和可以在同一个地方完成。",
          ],
        },
      ],
    },
    ja: {
      name: "ハッシュ生成器",
      tagline:
        "テキストやファイルの SHA-1・SHA-256・SHA-384・SHA-512・MD5 ハッシュをブラウザ内で計算。整合性チェックに素早く、アップロードは一切なし。",
      intro: [
        "テキストは入力するそばから計算し、ファイルはドロップするだけでフィンガープリントを作れます。SHA-2 系はブラウザのネイティブ WebCrypto、MD5 は実績のある JavaScript 実装を使用 — すべてローカルで無料です。",
        "よくある用途:ダウンロードしたファイルの公開チェックサム照合、ファイルの重複排除、キャッシュキーの生成、文書の 2 バージョン比較。ワンクリックでアルゴリズムを切り替え、16 進ダイジェストをすぐコピーできます。",
      ],
      steps: [
        "アルゴリズムを選択:既定は SHA-256、ほかに SHA-1/384/512/MD5。",
        "テキストを入力・貼り付け — またはファイルモードに切り替えてドロップ。",
        "16 進ダイジェストをコピーし、期待されるチェックサムと比較します。",
      ],
      faqs: [
        {
          q: "どのアルゴリズムを選ぶべき?",
          a: "整合性チェックやフィンガープリントには SHA-256 が無難です。より長いダイジェストには SHA-384/512。SHA-1 と MD5 はレガシーで、セキュリティが絡まないチェックサムには使えますが、攻撃者対策には頼らないでください。",
        },
        {
          q: "ハッシュから入力を復元できますか?",
          a: "できません。ハッシュは一方向です。固定長ダイジェストは設計上情報を捨てており、あるダイジェストに対応する入力を見つけるには全空間の総当たりが必要です。",
        },
        {
          q: "テキストやファイルはアップロードされますか?",
          a: "決してされません。ハッシュ計算はブラウザ内でローカルに行われ、数 GB のファイルも自分の端末だけが読みます。",
        },
      ],
      deepDive: [
        {
          heading: "仕事ごとに一つのアルゴリズム:SHA-2 ファミリーと破られたもの",
          paragraphs: [
            "本ツールが意図的に 5 つのアルゴリズムを用意しているのは、仕事ごとに必要なものが違うからです。SHA-256 と SHA-512 は現行の標準で——TLS 証明書、コード署名、Bitcoin を支えています。SHA-384 は SHA-512 と同じ構成の出力切り詰めで、標準がより短いダイジェストを求める場面でよく使われます。SHA-1 と MD5 があるのは推奨のためではなく、現実の世界がまだ使っているからです。古いアーカイブのチェックサム、古いベンダー、古い検証プログラムがまだそれらを要求します。",
            "破られた歴史は正確に知る価値があります。MD5 の衝突耐性は 2000 年代半ばに崩れ、2012 年の Flame マルウェアによるマイクロソフト証明書の偽造が最も有名な実証です。SHA-1 はもう少し持ちました。Google と CWI Amsterdam が 2017 年に初めての実用的な SHA-1 衝突(SHAttered 攻撃)を実演しました。どちらも非対立的な整合性確認——ファイルが転送で壊れていないかの確認——には使えますが、攻撃者が入力の一部を選べる場面では必ず拒否すべきものです。",
            "実務の目安はこうです。今日公開するものはすべて SHA-256 を(大きなファイルは SHA-512 を。64 ビット内部構造が現代の CPU で速い)。古い MD5 や SHA-1 のチェックサムを確認する必要があるときは、ここで一度確認し、同時に SHA-256 も生成して、記録に遺産の検査と未来対応の検査の両方を残します。",
          ],
        },
        {
          heading: "ダイジェスト長と正しい出力の形",
          paragraphs: [
            "各アルゴリズムの出力長は固定で、間違った出力は一瞬で見分けられます。MD5 は 32 文字の十六進、SHA-1 は 40、SHA-256 は 64、SHA-384 は 96、SHA-512 は 128。SHA-256 を名乗るダイジェストが 63 文字や 65 文字なら、上流で何かが壊れています——切り詰め、コピー漏れ、あるいは間違ったラベルを着けた別のアルゴリズム。比較する前に長さを確認すれば、実は書式ミスだった不一致を探す時間を節約できます。",
            "十六進の大文字小文字も比較の罠です。大文字で出すツールも小文字で出すツールもあります。値は同一で——十六進は単なる記法——大文字小文字を無視して比較するか、両側を先に統一します。末尾の空白にも注意。最後の改行のあるテキストとないテキストではダイジェストが全く違います。だからここではテキストモードは入力文字を正確に、ファイルモードはファイルの生バイトを計算します。",
            "一方向性がこのすべてを成立させます。固定長ダイジェストは設計上情報を捨て、同一バイトは常に同一ダイジェストを生みます。この決定性ゆえに、ある国で公開されたチェックサムが、別の国であなたのブラウザが計算したものと一致するのです——同じバイト、同じダイジェスト、誰がどこで計算しても。",
          ],
        },
        {
          heading: "ファイルがある場所でハッシュする",
          paragraphs: [
            "ハッシュはたいてい信頼に疑問があるからこそ計算されます——だから計算環境はアルゴリズムと同じくらい重要です。ファイルを知らないサーバーに送ってハッシュさせるのは自己矛盾です。検証しようとしているまさにそのバイトを送信することになります。ここではすべてがブラウザ内で動きます。テキストは入力しながら、ファイルはブラウザのファイル API でローカルに読み込み、決してアップロードされません。",
            "ローカル実行は実務上の上限も取り除きます。アップロード帯域も、メモリを超えるサイズ制限も、順番待ちもありません。数 GB の ISO のフィンガープリントはディスクから読む時間だけで済み、ページを読み込めばワークフローはオフラインで動きます。",
            "単一アルゴリズムに集中するなら、SHA-256 ジェネレーターと MD5 ジェネレーターのページがそれぞれ専用の表示を提供します。このページは並べるためのツールです。一つの入力、五つのダイジェスト、古いチェックサムの確認と新しいものの公開を同じ場所で。",
          ],
        },
      ],
    },
    es: {
      name: "Generador de hashes",
      tagline:
        "Calcula hashes SHA-1, SHA-256, SHA-384, SHA-512 o MD5 de texto o archivos en tu navegador. Checksums rápidos para integridad — nada se sube.",
      intro: [
        "Hashea cualquier texto mientras escribes, o suelta un archivo para obtener su huella sin leerlo byte a byte. Los resúmenes de la familia SHA-2 corren sobre el WebCrypto nativo del navegador; MD5 usa una implementación JavaScript contrastada — todo local y gratis.",
        "Usos típicos: verificar una descarga contra su checksum publicado, deduplicar archivos, generar claves de caché o comparar dos versiones de un documento. Cambia de algoritmo con un clic y copia el digest hexadecimal al instante.",
      ],
      steps: [
        "Elige el algoritmo: SHA-256 por defecto, o SHA-1/384/512/MD5.",
        "Escribe o pega texto — o cambia a modo Archivo y suelta un archivo.",
        "Copia el digest hexadecimal y compáralo con el checksum esperado.",
      ],
      faqs: [
        {
          q: "¿Qué algoritmo debería usar?",
          a: "SHA-256 es el valor por defecto sensato para integridad y huellas. SHA-384/512 para digests más largos; SHA-1 y MD5 son legado — sirven para checksums no relacionados con seguridad, pero no los uses frente a atacantes.",
        },
        {
          q: "¿Se puede revertir un hash para recuperar la entrada?",
          a: "No. Los hashes son unidireccionales: un digest de longitud fija descarta información por diseño. Encontrar una entrada que produzca un digest dado implica fuerza bruta sobre todo el espacio.",
        },
        {
          q: "¿Mi texto y archivos se suben?",
          a: "Nunca. El hasheo corre localmente en tu navegador — hasta archivos de varios GB los lee solo tu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Un algoritmo por trabajo: la familia SHA-2 frente a los rotos",
          paragraphs: [
            "Esta herramienta ofrece deliberadamente cinco algoritmos porque distintos trabajos necesitan distintos. SHA-256 y SHA-512 son los estándares actuales — sostienen certificados TLS, firma de código y Bitcoin. SHA-384 es la misma construcción que SHA-512 con salida truncada, y es común donde un estándar exige un digest más corto. SHA-1 y MD5 están aquí no para recomendarlos sino porque el mundo real todavía los usa: checksums de archivos antiguos, proveedores viejos y verificadores antiguos siguen pidiéndolos.",
            "La historia de su ruptura vale conocerla con precisión. La resistencia a colisiones de MD5 cayó a mediados de los 2000, con el malware Flame de 2012 falsificando un certificado de Microsoft como demostración estrella. SHA-1 aguantó más: Google y CWI Amsterdam demostraron en 2017 la primera colisión práctica de SHA-1 (el ataque SHAttered). Ambos siguen aceptables para integridad no adversarial — confirmar que un archivo sobrevivió a una transferencia — pero ambos deben rechazarse donde un atacante pueda elegir parte de la entrada.",
            "Una regla práctica: para todo lo que publiques hoy, genera SHA-256 (o SHA-512 en archivos grandes, donde sus internos de 64 bits son más rápidos en CPUs modernas). Cuando debas verificar una suma MD5 o SHA-1 antigua, hazlo aquí una vez y genera además un SHA-256 al lado, para que el registro lleve tanto la comprobación legada como una a prueba de futuro.",
          ],
        },
        {
          heading: "Longitudes de digest y la forma de una salida correcta",
          paragraphs: [
            "La salida de cada algoritmo tiene tamaño fijo, lo que hace la salida errónea reconocible al instante: MD5 son 32 caracteres hexadecimales, SHA-1 son 40, SHA-256 son 64, SHA-384 son 96 y SHA-512 son 128. Si un supuesto SHA-256 tiene 63 o 65 caracteres, algo aguas arriba está roto — un truncado, un despiste al copiar, u otro algoritmo con la etiqueta equivocada. Comprobar la longitud antes de comparar te ahorra buscar un desajuste que en realidad es un error de formato.",
            "Las mayúsculas del hexadecimal son otra trampa de comparación: algunas herramientas imprimen en mayúsculas, otras en minúsculas. Los valores son idénticos — el hexadecimal es solo notación — así que compara sin distinguir mayúsculas o normaliza ambos lados primero. Y ojo con el espacio final: hashear un texto con salto de línea final da un digest distinto al de sin él, por eso el modo de texto hashea exactamente los caracteres que escribes y el modo de archivo los bytes crudos del archivo.",
            "La propiedad unidireccional es la que hace funcionar todo esto: un digest de longitud fija descarta información por diseño, y bytes idénticos producen siempre digests idénticos. Ese determinismo es lo que permite que un checksum publicado por un proyecto en un país coincida con lo que calculas en tu navegador en otro — mismos bytes, mismo digest, sin importar quién lo calcule ni dónde.",
          ],
        },
        {
          heading: "Hashear donde vive el archivo",
          paragraphs: [
            "Un hash suele calcularse precisamente porque la confianza está en duda — así que el entorno de cálculo importa tanto como el algoritmo. Enviar un archivo a un servidor desconocido para hashearlo se desmonta a sí mismo: transmites justo los bytes cuya integridad quieres verificar. Todo aquí corre en tu navegador; el texto se hashea mientras escribes y los archivos se leen localmente con la API de archivos del navegador, sin subir nunca.",
            "La ejecución local también elimina los techos prácticos. Sin ancho de banda de subida, sin límite de tamaño más allá de la memoria, sin colas — tomar la huella de una ISO de varios gigas solo cuesta lo que leerla del disco, y una vez cargada la página el flujo funciona sin conexión.",
            "Para trabajo concentrado en un solo algoritmo, las páginas del generador SHA-256 y del generador MD5 dan a cada uno una vista dedicada; esta página es la herramienta lado a lado — una entrada, cinco digests, y la libertad de verificar sumas viejas y publicar nuevas en el mismo sitio.",
          ],
        },
      ],
    },
    pt: {
      name: "Gerador de Hash",
      tagline:
        "Calcule hashes SHA-1, SHA-256, SHA-384, SHA-512 ou MD5 de texto ou arquivos direto no navegador. Checksums rápidos para integridade — nada é enviado.",
      intro: [
        "Faça o hash de qualquer texto enquanto digita, ou solte um arquivo para gerar a impressão digital sem lê-lo byte a byte. Os resumos da família SHA-2 rodam no WebCrypto nativo do navegador; o MD5 usa uma implementação JavaScript consagrada — tudo local e grátis.",
        "Usos típicos: conferir um download contra o checksum publicado, deduplicar arquivos, gerar chaves de cache ou comparar duas versões de um documento. Troque de algoritmo com um clique e copie o digest hexadecimal na hora.",
      ],
      steps: [
        "Escolha o algoritmo: SHA-256 por padrão, ou SHA-1/384/512/MD5.",
        "Digite ou cole texto — ou mude para o modo Arquivo e solte um arquivo.",
        "Copie o digest hexadecimal e compare com o checksum esperado.",
      ],
      faqs: [
        {
          q: "Qual algoritmo devo usar?",
          a: "SHA-256 é o padrão sensato para integridade e impressões digitais. SHA-384/512 para digests mais longos; SHA-1 e MD5 são legado — servem para checksums fora de contexto de segurança, mas não contra atacantes.",
        },
        {
          q: "Dá para reverter um hash e recuperar a entrada?",
          a: "Não. Hashes são unidirecionais: um digest de tamanho fixo descarta informação por design. Encontrar uma entrada que gere um dado digest exige força bruta em todo o espaço.",
        },
        {
          q: "Meu texto e arquivos são enviados?",
          a: "Nunca. O hashing roda localmente no seu navegador — até arquivos de vários GB são lidos apenas pelo seu dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Um algoritmo por trabalho: a família SHA-2 contra os quebrados",
          paragraphs: [
            "Esta ferramenta oferece de propósito cinco algoritmos porque trabalhos diferentes precisam de diferentes. SHA-256 e SHA-512 são os padrões atuais — sustentam certificados TLS, assinatura de código e Bitcoin. SHA-384 é a mesma construção do SHA-512 com saída truncada, e é comum onde um padrão exige um digest mais curto. SHA-1 e MD5 estão aqui não para recomendá-los, e sim porque o mundo real ainda os usa: checksums de arquivos antigos, fornecedores velhos e verificadores antigos continuam pedindo.",
            "A história da quebra vale conhecer com precisão. A resistência a colisões do MD5 caiu em meados dos anos 2000, com o malware Flame de 2012 falsificando um certificado da Microsoft como demonstração mais famosa. O SHA-1 durou mais: Google e CWI Amsterdam demonstraram em 2017 a primeira colisão prática do SHA-1 (o ataque SHAttered). Ambos seguem aceitáveis para integridade não adversarial — confirmar que um arquivo sobreviveu à transferência — mas ambos devem ser rejeitados onde um atacante possa escolher parte da entrada.",
            "Uma regra prática: para tudo o que publicar hoje, gere SHA-256 (ou SHA-512 em arquivos grandes, onde sua estrutura interna de 64 bits é mais rápida em CPUs modernas). Quando precisar verificar uma soma MD5 ou SHA-1 antiga, faça aqui uma vez e gere também um SHA-256 ao lado, para que o registro carregue tanto a conferência legada quanto uma à prova de futuro.",
          ],
        },
        {
          heading: "Tamanhos de digest e a forma de uma saída correta",
          paragraphs: [
            "A saída de cada algoritmo tem tamanho fixo, o que torna a saída errada reconhecível de imediato: MD5 são 32 caracteres hexadecimais, SHA-1 são 40, SHA-256 são 64, SHA-384 são 96 e SHA-512 são 128. Se um suposto SHA-256 tem 63 ou 65 caracteres, algo a montante está quebrado — um truncamento, um deslize ao copiar, ou outro algoritmo com a etiqueta errada. Conferir o tamanho antes de comparar te poupa de caçar um desvio que na verdade é um erro de formato.",
            "As maiúsculas do hexadecimal são outra armadilha de comparação: algumas ferramentas imprimem em maiúsculas, outras em minúsculas. Os valores são idênticos — hexadecimal é só notação — então compare ignorando maiúsculas ou normalize ambos os lados antes. E cuidado com o espaço final: hashear um texto com quebra de linha no fim dá um digest diferente do de sem ela, por isso o modo de texto hashea exatamente os caracteres que você digita e o modo de arquivo os bytes crus do arquivo.",
            "A propriedade unidirecional é o que faz tudo isso funcionar: um digest de tamanho fixo descarta informação por design, e bytes idênticos produzem sempre digests idênticos. Esse determinismo é o que permite que um checksum publicado por um projeto num país coincida com o que você calcula no seu navegador em outro — mesmos bytes, mesmo digest, independentemente de quem calcule ou onde.",
          ],
        },
        {
          heading: "Hashear onde o arquivo vive",
          paragraphs: [
            "Um hash costuma ser calculado justamente porque a confiança está em dúvida — então o ambiente de cálculo importa tanto quanto o algoritmo. Enviar um arquivo a um servidor desconhecido para hashear se desmonta sozinho: você transmite justamente os bytes cuja integridade quer verificar. Tudo aqui roda no seu navegador; o texto hashea enquanto você digita e os arquivos são lidos localmente com a API de arquivos do navegador, nunca enviados.",
            "A execução local também remove os tetos práticos. Sem banda de upload, sem limite de tamanho além da memória, sem fila — tirar a impressão digital de uma ISO de vários gigas custa só o tempo de lê-la do disco, e depois que a página carrega o fluxo funciona offline.",
            "Para trabalho focado num só algoritmo, as páginas do gerador SHA-256 e do gerador MD5 dão a cada um uma visão dedicada; esta página é a ferramenta lado a lado — uma entrada, cinco digests, e a liberdade de verificar somas antigas e publicar novas no mesmo lugar.",
          ],
        },
      ],
    },
  },
});
