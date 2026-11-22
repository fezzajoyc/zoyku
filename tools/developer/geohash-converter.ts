import { UtilEngineGeohash } from "../_engines/util-engine-geohash";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "geohash-converter",
  category: "developer",
  icon: "grid",
  engine: { component: UtilEngineGeohash },
  related: ["timestamp-converter", "timezone-converter", "uuid-generator", "ip-lookup"],
  copy: {
    en: {
      name: "Geohash Encoder & Decoder",
      tagline:
        "Convert latitude/longitude to Geohash and back — proximity-prefix encoding for databases and location search, center points and error bounds at every precision from 1 to 12 characters. Free, private, offline.",
      intro: [
        "Geohash turns a latitude/longitude pair into a short Base32 string by interleaving the bits of both coordinates and binary-searching the globe. Nearby locations share prefixes, so a Geohash prefix works as a proximity bucket: index rows by prefix in any database and \"find points near X\" becomes a cheap prefix query instead of a spatial computation.",
        "This tool encodes coordinates at any precision from 1 to 12 characters and decodes hashes back to their cell center with exact error bounds — so you always know what a hash actually claims: at 6 characters a cell spans roughly 1.2 km × 0.6 km, at 12 characters about 3.7 cm. The alphabet deliberately excludes a, i, l and o to prevent misreading.",
        "The implementation follows the standard interleaved binary-search algorithm and is cross-verified against an independent Python implementation (pygeohash) on every test vector, including the classic examples ezs42 and u4pruydqqvj. Everything runs locally; coordinates never leave this tab.",
      ],
      steps: [
        "Choose Encode: enter latitude, longitude and the precision (number of characters).",
        "Choose Decode: paste a Geohash to get its cell center and error bounds.",
        "Copy the hash or coordinates — invalid characters and out-of-range coordinates are rejected explicitly.",
      ],
      faqs: [
        {
          q: "Why do nearby places share Geohash prefixes — and when do they not?",
          a: "Geohash cells are a recursive subdivision of the globe, so two points in the same small cell share its hash as a prefix. The catch: cell boundaries cut through cities — two shops across the street can sit in different cells near an edge. Production proximity search therefore queries the target cell plus its 8 neighbours, not just the prefix alone.",
        },
        {
          q: "What precision should I store?",
          a: "It depends on what \"near\" means: 4 characters ≈ 39 km × 20 km (city level), 6 ≈ 1.2 km × 0.6 km (neighbourhood), 8 ≈ 38 m × 19 m (street). Storing 7–8 characters covers most address-level deduplication; keep the full 12 only when centimeter-level bucketing is genuinely required.",
        },
      ],
    },
    zh: {
      name: "Geohash 编解码",
      tagline:
        "经纬度与 Geohash 双向转换——邻近前缀编码,可直接做数据库索引与就近搜索;1–12 字符精度的中心点与误差范围全覆盖。免费、即时、离线可用。",
      intro: [
        "Geohash 把经度与纬度的比特交错排列后用 Base32 编码成短字符串:相邻位置共享前缀,因此 Geohash 前缀可以直接当\"邻近桶\"用——任何数据库按前缀建索引,\"找某点附近的目标\"就退化成一次廉价的前缀查询,而不需要空间计算。",
        "本工具支持 1–12 字符的任意精度编码,解码时给出格子中心点与精确误差范围——你始终知道一个 hash 到底\"声称\"覆盖多大:6 字符的格子约 1.2 km × 0.6 km,12 字符约 3.7 cm。字母表刻意不含 a、i、l、o,防止误读。",
        "实现遵循标准交错二分算法,并与独立 Python 实现(pygeohash)在全部测试向量上交叉验证——包括经典示例 ezs42 与 u4pruydqqvj。全部本机完成,坐标不会离开此标签页。",
      ],
      steps: [
        "选择编码:输入纬度、经度与精度(字符数)。",
        "选择解码:粘贴 Geohash,得到格子中心点与误差范围。",
        "复制 hash 或坐标;非法字符与越界坐标会被明确拒绝。",
      ],
      faqs: [
        {
          q: "为什么邻近位置的 Geohash 共享前缀——什么时候不共享?",
          a: "Geohash 格子是对地球的递归细分,同一小格内的两点自然共享其 hash 前缀。陷阱在于:格子边界会切穿城市——街对面的两家店在边界附近可能落在不同格子。生产级就近搜索的正确做法是查询目标格子外加 8 个相邻格子,而不是只查前缀。",
        },
        {
          q: "该存多长的 Geohash?",
          a: "取决于\"附近\"的定义:4 字符 ≈ 39 km × 20 km(城市级),6 ≈ 1.2 km × 0.6 km(街区级),8 ≈ 38 m × 19 m(街道级)。地址级去重存 7–8 字符即可覆盖绝大多数场景;只有确实需要厘米级分桶时才存满 12 字符。",
        },
      ],
    },
    ja: {
      name: "Geohash エンコーダ・デコーダ",
      tagline:
        "緯度経度と Geohash の双方向変換 — 近接プレフィックス符号化でデータベース索引と位置検索に直結。1〜12 文字の全精度で中心点と誤差範囲を表示。無料・即時・オフライン。",
      intro: [
        "Geohash は緯度経度のビットを交互に並べて Base32 でエンコードした短い文字列です:近い位置は接頭辞を共有するため、Geohash 接頭辞はそのまま「近接バケット」として機能し、任意のデータベースで接頭辞索引を使えば「近くの点を探す」が空間計算ではなく安価な接頭辞クエリになります。",
        "本ツールは 1〜12 文字の任意精度でエンコードし、デコード時にはセル中心と正確な誤差範囲を返します — ハッシュが実際にどの範囲を主張しているのか常に把握できます:6 文字で約 1.2 km × 0.6 km、12 文字で約 3.7 cm。アルファベットは誤読防止のため a・i・l・o を意図的に除外しています。",
        "実装は標準の交互二分探索アルゴリズムに従い、独立した Python 実装(pygeohash)と全テストベクトルでクロス検証済み — 古典的な例 ezs42 と u4pruydqqvj を含みます。すべてローカル実行で、座標はこのタブから出ません。",
      ],
      steps: [
        "エンコードを選択:緯度・経度・精度(文字数)を入力。",
        "デコードを選択:Geohash を貼り付けるとセル中心と誤差範囲が得られます。",
        "ハッシュまたは座標をコピー — 不正な文字と範囲外の座標は明確に拒否されます。",
      ],
      faqs: [
        {
          q: "近い位置が Geohash 接頭辞を共有する理由、そして共有しない場合とは?",
          a: "Geohash セルは地球の再帰的分割なので、同じ小セル内の 2 点はそのハッシュを接頭辞として共有します。落とし穴:セル境界は街を切ります — 通りの向かい合わせが境界付近で別セルになることがあります。実務の近接検索は、対象セルに加えて 8 つの隣接セルもクエリするのが正解です。",
        },
        {
          q: "どの精度を保存すべき?",
          a: "「近く」の定義次第:4 文字 ≈ 39 km × 20 km(都市レベル)、6 ≈ 1.2 km × 0.6 km(街区)、8 ≈ 38 m × 19 m(通り)。住所レベルの重複排除なら 7〜8 文字で十分;センチメートル級のバケットが本当に必要な場合のみ 12 文字を保存してください。",
        },
      ],
    },
    es: {
      name: "Codificador y decodificador Geohash",
      tagline:
        "Convierta latitud/longitud a Geohash y viceversa — codificación por prefijos de proximidad para bases de datos y búsqueda de ubicación, con puntos centrales y límites de error en cada precisión de 1 a 12 caracteres. Gratis, privado, sin conexión.",
      intro: [
        "Geohash convierte un par latitud/longitud en una cadena Base32 corta intercalando los bits de ambas coordenadas y realizando una búsqueda binaria sobre el globo. Las ubicaciones cercanas comparten prefijos, así que un prefijo Geohash funciona como cubo de proximidad: indexe filas por prefijo en cualquier base de datos y «encontrar puntos cerca de X» se convierte en una consulta de prefijo barata en lugar de un cálculo espacial.",
        "Esta herramienta codifica coordenadas a cualquier precisión de 1 a 12 caracteres y decodifica hashes hacia el centro de su celda con límites de error exactos — siempre sabrá lo que un hash realmente afirma: a 6 caracteres la celda abarca ~1,2 km × 0,6 km; a 12, ~3,7 cm. El alfabeto excluye deliberadamente a, i, l y o para evitar lecturas erróneas.",
        "La implementación sigue el algoritmo estándar de búsqueda binaria entrelazada y está verificada de forma cruzada contra una implementación Python independiente (pygeohash) en todos los vectores de prueba, incluidos los ejemplos clásicos ezs42 y u4pruydqqvj. Todo se ejecuta localmente; las coordenadas nunca salen de esta pestaña.",
      ],
      steps: [
        "Elija Codificar: introduzca latitud, longitud y la precisión (número de caracteres).",
        "Elija Decodificar: pegue un Geohash para obtener el centro de su celda y los límites de error.",
        "Copie el hash o las coordenadas — los caracteres no válidos y las coordenadas fuera de rango se rechazan explícitamente.",
      ],
      faqs: [
        {
          q: "¿Por qué los lugares cercanos comparten prefijos Geohash — y cuándo no?",
          a: "Las celdas Geohash son una subdivisión recursiva del globo, así que dos puntos en la misma celda pequeña comparten su hash como prefijo. La trampa: los límites de las celdas cortan ciudades — dos tiendas frente a frente pueden estar en celdas distintas cerca de un borde. La búsqueda de proximidad en producción consulta la celda objetivo más sus 8 vecinas, no solo el prefijo.",
        },
        {
          q: "¿Qué precisión debo almacenar?",
          a: "Depende de lo que signifique «cerca»: 4 caracteres ≈ 39 km × 20 km (nivel ciudad), 6 ≈ 1,2 km × 0,6 km (vecindario), 8 ≈ 38 m × 19 m (calle). Almacenar 7–8 caracteres cubre la mayoría de deduplicaciones a nivel de dirección; guarde los 12 solo cuando se necesite un agrupamiento por centímetros.",
        },
      ],
    },
    pt: {
      name: "Codificador e decodificador Geohash",
      tagline:
        "Converta latitude/longitude para Geohash e vice-versa — codificação por prefixos de proximidade para bancos de dados e busca de localização, centros e limites de erro em todas as precisões de 1 a 12 caracteres. Grátis, privado, offline.",
      intro: [
        "O Geohash transforma um par latitude/longitude em uma curta string Base32 intercalando os bits de ambas coordenadas e fazendo busca binária no globo. Locais próximos compartilham prefixos, então um prefixo Geohash funciona como balde de proximidade: indexe linhas por prefixo em qualquer banco de dados e \"encontrar pontos perto de X\" se torna uma consulta de prefixo barata em vez de um cálculo espacial.",
        "Esta ferramenta codifica coordenadas em qualquer precisão de 1 a 12 caracteres e decodifica hashes de volta ao centro de sua célula com limites de erro exatos — você sempre sabe o que um hash realmente afirma: com 6 caracteres a célula abrange ~1,2 km × 0,6 km; com 12, ~3,7 cm. O alfabeto exclui deliberadamente a, i, l e o para evitar leituras erradas.",
        "A implementação segue o algoritmo padrão de busca binária intercalada e é verificada de forma cruzada contra uma implementação Python independente (pygeohash) em todos os vetores de teste, incluindo os exemplos clássicos ezs42 e u4pruydqqvj. Tudo roda localmente; as coordenadas nunca saem desta aba.",
      ],
      steps: [
        "Escolha Codificar: insira latitude, longitude e a precisão (número de caracteres).",
        "Escolha Decodificar: cole um Geohash para obter o centro de sua célula e os limites de erro.",
        "Copie o hash ou as coordenadas — caracteres inválidos e coordenadas fora do intervalo são rejeitados explicitamente.",
      ],
      faqs: [
        {
          q: "Por que locais próximos compartilham prefixos Geohash — e quando não compartilham?",
          a: "As células Geohash são uma subdivisão recursiva do globo, então dois pontos na mesma célula pequena compartilham seu hash como prefixo. A pegadinha: os limites das células cortam cidades — duas lojas frente a frente podem ficar em células diferentes perto de uma borda. A busca de proximidade em produção consulta a célula alvo mais suas 8 vizinhas, não apenas o prefixo.",
        },
        {
          q: "Qual precisão devo armazenar?",
          a: "Depende do que \"perto\" significa: 4 caracteres ≈ 39 km × 20 km (nível cidade), 6 ≈ 1,2 km × 0,6 km (bairro), 8 ≈ 38 m × 19 m (rua). Armazenar 7–8 caracteres cobre a maioria das deduplicações em nível de endereço; guarde os 12 apenas quando o agrupamento por centímetros for realmente necessário.",
        },
      ],
    },
  },
});
