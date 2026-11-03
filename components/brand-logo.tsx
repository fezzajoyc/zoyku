import type { SVGProps } from "react";

/**
 * Zoyku 品牌标识:
 * 简约、几何对齐、现代折角 "Z" 徽标，替代 AI 闪烁星号。
 */
export function BrandLogo({
  size = 20,
  ...props
}: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 6.5A1.5 1.5 0 0 1 6.5 5H18a1.5 1.5 0 0 1 1.2 2.4L10.2 17H18a1.5 1.5 0 0 1 0 3H6.5a1.5 1.5 0 0 1-1.2-2.4L14.3 8H6.5A1.5 1.5 0 0 1 5 6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
