import * as React from 'react';
import type { SVGProps } from 'react';
const SvgExpand = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 50 7"
    {...props}
  >
    <rect width={200} height={7} fill="#EDEDED" rx={3.5} />
  </svg>
);
export default SvgExpand;
