import { CalcEngineContrast } from "../_engines/calc-engine-contrast";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "contrast-checker",
  category: "utility",
  icon: "palette",
  engine: { component: CalcEngineContrast },
  related: ["color-converter", "color-picker", "grade-calculator"],
  copy: {
    en: {
      name: "Contrast Checker",
      tagline:
        "Check the WCAG contrast ratio between two colors with AA and AAA pass/fail for normal and large text, plus a live preview. Runs entirely in your browser.",
      intro: [
        "Enter a foreground and a background color — hex like #333 or #1F2937, or rgb()/rgba() — and get the WCAG contrast ratio to two decimals, with immediate pass/fail badges for the four thresholds that matter: AA and AAA, for normal and large text. A live preview shows both a body-text and a large-text sample in the actual colors.",
        "The math is the official WCAG 2.x relative-luminance formula — the same one the W3C checker uses — so a 4.5 here is a 4.5 everywhere. Presets include a borderline 4.54:1 gray pair so you can see how tight the AA line really is.",
      ],
      steps: [
        "Type a hex or rgb() value, or use the color picker, for the foreground.",
        "Do the same for the background color.",
        "Read the ratio and the AA / AAA badges, or tap a preset pair.",
        "Check the preview block to judge the pairing with your own eyes.",
      ],
      faqs: [
        {
          q: "What contrast ratio do I need to pass?",
          a: "WCAG 2.x: normal body text needs 4.5:1 for AA and 7:1 for AAA. Large text — at least 24 px, or 18.7 px bold — needs 3:1 for AA and 4.5:1 for AAA. UI components and graphical objects need 3:1.",
        },
        {
          q: "How is the ratio calculated?",
          a: "Each color is linearized from sRGB and combined into a relative luminance L = 0.2126·R + 0.7152·G + 0.0722·B; the ratio is (L lighter + 0.05) / (L darker + 0.05). That is the exact formula from the WCAG 2.x specification, matching the W3C's own checker.",
        },
        {
          q: "What about semi-transparent colors?",
          a: "An rgba() alpha below 1 is flattened onto white before the ratio is computed. WCAG itself has no alpha concept — composite the color over its real background first, or enter the resulting opaque color, for authoritative numbers.",
        },
      ],
    },
    zh: {
      name: "对比度检查器",
      tagline:
        "计算两个颜色的 WCAG 对比度,并给出正文 / 大字在 AA、AAA 档位的通过徽章,附实时预览。全部在浏览器本地完成,数据不出设备。",
      intro: [
        "输入前景色和背景色——#333、#1F2937 这样的 hex,或 rgb()/rgba()——即可得到保留两位小数的 WCAG 对比度,并立刻看到四个关键档位的通过 / 不通过徽章:AA 与 AAA,分别对应正文和大字。预览区会用真实颜色渲染一段正文和大字示例。",
        "计算用的是 WCAG 2.x 官方相对亮度公式,与 W3C 官方检查器一致——这里的 4.5 放到哪都是 4.5。预设里有一个 4.54:1 的压线灰白组合,让你直观感受 AA 及格线有多紧。",
      ],
      steps: [
        "为前景色输入 hex 或 rgb() 值,或使用取色器。",
        "同样设置背景色。",
        "查看对比度与 AA / AAA 徽章,或点一个预设组合。",
        "看一眼预览块,用肉眼确认这对配色。",
      ],
      faqs: [
        {
          q: "对比度多少才算合格?",
          a: "WCAG 2.x 规定:正文 AA 需要 4.5:1,AAA 需要 7:1;大字(≥ 24px,或 ≥ 18.7px 粗体)AA 需要 3:1,AAA 需要 4.5:1。UI 组件和图形元素需要 3:1。",
        },
        {
          q: "对比度是怎么算出来的?",
          a: "先把 sRGB 通道线性化,再合成相对亮度 L = 0.2126·R + 0.7152·G + 0.0722·B;对比度 = (较亮 L + 0.05) / (较暗 L + 0.05)。这正是 WCAG 2.x 规范原文公式,与 W3C 官方检查器结果一致。",
        },
        {
          q: "半透明颜色怎么处理?",
          a: "alpha 小于 1 的 rgba() 会先压平到白底再计算。WCAG 本身没有透明度概念——想要权威数值,请先把颜色合成到真实背景上,或直接输入合成后的不透明颜色。",
        },
      ],
    },
    ja: {
      name: "コントラストチェッカー",
      tagline:
        "2 色の WCAG コントラスト比を算出し、通常文字 / 拡大文字ごとの AA・AAA 合否をバッジで表示。プレビュー付きで、処理はすべてブラウザ内です。",
      intro: [
        "前景色と背景色(#333 や #1F2937 のような HEX、rgb()/rgba() も可)を入力すると、小数第 2 位までの WCAG コントラスト比と、重要な 4 つのしきい値(AA と AAA、通常文字と拡大文字)の合否バッジがすぐ出ます。プレビューでは実際の色で本文と大きめの文字サンプルを確認できます。",
        "計算は WCAG 2.x 公式の相対輝度の式で、W3C のチェッカーと同じものです — ここの 4.5 はどこでも 4.5 です。プリセットには 4.54:1 のぎりぎりのグレー×白の組み合わせがあり、AA のラインがどれだけ厳しいか体感できます。",
      ],
      steps: [
        "前景色に HEX か rgb() を入力するか、カラーピッカーで選びます。",
        "同じく背景色を設定します。",
        "コントラスト比と AA / AAA バッジを確認するか、プリセットをタップします。",
        "プレビューで実際の見え方を自分の目で確かめます。",
      ],
      faqs: [
        {
          q: "合格に必要なコントラスト比は?",
          a: "WCAG 2.x では通常の本文は AA で 4.5:1、AAA で 7:1。大きめの文字(24px 以上、または 18.7px 以上の太字)は AA で 3:1、AAA で 4.5:1 です。UI 部品や図形は 3:1 が基準です。",
        },
        {
          q: "コントラスト比はどう計算していますか?",
          a: "sRGB チャンネルを線形化して相対輝度 L = 0.2126·R + 0.7152·G + 0.0722·B を求め、比 = (明るい方の L + 0.05) / (暗い方の L + 0.05) とします。WCAG 2.x 仕様書の式そのもので、W3C の公式チェッカーと一致します。",
        },
        {
          q: "半透明の色はどう扱われますか?",
          a: "alpha が 1 未満の rgba() は白にフラット化してから計算します。WCAG 自体に透明度の概念はないため、正式な数値が必要なら実際の背景に合成した不透明色を入力してください。",
        },
      ],
    },
    es: {
      name: "Comprobador de contraste",
      tagline:
        "Calcula la relación de contraste WCAG entre dos colores con distintivos AA y AAA para texto normal y grande, y vista previa en vivo. Todo en tu navegador.",
      intro: [
        "Introduce un color de primer plano y otro de fondo — hex como #333 o #1F2937, o rgb()/rgba() — y obtén la relación de contraste WCAG con dos decimales, con distintivos inmediatos de aprueba / no aprueba para los cuatro umbrales que importan: AA y AAA, para texto normal y grande. Una vista previa en vivo muestra texto de cuerpo y texto grande con los colores reales.",
        "El cálculo usa la fórmula oficial de luminancia relativa de WCAG 2.x — la misma del comprobador del W3C — así que un 4.5 aquí es un 4.5 en todas partes. Entre los ajustes hay un par gris de 4.54:1 justo en el límite para que veas lo ajustada que es la barra del AA.",
      ],
      steps: [
        "Escribe un valor hex o rgb(), o usa el selector, para el primer plano.",
        "Haz lo mismo con el color de fondo.",
        "Lee la relación y los distintivos AA / AAA, o toca un par predefinido.",
        "Mira el bloque de vista previa para juzgar la combinación con tus ojos.",
      ],
      faqs: [
        {
          q: "¿Qué relación de contraste necesito para aprobar?",
          a: "WCAG 2.x: el texto normal necesita 4.5:1 para AA y 7:1 para AAA. El texto grande — 24 px o más, o 18.7 px en negrita — necesita 3:1 para AA y 4.5:1 para AAA. Los componentes de interfaz y los gráficos necesitan 3:1.",
        },
        {
          q: "¿Cómo se calcula la relación?",
          a: "Cada color se linealiza desde sRGB y se combina en una luminancia relativa L = 0.2126·R + 0.7152·G + 0.0722·B; la relación es (L claro + 0.05) / (L oscuro + 0.05). Es la fórmula exacta de la especificación WCAG 2.x, idéntica a la del comprobador oficial del W3C.",
        },
        {
          q: "¿Y los colores semitransparentes?",
          a: "Un alfa rgba() menor que 1 se aplana sobre blanco antes de calcular. WCAG no tiene concepto de transparencia — compón el color sobre su fondo real o introduce el color opaco resultante para obtener cifras autorizadas.",
        },
      ],
    },
    pt: {
      name: "Verificador de contraste",
      tagline:
        "Calcule a taxa de contraste WCAG entre duas cores com selos AA e AAA para texto normal e grande, além de pré-visualização ao vivo. Tudo no navegador.",
      intro: [
        "Informe uma cor de texto e uma de fundo — hex como #333 ou #1F2937, ou rgb()/rgba() — e receba a taxa de contraste WCAG com duas casas decimais, com selos imediatos de passa / não passa para os quatro limites que importam: AA e AAA, para texto normal e grande. Uma pré-visualização ao vivo mostra texto de corpo e texto grande nas cores reais.",
        "O cálculo usa a fórmula oficial de luminância relativa do WCAG 2.x — a mesma do verificador do W3C — então um 4.5 aqui é 4.5 em qualquer lugar. Os presets incluem um par cinza de 4.54:1 bem na linha para você sentir o quanto o limite do AA é apertado.",
      ],
      steps: [
        "Digite um valor hex ou rgb(), ou use o seletor, para a cor do texto.",
        "Faça o mesmo para a cor de fundo.",
        "Leia a taxa e os selos AA / AAA, ou toque em um par predefinido.",
        "Confira o bloco de pré-visualização para julgar a combinação com os próprios olhos.",
      ],
      faqs: [
        {
          q: "Qual taxa de contraste eu preciso para passar?",
          a: "WCAG 2.x: texto normal precisa de 4.5:1 para AA e 7:1 para AAA. Texto grande — pelo menos 24 px, ou 18.7 px em negrito — precisa de 3:1 para AA e 4.5:1 para AAA. Componentes de interface e elementos gráficos precisam de 3:1.",
        },
        {
          q: "Como a taxa é calculada?",
          a: "Cada cor é linearizada do sRGB e combinada em uma luminância relativa L = 0.2126·R + 0.7152·G + 0.0722·B; a taxa é (L mais claro + 0.05) / (L mais escuro + 0.05). É a fórmula exata da especificação WCAG 2.x, idêntica à do verificador oficial do W3C.",
        },
        {
          q: "E cores semitransparentes?",
          a: "Um alfa rgba() abaixo de 1 é achatado sobre o branco antes do cálculo. O WCAG não tem conceito de transparência — componha a cor sobre o fundo real primeiro, ou informe a cor opaca resultante, para números oficiais.",
        },
      ],
    },
  },
});
