import type { SVGProps } from "react";
const SvgGreenLocationMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 39"
    {...props}
  >
    <g filter="url(#GreenLocationMarker_svg__a)">
      <path
        fill="#1EDD81"
        fillRule="evenodd"
        d="M23.92 6.48c4.373 4.374 4.373 11.466 0 15.84L16 30.24l-7.92-7.92c-4.374-4.374-4.374-11.466 0-15.84 4.374-4.374 11.465-4.374 15.84 0ZM16 17.6a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <filter
        id="GreenLocationMarker_svg__a"
        width={40}
        height={40}
        x={-4}
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
          result="effect1_dropShadow_563_2884"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_563_2884"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgGreenLocationMarker;
