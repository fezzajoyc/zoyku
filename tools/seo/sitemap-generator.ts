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
        "lastmod is the only value search engines actually use — Google ignores changefreq and priority — so set it to the real last-modified date rather than today's build time, or the signal degrades into noise. URLs must be absolute, share one host prefix, and the protocol caps a file at 50,000 URLs or 50 MB uncompressed.",
        "The XML follows the sitemaps.org 0.9 protocol that Google, Bing and Yandex accept. Download the file, host it at /sitemap.xml and reference it from robots.txt or submit it directly in Search Console; entries are grouped per first path segment so you can split large sites into an index cleanly.",
        "A sitemap is a discovery aid, not a ranking tool: it helps crawlers find new URLs faster but never forces indexing. Splitting into grouped, indexed files also makes Search Console's per-sitemap error reporting actionable — one giant file with an obscure failure tells you nothing about which URLs are broken.",
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
      deepDive: [
        {
          heading: "A hint, not a promise",
          paragraphs: [
            "A sitemap does exactly one thing: it lists URLs so crawlers can discover them faster. It does not force crawling, does not guarantee indexing and carries no ranking weight — Google's own documentation is explicit on all three points. Think of it as handing the crawler a map of your site instead of making it find every corridor by walking.",
            "The protocol it follows — sitemaps.org 0.9 — started as Google's proposal in 2005 and was jointly adopted by Yahoo and Microsoft soon after; Google, Bing and Yandex still accept it unchanged. That longevity is why a valid file generated today behaves the same on every major engine.",
            "Discovery still pays on large or newly launched sites, where internal linking has not yet caught up with the URL inventory: a sitemap hands the crawler the full list on day one instead of waiting for links to accumulate.",
          ],
        },
        {
          heading: "Which tags actually do something",
          paragraphs: [
            "Of the three content tags, only lastmod has a documented effect: Google reads it to decide when a re-crawl is worth scheduling — and only when the value is accurate and consistent over time. changefreq and priority are documented as ignored; Google's crawlers schedule themselves.",
            "The lastmod honesty problem is structural: build pipelines stamp today's date on every URL whether the content changed or not, and crawlers learn the signal is noise — after which even truthful lastmod values get discounted. The fix is boring: update lastmod only when the content meaningfully changed, in W3C Datetime format (YYYY-MM-DD is fine).",
            "loc and the XML namespace do the structural work: every URL must be absolute, all entries must share one host prefix, and the & in query strings escapes as &amp; to keep the XML valid. Deduplication matters too — the same URL listed twice wastes crawl budget twice.",
          ],
        },
        {
          heading: "Size limits and the workflow that fits them",
          paragraphs: [
            "The protocol caps a single file at 50,000 URLs or 50 MB uncompressed — whichever comes first. This generator groups entries by first path segment precisely so a large site splits into per-section files cleanly: /blog/*, /products/*, /docs/* each become their own sitemap, listed together in a sitemap index.",
            "Grouping pays off twice: Search Console reports errors per sitemap, so a file that fails tells you which section broke instead of one giant file that tells you nothing; and per-section lastmod handling matches reality — docs change daily, about pages never.",
            "The hosting ritual is short: download sitemap.xml, upload it to your domain root, reference it from robots.txt with a Sitemap: line or submit it directly in Search Console, and let the first crawl confirm it. Like every tool here, the XML is assembled entirely in your browser — your URL inventory is not uploaded anywhere.",
          ],
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
      deepDive: [
        {
          heading: "是提示,不是承诺",
          paragraphs: [
            "sitemap 只做一件事:把 URL 列出来,让爬虫更快发现它们。它不强制抓取、不保证收录、对排名没有权重——Google 自己的文档对这三点写得明明白白。把它理解为:递给爬虫一张站点的地图,而不是让它靠走路摸清每条走廊。",
            "它遵循的协议——sitemaps.org 0.9——始于 Google 2005 年的提案,随后被 Yahoo 与 Microsoft 联合采纳;Google、Bing、Yandex 至今原样接受。这份长寿意味着今天生成的合格文件,在所有主流引擎上表现一致。",
            "对大站和新站,发现机制仍然值钱:内链还没来得及覆盖全部 URL 时,sitemap 让爬虫第一天就拿到完整清单,而不是等链接慢慢积累。",
          ],
        },
        {
          heading: "哪些标签真的起作用",
          paragraphs: [
            "三个内容标签里,只有 lastmod 有成文的效果:Google 读它来决定要不要安排重新抓取——而且前提是值准确、且长期稳定。changefreq 和 priority 被明确忽略;Google 的爬虫自己排日程。",
            "lastmod 的诚实问题是结构性的:构建流水线会给每条 URL 盖上今天的日期,不管内容变没变;爬虫于是学会这个信号是噪音——之后连真实的 lastmod 也跟着被打折。解法很朴素:只有内容实质变化时才更新 lastmod,用 W3C Datetime 格式(YYYY-MM-DD 即可)。",
            "loc 和 XML 命名空间做结构性工作:每条 URL 必须是绝对地址,所有条目必须共享同一个主机前缀,查询串里的 & 要转义成 &amp; 才能保住 XML 合法。去重同样重要——同一条 URL 列两次,抓取预算就浪费两次。",
          ],
        },
        {
          heading: "大小上限,以及配套的工作流",
          paragraphs: [
            "协议把单文件封顶在 5 万条 URL 或未压缩 50 MB——先到为准。本生成器按第一级路径分组,正是为了让大站干净地拆成按栏目分的文件:/blog/*、/products/*、/docs/* 各成一个 sitemap,统一列进 sitemap index。",
            "分组的好处是双份的:Search Console 按 sitemap 报错,某个文件失败就能告诉你是哪个栏目坏了,而不是一个巨型文件什么都说明不了;分栏目的 lastmod 处理也贴近现实——文档天天变,关于页永远不变。",
            "上线仪式很短:下载 sitemap.xml,传到域名根目录,在 robots.txt 里加一行 Sitemap: 或直接提交到 Search Console,让第一次抓取来确认。和本站所有工具一样,XML 完全在你的浏览器里拼装——你的 URL 清单不会上传到任何地方。",
          ],
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
      deepDive: [
        {
          heading: "ヒントであって約束ではない",
          paragraphs: [
            "サイトマップがするのはただ一つ。URL を列挙して、クローラーがより速く発見できるようにすることです。クロールを強制せず、インデックスを保証せず、ランキングの重みも持ちません——Google 自身のドキュメントがこの 3 点をはっきり書いています。たとえるなら、クローラーにサイトの地図を手渡すことであって、廊下を歩かせて見つけさせることではありません。",
            "従うプロトコル——sitemaps.org 0.9——は 2005 年の Google の提案に始まり、まもなく Yahoo と Microsoft が共同採用しました。Google・Bing・Yandex は今も変更なしで受け付けます。この長寿ゆえに、今日生成した妥当なファイルは、主要エンジンのどこでも同じ振る舞いをします。",
            "大規模サイトや立ち上げ直後のサイトでは、発見の仕組みは今も価値があります。内部リンクが URL の全量に追いついていない段階で、サイトマップは初日から完全な一覧をクローラーに渡します。リンクが積み上がるのを待たずに。",
          ],
        },
        {
          heading: "どのタグが本当に効くか",
          paragraphs: [
            "3 つの内容タグのうち、成文化された効果があるのは lastmod だけです。Google はこれを読んで再クロールを日程化する価値を判断します——値が正確で、長期にわたって一貫している場合に限り。changefreq と priority は無視すると明文化されており、Google のクローラーは自分で日程を組みます。",
            "lastmod の誠実さの問題は構造的です。ビルドのパイプラインは、内容が変わっていようといまいと全 URL に今日の日付を押します。クローラーはその信号がノイズだと学習し、以後は正直な lastmod まで割り引かれます。解は地味です。内容が実質的に変わったときだけ lastmod を更新する。W3C Datetime 形式で(YYYY-MM-DD で十分)。",
            "loc と XML 名前空間が構造の仕事をします。URL はすべて絶対アドレス、全エントリは同じホスト接頭辞を共有、クエリ文字列の & は &amp; とエスケープして XML の妥当性を守る。重複の除去も同じく重要です。同じ URL を 2 回載せれば、クロール予算を 2 回無駄にします。",
          ],
        },
        {
          heading: "サイズ上限と、それに合うワークフロー",
          paragraphs: [
            "プロトコルは 1 ファイルを 5 万 URL または非圧縮 50MB で封をします——早いほうが優先。このジェネレーターが第 1 階層のパスでグループ化するのは、大規模サイトをセクション別のファイルにきれいに分割するためです。/blog/*、/products/*、/docs/* がそれぞれ 1 つの sitemap になり、sitemap インデックスに一覧されます。",
            "グループ化の利得は二重です。Search Console は sitemap ごとにエラーを報告するので、落ちたファイルがどのセクションの故障かを教えてくれます。巨大な 1 ファイルは何も語りません。さらにセクションごとの lastmod の扱いが現実に合います。ドキュメントは日々変わり、概要ページは永遠に変わりません。",
            "公開の作法は短いです。sitemap.xml をダウンロードし、ドメインのルートに置き、robots.txt に Sitemap: 行を足すか Search Console に直接送信し、最初のクロールに確認させます。このサイトの全ツールと同様、XML は完全にブラウザ内で組み立てられ、URL の一覧はどこにも送信されません。",
          ],
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
      deepDive: [
        {
          heading: "Una pista, no una promesa",
          paragraphs: [
            "Un sitemap hace exactamente una cosa: lista URLs para que los rastreadores las descubran antes. No fuerza el rastreo, no garantiza la indexación y no aporta nada al posicionamiento — la documentación de Google lo dice explícitamente en los tres puntos. Piénsalo como entregarle al rastreador un mapa del sitio en lugar de dejar que encuentre cada pasillo caminando.",
            "El protocolo que sigue — sitemaps.org 0.9 — nació como propuesta de Google en 2005 y poco después lo adoptaron Yahoo y Microsoft conjuntamente; Google, Bing y Yandex lo aceptan hoy sin cambios. Esa longevidad hace que un archivo válido generado hoy se comporte igual en todos los motores grandes.",
            "El descubrimiento sigue valiendo en sitios grandes o recién estrenados, donde el enlazado interno aún no cubre el inventario de URLs: el sitemap le entrega al rastreador la lista completa el primer día, sin esperar a que los enlaces se acumulen.",
          ],
        },
        {
          heading: "Qué etiquetas hacen algo de verdad",
          paragraphs: [
            "De las tres etiquetas de contenido, solo lastmod tiene un efecto documentado: Google la lee para decidir cuándo conviene programar un re-rastreo — y solo cuando el valor es exacto y consistente con el tiempo. changefreq y priority están documentadas como ignoradas; los rastreadores de Google se programan solos.",
            "El problema de honestidad del lastmod es estructural: los pipelines de build estampan la fecha de hoy en cada URL cambie o no el contenido, y los rastreadores aprenden que la señal es ruido — tras lo cual hasta los lastmod veraces se descuentan. El remedio es aburrido: actualiza lastmod solo cuando el contenido cambió de verdad, en formato W3C Datetime (YYYY-MM-DD basta).",
            "loc y el namespace XML hacen el trabajo estructural: toda URL debe ser absoluta, todas las entradas deben compartir un prefijo de host, y el & de las query strings se escapa como &amp; para que el XML siga siendo válido. La deduplicación importa igual — la misma URL listada dos veces gasta dos veces el presupuesto de rastreo.",
          ],
        },
        {
          heading: "Límites de tamaño y el flujo que les encaja",
          paragraphs: [
            "El protocolo cierra un archivo en 50.000 URLs o 50 MB sin comprimir — lo primero que llegue. Este generador agrupa por primer segmento de ruta precisamente para que un sitio grande se parta limpio en archivos por sección: /blog/*, /products/* y /docs/* se vuelven cada uno su sitemap, listados juntos en un índice de sitemaps.",
            "Agrupar paga dos veces: Search Console reporta errores por sitemap, así que un archivo que falla te dice qué sección se rompió en lugar de un gigante que no te dice nada; y el manejo de lastmod por sección se parece a la realidad — la documentación cambia a diario, la página de acerca de nunca.",
            "El ritual de publicación es corto: descarga sitemap.xml, súbelo a la raíz de tu dominio, referéncialo desde robots.txt con una línea Sitemap: o envíalo directamente en Search Console, y deja que el primer rastreo lo confirme. Como en todas las herramientas de aquí, el XML se ensambla por completo en tu navegador — tu inventario de URLs no se sube a ningún sitio.",
          ],
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
      deepDive: [
        {
          heading: "Uma dica, não uma promessa",
          paragraphs: [
            "O sitemap faz exatamente uma coisa: lista URLs para que rastreadores as descubram mais rápido. Não força rastreamento, não garante indexação e não pesa no ranqueamento — a documentação do Google é explícita nos três pontos. Pense nele como entregar ao rastreador um mapa do site em vez de deixar que encontre cada corredor andando.",
            "O protocolo que ele segue — sitemaps.org 0.9 — nasceu como proposta do Google em 2005 e logo depois foi adotado em conjunto por Yahoo e Microsoft; Google, Bing e Yandex o aceitam hoje sem mudanças. Essa longevidade faz um arquivo válido gerado hoje se comportar igual em todos os motores grandes.",
            "A descoberta ainda vale em sites grandes ou recém-lançados, onde a linkagem interna ainda não cobriu o inventário de URLs: o sitemap entrega ao rastreador a lista completa no primeiro dia, sem esperar os links se acumularem.",
          ],
        },
        {
          heading: "Quais tags realmente fazem algo",
          paragraphs: [
            "Das três tags de conteúdo, só a lastmod tem efeito documentado: o Google a lê para decidir quando vale programar um re-rastreamento — e só quando o valor é preciso e consistente ao longo do tempo. changefreq e priority estão documentadas como ignoradas; os rastreadores do Google fazem a própria agenda.",
            "O problema de honestidade da lastmod é estrutural: pipelines de build carimbam a data de hoje em toda URL, mude ou não o conteúdo, e os rastreadores aprendem que o sinal é ruído — depois disso até lastmods verdadeiros são descontados. O remédio é sem graça: atualize a lastmod só quando o conteúdo mudou de verdade, em formato W3C Datetime (YYYY-MM-DD serve).",
            "A loc e o namespace XML fazem o trabalho estrutural: toda URL deve ser absoluta, todas as entradas devem compartilhar um prefixo de host, e o & das query strings se escapa como &amp; para o XML continuar válido. A deduplicação importa igual — a mesma URL listada duas vezes gasta o orçamento de rastreamento duas vezes.",
          ],
        },
        {
          heading: "Limites de tamanho e o fluxo que combina com eles",
          paragraphs: [
            "O protocolo fecha um arquivo em 50.000 URLs ou 50 MB sem compressão — o que vier primeiro. Este gerador agrupa pelo primeiro segmento do caminho justamente para um site grande se dividir limpo em arquivos por seção: /blog/*, /products/* e /docs/* viram cada um seu sitemap, listados juntos num índice de sitemaps.",
            "Agrupar paga duas vezes: o Search Console reporta erros por sitemap, então um arquivo que falha diz qual seção quebrou, em vez de um gigante que não diz nada; e o tratamento de lastmod por seção fica parecido com a realidade — a documentação muda todo dia, a página sobre nunca.",
            "O ritual de publicação é curto: baixe o sitemap.xml, suba na raiz do domínio, referencie no robots.txt com uma linha Sitemap: ou envie direto no Search Console, e deixe o primeiro rastreamento confirmar. Como em toda ferramenta daqui, o XML é montado por completo no seu navegador — seu inventário de URLs não é enviado a lugar algum.",
          ],
        },
      ],
    },
  },
});
