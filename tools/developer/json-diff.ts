import { DevEngineJsonPlus } from "../_engines/dev-engine-jsonplus";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "json-diff",
  category: "developer",
  icon: "search",
  engine: { component: DevEngineJsonPlus, props: { mode: "diff" } },
  related: ["json-formatter", "json-validator", "json-to-typescript", "text-diff", "json-path-query"],
  copy: {
    en: {
      name: "JSON Diff",
      tagline: "Compare two JSON documents path by path — added, removed and changed keys with before/after values, all locally.",
      intro: [
        "Paste two JSON documents and see every structural difference: keys added, keys removed, values changed — each reported by its full path like $.user.name.",
        "Nested objects and arrays are walked recursively, so a change buried three levels deep still shows up with its exact path and both values.",
      ],
      steps: [
        "Paste the first JSON (the original).",
        "Paste the second JSON (the new version).",
        "Read the diff list — every line is one path-level change.",
      ],
      faqs: [
        {
          q: "How are arrays compared?",
          a: "By index: element 0 against element 0, and so on. Extra elements in either array show as added or removed at their index.",
        },
        {
          q: "Does key order matter?",
          a: "No — objects are compared by keys, not insertion order. Two documents with the same keys in different order are identical.",
        },
      ],
    },
    zh: {
      name: "JSON 对比",
      tagline: "逐路径对比两个 JSON——新增、删除、变更的键,带前后值,全部本地完成。",
      intro: [
        "粘贴两个 JSON,看清每一处结构差异:哪些键新增、哪些删除、哪些值变了——每条都带完整路径(如 $.user.name)。",
        "嵌套对象和数组会递归遍历,三层深处的变化也会带着精确路径和前后值显示出来。",
      ],
      steps: [
        "粘贴第一个 JSON(原始版)。",
        "粘贴第二个 JSON(新版本)。",
        "阅读差异列表——每行一个路径级变化。",
      ],
      faqs: [
        {
          q: "数组怎么比?",
          a: "按索引比:元素 0 对元素 0。某一方多出的元素会在其索引位置显示为新增或删除。",
        },
        {
          q: "键顺序有影响吗?",
          a: "没有——对象按键比较,与插入顺序无关。键相同顺序不同的两份文档视为相同。",
        },
      ],
    },
    ja: {
      name: "JSON Diff",
      tagline: "2 つの JSON をパス単位で比較——追加・削除・変更されたキーを前後の値つきで表示,すべてローカル処理。",
      intro: [
        "2 つの JSON を貼り付けると、構造の差分をすべて表示:追加されたキー、削除されたキー、変更された値——それぞれ $.user.name のような完全パス付き。",
        "ネストしたオブジェクトと配列は再帰的に走査するため、3 階層深い変更も正確なパスと前后値とともに表示されます。",
      ],
      steps: [
        "1 つ目の JSON(元)を貼り付け。",
        "2 つ目の JSON(新版)を貼り付け。",
        "差分リストを読む——1 行が 1 パスの変更。",
      ],
      faqs: [
        {
          q: "配列の比較方法は?",
          a: "インデックスごと:要素 0 対要素 0。どちらかに余分な要素はその位置で追加・削除として表示されます。",
        },
        {
          q: "キー順序は影響する?",
          a: "いいえ。オブジェクトはキーで比較し挿入順は無視します。同じキーを違う順で並べた 2 文書は同一とみなされます。",
        },
      ],
    },
    es: {
      name: "JSON Diff",
      tagline: "Compara dos JSON ruta por ruta — claves añadidas, eliminadas y modificadas con valores antes/después, todo local.",
      intro: [
        "Pega dos documentos JSON y ve cada diferencia estructural: claves añadidas, eliminadas, valores cambiados — cada una con su ruta completa como $.user.name.",
        "Los objetos anidados y arrays se recorren recursivamente: un cambio a tres niveles de profundidad aparece con su ruta exacta y ambos valores.",
      ],
      steps: [
        "Pega el primer JSON (el original).",
        "Pega el segundo JSON (la versión nueva).",
        "Lee la lista de diferencias: cada línea es un cambio de ruta.",
      ],
      faqs: [
        {
          q: "¿Cómo se comparan los arrays?",
          a: "Por índice: elemento 0 contra elemento 0. Los elementos extra en cualquiera se muestran como añadidos o eliminados en su índice.",
        },
        {
          q: "¿Importa el orden de las claves?",
          a: "No — los objetos se comparan por claves, no por orden de inserción. Dos documentos con las mismas claves en otro orden son idénticos.",
        },
      ],
    },
    pt: {
      name: "JSON Diff",
      tagline: "Compare dois JSONs caminho por caminho — chaves adicionadas, removidas e alteradas com valores antes/depois, tudo local.",
      intro: [
        "Cole dois documentos JSON e veja cada diferença estrutural: chaves adicionadas, removidas, valores alterados — cada uma com o caminho completo como $.user.name.",
        "Objetos aninhados e arrays são percorridos recursivamente: uma mudança a três níveis de profundidade aparece com o caminho exato e os dois valores.",
      ],
      steps: [
        "Cole o primeiro JSON (o original).",
        "Cole o segundo JSON (a versão nova).",
        "Leia a lista de diferenças — cada linha é uma mudança de caminho.",
      ],
      faqs: [
        {
          q: "Como os arrays são comparados?",
          a: "Por índice: elemento 0 contra elemento 0. Elementos extras em qualquer lado aparecem como adicionados ou removidos no seu índice.",
        },
        {
          q: "A ordem das chaves importa?",
          a: "Não — objetos são comparados por chaves, não pela ordem de inserção. Dois documentos com as mesmas chaves em ordem diferente são idênticos.",
        },
      ],
    },
  },
});
