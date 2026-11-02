import { describe, expect, it } from "vitest";
import {
  AREA,
  DATA,
  ENERGY,
  LENGTH,
  PRESSURE,
  SPEED,
  TEMPERATURE,
  TIME,
  VOLUME,
  WEIGHT,
  UNIT_CATEGORIES,
  convertValue,
  formatNumber,
  type UnitCategory,
} from "@/tools/_lib/units";

/** 相对误差断言(往返/大数用) */
function closeRel(actual: number, expected: number, rel = 1e-12): void {
  const tol = rel * Math.max(1, Math.abs(expected));
  expect(
    Math.abs(actual - expected),
    `expected ${actual} ≈ ${expected} (±${tol})`,
  ).toBeLessThanOrEqual(tol);
}

describe("convertValue: length", () => {
  // 独立核对:1 英里 = 1609.344 m(国际定义)→ 1 km = 1000/1609.344 = 0.621371192 mi
  it("converts 1 km to 0.621371192 miles", () => {
    expect(convertValue(LENGTH, 1, "km", "mi")).toBeCloseTo(0.621371192, 8);
  });
  it("converts 100 miles to 160.9344 km", () => {
    expect(convertValue(LENGTH, 100, "mi", "km")).toBeCloseTo(160.9344, 10);
  });
  it("uses exact definitional factors: 1 in = 2.54 cm, 1 ft = 12 in, 1 nmi = 1852 m", () => {
    expect(convertValue(LENGTH, 1, "in", "cm")).toBeCloseTo(2.54, 13);
    expect(convertValue(LENGTH, 1, "ft", "in")).toBeCloseTo(12, 12);
    expect(convertValue(LENGTH, 1, "nmi", "m")).toBe(1852);
  });
  it("scales prefixes exactly: 5 km = 5000 m = 5e6 mm", () => {
    expect(convertValue(LENGTH, 5, "km", "m")).toBe(5000);
    expect(convertValue(LENGTH, 5, "km", "mm")).toBe(5e6);
  });
});

describe("convertValue: weight", () => {
  // 独立核对:1 lb = 0.45359237 kg(国际磅定义)→ 1 kg = 1/0.45359237 = 2.20462262 lb
  it("converts 1 kg to 2.20462262 pounds", () => {
    expect(convertValue(WEIGHT, 1, "kg", "lb")).toBeCloseTo(2.20462262, 8);
  });
  it("converts 1 metric ton to 2204.62262 pounds", () => {
    expect(convertValue(WEIGHT, 1, "t", "lb")).toBeCloseTo(2204.6226218, 6);
  });
  it("uses exact compound definitions: 1 st = 14 lb = 6.35029318 kg, 1 oz = 28.349523125 g, 1 ct = 0.2 g", () => {
    expect(convertValue(WEIGHT, 1, "st", "kg")).toBe(6.35029318);
    expect(convertValue(WEIGHT, 1, "oz", "g")).toBeCloseTo(28.349523125, 12);
    expect(convertValue(WEIGHT, 1, "ct", "g")).toBeCloseTo(0.2, 12);
  });
});

describe("convertValue: area", () => {
  // 独立核对:1 acre = 43560 ft²(测地定义);1 ha = 10⁴ m² = 2.47105381 acre
  it("converts 1 acre to exactly 43560 square feet", () => {
    expect(convertValue(AREA, 1, "acre", "ft2")).toBe(43560);
  });
  it("converts 1 hectare to 2.4710538147 acres", () => {
    expect(convertValue(AREA, 1, "ha", "acre")).toBeCloseTo(2.4710538147, 9);
  });
  it("converts 1 square mile to 2.589988110336 square kilometers", () => {
    expect(convertValue(AREA, 1, "mi2", "km2")).toBeCloseTo(2.589988110336, 12);
  });
  it("converts 1 square meter to 10.763910417 square feet", () => {
    expect(convertValue(AREA, 1, "m2", "ft2")).toBeCloseTo(10.763910417, 8);
  });
});

