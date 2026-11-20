# Homepage detail polish

Goal: refine the approved compact A→B homepage without changing its content hierarchy or adding animation libraries.

Execution: continue inline in the existing isolated worktree; the user has authorized further polishing and verification.

## Observed defects

- At 320px the navigation extends to 325px; the German privacy CTA extends outside its card.
- Mobile header controls are 29–33px tall; suggestions and section links are only 17px tall.
- RTL search result copy shares horizontal space with an absolutely positioned favorite.
- The desktop category disclosure remains open after clicking outside.
- A composing Enter event in the command palette navigates to a tool before input is confirmed.
- Production link prefetches consume the same 40-request budget as explicit page visits and trigger 429 responses.
- The hero's bright decorative outline remains white in dark mode; the last mobile category leaves an unbalanced empty half-row.

## Work and acceptance

- [x] Add browser regressions for narrow layout, touch targets, RTL result bounds, disclosure dismissal, IME, and the final category row. Run against the current page to record failures.
- [x] Fix the responsive CSS locally: fit the header, wrap the privacy CTA, use logical result layout, enlarge mobile controls, balance the last category, soften dark decoration, and mirror directional arrows for RTL. Keep scroll material interpolation unchanged.
- [x] Add failing keyboard helper tests; guard IME in global shortcuts, home search and command palette. Dismiss disclosures on outside pointer/focus and breakpoint changes. Verify actual navigation still works.
- [x] Add proxy matcher regressions with Next's native testing utility. Exclude framework prefetches from the navigation quota using documented matcher headers; retain ordinary-page throttling and locale redirects. Disable speculative prefetch for the dense directory/search results and footer.
- [x] Run the focused regressions, all unit tests, TypeScript, lint and production build. Repeat browser checks on the production build, including all locales at narrow widths, dark mode and reduced motion.
- [x] Record evidence and limitations; commit only implementation, tests and the verification note. Fast-forward the clean original checkout if it still points to the reviewed base. Do not push or deploy.

## Review corrections

- Keep unlocalized prefetches inside the proxy so language negotiation still works. Only localized public pages skip speculative-request throttling.
- Cancel default Enter submission for the WebKit compositionend/keyCode229 sequence; the next confirmed Enter must still navigate.
- Treat focus moving to other header controls as leaving the mobile disclosure. Include the empty-state Clear button in the mobile touch sizing.
- Scope intentional pre-hydration class ownership to the root HTML node; retain descendant hydration checks.
- Keep the ribbon's leading mask stop completely transparent at both A and B so expansion cannot reveal the SVG source rectangle.
