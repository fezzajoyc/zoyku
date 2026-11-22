import { DevEngineCodeGen } from "../_engines/dev-engine-code-gen";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "json-code-generator",
  category: "developer",
  icon: "code",
  engine: { component: DevEngineCodeGen },
  related: ["json-to-typescript", "json-formatter", "toml-converter"],
  copy: {
    en: {
      name: "JSON to Java / C# / Go Class Generator",
      tagline:
        "Generate Java, C# and Go class definitions from JSON — type inference with array element merging, PascalCase naming per language convention, nested objects and List<T> support. Free, instant, offline.",
      intro: [
        "Writing POJOs, DTOs or structs by hand from a JSON sample is tedious and error-prone. This generator walks the JSON document and emits class definitions for Java (PascalCase classes, camelCase private fields, List<T> collections), C# (PascalCase properties with get/set, List<T>) and Go (PascalCase structs with json tags), matching each language's naming conventions.",
        "Nested objects become separate class definitions, and arrays of objects are merged — all keys across array elements are unioned into a single class — so you get one clean definition per type instead of duplicates. The JSON root must be an object; wrap arrays under a key like { \"items\": [...] }.",
        "Everything runs locally with pure string building — no network calls, no dependencies beyond the browser. Results are deterministic for the same input.",
      ],
      steps: [
        "Choose the target language: Java, C# or Go.",
        "Enter a root class name and paste your JSON document.",
        "Click Generate — the class definitions appear below with a copy button; JSON errors state the exact problem.",
      ],
      faqs: [
        {
          q: "Why do arrays of objects produce one class instead of multiple?",
          a: "The generator merges all keys found across array elements into a single class definition, because in practice arrays contain homogeneous records with the same shape. If elements have different optional keys, the merged class includes all of them — assign null or a default for missing values in your code.",
        },
        {
          q: "How are JSON types mapped to language types?",
          a: "JSON string maps to String/string, integer number to int, decimal number to double/float64, boolean to boolean/bool, null to Object/object/interface{}, objects to a nested class or struct, and arrays to List<T>/[]T. The type inference is deterministic for the same input.",
        },
      ],
    },
    zh: {
      name: "JSON 转 Java / C# / Go 类",
      tagline:
        "JSON 文档一键生成 Java/C#/Go 类定义——类型推断、数组合并、PascalCase 命名按语言惯例,嵌套对象独立成类,List<T> 支持。免费、即时、离线可用。",
      intro: [
        "从 JSON 样本手写 POJO、DTO 或 struct 既繁琐又容易出错。本生成器遍历 JSON 文档,按各语言命名惯例输出类定义:Java(PascalCase 类名、camelCase 私有字段、List<T> 集合)、C#(PascalCase 属性带 get/set、List<T>)、Go(PascalCase struct 带 json tag)。",
        "嵌套对象生成独立类定义;对象数组做合并——数组内所有键并集入单个类——每种类型一个干净定义而非重复。JSON 根必须是对象;数组请包一层 { \"items\": [...] }。",
        "全部使用纯字符串构建本机完成——无网络调用。同一输入的结果是确定性的。",
      ],
      steps: [
        "选择目标语言:Java、C# 或 Go。",
        "输入根类名,粘贴 JSON 文档。",
        "点击生成——类定义显示在下方并带复制按钮;JSON 错误会说明具体原因。",
      ],
      faqs: [
        {
          q: "为什么对象数组只生成一个类而非多个?",
          a: "生成器把数组内所有元素的键并集成单个类定义,因为实践中数组包含同构记录。如果元素有不同的可选键,合并类会包含全部——在代码中为缺失值赋 null 或默认值即可。",
        },
        {
          q: "JSON 类型如何映射到语言类型?",
          a: "JSON string → String/string,整数 → int,小数 → double/float64,布尔 → boolean/bool,null → Object/object/interface{},对象 → 嵌套类或 struct,数组 → List<T>/[]T。同一输入的类型推断是确定性的。",
        },
      ],
    },
    ja: {
      name: "JSON → Java / C# / Go クラス生成",
      tagline:
        "JSON ドキュメントから Java/C#/Go クラス定義を一括生成 — 型推論、配列マージ、言語別 PascalCase 命名、ネストオブジェクトの独立クラス化、List<T> 対応。無料・即時・オフライン。",
      intro: [
        "JSON サンプルから POJO・DTO・struct を手書きするのは面倒で間違いやすいです。このジェネレーターは JSON ドキュメントを走査し、言語ごとの命名規則に従ってクラス定義を出力します:Java(PascalCase クラス、camelCase フィールド、List<T>)、C#(PascalCase プロパティ、List<T>)、Go(PascalCase struct、json tag)。",
        "ネストしたオブジェクトは独立したクラス定義になり、オブジェクト配列はマージされます — 配列内の全キーの和集合が単一クラスになり、型ごとに一つのきれいな定義が得られます。JSON のルートはオブジェクトである必要があります;配列は { \"items\": [...] } のように包んでください。",
        "すべて純粋な文字列構築でローカル実行 — ネットワーク呼び出し、依存ライブラリなし。同じ入力の結果は決定論的です。",
      ],
      steps: [
        "対象言語を選択:Java、C#、Go。",
        "ルートクラス名を入力し、JSON ドキュメントを貼り付けます。",
        "生成をクリック — クラス定義が下に表示されコピーボタンが付きます。JSON エラーは具体的な原因を示します。",
      ],
      faqs: [
        {
          q: "オブジェクト配列に複数のクラスではなく一つのクラスしか生成されないのは?",
          a: "ジェネレーターは配列内の全要素のキーを単一クラス定義にマージします。実務では配列は同型レコードを含むためです。要素に異なるオプションキーがある場合、マージクラスにすべてが含まれます — コード側で null やデフォルトを割り当ててください。",
        },
        {
          q: "JSON 型は言語型にどうマップされる?",
          a: "JSON string → String/string、整数 → int、小数 → double/float64、boolean → boolean/bool、null → Object/object/interface{}、オブジェクト → ネストクラス/struct、配列 → List<T>/[]T。同じ入力の型推論は決定論的です。",
        },
      ],
    },
    es: {
      name: "JSON a clases Java / C# / Go",
      tagline:
        "Genere definiciones de clase Java, C# y Go a partir de JSON — inferencia de tipos con fusión de elementos de array, nombres PascalCase por convención de lenguaje, objetos anidados y soporte List<T>. Gratis, instantáneo, sin conexión.",
      intro: [
        "Escribir POJOs, DTOs o structs a mano a partir de una muestra JSON es tedioso y propenso a errores. Este generador recorre el documento JSON y emite definiciones de clase para Java (clases PascalCase, campos camelCase privados, colecciones List<T>), C# (propiedades PascalCase con get/set, List<T>) y Go (structs PascalCase con json tags), respetando las convenciones de cada lenguaje.",
        "Los objetos anidados se convierten en definiciones de clase separadas, y los arrays de objetos se fusionan — todas las claves de los elementos se unen en una sola clase — para obtener una definición limpia por tipo en lugar de duplicados. La raíz JSON debe ser un objeto; envuelva arrays bajo una clave como { \"items\": [...] }.",
        "Todo se ejecuta localmente con construcción de cadenas pura — sin llamadas de red, sin dependencias más allá del navegador. Los resultados son deterministas para la misma entrada.",
      ],
      steps: [
        "Elija el lenguaje destino: Java, C# o Go.",
        "Introduzca el nombre de la clase raíz y pegue su documento JSON.",
        "Haga clic en Generar — las definiciones aparecen abajo con botón de copia; los errores JSON indican el problema exacto.",
      ],
      faqs: [
        {
          q: "¿Por qué los arrays de objetos producen una clase en lugar de varias?",
          a: "El generador fusiona todas las claves encontradas en los elementos del array en una sola definición de clase, porque en la práctica los arrays contienen registros homogéneos. Si los elementos tienen claves opcionales diferentes, la clase fusionada las incluye todas — asigne null o un valor por defecto en su código.",
        },
        {
          q: "¿Cómo se mapean los tipos JSON a tipos de lenguaje?",
          a: "JSON string mapea a String/string, número entero a int, número decimal a double/float64, boolean a boolean/bool, null a Object/object/interface{}, objetos a una clase/struct anidada, y arrays a List<T>/[]T. La inferencia es determinista para la misma entrada.",
        },
      ],
    },
    pt: {
      name: "JSON para classes Java / C# / Go",
      tagline:
        "Gere definições de classe Java, C# e Go a partir de JSON — inferência de tipos com fusão de elementos de array, nomes PascalCase por convenção de linguagem, objetos aninhados e suporte List<T>. Grátis, instantâneo, offline.",
      intro: [
        "Escrever POJOs, DTOs ou structs à mão a partir de uma amostra JSON é tedioso e propenso a erros. Este gerador percorre o documento JSON e emite definições de classe para Java (classes PascalCase, campos camelCase privados, coleções List<T>), C# (propriedades PascalCase com get/set, List<T>) e Go (structs PascalCase com json tags), respeitando as convenções de cada linguagem.",
        "Objetos aninhados tornam-se definições de classe separadas, e arrays de objetos são mesclados — todas as chaves dos elementos são unidas numa única classe — para obter uma definição limpa por tipo em vez de duplicados. A raiz JSON deve ser um objeto; envolva arrays sob uma chave como { \"items\": [...] }.",
        "Tudo roda localmente com construção de strings pura — sem chamadas de rede, sem dependências além do navegador. Os resultados são determinísticos para a mesma entrada.",
      ],
      steps: [
        "Escolha a linguagem destino: Java, C# ou Go.",
        "Digite o nome da classe raiz e cole seu documento JSON.",
        "Clique em Gerar — as definições aparecem abaixo com botão de cópia; erros JSON indicam o problema exato.",
      ],
      faqs: [
        {
          q: "Por que arrays de objetos produzem uma classe em vez de várias?",
          a: "O gerador mescla todas as chaves encontradas nos elementos do array numa única definição de classe, porque na prática arrays contêm registros homogêneos. Se os elementos tiverem chaves opcionais diferentes, a classe mesclada inclui todas — atribua null ou um padrão no seu código.",
        },
        {
          q: "Como os tipos JSON são mapeados para tipos de linguagem?",
          a: "JSON string mapeia para String/string, número inteiro para int, número decimal para double/float64, boolean para boolean/bool, null para Object/object/interface{}, objetos para classe/struct aninhada, e arrays para List<T>/[]T. A inferência é determinística para a mesma entrada.",
        },
      ],
    },
  },
});
