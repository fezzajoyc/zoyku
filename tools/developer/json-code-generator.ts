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
      deepDive: [
        {
          heading: "Type inference and array element merging, step by step",
          paragraphs: [
            "The generator walks the JSON document depth-first, creating a class definition for each unique object shape. For arrays of objects, it merges all keys across elements into a single definition — an element that lacks a key present in another element simply gets that field as optional (null-able) in the generated code. This mirrors how real APIs work: array items are the same record type, but individual items may omit optional fields.",
            "The root class name comes from your input, and nested class names are derived from the key that contains them: a key user containing an object generates a class named User. Name collisions are resolved by deduplication — the second User in the same document gets a numbered suffix rather than overwriting the first.",
            "Scalar type inference is deterministic: JSON string maps to String/string, integer (no decimal point) to int, decimal number to double/float64, boolean to boolean/bool, and null to Object/object/interface{}. The inference is stable — the same JSON always produces the same classes.",
          ],
        },
        {
          heading: "Naming conventions across the three languages",
          paragraphs: [
            "Java uses camelCase for field names and PascalCase for class names, with private fields and an implicit getter/setter pattern. C# uses PascalCase for both class names and properties (get; set; syntax). Go uses PascalCase for exported struct fields and emits a json tag with the original JSON key in lowercase, so round-tripping through encoding/json preserves the original key names.",
            "The generator sanitizes names that are not valid identifiers in the target language: hyphens, dots and other separators become camelCase word breaks, and names starting with a digit get an alphabetical prefix. The JSON key is preserved in the json tag (Go) or attribute name so the wire format is unaffected by the code-side renaming.",
            "Every language has its own list type: Java uses List<T> from java.util, C# uses List<T> from System.Collections.Generic, and Go uses []T (slices). The generator uses each language's own import-free collection syntax so the output compiles without additional setup.",
          ],
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
      deepDive: [
        {
          heading: "类型推断与数组元素合并,逐步拆解",
          paragraphs: [
            "生成器深度优先遍历 JSON 文档,为每个唯一对象形状创建类定义。对象数组会把所有元素中的键合并进单个定义——某元素缺少其他元素有的键时,该字段在生成的代码中就是可选(可为 null)的。这模拟了真实 API 的工作方式:数组元素是同一记录类型,但个别元素可能省略可选字段。",
            "根类名来自你的输入,嵌套类名从包含它们的键派生:键 user 包含对象会生成名为 User 的类。命名冲突通过去重解决——同一文档中的第二个 User 会获得编号后缀而不是覆盖第一个。",
            "标量类型推断是确定性的:JSON string 映射为 String/string,整数(无小数点)映射为 int,小数映射为 double/float64,布尔映射为 boolean/bool,null 映射为 Object/object/interface{}。推断是稳定的——同一 JSON 永远产出相同的类。",
          ],
        },
        {
          heading: "三种语言的命名惯例对照",
          paragraphs: [
            "Java 字段名用 camelCase、类名用 PascalCase,字段为 private 并隐含 getter/setter 模式。C# 类名与属性均用 PascalCase(get; set; 语法)。Go 导出的 struct 字段用 PascalCase,并发出携带原始 JSON 键(小写)的 json tag,使 encoding/json 往返时保留原始键名。",
            "生成器会清洗目标语言中不是合法标识符的名称:连字符、点与其他分隔符变成 camelCase 单词分隔,数字开头的名称加字母前缀。JSON 键在 json tag(Go)或属性名中保持原样,所以线格式不受代码侧重命名影响。",
            "每种语言有自己的集合类型:Java 用 java.util 的 List<T>,C# 用 System.Collections.Generic 的 List<T>,Go 用 []T(切片)。生成器使用各语言免导入的集合语法,输出无需额外配置即可编译。",
          ],
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
      deepDive: [
        {
          heading: "型推論と配列要素マージのステップ・バイ・ステップ",
          paragraphs: [
            "ジェネレーターは JSON ドキュメントを深さ優先で走査し、一意なオブジェクト形状ごとにクラス定義を作成します。オブジェクト配列では全要素のキーを単一の定義にマージします — 他の要素にあるキーを欠く要素は、生成コードでオプション(null 許容)になります。これは実務の API が動く方法を模倣したものです:配列要素は同じレコード型ですが、個々の要素はオプションフィールドを省略することがあります。",
            "ルートクラス名は入力から、ネストクラス名はそれを含むキーから派生します:user キーがオブジェクトを含むと User という名のクラスが生成されます。名前の衝突は重複排除で解決されます — 同一ドキュメント内の 2 つ目の User は上書きではなく番号付きサフィックスを取得します。",
            "スカラー型推論は決定論的です:JSON string → String/string、整数(小数点なし)→ int、小数 → double/float64、boolean → boolean/bool、null → Object/object/interface{}。推論は安定しており、同じ JSON は常に同じクラスを生み出します。",
          ],
        },
        {
          heading: "三言語の命名規則対照",
          paragraphs: [
            "Java はフィールド名に camelCase、クラス名に PascalCase を使用し、フィールドは private で暗黙の getter/setter パターンです。C# はクラス名とプロパティの両方に PascalCase(get; set; 構文)を使用します。Go はエクスポートされた struct フィールドに PascalCase を使用し、元の JSON キー(小文字)を含む json タグを発行するため、encoding/json での往復時に元のキー名が保持されます。",
            "ジェネレーターはターゲット言語で有効な識別子でない名前をサニタイズします:ハイフン・ドット・その他の区切りは camelCase の単語区切りになり、数字で始まる名前にはアルファベットの接頭辞が付きます。JSON キーは json tag(Go)や属性名に保持されるため、コード側のリネーミングはワイヤーフォーマットに影響しません。",
            "各言語には独自のコレクション型があります:Java は java.util の List<T>、C# は System.Collections.Generic の List<T>、Go は []T(スライス)。ジェネレーターは各言語のインポート不要のコレクション構文を使用するため、追加設定なしで出力がコンパイルされます。",
          ],
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
      deepDive: [
        {
          heading: "Inferencia de tipos y fusión de elementos de array, paso a paso",
          paragraphs: [
            "El generador recorre el documento JSON en profundidad, creando una definición de clase para cada forma de objeto única. Para arrays de objetos, fusiona todas las claves de los elementos en una sola definición — un elemento que carece de una clave presente en otro simplemente obtiene ese campo como opcional (nulable) en el código generado. Esto refleja cómo funcionan las API reales: los elementos del array son del mismo tipo de registro, pero elementos individuales pueden omitir campos opcionales.",
            "El nombre de la clase raíz proviene de su entrada, y los nombres de clases anidadas se derivan de la clave que los contiene: una clave user que contiene un objeto genera una clase llamada User. Las colisiones de nombres se resuelven por deduplicación — el segundo User en el mismo documento obtiene un sufijo numerado en lugar de sobrescribir el primero.",
            "La inferencia de tipos escalares es determinista: JSON string se mapea a String/string, entero (sin punto decimal) a int, decimal a double/float64, boolean a boolean/bool, y null a Object/object/interface{}. La inferencia es estable — el mismo JSON siempre produce las mismas clases.",
          ],
        },
        {
          heading: "Convenciones de nomenclatura entre los tres lenguajes",
          paragraphs: [
            "Java usa camelCase para nombres de campos y PascalCase para nombres de clases, con campos privados y un patrón implícito de getter/setter. C# usa PascalCase tanto para nombres de clases como para propiedades (sintaxis get; set;). Go usa PascalCase para campos de struct exportados y emite un json tag con la clave JSON original en minúsculas, para que el viaje de ida y vuelta por encoding/json preserve los nombres de clave originales.",
            "El generador sanitiza nombres que no son identificadores válidos en el lenguaje destino: guiones, puntos y otros separadores se convierten en cortes de palabras camelCase, y los nombres que empiezan por dígito reciben un prefijo alfabético. La clave JSON se preserva en el json tag (Go) o el nombre de atributo, de modo que el formato de cableado no se vea afectado por el renombramiento del lado del código.",
            "Cada lenguaje tiene su propio tipo de colección: Java usa List<T> de java.util, C# usa List<T> de System.Collections.Generic, y Go usa []T (slices). El generador usa la sintaxis de colección sin import de cada lenguaje para que la salida compile sin configuración adicional.",
          ],
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
      deepDive: [
        {
          heading: "Inferência de tipos e fusão de elementos de array, passo a passo",
          paragraphs: [
            "O gerador percorre o documento JSON em profundidade, criando uma definição de classe para cada forma de objeto única. Para arrays de objetos, mescla todas as chaves dos elementos numa única definição — um elemento que não tem uma chave presente em outro simplesmente recebe esse campo como opcional (nulável) no código gerado. Isso espelha como APIs reais funcionam: elementos do array são do mesmo tipo de registro, mas elementos individuais podem omitir campos opcionais.",
            "O nome da classe raiz vem da sua entrada, e os nomes de classes aninhadas derivam da chave que os contém: uma chave user contendo um objeto gera uma classe chamada User. Colisões de nome são resolvidas por deduplicação — o segundo User no mesmo documento recebe um sufixo numerado em vez de sobrescrever o primeiro.",
            "A inferência de tipos escalares é determinística: JSON string mapeia para String/string, inteiro (sem ponto decimal) para int, decimal para double/float64, boolean para boolean/bool, e null para Object/object/interface{}. A inferência é estável — o mesmo JSON sempre produz as mesmas classes.",
          ],
        },
        {
          heading: "Convenções de nomenclatura entre os três linguagens",
          paragraphs: [
            "Java usa camelCase para nomes de campos e PascalCase para nomes de classes, com campos privados e um padrão implícito de getter/setter. C# usa PascalCase tanto para nomes de classes quanto para propriedades (sintaxe get; set;). Go usa PascalCase para campos de struct exportados e emite um json tag com a chave JSON original em minúsculas, para que o round-trip por encoding/json preserve os nomes de chave originais.",
            "O gerador sanitiza nomes que não são identificadores válidos na linguagem destino: hífens, pontos e outros separadores viram quebras de palavras camelCase, e nomes começando com dígito recebem um prefixo alfabético. A chave JSON é preservada no json tag (Go) ou no nome de atributo, para que o formato de transmissão não seja afetado pela renomeação do lado do código.",
            "Cada linguagem tem seu próprio tipo de coleção: Java usa List<T> de java.util, C# usa List<T> de System.Collections.Generic, e Go usa []T (slices). O gerador usa a sintaxe de coleção sem import de cada linguagem para que a saída compile sem configuração adicional.",
          ],
        },
      ],
    },
  },
});
