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
    },
  },
});
