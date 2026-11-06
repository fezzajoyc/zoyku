import { DevHashEngine } from "../_engines/dev-engine-hash";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sha1-generator",
  category: "developer",
  icon: "hash",
  engine: { component: DevHashEngine, props: { algos: ["SHA-1"] } },
  related: ["sha256-generator", "hash-generator", "md5-generator", "base64-encoder", "base64-image", "json-validator", "json-formatter", "url-encoder", "html-minifier", "url-decoder"],
  copy: {
    en: {
      name: 'SHA-1 Generator',
      tagline: 'Compute SHA-1 hashes of text or files in your browser with native WebCrypto — still common in Git commits and legacy checksums. Fully client-side.',
      intro: [
        "Verifying a legacy download checksum, matching a Git object ID, or talking to an older system that still publishes SHA-1 — paste text or drop a file and its 160-bit digest appears live, computed entirely inside your browser.",
        "Output is lowercase hexadecimal, exactly 40 characters, and updates as you type; file mode hashes locally so nothing is uploaded. The digest follows FIPS 180-4 and matches any other correct SHA-1 implementation byte for byte.",
        "Hashing runs through the native WebCrypto SubtleCrypto API, the same audited code path your browser uses for TLS — faster and far less bug-prone than a hand-rolled JavaScript implementation.",
        "For new designs, avoid it: SHA-1 has been collision-broken since the 2017 SHAttered attack and NIST deprecated it for signatures back in 2011 (Git now pairs it with collision detection). Use SHA-256 instead — this tool exists for compatibility with what already ships."
      ],
      steps: ['Type or paste the text — the digest updates as you type.', 'Or switch to File mode and drop a file to hash it locally.', 'Copy the hexadecimal digest and compare it with the expected value.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "SHA-1 in 2024: broken for signatures, alive in Git",
          paragraphs: [
            "SHA-1 produces a 160-bit digest — 40 lowercase hexadecimal characters — standardized in FIPS 180-4. For years it was the default hash of the web: TLS certificates, code signing, version control. That era ended in stages: NIST deprecated SHA-1 for signatures in 2011 and disallowed it there by 2013, after researchers demonstrated that collision attacks were becoming practical.",
            "The definitive blow was SHAttered in 2017: two deliberately different PDF files with the same SHA-1 digest, produced with large but feasible computational effort. After that, using SHA-1 anywhere an adversary could influence the input — signatures, certificates, integrity promises — became indefensible. Modern browsers rejected SHA-1 certificates, and the ecosystem moved to SHA-256.",
            "SHA-1 is not dead, though, because it survives where collision resistance is not the promise being made. Git still identifies commits and objects with SHA-1 — it now pairs the hash with collision detection, and migration to a stronger hash is underway upstream. Old download checksums and file fingerprints from systems that never upgrade are the other common encounters. Use this tool to reproduce and verify those legacy fingerprints; pick SHA-256 for anything new.",
          ],
        },
        {
          heading: "Collision vs. preimage: reading the threat precisely",
          paragraphs: [
            "\"SHA-1 is broken\" needs unpacking, because two different attacks exist and they are not equally severe. A collision attack finds any two inputs with the same digest — the attacker controls both, and that breaks signatures and certificates, where one party signs what the other supplied. This is what SHAttered demonstrated, and it is why SHA-1 signing is finished.",
            "A preimage attack is different: given a digest, find some input that produces it. For SHA-1 this remains far out of reach — the 160-bit space is still effectively unsearchable. That asymmetry is exactly why Git's usage survives scrutiny: commit IDs are not adversary-controlled signature payloads in the same way, and Git's enhanced collision detection flags crafted inputs.",
            "The practical translation: do not accept a SHA-1 digest as proof of authenticity from a party you do not trust, and never build new signature or certificate flows on it. As a fingerprint of content you obtained over a channel you already trust — reproducing what a legacy system publishes — it remains serviceable, and that is this tool's role.",
          ],
        },
        {
          heading: "Local hashing with native WebCrypto",
          paragraphs: [
            "The digest is computed in your browser through the native WebCrypto SubtleCrypto API — the same audited code path your browser uses for TLS. Paste text and the 40-character digest updates live; switch to file mode and drop a file that is hashed locally, with no upload and no size ceiling beyond your device. For legacy checksum verification this locality is the point: the file being verified usually came from somewhere untrusted, so sending it to another network service to hash it would undercut the whole exercise.",
            "Input precision governs whether a comparison can succeed at all. Text is hashed as UTF-8 bytes, so hash the file itself rather than retyping its contents when verifying downloads; a text editor that converts line endings or appends a newline changes every byte of the digest. The output is lowercase hexadecimal, which matches sha1sum, openssl and the values legacy systems publish — copy it and compare programmatically rather than by eye across 40 characters.",
            "For new designs the answer is uniform: SHA-256 via the sha256-generator on this site, or the full family side by side in the hash-generator. Keep SHA-1 strictly for the interfaces and archives that already speak it.",
          ],
        },
      ],
    },
    zh: {
      name: 'SHA-1 生成器',
      tagline: '在浏览器里用原生 WebCrypto 计算 SHA-1 哈希——Git 提交和旧校验和仍在用它。完全本地处理,数据不上传。',
      intro: ['粘贴文本即可实时看到 160 位 SHA-1 摘要,或拖入文件在本地生成指纹。哈希由浏览器 WebCrypto 引擎完成,再大的文件也不会有一个字节离开设备。', 'SHA-1 虽是老算法但仍然活跃:Git 至今用它标识对象,不少老系统仍以 SHA-1 校验和验证下载。用它做兼容与校验没问题——安全敏感场景请选 SHA-256 或更强的算法。'],
      steps: ['输入或粘贴文本——摘要随输入实时更新。', '也可切换到文件模式,拖入文件在本地计算。', '复制十六进制摘要,与预期值比对。'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "2024 年的 SHA-1:签名已破,Git 里还活着",
          paragraphs: [
            "SHA-1 产出 160 位摘要——40 个小写十六进制字符——标准写在 FIPS 180-4 里。它曾多年是 Web 的默认哈希:TLS 证书、代码签名、版本控制。这个时代分阶段落幕:在研究者证明碰撞攻击正在走向实用之后,NIST 于 2011 年宣布在签名中弃用 SHA-1,到 2013 年彻底禁用。",
            "决定性一击是 2017 年的 SHAttered:两份刻意不同的 PDF 拥有同一个 SHA-1 摘要,计算量大但现实可行。此后,只要对手能影响输入——签名、证书、完整性承诺——继续用 SHA-1 就站不住脚。现代浏览器拒绝了 SHA-1 证书,整个生态转向 SHA-256。",
            "但 SHA-1 没有死,因为在「抗碰撞不是承诺」的地方它还活着。Git 至今用 SHA-1 标识提交和对象——如今配套了碰撞检测,上游也在推进迁移到更强的哈希。老系统的下载校验和与文件指纹是另外两处常见相遇。用本工具复现和核对这些遗留指纹;新东西请选 SHA-256。",
          ],
        },
        {
          heading: "碰撞与原像:把威胁读准",
          paragraphs: [
            "「SHA-1 被破了」需要拆开讲,因为存在两种不同的攻击,严重性并不相同。碰撞攻击找到任意两个摘要相同的输入——攻击者同时控制两者——这会击穿签名和证书,因为那是一方在签另一方提供的内容。SHAttered 演示的就是这个,所以 SHA-1 签名就此终结。",
            "原像攻击不同:给定一个摘要,找出能产生它的输入。对 SHA-1 这仍然遥不可及——160 位空间依旧实际不可穷举。这个不对称恰恰是 Git 用法经得起推敲的原因:提交 ID 不是攻击者可控的签名载荷,Git 增强的碰撞检测还会标记刻意构造的输入。",
            "落到实践上:不要把 SHA-1 摘要当作你不信任的一方出具的真实性证明,也不要在任何新的签名或证书流程上构建它。作为对你已经信任的渠道取得的内容的指纹——复现遗留系统公布的值——它仍然可用,这正是本工具的角色。",
          ],
        },
        {
          heading: "用原生 WebCrypto 在本地哈希",
          paragraphs: [
            "摘要在你的浏览器里通过原生 WebCrypto SubtleCrypto API 计算——和你浏览器跑 TLS 用的是同一条经过审计的代码路径。粘贴文本,40 字符摘要实时更新;切到文件模式,拖入的文件在本地哈希,不上传,上限只有你的设备。对遗留校验和验证来说,这种本地性正是要点:被验证的文件往往来自不可信之处,把它再送到另一个网络服务去哈希,等于拆掉整个验证的台子。",
            "输入的精确性决定比对能否成立。文本按 UTF-8 字节哈希,所以校验下载时要哈希文件本身,而不是重新敲一遍内容;编辑器转换换行符或追加一个换行,摘要的每个字节都会变。输出是小写十六进制,与 sha1sum、openssl 和遗留系统公布的值一致——复制后用程序比对,别靠肉眼跨 40 个字符。",
            "新设计的答案整齐划一:用本站的 sha256-generator 走 SHA-256,或用 hash-generator 把整个家族并排算一遍。把 SHA-1 严格留给已经在说它的接口和档案。",
          ],
        },
      ],
    },
    ja: {
      name: 'SHA-1 ジェネレーター',
      tagline: 'ネイティブ WebCrypto でブラウザ内のテキストやファイルの SHA-1 を計算 — Git コミットやレガシーチェックサムで現役。完全クライアント処理です。',
      intro: ['テキストを貼り付けると 160 ビットの SHA-1 ダイジェストがリアルタイムに表示され、ファイルをドロップすればローカルでフィンガープリントできます。ハッシュはブラウザの WebCrypto エンジンが処理するため、大きなファイルでも 1 バイトも端末の外に出ません。', 'SHA-1 はレガシーながら現役です:Git は今もオブジェクト識別に使い、多くの旧システムが SHA-1 チェックサムでダウンロードを検証しています。互換性と検証には有用ですが、セキュリティが重要な場面では SHA-256 以上を選んでください。'],
      steps: ['テキストを入力・貼り付け — ダイジェストは入力に合わせて更新されます。', 'またはファイルモードに切り替え、ファイルをドロップしてローカルでハッシュ化。', '16 進ダイジェストをコピーし、期待値と比較します。'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "2024 年の SHA-1:署名は破られ、Git では現役",
          paragraphs: [
            "SHA-1 は 160 ビットのダイジェスト — 小文字 16 進 40 文字 — を生み出し、FIPS 180-4 で標準化されています。長年 Web の既定ハッシュでした。TLS 証明書、コード署名、バージョン管理。その時代は段階的に終わりました。衝突攻撃が実用化しつつあると研究者が示した後、NIST は 2011 年に署名用途での SHA-1 を非推奨とし、2013 年までに禁止しました。",
            "決定的な一撃は 2017 年の SHAttered です。意図的に異なる 2 つの PDF が同じ SHA-1 ダイジェストを持つ — 膨大だが実行可能な計算量で作られました。以後、敵対者が入力に影響できる場面 — 署名、証明書、完全性の約束 — で SHA-1 を使い続けることは擁護できなくなりました。現代のブラウザは SHA-1 証明書を拒否し、エコシステムは SHA-256 へ移りました。",
            "しかし SHA-1 は死んでいません。衝突耐性が約束の対象ではない場所では生きています。Git は今もコミットとオブジェクトを SHA-1 で識別します — 今では衝突検出を併用し、上流ではより強いハッシュへの移行が進行中です。アップグレードしない古いシステムのダウンロード チェックサムとファイル フィンガープリントが、もう一つのよくある出会いです。このツールでそれらのレガシー フィンガープリントを再現・検証し、新しいものには SHA-256 を選んでください。",
          ],
        },
        {
          heading: "衝突と原像:脅威を正確に読む",
          paragraphs: [
            "「SHA-1 は破られた」は解して読む必要があります。2 種類の攻撃が存在し、深刻さは同じではないからです。衝突攻撃は同じダイジェストを持つ任意の 2 入力を見つけます — 攻撃者は両方を制御します — これは署名と証明書を破ります。一方が他方の提供したものに署名するからです。SHAttered が実演したのはこれであり、SHA-1 署名が終わった理由です。",
            "原像攻撃は別物です。ダイジェストが与えられたとき、それを生む入力を何か見つける攻撃です。SHA-1 に対しては依然として遥かに手の届かないところにあり、160 ビットの空間は実質的に探索不可能です。この非対称性こそ、Git の用法が精査に耐える理由です。コミット ID は同じ意味での敵対者制御の署名ペイロードではなく、Git の強化された衝突検出は細工された入力を検知します。",
            "実務への翻訳:信頼しない当事者が示す SHA-1 ダイジェストを真正性の証明として受け取らないこと、新しい署名や証明書の流れを決してその上に作らないこと。すでに信頼する経路で得た内容のフィンガープリントとして — レガシーシステムが公開する値の再現 — ならまだ役に立ち、それがこのツールの役割です。",
          ],
        },
        {
          heading: "ネイティブ WebCrypto によるローカル ハッシュ",
          paragraphs: [
            "ダイジェストはブラウザ内でネイティブの WebCrypto SubtleCrypto API によって計算されます — あなたのブラウザが TLS に使うのと同じ、監査されたコード経路です。テキストを貼れば 40 文字のダイジェストがライブ更新され、ファイル モードに切り替えればドロップしたファイルをローカルでハッシュします。アップロードなし、上限は端末のメモリだけ。レガシー チェックサムの検証では、この局所性こそが要点です。検証されるファイルは往々にして信頼できない所から来ており、ハッシュのために別のネットワーク サービスへ送るのは検証全体の土台を削ります。",
            "比較が成立するかを決めるのは入力の正確さです。テキストは UTF-8 バイトでハッシュされるため、ダウンロードの検証では内容を打ち直すのではなくファイル自体をハッシュしてください。エディタが改行コードを変えたり改行を付け足したりすれば、ダイジェストの全バイトが変わります。出力は小文字 16 進で、sha1sum、openssl、レガシーシステムが公開する値と一致します — 40 文字を肉眼で比べず、コピーしてプログラムで比較してください。",
            "新しい設計への答えは一様です。このサイトの sha256-generator で SHA-256 を、または hash-generator でファミリー全体を並べて計算。SHA-1 は、すでにそれを話すインターフェースとアーカイブに厳密に取っておいてください。",
          ],
        },
      ],
    },
    es: {
      name: 'Generador SHA-1',
      tagline: 'Calcula hashes SHA-1 de texto o archivos en tu navegador con WebCrypto nativo — aún presente en commits de Git y checksums heredados. 100% local.',
      intro: ['Pega texto para ver su resumen SHA-1 de 160 bits en vivo, o suelta un archivo para generar su huella localmente. El motor WebCrypto del navegador hace el trabajo, así que ni un solo byte sale de tu dispositivo.', 'SHA-1 es un algoritmo heredado pero vivo: Git sigue identificando objetos con él y muchos sistemas antiguos verifican descargas con checksums SHA-1. Úsalo para compatibilidad y verificación; para nada crítico de seguridad elige SHA-256 o superior.'],
      steps: ['Escribe o pega el texto: el resumen se actualiza al escribir.', 'O cambia al modo archivo y suelta un archivo para hashearlo localmente.', 'Copia el resumen hexadecimal y compáralo con el valor esperado.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "SHA-1 hoy: roto para firmas, vivo en Git",
          paragraphs: [
            "SHA-1 produce un resumen de 160 bits — 40 caracteres hexadecimales en minúsculas — estandarizado en FIPS 180-4. Durante años fue el hash por defecto de la web: certificados TLS, firma de código, control de versiones. Esa era terminó por etapas: tras demostrar los investigadores que los ataques de colisión se volvían prácticos, NIST desaconsejó SHA-1 para firmas en 2011 y lo prohibió allí para 2013.",
            "El golpe definitivo fue SHAttered en 2017: dos archivos PDF deliberadamente distintos con el mismo resumen SHA-1, producidos con un esfuerzo computacional grande pero factible. Después de eso, usar SHA-1 donde un adversario pudiera influir en la entrada — firmas, certificados, promesas de integridad — quedó indefendible. Los navegadores modernos rechazaron certificados SHA-1 y el ecosistema migró a SHA-256.",
            "SHA-1 no está muerto, sin embargo, porque sobrevive donde la resistencia a colisiones no es la promesa hecha. Git aún identifica commits y objetos con SHA-1 — hoy emparejado con detección de colisiones, y la migración a un hash más fuerte avanza en el proyecto. Los checksums de descargas antiguos y las huellas de sistemas que nunca actualizan son los otros encuentros habituales. Usa esta herramienta para reproducir y verificar esas huellas heredadas; elige SHA-256 para lo nuevo.",
          ],
        },
        {
          heading: "Colisión contra preimagen: leer la amenaza con precisión",
          paragraphs: [
            "\"SHA-1 está roto\" hay que desempaquetarlo, porque existen dos ataques distintos y no son igual de severos. Un ataque de colisión encuentra dos entradas cualesquiera con el mismo resumen — el atacante controla ambas — y eso rompe firmas y certificados, donde una parte firma lo que la otra suministró. Eso es lo que demostró SHAttered, y por eso la firma con SHA-1 terminó.",
            "Un ataque de preimagen es otra cosa: dado un resumen, encontrar alguna entrada que lo produzca. Para SHA-1 eso sigue muy fuera de alcance — el espacio de 160 bits sigue siendo efectivamente inexplorable. Esa asimetría es exactamente por qué el uso en Git resiste el escrutinio: los IDs de commit no son payloads de firma controlados por el adversario de la misma manera, y la detección de colisiones mejorada de Git marca las entradas manipuladas.",
            "La traducción práctica: no aceptes un resumen SHA-1 como prueba de autenticidad de una parte en la que no confías, y no construyas flujos nuevos de firma o certificación sobre él. Como huella de contenido obtenido por un canal en el que ya confías — reproduciendo lo que publica un sistema heredado — sigue siendo útil, y ese es el papel de esta herramienta.",
          ],
        },
        {
          heading: "Hashing local con WebCrypto nativo",
          paragraphs: [
            "El resumen se calcula en tu navegador mediante la API nativa WebCrypto SubtleCrypto — el mismo código auditado que tu navegador usa para TLS. Pega texto y el resumen de 40 caracteres se actualiza en vivo; cambia al modo archivo y suelta un archivo que se hashea localmente, sin subida y sin techo más allá de tu dispositivo. Para verificar checksums heredados, esa localidad es el punto: el archivo verificado suele venir de un sitio no confiable, y enviarlo a otro servicio de red para hashearlo socavaría todo el ejercicio.",
            "La precisión de la entrada decide si la comparación puede tener éxito. El texto se hashea como bytes UTF-8, así que al verificar descargas hashea el archivo mismo en vez de reescribir su contenido; un editor que convierte finales de línea o añade un salto cambia cada byte del resumen. La salida es hexadecimal en minúsculas, que coincide con sha1sum, openssl y los valores que publican los sistemas heredados — cópiala y compara programáticamente, no a ojo a lo largo de 40 caracteres.",
            "Para diseños nuevos la respuesta es uniforme: SHA-256 con el sha256-generator de este sitio, o la familia completa lado a lado en el hash-generator. Deja SHA-1 estrictamente para las interfaces y archivos que ya lo hablan.",
          ],
        },
      ],
    },
    pt: {
      name: 'Gerador SHA-1',
      tagline: 'Calcule hashes SHA-1 de texto ou arquivos no navegador com WebCrypto nativo — ainda presente em commits do Git e checksums legados. 100% local.',
      intro: ['Cole texto para ver o resumo SHA-1 de 160 bits em tempo real, ou solte um arquivo para gerar a impressão digital localmente. O motor WebCrypto do navegador faz o trabalho — nem um byte sai do seu dispositivo.', 'SHA-1 é legado mas vivo: o Git ainda identifica objetos com ele e muitos sistemas antigos verificam downloads com checksums SHA-1. Use para compatibilidade e verificação; para o que é crítico de segurança, prefira SHA-256 ou superior.'],
      steps: ['Digite ou cole o texto — o resumo atualiza conforme você digita.', 'Ou mude para o modo arquivo e solte um arquivo para hashear localmente.', 'Copie o resumo hexadecimal e compare com o valor esperado.'],
      faqs: [
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
          { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "SHA-1 hoje: quebrado para assinaturas, vivo no Git",
          paragraphs: [
            "O SHA-1 produz um resumo de 160 bits — 40 caracteres hexadecimais minúsculos — padronizado no FIPS 180-4. Por anos foi o hash padrão da web: certificados TLS, assinatura de código, controle de versões. Essa era terminou em etapas: depois que pesquisadores demonstraram que ataques de colisão estavam se tornando práticos, o NIST desaconselhou o SHA-1 para assinaturas em 2011 e o proibiu ali até 2013.",
            "O golpe definitivo foi o SHAttered em 2017: dois arquivos PDF deliberadamente diferentes com o mesmo resumo SHA-1, produzidos com esforço computacional grande mas viável. Depois disso, usar SHA-1 onde um adversário pudesse influenciar a entrada — assinaturas, certificados, promessas de integridade — ficou indefensável. Navegadores modernos rejeitaram certificados SHA-1 e o ecossistema migrou para o SHA-256.",
            "O SHA-1 não está morto, porém, porque sobrevive onde a resistência a colisões não é a promessa feita. O Git ainda identifica commits e objetos com SHA-1 — hoje emparelhado com detecção de colisões, e a migração para um hash mais forte avança no projeto. Checksums de downloads antigos e impressões digitais de sistemas que nunca atualizam são os outros encontros comuns. Use esta ferramenta para reproduzir e verificar essas impressões legadas; escolha SHA-256 para o que é novo.",
          ],
        },
        {
          heading: "Colisão contra pré-imagem: lendo a ameaça com precisão",
          paragraphs: [
            "\"O SHA-1 está quebrado\" precisa ser desembrulhado, porque existem dois ataques diferentes e eles não são igualmente severos. Um ataque de colisão encontra duas entradas quaisquer com o mesmo resumo — o atacante controla ambas — e isso quebra assinaturas e certificados, onde uma parte assina o que a outra forneceu. Foi isso que o SHAttered demonstrou, e por isso a assinatura com SHA-1 acabou.",
            "Um ataque de pré-imagem é outra coisa: dado um resumo, encontrar alguma entrada que o produza. Para o SHA-1 isso segue muito fora de alcance — o espaço de 160 bits segue efetivamente inexplorável. Essa assimetria é exatamente por que o uso no Git resiste ao escrutínio: IDs de commit não são payloads de assinatura controlados pelo adversário da mesma maneira, e a detecção de colisões aprimorada do Git sinaliza entradas manipuladas.",
            "A tradução prática: não aceite um resumo SHA-1 como prova de autenticidade de uma parte em que não confia, e não construa fluxos novos de assinatura ou certificação sobre ele. Como impressão digital de conteúdo obtido por um canal em que você já confia — reproduzindo o que um sistema legado publica — ele segue utilizável, e esse é o papel desta ferramenta.",
          ],
        },
        {
          heading: "Hashing local com WebCrypto nativo",
          paragraphs: [
            "O resumo é calculado no seu navegador pela API nativa WebCrypto SubtleCrypto — o mesmo caminho de código auditado que seu navegador usa para TLS. Cole texto e o resumo de 40 caracteres atualiza ao vivo; mude para o modo arquivo e solte um arquivo que é hasheado localmente, sem upload e sem teto além do seu dispositivo. Para verificar checksums legados, essa localidade é o ponto: o arquivo verificado costuma vir de um lugar não confiável, e enviá-lo a outro serviço de rede para hashear desmancharia todo o exercício.",
            "A precisão da entrada decide se a comparação pode ter êxito. O texto é hasheado como bytes UTF-8, então ao verificar downloads hasheie o próprio arquivo em vez de reescrever seu conteúdo; um editor que converte finais de linha ou acrescenta uma quebra muda cada byte do resumo. A saída é hexadecimal minúscula, que coincide com sha1sum, openssl e os valores que sistemas legados publicam — copie e compare programaticamente, não a olho ao longo de 40 caracteres.",
            "Para desenhos novos a resposta é uniforme: SHA-256 pelo sha256-generator deste site, ou a família completa lado a lado no hash-generator. Deixe o SHA-1 estritamente para as interfaces e arquivos que já o falam.",
          ],
        },
      ],
    },
  },
});