describe("convertValue: volume", () => {
  // 独立核对:1 US gal = 231 in³ = 3.785411784 L(定义);1 gal = 4 qt;1 cup = 8 fl oz
  it("converts 1 US gallon to exactly 3.785411784 liters", () => {
    expect(convertValue(VOLUME, 1, "galus", "l")).toBe(3.785411784);
  });
  it("keeps US household ratios exact: 1 gal = 4 qt, 1 cup = 8 fl oz", () => {
    expect(convertValue(VOLUME, 1, "galus", "qtus")).toBe(4);
    expect(convertValue(VOLUME, 1, "cup", "flozus")).toBe(8);
  });
  it("converts 1 cubic meter to 35.3146667215 cubic feet", () => {
    expect(convertValue(VOLUME, 1, "m3", "ft3")).toBeCloseTo(35.3146667215, 8);
  });
  it("converts 1 UK gallon to exactly 4.54609 liters", () => {
    expect(convertValue(VOLUME, 1, "galuk", "l")).toBe(4.54609);
  });
});

describe("convertValue: speed", () => {
  // 独立核对:1 mph = 1.609344 km/h → 100 km/h = 100/1.609344 = 62.137119 mph
  it("converts 100 km/h to 62.137119 mph", () => {
    expect(convertValue(SPEED, 100, "kmh", "mph")).toBeCloseTo(62.137119, 6);
  });
  it("converts 1 m/s to 3.6 km/h", () => {
    expect(convertValue(SPEED, 1, "ms", "kmh")).toBeCloseTo(3.6, 12);
  });
  it("converts Mach 1 to 1225.044 km/h and 1 knot to 1.852 km/h", () => {
    expect(convertValue(SPEED, 1, "mach", "kmh")).toBeCloseTo(1225.044, 10);
    expect(convertValue(SPEED, 1, "kn", "kmh")).toBeCloseTo(1.852, 10);
  });
});

describe("convertValue: data (SI vs binary)", () => {
  it("converts 1 GB to 1000 MB and 1 TB to 1000 GB (decimal prefixes)", () => {
    expect(convertValue(DATA, 1, "gb", "mb")).toBe(1000);
    expect(convertValue(DATA, 1, "tb", "gb")).toBe(1000);
  });
  // 独立核对:1 GB = 10⁹ B = 10⁹/2³⁰ GiB = 0.9313225746154785 GiB
  it("converts 1 GB to 0.9313225746 GiB", () => {
    expect(convertValue(DATA, 1, "gb", "gib")).toBeCloseTo(0.9313225746, 9);
  });
  it("keeps binary prefixes exact: 1 GiB = 1024 MiB, 1 KB = 0.9765625 KiB, 1 B = 8 bit", () => {
    expect(convertValue(DATA, 1, "gib", "mib")).toBe(1024);
    expect(convertValue(DATA, 1, "kb", "kib")).toBe(0.9765625);
    expect(convertValue(DATA, 1, "b", "bit")).toBe(8);
  });
});

describe("convertValue: time", () => {
  // 独立核对:平均年 = 365.2425 d(格里高利历),平均月 = 365.2425/12 = 30.436875 d
  it("converts 1 year to exactly 365.2425 days", () => {
    expect(convertValue(TIME, 1, "yr", "d")).toBe(365.2425);
  });
  it("converts 1 average month to exactly 30.436875 days", () => {
    expect(convertValue(TIME, 1, "mo", "d")).toBe(30.436875);
  });
  it("converts 1 week to 168 hours and 2 h to 120 min", () => {
    expect(convertValue(TIME, 1, "wk", "h")).toBe(168);
    expect(convertValue(TIME, 2, "h", "min")).toBe(120);
  });
});

describe("convertValue: pressure", () => {
  // 独立核对:1 atm = 101325 Pa(定义);1 psi = 6894.757293168 Pa → 1 bar = 14.503773773 psi
  it("converts 1 atm to exactly 101325 Pa and 1 bar to exactly 100000 Pa", () => {
    expect(convertValue(PRESSURE, 1, "atm", "pa")).toBe(101325);
    expect(convertValue(PRESSURE, 1, "bar", "pa")).toBe(100000);
  });
  it("converts 1 bar to 14.503773773 psi and 1 atm to 14.6959487755 psi", () => {
    expect(convertValue(PRESSURE, 1, "bar", "psi")).toBeCloseTo(14.503773773, 9);
    expect(convertValue(PRESSURE, 1, "atm", "psi")).toBeCloseTo(14.6959487755, 9);
  });
  it("converts 1 mmHg to 0.133322387415 kPa", () => {
    expect(convertValue(PRESSURE, 1, "mmhg", "kpa")).toBeCloseTo(0.133322387415, 13);
  });
});

