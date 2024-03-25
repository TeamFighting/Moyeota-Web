import type { SVGProps } from 'react';
const SvgThreeDots = (props: SVGProps<SVGSVGElement>) => (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g id="Dots vertical">
            <path
                id="Icon"
                d="M12 5.03809L12 5.04809M12 12.0381L12 12.0481M12 19.0381L12 19.0481M12 6.03809C11.4477 6.03809 11 5.59037 11 5.03809C11 4.4858 11.4477 4.03809 12 4.03809C12.5523 4.03809 13 4.4858 13 5.03809C13 5.59037 12.5523 6.03809 12 6.03809ZM12 13.0381C11.4477 13.0381 11 12.5904 11 12.0381C11 11.4858 11.4477 11.0381 12 11.0381C12.5523 11.0381 13 11.4858 13 12.0381C13 12.5904 12.5523 13.0381 12 13.0381ZM12 20.0381C11.4477 20.0381 11 19.5904 11 19.0381C11 18.4858 11.4477 18.0381 12 18.0381C12.5523 18.0381 13 18.4858 13 19.0381C13 19.5904 12.5523 20.0381 12 20.0381Z"
                stroke="#606060"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    </svg>
);
export default SvgThreeDots;
