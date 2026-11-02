import { TextTransform } from "../_engines/text-tool";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "remove-duplicate-lines",
  category: "text",
  icon: "layers",
  engine: {
    component: TextTransform,
    props: {
      transform: "dedupe-lines",
      options: [
        { key: "ignoreCase", label: { en: "Ignore case", zh: "忽略大小写", ja: "大文字小文字を無視", es: "Ignorar mayúsculas", pt: "Ignorar maiúsculas" } },
        { key: "trimFirst", label: { en: "Trim lines first", zh: "先去行首尾空格", ja: "先にトリム", es: "Recortar antes", pt: "Trim antes" } },
        { key: "removeEmpty", label: { en: "Remove empty lines", zh: "删除空行", ja: "空行を削除", es: "Quitar líneas vacías", pt: "Remover linhas vazias" } },
        { key: "sortAfter", label: { en: "Sort result A→Z", zh: "结果按 A→Z 排序", ja: "結果を A→Z で整列", es: "Ordenar A→Z", pt: "Ordenar A→Z" } },
      ],
    },
  },
  related: ["remove-extra-spaces", "text-sorter", "text-cleaner", "word-counter"],
  copy: {
    en: {
      name: "Remove Duplicate Lines",
      tagline: "Delete repeated lines from lists and logs while keeping the original order — with case and trim options.",
      intro: [
        "Paste any list — emails, URLs, keywords, log lines — and get back the same list with duplicates removed in one pass. Options cover the usual variants: ignore letter case, trim whitespace before comparing, drop empty lines, or sort the result.",
      ],
      steps: [
        "Paste your list into the input box — one entry per line.",
        "Toggle options if you need case-insensitive matching or cleanup.",
        "Copy the deduplicated output; the original order is preserved unless you enable sorting.",
      ],
      faqs: [
        {
          q: "Does it keep the original line order?",
          a: "Yes. The first occurrence of each line is kept in place. Sorting only happens if you enable the sort option.",
        },
        {
          q: "Can it treat 'Apple' and 'apple' as duplicates?",
          a: "Enable 'Ignore case' and they will be treated as the same line; the first variant seen is kept.",
        },
      ],
    },
    zh: {
      name: "删除重复行",
      tagline: "一键删除列表和日志中的重复行,保留原始顺序,支持忽略大小写等选项。",
      intro: [
        "把任何列表——邮箱、URL、关键词、日志行——粘贴进来,一遍跑完去重。常用变体都有开关:忽略大小写、比较前先去空格、丢掉空行、对结果排序。",
      ],
      steps: [
        "把列表粘贴到输入框,每行一条。",
        "需要忽略大小写或清理时,打开对应选项。",
        "复制去重后的输出;不开排序时保持原始顺序。",
      ],
      faqs: [
        {
          q: "会保留原始行序吗?",
          a: "会。每行保留第一次出现的位置;只有打开排序选项才会重排。",
        },
        {
          q: "能把 'Apple' 和 'apple' 视为重复吗?",
          a: "打开“忽略大小写”即可;两者算同一行,保留先出现的那个。",
        },
      ],
    },
    ja: {
      name: "重複行の削除",
      tagline: "リストやログから重複行を元の順序を保ったまま一括削除。大文字無視などのオプション付き。",
      intro: [
        "メールアドレス、URL、キーワード、ログ行など、どんなリストも貼り付ければ一発で重複解除。大文字小文字を無視、比較前にトリム、空行の削除、結果の整列という定番オプションを用意しています。",
      ],
      steps: [
        "リストを入力欄に貼り付けます(1 行 1 項目)。",
        "必要に応じて大小文字の無視やクリーンアップのオプションを切り替えます。",
        "重複を除いた出力をコピーします。整列を有効にしない限り元の順序は保持されます。",
      ],
      faqs: [
        {
          q: "元の行の順序は保持されますか?",
          a: "はい。各行の最初の出現位置がそのまま残ります。整列オプションを有効にした場合のみ並べ替えます。",
        },
        {
          q: "'Apple' と 'apple' を重複扱いにできますか?",
          a: "「大文字小文字を無視」を有効にすると同一行として扱われ、先に現れた方が残ります。",
        },
      ],
    },
    es: {
      name: "Eliminar líneas duplicadas",
      tagline: "Borra líneas repetidas de listas y registros conservando el orden, con opciones de mayúsculas y recorte.",
      intro: [
        "Pega cualquier lista —correos, URLs, palabras clave, líneas de log— y recupérala sin duplicados en una sola pasada. Las opciones cubren los casos típicos: ignorar mayúsculas, recortar antes de comparar, quitar líneas vacías u ordenar el resultado.",
      ],
      steps: [
        "Pega tu lista en el cuadro de entrada: una entrada por línea.",
        "Activa opciones si necesitas comparación sin mayúsculas o limpieza.",
        "Copia la salida sin duplicados; el orden original se conserva salvo que actives la ordenación.",
      ],
      faqs: [
        {
          q: "¿Se mantiene el orden original?",
          a: "Sí. De cada línea se conserva su primera aparición en su sitio. Solo se reordena si activas la opción de ordenar.",
        },
        {
          q: "¿Puede tratar 'Apple' y 'apple' como duplicadas?",
          a: "Activa «Ignorar mayúsculas» y se considerarán la misma línea; se conserva la primera variante vista.",
        },
      ],
    },
    pt: {
      name: "Remover linhas duplicadas",
      tagline: "Apague linhas repetidas de listas e logs mantendo a ordem original, com opções de maiúsculas e trim.",
      intro: [
        "Cole qualquer lista — e-mails, URLs, palavras-chave, linhas de log — e receba de volta a lista sem duplicados numa passada. As opções cobrem os casos comuns: ignorar maiúsculas, trim antes de comparar, descartar linhas vazias ou ordenar o resultado.",
      ],
      steps: [
        "Cole sua lista na caixa de entrada — uma entrada por linha.",
        "Ative opções se precisar de comparação sem diferenciar maiúsculas ou de limpeza.",
        "Copie a saída sem duplicados; a ordem original é mantida, a menos que você ative a ordenação.",
      ],
      faqs: [
        {
          q: "A ordem original é mantida?",
          a: "Sim. A primeira ocorrência de cada linha fica no lugar. Só reordena se você ativar a opção de ordenar.",
        },
        {
          q: "Dá para tratar 'Apple' e 'apple' como duplicadas?",
          a: "Ative “Ignorar maiúsculas” e as duas serão a mesma linha; a primeira variante vista é a que fica.",
        },
      ],
    },
  },
});
