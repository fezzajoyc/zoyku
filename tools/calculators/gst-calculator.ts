import { CalcEngineTax } from "../_engines/calc-engine-tax";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "gst-calculator",
  category: "utility",
  icon: "shield",
  engine: { component: CalcEngineTax, props: { kind: "gst" } },
  related: ["vat-calculator", "discount-calculator", "profit-calculator", "percentage-calculator"],
  copy: {
    en: {
      name: "GST Calculator",
      tagline: "Add or extract GST at the 5%, 12%, 18% and 28% slab rates — net, tax and gross amounts computed live in your browser.",
      intro: [
        "Enter any amount and pick one of India's four GST slabs to add tax to a net price, or remove the GST already included in a gross (MRP) price. All three figures — net, tax and gross — update as you type.",
        "Useful for invoices, reverse charge checks, shopping comparisons between states with different slabs, and understanding exactly how much of a sticker price is tax.",
      ],
      steps: [
        "Type the amount — net if adding GST, gross if extracting it.",
        "Choose the applicable slab: 5%, 12%, 18% or 28%.",
        "Pick Add tax or Remove tax and read the net, tax and gross figures.",
      ],
      faqs: [
        {
          q: "What are the GST slabs in India?",
          a: "The main rates are 5%, 12%, 18% and 28%: essentials sit at 0–5%, most goods and services at 12–18%, and luxury or sin goods at 28% (sometimes with an additional cess). The tool covers the four standard slabs.",
        },
        {
          q: "How do I remove GST from a tax-inclusive price?",
          a: "Choose “Remove tax” and enter the gross amount. The base is recovered as gross ÷ (1 + rate/100), so a ₹118 gross price at 18% GST has a net of ₹100 and ₹18 of tax.",
        },
        {
          q: "Is GST the same as VAT?",
          a: "Both are value-added taxes charged at each stage, but GST in India is a single unified tax subsuming central excise, service tax and state VAT, split into CGST + SGST (intra-state) or IGST (inter-state). Other countries call their equivalent simply VAT.",
        },
      ],
    },
    zh: {
      name: "GST 计算器(印度消费税)",
      tagline: "按 5%、12%、18%、28% 四档 GST 税率价外加税或价内拆税,净额、税额、含税额实时计算,浏览器本地完成。",
      intro: [
        "输入任意金额并选择印度四档 GST 税率之一:可以给净价加税,也可以从含税价(如 MRP)中拆出 GST。净额、税额、含税额三项随输入实时更新。",
        "适合开发票、核对反向征收、比较不同税档邦之间的价格,以及看清标价里到底含多少税。",
      ],
      steps: [
        "输入金额——加 GST 时填净价,拆 GST 时填含税价。",
        "选择适用税档:5%、12%、18% 或 28%。",
        "选择“价外加税”或“价内拆税”,查看净额、税额与含税额。",
      ],
      faqs: [
        {
          q: "印度的 GST 税档有哪些?",
          a: "主要税率为 5%、12%、18%、28%:生活必需品为 0–5%,大多数商品和服务为 12–18%,奢侈品及特定商品为 28%(有的还要加征 cess)。本工具覆盖四个标准税档。",
        },
        {
          q: "怎么从含税价里拆出 GST?",
          a: "选择“价内拆税”并输入含税金额。净价 = 含税价 ÷ (1 + 税率/100):例如含 18% GST 的 ₹118,净价为 ₹100,税额为 ₹18。",
        },
        {
          q: "GST 和 VAT 是一回事吗?",
          a: "两者都是逐环节征收的增值税,但印度 GST 是统一税种,合并了中央消费税、服务税和各邦 VAT,邦内交易拆为 CGST + SGST,跨邦为 IGST。其他国家通常直接称为 VAT。",
        },
      ],
    },
    ja: {
      name: "GST 計算(インド)",
      tagline: "5%・12%・18%・28% の GST 税率で税抜⇔税込を雙方向に計算。税抜額・税額・税込額をリアルタイム表示します。",
      intro: [
        "金額を入力してインドの 4 つの GST 税区分からひとつ選ぶだけ。税抜価格に税を上乗せすることも、税込価格(MRP など)から GST を取り出すこともできます。税抜・税額・税込の 3 つが入力に合わせて更新されます。",
        "請求書の作成、リバースチャージの確認、税区分の違う州間の価格比較、表示価格のうちいくらが税かの把握に便利です。",
      ],
      steps: [
        "金額を入力します(税を足すなら税抜、取り除くなら税込)。",
        "該当する税区分(5%・12%・18%・28%)を選びます。",
        "「税を追加」か「税を除外」を選び、税抜・税額・税込を確認します。",
      ],
      faqs: [
        {
          q: "インドの GST 税区分は?",
          a: "主な税率は 5%・12%・18%・28% です。生活必需品は 0〜5%、多くの商品・サービスは 12〜18%、贅沢品や嗜好品は 28%(さらに cess が加わる場合も)。このツールは 4 つの標準区分に対応します。",
        },
        {
          q: "税込価格から GST を除くには?",
          a: "「税を除外」を選んで税込額を入力します。税抜額 = 税込額 ÷ (1 + 税率/100) で求まります。たとえば GST 18% の税込 ₹118 は、税抜 ₹100・税額 ₹18 です。",
        },
        {
          q: "GST と VAT は同じですか?",
          a: "どちらも各段階で課税する付加価値税ですが、インドの GST は中央の物品税・サービス税・州 VAT を統合した単一税で、州内取引は CGST + SGST、州間取引は IGST に分かれます。他国では同じ仕組みを単に VAT と呼びます。",
        },
      ],
    },
    es: {
      name: "Calculadora de GST",
      tagline: "Añada o extraiga el GST a las tramos del 5%, 12%, 18% y 28%: importe neto, impuesto y bruto calculados en vivo en su navegador.",
      intro: [
        "Introduzca un importe y elija uno de los cuatro tramos de GST de India para añadir el impuesto a un precio neto, o para extraer el GST ya incluido en un precio bruto (MRP). Los tres valores — neto, impuesto y bruto — se actualizan al escribir.",
        "Útil para facturas, comprobaciones de inversión del sujeto pasivo, comparar precios entre estados con tramos distintos y saber cuánto impuesto lleva exactamente un precio de etiqueta.",
      ],
      steps: [
        "Escriba el importe: neto si añade GST, bruto si lo extrae.",
        "Elija el tramo aplicable: 5%, 12%, 18% o 28%.",
        "Elija añadir o extraer el impuesto y lea neto, impuesto y bruto.",
      ],
      faqs: [
        {
          q: "¿Cuáles son los tramos del GST en India?",
          a: "Los tipos principales son 5%, 12%, 18% y 28%: los productos básicos van de 0% a 5%, la mayoría de bienes y servicios de 12% a 18%, y los de lujo o perjudiciales al 28% (a veces con un cess adicional). La herramienta cubre los cuatro tramos estándar.",
        },
        {
          q: "¿Cómo quito el GST de un precio con impuesto incluido?",
          a: "Elija «Extraer impuesto» e introduzca el importe bruto. La base se recupera como bruto ÷ (1 + tipo/100): un precio bruto de ₹118 con GST del 18% tiene un neto de ₹100 y ₹18 de impuesto.",
        },
        {
          q: "¿El GST es lo mismo que el IVA (VAT)?",
          a: "Ambos son impuestos sobre el valor añadido cobrados en cada fase, pero el GST indio es un impuesto unificado que absorbió el impuesto especial central, el de servicios y el VAT estatal, dividido en CGST + SGST (intrastatal) o IGST (interestatal). Otros países llaman simplemente IVA al equivalente.",
        },
      ],
    },
    pt: {
      name: "Calculadora de GST",
      tagline: "Adicione ou extraia o GST nas faixas de 5%, 12%, 18% e 28% — valores líquido, imposto e bruto calculados ao vivo no navegador.",
      intro: [
        "Digite um valor e escolha uma das quatro faixas de GST da Índia para somar o imposto a um preço líquido ou retirar o GST já embutido num preço bruto (MRP). Os três números — líquido, imposto e bruto — atualizam enquanto você digita.",
        "Útil para notas fiscais, conferências de reverse charge, comparação de preços entre estados com faixas diferentes e para saber exatamente quanto de um preço de etiqueta é imposto.",
      ],
      steps: [
        "Digite o valor — líquido se for adicionar o GST, bruto se for extrair.",
        "Escolha a faixa aplicável: 5%, 12%, 18% ou 28%.",
        "Escolha adicionar ou remover o imposto e veja líquido, imposto e bruto.",
      ],
      faqs: [
        {
          q: "Quais são as faixas do GST na Índia?",
          a: "As alíquotas principais são 5%, 12%, 18% e 28%: itens essenciais ficam em 0–5%, a maioria dos bens e serviços em 12–18% e artigos de luxo ou prejudiciais em 28% (às vezes com um cess adicional). A ferramenta cobre as quatro faixas padrão.",
        },
        {
          q: "Como tirar o GST de um preço com imposto incluído?",
          a: "Escolha «Remover imposto» e informe o valor bruto. A base se recupera como bruto ÷ (1 + alíquota/100): um preço bruto de ₹118 com GST de 18% tem líquido de ₹100 e ₹18 de imposto.",
        },
        {
          q: "O GST é igual ao IVA?",
          a: "Ambos são impostos sobre valor agregado cobrados em cada etapa, mas o GST indiano unificou o imposto especial central, o de serviços e o VAT estadual, dividido em CGST + SGST (intrastadual) ou IGST (interstadual). Outros países chamam o equivalente de IVA apenas.",
        },
      ],
    },
  },
});
