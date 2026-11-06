import { unitTool } from "../_lib/unit-tool";

export default unitTool({
  slug: "data-converter",
  icon: "layers",
  cat: "data",
  
  related: ["weight-converter", "length-converter", "timestamp-converter", "energy-converter", "area-converter", "volume-converter", "time-converter", "temperature-converter", "speed-converter", "pressure-converter"],
  copy: {
    en: {
      name: "Data Size Converter",
      tagline:
        "Convert bytes, KB, MB, GB and TB — both decimal (1000) and binary (1024) conventions, side by side.",
      intro: [
        "Developers checking whether a 4.7 GB movie fits a 32 GB drive, admins sizing memory in MiB while disks are marketed in MB, and anyone comparing internet plans in Mbps with file sizes in megabytes all run into the decimal-versus-binary data unit problem — the reason a '500 GB' drive reports 465 GiB.",
        "Both systems are supported explicitly: decimal units (1 MB = 10⁶ bytes, what drive makers advertise) and binary units (1 MiB = 1,048,576 bytes, what your OS reports). The well-known ~7% gap is made visible and explainable instead of mysterious.",
        "Decimal prefixes follow SI (kilo=10³, mega=10⁶, giga=10⁹); binary prefixes follow IEC 80000-13 (kibi=2¹⁰, mebi=2²⁰, gibi=2³⁰). The byte is 8 bits exactly. Conversions between any pair route through bytes at full precision, so no chained rounding ever accumulates.",
        "Most converters pick one convention silently, which is exactly how 'missing' gigabytes confuse people. This tool shows decimal and binary families side by side with distinct names (MB vs MiB), so the gap between advertised and reported capacity always has an answer.",
      ],
      faq: [
        {
          q: "Why does a 1 TB drive show only ~931 GB?",
          a: "Drive makers use decimal units (1 TB = 1,000,000,000,000 bytes) while operating systems often display binary units (1 TiB = 1,099,511,627,776 bytes). 1 TB = 0.909 TiB ≈ 931 GiB — nothing is missing.",
        },
      ],
      deepDive: [
        {
          heading: "The 1000 vs 1024 dispute, settled by standards",
          paragraphs: [
            "Two traditions collide in data units. Hardware and telecommunications use decimal prefixes: 1 KB = 1,000 bytes, because disk capacities and network rates are engineered in powers of ten. Memory and operating systems historically used binary: 1 K = 1,024 bytes, because memory is addressed in powers of two. The collision produced the famous gap — a \"500 GB\" drive shows about 465 \"GB\" in the OS, because the drive means 500 × 10⁹ bytes and the OS divides by 1024³.",
            "The 1998 IEC standard resolved the naming: binary prefixes are KiB, MiB, GiB (1 KiB = 1,024 bytes), and KB, MB, GB belong to the decimal system (1 MB = 1,000,000 bytes). Windows still reports binary-style while labeling it GB, which perpetuates the confusion; macOS switched to decimal counting years ago, which is why the same file \"shrinks\" when moved between platforms.",
            "This tool shows both interpretations side by side so you can check whichever the target system uses: bandwidth quotes, drive capacities and RAM specs all follow different conventions, and the same number is genuinely two different sizes depending on which is intended.",
          ],
        },
        {
          heading: "Which unit to use when",
          paragraphs: [
            "Network bandwidth is decimal, always: a \"100 Mbps\" connection moves 100 × 10⁶ bits per second — about 12.5 decimal MB per second, not 12.5 MiB. Download-time estimates that ignore this run about 5% optimistic at the megabyte scale and worse higher up.",
            "File sizes in most modern operating systems and cloud interfaces are decimal (or mixed); RAM is binary without exception, because memory chips are built in powers of two. When a system spec says \"16 GB RAM\", that is 16 × 2³⁰ bytes — the kind of detail that matters when virtual machines or memory limits are being planned.",
            "Storage planning is where real money meets the gap: a data center provisioning \"1 PB\" of raw disk gets about 10-12% less usable binary capacity than a naive calculation suggests, before any filesystem overhead. Quotas and transfer caps in contracts should be read with the unit convention in mind — \"1 TB monthly traffic\" in decimal is about 7.4% less than 1 TiB.",
          ],
        },
        {
          heading: "Precise, dual-convention, local",
          paragraphs: [
            "Every input converts through exact power-of-ten and power-of-two factors — 1 KiB is exactly 1,024 bytes, 1 KB exactly 1,000 — and results display enough significant digits that the two conventions never blur into one number.",
            "The tool covers bits as well as bytes, because bandwidth is quoted in bits: the 8× relationship between a byte and a bit is the other classic slip (a \"25 Mbps\" line never downloads 25 MB in a second — one eighth of that).",
            "All computation runs in your browser; no file or byte count is transmitted. For capacity planning sheets and contract checks, the dual display means you never have to remember which vendor counts which way.",
          ],
        },
      ],
    },
    zh: {
      name: "数据大小换算",
      tagline: "字节、KB、MB、GB、TB 互转,十进制(1000)与二进制(1024)两套口径并列显示。",
      intro: [
        "明确区分十进制与二进制口径:KB = 1000 字节,KiB = 1024 字节。“硬盘容量对不上数”的困惑大多来自把这两套单位混为一谈。",
        "适合核对下载体积、磁盘占用、内存规格和主机流量套餐。",
      ],
      faq: [
        {
          q: "为什么 1 TB 的硬盘只显示约 931 GB?",
          a: "硬盘厂商用十进制(1 TB = 1,000,000,000,000 字节),操作系统常按二进制显示(1 TiB = 1,099,511,627,776 字节)。1 TB = 0.909 TiB ≈ 931 GiB——容量没有少。",
        },
      ],
      deepDive: [
        {
          heading: "1000 与 1024 之争,由标准了结",
          paragraphs: [
            "数据单位里有两种传统在碰撞。硬件与通信行业用十进制前缀:1 KB = 1,000 字节,因为磁盘容量和网络速率按十的幂设计。内存和操作系统历史上用二进制:1 K = 1,024 字节,因为内存按二的幂编址。碰撞产出了著名的落差——“500 GB” 的硬盘在操作系统里显示约 465 “GB”,因为硬盘指 500 × 10⁹ 字节,而系统按 1024³ 去除。",
            "1998 年的 IEC 标准解决了命名:二进制前缀是 KiB、MiB、GiB(1 KiB = 1,024 字节),KB、MB、GB 归十进制(1 MB = 1,000,000 字节)。Windows 至今仍按二进制计数却标成 GB,让混乱延续;macOS 多年前就改成十进制——同一个文件在两个平台间移动会“缩水”,就是这个原因。",
            "本工具并排显示两种口径,你要对齐哪个系统就用哪个:带宽报价、磁盘容量、内存规格各自遵循不同惯例,同一个数字确实是两个不同的大小。",
          ],
        },
        {
          heading: "什么时候用哪个单位",
          paragraphs: [
            "网络带宽永远是十进制:一条 “100 Mbps” 的线路每秒搬运 100 × 10⁶ 比特——约 12.5 个十进制 MB,而不是 12.5 MiB。忽略这一点估算下载时间,在 MB 量级会乐观约 5%,越往上偏差越大。",
            "多数现代操作系统和云界面里的文件大小是十进制(或混用);内存则毫无例外是二进制,因为内存芯片按二的幂制造。规格书说 “16 GB 内存” 时,那是 16 × 2³⁰ 字节——规划虚拟机或内存上限时,这类细节真正要命。",
            "容量规划是钱真正撞上落差的地方:数据中心采购 “1 PB” 原始磁盘,可用二进制容量比天真估算少约 10%-12%,这还没算文件系统开销。合同里的配额和流量上限也要带着单位口径去读——十进制的 “1 TB 月流量” 比 1 TiB 少约 7.4%。",
          ],
        },
        {
          heading: "精确、双口径、本地",
          paragraphs: [
            "每次输入都按精确的十的幂和二的幂换算——1 KiB 恰好 1,024 字节,1 KB 恰好 1,000——结果显示足够多的有效数字,两种口径永远不会糊成一个数。",
            "工具同时覆盖比特与字节,因为带宽按比特报价:字节与比特的 8 倍关系是另一个经典手滑(“25 Mbps” 的线路一秒永远下不了 25 MB——只有八分之一)。",
            "全部计算在浏览器里完成;不传输任何文件或字节数。做容量规划表、核对合同时,双口径显示让你不必记住哪家厂商用哪种算法。",
          ],
        },
      ],
    },
    ja: {
      name: "データサイズ換算",
      tagline: "バイト・KB・MB・GB・TB を換算。10 進(1000)と 2 進(1024)の両方の基準を並べて表示。",
      intro: [
        "10 進と 2 進の違いを明示して変換:KB は 1000 バイト、KiB は 1024 バイト。「ディスクの表示容量がカタログより少ない」混乱の多くはこの混同が原因です。",
        "ダウンロードサイズ、ディスク使用量、メモリ容量、ホスティングの帯域上限の確認にどうぞ。",
      ],
      faq: [
        {
          q: "1 TB のドライブが約 931 GB にしか見えないのは?",
          a: "メーカーは 10 進(1 TB = 1,000,000,000,000 バイト)、OS は 2 進(1 TiB = 1,099,511,627,776 バイト)で表示することが多いためです。1 TB = 0.909 TiB ≈ 931 GiB で、容量は失われていません。",
        },
      ],
      deepDive: [
        {
          heading: "1000 対 1024 の論争、標準が決着",
          paragraphs: [
            "データ単位には 2 つの伝統が衝突しています。ハードウェアと通信は 10 進接頭辞を使います。1 KB = 1,000 バイト。ディスク容量と回線速度が 10 の冪で設計されるからです。メモリと OS は歴史的に 2 進を使ってきました。1 K = 1,024 バイト。メモリが 2 の冪でアドレス指定されるからです。衝突が有名な落差を生みました。「500 GB」のドライブは OS 上では約 465「GB」に見えます。ドライブ側は 500 × 10⁹ バイトを意味し、OS は 1024³ で割るからです。",
            "1998 年の IEC 規格が命名を決着させました。2 進接頭辞は KiB・MiB・GiB(1 KiB = 1,024 バイト)、KB・MB・GB は 10 進(1 MB = 1,000,000 バイト)です。Windows は今も 2 進で数えながら GB と表示して混乱を続け、macOS は何年も前に 10 進へ移行しました。同じファイルがプラットフォーム間で「縮む」のはこのためです。",
            "このツールは 2 つの解釈を並べて表示するので、対象のシステムがどちらを使っているかに合わせて確認できます。帯域の見積もり、ドライブ容量、RAM の仕様はそれぞれ別の慣行に従い、同じ数が本当に 2 つの異なる大きさになります。",
          ],
        },
        {
          heading: "どちらの単位をいつ使うか",
          paragraphs: [
            "回線帯域は常に 10 進です。「100 Mbps」の回線は毎秒 100 × 10⁶ ビットを運び——10 進で約 12.5 MB であって 12.5 MiB ではありません。これを無視したダウンロード時間の見積もりは、MB 規模で約 5% 楽観的になり、上に行くほどずれます。",
            "現代の OS やクラウド画面のファイルサイズは 10 進(または混在)。RAM は例外なく 2 進です。メモリチップは 2 の冪で作られるからです。仕様書の「RAM 16 GB」は 16 × 2³⁰ バイトであり、仮想マシンやメモリ上限を計画するときに効く細部です。",
            "容量計画は、金がこの落差にぶつかる場所です。「1 PB」の生ディスクを調達したデータセンターは、素朴な計算より 2 進ベースで 10〜12% 少ない使える容量を得ます。ファイルシステムのオーバーヘッドの前の話です。契約の割り当てと転送上限も単位の慣行を意識して読むべきです。10 進の「月間 1 TB」は 1 TiB より約 7.4% 少ない。",
          ],
        },
        {
          heading: "正確・両慣行・ローカル",
          paragraphs: [
            "入力は正確な 10 の冪と 2 の冪の係数で換算されます。1 KiB は正確に 1,024 バイト、1 KB は正確に 1,000。結果は十分な有効数字で表示され、2 つの慣行が 1 つの数に曖昧に溶けることはありません。",
            "ツールはビットも覆います。帯域はビットで見積もられるからです。バイトとビットの 8 倍関係はもう 1 つの定番の手滑です(「25 Mbps」の回線が 1 秒で 25 MB を落とすことはなく、その 8 分の 1 です)。",
            "計算はすべてブラウザ内で行われます。ファイルもバイト数も送信しません。容量計画の表や契約確認では、両慣行の並列表示のおかげで、どのベンダーがどちらで数えているかを覚える必要がなくなります。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de tamaño de datos",
      tagline:
        "Convierte bytes, KB, MB, GB y TB con la convención decimal (1000) y binaria (1024) lado a lado.",
      intro: [
        "Convierte unidades de almacenamiento dejando clara la diferencia decimal/binaria: KB son 1000 bytes, KiB son 1024 bytes. Buena parte de la confusión «mi disco dice menos de lo comprado» viene de mezclarlas.",
        "Sirve para comprobar descargas, uso de disco, especificaciones de memoria y límites de ancho de banda.",
      ],
      faq: [
        {
          q: "¿Por qué un disco de 1 TB muestra solo ~931 GB?",
          a: "Los fabricantes usan unidades decimales (1 TB = 1.000.000.000.000 bytes) y los sistemas operativos suelen mostrar binarias (1 TiB = 1.099.511.627.776 bytes). 1 TB = 0,909 TiB ≈ 931 GiB: no falta nada.",
        },
      ],
      deepDive: [
        {
          heading: "La disputa 1000 vs 1024, resuelta por estándares",
          paragraphs: [
            "Dos tradiciones chocan en las unidades de datos. El hardware y las telecomunicaciones usan prefijos decimales: 1 KB = 1.000 bytes, porque las capacidades de disco y las tasas de red se diseñan en potencias de diez. La memoria y los sistemas operativos usaron históricamente binario: 1 K = 1.024 bytes, porque la memoria se direcciona en potencias de dos. La colisión produjo la brecha famosa — un disco de \"500 GB\" muestra unos 465 \"GB\" en el SO, porque el disco significa 500 × 10⁹ bytes y el SO divide por 1024³.",
            "El estándar IEC de 1998 resolvió el nombre: los prefijos binarios son KiB, MiB, GiB (1 KiB = 1.024 bytes), y KB, MB, GB pertenecen al sistema decimal (1 MB = 1.000.000 bytes). Windows sigue contando en binario etiquetándolo GB, lo que perpetúa la confusión; macOS cambió a conteo decimal hace años, razón por la que el mismo archivo \"encoge\" al moverse entre plataformas.",
            "Esta herramienta muestra ambas interpretaciones lado a lado para que compruebes la que use el sistema de destino: las tarifas de ancho de banda, las capacidades de disco y las especificaciones de RAM siguen convenciones distintas, y el mismo número son genuinamente dos tamaños distintos según cuál se pretenda.",
          ],
        },
        {
          heading: "Qué unidad usar y cuándo",
          paragraphs: [
            "El ancho de banda de red es decimal, siempre: una conexión de \"100 Mbps\" mueve 100 × 10⁶ bits por segundo — unos 12,5 MB decimales por segundo, no 12,5 MiB. Las estimaciones de descarga que lo ignoran quedan un 5% optimistas a escala de megabyte y peoran más arriba.",
            "Los tamaños de archivo en la mayoría de sistemas operativos modernos y nubes son decimales (o mixtos); la RAM es binaria sin excepción, porque los chips de memoria se fabrican en potencias de dos. Cuando una especificación dice \"16 GB de RAM\", son 16 × 2³⁰ bytes — el detalle que importa al planificar máquinas virtuales o límites de memoria.",
            "La planificación de almacenamiento es donde el dinero real se encuentra con la brecha: un centro de datos que aprovisiona \"1 PB\" de disco bruto obtiene un 10-12% menos de capacidad binaria utilizable que el cálculo ingenuo sugiere, antes de cualquier sobrecarga del sistema de archivos. Las cuotas y límites de transferencia en contratos deben leerse con la convención de unidades en mente — \"1 TB de tráfico mensual\" decimal es un 7,4% menos que 1 TiB.",
          ],
        },
        {
          heading: "Preciso, doble convención, local",
          paragraphs: [
            "Cada entrada convierte por factores exactos de potencia de diez y de dos — 1 KiB es exactamente 1.024 bytes, 1 KB exactamente 1.000 — y los resultados muestran suficientes cifras significativas para que las dos convenciones nunca se difuminen en un solo número.",
            "La herramienta cubre bits además de bytes, porque el ancho de banda se cotiza en bits: la relación de 8× entre byte y bit es el otro desliz clásico (una línea de \"25 Mbps\" nunca descarga 25 MB en un segundo — un octavo de eso).",
            "Todo el cálculo corre en tu navegador; no se transmite ningún archivo ni recuento de bytes. Para hojas de planificación de capacidad y revisión de contratos, la doble visualización evita tener que recordar qué proveedor cuenta de qué manera.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de tamanho de dados",
      tagline:
        "Converta bytes, KB, MB, GB e TB com as convenções decimal (1000) e binária (1024) lado a lado.",
      intro: [
        "Converta unidades de armazenamento deixando explícita a diferença decimal/binária: KB são 1000 bytes, KiB são 1024 bytes. Muita da confusão “meu disco mostra menos do que comprei” vem de misturar as duas.",
        "Use para conferir downloads, uso de disco, especificações de memória e limites de banda.",
      ],
      faq: [
        {
          q: "Por que um disco de 1 TB mostra só ~931 GB?",
          a: "Os fabricantes usam unidades decimais (1 TB = 1.000.000.000.000 bytes) e os sistemas costumam exibir binárias (1 TiB = 1.099.511.627.776 bytes). 1 TB = 0,909 TiB ≈ 931 GiB — nada está faltando.",
        },
      ],
      deepDive: [
        {
          heading: "A disputa 1000 vs 1024, resolvida por padrões",
          paragraphs: [
            "Duas tradições colidem nas unidades de dados. O hardware e as telecomunicações usam prefixos decimais: 1 KB = 1.000 bytes, porque capacidades de disco e taxas de rede são projetadas em potências de dez. Memória e sistemas operacionais usaram historicamente binário: 1 K = 1.024 bytes, porque a memória é endereçada em potências de dois. A colisão produziu o descolamento famoso — um disco de \"500 GB\" mostra uns 465 \"GB\" no sistema, porque o disco significa 500 × 10⁹ bytes e o sistema divide por 1024³.",
            "O padrão IEC de 1998 resolveu o nome: os prefixos binários são KiB, MiB, GiB (1 KiB = 1.024 bytes), e KB, MB, GB pertencem ao sistema decimal (1 MB = 1.000.000 bytes). O Windows ainda conta em binário rotulando como GB, perpetuando a confusão; o macOS mudou para contagem decimal há anos, razão pela qual o mesmo arquivo \"encolhe\" ao mover entre plataformas.",
            "Esta ferramenta mostra as duas interpretações lado a lado para você conferir a que o sistema de destino usa: cotações de banda, capacidades de disco e especificações de RAM seguem convenções diferentes, e o mesmo número é genuinamente dois tamanhos diferentes conforme a intenção.",
          ],
        },
        {
          heading: "Qual unidade usar e quando",
          paragraphs: [
            "Banda de rede é decimal, sempre: uma conexão de \"100 Mbps\" move 100 × 10⁶ bits por segundo — cerca de 12,5 MB decimais por segundo, não 12,5 MiB. Estimativas de download que ignoram isso ficam uns 5% otimistas na escala de megabyte e pioram acima.",
            "Tamanhos de arquivo na maioria dos sistemas operacionais modernos e nuvens são decimais (ou mistos); a RAM é binária sem exceção, porque chips de memória são fabricados em potências de dois. Quando uma especificação diz \"16 GB de RAM\", são 16 × 2³⁰ bytes — o detalhe que importa ao planejar máquinas virtuais ou limites de memória.",
            "Planejamento de armazenamento é onde dinheiro de verdade encontra o descolamento: um data center que provisiona \"1 PB\" de disco bruto obtém 10-12% menos capacidade binária utilizável do que o cálculo ingênuo sugere, antes de qualquer sobrecarga do sistema de arquivos. Cotas e limites de transferência em contratos devem ser lidos com a convenção de unidades em mente — \"1 TB de tráfego mensal\" decimal é uns 7,4% menos que 1 TiB.",
          ],
        },
        {
          heading: "Preciso, dupla convenção, local",
          paragraphs: [
            "Cada entrada converte por fatores exatos de potência de dez e de dois — 1 KiB é exatamente 1.024 bytes, 1 KB exatamente 1.000 — e os resultados mostram dígitos significativos suficientes para que as duas convenções nunca se confundam num só número.",
            "A ferramenta cobre bits além de bytes, porque banda é cotada em bits: a relação de 8× entre byte e bit é o outro deslize clássico (uma linha de \"25 Mbps\" nunca baixa 25 MB num segundo — um oitavo disso).",
            "Todo o cálculo roda no seu navegador; nenhum arquivo ou contagem de bytes é transmitida. Para planilhas de planejamento de capacidade e conferência de contratos, a exibição dupla dispensa lembrar qual fornecedor conta de que jeito.",
          ],
        },
      ],
    },
  },
});
