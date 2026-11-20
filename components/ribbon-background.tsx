// 纯 SVG 丝带背景(矢量,任意缩放不糊);移植自 ribbon-background.html 设计稿。
// 服务端组件:SSR 直出、无 hydration 风险;滚动 scale/opacity 由父级 --blend 变量驱动(见 globals.css)。

// 大气尘点用固定 seed 生成,保证 SSR 与客户端输出完全一致(避免 Math.random 的 hydration mismatch)。
function seededDust(count: number) {
  let seed = 20261120;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    cx: +(rand() * 1365).toFixed(1),
    cy: +(rand() * 768).toFixed(1),
    r: +(0.4 + rand() * 0.7).toFixed(2),
    o: +(0.25 + rand() * 0.5).toFixed(2),
  }));
}

const DUST = seededDust(110);

// 设计稿里手工点缀的较亮光点(位置固定,视觉节奏优于纯随机)
const SPARKS = [
  { cx: 79, cy: 231, r: 1.5, o: 0.8 }, { cx: 164, cy: 231, r: 3, o: 0.8 },
  { cx: 1218, cy: 60, r: 1.3, o: 0.9 }, { cx: 1255, cy: 31, r: 1, o: 0.8 },
  { cx: 682, cy: 462, r: 2.5, o: 0.75 }, { cx: 620, cy: 605, r: 1.5, o: 0.7 },
  { cx: 520, cy: 679, r: 1.5, o: 0.7 }, { cx: 480, cy: 704, r: 1.2, o: 0.65 },
  { cx: 1050, cy: 330, r: 1.3, o: 0.7 },
];

