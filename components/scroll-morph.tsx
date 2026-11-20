"use client";

import { useEffect, useRef } from "react";

/**
 * @deprecated Unused legacy component. The homepage mounts HomeMaterialScene instead.
 * 滚动驱动的材质过渡(Scroll-Driven Material Transition)。
 * 只做一件事:rAF 节流地把 smoothstep(60,420,scrollY) 写进容器的 --blend 变量(0→1)。
 * 所有视觉插值(背景 scale/opacity、卡片模糊/背景色/边框高光)都在 CSS 里由 --blend 驱动,
 * 主线程每帧只写一个 CSS 变量,不做样式计算/布局,性能稳定。
 *
 * reduced-motion 时不监听滚动,直接 --blend=1(静态呈现玻璃态,不做动画)。
 */
export function ScrollMorph({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = (v: number) => el.style.setProperty("--blend", v.toFixed(3));

    if (mq.matches) {
      set(1); // 静态玻璃态,无动画
      return;
    }

    const smoothstep = (a: number, b: number, x: number) => {
      const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };

    // 直接在 scroll 回调里写单个 CSS 变量:开销极小(一次 setProperty),
    // 且不像 rAF 节流那样在后台标签页被挂起时永远卡在 ticking=true。
    const update = () => set(smoothstep(60, 420, window.scrollY || window.pageYOffset));

    update(); // 首屏(可能带 hash/恢复滚动位置)立即校正
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div ref={ref} className={className} style={{ "--blend": 0 } as React.CSSProperties}>{children}</div>;
}
