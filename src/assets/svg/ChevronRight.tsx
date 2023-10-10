import * as React from 'react';
import type { SVGProps } from 'react';
const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#7E7E7E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9 19 7-7-7-7"
    />
  </svg>
);
export default SvgChevronRight;
