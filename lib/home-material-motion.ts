/** Reversible A→B material progress over the first 400 CSS pixels of page scroll. */
export function homeMaterialProgress(
  scrollY: number,
  reducedMotion = false,
): number {
  if (reducedMotion || Number.isNaN(scrollY)) return 0;
  const t = Math.max(0, Math.min(1, scrollY / 400));
  return t * t * (3 - 2 * t);
}

type MotionPreference = Pick<
  MediaQueryList,
  "matches" | "addEventListener" | "removeEventListener"
>;
type MotionWindow = {
  readonly scrollY: number;
  matchMedia(query: string): MotionPreference;
  addEventListener(
    type: "scroll",
    listener: () => void,
    options: { passive: boolean },
  ): void;
  removeEventListener(type: "scroll", listener: () => void): void;
  requestAnimationFrame(callback: FrameRequestCallback): number;
  cancelAnimationFrame(id: number): void;
};
type MotionRoot = {
  style: Pick<CSSStyleDeclaration, "setProperty" | "removeProperty">;
};

/** Own only this scene's CSS variable, listener and frame; nothing is written on document/body. */
export function connectHomeMaterialMotion(
  root: MotionRoot,
  host: MotionWindow,
): () => void {
  const preference = host.matchMedia("(prefers-reduced-motion: reduce)");
  let frame: number | null = null;
  let listening = false;
  let disposed = false;
  const update = () => {
    frame = null;
    if (!disposed)
      root.style.setProperty(
        "--home-progress",
        homeMaterialProgress(host.scrollY, preference.matches).toFixed(4),
      );
  };
  const cancelFrame = () => {
    if (frame !== null) host.cancelAnimationFrame(frame);
    frame = null;
  };
  const schedule = () => {
    if (!disposed && frame === null) frame = host.requestAnimationFrame(update);
  };
  const syncPreference = () => {
    if (disposed) return;
    cancelFrame();
    if (preference.matches && listening) {
      host.removeEventListener("scroll", schedule);
      listening = false;
    } else if (!preference.matches && !listening) {
      host.addEventListener("scroll", schedule, { passive: true });
      listening = true;
    }
    update();
  };
  preference.addEventListener("change", syncPreference);
  syncPreference();
  return () => {
    disposed = true;
    cancelFrame();
    if (listening) host.removeEventListener("scroll", schedule);
    preference.removeEventListener("change", syncPreference);
    root.style.removeProperty("--home-progress");
  };
}
