"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Icon } from "@/components/icons";
import { ToolPanel } from "@/components/ui";
import { UNIT_CATEGORIES, convertValue, formatNumber, type UnitCategory } from "../_lib/units";

/**
 * 一个引擎覆盖整族单位换算工具页。props.cat = categories id
 * (length/weight/area/volume/speed/data/time/temperature/pressure/energy)。
 */
export function UnitConverter({ cat }: { cat: string }) {
  const { locale, t } = useI18n();
  const category: UnitCategory = UNIT_CATEGORIES[cat];
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState(category.defaults[0]);
  const [to, setTo] = useState(category.defaults[1]);

  const value = Number(amount.replace(",", "."));
  const result = useMemo(
    () => (Number.isFinite(value) ? convertValue(category, value, from, to) : NaN),
    [category, value, from, to],
  );

  const fromUnit = category.units.find((x) => x.id === from)!;
  const toUnit = category.units.find((x) => x.id === to)!;

  const select = (v: string, set: (s: string) => void) => (
    <select className="field" value={v} onChange={(e) => set(e.target.value)} aria-label={v}>
      {category.units.map((unit) => (
        <option key={unit.id} value={unit.id}>
          {unit.name[locale] ?? unit.name.en} ({unit.symbol})
        </option>
      ))}
    </select>
  );

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-sub)]">{t.unit.from}</label>
          <input
            type="number"
            className="field bare mono text-lg"
            value={amount}
            inputMode="decimal"
            onChange={(e) => setAmount(e.target.value)}
            aria-label={t.unit.amount}
          />
          {select(from, setFrom)}
        </div>
        <button
          type="button"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          className="mx-auto mb-1.5 inline-flex rounded-full border hairline p-2.5 text-[var(--color-sub)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
          aria-label={t.common.swap}
          title={t.common.swap}
        >
          <Icon name="swap" size={18} />
        </button>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-sub)]">{t.unit.to}</label>
          <output className="field mono block truncate text-lg font-medium" aria-live="polite">
            {formatNumber(result)}
          </output>
          {select(to, setTo)}
        </div>
      </div>

      <p className="mt-4 text-[15px] text-[var(--color-sub)]">
        {formatNumber(value)} {fromUnit.symbol} ={" "}
        <strong className="font-semibold text-[var(--color-ink)]">{formatNumber(result)}</strong>{" "}
        {toUnit.symbol}
      </p>

      <div className="mt-7">
        <h3 className="mb-3 text-[15px] font-semibold">{t.unit.allUnits}</h3>
        <div className="overflow-hidden rounded-xl border hairline">
          <table className="w-full text-[14px]">
            <tbody>
              {category.units.map((unit, i) => (
                <tr key={unit.id} className={i % 2 ? "bg-[var(--color-surface)]" : ""}>
                  <th scope="row" className="px-3.5 py-2 text-left font-medium">
                    {unit.name[locale] ?? unit.name.en} <span className="text-[var(--color-sub)]">({unit.symbol})</span>
                  </th>
                  <td className="mono px-3.5 py-2 text-right text-[var(--color-sub)]">
                    {formatNumber(convertValue(category, value, from, unit.id))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-7">
        <h3 className="mb-3 text-[15px] font-semibold">{t.unit.common}</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[1, 10, 50, 100].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setAmount(String(v))}
              className="rounded-xl border hairline px-3 py-2 text-left text-[13px] transition-colors hover:bg-[var(--color-surface)]"
            >
              <span className="mono font-medium">{v}</span> {fromUnit.symbol}
              <span className="mono block text-[var(--color-sub)]">
                = {formatNumber(convertValue(category, v, from, to))} {toUnit.symbol}
              </span>
            </button>
          ))}
        </div>
      </div>

      {!category.convert && (
        <p className="mt-6 text-[13px] text-[var(--color-sub)]">
          {t.unit.formula}: 1 {fromUnit.symbol} = {formatNumber(convertValue(category, 1, from, to))}{" "}
          {toUnit.symbol}
        </p>
      )}
    </ToolPanel>
  );
}
