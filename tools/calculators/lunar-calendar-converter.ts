import { CalcEngineLunar } from "../_engines/calc-engine-lunar";
import { defineTool } from "../_lib/types";

const SAMPLE_DATE = "2026-02-17";

export default defineTool({
  slug: "lunar-calendar-converter",
  category: "utility",
  icon: "clock",
  engine: { component: CalcEngineLunar },
  related: ["age-calculator", "date-calculator", "due-date-calculator", "workdays-calculator", "timezone-converter", "timestamp-converter"],
  copy: {
    en: {
      name: "Lunar Calendar Converter",
      tagline:
        "Convert between solar and Chinese lunar calendar dates in your browser — with GanZhi year, zodiac and solar terms. Free, instant, offline-capable.",
      intro: [
        "Two-way conversion between the Gregorian calendar and the traditional Chinese lunar calendar. Enter any solar date to get its lunar equivalent with the GanZhi (stem-branch) year and zodiac animal, or enter a lunar date — including leap months — to find the corresponding solar day.",
        "The lunar calendar assigns months to moon phases, so a lunar 'month' runs from new moon to new moon and a year has 12 or 13 months — the extra one is a leap month, which appears roughly 7 times in every 19 years. This converter also flags the 24 solar terms (jieqi), the seasonal markers used for farming and traditional festivals.",
        "Everything runs locally in your browser through the lunar-javascript library — no account, no upload, and the dates you check are never sent anywhere. Years approximately 1900–2100 are supported.",
      ],
      steps: [
        "Pick a direction: Solar → Lunar or Lunar → Solar.",
        "Enter the date (and tick Leap month when converting a leap month from the lunar side).",
        "Read the result — the GanZhi year, zodiac and any solar term on that day are shown alongside.",
      ],
      faqs: [
        {
          q: "How does the GanZhi year change over?",
          a: "This tool uses the Lunar New Year convention: the GanZhi year switches on lunar January day 1 (the folk-almanac convention). Note that other traditions switch at Lichun (the Start-of-Spring solar term) — the two conventions differ for dates between Lichun and Lunar New Year.",
        },
        {
          q: "What is a leap month and when does it appear?",
          a: "A lunar year of 12 moon-phased months is about 11 days shorter than a solar year, so roughly 7 years in every 19-year cycle get a 13th (leap) month to stay aligned with the seasons. When converting from the lunar side, tick Leap month for dates in that extra month.",
        },
      ],
    },
    zh: {
      name: "农历公历转换",
      tagline:
        "在浏览器内完成公历与农历的双向转换——附干支年、生肖与当日节气。免费、即时、离线可用。",
      intro: [
        "公历与农历的双向转换。输入任意公历日期即可得到对应的农历日期、干支年与生肖;也可以输入农历日期(支持闰月)反查对应的公历日子。",
        "农历按月相定月,一年 12 或 13 个月——多出的那个是闰月,约每 19 年出现 7 次。转换结果同时标注二十四节气,即传统农耕与节庆所用的季节刻度。",
        "转换全部由本机的 lunar-javascript 库完成——无需注册、不上传,查询的日期不会离开浏览器。支持约 1900–2100 年。",
      ],
      steps: [
        "选择方向:公历 → 农历,或农历 → 公历。",
        "输入日期(农历转公历若是闰月请勾选闰月)。",
        "读取结果——干支年、生肖与当日节气会一并列出。",
      ],
      faqs: [
        {
          q: "干支年是怎么换年的?",
          a: "本工具采用农历新年口径:干支年在农历正月初一切换(民俗老黄历口径)。注意另有立春换年的传统——两者在立春与春节之间的日期上结果不同。",
        },
        {
          q: "闰月是什么,多久出现一次?",
          a: "农历 12 个朔望月比一个回归年短约 11 天,因此约每 19 年中有 7 年会多出一个闰月来对齐季节。从农历侧转换闰月日期时,请勾选「闰月」。",
        },
      ],
    },
    ja: {
      name: "旧暦カレンダー変換",
      tagline:
        "ブラウザ内で西暦と中国旧暦を双方向変換——干支・十二支年・節気付き。無料・即時・オフライン対応。",
      intro: [
        "グレゴリオ暦と中国の伝統的な太陰太陽暦の双方向変換です。西暦の日付から旧暦の日付・干支年・干支の動物を取得したり、閏月を含む旧暦の日付から西暦を逆算できます。",
        "旧暦は月相で月を定めるため、1 年は 12 か月または 13 か月 — 余分な月が閏月で、約 19 年に 7 回現れます。農耕や伝統的な祝祭日で使われる 24 節気も表示します。",
        "処理はすべてブラウザ内の lunar-javascript ライブラリで完結 — アカウント不要、アップロードなし、調べた日付はどこにも送信されません。約 1900〜2100 年に対応。",
      ],
      steps: [
        "方向を選択:西暦 → 旧暦、または旧暦 → 西暦。",
        "日付を入力します(旧暦から変換する場合は閏月にチェック)。",
        "結果を確認 — 干支年・干支の動物・その日の節気も併せて表示します。",
      ],
      faqs: [
        {
          q: "干支年はいつ切り替わりますか?",
          a: "このツールは旧暦正月一日で干支年を切り替える方式(民俗暦の慣習)です。立春で切り替える伝統もあり、立春と旧暦正月の間の日付では結果が異なります。",
        },
        {
          q: "閏月とは何ですか?どのくらいの頻度で現れますか?",
          a: "12 か月の太陰太陽暦年は太陽年より約 11 日短いため、19 年周期のうち約 7 年に 13 か月目(閏月)が挿入されます。旧暦側から変換する際は閏月にチェックしてください。",
        },
      ],
    },
    es: {
      name: "Conversor de Calendario Lunar",
      tagline:
        "Convierte entre fechas solares y el calendario lunar chino en tu navegador — con año GanZhi, zodíaco y términos solares. Gratis, instantáneo, sin conexión.",
      intro: [
        "Conversión bidireccional entre el calendario gregoriano y el calendario lunar chino tradicional. Introduce cualquier fecha solar para obtener su equivalente lunar con el año GanZhi (tallo-rama) y el animal del zodíaco, o introduce una fecha lunar — incluidos meses bisiestos — para hallar el día solar correspondiente.",
        "El calendario lunar asigna los meses a las fases de la luna: un año lunar tiene 12 o 13 meses, y el extra es un mes bisiesto que aparece unas 7 veces cada 19 años. El conversor también marca los 24 términos solares (jieqi), los marcadores estacionales de la agricultura y las fiestas tradicionales.",
        "Todo funciona localmente en tu navegador con la biblioteca lunar-javascript — sin cuenta, sin subidas, y las fechas que consultas nunca se envían a ningún sitio. Años aproximadamente 1900–2100.",
      ],
      steps: [
        "Elige la dirección: Solar → Lunar o Lunar → Solar.",
        "Introduce la fecha (y marca Mes bisiesto si conviertes un mes bisiesto desde el lado lunar).",
        "Lee el resultado — el año GanZhi, el zodíaco y el término solar de ese día se muestran junto al resultado.",
      ],
      faqs: [
        {
          q: "¿Cuándo cambia el año GanZhi?",
          a: "Esta herramienta usa la convención del Año Nuevo Lunar: el año GanZhi cambia el día 1 del primer mes lunar (convención del almanaque popular). Otras tradiciones cambian en Lichun (Inicio de Primavera); ambas difieren para fechas entre Lichun y el Año Nuevo Lunar.",
        },
        {
          q: "¿Qué es un mes bisiesto y cuándo aparece?",
          a: "Un año lunar de 12 meses lunares es unos 11 días más corto que un año solar, así que unos 7 de cada 19 años reciben un 13.º mes (bisiesto) para alinearse con las estaciones. Al convertir desde el lado lunar, marca Mes bisiesto para fechas de ese mes extra.",
        },
      ],
    },
    pt: {
      name: "Conversor de Calendário Lunar",
      tagline:
        "Converta entre datas solares e o calendário lunar chinês no seu navegador — com ano GanZhi, zodíaco e termos solares. Grátis, instantâneo, offline.",
      intro: [
        "Conversão bidirecional entre o calendário gregoriano e o calendário lunar chinês tradicional. Introduza qualquer data solar para obter o equivalente lunar com o ano GanZhi (troncos e ramos) e o animal do zodíaco, ou introduza uma data lunar — incluindo meses bissextos — para encontrar o dia solar correspondente.",
        "O calendário lunar atribui os meses às fases da lua: um ano lunar tem 12 ou 13 meses, e o extra é um mês bissexto, que aparece cerca de 7 vezes em cada 19 anos. O conversor também marca os 24 termos solares (jieqi), os marcadores sazonais da agricultura e das festivais tradicionais.",
        "Tudo corre localmente no seu navegador com a biblioteca lunar-javascript — sem conta, sem uploads, e as datas consultadas nunca são enviadas. Anos aproximadamente 1900–2100.",
      ],
      steps: [
        "Escolha a direção: Solar → Lunar ou Lunar → Solar.",
        "Introduza a data (e marque Mês bissexto se estiver a converter um mês bissexto do lado lunar).",
        "Leia o resultado — o ano GanZhi, o zodíaco e o termo solar desse dia são mostrados em conjunto.",
      ],
      faqs: [
        {
          q: "Quando muda o ano GanZhi?",
          a: "Esta ferramenta usa a convenção do Ano-Novo Lunar: o ano GanZhi muda no dia 1 do primeiro mês lunar (convenção do almanaque popular). Outras tradições mudam no Lichun (Início da Primavera) — as duas convenções diferem para datas entre o Lichun e o Ano-Novo Lunar.",
        },
        {
          q: "O que é um mês bissexto e quando aparece?",
          a: "Um ano lunar de 12 meses lunares é cerca de 11 dias mais curto que um ano solar, por isso cerca de 7 de cada 19 anos recebem um 13.º mês (bissexto) para se alinhar às estações. Ao converter do lado lunar, marque Mês bissexto para datas nesse mês extra.",
        },
      ],
    },
  },
});
