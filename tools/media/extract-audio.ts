import { ExtractAudioEngine } from "../_engines/media-engine-extract-audio";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "extract-audio",
  category: "utility",
  icon: "file",
  engine: { component: ExtractAudioEngine },
  related: ["image-compressor", "compress-image-to-size", "convert-image", "crop-image", "image-resizer", "qr-generator", "exif-remover", "merge-images"],
  copy: {
    en: {
      name: "Video to MP3",
      tagline: "Pull the audio track out of any video as an MP3 — MP4, MOV, WebM and more, converted entirely inside your browser with ffmpeg.wasm. No upload, no server.",
      intro: [
        "Lectures to listen to while commuting, podcast recordings trapped in video files, interviews you want as audio for transcription, soundtracks you want on your phone — this tool separates the audio track from a video and encodes it as a standard MP3 that plays everywhere.",
        "The conversion runs on ffmpeg.wasm — the same FFmpeg that powers countless desktop converters, compiled to WebAssembly and running in your browser's own memory. The video is read from disk into a virtual in-memory filesystem, demuxed, the audio stream decoded and re-encoded with libmp3lame, and the result handed back as a download. No byte of the video touches a network.",
        "First use downloads the engine once (about 31 MB); your browser caches it, so every conversion afterwards starts instantly. The single-threaded build needs no SharedArrayBuffer, which means the site works everywhere without special headers — and without uploading your files to anyone.",
      ],
      steps: [
        "Drop in a video file — MP4, MOV, WebM, MKV and other common containers all work.",
        "Pick an MP3 quality: 320 kbps for music, 192 kbps for general use, 128 kbps to save space on spoken word.",
        "Click Extract audio and download the MP3. Long videos take a while — the progress bar reflects real encoding progress.",
      ],
      faqs: [
        {
          q: "Is my video uploaded anywhere?",
          a: "No. ffmpeg.wasm runs in your browser's memory: the video is read locally into a virtual filesystem, converted, and the MP3 is generated on your device. The only network request is the one-time engine download from a public CDN — your file is never part of it.",
        },
        {
          q: "Why is the first conversion slow?",
          a: "The first run downloads the WebAssembly engine (~31 MB) — a one-time cost, after which your browser cache serves it instantly. Conversions themselves run near real-time speed or faster: audio encoding is much lighter than video re-encoding.",
        },
        {
          q: "Which quality should I choose?",
          a: "320 kbps is transparent for music; 192 kbps is the sweet spot for most content including podcasts and lectures; 128 kbps keeps spoken word files small. Note that MP3 can't exceed the source's quality — a low-bitrate source video stays low-bitrate regardless of the setting.",
        },
        {
          q: "The tool says no audio track was found — why?",
          a: "Some videos are genuinely silent, and a few containers (raw .ts streams, some .flv) aren't matched by the quick demuxer. Convert those to MP4 first, or check that the file actually plays with sound in your player.",
        },
      ],
    },
    zh: {
      name: "视频转 MP3",
      tagline: "把任意视频的音轨提取成 MP3——MP4、MOV、WebM 等常见格式,ffmpeg.wasm 在浏览器内完成转换。不上传、无服务器。",
      intro: [
        "通勤路上想听的课程、困在视频文件里的播客录音、想转成音频做转写的访谈、想要手机里循环的原声——本工具把视频的音轨分离出来,编码成随处可播的标准 MP3。",
        "转换由 ffmpeg.wasm 完成——就是驱动无数桌面转换器的 FFmpeg,编译成 WebAssembly 在你的浏览器内存里运行。视频从磁盘读进虚拟内存文件系统,解封装、解码音频流、用 libmp3lame 重新编码,结果以下载形式交还。视频的每一个字节都不经过网络。",
        "首次使用会下载一次引擎(约 31 MB),浏览器会缓存,之后的转换立即开始。单线程版不需要 SharedArrayBuffer,所以站点无需特殊响应头就能到处可用——你的文件也不用上传给任何人。",
      ],
      steps: [
        "拖入视频文件——MP4、MOV、WebM、MKV 等常见容器都支持。",
        "选择 MP3 音质:音乐选 320 kbps,日常内容选 192 kbps,人声内容想省空间选 128 kbps。",
        "点击「提取音频」并下载 MP3。长视频需要一些时间——进度条反映的是真实编码进度。",
      ],
      faqs: [
        {
          q: "我的视频会被上传吗?",
          a: "不会。ffmpeg.wasm 在浏览器内存中运行:视频在本地读入虚拟文件系统、完成转换、MP3 在你的设备上生成。唯一的网络请求是从公共 CDN 一次性下载引擎——你的文件与此无关。",
        },
        {
          q: "为什么第一次转换慢?",
          a: "首次运行要下载 WebAssembly 引擎(约 31 MB)——一次性成本,之后浏览器缓存直接秒开。转换本身接近实时速度或更快:音频编码比视频重编码轻得多。",
        },
        {
          q: "音质应该怎么选?",
          a: "音乐选 320 kbps(无失真感);播客和课程等内容 192 kbps 是甜蜜点;纯人声想省空间选 128 kbps。注意 MP3 无法超越源文件质量——低码率的源视频无论怎么设置都是低码率。",
        },
        {
          q: "提示「没有找到音频轨」是怎么回事?",
          a: "有些视频真的没有声音;少数容器(原始 .ts 流、部分 .flv)quick demuxer 处理不了。先把它们转成 MP4 再来,或确认文件在播放器里确实有声音。",
        },
      ],
    },
    ja: {
      name: "動画を MP3 に変換",
      tagline: "あらゆる動画から音声トラックを MP3 として抽出 — MP4・MOV・WebM など、ffmpeg.wasm でブラウザ内完結。アップロード不要・サーバーなし。",
      intro: [
        "通勤中に聴きたい講義、動画ファイルに閉じ込められたポッドキャスト録音、文字起こし用に音声化したいインタビュー、スマホで流したいサウンドトラック — このツールは動画から音声トラックを切り出し、どこでも再生できる標準 MP3 にエンコードします。",
        "変換は ffmpeg.wasm が担います — 数え切れないデスクトップ変換ツールを支えてきた FFmpeg を WebAssembly にコンパイルし、ブラウザのメモリ内で動かすものです。動画はディスクから仮想ファイルシステムへ読み込まれ、demux、音声ストリームのデコード、libmp3lame による再エンコードを経て、ダウンロードとして手元に戻ります。動画の 1 バイトもネットワークを通りません。",
        "初回使用時にエンジンを一度だけダウンロード(約 31 MB)。ブラウザがキャッシュするため、以降の変換は即座に始まります。シングルスレッド版は SharedArrayBuffer を必要としないため、特別なヘッダーなしでどこでも動作し、ファイルを誰かに送る必要もありません。",
      ],
      steps: [
        "動画ファイルをドロップ — MP4・MOV・WebM・MKV など主要コンテナに対応。",
        "MP3 音質を選択:音楽は 320 kbps、通常は 192 kbps、音声メインで容量節約なら 128 kbps。",
        "「音声を抽出」をクリックして MP3 をダウンロード。長い動画には時間がかかります — プログレスバーは実際のエンコード進捗です。",
      ],
      faqs: [
        {
          q: "動画はどこかにアップロードされますか?",
          a: "いいえ。ffmpeg.wasm はブラウザのメモリ内で動作します:動画はローカルの仮想ファイルシステムに読み込まれ、変換され、MP3 は端末上で生成されます。ネットワーク要求は公開 CDN からエンジンを一度ダウンロードするだけ — あなたのファイルはそれに含まれません。",
        },
        {
          q: "初回の変換が遅いのはなぜ?",
          a: "初回は WebAssembly エンジン(約 31 MB)をダウンロードします — 一度きりのコストで、以降はブラウザキャッシュから即座に。変換自体は実時間並みかそれ以上:音声エンコードは動画の再エンコードよりはるかに軽い処理です。",
        },
        {
          q: "音質はどう選べばいい?",
          a: "音楽には 320 kbps(透明な音質)、ポッドキャストや講義など大半のコンテンツには 192 kbpsが最適点、声だけの内容なら 128 kbps で小さく。ただし MP3 はソースの品質を超えられません — 低ビットレートのソース動画は設定に関係なく低ビットレートのままです。",
        },
        {
          q: "「音声トラックが見つからない」と出るのは?",
          a: "本当に無音の動画もあります。一部のコンテナ(生の .ts ストリーム、一部の .flv)はクイック demuxer が対応しません。先に MP4 に変換してから試すか、プレーヤーで音が出ることを確認してください。",
        },
      ],
    },
    es: {
      name: "Video a MP3",
      tagline: "Extrae la pista de audio de cualquier video como MP3 — MP4, MOV, WebM y más, convertido por completo dentro de tu navegador con ffmpeg.wasm. Sin subidas, sin servidor.",
      intro: [
        "Clases para escuchar en el trayecto, grabaciones de podcast atrapadas en archivos de video, entrevistas que quieres como audio para transcribir, bandas sonoras para tu teléfono — esta herramienta separa la pista de audio de un video y la codifica como un MP3 estándar que se reproduce en todas partes.",
        "La conversión corre sobre ffmpeg.wasm — el mismo FFmpeg que impulsa incontables conversores de escritorio, compilado a WebAssembly y ejecutándose en la memoria de tu navegador. El video se lee del disco a un sistema de archivos virtual en memoria, se demultiplexa, la pista de audio se decodifica y re-codifica con libmp3lame, y el resultado vuelve como descarga. Ni un byte del video toca la red.",
        "El primer uso descarga el motor una vez (unos 31 MB); tu navegador lo guarda en caché, así que cada conversión posterior arranca al instante. La versión de un solo hilo no necesita SharedArrayBuffer: el sitio funciona en todas partes sin cabeceras especiales — y sin subir tus archivos a nadie.",
      ],
      steps: [
        "Suelta un archivo de video — MP4, MOV, WebM, MKV y otros contenedores comunes funcionan.",
        "Elige una calidad de MP3: 320 kbps para música, 192 kbps para uso general, 128 kbps para ahorrar espacio en palabra hablada.",
        "Pulsa Extraer audio y descarga el MP3. Los videos largos tardan — la barra de progreso refleja el avance real de codificación.",
      ],
      faqs: [
        {
          q: "¿Mi video se sube a algún sitio?",
          a: "No. ffmpeg.wasm se ejecuta en la memoria de tu navegador: el video se lee localmente en un sistema de archivos virtual, se convierte, y el MP3 se genera en tu dispositivo. La única petición de red es la descarga única del motor desde un CDN público — tu archivo no forma parte de ella.",
        },
        {
          q: "¿Por qué la primera conversión es lenta?",
          a: "La primera ejecución descarga el motor WebAssembly (~31 MB) — un coste único; después, la caché del navegador lo sirve al instante. Las conversiones en sí van a velocidad cercana al tiempo real o superior: codificar audio es mucho más ligero que recodificar video.",
        },
        {
          q: "¿Qué calidad elijo?",
          a: "320 kbps es transparente para música; 192 kbps es el punto dulce para la mayoría de contenidos, incluidos podcasts y clases; 128 kbps mantiene pequeños los archivos de palabra hablada. Ojo: el MP3 no puede superar la calidad del origen — un video de baja tasa sigue siendo bajo sin importar el ajuste.",
        },
        {
          q: "La herramienta dice que no encontró pista de audio, ¿por qué?",
          a: "Algunos videos son realmente mudos, y unos pocos contenedores (flujos .ts crudos, algunos .flv) no los maneja el demuxer rápido. Conviértelos primero a MP4, o comprueba que el archivo suena en tu reproductor.",
        },
      ],
    },
    pt: {
      name: "Vídeo para MP3",
      tagline: "Extraia a faixa de áudio de qualquer vídeo como MP3 — MP4, MOV, WebM e mais, convertido inteiramente dentro do navegador com ffmpeg.wasm. Sem upload, sem servidor.",
      intro: [
        "Aulas para ouvir no trajeto, gravações de podcast presas em arquivos de vídeo, entrevistas que você quer como áudio para transcrever, trilhas sonoras para o celular — esta ferramenta separa a faixa de áudio de um vídeo e a codifica como um MP3 padrão que toca em qualquer lugar.",
        "A conversão roda sobre ffmpeg.wasm — o mesmo FFmpeg que move incontáveis conversores de desktop, compilado para WebAssembly e executado na memória do seu navegador. O vídeo é lido do disco para um sistema de arquivos virtual em memória, desmultiplexado, a faixa de áudio decodificada e re-codificada com libmp3lame, e o resultado volta como download. Nenhum byte do vídeo toca a rede.",
        "O primeiro uso baixa o motor uma vez (cerca de 31 MB); seu navegador o mantém em cache, então toda conversão seguinte começa na hora. A versão de thread único não precisa de SharedArrayBuffer: o site funciona em qualquer lugar sem cabeçalhos especiais — e sem enviar seus arquivos a ninguém.",
      ],
      steps: [
        "Solte um arquivo de vídeo — MP4, MOV, WebM, MKV e outros contêineres comuns funcionam.",
        "Escolha uma qualidade de MP3: 320 kbps para música, 192 kbps para uso geral, 128 kbps para economizar espaço em conteúdo falado.",
        "Clique em Extrair áudio e baixe o MP3. Vídeos longos demoram — a barra de progresso reflete o avanço real da codificação.",
      ],
      faqs: [
        {
          q: "Meu vídeo é enviado para algum lugar?",
          a: "Não. O ffmpeg.wasm roda na memória do seu navegador: o vídeo é lido localmente num sistema de arquivos virtual, convertido, e o MP3 é gerado no seu dispositivo. A única requisição de rede é o download único do motor de um CDN público — seu arquivo não faz parte dela.",
        },
        {
          q: "Por que a primeira conversão é lenta?",
          a: "A primeira execução baixa o motor WebAssembly (~31 MB) — um custo único; depois, o cache do navegador o serve instantaneamente. As conversões em si rodam a velocidade próxima do tempo real ou mais: codificar áudio é muito mais leve que recodificar vídeo.",
        },
        {
          q: "Qual qualidade escolher?",
          a: "320 kbps é transparente para música; 192 kbps é o ponto ideal para a maioria dos conteúdos, incluindo podcasts e aulas; 128 kbps mantém pequenos os arquivos de fala. Atenção: o MP3 não supera a qualidade da origem — um vídeo de baixa taxa segue baixo independente do ajuste.",
        },
        {
          q: "A ferramenta diz que não encontrou faixa de áudio — por quê?",
          a: "Alguns vídeos são realmente mudos, e alguns contêineres (streams .ts crus, alguns .flv) não são tratados pelo demuxer rápido. Converta-os para MP4 primeiro, ou verifique se o arquivo toca com som no seu player.",
        },
      ],
    },
  },
});
