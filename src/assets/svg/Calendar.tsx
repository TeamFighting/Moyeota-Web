import * as React from 'react';
import type { SVGProps } from 'react';
const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5.333 4.667V2m5.334 2.667V2m-6 5.333h6.666m-8 6.667h9.334c.736 0 1.333-.597 1.333-1.333v-8c0-.737-.597-1.334-1.333-1.334H3.333C2.597 3.333 2 3.93 2 4.667v8C2 13.403 2.597 14 3.333 14Z"
    />
  </svg>
);
export default SvgCalendar;
