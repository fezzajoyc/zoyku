import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "volume-converter",
  icon: "crop",
  cat: "volume",
  related: ["length-converter", "weight-converter", "area-converter", "energy-converter", "data-converter", "time-converter", "temperature-converter", "speed-converter", "pressure-converter"],
  copy: {
    en: {
      name: "Volume Converter",
      tagline: "Liters, gallons, cups, milliliters and cubic meters — US and UK units clearly labeled.",
      intro: [
        "Convert kitchen and engineering volume units with the US/UK distinction spelled out: a US gallon is 3.785 L, a UK (imperial) gallon is 4.546 L — 20% apart, so mixing them ruins recipes.",
        "Built for cooking, brewing, aquarium dosing, fuel figures and concrete estimates.",
      ],
      faq: [
        {
          q: "Is a US gallon the same as a UK gallon?",
          a: "No. 1 US gallon = 3.785 L, 1 UK gallon = 4.546 L. The converter lists them separately so you always pick the right one.",
        },
      ],
    },
    zh: {
      name: "体积换算",
      tagline: "升、加仑、杯、毫升、立方米互转,美制英制分开标注,烘焙调饮不再搞混,全程本地运行。",
      intro: [
        "厨房与工程体积单位一页换算,美制/英制明确区分:美制加仑 3.785 升,英制加仑 4.546 升,相差 20%——混用会毁掉配方。",
        "适合烘焙调饮、酿酒、鱼缸给药、油耗计算和混凝土估算。",
      ],
      faq: [
        {
          q: "美制加仑和英制加仑一样吗?",
          a: "不一样。1 美制加仑 = 3.785 升,1 英制加仑 = 4.546 升。换算表里两者分开列出,不会选错。",
        },
      ],
    },
    ja: {
      name: "体積換算",
      tagline: "リットル・ガロン・カップ・ミリリットル・立方メートル。米国系と英国系を明確に表示。",
      intro: [
        "キッチンと工学の体積単位を、米国系/英国系の違いを明示して変換:米ガロンは 3.785 L、英ガロンは 4.546 L で 20% の差。混ぜるとレシピが台無しになります。",
        "料理、醸造、水槽の投薬、燃費、コンクリートの概算に便利です。",
      ],
      faq: [
        {
          q: "米ガロンと英ガロンは同じ?",
          a: "違います。1 米ガロン = 3.785 L、1 英ガロン = 4.546 L。変換表では別々に表示されるので、常に正しい方を選べます。",
        },
      ],
    },
    es: {
      name: "Conversor de volumen",
      tagline:
        "Litros, galones, tazas, mililitros y metros cúbicos, con las unidades de EE. UU. y del R. U. bien etiquetadas.",
      intro: [
        "Convierte unidades de volumen de cocina e ingeniería distinguiendo EE. UU./R. U.: un galón estadounidense son 3,785 L y un galón imperial 4,546 L — un 20% de diferencia, y mezclarlos arruina recetas.",
        "Pensado para cocinar, fermentar, dosificar acuarios, cifras de combustible y presupuestos de hormigón.",
      ],
      faq: [
        {
          q: "¿Un galón de EE. UU. equivale a un galón británico?",
          a: "No. 1 galón de EE. UU. = 3,785 L; 1 galón del R. U. = 4,546 L. El conversor los lista por separado para que elijas el correcto.",
        },
      ],
    },
    pt: {
      name: "Conversor de volume",
      tagline:
        "Litros, galões, xícaras, mililitros e metros cúbicos, com unidades dos EUA e do R. U. bem identificadas.",
      intro: [
        "Converta unidades de volume de cozinha e engenharia distinguindo EUA/R. U.: um galão americano tem 3,785 L e o imperial 4,546 L — 20% de diferença, e misturá-los estraga receitas.",
        "Feito para cozinhar, fermentar, dosar aquários, números de combustível e orçamentos de concreto.",
      ],
      faq: [
        {
          q: "Um galão dos EUA é igual ao do Reino Unido?",
          a: "Não. 1 galão dos EUA = 3,785 L; 1 galão do R. U. = 4,546 L. O conversor lista os dois separados para você escolher o certo.",
        },
      ],
    },
  },
});
