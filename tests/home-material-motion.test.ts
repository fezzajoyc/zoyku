import { describe, expect, it, vi } from "vitest";
import {
  connectHomeMaterialMotion,
  homeMaterialProgress,
} from "@/lib/home-material-motion";

function environment({ reduced = false, scrollY = 0 } = {}) {
  let frameId = 0;
  const scroll = new Set<() => void>();
  const preference = new Set<() => void>();
  const frames = new Map<number, () => void>();
  const style = { setProperty: vi.fn(), removeProperty: vi.fn() };
  const query = {
    matches: reduced,
    addEventListener: vi.fn((type: string, listener: () => void) =>
      preference.add(listener),
    ),
    removeEventListener: vi.fn((type: string, listener: () => void) =>
      preference.delete(listener),
    ),
  };
  const host = {
    scrollY,
    matchMedia: vi.fn(() => query),
    addEventListener: vi.fn((type: string, listener: () => void) =>
      scroll.add(listener),
    ),
    removeEventListener: vi.fn((type: string, listener: () => void) =>
      scroll.delete(listener),
    ),
    requestAnimationFrame: vi.fn((callback: () => void) => {
      frames.set(++frameId, callback);
      return frameId;
    }),
    cancelAnimationFrame: vi.fn((id: number) => frames.delete(id)),
  };
  return {
    root: { style },
    host,
    query,
    scroll,
    preference,
    frames,
    changePreference(value: boolean) {
      query.matches = value;
      preference.forEach((listener) => listener());
    },
    scrollTo(value: number) {
      host.scrollY = value;
      scroll.forEach((listener) => listener());
    },
    flush() {
      for (const [id, callback] of [...frames]) {
        frames.delete(id);
        callback();
      }
    },
  };
}

describe("home A to B material progress", () => {
  it.each([
    [-100, 0],
    [0, 0],
    [100, 0.15625],
    [200, 0.5],
    [300, 0.84375],
    [400, 1],
    [2000, 1],
  ])("clamps and smoothsteps scroll %s to %s", (position, expected) => {
    expect(homeMaterialProgress).toBeTypeOf("function");
    expect(homeMaterialProgress(position)).toBe(expected);
  });
  it("is reversible and keeps reduced motion at static A", () => {
    expect(homeMaterialProgress).toBeTypeOf("function");
    expect([400, 200, 0].map((value) => homeMaterialProgress(value))).toEqual([
      1, 0.5, 0,
    ]);
    expect(homeMaterialProgress(400, true)).toBe(0);
    expect(homeMaterialProgress(Number.NaN)).toBe(0);
  });
});

describe("home material scroll lifecycle", () => {
  it("writes only the scoped root variable and batches rapid scroll events into one frame", () => {
    const env = environment();
    expect(connectHomeMaterialMotion).toBeTypeOf("function");
    const cleanup = connectHomeMaterialMotion(
      env.root,
      env.host as unknown as Parameters<typeof connectHomeMaterialMotion>[1],
    );
    expect(env.host.addEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      { passive: true },
    );
    env.scrollTo(100);
    env.scrollTo(200);
    env.scrollTo(300);
    expect(env.frames.size).toBe(1);
    env.flush();
    expect(env.root.style.setProperty).toHaveBeenLastCalledWith(
      "--home-progress",
      "0.8438",
    );
    expect(
      env.root.style.setProperty.mock.calls.every(
        ([name]) => name === "--home-progress",
      ),
    ).toBe(true);
    cleanup();
  });
  it("restores the current scroll position immediately and reverses without a new mount", () => {
    const env = environment({ scrollY: 400 });
    expect(connectHomeMaterialMotion).toBeTypeOf("function");
    const cleanup = connectHomeMaterialMotion(
      env.root,
      env.host as unknown as Parameters<typeof connectHomeMaterialMotion>[1],
    );
    expect(env.root.style.setProperty).toHaveBeenLastCalledWith(
      "--home-progress",
      "1.0000",
    );
    env.scrollTo(0);
    env.flush();
    expect(env.root.style.setProperty).toHaveBeenLastCalledWith(
      "--home-progress",
      "0.0000",
    );
    cleanup();
  });
  it("does no scroll or animation-frame work for reduced motion and observes preference changes", () => {
    const env = environment({ reduced: true, scrollY: 400 });
    expect(connectHomeMaterialMotion).toBeTypeOf("function");
    const cleanup = connectHomeMaterialMotion(
      env.root,
      env.host as unknown as Parameters<typeof connectHomeMaterialMotion>[1],
    );
    expect(env.scroll.size).toBe(0);
    expect(env.frames.size).toBe(0);
    expect(env.root.style.setProperty).toHaveBeenLastCalledWith(
      "--home-progress",
      "0.0000",
    );
    env.changePreference(false);
    expect(env.scroll.size).toBe(1);
    expect(env.root.style.setProperty).toHaveBeenLastCalledWith(
      "--home-progress",
      "1.0000",
    );
    env.scrollTo(300);
    env.changePreference(true);
    expect(env.frames.size).toBe(0);
    expect(env.scroll.size).toBe(0);
    expect(env.root.style.setProperty).toHaveBeenLastCalledWith(
      "--home-progress",
      "0.0000",
    );
    cleanup();
  });
  it("ignores a preference event already queued when the route unmounts", () => {
    const env = environment({ reduced: true });
    const cleanup = connectHomeMaterialMotion(
      env.root,
      env.host as unknown as Parameters<typeof connectHomeMaterialMotion>[1],
    );
    const latePreference = [...env.preference][0];
    cleanup();
    env.query.matches = false;
    latePreference();
    expect(env.scroll.size).toBe(0);
    expect(env.frames.size).toBe(0);
  });
  it("removes listeners, cancels queued work and prevents writes after route exit", () => {
    const env = environment();
    expect(connectHomeMaterialMotion).toBeTypeOf("function");
    const cleanup = connectHomeMaterialMotion(
      env.root,
      env.host as unknown as Parameters<typeof connectHomeMaterialMotion>[1],
    );
    env.scrollTo(300);
    const lateFrame = [...env.frames.values()][0];
    cleanup();
    expect(env.scroll.size).toBe(0);
    expect(env.preference.size).toBe(0);
    expect(env.frames.size).toBe(0);
    expect(env.root.style.removeProperty).toHaveBeenCalledWith(
      "--home-progress",
    );
    const calls = env.root.style.setProperty.mock.calls.length;
    lateFrame();
    expect(env.root.style.setProperty).toHaveBeenCalledTimes(calls);
  });
});
