import { ImageWatermarkEngine } from "../_engines/image-engine-watermark";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "watermark-image",
  category: "image",
  icon: "image",
  engine: { component: ImageWatermarkEngine },
  related: ["image-resizer", "crop-image", "exif-remover", "image-compressor", "grayscale-image", "image-border", "image-splitter", "compress-image-to-size", "crop-circle-image", "heic-to-jpg"],
  copy: {
    en: {
      name: "Watermark Image",
      tagline: "Add a text watermark to images — position, opacity, size or tile it, processed entirely in your browser.",
      intro: [
        "Protect drafts, proofs and photos with a text watermark you fully control: place it in any corner or center, tile it across the whole image, tune size and opacity — the watermarked copies are generated on your device.",
        "Nothing is uploaded, so you can watermark unreleased work, client proofs and confidential scans without sending them anywhere.",
      ],
      steps: [
        "Drop in one image or a whole batch.",
        "Type the watermark text and set opacity, size, position — or enable tiling.",
        "Apply and download each watermarked copy.",
      ],
      faqs: [
        {
          q: "Can someone remove my watermark?",
          a: "A visible watermark is a deterrent, not encryption — anything visible can be edited out with effort. For real protection, share low-resolution proofs instead.",
        },
        {
          q: "Does it work with transparent PNGs?",
          a: "Output is JPG, so transparency is flattened onto white. Watermark the original PNG with a background color of your choice if you need alpha.",
        },
      ],
    },
    zh: {
      name: "图片加水印",
      tagline: "给图片加文字水印:位置、透明度、大小、平铺全图自选,全程浏览器本地处理。",
      intro: [
        "给草稿、样片和照片加上完全可控的文字水印:九宫格任选位置、可平铺全图、透明度大小随意调——带水印的副本在你的设备上生成。",
        "不上传任何文件,未发布的作品、客户样片、机密扫描件都可以放心处理。",
      ],
      steps: [
        "拖入一张或多张图片。",
        "输入水印文字,调整透明度、大小、位置,或开启平铺。",
        "点击添加,逐张下载带水印的副本。",
      ],
      faqs: [
        {
          q: "水印能被去掉吗?",
          a: "可见水印是威慑不是加密——只要看得见就有人能花功夫修掉。真要保护,建议分享低分辨率样片。",
        },
        {
          q: "支持透明 PNG 吗?",
          a: "输出是 JPG,透明区域会变成白色底。需要保留透明通道的话,请用 PNG 输出的工具处理。",
        },
      ],
    },
    ja: {
      name: "画像にウォーターマーク",
      tagline: "画像に文字ウォーターマークを追加。位置・不透明度・サイズ・タイル表示を自由に設定、処理はすべてブラウザ内。",
      intro: [
        "下書き・校正用画像・写真に、完全に制御できる文字ウォーターマークを:9 宮格の好きな位置、全画面タイル、サイズと不透明度を調整——ウォーターマーク付きのコピーは端末内で生成されます。",
        "アップロードが一切ないので、未公開の作品やクライアント向け校正画像も安心して処理できます。",
      ],
      steps: [
        "画像を 1 枚でもまとめてでもドロップします。",
        "文字を入力し、不透明度・サイズ・位置を設定(タイルも可)。",
        "適用して、各コピーをダウンロードします。",
      ],
      faqs: [
        {
          q: "ウォーターマークは消せますか?",
          a: "可視ウォーターマークは抑止力であって暗号化ではありません。本気で保護するなら、低解像度の校正画像を共有してください。",
        },
        {
          q: "透明 PNG にも使えますか?",
          a: "出力は JPG のため透明部分は白に置き換わります。アルファが必要な場合は PNG 出力のツールをご利用ください。",
        },
      ],
    },
    es: {
      name: "Marca de agua en imagen",
      tagline: "Añade una marca de agua de texto a tus imágenes: posición, opacidad, tamaño o mosaico, procesado 100% local.",
      intro: [
        "Protege borradores, pruebas y fotos con una marca de texto que controlas del todo: colócala en cualquier esquina o centro, tesélala por toda la imagen y ajusta tamaño y opacidad; las copias se generan en tu dispositivo.",
        "No se sube nada, así que puedes marcar trabajo sin publicar, pruebas de cliente y escaneos confidenciales sin enviarlos a ningún sitio.",
      ],
      steps: [
        "Suelta una imagen o un lote entero.",
        "Escribe el texto y ajusta opacidad, tamaño y posición, o activa el mosaico.",
        "Aplica y descarga cada copia marcada.",
      ],
      faqs: [
        {
          q: "¿Pueden quitar mi marca de agua?",
          a: "Una marca visible disuade, no cifra: lo visible se puede editar con esfuerzo. Para protección real, comparte pruebas en baja resolución.",
        },
        {
          q: "¿Funciona con PNG transparentes?",
          a: "La salida es JPG, así que la transparencia se aplana sobre blanco. Si necesitas alfa, usa una herramienta con salida PNG.",
        },
      ],
    },
    pt: {
      name: "Marca d'água em imagem",
      tagline: "Adicione marca d'água de texto às imagens — posição, opacidade, tamanho ou mosaico, tudo processado no navegador.",
      intro: [
        "Proteja rascunhos, provas e fotos com uma marca de texto sob controle total: posicione em qualquer canto ou centro, aplique em mosaico, ajuste tamanho e opacidade — as cópias são geradas no seu dispositivo.",
        "Nada é enviado, então você pode marcar trabalhos não publicados, provas de clientes e escaneamentos confidenciais sem enviá-los para lugar nenhum.",
      ],
      steps: [
        "Solte uma imagem ou um lote inteiro.",
        "Digite o texto e ajuste opacidade, tamanho e posição — ou ative o mosaico.",
        "Aplique e baixe cada cópia marcada.",
      ],
      faqs: [
        {
          q: "Dá para remover minha marca d'água?",
          a: "Marca visível é um deterrente, não criptografia — o que é visível pode ser editado com esforço. Para proteção real, compartilhe provas em baixa resolução.",
        },
        {
          q: "Funciona com PNG transparente?",
          a: "A saída é JPG, então a transparência é achatada no branco. Se precisar de alfa, use uma ferramenta com saída PNG.",
        },
      ],
    },
  },
});
