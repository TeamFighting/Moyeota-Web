import type { SVGProps } from 'react';
const SvgSwitch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#7E7E7E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M4.667 10.667v-8m0 0L2 5.333m2.667-2.666 2.666 2.666m4 0v8m0 0L14 10.667m-2.667 2.666-2.666-2.666"
    />
  </svg>
);
export default SvgSwitch;
