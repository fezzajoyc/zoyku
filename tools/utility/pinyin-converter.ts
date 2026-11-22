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
    },
  },
});
