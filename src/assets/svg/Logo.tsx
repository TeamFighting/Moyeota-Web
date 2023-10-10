import * as React from 'react';
import type { SVGProps } from 'react';
const SvgLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 143 143"
    {...props}
  >
    <g filter="url(#Logo_svg__a)">
      <path
        fill="url(#Logo_svg__b)"
        d="M4 19.853C4 8.888 12.889 0 23.853 0h95.294C130.112 0 139 8.888 139 19.853v95.294c0 10.965-8.888 19.853-19.853 19.853H23.853C12.888 135 4 126.112 4 115.147V19.853Z"
      />
      <path
        fill="#fff"
        d="M34.927 33.874h19.636L71.965 76.31h.745l17.32-42.436h19.718v67.376H94.3V59.373h-.558l-16.38 41.505h-10.05L50.934 59.187h-.559v42.063H34.927V33.874Z"
      />
    </g>
    <path fill="#2EDD7E" d="m104.8 31.36 2.72 1.072-16.121 40.89-2.72-1.072z" />
    <defs>
      <radialGradient
        id="Logo_svg__b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(-67.852 94.78 -13.444) scale(106.637)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1EDD81" />
        <stop offset={1} stopColor="#FFDB66" />
      </radialGradient>
      <filter
        id="Logo_svg__a"
        width={143}
        height={143}
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
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_234_1254"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_234_1254"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgLogo;
