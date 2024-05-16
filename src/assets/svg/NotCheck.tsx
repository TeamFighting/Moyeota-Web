import type { SVGProps } from 'react';
const SvgNotCheck = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
        <circle cx={12} cy={12} r={12} fill="#CDCDCD" />
        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="m8 13 3.5 3L17 9" />
    </svg>
);
export default SvgNotCheck;
