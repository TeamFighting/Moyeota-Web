import type { SVGProps } from "react";
const SvgGreenOpacity = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 207 207"
    {...props}
  >
    <circle
      cx={103.5}
      cy={103.5}
      r={103.5}
      fill="url(#GreenOpacity_svg__a)"
      fillOpacity={0.3}
      opacity={0.5}
    />
    <defs>
      <radialGradient
        id="GreenOpacity_svg__a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(83.157 -7 96.554) scale(115.825 369.126)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1EDD81" />
        <stop offset={1} stopColor="#1EDD81" stopOpacity={0} />
      </radialGradient>
    </defs>
  </svg>
);
export default SvgGreenOpacity;