export function RibbonBackground() {
  return (
    <div className="ribbon-bg pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 1365 768" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rbn-lavender" x1="0" y1="0" x2="0.85" y2="1" gradientUnits="objectBoundingBox">
            <stop stopColor="#d9c8ff" stopOpacity=".64" />
            <stop offset=".48" stopColor="#a99bea" stopOpacity=".43" />
            <stop offset="1" stopColor="#eee7ff" stopOpacity=".12" />
          </linearGradient>
          <linearGradient id="rbn-lavender2" x1="0" y1="0" x2="1" y2=".8">
            <stop stopColor="#c5a9fa" stopOpacity=".36" />
            <stop offset=".55" stopColor="#9c8be2" stopOpacity=".48" />
            <stop offset="1" stopColor="#e9ddff" stopOpacity=".12" />
          </linearGradient>
          <linearGradient id="rbn-cyan" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#b9f5fa" stopOpacity=".18" />
            <stop offset=".42" stopColor="#72d7e9" stopOpacity=".45" />
            <stop offset="1" stopColor="#c9faff" stopOpacity=".12" />
          </linearGradient>
          <linearGradient id="rbn-cyanLine" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#a8eefa" stopOpacity=".15" />
            <stop offset=".5" stopColor="#7bd9ee" stopOpacity=".95" />
            <stop offset="1" stopColor="#b4f2fa" stopOpacity=".2" />
          </linearGradient>
          <linearGradient id="rbn-violetLine" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#d8c1ff" stopOpacity=".1" />
            <stop offset=".48" stopColor="#b79af6" stopOpacity=".9" />
            <stop offset="1" stopColor="#c8a8ff" stopOpacity=".2" />
          </linearGradient>
          <radialGradient id="rbn-mist">
            <stop stopColor="#c8b7fa" stopOpacity=".22" />
            <stop offset="1" stopColor="#c8b7fa" stopOpacity="0" />
          </radialGradient>
          <filter id="rbn-soft" x="-30%" y="-50%" width="160%" height="200%"><feGaussianBlur stdDeviation="12" /></filter>
          <filter id="rbn-glow" x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <ellipse cx="685" cy="550" rx="720" ry="260" fill="url(#rbn-mist)" />

        <g className="ribbon-drift">
          {/* 柔光底辉 */}
          <g fill="none" strokeLinecap="round" filter="url(#rbn-soft)" opacity=".55">
            <path d="M-80 370 C120 260 255 420 430 505 S690 590 840 380 S1110 140 1450 265" stroke="#b59af2" strokeWidth="54" />
            <path d="M-80 520 C140 440 275 665 470 640 S745 470 900 330 S1160 190 1450 320" stroke="#83dff0" strokeWidth="40" />
          </g>
          {/* 半透明宽丝带 */}
          <path d="M-70 318 C120 245 235 345 385 450 C540 560 635 580 760 430 C895 268 1035 92 1225 122 C1325 138 1395 170 1450 185 L1450 272 C1300 240 1195 195 1085 218 C930 250 875 420 735 535 C590 655 460 578 325 488 C180 392 70 322 -70 388Z" fill="url(#rbn-lavender)" />
          <path d="M-70 405 C110 335 215 470 370 550 C510 622 610 650 735 525 C850 410 925 235 1080 210 C1215 190 1320 255 1450 300 L1450 374 C1290 320 1200 270 1090 285 C950 305 875 465 760 565 C620 688 500 655 345 580 C190 505 80 420 -70 485Z" fill="url(#rbn-lavender2)" />
          <path d="M-80 530 C100 495 230 570 360 630 C505 700 620 665 760 515 C890 375 975 245 1125 235 C1245 225 1345 290 1450 332 L1450 405 C1320 360 1235 320 1130 330 C995 345 900 480 785 600 C635 755 500 730 340 655 C195 588 70 530 -80 580Z" fill="url(#rbn-cyan)" />
          <path d="M-80 290 C115 245 225 360 360 465 C505 580 625 590 765 445 C900 305 980 205 1115 205 C1245 205 1345 280 1450 330 L1450 385 C1300 325 1225 265 1110 270 C985 275 900 385 785 510 C635 675 505 635 345 520 C190 408 85 330 -80 365Z" fill="url(#rbn-cyan)" opacity=".72" />
          <path d="M-80 365 C100 315 225 420 365 515 C515 620 625 625 765 485 C905 345 980 260 1110 265 C1240 270 1340 340 1450 385 L1450 438 C1305 375 1220 325 1110 325 C980 325 900 425 785 550 C635 715 500 680 340 565 C190 455 75 380 -80 435Z" fill="url(#rbn-lavender)" opacity=".62" />
          {/* 发光细轮廓 */}
          <g fill="none" strokeLinecap="round" filter="url(#rbn-glow)">
            <path d="M-65 300 C120 250 245 380 390 480 C540 585 635 585 770 435 C905 285 1000 110 1190 120 C1300 125 1380 165 1440 185" stroke="url(#rbn-violetLine)" strokeWidth="3.2" opacity=".9" />
            <path d="M-65 535 C110 480 230 585 370 640 C510 695 625 675 760 525 C890 380 975 245 1120 235 C1240 225 1340 295 1440 340" stroke="url(#rbn-cyanLine)" strokeWidth="3" opacity=".9" />
            <path d="M-65 430 C100 385 230 485 370 565 C515 650 625 655 770 505 C900 370 970 265 1110 270 C1240 275 1340 350 1440 400" stroke="#f8f5ff" strokeWidth="1.8" opacity=".82" />
            <path d="M-60 375 C110 330 235 445 385 535 C525 620 630 625 770 475 C900 335 985 205 1125 205 C1250 205 1340 280 1440 330" stroke="#d9c9ff" strokeWidth="1.5" opacity=".72" />
            <path d="M-60 510 C110 450 230 560 380 620 C525 678 625 655 770 510 C900 380 980 285 1120 290 C1250 295 1340 365 1440 415" stroke="#b9eff7" strokeWidth="1.4" opacity=".65" />
          </g>
          {/* 内层半透明折痕 */}
          <path d="M-40 470 C135 395 245 515 390 580 C540 650 640 625 765 490 C890 355 980 265 1110 285 C1240 305 1335 375 1410 415" fill="none" stroke="#eee7ff" strokeWidth="17" opacity=".16" />
          <path d="M-40 345 C135 300 250 425 395 505 C540 585 635 590 765 450 C900 305 995 170 1140 170 C1265 170 1350 225 1420 255" fill="none" stroke="#fff" strokeWidth="9" opacity=".16" />
        </g>

        {/* 大气光点 */}
        <g fill="#fff">
          {SPARKS.map((s, i) => (
            <circle key={i} className="spark" cx={s.cx} cy={s.cy} r={s.r} opacity={s.o} />
          ))}
        </g>
        {/* 细尘点场 */}
        <g fill="#fff" opacity=".56">
          {DUST.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r={d.r} opacity={d.o} />
          ))}
        </g>
      </svg>
    </div>
  );
}
