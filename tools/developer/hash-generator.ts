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
    },
  },
});
