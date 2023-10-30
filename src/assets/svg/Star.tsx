import type { SVGProps } from "react";
const SvgStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 5.66388L6.472 7.03809L5.816 4.44809L8 2.70545L5.124 2.48072L4 0.0380859L2.876 2.48072L0 2.70545L2.184 4.44809L1.528 7.03809L4 5.66388Z"
      fill="#9A9A9A"
    />
  </svg>
);
export default SvgStar;
