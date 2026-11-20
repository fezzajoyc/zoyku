"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { connectHomeMaterialMotion } from "@/lib/home-material-motion";

/** Server-rendered content stays intact; the client only updates a scene-scoped material value. */
export function HomeMaterialScene({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    return connectHomeMaterialMotion(root.current, window);
  }, []);
  return (
    <div
      ref={root}
      className="home-page home-material-scene"
      data-home-material=""
      style={{ "--home-progress": 0 } as CSSProperties}
    >
      {children}
    </div>
  );
}
