import type { SVGProps } from 'react';
const SvgReimbursement = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 45 44" {...props}>
        <rect width={44} height={44} x={0.5} fill="#50DD99" rx={22} />
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16.5 26a4 4 0 0 0 4 4h4a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h4a4 4 0 0 1 4 4m-6-6v20"
        />
    </svg>
);
export default SvgReimbursement;
