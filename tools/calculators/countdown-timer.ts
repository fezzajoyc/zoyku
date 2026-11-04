import { CalcEngineCountdown } from "../_engines/calc-engine-countdown";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "countdown-timer",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEngineCountdown },
  related: ["stopwatch", "sleep-calculator", "word-counter", "random-number", "body-fat-calculator", "tip-calculator", "date-calculator", "cooking-conversion", "age-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Countdown Timer",
      tagline: "Set a countdown with a progress ring and a chime at zero — 1 to 25 minute presets or any custom duration.",
      intro: [
        "A clean countdown for cooking, workouts, meetings and study sessions. The ring shows progress at a glance, and a short synthesized chime plays when time is up.",
        "The deadline is anchored to the system clock, so the countdown keeps running correctly even if you switch to another tab.",
        "The remaining time is derived from wall-clock timestamps rather than a decrementing counter, so a throttled background tab or a sleeping display cannot make it drift — the ring is always exactly right relative to the deadline. The chime is synthesized with the Web Audio API, so no audio file needs to load.",
        "Compared with a phone's clock app, the large ring and minutes-remaining readout are designed to be readable from across a kitchen or a meeting room, and nothing is shared or stored. Browsers require a user gesture before audio can play — press Start on the page once so the sound is permitted when time runs out.",
      ],
      steps: [
        "Set hours, minutes and seconds — or tap a quick preset.",
        "Click Start; the ring drains as time passes.",
        "A chime plays and the ring turns green at zero.",
      ],
      faqs: [
        {
          q: "Does it keep running in a background tab?",
          a: "Yes — the deadline is anchored to the system clock, so switching tabs or throttling does not affect the remaining time.",
        },
        {
          q: "Will I hear the chime?",
          a: "It is a short synthesized tone via WebAudio. Keep the tab unmuted and your device volume up; there is no audio file to download.",
        },
      ],
    },
    zh: {
      name: "倒计时器",
      tagline: "带进度环的倒计时,归零有提示音,1–25 分钟快捷预设或任意时长,后台标签页照常计时。",
      intro: [
        "为烹饪、锻炼、会议和学习准备的干净倒计时:进度环一眼可读,归零时播放一段合成提示音。",
        "截止时间锚定系统时钟——切到其他标签页,倒计时依旧准确。",
      ],
      steps: [
        "设置时/分/秒,或点快捷预设。",
        "点击“开始”,进度环随时间消耗。",
        "归零时播放提示音,进度环变绿。",
      ],
      faqs: [
        {
          q: "后台标签页还计时吗?",
          a: "计时——截止时间锚定系统时钟,切换标签页或被限速都不影响剩余时间。",
        },
        {
          q: "能听到提示音吗?",
          a: "是一段 WebAudio 合成短音。保持标签页未静音并打开设备音量即可,无需下载音频文件。",
        },
      ],
    },
    ja: {
      name: "カウントダウンタイマー",
      tagline: "プログレス リング付きのカウントダウン。ゼロでチャイム、1〜25 分のプリセットや自由な時間設定に対応。",
      intro: [
        "料理・運動・会議・勉強向けのシンプルなカウントダウン。リングで進捗がひと目でわかり、ゼロで短い合成チャイムが鳴ります。",
        "締切はシステム時計に固定されているため、別タブに移動してもカウントダウンは正確に続きます。",
      ],
      steps: [
        "時・分・秒を設定、またはプリセットをタップ。",
        "スタートを押すとリングが減っていきます。",
        "ゼロでチャイムが鳴り、リングが緑になります。",
      ],
      faqs: [
        {
          q: "バックグラウンドでも動きますか?",
          a: "はい。締切はシステム時計に固定されているため、タブ切り替えや制限があっても残り時間に影響しません。",
        },
        {
          q: "チャイムは聞こえますか?",
          a: "WebAudio の短い合成音です。タブをミュートせず、端末の音量を上げてください。音声ファイルのダウンロードは不要です。",
        },
      ],
    },
    es: {
      name: "Temporizador",
      tagline: "Cuenta atrás con anillo de progreso y aviso sonoro al terminar — presets de 1 a 25 minutos o cualquier duración.",
      intro: [
        "Una cuenta atrás limpia para cocinar, entrenar, reuniones y estudio: el anillo muestra el avance de un vistazo y suena un tono sintetizado al terminar.",
        "La fecha límite está anclada al reloj del sistema, así que la cuenta atrás sigue correcta aunque cambies de pestaña.",
      ],
      steps: [
        "Ajusta horas, minutos y segundos, o toca un preset.",
        "Pulsa Iniciar; el anillo se vacía con el tiempo.",
        "Suena un tono y el anillo se pone verde al llegar a cero.",
      ],
      faqs: [
        {
          q: "¿Sigue corriendo en segunda pestaña?",
          a: "Sí — la fecha límite está anclada al reloj del sistema; cambiar de pestaña o la limitación no afectan al tiempo restante.",
        },
        {
          q: "¿Oiré el aviso?",
          a: "Es un tono corto sintetizado con WebAudio. Deja la pestaña sin silenciar y con volumen; no hay archivo de audio que descargar.",
        },
      ],
    },
    pt: {
      name: "Temporizador de contagem regressiva",
      tagline: "Contagem regressiva com anel de progresso e som ao zerar — presets de 1 a 25 minutos ou qualquer duração.",
      intro: [
        "Uma contagem regressiva limpa para cozinha, treinos, reuniões e estudo: o anel mostra o progresso de relance e um tom sintetizado toca ao zerar.",
        "O prazo fica ancorado no relógio do sistema — a contagem continua correta mesmo se você mudar de aba.",
      ],
      steps: [
        "Defina horas, minutos e segundos, ou toque um preset.",
        "Clique em Iniciar; o anel esvazia com o tempo.",
        "Um som toca e o anel fica verde ao chegar em zero.",
      ],
      faqs: [
        {
          q: "Continua em aba de fundo?",
          a: "Sim — o prazo fica ancorado no relógio do sistema; mudar de aba ou a limitação não afetam o tempo restante.",
        },
        {
          q: "Vou ouvir o som?",
          a: "É um tom curto sintetizado via WebAudio. Mantenha a aba sem mudo e com volume; não há arquivo de áudio para baixar.",
        },
      ],
    },
  },
});
