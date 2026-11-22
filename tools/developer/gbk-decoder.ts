import { DevEngineGbk } from "../_engines/dev-engine-gbk";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "gbk-decoder",
  category: "developer",
  icon: "swap",
  engine: { component: DevEngineGbk },
  related: ["byte-encoding-converter", "chinese-text-converter", "base64-encoder", "file-splitter-merger"],
  copy: {
    en: {
      name: "GBK / GB18030 Decoder",
      tagline:
        "Decode GBK, GB2312 and GB18030 bytes into readable text — paste hex or Base64, or upload a file up to 2 MB. Fixes mojibake from legacy Chinese files. Free, private, offline.",
      intro: [
        "Files saved with GBK encoding (the legacy Chinese code page, also covering GB2312) turn into mojibake when opened in a UTF-8 environment. This decoder turns the raw bytes back into readable text using your browser's built-in WHATWG Encoding support — GBK and GB18030 are implemented natively in every modern browser.",
        "Paste raw bytes as hexadecimal or Base64, or upload a file up to 2 MB — CSV exports, database dumps, .txt logs and legacy data files all decode locally. GB18030 additionally covers four-byte sequences for rare CJK ideographs outside the GBK range.",
        "Invalid or damaged byte sequences are replaced with the � character and counted, so you can tell whether the file was truly GBK or something else. Nothing is uploaded — decoding runs entirely in this tab.",
      ],
      steps: [
        "Choose the encoding: GBK (covers GB2312) or GB18030.",
        "Paste bytes as hex or Base64, or upload a file up to 2 MB.",
        "Click Decode — the readable text appears below with a copy button and an integrity note.",
      ],
      faqs: [
        {
          q: "Why is my Chinese file showing garbled characters?",
          a: "The file was written in GBK (or GB2312) bytes but is being read as UTF-8. Each Chinese character is 2 bytes in GBK; a UTF-8 reader interprets those pairs as random Latin or symbol characters. Decoding the same bytes with this tool restores the original text.",
        },
        {
          q: "Can I also encode text to GBK here?",
          a: "No — browsers only ship built-in decoding for legacy encodings (per the WHATWG Encoding standard); encoding text back to GBK would need a large character table. This tool focuses on the common rescue direction: bytes → readable text.",
        },
      ],
    },
    zh: {
      name: "GBK / GB18030 解码器",
      tagline:
        "将 GBK、GB2312、GB18030 字节解码为可读文本——支持十六进制、Base64 粘贴或上传文件(最大 2 MB)。修复老文件乱码,免费、即时、离线可用。",
      intro: [
        "以 GBK 编码保存的文件(老式中文代码页,兼容 GB2312)在 UTF-8 环境打开会变成乱码。本工具使用浏览器内建的 WHATWG Encoding 支持把原始字节还原为可读文本——GBK 与 GB18030 是所有现代浏览器的原生能力。",
        "支持三种输入:十六进制粘贴、Base64 粘贴、文件上传(最大 2 MB)——CSV 导出、数据库转储、TXT 日志与历史数据文件都在本机完成解码。GB18030 还额外支持 GBK 范围之外的生僻汉字四字节序列。",
        "无效或损坏的字节序列会被替换为 � 字符并计数,方便判断文件究竟是不是 GBK 编码。全程零上传——解码完全在本标签页内完成。",
      ],
      steps: [
        "选择编码:GBK(兼容 GB2312)或 GB18030。",
        "以十六进制或 Base64 粘贴字节,或上传最大 2 MB 的文件。",
        "点击解码——可读文本显示在下方,带一键复制与完整性提示。",
      ],
      faqs: [
        {
          q: "为什么我的中文文件显示乱码?",
          a: "文件是以 GBK(或 GB2312)字节写入的,但被按 UTF-8 读取。GBK 中每个汉字占 2 字节,UTF-8 阅读器会把这两字节组合解释成随机的拉丁字符或符号。用本工具按 GBK 解码同样的字节即可还原原文。",
        },
        {
          q: "可以反向把文本编码成 GBK 吗?",
          a: "不可以——浏览器按 WHATWG Encoding 标准只内建了老式编码的解码方向;编码到 GBK 需要庞大的字符表。本工具聚焦最常见的救援方向:字节 → 可读文本。",
        },
      ],
    },
    ja: {
      name: "GBK / GB18030 デコーダー",
      tagline:
        "GBK・GB2312・GB18030 のバイトを可読テキストへデコード — 16 進・Base64 貼り付け、最大 2 MB のファイル対応。レガシー中文ファイルの文字化けを修復。無料・プライベート・オフライン。",
      intro: [
        "GBK で保存されたファイル(レガシーな中文コードページ、GB2312 を包含)は UTF-8 環境で開くと文字化けします。このデコーダーはブラウザ内蔵の WHATWG Encoding 対応で生バイトを可読テキストに戻します — GBK と GB18030 は最新のすべてのブラウザでネイティブ実装です。",
        "16 進または Base64 でバイトを貼り付けるか、最大 2 MB のファイルをアップロード — CSV エクスポート、データベースダンプ、TXT ログ、レガシーデータをすべてローカルでデコードします。GB18030 はさらに GBK 範囲外の珍しい漢字の 4 バイト系列にも対応します。",
        "無効または破損したバイトシーケンスは � に置き換えられてカウントされるため、ファイルが本当に GBK かどうか判断できます。アップロードは一切ありません。",
      ],
      steps: [
        "エンコーディングを選択:GBK(GB2312 含む)または GB18030。",
        "16 進または Base64 でバイトを貼り付けるか、最大 2 MB のファイルを選択します。",
        "デコードボタンをクリック — 可読テキストが下に表示され、コピーボタンと整合性メモが付きます。",
      ],
      faqs: [
        {
          q: "中国語ファイルが文字化けするのはなぜ?",
          a: "ファイルは GBK(または GB2312)のバイトで書かれたのに UTF-8 として読まれています。GBK では各漢字が 2 バイトですが、UTF-8 の読み手はそのペアをランダムなラテン文字や記号として解釈します。同じバイトをこのツールで GBK としてデコードすれば原文が復元されます。",
        },
        {
          q: "テキストを GBK にエンコードもできますか?",
          a: "できません — ブラウザは WHATWG Encoding 標準に従い、レガシーエンコーディングのデコード方向のみ内蔵しています。GBK へのエンコードには大きな文字テーブルが必要です。このツールは最も一般的なレスキュー方向(バイト → 可読テキスト)に絞っています。",
        },
      ],
    },
    es: {
      name: "Decodificador GBK / GB18030",
      tagline:
        "Decodifique bytes GBK, GB2312 y GB18030 en texto legible — pegue en hex o Base64, o suba un archivo de hasta 2 MB. Repara mojibake de archivos chinos antiguos. Gratis, privado, sin conexión.",
      intro: [
        "Los archivos guardados con codificación GBK (la página de códigos china antigua, que cubre GB2312) se convierten en mojibake al abrirse en un entorno UTF-8. Este decodificador convierte los bytes crudos en texto legible usando el soporte WHATWG Encoding integrado de su navegador — GBK y GB18030 están implementados de forma nativa en todos los navegadores modernos.",
        "Pegue bytes en hexadecimal o Base64, o suba un archivo de hasta 2 MB — exportaciones CSV, volcados de base de datos, registros .txt y archivos de datos antiguos se decodifican localmente. GB18030 cubre además secuencias de cuatro bytes para ideógrafos CJK raros fuera del rango GBK.",
        "Las secuencias de bytes no válidas o dañadas se reemplazan por el carácter � y se cuentan, para que pueda saber si el archivo era realmente GBK. Nada se sube — la decodificación ocurre íntegramente en esta pestaña.",
      ],
      steps: [
        "Elija la codificación: GBK (cubre GB2312) o GB18030.",
        "Pegue bytes en hex o Base64, o suba un archivo de hasta 2 MB.",
        "Haga clic en Decodificar — el texto legible aparece abajo con botón de copia y una nota de integridad.",
      ],
      faqs: [
        {
          q: "¿Por qué mi archivo chino muestra caracteres ilegibles?",
          a: "El archivo se escribió en bytes GBK (o GB2312) pero se lee como UTF-8. En GBK cada carácter chino ocupa 2 bytes; un lector UTF-8 interpreta esos pares como caracteres latinos o símbolos aleatorios. Decodificar los mismos bytes con esta herramienta restaura el texto original.",
        },
        {
          q: "¿Puedo también codificar texto a GBK aquí?",
          a: "No — los navegadores solo incluyen decodificación integrada para codificaciones antiguas (según el estándar WHATWG Encoding); codificar de vuelta a GBK requeriría una tabla de caracteres enorme. Esta herramienta se centra en la dirección de rescate habitual: bytes → texto legible.",
        },
      ],
    },
    pt: {
      name: "Decodificador GBK / GB18030",
      tagline:
        "Decodifique bytes GBK, GB2312 e GB18030 em texto legível — cole em hex ou Base64, ou envie um arquivo de até 2 MB. Corrige mojibake de arquivos chineses antigos. Grátis, privado, offline.",
      intro: [
        "Arquivos salvos com codificação GBK (a página de códigos chinesa antiga, que cobre GB2312) viram mojibake quando abertos em um ambiente UTF-8. Este decodificador converte os bytes brutos de volta em texto legível usando o suporte WHATWG Encoding integrado do seu navegador — GBK e GB18030 são implementados nativamente em todos os navegadores modernos.",
        "Cole bytes em hexadecimal ou Base64, ou envie um arquivo de até 2 MB — exportações CSV, dumps de banco de dados, logs .txt e arquivos de dados antigos são decodificados localmente. GB18030 também cobre sequências de quatro bytes para ideogramas CJK raros fora do intervalo GBK.",
        "Sequências de bytes inválidas ou danificadas são substituídas pelo caractere � e contadas, para que você possa saber se o arquivo era realmente GBK. Nada é enviado — a decodificação acontece inteiramente nesta aba.",
      ],
      steps: [
        "Escolha a codificação: GBK (cobre GB2312) ou GB18030.",
        "Cole bytes em hex ou Base64, ou envie um arquivo de até 2 MB.",
        "Clique em Decodificar — o texto legível aparece abaixo com botão de cópia e uma nota de integridade.",
      ],
      faqs: [
        {
          q: "Por que meu arquivo chinês mostra caracteres ilegíveis?",
          a: "O arquivo foi gravado em bytes GBK (ou GB2312) mas está sendo lido como UTF-8. Em GBK cada caractere chinês ocupa 2 bytes; um leitor UTF-8 interpreta esses pares como caracteres latinos ou símbolos aleatórios. Decodificar os mesmos bytes com esta ferramenta restaura o texto original.",
        },
        {
          q: "Posso também codificar texto para GBK aqui?",
          a: "Não — os navegadores só trazem decodificação embutida para codificações antigas (conforme o padrão WHATWG Encoding); codificar de volta para GBK exigiria uma tabela de caracteres enorme. Esta ferramenta foca na direção de resgate comum: bytes → texto legível.",
        },
      ],
    },
  },
});
