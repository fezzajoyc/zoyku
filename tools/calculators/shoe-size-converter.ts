import { CalcEngineShoeSize } from "../_engines/calc-engine-shoe-size";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "shoe-size-converter",
  category: "utility",
  icon: "ruler",
  engine: { component: CalcEngineShoeSize },
  related: ["length-converter", "bmi-calculator", "heart-rate-zones-calculator", "cooking-conversion", "body-fat-calculator", "tip-calculator", "date-calculator", "age-calculator", "calorie-calculator", "aspect-ratio-calculator"],
  copy: {
    en: {
      name: "Shoe Size Converter",
      tagline: "Convert shoe sizes between US, UK, EU and Japanese systems for men and women — anchored to foot length in centimeters.",
      intro: [
        "Pick any system and size, and every equivalent appears at once, anchored to foot length in centimeters so the comparison is physical, not a guess.",
        "Sizing is not standardized across brands — treat results as a starting point and measure your feet at the end of the day, when they are largest.",
      ],
      steps: [
        "Choose men's or women's sizing.",
        "Pick the system you know and enter the size.",
        "Read the equivalent sizes in every other system.",
      ],
      faqs: [
        {
          q: "Why do brands differ by half a size?",
          a: "Last shapes and manufacturing vary. The table gives the standard conversion; individual brands may run small or large, so always check the brand's own chart when ordering online.",
        },
        {
          q: "How do I measure my feet?",
          a: "Stand on a sheet of paper at the end of the day, trace both feet, and measure heel to longest toe in centimeters. Use the larger foot.",
        },
      ],
    },
    zh: {
      name: "鞋码换算",
      tagline: "美码、英码、欧码、日码鞋码互转,男女款分开对照,以脚长厘米为基准。",
      intro: [
        "选定任意码制与尺码,所有体系的对应码一次性显示——锚点是脚长厘米,比较的是实际尺寸而非猜测。",
        "各品牌尺码并不统一——结果当起点,傍晚双脚最大时量脚最准。",
      ],
      steps: [
        "选择男款或女款。",
        "选择你熟悉的码制并输入尺码。",
        "查看其余所有体系的对应尺码。",
      ],
      faqs: [
        {
          q: "为什么品牌间会差半码?",
          a: "楦型与工艺不同。表格给出标准换算,品牌可能偏大或偏小,网购时请以品牌自己的尺码表为准。",
        },
        {
          q: "怎么量脚长?",
          a: "傍晚站纸上描下双脚,量脚跟到最长趾尖的厘米数,取较大的那只脚。",
        },
      ],
    },
    ja: {
      name: "靴サイズ変換",
      tagline: "US・UK・EU・JP の靴サイズを男女別に相互変換。足長センチを基準にした対応表です。",
      intro: [
        "好きなサイズ表記を入力すると、足長センチを基準にすべての表記が一度に表示されます。物理的なサイズでの比較です。",
        "ブランド間で規格は統一されていません。結果は目安にし、夕方に足を測るのが最も正確です。",
      ],
      steps: [
        "メンズ・レディースを選びます。",
        "知っている表記を選んでサイズを入力します。",
        "他のすべての表記の対応サイズを確認します。",
      ],
      faqs: [
        {
          q: "ブランドで半サイズずれるのはなぜ?",
          a: "ラスト形状と製造の差異です。表は標準変換で、ブランドにより小さめ・大きめに作られます。通販ではブランド独自のサイズ表を確認してください。",
        },
        {
          q: "足の測り方は?",
          a: "夕方に紙の上で立ち、かかとから最長の指先までを cm で測り、大きい方の足を採用します。",
        },
      ],
    },
    es: {
      name: "Convertidor de tallas de zapato",
      tagline: "Convierte tallas entre sistemas US, UK, EU y japonés para hombre y mujer, ancladas al largo del pie en centímetros.",
      intro: [
        "Elige cualquier sistema y talla, y verás todos los equivalentes de una vez, anclados al largo del pie en cm: la comparación es física, no una suposición.",
        "Las tallas no están estandarizadas entre marcas: usa el resultado como punto de partida y mide tus pies al final del día, cuando están más grandes.",
      ],
      steps: [
        "Elige calzado de hombre o mujer.",
        "Elige el sistema que conoces e introduce la talla.",
        "Lee las tallas equivalentes en los demás sistemas.",
      ],
      faqs: [
        {
          q: "¿Por qué las marcas varían media talla?",
          a: "Las hormas y la fabricación varían. La tabla da la conversión estándar; las marcas pueden calzar pequeño o grande, así que revisa su propia tabla al comprar online.",
        },
        {
          q: "¿Cómo mido mis pies?",
          a: "De pie sobre papel al final del día, traza ambos pies y mide del talón al dedo más largo en cm. Usa el pie mayor.",
        },
      ],
    },
    pt: {
      name: "Conversor de numeração de sapato",
      tagline: "Converta numeração entre US, UK, EU e japonês para masculino e feminino, com base no comprimento do pé em centímetros.",
      intro: [
        "Escolha qualquer sistema e número, e todos os equivalentes aparecem de uma vez, ancorados no comprimento do pé em cm — a comparação é física, não um palpite.",
        "A numeração não é padronizada entre marcas: trate o resultado como ponto de partida e meça os pés no fim do dia, quando estão maiores.",
      ],
      steps: [
        "Escolha masculino ou feminino.",
        "Escolha o sistema que você conhece e digite o número.",
        "Veja os equivalentes em todos os outros sistemas.",
      ],
      faqs: [
        {
          q: "Por que as marcas variam meio número?",
          a: "Formas e fabricação variam. A tabela dá a conversão padrão; marcas podem ficar menores ou maiores, então confira a tabela da própria marca ao comprar online.",
        },
        {
          q: "Como medir os pés?",
          a: "Em pé sobre papel no fim do dia, contorne os dois pés e meça do calcanhar ao dedo mais longo em cm. Use o pé maior.",
        },
      ],
    },
  },
});
