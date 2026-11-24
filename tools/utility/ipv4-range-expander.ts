import { UtilEngineIpv4Range } from "../_engines/util-engine-ipv4-range";
import { MAX_IP_RANGE_EXPANSION } from "../_lib/subnet";
import { defineTool } from "../_lib/types";
import { ipv4RangeDeepDive } from "../_lib/deepdive-misc";
import type { Locale } from "@/lib/site";

export default defineTool({
  slug: "ipv4-range-expander",
  category: "utility",
  icon: "grid",
  engine: { component: UtilEngineIpv4Range },
  related: ["ipv4-subnet-calculator", "ip-lookup", "binary-converter"],
  copy: {
    en: {
      name: "IPv4 Range Expander",
      tagline: "Enter the first and last IPv4 addresses to count an inclusive range and copy the ascending list, one address per line. Runs locally in your browser.",
      intro: [
        "Turn two IPv4 addresses into a list for an inventory or test fixture. Both endpoints count. For example, 192.0.2.254 through 192.0.3.1 contains four addresses and crosses an octet boundary.",
        `The total is always exact. If a range has more than ${MAX_IP_RANGE_EXPANSION.toLocaleString("en")} addresses, you can view and copy its first ${MAX_IP_RANGE_EXPANSION.toLocaleString("en")} entries. The page marks when the list has been shortened.`,
      ],
      steps: ["Enter the first IPv4 address.", "Enter the last address and check the total.", "Copy the displayed addresses, one per line."],
      faqs: [
        { q: "Are both endpoints included?", a: "Both count toward the total. The ending address appears in the list when the whole range fits." },
        { q: "What if the last address is lower than the first?", a: "The page shows an error. Enter the lower address first to get an ascending list." },
      ],
      deepDive: ipv4RangeDeepDive("en" as Locale),
    },
    zh: {
      name: "IPv4 地址区间展开",
      tagline: "输入起始和结束 IPv4 地址，计算区间内的地址总数，并按升序逐行复制地址。计算在本地浏览器完成。",
      intro: [
        "把两个 IPv4 端点转换成地址清单，可用于整理地址台账或准备测试数据。例如，从 192.0.2.254 到 192.0.3.1 共 4 条，包含两个端点。",
        `总数按完整区间计算。地址超过 ${MAX_IP_RANGE_EXPANSION.toLocaleString("zh")} 条时，页面会提示截断，只展示和复制前 ${MAX_IP_RANGE_EXPANSION.toLocaleString("zh")} 条。`,
      ],
      steps: ["输入起始 IPv4 地址。", "输入结束地址并核对总数。", "复制当前列表，每行一个地址。"],
      faqs: [
        { q: "总数包含起始和结束地址吗？", a: "包含两个端点。列表未截断时也会显示结束地址。" },
        { q: "结束地址小于起始地址怎么办？", a: "页面会提示输入错误。把较小的地址填在前面即可生成升序列表。" },
      ],
      deepDive: ipv4RangeDeepDive("zh" as Locale),
    },
    ja: {
      name: "IPv4 アドレス範囲の展開",
      tagline: "開始と終了の IPv4 アドレスから、両端を含む件数と昇順の一覧を生成します。ブラウザー内で処理し、1 行ずつコピーできます。",
      intro: [
        "2 つの IPv4 アドレスから、台帳やテストデータ用の一覧を作成できます。たとえば 192.0.2.254 から 192.0.3.1 までは、両端を含めて 4 件です。",
        `合計は範囲全体の件数です。${MAX_IP_RANGE_EXPANSION.toLocaleString("ja")} 件を超えると、先頭部分だけを表示・コピーできることを画面に示します。`,
      ],
      steps: ["開始 IPv4 アドレスを入力します。", "終了アドレスを入力し、件数を確認します。", "表示された一覧をコピーします。"],
      faqs: [
        { q: "両端のアドレスも含まれますか？", a: "どちらも合計に含まれます。一覧が上限内なら終了アドレスも表示されます。" },
        { q: "終了アドレスが開始より小さい場合は？", a: "画面にエラーが表示されます。小さい方を開始アドレスに入力してください。" },
      ],
      deepDive: ipv4RangeDeepDive("ja" as Locale),
    },
    es: {
      name: "Expansor de rangos IPv4",
      tagline: "Introduce la primera y la última dirección IPv4 para contar el rango completo y copiar la lista en orden ascendente, con una dirección por línea.",
      intro: [
        "Genera una lista de direcciones para un inventario o para datos de prueba. De 192.0.2.254 a 192.0.3.1 hay cuatro direcciones, incluidos los dos extremos. El cálculo se hace en tu navegador.",
        `El total incluye todo el rango. Si supera las ${MAX_IP_RANGE_EXPANSION.toLocaleString("es")} direcciones, la página indica que solo se muestran y se copian las primeras entradas.`,
      ],
      steps: ["Introduce la primera dirección IPv4.", "Introduce la última y comprueba el total.", "Copia la lista visible, con una dirección por línea."],
      faqs: [
        { q: "¿Se incluyen ambos extremos?", a: "Los dos se incluyen en el total. La última dirección aparece cuando cabe el rango completo." },
        { q: "¿Qué pasa si la última dirección es menor?", a: "Se muestra un error. Escribe primero la dirección menor para generar la lista ascendente." },
      ],
      deepDive: ipv4RangeDeepDive("es" as Locale),
    },
    pt: {
      name: "Expansor de intervalos IPv4",
      tagline: "Informe o primeiro e o último endereço IPv4 para contar todo o intervalo e copiar a lista em ordem crescente, com um endereço por linha.",
      intro: [
        "Gere uma lista para inventários ou dados de teste. De 192.0.2.254 a 192.0.3.1, são quatro endereços, incluindo as duas extremidades. O cálculo é feito no navegador.",
        `O total considera todo o intervalo. Acima de ${MAX_IP_RANGE_EXPANSION.toLocaleString("pt-BR")} endereços, a página avisa que só as primeiras entradas são exibidas e copiadas.`,
      ],
      steps: ["Informe o primeiro endereço IPv4.", "Informe o último e confira o total.", "Copie a lista exibida, com um endereço por linha."],
      faqs: [
        { q: "As duas extremidades estão incluídas?", a: "As duas entram no total. O último endereço aparece quando todo o intervalo cabe na lista." },
        { q: "E se o último endereço for menor?", a: "A página informa o erro. Digite o menor endereço primeiro para gerar a lista em ordem crescente." },
      ],
      deepDive: ipv4RangeDeepDive("pt" as Locale),
    },
  },
});
