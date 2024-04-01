import type { SVGProps } from 'react';
const SvgInputDelete = (props: SVGProps<SVGSVGElement>) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="9" cy="9" r="9" fill="#9A9A9A" />
        <path
            d="M5.5 12.5L12.5 5.5M5.5 5.5L12.5 12.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default SvgInputDelete;
