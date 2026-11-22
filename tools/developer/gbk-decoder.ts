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
      deepDive: [
        {
          heading: "The GB2312 → GBK → GB18030 evolution, in bytes",
          paragraphs: [
            "GB2312 (1980) defined about 6,763 Chinese characters in a two-byte scheme: lead bytes 0xA1–0xF7, trail bytes 0xA1–0xFE, ASCII untouched. GBK (1995) extended the lead byte range down to 0x81 and allowed trail bytes down to 0x40 — which is why a Latin letter can legally appear as the second byte of a Chinese character, and why corrupted text sometimes looks like plausible Latin. GB18030 (2000/2005/2022 revisions) added four-byte sequences to cover the full Unicode range and is now mandatory for software sold in China.",
            "The four-byte GB18030 sequences are the practical reason to pick GB18030 over GBK in this tool: characters beyond the ~21,000 that GBK covers — rare ideographs like 𠀀, many emoji-era symbols and minority-script extensions — simply do not exist in GBK. Decoding GB18030 data with the GBK decoder produces replacement characters exactly where those four-byte sequences occur.",
            "This tool decodes with the browser's WHATWG Encoding implementation, which follows the modern WHATWG encoding standard — its GBK tables are the accepted interoperable reference (WHATWG actually maps the GB2312 label to the GBK decoder, so “GB2312” input decodes correctly here too).",
          ],
        },
        {
          heading: "Mojibake rescue in practice",
          paragraphs: [
            "The classic failure: a GBK-encoded CSV opened in a UTF-8 editor shows 秦 Familiar-looking garbage like 鏂扮郴 because the editor read the GBK byte pairs as UTF-8 and printed the replacement or unrelated characters it could decode. The fix is exactly what this tool does: take the original bytes, decode them as GBK, and the original text reappears. Reverse mojibake (repairing text that was already mis-decoded once) sometimes works by encoding the garbage back to the wrong encoding first — this tool does not attempt that; use it on the original bytes whenever possible.",
            "Excel exports deserve a special note: CSV files saved by Chinese-locale Excel are usually GBK (labeled “ANSI” in the save dialog), while Microsoft's own docs sometimes produce UTF-8 with BOM. A UTF-8 BOM (EF BB BF) at the start decodes harmlessly here, so BOM-prefixed files need no trimming.",
            "The replacement count is your integrity gauge: zero means every byte pair resolved cleanly; more than a few means the data is truncated, double-encoded, or not GBK at all. Files with the count slightly above zero usually suffered a one-byte corruption in transit — the readable text around the � markers is typically still usable.",
          ],
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
      deepDive: [
        {
          heading: "GB2312 → GBK → GB18030 的字节演进史",
          paragraphs: [
            "GB2312(1980)用双字节方案定义了约 6,763 个汉字:首字节 0xA1–0xF7,次字节 0xA1–0xFE,ASCII 不动。GBK(1995)把首字节下探到 0x81、次字节下探到 0x40——这解释了两件事:拉丁字母可以作为汉字的第二个字节合法出现,以及损坏的文本有时看起来像合理的拉丁词。GB18030(2000/2005/2022 三版)加入四字节序列覆盖全部 Unicode,是如今在中国境内销售的软件的强制要求。",
            "四字节 GB18030 序列是本工具选 GB18030 而非 GBK 的实际理由:GBK 覆盖的约 2.1 万字之外的字符——𠀀 这类生僻字、大量 emoji 时代的符号、少数民族文字扩展——在 GBK 里根本不存在。用 GBK 解码含这些字符的 GB18030 数据,会在四字节序列处精确出现替换符。",
            "本工具的解码走浏览器的 WHATWG Encoding 实现,遵循现代 WHATWG 编码标准——其 GBK 表是公认的互操作参照(WHATWG 实际把 GB2312 标签直接映射到 GBK 解码器,所以标 GB2312 的输入在这里也能正确解码)。",
          ],
        },
        {
          heading: "乱码救援实操",
          paragraphs: [
            "经典故障:GBK 编码的 CSV 在 UTF-8 编辑器里打开,显示 鏂扮郴 这类看似有规律的乱码——因为编辑器把 GBK 字节对按 UTF-8 读取,打出了它能解出的替换或无关字符。修复正是本工具做的事:取原始字节、按 GBK 解码、原文重现。反向救援(把已被错误解码一次的乱码文本修回来)有时需要先把乱码按错误编码编码回去——本工具不做这个,尽量拿原始字节来。",
            "Excel 导出值得特别一提:中文区域 Excel 保存的 CSV 通常是 GBK(保存对话框里标 ANSI),而微软自家的部分文档却产出带 BOM 的 UTF-8。开头的 UTF-8 BOM(EF BB BF)在本工具解码时无害,所以带 BOM 的文件无需手工裁剪。",
            "替换符计数就是你的完整性仪表:零表示每个字节对都干净解析;超过几个说明数据被截断、双重编码或根本不是 GBK。计数略大于零的文件通常在传输中损了一个字节——� 标记周围的可读文本一般仍然可用。",
          ],
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
      deepDive: [
        {
          heading: "GB2312 → GBK → GB18030 のバイト演进史",
          paragraphs: [
            "GB2312(1980)は二バイト方式で約 6,763 漢字を定義:リードバイト 0xA1–0xF7、トレイル 0xA1–0xFE、ASCII はそのまま。GBK(1995)はリードバイトを 0x81 まで、トレイルを 0x40 まで拡張 — だからラテン文字が漢字の第二バイトとして合法的に現れ、壊れたテキストがもっともらしいラテン語に見えることがあるのです。GB18030(2000/2005/2022 改訂)は四バイト系列を追加して全 Unicode をカバーし、中国国内で販売されるソフトウェアの必須要件です。",
            "四バイト GB18030 系列は、本ツールで GB18030 を GBK より選ぶ実務的理由です:GBK の約 2.1 万字を超える文字 — 𠀀 のようなレアな漢字、絵文字時代の記号の多く、少数民族文字の拡張 — は GBK に存在しません。これらを含む GB18030 データを GBK デコーダで処理すると、四バイト系列の位置に正確に置換文字が現れます。",
            "本ツールのデコードはブラウザの WHATWG Encoding 実装を使用し、現代の WHATWG 標準に従います — その GBK テーブルは相互運用のリファレンスとされ(WHATWG は GB2312 ラベルを GBK デコーダに直接マップ)、GB2312 表記の入力もここで正しくデコードされます。",
          ],
        },
        {
          heading: "文字化けレスキュー実践",
          paragraphs: [
            "古典的トラブル:GBK の CSV を UTF-8 エディタで開くと 鏂扮郴 のような規則性のある文字化けに — エディタが GBK バイト対を UTF-8 として読み、解釈できる置換・無関係文字を出力したためです。修復は本ツールの仕事そのもの:元のバイトを取り、GBK としてデコードすれば原文が戻ります。逆レスキュー(一度誤デコードされた文字化けテキストの修復)は、まず誤ったエンコーディングでエンコードし戻す必要があることがあります — 本ツールはそれを行わず、可能な限り元のバイトをお使いください。",
            "Excel 出力には特記:中国語ロケールの Excel が保存する CSV は通常 GBK(保存ダイアログでは ANSI 表記)、一方 Microsoft 自家の一部ドキュメントは BOM 付き UTF-8 を出します。先頭の UTF-8 BOM(EF BB BF)はここでは無害にデコードされるため、BOM 付きファイルの手動トリミングは不要です。",
            "置換カウントは整合性のゲージです:ゼロなら全バイト対がクリア;数個以上ならデータが切断、二重エンコード、または GBK ではなかったことを意味します。カウントがわずかに正のファイルは輸送中に一バイト破損した通常 — � 印の周りの可読テキストはたいてい使えます。",
          ],
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
      deepDive: [
        {
          heading: "La evolución GB2312 → GBK → GB18030, en bytes",
          paragraphs: [
            "GB2312 (1980) definió unos 6.763 caracteres chinos en un esquema de dos bytes: bytes guía 0xA1–0xF7, bytes finales 0xA1–0xFE, ASCII intacto. GBK (1995) extendió el byte guía hasta 0x81 y permitió bytes finales hasta 0x40 — por eso una letra latina puede aparecer legalmente como segundo byte de un carácter chino, y por qué el texto corrupto a veces parece latino plausible. GB18030 (revisiones 2000/2005/2022) añadió secuencias de cuatro bytes para cubrir todo Unicode y hoy es obligatorio para el software vendido en China.",
            "Las secuencias de cuatro bytes de GB18030 son la razón práctica para elegir GB18030 sobre GBK en esta herramienta: los caracteres fuera de los ~21.000 que cubre GBK — ideógrafos raros como 𠀀, muchos símbolos de la era emoji y extensiones de escrituras minoritarias — simplemente no existen en GBK. Decodificar datos GB18030 con el decodificador GBK produce caracteres de reemplazo exactamente donde ocurren esas secuencias.",
            "Esta herramienta decodifica con la implementación WHATWG Encoding del navegador, que sigue el estándar moderno — sus tablas GBK son la referencia interoperable aceptada (WHATWG mapea la etiqueta GB2312 al decodificador GBK, así que la entrada «GB2312» también decodifica correctamente aquí).",
          ],
        },
        {
          heading: "Rescate de mojibake en la práctica",
          paragraphs: [
            "El fallo clásico: un CSV en GBK abierto en un editor UTF-8 muestra basura con apariencia de patrón como 鏂扮郴 — el editor leyó los pares de bytes GBK como UTF-8 e imprimió los reemplazos o caracteres no relacionados que pudo decodificar. La reparación es exactamente lo que hace esta herramienta: tomar los bytes originales, decodificarlos como GBK y el texto original reaparece. El mojibake inverso (reparar texto ya mal decodificado) a veces requiere codificar la basura de vuelta al código erróneo primero — esta herramienta no lo intenta; úsela sobre los bytes originales siempre que sea posible.",
            "Las exportaciones de Excel merecen nota especial: los CSV guardados por Excel en configuración regional china suelen ser GBK (etiquetado «ANSI» en el diálogo), mientras que algunos documentos de Microsoft producen UTF-8 con BOM. Un BOM UTF-8 (EF BB BF) al inicio decodifica sin daño aquí, así que los archivos con BOM no necesitan recorte.",
            "El conteo de reemplazos es su indicador de integridad: cero significa que cada par de bytes se resolvió limpio; más de unos pocos indica datos truncados, doble codificados o que no son GBK. Los archivos con un conteo ligeramente superior a cero suelen haber sufrido la corrupción de un byte en tránsito — el texto legible alrededor de los � suele seguir siendo utilizable.",
          ],
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
      deepDive: [
        {
          heading: "A evolução GB2312 → GBK → GB18030, em bytes",
          paragraphs: [
            "A GB2312 (1980) definiu cerca de 6.763 caracteres chineses em um esquema de dois bytes: bytes-guia 0xA1–0xF7, bytes-finais 0xA1–0xFE, ASCII intacto. A GBK (1995) estendeu o byte-guia até 0x81 e permitiu bytes-finais até 0x40 — por isso uma letra latina pode aparecer legalmente como segundo byte de um caractere chinês, e por que texto corrompido às vezes parece latino plausível. A GB18030 (revisões 2000/2005/2022) adicionou sequências de quatro bytes para cobrir todo o Unicode e hoje é obrigatória para software vendido na China.",
            "As sequências de quatro bytes da GB18030 são a razão prática de escolher GB18030 em vez de GBK nesta ferramenta: caracteres fora dos ~21.000 que a GBK cobre — ideógrafos raros como 𠀀, muitos símbolos da era emoji e extensões de escritas minoritárias — simplesmente não existem na GBK. Decodificar dados GB18030 com o decodificador GBK produz caracteres de substituição exatamente onde essas sequências ocorrem.",
            "Esta ferramenta decodifica com a implementação WHATWG Encoding do navegador, que segue o padrão moderno — suas tabelas GBK são a referência interoperável aceita (o WHATWG mapeia o rótulo GB2312 direto para o decodificador GBK, então entrada rotulada GB2312 também decodifica corretamente aqui).",
          ],
        },
        {
          heading: "Resgate de mojibake na prática",
          paragraphs: [
            "A falha clássica: um CSV em GBK aberto em um editor UTF-8 mostra lixo com aparência padronizada como 鏂扮郴 — o editor leu os pares de bytes GBK como UTF-8 e imprimiu os substitutos ou caracteres não relacionados que conseguiu decodificar. O resgate é exatamente o que esta ferramenta faz: pegar os bytes originais, decodificá-los como GBK, e o texto original reaparece. O resgate reverso (consertar texto que já foi mal decodificado uma vez) às vezes exige codificar o lixo de volta para o código errado primeiro — esta ferramenta não tenta isso; use os bytes originais sempre que possível.",
            "Exportações do Excel merecem nota especial: CSVs salvos pelo Excel em locale chinês costumam ser GBK (rotulado ANSI no diálogo), enquanto alguns documentos da própria Microsoft produzem UTF-8 com BOM. Um BOM UTF-8 (EF BB BF) no início decodifica sem dano aqui, então arquivos com BOM não precisam de corte manual.",
            "A contagem de substituições é seu medidor de integridade: zero significa que cada par de bytes foi resolvido limpo; mais de alguns significa dados truncados, duplamente codificados ou que não são GBK. Arquivos com contagem levemente acima de zero geralmente sofreram corrupção de um byte em trânsito — o texto legível ao redor dos � normalmente continua utilizável.",
          ],
        },
      ],
    },
  },
});
