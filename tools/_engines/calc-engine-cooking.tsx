"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, Sel, TableBox, BigOut, fmt, pick } from "./calc-ui";
import {
  COOKING_DENSITY as COOKING_G_PER_CUP,
  DENSITY_KEYS,
  OVEN_STEPS,
  cToF,
  cookConvert,
  type CookUnit,
} from "../_lib/cooking";

/**
 * 烹饪换算引擎:食材感知的体积↔重量 + 体积/重量内部换算 + 烤箱温度表。
 * 数学与密度表在 tools/_lib/cooking.ts;这里只做本地化标签与 UI。
 */

/** 食材名 [en, zh, ja, es, pt],首列与密度表键一致 */
const ING: Array<[string, string, string, string, string]> = [
  ["All-purpose flour", "中筋面粉", "中力粉", "Harina de trigo", "Farinha de trigo"],
  ["Whole wheat flour", "全麦面粉", "全粒粉", "Harina integral", "Farinha integral"],
  ["Granulated sugar", "白砂糖", "グラニュー糖", "Azúcar granulado", "Açúcar refinado"],
  ["Brown sugar (packed)", "红糖(压实)", "黒糖(押し固めた)", "Azúcar moreno (compactado)", "Açúcar mascavo (compactado)"],
  ["Powdered sugar", "糖粉", "粉糖", "Azúcar glas", "Açúcar de confeiteiro"],
  ["Cocoa powder (unsweetened)", "无糖可可粉", "ココアパウダー(無糖)", "Cacao en polvo (sin azúcar)", "Cacau em pó (sem açúcar)"],
  ["Cornstarch", "玉米淀粉", "コーンスターチ", "Maicena", "Amido de milho"],
  ["Salt (fine)", "食盐(细)", "食塩(細かい)", "Sal fina", "Sal fino"],
  ["Butter", "黄油", "バター", "Mantequilla", "Manteiga"],
  ["Vegetable oil", "植物油", "サラダ油", "Aceite vegetal", "Óleo vegetal"],
  ["Olive oil", "橄榄油", "オリーブオイル", "Aceite de oliva", "Azeite de oliva"],
  ["Water", "水", "水", "Agua", "Água"],
  ["Milk", "牛奶", "牛乳", "Leche", "Leite"],
  ["Heavy cream", "淡奶油", "生クリーム", "Nata líquida", "Creme de leite"],
  ["Yogurt", "酸奶", "ヨーグルト", "Yogur", "Iogurte"],
  ["Honey", "蜂蜜", "はちみつ", "Miel", "Mel"],
  ["Maple syrup", "枫糖浆", "メープルシロップ", "Jarabe de arce", "Xarope de bordo"],
  ["Peanut butter", "花生酱", "ピーナッツバター", "Crema de cacahuete", "Pasta de amendoim"],
  ["White rice (uncooked)", "大米(生)", "米(生)", "Arroz blanco (crudo)", "Arroz branco (cru)"],
  ["Rolled oats", "燕麦片", "オートミール", "Copos de avena", "Aveia em flocos"],
  ["Almond flour", "杏仁粉", "アーモンドプードル", "Harina de almendra", "Farinha de amêndoa"],
  ["Chocolate chips", "巧克力豆", "チョコチップ", "Pepitas de chocolate", "Gotas de chocolate"],
  ["Shredded coconut", "椰蓉", "ココナッツフルーク", "Coco rallado", "Coco ralado"],
  ["Chopped walnuts", "核桃碎", "くるみ(刻み)", "Nueces picadas", "Nozes picadas"],
];

const VOLUME_UNITS: Array<[CookUnit, string, string, string, string, string]> = [
  ["cup", "cup", "杯", "カップ", "taza", "xícara"],
  ["tbsp", "tablespoon", "汤匙", "大さじ", "cucharada", "colher de sopa"],
  ["tsp", "teaspoon", "茶匙", "小さじ", "cucharadita", "colher de chá"],
  ["fl-oz", "fl oz", "液量盎司", "液量オンス", "onza líq.", "onça líq."],
  ["ml", "ml", "毫升", "ml", "ml", "ml"],
  ["l", "liter", "升", "リットル", "litro", "litro"],
];

