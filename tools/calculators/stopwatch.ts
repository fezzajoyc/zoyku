import { CalcEngineStopwatch } from "../_engines/calc-engine-stopwatch";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "stopwatch",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEngineStopwatch },
  related: ["countdown-timer", "pace-calculator", "sleep-calculator", "workdays-calculator"],
  copy: {
    en: {
      name: "Stopwatch",
      tagline: "A precise online stopwatch with lap times — start, pause, lap and reset, with drift-free timing anchored to the system clock.",
      intro: [
        "Measures elapsed time to the hundredth of a second using the system clock rather than accumulated intervals, so it stays accurate even when the browser throttles a background tab.",
        "Record laps while running; each lap shows its own split and the running total, and the display uses large tabular digits so splits stay readable at a glance.",
      ],
      steps: [
        "Click Start to begin timing.",
        "Click Lap to record a split without stopping the clock.",
        "Pause, resume or reset at any time.",
      ],
      faqs: [
        {
          q: "Is it accurate?",
          a: "Yes — elapsed time is derived from Date.now() against a fixed start timestamp, not accumulated timer callbacks, so background-tab throttling cannot cause drift.",
        },
        {
          q: "Do laps survive a page reload?",
          a: "No — like a physical stopwatch, resetting or reloading clears the session. Keep the tab open to preserve laps.",
        },
      ],
    },
    zh: {
      name: "秒表",
      tagline: "精确到百分之一秒的在线秒表,支持计次——锚定系统时钟不漂移,后台标签页也准确。",
      intro: [
        "基于系统时钟测量,精确到百分之一秒,而非累加定时器回调——即使浏览器对后台标签页限速也不会累积误差。",
        "运行中可随时计次,每条显示单圈与累计时间;大号等宽数字,一眼可读。",
      ],
      steps: [
        "点击“开始”计时。",
        "点击“计次”记录分圈,不停止计时。",
        "随时暂停、继续或重置。",
      ],
      faqs: [
        {
          q: "准确吗?",
          a: "准确——耗时取自 Date.now() 与固定起点之差,而非累加定时器回调,后台限速不会造成漂移。",
        },
        {
          q: "刷新后计次还在吗?",
          a: "不在——和实体秒表一样,重置或刷新即清空。保留计次请保持页面打开。",
        },
      ],
    },
    ja: {
      name: "ストップウォッチ",
      tagline: "1/100 秒精度のオンライン ストップウォッチ。ラップ計測対応、システム時計基準で狂みません。",
      intro: [
        "累積タイマーではなくシステム時計との差で 1/100 秒単位まで計測するため、バックグラウンドタブの制限がかかっても精度は保たれます。",
        "実行中にラップを記録でき、各ラップの分割時間と累計を大きな等幅数字で表示します。",
      ],
      steps: [
        "スタートで計測を開始します。",
        "ラップで停止せずに分割時間を記録します。",
        "一時停止・再開・リセットはいつでも可能です。",
      ],
      faqs: [
        {
          q: "精度は?",
          a: "はい。経過時間は Date.now() と固定の開始時刻の差から算出し、タイマー コールバックの積み上げではないため、バックグラウンドの制限でも誤差は出ません。",
        },
        {
          q: "再読み込み後もラップは残りますか?",
          a: "残りません。実物のストップウォッチ同様、リセットや再読み込みで消えます。ラップを残すにはタブを開いたままにしてください。",
        },
      ],
    },
    es: {
      name: "Cronómetro",
      tagline: "Cronómetro online preciso hasta centésimas con vueltas — anclado al reloj del sistema, sin desviaciones.",
      intro: [
        "Mide el tiempo transcurrido a centésimas usando el reloj del sistema en lugar de intervalos acumulados, así que sigue exacto aunque el navegador ralentice la pestaña.",
        "Registra vueltas en marcha: cada vuelta muestra su parcial y el total acumulado, con dígitos grandes tabulares legibles de un vistazo.",
      ],
      steps: [
        "Pulsa Iniciar para empezar.",
        "Pulsa Vuelta para registrar un parcial sin detener el reloj.",
        "Pausa, reanuda o reinicia cuando quieras.",
      ],
      faqs: [
        {
          q: "¿Es preciso?",
          a: "Sí: el tiempo se deriva de Date.now() contra una marca de inicio fija, no de callbacks acumulados, así que la limitación de pestañas en segundo plano no causa desvío.",
        },
        {
          q: "¿Las vueltas sobreviven a una recarga?",
          a: "No — como un cronómetro físico, reiniciar o recargar borra la sesión. Mantén la pestaña abierta para conservarlas.",
        },
      ],
    },
    pt: {
      name: "Cronômetro",
      tagline: "Cronômetro online preciso até centésimos com voltas — ancorado no relógio do sistema, sem desvios.",
      intro: [
        "Mede o tempo decorrido em centésimos usando o relógio do sistema em vez de intervalos acumulados, então continua exato mesmo com a aba limitada.",
        "Registre voltas em execução: cada volta mostra o parcial e o total acumulado, com dígitos grandes tabulares legíveis de relance.",
      ],
      steps: [
        "Clique em Iniciar para começar.",
        "Clique em Volta para registrar um parcial sem parar o relógio.",
        "Pause, retome ou zere quando quiser.",
      ],
      faqs: [
        {
          q: "É preciso?",
          a: "Sim — o tempo vem de Date.now() contra uma marca de início fixa, não de callbacks acumulados, então limitação de aba em segundo plano não causa desvio.",
        },
        {
          q: "As voltas sobrevivem a um recarregamento?",
          a: "Não — como um cronômetro físico, zerar ou recarregar limpa a sessão. Mantenha a aba aberta para preservá-las.",
        },
      ],
    },
  },
});
