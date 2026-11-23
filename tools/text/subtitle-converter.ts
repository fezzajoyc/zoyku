import { TextEngineSubtitle } from "../_engines/text-engine-subtitle";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "subtitle-converter",
  category: "text",
  icon: "text",
  engine: { component: TextEngineSubtitle },
  related: ["text-diff", "find-and-replace", "remove-extra-spaces", "character-frequency-counter"],
  copy: {
    en: {
      name: "Subtitle Converter",
      tagline:
        "Convert subtitles between SRT and WebVTT in both directions, or turn ASS/SSA into clean SRT — timings preserved, tags stripped, everything processed locally in your browser.",
      intro: [
        "Paste any SRT, WebVTT or ASS/SSA subtitle, pick the target format and convert: SRT and WebVTT swap in both directions with identical millisecond timing, while ASS/SSA exports one-way to plain SRT. The classic use is the browser bridge — an SRT file that plays fine in VLC is rejected by the HTML5 track element, and this is the quickest way to get a valid VTT.",
        "Conversion is honest about what each format can express. SRT and WebVTT carry the same timing model, so a round trip changes nothing but the syntax: the comma before the milliseconds becomes a dot, the WEBVTT header and cue identifiers appear or disappear, and cue text survives line by line. ASS/SSA is different — its positioning, karaoke and style tags have no SRT equivalent and are stripped, leaving clean text with the original timing.",
        "Broken input is rejected instead of silently repaired: missing timestamps, inverted cue times (a cue ending before it starts) or files that decode to garbage return a clear error, so you never ship a subtitle track that drops cues halfway. Everything runs entirely in your browser — fan subtitles, work-in-progress scripts and licensed masters never leave the device.",
      ],
      steps: [
        "Pick the source format — SRT, WebVTT or ASS/SSA — and paste the subtitle content.",
        "Pick the target format: WebVTT for web players, SRT for hardware players (ASS/SSA always targets SRT).",
        "Hit Convert, check the result and copy it — line endings and timestamps are normalized on the way out.",
      ],
      faqs: [
        {
          q: "Are the timings preserved exactly?",
          a: "Yes. SRT and WebVTT both express timing in hours, minutes, seconds and milliseconds, so conversion is lossless for timing — only the separators and headers change. ASS/SSA stores centiseconds, which convert exactly into SRT milliseconds.",
        },
        {
          q: "What happens to ASS styles and karaoke effects?",
          a: "They are removed. SRT has no style model, so font, color, positioning and karaoke tags cannot survive the trip — the text and its timing do. For styled releases, keep the ASS file muxed into the video container.",
        },
        {
          q: "Which format does an HTML5 video player need?",
          a: "WebVTT. The HTML5 track element only accepts text/vtt, so an SRT file must be converted first; the reverse trip takes the same file back to players and editors that expect SRT.",
        },
        {
          q: "Is anything uploaded?",
          a: "No. Parsing and generation run entirely in your browser, so private or unfinished subtitles never leave the device.",
        },
      ],
      deepDive: [
        {
          heading: "Why SRT and WebVTT differ: a short format history",
          paragraphs: [
            "SRT was born as the output file of SubRip, a 2000-era Windows program that ripped subtitles off DVDs by optical character recognition. The Matroska project describes it as perhaps the most basic of all subtitle formats: a numbered counter, one timing line, the text, a blank line, repeat. It has no header, no metadata and no standard styling — which is exactly why every player, editor and platform on earth can read it. The comma before the milliseconds is a quirk of its European desktop origins: in much of Europe the decimal separator is a comma, and SubRip followed that convention. That single character is the most recognizable fingerprint of the format, and swapping it for a dot is the core mechanical step of every SRT-to-VTT conversion.",
            "WebVTT started life in 2010 as WebSRT, a WHATWG proposal for the new HTML5 track element, deliberately modeled on SubRip but never fully compatible with it; it was renamed WebVTT as it matured into the W3C standard. The differences are structural, not cosmetic: a WebVTT file must open with the WEBVTT signature or a parser rejects the whole file; timestamps use a dot before the milliseconds; cues may carry identifiers and settings such as position, line and size; and STYLE, REGION and NOTE blocks can carry CSS and comments that SRT has nowhere to put.",
            "The reason the two formats rarely coexist peacefully is the HTML5 track element: the specification accepts only text/vtt, so browsers — Chrome and Internet Explorer 10 led, Firefox enabled it by default in 2014 — reject SRT files outright no matter how well-formed they are. YouTube began accepting WebVTT in 2013 alongside its long-standing SRT upload support. Practically, this splits the world in two: web players want VTT, everything else from TV sets to desktop editors wants SRT, and the conversion bridge between the two is always busy.",
          ],
        },
        {
          heading: "Subtitle workflow realities: players, frame rates and what ASS can do",
          paragraphs: [
            "Choose the target format by destination, not by preference. Hardware players — TVs, set-top boxes, in-car media units, the long tail of media servers — implement SRT because its parser is a dozen lines long; VLC and mpv read everything; browsers read only WebVTT; YouTube accepts SRT uploads (UTF-8 only, per its help pages) as well as VTT. A conversion tool that respects this reality converts both ways without editorializing, and that is exactly what this one does.",
            "Timing resolution sounds like a trap but mostly is not. SRT and WebVTT count milliseconds, ASS counts centiseconds, and all three convert into each other exactly — 41 centiseconds are 410 milliseconds, with no rounding. The real timing pitfalls live elsewhere: video shot at 23.976 or 29.97 frames per second advances in 41.7 or 33.4 millisecond steps, subtitles ripped from frame-based formats (MicroDVD and friends) carry that quantization, and a file timed for one release will drift against another. Those problems need a sync tool that shifts or stretches the timeline — a capability deliberately not faked here, because format conversion cannot fix them.",
            "ASS (Advanced SubStation Alpha, the modern descendant of the original SubStation Alpha and the daily format of Aegisub) is less a subtitle format than a rendering script: \\pos and \\move place text anywhere on screen, \\k tags time karaoke syllables, override blocks restyle mid-line, and shapes and clip masks draw over the video. SRT can express none of this — its only informal concession is the occasional bold or italic HTML tag. Converting ASS to SRT is therefore a deliberate downgrade: text and timing arrive, presentation dies. That is why fan releases mux the ASS into the MKV, while copies that must play anywhere ship plain SRT.",
          ],
        },
      ],
    },
    zh: {
      name: "字幕格式转换",
      tagline: "SRT 与 WebVTT 双向互转,ASS/SSA 单向转出干净 SRT——时间轴精确保留,标签按规则剥离,全部在本机浏览器完成,不上传。",
      intro: [
        "贴入 SRT、WebVTT 或 ASS/SSA 字幕,选好目标格式一键转换:SRT 与 WebVTT 双向互转,毫秒级时间轴完全一致;ASS/SSA 只导出为纯文本 SRT。最经典的用途是浏览器桥接——在 VLC 里播得好好的 SRT,放进 HTML5 的 track 标签会被直接拒收,这里一步就能得到合法的 VTT。",
        "转换对每种格式能表达什么保持诚实。SRT 与 WebVTT 的时间模型相同,往返一次只改语法:毫秒前的逗号换成点,WEBVTT 头与 cue 序号随之增减,文本逐行原样保留。ASS/SSA 则不同——它的定位、卡拉OK与样式标签在 SRT 里没有对应物,会被剥离,留下带着原始时间轴的干净文本。",
        "坏输入会被明确拒绝,而不是悄悄修补:时间戳缺失、字幕起止倒置(结束早于开始)、或解码出来是乱码的文件都会返回明确错误,绝不产出中途丢字幕的轨道。全部在本机浏览器内完成——粉丝字幕、未完成的工作稿、授权母版都不会离开设备。",
      ],
      steps: [
        "选择源格式(SRT / WebVTT / ASS/SSA),粘贴字幕内容。",
        "选择目标格式:网页播放器用 WebVTT,硬件播放器用 SRT(ASS/SSA 固定输出 SRT)。",
        "点转换,检查结果并复制——换行符与时间戳在输出时统一归一。",
      ],
      faqs: [
        {
          q: "时间轴会完全保留吗?",
          a: "会。SRT 与 WebVTT 都以时、分、秒、毫秒计时,转换对时间轴无损,变的只有分隔符与文件头;ASS/SSA 以厘秒计时,换算成 SRT 毫秒同样精确无误差。",
        },
        {
          q: "ASS 的样式和卡拉OK特效怎么办?",
          a: "会被移除。SRT 没有样式模型,字体、颜色、定位与卡拉OK标签无法在转换后幸存——保下来的是文本与时间轴。要保留特效,请把 ASS 文件封装进视频容器。",
        },
        {
          q: "HTML5 网页播放器需要哪种格式?",
          a: "WebVTT。HTML5 的 track 标签只接受 text/vtt,所以 SRT 必须先转换;反向转换则能把文件带回认 SRT 的播放器与编辑器。",
        },
        {
          q: "内容会被上传吗?",
          a: "不会。解析与生成全部在浏览器内完成,私人字幕或未完成的稿子从不离开设备。",
        },
      ],
      deepDive: [
        {
          heading: "SRT 与 VTT 为什么长得不一样:一份简短的格式史",
          paragraphs: [
            "SRT 诞生于 2000 年前后的 Windows 免费软件 SubRip——它用光学字符识别从 DVD 里抠字幕,输出的文本格式就是 SRT。Matroska 项目称它也许是所有字幕格式里最基本的一个:序号、一行时间轴、文本、空行,循环往复。它没有文件头、没有元数据、没有标准的样式定义——这恰恰是全世界每个播放器、编辑器和平台都能读它的原因。毫秒前那个逗号是它欧洲桌面血统的印记:欧洲多数语言的十进制分隔符就是逗号,SubRip 照搬了这个习惯。这一个字符是整个格式最好认的指纹,把它换成点,就是每次 SRT 转 VTT 的核心机械步骤。",
            "WebVTT 在 2010 年以 WebSRT 的名字问世,是 WHATWG 为 HTML5 新增 track 元素提出的提案,刻意参照了 SubRip 却从未与它完全兼容;成熟为 W3C 标准时改名为 WebVTT。两者的差异是结构性的:WebVTT 文件必须以 WEBVTT 签名开头,解析器见到别的开头会整文件拒收;时间戳的毫秒前用点;cue 可以带序号标识与 position、line、size 等设置;还能携带 STYLE、REGION、NOTE 块来放 CSS 与注释——这些在 SRT 里都无处安放。",
            "两种格式难以和平共处的根源是 HTML5 的 track 元素:规范只接受 text/vtt,浏览器——Chrome 与 IE10 打头,Firefox 在 2014 年默认启用——无论 SRT 写得多规范都直接拒收。YouTube 在 2013 年开始支持 WebVTT,与它长期支持的 SRT 上传并存。实际结果是世界被分成两半:网页播放器要 VTT,从电视机到桌面编辑器的其他一切要 SRT,两者之间的转换桥永远有人要走。",
          ],
        },
        {
          heading: "字幕工作流实务:播放器、帧率与 ASS 的能力边界",
          paragraphs: [
            "目标格式跟着播放设备走,而不是跟着偏好走。硬件播放器——电视、机顶盒、车载媒体主机、长尾的媒体服务器——都实现 SRT,因为它的解析器十来行就能写完;VLC 与 mpv 什么都读;浏览器只读 WebVTT;YouTube 既收 SRT 上传(其帮助页明言仅限 UTF-8)也收 VTT。尊重这个现实的转换工具就应当双向都转、不做裁断——本工具正是如此。",
            "时间精度听着像坑,多数时候不是。SRT 与 WebVTT 计毫秒,ASS 计厘秒,三者互相换算精确无损——41 厘秒就是 410 毫秒,没有舍入。真正的时间坑在别处:23.976 或 29.97 帧率的视频以 41.7 或 33.4 毫秒为一步推进,从帧计格式(MicroDVD 之流)抠出的字幕带着这种量化,给某个发布版对好的时间轴换一个片源就会漂移。这些问题需要能平移或拉伸时间轴的同步工具——本工具刻意不假装具备,因为格式转换修不了它们。",
            "ASS(Advanced SubStation Alpha,老牌 SubStation Alpha 的现代后裔、Aegisub 的日常格式)与其说是字幕格式,不如说是渲染脚本:\\pos 与 \\move 能把文字放到画面任意位置,\\k 标签逐音节计时卡拉OK,覆盖块能在行中改样式,形状与裁剪蒙版能画在视频上。SRT 表达不了其中任何一项——它唯一不正式的让步是个别加粗或斜体的 HTML 标签。所以 ASS 转 SRT 是一次刻意的降级:文本与时间轴抵达,表现力阵亡。这就是为什么粉丝发布把 ASS 封装进 MKV,而必须随处可播的发行版发纯 SRT。",
          ],
        },
      ],
    },
    ja: {
      name: "字幕フォーマット変換",
      tagline:
        "SRT と WebVTT を双方向に変換、ASS/SSA は SRT への一方向出力に対応。タイミングはミリ秒単位で正確に保たれ、タグはルールに従って剥離。処理はすべてブラウザ内で完結します。",
      intro: [
        "SRT・WebVTT・ASS/SSA の字幕を貼り付けて、変換先フォーマットを選ぶだけで完了します。SRT と WebVTT は双方向に変換でき、ミリ秒単位のタイミングは完全に一致。ASS/SSA はプレーンな SRT への一方向出力です。定番の用途はブラウザ向けの橋渡しで、VLC では問題なく再生できる SRT は HTML5 の track 要素に拒否されるため、ここで合法的な VTT に変換するのが最短ルートです。",
        "変換は各フォーマットが表現できるものに対して誠実です。SRT と WebVTT はタイミングのモデルが同一なので、往復変換しても変わるのは構文だけです。ミリ秒前のカンマがドットになり、WEBVTT ヘッダーやキュー番号は付き、テキストは行ごとそのまま保たれます。ASS/SSA は別で、位置指定・カラオケ・スタイルのタグは SRT に相当するものがないため剥離され、元のタイミングを持つクリーンなテキストだけが残ります。",
        "壊れた入力は黙って修復せず、はっきり拒否します。タイムスタンプの欠落、キューの開始と終了の逆転、デコードすると文字化けするファイルは明確なエラーを返し、途中で字幕が抜け落ちるトラックを作りません。処理はすべてブラウザ内で完結し、ファン字幕も作業中の稿も完成マスターも端末の外に出ません。",
      ],
      steps: [
        "変換元フォーマット(SRT / WebVTT / ASS/SSA)を選び、字幕の内容を貼り付けます。",
        "変換先フォーマットを選びます。Web プレイヤーには WebVTT、ハードウェアプレイヤーには SRT(ASS/SSA は常に SRT 出力)。",
        "変換を押し、結果を確認してコピーします。改行コードとタイムスタンプは出力時に正規化されます。",
      ],
      faqs: [
        {
          q: "タイミングは完全に保たれますか?",
          a: "保たれます。SRT と WebVTT はどちらも時・分・秒・ミリ秒で計るため、変換によるタイミングの劣化はなく、変わるのは区切り文字とヘッダーだけです。ASS/SSA のセンチ秒も SRT のミリ秒に誤差なく換算されます。",
        },
        {
          q: "ASS のスタイルやカラオケ効果はどうなりますか?",
          a: "削除されます。SRT にはスタイルのモデルがないため、フォント・色・位置指定・カラオケタグは変換後も残りません。残るのはテキストとタイミングです。効果を保ちたい場合は ASS を動画コンテナに多重化(mux)してください。",
        },
        {
          q: "HTML5 の動画プレイヤーにはどの形式が必要ですか?",
          a: "WebVTT です。HTML5 の track 要素は text/vtt のみを受け付けるため、SRT は先に変換が必要です。逆方向の変換で、SRT を想定したプレイヤーやエディタに戻せます。",
        },
        {
          q: "内容はアップロードされますか?",
          a: "されません。解析も生成もすべてブラウザ内で行われ、プライベートな字幕や未完成の稿が端末の外に出ることはありません。",
        },
      ],
      deepDive: [
        {
          heading: "SRT と VTT はなぜ違うのか:短いフォーマット史",
          paragraphs: [
            "SRT は 2000 年前後の Windows フリーソフト SubRip の出力ファイルとして生まれました。DVD から光学式文字認識で字幕を吸い出すプログラムで、そのテキスト形式が SRT です。Matroska プロジェクトはこれをおそらく全字幕形式の中で最も基本的なものだと述べています。番号、タイミング行、テキスト、空行の繰り返し。ヘッダーもメタデータも標準のスタイル定義も持たない——それこそが、地球上のあらゆるプレイヤー・エディタ・プラットフォームが読める理由です。ミリ秒前のカンマはヨーロッパのデスクトップ文化の刻印で、ヨーロッパの多くの言語では小数点区切りがカンマであり、SubRip はそれに従いました。この一文字こそフォーマット最大の指紋であり、これをドットに置き換えることが SRT から VTT への変換の核心的な機械工程です。",
            "WebVTT は 2010 年、WebSRT という名で誕生しました。HTML5 の新要素 track のために WHATWG が出した提案で、意図的に SubRip を参照しながらも完全互換にはなりませんでした。W3C 標準として熟成する過程で WebVTT と改名されています。両者の違いは構造的です。WebVTT ファイルは WEBVTT という署名で始まらねばならず、パーサーはそれ以外の冒頭をファイル全体の拒否理由にします。タイムスタンプのミリ秒前はドット。キューには番号識別子や position・line・size といった設定を持てます。さらに STYLE・REGION・NOTE ブロックで CSS やコメントを運べます——SRT には置き場所がありません。",
            "二つの形式が穏やかに共存できない根源は HTML5 の track 要素にあります。仕様は text/vtt のみを受け付け、ブラウザ——Chrome と IE10 が先行し、Firefox は 2014 年に既定で有効化——はどれほど整形式の SRT でも容赦なく拒否します。YouTube は 2013 年に WebVTT 対応を始め、長年対応の SRT アップロードと並存させています。現実には世界は二つに分かれ、Web プレイヤーは VTT を、テレビからデスクトップエディタまでの他のすべては SRT を要求し、その間の変換橋には常に人が行き来しています。",
          ],
        },
        {
          heading: "字幕ワークフローの実務:プレイヤー、フレームレート、ASS の能力の限界",
          paragraphs: [
            "変換先は好みではなく再生機器で決めます。テレビ、セットトップボックス、カーナビ媒体、主流外のメディアサーバーまで、ハードウェアプレイヤーが SRT を実装するのはそのパーサーが十数行で書けるからです。VLC と mpv は何でも読み、ブラウザは WebVTT しか読まず、YouTube は SRT アップロード(ヘルプページに UTF-8 専用と明記)も VTT も受け付けます。この現実を尊重する変換ツールは双方へ無条件に変換すべきで、このツールはまさにそうしています。",
            "時間精度は罠のように聞こえて、たいてい罠ではありません。SRT と WebVTT はミリ秒、ASS はセンチ秒を数え、三者は互いに正確に換算できます——41 センチ秒は 410 ミリ秒で、丸め誤差はありません。本当の落とし穴は別の場所にあります。23.976 や 29.97 fps の映像は 41.7ms・33.4ms 刻みで進み、フレーム単位の形式(MicroDVD など)から吸い出した字幕はその量子化を引きずり、あるリリースに合わせたタイミングは別のソースではずれます。これらはタイムラインを平行移動・伸縮できる同期ツールが要る問題で、フォーマット変換では直りません。このツールはその能力を意図的に偽りません。",
            "ASS(Advanced SubStation Alpha。旧 SubStation Alpha の現代の末裔で、Aegisub の日々の形式)は字幕形式というよりレンダリングスクリプトです。\\pos と \\move は文字を画面の任意の場所に置き、\\k タグはカラオケを音節単位で計り、上書きブロックは行の途中でスタイルを変え、形状やクリップマスクは映像の上に描画します。SRT はこのどれも表現できません——非公式の譲歩は太字・斜体の HTML タグ程度です。したがって ASS から SRT への変換は意図的なダウングレードであり、テキストとタイミングは届きますが表現力は死にます。ファンリリースが ASS を MKV に多重化し、どこでも再生できる必要のある流通版がプレーンな SRT を配るのはこのためです。",
          ],
        },
      ],
    },
    es: {
      name: "Conversor de subtítulos",
      tagline:
        "Convierte subtítulos entre SRT y WebVTT en ambas direcciones, o pasa ASS/SSA a SRT limpio — tiempos preservados, etiquetas eliminadas, todo procesado localmente en tu navegador.",
      intro: [
        "Pega cualquier subtítulo SRT, WebVTT o ASS/SSA, elige el formato de destino y convierte: SRT y WebVTT se intercambian en ambas direcciones con una temporización idéntica al milisegundo, mientras que ASS/SSA exporta solo en un sentido a SRT plano. El uso clásico es el puente hacia el navegador: un SRT que VLC reproduce sin problema lo rechaza el elemento track de HTML5, y aquí tienes la vía rápida a un VTT válido.",
        "La conversión es honesta con lo que cada formato puede expresar. SRT y WebVTT comparten el mismo modelo de tiempos, así que un viaje de ida y vuelta solo cambia la sintaxis: la coma antes de los milisegundos se convierte en punto, la cabecera WEBVTT y los identificadores de cue aparecen o desaparecen, y el texto sobrevive línea a línea. ASS/SSA es otra historia — sus etiquetas de posición, karaoke y estilo no tienen equivalente en SRT y se eliminan, dejando texto limpio con la temporización original.",
        "La entrada rota se rechaza en lugar de repararse en silencio: marcas de tiempo ausentes, pistas invertidas (un cue que termina antes de empezar) o archivos que decodifican a basura devuelven un error claro, para que nunca publiques una pista que pierde subtítulos a mitad de camino. Todo corre enteramente en tu navegador — subtítulos de fans, guiones en progreso y másteres licenciados nunca salen del dispositivo.",
      ],
      steps: [
        "Elige el formato de origen — SRT, WebVTT o ASS/SSA — y pega el contenido del subtítulo.",
        "Elige el formato de destino: WebVTT para reproductores web, SRT para reproductores de hardware (ASS/SSA siempre produce SRT).",
        "Pulsa Convertir, revisa el resultado y cópialo — los saltos de línea y las marcas de tiempo se normalizan a la salida.",
      ],
      faqs: [
        {
          q: "¿Se conservan los tiempos exactamente?",
          a: "Sí. SRT y WebVTT miden el tiempo en horas, minutos, segundos y milisegundos, así que la conversión no pierde precisión — solo cambian los separadores y las cabeceras. Los centisegundos de ASS/SSA se convierten con exactitud en milisegundos de SRT.",
        },
        {
          q: "¿Qué pasa con los estilos y el karaoke de ASS?",
          a: "Se eliminan. SRT no tiene modelo de estilos, así que fuente, color, posición y etiquetas de karaoke no sobreviven al viaje — el texto y su tiempo sí. Para conservar efectos, mantén el ASS multiplexado en el contenedor de vídeo.",
        },
        {
          q: "¿Qué formato necesita un reproductor HTML5?",
          a: "WebVTT. El elemento track de HTML5 solo acepta text/vtt, así que un archivo SRT debe convertirse antes; el viaje inverso devuelve el mismo archivo a reproductores y editores que esperan SRT.",
        },
        {
          q: "¿Se sube algo a algún servidor?",
          a: "No. El análisis y la generación corren enteramente en tu navegador, así que los subtítulos privados o inacabados nunca salen del dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Por qué difieren SRT y WebVTT: una breve historia del formato",
          paragraphs: [
            "SRT nació como archivo de salida de SubRip, un programa de Windows de la época del año 2000 que arrancaba subtítulos de DVD por reconocimiento óptico de caracteres. El proyecto Matroska lo describe como quizá el más básico de todos los formatos de subtítulos: un contador numerado, una línea de tiempos, el texto, una línea en blanco, y otra vez. Sin cabecera, sin metadatos, sin estilo estándar — justo por eso lo lee cada reproductor, editor y plataforma del planeta. La coma antes de los milisegundos es una herencia de sus orígenes europeos de escritorio: en gran parte de Europa el separador decimal es la coma, y SubRip lo siguió. Ese carácter es la huella más reconocible del formato, y cambiarlo por un punto es el paso mecánico central de toda conversión de SRT a VTT.",
            "WebVTT empezó en 2010 como WebSRT, una propuesta del WHATWG para el nuevo elemento track de HTML5, deliberadamente modelada sobre SubRip pero nunca del todo compatible con él; se renombró WebVTT al madurar como estándar del W3C. Las diferencias son estructurales: un archivo WebVTT debe abrir con la firma WEBVTT o el analizador rechaza el archivo entero; las marcas de tiempo usan punto antes de los milisegundos; los cues pueden llevar identificadores y ajustes como position, line y size; y los bloques STYLE, REGION y NOTE transportan CSS y comentarios que SRT no tiene dónde poner.",
            "La razón por la que los dos formatos rara vez conviven en paz es el elemento track de HTML5: la especificación acepta solo text/vtt, así que los navegadores — Chrome e Internet Explorer 10 a la cabeza, Firefox lo activó por defecto en 2014 — rechazan los archivos SRT sin importar lo bien formados que estén. YouTube empezó a aceptar WebVTT en 2013 junto a su soporte de subidas SRT de siempre. En la práctica el mundo queda partido en dos: los reproductores web quieren VTT, y todo lo demás — de los televisores a los editores de escritorio — quiere SRT; entre ambos, el puente de la conversión nunca deja de transitarse.",
          ],
        },
        {
          heading: "Realidades del flujo de trabajo: reproductores, fotogramas y lo que ASS puede hacer",
          paragraphs: [
            "Elige el formato de destino según el aparato, no según el gusto. Los reproductores de hardware — televisores, receptores, unidades de coche, la larga cola de servidores multimedia — implementan SRT porque su analizador cabe en una docena de líneas; VLC y mpv leen todo; los navegadores leen solo WebVTT; YouTube acepta subidas SRT (solo UTF-8, según sus páginas de ayuda) además de VTT. Una herramienta que respeta esta realidad convierte en ambas direcciones sin opinar, y eso es exactamente lo que hace esta.",
            "La resolución de tiempos suena a trampa y casi nunca lo es. SRT y WebVTT cuentan milisegundos, ASS cuenta centisegundos, y los tres se convierten entre sí con exactitud — 41 centisegundos son 410 milisegundos, sin redondeo. Las trampas de verdad viven en otro sitio: el vídeo a 23.976 o 29.97 fps avanza a pasos de 41.7 o 33.4 milisegundos, los subtítulos arrancados de formatos por fotogramas (MicroDVD y compañía) arrastran esa cuantización, y un archivo ajustado a un montaje se desfasa con otro. Esos problemas piden una herramienta de sincronización que desplace o estire la línea de tiempo — capacidad que aquí no fingimos, porque la conversión de formato no los arregla.",
            "ASS (Advanced SubStation Alpha, descendiente moderno del SubStation Alpha original y formato diario de Aegisub) es menos un formato de subtítulos que un script de renderizado: \\pos y \\move colocan el texto en cualquier punto de la pantalla, \\k cronometra el karaoke sílaba a sílaba, los bloques de override restilan a mitad de línea, y las formas y máscaras de recorte dibujan sobre el vídeo. SRT no puede expresar nada de esto — su única concesión informal son las etiquetas HTML de negrita o cursiva. Convertir ASS a SRT es por tanto una degradación deliberada: llegan el texto y el tiempo, la presentación muere. Por eso los lanzamientos de fans multiplexan el ASS dentro del MKV, y las copias que deben reproducirse en cualquier sitio llevan SRT plano.",
          ],
        },
      ],
    },
    pt: {
      name: "Conversor de legendas",
      tagline:
        "Converta legendas entre SRT e WebVTT em ambas as direções, ou transforme ASS/SSA em SRT limpo — tempos preservados, tags removidas, tudo processado localmente no seu navegador.",
      intro: [
        "Cole qualquer legenda SRT, WebVTT ou ASS/SSA, escolha o formato de destino e converta: SRT e WebVTT se trocam nas duas direções com temporização idêntica ao milissegundo, enquanto ASS/SSA exporta só num sentido para SRT simples. O uso clássico é a ponte para o navegador — um SRT que o VLC reproduz sem problema é rejeitado pelo elemento track do HTML5, e aqui está o caminho rápido para um VTT válido.",
        "A conversão é honesta quanto ao que cada formato consegue expressar. SRT e WebVTT compartilham o mesmo modelo de tempos, então uma ida e volta muda só a sintaxe: a vírgula antes dos milissegundos vira ponto, o cabeçalho WEBVTT e os identificadores de cue aparecem ou desaparecem, e o texto sobrevive linha a linha. ASS/SSA é outra história — suas tags de posicionamento, karaokê e estilo não têm equivalente em SRT e são removidas, deixando texto limpo com a temporização original.",
        "Entrada quebrada é rejeitada em vez de consertada em silêncio: carimbos de tempo ausentes, cues invertidos (um cue que termina antes de começar) ou arquivos que decodificam como lixo devolvem um erro claro, para que você nunca publique uma faixa que perde legendas no meio do caminho. Tudo roda inteiramente no seu navegador — legendas de fãs, roteiros em andamento e másters licenciados nunca saem do dispositivo.",
      ],
      steps: [
        "Escolha o formato de origem — SRT, WebVTT ou ASS/SSA — e cole o conteúdo da legenda.",
        "Escolha o formato de destino: WebVTT para players da web, SRT para players de hardware (ASS/SSA sempre produz SRT).",
        "Clique em Converter, confira o resultado e copie — quebras de linha e carimbos de tempo são normalizados na saída.",
      ],
      faqs: [
        {
          q: "Os tempos são preservados exatamente?",
          a: "Sim. SRT e WebVTT medem o tempo em horas, minutos, segundos e milissegundos, então a conversão não perde precisão — mudam apenas os separadores e os cabeçalhos. Os centissegundos do ASS/SSA se convertem com exatidão em milissegundos do SRT.",
        },
        {
          q: "O que acontece com os estilos e o karaokê do ASS?",
          a: "São removidos. O SRT não tem modelo de estilos, então fonte, cor, posicionamento e tags de karaokê não sobrevivem à viagem — o texto e o tempo sobrevivem. Para conservar efeitos, mantenha o ASS multiplexado no contêiner de vídeo.",
        },
        {
          q: "Qual formato um player HTML5 precisa?",
          a: "WebVTT. O elemento track do HTML5 aceita apenas text/vtt, então um arquivo SRT precisa ser convertido antes; a viagem de volta devolve o mesmo arquivo a players e editores que esperam SRT.",
        },
        {
          q: "Algo é enviado para servidores?",
          a: "Não. A análise e a geração rodam inteiramente no seu navegador, então legendas privadas ou inacabadas nunca saem do dispositivo.",
        },
      ],
      deepDive: [
        {
          heading: "Por que SRT e WebVTT diferem: uma breve história do formato",
          paragraphs: [
            "O SRT nasceu como arquivo de saída do SubRip, um programa de Windows da época do ano 2000 que arrancava legendas de DVD por reconhecimento óptico de caracteres. O projeto Matroska o descreve como talvez o mais básico de todos os formatos de legenda: um contador numerado, uma linha de tempos, o texto, uma linha em branco, e de novo. Sem cabeçalho, sem metadados, sem estilo padrão — e é justamente por isso que todo player, editor e plataforma do planeta o lê. A vírgula antes dos milisegundos é uma herança das origens europeias de desktop: em boa parte da Europa o separador decimal é a vírgula, e o SubRip seguiu a convenção. Esse único caractere é a impressão digital mais reconhecível do formato, e trocá-lo por um ponto é o passo mecânico central de toda conversão de SRT para VTT.",
            "O WebVTT começou em 2010 como WebSRT, uma proposta do WHATWG para o novo elemento track do HTML5, deliberadamente modelada sobre o SubRip mas nunca totalmente compatível com ele; foi renomeado WebVTT ao amadurecer como padrão do W3C. As diferenças são estruturais: um arquivo WebVTT deve abrir com a assinatura WEBVTT ou o analisador rejeita o arquivo inteiro; os carimbos de tempo usam ponto antes dos milissegundos; cues podem levar identificadores e configurações como position, line e size; e blocos STYLE, REGION e NOTE transportam CSS e comentários que o SRT não tem onde guardar.",
            "A razão de os dois formatos raramente coexistirem em paz é o elemento track do HTML5: a especificação aceita apenas text/vtt, então os navegadores — Chrome e Internet Explorer 10 à frente, Firefox ativou por padrão em 2014 — rejeitam arquivos SRT por mais bem formados que estejam. O YouTube passou a aceitar WebVTT em 2013 junto ao seu suporte de envio SRT de sempre. Na prática o mundo fica partido em dois: players da web querem VTT, e todo o resto — das televisões aos editores de desktop — quer SRT; entre os dois, a ponte da conversão nunca para de ser atravessada.",
          ],
        },
        {
          heading: "Realidades do fluxo de legendas: players, taxas de quadro e o que o ASS consegue",
          paragraphs: [
            "Escolha o formato de destino pelo aparelho, não pelo gosto. Players de hardware — televisões, receptores, unidades de carro, a longa cauda de servidores de mídia — implementam SRT porque o analisador cabe numa dúzia de linhas; VLC e mpv leem tudo; navegadores leem só WebVTT; o YouTube aceita envio de SRT (só UTF-8, segundo suas páginas de ajuda) além de VTT. Uma ferramenta que respeita essa realidade converte nas duas direções sem opinar, e é exatamente isso que esta faz.",
            "A resolução de tempo soa como armadilha e quase nunca é. SRT e WebVTT contam milissegundos, ASS conta centissegundos, e os três se convertem entre si com exatidão — 41 centissegundos são 410 milissegundos, sem arredondamento. As armadilhas de verdade moram em outro lugar: vídeo a 23.976 ou 29.97 fps avança em passos de 41.7 ou 33.4 milissegundos, legendas arrancadas de formatos por quadro (MicroDVD e companhia) carregam essa quantização, e um arquivo ajustado para uma montagem desanda com outra. Esses problemas pedem uma ferramenta de sincronização que desloque ou estique a linha do tempo — capacidade que aqui não fingimos, porque conversão de formato não os conserta.",
            "ASS (Advanced SubStation Alpha, descendente moderno do SubStation Alpha original e formato diário do Aegisub) é menos um formato de legenda do que um script de renderização: \\pos e \\move colocam o texto em qualquer ponto da tela, \\k cronometra o karaokê sílaba a sílaba, blocos de override restilizam no meio da linha, e formas e máscaras de recorte desenham sobre o vídeo. O SRT não expressa nada disso — sua única concessão informal são tags HTML de negrito ou itálico. Converter ASS para SRT é portanto um rebaixamento deliberado: o texto e o tempo chegam, a apresentação morre. Por isso lançamentos de fãs multiplexam o ASS dentro do MKV, e cópias que precisam tocar em qualquer lugar levam SRT simples.",
          ],
        },
      ],
    },
  },
});
