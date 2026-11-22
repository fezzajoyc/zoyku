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
      deepDive: [
        {
          heading: "The interleaved-bit algorithm, in five lines",
          paragraphs: [
            "The encoding alternates between the longitude and latitude ranges: start with lng ∈ [−180, 180] and lat ∈ [−90, 90], and for each bit, binary-search the current range — the bit is 1 if the coordinate is in the upper half. Longitude bits come first, then latitude, alternating. Every 5 bits index one Base32 character (32 = 2⁵), so a 5-character hash carries 25 bits: 13 longitude, 12 latitude.",
            "The asymmetry is deliberate: with one extra longitude bit, the first character narrows the globe to one of 32 vertical strips — useful because east-west position often matters more for weather, time zones and sunrise. The specific Base32 alphabet (no a, i, l, o) prevents misreading handwritten hashes: 0/1 never collide with letters, and the removed letters are the ones most often confused.",
            "The decode direction simply runs the same binary searches the hash prescribes, producing tighter and tighter bounding boxes. The output center is the midpoint of the final box — the input coordinate lies somewhere inside that box, guaranteed by construction, not by statistics.",
          ],
        },
        {
          heading: "Prefix query patterns in real databases",
          paragraphs: [
            "The killer feature for storage: a B-tree index on a Geohash column turns proximity search into a prefix range scan. "All points in the same neighbourhood as geohash wtw3sj" is the range [wtw3sj, wtw3st) — two B-tree probes instead of a full-table distance computation. MySQL, PostgreSQL and MongoDB all serve this pattern natively.",
            "The edge problem and the standard fix: a point just across a cell border shares no prefix with its true nearest neighbours. The standard remedy queries the 8 adjacent cells too — encode the 8 surrounding cell centers at the same precision and run 9 prefix queries (many libraries expose this as a neighbours function). This is why the FAQ recommends 7–8 characters: the neighbour query stays cheap at that cell size.",
            "When Geohash is the wrong tool: if you need exact distance ranking (not just bucketing), use a spatial index (PostGIS, MongoDB 2dsphere) or a proper H3/S2 system — Geohash's cells are squares and distances inside one cell vary; H3's hexagons fix that at the cost of a different ecosystem.",
          ],
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
      deepDive: [
        {
          heading: "交错比特算法,五行讲完",
          paragraphs: [
            "编码在经度与纬度范围之间交替:从 lng ∈ [−180, 180] 与 lat ∈ [−90, 90] 出发,每个比特对当前区间做一次二分——坐标落在上半则比特为 1。经度比特先行、纬度随后交替。每 5 个比特对应一个 Base32 字符(32 = 2⁵),所以 5 字符 hash 携带 25 个比特:经度 13、纬度 12。",
            "这种不对称是刻意的:多出的一个经度比特,让第一个字符就把全球收敛到 32 条纵向条带之一——因为东西位置对天气、时区与日出往往更重要。Base32 字母表(无 a、i、l、o)防止手写 hash 误读:0/1 永不与字母混淆,被删的字母恰是最容易混淆的那几个。",
            "解码方向就是把 hash 规定的二分搜索重新走一遍,产生越来越紧的包围盒。输出的中心是最终包围盒的中点——输入坐标按构造保证落在这个盒子里,不是统计意义上的大概。",
          ],
        },
        {
          heading: "真实数据库里的前缀查询模式",
          paragraphs: [
            "对存储而言最关键的能力:Geohash 列上的 B-tree 索引把就近搜索变成前缀范围扫描。「与 wtw3sj 同一街区的所有点」就是范围 [wtw3sj, wtw3st)——两次 B-tree 探测代替全表距离计算。MySQL、PostgreSQL 与 MongoDB 都原生支持这个模式。",
            "边界问题与标准修复:刚好跨过格子边界的点,与其真正的最近邻不共享前缀。标准补救是连 8 个相邻格子一起查——用同等精度编码 8 个邻格中心,执行 9 次前缀查询(很多库把它封装成 neighbours 函数)。这就是 FAQ 建议 7–8 字符的原因:在那种格子尺寸下,邻格查询仍然便宜。",
            "Geohash 不适用的场景:需要精确距离排序(而非仅分桶)时,请用空间索引(PostGIS、MongoDB 2dsphere)或正经的 H3/S2 系统——Geohash 的格子是正方形,同一格内的距离变化不小;H3 的六边形修复了这一点,代价是另一套生态。",
          ],
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
      deepDive: [
        {
          heading: "交互ビット アルゴリズム、五行で説明",
          paragraphs: [
            "エンコードは経度と緯度の範囲を交互に使います:lng ∈ [−180, 180] と lat ∈ [−90, 90] から始め、各ビットで現在の範囲を二分探索 — 座標が上半分ならビットは 1。経度ビットが先、緯度が後、交互に。5 ビットごとに Base32 文字を一つ索引します(32 = 2⁵)、5 文字のハッシュは 25 ビット:経度 13、緯度 12。",
            "この非対称は意図的です:経度の余分な一ビットにより、最初の文字で地球を 32 の縦ストリップの一つに絞れます — 東西の位置は天気・タイムゾーン・日の出でしばしばより重要だからです。Base32 アルファベット(a・i・l・o を含まない)は手書きハッシュの誤読を防ぎます:0/1 は決して文字と衝突せず、除かれた字母は最も混同されやすいものです。",
            "デコード方向はハッシュが指定する二分探索を再度実行するだけで、越来越狭い境界ボックスを生みます。出力中心は最終ボックスの中点 — 入力座標は構造的にそのボックス内にあることが保証され、統計ではなく構造で保証です。",
          ],
        },
        {
          heading: "実データベースでのプレフィックス クエリ パターン",
          paragraphs: [
            "ストレージにとっての決定機能:Geohash 列の B-tree インデックスは近接検索をプレフィックス範囲スキャンに変えます。「geohash wtw3sj と同じ街区の全点」は範囲 [wtw3sj, wtw3st) — 二つの B-tree 探測で、全テーブル距離計算ではありません。MySQL、PostgreSQL、MongoDB はすべてこのパターンをネイティブにサポートします。",
            "境界問題と標準修正:セル境界を跨いだ直後の点は、真の最近傍とプレフィックスを共有しません。標準的な対策は 8 つの隣接セルも併せてクエリ — 同精度で 8 つの隣接セル中心をエンコードし、9 回のプレフィックス クエリを実行(多くのライブラリは neighbours 関数として公開)。FAQ が 7〜8 文字を勧める理由は、そのセルサイズなら隣接クエリが安価だからです。",
            "Geohash が不適な場面:正確な距離ランク付け(バケットだけではない)が必要なら、空間インデックス(PostGIS、MongoDB 2dsphere)や本格的な H3/S2 システムを — Geohash のセルは正方形でセル内距離が変わります;H3 の六角形はそれを修正しますが別エコシステムのコストです。",
          ],
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
      deepDive: [
        {
          heading: "El algoritmo de bits entrelazados, en cinco líneas",
          paragraphs: [
            "La codificación alterna entre los rangos de longitud y latitud: comience con lng ∈ [−180, 180] y lat ∈ [−90, 90], y para cada bit, realice una búsqueda binaria del rango actual — el bit es 1 si la coordenada está en la mitad superior. Los bits de longitud van primero, luego latitud, alternando. Cada 5 bits indexan un carácter Base32 (32 = 2⁵), así que un hash de 5 caracteres lleva 25 bits: 13 de longitud, 12 de latitud.",
            "La asimetría es deliberada: con un bit extra de longitud, el primer carácter estrecha el globo a una de 32 franjas verticales — útil porque la posición este-oeste a menudo importa más para el clima, husos horarios y amaneceres. El alfabeto Base32 específico (sin a, i, l, o) evita malas lecturas de hashes escritos a mano: 0/1 nunca colisionan con letras, y las letras eliminadas son las que más se confunden.",
            "La dirección de decodificación simplemente ejecuta las mismas búsquedas binarias que el hash prescribe, produciendo cajas envolventes cada vez más estrechas. El centro de salida es el punto medio de la caja final — la coordenada de entrada se encuentra en algún lugar de esa caja, garantizado por construcción, no por estadística.",
          ],
        },
        {
          heading: "Patrones de consulta por prefijo en bases de datos reales",
          paragraphs: [
            "La característica clave para el almacenamiento: un índice B-tree sobre una columna Geohash convierte la búsqueda de proximidad en un escaneo de rango por prefijo. «Todos los puntos del mismo vecindario que wtw3sj» es el rango [wtw3sj, wtw3st) — dos sondas B-tree en lugar de un cálculo de distancia sobre toda la tabla. MySQL, PostgreSQL y MongoDB sirven este patrón de forma nativa.",
            "El problema del borde y la solución estándar: un punto justo al otro lado del borde de la celda no comparte prefijo con sus vecinos verdaderos. La solución estándar consulta también las 8 celdas adyacentes — codifique los 8 centros circundantes a la misma precisión y ejecute 9 consultas de prefijo (muchas bibliotecas lo exponen como función neighbours). Por eso la FAQ recomienda 7–8 caracteres: la consulta de vecinos sigue siendo barata a ese tamaño de celda.",
            "Cuando Geohash es la herramienta equivocada: si necesita orden por distancia exacta (no solo agrupamiento), use un índice espacial (PostGIS, MongoDB 2dsphere) o un sistema H3/S2 propio — las celdas de Geohash son cuadrados y las distancias dentro de una celda varían; los hexágonos de H3 corrigen eso al coste de otro ecosistema.",
          ],
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
      deepDive: [
        {
          heading: "O algoritmo de bits entrelaçados, em cinco linhas",
          paragraphs: [
            "A codificação alterna entre os intervalos de longitude e latitude: comece com lng ∈ [−180, 180] e lat ∈ [−90, 90], e para cada bit, faça busca binária no intervalo atual — o bit é 1 se a coordenada está na metade superior. Bits de longitude vêm primeiro, depois latitude, alternando. A cada 5 bits indexa-se um caractere Base32 (32 = 2⁵), então um hash de 5 caracteres carrega 25 bits: 13 de longitude, 12 de latitude.",
            "A assimetria é deliberada: com um bit extra de longitude, o primeiro caractere estrecha o globo a uma de 32 faixas verticais — útil porque a posição leste-oeste frequentemente importa mais para clima, fusos e nascer do sol. O alfabeto Base32 específico (sem a, i, l, o) evita má leitura de hashes escritos à mão: 0/1 nunca colidem com letras, e as letras removidas são as mais confundidas.",
            "A direção de decodificação simplesmente executa as mesmas buscas binárias que o hash prescreve, produzindo caixas delimitadoras cada vez mais estreitas. O centro de saída é o ponto médio da caixa final — a coordenada de entrada está em algum lugar dessa caixa, garantido por construção, não por estatística.",
          ],
        },
        {
          heading: "Padrões de consulta por prefixo em bancos de dados reais",
          paragraphs: [
            "A funcionalidade-chave para armazenamento: um índice B-tree numa coluna Geohash transforma a busca de proximidade em uma varredura de faixa por prefixo. "Todos os pontos no mesmo bairro que wtw3sj" é o intervalo [wtw3sj, wtw3st) — duas sondas B-tree em vez de um cálculo de distância sobre toda a tabela. MySQL, PostgreSQL e MongoDB servem esse padrão nativamente.",
            "O problema de borda e a correção padrão: um ponto logo do outro lado do limite da célula não compartilha prefixo com seus vizinhos verdadeiros. A correção padrão consulta também as 8 células adjacentes — codifique os 8 centros circundantes na mesma precisão e execute 9 consultas de prefixo (muitas bibliotecas expõem isso como função neighbours). Por isso a FAQ recomenda 7–8 caracteres: a consulta de vizinhos permanece barata nesse tamanho de célula.",
            "Quando Geohash é a ferramenta errada: se precisar de ordenação por distância exata (não apenas agrupamento), use um índice espacial (PostGIS, MongoDB 2dsphere) ou um sistema H3/S2 próprio — as células do Geohash são quadrados e as distâncias dentro de uma célula variam; os hexágonos do H3 corrigem isso ao custo de outro ecossistema.",
          ],
        },
      ],
    },
  },
});
