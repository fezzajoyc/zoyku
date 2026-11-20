import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/site";
import { EmailDnsOutcome, MAIL_DNS_LABELS } from "@/tools/_engines/sec-engine-email";
import { ENERGY_GUARDS, HealthEnergyWarning } from "@/tools/_engines/calc-engine-health";
import { COMPOUND_CONVENTION } from "@/tools/_engines/calc-engine-compound";
import { IP_RATE_LIMIT_LABELS } from "@/tools/_engines/sec-engine-lookup";
import { TOTP_LINK_LABELS } from "@/tools/_engines/sec-engine-totp";
import { bmr, calorieGoal, tdee } from "@/tools/_lib/health";
import { parseMailDns } from "@/tools/_lib/email";

describe("visible mail routing states", () => {
  it("renders explicit null MX as refusal and never as deliverable", () => {
    const result = parseMailDns({ Status: 0, Answer: [{ type: 15, data: "0 ." }] });
    const html = renderToStaticMarkup(<EmailDnsOutcome result={result} locale="en" />);
    expect(html).toContain("explicitly refuses email");
    expect(html).not.toContain("Looks deliverable");
    expect(html).not.toContain("<li>.</li>");
  });
  it("renders missing records, temporary failures and possible IPv6 fallback distinctly", () => {
    const empty = { Status: 0 };
    const cases = [
      { result: parseMailDns(empty, empty, empty), message: "No MX, A or AAAA mail route" },
      { result: parseMailDns({ Status: 2 }), message: "SERVFAIL" },
      { result: parseMailDns({ Status: 3 }), message: "NXDOMAIN" },
      { result: parseMailDns(empty, empty, { Status: 0, Answer: [{ type: 28, data: "2001:db8::1" }] }), message: "possible fallback route" },
    ];
    for (const { result, message } of cases) {
      expect(renderToStaticMarkup(<EmailDnsOutcome result={result} locale="en" />)).toContain(message);
    }
  });
});

describe("visible adult calorie guard", () => {
  it("renders an adult eligibility warning for a child", () => {
    const maintenance = tdee(bmr(30, 130, 10, "female"), "sedentary");
    const target = calorieGoal(maintenance, "lose");
    expect(renderToStaticMarkup(<HealthEnergyWarning age={10} maintenance={maintenance} target={target} locale="en" />)).toContain("18 and over");
  });
  it("replaces the unsafe numeric target with a floor explanation", () => {
    const target = calorieGoal(1246.8, "lose");
    expect(target).toBeNaN();
    const html = renderToStaticMarkup(<HealthEnergyWarning age={60} maintenance={1246.8} target={target} locale="en" />);
    expect(html).toContain("1,000 kcal/day");
    expect(html).not.toContain("746.8");
    expect(renderToStaticMarkup(<HealthEnergyWarning age={30} maintenance={2500} target={2000} locale="en" />)).toBe("");
  });
});

describe("new guard and accounting explanations are complete in every supported locale", () => {
  it("has actual entries for all fifteen languages", () => {
    for (const labels of [...Object.values(MAIL_DNS_LABELS), ...Object.values(ENERGY_GUARDS), COMPOUND_CONVENTION, IP_RATE_LIMIT_LABELS, TOTP_LINK_LABELS]) {
      for (const locale of LOCALES) expect(labels[locale]?.length, locale).toBeGreaterThan(10);
    }
  });
  it("the engines use the visible result components and TOTP applies all imported options", () => {
    const health = readFileSync(new URL("../tools/_engines/calc-engine-health.tsx", import.meta.url), "utf8");
    expect(health).toContain("<HealthEnergyWarning age={a} maintenance={t} target={target}");
    const otp = readFileSync(new URL("../tools/_engines/sec-engine-totp.tsx", import.meta.url), "utf8");
    for (const option of ["Digits", "Period", "Algo"]) expect(otp).toContain(`set${option}(parsed.link.${option.toLowerCase()});`);
    expect(otp).not.toContain("if (parsed.link.digits)");
  });
});
