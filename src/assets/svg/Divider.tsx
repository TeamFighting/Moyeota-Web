import * as React from 'react';
import type { SVGProps } from 'react';
const SvgDivider = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 374 10"
    {...props}
  >
    <path stroke="#F5F6F8" strokeWidth={9} d="M0 5h374" />
  </svg>
);
export default SvgDivider;
