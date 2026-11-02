import { CalcEngineConverters } from "../_engines/calc-engine-converters";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "binary-converter",
  category: "utility",
  icon: "hash",
  engine: { component: CalcEngineConverters, props: { kind: "binary" } },
  related: ["roman-numeral", "data-converter", "timestamp-converter", "aspect-ratio-calculator"],
  copy: {
    en: {
      name: "Binary Converter",
      tagline: "Convert between decimal, hexadecimal, octal and binary in one live grid — supports arbitrarily large integers, grouping for readability.",
      intro: [
        "Type a number into any of the four fields — decimal, hex, octal or binary — and the other three update instantly. Hex values group every two digits and binary every four, so long bit patterns stay readable.",
        "Conversion uses BigInt arithmetic, which means there is no 32-bit or 64-bit ceiling: paste a 40-digit decimal or a full 256-bit hex string and every representation stays exact.",
      ],
      steps: [
        "Type or paste a value into any field — decimal, hex, octal or binary.",
        "The other three bases update live as you type.",
        "Prefixes like 0x are optional; grouping spaces are ignored when parsing.",
      ],
      faqs: [
        {
          q: "How large a number can this converter handle?",
          a: "Arbitrarily large non-negative integers. Calculations use BigInt, so a 256-bit hexadecimal value converts exactly — far beyond the 2^53 limit of normal JavaScript numbers.",
        },
        {
          q: "Why does my hex letter input show as invalid?",
          a: "Each base only accepts its own digits: binary takes 0–1, octal 0–7, decimal 0–9 and hexadecimal 0–9 plus a–f. A stray space or symbol inside the number is also rejected.",
        },
        {
          q: "Are negative numbers or fractions supported?",
          a: "No — this grid converts whole non-negative values, which is what bit patterns, hashes and memory addresses are. Signed and fractional formats depend on encoding choices (two's complement, IEEE 754) that would make the mapping ambiguous.",
        },
      ],
    },
    zh: {
      name: "进制转换",
      tagline: "十进制、十六进制、八进制、二进制四栏联动即时互转,支持任意大的整数,并按位分组便于阅读。",
      intro: [
        "在十进制、十六进制、八进制、二进制任意一栏输入数字,其余三栏即时联动。十六进制每 2 位一组、二进制每 4 位一组,长比特串也能轻松读。",
        "转换基于 BigInt 运算,没有 32 位或 64 位上限:40 位的十进制或 256 位的十六进制串都能精确转换。",
      ],
      steps: [
        "在任意一栏输入或粘贴数值——十进制、十六进制、八进制或二进制均可。",
        "输入时其余三种进制实时更新。",
        "0x 之类前缀可以省略;解析时会忽略分组空格。",
      ],
      faqs: [
        {
          q: "能处理多大的数字?",
          a: "任意大的非负整数。计算使用 BigInt,256 位的十六进制值也能精确转换——远超普通 JavaScript 数字的 2^53 上限。",
        },
        {
          q: "为什么输入十六进制字母提示无效?",
          a: "每种进制只接受自己的数字:二进制 0–1、八进制 0–7、十进制 0–9、十六进制 0–9 加 a–f。数字中间混入的空格或符号也会被判为无效。",
        },
        {
          q: "支持负数或小数吗?",
          a: "不支持——四栏换算的是非负整数,这正是比特串、哈希值和内存地址的表示方式。带符号和小数依赖具体编码(补码、IEEE 754),映射不再唯一,故不纳入。",
        },
      ],
    },
    ja: {
      name: "進数変換",
      tagline: "10 進・16 進・8 進・2 進を 4 欄同時リアルタイム変換。桁数無制限の整数に対応し、読みやすく桁区切り表示。",
      intro: [
        "10 進・16 進・8 進・2 進のどれか 1 欄に数値を入れると、他の 3 欄が即座に更新されます。16 進は 2 桁ずつ、2 進は 4 桁ずつ区切って表示するので、長いビット列も読みやすくなっています。",
        "変換は BigInt 演算を使用するため 32 ビットや 64 ビットの上限がありません。40 桁の 10 進数でも 256 ビットの 16 進数でも正確に変換できます。",
      ],
      steps: [
        "どれか 1 欄に値を入力または貼り付けます(10/16/8/2 進どれでも)。",
        "入力に合わせて他の 3 進法がリアルタイム更新されます。",
        "0x などの接頭辞は省略可能です。桁区切りの空白は無視して解析します。",
      ],
      faqs: [
        {
          q: "どのくらい大きな数まで扱えますか?",
          a: "非負の整数なら無制限です。BigInt で計算するため、256 ビットの 16 進数も正確に変換できます。通常の JavaScript 数値の 2^53 上限を大きく超えます。",
        },
        {
          q: "16 進の英字を入れると無効になるのはなぜですか?",
          a: "各進法は固有の数字しか受け付けません。2 進は 0–1、8 進は 0–7、10 進は 0–9、16 進は 0–9 と a–f です。数値の途中の空白や記号も無効になります。",
        },
        {
          q: "負数や小数は使えますか?",
          a: "いいえ。この表は非負の整数のみを変換します。ビット列・ハッシュ・メモリアドレスは整数だからです。符号付きや小数は補数や IEEE 754 など符号化方式に依存し、対応が一意にならないため対象外です。",
        },
      ],
    },
    es: {
      name: "Conversor binario",
      tagline: "Convierte entre decimal, hexadecimal, octal y binario en una cuadrícula en vivo: admite enteros de cualquier tamaño y agrupa para leerlos mejor.",
      intro: [
        "Escriba un número en cualquiera de los cuatro campos — decimal, hex, octal o binario — y los otros tres se actualizan al instante. Los valores hex se agrupan cada dos dígitos y los binarios cada cuatro, para que las cadenas largas sigan siendo legibles.",
        "La conversión usa aritmética BigInt, sin techo de 32 ni 64 bits: pegue un decimal de 40 dígitos o un hex de 256 bits y todas las representaciones quedan exactas.",
      ],
      steps: [
        "Escriba o pegue un valor en cualquier campo: decimal, hex, octal o binario.",
        "Las otras tres bases se actualizan en vivo mientras escribe.",
        "Los prefijos como 0x son opcionales; los espacios de agrupación se ignoran al interpretar.",
      ],
      faqs: [
        {
          q: "¿Hasta qué número puede manejar el conversor?",
          a: "Enteros no negativos de cualquier tamaño. Los cálculos usan BigInt, así que un valor hexadecimal de 256 bits se convierte exactamente, muy por encima del límite de 2^53 de los números JavaScript normales.",
        },
        {
          q: "¿Por qué mi letra hexadecimal aparece como no válida?",
          a: "Cada base solo acepta sus propios dígitos: binario 0–1, octal 0–7, decimal 0–9 y hexadecimal 0–9 más a–f. Un espacio o símbolo dentro del número también se rechaza.",
        },
        {
          q: "¿Se admiten negativos o fracciones?",
          a: "No: la cuadrícula convierte valores enteros no negativos, que es lo que son los patrones de bits, hashes y direcciones de memoria. Los formatos con signo o decimales dependen de codificaciones (complemento a dos, IEEE 754) que harían la correspondencia ambigua.",
        },
      ],
    },
    pt: {
      name: "Conversor binário",
      tagline: "Converta entre decimal, hexadecimal, octal e binário numa grade ao vivo — aceita inteiros de qualquer tamanho e agrupa dígitos para facilitar a leitura.",
      intro: [
        "Digite um número em qualquer um dos quatro campos — decimal, hex, octal ou binário — e os outros três atualizam na hora. Valores hex são agrupados de 2 em 2 dígitos e binários de 4 em 4, mantendo longas sequências legíveis.",
        "A conversão usa aritmética BigInt, sem teto de 32 ou 64 bits: cole um decimal de 40 dígitos ou um hex de 256 bits e todas as representações permanecem exatas.",
      ],
      steps: [
        "Digite ou cole um valor em qualquer campo — decimal, hex, octal ou binário.",
        "As outras três bases atualizam ao vivo enquanto você digita.",
        "Prefixos como 0x são opcionais; espaços de agrupamento são ignorados na leitura.",
      ],
      faqs: [
        {
          q: "Qual o maior número que o conversor aceita?",
          a: "Inteiros não negativos de qualquer tamanho. Os cálculos usam BigInt, então um hexadecimal de 256 bits é convertido com exatidão — bem além do limite de 2^53 dos números JavaScript comuns.",
        },
        {
          q: "Por que minha letra hexadecimal aparece como inválida?",
          a: "Cada base aceita apenas os próprios dígitos: binário 0–1, octal 0–7, decimal 0–9 e hexadecimal 0–9 mais a–f. Um espaço ou símbolo no meio do número também é rejeitado.",
        },
        {
          q: "Aceita negativos ou frações?",
          a: "Não — a grade converte apenas inteiros não negativos, que é o formato de padrões de bits, hashes e endereços de memória. Formatos com sinal ou decimais dependem de codificações (complemento de dois, IEEE 754) que tornariam a correspondência ambígua.",
        },
      ],
    },
  },
});
