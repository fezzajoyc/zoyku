/** IME owns these keys until the candidate is committed (229 also covers WebKit). */
export function isComposingKey(
  event: Pick<KeyboardEvent, "isComposing" | "keyCode">,
): boolean {
  return event.isComposing || event.keyCode === 229;
}

/** Keep aria-activedescendant selection visible while keyboard focus stays in the search input. */
export function revealActiveOption(
  list: Pick<HTMLElement, "querySelector"> | null,
  activeId: string | undefined,
): void {
  if (!list || !activeId) return;
  list
    .querySelector<HTMLElement>(`[id="${activeId}"]`)
    ?.scrollIntoView({ block: "nearest" });
}

/** Native details supports keyboard opening; Escape also needs explicit closure and focus return. */
export function closeCategoryDetails(
  event: Pick<KeyboardEvent, "key" | "preventDefault">,
  details: Pick<HTMLDetailsElement, "open" | "querySelector"> | null,
): boolean {
  if (event.key !== "Escape" || !details?.open) return false;
  event.preventDefault();
  details.open = false;
  details.querySelector<HTMLElement>("summary")?.focus();
  return true;
}
