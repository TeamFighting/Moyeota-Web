import type { SVGProps } from "react";
const SvgList = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#fff"
      d="M5.333 3.333H14v1.334H5.333V3.333ZM2 3h2v2H2V3Zm0 4h2v2H2V7Zm0 4h2v2H2v-2Zm3.333-3.667H14v1.334H5.333V7.333Zm0 4H14v1.334H5.333v-1.334Z"
    />
  </svg>
);
export default SvgList;
