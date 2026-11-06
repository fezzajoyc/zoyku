import { TextTransform } from "../_engines/text-tool";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "text-to-binary",
  category: "text",
  icon: "code",
  engine: {
    component: TextTransform,
    props: {
      transform: "text-binary",
      options: [
        { key: 'decode', label: { en: 'Decode binary to text', zh: '把二进制解码回文本', ja: 'バイナリをテキストにデコード', es: 'Decodificar binario a texto', pt: 'Decodificar binário para texto' }, default: false }
      ],
      sample: 'Hi!'
    },
  },
  related: ["text-to-unicode", "case-converter", "base64-encoder", "text-cleaner", "text-diff", "text-sorter", "remove-extra-spaces", "remove-duplicate-lines", "word-counter", "lorem-ipsum-generator"],
  copy: {
    en: {
      name: 'Text to Binary',
      tagline: 'Convert any text to 8-bit binary bytes and back — UTF-8 safe, instant and fully in your browser. Perfect for teaching, puzzles and CS homework.',
      intro: ["Every character you type becomes its UTF-8 byte sequence rendered as groups of eight 0s and 1s. 'Hi!' turns into 01001000 01101001 00100001 — the exact bits a computer stores, shown in a form you can read and copy.",
        "Switch on Decode to go the other way: paste space-separated binary groups and get the original text back. Multi-byte characters such as emoji and CJK are handled correctly because decoding goes through the browser's UTF-8 TextDecoder.",
        "Encoding goes through the browser's TextEncoder, so a character that takes two UTF-8 bytes (é → C3 A9) produces two 8-bit groups, and a four-byte emoji produces four. Output uses a single space between groups, the standard convention that lets you paste the string back into decode mode without preprocessing.",
        "Compared with converting in a REPL or a one-liner, the decode toggle reverses the operation without a second tool — paste '01001000 01101001' and 'Hi' comes back. And unlike hex dumps or base64, the result is human-verifiable: each letter's bit pattern is right there on screen, which is what makes this useful for teaching and puzzles.",
      ],
      steps: ['Type or paste the text to encode — binary appears live.',
        "Flip on 'Decode binary to text' to convert binary groups back into words.",
        'Copy the result with one click.'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "Binary is bytes, not magic",
          paragraphs: [
            "What this tool produces is not \"text turned into 01\" by some abstract process — it is the exact UTF-8 byte sequence a computer already stores for your text, rendered as binary digits. The letter \"A\" is one byte, 01000001, which is the number 65 — the ASCII code that has meant A since the 1960s. There is no translation step and no interpretation: the bits on screen are the bits in the file.",
            "UTF-8 is the key detail. ASCII characters (A-Z, digits, common punctuation) take one byte each, so their binary is short. Characters outside ASCII take two to four bytes: \"é\" is 0xC3 0xA9 (11000011 10101001), the emoji 😀 is four bytes. That is why the same word produces different binary lengths depending on the characters — and why a line of Chinese text is roughly three times longer in bytes than the same meaning in English.",
            "Decoding only works correctly if the reader assumes the same encoding. Bytes that form valid UTF-8 are meaningless as EBCDIC or as Latin-1 — the \"mojibake\" phenomenon of reading text through the wrong encoding is the visible version of that assumption failing.",
          ],
        },
        {
          heading: "Why 8-bit groups and what the leading bits mean",
          paragraphs: [
            "Bytes are grouped in 8 because that has been the practical character unit since mainframe days, and UTF-8 is designed around it. Multi-byte sequences are self-describing: a byte starting with 110 begins a two-byte character, 1110 begins three, 11110 begins four, and continuation bytes always start with 10. That structure is why UTF-8 resynchronizes after transmission errors and why it became the web's dominant encoding.",
            "Reading a byte by hand: 01000001 splits as 0 (ASCII, one byte), then 1000001 = 65 = A. For 11000011, the 110 prefix announces a two-byte sequence and the next byte must start with 10. Once you see the pattern, the binary stops being noise.",
            "Spaces, newlines and even the grouping convention are display choices — the underlying data is the digit string. Some tools group by 8, some by character, some emit one continuous stream; all encode the same bytes.",
          ],
        },
        {
          heading: "Use cases and privacy",
          paragraphs: [
            "Practical uses: teaching and debugging encodings, checking exactly which bytes a regex or API will receive, generating binary puzzles, and verifying round trips — text → binary → text must reproduce the original byte for byte. Any mismatch means someone changed the encoding en route.",
            "For developers, this is the fastest way to answer \"is this character one byte or four?\" without opening a debugger. For students, converting your own name and seeing which letters stay one byte and which go wide makes UTF-8 concrete in a way no lecture does.",
            "The conversion runs locally in JavaScript as you type — nothing is uploaded, and it works offline. Text you paste stays on your machine, whether it is a snippet of source code or a draft message.",
          ],
        },
      ],
    },
    zh: {
      name: '文本转二进制',
      tagline: '把任意文本转成 8 位二进制字节并随时解回——UTF-8 安全,浏览器内即时完成。教学、谜题、CS 作业都好用。',
      intro: ['你输入的每个字符都会变成 UTF-8 字节序列,以 8 位一组的 0 和 1 展示。「Hi!」会变成 01001000 01101001 00100001——这正是计算机实际存储的比特,只是换成了可读可复制的形式。',
        '打开「解码」即可反向操作:粘贴以空格分隔的二进制组,还原出原始文本。emoji、中日韩文字等多字节字符也能正确还原,因为解码走的是浏览器原生的 UTF-8 TextDecoder。'],
      steps: ['输入或粘贴要编码的文本——二进制实时出现。',
        '打开「把二进制解码回文本」开关,把二进制组转回文字。',
        '一键复制结果。'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "二进制是字节流,不是“文字变 01”的魔法",
          paragraphs: [
            "本工具输出的不是被某种抽象过程“变成 01”的文字,而是计算机本来就在存储你文本的那串精确 UTF-8 字节,只是换成了二进制数字的写法。字母 “A” 是一个字节 01000001,即数字 65——从上世纪 60 年代起就代表 A 的 ASCII 码。没有翻译步骤,没有解释加工:屏幕上的位就是文件里的位。",
            "UTF-8 是关键细节。ASCII 字符(字母、数字、常见标点)各占一个字节,二进制很短;ASCII 之外的字符占两到四个字节:“é” 是 0xC3 0xA9(11000011 10101001),emoji 😀 是四个字节。这就是同一个词因字符不同而二进制长度不同的原因——也是同样含义的中文按字节算大约是英文三倍长的原因。",
            "解码只有在读方假定同一编码时才正确。构成合法 UTF-8 的字节,当作 EBCDIC 或 Latin-1 读就毫无意义——“乱码”现象就是这条假定失效的可见版本。",
          ],
        },
        {
          heading: "为什么按 8 位分组,开头几位是什么意思",
          paragraphs: [
            "字节按 8 位一组,因为自大型机时代起这就是实用的字符单位,UTF-8 也是围绕它设计的。多字节序列自带描述:110 开头的字节开启一个双字节字符,1110 开启三字节,11110 开启四字节,续接字节一律以 10 开头。正是这个结构让 UTF-8 在传输错误后能重新同步,并成为 Web 的主导编码。",
            "手工读一个字节:01000001 拆成 0(ASCII,单字节),然后 1000001 = 65 = A。看到 11000011,110 前缀宣告双字节序列,下一个字节必须以 10 开头。看出这个模式,二进制就不再是噪音。",
            "空格、换行甚至分组方式都是显示选择——底层数据就是那串数字。有的工具按 8 位分组,有的按字符分组,有的输出连续流;编码的都是同样的字节。",
          ],
        },
        {
          heading: "用途与隐私",
          paragraphs: [
            "实用场景:教学和调试编码、确认正则或 API 到底会收到哪些字节、生成二进制谜题、验证往返——文本 → 二进制 → 文本必须逐字节还原原文。任何不一致都说明途中有人改了编码。",
            "对开发者,这是回答“这个字符是 1 个字节还是 4 个字节”最快的方式,不用开调试器。对学生,把自己名字转一遍,看哪些字母保持单字节、哪些变宽,比任何讲座都更能让 UTF-8 变具体。",
            "转换由本地 JavaScript 在你输入时完成——不上传任何内容,离线可用。你粘贴的文本留在自己机器上,不管它是源代码片段还是草稿消息。",
          ],
        },
      ],
    },
    ja: {
      name: 'テキスト→バイナリ',
      tagline: '任意のテキストを 8 ビットのバイナリに変換、その逆も可能 — UTF-8 対応でブラウザ内即時処理。教育・パズル・CS の課題に。',
      intro: ['入力した各文字が UTF-8 のバイト列になり、8 桁の 0 と 1 のグループとして表示されます。「Hi!」は 01001000 01101001 00100001 に — コンピュータが実際に格納するビットそのものを読める形で。',
        'デコードを有効にすれば逆変換:空白区切りのバイナリグループを貼り付けると元のテキストが戻ります。絵文字や CJK 文字などのマルチバイト文字も、ブラウザ本来の UTF-8 TextDecoder を通すため正しく復元されます。'],
      steps: ['エンコードするテキストを入力 — バイナリがリアルタイムに現れます。',
        '「バイナリをテキストにデコード」を切り替えると、バイナリから元の文字へ戻せます。',
        'ワンクリックで結果をコピー。'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "バイナリはバイト列であり魔法ではない",
          paragraphs: [
            "このツールが出力するのは、抽象的な過程で「文字が 01 に変わった」ものではなく、コンピュータが既にあなたのテキストを保存している正確な UTF-8 バイト列を、2 進数字の書き方で並べたものです。字母「A」は 1 バイト、01000001、つまり数の 65——1960 年代から A を意味してきた ASCII コードです。翻訳の段階も解釈もなく、画面上のビットがファイルの中のビットです。",
            "UTF-8 が鍵の細部です。ASCII 文字(アルファベット、数字、よくある句読点)は各 1 バイトで、2 進表現は短い。ASCII の外の文字は 2〜4 バイト取ります。「é」は 0xC3 0xA9(11000011 10101001)、絵文字 😀 は 4 バイト。同じ単語でも文字次第で 2 進の長さが変わる理由であり、同じ意味の中国語テキストが英語の約 3 倍のバイト長になる理由でもあります。",
            "デコードは、読み手が同じエンコーディングを仮定したときにだけ正しく機能します。正当な UTF-8 を形成するバイト列は、EBCDIC や Latin-1 としては無意味です。誤ったエンコーディングで読む「文字化け」は、この仮定が破れた見える形です。",
          ],
        },
        {
          heading: "なぜ 8 ビット区切りか、先頭ビットの意味",
          paragraphs: [
            "バイトが 8 ビット単位なのは、メインフレーム時代から実用上の文字単位であり、UTF-8 がそれを軸に設計されているからです。マルチバイトシーケンスは自己記述的で、110 で始まるバイトは 2 バイト文字の開始、1110 は 3 バイト、11110 は 4 バイト、継続バイトは必ず 10 で始まります。この構造ゆえに UTF-8 は伝送エラーの後で再同期でき、ウェブの支配的なエンコーディングになりました。",
            "バイトを手で読む:01000001 は 0(ASCII、1 バイト)に切り分け、続く 1000001 = 65 = A。11000011 を見たら、110 の接頭辞が 2 バイトシーケンスを告げ、次のバイトは 10 で始まるはずです。このパターンが見えると、2 進はもうノイズではなくなります。",
            "空白、改行、区切り方の慣行は表示上の選択です——下のデータは数字列そのものです。8 ビット区切りのツールも、文字単位のツールも、連続ストリームを出すツールも、同じバイトを符号化しています。",
          ],
        },
        {
          heading: "用途とプライバシー",
          paragraphs: [
            "実用例:エンコーディングの学習とデバッグ、正規表現や API が正確にどのバイトを受け取るかの確認、2 進パズルの生成、往復検証——テキスト→バイナリ→テキストはバイト単位で再現されねばなりません。食い違いがあれば、途中で誰かがエンコーディングを変えた証拠です。",
            "開発者にとって、「この文字は 1 バイトか 4 バイトか」への最速の答えです。デバッガを開く必要がありません。学生にとって、自分の名前を変換してどの字母が 1 バイトのままかを見ることは、講義よりも UTF-8 を具体化します。",
            "変換は入力に合わせてローカルの JavaScript で行われます。アップロードは一切なく、オフラインで動きます。貼り付けたテキスト——ソースコードの断片でも下書きメッセージでも——はあなたのマシンにとどまります。",
          ],
        },
      ],
    },
    es: {
      name: 'Texto a binario',
      tagline: 'Convierte cualquier texto a bytes binarios de 8 bits y viceversa — compatible con UTF-8, instantáneo y 100% en tu navegador. Ideal para enseñar, rompecabezas y tareas de informática.',
      intro: ["Cada carácter que escribes se convierte en su secuencia de bytes UTF-8 mostrada en grupos de ocho 0s y 1s. '¡Hi!' se convierte en 01001000 01101001 00100001 — los bits exactos que almacena un ordenador, en una forma que puedes leer y copiar.",
        'Activa Decodificar para ir al revés: pega grupos binarios separados por espacios y recupera el texto original. Los caracteres multibyte como emojis y CJK se manejan bien porque la decodificación usa el TextDecoder UTF-8 del navegador.'],
      steps: ['Escribe o pega el texto a codificar — el binario aparece en vivo.',
        "Activa 'Decodificar binario a texto' para convertir grupos binarios de nuevo en palabras.",
        'Copia el resultado con un clic.'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "El binario son bytes, no magia",
          paragraphs: [
            "Lo que produce esta herramienta no es \"texto convertido a 01\" por un proceso abstracto — es la secuencia exacta de bytes UTF-8 que un ordenador ya almacena para tu texto, escrita como dígitos binarios. La letra \"A\" es un byte, 01000001, que es el número 65 — el código ASCII que significa A desde los años 60. No hay paso de traducción ni interpretación: los bits en pantalla son los bits del archivo.",
            "UTF-8 es el detalle clave. Los caracteres ASCII (letras, dígitos, puntuación común) ocupan un byte cada uno, así que su binario es corto. Los caracteres fuera de ASCII toman dos a cuatro bytes: \"é\" es 0xC3 0xA9 (11000011 10101001), el emoji 😀 son cuatro bytes. Por eso la misma palabra produce longitudes binarias distintas según los caracteres — y por eso una línea de texto chino mide en bytes unas tres veces más que el mismo significado en inglés.",
            "La decodificación solo funciona si quien lee asume la misma codificación. Bytes que forman UTF-8 válido no significan nada como EBCDIC o como Latin-1 — el \"mojibake\" de leer texto con la codificación equivocada es la versión visible de esa suposición fallando.",
          ],
        },
        {
          heading: "Por qué grupos de 8 bits y qué dicen los bits iniciales",
          paragraphs: [
            "Los bytes se agrupan en 8 porque esa ha sido la unidad práctica de carácter desde la era de los mainframes, y UTF-8 está diseñado a su alrededor. Las secuencias multi-byte se describen a sí mismas: un byte que empieza por 110 abre un carácter de dos bytes, 1110 abre tres, 11110 abre cuatro, y los bytes de continuación empiezan siempre por 10. Esa estructura es la razón de que UTF-8 resincronice tras errores de transmisión y de que se volviera la codificación dominante de la web.",
            "Leer un byte a mano: 01000001 se divide en 0 (ASCII, un byte), luego 1000001 = 65 = A. Ante 11000011, el prefijo 110 anuncia una secuencia de dos bytes y el byte siguiente debe empezar por 10. Una vez visto el patrón, el binario deja de ser ruido.",
            "Los espacios, saltos de línea y hasta la convención de agrupar son decisiones de presentación — el dato subyacente es la cadena de dígitos. Algunas herramientas agrupan por 8, otras por carácter, otras emiten un flujo continuo; todas codifican los mismos bytes.",
          ],
        },
        {
          heading: "Usos y privacidad",
          paragraphs: [
            "Usos prácticos: enseñar y depurar codificaciones, comprobar exactamente qué bytes recibirá una regex o una API, generar acertijos binarios y verificar el viaje de ida y vuelta — texto → binario → texto debe reproducir el original byte a byte. Cualquier descuadre significa que alguien cambió la codificación en el camino.",
            "Para desarrolladores, es la forma más rápida de responder \"¿este carácter es un byte o cuatro?\" sin abrir un depurador. Para estudiantes, convertir tu propio nombre y ver qué letras siguen en un byte y cuáles se ensanchan hace UTF-8 concreto como ninguna clase magistral.",
            "La conversión corre en JavaScript local mientras escribes — nada se sube y funciona sin conexión. El texto que pegas se queda en tu máquina, sea un fragmento de código fuente o un mensaje en borrador.",
          ],
        },
      ],
    },
    pt: {
      name: 'Texto para binário',
      tagline: 'Converta qualquer texto em bytes binários de 8 bits e vice-versa — compatível com UTF-8, instantâneo e 100% no seu navegador. Ótimo para ensinar, quebra-cabeças e tarefas de ciência da computação.',
      intro: ["Cada caractere digitado se torna sua sequência de bytes UTF-8 exibida em grupos de oito 0s e 1s. 'Hi!' vira 01001000 01101001 00100001 — os bits exatos que um computador armazena, numa forma que você pode ler e copiar.",
        'Ative Decodificar para ir ao contrário: cole grupos binários separados por espaço e recupere o texto original. Caracteres multibyte como emojis e CJK funcionam porque a decodificação usa o TextDecoder UTF-8 do navegador.'],
      steps: ['Digite ou cole o texto para codificar — o binário aparece em tempo real.',
        "Ative 'Decodificar binário para texto' para converter grupos binários de volta em palavras.",
        'Copie o resultado com um clique.'],
      faqs: [
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
        { q: 'q', a: 'a' },
      ],
      deepDive: [
        {
          heading: "Binário são bytes, não mágica",
          paragraphs: [
            "O que esta ferramenta produz não é \"texto virado em 01\" por um processo abstrato — é a sequência exata de bytes UTF-8 que um computador já armazena para o seu texto, escrita como dígitos binários. A letra \"A\" é um byte, 01000001, que é o número 65 — o código ASCII que significa A desde os anos 60. Não há etapa de tradução nem interpretação: os bits na tela são os bits do arquivo.",
            "UTF-8 é o detalhe-chave. Caracteres ASCII (letras, dígitos, pontuação comum) ocupam um byte cada, então seu binário é curto. Caracteres fora do ASCII tomam dois a quatro bytes: \"é\" é 0xC3 0xA9 (11000011 10101001), o emoji 😀 são quatro bytes. Por isso a mesma palavra produz comprimentos binários diferentes conforme os caracteres — e por isso uma linha de texto chinês mede, em bytes, cerca de três vezes mais que o mesmo significado em inglês.",
            "A decodificação só funciona se quem lê assume a mesma codificação. Bytes que formam UTF-8 válido não significam nada como EBCDIC ou Latin-1 — o \"mojibake\" de ler texto com a codificação errada é a versão visível dessa suposição falhando.",
          ],
        },
        {
          heading: "Por que grupos de 8 bits e o que dizem os bits iniciais",
          paragraphs: [
            "Os bytes se agrupam em 8 porque essa tem sido a unidade prática de caractere desde a era dos mainframes, e o UTF-8 é desenhado em torno disso. Sequências de vários bytes se descrevem sozinhas: um byte começando com 110 abre um caractere de dois bytes, 1110 abre três, 11110 abre quatro, e bytes de continuação sempre começam com 10. Essa estrutura é a razão de o UTF-8 ressincronizar após erros de transmissão e de ter virado a codificação dominante da web.",
            "Ler um byte à mão: 01000001 se divide em 0 (ASCII, um byte), depois 1000001 = 65 = A. Diante de 11000011, o prefixo 110 anuncia uma sequência de dois bytes e o byte seguinte deve começar com 10. Uma vez visto o padrão, o binário para de ser ruído.",
            "Espaços, quebras de linha e até a convenção de agrupamento são escolhas de exibição — o dado por baixo é a sequência de dígitos. Algumas ferramentas agrupam por 8, outras por caractere, outras emitem um fluxo contínuo; todas codificam os mesmos bytes.",
          ],
        },
        {
          heading: "Usos e privacidade",
          paragraphs: [
            "Usos práticos: ensinar e depurar codificações, verificar exatamente quais bytes uma regex ou API receberá, gerar enigmas binários e validar o vai-e-vem — texto → binário → texto deve reproduzir o original byte a byte. Qualquer divergência significa que alguém mudou a codificação no caminho.",
            "Para desenvolvedores, é a forma mais rápida de responder \"esse caractere é um byte ou quatro?\" sem abrir um depurador. Para estudantes, converter o próprio nome e ver quais letras seguem num byte e quais se alargam torna o UTF-8 concreto como nenhuma aula faz.",
            "A conversão roda localmente em JavaScript enquanto você digita — nada é enviado e funciona offline. O texto que você cola fica na sua máquina, seja um trecho de código-fonte ou uma mensagem em rascunho.",
          ],
        },
      ],
    },
  },
});
