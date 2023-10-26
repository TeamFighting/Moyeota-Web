import * as React from "react";
import type { SVGProps } from "react";
const SvgRefreshButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 56 56"
    {...props}
  >
    <g filter="url(#RefreshButton_svg__a)">
      <circle cx={28} cy={24} r={24} fill="#fff" />
    </g>
    <path
      fill="#606060"
      d="M28.494 15.5a9 9 0 1 0 8.702 11.25h-2.34a6.75 6.75 0 1 1-6.362-9 6.66 6.66 0 0 1 4.751 2.003l-3.62 3.622H37.5V15.5l-2.645 2.644a8.96 8.96 0 0 0-6.36-2.644Z"
    />
    <defs>
      <filter
        id="RefreshButton_svg__a"
        width={56}
        height={56}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.671667 0 0 0 0 0.671667 0 0 0 0 0.671667 0 0 0 0.25 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_563_3589"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_563_3589"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgRefreshButton;
