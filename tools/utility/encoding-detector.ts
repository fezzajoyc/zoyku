import { UtilEngineEncodingDetect } from "../_engines/util-engine-encoding-detect";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "encoding-detector",
  category: "utility",
  icon: "file",
  engine: { component: UtilEngineEncodingDetect },
  related: ["gbk-decoder", "byte-encoding-converter", "file-type-detector", "data-converter"],
  copy: {
    en: {
      name: "File Encoding Detector",
      tagline:
        "Find out which character encoding a file uses — UTF-8, UTF-16, GBK, Big5, Shift_JIS, EUC-KR, Windows-125x or ISO-8859-x — and read what it actually says. Strict decoding plus script analysis, all local.",
      intro: [
        "Drop a text file or paste raw bytes as hex. The tool tries every encoding your browser knows in strict mode, keeps only those that decode without illegal sequences, and then ranks the survivors by script evidence: kana for Japanese, Hangul syllables for Korean, high-frequency ideographs for Chinese, and letter-frequency profiles for Cyrillic and Greek. You get the winning encoding, a confidence level, and the full candidate list so you can switch if you disagree.",
        "This is the rescue tool for mojibake: a CSV exported by an old Windows tool, a subtitle file with the wrong code page, a log file from a Chinese server opened in an editor that assumed UTF-8. Instead of guessing, you see exactly which encodings are plausible and what each one produces, then copy out the text decoded the way it was meant to be read.",
        "Detection is heuristic, not proof, and the tool says so. Short samples and pure-ASCII text are genuinely ambiguous — every ASCII-compatible encoding decodes them — so they are reported as low confidence rather than guessed. GBK and GB18030 are byte-identical for common Chinese characters, so both appear as candidates producing the same text; picking either is correct.",
      ],
      steps: [
        "Drop a file (up to 2 MB) or paste the bytes as hex like d6 d0 ce c4.",
        "Read the detected encoding, the confidence level and the evidence line explaining the decision.",
        "Click any other candidate to re-decode instantly, then copy the text out.",
      ],
      faqs: [
        {
          q: "Why does the tool refuse to name a single encoding for my short file?",
          a: "Because it would be a guess presented as a fact. A pure-ASCII file decodes correctly under UTF-8, GBK, Big5, Shift_JIS and every other ASCII-compatible encoding — the bytes simply do not contain the evidence needed to choose. Rather than pick one and sound confident, the tool reports low confidence with the reason stated. Longer samples containing non-ASCII text give the analysis something to work with.",
        },
        {
          q: "GBK and GB18030 appear together with the same score — which should I use?",
          a: "Either one. For the characters that appear in everyday simplified Chinese, GB18030 and GBK are byte-for-byte identical; GB18030 is a superset that adds rare characters and additional scripts. If your file contains only ordinary text, both decode identically and the choice does not matter. If it contained rare CJK extensions, only GB18030 would decode them correctly.",
        },
        {
          q: "How does the tool decide between Big5 and GBK, which can both decode the same bytes?",
          a: "By character frequency. A GBK-encoded sample decoded with the wrong codec (Big5, EUC-JP) produces valid but rare Chinese characters — 笢恅聆彸潠极 rather than 中文测试简体 — because the wrong mapping lands on low-frequency code points. The scorer checks whether the resulting ideographs fall in a set of high-frequency simplified and traditional characters; a correct decode hits them most of the time, a wrong decode almost never does.",
        },
        {
          q: "Is my file uploaded anywhere?",
          a: "No. Everything happens in the tab: the browser reads the file, runs the WHATWG decoders, scores the candidates and renders the text. There is no network call, no server-side processing, and nothing is written to disk or to a database. Close the tab and the bytes are gone.",
        },
      ],
      deepDive: [
        {
          heading: "Why 'can it decode' beats statistics for UTF-8 — and why it fails for single-byte",
          paragraphs: [
            "Multi-byte encodings have structure. UTF-8 defines which byte sequences are legal: a lead byte in the 0xC2–0xF4 range must be followed by the right number of continuation bytes in 0x80–0xBF, and overlong forms are forbidden. GBK and Big5 define valid lead and trail byte ranges. That structure is what makes strict decoding such a strong filter: when the browser's decoder runs in fatal mode, a byte stream encoded in GBK will almost certainly fail under UTF-8 (and vice versa), so the candidate list collapses before any statistical work happens.",
            "Single-byte encodings have no such structure. Windows-1251, ISO-8859-5, ISO-8859-7 and ISO-8859-1 assign nearly every one of the 256 byte values to some character, so almost any byte sequence decodes 'strictly' under all of them. For these, strictness contributes nothing and the only real signal is linguistic: does the result look like the language that encoding serves? Real Cyrillic text concentrates on about a dozen letters (о, е, а, и, н, т, с, р) and Greek on α, ε, ο, τ, ι, ν; a wrong decode scatters into rare letters and repeats them.",
            "This is why the scorer combines both approaches rather than picking one. The observed failure modes make the point concrete: GBK bytes under CP1251 produced a fully uppercase Cyrillic string with no spaces, and CP1251 bytes under ISO-8859-7 produced 'Οπθβες μθπ' with theta appearing three times — both are decodes that pass strict validation while being obviously wrong to any reader of those languages.",
          ],
        },
        {
          heading: "Scoring by script family: what each language leaves behind",
          paragraphs: [
            "Japanese is the easiest to identify because kana is exclusive. Hiragana and katakana exist only in Japanese text; no Chinese or Korean encoding maps bytes into those code points, so a decode containing kana is essentially confirmed. The score scales with the kana ratio, which means a Japanese file that happens to be all kanji (a headline, a name) scores lower and shows up alongside Chinese candidates — honest, because such text genuinely is ambiguous without context.",
            "Korean is similar through Hangul syllables (U+AC00–U+D7AF). Chinese needs a different approach because the CJK unified block is shared by every Chinese-ish encoding: a wrong decode still lands inside the ideograph block, it just lands on rare characters. Frequency is the discriminator, which is why the scorer keeps a curated set of high-frequency simplified and traditional characters and measures what fraction of the decoded ideographs fall inside it.",
            "Single-byte European scripts use letter-frequency profiles plus structural penalties: text that is fully uppercase gets discounted, long text with no spaces gets discounted, and a decode mixing Latin with Cyrillic (like 'Cafй rйsumй' from CP1252 bytes under CP1251) gets heavily discounted because natural-language text does not switch scripts mid-word. For Latin encodings there is also a telling detail: ISO-8859-1 maps 0xA0–0xBF to legacy symbols like ¤ and ¨ that rarely appear in prose, while ISO-8859-15 maps 0xA4 to the euro sign — so decoding to € instead of ¤ is a positive signal for ISO-8859-15.",
          ],
        },
      ],
    },
    zh: {
      name: "文件编码探测",
      tagline:
        "搞清楚一个文件到底用什么编码——UTF-8、UTF-16、GBK、Big5、Shift_JIS、EUC-KR、Windows-125x 或 ISO-8859-x——并读出它真正的内容。严格解码加文字系统分析,全部本机完成。",
      intro: [
        "拖入文本文件或粘贴十六进制原始字节。工具会用严格模式试遍浏览器认识的所有编码,只保留能无非法序列解出的候选,再按文字系统证据排序:日文看假名、韩文看韩文音节、中文看高频字比例、西里尔与希腊看字母频率轮廓。你会得到首选编码、置信度,以及完整候选列表——不同意时可以随时切换。",
        "这是乱码救援工具:老 Windows 工具导出的 CSV、代码页搞错的字幕文件、在假定 UTF-8 的编辑器里打开的中文服务器日志。不用猜,你能看到哪几种编码是合理的、每种解出什么,然后把按正确编码解出的文本复制走。",
        "探测是启发式而非证明,工具会如实说明。过短的样本和纯 ASCII 文本本质上就是歧义——所有 ASCII 兼容编码都能解——所以它们被标为低置信度而不是硬猜。GBK 与 GB18030 对常用汉字字节完全相同,两者会以同一文本同时出现,选哪个都对。",
      ],
      steps: [
        "拖入文件(上限 2 MB)或粘贴形如 d6 d0 ce c4 的十六进制字节。",
        "读取首选编码、置信度,以及解释判断依据的那一行。",
        "点其它任一候选即可立即重解,然后把文本复制走。",
      ],
      faqs: [
        {
          q: "为什么我的短文件工具不肯给出唯一答案?",
          a: "因为那会是「把猜测当事实」。纯 ASCII 文件在 UTF-8、GBK、Big5、Shift_JIS 以及所有 ASCII 兼容编码下都能正确解码——这些字节里根本不含选择所需的信息。与其挑一个并假装肯定,工具如实报告低置信度并说明原因。更长的、含非 ASCII 文本的样本才能给分析提供抓手。",
        },
        {
          q: "GBK 和 GB18030 同分同时出现,该用哪个?",
          a: "哪个都行。对日常简体中文里出现的字符,GB18030 与 GBK 逐字节相同;GB18030 是超集,额外收了生僻字与其它文字系统。如果你的文件只有普通文本,两者解出结果一致,选哪个都不影响;若含生僻 CJK 扩展字符,则只有 GB18030 能正确解出。",
        },
        {
          q: "Big5 和 GBK 都能解同一段字节,工具怎么选?",
          a: "靠字符频率。GBK 编码的样本用错编解码器(Big5、EUC-JP)解出的是合法但生僻的汉字——比如 笢恅聆彸潠极 而不是 中文测试简体——因为错误映射落在了低频码位上。打分器检查解出的表意文字是否落在「简繁高频字集合」里:正确解码大多数时候命中,错误解码几乎不命中。",
        },
        {
          q: "文件会被上传到任何地方吗?",
          a: "不会。一切都在标签页内完成:浏览器读文件、跑 WHATWG 解码器、给候选打分、渲染文本。没有网络请求、没有服务端处理,也不写磁盘或数据库。关掉标签页,字节就没了。",
        },
      ],
      deepDive: [
        {
          heading: "为什么「能不能解」对 UTF-8 强,对单字节编码完全失效",
          paragraphs: [
            "多字节编码有结构。UTF-8 定义了哪些字节序列合法:0xC2–0xF4 的前导字节必须跟正确数量的 0x80–0xBF 后续字节,过长的形式被禁止。GBK 与 Big5 也定义了合法的前导与尾随字节范围。这种结构正是严格解码成为强筛子的原因:当浏览器的解码器在 fatal 模式下运行,一段 GBK 字节几乎必然在 UTF-8 下失败(反之亦然),候选列表在任何统计工作开始之前就已经坍缩。",
            "单字节编码没有这种结构。Windows-1251、ISO-8859-5、ISO-8859-7 与 ISO-8859-1 几乎把 256 个字节值全部分配给了某个字符,所以几乎任何字节序列在它们下面都能「严格」解码。对这些编码,严格性不提供任何信息,唯一的真实信号是语言学层面的:结果看起来像不像该编码服务的语言?真实西里尔文本高度集中在十来个字母上(о、е、а、и、н、т、с、р),希腊语集中在 α、ε、ο、τ、ι、ν;错解码则会散落到生僻字母并重复它们。",
            "这就是打分器把两种手段合起来用的原因。实测的失败模式很能说明问题:GBK 字节在 CP1251 下解出的是全大写、无空格的西里尔串;CP1251 字节在 ISO-8859-7 下解出「Οπθβες μθπ」,θ 出现三次——两者都通过了严格校验,但在该语言的读者眼里明显是错的。",
          ],
        },
        {
          heading: "按文字系统打分:每种语言留下了什么指纹",
          paragraphs: [
            "日文最好认,因为假名是独占的。平假名与片假名只存在于日文文本;没有任何中文或韩文编码会把字节映射到这些码位,所以含假名的解码基本可确认。分数随假名比例缩放,这意味着全汉字的日文文件(标题、人名)得分较低,会与中文候选并列——这是诚实的,因为这种文本离开语境确实是歧义的。",
            "韩文同理,靠韩文音节(U+AC00–U+D7AF)。中文需要另一套办法,因为 CJK 统一表意区被所有「像中文」的编码共享:错解码依然落在表意文字区内,只是落在生僻字上。频率才是判别器,这就是打分器维护一份精选简繁高频字集、并测量解出的表意文字有多少落在此集合内的原因。",
            "单字节欧洲文字系统用字母频率轮廓加结构性惩罚:全大写的文本降权、长文本却无空格降权、Latin 与西里尔混排的解码(比如 CP1252 字节在 CP1251 下解出「Cafй rйsumй」)大幅降权,因为自然语言不会在词中间切换文字系统。拉丁编码还有个细节很能说明问题:ISO-8859-1 把 0xA0–0xBF 映射为 ¤、¨ 这类几乎不出现在散文里的遗留符号,而 ISO-8859-15 把 0xA4 映射为欧元符号——所以解出 € 而不是 ¤,是 ISO-8859-15 的正面证据。",
          ],
        },
      ],
    },
    ja: {
      name: "ファイルエンコーディング判定",
      tagline:
        "ファイルが実際どの文字エンコーディングを使っているか(UTF-8・UTF-16・GBK・Big5・Shift_JIS・EUC-KR・Windows-125x・ISO-8859-x)を判定し、本当の中身を読み出します。厳密デコードと文字体系解析、すべてローカル。",
      intro: [
        "テキストファイルをドロップするか、生バイトを 16 進で貼り付けます。ブラウザが扱える全エンコーディングを厳密モードで試し、不正なバイト列なしでデコードできた候補だけを残し、文字体系の根拠で順位付けします — 日本語は仮名、韓国語はハングル音節、中国語は高頻度漢字の比率、キリル文字とギリシャ文字は文字頻度プロファイルです。勝ったエンコーディング、信頼度、そして候補一覧が得られるので、異議があれば切り替えられます。",
        "これは文字化け救助ツールです。古い Windows ツールが出力した CSV、コードページを間違えた字幕ファイル、UTF-8 前提のエディタで開いた中国語サーバーのログなどに。当て推量ではなく、どのエンコーディングが妥当で各々が何を出すかを見て、本来の読み方でデコードしたテキストをコピーできます。",
        "判定はヒューリスティックであり証明ではありません。ツールはそう明記します。短いサンプルと純 ASCII は本質的に曖昧(すべての ASCII 互換エンコーディングがデコードできる)なので、当て推量ではなく低信頼度として報告します。GBK と GB18030 は常用漢字でバイトが同一なので、同じテキストで両方が候補に並び、どちらを選んでも正解です。",
      ],
      steps: [
        "ファイル(2 MB まで)をドロップ、または d6 d0 ce c4 のように 16 進で貼り付け。",
        "判定されたエンコーディング、信頼度、判断根拠の行を読みます。",
        "他の候補をクリックすれば即座に再デコードされ、テキストをコピーできます。",
      ],
      faqs: [
        { q: "短いファイルで単一のエンコーディングを名指ししないのはなぜ?", a: "推測を事実として提示することになるからです。純 ASCII ファイルは UTF-8・GBK・Big5・Shift_JIS などすべての ASCII 互換エンコーディングで正しくデコードされます — バイト列に選択の根拠が含まれていないのです。一つ選んで自信ありげに言う代わりに、低信頼度とその理由を報告します。非 ASCII テキストを含む長いサンプルなら解析の手がかりが得られます。" },
        { q: "GBK と GB18030 が同点で並ぶとき、どちらを使えば?", a: "どちらでも同じです。日常的な簡体字中国語に現れる文字では GB18030 と GBK はバイト単位で同一で、GB18030 は希少文字と追加文字体系を加えた上位集合です。普通のテキストしか含まなければ結果は同じ、希少な CJK 拡張文字を含むなら GB18030 のみが正しくデコードします。" },
        { q: "Big5 と GBK の両方が同じバイトをデコードできる場合、どう選ぶ?", a: "文字頻度で選びます。GBK で符号化されたサンプルを誤ったコーデック(Big5・EUC-JP)でデコードすると、正当だが希少な漢字が出ます — 中文测试简体 ではなく 笢恅聆彸潠极 のように、誤った写像が低頻度の符号位置に着地するためです。スコアラーは得られた表意文字が高頻度の簡体字・繁体字集合に入るかを調べ、正しいデコードはほとんど命中し、誤りはほぼ命中しません。" },
        { q: "ファイルはどこかにアップロードされますか?", a: "されません。すべてタブ内で完結します:ブラウザがファイルを読み、WHATWG デコーダを走らせ、候補を採点し、テキストを描画します。ネットワーク呼び出しもサーバー側処理もなく、ディスクやデータベースにも書きません。タブを閉じればバイトは消えます。" },
      ],
      deepDive: [
        {
          heading: "「デコードできるか」は UTF-8 には強いが単バイトでは無力な理由",
          paragraphs: [
            "多バイトエンコーディングには構造があります。UTF-8 はどのバイト列が合法かを定めます:0xC2–0xF4 の先頭バイトには正しい数の 0x80–0xBF 継続バイトが続かねばならず、過長形式は禁止です。GBK と Big5 も合法な先頭・後続バイト範囲を定めます。この構造こそ厳密デコードを強力な篩にする理由で、ブラウザのデコーダを fatal モードで走らせると、GBK で符号化されたバイト列は UTF-8 でほぼ確実に失敗し(逆も同様)、統計処理の前に候補が崩れます。",
            "単バイトエンコーディングにはその構造がありません。Windows-1251・ISO-8859-5・ISO-8859-7・ISO-8859-1 は 256 のバイト値のほぼすべてを何らかの文字に割り当てるので、ほとんどどんなバイト列もそれらすべてで『厳密に』デコードできます。これらでは厳密性は何の情報も与えず、唯一の実信号は言語的です — 結果がそのエンコーディングが担う言語らしく見えるか。実際のキリル文字テキストは十余りの文字(о, е, а, и, н, т, с, р)に集中し、ギリシャ語は α, ε, ο, τ, ι, ν に集中します。誤デコードは希少文字へ散らばり、それを繰り返します。",
            "だからスコアラーは両手法を併用します。観測された失敗例が要点を示します:GBK のバイトを CP1251 で解くと全大文字・空白なしのキリル文字列になり、CP1251 のバイトを ISO-8859-7 で解くと『Οπθβες μθπ』で θ が 3 回現れます — どちらも厳密検証を通りながら、その言語の読者には明らかに誤りです。",
          ],
        },
        {
          heading: "文字体系ごとの採点:各言語が残す指紋",
          paragraphs: [
            "日本語が最も判別しやすいのは仮名が独占だからです。ひらがなとカタカナは日本語テキストにしか存在せず、中国語や韓国語のエンコーディングがバイトをそれらの符号位置に写すことはありません。したがって仮名を含むデコードはほぼ確定です。スコアは仮名比率で伸びるため、全漢字の日本語ファイル(見出しや人名)は低得点になり中国語候補と並びます — 文脈なしでは実際に曖昧なので誠実な結果です。",
            "韓国語もハングル音節(U+AC00–U+D7AF)で同様です。中国語は別の方法が必要で、CJK 統合表意ブロックは『中国語らしい』すべてのエンコーディングで共有されます:誤デコードでも表意ブロックに入り、ただ希少文字に着地します。頻度が判別子であり、スコアラーが高頻度の簡体字・繁体字の精選集合を保ち、デコードされた表意文字のどれだけがそこに入るかを測る理由です。",
            "単バイトの欧州文字体系は文字頻度プロファイルと構造的罰則を使います:全大文字のテキストは減点、長いのに空白がないテキストは減点、ラテン文字とキリル文字が混在するデコード(CP1252 のバイトを CP1251 で解いた『Cafй rйsumй』など)は大きく減点 — 自然言語は単語の途中で文字体系を切り替えないからです。ラテン系には示唆的な細部もあります:ISO-8859-1 は 0xA0–0xBF を ¤ や ¨ のような散文にほぼ現れない遺物記号に写し、ISO-8859-15 は 0xA4 をユーロ記号に写します — つまり ¤ ではなく € にデコードされることは ISO-8859-15 の肯定材料です。",
          ],
        },
      ],
    },
    es: {
      name: "Detector de codificación de archivos",
      tagline:
        "Descubra qué codificación de caracteres usa un archivo — UTF-8, UTF-16, GBK, Big5, Shift_JIS, EUC-KR, Windows-125x o ISO-8859-x — y lea lo que realmente dice. Decodificación estricta más análisis de escritura, todo local.",
      intro: [
        "Suelte un archivo de texto o pegue bytes en hexadecimal. La herramienta prueba todas las codificaciones que conoce su navegador en modo estricto, conserva solo las que decodifican sin secuencias ilegales y luego ordena las supervivientes por evidencia de escritura: kana para japonés, sílabas Hangul para coreano, ideogramas de alta frecuencia para chino, perfiles de frecuencia de letras para cirílico y griego. Obtiene la codificación ganadora, un nivel de confianza y la lista completa de candidatos para cambiar si no está de acuerdo.",
        "Esta es la herramienta de rescate para mojibake: un CSV exportado por una herramienta Windows antigua, un archivo de subtítulos con la página de códigos equivocada, un log de un servidor chino abierto en un editor que asumió UTF-8. En lugar de adivinar, ve exactamente qué codificaciones son plausibles y qué produce cada una, y luego copia el texto decodificado como debía leerse.",
        "La detección es heurística, no prueba, y la herramienta lo dice. Las muestras cortas y el texto puramente ASCII son genuinamente ambiguos — toda codificación compatible con ASCII los decodifica — así que se informan con confianza baja en vez de adivinar. GBK y GB18030 son idénticos byte a byte para caracteres chinos comunes, por lo que ambos aparecen como candidatos con el mismo texto; elegir cualquiera es correcto.",
      ],
      steps: [
        "Suelte un archivo (hasta 2 MB) o pegue los bytes en hexadecimal como d6 d0 ce c4.",
        "Lea la codificación detectada, el nivel de confianza y la línea de evidencia que explica la decisión.",
        "Haga clic en cualquier otro candidato para recodificar al instante y copie el texto.",
      ],
      faqs: [
        { q: "¿Por qué la herramienta se niega a nombrar una sola codificación para mi archivo corto?", a: "Porque sería una conjetura presentada como hecho. Un archivo puramente ASCII decodifica correctamente bajo UTF-8, GBK, Big5, Shift_JIS y toda codificación compatible con ASCII: los bytes simplemente no contienen la evidencia necesaria para elegir. En vez de escoger una y sonar seguro, informa confianza baja con el motivo. Las muestras más largas con texto no ASCII dan algo con lo que trabajar al análisis." },
        { q: "GBK y GB18030 aparecen juntos con la misma puntuación: ¿cuál uso?", a: "Cualquiera. Para los caracteres que aparecen en chino simplificado cotidiano, GB18030 y GBK son idénticos byte a byte; GB18030 es un superconjunto que añade caracteres raros y otras escrituras. Si su archivo solo contiene texto ordinario, ambos decodifican igual y la elección no importa; si contuviera extensiones CJK raras, solo GB18030 las decodificaría bien." },
        { q: "¿Cómo decide entre Big5 y GBK, que pueden decodificar los mismos bytes?", a: "Por frecuencia de caracteres. Una muestra codificada en GBK decodificada con el códec equivocado (Big5, EUC-JP) produce caracteres chinos válidos pero raros — 笢恅聆彸潠极 en lugar de 中文测试简体 — porque el mapeo erróneo aterriza en puntos de código de baja frecuencia. El puntuador comprueba si los ideogramas resultantes caen en un conjunto de caracteres simplificados y tradicionales de alta frecuencia; una decodificación correcta los acierta casi siempre, una errónea casi nunca." },
        { q: "¿Mi archivo se sube a algún sitio?", a: "No. Todo ocurre en la pestaña: el navegador lee el archivo, ejecuta los decodificadores WHATWG, puntúa los candidatos y renderiza el texto. No hay llamada de red, ni procesamiento en servidor, ni escritura en disco o base de datos. Cierre la pestaña y los bytes desaparecen." },
      ],
      deepDive: [
        {
          heading: "Por qué «¿puede decodificar?» es potente para UTF-8 y nulo para codificaciones de un byte",
          paragraphs: [
            "Las codificaciones multibyte tienen estructura. UTF-8 define qué secuencias de bytes son legales: un byte inicial en el rango 0xC2–0xF4 debe ir seguido del número correcto de bytes de continuación en 0x80–0xBF, y las formas demasiado largas están prohibidas. GBK y Big5 también definen rangos legales de byte inicial y final. Esa estructura es lo que hace de la decodificación estricta un filtro tan potente: cuando el decodificador del navegador corre en modo fatal, un flujo codificado en GBK fallará casi con seguridad bajo UTF-8 (y viceversa), así que la lista de candidatos colapsa antes de cualquier trabajo estadístico.",
            "Las codificaciones de un byte carecen de esa estructura. Windows-1251, ISO-8859-5, ISO-8859-7 e ISO-8859-1 asignan casi todos los 256 valores de byte a algún carácter, así que casi cualquier secuencia decodifica «estrictamente» bajo todas ellas. Para estas, la estrictez no aporta nada y la única señal real es lingüística: ¿parece el resultado el idioma que esa codificación sirve? El texto cirílico real se concentra en una docena de letras (о, е, а, и, н, т, с, р) y el griego en α, ε, ο, τ, ι, ν; una decodificación errónea se dispersa en letras raras y las repite.",
            "Por eso el puntuador combina ambos enfoques en vez de elegir uno. Los modos de fallo observados lo ilustran: bytes GBK bajo CP1251 produjeron una cadena cirílica totalmente en mayúsculas sin espacios, y bytes CP1251 bajo ISO-8859-7 produjeron «Οπθβες μθπ» con theta apareciendo tres veces — ambas pasan la validación estricta siendo obviamente erróneas para cualquier lector de esos idiomas.",
          ],
        },
        {
          heading: "Puntuar por familia de escritura: la huella que deja cada idioma",
          paragraphs: [
            "El japonés es el más fácil de identificar porque el kana es exclusivo. Hiragana y katakana existen solo en texto japonés; ninguna codificación china o coreana mapea bytes a esos puntos de código, así que una decodificación con kana queda prácticamente confirmada. La puntuación escala con la proporción de kana, lo que significa que un archivo japonés que casualmente sea todo kanji (un titular, un nombre) puntúa más bajo y aparece junto a candidatos chinos — honesto, porque ese texto es genuinamente ambiguo sin contexto.",
            "El coreano es análogo mediante sílabas Hangul (U+AC00–U+D7AF). El chino necesita otro enfoque porque el bloque unificado CJK lo comparten todas las codificaciones «chinescas»: una decodificación errónea sigue cayendo dentro del bloque de ideogramas, solo que en caracteres raros. La frecuencia es el discriminador, y por eso el puntuador mantiene un conjunto curado de caracteres simplificados y tradicionales de alta frecuencia y mide qué fracción de los ideogramas decodificados cae dentro.",
            "Las escrituras europeas de un byte usan perfiles de frecuencia de letras más penalizaciones estructurales: el texto todo en mayúsculas se descuenta, el texto largo sin espacios se descuenta, y una decodificación que mezcla latino con cirílico (como «Cafй rйsumй» de bytes CP1252 bajo CP1251) se descuenta mucho porque el lenguaje natural no cambia de escritura a mitad de palabra. Para las codificaciones latinas hay también un detalle revelador: ISO-8859-1 mapea 0xA0–0xBF a símbolos heredados como ¤ y ¨ que rara vez aparecen en prosa, mientras ISO-8859-15 mapea 0xA4 al símbolo del euro — así que decodificar a € en lugar de ¤ es una señal positiva para ISO-8859-15.",
          ],
        },
      ],
    },
    pt: {
      name: "Detector de codificação de arquivos",
      tagline:
        "Descubra qual codificação de caracteres um arquivo usa — UTF-8, UTF-16, GBK, Big5, Shift_JIS, EUC-KR, Windows-125x ou ISO-8859-x — e leia o que ele realmente diz. Decodificação estrita mais análise de escrita, tudo local.",
      intro: [
        "Solte um arquivo de texto ou cole bytes em hexadecimal. A ferramenta testa todas as codificações que seu navegador conhece em modo estrito, mantém apenas as que decodificam sem sequências ilegais e então ordena as sobreviventes por evidência de escrita: kana para japonês, sílabas Hangul para coreano, ideogramas de alta frequência para chinês, perfis de frequência de letras para cirílico e grego. Você recebe a codificação vencedora, um nível de confiança e a lista completa de candidatos para trocar se discordar.",
        "Esta é a ferramenta de resgate para mojibake: um CSV exportado por uma ferramenta Windows antiga, um arquivo de legendas com a página de código errada, um log de um servidor chinês aberto num editor que assumiu UTF-8. Em vez de adivinhar, você vê exatamente quais codificações são plausíveis e o que cada uma produz, e depois copia o texto decodificado como deveria ser lido.",
        "A detecção é heurística, não prova, e a ferramenta diz isso. Amostras curtas e texto puramente ASCII são genuinamente ambíguos — toda codificação compatível com ASCII os decodifica — então são informados com confiança baixa em vez de adivinhados. GBK e GB18030 são byte a byte idênticos para caracteres chineses comuns, então ambos aparecem como candidatos com o mesmo texto; escolher qualquer um é correto.",
      ],
      steps: [
        "Solte um arquivo (até 2 MB) ou cole os bytes em hexadecimal como d6 d0 ce c4.",
        "Leia a codificação detectada, o nível de confiança e a linha de evidência que explica a decisão.",
        "Clique em qualquer outro candidato para redecodificar na hora e copie o texto.",
      ],
      faqs: [
        { q: "Por que a ferramenta se recusa a nomear uma única codificação para meu arquivo curto?", a: "Porque seria um palpite apresentado como fato. Um arquivo puramente ASCII decodifica corretamente sob UTF-8, GBK, Big5, Shift_JIS e toda codificação compatível com ASCII: os bytes simplesmente não contêm a evidência necessária para escolher. Em vez de escolher uma e soar confiante, informa confiança baixa com o motivo. Amostras mais longas com texto não ASCII dão algo com que a análise trabalhar." },
        { q: "GBK e GB18030 aparecem juntos com a mesma pontuação: qual uso?", a: "Qualquer um. Para os caracteres que aparecem em chinês simplificado cotidiano, GB18030 e GBK são idênticos byte a byte; GB18030 é um superconjunto que adiciona caracteres raros e outras escritas. Se o arquivo contém apenas texto comum, ambos decodificam igual e a escolha não importa; se contivesse extensões CJK raras, só GB18030 as decodificaria corretamente." },
        { q: "Como a ferramenta decide entre Big5 e GBK, que podem decodificar os mesmos bytes?", a: "Por frequência de caracteres. Uma amostra codificada em GBK decodificada com o codec errado (Big5, EUC-JP) produz caracteres chineses válidos mas raros — 笢恅聆彸潠极 em vez de 中文测试简体 — porque o mapeamento errado cai em pontos de código de baixa frequência. O pontuador verifica se os ideogramas resultantes caem num conjunto de caracteres simplificados e tradicionais de alta frequência; uma decodificação correta acerta quase sempre, uma errada quase nunca." },
        { q: "Meu arquivo é enviado a algum lugar?", a: "Não. Tudo acontece na aba: o navegador lê o arquivo, executa os decodificadores WHATWG, pontua os candidatos e renderiza o texto. Não há chamada de rede, nem processamento no servidor, nem gravação em disco ou banco de dados. Feche a aba e os bytes desaparecem." },
      ],
      deepDive: [
        {
          heading: "Por que «consegue decodificar?» é potente para UTF-8 e nulo para codificações de um byte",
          paragraphs: [
            "Codificações multibyte têm estrutura. UTF-8 define quais sequências de bytes são legais: um byte inicial na faixa 0xC2–0xF4 deve ser seguido pelo número correto de bytes de continuação em 0x80–0xBF, e formas longas demais são proibidas. GBK e Big5 também definem faixas legais de byte inicial e final. Essa estrutura é o que faz da decodificação estrita um filtro tão potente: quando o decodificador do navegador roda em modo fatal, um fluxo codificado em GBK quase certamente falhará sob UTF-8 (e vice-versa), então a lista de candidatos colapsa antes de qualquer trabalho estatístico.",
            "Codificações de um byte não têm essa estrutura. Windows-1251, ISO-8859-5, ISO-8859-7 e ISO-8859-1 atribuem quase todos os 256 valores de byte a algum caractere, então quase qualquer sequência decodifica «estritamente» sob todas elas. Para essas, a estritez não contribui em nada e o único sinal real é linguístico: o resultado parece o idioma que aquela codificação serve? Texto cirílico real concentra-se em cerca de uma dúzia de letras (о, е, а, и, н, т, с, р) e o grego em α, ε, ο, τ, ι, ν; uma decodificação errada se dispersa em letras raras e as repete.",
            "É por isso que o pontuador combina ambas as abordagens em vez de escolher uma. Os modos de falha observados ilustram: bytes GBK sob CP1251 produziram uma string cirílica totalmente em maiúsculas sem espaços, e bytes CP1251 sob ISO-8859-7 produziram «Οπθβες μθπ» com theta aparecendo três vezes — ambas passam na validação estrita sendo obviamente erradas para qualquer leitor desses idiomas.",
          ],
        },
        {
          heading: "Pontuar por família de escrita: a impressão digital que cada idioma deixa",
          paragraphs: [
            "O japonês é o mais fácil de identificar porque o kana é exclusivo. Hiragana e katakana existem apenas em texto japonês; nenhuma codificação chinesa ou coreana mapeia bytes para esses pontos de código, então uma decodificação com kana fica praticamente confirmada. A pontuação escala com a proporção de kana, o que significa que um arquivo japonês que por acaso seja todo kanji (uma manchete, um nome) pontua mais baixo e aparece junto a candidatos chineses — honesto, porque esse texto é genuinamente ambíguo sem contexto.",
            "O coreano é análogo via sílabas Hangul (U+AC00–U+D7AF). O chinês precisa de outra abordagem porque o bloco unificado CJK é compartilhado por todas as codificações «chinesas»: uma decodificação errada ainda cai dentro do bloco de ideogramas, só que em caracteres raros. A frequência é o discriminador, e é por isso que o pontuador mantém um conjunto curado de caracteres simplificados e tradicionais de alta frequência e mede que fração dos ideogramas decodificados cai dentro dele.",
            "Escritas europeias de um byte usam perfis de frequência de letras mais penalizações estruturais: texto todo em maiúsculas é descontado, texto longo sem espaços é descontado, e uma decodificação que mistura latim com cirílico (como «Cafй rйsumй» de bytes CP1252 sob CP1251) é muito descontada porque a linguagem natural não troca de escrita no meio da palavra. Para codificações latinas há também um detalhe revelador: ISO-8859-1 mapeia 0xA0–0xBF para símbolos legados como ¤ e ¨ que raramente aparecem em prosa, enquanto ISO-8859-15 mapeia 0xA4 para o símbolo do euro — então decodificar para € em vez de ¤ é um sinal positivo para ISO-8859-15.",
          ],
        },
      ],
    },
  },
});
