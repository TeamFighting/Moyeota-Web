import type { SVGProps } from 'react';
const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <path
      stroke="#7E7E7E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.5 4 2 2m0 0-2 2m2-2h-9"
    />
  </svg>
);
export default SvgArrowRight;
