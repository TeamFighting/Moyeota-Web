import * as React from "react";
import type { SVGProps } from "react";
const SvgBacktoCurrentButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 56 56"
    {...props}
  >
    <g filter="url(#BacktoCurrentButton_svg__a)">
      <circle cx={28} cy={24} r={24} fill="#fff" />
    </g>
    <g clipPath="url(#BacktoCurrentButton_svg__b)">
      <path
        fill="#606060"
        d="M28 20c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4Zm8.94 3A8.994 8.994 0 0 0 29 15.06V13h-2v2.06A8.994 8.994 0 0 0 19.06 23H17v2h2.06A8.994 8.994 0 0 0 27 32.94V35h2v-2.06A8.994 8.994 0 0 0 36.94 25H39v-2h-2.06ZM28 31c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7Z"
      />
    </g>
    <defs>
      <clipPath id="BacktoCurrentButton_svg__b">
        <path fill="#fff" d="M16 12h24v24H16z" />
      </clipPath>
      <filter
        id="BacktoCurrentButton_svg__a"
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
          result="effect1_dropShadow_563_3592"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_563_3592"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgBacktoCurrentButton;
