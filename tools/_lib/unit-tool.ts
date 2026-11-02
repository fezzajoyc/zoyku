import type { Locale } from "@/lib/site";
import { UnitConverter } from "../_engines/unit-converter";
import { UNIT_CATEGORIES } from "./units";
import { defineTool, type ToolCopy, type ToolDef } from "./types";

/**
 * 单位换算工具工厂:每个分类只写差异内容(name/tagline/intro/专属 FAQ),
 * 步骤、通用 FAQ、引擎接线由工厂生成,保证十个换算页结构一致、文案各异。
 */
type Seed = {
  slug: string;
  icon: string;
  cat: string;
  featured?: boolean;
  related: string[];
  copy: Partial<
    Record<Locale, { name: string; tagline: string; intro: string[]; faq: { q: string; a: string }[] }>
  >;
};

const GENERIC: Record<
  string,
  { steps: string[]; faqs: { q: string; a: string }[] }
> = {
  en: {
    steps: [
      "Type the amount you want to convert.",
      "Pick the unit you are converting from and the unit you are converting to.",
      "The result updates as you type — check the table below for every unit at once, or copy the result.",
    ],
    faqs: [
      {
        q: "Is this converter free?",
        a: "Yes — it runs entirely in your browser. There are no limits, no ads on results and no sign-up.",
      },
      {
        q: "How accurate are the conversions?",
        a: "Conversion factors follow international standard definitions (SI and NIST). Results are shown with up to 8 significant digits.",
      },
    ],
  },
  zh: {
    steps: [
      "输入要换算的数值。",
      "选择换算源单位和目标单位。",
      "结果随输入实时更新——下方表格一次性显示所有单位,也可直接复制结果。",
    ],
    faqs: [
      {
        q: "这个换算工具免费吗?",
        a: "免费。它完全在浏览器里运行,没有次数限制、没有注册要求,结果页也不插广告。",
      },
      {
        q: "换算结果准确吗?",
        a: "换算系数采用国际标准定义(SI 与 NIST),结果最多显示 8 位有效数字。",
      },
    ],
  },
  ja: {
    steps: [
      "変換したい数値を入力します。",
      "変換元と変換先の単位を選びます。",
      "結果は入力に合わせて即時更新されます。下の表で全単位を一度に確認でき、結果をコピーすることもできます。",
    ],
    faqs: [
      {
        q: "このコンバーターは無料ですか?",
        a: "はい。完全にブラウザ内で動作し、利用制限や登録はありません。",
      },
      {
        q: "変換の精度はどのくらいですか?",
        a: "換算係数は国際標準の定義(SI・NIST)に従い、結果は有効数字 8 桁まで表示します。",
      },
    ],
  },
  es: {
    steps: [
      "Escribe la cantidad que quieres convertir.",
      "Elige la unidad de origen y la unidad de destino.",
      "El resultado se actualiza al escribir; la tabla inferior muestra todas las unidades a la vez y puedes copiarlo.",
    ],
    faqs: [
      {
        q: "¿Este conversor es gratis?",
        a: "Sí, funciona por completo en tu navegador: sin límites, sin registro y sin anuncios en los resultados.",
      },
      {
        q: "¿Qué precisión tienen las conversiones?",
        a: "Los factores siguen las definiciones estándar internacionales (SI y NIST). Los resultados se muestran con hasta 8 cifras significativas.",
      },
    ],
  },
  pt: {
    steps: [
      "Digite o valor que você quer converter.",
      "Escolha a unidade de origem e a unidade de destino.",
      "O resultado atualiza enquanto você digita; a tabela abaixo mostra todas as unidades de uma vez e você pode copiá-lo.",
    ],
    faqs: [
      {
        q: "Este conversor é grátis?",
        a: "Sim — roda inteiramente no seu navegador, sem limites, sem cadastro e sem anúncios nos resultados.",
      },
      {
        q: "Quão precisas são as conversões?",
        a: "Os fatores seguem as definições padrão internacionais (SI e NIST). Os resultados aparecem com até 8 dígitos significativos.",
      },
    ],
  },
};

export function unitTool(seed: Seed): ToolDef {
  const cat = UNIT_CATEGORIES[seed.cat];
  const copy = {} as Record<Locale, ToolCopy>;
  (Object.keys(seed.copy) as Locale[]).forEach((locale) => {
    const s = seed.copy[locale] ?? seed.copy.en!;
    const names = cat.units.slice(0, 6).map((unit) => unit.name[locale] ?? unit.name.en);
    const list = names.join(", ");
    copy[locale] = {
      name: s.name,
      h1: s.name,
      tagline: s.tagline,
      intro: [
        ...s.intro,
        locale === "zh"
          ? `支持${cat.units.length}个单位:${list} 等。所有计算在浏览器本地完成,断网也能用,数据不经过任何服务器。`
          : locale === "ja"
            ? `対応単位は${cat.units.length}種類(${list} など)。計算はすべてブラウザ内で行われ、オフラインでも動作し、データはサーバーに送られません。`
            : locale === "es"
              ? `Incluye ${cat.units.length} unidades: ${list} y más. Todo se calcula en tu navegador, funciona sin conexión y tus datos no pasan por ningún servidor.`
              : locale === "pt"
                ? `Inclui ${cat.units.length} unidades: ${list} e mais. Tudo é calculado no seu navegador, funciona offline e seus dados não passam por nenhum servidor.`
                : `It supports ${cat.units.length} units — ${list} and more. Everything is calculated in your browser, works offline, and your data never touches a server.`,
      ],
      steps: (GENERIC[locale] ?? GENERIC.en).steps,
      faqs: [...s.faq, ...(GENERIC[locale] ?? GENERIC.en).faqs],
    };
  });

  return defineTool({
    slug: seed.slug,
    category: "utility",
    icon: seed.icon,
    featured: seed.featured,
    engine: { component: UnitConverter, props: { cat: seed.cat } },
    copy,
    related: seed.related,
  });
}
