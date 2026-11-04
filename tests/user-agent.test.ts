import { describe, expect, it } from "vitest";
import { parseUserAgent } from "@/tools/_lib/user-agent";

describe("user agent parser", () => {
  it("parses desktop Chrome on Windows", () => {
    const ua =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
    const r = parseUserAgent(ua);
    expect(r.browser).toBe("Chrome");
    expect(r.browserVersion).toBe("124.0.0.0");
    expect(r.engine).toBe("WebKit");
    expect(r.os).toBe("Windows");
    expect(r.osVersion).toBe("10/11");
    expect(r.device).toBe("desktop");
    expect(r.isBot).toBe(false);
  });

  it("distinguishes Edge, Firefox, Safari and iOS Safari", () => {
    const edge = parseUserAgent(
      "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
    );
    expect(edge.browser).toBe("Microsoft Edge");
    expect(edge.browserVersion).toBe("120.0.0.0");

    const ff = parseUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0",
    );
    expect(ff.browser).toBe("Firefox");
    expect(ff.os).toBe("macOS");
    expect(ff.engine).toBe("Gecko");

    const safari = parseUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
    );
    expect(safari.browser).toBe("Safari");
    expect(safari.osVersion).toBe("10.15.7");

    const ios = parseUserAgent(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
    );
    expect(ios.browser).toBe("Safari");
    expect(ios.os).toBe("iOS");
    expect(ios.osVersion).toBe("17.4");
    expect(ios.device).toBe("mobile");
  });

  it("handles Android tablets vs phones and bots", () => {
    const tab = parseUserAgent(
      "Mozilla/5.0 (Linux; Android 13; SM-X710) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    );
    expect(tab.os).toBe("Android");
    expect(tab.device).toBe("tablet");

    const bot = parseUserAgent(
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/100.0.0.0 Safari/537.36",
    );
    expect(bot.isBot).toBe(true);
    expect(bot.device).toBe("bot");
    expect(bot.browser).toBe("Googlebot");
  });
});