describe("convertValue: energy", () => {
  // 独立核对:1 kcal = 4184 J(定义);1 kWh = 3.6 MJ;1 kWh = 3.6e6/4184 = 860.42065 kcal
  it("converts 1 kcal to exactly 4184 J and 1 kWh to exactly 3.6e6 J", () => {
    expect(convertValue(ENERGY, 1, "kcal", "j")).toBe(4184);
    expect(convertValue(ENERGY, 1, "kwh", "j")).toBe(3.6e6);
  });
  // 独立核对:3600/4184 = 0.86042065…(与 kWh→kcal 同一比值,差 1000 倍)
  it("converts 1 kWh to 860.42065 kcal and 1 Wh to 0.86042065 kcal", () => {
    expect(convertValue(ENERGY, 1, "kwh", "kcal")).toBeCloseTo(860.42065, 5);
    expect(convertValue(ENERGY, 1, "wh", "kcal")).toBeCloseTo(0.86042065, 9);
  });
  it("converts 1 BTU to exactly 1055.05585262 J", () => {
    expect(convertValue(ENERGY, 1, "btu", "j")).toBe(1055.05585262);
  });
});

describe("convertValue: temperature (nonlinear, via Celsius pivot)", () => {
  it("converts 20 °C to 68 °F and 100 °C to 212 °F", () => {
    expect(convertValue(TEMPERATURE, 20, "c", "f")).toBe(68);
    expect(convertValue(TEMPERATURE, 100, "c", "f")).toBe(212);
  });
  it("meets at −40 where Celsius equals Fahrenheit, both directions", () => {
    expect(convertValue(TEMPERATURE, -40, "c", "f")).toBe(-40);
    expect(convertValue(TEMPERATURE, -40, "f", "c")).toBe(-40);
  });
  it("converts 0 °C to 273.15 K and absolute zero −273.15 °C to 0 K", () => {
    expect(convertValue(TEMPERATURE, 0, "c", "k")).toBe(273.15);
    expect(convertValue(TEMPERATURE, -273.15, "c", "k")).toBe(0);
  });
  it("converts body temperature 98.6 °F to 37 °C", () => {
    expect(convertValue(TEMPERATURE, 98.6, "f", "c")).toBeCloseTo(37, 10);
  });
  it("routes F→K through the 2-step Celsius path (212 °F → 373.15 K, 0 °F → 255.3722… K)", () => {
    expect(convertValue(TEMPERATURE, 212, "f", "k")).toBe(373.15);
    expect(convertValue(TEMPERATURE, 0, "f", "k")).toBeCloseTo(
      ((0 - 32) * 5) / 9 + 273.15,
      12,
    );
  });
  it("roundtrips C→F→C exactly", () => {
    expect(convertValue(TEMPERATURE, convertValue(TEMPERATURE, 20, "c", "f"), "f", "c")).toBe(20);
  });
});

describe("convertValue: roundtrip consistency across categories", () => {
  const cases: Array<[UnitCategory, string, string, number]> = [
    [LENGTH, "km", "mi", 42.195],
    [WEIGHT, "kg", "lb", 73.5],
    [AREA, "m2", "ft2", 12345.678],
    [VOLUME, "l", "galus", 0.33],
    [SPEED, "kmh", "mph", 130],
    [DATA, "gb", "gib", 750],
    [TIME, "yr", "wk", 3],
    [PRESSURE, "bar", "psi", 2.4],
    [ENERGY, "kcal", "j", 2500],
  ];
  it("returns to the original value after going there and back", () => {
    for (const [cat, from, to, v] of cases) {
      closeRel(convertValue(cat, convertValue(cat, v, from, to), to, from), v);
    }
  });
  it("maps every category id into UNIT_CATEGORIES", () => {
    for (const cat of [LENGTH, WEIGHT, AREA, VOLUME, SPEED, DATA, TIME, TEMPERATURE, PRESSURE, ENERGY]) {
      expect(UNIT_CATEGORIES[cat.id]).toBe(cat);
    }
  });
});

