import type { SVGProps } from 'react';
const SvgSelectedOff = (props: SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="12" r="12" fill="#CDCDCD" />
        <path d="M8 13L11.5 16L17 9" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
export default SvgSelectedOff;
