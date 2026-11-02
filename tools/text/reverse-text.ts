import { TextTransform } from "../_engines/text-tool";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "reverse-text",
  category: "text",
  icon: "swap",
  engine: {
    component: TextTransform,
    props: {
      transform: "reverse-text",
      options: [
        { key: "byLines", label: { en: "Reverse lines only", zh: "仅反转行序", ja: "行の順序だけ反転", es: "Solo invertir líneas", pt: "Inverter apenas linhas" } },
      ],
    },
  },
  related: ["text-sorter", "find-and-replace", "text-cleaner", "remove-duplicate-lines"],
  copy: {
    en: {
      name: "Reverse Text",
      tagline:
        "Flip any text backwards character by character, or reverse the order of whole lines — Unicode-safe, instant and fully local.",
      intro: [
        "Two reversals in one tool: mirror the characters of your text (the classic 'txet esrever' trick for games, bios and puzzle clues) or flip the order of lines so the last line comes first — handy for logs, chat exports and lists pasted bottom-up.",
        "Reversal works on Unicode code points, not raw bytes, so accented letters and most emoji survive intact instead of turning into mojibake.",
      ],
      steps: [
        "Paste or type the text you want to flip.",
        "Leave 'Reverse lines only' off to mirror characters, or switch it on to reverse the line order.",
        "Copy the reversed result.",
      ],
      faqs: [
        {
          q: "Will emoji and accented letters survive?",
          a: "Yes for the common cases: the tool reverses by Unicode code points, so é, ñ and standard emoji stay intact. Very complex emoji built from multiple parts may still come apart when mirrored.",
        },
        {
          q: "What exactly does 'Reverse lines only' do?",
          a: "It keeps every line intact and flips the order of the lines themselves — the first line becomes the last. Use it when a list was pasted bottom-up.",
        },
        {
          q: "Can I use this for palindrome checking?",
          a: "Indirectly — paste the text, reverse it and compare by eye, or pair it with the text diff tool.",
        },
      ],
    },
    zh: {
      name: "文本反转",
      tagline: "按字符把文本整个翻转,或反转行的顺序——兼容 emoji,本地即时处理。",
      intro: [
        "一个工具两种反转:镜像文本字符(游戏、签名、谜语里经典的“倒序文字”),或调换行的先后让最后一行变成第一行——日志、聊天记录、自下而上粘贴的列表都用得上。",
        "反转按 Unicode 码点进行,不是按字节,所以重音字母和常见 emoji 都能完好保留,不会变成乱码。",
      ],
      steps: [
        "粘贴或输入要翻转的文本。",
        "不开“仅反转行序”就镜像字符;打开则只反转行的顺序。",
        "复制反转结果。",
      ],
      faqs: [
        {
          q: "emoji 和重音字母能保留吗?",
          a: "常见情况没问题:按 Unicode 码点反转,é、ñ 和标准 emoji 都会完好;由多个部件组成的复杂 emoji 镜像后可能拆开。",
        },
        {
          q: "“仅反转行序”具体做什么?",
          a: "每行内容保持不变,只调换行的先后——第一行变成最后一行。列表自下而上粘贴时用这个。",
        },
        {
          q: "能用来检查回文吗?",
          a: "可以间接做到——粘贴文本、反转后肉眼比对,或者配合文本对比工具。",
        },
      ],
    },
    ja: {
      name: "テキスト反転",
      tagline: "テキストを 1 文字ずつ反転、または行の順序だけを逆に。Unicode 対応で絵文字もそのまま、すべてローカル処理です。",
      intro: [
        "反転は 2 種類:文字をミラーする(ゲームや自己紹介、謎解きでおなじみの「逆さ文字」)のと、行の順序だけを入れ替えて最終行を先頭にする方法。ログ、チャット履歴、下から貼り付けたリストの修正に便利です。",
        "反転はバイト単位ではなく Unicode のコードポイント単位なので、アクセント付き文字や一般的な絵文字も文字化けせずそのまま残ります。",
      ],
      steps: [
        "反転したいテキストを入力または貼り付けます。",
        "「行の順序だけ反転」をオフで文字ミラー、オンで行順の入れ替えです。",
        "反転結果をコピーします。",
      ],
      faqs: [
        {
          q: "絵文字やアクセント付き文字はそのまま残りますか?",
          a: "一般的なケースでは残ります。コードポイント単位で反転するため、é、ñ、標準的な絵文字は無傷です。複数パーツで構成される複雑な絵文字は分離することがあります。",
        },
        {
          q: "「行の順序だけ反転」の動作は?",
          a: "各行の内容はそのままに、行の並びだけを逆にします。最初の行が最後になります。下から上に貼り付けてしまったリストの修正に使ってください。",
        },
        {
          q: "回文のチェックに使えますか?",
          a: "間接的にできます。テキストを反転させて目で比べるか、テキスト差分ツールと組み合わせてください。",
        },
      ],
    },
    es: {
      name: "Invertir texto",
      tagline:
        "Invierte el texto carácter a carácter o dale la vuelta al orden de las líneas — seguro con Unicode, al instante y 100% local.",
      intro: [
        "Dos inversiones en una herramienta: reflejar los caracteres (el clásico 'txet esrever' para juegos, bios y acertijos) o voltear el orden de las líneas para que la última pase a ser la primera — útil con logs, exportaciones de chat y listas pegadas al revés.",
        "La inversión opera sobre puntos de código Unicode, no sobre bytes, así que las letras con tilde y la mayoría de los emojis sobreviven sin convertirse en mojibake.",
      ],
      steps: [
        "Pega o escribe el texto que quieres invertir.",
        "Deja «Solo invertir líneas» apagado para reflejar caracteres, o actívalo para invertir el orden de líneas.",
        "Copia el resultado invertido.",
      ],
      faqs: [
        {
          q: "¿Sobreviven los emojis y las letras acentuadas?",
          a: "En los casos habituales sí: la inversión va por puntos de código Unicode, así que é, ñ y los emojis estándar quedan intactos. Los emojis muy complejos pueden separarse al reflejarlos.",
        },
        {
          q: "¿Qué hace exactamente «Solo invertir líneas»?",
          a: "Mantiene cada línea tal cual y voltea el orden entre ellas: la primera pasa a ser la última. Úsalo con listas pegadas de abajo hacia arriba.",
        },
        {
          q: "¿Sirve para comprobar palíndromos?",
          a: "Indirectamente: pega el texto, inviértelo y compara a simple vista, o combínalo con la herramienta de diferencias de texto.",
        },
      ],
    },
    pt: {
      name: "Inverter texto",
      tagline:
        "Inverta o texto caractere por caractere ou vire a ordem das linhas inteiras — seguro para Unicode, instantâneo e 100% local.",
      intro: [
        "Duas inversões em uma ferramenta: espelhar os caracteres (o clássico 'txet esrever' para jogos, bios e charadas) ou inverter a ordem das linhas para que a última venha primeiro — útil para logs, exportações de chat e listas coladas de baixo para cima.",
        "A inversão trabalha em pontos de código Unicode, não em bytes, então letras acentuadas e a maioria dos emojis sobrevivem sem virar mojibake.",
      ],
      steps: [
        "Cole ou digite o texto que quer inverter.",
        "Deixe “Inverter apenas linhas” desligado para espelhar caracteres, ou ligado para inverter a ordem das linhas.",
        "Copie o resultado invertido.",
      ],
      faqs: [
        {
          q: "Emojis e letras acentuadas sobrevivem?",
          a: "Nos casos comuns, sim: a inversão é por pontos de código Unicode, então é, ñ e emojis padrão ficam intactos. Emojis muito complexos, feitos de várias partes, podem se separar ao espelhar.",
        },
        {
          q: "O que “Inverter apenas linhas” faz exatamente?",
          a: "Mantém cada linha como está e troca a ordem entre elas — a primeira vira a última. Use quando uma lista foi colada de baixo para cima.",
        },
        {
          q: "Dá para conferir palíndromos?",
          a: "Indiretamente: cole o texto, inverta e compare a olho, ou combine com a ferramenta de comparação de textos.",
        },
      ],
    },
  },
});
