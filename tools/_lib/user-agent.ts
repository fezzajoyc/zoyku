/**
 * User-Agent 解析 —— 手写正则规则表,纯函数,可单测。
 * 返回浏览器/版本、渲染引擎、操作系统/版本、设备类型(桌面/移动/平板/bot)。
 * 规则按优先级排列:先匹配 bot,再匹配具体浏览器(Edg 需在 Chrome/Opr 之前判断按 token 顺序),
 * 实际上按 UA 字符串里 token 出现的先后决定真实引擎,这里用"最后一个出现的引擎 token"策略。
 */

export type DeviceType = "desktop" | "mobile" | "tablet" | "bot";

export interface UAResult {
  browser: string;
  browserVersion: string;
  engine: string;
  engineVersion: string;
  os: string;
  osVersion: string;
  device: DeviceType;
  isBot: boolean;
}

/** bot 家族关键词(小写、对整条 UA 做 includes) */
const BOTS: [RegExp, string][] = [
  [/googlebot\/([\d.]+)/i, "Googlebot"],
  [/googlebot-news/i, "Googlebot News"],
  [/googlebot-image/i, "Googlebot Images"],
  [/adsbot-google/i, "AdsBot Google"],
  [/(?:baiduspider|baiduspider-[^;\s]*)\/?([\d.]*)/i, "Baiduspider"],
  [/bingbot\/([\d.]+)/i, "Bingbot"],
  [/duckduckbot\/([\d.]+)/i, "DuckDuckBot"],
  [/yandexbot\/([\d.]+)/i, "YandexBot"],
  [/slurp(?:\/([\d.]+))?/i, "Yahoo! Slurp"],
  [/facebookexternalhit(?:\/([\d.]+))?/i, "Facebook"],
  [/(?:twitterbot|linkedinbot|applebot|petalbot|semrushbot|ahrefsbot|mj12bot|dotbot|megaindex|zoominfo|uptimerobot|headlesschrome)/i, "Bot"],
  [/bot|crawler|spider|crawling/i, "Bot"],
];

interface BrowserRule {
  re: RegExp;
  name: string;
  /** 版本取第几个捕获组,默认 1 */
  group?: number;
}

// 按特异性排列:通用 token(CloudflareApp 等)在前,Mozilla 兼容 token 在后。
const BROWSERS: BrowserRule[] = [
  { re: /Edg(?:e|A|iOS)?\/([\d.]+)/, name: "Microsoft Edge" },
  { re: /O(?:pera?|PR|MG)[\s/]([\d.]+)/, name: "Opera" },
  { re: /SamsungBrowser\/([\d.]+)/, name: "Samsung Internet" },
  { re: /YaBrowser\/([\d.]+)/, name: "Yandex Browser" },
  { re: /Firefox\/([\d.]+)/, name: "Firefox" },
  { re: /FxiOS\/([\d.]+)/, name: "Firefox iOS" },
  { re: /CriOS\/([\d.]+)/, name: "Chrome iOS" },
  { re: /Chrome\/([\d.]+)/, name: "Chrome" },
  { re: /Version\/([\d.]+).*Safari/, name: "Safari" },
  { re: /MSIE\s([\d.]+)/, name: "Internet Explorer" },
  { re: /Trident\/.*rv:([\d.]+)/, name: "Internet Explorer" },
];

/** 引擎判定:取 UA 中出现位置最靠后的引擎 token(真实渲染引擎)。 */
const ENGINES: [RegExp, string][] = [
  [/Gecko\/([\d.]+)/, "Gecko"],
  [/AppleWebKit\/([\d.]+)/, "WebKit"],
  [/Trident\/([\d.]+)/, "Trident"],
];

interface OsRule {
  re: RegExp;
  name: string;
  version?: (m: RegExpMatchArray, ua: string) => string;
  device?: DeviceType;
}

const OS_RULES: OsRule[] = [
  {
    re: /Windows NT ([\d.]+)/,
    name: "Windows",
    version: (m) => ({ "10.0": "10/11", "6.3": "8.1", "6.2": "8", "6.1": "7" }[m[1]] ?? m[1]),
    device: "desktop",
  },
  { re: /Windows Phone(?: OS)? ([\d.]+)/, name: "Windows Phone", version: (m) => m[1], device: "mobile" },
  {
    re: /(?:iPhone|iPad|iPod)/,
    name: "iOS",
    version: (m, ua) => /OS (\d+[_\d]*)/.exec(ua)?.[1]?.replace(/_/g, ".") ?? "",
    device: "mobile",
  },
  { re: /Mac OS X ([\d_.]+)/, name: "macOS", version: (m) => m[1].replace(/_/g, "."), device: "desktop" },
  { re: /Macintosh/, name: "macOS", version: () => "", device: "desktop" },
  { re: /Android[ /]?([\d.]*)/, name: "Android", device: "mobile" },
  { re: /CrOS/, name: "Chrome OS", device: "desktop" },
  { re: /Ubuntu/, name: "Linux", device: "desktop" },
  { re: /(?:Linux|X11)/, name: "Linux", device: "desktop" },
];

export function parseUserAgent(ua: string): UAResult {
  const s = ua || "";
  const empty: UAResult = { browser: "Unknown", browserVersion: "", engine: "Unknown", engineVersion: "", os: "Unknown", osVersion: "", device: "desktop", isBot: false };

  // bot 优先
  for (const [re, name] of BOTS) {
    const m = re.exec(s);
    if (m) {
      return {
        browser: /googlebot/i.test(re.source) || name === "Googlebot" ? "Googlebot" : name,
        browserVersion: m[1] || "",
        engine: "—",
        engineVersion: "",
        os: "—",
        osVersion: "",
        device: "bot",
        isBot: true,
      };
    }
  }

  // 浏览器(不依赖 token 顺序的策略:规则按特异性排列,Edg/CriOS 等特例先判)
  let browser = "Unknown";
  let browserVersion = "";
  for (const r of BROWSERS) {
    const m = r.re.exec(s);
    if (m) {
      browser = r.name;
      browserVersion = (r.group ? m[r.group] : m[1]) || "";
      break;
    }
  }

  // Safari 特判:带 Safari token 但无 Version 的老 UA
  if (browser === "Unknown" && /Safari\//.test(s) && !/Chrome|Chromium|Edg|OPR/.test(s)) {
    browser = "Safari";
    browserVersion = /Safari\/([\d.]+)/.exec(s)?.[1] ?? "";
  }

  // 引擎:取出现位置最靠后的 token
  let engine = "Unknown";
  let engineVersion = "";
  let bestPos = -1;
  for (const [re, name] of ENGINES) {
    const m = re.exec(s);
    if (m && m.index > bestPos) {
      bestPos = m.index;
      engine = name;
      engineVersion = m[1] ?? "";
    }
  }

  // OS + 设备
  let os = "Unknown";
  let osVersion = "";
  let device: DeviceType = "desktop";
  for (const r of OS_RULES) {
    const m = r.re.exec(s);
    if (m) {
      os = r.name;
      osVersion = r.version ? r.version(m, s) : m[1] ?? "";
      device = r.device ?? "desktop";
      break;
    }
  }

  // 设备细化:Android 平板(不含 Mobile token);iPad
  if (/iPad/.test(s)) device = "tablet";
  else if (os === "Android" && !/Mobile/.test(s)) device = "tablet";
  else if (/Tablet|PlayBook|Silk/i.test(s)) device = "tablet";
  else if (/Mobi|iPhone|iPod|IEMobile|Opera Mini/i.test(s)) device = "mobile";

  return { browser, browserVersion, engine, engineVersion, os, osVersion, device, isBot: false };
}
