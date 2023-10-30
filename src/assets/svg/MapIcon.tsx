import type { SVGProps } from "react";
const SvgMapIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="map" clip-path="url(#clip0_58_819)">
      <path
        id="Vector"
        d="M20.5 3.03809L20.34 3.06809L15 5.13809L9 3.03809L3.36 4.93809C3.15 5.00809 3 5.18809 3 5.41809V20.5381C3 20.8181 3.22 21.0381 3.5 21.0381L3.66 21.0081L9 18.9381L15 21.0381L20.64 19.1381C20.85 19.0681 21 18.8881 21 18.6581V3.53809C21 3.25809 20.78 3.03809 20.5 3.03809ZM10 5.50809L14 6.90809V18.5681L10 17.1681V5.50809ZM5 6.49809L8 5.48809V17.1881L5 18.3481V6.49809ZM19 17.5781L16 18.5881V6.89809L19 5.73809V17.5781Z"
        fill="#9A9A9A"
      />
    </g>
    <defs>
      <clipPath id="clip0_58_819">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(0 0.0380859)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default SvgMapIcon;
