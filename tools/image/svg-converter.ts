import { ImageSvgEngine } from "../_engines/image-engine-svg";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "svg-converter",
  category: "image",
  icon: "layers",
  engine: { component: ImageSvgEngine },
  related: ["image-resizer", "convert-image", "screenshot-tool", "image-compressor"],
  copy: {
    en: {
      name: "SVG to PNG Converter",
      tagline:
        "Turn SVG icons and graphics into crisp PNG rasters at 1× to 4× or any custom scale — transparency preserved, perfect for app assets.",
      intro: [
        "SVGs are perfect for design but many places — app stores, editors, messengers, older CMSs — demand a raster PNG. This tool renders your vector file at exactly the size you need: 1× for previews, 2× for retina screens, 3×–4× or a custom factor for print-quality exports.",
        "The PNG keeps the transparent background of your SVG, and the vector is re-rendered at the target resolution rather than stretched, so edges stay razor sharp. Drop a whole icon set at once — every file is converted in one pass.",
      ],
      steps: [
        "Drop one or more .svg files.",
        "Choose a scale: 1×–4× or type any custom factor.",
        "Download the PNG files individually or all at once.",
      ],
      faqs: [
        {
          q: "What scale should I export at?",
          a: "Use 2× for icons displayed on retina/high-DPI screens, 1× when the exact pixel size is known and final, and 3×–4× as a master asset you can downscale from later. For a favicon, export at 512 px equivalent and resize down.",
        },
        {
          q: "Does converting to PNG lose the scalability of SVG?",
          a: "Yes — a PNG is fixed-resolution. That is why this tool renders at the target size directly instead of rasterizing small and stretching. Keep your .svg source for future edits and export fresh PNGs whenever you need another size.",
        },
        {
          q: "Will transparent backgrounds survive the conversion?",
          a: "Yes. The output is a PNG with full alpha, so your icon keeps its transparency exactly as in the SVG. Only fonts and external images referenced by the SVG may need to be embedded in the file itself to render.",
        },
      ],
    },
    zh: {
      name: "SVG 转 PNG",
      tagline: "SVG 图标与图形按 1×–4× 或自定义倍率转成锐利 PNG,透明背景完整保留——应用素材导出利器,支持批量。",
      intro: [
        "SVG 适合设计,但应用商店、编辑器、聊天工具和不少旧系统只认位图 PNG。本工具按你需要的尺寸精确渲染矢量文件:预览用 1×,视网膜屏用 2×,印刷级导出用 3×–4× 或自定义倍率。",
        "输出 PNG 完整保留 SVG 的透明背景,矢量按目标分辨率重新渲染而非拉伸,边缘依旧锐利。整个图标集一次拖入,一次全部转换。",
      ],
      steps: [
        "拖入一个或多个 .svg 文件。",
        "选择倍率:1×–4×,或输入任意自定义倍数。",
        "逐张或一键下载 PNG。",
      ],
      faqs: [
        {
          q: "应该用多大的倍率导出?",
          a: "视网膜 / 高分屏上的图标用 2×;尺寸已知且不再变时用 1×;3×–4× 适合作为母版素材,以后再缩小。做网站图标可以按 512px 等效导出后再缩小。",
        },
        {
          q: "转成 PNG 后还像 SVG 一样无限缩放吗?",
          a: "不能——PNG 是固定分辨率。所以本工具直接按目标尺寸渲染,而不是先转小图再拉伸。请保留 .svg 源文件,需要其他尺寸时随时重新导出。",
        },
        {
          q: "透明背景在转换后还在吗?",
          a: "在。输出是带完整 alpha 通道的 PNG,图标的透明度与 SVG 中完全一致。只有 SVG 引用的外部字体和图片需要内嵌到文件里才能正常渲染。",
        },
      ],
    },
    ja: {
      name: "SVG から PNG へ変換",
      tagline:
        "SVG のアイコンやグラフィックを 1×〜4× や任意の倍率でシャープな PNG に変換。透過を保持し、アプリアセットの書き出しに最適です。",
      intro: [
        "SVG はデザインに最適でも、アプリストア・エディタ・メッセンジャー・古い CMS などはビットマップの PNG を求めがちです。このツールはベクターファイルを必要なサイズで正確にレンダリングします:プレビューは 1×、Retina 画面は 2×、印刷品質の書き出しは 3×〜4× かカスタム倍率で。",
        "出力 PNG は SVG の透過背景を保ち、ベクターは引き伸ばしではなく目標解像度で再レンダリングされるため、エッジはくっきりしたまま。アイコンセットをまとめてドロップすれば全ファイルを一括変換します。",
      ],
      steps: [
        ".svg ファイルを 1 つ以上ドロップします。",
        "倍率を選びます:1×〜4×、または任意の数値を入力。",
        "PNG を 1 枚ずつ、またはまとめてダウンロードします。",
      ],
      faqs: [
        {
          q: "どの倍率で書き出すべき?",
          a: "Retina / 高解像度スクリーンのアイコンは 2×、最終サイズが確定しているなら 1×、後から縮小できるマスター素材には 3×〜4× が便利です。ファビコンなら 512px 相当で書き出してから縮小しましょう。",
        },
        {
          q: "PNG にすると SVG のような拡大縮小はできなくなりますか?",
          a: "できなくなります——PNG は固定解像度です。だからこそこのツールは小さくラスタライズして引き伸ばすのではなく、目標サイズで直接レンダリングします。編集用に .svg のソースを残し、必要なサイズのたびに書き出し直しましょう。",
        },
        {
          q: "透過背景は変換後も保たれますか?",
          a: "保たれます。出力はフルアルファの PNG なので、SVG と同じ透過がそのまま維持されます。SVG が参照する外部フォントや画像だけは、ファイルに埋め込まれていないと描画されないことがあります。",
        },
      ],
    },
    es: {
      name: "Convertidor SVG a PNG",
      tagline:
        "Convierte iconos y gráficos SVG en PNG nítidos a 1×–4× o cualquier escala personalizada — conserva la transparencia, ideal para recursos de apps.",
      intro: [
        "Los SVG son perfectos para diseñar, pero muchos sitios —stores de apps, editores, mensajerías, CMS antiguos— exigen un PNG rasterizado. Esta herramienta renderiza tu vector exactamente al tamaño que necesitas: 1× para vistas previas, 2× para pantallas retina, 3×–4× o un factor personalizado para calidad de imprenta.",
        "El PNG conserva el fondo transparente de tu SVG, y el vector se vuelve a renderizar a la resolución destino en lugar de estirarse, así los bordes siguen afiladísimos. Suelta un set de iconos entero: todos los archivos se convierten en una pasada.",
      ],
      steps: [
        "Suelta uno o varios archivos .svg.",
        "Elige una escala: 1×–4× o escribe cualquier factor personalizado.",
        "Descarga los PNG individualmente o todos a la vez.",
      ],
      faqs: [
        {
          q: "¿A qué escala conviene exportar?",
          a: "Usa 2× para iconos en pantallas retina/de alta densidad, 1× cuando el tamaño en píxeles es conocido y final, y 3×–4× como recurso maestro del que reducir después. Para un favicon, exporta a 512 px equivalentes y reduce.",
        },
        {
          q: "¿Convertir a PNG pierde la escalabilidad del SVG?",
          a: "Sí: un PNG es de resolución fija. Por eso esta herramienta renderiza directamente al tamaño destino en vez de rasterizar pequeño y estirar. Conserva tu .svg como fuente y exporta PNG frescos cada vez que necesites otro tamaño.",
        },
        {
          q: "¿Los fondos transparentes sobreviven a la conversión?",
          a: "Sí. La salida es un PNG con alfa completo, así tu icono mantiene la transparencia exacta del SVG. Solo las fuentes e imágenes externas que referencie el SVG deben estar incrustadas en el propio archivo para poder renderizarse.",
        },
      ],
    },
    pt: {
      name: "Conversor SVG para PNG",
      tagline:
        "Transforme ícones e gráficos SVG em PNGs nítidos em escala de 1× a 4× ou qualquer fator personalizado — transparência preservada, ótimo para assets de apps.",
      intro: [
        "SVG é perfeito para design, mas muitos lugares — lojas de apps, editores, mensageiros, CMSs antigos — exigem um PNG rasterizado. Esta ferramenta renderiza seu vetor exatamente no tamanho necessário: 1× para prévias, 2× para telas retina, 3×–4× ou fator personalizado para exportação com qualidade de impressão.",
        "O PNG mantém o fundo transparente do seu SVG, e o vetor é re-renderizado na resolução alvo em vez de esticado, então as bordas continuam afiadíssimas. Solte um conjunto de ícones inteiro — todos os arquivos são convertidos numa passada.",
      ],
      steps: [
        "Solte um ou mais arquivos .svg.",
        "Escolha a escala: 1×–4× ou digite qualquer fator personalizado.",
        "Baixe os PNGs individualmente ou todos de uma vez.",
      ],
      faqs: [
        {
          q: "Em que escala devo exportar?",
          a: "Use 2× para ícones em telas retina/alta densidade, 1× quando o tamanho em pixels é conhecido e final, e 3×–4× como asset mestre do qual reduzir depois. Para um favicon, exporte no equivalente a 512 px e reduza.",
        },
        {
          q: "Converter para PNG perde a escalabilidade do SVG?",
          a: "Perde — um PNG tem resolução fixa. Por isso a ferramenta renderiza direto no tamanho alvo em vez de rasterizar pequeno e esticar. Guarde seu .svg como fonte e exporte novos PNGs sempre que precisar de outro tamanho.",
        },
        {
          q: "Os fundos transparentes sobrevivem à conversão?",
          a: "Sim. A saída é um PNG com alfa completo, então seu ícone mantém a transparência exatamente como no SVG. Só fontes e imagens externas referenciadas pelo SVG precisam estar embutidas no próprio arquivo para renderizar.",
        },
      ],
    },
  },
});
