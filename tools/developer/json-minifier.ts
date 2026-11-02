import { DevCodeEngine } from "../_engines/dev-engine-code";
import { defineTool } from "../_lib/types";

const SAMPLE = '{"name":"Zoyku","tags":["dev","json"],"nested":{"ok":true,"count":3}}';

export default defineTool({
  slug: "json-minifier",
  category: "developer",
  icon: "crop",
  engine: { component: DevCodeEngine, props: { mode: "json-minify", showSize: true, sample: SAMPLE } },
  related: ["json-formatter", "json-validator", "css-minifier", "html-minifier"],
  copy: {
    en: {
      name: "JSON Minifier",
      tagline:
        "Minify JSON online: strip all whitespace to shrink payloads for faster API responses and smaller storage — see the exact bytes saved, privately in your browser.",
      intro: [
        "Paste pretty-printed JSON and get the most compact valid equivalent back in real time: every space, newline and indentation is removed without touching your data. A live size readout shows the original size, the minified size and the percentage saved.",
        "Use it to slim down API responses, fixture files, translations and JSON config before shipping or storing them. If the input is not valid JSON, the tool tells you the exact line and column of the problem instead of failing silently.",
      ],
      steps: [
        "Paste your formatted JSON into the input box.",
        "The minified one-line output appears instantly, with the size saved shown below.",
        "Copy the compact result or clear the input to start over.",
      ],
      faqs: [
        {
          q: "Does minifying JSON change the data?",
          a: "No. Whitespace outside strings carries no meaning in JSON, so removing it produces an equivalent document with identical values when parsed.",
        },
        {
          q: "How much smaller will my JSON get?",
          a: "It depends on the indentation you are removing — heavily indented files often shrink by 30–60%. The tool shows the exact percentage for your input.",
        },
        {
          q: "Is my data sent anywhere?",
          a: "No. Minification runs entirely in your browser — nothing is uploaded, logged or stored.",
        },
      ],
    },
    zh: {
      name: "JSON 压缩",
      tagline: "在线压缩 JSON:去掉全部空白,让接口响应更小、存储更省——实时显示节省的字节数与百分比,数据不出浏览器。",
      intro: [
        "粘贴带格式的 JSON,实时得到最紧凑的等价结果:所有空格、换行和缩进都会移除,数据本身不变。下方实时显示原始大小、压缩后大小和节省的百分比。",
        "适合在发布或存储前瘦身接口响应、测试数据、翻译文件和 JSON 配置。如果输入不是合法 JSON,工具会给出精确的行列位置,而不是静默失败。",
      ],
      steps: [
        "把格式化好的 JSON 粘贴到输入框。",
        "压缩后的单行结果即时出现,下方显示节省的比例。",
        "复制紧凑结果,或清空输入重新开始。",
      ],
      faqs: [
        {
          q: "压缩 JSON 会改变数据吗?",
          a: "不会。字符串之外的空白在 JSON 中没有意义,移除后解析出的值完全一致。",
        },
        {
          q: "我的 JSON 能小多少?",
          a: "取决于要去掉的缩进——缩进较多的文件通常能缩小 30%–60%。工具会针对你的输入给出精确百分比。",
        },
        {
          q: "数据会被发送到别处吗?",
          a: "不会。压缩完全在浏览器中完成,不上传、不记录、不存储。",
        },
      ],
    },
    ja: {
      name: "JSON ミニファイアー",
      tagline:
        "JSON をオンラインで圧縮:余白をすべて取り除き、API レスポンスや保存容量を削減。節約できたバイト数をリアルタイム表示します。",
      intro: [
        "整形済みの JSON を貼り付けると、最もコンパクトで等価な結果がリアルタイムに得られます。空白・改行・インデントをすべて除去しますが、データは一切変わりません。元のサイズ・圧縮後のサイズ・節約率を常時表示します。",
        "API レスポンス、フィクスチャ、翻訳ファイル、JSON 設定を公開や保存の前に軽量化するのに便利です。入力が不正な JSON の場合は、黙って失敗せずに行と列を正確に通知します。",
      ],
      steps: [
        "整形済み JSON を入力欄に貼り付けます。",
        "圧縮された 1 行の出力が即座に表示され、節約率も下部に出ます。",
        "結果をコピーするか、入力をクリアしてやり直します。",
      ],
      faqs: [
        {
          q: "圧縮すると JSON のデータは変わりますか?",
          a: "変わりません。文字列の外側の空白は JSON では意味を持たないため、除去してもパース結果は同一です。",
        },
        {
          q: "どれくらい小さくなりますか?",
          a: "除去するインデントの量によります。インデントが多いファイルは 30〜60% 縮むことも多いです。入力ごとの正確な割合を表示します。",
        },
        {
          q: "データはどこかに送信されますか?",
          a: "いいえ。圧縮は完全にブラウザ内で行われ、アップロード・記録・保存は一切ありません。",
        },
      ],
    },
    es: {
      name: "Minificador JSON",
      tagline:
        "Minifica JSON en línea: elimina todo el espacio en blanco para respuestas de API más ligeras y menos almacenamiento, con el ahorro exacto en bytes. Sin salir del navegador.",
      intro: [
        "Pega JSON con formato y obtén en tiempo real el equivalente válido más compacto: se eliminan todos los espacios, saltos de línea e indentación sin tocar tus datos. Un indicador muestra el tamaño original, el reducido y el porcentaje ahorrado.",
        "Úsalo para aligerar respuestas de API, fixtures, traducciones y configuración JSON antes de publicarlas o guardarlas. Si la entrada no es JSON válido, la herramienta indica la línea y columna exactas del problema.",
      ],
      steps: [
        "Pega tu JSON formateado en el cuadro de entrada.",
        "La salida minificada en una sola línea aparece al instante, con el ahorro indicado debajo.",
        "Copia el resultado compacto o borra la entrada para empezar de nuevo.",
      ],
      faqs: [
        {
          q: "¿Minificar JSON cambia los datos?",
          a: "No. Los espacios fuera de las cadenas no tienen significado en JSON, así que eliminarlos produce un documento equivalente con los mismos valores.",
        },
        {
          q: "¿Cuánto más pequeño quedará mi JSON?",
          a: "Depende de la indentación que elimines: los archivos muy indentados suelen reducirse entre un 30 % y un 60 %. La herramienta muestra el porcentaje exacto de tu entrada.",
        },
        {
          q: "¿Mis datos se envían a algún sitio?",
          a: "No. La minificación ocurre íntegramente en tu navegador: nada se sube, registra o almacena.",
        },
      ],
    },
    pt: {
      name: "Minificador JSON",
      tagline:
        "Minifique JSON on-line: remova todo o espaço em branco para respostas de API mais leves e menos armazenamento, vendo exatamente quantos bytes você economiza.",
      intro: [
        "Cole JSON formatado e receba em tempo real o equivalente válido mais compacto: todos os espaços, quebras de linha e indentações são removidos sem tocar nos seus dados. Um indicador mostra o tamanho original, o reduzido e a porcentagem economizada.",
        "Use para enxugar respostas de API, fixtures, arquivos de tradução e configuração JSON antes de publicar ou armazenar. Se a entrada não for JSON válido, a ferramenta informa a linha e a coluna exatas do problema.",
      ],
      steps: [
        "Cole seu JSON formatado na caixa de entrada.",
        "A saída minificada em uma linha aparece na hora, com a economia indicada abaixo.",
        "Copie o resultado compacto ou limpe a entrada para começar de novo.",
      ],
      faqs: [
        {
          q: "Minificar o JSON altera os dados?",
          a: "Não. Espaços fora das strings não têm significado em JSON, então removê-los produz um documento equivalente com os mesmos valores.",
        },
        {
          q: "Quanto menor meu JSON pode ficar?",
          a: "Depende da indentação removida — arquivos bem indentados costumam encolher de 30% a 60%. A ferramenta mostra a porcentagem exata da sua entrada.",
        },
        {
          q: "Meus dados são enviados para algum lugar?",
          a: "Não. A minificação acontece inteiramente no seu navegador — nada é enviado, registrado ou armazenado.",
        },
      ],
    },
  },
});
