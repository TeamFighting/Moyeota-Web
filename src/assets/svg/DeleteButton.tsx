import * as React from "react";
import type { SVGProps } from "react";
const SvgDeleteButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <circle cx={9} cy={9} r={9} fill="#9A9A9A" />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m5.5 12.5 7-7m-7 0 7 7"
    />
  </svg>
);
export default SvgDeleteButton;
