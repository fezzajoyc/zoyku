# Homepage detail polish — verified 2026-11-20

Scope: a focused continuation of the approved compact homepage and reversible A→B material transition. Base: `79c2b3c`; delivery branch: `homepage-modern-redesign`. No push or deployment.

## Changes

- Fit the navigation at 320px; keep an accessible brand name when the narrowest layout displays only its mark.
- Wrap the privacy CTA within its card in long locales. Give mobile primary controls, result favorites and the empty-state Clear button a 44px touch height.
- Keep result copy and favorites in separate flex regions in both directions. Mirror directional arrows for RTL.
- Balance the seventh mobile category across the last row, soften the decorative outline in dark mode, and preserve complete transparency at the ribbon's source edge throughout A→B.
- Dismiss category/mobile disclosures on outside interaction and focus changes; clear stale open state across the mobile breakpoint.
- Respect IME-owned keys in the global shortcut, search dialog and home form. Cancel the native form submission for the compositionend → Enter/keyCode229 ordering, while preserving the next confirmed Enter.
- Let only localized public prefetches bypass the navigation rate counter. Unlocalized paths still negotiate a locale; ordinary visits retain the existing limit. Avoid eager prefetch for dense directory/results and footer links.
- Mark intentional pre-hydration root class ownership explicitly. Hydration checks on descendants remain active.

## Fresh checks

- `npm test -- --reporter=dot`: **56 files, 1,410 tests passed**.
- `CIRCLE_NODE_TOTAL=2 npm run build`: **passed**, including TypeScript and **9,577 generated static paths**.
- `npm run lint`: **0 errors, 55 existing warnings**; no warning-suppression changes were made.
- `git diff --check`: passed.
- Static SEO audit on the final build: **3,210/3,210 passed**.
- HTTP SEO sample on the final production preview: **24/24 passed**, **25 requests, zero 429s, zero retries**.
- Playwright production checks: **26 passed, zero failed**. This covers all 15 locales at 320px; 390px controls and category balance; RTL result bounds; outside-pointer/focus/breakpoint menu closure; composing Enter and confirmed navigation; persisted favorites and focus return; theme reloads without hydration errors; reversible progress, 16px/10px blur caps and reduced motion; directory prefetch behavior without 429s.

## Regression and review evidence

The initial browser regression run failed on all eight targeted existing defects. Keyboard/proxy tests were observed failing before implementation. Review then reproduced two additional issues: unlocalized prefetch redirects being skipped, and native IME form submission after compositionend. Both received failing regressions, were fixed, and were independently rechecked. The final review reported no remaining important issues. The mask-edge regression also failed before the final feathering change and passed in the final suite.

The reusable browser scenario is `scripts/home-polish-qa.mjs`, exporting a function accepting an existing Playwright `page` and `{ baseURL, reportDir, allLocales, production }`. No new runtime dependency was added. Generated screenshots and full command logs are kept outside the source checkout:

`/Users/zhuangxiangdi/Documents/anyThings/seo/out1/reports/zoyku-home-polish-2026-11-20/`

The final preview is `http://127.0.0.1:3477/zh`.

## Boundaries

- Automated browser checks used desktop Chromium with narrow viewports. The WebKit keyCode229 ordering was simulated; this does not claim a physical iPhone/Safari or hardware IME session.
- The localized prefetch exemption applies to public static content. The existing in-memory rate counter is best-effort throttling, not an authorization or DDoS boundary.
- Vercel Analytics still requests its platform-provided endpoint in local preview, where the script returns 404. No public analytics, rankings, live Core Web Vitals or deployed behavior is claimed.
- Existing tool capability and dependency limitations from the preceding verification remain applicable; this iteration changes homepage/shared navigation details rather than tool engines.
