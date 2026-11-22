import { UtilEngineChineseText } from "../_engines/util-engine-chinese-text";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "chinese-text-converter",
  category: "utility",
  icon: "swap",
  engine: { component: UtilEngineChineseText },
  related: ["lunar-calendar-converter", "character-frequency-counter", "chinese-id-validator", "text-sequence-generator"],
  copy: {
    en: {
      name: "Chinese Text Converter",
      tagline:
        "Convert between Simplified and Traditional Chinese instantly — Standard, Taiwan and Hong Kong variants supported. Free, private, offline-capable.",
      intro: [
        "Convert Chinese text between Simplified and Traditional scripts with OpenCC-quality mappings. Choose from four directions: Simplified → Traditional (standard), Simplified → Traditional Taiwan, Simplified → Traditional Hong Kong, or Traditional → Simplified.",
        "The conversion uses the OpenCC dictionaries, which handle not just character-level mapping but also vocabulary differences (e.g. 软件 → 軟體 in Taiwan vs 軟件 in Hong Kong). This is the same engine used by professional Chinese localisation workflows.",
        "All conversion runs locally in your browser through the opencc-js library — no uploads, no tracking. Supports up to 100,000 characters per conversion.",
      ],
      steps: [
        "Choose the conversion direction from the variant buttons.",
        "Paste or type the Chinese text you want to convert.",
        "Click Convert — the result appears below, ready to copy.",
      ],
      faqs: [
        {
          q: "What is the difference between Standard Traditional, Taiwan and Hong Kong variants?",
          a: "All three convert Simplified to Traditional Chinese characters, but Taiwan and Hong Kong variants also adapt vocabulary: 软件 becomes 軟體 in Taiwan and 軟件 in Hong Kong, reflecting regional usage differences.",
        },
        {
          q: "Is there a character limit?",
          a: "Yes, up to 100,000 characters per conversion. This covers most documents; for longer text, split it into chunks.",
        },
      ],
      deepDive: [
        {
          heading: "Character-level one-to-many is why OpenCC uses phrase dictionaries",
          paragraphs: [
            "Simplifying is lossy at the character level: 乾 simplifies to 干, but 干燥 (dry) was originally 乾燥 while 干活 (work) was always 干; 於 simplifies to 于, yet 於 is kept in classical citations; 后 and 後 both collapsed into 后. Mapping one simplified character back to traditional is a one-to-many problem that no character-level table can solve — “re-converting” simplified text to traditional gives you a plausible but frequently wrong result.",
            "OpenCC's answer is phrase-level dictionaries: 词组 entries like 乾燥、制度、皇后 are mapped as whole words before single characters apply. That is why the Taiwan and Hong Kong variants matter as much as the algorithm: 软件 becomes 軟體 in Taiwan (software → the Taiwanese term) but stays 軟件 in Hong Kong; 网络 is 網路 in Taiwan and 網絡 in Hong Kong. The vocabulary tables encode decades of regional usage — they are the difference between “looks traditional” and “reads native”.",
            "Practical rule: convert simplified→traditional with a chosen regional variant for publishing; treat traditional→simplified as lossy preview only. If a document must return to traditional, keep the original — no converter can restore which 乾 was meant.",
          ],
        },
        {
          heading: "Choosing the right variant, and what passes for correct",
          paragraphs: [
            "Taiwan (正體) follows Taiwan's Ministry of Education standards: character forms differ from Hong Kong's in spots (裏/裡 preferences, 着/著 usage) and the vocabulary shifts are systematic — 内存→記憶體, 视频不存在 as 影片 not 視頻, 信息→資訊. Hong Kong (繁體) keeps shared vocabulary closer to mainland usage while using HK-specific glyph standards. The generic s2t direction is the safe default when no region applies: standard OpenCC phrase mapping without regional vocabulary.",
            "Documents that mix quoted mainland text with local prose are the classic pitfall: converting the whole document converts the quotes too. Professional localization keeps quotes in their source variant — convert paragraph runs selectively rather than whole files when quotations matter.",
            "Verification advice: after conversion, spot-check the ten most common regional vocabulary pairs for your variant, and always proofread proper nouns — person and place names frequently contain characters whose regional preferred form differs from what any dictionary table produces.",
          ],
        },
      ],
    },
    zh: {
      name: "简繁中文转换",
      tagline:
        "在浏览器内完成简体与繁体中文的双向转换——支持标准繁体、台湾正体与香港繁体。免费、即时、离线可用。",
      intro: [
        "简体与繁体中文的双向转换,使用 OpenCC 词典质量的专业映射。四种方向:简→繁(标准)、简→繁(台湾正体)、简→繁(香港繁体)、繁→简。",
        "OpenCC 不仅做字符级映射,还处理词汇差异(如 软件 在台湾正体中变为 軟體,在香港繁体中保持 軟件)——与专业中文本地化工作流使用的引擎一致。",
        "转换全部由本机的 opencc-js 库完成——无需注册、不上传,文本不会离开浏览器。单次最多支持 100,000 个字符。",
      ],
      steps: [
        "从变体按钮选择转换方向。",
        "粘贴或输入要转换的中文文本。",
        "点击转换——结果显示在下方,一键复制。",
      ],
      faqs: [
        {
          q: "标准繁体、台湾正体与香港繁体有什么区别?",
          a: "三者都将简体字转为繁体字,但台湾与香港变体还会适配词汇:软件在台湾正体中变为 軟體,在香港繁体中保持 軟件,反映地区用词差异。",
        },
        {
          q: "有字数限制吗?",
          a: "单次最多 100,000 个字符,覆盖绝大多数文档。更长的文本可以分段处理。",
        },
      ],
      deepDive: [
        {
          heading: "字符级一对多,就是 OpenCC 用词组词典的原因",
          paragraphs: [
            "简化的本质是有损的:乾 简化为 干,但 干燥 原本是 乾燥、干活 本来就是 干;於 简化为 于,但古文引用里 於 保留;后 与 後 合并成 后。把简体字映射回繁体是一对多问题,任何字符级表格都解不了——把简体文本「反向转换」回繁体,得到的是看起来对、实际经常错的结果。",
            "OpenCC 的答案是词组级词典:乾燥、制度、皇后 这类词组条目先整体映射,单字映射只处理剩余部分。这就是台湾与香港变体跟算法本身同样重要的原因:软件 在台湾正体是 軟體、在香港保持 軟件;网络 是 網路 还是 網絡。词汇表编码了几十年的地区用法——它是「看起来是繁体」与「读起来是本地人」之间的差距。",
            "实务规则:出版用途选好地区变体后做 简→繁;繁→简当作有损预览。文档需要回到繁体的场景请保留原件——没有任何转换器能还原那个 乾 本来是哪个。",
          ],
        },
        {
          heading: "选对变体,以及什么才算「对」",
          paragraphs: [
            "台湾(正體)遵循教育部标准:字形与香港有零星差异(裏/裡 的偏好、着/著 的用法),词汇差异是系统性的——内存→記憶體、视频→影片、信息→資訊。香港(繁體)词汇更接近大陆用法,同时用香港字形标准。通用 s2t 方向是没有地区需求时的安全默认:标准 OpenCC 词组映射、不带地区词汇。",
            "经典陷阱:引用大陆原文的段落混在本地行文里——整篇转换会连引用一起转。专业本地化会保留引用的原变体:引用重要时按段落选择性转换,而不是整个文件一次转。",
            "校对建议:转换后抽查目标变体最常用的十个地区词汇对,并且永远校对专有名词——人名地名常含与任何词典表输出不同的地区首选字形。",
          ],
        },
      ],
    },
    ja: {
      name: "中国語テキスト変換",
      tagline:
        "ブラウザ内で簡体字と繁体字の中国語テキストを双方向変換 — 標準・台湾・香港バリアント対応。無料・即時・オフライン。",
      intro: [
        "簡体字と繁体字の中国語テキストの双方向変換。OpenCC 品質のマッピングを使用:簡→繁(標準)、簡→繁(台湾)、簡→繁(香港)、繁→簡 の 4 方向。",
        "OpenCC は文字レベルのマッピングだけでなく、語彙の違いも処理します(例:软件 は台湾では 軟體、香港では 軟件)。専門的な中国語ローカリゼーションと同じエンジンです。",
        "変換はすべてブラウザ内の opencc-js ライブラリで行われます — アカウント不要、アップロードなし。1 回あたり最大 100,000 文字。",
      ],
      steps: [
        "バリアントボタンから変換方向を選択します。",
        "変換したい中国語テキストを入力します。",
        "変換ボタンをクリック — 結果が下に表示され、コピーできます。",
      ],
      faqs: [
        {
          q: "標準繁体字、台湾、香港のバリアントの違いは?",
          a: "すべて簡体字を繁体字に変換しますが、台湾と香港のバリアントは語彙も調整します:软件 は台湾で 軟體、香港で 軟件 になり、地域の使用慣習を反映します。",
        },
        {
          q: "文字数制限はありますか?",
          a: "1 回あたり最大 100,000 文字です。ほとんどのドキュメントをカバーします。長いテキストは分割して処理してください。",
        },
      ],
      deepDive: [
        {
          heading: "文字レベルの一対多 — OpenCC が語句辞書を使う理由",
          paragraphs: [
            "簡略化は文字レベルで情報を失います:乾 は 干 に簡略化されますが、乾燥 は元々 乾燥、干活 はもともと 干;於 は 于 になりますが、古典引用の 於 は保持。後 と 后 は 后 に統合。簡体字を繁体字へ逆変換するのは一対多問題で、文字レベルのテーブルでは解けません — 簡体字テキストの「逆変換」はもっともらしいが頻繁に間違った結果になります。",
            "OpenCC の答えは語句レベルの辞書です:乾燥・制度・皇后 のような語句エントリが全体として先にマップされ、単字マッピングは残りに適用されます。台湾と香港のバリアントがアルゴリズム自体と同じくらい重要な理由:ソフトウェア は台湾では 軟體、香港では 軟件;ネットワーク は台湾で 網路、香港で 網絡。語彙テーブルは数十年の地域用法をコード化したもので、「繁体字に見える」と「ネイティブに読める」の差です。",
            "実務規則:出版用途は地域バリアントを選んで 簡→繁。繁→簡 は損失のあるプレビューとして扱います。繁体に戻る必要がある文書は原本を保持 — どの変換器も 乾 の本来の字は復元できません。",
          ],
        },
        {
          heading: "正しいバリアントの選び方、そして「正しい」の基準",
          paragraphs: [
            "台湾(正體)は教育部の標準に従います:字形は香港と部分的に違い(裏/裡 の選好、着/著 の用法)、語彙のずれは体系的です — 内存→記憶體、视频→影片、信息→資訊。香港(繁體)は語彙を大陸用法に近く保ちつつ、HK 固有の字形標準を使います。汎用 s2t は地域要件がないときの安全なデフォルト:地域語彙なしの標準 OpenCC 語句マッピングです。",
            "古典的な罠:大陸の引用文が地元の文章に混在する文書 — 全体変換は引用まで変えます。プロのローカリゼーションは引用を元のバリアントに保ちます:引用が重要なら、ファイル全体ではなく段落単位で選択的に変換してください。",
            "検証のアドバイス:変換後、ターゲットのバリアントで最も一般的な十の地域語彙ペアをスポットチェックし、固有名詞は必ず校正を — 人名・地名には、どの辞書テーブルの出力とも異なる地域の好ましい字形が含まれることがよくあります。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de texto chino",
      tagline:
        "Convierte entre chino simplificado y tradicional al instante — variantes estándar, Taiwán y Hong Kong. Gratis, privado, sin conexión.",
      intro: [
        "Conversión bidireccional entre chino simplificado y tradicional con mapeos de calidad OpenCC. Cuatro direcciones: Simplificado → Tradicional (estándar), Simplificado → Tradicional Taiwan, Simplificado → Tradicional Hong Kong, o Tradicional → Simplificado.",
        "Usa los diccionarios OpenCC, que manejan no solo el mapeo de caracteres sino también diferencias de vocabulario (软件 → 軟體 en Taiwán vs 軟件 en Hong Kong). Es el mismo motor que usan los flujos de localización chinos profesionales.",
        "Todo funciona localmente en tu navegador con opencc-js — sin cuentas, sin subidas. Soporta hasta 100,000 caracteres por conversión.",
      ],
      steps: [
        "Elige la dirección de conversión en los botones de variante.",
        "Pega o escribe el texto chino que quieres convertir.",
        "Haz clic en Convertir — el resultado aparece abajo, listo para copiar.",
      ],
      faqs: [
        {
          q: "¿Cuál es la diferencia entre los variantes estándar, Taiwán y Hong Kong?",
          a: "Los tres convierten caracteres simplificados a tradicionales, pero Taiwán y Hong Kong también adaptan vocabulario: 软件 se convierte en 軟體 en Taiwán y 軟件 en Hong Kong.",
        },
        {
          q: "¿Hay límite de caracteres?",
          a: "Sí, hasta 100,000 caracteres por conversión. Para textos más largos, divídelos en partes.",
        },
      ],
      deepDive: [
        {
          heading: "El uno-a-muchos a nivel de carácter es la razón del diccionario de frases de OpenCC",
          paragraphs: [
            "Simplificar es con pérdida a nivel de carácter: 乾 se simplifica a 干, pero 干燥 (seco) era originalmente 乾燥 mientras 干活 (trabajar) siempre fue 干; 於 se simplifica a 于, aunque en citas clásicas se conserva 於; 后 y 後 colapsaron en 后. Mapear un carácter simplificado de vuelta al tradicional es un problema uno-a-muchos que ninguna tabla a nivel de carácter puede resolver — «reconvertir» texto simplificado a tradicional da un resultado plausible pero frecuentemente erróneo.",
            "La respuesta de OpenCC son los diccionarios a nivel de frase: entradas como 乾燥、制度、皇后 se mapean como palabras enteras antes de aplicar los caracteres individuales. Por eso las variantes de Taiwán y Hong Kong importan tanto como el algoritmo: 软件 se convierte en 軟體 en Taiwán pero permanece 軟件 en Hong Kong; 网络 es 網路 en Taiwán y 網絡 en Hong Kong. Las tablas de vocabulario codifican décadas de uso regional — son la diferencia entre «parece tradicional» y «lee como nativo».",
            "Regla práctica: convierta simplificado→tradicional con una variante regional elegida para publicar; trate tradicional→simplificado como una vista previa con pérdida. Si el documento debe volver a tradicional, conserve el original — ningún convertidor puede restaurar cuál 乾 se pretendía.",
          ],
        },
        {
          heading: "Elegir la variante correcta, y qué cuenta como correcto",
          paragraphs: [
            "Taiwán (正體) sigue los estándares del Ministerio de Educación taiwanés: las formas de caracteres difieren de Hong Kong en puntos concretos (preferencias 裏/裡, uso de 着/著) y los desplazamientos de vocabulario son sistemáticos — 内存→記憶體, 视频 se expresa como 影片 y no 視頻, 信息→資訊. Hong Kong (繁體) mantiene el vocabulario más cerca del uso continental mientras usa estándares de glifos propios. La dirección genérica s2t es el valor por defecto seguro cuando no aplica ninguna región: mapeo de frases estándar de OpenCC sin vocabulario regional.",
            "El fallo clásico: documentos que mezclan citas del texto continental con prosa local — convertir el documento completo convierte las citas también. La localización profesional mantiene las citas en su variante de origen — convierta por párrafos selectivamente en lugar de archivos completos cuando las citas importen.",
            "Consejo de verificación: tras la conversión, revise a mano los diez pares de vocabulario regional más comunes de su variante, y siempre revise los nombres propios — los nombres de personas y lugares frecuentemente contienen caracteres cuya forma preferida regional difiere de lo que cualquier tabla de diccionario produce.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de texto chinês",
      tagline:
        "Converta entre chinês simplificado e tradicional instantaneamente — variantes padrão, Taiwan e Hong Kong. Grátis, privado, offline.",
      intro: [
        "Conversão bidirecional entre chinês simplificado e tradicional com mapeamentos de qualidade OpenCC. Quatro direções: Simplificado → Tradicional (padrão), Simplificado → Tradicional Taiwan, Simplificado → Tradicional Hong Kong, ou Tradicional → Simplificado.",
        "Usa os dicionários OpenCC, que tratam não só o mapeamento de caracteres mas também diferenças de vocabulário (软件 → 軟體 em Taiwan vs 軟件 em Hong Kong). É o mesmo motor usado por fluxos de localização chineses profissionais.",
        "Tudo funciona localmente no seu navegador com opencc-js — sem contas, sem uploads. Suporta até 100,000 caracteres por conversão.",
      ],
      steps: [
        "Escolha a direção de conversão nos botões de variante.",
        "Cole ou digite o texto chinês que deseja converter.",
        "Clique em Converter — o resultado aparece abaixo, pronto para copiar.",
      ],
      faqs: [
        {
          q: "Qual é a diferença entre os variantes padrão, Taiwan e Hong Kong?",
          a: "Os três convertem caracteres simplificados para tradicionais, mas Taiwan e Hong Kong também adaptam vocabulário: 软件 torna-se 軟體 em Taiwan e 軟件 em Hong Kong.",
        },
        {
          q: "Existe limite de caracteres?",
          a: "Sim, até 100,000 caracteres por conversão. Para textos mais longos, divida em partes.",
        },
      ],
      deepDive: [
        {
          heading: "O um-para-muitos no nível de caractere é a razão do dicionário de frases do OpenCC",
          paragraphs: [
            "Simplificar é com perda no nível de caractere: 乾 simplifica para 干, mas 干燥 (seco) era originalmente 乾燥 enquanto 干活 (trabalhar) sempre foi 干; 於 simplifica para 于, mas em citações clássicas 於 se mantém; 后 e 後 colapsaram em 后. Mapear um caractere simplificado de volta ao tradicional é um problema um-para-muitos que nenhuma tabela no nível de caractere resolve — «reconverter» texto simplificado para tradicional dá um resultado plausível mas frequentemente errado.",
            "A resposta do OpenCC são dicionários no nível de frase: entradas como 乾燥、制度、皇后 são mapeadas como palavras inteiras antes de os caracteres individuais se aplicarem. Por isso as variantes de Taiwan e Hong Kong importam tanto quanto o algoritmo: 软件 torna-se 軟體 em Taiwan mas permanece 軟件 em Hong Kong; 网络 é 網路 em Taiwan e 網絡 em Hong Kong. As tabelas de vocabulário codificam décadas de uso regional — são a diferença entre «parece tradicional» e «lê-se como nativo».",
            "Regra prática: converta simplificado→tradicional com uma variante regional escolhida para publicar; trate tradicional→simplificado como pré-visualização com perda. Se o documento deve voltar ao tradicional, guarde o original — nenhum conversor pode restaurar qual 乾 se pretendia.",
          ],
        },
        {
          heading: "Escolhendo a variante certa, e o que conta como correto",
          paragraphs: [
            "Taiwan (正體) segue os padrões do Ministério da Educação taiwanês: as formas de caracteres diferem de Hong Kong em pontos (preferências 裏/裡, uso de 着/著) e os deslocamentos de vocabulário são sistemáticos — 内存→記憶體, 视频 se expressa como 影片 e não 視頻, 信息→資訊. Hong Kong (繁體) mantém o vocabulário mais próximo do uso continental usando padrões de glifos próprios. A direção genérica s2t é o padrão seguro quando nenhuma região se aplica: mapeamento de frases padrão do OpenCC sem vocabulário regional.",
            "A armadilha clássica: documentos que misturam citações do texto continental com prosa local — converter o documento inteiro converte as citações também. A localização profissional mantém as citações na variante de origem — converta trechos por parágrafo seletivamente em vez de arquivos inteiros quando as citações importam.",
            "Conselho de verificação: após a conversão, revise à mão os dez pares de vocabulário regional mais comuns da sua variante, e sempre revise nomes próprios — nomes de pessoas e lugares frequentemente contêm caracteres cuja forma preferida regional difere do que qualquer tabela de dicionário produz.",
          ],
        },
      ],
    },
  },
});
