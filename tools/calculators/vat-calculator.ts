import { CalcEngineTax } from "../_engines/calc-engine-tax";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "vat-calculator",
  category: "utility",
  icon: "file",
  engine: { component: CalcEngineTax, props: { kind: "vat" } },
  related: ["gst-calculator", "discount-calculator", "profit-calculator", "percentage-calculator"],
  copy: {
    en: {
      name: "VAT Calculator",
      tagline: "Add VAT to a net price or extract it from a gross price at any custom rate — net, VAT and gross amounts live, private and instant.",
      intro: [
        "Works in both directions for any country's rate: type 20 for the UK, 21 for the Netherlands, 19 for Germany — or any rate at all. Add tax to a net figure, or back out the VAT hiding inside a gross (tax-inclusive) price.",
        "Everything is computed locally in your browser — no uploads, no accounts — which makes it safe for pricing drafts and unpublished invoices.",
      ],
      steps: [
        "Type the amount — net if adding VAT, gross if removing it.",
        "Enter your VAT rate as a percentage (e.g. 20).",
        "Choose Add tax or Remove tax; net, VAT and gross appear instantly.",
      ],
      faqs: [
        {
          q: "How do I calculate VAT backwards from a gross price?",
          a: "Net = gross ÷ (1 + rate ÷ 100). For a £120 gross price at 20% VAT: 120 ÷ 1.2 = £100 net, £20 VAT. The “Remove tax” mode does this for you and shows all three figures.",
        },
        {
          q: "What is the difference between VAT and GST?",
          a: "They are the same kind of tax — value added at each stage of the supply chain, ultimately borne by the consumer. “VAT” is the common name in Europe, the UK and much of Africa and Asia; India and a few others call their unified version GST.",
        },
        {
          q: "Which VAT rate should I use?",
          a: "Whatever applies to your goods or services and jurisdiction: standard rates range from 0% to 27% worldwide, and most countries also have reduced rates for food, books or medicine. When unsure, check your tax authority's current table.",
        },
      ],
    },
    zh: {
      name: "VAT 增值税计算器",
      tagline: "任意自定义税率下,给净价加 VAT 或从含税价拆出 VAT,净额、税额、总额实时计算,全程浏览器本地完成。",
      intro: [
        "支持任意国家的税率、双向计算:英国 20、荷兰 21、德国 19——或任何其他税率。可以给净价加税,也可以从含税价里反推隐藏的 VAT。",
        "所有计算都在浏览器本地完成——不上传、不需要账号——用于定价草稿和未发布的发票也很安全。",
      ],
      steps: [
        "输入金额——加 VAT 时填净价,去 VAT 时填含税价。",
        "输入 VAT 税率(百分比,如 20)。",
        "选择“加税”或“拆税”,净额、VAT 与总额立即显示。",
      ],
      faqs: [
        {
          q: "怎么从含税价反推 VAT?",
          a: "净价 = 含税价 ÷ (1 + 税率 ÷ 100)。20% VAT 下 £120 的含税价:120 ÷ 1.2 = 净价 £100,VAT £20。“拆税”模式会自动完成并显示三个数字。",
        },
        {
          q: "VAT 和 GST 有什么区别?",
          a: "本质是同一类税——在供应链每个环节对增值额征税,最终由消费者承担。欧洲、英国及亚非多数国家称 VAT;印度等少数国家把统一后的版本称为 GST。",
        },
        {
          q: "应该用哪个 VAT 税率?",
          a: "用你的商品或服务、所在司法辖区适用的税率:全球标准税率从 0% 到 27%,多数国家对食品、书籍或药品还有优惠税率。拿不准时,请以税务机关现行税目表为准。",
        },
      ],
    },
    ja: {
      name: "VAT 計算(付加価値税)",
      tagline: "任意の税率で税抜価格に VAT を追加、または税込価格から VAT を抽出。税抜・税額・総額をリアルタイムにブラウザ内で計算。",
      intro: [
        "どの国の税率でも双方向に使えます。英国なら 20、オランダなら 21、ドイツなら 19——それ以外の率でも OK。税抜額に税を足すことも、税込価格に含まれる VAT を取り出すこともできます。",
        "計算はすべてブラウザ内で完結し、アップロードも登録も不要。価格のたたき台や未発行の請求書でも安心して使えます。",
      ],
      steps: [
        "金額を入力します(VAT を足すなら税抜、除くなら税込)。",
        "VAT 率をパーセントで入力します(例:20)。",
        "「税を追加」か「税を除外」を選ぶと、税抜・VAT・総額が即表示されます。",
      ],
      faqs: [
        {
          q: "税込価格から VAT を逆算するには?",
          a: "税抜 = 税込 ÷ (1 + 率 ÷ 100)。VAT 20% の税込 £120 なら 120 ÷ 1.2 = 税抜 £100、VAT £20 です。「税を除外」モードが自動で計算し、3 つの数値を表示します。",
        },
        {
          q: "VAT と GST の違いは何ですか?",
          a: "同じ種類の税です。サプライチェーンの各段階で付加価値に課税され、最終的に消費者が負担します。欧州・英国やアジア・アフリカの多くでは VAT、インドなど一部では統合版を GST と呼びます。",
        },
        {
          q: "どの VAT 率を使えばいいですか?",
          a: "対象の商品・サービスと地域に適用される率です。世界の標準税率は 0%〜27% の範囲で、食品・書籍・医薬品に軽減税率を設ける国も多いです。迷ったら税務当局の最新の税率表をご確認ください。",
        },
      ],
    },
    es: {
      name: "Calculadora de IVA",
      tagline: "Añada el IVA a un precio neto o extráigalo de uno bruto con cualquier tipo personalizado: neto, IVA y bruto en vivo, privado e instantáneo.",
      intro: [
        "Funciona en ambos sentidos con el tipo de cualquier país: escriba 20 para el Reino Unido, 21 para Países Bajos, 19 para Alemania — o cualquier otro. Añada el impuesto a una cifra neta, o saque el IVA escondido en un precio bruto con impuesto incluido.",
        "Todo se calcula localmente en su navegador — sin subidas ni cuentas — así que es seguro para borradores de precios y facturas sin publicar.",
      ],
      steps: [
        "Escriba el importe: neto si añade IVA, bruto si lo quita.",
        "Introduzca el tipo de IVA en porcentaje (p. ej. 20).",
        "Elija añadir o extraer; neto, IVA y bruto aparecen al instante.",
      ],
      faqs: [
        {
          q: "¿Cómo calculo el IVA hacia atrás desde un precio bruto?",
          a: "Neto = bruto ÷ (1 + tipo ÷ 100). Para un precio bruto de £120 con IVA del 20%: 120 ÷ 1,2 = £100 netos y £20 de IVA. El modo «Extraer impuesto» lo hace por usted y muestra las tres cifras.",
        },
        {
          q: "¿Qué diferencia hay entre IVA y GST?",
          a: "Son el mismo tipo de impuesto: valor añadido en cada eslabón de la cadena, soportado al final por el consumidor. «IVA» es el nombre habitual en Europa, el Reino Unido y buena parte de Asia y África; India y algún otro país llaman GST a su versión unificada.",
        },
        {
          q: "¿Qué tipo de IVA debo usar?",
          a: "El que corresponda a sus bienes o servicios y a su territorio: los tipos generales van del 0% al 27% en el mundo y muchos países aplican tipos reducidos a alimentos, libros o medicamentos. Ante la duda, consulte la tabla vigente de su autoridad fiscal.",
        },
      ],
    },
    pt: {
      name: "Calculadora de IVA",
      tagline: "Some o IVA a um preço líquido ou extraia-o de um preço bruto com qualquer alíquota — líquido, IVA e bruto ao vivo, privados e instantâneos.",
      intro: [
        "Funciona nos dois sentidos com a alíquota de qualquer país: digite 20 para o Reino Unido, 21 para a Holanda, 19 para a Alemanha — ou qualquer outra. Some o imposto a um valor líquido ou retire o IVA escondido num preço bruto com imposto incluído.",
        "Tudo é calculado localmente no seu navegador — sem uploads, sem cadastro — o que torna a ferramenta segura para rascunhos de preço e notas fiscais ainda não emitidas.",
      ],
      steps: [
        "Digite o valor — líquido se for somar IVA, bruto se for remover.",
        "Informe a alíquota de IVA em porcentagem (ex.: 20).",
        "Escolha somar ou remover; líquido, IVA e bruto aparecem na hora.",
      ],
      faqs: [
        {
          q: "Como calcular o IVA de trás para frente a partir do preço bruto?",
          a: "Líquido = bruto ÷ (1 + alíquota ÷ 100). Num preço bruto de £120 com IVA de 20%: 120 ÷ 1,2 = £100 líquidos e £20 de IVA. O modo «Remover imposto» faz isso e mostra os três valores.",
        },
        {
          q: "Qual a diferença entre IVA e GST?",
          a: "São o mesmo tipo de imposto: valor adicionado em cada elo da cadeia, arcado no fim pelo consumidor. «IVA» é o nome comum na Europa, no Reino Unido e em boa parte da Ásia e da África; a Índia e alguns outros chamam a versão unificada de GST.",
        },
        {
          q: "Qual alíquota devo usar?",
          a: "A que se aplicar aos seus bens ou serviços e à sua jurisdição: as alíquotas padrão vão de 0% a 27% no mundo, e muitos países têm alíquotas reduzidas para alimentos, livros ou remédios. Na dúvida, consulte a tabela atual do fisco.",
        },
      ],
    },
  },
});
