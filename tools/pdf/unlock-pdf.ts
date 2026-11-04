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
    },
  },
});