const WEIGHT_UNITS: Array<[CookUnit, string, string, string, string, string]> = [
  ["g", "gram", "克", "グラム", "gramo", "grama"],
  ["kg", "kilogram", "千克", "キログラム", "kilogramo", "quilograma"],
  ["oz", "ounce", "盎司", "オンス", "onza", "onça"],
  ["lb", "pound", "磅", "ポンド", "libra", "libra"],
];

const S = {
  ingredient: { en: "Ingredient", zh: "食材", ja: "材料", es: "Ingrediente", pt: "Ingrediente" },
  amount: { en: "Amount", zh: "数量", ja: "量", es: "Cantidad", pt: "Quantidade" },
  from: { en: "From", zh: "从", ja: "変換元", es: "De", pt: "De" },
  to: { en: "To", zh: "到", ja: "変換先", es: "A", pt: "Para" },
  result: { en: "Result", zh: "结果", ja: "結果", es: "Resultado", pt: "Resultado" },
  volume: { en: "Volume", zh: "体积", ja: "体積", es: "Volumen", pt: "Volume" },
  weight: { en: "Weight", zh: "重量", ja: "重量", es: "Peso", pt: "Peso" },
  oven: { en: "Oven temperatures", zh: "烤箱温度对照", ja: "オーブン温度の目安", es: "Temperaturas de horno", pt: "Temperaturas de forno" },
  invalid: {
    en: "Enter an amount of zero or more. Converting between volume and weight needs an ingredient from the list.",
    zh: "请输入 ≥ 0 的数量。体积和重量互转需要从列表中选择食材。",
    ja: "0 以上の量を入力してください。体積と重量の変換にはリストから材料を選ぶ必要があります。",
    es: "Introduzca una cantidad de cero o más. Para convertir entre volumen y peso hay que elegir un ingrediente de la lista.",
    pt: "Digite uma quantidade igual ou maior que zero. Para converter entre volume e peso, escolha um ingrediente da lista.",
  },
  sameDim: {
    en: "Both units measure the same dimension, so the ingredient is not used for this conversion.",
    zh: "两侧单位属于同一维度,此次换算不需要用到食材密度。",
    ja: "両側の単位は同じ次元なので、この変換に材料は使われません。",
    es: "Ambas unidades miden lo mismo, así que el ingrediente no interviene en esta conversión.",
    pt: "As duas unidades medem a mesma grandeza, então o ingrediente não entra nesta conversão.",
  },
  densityNote: {
    en: "Cup weights are published averages (King Arthur, USDA and similar sources): a scooped cup of flour can vary ±15 %. For baking precision, weigh your ingredients.",
    zh: "每杯克重取自常见出版数据(King Arthur、USDA 等)的平均值:实际舀取可能相差 ±15%。烘焙求准,请以秤为准。",
    ja: "1 カップのグラム数は King Arthur・USDA などの公開値の平均です。すくい方で ±15 % ぐらい変わります。製菓・製パンで正確さが必要なときは秤で量ってください。",
    es: "Los pesos por taza son promedios publicados (King Arthur, USDA y similares): una taza de harina puede variar ±15 %. Para precisión en repostería, pese los ingredientes.",
    pt: "Os pesos por xícara são médias publicadas (King Arthur, USDA e afins): uma xícara de farinha pode variar ±15 %. Para precisão na confeitaria, pese os ingredientes.",
  },
};

function ingLabel(key: string, locale: string): string {
  const row = ING.find((r) => r[0] === key);
  if (!row) return key;
  const idx = locale === "zh" ? 1 : locale === "ja" ? 2 : locale === "es" ? 3 : locale === "pt" ? 4 : 0;
  return row[idx] ?? row[0];
}

function unitLabel(list: Array<[CookUnit, ...string[]]>, u: CookUnit, locale: string): string {
  const row = list.find((r) => r[0] === u);
  if (!row) return u;
  const idx = locale === "zh" ? 2 : locale === "ja" ? 3 : locale === "es" ? 4 : locale === "pt" ? 5 : 1;
  return row[idx] ?? u;
}

const isVolume = (u: CookUnit) => VOLUME_UNITS.some((r) => r[0] === u);
/** 常见摄氏烤箱档位(显示在 °F 档位右侧的 °C→°F 两列) */
const C_STEPS = [140, 160, 180, 200, 220, 240];

