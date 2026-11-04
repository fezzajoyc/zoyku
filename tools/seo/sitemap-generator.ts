import { SeoSitemapEngine } from "../_engines/seo-engine-sitemap";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sitemap-generator",
  category: "seo",
  icon: "file",
  engine: { component: SeoSitemapEngine },
  related: ["robots-txt-generator", "canonical-tag-generator", "hreflang-generator", "meta-tag-generator", "utm-builder", "open-graph-generator", "keyword-density-checker", "serp-preview", "schema-markup-generator"],
  copy: {
    en: {
      name: "XML Sitemap Generator",
      tagline:
        "Paste a URL list and get a valid sitemap.xml with lastmod, per-section changefreq and priority — deduplicated and ready to submit.",
      intro: [
        "A sitemap tells search engines which URLs exist and when they last changed. Paste your list — from a crawler export, CMS or spreadsheet — and the generator deduplicates entries, groups them by first path segment and lets you set changefreq and priority per group while keeping the file protocol-valid.",
        "The XML follows the sitemaps.org 0.9 protocol that Google, Bing and Yandex accept. Download the file, host it at /sitemap.xml and reference it from robots.txt or submit it directly in Search Console.",
      ],
      steps: [
        "Paste one absolute URL per line — up to the 50,000-URL / 50 MB limit per file.",
        "Set lastmod handling and adjust changefreq and priority per section where it makes sense.",
        "Download sitemap.xml, upload it to your domain root and submit it in Search Console.",
      ],
      faqs: [
        {
          q: "Do changefreq and priority still matter?",
          a: "Google ignores both and uses its own scheduling; lastmod is the only tag with a documented effect, and only when it is accurate. Set the others if you want a complete file, but spend the effort on truthful lastmod values.",
        },
        {
          q: "What lastmod value should I use?",
          a: "The date the page content last changed in a meaningful way, in W3C Datetime format (YYYY-MM-DD is fine). Copying today's date onto every URL teaches Google to distrust your lastmod.",
        },
        {
          q: "How big can a sitemap be?",
          a: "50,000 URLs or 50 MB uncompressed per file. Beyond that, split into multiple sitemaps and list them in a sitemap index file, then submit the index.",
        },
      ],
    },
    zh: {
      name: "XML 站点地图生成器",
      tagline: "粘贴 URL 列表即可生成规范的 sitemap.xml:自动去重、按目录分组设置 changefreq 和 priority,可直接提交。",
      intro: [
        "站点地图告诉搜索引擎哪些 URL 存在、最近何时更新。粘贴你的 URL 列表——来自爬虫导出、CMS 或表格——生成器会自动去重,按第一级路径分组,并支持按分组设置 changefreq 和 priority,同时保证文件符合协议。",
        "XML 遵循 Google、Bing、Yandex 都接受的 sitemaps.org 0.9 协议。下载文件,放在 /sitemap.xml,然后在 robots.txt 里引用或直接提交到 Search Console。",
      ],
      steps: [
        "每行粘贴一个绝对 URL,注意单文件上限为 5 万条 / 50 MB。",
        "设置 lastmod 的处理方式,并按需调整各分组的 changefreq 和 priority。",
        "下载 sitemap.xml,上传到域名根目录,并在 Search Console 提交。",
      ],
      faqs: [
        {
          q: "changefreq 和 priority 还有用吗?",
          a: "Google 两者都忽略,使用自己的抓取调度;lastmod 是唯一有明确文档效果的标签,而且前提是值准确。为了让文件完整可以设置它们,但精力应该花在真实的 lastmod 上。",
        },
        {
          q: "lastmod 该填什么?",
          a: "页面内容最近一次实质性变更的日期,采用 W3C Datetime 格式(YYYY-MM-DD 即可)。把每条 URL 都抄上今天的日期,只会让 Google 不再信任你的 lastmod。",
        },
        {
          q: "站点地图能有多大?",
          a: "单个文件上限 5 万条 URL 或未压缩 50 MB。超出后拆成多个 sitemap,用 sitemap index 文件列出再提交索引文件。",
        },
      ],
    },
    ja: {
      name: "XML サイトマップ生成",
      tagline: "URL リストを貼り付けるだけで lastmod・セクション別 changefreq・priority 付きの妥当な sitemap.xml を生成。重複も自動削除します。",
      intro: [
        "サイトマップは、どの URL が存在し、いつ更新されたかを検索エンジンに伝えます。クローラーのエクスポートや CMS、スプレッドシートから URL リストを貼り付けると、重複を除去し、第 1 階層のパスごとにグループ化。グループ単位で changefreq と priority を設定しながら、プロトコルに準拠したファイルを作れます。",
        "XML は Google・Bing・Yandex が受け付ける sitemaps.org 0.9 プロトコルに従います。ファイルをダウンロードして /sitemap.xml として配置し、robots.txt から参照するか Search Console に直接送信してください。",
      ],
      steps: [
        "1 行に 1 件の絶対 URL を貼り付けます(1 ファイルの上限は 5 万 URL / 50MB)。",
        "lastmod の扱いを決め、必要に応じてセクションごとの changefreq と priority を調整します。",
        "sitemap.xml をダウンロードしてドメインのルートに置き、Search Console に送信します。",
      ],
      faqs: [
        {
          q: "changefreq と priority はまだ意味がある?",
          a: "Google は両方とも無視し、独自のスケジューリングを使います。ドキュメント上で効果があるのは lastmod だけで、しかも正確な場合に限ります。完全なファイルのために設定しても構いませんが、手間は正確な lastmod に注ぐべきです。",
        },
        {
          q: "lastmod には何を入れればいい?",
          a: "ページの内容が最後に実質的に変わった日付を W3C Datetime 形式(YYYY-MM-DD で可)で指定します。全 URL に今日の日付をコピーすると、Google はあなたの lastmod を信用しなくなります。",
        },
        {
          q: "サイトマップのサイズ上限は?",
          a: "1 ファイルあたり 5 万 URL または非圧縮 50MB です。超える場合は複数の sitemap に分割し、サイトマップインデックスファイルに一覧してインデックスを送信します。",
        },
      ],
    },
    es: {
      name: "Generador de sitemap XML",
      tagline:
        "Pega una lista de URLs y obtén un sitemap.xml válido con lastmod, changefreq y priority por sección, sin duplicados y listo para enviar.",
      intro: [
        "Un sitemap indica a los buscadores qué URLs existen y cuándo cambiaron por última vez. Pega tu lista —de una exportación de crawler, CMS u hoja de cálculo— y el generador elimina duplicados, agrupa por primer segmento de ruta y permite fijar changefreq y priority por grupo manteniendo el XML conforme al protocolo.",
        "El XML sigue el protocolo sitemaps.org 0.9 que aceptan Google, Bing y Yandex. Descarga el archivo, publícalo en /sitemap.xml y referencíalo desde robots.txt o envíalo en Search Console.",
      ],
      steps: [
        "Pega una URL absoluta por línea, hasta el límite de 50.000 URLs / 50 MB por archivo.",
        "Configura el tratamiento de lastmod y ajusta changefreq y priority por sección donde aporte.",
        "Descarga sitemap.xml, súbelo a la raíz del dominio y envíalo en Search Console.",
      ],
      faqs: [
        {
          q: "¿Changefreq y priority siguen importando?",
          a: "Google ignora ambos y usa su propia planificación; lastmod es la única etiqueta con efecto documentado, y solo cuando es exacta. Ponlas si quieres un archivo completo, pero dedica el esfuerzo a valores lastmod veraces.",
        },
        {
          q: "¿Qué valor de lastmod debo usar?",
          a: "La fecha del último cambio significativo del contenido, en formato W3C Datetime (YYYY-MM-DD basta). Copiar la fecha de hoy en todas las URLs enseña a Google a desconfiar de tu lastmod.",
        },
        {
          q: "¿Cuánto puede pesar un sitemap?",
          a: "50.000 URLs o 50 MB sin comprimir por archivo. Por encima, divídelo en varios sitemaps y lístalos en un archivo de índice de sitemaps, y envía el índice.",
        },
      ],
    },
    pt: {
      name: "Gerador de sitemap XML",
      tagline:
        "Cole uma lista de URLs e gere um sitemap.xml válido com lastmod, changefreq e priority por seção — sem duplicatas e pronto para enviar.",
      intro: [
        "O sitemap diz aos buscadores quais URLs existem e quando mudaram pela última vez. Cole sua lista — de uma exportação de crawler, CMS ou planilha — e o gerador remove duplicatas, agrupa pelo primeiro segmento do caminho e permite definir changefreq e priority por grupo, mantendo o XML conforme o protocolo.",
        "O XML segue o protocolo sitemaps.org 0.9 aceito por Google, Bing e Yandex. Baixe o arquivo, hospede em /sitemap.xml e referencie no robots.txt ou envie direto no Search Console.",
      ],
      steps: [
        "Cole uma URL absoluta por linha, até o limite de 50.000 URLs / 50 MB por arquivo.",
        "Defina o tratamento do lastmod e ajuste changefreq e priority por seção onde fizer sentido.",
        "Baixe o sitemap.xml, publique na raiz do domínio e envie no Search Console.",
      ],
      faqs: [
        {
          q: "Changefreq e priority ainda importam?",
          a: "O Google ignora os dois e usa seu próprio agendamento; lastmod é a única tag com efeito documentado, e só quando é precisa. Preencha as demais se quiser um arquivo completo, mas gaste o esforço em valores lastmod verdadeiros.",
        },
        {
          q: "Que valor de lastmod usar?",
          a: "A data da última mudança relevante do conteúdo, em formato W3C Datetime (YYYY-MM-DD serve). Copiar a data de hoje para todas as URLs ensina o Google a desconfiar do seu lastmod.",
        },
        {
          q: "Qual o tamanho máximo de um sitemap?",
          a: "50.000 URLs ou 50 MB sem compressão por arquivo. Acima disso, divida em vários sitemaps e liste-os num arquivo de índice de sitemaps, e envie o índice.",
        },
      ],
    },
  },
});
