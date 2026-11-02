import { CalcEngineConverters } from "../_engines/calc-engine-converters";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "roman-numeral",
  category: "utility",
  icon: "text",
  engine: { component: CalcEngineConverters, props: { kind: "roman" } },
  related: ["binary-converter", "date-calculator", "timestamp-converter", "scientific-calculator"],
  copy: {
    en: {
      name: "Roman Numeral Converter",
      tagline: "Convert numbers to Roman numerals and back, in both directions at once — with strict classical validation of subtractive notation.",
      intro: [
        "Type an Arabic number (1–3999) and see its Roman form, or type a numeral and get the number — both fields are live, so you can correct either side. The parser enforces classical rules: I before V/X, X before L/C, C before D/M.",
        "Handy for clock faces, book chapters, film years, monument inscriptions and Super Bowl numbers — anywhere Roman numerals still appear.",
      ],
      steps: [
        "Enter a number between 1 and 3999 to get its Roman numeral.",
        "Or type a Roman numeral — the number appears instantly.",
        "Invalid forms like VIIII or IM are flagged with an explanation of the rules.",
      ],
      faqs: [
        {
          q: "Why is 4000 the upper limit (MMMCMXCIX)?",
          a: "Classical Roman notation has no digit larger than M (1000), and repeating M four times (MMMM) was not used. The largest number expressible in strict classical form is 3999, written MMMCMXCIX.",
        },
        {
          q: "Why is VIIII rejected when clocks sometimes show it?",
          a: "Some clock faces use additive IIII for four, but the standard classical system requires subtractive IV. This tool validates against the strict canonical regex, so VIIII, IC or IM are flagged rather than silently converted.",
        },
        {
          q: "Does the converter accept lowercase letters?",
          a: "Yes — input like mcmxciv is uppercased automatically and converted to 1994. The output is always shown in uppercase, as inscriptions traditionally are.",
        },
      ],
    },
    zh: {
      name: "罗马数字转换",
      tagline: "阿拉伯数字与罗马数字双向即时互转,严格校验经典减法记数规则,时钟、章节、年份一查便知。",
      intro: [
        "输入阿拉伯数字(1–3999)即可得到罗马数字;输入罗马数字也能立即得到对应数字。两侧实时联动,任意一边都可以修改。解析器强制执行经典规则:I 在 V/X 前、X 在 L/C 前、C 在 D/M 前。",
        "适合查钟表盘、书籍章节、电影年份、碑文铭刻和超级碗届数——罗马数字仍然出现的每个角落。",
      ],
      steps: [
        "输入 1–3999 之间的数字,得到对应罗马数字。",
        "或输入罗马数字,对应的数字立即出现。",
        "VIIII、IM 之类的非法写法会被标记,并说明原因。",
      ],
      faqs: [
        {
          q: "为什么上限是 3999(MMMCMXCIX)?",
          a: "经典罗马记数中没有大于 M(1000)的符号,把 M 连写四次(MMMM)也不符合规范。严格经典形式能表示的最大数就是 3999,写作 MMMCMXCIX。",
        },
        {
          q: "钟表上常见 VIIII,为什么这里判为无效?",
          a: "有些表盘用加法的 IIII 表示 4,但标准经典体系要求用减法 IV。本工具按严格的规范正则校验,因此 VIIII、IC、IM 会被标记而不是默默转换。",
        },
        {
          q: "支持小写字母吗?",
          a: "支持——mcmxciv 这样的输入会自动转成大写并换算为 1994。输出始终为大写,与碑文传统一致。",
        },
      ],
    },
    ja: {
      name: "ローマ数字変換",
      tagline: "アラビア数字とローマ数字を双方向でリアルタイム変換。減算法の古典規則を厳格に検証します。",
      intro: [
        "アラビア数字(1〜3999)を入力すればローマ数字が、ローマ数字を入力すれば対応する数が即座に表示されます。両欄が連動しているので、どちらを直しても構いません。解析器は古典規則(I は V/X の前、X は L/C の前、C は D/M の前)を強制します。",
        "時計の文字盤、書籍の章、映画の年、記念碑の銘文、スーパーボウルの回数など、ローマ数字が今も使われる場面で便利です。",
      ],
      steps: [
        "1〜3999 の数値を入力するとローマ数字が出ます。",
        "またはローマ数字を入力すると、数値が即座に表示されます。",
        "VIIII や IM のような不正な形は、規則の説明とともに指摘されます。",
      ],
      faqs: [
        {
          q: "上限が 3999(MMMCMXCIX)なのはなぜですか?",
          a: "古典的なローマ記法には M(1000)より大きい記号がなく、M を 4 回並べる(MMMM)のは正式ではありません。厳密な古典形式で表せる最大数は 3999、MMCMXCIX ではなく MMMCMXCIX です。",
        },
        {
          q: "時計で見かける VIIII が不可なのは?",
          a: "文字盤によっては加算の IIII を使いますが、標準的な古典体系では減算の IV が規則です。このツールは厳格な正規表現で検証するため、VIIII・IC・IM は黙って変換されず指摘されます。",
        },
        {
          q: "小文字も入力できますか?",
          a: "はい。mcmxciv のような入力は自動で大文字に整えられ、1994 に変換されます。出力は碑文の伝統に倣い、常に大文字で表示します。",
        },
      ],
    },
    es: {
      name: "Conversor de números romanos",
      tagline: "Convierte números a romanos y viceversa en ambas direcciones a la vez, con validación estricta de la notación sustractiva clásica.",
      intro: [
        "Escriba un número arábigo (1–3999) y verá su forma romana, o escriba un numeral y obtendrá el número: ambos campos están conectados en vivo, así que puede corregir cualquiera de los dos. El analizador aplica las reglas clásicas: I antes de V/X, X antes de L/C, C antes de D/M.",
        "Útil para esferas de reloj, capítulos de libros, años de películas, inscripciones de monumentos y ediciones de la Super Bowl, donde los romanos siguen apareciendo.",
      ],
      steps: [
        "Introduzca un número entre 1 y 3999 para obtener su numeral romano.",
        "O escriba un numeral romano: el número aparece al instante.",
        "Las formas no válidas como VIIII o IM se marcan con una explicación de las reglas.",
      ],
      faqs: [
        {
          q: "¿Por qué el límite es 3999 (MMMCMXCIX)?",
          a: "La notación romana clásica no tiene símbolo mayor que M (1000) y repetir M cuatro veces (MMMM) no se usaba. El mayor número expresable en forma clásica estricta es 3999, escrito MMMCMXCIX.",
        },
        {
          q: "¿Por qué se rechaza VIIII si algunos relojes lo muestran?",
          a: "Algunas esferas usan el aditivo IIII para el cuatro, pero el sistema clásico estándar exige el sustractivo IV. Esta herramienta valida con la forma canónica estricta, así que VIIII, IC o IM se marcan en lugar de convertirse sin más.",
        },
        {
          q: "¿Acepta letras minúsculas?",
          a: "Sí: una entrada como mcmxciv se pasa a mayúsculas automáticamente y se convierte en 1994. La salida siempre se muestra en mayúsculas, como en las inscripciones tradicionales.",
        },
      ],
    },
    pt: {
      name: "Conversor de números romanos",
      tagline: "Converta números em romanos e vice-versa nos dois sentidos ao mesmo tempo, com validação rigorosa da notação subtrativa clássica.",
      intro: [
        "Digite um número arábico (1–3999) e veja a forma romana, ou digite um numeral e receba o número — os dois campos são ligados ao vivo, então você pode corrigir qualquer um dos lados. O parser aplica as regras clássicas: I antes de V/X, X antes de L/C, C antes de D/M.",
        "Útil para mostradores de relógio, capítulos de livros, anos em filmes, inscrições em monumentos e números do Super Bowl — onde os romanos ainda aparecem.",
      ],
      steps: [
        "Digite um número entre 1 e 3999 para obter o numeral romano.",
        "Ou digite um numeral romano — o número aparece na hora.",
        "Formas inválidas como VIIII ou IM são sinalizadas com uma explicação das regras.",
      ],
      faqs: [
        {
          q: "Por que o limite é 3999 (MMMCMXCIX)?",
          a: "A notação romana clássica não tem símbolo maior que M (1000) e repetir M quatro vezes (MMMM) não era usado. O maior número expressável na forma clássica estrita é 3999, escrito MMMCMXCIX.",
        },
        {
          q: "Por que VIIII é rejeitado se alguns relógios o usam?",
          a: "Alguns mostradores usam o aditivo IIII para o quatro, mas o sistema clássico padrão exige o subtrativo IV. A ferramenta valida pela forma canônica estrita, então VIIII, IC ou IM são sinalizados em vez de convertidos sem critério.",
        },
        {
          q: "Aceita letras minúsculas?",
          a: "Sim — entradas como mcmxciv viram maiúsculas automaticamente e convertem para 1994. A saída sempre aparece em maiúsculas, como nas inscrições tradicionais.",
        },
      ],
    },
  },
});
