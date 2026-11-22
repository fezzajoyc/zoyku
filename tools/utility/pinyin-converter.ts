import { UtilEnginePinyin } from "../_engines/util-engine-pinyin";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pinyin-converter",
  category: "utility",
  icon: "text",
  engine: { component: UtilEnginePinyin },
  related: ["chinese-text-converter", "lunar-calendar-converter", "character-frequency-counter", "chinese-id-validator"],
  copy: {
    en: {
      name: "Chinese Pinyin Converter",
      tagline:
        "Convert Chinese characters to Pinyin instantly — tone marks, tone numbers, plain or first-letter modes. Polyphonic characters resolved from context. Free, private, offline.",
      intro: [
        "Convert Chinese characters (汉字) to Pinyin with four output modes: tone marks (zhōng wén), tone numbers (zhong1), plain letters without tones (zhong), or first letters only (z w).",
        "The converter uses the pinyin-pro dictionary, which resolves polyphonic characters (多音字) from their context: 重庆 reads chóng qìng rather than zhòng qìng, and 银行 reads yín háng. This matters a lot for names, addresses and song lyrics.",
        "All conversion runs locally in your browser through pinyin-pro — no uploads, no tracking. Supports up to 50,000 characters per conversion.",
      ],
      steps: [
        "Choose the output mode from the mode buttons.",
        "Paste or type the Chinese text you want to convert.",
        "Click Convert — the Pinyin appears below, ready to copy.",
      ],
      faqs: [
        {
          q: "How are polyphonic characters (多音字) handled?",
          a: "The converter uses pinyin-pro, which resolves readings from context: 重庆 becomes chóng qìng (not zhòng qìng), and 行 in 银行 reads háng. Ambiguous single characters follow the most common reading.",
        },
        {
          q: "What is the difference between the four modes?",
          a: "Tone marks add diacritics (zhōng wén), tone numbers use digits (zhong1 wen2), plain removes tones entirely (zhong wen), and first letters output only the initial of each syllable (z w) — handy for abbreviations and username generation.",
        },
      ],
      deepDive: [
        {
          heading: "How polyphonic characters actually get resolved",
          paragraphs: [
            "Chinese has several hundred characters with two or more readings, and the correct one depends on the word, not the character. 重庆 is chóng qìng, but 重 on its own is usually zhòng; 银行 reads yín háng, but 行 alone is xíng. A dictionary keyed by single characters cannot solve this — the reading lives in the segmentation.",
            "pinyin-pro resolves readings with a word-segmentation dictionary: the input is matched against tens of thousands of multi-character entries first, and only unmatched runs fall back to the most common single-character reading. This is why 重庆大学, a name that defeats naive converters, comes out right here — and why pasting whole sentences beats pasting character-by-character.",
            "The remaining ambiguity is genuine: isolated names like 单 as a surname (Shàn, not Dān) or historical place names can still surprise. For legal or publication use, spot-check the syllables that matter; for usernames, lyrics and study notes the context resolution is reliable enough to trust.",
          ],
        },
        {
          heading: "Choosing the right output mode",
          paragraphs: [
            "Tone marks (zhōng wén) are the standard for textbooks, dictionaries and any material where a learner must reproduce the exact pronunciation; they use Unicode combining diacritics, so they sort and search slightly differently from plain letters. Tone numbers (zhong1) survive systems with poor Unicode support — older IME training data, some database collations and plain-text protocols prefer them.",
            "Plain letters (zhong) suit full-text search and URL slugs, where diacritics break matching. First letters (z w) are the Chinese equivalent of acronyms: system usernames, product codes and the shorthand Chinese speakers type into IMEs. For usernames specifically, first-letter mode on a full name plus a number is the pattern most platforms accept first.",
            "One convention worth knowing: standard pinyin places the tone mark on the main vowel of the syllable (a, o, e take it directly; iu, ui, i-endings follow their own rules). This page follows that convention exactly, which matters when the output feeds into teaching materials that will be graded.",
          ],
        },
      ],
    },
    zh: {
      name: "汉字转拼音",
      tagline:
        "汉字一键转拼音——带声调、无声调、声调数字、首字母四种模式,多音字按语境智能校正(重庆→chóng qìng)。免费、即时、离线可用。",
      intro: [
        "汉字转拼音工具,提供四种输出模式:带声调(zhōng wén)、声调数字(zhong1)、无声调(zhong)、首字母(z w),满足注音、取名、建账号等不同场景。",
        "基于 pinyin-pro 词典,多音字按词组语境自动校正:重庆读 chóng qìng 而非 zhòng qìng,银行的行读 háng——这对姓名、地址、歌词等场景至关重要。",
        "转换全部由本机的 pinyin-pro 库完成——无需注册、不上传,文本不会离开浏览器。单次最多支持 50,000 个字符。",
      ],
      steps: [
        "从模式按钮选择输出格式。",
        "粘贴或输入要转换的汉字。",
        "点击转换——拼音结果显示在下方,一键复制。",
      ],
      faqs: [
        {
          q: "多音字怎么处理?",
          a: "工具基于 pinyin-pro 词典按语境判定读音:重庆读 chóng qìng(而非 zhòng qìng),银行中的行读 háng。孤立的单字采用最常见读音。",
        },
        {
          q: "四种模式有什么区别?",
          a: "带声调模式输出声调符号(zhōng wén),声调数字模式用数字标调(zhong1 wen2),无声调模式输出纯字母(zhong wen),首字母模式只输出每个字的声母(z w)——适合缩写和用户名生成。",
        },
      ],
      deepDive: [
        {
          heading: "多音字到底是怎么被判定读音的",
          paragraphs: [
            "汉语有几百个多音字,正确读音取决于词而不是字:重庆的 重 读 chóng,单字重通常读 zhòng;银行的行读 háng,单字行读 xíng。只按单字建索引的词典解决不了这个问题——读音藏在分词里。",
            "pinyin-pro 的解法是词组分词词典:输入先与数万条多字词条匹配,匹配不上的部分才回退到单字最常见读音。这就是重庆大学这类难倒朴素转换器的词组在这里能出对的原因——也是为什么整句粘贴比逐字粘贴效果更好。",
            "剩下的歧义是真实存在的:孤立场景如单作姓氏(Shàn 而非 Dān)、古地名仍可能出乎意料。法律与出版用途请抽查关键字音;用户名、歌词、学习笔记场景的语境判定已足够可信。",
          ],
        },
        {
          heading: "四种模式各适合什么场景",
          paragraphs: [
            "带声调(zhōng wén)是教材、词典与一切要求学习者复现精确发音的场合的标准;声调符号是 Unicode 组合字符,排序与搜索行为与纯字母略有差异。声调数字(zhong1)适合 Unicode 支持差的系统——老 IME 训练语料、部分数据库排序规则与纯文本协议更接受它。",
            "无声调(zhong)适合全文搜索与 URL slug,声调符号会破坏匹配。首字母(z w)是中文语境的缩写等价物:系统用户名、产品编号、以及中文使用者输入法里敲的简拼。用户名场景,全名首字母加数字是最容易被各平台接受的模式。",
            "一个值得知道的规范:标准拼音把声调符号标在音节的主元音上(a、o、e 直接标;iu、ui、i 结尾有自己的规则)。本页严格遵循该规范——输出若要进入会被打分的教材,这一点很重要。",
          ],
        },
      ],
    },
    ja: {
      name: "中国語ピンイン変換",
      tagline:
        "中国語の漢字をピンインへ即時変換 — 声調記号・声調数字・声調なし・頭文字の 4 モード。多音字は文脈から自動判定。無料・プライベート・オフライン。",
      intro: [
        "漢字をピンインに変換するツール。4 つの出力モードを提供:声調記号(zhōng wén)、声調数字(zhong1)、声調なし(zhong)、頭文字(z w)。",
        "pinyin-pro 辞書を使用し、多音字を文脈から判定します:重慶は chóng qìng(zhòng qìng ではなく)、銀行の行は háng と読みます。名前や住所、歌詞の処理に重要です。",
        "変換はすべてブラウザ内の pinyin-pro ライブラリで行われます — アカウント不要、アップロードなし。1 回あたり最大 50,000 文字。",
      ],
      steps: [
        "モードボタンから出力形式を選択します。",
        "変換したい中国語テキストを入力します。",
        "変換ボタンをクリック — ピンインが下に表示され、コピーできます。",
      ],
      faqs: [
        {
          q: "多音字はどう処理されますか?",
          a: "pinyin-pro 辞書が文脈から読みを判定します:重慶は chóng qìng(zhòng qìng ではなく)、銀行の行は háng です。孤立した一字は最も一般的な読みになります。",
        },
        {
          q: "4 つのモードの違いは?",
          a: "声調記号はダイアクリティカルマーク付き(zhōng wén)、声調数字は数字表記(zhong1 wen2)、声調なしは字母のみ(zhong wen)、頭文字は各音節の頭文字のみ(z w)— 略語やユーザー名生成に便利です。",
        },
      ],
      deepDive: [
        {
          heading: "多音字の読みはどう判定されるか",
          paragraphs: [
            "中国語には二つ以上の読みを持つ字が数百あり、正しい読みは字ではなく語で決まります:重慶の 重 は chóng、単独の 重 は通常 zhòng;銀行の 行 は háng、単独の 行 は xíng。一文字単位の辞書では解決できず、読みは分節の中にあります。",
            "pinyin-pro は語句分節辞書で読みを解決します:入力はまず数万件の多字語エントリと照合され、一致しない部分だけが一文字の最頻読みにフォールバックします。素朴な変換器が誤る 重慶大学 がここでは正しく出る理由であり、一文字ずつより文全体を貼る方が良い理由でもあります。",
            "残る曖昧さは本物です:姓としての 単(Shàn で Dān ではない)や古い地名は意外な読みになることがあります。法務・出版用途は重要な音節を目視確認を。ユーザー名・歌詞・学習ノートなら文脈判定は信頼に足ります。",
          ],
        },
        {
          heading: "四つのモードの使い分け",
          paragraphs: [
            "声調記号(zhōng wén)は教科書・辞書・正確な発音を再現させる教材の標準です。声調記号は Unicode 結合文字のため、プレーン文字と比べ並べ替え・検索の挙動が多少異なります。声調数字(zhong1)は Unicode 対応が弱いシステムに向きます — 古い IME 学習データ、一部のデータベース照合、プレーンテキスト 프로토콜。",
            "声調なし(zhong)は全文検索や URL スラッグ向けで、記号があると一致しません。頭文字(z w)は中国語の頭字語相当:システムのユーザー名、製品コード、中国語話者が IME で打つ略入力。ユーザー名はフルネームの頭文字+数字が多くのプラットフォームで最初に受け入れられるパターンです。",
            "知っておきたい規約:標準ピンインは音節の主母音に声調記号を付けます(a・o・e は直接、iu・ui・i 語尾には独自の規則)。本ページはこの規約に厳密に従います — 採点される教材に出力を流す場合は重要です。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de Pinyin chino",
      tagline:
        "Convierte caracteres chinos a Pinyin al instante — modos con tonos, números de tono, sin tonos o iniciales. Caracteres polifónicos resueltos por contexto. Gratis, privado, sin conexión.",
      intro: [
        "Convierte caracteres chinos (汉字) a Pinyin con cuatro modos de salida: tonos marcados (zhōng wén), números de tono (zhong1), letras sin tonos (zhong) o solo iniciales (z w).",
        "El conversor usa el diccionario pinyin-pro, que resuelve los caracteres polifónicos (多音字) según su contexto: 重庆 se lee chóng qìng y no zhòng qìng, y 行 en 银行 se lee háng. Esto es clave para nombres, direcciones y letras de canciones.",
        "Todo funciona localmente en tu navegador con pinyin-pro — sin subidas, sin rastreo. Soporta hasta 50,000 caracteres por conversión.",
      ],
      steps: [
        "Elige el modo de salida en los botones de modo.",
        "Pega o escribe el texto chino que quieres convertir.",
        "Haz clic en Convertir — el Pinyin aparece abajo, listo para copiar.",
      ],
      faqs: [
        {
          q: "¿Cómo se manejan los caracteres polifónicos (多音字)?",
          a: "El conversor usa pinyin-pro, que resuelve las lecturas según el contexto: 重庆 se convierte en chóng qìng (no zhòng qìng), y 行 en 银行 se lee háng. Los caracteres aislados usan la lectura más común.",
        },
        {
          q: "¿Cuál es la diferencia entre los cuatro modos?",
          a: "Los tonos añaden diacríticos (zhōng wén), los números de tono usan dígitos (zhong1 wen2), sin tonos elimina las marcas (zhong wen), y las iniciales muestran solo la inicial de cada sílaba (z w) — útil para abreviaturas y nombres de usuario.",
        },
      ],
      deepDive: [
        {
          heading: "Cómo se resuelven realmente los caracteres polifónicos",
          paragraphs: [
            "El chino tiene varios cientos de caracteres con dos o más lecturas, y la correcta depende de la palabra, no del carácter. 重庆 es chóng qìng, pero 重 aislado suele ser zhòng; 银行 se lee yín háng, pero 行 sola es xíng. Un diccionario indexado por caracteres individuales no puede resolverlo — la lectura vive en la segmentación.",
            "pinyin-pro resuelve las lecturas con un diccionario de segmentación por palabras: la entrada se compara primero con decenas de miles de entradas multi-carácter, y solo los tramos sin coincidencia caen en la lectura más común del carácter aislado. Por eso 重庆大学, un nombre que derrota a convertidores ingenuos, sale bien aquí — y por qué pegar frases completas funciona mejor que pegar carácter por carácter.",
            "La ambigüedad restante es real: nombres aislados como 单 como apellido (Shàn, no Dān) o topónimos históricos todavía pueden sorprender. Para uso legal o editorial, revise a mano las sílabas que importen; para nombres de usuario, letras de canciones y notas de estudio la resolución por contexto es suficientemente fiable.",
          ],
        },
        {
          heading: "Elegir el modo de salida correcto",
          paragraphs: [
            "Los tonos marcados (zhōng wén) son el estándar para libros de texto, diccionarios y todo material donde el estudiante debe reproducir la pronunciación exacta; usan diacríticos combinantes de Unicode, por lo que ordenan y buscan de forma ligeramente distinta a las letras planas. Los números de tono (zhong1) sobreviven en sistemas con soporte Unicode pobre — datos de entrenamiento de IME antiguos, algunas intercalaciones de bases de datos y protocolos de texto plano.",
            "Las letras sin tonos (zhong) sirven para búsqueda de texto completo y slugs de URL, donde los diacríticos rompen la coincidencia. Las iniciales (z w) son el equivalente chino de los acrónimos: nombres de usuario de sistemas, códigos de producto y la abreviación que los hablantes teclean en el IME. Para nombres de usuario, el patrón de iniciales del nombre completo más un número es el que más plataformas aceptan primero.",
            "Una convención que conviene conocer: el pinyin estándar coloca la marca de tono en la vocal principal de la sílaba (a, o, e la llevan directamente; iu, ui y terminaciones en i siguen sus propias reglas). Esta página sigue esa convención exactamente, lo que importa cuando la salida alimenta materiales didácticos que serán evaluados.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de Pinyin chinês",
      tagline:
        "Converta caracteres chineses para Pinyin instantaneamente — modos com tons, números de tom, sem tons ou iniciais. Caracteres polifônicos resolvidos pelo contexto. Grátis, privado, offline.",
      intro: [
        "Converta caracteres chineses (汉字) para Pinyin com quatro modos de saída: tons marcados (zhōng wén), números de tom (zhong1), letras sem tons (zhong) ou apenas iniciais (z w).",
        "O conversor usa o dicionário pinyin-pro, que resolve os caracteres polifônicos (多音字) pelo contexto: 重庆 lê-se chóng qìng e não zhòng qìng, e 行 em 银行 lê-se háng. Isso é essencial para nomes, endereços e letras de músicas.",
        "Tudo funciona localmente no seu navegador com pinyin-pro — sem uploads, sem rastreamento. Suporta até 50.000 caracteres por conversão.",
      ],
      steps: [
        "Escolha o modo de saída nos botões de modo.",
        "Cole ou digite o texto chinês que deseja converter.",
        "Clique em Converter — o Pinyin aparece abaixo, pronto para copiar.",
      ],
      faqs: [
        {
          q: "Como os caracteres polifônicos (多音字) são tratados?",
          a: "O conversor usa pinyin-pro, que resolve as leituras pelo contexto: 重庆 torna-se chóng qìng (não zhòng qìng), e 行 em 银行 lê-se háng. Caracteres isolados usam a leitura mais comum.",
        },
        {
          q: "Qual é a diferença entre os quatro modos?",
          a: "Tons adicionam diacríticos (zhōng wén), números de tom usam dígitos (zhong1 wen2), sem tons remove as marcas (zhong wen), e iniciais mostram apenas a inicial de cada sílaba (z w) — útil para abreviações e nomes de usuário.",
        },
      ],
      deepDive: [
        {
          heading: "Como os caracteres polifônicos são realmente resolvidos",
          paragraphs: [
            "O chinês tem alguns centenas de caracteres com duas ou mais leituras, e a correta depende da palavra, não do caractere. 重庆 é chóng qìng, mas 重 sozinho é geralmente zhòng; 银行 lê-se yín háng, mas 行 sozinha é xíng. Um dicionário indexado por caracteres individuais não resolve isso — a leitura vive na segmentação.",
            "O pinyin-pro resolve as leituras com um dicionário de segmentação por palavras: a entrada é comparada primeiro com dezenas de milhares de entradas multi-caractere, e apenas os trechos sem correspondência caem na leitura mais comum do caractere isolado. Por isso 重庆大学, um nome que derrota conversores ingênuos, sai certo aqui — e por que colar frases inteiras funciona melhor que colar caractere por caractere.",
            "A ambiguidade restante é real: nomes isolados como 单 como sobrenome (Shàn, não Dān) ou topônimos históricos ainda podem surpreender. Para uso jurídico ou editorial, revise à mão as sílabas que importam; para nomes de usuário, letras de músicas e notas de estudo, a resolução por contexto é confiável o bastante.",
          ],
        },
        {
          heading: "Escolhendo o modo de saída certo",
          paragraphs: [
            "Tons marcados (zhōng wén) são o padrão para livros didáticos, dicionários e qualquer material em que o aprendiz deva reproduzir a pronúncia exata; usam diacríticos combináveis Unicode, então ordenam e buscam de forma levemente diferente das letras puras. Números de tom (zhong1) sobrevivem em sistemas com suporte Unicode ruim — dados de treinamento de IME antigos, algumas ordenações de banco de dados e protocolos de texto puro preferem-nos.",
            "Letras sem tons (zhong) servem para busca de texto completo e slugs de URL, onde diacríticos quebram a correspondência. Iniciais (z w) são o equivalente chinês dos acrônimos: nomes de usuário de sistemas, códigos de produto e a abreviação que falantes chineses digitam no IME. Para nomes de usuário, iniciais do nome completo mais um número é o padrão que mais plataformas aceitam primeiro.",
            "Uma convenção que vale conhecer: o pinyin padrão coloca a marca de tom na vogal principal da sílaba (a, o, e a recebem diretamente; iu, ui e terminações em i têm regras próprias). Esta página segue exatamente essa convenção — o que importa quando a saída alimenta materiais didáticos que serão avaliados.",
          ],
        },
      ],
    },
  },
});
