"use client";

import { useRef } from "react";
import { clamp } from "./image-util";

/**
 * 可交互裁剪舞台:在按原始比例铺满的预览图上拖动/缩放选框。
 * rect 使用原图自然像素坐标;pointer events 同时支持鼠标与触屏。
 */

export type CropRect = { x: number; y: number; w: number; h: number };

type Mode = "move" | "nw" | "ne" | "sw" | "se";

const MIN = 24;
const HANDLE = 14;

export function fitRect(width: number, height: number, aspect: number | null): CropRect {
  if (!aspect || width <= 0 || height <= 0) return { x: 0, y: 0, w: width, h: height };
  let w = width;
  let h = w / aspect;
  if (h > height) {
    h = height;
    w = h * aspect;
  }
  return { x: Math.round((width - w) / 2), y: Math.round((height - h) / 2), w: Math.round(w), h: Math.round(h) };
}

function applyDrag(
  mode: Mode,
  r0: CropRect,
  dx: number,
  dy: number,
  W: number,
  H: number,
  aspect: number | null,
): CropRect {
  if (mode === "move") {
    return {
      ...r0,
      x: clamp(Math.round(r0.x + dx), 0, Math.max(0, W - r0.w)),
      y: clamp(Math.round(r0.y + dy), 0, Math.max(0, H - r0.h)),
    };
  }
  // 角点缩放:锚定对角
  const anchors: Record<Exclude<Mode, "move">, [number, number]> = {
    se: [r0.x, r0.y],
    nw: [r0.x + r0.w, r0.y + r0.h],
    ne: [r0.x, r0.y + r0.h],
    sw: [r0.x + r0.w, r0.y],
  };
  const [ax, ay] = anchors[mode];
  const maxW = mode === "nw" || mode === "sw" ? ax : W - ax;
  const maxH = mode === "nw" || mode === "ne" ? ay : H - ay;
  const availW = Math.max(MIN, Math.min(maxW, W));
  const availH = Math.max(MIN, Math.min(maxH, H));

  let w: number;
  let h: number;
  if (aspect) {
    const free = mode === "nw" || mode === "sw" ? ax - (r0.x + dx) : r0.x + r0.w + dx - ax;
    const freeH = mode === "nw" || mode === "ne" ? ay - (r0.y + dy) : r0.y + r0.h + dy - ay;
    const target = Math.max(free, freeH * aspect);
    w = clamp(Math.round(target), MIN, Math.round(Math.min(availW, availH * aspect)));
    h = Math.round(w / aspect);
    if (h > availH) {
      h = availH;
      w = Math.round(h * aspect);
    }
  } else {
    w = clamp(
      Math.round(mode === "nw" || mode === "sw" ? ax - (r0.x + dx) : r0.x + r0.w + dx - ax),
      MIN,
      Math.round(availW),
    );
    h = clamp(
      Math.round(mode === "nw" || mode === "ne" ? ay - (r0.y + dy) : r0.y + r0.h + dy - ay),
      MIN,
      Math.round(availH),
    );
  }
  const x = mode === "nw" || mode === "sw" ? ax - w : ax;
  const y = mode === "nw" || mode === "ne" ? ay - h : ay;
  return { x, y, w, h };
}

export function CropStage({
  src,
  width,
  height,
  rect,
  aspect,
  onChange,
  alt = "",
}: {
  src: string;
  width: number;
  height: number;
  rect: CropRect;
  aspect: number | null;
  onChange: (r: CropRect) => void;
  alt?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ mode: Mode; sx: number; sy: number; r0: CropRect } | null>(null);

  const start = (e: React.PointerEvent, mode: Mode) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { mode, sx: e.clientX, sy: e.clientY, r0: rect };
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    const stage = stageRef.current;
    if (!d || !stage) return;
    const box = stage.getBoundingClientRect();
    const k = width / Math.max(1, box.width);
    onChange(applyDrag(d.mode, d.r0, (e.clientX - d.sx) * k, (e.clientY - d.sy) * k, width, height, aspect));
  };
  const end = () => {
    drag.current = null;
  };

  const pct = (v: number, total: number) => `${(v / total) * 100}%`;

  const handle = (mode: Exclude<Mode, "move">) => (
    <span
      role="presentation"
      onPointerDown={(e) => start(e, mode)}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
      className="absolute z-10 rounded-sm border-2 border-white bg-[var(--color-accent)] shadow"
      style={{
        width: HANDLE,
        height: HANDLE,
        cursor: `${mode}-resize`,
        left: `calc(${pct(mode.includes("w") ? rect.x : rect.x + rect.w, width)} - ${HANDLE / 2}px)`,
        top: `calc(${pct(mode.includes("n") ? rect.y : rect.y + rect.h, height)} - ${HANDLE / 2}px)`,
        touchAction: "none",
      }}
    />
  );

  return (
    <div
      ref={stageRef}
      className="relative w-full select-none overflow-hidden rounded-xl border hairline bg-[var(--color-surface)]"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} draggable={false} className="absolute inset-0 h-full w-full object-fill" />
      {/* 暗化遮罩(选框外) */}
      <span
        role="presentation"
        className="absolute inset-0 bg-black/45"
        style={{
          clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${pct(rect.x, width)} ${pct(rect.y, height)}, ${pct(rect.x, width)} ${pct(rect.y + rect.h, height)}, ${pct(rect.x + rect.w, width)} ${pct(rect.y + rect.h, height)}, ${pct(rect.x + rect.w, width)} ${pct(rect.y, height)}, ${pct(rect.x, width)} ${pct(rect.y, height)})`,
        }}
      />
      {/* 选框 */}
      <span
        role="presentation"
        onPointerDown={(e) => start(e, "move")}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
        className="absolute cursor-move outline outline-1 outline-white/90"
        style={{
          left: pct(rect.x, width),
          top: pct(rect.y, height),
          width: pct(rect.w, width),
          height: pct(rect.h, height),
          touchAction: "none",
        }}
      >
        <span role="presentation" className="pointer-events-none absolute inset-0 border border-dashed border-white/50" />
      </span>
      {handle("nw")}
      {handle("ne")}
      {handle("sw")}
      {handle("se")}
    </div>
  );
}
