import type { SVGProps } from 'react';
const SvgCurrentLocationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 45 45"
    {...props}
  >
    <circle
      cx={22.5}
      cy={22.5}
      r={22.5}
      fill="url(#CurrentLocationIcon_svg__a)"
      fillOpacity={0.3}
    />
    <g filter="url(#CurrentLocationIcon_svg__b)">
      <circle cx={22.5} cy={22.5} r={8.5} fill="#fff" />
    </g>
    <circle cx={22.5} cy={22.5} r={6.5} fill="#1EDD81" />
    <defs>
      <radialGradient
        id="CurrentLocationIcon_svg__a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(3.00002 25.00004 -79.6731 9.5608 19.5 20)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1EDD81" />
        <stop offset={1} stopColor="#1EDD81" stopOpacity={0} />
      </radialGradient>
      <filter
        id="CurrentLocationIcon_svg__b"
        width={25}
        height={25}
        x={10}
        y={10}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.117106 0 0 0 0 0.867448 0 0 0 0 0.504577 0 0 0 1 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_563_2958"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_563_2958"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgCurrentLocationIcon;
