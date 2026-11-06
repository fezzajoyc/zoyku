import { PdfProtectEngine } from "../_engines/pdf-engine-protect";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "unlock-pdf",
  category: "pdf",
  icon: "lock",
  engine: { component: PdfProtectEngine, props: { op: "unlock" } },
  related: ["flatten-pdf", "merge-pdf", "split-pdf", "rotate-pdf", "compress-pdf", "pdf-to-text", "delete-pdf-pages", "pdf-to-word"],
  copy: {
    en: {
      name: "Unlock PDF",
      tagline:
        "Remove owner-level restrictions from a readable PDF and download a clean copy — reopens restricted files in your browser, nothing is uploaded.",
      intro: [
        "Some PDFs open fine but refuse to be printed, copied or annotated because of owner-level permission flags. This tool loads the document with pdf-lib and saves a fresh copy without those restrictions, so printing and text selection work again in every reader.",
        "Everything happens on your device: the file is parsed and rewritten locally, never sent to a server. Note the honest limit — a PDF that asks for an open password every time cannot be decrypted here, and this tool does not add encryption either; it only produces an unrestricted copy of a file you can already read.",
      
        "pdf-lib loads the document, reads every page and object, and writes a fresh file without copying the permission dictionary — so print, copy and annotate flags simply do not exist in the output. The content itself is untouched: text, images and vectors are cloned byte-for-byte from the source you could already open.",
        "The limit is honest and technical: pdf-lib cannot decrypt a file that prompts for an open password, because the content is encrypted and there is no legitimate way around that in a general-purpose library. For the common case — a PDF that opens fine but refuses to print — this produces an unrestricted copy with zero upload and zero quality loss.",
      ],
      steps: [
        "Drop the restricted PDF that opens without a password.",
        "Click Remove protection — the file is re-saved locally without permission flags.",
        "Download the clean copy and print, copy or annotate it as needed.",
      ],
      faqs: [
        {
          q: "Can it remove an open password?",
          a: "Only if your viewer has the password cached and shows the content without asking. A file that genuinely requires a password to open is encrypted with that password, and this tool does not attempt to crack or decrypt it.",
        },
        {
          q: "What restrictions are actually removed?",
          a: "Owner-level permission flags such as “no printing”, “no copying” and “no editing”. Content is copied byte-for-byte, so layout, fonts and images stay exactly as they were.",
        },
        {
          q: "Can I also password-protect a PDF here?",
          a: "No. Reliable AES encryption for PDFs is not achievable in a lightweight browser-only implementation, so this site does not offer adding passwords — only removing restrictions from readable files.",
        },
      ],
      deepDive: [
        {
          heading: "What PDF password protection actually locks — and what unlock can do",
          paragraphs: [
            "PDF encryption has two distinct layers, and conflating them causes most confusion. The open password (user password) gates the whole file: without it, the content is not readable at all. The permissions password (owner password) gates actions — printing, copying text, editing — while the file opens freely. An owner-password-restricted file is fully readable; it is simply marked \"do not allow copying.\"",
            "This tool is for the second scenario and the first with the password in hand: files you can legitimately open but that carry restrictions, or files whose password you know and can supply. Unlocking removes the encryption layer and produces an unencrypted copy — after that, no viewer asks for anything and no restrictions apply.",
            "The boundary must be stated plainly: this is not a password-cracking tool, and it cannot open a file whose password you do not have. If you lost the password to a document you own, the path is recovery of the password, not removal of encryption. Removing restrictions on a file you are authorized to open — your own exports, documents you received legitimately — is the intended use.",
          ],
        },
        {
          heading: "Where owner-password restrictions come from, and when removal is legitimate",
          paragraphs: [
            "Owner passwords appear in the wild more often as accidents than as protection. PDF export dialogs let authors tick \"restrict editing\" or \"restrict copying\" with a randomly generated owner password the author may never record — so the restriction outlives the author's knowledge of it. Other common sources: template companies locking their files against editing, and old workflows that restricted printing as a matter of course.",
            "Removal is legitimate when you have the right to read the file. The restrictions operate on people who can already open the document — they are a usage policy, not secrecy. If you received a document legitimately and can read it, removing copy restrictions for your own use (quoting a clause into your notes, printing a form) is the normal expectation of document ownership; if the document's license says otherwise, honor the license.",
            "What unlocking does not change: the content itself. No re-processing occurs — pages, text, fonts and images are decrypted and re-wrapped without any conversion. This is why unlocking is lossless and fast even for large files, and why the output is bit-equivalent in content to what you saw in the viewer.",
          ],
        },
        {
          heading: "The privacy logic of unlocking locally",
          paragraphs: [
            "Think about what an unlock service would require: you would supply the locked file — and often, in practice, its password — to a third party. A password is a credential, not just data; the combination of a file and its opening password on someone else's server is a full compromise of that document's confidentiality, recorded in logs, for the sake of removing a flag.",
            "This tool decrypts in your browser: the file and the password are handled on your device, decryption happens in memory, and the unencrypted copy is saved by your browser directly. The password is never transmitted or stored anywhere — there is no server involved at any point, and the operation works fully offline.",
            "A practical note for batch unlocking: archives exported from old systems often have a common password across many files. Because the tool processes locally without rate limits or upload queues, unlocking a whole set is as quick as unlocking one — and none of those files, or their shared password, ever leaves your machine.",
          ],
        },
      ],
    },
    zh: {
      name: "解锁 PDF",
      tagline: "移除可读 PDF 的所有者级限制并下载干净副本——在浏览器中解除限制,文件不上传。",
      intro: [
        "有些 PDF 能正常打开,却因为所有者级权限标志而禁止打印、复制或批注。本工具用 pdf-lib 载入文档后另存一份不带这些限制的副本,打印和文字选择在所有阅读器中恢复正常。",
        "全部处理都在本地完成:文件只在本机解析和重写,不会上传到任何服务器。请如实了解边界——每次打开都要输入密码的 PDF 无法在此解密;本工具也不能给 PDF 加密,只能为已经可读的文件生成无限制副本。",
      ],
      steps: [
        "拖入无需密码即可打开的受限 PDF。",
        "点击“移除保护”——文件会在本地重新保存并去掉权限标志。",
        "下载干净副本,即可正常打印、复制或批注。",
      ],
      faqs: [
        {
          q: "能移除打开密码吗?",
          a: "仅当你的阅读器已记住密码、无需输入即可显示内容时可以。真正需要密码才能打开的文件是被该密码加密的,本工具不会尝试破解或解密。",
        },
        {
          q: "实际移除的是哪些限制?",
          a: "所有者级权限标志,如“禁止打印”“禁止复制”“禁止编辑”。内容逐字节复制,排版、字体和图片与原文件完全一致。",
        },
        {
          q: "能在这里给 PDF 加密码吗?",
          a: "不能。可靠的 PDF AES 加密无法用轻量的纯浏览器方案实现,因此本站不提供添加密码功能——只对已可读的文件解除限制。",
        },
      ],
      deepDive: [
        {
          heading: "PDF 密码保护到底锁了什么,解锁能做什么",
          paragraphs: [
            "PDF 加密有两个截然不同的层,混为一谈是大多数困惑的来源。打开密码(用户密码)管整个文件:没有它,内容完全不可读。权限密码(所有者密码)管动作——打印、复制文字、编辑——而文件本身可以自由打开。带所有者密码限制的文件是完全可读的;它只是被标了“不允许复制”。",
            "本工具针对的是第二种场景,以及第一种里你手里有密码的情况:你有权打开、但带着限制的文件,或者你知道密码并能提供的文件。解锁会移除加密层,产出一份未加密副本——之后没有任何阅读器再询问什么,任何限制都不再适用。",
            "边界必须明说:这不是密码破解工具,解不开你没有密码的文件。如果你弄丢了自己文档的密码,出路是找回密码,不是移除加密。对你有权打开的文件解除限制——你自己的导出件、正当收到的文档——才是本工具的用途。",
          ],
        },
        {
          heading: "所有者密码限制从哪来,什么时候解除是正当的",
          paragraphs: [
            "现实里的所有者密码,作为事故出现的频率高于作为保护。PDF 导出对话框允许作者勾选“限制编辑”或“限制复制”,并随机生成一个作者自己都未必记录过的所有者密码——于是限制比作者对它的记忆活得更久。其他常见来源:模板公司锁住文件防编辑,以及把限制打印当作默认流程的旧工作流。",
            "当你有权阅读这个文件时,解除就是正当的。限制作用的对象是本就能打开文档的人——它是使用政策,不是保密。如果你正当收到一份文档并且能读它,为自用解除复制限制(把条款引用进笔记、打印一份表单)是对文档所有权的正常预期;如果文档的许可另有规定,遵守许可。",
            "解锁不改变的是内容本身。没有任何重新处理——页面、文字、字体和图片被解密后重新封装,不做任何转换。这就是为什么解锁即使对大文件也无损且快速,输出内容和你阅读器里看到的逐位等价。",
          ],
        },
        {
          heading: "本地解锁的隐私逻辑",
          paragraphs: [
            "想一想解锁服务需要什么:你要把加密文件——实际操作中往往还有它的密码——交给第三方。密码是凭据,不只是数据;文件和它的打开密码同时出现在别人的服务器上,等于这份文档的机密性全盘失守,还留在日志里,而这一切只是为了去掉一个标志位。",
            "本工具在浏览器里解密:文件和密码都在你的设备上处理,解密在内存中进行,未加密副本由你的浏览器直接保存。密码从不被传输或存储在任何地方——任何环节都没有服务器参与,操作完全离线可用。",
            "批量解锁的实用提示:从旧系统导出的档案,常常很多文件共用一个密码。因为工具本地处理、没有速率限制和上传队列,解锁一整组和解锁一个一样快——而且这些文件和它们的共用密码,自始至终不离开你的机器。",
          ],
        },
      ],
    },
    ja: {
      name: "PDF ロック解除",
      tagline: "パスワードなしで読める PDF から所有者レベルの制限を外し、クリーンなコピーをダウンロード。ブラウザ内で処理、アップロードは不要です。",
      intro: [
        "開けるのに印刷・コピー・注釈が禁止されている PDF があります。これは所有者レベルの権限フラグによるものです。このツールは pdf-lib で文書を読み込み、制限のない新しいコピーを保存します。印刷とテキスト選択がすべてのビューアで使えるようになります。",
        "処理はすべて端末内で完結します。ファイルはローカルで解析・再書き込みされ、サーバーには送信されません。正直な限界として、開くたびにパスワードを求められる PDF はここでは復号できません。また暗号化の追加にも対応していません。読めるファイルの制限を外すだけのツールです。",
      ],
      steps: [
        "パスワードなしで開ける制限付き PDF をドロップします。",
        "「保護を解除」をクリックすると、権限フラグを除いてローカルで再保存されます。",
        "クリーンなコピーをダウンロードし、印刷・コピー・注釈を自由に行えます。",
      ],
      faqs: [
        {
          q: "開くパスワードも解除できますか?",
          a: "ビューアがパスワードを記憶していて、入力なしに内容が表示される場合のみです。開くのに本当にパスワードが必要なファイルはそのパスワードで暗号化されており、このツールは解読・復号を試みません。",
        },
        {
          q: "実際に解除される制限は何ですか?",
          a: "「印刷禁止」「コピー禁止」「編集禁止」などの所有者レベルの権限フラグです。内容はバイト単位でコピーされるため、レイアウト・フォント・画像は元のままです。",
        },
        {
          q: "ここで PDF にパスワードを設定できますか?",
          a: "できません。軽量なブラウザのみの実装で信頼できる PDF の AES 暗号化は実現できないため、当サイトはパスワードの追加を提供していません。読めるファイルの制限解除のみです。",
        },
      ],
      deepDive: [
        {
          heading: "PDF のパスワード保護は実際に何を鍵にし、解除に何ができるか",
          paragraphs: [
            "PDF の暗号化には二つの別個の層があり、混同が混乱の大半を生みます。オープンパスワード(ユーザーパスワード)はファイル全体を門番します。これがなければ内容はまったく読めません。権限パスワード(オーナーパスワード)は動作を門番します——印刷、テキストのコピー、編集——一方でファイルは自由に開けます。オーナーパスワード制限のあるファイルは完全に読めます。単に「コピー不可」の印が付いているだけです。",
            "このツールは第二のシナリオと、パスワードを手にしている第一のシナリオのためのものです。正当に開けるのに制限の付いたファイル、あるいはパスワードを知っていて入力できるファイル。解除は暗号化の層を取り除き、暗号化されていないコピーを産みます。以後、どのビューアも何も尋ねず、どの制限も適用されません。",
            "境界を明確に述べる必要があります。これはパスワード解析の道具ではなく、パスワードを持っていないファイルは開けません。自分の文書のパスワードを失ったなら、道筋はパスワードの復元であって、暗号化の除去ではありません。開く権利のあるファイルの制限を除くこと——自分の書き出し物、正当に受け取った文書——が本工具の意図された用途です。",
          ],
        },
        {
          heading: "オーナーパスワード制限の出所と、解除が正当なとき",
          paragraphs: [
            "現実のオーナーパスワードは、保護としてより事故として現れます。PDF 書き出しのダイアログは作者に「編集を制限」「コピーを制限」のチェックを許し、作者自身が記録していないかもしれないランダムなオーナーパスワードを生成します。制限は作者の記憶より長生きするのです。その他の一般的な出所は、編集防止のためにファイルを鍵めるテンプレート会社と、印刷制限を当然の流れとしていた古いワークフローです。",
            "解除が正当なのは、そのファイルを読む権利があるときです。制限は、すでに文書を開ける人々に作用します。それは使用ポリシーであって、秘密ではありません。正当に受け取り、読める文書なら、自分の利用のためにコピー制限を除くこと(条項を自分のノートへ引用する、フォームを印刷する)は文書所有の正常な期待です。文書のライセンスが別のことを言うなら、ライセンスを守ってください。",
            "解除が変えないもの:内容そのもの。再処理は一切起こりません。ページ、テキスト、フォント、画像は変換なしで復号され、包み直されます。だから解除は大きなファイルでも可逆で速く、出力はビューアで見たものと内容においてビット同等です。",
          ],
        },
        {
          heading: "ローカル解除のプライバシー論理",
          paragraphs: [
            "解除サービスに何が要るか考えてみてください。鍵の掛かったファイル——実際にはしばしばそのパスワードも——を第三者に渡すことです。パスワードはデータだけでなく認証情報です。ファイルとそのオープンパスワードの組が他人のサーバー上に存在することは、その文書の機密性の全面的な喪失であり、ログに記録されます。それが一つのフラグを外すためだけに。",
            "このツールはブラウザ内で復号します。ファイルとパスワードは端末上で扱われ、復号はメモリ内で行われ、暗号化されていないコピーはブラウザが直接保存します。パスワードは送信も保存も一切されず、どの時点でもサーバーは関与せず、操作は完全にオフラインで動きます。",
            "一括解除の実用的なメモ:旧システムから書き出されたアーカイブは、多数のファイルが共通のパスワードを持ちがちです。道具はローカルで、速度制限もアップロードの順番待ちもなく処理するので、一組の解除は一つの解除と同じくらい速く、そのファイルたちも共通パスワードも、端末の外には一歩も出ません。",
          ],
        },
      ],
    },
    es: {
      name: "Desbloquear PDF",
      tagline:
        "Quita las restricciones de propietario de un PDF legible y descarga una copia limpia: desbloquea archivos en tu navegador, sin subirlos.",
      intro: [
        "Algunos PDF se abren bien pero rechazan imprimirse, copiarse o anotarse por flags de permisos de propietario. Esta herramienta carga el documento con pdf-lib y guarda una copia nueva sin esas restricciones, para que la impresión y la selección de texto vuelvan a funcionar en cualquier lector.",
        "Todo ocurre en tu dispositivo: el archivo se analiza y se reescribe localmente, nunca se envía a un servidor. Ten en cuenta el límite honesto: un PDF que pide contraseña de apertura cada vez no se puede descifrar aquí, y esta herramienta tampoco añade cifrado; solo produce una copia sin restricciones de un archivo que ya puedes leer.",
      ],
      steps: [
        "Suelta el PDF restringido que se abre sin contraseña.",
        "Pulsa Quitar protección: el archivo se vuelve a guardar localmente sin los flags de permisos.",
        "Descarga la copia limpia e imprime, copia o anota según necesites.",
      ],
      faqs: [
        {
          q: "¿Puede quitar una contraseña de apertura?",
          a: "Solo si tu visor la tiene guardada y muestra el contenido sin preguntar. Un archivo que realmente exige contraseña para abrirse está cifrado con ella, y esta herramienta no intenta descifrarlo.",
        },
        {
          q: "¿Qué restricciones se eliminan realmente?",
          a: "Los flags de permisos de propietario como “no imprimir”, “no copiar” y “no editar”. El contenido se copia byte a byte: el diseño, las fuentes y las imágenes quedan exactamente igual.",
        },
        {
          q: "¿Puedo proteger con contraseña un PDF aquí?",
          a: "No. Un cifrado AES fiable para PDF no es viable con una implementación ligera solo de navegador, así que el sitio no ofrece añadir contraseñas — solo quitar restricciones de archivos legibles.",
        },
      ],
      deepDive: [
        {
          heading: "Lo que la protección con contraseña de un PDF realmente bloquea — y lo que el desbloqueo puede hacer",
          paragraphs: [
            "El cifrado de PDF tiene dos capas distintas, y confundirlas causa la mayoría de la confusión. La contraseña de apertura (de usuario) custodia todo el archivo: sin ella, el contenido no es legible en absoluto. La contraseña de permisos (de propietario) custodia acciones — imprimir, copiar texto, editar — mientras el archivo se abre libremente. Un archivo restringido por contraseña de propietario es completamente legible; simplemente lleva la marca \"no permitir copia.\"",
            "Esta herramienta es para el segundo escenario y para el primero con la contraseña en mano: archivos que puedes abrir legítimamente pero que llevan restricciones, o archivos cuya contraseña conoces y puedes proporcionar. Desbloquear elimina la capa de cifrado y produce una copia sin cifrar — después, ningún visor pregunta nada y ninguna restricción aplica.",
            "El límite hay que decirlo sin rodeos: no es una herramienta de descifrado de contraseñas, y no puede abrir un archivo cuya contraseña no tienes. Si perdiste la contraseña de un documento tuyo, el camino es recuperar la contraseña, no quitar el cifrado. Quitar restricciones de un archivo que estás autorizado a abrir — tus propias exportaciones, documentos recibidos legítimamente — es el uso previsto.",
          ],
        },
        {
          heading: "De dónde salen las restricciones por contraseña de propietario, y cuándo quitarlas es legítimo",
          paragraphs: [
            "En la práctica, las contraseñas de propietario aparecen más como accidentes que como protección. Los diálogos de exportación de PDF permiten marcar \"restringir edición\" o \"restringir copia\" con una contraseña de propietario generada al azar que el autor puede no haber anotado nunca — así que la restricción sobrevive al recuerdo que el autor tenía de ella. Otras fuentes habituales: empresas de plantillas que bloquean sus archivos contra edición, y flujos antiguos que restringían la impresión como rutina.",
            "Quitarlas es legítimo cuando tienes derecho a leer el archivo. Las restricciones actúan sobre personas que ya pueden abrir el documento — son una política de uso, no secreto. Si recibiste un documento legítimamente y puedes leerlo, quitar las restricciones de copia para tu propio uso (citar una cláusula en tus notas, imprimir un formulario) es la expectativa normal de la propiedad del documento; si la licencia del documento dice otra cosa, respeta la licencia.",
            "Lo que el desbloqueo no cambia: el propio contenido. No ocurre ningún re-procesado — páginas, texto, fuentes e imágenes se descifran y se re-envuelven sin conversión alguna. Por eso desbloquear es sin pérdidas y rápido incluso con archivos grandes, y la salida es equivalente en contenido, bit a bit, a lo que veías en el visor.",
          ],
        },
        {
          heading: "La lógica de privacidad de desbloquear en local",
          paragraphs: [
            "Piensa qué exigiría un servicio de desbloqueo: entregarle el archivo bloqueado — y en la práctica, con frecuencia, también su contraseña — a un tercero. Una contraseña es una credencial, no solo datos; la combinación de un archivo y su contraseña de apertura en el servidor de otra persona es una compromiso total de la confidencialidad de ese documento, registrado en los logs, todo para quitar una marca.",
            "Esta herramienta descifra en tu navegador: el archivo y la contraseña se manejan en tu dispositivo, el descifrado ocurre en memoria, y la copia sin cifrar la guarda tu navegador directamente. La contraseña nunca se transmite ni se guarda en ningún sitio — no hay servidor involucrado en ningún punto, y la operación funciona completamente sin conexión.",
            "Una nota práctica para el desbloqueo por lotes: los archivos exportados de sistemas antiguos suelen compartir una contraseña común entre muchos archivos. Como la herramienta procesa en local sin límites de tasa ni colas de subida, desbloquear un conjunto entero es tan rápido como desbloquear uno — y ninguno de esos archivos, ni su contraseña compartida, sale jamás de tu máquina.",
          ],
        },
      ],
    },
    pt: {
      name: "Desbloquear PDF",
      tagline:
        "Remova restrições de proprietário de um PDF legível e baixe uma cópia limpa — desbloqueie arquivos no navegador, sem envio.",
      intro: [
        "Alguns PDFs abrem normalmente, mas recusam impressão, cópia ou anotação por causa de flags de permissão do proprietário. Esta ferramenta carrega o documento com pdf-lib e salva uma cópia nova sem essas restrições, para que imprimir e selecionar texto voltem a funcionar em qualquer leitor.",
        "Tudo acontece no seu dispositivo: o arquivo é lido e regravado localmente, nunca enviado a um servidor. Note o limite honesto — um PDF que pede senha de abertura toda vez não pode ser decifrado aqui, e a ferramenta também não adiciona criptografia; ela só produz uma cópia sem restrições de um arquivo que você já consegue ler.",
      ],
      steps: [
        "Solte o PDF restrito que abre sem senha.",
        "Clique em Remover proteção — o arquivo é salvo novamente localmente, sem as flags de permissão.",
        "Baixe a cópia limpa e imprima, copie ou anote como precisar.",
      ],
      faqs: [
        {
          q: "Dá para remover a senha de abertura?",
          a: "Somente se o seu visualizador tiver a senha memorizada e mostrar o conteúdo sem perguntar. Um arquivo que realmente exige senha para abrir está criptografado com ela, e esta ferramenta não tenta decifrá-lo.",
        },
        {
          q: "Quais restrições são realmente removidas?",
          a: "Flags de permissão do proprietário, como “não imprimir”, “não copiar” e “não editar”. O conteúdo é copiado byte a byte, então layout, fontes e imagens ficam exatamente como estavam.",
        },
        {
          q: "Posso proteger um PDF com senha aqui?",
          a: "Não. Criptografia AES confiável para PDFs não é viável numa implementação leve somente de navegador, então o site não oferece adicionar senhas — apenas remover restrições de arquivos legíveis.",
        },
      ],
      deepDive: [
        {
          heading: "O que a proteção por senha de um PDF realmente tranca — e o que o desbloqueio pode fazer",
          paragraphs: [
            "A criptografia de PDF tem duas camadas distintas, e confundi-las causa a maior parte da confusão. A senha de abertura (de usuário) guarda o arquivo inteiro: sem ela, o conteúdo não é legível de jeito nenhum. A senha de permissões (de proprietário) guarda ações — imprimir, copiar texto, editar — enquanto o arquivo abre livremente. Um arquivo restrito por senha de proprietário é totalmente legível; ele só traz a marcação \"não permitir cópia.\"",
            "Esta ferramenta serve para o segundo cenário e para o primeiro com a senha em mãos: arquivos que você pode abrir legitimamente mas que carregam restrições, ou arquivos cuja senha você conhece e pode informar. Desbloquear remove a camada de criptografia e produz uma cópia sem criptografia — depois disso, nenhum visualizador pergunta nada e nenhuma restrição se aplica.",
            "O limite precisa ser dito sem rodeios: não é uma ferramenta de quebra de senha, e não abre arquivo cuja senha você não tem. Se perdeu a senha de um documento seu, o caminho é recuperar a senha, não remover a criptografia. Remover restrições de um arquivo que você está autorizado a abrir — suas próprias exportações, documentos recebidos legitimamente — é o uso pretendido.",
          ],
        },
        {
          heading: "De onde vêm as restrições por senha de proprietário, e quando removê-las é legítimo",
          paragraphs: [
            "Na prática, as senhas de proprietário aparecem mais como acidentes que como proteção. Os diálogos de exportação de PDF permitem marcar \"restringir edição\" ou \"restringir cópia\" com uma senha de proprietário gerada ao acaso que o autor talvez nunca tenha anotado — então a restrição sobrevive à memória que o autor tinha dela. Outras origens comuns: empresas de modelos que trancam seus arquivos contra edição, e fluxos antigos que restringiam impressão por rotina.",
            "Remover é legítimo quando você tem o direito de ler o arquivo. As restrições operam sobre pessoas que já conseguem abrir o documento — são uma política de uso, não sigilo. Se você recebeu um documento legitimamente e consegue lê-lo, remover as restrições de cópia para uso próprio (citar uma cláusula nas suas notas, imprimir um formulário) é a expectativa normal da posse do documento; se a licença do documento diz outra coisa, honre a licença.",
            "O que o desbloqueio não muda: o conteúdo em si. Não ocorre reprocessamento algum — páginas, texto, fontes e imagens são decifrados e re-empacotados sem conversão nenhuma. Por isso desbloquear é sem perdas e rápido mesmo em arquivos grandes, e a saída é equivalente em conteúdo, bit a bit, ao que você via no visualizador.",
          ],
        },
        {
          heading: "A lógica de privacidade de desbloquear localmente",
          paragraphs: [
            "Pense no que um serviço de desbloqueio exigiria: você entregaria o arquivo trancado — e, na prática, frequentemente também sua senha — a um terceiro. Uma senha é uma credencial, não só dados; a combinação de um arquivo e sua senha de abertura no servidor de outra pessoa é o comprometimento total da confidencialidade daquele documento, registrado em logs, tudo para tirar uma marcação.",
            "Esta ferramenta decifra no seu navegador: o arquivo e a senha são tratados no seu dispositivo, a decifração acontece na memória, e a cópia sem criptografia é salva pelo seu navegador diretamente. A senha nunca é transmitida nem guardada em lugar algum — não há servidor envolvido em nenhum ponto, e a operação funciona totalmente offline.",
            "Uma nota prática para desbloqueio em lote: acervos exportados de sistemas antigos costumam ter uma senha comum entre muitos arquivos. Como a ferramenta processa localmente sem limites de taxa nem filas de envio, desbloquear um conjunto inteiro é tão rápido quanto desbloquear um — e nenhum desses arquivos, nem a senha compartilhada, sai da sua máquina.",
          ],
        },
      ],
    },
  },
});
