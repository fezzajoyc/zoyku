import { describe, expect, it, vi } from "vitest";
import * as interactions from "@/lib/home-interactions";

const behavior = interactions as unknown as {
  revealActiveOption: (
    list: Pick<HTMLElement, "querySelector"> | null,
    activeId: string | undefined,
  ) => void;
  closeCategoryDetails: (
    event: Pick<KeyboardEvent, "key" | "preventDefault">,
    details: Pick<HTMLDetailsElement, "open" | "querySelector"> | null,
  ) => boolean;
};

describe("command palette active result visibility", () => {
  it("reveals the ninth active option with nearest scrolling without moving keyboard focus", () => {
    const scrollIntoView = vi.fn();
    const focus = vi.fn();
    const querySelector = vi.fn(() => ({ scrollIntoView, focus }));
    expect(behavior.revealActiveOption).toBeTypeOf("function");
    behavior.revealActiveOption(
      { querySelector } as unknown as HTMLElement,
      "command-result-json-formatter",
    );
    expect(querySelector).toHaveBeenCalledWith(
      '[id="command-result-json-formatter"]',
    );
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "nearest" });
    expect(focus).not.toHaveBeenCalled();
  });
  it("does nothing when search is empty or the selected result was removed", () => {
    const querySelector = vi.fn(() => null);
    expect(behavior.revealActiveOption).toBeTypeOf("function");
    expect(() =>
      behavior.revealActiveOption(null, "command-result-merge-pdf"),
    ).not.toThrow();
    behavior.revealActiveOption(
      { querySelector } as unknown as HTMLElement,
      undefined,
    );
    expect(querySelector).not.toHaveBeenCalled();
    expect(() =>
      behavior.revealActiveOption(
        { querySelector } as unknown as HTMLElement,
        "command-result-gone",
      ),
    ).not.toThrow();
  });
});

describe("desktop category menu Escape behavior", () => {
  it("closes the open native details and returns focus to its summary", () => {
    const focus = vi.fn();
    const details = { open: true, querySelector: vi.fn(() => ({ focus })) };
    const event = { key: "Escape", preventDefault: vi.fn() };
    expect(behavior.closeCategoryDetails).toBeTypeOf("function");
    expect(
      behavior.closeCategoryDetails(
        event,
        details as unknown as HTMLDetailsElement,
      ),
    ).toBe(true);
    expect(details.open).toBe(false);
    expect(details.querySelector).toHaveBeenCalledWith("summary");
    expect(focus).toHaveBeenCalledOnce();
    expect(event.preventDefault).toHaveBeenCalledOnce();
  });
  it("leaves normal keys and closed menus alone", () => {
    const querySelector = vi.fn();
    const details = { open: false, querySelector };
    const preventDefault = vi.fn();
    expect(behavior.closeCategoryDetails).toBeTypeOf("function");
    expect(
      behavior.closeCategoryDetails(
        { key: "Escape", preventDefault },
        details as unknown as HTMLDetailsElement,
      ),
    ).toBe(false);
    details.open = true;
    expect(
      behavior.closeCategoryDetails(
        { key: "Tab", preventDefault },
        details as unknown as HTMLDetailsElement,
      ),
    ).toBe(false);
    expect(querySelector).not.toHaveBeenCalled();
    expect(preventDefault).not.toHaveBeenCalled();
    expect(details.open).toBe(true);
  });
});
