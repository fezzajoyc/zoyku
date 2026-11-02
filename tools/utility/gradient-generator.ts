import { CalcEngineGradient } from "../_engines/calc-engine-gradient";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "gradient-generator",
  category: "utility",
  icon: "palette",
  engine: { component: CalcEngineGradient },
  related: ["contrast-checker", "color-converter", "color-picker", "image-border"],
  copy: {
    en: {
      name: "CSS Gradient Generator",
      tagline:
        "Blend two to five colors into linear, radial or conic CSS gradients with a live preview, ready-to-paste code and one-click harmonized palettes.",
      intro: [
        "Pick two to five colors, choose linear, radial or conic, and drag the angle — the preview updates as you type and the CSS is always one copy away. Leave a stop's position blank and it is placed automatically the way CSS would, or set exact percentages for hard stops and off-center blends.",
        "The output ships as a real production block: a solid-color fallback line for ancient browsers, a -webkit- prefixed line for old WebKit builds, and the standard syntax last. A random-harmonize button rotates the hues of your palette in HSL space so every shuffle stays balanced instead of clashing.",
      ],
      steps: [
        "Set two to five colors, or start from a preset palette.",
        "Choose the gradient type, then set the angle or shape; optionally pin stop positions.",
        "Copy the CSS block and paste it into your stylesheet.",
      ],
      faqs: [
        {
          q: "Why does the CSS include a -webkit- prefixed line?",
          a: "It is a compatibility line for legacy WebKit browsers (roughly Safari 5–6 era) that only understood -webkit-linear-gradient. Every browser from the last decade reads the standard line, so you can delete the prefixed one if you do not need to support those versions — it costs one line to keep and nothing if you drop it.",
        },
        {
          q: "What does the angle in a linear gradient mean?",
          a: "It is the direction the gradient travels, measured clockwise from pointing up: 0deg goes bottom-to-top, 90deg left-to-right, 180deg top-to-bottom. The tool normalizes any angle you give (−45 becomes 315) and the old syntax's opposite-direction convention is handled for you in the -webkit- line.",
        },
        {
          q: "When should I use a conic gradient instead of linear or radial?",
          a: "Conic sweeps color around a center point — that is what pie charts, angle dials and sunburst effects are made of. Linear blends along a straight line and radial radiates from a center outward. Same stops, completely different geometry, so switch type and watch the preview rather than guessing.",
        },
      ],
    },
    zh: {
      name: "CSS 渐变生成器",
      tagline:
        "把 2–5 个颜色混合成线性、径向或锥形 CSS 渐变:实时预览、即贴即用的代码,还有一键随机和谐配色。",
      intro: [
        "选 2 到 5 个颜色,切换线性、径向或锥形,拖动角度——预览随输入实时更新,CSS 永远一键可复制。色标位置留空时按 CSS 规则自动布置;填上精确百分比就能做出硬分隔和偏心混合。",
        "输出的是真正的生产级代码块:给上古浏览器准备的纯色回退行、给老 WebKit 内核准备的 -webkit- 前缀行,最后是标准语法。随机和谐按钮会在 HSL 空间旋转整组色相,每次洗牌都保持协调,不会变得刺眼。",
      ],
      steps: [
        "设置 2–5 个颜色,或从预设配色开始。",
        "选择渐变类型,再调角度或形状;需要时固定色标位置。",
        "复制 CSS 代码块,粘贴进样式表。",
      ],
      faqs: [
        {
          q: "CSS 里为什么带一行 -webkit- 前缀?",
          a: "这是给老 WebKit 内核(大约 Safari 5–6 时代)准备的兼容行,它们只认 -webkit-linear-gradient。近十年的浏览器都读标准行;如果不需要照顾那些老版本,直接删掉前缀行即可——留着只多一行,删掉也没损失。",
        },
        {
          q: "线性渐变的角度是什么意思?",
          a: "角度表示渐变行进的方向,从正上方起顺时针计量:0deg 自下而上,90deg 从左到右,180deg 自上而下。工具会把你输入的任意角度归一化(−45 变 315),-webkit- 行里老语法的方向相反问题也已代你处理。",
        },
        {
          q: "什么时候用锥形渐变而不是线性或径向?",
          a: "锥形渐变围绕中心点扫过颜色——饼图、角度表盘、日冕效果都是它做的。线性沿直线混合,径向从中心向外扩散。同样的色标,几何完全不同,直接切换类型看预览,不用猜。",
        },
      ],
    },
    ja: {
      name: "CSS グラデーション生成",
      tagline:
        "2〜5 色をリニア・円形・円錐の CSS グラデーションに。ライブプレビュー、貼り付け可能なコード、ワンクリックの調和パレット付き。",
      intro: [
        "2〜5 色を選び、リニア・円形・円錐から種別を選んで角度をドラッグ — プレビューは入力に合わせて即時更新され、CSS は常にワンコピーです。ストップの位置を空欄にすると CSS と同じ規則で自動配置され、正確なパーセントを指定すればハードストップやオフセンターの混合も自在です。",
        "出力は実運用レベルのコードブロック:古いブラウザ向けの単色フォールバック行、旧 WebKit 向けの -webkit- 接頭辞行、最後に標準構文。ランダム調和ボタンはパレットの色相を HSL 空間で回転させるので、何度シャッフルしても配色が破綻しません。",
      ],
      steps: [
        "2〜5 色を設定するか、プリセットパレットから始めます。",
        "グラデーション種別を選び、角度や形状を調整。必要ならストップ位置を固定します。",
        "CSS ブロックをコピーしてスタイルシートに貼り付けます。",
      ],
      faqs: [
        {
          q: "CSS に -webkit- 接頭辞の行が含まれるのはなぜ?",
          a: "旧 WebKit ブラウザ(おおよそ Safari 5〜6 の時代)が -webkit-linear-gradient しか理解しないための互換行です。ここ 10 年のブラウザは標準行を読むので、旧バージョンに対応しないなら削除して構いません。残しても 1 行、削除しても損はありません。",
        },
        {
          q: "リニアグラデーションの角度は何を意味しますか?",
          a: "グラデーションが進む方向で、真上を 0° として時計回りに測ります:0deg は下から上、90deg は左から右、180deg は上から下です。入力した角度は正規化され(−45 は 315 に)、-webkit- 行の旧構文の逆向き規約も自動処理されます。",
        },
        {
          q: "リニアや円形ではなく円錐を使う場面は?",
          a: "円錐グラデーションは中心点の周りを色が回ります。円グラフ、角度ダイヤル、日の出効果はこれで作ります。リニアは直線に沿って、円形は中心から外へ。同じストップでも幾何がまったく違うので、種別を切り替えてプレビューで確かめるのが確実です。",
        },
      ],
    },
    es: {
      name: "Generador de degradados CSS",
      tagline:
        "Mezcla de dos a cinco colores en degradados CSS lineales, radiales o cónicos, con vista previa en vivo, código listo para pegar y paletas armonizadas a un clic.",
      intro: [
        "Elige de dos a cinco colores, selecciona lineal, radial o cónico y arrastra el ángulo — la vista previa se actualiza al escribir y el CSS está siempre a una copia de distancia. Si dejas vacía la posición de una parada se coloca automáticamente como lo haría CSS; fija porcentajes exactos para cortes duros y mezclas descentradas.",
        "La salida es un bloque de producción real: una línea de color sólido de reserva para navegadores antiguos, una línea con prefijo -webkit- para builds viejas de WebKit y la sintaxis estándar al final. El botón de armonización aleatoria rota los matices de tu paleta en el espacio HSL, así cada barajado mantiene el equilibrio en lugar de chocar.",
      ],
      steps: [
        "Fija de dos a cinco colores, o parte de una paleta predefinida.",
        "Elige el tipo de degradado y ajusta ángulo o forma; fija posiciones si quieres.",
        "Copia el bloque CSS y pégalo en tu hoja de estilos.",
      ],
      faqs: [
        {
          q: "¿Por qué el CSS incluye una línea con prefijo -webkit-?",
          a: "Es una línea de compatibilidad para navegadores WebKit antiguos (era de Safari 5–6 aproximadamente) que solo entendían -webkit-linear-gradient. Todos los navegadores de la última década leen la línea estándar, así que puedes borrar la prefijada si no necesitas dar soporte a esas versiones — mantenerla cuesta una línea y borrarla no cuesta nada.",
        },
        {
          q: "¿Qué significa el ángulo en un degradado lineal?",
          a: "Es la dirección en la que avanza el degradado, medida en sentido horario desde arriba: 0deg va de abajo hacia arriba, 90deg de izquierda a derecha, 180deg de arriba abajo. La herramienta normaliza cualquier ángulo (−45 pasa a 315) y la convención de dirección opuesta de la sintaxis vieja queda resuelta en la línea -webkit-.",
        },
        {
          q: "¿Cuándo conviene un degradado cónico en vez de lineal o radial?",
          a: "El cónico barre el color alrededor de un punto central — así se hacen gráficos de tarta, diales de ángulo y efectos de estallido solar. El lineal mezcla a lo largo de una recta y el radial se irradia desde el centro hacia fuera. Mismas paradas, geometría completamente distinta: cambia de tipo y mira la vista previa en lugar de adivinar.",
        },
      ],
    },
    pt: {
      name: "Gerador de gradientes CSS",
      tagline:
        "Mistura de duas a cinco cores em gradientes CSS lineares, radiais ou cônicos, com pré-visualização ao vivo, código pronto para colar e paletas harmonizadas.",
      intro: [
        "Escolha de duas a cinco cores, selecione linear, radial ou cônico e arraste o ângulo — a pré-visualização atualiza enquanto você digita e o CSS está sempre a uma cópia de distância. Deixe a posição de uma parada em branco e ela é colocada automaticamente como o CSS faria; defina porcentagens exatas para cortes duros e misturas descentralizadas.",
        "A saída é um bloco de produção de verdade: uma linha de fallback com cor sólida para navegadores antigos, uma linha com prefixo -webkit- para builds antigas do WebKit e a sintaxe padrão por último. O botão de harmonização aleatória gira os matizes da paleta no espaço HSL, então cada embaralhada continua equilibrada em vez de virar bagunça.",
      ],
      steps: [
        "Defina de duas a cinco cores, ou comece de uma paleta predefinida.",
        "Escolha o tipo de gradiente e ajuste ângulo ou forma; fixe posições se quiser.",
        "Copie o bloco CSS e cole na sua folha de estilos.",
      ],
      faqs: [
        {
          q: "Por que o CSS inclui uma linha com prefixo -webkit-?",
          a: "É uma linha de compatibilidade para navegadores WebKit antigos (era do Safari 5–6, mais ou menos) que só entendiam -webkit-linear-gradient. Todo navegador da última década lê a linha padrão, então você pode apagar a prefixada se não precisar dar suporte a essas versões — mantê-la custa uma linha; removê-la não custa nada.",
        },
        {
          q: "O que significa o ângulo em um gradiente linear?",
          a: "É a direção em que o gradiente avança, medida no sentido horário a partir de cima: 0deg vai de baixo para cima, 90deg da esquerda para a direita, 180deg de cima para baixo. A ferramenta normaliza qualquer ângulo (−45 vira 315) e a convenção de direção oposta da sintaxe antiga já vem resolvida na linha -webkit-.",
        },
        {
          q: "Quando usar um gradiente cônico em vez de linear ou radial?",
          a: "O cônico varre a cor ao redor de um ponto central — é assim que se fazem gráficos de pizza, mostradores de ângulo e efeitos de explosão solar. O linear mistura ao longo de uma reta e o radial se irradia do centro para fora. Mesmas paradas, geometria completamente diferente: troque o tipo e observe a pré-visualização em vez de adivinhar.",
        },
      ],
    },
  },
});
