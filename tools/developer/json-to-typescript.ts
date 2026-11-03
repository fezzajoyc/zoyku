import { DevEngineJsonPlus } from "../_engines/dev-engine-jsonplus";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "json-to-typescript",
  category: "developer",
  icon: "code",
  
  engine: { component: DevEngineJsonPlus, props: { mode: "to-ts" } },
  related: ["json-formatter", "json-validator", "json-diff", "json-path-query", "json-yaml-converter"],
  copy: {
    en: {
      name: "JSON to TypeScript",
      tagline: "Generate TypeScript interfaces from any JSON — nested objects, arrays and unions, ready to paste into your project.",
      intro: [
        "Paste a JSON response and get typed interfaces instantly: nested objects become named interfaces, arrays of objects merge into one shape, mixed arrays become unions. Root name is configurable.",
        "Built for API work — paste an endpoint response, copy the types, and let the compiler catch shape changes for you.",
      ],
      steps: [
        "Paste your JSON (an API response works best).",
        "Set the root interface name if you want something other than Root.",
        "Copy the generated interfaces into your project.",
      ],
      faqs: [
        {
          q: "How are arrays handled?",
          a: "Arrays of objects merge every element's keys into one interface (missing keys would be a type error at runtime anyway). Mixed-type arrays become a union type like string | number. Empty arrays degrade to unknown[].",
        },
        {
          q: "Are all fields required?",
          a: "Yes — a single sample can't prove optionality, so everything is required. Mark fields optional yourself where your API allows null or missing keys.",
        },
      ],
    },
    zh: {
      name: "JSON 转 TypeScript",
      tagline: "从任意 JSON 生成 TypeScript 接口——嵌套对象、数组和联合类型一次生成,直接粘进项目。",
      intro: [
        "粘贴接口返回的 JSON,立刻得到类型定义:嵌套对象生成命名 interface,对象数组合并为一个形状,混合数组生成联合类型。根接口名可自定义。",
        "为接口开发而生——粘上响应、复制类型,剩下的交给编译器帮你盯字段变更。",
      ],
      steps: [
        "粘贴 JSON(接口响应最合适)。",
        "需要时修改根接口名(默认 Root)。",
        "复制生成的类型定义到项目里。",
      ],
      faqs: [
        {
          q: "数组怎么处理?",
          a: "对象数组会把所有元素的键合并成一个 interface(少键的情况运行时本来就是隐患)。混合类型数组生成 string | number 这样的联合类型。空数组降级为 unknown[]。",
        },
        {
          q: "所有字段都是必填?",
          a: "是——单个样本无法证明可选性,所以全部必填。API 允许 null 或缺省的字段请自行标记 ?。",
        },
      ],
    },
    ja: {
      name: "JSON → TypeScript",
      tagline: "任意の JSON から TypeScript interface を生成——ネスト・配列・ユニオン対応,プロジェクトにそのまま貼付。",
      intro: [
        "API レスポンスの JSON を貼り付けると、即座に型定義を生成:ネストしたオブジェクトは命名 interface、オブジェクト配列は 1 つの形状にマージ、混合配列はユニオン型。ルート名は変更可能。",
        "API 開発向け——レスポンスを貼って型をコピーすれば、形状の変化はコンパイラが検出します。",
      ],
      steps: [
        "JSON を貼り付け(API レスポンスが最適)。",
        "必要ならルート interface 名を変更。",
        "生成された型をプロジェクトにコピー。",
      ],
      faqs: [
        {
          q: "配列の扱いは?",
          a: "オブジェクト配列は全要素のキーを 1 つの interface にマージします。混合型の配列は string | number のようなユニオン型に。空配列は unknown[] になります。",
        },
        {
          q: "全フィールドが必須?",
          a: "はい。単一サンプルでは任意性を証明できないため必須に。null や欠席を許すフィールドは手動で ? を付けてください。",
        },
      ],
    },
    es: {
      name: "JSON a TypeScript",
      tagline: "Genera interfaces de TypeScript desde cualquier JSON — objetos anidados, arrays y uniones, listas para pegar.",
      intro: [
        "Pega una respuesta JSON y obtén interfaces tipadas al instante: los objetos anidados se convierten en interfaces con nombre, los arrays de objetos se fusionan en una forma, los arrays mixtos se vuelven uniones. El nombre raíz es configurable.",
        "Pensado para trabajo con APIs: pega una respuesta, copia los tipos y deja que el compilador vigile los cambios de forma.",
      ],
      steps: [
        "Pega tu JSON (una respuesta de API funciona bien).",
        "Cambia el nombre de la interfaz raíz si quieres otro distinto de Root.",
        "Copia las interfaces generadas a tu proyecto.",
      ],
      faqs: [
        {
          q: "¿Cómo se manejan los arrays?",
          a: "Los arrays de objetos fusionan las claves de todos los elementos en una interfaz. Los arrays de tipos mixtos se convierten en uniones como string | number. Los arrays vacíos degradan a unknown[].",
        },
        {
          q: "¿Todos los campos son obligatorios?",
          a: "Sí: una sola muestra no prueba opcionalidad, así que todo es requerido. Marca tú los campos opcionales donde tu API lo permita.",
        },
      ],
    },
    pt: {
      name: "JSON para TypeScript",
      tagline: "Gere interfaces TypeScript a partir de qualquer JSON — objetos aninhados, arrays e uniões, prontos para colar.",
      intro: [
        "Cole uma resposta JSON e receba interfaces tipadas na hora: objetos aninhados viram interfaces nomeadas, arrays de objetos se fundem numa forma, arrays mistos viram uniões. O nome da raiz é configurável.",
        "Feito para trabalho com APIs: cole uma resposta, copie os tipos e deixe o compilador vigiar mudanças de forma.",
      ],
      steps: [
        "Cole seu JSON (uma resposta de API funciona bem).",
        "Defina o nome da interface raiz se quiser algo além de Root.",
        "Copie as interfaces geradas para o projeto.",
      ],
      faqs: [
        {
          q: "Como os arrays são tratados?",
          a: "Arrays de objetos fundem as chaves de todos os elementos numa interface. Arrays de tipos mistos viram uniões como string | number. Arrays vazios degradam para unknown[].",
        },
        {
          q: "Todos os campos são obrigatórios?",
          a: "Sim — uma amostra única não prova opcionalidade, então tudo é requerido. Marque campos opcionais onde sua API permitir.",
        },
      ],
    },
  },
});
