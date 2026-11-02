"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, Sel, Stats, Tabs, TableBox, fmt, pick } from "./calc-ui";
import { SHOE_TABLE, shoeConvert, type ShoeSystem } from "../_lib/shoe-size";

/**
 * 鞋码换算引擎:内置对照表双向精确查找,男/女两个页签。
 * 数据与查找在 tools/_lib/shoe-size.ts,这里只做本地化标签与 UI。
 */

const S = {
  men: { en: "Men", zh: "男款", ja: "メンズ", es: "Hombre", pt: "Masculino" },
  women: { en: "Women", zh: "女款", ja: "レディース", es: "Mujer", pt: "Feminino" },
  system: { en: "I know this size", zh: "我知道这个码", ja: "このサイズで探す", es: "Conozco esta talla", pt: "Sei este tamanho" },
  size: { en: "Size", zh: "码数", ja: "サイズ", es: "Talla", pt: "Tamanho" },
  us: { en: "US", zh: "美码(US)", ja: "US", es: "US", pt: "US" },
  uk: { en: "UK", zh: "英码(UK)", ja: "UK", es: "UK", pt: "UK" },
  eu: { en: "EU", zh: "欧码(EU)", ja: "EU", es: "EU", pt: "EU" },
  jp: { en: "Japan / foot length (cm)", zh: "日本码 / 脚长(cm)", ja: "JP / 足長(cm)", es: "Japón / largo del pie (cm)", pt: "Japão / comprimento do pé (cm)" },
  footLength: { en: "Foot length / Japan", zh: "脚长 / 日本码", ja: "足長 / JP", es: "Largo del pie / Japón", pt: "Comprimento do pé / Japão" },
  usMenOut: { en: "US men", zh: "美码(男)", ja: "US(メンズ)", es: "US hombre", pt: "US masculino" },
  usWomenOut: { en: "US women", zh: "美码(女)", ja: "US(レディース)", es: "US mujer", pt: "US feminino" },
  ukOut: { en: "UK", zh: "英码", ja: "UK", es: "UK", pt: "UK" },
  euOut: { en: "EU", zh: "欧码", ja: "EU", es: "EU", pt: "EU" },
  tableCm: { en: "Foot length (cm)", zh: "脚长(cm)", ja: "足長(cm)", es: "Largo del pie (cm)", pt: "Comprimento (cm)" },
  tableUs: { en: "US", zh: "美码", ja: "US", es: "US", pt: "US" },
  tableUk: { en: "UK", zh: "英码", ja: "UK", es: "UK", pt: "UK" },
  tableEu: { en: "EU", zh: "欧码", ja: "EU", es: "EU", pt: "EU" },
  fullTable: {
    en: "Full chart",
    zh: "完整对照表",
    ja: "全サイズ表",
    es: "Tabla completa",
    pt: "Tabela completa",
  },
  notFound: {
    en: "That size is not in the chart. Sizes run in half steps (and EU steps are irregular) — try the nearest half size or pick from the full chart below.",
    zh: "表里没有这个码。码数以半码为步进(欧码档位还不规则)——试试最接近的半码,或直接在下方完整对照表里选。",
    ja: "そのサイズは表にありません。サイズは 0.5 刻み(EU は不規則)なので、近い半サイズを試すか、下の全サイズ表から選んでください。",
    es: "Esa talla no está en la tabla. Las tallas van en medios pasos (y los pasos EU son irregulares): pruebe la media talla más cercana o elija en la tabla completa de abajo.",
    pt: "Esse número não está na tabela. Os tamanhos vão em meios passos (e os passos EU são irregulares) — tente o meio número mais próximo ou escolha na tabela completa abaixo.",
  },
  honesty: {
    en: "Real shoes vary about half a size between brands, and EU sizing is not standardized. Treat the chart as a strong starting point, then trust the brand's own size guide. For the foot length column, measure at the end of the day while standing.",
    zh: "不同品牌的实际鞋码普遍相差约半码,欧码也没有统一标准。把对照表当作可靠的起点,下单前再对一下品牌自家的尺码指南;要量脚长,请在傍晚站立状态下测量。",
    ja: "実際の靴はブランドによって約 0.5 サイズ違いますし、EU サイズは統一されていません。この表を出発点にし、購入前に対象ブランドのサイズガイドを確認してください。足長は夕方に立った状態で測るのが確実です。",
    es: "Entre marcas, el calzado real varía cerca de media talla, y el tallaje EU no está normalizado. Tome la tabla como punto de partida sólido y confíe en la guía de la marca. Para el largo del pie, mida al final del día de pie.",
    pt: "Entre marcas, o calçado real varia cerca de meio número, e a numeração EU não é padronizada. Use a tabela como ponto de partida confiável e confira o guia da marca. Para o comprimento do pé, meça no fim do dia, em pé.",
  },
};

const SYSTEM_LABELS = [S.us, S.uk, S.eu, S.jp];
const SYSTEM_IDS: ShoeSystem[] = ["us", "uk", "eu", "jp"];

export function CalcEngineShoeSize() {
  const { locale } = useI18n();
  const [gender, setGender] = useState("men");
  const [system, setSystem] = useState<ShoeSystem>("us");
  const [size, setSize] = useState("9");

  const g = gender === "women" ? "women" : "men";
  const row = useMemo(
    () => shoeConvert(Number(size), system, g),
    [size, system, g],
  );
  const usLabel = g === "men" ? S.usMenOut : S.usWomenOut;

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "men", label: pick(locale, S.men) },
          { id: "women", label: pick(locale, S.women) },
        ]}
        value={gender}
        onChange={setGender}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.system)}>
          <Sel value={system} onChange={(v) => setSystem(v as ShoeSystem)} aria={pick(locale, S.system)}>
            {SYSTEM_IDS.map((id, i) => (
              <option key={id} value={id}>
                {pick(locale, SYSTEM_LABELS[i])}
              </option>
            ))}
          </Sel>
        </Field>
        <Field label={pick(locale, S.size)}>
          <NumIn value={size} onChange={setSize} aria={pick(locale, S.size)} placeholder="9" />
        </Field>
      </div>

      {row ? (
        <div className="mt-5">
          <Stats
            items={[
              { label: pick(locale, usLabel), value: fmt(g === "men" ? row.usMen : row.usWomen, locale, 1), tone: "accent" },
              { label: pick(locale, S.ukOut), value: fmt(row.uk, locale, 1) },
              { label: pick(locale, S.euOut), value: fmt(row.eu, locale, 1) },
              { label: pick(locale, S.footLength), value: fmt(row.cm, locale, 1) },
            ]}
          />
        </div>
      ) : (
        <div className="mt-5">
          <Note>{pick(locale, S.notFound)}</Note>
        </div>
      )}

      <div className="mt-6">
        <Note>{pick(locale, S.fullTable)}</Note>
      </div>
      <div className="mt-2">
        <TableBox
          head={[
            pick(locale, S.tableCm),
            `${pick(locale, S.tableUs)} (${g === "men" ? pick(locale, S.men) : pick(locale, S.women)})`,
            pick(locale, S.tableUk),
            pick(locale, S.tableEu),
          ]}
          rows={SHOE_TABLE.map((r) => [
            fmt(r.cm, locale, 1),
            fmt(g === "men" ? r.usMen : r.usWomen, locale, 1),
            fmt(r.uk, locale, 1),
            fmt(r.eu, locale, 1),
          ])}
        />
      </div>
      <div className="mt-4">
        <Note>{pick(locale, S.honesty)}</Note>
      </div>
    </ToolPanel>
  );
}
