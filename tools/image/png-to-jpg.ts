import { ImageCanvasEngine } from "../_engines/image-engine-canvas";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "png-to-jpg",
  category: "image",
  icon: "image",
  engine: {
    component: ImageCanvasEngine,
    props: { op: "convert", accept: "image/png,.png", defaultFormat: "image/jpeg", defaultQuality: 0.92, lockFormat: true, suffix: "" },
  },
  related: ["jpg-to-png", "convert-image", "image-compressor", "exif-remover", "image-border", "image-splitter", "compress-image-to-size", "grayscale-image", "crop-circle-image", "crop-image"],
  copy: {
    en: {
      name: "PNG to JPG",
      tagline:
        "Convert PNG images to JPG and shrink file size dramatically — transparent areas get a clean white background and quality stays adjustable.",
      intro: [
        "Turn heavy .png files into compact .jpg copies that upload faster and open everywhere. A quality slider (default 92%) keeps the result visually indistinguishable while cutting the size by 60–90% for typical screenshots and photos.",
        "PNG transparency cannot survive in JPG, so transparent areas are flattened onto pure white — the standard treatment for forms, avatars and marketplaces that only accept JPEG. Batch mode handles a whole folder in one go.",
      
        "JPEG is lossy DCT compression designed for photographic content; at 92% quality it typically matches the source visually at a fraction of PNG's size. Transparency is the real constraint: JPG has no alpha channel, so the tool flattens transparent regions onto white — the standard treatment most platforms expect.",
        "Compared with generic 'convert' tools, the quality slider is explicit and the output size is shown per file, so you can trade a smaller download for a softer image knowingly. And because re-encoding happens in your browser, a folder of product screenshots converts without hitting an upload cap or a privacy policy.",
      ],
      steps: [
        "Drop your PNG images — one or many.",
        "Adjust the JPG quality if you want smaller files or maximum fidelity.",
        "Download the JPG files individually or all at once.",
      ],
      faqs: [
        {
          q: "What happens to transparent areas when converting PNG to JPG?",
          a: "JPG has no alpha channel, so transparent pixels are filled with solid white before saving. If you need a different backdrop color, or must keep real transparency, stay with PNG (or use WebP).",
        },
        {
          q: "How much smaller will the JPG be?",
          a: "Typically 60–90% smaller for screenshots and photos. Flat graphics with sharp edges compress less dramatically and may show slight fuzziness at low quality — keep the slider above 85% for text and UI images.",
        },
        {
          q: "Can conversion make the image sharper or fix artifacts?",
          a: "No. Converting only changes the encoding; it cannot add detail. If the PNG itself already looks soft, the JPG will look equally soft (possibly with faint compression noise at very low quality settings).",
        },
      ],
    },
    zh: {
      name: "PNG 转 JPG",
      tagline: "PNG 一键转 JPG,体积大幅缩小,透明区域自动铺白底,画质可调——批量处理,本地完成不上传。",
      intro: [
        "把体积庞大的 .png 变成紧凑的 .jpg,上传更快、处处能开。画质滑块默认 92%,肉眼几乎看不出差别,而常见的截图和照片体积可缩减 60–90%。",
        "JPG 不支持透明,所以透明区域会铺成纯白色——这也是各类表单、头像和电商平台只收 JPEG 时的标准处理方式。批量模式一次搞定整个文件夹。",
      ],
      steps: [
        "拖入一张或多张 PNG 图片。",
        "需要更小体积或最高保真时,调整 JPG 画质。",
        "逐张或一键下载 JPG。",
      ],
      faqs: [
        {
          q: "PNG 转 JPG 时透明区域会怎样?",
          a: "JPG 没有 alpha 通道,透明像素会在保存前填充为纯白。如果需要其他底色,或必须保留真透明,请继续用 PNG(或改用 WebP)。",
        },
        {
          q: "JPG 能小多少?",
          a: "截图和照片通常能缩小 60–90%。边缘锐利的扁平图形缩幅较小,低画质下可能出现轻微模糊——文字和 UI 截图建议画质保持在 85% 以上。",
        },
        {
          q: "转换能让图片更清晰或修复瑕疵吗?",
          a: "不能。转换只改变编码方式,无法补充细节。如果 PNG 本身就偏软,JPG 只会同样偏软(画质设得很低时还可能叠加轻微压缩噪点)。",
        },
      ],
    },
    ja: {
      name: "PNG から JPG へ変換",
      tagline:
        "PNG を JPG に変換してファイルサイズを大幅削減。透明部分は白背景になり、品質は自由に調整——一括処理でローカル完結、アップロードなし。",
      intro: [
        "重い .png をコンパクトな .jpg に変えて、アップロードを速く、どこでも開けるように。品質スライダー(既定 92%)は視覚的な違いをほぼ残したまま、一般的なスクリーンショットや写真で 60〜90% のサイズ削減を実現します。",
        "JPG は透過を保持できないため、透明部分は真っ白に平らになります。これは JPEG のみを受け付けるフォーム・アイコン・マーケットプレイスでの標準的な扱いです。一括モードならフォルダ単位でも一度で処理できます。",
      ],
      steps: [
        "PNG 画像を 1 枚でも複数でもドロップします。",
        "より小さいファイルか最大限の忠実度かで、JPG 品質を調整します。",
        "JPG を 1 枚ずつ、またはまとめてダウンロードします。",
      ],
      faqs: [
        {
          q: "PNG から JPG への変換で透明部分はどうなりますか?",
          a: "JPG にアルファチャンネルはないため、透明ピクセルは保存前に白で塗りつぶされます。別の背景色が必要な場合や、真の透過を保ちたい場合は PNG(または WebP)のままにしてください。",
        },
        {
          q: "JPG はどれくらい小さくなりますか?",
          a: "スクリーンショットや写真なら通常 60〜90% 小さくなります。エッジの鋭いフラットなグラフィックは削減率が小さく、低品質ではわずかなにじみが出ることがあります。文字や UI 画像は品質 85% 以上を推奨します。",
        },
        {
          q: "変換で画像がシャープになったり、ノイズを修復したりしますか?",
          a: "しません。変換はエンコードを変えるだけでディテールを追加できません。元の PNG がすでに soft なら JPG も同様で、極端に低い品質設定ではわずかな圧縮ノイズが加わることもあります。",
        },
      ],
    },
    es: {
      name: "PNG a JPG",
      tagline:
        "Convierte imágenes PNG a JPG y reduce el tamaño drásticamente — las zonas transparentes reciben un fondo blanco limpio y la calidad es ajustable.",
      intro: [
        "Convierte esos .png pesados en copias .jpg compactas que se suben más rápido y se abren en cualquier sitio. El deslizador de calidad (92% por defecto) mantiene el resultado visualmente idéntico mientras recorta un 60–90% del tamaño en capturas y fotos habituales.",
        "La transparencia PNG no puede sobrevivir en JPG, así que las zonas transparentes se aplanan sobre blanco puro: el tratamiento estándar para formularios, avatares y marketplaces que solo aceptan JPEG. El modo por lotes procesa una carpeta entera de una vez.",
      ],
      steps: [
        "Suelta tus imágenes PNG — una o muchas.",
        "Ajusta la calidad del JPG si quieres archivos más pequeños o máxima fidelidad.",
        "Descarga los JPG individualmente o todos a la vez.",
      ],
      faqs: [
        {
          q: "¿Qué pasa con las zonas transparentes al convertir PNG a JPG?",
          a: "JPG no tiene canal alfa, así que los píxeles transparentes se rellenan de blanco puro antes de guardar. Si necesitas otro color de fondo o mantener transparencia real, quédate con PNG (o usa WebP).",
        },
        {
          q: "¿Cuánto pesará menos el JPG?",
          a: "Normalmente entre un 60 y un 90% menos en capturas y fotos. Los gráficos planos con bordes nítidos se comprimen menos y pueden mostrar un ligero difuminado con calidad baja: mantén el deslizador por encima de 85% para texto e imágenes de interfaz.",
        },
        {
          q: "¿La conversión puede hacer la imagen más nítida o reparar artefactos?",
          a: "No. Convertir solo cambia la codificación; no añade detalle. Si el PNG ya se ve blando, el JPG se verá igual de blando (quizá con un leve ruido de compresión con calidades muy bajas).",
        },
      ],
    },
    pt: {
      name: "PNG para JPG",
      tagline:
        "Converta imagens PNG em JPG e reduza o tamanho drasticamente — áreas transparentes ganham fundo branco limpo e a qualidade é ajustável.",
      intro: [
        "Transforme aqueles .png pesados em cópias .jpg compactas que sobem mais rápido e abrem em qualquer lugar. O controle de qualidade (92% por padrão) mantém o resultado visualmente idêntico enquanto corta 60–90% do tamanho em capturas e fotos comuns.",
        "A transparência de PNG não sobrevive no JPG, então as áreas transparentes são achatadas sobre branco puro — o tratamento padrão para formulários, avatares e marketplaces que só aceitam JPEG. O modo em lote processa uma pasta inteira de uma vez.",
      ],
      steps: [
        "Solte suas imagens PNG — uma ou muitas.",
        "Ajuste a qualidade do JPG se quiser arquivos menores ou fidelidade máxima.",
        "Baixe os JPGs individualmente ou todos de uma vez.",
      ],
      faqs: [
        {
          q: "O que acontece com as áreas transparentes ao converter PNG para JPG?",
          a: "O JPG não tem canal alfa, então os pixels transparentes são preenchidos com branco puro antes de salvar. Se precisar de outra cor de fundo ou de transparência real, fique com PNG (ou use WebP).",
        },
        {
          q: "Quanto menor fica o JPG?",
          a: "Normalmente 60–90% menor para capturas e fotos. Gráficos planos com bordas nítidas comprimem menos e podem ficar levemente desfocados em qualidade baixa — mantenha o controle acima de 85% para textos e imagens de interface.",
        },
        {
          q: "A conversão deixa a imagem mais nítida ou corrige artefatos?",
          a: "Não. Converter só muda a codificação; não adiciona detalhe. Se o PNG já parece macio, o JPG ficará igualmente macio (talvez com um leve ruído de compressão em qualidades muito baixas).",
        },
      ],
    },
  },
});
