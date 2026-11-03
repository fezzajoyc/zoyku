"use client";

import { useEffect, useState, useRef } from "react";
import { Icon } from "./icons";

/**
 * Antigravity Opening Sequence & Gravitational Field Controller:
 * 1. 开屏仪式感 (Quantum Boot): 首次载入时展现量子引力奇点与内存装载序列，随后以光斑绽放平滑入场
 * 2. 引力光标跟随 (Gravitational Spotlight): 鼠标在 Hero 区域移动时，背景流体光场产生微引力动态跟随
 * 3. 悬浮微引力粒子 (Quantum Particles): 纯 CSS 零负载的微引力粒子缓慢漂浮，呼应 "Antigravity" 零重力感
 */
export function HeroIntroSplash() {
  const [showSplash, setShowSplash] = useState(false);
  const [animStage, setAnimStage] = useState<"ignite" | "expand" | "done">("ignite");

  useEffect(() => {
    // 尊重用户的减少动效偏好
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // 检查会话缓存:每个会话只播放一次，避免日常使用打扰
    const seen = sessionStorage.getItem("zoyku_ag_booted");
    if (!seen) {
      setShowSplash(true);
      sessionStorage.setItem("zoyku_ag_booted", "1");

      const t1 = setTimeout(() => {
        setAnimStage("expand");
      }, 700);

      const t2 = setTimeout(() => {
        setAnimStage("done");
        setShowSplash(false);
      }, 1400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, []);

  // 支持键盘 Esc 或任意点击立即跳过
  const handleDismiss = () => {
    setAnimStage("done");
    setShowSplash(false);
  };

  useEffect(() => {
    if (!showSplash) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showSplash]);

  if (!showSplash) return null;

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-bg)] transition-opacity duration-700 ${
        animStage === "expand" ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
      style={{
        backdropFilter: "blur(24px)",
        transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      aria-hidden="true"
    >
      {/* 细微科技蓝图点阵背景 */}
      <div className="antigravity-grid pointer-events-none absolute inset-0 opacity-40" />

      {/* 中心引力奇点 */}
      <div className="relative flex flex-col items-center">
        {/* 多色光晕光斑 */}
        <div
          className={`h-44 w-44 rounded-full transition-transform duration-700 ease-out ${
            animStage === "expand" ? "scale-250 opacity-0" : "scale-100 opacity-90"
          }`}
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, #4285f4 0deg, #9b51e0 90deg, #ea4335 180deg, #fbbc05 240deg, #34a853 300deg, #4285f4 360deg)",
            filter: "blur(40px)",
          }}
        />

        {/* 核心徽标与脉冲环 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-ink)] text-[var(--color-bg)] shadow-2xl">
            <span className="absolute -inset-1 rounded-2xl border border-[var(--color-accent)] opacity-40 animate-ping" />
            <Icon name="sparkle" size={28} />
          </div>

          <div className="mt-6 flex flex-col items-center text-center">
            <div className="mono flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-ink)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Zoyku Antigravity Runtime</span>
            </div>
            <span className="mono mt-1 text-[11px] text-[var(--color-sub)] tracking-wider">
              INITIALIZING IN-MEMORY ENVIRONMENT
            </span>
          </div>
        </div>
      </div>

      <div className="mono absolute bottom-8 text-[11px] text-[var(--color-sub)] tracking-widest opacity-60">
        CLICK ANYWHERE TO SKIP [ESC]
      </div>
    </div>
  );
}

/**
 * 鼠标引力光场跟随器:在 Hero 容器内实时追踪鼠标位置，赋予重力井微妙的磁吸感
 */
export function GravityMouseField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    let targetX = 50;
    let targetY = 40;
    let currentX = 50;
    let currentY = 40;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth) * 100;
      targetY = (e.clientY / innerHeight) * 100;
    };

    const updatePosition = () => {
      // 弹性缓动追踪
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--gx", `${currentX.toFixed(2)}%`);
        containerRef.current.style.setProperty("--gy", `${currentY.toFixed(2)}%`);
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={
        {
          "--gx": "50%",
          "--gy": "40%",
        } as React.CSSProperties
      }
    >
      {/* 随光标柔和游移的副重力焦点 */}
      <div
        className="absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px] transition-opacity dark:opacity-12"
        style={{
          left: "var(--gx)",
          top: "var(--gy)",
          background:
            "radial-gradient(circle, rgba(66,133,244,0.5) 0%, rgba(155,81,224,0.3) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}

/**
 * 悬浮微引力粒子 (Zero-Gravity Floating Particles)
 */
export function QuantumParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {[
        { left: "15%", top: "25%", size: 4, delay: "0s", duration: "8s", color: "#4285f4" },
        { left: "82%", top: "20%", size: 5, delay: "1.5s", duration: "10s", color: "#9b51e0" },
        { left: "30%", top: "70%", size: 3, delay: "3s", duration: "7s", color: "#34a853" },
        { left: "75%", top: "65%", size: 4, delay: "2s", duration: "9s", color: "#ea4335" },
        { left: "50%", top: "85%", size: 3.5, delay: "4s", duration: "8.5s", color: "#fbbc05" },
      ].map((p, i) => (
        <span
          key={i}
          className="quantum-particle absolute rounded-full opacity-60"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
            animation: `quantum-drift ${p.duration} ease-in-out infinite alternate`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