export function CalcEngineCooking() {
  const { locale } = useI18n();
  const [value, setValue] = useState("2");
  const [ingredient, setIngredient] = useState("All-purpose flour");
  const [from, setFrom] = useState<CookUnit>("cup");
  const [to, setTo] = useState<CookUnit>("g");

  const v = Number(value);
  const out = useMemo(() => cookConvert(v, from, to, ingredient), [v, from, to, ingredient]);
  const valid = Number.isFinite(out);
  const sameDim = isVolume(from) === isVolume(to);
  const summary = valid ? `${fmt(out, locale, 2)} ${unitLabel(isVolume(to) ? VOLUME_UNITS : WEIGHT_UNITS, to, locale)}` : "";

  return (
    <ToolPanel>
      <Field label={pick(locale, S.ingredient)}>
        <Sel value={ingredient} onChange={setIngredient} aria={pick(locale, S.ingredient)}>
          {DENSITY_KEYS.map((key) => (
            <option key={key} value={key}>
              {ingLabel(key, locale)} ({pick(locale, { en: `${COOKING_G_PER_CUP[key]} g/cup`, zh: `每杯 ${COOKING_G_PER_CUP[key]} 克`, ja: `1カップ ${COOKING_G_PER_CUP[key]} g`, es: `${COOKING_G_PER_CUP[key]} g/taza`, pt: `${COOKING_G_PER_CUP[key]} g/xícara` })})
            </option>
          ))}
        </Sel>
      </Field>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, S.amount)}>
          <NumIn value={value} onChange={setValue} aria={pick(locale, S.amount)} placeholder="2" />
        </Field>
        <Field label={pick(locale, S.from)}>
          <Sel value={from} onChange={(x) => setFrom(x as CookUnit)} aria={pick(locale, S.from)}>
            <optgroup label={pick(locale, S.volume)}>
              {VOLUME_UNITS.map((r) => (
                <option key={r[0]} value={r[0]}>{unitLabel(VOLUME_UNITS, r[0], locale)}</option>
              ))}
            </optgroup>
            <optgroup label={pick(locale, S.weight)}>
              {WEIGHT_UNITS.map((r) => (
                <option key={r[0]} value={r[0]}>{unitLabel(WEIGHT_UNITS, r[0], locale)}</option>
              ))}
            </optgroup>
          </Sel>
        </Field>
        <Field label={pick(locale, S.to)}>
          <Sel value={to} onChange={(x) => setTo(x as CookUnit)} aria={pick(locale, S.to)}>
            <optgroup label={pick(locale, S.volume)}>
              {VOLUME_UNITS.map((r) => (
                <option key={r[0]} value={r[0]}>{unitLabel(VOLUME_UNITS, r[0], locale)}</option>
              ))}
            </optgroup>
            <optgroup label={pick(locale, S.weight)}>
              {WEIGHT_UNITS.map((r) => (
                <option key={r[0]} value={r[0]}>{unitLabel(WEIGHT_UNITS, r[0], locale)}</option>
              ))}
            </optgroup>
          </Sel>
        </Field>
      </div>

      {valid ? (
        <>
          <div className="mt-5">
            <BigOut>
              {summary}
            </BigOut>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <CopyButton value={summary} label={pick(locale, { en: "Copy result", zh: "复制结果", ja: "結果をコピー", es: "Copiar resultado", pt: "Copiar resultado" })} />
          </div>
          {sameDim && (
            <div className="mt-3">
              <Note>{pick(locale, S.sameDim)}</Note>
            </div>
          )}
        </>
      ) : (
        <div className="mt-5">
          <Note>{pick(locale, S.invalid)}</Note>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-[14px] font-semibold">{pick(locale, S.oven)}</h3>
        <div className="mt-3">
          <TableBox
            head={["°F", "°C", "°C", "°F"]}
            rows={OVEN_STEPS.map(([f, c], i) => {
              const cStep = C_STEPS[i];
              return [
                f,
                c,
                cStep ?? "",
                cStep === undefined ? "" : Math.round(cToF(cStep)),
              ] as (string | number)[];
            })}
          />
        </div>
      </div>

      <div className="mt-4">
        <Note>{pick(locale, S.densityNote)}</Note>
      </div>
    </ToolPanel>
  );
}