describe("convertValue: invalid and out-of-domain inputs", () => {
  it("returns NaN for unknown unit ids in either direction", () => {
    expect(convertValue(LENGTH, 1, "km", "parsec")).toBeNaN();
    expect(convertValue(LENGTH, 1, "league", "m")).toBeNaN();
    expect(convertValue(DATA, 1, "nibble", "bit")).toBeNaN();
  });
  it("returns NaN for unknown temperature scales", () => {
    expect(convertValue(TEMPERATURE, 20, "c", "x")).toBeNaN();
    expect(convertValue(TEMPERATURE, 20, "x", "k")).toBeNaN();
  });
  it("passes negative amounts through linearly (−5 m = −500 cm is a valid signed length)", () => {
    expect(convertValue(LENGTH, -5, "m", "cm")).toBe(-500);
    expect(convertValue(DATA, -1, "gb", "mb")).toBe(-1000);
    // 行为约定:换算器是纯数学,不做物理合法性截断——负长度照常换算,
    // 低于绝对零度的温度也不夹紧(−300 °C → −26.85 K 原样输出)。
    expect(convertValue(TEMPERATURE, -300, "c", "k")).toBeCloseTo(-26.85, 12);
  });
  it("maps zero to zero in linear categories and to 32 °F for 0 °C", () => {
    expect(convertValue(WEIGHT, 0, "kg", "lb")).toBe(0);
    expect(convertValue(TEMPERATURE, 0, "c", "f")).toBe(32);
  });
});

describe("formatNumber", () => {
  it("renders 0 (and −0) as \"0\"", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(-0)).toBe("0");
  });
  it("keeps plain integers plain", () => {
    expect(formatNumber(123)).toBe("123");
    expect(formatNumber(123456789)).toBe("123456789");
    expect(formatNumber(999999999999999)).toBe("999999999999999");
    expect(formatNumber(1e14)).toBe("100000000000000");
  });
  it("prints up to 6 significant digits and trims trailing zeros (0.1+0.2 → \"0.3\", 2.50 → \"2.5\")", () => {
    expect(formatNumber(0.1 + 0.2)).toBe("0.3");
    expect(formatNumber(2.5)).toBe("2.5");
    expect(formatNumber(20)).toBe("20");
    expect(formatNumber(0.5)).toBe("0.5");
    expect(formatNumber(1 / 3)).toBe("0.333333");
    expect(formatNumber(0.123456789)).toBe("0.123457");
    expect(formatNumber(1234.5678)).toBe("1234.57");
    expect(formatNumber(123456.789)).toBe("123457");
  });
  it("keeps negatives signed in plain notation", () => {
    expect(formatNumber(-1234.5)).toBe("-1234.5");
    expect(formatNumber(-0.075)).toBe("-0.075");
  });
  it("switches to exponent form at |x| ≥ 1e15 and trims the mantissa", () => {
    expect(formatNumber(1e15)).toBe("1e+15");
    expect(formatNumber(2e15)).toBe("2e+15");
    expect(formatNumber(1.5e15)).toBe("1.5e+15");
    expect(formatNumber(1.234e21)).toBe("1.234e+21");
  });
  it("switches to exponent form below 1e-9 but keeps 1e-8 plain", () => {
    expect(formatNumber(5e-10)).toBe("5e-10");
    expect(formatNumber(-1e-10)).toBe("-1e-10");
    expect(formatNumber(1.234e-12)).toBe("1.234e-12");
    expect(formatNumber(1e-8)).toBe("0.00000001");
  });
  it("returns \"—\" for NaN and ±Infinity", () => {
    expect(formatNumber(NaN)).toBe("—");
    expect(formatNumber(Infinity)).toBe("—");
    expect(formatNumber(-Infinity)).toBe("—");
  });
});
