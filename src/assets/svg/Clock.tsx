import * as React from 'react';
import type { SVGProps } from 'react';
const SvgClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <path
      stroke="#606060"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.167}
      d="M7 4.667V7l1.75 1.75M12.25 7a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
    />
  </svg>
);
export default SvgClock;
